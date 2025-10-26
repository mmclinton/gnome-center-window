# Center Window Shortcut GNOME Extension

A simple GNOME Shell extension that adds a configurable keyboard shortcut (default: `Alt+Shift+C`) to center the active window on its current monitor. The window is repositioned horizontally, vertically, or both, without resizing it. This is particularly useful for users who need to quickly align windows for better workspace organization.

## Screenshots

<!-- Add screenshots here if available, e.g., before and after centering. For example: -->
<!-- ![Before Centering](screenshots/before.png) -->
<!-- ![After Centering](screenshots/after.png) -->

(Note: Screenshots will be added in a future update.)

## Features

- Centers the active window horizontally and/or vertically on its monitor.
- Configurable options to enable/disable horizontal and vertical centering independently via the extension's preferences.
- Customizable hotkey (default: `Alt+Shift+C`) changeable through GNOME's Keyboard settings or the extension preferences.
- Supports multi-monitor setups by centering on the window's current monitor.
- No resizing of the window—only repositioning.
- Lightweight with no additional dependencies beyond standard GNOME Shell libraries.
- Compatible with GNOME Shell versions: 45, 46, 47, 48, 49.

## Installation

### From GNOME Extensions Website (Recommended)

1. Visit the extension's page on [extensions.gnome.org](https://extensions.gnome.org/) (search for "Center Window Shortcut" or use the direct link once available).
2. Click the toggle switch to install the extension.
3. If prompted, install the browser extension for your web browser to enable one-click installations.

Once installed, the extension is enabled by default. You may need to restart GNOME Shell (on X11: `Alt+F2`, type `r`, Enter; on Wayland: log out and back in).

### From Source (For Developers or Manual Installation)

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

4. Compile the GSettings schema (required for settings and hotkey configuration):
   ```
   glib-compile-schemas ~/.local/share/gnome-shell/extensions/center-window@mmc/schemas/
   ```

5. Restart GNOME Shell to load the extension:
   - On X11: Press `Alt+F2`, type `r`, and press Enter.
   - On Wayland: Log out and log back in.

6. Enable the extension:
   - Use the GNOME Extensions app (install if needed: `sudo apt install gnome-shell-extension-prefs` on Debian-based systems, or equivalent for your distro).
   - Or via command line: `gnome-extensions enable center-window@mmc`

### Quick Install Script (From Cloned Repo)

```bash
git clone https://github.com/mmclinton/gnome-center-window.git
cd gnome-center-window
mkdir -p ~/.local/share/gnome-shell/extensions/center-window@mmc/ && \
cp -r * ~/.local/share/gnome-shell/extensions/center-window@mmc/ && \
glib-compile-schemas ~/.local/share/gnome-shell/extensions/center-window@mmc/schemas/ && \
gnome-extensions enable center-window@mmc
```

After running the script, restart GNOME Shell as described above.

## Dependencies

- GNOME Shell (versions 45-49).
- Standard GObject Introspection (GI) libraries: `Meta`, `Shell`, `GLib`, `Gio` (included in GNOME by default).
- `glib-compile-schemas` tool (part of `libglib2.0-bin` on most distributions; install via `sudo apt install libglib2.0-bin` on Ubuntu/Debian, or equivalent).

No additional Python, Node.js, or external packages are required.

## Usage

1. Focus on the window you want to center.
2. Press the configured hotkey (default: `Alt+Shift+C`).
3. The window will move to the center of its current monitor based on your preferences (horizontal, vertical, or both).

## Configuration

- **Preferences Window**: Open the GNOME Extensions app, find "Center Window Shortcut," and click the settings gear. Here, you can toggle:
  - Center Horizontally (enabled by default).
  - Center Vertically (enabled by default).
- **Hotkey**: Change the shortcut via GNOME's Settings > Keyboard > Keyboard Shortcuts > Search for "Center the active window" (or directly edit via `dconf-editor` at `/org/gnome/shell/extensions/centerwindow/center-hotkey`).

## Troubleshooting

- **Extension Not Loading**: Check GNOME Shell logs with `journalctl /usr/bin/gnome-shell -f`. Look for errors related to `center-window@mmc`.
- **Hotkey Not Working**: Ensure no conflicts in GNOME's Keyboard Shortcuts settings. Reassign if needed.
- **Schema Compilation Issues**: Verify `glib-compile-schemas` is installed and run it in the correct directory.
- **Multi-Monitor Problems**: The extension uses the window's current monitor—ensure the focus is on the correct window.
- **Compatibility**: If using a GNOME version outside 45-49, the extension may not work. Check for updates on the GitHub repository.
- For other issues, open a ticket on the [GitHub repository](https://github.com/mmclinton/gnome-center-window/issues).

## Development

- The extension is written in JavaScript using GNOME's Extension API.
- Key files:
  - `extension.js`: Core logic for enabling/disabling and handling the hotkey.
  - `prefs.js`: Preferences UI for toggling centering options.
  - `schemas/org.gnome.shell.extensions.centerwindow.gschema.xml`: GSettings schema for hotkey and options.
  - `metadata.json`: Extension metadata, including supported shell versions.

Contributions are welcome! Fork the repo, make changes, and submit a pull request.

## License

This extension is licensed under the GNU General Public License Version 3 (GPLv3). See the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 mmclinton.