import {
	af as E,
	a2 as T,
	ag as P,
	z as A,
	ah as V,
	X as W,
	ac as Y,
	M as $,
	ai as R,
	y as z,
	aj as X,
	ak as x,
	al as m,
	R as y,
	B as I,
	C as F,
	c as b,
	am as G,
	an as J,
	ao as K,
	ap as Q,
	aq as U,
	ar as Z,
	x as ee,
	a as re,
	p as te,
	h as S,
	e as ae,
	i as ne,
	n as N,
	j as se,
	aa as ie,
	k as ue,
	I as oe
} from './runtime.C33mUz_z.js';
import { d as fe } from './disclose-version.BmYXDLn2.js';
let M = !1;
function ce() {
	M ||
		((M = !0),
		document.addEventListener(
			'reset',
			(e) => {
				Promise.resolve().then(() => {
					var r;
					if (!e.defaultPrevented)
						for (const a of e.target.elements) (r = a.__on_r) == null || r.call(a);
				});
			},
			{ capture: !0 }
		));
}
function j(e) {
	var r = P,
		a = A;
	E(null), T(null);
	try {
		return e();
	} finally {
		E(r), T(a);
	}
}
function ge(e, r, a, n = a) {
	e.addEventListener(r, () => j(a));
	const s = e.__on_r;
	s
		? (e.__on_r = () => {
				s(), n();
			})
		: (e.__on_r = n),
		ce();
}
const q = new Set(),
	k = new Set();
function le(e, r, a, n) {
	function s(t) {
		if ((n.capture || p.call(r, t), !t.cancelBubble)) return j(() => a.call(this, t));
	}
	return (
		e.startsWith('pointer') || e.startsWith('touch') || e === 'wheel'
			? W(() => {
					r.addEventListener(e, s, n);
				})
			: r.addEventListener(e, s, n),
		s
	);
}
function ye(e, r, a, n, s) {
	var t = { capture: n, passive: s },
		o = le(e, r, a, t);
	(r === document.body || r === window || r === document) &&
		V(() => {
			r.removeEventListener(e, o, t);
		});
}
function we(e) {
	for (var r = 0; r < e.length; r++) q.add(e[r]);
	for (var a of k) a(e);
}
function p(e) {
	var D;
	var r = this,
		a = r.ownerDocument,
		n = e.type,
		s = ((D = e.composedPath) == null ? void 0 : D.call(e)) || [],
		t = s[0] || e.target,
		o = 0,
		v = e.__root;
	if (v) {
		var l = s.indexOf(v);
		if (l !== -1 && (r === document || r === window)) {
			e.__root = r;
			return;
		}
		var d = s.indexOf(r);
		if (d === -1) return;
		l <= d && (o = l);
	}
	if (((t = s[o] || e.target), t !== r)) {
		Y(e, 'currentTarget', {
			configurable: !0,
			get() {
				return t || a;
			}
		});
		var L = P,
			f = A;
		E(null), T(null);
		try {
			for (var i, u = []; t !== null; ) {
				var c = t.assignedSlot || t.parentNode || t.host || null;
				try {
					var _ = t['__' + n];
					if (_ !== void 0 && !t.disabled)
						if ($(_)) {
							var [C, ...H] = _;
							C.apply(t, [e, ...H]);
						} else _.call(t, e);
				} catch (g) {
					i ? u.push(g) : (i = g);
				}
				if (e.cancelBubble || c === r || c === null) break;
				t = c;
			}
			if (i) {
				for (let g of u)
					queueMicrotask(() => {
						throw g;
					});
				throw i;
			}
		} finally {
			(e.__root = r), delete e.currentTarget, E(L), T(f);
		}
	}
}
const de = ['touchstart', 'touchmove'];
function _e(e) {
	return de.includes(e);
}
function Ee(e, r) {
	var a = r == null ? '' : typeof r == 'object' ? r + '' : r;
	a !== (e.__t ?? (e.__t = e.nodeValue)) && ((e.__t = a), (e.nodeValue = a == null ? '' : a + ''));
}
function ve(e, r) {
	return B(e, r);
}
function Te(e, r) {
	R(), (r.intro = r.intro ?? !1);
	const a = r.target,
		n = S,
		s = b;
	try {
		for (var t = z(a); t && (t.nodeType !== 8 || t.data !== X); ) t = x(t);
		if (!t) throw m;
		y(!0), I(t), F();
		const o = B(e, { ...r, anchor: t });
		if (b === null || b.nodeType !== 8 || b.data !== G) throw (J(), m);
		return y(!1), o;
	} catch (o) {
		if (o === m) return r.recover === !1 && K(), R(), Q(a), y(!1), ve(e, r);
		throw o;
	} finally {
		y(n), I(s);
	}
}
const h = new Map();
function B(e, { target: r, anchor: a, props: n = {}, events: s, context: t, intro: o = !0 }) {
	R();
	var v = new Set(),
		l = (f) => {
			for (var i = 0; i < f.length; i++) {
				var u = f[i];
				if (!v.has(u)) {
					v.add(u);
					var c = _e(u);
					r.addEventListener(u, p, { passive: c });
					var _ = h.get(u);
					_ === void 0
						? (document.addEventListener(u, p, { passive: c }), h.set(u, 1))
						: h.set(u, _ + 1);
				}
			}
		};
	l(U(q)), k.add(l);
	var d = void 0,
		L = Z(() => {
			var f = a ?? r.appendChild(ee());
			return (
				re(() => {
					if (t) {
						te({});
						var i = ne;
						i.c = t;
					}
					s && (n.$$events = s),
						S && fe(f, null),
						(d = e(f, n) || {}),
						S && (A.nodes_end = b),
						t && ae();
				}),
				() => {
					var c;
					for (var i of v) {
						r.removeEventListener(i, p);
						var u = h.get(i);
						--u === 0 ? (document.removeEventListener(i, p), h.delete(i)) : h.set(i, u);
					}
					k.delete(l), O.delete(d), f !== a && ((c = f.parentNode) == null || c.removeChild(f));
				}
			);
		});
	return O.set(d, L), d;
}
let O = new WeakMap();
function Le(e) {
	const r = O.get(e);
	r && r();
}
function he(e, r, a) {
	if (e == null) return r(void 0), N;
	const n = se(() => e.subscribe(r, a));
	return n.unsubscribe ? () => n.unsubscribe() : n;
}
let w = !1;
function me(e, r, a) {
	const n = a[r] ?? (a[r] = { store: null, source: ie(void 0), unsubscribe: N });
	if (n.store !== e)
		if ((n.unsubscribe(), (n.store = e ?? null), e == null))
			(n.source.v = void 0), (n.unsubscribe = N);
		else {
			var s = !0;
			(n.unsubscribe = he(e, (t) => {
				s ? (n.source.v = t) : oe(n.source, t);
			})),
				(s = !1);
		}
	return ue(n.source);
}
function Re() {
	const e = {};
	return (
		V(() => {
			for (var r in e) e[r].unsubscribe();
		}),
		e
	);
}
function Se(e) {
	var r = w;
	try {
		return (w = !1), [e(), w];
	} finally {
		w = r;
	}
}
export {
	Ee as a,
	me as b,
	Se as c,
	ce as d,
	we as e,
	ye as f,
	Te as h,
	ge as l,
	ve as m,
	Re as s,
	Le as u
};
//# sourceMappingURL=store.Cu2WRErR.js.map
