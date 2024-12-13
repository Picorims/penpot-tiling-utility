/*
  Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

export interface Pattern_v1 {
	version: 1;
	mode: "revolution" | "grid";
	rows: number;
	columns: number;
  radius: number;
  rotateAccordingToDirection: boolean;
}