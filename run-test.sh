#!/bin/bash

set -euo pipefail
set -x

# Parse arguments
while getopts "v:s:" OPT; do
  case $OPT in
    v) VERSION=$OPTARG ;;
    s) SESSION=$OPTARG ;;
  esac
done

IMAGE="ghcr.io/schneegans/gnome-shell-pod-${VERSION}"
UUID="center-window@mmc"
ZIP="${UUID}.zip"
SERVICE="${SESSION}@:99"
DISPLAY=":99"

# Start Podman container
POD=$(podman run --rm --cap-add=SYS_NICE --cap-add=IPC_LOCK -td ${IMAGE})
trap "podman stop ${POD}" EXIT

# Helper function to run commands in the container
do_in_pod() {
  podman exec --user gnomeshell --workdir /home/gnomeshell "${POD}" set-env.sh "$@"
}

# Copy ZIP to container
podman cp ${ZIP} ${POD}:/tmp/${ZIP}

# Install extension
do_in_pod gnome-extensions install /tmp/${ZIP} --force

# Compile schemas (required as per your README and schema file)
do_in_pod glib-compile-schemas .local/share/gnome-shell/extensions/${UUID}/schemas

# Wait for user bus
do_in_pod wait-user-bus.sh

# Start GNOME session
do_in_pod systemctl --user start "${SERVICE}"

sleep 10

# Disable welcome tour (required for GNOME 40+ stability)
do_in_pod gsettings set org.gnome.shell welcome-dialog-last-shown-version '9999999999'

# Enable extension
do_in_pod gnome-extensions enable ${UUID}

# Restart session to load extension
do_in_pod systemctl --user stop "${SERVICE}"
do_in_pod systemctl --user start "${SERVICE}"

sleep 10

# Check session status
do_in_pod systemctl --user status "${SERVICE}" | grep -q "Active: active" || { echo "Session failed to start"; exit 1; }

# Check if extension is recognized and enabled
do_in_pod gnome-extensions list | grep -q ${UUID} || { echo "Extension not recognized"; exit 1; }

# Check logs for errors related to the extension
do_in_pod journalctl --user -u "${SERVICE}" -b | grep -i ${UUID} | grep -iq error && { echo "Error found in logs"; exit 1; }

# On failure (if reached via set -e), capture logs and screenshot for artifact
if [ $? -ne 0 ]; then
  do_in_pod journalctl --user -u "${SERVICE}" > fail.log
  podman cp ${POD}:/home/gnomeshell/fail.log .
  podman cp ${POD}:/opt/Xvfb_screen0 fail.xwd
  convert fail.xwd fail.png
  exit 1
fi

echo "Test passed"