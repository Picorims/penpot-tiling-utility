import { a as d, t as v } from '../chunks/disclose-version.BmYXDLn2.js';
import {
	u as h,
	g as p,
	i as $,
	j as x,
	r as u,
	k as _,
	l as k,
	m as y,
	o as j,
	q,
	p as w,
	f as E,
	t as S,
	e as z,
	s as l,
	v as g,
	w as A
} from '../chunks/runtime.C33mUz_z.js';
import { s as B, a as b, b as C } from '../chunks/store.Cu2WRErR.js';
import { s as D } from '../chunks/entry.Dy2RczJU.js';
function F(s = !1) {
	const e = $,
		t = e.l.u;
	if (!t) return;
	let n = () => y(e.s);
	if (s) {
		let a = 0,
			r = {};
		const f = j(() => {
			let i = !1;
			const c = e.s;
			for (const o in c) c[o] !== r[o] && ((r[o] = c[o]), (i = !0));
			return i && a++, a;
		});
		n = () => _(f);
	}
	t.b.length &&
		h(() => {
			m(e, n), u(t.b);
		}),
		p(() => {
			const a = x(() => t.m.map(k));
			return () => {
				for (const r of a) typeof r == 'function' && r();
			};
		}),
		t.a.length &&
			p(() => {
				m(e, n), u(t.a);
			});
}
function m(s, e) {
	if (s.l.s) for (const t of s.l.s) _(t);
	e();
}
q();
const G = () => {
		const s = D;
		return {
			page: { subscribe: s.page.subscribe },
			navigating: { subscribe: s.navigating.subscribe },
			updated: s.updated
		};
	},
	H = {
		subscribe(s) {
			return G().page.subscribe(s);
		}
	};
var I = v('<h1> </h1> <p> </p>', 1);
function N(s, e) {
	w(e, !1);
	const t = B(),
		n = () => C(H, '$page', t);
	F();
	var a = I(),
		r = E(a),
		f = l(r, !0);
	g(r);
	var i = A(r, 2),
		c = l(i, !0);
	g(i),
		S(() => {
			var o;
			b(f, n().status), b(c, (o = n().error) == null ? void 0 : o.message);
		}),
		d(s, a),
		z();
}
export { N as component };
//# sourceMappingURL=1.CrOjg6w7.js.map
