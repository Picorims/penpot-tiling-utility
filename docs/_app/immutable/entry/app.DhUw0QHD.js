const __vite__mapDeps = (
	i,
	m = __vite__mapDeps,
	d = m.f ||
		(m.f = [
			'../nodes/0.B1oL47pf.js',
			'../chunks/disclose-version.BmYXDLn2.js',
			'../chunks/runtime.C33mUz_z.js',
			'../assets/0.DJJo6TNW.css',
			'../nodes/1.CrOjg6w7.js',
			'../chunks/store.Cu2WRErR.js',
			'../chunks/entry.Dy2RczJU.js',
			'../nodes/2.EXMsSH2w.js',
			'../chunks/index-client.DkFXpaO1.js',
			'../assets/2.rx19SAyp.css'
		])
) => i.map((i) => d[i]);
var F = (n) => {
	throw TypeError(n);
};
var U = (n, e, r) => e.has(n) || F('Cannot ' + r);
var l = (n, e, r) => (U(n, e, 'read from private field'), r ? r.call(n) : e.get(n)),
	S = (n, e, r) =>
		e.has(n)
			? F('Cannot add the same private member more than once')
			: e instanceof WeakSet
				? e.add(n)
				: e.set(n, r),
	A = (n, e, r, a) => (U(n, e, 'write to private field'), a ? a.call(n, r) : e.set(n, r), r);
import {
	h as G,
	C as J,
	b as K,
	E as Q,
	a as X,
	c as Z,
	O as M,
	k as v,
	a7 as p,
	I as k,
	ab as $,
	ac as ee,
	aa as te,
	p as re,
	u as se,
	g as ne,
	ad as ae,
	f as w,
	e as oe,
	ae as L,
	w as ce,
	s as ie,
	t as le,
	v as ue,
	o as O
} from '../chunks/runtime.C33mUz_z.js';
import { h as fe, m as de, u as me, a as he } from '../chunks/store.Cu2WRErR.js';
import { c as T, a as P, t as W, b as _e } from '../chunks/disclose-version.BmYXDLn2.js';
import { p as I, o as ve, a as ge, i as j, b as B } from '../chunks/index-client.DkFXpaO1.js';
function D(n, e, r) {
	G && J();
	var a = n,
		o,
		i;
	K(() => {
		o !== (o = e()) && (i && (M(i), (i = null)), o && (i = X(() => r(a, o))));
	}, Q),
		G && (a = Z);
}
function ye(n) {
	return class extends be {
		constructor(e) {
			super({ component: n, ...e });
		}
	};
}
var g, f;
class be {
	constructor(e) {
		S(this, g);
		S(this, f);
		var i;
		var r = new Map(),
			a = (s, t) => {
				var d = te(t);
				return r.set(s, d), d;
			};
		const o = new Proxy(
			{ ...(e.props || {}), $$events: {} },
			{
				get(s, t) {
					return v(r.get(t) ?? a(t, Reflect.get(s, t)));
				},
				has(s, t) {
					return t === p ? !0 : (v(r.get(t) ?? a(t, Reflect.get(s, t))), Reflect.has(s, t));
				},
				set(s, t, d) {
					return k(r.get(t) ?? a(t, d), d), Reflect.set(s, t, d);
				}
			}
		);
		A(
			this,
			f,
			(e.hydrate ? fe : de)(e.component, {
				target: e.target,
				anchor: e.anchor,
				props: o,
				context: e.context,
				intro: e.intro ?? !1,
				recover: e.recover
			})
		),
			(!((i = e == null ? void 0 : e.props) != null && i.$$host) || e.sync === !1) && $(),
			A(this, g, o.$$events);
		for (const s of Object.keys(l(this, f)))
			s === '$set' ||
				s === '$destroy' ||
				s === '$on' ||
				ee(this, s, {
					get() {
						return l(this, f)[s];
					},
					set(t) {
						l(this, f)[s] = t;
					},
					enumerable: !0
				});
		(l(this, f).$set = (s) => {
			Object.assign(o, s);
		}),
			(l(this, f).$destroy = () => {
				me(l(this, f));
			});
	}
	$set(e) {
		l(this, f).$set(e);
	}
	$on(e, r) {
		l(this, g)[e] = l(this, g)[e] || [];
		const a = (...o) => r.call(this, ...o);
		return (
			l(this, g)[e].push(a),
			() => {
				l(this, g)[e] = l(this, g)[e].filter((o) => o !== a);
			}
		);
	}
	$destroy() {
		l(this, f).$destroy();
	}
}
(g = new WeakMap()), (f = new WeakMap());
const Ee = 'modulepreload',
	Pe = function (n, e) {
		return new URL(n, e).href;
	},
	N = {},
	V = function (e, r, a) {
		let o = Promise.resolve();
		if (r && r.length > 0) {
			const s = document.getElementsByTagName('link'),
				t = document.querySelector('meta[property=csp-nonce]'),
				d = (t == null ? void 0 : t.nonce) || (t == null ? void 0 : t.getAttribute('nonce'));
			o = Promise.allSettled(
				r.map((u) => {
					if (((u = Pe(u, a)), u in N)) return;
					N[u] = !0;
					const y = u.endsWith('.css'),
						x = y ? '[rel="stylesheet"]' : '';
					if (!!a)
						for (let m = s.length - 1; m >= 0; m--) {
							const _ = s[m];
							if (_.href === u && (!y || _.rel === 'stylesheet')) return;
						}
					else if (document.querySelector(`link[href="${u}"]${x}`)) return;
					const c = document.createElement('link');
					if (
						((c.rel = y ? 'stylesheet' : Ee),
						y || (c.as = 'script'),
						(c.crossOrigin = ''),
						(c.href = u),
						d && c.setAttribute('nonce', d),
						document.head.appendChild(c),
						y)
					)
						return new Promise((m, _) => {
							c.addEventListener('load', m),
								c.addEventListener('error', () => _(new Error(`Unable to preload CSS for ${u}`)));
						});
				})
			);
		}
		function i(s) {
			const t = new Event('vite:preloadError', { cancelable: !0 });
			if (((t.payload = s), window.dispatchEvent(t), !t.defaultPrevented)) throw s;
		}
		return o.then((s) => {
			for (const t of s || []) t.status === 'rejected' && i(t.reason);
			return e().catch(i);
		});
	},
	Te = {};
var Re = W(
		'<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'
	),
	we = W('<!> <!>', 1);
function ke(n, e) {
	re(e, !0);
	let r = I(e, 'components', 23, () => []),
		a = I(e, 'data_0', 3, null),
		o = I(e, 'data_1', 3, null);
	se(() => e.stores.page.set(e.page)),
		ne(() => {
			e.stores, e.page, e.constructors, r(), e.form, a(), o(), e.stores.page.notify();
		});
	let i = L(!1),
		s = L(!1),
		t = L(null);
	ve(() => {
		const b = e.stores.page.subscribe(() => {
			v(i) &&
				(k(s, !0),
				ae().then(() => {
					k(t, ge(document.title || 'untitled page'));
				}));
		});
		return k(i, !0), b;
	});
	const d = O(() => e.constructors[1]);
	var u = we(),
		y = w(u);
	j(
		y,
		() => e.constructors[1],
		(b) => {
			var c = T();
			const m = O(() => e.constructors[0]);
			var _ = w(c);
			D(
				_,
				() => v(m),
				(E, C) => {
					B(
						C(E, {
							get data() {
								return a();
							},
							get form() {
								return e.form;
							},
							children: (h, xe) => {
								var q = T(),
									Y = w(q);
								D(
									Y,
									() => v(d),
									(z, H) => {
										B(
											H(z, {
												get data() {
													return o();
												},
												get form() {
													return e.form;
												}
											}),
											(R) => (r()[1] = R),
											() => {
												var R;
												return (R = r()) == null ? void 0 : R[1];
											}
										);
									}
								),
									P(h, q);
							},
							$$slots: { default: !0 }
						}),
						(h) => (r()[0] = h),
						() => {
							var h;
							return (h = r()) == null ? void 0 : h[0];
						}
					);
				}
			),
				P(b, c);
		},
		(b) => {
			var c = T();
			const m = O(() => e.constructors[0]);
			var _ = w(c);
			D(
				_,
				() => v(m),
				(E, C) => {
					B(
						C(E, {
							get data() {
								return a();
							},
							get form() {
								return e.form;
							}
						}),
						(h) => (r()[0] = h),
						() => {
							var h;
							return (h = r()) == null ? void 0 : h[0];
						}
					);
				}
			),
				P(b, c);
		}
	);
	var x = ce(y, 2);
	j(
		x,
		() => v(i),
		(b) => {
			var c = Re(),
				m = ie(c);
			j(
				m,
				() => v(s),
				(_) => {
					var E = _e();
					le(() => he(E, v(t))), P(_, E);
				}
			),
				ue(c),
				P(b, c);
		}
	),
		P(n, u),
		oe();
}
const Ie = ye(ke),
	je = [
		() => V(() => import('../nodes/0.B1oL47pf.js'), __vite__mapDeps([0, 1, 2, 3]), import.meta.url),
		() =>
			V(() => import('../nodes/1.CrOjg6w7.js'), __vite__mapDeps([4, 1, 2, 5, 6]), import.meta.url),
		() =>
			V(
				() => import('../nodes/2.EXMsSH2w.js'),
				__vite__mapDeps([7, 1, 2, 5, 8, 9]),
				import.meta.url
			)
	],
	Be = [],
	De = { '/': [2] },
	Ve = {
		handleError: ({ error: n }) => {
			console.error(n);
		},
		reroute: () => {}
	};
export {
	De as dictionary,
	Ve as hooks,
	Te as matchers,
	je as nodes,
	Ie as root,
	Be as server_loads
};
//# sourceMappingURL=app.DhUw0QHD.js.map
