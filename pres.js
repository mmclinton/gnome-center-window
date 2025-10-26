import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import { ExtensionPreferences } from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class CenterWindowPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({ title: 'Centering Options' });

        const horizontalRow = new Adw.ActionRow({ title: 'Center Horizontally' });
        const horizontalToggle = new Gtk.Switch({
            active: this.getSettings().get_boolean('center-horizontal'),
            valign: Gtk.Align.CENTER,
        });
        this.getSettings().bind('center-horizontal', horizontalToggle, 'active', Gio.SettingsBindFlags.DEFAULT);
        horizontalRow.add_suffix(horizontalToggle);
        horizontalRow.activatable_widget = horizontalToggle;
        group.add(horizontalRow);

        const verticalRow = new Adw.ActionRow({ title: 'Center Vertically' });
        const verticalToggle = new Gtk.Switch({
            active: this.getSettings().get_boolean('center-vertical'),
            valign: Gtk.Align.CENTER,
        });
        this.getSettings().bind('center-vertical', verticalToggle, 'active', Gio.SettingsBindFlags.DEFAULT);
        verticalRow.add_suffix(verticalToggle);
        verticalRow.activatable_widget = verticalToggle;
        group.add(verticalRow);

        page.add(group);
        window.add(page);

        window.search_enabled = true;
    }
}