ARG FEDORA_TAG
FROM fedora:${FEDORA_TAG}

RUN dnf update -y && \
    dnf install -y \
    gnome-shell \
    mutter \
    gjs \
    dbus-daemon \
    gettext \
    glib2 \
    mesa-dri-drivers \
    libwayland-server \
    libwayland-client \
    wayland-utils \
    xorg-x11-server-Xvfb \
    weston \
    glibc-langpack-en && \  
    dnf clean all

ENV LANG=en_US.UTF-8
ENV MESA_LOADER_DRIVER_OVERRIDE=llvmpipe