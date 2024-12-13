/*
  Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

// EXPORTS AND IMPORTS ARE NOT ALLOWED IN THIS FILE, EXCEPT FOR TYPE IMPORTS.
// DOING SO WILL **BREAK** THE PLUGIN,
// AS THEY ARE CURRENTLY NOT SUPPORTED BY PENPOT!.
// By convention, all code copied elements (instead of being imported)
// uses the suffix "_IC".

import type { PenpotEvent } from '$lib/types/plugin_events';
import type { Pattern_v1 } from '$lib/types/pattern';
import type { Board } from '@penpot/plugin-types';

enum PluginEvents_IC {
	NO_SELECTION = 'no-selection',
	ONE_SELECTION = 'one-selection',
	MULTIPLE_SELECTION = 'multiple-selection',
	PATTERN_SELECTED = 'pattern-selected',
	PONG = 'pong',
	ERROR = 'error'
}

enum UIEvents_IC {
	PING = 'ping',
	CREATE_PATTERN = 'create-pattern'
}

type EventT = PenpotEvent<PluginEvents_IC | UIEvents_IC>;

enum PluginDataKey {
	IS_PATTERN = 'isPattern',
	SOURCE_ID = 'sourceId',
	PATTERN = 'pattern',
}



let selectionCache: string[] = [];

penpot.ui.open('Tiling Utility', '', {
	width: 400,
	height: 300,
});

function getDefaultPattern(): Pattern_v1 {
	return {
		version: 1,
		mode: 'grid',
		rows: 5,
		columns: 5,
		radius: 50,
	};
}

/**
 * Handle messages from the UI
 */
penpot.ui.onMessage<EventT>((message) => {
	console.log(message);
	if (message.type === UIEvents_IC.PING) {
		penpot.ui.sendMessage(PluginEvents_IC.PONG);
	} else if (message.type === UIEvents_IC.CREATE_PATTERN) {
		createPattern();
	} else {
		console.error('Unknown message from UI:', message);
	}
});

/**
 * Listen to selection change
 */
penpot.on('selectionchange', (selection) => {
	selectionCache = [...selection];
	if (selection.length === 0) {
		penpot.ui.sendMessage({ type: PluginEvents_IC.NO_SELECTION });
	} else if (selection.length === 1) {
		const shape = penpot.currentPage?.getShapeById(selection[0]);

		if (!shape) {
			penpot.ui.sendMessage({ type: PluginEvents_IC.NO_SELECTION });
			return;
		}

		const isPattern = shape.getPluginData(PluginDataKey.IS_PATTERN) === 'true';
		if (isPattern) {
			penpot.ui.sendMessage({ type: PluginEvents_IC.PATTERN_SELECTED });
		} else {
			penpot.ui.sendMessage({ type: PluginEvents_IC.ONE_SELECTION });
		}
	} else {
		penpot.ui.sendMessage({ type: PluginEvents_IC.MULTIPLE_SELECTION });
	}
});

/**
 * Initializes a new board as a pattern, with a hidden copy of the selected shape
 * serving as the source of the pattern.
 * @returns
 */
function createPattern() {
	console.info("Creating pattern");
	const board = penpot.createBoard();
	board.setPluginData(PluginDataKey.IS_PATTERN, 'true');

	const selectedShape = penpot.currentPage?.getShapeById(selectionCache[0]);
	if (!selectedShape) {
		console.error('No shape selected');
		penpot.ui.sendMessage({ type: PluginEvents_IC.ERROR, content: 'No shape selected' });
		return;
	}
	
	const clone = selectedShape?.clone();
	clone.x = 0;
	clone.y = 0;
	clone.hidden = true;
	clone.blocked = true;
	clone.name += " (source)";

	board.appendChild(clone);
	board.setPluginData(PluginDataKey.SOURCE_ID, clone.id);
	board.name = 'Pattern';
	board.fills = [];

	//TODO figure out why this does not work (creates positions issues once the clones are appended)
	// board.x = selectedShape.x + selectedShape.width + 200;
	// board.y = selectedShape.y;

	board.setPluginData(PluginDataKey.PATTERN, JSON.stringify(getDefaultPattern()));
	drawPattern(board);
}

function drawPattern(board: Board) {
	const pattern = JSON.parse(board.getPluginData(PluginDataKey.PATTERN)) as Pattern_v1;
	/**
	 * rows, then columns, then positions
	 */
	const positions = new Map<number, Map<number, { x: number, y: number }>>();

	const sourceId = board.getPluginData(PluginDataKey.SOURCE_ID);
	const source = board.children.find((shape) => shape.id === sourceId);
	if (!source) {
		console.error('No source shape found');
		penpot.ui.sendMessage({ type: PluginEvents_IC.ERROR, content: 'No source shape found' });
		return;
	}

	// compute base positions
	if (pattern.mode === "revolution") {
		const centerOffset = (source.height * pattern.rows) / 2;
		for (let i = 0; i < pattern.rows; i++) {
			const r = pattern.radius + i * source.height;
			const columnPositions = new Map<number, { x: number, y: number }>();
			for (let j = 0; j < pattern.columns; j++) {
				const x = r * Math.cos(j * (2 * Math.PI / pattern.columns)) + centerOffset;
				const y = r * Math.sin(j * (2 * Math.PI / pattern.columns)) + centerOffset;
				columnPositions.set(j, { x, y });
			}
			positions.set(i, columnPositions);
		}
	} else if (pattern.mode === "grid") {
		for (let i = 0; i < pattern.rows; i++) {
			const columnPositions = new Map<number, { x: number, y: number }>();
			for (let j = 0; j < pattern.columns; j++) {
				const x = j * source.width;
				const y = i * source.height;
				columnPositions.set(j, { x, y });
			}
			positions.set(i, columnPositions);
		}
	}

	// create shapes
	board.horizontalSizing = "fix";
	board.verticalSizing = "fix";
	board.resize(source.width * pattern.rows, source.height * pattern.columns);
	for (let i = 0; i < pattern.columns; i++) {
		for (let j = 0; j < pattern.rows; j++) {
			const position = positions.get(i)?.get(j);
			if (!position) {
				console.error('No position found for', i, j);
				continue;
			}
			console.log("cloning at", position);
			const clone = source.clone();
			// Note: the clone is already a child of the board
			clone.name = clone.name.replace(" (source)", ` (${i}, ${j})`);
			clone.x = position.x;
			clone.y = position.y;
			clone.hidden = false;
		}
	}
}