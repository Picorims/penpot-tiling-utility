/*
  Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

import type { PenpotEvent, UIEvents } from './types/plugin_events';

export function sendMessage(msg: PenpotEvent<UIEvents>) {
	parent.postMessage(msg, '*');
}
