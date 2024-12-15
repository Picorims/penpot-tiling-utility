var Ot = Array.isArray,
	Ct = Array.from,
	Nt = Object.defineProperty,
	vn = Object.getOwnPropertyDescriptor,
	Wn = Object.getOwnPropertyDescriptors,
	bt = Object.prototype,
	qt = Array.prototype,
	Xn = Object.getPrototypeOf;
const Pt = () => {};
function Ft(n) {
	return n();
}
function yn(n) {
	for (var t = 0; t < n.length; t++) n[t]();
}
const y = 2,
	wn = 4,
	Y = 8,
	ln = 16,
	m = 32,
	z = 64,
	Q = 128,
	S = 256,
	V = 512,
	h = 1024,
	k = 2048,
	j = 4096,
	N = 8192,
	b = 16384,
	Jn = 32768,
	Tn = 65536,
	Lt = 1 << 17,
	Qn = 1 << 19,
	mn = 1 << 20,
	pn = Symbol('$state'),
	Mt = Symbol('legacy props'),
	Yt = Symbol('');
function An(n) {
	return n === this.v;
}
function nt(n, t) {
	return n != n
		? t == t
		: n !== t || (n !== null && typeof n == 'object') || typeof n == 'function';
}
function gn(n) {
	return !nt(n, this.v);
}
function tt(n) {
	throw new Error('effect_in_teardown');
}
function rt() {
	throw new Error('effect_in_unowned_derived');
}
function et(n) {
	throw new Error('effect_orphan');
}
function st() {
	throw new Error('effect_update_depth_exceeded');
}
function jt() {
	throw new Error('hydration_failed');
}
function Ht(n) {
	throw new Error('props_invalid_value');
}
function Bt() {
	throw new Error('state_descriptors_fixed');
}
function Ut() {
	throw new Error('state_prototype_fixed');
}
function lt() {
	throw new Error('state_unsafe_local_read');
}
function at() {
	throw new Error('state_unsafe_mutation');
}
let W = !1;
function Vt() {
	W = !0;
}
function an(n) {
	return { f: 0, v: n, reactions: null, equals: An, version: 0 };
}
function Gt(n) {
	return ut(an(n));
}
function Kt(n, t = !1) {
	var e;
	const r = an(n);
	return (
		t || (r.equals = gn), W && f !== null && f.l !== null && ((e = f.l).s ?? (e.s = [])).push(r), r
	);
}
function ut(n) {
	return o !== null && o.f & y && (T === null ? At([n]) : T.push(n)), n;
}
function $t(n, t) {
	return o !== null && fn() && o.f & (y | ln) && (T === null || !T.includes(n)) && at(), ot(n, t);
}
function ot(n, t) {
	return (
		n.equals(t) ||
			((n.v = t),
			(n.version = Vn()),
			kn(n, k),
			fn() &&
				u !== null &&
				u.f & h &&
				!(u.f & m) &&
				(v !== null && v.includes(n) ? (A(u, k), J(u)) : g === null ? gt([n]) : g.push(n))),
		t
	);
}
function kn(n, t) {
	var r = n.reactions;
	if (r !== null)
		for (var e = fn(), s = r.length, l = 0; l < s; l++) {
			var a = r[l],
				i = a.f;
			i & k || (!e && a === u) || (A(a, t), i & (h | S) && (i & y ? kn(a, j) : J(a)));
		}
}
const Zt = 1,
	zt = 2,
	Wt = 16,
	Xt = 1,
	Jt = 2,
	Qt = 4,
	nr = 8,
	tr = 16,
	rr = 1,
	er = 2,
	it = '[',
	ft = '[!',
	_t = ']',
	Rn = {},
	sr = Symbol();
function xn(n) {
	console.warn('hydration_mismatch');
}
let x = !1;
function lr(n) {
	x = n;
}
let w;
function F(n) {
	if (n === null) throw (xn(), Rn);
	return (w = n);
}
function ar() {
	return F(D(w));
}
function ur(n) {
	if (x) {
		if (D(w) !== null) throw (xn(), Rn);
		w = n;
	}
}
function or(n = 1) {
	if (x) {
		for (var t = n, r = w; t--; ) r = D(r);
		w = r;
	}
}
function ir() {
	for (var n = 0, t = w; ; ) {
		if (t.nodeType === 8) {
			var r = t.data;
			if (r === _t) {
				if (n === 0) return t;
				n -= 1;
			} else (r === it || r === ft) && (n += 1);
		}
		var e = D(t);
		t.remove(), (t = e);
	}
}
var hn, Sn, Dn;
function fr() {
	if (hn === void 0) {
		hn = window;
		var n = Element.prototype,
			t = Node.prototype;
		(Sn = vn(t, 'firstChild').get),
			(Dn = vn(t, 'nextSibling').get),
			(n.__click = void 0),
			(n.__className = ''),
			(n.__attributes = null),
			(n.__styles = null),
			(n.__e = void 0),
			(Text.prototype.__t = void 0);
	}
}
function nn(n = '') {
	return document.createTextNode(n);
}
function tn(n) {
	return Sn.call(n);
}
function D(n) {
	return Dn.call(n);
}
function _r(n, t) {
	if (!x) return tn(n);
	var r = tn(w);
	if (r === null) r = w.appendChild(nn());
	else if (t && r.nodeType !== 3) {
		var e = nn();
		return r == null || r.before(e), F(e), e;
	}
	return F(r), r;
}
function cr(n, t) {
	if (!x) {
		var r = tn(n);
		return r instanceof Comment && r.data === '' ? D(r) : r;
	}
	return w;
}
function vr(n, t = 1, r = !1) {
	let e = x ? w : n;
	for (var s; t--; ) (s = e), (e = D(e));
	if (!x) return e;
	var l = e == null ? void 0 : e.nodeType;
	if (r && l !== 3) {
		var a = nn();
		return e === null ? s == null || s.after(a) : e.before(a), F(a), a;
	}
	return F(e), e;
}
function pr(n) {
	n.textContent = '';
}
function ct(n) {
	var t = y | k;
	u === null ? (t |= S) : (u.f |= mn);
	var r = o !== null && o.f & y ? o : null;
	const e = {
		children: null,
		ctx: f,
		deps: null,
		equals: An,
		f: t,
		fn: n,
		reactions: null,
		v: null,
		version: 0,
		parent: r ?? u
	};
	return r !== null && (r.children ?? (r.children = [])).push(e), e;
}
function hr(n) {
	const t = ct(n);
	return (t.equals = gn), t;
}
function In(n) {
	var t = n.children;
	if (t !== null) {
		n.children = null;
		for (var r = 0; r < t.length; r += 1) {
			var e = t[r];
			e.f & y ? un(e) : P(e);
		}
	}
}
function vt(n) {
	for (var t = n.parent; t !== null; ) {
		if (!(t.f & y)) return t;
		t = t.parent;
	}
	return null;
}
function On(n) {
	var t,
		r = u;
	Z(vt(n));
	try {
		In(n), (t = Gn(n));
	} finally {
		Z(r);
	}
	return t;
}
function Cn(n) {
	var t = On(n),
		r = (I || n.f & S) && n.deps !== null ? j : h;
	A(n, r), n.equals(t) || ((n.v = t), (n.version = Vn()));
}
function un(n) {
	In(n), M(n, 0), A(n, b), (n.v = n.children = n.deps = n.ctx = n.reactions = null);
}
function Nn(n) {
	u === null && o === null && et(), o !== null && o.f & S && rt(), on && tt();
}
function pt(n, t) {
	var r = t.last;
	r === null ? (t.last = t.first = n) : ((r.next = n), (n.prev = r), (t.last = n));
}
function q(n, t, r, e = !0) {
	var s = (n & z) !== 0,
		l = u,
		a = {
			ctx: f,
			deps: null,
			deriveds: null,
			nodes_start: null,
			nodes_end: null,
			f: n | k,
			first: null,
			fn: t,
			last: null,
			next: null,
			parent: s ? null : l,
			prev: null,
			teardown: null,
			transitions: null,
			version: 0
		};
	if (r) {
		var i = O;
		try {
			dn(!0), X(a), (a.f |= Jn);
		} catch (_) {
			throw (P(a), _);
		} finally {
			dn(i);
		}
	} else t !== null && J(a);
	var p =
		r &&
		a.deps === null &&
		a.first === null &&
		a.nodes_start === null &&
		a.teardown === null &&
		(a.f & mn) === 0;
	if (!p && !s && e && (l !== null && pt(a, l), o !== null && o.f & y)) {
		var d = o;
		(d.children ?? (d.children = [])).push(a);
	}
	return a;
}
function dr(n) {
	const t = q(Y, null, !1);
	return A(t, h), (t.teardown = n), t;
}
function Er(n) {
	Nn();
	var t = u !== null && (u.f & m) !== 0 && f !== null && !f.m;
	if (t) {
		var r = f;
		(r.e ?? (r.e = [])).push({ fn: n, effect: u, reaction: o });
	} else {
		var e = bn(n);
		return e;
	}
}
function yr(n) {
	return Nn(), ht(n);
}
function wr(n) {
	const t = q(z, n, !0);
	return () => {
		P(t);
	};
}
function bn(n) {
	return q(wn, n, !1);
}
function ht(n) {
	return q(Y, n, !0);
}
function Tr(n) {
	return dt(n);
}
function dt(n, t = 0) {
	return q(Y | ln | t, n, !0);
}
function mr(n, t = !0) {
	return q(Y | m, n, !0, t);
}
function qn(n) {
	var t = n.teardown;
	if (t !== null) {
		const r = on,
			e = o;
		En(!0), $(null);
		try {
			t.call(null);
		} finally {
			En(r), $(e);
		}
	}
}
function Pn(n) {
	var t = n.deriveds;
	if (t !== null) {
		n.deriveds = null;
		for (var r = 0; r < t.length; r += 1) un(t[r]);
	}
}
function Fn(n, t = !1) {
	var r = n.first;
	for (n.first = n.last = null; r !== null; ) {
		var e = r.next;
		P(r, t), (r = e);
	}
}
function Et(n) {
	for (var t = n.first; t !== null; ) {
		var r = t.next;
		t.f & m || P(t), (t = r);
	}
}
function P(n, t = !0) {
	var r = !1;
	if ((t || n.f & Qn) && n.nodes_start !== null) {
		for (var e = n.nodes_start, s = n.nodes_end; e !== null; ) {
			var l = e === s ? null : D(e);
			e.remove(), (e = l);
		}
		r = !0;
	}
	Fn(n, t && !r), Pn(n), M(n, 0), A(n, b);
	var a = n.transitions;
	if (a !== null) for (const p of a) p.stop();
	qn(n);
	var i = n.parent;
	i !== null && i.first !== null && Ln(n),
		(n.next = n.prev = n.teardown = n.ctx = n.deps = n.fn = n.nodes_start = n.nodes_end = null);
}
function Ln(n) {
	var t = n.parent,
		r = n.prev,
		e = n.next;
	r !== null && (r.next = e),
		e !== null && (e.prev = r),
		t !== null && (t.first === n && (t.first = e), t.last === n && (t.last = r));
}
function Ar(n, t) {
	var r = [];
	Mn(n, r, !0),
		yt(r, () => {
			P(n), t && t();
		});
}
function yt(n, t) {
	var r = n.length;
	if (r > 0) {
		var e = () => --r || t();
		for (var s of n) s.out(e);
	} else t();
}
function Mn(n, t, r) {
	if (!(n.f & N)) {
		if (((n.f ^= N), n.transitions !== null))
			for (const a of n.transitions) (a.is_global || r) && t.push(a);
		for (var e = n.first; e !== null; ) {
			var s = e.next,
				l = (e.f & Tn) !== 0 || (e.f & m) !== 0;
			Mn(e, t, l ? r : !1), (e = s);
		}
	}
}
function gr(n) {
	Yn(n, !0);
}
function Yn(n, t) {
	if (n.f & N) {
		H(n) && X(n), (n.f ^= N);
		for (var r = n.first; r !== null; ) {
			var e = r.next,
				s = (r.f & Tn) !== 0 || (r.f & m) !== 0;
			Yn(r, s ? t : !1), (r = e);
		}
		if (n.transitions !== null) for (const l of n.transitions) (l.is_global || t) && l.in();
	}
}
const wt = typeof requestIdleCallback > 'u' ? (n) => setTimeout(n, 1) : requestIdleCallback;
let G = !1,
	K = !1,
	rn = [],
	en = [];
function jn() {
	G = !1;
	const n = rn.slice();
	(rn = []), yn(n);
}
function Hn() {
	K = !1;
	const n = en.slice();
	(en = []), yn(n);
}
function kr(n) {
	G || ((G = !0), queueMicrotask(jn)), rn.push(n);
}
function Rr(n) {
	K || ((K = !0), wt(Hn)), en.push(n);
}
function Tt() {
	G && jn(), K && Hn();
}
const Bn = 0,
	mt = 1;
let B = !1,
	U = Bn,
	L = !1,
	O = !1,
	on = !1;
function dn(n) {
	O = n;
}
function En(n) {
	on = n;
}
let R = [],
	C = 0;
let o = null;
function $(n) {
	o = n;
}
let u = null;
function Z(n) {
	u = n;
}
let T = null;
function At(n) {
	T = n;
}
let v = null,
	E = 0,
	g = null;
function gt(n) {
	g = n;
}
let Un = 0,
	I = !1,
	f = null;
function Vn() {
	return ++Un;
}
function fn() {
	return !W || (f !== null && f.l === null);
}
function H(n) {
	var a, i;
	var t = n.f;
	if (t & k) return !0;
	if (t & j) {
		var r = n.deps,
			e = (t & S) !== 0;
		if (r !== null) {
			var s;
			if (t & V) {
				for (s = 0; s < r.length; s++) ((a = r[s]).reactions ?? (a.reactions = [])).push(n);
				n.f ^= V;
			}
			for (s = 0; s < r.length; s++) {
				var l = r[s];
				if (
					(H(l) && Cn(l),
					e &&
						u !== null &&
						!I &&
						!((i = l == null ? void 0 : l.reactions) != null && i.includes(n)) &&
						(l.reactions ?? (l.reactions = [])).push(n),
					l.version > n.version)
				)
					return !0;
			}
		}
		e || A(n, h);
	}
	return !1;
}
function kt(n, t) {
	for (var r = t; r !== null; ) {
		if (r.f & Q)
			try {
				r.fn(n);
				return;
			} catch {
				r.f ^= Q;
			}
		r = r.parent;
	}
	throw ((B = !1), n);
}
function Rt(n) {
	return (n.f & b) === 0 && (n.parent === null || (n.parent.f & Q) === 0);
}
function _n(n, t, r, e) {
	if (B) {
		if ((r === null && (B = !1), Rt(t))) throw n;
		return;
	}
	r !== null && (B = !0);
	{
		kt(n, t);
		return;
	}
}
function Gn(n) {
	var cn;
	var t = v,
		r = E,
		e = g,
		s = o,
		l = I,
		a = T,
		i = f,
		p = n.f;
	(v = null),
		(E = 0),
		(g = null),
		(o = p & (m | z) ? null : n),
		(I = !O && (p & S) !== 0),
		(T = null),
		(f = n.ctx);
	try {
		var d = (0, n.fn)(),
			_ = n.deps;
		if (v !== null) {
			var c;
			if ((M(n, E), _ !== null && E > 0))
				for (_.length = E + v.length, c = 0; c < v.length; c++) _[E + c] = v[c];
			else n.deps = _ = v;
			if (!I) for (c = E; c < _.length; c++) ((cn = _[c]).reactions ?? (cn.reactions = [])).push(n);
		} else _ !== null && E < _.length && (M(n, E), (_.length = E));
		return d;
	} finally {
		(v = t), (E = r), (g = e), (o = s), (I = l), (T = a), (f = i);
	}
}
function xt(n, t) {
	let r = t.reactions;
	if (r !== null) {
		var e = r.indexOf(n);
		if (e !== -1) {
			var s = r.length - 1;
			s === 0 ? (r = t.reactions = null) : ((r[e] = r[s]), r.pop());
		}
	}
	r === null &&
		t.f & y &&
		(v === null || !v.includes(t)) &&
		(A(t, j), t.f & (S | V) || (t.f ^= V), M(t, 0));
}
function M(n, t) {
	var r = n.deps;
	if (r !== null) for (var e = t; e < r.length; e++) xt(n, r[e]);
}
function X(n) {
	var t = n.f;
	if (!(t & b)) {
		A(n, h);
		var r = u,
			e = f;
		u = n;
		try {
			t & ln ? Et(n) : Fn(n), Pn(n), qn(n);
			var s = Gn(n);
			(n.teardown = typeof s == 'function' ? s : null), (n.version = Un);
		} catch (l) {
			_n(l, n, r, e || n.ctx);
		} finally {
			u = r;
		}
	}
}
function Kn() {
	C > 1e3 && ((C = 0), st()), C++;
}
function $n(n) {
	var t = n.length;
	if (t !== 0) {
		Kn();
		var r = O;
		O = !0;
		try {
			for (var e = 0; e < t; e++) {
				var s = n[e];
				s.f & h || (s.f ^= h);
				var l = [];
				Zn(s, l), St(l);
			}
		} finally {
			O = r;
		}
	}
}
function St(n) {
	var t = n.length;
	if (t !== 0)
		for (var r = 0; r < t; r++) {
			var e = n[r];
			if (!(e.f & (b | N)))
				try {
					H(e) &&
						(X(e),
						e.deps === null &&
							e.first === null &&
							e.nodes_start === null &&
							(e.teardown === null ? Ln(e) : (e.fn = null)));
				} catch (s) {
					_n(s, e, null, e.ctx);
				}
		}
}
function Dt() {
	if (((L = !1), C > 1001)) return;
	const n = R;
	(R = []), $n(n), L || (C = 0);
}
function J(n) {
	U === Bn && (L || ((L = !0), queueMicrotask(Dt)));
	for (var t = n; t.parent !== null; ) {
		t = t.parent;
		var r = t.f;
		if (r & (z | m)) {
			if (!(r & h)) return;
			t.f ^= h;
		}
	}
	R.push(t);
}
function Zn(n, t) {
	var r = n.first,
		e = [];
	n: for (; r !== null; ) {
		var s = r.f,
			l = (s & m) !== 0,
			a = l && (s & h) !== 0,
			i = r.next;
		if (!a && !(s & N))
			if (s & Y) {
				if (l) r.f ^= h;
				else
					try {
						H(r) && X(r);
					} catch (c) {
						_n(c, r, null, r.ctx);
					}
				var p = r.first;
				if (p !== null) {
					r = p;
					continue;
				}
			} else s & wn && e.push(r);
		if (i === null) {
			let c = r.parent;
			for (; c !== null; ) {
				if (n === c) break n;
				var d = c.next;
				if (d !== null) {
					r = d;
					continue n;
				}
				c = c.parent;
			}
		}
		r = i;
	}
	for (var _ = 0; _ < e.length; _++) (p = e[_]), t.push(p), Zn(p, t);
}
function zn(n) {
	var t = U,
		r = R;
	try {
		Kn();
		const s = [];
		(U = mt), (R = s), (L = !1), $n(r);
		var e = n == null ? void 0 : n();
		return Tt(), (R.length > 0 || s.length > 0) && zn(), (C = 0), e;
	} finally {
		(U = t), (R = r);
	}
}
async function xr() {
	await Promise.resolve(), zn();
}
function Sr(n) {
	var _;
	var t = n.f,
		r = (t & y) !== 0;
	if (r && t & b) {
		var e = On(n);
		return un(n), e;
	}
	if (o !== null) {
		T !== null && T.includes(n) && lt();
		var s = o.deps;
		v === null && s !== null && s[E] === n ? E++ : v === null ? (v = [n]) : v.push(n),
			g !== null && u !== null && u.f & h && !(u.f & m) && g.includes(n) && (A(u, k), J(u));
	} else if (r && n.deps === null)
		for (var l = n, a = l.parent, i = l; a !== null; )
			if (a.f & y) {
				var p = a;
				(i = p), (a = p.parent);
			} else {
				var d = a;
				((_ = d.deriveds) != null && _.includes(i)) || (d.deriveds ?? (d.deriveds = [])).push(i);
				break;
			}
	return r && ((l = n), H(l) && Cn(l)), n.v;
}
function Dr(n) {
	const t = o;
	try {
		return (o = null), n();
	} finally {
		o = t;
	}
}
const It = ~(k | j | h);
function A(n, t) {
	n.f = (n.f & It) | t;
}
function Ir(n, t = !1, r) {
	(f = { p: f, c: null, e: null, m: !1, s: n, x: null, l: null }),
		W && !t && (f.l = { s: null, u: null, r1: [], r2: an(!1) });
}
function Or(n) {
	const t = f;
	if (t !== null) {
		const a = t.e;
		if (a !== null) {
			var r = u,
				e = o;
			t.e = null;
			try {
				for (var s = 0; s < a.length; s++) {
					var l = a[s];
					Z(l.effect), $(l.reaction), bn(l.fn);
				}
			} finally {
				Z(r), $(e);
			}
		}
		(f = t.p), (t.m = !0);
	}
	return {};
}
function Cr(n) {
	if (!(typeof n != 'object' || !n || n instanceof EventTarget)) {
		if (pn in n) sn(n);
		else if (!Array.isArray(n))
			for (let t in n) {
				const r = n[t];
				typeof r == 'object' && r && pn in r && sn(r);
			}
	}
}
function sn(n, t = new Set()) {
	if (typeof n == 'object' && n !== null && !(n instanceof EventTarget) && !t.has(n)) {
		t.add(n), n instanceof Date && n.getTime();
		for (let e in n)
			try {
				sn(n[e], t);
			} catch {}
		const r = Xn(n);
		if (
			r !== Object.prototype &&
			r !== Array.prototype &&
			r !== Map.prototype &&
			r !== Set.prototype &&
			r !== Date.prototype
		) {
			const e = Wn(r);
			for (let s in e) {
				const l = e[s].get;
				if (l)
					try {
						l.call(n);
					} catch {}
			}
		}
	}
}
export {
	gn as $,
	er as A,
	F as B,
	ar as C,
	bt as D,
	Tn as E,
	qt as F,
	an as G,
	Bt as H,
	$t as I,
	vn as J,
	Ut as K,
	Xn as L,
	Ot as M,
	gr as N,
	Ar as O,
	ft as P,
	ir as Q,
	lr as R,
	pn as S,
	rr as T,
	sr as U,
	bn as V,
	ht as W,
	kr as X,
	Ht as Y,
	Lt as Z,
	Qt as _,
	mr as a,
	m as a0,
	z as a1,
	Z as a2,
	Xt as a3,
	W as a4,
	Jt as a5,
	nr as a6,
	Mt as a7,
	hr as a8,
	tr as a9,
	Yt as aA,
	Wn as aB,
	fn as aC,
	or as aD,
	nt as aE,
	Kt as aa,
	zn as ab,
	Nt as ac,
	xr as ad,
	Gt as ae,
	$ as af,
	o as ag,
	dr as ah,
	fr as ai,
	it as aj,
	D as ak,
	Rn as al,
	_t as am,
	xn as an,
	jt as ao,
	pr as ap,
	Ct as aq,
	wr as ar,
	N as as,
	ot as at,
	Mn as au,
	yt as av,
	zt as aw,
	Zt as ax,
	Wt as ay,
	Rr as az,
	dt as b,
	w as c,
	P as d,
	Or as e,
	cr as f,
	Er as g,
	x as h,
	f as i,
	Dr as j,
	Sr as k,
	Ft as l,
	Cr as m,
	Pt as n,
	ct as o,
	Ir as p,
	Vt as q,
	yn as r,
	_r as s,
	Tr as t,
	yr as u,
	ur as v,
	vr as w,
	nn as x,
	tn as y,
	u as z
};
//# sourceMappingURL=runtime.C33mUz_z.js.map
