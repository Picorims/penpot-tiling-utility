/*
  Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

// TODO: consider typia for better type checking

export interface Pattern_v1 {
	/**
	 * save version of the pattern
	 */
	version: 1;
	/**
	 * define how shapes are placed in the pattern
	 */
	mode: 'revolution' | 'grid';
	rows: number;
	columns: number;
	/**
	 * define the minimum distance from the center,
	 * if mode is revolution
	 */
	radius: number;
	/**
	 * if true, shapes will rotate according to the direction,
	 * if mode is revolution
	 */
	rotateAccordingToDirection: boolean;
	/**
	 * list of rules to apply to the shapes.
	 * The order of the rules is important.
	 * They are applied in the order they are defined.
	 */
	rules: Rule[];
}

export interface BaseRule {
	id: string;
	type: string;
	enabled: boolean;
}

export interface RandomRule extends BaseRule {
	type: 'randomize';
	property: 'x' | 'y' | 'rotation' | 'width' | 'height';
	from: number;
	to: number;
	// TODO add seed support? requires a custom random function
}

export interface OffsetRule extends BaseRule {
	type: 'offset';
	property: 'x' | 'y';
	offset: number;
	accumulate: boolean;
}

export type Rule = RandomRule | OffsetRule;
export type GenericRule<RuleKind> = RuleKind extends 'randomize'
	? RandomRule
	: RuleKind extends 'offset'
		? OffsetRule
		: never;
export type RuleKind = Rule['type'];
