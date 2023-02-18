const M = /* @__PURE__ */ new Set(), p = /* @__PURE__ */ new Set(), O = /* @__PURE__ */ new Set();
function B() {
  if (console.log(globalThis.requestAnimationFrame), !globalThis.requestAnimationFrame)
    return;
  const n = Q(), e = 1e3 / 60;
  let r = 0, a = 0, f;
  const g = (s) => {
    if (f === void 0)
      f = s;
    else {
      const u = Math.round((s - f) / e);
      a = (u - r) * e, r = u;
    }
    console.log(a), n.update(a), globalThis.requestAnimationFrame(g);
  };
  return globalThis.requestAnimationFrame(g), n;
}
function Q() {
  return {
    update(n) {
      O.size > 0 && (O.forEach((e) => M.delete(e)), O.clear()), p.size > 0 && (p.forEach((e) => M.add(e)), p.clear()), M.forEach((e) => e(n));
    }
  };
}
function S(n) {
  return {
    start() {
      M.has(n) || p.has(n) || p.add(n);
    },
    dispose() {
      O.delete(n);
    }
  };
}
const b = Math.PI, k = Math.PI / 2, w = 1.70158;
function y(n) {
  return n;
}
function C(n) {
  return n * n;
}
function T(n) {
  return 2 * n - n * n;
}
function A(n) {
  return n < 0.5 ? 2 * n * n : 2 * (2 * n - n * n) - 1;
}
function v(n) {
  return n * n * n;
}
function x(n) {
  return 3 * n - 3 * n * n + n * n * n;
}
function _(n) {
  return n < 0.5 ? 4 * n * n * n : 4 * (3 * n - 3 * n * n + n * n * n) - 3;
}
function z(n) {
  return n * n * n * n;
}
function R(n) {
  const e = n * n;
  return 4 * n - 6 * e + 4 * e * n - e * e;
}
function D(n) {
  if (n < 0.5)
    return 8 * n * n * n * n;
  {
    const e = n * n;
    return 8 * (4 * n - 6 * e + 4 * e * n - e * e) - 7;
  }
}
function $(n) {
  return n === 1 ? 1 : 1 - Math.cos(k * n);
}
function j(n) {
  return Math.sin(k * n);
}
function K(n) {
  return n < 0.5 ? (1 - Math.cos(b * n)) / 2 : (1 + Math.sin(b * (n - 0.5))) / 2;
}
function L(n) {
  return 1 - Math.sqrt(1 - Math.pow(n, 2));
}
function V(n) {
  return Math.sqrt(1 - Math.pow(1 - n, 2));
}
function W(n) {
  return n < 0.5 ? (1 - Math.sqrt(1 - 4 * n * n)) / 2 : (1 + Math.sqrt(-3 + 8 * n - 4 * n * n)) / 2;
}
function G(n) {
  return n * n * n * n * n;
}
function H(n) {
  return --n * n * n * n * n + 1;
}
function J(n) {
  return n *= 2, n < 1 ? 0.5 * n * n * n * n * n : 0.5 * ((n -= 2) * n * n * n * n + 2);
}
function N(n) {
  return n === 1 ? 1 : n === 0 ? 0 : Math.pow(1024, n - 1);
}
function U(n) {
  return n === 1 ? 1 : 1 - Math.pow(2, -10 * n);
}
function X(n) {
  return n === 0 ? 0 : n === 1 ? 1 : (n *= 2, n < 1 ? 0.5 * Math.pow(1024, n - 1) : 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2));
}
function Y(n) {
  return n === 0 ? 0 : -Math.pow(2, 10 * (n - 1)) * Math.sin((n - 1.1) * 5 * Math.PI);
}
function Z(n) {
  return n === 1 ? 1 : Math.pow(2, -10 * n) * Math.sin((n - 0.1) * 5 * Math.PI) + 1;
}
function nn(n) {
  return n === 0 ? 0 : n === 1 ? 1 : (n *= 2, n < 1 ? -0.5 * Math.pow(2, 10 * (n - 1)) * Math.sin((n - 1.1) * 5 * Math.PI) : 0.5 * Math.pow(2, -10 * (n - 1)) * Math.sin((n - 1.1) * 5 * Math.PI) + 1);
}
function en(n) {
  const e = w;
  return n === 0 ? 0 : n === 1 ? 1 : n * n * ((e + 1) * n - e);
}
function rn(n) {
  const e = w;
  return n === 0 ? 0 : --n * n * ((e + 1) * n + e) + 1;
}
function tn(n) {
  const e = w * 1.525;
  return n *= 2, n === 0 ? 0 : n < 1 ? 0.5 * (n * n * ((e + 1) * n - e)) : 0.5 * ((n -= 2) * n * ((e + 1) * n + e) + 2);
}
function q(n) {
  return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
}
function F(n) {
  return 1 - q(1 - n);
}
function un(n) {
  return n < 0.5 ? F(n * 2) * 0.5 : q(n * 2 - 1) * 0.5 + 0.5;
}
const P = {
  easing: null,
  unit: null
};
function an(n) {
  const e = [];
  let r;
  const a = /* @__PURE__ */ new Set(), { start: f, dispose: g } = S((u) => {
    let h = 50;
    for (; u > 0 && h > 0; ) {
      if (h--, !r) {
        if (e.length === 0) {
          g();
          break;
        }
        if (r = e.shift(), !r)
          break;
        for (const t of r.props)
          t.diff = t.target - (r.settings?.unit ? parseInt(t.parent[t.property], 10) || 0 : t.parent[t.property]);
      }
      if (r.elapsed <= r.duration) {
        const t = Math.min(u, r.duration - r.elapsed), c = r.elapsed + t, l = r.settings?.easing ?? y;
        for (const i of r.props)
          if (r.settings?.unit) {
            const o = parseInt(i.parent[i.property], 10) || 0, d = i.diff * l(c / r.duration);
            i.parent[i.property] = `${o + d - i.changed}${r.settings.unit}`, i.changed = d;
          } else {
            const o = i.diff * l(c / r.duration);
            i.parent[i.property] += o - i.changed, i.changed = o;
          }
        r.elapsed = c, u -= t;
      }
      r.elapsed >= r.duration && (r.handler && a.add(r.handler), r = void 0);
    }
    a.size > 0 && (a.forEach((t) => t()), a.clear());
  }), s = {
    on(u) {
      return e.push({ props: [], duration: 0, elapsed: 0, handler: u, settings: null }), s;
    },
    delay(u) {
      return e.push({ props: [], duration: u, elapsed: 0, settings: null }), s;
    },
    to(u, h = 500, t) {
      const c = t ? Object.assign({}, P, t) : null, l = [];
      for (const i in u) {
        const o = i.split("."), d = u[i];
        let I = n, m = o.pop();
        if (m) {
          for (const E of o)
            E in I && (I = I[E]);
          l.push({
            parent: I,
            property: m,
            diff: 0,
            changed: 0,
            target: d
          });
        }
      }
      return e.push({ props: l, duration: h, elapsed: 0, settings: c }), console.log("Start tween with", c), f(), s;
    }
  };
  return s;
}
export {
  an as animate,
  P as animationDefaultSettings,
  en as easingInBack,
  F as easingInBounce,
  L as easingInCirc,
  v as easingInCubic,
  Y as easingInElastic,
  N as easingInExponential,
  tn as easingInOutBack,
  un as easingInOutBounce,
  W as easingInOutCirc,
  _ as easingInOutCubic,
  nn as easingInOutElastic,
  X as easingInOutExponential,
  A as easingInOutQuad,
  D as easingInOutQuart,
  J as easingInOutQuint,
  K as easingInOutSine,
  C as easingInQuad,
  z as easingInQuart,
  G as easingInQuint,
  $ as easingInSine,
  y as easingLinear,
  rn as easingOutBack,
  q as easingOutBounce,
  V as easingOutCirc,
  x as easingOutCubic,
  Z as easingOutElastic,
  U as easingOutExponential,
  T as easingOutQuad,
  R as easingOutQuart,
  H as easingOutQuint,
  j as easingOutSine,
  Q as useFatina,
  B as useFatinaRaf,
  S as useTicker
};
