import{S as m,D as J,F as Q,G as E,H as W,I as h,J as N,U as o,k as P,z as q,K as X,L as p,M as ee,b as re,N as Y,a as j,O as U,h as C,C as ae,E as te,P as ne,Q as ie,B as fe,R as G,c as se,V as ue,W as le,j as D,X as _e,Y as ce,Z as de,_ as ve,$ as oe,a0 as ye,a1 as be,a2 as H,a3 as ge,a4 as k,a5 as he,a6 as Pe,a7 as Ee,o as K,a8 as Re,a9 as me,aa as we,i as F,g as Ie}from"./runtime.C33mUz_z.js";import{c as Se}from"./store.Cu2WRErR.js";function S(e,t=null,c){if(typeof e!="object"||e===null||m in e)return e;const b=p(e);if(b!==J&&b!==Q)return e;var f=new Map,u=ee(e),d=E(0);u&&f.set("length",E(e.length));var v;return new Proxy(e,{defineProperty(s,r,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&W();var n=f.get(r);return n===void 0?(n=E(a.value),f.set(r,n)):h(n,S(a.value,v)),!0},deleteProperty(s,r){var a=f.get(r);if(a===void 0)r in s&&f.set(r,E(o));else{if(u&&typeof r=="string"){var n=f.get("length"),i=Number(r);Number.isInteger(i)&&i<n.v&&h(n,i)}h(a,o),Z(d)}return!0},get(s,r,a){var y;if(r===m)return e;var n=f.get(r),i=r in s;if(n===void 0&&(!i||(y=N(s,r))!=null&&y.writable)&&(n=E(S(i?s[r]:o,v)),f.set(r,n)),n!==void 0){var l=P(n);return l===o?void 0:l}return Reflect.get(s,r,a)},getOwnPropertyDescriptor(s,r){var a=Reflect.getOwnPropertyDescriptor(s,r);if(a&&"value"in a){var n=f.get(r);n&&(a.value=P(n))}else if(a===void 0){var i=f.get(r),l=i==null?void 0:i.v;if(i!==void 0&&l!==o)return{enumerable:!0,configurable:!0,value:l,writable:!0}}return a},has(s,r){var l;if(r===m)return!0;var a=f.get(r),n=a!==void 0&&a.v!==o||Reflect.has(s,r);if(a!==void 0||q!==null&&(!n||(l=N(s,r))!=null&&l.writable)){a===void 0&&(a=E(n?S(s[r],v):o),f.set(r,a));var i=P(a);if(i===o)return!1}return n},set(s,r,a,n){var w;var i=f.get(r),l=r in s;if(u&&r==="length")for(var y=a;y<i.v;y+=1){var R=f.get(y+"");R!==void 0?h(R,o):y in s&&(R=E(o),f.set(y+"",R))}i===void 0?(!l||(w=N(s,r))!=null&&w.writable)&&(i=E(void 0),h(i,S(a,v)),f.set(r,i)):(l=i.v!==o,h(i,S(a,v)));var g=Reflect.getOwnPropertyDescriptor(s,r);if(g!=null&&g.set&&g.set.call(n,a),!l){if(u&&typeof r=="string"){var O=f.get("length"),T=Number(r);Number.isInteger(T)&&T>=O.v&&h(O,T+1)}Z(d)}return!0},ownKeys(s){P(d);var r=Reflect.ownKeys(s).filter(i=>{var l=f.get(i);return l===void 0||l.v!==o});for(var[a,n]of f)n.v!==o&&!(a in s)&&r.push(a);return r},setPrototypeOf(){X()}})}function Z(e,t=1){h(e,e.v+t)}function $(e){return e!==null&&typeof e=="object"&&m in e?e[m]:e}function De(e,t){return Object.is($(e),$(t))}function Oe(e){throw new Error("lifecycle_outside_component")}function xe(e,t,c,b=null,f=!1){C&&ae();var u=e,d=null,v=null,s=null,r=f?te:0;re(()=>{if(s===(s=!!t()))return;let a=!1;if(C){const n=u.data===ne;s===n&&(u=ie(),fe(u),G(!1),a=!0)}s?(d?Y(d):d=j(()=>c(u)),v&&U(v,()=>{v=null})):(v?Y(v):b&&(v=j(()=>b(u))),d&&U(d,()=>{d=null})),a&&G(!0)},r),C&&(u=se)}function z(e,t){return e===t||(e==null?void 0:e[m])===t}function Le(e={},t,c,b){return ue(()=>{var f,u;return le(()=>{f=u,u=[],D(()=>{e!==c(...u)&&(t(e,...u),f&&z(c(...f),e)&&t(null,...f))})}),()=>{_e(()=>{u&&z(c(...u),e)&&t(null,...u)})}}),e}function V(e){for(var t=q,c=q;t!==null&&!(t.f&(ye|be));)t=t.parent;try{return H(t),e()}finally{H(c)}}function Ce(e,t,c,b){var M;var f=(c&ge)!==0,u=!k||(c&he)!==0,d=(c&Pe)!==0,v=(c&me)!==0,s=!1,r;d?[r,s]=Se(()=>e[t]):r=e[t];var a=m in e||Ee in e,n=((M=N(e,t))==null?void 0:M.set)??(a&&d&&t in e?_=>e[t]=_:void 0),i=b,l=!0,y=!1,R=()=>(y=!0,l&&(l=!1,v?i=D(b):i=b),i);r===void 0&&b!==void 0&&(n&&u&&ce(),r=R(),n&&n(r));var g;if(u)g=()=>{var _=e[t];return _===void 0?R():(l=!0,y=!1,_)};else{var O=V(()=>(f?K:Re)(()=>e[t]));O.f|=de,g=()=>{var _=P(O);return _!==void 0&&(i=void 0),_===void 0?i:_}}if(!(c&ve))return g;if(n){var T=e.$$legacy;return function(_,I){return arguments.length>0?((!u||!I||T||s)&&n(I?g():_),_):g()}}var w=!1,B=!1,x=we(r),A=V(()=>K(()=>{var _=g(),I=P(x);return w?(w=!1,B=!0,I):(B=!1,x.v=_)}));return f||(A.equals=oe),function(_,I){if(arguments.length>0){const L=I?P(A):u&&d?S(_):_;return A.equals(L)||(w=!0,h(x,L),y&&i!==void 0&&(i=L),D(()=>P(A))),_}return P(A)}}function Fe(e){F===null&&Oe(),k&&F.l!==null?Te(F).m.push(e):Ie(()=>{const t=D(e);if(typeof t=="function")return t})}function Te(e){var t=e.l;return t.u??(t.u={a:[],b:[],m:[]})}export{S as a,Le as b,De as c,xe as i,Fe as o,Ce as p};
//# sourceMappingURL=index-client.DkFXpaO1.js.map
