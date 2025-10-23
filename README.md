# Center Window Shortcut GNOME Extension

A simple GNOME Shell extension that allows you to center the active window on its current monitor by pressing `Alt+Shift+C`. The window is not resized when repositioned. 

## Description

This extension adds a keyboard shortcut to quickly center the focused window. It's useful for users who frequently need to reposition windows without manual dragging.

Supported GNOME Shell versions: 45, 46, 47, 48, 49.

## Features

- Centers the active window horizontally and vertically on its monitor.
- Configurable hotkey (default: `Alt+Shift+C`).
- No additional dependencies beyond standard GNOME Shell libraries.

## Installation

### Quick Install (from cloned repo)

```bash
git clone https://github.com/mmclinton/gnome-center-window.git
cd gnome-center-window
mkdir -p ~/.local/share/gnome-shell/extensions/center-window@mmc && \
cp -r . ~/.local/share/gnome-shell/extensions/center-window@mmc/ && \
glib-compile-schemas ~/.local/share/gnome-shell/extensions/center-window@mmc/schemas/
```

### From Source Code (Linux GNOME)

1. Clone the repository:
   ```
   git clone https://github.com/mmclinton/gnome-center-window.git
   cd gnome-center-window
   ```

2. Create the extension directory in your local GNOME extensions path (if it doesn't exist):
   ```
   mkdir -p ~/.local/share/gnome-shell/extensions/center-window@mmc
   ```

3. Copy the extension files into the directory:
   ```
   cp -r * ~/.local/share/gnome-shell/extensions/center-window@mmc/
   ```

4. Compile the GSettings schema (required for the hotkey configuration):
   ```
   glib-compile-schemas ~/.local/share/gnome-shell/extensions/center-window@mmc/schemas/
   ```

5. Restart GNOME Shell to load the extension:
   - On X11: Press `Alt+F2`, type `r`, and press Enter.
   - On Wayland: Log out and log back in.

6. Enable the extension:
   - Use the GNOME Extensions app (install if needed: `sudo apt install gnome-shell-extension-prefs` on Debian-based systems).
   - Or via command line: `gnome-extensions enable center-window@mmc`

### Dependencies

- GNOME Shell (versions 45-49).
- Standard GI libraries: `Meta`, `Shell`, `GLib` (included in GNOME).
- `glib-compile-schemas` tool (part of `libglib2.0-bin` package on most distributions; install via `sudo apt install libglib2.0-bin` on Ubuntu/Debian).

No additional Python or external packages are required.

## Usage

- After installation and enabling, press `Alt+Shift+C` to center the currently focused window.
- To change the hotkey, use GNOME's Keyboard Shortcuts settings or tweak the schema directly via `dconf-editor` under `/org/gnome/shell/extensions/centerwindow/center-hotkey`.

## Troubleshooting

- If the extension doesn't load, check GNOME Shell logs: `journalctl /usr/bin/gnome-shell -f`.
- Ensure the directory name matches the UUID: `center-window@mmc`.
- If hotkey conflicts occur, reassign via GNOME settings.

