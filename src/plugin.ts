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
import type { Pattern_v1, Rule, RuleKind } from '$lib/types/pattern';
import type { Board, Shape } from '@penpot/plugin-types';

enum PluginEvents_IC {
	NO_SELECTION = 'no-selection',
	ONE_SELECTION = 'one-selection',
	MULTIPLE_SELECTION = 'multiple-selection',
	PATTERN_SELECTED = 'pattern-selected',
	PONG = 'pong',
	ERROR = 'error',
	SEND_PATTERN = 'send-pattern',
	ACKNOWLEDGE_UPDATE_PATTERN = 'acknowledge-update-pattern'
}

enum UIEvents_IC {
	PING = 'ping',
	CREATE_PATTERN = 'create-pattern',
	REQUEST_CURRENT_PATTERN = 'request-current-pattern',
	UPDATE_PATTERN = 'update-pattern'
}

type EventT = PenpotEvent<PluginEvents_IC | UIEvents_IC>;

enum PluginDataKey {
	IS_PATTERN = 'isPattern',
	SOURCE_ID = 'sourceId',
	PATTERN = 'pattern',
	IS_SOURCE = 'isSource',
	ROW_INDEX = 'rowIndex',
	COLUMN_INDEX = 'columnIndex'
}

let selectionCache: string[] = [];
let lockModifications = false;

penpot.ui.open('Tiling Utility', '', {
	width: 300,
	height: 300
});

function getDefaultPattern(): Pattern_v1 {
	return {
		version: 1,
		mode: 'grid',
		rows: 5,
		columns: 5,
		radius: 50,
		rotateAccordingToDirection: true,
		rules: []
	};
}

/**
 * This class is responsible for applying rules to a position.
 * Each call to process will apply the rules to the given position
 * and return the new position. The memory is used to store the
 * state of the rules. As such, the order of processing is important.
 * 
 * By convention, it should be iterated over rows first, then columns.
 */
class RuleHandler {
	constructor(
		private memory: Map<string, string>,
		private transformer: RuleTransformer,
		private rule: Rule
	) {}

	static fromRule(rule: Rule): RuleHandler {
		const transformer = ruleTransformer[rule.type];
		if (!transformer) {
			throw new Error(`Unknown rule type: ${rule.type}`);
		}
		const memory = ruleMemoryInitializer[rule.type]();
		return new RuleHandler(memory, transformer, rule);
	}

	process(shapeInfo: AbstractShapeInfo) {
		const result = this.transformer(shapeInfo, this.memory, this.rule);
		this.memory = result.memory;
		// A transformer should **NEVER** leave the object in an invalid state.
		fixShapeInfo(result.shapeInfo);
		return result.shapeInfo;
	}
}

type RuleTransformer = (shapeInfo: AbstractShapeInfo, memory: Map<string, string>, rule: Rule) => {shapeInfo: AbstractShapeInfo, memory: Map<string, string>};

/**
 * Applies a rule to an abstract shape object.
 */
const ruleTransformer: Record<RuleKind, RuleTransformer> = {
	randomize: (shapeInfo, memory, rule) => {
		const min = Math.min(rule.from, rule.to);
		const max = Math.max(rule.from, rule.to);
		const property = rule.property;
		const random = Math.random();
		const value = min + random * (max - min);
		shapeInfo[property] = shapeInfo[property] + value;

		

		return { shapeInfo: shapeInfo, memory };
	}
}


/**
 * Prevents the shape from having invalid values.
 * @param shapeInfo the shape to fix
 */
function fixShapeInfo(shapeInfo: AbstractShapeInfo) {
	shapeInfo.rotation = shapeInfo.rotation % 360;
	shapeInfo.width = Math.max(0, shapeInfo.width);
	shapeInfo.height = Math.max(0, shapeInfo.height);
}
	
/**
 * Initializes the memory for a rule. It can be empty.
 */
const ruleMemoryInitializer: Record<RuleKind, () => Map<string, string>> = {
	randomize: () => new Map<string, string>()
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
	} else if (message.type === UIEvents_IC.REQUEST_CURRENT_PATTERN) {
		if (selectionCache.length === 0) {
			penpot.ui.sendMessage({ type: PluginEvents_IC.ERROR, content: 'No selection' });
			return;
		}
		const board = penpot.currentPage?.getShapeById(selectionCache[0]) as Board;
		if (board.getPluginData(PluginDataKey.IS_PATTERN) !== 'true') {
			penpot.ui.sendMessage({ type: PluginEvents_IC.ERROR, content: 'No pattern selected' });
			return;
		}
		penpot.ui.sendMessage({ type: PluginEvents_IC.SEND_PATTERN, content: getBoardPattern(board) });
	} else if (message.type === UIEvents_IC.UPDATE_PATTERN) {
		if (selectionCache.length === 0) {
			penpot.ui.sendMessage({ type: PluginEvents_IC.ERROR, content: 'No selection' });
			return;
		}
		const board = penpot.currentPage?.getShapeById(selectionCache[0]) as Board;
		if (board.getPluginData(PluginDataKey.IS_PATTERN) !== 'true') {
			penpot.ui.sendMessage({ type: PluginEvents_IC.ERROR, content: 'No pattern selected' });
			return;
		}
		const pattern = message.content as Pattern_v1;
		board.setPluginData(PluginDataKey.PATTERN, JSON.stringify(pattern));
		drawPattern(board);
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
	console.info('Creating pattern');
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
	clone.name += ' (source)';
	clone.setPluginData(PluginDataKey.IS_SOURCE, 'true');

	board.appendChild(clone);
	board.setPluginData(PluginDataKey.SOURCE_ID, clone.id);
	board.name = 'Pattern';
	board.fills = [];

	//TODO figure out why this does not work (creates positions issues once the clones are appended)
	// board.x = selectedShape.x + selectedShape.width + 200;
	// board.y = selectedShape.y;

	board.setPluginData(PluginDataKey.PATTERN, JSON.stringify(getDefaultPattern()));
	drawPattern(board);
	penpot.ui.sendMessage({ type: PluginEvents_IC.SEND_PATTERN, content: getBoardPattern(board) });
}

/**
 *
 * @param board The board being the container of the pattern
 * @returns the parsed JSON pattern data
 */
function getBoardPattern(board: Board): Pattern_v1 {
	if (board.getPluginData(PluginDataKey.IS_PATTERN) !== 'true') {
		console.error('Board is not a pattern');
		penpot.ui.sendMessage({
			type: PluginEvents_IC.ERROR,
			content: 'Board is not a pattern, returning default pattern'
		});
		return getDefaultPattern();
	}
	return JSON.parse(board.getPluginData(PluginDataKey.PATTERN)) as Pattern_v1;
}

interface AbstractShapeInfo {
	x: number;
	y: number;
	rotation: number;
	width: number;
	height: number;
}

/**
 * Clears existing shapes (except the source) in excess if any,
 * then create or modify all shapes and position them according
 * to the pattern configuration.
 * @param board The board being the container of the pattern
 * @returns
 */
function drawPattern(board: Board) {
	if (lockModifications) {
		console.warn('Modifications are locked');
		return;
	}
	lockModifications = true;

	console.info('Drawing pattern');
	if (board.getPluginData(PluginDataKey.IS_PATTERN) !== 'true') {
		console.error('Board is not a pattern');
		penpot.ui.sendMessage({ type: PluginEvents_IC.ERROR, content: 'Board is not a pattern' });
		lockModifications = false;
		return;
	}

	// clear existing shapes

	// we need to know the max column and row index
	// to know if clones are missing upon data change
	let maxRowFound = 0;
	let maxColFound = 0;
	const shapeCache = new Map<number, Map<number, Shape>>();
	board.children.forEach((shape) => {
		if (shape.getPluginData(PluginDataKey.IS_SOURCE) !== 'true') {
			const row = shape.getPluginData(PluginDataKey.ROW_INDEX);
			const col = shape.getPluginData(PluginDataKey.COLUMN_INDEX);
			console.debug('Checking', row, col);
			if (row === undefined || col === undefined) {
				console.error('Invalid row or column index (initialization was forgotten somewhere)');
				return;
			}
			const rowInt = parseInt(row);
			const colInt = parseInt(col);
			maxColFound = Math.max(maxColFound, colInt);
			maxRowFound = Math.max(maxRowFound, rowInt);
			if (rowInt >= getBoardPattern(board).rows || colInt >= getBoardPattern(board).columns) {
				shape.remove();
				return;
			}
			if (!shapeCache.has(rowInt)) {
				shapeCache.set(rowInt, new Map<number, Shape>());
			}
			shapeCache.get(rowInt)?.set(colInt, shape);
		}
	});

	const pattern = getBoardPattern(board);
	console.debug('Pattern:', pattern);
	const validity = checkPatternValidity(pattern);
	if (!validity.valid) {
		console.error('Invalid pattern:', validity.context);
		penpot.ui.sendMessage({ type: PluginEvents_IC.ERROR, content: validity.context });
		lockModifications = false;
		return;
	}

	/**
	 * rows, then columns, then positions
	 */
	const positions = new Map<number, Map<number, AbstractShapeInfo>>();

	const sourceId = board.getPluginData(PluginDataKey.SOURCE_ID);
	const source = board.children.find((shape) => shape.id === sourceId);
	if (!source) {
		console.error('No source shape found');
		penpot.ui.sendMessage({ type: PluginEvents_IC.ERROR, content: 'No source shape found' });
		lockModifications = false;
		return;
	}

	board.horizontalSizing = 'fix';
	board.verticalSizing = 'fix';

	// compute base positions
	if (pattern.mode === 'revolution') {
		const centerOffset = pattern.radius + source.height * pattern.rows;
		board.resize(2 * centerOffset, 2 * centerOffset);

		// a row is a circle
		for (let i = 0; i < pattern.rows; i++) {
			const r = pattern.radius + i * source.height;
			const columnPositions = new Map<number, AbstractShapeInfo>();

			// a column is a point on the circle
			for (let j = 0; j < pattern.columns; j++) {
				const x = r * Math.cos(j * ((2 * Math.PI) / pattern.columns)) + centerOffset;
				const y = r * Math.sin(j * ((2 * Math.PI) / pattern.columns)) + centerOffset;
				const rot = pattern.rotateAccordingToDirection ? j * (360 / pattern.columns) + 90 : 0;
				columnPositions.set(j, { x, y, rotation: rot, width: source.width, height: source.height });
			}
			positions.set(i, columnPositions);
		}
	} else if (pattern.mode === 'grid') {
		board.resize(source.width * pattern.columns, source.height * pattern.rows);
		// y axis
		for (let i = 0; i < pattern.rows; i++) {
			const columnPositions = new Map<number, AbstractShapeInfo>();

			// x axis
			for (let j = 0; j < pattern.columns; j++) {
				const x = j * source.width;
				const y = i * source.height;
				columnPositions.set(j, { x, y, rotation: 0, width: source.width, height: source.height });
			}
			positions.set(i, columnPositions);
		}
	}

	// apply rules
	const ruleHandlers: RuleHandler[] = [];
	for (const rule of pattern.rules) {
		ruleHandlers.push(RuleHandler.fromRule(rule));
	}

	for (let i = 0; i < pattern.rows; i++) {
		for (let j = 0; j < pattern.columns; j++) {
			const position = positions.get(i)?.get(j);
			if (!position) {
				console.error('No position found for', i, j);
				continue;
			}
			console.debug('processing at', position);

			let newPosition = position;
			for (const handler of ruleHandlers) {
				newPosition = handler.process(newPosition);
			}
			positions.get(i)?.set(j, newPosition);
		}
	}

	// create shapes
	for (let i = 0; i < pattern.rows; i++) {
		for (let j = 0; j < pattern.columns; j++) {
			const position = positions.get(i)?.get(j);
			if (!position) {
				console.error('No position found for', i, j);
				continue;
			}
			console.debug('updating at', position);

			let clone: Shape | undefined;
			if (i > maxRowFound || j > maxColFound || maxRowFound === 0 || maxColFound === 0) {
				clone = source.clone();
				clone.setPluginData(PluginDataKey.IS_SOURCE, 'false');
				clone.name = clone.name.replace(' (source)', ` (${i}, ${j})`);
				clone.setPluginData(PluginDataKey.ROW_INDEX, i.toString());
				clone.setPluginData(PluginDataKey.COLUMN_INDEX, j.toString());
				// Note: the clone is already a child of the board
				clone.hidden = false;
			} else {
				clone = shapeCache.get(i)?.get(j);
			}

			if (!clone) {
				console.error('No clone found (this is not supposed to happen)');
				continue;
			}

			// apply data
			clone.blocked = false;
			clone.x = position.x + board.x;
			clone.y = position.y + board.y;
			clone.resize(position.width, position.height);
			clone.rotation = source.rotation;
			clone.rotate(position.rotation);
			clone.blocked = true;
		}
	}

	penpot.ui.sendMessage({ type: PluginEvents_IC.ACKNOWLEDGE_UPDATE_PATTERN });
	lockModifications = false;
}

/**
 * Says if the pattern is valid or not. Stops at the first invalidity found.
 * @param pattern The pattern to check
 * @returns
 */
function checkPatternValidity(pattern: Pattern_v1): { valid: boolean; context: string } {
	if (pattern.mode === 'revolution') {
		if (pattern.radius <= 0) {
			return { valid: false, context: 'Radius must be greater than 0' };
		}
	}
	if (pattern.rows <= 0) {
		return { valid: false, context: 'Rows must be greater than 0' };
	}
	if (pattern.columns <= 0) {
		return { valid: false, context: 'Columns must be greater than 0' };
	}
	return { valid: true, context: '' };
}
