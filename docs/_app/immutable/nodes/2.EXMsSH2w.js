import { a as N, t as O, c as $ } from '../chunks/disclose-version.BmYXDLn2.js';
import {
	M as ke,
	L as ce,
	D as ze,
	h as z,
	B as se,
	x as qe,
	C as Ue,
	b as Ge,
	aq as Re,
	P as He,
	Q as be,
	R as ie,
	c as W,
	as as ee,
	N as Ne,
	a as Ae,
	O as Ye,
	z as xe,
	at as Be,
	au as Je,
	ap as Ke,
	av as Ve,
	d as We,
	y as Qe,
	am as Xe,
	ag as je,
	aa as Fe,
	G as Ee,
	aw as Ze,
	ax as $e,
	ay as et,
	ak as tt,
	az as rt,
	aA as at,
	aB as nt,
	aC as ot,
	W as Se,
	V as Oe,
	s as R,
	w as c,
	v as k,
	t as U,
	I as D,
	ae as j,
	k as T,
	p as ne,
	e as oe,
	f as q,
	n as Z,
	o as Q,
	aD as lt
} from '../chunks/runtime.C33mUz_z.js';
import { d as st, l as pe, a as H, e as F, f as it } from '../chunks/store.Cu2WRErR.js';
import {
	c as ut,
	a as _e,
	p as ye,
	i as G,
	o as vt,
	b as ct
} from '../chunks/index-client.DkFXpaO1.js';
const ft = [];
function dt(e, t = !1) {
	return te(e, new Map(), '', ft);
}
function te(e, t, r, n, a = null) {
	if (typeof e == 'object' && e !== null) {
		const i = t.get(e);
		if (i !== void 0) return i;
		if (e instanceof Map) return new Map(e);
		if (e instanceof Set) return new Set(e);
		if (ke(e)) {
			const l = [];
			t.set(e, l), a !== null && t.set(a, l);
			for (let _ = 0; _ < e.length; _ += 1) l.push(te(e[_], t, r, n));
			return l;
		}
		if (ce(e) === ze) {
			const l = {};
			t.set(e, l), a !== null && t.set(a, l);
			for (var o in e) l[o] = te(e[o], t, r, n);
			return l;
		}
		if (e instanceof Date) return structuredClone(e);
		if (typeof e.toJSON == 'function') return te(e.toJSON(), t, r, n, e);
	}
	if (e instanceof EventTarget) return e;
	try {
		return structuredClone(e);
	} catch {
		return e;
	}
}
function pt(e, t) {
	return t;
}
function _t(e, t, r, n) {
	for (var a = [], o = t.length, i = 0; i < o; i++) Je(t[i].e, a, !0);
	var l = o > 0 && a.length === 0 && r !== null;
	if (l) {
		var _ = r.parentNode;
		Ke(_), _.append(r), n.clear(), B(e, t[0].prev, t[o - 1].next);
	}
	Ve(a, () => {
		for (var f = 0; f < o; f++) {
			var s = t[f];
			l || (n.delete(s.k), B(e, s.prev, s.next)), We(s.e, !l);
		}
	});
}
function yt(e, t, r, n, a, o = null) {
	var i = e,
		l = { flags: t, items: new Map(), first: null };
	{
		var _ = e;
		i = z ? se(Qe(_)) : _.appendChild(qe());
	}
	z && Ue();
	var f = null,
		s = !1;
	Ge(() => {
		var x = r(),
			y = ke(x) ? x : x == null ? [] : Re(x),
			d = y.length;
		if (s && d === 0) return;
		s = d === 0;
		let u = !1;
		if (z) {
			var v = i.data === He;
			v !== (d === 0) && ((i = be()), se(i), ie(!1), (u = !0));
		}
		if (z) {
			for (var E = null, p, h = 0; h < d; h++) {
				if (W.nodeType === 8 && W.data === Xe) {
					(i = W), (u = !0), ie(!1);
					break;
				}
				var g = y[h],
					b = n(g, h);
				(p = Ce(W, l, E, null, g, b, h, a, t)), l.items.set(b, p), (E = p);
			}
			d > 0 && se(be());
		}
		if (!z) {
			var w = je;
			mt(y, l, i, a, t, (w.f & ee) !== 0, n);
		}
		o !== null &&
			(d === 0
				? f
					? Ne(f)
					: (f = Ae(() => o(i)))
				: f !== null &&
					Ye(f, () => {
						f = null;
					})),
			u && ie(!0),
			r();
	}),
		z && (i = W);
}
function mt(e, t, r, n, a, o, i) {
	var l = e.length,
		_ = t.items,
		f = t.first,
		s = f,
		x,
		y = null,
		d = [],
		u = [],
		v,
		E,
		p,
		h;
	for (h = 0; h < l; h += 1) {
		if (((v = e[h]), (E = i(v, h)), (p = _.get(E)), p === void 0)) {
			var g = s ? s.e.nodes_start : r;
			(y = Ce(g, t, y, y === null ? t.first : y.next, v, E, h, n, a)),
				_.set(E, y),
				(d = []),
				(u = []),
				(s = y.next);
			continue;
		}
		if ((ht(p, v, h), p.e.f & ee && Ne(p.e), p !== s)) {
			if (x !== void 0 && x.has(p)) {
				if (d.length < u.length) {
					var b = u[0],
						w;
					y = b.prev;
					var P = d[0],
						A = d[d.length - 1];
					for (w = 0; w < d.length; w += 1) we(d[w], b, r);
					for (w = 0; w < u.length; w += 1) x.delete(u[w]);
					B(t, P.prev, A.next),
						B(t, y, P),
						B(t, A, b),
						(s = b),
						(y = A),
						(h -= 1),
						(d = []),
						(u = []);
				} else
					x.delete(p),
						we(p, s, r),
						B(t, p.prev, p.next),
						B(t, p, y === null ? t.first : y.next),
						B(t, y, p),
						(y = p);
				continue;
			}
			for (d = [], u = []; s !== null && s.k !== E; )
				(o || !(s.e.f & ee)) && (x ?? (x = new Set())).add(s), u.push(s), (s = s.next);
			if (s === null) continue;
			p = s;
		}
		d.push(p), (y = p), (s = p.next);
	}
	if (s !== null || x !== void 0) {
		for (var I = x === void 0 ? [] : Re(x); s !== null; )
			(o || !(s.e.f & ee)) && I.push(s), (s = s.next);
		var C = I.length;
		if (C > 0) {
			var J = l === 0 ? r : null;
			_t(t, I, J, _);
		}
	}
	(xe.first = t.first && t.first.e), (xe.last = y && y.e);
}
function ht(e, t, r, n) {
	Be(e.v, t), (e.i = r);
}
function Ce(e, t, r, n, a, o, i, l, _) {
	var f = (_ & $e) !== 0,
		s = (_ & et) === 0,
		x = f ? (s ? Fe(a) : Ee(a)) : a,
		y = _ & Ze ? Ee(i) : i,
		d = { i: y, v: x, k: o, a: null, e: null, prev: r, next: n };
	try {
		return (
			(d.e = Ae(() => l(e, x, y), z)),
			(d.e.prev = r && r.e),
			(d.e.next = n && n.e),
			r === null ? (t.first = d) : ((r.next = d), (r.e.next = d.e)),
			n !== null && ((n.prev = d), (n.e.prev = d.e)),
			d
		);
	} finally {
	}
}
function we(e, t, r) {
	for (
		var n = e.next ? e.next.e.nodes_start : r, a = t ? t.e.nodes_start : r, o = e.e.nodes_start;
		o !== n;

	) {
		var i = tt(o);
		a.before(o), (o = i);
	}
}
function B(e, t, r) {
	t === null ? (e.first = r) : ((t.next = r), (t.e.next = r && r.e)),
		r !== null && ((r.prev = t), (r.e.prev = t && t.e));
}
function me(e) {
	if (z) {
		var t = !1,
			r = () => {
				if (!t) {
					if (((t = !0), e.hasAttribute('value'))) {
						var n = e.value;
						S(e, 'value', null), (e.value = n);
					}
					if (e.hasAttribute('checked')) {
						var a = e.checked;
						S(e, 'checked', null), (e.checked = a);
					}
				}
			};
		(e.__on_r = r), rt(r), st();
	}
}
function S(e, t, r, n) {
	var a = e.__attributes ?? (e.__attributes = {});
	(z &&
		((a[t] = e.getAttribute(t)),
		t === 'src' || t === 'srcset' || (t === 'href' && e.nodeName === 'LINK'))) ||
		(a[t] !== (a[t] = r) &&
			(t === 'style' && '__styles' in e && (e.__styles = {}),
			t === 'loading' && (e[at] = r),
			r == null
				? e.removeAttribute(t)
				: typeof r != 'string' && gt(e).includes(t)
					? (e[t] = r)
					: e.setAttribute(t, r)));
}
var Te = new Map();
function gt(e) {
	var t = Te.get(e.nodeName);
	if (t) return t;
	Te.set(e.nodeName, (t = []));
	for (var r, n = ce(e), a = Element.prototype; a !== n; ) {
		r = nt(n);
		for (var o in r) r[o].set && t.push(o);
		n = ce(n);
	}
	return t;
}
function K(e, t, r) {
	if (r) {
		if (e.classList.contains(t)) return;
		e.classList.add(t);
	} else {
		if (!e.classList.contains(t)) return;
		e.classList.remove(t);
	}
}
function De(e, t, r = t) {
	var n = ot();
	pe(e, 'input', () => {
		var a = ue(e) ? ve(e.value) : e.value;
		r(a), n && a !== (a = t()) && (e.value = a ?? '');
	}),
		Se(() => {
			var a = t();
			if (z && e.defaultValue !== e.value) {
				r(ue(e) ? ve(e.value) : e.value);
				return;
			}
			(ue(e) && a === ve(e.value)) ||
				(e.type === 'date' && !a && !e.value) ||
				(a !== e.value && (e.value = a ?? ''));
		});
}
function bt(e, t, r = t) {
	pe(e, 'change', () => {
		var n = e.checked;
		r(n);
	}),
		t() == null && r(!1),
		Se(() => {
			var n = t();
			e.checked = !!n;
		});
}
function ue(e) {
	var t = e.type;
	return t === 'number' || t === 'range';
}
function ve(e) {
	return e === '' ? null : +e;
}
function Pe(e, t, r) {
	if (e.multiple) return Et(e, t);
	for (var n of e.options) {
		var a = X(n);
		if (ut(a, t)) {
			n.selected = !0;
			return;
		}
	}
	(!r || t !== void 0) && (e.selectedIndex = -1);
}
function xt(e, t) {
	Oe(() => {
		var r = new MutationObserver(() => {
			var n = e.__value;
			Pe(e, n);
		});
		return (
			r.observe(e, { childList: !0, subtree: !0, attributes: !0, attributeFilter: ['value'] }),
			() => {
				r.disconnect();
			}
		);
	});
}
function re(e, t, r = t) {
	var n = !0;
	pe(e, 'change', () => {
		var a;
		if (e.multiple) a = [].map.call(e.querySelectorAll(':checked'), X);
		else {
			var o = e.querySelector(':checked');
			a = o && X(o);
		}
		r(a);
	}),
		Oe(() => {
			var a = t();
			if ((Pe(e, a, n), n && a === void 0)) {
				var o = e.querySelector(':checked');
				o !== null && ((a = X(o)), r(a));
			}
			(e.__value = a), (n = !1);
		}),
		xt(e);
}
function Et(e, t) {
	for (var r of e.options) r.selected = ~t.indexOf(X(r));
}
function X(e) {
	return '__value' in e ? e.__value : e.value;
}
function he(e) {
	parent.postMessage(e, '*');
}
let m = _e({
		proxy: {
			columns: 0,
			rows: 0,
			mode: 'grid',
			radius: 0,
			version: 1,
			rotateAccordingToDirection: !1,
			rules: []
		}
	}),
	ae = _e({ value: !1 }),
	fe = _e({ value: 0 });
function wt(e) {
	switch (e) {
		case 'randomize':
			return {
				id: Math.random().toString(36).substring(7),
				type: 'randomize',
				name: 'Randomize',
				enabled: !0,
				property: 'x',
				from: 0,
				to: 0
			};
		case 'offset':
			return {
				id: Math.random().toString(36).substring(7),
				name: 'Offset',
				type: 'offset',
				enabled: !0,
				property: 'x',
				offset: 0,
				accumulate: !1
			};
		default:
			throw new Error(`Unknown rule kind: ${e}`);
	}
}
var M = ((e) => (
		(e.NO_SELECTION = 'no-selection'),
		(e.ONE_SELECTION = 'one-selection'),
		(e.MULTIPLE_SELECTION = 'multiple-selection'),
		(e.PATTERN_SELECTED = 'pattern-selected'),
		(e.PONG = 'pong'),
		(e.ERROR = 'error'),
		(e.SEND_PATTERN = 'send-pattern'),
		(e.ACKNOWLEDGE_UPDATE_PATTERN = 'acknowledge-update-pattern'),
		(e.SEND_PROGRESSION = 'send-progression'),
		e
	))(M || {}),
	le = ((e) => (
		(e.PING = 'ping'),
		(e.CREATE_PATTERN = 'create-pattern'),
		(e.REQUEST_CURRENT_PATTERN = 'request-current-pattern'),
		(e.UPDATE_PATTERN = 'update-pattern'),
		e
	))(le || {}),
	Tt = O(
		'<div class="checkbox-container svelte-p1bwru"><input class="checkbox-input" type="checkbox"> <label class="body-small"> </label></div>'
	);
function de(e, t) {
	let r = ye(t, 'checked', 15);
	var n = Tt(),
		a = R(n);
	me(a);
	var o,
		i = c(a, 2),
		l = R(i, !0);
	k(i),
		k(n),
		U(() => {
			S(a, 'id', t.id),
				o !== (o = t.id) && (a.value = (a.__value = t.id) == null ? '' : t.id),
				S(i, 'for', t.id),
				H(l, t.label);
		}),
		bt(a, r),
		N(e, n);
}
var kt = O('<div class="container svelte-klkcgv"><strong> </strong> </div>');
function Rt(e, t) {
	var r = kt(),
		n = R(r),
		a = R(n);
	k(n);
	var o = c(n);
	k(r),
		U(() => {
			K(r, 'info', t.variant === 'info'),
				K(r, 'success', t.variant === 'success'),
				K(r, 'error', t.variant === 'error'),
				K(r, 'warning', t.variant === 'warning'),
				H(a, `${t.variant ?? ''}:`),
				H(o, ` ${t.message ?? ''}`);
		}),
		N(e, r);
}
new TextEncoder();
function Nt(e, t, r, n) {
	D(t, !1), r.min && n() < r.min && D(t, !0), r.max && n() > r.max && D(t, !0);
}
var At = O(
	'<div class="input-container svelte-bupynw"><label class="input-label svelte-bupynw"> </label> <input class="input" type="number"></div>'
);
function V(e, t) {
	let r = ye(t, 'value', 15),
		n = j(!1);
	var a = At(),
		o = R(a),
		i = R(o, !0);
	k(o);
	var l = c(o, 2);
	me(l),
		(l.__input = [Nt, n, t, r]),
		k(a),
		U(() => {
			S(o, 'for', t.id),
				H(i, t.label),
				S(l, 'id', t.id),
				S(l, 'min', t.min),
				S(l, 'max', t.max),
				S(l, 'step', t.step),
				K(l, 'error', T(n));
		}),
		De(l, r),
		N(e, a);
}
F(['input']);
function St(e, t, r, n) {
	if (!t.regex) {
		D(r, !1);
		return;
	}
	if (n() === null) {
		D(r, !0);
		return;
	}
	new RegExp(t.regex).test(n().toString()) ? D(r, !1) : D(r, !0);
}
var Ot = O(
	'<div class="input-container svelte-bupynw"><label class="input-label svelte-bupynw"> </label> <input class="input" type="text"></div>'
);
function Ct(e, t) {
	ne(t, !0);
	let r = ye(t, 'value', 15),
		n = j(!1);
	var a = Ot(),
		o = R(a),
		i = R(o, !0);
	k(o);
	var l = c(o, 2);
	me(l),
		(l.__input = [St, t, n, r]),
		k(a),
		U(() => {
			var _;
			S(o, 'for', t.id),
				H(i, t.label),
				S(l, 'id', t.id),
				S(l, 'pattern', (_ = t.regex) == null ? void 0 : _.source),
				K(l, 'error', T(n));
		}),
		De(l, r),
		N(e, a),
		oe();
}
F(['input']);
var Dt = O(
		`<select class="select"><option>X</option><option>Y</option><option>Width</option><option>Height</option><option>Rotation</option></select> <p>A negative value allow to go below the initial value, while a positive value allows to go above
		the initial value. Min and Max are determined by the lowest and highest value provided below.</p> <!> <!>`,
		1
	),
	Pt = O(
		`<p><strong>Note:</strong> This rule currently has no effect on revolution mode.</p> <label>Property</label> <select class="select"><option>X</option><option>Y</option></select> <p>A negative value will move the element to the left or up, while a positive value will move the
		element to the right or down.</p> <!> <p>Accumulation means that all previous offsets are added to the current offset. Disable this
		option if you want consistent offsets (applied by this rule).</p> <!>`,
		1
	),
	Lt = O(
		'<details class="rule svelte-1hofekk"><summary class="svelte-1hofekk"><span class="headline-m svelte-1hofekk"> </span> <span class="body-m svelte-1hofekk"> </span></summary> <div class="details-content svelte-1hofekk"><!> <button type="button" data-appearance="primary">Move Up</button> <button type="button" data-appearance="primary">Move Down</button> <button type="button" data-appearance="primary" data-variant="destructive">Remove</button> <!> <!></div></details>'
	),
	It = O(
		`<div class="add-rule-container svelte-1hofekk"><p><strong>Note:</strong> The plugin is currently unable to adjust the frame size based on rules. Disabling
		clipping might be necessary to see the full pattern. You can also manually resize the frame, although
		currently this will be overridden every time you apply changes.</p> <select id="pattern-type" class="select"><option>Randomize</option><option>Offset</option></select> <button type="button" data-appearance="primary">Add Rule</button></div> <div class="rule-list svelte-1hofekk"></div>`,
		1
	);
function Mt(e, t) {
	ne(t, !0);
	const r = (d, u = Z, v = Z) => {
			var E = Dt(),
				p = q(E),
				h = R(p);
			h.value = (h.__value = 'x') == null ? '' : 'x';
			var g = c(h);
			g.value = (g.__value = 'y') == null ? '' : 'y';
			var b = c(g);
			b.value = (b.__value = 'width') == null ? '' : 'width';
			var w = c(b);
			w.value = (w.__value = 'height') == null ? '' : 'height';
			var P = c(w);
			(P.value = (P.__value = 'rotation') == null ? '' : 'rotation'), k(p);
			var A = c(p, 4),
				I = Q(() => `rule-${v()}-from`);
			V(A, {
				get id() {
					return T(I);
				},
				label: 'From',
				get value() {
					return u().from;
				},
				set value(Y) {
					u().from = Y;
				}
			});
			var C = c(A, 2),
				J = Q(() => `rule-${v()}-to`);
			V(C, {
				get id() {
					return T(J);
				},
				label: 'To',
				get value() {
					return u().to;
				},
				set value(Y) {
					u().to = Y;
				}
			}),
				U(() => S(p, 'id', `rule-${v()}-property`)),
				re(
					p,
					() => u().property,
					(Y) => (u().property = Y)
				),
				N(d, E);
		},
		n = (d, u = Z, v = Z) => {
			var E = Pt(),
				p = c(q(E), 2),
				h = c(p, 2),
				g = R(h);
			g.value = (g.__value = 'x') == null ? '' : 'x';
			var b = c(g);
			(b.value = (b.__value = 'y') == null ? '' : 'y'), k(h);
			var w = c(h, 4),
				P = Q(() => `rule-${v()}-offset`);
			V(w, {
				get id() {
					return T(P);
				},
				label: 'Offset',
				get value() {
					return u().offset;
				},
				set value(C) {
					u().offset = C;
				}
			});
			var A = c(w, 4),
				I = Q(() => `rule-${v()}-accumulate`);
			de(A, {
				get id() {
					return T(I);
				},
				label: 'Accumulate',
				get checked() {
					return u().accumulate;
				},
				set checked(C) {
					u().accumulate = C;
				}
			}),
				U(() => {
					S(p, 'for', `rule-${v()}-property`), S(h, 'id', `rule-${v()}-property`);
				}),
				re(
					h,
					() => u().property,
					(C) => (u().property = C)
				),
				N(d, E);
		};
	let a = j('randomize');
	function o() {
		m.proxy.rules.push(wt(T(a)));
	}
	var i = It(),
		l = q(i),
		_ = c(R(l), 2),
		f = R(_);
	f.value = (f.__value = 'randomize') == null ? '' : 'randomize';
	var s = c(f);
	(s.value = (s.__value = 'offset') == null ? '' : 'offset'), k(_);
	var x = c(_, 2);
	(x.__click = o), k(l);
	var y = c(l, 2);
	yt(
		y,
		21,
		() => m.proxy.rules,
		pt,
		(d, u, v) => {
			var E = Lt(),
				p = R(E),
				h = R(p),
				g = R(h, !0);
			k(h);
			var b = c(h, 2),
				w = R(b, !0);
			k(b), k(p);
			var P = c(p, 2),
				A = R(P);
			de(A, {
				id: `rule-${v}-enabled`,
				label: 'Enabled',
				get checked() {
					return T(u).enabled;
				},
				set checked(L) {
					T(u).enabled = L;
				}
			});
			var I = c(A, 2);
			(I.__click = () => {
				if (v === 0) return;
				const L = m.proxy.rules[v];
				(m.proxy.rules[v] = m.proxy.rules[v - 1]), (m.proxy.rules[v - 1] = L);
			}),
				(I.disabled = v === 0);
			var C = c(I, 2);
			C.__click = () => {
				if (v === m.proxy.rules.length - 1) return;
				const L = m.proxy.rules[v];
				(m.proxy.rules[v] = m.proxy.rules[v + 1]), (m.proxy.rules[v + 1] = L);
			};
			var J = c(C, 2);
			J.__click = () => {
				window.confirm('Are you sure you want to remove this rule?') && m.proxy.rules.splice(v, 1);
			};
			var Y = c(J, 2);
			Ct(Y, {
				id: `rule-${v}-name`,
				label: 'Name',
				regex: new RegExp(/^[A-Za-z0-9 _]+$/g),
				get value() {
					return T(u).name;
				},
				set value(L) {
					T(u).name = L;
				}
			});
			var Le = c(Y, 2);
			G(
				Le,
				() => T(u).type === 'randomize',
				(L) => {
					r(
						L,
						() => T(u),
						() => v
					);
				},
				(L) => {
					var ge = $(),
						Ie = q(ge);
					G(
						Ie,
						() => T(u).type === 'offset',
						(Me) => {
							n(
								Me,
								() => T(u),
								() => v
							);
						},
						null,
						!0
					),
						N(L, ge);
				}
			),
				k(P),
				k(E),
				U(() => {
					H(g, T(u).type), H(w, T(u).name), (C.disabled = v === m.proxy.rules.length - 1);
				}),
				N(d, E);
		}
	),
		k(y),
		re(
			_,
			() => T(a),
			(d) => D(a, d)
		),
		N(e, i),
		oe();
}
F(['click']);
var zt = O('<!> <!>', 1),
	qt = O('<p> </p>'),
	Ut = O(
		'<h2 class="title-m svelte-4jn5m5">Pattern editor</h2> <p><strong>Note:</strong> Changes take effect after pressing on the "Apply" button.</p> <form class="form-group container svelte-4jn5m5"><label class="select-label svelte-4jn5m5" for="pattern-type">Pattern type</label> <select id="pattern-type" class="select"><option>Grid</option><option>Revolution</option></select> <!> <!> <!> <!> <h2 class="title-m svelte-4jn5m5">Rules</h2> <!> <hr> <button type="submit" data-appearance="primary">Apply</button> <!></form> <h2 class="title-m svelte-4jn5m5">Debugging information</h2> <button type="button" data-appearance="secondary">Copy to clipboard</button> <pre class="svelte-4jn5m5"> </pre>',
		1
	);
function Gt(e, t) {
	ne(t, !0);
	function r(g) {
		g.preventDefault();
		const b = dt(m.proxy);
		console.log('pattern changed', b), (ae.value = !0), he({ type: le.UPDATE_PATTERN, content: b });
	}
	function n() {
		const g = JSON.stringify(m.proxy);
		navigator.clipboard.writeText(g), alert('Pattern copied to clipboard');
	}
	var a = Ut(),
		o = c(q(a), 4),
		i = c(R(o), 2),
		l = R(i);
	l.value = (l.__value = 'grid') == null ? '' : 'grid';
	var _ = c(l);
	(_.value = (_.__value = 'revolution') == null ? '' : 'revolution'), k(i);
	var f = c(i, 2);
	V(f, {
		id: 'pattern-rows',
		label: 'Rows',
		min: 1,
		get value() {
			return m.proxy.rows;
		},
		set value(g) {
			m.proxy.rows = g;
		}
	});
	var s = c(f, 2);
	V(s, {
		id: 'pattern-columns',
		label: 'Columns',
		min: 1,
		get value() {
			return m.proxy.columns;
		},
		set value(g) {
			m.proxy.columns = g;
		}
	});
	var x = c(s, 2);
	G(
		x,
		() => m.proxy.rows * m.proxy.columns > 200,
		(g) => {
			var b = Q(
				() =>
					`The pattern has ${m.proxy.rows * m.proxy.columns} items, it may slow down the plugin and Penpot.`
			);
			Rt(g, {
				variant: 'warning',
				get message() {
					return T(b);
				}
			});
		}
	);
	var y = c(x, 2);
	G(
		y,
		() => m.proxy.mode === 'revolution',
		(g) => {
			var b = zt(),
				w = q(b);
			V(w, {
				id: 'pattern-radius',
				label: 'Radius',
				min: 1,
				get value() {
					return m.proxy.radius;
				},
				set value(A) {
					m.proxy.radius = A;
				}
			});
			var P = c(w, 2);
			de(P, {
				id: 'pattern-type',
				get checked() {
					return m.proxy.rotateAccordingToDirection;
				},
				set checked(A) {
					m.proxy.rotateAccordingToDirection = A;
				},
				label: 'Rotate according to direction'
			}),
				N(g, b);
		}
	);
	var d = c(y, 4);
	Mt(d, {});
	var u = c(d, 4),
		v = c(u, 2);
	G(
		v,
		() => ae.value,
		(g) => {
			var b = qt(),
				w = R(b);
			U(() => H(w, `Loading... ${Math.floor(fe.value * 100) ?? ''}%`)), k(b), N(g, b);
		}
	),
		k(o);
	var E = c(o, 4);
	E.__click = n;
	var p = c(E, 2),
		h = R(p, !0);
	U(() => H(h, JSON.stringify(m.proxy).replaceAll(',', ', '))),
		k(p),
		U(() => (u.disabled = ae.value)),
		it('submit', o, r),
		re(
			i,
			() => m.proxy.mode,
			(g) => (m.proxy.mode = g)
		),
		N(e, a),
		oe();
}
F(['click']);
function Ht() {
	he({ type: le.CREATE_PATTERN });
}
var Yt = O(
		'<p class="body-l svelte-qx79ab">To begin, select an element from which you would like to create a tiling.</p> <p class="body-l svelte-qx79ab">Alternatively, select an existing pattern to modify it.</p>',
		1
	),
	Bt = O('<p class="body-l svelte-qx79ab">Please only select one element at a time.</p>'),
	Jt = O(
		'<p class="body-l svelte-qx79ab">This element can be a pattern source (a copy will be made).</p> <button type="button" data-appearance="primary">Create pattern</button>',
		1
	),
	Kt = O(
		'<div class="container svelte-qx79ab" data-theme="dark"><h1 class="title-l svelte-qx79ab">Tiling Utility</h1> <!></div>'
	);
function jt(e, t) {
	ne(t, !0);
	let r = j('none'),
		n = j(!1),
		a;
	function o(_) {
		const f = _.data;
		if (f.type === M.MULTIPLE_SELECTION) D(r, 'multiple');
		else if (f.type === M.ONE_SELECTION) D(r, 'one');
		else if (f.type === M.NO_SELECTION) D(r, 'none');
		else if (f.type === M.PATTERN_SELECTED)
			D(r, 'pattern'), he({ type: le.REQUEST_CURRENT_PATTERN });
		else if (f.type === M.SEND_PATTERN) {
			const s = f.content;
			if (!s) throw new Error('Pattern creation failed');
			D(n, !0), (m.proxy = s);
		} else if (f.type === M.ACKNOWLEDGE_UPDATE_PATTERN) (ae.value = !1), (fe.value = 1);
		else if (f.type === M.PONG) console.log('pong');
		else if (f.type === M.SEND_PROGRESSION) {
			const s = f.content;
			if (!s) throw new Error('Progression value is missing');
			fe.value = s.ratio;
		} else if (f.type === M.ERROR) console.error('plugin error', f.content);
		else throw new Error('Unknown event type: ' + f.type);
	}
	vt(() => {
		window.matchMedia('(prefers-color-scheme: light)').matches &&
			(a == null || a.setAttribute('data-theme', 'light')),
			window.addEventListener('message', o);
	});
	var i = Kt(),
		l = c(R(i), 2);
	G(
		l,
		() => T(r) === 'none',
		(_) => {
			var f = Yt();
			lt(2), N(_, f);
		},
		(_) => {
			var f = $(),
				s = q(f);
			G(
				s,
				() => T(r) === 'multiple',
				(x) => {
					var y = Bt();
					N(x, y);
				},
				(x) => {
					var y = $(),
						d = q(y);
					G(
						d,
						() => T(r) === 'one',
						(u) => {
							var v = Jt(),
								E = c(q(v), 2);
							(E.__click = [Ht]), N(u, v);
						},
						(u) => {
							var v = $(),
								E = q(v);
							G(
								E,
								() => T(r) === 'pattern',
								(p) => {
									Gt(p, {});
								},
								null,
								!0
							),
								N(u, v);
						},
						!0
					),
						N(x, y);
				},
				!0
			),
				N(_, f);
		}
	),
		k(i),
		ct(
			i,
			(_) => (a = _),
			() => a
		),
		N(e, i),
		oe();
}
F(['click']);
export { jt as component };
//# sourceMappingURL=2.EXMsSH2w.js.map
