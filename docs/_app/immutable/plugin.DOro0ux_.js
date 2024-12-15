let h = [],
	g = !1;
penpot.ui.open('Tiling Utility', '', { width: 300, height: 300 });
function M() {
	return {
		version: 1,
		mode: 'grid',
		rows: 5,
		columns: 5,
		radius: 50,
		rotateAccordingToDirection: !0,
		rules: []
	};
}
class w {
	constructor(t, n, s, u) {
		(this.memory = t), (this.transformer = n), (this.rule = s), (this.patternMode = u);
	}
	static fromRule(t, n) {
		const s = N[t.type];
		if (!s) throw new Error(`Unknown rule type: ${t.type}`);
		const u = k[t.type]();
		return new w(u, s, t, n);
	}
	process(t) {
		const n = this.transformer(t, this.memory, this.rule, this.patternMode);
		return (this.memory = n.memory), S(n.shapeInfo), n.shapeInfo;
	}
}
const N = {
	randomize: (e, t, n) => {
		const s = Math.min(n.from, n.to),
			u = Math.max(n.from, n.to),
			c = n.property,
			d = Math.random(),
			f = s + d * (u - s);
		return (e[c] = e[c] + f), { shapeInfo: e, memory: t };
	},
	offset: (e, t, n, s) => {
		if (s === 'revolution')
			return (
				console.warn('Offset rule is not supported in revolution mode'), { shapeInfo: e, memory: t }
			);
		const u = n.property,
			c = n.offset,
			d = n.accumulate,
			f = e.row,
			m = e.column;
		let p, o;
		if (u === 'x') o = m;
		else if (u === 'y') o = f;
		else throw new Error(`Unknown offset property: ${u}`);
		if (((p = o * c), d)) for (let i = 0; i < o; i++) p += i * c;
		if (u === 'x') e.x += p;
		else if (u === 'y') e.y += p;
		else throw new Error(`Unknown offset property: ${u}`);
		return { shapeInfo: e, memory: t };
	}
};
function S(e) {
	(e.rotation = e.rotation % 360),
		(e.width = Math.max(0, e.width)),
		(e.height = Math.max(0, e.height));
}
const k = { randomize: () => new Map(), offset: () => new Map() };
penpot.ui.onMessage((e) => {
	var t, n;
	if ((console.log('received UI message', e), e.type === 'ping')) penpot.ui.sendMessage('pong');
	else if (e.type === 'create-pattern') B();
	else if (e.type === 'request-current-pattern') {
		if (h.length === 0) {
			penpot.ui.sendMessage({ type: 'error', content: 'No selection' });
			return;
		}
		const s = (t = penpot.currentPage) == null ? void 0 : t.getShapeById(h[0]);
		if (s.getPluginData('isPattern') !== 'true') {
			penpot.ui.sendMessage({ type: 'error', content: 'No pattern selected' });
			return;
		}
		penpot.ui.sendMessage({ type: 'send-pattern', content: y(s) });
	} else if (e.type === 'update-pattern') {
		if (h.length === 0) {
			penpot.ui.sendMessage({ type: 'error', content: 'No selection' });
			return;
		}
		const s = (n = penpot.currentPage) == null ? void 0 : n.getShapeById(h[0]);
		if (s.getPluginData('isPattern') !== 'true') {
			penpot.ui.sendMessage({ type: 'error', content: 'No pattern selected' });
			return;
		}
		const u = e.content;
		s.setPluginData('pattern', JSON.stringify(u)), P(s);
	} else console.error('Unknown message from UI:', e);
});
penpot.on('selectionchange', (e) => {
	var t;
	if (((h = [...e]), e.length === 0)) penpot.ui.sendMessage({ type: 'no-selection' });
	else if (e.length === 1) {
		const n = (t = penpot.currentPage) == null ? void 0 : t.getShapeById(e[0]);
		if (!n) {
			penpot.ui.sendMessage({ type: 'no-selection' });
			return;
		}
		n.getPluginData('isPattern') === 'true'
			? (penpot.ui.sendMessage({ type: 'pattern-selected' }),
				penpot.ui.sendMessage({ type: 'send-pattern', content: y(n) }))
			: penpot.ui.sendMessage({ type: 'one-selection' });
	} else penpot.ui.sendMessage({ type: 'multiple-selection' });
});
function B() {
	var s;
	console.info('Creating pattern');
	const e = penpot.createBoard();
	e.setPluginData('isPattern', 'true');
	const t = (s = penpot.currentPage) == null ? void 0 : s.getShapeById(h[0]);
	if (!t) {
		console.error('No shape selected'),
			penpot.ui.sendMessage({ type: 'error', content: 'No shape selected' });
		return;
	}
	const n = t == null ? void 0 : t.clone();
	(n.x = 0),
		(n.y = 0),
		(n.hidden = !0),
		(n.blocked = !0),
		(n.name += ' (source)'),
		n.setPluginData('isSource', 'true'),
		e.appendChild(n),
		e.setPluginData('sourceId', n.id),
		(e.name = 'Pattern'),
		(e.fills = []),
		e.setPluginData('pattern', JSON.stringify(M())),
		P(e),
		penpot.ui.sendMessage({ type: 'send-pattern', content: y(e) });
}
function y(e) {
	return e.getPluginData('isPattern') !== 'true'
		? (console.error('Board is not a pattern'),
			penpot.ui.sendMessage({
				type: 'error',
				content: 'Board is not a pattern, returning default pattern'
			}),
			M())
		: JSON.parse(e.getPluginData('pattern'));
}
function P(e) {
	var f, m, p;
	if (g) {
		console.warn('Modifications are locked');
		return;
	}
	if (((g = !0), console.info('Drawing pattern'), e.getPluginData('isPattern') !== 'true')) {
		console.error('Board is not a pattern'),
			penpot.ui.sendMessage({ type: 'error', content: 'Board is not a pattern' }),
			(g = !1);
		return;
	}
	e.children.forEach((o) => {
		o.getPluginData('isSource') !== 'true' && o.remove();
	});
	const t = y(e);
	console.debug('Pattern:', t);
	const n = z(t);
	if (!n.valid) {
		console.error('Invalid pattern:', n.context),
			penpot.ui.sendMessage({ type: 'error', content: n.context }),
			(g = !1);
		return;
	}
	const s = new Map(),
		u = e.getPluginData('sourceId'),
		c = e.children.find((o) => o.id === u);
	if (!c) {
		console.error('No source shape found'),
			penpot.ui.sendMessage({ type: 'error', content: 'No source shape found' }),
			(g = !1);
		return;
	}
	if (((e.horizontalSizing = 'fix'), (e.verticalSizing = 'fix'), t.mode === 'revolution')) {
		const o = t.radius + c.height * t.rows;
		e.resize(2 * o, 2 * o);
		for (let i = 0; i < t.rows; i++) {
			const a = t.radius + i * c.height,
				r = new Map();
			for (let l = 0; l < t.columns; l++) {
				const x = a * Math.cos(l * ((2 * Math.PI) / t.columns)) + o,
					D = a * Math.sin(l * ((2 * Math.PI) / t.columns)) + o,
					v = t.rotateAccordingToDirection ? l * (360 / t.columns) + 90 : 0;
				r.set(l, { row: i, column: l, x, y: D, rotation: v, width: c.width, height: c.height });
			}
			s.set(i, r);
		}
	} else if (t.mode === 'grid') {
		e.resize(c.width * t.columns, c.height * t.rows);
		for (let o = 0; o < t.rows; o++) {
			const i = new Map();
			for (let a = 0; a < t.columns; a++) {
				const r = a * c.width,
					l = o * c.height;
				i.set(a, { row: o, column: a, x: r, y: l, rotation: 0, width: c.width, height: c.height });
			}
			s.set(o, i);
		}
	}
	const d = [];
	for (const o of t.rules) o.enabled && d.push(w.fromRule(o, t.mode));
	for (let o = 0; o < t.rows; o++)
		for (let i = 0; i < t.columns; i++) {
			const a = (f = s.get(o)) == null ? void 0 : f.get(i);
			if (!a) {
				console.error('No position found for', o, i);
				continue;
			}
			let r = a;
			for (const l of d) r = l.process(r);
			(m = s.get(o)) == null || m.set(i, r);
		}
	for (let o = 0; o < t.rows; o++)
		for (let i = 0; i < t.columns; i++) {
			penpot.ui.sendMessage({
				type: 'send-progression',
				content: { ratio: o / t.rows + (1 / t.rows / t.columns) * i }
			});
			const a = (p = s.get(o)) == null ? void 0 : p.get(i);
			if (!a) {
				console.error('No position found for', o, i);
				continue;
			}
			const r = c.clone();
			if (
				(r.setPluginData('isSource', 'false'),
				(r.name = r.name.replace(' (source)', ` (${o}, ${i})`)),
				r.setPluginData('rowIndex', o.toString()),
				r.setPluginData('columnIndex', i.toString()),
				(r.hidden = !1),
				!r)
			) {
				console.error('No clone found (this is not supposed to happen)');
				continue;
			}
			(r.blocked = !1),
				r.resize(a.width, a.height),
				t.mode === 'revolution'
					? ((r.x = a.x - a.width / 2 + e.x), (r.y = a.y - a.height / 2 + e.y))
					: t.mode === 'grid' && ((r.x = a.x + e.x), (r.y = a.y + e.y)),
				(r.rotation = c.rotation),
				r.rotate(a.rotation, { x: r.x + r.width / 2, y: r.y + r.height / 2 }),
				(r.blocked = !0);
		}
	penpot.ui.sendMessage({ type: 'acknowledge-update-pattern' }), (g = !1);
}
function z(e) {
	return e.mode === 'revolution' && e.radius <= 0
		? { valid: !1, context: 'Radius must be greater than 0' }
		: e.rows <= 0
			? { valid: !1, context: 'Rows must be greater than 0' }
			: e.columns <= 0
				? { valid: !1, context: 'Columns must be greater than 0' }
				: { valid: !0, context: '' };
}
//# sourceMappingURL=plugin.DOro0ux_.js.map
