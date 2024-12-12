/*
  Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

// EXPORTS AND IMPORTS ARE NOT ALLOWED IN THIS FILE.
// DOING SO WILL **BREAK** THE PLUGIN,
// AS THEY ARE CURRENTLY NOT SUPPORTED BY PENPOT!.
// By convention, all code copied elements (instead of being imported)
// uses the suffix "_IC".

enum PluginEvents_IC {
	NO_SELECTION = "no-selection",
	ONE_SELECTION = "one-selection",
	MULTIPLE_SELECTION = "multiple-selection",
	  PATTERN_SELECTED = "pattern-selected",
  }

penpot.ui.open('Tiling Utility', '', {
	width: 400,
	height: 300
});

/**
 * Handle messages from the UI
 */
penpot.ui.onMessage<string>((message) => {
	console.log(message);
	if (message === 'ping') {
		penpot.ui.sendMessage('pong');
	}
});

/**
 * Listen to selection change
 */
penpot.on('selectionchange', (selection) => {
	if (selection.length === 0) {
		penpot.ui.sendMessage(PluginEvents_IC.NO_SELECTION);
	}
	else if (selection.length === 1) {
		const shape = penpot.currentPage?.getShapeById(selection[0]);

		if (!shape) {
			penpot.ui.sendMessage(PluginEvents_IC.NO_SELECTION);
			return;
		}

		const isPattern = shape.getPluginData('isPattern') === 'true';
		if (isPattern) {
			penpot.ui.sendMessage(PluginEvents_IC.PATTERN_SELECTED);
		} else {
			penpot.ui.sendMessage(PluginEvents_IC.ONE_SELECTION);
		}
	} else {
		penpot.ui.sendMessage(PluginEvents_IC.MULTIPLE_SELECTION);
	}
});
