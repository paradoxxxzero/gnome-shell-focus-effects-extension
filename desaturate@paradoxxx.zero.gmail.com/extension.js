/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */

// desaturate: Desaturate unfocused windows
// Copyright (C) 2011 Florian Mounier aka paradoxxxzero

// This program is free software: you can redistribute it and/or m odify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Author: Florian Mounier aka paradoxxxzero

const Clutter = imports.gi.Clutter;
const GLib = imports.gi.GLib;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const St = imports.gi.St;

const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const Panel = imports.ui.panel;
const PanelMenu = imports.ui.panelMenu;


function update () {
    let running = app_system.get_running();
    for(var i = 0; i < running.length; i++) {
        let windows = running[i].get_windows();
        for(var j = 0; j < windows.length; j++) {
            windows[j].get_compositor_private().clear_effects();
            let fx = new Clutter.DesaturateEffect();
            windows[j].get_compositor_private().add_effect(fx);
        }
    }
    if(display.focus_window) {
        display.focus_window.get_compositor_private().clear_effects();
    }
}


function enable() {
    let tracker = Shell.WindowTracker.get_default();
    let display = global.display;
    let app_system = Shell.AppSystem.get_default();
    update();
    tracker.connect('notify::focus-app', update);
    global.window_manager.connect('switch-workspace', update);
}


function init() {
}


function disable() {
}
