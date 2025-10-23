// extension.js — ESM format for GNOME 45+

import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Meta from 'gi://Meta';
import Shell from 'gi://Shell';
import GLib from 'gi://GLib';

const SCHEMA_ID = 'org.gnome.shell.extensions.centerwindow';
const KEY_NAME = 'center-hotkey';

export default class CenterWindowExtension extends Extension {
  constructor() {
    super(...arguments);
    this._settings = null;
    this._onHotkey = this._onHotkey.bind(this);
  }

  enable() {
    this._settings = this.getSettings ? this.getSettings() : null;

    if (!this._settings) {
      log(`${this.metadata.uuid}: could not get settings object`);
      return;
    }

    try {
      Main.wm.addKeybinding(
        KEY_NAME,
        this._settings,
        Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
        Shell.ActionMode.ALL,
        this._onHotkey
      );
    } catch (e) {
      log(`${this.metadata.uuid}: addKeybinding failed: ${e}`);
    }
  }

  disable() {
    try {
      Main.wm.removeKeybinding(KEY_NAME);
    } catch (e) {
    }
    this._settings = null;
  }

  _onHotkey() {
    let win = global.display.focus_window || (global.display.get_focus_window && global.display.get_focus_window());
    if (!win)
      return;

    let monitorIndex = win.get_monitor();
    let mon = Main.layoutManager.monitors[monitorIndex];
    if (!mon)
      return;

    let rect = win.get_frame_rect();
    let targetX = mon.x + Math.floor((mon.width - rect.width) / 2);
    let targetY = mon.y + Math.floor((mon.height - rect.height) / 2);

    try {
      win.move_frame(false, targetX, targetY);
    } catch (e) {
      log(`${this.metadata.uuid}: move_frame failed: ${e}`);
    }
  }
}
