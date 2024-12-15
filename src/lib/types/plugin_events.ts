/*
  Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

export enum PluginEvents {
	NO_SELECTION = 'no-selection',
	ONE_SELECTION = 'one-selection',
	MULTIPLE_SELECTION = 'multiple-selection',
	PATTERN_SELECTED = 'pattern-selected',
	PONG = 'pong',
	ERROR = 'error',
	SEND_PATTERN = 'send-pattern',
	ACKNOWLEDGE_UPDATE_PATTERN = 'acknowledge-update-pattern',
	SEND_PROGRESSION = 'send-progression'
}

export enum UIEvents {
	PING = 'ping',
	CREATE_PATTERN = 'create-pattern',
	REQUEST_CURRENT_PATTERN = 'request-current-pattern',
	UPDATE_PATTERN = 'update-pattern'
}

/**
 * Generic event type allows to handle enums both declared
 * here and in plugin (copies).
 */
export interface PenpotEvent<T extends string> {
	type: T;
	content?: object;
}

// TODO use conditional types for stronger typing of events
