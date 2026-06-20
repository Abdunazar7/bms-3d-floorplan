/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Hr = globalThis, oc = Hr.ShadowRoot && (Hr.ShadyCSS === void 0 || Hr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ac = Symbol(), Yc = /* @__PURE__ */ new WeakMap();
let Qh = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== ac) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (oc && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = Yc.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Yc.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vd = (i) => new Qh(typeof i == "string" ? i : i + "", void 0, ac), tu = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, s, r) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[r + 1], i[0]);
  return new Qh(e, i, ac);
}, xd = (i, t) => {
  if (oc) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), s = Hr.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = e.cssText, i.appendChild(n);
  }
}, Kc = oc ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return vd(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: yd, defineProperty: Md, getOwnPropertyDescriptor: Sd, getOwnPropertyNames: Ed, getOwnPropertySymbols: bd, getPrototypeOf: Td } = Object, oo = globalThis, Zc = oo.trustedTypes, Ad = Zc ? Zc.emptyScript : "", wd = oo.reactiveElementPolyfillSupport, Ds = (i, t) => i, Kr = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Ad : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let e = i;
  switch (t) {
    case Boolean:
      e = i !== null;
      break;
    case Number:
      e = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(i);
      } catch {
        e = null;
      }
  }
  return e;
} }, cc = (i, t) => !yd(i, t), Jc = { attribute: !0, type: String, converter: Kr, reflect: !1, useDefault: !1, hasChanged: cc };
Symbol.metadata ??= Symbol("metadata"), oo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Hi = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Jc) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, e);
      s !== void 0 && Md(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: s, set: r } = Sd(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: s, set(o) {
      const a = s?.call(this);
      r?.call(this, o), this.requestUpdate(t, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Jc;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ds("elementProperties"))) return;
    const t = Td(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ds("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ds("properties"))) {
      const e = this.properties, n = [...Ed(e), ...bd(e)];
      for (const s of n) this.createProperty(s, e[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [n, s] of e) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const s = this._$Eu(e, n);
      s !== void 0 && this._$Eh.set(s, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n) e.unshift(Kc(s));
    } else t !== void 0 && e.push(Kc(t));
    return e;
  }
  static _$Eu(t, e) {
    const n = e.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const n of e.keys()) this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return xd(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$ET(t, e) {
    const n = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, n);
    if (s !== void 0 && n.reflect === !0) {
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : Kr).toAttribute(e, n.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Kr;
      this._$Em = s;
      const a = o.fromAttribute(e, r.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, s = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[t]), n ??= o.getPropertyOptions(t), !((n.hasChanged ?? cc)(r, e) || n.useDefault && n.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, n)))) return;
      this.C(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: n, reflect: s, wrapped: r }, o) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || n || (e = void 0), this._$AL.set(t, e)), s === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [s, r] of this._$Ep) this[s] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [s, r] of n) {
        const { wrapped: o } = r, a = this[s];
        o !== !0 || this._$AL.has(s) || a === void 0 || this.C(s, void 0, r, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (n) {
      throw t = !1, this._$EM(), n;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Hi.elementStyles = [], Hi.shadowRootOptions = { mode: "open" }, Hi[Ds("elementProperties")] = /* @__PURE__ */ new Map(), Hi[Ds("finalized")] = /* @__PURE__ */ new Map(), wd?.({ ReactiveElement: Hi }), (oo.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lc = globalThis, Qc = (i) => i, Zr = lc.trustedTypes, tl = Zr ? Zr.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, eu = "$lit$", jn = `lit$${Math.random().toFixed(9).slice(2)}$`, nu = "?" + jn, Rd = `<${nu}>`, mi = document, ks = () => mi.createComment(""), Hs = (i) => i === null || typeof i != "object" && typeof i != "function", hc = Array.isArray, Cd = (i) => hc(i) || typeof i?.[Symbol.iterator] == "function", yo = `[ 	
\f\r]`, ms = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, el = /-->/g, nl = />/g, ii = RegExp(`>|${yo}(?:([^\\s"'>=/]+)(${yo}*=${yo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), il = /'/g, sl = /"/g, iu = /^(?:script|style|textarea|title)$/i, Pd = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), me = Pd(1), Ki = Symbol.for("lit-noChange"), Vt = Symbol.for("lit-nothing"), rl = /* @__PURE__ */ new WeakMap(), pi = mi.createTreeWalker(mi, 129);
function su(i, t) {
  if (!hc(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return tl !== void 0 ? tl.createHTML(t) : t;
}
const Ld = (i, t) => {
  const e = i.length - 1, n = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ms;
  for (let a = 0; a < e; a++) {
    const c = i[a];
    let l, h, u = -1, d = 0;
    for (; d < c.length && (o.lastIndex = d, h = o.exec(c), h !== null); ) d = o.lastIndex, o === ms ? h[1] === "!--" ? o = el : h[1] !== void 0 ? o = nl : h[2] !== void 0 ? (iu.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = ii) : h[3] !== void 0 && (o = ii) : o === ii ? h[0] === ">" ? (o = s ?? ms, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? ii : h[3] === '"' ? sl : il) : o === sl || o === il ? o = ii : o === el || o === nl ? o = ms : (o = ii, s = void 0);
    const f = o === ii && i[a + 1].startsWith("/>") ? " " : "";
    r += o === ms ? c + Rd : u >= 0 ? (n.push(l), c.slice(0, u) + eu + c.slice(u) + jn + f) : c + jn + (u === -2 ? a : f);
  }
  return [su(i, r + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Vs {
  constructor({ strings: t, _$litType$: e }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, c = this.parts, [l, h] = Ld(t, e);
    if (this.el = Vs.createElement(l, n), pi.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = pi.nextNode()) !== null && c.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(eu)) {
          const d = h[o++], f = s.getAttribute(u).split(jn), g = /([.?@])?(.*)/.exec(d);
          c.push({ type: 1, index: r, name: g[2], strings: f, ctor: g[1] === "." ? Dd : g[1] === "?" ? Nd : g[1] === "@" ? Ud : ao }), s.removeAttribute(u);
        } else u.startsWith(jn) && (c.push({ type: 6, index: r }), s.removeAttribute(u));
        if (iu.test(s.tagName)) {
          const u = s.textContent.split(jn), d = u.length - 1;
          if (d > 0) {
            s.textContent = Zr ? Zr.emptyScript : "";
            for (let f = 0; f < d; f++) s.append(u[f], ks()), pi.nextNode(), c.push({ type: 2, index: ++r });
            s.append(u[d], ks());
          }
        }
      } else if (s.nodeType === 8) if (s.data === nu) c.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(jn, u + 1)) !== -1; ) c.push({ type: 7, index: r }), u += jn.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const n = mi.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Zi(i, t, e = i, n) {
  if (t === Ki) return t;
  let s = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const r = Hs(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(i), s._$AT(i, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = s : e._$Cl = s), s !== void 0 && (t = Zi(i, s._$AS(i, t.values), s, n)), t;
}
class Id {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: n } = this._$AD, s = (t?.creationScope ?? mi).importNode(e, !0);
    pi.currentNode = s;
    let r = pi.nextNode(), o = 0, a = 0, c = n[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new Zs(r, r.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(r, c.name, c.strings, this, t) : c.type === 6 && (l = new Od(r, this, t)), this._$AV.push(l), c = n[++a];
      }
      o !== c?.index && (r = pi.nextNode(), o++);
    }
    return pi.currentNode = mi, s;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class Zs {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, s) {
    this.type = 2, this._$AH = Vt, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = Zi(this, t, e), Hs(t) ? t === Vt || t == null || t === "" ? (this._$AH !== Vt && this._$AR(), this._$AH = Vt) : t !== this._$AH && t !== Ki && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Cd(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== Vt && Hs(this._$AH) ? this._$AA.nextSibling.data = t : this.T(mi.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Vs.createElement(su(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const r = new Id(s, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = rl.get(t.strings);
    return e === void 0 && rl.set(t.strings, e = new Vs(t)), e;
  }
  k(t) {
    hc(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, s = 0;
    for (const r of t) s === e.length ? e.push(n = new Zs(this.O(ks()), this.O(ks()), this, this.options)) : n = e[s], n._$AI(r), s++;
    s < e.length && (this._$AR(n && n._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = Qc(t).nextSibling;
      Qc(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ao {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, s, r) {
    this.type = 1, this._$AH = Vt, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = Vt;
  }
  _$AI(t, e = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = Zi(this, t, e, 0), o = !Hs(t) || t !== this._$AH && t !== Ki, o && (this._$AH = t);
    else {
      const a = t;
      let c, l;
      for (t = r[0], c = 0; c < r.length - 1; c++) l = Zi(this, a[n + c], e, c), l === Ki && (l = this._$AH[c]), o ||= !Hs(l) || l !== this._$AH[c], l === Vt ? t = Vt : t !== Vt && (t += (l ?? "") + r[c + 1]), this._$AH[c] = l;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === Vt ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Dd extends ao {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === Vt ? void 0 : t;
  }
}
class Nd extends ao {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== Vt);
  }
}
class Ud extends ao {
  constructor(t, e, n, s, r) {
    super(t, e, n, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Zi(this, t, e, 0) ?? Vt) === Ki) return;
    const n = this._$AH, s = t === Vt && n !== Vt || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== Vt && (n === Vt || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Od {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Zi(this, t);
  }
}
const Fd = lc.litHtmlPolyfillSupport;
Fd?.(Vs, Zs), (lc.litHtmlVersions ??= []).push("3.3.3");
const Bd = (i, t, e) => {
  const n = e?.renderBefore ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = e?.renderBefore ?? null;
    n._$litPart$ = s = new Zs(t.insertBefore(ks(), r), r, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const uc = globalThis;
class Wi extends Hi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Bd(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ki;
  }
}
Wi._$litElement$ = !0, Wi.finalized = !0, uc.litElementHydrateSupport?.({ LitElement: Wi });
const zd = uc.litElementPolyfillSupport;
zd?.({ LitElement: Wi });
(uc.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ru = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kd = { attribute: !0, type: String, converter: Kr, reflect: !1, hasChanged: cc }, Hd = (i = kd, t, e) => {
  const { kind: n, metadata: s } = e;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(e.name, i), n === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const c = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, c, i, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, i, a), a;
    } };
  }
  if (n === "setter") {
    const { name: o } = e;
    return function(a) {
      const c = this[o];
      t.call(this, a), this.requestUpdate(o, c, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Js(i) {
  return (t, e) => typeof e == "object" ? Hd(i, t, e) : ((n, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Ne(i) {
  return Js({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Vd = (i, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(i, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Gd(i, t) {
  return (e, n, s) => {
    const r = (o) => o.renderRoot?.querySelector(i) ?? null;
    return Vd(e, n, { get() {
      return r(this);
    } });
  };
}
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const dc = "169", un = { ROTATE: 0, DOLLY: 1, PAN: 2 }, dn = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, Wd = 0, ol = 1, Xd = 2, ou = 1, au = 2, In = 3, Fn = 0, $e = 1, fn = 2, Zn = 0, Xi = 1, al = 2, cl = 3, ll = 4, $d = 5, di = 100, jd = 101, qd = 102, Yd = 103, Kd = 104, Zd = 200, Jd = 201, Qd = 202, tf = 203, ha = 204, ua = 205, ef = 206, nf = 207, sf = 208, rf = 209, of = 210, af = 211, cf = 212, lf = 213, hf = 214, da = 0, fa = 1, pa = 2, Ji = 3, ma = 4, ga = 5, _a = 6, va = 7, cu = 0, uf = 1, df = 2, Jn = 0, ff = 1, pf = 2, mf = 3, gf = 4, _f = 5, vf = 6, xf = 7, hl = "attached", yf = "detached", lu = 300, Qi = 301, ts = 302, xa = 303, ya = 304, co = 306, es = 1e3, Yn = 1001, Jr = 1002, Ve = 1003, hu = 1004, Ls = 1005, Qe = 1006, Vr = 1007, Un = 1008, Bn = 1009, uu = 1010, du = 1011, Gs = 1012, fc = 1013, gi = 1014, mn = 1015, Qs = 1016, pc = 1017, mc = 1018, ns = 1020, fu = 35902, pu = 1021, mu = 1022, rn = 1023, gu = 1024, _u = 1025, $i = 1026, is = 1027, gc = 1028, _c = 1029, vu = 1030, vc = 1031, xc = 1033, Gr = 33776, Wr = 33777, Xr = 33778, $r = 33779, Ma = 35840, Sa = 35841, Ea = 35842, ba = 35843, Ta = 36196, Aa = 37492, wa = 37496, Ra = 37808, Ca = 37809, Pa = 37810, La = 37811, Ia = 37812, Da = 37813, Na = 37814, Ua = 37815, Oa = 37816, Fa = 37817, Ba = 37818, za = 37819, ka = 37820, Ha = 37821, jr = 36492, Va = 36494, Ga = 36495, xu = 36283, Wa = 36284, Xa = 36285, $a = 36286, Ws = 2300, Xs = 2301, Mo = 2302, ul = 2400, dl = 2401, fl = 2402, Mf = 2500, Sf = 0, yu = 1, ja = 2, Ef = 3200, bf = 3201, Mu = 0, Tf = 1, qn = "", He = "srgb", De = "srgb-linear", yc = "display-p3", lo = "display-p3-linear", Qr = "linear", ue = "srgb", to = "rec709", eo = "p3", Mi = 7680, pl = 519, Af = 512, wf = 513, Rf = 514, Su = 515, Cf = 516, Pf = 517, Lf = 518, If = 519, qa = 35044, ml = "300 es", On = 2e3, no = 2001;
class xi {
  addEventListener(t, e) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[t] === void 0 && (n[t] = []), n[t].indexOf(e) === -1 && n[t].push(e);
  }
  hasEventListener(t, e) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[t] !== void 0 && n[t].indexOf(e) !== -1;
  }
  removeEventListener(t, e) {
    if (this._listeners === void 0) return;
    const s = this._listeners[t];
    if (s !== void 0) {
      const r = s.indexOf(e);
      r !== -1 && s.splice(r, 1);
    }
  }
  dispatchEvent(t) {
    if (this._listeners === void 0) return;
    const n = this._listeners[t.type];
    if (n !== void 0) {
      t.target = this;
      const s = n.slice(0);
      for (let r = 0, o = s.length; r < o; r++)
        s[r].call(this, t);
      t.target = null;
    }
  }
}
const Ue = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let gl = 1234567;
const Ns = Math.PI / 180, ss = 180 / Math.PI;
function on() {
  const i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (Ue[i & 255] + Ue[i >> 8 & 255] + Ue[i >> 16 & 255] + Ue[i >> 24 & 255] + "-" + Ue[t & 255] + Ue[t >> 8 & 255] + "-" + Ue[t >> 16 & 15 | 64] + Ue[t >> 24 & 255] + "-" + Ue[e & 63 | 128] + Ue[e >> 8 & 255] + "-" + Ue[e >> 16 & 255] + Ue[e >> 24 & 255] + Ue[n & 255] + Ue[n >> 8 & 255] + Ue[n >> 16 & 255] + Ue[n >> 24 & 255]).toLowerCase();
}
function Ee(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function Mc(i, t) {
  return (i % t + t) % t;
}
function Df(i, t, e, n, s) {
  return n + (i - t) * (s - n) / (e - t);
}
function Nf(i, t, e) {
  return i !== t ? (e - i) / (t - i) : 0;
}
function Us(i, t, e) {
  return (1 - e) * i + e * t;
}
function Uf(i, t, e, n) {
  return Us(i, t, 1 - Math.exp(-e * n));
}
function Of(i, t = 1) {
  return t - Math.abs(Mc(i, t * 2) - t);
}
function Ff(i, t, e) {
  return i <= t ? 0 : i >= e ? 1 : (i = (i - t) / (e - t), i * i * (3 - 2 * i));
}
function Bf(i, t, e) {
  return i <= t ? 0 : i >= e ? 1 : (i = (i - t) / (e - t), i * i * i * (i * (i * 6 - 15) + 10));
}
function zf(i, t) {
  return i + Math.floor(Math.random() * (t - i + 1));
}
function kf(i, t) {
  return i + Math.random() * (t - i);
}
function Hf(i) {
  return i * (0.5 - Math.random());
}
function Vf(i) {
  i !== void 0 && (gl = i);
  let t = gl += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function Gf(i) {
  return i * Ns;
}
function Wf(i) {
  return i * ss;
}
function Xf(i) {
  return (i & i - 1) === 0 && i !== 0;
}
function $f(i) {
  return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2));
}
function jf(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function qf(i, t, e, n, s) {
  const r = Math.cos, o = Math.sin, a = r(e / 2), c = o(e / 2), l = r((t + n) / 2), h = o((t + n) / 2), u = r((t - n) / 2), d = o((t - n) / 2), f = r((n - t) / 2), g = o((n - t) / 2);
  switch (s) {
    case "XYX":
      i.set(a * h, c * u, c * d, a * l);
      break;
    case "YZY":
      i.set(c * d, a * h, c * u, a * l);
      break;
    case "ZXZ":
      i.set(c * u, c * d, a * h, a * l);
      break;
    case "XZX":
      i.set(a * h, c * g, c * f, a * l);
      break;
    case "YXY":
      i.set(c * f, a * h, c * g, a * l);
      break;
    case "ZYZ":
      i.set(c * g, c * f, a * h, a * l);
      break;
    default:
      console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + s);
  }
}
function pn(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function ie(i, t) {
  switch (t.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const ji = {
  DEG2RAD: Ns,
  RAD2DEG: ss,
  generateUUID: on,
  clamp: Ee,
  euclideanModulo: Mc,
  mapLinear: Df,
  inverseLerp: Nf,
  lerp: Us,
  damp: Uf,
  pingpong: Of,
  smoothstep: Ff,
  smootherstep: Bf,
  randInt: zf,
  randFloat: kf,
  randFloatSpread: Hf,
  seededRandom: Vf,
  degToRad: Gf,
  radToDeg: Wf,
  isPowerOfTwo: Xf,
  ceilPowerOfTwo: $f,
  floorPowerOfTwo: jf,
  setQuaternionFromProperEuler: qf,
  normalize: ie,
  denormalize: pn
};
class tt {
  constructor(t = 0, e = 0) {
    tt.prototype.isVector2 = !0, this.x = t, this.y = e;
  }
  get width() {
    return this.x;
  }
  set width(t) {
    this.x = t;
  }
  get height() {
    return this.y;
  }
  set height(t) {
    this.y = t;
  }
  set(t, e) {
    return this.x = t, this.y = e, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this;
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, s = t.elements;
    return this.x = s[0] * e + s[3] * n + s[6], this.y = s[1] * e + s[4] * n + s[7], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  cross(t) {
    return this.x * t.y - this.y * t.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(Ee(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y;
    return e * e + n * n;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this;
  }
  rotateAround(t, e) {
    const n = Math.cos(e), s = Math.sin(e), r = this.x - t.x, o = this.y - t.y;
    return this.x = r * n - o * s + t.x, this.y = r * s + o * n + t.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Ft {
  constructor(t, e, n, s, r, o, a, c, l) {
    Ft.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, e, n, s, r, o, a, c, l);
  }
  set(t, e, n, s, r, o, a, c, l) {
    const h = this.elements;
    return h[0] = t, h[1] = s, h[2] = a, h[3] = e, h[4] = r, h[5] = c, h[6] = n, h[7] = o, h[8] = l, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(t) {
    const e = t.elements;
    return this.set(
      e[0],
      e[4],
      e[8],
      e[1],
      e[5],
      e[9],
      e[2],
      e[6],
      e[10]
    ), this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, s = e.elements, r = this.elements, o = n[0], a = n[3], c = n[6], l = n[1], h = n[4], u = n[7], d = n[2], f = n[5], g = n[8], _ = s[0], p = s[3], m = s[6], S = s[1], x = s[4], M = s[7], P = s[2], R = s[5], A = s[8];
    return r[0] = o * _ + a * S + c * P, r[3] = o * p + a * x + c * R, r[6] = o * m + a * M + c * A, r[1] = l * _ + h * S + u * P, r[4] = l * p + h * x + u * R, r[7] = l * m + h * M + u * A, r[2] = d * _ + f * S + g * P, r[5] = d * p + f * x + g * R, r[8] = d * m + f * M + g * A, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], o = t[4], a = t[5], c = t[6], l = t[7], h = t[8];
    return e * o * h - e * a * l - n * r * h + n * a * c + s * r * l - s * o * c;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], o = t[4], a = t[5], c = t[6], l = t[7], h = t[8], u = h * o - a * l, d = a * c - h * r, f = l * r - o * c, g = e * u + n * d + s * f;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const _ = 1 / g;
    return t[0] = u * _, t[1] = (s * l - h * n) * _, t[2] = (a * n - s * o) * _, t[3] = d * _, t[4] = (h * e - s * c) * _, t[5] = (s * r - a * e) * _, t[6] = f * _, t[7] = (n * c - l * e) * _, t[8] = (o * e - n * r) * _, this;
  }
  transpose() {
    let t;
    const e = this.elements;
    return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this;
  }
  getNormalMatrix(t) {
    return this.setFromMatrix4(t).invert().transpose();
  }
  transposeIntoArray(t) {
    const e = this.elements;
    return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this;
  }
  setUvTransform(t, e, n, s, r, o, a) {
    const c = Math.cos(r), l = Math.sin(r);
    return this.set(
      n * c,
      n * l,
      -n * (c * o + l * a) + o + t,
      -s * l,
      s * c,
      -s * (-l * o + c * a) + a + e,
      0,
      0,
      1
    ), this;
  }
  //
  scale(t, e) {
    return this.premultiply(So.makeScale(t, e)), this;
  }
  rotate(t) {
    return this.premultiply(So.makeRotation(-t)), this;
  }
  translate(t, e) {
    return this.premultiply(So.makeTranslation(t, e)), this;
  }
  // for 2D Transforms
  makeTranslation(t, e) {
    return t.isVector2 ? this.set(
      1,
      0,
      t.x,
      0,
      1,
      t.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      t,
      0,
      1,
      e,
      0,
      0,
      1
    ), this;
  }
  makeRotation(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      -n,
      0,
      n,
      e,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(t, e) {
    return this.set(
      t,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let s = 0; s < 9; s++)
      if (e[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const So = /* @__PURE__ */ new Ft();
function Eu(i) {
  for (let t = i.length - 1; t >= 0; --t)
    if (i[t] >= 65535) return !0;
  return !1;
}
function $s(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Yf() {
  const i = $s("canvas");
  return i.style.display = "block", i;
}
const _l = {};
function qr(i) {
  i in _l || (_l[i] = !0, console.warn(i));
}
function Kf(i, t, e) {
  return new Promise(function(n, s) {
    function r() {
      switch (i.clientWaitSync(t, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          s();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(r, e);
          break;
        default:
          n();
      }
    }
    setTimeout(r, e);
  });
}
function Zf(i) {
  const t = i.elements;
  t[2] = 0.5 * t[2] + 0.5 * t[3], t[6] = 0.5 * t[6] + 0.5 * t[7], t[10] = 0.5 * t[10] + 0.5 * t[11], t[14] = 0.5 * t[14] + 0.5 * t[15];
}
function Jf(i) {
  const t = i.elements;
  t[11] === -1 ? (t[10] = -t[10] - 1, t[14] = -t[14]) : (t[10] = -t[10], t[14] = -t[14] + 1);
}
const vl = /* @__PURE__ */ new Ft().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), xl = /* @__PURE__ */ new Ft().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), gs = {
  [De]: {
    transfer: Qr,
    primaries: to,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (i) => i,
    fromReference: (i) => i
  },
  [He]: {
    transfer: ue,
    primaries: to,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (i) => i.convertSRGBToLinear(),
    fromReference: (i) => i.convertLinearToSRGB()
  },
  [lo]: {
    transfer: Qr,
    primaries: eo,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (i) => i.applyMatrix3(xl),
    fromReference: (i) => i.applyMatrix3(vl)
  },
  [yc]: {
    transfer: ue,
    primaries: eo,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (i) => i.convertSRGBToLinear().applyMatrix3(xl),
    fromReference: (i) => i.applyMatrix3(vl).convertLinearToSRGB()
  }
}, Qf = /* @__PURE__ */ new Set([De, lo]), qt = {
  enabled: !0,
  _workingColorSpace: De,
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(i) {
    if (!Qf.has(i))
      throw new Error(`Unsupported working color space, "${i}".`);
    this._workingColorSpace = i;
  },
  convert: function(i, t, e) {
    if (this.enabled === !1 || t === e || !t || !e)
      return i;
    const n = gs[t].toReference, s = gs[e].fromReference;
    return s(n(i));
  },
  fromWorkingColorSpace: function(i, t) {
    return this.convert(i, this._workingColorSpace, t);
  },
  toWorkingColorSpace: function(i, t) {
    return this.convert(i, t, this._workingColorSpace);
  },
  getPrimaries: function(i) {
    return gs[i].primaries;
  },
  getTransfer: function(i) {
    return i === qn ? Qr : gs[i].transfer;
  },
  getLuminanceCoefficients: function(i, t = this._workingColorSpace) {
    return i.fromArray(gs[t].luminanceCoefficients);
  }
};
function qi(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function Eo(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let Si;
class tp {
  static getDataURL(t) {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u")
      return t.src;
    let e;
    if (t instanceof HTMLCanvasElement)
      e = t;
    else {
      Si === void 0 && (Si = $s("canvas")), Si.width = t.width, Si.height = t.height;
      const n = Si.getContext("2d");
      t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = Si;
    }
    return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6)) : e.toDataURL("image/png");
  }
  static sRGBToLinear(t) {
    if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
      const e = $s("canvas");
      e.width = t.width, e.height = t.height;
      const n = e.getContext("2d");
      n.drawImage(t, 0, 0, t.width, t.height);
      const s = n.getImageData(0, 0, t.width, t.height), r = s.data;
      for (let o = 0; o < r.length; o++)
        r[o] = qi(r[o] / 255) * 255;
      return n.putImageData(s, 0, 0), e;
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let n = 0; n < e.length; n++)
        e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[n] = Math.floor(qi(e[n] / 255) * 255) : e[n] = qi(e[n]);
      return {
        data: e,
        width: t.width,
        height: t.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
  }
}
let ep = 0;
class bu {
  constructor(t = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: ep++ }), this.uuid = on(), this.data = t, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.images[this.uuid] !== void 0)
      return t.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, s = this.data;
    if (s !== null) {
      let r;
      if (Array.isArray(s)) {
        r = [];
        for (let o = 0, a = s.length; o < a; o++)
          s[o].isDataTexture ? r.push(bo(s[o].image)) : r.push(bo(s[o]));
      } else
        r = bo(s);
      n.url = r;
    }
    return e || (t.images[this.uuid] = n), n;
  }
}
function bo(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? tp.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let np = 0;
class be extends xi {
  constructor(t = be.DEFAULT_IMAGE, e = be.DEFAULT_MAPPING, n = Yn, s = Yn, r = Qe, o = Un, a = rn, c = Bn, l = be.DEFAULT_ANISOTROPY, h = qn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: np++ }), this.uuid = on(), this.name = "", this.source = new bu(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = s, this.magFilter = r, this.minFilter = o, this.anisotropy = l, this.format = a, this.internalFormat = null, this.type = c, this.offset = new tt(0, 0), this.repeat = new tt(1, 1), this.center = new tt(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Ft(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(t = null) {
    this.source.data = t;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = !0, this;
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    if (!e && t.textures[this.uuid] !== void 0)
      return t.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(t).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(t) {
    if (this.mapping !== lu) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1)
      switch (this.wrapS) {
        case es:
          t.x = t.x - Math.floor(t.x);
          break;
        case Yn:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case Jr:
          Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
          break;
      }
    if (t.y < 0 || t.y > 1)
      switch (this.wrapT) {
        case es:
          t.y = t.y - Math.floor(t.y);
          break;
        case Yn:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case Jr:
          Math.abs(Math.floor(t.y) % 2) === 1 ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y);
          break;
      }
    return this.flipY && (t.y = 1 - t.y), t;
  }
  set needsUpdate(t) {
    t === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(t) {
    t === !0 && this.pmremVersion++;
  }
}
be.DEFAULT_IMAGE = null;
be.DEFAULT_MAPPING = lu;
be.DEFAULT_ANISOTROPY = 1;
class Zt {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    Zt.prototype.isVector4 = !0, this.x = t, this.y = e, this.z = n, this.w = s;
  }
  get width() {
    return this.z;
  }
  set width(t) {
    this.z = t;
  }
  get height() {
    return this.w;
  }
  set height(t) {
    this.w = t;
  }
  set(t, e, n, s) {
    return this.x = t, this.y = e, this.z = n, this.w = s, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this.w = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setW(t) {
    return this.w = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      case 3:
        this.w = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w !== void 0 ? t.w : 1, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this.w += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, s = this.z, r = this.w, o = t.elements;
    return this.x = o[0] * e + o[4] * n + o[8] * s + o[12] * r, this.y = o[1] * e + o[5] * n + o[9] * s + o[13] * r, this.z = o[2] * e + o[6] * n + o[10] * s + o[14] * r, this.w = o[3] * e + o[7] * n + o[11] * s + o[15] * r, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  setAxisAngleFromQuaternion(t) {
    this.w = 2 * Math.acos(t.w);
    const e = Math.sqrt(1 - t.w * t.w);
    return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this;
  }
  setAxisAngleFromRotationMatrix(t) {
    let e, n, s, r;
    const c = t.elements, l = c[0], h = c[4], u = c[8], d = c[1], f = c[5], g = c[9], _ = c[2], p = c[6], m = c[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(u - _) < 0.01 && Math.abs(g - p) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(u + _) < 0.1 && Math.abs(g + p) < 0.1 && Math.abs(l + f + m - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      e = Math.PI;
      const x = (l + 1) / 2, M = (f + 1) / 2, P = (m + 1) / 2, R = (h + d) / 4, A = (u + _) / 4, L = (g + p) / 4;
      return x > M && x > P ? x < 0.01 ? (n = 0, s = 0.707106781, r = 0.707106781) : (n = Math.sqrt(x), s = R / n, r = A / n) : M > P ? M < 0.01 ? (n = 0.707106781, s = 0, r = 0.707106781) : (s = Math.sqrt(M), n = R / s, r = L / s) : P < 0.01 ? (n = 0.707106781, s = 0.707106781, r = 0) : (r = Math.sqrt(P), n = A / r, s = L / r), this.set(n, s, r, e), this;
    }
    let S = Math.sqrt((p - g) * (p - g) + (u - _) * (u - _) + (d - h) * (d - h));
    return Math.abs(S) < 1e-3 && (S = 1), this.x = (p - g) / S, this.y = (u - _) / S, this.z = (d - h) / S, this.w = Math.acos((l + f + m - 1) / 2), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this;
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this.w = Math.max(t.w, Math.min(e.w, this.w)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this.w = Math.max(t, Math.min(e, this.w)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class ip extends xi {
  constructor(t = 1, e = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = t, this.height = e, this.depth = 1, this.scissor = new Zt(0, 0, t, e), this.scissorTest = !1, this.viewport = new Zt(0, 0, t, e);
    const s = { width: t, height: e, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: Qe,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, n);
    const r = new be(s, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
    r.flipY = !1, r.generateMipmaps = n.generateMipmaps, r.internalFormat = n.internalFormat, this.textures = [];
    const o = n.count;
    for (let a = 0; a < o; a++)
      this.textures[a] = r.clone(), this.textures[a].isRenderTargetTexture = !0;
    this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(t) {
    this.textures[0] = t;
  }
  setSize(t, e, n = 1) {
    if (this.width !== t || this.height !== e || this.depth !== n) {
      this.width = t, this.height = e, this.depth = n;
      for (let s = 0, r = this.textures.length; s < r; s++)
        this.textures[s].image.width = t, this.textures[s].image.height = e, this.textures[s].image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.textures.length = 0;
    for (let n = 0, s = t.textures.length; n < s; n++)
      this.textures[n] = t.textures[n].clone(), this.textures[n].isRenderTargetTexture = !0;
    const e = Object.assign({}, t.texture.image);
    return this.texture.source = new bu(e), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class _i extends ip {
  constructor(t = 1, e = 1, n = {}) {
    super(t, e, n), this.isWebGLRenderTarget = !0;
  }
}
class Tu extends be {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Ve, this.minFilter = Ve, this.wrapR = Yn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class sp extends be {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Ve, this.minFilter = Ve, this.wrapR = Yn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class xn {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    this.isQuaternion = !0, this._x = t, this._y = e, this._z = n, this._w = s;
  }
  static slerpFlat(t, e, n, s, r, o, a) {
    let c = n[s + 0], l = n[s + 1], h = n[s + 2], u = n[s + 3];
    const d = r[o + 0], f = r[o + 1], g = r[o + 2], _ = r[o + 3];
    if (a === 0) {
      t[e + 0] = c, t[e + 1] = l, t[e + 2] = h, t[e + 3] = u;
      return;
    }
    if (a === 1) {
      t[e + 0] = d, t[e + 1] = f, t[e + 2] = g, t[e + 3] = _;
      return;
    }
    if (u !== _ || c !== d || l !== f || h !== g) {
      let p = 1 - a;
      const m = c * d + l * f + h * g + u * _, S = m >= 0 ? 1 : -1, x = 1 - m * m;
      if (x > Number.EPSILON) {
        const P = Math.sqrt(x), R = Math.atan2(P, m * S);
        p = Math.sin(p * R) / P, a = Math.sin(a * R) / P;
      }
      const M = a * S;
      if (c = c * p + d * M, l = l * p + f * M, h = h * p + g * M, u = u * p + _ * M, p === 1 - a) {
        const P = 1 / Math.sqrt(c * c + l * l + h * h + u * u);
        c *= P, l *= P, h *= P, u *= P;
      }
    }
    t[e] = c, t[e + 1] = l, t[e + 2] = h, t[e + 3] = u;
  }
  static multiplyQuaternionsFlat(t, e, n, s, r, o) {
    const a = n[s], c = n[s + 1], l = n[s + 2], h = n[s + 3], u = r[o], d = r[o + 1], f = r[o + 2], g = r[o + 3];
    return t[e] = a * g + h * u + c * f - l * d, t[e + 1] = c * g + h * d + l * u - a * f, t[e + 2] = l * g + h * f + a * d - c * u, t[e + 3] = h * g - a * u - c * d - l * f, t;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(t) {
    this._w = t, this._onChangeCallback();
  }
  set(t, e, n, s) {
    return this._x = t, this._y = e, this._z = n, this._w = s, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(t) {
    return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this;
  }
  setFromEuler(t, e = !0) {
    const n = t._x, s = t._y, r = t._z, o = t._order, a = Math.cos, c = Math.sin, l = a(n / 2), h = a(s / 2), u = a(r / 2), d = c(n / 2), f = c(s / 2), g = c(r / 2);
    switch (o) {
      case "XYZ":
        this._x = d * h * u + l * f * g, this._y = l * f * u - d * h * g, this._z = l * h * g + d * f * u, this._w = l * h * u - d * f * g;
        break;
      case "YXZ":
        this._x = d * h * u + l * f * g, this._y = l * f * u - d * h * g, this._z = l * h * g - d * f * u, this._w = l * h * u + d * f * g;
        break;
      case "ZXY":
        this._x = d * h * u - l * f * g, this._y = l * f * u + d * h * g, this._z = l * h * g + d * f * u, this._w = l * h * u - d * f * g;
        break;
      case "ZYX":
        this._x = d * h * u - l * f * g, this._y = l * f * u + d * h * g, this._z = l * h * g - d * f * u, this._w = l * h * u + d * f * g;
        break;
      case "YZX":
        this._x = d * h * u + l * f * g, this._y = l * f * u + d * h * g, this._z = l * h * g - d * f * u, this._w = l * h * u - d * f * g;
        break;
      case "XZY":
        this._x = d * h * u - l * f * g, this._y = l * f * u - d * h * g, this._z = l * h * g + d * f * u, this._w = l * h * u + d * f * g;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + o);
    }
    return e === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(t, e) {
    const n = e / 2, s = Math.sin(n);
    return this._x = t.x * s, this._y = t.y * s, this._z = t.z * s, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t) {
    const e = t.elements, n = e[0], s = e[4], r = e[8], o = e[1], a = e[5], c = e[9], l = e[2], h = e[6], u = e[10], d = n + a + u;
    if (d > 0) {
      const f = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / f, this._x = (h - c) * f, this._y = (r - l) * f, this._z = (o - s) * f;
    } else if (n > a && n > u) {
      const f = 2 * Math.sqrt(1 + n - a - u);
      this._w = (h - c) / f, this._x = 0.25 * f, this._y = (s + o) / f, this._z = (r + l) / f;
    } else if (a > u) {
      const f = 2 * Math.sqrt(1 + a - n - u);
      this._w = (r - l) / f, this._x = (s + o) / f, this._y = 0.25 * f, this._z = (c + h) / f;
    } else {
      const f = 2 * Math.sqrt(1 + u - n - a);
      this._w = (o - s) / f, this._x = (r + l) / f, this._y = (c + h) / f, this._z = 0.25 * f;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(Ee(this.dot(t), -1, 1)));
  }
  rotateTowards(t, e) {
    const n = this.angleTo(t);
    if (n === 0) return this;
    const s = Math.min(1, e / n);
    return this.slerp(t, s), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(t) {
    return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let t = this.length();
    return t === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this;
  }
  multiply(t) {
    return this.multiplyQuaternions(this, t);
  }
  premultiply(t) {
    return this.multiplyQuaternions(t, this);
  }
  multiplyQuaternions(t, e) {
    const n = t._x, s = t._y, r = t._z, o = t._w, a = e._x, c = e._y, l = e._z, h = e._w;
    return this._x = n * h + o * a + s * l - r * c, this._y = s * h + o * c + r * a - n * l, this._z = r * h + o * l + n * c - s * a, this._w = o * h - n * a - s * c - r * l, this._onChangeCallback(), this;
  }
  slerp(t, e) {
    if (e === 0) return this;
    if (e === 1) return this.copy(t);
    const n = this._x, s = this._y, r = this._z, o = this._w;
    let a = o * t._w + n * t._x + s * t._y + r * t._z;
    if (a < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, a = -a) : this.copy(t), a >= 1)
      return this._w = o, this._x = n, this._y = s, this._z = r, this;
    const c = 1 - a * a;
    if (c <= Number.EPSILON) {
      const f = 1 - e;
      return this._w = f * o + e * this._w, this._x = f * n + e * this._x, this._y = f * s + e * this._y, this._z = f * r + e * this._z, this.normalize(), this;
    }
    const l = Math.sqrt(c), h = Math.atan2(l, a), u = Math.sin((1 - e) * h) / l, d = Math.sin(e * h) / l;
    return this._w = o * u + this._w * d, this._x = n * u + this._x * d, this._y = s * u + this._y * d, this._z = r * u + this._z * d, this._onChangeCallback(), this;
  }
  slerpQuaternions(t, e, n) {
    return this.copy(t).slerp(e, n);
  }
  random() {
    const t = 2 * Math.PI * Math.random(), e = 2 * Math.PI * Math.random(), n = Math.random(), s = Math.sqrt(1 - n), r = Math.sqrt(n);
    return this.set(
      s * Math.sin(t),
      s * Math.cos(t),
      r * Math.sin(e),
      r * Math.cos(e)
    );
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w;
  }
  fromArray(t, e = 0) {
    return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t;
  }
  fromBufferAttribute(t, e) {
    return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class w {
  constructor(t = 0, e = 0, n = 0) {
    w.prototype.isVector3 = !0, this.x = t, this.y = e, this.z = n;
  }
  set(t, e, n) {
    return n === void 0 && (n = this.z), this.x = t, this.y = e, this.z = n, this;
  }
  setScalar(t) {
    return this.x = t, this.y = t, this.z = t, this;
  }
  setX(t) {
    return this.x = t, this;
  }
  setY(t) {
    return this.y = t, this;
  }
  setZ(t) {
    return this.z = t, this;
  }
  setComponent(t, e) {
    switch (t) {
      case 0:
        this.x = e;
        break;
      case 1:
        this.y = e;
        break;
      case 2:
        this.z = e;
        break;
      default:
        throw new Error("index is out of range: " + t);
    }
    return this;
  }
  getComponent(t) {
    switch (t) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + t);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(t) {
    return this.x = t.x, this.y = t.y, this.z = t.z, this;
  }
  add(t) {
    return this.x += t.x, this.y += t.y, this.z += t.z, this;
  }
  addScalar(t) {
    return this.x += t, this.y += t, this.z += t, this;
  }
  addVectors(t, e) {
    return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this;
  }
  addScaledVector(t, e) {
    return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this;
  }
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
  }
  subScalar(t) {
    return this.x -= t, this.y -= t, this.z -= t, this;
  }
  subVectors(t, e) {
    return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this;
  }
  multiply(t) {
    return this.x *= t.x, this.y *= t.y, this.z *= t.z, this;
  }
  multiplyScalar(t) {
    return this.x *= t, this.y *= t, this.z *= t, this;
  }
  multiplyVectors(t, e) {
    return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this;
  }
  applyEuler(t) {
    return this.applyQuaternion(yl.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(yl.setFromAxisAngle(t, e));
  }
  applyMatrix3(t) {
    const e = this.x, n = this.y, s = this.z, r = t.elements;
    return this.x = r[0] * e + r[3] * n + r[6] * s, this.y = r[1] * e + r[4] * n + r[7] * s, this.z = r[2] * e + r[5] * n + r[8] * s, this;
  }
  applyNormalMatrix(t) {
    return this.applyMatrix3(t).normalize();
  }
  applyMatrix4(t) {
    const e = this.x, n = this.y, s = this.z, r = t.elements, o = 1 / (r[3] * e + r[7] * n + r[11] * s + r[15]);
    return this.x = (r[0] * e + r[4] * n + r[8] * s + r[12]) * o, this.y = (r[1] * e + r[5] * n + r[9] * s + r[13]) * o, this.z = (r[2] * e + r[6] * n + r[10] * s + r[14]) * o, this;
  }
  applyQuaternion(t) {
    const e = this.x, n = this.y, s = this.z, r = t.x, o = t.y, a = t.z, c = t.w, l = 2 * (o * s - a * n), h = 2 * (a * e - r * s), u = 2 * (r * n - o * e);
    return this.x = e + c * l + o * u - a * h, this.y = n + c * h + a * l - r * u, this.z = s + c * u + r * h - o * l, this;
  }
  project(t) {
    return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix);
  }
  unproject(t) {
    return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld);
  }
  transformDirection(t) {
    const e = this.x, n = this.y, s = this.z, r = t.elements;
    return this.x = r[0] * e + r[4] * n + r[8] * s, this.y = r[1] * e + r[5] * n + r[9] * s, this.z = r[2] * e + r[6] * n + r[10] * s, this.normalize();
  }
  divide(t) {
    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this;
  }
  divideScalar(t) {
    return this.multiplyScalar(1 / t);
  }
  min(t) {
    return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this;
  }
  max(t) {
    return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this;
  }
  clamp(t, e) {
    return this.x = Math.max(t.x, Math.min(e.x, this.x)), this.y = Math.max(t.y, Math.min(e.y, this.y)), this.z = Math.max(t.z, Math.min(e.z, this.z)), this;
  }
  clampScalar(t, e) {
    return this.x = Math.max(t, Math.min(e, this.x)), this.y = Math.max(t, Math.min(e, this.y)), this.z = Math.max(t, Math.min(e, this.z)), this;
  }
  clampLength(t, e) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(t, Math.min(e, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y + this.z * t.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(t) {
    return this.normalize().multiplyScalar(t);
  }
  lerp(t, e) {
    return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this;
  }
  lerpVectors(t, e, n) {
    return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this;
  }
  cross(t) {
    return this.crossVectors(this, t);
  }
  crossVectors(t, e) {
    const n = t.x, s = t.y, r = t.z, o = e.x, a = e.y, c = e.z;
    return this.x = s * c - r * a, this.y = r * o - n * c, this.z = n * a - s * o, this;
  }
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const n = t.dot(this) / e;
    return this.copy(t).multiplyScalar(n);
  }
  projectOnPlane(t) {
    return To.copy(this).projectOnVector(t), this.sub(To);
  }
  reflect(t) {
    return this.sub(To.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(Ee(n, -1, 1));
  }
  distanceTo(t) {
    return Math.sqrt(this.distanceToSquared(t));
  }
  distanceToSquared(t) {
    const e = this.x - t.x, n = this.y - t.y, s = this.z - t.z;
    return e * e + n * n + s * s;
  }
  manhattanDistanceTo(t) {
    return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z);
  }
  setFromSpherical(t) {
    return this.setFromSphericalCoords(t.radius, t.phi, t.theta);
  }
  setFromSphericalCoords(t, e, n) {
    const s = Math.sin(e) * t;
    return this.x = s * Math.sin(n), this.y = Math.cos(e) * t, this.z = s * Math.cos(n), this;
  }
  setFromCylindrical(t) {
    return this.setFromCylindricalCoords(t.radius, t.theta, t.y);
  }
  setFromCylindricalCoords(t, e, n) {
    return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this;
  }
  setFromMatrixPosition(t) {
    const e = t.elements;
    return this.x = e[12], this.y = e[13], this.z = e[14], this;
  }
  setFromMatrixScale(t) {
    const e = this.setFromMatrixColumn(t, 0).length(), n = this.setFromMatrixColumn(t, 1).length(), s = this.setFromMatrixColumn(t, 2).length();
    return this.x = e, this.y = n, this.z = s, this;
  }
  setFromMatrixColumn(t, e) {
    return this.fromArray(t.elements, e * 4);
  }
  setFromMatrix3Column(t, e) {
    return this.fromArray(t.elements, e * 3);
  }
  setFromEuler(t) {
    return this.x = t._x, this.y = t._y, this.z = t._z, this;
  }
  setFromColor(t) {
    return this.x = t.r, this.y = t.g, this.z = t.b, this;
  }
  equals(t) {
    return t.x === this.x && t.y === this.y && t.z === this.z;
  }
  fromArray(t, e = 0) {
    return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t;
  }
  fromBufferAttribute(t, e) {
    return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const t = Math.random() * Math.PI * 2, e = Math.random() * 2 - 1, n = Math.sqrt(1 - e * e);
    return this.x = n * Math.cos(t), this.y = e, this.z = n * Math.sin(t), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const To = /* @__PURE__ */ new w(), yl = /* @__PURE__ */ new xn();
class je {
  constructor(t = new w(1 / 0, 1 / 0, 1 / 0), e = new w(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = t, this.max = e;
  }
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3)
      this.expandByPoint(cn.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++)
      this.expandByPoint(cn.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++)
      this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = cn.copy(e).multiplyScalar(0.5);
    return this.min.copy(t).sub(n), this.max.copy(t).add(n), this;
  }
  setFromObject(t, e = !1) {
    return this.makeEmpty(), this.expandByObject(t, e);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.min.copy(t.min), this.max.copy(t.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(t) {
    return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min);
  }
  expandByPoint(t) {
    return this.min.min(t), this.max.max(t), this;
  }
  expandByVector(t) {
    return this.min.sub(t), this.max.add(t), this;
  }
  expandByScalar(t) {
    return this.min.addScalar(-t), this.max.addScalar(t), this;
  }
  expandByObject(t, e = !1) {
    t.updateWorldMatrix(!1, !1);
    const n = t.geometry;
    if (n !== void 0) {
      const r = n.getAttribute("position");
      if (e === !0 && r !== void 0 && t.isInstancedMesh !== !0)
        for (let o = 0, a = r.count; o < a; o++)
          t.isMesh === !0 ? t.getVertexPosition(o, cn) : cn.fromBufferAttribute(r, o), cn.applyMatrix4(t.matrixWorld), this.expandByPoint(cn);
      else
        t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), rr.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), rr.copy(n.boundingBox)), rr.applyMatrix4(t.matrixWorld), this.union(rr);
    }
    const s = t.children;
    for (let r = 0, o = s.length; r < o; r++)
      this.expandByObject(s[r], e);
    return this;
  }
  containsPoint(t) {
    return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z;
  }
  containsBox(t) {
    return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z;
  }
  getParameter(t, e) {
    return e.set(
      (t.x - this.min.x) / (this.max.x - this.min.x),
      (t.y - this.min.y) / (this.max.y - this.min.y),
      (t.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(t) {
    return t.max.x >= this.min.x && t.min.x <= this.max.x && t.max.y >= this.min.y && t.min.y <= this.max.y && t.max.z >= this.min.z && t.min.z <= this.max.z;
  }
  intersectsSphere(t) {
    return this.clampPoint(t.center, cn), cn.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let e, n;
    return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
  }
  intersectsTriangle(t) {
    if (this.isEmpty())
      return !1;
    this.getCenter(_s), or.subVectors(this.max, _s), Ei.subVectors(t.a, _s), bi.subVectors(t.b, _s), Ti.subVectors(t.c, _s), kn.subVectors(bi, Ei), Hn.subVectors(Ti, bi), si.subVectors(Ei, Ti);
    let e = [
      0,
      -kn.z,
      kn.y,
      0,
      -Hn.z,
      Hn.y,
      0,
      -si.z,
      si.y,
      kn.z,
      0,
      -kn.x,
      Hn.z,
      0,
      -Hn.x,
      si.z,
      0,
      -si.x,
      -kn.y,
      kn.x,
      0,
      -Hn.y,
      Hn.x,
      0,
      -si.y,
      si.x,
      0
    ];
    return !Ao(e, Ei, bi, Ti, or) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Ao(e, Ei, bi, Ti, or)) ? !1 : (ar.crossVectors(kn, Hn), e = [ar.x, ar.y, ar.z], Ao(e, Ei, bi, Ti, or));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, cn).distanceTo(t);
  }
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(cn).length() * 0.5), t;
  }
  intersect(t) {
    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(t) {
    return this.min.min(t.min), this.max.max(t.max), this;
  }
  applyMatrix4(t) {
    return this.isEmpty() ? this : (An[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), An[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), An[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), An[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), An[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), An[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), An[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), An[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(An), this);
  }
  translate(t) {
    return this.min.add(t), this.max.add(t), this;
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
}
const An = [
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w()
], cn = /* @__PURE__ */ new w(), rr = /* @__PURE__ */ new je(), Ei = /* @__PURE__ */ new w(), bi = /* @__PURE__ */ new w(), Ti = /* @__PURE__ */ new w(), kn = /* @__PURE__ */ new w(), Hn = /* @__PURE__ */ new w(), si = /* @__PURE__ */ new w(), _s = /* @__PURE__ */ new w(), or = /* @__PURE__ */ new w(), ar = /* @__PURE__ */ new w(), ri = /* @__PURE__ */ new w();
function Ao(i, t, e, n, s) {
  for (let r = 0, o = i.length - 3; r <= o; r += 3) {
    ri.fromArray(i, r);
    const a = s.x * Math.abs(ri.x) + s.y * Math.abs(ri.y) + s.z * Math.abs(ri.z), c = t.dot(ri), l = e.dot(ri), h = n.dot(ri);
    if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > a)
      return !1;
  }
  return !0;
}
const rp = /* @__PURE__ */ new je(), vs = /* @__PURE__ */ new w(), wo = /* @__PURE__ */ new w();
class Mn {
  constructor(t = new w(), e = -1) {
    this.isSphere = !0, this.center = t, this.radius = e;
  }
  set(t, e) {
    return this.center.copy(t), this.radius = e, this;
  }
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : rp.setFromPoints(t).getCenter(n);
    let s = 0;
    for (let r = 0, o = t.length; r < o; r++)
      s = Math.max(s, n.distanceToSquared(t[r]));
    return this.radius = Math.sqrt(s), this;
  }
  copy(t) {
    return this.center.copy(t.center), this.radius = t.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(t) {
    return t.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(t) {
    return t.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(t) {
    const e = this.radius + t.radius;
    return t.center.distanceToSquared(this.center) <= e * e;
  }
  intersectsBox(t) {
    return t.intersectsSphere(this);
  }
  intersectsPlane(t) {
    return Math.abs(t.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(t, e) {
    const n = this.center.distanceToSquared(t);
    return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e;
  }
  getBoundingBox(t) {
    return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t);
  }
  applyMatrix4(t) {
    return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this;
  }
  translate(t) {
    return this.center.add(t), this;
  }
  expandByPoint(t) {
    if (this.isEmpty())
      return this.center.copy(t), this.radius = 0, this;
    vs.subVectors(t, this.center);
    const e = vs.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e), s = (n - this.radius) * 0.5;
      this.center.addScaledVector(vs, s / n), this.radius += s;
    }
    return this;
  }
  union(t) {
    return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === !0 ? this.radius = Math.max(this.radius, t.radius) : (wo.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(vs.copy(t.center).add(wo)), this.expandByPoint(vs.copy(t.center).sub(wo))), this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const wn = /* @__PURE__ */ new w(), Ro = /* @__PURE__ */ new w(), cr = /* @__PURE__ */ new w(), Vn = /* @__PURE__ */ new w(), Co = /* @__PURE__ */ new w(), lr = /* @__PURE__ */ new w(), Po = /* @__PURE__ */ new w();
class ls {
  constructor(t = new w(), e = new w(0, 0, -1)) {
    this.origin = t, this.direction = e;
  }
  set(t, e) {
    return this.origin.copy(t), this.direction.copy(e), this;
  }
  copy(t) {
    return this.origin.copy(t.origin), this.direction.copy(t.direction), this;
  }
  at(t, e) {
    return e.copy(this.origin).addScaledVector(this.direction, t);
  }
  lookAt(t) {
    return this.direction.copy(t).sub(this.origin).normalize(), this;
  }
  recast(t) {
    return this.origin.copy(this.at(t, wn)), this;
  }
  closestPointToPoint(t, e) {
    e.subVectors(t, this.origin);
    const n = e.dot(this.direction);
    return n < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(t) {
    return Math.sqrt(this.distanceSqToPoint(t));
  }
  distanceSqToPoint(t) {
    const e = wn.subVectors(t, this.origin).dot(this.direction);
    return e < 0 ? this.origin.distanceToSquared(t) : (wn.copy(this.origin).addScaledVector(this.direction, e), wn.distanceToSquared(t));
  }
  distanceSqToSegment(t, e, n, s) {
    Ro.copy(t).add(e).multiplyScalar(0.5), cr.copy(e).sub(t).normalize(), Vn.copy(this.origin).sub(Ro);
    const r = t.distanceTo(e) * 0.5, o = -this.direction.dot(cr), a = Vn.dot(this.direction), c = -Vn.dot(cr), l = Vn.lengthSq(), h = Math.abs(1 - o * o);
    let u, d, f, g;
    if (h > 0)
      if (u = o * c - a, d = o * a - c, g = r * h, u >= 0)
        if (d >= -g)
          if (d <= g) {
            const _ = 1 / h;
            u *= _, d *= _, f = u * (u + o * d + 2 * a) + d * (o * u + d + 2 * c) + l;
          } else
            d = r, u = Math.max(0, -(o * d + a)), f = -u * u + d * (d + 2 * c) + l;
        else
          d = -r, u = Math.max(0, -(o * d + a)), f = -u * u + d * (d + 2 * c) + l;
      else
        d <= -g ? (u = Math.max(0, -(-o * r + a)), d = u > 0 ? -r : Math.min(Math.max(-r, -c), r), f = -u * u + d * (d + 2 * c) + l) : d <= g ? (u = 0, d = Math.min(Math.max(-r, -c), r), f = d * (d + 2 * c) + l) : (u = Math.max(0, -(o * r + a)), d = u > 0 ? r : Math.min(Math.max(-r, -c), r), f = -u * u + d * (d + 2 * c) + l);
    else
      d = o > 0 ? -r : r, u = Math.max(0, -(o * d + a)), f = -u * u + d * (d + 2 * c) + l;
    return n && n.copy(this.origin).addScaledVector(this.direction, u), s && s.copy(Ro).addScaledVector(cr, d), f;
  }
  intersectSphere(t, e) {
    wn.subVectors(t.center, this.origin);
    const n = wn.dot(this.direction), s = wn.dot(wn) - n * n, r = t.radius * t.radius;
    if (s > r) return null;
    const o = Math.sqrt(r - s), a = n - o, c = n + o;
    return c < 0 ? null : a < 0 ? this.at(c, e) : this.at(a, e);
  }
  intersectsSphere(t) {
    return this.distanceSqToPoint(t.center) <= t.radius * t.radius;
  }
  distanceToPlane(t) {
    const e = t.normal.dot(this.direction);
    if (e === 0)
      return t.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(t.normal) + t.constant) / e;
    return n >= 0 ? n : null;
  }
  intersectPlane(t, e) {
    const n = this.distanceToPlane(t);
    return n === null ? null : this.at(n, e);
  }
  intersectsPlane(t) {
    const e = t.distanceToPoint(this.origin);
    return e === 0 || t.normal.dot(this.direction) * e < 0;
  }
  intersectBox(t, e) {
    let n, s, r, o, a, c;
    const l = 1 / this.direction.x, h = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
    return l >= 0 ? (n = (t.min.x - d.x) * l, s = (t.max.x - d.x) * l) : (n = (t.max.x - d.x) * l, s = (t.min.x - d.x) * l), h >= 0 ? (r = (t.min.y - d.y) * h, o = (t.max.y - d.y) * h) : (r = (t.max.y - d.y) * h, o = (t.min.y - d.y) * h), n > o || r > s || ((r > n || isNaN(n)) && (n = r), (o < s || isNaN(s)) && (s = o), u >= 0 ? (a = (t.min.z - d.z) * u, c = (t.max.z - d.z) * u) : (a = (t.max.z - d.z) * u, c = (t.min.z - d.z) * u), n > c || a > s) || ((a > n || n !== n) && (n = a), (c < s || s !== s) && (s = c), s < 0) ? null : this.at(n >= 0 ? n : s, e);
  }
  intersectsBox(t) {
    return this.intersectBox(t, wn) !== null;
  }
  intersectTriangle(t, e, n, s, r) {
    Co.subVectors(e, t), lr.subVectors(n, t), Po.crossVectors(Co, lr);
    let o = this.direction.dot(Po), a;
    if (o > 0) {
      if (s) return null;
      a = 1;
    } else if (o < 0)
      a = -1, o = -o;
    else
      return null;
    Vn.subVectors(this.origin, t);
    const c = a * this.direction.dot(lr.crossVectors(Vn, lr));
    if (c < 0)
      return null;
    const l = a * this.direction.dot(Co.cross(Vn));
    if (l < 0 || c + l > o)
      return null;
    const h = -a * Vn.dot(Po);
    return h < 0 ? null : this.at(h / o, r);
  }
  applyMatrix4(t) {
    return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this;
  }
  equals(t) {
    return t.origin.equals(this.origin) && t.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Dt {
  constructor(t, e, n, s, r, o, a, c, l, h, u, d, f, g, _, p) {
    Dt.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], t !== void 0 && this.set(t, e, n, s, r, o, a, c, l, h, u, d, f, g, _, p);
  }
  set(t, e, n, s, r, o, a, c, l, h, u, d, f, g, _, p) {
    const m = this.elements;
    return m[0] = t, m[4] = e, m[8] = n, m[12] = s, m[1] = r, m[5] = o, m[9] = a, m[13] = c, m[2] = l, m[6] = h, m[10] = u, m[14] = d, m[3] = f, m[7] = g, m[11] = _, m[15] = p, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new Dt().fromArray(this.elements);
  }
  copy(t) {
    const e = this.elements, n = t.elements;
    return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this;
  }
  copyPosition(t) {
    const e = this.elements, n = t.elements;
    return e[12] = n[12], e[13] = n[13], e[14] = n[14], this;
  }
  setFromMatrix3(t) {
    const e = t.elements;
    return this.set(
      e[0],
      e[3],
      e[6],
      0,
      e[1],
      e[4],
      e[7],
      0,
      e[2],
      e[5],
      e[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(t, e, n) {
    return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(t, e, n) {
    return this.set(
      t.x,
      e.x,
      n.x,
      0,
      t.y,
      e.y,
      n.y,
      0,
      t.z,
      e.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(t) {
    const e = this.elements, n = t.elements, s = 1 / Ai.setFromMatrixColumn(t, 0).length(), r = 1 / Ai.setFromMatrixColumn(t, 1).length(), o = 1 / Ai.setFromMatrixColumn(t, 2).length();
    return e[0] = n[0] * s, e[1] = n[1] * s, e[2] = n[2] * s, e[3] = 0, e[4] = n[4] * r, e[5] = n[5] * r, e[6] = n[6] * r, e[7] = 0, e[8] = n[8] * o, e[9] = n[9] * o, e[10] = n[10] * o, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const e = this.elements, n = t.x, s = t.y, r = t.z, o = Math.cos(n), a = Math.sin(n), c = Math.cos(s), l = Math.sin(s), h = Math.cos(r), u = Math.sin(r);
    if (t.order === "XYZ") {
      const d = o * h, f = o * u, g = a * h, _ = a * u;
      e[0] = c * h, e[4] = -c * u, e[8] = l, e[1] = f + g * l, e[5] = d - _ * l, e[9] = -a * c, e[2] = _ - d * l, e[6] = g + f * l, e[10] = o * c;
    } else if (t.order === "YXZ") {
      const d = c * h, f = c * u, g = l * h, _ = l * u;
      e[0] = d + _ * a, e[4] = g * a - f, e[8] = o * l, e[1] = o * u, e[5] = o * h, e[9] = -a, e[2] = f * a - g, e[6] = _ + d * a, e[10] = o * c;
    } else if (t.order === "ZXY") {
      const d = c * h, f = c * u, g = l * h, _ = l * u;
      e[0] = d - _ * a, e[4] = -o * u, e[8] = g + f * a, e[1] = f + g * a, e[5] = o * h, e[9] = _ - d * a, e[2] = -o * l, e[6] = a, e[10] = o * c;
    } else if (t.order === "ZYX") {
      const d = o * h, f = o * u, g = a * h, _ = a * u;
      e[0] = c * h, e[4] = g * l - f, e[8] = d * l + _, e[1] = c * u, e[5] = _ * l + d, e[9] = f * l - g, e[2] = -l, e[6] = a * c, e[10] = o * c;
    } else if (t.order === "YZX") {
      const d = o * c, f = o * l, g = a * c, _ = a * l;
      e[0] = c * h, e[4] = _ - d * u, e[8] = g * u + f, e[1] = u, e[5] = o * h, e[9] = -a * h, e[2] = -l * h, e[6] = f * u + g, e[10] = d - _ * u;
    } else if (t.order === "XZY") {
      const d = o * c, f = o * l, g = a * c, _ = a * l;
      e[0] = c * h, e[4] = -u, e[8] = l * h, e[1] = d * u + _, e[5] = o * h, e[9] = f * u - g, e[2] = g * u - f, e[6] = a * h, e[10] = _ * u + d;
    }
    return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(op, t, ap);
  }
  lookAt(t, e, n) {
    const s = this.elements;
    return Ze.subVectors(t, e), Ze.lengthSq() === 0 && (Ze.z = 1), Ze.normalize(), Gn.crossVectors(n, Ze), Gn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Ze.x += 1e-4 : Ze.z += 1e-4, Ze.normalize(), Gn.crossVectors(n, Ze)), Gn.normalize(), hr.crossVectors(Ze, Gn), s[0] = Gn.x, s[4] = hr.x, s[8] = Ze.x, s[1] = Gn.y, s[5] = hr.y, s[9] = Ze.y, s[2] = Gn.z, s[6] = hr.z, s[10] = Ze.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, s = e.elements, r = this.elements, o = n[0], a = n[4], c = n[8], l = n[12], h = n[1], u = n[5], d = n[9], f = n[13], g = n[2], _ = n[6], p = n[10], m = n[14], S = n[3], x = n[7], M = n[11], P = n[15], R = s[0], A = s[4], L = s[8], G = s[12], v = s[1], b = s[5], B = s[9], z = s[13], H = s[2], K = s[6], k = s[10], nt = s[14], W = s[3], ut = s[7], dt = s[11], Mt = s[15];
    return r[0] = o * R + a * v + c * H + l * W, r[4] = o * A + a * b + c * K + l * ut, r[8] = o * L + a * B + c * k + l * dt, r[12] = o * G + a * z + c * nt + l * Mt, r[1] = h * R + u * v + d * H + f * W, r[5] = h * A + u * b + d * K + f * ut, r[9] = h * L + u * B + d * k + f * dt, r[13] = h * G + u * z + d * nt + f * Mt, r[2] = g * R + _ * v + p * H + m * W, r[6] = g * A + _ * b + p * K + m * ut, r[10] = g * L + _ * B + p * k + m * dt, r[14] = g * G + _ * z + p * nt + m * Mt, r[3] = S * R + x * v + M * H + P * W, r[7] = S * A + x * b + M * K + P * ut, r[11] = S * L + x * B + M * k + P * dt, r[15] = S * G + x * z + M * nt + P * Mt, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[4], s = t[8], r = t[12], o = t[1], a = t[5], c = t[9], l = t[13], h = t[2], u = t[6], d = t[10], f = t[14], g = t[3], _ = t[7], p = t[11], m = t[15];
    return g * (+r * c * u - s * l * u - r * a * d + n * l * d + s * a * f - n * c * f) + _ * (+e * c * f - e * l * d + r * o * d - s * o * f + s * l * h - r * c * h) + p * (+e * l * u - e * a * f - r * o * u + n * o * f + r * a * h - n * l * h) + m * (-s * a * h - e * c * u + e * a * d + s * o * u - n * o * d + n * c * h);
  }
  transpose() {
    const t = this.elements;
    let e;
    return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
  }
  setPosition(t, e, n) {
    const s = this.elements;
    return t.isVector3 ? (s[12] = t.x, s[13] = t.y, s[14] = t.z) : (s[12] = t, s[13] = e, s[14] = n), this;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], o = t[4], a = t[5], c = t[6], l = t[7], h = t[8], u = t[9], d = t[10], f = t[11], g = t[12], _ = t[13], p = t[14], m = t[15], S = u * p * l - _ * d * l + _ * c * f - a * p * f - u * c * m + a * d * m, x = g * d * l - h * p * l - g * c * f + o * p * f + h * c * m - o * d * m, M = h * _ * l - g * u * l + g * a * f - o * _ * f - h * a * m + o * u * m, P = g * u * c - h * _ * c - g * a * d + o * _ * d + h * a * p - o * u * p, R = e * S + n * x + s * M + r * P;
    if (R === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const A = 1 / R;
    return t[0] = S * A, t[1] = (_ * d * r - u * p * r - _ * s * f + n * p * f + u * s * m - n * d * m) * A, t[2] = (a * p * r - _ * c * r + _ * s * l - n * p * l - a * s * m + n * c * m) * A, t[3] = (u * c * r - a * d * r - u * s * l + n * d * l + a * s * f - n * c * f) * A, t[4] = x * A, t[5] = (h * p * r - g * d * r + g * s * f - e * p * f - h * s * m + e * d * m) * A, t[6] = (g * c * r - o * p * r - g * s * l + e * p * l + o * s * m - e * c * m) * A, t[7] = (o * d * r - h * c * r + h * s * l - e * d * l - o * s * f + e * c * f) * A, t[8] = M * A, t[9] = (g * u * r - h * _ * r - g * n * f + e * _ * f + h * n * m - e * u * m) * A, t[10] = (o * _ * r - g * a * r + g * n * l - e * _ * l - o * n * m + e * a * m) * A, t[11] = (h * a * r - o * u * r - h * n * l + e * u * l + o * n * f - e * a * f) * A, t[12] = P * A, t[13] = (h * _ * s - g * u * s + g * n * d - e * _ * d - h * n * p + e * u * p) * A, t[14] = (g * a * s - o * _ * s - g * n * c + e * _ * c + o * n * p - e * a * p) * A, t[15] = (o * u * s - h * a * s + h * n * c - e * u * c - o * n * d + e * a * d) * A, this;
  }
  scale(t) {
    const e = this.elements, n = t.x, s = t.y, r = t.z;
    return e[0] *= n, e[4] *= s, e[8] *= r, e[1] *= n, e[5] *= s, e[9] *= r, e[2] *= n, e[6] *= s, e[10] *= r, e[3] *= n, e[7] *= s, e[11] *= r, this;
  }
  getMaxScaleOnAxis() {
    const t = this.elements, e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2], n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6], s = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
    return Math.sqrt(Math.max(e, n, s));
  }
  makeTranslation(t, e, n) {
    return t.isVector3 ? this.set(
      1,
      0,
      0,
      t.x,
      0,
      1,
      0,
      t.y,
      0,
      0,
      1,
      t.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      t,
      0,
      1,
      0,
      e,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      e,
      -n,
      0,
      0,
      n,
      e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      e,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(t) {
    const e = Math.cos(t), n = Math.sin(t);
    return this.set(
      e,
      -n,
      0,
      0,
      n,
      e,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(t, e) {
    const n = Math.cos(e), s = Math.sin(e), r = 1 - n, o = t.x, a = t.y, c = t.z, l = r * o, h = r * a;
    return this.set(
      l * o + n,
      l * a - s * c,
      l * c + s * a,
      0,
      l * a + s * c,
      h * a + n,
      h * c - s * o,
      0,
      l * c - s * a,
      h * c + s * o,
      r * c * c + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(t, e, n) {
    return this.set(
      t,
      0,
      0,
      0,
      0,
      e,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(t, e, n, s, r, o) {
    return this.set(
      1,
      n,
      r,
      0,
      t,
      1,
      o,
      0,
      e,
      s,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(t, e, n) {
    const s = this.elements, r = e._x, o = e._y, a = e._z, c = e._w, l = r + r, h = o + o, u = a + a, d = r * l, f = r * h, g = r * u, _ = o * h, p = o * u, m = a * u, S = c * l, x = c * h, M = c * u, P = n.x, R = n.y, A = n.z;
    return s[0] = (1 - (_ + m)) * P, s[1] = (f + M) * P, s[2] = (g - x) * P, s[3] = 0, s[4] = (f - M) * R, s[5] = (1 - (d + m)) * R, s[6] = (p + S) * R, s[7] = 0, s[8] = (g + x) * A, s[9] = (p - S) * A, s[10] = (1 - (d + _)) * A, s[11] = 0, s[12] = t.x, s[13] = t.y, s[14] = t.z, s[15] = 1, this;
  }
  decompose(t, e, n) {
    const s = this.elements;
    let r = Ai.set(s[0], s[1], s[2]).length();
    const o = Ai.set(s[4], s[5], s[6]).length(), a = Ai.set(s[8], s[9], s[10]).length();
    this.determinant() < 0 && (r = -r), t.x = s[12], t.y = s[13], t.z = s[14], ln.copy(this);
    const l = 1 / r, h = 1 / o, u = 1 / a;
    return ln.elements[0] *= l, ln.elements[1] *= l, ln.elements[2] *= l, ln.elements[4] *= h, ln.elements[5] *= h, ln.elements[6] *= h, ln.elements[8] *= u, ln.elements[9] *= u, ln.elements[10] *= u, e.setFromRotationMatrix(ln), n.x = r, n.y = o, n.z = a, this;
  }
  makePerspective(t, e, n, s, r, o, a = On) {
    const c = this.elements, l = 2 * r / (e - t), h = 2 * r / (n - s), u = (e + t) / (e - t), d = (n + s) / (n - s);
    let f, g;
    if (a === On)
      f = -(o + r) / (o - r), g = -2 * o * r / (o - r);
    else if (a === no)
      f = -o / (o - r), g = -o * r / (o - r);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return c[0] = l, c[4] = 0, c[8] = u, c[12] = 0, c[1] = 0, c[5] = h, c[9] = d, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = f, c[14] = g, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
  }
  makeOrthographic(t, e, n, s, r, o, a = On) {
    const c = this.elements, l = 1 / (e - t), h = 1 / (n - s), u = 1 / (o - r), d = (e + t) * l, f = (n + s) * h;
    let g, _;
    if (a === On)
      g = (o + r) * u, _ = -2 * u;
    else if (a === no)
      g = r * u, _ = -1 * u;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return c[0] = 2 * l, c[4] = 0, c[8] = 0, c[12] = -d, c[1] = 0, c[5] = 2 * h, c[9] = 0, c[13] = -f, c[2] = 0, c[6] = 0, c[10] = _, c[14] = -g, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
  }
  equals(t) {
    const e = this.elements, n = t.elements;
    for (let s = 0; s < 16; s++)
      if (e[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(t, e = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = t[n + e];
    return this;
  }
  toArray(t = [], e = 0) {
    const n = this.elements;
    return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t;
  }
}
const Ai = /* @__PURE__ */ new w(), ln = /* @__PURE__ */ new Dt(), op = /* @__PURE__ */ new w(0, 0, 0), ap = /* @__PURE__ */ new w(1, 1, 1), Gn = /* @__PURE__ */ new w(), hr = /* @__PURE__ */ new w(), Ze = /* @__PURE__ */ new w(), Ml = /* @__PURE__ */ new Dt(), Sl = /* @__PURE__ */ new xn();
class yn {
  constructor(t = 0, e = 0, n = 0, s = yn.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = t, this._y = e, this._z = n, this._order = s;
  }
  get x() {
    return this._x;
  }
  set x(t) {
    this._x = t, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(t) {
    this._y = t, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(t) {
    this._z = t, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(t) {
    this._order = t, this._onChangeCallback();
  }
  set(t, e, n, s = this._order) {
    return this._x = t, this._y = e, this._z = n, this._order = s, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(t) {
    return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(t, e = this._order, n = !0) {
    const s = t.elements, r = s[0], o = s[4], a = s[8], c = s[1], l = s[5], h = s[9], u = s[2], d = s[6], f = s[10];
    switch (e) {
      case "XYZ":
        this._y = Math.asin(Ee(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-h, f), this._z = Math.atan2(-o, r)) : (this._x = Math.atan2(d, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Ee(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(a, f), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-u, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Ee(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-o, l)) : (this._y = 0, this._z = Math.atan2(c, r));
        break;
      case "ZYX":
        this._y = Math.asin(-Ee(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(c, r)) : (this._x = 0, this._z = Math.atan2(-o, l));
        break;
      case "YZX":
        this._z = Math.asin(Ee(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-u, r)) : (this._x = 0, this._y = Math.atan2(a, f));
        break;
      case "XZY":
        this._z = Math.asin(-Ee(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(d, l), this._y = Math.atan2(a, r)) : (this._x = Math.atan2(-h, f), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return this._order = e, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, e, n) {
    return Ml.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Ml, e, n);
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return Sl.setFromEuler(this), this.setFromQuaternion(Sl, t);
  }
  equals(t) {
    return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order;
  }
  fromArray(t) {
    return this._x = t[0], this._y = t[1], this._z = t[2], t[3] !== void 0 && (this._order = t[3]), this._onChangeCallback(), this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t;
  }
  _onChange(t) {
    return this._onChangeCallback = t, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
yn.DEFAULT_ORDER = "XYZ";
class Sc {
  constructor() {
    this.mask = 1;
  }
  set(t) {
    this.mask = (1 << t | 0) >>> 0;
  }
  enable(t) {
    this.mask |= 1 << t | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(t) {
    this.mask ^= 1 << t | 0;
  }
  disable(t) {
    this.mask &= ~(1 << t | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(t) {
    return (this.mask & t.mask) !== 0;
  }
  isEnabled(t) {
    return (this.mask & (1 << t | 0)) !== 0;
  }
}
let cp = 0;
const El = /* @__PURE__ */ new w(), wi = /* @__PURE__ */ new xn(), Rn = /* @__PURE__ */ new Dt(), ur = /* @__PURE__ */ new w(), xs = /* @__PURE__ */ new w(), lp = /* @__PURE__ */ new w(), hp = /* @__PURE__ */ new xn(), bl = /* @__PURE__ */ new w(1, 0, 0), Tl = /* @__PURE__ */ new w(0, 1, 0), Al = /* @__PURE__ */ new w(0, 0, 1), wl = { type: "added" }, up = { type: "removed" }, Ri = { type: "childadded", child: null }, Lo = { type: "childremoved", child: null };
class de extends xi {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: cp++ }), this.uuid = on(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = de.DEFAULT_UP.clone();
    const t = new w(), e = new yn(), n = new xn(), s = new w(1, 1, 1);
    function r() {
      n.setFromEuler(e, !1);
    }
    function o() {
      e.setFromQuaternion(n, void 0, !1);
    }
    e._onChange(r), n._onChange(o), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: s
      },
      modelViewMatrix: {
        value: new Dt()
      },
      normalMatrix: {
        value: new Ft()
      }
    }), this.matrix = new Dt(), this.matrixWorld = new Dt(), this.matrixAutoUpdate = de.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Sc(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(t) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(t) {
    return this.quaternion.premultiply(t), this;
  }
  setRotationFromAxisAngle(t, e) {
    this.quaternion.setFromAxisAngle(t, e);
  }
  setRotationFromEuler(t) {
    this.quaternion.setFromEuler(t, !0);
  }
  setRotationFromMatrix(t) {
    this.quaternion.setFromRotationMatrix(t);
  }
  setRotationFromQuaternion(t) {
    this.quaternion.copy(t);
  }
  rotateOnAxis(t, e) {
    return wi.setFromAxisAngle(t, e), this.quaternion.multiply(wi), this;
  }
  rotateOnWorldAxis(t, e) {
    return wi.setFromAxisAngle(t, e), this.quaternion.premultiply(wi), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(bl, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(Tl, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(Al, t);
  }
  translateOnAxis(t, e) {
    return El.copy(t).applyQuaternion(this.quaternion), this.position.add(El.multiplyScalar(e)), this;
  }
  translateX(t) {
    return this.translateOnAxis(bl, t);
  }
  translateY(t) {
    return this.translateOnAxis(Tl, t);
  }
  translateZ(t) {
    return this.translateOnAxis(Al, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(Rn.copy(this.matrixWorld).invert());
  }
  lookAt(t, e, n) {
    t.isVector3 ? ur.copy(t) : ur.set(t, e, n);
    const s = this.parent;
    this.updateWorldMatrix(!0, !1), xs.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Rn.lookAt(xs, ur, this.up) : Rn.lookAt(ur, xs, this.up), this.quaternion.setFromRotationMatrix(Rn), s && (Rn.extractRotation(s.matrixWorld), wi.setFromRotationMatrix(Rn), this.quaternion.premultiply(wi.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++)
        this.add(arguments[e]);
      return this;
    }
    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(wl), Ri.child = t, this.dispatchEvent(Ri), Ri.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(up), Lo.child = t, this.dispatchEvent(Lo), Lo.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), Rn.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), Rn.multiply(t.parent.matrixWorld)), t.applyMatrix4(Rn), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(wl), Ri.child = t, this.dispatchEvent(Ri), Ri.child = null, this;
  }
  getObjectById(t) {
    return this.getObjectByProperty("id", t);
  }
  getObjectByName(t) {
    return this.getObjectByProperty("name", t);
  }
  getObjectByProperty(t, e) {
    if (this[t] === e) return this;
    for (let n = 0, s = this.children.length; n < s; n++) {
      const o = this.children[n].getObjectByProperty(t, e);
      if (o !== void 0)
        return o;
    }
  }
  getObjectsByProperty(t, e, n = []) {
    this[t] === e && n.push(this);
    const s = this.children;
    for (let r = 0, o = s.length; r < o; r++)
      s[r].getObjectsByProperty(t, e, n);
    return n;
  }
  getWorldPosition(t) {
    return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(xs, t, lp), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(xs, hp, t), t;
  }
  getWorldDirection(t) {
    this.updateWorldMatrix(!0, !1);
    const e = this.matrixWorld.elements;
    return t.set(e[8], e[9], e[10]).normalize();
  }
  raycast() {
  }
  traverse(t) {
    t(this);
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++)
      e[n].traverse(t);
  }
  traverseVisible(t) {
    if (this.visible === !1) return;
    t(this);
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++)
      e[n].traverseVisible(t);
  }
  traverseAncestors(t) {
    const e = this.parent;
    e !== null && (t(e), e.traverseAncestors(t));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(t) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, t = !0);
    const e = this.children;
    for (let n = 0, s = e.length; n < s; n++)
      e[n].updateMatrixWorld(t);
  }
  updateWorldMatrix(t, e) {
    const n = this.parent;
    if (t === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), e === !0) {
      const s = this.children;
      for (let r = 0, o = s.length; r < o; r++)
        s[r].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string", n = {};
    e && (t = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const s = {};
    s.uuid = this.uuid, s.type = this.type, this.name !== "" && (s.name = this.name), this.castShadow === !0 && (s.castShadow = !0), this.receiveShadow === !0 && (s.receiveShadow = !0), this.visible === !1 && (s.visible = !1), this.frustumCulled === !1 && (s.frustumCulled = !1), this.renderOrder !== 0 && (s.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (s.userData = this.userData), s.layers = this.layers.mask, s.matrix = this.matrix.toArray(), s.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (s.matrixAutoUpdate = !1), this.isInstancedMesh && (s.type = "InstancedMesh", s.count = this.count, s.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (s.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (s.type = "BatchedMesh", s.perObjectFrustumCulled = this.perObjectFrustumCulled, s.sortObjects = this.sortObjects, s.drawRanges = this._drawRanges, s.reservedRanges = this._reservedRanges, s.visibility = this._visibility, s.active = this._active, s.bounds = this._bounds.map((a) => ({
      boxInitialized: a.boxInitialized,
      boxMin: a.box.min.toArray(),
      boxMax: a.box.max.toArray(),
      sphereInitialized: a.sphereInitialized,
      sphereRadius: a.sphere.radius,
      sphereCenter: a.sphere.center.toArray()
    })), s.maxInstanceCount = this._maxInstanceCount, s.maxVertexCount = this._maxVertexCount, s.maxIndexCount = this._maxIndexCount, s.geometryInitialized = this._geometryInitialized, s.geometryCount = this._geometryCount, s.matricesTexture = this._matricesTexture.toJSON(t), this._colorsTexture !== null && (s.colorsTexture = this._colorsTexture.toJSON(t)), this.boundingSphere !== null && (s.boundingSphere = {
      center: s.boundingSphere.center.toArray(),
      radius: s.boundingSphere.radius
    }), this.boundingBox !== null && (s.boundingBox = {
      min: s.boundingBox.min.toArray(),
      max: s.boundingBox.max.toArray()
    }));
    function r(a, c) {
      return a[c.uuid] === void 0 && (a[c.uuid] = c.toJSON(t)), c.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? s.background = this.background.toJSON() : this.background.isTexture && (s.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (s.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      s.geometry = r(t.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const c = a.shapes;
        if (Array.isArray(c))
          for (let l = 0, h = c.length; l < h; l++) {
            const u = c[l];
            r(t.shapes, u);
          }
        else
          r(t.shapes, c);
      }
    }
    if (this.isSkinnedMesh && (s.bindMode = this.bindMode, s.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(t.skeletons, this.skeleton), s.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const a = [];
        for (let c = 0, l = this.material.length; c < l; c++)
          a.push(r(t.materials, this.material[c]));
        s.material = a;
      } else
        s.material = r(t.materials, this.material);
    if (this.children.length > 0) {
      s.children = [];
      for (let a = 0; a < this.children.length; a++)
        s.children.push(this.children[a].toJSON(t).object);
    }
    if (this.animations.length > 0) {
      s.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const c = this.animations[a];
        s.animations.push(r(t.animations, c));
      }
    }
    if (e) {
      const a = o(t.geometries), c = o(t.materials), l = o(t.textures), h = o(t.images), u = o(t.shapes), d = o(t.skeletons), f = o(t.animations), g = o(t.nodes);
      a.length > 0 && (n.geometries = a), c.length > 0 && (n.materials = c), l.length > 0 && (n.textures = l), h.length > 0 && (n.images = h), u.length > 0 && (n.shapes = u), d.length > 0 && (n.skeletons = d), f.length > 0 && (n.animations = f), g.length > 0 && (n.nodes = g);
    }
    return n.object = s, n;
    function o(a) {
      const c = [];
      for (const l in a) {
        const h = a[l];
        delete h.metadata, c.push(h);
      }
      return c;
    }
  }
  clone(t) {
    return new this.constructor().copy(this, t);
  }
  copy(t, e = !0) {
    if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), e === !0)
      for (let n = 0; n < t.children.length; n++) {
        const s = t.children[n];
        this.add(s.clone());
      }
    return this;
  }
}
de.DEFAULT_UP = /* @__PURE__ */ new w(0, 1, 0);
de.DEFAULT_MATRIX_AUTO_UPDATE = !0;
de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const hn = /* @__PURE__ */ new w(), Cn = /* @__PURE__ */ new w(), Io = /* @__PURE__ */ new w(), Pn = /* @__PURE__ */ new w(), Ci = /* @__PURE__ */ new w(), Pi = /* @__PURE__ */ new w(), Rl = /* @__PURE__ */ new w(), Do = /* @__PURE__ */ new w(), No = /* @__PURE__ */ new w(), Uo = /* @__PURE__ */ new w(), Oo = /* @__PURE__ */ new Zt(), Fo = /* @__PURE__ */ new Zt(), Bo = /* @__PURE__ */ new Zt();
class sn {
  constructor(t = new w(), e = new w(), n = new w()) {
    this.a = t, this.b = e, this.c = n;
  }
  static getNormal(t, e, n, s) {
    s.subVectors(n, e), hn.subVectors(t, e), s.cross(hn);
    const r = s.lengthSq();
    return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(t, e, n, s, r) {
    hn.subVectors(s, e), Cn.subVectors(n, e), Io.subVectors(t, e);
    const o = hn.dot(hn), a = hn.dot(Cn), c = hn.dot(Io), l = Cn.dot(Cn), h = Cn.dot(Io), u = o * l - a * a;
    if (u === 0)
      return r.set(0, 0, 0), null;
    const d = 1 / u, f = (l * c - a * h) * d, g = (o * h - a * c) * d;
    return r.set(1 - f - g, g, f);
  }
  static containsPoint(t, e, n, s) {
    return this.getBarycoord(t, e, n, s, Pn) === null ? !1 : Pn.x >= 0 && Pn.y >= 0 && Pn.x + Pn.y <= 1;
  }
  static getInterpolation(t, e, n, s, r, o, a, c) {
    return this.getBarycoord(t, e, n, s, Pn) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(r, Pn.x), c.addScaledVector(o, Pn.y), c.addScaledVector(a, Pn.z), c);
  }
  static getInterpolatedAttribute(t, e, n, s, r, o) {
    return Oo.setScalar(0), Fo.setScalar(0), Bo.setScalar(0), Oo.fromBufferAttribute(t, e), Fo.fromBufferAttribute(t, n), Bo.fromBufferAttribute(t, s), o.setScalar(0), o.addScaledVector(Oo, r.x), o.addScaledVector(Fo, r.y), o.addScaledVector(Bo, r.z), o;
  }
  static isFrontFacing(t, e, n, s) {
    return hn.subVectors(n, e), Cn.subVectors(t, e), hn.cross(Cn).dot(s) < 0;
  }
  set(t, e, n) {
    return this.a.copy(t), this.b.copy(e), this.c.copy(n), this;
  }
  setFromPointsAndIndices(t, e, n, s) {
    return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[s]), this;
  }
  setFromAttributeAndIndices(t, e, n, s) {
    return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, s), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this;
  }
  getArea() {
    return hn.subVectors(this.c, this.b), Cn.subVectors(this.a, this.b), hn.cross(Cn).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return sn.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return sn.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getInterpolation(t, e, n, s, r) {
    return sn.getInterpolation(t, this.a, this.b, this.c, e, n, s, r);
  }
  containsPoint(t) {
    return sn.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return sn.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const n = this.a, s = this.b, r = this.c;
    let o, a;
    Ci.subVectors(s, n), Pi.subVectors(r, n), Do.subVectors(t, n);
    const c = Ci.dot(Do), l = Pi.dot(Do);
    if (c <= 0 && l <= 0)
      return e.copy(n);
    No.subVectors(t, s);
    const h = Ci.dot(No), u = Pi.dot(No);
    if (h >= 0 && u <= h)
      return e.copy(s);
    const d = c * u - h * l;
    if (d <= 0 && c >= 0 && h <= 0)
      return o = c / (c - h), e.copy(n).addScaledVector(Ci, o);
    Uo.subVectors(t, r);
    const f = Ci.dot(Uo), g = Pi.dot(Uo);
    if (g >= 0 && f <= g)
      return e.copy(r);
    const _ = f * l - c * g;
    if (_ <= 0 && l >= 0 && g <= 0)
      return a = l / (l - g), e.copy(n).addScaledVector(Pi, a);
    const p = h * g - f * u;
    if (p <= 0 && u - h >= 0 && f - g >= 0)
      return Rl.subVectors(r, s), a = (u - h) / (u - h + (f - g)), e.copy(s).addScaledVector(Rl, a);
    const m = 1 / (p + _ + d);
    return o = _ * m, a = d * m, e.copy(n).addScaledVector(Ci, o).addScaledVector(Pi, a);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
const Au = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Wn = { h: 0, s: 0, l: 0 }, dr = { h: 0, s: 0, l: 0 };
function zo(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
}
class Tt {
  constructor(t, e, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(t, e, n);
  }
  set(t, e, n) {
    if (e === void 0 && n === void 0) {
      const s = t;
      s && s.isColor ? this.copy(s) : typeof s == "number" ? this.setHex(s) : typeof s == "string" && this.setStyle(s);
    } else
      this.setRGB(t, e, n);
    return this;
  }
  setScalar(t) {
    return this.r = t, this.g = t, this.b = t, this;
  }
  setHex(t, e = He) {
    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, qt.toWorkingColorSpace(this, e), this;
  }
  setRGB(t, e, n, s = qt.workingColorSpace) {
    return this.r = t, this.g = e, this.b = n, qt.toWorkingColorSpace(this, s), this;
  }
  setHSL(t, e, n, s = qt.workingColorSpace) {
    if (t = Mc(t, 1), e = Ee(e, 0, 1), n = Ee(n, 0, 1), e === 0)
      this.r = this.g = this.b = n;
    else {
      const r = n <= 0.5 ? n * (1 + e) : n + e - n * e, o = 2 * n - r;
      this.r = zo(o, r, t + 1 / 3), this.g = zo(o, r, t), this.b = zo(o, r, t - 1 / 3);
    }
    return qt.toWorkingColorSpace(this, s), this;
  }
  setStyle(t, e = He) {
    function n(r) {
      r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.");
    }
    let s;
    if (s = /^(\w+)\(([^\)]*)\)/.exec(t)) {
      let r;
      const o = s[1], a = s[2];
      switch (o) {
        case "rgb":
        case "rgba":
          if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return n(r[4]), this.setRGB(
              Math.min(255, parseInt(r[1], 10)) / 255,
              Math.min(255, parseInt(r[2], 10)) / 255,
              Math.min(255, parseInt(r[3], 10)) / 255,
              e
            );
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return n(r[4]), this.setRGB(
              Math.min(100, parseInt(r[1], 10)) / 100,
              Math.min(100, parseInt(r[2], 10)) / 100,
              Math.min(100, parseInt(r[3], 10)) / 100,
              e
            );
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return n(r[4]), this.setHSL(
              parseFloat(r[1]) / 360,
              parseFloat(r[2]) / 100,
              parseFloat(r[3]) / 100,
              e
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + t);
      }
    } else if (s = /^\#([A-Fa-f\d]+)$/.exec(t)) {
      const r = s[1], o = r.length;
      if (o === 3)
        return this.setRGB(
          parseInt(r.charAt(0), 16) / 15,
          parseInt(r.charAt(1), 16) / 15,
          parseInt(r.charAt(2), 16) / 15,
          e
        );
      if (o === 6)
        return this.setHex(parseInt(r, 16), e);
      console.warn("THREE.Color: Invalid hex color " + t);
    } else if (t && t.length > 0)
      return this.setColorName(t, e);
    return this;
  }
  setColorName(t, e = He) {
    const n = Au[t.toLowerCase()];
    return n !== void 0 ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this;
  }
  copySRGBToLinear(t) {
    return this.r = qi(t.r), this.g = qi(t.g), this.b = qi(t.b), this;
  }
  copyLinearToSRGB(t) {
    return this.r = Eo(t.r), this.g = Eo(t.g), this.b = Eo(t.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(t = He) {
    return qt.fromWorkingColorSpace(Oe.copy(this), t), Math.round(Ee(Oe.r * 255, 0, 255)) * 65536 + Math.round(Ee(Oe.g * 255, 0, 255)) * 256 + Math.round(Ee(Oe.b * 255, 0, 255));
  }
  getHexString(t = He) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = qt.workingColorSpace) {
    qt.fromWorkingColorSpace(Oe.copy(this), e);
    const n = Oe.r, s = Oe.g, r = Oe.b, o = Math.max(n, s, r), a = Math.min(n, s, r);
    let c, l;
    const h = (a + o) / 2;
    if (a === o)
      c = 0, l = 0;
    else {
      const u = o - a;
      switch (l = h <= 0.5 ? u / (o + a) : u / (2 - o - a), o) {
        case n:
          c = (s - r) / u + (s < r ? 6 : 0);
          break;
        case s:
          c = (r - n) / u + 2;
          break;
        case r:
          c = (n - s) / u + 4;
          break;
      }
      c /= 6;
    }
    return t.h = c, t.s = l, t.l = h, t;
  }
  getRGB(t, e = qt.workingColorSpace) {
    return qt.fromWorkingColorSpace(Oe.copy(this), e), t.r = Oe.r, t.g = Oe.g, t.b = Oe.b, t;
  }
  getStyle(t = He) {
    qt.fromWorkingColorSpace(Oe.copy(this), t);
    const e = Oe.r, n = Oe.g, s = Oe.b;
    return t !== He ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})` : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(s * 255)})`;
  }
  offsetHSL(t, e, n) {
    return this.getHSL(Wn), this.setHSL(Wn.h + t, Wn.s + e, Wn.l + n);
  }
  add(t) {
    return this.r += t.r, this.g += t.g, this.b += t.b, this;
  }
  addColors(t, e) {
    return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this;
  }
  addScalar(t) {
    return this.r += t, this.g += t, this.b += t, this;
  }
  sub(t) {
    return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this;
  }
  multiply(t) {
    return this.r *= t.r, this.g *= t.g, this.b *= t.b, this;
  }
  multiplyScalar(t) {
    return this.r *= t, this.g *= t, this.b *= t, this;
  }
  lerp(t, e) {
    return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this;
  }
  lerpColors(t, e, n) {
    return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this;
  }
  lerpHSL(t, e) {
    this.getHSL(Wn), t.getHSL(dr);
    const n = Us(Wn.h, dr.h, e), s = Us(Wn.s, dr.s, e), r = Us(Wn.l, dr.l, e);
    return this.setHSL(n, s, r), this;
  }
  setFromVector3(t) {
    return this.r = t.x, this.g = t.y, this.b = t.z, this;
  }
  applyMatrix3(t) {
    const e = this.r, n = this.g, s = this.b, r = t.elements;
    return this.r = r[0] * e + r[3] * n + r[6] * s, this.g = r[1] * e + r[4] * n + r[7] * s, this.b = r[2] * e + r[5] * n + r[8] * s, this;
  }
  equals(t) {
    return t.r === this.r && t.g === this.g && t.b === this.b;
  }
  fromArray(t, e = 0) {
    return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this;
  }
  toArray(t = [], e = 0) {
    return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t;
  }
  fromBufferAttribute(t, e) {
    return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const Oe = /* @__PURE__ */ new Tt();
Tt.NAMES = Au;
let dp = 0;
class gn extends xi {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: dp++ }), this.uuid = on(), this.name = "", this.type = "Material", this.blending = Xi, this.side = Fn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = ha, this.blendDst = ua, this.blendEquation = di, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Tt(0, 0, 0), this.blendAlpha = 0, this.depthFunc = Ji, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = pl, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Mi, this.stencilZFail = Mi, this.stencilZPass = Mi, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(t) {
    this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t;
  }
  // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(t) {
    if (t !== void 0)
      for (const e in t) {
        const n = t[e];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);
          continue;
        }
        const s = this[e];
        if (s === void 0) {
          console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);
          continue;
        }
        s && s.isColor ? s.set(n) : s && s.isVector3 && n && n.isVector3 ? s.copy(n) : this[e] = n;
      }
  }
  toJSON(t) {
    const e = t === void 0 || typeof t == "string";
    e && (t = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== Xi && (n.blending = this.blending), this.side !== Fn && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== ha && (n.blendSrc = this.blendSrc), this.blendDst !== ua && (n.blendDst = this.blendDst), this.blendEquation !== di && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== Ji && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== pl && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Mi && (n.stencilFail = this.stencilFail), this.stencilZFail !== Mi && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== Mi && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function s(r) {
      const o = [];
      for (const a in r) {
        const c = r[a];
        delete c.metadata, o.push(c);
      }
      return o;
    }
    if (e) {
      const r = s(t.textures), o = s(t.images);
      r.length > 0 && (n.textures = r), o.length > 0 && (n.images = o);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
    const e = t.clippingPlanes;
    let n = null;
    if (e !== null) {
      const s = e.length;
      n = new Array(s);
      for (let r = 0; r !== s; ++r)
        n[r] = e[r].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class vn extends gn {
  constructor(t) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Tt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new yn(), this.combine = cu, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
  }
}
const ye = /* @__PURE__ */ new w(), fr = /* @__PURE__ */ new tt();
class Ie {
  constructor(t, e, n = !1) {
    if (Array.isArray(t))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = qa, this.updateRanges = [], this.gpuType = mn, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  setUsage(t) {
    return this.usage = t, this;
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this;
  }
  copyAt(t, e, n) {
    t *= this.itemSize, n *= e.itemSize;
    for (let s = 0, r = this.itemSize; s < r; s++)
      this.array[t + s] = e.array[n + s];
    return this;
  }
  copyArray(t) {
    return this.array.set(t), this;
  }
  applyMatrix3(t) {
    if (this.itemSize === 2)
      for (let e = 0, n = this.count; e < n; e++)
        fr.fromBufferAttribute(this, e), fr.applyMatrix3(t), this.setXY(e, fr.x, fr.y);
    else if (this.itemSize === 3)
      for (let e = 0, n = this.count; e < n; e++)
        ye.fromBufferAttribute(this, e), ye.applyMatrix3(t), this.setXYZ(e, ye.x, ye.y, ye.z);
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ye.fromBufferAttribute(this, e), ye.applyMatrix4(t), this.setXYZ(e, ye.x, ye.y, ye.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ye.fromBufferAttribute(this, e), ye.applyNormalMatrix(t), this.setXYZ(e, ye.x, ye.y, ye.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ye.fromBufferAttribute(this, e), ye.transformDirection(t), this.setXYZ(e, ye.x, ye.y, ye.z);
    return this;
  }
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.itemSize + e];
    return this.normalized && (n = pn(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = ie(n, this.array)), this.array[t * this.itemSize + e] = n, this;
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  setX(t, e) {
    return this.normalized && (e = ie(e, this.array)), this.array[t * this.itemSize] = e, this;
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  setY(t, e) {
    return this.normalized && (e = ie(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  setZ(t, e) {
    return this.normalized && (e = ie(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  setW(t, e) {
    return this.normalized && (e = ie(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
  }
  setXY(t, e, n) {
    return t *= this.itemSize, this.normalized && (e = ie(e, this.array), n = ie(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, s) {
    return t *= this.itemSize, this.normalized && (e = ie(e, this.array), n = ie(n, this.array), s = ie(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this;
  }
  setXYZW(t, e, n, s, r) {
    return t *= this.itemSize, this.normalized && (e = ie(e, this.array), n = ie(n, this.array), s = ie(s, this.array), r = ie(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this.array[t + 3] = r, this;
  }
  onUpload(t) {
    return this.onUploadCallback = t, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const t = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (t.name = this.name), this.usage !== qa && (t.usage = this.usage), t;
  }
}
class wu extends Ie {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class Ru extends Ie {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class ce extends Ie {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
let fp = 0;
const en = /* @__PURE__ */ new Dt(), ko = /* @__PURE__ */ new de(), Li = /* @__PURE__ */ new w(), Je = /* @__PURE__ */ new je(), ys = /* @__PURE__ */ new je(), Re = /* @__PURE__ */ new w();
class Pe extends xi {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: fp++ }), this.uuid = on(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (Eu(t) ? Ru : wu)(t, 1) : this.index = t, this;
  }
  getAttribute(t) {
    return this.attributes[t];
  }
  setAttribute(t, e) {
    return this.attributes[t] = e, this;
  }
  deleteAttribute(t) {
    return delete this.attributes[t], this;
  }
  hasAttribute(t) {
    return this.attributes[t] !== void 0;
  }
  addGroup(t, e, n = 0) {
    this.groups.push({
      start: t,
      count: e,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(t, e) {
    this.drawRange.start = t, this.drawRange.count = e;
  }
  applyMatrix4(t) {
    const e = this.attributes.position;
    e !== void 0 && (e.applyMatrix4(t), e.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const r = new Ft().getNormalMatrix(t);
      n.applyNormalMatrix(r), n.needsUpdate = !0;
    }
    const s = this.attributes.tangent;
    return s !== void 0 && (s.transformDirection(t), s.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(t) {
    return en.makeRotationFromQuaternion(t), this.applyMatrix4(en), this;
  }
  rotateX(t) {
    return en.makeRotationX(t), this.applyMatrix4(en), this;
  }
  rotateY(t) {
    return en.makeRotationY(t), this.applyMatrix4(en), this;
  }
  rotateZ(t) {
    return en.makeRotationZ(t), this.applyMatrix4(en), this;
  }
  translate(t, e, n) {
    return en.makeTranslation(t, e, n), this.applyMatrix4(en), this;
  }
  scale(t, e, n) {
    return en.makeScale(t, e, n), this.applyMatrix4(en), this;
  }
  lookAt(t) {
    return ko.lookAt(t), ko.updateMatrix(), this.applyMatrix4(ko.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Li).negate(), this.translate(Li.x, Li.y, Li.z), this;
  }
  setFromPoints(t) {
    const e = [];
    for (let n = 0, s = t.length; n < s; n++) {
      const r = t[n];
      e.push(r.x, r.y, r.z || 0);
    }
    return this.setAttribute("position", new ce(e, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new je());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new w(-1 / 0, -1 / 0, -1 / 0),
        new w(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), e)
        for (let n = 0, s = e.length; n < s; n++) {
          const r = e[n];
          Je.setFromBufferAttribute(r), this.morphTargetsRelative ? (Re.addVectors(this.boundingBox.min, Je.min), this.boundingBox.expandByPoint(Re), Re.addVectors(this.boundingBox.max, Je.max), this.boundingBox.expandByPoint(Re)) : (this.boundingBox.expandByPoint(Je.min), this.boundingBox.expandByPoint(Je.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Mn());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new w(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (Je.setFromBufferAttribute(t), e)
        for (let r = 0, o = e.length; r < o; r++) {
          const a = e[r];
          ys.setFromBufferAttribute(a), this.morphTargetsRelative ? (Re.addVectors(Je.min, ys.min), Je.expandByPoint(Re), Re.addVectors(Je.max, ys.max), Je.expandByPoint(Re)) : (Je.expandByPoint(ys.min), Je.expandByPoint(ys.max));
        }
      Je.getCenter(n);
      let s = 0;
      for (let r = 0, o = t.count; r < o; r++)
        Re.fromBufferAttribute(t, r), s = Math.max(s, n.distanceToSquared(Re));
      if (e)
        for (let r = 0, o = e.length; r < o; r++) {
          const a = e[r], c = this.morphTargetsRelative;
          for (let l = 0, h = a.count; l < h; l++)
            Re.fromBufferAttribute(a, l), c && (Li.fromBufferAttribute(t, l), Re.add(Li)), s = Math.max(s, n.distanceToSquared(Re));
        }
      this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const t = this.index, e = this.attributes;
    if (t === null || e.position === void 0 || e.normal === void 0 || e.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = e.position, s = e.normal, r = e.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Ie(new Float32Array(4 * n.count), 4));
    const o = this.getAttribute("tangent"), a = [], c = [];
    for (let L = 0; L < n.count; L++)
      a[L] = new w(), c[L] = new w();
    const l = new w(), h = new w(), u = new w(), d = new tt(), f = new tt(), g = new tt(), _ = new w(), p = new w();
    function m(L, G, v) {
      l.fromBufferAttribute(n, L), h.fromBufferAttribute(n, G), u.fromBufferAttribute(n, v), d.fromBufferAttribute(r, L), f.fromBufferAttribute(r, G), g.fromBufferAttribute(r, v), h.sub(l), u.sub(l), f.sub(d), g.sub(d);
      const b = 1 / (f.x * g.y - g.x * f.y);
      isFinite(b) && (_.copy(h).multiplyScalar(g.y).addScaledVector(u, -f.y).multiplyScalar(b), p.copy(u).multiplyScalar(f.x).addScaledVector(h, -g.x).multiplyScalar(b), a[L].add(_), a[G].add(_), a[v].add(_), c[L].add(p), c[G].add(p), c[v].add(p));
    }
    let S = this.groups;
    S.length === 0 && (S = [{
      start: 0,
      count: t.count
    }]);
    for (let L = 0, G = S.length; L < G; ++L) {
      const v = S[L], b = v.start, B = v.count;
      for (let z = b, H = b + B; z < H; z += 3)
        m(
          t.getX(z + 0),
          t.getX(z + 1),
          t.getX(z + 2)
        );
    }
    const x = new w(), M = new w(), P = new w(), R = new w();
    function A(L) {
      P.fromBufferAttribute(s, L), R.copy(P);
      const G = a[L];
      x.copy(G), x.sub(P.multiplyScalar(P.dot(G))).normalize(), M.crossVectors(R, G);
      const b = M.dot(c[L]) < 0 ? -1 : 1;
      o.setXYZW(L, x.x, x.y, x.z, b);
    }
    for (let L = 0, G = S.length; L < G; ++L) {
      const v = S[L], b = v.start, B = v.count;
      for (let z = b, H = b + B; z < H; z += 3)
        A(t.getX(z + 0)), A(t.getX(z + 1)), A(t.getX(z + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index, e = this.getAttribute("position");
    if (e !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Ie(new Float32Array(e.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let d = 0, f = n.count; d < f; d++)
          n.setXYZ(d, 0, 0, 0);
      const s = new w(), r = new w(), o = new w(), a = new w(), c = new w(), l = new w(), h = new w(), u = new w();
      if (t)
        for (let d = 0, f = t.count; d < f; d += 3) {
          const g = t.getX(d + 0), _ = t.getX(d + 1), p = t.getX(d + 2);
          s.fromBufferAttribute(e, g), r.fromBufferAttribute(e, _), o.fromBufferAttribute(e, p), h.subVectors(o, r), u.subVectors(s, r), h.cross(u), a.fromBufferAttribute(n, g), c.fromBufferAttribute(n, _), l.fromBufferAttribute(n, p), a.add(h), c.add(h), l.add(h), n.setXYZ(g, a.x, a.y, a.z), n.setXYZ(_, c.x, c.y, c.z), n.setXYZ(p, l.x, l.y, l.z);
        }
      else
        for (let d = 0, f = e.count; d < f; d += 3)
          s.fromBufferAttribute(e, d + 0), r.fromBufferAttribute(e, d + 1), o.fromBufferAttribute(e, d + 2), h.subVectors(o, r), u.subVectors(s, r), h.cross(u), n.setXYZ(d + 0, h.x, h.y, h.z), n.setXYZ(d + 1, h.x, h.y, h.z), n.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const t = this.attributes.normal;
    for (let e = 0, n = t.count; e < n; e++)
      Re.fromBufferAttribute(t, e), Re.normalize(), t.setXYZ(e, Re.x, Re.y, Re.z);
  }
  toNonIndexed() {
    function t(a, c) {
      const l = a.array, h = a.itemSize, u = a.normalized, d = new l.constructor(c.length * h);
      let f = 0, g = 0;
      for (let _ = 0, p = c.length; _ < p; _++) {
        a.isInterleavedBufferAttribute ? f = c[_] * a.data.stride + a.offset : f = c[_] * h;
        for (let m = 0; m < h; m++)
          d[g++] = l[f++];
      }
      return new Ie(d, h, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const e = new Pe(), n = this.index.array, s = this.attributes;
    for (const a in s) {
      const c = s[a], l = t(c, n);
      e.setAttribute(a, l);
    }
    const r = this.morphAttributes;
    for (const a in r) {
      const c = [], l = r[a];
      for (let h = 0, u = l.length; h < u; h++) {
        const d = l[h], f = t(d, n);
        c.push(f);
      }
      e.morphAttributes[a] = c;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let a = 0, c = o.length; a < c; a++) {
      const l = o[a];
      e.addGroup(l.start, l.count, l.materialIndex);
    }
    return e;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (t.uuid = this.uuid, t.type = this.type, this.name !== "" && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), this.parameters !== void 0) {
      const c = this.parameters;
      for (const l in c)
        c[l] !== void 0 && (t[l] = c[l]);
      return t;
    }
    t.data = { attributes: {} };
    const e = this.index;
    e !== null && (t.data.index = {
      type: e.array.constructor.name,
      array: Array.prototype.slice.call(e.array)
    });
    const n = this.attributes;
    for (const c in n) {
      const l = n[c];
      t.data.attributes[c] = l.toJSON(t.data);
    }
    const s = {};
    let r = !1;
    for (const c in this.morphAttributes) {
      const l = this.morphAttributes[c], h = [];
      for (let u = 0, d = l.length; u < d; u++) {
        const f = l[u];
        h.push(f.toJSON(t.data));
      }
      h.length > 0 && (s[c] = h, r = !0);
    }
    r && (t.data.morphAttributes = s, t.data.morphTargetsRelative = this.morphTargetsRelative);
    const o = this.groups;
    o.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(o)));
    const a = this.boundingSphere;
    return a !== null && (t.data.boundingSphere = {
      center: a.center.toArray(),
      radius: a.radius
    }), t;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const e = {};
    this.name = t.name;
    const n = t.index;
    n !== null && this.setIndex(n.clone(e));
    const s = t.attributes;
    for (const l in s) {
      const h = s[l];
      this.setAttribute(l, h.clone(e));
    }
    const r = t.morphAttributes;
    for (const l in r) {
      const h = [], u = r[l];
      for (let d = 0, f = u.length; d < f; d++)
        h.push(u[d].clone(e));
      this.morphAttributes[l] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const o = t.groups;
    for (let l = 0, h = o.length; l < h; l++) {
      const u = o[l];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const a = t.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const c = t.boundingSphere;
    return c !== null && (this.boundingSphere = c.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const Cl = /* @__PURE__ */ new Dt(), oi = /* @__PURE__ */ new ls(), pr = /* @__PURE__ */ new Mn(), Pl = /* @__PURE__ */ new w(), mr = /* @__PURE__ */ new w(), gr = /* @__PURE__ */ new w(), _r = /* @__PURE__ */ new w(), Ho = /* @__PURE__ */ new w(), vr = /* @__PURE__ */ new w(), Ll = /* @__PURE__ */ new w(), xr = /* @__PURE__ */ new w();
class ge extends de {
  constructor(t = new Pe(), e = new vn()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), t.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), t.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const s = e[n[0]];
      if (s !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, o = s.length; r < o; r++) {
          const a = s[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r;
        }
      }
    }
  }
  getVertexPosition(t, e) {
    const n = this.geometry, s = n.attributes.position, r = n.morphAttributes.position, o = n.morphTargetsRelative;
    e.fromBufferAttribute(s, t);
    const a = this.morphTargetInfluences;
    if (r && a) {
      vr.set(0, 0, 0);
      for (let c = 0, l = r.length; c < l; c++) {
        const h = a[c], u = r[c];
        h !== 0 && (Ho.fromBufferAttribute(u, t), o ? vr.addScaledVector(Ho, h) : vr.addScaledVector(Ho.sub(e), h));
      }
      e.add(vr);
    }
    return e;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.material, r = this.matrixWorld;
    s !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), pr.copy(n.boundingSphere), pr.applyMatrix4(r), oi.copy(t.ray).recast(t.near), !(pr.containsPoint(oi.origin) === !1 && (oi.intersectSphere(pr, Pl) === null || oi.origin.distanceToSquared(Pl) > (t.far - t.near) ** 2)) && (Cl.copy(r).invert(), oi.copy(t.ray).applyMatrix4(Cl), !(n.boundingBox !== null && oi.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(t, e, oi)));
  }
  _computeIntersections(t, e, n) {
    let s;
    const r = this.geometry, o = this.material, a = r.index, c = r.attributes.position, l = r.attributes.uv, h = r.attributes.uv1, u = r.attributes.normal, d = r.groups, f = r.drawRange;
    if (a !== null)
      if (Array.isArray(o))
        for (let g = 0, _ = d.length; g < _; g++) {
          const p = d[g], m = o[p.materialIndex], S = Math.max(p.start, f.start), x = Math.min(a.count, Math.min(p.start + p.count, f.start + f.count));
          for (let M = S, P = x; M < P; M += 3) {
            const R = a.getX(M), A = a.getX(M + 1), L = a.getX(M + 2);
            s = yr(this, m, t, n, l, h, u, R, A, L), s && (s.faceIndex = Math.floor(M / 3), s.face.materialIndex = p.materialIndex, e.push(s));
          }
        }
      else {
        const g = Math.max(0, f.start), _ = Math.min(a.count, f.start + f.count);
        for (let p = g, m = _; p < m; p += 3) {
          const S = a.getX(p), x = a.getX(p + 1), M = a.getX(p + 2);
          s = yr(this, o, t, n, l, h, u, S, x, M), s && (s.faceIndex = Math.floor(p / 3), e.push(s));
        }
      }
    else if (c !== void 0)
      if (Array.isArray(o))
        for (let g = 0, _ = d.length; g < _; g++) {
          const p = d[g], m = o[p.materialIndex], S = Math.max(p.start, f.start), x = Math.min(c.count, Math.min(p.start + p.count, f.start + f.count));
          for (let M = S, P = x; M < P; M += 3) {
            const R = M, A = M + 1, L = M + 2;
            s = yr(this, m, t, n, l, h, u, R, A, L), s && (s.faceIndex = Math.floor(M / 3), s.face.materialIndex = p.materialIndex, e.push(s));
          }
        }
      else {
        const g = Math.max(0, f.start), _ = Math.min(c.count, f.start + f.count);
        for (let p = g, m = _; p < m; p += 3) {
          const S = p, x = p + 1, M = p + 2;
          s = yr(this, o, t, n, l, h, u, S, x, M), s && (s.faceIndex = Math.floor(p / 3), e.push(s));
        }
      }
  }
}
function pp(i, t, e, n, s, r, o, a) {
  let c;
  if (t.side === $e ? c = n.intersectTriangle(o, r, s, !0, a) : c = n.intersectTriangle(s, r, o, t.side === Fn, a), c === null) return null;
  xr.copy(a), xr.applyMatrix4(i.matrixWorld);
  const l = e.ray.origin.distanceTo(xr);
  return l < e.near || l > e.far ? null : {
    distance: l,
    point: xr.clone(),
    object: i
  };
}
function yr(i, t, e, n, s, r, o, a, c, l) {
  i.getVertexPosition(a, mr), i.getVertexPosition(c, gr), i.getVertexPosition(l, _r);
  const h = pp(i, t, e, n, mr, gr, _r, Ll);
  if (h) {
    const u = new w();
    sn.getBarycoord(Ll, mr, gr, _r, u), s && (h.uv = sn.getInterpolatedAttribute(s, a, c, l, u, new tt())), r && (h.uv1 = sn.getInterpolatedAttribute(r, a, c, l, u, new tt())), o && (h.normal = sn.getInterpolatedAttribute(o, a, c, l, u, new w()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = {
      a,
      b: c,
      c: l,
      normal: new w(),
      materialIndex: 0
    };
    sn.getNormal(mr, gr, _r, d.normal), h.face = d, h.barycoord = u;
  }
  return h;
}
class ei extends Pe {
  constructor(t = 1, e = 1, n = 1, s = 1, r = 1, o = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: t,
      height: e,
      depth: n,
      widthSegments: s,
      heightSegments: r,
      depthSegments: o
    };
    const a = this;
    s = Math.floor(s), r = Math.floor(r), o = Math.floor(o);
    const c = [], l = [], h = [], u = [];
    let d = 0, f = 0;
    g("z", "y", "x", -1, -1, n, e, t, o, r, 0), g("z", "y", "x", 1, -1, n, e, -t, o, r, 1), g("x", "z", "y", 1, 1, t, n, e, s, o, 2), g("x", "z", "y", 1, -1, t, n, -e, s, o, 3), g("x", "y", "z", 1, -1, t, e, n, s, r, 4), g("x", "y", "z", -1, -1, t, e, -n, s, r, 5), this.setIndex(c), this.setAttribute("position", new ce(l, 3)), this.setAttribute("normal", new ce(h, 3)), this.setAttribute("uv", new ce(u, 2));
    function g(_, p, m, S, x, M, P, R, A, L, G) {
      const v = M / A, b = P / L, B = M / 2, z = P / 2, H = R / 2, K = A + 1, k = L + 1;
      let nt = 0, W = 0;
      const ut = new w();
      for (let dt = 0; dt < k; dt++) {
        const Mt = dt * b - z;
        for (let Yt = 0; Yt < K; Yt++) {
          const ee = Yt * v - B;
          ut[_] = ee * S, ut[p] = Mt * x, ut[m] = H, l.push(ut.x, ut.y, ut.z), ut[_] = 0, ut[p] = 0, ut[m] = R > 0 ? 1 : -1, h.push(ut.x, ut.y, ut.z), u.push(Yt / A), u.push(1 - dt / L), nt += 1;
        }
      }
      for (let dt = 0; dt < L; dt++)
        for (let Mt = 0; Mt < A; Mt++) {
          const Yt = d + Mt + K * dt, ee = d + Mt + K * (dt + 1), $ = d + (Mt + 1) + K * (dt + 1), Q = d + (Mt + 1) + K * dt;
          c.push(Yt, ee, Q), c.push(ee, $, Q), W += 6;
        }
      a.addGroup(f, W, G), f += W, d += nt;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new ei(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
function rs(i) {
  const t = {};
  for (const e in i) {
    t[e] = {};
    for (const n in i[e]) {
      const s = i[e][n];
      s && (s.isColor || s.isMatrix3 || s.isMatrix4 || s.isVector2 || s.isVector3 || s.isVector4 || s.isTexture || s.isQuaternion) ? s.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), t[e][n] = null) : t[e][n] = s.clone() : Array.isArray(s) ? t[e][n] = s.slice() : t[e][n] = s;
    }
  }
  return t;
}
function ke(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = rs(i[e]);
    for (const s in n)
      t[s] = n[s];
  }
  return t;
}
function mp(i) {
  const t = [];
  for (let e = 0; e < i.length; e++)
    t.push(i[e].clone());
  return t;
}
function Cu(i) {
  const t = i.getRenderTarget();
  return t === null ? i.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : qt.workingColorSpace;
}
const gp = { clone: rs, merge: ke };
var _p = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, vp = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Qn extends gn {
  constructor(t) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = _p, this.fragmentShader = vp, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, t !== void 0 && this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = rs(t.uniforms), this.uniformsGroups = mp(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    e.glslVersion = this.glslVersion, e.uniforms = {};
    for (const s in this.uniforms) {
      const o = this.uniforms[s].value;
      o && o.isTexture ? e.uniforms[s] = {
        type: "t",
        value: o.toJSON(t).uuid
      } : o && o.isColor ? e.uniforms[s] = {
        type: "c",
        value: o.getHex()
      } : o && o.isVector2 ? e.uniforms[s] = {
        type: "v2",
        value: o.toArray()
      } : o && o.isVector3 ? e.uniforms[s] = {
        type: "v3",
        value: o.toArray()
      } : o && o.isVector4 ? e.uniforms[s] = {
        type: "v4",
        value: o.toArray()
      } : o && o.isMatrix3 ? e.uniforms[s] = {
        type: "m3",
        value: o.toArray()
      } : o && o.isMatrix4 ? e.uniforms[s] = {
        type: "m4",
        value: o.toArray()
      } : e.uniforms[s] = {
        value: o
      };
    }
    Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
    const n = {};
    for (const s in this.extensions)
      this.extensions[s] === !0 && (n[s] = !0);
    return Object.keys(n).length > 0 && (e.extensions = n), e;
  }
}
class Pu extends de {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Dt(), this.projectionMatrix = new Dt(), this.projectionMatrixInverse = new Dt(), this.coordinateSystem = On;
  }
  copy(t, e) {
    return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this;
  }
  getWorldDirection(t) {
    return super.getWorldDirection(t).negate();
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(t, e) {
    super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Xn = /* @__PURE__ */ new w(), Il = /* @__PURE__ */ new tt(), Dl = /* @__PURE__ */ new tt();
class Be extends Pu {
  constructor(t = 50, e = 1, n = 0.1, s = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = s, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = t.view === null ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(t) {
    const e = 0.5 * this.getFilmHeight() / t;
    this.fov = ss * 2 * Math.atan(e), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const t = Math.tan(Ns * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / t;
  }
  getEffectiveFOV() {
    return ss * 2 * Math.atan(
      Math.tan(Ns * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets minTarget and maxTarget to the coordinates of the lower-left and upper-right corners of the view rectangle.
   */
  getViewBounds(t, e, n) {
    Xn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(Xn.x, Xn.y).multiplyScalar(-t / Xn.z), Xn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(Xn.x, Xn.y).multiplyScalar(-t / Xn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(t, e) {
    return this.getViewBounds(t, Il, Dl), e.subVectors(Dl, Il);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(t, e, n, s, r, o) {
    this.aspect = t / e, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = this.near;
    let e = t * Math.tan(Ns * 0.5 * this.fov) / this.zoom, n = 2 * e, s = this.aspect * n, r = -0.5 * s;
    const o = this.view;
    if (this.view !== null && this.view.enabled) {
      const c = o.fullWidth, l = o.fullHeight;
      r += o.offsetX * s / c, e -= o.offsetY * n / l, s *= o.width / c, n *= o.height / l;
    }
    const a = this.filmOffset;
    a !== 0 && (r += t * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + s, e, e - n, t, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, this.view !== null && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
  }
}
const Ii = -90, Di = 1;
class xp extends de {
  constructor(t, e, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const s = new Be(Ii, Di, t, e);
    s.layers = this.layers, this.add(s);
    const r = new Be(Ii, Di, t, e);
    r.layers = this.layers, this.add(r);
    const o = new Be(Ii, Di, t, e);
    o.layers = this.layers, this.add(o);
    const a = new Be(Ii, Di, t, e);
    a.layers = this.layers, this.add(a);
    const c = new Be(Ii, Di, t, e);
    c.layers = this.layers, this.add(c);
    const l = new Be(Ii, Di, t, e);
    l.layers = this.layers, this.add(l);
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem, e = this.children.concat(), [n, s, r, o, a, c] = e;
    for (const l of e) this.remove(l);
    if (t === On)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), c.up.set(0, 1, 0), c.lookAt(0, 0, -1);
    else if (t === no)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), s.up.set(0, -1, 0), s.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), o.up.set(0, 0, -1), o.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), c.up.set(0, -1, 0), c.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const l of e)
      this.add(l), l.updateMatrixWorld();
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: s } = this;
    this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
    const [r, o, a, c, l, h] = this.children, u = t.getRenderTarget(), d = t.getActiveCubeFace(), f = t.getActiveMipmapLevel(), g = t.xr.enabled;
    t.xr.enabled = !1;
    const _ = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, t.setRenderTarget(n, 0, s), t.render(e, r), t.setRenderTarget(n, 1, s), t.render(e, o), t.setRenderTarget(n, 2, s), t.render(e, a), t.setRenderTarget(n, 3, s), t.render(e, c), t.setRenderTarget(n, 4, s), t.render(e, l), n.texture.generateMipmaps = _, t.setRenderTarget(n, 5, s), t.render(e, h), t.setRenderTarget(u, d, f), t.xr.enabled = g, n.texture.needsPMREMUpdate = !0;
  }
}
class Lu extends be {
  constructor(t, e, n, s, r, o, a, c, l, h) {
    t = t !== void 0 ? t : [], e = e !== void 0 ? e : Qi, super(t, e, n, s, r, o, a, c, l, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class yp extends _i {
  constructor(t = 1, e = {}) {
    super(t, t, e), this.isWebGLCubeRenderTarget = !0;
    const n = { width: t, height: t, depth: 1 }, s = [n, n, n, n, n, n];
    this.texture = new Lu(s, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : !1, this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : Qe;
  }
  fromEquirectangularTexture(t, e) {
    this.texture.type = e.type, this.texture.colorSpace = e.colorSpace, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, s = new ei(5, 5, 5), r = new Qn({
      name: "CubemapFromEquirect",
      uniforms: rs(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: $e,
      blending: Zn
    });
    r.uniforms.tEquirect.value = e;
    const o = new ge(s, r), a = e.minFilter;
    return e.minFilter === Un && (e.minFilter = Qe), new xp(1, 10, this).update(t, o), e.minFilter = a, o.geometry.dispose(), o.material.dispose(), this;
  }
  clear(t, e, n, s) {
    const r = t.getRenderTarget();
    for (let o = 0; o < 6; o++)
      t.setRenderTarget(this, o), t.clear(e, n, s);
    t.setRenderTarget(r);
  }
}
const Vo = /* @__PURE__ */ new w(), Mp = /* @__PURE__ */ new w(), Sp = /* @__PURE__ */ new Ft();
class Nn {
  constructor(t = new w(1, 0, 0), e = 0) {
    this.isPlane = !0, this.normal = t, this.constant = e;
  }
  set(t, e) {
    return this.normal.copy(t), this.constant = e, this;
  }
  setComponents(t, e, n, s) {
    return this.normal.set(t, e, n), this.constant = s, this;
  }
  setFromNormalAndCoplanarPoint(t, e) {
    return this.normal.copy(t), this.constant = -e.dot(this.normal), this;
  }
  setFromCoplanarPoints(t, e, n) {
    const s = Vo.subVectors(n, e).cross(Mp.subVectors(t, e)).normalize();
    return this.setFromNormalAndCoplanarPoint(s, t), this;
  }
  copy(t) {
    return this.normal.copy(t.normal), this.constant = t.constant, this;
  }
  normalize() {
    const t = 1 / this.normal.length();
    return this.normal.multiplyScalar(t), this.constant *= t, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(t) {
    return this.normal.dot(t) + this.constant;
  }
  distanceToSphere(t) {
    return this.distanceToPoint(t.center) - t.radius;
  }
  projectPoint(t, e) {
    return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t));
  }
  intersectLine(t, e) {
    const n = t.delta(Vo), s = this.normal.dot(n);
    if (s === 0)
      return this.distanceToPoint(t.start) === 0 ? e.copy(t.start) : null;
    const r = -(t.start.dot(this.normal) + this.constant) / s;
    return r < 0 || r > 1 ? null : e.copy(t.start).addScaledVector(n, r);
  }
  intersectsLine(t) {
    const e = this.distanceToPoint(t.start), n = this.distanceToPoint(t.end);
    return e < 0 && n > 0 || n < 0 && e > 0;
  }
  intersectsBox(t) {
    return t.intersectsPlane(this);
  }
  intersectsSphere(t) {
    return t.intersectsPlane(this);
  }
  coplanarPoint(t) {
    return t.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(t, e) {
    const n = e || Sp.getNormalMatrix(t), s = this.coplanarPoint(Vo).applyMatrix4(t), r = this.normal.applyMatrix3(n).normalize();
    return this.constant = -s.dot(r), this;
  }
  translate(t) {
    return this.constant -= t.dot(this.normal), this;
  }
  equals(t) {
    return t.normal.equals(this.normal) && t.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const ai = /* @__PURE__ */ new Mn(), Mr = /* @__PURE__ */ new w();
class Ec {
  constructor(t = new Nn(), e = new Nn(), n = new Nn(), s = new Nn(), r = new Nn(), o = new Nn()) {
    this.planes = [t, e, n, s, r, o];
  }
  set(t, e, n, s, r, o) {
    const a = this.planes;
    return a[0].copy(t), a[1].copy(e), a[2].copy(n), a[3].copy(s), a[4].copy(r), a[5].copy(o), this;
  }
  copy(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++)
      e[n].copy(t.planes[n]);
    return this;
  }
  setFromProjectionMatrix(t, e = On) {
    const n = this.planes, s = t.elements, r = s[0], o = s[1], a = s[2], c = s[3], l = s[4], h = s[5], u = s[6], d = s[7], f = s[8], g = s[9], _ = s[10], p = s[11], m = s[12], S = s[13], x = s[14], M = s[15];
    if (n[0].setComponents(c - r, d - l, p - f, M - m).normalize(), n[1].setComponents(c + r, d + l, p + f, M + m).normalize(), n[2].setComponents(c + o, d + h, p + g, M + S).normalize(), n[3].setComponents(c - o, d - h, p - g, M - S).normalize(), n[4].setComponents(c - a, d - u, p - _, M - x).normalize(), e === On)
      n[5].setComponents(c + a, d + u, p + _, M + x).normalize();
    else if (e === no)
      n[5].setComponents(a, u, _, x).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0)
      t.boundingSphere === null && t.computeBoundingSphere(), ai.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
    else {
      const e = t.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), ai.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(ai);
  }
  intersectsSprite(t) {
    return ai.center.set(0, 0, 0), ai.radius = 0.7071067811865476, ai.applyMatrix4(t.matrixWorld), this.intersectsSphere(ai);
  }
  intersectsSphere(t) {
    const e = this.planes, n = t.center, s = -t.radius;
    for (let r = 0; r < 6; r++)
      if (e[r].distanceToPoint(n) < s)
        return !1;
    return !0;
  }
  intersectsBox(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++) {
      const s = e[n];
      if (Mr.x = s.normal.x > 0 ? t.max.x : t.min.x, Mr.y = s.normal.y > 0 ? t.max.y : t.min.y, Mr.z = s.normal.z > 0 ? t.max.z : t.min.z, s.distanceToPoint(Mr) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(t) {
    const e = this.planes;
    for (let n = 0; n < 6; n++)
      if (e[n].distanceToPoint(t) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function Iu() {
  let i = null, t = !1, e = null, n = null;
  function s(r, o) {
    e(r, o), n = i.requestAnimationFrame(s);
  }
  return {
    start: function() {
      t !== !0 && e !== null && (n = i.requestAnimationFrame(s), t = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(n), t = !1;
    },
    setAnimationLoop: function(r) {
      e = r;
    },
    setContext: function(r) {
      i = r;
    }
  };
}
function Ep(i) {
  const t = /* @__PURE__ */ new WeakMap();
  function e(a, c) {
    const l = a.array, h = a.usage, u = l.byteLength, d = i.createBuffer();
    i.bindBuffer(c, d), i.bufferData(c, l, h), a.onUploadCallback();
    let f;
    if (l instanceof Float32Array)
      f = i.FLOAT;
    else if (l instanceof Uint16Array)
      a.isFloat16BufferAttribute ? f = i.HALF_FLOAT : f = i.UNSIGNED_SHORT;
    else if (l instanceof Int16Array)
      f = i.SHORT;
    else if (l instanceof Uint32Array)
      f = i.UNSIGNED_INT;
    else if (l instanceof Int32Array)
      f = i.INT;
    else if (l instanceof Int8Array)
      f = i.BYTE;
    else if (l instanceof Uint8Array)
      f = i.UNSIGNED_BYTE;
    else if (l instanceof Uint8ClampedArray)
      f = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + l);
    return {
      buffer: d,
      type: f,
      bytesPerElement: l.BYTES_PER_ELEMENT,
      version: a.version,
      size: u
    };
  }
  function n(a, c, l) {
    const h = c.array, u = c.updateRanges;
    if (i.bindBuffer(l, a), u.length === 0)
      i.bufferSubData(l, 0, h);
    else {
      u.sort((f, g) => f.start - g.start);
      let d = 0;
      for (let f = 1; f < u.length; f++) {
        const g = u[d], _ = u[f];
        _.start <= g.start + g.count + 1 ? g.count = Math.max(
          g.count,
          _.start + _.count - g.start
        ) : (++d, u[d] = _);
      }
      u.length = d + 1;
      for (let f = 0, g = u.length; f < g; f++) {
        const _ = u[f];
        i.bufferSubData(
          l,
          _.start * h.BYTES_PER_ELEMENT,
          h,
          _.start,
          _.count
        );
      }
      c.clearUpdateRanges();
    }
    c.onUploadCallback();
  }
  function s(a) {
    return a.isInterleavedBufferAttribute && (a = a.data), t.get(a);
  }
  function r(a) {
    a.isInterleavedBufferAttribute && (a = a.data);
    const c = t.get(a);
    c && (i.deleteBuffer(c.buffer), t.delete(a));
  }
  function o(a, c) {
    if (a.isInterleavedBufferAttribute && (a = a.data), a.isGLBufferAttribute) {
      const h = t.get(a);
      (!h || h.version < a.version) && t.set(a, {
        buffer: a.buffer,
        type: a.type,
        bytesPerElement: a.elementSize,
        version: a.version
      });
      return;
    }
    const l = t.get(a);
    if (l === void 0)
      t.set(a, e(a, c));
    else if (l.version < a.version) {
      if (l.size !== a.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(l.buffer, a, c), l.version = a.version;
    }
  }
  return {
    get: s,
    remove: r,
    update: o
  };
}
class ho extends Pe {
  constructor(t = 1, e = 1, n = 1, s = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: e,
      widthSegments: n,
      heightSegments: s
    };
    const r = t / 2, o = e / 2, a = Math.floor(n), c = Math.floor(s), l = a + 1, h = c + 1, u = t / a, d = e / c, f = [], g = [], _ = [], p = [];
    for (let m = 0; m < h; m++) {
      const S = m * d - o;
      for (let x = 0; x < l; x++) {
        const M = x * u - r;
        g.push(M, -S, 0), _.push(0, 0, 1), p.push(x / a), p.push(1 - m / c);
      }
    }
    for (let m = 0; m < c; m++)
      for (let S = 0; S < a; S++) {
        const x = S + l * m, M = S + l * (m + 1), P = S + 1 + l * (m + 1), R = S + 1 + l * m;
        f.push(x, M, R), f.push(M, P, R);
      }
    this.setIndex(f), this.setAttribute("position", new ce(g, 3)), this.setAttribute("normal", new ce(_, 3)), this.setAttribute("uv", new ce(p, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new ho(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
var bp = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Tp = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, Ap = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, wp = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Rp = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Cp = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Pp = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Lp = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, Ip = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`, Dp = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, Np = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Up = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Op = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, Fp = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, Bp = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, zp = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, kp = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Hp = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Vp = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Gp = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Wp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Xp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, $p = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`, jp = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, qp = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Yp = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, Kp = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Zp = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Jp = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Qp = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, tm = "gl_FragColor = linearToOutputTexel( gl_FragColor );", em = `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, nm = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, im = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, sm = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, rm = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, om = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, am = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, cm = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, lm = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, hm = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, um = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, dm = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, fm = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, pm = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, mm = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, gm = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, _m = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, vm = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, xm = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, ym = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Mm = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, Sm = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Em = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, bm = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, Tm = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Am = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, wm = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Rm = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Cm = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Pm = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, Lm = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Im = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, Dm = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Nm = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Um = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Om = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Fm = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Bm = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, zm = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, km = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Hm = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, Vm = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Gm = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Wm = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Xm = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, $m = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, jm = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, qm = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Ym = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Km = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Zm = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Jm = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, Qm = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, tg = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, eg = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, ng = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, ig = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, sg = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, rg = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`, og = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, ag = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, cg = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, lg = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, hg = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, ug = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, dg = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, fg = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, pg = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, mg = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, gg = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, _g = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, vg = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, xg = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, yg = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Mg = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, Sg = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Eg = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, bg = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Tg = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Ag = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, wg = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Rg = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Cg = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, Pg = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, Lg = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, Ig = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, Dg = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, Ng = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Ug = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Og = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Fg = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, Bg = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, zg = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, kg = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Hg = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, Vg = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Gg = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Wg = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, Xg = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, $g = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, jg = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, qg = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Yg = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Kg = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Zg = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Jg = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Qg = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, t_ = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, e_ = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, n_ = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Ot = {
  alphahash_fragment: bp,
  alphahash_pars_fragment: Tp,
  alphamap_fragment: Ap,
  alphamap_pars_fragment: wp,
  alphatest_fragment: Rp,
  alphatest_pars_fragment: Cp,
  aomap_fragment: Pp,
  aomap_pars_fragment: Lp,
  batching_pars_vertex: Ip,
  batching_vertex: Dp,
  begin_vertex: Np,
  beginnormal_vertex: Up,
  bsdfs: Op,
  iridescence_fragment: Fp,
  bumpmap_pars_fragment: Bp,
  clipping_planes_fragment: zp,
  clipping_planes_pars_fragment: kp,
  clipping_planes_pars_vertex: Hp,
  clipping_planes_vertex: Vp,
  color_fragment: Gp,
  color_pars_fragment: Wp,
  color_pars_vertex: Xp,
  color_vertex: $p,
  common: jp,
  cube_uv_reflection_fragment: qp,
  defaultnormal_vertex: Yp,
  displacementmap_pars_vertex: Kp,
  displacementmap_vertex: Zp,
  emissivemap_fragment: Jp,
  emissivemap_pars_fragment: Qp,
  colorspace_fragment: tm,
  colorspace_pars_fragment: em,
  envmap_fragment: nm,
  envmap_common_pars_fragment: im,
  envmap_pars_fragment: sm,
  envmap_pars_vertex: rm,
  envmap_physical_pars_fragment: gm,
  envmap_vertex: om,
  fog_vertex: am,
  fog_pars_vertex: cm,
  fog_fragment: lm,
  fog_pars_fragment: hm,
  gradientmap_pars_fragment: um,
  lightmap_pars_fragment: dm,
  lights_lambert_fragment: fm,
  lights_lambert_pars_fragment: pm,
  lights_pars_begin: mm,
  lights_toon_fragment: _m,
  lights_toon_pars_fragment: vm,
  lights_phong_fragment: xm,
  lights_phong_pars_fragment: ym,
  lights_physical_fragment: Mm,
  lights_physical_pars_fragment: Sm,
  lights_fragment_begin: Em,
  lights_fragment_maps: bm,
  lights_fragment_end: Tm,
  logdepthbuf_fragment: Am,
  logdepthbuf_pars_fragment: wm,
  logdepthbuf_pars_vertex: Rm,
  logdepthbuf_vertex: Cm,
  map_fragment: Pm,
  map_pars_fragment: Lm,
  map_particle_fragment: Im,
  map_particle_pars_fragment: Dm,
  metalnessmap_fragment: Nm,
  metalnessmap_pars_fragment: Um,
  morphinstance_vertex: Om,
  morphcolor_vertex: Fm,
  morphnormal_vertex: Bm,
  morphtarget_pars_vertex: zm,
  morphtarget_vertex: km,
  normal_fragment_begin: Hm,
  normal_fragment_maps: Vm,
  normal_pars_fragment: Gm,
  normal_pars_vertex: Wm,
  normal_vertex: Xm,
  normalmap_pars_fragment: $m,
  clearcoat_normal_fragment_begin: jm,
  clearcoat_normal_fragment_maps: qm,
  clearcoat_pars_fragment: Ym,
  iridescence_pars_fragment: Km,
  opaque_fragment: Zm,
  packing: Jm,
  premultiplied_alpha_fragment: Qm,
  project_vertex: tg,
  dithering_fragment: eg,
  dithering_pars_fragment: ng,
  roughnessmap_fragment: ig,
  roughnessmap_pars_fragment: sg,
  shadowmap_pars_fragment: rg,
  shadowmap_pars_vertex: og,
  shadowmap_vertex: ag,
  shadowmask_pars_fragment: cg,
  skinbase_vertex: lg,
  skinning_pars_vertex: hg,
  skinning_vertex: ug,
  skinnormal_vertex: dg,
  specularmap_fragment: fg,
  specularmap_pars_fragment: pg,
  tonemapping_fragment: mg,
  tonemapping_pars_fragment: gg,
  transmission_fragment: _g,
  transmission_pars_fragment: vg,
  uv_pars_fragment: xg,
  uv_pars_vertex: yg,
  uv_vertex: Mg,
  worldpos_vertex: Sg,
  background_vert: Eg,
  background_frag: bg,
  backgroundCube_vert: Tg,
  backgroundCube_frag: Ag,
  cube_vert: wg,
  cube_frag: Rg,
  depth_vert: Cg,
  depth_frag: Pg,
  distanceRGBA_vert: Lg,
  distanceRGBA_frag: Ig,
  equirect_vert: Dg,
  equirect_frag: Ng,
  linedashed_vert: Ug,
  linedashed_frag: Og,
  meshbasic_vert: Fg,
  meshbasic_frag: Bg,
  meshlambert_vert: zg,
  meshlambert_frag: kg,
  meshmatcap_vert: Hg,
  meshmatcap_frag: Vg,
  meshnormal_vert: Gg,
  meshnormal_frag: Wg,
  meshphong_vert: Xg,
  meshphong_frag: $g,
  meshphysical_vert: jg,
  meshphysical_frag: qg,
  meshtoon_vert: Yg,
  meshtoon_frag: Kg,
  points_vert: Zg,
  points_frag: Jg,
  shadow_vert: Qg,
  shadow_frag: t_,
  sprite_vert: e_,
  sprite_frag: n_
}, st = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Tt(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ft() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ft() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Ft() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Ft() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Ft() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Ft() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Ft() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Ft() },
    normalScale: { value: /* @__PURE__ */ new tt(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Ft() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Ft() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Ft() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Ft() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Tt(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Tt(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ft() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Ft() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Tt(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new tt(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Ft() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Ft() },
    alphaTest: { value: 0 }
  }
}, _n = {
  basic: {
    uniforms: /* @__PURE__ */ ke([
      st.common,
      st.specularmap,
      st.envmap,
      st.aomap,
      st.lightmap,
      st.fog
    ]),
    vertexShader: Ot.meshbasic_vert,
    fragmentShader: Ot.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ ke([
      st.common,
      st.specularmap,
      st.envmap,
      st.aomap,
      st.lightmap,
      st.emissivemap,
      st.bumpmap,
      st.normalmap,
      st.displacementmap,
      st.fog,
      st.lights,
      {
        emissive: { value: /* @__PURE__ */ new Tt(0) }
      }
    ]),
    vertexShader: Ot.meshlambert_vert,
    fragmentShader: Ot.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ ke([
      st.common,
      st.specularmap,
      st.envmap,
      st.aomap,
      st.lightmap,
      st.emissivemap,
      st.bumpmap,
      st.normalmap,
      st.displacementmap,
      st.fog,
      st.lights,
      {
        emissive: { value: /* @__PURE__ */ new Tt(0) },
        specular: { value: /* @__PURE__ */ new Tt(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Ot.meshphong_vert,
    fragmentShader: Ot.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ ke([
      st.common,
      st.envmap,
      st.aomap,
      st.lightmap,
      st.emissivemap,
      st.bumpmap,
      st.normalmap,
      st.displacementmap,
      st.roughnessmap,
      st.metalnessmap,
      st.fog,
      st.lights,
      {
        emissive: { value: /* @__PURE__ */ new Tt(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ot.meshphysical_vert,
    fragmentShader: Ot.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ ke([
      st.common,
      st.aomap,
      st.lightmap,
      st.emissivemap,
      st.bumpmap,
      st.normalmap,
      st.displacementmap,
      st.gradientmap,
      st.fog,
      st.lights,
      {
        emissive: { value: /* @__PURE__ */ new Tt(0) }
      }
    ]),
    vertexShader: Ot.meshtoon_vert,
    fragmentShader: Ot.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ ke([
      st.common,
      st.bumpmap,
      st.normalmap,
      st.displacementmap,
      st.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Ot.meshmatcap_vert,
    fragmentShader: Ot.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ ke([
      st.points,
      st.fog
    ]),
    vertexShader: Ot.points_vert,
    fragmentShader: Ot.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ ke([
      st.common,
      st.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ot.linedashed_vert,
    fragmentShader: Ot.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ ke([
      st.common,
      st.displacementmap
    ]),
    vertexShader: Ot.depth_vert,
    fragmentShader: Ot.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ ke([
      st.common,
      st.bumpmap,
      st.normalmap,
      st.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ot.meshnormal_vert,
    fragmentShader: Ot.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ ke([
      st.sprite,
      st.fog
    ]),
    vertexShader: Ot.sprite_vert,
    fragmentShader: Ot.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Ft() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ot.background_vert,
    fragmentShader: Ot.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Ft() }
    },
    vertexShader: Ot.backgroundCube_vert,
    fragmentShader: Ot.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ot.cube_vert,
    fragmentShader: Ot.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Ot.equirect_vert,
    fragmentShader: Ot.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ ke([
      st.common,
      st.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new w() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ot.distanceRGBA_vert,
    fragmentShader: Ot.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ ke([
      st.lights,
      st.fog,
      {
        color: { value: /* @__PURE__ */ new Tt(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ot.shadow_vert,
    fragmentShader: Ot.shadow_frag
  }
};
_n.physical = {
  uniforms: /* @__PURE__ */ ke([
    _n.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Ft() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Ft() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new tt(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Ft() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Ft() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Ft() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Tt(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Ft() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Ft() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Ft() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new tt() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Ft() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Tt(0) },
      specularColor: { value: /* @__PURE__ */ new Tt(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Ft() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Ft() },
      anisotropyVector: { value: /* @__PURE__ */ new tt() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Ft() }
    }
  ]),
  vertexShader: Ot.meshphysical_vert,
  fragmentShader: Ot.meshphysical_frag
};
const Sr = { r: 0, b: 0, g: 0 }, ci = /* @__PURE__ */ new yn(), i_ = /* @__PURE__ */ new Dt();
function s_(i, t, e, n, s, r, o) {
  const a = new Tt(0);
  let c = r === !0 ? 0 : 1, l, h, u = null, d = 0, f = null;
  function g(S) {
    let x = S.isScene === !0 ? S.background : null;
    return x && x.isTexture && (x = (S.backgroundBlurriness > 0 ? e : t).get(x)), x;
  }
  function _(S) {
    let x = !1;
    const M = g(S);
    M === null ? m(a, c) : M && M.isColor && (m(M, 1), x = !0);
    const P = i.xr.getEnvironmentBlendMode();
    P === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, o) : P === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, o), (i.autoClear || x) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function p(S, x) {
    const M = g(x);
    M && (M.isCubeTexture || M.mapping === co) ? (h === void 0 && (h = new ge(
      new ei(1, 1, 1),
      new Qn({
        name: "BackgroundCubeMaterial",
        uniforms: rs(_n.backgroundCube.uniforms),
        vertexShader: _n.backgroundCube.vertexShader,
        fragmentShader: _n.backgroundCube.fragmentShader,
        side: $e,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(P, R, A) {
      this.matrixWorld.copyPosition(A.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), s.update(h)), ci.copy(x.backgroundRotation), ci.x *= -1, ci.y *= -1, ci.z *= -1, M.isCubeTexture && M.isRenderTargetTexture === !1 && (ci.y *= -1, ci.z *= -1), h.material.uniforms.envMap.value = M, h.material.uniforms.flipEnvMap.value = M.isCubeTexture && M.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = x.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = x.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(i_.makeRotationFromEuler(ci)), h.material.toneMapped = qt.getTransfer(M.colorSpace) !== ue, (u !== M || d !== M.version || f !== i.toneMapping) && (h.material.needsUpdate = !0, u = M, d = M.version, f = i.toneMapping), h.layers.enableAll(), S.unshift(h, h.geometry, h.material, 0, 0, null)) : M && M.isTexture && (l === void 0 && (l = new ge(
      new ho(2, 2),
      new Qn({
        name: "BackgroundMaterial",
        uniforms: rs(_n.background.uniforms),
        vertexShader: _n.background.vertexShader,
        fragmentShader: _n.background.fragmentShader,
        side: Fn,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), s.update(l)), l.material.uniforms.t2D.value = M, l.material.uniforms.backgroundIntensity.value = x.backgroundIntensity, l.material.toneMapped = qt.getTransfer(M.colorSpace) !== ue, M.matrixAutoUpdate === !0 && M.updateMatrix(), l.material.uniforms.uvTransform.value.copy(M.matrix), (u !== M || d !== M.version || f !== i.toneMapping) && (l.material.needsUpdate = !0, u = M, d = M.version, f = i.toneMapping), l.layers.enableAll(), S.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function m(S, x) {
    S.getRGB(Sr, Cu(i)), n.buffers.color.setClear(Sr.r, Sr.g, Sr.b, x, o);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(S, x = 1) {
      a.set(S), c = x, m(a, c);
    },
    getClearAlpha: function() {
      return c;
    },
    setClearAlpha: function(S) {
      c = S, m(a, c);
    },
    render: _,
    addToRenderList: p
  };
}
function r_(i, t) {
  const e = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, s = d(null);
  let r = s, o = !1;
  function a(v, b, B, z, H) {
    let K = !1;
    const k = u(z, B, b);
    r !== k && (r = k, l(r.object)), K = f(v, z, B, H), K && g(v, z, B, H), H !== null && t.update(H, i.ELEMENT_ARRAY_BUFFER), (K || o) && (o = !1, M(v, b, B, z), H !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(H).buffer));
  }
  function c() {
    return i.createVertexArray();
  }
  function l(v) {
    return i.bindVertexArray(v);
  }
  function h(v) {
    return i.deleteVertexArray(v);
  }
  function u(v, b, B) {
    const z = B.wireframe === !0;
    let H = n[v.id];
    H === void 0 && (H = {}, n[v.id] = H);
    let K = H[b.id];
    K === void 0 && (K = {}, H[b.id] = K);
    let k = K[z];
    return k === void 0 && (k = d(c()), K[z] = k), k;
  }
  function d(v) {
    const b = [], B = [], z = [];
    for (let H = 0; H < e; H++)
      b[H] = 0, B[H] = 0, z[H] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: b,
      enabledAttributes: B,
      attributeDivisors: z,
      object: v,
      attributes: {},
      index: null
    };
  }
  function f(v, b, B, z) {
    const H = r.attributes, K = b.attributes;
    let k = 0;
    const nt = B.getAttributes();
    for (const W in nt)
      if (nt[W].location >= 0) {
        const dt = H[W];
        let Mt = K[W];
        if (Mt === void 0 && (W === "instanceMatrix" && v.instanceMatrix && (Mt = v.instanceMatrix), W === "instanceColor" && v.instanceColor && (Mt = v.instanceColor)), dt === void 0 || dt.attribute !== Mt || Mt && dt.data !== Mt.data) return !0;
        k++;
      }
    return r.attributesNum !== k || r.index !== z;
  }
  function g(v, b, B, z) {
    const H = {}, K = b.attributes;
    let k = 0;
    const nt = B.getAttributes();
    for (const W in nt)
      if (nt[W].location >= 0) {
        let dt = K[W];
        dt === void 0 && (W === "instanceMatrix" && v.instanceMatrix && (dt = v.instanceMatrix), W === "instanceColor" && v.instanceColor && (dt = v.instanceColor));
        const Mt = {};
        Mt.attribute = dt, dt && dt.data && (Mt.data = dt.data), H[W] = Mt, k++;
      }
    r.attributes = H, r.attributesNum = k, r.index = z;
  }
  function _() {
    const v = r.newAttributes;
    for (let b = 0, B = v.length; b < B; b++)
      v[b] = 0;
  }
  function p(v) {
    m(v, 0);
  }
  function m(v, b) {
    const B = r.newAttributes, z = r.enabledAttributes, H = r.attributeDivisors;
    B[v] = 1, z[v] === 0 && (i.enableVertexAttribArray(v), z[v] = 1), H[v] !== b && (i.vertexAttribDivisor(v, b), H[v] = b);
  }
  function S() {
    const v = r.newAttributes, b = r.enabledAttributes;
    for (let B = 0, z = b.length; B < z; B++)
      b[B] !== v[B] && (i.disableVertexAttribArray(B), b[B] = 0);
  }
  function x(v, b, B, z, H, K, k) {
    k === !0 ? i.vertexAttribIPointer(v, b, B, H, K) : i.vertexAttribPointer(v, b, B, z, H, K);
  }
  function M(v, b, B, z) {
    _();
    const H = z.attributes, K = B.getAttributes(), k = b.defaultAttributeValues;
    for (const nt in K) {
      const W = K[nt];
      if (W.location >= 0) {
        let ut = H[nt];
        if (ut === void 0 && (nt === "instanceMatrix" && v.instanceMatrix && (ut = v.instanceMatrix), nt === "instanceColor" && v.instanceColor && (ut = v.instanceColor)), ut !== void 0) {
          const dt = ut.normalized, Mt = ut.itemSize, Yt = t.get(ut);
          if (Yt === void 0) continue;
          const ee = Yt.buffer, $ = Yt.type, Q = Yt.bytesPerElement, xt = $ === i.INT || $ === i.UNSIGNED_INT || ut.gpuType === fc;
          if (ut.isInterleavedBufferAttribute) {
            const ft = ut.data, Nt = ft.stride, wt = ut.offset;
            if (ft.isInstancedInterleavedBuffer) {
              for (let Gt = 0; Gt < W.locationSize; Gt++)
                m(W.location + Gt, ft.meshPerAttribute);
              v.isInstancedMesh !== !0 && z._maxInstanceCount === void 0 && (z._maxInstanceCount = ft.meshPerAttribute * ft.count);
            } else
              for (let Gt = 0; Gt < W.locationSize; Gt++)
                p(W.location + Gt);
            i.bindBuffer(i.ARRAY_BUFFER, ee);
            for (let Gt = 0; Gt < W.locationSize; Gt++)
              x(
                W.location + Gt,
                Mt / W.locationSize,
                $,
                dt,
                Nt * Q,
                (wt + Mt / W.locationSize * Gt) * Q,
                xt
              );
          } else {
            if (ut.isInstancedBufferAttribute) {
              for (let ft = 0; ft < W.locationSize; ft++)
                m(W.location + ft, ut.meshPerAttribute);
              v.isInstancedMesh !== !0 && z._maxInstanceCount === void 0 && (z._maxInstanceCount = ut.meshPerAttribute * ut.count);
            } else
              for (let ft = 0; ft < W.locationSize; ft++)
                p(W.location + ft);
            i.bindBuffer(i.ARRAY_BUFFER, ee);
            for (let ft = 0; ft < W.locationSize; ft++)
              x(
                W.location + ft,
                Mt / W.locationSize,
                $,
                dt,
                Mt * Q,
                Mt / W.locationSize * ft * Q,
                xt
              );
          }
        } else if (k !== void 0) {
          const dt = k[nt];
          if (dt !== void 0)
            switch (dt.length) {
              case 2:
                i.vertexAttrib2fv(W.location, dt);
                break;
              case 3:
                i.vertexAttrib3fv(W.location, dt);
                break;
              case 4:
                i.vertexAttrib4fv(W.location, dt);
                break;
              default:
                i.vertexAttrib1fv(W.location, dt);
            }
        }
      }
    }
    S();
  }
  function P() {
    L();
    for (const v in n) {
      const b = n[v];
      for (const B in b) {
        const z = b[B];
        for (const H in z)
          h(z[H].object), delete z[H];
        delete b[B];
      }
      delete n[v];
    }
  }
  function R(v) {
    if (n[v.id] === void 0) return;
    const b = n[v.id];
    for (const B in b) {
      const z = b[B];
      for (const H in z)
        h(z[H].object), delete z[H];
      delete b[B];
    }
    delete n[v.id];
  }
  function A(v) {
    for (const b in n) {
      const B = n[b];
      if (B[v.id] === void 0) continue;
      const z = B[v.id];
      for (const H in z)
        h(z[H].object), delete z[H];
      delete B[v.id];
    }
  }
  function L() {
    G(), o = !0, r !== s && (r = s, l(r.object));
  }
  function G() {
    s.geometry = null, s.program = null, s.wireframe = !1;
  }
  return {
    setup: a,
    reset: L,
    resetDefaultState: G,
    dispose: P,
    releaseStatesOfGeometry: R,
    releaseStatesOfProgram: A,
    initAttributes: _,
    enableAttribute: p,
    disableUnusedAttributes: S
  };
}
function o_(i, t, e) {
  let n;
  function s(l) {
    n = l;
  }
  function r(l, h) {
    i.drawArrays(n, l, h), e.update(h, n, 1);
  }
  function o(l, h, u) {
    u !== 0 && (i.drawArraysInstanced(n, l, h, u), e.update(h, n, u));
  }
  function a(l, h, u) {
    if (u === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, l, 0, h, 0, u);
    let f = 0;
    for (let g = 0; g < u; g++)
      f += h[g];
    e.update(f, n, 1);
  }
  function c(l, h, u, d) {
    if (u === 0) return;
    const f = t.get("WEBGL_multi_draw");
    if (f === null)
      for (let g = 0; g < l.length; g++)
        o(l[g], h[g], d[g]);
    else {
      f.multiDrawArraysInstancedWEBGL(n, l, 0, h, 0, d, 0, u);
      let g = 0;
      for (let _ = 0; _ < u; _++)
        g += h[_];
      for (let _ = 0; _ < d.length; _++)
        e.update(g, n, d[_]);
    }
  }
  this.setMode = s, this.render = r, this.renderInstances = o, this.renderMultiDraw = a, this.renderMultiDrawInstances = c;
}
function a_(i, t, e, n) {
  let s;
  function r() {
    if (s !== void 0) return s;
    if (t.has("EXT_texture_filter_anisotropic") === !0) {
      const A = t.get("EXT_texture_filter_anisotropic");
      s = i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      s = 0;
    return s;
  }
  function o(A) {
    return !(A !== rn && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(A) {
    const L = A === Qs && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(A !== Bn && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    A !== mn && !L);
  }
  function c(A) {
    if (A === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      A = "mediump";
    }
    return A === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let l = e.precision !== void 0 ? e.precision : "highp";
  const h = c(l);
  h !== l && (console.warn("THREE.WebGLRenderer:", l, "not supported, using", h, "instead."), l = h);
  const u = e.logarithmicDepthBuffer === !0, d = e.reverseDepthBuffer === !0 && t.has("EXT_clip_control");
  if (d === !0) {
    const A = t.get("EXT_clip_control");
    A.clipControlEXT(A.LOWER_LEFT_EXT, A.ZERO_TO_ONE_EXT);
  }
  const f = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_TEXTURE_SIZE), p = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), m = i.getParameter(i.MAX_VERTEX_ATTRIBS), S = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), x = i.getParameter(i.MAX_VARYING_VECTORS), M = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), P = g > 0, R = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: r,
    getMaxPrecision: c,
    textureFormatReadable: o,
    textureTypeReadable: a,
    precision: l,
    logarithmicDepthBuffer: u,
    reverseDepthBuffer: d,
    maxTextures: f,
    maxVertexTextures: g,
    maxTextureSize: _,
    maxCubemapSize: p,
    maxAttributes: m,
    maxVertexUniforms: S,
    maxVaryings: x,
    maxFragmentUniforms: M,
    vertexTextures: P,
    maxSamples: R
  };
}
function c_(i) {
  const t = this;
  let e = null, n = 0, s = !1, r = !1;
  const o = new Nn(), a = new Ft(), c = { value: null, needsUpdate: !1 };
  this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, d) {
    const f = u.length !== 0 || d || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || s;
    return s = d, n = u.length, f;
  }, this.beginShadows = function() {
    r = !0, h(null);
  }, this.endShadows = function() {
    r = !1;
  }, this.setGlobalState = function(u, d) {
    e = h(u, d, 0);
  }, this.setState = function(u, d, f) {
    const g = u.clippingPlanes, _ = u.clipIntersection, p = u.clipShadows, m = i.get(u);
    if (!s || g === null || g.length === 0 || r && !p)
      r ? h(null) : l();
    else {
      const S = r ? 0 : n, x = S * 4;
      let M = m.clippingState || null;
      c.value = M, M = h(g, d, x, f);
      for (let P = 0; P !== x; ++P)
        M[P] = e[P];
      m.clippingState = M, this.numIntersection = _ ? this.numPlanes : 0, this.numPlanes += S;
    }
  };
  function l() {
    c.value !== e && (c.value = e, c.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function h(u, d, f, g) {
    const _ = u !== null ? u.length : 0;
    let p = null;
    if (_ !== 0) {
      if (p = c.value, g !== !0 || p === null) {
        const m = f + _ * 4, S = d.matrixWorldInverse;
        a.getNormalMatrix(S), (p === null || p.length < m) && (p = new Float32Array(m));
        for (let x = 0, M = f; x !== _; ++x, M += 4)
          o.copy(u[x]).applyMatrix4(S, a), o.normal.toArray(p, M), p[M + 3] = o.constant;
      }
      c.value = p, c.needsUpdate = !0;
    }
    return t.numPlanes = _, t.numIntersection = 0, p;
  }
}
function l_(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(o, a) {
    return a === xa ? o.mapping = Qi : a === ya && (o.mapping = ts), o;
  }
  function n(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === xa || a === ya)
        if (t.has(o)) {
          const c = t.get(o).texture;
          return e(c, o.mapping);
        } else {
          const c = o.image;
          if (c && c.height > 0) {
            const l = new yp(c.height);
            return l.fromEquirectangularTexture(i, o), t.set(o, l), o.addEventListener("dispose", s), e(l.texture, o.mapping);
          } else
            return null;
        }
    }
    return o;
  }
  function s(o) {
    const a = o.target;
    a.removeEventListener("dispose", s);
    const c = t.get(a);
    c !== void 0 && (t.delete(a), c.dispose());
  }
  function r() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: r
  };
}
class bc extends Pu {
  constructor(t = -1, e = 1, n = 1, s = -1, r = 0.1, o = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = s, this.near = r, this.far = o, this.updateProjectionMatrix();
  }
  copy(t, e) {
    return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = t.view === null ? null : Object.assign({}, t.view), this;
  }
  setViewOffset(t, e, n, s, r, o) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const t = (this.right - this.left) / (2 * this.zoom), e = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, s = (this.top + this.bottom) / 2;
    let r = n - t, o = n + t, a = s + e, c = s - e;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += l * this.view.offsetX, o = r + l * this.view.width, a -= h * this.view.offsetY, c = a - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, o, a, c, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, this.view !== null && (e.object.view = Object.assign({}, this.view)), e;
  }
}
const Vi = 4, Nl = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], fi = 20, Go = /* @__PURE__ */ new bc(), Ul = /* @__PURE__ */ new Tt();
let Wo = null, Xo = 0, $o = 0, jo = !1;
const ui = (1 + Math.sqrt(5)) / 2, Ni = 1 / ui, Ol = [
  /* @__PURE__ */ new w(-ui, Ni, 0),
  /* @__PURE__ */ new w(ui, Ni, 0),
  /* @__PURE__ */ new w(-Ni, 0, ui),
  /* @__PURE__ */ new w(Ni, 0, ui),
  /* @__PURE__ */ new w(0, ui, -Ni),
  /* @__PURE__ */ new w(0, ui, Ni),
  /* @__PURE__ */ new w(-1, 1, -1),
  /* @__PURE__ */ new w(1, 1, -1),
  /* @__PURE__ */ new w(-1, 1, 1),
  /* @__PURE__ */ new w(1, 1, 1)
];
class Fl {
  constructor(t) {
    this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(t, e = 0, n = 0.1, s = 100) {
    Wo = this._renderer.getRenderTarget(), Xo = this._renderer.getActiveCubeFace(), $o = this._renderer.getActiveMipmapLevel(), jo = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
    const r = this._allocateTargets();
    return r.depthBuffer = !0, this._sceneToCubeUV(t, n, s, r), e > 0 && this._blur(r, 0, 0, e), this._applyPMREM(r), this._cleanup(r), r;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   */
  fromEquirectangular(t, e = null) {
    return this._fromTexture(t, e);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   */
  fromCubemap(t, e = null) {
    return this._fromTexture(t, e);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = kl(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = zl(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(t) {
    this._lodMax = Math.floor(Math.log2(t)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let t = 0; t < this._lodPlanes.length; t++)
      this._lodPlanes[t].dispose();
  }
  _cleanup(t) {
    this._renderer.setRenderTarget(Wo, Xo, $o), this._renderer.xr.enabled = jo, t.scissorTest = !1, Er(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, e) {
    t.mapping === Qi || t.mapping === ts ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), Wo = this._renderer.getRenderTarget(), Xo = this._renderer.getActiveCubeFace(), $o = this._renderer.getActiveMipmapLevel(), jo = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = e || this._allocateTargets();
    return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = {
      magFilter: Qe,
      minFilter: Qe,
      generateMipmaps: !1,
      type: Qs,
      format: rn,
      colorSpace: De,
      depthBuffer: !1
    }, s = Bl(t, e, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Bl(t, e, n);
      const { _lodMax: r } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = h_(r)), this._blurMaterial = u_(r, t, e);
    }
    return s;
  }
  _compileMaterial(t) {
    const e = new ge(this._lodPlanes[0], t);
    this._renderer.compile(e, Go);
  }
  _sceneToCubeUV(t, e, n, s) {
    const a = new Be(90, 1, e, n), c = [1, -1, 1, 1, 1, 1], l = [1, 1, 1, -1, -1, -1], h = this._renderer, u = h.autoClear, d = h.toneMapping;
    h.getClearColor(Ul), h.toneMapping = Jn, h.autoClear = !1;
    const f = new vn({
      name: "PMREM.Background",
      side: $e,
      depthWrite: !1,
      depthTest: !1
    }), g = new ge(new ei(), f);
    let _ = !1;
    const p = t.background;
    p ? p.isColor && (f.color.copy(p), t.background = null, _ = !0) : (f.color.copy(Ul), _ = !0);
    for (let m = 0; m < 6; m++) {
      const S = m % 3;
      S === 0 ? (a.up.set(0, c[m], 0), a.lookAt(l[m], 0, 0)) : S === 1 ? (a.up.set(0, 0, c[m]), a.lookAt(0, l[m], 0)) : (a.up.set(0, c[m], 0), a.lookAt(0, 0, l[m]));
      const x = this._cubeSize;
      Er(s, S * x, m > 2 ? x : 0, x, x), h.setRenderTarget(s), _ && h.render(g, a), h.render(t, a);
    }
    g.geometry.dispose(), g.material.dispose(), h.toneMapping = d, h.autoClear = u, t.background = p;
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer, s = t.mapping === Qi || t.mapping === ts;
    s ? (this._cubemapMaterial === null && (this._cubemapMaterial = kl()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = zl());
    const r = s ? this._cubemapMaterial : this._equirectMaterial, o = new ge(this._lodPlanes[0], r), a = r.uniforms;
    a.envMap.value = t;
    const c = this._cubeSize;
    Er(e, 0, 0, 3 * c, 2 * c), n.setRenderTarget(e), n.render(o, Go);
  }
  _applyPMREM(t) {
    const e = this._renderer, n = e.autoClear;
    e.autoClear = !1;
    const s = this._lodPlanes.length;
    for (let r = 1; r < s; r++) {
      const o = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), a = Ol[(s - r - 1) % Ol.length];
      this._blur(t, r - 1, r, o, a);
    }
    e.autoClear = n;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(t, e, n, s, r) {
    const o = this._pingPongRenderTarget;
    this._halfBlur(
      t,
      o,
      e,
      n,
      s,
      "latitudinal",
      r
    ), this._halfBlur(
      o,
      t,
      n,
      n,
      s,
      "longitudinal",
      r
    );
  }
  _halfBlur(t, e, n, s, r, o, a) {
    const c = this._renderer, l = this._blurMaterial;
    o !== "latitudinal" && o !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, u = new ge(this._lodPlanes[s], l), d = l.uniforms, f = this._sizeLods[n] - 1, g = isFinite(r) ? Math.PI / (2 * f) : 2 * Math.PI / (2 * fi - 1), _ = r / g, p = isFinite(r) ? 1 + Math.floor(h * _) : fi;
    p > fi && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${fi}`);
    const m = [];
    let S = 0;
    for (let A = 0; A < fi; ++A) {
      const L = A / _, G = Math.exp(-L * L / 2);
      m.push(G), A === 0 ? S += G : A < p && (S += 2 * G);
    }
    for (let A = 0; A < m.length; A++)
      m[A] = m[A] / S;
    d.envMap.value = t.texture, d.samples.value = p, d.weights.value = m, d.latitudinal.value = o === "latitudinal", a && (d.poleAxis.value = a);
    const { _lodMax: x } = this;
    d.dTheta.value = g, d.mipInt.value = x - n;
    const M = this._sizeLods[s], P = 3 * M * (s > x - Vi ? s - x + Vi : 0), R = 4 * (this._cubeSize - M);
    Er(e, P, R, 3 * M, 2 * M), c.setRenderTarget(e), c.render(u, Go);
  }
}
function h_(i) {
  const t = [], e = [], n = [];
  let s = i;
  const r = i - Vi + 1 + Nl.length;
  for (let o = 0; o < r; o++) {
    const a = Math.pow(2, s);
    e.push(a);
    let c = 1 / a;
    o > i - Vi ? c = Nl[o - i + Vi - 1] : o === 0 && (c = 0), n.push(c);
    const l = 1 / (a - 2), h = -l, u = 1 + l, d = [h, h, u, h, u, u, h, h, u, u, h, u], f = 6, g = 6, _ = 3, p = 2, m = 1, S = new Float32Array(_ * g * f), x = new Float32Array(p * g * f), M = new Float32Array(m * g * f);
    for (let R = 0; R < f; R++) {
      const A = R % 3 * 2 / 3 - 1, L = R > 2 ? 0 : -1, G = [
        A,
        L,
        0,
        A + 2 / 3,
        L,
        0,
        A + 2 / 3,
        L + 1,
        0,
        A,
        L,
        0,
        A + 2 / 3,
        L + 1,
        0,
        A,
        L + 1,
        0
      ];
      S.set(G, _ * g * R), x.set(d, p * g * R);
      const v = [R, R, R, R, R, R];
      M.set(v, m * g * R);
    }
    const P = new Pe();
    P.setAttribute("position", new Ie(S, _)), P.setAttribute("uv", new Ie(x, p)), P.setAttribute("faceIndex", new Ie(M, m)), t.push(P), s > Vi && s--;
  }
  return { lodPlanes: t, sizeLods: e, sigmas: n };
}
function Bl(i, t, e) {
  const n = new _i(i, t, e);
  return n.texture.mapping = co, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function Er(i, t, e, n, s) {
  i.viewport.set(t, e, n, s), i.scissor.set(t, e, n, s);
}
function u_(i, t, e) {
  const n = new Float32Array(fi), s = new w(0, 1, 0);
  return new Qn({
    name: "SphericalGaussianBlur",
    defines: {
      n: fi,
      CUBEUV_TEXEL_WIDTH: 1 / t,
      CUBEUV_TEXEL_HEIGHT: 1 / e,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: s }
    },
    vertexShader: Tc(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: Zn,
    depthTest: !1,
    depthWrite: !1
  });
}
function zl() {
  return new Qn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Tc(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: Zn,
    depthTest: !1,
    depthWrite: !1
  });
}
function kl() {
  return new Qn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Tc(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: Zn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Tc() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function d_(i) {
  let t = /* @__PURE__ */ new WeakMap(), e = null;
  function n(a) {
    if (a && a.isTexture) {
      const c = a.mapping, l = c === xa || c === ya, h = c === Qi || c === ts;
      if (l || h) {
        let u = t.get(a);
        const d = u !== void 0 ? u.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== d)
          return e === null && (e = new Fl(i)), u = l ? e.fromEquirectangular(a, u) : e.fromCubemap(a, u), u.texture.pmremVersion = a.pmremVersion, t.set(a, u), u.texture;
        if (u !== void 0)
          return u.texture;
        {
          const f = a.image;
          return l && f && f.height > 0 || h && f && s(f) ? (e === null && (e = new Fl(i)), u = l ? e.fromEquirectangular(a) : e.fromCubemap(a), u.texture.pmremVersion = a.pmremVersion, t.set(a, u), a.addEventListener("dispose", r), u.texture) : null;
        }
      }
    }
    return a;
  }
  function s(a) {
    let c = 0;
    const l = 6;
    for (let h = 0; h < l; h++)
      a[h] !== void 0 && c++;
    return c === l;
  }
  function r(a) {
    const c = a.target;
    c.removeEventListener("dispose", r);
    const l = t.get(c);
    l !== void 0 && (t.delete(c), l.dispose());
  }
  function o() {
    t = /* @__PURE__ */ new WeakMap(), e !== null && (e.dispose(), e = null);
  }
  return {
    get: n,
    dispose: o
  };
}
function f_(i) {
  const t = {};
  function e(n) {
    if (t[n] !== void 0)
      return t[n];
    let s;
    switch (n) {
      case "WEBGL_depth_texture":
        s = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        s = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        s = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        s = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        s = i.getExtension(n);
    }
    return t[n] = s, s;
  }
  return {
    has: function(n) {
      return e(n) !== null;
    },
    init: function() {
      e("EXT_color_buffer_float"), e("WEBGL_clip_cull_distance"), e("OES_texture_float_linear"), e("EXT_color_buffer_half_float"), e("WEBGL_multisampled_render_to_texture"), e("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const s = e(n);
      return s === null && qr("THREE.WebGLRenderer: " + n + " extension not supported."), s;
    }
  };
}
function p_(i, t, e, n) {
  const s = {}, r = /* @__PURE__ */ new WeakMap();
  function o(u) {
    const d = u.target;
    d.index !== null && t.remove(d.index);
    for (const g in d.attributes)
      t.remove(d.attributes[g]);
    for (const g in d.morphAttributes) {
      const _ = d.morphAttributes[g];
      for (let p = 0, m = _.length; p < m; p++)
        t.remove(_[p]);
    }
    d.removeEventListener("dispose", o), delete s[d.id];
    const f = r.get(d);
    f && (t.remove(f), r.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount, e.memory.geometries--;
  }
  function a(u, d) {
    return s[d.id] === !0 || (d.addEventListener("dispose", o), s[d.id] = !0, e.memory.geometries++), d;
  }
  function c(u) {
    const d = u.attributes;
    for (const g in d)
      t.update(d[g], i.ARRAY_BUFFER);
    const f = u.morphAttributes;
    for (const g in f) {
      const _ = f[g];
      for (let p = 0, m = _.length; p < m; p++)
        t.update(_[p], i.ARRAY_BUFFER);
    }
  }
  function l(u) {
    const d = [], f = u.index, g = u.attributes.position;
    let _ = 0;
    if (f !== null) {
      const S = f.array;
      _ = f.version;
      for (let x = 0, M = S.length; x < M; x += 3) {
        const P = S[x + 0], R = S[x + 1], A = S[x + 2];
        d.push(P, R, R, A, A, P);
      }
    } else if (g !== void 0) {
      const S = g.array;
      _ = g.version;
      for (let x = 0, M = S.length / 3 - 1; x < M; x += 3) {
        const P = x + 0, R = x + 1, A = x + 2;
        d.push(P, R, R, A, A, P);
      }
    } else
      return;
    const p = new (Eu(d) ? Ru : wu)(d, 1);
    p.version = _;
    const m = r.get(u);
    m && t.remove(m), r.set(u, p);
  }
  function h(u) {
    const d = r.get(u);
    if (d) {
      const f = u.index;
      f !== null && d.version < f.version && l(u);
    } else
      l(u);
    return r.get(u);
  }
  return {
    get: a,
    update: c,
    getWireframeAttribute: h
  };
}
function m_(i, t, e) {
  let n;
  function s(d) {
    n = d;
  }
  let r, o;
  function a(d) {
    r = d.type, o = d.bytesPerElement;
  }
  function c(d, f) {
    i.drawElements(n, f, r, d * o), e.update(f, n, 1);
  }
  function l(d, f, g) {
    g !== 0 && (i.drawElementsInstanced(n, f, r, d * o, g), e.update(f, n, g));
  }
  function h(d, f, g) {
    if (g === 0) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, f, 0, r, d, 0, g);
    let p = 0;
    for (let m = 0; m < g; m++)
      p += f[m];
    e.update(p, n, 1);
  }
  function u(d, f, g, _) {
    if (g === 0) return;
    const p = t.get("WEBGL_multi_draw");
    if (p === null)
      for (let m = 0; m < d.length; m++)
        l(d[m] / o, f[m], _[m]);
    else {
      p.multiDrawElementsInstancedWEBGL(n, f, 0, r, d, 0, _, 0, g);
      let m = 0;
      for (let S = 0; S < g; S++)
        m += f[S];
      for (let S = 0; S < _.length; S++)
        e.update(m, n, _[S]);
    }
  }
  this.setMode = s, this.setIndex = a, this.render = c, this.renderInstances = l, this.renderMultiDraw = h, this.renderMultiDrawInstances = u;
}
function g_(i) {
  const t = {
    geometries: 0,
    textures: 0
  }, e = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(r, o, a) {
    switch (e.calls++, o) {
      case i.TRIANGLES:
        e.triangles += a * (r / 3);
        break;
      case i.LINES:
        e.lines += a * (r / 2);
        break;
      case i.LINE_STRIP:
        e.lines += a * (r - 1);
        break;
      case i.LINE_LOOP:
        e.lines += a * r;
        break;
      case i.POINTS:
        e.points += a * r;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function s() {
    e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0;
  }
  return {
    memory: t,
    render: e,
    programs: null,
    autoReset: !0,
    reset: s,
    update: n
  };
}
function __(i, t, e) {
  const n = /* @__PURE__ */ new WeakMap(), s = new Zt();
  function r(o, a, c) {
    const l = o.morphTargetInfluences, h = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, u = h !== void 0 ? h.length : 0;
    let d = n.get(a);
    if (d === void 0 || d.count !== u) {
      let G = function() {
        A.dispose(), n.delete(a), a.removeEventListener("dispose", G);
      };
      d !== void 0 && d.texture.dispose();
      const f = a.morphAttributes.position !== void 0, g = a.morphAttributes.normal !== void 0, _ = a.morphAttributes.color !== void 0, p = a.morphAttributes.position || [], m = a.morphAttributes.normal || [], S = a.morphAttributes.color || [];
      let x = 0;
      f === !0 && (x = 1), g === !0 && (x = 2), _ === !0 && (x = 3);
      let M = a.attributes.position.count * x, P = 1;
      M > t.maxTextureSize && (P = Math.ceil(M / t.maxTextureSize), M = t.maxTextureSize);
      const R = new Float32Array(M * P * 4 * u), A = new Tu(R, M, P, u);
      A.type = mn, A.needsUpdate = !0;
      const L = x * 4;
      for (let v = 0; v < u; v++) {
        const b = p[v], B = m[v], z = S[v], H = M * P * 4 * v;
        for (let K = 0; K < b.count; K++) {
          const k = K * L;
          f === !0 && (s.fromBufferAttribute(b, K), R[H + k + 0] = s.x, R[H + k + 1] = s.y, R[H + k + 2] = s.z, R[H + k + 3] = 0), g === !0 && (s.fromBufferAttribute(B, K), R[H + k + 4] = s.x, R[H + k + 5] = s.y, R[H + k + 6] = s.z, R[H + k + 7] = 0), _ === !0 && (s.fromBufferAttribute(z, K), R[H + k + 8] = s.x, R[H + k + 9] = s.y, R[H + k + 10] = s.z, R[H + k + 11] = z.itemSize === 4 ? s.w : 1);
        }
      }
      d = {
        count: u,
        texture: A,
        size: new tt(M, P)
      }, n.set(a, d), a.addEventListener("dispose", G);
    }
    if (o.isInstancedMesh === !0 && o.morphTexture !== null)
      c.getUniforms().setValue(i, "morphTexture", o.morphTexture, e);
    else {
      let f = 0;
      for (let _ = 0; _ < l.length; _++)
        f += l[_];
      const g = a.morphTargetsRelative ? 1 : 1 - f;
      c.getUniforms().setValue(i, "morphTargetBaseInfluence", g), c.getUniforms().setValue(i, "morphTargetInfluences", l);
    }
    c.getUniforms().setValue(i, "morphTargetsTexture", d.texture, e), c.getUniforms().setValue(i, "morphTargetsTextureSize", d.size);
  }
  return {
    update: r
  };
}
function v_(i, t, e, n) {
  let s = /* @__PURE__ */ new WeakMap();
  function r(c) {
    const l = n.render.frame, h = c.geometry, u = t.get(c, h);
    if (s.get(u) !== l && (t.update(u), s.set(u, l)), c.isInstancedMesh && (c.hasEventListener("dispose", a) === !1 && c.addEventListener("dispose", a), s.get(c) !== l && (e.update(c.instanceMatrix, i.ARRAY_BUFFER), c.instanceColor !== null && e.update(c.instanceColor, i.ARRAY_BUFFER), s.set(c, l))), c.isSkinnedMesh) {
      const d = c.skeleton;
      s.get(d) !== l && (d.update(), s.set(d, l));
    }
    return u;
  }
  function o() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function a(c) {
    const l = c.target;
    l.removeEventListener("dispose", a), e.remove(l.instanceMatrix), l.instanceColor !== null && e.remove(l.instanceColor);
  }
  return {
    update: r,
    dispose: o
  };
}
class Du extends be {
  constructor(t, e, n, s, r, o, a, c, l, h = $i) {
    if (h !== $i && h !== is)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === $i && (n = gi), n === void 0 && h === is && (n = ns), super(null, s, r, o, a, c, h, n, l), this.isDepthTexture = !0, this.image = { width: t, height: e }, this.magFilter = a !== void 0 ? a : Ve, this.minFilter = c !== void 0 ? c : Ve, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(t) {
    return super.copy(t), this.compareFunction = t.compareFunction, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}
const Nu = /* @__PURE__ */ new be(), Hl = /* @__PURE__ */ new Du(1, 1), Uu = /* @__PURE__ */ new Tu(), Ou = /* @__PURE__ */ new sp(), Fu = /* @__PURE__ */ new Lu(), Vl = [], Gl = [], Wl = new Float32Array(16), Xl = new Float32Array(9), $l = new Float32Array(4);
function hs(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const s = t * e;
  let r = Vl[s];
  if (r === void 0 && (r = new Float32Array(s), Vl[s] = r), t !== 0) {
    n.toArray(r, 0);
    for (let o = 1, a = 0; o !== t; ++o)
      a += e, i[o].toArray(r, a);
  }
  return r;
}
function Te(i, t) {
  if (i.length !== t.length) return !1;
  for (let e = 0, n = i.length; e < n; e++)
    if (i[e] !== t[e]) return !1;
  return !0;
}
function Ae(i, t) {
  for (let e = 0, n = t.length; e < n; e++)
    i[e] = t[e];
}
function uo(i, t) {
  let e = Gl[t];
  e === void 0 && (e = new Int32Array(t), Gl[t] = e);
  for (let n = 0; n !== t; ++n)
    e[n] = i.allocateTextureUnit();
  return e;
}
function x_(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
}
function y_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (Te(e, t)) return;
    i.uniform2fv(this.addr, t), Ae(e, t);
  }
}
function M_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else if (t.r !== void 0)
    (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
  else {
    if (Te(e, t)) return;
    i.uniform3fv(this.addr, t), Ae(e, t);
  }
}
function S_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (Te(e, t)) return;
    i.uniform4fv(this.addr, t), Ae(e, t);
  }
}
function E_(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (Te(e, t)) return;
    i.uniformMatrix2fv(this.addr, !1, t), Ae(e, t);
  } else {
    if (Te(e, n)) return;
    $l.set(n), i.uniformMatrix2fv(this.addr, !1, $l), Ae(e, n);
  }
}
function b_(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (Te(e, t)) return;
    i.uniformMatrix3fv(this.addr, !1, t), Ae(e, t);
  } else {
    if (Te(e, n)) return;
    Xl.set(n), i.uniformMatrix3fv(this.addr, !1, Xl), Ae(e, n);
  }
}
function T_(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (Te(e, t)) return;
    i.uniformMatrix4fv(this.addr, !1, t), Ae(e, t);
  } else {
    if (Te(e, n)) return;
    Wl.set(n), i.uniformMatrix4fv(this.addr, !1, Wl), Ae(e, n);
  }
}
function A_(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
}
function w_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (Te(e, t)) return;
    i.uniform2iv(this.addr, t), Ae(e, t);
  }
}
function R_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (Te(e, t)) return;
    i.uniform3iv(this.addr, t), Ae(e, t);
  }
}
function C_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (Te(e, t)) return;
    i.uniform4iv(this.addr, t), Ae(e, t);
  }
}
function P_(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
}
function L_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (Te(e, t)) return;
    i.uniform2uiv(this.addr, t), Ae(e, t);
  }
}
function I_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (Te(e, t)) return;
    i.uniform3uiv(this.addr, t), Ae(e, t);
  }
}
function D_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (Te(e, t)) return;
    i.uniform4uiv(this.addr, t), Ae(e, t);
  }
}
function N_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s);
  let r;
  this.type === i.SAMPLER_2D_SHADOW ? (Hl.compareFunction = Su, r = Hl) : r = Nu, e.setTexture2D(t || r, s);
}
function U_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture3D(t || Ou, s);
}
function O_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTextureCube(t || Fu, s);
}
function F_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture2DArray(t || Uu, s);
}
function B_(i) {
  switch (i) {
    case 5126:
      return x_;
    case 35664:
      return y_;
    case 35665:
      return M_;
    case 35666:
      return S_;
    case 35674:
      return E_;
    case 35675:
      return b_;
    case 35676:
      return T_;
    case 5124:
    case 35670:
      return A_;
    case 35667:
    case 35671:
      return w_;
    case 35668:
    case 35672:
      return R_;
    case 35669:
    case 35673:
      return C_;
    case 5125:
      return P_;
    case 36294:
      return L_;
    case 36295:
      return I_;
    case 36296:
      return D_;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return N_;
    case 35679:
    case 36299:
    case 36307:
      return U_;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return O_;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return F_;
  }
}
function z_(i, t) {
  i.uniform1fv(this.addr, t);
}
function k_(i, t) {
  const e = hs(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function H_(i, t) {
  const e = hs(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function V_(i, t) {
  const e = hs(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function G_(i, t) {
  const e = hs(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, e);
}
function W_(i, t) {
  const e = hs(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, e);
}
function X_(i, t) {
  const e = hs(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, e);
}
function $_(i, t) {
  i.uniform1iv(this.addr, t);
}
function j_(i, t) {
  i.uniform2iv(this.addr, t);
}
function q_(i, t) {
  i.uniform3iv(this.addr, t);
}
function Y_(i, t) {
  i.uniform4iv(this.addr, t);
}
function K_(i, t) {
  i.uniform1uiv(this.addr, t);
}
function Z_(i, t) {
  i.uniform2uiv(this.addr, t);
}
function J_(i, t) {
  i.uniform3uiv(this.addr, t);
}
function Q_(i, t) {
  i.uniform4uiv(this.addr, t);
}
function t0(i, t, e) {
  const n = this.cache, s = t.length, r = uo(e, s);
  Te(n, r) || (i.uniform1iv(this.addr, r), Ae(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTexture2D(t[o] || Nu, r[o]);
}
function e0(i, t, e) {
  const n = this.cache, s = t.length, r = uo(e, s);
  Te(n, r) || (i.uniform1iv(this.addr, r), Ae(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTexture3D(t[o] || Ou, r[o]);
}
function n0(i, t, e) {
  const n = this.cache, s = t.length, r = uo(e, s);
  Te(n, r) || (i.uniform1iv(this.addr, r), Ae(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTextureCube(t[o] || Fu, r[o]);
}
function i0(i, t, e) {
  const n = this.cache, s = t.length, r = uo(e, s);
  Te(n, r) || (i.uniform1iv(this.addr, r), Ae(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTexture2DArray(t[o] || Uu, r[o]);
}
function s0(i) {
  switch (i) {
    case 5126:
      return z_;
    case 35664:
      return k_;
    case 35665:
      return H_;
    case 35666:
      return V_;
    case 35674:
      return G_;
    case 35675:
      return W_;
    case 35676:
      return X_;
    case 5124:
    case 35670:
      return $_;
    case 35667:
    case 35671:
      return j_;
    case 35668:
    case 35672:
      return q_;
    case 35669:
    case 35673:
      return Y_;
    case 5125:
      return K_;
    case 36294:
      return Z_;
    case 36295:
      return J_;
    case 36296:
      return Q_;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return t0;
    case 35679:
    case 36299:
    case 36307:
      return e0;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return n0;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return i0;
  }
}
class r0 {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = B_(e.type);
  }
}
class o0 {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = s0(e.type);
  }
}
class a0 {
  constructor(t) {
    this.id = t, this.seq = [], this.map = {};
  }
  setValue(t, e, n) {
    const s = this.seq;
    for (let r = 0, o = s.length; r !== o; ++r) {
      const a = s[r];
      a.setValue(t, e[a.id], n);
    }
  }
}
const qo = /(\w+)(\])?(\[|\.)?/g;
function jl(i, t) {
  i.seq.push(t), i.map[t.id] = t;
}
function c0(i, t, e) {
  const n = i.name, s = n.length;
  for (qo.lastIndex = 0; ; ) {
    const r = qo.exec(n), o = qo.lastIndex;
    let a = r[1];
    const c = r[2] === "]", l = r[3];
    if (c && (a = a | 0), l === void 0 || l === "[" && o + 2 === s) {
      jl(e, l === void 0 ? new r0(a, i, t) : new o0(a, i, t));
      break;
    } else {
      let u = e.map[a];
      u === void 0 && (u = new a0(a), jl(e, u)), e = u;
    }
  }
}
class Yr {
  constructor(t, e) {
    this.seq = [], this.map = {};
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let s = 0; s < n; ++s) {
      const r = t.getActiveUniform(e, s), o = t.getUniformLocation(e, r.name);
      c0(r, o, this);
    }
  }
  setValue(t, e, n, s) {
    const r = this.map[e];
    r !== void 0 && r.setValue(t, n, s);
  }
  setOptional(t, e, n) {
    const s = e[n];
    s !== void 0 && this.setValue(t, n, s);
  }
  static upload(t, e, n, s) {
    for (let r = 0, o = e.length; r !== o; ++r) {
      const a = e[r], c = n[a.id];
      c.needsUpdate !== !1 && a.setValue(t, c.value, s);
    }
  }
  static seqWithValue(t, e) {
    const n = [];
    for (let s = 0, r = t.length; s !== r; ++s) {
      const o = t[s];
      o.id in e && n.push(o);
    }
    return n;
  }
}
function ql(i, t, e) {
  const n = i.createShader(t);
  return i.shaderSource(n, e), i.compileShader(n), n;
}
const l0 = 37297;
let h0 = 0;
function u0(i, t) {
  const e = i.split(`
`), n = [], s = Math.max(t - 6, 0), r = Math.min(t + 6, e.length);
  for (let o = s; o < r; o++) {
    const a = o + 1;
    n.push(`${a === t ? ">" : " "} ${a}: ${e[o]}`);
  }
  return n.join(`
`);
}
function d0(i) {
  const t = qt.getPrimaries(qt.workingColorSpace), e = qt.getPrimaries(i);
  let n;
  switch (t === e ? n = "" : t === eo && e === to ? n = "LinearDisplayP3ToLinearSRGB" : t === to && e === eo && (n = "LinearSRGBToLinearDisplayP3"), i) {
    case De:
    case lo:
      return [n, "LinearTransferOETF"];
    case He:
    case yc:
      return [n, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", i), [n, "LinearTransferOETF"];
  }
}
function Yl(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS), s = i.getShaderInfoLog(t).trim();
  if (n && s === "") return "";
  const r = /ERROR: 0:(\d+)/.exec(s);
  if (r) {
    const o = parseInt(r[1]);
    return e.toUpperCase() + `

` + s + `

` + u0(i.getShaderSource(t), o);
  } else
    return s;
}
function f0(i, t) {
  const e = d0(t);
  return `vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`;
}
function p0(i, t) {
  let e;
  switch (t) {
    case ff:
      e = "Linear";
      break;
    case pf:
      e = "Reinhard";
      break;
    case mf:
      e = "Cineon";
      break;
    case gf:
      e = "ACESFilmic";
      break;
    case vf:
      e = "AgX";
      break;
    case xf:
      e = "Neutral";
      break;
    case _f:
      e = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), e = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}
const br = /* @__PURE__ */ new w();
function m0() {
  qt.getLuminanceCoefficients(br);
  const i = br.x.toFixed(4), t = br.y.toFixed(4), e = br.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function g0(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Is).join(`
`);
}
function _0(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== !1 && t.push("#define " + e + " " + n);
  }
  return t.join(`
`);
}
function v0(i, t) {
  const e = {}, n = i.getProgramParameter(t, i.ACTIVE_ATTRIBUTES);
  for (let s = 0; s < n; s++) {
    const r = i.getActiveAttrib(t, s), o = r.name;
    let a = 1;
    r.type === i.FLOAT_MAT2 && (a = 2), r.type === i.FLOAT_MAT3 && (a = 3), r.type === i.FLOAT_MAT4 && (a = 4), e[o] = {
      type: r.type,
      location: i.getAttribLocation(t, o),
      locationSize: a
    };
  }
  return e;
}
function Is(i) {
  return i !== "";
}
function Kl(i, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function Zl(i, t) {
  return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const x0 = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Ya(i) {
  return i.replace(x0, M0);
}
const y0 = /* @__PURE__ */ new Map();
function M0(i, t) {
  let e = Ot[t];
  if (e === void 0) {
    const n = y0.get(t);
    if (n !== void 0)
      e = Ot[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else
      throw new Error("Can not resolve #include <" + t + ">");
  }
  return Ya(e);
}
const S0 = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Jl(i) {
  return i.replace(S0, E0);
}
function E0(i, t, e, n) {
  let s = "";
  for (let r = parseInt(t); r < parseInt(e); r++)
    s += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
  return s;
}
function Ql(i) {
  let t = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return i.precision === "highp" ? t += `
#define HIGH_PRECISION` : i.precision === "mediump" ? t += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (t += `
#define LOW_PRECISION`), t;
}
function b0(i) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === ou ? t = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === au ? t = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === In && (t = "SHADOWMAP_TYPE_VSM"), t;
}
function T0(i) {
  let t = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case Qi:
      case ts:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case co:
        t = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return t;
}
function A0(i) {
  let t = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case ts:
        t = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return t;
}
function w0(i) {
  let t = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case cu:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case uf:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case df:
        t = "ENVMAP_BLENDING_ADD";
        break;
    }
  return t;
}
function R0(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2, n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 7 * 16)), texelHeight: n, maxMip: e };
}
function C0(i, t, e, n) {
  const s = i.getContext(), r = e.defines;
  let o = e.vertexShader, a = e.fragmentShader;
  const c = b0(e), l = T0(e), h = A0(e), u = w0(e), d = R0(e), f = g0(e), g = _0(r), _ = s.createProgram();
  let p, m, S = e.glslVersion ? "#version " + e.glslVersion + `
` : "";
  e.isRawShaderMaterial ? (p = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g
  ].filter(Is).join(`
`), p.length > 0 && (p += `
`), m = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g
  ].filter(Is).join(`
`), m.length > 0 && (m += `
`)) : (p = [
    Ql(e),
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g,
    e.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    e.batching ? "#define USE_BATCHING" : "",
    e.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    e.instancing ? "#define USE_INSTANCING" : "",
    e.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    e.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    e.useFog && e.fog ? "#define USE_FOG" : "",
    e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
    e.map ? "#define USE_MAP" : "",
    e.envMap ? "#define USE_ENVMAP" : "",
    e.envMap ? "#define " + h : "",
    e.lightMap ? "#define USE_LIGHTMAP" : "",
    e.aoMap ? "#define USE_AOMAP" : "",
    e.bumpMap ? "#define USE_BUMPMAP" : "",
    e.normalMap ? "#define USE_NORMALMAP" : "",
    e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    e.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    e.anisotropy ? "#define USE_ANISOTROPY" : "",
    e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    e.specularMap ? "#define USE_SPECULARMAP" : "",
    e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    e.metalnessMap ? "#define USE_METALNESSMAP" : "",
    e.alphaMap ? "#define USE_ALPHAMAP" : "",
    e.alphaHash ? "#define USE_ALPHAHASH" : "",
    e.transmission ? "#define USE_TRANSMISSION" : "",
    e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    e.mapUv ? "#define MAP_UV " + e.mapUv : "",
    e.alphaMapUv ? "#define ALPHAMAP_UV " + e.alphaMapUv : "",
    e.lightMapUv ? "#define LIGHTMAP_UV " + e.lightMapUv : "",
    e.aoMapUv ? "#define AOMAP_UV " + e.aoMapUv : "",
    e.emissiveMapUv ? "#define EMISSIVEMAP_UV " + e.emissiveMapUv : "",
    e.bumpMapUv ? "#define BUMPMAP_UV " + e.bumpMapUv : "",
    e.normalMapUv ? "#define NORMALMAP_UV " + e.normalMapUv : "",
    e.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + e.displacementMapUv : "",
    e.metalnessMapUv ? "#define METALNESSMAP_UV " + e.metalnessMapUv : "",
    e.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + e.roughnessMapUv : "",
    e.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + e.anisotropyMapUv : "",
    e.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + e.clearcoatMapUv : "",
    e.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + e.clearcoatNormalMapUv : "",
    e.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + e.clearcoatRoughnessMapUv : "",
    e.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + e.iridescenceMapUv : "",
    e.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + e.iridescenceThicknessMapUv : "",
    e.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + e.sheenColorMapUv : "",
    e.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + e.sheenRoughnessMapUv : "",
    e.specularMapUv ? "#define SPECULARMAP_UV " + e.specularMapUv : "",
    e.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + e.specularColorMapUv : "",
    e.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + e.specularIntensityMapUv : "",
    e.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + e.transmissionMapUv : "",
    e.thicknessMapUv ? "#define THICKNESSMAP_UV " + e.thicknessMapUv : "",
    //
    e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
    e.vertexColors ? "#define USE_COLOR" : "",
    e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    e.vertexUv1s ? "#define USE_UV1" : "",
    e.vertexUv2s ? "#define USE_UV2" : "",
    e.vertexUv3s ? "#define USE_UV3" : "",
    e.pointsUvs ? "#define USE_POINTS_UV" : "",
    e.flatShading ? "#define FLAT_SHADED" : "",
    e.skinning ? "#define USE_SKINNING" : "",
    e.morphTargets ? "#define USE_MORPHTARGETS" : "",
    e.morphNormals && e.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    e.morphColors ? "#define USE_MORPHCOLORS" : "",
    e.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + e.morphTextureStride : "",
    e.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + e.morphTargetsCount : "",
    e.doubleSided ? "#define DOUBLE_SIDED" : "",
    e.flipSided ? "#define FLIP_SIDED" : "",
    e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    e.shadowMapEnabled ? "#define " + c : "",
    e.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Is).join(`
`), m = [
    Ql(e),
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g,
    e.useFog && e.fog ? "#define USE_FOG" : "",
    e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
    e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    e.map ? "#define USE_MAP" : "",
    e.matcap ? "#define USE_MATCAP" : "",
    e.envMap ? "#define USE_ENVMAP" : "",
    e.envMap ? "#define " + l : "",
    e.envMap ? "#define " + h : "",
    e.envMap ? "#define " + u : "",
    d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "",
    d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "",
    d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "",
    e.lightMap ? "#define USE_LIGHTMAP" : "",
    e.aoMap ? "#define USE_AOMAP" : "",
    e.bumpMap ? "#define USE_BUMPMAP" : "",
    e.normalMap ? "#define USE_NORMALMAP" : "",
    e.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    e.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    e.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    e.anisotropy ? "#define USE_ANISOTROPY" : "",
    e.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    e.clearcoat ? "#define USE_CLEARCOAT" : "",
    e.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    e.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    e.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    e.dispersion ? "#define USE_DISPERSION" : "",
    e.iridescence ? "#define USE_IRIDESCENCE" : "",
    e.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    e.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    e.specularMap ? "#define USE_SPECULARMAP" : "",
    e.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    e.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    e.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    e.metalnessMap ? "#define USE_METALNESSMAP" : "",
    e.alphaMap ? "#define USE_ALPHAMAP" : "",
    e.alphaTest ? "#define USE_ALPHATEST" : "",
    e.alphaHash ? "#define USE_ALPHAHASH" : "",
    e.sheen ? "#define USE_SHEEN" : "",
    e.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    e.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    e.transmission ? "#define USE_TRANSMISSION" : "",
    e.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    e.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    e.vertexTangents && e.flatShading === !1 ? "#define USE_TANGENT" : "",
    e.vertexColors || e.instancingColor || e.batchingColor ? "#define USE_COLOR" : "",
    e.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    e.vertexUv1s ? "#define USE_UV1" : "",
    e.vertexUv2s ? "#define USE_UV2" : "",
    e.vertexUv3s ? "#define USE_UV3" : "",
    e.pointsUvs ? "#define USE_POINTS_UV" : "",
    e.gradientMap ? "#define USE_GRADIENTMAP" : "",
    e.flatShading ? "#define FLAT_SHADED" : "",
    e.doubleSided ? "#define DOUBLE_SIDED" : "",
    e.flipSided ? "#define FLIP_SIDED" : "",
    e.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    e.shadowMapEnabled ? "#define " + c : "",
    e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    e.toneMapping !== Jn ? "#define TONE_MAPPING" : "",
    e.toneMapping !== Jn ? Ot.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    e.toneMapping !== Jn ? p0("toneMapping", e.toneMapping) : "",
    e.dithering ? "#define DITHERING" : "",
    e.opaque ? "#define OPAQUE" : "",
    Ot.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    f0("linearToOutputTexel", e.outputColorSpace),
    m0(),
    e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "",
    `
`
  ].filter(Is).join(`
`)), o = Ya(o), o = Kl(o, e), o = Zl(o, e), a = Ya(a), a = Kl(a, e), a = Zl(a, e), o = Jl(o), a = Jl(a), e.isRawShaderMaterial !== !0 && (S = `#version 300 es
`, p = [
    f,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + p, m = [
    "#define varying in",
    e.glslVersion === ml ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    e.glslVersion === ml ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + m);
  const x = S + p + o, M = S + m + a, P = ql(s, s.VERTEX_SHADER, x), R = ql(s, s.FRAGMENT_SHADER, M);
  s.attachShader(_, P), s.attachShader(_, R), e.index0AttributeName !== void 0 ? s.bindAttribLocation(_, 0, e.index0AttributeName) : e.morphTargets === !0 && s.bindAttribLocation(_, 0, "position"), s.linkProgram(_);
  function A(b) {
    if (i.debug.checkShaderErrors) {
      const B = s.getProgramInfoLog(_).trim(), z = s.getShaderInfoLog(P).trim(), H = s.getShaderInfoLog(R).trim();
      let K = !0, k = !0;
      if (s.getProgramParameter(_, s.LINK_STATUS) === !1)
        if (K = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(s, _, P, R);
        else {
          const nt = Yl(s, P, "vertex"), W = Yl(s, R, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(_, s.VALIDATE_STATUS) + `

Material Name: ` + b.name + `
Material Type: ` + b.type + `

Program Info Log: ` + B + `
` + nt + `
` + W
          );
        }
      else B !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", B) : (z === "" || H === "") && (k = !1);
      k && (b.diagnostics = {
        runnable: K,
        programLog: B,
        vertexShader: {
          log: z,
          prefix: p
        },
        fragmentShader: {
          log: H,
          prefix: m
        }
      });
    }
    s.deleteShader(P), s.deleteShader(R), L = new Yr(s, _), G = v0(s, _);
  }
  let L;
  this.getUniforms = function() {
    return L === void 0 && A(this), L;
  };
  let G;
  this.getAttributes = function() {
    return G === void 0 && A(this), G;
  };
  let v = e.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return v === !1 && (v = s.getProgramParameter(_, l0)), v;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), s.deleteProgram(_), this.program = void 0;
  }, this.type = e.shaderType, this.name = e.shaderName, this.id = h0++, this.cacheKey = t, this.usedTimes = 1, this.program = _, this.vertexShader = P, this.fragmentShader = R, this;
}
let P0 = 0;
class L0 {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(t) {
    const e = t.vertexShader, n = t.fragmentShader, s = this._getShaderStage(e), r = this._getShaderStage(n), o = this._getShaderCacheForMaterial(t);
    return o.has(s) === !1 && (o.add(s), s.usedTimes++), o.has(r) === !1 && (o.add(r), r.usedTimes++), this;
  }
  remove(t) {
    const e = this.materialCache.get(t);
    for (const n of e)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(t), this;
  }
  getVertexShaderID(t) {
    return this._getShaderStage(t.vertexShader).id;
  }
  getFragmentShaderID(t) {
    return this._getShaderStage(t.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(t) {
    const e = this.materialCache;
    let n = e.get(t);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), e.set(t, n)), n;
  }
  _getShaderStage(t) {
    const e = this.shaderCache;
    let n = e.get(t);
    return n === void 0 && (n = new I0(t), e.set(t, n)), n;
  }
}
class I0 {
  constructor(t) {
    this.id = P0++, this.code = t, this.usedTimes = 0;
  }
}
function D0(i, t, e, n, s, r, o) {
  const a = new Sc(), c = new L0(), l = /* @__PURE__ */ new Set(), h = [], u = s.logarithmicDepthBuffer, d = s.reverseDepthBuffer, f = s.vertexTextures;
  let g = s.precision;
  const _ = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function p(v) {
    return l.add(v), v === 0 ? "uv" : `uv${v}`;
  }
  function m(v, b, B, z, H) {
    const K = z.fog, k = H.geometry, nt = v.isMeshStandardMaterial ? z.environment : null, W = (v.isMeshStandardMaterial ? e : t).get(v.envMap || nt), ut = W && W.mapping === co ? W.image.height : null, dt = _[v.type];
    v.precision !== null && (g = s.getMaxPrecision(v.precision), g !== v.precision && console.warn("THREE.WebGLProgram.getParameters:", v.precision, "not supported, using", g, "instead."));
    const Mt = k.morphAttributes.position || k.morphAttributes.normal || k.morphAttributes.color, Yt = Mt !== void 0 ? Mt.length : 0;
    let ee = 0;
    k.morphAttributes.position !== void 0 && (ee = 1), k.morphAttributes.normal !== void 0 && (ee = 2), k.morphAttributes.color !== void 0 && (ee = 3);
    let $, Q, xt, ft;
    if (dt) {
      const We = _n[dt];
      $ = We.vertexShader, Q = We.fragmentShader;
    } else
      $ = v.vertexShader, Q = v.fragmentShader, c.update(v), xt = c.getVertexShaderID(v), ft = c.getFragmentShaderID(v);
    const Nt = i.getRenderTarget(), wt = H.isInstancedMesh === !0, Gt = H.isBatchedMesh === !0, re = !!v.map, Wt = !!v.matcap, C = !!W, qe = !!v.aoMap, kt = !!v.lightMap, $t = !!v.bumpMap, Ct = !!v.normalMap, le = !!v.displacementMap, It = !!v.emissiveMap, T = !!v.metalnessMap, y = !!v.roughnessMap, U = v.anisotropy > 0, q = v.clearcoat > 0, Z = v.dispersion > 0, j = v.iridescence > 0, St = v.sheen > 0, rt = v.transmission > 0, pt = U && !!v.anisotropyMap, jt = q && !!v.clearcoatMap, et = q && !!v.clearcoatNormalMap, mt = q && !!v.clearcoatRoughnessMap, Pt = j && !!v.iridescenceMap, Lt = j && !!v.iridescenceThicknessMap, gt = St && !!v.sheenColorMap, Ht = St && !!v.sheenRoughnessMap, Ut = !!v.specularMap, ae = !!v.specularColorMap, I = !!v.specularIntensityMap, ct = rt && !!v.transmissionMap, V = rt && !!v.thicknessMap, Y = !!v.gradientMap, ot = !!v.alphaMap, lt = v.alphaTest > 0, Xt = !!v.alphaHash, xe = !!v.extensions;
    let Ge = Jn;
    v.toneMapped && (Nt === null || Nt.isXRRenderTarget === !0) && (Ge = i.toneMapping);
    const Kt = {
      shaderID: dt,
      shaderType: v.type,
      shaderName: v.name,
      vertexShader: $,
      fragmentShader: Q,
      defines: v.defines,
      customVertexShaderID: xt,
      customFragmentShaderID: ft,
      isRawShaderMaterial: v.isRawShaderMaterial === !0,
      glslVersion: v.glslVersion,
      precision: g,
      batching: Gt,
      batchingColor: Gt && H._colorsTexture !== null,
      instancing: wt,
      instancingColor: wt && H.instanceColor !== null,
      instancingMorph: wt && H.morphTexture !== null,
      supportsVertexTextures: f,
      outputColorSpace: Nt === null ? i.outputColorSpace : Nt.isXRRenderTarget === !0 ? Nt.texture.colorSpace : De,
      alphaToCoverage: !!v.alphaToCoverage,
      map: re,
      matcap: Wt,
      envMap: C,
      envMapMode: C && W.mapping,
      envMapCubeUVHeight: ut,
      aoMap: qe,
      lightMap: kt,
      bumpMap: $t,
      normalMap: Ct,
      displacementMap: f && le,
      emissiveMap: It,
      normalMapObjectSpace: Ct && v.normalMapType === Tf,
      normalMapTangentSpace: Ct && v.normalMapType === Mu,
      metalnessMap: T,
      roughnessMap: y,
      anisotropy: U,
      anisotropyMap: pt,
      clearcoat: q,
      clearcoatMap: jt,
      clearcoatNormalMap: et,
      clearcoatRoughnessMap: mt,
      dispersion: Z,
      iridescence: j,
      iridescenceMap: Pt,
      iridescenceThicknessMap: Lt,
      sheen: St,
      sheenColorMap: gt,
      sheenRoughnessMap: Ht,
      specularMap: Ut,
      specularColorMap: ae,
      specularIntensityMap: I,
      transmission: rt,
      transmissionMap: ct,
      thicknessMap: V,
      gradientMap: Y,
      opaque: v.transparent === !1 && v.blending === Xi && v.alphaToCoverage === !1,
      alphaMap: ot,
      alphaTest: lt,
      alphaHash: Xt,
      combine: v.combine,
      //
      mapUv: re && p(v.map.channel),
      aoMapUv: qe && p(v.aoMap.channel),
      lightMapUv: kt && p(v.lightMap.channel),
      bumpMapUv: $t && p(v.bumpMap.channel),
      normalMapUv: Ct && p(v.normalMap.channel),
      displacementMapUv: le && p(v.displacementMap.channel),
      emissiveMapUv: It && p(v.emissiveMap.channel),
      metalnessMapUv: T && p(v.metalnessMap.channel),
      roughnessMapUv: y && p(v.roughnessMap.channel),
      anisotropyMapUv: pt && p(v.anisotropyMap.channel),
      clearcoatMapUv: jt && p(v.clearcoatMap.channel),
      clearcoatNormalMapUv: et && p(v.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: mt && p(v.clearcoatRoughnessMap.channel),
      iridescenceMapUv: Pt && p(v.iridescenceMap.channel),
      iridescenceThicknessMapUv: Lt && p(v.iridescenceThicknessMap.channel),
      sheenColorMapUv: gt && p(v.sheenColorMap.channel),
      sheenRoughnessMapUv: Ht && p(v.sheenRoughnessMap.channel),
      specularMapUv: Ut && p(v.specularMap.channel),
      specularColorMapUv: ae && p(v.specularColorMap.channel),
      specularIntensityMapUv: I && p(v.specularIntensityMap.channel),
      transmissionMapUv: ct && p(v.transmissionMap.channel),
      thicknessMapUv: V && p(v.thicknessMap.channel),
      alphaMapUv: ot && p(v.alphaMap.channel),
      //
      vertexTangents: !!k.attributes.tangent && (Ct || U),
      vertexColors: v.vertexColors,
      vertexAlphas: v.vertexColors === !0 && !!k.attributes.color && k.attributes.color.itemSize === 4,
      pointsUvs: H.isPoints === !0 && !!k.attributes.uv && (re || ot),
      fog: !!K,
      useFog: v.fog === !0,
      fogExp2: !!K && K.isFogExp2,
      flatShading: v.flatShading === !0,
      sizeAttenuation: v.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reverseDepthBuffer: d,
      skinning: H.isSkinnedMesh === !0,
      morphTargets: k.morphAttributes.position !== void 0,
      morphNormals: k.morphAttributes.normal !== void 0,
      morphColors: k.morphAttributes.color !== void 0,
      morphTargetsCount: Yt,
      morphTextureStride: ee,
      numDirLights: b.directional.length,
      numPointLights: b.point.length,
      numSpotLights: b.spot.length,
      numSpotLightMaps: b.spotLightMap.length,
      numRectAreaLights: b.rectArea.length,
      numHemiLights: b.hemi.length,
      numDirLightShadows: b.directionalShadowMap.length,
      numPointLightShadows: b.pointShadowMap.length,
      numSpotLightShadows: b.spotShadowMap.length,
      numSpotLightShadowsWithMaps: b.numSpotLightShadowsWithMaps,
      numLightProbes: b.numLightProbes,
      numClippingPlanes: o.numPlanes,
      numClipIntersection: o.numIntersection,
      dithering: v.dithering,
      shadowMapEnabled: i.shadowMap.enabled && B.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: Ge,
      decodeVideoTexture: re && v.map.isVideoTexture === !0 && qt.getTransfer(v.map.colorSpace) === ue,
      premultipliedAlpha: v.premultipliedAlpha,
      doubleSided: v.side === fn,
      flipSided: v.side === $e,
      useDepthPacking: v.depthPacking >= 0,
      depthPacking: v.depthPacking || 0,
      index0AttributeName: v.index0AttributeName,
      extensionClipCullDistance: xe && v.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (xe && v.extensions.multiDraw === !0 || Gt) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: v.customProgramCacheKey()
    };
    return Kt.vertexUv1s = l.has(1), Kt.vertexUv2s = l.has(2), Kt.vertexUv3s = l.has(3), l.clear(), Kt;
  }
  function S(v) {
    const b = [];
    if (v.shaderID ? b.push(v.shaderID) : (b.push(v.customVertexShaderID), b.push(v.customFragmentShaderID)), v.defines !== void 0)
      for (const B in v.defines)
        b.push(B), b.push(v.defines[B]);
    return v.isRawShaderMaterial === !1 && (x(b, v), M(b, v), b.push(i.outputColorSpace)), b.push(v.customProgramCacheKey), b.join();
  }
  function x(v, b) {
    v.push(b.precision), v.push(b.outputColorSpace), v.push(b.envMapMode), v.push(b.envMapCubeUVHeight), v.push(b.mapUv), v.push(b.alphaMapUv), v.push(b.lightMapUv), v.push(b.aoMapUv), v.push(b.bumpMapUv), v.push(b.normalMapUv), v.push(b.displacementMapUv), v.push(b.emissiveMapUv), v.push(b.metalnessMapUv), v.push(b.roughnessMapUv), v.push(b.anisotropyMapUv), v.push(b.clearcoatMapUv), v.push(b.clearcoatNormalMapUv), v.push(b.clearcoatRoughnessMapUv), v.push(b.iridescenceMapUv), v.push(b.iridescenceThicknessMapUv), v.push(b.sheenColorMapUv), v.push(b.sheenRoughnessMapUv), v.push(b.specularMapUv), v.push(b.specularColorMapUv), v.push(b.specularIntensityMapUv), v.push(b.transmissionMapUv), v.push(b.thicknessMapUv), v.push(b.combine), v.push(b.fogExp2), v.push(b.sizeAttenuation), v.push(b.morphTargetsCount), v.push(b.morphAttributeCount), v.push(b.numDirLights), v.push(b.numPointLights), v.push(b.numSpotLights), v.push(b.numSpotLightMaps), v.push(b.numHemiLights), v.push(b.numRectAreaLights), v.push(b.numDirLightShadows), v.push(b.numPointLightShadows), v.push(b.numSpotLightShadows), v.push(b.numSpotLightShadowsWithMaps), v.push(b.numLightProbes), v.push(b.shadowMapType), v.push(b.toneMapping), v.push(b.numClippingPlanes), v.push(b.numClipIntersection), v.push(b.depthPacking);
  }
  function M(v, b) {
    a.disableAll(), b.supportsVertexTextures && a.enable(0), b.instancing && a.enable(1), b.instancingColor && a.enable(2), b.instancingMorph && a.enable(3), b.matcap && a.enable(4), b.envMap && a.enable(5), b.normalMapObjectSpace && a.enable(6), b.normalMapTangentSpace && a.enable(7), b.clearcoat && a.enable(8), b.iridescence && a.enable(9), b.alphaTest && a.enable(10), b.vertexColors && a.enable(11), b.vertexAlphas && a.enable(12), b.vertexUv1s && a.enable(13), b.vertexUv2s && a.enable(14), b.vertexUv3s && a.enable(15), b.vertexTangents && a.enable(16), b.anisotropy && a.enable(17), b.alphaHash && a.enable(18), b.batching && a.enable(19), b.dispersion && a.enable(20), b.batchingColor && a.enable(21), v.push(a.mask), a.disableAll(), b.fog && a.enable(0), b.useFog && a.enable(1), b.flatShading && a.enable(2), b.logarithmicDepthBuffer && a.enable(3), b.reverseDepthBuffer && a.enable(4), b.skinning && a.enable(5), b.morphTargets && a.enable(6), b.morphNormals && a.enable(7), b.morphColors && a.enable(8), b.premultipliedAlpha && a.enable(9), b.shadowMapEnabled && a.enable(10), b.doubleSided && a.enable(11), b.flipSided && a.enable(12), b.useDepthPacking && a.enable(13), b.dithering && a.enable(14), b.transmission && a.enable(15), b.sheen && a.enable(16), b.opaque && a.enable(17), b.pointsUvs && a.enable(18), b.decodeVideoTexture && a.enable(19), b.alphaToCoverage && a.enable(20), v.push(a.mask);
  }
  function P(v) {
    const b = _[v.type];
    let B;
    if (b) {
      const z = _n[b];
      B = gp.clone(z.uniforms);
    } else
      B = v.uniforms;
    return B;
  }
  function R(v, b) {
    let B;
    for (let z = 0, H = h.length; z < H; z++) {
      const K = h[z];
      if (K.cacheKey === b) {
        B = K, ++B.usedTimes;
        break;
      }
    }
    return B === void 0 && (B = new C0(i, b, v, r), h.push(B)), B;
  }
  function A(v) {
    if (--v.usedTimes === 0) {
      const b = h.indexOf(v);
      h[b] = h[h.length - 1], h.pop(), v.destroy();
    }
  }
  function L(v) {
    c.remove(v);
  }
  function G() {
    c.dispose();
  }
  return {
    getParameters: m,
    getProgramCacheKey: S,
    getUniforms: P,
    acquireProgram: R,
    releaseProgram: A,
    releaseShaderCache: L,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: h,
    dispose: G
  };
}
function N0() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(o) {
    return i.has(o);
  }
  function e(o) {
    let a = i.get(o);
    return a === void 0 && (a = {}, i.set(o, a)), a;
  }
  function n(o) {
    i.delete(o);
  }
  function s(o, a, c) {
    i.get(o)[a] = c;
  }
  function r() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: t,
    get: e,
    remove: n,
    update: s,
    dispose: r
  };
}
function U0(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.z !== t.z ? i.z - t.z : i.id - t.id;
}
function th(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
}
function eh() {
  const i = [];
  let t = 0;
  const e = [], n = [], s = [];
  function r() {
    t = 0, e.length = 0, n.length = 0, s.length = 0;
  }
  function o(u, d, f, g, _, p) {
    let m = i[t];
    return m === void 0 ? (m = {
      id: u.id,
      object: u,
      geometry: d,
      material: f,
      groupOrder: g,
      renderOrder: u.renderOrder,
      z: _,
      group: p
    }, i[t] = m) : (m.id = u.id, m.object = u, m.geometry = d, m.material = f, m.groupOrder = g, m.renderOrder = u.renderOrder, m.z = _, m.group = p), t++, m;
  }
  function a(u, d, f, g, _, p) {
    const m = o(u, d, f, g, _, p);
    f.transmission > 0 ? n.push(m) : f.transparent === !0 ? s.push(m) : e.push(m);
  }
  function c(u, d, f, g, _, p) {
    const m = o(u, d, f, g, _, p);
    f.transmission > 0 ? n.unshift(m) : f.transparent === !0 ? s.unshift(m) : e.unshift(m);
  }
  function l(u, d) {
    e.length > 1 && e.sort(u || U0), n.length > 1 && n.sort(d || th), s.length > 1 && s.sort(d || th);
  }
  function h() {
    for (let u = t, d = i.length; u < d; u++) {
      const f = i[u];
      if (f.id === null) break;
      f.id = null, f.object = null, f.geometry = null, f.material = null, f.group = null;
    }
  }
  return {
    opaque: e,
    transmissive: n,
    transparent: s,
    init: r,
    push: a,
    unshift: c,
    finish: h,
    sort: l
  };
}
function O0() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(n, s) {
    const r = i.get(n);
    let o;
    return r === void 0 ? (o = new eh(), i.set(n, [o])) : s >= r.length ? (o = new eh(), r.push(o)) : o = r[s], o;
  }
  function e() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: e
  };
}
function F0() {
  const i = {};
  return {
    get: function(t) {
      if (i[t.id] !== void 0)
        return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            direction: new w(),
            color: new Tt()
          };
          break;
        case "SpotLight":
          e = {
            position: new w(),
            direction: new w(),
            color: new Tt(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          e = {
            position: new w(),
            color: new Tt(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          e = {
            direction: new w(),
            skyColor: new Tt(),
            groundColor: new Tt()
          };
          break;
        case "RectAreaLight":
          e = {
            color: new Tt(),
            position: new w(),
            halfWidth: new w(),
            halfHeight: new w()
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
function B0() {
  const i = {};
  return {
    get: function(t) {
      if (i[t.id] !== void 0)
        return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new tt()
          };
          break;
        case "SpotLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new tt()
          };
          break;
        case "PointLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new tt(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
let z0 = 0;
function k0(i, t) {
  return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
}
function H0(i) {
  const t = new F0(), e = B0(), n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let l = 0; l < 9; l++) n.probe.push(new w());
  const s = new w(), r = new Dt(), o = new Dt();
  function a(l) {
    let h = 0, u = 0, d = 0;
    for (let G = 0; G < 9; G++) n.probe[G].set(0, 0, 0);
    let f = 0, g = 0, _ = 0, p = 0, m = 0, S = 0, x = 0, M = 0, P = 0, R = 0, A = 0;
    l.sort(k0);
    for (let G = 0, v = l.length; G < v; G++) {
      const b = l[G], B = b.color, z = b.intensity, H = b.distance, K = b.shadow && b.shadow.map ? b.shadow.map.texture : null;
      if (b.isAmbientLight)
        h += B.r * z, u += B.g * z, d += B.b * z;
      else if (b.isLightProbe) {
        for (let k = 0; k < 9; k++)
          n.probe[k].addScaledVector(b.sh.coefficients[k], z);
        A++;
      } else if (b.isDirectionalLight) {
        const k = t.get(b);
        if (k.color.copy(b.color).multiplyScalar(b.intensity), b.castShadow) {
          const nt = b.shadow, W = e.get(b);
          W.shadowIntensity = nt.intensity, W.shadowBias = nt.bias, W.shadowNormalBias = nt.normalBias, W.shadowRadius = nt.radius, W.shadowMapSize = nt.mapSize, n.directionalShadow[f] = W, n.directionalShadowMap[f] = K, n.directionalShadowMatrix[f] = b.shadow.matrix, S++;
        }
        n.directional[f] = k, f++;
      } else if (b.isSpotLight) {
        const k = t.get(b);
        k.position.setFromMatrixPosition(b.matrixWorld), k.color.copy(B).multiplyScalar(z), k.distance = H, k.coneCos = Math.cos(b.angle), k.penumbraCos = Math.cos(b.angle * (1 - b.penumbra)), k.decay = b.decay, n.spot[_] = k;
        const nt = b.shadow;
        if (b.map && (n.spotLightMap[P] = b.map, P++, nt.updateMatrices(b), b.castShadow && R++), n.spotLightMatrix[_] = nt.matrix, b.castShadow) {
          const W = e.get(b);
          W.shadowIntensity = nt.intensity, W.shadowBias = nt.bias, W.shadowNormalBias = nt.normalBias, W.shadowRadius = nt.radius, W.shadowMapSize = nt.mapSize, n.spotShadow[_] = W, n.spotShadowMap[_] = K, M++;
        }
        _++;
      } else if (b.isRectAreaLight) {
        const k = t.get(b);
        k.color.copy(B).multiplyScalar(z), k.halfWidth.set(b.width * 0.5, 0, 0), k.halfHeight.set(0, b.height * 0.5, 0), n.rectArea[p] = k, p++;
      } else if (b.isPointLight) {
        const k = t.get(b);
        if (k.color.copy(b.color).multiplyScalar(b.intensity), k.distance = b.distance, k.decay = b.decay, b.castShadow) {
          const nt = b.shadow, W = e.get(b);
          W.shadowIntensity = nt.intensity, W.shadowBias = nt.bias, W.shadowNormalBias = nt.normalBias, W.shadowRadius = nt.radius, W.shadowMapSize = nt.mapSize, W.shadowCameraNear = nt.camera.near, W.shadowCameraFar = nt.camera.far, n.pointShadow[g] = W, n.pointShadowMap[g] = K, n.pointShadowMatrix[g] = b.shadow.matrix, x++;
        }
        n.point[g] = k, g++;
      } else if (b.isHemisphereLight) {
        const k = t.get(b);
        k.skyColor.copy(b.color).multiplyScalar(z), k.groundColor.copy(b.groundColor).multiplyScalar(z), n.hemi[m] = k, m++;
      }
    }
    p > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = st.LTC_FLOAT_1, n.rectAreaLTC2 = st.LTC_FLOAT_2) : (n.rectAreaLTC1 = st.LTC_HALF_1, n.rectAreaLTC2 = st.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = u, n.ambient[2] = d;
    const L = n.hash;
    (L.directionalLength !== f || L.pointLength !== g || L.spotLength !== _ || L.rectAreaLength !== p || L.hemiLength !== m || L.numDirectionalShadows !== S || L.numPointShadows !== x || L.numSpotShadows !== M || L.numSpotMaps !== P || L.numLightProbes !== A) && (n.directional.length = f, n.spot.length = _, n.rectArea.length = p, n.point.length = g, n.hemi.length = m, n.directionalShadow.length = S, n.directionalShadowMap.length = S, n.pointShadow.length = x, n.pointShadowMap.length = x, n.spotShadow.length = M, n.spotShadowMap.length = M, n.directionalShadowMatrix.length = S, n.pointShadowMatrix.length = x, n.spotLightMatrix.length = M + P - R, n.spotLightMap.length = P, n.numSpotLightShadowsWithMaps = R, n.numLightProbes = A, L.directionalLength = f, L.pointLength = g, L.spotLength = _, L.rectAreaLength = p, L.hemiLength = m, L.numDirectionalShadows = S, L.numPointShadows = x, L.numSpotShadows = M, L.numSpotMaps = P, L.numLightProbes = A, n.version = z0++);
  }
  function c(l, h) {
    let u = 0, d = 0, f = 0, g = 0, _ = 0;
    const p = h.matrixWorldInverse;
    for (let m = 0, S = l.length; m < S; m++) {
      const x = l[m];
      if (x.isDirectionalLight) {
        const M = n.directional[u];
        M.direction.setFromMatrixPosition(x.matrixWorld), s.setFromMatrixPosition(x.target.matrixWorld), M.direction.sub(s), M.direction.transformDirection(p), u++;
      } else if (x.isSpotLight) {
        const M = n.spot[f];
        M.position.setFromMatrixPosition(x.matrixWorld), M.position.applyMatrix4(p), M.direction.setFromMatrixPosition(x.matrixWorld), s.setFromMatrixPosition(x.target.matrixWorld), M.direction.sub(s), M.direction.transformDirection(p), f++;
      } else if (x.isRectAreaLight) {
        const M = n.rectArea[g];
        M.position.setFromMatrixPosition(x.matrixWorld), M.position.applyMatrix4(p), o.identity(), r.copy(x.matrixWorld), r.premultiply(p), o.extractRotation(r), M.halfWidth.set(x.width * 0.5, 0, 0), M.halfHeight.set(0, x.height * 0.5, 0), M.halfWidth.applyMatrix4(o), M.halfHeight.applyMatrix4(o), g++;
      } else if (x.isPointLight) {
        const M = n.point[d];
        M.position.setFromMatrixPosition(x.matrixWorld), M.position.applyMatrix4(p), d++;
      } else if (x.isHemisphereLight) {
        const M = n.hemi[_];
        M.direction.setFromMatrixPosition(x.matrixWorld), M.direction.transformDirection(p), _++;
      }
    }
  }
  return {
    setup: a,
    setupView: c,
    state: n
  };
}
function nh(i) {
  const t = new H0(i), e = [], n = [];
  function s(h) {
    l.camera = h, e.length = 0, n.length = 0;
  }
  function r(h) {
    e.push(h);
  }
  function o(h) {
    n.push(h);
  }
  function a() {
    t.setup(e);
  }
  function c(h) {
    t.setupView(e, h);
  }
  const l = {
    lightsArray: e,
    shadowsArray: n,
    camera: null,
    lights: t,
    transmissionRenderTarget: {}
  };
  return {
    init: s,
    state: l,
    setupLights: a,
    setupLightsView: c,
    pushLight: r,
    pushShadow: o
  };
}
function V0(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(s, r = 0) {
    const o = t.get(s);
    let a;
    return o === void 0 ? (a = new nh(i), t.set(s, [a])) : r >= o.length ? (a = new nh(i), o.push(a)) : a = o[r], a;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: n
  };
}
class G0 extends gn {
  constructor(t) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Ef, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
  }
}
class W0 extends gn {
  constructor(t) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
  }
}
const X0 = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, $0 = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function j0(i, t, e) {
  let n = new Ec();
  const s = new tt(), r = new tt(), o = new Zt(), a = new G0({ depthPacking: bf }), c = new W0(), l = {}, h = e.maxTextureSize, u = { [Fn]: $e, [$e]: Fn, [fn]: fn }, d = new Qn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new tt() },
      radius: { value: 4 }
    },
    vertexShader: X0,
    fragmentShader: $0
  }), f = d.clone();
  f.defines.HORIZONTAL_PASS = 1;
  const g = new Pe();
  g.setAttribute(
    "position",
    new Ie(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const _ = new ge(g, d), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = ou;
  let m = this.type;
  this.render = function(R, A, L) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || R.length === 0) return;
    const G = i.getRenderTarget(), v = i.getActiveCubeFace(), b = i.getActiveMipmapLevel(), B = i.state;
    B.setBlending(Zn), B.buffers.color.setClear(1, 1, 1, 1), B.buffers.depth.setTest(!0), B.setScissorTest(!1);
    const z = m !== In && this.type === In, H = m === In && this.type !== In;
    for (let K = 0, k = R.length; K < k; K++) {
      const nt = R[K], W = nt.shadow;
      if (W === void 0) {
        console.warn("THREE.WebGLShadowMap:", nt, "has no shadow.");
        continue;
      }
      if (W.autoUpdate === !1 && W.needsUpdate === !1) continue;
      s.copy(W.mapSize);
      const ut = W.getFrameExtents();
      if (s.multiply(ut), r.copy(W.mapSize), (s.x > h || s.y > h) && (s.x > h && (r.x = Math.floor(h / ut.x), s.x = r.x * ut.x, W.mapSize.x = r.x), s.y > h && (r.y = Math.floor(h / ut.y), s.y = r.y * ut.y, W.mapSize.y = r.y)), W.map === null || z === !0 || H === !0) {
        const Mt = this.type !== In ? { minFilter: Ve, magFilter: Ve } : {};
        W.map !== null && W.map.dispose(), W.map = new _i(s.x, s.y, Mt), W.map.texture.name = nt.name + ".shadowMap", W.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(W.map), i.clear();
      const dt = W.getViewportCount();
      for (let Mt = 0; Mt < dt; Mt++) {
        const Yt = W.getViewport(Mt);
        o.set(
          r.x * Yt.x,
          r.y * Yt.y,
          r.x * Yt.z,
          r.y * Yt.w
        ), B.viewport(o), W.updateMatrices(nt, Mt), n = W.getFrustum(), M(A, L, W.camera, nt, this.type);
      }
      W.isPointLightShadow !== !0 && this.type === In && S(W, L), W.needsUpdate = !1;
    }
    m = this.type, p.needsUpdate = !1, i.setRenderTarget(G, v, b);
  };
  function S(R, A) {
    const L = t.update(_);
    d.defines.VSM_SAMPLES !== R.blurSamples && (d.defines.VSM_SAMPLES = R.blurSamples, f.defines.VSM_SAMPLES = R.blurSamples, d.needsUpdate = !0, f.needsUpdate = !0), R.mapPass === null && (R.mapPass = new _i(s.x, s.y)), d.uniforms.shadow_pass.value = R.map.texture, d.uniforms.resolution.value = R.mapSize, d.uniforms.radius.value = R.radius, i.setRenderTarget(R.mapPass), i.clear(), i.renderBufferDirect(A, null, L, d, _, null), f.uniforms.shadow_pass.value = R.mapPass.texture, f.uniforms.resolution.value = R.mapSize, f.uniforms.radius.value = R.radius, i.setRenderTarget(R.map), i.clear(), i.renderBufferDirect(A, null, L, f, _, null);
  }
  function x(R, A, L, G) {
    let v = null;
    const b = L.isPointLight === !0 ? R.customDistanceMaterial : R.customDepthMaterial;
    if (b !== void 0)
      v = b;
    else if (v = L.isPointLight === !0 ? c : a, i.localClippingEnabled && A.clipShadows === !0 && Array.isArray(A.clippingPlanes) && A.clippingPlanes.length !== 0 || A.displacementMap && A.displacementScale !== 0 || A.alphaMap && A.alphaTest > 0 || A.map && A.alphaTest > 0) {
      const B = v.uuid, z = A.uuid;
      let H = l[B];
      H === void 0 && (H = {}, l[B] = H);
      let K = H[z];
      K === void 0 && (K = v.clone(), H[z] = K, A.addEventListener("dispose", P)), v = K;
    }
    if (v.visible = A.visible, v.wireframe = A.wireframe, G === In ? v.side = A.shadowSide !== null ? A.shadowSide : A.side : v.side = A.shadowSide !== null ? A.shadowSide : u[A.side], v.alphaMap = A.alphaMap, v.alphaTest = A.alphaTest, v.map = A.map, v.clipShadows = A.clipShadows, v.clippingPlanes = A.clippingPlanes, v.clipIntersection = A.clipIntersection, v.displacementMap = A.displacementMap, v.displacementScale = A.displacementScale, v.displacementBias = A.displacementBias, v.wireframeLinewidth = A.wireframeLinewidth, v.linewidth = A.linewidth, L.isPointLight === !0 && v.isMeshDistanceMaterial === !0) {
      const B = i.properties.get(v);
      B.light = L;
    }
    return v;
  }
  function M(R, A, L, G, v) {
    if (R.visible === !1) return;
    if (R.layers.test(A.layers) && (R.isMesh || R.isLine || R.isPoints) && (R.castShadow || R.receiveShadow && v === In) && (!R.frustumCulled || n.intersectsObject(R))) {
      R.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse, R.matrixWorld);
      const z = t.update(R), H = R.material;
      if (Array.isArray(H)) {
        const K = z.groups;
        for (let k = 0, nt = K.length; k < nt; k++) {
          const W = K[k], ut = H[W.materialIndex];
          if (ut && ut.visible) {
            const dt = x(R, ut, G, v);
            R.onBeforeShadow(i, R, A, L, z, dt, W), i.renderBufferDirect(L, null, z, dt, R, W), R.onAfterShadow(i, R, A, L, z, dt, W);
          }
        }
      } else if (H.visible) {
        const K = x(R, H, G, v);
        R.onBeforeShadow(i, R, A, L, z, K, null), i.renderBufferDirect(L, null, z, K, R, null), R.onAfterShadow(i, R, A, L, z, K, null);
      }
    }
    const B = R.children;
    for (let z = 0, H = B.length; z < H; z++)
      M(B[z], A, L, G, v);
  }
  function P(R) {
    R.target.removeEventListener("dispose", P);
    for (const L in l) {
      const G = l[L], v = R.target.uuid;
      v in G && (G[v].dispose(), delete G[v]);
    }
  }
}
const q0 = {
  [da]: fa,
  [pa]: _a,
  [ma]: va,
  [Ji]: ga,
  [fa]: da,
  [_a]: pa,
  [va]: ma,
  [ga]: Ji
};
function Y0(i) {
  function t() {
    let I = !1;
    const ct = new Zt();
    let V = null;
    const Y = new Zt(0, 0, 0, 0);
    return {
      setMask: function(ot) {
        V !== ot && !I && (i.colorMask(ot, ot, ot, ot), V = ot);
      },
      setLocked: function(ot) {
        I = ot;
      },
      setClear: function(ot, lt, Xt, xe, Ge) {
        Ge === !0 && (ot *= xe, lt *= xe, Xt *= xe), ct.set(ot, lt, Xt, xe), Y.equals(ct) === !1 && (i.clearColor(ot, lt, Xt, xe), Y.copy(ct));
      },
      reset: function() {
        I = !1, V = null, Y.set(-1, 0, 0, 0);
      }
    };
  }
  function e() {
    let I = !1, ct = !1, V = null, Y = null, ot = null;
    return {
      setReversed: function(lt) {
        ct = lt;
      },
      setTest: function(lt) {
        lt ? xt(i.DEPTH_TEST) : ft(i.DEPTH_TEST);
      },
      setMask: function(lt) {
        V !== lt && !I && (i.depthMask(lt), V = lt);
      },
      setFunc: function(lt) {
        if (ct && (lt = q0[lt]), Y !== lt) {
          switch (lt) {
            case da:
              i.depthFunc(i.NEVER);
              break;
            case fa:
              i.depthFunc(i.ALWAYS);
              break;
            case pa:
              i.depthFunc(i.LESS);
              break;
            case Ji:
              i.depthFunc(i.LEQUAL);
              break;
            case ma:
              i.depthFunc(i.EQUAL);
              break;
            case ga:
              i.depthFunc(i.GEQUAL);
              break;
            case _a:
              i.depthFunc(i.GREATER);
              break;
            case va:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          Y = lt;
        }
      },
      setLocked: function(lt) {
        I = lt;
      },
      setClear: function(lt) {
        ot !== lt && (i.clearDepth(lt), ot = lt);
      },
      reset: function() {
        I = !1, V = null, Y = null, ot = null;
      }
    };
  }
  function n() {
    let I = !1, ct = null, V = null, Y = null, ot = null, lt = null, Xt = null, xe = null, Ge = null;
    return {
      setTest: function(Kt) {
        I || (Kt ? xt(i.STENCIL_TEST) : ft(i.STENCIL_TEST));
      },
      setMask: function(Kt) {
        ct !== Kt && !I && (i.stencilMask(Kt), ct = Kt);
      },
      setFunc: function(Kt, We, Tn) {
        (V !== Kt || Y !== We || ot !== Tn) && (i.stencilFunc(Kt, We, Tn), V = Kt, Y = We, ot = Tn);
      },
      setOp: function(Kt, We, Tn) {
        (lt !== Kt || Xt !== We || xe !== Tn) && (i.stencilOp(Kt, We, Tn), lt = Kt, Xt = We, xe = Tn);
      },
      setLocked: function(Kt) {
        I = Kt;
      },
      setClear: function(Kt) {
        Ge !== Kt && (i.clearStencil(Kt), Ge = Kt);
      },
      reset: function() {
        I = !1, ct = null, V = null, Y = null, ot = null, lt = null, Xt = null, xe = null, Ge = null;
      }
    };
  }
  const s = new t(), r = new e(), o = new n(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let l = {}, h = {}, u = /* @__PURE__ */ new WeakMap(), d = [], f = null, g = !1, _ = null, p = null, m = null, S = null, x = null, M = null, P = null, R = new Tt(0, 0, 0), A = 0, L = !1, G = null, v = null, b = null, B = null, z = null;
  const H = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let K = !1, k = 0;
  const nt = i.getParameter(i.VERSION);
  nt.indexOf("WebGL") !== -1 ? (k = parseFloat(/^WebGL (\d)/.exec(nt)[1]), K = k >= 1) : nt.indexOf("OpenGL ES") !== -1 && (k = parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]), K = k >= 2);
  let W = null, ut = {};
  const dt = i.getParameter(i.SCISSOR_BOX), Mt = i.getParameter(i.VIEWPORT), Yt = new Zt().fromArray(dt), ee = new Zt().fromArray(Mt);
  function $(I, ct, V, Y) {
    const ot = new Uint8Array(4), lt = i.createTexture();
    i.bindTexture(I, lt), i.texParameteri(I, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(I, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Xt = 0; Xt < V; Xt++)
      I === i.TEXTURE_3D || I === i.TEXTURE_2D_ARRAY ? i.texImage3D(ct, 0, i.RGBA, 1, 1, Y, 0, i.RGBA, i.UNSIGNED_BYTE, ot) : i.texImage2D(ct + Xt, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, ot);
    return lt;
  }
  const Q = {};
  Q[i.TEXTURE_2D] = $(i.TEXTURE_2D, i.TEXTURE_2D, 1), Q[i.TEXTURE_CUBE_MAP] = $(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), Q[i.TEXTURE_2D_ARRAY] = $(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), Q[i.TEXTURE_3D] = $(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), r.setClear(1), o.setClear(0), xt(i.DEPTH_TEST), r.setFunc(Ji), kt(!1), $t(ol), xt(i.CULL_FACE), C(Zn);
  function xt(I) {
    l[I] !== !0 && (i.enable(I), l[I] = !0);
  }
  function ft(I) {
    l[I] !== !1 && (i.disable(I), l[I] = !1);
  }
  function Nt(I, ct) {
    return h[I] !== ct ? (i.bindFramebuffer(I, ct), h[I] = ct, I === i.DRAW_FRAMEBUFFER && (h[i.FRAMEBUFFER] = ct), I === i.FRAMEBUFFER && (h[i.DRAW_FRAMEBUFFER] = ct), !0) : !1;
  }
  function wt(I, ct) {
    let V = d, Y = !1;
    if (I) {
      V = u.get(ct), V === void 0 && (V = [], u.set(ct, V));
      const ot = I.textures;
      if (V.length !== ot.length || V[0] !== i.COLOR_ATTACHMENT0) {
        for (let lt = 0, Xt = ot.length; lt < Xt; lt++)
          V[lt] = i.COLOR_ATTACHMENT0 + lt;
        V.length = ot.length, Y = !0;
      }
    } else
      V[0] !== i.BACK && (V[0] = i.BACK, Y = !0);
    Y && i.drawBuffers(V);
  }
  function Gt(I) {
    return f !== I ? (i.useProgram(I), f = I, !0) : !1;
  }
  const re = {
    [di]: i.FUNC_ADD,
    [jd]: i.FUNC_SUBTRACT,
    [qd]: i.FUNC_REVERSE_SUBTRACT
  };
  re[Yd] = i.MIN, re[Kd] = i.MAX;
  const Wt = {
    [Zd]: i.ZERO,
    [Jd]: i.ONE,
    [Qd]: i.SRC_COLOR,
    [ha]: i.SRC_ALPHA,
    [of]: i.SRC_ALPHA_SATURATE,
    [sf]: i.DST_COLOR,
    [ef]: i.DST_ALPHA,
    [tf]: i.ONE_MINUS_SRC_COLOR,
    [ua]: i.ONE_MINUS_SRC_ALPHA,
    [rf]: i.ONE_MINUS_DST_COLOR,
    [nf]: i.ONE_MINUS_DST_ALPHA,
    [af]: i.CONSTANT_COLOR,
    [cf]: i.ONE_MINUS_CONSTANT_COLOR,
    [lf]: i.CONSTANT_ALPHA,
    [hf]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function C(I, ct, V, Y, ot, lt, Xt, xe, Ge, Kt) {
    if (I === Zn) {
      g === !0 && (ft(i.BLEND), g = !1);
      return;
    }
    if (g === !1 && (xt(i.BLEND), g = !0), I !== $d) {
      if (I !== _ || Kt !== L) {
        if ((p !== di || x !== di) && (i.blendEquation(i.FUNC_ADD), p = di, x = di), Kt)
          switch (I) {
            case Xi:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case al:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case cl:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case ll:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", I);
              break;
          }
        else
          switch (I) {
            case Xi:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case al:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case cl:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case ll:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", I);
              break;
          }
        m = null, S = null, M = null, P = null, R.set(0, 0, 0), A = 0, _ = I, L = Kt;
      }
      return;
    }
    ot = ot || ct, lt = lt || V, Xt = Xt || Y, (ct !== p || ot !== x) && (i.blendEquationSeparate(re[ct], re[ot]), p = ct, x = ot), (V !== m || Y !== S || lt !== M || Xt !== P) && (i.blendFuncSeparate(Wt[V], Wt[Y], Wt[lt], Wt[Xt]), m = V, S = Y, M = lt, P = Xt), (xe.equals(R) === !1 || Ge !== A) && (i.blendColor(xe.r, xe.g, xe.b, Ge), R.copy(xe), A = Ge), _ = I, L = !1;
  }
  function qe(I, ct) {
    I.side === fn ? ft(i.CULL_FACE) : xt(i.CULL_FACE);
    let V = I.side === $e;
    ct && (V = !V), kt(V), I.blending === Xi && I.transparent === !1 ? C(Zn) : C(I.blending, I.blendEquation, I.blendSrc, I.blendDst, I.blendEquationAlpha, I.blendSrcAlpha, I.blendDstAlpha, I.blendColor, I.blendAlpha, I.premultipliedAlpha), r.setFunc(I.depthFunc), r.setTest(I.depthTest), r.setMask(I.depthWrite), s.setMask(I.colorWrite);
    const Y = I.stencilWrite;
    o.setTest(Y), Y && (o.setMask(I.stencilWriteMask), o.setFunc(I.stencilFunc, I.stencilRef, I.stencilFuncMask), o.setOp(I.stencilFail, I.stencilZFail, I.stencilZPass)), le(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits), I.alphaToCoverage === !0 ? xt(i.SAMPLE_ALPHA_TO_COVERAGE) : ft(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function kt(I) {
    G !== I && (I ? i.frontFace(i.CW) : i.frontFace(i.CCW), G = I);
  }
  function $t(I) {
    I !== Wd ? (xt(i.CULL_FACE), I !== v && (I === ol ? i.cullFace(i.BACK) : I === Xd ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : ft(i.CULL_FACE), v = I;
  }
  function Ct(I) {
    I !== b && (K && i.lineWidth(I), b = I);
  }
  function le(I, ct, V) {
    I ? (xt(i.POLYGON_OFFSET_FILL), (B !== ct || z !== V) && (i.polygonOffset(ct, V), B = ct, z = V)) : ft(i.POLYGON_OFFSET_FILL);
  }
  function It(I) {
    I ? xt(i.SCISSOR_TEST) : ft(i.SCISSOR_TEST);
  }
  function T(I) {
    I === void 0 && (I = i.TEXTURE0 + H - 1), W !== I && (i.activeTexture(I), W = I);
  }
  function y(I, ct, V) {
    V === void 0 && (W === null ? V = i.TEXTURE0 + H - 1 : V = W);
    let Y = ut[V];
    Y === void 0 && (Y = { type: void 0, texture: void 0 }, ut[V] = Y), (Y.type !== I || Y.texture !== ct) && (W !== V && (i.activeTexture(V), W = V), i.bindTexture(I, ct || Q[I]), Y.type = I, Y.texture = ct);
  }
  function U() {
    const I = ut[W];
    I !== void 0 && I.type !== void 0 && (i.bindTexture(I.type, null), I.type = void 0, I.texture = void 0);
  }
  function q() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function Z() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function j() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function St() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function rt() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function pt() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function jt() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function et() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function mt() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function Pt() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (I) {
      console.error("THREE.WebGLState:", I);
    }
  }
  function Lt(I) {
    Yt.equals(I) === !1 && (i.scissor(I.x, I.y, I.z, I.w), Yt.copy(I));
  }
  function gt(I) {
    ee.equals(I) === !1 && (i.viewport(I.x, I.y, I.z, I.w), ee.copy(I));
  }
  function Ht(I, ct) {
    let V = c.get(ct);
    V === void 0 && (V = /* @__PURE__ */ new WeakMap(), c.set(ct, V));
    let Y = V.get(I);
    Y === void 0 && (Y = i.getUniformBlockIndex(ct, I.name), V.set(I, Y));
  }
  function Ut(I, ct) {
    const Y = c.get(ct).get(I);
    a.get(ct) !== Y && (i.uniformBlockBinding(ct, Y, I.__bindingPointIndex), a.set(ct, Y));
  }
  function ae() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), l = {}, W = null, ut = {}, h = {}, u = /* @__PURE__ */ new WeakMap(), d = [], f = null, g = !1, _ = null, p = null, m = null, S = null, x = null, M = null, P = null, R = new Tt(0, 0, 0), A = 0, L = !1, G = null, v = null, b = null, B = null, z = null, Yt.set(0, 0, i.canvas.width, i.canvas.height), ee.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), r.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: r,
      stencil: o
    },
    enable: xt,
    disable: ft,
    bindFramebuffer: Nt,
    drawBuffers: wt,
    useProgram: Gt,
    setBlending: C,
    setMaterial: qe,
    setFlipSided: kt,
    setCullFace: $t,
    setLineWidth: Ct,
    setPolygonOffset: le,
    setScissorTest: It,
    activeTexture: T,
    bindTexture: y,
    unbindTexture: U,
    compressedTexImage2D: q,
    compressedTexImage3D: Z,
    texImage2D: mt,
    texImage3D: Pt,
    updateUBOMapping: Ht,
    uniformBlockBinding: Ut,
    texStorage2D: jt,
    texStorage3D: et,
    texSubImage2D: j,
    texSubImage3D: St,
    compressedTexSubImage2D: rt,
    compressedTexSubImage3D: pt,
    scissor: Lt,
    viewport: gt,
    reset: ae
  };
}
function ih(i, t, e, n) {
  const s = K0(n);
  switch (e) {
    case pu:
      return i * t;
    case gu:
      return i * t;
    case _u:
      return i * t * 2;
    case gc:
      return i * t / s.components * s.byteLength;
    case _c:
      return i * t / s.components * s.byteLength;
    case vu:
      return i * t * 2 / s.components * s.byteLength;
    case vc:
      return i * t * 2 / s.components * s.byteLength;
    case mu:
      return i * t * 3 / s.components * s.byteLength;
    case rn:
      return i * t * 4 / s.components * s.byteLength;
    case xc:
      return i * t * 4 / s.components * s.byteLength;
    case Gr:
    case Wr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Xr:
    case $r:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Sa:
    case ba:
      return Math.max(i, 16) * Math.max(t, 8) / 4;
    case Ma:
    case Ea:
      return Math.max(i, 8) * Math.max(t, 8) / 2;
    case Ta:
    case Aa:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case wa:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Ra:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Ca:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case Pa:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case La:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case Ia:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case Da:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case Na:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case Ua:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case Oa:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case Fa:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case Ba:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case za:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case ka:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case Ha:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case jr:
    case Va:
    case Ga:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    case xu:
    case Wa:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case Xa:
    case $a:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${e} format.`
  );
}
function K0(i) {
  switch (i) {
    case Bn:
    case uu:
      return { byteLength: 1, components: 1 };
    case Gs:
    case du:
    case Qs:
      return { byteLength: 2, components: 1 };
    case pc:
    case mc:
      return { byteLength: 2, components: 4 };
    case gi:
    case fc:
    case mn:
      return { byteLength: 4, components: 1 };
    case fu:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function Z0(i, t, e, n, s, r, o) {
  const a = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new tt(), h = /* @__PURE__ */ new WeakMap();
  let u;
  const d = /* @__PURE__ */ new WeakMap();
  let f = !1;
  try {
    f = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(T, y) {
    return f ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(T, y)
    ) : $s("canvas");
  }
  function _(T, y, U) {
    let q = 1;
    const Z = It(T);
    if ((Z.width > U || Z.height > U) && (q = U / Math.max(Z.width, Z.height)), q < 1)
      if (typeof HTMLImageElement < "u" && T instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && T instanceof ImageBitmap || typeof VideoFrame < "u" && T instanceof VideoFrame) {
        const j = Math.floor(q * Z.width), St = Math.floor(q * Z.height);
        u === void 0 && (u = g(j, St));
        const rt = y ? g(j, St) : u;
        return rt.width = j, rt.height = St, rt.getContext("2d").drawImage(T, 0, 0, j, St), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + Z.width + "x" + Z.height + ") to (" + j + "x" + St + ")."), rt;
      } else
        return "data" in T && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + Z.width + "x" + Z.height + ")."), T;
    return T;
  }
  function p(T) {
    return T.generateMipmaps && T.minFilter !== Ve && T.minFilter !== Qe;
  }
  function m(T) {
    i.generateMipmap(T);
  }
  function S(T, y, U, q, Z = !1) {
    if (T !== null) {
      if (i[T] !== void 0) return i[T];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + T + "'");
    }
    let j = y;
    if (y === i.RED && (U === i.FLOAT && (j = i.R32F), U === i.HALF_FLOAT && (j = i.R16F), U === i.UNSIGNED_BYTE && (j = i.R8)), y === i.RED_INTEGER && (U === i.UNSIGNED_BYTE && (j = i.R8UI), U === i.UNSIGNED_SHORT && (j = i.R16UI), U === i.UNSIGNED_INT && (j = i.R32UI), U === i.BYTE && (j = i.R8I), U === i.SHORT && (j = i.R16I), U === i.INT && (j = i.R32I)), y === i.RG && (U === i.FLOAT && (j = i.RG32F), U === i.HALF_FLOAT && (j = i.RG16F), U === i.UNSIGNED_BYTE && (j = i.RG8)), y === i.RG_INTEGER && (U === i.UNSIGNED_BYTE && (j = i.RG8UI), U === i.UNSIGNED_SHORT && (j = i.RG16UI), U === i.UNSIGNED_INT && (j = i.RG32UI), U === i.BYTE && (j = i.RG8I), U === i.SHORT && (j = i.RG16I), U === i.INT && (j = i.RG32I)), y === i.RGB_INTEGER && (U === i.UNSIGNED_BYTE && (j = i.RGB8UI), U === i.UNSIGNED_SHORT && (j = i.RGB16UI), U === i.UNSIGNED_INT && (j = i.RGB32UI), U === i.BYTE && (j = i.RGB8I), U === i.SHORT && (j = i.RGB16I), U === i.INT && (j = i.RGB32I)), y === i.RGBA_INTEGER && (U === i.UNSIGNED_BYTE && (j = i.RGBA8UI), U === i.UNSIGNED_SHORT && (j = i.RGBA16UI), U === i.UNSIGNED_INT && (j = i.RGBA32UI), U === i.BYTE && (j = i.RGBA8I), U === i.SHORT && (j = i.RGBA16I), U === i.INT && (j = i.RGBA32I)), y === i.RGB && U === i.UNSIGNED_INT_5_9_9_9_REV && (j = i.RGB9_E5), y === i.RGBA) {
      const St = Z ? Qr : qt.getTransfer(q);
      U === i.FLOAT && (j = i.RGBA32F), U === i.HALF_FLOAT && (j = i.RGBA16F), U === i.UNSIGNED_BYTE && (j = St === ue ? i.SRGB8_ALPHA8 : i.RGBA8), U === i.UNSIGNED_SHORT_4_4_4_4 && (j = i.RGBA4), U === i.UNSIGNED_SHORT_5_5_5_1 && (j = i.RGB5_A1);
    }
    return (j === i.R16F || j === i.R32F || j === i.RG16F || j === i.RG32F || j === i.RGBA16F || j === i.RGBA32F) && t.get("EXT_color_buffer_float"), j;
  }
  function x(T, y) {
    let U;
    return T ? y === null || y === gi || y === ns ? U = i.DEPTH24_STENCIL8 : y === mn ? U = i.DEPTH32F_STENCIL8 : y === Gs && (U = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : y === null || y === gi || y === ns ? U = i.DEPTH_COMPONENT24 : y === mn ? U = i.DEPTH_COMPONENT32F : y === Gs && (U = i.DEPTH_COMPONENT16), U;
  }
  function M(T, y) {
    return p(T) === !0 || T.isFramebufferTexture && T.minFilter !== Ve && T.minFilter !== Qe ? Math.log2(Math.max(y.width, y.height)) + 1 : T.mipmaps !== void 0 && T.mipmaps.length > 0 ? T.mipmaps.length : T.isCompressedTexture && Array.isArray(T.image) ? y.mipmaps.length : 1;
  }
  function P(T) {
    const y = T.target;
    y.removeEventListener("dispose", P), A(y), y.isVideoTexture && h.delete(y);
  }
  function R(T) {
    const y = T.target;
    y.removeEventListener("dispose", R), G(y);
  }
  function A(T) {
    const y = n.get(T);
    if (y.__webglInit === void 0) return;
    const U = T.source, q = d.get(U);
    if (q) {
      const Z = q[y.__cacheKey];
      Z.usedTimes--, Z.usedTimes === 0 && L(T), Object.keys(q).length === 0 && d.delete(U);
    }
    n.remove(T);
  }
  function L(T) {
    const y = n.get(T);
    i.deleteTexture(y.__webglTexture);
    const U = T.source, q = d.get(U);
    delete q[y.__cacheKey], o.memory.textures--;
  }
  function G(T) {
    const y = n.get(T);
    if (T.depthTexture && T.depthTexture.dispose(), T.isWebGLCubeRenderTarget)
      for (let q = 0; q < 6; q++) {
        if (Array.isArray(y.__webglFramebuffer[q]))
          for (let Z = 0; Z < y.__webglFramebuffer[q].length; Z++) i.deleteFramebuffer(y.__webglFramebuffer[q][Z]);
        else
          i.deleteFramebuffer(y.__webglFramebuffer[q]);
        y.__webglDepthbuffer && i.deleteRenderbuffer(y.__webglDepthbuffer[q]);
      }
    else {
      if (Array.isArray(y.__webglFramebuffer))
        for (let q = 0; q < y.__webglFramebuffer.length; q++) i.deleteFramebuffer(y.__webglFramebuffer[q]);
      else
        i.deleteFramebuffer(y.__webglFramebuffer);
      if (y.__webglDepthbuffer && i.deleteRenderbuffer(y.__webglDepthbuffer), y.__webglMultisampledFramebuffer && i.deleteFramebuffer(y.__webglMultisampledFramebuffer), y.__webglColorRenderbuffer)
        for (let q = 0; q < y.__webglColorRenderbuffer.length; q++)
          y.__webglColorRenderbuffer[q] && i.deleteRenderbuffer(y.__webglColorRenderbuffer[q]);
      y.__webglDepthRenderbuffer && i.deleteRenderbuffer(y.__webglDepthRenderbuffer);
    }
    const U = T.textures;
    for (let q = 0, Z = U.length; q < Z; q++) {
      const j = n.get(U[q]);
      j.__webglTexture && (i.deleteTexture(j.__webglTexture), o.memory.textures--), n.remove(U[q]);
    }
    n.remove(T);
  }
  let v = 0;
  function b() {
    v = 0;
  }
  function B() {
    const T = v;
    return T >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + T + " texture units while this GPU supports only " + s.maxTextures), v += 1, T;
  }
  function z(T) {
    const y = [];
    return y.push(T.wrapS), y.push(T.wrapT), y.push(T.wrapR || 0), y.push(T.magFilter), y.push(T.minFilter), y.push(T.anisotropy), y.push(T.internalFormat), y.push(T.format), y.push(T.type), y.push(T.generateMipmaps), y.push(T.premultiplyAlpha), y.push(T.flipY), y.push(T.unpackAlignment), y.push(T.colorSpace), y.join();
  }
  function H(T, y) {
    const U = n.get(T);
    if (T.isVideoTexture && Ct(T), T.isRenderTargetTexture === !1 && T.version > 0 && U.__version !== T.version) {
      const q = T.image;
      if (q === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (q.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        ee(U, T, y);
        return;
      }
    }
    e.bindTexture(i.TEXTURE_2D, U.__webglTexture, i.TEXTURE0 + y);
  }
  function K(T, y) {
    const U = n.get(T);
    if (T.version > 0 && U.__version !== T.version) {
      ee(U, T, y);
      return;
    }
    e.bindTexture(i.TEXTURE_2D_ARRAY, U.__webglTexture, i.TEXTURE0 + y);
  }
  function k(T, y) {
    const U = n.get(T);
    if (T.version > 0 && U.__version !== T.version) {
      ee(U, T, y);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, U.__webglTexture, i.TEXTURE0 + y);
  }
  function nt(T, y) {
    const U = n.get(T);
    if (T.version > 0 && U.__version !== T.version) {
      $(U, T, y);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, U.__webglTexture, i.TEXTURE0 + y);
  }
  const W = {
    [es]: i.REPEAT,
    [Yn]: i.CLAMP_TO_EDGE,
    [Jr]: i.MIRRORED_REPEAT
  }, ut = {
    [Ve]: i.NEAREST,
    [hu]: i.NEAREST_MIPMAP_NEAREST,
    [Ls]: i.NEAREST_MIPMAP_LINEAR,
    [Qe]: i.LINEAR,
    [Vr]: i.LINEAR_MIPMAP_NEAREST,
    [Un]: i.LINEAR_MIPMAP_LINEAR
  }, dt = {
    [Af]: i.NEVER,
    [If]: i.ALWAYS,
    [wf]: i.LESS,
    [Su]: i.LEQUAL,
    [Rf]: i.EQUAL,
    [Lf]: i.GEQUAL,
    [Cf]: i.GREATER,
    [Pf]: i.NOTEQUAL
  };
  function Mt(T, y) {
    if (y.type === mn && t.has("OES_texture_float_linear") === !1 && (y.magFilter === Qe || y.magFilter === Vr || y.magFilter === Ls || y.magFilter === Un || y.minFilter === Qe || y.minFilter === Vr || y.minFilter === Ls || y.minFilter === Un) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(T, i.TEXTURE_WRAP_S, W[y.wrapS]), i.texParameteri(T, i.TEXTURE_WRAP_T, W[y.wrapT]), (T === i.TEXTURE_3D || T === i.TEXTURE_2D_ARRAY) && i.texParameteri(T, i.TEXTURE_WRAP_R, W[y.wrapR]), i.texParameteri(T, i.TEXTURE_MAG_FILTER, ut[y.magFilter]), i.texParameteri(T, i.TEXTURE_MIN_FILTER, ut[y.minFilter]), y.compareFunction && (i.texParameteri(T, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(T, i.TEXTURE_COMPARE_FUNC, dt[y.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (y.magFilter === Ve || y.minFilter !== Ls && y.minFilter !== Un || y.type === mn && t.has("OES_texture_float_linear") === !1) return;
      if (y.anisotropy > 1 || n.get(y).__currentAnisotropy) {
        const U = t.get("EXT_texture_filter_anisotropic");
        i.texParameterf(T, U.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(y.anisotropy, s.getMaxAnisotropy())), n.get(y).__currentAnisotropy = y.anisotropy;
      }
    }
  }
  function Yt(T, y) {
    let U = !1;
    T.__webglInit === void 0 && (T.__webglInit = !0, y.addEventListener("dispose", P));
    const q = y.source;
    let Z = d.get(q);
    Z === void 0 && (Z = {}, d.set(q, Z));
    const j = z(y);
    if (j !== T.__cacheKey) {
      Z[j] === void 0 && (Z[j] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, U = !0), Z[j].usedTimes++;
      const St = Z[T.__cacheKey];
      St !== void 0 && (Z[T.__cacheKey].usedTimes--, St.usedTimes === 0 && L(y)), T.__cacheKey = j, T.__webglTexture = Z[j].texture;
    }
    return U;
  }
  function ee(T, y, U) {
    let q = i.TEXTURE_2D;
    (y.isDataArrayTexture || y.isCompressedArrayTexture) && (q = i.TEXTURE_2D_ARRAY), y.isData3DTexture && (q = i.TEXTURE_3D);
    const Z = Yt(T, y), j = y.source;
    e.bindTexture(q, T.__webglTexture, i.TEXTURE0 + U);
    const St = n.get(j);
    if (j.version !== St.__version || Z === !0) {
      e.activeTexture(i.TEXTURE0 + U);
      const rt = qt.getPrimaries(qt.workingColorSpace), pt = y.colorSpace === qn ? null : qt.getPrimaries(y.colorSpace), jt = y.colorSpace === qn || rt === pt ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, y.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, y.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, y.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, jt);
      let et = _(y.image, !1, s.maxTextureSize);
      et = le(y, et);
      const mt = r.convert(y.format, y.colorSpace), Pt = r.convert(y.type);
      let Lt = S(y.internalFormat, mt, Pt, y.colorSpace, y.isVideoTexture);
      Mt(q, y);
      let gt;
      const Ht = y.mipmaps, Ut = y.isVideoTexture !== !0, ae = St.__version === void 0 || Z === !0, I = j.dataReady, ct = M(y, et);
      if (y.isDepthTexture)
        Lt = x(y.format === is, y.type), ae && (Ut ? e.texStorage2D(i.TEXTURE_2D, 1, Lt, et.width, et.height) : e.texImage2D(i.TEXTURE_2D, 0, Lt, et.width, et.height, 0, mt, Pt, null));
      else if (y.isDataTexture)
        if (Ht.length > 0) {
          Ut && ae && e.texStorage2D(i.TEXTURE_2D, ct, Lt, Ht[0].width, Ht[0].height);
          for (let V = 0, Y = Ht.length; V < Y; V++)
            gt = Ht[V], Ut ? I && e.texSubImage2D(i.TEXTURE_2D, V, 0, 0, gt.width, gt.height, mt, Pt, gt.data) : e.texImage2D(i.TEXTURE_2D, V, Lt, gt.width, gt.height, 0, mt, Pt, gt.data);
          y.generateMipmaps = !1;
        } else
          Ut ? (ae && e.texStorage2D(i.TEXTURE_2D, ct, Lt, et.width, et.height), I && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, et.width, et.height, mt, Pt, et.data)) : e.texImage2D(i.TEXTURE_2D, 0, Lt, et.width, et.height, 0, mt, Pt, et.data);
      else if (y.isCompressedTexture)
        if (y.isCompressedArrayTexture) {
          Ut && ae && e.texStorage3D(i.TEXTURE_2D_ARRAY, ct, Lt, Ht[0].width, Ht[0].height, et.depth);
          for (let V = 0, Y = Ht.length; V < Y; V++)
            if (gt = Ht[V], y.format !== rn)
              if (mt !== null)
                if (Ut) {
                  if (I)
                    if (y.layerUpdates.size > 0) {
                      const ot = ih(gt.width, gt.height, y.format, y.type);
                      for (const lt of y.layerUpdates) {
                        const Xt = gt.data.subarray(
                          lt * ot / gt.data.BYTES_PER_ELEMENT,
                          (lt + 1) * ot / gt.data.BYTES_PER_ELEMENT
                        );
                        e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, lt, gt.width, gt.height, 1, mt, Xt, 0, 0);
                      }
                      y.clearLayerUpdates();
                    } else
                      e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, gt.width, gt.height, et.depth, mt, gt.data, 0, 0);
                } else
                  e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, V, Lt, gt.width, gt.height, et.depth, 0, gt.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Ut ? I && e.texSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, gt.width, gt.height, et.depth, mt, Pt, gt.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, V, Lt, gt.width, gt.height, et.depth, 0, mt, Pt, gt.data);
        } else {
          Ut && ae && e.texStorage2D(i.TEXTURE_2D, ct, Lt, Ht[0].width, Ht[0].height);
          for (let V = 0, Y = Ht.length; V < Y; V++)
            gt = Ht[V], y.format !== rn ? mt !== null ? Ut ? I && e.compressedTexSubImage2D(i.TEXTURE_2D, V, 0, 0, gt.width, gt.height, mt, gt.data) : e.compressedTexImage2D(i.TEXTURE_2D, V, Lt, gt.width, gt.height, 0, gt.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ut ? I && e.texSubImage2D(i.TEXTURE_2D, V, 0, 0, gt.width, gt.height, mt, Pt, gt.data) : e.texImage2D(i.TEXTURE_2D, V, Lt, gt.width, gt.height, 0, mt, Pt, gt.data);
        }
      else if (y.isDataArrayTexture)
        if (Ut) {
          if (ae && e.texStorage3D(i.TEXTURE_2D_ARRAY, ct, Lt, et.width, et.height, et.depth), I)
            if (y.layerUpdates.size > 0) {
              const V = ih(et.width, et.height, y.format, y.type);
              for (const Y of y.layerUpdates) {
                const ot = et.data.subarray(
                  Y * V / et.data.BYTES_PER_ELEMENT,
                  (Y + 1) * V / et.data.BYTES_PER_ELEMENT
                );
                e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, Y, et.width, et.height, 1, mt, Pt, ot);
              }
              y.clearLayerUpdates();
            } else
              e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, et.width, et.height, et.depth, mt, Pt, et.data);
        } else
          e.texImage3D(i.TEXTURE_2D_ARRAY, 0, Lt, et.width, et.height, et.depth, 0, mt, Pt, et.data);
      else if (y.isData3DTexture)
        Ut ? (ae && e.texStorage3D(i.TEXTURE_3D, ct, Lt, et.width, et.height, et.depth), I && e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, et.width, et.height, et.depth, mt, Pt, et.data)) : e.texImage3D(i.TEXTURE_3D, 0, Lt, et.width, et.height, et.depth, 0, mt, Pt, et.data);
      else if (y.isFramebufferTexture) {
        if (ae)
          if (Ut)
            e.texStorage2D(i.TEXTURE_2D, ct, Lt, et.width, et.height);
          else {
            let V = et.width, Y = et.height;
            for (let ot = 0; ot < ct; ot++)
              e.texImage2D(i.TEXTURE_2D, ot, Lt, V, Y, 0, mt, Pt, null), V >>= 1, Y >>= 1;
          }
      } else if (Ht.length > 0) {
        if (Ut && ae) {
          const V = It(Ht[0]);
          e.texStorage2D(i.TEXTURE_2D, ct, Lt, V.width, V.height);
        }
        for (let V = 0, Y = Ht.length; V < Y; V++)
          gt = Ht[V], Ut ? I && e.texSubImage2D(i.TEXTURE_2D, V, 0, 0, mt, Pt, gt) : e.texImage2D(i.TEXTURE_2D, V, Lt, mt, Pt, gt);
        y.generateMipmaps = !1;
      } else if (Ut) {
        if (ae) {
          const V = It(et);
          e.texStorage2D(i.TEXTURE_2D, ct, Lt, V.width, V.height);
        }
        I && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, mt, Pt, et);
      } else
        e.texImage2D(i.TEXTURE_2D, 0, Lt, mt, Pt, et);
      p(y) && m(q), St.__version = j.version, y.onUpdate && y.onUpdate(y);
    }
    T.__version = y.version;
  }
  function $(T, y, U) {
    if (y.image.length !== 6) return;
    const q = Yt(T, y), Z = y.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, T.__webglTexture, i.TEXTURE0 + U);
    const j = n.get(Z);
    if (Z.version !== j.__version || q === !0) {
      e.activeTexture(i.TEXTURE0 + U);
      const St = qt.getPrimaries(qt.workingColorSpace), rt = y.colorSpace === qn ? null : qt.getPrimaries(y.colorSpace), pt = y.colorSpace === qn || St === rt ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, y.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, y.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, y.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, pt);
      const jt = y.isCompressedTexture || y.image[0].isCompressedTexture, et = y.image[0] && y.image[0].isDataTexture, mt = [];
      for (let Y = 0; Y < 6; Y++)
        !jt && !et ? mt[Y] = _(y.image[Y], !0, s.maxCubemapSize) : mt[Y] = et ? y.image[Y].image : y.image[Y], mt[Y] = le(y, mt[Y]);
      const Pt = mt[0], Lt = r.convert(y.format, y.colorSpace), gt = r.convert(y.type), Ht = S(y.internalFormat, Lt, gt, y.colorSpace), Ut = y.isVideoTexture !== !0, ae = j.__version === void 0 || q === !0, I = Z.dataReady;
      let ct = M(y, Pt);
      Mt(i.TEXTURE_CUBE_MAP, y);
      let V;
      if (jt) {
        Ut && ae && e.texStorage2D(i.TEXTURE_CUBE_MAP, ct, Ht, Pt.width, Pt.height);
        for (let Y = 0; Y < 6; Y++) {
          V = mt[Y].mipmaps;
          for (let ot = 0; ot < V.length; ot++) {
            const lt = V[ot];
            y.format !== rn ? Lt !== null ? Ut ? I && e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot, 0, 0, lt.width, lt.height, Lt, lt.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot, Ht, lt.width, lt.height, 0, lt.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Ut ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot, 0, 0, lt.width, lt.height, Lt, gt, lt.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot, Ht, lt.width, lt.height, 0, Lt, gt, lt.data);
          }
        }
      } else {
        if (V = y.mipmaps, Ut && ae) {
          V.length > 0 && ct++;
          const Y = It(mt[0]);
          e.texStorage2D(i.TEXTURE_CUBE_MAP, ct, Ht, Y.width, Y.height);
        }
        for (let Y = 0; Y < 6; Y++)
          if (et) {
            Ut ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, 0, 0, mt[Y].width, mt[Y].height, Lt, gt, mt[Y].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, Ht, mt[Y].width, mt[Y].height, 0, Lt, gt, mt[Y].data);
            for (let ot = 0; ot < V.length; ot++) {
              const Xt = V[ot].image[Y].image;
              Ut ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot + 1, 0, 0, Xt.width, Xt.height, Lt, gt, Xt.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot + 1, Ht, Xt.width, Xt.height, 0, Lt, gt, Xt.data);
            }
          } else {
            Ut ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, 0, 0, Lt, gt, mt[Y]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, Ht, Lt, gt, mt[Y]);
            for (let ot = 0; ot < V.length; ot++) {
              const lt = V[ot];
              Ut ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot + 1, 0, 0, Lt, gt, lt.image[Y]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot + 1, Ht, Lt, gt, lt.image[Y]);
            }
          }
      }
      p(y) && m(i.TEXTURE_CUBE_MAP), j.__version = Z.version, y.onUpdate && y.onUpdate(y);
    }
    T.__version = y.version;
  }
  function Q(T, y, U, q, Z, j) {
    const St = r.convert(U.format, U.colorSpace), rt = r.convert(U.type), pt = S(U.internalFormat, St, rt, U.colorSpace);
    if (!n.get(y).__hasExternalTextures) {
      const et = Math.max(1, y.width >> j), mt = Math.max(1, y.height >> j);
      Z === i.TEXTURE_3D || Z === i.TEXTURE_2D_ARRAY ? e.texImage3D(Z, j, pt, et, mt, y.depth, 0, St, rt, null) : e.texImage2D(Z, j, pt, et, mt, 0, St, rt, null);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, T), $t(y) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, q, Z, n.get(U).__webglTexture, 0, kt(y)) : (Z === i.TEXTURE_2D || Z >= i.TEXTURE_CUBE_MAP_POSITIVE_X && Z <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, q, Z, n.get(U).__webglTexture, j), e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function xt(T, y, U) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, T), y.depthBuffer) {
      const q = y.depthTexture, Z = q && q.isDepthTexture ? q.type : null, j = x(y.stencilBuffer, Z), St = y.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, rt = kt(y);
      $t(y) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, rt, j, y.width, y.height) : U ? i.renderbufferStorageMultisample(i.RENDERBUFFER, rt, j, y.width, y.height) : i.renderbufferStorage(i.RENDERBUFFER, j, y.width, y.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, St, i.RENDERBUFFER, T);
    } else {
      const q = y.textures;
      for (let Z = 0; Z < q.length; Z++) {
        const j = q[Z], St = r.convert(j.format, j.colorSpace), rt = r.convert(j.type), pt = S(j.internalFormat, St, rt, j.colorSpace), jt = kt(y);
        U && $t(y) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, jt, pt, y.width, y.height) : $t(y) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, jt, pt, y.width, y.height) : i.renderbufferStorage(i.RENDERBUFFER, pt, y.width, y.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function ft(T, y) {
    if (y && y.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (e.bindFramebuffer(i.FRAMEBUFFER, T), !(y.depthTexture && y.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!n.get(y.depthTexture).__webglTexture || y.depthTexture.image.width !== y.width || y.depthTexture.image.height !== y.height) && (y.depthTexture.image.width = y.width, y.depthTexture.image.height = y.height, y.depthTexture.needsUpdate = !0), H(y.depthTexture, 0);
    const q = n.get(y.depthTexture).__webglTexture, Z = kt(y);
    if (y.depthTexture.format === $i)
      $t(y) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, q, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, q, 0);
    else if (y.depthTexture.format === is)
      $t(y) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, q, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, q, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Nt(T) {
    const y = n.get(T), U = T.isWebGLCubeRenderTarget === !0;
    if (y.__boundDepthTexture !== T.depthTexture) {
      const q = T.depthTexture;
      if (y.__depthDisposeCallback && y.__depthDisposeCallback(), q) {
        const Z = () => {
          delete y.__boundDepthTexture, delete y.__depthDisposeCallback, q.removeEventListener("dispose", Z);
        };
        q.addEventListener("dispose", Z), y.__depthDisposeCallback = Z;
      }
      y.__boundDepthTexture = q;
    }
    if (T.depthTexture && !y.__autoAllocateDepthBuffer) {
      if (U) throw new Error("target.depthTexture not supported in Cube render targets");
      ft(y.__webglFramebuffer, T);
    } else if (U) {
      y.__webglDepthbuffer = [];
      for (let q = 0; q < 6; q++)
        if (e.bindFramebuffer(i.FRAMEBUFFER, y.__webglFramebuffer[q]), y.__webglDepthbuffer[q] === void 0)
          y.__webglDepthbuffer[q] = i.createRenderbuffer(), xt(y.__webglDepthbuffer[q], T, !1);
        else {
          const Z = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, j = y.__webglDepthbuffer[q];
          i.bindRenderbuffer(i.RENDERBUFFER, j), i.framebufferRenderbuffer(i.FRAMEBUFFER, Z, i.RENDERBUFFER, j);
        }
    } else if (e.bindFramebuffer(i.FRAMEBUFFER, y.__webglFramebuffer), y.__webglDepthbuffer === void 0)
      y.__webglDepthbuffer = i.createRenderbuffer(), xt(y.__webglDepthbuffer, T, !1);
    else {
      const q = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Z = y.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, Z), i.framebufferRenderbuffer(i.FRAMEBUFFER, q, i.RENDERBUFFER, Z);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function wt(T, y, U) {
    const q = n.get(T);
    y !== void 0 && Q(q.__webglFramebuffer, T, T.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), U !== void 0 && Nt(T);
  }
  function Gt(T) {
    const y = T.texture, U = n.get(T), q = n.get(y);
    T.addEventListener("dispose", R);
    const Z = T.textures, j = T.isWebGLCubeRenderTarget === !0, St = Z.length > 1;
    if (St || (q.__webglTexture === void 0 && (q.__webglTexture = i.createTexture()), q.__version = y.version, o.memory.textures++), j) {
      U.__webglFramebuffer = [];
      for (let rt = 0; rt < 6; rt++)
        if (y.mipmaps && y.mipmaps.length > 0) {
          U.__webglFramebuffer[rt] = [];
          for (let pt = 0; pt < y.mipmaps.length; pt++)
            U.__webglFramebuffer[rt][pt] = i.createFramebuffer();
        } else
          U.__webglFramebuffer[rt] = i.createFramebuffer();
    } else {
      if (y.mipmaps && y.mipmaps.length > 0) {
        U.__webglFramebuffer = [];
        for (let rt = 0; rt < y.mipmaps.length; rt++)
          U.__webglFramebuffer[rt] = i.createFramebuffer();
      } else
        U.__webglFramebuffer = i.createFramebuffer();
      if (St)
        for (let rt = 0, pt = Z.length; rt < pt; rt++) {
          const jt = n.get(Z[rt]);
          jt.__webglTexture === void 0 && (jt.__webglTexture = i.createTexture(), o.memory.textures++);
        }
      if (T.samples > 0 && $t(T) === !1) {
        U.__webglMultisampledFramebuffer = i.createFramebuffer(), U.__webglColorRenderbuffer = [], e.bindFramebuffer(i.FRAMEBUFFER, U.__webglMultisampledFramebuffer);
        for (let rt = 0; rt < Z.length; rt++) {
          const pt = Z[rt];
          U.__webglColorRenderbuffer[rt] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, U.__webglColorRenderbuffer[rt]);
          const jt = r.convert(pt.format, pt.colorSpace), et = r.convert(pt.type), mt = S(pt.internalFormat, jt, et, pt.colorSpace, T.isXRRenderTarget === !0), Pt = kt(T);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Pt, mt, T.width, T.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + rt, i.RENDERBUFFER, U.__webglColorRenderbuffer[rt]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), T.depthBuffer && (U.__webglDepthRenderbuffer = i.createRenderbuffer(), xt(U.__webglDepthRenderbuffer, T, !0)), e.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (j) {
      e.bindTexture(i.TEXTURE_CUBE_MAP, q.__webglTexture), Mt(i.TEXTURE_CUBE_MAP, y);
      for (let rt = 0; rt < 6; rt++)
        if (y.mipmaps && y.mipmaps.length > 0)
          for (let pt = 0; pt < y.mipmaps.length; pt++)
            Q(U.__webglFramebuffer[rt][pt], T, y, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, pt);
        else
          Q(U.__webglFramebuffer[rt], T, y, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, 0);
      p(y) && m(i.TEXTURE_CUBE_MAP), e.unbindTexture();
    } else if (St) {
      for (let rt = 0, pt = Z.length; rt < pt; rt++) {
        const jt = Z[rt], et = n.get(jt);
        e.bindTexture(i.TEXTURE_2D, et.__webglTexture), Mt(i.TEXTURE_2D, jt), Q(U.__webglFramebuffer, T, jt, i.COLOR_ATTACHMENT0 + rt, i.TEXTURE_2D, 0), p(jt) && m(i.TEXTURE_2D);
      }
      e.unbindTexture();
    } else {
      let rt = i.TEXTURE_2D;
      if ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (rt = T.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(rt, q.__webglTexture), Mt(rt, y), y.mipmaps && y.mipmaps.length > 0)
        for (let pt = 0; pt < y.mipmaps.length; pt++)
          Q(U.__webglFramebuffer[pt], T, y, i.COLOR_ATTACHMENT0, rt, pt);
      else
        Q(U.__webglFramebuffer, T, y, i.COLOR_ATTACHMENT0, rt, 0);
      p(y) && m(rt), e.unbindTexture();
    }
    T.depthBuffer && Nt(T);
  }
  function re(T) {
    const y = T.textures;
    for (let U = 0, q = y.length; U < q; U++) {
      const Z = y[U];
      if (p(Z)) {
        const j = T.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : i.TEXTURE_2D, St = n.get(Z).__webglTexture;
        e.bindTexture(j, St), m(j), e.unbindTexture();
      }
    }
  }
  const Wt = [], C = [];
  function qe(T) {
    if (T.samples > 0) {
      if ($t(T) === !1) {
        const y = T.textures, U = T.width, q = T.height;
        let Z = i.COLOR_BUFFER_BIT;
        const j = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, St = n.get(T), rt = y.length > 1;
        if (rt)
          for (let pt = 0; pt < y.length; pt++)
            e.bindFramebuffer(i.FRAMEBUFFER, St.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + pt, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, St.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + pt, i.TEXTURE_2D, null, 0);
        e.bindFramebuffer(i.READ_FRAMEBUFFER, St.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, St.__webglFramebuffer);
        for (let pt = 0; pt < y.length; pt++) {
          if (T.resolveDepthBuffer && (T.depthBuffer && (Z |= i.DEPTH_BUFFER_BIT), T.stencilBuffer && T.resolveStencilBuffer && (Z |= i.STENCIL_BUFFER_BIT)), rt) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, St.__webglColorRenderbuffer[pt]);
            const jt = n.get(y[pt]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, jt, 0);
          }
          i.blitFramebuffer(0, 0, U, q, 0, 0, U, q, Z, i.NEAREST), c === !0 && (Wt.length = 0, C.length = 0, Wt.push(i.COLOR_ATTACHMENT0 + pt), T.depthBuffer && T.resolveDepthBuffer === !1 && (Wt.push(j), C.push(j), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, C)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, Wt));
        }
        if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), rt)
          for (let pt = 0; pt < y.length; pt++) {
            e.bindFramebuffer(i.FRAMEBUFFER, St.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + pt, i.RENDERBUFFER, St.__webglColorRenderbuffer[pt]);
            const jt = n.get(y[pt]).__webglTexture;
            e.bindFramebuffer(i.FRAMEBUFFER, St.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + pt, i.TEXTURE_2D, jt, 0);
          }
        e.bindFramebuffer(i.DRAW_FRAMEBUFFER, St.__webglMultisampledFramebuffer);
      } else if (T.depthBuffer && T.resolveDepthBuffer === !1 && c) {
        const y = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [y]);
      }
    }
  }
  function kt(T) {
    return Math.min(s.maxSamples, T.samples);
  }
  function $t(T) {
    const y = n.get(T);
    return T.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && y.__useRenderToTexture !== !1;
  }
  function Ct(T) {
    const y = o.render.frame;
    h.get(T) !== y && (h.set(T, y), T.update());
  }
  function le(T, y) {
    const U = T.colorSpace, q = T.format, Z = T.type;
    return T.isCompressedTexture === !0 || T.isVideoTexture === !0 || U !== De && U !== qn && (qt.getTransfer(U) === ue ? (q !== rn || Z !== Bn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", U)), y;
  }
  function It(T) {
    return typeof HTMLImageElement < "u" && T instanceof HTMLImageElement ? (l.width = T.naturalWidth || T.width, l.height = T.naturalHeight || T.height) : typeof VideoFrame < "u" && T instanceof VideoFrame ? (l.width = T.displayWidth, l.height = T.displayHeight) : (l.width = T.width, l.height = T.height), l;
  }
  this.allocateTextureUnit = B, this.resetTextureUnits = b, this.setTexture2D = H, this.setTexture2DArray = K, this.setTexture3D = k, this.setTextureCube = nt, this.rebindTextures = wt, this.setupRenderTarget = Gt, this.updateRenderTargetMipmap = re, this.updateMultisampleRenderTarget = qe, this.setupDepthRenderbuffer = Nt, this.setupFrameBufferTexture = Q, this.useMultisampledRTT = $t;
}
function J0(i, t) {
  function e(n, s = qn) {
    let r;
    const o = qt.getTransfer(s);
    if (n === Bn) return i.UNSIGNED_BYTE;
    if (n === pc) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === mc) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === fu) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === uu) return i.BYTE;
    if (n === du) return i.SHORT;
    if (n === Gs) return i.UNSIGNED_SHORT;
    if (n === fc) return i.INT;
    if (n === gi) return i.UNSIGNED_INT;
    if (n === mn) return i.FLOAT;
    if (n === Qs) return i.HALF_FLOAT;
    if (n === pu) return i.ALPHA;
    if (n === mu) return i.RGB;
    if (n === rn) return i.RGBA;
    if (n === gu) return i.LUMINANCE;
    if (n === _u) return i.LUMINANCE_ALPHA;
    if (n === $i) return i.DEPTH_COMPONENT;
    if (n === is) return i.DEPTH_STENCIL;
    if (n === gc) return i.RED;
    if (n === _c) return i.RED_INTEGER;
    if (n === vu) return i.RG;
    if (n === vc) return i.RG_INTEGER;
    if (n === xc) return i.RGBA_INTEGER;
    if (n === Gr || n === Wr || n === Xr || n === $r)
      if (o === ue)
        if (r = t.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
          if (n === Gr) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === Wr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === Xr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === $r) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (r = t.get("WEBGL_compressed_texture_s3tc"), r !== null) {
        if (n === Gr) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === Wr) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === Xr) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === $r) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === Ma || n === Sa || n === Ea || n === ba)
      if (r = t.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
        if (n === Ma) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === Sa) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === Ea) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === ba) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === Ta || n === Aa || n === wa)
      if (r = t.get("WEBGL_compressed_texture_etc"), r !== null) {
        if (n === Ta || n === Aa) return o === ue ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (n === wa) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === Ra || n === Ca || n === Pa || n === La || n === Ia || n === Da || n === Na || n === Ua || n === Oa || n === Fa || n === Ba || n === za || n === ka || n === Ha)
      if (r = t.get("WEBGL_compressed_texture_astc"), r !== null) {
        if (n === Ra) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === Ca) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === Pa) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === La) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === Ia) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === Da) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === Na) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === Ua) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === Oa) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === Fa) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === Ba) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === za) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === ka) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === Ha) return o === ue ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === jr || n === Va || n === Ga)
      if (r = t.get("EXT_texture_compression_bptc"), r !== null) {
        if (n === jr) return o === ue ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === Va) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === Ga) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === xu || n === Wa || n === Xa || n === $a)
      if (r = t.get("EXT_texture_compression_rgtc"), r !== null) {
        if (n === jr) return r.COMPRESSED_RED_RGTC1_EXT;
        if (n === Wa) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === Xa) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === $a) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === ns ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: e };
}
class Q0 extends Be {
  constructor(t = []) {
    super(), this.isArrayCamera = !0, this.cameras = t;
  }
}
class _t extends de {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const tv = { type: "move" };
class Yo {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new _t(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new _t(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new w(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new w()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new _t(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new w(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new w()), this._grip;
  }
  dispatchEvent(t) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(t), this._grip !== null && this._grip.dispatchEvent(t), this._hand !== null && this._hand.dispatchEvent(t), this;
  }
  connect(t) {
    if (t && t.hand) {
      const e = this._hand;
      if (e)
        for (const n of t.hand.values())
          this._getHandJoint(e, n);
    }
    return this.dispatchEvent({ type: "connected", data: t }), this;
  }
  disconnect(t) {
    return this.dispatchEvent({ type: "disconnected", data: t }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(t, e, n) {
    let s = null, r = null, o = null;
    const a = this._targetRay, c = this._grip, l = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (l && t.hand) {
        o = !0;
        for (const _ of t.hand.values()) {
          const p = e.getJointPose(_, n), m = this._getHandJoint(l, _);
          p !== null && (m.matrix.fromArray(p.transform.matrix), m.matrix.decompose(m.position, m.rotation, m.scale), m.matrixWorldNeedsUpdate = !0, m.jointRadius = p.radius), m.visible = p !== null;
        }
        const h = l.joints["index-finger-tip"], u = l.joints["thumb-tip"], d = h.position.distanceTo(u.position), f = 0.02, g = 5e-3;
        l.inputState.pinching && d > f + g ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: t.handedness,
          target: this
        })) : !l.inputState.pinching && d <= f - g && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: t.handedness,
          target: this
        }));
      } else
        c !== null && t.gripSpace && (r = e.getPose(t.gripSpace, n), r !== null && (c.matrix.fromArray(r.transform.matrix), c.matrix.decompose(c.position, c.rotation, c.scale), c.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (c.hasLinearVelocity = !0, c.linearVelocity.copy(r.linearVelocity)) : c.hasLinearVelocity = !1, r.angularVelocity ? (c.hasAngularVelocity = !0, c.angularVelocity.copy(r.angularVelocity)) : c.hasAngularVelocity = !1));
      a !== null && (s = e.getPose(t.targetRaySpace, n), s === null && r !== null && (s = r), s !== null && (a.matrix.fromArray(s.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(s.linearVelocity)) : a.hasLinearVelocity = !1, s.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(s.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(tv)));
    }
    return a !== null && (a.visible = s !== null), c !== null && (c.visible = r !== null), l !== null && (l.visible = o !== null), this;
  }
  // private method
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const n = new _t();
      n.matrixAutoUpdate = !1, n.visible = !1, t.joints[e.jointName] = n, t.add(n);
    }
    return t.joints[e.jointName];
  }
}
const ev = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, nv = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class iv {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(t, e, n) {
    if (this.texture === null) {
      const s = new be(), r = t.properties.get(s);
      r.__webglTexture = e.texture, (e.depthNear != n.depthNear || e.depthFar != n.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = s;
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport, n = new Qn({
        vertexShader: ev,
        fragmentShader: nv,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: e.z },
          depthHeight: { value: e.w }
        }
      });
      this.mesh = new ge(new ho(20, 20), n);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class sv extends xi {
  constructor(t, e) {
    super();
    const n = this;
    let s = null, r = 1, o = null, a = "local-floor", c = 1, l = null, h = null, u = null, d = null, f = null, g = null;
    const _ = new iv(), p = e.getContextAttributes();
    let m = null, S = null;
    const x = [], M = [], P = new tt();
    let R = null;
    const A = new Be();
    A.layers.enable(1), A.viewport = new Zt();
    const L = new Be();
    L.layers.enable(2), L.viewport = new Zt();
    const G = [A, L], v = new Q0();
    v.layers.enable(1), v.layers.enable(2);
    let b = null, B = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function($) {
      let Q = x[$];
      return Q === void 0 && (Q = new Yo(), x[$] = Q), Q.getTargetRaySpace();
    }, this.getControllerGrip = function($) {
      let Q = x[$];
      return Q === void 0 && (Q = new Yo(), x[$] = Q), Q.getGripSpace();
    }, this.getHand = function($) {
      let Q = x[$];
      return Q === void 0 && (Q = new Yo(), x[$] = Q), Q.getHandSpace();
    };
    function z($) {
      const Q = M.indexOf($.inputSource);
      if (Q === -1)
        return;
      const xt = x[Q];
      xt !== void 0 && (xt.update($.inputSource, $.frame, l || o), xt.dispatchEvent({ type: $.type, data: $.inputSource }));
    }
    function H() {
      s.removeEventListener("select", z), s.removeEventListener("selectstart", z), s.removeEventListener("selectend", z), s.removeEventListener("squeeze", z), s.removeEventListener("squeezestart", z), s.removeEventListener("squeezeend", z), s.removeEventListener("end", H), s.removeEventListener("inputsourceschange", K);
      for (let $ = 0; $ < x.length; $++) {
        const Q = M[$];
        Q !== null && (M[$] = null, x[$].disconnect(Q));
      }
      b = null, B = null, _.reset(), t.setRenderTarget(m), f = null, d = null, u = null, s = null, S = null, ee.stop(), n.isPresenting = !1, t.setPixelRatio(R), t.setSize(P.width, P.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function($) {
      r = $, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function($) {
      a = $, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return l || o;
    }, this.setReferenceSpace = function($) {
      l = $;
    }, this.getBaseLayer = function() {
      return d !== null ? d : f;
    }, this.getBinding = function() {
      return u;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return s;
    }, this.setSession = async function($) {
      if (s = $, s !== null) {
        if (m = t.getRenderTarget(), s.addEventListener("select", z), s.addEventListener("selectstart", z), s.addEventListener("selectend", z), s.addEventListener("squeeze", z), s.addEventListener("squeezestart", z), s.addEventListener("squeezeend", z), s.addEventListener("end", H), s.addEventListener("inputsourceschange", K), p.xrCompatible !== !0 && await e.makeXRCompatible(), R = t.getPixelRatio(), t.getSize(P), s.renderState.layers === void 0) {
          const Q = {
            antialias: p.antialias,
            alpha: !0,
            depth: p.depth,
            stencil: p.stencil,
            framebufferScaleFactor: r
          };
          f = new XRWebGLLayer(s, e, Q), s.updateRenderState({ baseLayer: f }), t.setPixelRatio(1), t.setSize(f.framebufferWidth, f.framebufferHeight, !1), S = new _i(
            f.framebufferWidth,
            f.framebufferHeight,
            {
              format: rn,
              type: Bn,
              colorSpace: t.outputColorSpace,
              stencilBuffer: p.stencil
            }
          );
        } else {
          let Q = null, xt = null, ft = null;
          p.depth && (ft = p.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, Q = p.stencil ? is : $i, xt = p.stencil ? ns : gi);
          const Nt = {
            colorFormat: e.RGBA8,
            depthFormat: ft,
            scaleFactor: r
          };
          u = new XRWebGLBinding(s, e), d = u.createProjectionLayer(Nt), s.updateRenderState({ layers: [d] }), t.setPixelRatio(1), t.setSize(d.textureWidth, d.textureHeight, !1), S = new _i(
            d.textureWidth,
            d.textureHeight,
            {
              format: rn,
              type: Bn,
              depthTexture: new Du(d.textureWidth, d.textureHeight, xt, void 0, void 0, void 0, void 0, void 0, void 0, Q),
              stencilBuffer: p.stencil,
              colorSpace: t.outputColorSpace,
              samples: p.antialias ? 4 : 0,
              resolveDepthBuffer: d.ignoreDepthValues === !1
            }
          );
        }
        S.isXRRenderTarget = !0, this.setFoveation(c), l = null, o = await s.requestReferenceSpace(a), ee.setContext(s), ee.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (s !== null)
        return s.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return _.getDepthTexture();
    };
    function K($) {
      for (let Q = 0; Q < $.removed.length; Q++) {
        const xt = $.removed[Q], ft = M.indexOf(xt);
        ft >= 0 && (M[ft] = null, x[ft].disconnect(xt));
      }
      for (let Q = 0; Q < $.added.length; Q++) {
        const xt = $.added[Q];
        let ft = M.indexOf(xt);
        if (ft === -1) {
          for (let wt = 0; wt < x.length; wt++)
            if (wt >= M.length) {
              M.push(xt), ft = wt;
              break;
            } else if (M[wt] === null) {
              M[wt] = xt, ft = wt;
              break;
            }
          if (ft === -1) break;
        }
        const Nt = x[ft];
        Nt && Nt.connect(xt);
      }
    }
    const k = new w(), nt = new w();
    function W($, Q, xt) {
      k.setFromMatrixPosition(Q.matrixWorld), nt.setFromMatrixPosition(xt.matrixWorld);
      const ft = k.distanceTo(nt), Nt = Q.projectionMatrix.elements, wt = xt.projectionMatrix.elements, Gt = Nt[14] / (Nt[10] - 1), re = Nt[14] / (Nt[10] + 1), Wt = (Nt[9] + 1) / Nt[5], C = (Nt[9] - 1) / Nt[5], qe = (Nt[8] - 1) / Nt[0], kt = (wt[8] + 1) / wt[0], $t = Gt * qe, Ct = Gt * kt, le = ft / (-qe + kt), It = le * -qe;
      if (Q.matrixWorld.decompose($.position, $.quaternion, $.scale), $.translateX(It), $.translateZ(le), $.matrixWorld.compose($.position, $.quaternion, $.scale), $.matrixWorldInverse.copy($.matrixWorld).invert(), Nt[10] === -1)
        $.projectionMatrix.copy(Q.projectionMatrix), $.projectionMatrixInverse.copy(Q.projectionMatrixInverse);
      else {
        const T = Gt + le, y = re + le, U = $t - It, q = Ct + (ft - It), Z = Wt * re / y * T, j = C * re / y * T;
        $.projectionMatrix.makePerspective(U, q, Z, j, T, y), $.projectionMatrixInverse.copy($.projectionMatrix).invert();
      }
    }
    function ut($, Q) {
      Q === null ? $.matrixWorld.copy($.matrix) : $.matrixWorld.multiplyMatrices(Q.matrixWorld, $.matrix), $.matrixWorldInverse.copy($.matrixWorld).invert();
    }
    this.updateCamera = function($) {
      if (s === null) return;
      let Q = $.near, xt = $.far;
      _.texture !== null && (_.depthNear > 0 && (Q = _.depthNear), _.depthFar > 0 && (xt = _.depthFar)), v.near = L.near = A.near = Q, v.far = L.far = A.far = xt, (b !== v.near || B !== v.far) && (s.updateRenderState({
        depthNear: v.near,
        depthFar: v.far
      }), b = v.near, B = v.far);
      const ft = $.parent, Nt = v.cameras;
      ut(v, ft);
      for (let wt = 0; wt < Nt.length; wt++)
        ut(Nt[wt], ft);
      Nt.length === 2 ? W(v, A, L) : v.projectionMatrix.copy(A.projectionMatrix), dt($, v, ft);
    };
    function dt($, Q, xt) {
      xt === null ? $.matrix.copy(Q.matrixWorld) : ($.matrix.copy(xt.matrixWorld), $.matrix.invert(), $.matrix.multiply(Q.matrixWorld)), $.matrix.decompose($.position, $.quaternion, $.scale), $.updateMatrixWorld(!0), $.projectionMatrix.copy(Q.projectionMatrix), $.projectionMatrixInverse.copy(Q.projectionMatrixInverse), $.isPerspectiveCamera && ($.fov = ss * 2 * Math.atan(1 / $.projectionMatrix.elements[5]), $.zoom = 1);
    }
    this.getCamera = function() {
      return v;
    }, this.getFoveation = function() {
      if (!(d === null && f === null))
        return c;
    }, this.setFoveation = function($) {
      c = $, d !== null && (d.fixedFoveation = $), f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = $);
    }, this.hasDepthSensing = function() {
      return _.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return _.getMesh(v);
    };
    let Mt = null;
    function Yt($, Q) {
      if (h = Q.getViewerPose(l || o), g = Q, h !== null) {
        const xt = h.views;
        f !== null && (t.setRenderTargetFramebuffer(S, f.framebuffer), t.setRenderTarget(S));
        let ft = !1;
        xt.length !== v.cameras.length && (v.cameras.length = 0, ft = !0);
        for (let wt = 0; wt < xt.length; wt++) {
          const Gt = xt[wt];
          let re = null;
          if (f !== null)
            re = f.getViewport(Gt);
          else {
            const C = u.getViewSubImage(d, Gt);
            re = C.viewport, wt === 0 && (t.setRenderTargetTextures(
              S,
              C.colorTexture,
              d.ignoreDepthValues ? void 0 : C.depthStencilTexture
            ), t.setRenderTarget(S));
          }
          let Wt = G[wt];
          Wt === void 0 && (Wt = new Be(), Wt.layers.enable(wt), Wt.viewport = new Zt(), G[wt] = Wt), Wt.matrix.fromArray(Gt.transform.matrix), Wt.matrix.decompose(Wt.position, Wt.quaternion, Wt.scale), Wt.projectionMatrix.fromArray(Gt.projectionMatrix), Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(), Wt.viewport.set(re.x, re.y, re.width, re.height), wt === 0 && (v.matrix.copy(Wt.matrix), v.matrix.decompose(v.position, v.quaternion, v.scale)), ft === !0 && v.cameras.push(Wt);
        }
        const Nt = s.enabledFeatures;
        if (Nt && Nt.includes("depth-sensing")) {
          const wt = u.getDepthInformation(xt[0]);
          wt && wt.isValid && wt.texture && _.init(t, wt, s.renderState);
        }
      }
      for (let xt = 0; xt < x.length; xt++) {
        const ft = M[xt], Nt = x[xt];
        ft !== null && Nt !== void 0 && Nt.update(ft, Q, l || o);
      }
      Mt && Mt($, Q), Q.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: Q }), g = null;
    }
    const ee = new Iu();
    ee.setAnimationLoop(Yt), this.setAnimationLoop = function($) {
      Mt = $;
    }, this.dispose = function() {
    };
  }
}
const li = /* @__PURE__ */ new yn(), rv = /* @__PURE__ */ new Dt();
function ov(i, t) {
  function e(p, m) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), m.value.copy(p.matrix);
  }
  function n(p, m) {
    m.color.getRGB(p.fogColor.value, Cu(i)), m.isFog ? (p.fogNear.value = m.near, p.fogFar.value = m.far) : m.isFogExp2 && (p.fogDensity.value = m.density);
  }
  function s(p, m, S, x, M) {
    m.isMeshBasicMaterial || m.isMeshLambertMaterial ? r(p, m) : m.isMeshToonMaterial ? (r(p, m), u(p, m)) : m.isMeshPhongMaterial ? (r(p, m), h(p, m)) : m.isMeshStandardMaterial ? (r(p, m), d(p, m), m.isMeshPhysicalMaterial && f(p, m, M)) : m.isMeshMatcapMaterial ? (r(p, m), g(p, m)) : m.isMeshDepthMaterial ? r(p, m) : m.isMeshDistanceMaterial ? (r(p, m), _(p, m)) : m.isMeshNormalMaterial ? r(p, m) : m.isLineBasicMaterial ? (o(p, m), m.isLineDashedMaterial && a(p, m)) : m.isPointsMaterial ? c(p, m, S, x) : m.isSpriteMaterial ? l(p, m) : m.isShadowMaterial ? (p.color.value.copy(m.color), p.opacity.value = m.opacity) : m.isShaderMaterial && (m.uniformsNeedUpdate = !1);
  }
  function r(p, m) {
    p.opacity.value = m.opacity, m.color && p.diffuse.value.copy(m.color), m.emissive && p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity), m.map && (p.map.value = m.map, e(m.map, p.mapTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, e(m.alphaMap, p.alphaMapTransform)), m.bumpMap && (p.bumpMap.value = m.bumpMap, e(m.bumpMap, p.bumpMapTransform), p.bumpScale.value = m.bumpScale, m.side === $e && (p.bumpScale.value *= -1)), m.normalMap && (p.normalMap.value = m.normalMap, e(m.normalMap, p.normalMapTransform), p.normalScale.value.copy(m.normalScale), m.side === $e && p.normalScale.value.negate()), m.displacementMap && (p.displacementMap.value = m.displacementMap, e(m.displacementMap, p.displacementMapTransform), p.displacementScale.value = m.displacementScale, p.displacementBias.value = m.displacementBias), m.emissiveMap && (p.emissiveMap.value = m.emissiveMap, e(m.emissiveMap, p.emissiveMapTransform)), m.specularMap && (p.specularMap.value = m.specularMap, e(m.specularMap, p.specularMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
    const S = t.get(m), x = S.envMap, M = S.envMapRotation;
    x && (p.envMap.value = x, li.copy(M), li.x *= -1, li.y *= -1, li.z *= -1, x.isCubeTexture && x.isRenderTargetTexture === !1 && (li.y *= -1, li.z *= -1), p.envMapRotation.value.setFromMatrix4(rv.makeRotationFromEuler(li)), p.flipEnvMap.value = x.isCubeTexture && x.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = m.reflectivity, p.ior.value = m.ior, p.refractionRatio.value = m.refractionRatio), m.lightMap && (p.lightMap.value = m.lightMap, p.lightMapIntensity.value = m.lightMapIntensity, e(m.lightMap, p.lightMapTransform)), m.aoMap && (p.aoMap.value = m.aoMap, p.aoMapIntensity.value = m.aoMapIntensity, e(m.aoMap, p.aoMapTransform));
  }
  function o(p, m) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, m.map && (p.map.value = m.map, e(m.map, p.mapTransform));
  }
  function a(p, m) {
    p.dashSize.value = m.dashSize, p.totalSize.value = m.dashSize + m.gapSize, p.scale.value = m.scale;
  }
  function c(p, m, S, x) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, p.size.value = m.size * S, p.scale.value = x * 0.5, m.map && (p.map.value = m.map, e(m.map, p.uvTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, e(m.alphaMap, p.alphaMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
  }
  function l(p, m) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, p.rotation.value = m.rotation, m.map && (p.map.value = m.map, e(m.map, p.mapTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, e(m.alphaMap, p.alphaMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
  }
  function h(p, m) {
    p.specular.value.copy(m.specular), p.shininess.value = Math.max(m.shininess, 1e-4);
  }
  function u(p, m) {
    m.gradientMap && (p.gradientMap.value = m.gradientMap);
  }
  function d(p, m) {
    p.metalness.value = m.metalness, m.metalnessMap && (p.metalnessMap.value = m.metalnessMap, e(m.metalnessMap, p.metalnessMapTransform)), p.roughness.value = m.roughness, m.roughnessMap && (p.roughnessMap.value = m.roughnessMap, e(m.roughnessMap, p.roughnessMapTransform)), m.envMap && (p.envMapIntensity.value = m.envMapIntensity);
  }
  function f(p, m, S) {
    p.ior.value = m.ior, m.sheen > 0 && (p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen), p.sheenRoughness.value = m.sheenRoughness, m.sheenColorMap && (p.sheenColorMap.value = m.sheenColorMap, e(m.sheenColorMap, p.sheenColorMapTransform)), m.sheenRoughnessMap && (p.sheenRoughnessMap.value = m.sheenRoughnessMap, e(m.sheenRoughnessMap, p.sheenRoughnessMapTransform))), m.clearcoat > 0 && (p.clearcoat.value = m.clearcoat, p.clearcoatRoughness.value = m.clearcoatRoughness, m.clearcoatMap && (p.clearcoatMap.value = m.clearcoatMap, e(m.clearcoatMap, p.clearcoatMapTransform)), m.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = m.clearcoatRoughnessMap, e(m.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), m.clearcoatNormalMap && (p.clearcoatNormalMap.value = m.clearcoatNormalMap, e(m.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale), m.side === $e && p.clearcoatNormalScale.value.negate())), m.dispersion > 0 && (p.dispersion.value = m.dispersion), m.iridescence > 0 && (p.iridescence.value = m.iridescence, p.iridescenceIOR.value = m.iridescenceIOR, p.iridescenceThicknessMinimum.value = m.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = m.iridescenceThicknessRange[1], m.iridescenceMap && (p.iridescenceMap.value = m.iridescenceMap, e(m.iridescenceMap, p.iridescenceMapTransform)), m.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = m.iridescenceThicknessMap, e(m.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), m.transmission > 0 && (p.transmission.value = m.transmission, p.transmissionSamplerMap.value = S.texture, p.transmissionSamplerSize.value.set(S.width, S.height), m.transmissionMap && (p.transmissionMap.value = m.transmissionMap, e(m.transmissionMap, p.transmissionMapTransform)), p.thickness.value = m.thickness, m.thicknessMap && (p.thicknessMap.value = m.thicknessMap, e(m.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = m.attenuationDistance, p.attenuationColor.value.copy(m.attenuationColor)), m.anisotropy > 0 && (p.anisotropyVector.value.set(m.anisotropy * Math.cos(m.anisotropyRotation), m.anisotropy * Math.sin(m.anisotropyRotation)), m.anisotropyMap && (p.anisotropyMap.value = m.anisotropyMap, e(m.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = m.specularIntensity, p.specularColor.value.copy(m.specularColor), m.specularColorMap && (p.specularColorMap.value = m.specularColorMap, e(m.specularColorMap, p.specularColorMapTransform)), m.specularIntensityMap && (p.specularIntensityMap.value = m.specularIntensityMap, e(m.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function g(p, m) {
    m.matcap && (p.matcap.value = m.matcap);
  }
  function _(p, m) {
    const S = t.get(m).light;
    p.referencePosition.value.setFromMatrixPosition(S.matrixWorld), p.nearDistance.value = S.shadow.camera.near, p.farDistance.value = S.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: s
  };
}
function av(i, t, e, n) {
  let s = {}, r = {}, o = [];
  const a = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(S, x) {
    const M = x.program;
    n.uniformBlockBinding(S, M);
  }
  function l(S, x) {
    let M = s[S.id];
    M === void 0 && (g(S), M = h(S), s[S.id] = M, S.addEventListener("dispose", p));
    const P = x.program;
    n.updateUBOMapping(S, P);
    const R = t.render.frame;
    r[S.id] !== R && (d(S), r[S.id] = R);
  }
  function h(S) {
    const x = u();
    S.__bindingPointIndex = x;
    const M = i.createBuffer(), P = S.__size, R = S.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, M), i.bufferData(i.UNIFORM_BUFFER, P, R), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, x, M), M;
  }
  function u() {
    for (let S = 0; S < a; S++)
      if (o.indexOf(S) === -1)
        return o.push(S), S;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(S) {
    const x = s[S.id], M = S.uniforms, P = S.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, x);
    for (let R = 0, A = M.length; R < A; R++) {
      const L = Array.isArray(M[R]) ? M[R] : [M[R]];
      for (let G = 0, v = L.length; G < v; G++) {
        const b = L[G];
        if (f(b, R, G, P) === !0) {
          const B = b.__offset, z = Array.isArray(b.value) ? b.value : [b.value];
          let H = 0;
          for (let K = 0; K < z.length; K++) {
            const k = z[K], nt = _(k);
            typeof k == "number" || typeof k == "boolean" ? (b.__data[0] = k, i.bufferSubData(i.UNIFORM_BUFFER, B + H, b.__data)) : k.isMatrix3 ? (b.__data[0] = k.elements[0], b.__data[1] = k.elements[1], b.__data[2] = k.elements[2], b.__data[3] = 0, b.__data[4] = k.elements[3], b.__data[5] = k.elements[4], b.__data[6] = k.elements[5], b.__data[7] = 0, b.__data[8] = k.elements[6], b.__data[9] = k.elements[7], b.__data[10] = k.elements[8], b.__data[11] = 0) : (k.toArray(b.__data, H), H += nt.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, B, b.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function f(S, x, M, P) {
    const R = S.value, A = x + "_" + M;
    if (P[A] === void 0)
      return typeof R == "number" || typeof R == "boolean" ? P[A] = R : P[A] = R.clone(), !0;
    {
      const L = P[A];
      if (typeof R == "number" || typeof R == "boolean") {
        if (L !== R)
          return P[A] = R, !0;
      } else if (L.equals(R) === !1)
        return L.copy(R), !0;
    }
    return !1;
  }
  function g(S) {
    const x = S.uniforms;
    let M = 0;
    const P = 16;
    for (let A = 0, L = x.length; A < L; A++) {
      const G = Array.isArray(x[A]) ? x[A] : [x[A]];
      for (let v = 0, b = G.length; v < b; v++) {
        const B = G[v], z = Array.isArray(B.value) ? B.value : [B.value];
        for (let H = 0, K = z.length; H < K; H++) {
          const k = z[H], nt = _(k), W = M % P, ut = W % nt.boundary, dt = W + ut;
          M += ut, dt !== 0 && P - dt < nt.storage && (M += P - dt), B.__data = new Float32Array(nt.storage / Float32Array.BYTES_PER_ELEMENT), B.__offset = M, M += nt.storage;
        }
      }
    }
    const R = M % P;
    return R > 0 && (M += P - R), S.__size = M, S.__cache = {}, this;
  }
  function _(S) {
    const x = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof S == "number" || typeof S == "boolean" ? (x.boundary = 4, x.storage = 4) : S.isVector2 ? (x.boundary = 8, x.storage = 8) : S.isVector3 || S.isColor ? (x.boundary = 16, x.storage = 12) : S.isVector4 ? (x.boundary = 16, x.storage = 16) : S.isMatrix3 ? (x.boundary = 48, x.storage = 48) : S.isMatrix4 ? (x.boundary = 64, x.storage = 64) : S.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", S), x;
  }
  function p(S) {
    const x = S.target;
    x.removeEventListener("dispose", p);
    const M = o.indexOf(x.__bindingPointIndex);
    o.splice(M, 1), i.deleteBuffer(s[x.id]), delete s[x.id], delete r[x.id];
  }
  function m() {
    for (const S in s)
      i.deleteBuffer(s[S]);
    o = [], s = {}, r = {};
  }
  return {
    bind: c,
    update: l,
    dispose: m
  };
}
class Bu {
  constructor(t = {}) {
    const {
      canvas: e = Yf(),
      context: n = null,
      depth: s = !0,
      stencil: r = !1,
      alpha: o = !1,
      antialias: a = !1,
      premultipliedAlpha: c = !0,
      preserveDrawingBuffer: l = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: u = !1
    } = t;
    this.isWebGLRenderer = !0;
    let d;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      d = n.getContextAttributes().alpha;
    } else
      d = o;
    const f = new Uint32Array(4), g = new Int32Array(4);
    let _ = null, p = null;
    const m = [], S = [];
    this.domElement = e, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = He, this.toneMapping = Jn, this.toneMappingExposure = 1;
    const x = this;
    let M = !1, P = 0, R = 0, A = null, L = -1, G = null;
    const v = new Zt(), b = new Zt();
    let B = null;
    const z = new Tt(0);
    let H = 0, K = e.width, k = e.height, nt = 1, W = null, ut = null;
    const dt = new Zt(0, 0, K, k), Mt = new Zt(0, 0, K, k);
    let Yt = !1;
    const ee = new Ec();
    let $ = !1, Q = !1;
    const xt = new Dt(), ft = new Dt(), Nt = new w(), wt = new Zt(), Gt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let re = !1;
    function Wt() {
      return A === null ? nt : 1;
    }
    let C = n;
    function qe(E, D) {
      return e.getContext(E, D);
    }
    try {
      const E = {
        alpha: !0,
        depth: s,
        stencil: r,
        antialias: a,
        premultipliedAlpha: c,
        preserveDrawingBuffer: l,
        powerPreference: h,
        failIfMajorPerformanceCaveat: u
      };
      if ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${dc}`), e.addEventListener("webglcontextlost", Y, !1), e.addEventListener("webglcontextrestored", ot, !1), e.addEventListener("webglcontextcreationerror", lt, !1), C === null) {
        const D = "webgl2";
        if (C = qe(D, E), C === null)
          throw qe(D) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (E) {
      throw console.error("THREE.WebGLRenderer: " + E.message), E;
    }
    let kt, $t, Ct, le, It, T, y, U, q, Z, j, St, rt, pt, jt, et, mt, Pt, Lt, gt, Ht, Ut, ae, I;
    function ct() {
      kt = new f_(C), kt.init(), Ut = new J0(C, kt), $t = new a_(C, kt, t, Ut), Ct = new Y0(C), $t.reverseDepthBuffer && Ct.buffers.depth.setReversed(!0), le = new g_(C), It = new N0(), T = new Z0(C, kt, Ct, It, $t, Ut, le), y = new l_(x), U = new d_(x), q = new Ep(C), ae = new r_(C, q), Z = new p_(C, q, le, ae), j = new v_(C, Z, q, le), Lt = new __(C, $t, T), et = new c_(It), St = new D0(x, y, U, kt, $t, ae, et), rt = new ov(x, It), pt = new O0(), jt = new V0(kt), Pt = new s_(x, y, U, Ct, j, d, c), mt = new j0(x, j, $t), I = new av(C, le, $t, Ct), gt = new o_(C, kt, le), Ht = new m_(C, kt, le), le.programs = St.programs, x.capabilities = $t, x.extensions = kt, x.properties = It, x.renderLists = pt, x.shadowMap = mt, x.state = Ct, x.info = le;
    }
    ct();
    const V = new sv(x, C);
    this.xr = V, this.getContext = function() {
      return C;
    }, this.getContextAttributes = function() {
      return C.getContextAttributes();
    }, this.forceContextLoss = function() {
      const E = kt.get("WEBGL_lose_context");
      E && E.loseContext();
    }, this.forceContextRestore = function() {
      const E = kt.get("WEBGL_lose_context");
      E && E.restoreContext();
    }, this.getPixelRatio = function() {
      return nt;
    }, this.setPixelRatio = function(E) {
      E !== void 0 && (nt = E, this.setSize(K, k, !1));
    }, this.getSize = function(E) {
      return E.set(K, k);
    }, this.setSize = function(E, D, O = !0) {
      if (V.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      K = E, k = D, e.width = Math.floor(E * nt), e.height = Math.floor(D * nt), O === !0 && (e.style.width = E + "px", e.style.height = D + "px"), this.setViewport(0, 0, E, D);
    }, this.getDrawingBufferSize = function(E) {
      return E.set(K * nt, k * nt).floor();
    }, this.setDrawingBufferSize = function(E, D, O) {
      K = E, k = D, nt = O, e.width = Math.floor(E * O), e.height = Math.floor(D * O), this.setViewport(0, 0, E, D);
    }, this.getCurrentViewport = function(E) {
      return E.copy(v);
    }, this.getViewport = function(E) {
      return E.copy(dt);
    }, this.setViewport = function(E, D, O, F) {
      E.isVector4 ? dt.set(E.x, E.y, E.z, E.w) : dt.set(E, D, O, F), Ct.viewport(v.copy(dt).multiplyScalar(nt).round());
    }, this.getScissor = function(E) {
      return E.copy(Mt);
    }, this.setScissor = function(E, D, O, F) {
      E.isVector4 ? Mt.set(E.x, E.y, E.z, E.w) : Mt.set(E, D, O, F), Ct.scissor(b.copy(Mt).multiplyScalar(nt).round());
    }, this.getScissorTest = function() {
      return Yt;
    }, this.setScissorTest = function(E) {
      Ct.setScissorTest(Yt = E);
    }, this.setOpaqueSort = function(E) {
      W = E;
    }, this.setTransparentSort = function(E) {
      ut = E;
    }, this.getClearColor = function(E) {
      return E.copy(Pt.getClearColor());
    }, this.setClearColor = function() {
      Pt.setClearColor.apply(Pt, arguments);
    }, this.getClearAlpha = function() {
      return Pt.getClearAlpha();
    }, this.setClearAlpha = function() {
      Pt.setClearAlpha.apply(Pt, arguments);
    }, this.clear = function(E = !0, D = !0, O = !0) {
      let F = 0;
      if (E) {
        let N = !1;
        if (A !== null) {
          const it = A.texture.format;
          N = it === xc || it === vc || it === _c;
        }
        if (N) {
          const it = A.texture.type, at = it === Bn || it === gi || it === Gs || it === ns || it === pc || it === mc, vt = Pt.getClearColor(), yt = Pt.getClearAlpha(), At = vt.r, Rt = vt.g, Et = vt.b;
          at ? (f[0] = At, f[1] = Rt, f[2] = Et, f[3] = yt, C.clearBufferuiv(C.COLOR, 0, f)) : (g[0] = At, g[1] = Rt, g[2] = Et, g[3] = yt, C.clearBufferiv(C.COLOR, 0, g));
        } else
          F |= C.COLOR_BUFFER_BIT;
      }
      D && (F |= C.DEPTH_BUFFER_BIT, C.clearDepth(this.capabilities.reverseDepthBuffer ? 0 : 1)), O && (F |= C.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), C.clear(F);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      e.removeEventListener("webglcontextlost", Y, !1), e.removeEventListener("webglcontextrestored", ot, !1), e.removeEventListener("webglcontextcreationerror", lt, !1), pt.dispose(), jt.dispose(), It.dispose(), y.dispose(), U.dispose(), j.dispose(), ae.dispose(), I.dispose(), St.dispose(), V.dispose(), V.removeEventListener("sessionstart", Hc), V.removeEventListener("sessionend", Vc), ni.stop();
    };
    function Y(E) {
      E.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), M = !0;
    }
    function ot() {
      console.log("THREE.WebGLRenderer: Context Restored."), M = !1;
      const E = le.autoReset, D = mt.enabled, O = mt.autoUpdate, F = mt.needsUpdate, N = mt.type;
      ct(), le.autoReset = E, mt.enabled = D, mt.autoUpdate = O, mt.needsUpdate = F, mt.type = N;
    }
    function lt(E) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", E.statusMessage);
    }
    function Xt(E) {
      const D = E.target;
      D.removeEventListener("dispose", Xt), xe(D);
    }
    function xe(E) {
      Ge(E), It.remove(E);
    }
    function Ge(E) {
      const D = It.get(E).programs;
      D !== void 0 && (D.forEach(function(O) {
        St.releaseProgram(O);
      }), E.isShaderMaterial && St.releaseShaderCache(E));
    }
    this.renderBufferDirect = function(E, D, O, F, N, it) {
      D === null && (D = Gt);
      const at = N.isMesh && N.matrixWorld.determinant() < 0, vt = pd(E, D, O, F, N);
      Ct.setMaterial(F, at);
      let yt = O.index, At = 1;
      if (F.wireframe === !0) {
        if (yt = Z.getWireframeAttribute(O), yt === void 0) return;
        At = 2;
      }
      const Rt = O.drawRange, Et = O.attributes.position;
      let ne = Rt.start * At, he = (Rt.start + Rt.count) * At;
      it !== null && (ne = Math.max(ne, it.start * At), he = Math.min(he, (it.start + it.count) * At)), yt !== null ? (ne = Math.max(ne, 0), he = Math.min(he, yt.count)) : Et != null && (ne = Math.max(ne, 0), he = Math.min(he, Et.count));
      const pe = he - ne;
      if (pe < 0 || pe === 1 / 0) return;
      ae.setup(N, F, vt, O, yt);
      let Ye, Jt = gt;
      if (yt !== null && (Ye = q.get(yt), Jt = Ht, Jt.setIndex(Ye)), N.isMesh)
        F.wireframe === !0 ? (Ct.setLineWidth(F.wireframeLinewidth * Wt()), Jt.setMode(C.LINES)) : Jt.setMode(C.TRIANGLES);
      else if (N.isLine) {
        let bt = F.linewidth;
        bt === void 0 && (bt = 1), Ct.setLineWidth(bt * Wt()), N.isLineSegments ? Jt.setMode(C.LINES) : N.isLineLoop ? Jt.setMode(C.LINE_LOOP) : Jt.setMode(C.LINE_STRIP);
      } else N.isPoints ? Jt.setMode(C.POINTS) : N.isSprite && Jt.setMode(C.TRIANGLES);
      if (N.isBatchedMesh)
        if (N._multiDrawInstances !== null)
          Jt.renderMultiDrawInstances(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount, N._multiDrawInstances);
        else if (kt.get("WEBGL_multi_draw"))
          Jt.renderMultiDraw(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount);
        else {
          const bt = N._multiDrawStarts, Le = N._multiDrawCounts, Qt = N._multiDrawCount, an = yt ? q.get(yt).bytesPerElement : 1, yi = It.get(F).currentProgram.getUniforms();
          for (let Ke = 0; Ke < Qt; Ke++)
            yi.setValue(C, "_gl_DrawID", Ke), Jt.render(bt[Ke] / an, Le[Ke]);
        }
      else if (N.isInstancedMesh)
        Jt.renderInstances(ne, pe, N.count);
      else if (O.isInstancedBufferGeometry) {
        const bt = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, Le = Math.min(O.instanceCount, bt);
        Jt.renderInstances(ne, pe, Le);
      } else
        Jt.render(ne, pe);
    };
    function Kt(E, D, O) {
      E.transparent === !0 && E.side === fn && E.forceSinglePass === !1 ? (E.side = $e, E.needsUpdate = !0, sr(E, D, O), E.side = Fn, E.needsUpdate = !0, sr(E, D, O), E.side = fn) : sr(E, D, O);
    }
    this.compile = function(E, D, O = null) {
      O === null && (O = E), p = jt.get(O), p.init(D), S.push(p), O.traverseVisible(function(N) {
        N.isLight && N.layers.test(D.layers) && (p.pushLight(N), N.castShadow && p.pushShadow(N));
      }), E !== O && E.traverseVisible(function(N) {
        N.isLight && N.layers.test(D.layers) && (p.pushLight(N), N.castShadow && p.pushShadow(N));
      }), p.setupLights();
      const F = /* @__PURE__ */ new Set();
      return E.traverse(function(N) {
        if (!(N.isMesh || N.isPoints || N.isLine || N.isSprite))
          return;
        const it = N.material;
        if (it)
          if (Array.isArray(it))
            for (let at = 0; at < it.length; at++) {
              const vt = it[at];
              Kt(vt, O, N), F.add(vt);
            }
          else
            Kt(it, O, N), F.add(it);
      }), S.pop(), p = null, F;
    }, this.compileAsync = function(E, D, O = null) {
      const F = this.compile(E, D, O);
      return new Promise((N) => {
        function it() {
          if (F.forEach(function(at) {
            It.get(at).currentProgram.isReady() && F.delete(at);
          }), F.size === 0) {
            N(E);
            return;
          }
          setTimeout(it, 10);
        }
        kt.get("KHR_parallel_shader_compile") !== null ? it() : setTimeout(it, 10);
      });
    };
    let We = null;
    function Tn(E) {
      We && We(E);
    }
    function Hc() {
      ni.stop();
    }
    function Vc() {
      ni.start();
    }
    const ni = new Iu();
    ni.setAnimationLoop(Tn), typeof self < "u" && ni.setContext(self), this.setAnimationLoop = function(E) {
      We = E, V.setAnimationLoop(E), E === null ? ni.stop() : ni.start();
    }, V.addEventListener("sessionstart", Hc), V.addEventListener("sessionend", Vc), this.render = function(E, D) {
      if (D !== void 0 && D.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (M === !0) return;
      if (E.matrixWorldAutoUpdate === !0 && E.updateMatrixWorld(), D.parent === null && D.matrixWorldAutoUpdate === !0 && D.updateMatrixWorld(), V.enabled === !0 && V.isPresenting === !0 && (V.cameraAutoUpdate === !0 && V.updateCamera(D), D = V.getCamera()), E.isScene === !0 && E.onBeforeRender(x, E, D, A), p = jt.get(E, S.length), p.init(D), S.push(p), ft.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), ee.setFromProjectionMatrix(ft), Q = this.localClippingEnabled, $ = et.init(this.clippingPlanes, Q), _ = pt.get(E, m.length), _.init(), m.push(_), V.enabled === !0 && V.isPresenting === !0) {
        const it = x.xr.getDepthSensingMesh();
        it !== null && go(it, D, -1 / 0, x.sortObjects);
      }
      go(E, D, 0, x.sortObjects), _.finish(), x.sortObjects === !0 && _.sort(W, ut), re = V.enabled === !1 || V.isPresenting === !1 || V.hasDepthSensing() === !1, re && Pt.addToRenderList(_, E), this.info.render.frame++, $ === !0 && et.beginShadows();
      const O = p.state.shadowsArray;
      mt.render(O, E, D), $ === !0 && et.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const F = _.opaque, N = _.transmissive;
      if (p.setupLights(), D.isArrayCamera) {
        const it = D.cameras;
        if (N.length > 0)
          for (let at = 0, vt = it.length; at < vt; at++) {
            const yt = it[at];
            Wc(F, N, E, yt);
          }
        re && Pt.render(E);
        for (let at = 0, vt = it.length; at < vt; at++) {
          const yt = it[at];
          Gc(_, E, yt, yt.viewport);
        }
      } else
        N.length > 0 && Wc(F, N, E, D), re && Pt.render(E), Gc(_, E, D);
      A !== null && (T.updateMultisampleRenderTarget(A), T.updateRenderTargetMipmap(A)), E.isScene === !0 && E.onAfterRender(x, E, D), ae.resetDefaultState(), L = -1, G = null, S.pop(), S.length > 0 ? (p = S[S.length - 1], $ === !0 && et.setGlobalState(x.clippingPlanes, p.state.camera)) : p = null, m.pop(), m.length > 0 ? _ = m[m.length - 1] : _ = null;
    };
    function go(E, D, O, F) {
      if (E.visible === !1) return;
      if (E.layers.test(D.layers)) {
        if (E.isGroup)
          O = E.renderOrder;
        else if (E.isLOD)
          E.autoUpdate === !0 && E.update(D);
        else if (E.isLight)
          p.pushLight(E), E.castShadow && p.pushShadow(E);
        else if (E.isSprite) {
          if (!E.frustumCulled || ee.intersectsSprite(E)) {
            F && wt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ft);
            const at = j.update(E), vt = E.material;
            vt.visible && _.push(E, at, vt, O, wt.z, null);
          }
        } else if ((E.isMesh || E.isLine || E.isPoints) && (!E.frustumCulled || ee.intersectsObject(E))) {
          const at = j.update(E), vt = E.material;
          if (F && (E.boundingSphere !== void 0 ? (E.boundingSphere === null && E.computeBoundingSphere(), wt.copy(E.boundingSphere.center)) : (at.boundingSphere === null && at.computeBoundingSphere(), wt.copy(at.boundingSphere.center)), wt.applyMatrix4(E.matrixWorld).applyMatrix4(ft)), Array.isArray(vt)) {
            const yt = at.groups;
            for (let At = 0, Rt = yt.length; At < Rt; At++) {
              const Et = yt[At], ne = vt[Et.materialIndex];
              ne && ne.visible && _.push(E, at, ne, O, wt.z, Et);
            }
          } else vt.visible && _.push(E, at, vt, O, wt.z, null);
        }
      }
      const it = E.children;
      for (let at = 0, vt = it.length; at < vt; at++)
        go(it[at], D, O, F);
    }
    function Gc(E, D, O, F) {
      const N = E.opaque, it = E.transmissive, at = E.transparent;
      p.setupLightsView(O), $ === !0 && et.setGlobalState(x.clippingPlanes, O), F && Ct.viewport(v.copy(F)), N.length > 0 && ir(N, D, O), it.length > 0 && ir(it, D, O), at.length > 0 && ir(at, D, O), Ct.buffers.depth.setTest(!0), Ct.buffers.depth.setMask(!0), Ct.buffers.color.setMask(!0), Ct.setPolygonOffset(!1);
    }
    function Wc(E, D, O, F) {
      if ((O.isScene === !0 ? O.overrideMaterial : null) !== null)
        return;
      p.state.transmissionRenderTarget[F.id] === void 0 && (p.state.transmissionRenderTarget[F.id] = new _i(1, 1, {
        generateMipmaps: !0,
        type: kt.has("EXT_color_buffer_half_float") || kt.has("EXT_color_buffer_float") ? Qs : Bn,
        minFilter: Un,
        samples: 4,
        stencilBuffer: r,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: qt.workingColorSpace
      }));
      const it = p.state.transmissionRenderTarget[F.id], at = F.viewport || v;
      it.setSize(at.z, at.w);
      const vt = x.getRenderTarget();
      x.setRenderTarget(it), x.getClearColor(z), H = x.getClearAlpha(), H < 1 && x.setClearColor(16777215, 0.5), x.clear(), re && Pt.render(O);
      const yt = x.toneMapping;
      x.toneMapping = Jn;
      const At = F.viewport;
      if (F.viewport !== void 0 && (F.viewport = void 0), p.setupLightsView(F), $ === !0 && et.setGlobalState(x.clippingPlanes, F), ir(E, O, F), T.updateMultisampleRenderTarget(it), T.updateRenderTargetMipmap(it), kt.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Rt = !1;
        for (let Et = 0, ne = D.length; Et < ne; Et++) {
          const he = D[Et], pe = he.object, Ye = he.geometry, Jt = he.material, bt = he.group;
          if (Jt.side === fn && pe.layers.test(F.layers)) {
            const Le = Jt.side;
            Jt.side = $e, Jt.needsUpdate = !0, Xc(pe, O, F, Ye, Jt, bt), Jt.side = Le, Jt.needsUpdate = !0, Rt = !0;
          }
        }
        Rt === !0 && (T.updateMultisampleRenderTarget(it), T.updateRenderTargetMipmap(it));
      }
      x.setRenderTarget(vt), x.setClearColor(z, H), At !== void 0 && (F.viewport = At), x.toneMapping = yt;
    }
    function ir(E, D, O) {
      const F = D.isScene === !0 ? D.overrideMaterial : null;
      for (let N = 0, it = E.length; N < it; N++) {
        const at = E[N], vt = at.object, yt = at.geometry, At = F === null ? at.material : F, Rt = at.group;
        vt.layers.test(O.layers) && Xc(vt, D, O, yt, At, Rt);
      }
    }
    function Xc(E, D, O, F, N, it) {
      E.onBeforeRender(x, D, O, F, N, it), E.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, E.matrixWorld), E.normalMatrix.getNormalMatrix(E.modelViewMatrix), N.onBeforeRender(x, D, O, F, E, it), N.transparent === !0 && N.side === fn && N.forceSinglePass === !1 ? (N.side = $e, N.needsUpdate = !0, x.renderBufferDirect(O, D, F, N, E, it), N.side = Fn, N.needsUpdate = !0, x.renderBufferDirect(O, D, F, N, E, it), N.side = fn) : x.renderBufferDirect(O, D, F, N, E, it), E.onAfterRender(x, D, O, F, N, it);
    }
    function sr(E, D, O) {
      D.isScene !== !0 && (D = Gt);
      const F = It.get(E), N = p.state.lights, it = p.state.shadowsArray, at = N.state.version, vt = St.getParameters(E, N.state, it, D, O), yt = St.getProgramCacheKey(vt);
      let At = F.programs;
      F.environment = E.isMeshStandardMaterial ? D.environment : null, F.fog = D.fog, F.envMap = (E.isMeshStandardMaterial ? U : y).get(E.envMap || F.environment), F.envMapRotation = F.environment !== null && E.envMap === null ? D.environmentRotation : E.envMapRotation, At === void 0 && (E.addEventListener("dispose", Xt), At = /* @__PURE__ */ new Map(), F.programs = At);
      let Rt = At.get(yt);
      if (Rt !== void 0) {
        if (F.currentProgram === Rt && F.lightsStateVersion === at)
          return jc(E, vt), Rt;
      } else
        vt.uniforms = St.getUniforms(E), E.onBeforeCompile(vt, x), Rt = St.acquireProgram(vt, yt), At.set(yt, Rt), F.uniforms = vt.uniforms;
      const Et = F.uniforms;
      return (!E.isShaderMaterial && !E.isRawShaderMaterial || E.clipping === !0) && (Et.clippingPlanes = et.uniform), jc(E, vt), F.needsLights = gd(E), F.lightsStateVersion = at, F.needsLights && (Et.ambientLightColor.value = N.state.ambient, Et.lightProbe.value = N.state.probe, Et.directionalLights.value = N.state.directional, Et.directionalLightShadows.value = N.state.directionalShadow, Et.spotLights.value = N.state.spot, Et.spotLightShadows.value = N.state.spotShadow, Et.rectAreaLights.value = N.state.rectArea, Et.ltc_1.value = N.state.rectAreaLTC1, Et.ltc_2.value = N.state.rectAreaLTC2, Et.pointLights.value = N.state.point, Et.pointLightShadows.value = N.state.pointShadow, Et.hemisphereLights.value = N.state.hemi, Et.directionalShadowMap.value = N.state.directionalShadowMap, Et.directionalShadowMatrix.value = N.state.directionalShadowMatrix, Et.spotShadowMap.value = N.state.spotShadowMap, Et.spotLightMatrix.value = N.state.spotLightMatrix, Et.spotLightMap.value = N.state.spotLightMap, Et.pointShadowMap.value = N.state.pointShadowMap, Et.pointShadowMatrix.value = N.state.pointShadowMatrix), F.currentProgram = Rt, F.uniformsList = null, Rt;
    }
    function $c(E) {
      if (E.uniformsList === null) {
        const D = E.currentProgram.getUniforms();
        E.uniformsList = Yr.seqWithValue(D.seq, E.uniforms);
      }
      return E.uniformsList;
    }
    function jc(E, D) {
      const O = It.get(E);
      O.outputColorSpace = D.outputColorSpace, O.batching = D.batching, O.batchingColor = D.batchingColor, O.instancing = D.instancing, O.instancingColor = D.instancingColor, O.instancingMorph = D.instancingMorph, O.skinning = D.skinning, O.morphTargets = D.morphTargets, O.morphNormals = D.morphNormals, O.morphColors = D.morphColors, O.morphTargetsCount = D.morphTargetsCount, O.numClippingPlanes = D.numClippingPlanes, O.numIntersection = D.numClipIntersection, O.vertexAlphas = D.vertexAlphas, O.vertexTangents = D.vertexTangents, O.toneMapping = D.toneMapping;
    }
    function pd(E, D, O, F, N) {
      D.isScene !== !0 && (D = Gt), T.resetTextureUnits();
      const it = D.fog, at = F.isMeshStandardMaterial ? D.environment : null, vt = A === null ? x.outputColorSpace : A.isXRRenderTarget === !0 ? A.texture.colorSpace : De, yt = (F.isMeshStandardMaterial ? U : y).get(F.envMap || at), At = F.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4, Rt = !!O.attributes.tangent && (!!F.normalMap || F.anisotropy > 0), Et = !!O.morphAttributes.position, ne = !!O.morphAttributes.normal, he = !!O.morphAttributes.color;
      let pe = Jn;
      F.toneMapped && (A === null || A.isXRRenderTarget === !0) && (pe = x.toneMapping);
      const Ye = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, Jt = Ye !== void 0 ? Ye.length : 0, bt = It.get(F), Le = p.state.lights;
      if ($ === !0 && (Q === !0 || E !== G)) {
        const tn = E === G && F.id === L;
        et.setState(F, E, tn);
      }
      let Qt = !1;
      F.version === bt.__version ? (bt.needsLights && bt.lightsStateVersion !== Le.state.version || bt.outputColorSpace !== vt || N.isBatchedMesh && bt.batching === !1 || !N.isBatchedMesh && bt.batching === !0 || N.isBatchedMesh && bt.batchingColor === !0 && N.colorTexture === null || N.isBatchedMesh && bt.batchingColor === !1 && N.colorTexture !== null || N.isInstancedMesh && bt.instancing === !1 || !N.isInstancedMesh && bt.instancing === !0 || N.isSkinnedMesh && bt.skinning === !1 || !N.isSkinnedMesh && bt.skinning === !0 || N.isInstancedMesh && bt.instancingColor === !0 && N.instanceColor === null || N.isInstancedMesh && bt.instancingColor === !1 && N.instanceColor !== null || N.isInstancedMesh && bt.instancingMorph === !0 && N.morphTexture === null || N.isInstancedMesh && bt.instancingMorph === !1 && N.morphTexture !== null || bt.envMap !== yt || F.fog === !0 && bt.fog !== it || bt.numClippingPlanes !== void 0 && (bt.numClippingPlanes !== et.numPlanes || bt.numIntersection !== et.numIntersection) || bt.vertexAlphas !== At || bt.vertexTangents !== Rt || bt.morphTargets !== Et || bt.morphNormals !== ne || bt.morphColors !== he || bt.toneMapping !== pe || bt.morphTargetsCount !== Jt) && (Qt = !0) : (Qt = !0, bt.__version = F.version);
      let an = bt.currentProgram;
      Qt === !0 && (an = sr(F, D, N));
      let yi = !1, Ke = !1, _o = !1;
      const _e = an.getUniforms(), zn = bt.uniforms;
      if (Ct.useProgram(an.program) && (yi = !0, Ke = !0, _o = !0), F.id !== L && (L = F.id, Ke = !0), yi || G !== E) {
        $t.reverseDepthBuffer ? (xt.copy(E.projectionMatrix), Zf(xt), Jf(xt), _e.setValue(C, "projectionMatrix", xt)) : _e.setValue(C, "projectionMatrix", E.projectionMatrix), _e.setValue(C, "viewMatrix", E.matrixWorldInverse);
        const tn = _e.map.cameraPosition;
        tn !== void 0 && tn.setValue(C, Nt.setFromMatrixPosition(E.matrixWorld)), $t.logarithmicDepthBuffer && _e.setValue(
          C,
          "logDepthBufFC",
          2 / (Math.log(E.far + 1) / Math.LN2)
        ), (F.isMeshPhongMaterial || F.isMeshToonMaterial || F.isMeshLambertMaterial || F.isMeshBasicMaterial || F.isMeshStandardMaterial || F.isShaderMaterial) && _e.setValue(C, "isOrthographic", E.isOrthographicCamera === !0), G !== E && (G = E, Ke = !0, _o = !0);
      }
      if (N.isSkinnedMesh) {
        _e.setOptional(C, N, "bindMatrix"), _e.setOptional(C, N, "bindMatrixInverse");
        const tn = N.skeleton;
        tn && (tn.boneTexture === null && tn.computeBoneTexture(), _e.setValue(C, "boneTexture", tn.boneTexture, T));
      }
      N.isBatchedMesh && (_e.setOptional(C, N, "batchingTexture"), _e.setValue(C, "batchingTexture", N._matricesTexture, T), _e.setOptional(C, N, "batchingIdTexture"), _e.setValue(C, "batchingIdTexture", N._indirectTexture, T), _e.setOptional(C, N, "batchingColorTexture"), N._colorsTexture !== null && _e.setValue(C, "batchingColorTexture", N._colorsTexture, T));
      const vo = O.morphAttributes;
      if ((vo.position !== void 0 || vo.normal !== void 0 || vo.color !== void 0) && Lt.update(N, O, an), (Ke || bt.receiveShadow !== N.receiveShadow) && (bt.receiveShadow = N.receiveShadow, _e.setValue(C, "receiveShadow", N.receiveShadow)), F.isMeshGouraudMaterial && F.envMap !== null && (zn.envMap.value = yt, zn.flipEnvMap.value = yt.isCubeTexture && yt.isRenderTargetTexture === !1 ? -1 : 1), F.isMeshStandardMaterial && F.envMap === null && D.environment !== null && (zn.envMapIntensity.value = D.environmentIntensity), Ke && (_e.setValue(C, "toneMappingExposure", x.toneMappingExposure), bt.needsLights && md(zn, _o), it && F.fog === !0 && rt.refreshFogUniforms(zn, it), rt.refreshMaterialUniforms(zn, F, nt, k, p.state.transmissionRenderTarget[E.id]), Yr.upload(C, $c(bt), zn, T)), F.isShaderMaterial && F.uniformsNeedUpdate === !0 && (Yr.upload(C, $c(bt), zn, T), F.uniformsNeedUpdate = !1), F.isSpriteMaterial && _e.setValue(C, "center", N.center), _e.setValue(C, "modelViewMatrix", N.modelViewMatrix), _e.setValue(C, "normalMatrix", N.normalMatrix), _e.setValue(C, "modelMatrix", N.matrixWorld), F.isShaderMaterial || F.isRawShaderMaterial) {
        const tn = F.uniformsGroups;
        for (let xo = 0, _d = tn.length; xo < _d; xo++) {
          const qc = tn[xo];
          I.update(qc, an), I.bind(qc, an);
        }
      }
      return an;
    }
    function md(E, D) {
      E.ambientLightColor.needsUpdate = D, E.lightProbe.needsUpdate = D, E.directionalLights.needsUpdate = D, E.directionalLightShadows.needsUpdate = D, E.pointLights.needsUpdate = D, E.pointLightShadows.needsUpdate = D, E.spotLights.needsUpdate = D, E.spotLightShadows.needsUpdate = D, E.rectAreaLights.needsUpdate = D, E.hemisphereLights.needsUpdate = D;
    }
    function gd(E) {
      return E.isMeshLambertMaterial || E.isMeshToonMaterial || E.isMeshPhongMaterial || E.isMeshStandardMaterial || E.isShadowMaterial || E.isShaderMaterial && E.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return P;
    }, this.getActiveMipmapLevel = function() {
      return R;
    }, this.getRenderTarget = function() {
      return A;
    }, this.setRenderTargetTextures = function(E, D, O) {
      It.get(E.texture).__webglTexture = D, It.get(E.depthTexture).__webglTexture = O;
      const F = It.get(E);
      F.__hasExternalTextures = !0, F.__autoAllocateDepthBuffer = O === void 0, F.__autoAllocateDepthBuffer || kt.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), F.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(E, D) {
      const O = It.get(E);
      O.__webglFramebuffer = D, O.__useDefaultFramebuffer = D === void 0;
    }, this.setRenderTarget = function(E, D = 0, O = 0) {
      A = E, P = D, R = O;
      let F = !0, N = null, it = !1, at = !1;
      if (E) {
        const yt = It.get(E);
        if (yt.__useDefaultFramebuffer !== void 0)
          Ct.bindFramebuffer(C.FRAMEBUFFER, null), F = !1;
        else if (yt.__webglFramebuffer === void 0)
          T.setupRenderTarget(E);
        else if (yt.__hasExternalTextures)
          T.rebindTextures(E, It.get(E.texture).__webglTexture, It.get(E.depthTexture).__webglTexture);
        else if (E.depthBuffer) {
          const Et = E.depthTexture;
          if (yt.__boundDepthTexture !== Et) {
            if (Et !== null && It.has(Et) && (E.width !== Et.image.width || E.height !== Et.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            T.setupDepthRenderbuffer(E);
          }
        }
        const At = E.texture;
        (At.isData3DTexture || At.isDataArrayTexture || At.isCompressedArrayTexture) && (at = !0);
        const Rt = It.get(E).__webglFramebuffer;
        E.isWebGLCubeRenderTarget ? (Array.isArray(Rt[D]) ? N = Rt[D][O] : N = Rt[D], it = !0) : E.samples > 0 && T.useMultisampledRTT(E) === !1 ? N = It.get(E).__webglMultisampledFramebuffer : Array.isArray(Rt) ? N = Rt[O] : N = Rt, v.copy(E.viewport), b.copy(E.scissor), B = E.scissorTest;
      } else
        v.copy(dt).multiplyScalar(nt).floor(), b.copy(Mt).multiplyScalar(nt).floor(), B = Yt;
      if (Ct.bindFramebuffer(C.FRAMEBUFFER, N) && F && Ct.drawBuffers(E, N), Ct.viewport(v), Ct.scissor(b), Ct.setScissorTest(B), it) {
        const yt = It.get(E.texture);
        C.framebufferTexture2D(C.FRAMEBUFFER, C.COLOR_ATTACHMENT0, C.TEXTURE_CUBE_MAP_POSITIVE_X + D, yt.__webglTexture, O);
      } else if (at) {
        const yt = It.get(E.texture), At = D || 0;
        C.framebufferTextureLayer(C.FRAMEBUFFER, C.COLOR_ATTACHMENT0, yt.__webglTexture, O || 0, At);
      }
      L = -1;
    }, this.readRenderTargetPixels = function(E, D, O, F, N, it, at) {
      if (!(E && E.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let vt = It.get(E).__webglFramebuffer;
      if (E.isWebGLCubeRenderTarget && at !== void 0 && (vt = vt[at]), vt) {
        Ct.bindFramebuffer(C.FRAMEBUFFER, vt);
        try {
          const yt = E.texture, At = yt.format, Rt = yt.type;
          if (!$t.textureFormatReadable(At)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!$t.textureTypeReadable(Rt)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          D >= 0 && D <= E.width - F && O >= 0 && O <= E.height - N && C.readPixels(D, O, F, N, Ut.convert(At), Ut.convert(Rt), it);
        } finally {
          const yt = A !== null ? It.get(A).__webglFramebuffer : null;
          Ct.bindFramebuffer(C.FRAMEBUFFER, yt);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(E, D, O, F, N, it, at) {
      if (!(E && E.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let vt = It.get(E).__webglFramebuffer;
      if (E.isWebGLCubeRenderTarget && at !== void 0 && (vt = vt[at]), vt) {
        const yt = E.texture, At = yt.format, Rt = yt.type;
        if (!$t.textureFormatReadable(At))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!$t.textureTypeReadable(Rt))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (D >= 0 && D <= E.width - F && O >= 0 && O <= E.height - N) {
          Ct.bindFramebuffer(C.FRAMEBUFFER, vt);
          const Et = C.createBuffer();
          C.bindBuffer(C.PIXEL_PACK_BUFFER, Et), C.bufferData(C.PIXEL_PACK_BUFFER, it.byteLength, C.STREAM_READ), C.readPixels(D, O, F, N, Ut.convert(At), Ut.convert(Rt), 0);
          const ne = A !== null ? It.get(A).__webglFramebuffer : null;
          Ct.bindFramebuffer(C.FRAMEBUFFER, ne);
          const he = C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return C.flush(), await Kf(C, he, 4), C.bindBuffer(C.PIXEL_PACK_BUFFER, Et), C.getBufferSubData(C.PIXEL_PACK_BUFFER, 0, it), C.deleteBuffer(Et), C.deleteSync(he), it;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(E, D = null, O = 0) {
      E.isTexture !== !0 && (qr("WebGLRenderer: copyFramebufferToTexture function signature has changed."), D = arguments[0] || null, E = arguments[1]);
      const F = Math.pow(2, -O), N = Math.floor(E.image.width * F), it = Math.floor(E.image.height * F), at = D !== null ? D.x : 0, vt = D !== null ? D.y : 0;
      T.setTexture2D(E, 0), C.copyTexSubImage2D(C.TEXTURE_2D, O, 0, 0, at, vt, N, it), Ct.unbindTexture();
    }, this.copyTextureToTexture = function(E, D, O = null, F = null, N = 0) {
      E.isTexture !== !0 && (qr("WebGLRenderer: copyTextureToTexture function signature has changed."), F = arguments[0] || null, E = arguments[1], D = arguments[2], N = arguments[3] || 0, O = null);
      let it, at, vt, yt, At, Rt;
      O !== null ? (it = O.max.x - O.min.x, at = O.max.y - O.min.y, vt = O.min.x, yt = O.min.y) : (it = E.image.width, at = E.image.height, vt = 0, yt = 0), F !== null ? (At = F.x, Rt = F.y) : (At = 0, Rt = 0);
      const Et = Ut.convert(D.format), ne = Ut.convert(D.type);
      T.setTexture2D(D, 0), C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, D.flipY), C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha), C.pixelStorei(C.UNPACK_ALIGNMENT, D.unpackAlignment);
      const he = C.getParameter(C.UNPACK_ROW_LENGTH), pe = C.getParameter(C.UNPACK_IMAGE_HEIGHT), Ye = C.getParameter(C.UNPACK_SKIP_PIXELS), Jt = C.getParameter(C.UNPACK_SKIP_ROWS), bt = C.getParameter(C.UNPACK_SKIP_IMAGES), Le = E.isCompressedTexture ? E.mipmaps[N] : E.image;
      C.pixelStorei(C.UNPACK_ROW_LENGTH, Le.width), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, Le.height), C.pixelStorei(C.UNPACK_SKIP_PIXELS, vt), C.pixelStorei(C.UNPACK_SKIP_ROWS, yt), E.isDataTexture ? C.texSubImage2D(C.TEXTURE_2D, N, At, Rt, it, at, Et, ne, Le.data) : E.isCompressedTexture ? C.compressedTexSubImage2D(C.TEXTURE_2D, N, At, Rt, Le.width, Le.height, Et, Le.data) : C.texSubImage2D(C.TEXTURE_2D, N, At, Rt, it, at, Et, ne, Le), C.pixelStorei(C.UNPACK_ROW_LENGTH, he), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, pe), C.pixelStorei(C.UNPACK_SKIP_PIXELS, Ye), C.pixelStorei(C.UNPACK_SKIP_ROWS, Jt), C.pixelStorei(C.UNPACK_SKIP_IMAGES, bt), N === 0 && D.generateMipmaps && C.generateMipmap(C.TEXTURE_2D), Ct.unbindTexture();
    }, this.copyTextureToTexture3D = function(E, D, O = null, F = null, N = 0) {
      E.isTexture !== !0 && (qr("WebGLRenderer: copyTextureToTexture3D function signature has changed."), O = arguments[0] || null, F = arguments[1] || null, E = arguments[2], D = arguments[3], N = arguments[4] || 0);
      let it, at, vt, yt, At, Rt, Et, ne, he;
      const pe = E.isCompressedTexture ? E.mipmaps[N] : E.image;
      O !== null ? (it = O.max.x - O.min.x, at = O.max.y - O.min.y, vt = O.max.z - O.min.z, yt = O.min.x, At = O.min.y, Rt = O.min.z) : (it = pe.width, at = pe.height, vt = pe.depth, yt = 0, At = 0, Rt = 0), F !== null ? (Et = F.x, ne = F.y, he = F.z) : (Et = 0, ne = 0, he = 0);
      const Ye = Ut.convert(D.format), Jt = Ut.convert(D.type);
      let bt;
      if (D.isData3DTexture)
        T.setTexture3D(D, 0), bt = C.TEXTURE_3D;
      else if (D.isDataArrayTexture || D.isCompressedArrayTexture)
        T.setTexture2DArray(D, 0), bt = C.TEXTURE_2D_ARRAY;
      else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, D.flipY), C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL, D.premultiplyAlpha), C.pixelStorei(C.UNPACK_ALIGNMENT, D.unpackAlignment);
      const Le = C.getParameter(C.UNPACK_ROW_LENGTH), Qt = C.getParameter(C.UNPACK_IMAGE_HEIGHT), an = C.getParameter(C.UNPACK_SKIP_PIXELS), yi = C.getParameter(C.UNPACK_SKIP_ROWS), Ke = C.getParameter(C.UNPACK_SKIP_IMAGES);
      C.pixelStorei(C.UNPACK_ROW_LENGTH, pe.width), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, pe.height), C.pixelStorei(C.UNPACK_SKIP_PIXELS, yt), C.pixelStorei(C.UNPACK_SKIP_ROWS, At), C.pixelStorei(C.UNPACK_SKIP_IMAGES, Rt), E.isDataTexture || E.isData3DTexture ? C.texSubImage3D(bt, N, Et, ne, he, it, at, vt, Ye, Jt, pe.data) : D.isCompressedArrayTexture ? C.compressedTexSubImage3D(bt, N, Et, ne, he, it, at, vt, Ye, pe.data) : C.texSubImage3D(bt, N, Et, ne, he, it, at, vt, Ye, Jt, pe), C.pixelStorei(C.UNPACK_ROW_LENGTH, Le), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, Qt), C.pixelStorei(C.UNPACK_SKIP_PIXELS, an), C.pixelStorei(C.UNPACK_SKIP_ROWS, yi), C.pixelStorei(C.UNPACK_SKIP_IMAGES, Ke), N === 0 && D.generateMipmaps && C.generateMipmap(bt), Ct.unbindTexture();
    }, this.initRenderTarget = function(E) {
      It.get(E).__webglFramebuffer === void 0 && T.setupRenderTarget(E);
    }, this.initTexture = function(E) {
      E.isCubeTexture ? T.setTextureCube(E, 0) : E.isData3DTexture ? T.setTexture3D(E, 0) : E.isDataArrayTexture || E.isCompressedArrayTexture ? T.setTexture2DArray(E, 0) : T.setTexture2D(E, 0), Ct.unbindTexture();
    }, this.resetState = function() {
      P = 0, R = 0, A = null, Ct.reset(), ae.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return On;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const e = this.getContext();
    e.drawingBufferColorSpace = t === yc ? "display-p3" : "srgb", e.unpackColorSpace = qt.workingColorSpace === lo ? "display-p3" : "srgb";
  }
}
class zu extends de {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new yn(), this.environmentIntensity = 1, this.environmentRotation = new yn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(t, e) {
    return super.copy(t, e), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e;
  }
}
class ku {
  constructor(t, e) {
    this.isInterleavedBuffer = !0, this.array = t, this.stride = e, this.count = t !== void 0 ? t.length / e : 0, this.usage = qa, this.updateRanges = [], this.version = 0, this.uuid = on();
  }
  onUploadCallback() {
  }
  set needsUpdate(t) {
    t === !0 && this.version++;
  }
  setUsage(t) {
    return this.usage = t, this;
  }
  addUpdateRange(t, e) {
    this.updateRanges.push({ start: t, count: e });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(t) {
    return this.array = new t.array.constructor(t.array), this.count = t.count, this.stride = t.stride, this.usage = t.usage, this;
  }
  copyAt(t, e, n) {
    t *= this.stride, n *= e.stride;
    for (let s = 0, r = this.stride; s < r; s++)
      this.array[t + s] = e.array[n + s];
    return this;
  }
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  clone(t) {
    t.arrayBuffers === void 0 && (t.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = on()), t.arrayBuffers[this.array.buffer._uuid] === void 0 && (t.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const e = new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(e, this.stride);
    return n.setUsage(this.usage), n;
  }
  onUpload(t) {
    return this.onUploadCallback = t, this;
  }
  toJSON(t) {
    return t.arrayBuffers === void 0 && (t.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = on()), t.arrayBuffers[this.array.buffer._uuid] === void 0 && (t.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
const ze = /* @__PURE__ */ new w();
class js {
  constructor(t, e, n, s = !1) {
    this.isInterleavedBufferAttribute = !0, this.name = "", this.data = t, this.itemSize = e, this.offset = n, this.normalized = s;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(t) {
    this.data.needsUpdate = t;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.data.count; e < n; e++)
      ze.fromBufferAttribute(this, e), ze.applyMatrix4(t), this.setXYZ(e, ze.x, ze.y, ze.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ze.fromBufferAttribute(this, e), ze.applyNormalMatrix(t), this.setXYZ(e, ze.x, ze.y, ze.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ze.fromBufferAttribute(this, e), ze.transformDirection(t), this.setXYZ(e, ze.x, ze.y, ze.z);
    return this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.data.stride + this.offset + e];
    return this.normalized && (n = pn(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = ie(n, this.array)), this.data.array[t * this.data.stride + this.offset + e] = n, this;
  }
  setX(t, e) {
    return this.normalized && (e = ie(e, this.array)), this.data.array[t * this.data.stride + this.offset] = e, this;
  }
  setY(t, e) {
    return this.normalized && (e = ie(e, this.array)), this.data.array[t * this.data.stride + this.offset + 1] = e, this;
  }
  setZ(t, e) {
    return this.normalized && (e = ie(e, this.array)), this.data.array[t * this.data.stride + this.offset + 2] = e, this;
  }
  setW(t, e) {
    return this.normalized && (e = ie(e, this.array)), this.data.array[t * this.data.stride + this.offset + 3] = e, this;
  }
  getX(t) {
    let e = this.data.array[t * this.data.stride + this.offset];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  getY(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 1];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  getZ(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 2];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  getW(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 3];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  setXY(t, e, n) {
    return t = t * this.data.stride + this.offset, this.normalized && (e = ie(e, this.array), n = ie(n, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, s) {
    return t = t * this.data.stride + this.offset, this.normalized && (e = ie(e, this.array), n = ie(n, this.array), s = ie(s, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = s, this;
  }
  setXYZW(t, e, n, s, r) {
    return t = t * this.data.stride + this.offset, this.normalized && (e = ie(e, this.array), n = ie(n, this.array), s = ie(s, this.array), r = ie(r, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = s, this.data.array[t + 3] = r, this;
  }
  clone(t) {
    if (t === void 0) {
      console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const e = [];
      for (let n = 0; n < this.count; n++) {
        const s = n * this.data.stride + this.offset;
        for (let r = 0; r < this.itemSize; r++)
          e.push(this.data.array[s + r]);
      }
      return new Ie(new this.array.constructor(e), this.itemSize, this.normalized);
    } else
      return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new js(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(t) {
    if (t === void 0) {
      console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const e = [];
      for (let n = 0; n < this.count; n++) {
        const s = n * this.data.stride + this.offset;
        for (let r = 0; r < this.itemSize; r++)
          e.push(this.data.array[s + r]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: e,
        normalized: this.normalized
      };
    } else
      return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.toJSON(t)), {
        isInterleavedBufferAttribute: !0,
        itemSize: this.itemSize,
        data: this.data.uuid,
        offset: this.offset,
        normalized: this.normalized
      };
  }
}
class Hu extends gn {
  constructor(t) {
    super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new Tt(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.rotation = t.rotation, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
  }
}
let Ui;
const Ms = /* @__PURE__ */ new w(), Oi = /* @__PURE__ */ new w(), Fi = /* @__PURE__ */ new w(), Bi = /* @__PURE__ */ new tt(), Ss = /* @__PURE__ */ new tt(), Vu = /* @__PURE__ */ new Dt(), Tr = /* @__PURE__ */ new w(), Es = /* @__PURE__ */ new w(), Ar = /* @__PURE__ */ new w(), sh = /* @__PURE__ */ new tt(), Ko = /* @__PURE__ */ new tt(), rh = /* @__PURE__ */ new tt();
class cv extends de {
  constructor(t = new Hu()) {
    if (super(), this.isSprite = !0, this.type = "Sprite", Ui === void 0) {
      Ui = new Pe();
      const e = new Float32Array([
        -0.5,
        -0.5,
        0,
        0,
        0,
        0.5,
        -0.5,
        0,
        1,
        0,
        0.5,
        0.5,
        0,
        1,
        1,
        -0.5,
        0.5,
        0,
        0,
        1
      ]), n = new ku(e, 5);
      Ui.setIndex([0, 1, 2, 0, 2, 3]), Ui.setAttribute("position", new js(n, 3, 0, !1)), Ui.setAttribute("uv", new js(n, 2, 3, !1));
    }
    this.geometry = Ui, this.material = t, this.center = new tt(0.5, 0.5);
  }
  raycast(t, e) {
    t.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), Oi.setFromMatrixScale(this.matrixWorld), Vu.copy(t.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse, this.matrixWorld), Fi.setFromMatrixPosition(this.modelViewMatrix), t.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && Oi.multiplyScalar(-Fi.z);
    const n = this.material.rotation;
    let s, r;
    n !== 0 && (r = Math.cos(n), s = Math.sin(n));
    const o = this.center;
    wr(Tr.set(-0.5, -0.5, 0), Fi, o, Oi, s, r), wr(Es.set(0.5, -0.5, 0), Fi, o, Oi, s, r), wr(Ar.set(0.5, 0.5, 0), Fi, o, Oi, s, r), sh.set(0, 0), Ko.set(1, 0), rh.set(1, 1);
    let a = t.ray.intersectTriangle(Tr, Es, Ar, !1, Ms);
    if (a === null && (wr(Es.set(-0.5, 0.5, 0), Fi, o, Oi, s, r), Ko.set(0, 1), a = t.ray.intersectTriangle(Tr, Ar, Es, !1, Ms), a === null))
      return;
    const c = t.ray.origin.distanceTo(Ms);
    c < t.near || c > t.far || e.push({
      distance: c,
      point: Ms.clone(),
      uv: sn.getInterpolation(Ms, Tr, Es, Ar, sh, Ko, rh, new tt()),
      face: null,
      object: this
    });
  }
  copy(t, e) {
    return super.copy(t, e), t.center !== void 0 && this.center.copy(t.center), this.material = t.material, this;
  }
}
function wr(i, t, e, n, s, r) {
  Bi.subVectors(i, e).addScalar(0.5).multiply(n), s !== void 0 ? (Ss.x = r * Bi.x - s * Bi.y, Ss.y = s * Bi.x + r * Bi.y) : Ss.copy(Bi), i.copy(t), i.x += Ss.x, i.y += Ss.y, i.applyMatrix4(Vu);
}
const oh = /* @__PURE__ */ new w(), ah = /* @__PURE__ */ new Zt(), ch = /* @__PURE__ */ new Zt(), lv = /* @__PURE__ */ new w(), lh = /* @__PURE__ */ new Dt(), Rr = /* @__PURE__ */ new w(), Zo = /* @__PURE__ */ new Mn(), hh = /* @__PURE__ */ new Dt(), Jo = /* @__PURE__ */ new ls();
class hv extends ge {
  constructor(t, e) {
    super(t, e), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = hl, this.bindMatrix = new Dt(), this.bindMatrixInverse = new Dt(), this.boundingBox = null, this.boundingSphere = null;
  }
  computeBoundingBox() {
    const t = this.geometry;
    this.boundingBox === null && (this.boundingBox = new je()), this.boundingBox.makeEmpty();
    const e = t.getAttribute("position");
    for (let n = 0; n < e.count; n++)
      this.getVertexPosition(n, Rr), this.boundingBox.expandByPoint(Rr);
  }
  computeBoundingSphere() {
    const t = this.geometry;
    this.boundingSphere === null && (this.boundingSphere = new Mn()), this.boundingSphere.makeEmpty();
    const e = t.getAttribute("position");
    for (let n = 0; n < e.count; n++)
      this.getVertexPosition(n, Rr), this.boundingSphere.expandByPoint(Rr);
  }
  copy(t, e) {
    return super.copy(t, e), this.bindMode = t.bindMode, this.bindMatrix.copy(t.bindMatrix), this.bindMatrixInverse.copy(t.bindMatrixInverse), this.skeleton = t.skeleton, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this;
  }
  raycast(t, e) {
    const n = this.material, s = this.matrixWorld;
    n !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Zo.copy(this.boundingSphere), Zo.applyMatrix4(s), t.ray.intersectsSphere(Zo) !== !1 && (hh.copy(s).invert(), Jo.copy(t.ray).applyMatrix4(hh), !(this.boundingBox !== null && Jo.intersectsBox(this.boundingBox) === !1) && this._computeIntersections(t, e, Jo)));
  }
  getVertexPosition(t, e) {
    return super.getVertexPosition(t, e), this.applyBoneTransform(t, e), e;
  }
  bind(t, e) {
    this.skeleton = t, e === void 0 && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), e = this.matrixWorld), this.bindMatrix.copy(e), this.bindMatrixInverse.copy(e).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const t = new Zt(), e = this.geometry.attributes.skinWeight;
    for (let n = 0, s = e.count; n < s; n++) {
      t.fromBufferAttribute(e, n);
      const r = 1 / t.manhattanLength();
      r !== 1 / 0 ? t.multiplyScalar(r) : t.set(1, 0, 0, 0), e.setXYZW(n, t.x, t.y, t.z, t.w);
    }
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.bindMode === hl ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === yf ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
  }
  applyBoneTransform(t, e) {
    const n = this.skeleton, s = this.geometry;
    ah.fromBufferAttribute(s.attributes.skinIndex, t), ch.fromBufferAttribute(s.attributes.skinWeight, t), oh.copy(e).applyMatrix4(this.bindMatrix), e.set(0, 0, 0);
    for (let r = 0; r < 4; r++) {
      const o = ch.getComponent(r);
      if (o !== 0) {
        const a = ah.getComponent(r);
        lh.multiplyMatrices(n.bones[a].matrixWorld, n.boneInverses[a]), e.addScaledVector(lv.copy(oh).applyMatrix4(lh), o);
      }
    }
    return e.applyMatrix4(this.bindMatrixInverse);
  }
}
class Gu extends de {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}
class Wu extends be {
  constructor(t = null, e = 1, n = 1, s, r, o, a, c, l = Ve, h = Ve, u, d) {
    super(null, o, a, c, l, h, s, r, u, d), this.isDataTexture = !0, this.image = { data: t, width: e, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const uh = /* @__PURE__ */ new Dt(), uv = /* @__PURE__ */ new Dt();
class Ac {
  constructor(t = [], e = []) {
    this.uuid = on(), this.bones = t.slice(0), this.boneInverses = e, this.boneMatrices = null, this.boneTexture = null, this.init();
  }
  init() {
    const t = this.bones, e = this.boneInverses;
    if (this.boneMatrices = new Float32Array(t.length * 16), e.length === 0)
      this.calculateInverses();
    else if (t.length !== e.length) {
      console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
      for (let n = 0, s = this.bones.length; n < s; n++)
        this.boneInverses.push(new Dt());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let t = 0, e = this.bones.length; t < e; t++) {
      const n = new Dt();
      this.bones[t] && n.copy(this.bones[t].matrixWorld).invert(), this.boneInverses.push(n);
    }
  }
  pose() {
    for (let t = 0, e = this.bones.length; t < e; t++) {
      const n = this.bones[t];
      n && n.matrixWorld.copy(this.boneInverses[t]).invert();
    }
    for (let t = 0, e = this.bones.length; t < e; t++) {
      const n = this.bones[t];
      n && (n.parent && n.parent.isBone ? (n.matrix.copy(n.parent.matrixWorld).invert(), n.matrix.multiply(n.matrixWorld)) : n.matrix.copy(n.matrixWorld), n.matrix.decompose(n.position, n.quaternion, n.scale));
    }
  }
  update() {
    const t = this.bones, e = this.boneInverses, n = this.boneMatrices, s = this.boneTexture;
    for (let r = 0, o = t.length; r < o; r++) {
      const a = t[r] ? t[r].matrixWorld : uv;
      uh.multiplyMatrices(a, e[r]), uh.toArray(n, r * 16);
    }
    s !== null && (s.needsUpdate = !0);
  }
  clone() {
    return new Ac(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let t = Math.sqrt(this.bones.length * 4);
    t = Math.ceil(t / 4) * 4, t = Math.max(t, 4);
    const e = new Float32Array(t * t * 4);
    e.set(this.boneMatrices);
    const n = new Wu(e, t, t, rn, mn);
    return n.needsUpdate = !0, this.boneMatrices = e, this.boneTexture = n, this;
  }
  getBoneByName(t) {
    for (let e = 0, n = this.bones.length; e < n; e++) {
      const s = this.bones[e];
      if (s.name === t)
        return s;
    }
  }
  dispose() {
    this.boneTexture !== null && (this.boneTexture.dispose(), this.boneTexture = null);
  }
  fromJSON(t, e) {
    this.uuid = t.uuid;
    for (let n = 0, s = t.bones.length; n < s; n++) {
      const r = t.bones[n];
      let o = e[r];
      o === void 0 && (console.warn("THREE.Skeleton: No bone found with UUID:", r), o = new Gu()), this.bones.push(o), this.boneInverses.push(new Dt().fromArray(t.boneInverses[n]));
    }
    return this.init(), this;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.6,
        type: "Skeleton",
        generator: "Skeleton.toJSON"
      },
      bones: [],
      boneInverses: []
    };
    t.uuid = this.uuid;
    const e = this.bones, n = this.boneInverses;
    for (let s = 0, r = e.length; s < r; s++) {
      const o = e[s];
      t.bones.push(o.uuid);
      const a = n[s];
      t.boneInverses.push(a.toArray());
    }
    return t;
  }
}
class Ka extends Ie {
  constructor(t, e, n, s = 1) {
    super(t, e, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = s;
  }
  copy(t) {
    return super.copy(t), this.meshPerAttribute = t.meshPerAttribute, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.meshPerAttribute = this.meshPerAttribute, t.isInstancedBufferAttribute = !0, t;
  }
}
const zi = /* @__PURE__ */ new Dt(), dh = /* @__PURE__ */ new Dt(), Cr = [], fh = /* @__PURE__ */ new je(), dv = /* @__PURE__ */ new Dt(), bs = /* @__PURE__ */ new ge(), Ts = /* @__PURE__ */ new Mn();
class fv extends ge {
  constructor(t, e, n) {
    super(t, e), this.isInstancedMesh = !0, this.instanceMatrix = new Ka(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
    for (let s = 0; s < n; s++)
      this.setMatrixAt(s, dv);
  }
  computeBoundingBox() {
    const t = this.geometry, e = this.count;
    this.boundingBox === null && (this.boundingBox = new je()), t.boundingBox === null && t.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < e; n++)
      this.getMatrixAt(n, zi), fh.copy(t.boundingBox).applyMatrix4(zi), this.boundingBox.union(fh);
  }
  computeBoundingSphere() {
    const t = this.geometry, e = this.count;
    this.boundingSphere === null && (this.boundingSphere = new Mn()), t.boundingSphere === null && t.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < e; n++)
      this.getMatrixAt(n, zi), Ts.copy(t.boundingSphere).applyMatrix4(zi), this.boundingSphere.union(Ts);
  }
  copy(t, e) {
    return super.copy(t, e), this.instanceMatrix.copy(t.instanceMatrix), t.morphTexture !== null && (this.morphTexture = t.morphTexture.clone()), t.instanceColor !== null && (this.instanceColor = t.instanceColor.clone()), this.count = t.count, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this;
  }
  getColorAt(t, e) {
    e.fromArray(this.instanceColor.array, t * 3);
  }
  getMatrixAt(t, e) {
    e.fromArray(this.instanceMatrix.array, t * 16);
  }
  getMorphAt(t, e) {
    const n = e.morphTargetInfluences, s = this.morphTexture.source.data.data, r = n.length + 1, o = t * r + 1;
    for (let a = 0; a < n.length; a++)
      n[a] = s[o + a];
  }
  raycast(t, e) {
    const n = this.matrixWorld, s = this.count;
    if (bs.geometry = this.geometry, bs.material = this.material, bs.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Ts.copy(this.boundingSphere), Ts.applyMatrix4(n), t.ray.intersectsSphere(Ts) !== !1))
      for (let r = 0; r < s; r++) {
        this.getMatrixAt(r, zi), dh.multiplyMatrices(n, zi), bs.matrixWorld = dh, bs.raycast(t, Cr);
        for (let o = 0, a = Cr.length; o < a; o++) {
          const c = Cr[o];
          c.instanceId = r, c.object = this, e.push(c);
        }
        Cr.length = 0;
      }
  }
  setColorAt(t, e) {
    this.instanceColor === null && (this.instanceColor = new Ka(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), e.toArray(this.instanceColor.array, t * 3);
  }
  setMatrixAt(t, e) {
    e.toArray(this.instanceMatrix.array, t * 16);
  }
  setMorphAt(t, e) {
    const n = e.morphTargetInfluences, s = n.length + 1;
    this.morphTexture === null && (this.morphTexture = new Wu(new Float32Array(s * this.count), s, this.count, gc, mn));
    const r = this.morphTexture.source.data.data;
    let o = 0;
    for (let l = 0; l < n.length; l++)
      o += n[l];
    const a = this.geometry.morphTargetsRelative ? 1 : 1 - o, c = s * t;
    r[c] = a, r.set(n, c + 1);
  }
  updateMorphTargets() {
  }
  dispose() {
    return this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null), this;
  }
}
class fo extends gn {
  constructor(t) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Tt(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this.fog = t.fog, this;
  }
}
const io = /* @__PURE__ */ new w(), so = /* @__PURE__ */ new w(), ph = /* @__PURE__ */ new Dt(), As = /* @__PURE__ */ new ls(), Pr = /* @__PURE__ */ new Mn(), Qo = /* @__PURE__ */ new w(), mh = /* @__PURE__ */ new w();
class wc extends de {
  constructor(t = new Pe(), e = new fo()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position, n = [0];
      for (let s = 1, r = e.count; s < r; s++)
        io.fromBufferAttribute(e, s - 1), so.fromBufferAttribute(e, s), n[s] = n[s - 1], n[s] += io.distanceTo(so);
      t.setAttribute("lineDistance", new ce(n, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.matrixWorld, r = t.params.Line.threshold, o = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Pr.copy(n.boundingSphere), Pr.applyMatrix4(s), Pr.radius += r, t.ray.intersectsSphere(Pr) === !1) return;
    ph.copy(s).invert(), As.copy(t.ray).applyMatrix4(ph);
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = a * a, l = this.isLineSegments ? 2 : 1, h = n.index, d = n.attributes.position;
    if (h !== null) {
      const f = Math.max(0, o.start), g = Math.min(h.count, o.start + o.count);
      for (let _ = f, p = g - 1; _ < p; _ += l) {
        const m = h.getX(_), S = h.getX(_ + 1), x = Lr(this, t, As, c, m, S);
        x && e.push(x);
      }
      if (this.isLineLoop) {
        const _ = h.getX(g - 1), p = h.getX(f), m = Lr(this, t, As, c, _, p);
        m && e.push(m);
      }
    } else {
      const f = Math.max(0, o.start), g = Math.min(d.count, o.start + o.count);
      for (let _ = f, p = g - 1; _ < p; _ += l) {
        const m = Lr(this, t, As, c, _, _ + 1);
        m && e.push(m);
      }
      if (this.isLineLoop) {
        const _ = Lr(this, t, As, c, g - 1, f);
        _ && e.push(_);
      }
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const s = e[n[0]];
      if (s !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, o = s.length; r < o; r++) {
          const a = s[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r;
        }
      }
    }
  }
}
function Lr(i, t, e, n, s, r) {
  const o = i.geometry.attributes.position;
  if (io.fromBufferAttribute(o, s), so.fromBufferAttribute(o, r), e.distanceSqToSegment(io, so, Qo, mh) > n) return;
  Qo.applyMatrix4(i.matrixWorld);
  const c = t.ray.origin.distanceTo(Qo);
  if (!(c < t.near || c > t.far))
    return {
      distance: c,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: mh.clone().applyMatrix4(i.matrixWorld),
      index: s,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i
    };
}
const gh = /* @__PURE__ */ new w(), _h = /* @__PURE__ */ new w();
class Rc extends wc {
  constructor(t, e) {
    super(t, e), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position, n = [];
      for (let s = 0, r = e.count; s < r; s += 2)
        gh.fromBufferAttribute(e, s), _h.fromBufferAttribute(e, s + 1), n[s] = s === 0 ? 0 : n[s - 1], n[s + 1] = n[s] + gh.distanceTo(_h);
      t.setAttribute("lineDistance", new ce(n, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class pv extends wc {
  constructor(t, e) {
    super(t, e), this.isLineLoop = !0, this.type = "LineLoop";
  }
}
class Xu extends gn {
  constructor(t) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Tt(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
  }
}
const vh = /* @__PURE__ */ new Dt(), Za = /* @__PURE__ */ new ls(), Ir = /* @__PURE__ */ new Mn(), Dr = /* @__PURE__ */ new w();
class mv extends de {
  constructor(t = new Pe(), e = new Xu()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.matrixWorld, r = t.params.Points.threshold, o = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Ir.copy(n.boundingSphere), Ir.applyMatrix4(s), Ir.radius += r, t.ray.intersectsSphere(Ir) === !1) return;
    vh.copy(s).invert(), Za.copy(t.ray).applyMatrix4(vh);
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = a * a, l = n.index, u = n.attributes.position;
    if (l !== null) {
      const d = Math.max(0, o.start), f = Math.min(l.count, o.start + o.count);
      for (let g = d, _ = f; g < _; g++) {
        const p = l.getX(g);
        Dr.fromBufferAttribute(u, p), xh(Dr, p, c, s, t, e, this);
      }
    } else {
      const d = Math.max(0, o.start), f = Math.min(u.count, o.start + o.count);
      for (let g = d, _ = f; g < _; g++)
        Dr.fromBufferAttribute(u, g), xh(Dr, g, c, s, t, e, this);
    }
  }
  updateMorphTargets() {
    const e = this.geometry.morphAttributes, n = Object.keys(e);
    if (n.length > 0) {
      const s = e[n[0]];
      if (s !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, o = s.length; r < o; r++) {
          const a = s[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r;
        }
      }
    }
  }
}
function xh(i, t, e, n, s, r, o) {
  const a = Za.distanceSqToPoint(i);
  if (a < e) {
    const c = new w();
    Za.closestPointToPoint(i, c), c.applyMatrix4(n);
    const l = s.ray.origin.distanceTo(c);
    if (l < s.near || l > s.far) return;
    r.push({
      distance: l,
      distanceToRay: Math.sqrt(a),
      point: c,
      index: t,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: o
    });
  }
}
class gv extends be {
  constructor(t, e, n, s, r, o, a, c, l) {
    super(t, e, n, s, r, o, a, c, l), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class Sn {
  constructor() {
    this.type = "Curve", this.arcLengthDivisions = 200;
  }
  // Virtual base class method to overwrite and implement in subclasses
  //	- t [0 .. 1]
  getPoint() {
    return console.warn("THREE.Curve: .getPoint() not implemented."), null;
  }
  // Get point at relative position in curve according to arc length
  // - u [0 .. 1]
  getPointAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getPoint(n, e);
  }
  // Get sequence of points using getPoint( t )
  getPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPoint(n / t));
    return e;
  }
  // Get sequence of points using getPointAt( u )
  getSpacedPoints(t = 5) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPointAt(n / t));
    return e;
  }
  // Get total curve arc length
  getLength() {
    const t = this.getLengths();
    return t[t.length - 1];
  }
  // Get list of cumulative segment lengths
  getLengths(t = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === t + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const e = [];
    let n, s = this.getPoint(0), r = 0;
    e.push(0);
    for (let o = 1; o <= t; o++)
      n = this.getPoint(o / t), r += n.distanceTo(s), e.push(r), s = n;
    return this.cacheArcLengths = e, e;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
  getUtoTmapping(t, e) {
    const n = this.getLengths();
    let s = 0;
    const r = n.length;
    let o;
    e ? o = e : o = t * n[r - 1];
    let a = 0, c = r - 1, l;
    for (; a <= c; )
      if (s = Math.floor(a + (c - a) / 2), l = n[s] - o, l < 0)
        a = s + 1;
      else if (l > 0)
        c = s - 1;
      else {
        c = s;
        break;
      }
    if (s = c, n[s] === o)
      return s / (r - 1);
    const h = n[s], d = n[s + 1] - h, f = (o - h) / d;
    return (s + f) / (r - 1);
  }
  // Returns a unit vector tangent at t
  // In case any sub curve does not implement its tangent derivation,
  // 2 points a small delta apart will be used to find its gradient
  // which seems to give a reasonable approximation
  getTangent(t, e) {
    let s = t - 1e-4, r = t + 1e-4;
    s < 0 && (s = 0), r > 1 && (r = 1);
    const o = this.getPoint(s), a = this.getPoint(r), c = e || (o.isVector2 ? new tt() : new w());
    return c.copy(a).sub(o).normalize(), c;
  }
  getTangentAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getTangent(n, e);
  }
  computeFrenetFrames(t, e) {
    const n = new w(), s = [], r = [], o = [], a = new w(), c = new Dt();
    for (let f = 0; f <= t; f++) {
      const g = f / t;
      s[f] = this.getTangentAt(g, new w());
    }
    r[0] = new w(), o[0] = new w();
    let l = Number.MAX_VALUE;
    const h = Math.abs(s[0].x), u = Math.abs(s[0].y), d = Math.abs(s[0].z);
    h <= l && (l = h, n.set(1, 0, 0)), u <= l && (l = u, n.set(0, 1, 0)), d <= l && n.set(0, 0, 1), a.crossVectors(s[0], n).normalize(), r[0].crossVectors(s[0], a), o[0].crossVectors(s[0], r[0]);
    for (let f = 1; f <= t; f++) {
      if (r[f] = r[f - 1].clone(), o[f] = o[f - 1].clone(), a.crossVectors(s[f - 1], s[f]), a.length() > Number.EPSILON) {
        a.normalize();
        const g = Math.acos(Ee(s[f - 1].dot(s[f]), -1, 1));
        r[f].applyMatrix4(c.makeRotationAxis(a, g));
      }
      o[f].crossVectors(s[f], r[f]);
    }
    if (e === !0) {
      let f = Math.acos(Ee(r[0].dot(r[t]), -1, 1));
      f /= t, s[0].dot(a.crossVectors(r[0], r[t])) > 0 && (f = -f);
      for (let g = 1; g <= t; g++)
        r[g].applyMatrix4(c.makeRotationAxis(s[g], f * g)), o[g].crossVectors(s[g], r[g]);
    }
    return {
      tangents: s,
      normals: r,
      binormals: o
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
  toJSON() {
    const t = {
      metadata: {
        version: 4.6,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return t.arcLengthDivisions = this.arcLengthDivisions, t.type = this.type, t;
  }
  fromJSON(t) {
    return this.arcLengthDivisions = t.arcLengthDivisions, this;
  }
}
class Cc extends Sn {
  constructor(t = 0, e = 0, n = 1, s = 1, r = 0, o = Math.PI * 2, a = !1, c = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = s, this.aStartAngle = r, this.aEndAngle = o, this.aClockwise = a, this.aRotation = c;
  }
  getPoint(t, e = new tt()) {
    const n = e, s = Math.PI * 2;
    let r = this.aEndAngle - this.aStartAngle;
    const o = Math.abs(r) < Number.EPSILON;
    for (; r < 0; ) r += s;
    for (; r > s; ) r -= s;
    r < Number.EPSILON && (o ? r = 0 : r = s), this.aClockwise === !0 && !o && (r === s ? r = -s : r = r - s);
    const a = this.aStartAngle + t * r;
    let c = this.aX + this.xRadius * Math.cos(a), l = this.aY + this.yRadius * Math.sin(a);
    if (this.aRotation !== 0) {
      const h = Math.cos(this.aRotation), u = Math.sin(this.aRotation), d = c - this.aX, f = l - this.aY;
      c = d * h - f * u + this.aX, l = d * u + f * h + this.aY;
    }
    return n.set(c, l);
  }
  copy(t) {
    return super.copy(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.aX = this.aX, t.aY = this.aY, t.xRadius = this.xRadius, t.yRadius = this.yRadius, t.aStartAngle = this.aStartAngle, t.aEndAngle = this.aEndAngle, t.aClockwise = this.aClockwise, t.aRotation = this.aRotation, t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.aX = t.aX, this.aY = t.aY, this.xRadius = t.xRadius, this.yRadius = t.yRadius, this.aStartAngle = t.aStartAngle, this.aEndAngle = t.aEndAngle, this.aClockwise = t.aClockwise, this.aRotation = t.aRotation, this;
  }
}
class _v extends Cc {
  constructor(t, e, n, s, r, o) {
    super(t, e, n, n, s, r, o), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Pc() {
  let i = 0, t = 0, e = 0, n = 0;
  function s(r, o, a, c) {
    i = r, t = a, e = -3 * r + 3 * o - 2 * a - c, n = 2 * r - 2 * o + a + c;
  }
  return {
    initCatmullRom: function(r, o, a, c, l) {
      s(o, a, l * (a - r), l * (c - o));
    },
    initNonuniformCatmullRom: function(r, o, a, c, l, h, u) {
      let d = (o - r) / l - (a - r) / (l + h) + (a - o) / h, f = (a - o) / h - (c - o) / (h + u) + (c - a) / u;
      d *= h, f *= h, s(o, a, d, f);
    },
    calc: function(r) {
      const o = r * r, a = o * r;
      return i + t * r + e * o + n * a;
    }
  };
}
const Nr = /* @__PURE__ */ new w(), ta = /* @__PURE__ */ new Pc(), ea = /* @__PURE__ */ new Pc(), na = /* @__PURE__ */ new Pc();
class vv extends Sn {
  constructor(t = [], e = !1, n = "centripetal", s = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = t, this.closed = e, this.curveType = n, this.tension = s;
  }
  getPoint(t, e = new w()) {
    const n = e, s = this.points, r = s.length, o = (r - (this.closed ? 0 : 1)) * t;
    let a = Math.floor(o), c = o - a;
    this.closed ? a += a > 0 ? 0 : (Math.floor(Math.abs(a) / r) + 1) * r : c === 0 && a === r - 1 && (a = r - 2, c = 1);
    let l, h;
    this.closed || a > 0 ? l = s[(a - 1) % r] : (Nr.subVectors(s[0], s[1]).add(s[0]), l = Nr);
    const u = s[a % r], d = s[(a + 1) % r];
    if (this.closed || a + 2 < r ? h = s[(a + 2) % r] : (Nr.subVectors(s[r - 1], s[r - 2]).add(s[r - 1]), h = Nr), this.curveType === "centripetal" || this.curveType === "chordal") {
      const f = this.curveType === "chordal" ? 0.5 : 0.25;
      let g = Math.pow(l.distanceToSquared(u), f), _ = Math.pow(u.distanceToSquared(d), f), p = Math.pow(d.distanceToSquared(h), f);
      _ < 1e-4 && (_ = 1), g < 1e-4 && (g = _), p < 1e-4 && (p = _), ta.initNonuniformCatmullRom(l.x, u.x, d.x, h.x, g, _, p), ea.initNonuniformCatmullRom(l.y, u.y, d.y, h.y, g, _, p), na.initNonuniformCatmullRom(l.z, u.z, d.z, h.z, g, _, p);
    } else this.curveType === "catmullrom" && (ta.initCatmullRom(l.x, u.x, d.x, h.x, this.tension), ea.initCatmullRom(l.y, u.y, d.y, h.y, this.tension), na.initCatmullRom(l.z, u.z, d.z, h.z, this.tension));
    return n.set(
      ta.calc(c),
      ea.calc(c),
      na.calc(c)
    ), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(s.clone());
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const s = this.points[e];
      t.points.push(s.toArray());
    }
    return t.closed = this.closed, t.curveType = this.curveType, t.tension = this.tension, t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(new w().fromArray(s));
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
}
function yh(i, t, e, n, s) {
  const r = (n - t) * 0.5, o = (s - e) * 0.5, a = i * i, c = i * a;
  return (2 * e - 2 * n + r + o) * c + (-3 * e + 3 * n - 2 * r - o) * a + r * i + e;
}
function xv(i, t) {
  const e = 1 - i;
  return e * e * t;
}
function yv(i, t) {
  return 2 * (1 - i) * i * t;
}
function Mv(i, t) {
  return i * i * t;
}
function Os(i, t, e, n) {
  return xv(i, t) + yv(i, e) + Mv(i, n);
}
function Sv(i, t) {
  const e = 1 - i;
  return e * e * e * t;
}
function Ev(i, t) {
  const e = 1 - i;
  return 3 * e * e * i * t;
}
function bv(i, t) {
  return 3 * (1 - i) * i * i * t;
}
function Tv(i, t) {
  return i * i * i * t;
}
function Fs(i, t, e, n, s) {
  return Sv(i, t) + Ev(i, e) + bv(i, n) + Tv(i, s);
}
class $u extends Sn {
  constructor(t = new tt(), e = new tt(), n = new tt(), s = new tt()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
  }
  getPoint(t, e = new tt()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2, a = this.v3;
    return n.set(
      Fs(t, s.x, r.x, o.x, a.x),
      Fs(t, s.y, r.y, o.y, a.y)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class Av extends Sn {
  constructor(t = new w(), e = new w(), n = new w(), s = new w()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
  }
  getPoint(t, e = new w()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2, a = this.v3;
    return n.set(
      Fs(t, s.x, r.x, o.x, a.x),
      Fs(t, s.y, r.y, o.y, a.y),
      Fs(t, s.z, r.z, o.z, a.z)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this.v3.copy(t.v3), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t.v3 = this.v3.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this.v3.fromArray(t.v3), this;
  }
}
class ju extends Sn {
  constructor(t = new tt(), e = new tt()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new tt()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new tt()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class wv extends Sn {
  constructor(t = new w(), e = new w()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new w()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new w()) {
    return e.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(t, e) {
    return this.getTangent(t, e);
  }
  copy(t) {
    return super.copy(t), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class qu extends Sn {
  constructor(t = new tt(), e = new tt(), n = new tt()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new tt()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2;
    return n.set(
      Os(t, s.x, r.x, o.x),
      Os(t, s.y, r.y, o.y)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class Rv extends Sn {
  constructor(t = new w(), e = new w(), n = new w()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new w()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2;
    return n.set(
      Os(t, s.x, r.x, o.x),
      Os(t, s.y, r.y, o.y),
      Os(t, s.z, r.z, o.z)
    ), n;
  }
  copy(t) {
    return super.copy(t), this.v0.copy(t.v0), this.v1.copy(t.v1), this.v2.copy(t.v2), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.v0 = this.v0.toArray(), t.v1 = this.v1.toArray(), t.v2 = this.v2.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.v0.fromArray(t.v0), this.v1.fromArray(t.v1), this.v2.fromArray(t.v2), this;
  }
}
class Yu extends Sn {
  constructor(t = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = t;
  }
  getPoint(t, e = new tt()) {
    const n = e, s = this.points, r = (s.length - 1) * t, o = Math.floor(r), a = r - o, c = s[o === 0 ? o : o - 1], l = s[o], h = s[o > s.length - 2 ? s.length - 1 : o + 1], u = s[o > s.length - 3 ? s.length - 1 : o + 2];
    return n.set(
      yh(a, c.x, l.x, h.x, u.x),
      yh(a, c.y, l.y, h.y, u.y)
    ), n;
  }
  copy(t) {
    super.copy(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.points = [];
    for (let e = 0, n = this.points.length; e < n; e++) {
      const s = this.points[e];
      t.points.push(s.toArray());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.points = [];
    for (let e = 0, n = t.points.length; e < n; e++) {
      const s = t.points[e];
      this.points.push(new tt().fromArray(s));
    }
    return this;
  }
}
var Mh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: _v,
  CatmullRomCurve3: vv,
  CubicBezierCurve: $u,
  CubicBezierCurve3: Av,
  EllipseCurve: Cc,
  LineCurve: ju,
  LineCurve3: wv,
  QuadraticBezierCurve: qu,
  QuadraticBezierCurve3: Rv,
  SplineCurve: Yu
});
class Cv extends Sn {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(t) {
    this.curves.push(t);
  }
  closePath() {
    const t = this.curves[0].getPoint(0), e = this.curves[this.curves.length - 1].getPoint(1);
    if (!t.equals(e)) {
      const n = t.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new Mh[n](e, t));
    }
    return this;
  }
  // To get accurate point with reference to
  // entire path distance at time t,
  // following has to be done:
  // 1. Length of each sub path have to be known
  // 2. Locate and identify type of curve
  // 3. Get t for the curve
  // 4. Return curve.getPointAt(t')
  getPoint(t, e) {
    const n = t * this.getLength(), s = this.getCurveLengths();
    let r = 0;
    for (; r < s.length; ) {
      if (s[r] >= n) {
        const o = s[r] - n, a = this.curves[r], c = a.getLength(), l = c === 0 ? 0 : 1 - o / c;
        return a.getPointAt(l, e);
      }
      r++;
    }
    return null;
  }
  // We cannot use the default THREE.Curve getPoint() with getLength() because in
  // THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
  // getPoint() depends on getLength
  getLength() {
    const t = this.getCurveLengths();
    return t[t.length - 1];
  }
  // cacheLengths must be recalculated.
  updateArcLengths() {
    this.needsUpdate = !0, this.cacheLengths = null, this.getCurveLengths();
  }
  // Compute lengths and cache them
  // We cannot overwrite getLengths() because UtoT mapping uses it.
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
      return this.cacheLengths;
    const t = [];
    let e = 0;
    for (let n = 0, s = this.curves.length; n < s; n++)
      e += this.curves[n].getLength(), t.push(e);
    return this.cacheLengths = t, t;
  }
  getSpacedPoints(t = 40) {
    const e = [];
    for (let n = 0; n <= t; n++)
      e.push(this.getPoint(n / t));
    return this.autoClose && e.push(e[0]), e;
  }
  getPoints(t = 12) {
    const e = [];
    let n;
    for (let s = 0, r = this.curves; s < r.length; s++) {
      const o = r[s], a = o.isEllipseCurve ? t * 2 : o.isLineCurve || o.isLineCurve3 ? 1 : o.isSplineCurve ? t * o.points.length : t, c = o.getPoints(a);
      for (let l = 0; l < c.length; l++) {
        const h = c[l];
        n && n.equals(h) || (e.push(h), n = h);
      }
    }
    return this.autoClose && e.length > 1 && !e[e.length - 1].equals(e[0]) && e.push(e[0]), e;
  }
  copy(t) {
    super.copy(t), this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const s = t.curves[e];
      this.curves.push(s.clone());
    }
    return this.autoClose = t.autoClose, this;
  }
  toJSON() {
    const t = super.toJSON();
    t.autoClose = this.autoClose, t.curves = [];
    for (let e = 0, n = this.curves.length; e < n; e++) {
      const s = this.curves[e];
      t.curves.push(s.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.autoClose = t.autoClose, this.curves = [];
    for (let e = 0, n = t.curves.length; e < n; e++) {
      const s = t.curves[e];
      this.curves.push(new Mh[s.type]().fromJSON(s));
    }
    return this;
  }
}
class Sh extends Cv {
  constructor(t) {
    super(), this.type = "Path", this.currentPoint = new tt(), t && this.setFromPoints(t);
  }
  setFromPoints(t) {
    this.moveTo(t[0].x, t[0].y);
    for (let e = 1, n = t.length; e < n; e++)
      this.lineTo(t[e].x, t[e].y);
    return this;
  }
  moveTo(t, e) {
    return this.currentPoint.set(t, e), this;
  }
  lineTo(t, e) {
    const n = new ju(this.currentPoint.clone(), new tt(t, e));
    return this.curves.push(n), this.currentPoint.set(t, e), this;
  }
  quadraticCurveTo(t, e, n, s) {
    const r = new qu(
      this.currentPoint.clone(),
      new tt(t, e),
      new tt(n, s)
    );
    return this.curves.push(r), this.currentPoint.set(n, s), this;
  }
  bezierCurveTo(t, e, n, s, r, o) {
    const a = new $u(
      this.currentPoint.clone(),
      new tt(t, e),
      new tt(n, s),
      new tt(r, o)
    );
    return this.curves.push(a), this.currentPoint.set(r, o), this;
  }
  splineThru(t) {
    const e = [this.currentPoint.clone()].concat(t), n = new Yu(e);
    return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this;
  }
  arc(t, e, n, s, r, o) {
    const a = this.currentPoint.x, c = this.currentPoint.y;
    return this.absarc(
      t + a,
      e + c,
      n,
      s,
      r,
      o
    ), this;
  }
  absarc(t, e, n, s, r, o) {
    return this.absellipse(t, e, n, n, s, r, o), this;
  }
  ellipse(t, e, n, s, r, o, a, c) {
    const l = this.currentPoint.x, h = this.currentPoint.y;
    return this.absellipse(t + l, e + h, n, s, r, o, a, c), this;
  }
  absellipse(t, e, n, s, r, o, a, c) {
    const l = new Cc(t, e, n, s, r, o, a, c);
    if (this.curves.length > 0) {
      const u = l.getPoint(0);
      u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
    }
    this.curves.push(l);
    const h = l.getPoint(1);
    return this.currentPoint.copy(h), this;
  }
  copy(t) {
    return super.copy(t), this.currentPoint.copy(t.currentPoint), this;
  }
  toJSON() {
    const t = super.toJSON();
    return t.currentPoint = this.currentPoint.toArray(), t;
  }
  fromJSON(t) {
    return super.fromJSON(t), this.currentPoint.fromArray(t.currentPoint), this;
  }
}
class Lc extends Pe {
  constructor(t = 1, e = 1, n = 1, s = 32, r = 1, o = !1, a = 0, c = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: t,
      radiusBottom: e,
      height: n,
      radialSegments: s,
      heightSegments: r,
      openEnded: o,
      thetaStart: a,
      thetaLength: c
    };
    const l = this;
    s = Math.floor(s), r = Math.floor(r);
    const h = [], u = [], d = [], f = [];
    let g = 0;
    const _ = [], p = n / 2;
    let m = 0;
    S(), o === !1 && (t > 0 && x(!0), e > 0 && x(!1)), this.setIndex(h), this.setAttribute("position", new ce(u, 3)), this.setAttribute("normal", new ce(d, 3)), this.setAttribute("uv", new ce(f, 2));
    function S() {
      const M = new w(), P = new w();
      let R = 0;
      const A = (e - t) / n;
      for (let L = 0; L <= r; L++) {
        const G = [], v = L / r, b = v * (e - t) + t;
        for (let B = 0; B <= s; B++) {
          const z = B / s, H = z * c + a, K = Math.sin(H), k = Math.cos(H);
          P.x = b * K, P.y = -v * n + p, P.z = b * k, u.push(P.x, P.y, P.z), M.set(K, A, k).normalize(), d.push(M.x, M.y, M.z), f.push(z, 1 - v), G.push(g++);
        }
        _.push(G);
      }
      for (let L = 0; L < s; L++)
        for (let G = 0; G < r; G++) {
          const v = _[G][L], b = _[G + 1][L], B = _[G + 1][L + 1], z = _[G][L + 1];
          t > 0 && (h.push(v, b, z), R += 3), e > 0 && (h.push(b, B, z), R += 3);
        }
      l.addGroup(m, R, 0), m += R;
    }
    function x(M) {
      const P = g, R = new tt(), A = new w();
      let L = 0;
      const G = M === !0 ? t : e, v = M === !0 ? 1 : -1;
      for (let B = 1; B <= s; B++)
        u.push(0, p * v, 0), d.push(0, v, 0), f.push(0.5, 0.5), g++;
      const b = g;
      for (let B = 0; B <= s; B++) {
        const H = B / s * c + a, K = Math.cos(H), k = Math.sin(H);
        A.x = G * k, A.y = p * v, A.z = G * K, u.push(A.x, A.y, A.z), d.push(0, v, 0), R.x = K * 0.5 + 0.5, R.y = k * 0.5 * v + 0.5, f.push(R.x, R.y), g++;
      }
      for (let B = 0; B < s; B++) {
        const z = P + B, H = b + B;
        M === !0 ? h.push(H, H + 1, z) : h.push(H + 1, H, z), L += 3;
      }
      l.addGroup(m, L, M === !0 ? 1 : 2), m += L;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Lc(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}
class Ic extends Pe {
  constructor(t = [], e = [], n = 1, s = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: t,
      indices: e,
      radius: n,
      detail: s
    };
    const r = [], o = [];
    a(s), l(n), h(), this.setAttribute("position", new ce(r, 3)), this.setAttribute("normal", new ce(r.slice(), 3)), this.setAttribute("uv", new ce(o, 2)), s === 0 ? this.computeVertexNormals() : this.normalizeNormals();
    function a(S) {
      const x = new w(), M = new w(), P = new w();
      for (let R = 0; R < e.length; R += 3)
        f(e[R + 0], x), f(e[R + 1], M), f(e[R + 2], P), c(x, M, P, S);
    }
    function c(S, x, M, P) {
      const R = P + 1, A = [];
      for (let L = 0; L <= R; L++) {
        A[L] = [];
        const G = S.clone().lerp(M, L / R), v = x.clone().lerp(M, L / R), b = R - L;
        for (let B = 0; B <= b; B++)
          B === 0 && L === R ? A[L][B] = G : A[L][B] = G.clone().lerp(v, B / b);
      }
      for (let L = 0; L < R; L++)
        for (let G = 0; G < 2 * (R - L) - 1; G++) {
          const v = Math.floor(G / 2);
          G % 2 === 0 ? (d(A[L][v + 1]), d(A[L + 1][v]), d(A[L][v])) : (d(A[L][v + 1]), d(A[L + 1][v + 1]), d(A[L + 1][v]));
        }
    }
    function l(S) {
      const x = new w();
      for (let M = 0; M < r.length; M += 3)
        x.x = r[M + 0], x.y = r[M + 1], x.z = r[M + 2], x.normalize().multiplyScalar(S), r[M + 0] = x.x, r[M + 1] = x.y, r[M + 2] = x.z;
    }
    function h() {
      const S = new w();
      for (let x = 0; x < r.length; x += 3) {
        S.x = r[x + 0], S.y = r[x + 1], S.z = r[x + 2];
        const M = p(S) / 2 / Math.PI + 0.5, P = m(S) / Math.PI + 0.5;
        o.push(M, 1 - P);
      }
      g(), u();
    }
    function u() {
      for (let S = 0; S < o.length; S += 6) {
        const x = o[S + 0], M = o[S + 2], P = o[S + 4], R = Math.max(x, M, P), A = Math.min(x, M, P);
        R > 0.9 && A < 0.1 && (x < 0.2 && (o[S + 0] += 1), M < 0.2 && (o[S + 2] += 1), P < 0.2 && (o[S + 4] += 1));
      }
    }
    function d(S) {
      r.push(S.x, S.y, S.z);
    }
    function f(S, x) {
      const M = S * 3;
      x.x = t[M + 0], x.y = t[M + 1], x.z = t[M + 2];
    }
    function g() {
      const S = new w(), x = new w(), M = new w(), P = new w(), R = new tt(), A = new tt(), L = new tt();
      for (let G = 0, v = 0; G < r.length; G += 9, v += 6) {
        S.set(r[G + 0], r[G + 1], r[G + 2]), x.set(r[G + 3], r[G + 4], r[G + 5]), M.set(r[G + 6], r[G + 7], r[G + 8]), R.set(o[v + 0], o[v + 1]), A.set(o[v + 2], o[v + 3]), L.set(o[v + 4], o[v + 5]), P.copy(S).add(x).add(M).divideScalar(3);
        const b = p(P);
        _(R, v + 0, S, b), _(A, v + 2, x, b), _(L, v + 4, M, b);
      }
    }
    function _(S, x, M, P) {
      P < 0 && S.x === 1 && (o[x] = S.x - 1), M.x === 0 && M.z === 0 && (o[x] = P / 2 / Math.PI + 0.5);
    }
    function p(S) {
      return Math.atan2(S.z, -S.x);
    }
    function m(S) {
      return Math.atan2(-S.y, Math.sqrt(S.x * S.x + S.z * S.z));
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ic(t.vertices, t.indices, t.radius, t.details);
  }
}
class Ku extends Sh {
  constructor(t) {
    super(t), this.uuid = on(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(t) {
    const e = [];
    for (let n = 0, s = this.holes.length; n < s; n++)
      e[n] = this.holes[n].getPoints(t);
    return e;
  }
  // get points of shape and holes (keypoints based on segments parameter)
  extractPoints(t) {
    return {
      shape: this.getPoints(t),
      holes: this.getPointsHoles(t)
    };
  }
  copy(t) {
    super.copy(t), this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const s = t.holes[e];
      this.holes.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const t = super.toJSON();
    t.uuid = this.uuid, t.holes = [];
    for (let e = 0, n = this.holes.length; e < n; e++) {
      const s = this.holes[e];
      t.holes.push(s.toJSON());
    }
    return t;
  }
  fromJSON(t) {
    super.fromJSON(t), this.uuid = t.uuid, this.holes = [];
    for (let e = 0, n = t.holes.length; e < n; e++) {
      const s = t.holes[e];
      this.holes.push(new Sh().fromJSON(s));
    }
    return this;
  }
}
const Pv = {
  triangulate: function(i, t, e = 2) {
    const n = t && t.length, s = n ? t[0] * e : i.length;
    let r = Zu(i, 0, s, e, !0);
    const o = [];
    if (!r || r.next === r.prev) return o;
    let a, c, l, h, u, d, f;
    if (n && (r = Uv(i, t, r, e)), i.length > 80 * e) {
      a = l = i[0], c = h = i[1];
      for (let g = e; g < s; g += e)
        u = i[g], d = i[g + 1], u < a && (a = u), d < c && (c = d), u > l && (l = u), d > h && (h = d);
      f = Math.max(l - a, h - c), f = f !== 0 ? 32767 / f : 0;
    }
    return qs(r, o, e, a, c, f, 0), o;
  }
};
function Zu(i, t, e, n, s) {
  let r, o;
  if (s === $v(i, t, e, n) > 0)
    for (r = t; r < e; r += n) o = Eh(r, i[r], i[r + 1], o);
  else
    for (r = e - n; r >= t; r -= n) o = Eh(r, i[r], i[r + 1], o);
  return o && po(o, o.next) && (Ks(o), o = o.next), o;
}
function vi(i, t) {
  if (!i) return i;
  t || (t = i);
  let e = i, n;
  do
    if (n = !1, !e.steiner && (po(e, e.next) || fe(e.prev, e, e.next) === 0)) {
      if (Ks(e), e = t = e.prev, e === e.next) break;
      n = !0;
    } else
      e = e.next;
  while (n || e !== t);
  return t;
}
function qs(i, t, e, n, s, r, o) {
  if (!i) return;
  !o && r && kv(i, n, s, r);
  let a = i, c, l;
  for (; i.prev !== i.next; ) {
    if (c = i.prev, l = i.next, r ? Iv(i, n, s, r) : Lv(i)) {
      t.push(c.i / e | 0), t.push(i.i / e | 0), t.push(l.i / e | 0), Ks(i), i = l.next, a = l.next;
      continue;
    }
    if (i = l, i === a) {
      o ? o === 1 ? (i = Dv(vi(i), t, e), qs(i, t, e, n, s, r, 2)) : o === 2 && Nv(i, t, e, n, s, r) : qs(vi(i), t, e, n, s, r, 1);
      break;
    }
  }
}
function Lv(i) {
  const t = i.prev, e = i, n = i.next;
  if (fe(t, e, n) >= 0) return !1;
  const s = t.x, r = e.x, o = n.x, a = t.y, c = e.y, l = n.y, h = s < r ? s < o ? s : o : r < o ? r : o, u = a < c ? a < l ? a : l : c < l ? c : l, d = s > r ? s > o ? s : o : r > o ? r : o, f = a > c ? a > l ? a : l : c > l ? c : l;
  let g = n.next;
  for (; g !== t; ) {
    if (g.x >= h && g.x <= d && g.y >= u && g.y <= f && Gi(s, a, r, c, o, l, g.x, g.y) && fe(g.prev, g, g.next) >= 0) return !1;
    g = g.next;
  }
  return !0;
}
function Iv(i, t, e, n) {
  const s = i.prev, r = i, o = i.next;
  if (fe(s, r, o) >= 0) return !1;
  const a = s.x, c = r.x, l = o.x, h = s.y, u = r.y, d = o.y, f = a < c ? a < l ? a : l : c < l ? c : l, g = h < u ? h < d ? h : d : u < d ? u : d, _ = a > c ? a > l ? a : l : c > l ? c : l, p = h > u ? h > d ? h : d : u > d ? u : d, m = Ja(f, g, t, e, n), S = Ja(_, p, t, e, n);
  let x = i.prevZ, M = i.nextZ;
  for (; x && x.z >= m && M && M.z <= S; ) {
    if (x.x >= f && x.x <= _ && x.y >= g && x.y <= p && x !== s && x !== o && Gi(a, h, c, u, l, d, x.x, x.y) && fe(x.prev, x, x.next) >= 0 || (x = x.prevZ, M.x >= f && M.x <= _ && M.y >= g && M.y <= p && M !== s && M !== o && Gi(a, h, c, u, l, d, M.x, M.y) && fe(M.prev, M, M.next) >= 0)) return !1;
    M = M.nextZ;
  }
  for (; x && x.z >= m; ) {
    if (x.x >= f && x.x <= _ && x.y >= g && x.y <= p && x !== s && x !== o && Gi(a, h, c, u, l, d, x.x, x.y) && fe(x.prev, x, x.next) >= 0) return !1;
    x = x.prevZ;
  }
  for (; M && M.z <= S; ) {
    if (M.x >= f && M.x <= _ && M.y >= g && M.y <= p && M !== s && M !== o && Gi(a, h, c, u, l, d, M.x, M.y) && fe(M.prev, M, M.next) >= 0) return !1;
    M = M.nextZ;
  }
  return !0;
}
function Dv(i, t, e) {
  let n = i;
  do {
    const s = n.prev, r = n.next.next;
    !po(s, r) && Ju(s, n, n.next, r) && Ys(s, r) && Ys(r, s) && (t.push(s.i / e | 0), t.push(n.i / e | 0), t.push(r.i / e | 0), Ks(n), Ks(n.next), n = i = r), n = n.next;
  } while (n !== i);
  return vi(n);
}
function Nv(i, t, e, n, s, r) {
  let o = i;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && Gv(o, a)) {
        let c = Qu(o, a);
        o = vi(o, o.next), c = vi(c, c.next), qs(o, t, e, n, s, r, 0), qs(c, t, e, n, s, r, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== i);
}
function Uv(i, t, e, n) {
  const s = [];
  let r, o, a, c, l;
  for (r = 0, o = t.length; r < o; r++)
    a = t[r] * n, c = r < o - 1 ? t[r + 1] * n : i.length, l = Zu(i, a, c, n, !1), l === l.next && (l.steiner = !0), s.push(Vv(l));
  for (s.sort(Ov), r = 0; r < s.length; r++)
    e = Fv(s[r], e);
  return e;
}
function Ov(i, t) {
  return i.x - t.x;
}
function Fv(i, t) {
  const e = Bv(i, t);
  if (!e)
    return t;
  const n = Qu(e, i);
  return vi(n, n.next), vi(e, e.next);
}
function Bv(i, t) {
  let e = t, n = -1 / 0, s;
  const r = i.x, o = i.y;
  do {
    if (o <= e.y && o >= e.next.y && e.next.y !== e.y) {
      const d = e.x + (o - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
      if (d <= r && d > n && (n = d, s = e.x < e.next.x ? e : e.next, d === r))
        return s;
    }
    e = e.next;
  } while (e !== t);
  if (!s) return null;
  const a = s, c = s.x, l = s.y;
  let h = 1 / 0, u;
  e = s;
  do
    r >= e.x && e.x >= c && r !== e.x && Gi(o < l ? r : n, o, c, l, o < l ? n : r, o, e.x, e.y) && (u = Math.abs(o - e.y) / (r - e.x), Ys(e, i) && (u < h || u === h && (e.x > s.x || e.x === s.x && zv(s, e))) && (s = e, h = u)), e = e.next;
  while (e !== a);
  return s;
}
function zv(i, t) {
  return fe(i.prev, i, t.prev) < 0 && fe(t.next, i, i.next) < 0;
}
function kv(i, t, e, n) {
  let s = i;
  do
    s.z === 0 && (s.z = Ja(s.x, s.y, t, e, n)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
  while (s !== i);
  s.prevZ.nextZ = null, s.prevZ = null, Hv(s);
}
function Hv(i) {
  let t, e, n, s, r, o, a, c, l = 1;
  do {
    for (e = i, i = null, r = null, o = 0; e; ) {
      for (o++, n = e, a = 0, t = 0; t < l && (a++, n = n.nextZ, !!n); t++)
        ;
      for (c = l; a > 0 || c > 0 && n; )
        a !== 0 && (c === 0 || !n || e.z <= n.z) ? (s = e, e = e.nextZ, a--) : (s = n, n = n.nextZ, c--), r ? r.nextZ = s : i = s, s.prevZ = r, r = s;
      e = n;
    }
    r.nextZ = null, l *= 2;
  } while (o > 1);
  return i;
}
function Ja(i, t, e, n, s) {
  return i = (i - e) * s | 0, t = (t - n) * s | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, i | t << 1;
}
function Vv(i) {
  let t = i, e = i;
  do
    (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
  while (t !== i);
  return e;
}
function Gi(i, t, e, n, s, r, o, a) {
  return (s - o) * (t - a) >= (i - o) * (r - a) && (i - o) * (n - a) >= (e - o) * (t - a) && (e - o) * (r - a) >= (s - o) * (n - a);
}
function Gv(i, t) {
  return i.next.i !== t.i && i.prev.i !== t.i && !Wv(i, t) && // dones't intersect other edges
  (Ys(i, t) && Ys(t, i) && Xv(i, t) && // locally visible
  (fe(i.prev, i, t.prev) || fe(i, t.prev, t)) || // does not create opposite-facing sectors
  po(i, t) && fe(i.prev, i, i.next) > 0 && fe(t.prev, t, t.next) > 0);
}
function fe(i, t, e) {
  return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
}
function po(i, t) {
  return i.x === t.x && i.y === t.y;
}
function Ju(i, t, e, n) {
  const s = Or(fe(i, t, e)), r = Or(fe(i, t, n)), o = Or(fe(e, n, i)), a = Or(fe(e, n, t));
  return !!(s !== r && o !== a || s === 0 && Ur(i, e, t) || r === 0 && Ur(i, n, t) || o === 0 && Ur(e, i, n) || a === 0 && Ur(e, t, n));
}
function Ur(i, t, e) {
  return t.x <= Math.max(i.x, e.x) && t.x >= Math.min(i.x, e.x) && t.y <= Math.max(i.y, e.y) && t.y >= Math.min(i.y, e.y);
}
function Or(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function Wv(i, t) {
  let e = i;
  do {
    if (e.i !== i.i && e.next.i !== i.i && e.i !== t.i && e.next.i !== t.i && Ju(e, e.next, i, t)) return !0;
    e = e.next;
  } while (e !== i);
  return !1;
}
function Ys(i, t) {
  return fe(i.prev, i, i.next) < 0 ? fe(i, t, i.next) >= 0 && fe(i, i.prev, t) >= 0 : fe(i, t, i.prev) < 0 || fe(i, i.next, t) < 0;
}
function Xv(i, t) {
  let e = i, n = !1;
  const s = (i.x + t.x) / 2, r = (i.y + t.y) / 2;
  do
    e.y > r != e.next.y > r && e.next.y !== e.y && s < (e.next.x - e.x) * (r - e.y) / (e.next.y - e.y) + e.x && (n = !n), e = e.next;
  while (e !== i);
  return n;
}
function Qu(i, t) {
  const e = new Qa(i.i, i.x, i.y), n = new Qa(t.i, t.x, t.y), s = i.next, r = t.prev;
  return i.next = t, t.prev = i, e.next = s, s.prev = e, n.next = e, e.prev = n, r.next = n, n.prev = r, n;
}
function Eh(i, t, e, n) {
  const s = new Qa(i, t, e);
  return n ? (s.next = n.next, s.prev = n, n.next.prev = s, n.next = s) : (s.prev = s, s.next = s), s;
}
function Ks(i) {
  i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function Qa(i, t, e) {
  this.i = i, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function $v(i, t, e, n) {
  let s = 0;
  for (let r = t, o = e - n; r < e; r += n)
    s += (i[o] - i[r]) * (i[r + 1] + i[o + 1]), o = r;
  return s;
}
class Bs {
  // calculate area of the contour polygon
  static area(t) {
    const e = t.length;
    let n = 0;
    for (let s = e - 1, r = 0; r < e; s = r++)
      n += t[s].x * t[r].y - t[r].x * t[s].y;
    return n * 0.5;
  }
  static isClockWise(t) {
    return Bs.area(t) < 0;
  }
  static triangulateShape(t, e) {
    const n = [], s = [], r = [];
    bh(t), Th(n, t);
    let o = t.length;
    e.forEach(bh);
    for (let c = 0; c < e.length; c++)
      s.push(o), o += e[c].length, Th(n, e[c]);
    const a = Pv.triangulate(n, s);
    for (let c = 0; c < a.length; c += 3)
      r.push(a.slice(c, c + 3));
    return r;
  }
}
function bh(i) {
  const t = i.length;
  t > 2 && i[t - 1].equals(i[0]) && i.pop();
}
function Th(i, t) {
  for (let e = 0; e < t.length; e++)
    i.push(t[e].x), i.push(t[e].y);
}
class Dc extends Ic {
  constructor(t = 1, e = 0) {
    const n = (1 + Math.sqrt(5)) / 2, s = [
      -1,
      n,
      0,
      1,
      n,
      0,
      -1,
      -n,
      0,
      1,
      -n,
      0,
      0,
      -1,
      n,
      0,
      1,
      n,
      0,
      -1,
      -n,
      0,
      1,
      -n,
      n,
      0,
      -1,
      n,
      0,
      1,
      -n,
      0,
      -1,
      -n,
      0,
      1
    ], r = [
      0,
      11,
      5,
      0,
      5,
      1,
      0,
      1,
      7,
      0,
      7,
      10,
      0,
      10,
      11,
      1,
      5,
      9,
      5,
      11,
      4,
      11,
      10,
      2,
      10,
      7,
      6,
      7,
      1,
      8,
      3,
      9,
      4,
      3,
      4,
      2,
      3,
      2,
      6,
      3,
      6,
      8,
      3,
      8,
      9,
      4,
      9,
      5,
      2,
      4,
      11,
      6,
      2,
      10,
      8,
      6,
      7,
      9,
      8,
      1
    ];
    super(s, r, t, e), this.type = "IcosahedronGeometry", this.parameters = {
      radius: t,
      detail: e
    };
  }
  static fromJSON(t) {
    return new Dc(t.radius, t.detail);
  }
}
class Nc extends Pe {
  constructor(t = new Ku([new tt(0, 0.5), new tt(-0.5, -0.5), new tt(0.5, -0.5)]), e = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: t,
      curveSegments: e
    };
    const n = [], s = [], r = [], o = [];
    let a = 0, c = 0;
    if (Array.isArray(t) === !1)
      l(t);
    else
      for (let h = 0; h < t.length; h++)
        l(t[h]), this.addGroup(a, c, h), a += c, c = 0;
    this.setIndex(n), this.setAttribute("position", new ce(s, 3)), this.setAttribute("normal", new ce(r, 3)), this.setAttribute("uv", new ce(o, 2));
    function l(h) {
      const u = s.length / 3, d = h.extractPoints(e);
      let f = d.shape;
      const g = d.holes;
      Bs.isClockWise(f) === !1 && (f = f.reverse());
      for (let p = 0, m = g.length; p < m; p++) {
        const S = g[p];
        Bs.isClockWise(S) === !0 && (g[p] = S.reverse());
      }
      const _ = Bs.triangulateShape(f, g);
      for (let p = 0, m = g.length; p < m; p++) {
        const S = g[p];
        f = f.concat(S);
      }
      for (let p = 0, m = f.length; p < m; p++) {
        const S = f[p];
        s.push(S.x, S.y, 0), r.push(0, 0, 1), o.push(S.x, S.y);
      }
      for (let p = 0, m = _.length; p < m; p++) {
        const S = _[p], x = S[0] + u, M = S[1] + u, P = S[2] + u;
        n.push(x, M, P), c += 3;
      }
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON(), e = this.parameters.shapes;
    return jv(e, t);
  }
  static fromJSON(t, e) {
    const n = [];
    for (let s = 0, r = t.shapes.length; s < r; s++) {
      const o = e[t.shapes[s]];
      n.push(o);
    }
    return new Nc(n, t.curveSegments);
  }
}
function jv(i, t) {
  if (t.shapes = [], Array.isArray(i))
    for (let e = 0, n = i.length; e < n; e++) {
      const s = i[e];
      t.shapes.push(s.uuid);
    }
  else
    t.shapes.push(i.uuid);
  return t;
}
class mo extends Pe {
  constructor(t = 1, e = 32, n = 16, s = 0, r = Math.PI * 2, o = 0, a = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: t,
      widthSegments: e,
      heightSegments: n,
      phiStart: s,
      phiLength: r,
      thetaStart: o,
      thetaLength: a
    }, e = Math.max(3, Math.floor(e)), n = Math.max(2, Math.floor(n));
    const c = Math.min(o + a, Math.PI);
    let l = 0;
    const h = [], u = new w(), d = new w(), f = [], g = [], _ = [], p = [];
    for (let m = 0; m <= n; m++) {
      const S = [], x = m / n;
      let M = 0;
      m === 0 && o === 0 ? M = 0.5 / e : m === n && c === Math.PI && (M = -0.5 / e);
      for (let P = 0; P <= e; P++) {
        const R = P / e;
        u.x = -t * Math.cos(s + R * r) * Math.sin(o + x * a), u.y = t * Math.cos(o + x * a), u.z = t * Math.sin(s + R * r) * Math.sin(o + x * a), g.push(u.x, u.y, u.z), d.copy(u).normalize(), _.push(d.x, d.y, d.z), p.push(R + M, 1 - x), S.push(l++);
      }
      h.push(S);
    }
    for (let m = 0; m < n; m++)
      for (let S = 0; S < e; S++) {
        const x = h[m][S + 1], M = h[m][S], P = h[m + 1][S], R = h[m + 1][S + 1];
        (m !== 0 || o > 0) && f.push(x, M, R), (m !== n - 1 || c < Math.PI) && f.push(M, P, R);
      }
    this.setIndex(f), this.setAttribute("position", new ce(g, 3)), this.setAttribute("normal", new ce(_, 3)), this.setAttribute("uv", new ce(p, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new mo(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
  }
}
class Uc extends Pe {
  constructor(t = 1, e = 0.4, n = 12, s = 48, r = Math.PI * 2) {
    super(), this.type = "TorusGeometry", this.parameters = {
      radius: t,
      tube: e,
      radialSegments: n,
      tubularSegments: s,
      arc: r
    }, n = Math.floor(n), s = Math.floor(s);
    const o = [], a = [], c = [], l = [], h = new w(), u = new w(), d = new w();
    for (let f = 0; f <= n; f++)
      for (let g = 0; g <= s; g++) {
        const _ = g / s * r, p = f / n * Math.PI * 2;
        u.x = (t + e * Math.cos(p)) * Math.cos(_), u.y = (t + e * Math.cos(p)) * Math.sin(_), u.z = e * Math.sin(p), a.push(u.x, u.y, u.z), h.x = t * Math.cos(_), h.y = t * Math.sin(_), d.subVectors(u, h).normalize(), c.push(d.x, d.y, d.z), l.push(g / s), l.push(f / n);
      }
    for (let f = 1; f <= n; f++)
      for (let g = 1; g <= s; g++) {
        const _ = (s + 1) * f + g - 1, p = (s + 1) * (f - 1) + g - 1, m = (s + 1) * (f - 1) + g, S = (s + 1) * f + g;
        o.push(_, p, S), o.push(p, m, S);
      }
    this.setIndex(o), this.setAttribute("position", new ce(a, 3)), this.setAttribute("normal", new ce(c, 3)), this.setAttribute("uv", new ce(l, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Uc(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc);
  }
}
class us extends gn {
  constructor(t) {
    super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.type = "MeshStandardMaterial", this.color = new Tt(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Tt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Mu, this.normalScale = new tt(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new yn(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class En extends us {
  constructor(t) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new tt(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function() {
        return Ee(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function(e) {
        this.ior = (1 + 0.4 * e) / (1 - 0.4 * e);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new Tt(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new Tt(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Tt(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(t);
  }
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(t) {
    this._anisotropy > 0 != t > 0 && this.version++, this._anisotropy = t;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(t) {
    this._clearcoat > 0 != t > 0 && this.version++, this._clearcoat = t;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(t) {
    this._iridescence > 0 != t > 0 && this.version++, this._iridescence = t;
  }
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(t) {
    this._dispersion > 0 != t > 0 && this.version++, this._dispersion = t;
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(t) {
    this._sheen > 0 != t > 0 && this.version++, this._sheen = t;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(t) {
    this._transmission > 0 != t > 0 && this.version++, this._transmission = t;
  }
  copy(t) {
    return super.copy(t), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropy = t.anisotropy, this.anisotropyRotation = t.anisotropyRotation, this.anisotropyMap = t.anisotropyMap, this.clearcoat = t.clearcoat, this.clearcoatMap = t.clearcoatMap, this.clearcoatRoughness = t.clearcoatRoughness, this.clearcoatRoughnessMap = t.clearcoatRoughnessMap, this.clearcoatNormalMap = t.clearcoatNormalMap, this.clearcoatNormalScale.copy(t.clearcoatNormalScale), this.dispersion = t.dispersion, this.ior = t.ior, this.iridescence = t.iridescence, this.iridescenceMap = t.iridescenceMap, this.iridescenceIOR = t.iridescenceIOR, this.iridescenceThicknessRange = [...t.iridescenceThicknessRange], this.iridescenceThicknessMap = t.iridescenceThicknessMap, this.sheen = t.sheen, this.sheenColor.copy(t.sheenColor), this.sheenColorMap = t.sheenColorMap, this.sheenRoughness = t.sheenRoughness, this.sheenRoughnessMap = t.sheenRoughnessMap, this.transmission = t.transmission, this.transmissionMap = t.transmissionMap, this.thickness = t.thickness, this.thicknessMap = t.thicknessMap, this.attenuationDistance = t.attenuationDistance, this.attenuationColor.copy(t.attenuationColor), this.specularIntensity = t.specularIntensity, this.specularIntensityMap = t.specularIntensityMap, this.specularColor.copy(t.specularColor), this.specularColorMap = t.specularColorMap, this;
  }
}
function Fr(i, t, e) {
  return !i || // let 'undefined' and 'null' pass
  !e && i.constructor === t ? i : typeof t.BYTES_PER_ELEMENT == "number" ? new t(i) : Array.prototype.slice.call(i);
}
function qv(i) {
  return ArrayBuffer.isView(i) && !(i instanceof DataView);
}
function Yv(i) {
  function t(s, r) {
    return i[s] - i[r];
  }
  const e = i.length, n = new Array(e);
  for (let s = 0; s !== e; ++s) n[s] = s;
  return n.sort(t), n;
}
function Ah(i, t, e) {
  const n = i.length, s = new i.constructor(n);
  for (let r = 0, o = 0; o !== n; ++r) {
    const a = e[r] * t;
    for (let c = 0; c !== t; ++c)
      s[o++] = i[a + c];
  }
  return s;
}
function td(i, t, e, n) {
  let s = 1, r = i[0];
  for (; r !== void 0 && r[n] === void 0; )
    r = i[s++];
  if (r === void 0) return;
  let o = r[n];
  if (o !== void 0)
    if (Array.isArray(o))
      do
        o = r[n], o !== void 0 && (t.push(r.time), e.push.apply(e, o)), r = i[s++];
      while (r !== void 0);
    else if (o.toArray !== void 0)
      do
        o = r[n], o !== void 0 && (t.push(r.time), o.toArray(e, e.length)), r = i[s++];
      while (r !== void 0);
    else
      do
        o = r[n], o !== void 0 && (t.push(r.time), e.push(o)), r = i[s++];
      while (r !== void 0);
}
class tr {
  constructor(t, e, n, s) {
    this.parameterPositions = t, this._cachedIndex = 0, this.resultBuffer = s !== void 0 ? s : new e.constructor(n), this.sampleValues = e, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(t) {
    const e = this.parameterPositions;
    let n = this._cachedIndex, s = e[n], r = e[n - 1];
    n: {
      t: {
        let o;
        e: {
          i: if (!(t < s)) {
            for (let a = n + 2; ; ) {
              if (s === void 0) {
                if (t < r) break i;
                return n = e.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
              }
              if (n === a) break;
              if (r = s, s = e[++n], t < s)
                break t;
            }
            o = e.length;
            break e;
          }
          if (!(t >= r)) {
            const a = e[1];
            t < a && (n = 2, r = a);
            for (let c = n - 2; ; ) {
              if (r === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (n === c) break;
              if (s = r, r = e[--n - 1], t >= r)
                break t;
            }
            o = n, n = 0;
            break e;
          }
          break n;
        }
        for (; n < o; ) {
          const a = n + o >>> 1;
          t < e[a] ? o = a : n = a + 1;
        }
        if (s = e[n], r = e[n - 1], r === void 0)
          return this._cachedIndex = 0, this.copySampleValue_(0);
        if (s === void 0)
          return n = e.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
      }
      this._cachedIndex = n, this.intervalChanged_(n, r, s);
    }
    return this.interpolate_(n, r, t, s);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(t) {
    const e = this.resultBuffer, n = this.sampleValues, s = this.valueSize, r = t * s;
    for (let o = 0; o !== s; ++o)
      e[o] = n[r + o];
    return e;
  }
  // Template methods for derived classes:
  interpolate_() {
    throw new Error("call to abstract method");
  }
  intervalChanged_() {
  }
}
class Kv extends tr {
  constructor(t, e, n, s) {
    super(t, e, n, s), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: ul,
      endingEnd: ul
    };
  }
  intervalChanged_(t, e, n) {
    const s = this.parameterPositions;
    let r = t - 2, o = t + 1, a = s[r], c = s[o];
    if (a === void 0)
      switch (this.getSettings_().endingStart) {
        case dl:
          r = t, a = 2 * e - n;
          break;
        case fl:
          r = s.length - 2, a = e + s[r] - s[r + 1];
          break;
        default:
          r = t, a = n;
      }
    if (c === void 0)
      switch (this.getSettings_().endingEnd) {
        case dl:
          o = t, c = 2 * n - e;
          break;
        case fl:
          o = 1, c = n + s[1] - s[0];
          break;
        default:
          o = t - 1, c = e;
      }
    const l = (n - e) * 0.5, h = this.valueSize;
    this._weightPrev = l / (e - a), this._weightNext = l / (c - n), this._offsetPrev = r * h, this._offsetNext = o * h;
  }
  interpolate_(t, e, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, c = t * a, l = c - a, h = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, g = (n - e) / (s - e), _ = g * g, p = _ * g, m = -d * p + 2 * d * _ - d * g, S = (1 + d) * p + (-1.5 - 2 * d) * _ + (-0.5 + d) * g + 1, x = (-1 - f) * p + (1.5 + f) * _ + 0.5 * g, M = f * p - f * _;
    for (let P = 0; P !== a; ++P)
      r[P] = m * o[h + P] + S * o[l + P] + x * o[c + P] + M * o[u + P];
    return r;
  }
}
class Zv extends tr {
  constructor(t, e, n, s) {
    super(t, e, n, s);
  }
  interpolate_(t, e, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, c = t * a, l = c - a, h = (n - e) / (s - e), u = 1 - h;
    for (let d = 0; d !== a; ++d)
      r[d] = o[l + d] * u + o[c + d] * h;
    return r;
  }
}
class Jv extends tr {
  constructor(t, e, n, s) {
    super(t, e, n, s);
  }
  interpolate_(t) {
    return this.copySampleValue_(t - 1);
  }
}
class bn {
  constructor(t, e, n, s) {
    if (t === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (e === void 0 || e.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + t);
    this.name = t, this.times = Fr(e, this.TimeBufferType), this.values = Fr(n, this.ValueBufferType), this.setInterpolation(s || this.DefaultInterpolation);
  }
  // Serialization (in static context, because of constructor invocation
  // and automatic invocation of .toJSON):
  static toJSON(t) {
    const e = t.constructor;
    let n;
    if (e.toJSON !== this.toJSON)
      n = e.toJSON(t);
    else {
      n = {
        name: t.name,
        times: Fr(t.times, Array),
        values: Fr(t.values, Array)
      };
      const s = t.getInterpolation();
      s !== t.DefaultInterpolation && (n.interpolation = s);
    }
    return n.type = t.ValueTypeName, n;
  }
  InterpolantFactoryMethodDiscrete(t) {
    return new Jv(this.times, this.values, this.getValueSize(), t);
  }
  InterpolantFactoryMethodLinear(t) {
    return new Zv(this.times, this.values, this.getValueSize(), t);
  }
  InterpolantFactoryMethodSmooth(t) {
    return new Kv(this.times, this.values, this.getValueSize(), t);
  }
  setInterpolation(t) {
    let e;
    switch (t) {
      case Ws:
        e = this.InterpolantFactoryMethodDiscrete;
        break;
      case Xs:
        e = this.InterpolantFactoryMethodLinear;
        break;
      case Mo:
        e = this.InterpolantFactoryMethodSmooth;
        break;
    }
    if (e === void 0) {
      const n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0)
        if (t !== this.DefaultInterpolation)
          this.setInterpolation(this.DefaultInterpolation);
        else
          throw new Error(n);
      return console.warn("THREE.KeyframeTrack:", n), this;
    }
    return this.createInterpolant = e, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return Ws;
      case this.InterpolantFactoryMethodLinear:
        return Xs;
      case this.InterpolantFactoryMethodSmooth:
        return Mo;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  // move all keyframes either forwards or backwards in time
  shift(t) {
    if (t !== 0) {
      const e = this.times;
      for (let n = 0, s = e.length; n !== s; ++n)
        e[n] += t;
    }
    return this;
  }
  // scale all keyframe times by a factor (useful for frame <-> seconds conversions)
  scale(t) {
    if (t !== 1) {
      const e = this.times;
      for (let n = 0, s = e.length; n !== s; ++n)
        e[n] *= t;
    }
    return this;
  }
  // removes keyframes before and after animation without changing any values within the range [startTime, endTime].
  // IMPORTANT: We do not shift around keys to the start of the track time, because for interpolated keys this will change their values
  trim(t, e) {
    const n = this.times, s = n.length;
    let r = 0, o = s - 1;
    for (; r !== s && n[r] < t; )
      ++r;
    for (; o !== -1 && n[o] > e; )
      --o;
    if (++o, r !== 0 || o !== s) {
      r >= o && (o = Math.max(o, 1), r = o - 1);
      const a = this.getValueSize();
      this.times = n.slice(r, o), this.values = this.values.slice(r * a, o * a);
    }
    return this;
  }
  // ensure we do not get a GarbageInGarbageOut situation, make sure tracks are at least minimally viable
  validate() {
    let t = !0;
    const e = this.getValueSize();
    e - Math.floor(e) !== 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), t = !1);
    const n = this.times, s = this.values, r = n.length;
    r === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), t = !1);
    let o = null;
    for (let a = 0; a !== r; a++) {
      const c = n[a];
      if (typeof c == "number" && isNaN(c)) {
        console.error("THREE.KeyframeTrack: Time is not a valid number.", this, a, c), t = !1;
        break;
      }
      if (o !== null && o > c) {
        console.error("THREE.KeyframeTrack: Out of order keys.", this, a, c, o), t = !1;
        break;
      }
      o = c;
    }
    if (s !== void 0 && qv(s))
      for (let a = 0, c = s.length; a !== c; ++a) {
        const l = s[a];
        if (isNaN(l)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, a, l), t = !1;
          break;
        }
      }
    return t;
  }
  // removes equivalent sequential keys as common in morph target sequences
  // (0,0,0,0,1,1,1,0,0,0,0,0,0,0) --> (0,0,1,1,0,0)
  optimize() {
    const t = this.times.slice(), e = this.values.slice(), n = this.getValueSize(), s = this.getInterpolation() === Mo, r = t.length - 1;
    let o = 1;
    for (let a = 1; a < r; ++a) {
      let c = !1;
      const l = t[a], h = t[a + 1];
      if (l !== h && (a !== 1 || l !== t[0]))
        if (s)
          c = !0;
        else {
          const u = a * n, d = u - n, f = u + n;
          for (let g = 0; g !== n; ++g) {
            const _ = e[u + g];
            if (_ !== e[d + g] || _ !== e[f + g]) {
              c = !0;
              break;
            }
          }
        }
      if (c) {
        if (a !== o) {
          t[o] = t[a];
          const u = a * n, d = o * n;
          for (let f = 0; f !== n; ++f)
            e[d + f] = e[u + f];
        }
        ++o;
      }
    }
    if (r > 0) {
      t[o] = t[r];
      for (let a = r * n, c = o * n, l = 0; l !== n; ++l)
        e[c + l] = e[a + l];
      ++o;
    }
    return o !== t.length ? (this.times = t.slice(0, o), this.values = e.slice(0, o * n)) : (this.times = t, this.values = e), this;
  }
  clone() {
    const t = this.times.slice(), e = this.values.slice(), n = this.constructor, s = new n(this.name, t, e);
    return s.createInterpolant = this.createInterpolant, s;
  }
}
bn.prototype.TimeBufferType = Float32Array;
bn.prototype.ValueBufferType = Float32Array;
bn.prototype.DefaultInterpolation = Xs;
class ds extends bn {
  // No interpolation parameter because only InterpolateDiscrete is valid.
  constructor(t, e, n) {
    super(t, e, n);
  }
}
ds.prototype.ValueTypeName = "bool";
ds.prototype.ValueBufferType = Array;
ds.prototype.DefaultInterpolation = Ws;
ds.prototype.InterpolantFactoryMethodLinear = void 0;
ds.prototype.InterpolantFactoryMethodSmooth = void 0;
class ed extends bn {
}
ed.prototype.ValueTypeName = "color";
class os extends bn {
}
os.prototype.ValueTypeName = "number";
class Qv extends tr {
  constructor(t, e, n, s) {
    super(t, e, n, s);
  }
  interpolate_(t, e, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, c = (n - e) / (s - e);
    let l = t * a;
    for (let h = l + a; l !== h; l += 4)
      xn.slerpFlat(r, 0, o, l - a, o, l, c);
    return r;
  }
}
class as extends bn {
  InterpolantFactoryMethodLinear(t) {
    return new Qv(this.times, this.values, this.getValueSize(), t);
  }
}
as.prototype.ValueTypeName = "quaternion";
as.prototype.InterpolantFactoryMethodSmooth = void 0;
class fs extends bn {
  // No interpolation parameter because only InterpolateDiscrete is valid.
  constructor(t, e, n) {
    super(t, e, n);
  }
}
fs.prototype.ValueTypeName = "string";
fs.prototype.ValueBufferType = Array;
fs.prototype.DefaultInterpolation = Ws;
fs.prototype.InterpolantFactoryMethodLinear = void 0;
fs.prototype.InterpolantFactoryMethodSmooth = void 0;
class cs extends bn {
}
cs.prototype.ValueTypeName = "vector";
class tx {
  constructor(t = "", e = -1, n = [], s = Mf) {
    this.name = t, this.tracks = n, this.duration = e, this.blendMode = s, this.uuid = on(), this.duration < 0 && this.resetDuration();
  }
  static parse(t) {
    const e = [], n = t.tracks, s = 1 / (t.fps || 1);
    for (let o = 0, a = n.length; o !== a; ++o)
      e.push(nx(n[o]).scale(s));
    const r = new this(t.name, t.duration, e, t.blendMode);
    return r.uuid = t.uuid, r;
  }
  static toJSON(t) {
    const e = [], n = t.tracks, s = {
      name: t.name,
      duration: t.duration,
      tracks: e,
      uuid: t.uuid,
      blendMode: t.blendMode
    };
    for (let r = 0, o = n.length; r !== o; ++r)
      e.push(bn.toJSON(n[r]));
    return s;
  }
  static CreateFromMorphTargetSequence(t, e, n, s) {
    const r = e.length, o = [];
    for (let a = 0; a < r; a++) {
      let c = [], l = [];
      c.push(
        (a + r - 1) % r,
        a,
        (a + 1) % r
      ), l.push(0, 1, 0);
      const h = Yv(c);
      c = Ah(c, 1, h), l = Ah(l, 1, h), !s && c[0] === 0 && (c.push(r), l.push(l[0])), o.push(
        new os(
          ".morphTargetInfluences[" + e[a].name + "]",
          c,
          l
        ).scale(1 / n)
      );
    }
    return new this(t, -1, o);
  }
  static findByName(t, e) {
    let n = t;
    if (!Array.isArray(t)) {
      const s = t;
      n = s.geometry && s.geometry.animations || s.animations;
    }
    for (let s = 0; s < n.length; s++)
      if (n[s].name === e)
        return n[s];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(t, e, n) {
    const s = {}, r = /^([\w-]*?)([\d]+)$/;
    for (let a = 0, c = t.length; a < c; a++) {
      const l = t[a], h = l.name.match(r);
      if (h && h.length > 1) {
        const u = h[1];
        let d = s[u];
        d || (s[u] = d = []), d.push(l);
      }
    }
    const o = [];
    for (const a in s)
      o.push(this.CreateFromMorphTargetSequence(a, s[a], e, n));
    return o;
  }
  // parse the animation.hierarchy format
  static parseAnimation(t, e) {
    if (!t)
      return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
    const n = function(u, d, f, g, _) {
      if (f.length !== 0) {
        const p = [], m = [];
        td(f, p, m, g), p.length !== 0 && _.push(new u(d, p, m));
      }
    }, s = [], r = t.name || "default", o = t.fps || 30, a = t.blendMode;
    let c = t.length || -1;
    const l = t.hierarchy || [];
    for (let u = 0; u < l.length; u++) {
      const d = l[u].keys;
      if (!(!d || d.length === 0))
        if (d[0].morphTargets) {
          const f = {};
          let g;
          for (g = 0; g < d.length; g++)
            if (d[g].morphTargets)
              for (let _ = 0; _ < d[g].morphTargets.length; _++)
                f[d[g].morphTargets[_]] = -1;
          for (const _ in f) {
            const p = [], m = [];
            for (let S = 0; S !== d[g].morphTargets.length; ++S) {
              const x = d[g];
              p.push(x.time), m.push(x.morphTarget === _ ? 1 : 0);
            }
            s.push(new os(".morphTargetInfluence[" + _ + "]", p, m));
          }
          c = f.length * o;
        } else {
          const f = ".bones[" + e[u].name + "]";
          n(
            cs,
            f + ".position",
            d,
            "pos",
            s
          ), n(
            as,
            f + ".quaternion",
            d,
            "rot",
            s
          ), n(
            cs,
            f + ".scale",
            d,
            "scl",
            s
          );
        }
    }
    return s.length === 0 ? null : new this(r, c, s, a);
  }
  resetDuration() {
    const t = this.tracks;
    let e = 0;
    for (let n = 0, s = t.length; n !== s; ++n) {
      const r = this.tracks[n];
      e = Math.max(e, r.times[r.times.length - 1]);
    }
    return this.duration = e, this;
  }
  trim() {
    for (let t = 0; t < this.tracks.length; t++)
      this.tracks[t].trim(0, this.duration);
    return this;
  }
  validate() {
    let t = !0;
    for (let e = 0; e < this.tracks.length; e++)
      t = t && this.tracks[e].validate();
    return t;
  }
  optimize() {
    for (let t = 0; t < this.tracks.length; t++)
      this.tracks[t].optimize();
    return this;
  }
  clone() {
    const t = [];
    for (let e = 0; e < this.tracks.length; e++)
      t.push(this.tracks[e].clone());
    return new this.constructor(this.name, this.duration, t, this.blendMode);
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
}
function ex(i) {
  switch (i.toLowerCase()) {
    case "scalar":
    case "double":
    case "float":
    case "number":
    case "integer":
      return os;
    case "vector":
    case "vector2":
    case "vector3":
    case "vector4":
      return cs;
    case "color":
      return ed;
    case "quaternion":
      return as;
    case "bool":
    case "boolean":
      return ds;
    case "string":
      return fs;
  }
  throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + i);
}
function nx(i) {
  if (i.type === void 0)
    throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const t = ex(i.type);
  if (i.times === void 0) {
    const e = [], n = [];
    td(i.keys, e, n, "value"), i.times = e, i.values = n;
  }
  return t.parse !== void 0 ? t.parse(i) : new t(i.name, i.times, i.values, i.interpolation);
}
const Kn = {
  enabled: !1,
  files: {},
  add: function(i, t) {
    this.enabled !== !1 && (this.files[i] = t);
  },
  get: function(i) {
    if (this.enabled !== !1)
      return this.files[i];
  },
  remove: function(i) {
    delete this.files[i];
  },
  clear: function() {
    this.files = {};
  }
};
class ix {
  constructor(t, e, n) {
    const s = this;
    let r = !1, o = 0, a = 0, c;
    const l = [];
    this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = n, this.itemStart = function(h) {
      a++, r === !1 && s.onStart !== void 0 && s.onStart(h, o, a), r = !0;
    }, this.itemEnd = function(h) {
      o++, s.onProgress !== void 0 && s.onProgress(h, o, a), o === a && (r = !1, s.onLoad !== void 0 && s.onLoad());
    }, this.itemError = function(h) {
      s.onError !== void 0 && s.onError(h);
    }, this.resolveURL = function(h) {
      return c ? c(h) : h;
    }, this.setURLModifier = function(h) {
      return c = h, this;
    }, this.addHandler = function(h, u) {
      return l.push(h, u), this;
    }, this.removeHandler = function(h) {
      const u = l.indexOf(h);
      return u !== -1 && l.splice(u, 2), this;
    }, this.getHandler = function(h) {
      for (let u = 0, d = l.length; u < d; u += 2) {
        const f = l[u], g = l[u + 1];
        if (f.global && (f.lastIndex = 0), f.test(h))
          return g;
      }
      return null;
    };
  }
}
const sx = /* @__PURE__ */ new ix();
class ps {
  constructor(t) {
    this.manager = t !== void 0 ? t : sx, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(t, e) {
    const n = this;
    return new Promise(function(s, r) {
      n.load(t, s, e, r);
    });
  }
  parse() {
  }
  setCrossOrigin(t) {
    return this.crossOrigin = t, this;
  }
  setWithCredentials(t) {
    return this.withCredentials = t, this;
  }
  setPath(t) {
    return this.path = t, this;
  }
  setResourcePath(t) {
    return this.resourcePath = t, this;
  }
  setRequestHeader(t) {
    return this.requestHeader = t, this;
  }
}
ps.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const Ln = {};
class rx extends Error {
  constructor(t, e) {
    super(t), this.response = e;
  }
}
class nd extends ps {
  constructor(t) {
    super(t);
  }
  load(t, e, n, s) {
    t === void 0 && (t = ""), this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const r = Kn.get(t);
    if (r !== void 0)
      return this.manager.itemStart(t), setTimeout(() => {
        e && e(r), this.manager.itemEnd(t);
      }, 0), r;
    if (Ln[t] !== void 0) {
      Ln[t].push({
        onLoad: e,
        onProgress: n,
        onError: s
      });
      return;
    }
    Ln[t] = [], Ln[t].push({
      onLoad: e,
      onProgress: n,
      onError: s
    });
    const o = new Request(t, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin"
      // An abort controller could be added within a future PR
    }), a = this.mimeType, c = this.responseType;
    fetch(o).then((l) => {
      if (l.status === 200 || l.status === 0) {
        if (l.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || l.body === void 0 || l.body.getReader === void 0)
          return l;
        const h = Ln[t], u = l.body.getReader(), d = l.headers.get("X-File-Size") || l.headers.get("Content-Length"), f = d ? parseInt(d) : 0, g = f !== 0;
        let _ = 0;
        const p = new ReadableStream({
          start(m) {
            S();
            function S() {
              u.read().then(({ done: x, value: M }) => {
                if (x)
                  m.close();
                else {
                  _ += M.byteLength;
                  const P = new ProgressEvent("progress", { lengthComputable: g, loaded: _, total: f });
                  for (let R = 0, A = h.length; R < A; R++) {
                    const L = h[R];
                    L.onProgress && L.onProgress(P);
                  }
                  m.enqueue(M), S();
                }
              }, (x) => {
                m.error(x);
              });
            }
          }
        });
        return new Response(p);
      } else
        throw new rx(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`, l);
    }).then((l) => {
      switch (c) {
        case "arraybuffer":
          return l.arrayBuffer();
        case "blob":
          return l.blob();
        case "document":
          return l.text().then((h) => new DOMParser().parseFromString(h, a));
        case "json":
          return l.json();
        default:
          if (a === void 0)
            return l.text();
          {
            const u = /charset="?([^;"\s]*)"?/i.exec(a), d = u && u[1] ? u[1].toLowerCase() : void 0, f = new TextDecoder(d);
            return l.arrayBuffer().then((g) => f.decode(g));
          }
      }
    }).then((l) => {
      Kn.add(t, l);
      const h = Ln[t];
      delete Ln[t];
      for (let u = 0, d = h.length; u < d; u++) {
        const f = h[u];
        f.onLoad && f.onLoad(l);
      }
    }).catch((l) => {
      const h = Ln[t];
      if (h === void 0)
        throw this.manager.itemError(t), l;
      delete Ln[t];
      for (let u = 0, d = h.length; u < d; u++) {
        const f = h[u];
        f.onError && f.onError(l);
      }
      this.manager.itemError(t);
    }).finally(() => {
      this.manager.itemEnd(t);
    }), this.manager.itemStart(t);
  }
  setResponseType(t) {
    return this.responseType = t, this;
  }
  setMimeType(t) {
    return this.mimeType = t, this;
  }
}
class ox extends ps {
  constructor(t) {
    super(t);
  }
  load(t, e, n, s) {
    this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const r = this, o = Kn.get(t);
    if (o !== void 0)
      return r.manager.itemStart(t), setTimeout(function() {
        e && e(o), r.manager.itemEnd(t);
      }, 0), o;
    const a = $s("img");
    function c() {
      h(), Kn.add(t, this), e && e(this), r.manager.itemEnd(t);
    }
    function l(u) {
      h(), s && s(u), r.manager.itemError(t), r.manager.itemEnd(t);
    }
    function h() {
      a.removeEventListener("load", c, !1), a.removeEventListener("error", l, !1);
    }
    return a.addEventListener("load", c, !1), a.addEventListener("error", l, !1), t.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (a.crossOrigin = this.crossOrigin), r.manager.itemStart(t), a.src = t, a;
  }
}
class ax extends ps {
  constructor(t) {
    super(t);
  }
  load(t, e, n, s) {
    const r = new be(), o = new ox(this.manager);
    return o.setCrossOrigin(this.crossOrigin), o.setPath(this.path), o.load(t, function(a) {
      r.image = a, r.needsUpdate = !0, e !== void 0 && e(r);
    }, n, s), r;
  }
}
class er extends de {
  constructor(t, e = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Tt(t), this.intensity = e;
  }
  dispose() {
  }
  copy(t, e) {
    return super.copy(t, e), this.color.copy(t.color), this.intensity = t.intensity, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.color = this.color.getHex(), e.object.intensity = this.intensity, this.groundColor !== void 0 && (e.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (e.object.distance = this.distance), this.angle !== void 0 && (e.object.angle = this.angle), this.decay !== void 0 && (e.object.decay = this.decay), this.penumbra !== void 0 && (e.object.penumbra = this.penumbra), this.shadow !== void 0 && (e.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (e.object.target = this.target.uuid), e;
  }
}
class cx extends er {
  constructor(t, e, n) {
    super(t, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(de.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Tt(e);
  }
  copy(t, e) {
    return super.copy(t, e), this.groundColor.copy(t.groundColor), this;
  }
}
const ia = /* @__PURE__ */ new Dt(), wh = /* @__PURE__ */ new w(), Rh = /* @__PURE__ */ new w();
class Oc {
  constructor(t) {
    this.camera = t, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new tt(512, 512), this.map = null, this.mapPass = null, this.matrix = new Dt(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Ec(), this._frameExtents = new tt(1, 1), this._viewportCount = 1, this._viewports = [
      new Zt(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(t) {
    const e = this.camera, n = this.matrix;
    wh.setFromMatrixPosition(t.matrixWorld), e.position.copy(wh), Rh.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(Rh), e.updateMatrixWorld(), ia.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(ia), n.set(
      0.5,
      0,
      0,
      0.5,
      0,
      0.5,
      0,
      0.5,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), n.multiply(ia);
  }
  getViewport(t) {
    return this._viewports[t];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(t) {
    return this.camera = t.camera.clone(), this.intensity = t.intensity, this.bias = t.bias, this.radius = t.radius, this.mapSize.copy(t.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const t = {};
    return this.intensity !== 1 && (t.intensity = this.intensity), this.bias !== 0 && (t.bias = this.bias), this.normalBias !== 0 && (t.normalBias = this.normalBias), this.radius !== 1 && (t.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (t.mapSize = this.mapSize.toArray()), t.camera = this.camera.toJSON(!1).object, delete t.camera.matrix, t;
  }
}
class lx extends Oc {
  constructor() {
    super(new Be(50, 1, 0.5, 500)), this.isSpotLightShadow = !0, this.focus = 1;
  }
  updateMatrices(t) {
    const e = this.camera, n = ss * 2 * t.angle * this.focus, s = this.mapSize.width / this.mapSize.height, r = t.distance || e.far;
    (n !== e.fov || s !== e.aspect || r !== e.far) && (e.fov = n, e.aspect = s, e.far = r, e.updateProjectionMatrix()), super.updateMatrices(t);
  }
  copy(t) {
    return super.copy(t), this.focus = t.focus, this;
  }
}
class hx extends er {
  constructor(t, e, n = 0, s = Math.PI / 3, r = 0, o = 2) {
    super(t, e), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(de.DEFAULT_UP), this.updateMatrix(), this.target = new de(), this.distance = n, this.angle = s, this.penumbra = r, this.decay = o, this.map = null, this.shadow = new lx();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(t) {
    this.intensity = t / Math.PI;
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t, e) {
    return super.copy(t, e), this.distance = t.distance, this.angle = t.angle, this.penumbra = t.penumbra, this.decay = t.decay, this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
  }
}
const Ch = /* @__PURE__ */ new Dt(), ws = /* @__PURE__ */ new w(), sa = /* @__PURE__ */ new w();
class ux extends Oc {
  constructor() {
    super(new Be(90, 1, 0.5, 500)), this.isPointLightShadow = !0, this._frameExtents = new tt(4, 2), this._viewportCount = 6, this._viewports = [
      // These viewports map a cube-map onto a 2D texture with the
      // following orientation:
      //
      //  xzXZ
      //   y Y
      //
      // X - Positive x direction
      // x - Negative x direction
      // Y - Positive y direction
      // y - Negative y direction
      // Z - Positive z direction
      // z - Negative z direction
      // positive X
      new Zt(2, 1, 1, 1),
      // negative X
      new Zt(0, 1, 1, 1),
      // positive Z
      new Zt(3, 1, 1, 1),
      // negative Z
      new Zt(1, 1, 1, 1),
      // positive Y
      new Zt(3, 0, 1, 1),
      // negative Y
      new Zt(1, 0, 1, 1)
    ], this._cubeDirections = [
      new w(1, 0, 0),
      new w(-1, 0, 0),
      new w(0, 0, 1),
      new w(0, 0, -1),
      new w(0, 1, 0),
      new w(0, -1, 0)
    ], this._cubeUps = [
      new w(0, 1, 0),
      new w(0, 1, 0),
      new w(0, 1, 0),
      new w(0, 1, 0),
      new w(0, 0, 1),
      new w(0, 0, -1)
    ];
  }
  updateMatrices(t, e = 0) {
    const n = this.camera, s = this.matrix, r = t.distance || n.far;
    r !== n.far && (n.far = r, n.updateProjectionMatrix()), ws.setFromMatrixPosition(t.matrixWorld), n.position.copy(ws), sa.copy(n.position), sa.add(this._cubeDirections[e]), n.up.copy(this._cubeUps[e]), n.lookAt(sa), n.updateMatrixWorld(), s.makeTranslation(-ws.x, -ws.y, -ws.z), Ch.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Ch);
  }
}
class id extends er {
  constructor(t, e, n = 0, s = 2) {
    super(t, e), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = s, this.shadow = new ux();
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(t) {
    this.intensity = t / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t, e) {
    return super.copy(t, e), this.distance = t.distance, this.decay = t.decay, this.shadow = t.shadow.clone(), this;
  }
}
class dx extends Oc {
  constructor() {
    super(new bc(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class Fc extends er {
  constructor(t, e) {
    super(t, e), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(de.DEFAULT_UP), this.updateMatrix(), this.target = new de(), this.shadow = new dx();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
  }
}
class sd extends er {
  constructor(t, e) {
    super(t, e), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
class zs {
  static decodeText(t) {
    if (console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."), typeof TextDecoder < "u")
      return new TextDecoder().decode(t);
    let e = "";
    for (let n = 0, s = t.length; n < s; n++)
      e += String.fromCharCode(t[n]);
    try {
      return decodeURIComponent(escape(e));
    } catch {
      return e;
    }
  }
  static extractUrlBase(t) {
    const e = t.lastIndexOf("/");
    return e === -1 ? "./" : t.slice(0, e + 1);
  }
  static resolveURL(t, e) {
    return typeof t != "string" || t === "" ? "" : (/^https?:\/\//i.test(e) && /^\//.test(t) && (e = e.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(t) || /^data:.*,.*$/i.test(t) || /^blob:.*$/i.test(t) ? t : e + t);
  }
}
class fx extends ps {
  constructor(t) {
    super(t), this.isImageBitmapLoader = !0, typeof createImageBitmap > "u" && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch > "u" && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.options = { premultiplyAlpha: "none" };
  }
  setOptions(t) {
    return this.options = t, this;
  }
  load(t, e, n, s) {
    t === void 0 && (t = ""), this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const r = this, o = Kn.get(t);
    if (o !== void 0) {
      if (r.manager.itemStart(t), o.then) {
        o.then((l) => {
          e && e(l), r.manager.itemEnd(t);
        }).catch((l) => {
          s && s(l);
        });
        return;
      }
      return setTimeout(function() {
        e && e(o), r.manager.itemEnd(t);
      }, 0), o;
    }
    const a = {};
    a.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include", a.headers = this.requestHeader;
    const c = fetch(t, a).then(function(l) {
      return l.blob();
    }).then(function(l) {
      return createImageBitmap(l, Object.assign(r.options, { colorSpaceConversion: "none" }));
    }).then(function(l) {
      return Kn.add(t, l), e && e(l), r.manager.itemEnd(t), l;
    }).catch(function(l) {
      s && s(l), Kn.remove(t), r.manager.itemError(t), r.manager.itemEnd(t);
    });
    Kn.add(t, c), r.manager.itemStart(t);
  }
}
class px {
  constructor(t = !0) {
    this.autoStart = t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1;
  }
  start() {
    this.startTime = Ph(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
  }
  stop() {
    this.getElapsedTime(), this.running = !1, this.autoStart = !1;
  }
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let t = 0;
    if (this.autoStart && !this.running)
      return this.start(), 0;
    if (this.running) {
      const e = Ph();
      t = (e - this.oldTime) / 1e3, this.oldTime = e, this.elapsedTime += t;
    }
    return t;
  }
}
function Ph() {
  return performance.now();
}
const Bc = "\\[\\]\\.:\\/", mx = new RegExp("[" + Bc + "]", "g"), zc = "[^" + Bc + "]", gx = "[^" + Bc.replace("\\.", "") + "]", _x = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", zc), vx = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", gx), xx = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", zc), yx = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", zc), Mx = new RegExp(
  "^" + _x + vx + xx + yx + "$"
), Sx = ["material", "materials", "bones", "map"];
class Ex {
  constructor(t, e, n) {
    const s = n || se.parseTrackName(e);
    this._targetGroup = t, this._bindings = t.subscribe_(e, s);
  }
  getValue(t, e) {
    this.bind();
    const n = this._targetGroup.nCachedObjects_, s = this._bindings[n];
    s !== void 0 && s.getValue(t, e);
  }
  setValue(t, e) {
    const n = this._bindings;
    for (let s = this._targetGroup.nCachedObjects_, r = n.length; s !== r; ++s)
      n[s].setValue(t, e);
  }
  bind() {
    const t = this._bindings;
    for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e)
      t[e].bind();
  }
  unbind() {
    const t = this._bindings;
    for (let e = this._targetGroup.nCachedObjects_, n = t.length; e !== n; ++e)
      t[e].unbind();
  }
}
class se {
  constructor(t, e, n) {
    this.path = e, this.parsedPath = n || se.parseTrackName(e), this.node = se.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(t, e, n) {
    return t && t.isAnimationObjectGroup ? new se.Composite(t, e, n) : new se(t, e, n);
  }
  /**
   * Replaces spaces with underscores and removes unsupported characters from
   * node names, to ensure compatibility with parseTrackName().
   *
   * @param {string} name Node name to be sanitized.
   * @return {string}
   */
  static sanitizeNodeName(t) {
    return t.replace(/\s/g, "_").replace(mx, "");
  }
  static parseTrackName(t) {
    const e = Mx.exec(t);
    if (e === null)
      throw new Error("PropertyBinding: Cannot parse trackName: " + t);
    const n = {
      // directoryName: matches[ 1 ], // (tschw) currently unused
      nodeName: e[2],
      objectName: e[3],
      objectIndex: e[4],
      propertyName: e[5],
      // required
      propertyIndex: e[6]
    }, s = n.nodeName && n.nodeName.lastIndexOf(".");
    if (s !== void 0 && s !== -1) {
      const r = n.nodeName.substring(s + 1);
      Sx.indexOf(r) !== -1 && (n.nodeName = n.nodeName.substring(0, s), n.objectName = r);
    }
    if (n.propertyName === null || n.propertyName.length === 0)
      throw new Error("PropertyBinding: can not parse propertyName from trackName: " + t);
    return n;
  }
  static findNode(t, e) {
    if (e === void 0 || e === "" || e === "." || e === -1 || e === t.name || e === t.uuid)
      return t;
    if (t.skeleton) {
      const n = t.skeleton.getBoneByName(e);
      if (n !== void 0)
        return n;
    }
    if (t.children) {
      const n = function(r) {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          if (a.name === e || a.uuid === e)
            return a;
          const c = n(a.children);
          if (c) return c;
        }
        return null;
      }, s = n(t.children);
      if (s)
        return s;
    }
    return null;
  }
  // these are used to "bind" a nonexistent property
  _getValue_unavailable() {
  }
  _setValue_unavailable() {
  }
  // Getters
  _getValue_direct(t, e) {
    t[e] = this.targetObject[this.propertyName];
  }
  _getValue_array(t, e) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      t[e++] = n[s];
  }
  _getValue_arrayElement(t, e) {
    t[e] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(t, e) {
    this.resolvedProperty.toArray(t, e);
  }
  // Direct
  _setValue_direct(t, e) {
    this.targetObject[this.propertyName] = t[e];
  }
  _setValue_direct_setNeedsUpdate(t, e) {
    this.targetObject[this.propertyName] = t[e], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(t, e) {
    this.targetObject[this.propertyName] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  // EntireArray
  _setValue_array(t, e) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      n[s] = t[e++];
  }
  _setValue_array_setNeedsUpdate(t, e) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      n[s] = t[e++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(t, e) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      n[s] = t[e++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  // ArrayElement
  _setValue_arrayElement(t, e) {
    this.resolvedProperty[this.propertyIndex] = t[e];
  }
  _setValue_arrayElement_setNeedsUpdate(t, e) {
    this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(t, e) {
    this.resolvedProperty[this.propertyIndex] = t[e], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  // HasToFromArray
  _setValue_fromArray(t, e) {
    this.resolvedProperty.fromArray(t, e);
  }
  _setValue_fromArray_setNeedsUpdate(t, e) {
    this.resolvedProperty.fromArray(t, e), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(t, e) {
    this.resolvedProperty.fromArray(t, e), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(t, e) {
    this.bind(), this.getValue(t, e);
  }
  _setValue_unbound(t, e) {
    this.bind(), this.setValue(t, e);
  }
  // create getter / setter pair for a property in the scene graph
  bind() {
    let t = this.node;
    const e = this.parsedPath, n = e.objectName, s = e.propertyName;
    let r = e.propertyIndex;
    if (t || (t = se.findNode(this.rootNode, e.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
      console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (n) {
      let l = e.objectIndex;
      switch (n) {
        case "materials":
          if (!t.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.materials) {
            console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          t = t.material.materials;
          break;
        case "bones":
          if (!t.skeleton) {
            console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          t = t.skeleton.bones;
          for (let h = 0; h < t.length; h++)
            if (t[h].name === l) {
              l = h;
              break;
            }
          break;
        case "map":
          if ("map" in t) {
            t = t.map;
            break;
          }
          if (!t.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!t.material.map) {
            console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          t = t.material.map;
          break;
        default:
          if (t[n] === void 0) {
            console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          t = t[n];
      }
      if (l !== void 0) {
        if (t[l] === void 0) {
          console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
          return;
        }
        t = t[l];
      }
    }
    const o = t[s];
    if (o === void 0) {
      const l = e.nodeName;
      console.error("THREE.PropertyBinding: Trying to update property for track: " + l + "." + s + " but it wasn't found.", t);
      return;
    }
    let a = this.Versioning.None;
    this.targetObject = t, t.needsUpdate !== void 0 ? a = this.Versioning.NeedsUpdate : t.matrixWorldNeedsUpdate !== void 0 && (a = this.Versioning.MatrixWorldNeedsUpdate);
    let c = this.BindingType.Direct;
    if (r !== void 0) {
      if (s === "morphTargetInfluences") {
        if (!t.geometry) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!t.geometry.morphAttributes) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        t.morphTargetDictionary[r] !== void 0 && (r = t.morphTargetDictionary[r]);
      }
      c = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = r;
    } else o.fromArray !== void 0 && o.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (c = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = s;
    this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][a];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
}
se.Composite = Ex;
se.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
se.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
se.prototype.GetterByBindingType = [
  se.prototype._getValue_direct,
  se.prototype._getValue_array,
  se.prototype._getValue_arrayElement,
  se.prototype._getValue_toArray
];
se.prototype.SetterByBindingTypeAndVersioning = [
  [
    // Direct
    se.prototype._setValue_direct,
    se.prototype._setValue_direct_setNeedsUpdate,
    se.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    // EntireArray
    se.prototype._setValue_array,
    se.prototype._setValue_array_setNeedsUpdate,
    se.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    // ArrayElement
    se.prototype._setValue_arrayElement,
    se.prototype._setValue_arrayElement_setNeedsUpdate,
    se.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    // HasToFromArray
    se.prototype._setValue_fromArray,
    se.prototype._setValue_fromArray_setNeedsUpdate,
    se.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
const Lh = /* @__PURE__ */ new Dt();
class bx {
  constructor(t, e, n = 0, s = 1 / 0) {
    this.ray = new ls(t, e), this.near = n, this.far = s, this.camera = null, this.layers = new Sc(), this.params = {
      Mesh: {},
      Line: { threshold: 1 },
      LOD: {},
      Points: { threshold: 1 },
      Sprite: {}
    };
  }
  set(t, e) {
    this.ray.set(t, e);
  }
  setFromCamera(t, e) {
    e.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(t.x, t.y, 0.5).unproject(e).sub(this.ray.origin).normalize(), this.camera = e) : e.isOrthographicCamera ? (this.ray.origin.set(t.x, t.y, (e.near + e.far) / (e.near - e.far)).unproject(e), this.ray.direction.set(0, 0, -1).transformDirection(e.matrixWorld), this.camera = e) : console.error("THREE.Raycaster: Unsupported camera type: " + e.type);
  }
  setFromXRController(t) {
    return Lh.identity().extractRotation(t.matrixWorld), this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Lh), this;
  }
  intersectObject(t, e = !0, n = []) {
    return tc(t, this, n, e), n.sort(Ih), n;
  }
  intersectObjects(t, e = !0, n = []) {
    for (let s = 0, r = t.length; s < r; s++)
      tc(t[s], this, n, e);
    return n.sort(Ih), n;
  }
}
function Ih(i, t) {
  return i.distance - t.distance;
}
function tc(i, t, e, n) {
  let s = !0;
  if (i.layers.test(t.layers) && i.raycast(t, e) === !1 && (s = !1), s === !0 && n === !0) {
    const r = i.children;
    for (let o = 0, a = r.length; o < a; o++)
      tc(r[o], t, e, !0);
  }
}
class Dh {
  constructor(t = 1, e = 0, n = 0) {
    return this.radius = t, this.phi = e, this.theta = n, this;
  }
  set(t, e, n) {
    return this.radius = t, this.phi = e, this.theta = n, this;
  }
  copy(t) {
    return this.radius = t.radius, this.phi = t.phi, this.theta = t.theta, this;
  }
  // restrict phi to be between EPS and PI-EPS
  makeSafe() {
    return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this;
  }
  setFromVector3(t) {
    return this.setFromCartesianCoords(t.x, t.y, t.z);
  }
  setFromCartesianCoords(t, e, n) {
    return this.radius = Math.sqrt(t * t + e * e + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t, n), this.phi = Math.acos(Ee(e / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Tx extends Rc {
  constructor(t = 10, e = 10, n = 4473924, s = 8947848) {
    n = new Tt(n), s = new Tt(s);
    const r = e / 2, o = t / e, a = t / 2, c = [], l = [];
    for (let d = 0, f = 0, g = -a; d <= e; d++, g += o) {
      c.push(-a, 0, g, a, 0, g), c.push(g, 0, -a, g, 0, a);
      const _ = d === r ? n : s;
      _.toArray(l, f), f += 3, _.toArray(l, f), f += 3, _.toArray(l, f), f += 3, _.toArray(l, f), f += 3;
    }
    const h = new Pe();
    h.setAttribute("position", new ce(c, 3)), h.setAttribute("color", new ce(l, 3));
    const u = new fo({ vertexColors: !0, toneMapped: !1 });
    super(h, u), this.type = "GridHelper";
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
const Br = /* @__PURE__ */ new je();
class Ax extends Rc {
  constructor(t, e = 16776960) {
    const n = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]), s = new Float32Array(8 * 3), r = new Pe();
    r.setIndex(new Ie(n, 1)), r.setAttribute("position", new Ie(s, 3)), super(r, new fo({ color: e, toneMapped: !1 })), this.object = t, this.type = "BoxHelper", this.matrixAutoUpdate = !1, this.update();
  }
  update(t) {
    if (t !== void 0 && console.warn("THREE.BoxHelper: .update() has no longer arguments."), this.object !== void 0 && Br.setFromObject(this.object), Br.isEmpty()) return;
    const e = Br.min, n = Br.max, s = this.geometry.attributes.position, r = s.array;
    r[0] = n.x, r[1] = n.y, r[2] = n.z, r[3] = e.x, r[4] = n.y, r[5] = n.z, r[6] = e.x, r[7] = e.y, r[8] = n.z, r[9] = n.x, r[10] = e.y, r[11] = n.z, r[12] = n.x, r[13] = n.y, r[14] = e.z, r[15] = e.x, r[16] = n.y, r[17] = e.z, r[18] = e.x, r[19] = e.y, r[20] = e.z, r[21] = n.x, r[22] = e.y, r[23] = e.z, s.needsUpdate = !0, this.geometry.computeBoundingSphere();
  }
  setFromObject(t) {
    return this.object = t, this.update(), this;
  }
  copy(t, e) {
    return super.copy(t, e), this.object = t.object, this;
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class wx extends xi {
  constructor(t, e = null) {
    super(), this.object = t, this.domElement = e, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null }, this.touches = { ONE: null, TWO: null };
  }
  connect() {
  }
  disconnect() {
  }
  dispose() {
  }
  update() {
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: dc
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = dc);
const Nh = { type: "change" }, kc = { type: "start" }, rd = { type: "end" }, zr = new ls(), Uh = new Nn(), Rx = Math.cos(70 * ji.DEG2RAD), Se = new w(), Xe = 2 * Math.PI, oe = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, ra = 1e-6;
class Cx extends wx {
  constructor(t, e = null) {
    super(t, e), this.state = oe.NONE, this.enabled = !0, this.target = new w(), this.cursor = new w(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: un.ROTATE, MIDDLE: un.DOLLY, RIGHT: un.PAN }, this.touches = { ONE: dn.ROTATE, TWO: dn.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new w(), this._lastQuaternion = new xn(), this._lastTargetPosition = new w(), this._quat = new xn().setFromUnitVectors(t.up, new w(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Dh(), this._sphericalDelta = new Dh(), this._scale = 1, this._panOffset = new w(), this._rotateStart = new tt(), this._rotateEnd = new tt(), this._rotateDelta = new tt(), this._panStart = new tt(), this._panEnd = new tt(), this._panDelta = new tt(), this._dollyStart = new tt(), this._dollyEnd = new tt(), this._dollyDelta = new tt(), this._dollyDirection = new w(), this._mouse = new tt(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Lx.bind(this), this._onPointerDown = Px.bind(this), this._onPointerUp = Ix.bind(this), this._onContextMenu = zx.bind(this), this._onMouseWheel = Ux.bind(this), this._onKeyDown = Ox.bind(this), this._onTouchStart = Fx.bind(this), this._onTouchMove = Bx.bind(this), this._onMouseDown = Dx.bind(this), this._onMouseMove = Nx.bind(this), this._interceptControlDown = kx.bind(this), this._interceptControlUp = Hx.bind(this), this.domElement !== null && this.connect(), this.update();
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointercancel", this._onPointerUp), this.domElement.addEventListener("contextmenu", this._onContextMenu), this.domElement.addEventListener("wheel", this._onMouseWheel, { passive: !1 }), this.domElement.getRootNode().addEventListener("keydown", this._interceptControlDown, { passive: !0, capture: !0 }), this.domElement.style.touchAction = "none";
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.domElement.removeEventListener("pointercancel", this._onPointerUp), this.domElement.removeEventListener("wheel", this._onMouseWheel), this.domElement.removeEventListener("contextmenu", this._onContextMenu), this.stopListenToKeyEvents(), this.domElement.getRootNode().removeEventListener("keydown", this._interceptControlDown, { capture: !0 }), this.domElement.style.touchAction = "auto";
  }
  dispose() {
    this.disconnect();
  }
  getPolarAngle() {
    return this._spherical.phi;
  }
  getAzimuthalAngle() {
    return this._spherical.theta;
  }
  getDistance() {
    return this.object.position.distanceTo(this.target);
  }
  listenToKeyEvents(t) {
    t.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = t;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Nh), this.update(), this.state = oe.NONE;
  }
  update(t = null) {
    const e = this.object.position;
    Se.copy(e).sub(this.target), Se.applyQuaternion(this._quat), this._spherical.setFromVector3(Se), this.autoRotate && this.state === oe.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(n) && isFinite(s) && (n < -Math.PI ? n += Xe : n > Math.PI && (n -= Xe), s < -Math.PI ? s += Xe : s > Math.PI && (s -= Xe), n <= s ? this._spherical.theta = Math.max(n, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + s) / 2 ? Math.max(n, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const o = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = o != this._spherical.radius;
    }
    if (Se.setFromSpherical(this._spherical), Se.applyQuaternion(this._quatInverse), e.copy(this.target).add(Se), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const a = Se.length();
        o = this._clampDistance(a * this._scale);
        const c = a - o;
        this.object.position.addScaledVector(this._dollyDirection, c), this.object.updateMatrixWorld(), r = !!c;
      } else if (this.object.isOrthographicCamera) {
        const a = new w(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const c = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = c !== this.object.zoom;
        const l = new w(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(a), this.object.updateMatrixWorld(), o = Se.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      o !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position) : (zr.origin.copy(this.object.position), zr.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(zr.direction)) < Rx ? this.object.lookAt(this.target) : (Uh.setFromNormalAndCoplanarPoint(this.object.up, this.target), zr.intersectPlane(Uh, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), o !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > ra || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > ra || this._lastTargetPosition.distanceToSquared(this.target) > ra ? (this.dispatchEvent(Nh), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(t) {
    return t !== null ? Xe / 60 * this.autoRotateSpeed * t : Xe / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(t) {
    const e = Math.abs(t * 0.01);
    return Math.pow(0.95, this.zoomSpeed * e);
  }
  _rotateLeft(t) {
    this._sphericalDelta.theta -= t;
  }
  _rotateUp(t) {
    this._sphericalDelta.phi -= t;
  }
  _panLeft(t, e) {
    Se.setFromMatrixColumn(e, 0), Se.multiplyScalar(-t), this._panOffset.add(Se);
  }
  _panUp(t, e) {
    this.screenSpacePanning === !0 ? Se.setFromMatrixColumn(e, 1) : (Se.setFromMatrixColumn(e, 0), Se.crossVectors(this.object.up, Se)), Se.multiplyScalar(t), this._panOffset.add(Se);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(t, e) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      Se.copy(s).sub(this.target);
      let r = Se.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * t * r / n.clientHeight, this.object.matrix), this._panUp(2 * e * r / n.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(t * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(e * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(t) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= t : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(t, e) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const n = this.domElement.getBoundingClientRect(), s = t - n.left, r = e - n.top, o = n.width, a = n.height;
    this._mouse.x = s / o * 2 - 1, this._mouse.y = -(r / a) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(t) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, t));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(t) {
    this._rotateStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownDolly(t) {
    this._updateZoomParameters(t.clientX, t.clientX), this._dollyStart.set(t.clientX, t.clientY);
  }
  _handleMouseDownPan(t) {
    this._panStart.set(t.clientX, t.clientY);
  }
  _handleMouseMoveRotate(t) {
    this._rotateEnd.set(t.clientX, t.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(Xe * this._rotateDelta.x / e.clientHeight), this._rotateUp(Xe * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(t) {
    this._dollyEnd.set(t.clientX, t.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(t) {
    this._panEnd.set(t.clientX, t.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(t) {
    this._updateZoomParameters(t.clientX, t.clientY), t.deltaY < 0 ? this._dollyIn(this._getZoomScale(t.deltaY)) : t.deltaY > 0 && this._dollyOut(this._getZoomScale(t.deltaY)), this.update();
  }
  _handleKeyDown(t) {
    let e = !1;
    switch (t.code) {
      case this.keys.UP:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateUp(Xe * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), e = !0;
        break;
      case this.keys.BOTTOM:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateUp(-Xe * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), e = !0;
        break;
      case this.keys.LEFT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateLeft(Xe * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), e = !0;
        break;
      case this.keys.RIGHT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateLeft(-Xe * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), e = !0;
        break;
    }
    e && (t.preventDefault(), this.update());
  }
  _handleTouchStartRotate(t) {
    if (this._pointers.length === 1)
      this._rotateStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._rotateStart.set(n, s);
    }
  }
  _handleTouchStartPan(t) {
    if (this._pointers.length === 1)
      this._panStart.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._panStart.set(n, s);
    }
  }
  _handleTouchStartDolly(t) {
    const e = this._getSecondPointerPosition(t), n = t.pageX - e.x, s = t.pageY - e.y, r = Math.sqrt(n * n + s * s);
    this._dollyStart.set(0, r);
  }
  _handleTouchStartDollyPan(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enablePan && this._handleTouchStartPan(t);
  }
  _handleTouchStartDollyRotate(t) {
    this.enableZoom && this._handleTouchStartDolly(t), this.enableRotate && this._handleTouchStartRotate(t);
  }
  _handleTouchMoveRotate(t) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(t.pageX, t.pageY);
    else {
      const n = this._getSecondPointerPosition(t), s = 0.5 * (t.pageX + n.x), r = 0.5 * (t.pageY + n.y);
      this._rotateEnd.set(s, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const e = this.domElement;
    this._rotateLeft(Xe * this._rotateDelta.x / e.clientHeight), this._rotateUp(Xe * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(t) {
    if (this._pointers.length === 1)
      this._panEnd.set(t.pageX, t.pageY);
    else {
      const e = this._getSecondPointerPosition(t), n = 0.5 * (t.pageX + e.x), s = 0.5 * (t.pageY + e.y);
      this._panEnd.set(n, s);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(t) {
    const e = this._getSecondPointerPosition(t), n = t.pageX - e.x, s = t.pageY - e.y, r = Math.sqrt(n * n + s * s);
    this._dollyEnd.set(0, r), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const o = (t.pageX + e.x) * 0.5, a = (t.pageY + e.y) * 0.5;
    this._updateZoomParameters(o, a);
  }
  _handleTouchMoveDollyPan(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enablePan && this._handleTouchMovePan(t);
  }
  _handleTouchMoveDollyRotate(t) {
    this.enableZoom && this._handleTouchMoveDolly(t), this.enableRotate && this._handleTouchMoveRotate(t);
  }
  // pointers
  _addPointer(t) {
    this._pointers.push(t.pointerId);
  }
  _removePointer(t) {
    delete this._pointerPositions[t.pointerId];
    for (let e = 0; e < this._pointers.length; e++)
      if (this._pointers[e] == t.pointerId) {
        this._pointers.splice(e, 1);
        return;
      }
  }
  _isTrackingPointer(t) {
    for (let e = 0; e < this._pointers.length; e++)
      if (this._pointers[e] == t.pointerId) return !0;
    return !1;
  }
  _trackPointer(t) {
    let e = this._pointerPositions[t.pointerId];
    e === void 0 && (e = new tt(), this._pointerPositions[t.pointerId] = e), e.set(t.pageX, t.pageY);
  }
  _getSecondPointerPosition(t) {
    const e = t.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[e];
  }
  //
  _customWheelEvent(t) {
    const e = t.deltaMode, n = {
      clientX: t.clientX,
      clientY: t.clientY,
      deltaY: t.deltaY
    };
    switch (e) {
      case 1:
        n.deltaY *= 16;
        break;
      case 2:
        n.deltaY *= 100;
        break;
    }
    return t.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
  }
}
function Px(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function Lx(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function Ix(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(rd), this.state = oe.NONE;
      break;
    case 1:
      const t = this._pointers[0], e = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: e.x, pageY: e.y });
      break;
  }
}
function Dx(i) {
  let t;
  switch (i.button) {
    case 0:
      t = this.mouseButtons.LEFT;
      break;
    case 1:
      t = this.mouseButtons.MIDDLE;
      break;
    case 2:
      t = this.mouseButtons.RIGHT;
      break;
    default:
      t = -1;
  }
  switch (t) {
    case un.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(i), this.state = oe.DOLLY;
      break;
    case un.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = oe.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = oe.ROTATE;
      }
      break;
    case un.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = oe.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = oe.PAN;
      }
      break;
    default:
      this.state = oe.NONE;
  }
  this.state !== oe.NONE && this.dispatchEvent(kc);
}
function Nx(i) {
  switch (this.state) {
    case oe.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(i);
      break;
    case oe.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(i);
      break;
    case oe.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(i);
      break;
  }
}
function Ux(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== oe.NONE || (i.preventDefault(), this.dispatchEvent(kc), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(rd));
}
function Ox(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function Fx(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case dn.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(i), this.state = oe.TOUCH_ROTATE;
          break;
        case dn.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(i), this.state = oe.TOUCH_PAN;
          break;
        default:
          this.state = oe.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case dn.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(i), this.state = oe.TOUCH_DOLLY_PAN;
          break;
        case dn.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(i), this.state = oe.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = oe.NONE;
      }
      break;
    default:
      this.state = oe.NONE;
  }
  this.state !== oe.NONE && this.dispatchEvent(kc);
}
function Bx(i) {
  switch (this._trackPointer(i), this.state) {
    case oe.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case oe.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(i), this.update();
      break;
    case oe.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case oe.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = oe.NONE;
  }
}
function zx(i) {
  this.enabled !== !1 && i.preventDefault();
}
function kx(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Hx(i) {
  i.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Oh(i, t) {
  if (t === Sf)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), i;
  if (t === ja || t === yu) {
    let e = i.getIndex();
    if (e === null) {
      const o = [], a = i.getAttribute("position");
      if (a !== void 0) {
        for (let c = 0; c < a.count; c++)
          o.push(c);
        i.setIndex(o), e = i.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), i;
    }
    const n = e.count - 2, s = [];
    if (t === ja)
      for (let o = 1; o <= n; o++)
        s.push(e.getX(0)), s.push(e.getX(o)), s.push(e.getX(o + 1));
    else
      for (let o = 0; o < n; o++)
        o % 2 === 0 ? (s.push(e.getX(o)), s.push(e.getX(o + 1)), s.push(e.getX(o + 2))) : (s.push(e.getX(o + 2)), s.push(e.getX(o + 1)), s.push(e.getX(o)));
    s.length / 3 !== n && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const r = i.clone();
    return r.setIndex(s), r.clearGroups(), r;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", t), i;
}
class Vx extends ps {
  constructor(t) {
    super(t), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
      return new jx(e);
    }), this.register(function(e) {
      return new qx(e);
    }), this.register(function(e) {
      return new iy(e);
    }), this.register(function(e) {
      return new sy(e);
    }), this.register(function(e) {
      return new ry(e);
    }), this.register(function(e) {
      return new Kx(e);
    }), this.register(function(e) {
      return new Zx(e);
    }), this.register(function(e) {
      return new Jx(e);
    }), this.register(function(e) {
      return new Qx(e);
    }), this.register(function(e) {
      return new $x(e);
    }), this.register(function(e) {
      return new ty(e);
    }), this.register(function(e) {
      return new Yx(e);
    }), this.register(function(e) {
      return new ny(e);
    }), this.register(function(e) {
      return new ey(e);
    }), this.register(function(e) {
      return new Wx(e);
    }), this.register(function(e) {
      return new oy(e);
    }), this.register(function(e) {
      return new ay(e);
    });
  }
  load(t, e, n, s) {
    const r = this;
    let o;
    if (this.resourcePath !== "")
      o = this.resourcePath;
    else if (this.path !== "") {
      const l = zs.extractUrlBase(t);
      o = zs.resolveURL(l, this.path);
    } else
      o = zs.extractUrlBase(t);
    this.manager.itemStart(t);
    const a = function(l) {
      s ? s(l) : console.error(l), r.manager.itemError(t), r.manager.itemEnd(t);
    }, c = new nd(this.manager);
    c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(t, function(l) {
      try {
        r.parse(l, o, function(h) {
          e(h), r.manager.itemEnd(t);
        }, a);
      } catch (h) {
        a(h);
      }
    }, n, a);
  }
  setDRACOLoader(t) {
    return this.dracoLoader = t, this;
  }
  setKTX2Loader(t) {
    return this.ktx2Loader = t, this;
  }
  setMeshoptDecoder(t) {
    return this.meshoptDecoder = t, this;
  }
  register(t) {
    return this.pluginCallbacks.indexOf(t) === -1 && this.pluginCallbacks.push(t), this;
  }
  unregister(t) {
    return this.pluginCallbacks.indexOf(t) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t), 1), this;
  }
  parse(t, e, n, s) {
    let r;
    const o = {}, a = {}, c = new TextDecoder();
    if (typeof t == "string")
      r = JSON.parse(t);
    else if (t instanceof ArrayBuffer)
      if (c.decode(new Uint8Array(t, 0, 4)) === od) {
        try {
          o[Bt.KHR_BINARY_GLTF] = new cy(t);
        } catch (u) {
          s && s(u);
          return;
        }
        r = JSON.parse(o[Bt.KHR_BINARY_GLTF].content);
      } else
        r = JSON.parse(c.decode(t));
    else
      r = t;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const l = new My(r, {
      path: e || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    l.fileLoader.setRequestHeader(this.requestHeader);
    for (let h = 0; h < this.pluginCallbacks.length; h++) {
      const u = this.pluginCallbacks[h](l);
      u.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[u.name] = u, o[u.name] = !0;
    }
    if (r.extensionsUsed)
      for (let h = 0; h < r.extensionsUsed.length; ++h) {
        const u = r.extensionsUsed[h], d = r.extensionsRequired || [];
        switch (u) {
          case Bt.KHR_MATERIALS_UNLIT:
            o[u] = new Xx();
            break;
          case Bt.KHR_DRACO_MESH_COMPRESSION:
            o[u] = new ly(r, this.dracoLoader);
            break;
          case Bt.KHR_TEXTURE_TRANSFORM:
            o[u] = new hy();
            break;
          case Bt.KHR_MESH_QUANTIZATION:
            o[u] = new uy();
            break;
          default:
            d.indexOf(u) >= 0 && a[u] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + u + '".');
        }
      }
    l.setExtensions(o), l.setPlugins(a), l.parse(n, s);
  }
  parseAsync(t, e) {
    const n = this;
    return new Promise(function(s, r) {
      n.parse(t, e, s, r);
    });
  }
}
function Gx() {
  let i = {};
  return {
    get: function(t) {
      return i[t];
    },
    add: function(t, e) {
      i[t] = e;
    },
    remove: function(t) {
      delete i[t];
    },
    removeAll: function() {
      i = {};
    }
  };
}
const Bt = {
  KHR_BINARY_GLTF: "KHR_binary_glTF",
  KHR_DRACO_MESH_COMPRESSION: "KHR_draco_mesh_compression",
  KHR_LIGHTS_PUNCTUAL: "KHR_lights_punctual",
  KHR_MATERIALS_CLEARCOAT: "KHR_materials_clearcoat",
  KHR_MATERIALS_DISPERSION: "KHR_materials_dispersion",
  KHR_MATERIALS_IOR: "KHR_materials_ior",
  KHR_MATERIALS_SHEEN: "KHR_materials_sheen",
  KHR_MATERIALS_SPECULAR: "KHR_materials_specular",
  KHR_MATERIALS_TRANSMISSION: "KHR_materials_transmission",
  KHR_MATERIALS_IRIDESCENCE: "KHR_materials_iridescence",
  KHR_MATERIALS_ANISOTROPY: "KHR_materials_anisotropy",
  KHR_MATERIALS_UNLIT: "KHR_materials_unlit",
  KHR_MATERIALS_VOLUME: "KHR_materials_volume",
  KHR_TEXTURE_BASISU: "KHR_texture_basisu",
  KHR_TEXTURE_TRANSFORM: "KHR_texture_transform",
  KHR_MESH_QUANTIZATION: "KHR_mesh_quantization",
  KHR_MATERIALS_EMISSIVE_STRENGTH: "KHR_materials_emissive_strength",
  EXT_MATERIALS_BUMP: "EXT_materials_bump",
  EXT_TEXTURE_WEBP: "EXT_texture_webp",
  EXT_TEXTURE_AVIF: "EXT_texture_avif",
  EXT_MESHOPT_COMPRESSION: "EXT_meshopt_compression",
  EXT_MESH_GPU_INSTANCING: "EXT_mesh_gpu_instancing"
};
class Wx {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const t = this.parser, e = this.parser.json.nodes || [];
    for (let n = 0, s = e.length; n < s; n++) {
      const r = e[n];
      r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && t._addNodeRef(this.cache, r.extensions[this.name].light);
    }
  }
  _loadLight(t) {
    const e = this.parser, n = "light:" + t;
    let s = e.cache.get(n);
    if (s) return s;
    const r = e.json, c = ((r.extensions && r.extensions[this.name] || {}).lights || [])[t];
    let l;
    const h = new Tt(16777215);
    c.color !== void 0 && h.setRGB(c.color[0], c.color[1], c.color[2], De);
    const u = c.range !== void 0 ? c.range : 0;
    switch (c.type) {
      case "directional":
        l = new Fc(h), l.target.position.set(0, 0, -1), l.add(l.target);
        break;
      case "point":
        l = new id(h), l.distance = u;
        break;
      case "spot":
        l = new hx(h), l.distance = u, c.spot = c.spot || {}, c.spot.innerConeAngle = c.spot.innerConeAngle !== void 0 ? c.spot.innerConeAngle : 0, c.spot.outerConeAngle = c.spot.outerConeAngle !== void 0 ? c.spot.outerConeAngle : Math.PI / 4, l.angle = c.spot.outerConeAngle, l.penumbra = 1 - c.spot.innerConeAngle / c.spot.outerConeAngle, l.target.position.set(0, 0, -1), l.add(l.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + c.type);
    }
    return l.position.set(0, 0, 0), l.decay = 2, Dn(l, c), c.intensity !== void 0 && (l.intensity = c.intensity), l.name = e.createUniqueName(c.name || "light_" + t), s = Promise.resolve(l), e.cache.add(n, s), s;
  }
  getDependency(t, e) {
    if (t === "light")
      return this._loadLight(e);
  }
  createNodeAttachment(t) {
    const e = this, n = this.parser, r = n.json.nodes[t], a = (r.extensions && r.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(c) {
      return n._getNodeRef(e.cache, a, c);
    });
  }
}
class Xx {
  constructor() {
    this.name = Bt.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return vn;
  }
  extendParams(t, e, n) {
    const s = [];
    t.color = new Tt(1, 1, 1), t.opacity = 1;
    const r = e.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const o = r.baseColorFactor;
        t.color.setRGB(o[0], o[1], o[2], De), t.opacity = o[3];
      }
      r.baseColorTexture !== void 0 && s.push(n.assignTexture(t, "map", r.baseColorTexture, He));
    }
    return Promise.all(s);
  }
}
class $x {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(t, e) {
    const s = this.parser.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name].emissiveStrength;
    return r !== void 0 && (e.emissiveIntensity = r), Promise.resolve();
  }
}
class jx {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : En;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    if (o.clearcoatFactor !== void 0 && (e.clearcoat = o.clearcoatFactor), o.clearcoatTexture !== void 0 && r.push(n.assignTexture(e, "clearcoatMap", o.clearcoatTexture)), o.clearcoatRoughnessFactor !== void 0 && (e.clearcoatRoughness = o.clearcoatRoughnessFactor), o.clearcoatRoughnessTexture !== void 0 && r.push(n.assignTexture(e, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)), o.clearcoatNormalTexture !== void 0 && (r.push(n.assignTexture(e, "clearcoatNormalMap", o.clearcoatNormalTexture)), o.clearcoatNormalTexture.scale !== void 0)) {
      const a = o.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new tt(a, a);
    }
    return Promise.all(r);
  }
}
class qx {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : En;
  }
  extendMaterialParams(t, e) {
    const s = this.parser.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name];
    return e.dispersion = r.dispersion !== void 0 ? r.dispersion : 0, Promise.resolve();
  }
}
class Yx {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : En;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return o.iridescenceFactor !== void 0 && (e.iridescence = o.iridescenceFactor), o.iridescenceTexture !== void 0 && r.push(n.assignTexture(e, "iridescenceMap", o.iridescenceTexture)), o.iridescenceIor !== void 0 && (e.iridescenceIOR = o.iridescenceIor), e.iridescenceThicknessRange === void 0 && (e.iridescenceThicknessRange = [100, 400]), o.iridescenceThicknessMinimum !== void 0 && (e.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum), o.iridescenceThicknessMaximum !== void 0 && (e.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum), o.iridescenceThicknessTexture !== void 0 && r.push(n.assignTexture(e, "iridescenceThicknessMap", o.iridescenceThicknessTexture)), Promise.all(r);
  }
}
class Kx {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : En;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [];
    e.sheenColor = new Tt(0, 0, 0), e.sheenRoughness = 0, e.sheen = 1;
    const o = s.extensions[this.name];
    if (o.sheenColorFactor !== void 0) {
      const a = o.sheenColorFactor;
      e.sheenColor.setRGB(a[0], a[1], a[2], De);
    }
    return o.sheenRoughnessFactor !== void 0 && (e.sheenRoughness = o.sheenRoughnessFactor), o.sheenColorTexture !== void 0 && r.push(n.assignTexture(e, "sheenColorMap", o.sheenColorTexture, He)), o.sheenRoughnessTexture !== void 0 && r.push(n.assignTexture(e, "sheenRoughnessMap", o.sheenRoughnessTexture)), Promise.all(r);
  }
}
class Zx {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : En;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return o.transmissionFactor !== void 0 && (e.transmission = o.transmissionFactor), o.transmissionTexture !== void 0 && r.push(n.assignTexture(e, "transmissionMap", o.transmissionTexture)), Promise.all(r);
  }
}
class Jx {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : En;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    e.thickness = o.thicknessFactor !== void 0 ? o.thicknessFactor : 0, o.thicknessTexture !== void 0 && r.push(n.assignTexture(e, "thicknessMap", o.thicknessTexture)), e.attenuationDistance = o.attenuationDistance || 1 / 0;
    const a = o.attenuationColor || [1, 1, 1];
    return e.attenuationColor = new Tt().setRGB(a[0], a[1], a[2], De), Promise.all(r);
  }
}
class Qx {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_MATERIALS_IOR;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : En;
  }
  extendMaterialParams(t, e) {
    const s = this.parser.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name];
    return e.ior = r.ior !== void 0 ? r.ior : 1.5, Promise.resolve();
  }
}
class ty {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : En;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    e.specularIntensity = o.specularFactor !== void 0 ? o.specularFactor : 1, o.specularTexture !== void 0 && r.push(n.assignTexture(e, "specularIntensityMap", o.specularTexture));
    const a = o.specularColorFactor || [1, 1, 1];
    return e.specularColor = new Tt().setRGB(a[0], a[1], a[2], De), o.specularColorTexture !== void 0 && r.push(n.assignTexture(e, "specularColorMap", o.specularColorTexture, He)), Promise.all(r);
  }
}
class ey {
  constructor(t) {
    this.parser = t, this.name = Bt.EXT_MATERIALS_BUMP;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : En;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return e.bumpScale = o.bumpFactor !== void 0 ? o.bumpFactor : 1, o.bumpTexture !== void 0 && r.push(n.assignTexture(e, "bumpMap", o.bumpTexture)), Promise.all(r);
  }
}
class ny {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : En;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return o.anisotropyStrength !== void 0 && (e.anisotropy = o.anisotropyStrength), o.anisotropyRotation !== void 0 && (e.anisotropyRotation = o.anisotropyRotation), o.anisotropyTexture !== void 0 && r.push(n.assignTexture(e, "anisotropyMap", o.anisotropyTexture)), Promise.all(r);
  }
}
class iy {
  constructor(t) {
    this.parser = t, this.name = Bt.KHR_TEXTURE_BASISU;
  }
  loadTexture(t) {
    const e = this.parser, n = e.json, s = n.textures[t];
    if (!s.extensions || !s.extensions[this.name])
      return null;
    const r = s.extensions[this.name], o = e.options.ktx2Loader;
    if (!o) {
      if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return e.loadTextureImage(t, r.source, o);
  }
}
class sy {
  constructor(t) {
    this.parser = t, this.name = Bt.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(t) {
    const e = this.name, n = this.parser, s = n.json, r = s.textures[t];
    if (!r.extensions || !r.extensions[e])
      return null;
    const o = r.extensions[e], a = s.images[o.source];
    let c = n.textureLoader;
    if (a.uri) {
      const l = n.options.manager.getHandler(a.uri);
      l !== null && (c = l);
    }
    return this.detectSupport().then(function(l) {
      if (l) return n.loadTextureImage(t, o.source, c);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(e) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return n.loadTexture(t);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(t) {
      const e = new Image();
      e.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", e.onload = e.onerror = function() {
        t(e.height === 1);
      };
    })), this.isSupported;
  }
}
class ry {
  constructor(t) {
    this.parser = t, this.name = Bt.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(t) {
    const e = this.name, n = this.parser, s = n.json, r = s.textures[t];
    if (!r.extensions || !r.extensions[e])
      return null;
    const o = r.extensions[e], a = s.images[o.source];
    let c = n.textureLoader;
    if (a.uri) {
      const l = n.options.manager.getHandler(a.uri);
      l !== null && (c = l);
    }
    return this.detectSupport().then(function(l) {
      if (l) return n.loadTextureImage(t, o.source, c);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(e) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return n.loadTexture(t);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(t) {
      const e = new Image();
      e.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", e.onload = e.onerror = function() {
        t(e.height === 1);
      };
    })), this.isSupported;
  }
}
class oy {
  constructor(t) {
    this.name = Bt.EXT_MESHOPT_COMPRESSION, this.parser = t;
  }
  loadBufferView(t) {
    const e = this.parser.json, n = e.bufferViews[t];
    if (n.extensions && n.extensions[this.name]) {
      const s = n.extensions[this.name], r = this.parser.getDependency("buffer", s.buffer), o = this.parser.options.meshoptDecoder;
      if (!o || !o.supported) {
        if (e.extensionsRequired && e.extensionsRequired.indexOf(this.name) >= 0)
          throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
        return null;
      }
      return r.then(function(a) {
        const c = s.byteOffset || 0, l = s.byteLength || 0, h = s.count, u = s.byteStride, d = new Uint8Array(a, c, l);
        return o.decodeGltfBufferAsync ? o.decodeGltfBufferAsync(h, u, d, s.mode, s.filter).then(function(f) {
          return f.buffer;
        }) : o.ready.then(function() {
          const f = new ArrayBuffer(h * u);
          return o.decodeGltfBuffer(new Uint8Array(f), h, u, d, s.mode, s.filter), f;
        });
      });
    } else
      return null;
  }
}
class ay {
  constructor(t) {
    this.name = Bt.EXT_MESH_GPU_INSTANCING, this.parser = t;
  }
  createNodeMesh(t) {
    const e = this.parser.json, n = e.nodes[t];
    if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0)
      return null;
    const s = e.meshes[n.mesh];
    for (const l of s.primitives)
      if (l.mode !== nn.TRIANGLES && l.mode !== nn.TRIANGLE_STRIP && l.mode !== nn.TRIANGLE_FAN && l.mode !== void 0)
        return null;
    const o = n.extensions[this.name].attributes, a = [], c = {};
    for (const l in o)
      a.push(this.parser.getDependency("accessor", o[l]).then((h) => (c[l] = h, c[l])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(t)), Promise.all(a).then((l) => {
      const h = l.pop(), u = h.isGroup ? h.children : [h], d = l[0].count, f = [];
      for (const g of u) {
        const _ = new Dt(), p = new w(), m = new xn(), S = new w(1, 1, 1), x = new fv(g.geometry, g.material, d);
        for (let M = 0; M < d; M++)
          c.TRANSLATION && p.fromBufferAttribute(c.TRANSLATION, M), c.ROTATION && m.fromBufferAttribute(c.ROTATION, M), c.SCALE && S.fromBufferAttribute(c.SCALE, M), x.setMatrixAt(M, _.compose(p, m, S));
        for (const M in c)
          if (M === "_COLOR_0") {
            const P = c[M];
            x.instanceColor = new Ka(P.array, P.itemSize, P.normalized);
          } else M !== "TRANSLATION" && M !== "ROTATION" && M !== "SCALE" && g.geometry.setAttribute(M, c[M]);
        de.prototype.copy.call(x, g), this.parser.assignFinalMaterial(x), f.push(x);
      }
      return h.isGroup ? (h.clear(), h.add(...f), h) : f[0];
    }));
  }
}
const od = "glTF", Rs = 12, Fh = { JSON: 1313821514, BIN: 5130562 };
class cy {
  constructor(t) {
    this.name = Bt.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const e = new DataView(t, 0, Rs), n = new TextDecoder();
    if (this.header = {
      magic: n.decode(new Uint8Array(t.slice(0, 4))),
      version: e.getUint32(4, !0),
      length: e.getUint32(8, !0)
    }, this.header.magic !== od)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - Rs, r = new DataView(t, Rs);
    let o = 0;
    for (; o < s; ) {
      const a = r.getUint32(o, !0);
      o += 4;
      const c = r.getUint32(o, !0);
      if (o += 4, c === Fh.JSON) {
        const l = new Uint8Array(t, Rs + o, a);
        this.content = n.decode(l);
      } else if (c === Fh.BIN) {
        const l = Rs + o;
        this.body = t.slice(l, l + a);
      }
      o += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class ly {
  constructor(t, e) {
    if (!e)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = Bt.KHR_DRACO_MESH_COMPRESSION, this.json = t, this.dracoLoader = e, this.dracoLoader.preload();
  }
  decodePrimitive(t, e) {
    const n = this.json, s = this.dracoLoader, r = t.extensions[this.name].bufferView, o = t.extensions[this.name].attributes, a = {}, c = {}, l = {};
    for (const h in o) {
      const u = ec[h] || h.toLowerCase();
      a[u] = o[h];
    }
    for (const h in t.attributes) {
      const u = ec[h] || h.toLowerCase();
      if (o[h] !== void 0) {
        const d = n.accessors[t.attributes[h]], f = Yi[d.componentType];
        l[u] = f.name, c[u] = d.normalized === !0;
      }
    }
    return e.getDependency("bufferView", r).then(function(h) {
      return new Promise(function(u, d) {
        s.decodeDracoFile(h, function(f) {
          for (const g in f.attributes) {
            const _ = f.attributes[g], p = c[g];
            p !== void 0 && (_.normalized = p);
          }
          u(f);
        }, a, l, De, d);
      });
    });
  }
}
class hy {
  constructor() {
    this.name = Bt.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(t, e) {
    return (e.texCoord === void 0 || e.texCoord === t.channel) && e.offset === void 0 && e.rotation === void 0 && e.scale === void 0 || (t = t.clone(), e.texCoord !== void 0 && (t.channel = e.texCoord), e.offset !== void 0 && t.offset.fromArray(e.offset), e.rotation !== void 0 && (t.rotation = e.rotation), e.scale !== void 0 && t.repeat.fromArray(e.scale), t.needsUpdate = !0), t;
  }
}
class uy {
  constructor() {
    this.name = Bt.KHR_MESH_QUANTIZATION;
  }
}
class ad extends tr {
  constructor(t, e, n, s) {
    super(t, e, n, s);
  }
  copySampleValue_(t) {
    const e = this.resultBuffer, n = this.sampleValues, s = this.valueSize, r = t * s * 3 + s;
    for (let o = 0; o !== s; o++)
      e[o] = n[r + o];
    return e;
  }
  interpolate_(t, e, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, c = a * 2, l = a * 3, h = s - e, u = (n - e) / h, d = u * u, f = d * u, g = t * l, _ = g - l, p = -2 * f + 3 * d, m = f - d, S = 1 - p, x = m - d + u;
    for (let M = 0; M !== a; M++) {
      const P = o[_ + M + a], R = o[_ + M + c] * h, A = o[g + M + a], L = o[g + M] * h;
      r[M] = S * P + x * R + p * A + m * L;
    }
    return r;
  }
}
const dy = new xn();
class fy extends ad {
  interpolate_(t, e, n, s) {
    const r = super.interpolate_(t, e, n, s);
    return dy.fromArray(r).normalize().toArray(r), r;
  }
}
const nn = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
}, Yi = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Bh = {
  9728: Ve,
  9729: Qe,
  9984: hu,
  9985: Vr,
  9986: Ls,
  9987: Un
}, zh = {
  33071: Yn,
  33648: Jr,
  10497: es
}, oa = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, ec = {
  POSITION: "position",
  NORMAL: "normal",
  TANGENT: "tangent",
  TEXCOORD_0: "uv",
  TEXCOORD_1: "uv1",
  TEXCOORD_2: "uv2",
  TEXCOORD_3: "uv3",
  COLOR_0: "color",
  WEIGHTS_0: "skinWeight",
  JOINTS_0: "skinIndex"
}, $n = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, py = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Xs,
  STEP: Ws
}, aa = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function my(i) {
  return i.DefaultMaterial === void 0 && (i.DefaultMaterial = new us({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: Fn
  })), i.DefaultMaterial;
}
function hi(i, t, e) {
  for (const n in e.extensions)
    i[n] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[n] = e.extensions[n]);
}
function Dn(i, t) {
  t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(i.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function gy(i, t, e) {
  let n = !1, s = !1, r = !1;
  for (let l = 0, h = t.length; l < h; l++) {
    const u = t[l];
    if (u.POSITION !== void 0 && (n = !0), u.NORMAL !== void 0 && (s = !0), u.COLOR_0 !== void 0 && (r = !0), n && s && r) break;
  }
  if (!n && !s && !r) return Promise.resolve(i);
  const o = [], a = [], c = [];
  for (let l = 0, h = t.length; l < h; l++) {
    const u = t[l];
    if (n) {
      const d = u.POSITION !== void 0 ? e.getDependency("accessor", u.POSITION) : i.attributes.position;
      o.push(d);
    }
    if (s) {
      const d = u.NORMAL !== void 0 ? e.getDependency("accessor", u.NORMAL) : i.attributes.normal;
      a.push(d);
    }
    if (r) {
      const d = u.COLOR_0 !== void 0 ? e.getDependency("accessor", u.COLOR_0) : i.attributes.color;
      c.push(d);
    }
  }
  return Promise.all([
    Promise.all(o),
    Promise.all(a),
    Promise.all(c)
  ]).then(function(l) {
    const h = l[0], u = l[1], d = l[2];
    return n && (i.morphAttributes.position = h), s && (i.morphAttributes.normal = u), r && (i.morphAttributes.color = d), i.morphTargetsRelative = !0, i;
  });
}
function _y(i, t) {
  if (i.updateMorphTargets(), t.weights !== void 0)
    for (let e = 0, n = t.weights.length; e < n; e++)
      i.morphTargetInfluences[e] = t.weights[e];
  if (t.extras && Array.isArray(t.extras.targetNames)) {
    const e = t.extras.targetNames;
    if (i.morphTargetInfluences.length === e.length) {
      i.morphTargetDictionary = {};
      for (let n = 0, s = e.length; n < s; n++)
        i.morphTargetDictionary[e[n]] = n;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function vy(i) {
  let t;
  const e = i.extensions && i.extensions[Bt.KHR_DRACO_MESH_COMPRESSION];
  if (e ? t = "draco:" + e.bufferView + ":" + e.indices + ":" + ca(e.attributes) : t = i.indices + ":" + ca(i.attributes) + ":" + i.mode, i.targets !== void 0)
    for (let n = 0, s = i.targets.length; n < s; n++)
      t += ":" + ca(i.targets[n]);
  return t;
}
function ca(i) {
  let t = "";
  const e = Object.keys(i).sort();
  for (let n = 0, s = e.length; n < s; n++)
    t += e[n] + ":" + i[e[n]] + ";";
  return t;
}
function nc(i) {
  switch (i) {
    case Int8Array:
      return 1 / 127;
    case Uint8Array:
      return 1 / 255;
    case Int16Array:
      return 1 / 32767;
    case Uint16Array:
      return 1 / 65535;
    default:
      throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.");
  }
}
function xy(i) {
  return i.search(/\.jpe?g($|\?)/i) > 0 || i.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : i.search(/\.webp($|\?)/i) > 0 || i.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const yy = new Dt();
class My {
  constructor(t = {}, e = {}) {
    this.json = t, this.extensions = {}, this.plugins = {}, this.options = e, this.cache = new Gx(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1, s = -1, r = !1, o = -1;
    if (typeof navigator < "u") {
      const a = navigator.userAgent;
      n = /^((?!chrome|android).)*safari/i.test(a) === !0;
      const c = a.match(/Version\/(\d+)/);
      s = n && c ? parseInt(c[1], 10) : -1, r = a.indexOf("Firefox") > -1, o = r ? a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || n && s < 17 || r && o < 98 ? this.textureLoader = new ax(this.options.manager) : this.textureLoader = new fx(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new nd(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(t) {
    this.extensions = t;
  }
  setPlugins(t) {
    this.plugins = t;
  }
  parse(t, e) {
    const n = this, s = this.json, r = this.extensions;
    this.cache.removeAll(), this.nodeCache = {}, this._invokeAll(function(o) {
      return o._markDefs && o._markDefs();
    }), Promise.all(this._invokeAll(function(o) {
      return o.beforeRoot && o.beforeRoot();
    })).then(function() {
      return Promise.all([
        n.getDependencies("scene"),
        n.getDependencies("animation"),
        n.getDependencies("camera")
      ]);
    }).then(function(o) {
      const a = {
        scene: o[0][s.scene || 0],
        scenes: o[0],
        animations: o[1],
        cameras: o[2],
        asset: s.asset,
        parser: n,
        userData: {}
      };
      return hi(r, a, s), Dn(a, s), Promise.all(n._invokeAll(function(c) {
        return c.afterRoot && c.afterRoot(a);
      })).then(function() {
        for (const c of a.scenes)
          c.updateMatrixWorld();
        t(a);
      });
    }).catch(e);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const t = this.json.nodes || [], e = this.json.skins || [], n = this.json.meshes || [];
    for (let s = 0, r = e.length; s < r; s++) {
      const o = e[s].joints;
      for (let a = 0, c = o.length; a < c; a++)
        t[o[a]].isBone = !0;
    }
    for (let s = 0, r = t.length; s < r; s++) {
      const o = t[s];
      o.mesh !== void 0 && (this._addNodeRef(this.meshCache, o.mesh), o.skin !== void 0 && (n[o.mesh].isSkinnedMesh = !0)), o.camera !== void 0 && this._addNodeRef(this.cameraCache, o.camera);
    }
  }
  /**
   * Counts references to shared node / Object3D resources. These resources
   * can be reused, or "instantiated", at multiple nodes in the scene
   * hierarchy. Mesh, Camera, and Light instances are instantiated and must
   * be marked. Non-scenegraph resources (like Materials, Geometries, and
   * Textures) can be reused directly and are not marked here.
   *
   * Example: CesiumMilkTruck sample model reuses "Wheel" meshes.
   */
  _addNodeRef(t, e) {
    e !== void 0 && (t.refs[e] === void 0 && (t.refs[e] = t.uses[e] = 0), t.refs[e]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(t, e, n) {
    if (t.refs[e] <= 1) return n;
    const s = n.clone(), r = (o, a) => {
      const c = this.associations.get(o);
      c != null && this.associations.set(a, c);
      for (const [l, h] of o.children.entries())
        r(h, a.children[l]);
    };
    return r(n, s), s.name += "_instance_" + t.uses[e]++, s;
  }
  _invokeOne(t) {
    const e = Object.values(this.plugins);
    e.push(this);
    for (let n = 0; n < e.length; n++) {
      const s = t(e[n]);
      if (s) return s;
    }
    return null;
  }
  _invokeAll(t) {
    const e = Object.values(this.plugins);
    e.unshift(this);
    const n = [];
    for (let s = 0; s < e.length; s++) {
      const r = t(e[s]);
      r && n.push(r);
    }
    return n;
  }
  /**
   * Requests the specified dependency asynchronously, with caching.
   * @param {string} type
   * @param {number} index
   * @return {Promise<Object3D|Material|THREE.Texture|AnimationClip|ArrayBuffer|Object>}
   */
  getDependency(t, e) {
    const n = t + ":" + e;
    let s = this.cache.get(n);
    if (!s) {
      switch (t) {
        case "scene":
          s = this.loadScene(e);
          break;
        case "node":
          s = this._invokeOne(function(r) {
            return r.loadNode && r.loadNode(e);
          });
          break;
        case "mesh":
          s = this._invokeOne(function(r) {
            return r.loadMesh && r.loadMesh(e);
          });
          break;
        case "accessor":
          s = this.loadAccessor(e);
          break;
        case "bufferView":
          s = this._invokeOne(function(r) {
            return r.loadBufferView && r.loadBufferView(e);
          });
          break;
        case "buffer":
          s = this.loadBuffer(e);
          break;
        case "material":
          s = this._invokeOne(function(r) {
            return r.loadMaterial && r.loadMaterial(e);
          });
          break;
        case "texture":
          s = this._invokeOne(function(r) {
            return r.loadTexture && r.loadTexture(e);
          });
          break;
        case "skin":
          s = this.loadSkin(e);
          break;
        case "animation":
          s = this._invokeOne(function(r) {
            return r.loadAnimation && r.loadAnimation(e);
          });
          break;
        case "camera":
          s = this.loadCamera(e);
          break;
        default:
          if (s = this._invokeOne(function(r) {
            return r != this && r.getDependency && r.getDependency(t, e);
          }), !s)
            throw new Error("Unknown type: " + t);
          break;
      }
      this.cache.add(n, s);
    }
    return s;
  }
  /**
   * Requests all dependencies of the specified type asynchronously, with caching.
   * @param {string} type
   * @return {Promise<Array<Object>>}
   */
  getDependencies(t) {
    let e = this.cache.get(t);
    if (!e) {
      const n = this, s = this.json[t + (t === "mesh" ? "es" : "s")] || [];
      e = Promise.all(s.map(function(r, o) {
        return n.getDependency(t, o);
      })), this.cache.add(t, e);
    }
    return e;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(t) {
    const e = this.json.buffers[t], n = this.fileLoader;
    if (e.type && e.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + e.type + " buffer type is not supported.");
    if (e.uri === void 0 && t === 0)
      return Promise.resolve(this.extensions[Bt.KHR_BINARY_GLTF].body);
    const s = this.options;
    return new Promise(function(r, o) {
      n.load(zs.resolveURL(e.uri, s.path), r, void 0, function() {
        o(new Error('THREE.GLTFLoader: Failed to load buffer "' + e.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(t) {
    const e = this.json.bufferViews[t];
    return this.getDependency("buffer", e.buffer).then(function(n) {
      const s = e.byteLength || 0, r = e.byteOffset || 0;
      return n.slice(r, r + s);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(t) {
    const e = this, n = this.json, s = this.json.accessors[t];
    if (s.bufferView === void 0 && s.sparse === void 0) {
      const o = oa[s.type], a = Yi[s.componentType], c = s.normalized === !0, l = new a(s.count * o);
      return Promise.resolve(new Ie(l, o, c));
    }
    const r = [];
    return s.bufferView !== void 0 ? r.push(this.getDependency("bufferView", s.bufferView)) : r.push(null), s.sparse !== void 0 && (r.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(r).then(function(o) {
      const a = o[0], c = oa[s.type], l = Yi[s.componentType], h = l.BYTES_PER_ELEMENT, u = h * c, d = s.byteOffset || 0, f = s.bufferView !== void 0 ? n.bufferViews[s.bufferView].byteStride : void 0, g = s.normalized === !0;
      let _, p;
      if (f && f !== u) {
        const m = Math.floor(d / f), S = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + m + ":" + s.count;
        let x = e.cache.get(S);
        x || (_ = new l(a, m * f, s.count * f / h), x = new ku(_, f / h), e.cache.add(S, x)), p = new js(x, c, d % f / h, g);
      } else
        a === null ? _ = new l(s.count * c) : _ = new l(a, d, s.count * c), p = new Ie(_, c, g);
      if (s.sparse !== void 0) {
        const m = oa.SCALAR, S = Yi[s.sparse.indices.componentType], x = s.sparse.indices.byteOffset || 0, M = s.sparse.values.byteOffset || 0, P = new S(o[1], x, s.sparse.count * m), R = new l(o[2], M, s.sparse.count * c);
        a !== null && (p = new Ie(p.array.slice(), p.itemSize, p.normalized)), p.normalized = !1;
        for (let A = 0, L = P.length; A < L; A++) {
          const G = P[A];
          if (p.setX(G, R[A * c]), c >= 2 && p.setY(G, R[A * c + 1]), c >= 3 && p.setZ(G, R[A * c + 2]), c >= 4 && p.setW(G, R[A * c + 3]), c >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
        }
        p.normalized = g;
      }
      return p;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#textures
   * @param {number} textureIndex
   * @return {Promise<THREE.Texture|null>}
   */
  loadTexture(t) {
    const e = this.json, n = this.options, r = e.textures[t].source, o = e.images[r];
    let a = this.textureLoader;
    if (o.uri) {
      const c = n.manager.getHandler(o.uri);
      c !== null && (a = c);
    }
    return this.loadTextureImage(t, r, a);
  }
  loadTextureImage(t, e, n) {
    const s = this, r = this.json, o = r.textures[t], a = r.images[e], c = (a.uri || a.bufferView) + ":" + o.sampler;
    if (this.textureCache[c])
      return this.textureCache[c];
    const l = this.loadImageSource(e, n).then(function(h) {
      h.flipY = !1, h.name = o.name || a.name || "", h.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (h.name = a.uri);
      const d = (r.samplers || {})[o.sampler] || {};
      return h.magFilter = Bh[d.magFilter] || Qe, h.minFilter = Bh[d.minFilter] || Un, h.wrapS = zh[d.wrapS] || es, h.wrapT = zh[d.wrapT] || es, s.associations.set(h, { textures: t }), h;
    }).catch(function() {
      return null;
    });
    return this.textureCache[c] = l, l;
  }
  loadImageSource(t, e) {
    const n = this, s = this.json, r = this.options;
    if (this.sourceCache[t] !== void 0)
      return this.sourceCache[t].then((u) => u.clone());
    const o = s.images[t], a = self.URL || self.webkitURL;
    let c = o.uri || "", l = !1;
    if (o.bufferView !== void 0)
      c = n.getDependency("bufferView", o.bufferView).then(function(u) {
        l = !0;
        const d = new Blob([u], { type: o.mimeType });
        return c = a.createObjectURL(d), c;
      });
    else if (o.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + t + " is missing URI and bufferView");
    const h = Promise.resolve(c).then(function(u) {
      return new Promise(function(d, f) {
        let g = d;
        e.isImageBitmapLoader === !0 && (g = function(_) {
          const p = new be(_);
          p.needsUpdate = !0, d(p);
        }), e.load(zs.resolveURL(u, r.path), g, void 0, f);
      });
    }).then(function(u) {
      return l === !0 && a.revokeObjectURL(c), Dn(u, o), u.userData.mimeType = o.mimeType || xy(o.uri), u;
    }).catch(function(u) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", c), u;
    });
    return this.sourceCache[t] = h, h;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(t, e, n, s) {
    const r = this;
    return this.getDependency("texture", n.index).then(function(o) {
      if (!o) return null;
      if (n.texCoord !== void 0 && n.texCoord > 0 && (o = o.clone(), o.channel = n.texCoord), r.extensions[Bt.KHR_TEXTURE_TRANSFORM]) {
        const a = n.extensions !== void 0 ? n.extensions[Bt.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const c = r.associations.get(o);
          o = r.extensions[Bt.KHR_TEXTURE_TRANSFORM].extendTexture(o, a), r.associations.set(o, c);
        }
      }
      return s !== void 0 && (o.colorSpace = s), t[e] = o, o;
    });
  }
  /**
   * Assigns final material to a Mesh, Line, or Points instance. The instance
   * already has a material (generated from the glTF material options alone)
   * but reuse of the same glTF material may require multiple threejs materials
   * to accommodate different primitive types, defines, etc. New materials will
   * be created if necessary, and reused from a cache.
   * @param  {Object3D} mesh Mesh, Line, or Points instance.
   */
  assignFinalMaterial(t) {
    const e = t.geometry;
    let n = t.material;
    const s = e.attributes.tangent === void 0, r = e.attributes.color !== void 0, o = e.attributes.normal === void 0;
    if (t.isPoints) {
      const a = "PointsMaterial:" + n.uuid;
      let c = this.cache.get(a);
      c || (c = new Xu(), gn.prototype.copy.call(c, n), c.color.copy(n.color), c.map = n.map, c.sizeAttenuation = !1, this.cache.add(a, c)), n = c;
    } else if (t.isLine) {
      const a = "LineBasicMaterial:" + n.uuid;
      let c = this.cache.get(a);
      c || (c = new fo(), gn.prototype.copy.call(c, n), c.color.copy(n.color), c.map = n.map, this.cache.add(a, c)), n = c;
    }
    if (s || r || o) {
      let a = "ClonedMaterial:" + n.uuid + ":";
      s && (a += "derivative-tangents:"), r && (a += "vertex-colors:"), o && (a += "flat-shading:");
      let c = this.cache.get(a);
      c || (c = n.clone(), r && (c.vertexColors = !0), o && (c.flatShading = !0), s && (c.normalScale && (c.normalScale.y *= -1), c.clearcoatNormalScale && (c.clearcoatNormalScale.y *= -1)), this.cache.add(a, c), this.associations.set(c, this.associations.get(n))), n = c;
    }
    t.material = n;
  }
  getMaterialType() {
    return us;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(t) {
    const e = this, n = this.json, s = this.extensions, r = n.materials[t];
    let o;
    const a = {}, c = r.extensions || {}, l = [];
    if (c[Bt.KHR_MATERIALS_UNLIT]) {
      const u = s[Bt.KHR_MATERIALS_UNLIT];
      o = u.getMaterialType(), l.push(u.extendParams(a, r, e));
    } else {
      const u = r.pbrMetallicRoughness || {};
      if (a.color = new Tt(1, 1, 1), a.opacity = 1, Array.isArray(u.baseColorFactor)) {
        const d = u.baseColorFactor;
        a.color.setRGB(d[0], d[1], d[2], De), a.opacity = d[3];
      }
      u.baseColorTexture !== void 0 && l.push(e.assignTexture(a, "map", u.baseColorTexture, He)), a.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1, a.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1, u.metallicRoughnessTexture !== void 0 && (l.push(e.assignTexture(a, "metalnessMap", u.metallicRoughnessTexture)), l.push(e.assignTexture(a, "roughnessMap", u.metallicRoughnessTexture))), o = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(t);
      }), l.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(t, a);
      })));
    }
    r.doubleSided === !0 && (a.side = fn);
    const h = r.alphaMode || aa.OPAQUE;
    if (h === aa.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, h === aa.MASK && (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)), r.normalTexture !== void 0 && o !== vn && (l.push(e.assignTexture(a, "normalMap", r.normalTexture)), a.normalScale = new tt(1, 1), r.normalTexture.scale !== void 0)) {
      const u = r.normalTexture.scale;
      a.normalScale.set(u, u);
    }
    if (r.occlusionTexture !== void 0 && o !== vn && (l.push(e.assignTexture(a, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && o !== vn) {
      const u = r.emissiveFactor;
      a.emissive = new Tt().setRGB(u[0], u[1], u[2], De);
    }
    return r.emissiveTexture !== void 0 && o !== vn && l.push(e.assignTexture(a, "emissiveMap", r.emissiveTexture, He)), Promise.all(l).then(function() {
      const u = new o(a);
      return r.name && (u.name = r.name), Dn(u, r), e.associations.set(u, { materials: t }), r.extensions && hi(s, u, r), u;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(t) {
    const e = se.sanitizeNodeName(t || "");
    return e in this.nodeNamesUsed ? e + "_" + ++this.nodeNamesUsed[e] : (this.nodeNamesUsed[e] = 0, e);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(t) {
    const e = this, n = this.extensions, s = this.primitiveCache;
    function r(a) {
      return n[Bt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, e).then(function(c) {
        return kh(c, a, e);
      });
    }
    const o = [];
    for (let a = 0, c = t.length; a < c; a++) {
      const l = t[a], h = vy(l), u = s[h];
      if (u)
        o.push(u.promise);
      else {
        let d;
        l.extensions && l.extensions[Bt.KHR_DRACO_MESH_COMPRESSION] ? d = r(l) : d = kh(new Pe(), l, e), s[h] = { primitive: l, promise: d }, o.push(d);
      }
    }
    return Promise.all(o);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(t) {
    const e = this, n = this.json, s = this.extensions, r = n.meshes[t], o = r.primitives, a = [];
    for (let c = 0, l = o.length; c < l; c++) {
      const h = o[c].material === void 0 ? my(this.cache) : this.getDependency("material", o[c].material);
      a.push(h);
    }
    return a.push(e.loadGeometries(o)), Promise.all(a).then(function(c) {
      const l = c.slice(0, c.length - 1), h = c[c.length - 1], u = [];
      for (let f = 0, g = h.length; f < g; f++) {
        const _ = h[f], p = o[f];
        let m;
        const S = l[f];
        if (p.mode === nn.TRIANGLES || p.mode === nn.TRIANGLE_STRIP || p.mode === nn.TRIANGLE_FAN || p.mode === void 0)
          m = r.isSkinnedMesh === !0 ? new hv(_, S) : new ge(_, S), m.isSkinnedMesh === !0 && m.normalizeSkinWeights(), p.mode === nn.TRIANGLE_STRIP ? m.geometry = Oh(m.geometry, yu) : p.mode === nn.TRIANGLE_FAN && (m.geometry = Oh(m.geometry, ja));
        else if (p.mode === nn.LINES)
          m = new Rc(_, S);
        else if (p.mode === nn.LINE_STRIP)
          m = new wc(_, S);
        else if (p.mode === nn.LINE_LOOP)
          m = new pv(_, S);
        else if (p.mode === nn.POINTS)
          m = new mv(_, S);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + p.mode);
        Object.keys(m.geometry.morphAttributes).length > 0 && _y(m, r), m.name = e.createUniqueName(r.name || "mesh_" + t), Dn(m, r), p.extensions && hi(s, m, p), e.assignFinalMaterial(m), u.push(m);
      }
      for (let f = 0, g = u.length; f < g; f++)
        e.associations.set(u[f], {
          meshes: t,
          primitives: f
        });
      if (u.length === 1)
        return r.extensions && hi(s, u[0], r), u[0];
      const d = new _t();
      r.extensions && hi(s, d, r), e.associations.set(d, { meshes: t });
      for (let f = 0, g = u.length; f < g; f++)
        d.add(u[f]);
      return d;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#cameras
   * @param {number} cameraIndex
   * @return {Promise<THREE.Camera>}
   */
  loadCamera(t) {
    let e;
    const n = this.json.cameras[t], s = n[n.type];
    if (!s) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return n.type === "perspective" ? e = new Be(ji.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : n.type === "orthographic" && (e = new bc(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), n.name && (e.name = this.createUniqueName(n.name)), Dn(e, n), Promise.resolve(e);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(t) {
    const e = this.json.skins[t], n = [];
    for (let s = 0, r = e.joints.length; s < r; s++)
      n.push(this._loadNodeShallow(e.joints[s]));
    return e.inverseBindMatrices !== void 0 ? n.push(this.getDependency("accessor", e.inverseBindMatrices)) : n.push(null), Promise.all(n).then(function(s) {
      const r = s.pop(), o = s, a = [], c = [];
      for (let l = 0, h = o.length; l < h; l++) {
        const u = o[l];
        if (u) {
          a.push(u);
          const d = new Dt();
          r !== null && d.fromArray(r.array, l * 16), c.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', e.joints[l]);
      }
      return new Ac(a, c);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(t) {
    const e = this.json, n = this, s = e.animations[t], r = s.name ? s.name : "animation_" + t, o = [], a = [], c = [], l = [], h = [];
    for (let u = 0, d = s.channels.length; u < d; u++) {
      const f = s.channels[u], g = s.samplers[f.sampler], _ = f.target, p = _.node, m = s.parameters !== void 0 ? s.parameters[g.input] : g.input, S = s.parameters !== void 0 ? s.parameters[g.output] : g.output;
      _.node !== void 0 && (o.push(this.getDependency("node", p)), a.push(this.getDependency("accessor", m)), c.push(this.getDependency("accessor", S)), l.push(g), h.push(_));
    }
    return Promise.all([
      Promise.all(o),
      Promise.all(a),
      Promise.all(c),
      Promise.all(l),
      Promise.all(h)
    ]).then(function(u) {
      const d = u[0], f = u[1], g = u[2], _ = u[3], p = u[4], m = [];
      for (let S = 0, x = d.length; S < x; S++) {
        const M = d[S], P = f[S], R = g[S], A = _[S], L = p[S];
        if (M === void 0) continue;
        M.updateMatrix && M.updateMatrix();
        const G = n._createAnimationTracks(M, P, R, A, L);
        if (G)
          for (let v = 0; v < G.length; v++)
            m.push(G[v]);
      }
      return new tx(r, void 0, m);
    });
  }
  createNodeMesh(t) {
    const e = this.json, n = this, s = e.nodes[t];
    return s.mesh === void 0 ? null : n.getDependency("mesh", s.mesh).then(function(r) {
      const o = n._getNodeRef(n.meshCache, s.mesh, r);
      return s.weights !== void 0 && o.traverse(function(a) {
        if (a.isMesh)
          for (let c = 0, l = s.weights.length; c < l; c++)
            a.morphTargetInfluences[c] = s.weights[c];
      }), o;
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#nodes-and-hierarchy
   * @param {number} nodeIndex
   * @return {Promise<Object3D>}
   */
  loadNode(t) {
    const e = this.json, n = this, s = e.nodes[t], r = n._loadNodeShallow(t), o = [], a = s.children || [];
    for (let l = 0, h = a.length; l < h; l++)
      o.push(n.getDependency("node", a[l]));
    const c = s.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", s.skin);
    return Promise.all([
      r,
      Promise.all(o),
      c
    ]).then(function(l) {
      const h = l[0], u = l[1], d = l[2];
      d !== null && h.traverse(function(f) {
        f.isSkinnedMesh && f.bind(d, yy);
      });
      for (let f = 0, g = u.length; f < g; f++)
        h.add(u[f]);
      return h;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(t) {
    const e = this.json, n = this.extensions, s = this;
    if (this.nodeCache[t] !== void 0)
      return this.nodeCache[t];
    const r = e.nodes[t], o = r.name ? s.createUniqueName(r.name) : "", a = [], c = s._invokeOne(function(l) {
      return l.createNodeMesh && l.createNodeMesh(t);
    });
    return c && a.push(c), r.camera !== void 0 && a.push(s.getDependency("camera", r.camera).then(function(l) {
      return s._getNodeRef(s.cameraCache, r.camera, l);
    })), s._invokeAll(function(l) {
      return l.createNodeAttachment && l.createNodeAttachment(t);
    }).forEach(function(l) {
      a.push(l);
    }), this.nodeCache[t] = Promise.all(a).then(function(l) {
      let h;
      if (r.isBone === !0 ? h = new Gu() : l.length > 1 ? h = new _t() : l.length === 1 ? h = l[0] : h = new de(), h !== l[0])
        for (let u = 0, d = l.length; u < d; u++)
          h.add(l[u]);
      if (r.name && (h.userData.name = r.name, h.name = o), Dn(h, r), r.extensions && hi(n, h, r), r.matrix !== void 0) {
        const u = new Dt();
        u.fromArray(r.matrix), h.applyMatrix4(u);
      } else
        r.translation !== void 0 && h.position.fromArray(r.translation), r.rotation !== void 0 && h.quaternion.fromArray(r.rotation), r.scale !== void 0 && h.scale.fromArray(r.scale);
      return s.associations.has(h) || s.associations.set(h, {}), s.associations.get(h).nodes = t, h;
    }), this.nodeCache[t];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(t) {
    const e = this.extensions, n = this.json.scenes[t], s = this, r = new _t();
    n.name && (r.name = s.createUniqueName(n.name)), Dn(r, n), n.extensions && hi(e, r, n);
    const o = n.nodes || [], a = [];
    for (let c = 0, l = o.length; c < l; c++)
      a.push(s.getDependency("node", o[c]));
    return Promise.all(a).then(function(c) {
      for (let h = 0, u = c.length; h < u; h++)
        r.add(c[h]);
      const l = (h) => {
        const u = /* @__PURE__ */ new Map();
        for (const [d, f] of s.associations)
          (d instanceof gn || d instanceof be) && u.set(d, f);
        return h.traverse((d) => {
          const f = s.associations.get(d);
          f != null && u.set(d, f);
        }), u;
      };
      return s.associations = l(r), r;
    });
  }
  _createAnimationTracks(t, e, n, s, r) {
    const o = [], a = t.name ? t.name : t.uuid, c = [];
    $n[r.path] === $n.weights ? t.traverse(function(d) {
      d.morphTargetInfluences && c.push(d.name ? d.name : d.uuid);
    }) : c.push(a);
    let l;
    switch ($n[r.path]) {
      case $n.weights:
        l = os;
        break;
      case $n.rotation:
        l = as;
        break;
      case $n.position:
      case $n.scale:
        l = cs;
        break;
      default:
        switch (n.itemSize) {
          case 1:
            l = os;
            break;
          case 2:
          case 3:
          default:
            l = cs;
            break;
        }
        break;
    }
    const h = s.interpolation !== void 0 ? py[s.interpolation] : Xs, u = this._getArrayFromAccessor(n);
    for (let d = 0, f = c.length; d < f; d++) {
      const g = new l(
        c[d] + "." + $n[r.path],
        e.array,
        u,
        h
      );
      s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(g), o.push(g);
    }
    return o;
  }
  _getArrayFromAccessor(t) {
    let e = t.array;
    if (t.normalized) {
      const n = nc(e.constructor), s = new Float32Array(e.length);
      for (let r = 0, o = e.length; r < o; r++)
        s[r] = e[r] * n;
      e = s;
    }
    return e;
  }
  _createCubicSplineTrackInterpolant(t) {
    t.createInterpolant = function(n) {
      const s = this instanceof as ? fy : ad;
      return new s(this.times, this.values, this.getValueSize() / 3, n);
    }, t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function Sy(i, t, e) {
  const n = t.attributes, s = new je();
  if (n.POSITION !== void 0) {
    const a = e.json.accessors[n.POSITION], c = a.min, l = a.max;
    if (c !== void 0 && l !== void 0) {
      if (s.set(
        new w(c[0], c[1], c[2]),
        new w(l[0], l[1], l[2])
      ), a.normalized) {
        const h = nc(Yi[a.componentType]);
        s.min.multiplyScalar(h), s.max.multiplyScalar(h);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const r = t.targets;
  if (r !== void 0) {
    const a = new w(), c = new w();
    for (let l = 0, h = r.length; l < h; l++) {
      const u = r[l];
      if (u.POSITION !== void 0) {
        const d = e.json.accessors[u.POSITION], f = d.min, g = d.max;
        if (f !== void 0 && g !== void 0) {
          if (c.setX(Math.max(Math.abs(f[0]), Math.abs(g[0]))), c.setY(Math.max(Math.abs(f[1]), Math.abs(g[1]))), c.setZ(Math.max(Math.abs(f[2]), Math.abs(g[2]))), d.normalized) {
            const _ = nc(Yi[d.componentType]);
            c.multiplyScalar(_);
          }
          a.max(c);
        } else
          console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      }
    }
    s.expandByVector(a);
  }
  i.boundingBox = s;
  const o = new Mn();
  s.getCenter(o.center), o.radius = s.min.distanceTo(s.max) / 2, i.boundingSphere = o;
}
function kh(i, t, e) {
  const n = t.attributes, s = [];
  function r(o, a) {
    return e.getDependency("accessor", o).then(function(c) {
      i.setAttribute(a, c);
    });
  }
  for (const o in n) {
    const a = ec[o] || o.toLowerCase();
    a in i.attributes || s.push(r(n[o], a));
  }
  if (t.indices !== void 0 && !i.index) {
    const o = e.getDependency("accessor", t.indices).then(function(a) {
      i.setIndex(a);
    });
    s.push(o);
  }
  return qt.workingColorSpace !== De && "COLOR_0" in n && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qt.workingColorSpace}" not supported.`), Dn(i, t), Sy(i, t, e), Promise.all(s).then(function() {
    return t.targets !== void 0 ? gy(i, t.targets, e) : i;
  });
}
const Me = 10251071, la = 7306636, te = 12106948, Fe = 15921906, Ce = 2830134, Cs = 8962256;
function X(i, t = {}) {
  return new us({
    color: i,
    roughness: 0.8,
    metalness: 0.05,
    ...t
  });
}
function J(i, t, e, n, s = 0, r = 0, o = 0) {
  const a = new ge(new ei(i, t, e), n);
  return a.position.set(s, r, o), a.castShadow = !0, a.receiveShadow = !0, a;
}
function zt(i, t, e, n, s = 0, r = 0, o = 0, a = 16) {
  const c = new ge(new Lc(i, t, e, a), n);
  return c.position.set(s, r, o), c.castShadow = !0, c.receiveShadow = !0, c;
}
function ht(i, t) {
  return i.material.color.copy(t), i;
}
const ic = {
  sofa: (i) => {
    const t = new _t(), e = X(la);
    return t.add(ht(J(1.9, 0.4, 0.85, e, 0, 0.2, 0), i)), t.add(ht(J(1.9, 0.5, 0.2, e, 0, 0.55, -0.32), i)), t.add(ht(J(0.2, 0.45, 0.85, e, -0.85, 0.5, 0), i)), t.add(ht(J(0.2, 0.45, 0.85, e, 0.85, 0.5, 0), i)), t;
  },
  bed: (i) => {
    const t = new _t();
    return t.add(J(1.6, 0.3, 2, X(Me), 0, 0.15, 0)), t.add(ht(J(1.55, 0.18, 1.95, X(Fe), 0, 0.39, 0), i)), t.add(J(1.6, 0.6, 0.1, X(Me), 0, 0.5, -0.95)), t.add(J(0.5, 0.12, 0.35, X(Fe), -0.45, 0.5, -0.7)), t.add(J(0.5, 0.12, 0.35, X(Fe), 0.45, 0.5, -0.7)), t;
  },
  table: (i) => {
    const t = new _t(), e = X(Me);
    t.add(ht(J(1.4, 0.06, 0.8, e, 0, 0.74, 0), i));
    const n = 0.62, s = 0.32;
    for (const [r, o] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(J(0.07, 0.74, 0.07, e, r * n, 0.37, o * s));
    return t;
  },
  chair: (i) => {
    const t = new _t(), e = X(Me);
    t.add(ht(J(0.45, 0.05, 0.45, e, 0, 0.45, 0), i)), t.add(ht(J(0.45, 0.45, 0.05, e, 0, 0.68, -0.2), i));
    const n = 0.18, s = 0.18;
    for (const [r, o] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(J(0.05, 0.45, 0.05, e, r * n, 0.22, o * s));
    return t;
  },
  wardrobe: (i) => {
    const t = new _t();
    return t.add(ht(J(1.2, 2, 0.6, X(Me), 0, 1, 0), i)), t.add(J(0.04, 1.8, 0.02, X(te), -0.02, 1, 0.31)), t.add(zt(0.02, 0.02, 0.15, X(te), -0.2, 1, 0.32)), t.add(zt(0.02, 0.02, 0.15, X(te), 0.16, 1, 0.32)), t;
  },
  kitchen_counter: (i) => {
    const t = new _t();
    return t.add(ht(J(2, 0.85, 0.6, X(Fe), 0, 0.425, 0), i)), t.add(J(2.05, 0.05, 0.65, X(Ce), 0, 0.875, 0)), t;
  },
  tv: (i) => {
    const t = new _t();
    t.add(J(1.2, 0.7, 0.05, X(Ce), 0, 0.95, 0));
    const e = J(1.1, 0.6, 0.02, X(657930, { emissive: 1119255 }), 0, 0.95, 0.03);
    return t.add(e), t.add(J(0.4, 0.05, 0.2, X(Ce), 0, 0.6, 0)), ht(t.children[0], i), t;
  },
  fridge: (i) => {
    const t = new _t();
    return t.add(ht(J(0.7, 1.8, 0.7, X(te), 0, 0.9, 0), i)), t.add(J(0.04, 0.1, 0.02, X(Ce), 0.3, 1.3, 0.36)), t.add(J(0.04, 0.1, 0.02, X(Ce), 0.3, 0.6, 0.36)), t;
  },
  sink: (i) => {
    const t = new _t();
    return t.add(ht(J(0.6, 0.8, 0.5, X(Fe), 0, 0.4, 0), i)), t.add(J(0.5, 0.08, 0.4, X(te), 0, 0.82, 0)), t.add(zt(0.02, 0.02, 0.25, X(te), 0, 0.95, -0.12)), t;
  },
  toilet: (i) => {
    const t = new _t();
    return t.add(ht(zt(0.22, 0.25, 0.4, X(Fe), 0, 0.2, 0.05), i)), t.add(J(0.35, 0.5, 0.18, X(Fe), 0, 0.45, -0.18)), t.add(zt(0.24, 0.24, 0.05, X(Fe), 0, 0.42, 0.05)), t;
  },
  door: (i) => {
    const t = new _t();
    return t.add(ht(J(0.85, 2, 0.05, X(Me), 0, 1, 0), i)), t.add(zt(0.03, 0.03, 0.1, X(te), 0.32, 1, 0.05)), t;
  },
  window_frame: (i) => {
    const t = new _t(), e = X(Fe);
    return t.add(ht(J(1, 0.05, 0.08, e, 0, 1.5, 0), i)), t.add(ht(J(1, 0.05, 0.08, e, 0, 0.9, 0), i)), t.add(J(0.05, 0.6, 0.08, e, -0.47, 1.2, 0)), t.add(J(0.05, 0.6, 0.08, e, 0.47, 1.2, 0)), t.add(J(0.9, 0.55, 0.01, X(Cs, { transparent: !0, opacity: 0.35 }), 0, 1.2, 0)), t;
  },
  ceiling_light: (i) => {
    const t = new _t(), e = zt(0.18, 0.22, 0.12, X(Fe, { emissive: 0 }), 0, 0, 0);
    return e.name = "emissive", t.add(ht(e, i)), t.add(zt(0.01, 0.01, 0.25, X(te), 0, 0.18, 0)), t;
  },
  ac_unit: (i) => {
    const t = new _t();
    return t.add(ht(J(0.9, 0.28, 0.18, X(Fe), 0, 0, 0), i)), t.add(J(0.8, 0.04, 0.02, X(Ce), 0, -0.1, 0.09)), t;
  },
  intercom: (i) => {
    const t = new _t();
    t.add(ht(J(0.16, 0.26, 0.04, X(Ce), 0, 0, 0), i));
    const e = J(0.12, 0.14, 0.01, X(1053720, { emissive: 666170 }), 0, 0.03, 0.025);
    return e.name = "emissive", t.add(e), t;
  },
  armchair: (i) => {
    const t = new _t(), e = X(la);
    return t.add(ht(J(0.85, 0.4, 0.85, e, 0, 0.2, 0), i)), t.add(ht(J(0.85, 0.5, 0.18, e, 0, 0.55, -0.33), i)), t.add(ht(J(0.16, 0.45, 0.85, e, -0.42, 0.5, 0), i)), t.add(ht(J(0.16, 0.45, 0.85, e, 0.42, 0.5, 0), i)), t;
  },
  coffee_table: (i) => {
    const t = new _t();
    t.add(ht(J(1, 0.05, 0.55, X(Me), 0, 0.4, 0), i));
    for (const [e, n] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(J(0.06, 0.4, 0.06, X(Me), e * 0.42, 0.2, n * 0.22));
    return t;
  },
  dining_table: (i) => {
    const t = new _t();
    t.add(ht(J(1.8, 0.06, 0.95, X(Me), 0, 0.75, 0), i));
    for (const [e, n] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(J(0.08, 0.75, 0.08, X(Me), e * 0.8, 0.37, n * 0.4));
    return t;
  },
  bookshelf: (i) => {
    const t = new _t();
    t.add(ht(J(1, 1.8, 0.32, X(Me), 0, 0.9, 0), i));
    for (let e = 1; e <= 4; e++) t.add(J(0.94, 0.03, 0.3, X(Ce), 0, e * 0.36, 0));
    return t;
  },
  desk: (i) => {
    const t = new _t();
    return t.add(ht(J(1.3, 0.05, 0.65, X(Me), 0, 0.74, 0), i)), t.add(J(0.5, 0.7, 0.6, X(Ce), 0.35, 0.37, 0)), t.add(J(0.05, 0.74, 0.6, X(Me), -0.6, 0.37, 0)), t;
  },
  office_chair: (i) => {
    const t = new _t();
    return t.add(ht(J(0.5, 0.06, 0.5, X(Ce), 0, 0.5, 0), i)), t.add(ht(J(0.5, 0.5, 0.06, X(Ce), 0, 0.78, -0.22), i)), t.add(zt(0.04, 0.04, 0.45, X(te), 0, 0.25, 0)), t.add(zt(0.26, 0.26, 0.04, X(te), 0, 0.04, 0)), t;
  },
  nightstand: (i) => {
    const t = new _t();
    return t.add(ht(J(0.45, 0.5, 0.4, X(Me), 0, 0.25, 0), i)), t.add(J(0.4, 0.02, 0.02, X(te), 0, 0.32, 0.21)), t;
  },
  dresser: (i) => {
    const t = new _t();
    t.add(ht(J(1.1, 0.85, 0.5, X(Me), 0, 0.42, 0), i));
    for (let e = 0; e < 3; e++) t.add(J(0.9, 0.02, 0.02, X(te), 0, 0.2 + e * 0.25, 0.26));
    return t;
  },
  stove: (i) => {
    const t = new _t();
    t.add(ht(J(0.6, 0.85, 0.6, X(te), 0, 0.42, 0), i)), t.add(J(0.55, 0.02, 0.55, X(Ce), 0, 0.86, 0));
    for (const [e, n] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(zt(0.08, 0.08, 0.01, X(2236962), e * 0.13, 0.875, n * 0.13));
    return t;
  },
  microwave: (i) => {
    const t = new _t();
    return t.add(ht(J(0.5, 0.3, 0.35, X(Ce), 0, 0.15, 0), i)), t.add(J(0.32, 0.22, 0.01, X(1053720, { emissive: 662050 }), -0.05, 0.15, 0.18)), t;
  },
  dishwasher: (i) => {
    const t = new _t();
    return t.add(ht(J(0.6, 0.85, 0.6, X(te), 0, 0.42, 0), i)), t.add(J(0.5, 0.02, 0.02, X(Ce), 0, 0.75, 0.31)), t;
  },
  washing_machine: (i) => {
    const t = new _t();
    return t.add(ht(J(0.6, 0.85, 0.6, X(Fe), 0, 0.42, 0), i)), t.add(zt(0.2, 0.2, 0.04, X(Ce), 0, 0.45, 0.31).rotateX(Math.PI / 2)), t;
  },
  bathtub: (i) => {
    const t = new _t();
    return t.add(ht(J(1.6, 0.55, 0.75, X(Fe), 0, 0.275, 0), i)), t.add(J(1.45, 0.2, 0.6, X(14675698), 0, 0.4, 0)), t;
  },
  shower: (i) => {
    const t = new _t();
    return t.add(ht(J(0.9, 0.04, 0.9, X(Fe), 0, 0.02, 0), i)), t.add(J(0.04, 2, 0.9, X(Cs, { transparent: !0, opacity: 0.25 }), -0.43, 1, 0)), t.add(J(0.9, 2, 0.04, X(Cs, { transparent: !0, opacity: 0.25 }), 0, 1, -0.43)), t.add(zt(0.06, 0.06, 0.04, X(te), 0.3, 1.9, 0.3)), t;
  },
  mirror: (i) => {
    const t = new _t();
    return t.add(ht(J(0.6, 0.9, 0.04, X(te), 0, 0, 0), i)), t.add(J(0.5, 0.8, 0.01, X(11195616, { metalness: 0.9, roughness: 0.1 }), 0, 0, 0.03)), t;
  },
  plant: (i) => {
    const t = new _t();
    return t.add(zt(0.16, 0.2, 0.3, X(9067056), 0, 0.15, 0)), t.add(ht(new ge(new Dc(0.32, 0), X(4160831)), i).translateY(0.6)), t;
  },
  rug: (i) => {
    const t = new _t();
    return t.add(ht(J(2, 0.02, 1.4, X(8930372), 0, 0.012, 0), i)), t;
  },
  stairs: (i) => {
    const t = new _t(), e = 8;
    for (let n = 0; n < e; n++)
      t.add(ht(J(1, 0.18, 0.3, X(Me), 0, 0.09 + n * 0.18, -n * 0.3), i));
    return t;
  },
  curtain: (i) => {
    const t = new _t();
    return t.add(ht(J(1.4, 1.8, 0.05, X(la), 0, 1.4, 0), i)), t;
  },
  painting: (i) => {
    const t = new _t();
    return t.add(ht(J(0.7, 0.5, 0.04, X(Me), 0, 0, 0), i)), t.add(J(0.6, 0.4, 0.01, X(6719658), 0, 0, 0.03)), t;
  },
  speaker: (i) => {
    const t = new _t();
    return t.add(ht(J(0.25, 0.4, 0.25, X(Ce), 0, 0.2, 0), i)), t.add(zt(0.08, 0.08, 0.01, X(1118481), 0, 0.26, 0.13).rotateX(Math.PI / 2)), t;
  },
  security_camera: (i) => {
    const t = new _t();
    t.add(ht(zt(0.06, 0.06, 0.18, X(Fe), 0, 0, 0), i));
    const e = zt(0.04, 0.04, 0.04, X(1053720, { emissive: 3145728 }), 0, 0, 0.1);
    return e.name = "emissive", e.rotateX(Math.PI / 2), t.add(e), t;
  },
  radiator: (i) => {
    const t = new _t();
    for (let e = 0; e < 8; e++) t.add(ht(J(0.06, 0.6, 0.1, X(Fe), -0.35 + e * 0.1, 0.4, 0), i));
    return t;
  },
  // ---- Lighting (освещение) — each has an 'emissive' mesh + reads as a lamp ----
  floor_lamp: (i) => {
    const t = new _t();
    t.add(zt(0.18, 0.22, 0.03, X(te), 0, 0.015, 0)), t.add(zt(0.02, 0.02, 1.5, X(te), 0, 0.75, 0));
    const e = zt(0.18, 0.25, 0.28, X(16774358, { emissive: 0 }), 0, 1.55, 0);
    return e.name = "emissive", t.add(ht(e, i)), t;
  },
  table_lamp: (i) => {
    const t = new _t();
    t.add(zt(0.1, 0.12, 0.03, X(te), 0, 0.015, 0)), t.add(zt(0.015, 0.015, 0.3, X(te), 0, 0.18, 0));
    const e = zt(0.12, 0.16, 0.18, X(16774358, { emissive: 0 }), 0, 0.42, 0);
    return e.name = "emissive", t.add(ht(e, i)), t;
  },
  wall_light: (i) => {
    const t = new _t();
    t.add(J(0.12, 0.2, 0.08, X(te), 0, 0, 0));
    const e = J(0.1, 0.16, 0.04, X(16774358, { emissive: 0 }), 0, 0, 0.06);
    return e.name = "emissive", t.add(ht(e, i)), t;
  },
  chandelier: (i) => {
    const t = new _t();
    t.add(zt(0.01, 0.01, 0.3, X(te), 0, 0.15, 0)), t.add(zt(0.25, 0.3, 0.04, X(te), 0, 0, 0));
    for (let e = 0; e < 6; e++) {
      const n = e / 6 * Math.PI * 2, s = new ge(
        new mo(0.06, 10, 10),
        X(16774358, { emissive: 0 })
      );
      s.name = "emissive", s.position.set(Math.cos(n) * 0.28, -0.05, Math.sin(n) * 0.28), t.add(ht(s, i));
    }
    return t;
  },
  spotlight: (i) => {
    const t = new _t();
    t.add(zt(0.05, 0.07, 0.06, X(te), 0, 0, 0));
    const e = zt(0.05, 0.05, 0.01, X(16774358, { emissive: 0 }), 0, -0.03, 0);
    return e.name = "emissive", t.add(ht(e, i)), t;
  },
  pendant_light: (i) => {
    const t = new _t();
    t.add(zt(8e-3, 8e-3, 0.4, X(Ce), 0, 0.2, 0));
    const e = zt(0.16, 0.05, 0.2, X(16774358, { emissive: 0 }), 0, -0.1, 0);
    return e.name = "emissive", t.add(ht(e, i)), t;
  },
  led_strip: (i) => {
    const t = new _t(), e = J(1.5, 0.03, 0.04, X(16777215, { emissive: 0 }), 0, 0, 0);
    return e.name = "emissive", t.add(ht(e, i)), t;
  },
  double_door: (i) => {
    const t = new _t();
    return t.add(ht(J(0.7, 2, 0.05, X(Me), -0.36, 1, 0), i)), t.add(ht(J(0.7, 2, 0.05, X(Me), 0.36, 1, 0), i)), t.add(zt(0.025, 0.025, 0.1, X(te), -0.05, 1, 0.05)), t.add(zt(0.025, 0.025, 0.1, X(te), 0.05, 1, 0.05)), t;
  },
  sliding_door: (i) => {
    const t = new _t();
    return t.add(J(1.6, 0.06, 0.08, X(te), 0, 2.05, 0)), t.add(ht(J(0.78, 1.95, 0.04, X(Cs, { transparent: !0, opacity: 0.4 }), -0.4, 1, 0), i)), t.add(ht(J(0.78, 1.95, 0.04, X(Cs, { transparent: !0, opacity: 0.4 }), 0.4, 1, 0.05), i)), t;
  },
  wall_panel: (i) => {
    const t = new _t();
    return t.add(ht(J(1.5, 2.6, 0.12, X(15132390), 0, 1.3, 0), i)), t;
  },
  arch: (i) => {
    const t = new _t();
    return t.add(ht(J(0.15, 2, 0.25, X(15132390), -0.6, 1, 0), i)), t.add(ht(J(0.15, 2, 0.25, X(15132390), 0.6, 1, 0), i)), t.add(ht(J(1.35, 0.25, 0.25, X(15132390), 0, 2.1, 0), i)), t;
  },
  bar_stool: (i) => {
    const t = new _t();
    return t.add(ht(zt(0.18, 0.18, 0.05, X(Me), 0, 0.66, 0), i)), t.add(zt(0.03, 0.03, 0.66, X(te), 0, 0.33, 0)), t.add(zt(0.2, 0.2, 0.02, X(te), 0, 0.02, 0)), t;
  },
  tv_stand: (i) => {
    const t = new _t();
    return t.add(ht(J(1.4, 0.4, 0.4, X(Ce), 0, 0.2, 0), i)), t.add(J(0.6, 0.02, 0.36, X(te), -0.35, 0.41, 0)), t;
  },
  // Generic fallback marker so an unknown model key still renders something.
  marker: (i) => {
    const t = new _t();
    return t.add(ht(zt(0, 0.12, 0.3, X(16733525), 0, 0.15, 0, 8), i)), t;
  }
}, Ey = Object.keys(ic).filter((i) => i !== "marker"), sc = [
  "ceiling_light",
  "floor_lamp",
  "table_lamp",
  "wall_light",
  "chandelier",
  "spotlight",
  "pendant_light",
  "led_strip"
];
function by(i) {
  if (sc.includes(i)) return ["light", "switch"];
  switch (i) {
    case "ac_unit":
      return ["climate", "fan", "switch"];
    case "tv":
    case "tv_stand":
      return ["media_player", "switch"];
    case "speaker":
      return ["media_player"];
    case "curtain":
      return ["cover"];
    case "door":
    case "double_door":
    case "sliding_door":
      return ["lock", "cover", "binary_sensor"];
    case "security_camera":
      return ["camera", "binary_sensor"];
    case "intercom":
      return ["camera", "lock", "binary_sensor"];
    case "fridge":
    case "washing_machine":
    case "dishwasher":
    case "stove":
    case "oven":
    case "microwave":
      return ["switch", "sensor", "binary_sensor"];
    case "toilet":
    case "bathtub":
    case "shower":
    case "sink":
      return ["sensor", "binary_sensor", "switch"];
    default:
      return [];
  }
}
function Ty(i, t = 2.6) {
  return i === "ceiling_light" || i === "chandelier" || i === "pendant_light" ? t - 0.05 : i === "spotlight" || i === "led_strip" ? t - 0.02 : i === "wall_light" || i === "ac_unit" || i === "security_camera" ? 2 : i === "painting" || i === "mirror" || i === "tv" || i === "intercom" ? 1.4 : i === "curtain" ? 0.1 : 0;
}
function rc(i, t) {
  const e = ic[i] ?? ic.marker, n = new Tt(t ?? "#ffffff"), s = e(n);
  return s.userData.model = i, s;
}
const Ay = new Vx(), Hh = /* @__PURE__ */ new Map();
function wy(i) {
  let t = Hh.get(i);
  return t || (t = new Promise((e, n) => {
    Ay.load(
      i,
      (s) => {
        s.scene.traverse((r) => {
          r.castShadow = !0, r.receiveShadow = !0;
        }), e(s.scene);
      },
      void 0,
      (s) => n(s)
    );
  }), Hh.set(i, t)), t;
}
function Vh(i, t) {
  i.position.set(t.position[0], t.position[1], t.position[2]), t.rotation && (i.rotation.y = ji.degToRad(t.rotation));
  const e = t.scale ?? 1;
  Array.isArray(e) ? i.scale.set(e[0], e[1], e[2]) : i.scale.setScalar(e);
}
function Ry(i, t) {
  if (!t) return;
  const e = new Tt(t);
  i.traverse((n) => {
    const s = n;
    if (s.isMesh && s.material) {
      const r = s.material.clone();
      r.color && r.color.multiply(e), s.material = r;
    }
  });
}
function Cy(i) {
  if (i.glb) {
    const e = new _t();
    Vh(e, i), e.userData.furnitureId = i.id;
    const n = rc("marker", i.color);
    return e.add(n), wy(i.glb).then((s) => {
      const r = s.clone(!0);
      Ry(r, i.color), e.remove(n), e.add(r);
    }).catch((s) => {
      console.error(`[3d-floorplan] failed to load GLB "${i.glb}":`, s);
    }), e;
  }
  const t = rc(i.model, i.color);
  return Vh(t, i), t.userData.furnitureId = i.id, t;
}
class cd {
  constructor(t = 1) {
    this.current = "", this.canvas = document.createElement("canvas"), this.canvas.width = 256, this.canvas.height = 128, this.ctx = this.canvas.getContext("2d"), this.texture = new gv(this.canvas), this.texture.anisotropy = 4;
    const e = new Hu({
      map: this.texture,
      transparent: !0,
      depthWrite: !1,
      depthTest: !1
    });
    this.sprite = new cv(e), this.sprite.scale.set(1 * t, 0.5 * t, 1), this.sprite.renderOrder = 999;
  }
  setText(t, e = "#ffffff") {
    if (t === this.current) return;
    this.current = t;
    const n = this.ctx;
    n.clearRect(0, 0, this.canvas.width, this.canvas.height), n.fillStyle = "rgba(20,22,26,0.78)", Py(n, 8, 28, 240, 72, 16), n.fill(), n.fillStyle = e, n.font = "bold 48px system-ui, sans-serif", n.textAlign = "center", n.textBaseline = "middle", n.fillText(t, 128, 64, 224), this.texture.needsUpdate = !0;
  }
  setPosition(t, e, n) {
    this.sprite.position.set(t, e, n);
  }
  dispose() {
    this.texture.dispose(), this.sprite.material.dispose();
  }
}
function Py(i, t, e, n, s, r) {
  i.beginPath(), i.moveTo(t + r, e), i.arcTo(t + n, e, t + n, e + s, r), i.arcTo(t + n, e + s, t, e + s, r), i.arcTo(t, e + s, t, e, r), i.arcTo(t, e, t + n, e, r), i.closePath();
}
const Ly = 2.6, Iy = 0.12;
function Dy(i) {
  return new us({
    color: i ?? "#e6e6e6",
    roughness: 0.95,
    metalness: 0
  });
}
function kr(i, t, e, n, s, r, o, a, c, l) {
  const h = r - s;
  if (h <= 1e-4) return;
  const u = a - o;
  if (u <= 1e-4) return;
  const d = new ei(h, u, c), f = new ge(d, l);
  f.castShadow = !0, f.receiveShadow = !0;
  const g = s + h / 2, _ = t.x + e.x * g, p = t.y + e.y * g;
  f.position.set(_, o + u / 2, p), f.rotation.y = n, i.add(f);
}
function Ny(i, t, e) {
  const n = new tt(t.start[0], t.start[1]), r = new tt(t.end[0], t.end[1]).clone().sub(n), o = r.length();
  if (o <= 1e-4) return;
  const a = r.clone().normalize(), l = -Math.atan2(a.y, a.x), h = t.height ?? e, u = t.thickness ?? Iy, d = Dy(t.color), f = [...t.openings ?? []].sort((_, p) => _.position - p.position);
  let g = 0;
  for (const _ of f) {
    const p = Gh(_.position, 0, o), m = Gh(_.position + _.width, 0, o);
    kr(i, n, a, l, g, p, 0, h, u, d);
    const S = _.sill ?? (_.kind === "window" ? 0.9 : 0), x = _.top ?? (_.kind === "window" ? 2.1 : 2.05);
    S > 0 && kr(i, n, a, l, p, m, 0, S, u, d), x < h && kr(i, n, a, l, p, m, x, h, u, d), g = Math.max(g, m);
  }
  kr(i, n, a, l, g, o, 0, h, u, d);
}
function Uy(i, t) {
  if (!t.polygon || t.polygon.length < 3) return null;
  const e = new Ku();
  t.polygon.forEach((a, c) => {
    c === 0 ? e.moveTo(a[0], a[1]) : e.lineTo(a[0], a[1]);
  }), e.closePath();
  const n = new Nc(e);
  n.rotateX(Math.PI / 2);
  const s = new ge(
    n,
    new us({
      color: t.color ?? "#cfc7ba",
      roughness: 1,
      metalness: 0,
      side: fn
    })
  );
  s.position.y = 5e-3, s.receiveShadow = !0, i.add(s);
  let r = 0, o = 0;
  for (const a of t.polygon)
    r += a[0], o += a[1];
  return new tt(r / t.polygon.length, o / t.polygon.length);
}
function Oy(i, t) {
  const e = new _t();
  e.position.y = i.elevation ?? 0;
  const n = i.wallHeight ?? t ?? Ly, s = [];
  for (const a of i.rooms ?? []) {
    const c = Uy(e, a);
    if (c && a.name) {
      const l = new cd(1.4);
      l.setText(a.name, "#e8e8e8"), l.setPosition(c.x, 0.05, c.y), s.push(l), e.add(l.sprite);
    }
  }
  for (const a of i.walls ?? [])
    Ny(e, a, n);
  const r = /* @__PURE__ */ new Map();
  for (const a of i.furniture ?? []) {
    const c = Cy(a);
    e.add(c), a.id && r.set(a.id, c);
  }
  const o = new je().setFromObject(e);
  return { group: e, furnitureById: r, bbox: o, labels: s };
}
function Gh(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
const Fy = /* @__PURE__ */ new Set(["light", "switch", "fan", "cover", "media_player"]);
function ld(i) {
  return i.split(".")[0];
}
function By(i) {
  return i.behavior && i.behavior !== "auto" ? i.behavior : ld(i.entity_id);
}
function zy(i) {
  const t = [];
  i.traverse((n) => {
    const s = n;
    s.isMesh && (s.name === "emissive" ? t.unshift(s) : t.push(s));
  });
  const e = t.filter((n) => n.name === "emissive");
  return e.length ? e : t;
}
class ky {
  constructor(t) {
    this.bindings = [], this.byEntity = /* @__PURE__ */ new Map(), this.root = t;
  }
  /** Register all bindings for a freshly built floor. */
  register(t, e) {
    for (const n of e) {
      const s = By(n);
      let r = null;
      const o = new w();
      n.anchor_object && t.furnitureById.has(n.anchor_object) ? (r = t.furnitureById.get(n.anchor_object), r.getWorldPosition(o)) : n.anchor ? (o.set(n.anchor[0], n.anchor[1], n.anchor[2]), o.y += t.group.position.y) : (t.bbox.getCenter(o), o.y = t.group.position.y + 1.5);
      const a = {
        def: n,
        behavior: s,
        anchor: r,
        worldPos: o,
        emissiveMeshes: r ? zy(r) : []
      };
      this.setupVisual(a, t), this.bindings.push(a), this.byEntity.has(n.entity_id) || this.byEntity.set(n.entity_id, []), this.byEntity.get(n.entity_id).push(a), r && (r.userData.bindingEntity = n.entity_id);
    }
  }
  setupVisual(t, e) {
    const { behavior: n, worldPos: s } = t;
    if (n === "light") {
      const r = new id(16773584, 0, 8, 2);
      r.position.copy(s), r.castShadow = !1, this.root.add(r), t.pointLight = r;
    }
    if (n === "climate" || n === "sensor" || n === "binary_sensor" || n === "lock" || n === "media_player" || n === "label") {
      const r = new cd(1.2), o = t.anchor ? 0.6 : 0;
      r.setPosition(s.x, s.y + o + 0.4, s.z), this.root.add(r.sprite), e.labels.push(r), t.label = r;
    }
    n === "fan" && (t.spin = t.anchor ?? void 0);
  }
  /** Apply current HA state to all bindings. Only changed entities do work. */
  update(t) {
    for (const e of this.bindings) {
      const n = t.states[e.def.entity_id];
      this.applyState(e, n);
    }
  }
  /** Targeted update for a single entity (used on subscribed state changes). */
  updateEntity(t, e) {
    const n = this.byEntity.get(t);
    if (!n) return;
    const s = e.states[t];
    for (const r of n) this.applyState(r, s);
  }
  applyState(t, e) {
    const n = e?.state ?? "unavailable", s = t.def.label ?? e?.attributes?.friendly_name ?? t.def.entity_id;
    switch (t.behavior) {
      case "light": {
        const r = n === "on", o = (e?.attributes?.brightness ?? 255) / 255;
        t.pointLight && (t.pointLight.intensity = r ? 2.5 * o : 0), this.setEmissive(t, r ? 16773584 : 0, r ? o : 0);
        break;
      }
      case "switch":
      case "media_player": {
        const r = n === "on" || n === "playing" || n === "home";
        this.setEmissive(t, r ? 5230698 : 0, r ? 0.6 : 0), t.label && t.behavior === "media_player" && t.label.setText(n, r ? "#7CFC8A" : "#cccccc");
        break;
      }
      case "climate": {
        const r = e?.attributes?.current_temperature, o = e?.attributes?.temperature, a = r != null ? `${r}°${o != null ? ` → ${o}°` : ""}` : n;
        t.label?.setText(a, "#9ad0ff");
        break;
      }
      case "sensor":
      case "label": {
        const r = e?.attributes?.unit_of_measurement ?? "";
        t.label?.setText(`${Wh(s)}: ${n}${r}`, "#ffe7a0");
        break;
      }
      case "binary_sensor": {
        const r = n === "on";
        t.label?.setText(
          `${Wh(s)}: ${r ? "ON" : "off"}`,
          r ? "#ff8080" : "#bbbbbb"
        ), this.setEmissive(t, r ? 16733525 : 0, r ? 0.5 : 0);
        break;
      }
      case "lock": {
        const r = n === "locked";
        t.label?.setText(
          r ? "🔒 locked" : "🔓 unlocked",
          r ? "#7CFC8A" : "#ff8080"
        ), this.setEmissive(t, r ? 5230698 : 16733525, 0.5);
        break;
      }
      case "cover": {
        const r = n === "open";
        this.setEmissive(t, r ? 5230698 : 0, r ? 0.4 : 0);
        break;
      }
      case "fan": {
        t.spin = n === "on" ? t.anchor ?? void 0 : void 0;
        break;
      }
    }
    t.lastState = n;
  }
  setEmissive(t, e, n) {
    for (const s of t.emissiveMeshes) {
      const r = s.material;
      !r || !("emissive" in r) || (r.emissive.setHex(e), r.emissiveIntensity = n, r.needsUpdate = !1);
    }
  }
  /** Per-frame animation for fans etc. */
  animate(t) {
    for (const e of this.bindings)
      e.behavior === "fan" && e.spin && (e.spin.rotation.y += t * 6);
  }
  /**
   * Given a clicked Object3D, walk up to find a bound anchor and return the
   * action to perform. Returns null if the object isn't bound.
   */
  resolveClick(t) {
    let e = t;
    for (; e; ) {
      const n = e.userData?.bindingEntity;
      if (n) {
        const s = this.byEntity.get(n)?.[0];
        return { entity_id: n, behavior: s?.behavior ?? "auto" };
      }
      e = e.parent;
    }
    return null;
  }
  /** All anchor objects, for raycasting. */
  get anchors() {
    return this.bindings.map((t) => t.anchor).filter((t) => !!t);
  }
  dispose() {
    for (const t of this.bindings)
      t.pointLight && this.root.remove(t.pointLight);
    this.bindings = [], this.byEntity.clear();
  }
}
function Hy(i, t) {
  const e = ld(i), n = { entity_id: i };
  switch (t) {
    case "light":
      return { domain: "light", service: "toggle", data: n };
    case "switch":
      return { domain: "switch", service: "toggle", data: n };
    case "fan":
      return { domain: "fan", service: "toggle", data: n };
    case "cover":
      return { domain: "cover", service: "toggle", data: n };
    case "media_player":
      return { domain: "media_player", service: "media_play_pause", data: n };
    case "lock":
      return null;
    default:
      return Fy.has(e) ? { domain: e, service: "toggle", data: n } : null;
  }
}
function Wh(i) {
  return i.length > 18 ? i.slice(0, 16) + "…" : i;
}
class Vy {
  constructor(t, e = "#1b1d22") {
    this.clock = new px(), this.running = !1, this.rafId = 0, this.floors = [], this.floorGroups = [], this.bindingManagers = [], this.activeFloor = 0, this.fullBBox = new je(), this.raycaster = new bx(), this.pointer = new tt(), this.downPos = { x: 0, y: 0 }, this.downTime = 0, this.previewGroup = new _t(), this.editing = !1, this.groundPlane = new Nn(new w(0, 1, 0), 0), this.container = t, this.renderer = new Bu({ antialias: !0, alpha: !1 }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = au, this.renderer.domElement.style.touchAction = "none", this.renderer.domElement.style.display = "block", this.renderer.domElement.style.width = "100%", this.renderer.domElement.style.height = "100%", t.appendChild(this.renderer.domElement), this.scene = new zu(), this.scene.background = new Tt(e), this.scene.add(this.previewGroup), this.camera = new Be(55, 1, 0.1, 1e3), this.camera.position.set(8, 8, 8), this.controls = new Cx(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.dampingFactor = 0.12, this.controls.screenSpacePanning = !1, this.controls.minDistance = 2, this.controls.maxDistance = 40, this.controls.maxPolarAngle = Math.PI * 0.49, this.controls.touches = {
      ONE: dn.ROTATE,
      TWO: dn.DOLLY_PAN
    }, this.controls.addEventListener("change", () => this.clampTarget()), this.setupLights(), this.setupResize(), this.setupPointer();
  }
  setupLights() {
    const t = new sd(16777215, 0.55);
    this.scene.add(t);
    const e = new Fc(16777215, 0.9);
    e.position.set(10, 18, 8), e.castShadow = !0, e.shadow.mapSize.set(1024, 1024), e.shadow.camera.near = 1, e.shadow.camera.far = 60;
    const n = 20;
    e.shadow.camera.left = -n, e.shadow.camera.right = n, e.shadow.camera.top = n, e.shadow.camera.bottom = -n, this.scene.add(e);
    const s = new cx(16777215, 4473941, 0.4);
    this.scene.add(s);
  }
  setupResize() {
    this.resizeObserver = new ResizeObserver(() => this.resize()), this.resizeObserver.observe(this.container), this.resize();
  }
  resize() {
    const t = this.container.clientWidth || 1, e = this.container.clientHeight || 1;
    this.renderer.setSize(t, e, !1), this.camera.aspect = t / e, this.camera.updateProjectionMatrix();
  }
  // -- Floor plan loading -----------------------------------------------------
  loadPlan(t, e = !1) {
    const n = this.controls.target.clone(), s = this.camera.position.clone(), r = this.activeFloor;
    this.clearPlan(), this.fullBBox.makeEmpty(), t.floors.forEach((a) => {
      const c = Oy(a, t.wallHeight), l = new ky(c.group);
      l.register(c, a.bindings ?? []), this.scene.add(c.group), this.floors.push(c), this.floorGroups.push(c.group), this.bindingManagers.push(l), this.fullBBox.union(c.bbox);
    });
    const o = e ? Math.min(r, this.floors.length - 1) : 0;
    this.activeFloor = Math.max(0, o), this.floorGroups.forEach((a, c) => a.visible = c === this.activeFloor), e ? (this.controls.target.copy(n), this.camera.position.copy(s), this.controls.update()) : this.resetView();
  }
  clearPlan() {
    for (const t of this.bindingManagers) t.dispose();
    for (const t of this.floorGroups)
      this.scene.remove(t), Gy(t);
    this.floors = [], this.floorGroups = [], this.bindingManagers = [], this.activeFloor = 0;
  }
  get floorCount() {
    return this.floors.length;
  }
  setActiveFloor(t) {
    t < 0 || t >= this.floors.length || (this.activeFloor = t, this.floorGroups.forEach((e, n) => {
      e.visible = n === t;
    }), this.resetView());
  }
  get currentFloor() {
    return this.activeFloor;
  }
  // -- Camera / touch hardening ----------------------------------------------
  /** Recenter on the visible floor's bounding box. The kiosk safety net. */
  resetView() {
    let t = this.floors[this.activeFloor]?.bbox ?? this.fullBBox;
    (!t || t.isEmpty()) && (t = new je(
      new w(-4, 0, -4),
      new w(4, 2.6, 4)
    ));
    const e = t.getCenter(new w()), n = t.getSize(new w()), s = Math.max(n.x, n.z, 2);
    this.controls.target.copy(e);
    const r = s * 1.4 + 4;
    this.camera.position.set(e.x + r * 0.7, e.y + r * 0.8, e.z + r * 0.7), this.controls.maxDistance = r * 2.2, this.controls.minDistance = Math.max(1.5, s * 0.15), this.camera.lookAt(e), this.controls.update();
  }
  /** Keep the orbit target from drifting outside the floor bbox + margin. */
  clampTarget() {
    const t = this.floors[this.activeFloor]?.bbox ?? this.fullBBox;
    if (t.isEmpty()) return;
    const e = 3, n = this.controls.target;
    n.x = ji.clamp(n.x, t.min.x - e, t.max.x + e), n.z = ji.clamp(n.z, t.min.z - e, t.max.z + e), n.y = ji.clamp(n.y, t.min.y, t.max.y + 1);
  }
  // -- Picking ----------------------------------------------------------------
  setPickHandler(t) {
    this.onPick = t;
  }
  setupPointer() {
    const t = this.renderer.domElement;
    t.addEventListener("pointerdown", (e) => {
      this.downPos = { x: e.clientX, y: e.clientY }, this.downTime = performance.now();
    }), t.addEventListener("pointerup", (e) => {
      const n = e.clientX - this.downPos.x, s = e.clientY - this.downPos.y, r = Math.hypot(n, s), o = performance.now() - this.downTime;
      if (!(r >= 8 || o >= 600))
        if (this.editing && this.onGround?.click) {
          const a = this.groundIntersect(e);
          a && this.onGround.click(a, e);
        } else
          this.handlePick(e);
    }), t.addEventListener("pointermove", (e) => {
      if (this.editing && this.onGround?.move) {
        const n = this.groundIntersect(e);
        n && this.onGround.move(n, e);
      }
    });
  }
  // -- Editor API -------------------------------------------------------------
  setEditMode(t, e = 0) {
    this.editing = t, this.groundPlane.constant = -e, t ? (this.gridHelper || (this.gridHelper = new Tx(40, 80, 4891647, 2765632), this.gridHelper.material.transparent = !0, this.gridHelper.material.opacity = 0.5, this.scene.add(this.gridHelper)), this.gridHelper.position.y = e + 2e-3, this.gridHelper.visible = !0) : (this.gridHelper && (this.gridHelper.visible = !1), this.clearPreview(), this.setSelection(null));
  }
  /** Raycast a pointer event against the active floor; return the furniture
   *  placement it hits (by id), walking up to the placement group. */
  pickFurniture(t) {
    const e = this.floorGroups[this.activeFloor];
    if (!e) return null;
    const n = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = (t.clientX - n.left) / n.width * 2 - 1, this.pointer.y = -((t.clientY - n.top) / n.height) * 2 + 1, this.raycaster.setFromCamera(this.pointer, this.camera);
    const s = this.raycaster.intersectObject(e, !0);
    for (const r of s) {
      let o = r.object;
      for (; o; ) {
        const a = o.userData?.furnitureId;
        if (a) return { id: a, object: o };
        o = o.parent;
      }
    }
    return null;
  }
  getFurnitureObject(t) {
    return this.floors[this.activeFloor]?.furnitureById.get(t);
  }
  /** Highlight a selected object with a bounding box, or clear it. */
  setSelection(t) {
    this.selectionHelper && (this.scene.remove(this.selectionHelper), this.selectionHelper.geometry.dispose(), this.selectionHelper = void 0), t && (this.selectionHelper = new Ax(t, 5230698), this.scene.add(this.selectionHelper));
  }
  setGroundHandler(t) {
    this.onGround = t;
  }
  /** Enable/disable camera orbit + pan (zoom stays on so you never get stuck). */
  setControlsEnabled(t) {
    this.controls.enableRotate = t, this.controls.enablePan = t;
  }
  /**
   * In draw mode, the LEFT mouse / single finger performs the editor action
   * (draw, place, select) while RIGHT mouse / two fingers always orbit + zoom —
   * so you never have to switch to a "View" tool to move the camera. In view
   * mode, the usual controls apply.
   */
  setDrawMode(t) {
    this.controls.enabled = !0, this.controls.enableRotate = !0, this.controls.enableZoom = !0, this.controls.enablePan = !0, t ? (this.controls.mouseButtons = {
      LEFT: null,
      // left is reserved for the editor tool
      MIDDLE: un.DOLLY,
      RIGHT: un.ROTATE
    }, this.controls.touches = { ONE: null, TWO: dn.DOLLY_PAN }) : (this.controls.mouseButtons = {
      LEFT: un.ROTATE,
      MIDDLE: un.DOLLY,
      RIGHT: un.PAN
    }, this.controls.touches = { ONE: dn.ROTATE, TWO: dn.DOLLY_PAN });
  }
  /** Raycast a pointer event onto the current ground plane. */
  groundIntersect(t) {
    const e = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = (t.clientX - e.left) / e.width * 2 - 1, this.pointer.y = -((t.clientY - e.top) / e.height) * 2 + 1, this.raycaster.setFromCamera(this.pointer, this.camera);
    const n = new w();
    return this.raycaster.ray.intersectPlane(this.groundPlane, n) ? n : null;
  }
  clearPreview() {
    for (const t of [...this.previewGroup.children]) {
      const e = t;
      e.geometry && e.geometry.dispose(), e.material && (Array.isArray(e.material) ? e.material : [e.material]).forEach((s) => s.dispose());
    }
    this.previewGroup.clear();
  }
  handlePick(t) {
    if (!this.onPick) return;
    const e = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = (t.clientX - e.left) / e.width * 2 - 1, this.pointer.y = -((t.clientY - e.top) / e.height) * 2 + 1, this.raycaster.setFromCamera(this.pointer, this.camera);
    const n = this.bindingManagers[this.activeFloor];
    if (!n) {
      this.onPick(null);
      return;
    }
    const s = this.raycaster.intersectObjects(n.anchors, !0);
    if (s.length === 0) {
      this.onPick(null);
      return;
    }
    const r = n.resolveClick(s[0].object);
    this.onPick(r);
  }
  /** Targeted live update for a single entity. */
  updateEntity(t, e) {
    this.bindingManagers[this.activeFloor]?.updateEntity(t, e), this.bindingManagers.forEach((s, r) => {
      r !== this.activeFloor && s.updateEntity(t, e);
    });
  }
  /** Full state sync (called on each hass update from the card). */
  syncAll(t) {
    for (const e of this.bindingManagers) e.update(t);
  }
  // -- Render loop ------------------------------------------------------------
  start() {
    if (this.running) return;
    this.running = !0;
    const t = () => {
      if (!this.running) return;
      this.rafId = requestAnimationFrame(t);
      const e = this.clock.getDelta();
      this.controls.update(), this.bindingManagers[this.activeFloor]?.animate(e), this.renderer.render(this.scene, this.camera);
    };
    t();
  }
  stop() {
    this.running = !1, cancelAnimationFrame(this.rafId);
  }
  dispose() {
    this.stop(), this.resizeObserver?.disconnect(), this.clearPlan(), this.controls.dispose(), this.renderer.dispose(), this.renderer.domElement.remove();
  }
}
function Gy(i) {
  i.traverse((t) => {
    const e = t;
    e.geometry && e.geometry.dispose(), e.material && (Array.isArray(e.material) ? e.material : [e.material]).forEach((s) => s.dispose());
  });
}
const Wy = "0.7.2", ro = "ha-3d-floorplan-sidebar-item", Xh = "ha-3d-floorplan-overlay";
function Xy() {
  return window.ha3dFloorplan ?? {};
}
function $y(i) {
  const t = i.shadowRoot;
  return t.querySelector("ha-md-list") || t.querySelector("paper-listbox") || t.querySelector("ul.ha-scrollbar") || t.querySelector("ul") || t.querySelector(".menu");
}
function jy(i) {
  const t = document.createElement("a");
  t.id = ro, t.href = "#", t.setAttribute("role", "menuitem"), t.style.cssText = [
    "display:flex",
    "align-items:center",
    "gap:12px",
    "box-sizing:border-box",
    "width:calc(100% - 12px)",
    "margin:4px 8px",
    "padding:12px",
    "border-radius:12px",
    "cursor:pointer",
    // Match the other (unselected) sidebar items: white-ish text, medium weight.
    "color:var(--sidebar-text-color, var(--primary-text-color, #e1e1e1))",
    "font:inherit",
    "font-size:14px",
    "font-weight:500",
    "text-decoration:none",
    "-webkit-tap-highlight-color:transparent"
  ].join(";");
  const e = document.createElement("ha-icon");
  e.setAttribute("icon", i.icon ?? "mdi:floor-plan"), e.style.cssText = "width:24px;height:24px;flex:0 0 24px;";
  const n = document.createElement("span");
  return n.textContent = i.title ?? "3D Floor Plan", n.style.cssText = "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;", t.appendChild(e), t.appendChild(n), t.addEventListener("mouseenter", () => t.style.background = "var(--sidebar-selected-icon-color, rgba(255,255,255,0.06))"), t.addEventListener("mouseleave", () => t.style.background = "transparent"), t.addEventListener("click", (s) => {
    s.preventDefault(), Ky(i);
  }), t;
}
function $h(i, t) {
  const e = i.shadowRoot;
  if (e.getElementById(ro)) return;
  const n = $y(i), s = jy(t);
  n && n.parentNode ? n.parentNode.insertBefore(s, n.nextSibling) : e.appendChild(s);
}
function qy(i) {
  if (i.config) return { type: "custom:ha-3d-floorplan-card", height: "100vh", ...i.config };
  const t = { type: "custom:ha-3d-floorplan-card", height: "100vh" };
  return i.url && (t.url = i.url), t;
}
function Yy() {
  const e = document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-sidebar");
  if (!e) return 0;
  const n = e.getBoundingClientRect();
  return n.width === 0 || n.right <= 0 ? 0 : Math.max(0, Math.round(n.right));
}
function Ky(i) {
  if (document.getElementById(Xh)) return;
  const t = document.createElement("div");
  t.id = Xh, t.style.cssText = [
    "position:fixed",
    "top:0",
    "right:0",
    "bottom:0",
    "left:0",
    "z-index:9999",
    "background:var(--primary-background-color, #111)",
    "display:block"
  ].join(";");
  const e = () => {
    t.style.left = `${Yy()}px`;
  };
  e(), window.addEventListener("resize", e);
  let n;
  const r = document.querySelector("home-assistant")?.shadowRoot?.querySelector(
    "home-assistant-main"
  )?.shadowRoot?.querySelector("ha-sidebar");
  r && "ResizeObserver" in window && (n = new ResizeObserver(e), n.observe(r));
  const o = window.setInterval(e, 500), a = document.createElement("button");
  a.textContent = "✕", a.title = "Close", a.style.cssText = [
    "position:absolute",
    "bottom:14px",
    "left:14px",
    "z-index:10000",
    "width:42px",
    "height:42px",
    "border-radius:50%",
    "border:1px solid rgba(255,255,255,0.2)",
    "background:rgba(30,33,40,0.85)",
    "color:#fff",
    "font-size:18px",
    "cursor:pointer",
    "backdrop-filter:blur(4px)"
  ].join(";");
  const c = document.createElement("ha-3d-floorplan-card");
  c.style.cssText = "display:block;width:100%;height:100%;";
  try {
    c.setConfig(qy(i));
  } catch (_) {
    console.error("[3d-floorplan] sidebar config error:", _);
  }
  const l = document.querySelector("home-assistant");
  l?.hass && (c.hass = l.hass);
  const h = window.setInterval(() => {
    l?.hass && (c.hass = l.hass), location.pathname !== u && f();
  }, 1e3), u = location.pathname, d = () => {
    location.pathname !== u && f();
  }, f = () => {
    window.clearInterval(h), window.clearInterval(o), window.removeEventListener("resize", e), window.removeEventListener("location-changed", d), window.removeEventListener("popstate", d), n?.disconnect(), t.remove(), document.removeEventListener("keydown", g);
  }, g = (_) => {
    _.key === "Escape" && f();
  };
  window.addEventListener("location-changed", d), window.addEventListener("popstate", d), a.addEventListener("click", f), document.addEventListener("keydown", g), t.appendChild(a), t.appendChild(c), document.body.appendChild(t);
}
function Zy() {
  const e = document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-sidebar");
  return e && e.shadowRoot ? e : null;
}
let jh = !1;
function Jy() {
  const i = Xy();
  if (i.sidebar === !1 || jh) return;
  jh = !0;
  const t = () => {
    const e = Zy();
    if (!e) return;
    const n = e.shadowRoot;
    if (n.querySelector(
      'a[href="/3d-floorplan"], a[href$="/3d-floorplan"], a[href$="/ha-3d-floorplan-card"]'
    ) || window.__ha3dPanelMode) {
      n.getElementById(ro)?.remove();
      return;
    }
    if ($h(e, i), !e.__ha3dObs) {
      const r = e.shadowRoot, o = new MutationObserver(() => {
        r.getElementById(ro) || $h(e, i);
      });
      o.observe(r, { childList: !0, subtree: !0 }), e.__ha3dObs = o;
    }
  };
  t(), window.setInterval(t, 1500);
}
const Qy = {
  name: "Demo Home",
  wallHeight: 2.6,
  floors: [
    {
      name: "Ground Floor",
      elevation: 0,
      wallHeight: 2.6,
      walls: [
        { start: [0, 0], end: [8, 0], openings: [{ kind: "window", position: 3, width: 1.4 }] },
        { start: [8, 0], end: [8, 6] },
        { start: [8, 6], end: [0, 6], openings: [{ kind: "door", position: 3.5, width: 1 }] },
        { start: [0, 6], end: [0, 0] },
        { start: [4.5, 0], end: [4.5, 6], openings: [{ kind: "door", position: 2.5, width: 0.9 }] }
      ],
      rooms: [
        { name: "Living Room", polygon: [[0, 0], [4.5, 0], [4.5, 6], [0, 6]], color: "#cdbfa6" },
        { name: "Kitchen", polygon: [[4.5, 0], [8, 0], [8, 6], [4.5, 6]], color: "#c2c8c4" }
      ],
      furniture: [
        { model: "sofa", position: [1.2, 0, 4.6], rotation: 0, color: "#5b6b7a", id: "sofa1" },
        { model: "table", position: [2.2, 0, 2.6], color: "#8a5a30", id: "table1" },
        { model: "chair", position: [2.2, 0, 1.7], rotation: 180, id: "chair1" },
        { model: "tv", position: [2.2, 0, 0.3], rotation: 0, id: "tv1" },
        { model: "ceiling_light", position: [2.2, 2.45, 3], color: "#ffffff", id: "living_lamp" },
        { model: "kitchen_counter", position: [6.2, 0, 0.5], rotation: 0, color: "#e8e8e8", id: "counter1" },
        { model: "fridge", position: [7.5, 0, 1.5], rotation: -90, id: "fridge1" },
        { model: "sink", position: [5.2, 0, 0.5], id: "sink1" },
        { model: "ceiling_light", position: [6.2, 2.45, 3], id: "kitchen_lamp" }
      ],
      // No entity bindings in the demo, so nothing shows as "unavailable".
      bindings: []
    }
  ]
}, qh = 0.1, Yh = 0.4, tM = 0.3, ki = (i) => Math.round(i / qh) * qh;
class eM {
  constructor(t, e) {
    this.floorIndex = 0, this.tool = "wall", this.selectedModel = "sofa", this.selectedId = null, this.chain = [], this.cursor = null, this.sm = t, this.plan = e;
  }
  get pointCount() {
    return this.chain.length;
  }
  start() {
    this.applySceneEditState(), this.setTool("wall");
  }
  stop() {
    this.cancelChain(), this.sm.setGroundHandler(void 0), this.sm.setEditMode(!1), this.sm.setDrawMode(!1);
  }
  setTool(t) {
    this.tool = t, this.sm.setDrawMode(t !== "orbit"), t !== "wall" && this.cancelChain(), t !== "select" && this.select(null), this.onChange?.();
  }
  floor() {
    return this.plan.floors[this.floorIndex];
  }
  get selectedEntity() {
    return this.selectedId ? this.floor().bindings?.find((e) => e.anchor_object === this.selectedId)?.entity_id ?? null : null;
  }
  /** Model key of the currently selected placement (for domain-filtered binding). */
  get selectedObjectModel() {
    return this.selectedId ? this.floor().furniture?.find((e) => e.id === this.selectedId)?.model ?? null : null;
  }
  // -- Furniture / selection --------------------------------------------------
  placeFurniture(t) {
    const e = this.floor();
    e.furniture || (e.furniture = []);
    const n = e.wallHeight ?? this.plan.wallHeight ?? 2.6, s = `f${e.furniture.length}_${Math.floor(performance.now() % 1e5)}`;
    e.furniture.push({
      model: this.selectedModel,
      position: [ki(t.x), Ty(this.selectedModel, n), ki(t.z)],
      rotation: 0,
      id: s
    }), this.rebuild(), this.select(s), this.onChange?.();
  }
  moveSelected(t) {
    const e = this.floor().furniture?.find((n) => n.id === this.selectedId);
    e && (e.position = [ki(t.x), e.position[1], ki(t.z)], this.rebuild(), this.select(this.selectedId), this.onChange?.());
  }
  select(t) {
    this.selectedId = t;
    const e = t ? this.sm.getFurnitureObject(t) : null;
    this.sm.setSelection(e ?? null), this.onChange?.();
  }
  rotateSelected() {
    const t = this.floor().furniture?.find((e) => e.id === this.selectedId);
    t && (t.rotation = ((t.rotation ?? 0) + 45) % 360, this.rebuild(), this.select(this.selectedId), this.onChange?.());
  }
  deleteSelected() {
    if (!this.selectedId) return;
    const t = this.floor();
    t.furniture = (t.furniture ?? []).filter((e) => e.id !== this.selectedId), t.bindings = (t.bindings ?? []).filter((e) => e.anchor_object !== this.selectedId), this.selectedId = null, this.sm.setSelection(null), this.rebuild(), this.onChange?.();
  }
  bindEntity(t) {
    if (!this.selectedId) return;
    const e = this.floor();
    e.bindings || (e.bindings = []), e.bindings = e.bindings.filter((n) => n.anchor_object !== this.selectedId), t && e.bindings.push({ entity_id: t, anchor_object: this.selectedId, behavior: "auto" }), this.rebuild(), this.select(this.selectedId), this.onChange?.();
  }
  elevation() {
    return this.plan.floors[this.floorIndex]?.elevation ?? 0;
  }
  wallHeight() {
    return this.plan.floors[this.floorIndex]?.wallHeight ?? this.plan.wallHeight ?? 2.6;
  }
  applySceneEditState() {
    this.sm.setEditMode(!0, this.elevation()), this.sm.setGroundHandler({
      click: (t, e) => this.onClick(t, e),
      move: (t) => this.onMove(t)
    }), this.sm.setDrawMode(this.tool !== "orbit");
  }
  onClick(t, e) {
    if (this.tool === "furniture") {
      this.placeFurniture(t);
      return;
    }
    if (this.tool === "door" || this.tool === "window") {
      this.addOpening(t, this.tool);
      return;
    }
    if (this.tool === "select") {
      const o = e ? this.sm.pickFurniture(e) : null;
      o ? this.select(o.id) : this.selectedId ? this.moveSelected(t) : this.select(null);
      return;
    }
    if (this.tool !== "wall") return;
    const { pt: n } = this.snapPoint(t.x, t.z);
    if (this.chain.length === 0) {
      this.chain = [n], this.renderPreview(), this.onChange?.();
      return;
    }
    const s = this.chain[0], r = this.chain[this.chain.length - 1];
    if (this.chain.length >= 3 && Math.hypot(n[0] - s[0], n[1] - s[1]) < Yh) {
      this.commitWall(r, s), this.addRoom(this.chain), this.chain = [], this.cursor = null, this.rebuild(), this.onChange?.();
      return;
    }
    r[0] === n[0] && r[1] === n[1] || (this.commitWall(r, n), this.chain.push(n), this.rebuild(), this.renderPreview(), this.onChange?.());
  }
  onMove(t) {
    this.tool !== "wall" || this.chain.length === 0 || (this.cursor = this.snapPoint(t.x, t.z).pt, this.renderPreview());
  }
  commitWall(t, e) {
    const n = this.floor();
    n.walls || (n.walls = []), n.walls.push({ start: [t[0], t[1]], end: [e[0], e[1]] });
  }
  addRoom(t) {
    const e = this.floor();
    e.rooms || (e.rooms = []), e.rooms.push({ polygon: t.map((n) => [n[0], n[1]]) });
  }
  /** Snap to a nearby existing wall endpoint (so walls connect), else grid. */
  snapPoint(t, e) {
    let n = null, s = tM;
    for (const r of [...this.existingEndpoints(), ...this.chain]) {
      const o = Math.hypot(t - r[0], e - r[1]);
      o < s && (s = o, n = r);
    }
    return n ? { pt: [n[0], n[1]], snapped: !0 } : { pt: [ki(t), ki(e)], snapped: !1 };
  }
  existingEndpoints() {
    const t = [];
    for (const e of this.floor().walls ?? [])
      t.push([e.start[0], e.start[1]], [e.end[0], e.end[1]]);
    return t;
  }
  isConnection(t) {
    return this.existingEndpoints().some(
      (e) => Math.hypot(e[0] - t[0], e[1] - t[1]) < 1e-3
    );
  }
  /** Add a door/window opening to the wall nearest the tapped point. */
  addOpening(t, e) {
    const n = this.floor();
    let s = null, r = 0.6, o = 0, a = 0;
    for (const h of n.walls ?? []) {
      const u = h.start[0], d = h.start[1], f = h.end[0], g = h.end[1], _ = f - u, p = g - d, m = _ * _ + p * p;
      if (m < 1e-6) continue;
      let S = ((t.x - u) * _ + (t.z - d) * p) / m;
      S = Math.max(0, Math.min(1, S));
      const x = u + _ * S, M = d + p * S, P = Math.hypot(t.x - x, t.z - M);
      if (P < r) {
        r = P, s = h;
        const R = Math.sqrt(m);
        o = S * R, a = R;
      }
    }
    if (!s) return;
    s.openings || (s.openings = []);
    const c = e === "door" ? 0.9 : 1, l = Math.max(0, Math.min(a - c, o - c / 2));
    s.openings.push({ kind: e, position: l, width: c }), this.rebuild(), this.onChange?.();
  }
  /** Undo: remove the last committed wall of the current run (and its point). */
  undoPoint() {
    this.chain.length >= 2 ? (this.floor().walls?.pop(), this.chain.pop(), this.rebuild(), this.renderPreview()) : this.chain.length === 1 && (this.chain = [], this.cursor = null, this.sm.clearPreview()), this.onChange?.();
  }
  /** End the current wall run (walls are already committed). */
  finishChain() {
    this.cancelChain();
  }
  cancelChain() {
    this.chain = [], this.cursor = null, this.sm.clearPreview(), this.onChange?.();
  }
  /** Start a fresh blank plan to draw from scratch. */
  loadPlan(t) {
    this.plan = t, this.floorIndex = 0, this.cancelChain(), this.selectedId = null, this.sm.setSelection(null), this.sm.loadPlan(t, !1), this.applySceneEditState(), this.onChange?.();
  }
  rebuild() {
    this.sm.loadPlan(this.plan, !0), this.applySceneEditState();
  }
  renderPreview() {
    this.sm.clearPreview();
    const t = this.sm.previewGroup, e = this.elevation(), n = this.wallHeight(), s = this.cursor ? [...this.chain, this.cursor] : [...this.chain];
    for (const r of s) {
      const o = this.isConnection(r), a = new ge(
        new mo(o ? 0.12 : 0.07, 12, 12),
        new vn({ color: o ? 5230698 : 4500223 })
      );
      a.position.set(r[0], e + 0.06, r[1]), t.add(a);
    }
    for (let r = 0; r < s.length - 1; r++) {
      const o = s[r], a = s[r + 1], c = Math.hypot(a[0] - o[0], a[1] - o[1]);
      if (c < 1e-3) continue;
      const l = new ge(
        new ei(c, n, 0.1),
        new vn({ color: 4500223, transparent: !0, opacity: 0.35 })
      ), h = Math.atan2(a[1] - o[1], a[0] - o[0]);
      l.position.set((o[0] + a[0]) / 2, e + n / 2, (o[1] + a[1]) / 2), l.rotation.y = -h, t.add(l);
    }
    if (this.chain.length >= 2 && this.cursor) {
      const r = this.chain[0];
      if (Math.hypot(this.cursor[0] - r[0], this.cursor[1] - r[1]) < Yh) {
        const o = new ge(
          new Uc(0.22, 0.04, 8, 24),
          new vn({ color: 5230698 })
        );
        o.rotation.x = Math.PI / 2, o.position.set(r[0], e + 0.06, r[1]), t.add(o);
      }
    }
  }
}
const hd = "ha3d_floorplans", ud = "ha3d-floorplan-default";
function dd(i) {
  return !!i && Array.isArray(i.floors) && i.floors.length > 0;
}
async function fd(i) {
  try {
    const e = (await i.callWS?.({ type: "frontend/get_user_data", key: hd }))?.value;
    if (e && e.projects) return e;
  } catch {
  }
  return null;
}
async function nM(i) {
  if (i) {
    const t = await fd(i);
    if (t) {
      const e = t.active && t.projects[t.active] ? t.active : Object.keys(t.projects)[0], n = e ? t.projects[e] : null;
      if (dd(n)) return n;
    }
  }
  return sM();
}
async function iM(i, t, e = "default") {
  if (rM(i), !t) return { ha: !1 };
  try {
    const n = await fd(t) ?? { projects: {} };
    return n.projects[e] = i, n.active = e, await t.callWS?.({
      type: "frontend/set_user_data",
      key: hd,
      value: n
    }), { ha: !0 };
  } catch (n) {
    return console.error("[3d-floorplan] HA save failed, kept localStorage copy:", n), { ha: !1 };
  }
}
function sM() {
  try {
    const i = localStorage.getItem(ud);
    if (!i) return null;
    const t = JSON.parse(i);
    return dd(t) ? t : null;
  } catch {
    return null;
  }
}
function rM(i) {
  try {
    localStorage.setItem(ud, JSON.stringify(i));
  } catch {
  }
}
function oM() {
  return {
    name: "New Plan",
    wallHeight: 2.6,
    floors: [{ name: "Ground Floor", elevation: 0, wallHeight: 2.6, walls: [], rooms: [], furniture: [], bindings: [] }]
  };
}
const Kh = 76, Zh = /* @__PURE__ */ new Map();
let Ps;
function aM() {
  return Ps || (Ps = new Bu({
    antialias: !0,
    alpha: !0,
    preserveDrawingBuffer: !0
    // required for toDataURL
  }), Ps.setSize(Kh, Kh), Ps.setPixelRatio(1)), Ps;
}
function Jh(i) {
  const t = Zh.get(i);
  if (t) return t;
  const e = aM(), n = new zu();
  n.add(new sd(16777215, 0.95));
  const s = new Fc(16777215, 0.8);
  s.position.set(3, 5, 4), n.add(s);
  const r = rc(i, "#aab4c0");
  n.add(r);
  const o = new je().setFromObject(r), a = o.getCenter(new w()), c = o.getSize(new w()), l = Math.max(c.x, c.y, c.z, 0.4), h = new Be(38, 1, 0.01, 100), u = l * 2.3;
  h.position.set(a.x + u * 0.85, a.y + u * 0.7, a.z + u * 0.95), h.lookAt(a);
  let d = "";
  try {
    e.render(n, h), d = e.domElement.toDataURL("image/png");
  } catch {
    d = "";
  }
  return r.traverse((f) => {
    const g = f;
    g.geometry && g.geometry.dispose();
  }), Zh.set(i, d), d;
}
var cM = Object.defineProperty, lM = Object.getOwnPropertyDescriptor, we = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? lM(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && cM(t, e, s), s;
};
let ve = class extends Wi {
  constructor() {
    super(...arguments), this.floorNames = [], this.activeFloorIndex = 0, this.editing = !1, this.editTool = "wall", this.editPoints = 0, this.editSelectedId = null, this.editSelectedModel = "sofa", this.editSelectedEntity = null, this.editSelectedObjModel = null, this.paletteOpen = !1, this.planLoaded = !1;
  }
  // -- Lovelace lifecycle -----------------------------------------------------
  setConfig(i) {
    if (!i) throw new Error("Invalid configuration");
    this.config = i, this.loadError = void 0, this.planLoaded = !1, this.activeProjectId = i.projects && i.projects.length ? i.projects[0].id : void 0, this.sceneManager && this.loadActiveProject();
  }
  getCardSize() {
    return 8;
  }
  static getStubConfig() {
    return {
      type: "custom:ha-3d-floorplan-card",
      height: "500px",
      plan: {
        name: "Demo",
        wallHeight: 2.6,
        floors: [
          {
            name: "Ground",
            walls: [
              { start: [0, 0], end: [6, 0] },
              { start: [6, 0], end: [6, 5] },
              { start: [6, 5], end: [0, 5] },
              { start: [0, 5], end: [0, 0], openings: [{ kind: "door", position: 2, width: 1 }] }
            ],
            rooms: [{ name: "Living", polygon: [[0, 0], [6, 0], [6, 5], [0, 5]], color: "#cfc7ba" }],
            furniture: [
              { model: "sofa", position: [1.5, 0, 1], rotation: 0, color: "#5b6b7a", id: "sofa1" },
              { model: "ceiling_light", position: [3, 2.5, 2.5], id: "lamp1" }
            ],
            bindings: [
              { entity_id: "light.living_room", anchor_object: "lamp1", behavior: "light" }
            ]
          }
        ]
      }
    };
  }
  static async getConfigElement() {
    return await Promise.resolve().then(() => dM), document.createElement("ha-3d-floorplan-card-editor");
  }
  // -- hass updates -----------------------------------------------------------
  willUpdate(i) {
    if (i.has("panel") && this.panel && !this.config) {
      window.__ha3dPanelMode = !0;
      const t = this.panel.config ?? {};
      this.setConfig({ height: "100vh", ...t, type: "custom:ha-3d-floorplan-card" });
    }
    i.has("hass") && this.hass && (this.pendingHass = this.hass);
  }
  updated(i) {
    !this.sceneManager && this.viewport && this.initScene(), this.pendingHass && this.sceneManager && this.planLoaded && (this.applyHass(this.pendingHass), this.pendingHass = void 0);
  }
  applyHass(i) {
    if (this.sceneManager) {
      if (!this.lastHass)
        this.sceneManager.syncAll(i);
      else
        for (const t in i.states)
          i.states[t] !== this.lastHass.states[t] && this.sceneManager.updateEntity(t, i);
      this.lastHass = i;
    }
  }
  // -- Scene setup ------------------------------------------------------------
  initScene() {
    if (!this.viewport) return;
    const i = this.config?.background ?? "#1b1d22";
    this.sceneManager = new Vy(this.viewport, i), this.sceneManager.setPickHandler((t) => this.handlePick(t)), this.sceneManager.start(), this.loadActiveProject();
  }
  async loadActiveProject() {
    if (!(!this.config || !this.sceneManager)) {
      this.loadError = void 0, this.planLoaded = !1;
      try {
        const i = await this.resolvePlan();
        this.currentPlan = i, this.sceneManager.loadPlan(i), this.floorNames = i.floors.map((t, e) => t.name || `Floor ${e + 1}`), this.activeFloorIndex = 0, this.planLoaded = !0, this.hass && (this.lastHass = void 0, this.applyHass(this.hass));
      } catch (i) {
        this.loadError = i?.message ?? String(i), console.error("[3d-floorplan] load failed:", i);
      }
    }
  }
  async resolvePlan() {
    const i = this.config;
    if (i.projects && i.projects.length) {
      const e = i.projects.find((n) => n.id === this.activeProjectId) ?? i.projects[0];
      return this.loadProjectRef(e);
    }
    return i.plan ? i.plan : i.url ? this.fetchPlan(i.url) : await nM(this.hass) ?? Qy;
  }
  async loadProjectRef(i) {
    if (i.plan) return i.plan;
    if (i.url) return this.fetchPlan(i.url);
    if (this.config?.backend)
      return this.fetchPlan(`${this.config.backend.replace(/\/$/, "")}/projects/${i.id}`);
    throw new Error(`Project "${i.id}" has no plan, url, or backend.`);
  }
  async fetchPlan(i) {
    const t = await fetch(i, { cache: "no-cache" });
    if (!t.ok) throw new Error(`Failed to fetch ${i}: ${t.status}`);
    return await t.json();
  }
  // -- Interaction ------------------------------------------------------------
  handlePick(i) {
    if (!i || !this.hass) return;
    const t = this.hass.states[i.entity_id];
    if (i.behavior === "lock" && t) {
      const n = t.state === "locked" ? "unlock" : "lock";
      this.hass.callService("lock", n, { entity_id: i.entity_id });
      return;
    }
    const e = Hy(i.entity_id, i.behavior);
    e ? this.hass.callService(e.domain, e.service, e.data) : this.fireMoreInfo(i.entity_id);
  }
  fireMoreInfo(i) {
    const t = new CustomEvent("hass-more-info", {
      detail: { entityId: i },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(t);
  }
  onSelectFloor(i) {
    this.activeFloorIndex = i, this.sceneManager?.setActiveFloor(i), this.hass && this.sceneManager?.syncAll(this.hass);
  }
  onSelectProject(i) {
    this.activeProjectId = i.target.value, this.loadActiveProject();
  }
  onResetView() {
    this.sceneManager?.resetView();
  }
  // -- Editor -----------------------------------------------------------------
  enterEdit() {
    if (!this.sceneManager || !this.currentPlan) return;
    const i = JSON.parse(JSON.stringify(this.currentPlan));
    this.editor = new eM(this.sceneManager, i), this.editor.onChange = () => {
      const t = this.editor;
      this.editTool = t.tool, this.editPoints = t.pointCount, this.editSelectedId = t.selectedId, this.editSelectedModel = t.selectedModel, this.editSelectedEntity = t.selectedEntity, this.editSelectedObjModel = t.selectedObjectModel, this.requestUpdate();
    }, this.sceneManager.loadPlan(i, !0), this.editor.start(), this.editing = !0, this.editTool = this.editor.tool, this.showToast('Edit mode — pick "Draw wall", tap the floor to place points');
  }
  exitEdit() {
    this.editor?.stop(), this.editor = void 0, this.editing = !1, this.currentPlan && this.sceneManager && (this.sceneManager.loadPlan(this.currentPlan), this.hass && (this.lastHass = void 0, this.applyHass(this.hass)));
  }
  onEditTool(i) {
    this.editor?.setTool(i);
  }
  onFinishChain() {
    this.editor?.finishChain();
  }
  onUndoPoint() {
    this.editor?.undoPoint();
  }
  onNewPlan() {
    !this.editor || !window.confirm(
      `Start a blank plan?

Unsaved changes will be lost. Your last SAVED plan stays until you Save the blank one over it.`
    ) || (this.editor.loadPlan(oM()), this.showToast("Blank plan — draw your walls (not saved yet)"));
  }
  pickModel(i) {
    this.editor && (this.editor.selectedModel = i, this.editSelectedModel = i, this.paletteOpen = !1);
  }
  togglePalette() {
    this.paletteOpen = !this.paletteOpen;
  }
  onRotateSelected() {
    this.editor?.rotateSelected();
  }
  onDeleteSelected() {
    this.editor?.deleteSelected();
  }
  onPickEntity(i) {
    const t = i.target.value || null;
    this.editor?.bindEntity(t), this.showToast(t ? `Bound ${t}` : "Binding cleared");
  }
  /** Entity ids for the selected piece, filtered by its natural domain(s). */
  candidateEntities(i) {
    if (!this.hass) return [];
    const t = Object.keys(this.hass.states).filter(
      (e) => !i.length || i.includes(e.split(".")[0])
    );
    return t.sort((e, n) => this.entityLabel(e).localeCompare(this.entityLabel(n))), t;
  }
  entityLabel(i) {
    return this.hass?.states[i]?.attributes?.friendly_name || i;
  }
  async onSavePlan() {
    if (!this.editor) return;
    const i = this.editor.plan, t = await iM(i, this.hass);
    this.currentPlan = JSON.parse(JSON.stringify(i)), this.floorNames = i.floors.map((e, n) => e.name || `Floor ${n + 1}`), this.showToast(
      t.ha ? "Saved to Home Assistant (all devices)" : "Saved locally (HA unavailable)"
    );
  }
  showToast(i) {
    this.toast = i, this.toastTimer && clearTimeout(this.toastTimer), this.toastTimer = window.setTimeout(() => {
      this.toast = void 0, this.requestUpdate();
    }, 3200);
  }
  // -- Lit lifecycle ----------------------------------------------------------
  connectedCallback() {
    super.connectedCallback(), this.sceneManager?.start();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.sceneManager?.stop();
  }
  renderPaletteCell(i, t) {
    return me`
      <button
        class="palette-cell ${i === this.editSelectedModel ? "active" : ""}"
        title=${t}
        @click=${() => this.pickModel(i)}
      >
        <img src=${Jh(i)} alt="" />
        <span>${t}</span>
      </button>
    `;
  }
  renderEditor() {
    const i = this.editTool, t = (s) => s.replace(/_/g, " ").replace(/\b\w/g, (r) => r.toUpperCase()), e = Ey.filter((s) => !sc.includes(s)), n = i === "select" && !!this.editSelectedId;
    return me`
      <div class="overlay top-left toolbar">
        <div class="toolrow">
          <button class="btn ${i === "wall" ? "active" : ""}" title="Draw walls"
            @click=${() => this.onEditTool("wall")}>▟ Wall</button>
          <button class="btn ${i === "door" ? "active" : ""}" title="Add a door — tap a wall"
            @click=${() => this.onEditTool("door")}>🚪 Door</button>
          <button class="btn ${i === "window" ? "active" : ""}" title="Add a window — tap a wall"
            @click=${() => this.onEditTool("window")}>🪟 Window</button>
          <button class="btn ${i === "furniture" ? "active" : ""}" title="Place furniture"
            @click=${() => this.onEditTool("furniture")}>🛋 Furniture</button>
          <button class="btn ${i === "select" ? "active" : ""}" title="Select / move / bind"
            @click=${() => this.onEditTool("select")}>☝ Select</button>
          <button class="btn ${i === "orbit" ? "active" : ""}" title="Move camera"
            @click=${() => this.onEditTool("orbit")}>✋ View</button>
        </div>

        ${i === "wall" ? me`<div class="toolrow">
              <button class="btn" ?disabled=${this.editPoints < 1}
                title="End this run (start a new wall elsewhere)" @click=${this.onFinishChain}>⤓ End run</button>
              <button class="btn" ?disabled=${this.editPoints < 1}
                title="Undo last wall" @click=${this.onUndoPoint}>⤺ Undo</button>
            </div>` : Vt}

        ${i === "furniture" ? me`<div class="toolrow">
              <button class="btn palette-btn" title="Choose a model" @click=${this.togglePalette}>
                <img class="palette-thumb" src=${Jh(this.editSelectedModel)} alt="" />
                ${t(this.editSelectedModel)} ▾
              </button>
              <span class="hint">tap floor to place</span>
            </div>
            ${this.paletteOpen ? me`<div class="palette">
                  <div class="palette-group">Lighting</div>
                  <div class="palette-grid">
                    ${sc.map((s) => this.renderPaletteCell(s, t(s)))}
                  </div>
                  <div class="palette-group">Furniture</div>
                  <div class="palette-grid">
                    ${e.map((s) => this.renderPaletteCell(s, t(s)))}
                  </div>
                </div>` : Vt}` : Vt}

        ${n ? me`<div class="toolrow">
              <button class="btn" title="Rotate 45°" @click=${this.onRotateSelected}>⟳ Rotate</button>
              <button class="btn" title="Delete" @click=${this.onDeleteSelected}>🗑 Delete</button>
            </div>
            ${this.hass ? (() => {
      const s = this.editSelectedObjModel ? by(this.editSelectedObjModel) : [], r = this.candidateEntities(s);
      return me`<div class="toolrow">
                      <select class="select wide" @change=${this.onPickEntity}>
                        <option value="" ?selected=${!this.editSelectedEntity}>
                          — bind entity —
                        </option>
                        ${r.map(
        (o) => me`<option value=${o} ?selected=${o === this.editSelectedEntity}>
                            ${this.entityLabel(o)}
                          </option>`
      )}
                      </select>
                    </div>
                    <span class="hint">
                      ${this.editSelectedEntity ? `bound: ${this.editSelectedEntity}` : s.length ? `${r.length} ${s.join(" / ")} entities` : `${r.length} entities`}
                    </span>`;
    })() : Vt}` : Vt}

        ${i === "select" && !this.editSelectedId ? me`<span class="hint">tap a piece to select; tap floor to move it</span>` : Vt}
        ${i === "door" || i === "window" ? me`<span class="hint">tap a wall to add a ${i}</span>` : Vt}
        ${i === "wall" ? me`<span class="hint">tap 2 points = 1 wall (auto) · green node = join · right-drag / two-finger to orbit</span>` : Vt}

        <div class="toolrow">
          <button class="btn" title="Start a blank plan" @click=${this.onNewPlan}>✚ New</button>
          <button class="btn primary" title="Save" @click=${this.onSavePlan}>💾 Save</button>
        </div>
      </div>
    `;
  }
  // -- Render -----------------------------------------------------------------
  render() {
    if (!this.config) return Vt;
    const i = this.config.height ?? "500px", t = this.config.projects ?? [];
    return me`
      <ha-card>
        <div class="viewport" style="height:${i}"></div>

        ${this.loadError ? me`<div class="error">⚠ ${this.loadError}</div>` : Vt}

        <div class="overlay top-right">
          <button class="btn" title="Reset view" @click=${this.onResetView}>
            ⌂ Reset
          </button>
          ${this.editing ? me`<button class="btn primary" title="Exit editor" @click=${this.exitEdit}>
                ✓ Done
              </button>` : me`<button class="btn" title="Edit floor plan" @click=${this.enterEdit}>
                ✎ Edit
              </button>`}
        </div>

        ${this.editing ? this.renderEditor() : Vt}

        ${this.toast ? me`<div class="toast">${this.toast}</div>` : Vt}

        ${t.length > 1 ? me`
              <div class="overlay top-left">
                <select class="select" @change=${this.onSelectProject}>
                  ${t.map(
      (e) => me`<option value=${e.id} ?selected=${e.id === this.activeProjectId}>
                      ${e.name || e.id}
                    </option>`
    )}
                </select>
              </div>
            ` : Vt}

        ${this.floorNames.length > 1 && !this.editing ? me`
              <div class="overlay bottom">
                ${this.floorNames.map(
      (e, n) => me`
                    <button
                      class="tab ${n === this.activeFloorIndex ? "active" : ""}"
                      @click=${() => this.onSelectFloor(n)}
                    >
                      ${e}
                    </button>
                  `
    )}
              </div>
            ` : Vt}
      </ha-card>
    `;
  }
};
ve.styles = tu`
    :host {
      display: block;
    }
    ha-card {
      position: relative;
      overflow: hidden;
      padding: 0;
    }
    .viewport {
      position: relative;
      width: 100%;
      /* Critical for tablets: stop the browser hijacking pinch into page zoom. */
      touch-action: none;
      overscroll-behavior: contain;
      background: #1b1d22;
    }
    .overlay {
      position: absolute;
      z-index: 2;
      display: flex;
      gap: 6px;
    }
    .top-right {
      top: 10px;
      right: 10px;
    }
    .top-left {
      top: 10px;
      left: 10px;
    }
    .bottom {
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      flex-wrap: wrap;
      justify-content: center;
      max-width: 90%;
    }
    .btn,
    .tab,
    .select {
      font: inherit;
      font-size: 13px;
      color: #fff;
      background: rgba(30, 33, 40, 0.82);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      padding: 7px 12px;
      cursor: pointer;
      backdrop-filter: blur(4px);
      -webkit-tap-highlight-color: transparent;
    }
    .btn:hover,
    .tab:hover {
      background: rgba(55, 60, 70, 0.9);
    }
    .tab.active,
    .btn.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
    }
    .btn.primary {
      background: #2e7d32;
      border-color: #2e7d32;
    }
    .btn[disabled] {
      opacity: 0.4;
      cursor: default;
      pointer-events: none;
    }
    .toolbar {
      flex-direction: column;
      align-items: flex-start;
      gap: 6px;
      max-width: min(360px, calc(100% - 130px));
    }
    .toolrow {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      align-items: center;
    }
    .select.wide {
      min-width: 150px;
    }
    .hint {
      font-size: 12px;
      color: #cfe0ff;
      background: rgba(30, 33, 40, 0.7);
      padding: 4px 8px;
      border-radius: 6px;
    }
    ha-entity-picker {
      width: 240px;
      max-width: 70vw;
    }
    .palette-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .palette-thumb {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.06);
    }
    .palette {
      background: rgba(22, 24, 28, 0.96);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 12px;
      padding: 8px 10px;
      max-height: 60vh;
      overflow: auto;
      backdrop-filter: blur(6px);
      max-width: 340px;
    }
    .palette-group {
      font-size: 12px;
      font-weight: 600;
      color: #9ab;
      margin: 6px 2px 4px;
    }
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, 76px);
      gap: 6px;
    }
    .palette-cell {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      width: 76px;
      padding: 4px;
      border-radius: 8px;
      border: 1px solid transparent;
      background: rgba(255, 255, 255, 0.04);
      color: #ddd;
      font: inherit;
      font-size: 10px;
      cursor: pointer;
    }
    .palette-cell:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .palette-cell.active {
      border-color: var(--primary-color, #03a9f4);
      background: rgba(3, 169, 244, 0.18);
    }
    .palette-cell img {
      width: 64px;
      height: 64px;
    }
    .palette-cell span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 68px;
    }
    .toast {
      position: absolute;
      z-index: 4;
      bottom: 14px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      background: rgba(20, 22, 26, 0.92);
      border: 1px solid rgba(255, 255, 255, 0.16);
      padding: 9px 14px;
      border-radius: 10px;
      font-size: 13px;
      max-width: 86%;
      text-align: center;
      backdrop-filter: blur(4px);
    }
    .error {
      position: absolute;
      z-index: 3;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffb3b3;
      background: rgba(40, 20, 20, 0.9);
      padding: 12px 16px;
      border-radius: 8px;
      max-width: 80%;
      text-align: center;
    }
  `;
we([
  Js({ attribute: !1 })
], ve.prototype, "hass", 2);
we([
  Js({ attribute: !1 })
], ve.prototype, "panel", 2);
we([
  Js({ attribute: !1 })
], ve.prototype, "narrow", 2);
we([
  Ne()
], ve.prototype, "config", 2);
we([
  Ne()
], ve.prototype, "activeProjectId", 2);
we([
  Ne()
], ve.prototype, "loadError", 2);
we([
  Ne()
], ve.prototype, "floorNames", 2);
we([
  Ne()
], ve.prototype, "activeFloorIndex", 2);
we([
  Ne()
], ve.prototype, "editing", 2);
we([
  Ne()
], ve.prototype, "editTool", 2);
we([
  Ne()
], ve.prototype, "editPoints", 2);
we([
  Ne()
], ve.prototype, "editSelectedId", 2);
we([
  Ne()
], ve.prototype, "editSelectedModel", 2);
we([
  Ne()
], ve.prototype, "editSelectedEntity", 2);
we([
  Ne()
], ve.prototype, "editSelectedObjModel", 2);
we([
  Ne()
], ve.prototype, "paletteOpen", 2);
we([
  Ne()
], ve.prototype, "toast", 2);
we([
  Gd(".viewport")
], ve.prototype, "viewport", 2);
ve = we([
  ru("ha-3d-floorplan-card")
], ve);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-3d-floorplan-card",
  name: "3D Floor Plan Card",
  description: "Interactive true-3D floor plan with live entity bindings.",
  preview: !1,
  documentationURL: "https://github.com/your-org/ha-3d-floorplan-card"
});
console.info(
  `%c 3D-FLOORPLAN-CARD %c v${Wy} `,
  "color:#fff;background:#03a9f4;border-radius:4px 0 0 4px;padding:2px 6px",
  "color:#03a9f4;background:#222;border-radius:0 4px 4px 0;padding:2px 6px"
);
Jy();
var hM = Object.defineProperty, uM = Object.getOwnPropertyDescriptor, nr = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? uM(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && hM(t, e, s), s;
};
let ti = class extends Wi {
  constructor() {
    super(...arguments), this._planText = "";
  }
  setConfig(i) {
    this._config = i, i.plan ? this._planText = JSON.stringify(i.plan, null, 2) : !i.url && !i.projects && (this._planText = "");
  }
  _emit(i) {
    this._config = i, this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: i },
        bubbles: !0,
        composed: !0
      })
    );
  }
  _onField(i, t) {
    if (!this._config) return;
    const e = t.target.value, n = { ...this._config };
    e === "" ? delete n[i] : n[i] = e, this._emit(n);
  }
  _onPlanInput(i) {
    if (this._planText = i.target.value, !!this._config) {
      if (this._planText.trim() === "") {
        this._jsonError = void 0;
        const t = { ...this._config };
        delete t.plan, this._emit(t);
        return;
      }
      try {
        const t = JSON.parse(this._planText);
        if (!t.floors || !Array.isArray(t.floors))
          throw new Error('Plan must have a "floors" array.');
        this._jsonError = void 0;
        const e = { ...this._config, plan: t };
        delete e.url, this._emit(e);
      } catch (t) {
        this._jsonError = t?.message ?? "Invalid JSON";
      }
    }
  }
  render() {
    return this._config ? me`
      <div class="form">
        <label>
          Card height
          <input
            type="text"
            placeholder="500px"
            .value=${this._config.height ?? ""}
            @input=${(i) => this._onField("height", i)}
          />
        </label>

        <label>
          Background color
          <input
            type="text"
            placeholder="#1b1d22"
            .value=${this._config.background ?? ""}
            @input=${(i) => this._onField("background", i)}
          />
        </label>

        <label>
          Plan URL (alternative to inline plan)
          <input
            type="text"
            placeholder="/local/floorplans/home.json"
            .value=${this._config.url ?? ""}
            @input=${(i) => this._onField("url", i)}
          />
        </label>

        <label>
          Backend URL (optional, stretch goal)
          <input
            type="text"
            placeholder="http://localhost:8099"
            .value=${this._config.backend ?? ""}
            @input=${(i) => this._onField("backend", i)}
          />
        </label>

        <label class="plan">
          Floor plan JSON (inline)
          <textarea
            rows="16"
            spellcheck="false"
            .value=${this._planText}
            @input=${this._onPlanInput}
          ></textarea>
        </label>
        ${this._jsonError ? me`<div class="err">⚠ ${this._jsonError}</div>` : Vt}

        <p class="hint">
          A full visual wall-drawing editor with a furniture palette and
          entity-binding dropdowns is planned (Phase 2). For now, author the
          plan JSON here or point to a file under <code>/config/www/</code>.
        </p>
      </div>
    ` : Vt;
  }
};
ti.styles = tu`
    .form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 4px;
    }
    label {
      display: flex;
      flex-direction: column;
      font-size: 13px;
      gap: 4px;
      color: var(--primary-text-color, #222);
    }
    input,
    textarea {
      font: inherit;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid var(--divider-color, #ccc);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #222);
    }
    textarea {
      font-family: ui-monospace, Menlo, Consolas, monospace;
      font-size: 12px;
      resize: vertical;
    }
    .err {
      color: #c0392b;
      font-size: 12px;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color, #666);
    }
    code {
      background: rgba(0, 0, 0, 0.07);
      padding: 1px 4px;
      border-radius: 4px;
    }
  `;
nr([
  Js({ attribute: !1 })
], ti.prototype, "hass", 2);
nr([
  Ne()
], ti.prototype, "_config", 2);
nr([
  Ne()
], ti.prototype, "_planText", 2);
nr([
  Ne()
], ti.prototype, "_jsonError", 2);
ti = nr([
  ru("ha-3d-floorplan-card-editor")
], ti);
const dM = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get Ha3dFloorplanCardEditor() {
    return ti;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  ve as Ha3dFloorplanCard
};
