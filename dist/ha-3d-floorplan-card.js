/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Hr = globalThis, cl = Hr.ShadowRoot && (Hr.ShadyCSS === void 0 || Hr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, hl = Symbol(), Ql = /* @__PURE__ */ new WeakMap();
let au = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== hl) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (cl && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = Ql.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Ql.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const bd = (i) => new au(typeof i == "string" ? i : i + "", void 0, hl), lu = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, s, r) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[r + 1], i[0]);
  return new au(e, i, hl);
}, Td = (i, t) => {
  if (cl) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), s = Hr.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = e.cssText, i.appendChild(n);
  }
}, tc = cl ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return bd(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ad, defineProperty: wd, getOwnPropertyDescriptor: Rd, getOwnPropertyNames: Cd, getOwnPropertySymbols: Pd, getPrototypeOf: Ld } = Object, ao = globalThis, ec = ao.trustedTypes, Id = ec ? ec.emptyScript : "", Dd = ao.reactiveElementPolyfillSupport, Ns = (i, t) => i, Kr = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Id : null;
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
} }, ul = (i, t) => !Ad(i, t), nc = { attribute: !0, type: String, converter: Kr, reflect: !1, useDefault: !1, hasChanged: ul };
Symbol.metadata ??= Symbol("metadata"), ao.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Gi = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = nc) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, e);
      s !== void 0 && wd(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: s, set: r } = Rd(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? nc;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ns("elementProperties"))) return;
    const t = Ld(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ns("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ns("properties"))) {
      const e = this.properties, n = [...Cd(e), ...Pd(e)];
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
      for (const s of n) e.unshift(tc(s));
    } else t !== void 0 && e.push(tc(t));
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
    return Td(t, this.constructor.elementStyles), t;
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
      if (s === !1 && (r = this[t]), n ??= o.getPropertyOptions(t), !((n.hasChanged ?? ul)(r, e) || n.useDefault && n.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, n)))) return;
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
Gi.elementStyles = [], Gi.shadowRootOptions = { mode: "open" }, Gi[Ns("elementProperties")] = /* @__PURE__ */ new Map(), Gi[Ns("finalized")] = /* @__PURE__ */ new Map(), Dd?.({ ReactiveElement: Gi }), (ao.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dl = globalThis, ic = (i) => i, Zr = dl.trustedTypes, sc = Zr ? Zr.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, cu = "$lit$", qn = `lit$${Math.random().toFixed(9).slice(2)}$`, hu = "?" + qn, Nd = `<${hu}>`, _i = document, Hs = () => _i.createComment(""), Vs = (i) => i === null || typeof i != "object" && typeof i != "function", fl = Array.isArray, Ud = (i) => fl(i) || typeof i?.[Symbol.iterator] == "function", Mo = `[ 	
\f\r]`, gs = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rc = /-->/g, oc = />/g, ri = RegExp(`>|${Mo}(?:([^\\s"'>=/]+)(${Mo}*=${Mo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ac = /'/g, lc = /"/g, uu = /^(?:script|style|textarea|title)$/i, Od = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), ie = Od(1), Ji = Symbol.for("lit-noChange"), Bt = Symbol.for("lit-nothing"), cc = /* @__PURE__ */ new WeakMap(), gi = _i.createTreeWalker(_i, 129);
function du(i, t) {
  if (!fl(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return sc !== void 0 ? sc.createHTML(t) : t;
}
const Fd = (i, t) => {
  const e = i.length - 1, n = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = gs;
  for (let a = 0; a < e; a++) {
    const l = i[a];
    let c, h, u = -1, d = 0;
    for (; d < l.length && (o.lastIndex = d, h = o.exec(l), h !== null); ) d = o.lastIndex, o === gs ? h[1] === "!--" ? o = rc : h[1] !== void 0 ? o = oc : h[2] !== void 0 ? (uu.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = ri) : h[3] !== void 0 && (o = ri) : o === ri ? h[0] === ">" ? (o = s ?? gs, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, c = h[1], o = h[3] === void 0 ? ri : h[3] === '"' ? lc : ac) : o === lc || o === ac ? o = ri : o === rc || o === oc ? o = gs : (o = ri, s = void 0);
    const f = o === ri && i[a + 1].startsWith("/>") ? " " : "";
    r += o === gs ? l + Nd : u >= 0 ? (n.push(c), l.slice(0, u) + cu + l.slice(u) + qn + f) : l + qn + (u === -2 ? a : f);
  }
  return [du(i, r + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class Gs {
  constructor({ strings: t, _$litType$: e }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, l = this.parts, [c, h] = Fd(t, e);
    if (this.el = Gs.createElement(c, n), gi.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = gi.nextNode()) !== null && l.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(cu)) {
          const d = h[o++], f = s.getAttribute(u).split(qn), g = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: r, name: g[2], strings: f, ctor: g[1] === "." ? kd : g[1] === "?" ? zd : g[1] === "@" ? Hd : lo }), s.removeAttribute(u);
        } else u.startsWith(qn) && (l.push({ type: 6, index: r }), s.removeAttribute(u));
        if (uu.test(s.tagName)) {
          const u = s.textContent.split(qn), d = u.length - 1;
          if (d > 0) {
            s.textContent = Zr ? Zr.emptyScript : "";
            for (let f = 0; f < d; f++) s.append(u[f], Hs()), gi.nextNode(), l.push({ type: 2, index: ++r });
            s.append(u[d], Hs());
          }
        }
      } else if (s.nodeType === 8) if (s.data === hu) l.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(qn, u + 1)) !== -1; ) l.push({ type: 7, index: r }), u += qn.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const n = _i.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Qi(i, t, e = i, n) {
  if (t === Ji) return t;
  let s = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const r = Vs(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(i), s._$AT(i, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = s : e._$Cl = s), s !== void 0 && (t = Qi(i, s._$AS(i, t.values), s, n)), t;
}
class Bd {
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
    const { el: { content: e }, parts: n } = this._$AD, s = (t?.creationScope ?? _i).importNode(e, !0);
    gi.currentNode = s;
    let r = gi.nextNode(), o = 0, a = 0, l = n[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let c;
        l.type === 2 ? c = new Js(r, r.nextSibling, this, t) : l.type === 1 ? c = new l.ctor(r, l.name, l.strings, this, t) : l.type === 6 && (c = new Vd(r, this, t)), this._$AV.push(c), l = n[++a];
      }
      o !== l?.index && (r = gi.nextNode(), o++);
    }
    return gi.currentNode = _i, s;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class Js {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, s) {
    this.type = 2, this._$AH = Bt, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = Qi(this, t, e), Vs(t) ? t === Bt || t == null || t === "" ? (this._$AH !== Bt && this._$AR(), this._$AH = Bt) : t !== this._$AH && t !== Ji && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ud(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== Bt && Vs(this._$AH) ? this._$AA.nextSibling.data = t : this.T(_i.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = Gs.createElement(du(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const r = new Bd(s, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = cc.get(t.strings);
    return e === void 0 && cc.set(t.strings, e = new Gs(t)), e;
  }
  k(t) {
    fl(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, s = 0;
    for (const r of t) s === e.length ? e.push(n = new Js(this.O(Hs()), this.O(Hs()), this, this.options)) : n = e[s], n._$AI(r), s++;
    s < e.length && (this._$AR(n && n._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = ic(t).nextSibling;
      ic(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class lo {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, s, r) {
    this.type = 1, this._$AH = Bt, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = Bt;
  }
  _$AI(t, e = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = Qi(this, t, e, 0), o = !Vs(t) || t !== this._$AH && t !== Ji, o && (this._$AH = t);
    else {
      const a = t;
      let l, c;
      for (t = r[0], l = 0; l < r.length - 1; l++) c = Qi(this, a[n + l], e, l), c === Ji && (c = this._$AH[l]), o ||= !Vs(c) || c !== this._$AH[l], c === Bt ? t = Bt : t !== Bt && (t += (c ?? "") + r[l + 1]), this._$AH[l] = c;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === Bt ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class kd extends lo {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === Bt ? void 0 : t;
  }
}
class zd extends lo {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== Bt);
  }
}
class Hd extends lo {
  constructor(t, e, n, s, r) {
    super(t, e, n, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Qi(this, t, e, 0) ?? Bt) === Ji) return;
    const n = this._$AH, s = t === Bt && n !== Bt || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== Bt && (n === Bt || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Vd {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Qi(this, t);
  }
}
const Gd = dl.litHtmlPolyfillSupport;
Gd?.(Gs, Js), (dl.litHtmlVersions ??= []).push("3.3.3");
const Wd = (i, t, e) => {
  const n = e?.renderBefore ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = e?.renderBefore ?? null;
    n._$litPart$ = s = new Js(t.insertBefore(Hs(), r), r, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const pl = globalThis;
class $i extends Gi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Wd(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ji;
  }
}
$i._$litElement$ = !0, $i.finalized = !0, pl.litElementHydrateSupport?.({ LitElement: $i });
const Xd = pl.litElementPolyfillSupport;
Xd?.({ LitElement: $i });
(pl.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const fu = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $d = { attribute: !0, type: String, converter: Kr, reflect: !1, hasChanged: ul }, jd = (i = $d, t, e) => {
  const { kind: n, metadata: s } = e;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(e.name, i), n === "accessor") {
    const { name: o } = e;
    return { set(a) {
      const l = t.get.call(this);
      t.set.call(this, a), this.requestUpdate(o, l, i, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, i, a), a;
    } };
  }
  if (n === "setter") {
    const { name: o } = e;
    return function(a) {
      const l = this[o];
      t.call(this, a), this.requestUpdate(o, l, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function Qs(i) {
  return (t, e) => typeof e == "object" ? jd(i, t, e) : ((n, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ge(i) {
  return Qs({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qd = (i, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(i, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Yd(i, t) {
  return (e, n, s) => {
    const r = (o) => o.renderRoot?.querySelector(i) ?? null;
    return qd(e, n, { get() {
      return r(this);
    } });
  };
}
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const ml = "169", un = { ROTATE: 0, DOLLY: 1, PAN: 2 }, dn = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, Kd = 0, hc = 1, Zd = 2, pu = 1, mu = 2, In = 3, Fn = 0, $e = 1, fn = 2, Jn = 0, ji = 1, uc = 2, dc = 3, fc = 4, Jd = 5, pi = 100, Qd = 101, tf = 102, ef = 103, nf = 104, sf = 200, rf = 201, of = 202, af = 203, fa = 204, pa = 205, lf = 206, cf = 207, hf = 208, uf = 209, df = 210, ff = 211, pf = 212, mf = 213, gf = 214, ma = 0, ga = 1, _a = 2, ts = 3, va = 4, xa = 5, ya = 6, Ma = 7, gu = 0, _f = 1, vf = 2, Qn = 0, xf = 1, yf = 2, Mf = 3, Sf = 4, Ef = 5, bf = 6, Tf = 7, pc = "attached", Af = "detached", _u = 300, es = 301, ns = 302, Sa = 303, Ea = 304, co = 306, is = 1e3, Kn = 1001, Jr = 1002, Ve = 1003, vu = 1004, Is = 1005, Qe = 1006, Vr = 1007, Un = 1008, Bn = 1009, xu = 1010, yu = 1011, Ws = 1012, gl = 1013, vi = 1014, mn = 1015, tr = 1016, _l = 1017, vl = 1018, ss = 1020, Mu = 35902, Su = 1021, Eu = 1022, rn = 1023, bu = 1024, Tu = 1025, qi = 1026, rs = 1027, xl = 1028, yl = 1029, Au = 1030, Ml = 1031, Sl = 1033, Gr = 33776, Wr = 33777, Xr = 33778, $r = 33779, ba = 35840, Ta = 35841, Aa = 35842, wa = 35843, Ra = 36196, Ca = 37492, Pa = 37496, La = 37808, Ia = 37809, Da = 37810, Na = 37811, Ua = 37812, Oa = 37813, Fa = 37814, Ba = 37815, ka = 37816, za = 37817, Ha = 37818, Va = 37819, Ga = 37820, Wa = 37821, jr = 36492, Xa = 36494, $a = 36495, wu = 36283, ja = 36284, qa = 36285, Ya = 36286, Xs = 2300, $s = 2301, So = 2302, mc = 2400, gc = 2401, _c = 2402, wf = 2500, Rf = 0, Ru = 1, Ka = 2, Cf = 3200, Pf = 3201, Cu = 0, Lf = 1, Yn = "", He = "srgb", Ne = "srgb-linear", El = "display-p3", ho = "display-p3-linear", Qr = "linear", pe = "srgb", to = "rec709", eo = "p3", Ei = 7680, vc = 519, If = 512, Df = 513, Nf = 514, Pu = 515, Uf = 516, Of = 517, Ff = 518, Bf = 519, Za = 35044, xc = "300 es", On = 2e3, no = 2001;
class Mi {
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
let yc = 1234567;
const Us = Math.PI / 180, os = 180 / Math.PI;
function on() {
  const i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (Ue[i & 255] + Ue[i >> 8 & 255] + Ue[i >> 16 & 255] + Ue[i >> 24 & 255] + "-" + Ue[t & 255] + Ue[t >> 8 & 255] + "-" + Ue[t >> 16 & 15 | 64] + Ue[t >> 24 & 255] + "-" + Ue[e & 63 | 128] + Ue[e >> 8 & 255] + "-" + Ue[e >> 16 & 255] + Ue[e >> 24 & 255] + Ue[n & 255] + Ue[n >> 8 & 255] + Ue[n >> 16 & 255] + Ue[n >> 24 & 255]).toLowerCase();
}
function Te(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function bl(i, t) {
  return (i % t + t) % t;
}
function kf(i, t, e, n, s) {
  return n + (i - t) * (s - n) / (e - t);
}
function zf(i, t, e) {
  return i !== t ? (e - i) / (t - i) : 0;
}
function Os(i, t, e) {
  return (1 - e) * i + e * t;
}
function Hf(i, t, e, n) {
  return Os(i, t, 1 - Math.exp(-e * n));
}
function Vf(i, t = 1) {
  return t - Math.abs(bl(i, t * 2) - t);
}
function Gf(i, t, e) {
  return i <= t ? 0 : i >= e ? 1 : (i = (i - t) / (e - t), i * i * (3 - 2 * i));
}
function Wf(i, t, e) {
  return i <= t ? 0 : i >= e ? 1 : (i = (i - t) / (e - t), i * i * i * (i * (i * 6 - 15) + 10));
}
function Xf(i, t) {
  return i + Math.floor(Math.random() * (t - i + 1));
}
function $f(i, t) {
  return i + Math.random() * (t - i);
}
function jf(i) {
  return i * (0.5 - Math.random());
}
function qf(i) {
  i !== void 0 && (yc = i);
  let t = yc += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function Yf(i) {
  return i * Us;
}
function Kf(i) {
  return i * os;
}
function Zf(i) {
  return (i & i - 1) === 0 && i !== 0;
}
function Jf(i) {
  return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2));
}
function Qf(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function tp(i, t, e, n, s) {
  const r = Math.cos, o = Math.sin, a = r(e / 2), l = o(e / 2), c = r((t + n) / 2), h = o((t + n) / 2), u = r((t - n) / 2), d = o((t - n) / 2), f = r((n - t) / 2), g = o((n - t) / 2);
  switch (s) {
    case "XYX":
      i.set(a * h, l * u, l * d, a * c);
      break;
    case "YZY":
      i.set(l * d, a * h, l * u, a * c);
      break;
    case "ZXZ":
      i.set(l * u, l * d, a * h, a * c);
      break;
    case "XZX":
      i.set(a * h, l * g, l * f, a * c);
      break;
    case "YXY":
      i.set(l * f, a * h, l * g, a * c);
      break;
    case "ZYZ":
      i.set(l * g, l * f, a * h, a * c);
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
function se(i, t) {
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
const Yi = {
  DEG2RAD: Us,
  RAD2DEG: os,
  generateUUID: on,
  clamp: Te,
  euclideanModulo: bl,
  mapLinear: kf,
  inverseLerp: zf,
  lerp: Os,
  damp: Hf,
  pingpong: Vf,
  smoothstep: Gf,
  smootherstep: Wf,
  randInt: Xf,
  randFloat: $f,
  randFloatSpread: jf,
  seededRandom: qf,
  degToRad: Yf,
  radToDeg: Kf,
  isPowerOfTwo: Zf,
  ceilPowerOfTwo: Jf,
  floorPowerOfTwo: Qf,
  setQuaternionFromProperEuler: tp,
  normalize: se,
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
    return Math.acos(Te(n, -1, 1));
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
  constructor(t, e, n, s, r, o, a, l, c) {
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
    ], t !== void 0 && this.set(t, e, n, s, r, o, a, l, c);
  }
  set(t, e, n, s, r, o, a, l, c) {
    const h = this.elements;
    return h[0] = t, h[1] = s, h[2] = a, h[3] = e, h[4] = r, h[5] = l, h[6] = n, h[7] = o, h[8] = c, this;
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
    const n = t.elements, s = e.elements, r = this.elements, o = n[0], a = n[3], l = n[6], c = n[1], h = n[4], u = n[7], d = n[2], f = n[5], g = n[8], _ = s[0], p = s[3], m = s[6], y = s[1], v = s[4], M = s[7], P = s[2], w = s[5], A = s[8];
    return r[0] = o * _ + a * y + l * P, r[3] = o * p + a * v + l * w, r[6] = o * m + a * M + l * A, r[1] = c * _ + h * y + u * P, r[4] = c * p + h * v + u * w, r[7] = c * m + h * M + u * A, r[2] = d * _ + f * y + g * P, r[5] = d * p + f * v + g * w, r[8] = d * m + f * M + g * A, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], o = t[4], a = t[5], l = t[6], c = t[7], h = t[8];
    return e * o * h - e * a * c - n * r * h + n * a * l + s * r * c - s * o * l;
  }
  invert() {
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], o = t[4], a = t[5], l = t[6], c = t[7], h = t[8], u = h * o - a * c, d = a * l - h * r, f = c * r - o * l, g = e * u + n * d + s * f;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const _ = 1 / g;
    return t[0] = u * _, t[1] = (s * c - h * n) * _, t[2] = (a * n - s * o) * _, t[3] = d * _, t[4] = (h * e - s * l) * _, t[5] = (s * r - a * e) * _, t[6] = f * _, t[7] = (n * l - c * e) * _, t[8] = (o * e - n * r) * _, this;
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
    const l = Math.cos(r), c = Math.sin(r);
    return this.set(
      n * l,
      n * c,
      -n * (l * o + c * a) + o + t,
      -s * c,
      s * l,
      -s * (-c * o + l * a) + a + e,
      0,
      0,
      1
    ), this;
  }
  //
  scale(t, e) {
    return this.premultiply(Eo.makeScale(t, e)), this;
  }
  rotate(t) {
    return this.premultiply(Eo.makeRotation(-t)), this;
  }
  translate(t, e) {
    return this.premultiply(Eo.makeTranslation(t, e)), this;
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
const Eo = /* @__PURE__ */ new Ft();
function Lu(i) {
  for (let t = i.length - 1; t >= 0; --t)
    if (i[t] >= 65535) return !0;
  return !1;
}
function js(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function ep() {
  const i = js("canvas");
  return i.style.display = "block", i;
}
const Mc = {};
function qr(i) {
  i in Mc || (Mc[i] = !0, console.warn(i));
}
function np(i, t, e) {
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
function ip(i) {
  const t = i.elements;
  t[2] = 0.5 * t[2] + 0.5 * t[3], t[6] = 0.5 * t[6] + 0.5 * t[7], t[10] = 0.5 * t[10] + 0.5 * t[11], t[14] = 0.5 * t[14] + 0.5 * t[15];
}
function sp(i) {
  const t = i.elements;
  t[11] === -1 ? (t[10] = -t[10] - 1, t[14] = -t[14]) : (t[10] = -t[10], t[14] = -t[14] + 1);
}
const Sc = /* @__PURE__ */ new Ft().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), Ec = /* @__PURE__ */ new Ft().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), _s = {
  [Ne]: {
    transfer: Qr,
    primaries: to,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (i) => i,
    fromReference: (i) => i
  },
  [He]: {
    transfer: pe,
    primaries: to,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (i) => i.convertSRGBToLinear(),
    fromReference: (i) => i.convertLinearToSRGB()
  },
  [ho]: {
    transfer: Qr,
    primaries: eo,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (i) => i.applyMatrix3(Ec),
    fromReference: (i) => i.applyMatrix3(Sc)
  },
  [El]: {
    transfer: pe,
    primaries: eo,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (i) => i.convertSRGBToLinear().applyMatrix3(Ec),
    fromReference: (i) => i.applyMatrix3(Sc).convertLinearToSRGB()
  }
}, rp = /* @__PURE__ */ new Set([Ne, ho]), qt = {
  enabled: !0,
  _workingColorSpace: Ne,
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(i) {
    if (!rp.has(i))
      throw new Error(`Unsupported working color space, "${i}".`);
    this._workingColorSpace = i;
  },
  convert: function(i, t, e) {
    if (this.enabled === !1 || t === e || !t || !e)
      return i;
    const n = _s[t].toReference, s = _s[e].fromReference;
    return s(n(i));
  },
  fromWorkingColorSpace: function(i, t) {
    return this.convert(i, this._workingColorSpace, t);
  },
  toWorkingColorSpace: function(i, t) {
    return this.convert(i, t, this._workingColorSpace);
  },
  getPrimaries: function(i) {
    return _s[i].primaries;
  },
  getTransfer: function(i) {
    return i === Yn ? Qr : _s[i].transfer;
  },
  getLuminanceCoefficients: function(i, t = this._workingColorSpace) {
    return i.fromArray(_s[t].luminanceCoefficients);
  }
};
function Ki(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function bo(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let bi;
class op {
  static getDataURL(t) {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u")
      return t.src;
    let e;
    if (t instanceof HTMLCanvasElement)
      e = t;
    else {
      bi === void 0 && (bi = js("canvas")), bi.width = t.width, bi.height = t.height;
      const n = bi.getContext("2d");
      t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = bi;
    }
    return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6)) : e.toDataURL("image/png");
  }
  static sRGBToLinear(t) {
    if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
      const e = js("canvas");
      e.width = t.width, e.height = t.height;
      const n = e.getContext("2d");
      n.drawImage(t, 0, 0, t.width, t.height);
      const s = n.getImageData(0, 0, t.width, t.height), r = s.data;
      for (let o = 0; o < r.length; o++)
        r[o] = Ki(r[o] / 255) * 255;
      return n.putImageData(s, 0, 0), e;
    } else if (t.data) {
      const e = t.data.slice(0);
      for (let n = 0; n < e.length; n++)
        e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[n] = Math.floor(Ki(e[n] / 255) * 255) : e[n] = Ki(e[n]);
      return {
        data: e,
        width: t.width,
        height: t.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t;
  }
}
let ap = 0;
class Iu {
  constructor(t = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: ap++ }), this.uuid = on(), this.data = t, this.dataReady = !0, this.version = 0;
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
          s[o].isDataTexture ? r.push(To(s[o].image)) : r.push(To(s[o]));
      } else
        r = To(s);
      n.url = r;
    }
    return e || (t.images[this.uuid] = n), n;
  }
}
function To(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? op.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let lp = 0;
class Ae extends Mi {
  constructor(t = Ae.DEFAULT_IMAGE, e = Ae.DEFAULT_MAPPING, n = Kn, s = Kn, r = Qe, o = Un, a = rn, l = Bn, c = Ae.DEFAULT_ANISOTROPY, h = Yn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: lp++ }), this.uuid = on(), this.name = "", this.source = new Iu(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = s, this.magFilter = r, this.minFilter = o, this.anisotropy = c, this.format = a, this.internalFormat = null, this.type = l, this.offset = new tt(0, 0), this.repeat = new tt(1, 1), this.center = new tt(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Ft(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
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
    if (this.mapping !== _u) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1)
      switch (this.wrapS) {
        case is:
          t.x = t.x - Math.floor(t.x);
          break;
        case Kn:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case Jr:
          Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
          break;
      }
    if (t.y < 0 || t.y > 1)
      switch (this.wrapT) {
        case is:
          t.y = t.y - Math.floor(t.y);
          break;
        case Kn:
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
Ae.DEFAULT_IMAGE = null;
Ae.DEFAULT_MAPPING = _u;
Ae.DEFAULT_ANISOTROPY = 1;
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
    const l = t.elements, c = l[0], h = l[4], u = l[8], d = l[1], f = l[5], g = l[9], _ = l[2], p = l[6], m = l[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(u - _) < 0.01 && Math.abs(g - p) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(u + _) < 0.1 && Math.abs(g + p) < 0.1 && Math.abs(c + f + m - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      e = Math.PI;
      const v = (c + 1) / 2, M = (f + 1) / 2, P = (m + 1) / 2, w = (h + d) / 4, A = (u + _) / 4, L = (g + p) / 4;
      return v > M && v > P ? v < 0.01 ? (n = 0, s = 0.707106781, r = 0.707106781) : (n = Math.sqrt(v), s = w / n, r = A / n) : M > P ? M < 0.01 ? (n = 0.707106781, s = 0, r = 0.707106781) : (s = Math.sqrt(M), n = w / s, r = L / s) : P < 0.01 ? (n = 0.707106781, s = 0.707106781, r = 0) : (r = Math.sqrt(P), n = A / r, s = L / r), this.set(n, s, r, e), this;
    }
    let y = Math.sqrt((p - g) * (p - g) + (u - _) * (u - _) + (d - h) * (d - h));
    return Math.abs(y) < 1e-3 && (y = 1), this.x = (p - g) / y, this.y = (u - _) / y, this.z = (d - h) / y, this.w = Math.acos((c + f + m - 1) / 2), this;
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
class cp extends Mi {
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
    const r = new Ae(s, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
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
    return this.texture.source = new Iu(e), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class xi extends cp {
  constructor(t = 1, e = 1, n = {}) {
    super(t, e, n), this.isWebGLRenderTarget = !0;
  }
}
class Du extends Ae {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Ve, this.minFilter = Ve, this.wrapR = Kn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class hp extends Ae {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Ve, this.minFilter = Ve, this.wrapR = Kn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class xn {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    this.isQuaternion = !0, this._x = t, this._y = e, this._z = n, this._w = s;
  }
  static slerpFlat(t, e, n, s, r, o, a) {
    let l = n[s + 0], c = n[s + 1], h = n[s + 2], u = n[s + 3];
    const d = r[o + 0], f = r[o + 1], g = r[o + 2], _ = r[o + 3];
    if (a === 0) {
      t[e + 0] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = u;
      return;
    }
    if (a === 1) {
      t[e + 0] = d, t[e + 1] = f, t[e + 2] = g, t[e + 3] = _;
      return;
    }
    if (u !== _ || l !== d || c !== f || h !== g) {
      let p = 1 - a;
      const m = l * d + c * f + h * g + u * _, y = m >= 0 ? 1 : -1, v = 1 - m * m;
      if (v > Number.EPSILON) {
        const P = Math.sqrt(v), w = Math.atan2(P, m * y);
        p = Math.sin(p * w) / P, a = Math.sin(a * w) / P;
      }
      const M = a * y;
      if (l = l * p + d * M, c = c * p + f * M, h = h * p + g * M, u = u * p + _ * M, p === 1 - a) {
        const P = 1 / Math.sqrt(l * l + c * c + h * h + u * u);
        l *= P, c *= P, h *= P, u *= P;
      }
    }
    t[e] = l, t[e + 1] = c, t[e + 2] = h, t[e + 3] = u;
  }
  static multiplyQuaternionsFlat(t, e, n, s, r, o) {
    const a = n[s], l = n[s + 1], c = n[s + 2], h = n[s + 3], u = r[o], d = r[o + 1], f = r[o + 2], g = r[o + 3];
    return t[e] = a * g + h * u + l * f - c * d, t[e + 1] = l * g + h * d + c * u - a * f, t[e + 2] = c * g + h * f + a * d - l * u, t[e + 3] = h * g - a * u - l * d - c * f, t;
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
    const n = t._x, s = t._y, r = t._z, o = t._order, a = Math.cos, l = Math.sin, c = a(n / 2), h = a(s / 2), u = a(r / 2), d = l(n / 2), f = l(s / 2), g = l(r / 2);
    switch (o) {
      case "XYZ":
        this._x = d * h * u + c * f * g, this._y = c * f * u - d * h * g, this._z = c * h * g + d * f * u, this._w = c * h * u - d * f * g;
        break;
      case "YXZ":
        this._x = d * h * u + c * f * g, this._y = c * f * u - d * h * g, this._z = c * h * g - d * f * u, this._w = c * h * u + d * f * g;
        break;
      case "ZXY":
        this._x = d * h * u - c * f * g, this._y = c * f * u + d * h * g, this._z = c * h * g + d * f * u, this._w = c * h * u - d * f * g;
        break;
      case "ZYX":
        this._x = d * h * u - c * f * g, this._y = c * f * u + d * h * g, this._z = c * h * g - d * f * u, this._w = c * h * u + d * f * g;
        break;
      case "YZX":
        this._x = d * h * u + c * f * g, this._y = c * f * u + d * h * g, this._z = c * h * g - d * f * u, this._w = c * h * u - d * f * g;
        break;
      case "XZY":
        this._x = d * h * u - c * f * g, this._y = c * f * u - d * h * g, this._z = c * h * g + d * f * u, this._w = c * h * u + d * f * g;
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
    const e = t.elements, n = e[0], s = e[4], r = e[8], o = e[1], a = e[5], l = e[9], c = e[2], h = e[6], u = e[10], d = n + a + u;
    if (d > 0) {
      const f = 0.5 / Math.sqrt(d + 1);
      this._w = 0.25 / f, this._x = (h - l) * f, this._y = (r - c) * f, this._z = (o - s) * f;
    } else if (n > a && n > u) {
      const f = 2 * Math.sqrt(1 + n - a - u);
      this._w = (h - l) / f, this._x = 0.25 * f, this._y = (s + o) / f, this._z = (r + c) / f;
    } else if (a > u) {
      const f = 2 * Math.sqrt(1 + a - n - u);
      this._w = (r - c) / f, this._x = (s + o) / f, this._y = 0.25 * f, this._z = (l + h) / f;
    } else {
      const f = 2 * Math.sqrt(1 + u - n - a);
      this._w = (o - s) / f, this._x = (r + c) / f, this._y = (l + h) / f, this._z = 0.25 * f;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(t, e) {
    let n = t.dot(e) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize();
  }
  angleTo(t) {
    return 2 * Math.acos(Math.abs(Te(this.dot(t), -1, 1)));
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
    const n = t._x, s = t._y, r = t._z, o = t._w, a = e._x, l = e._y, c = e._z, h = e._w;
    return this._x = n * h + o * a + s * c - r * l, this._y = s * h + o * l + r * a - n * c, this._z = r * h + o * c + n * l - s * a, this._w = o * h - n * a - s * l - r * c, this._onChangeCallback(), this;
  }
  slerp(t, e) {
    if (e === 0) return this;
    if (e === 1) return this.copy(t);
    const n = this._x, s = this._y, r = this._z, o = this._w;
    let a = o * t._w + n * t._x + s * t._y + r * t._z;
    if (a < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, a = -a) : this.copy(t), a >= 1)
      return this._w = o, this._x = n, this._y = s, this._z = r, this;
    const l = 1 - a * a;
    if (l <= Number.EPSILON) {
      const f = 1 - e;
      return this._w = f * o + e * this._w, this._x = f * n + e * this._x, this._y = f * s + e * this._y, this._z = f * r + e * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(l), h = Math.atan2(c, a), u = Math.sin((1 - e) * h) / c, d = Math.sin(e * h) / c;
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
class R {
  constructor(t = 0, e = 0, n = 0) {
    R.prototype.isVector3 = !0, this.x = t, this.y = e, this.z = n;
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
    return this.applyQuaternion(bc.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(bc.setFromAxisAngle(t, e));
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
    const e = this.x, n = this.y, s = this.z, r = t.x, o = t.y, a = t.z, l = t.w, c = 2 * (o * s - a * n), h = 2 * (a * e - r * s), u = 2 * (r * n - o * e);
    return this.x = e + l * c + o * u - a * h, this.y = n + l * h + a * c - r * u, this.z = s + l * u + r * h - o * c, this;
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
    const n = t.x, s = t.y, r = t.z, o = e.x, a = e.y, l = e.z;
    return this.x = s * l - r * a, this.y = r * o - n * l, this.z = n * a - s * o, this;
  }
  projectOnVector(t) {
    const e = t.lengthSq();
    if (e === 0) return this.set(0, 0, 0);
    const n = t.dot(this) / e;
    return this.copy(t).multiplyScalar(n);
  }
  projectOnPlane(t) {
    return Ao.copy(this).projectOnVector(t), this.sub(Ao);
  }
  reflect(t) {
    return this.sub(Ao.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(Te(n, -1, 1));
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
const Ao = /* @__PURE__ */ new R(), bc = /* @__PURE__ */ new xn();
class je {
  constructor(t = new R(1 / 0, 1 / 0, 1 / 0), e = new R(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = t, this.max = e;
  }
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3)
      this.expandByPoint(ln.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++)
      this.expandByPoint(ln.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++)
      this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = ln.copy(e).multiplyScalar(0.5);
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
          t.isMesh === !0 ? t.getVertexPosition(o, ln) : ln.fromBufferAttribute(r, o), ln.applyMatrix4(t.matrixWorld), this.expandByPoint(ln);
      else
        t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), or.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), or.copy(n.boundingBox)), or.applyMatrix4(t.matrixWorld), this.union(or);
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
    return this.clampPoint(t.center, ln), ln.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let e, n;
    return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
  }
  intersectsTriangle(t) {
    if (this.isEmpty())
      return !1;
    this.getCenter(vs), ar.subVectors(this.max, vs), Ti.subVectors(t.a, vs), Ai.subVectors(t.b, vs), wi.subVectors(t.c, vs), zn.subVectors(Ai, Ti), Hn.subVectors(wi, Ai), oi.subVectors(Ti, wi);
    let e = [
      0,
      -zn.z,
      zn.y,
      0,
      -Hn.z,
      Hn.y,
      0,
      -oi.z,
      oi.y,
      zn.z,
      0,
      -zn.x,
      Hn.z,
      0,
      -Hn.x,
      oi.z,
      0,
      -oi.x,
      -zn.y,
      zn.x,
      0,
      -Hn.y,
      Hn.x,
      0,
      -oi.y,
      oi.x,
      0
    ];
    return !wo(e, Ti, Ai, wi, ar) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !wo(e, Ti, Ai, wi, ar)) ? !1 : (lr.crossVectors(zn, Hn), e = [lr.x, lr.y, lr.z], wo(e, Ti, Ai, wi, ar));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, ln).distanceTo(t);
  }
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(ln).length() * 0.5), t;
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
  /* @__PURE__ */ new R(),
  /* @__PURE__ */ new R(),
  /* @__PURE__ */ new R(),
  /* @__PURE__ */ new R(),
  /* @__PURE__ */ new R(),
  /* @__PURE__ */ new R(),
  /* @__PURE__ */ new R(),
  /* @__PURE__ */ new R()
], ln = /* @__PURE__ */ new R(), or = /* @__PURE__ */ new je(), Ti = /* @__PURE__ */ new R(), Ai = /* @__PURE__ */ new R(), wi = /* @__PURE__ */ new R(), zn = /* @__PURE__ */ new R(), Hn = /* @__PURE__ */ new R(), oi = /* @__PURE__ */ new R(), vs = /* @__PURE__ */ new R(), ar = /* @__PURE__ */ new R(), lr = /* @__PURE__ */ new R(), ai = /* @__PURE__ */ new R();
function wo(i, t, e, n, s) {
  for (let r = 0, o = i.length - 3; r <= o; r += 3) {
    ai.fromArray(i, r);
    const a = s.x * Math.abs(ai.x) + s.y * Math.abs(ai.y) + s.z * Math.abs(ai.z), l = t.dot(ai), c = e.dot(ai), h = n.dot(ai);
    if (Math.max(-Math.max(l, c, h), Math.min(l, c, h)) > a)
      return !1;
  }
  return !0;
}
const up = /* @__PURE__ */ new je(), xs = /* @__PURE__ */ new R(), Ro = /* @__PURE__ */ new R();
class Mn {
  constructor(t = new R(), e = -1) {
    this.isSphere = !0, this.center = t, this.radius = e;
  }
  set(t, e) {
    return this.center.copy(t), this.radius = e, this;
  }
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : up.setFromPoints(t).getCenter(n);
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
    xs.subVectors(t, this.center);
    const e = xs.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e), s = (n - this.radius) * 0.5;
      this.center.addScaledVector(xs, s / n), this.radius += s;
    }
    return this;
  }
  union(t) {
    return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === !0 ? this.radius = Math.max(this.radius, t.radius) : (Ro.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(xs.copy(t.center).add(Ro)), this.expandByPoint(xs.copy(t.center).sub(Ro))), this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const wn = /* @__PURE__ */ new R(), Co = /* @__PURE__ */ new R(), cr = /* @__PURE__ */ new R(), Vn = /* @__PURE__ */ new R(), Po = /* @__PURE__ */ new R(), hr = /* @__PURE__ */ new R(), Lo = /* @__PURE__ */ new R();
class us {
  constructor(t = new R(), e = new R(0, 0, -1)) {
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
    Co.copy(t).add(e).multiplyScalar(0.5), cr.copy(e).sub(t).normalize(), Vn.copy(this.origin).sub(Co);
    const r = t.distanceTo(e) * 0.5, o = -this.direction.dot(cr), a = Vn.dot(this.direction), l = -Vn.dot(cr), c = Vn.lengthSq(), h = Math.abs(1 - o * o);
    let u, d, f, g;
    if (h > 0)
      if (u = o * l - a, d = o * a - l, g = r * h, u >= 0)
        if (d >= -g)
          if (d <= g) {
            const _ = 1 / h;
            u *= _, d *= _, f = u * (u + o * d + 2 * a) + d * (o * u + d + 2 * l) + c;
          } else
            d = r, u = Math.max(0, -(o * d + a)), f = -u * u + d * (d + 2 * l) + c;
        else
          d = -r, u = Math.max(0, -(o * d + a)), f = -u * u + d * (d + 2 * l) + c;
      else
        d <= -g ? (u = Math.max(0, -(-o * r + a)), d = u > 0 ? -r : Math.min(Math.max(-r, -l), r), f = -u * u + d * (d + 2 * l) + c) : d <= g ? (u = 0, d = Math.min(Math.max(-r, -l), r), f = d * (d + 2 * l) + c) : (u = Math.max(0, -(o * r + a)), d = u > 0 ? r : Math.min(Math.max(-r, -l), r), f = -u * u + d * (d + 2 * l) + c);
    else
      d = o > 0 ? -r : r, u = Math.max(0, -(o * d + a)), f = -u * u + d * (d + 2 * l) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, u), s && s.copy(Co).addScaledVector(cr, d), f;
  }
  intersectSphere(t, e) {
    wn.subVectors(t.center, this.origin);
    const n = wn.dot(this.direction), s = wn.dot(wn) - n * n, r = t.radius * t.radius;
    if (s > r) return null;
    const o = Math.sqrt(r - s), a = n - o, l = n + o;
    return l < 0 ? null : a < 0 ? this.at(l, e) : this.at(a, e);
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
    let n, s, r, o, a, l;
    const c = 1 / this.direction.x, h = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
    return c >= 0 ? (n = (t.min.x - d.x) * c, s = (t.max.x - d.x) * c) : (n = (t.max.x - d.x) * c, s = (t.min.x - d.x) * c), h >= 0 ? (r = (t.min.y - d.y) * h, o = (t.max.y - d.y) * h) : (r = (t.max.y - d.y) * h, o = (t.min.y - d.y) * h), n > o || r > s || ((r > n || isNaN(n)) && (n = r), (o < s || isNaN(s)) && (s = o), u >= 0 ? (a = (t.min.z - d.z) * u, l = (t.max.z - d.z) * u) : (a = (t.max.z - d.z) * u, l = (t.min.z - d.z) * u), n > l || a > s) || ((a > n || n !== n) && (n = a), (l < s || s !== s) && (s = l), s < 0) ? null : this.at(n >= 0 ? n : s, e);
  }
  intersectsBox(t) {
    return this.intersectBox(t, wn) !== null;
  }
  intersectTriangle(t, e, n, s, r) {
    Po.subVectors(e, t), hr.subVectors(n, t), Lo.crossVectors(Po, hr);
    let o = this.direction.dot(Lo), a;
    if (o > 0) {
      if (s) return null;
      a = 1;
    } else if (o < 0)
      a = -1, o = -o;
    else
      return null;
    Vn.subVectors(this.origin, t);
    const l = a * this.direction.dot(hr.crossVectors(Vn, hr));
    if (l < 0)
      return null;
    const c = a * this.direction.dot(Po.cross(Vn));
    if (c < 0 || l + c > o)
      return null;
    const h = -a * Vn.dot(Lo);
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
  constructor(t, e, n, s, r, o, a, l, c, h, u, d, f, g, _, p) {
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
    ], t !== void 0 && this.set(t, e, n, s, r, o, a, l, c, h, u, d, f, g, _, p);
  }
  set(t, e, n, s, r, o, a, l, c, h, u, d, f, g, _, p) {
    const m = this.elements;
    return m[0] = t, m[4] = e, m[8] = n, m[12] = s, m[1] = r, m[5] = o, m[9] = a, m[13] = l, m[2] = c, m[6] = h, m[10] = u, m[14] = d, m[3] = f, m[7] = g, m[11] = _, m[15] = p, this;
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
    const e = this.elements, n = t.elements, s = 1 / Ri.setFromMatrixColumn(t, 0).length(), r = 1 / Ri.setFromMatrixColumn(t, 1).length(), o = 1 / Ri.setFromMatrixColumn(t, 2).length();
    return e[0] = n[0] * s, e[1] = n[1] * s, e[2] = n[2] * s, e[3] = 0, e[4] = n[4] * r, e[5] = n[5] * r, e[6] = n[6] * r, e[7] = 0, e[8] = n[8] * o, e[9] = n[9] * o, e[10] = n[10] * o, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromEuler(t) {
    const e = this.elements, n = t.x, s = t.y, r = t.z, o = Math.cos(n), a = Math.sin(n), l = Math.cos(s), c = Math.sin(s), h = Math.cos(r), u = Math.sin(r);
    if (t.order === "XYZ") {
      const d = o * h, f = o * u, g = a * h, _ = a * u;
      e[0] = l * h, e[4] = -l * u, e[8] = c, e[1] = f + g * c, e[5] = d - _ * c, e[9] = -a * l, e[2] = _ - d * c, e[6] = g + f * c, e[10] = o * l;
    } else if (t.order === "YXZ") {
      const d = l * h, f = l * u, g = c * h, _ = c * u;
      e[0] = d + _ * a, e[4] = g * a - f, e[8] = o * c, e[1] = o * u, e[5] = o * h, e[9] = -a, e[2] = f * a - g, e[6] = _ + d * a, e[10] = o * l;
    } else if (t.order === "ZXY") {
      const d = l * h, f = l * u, g = c * h, _ = c * u;
      e[0] = d - _ * a, e[4] = -o * u, e[8] = g + f * a, e[1] = f + g * a, e[5] = o * h, e[9] = _ - d * a, e[2] = -o * c, e[6] = a, e[10] = o * l;
    } else if (t.order === "ZYX") {
      const d = o * h, f = o * u, g = a * h, _ = a * u;
      e[0] = l * h, e[4] = g * c - f, e[8] = d * c + _, e[1] = l * u, e[5] = _ * c + d, e[9] = f * c - g, e[2] = -c, e[6] = a * l, e[10] = o * l;
    } else if (t.order === "YZX") {
      const d = o * l, f = o * c, g = a * l, _ = a * c;
      e[0] = l * h, e[4] = _ - d * u, e[8] = g * u + f, e[1] = u, e[5] = o * h, e[9] = -a * h, e[2] = -c * h, e[6] = f * u + g, e[10] = d - _ * u;
    } else if (t.order === "XZY") {
      const d = o * l, f = o * c, g = a * l, _ = a * c;
      e[0] = l * h, e[4] = -u, e[8] = c * h, e[1] = d * u + _, e[5] = o * h, e[9] = f * u - g, e[2] = g * u - f, e[6] = a * h, e[10] = _ * u + d;
    }
    return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this;
  }
  makeRotationFromQuaternion(t) {
    return this.compose(dp, t, fp);
  }
  lookAt(t, e, n) {
    const s = this.elements;
    return Ze.subVectors(t, e), Ze.lengthSq() === 0 && (Ze.z = 1), Ze.normalize(), Gn.crossVectors(n, Ze), Gn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Ze.x += 1e-4 : Ze.z += 1e-4, Ze.normalize(), Gn.crossVectors(n, Ze)), Gn.normalize(), ur.crossVectors(Ze, Gn), s[0] = Gn.x, s[4] = ur.x, s[8] = Ze.x, s[1] = Gn.y, s[5] = ur.y, s[9] = Ze.y, s[2] = Gn.z, s[6] = ur.z, s[10] = Ze.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, s = e.elements, r = this.elements, o = n[0], a = n[4], l = n[8], c = n[12], h = n[1], u = n[5], d = n[9], f = n[13], g = n[2], _ = n[6], p = n[10], m = n[14], y = n[3], v = n[7], M = n[11], P = n[15], w = s[0], A = s[4], L = s[8], G = s[12], x = s[1], b = s[5], B = s[9], k = s[13], H = s[2], K = s[6], z = s[10], nt = s[14], W = s[3], ut = s[7], dt = s[11], Mt = s[15];
    return r[0] = o * w + a * x + l * H + c * W, r[4] = o * A + a * b + l * K + c * ut, r[8] = o * L + a * B + l * z + c * dt, r[12] = o * G + a * k + l * nt + c * Mt, r[1] = h * w + u * x + d * H + f * W, r[5] = h * A + u * b + d * K + f * ut, r[9] = h * L + u * B + d * z + f * dt, r[13] = h * G + u * k + d * nt + f * Mt, r[2] = g * w + _ * x + p * H + m * W, r[6] = g * A + _ * b + p * K + m * ut, r[10] = g * L + _ * B + p * z + m * dt, r[14] = g * G + _ * k + p * nt + m * Mt, r[3] = y * w + v * x + M * H + P * W, r[7] = y * A + v * b + M * K + P * ut, r[11] = y * L + v * B + M * z + P * dt, r[15] = y * G + v * k + M * nt + P * Mt, this;
  }
  multiplyScalar(t) {
    const e = this.elements;
    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this;
  }
  determinant() {
    const t = this.elements, e = t[0], n = t[4], s = t[8], r = t[12], o = t[1], a = t[5], l = t[9], c = t[13], h = t[2], u = t[6], d = t[10], f = t[14], g = t[3], _ = t[7], p = t[11], m = t[15];
    return g * (+r * l * u - s * c * u - r * a * d + n * c * d + s * a * f - n * l * f) + _ * (+e * l * f - e * c * d + r * o * d - s * o * f + s * c * h - r * l * h) + p * (+e * c * u - e * a * f - r * o * u + n * o * f + r * a * h - n * c * h) + m * (-s * a * h - e * l * u + e * a * d + s * o * u - n * o * d + n * l * h);
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
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], o = t[4], a = t[5], l = t[6], c = t[7], h = t[8], u = t[9], d = t[10], f = t[11], g = t[12], _ = t[13], p = t[14], m = t[15], y = u * p * c - _ * d * c + _ * l * f - a * p * f - u * l * m + a * d * m, v = g * d * c - h * p * c - g * l * f + o * p * f + h * l * m - o * d * m, M = h * _ * c - g * u * c + g * a * f - o * _ * f - h * a * m + o * u * m, P = g * u * l - h * _ * l - g * a * d + o * _ * d + h * a * p - o * u * p, w = e * y + n * v + s * M + r * P;
    if (w === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const A = 1 / w;
    return t[0] = y * A, t[1] = (_ * d * r - u * p * r - _ * s * f + n * p * f + u * s * m - n * d * m) * A, t[2] = (a * p * r - _ * l * r + _ * s * c - n * p * c - a * s * m + n * l * m) * A, t[3] = (u * l * r - a * d * r - u * s * c + n * d * c + a * s * f - n * l * f) * A, t[4] = v * A, t[5] = (h * p * r - g * d * r + g * s * f - e * p * f - h * s * m + e * d * m) * A, t[6] = (g * l * r - o * p * r - g * s * c + e * p * c + o * s * m - e * l * m) * A, t[7] = (o * d * r - h * l * r + h * s * c - e * d * c - o * s * f + e * l * f) * A, t[8] = M * A, t[9] = (g * u * r - h * _ * r - g * n * f + e * _ * f + h * n * m - e * u * m) * A, t[10] = (o * _ * r - g * a * r + g * n * c - e * _ * c - o * n * m + e * a * m) * A, t[11] = (h * a * r - o * u * r - h * n * c + e * u * c + o * n * f - e * a * f) * A, t[12] = P * A, t[13] = (h * _ * s - g * u * s + g * n * d - e * _ * d - h * n * p + e * u * p) * A, t[14] = (g * a * s - o * _ * s - g * n * l + e * _ * l + o * n * p - e * a * p) * A, t[15] = (o * u * s - h * a * s + h * n * l - e * u * l - o * n * d + e * a * d) * A, this;
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
    const n = Math.cos(e), s = Math.sin(e), r = 1 - n, o = t.x, a = t.y, l = t.z, c = r * o, h = r * a;
    return this.set(
      c * o + n,
      c * a - s * l,
      c * l + s * a,
      0,
      c * a + s * l,
      h * a + n,
      h * l - s * o,
      0,
      c * l - s * a,
      h * l + s * o,
      r * l * l + n,
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
    const s = this.elements, r = e._x, o = e._y, a = e._z, l = e._w, c = r + r, h = o + o, u = a + a, d = r * c, f = r * h, g = r * u, _ = o * h, p = o * u, m = a * u, y = l * c, v = l * h, M = l * u, P = n.x, w = n.y, A = n.z;
    return s[0] = (1 - (_ + m)) * P, s[1] = (f + M) * P, s[2] = (g - v) * P, s[3] = 0, s[4] = (f - M) * w, s[5] = (1 - (d + m)) * w, s[6] = (p + y) * w, s[7] = 0, s[8] = (g + v) * A, s[9] = (p - y) * A, s[10] = (1 - (d + _)) * A, s[11] = 0, s[12] = t.x, s[13] = t.y, s[14] = t.z, s[15] = 1, this;
  }
  decompose(t, e, n) {
    const s = this.elements;
    let r = Ri.set(s[0], s[1], s[2]).length();
    const o = Ri.set(s[4], s[5], s[6]).length(), a = Ri.set(s[8], s[9], s[10]).length();
    this.determinant() < 0 && (r = -r), t.x = s[12], t.y = s[13], t.z = s[14], cn.copy(this);
    const c = 1 / r, h = 1 / o, u = 1 / a;
    return cn.elements[0] *= c, cn.elements[1] *= c, cn.elements[2] *= c, cn.elements[4] *= h, cn.elements[5] *= h, cn.elements[6] *= h, cn.elements[8] *= u, cn.elements[9] *= u, cn.elements[10] *= u, e.setFromRotationMatrix(cn), n.x = r, n.y = o, n.z = a, this;
  }
  makePerspective(t, e, n, s, r, o, a = On) {
    const l = this.elements, c = 2 * r / (e - t), h = 2 * r / (n - s), u = (e + t) / (e - t), d = (n + s) / (n - s);
    let f, g;
    if (a === On)
      f = -(o + r) / (o - r), g = -2 * o * r / (o - r);
    else if (a === no)
      f = -o / (o - r), g = -o * r / (o - r);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return l[0] = c, l[4] = 0, l[8] = u, l[12] = 0, l[1] = 0, l[5] = h, l[9] = d, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = f, l[14] = g, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  makeOrthographic(t, e, n, s, r, o, a = On) {
    const l = this.elements, c = 1 / (e - t), h = 1 / (n - s), u = 1 / (o - r), d = (e + t) * c, f = (n + s) * h;
    let g, _;
    if (a === On)
      g = (o + r) * u, _ = -2 * u;
    else if (a === no)
      g = r * u, _ = -1 * u;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return l[0] = 2 * c, l[4] = 0, l[8] = 0, l[12] = -d, l[1] = 0, l[5] = 2 * h, l[9] = 0, l[13] = -f, l[2] = 0, l[6] = 0, l[10] = _, l[14] = -g, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
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
const Ri = /* @__PURE__ */ new R(), cn = /* @__PURE__ */ new Dt(), dp = /* @__PURE__ */ new R(0, 0, 0), fp = /* @__PURE__ */ new R(1, 1, 1), Gn = /* @__PURE__ */ new R(), ur = /* @__PURE__ */ new R(), Ze = /* @__PURE__ */ new R(), Tc = /* @__PURE__ */ new Dt(), Ac = /* @__PURE__ */ new xn();
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
    const s = t.elements, r = s[0], o = s[4], a = s[8], l = s[1], c = s[5], h = s[9], u = s[2], d = s[6], f = s[10];
    switch (e) {
      case "XYZ":
        this._y = Math.asin(Te(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-h, f), this._z = Math.atan2(-o, r)) : (this._x = Math.atan2(d, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Te(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(a, f), this._z = Math.atan2(l, c)) : (this._y = Math.atan2(-u, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Te(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-o, c)) : (this._y = 0, this._z = Math.atan2(l, r));
        break;
      case "ZYX":
        this._y = Math.asin(-Te(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(l, r)) : (this._x = 0, this._z = Math.atan2(-o, c));
        break;
      case "YZX":
        this._z = Math.asin(Te(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-u, r)) : (this._x = 0, this._y = Math.atan2(a, f));
        break;
      case "XZY":
        this._z = Math.asin(-Te(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(d, c), this._y = Math.atan2(a, r)) : (this._x = Math.atan2(-h, f), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return this._order = e, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, e, n) {
    return Tc.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Tc, e, n);
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return Ac.setFromEuler(this), this.setFromQuaternion(Ac, t);
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
class Tl {
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
let pp = 0;
const wc = /* @__PURE__ */ new R(), Ci = /* @__PURE__ */ new xn(), Rn = /* @__PURE__ */ new Dt(), dr = /* @__PURE__ */ new R(), ys = /* @__PURE__ */ new R(), mp = /* @__PURE__ */ new R(), gp = /* @__PURE__ */ new xn(), Rc = /* @__PURE__ */ new R(1, 0, 0), Cc = /* @__PURE__ */ new R(0, 1, 0), Pc = /* @__PURE__ */ new R(0, 0, 1), Lc = { type: "added" }, _p = { type: "removed" }, Pi = { type: "childadded", child: null }, Io = { type: "childremoved", child: null };
class me extends Mi {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: pp++ }), this.uuid = on(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = me.DEFAULT_UP.clone();
    const t = new R(), e = new yn(), n = new xn(), s = new R(1, 1, 1);
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
    }), this.matrix = new Dt(), this.matrixWorld = new Dt(), this.matrixAutoUpdate = me.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Tl(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
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
    return Ci.setFromAxisAngle(t, e), this.quaternion.multiply(Ci), this;
  }
  rotateOnWorldAxis(t, e) {
    return Ci.setFromAxisAngle(t, e), this.quaternion.premultiply(Ci), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(Rc, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(Cc, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(Pc, t);
  }
  translateOnAxis(t, e) {
    return wc.copy(t).applyQuaternion(this.quaternion), this.position.add(wc.multiplyScalar(e)), this;
  }
  translateX(t) {
    return this.translateOnAxis(Rc, t);
  }
  translateY(t) {
    return this.translateOnAxis(Cc, t);
  }
  translateZ(t) {
    return this.translateOnAxis(Pc, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(Rn.copy(this.matrixWorld).invert());
  }
  lookAt(t, e, n) {
    t.isVector3 ? dr.copy(t) : dr.set(t, e, n);
    const s = this.parent;
    this.updateWorldMatrix(!0, !1), ys.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Rn.lookAt(ys, dr, this.up) : Rn.lookAt(dr, ys, this.up), this.quaternion.setFromRotationMatrix(Rn), s && (Rn.extractRotation(s.matrixWorld), Ci.setFromRotationMatrix(Rn), this.quaternion.premultiply(Ci.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++)
        this.add(arguments[e]);
      return this;
    }
    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(Lc), Pi.child = t, this.dispatchEvent(Pi), Pi.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(_p), Io.child = t, this.dispatchEvent(Io), Io.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), Rn.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), Rn.multiply(t.parent.matrixWorld)), t.applyMatrix4(Rn), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(Lc), Pi.child = t, this.dispatchEvent(Pi), Pi.child = null, this;
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
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ys, t, mp), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(ys, gp, t), t;
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
    function r(a, l) {
      return a[l.uuid] === void 0 && (a[l.uuid] = l.toJSON(t)), l.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? s.background = this.background.toJSON() : this.background.isTexture && (s.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (s.environment = this.environment.toJSON(t).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      s.geometry = r(t.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const l = a.shapes;
        if (Array.isArray(l))
          for (let c = 0, h = l.length; c < h; c++) {
            const u = l[c];
            r(t.shapes, u);
          }
        else
          r(t.shapes, l);
      }
    }
    if (this.isSkinnedMesh && (s.bindMode = this.bindMode, s.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(t.skeletons, this.skeleton), s.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const a = [];
        for (let l = 0, c = this.material.length; l < c; l++)
          a.push(r(t.materials, this.material[l]));
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
        const l = this.animations[a];
        s.animations.push(r(t.animations, l));
      }
    }
    if (e) {
      const a = o(t.geometries), l = o(t.materials), c = o(t.textures), h = o(t.images), u = o(t.shapes), d = o(t.skeletons), f = o(t.animations), g = o(t.nodes);
      a.length > 0 && (n.geometries = a), l.length > 0 && (n.materials = l), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), u.length > 0 && (n.shapes = u), d.length > 0 && (n.skeletons = d), f.length > 0 && (n.animations = f), g.length > 0 && (n.nodes = g);
    }
    return n.object = s, n;
    function o(a) {
      const l = [];
      for (const c in a) {
        const h = a[c];
        delete h.metadata, l.push(h);
      }
      return l;
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
me.DEFAULT_UP = /* @__PURE__ */ new R(0, 1, 0);
me.DEFAULT_MATRIX_AUTO_UPDATE = !0;
me.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const hn = /* @__PURE__ */ new R(), Cn = /* @__PURE__ */ new R(), Do = /* @__PURE__ */ new R(), Pn = /* @__PURE__ */ new R(), Li = /* @__PURE__ */ new R(), Ii = /* @__PURE__ */ new R(), Ic = /* @__PURE__ */ new R(), No = /* @__PURE__ */ new R(), Uo = /* @__PURE__ */ new R(), Oo = /* @__PURE__ */ new R(), Fo = /* @__PURE__ */ new Zt(), Bo = /* @__PURE__ */ new Zt(), ko = /* @__PURE__ */ new Zt();
class sn {
  constructor(t = new R(), e = new R(), n = new R()) {
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
    hn.subVectors(s, e), Cn.subVectors(n, e), Do.subVectors(t, e);
    const o = hn.dot(hn), a = hn.dot(Cn), l = hn.dot(Do), c = Cn.dot(Cn), h = Cn.dot(Do), u = o * c - a * a;
    if (u === 0)
      return r.set(0, 0, 0), null;
    const d = 1 / u, f = (c * l - a * h) * d, g = (o * h - a * l) * d;
    return r.set(1 - f - g, g, f);
  }
  static containsPoint(t, e, n, s) {
    return this.getBarycoord(t, e, n, s, Pn) === null ? !1 : Pn.x >= 0 && Pn.y >= 0 && Pn.x + Pn.y <= 1;
  }
  static getInterpolation(t, e, n, s, r, o, a, l) {
    return this.getBarycoord(t, e, n, s, Pn) === null ? (l.x = 0, l.y = 0, "z" in l && (l.z = 0), "w" in l && (l.w = 0), null) : (l.setScalar(0), l.addScaledVector(r, Pn.x), l.addScaledVector(o, Pn.y), l.addScaledVector(a, Pn.z), l);
  }
  static getInterpolatedAttribute(t, e, n, s, r, o) {
    return Fo.setScalar(0), Bo.setScalar(0), ko.setScalar(0), Fo.fromBufferAttribute(t, e), Bo.fromBufferAttribute(t, n), ko.fromBufferAttribute(t, s), o.setScalar(0), o.addScaledVector(Fo, r.x), o.addScaledVector(Bo, r.y), o.addScaledVector(ko, r.z), o;
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
    Li.subVectors(s, n), Ii.subVectors(r, n), No.subVectors(t, n);
    const l = Li.dot(No), c = Ii.dot(No);
    if (l <= 0 && c <= 0)
      return e.copy(n);
    Uo.subVectors(t, s);
    const h = Li.dot(Uo), u = Ii.dot(Uo);
    if (h >= 0 && u <= h)
      return e.copy(s);
    const d = l * u - h * c;
    if (d <= 0 && l >= 0 && h <= 0)
      return o = l / (l - h), e.copy(n).addScaledVector(Li, o);
    Oo.subVectors(t, r);
    const f = Li.dot(Oo), g = Ii.dot(Oo);
    if (g >= 0 && f <= g)
      return e.copy(r);
    const _ = f * c - l * g;
    if (_ <= 0 && c >= 0 && g <= 0)
      return a = c / (c - g), e.copy(n).addScaledVector(Ii, a);
    const p = h * g - f * u;
    if (p <= 0 && u - h >= 0 && f - g >= 0)
      return Ic.subVectors(r, s), a = (u - h) / (u - h + (f - g)), e.copy(s).addScaledVector(Ic, a);
    const m = 1 / (p + _ + d);
    return o = _ * m, a = d * m, e.copy(n).addScaledVector(Li, o).addScaledVector(Ii, a);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
const Nu = {
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
}, Wn = { h: 0, s: 0, l: 0 }, fr = { h: 0, s: 0, l: 0 };
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
    if (t = bl(t, 1), e = Te(e, 0, 1), n = Te(n, 0, 1), e === 0)
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
    const n = Nu[t.toLowerCase()];
    return n !== void 0 ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(t) {
    return this.r = t.r, this.g = t.g, this.b = t.b, this;
  }
  copySRGBToLinear(t) {
    return this.r = Ki(t.r), this.g = Ki(t.g), this.b = Ki(t.b), this;
  }
  copyLinearToSRGB(t) {
    return this.r = bo(t.r), this.g = bo(t.g), this.b = bo(t.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(t = He) {
    return qt.fromWorkingColorSpace(Oe.copy(this), t), Math.round(Te(Oe.r * 255, 0, 255)) * 65536 + Math.round(Te(Oe.g * 255, 0, 255)) * 256 + Math.round(Te(Oe.b * 255, 0, 255));
  }
  getHexString(t = He) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = qt.workingColorSpace) {
    qt.fromWorkingColorSpace(Oe.copy(this), e);
    const n = Oe.r, s = Oe.g, r = Oe.b, o = Math.max(n, s, r), a = Math.min(n, s, r);
    let l, c;
    const h = (a + o) / 2;
    if (a === o)
      l = 0, c = 0;
    else {
      const u = o - a;
      switch (c = h <= 0.5 ? u / (o + a) : u / (2 - o - a), o) {
        case n:
          l = (s - r) / u + (s < r ? 6 : 0);
          break;
        case s:
          l = (r - n) / u + 2;
          break;
        case r:
          l = (n - s) / u + 4;
          break;
      }
      l /= 6;
    }
    return t.h = l, t.s = c, t.l = h, t;
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
    this.getHSL(Wn), t.getHSL(fr);
    const n = Os(Wn.h, fr.h, e), s = Os(Wn.s, fr.s, e), r = Os(Wn.l, fr.l, e);
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
Tt.NAMES = Nu;
let vp = 0;
class gn extends Mi {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: vp++ }), this.uuid = on(), this.name = "", this.type = "Material", this.blending = ji, this.side = Fn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = fa, this.blendDst = pa, this.blendEquation = pi, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Tt(0, 0, 0), this.blendAlpha = 0, this.depthFunc = ts, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = vc, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Ei, this.stencilZFail = Ei, this.stencilZPass = Ei, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
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
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== ji && (n.blending = this.blending), this.side !== Fn && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== fa && (n.blendSrc = this.blendSrc), this.blendDst !== pa && (n.blendDst = this.blendDst), this.blendEquation !== pi && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== ts && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== vc && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Ei && (n.stencilFail = this.stencilFail), this.stencilZFail !== Ei && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== Ei && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function s(r) {
      const o = [];
      for (const a in r) {
        const l = r[a];
        delete l.metadata, o.push(l);
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
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Tt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new yn(), this.combine = gu, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
  }
}
const Se = /* @__PURE__ */ new R(), pr = /* @__PURE__ */ new tt();
class De {
  constructor(t, e, n = !1) {
    if (Array.isArray(t))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = Za, this.updateRanges = [], this.gpuType = mn, this.version = 0;
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
        pr.fromBufferAttribute(this, e), pr.applyMatrix3(t), this.setXY(e, pr.x, pr.y);
    else if (this.itemSize === 3)
      for (let e = 0, n = this.count; e < n; e++)
        Se.fromBufferAttribute(this, e), Se.applyMatrix3(t), this.setXYZ(e, Se.x, Se.y, Se.z);
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++)
      Se.fromBufferAttribute(this, e), Se.applyMatrix4(t), this.setXYZ(e, Se.x, Se.y, Se.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++)
      Se.fromBufferAttribute(this, e), Se.applyNormalMatrix(t), this.setXYZ(e, Se.x, Se.y, Se.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++)
      Se.fromBufferAttribute(this, e), Se.transformDirection(t), this.setXYZ(e, Se.x, Se.y, Se.z);
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
    return this.normalized && (n = se(n, this.array)), this.array[t * this.itemSize + e] = n, this;
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  setX(t, e) {
    return this.normalized && (e = se(e, this.array)), this.array[t * this.itemSize] = e, this;
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  setY(t, e) {
    return this.normalized && (e = se(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  setZ(t, e) {
    return this.normalized && (e = se(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return this.normalized && (e = pn(e, this.array)), e;
  }
  setW(t, e) {
    return this.normalized && (e = se(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
  }
  setXY(t, e, n) {
    return t *= this.itemSize, this.normalized && (e = se(e, this.array), n = se(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, s) {
    return t *= this.itemSize, this.normalized && (e = se(e, this.array), n = se(n, this.array), s = se(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this;
  }
  setXYZW(t, e, n, s, r) {
    return t *= this.itemSize, this.normalized && (e = se(e, this.array), n = se(n, this.array), s = se(s, this.array), r = se(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this.array[t + 3] = r, this;
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
    return this.name !== "" && (t.name = this.name), this.usage !== Za && (t.usage = this.usage), t;
  }
}
class Uu extends De {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class Ou extends De {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class ue extends De {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
let xp = 0;
const en = /* @__PURE__ */ new Dt(), Ho = /* @__PURE__ */ new me(), Di = /* @__PURE__ */ new R(), Je = /* @__PURE__ */ new je(), Ms = /* @__PURE__ */ new je(), Ce = /* @__PURE__ */ new R();
class Le extends Mi {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: xp++ }), this.uuid = on(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (Lu(t) ? Ou : Uu)(t, 1) : this.index = t, this;
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
    return Ho.lookAt(t), Ho.updateMatrix(), this.applyMatrix4(Ho.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Di).negate(), this.translate(Di.x, Di.y, Di.z), this;
  }
  setFromPoints(t) {
    const e = [];
    for (let n = 0, s = t.length; n < s; n++) {
      const r = t[n];
      e.push(r.x, r.y, r.z || 0);
    }
    return this.setAttribute("position", new ue(e, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new je());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new R(-1 / 0, -1 / 0, -1 / 0),
        new R(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (t !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(t), e)
        for (let n = 0, s = e.length; n < s; n++) {
          const r = e[n];
          Je.setFromBufferAttribute(r), this.morphTargetsRelative ? (Ce.addVectors(this.boundingBox.min, Je.min), this.boundingBox.expandByPoint(Ce), Ce.addVectors(this.boundingBox.max, Je.max), this.boundingBox.expandByPoint(Ce)) : (this.boundingBox.expandByPoint(Je.min), this.boundingBox.expandByPoint(Je.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Mn());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new R(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (Je.setFromBufferAttribute(t), e)
        for (let r = 0, o = e.length; r < o; r++) {
          const a = e[r];
          Ms.setFromBufferAttribute(a), this.morphTargetsRelative ? (Ce.addVectors(Je.min, Ms.min), Je.expandByPoint(Ce), Ce.addVectors(Je.max, Ms.max), Je.expandByPoint(Ce)) : (Je.expandByPoint(Ms.min), Je.expandByPoint(Ms.max));
        }
      Je.getCenter(n);
      let s = 0;
      for (let r = 0, o = t.count; r < o; r++)
        Ce.fromBufferAttribute(t, r), s = Math.max(s, n.distanceToSquared(Ce));
      if (e)
        for (let r = 0, o = e.length; r < o; r++) {
          const a = e[r], l = this.morphTargetsRelative;
          for (let c = 0, h = a.count; c < h; c++)
            Ce.fromBufferAttribute(a, c), l && (Di.fromBufferAttribute(t, c), Ce.add(Di)), s = Math.max(s, n.distanceToSquared(Ce));
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
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new De(new Float32Array(4 * n.count), 4));
    const o = this.getAttribute("tangent"), a = [], l = [];
    for (let L = 0; L < n.count; L++)
      a[L] = new R(), l[L] = new R();
    const c = new R(), h = new R(), u = new R(), d = new tt(), f = new tt(), g = new tt(), _ = new R(), p = new R();
    function m(L, G, x) {
      c.fromBufferAttribute(n, L), h.fromBufferAttribute(n, G), u.fromBufferAttribute(n, x), d.fromBufferAttribute(r, L), f.fromBufferAttribute(r, G), g.fromBufferAttribute(r, x), h.sub(c), u.sub(c), f.sub(d), g.sub(d);
      const b = 1 / (f.x * g.y - g.x * f.y);
      isFinite(b) && (_.copy(h).multiplyScalar(g.y).addScaledVector(u, -f.y).multiplyScalar(b), p.copy(u).multiplyScalar(f.x).addScaledVector(h, -g.x).multiplyScalar(b), a[L].add(_), a[G].add(_), a[x].add(_), l[L].add(p), l[G].add(p), l[x].add(p));
    }
    let y = this.groups;
    y.length === 0 && (y = [{
      start: 0,
      count: t.count
    }]);
    for (let L = 0, G = y.length; L < G; ++L) {
      const x = y[L], b = x.start, B = x.count;
      for (let k = b, H = b + B; k < H; k += 3)
        m(
          t.getX(k + 0),
          t.getX(k + 1),
          t.getX(k + 2)
        );
    }
    const v = new R(), M = new R(), P = new R(), w = new R();
    function A(L) {
      P.fromBufferAttribute(s, L), w.copy(P);
      const G = a[L];
      v.copy(G), v.sub(P.multiplyScalar(P.dot(G))).normalize(), M.crossVectors(w, G);
      const b = M.dot(l[L]) < 0 ? -1 : 1;
      o.setXYZW(L, v.x, v.y, v.z, b);
    }
    for (let L = 0, G = y.length; L < G; ++L) {
      const x = y[L], b = x.start, B = x.count;
      for (let k = b, H = b + B; k < H; k += 3)
        A(t.getX(k + 0)), A(t.getX(k + 1)), A(t.getX(k + 2));
    }
  }
  computeVertexNormals() {
    const t = this.index, e = this.getAttribute("position");
    if (e !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new De(new Float32Array(e.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let d = 0, f = n.count; d < f; d++)
          n.setXYZ(d, 0, 0, 0);
      const s = new R(), r = new R(), o = new R(), a = new R(), l = new R(), c = new R(), h = new R(), u = new R();
      if (t)
        for (let d = 0, f = t.count; d < f; d += 3) {
          const g = t.getX(d + 0), _ = t.getX(d + 1), p = t.getX(d + 2);
          s.fromBufferAttribute(e, g), r.fromBufferAttribute(e, _), o.fromBufferAttribute(e, p), h.subVectors(o, r), u.subVectors(s, r), h.cross(u), a.fromBufferAttribute(n, g), l.fromBufferAttribute(n, _), c.fromBufferAttribute(n, p), a.add(h), l.add(h), c.add(h), n.setXYZ(g, a.x, a.y, a.z), n.setXYZ(_, l.x, l.y, l.z), n.setXYZ(p, c.x, c.y, c.z);
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
      Ce.fromBufferAttribute(t, e), Ce.normalize(), t.setXYZ(e, Ce.x, Ce.y, Ce.z);
  }
  toNonIndexed() {
    function t(a, l) {
      const c = a.array, h = a.itemSize, u = a.normalized, d = new c.constructor(l.length * h);
      let f = 0, g = 0;
      for (let _ = 0, p = l.length; _ < p; _++) {
        a.isInterleavedBufferAttribute ? f = l[_] * a.data.stride + a.offset : f = l[_] * h;
        for (let m = 0; m < h; m++)
          d[g++] = c[f++];
      }
      return new De(d, h, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const e = new Le(), n = this.index.array, s = this.attributes;
    for (const a in s) {
      const l = s[a], c = t(l, n);
      e.setAttribute(a, c);
    }
    const r = this.morphAttributes;
    for (const a in r) {
      const l = [], c = r[a];
      for (let h = 0, u = c.length; h < u; h++) {
        const d = c[h], f = t(d, n);
        l.push(f);
      }
      e.morphAttributes[a] = l;
    }
    e.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let a = 0, l = o.length; a < l; a++) {
      const c = o[a];
      e.addGroup(c.start, c.count, c.materialIndex);
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
      const l = this.parameters;
      for (const c in l)
        l[c] !== void 0 && (t[c] = l[c]);
      return t;
    }
    t.data = { attributes: {} };
    const e = this.index;
    e !== null && (t.data.index = {
      type: e.array.constructor.name,
      array: Array.prototype.slice.call(e.array)
    });
    const n = this.attributes;
    for (const l in n) {
      const c = n[l];
      t.data.attributes[l] = c.toJSON(t.data);
    }
    const s = {};
    let r = !1;
    for (const l in this.morphAttributes) {
      const c = this.morphAttributes[l], h = [];
      for (let u = 0, d = c.length; u < d; u++) {
        const f = c[u];
        h.push(f.toJSON(t.data));
      }
      h.length > 0 && (s[l] = h, r = !0);
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
    for (const c in s) {
      const h = s[c];
      this.setAttribute(c, h.clone(e));
    }
    const r = t.morphAttributes;
    for (const c in r) {
      const h = [], u = r[c];
      for (let d = 0, f = u.length; d < f; d++)
        h.push(u[d].clone(e));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = t.morphTargetsRelative;
    const o = t.groups;
    for (let c = 0, h = o.length; c < h; c++) {
      const u = o[c];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const a = t.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const l = t.boundingSphere;
    return l !== null && (this.boundingSphere = l.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const Dc = /* @__PURE__ */ new Dt(), li = /* @__PURE__ */ new us(), mr = /* @__PURE__ */ new Mn(), Nc = /* @__PURE__ */ new R(), gr = /* @__PURE__ */ new R(), _r = /* @__PURE__ */ new R(), vr = /* @__PURE__ */ new R(), Vo = /* @__PURE__ */ new R(), xr = /* @__PURE__ */ new R(), Uc = /* @__PURE__ */ new R(), yr = /* @__PURE__ */ new R();
class xe extends me {
  constructor(t = new Le(), e = new vn()) {
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
      xr.set(0, 0, 0);
      for (let l = 0, c = r.length; l < c; l++) {
        const h = a[l], u = r[l];
        h !== 0 && (Vo.fromBufferAttribute(u, t), o ? xr.addScaledVector(Vo, h) : xr.addScaledVector(Vo.sub(e), h));
      }
      e.add(xr);
    }
    return e;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.material, r = this.matrixWorld;
    s !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), mr.copy(n.boundingSphere), mr.applyMatrix4(r), li.copy(t.ray).recast(t.near), !(mr.containsPoint(li.origin) === !1 && (li.intersectSphere(mr, Nc) === null || li.origin.distanceToSquared(Nc) > (t.far - t.near) ** 2)) && (Dc.copy(r).invert(), li.copy(t.ray).applyMatrix4(Dc), !(n.boundingBox !== null && li.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(t, e, li)));
  }
  _computeIntersections(t, e, n) {
    let s;
    const r = this.geometry, o = this.material, a = r.index, l = r.attributes.position, c = r.attributes.uv, h = r.attributes.uv1, u = r.attributes.normal, d = r.groups, f = r.drawRange;
    if (a !== null)
      if (Array.isArray(o))
        for (let g = 0, _ = d.length; g < _; g++) {
          const p = d[g], m = o[p.materialIndex], y = Math.max(p.start, f.start), v = Math.min(a.count, Math.min(p.start + p.count, f.start + f.count));
          for (let M = y, P = v; M < P; M += 3) {
            const w = a.getX(M), A = a.getX(M + 1), L = a.getX(M + 2);
            s = Mr(this, m, t, n, c, h, u, w, A, L), s && (s.faceIndex = Math.floor(M / 3), s.face.materialIndex = p.materialIndex, e.push(s));
          }
        }
      else {
        const g = Math.max(0, f.start), _ = Math.min(a.count, f.start + f.count);
        for (let p = g, m = _; p < m; p += 3) {
          const y = a.getX(p), v = a.getX(p + 1), M = a.getX(p + 2);
          s = Mr(this, o, t, n, c, h, u, y, v, M), s && (s.faceIndex = Math.floor(p / 3), e.push(s));
        }
      }
    else if (l !== void 0)
      if (Array.isArray(o))
        for (let g = 0, _ = d.length; g < _; g++) {
          const p = d[g], m = o[p.materialIndex], y = Math.max(p.start, f.start), v = Math.min(l.count, Math.min(p.start + p.count, f.start + f.count));
          for (let M = y, P = v; M < P; M += 3) {
            const w = M, A = M + 1, L = M + 2;
            s = Mr(this, m, t, n, c, h, u, w, A, L), s && (s.faceIndex = Math.floor(M / 3), s.face.materialIndex = p.materialIndex, e.push(s));
          }
        }
      else {
        const g = Math.max(0, f.start), _ = Math.min(l.count, f.start + f.count);
        for (let p = g, m = _; p < m; p += 3) {
          const y = p, v = p + 1, M = p + 2;
          s = Mr(this, o, t, n, c, h, u, y, v, M), s && (s.faceIndex = Math.floor(p / 3), e.push(s));
        }
      }
  }
}
function yp(i, t, e, n, s, r, o, a) {
  let l;
  if (t.side === $e ? l = n.intersectTriangle(o, r, s, !0, a) : l = n.intersectTriangle(s, r, o, t.side === Fn, a), l === null) return null;
  yr.copy(a), yr.applyMatrix4(i.matrixWorld);
  const c = e.ray.origin.distanceTo(yr);
  return c < e.near || c > e.far ? null : {
    distance: c,
    point: yr.clone(),
    object: i
  };
}
function Mr(i, t, e, n, s, r, o, a, l, c) {
  i.getVertexPosition(a, gr), i.getVertexPosition(l, _r), i.getVertexPosition(c, vr);
  const h = yp(i, t, e, n, gr, _r, vr, Uc);
  if (h) {
    const u = new R();
    sn.getBarycoord(Uc, gr, _r, vr, u), s && (h.uv = sn.getInterpolatedAttribute(s, a, l, c, u, new tt())), r && (h.uv1 = sn.getInterpolatedAttribute(r, a, l, c, u, new tt())), o && (h.normal = sn.getInterpolatedAttribute(o, a, l, c, u, new R()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = {
      a,
      b: l,
      c,
      normal: new R(),
      materialIndex: 0
    };
    sn.getNormal(gr, _r, vr, d.normal), h.face = d, h.barycoord = u;
  }
  return h;
}
class ii extends Le {
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
    const l = [], c = [], h = [], u = [];
    let d = 0, f = 0;
    g("z", "y", "x", -1, -1, n, e, t, o, r, 0), g("z", "y", "x", 1, -1, n, e, -t, o, r, 1), g("x", "z", "y", 1, 1, t, n, e, s, o, 2), g("x", "z", "y", 1, -1, t, n, -e, s, o, 3), g("x", "y", "z", 1, -1, t, e, n, s, r, 4), g("x", "y", "z", -1, -1, t, e, -n, s, r, 5), this.setIndex(l), this.setAttribute("position", new ue(c, 3)), this.setAttribute("normal", new ue(h, 3)), this.setAttribute("uv", new ue(u, 2));
    function g(_, p, m, y, v, M, P, w, A, L, G) {
      const x = M / A, b = P / L, B = M / 2, k = P / 2, H = w / 2, K = A + 1, z = L + 1;
      let nt = 0, W = 0;
      const ut = new R();
      for (let dt = 0; dt < z; dt++) {
        const Mt = dt * b - k;
        for (let Yt = 0; Yt < K; Yt++) {
          const ee = Yt * x - B;
          ut[_] = ee * y, ut[p] = Mt * v, ut[m] = H, c.push(ut.x, ut.y, ut.z), ut[_] = 0, ut[p] = 0, ut[m] = w > 0 ? 1 : -1, h.push(ut.x, ut.y, ut.z), u.push(Yt / A), u.push(1 - dt / L), nt += 1;
        }
      }
      for (let dt = 0; dt < L; dt++)
        for (let Mt = 0; Mt < A; Mt++) {
          const Yt = d + Mt + K * dt, ee = d + Mt + K * (dt + 1), $ = d + (Mt + 1) + K * (dt + 1), Q = d + (Mt + 1) + K * dt;
          l.push(Yt, ee, Q), l.push(ee, $, Q), W += 6;
        }
      a.addGroup(f, W, G), f += W, d += nt;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new ii(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
function as(i) {
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
function ze(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = as(i[e]);
    for (const s in n)
      t[s] = n[s];
  }
  return t;
}
function Mp(i) {
  const t = [];
  for (let e = 0; e < i.length; e++)
    t.push(i[e].clone());
  return t;
}
function Fu(i) {
  const t = i.getRenderTarget();
  return t === null ? i.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : qt.workingColorSpace;
}
const Sp = { clone: as, merge: ze };
var Ep = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, bp = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class ti extends gn {
  constructor(t) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Ep, this.fragmentShader = bp, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
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
    return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = as(t.uniforms), this.uniformsGroups = Mp(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
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
class Bu extends me {
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
const Xn = /* @__PURE__ */ new R(), Oc = /* @__PURE__ */ new tt(), Fc = /* @__PURE__ */ new tt();
class Be extends Bu {
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
    this.fov = os * 2 * Math.atan(e), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const t = Math.tan(Us * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / t;
  }
  getEffectiveFOV() {
    return os * 2 * Math.atan(
      Math.tan(Us * 0.5 * this.fov) / this.zoom
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
    return this.getViewBounds(t, Oc, Fc), e.subVectors(Fc, Oc);
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
    let e = t * Math.tan(Us * 0.5 * this.fov) / this.zoom, n = 2 * e, s = this.aspect * n, r = -0.5 * s;
    const o = this.view;
    if (this.view !== null && this.view.enabled) {
      const l = o.fullWidth, c = o.fullHeight;
      r += o.offsetX * s / l, e -= o.offsetY * n / c, s *= o.width / l, n *= o.height / c;
    }
    const a = this.filmOffset;
    a !== 0 && (r += t * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + s, e, e - n, t, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, this.view !== null && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e;
  }
}
const Ni = -90, Ui = 1;
class Tp extends me {
  constructor(t, e, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const s = new Be(Ni, Ui, t, e);
    s.layers = this.layers, this.add(s);
    const r = new Be(Ni, Ui, t, e);
    r.layers = this.layers, this.add(r);
    const o = new Be(Ni, Ui, t, e);
    o.layers = this.layers, this.add(o);
    const a = new Be(Ni, Ui, t, e);
    a.layers = this.layers, this.add(a);
    const l = new Be(Ni, Ui, t, e);
    l.layers = this.layers, this.add(l);
    const c = new Be(Ni, Ui, t, e);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem, e = this.children.concat(), [n, s, r, o, a, l] = e;
    for (const c of e) this.remove(c);
    if (t === On)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), l.up.set(0, 1, 0), l.lookAt(0, 0, -1);
    else if (t === no)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), s.up.set(0, -1, 0), s.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), o.up.set(0, 0, -1), o.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), l.up.set(0, -1, 0), l.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
    for (const c of e)
      this.add(c), c.updateMatrixWorld();
  }
  update(t, e) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: s } = this;
    this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
    const [r, o, a, l, c, h] = this.children, u = t.getRenderTarget(), d = t.getActiveCubeFace(), f = t.getActiveMipmapLevel(), g = t.xr.enabled;
    t.xr.enabled = !1;
    const _ = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, t.setRenderTarget(n, 0, s), t.render(e, r), t.setRenderTarget(n, 1, s), t.render(e, o), t.setRenderTarget(n, 2, s), t.render(e, a), t.setRenderTarget(n, 3, s), t.render(e, l), t.setRenderTarget(n, 4, s), t.render(e, c), n.texture.generateMipmaps = _, t.setRenderTarget(n, 5, s), t.render(e, h), t.setRenderTarget(u, d, f), t.xr.enabled = g, n.texture.needsPMREMUpdate = !0;
  }
}
class ku extends Ae {
  constructor(t, e, n, s, r, o, a, l, c, h) {
    t = t !== void 0 ? t : [], e = e !== void 0 ? e : es, super(t, e, n, s, r, o, a, l, c, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class Ap extends xi {
  constructor(t = 1, e = {}) {
    super(t, t, e), this.isWebGLCubeRenderTarget = !0;
    const n = { width: t, height: t, depth: 1 }, s = [n, n, n, n, n, n];
    this.texture = new ku(s, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : !1, this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : Qe;
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
    }, s = new ii(5, 5, 5), r = new ti({
      name: "CubemapFromEquirect",
      uniforms: as(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: $e,
      blending: Jn
    });
    r.uniforms.tEquirect.value = e;
    const o = new xe(s, r), a = e.minFilter;
    return e.minFilter === Un && (e.minFilter = Qe), new Tp(1, 10, this).update(t, o), e.minFilter = a, o.geometry.dispose(), o.material.dispose(), this;
  }
  clear(t, e, n, s) {
    const r = t.getRenderTarget();
    for (let o = 0; o < 6; o++)
      t.setRenderTarget(this, o), t.clear(e, n, s);
    t.setRenderTarget(r);
  }
}
const Go = /* @__PURE__ */ new R(), wp = /* @__PURE__ */ new R(), Rp = /* @__PURE__ */ new Ft();
class Nn {
  constructor(t = new R(1, 0, 0), e = 0) {
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
    const s = Go.subVectors(n, e).cross(wp.subVectors(t, e)).normalize();
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
    const n = t.delta(Go), s = this.normal.dot(n);
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
    const n = e || Rp.getNormalMatrix(t), s = this.coplanarPoint(Go).applyMatrix4(t), r = this.normal.applyMatrix3(n).normalize();
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
const ci = /* @__PURE__ */ new Mn(), Sr = /* @__PURE__ */ new R();
class Al {
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
    const n = this.planes, s = t.elements, r = s[0], o = s[1], a = s[2], l = s[3], c = s[4], h = s[5], u = s[6], d = s[7], f = s[8], g = s[9], _ = s[10], p = s[11], m = s[12], y = s[13], v = s[14], M = s[15];
    if (n[0].setComponents(l - r, d - c, p - f, M - m).normalize(), n[1].setComponents(l + r, d + c, p + f, M + m).normalize(), n[2].setComponents(l + o, d + h, p + g, M + y).normalize(), n[3].setComponents(l - o, d - h, p - g, M - y).normalize(), n[4].setComponents(l - a, d - u, p - _, M - v).normalize(), e === On)
      n[5].setComponents(l + a, d + u, p + _, M + v).normalize();
    else if (e === no)
      n[5].setComponents(a, u, _, v).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0)
      t.boundingSphere === null && t.computeBoundingSphere(), ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
    else {
      const e = t.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(ci);
  }
  intersectsSprite(t) {
    return ci.center.set(0, 0, 0), ci.radius = 0.7071067811865476, ci.applyMatrix4(t.matrixWorld), this.intersectsSphere(ci);
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
      if (Sr.x = s.normal.x > 0 ? t.max.x : t.min.x, Sr.y = s.normal.y > 0 ? t.max.y : t.min.y, Sr.z = s.normal.z > 0 ? t.max.z : t.min.z, s.distanceToPoint(Sr) < 0)
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
function zu() {
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
function Cp(i) {
  const t = /* @__PURE__ */ new WeakMap();
  function e(a, l) {
    const c = a.array, h = a.usage, u = c.byteLength, d = i.createBuffer();
    i.bindBuffer(l, d), i.bufferData(l, c, h), a.onUploadCallback();
    let f;
    if (c instanceof Float32Array)
      f = i.FLOAT;
    else if (c instanceof Uint16Array)
      a.isFloat16BufferAttribute ? f = i.HALF_FLOAT : f = i.UNSIGNED_SHORT;
    else if (c instanceof Int16Array)
      f = i.SHORT;
    else if (c instanceof Uint32Array)
      f = i.UNSIGNED_INT;
    else if (c instanceof Int32Array)
      f = i.INT;
    else if (c instanceof Int8Array)
      f = i.BYTE;
    else if (c instanceof Uint8Array)
      f = i.UNSIGNED_BYTE;
    else if (c instanceof Uint8ClampedArray)
      f = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + c);
    return {
      buffer: d,
      type: f,
      bytesPerElement: c.BYTES_PER_ELEMENT,
      version: a.version,
      size: u
    };
  }
  function n(a, l, c) {
    const h = l.array, u = l.updateRanges;
    if (i.bindBuffer(c, a), u.length === 0)
      i.bufferSubData(c, 0, h);
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
          c,
          _.start * h.BYTES_PER_ELEMENT,
          h,
          _.start,
          _.count
        );
      }
      l.clearUpdateRanges();
    }
    l.onUploadCallback();
  }
  function s(a) {
    return a.isInterleavedBufferAttribute && (a = a.data), t.get(a);
  }
  function r(a) {
    a.isInterleavedBufferAttribute && (a = a.data);
    const l = t.get(a);
    l && (i.deleteBuffer(l.buffer), t.delete(a));
  }
  function o(a, l) {
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
    const c = t.get(a);
    if (c === void 0)
      t.set(a, e(a, l));
    else if (c.version < a.version) {
      if (c.size !== a.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(c.buffer, a, l), c.version = a.version;
    }
  }
  return {
    get: s,
    remove: r,
    update: o
  };
}
class uo extends Le {
  constructor(t = 1, e = 1, n = 1, s = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: e,
      widthSegments: n,
      heightSegments: s
    };
    const r = t / 2, o = e / 2, a = Math.floor(n), l = Math.floor(s), c = a + 1, h = l + 1, u = t / a, d = e / l, f = [], g = [], _ = [], p = [];
    for (let m = 0; m < h; m++) {
      const y = m * d - o;
      for (let v = 0; v < c; v++) {
        const M = v * u - r;
        g.push(M, -y, 0), _.push(0, 0, 1), p.push(v / a), p.push(1 - m / l);
      }
    }
    for (let m = 0; m < l; m++)
      for (let y = 0; y < a; y++) {
        const v = y + c * m, M = y + c * (m + 1), P = y + 1 + c * (m + 1), w = y + 1 + c * m;
        f.push(v, M, w), f.push(M, P, w);
      }
    this.setIndex(f), this.setAttribute("position", new ue(g, 3)), this.setAttribute("normal", new ue(_, 3)), this.setAttribute("uv", new ue(p, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new uo(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
var Pp = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Lp = `#ifdef USE_ALPHAHASH
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
#endif`, Ip = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, Dp = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Np = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, Up = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Op = `#ifdef USE_AOMAP
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
#endif`, Fp = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, Bp = `#ifdef USE_BATCHING
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
#endif`, kp = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, zp = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Hp = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Vp = `float G_BlinnPhong_Implicit( ) {
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
} // validated`, Gp = `#ifdef USE_IRIDESCENCE
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
#endif`, Wp = `#ifdef USE_BUMPMAP
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
#endif`, Xp = `#if NUM_CLIPPING_PLANES > 0
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
#endif`, $p = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, jp = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, qp = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Yp = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Kp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Zp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, Jp = `#if defined( USE_COLOR_ALPHA )
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
#endif`, Qp = `#define PI 3.141592653589793
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
} // validated`, tm = `#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`, em = `vec3 transformedNormal = objectNormal;
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
#endif`, nm = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, im = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, sm = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, rm = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, om = "gl_FragColor = linearToOutputTexel( gl_FragColor );", am = `
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
}`, lm = `#ifdef USE_ENVMAP
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
#endif`, cm = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, hm = `#ifdef USE_ENVMAP
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
#endif`, um = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, dm = `#ifdef USE_ENVMAP
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
#endif`, fm = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, pm = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, mm = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, gm = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, _m = `#ifdef USE_GRADIENTMAP
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
}`, vm = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, xm = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, ym = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Mm = `uniform bool receiveShadow;
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
#endif`, Sm = `#ifdef USE_ENVMAP
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
#endif`, Em = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, bm = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Tm = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Am = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, wm = `PhysicalMaterial material;
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
#endif`, Rm = `struct PhysicalMaterial {
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
}`, Cm = `
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
#endif`, Pm = `#if defined( RE_IndirectDiffuse )
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
#endif`, Lm = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, Im = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, Dm = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Nm = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Um = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Om = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, Fm = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Bm = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`, km = `#if defined( USE_POINTS_UV )
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
#endif`, zm = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Hm = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Vm = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Gm = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Wm = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Xm = `#ifdef USE_MORPHTARGETS
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
#endif`, $m = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, jm = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`, qm = `#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`, Ym = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Km = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Zm = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, Jm = `#ifdef USE_NORMALMAP
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
#endif`, Qm = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, tg = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, eg = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, ng = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, ig = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, sg = `vec3 packNormalToRGB( const in vec3 normal ) {
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
}`, rg = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, og = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, ag = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, lg = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, cg = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, hg = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, ug = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, dg = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, fg = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`, pg = `float getShadowMask() {
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
}`, mg = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, gg = `#ifdef USE_SKINNING
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
#endif`, _g = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, vg = `#ifdef USE_SKINNING
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
#endif`, xg = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, yg = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Mg = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Sg = `#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`, Eg = `#ifdef USE_TRANSMISSION
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
#endif`, bg = `#ifdef USE_TRANSMISSION
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
#endif`, Tg = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Ag = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, wg = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Rg = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Cg = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, Pg = `uniform sampler2D t2D;
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
}`, Lg = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Ig = `#ifdef ENVMAP_TYPE_CUBE
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
}`, Dg = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Ng = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Ug = `#include <common>
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
}`, Og = `#if DEPTH_PACKING == 3200
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
}`, Fg = `#define DISTANCE
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
}`, Bg = `#define DISTANCE
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
}`, kg = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, zg = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Hg = `uniform float scale;
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
}`, Vg = `uniform vec3 diffuse;
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
}`, Gg = `#include <common>
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
}`, Wg = `uniform vec3 diffuse;
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
}`, Xg = `#define LAMBERT
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
}`, $g = `#define LAMBERT
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
}`, jg = `#define MATCAP
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
}`, qg = `#define MATCAP
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
}`, Yg = `#define NORMAL
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
}`, Kg = `#define NORMAL
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
}`, Zg = `#define PHONG
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
}`, Jg = `#define PHONG
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
}`, Qg = `#define STANDARD
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
}`, t_ = `#define STANDARD
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
}`, e_ = `#define TOON
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
}`, n_ = `#define TOON
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
}`, i_ = `uniform float size;
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
}`, s_ = `uniform vec3 diffuse;
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
}`, r_ = `#include <common>
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
}`, o_ = `uniform vec3 color;
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
}`, a_ = `uniform float rotation;
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
}`, l_ = `uniform vec3 diffuse;
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
  alphahash_fragment: Pp,
  alphahash_pars_fragment: Lp,
  alphamap_fragment: Ip,
  alphamap_pars_fragment: Dp,
  alphatest_fragment: Np,
  alphatest_pars_fragment: Up,
  aomap_fragment: Op,
  aomap_pars_fragment: Fp,
  batching_pars_vertex: Bp,
  batching_vertex: kp,
  begin_vertex: zp,
  beginnormal_vertex: Hp,
  bsdfs: Vp,
  iridescence_fragment: Gp,
  bumpmap_pars_fragment: Wp,
  clipping_planes_fragment: Xp,
  clipping_planes_pars_fragment: $p,
  clipping_planes_pars_vertex: jp,
  clipping_planes_vertex: qp,
  color_fragment: Yp,
  color_pars_fragment: Kp,
  color_pars_vertex: Zp,
  color_vertex: Jp,
  common: Qp,
  cube_uv_reflection_fragment: tm,
  defaultnormal_vertex: em,
  displacementmap_pars_vertex: nm,
  displacementmap_vertex: im,
  emissivemap_fragment: sm,
  emissivemap_pars_fragment: rm,
  colorspace_fragment: om,
  colorspace_pars_fragment: am,
  envmap_fragment: lm,
  envmap_common_pars_fragment: cm,
  envmap_pars_fragment: hm,
  envmap_pars_vertex: um,
  envmap_physical_pars_fragment: Sm,
  envmap_vertex: dm,
  fog_vertex: fm,
  fog_pars_vertex: pm,
  fog_fragment: mm,
  fog_pars_fragment: gm,
  gradientmap_pars_fragment: _m,
  lightmap_pars_fragment: vm,
  lights_lambert_fragment: xm,
  lights_lambert_pars_fragment: ym,
  lights_pars_begin: Mm,
  lights_toon_fragment: Em,
  lights_toon_pars_fragment: bm,
  lights_phong_fragment: Tm,
  lights_phong_pars_fragment: Am,
  lights_physical_fragment: wm,
  lights_physical_pars_fragment: Rm,
  lights_fragment_begin: Cm,
  lights_fragment_maps: Pm,
  lights_fragment_end: Lm,
  logdepthbuf_fragment: Im,
  logdepthbuf_pars_fragment: Dm,
  logdepthbuf_pars_vertex: Nm,
  logdepthbuf_vertex: Um,
  map_fragment: Om,
  map_pars_fragment: Fm,
  map_particle_fragment: Bm,
  map_particle_pars_fragment: km,
  metalnessmap_fragment: zm,
  metalnessmap_pars_fragment: Hm,
  morphinstance_vertex: Vm,
  morphcolor_vertex: Gm,
  morphnormal_vertex: Wm,
  morphtarget_pars_vertex: Xm,
  morphtarget_vertex: $m,
  normal_fragment_begin: jm,
  normal_fragment_maps: qm,
  normal_pars_fragment: Ym,
  normal_pars_vertex: Km,
  normal_vertex: Zm,
  normalmap_pars_fragment: Jm,
  clearcoat_normal_fragment_begin: Qm,
  clearcoat_normal_fragment_maps: tg,
  clearcoat_pars_fragment: eg,
  iridescence_pars_fragment: ng,
  opaque_fragment: ig,
  packing: sg,
  premultiplied_alpha_fragment: rg,
  project_vertex: og,
  dithering_fragment: ag,
  dithering_pars_fragment: lg,
  roughnessmap_fragment: cg,
  roughnessmap_pars_fragment: hg,
  shadowmap_pars_fragment: ug,
  shadowmap_pars_vertex: dg,
  shadowmap_vertex: fg,
  shadowmask_pars_fragment: pg,
  skinbase_vertex: mg,
  skinning_pars_vertex: gg,
  skinning_vertex: _g,
  skinnormal_vertex: vg,
  specularmap_fragment: xg,
  specularmap_pars_fragment: yg,
  tonemapping_fragment: Mg,
  tonemapping_pars_fragment: Sg,
  transmission_fragment: Eg,
  transmission_pars_fragment: bg,
  uv_pars_fragment: Tg,
  uv_pars_vertex: Ag,
  uv_vertex: wg,
  worldpos_vertex: Rg,
  background_vert: Cg,
  background_frag: Pg,
  backgroundCube_vert: Lg,
  backgroundCube_frag: Ig,
  cube_vert: Dg,
  cube_frag: Ng,
  depth_vert: Ug,
  depth_frag: Og,
  distanceRGBA_vert: Fg,
  distanceRGBA_frag: Bg,
  equirect_vert: kg,
  equirect_frag: zg,
  linedashed_vert: Hg,
  linedashed_frag: Vg,
  meshbasic_vert: Gg,
  meshbasic_frag: Wg,
  meshlambert_vert: Xg,
  meshlambert_frag: $g,
  meshmatcap_vert: jg,
  meshmatcap_frag: qg,
  meshnormal_vert: Yg,
  meshnormal_frag: Kg,
  meshphong_vert: Zg,
  meshphong_frag: Jg,
  meshphysical_vert: Qg,
  meshphysical_frag: t_,
  meshtoon_vert: e_,
  meshtoon_frag: n_,
  points_vert: i_,
  points_frag: s_,
  shadow_vert: r_,
  shadow_frag: o_,
  sprite_vert: a_,
  sprite_frag: l_
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
    uniforms: /* @__PURE__ */ ze([
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
    uniforms: /* @__PURE__ */ ze([
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
    uniforms: /* @__PURE__ */ ze([
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
    uniforms: /* @__PURE__ */ ze([
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
    uniforms: /* @__PURE__ */ ze([
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
    uniforms: /* @__PURE__ */ ze([
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
    uniforms: /* @__PURE__ */ ze([
      st.points,
      st.fog
    ]),
    vertexShader: Ot.points_vert,
    fragmentShader: Ot.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ ze([
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
    uniforms: /* @__PURE__ */ ze([
      st.common,
      st.displacementmap
    ]),
    vertexShader: Ot.depth_vert,
    fragmentShader: Ot.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ ze([
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
    uniforms: /* @__PURE__ */ ze([
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
    uniforms: /* @__PURE__ */ ze([
      st.common,
      st.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new R() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ot.distanceRGBA_vert,
    fragmentShader: Ot.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ ze([
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
  uniforms: /* @__PURE__ */ ze([
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
const Er = { r: 0, b: 0, g: 0 }, hi = /* @__PURE__ */ new yn(), c_ = /* @__PURE__ */ new Dt();
function h_(i, t, e, n, s, r, o) {
  const a = new Tt(0);
  let l = r === !0 ? 0 : 1, c, h, u = null, d = 0, f = null;
  function g(y) {
    let v = y.isScene === !0 ? y.background : null;
    return v && v.isTexture && (v = (y.backgroundBlurriness > 0 ? e : t).get(v)), v;
  }
  function _(y) {
    let v = !1;
    const M = g(y);
    M === null ? m(a, l) : M && M.isColor && (m(M, 1), v = !0);
    const P = i.xr.getEnvironmentBlendMode();
    P === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, o) : P === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, o), (i.autoClear || v) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function p(y, v) {
    const M = g(v);
    M && (M.isCubeTexture || M.mapping === co) ? (h === void 0 && (h = new xe(
      new ii(1, 1, 1),
      new ti({
        name: "BackgroundCubeMaterial",
        uniforms: as(_n.backgroundCube.uniforms),
        vertexShader: _n.backgroundCube.vertexShader,
        fragmentShader: _n.backgroundCube.fragmentShader,
        side: $e,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(P, w, A) {
      this.matrixWorld.copyPosition(A.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), s.update(h)), hi.copy(v.backgroundRotation), hi.x *= -1, hi.y *= -1, hi.z *= -1, M.isCubeTexture && M.isRenderTargetTexture === !1 && (hi.y *= -1, hi.z *= -1), h.material.uniforms.envMap.value = M, h.material.uniforms.flipEnvMap.value = M.isCubeTexture && M.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = v.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = v.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(c_.makeRotationFromEuler(hi)), h.material.toneMapped = qt.getTransfer(M.colorSpace) !== pe, (u !== M || d !== M.version || f !== i.toneMapping) && (h.material.needsUpdate = !0, u = M, d = M.version, f = i.toneMapping), h.layers.enableAll(), y.unshift(h, h.geometry, h.material, 0, 0, null)) : M && M.isTexture && (c === void 0 && (c = new xe(
      new uo(2, 2),
      new ti({
        name: "BackgroundMaterial",
        uniforms: as(_n.background.uniforms),
        vertexShader: _n.background.vertexShader,
        fragmentShader: _n.background.fragmentShader,
        side: Fn,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), s.update(c)), c.material.uniforms.t2D.value = M, c.material.uniforms.backgroundIntensity.value = v.backgroundIntensity, c.material.toneMapped = qt.getTransfer(M.colorSpace) !== pe, M.matrixAutoUpdate === !0 && M.updateMatrix(), c.material.uniforms.uvTransform.value.copy(M.matrix), (u !== M || d !== M.version || f !== i.toneMapping) && (c.material.needsUpdate = !0, u = M, d = M.version, f = i.toneMapping), c.layers.enableAll(), y.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function m(y, v) {
    y.getRGB(Er, Fu(i)), n.buffers.color.setClear(Er.r, Er.g, Er.b, v, o);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(y, v = 1) {
      a.set(y), l = v, m(a, l);
    },
    getClearAlpha: function() {
      return l;
    },
    setClearAlpha: function(y) {
      l = y, m(a, l);
    },
    render: _,
    addToRenderList: p
  };
}
function u_(i, t) {
  const e = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, s = d(null);
  let r = s, o = !1;
  function a(x, b, B, k, H) {
    let K = !1;
    const z = u(k, B, b);
    r !== z && (r = z, c(r.object)), K = f(x, k, B, H), K && g(x, k, B, H), H !== null && t.update(H, i.ELEMENT_ARRAY_BUFFER), (K || o) && (o = !1, M(x, b, B, k), H !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(H).buffer));
  }
  function l() {
    return i.createVertexArray();
  }
  function c(x) {
    return i.bindVertexArray(x);
  }
  function h(x) {
    return i.deleteVertexArray(x);
  }
  function u(x, b, B) {
    const k = B.wireframe === !0;
    let H = n[x.id];
    H === void 0 && (H = {}, n[x.id] = H);
    let K = H[b.id];
    K === void 0 && (K = {}, H[b.id] = K);
    let z = K[k];
    return z === void 0 && (z = d(l()), K[k] = z), z;
  }
  function d(x) {
    const b = [], B = [], k = [];
    for (let H = 0; H < e; H++)
      b[H] = 0, B[H] = 0, k[H] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: b,
      enabledAttributes: B,
      attributeDivisors: k,
      object: x,
      attributes: {},
      index: null
    };
  }
  function f(x, b, B, k) {
    const H = r.attributes, K = b.attributes;
    let z = 0;
    const nt = B.getAttributes();
    for (const W in nt)
      if (nt[W].location >= 0) {
        const dt = H[W];
        let Mt = K[W];
        if (Mt === void 0 && (W === "instanceMatrix" && x.instanceMatrix && (Mt = x.instanceMatrix), W === "instanceColor" && x.instanceColor && (Mt = x.instanceColor)), dt === void 0 || dt.attribute !== Mt || Mt && dt.data !== Mt.data) return !0;
        z++;
      }
    return r.attributesNum !== z || r.index !== k;
  }
  function g(x, b, B, k) {
    const H = {}, K = b.attributes;
    let z = 0;
    const nt = B.getAttributes();
    for (const W in nt)
      if (nt[W].location >= 0) {
        let dt = K[W];
        dt === void 0 && (W === "instanceMatrix" && x.instanceMatrix && (dt = x.instanceMatrix), W === "instanceColor" && x.instanceColor && (dt = x.instanceColor));
        const Mt = {};
        Mt.attribute = dt, dt && dt.data && (Mt.data = dt.data), H[W] = Mt, z++;
      }
    r.attributes = H, r.attributesNum = z, r.index = k;
  }
  function _() {
    const x = r.newAttributes;
    for (let b = 0, B = x.length; b < B; b++)
      x[b] = 0;
  }
  function p(x) {
    m(x, 0);
  }
  function m(x, b) {
    const B = r.newAttributes, k = r.enabledAttributes, H = r.attributeDivisors;
    B[x] = 1, k[x] === 0 && (i.enableVertexAttribArray(x), k[x] = 1), H[x] !== b && (i.vertexAttribDivisor(x, b), H[x] = b);
  }
  function y() {
    const x = r.newAttributes, b = r.enabledAttributes;
    for (let B = 0, k = b.length; B < k; B++)
      b[B] !== x[B] && (i.disableVertexAttribArray(B), b[B] = 0);
  }
  function v(x, b, B, k, H, K, z) {
    z === !0 ? i.vertexAttribIPointer(x, b, B, H, K) : i.vertexAttribPointer(x, b, B, k, H, K);
  }
  function M(x, b, B, k) {
    _();
    const H = k.attributes, K = B.getAttributes(), z = b.defaultAttributeValues;
    for (const nt in K) {
      const W = K[nt];
      if (W.location >= 0) {
        let ut = H[nt];
        if (ut === void 0 && (nt === "instanceMatrix" && x.instanceMatrix && (ut = x.instanceMatrix), nt === "instanceColor" && x.instanceColor && (ut = x.instanceColor)), ut !== void 0) {
          const dt = ut.normalized, Mt = ut.itemSize, Yt = t.get(ut);
          if (Yt === void 0) continue;
          const ee = Yt.buffer, $ = Yt.type, Q = Yt.bytesPerElement, xt = $ === i.INT || $ === i.UNSIGNED_INT || ut.gpuType === gl;
          if (ut.isInterleavedBufferAttribute) {
            const ft = ut.data, Nt = ft.stride, wt = ut.offset;
            if (ft.isInstancedInterleavedBuffer) {
              for (let Gt = 0; Gt < W.locationSize; Gt++)
                m(W.location + Gt, ft.meshPerAttribute);
              x.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = ft.meshPerAttribute * ft.count);
            } else
              for (let Gt = 0; Gt < W.locationSize; Gt++)
                p(W.location + Gt);
            i.bindBuffer(i.ARRAY_BUFFER, ee);
            for (let Gt = 0; Gt < W.locationSize; Gt++)
              v(
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
              x.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = ut.meshPerAttribute * ut.count);
            } else
              for (let ft = 0; ft < W.locationSize; ft++)
                p(W.location + ft);
            i.bindBuffer(i.ARRAY_BUFFER, ee);
            for (let ft = 0; ft < W.locationSize; ft++)
              v(
                W.location + ft,
                Mt / W.locationSize,
                $,
                dt,
                Mt * Q,
                Mt / W.locationSize * ft * Q,
                xt
              );
          }
        } else if (z !== void 0) {
          const dt = z[nt];
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
    y();
  }
  function P() {
    L();
    for (const x in n) {
      const b = n[x];
      for (const B in b) {
        const k = b[B];
        for (const H in k)
          h(k[H].object), delete k[H];
        delete b[B];
      }
      delete n[x];
    }
  }
  function w(x) {
    if (n[x.id] === void 0) return;
    const b = n[x.id];
    for (const B in b) {
      const k = b[B];
      for (const H in k)
        h(k[H].object), delete k[H];
      delete b[B];
    }
    delete n[x.id];
  }
  function A(x) {
    for (const b in n) {
      const B = n[b];
      if (B[x.id] === void 0) continue;
      const k = B[x.id];
      for (const H in k)
        h(k[H].object), delete k[H];
      delete B[x.id];
    }
  }
  function L() {
    G(), o = !0, r !== s && (r = s, c(r.object));
  }
  function G() {
    s.geometry = null, s.program = null, s.wireframe = !1;
  }
  return {
    setup: a,
    reset: L,
    resetDefaultState: G,
    dispose: P,
    releaseStatesOfGeometry: w,
    releaseStatesOfProgram: A,
    initAttributes: _,
    enableAttribute: p,
    disableUnusedAttributes: y
  };
}
function d_(i, t, e) {
  let n;
  function s(c) {
    n = c;
  }
  function r(c, h) {
    i.drawArrays(n, c, h), e.update(h, n, 1);
  }
  function o(c, h, u) {
    u !== 0 && (i.drawArraysInstanced(n, c, h, u), e.update(h, n, u));
  }
  function a(c, h, u) {
    if (u === 0) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, h, 0, u);
    let f = 0;
    for (let g = 0; g < u; g++)
      f += h[g];
    e.update(f, n, 1);
  }
  function l(c, h, u, d) {
    if (u === 0) return;
    const f = t.get("WEBGL_multi_draw");
    if (f === null)
      for (let g = 0; g < c.length; g++)
        o(c[g], h[g], d[g]);
    else {
      f.multiDrawArraysInstancedWEBGL(n, c, 0, h, 0, d, 0, u);
      let g = 0;
      for (let _ = 0; _ < u; _++)
        g += h[_];
      for (let _ = 0; _ < d.length; _++)
        e.update(g, n, d[_]);
    }
  }
  this.setMode = s, this.render = r, this.renderInstances = o, this.renderMultiDraw = a, this.renderMultiDrawInstances = l;
}
function f_(i, t, e, n) {
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
    const L = A === tr && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(A !== Bn && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    A !== mn && !L);
  }
  function l(A) {
    if (A === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      A = "mediump";
    }
    return A === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let c = e.precision !== void 0 ? e.precision : "highp";
  const h = l(c);
  h !== c && (console.warn("THREE.WebGLRenderer:", c, "not supported, using", h, "instead."), c = h);
  const u = e.logarithmicDepthBuffer === !0, d = e.reverseDepthBuffer === !0 && t.has("EXT_clip_control");
  if (d === !0) {
    const A = t.get("EXT_clip_control");
    A.clipControlEXT(A.LOWER_LEFT_EXT, A.ZERO_TO_ONE_EXT);
  }
  const f = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_TEXTURE_SIZE), p = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), m = i.getParameter(i.MAX_VERTEX_ATTRIBS), y = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), v = i.getParameter(i.MAX_VARYING_VECTORS), M = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), P = g > 0, w = i.getParameter(i.MAX_SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: r,
    getMaxPrecision: l,
    textureFormatReadable: o,
    textureTypeReadable: a,
    precision: c,
    logarithmicDepthBuffer: u,
    reverseDepthBuffer: d,
    maxTextures: f,
    maxVertexTextures: g,
    maxTextureSize: _,
    maxCubemapSize: p,
    maxAttributes: m,
    maxVertexUniforms: y,
    maxVaryings: v,
    maxFragmentUniforms: M,
    vertexTextures: P,
    maxSamples: w
  };
}
function p_(i) {
  const t = this;
  let e = null, n = 0, s = !1, r = !1;
  const o = new Nn(), a = new Ft(), l = { value: null, needsUpdate: !1 };
  this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(u, d) {
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
      r ? h(null) : c();
    else {
      const y = r ? 0 : n, v = y * 4;
      let M = m.clippingState || null;
      l.value = M, M = h(g, d, v, f);
      for (let P = 0; P !== v; ++P)
        M[P] = e[P];
      m.clippingState = M, this.numIntersection = _ ? this.numPlanes : 0, this.numPlanes += y;
    }
  };
  function c() {
    l.value !== e && (l.value = e, l.needsUpdate = n > 0), t.numPlanes = n, t.numIntersection = 0;
  }
  function h(u, d, f, g) {
    const _ = u !== null ? u.length : 0;
    let p = null;
    if (_ !== 0) {
      if (p = l.value, g !== !0 || p === null) {
        const m = f + _ * 4, y = d.matrixWorldInverse;
        a.getNormalMatrix(y), (p === null || p.length < m) && (p = new Float32Array(m));
        for (let v = 0, M = f; v !== _; ++v, M += 4)
          o.copy(u[v]).applyMatrix4(y, a), o.normal.toArray(p, M), p[M + 3] = o.constant;
      }
      l.value = p, l.needsUpdate = !0;
    }
    return t.numPlanes = _, t.numIntersection = 0, p;
  }
}
function m_(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(o, a) {
    return a === Sa ? o.mapping = es : a === Ea && (o.mapping = ns), o;
  }
  function n(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === Sa || a === Ea)
        if (t.has(o)) {
          const l = t.get(o).texture;
          return e(l, o.mapping);
        } else {
          const l = o.image;
          if (l && l.height > 0) {
            const c = new Ap(l.height);
            return c.fromEquirectangularTexture(i, o), t.set(o, c), o.addEventListener("dispose", s), e(c.texture, o.mapping);
          } else
            return null;
        }
    }
    return o;
  }
  function s(o) {
    const a = o.target;
    a.removeEventListener("dispose", s);
    const l = t.get(a);
    l !== void 0 && (t.delete(a), l.dispose());
  }
  function r() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: r
  };
}
class wl extends Bu {
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
    let r = n - t, o = n + t, a = s + e, l = s - e;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += c * this.view.offsetX, o = r + c * this.view.width, a -= h * this.view.offsetY, l = a - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, o, a, l, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, this.view !== null && (e.object.view = Object.assign({}, this.view)), e;
  }
}
const Wi = 4, Bc = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], mi = 20, Wo = /* @__PURE__ */ new wl(), kc = /* @__PURE__ */ new Tt();
let Xo = null, $o = 0, jo = 0, qo = !1;
const fi = (1 + Math.sqrt(5)) / 2, Oi = 1 / fi, zc = [
  /* @__PURE__ */ new R(-fi, Oi, 0),
  /* @__PURE__ */ new R(fi, Oi, 0),
  /* @__PURE__ */ new R(-Oi, 0, fi),
  /* @__PURE__ */ new R(Oi, 0, fi),
  /* @__PURE__ */ new R(0, fi, -Oi),
  /* @__PURE__ */ new R(0, fi, Oi),
  /* @__PURE__ */ new R(-1, 1, -1),
  /* @__PURE__ */ new R(1, 1, -1),
  /* @__PURE__ */ new R(-1, 1, 1),
  /* @__PURE__ */ new R(1, 1, 1)
];
class Hc {
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
    Xo = this._renderer.getRenderTarget(), $o = this._renderer.getActiveCubeFace(), jo = this._renderer.getActiveMipmapLevel(), qo = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
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
    this._cubemapMaterial === null && (this._cubemapMaterial = Wc(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Gc(), this._compileMaterial(this._equirectMaterial));
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
    this._renderer.setRenderTarget(Xo, $o, jo), this._renderer.xr.enabled = qo, t.scissorTest = !1, br(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, e) {
    t.mapping === es || t.mapping === ns ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), Xo = this._renderer.getRenderTarget(), $o = this._renderer.getActiveCubeFace(), jo = this._renderer.getActiveMipmapLevel(), qo = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = e || this._allocateTargets();
    return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = {
      magFilter: Qe,
      minFilter: Qe,
      generateMipmaps: !1,
      type: tr,
      format: rn,
      colorSpace: Ne,
      depthBuffer: !1
    }, s = Vc(t, e, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Vc(t, e, n);
      const { _lodMax: r } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = g_(r)), this._blurMaterial = __(r, t, e);
    }
    return s;
  }
  _compileMaterial(t) {
    const e = new xe(this._lodPlanes[0], t);
    this._renderer.compile(e, Wo);
  }
  _sceneToCubeUV(t, e, n, s) {
    const a = new Be(90, 1, e, n), l = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, u = h.autoClear, d = h.toneMapping;
    h.getClearColor(kc), h.toneMapping = Qn, h.autoClear = !1;
    const f = new vn({
      name: "PMREM.Background",
      side: $e,
      depthWrite: !1,
      depthTest: !1
    }), g = new xe(new ii(), f);
    let _ = !1;
    const p = t.background;
    p ? p.isColor && (f.color.copy(p), t.background = null, _ = !0) : (f.color.copy(kc), _ = !0);
    for (let m = 0; m < 6; m++) {
      const y = m % 3;
      y === 0 ? (a.up.set(0, l[m], 0), a.lookAt(c[m], 0, 0)) : y === 1 ? (a.up.set(0, 0, l[m]), a.lookAt(0, c[m], 0)) : (a.up.set(0, l[m], 0), a.lookAt(0, 0, c[m]));
      const v = this._cubeSize;
      br(s, y * v, m > 2 ? v : 0, v, v), h.setRenderTarget(s), _ && h.render(g, a), h.render(t, a);
    }
    g.geometry.dispose(), g.material.dispose(), h.toneMapping = d, h.autoClear = u, t.background = p;
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer, s = t.mapping === es || t.mapping === ns;
    s ? (this._cubemapMaterial === null && (this._cubemapMaterial = Wc()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Gc());
    const r = s ? this._cubemapMaterial : this._equirectMaterial, o = new xe(this._lodPlanes[0], r), a = r.uniforms;
    a.envMap.value = t;
    const l = this._cubeSize;
    br(e, 0, 0, 3 * l, 2 * l), n.setRenderTarget(e), n.render(o, Wo);
  }
  _applyPMREM(t) {
    const e = this._renderer, n = e.autoClear;
    e.autoClear = !1;
    const s = this._lodPlanes.length;
    for (let r = 1; r < s; r++) {
      const o = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), a = zc[(s - r - 1) % zc.length];
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
    const l = this._renderer, c = this._blurMaterial;
    o !== "latitudinal" && o !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, u = new xe(this._lodPlanes[s], c), d = c.uniforms, f = this._sizeLods[n] - 1, g = isFinite(r) ? Math.PI / (2 * f) : 2 * Math.PI / (2 * mi - 1), _ = r / g, p = isFinite(r) ? 1 + Math.floor(h * _) : mi;
    p > mi && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${mi}`);
    const m = [];
    let y = 0;
    for (let A = 0; A < mi; ++A) {
      const L = A / _, G = Math.exp(-L * L / 2);
      m.push(G), A === 0 ? y += G : A < p && (y += 2 * G);
    }
    for (let A = 0; A < m.length; A++)
      m[A] = m[A] / y;
    d.envMap.value = t.texture, d.samples.value = p, d.weights.value = m, d.latitudinal.value = o === "latitudinal", a && (d.poleAxis.value = a);
    const { _lodMax: v } = this;
    d.dTheta.value = g, d.mipInt.value = v - n;
    const M = this._sizeLods[s], P = 3 * M * (s > v - Wi ? s - v + Wi : 0), w = 4 * (this._cubeSize - M);
    br(e, P, w, 3 * M, 2 * M), l.setRenderTarget(e), l.render(u, Wo);
  }
}
function g_(i) {
  const t = [], e = [], n = [];
  let s = i;
  const r = i - Wi + 1 + Bc.length;
  for (let o = 0; o < r; o++) {
    const a = Math.pow(2, s);
    e.push(a);
    let l = 1 / a;
    o > i - Wi ? l = Bc[o - i + Wi - 1] : o === 0 && (l = 0), n.push(l);
    const c = 1 / (a - 2), h = -c, u = 1 + c, d = [h, h, u, h, u, u, h, h, u, u, h, u], f = 6, g = 6, _ = 3, p = 2, m = 1, y = new Float32Array(_ * g * f), v = new Float32Array(p * g * f), M = new Float32Array(m * g * f);
    for (let w = 0; w < f; w++) {
      const A = w % 3 * 2 / 3 - 1, L = w > 2 ? 0 : -1, G = [
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
      y.set(G, _ * g * w), v.set(d, p * g * w);
      const x = [w, w, w, w, w, w];
      M.set(x, m * g * w);
    }
    const P = new Le();
    P.setAttribute("position", new De(y, _)), P.setAttribute("uv", new De(v, p)), P.setAttribute("faceIndex", new De(M, m)), t.push(P), s > Wi && s--;
  }
  return { lodPlanes: t, sizeLods: e, sigmas: n };
}
function Vc(i, t, e) {
  const n = new xi(i, t, e);
  return n.texture.mapping = co, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function br(i, t, e, n, s) {
  i.viewport.set(t, e, n, s), i.scissor.set(t, e, n, s);
}
function __(i, t, e) {
  const n = new Float32Array(mi), s = new R(0, 1, 0);
  return new ti({
    name: "SphericalGaussianBlur",
    defines: {
      n: mi,
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
    vertexShader: Rl(),
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
    blending: Jn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Gc() {
  return new ti({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Rl(),
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
    blending: Jn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Wc() {
  return new ti({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Rl(),
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
    blending: Jn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Rl() {
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
function v_(i) {
  let t = /* @__PURE__ */ new WeakMap(), e = null;
  function n(a) {
    if (a && a.isTexture) {
      const l = a.mapping, c = l === Sa || l === Ea, h = l === es || l === ns;
      if (c || h) {
        let u = t.get(a);
        const d = u !== void 0 ? u.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== d)
          return e === null && (e = new Hc(i)), u = c ? e.fromEquirectangular(a, u) : e.fromCubemap(a, u), u.texture.pmremVersion = a.pmremVersion, t.set(a, u), u.texture;
        if (u !== void 0)
          return u.texture;
        {
          const f = a.image;
          return c && f && f.height > 0 || h && f && s(f) ? (e === null && (e = new Hc(i)), u = c ? e.fromEquirectangular(a) : e.fromCubemap(a), u.texture.pmremVersion = a.pmremVersion, t.set(a, u), a.addEventListener("dispose", r), u.texture) : null;
        }
      }
    }
    return a;
  }
  function s(a) {
    let l = 0;
    const c = 6;
    for (let h = 0; h < c; h++)
      a[h] !== void 0 && l++;
    return l === c;
  }
  function r(a) {
    const l = a.target;
    l.removeEventListener("dispose", r);
    const c = t.get(l);
    c !== void 0 && (t.delete(l), c.dispose());
  }
  function o() {
    t = /* @__PURE__ */ new WeakMap(), e !== null && (e.dispose(), e = null);
  }
  return {
    get: n,
    dispose: o
  };
}
function x_(i) {
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
function y_(i, t, e, n) {
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
  function l(u) {
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
  function c(u) {
    const d = [], f = u.index, g = u.attributes.position;
    let _ = 0;
    if (f !== null) {
      const y = f.array;
      _ = f.version;
      for (let v = 0, M = y.length; v < M; v += 3) {
        const P = y[v + 0], w = y[v + 1], A = y[v + 2];
        d.push(P, w, w, A, A, P);
      }
    } else if (g !== void 0) {
      const y = g.array;
      _ = g.version;
      for (let v = 0, M = y.length / 3 - 1; v < M; v += 3) {
        const P = v + 0, w = v + 1, A = v + 2;
        d.push(P, w, w, A, A, P);
      }
    } else
      return;
    const p = new (Lu(d) ? Ou : Uu)(d, 1);
    p.version = _;
    const m = r.get(u);
    m && t.remove(m), r.set(u, p);
  }
  function h(u) {
    const d = r.get(u);
    if (d) {
      const f = u.index;
      f !== null && d.version < f.version && c(u);
    } else
      c(u);
    return r.get(u);
  }
  return {
    get: a,
    update: l,
    getWireframeAttribute: h
  };
}
function M_(i, t, e) {
  let n;
  function s(d) {
    n = d;
  }
  let r, o;
  function a(d) {
    r = d.type, o = d.bytesPerElement;
  }
  function l(d, f) {
    i.drawElements(n, f, r, d * o), e.update(f, n, 1);
  }
  function c(d, f, g) {
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
        c(d[m] / o, f[m], _[m]);
    else {
      p.multiDrawElementsInstancedWEBGL(n, f, 0, r, d, 0, _, 0, g);
      let m = 0;
      for (let y = 0; y < g; y++)
        m += f[y];
      for (let y = 0; y < _.length; y++)
        e.update(m, n, _[y]);
    }
  }
  this.setMode = s, this.setIndex = a, this.render = l, this.renderInstances = c, this.renderMultiDraw = h, this.renderMultiDrawInstances = u;
}
function S_(i) {
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
function E_(i, t, e) {
  const n = /* @__PURE__ */ new WeakMap(), s = new Zt();
  function r(o, a, l) {
    const c = o.morphTargetInfluences, h = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, u = h !== void 0 ? h.length : 0;
    let d = n.get(a);
    if (d === void 0 || d.count !== u) {
      let G = function() {
        A.dispose(), n.delete(a), a.removeEventListener("dispose", G);
      };
      d !== void 0 && d.texture.dispose();
      const f = a.morphAttributes.position !== void 0, g = a.morphAttributes.normal !== void 0, _ = a.morphAttributes.color !== void 0, p = a.morphAttributes.position || [], m = a.morphAttributes.normal || [], y = a.morphAttributes.color || [];
      let v = 0;
      f === !0 && (v = 1), g === !0 && (v = 2), _ === !0 && (v = 3);
      let M = a.attributes.position.count * v, P = 1;
      M > t.maxTextureSize && (P = Math.ceil(M / t.maxTextureSize), M = t.maxTextureSize);
      const w = new Float32Array(M * P * 4 * u), A = new Du(w, M, P, u);
      A.type = mn, A.needsUpdate = !0;
      const L = v * 4;
      for (let x = 0; x < u; x++) {
        const b = p[x], B = m[x], k = y[x], H = M * P * 4 * x;
        for (let K = 0; K < b.count; K++) {
          const z = K * L;
          f === !0 && (s.fromBufferAttribute(b, K), w[H + z + 0] = s.x, w[H + z + 1] = s.y, w[H + z + 2] = s.z, w[H + z + 3] = 0), g === !0 && (s.fromBufferAttribute(B, K), w[H + z + 4] = s.x, w[H + z + 5] = s.y, w[H + z + 6] = s.z, w[H + z + 7] = 0), _ === !0 && (s.fromBufferAttribute(k, K), w[H + z + 8] = s.x, w[H + z + 9] = s.y, w[H + z + 10] = s.z, w[H + z + 11] = k.itemSize === 4 ? s.w : 1);
        }
      }
      d = {
        count: u,
        texture: A,
        size: new tt(M, P)
      }, n.set(a, d), a.addEventListener("dispose", G);
    }
    if (o.isInstancedMesh === !0 && o.morphTexture !== null)
      l.getUniforms().setValue(i, "morphTexture", o.morphTexture, e);
    else {
      let f = 0;
      for (let _ = 0; _ < c.length; _++)
        f += c[_];
      const g = a.morphTargetsRelative ? 1 : 1 - f;
      l.getUniforms().setValue(i, "morphTargetBaseInfluence", g), l.getUniforms().setValue(i, "morphTargetInfluences", c);
    }
    l.getUniforms().setValue(i, "morphTargetsTexture", d.texture, e), l.getUniforms().setValue(i, "morphTargetsTextureSize", d.size);
  }
  return {
    update: r
  };
}
function b_(i, t, e, n) {
  let s = /* @__PURE__ */ new WeakMap();
  function r(l) {
    const c = n.render.frame, h = l.geometry, u = t.get(l, h);
    if (s.get(u) !== c && (t.update(u), s.set(u, c)), l.isInstancedMesh && (l.hasEventListener("dispose", a) === !1 && l.addEventListener("dispose", a), s.get(l) !== c && (e.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && e.update(l.instanceColor, i.ARRAY_BUFFER), s.set(l, c))), l.isSkinnedMesh) {
      const d = l.skeleton;
      s.get(d) !== c && (d.update(), s.set(d, c));
    }
    return u;
  }
  function o() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function a(l) {
    const c = l.target;
    c.removeEventListener("dispose", a), e.remove(c.instanceMatrix), c.instanceColor !== null && e.remove(c.instanceColor);
  }
  return {
    update: r,
    dispose: o
  };
}
class Hu extends Ae {
  constructor(t, e, n, s, r, o, a, l, c, h = qi) {
    if (h !== qi && h !== rs)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === qi && (n = vi), n === void 0 && h === rs && (n = ss), super(null, s, r, o, a, l, h, n, c), this.isDepthTexture = !0, this.image = { width: t, height: e }, this.magFilter = a !== void 0 ? a : Ve, this.minFilter = l !== void 0 ? l : Ve, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(t) {
    return super.copy(t), this.compareFunction = t.compareFunction, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}
const Vu = /* @__PURE__ */ new Ae(), Xc = /* @__PURE__ */ new Hu(1, 1), Gu = /* @__PURE__ */ new Du(), Wu = /* @__PURE__ */ new hp(), Xu = /* @__PURE__ */ new ku(), $c = [], jc = [], qc = new Float32Array(16), Yc = new Float32Array(9), Kc = new Float32Array(4);
function ds(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const s = t * e;
  let r = $c[s];
  if (r === void 0 && (r = new Float32Array(s), $c[s] = r), t !== 0) {
    n.toArray(r, 0);
    for (let o = 1, a = 0; o !== t; ++o)
      a += e, i[o].toArray(r, a);
  }
  return r;
}
function we(i, t) {
  if (i.length !== t.length) return !1;
  for (let e = 0, n = i.length; e < n; e++)
    if (i[e] !== t[e]) return !1;
  return !0;
}
function Re(i, t) {
  for (let e = 0, n = t.length; e < n; e++)
    i[e] = t[e];
}
function fo(i, t) {
  let e = jc[t];
  e === void 0 && (e = new Int32Array(t), jc[t] = e);
  for (let n = 0; n !== t; ++n)
    e[n] = i.allocateTextureUnit();
  return e;
}
function T_(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
}
function A_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (we(e, t)) return;
    i.uniform2fv(this.addr, t), Re(e, t);
  }
}
function w_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else if (t.r !== void 0)
    (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
  else {
    if (we(e, t)) return;
    i.uniform3fv(this.addr, t), Re(e, t);
  }
}
function R_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (we(e, t)) return;
    i.uniform4fv(this.addr, t), Re(e, t);
  }
}
function C_(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (we(e, t)) return;
    i.uniformMatrix2fv(this.addr, !1, t), Re(e, t);
  } else {
    if (we(e, n)) return;
    Kc.set(n), i.uniformMatrix2fv(this.addr, !1, Kc), Re(e, n);
  }
}
function P_(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (we(e, t)) return;
    i.uniformMatrix3fv(this.addr, !1, t), Re(e, t);
  } else {
    if (we(e, n)) return;
    Yc.set(n), i.uniformMatrix3fv(this.addr, !1, Yc), Re(e, n);
  }
}
function L_(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (we(e, t)) return;
    i.uniformMatrix4fv(this.addr, !1, t), Re(e, t);
  } else {
    if (we(e, n)) return;
    qc.set(n), i.uniformMatrix4fv(this.addr, !1, qc), Re(e, n);
  }
}
function I_(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
}
function D_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (we(e, t)) return;
    i.uniform2iv(this.addr, t), Re(e, t);
  }
}
function N_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (we(e, t)) return;
    i.uniform3iv(this.addr, t), Re(e, t);
  }
}
function U_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (we(e, t)) return;
    i.uniform4iv(this.addr, t), Re(e, t);
  }
}
function O_(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
}
function F_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (we(e, t)) return;
    i.uniform2uiv(this.addr, t), Re(e, t);
  }
}
function B_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (we(e, t)) return;
    i.uniform3uiv(this.addr, t), Re(e, t);
  }
}
function k_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (we(e, t)) return;
    i.uniform4uiv(this.addr, t), Re(e, t);
  }
}
function z_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s);
  let r;
  this.type === i.SAMPLER_2D_SHADOW ? (Xc.compareFunction = Pu, r = Xc) : r = Vu, e.setTexture2D(t || r, s);
}
function H_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture3D(t || Wu, s);
}
function V_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTextureCube(t || Xu, s);
}
function G_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture2DArray(t || Gu, s);
}
function W_(i) {
  switch (i) {
    case 5126:
      return T_;
    case 35664:
      return A_;
    case 35665:
      return w_;
    case 35666:
      return R_;
    case 35674:
      return C_;
    case 35675:
      return P_;
    case 35676:
      return L_;
    case 5124:
    case 35670:
      return I_;
    case 35667:
    case 35671:
      return D_;
    case 35668:
    case 35672:
      return N_;
    case 35669:
    case 35673:
      return U_;
    case 5125:
      return O_;
    case 36294:
      return F_;
    case 36295:
      return B_;
    case 36296:
      return k_;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return z_;
    case 35679:
    case 36299:
    case 36307:
      return H_;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return V_;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return G_;
  }
}
function X_(i, t) {
  i.uniform1fv(this.addr, t);
}
function $_(i, t) {
  const e = ds(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function j_(i, t) {
  const e = ds(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function q_(i, t) {
  const e = ds(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function Y_(i, t) {
  const e = ds(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, e);
}
function K_(i, t) {
  const e = ds(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, e);
}
function Z_(i, t) {
  const e = ds(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, e);
}
function J_(i, t) {
  i.uniform1iv(this.addr, t);
}
function Q_(i, t) {
  i.uniform2iv(this.addr, t);
}
function t0(i, t) {
  i.uniform3iv(this.addr, t);
}
function e0(i, t) {
  i.uniform4iv(this.addr, t);
}
function n0(i, t) {
  i.uniform1uiv(this.addr, t);
}
function i0(i, t) {
  i.uniform2uiv(this.addr, t);
}
function s0(i, t) {
  i.uniform3uiv(this.addr, t);
}
function r0(i, t) {
  i.uniform4uiv(this.addr, t);
}
function o0(i, t, e) {
  const n = this.cache, s = t.length, r = fo(e, s);
  we(n, r) || (i.uniform1iv(this.addr, r), Re(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTexture2D(t[o] || Vu, r[o]);
}
function a0(i, t, e) {
  const n = this.cache, s = t.length, r = fo(e, s);
  we(n, r) || (i.uniform1iv(this.addr, r), Re(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTexture3D(t[o] || Wu, r[o]);
}
function l0(i, t, e) {
  const n = this.cache, s = t.length, r = fo(e, s);
  we(n, r) || (i.uniform1iv(this.addr, r), Re(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTextureCube(t[o] || Xu, r[o]);
}
function c0(i, t, e) {
  const n = this.cache, s = t.length, r = fo(e, s);
  we(n, r) || (i.uniform1iv(this.addr, r), Re(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTexture2DArray(t[o] || Gu, r[o]);
}
function h0(i) {
  switch (i) {
    case 5126:
      return X_;
    case 35664:
      return $_;
    case 35665:
      return j_;
    case 35666:
      return q_;
    case 35674:
      return Y_;
    case 35675:
      return K_;
    case 35676:
      return Z_;
    case 5124:
    case 35670:
      return J_;
    case 35667:
    case 35671:
      return Q_;
    case 35668:
    case 35672:
      return t0;
    case 35669:
    case 35673:
      return e0;
    case 5125:
      return n0;
    case 36294:
      return i0;
    case 36295:
      return s0;
    case 36296:
      return r0;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return o0;
    case 35679:
    case 36299:
    case 36307:
      return a0;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return l0;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return c0;
  }
}
class u0 {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = W_(e.type);
  }
}
class d0 {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = h0(e.type);
  }
}
class f0 {
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
const Yo = /(\w+)(\])?(\[|\.)?/g;
function Zc(i, t) {
  i.seq.push(t), i.map[t.id] = t;
}
function p0(i, t, e) {
  const n = i.name, s = n.length;
  for (Yo.lastIndex = 0; ; ) {
    const r = Yo.exec(n), o = Yo.lastIndex;
    let a = r[1];
    const l = r[2] === "]", c = r[3];
    if (l && (a = a | 0), c === void 0 || c === "[" && o + 2 === s) {
      Zc(e, c === void 0 ? new u0(a, i, t) : new d0(a, i, t));
      break;
    } else {
      let u = e.map[a];
      u === void 0 && (u = new f0(a), Zc(e, u)), e = u;
    }
  }
}
class Yr {
  constructor(t, e) {
    this.seq = [], this.map = {};
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let s = 0; s < n; ++s) {
      const r = t.getActiveUniform(e, s), o = t.getUniformLocation(e, r.name);
      p0(r, o, this);
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
      const a = e[r], l = n[a.id];
      l.needsUpdate !== !1 && a.setValue(t, l.value, s);
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
function Jc(i, t, e) {
  const n = i.createShader(t);
  return i.shaderSource(n, e), i.compileShader(n), n;
}
const m0 = 37297;
let g0 = 0;
function _0(i, t) {
  const e = i.split(`
`), n = [], s = Math.max(t - 6, 0), r = Math.min(t + 6, e.length);
  for (let o = s; o < r; o++) {
    const a = o + 1;
    n.push(`${a === t ? ">" : " "} ${a}: ${e[o]}`);
  }
  return n.join(`
`);
}
function v0(i) {
  const t = qt.getPrimaries(qt.workingColorSpace), e = qt.getPrimaries(i);
  let n;
  switch (t === e ? n = "" : t === eo && e === to ? n = "LinearDisplayP3ToLinearSRGB" : t === to && e === eo && (n = "LinearSRGBToLinearDisplayP3"), i) {
    case Ne:
    case ho:
      return [n, "LinearTransferOETF"];
    case He:
    case El:
      return [n, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", i), [n, "LinearTransferOETF"];
  }
}
function Qc(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS), s = i.getShaderInfoLog(t).trim();
  if (n && s === "") return "";
  const r = /ERROR: 0:(\d+)/.exec(s);
  if (r) {
    const o = parseInt(r[1]);
    return e.toUpperCase() + `

` + s + `

` + _0(i.getShaderSource(t), o);
  } else
    return s;
}
function x0(i, t) {
  const e = v0(t);
  return `vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`;
}
function y0(i, t) {
  let e;
  switch (t) {
    case xf:
      e = "Linear";
      break;
    case yf:
      e = "Reinhard";
      break;
    case Mf:
      e = "Cineon";
      break;
    case Sf:
      e = "ACESFilmic";
      break;
    case bf:
      e = "AgX";
      break;
    case Tf:
      e = "Neutral";
      break;
    case Ef:
      e = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), e = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}
const Tr = /* @__PURE__ */ new R();
function M0() {
  qt.getLuminanceCoefficients(Tr);
  const i = Tr.x.toFixed(4), t = Tr.y.toFixed(4), e = Tr.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function S0(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Ds).join(`
`);
}
function E0(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== !1 && t.push("#define " + e + " " + n);
  }
  return t.join(`
`);
}
function b0(i, t) {
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
function Ds(i) {
  return i !== "";
}
function th(i, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function eh(i, t) {
  return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const T0 = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Ja(i) {
  return i.replace(T0, w0);
}
const A0 = /* @__PURE__ */ new Map();
function w0(i, t) {
  let e = Ot[t];
  if (e === void 0) {
    const n = A0.get(t);
    if (n !== void 0)
      e = Ot[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else
      throw new Error("Can not resolve #include <" + t + ">");
  }
  return Ja(e);
}
const R0 = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function nh(i) {
  return i.replace(R0, C0);
}
function C0(i, t, e, n) {
  let s = "";
  for (let r = parseInt(t); r < parseInt(e); r++)
    s += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
  return s;
}
function ih(i) {
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
function P0(i) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === pu ? t = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === mu ? t = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === In && (t = "SHADOWMAP_TYPE_VSM"), t;
}
function L0(i) {
  let t = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case es:
      case ns:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case co:
        t = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return t;
}
function I0(i) {
  let t = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case ns:
        t = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return t;
}
function D0(i) {
  let t = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case gu:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case _f:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case vf:
        t = "ENVMAP_BLENDING_ADD";
        break;
    }
  return t;
}
function N0(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2, n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 7 * 16)), texelHeight: n, maxMip: e };
}
function U0(i, t, e, n) {
  const s = i.getContext(), r = e.defines;
  let o = e.vertexShader, a = e.fragmentShader;
  const l = P0(e), c = L0(e), h = I0(e), u = D0(e), d = N0(e), f = S0(e), g = E0(r), _ = s.createProgram();
  let p, m, y = e.glslVersion ? "#version " + e.glslVersion + `
` : "";
  e.isRawShaderMaterial ? (p = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g
  ].filter(Ds).join(`
`), p.length > 0 && (p += `
`), m = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g
  ].filter(Ds).join(`
`), m.length > 0 && (m += `
`)) : (p = [
    ih(e),
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
    e.shadowMapEnabled ? "#define " + l : "",
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
  ].filter(Ds).join(`
`), m = [
    ih(e),
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g,
    e.useFog && e.fog ? "#define USE_FOG" : "",
    e.useFog && e.fogExp2 ? "#define FOG_EXP2" : "",
    e.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    e.map ? "#define USE_MAP" : "",
    e.matcap ? "#define USE_MATCAP" : "",
    e.envMap ? "#define USE_ENVMAP" : "",
    e.envMap ? "#define " + c : "",
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
    e.shadowMapEnabled ? "#define " + l : "",
    e.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    e.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    e.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    e.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    e.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    e.toneMapping !== Qn ? "#define TONE_MAPPING" : "",
    e.toneMapping !== Qn ? Ot.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    e.toneMapping !== Qn ? y0("toneMapping", e.toneMapping) : "",
    e.dithering ? "#define DITHERING" : "",
    e.opaque ? "#define OPAQUE" : "",
    Ot.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    x0("linearToOutputTexel", e.outputColorSpace),
    M0(),
    e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "",
    `
`
  ].filter(Ds).join(`
`)), o = Ja(o), o = th(o, e), o = eh(o, e), a = Ja(a), a = th(a, e), a = eh(a, e), o = nh(o), a = nh(a), e.isRawShaderMaterial !== !0 && (y = `#version 300 es
`, p = [
    f,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + p, m = [
    "#define varying in",
    e.glslVersion === xc ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    e.glslVersion === xc ? "" : "#define gl_FragColor pc_fragColor",
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
  const v = y + p + o, M = y + m + a, P = Jc(s, s.VERTEX_SHADER, v), w = Jc(s, s.FRAGMENT_SHADER, M);
  s.attachShader(_, P), s.attachShader(_, w), e.index0AttributeName !== void 0 ? s.bindAttribLocation(_, 0, e.index0AttributeName) : e.morphTargets === !0 && s.bindAttribLocation(_, 0, "position"), s.linkProgram(_);
  function A(b) {
    if (i.debug.checkShaderErrors) {
      const B = s.getProgramInfoLog(_).trim(), k = s.getShaderInfoLog(P).trim(), H = s.getShaderInfoLog(w).trim();
      let K = !0, z = !0;
      if (s.getProgramParameter(_, s.LINK_STATUS) === !1)
        if (K = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(s, _, P, w);
        else {
          const nt = Qc(s, P, "vertex"), W = Qc(s, w, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(_, s.VALIDATE_STATUS) + `

Material Name: ` + b.name + `
Material Type: ` + b.type + `

Program Info Log: ` + B + `
` + nt + `
` + W
          );
        }
      else B !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", B) : (k === "" || H === "") && (z = !1);
      z && (b.diagnostics = {
        runnable: K,
        programLog: B,
        vertexShader: {
          log: k,
          prefix: p
        },
        fragmentShader: {
          log: H,
          prefix: m
        }
      });
    }
    s.deleteShader(P), s.deleteShader(w), L = new Yr(s, _), G = b0(s, _);
  }
  let L;
  this.getUniforms = function() {
    return L === void 0 && A(this), L;
  };
  let G;
  this.getAttributes = function() {
    return G === void 0 && A(this), G;
  };
  let x = e.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return x === !1 && (x = s.getProgramParameter(_, m0)), x;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), s.deleteProgram(_), this.program = void 0;
  }, this.type = e.shaderType, this.name = e.shaderName, this.id = g0++, this.cacheKey = t, this.usedTimes = 1, this.program = _, this.vertexShader = P, this.fragmentShader = w, this;
}
let O0 = 0;
class F0 {
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
    return n === void 0 && (n = new B0(t), e.set(t, n)), n;
  }
}
class B0 {
  constructor(t) {
    this.id = O0++, this.code = t, this.usedTimes = 0;
  }
}
function k0(i, t, e, n, s, r, o) {
  const a = new Tl(), l = new F0(), c = /* @__PURE__ */ new Set(), h = [], u = s.logarithmicDepthBuffer, d = s.reverseDepthBuffer, f = s.vertexTextures;
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
  function p(x) {
    return c.add(x), x === 0 ? "uv" : `uv${x}`;
  }
  function m(x, b, B, k, H) {
    const K = k.fog, z = H.geometry, nt = x.isMeshStandardMaterial ? k.environment : null, W = (x.isMeshStandardMaterial ? e : t).get(x.envMap || nt), ut = W && W.mapping === co ? W.image.height : null, dt = _[x.type];
    x.precision !== null && (g = s.getMaxPrecision(x.precision), g !== x.precision && console.warn("THREE.WebGLProgram.getParameters:", x.precision, "not supported, using", g, "instead."));
    const Mt = z.morphAttributes.position || z.morphAttributes.normal || z.morphAttributes.color, Yt = Mt !== void 0 ? Mt.length : 0;
    let ee = 0;
    z.morphAttributes.position !== void 0 && (ee = 1), z.morphAttributes.normal !== void 0 && (ee = 2), z.morphAttributes.color !== void 0 && (ee = 3);
    let $, Q, xt, ft;
    if (dt) {
      const We = _n[dt];
      $ = We.vertexShader, Q = We.fragmentShader;
    } else
      $ = x.vertexShader, Q = x.fragmentShader, l.update(x), xt = l.getVertexShaderID(x), ft = l.getFragmentShaderID(x);
    const Nt = i.getRenderTarget(), wt = H.isInstancedMesh === !0, Gt = H.isBatchedMesh === !0, ae = !!x.map, Wt = !!x.matcap, C = !!W, qe = !!x.aoMap, Ht = !!x.lightMap, $t = !!x.bumpMap, Ct = !!x.normalMap, de = !!x.displacementMap, It = !!x.emissiveMap, T = !!x.metalnessMap, S = !!x.roughnessMap, U = x.anisotropy > 0, q = x.clearcoat > 0, Z = x.dispersion > 0, j = x.iridescence > 0, St = x.sheen > 0, rt = x.transmission > 0, pt = U && !!x.anisotropyMap, jt = q && !!x.clearcoatMap, et = q && !!x.clearcoatNormalMap, mt = q && !!x.clearcoatRoughnessMap, Pt = j && !!x.iridescenceMap, Lt = j && !!x.iridescenceThicknessMap, gt = St && !!x.sheenColorMap, Vt = St && !!x.sheenRoughnessMap, Ut = !!x.specularMap, he = !!x.specularColorMap, I = !!x.specularIntensityMap, lt = rt && !!x.transmissionMap, V = rt && !!x.thicknessMap, Y = !!x.gradientMap, ot = !!x.alphaMap, ct = x.alphaTest > 0, Xt = !!x.alphaHash, Me = !!x.extensions;
    let Ge = Qn;
    x.toneMapped && (Nt === null || Nt.isXRRenderTarget === !0) && (Ge = i.toneMapping);
    const Kt = {
      shaderID: dt,
      shaderType: x.type,
      shaderName: x.name,
      vertexShader: $,
      fragmentShader: Q,
      defines: x.defines,
      customVertexShaderID: xt,
      customFragmentShaderID: ft,
      isRawShaderMaterial: x.isRawShaderMaterial === !0,
      glslVersion: x.glslVersion,
      precision: g,
      batching: Gt,
      batchingColor: Gt && H._colorsTexture !== null,
      instancing: wt,
      instancingColor: wt && H.instanceColor !== null,
      instancingMorph: wt && H.morphTexture !== null,
      supportsVertexTextures: f,
      outputColorSpace: Nt === null ? i.outputColorSpace : Nt.isXRRenderTarget === !0 ? Nt.texture.colorSpace : Ne,
      alphaToCoverage: !!x.alphaToCoverage,
      map: ae,
      matcap: Wt,
      envMap: C,
      envMapMode: C && W.mapping,
      envMapCubeUVHeight: ut,
      aoMap: qe,
      lightMap: Ht,
      bumpMap: $t,
      normalMap: Ct,
      displacementMap: f && de,
      emissiveMap: It,
      normalMapObjectSpace: Ct && x.normalMapType === Lf,
      normalMapTangentSpace: Ct && x.normalMapType === Cu,
      metalnessMap: T,
      roughnessMap: S,
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
      sheenRoughnessMap: Vt,
      specularMap: Ut,
      specularColorMap: he,
      specularIntensityMap: I,
      transmission: rt,
      transmissionMap: lt,
      thicknessMap: V,
      gradientMap: Y,
      opaque: x.transparent === !1 && x.blending === ji && x.alphaToCoverage === !1,
      alphaMap: ot,
      alphaTest: ct,
      alphaHash: Xt,
      combine: x.combine,
      //
      mapUv: ae && p(x.map.channel),
      aoMapUv: qe && p(x.aoMap.channel),
      lightMapUv: Ht && p(x.lightMap.channel),
      bumpMapUv: $t && p(x.bumpMap.channel),
      normalMapUv: Ct && p(x.normalMap.channel),
      displacementMapUv: de && p(x.displacementMap.channel),
      emissiveMapUv: It && p(x.emissiveMap.channel),
      metalnessMapUv: T && p(x.metalnessMap.channel),
      roughnessMapUv: S && p(x.roughnessMap.channel),
      anisotropyMapUv: pt && p(x.anisotropyMap.channel),
      clearcoatMapUv: jt && p(x.clearcoatMap.channel),
      clearcoatNormalMapUv: et && p(x.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: mt && p(x.clearcoatRoughnessMap.channel),
      iridescenceMapUv: Pt && p(x.iridescenceMap.channel),
      iridescenceThicknessMapUv: Lt && p(x.iridescenceThicknessMap.channel),
      sheenColorMapUv: gt && p(x.sheenColorMap.channel),
      sheenRoughnessMapUv: Vt && p(x.sheenRoughnessMap.channel),
      specularMapUv: Ut && p(x.specularMap.channel),
      specularColorMapUv: he && p(x.specularColorMap.channel),
      specularIntensityMapUv: I && p(x.specularIntensityMap.channel),
      transmissionMapUv: lt && p(x.transmissionMap.channel),
      thicknessMapUv: V && p(x.thicknessMap.channel),
      alphaMapUv: ot && p(x.alphaMap.channel),
      //
      vertexTangents: !!z.attributes.tangent && (Ct || U),
      vertexColors: x.vertexColors,
      vertexAlphas: x.vertexColors === !0 && !!z.attributes.color && z.attributes.color.itemSize === 4,
      pointsUvs: H.isPoints === !0 && !!z.attributes.uv && (ae || ot),
      fog: !!K,
      useFog: x.fog === !0,
      fogExp2: !!K && K.isFogExp2,
      flatShading: x.flatShading === !0,
      sizeAttenuation: x.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reverseDepthBuffer: d,
      skinning: H.isSkinnedMesh === !0,
      morphTargets: z.morphAttributes.position !== void 0,
      morphNormals: z.morphAttributes.normal !== void 0,
      morphColors: z.morphAttributes.color !== void 0,
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
      dithering: x.dithering,
      shadowMapEnabled: i.shadowMap.enabled && B.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: Ge,
      decodeVideoTexture: ae && x.map.isVideoTexture === !0 && qt.getTransfer(x.map.colorSpace) === pe,
      premultipliedAlpha: x.premultipliedAlpha,
      doubleSided: x.side === fn,
      flipSided: x.side === $e,
      useDepthPacking: x.depthPacking >= 0,
      depthPacking: x.depthPacking || 0,
      index0AttributeName: x.index0AttributeName,
      extensionClipCullDistance: Me && x.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (Me && x.extensions.multiDraw === !0 || Gt) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: x.customProgramCacheKey()
    };
    return Kt.vertexUv1s = c.has(1), Kt.vertexUv2s = c.has(2), Kt.vertexUv3s = c.has(3), c.clear(), Kt;
  }
  function y(x) {
    const b = [];
    if (x.shaderID ? b.push(x.shaderID) : (b.push(x.customVertexShaderID), b.push(x.customFragmentShaderID)), x.defines !== void 0)
      for (const B in x.defines)
        b.push(B), b.push(x.defines[B]);
    return x.isRawShaderMaterial === !1 && (v(b, x), M(b, x), b.push(i.outputColorSpace)), b.push(x.customProgramCacheKey), b.join();
  }
  function v(x, b) {
    x.push(b.precision), x.push(b.outputColorSpace), x.push(b.envMapMode), x.push(b.envMapCubeUVHeight), x.push(b.mapUv), x.push(b.alphaMapUv), x.push(b.lightMapUv), x.push(b.aoMapUv), x.push(b.bumpMapUv), x.push(b.normalMapUv), x.push(b.displacementMapUv), x.push(b.emissiveMapUv), x.push(b.metalnessMapUv), x.push(b.roughnessMapUv), x.push(b.anisotropyMapUv), x.push(b.clearcoatMapUv), x.push(b.clearcoatNormalMapUv), x.push(b.clearcoatRoughnessMapUv), x.push(b.iridescenceMapUv), x.push(b.iridescenceThicknessMapUv), x.push(b.sheenColorMapUv), x.push(b.sheenRoughnessMapUv), x.push(b.specularMapUv), x.push(b.specularColorMapUv), x.push(b.specularIntensityMapUv), x.push(b.transmissionMapUv), x.push(b.thicknessMapUv), x.push(b.combine), x.push(b.fogExp2), x.push(b.sizeAttenuation), x.push(b.morphTargetsCount), x.push(b.morphAttributeCount), x.push(b.numDirLights), x.push(b.numPointLights), x.push(b.numSpotLights), x.push(b.numSpotLightMaps), x.push(b.numHemiLights), x.push(b.numRectAreaLights), x.push(b.numDirLightShadows), x.push(b.numPointLightShadows), x.push(b.numSpotLightShadows), x.push(b.numSpotLightShadowsWithMaps), x.push(b.numLightProbes), x.push(b.shadowMapType), x.push(b.toneMapping), x.push(b.numClippingPlanes), x.push(b.numClipIntersection), x.push(b.depthPacking);
  }
  function M(x, b) {
    a.disableAll(), b.supportsVertexTextures && a.enable(0), b.instancing && a.enable(1), b.instancingColor && a.enable(2), b.instancingMorph && a.enable(3), b.matcap && a.enable(4), b.envMap && a.enable(5), b.normalMapObjectSpace && a.enable(6), b.normalMapTangentSpace && a.enable(7), b.clearcoat && a.enable(8), b.iridescence && a.enable(9), b.alphaTest && a.enable(10), b.vertexColors && a.enable(11), b.vertexAlphas && a.enable(12), b.vertexUv1s && a.enable(13), b.vertexUv2s && a.enable(14), b.vertexUv3s && a.enable(15), b.vertexTangents && a.enable(16), b.anisotropy && a.enable(17), b.alphaHash && a.enable(18), b.batching && a.enable(19), b.dispersion && a.enable(20), b.batchingColor && a.enable(21), x.push(a.mask), a.disableAll(), b.fog && a.enable(0), b.useFog && a.enable(1), b.flatShading && a.enable(2), b.logarithmicDepthBuffer && a.enable(3), b.reverseDepthBuffer && a.enable(4), b.skinning && a.enable(5), b.morphTargets && a.enable(6), b.morphNormals && a.enable(7), b.morphColors && a.enable(8), b.premultipliedAlpha && a.enable(9), b.shadowMapEnabled && a.enable(10), b.doubleSided && a.enable(11), b.flipSided && a.enable(12), b.useDepthPacking && a.enable(13), b.dithering && a.enable(14), b.transmission && a.enable(15), b.sheen && a.enable(16), b.opaque && a.enable(17), b.pointsUvs && a.enable(18), b.decodeVideoTexture && a.enable(19), b.alphaToCoverage && a.enable(20), x.push(a.mask);
  }
  function P(x) {
    const b = _[x.type];
    let B;
    if (b) {
      const k = _n[b];
      B = Sp.clone(k.uniforms);
    } else
      B = x.uniforms;
    return B;
  }
  function w(x, b) {
    let B;
    for (let k = 0, H = h.length; k < H; k++) {
      const K = h[k];
      if (K.cacheKey === b) {
        B = K, ++B.usedTimes;
        break;
      }
    }
    return B === void 0 && (B = new U0(i, b, x, r), h.push(B)), B;
  }
  function A(x) {
    if (--x.usedTimes === 0) {
      const b = h.indexOf(x);
      h[b] = h[h.length - 1], h.pop(), x.destroy();
    }
  }
  function L(x) {
    l.remove(x);
  }
  function G() {
    l.dispose();
  }
  return {
    getParameters: m,
    getProgramCacheKey: y,
    getUniforms: P,
    acquireProgram: w,
    releaseProgram: A,
    releaseShaderCache: L,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: h,
    dispose: G
  };
}
function z0() {
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
  function s(o, a, l) {
    i.get(o)[a] = l;
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
function H0(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.z !== t.z ? i.z - t.z : i.id - t.id;
}
function sh(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
}
function rh() {
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
  function l(u, d, f, g, _, p) {
    const m = o(u, d, f, g, _, p);
    f.transmission > 0 ? n.unshift(m) : f.transparent === !0 ? s.unshift(m) : e.unshift(m);
  }
  function c(u, d) {
    e.length > 1 && e.sort(u || H0), n.length > 1 && n.sort(d || sh), s.length > 1 && s.sort(d || sh);
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
    unshift: l,
    finish: h,
    sort: c
  };
}
function V0() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(n, s) {
    const r = i.get(n);
    let o;
    return r === void 0 ? (o = new rh(), i.set(n, [o])) : s >= r.length ? (o = new rh(), r.push(o)) : o = r[s], o;
  }
  function e() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: e
  };
}
function G0() {
  const i = {};
  return {
    get: function(t) {
      if (i[t.id] !== void 0)
        return i[t.id];
      let e;
      switch (t.type) {
        case "DirectionalLight":
          e = {
            direction: new R(),
            color: new Tt()
          };
          break;
        case "SpotLight":
          e = {
            position: new R(),
            direction: new R(),
            color: new Tt(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          e = {
            position: new R(),
            color: new Tt(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          e = {
            direction: new R(),
            skyColor: new Tt(),
            groundColor: new Tt()
          };
          break;
        case "RectAreaLight":
          e = {
            color: new Tt(),
            position: new R(),
            halfWidth: new R(),
            halfHeight: new R()
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
function W0() {
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
let X0 = 0;
function $0(i, t) {
  return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
}
function j0(i) {
  const t = new G0(), e = W0(), n = {
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
  for (let c = 0; c < 9; c++) n.probe.push(new R());
  const s = new R(), r = new Dt(), o = new Dt();
  function a(c) {
    let h = 0, u = 0, d = 0;
    for (let G = 0; G < 9; G++) n.probe[G].set(0, 0, 0);
    let f = 0, g = 0, _ = 0, p = 0, m = 0, y = 0, v = 0, M = 0, P = 0, w = 0, A = 0;
    c.sort($0);
    for (let G = 0, x = c.length; G < x; G++) {
      const b = c[G], B = b.color, k = b.intensity, H = b.distance, K = b.shadow && b.shadow.map ? b.shadow.map.texture : null;
      if (b.isAmbientLight)
        h += B.r * k, u += B.g * k, d += B.b * k;
      else if (b.isLightProbe) {
        for (let z = 0; z < 9; z++)
          n.probe[z].addScaledVector(b.sh.coefficients[z], k);
        A++;
      } else if (b.isDirectionalLight) {
        const z = t.get(b);
        if (z.color.copy(b.color).multiplyScalar(b.intensity), b.castShadow) {
          const nt = b.shadow, W = e.get(b);
          W.shadowIntensity = nt.intensity, W.shadowBias = nt.bias, W.shadowNormalBias = nt.normalBias, W.shadowRadius = nt.radius, W.shadowMapSize = nt.mapSize, n.directionalShadow[f] = W, n.directionalShadowMap[f] = K, n.directionalShadowMatrix[f] = b.shadow.matrix, y++;
        }
        n.directional[f] = z, f++;
      } else if (b.isSpotLight) {
        const z = t.get(b);
        z.position.setFromMatrixPosition(b.matrixWorld), z.color.copy(B).multiplyScalar(k), z.distance = H, z.coneCos = Math.cos(b.angle), z.penumbraCos = Math.cos(b.angle * (1 - b.penumbra)), z.decay = b.decay, n.spot[_] = z;
        const nt = b.shadow;
        if (b.map && (n.spotLightMap[P] = b.map, P++, nt.updateMatrices(b), b.castShadow && w++), n.spotLightMatrix[_] = nt.matrix, b.castShadow) {
          const W = e.get(b);
          W.shadowIntensity = nt.intensity, W.shadowBias = nt.bias, W.shadowNormalBias = nt.normalBias, W.shadowRadius = nt.radius, W.shadowMapSize = nt.mapSize, n.spotShadow[_] = W, n.spotShadowMap[_] = K, M++;
        }
        _++;
      } else if (b.isRectAreaLight) {
        const z = t.get(b);
        z.color.copy(B).multiplyScalar(k), z.halfWidth.set(b.width * 0.5, 0, 0), z.halfHeight.set(0, b.height * 0.5, 0), n.rectArea[p] = z, p++;
      } else if (b.isPointLight) {
        const z = t.get(b);
        if (z.color.copy(b.color).multiplyScalar(b.intensity), z.distance = b.distance, z.decay = b.decay, b.castShadow) {
          const nt = b.shadow, W = e.get(b);
          W.shadowIntensity = nt.intensity, W.shadowBias = nt.bias, W.shadowNormalBias = nt.normalBias, W.shadowRadius = nt.radius, W.shadowMapSize = nt.mapSize, W.shadowCameraNear = nt.camera.near, W.shadowCameraFar = nt.camera.far, n.pointShadow[g] = W, n.pointShadowMap[g] = K, n.pointShadowMatrix[g] = b.shadow.matrix, v++;
        }
        n.point[g] = z, g++;
      } else if (b.isHemisphereLight) {
        const z = t.get(b);
        z.skyColor.copy(b.color).multiplyScalar(k), z.groundColor.copy(b.groundColor).multiplyScalar(k), n.hemi[m] = z, m++;
      }
    }
    p > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = st.LTC_FLOAT_1, n.rectAreaLTC2 = st.LTC_FLOAT_2) : (n.rectAreaLTC1 = st.LTC_HALF_1, n.rectAreaLTC2 = st.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = u, n.ambient[2] = d;
    const L = n.hash;
    (L.directionalLength !== f || L.pointLength !== g || L.spotLength !== _ || L.rectAreaLength !== p || L.hemiLength !== m || L.numDirectionalShadows !== y || L.numPointShadows !== v || L.numSpotShadows !== M || L.numSpotMaps !== P || L.numLightProbes !== A) && (n.directional.length = f, n.spot.length = _, n.rectArea.length = p, n.point.length = g, n.hemi.length = m, n.directionalShadow.length = y, n.directionalShadowMap.length = y, n.pointShadow.length = v, n.pointShadowMap.length = v, n.spotShadow.length = M, n.spotShadowMap.length = M, n.directionalShadowMatrix.length = y, n.pointShadowMatrix.length = v, n.spotLightMatrix.length = M + P - w, n.spotLightMap.length = P, n.numSpotLightShadowsWithMaps = w, n.numLightProbes = A, L.directionalLength = f, L.pointLength = g, L.spotLength = _, L.rectAreaLength = p, L.hemiLength = m, L.numDirectionalShadows = y, L.numPointShadows = v, L.numSpotShadows = M, L.numSpotMaps = P, L.numLightProbes = A, n.version = X0++);
  }
  function l(c, h) {
    let u = 0, d = 0, f = 0, g = 0, _ = 0;
    const p = h.matrixWorldInverse;
    for (let m = 0, y = c.length; m < y; m++) {
      const v = c[m];
      if (v.isDirectionalLight) {
        const M = n.directional[u];
        M.direction.setFromMatrixPosition(v.matrixWorld), s.setFromMatrixPosition(v.target.matrixWorld), M.direction.sub(s), M.direction.transformDirection(p), u++;
      } else if (v.isSpotLight) {
        const M = n.spot[f];
        M.position.setFromMatrixPosition(v.matrixWorld), M.position.applyMatrix4(p), M.direction.setFromMatrixPosition(v.matrixWorld), s.setFromMatrixPosition(v.target.matrixWorld), M.direction.sub(s), M.direction.transformDirection(p), f++;
      } else if (v.isRectAreaLight) {
        const M = n.rectArea[g];
        M.position.setFromMatrixPosition(v.matrixWorld), M.position.applyMatrix4(p), o.identity(), r.copy(v.matrixWorld), r.premultiply(p), o.extractRotation(r), M.halfWidth.set(v.width * 0.5, 0, 0), M.halfHeight.set(0, v.height * 0.5, 0), M.halfWidth.applyMatrix4(o), M.halfHeight.applyMatrix4(o), g++;
      } else if (v.isPointLight) {
        const M = n.point[d];
        M.position.setFromMatrixPosition(v.matrixWorld), M.position.applyMatrix4(p), d++;
      } else if (v.isHemisphereLight) {
        const M = n.hemi[_];
        M.direction.setFromMatrixPosition(v.matrixWorld), M.direction.transformDirection(p), _++;
      }
    }
  }
  return {
    setup: a,
    setupView: l,
    state: n
  };
}
function oh(i) {
  const t = new j0(i), e = [], n = [];
  function s(h) {
    c.camera = h, e.length = 0, n.length = 0;
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
  function l(h) {
    t.setupView(e, h);
  }
  const c = {
    lightsArray: e,
    shadowsArray: n,
    camera: null,
    lights: t,
    transmissionRenderTarget: {}
  };
  return {
    init: s,
    state: c,
    setupLights: a,
    setupLightsView: l,
    pushLight: r,
    pushShadow: o
  };
}
function q0(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(s, r = 0) {
    const o = t.get(s);
    let a;
    return o === void 0 ? (a = new oh(i), t.set(s, [a])) : r >= o.length ? (a = new oh(i), o.push(a)) : a = o[r], a;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: n
  };
}
class Y0 extends gn {
  constructor(t) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Cf, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
  }
}
class K0 extends gn {
  constructor(t) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
  }
}
const Z0 = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, J0 = `uniform sampler2D shadow_pass;
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
function Q0(i, t, e) {
  let n = new Al();
  const s = new tt(), r = new tt(), o = new Zt(), a = new Y0({ depthPacking: Pf }), l = new K0(), c = {}, h = e.maxTextureSize, u = { [Fn]: $e, [$e]: Fn, [fn]: fn }, d = new ti({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new tt() },
      radius: { value: 4 }
    },
    vertexShader: Z0,
    fragmentShader: J0
  }), f = d.clone();
  f.defines.HORIZONTAL_PASS = 1;
  const g = new Le();
  g.setAttribute(
    "position",
    new De(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const _ = new xe(g, d), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = pu;
  let m = this.type;
  this.render = function(w, A, L) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || w.length === 0) return;
    const G = i.getRenderTarget(), x = i.getActiveCubeFace(), b = i.getActiveMipmapLevel(), B = i.state;
    B.setBlending(Jn), B.buffers.color.setClear(1, 1, 1, 1), B.buffers.depth.setTest(!0), B.setScissorTest(!1);
    const k = m !== In && this.type === In, H = m === In && this.type !== In;
    for (let K = 0, z = w.length; K < z; K++) {
      const nt = w[K], W = nt.shadow;
      if (W === void 0) {
        console.warn("THREE.WebGLShadowMap:", nt, "has no shadow.");
        continue;
      }
      if (W.autoUpdate === !1 && W.needsUpdate === !1) continue;
      s.copy(W.mapSize);
      const ut = W.getFrameExtents();
      if (s.multiply(ut), r.copy(W.mapSize), (s.x > h || s.y > h) && (s.x > h && (r.x = Math.floor(h / ut.x), s.x = r.x * ut.x, W.mapSize.x = r.x), s.y > h && (r.y = Math.floor(h / ut.y), s.y = r.y * ut.y, W.mapSize.y = r.y)), W.map === null || k === !0 || H === !0) {
        const Mt = this.type !== In ? { minFilter: Ve, magFilter: Ve } : {};
        W.map !== null && W.map.dispose(), W.map = new xi(s.x, s.y, Mt), W.map.texture.name = nt.name + ".shadowMap", W.camera.updateProjectionMatrix();
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
      W.isPointLightShadow !== !0 && this.type === In && y(W, L), W.needsUpdate = !1;
    }
    m = this.type, p.needsUpdate = !1, i.setRenderTarget(G, x, b);
  };
  function y(w, A) {
    const L = t.update(_);
    d.defines.VSM_SAMPLES !== w.blurSamples && (d.defines.VSM_SAMPLES = w.blurSamples, f.defines.VSM_SAMPLES = w.blurSamples, d.needsUpdate = !0, f.needsUpdate = !0), w.mapPass === null && (w.mapPass = new xi(s.x, s.y)), d.uniforms.shadow_pass.value = w.map.texture, d.uniforms.resolution.value = w.mapSize, d.uniforms.radius.value = w.radius, i.setRenderTarget(w.mapPass), i.clear(), i.renderBufferDirect(A, null, L, d, _, null), f.uniforms.shadow_pass.value = w.mapPass.texture, f.uniforms.resolution.value = w.mapSize, f.uniforms.radius.value = w.radius, i.setRenderTarget(w.map), i.clear(), i.renderBufferDirect(A, null, L, f, _, null);
  }
  function v(w, A, L, G) {
    let x = null;
    const b = L.isPointLight === !0 ? w.customDistanceMaterial : w.customDepthMaterial;
    if (b !== void 0)
      x = b;
    else if (x = L.isPointLight === !0 ? l : a, i.localClippingEnabled && A.clipShadows === !0 && Array.isArray(A.clippingPlanes) && A.clippingPlanes.length !== 0 || A.displacementMap && A.displacementScale !== 0 || A.alphaMap && A.alphaTest > 0 || A.map && A.alphaTest > 0) {
      const B = x.uuid, k = A.uuid;
      let H = c[B];
      H === void 0 && (H = {}, c[B] = H);
      let K = H[k];
      K === void 0 && (K = x.clone(), H[k] = K, A.addEventListener("dispose", P)), x = K;
    }
    if (x.visible = A.visible, x.wireframe = A.wireframe, G === In ? x.side = A.shadowSide !== null ? A.shadowSide : A.side : x.side = A.shadowSide !== null ? A.shadowSide : u[A.side], x.alphaMap = A.alphaMap, x.alphaTest = A.alphaTest, x.map = A.map, x.clipShadows = A.clipShadows, x.clippingPlanes = A.clippingPlanes, x.clipIntersection = A.clipIntersection, x.displacementMap = A.displacementMap, x.displacementScale = A.displacementScale, x.displacementBias = A.displacementBias, x.wireframeLinewidth = A.wireframeLinewidth, x.linewidth = A.linewidth, L.isPointLight === !0 && x.isMeshDistanceMaterial === !0) {
      const B = i.properties.get(x);
      B.light = L;
    }
    return x;
  }
  function M(w, A, L, G, x) {
    if (w.visible === !1) return;
    if (w.layers.test(A.layers) && (w.isMesh || w.isLine || w.isPoints) && (w.castShadow || w.receiveShadow && x === In) && (!w.frustumCulled || n.intersectsObject(w))) {
      w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse, w.matrixWorld);
      const k = t.update(w), H = w.material;
      if (Array.isArray(H)) {
        const K = k.groups;
        for (let z = 0, nt = K.length; z < nt; z++) {
          const W = K[z], ut = H[W.materialIndex];
          if (ut && ut.visible) {
            const dt = v(w, ut, G, x);
            w.onBeforeShadow(i, w, A, L, k, dt, W), i.renderBufferDirect(L, null, k, dt, w, W), w.onAfterShadow(i, w, A, L, k, dt, W);
          }
        }
      } else if (H.visible) {
        const K = v(w, H, G, x);
        w.onBeforeShadow(i, w, A, L, k, K, null), i.renderBufferDirect(L, null, k, K, w, null), w.onAfterShadow(i, w, A, L, k, K, null);
      }
    }
    const B = w.children;
    for (let k = 0, H = B.length; k < H; k++)
      M(B[k], A, L, G, x);
  }
  function P(w) {
    w.target.removeEventListener("dispose", P);
    for (const L in c) {
      const G = c[L], x = w.target.uuid;
      x in G && (G[x].dispose(), delete G[x]);
    }
  }
}
const tv = {
  [ma]: ga,
  [_a]: ya,
  [va]: Ma,
  [ts]: xa,
  [ga]: ma,
  [ya]: _a,
  [Ma]: va,
  [xa]: ts
};
function ev(i) {
  function t() {
    let I = !1;
    const lt = new Zt();
    let V = null;
    const Y = new Zt(0, 0, 0, 0);
    return {
      setMask: function(ot) {
        V !== ot && !I && (i.colorMask(ot, ot, ot, ot), V = ot);
      },
      setLocked: function(ot) {
        I = ot;
      },
      setClear: function(ot, ct, Xt, Me, Ge) {
        Ge === !0 && (ot *= Me, ct *= Me, Xt *= Me), lt.set(ot, ct, Xt, Me), Y.equals(lt) === !1 && (i.clearColor(ot, ct, Xt, Me), Y.copy(lt));
      },
      reset: function() {
        I = !1, V = null, Y.set(-1, 0, 0, 0);
      }
    };
  }
  function e() {
    let I = !1, lt = !1, V = null, Y = null, ot = null;
    return {
      setReversed: function(ct) {
        lt = ct;
      },
      setTest: function(ct) {
        ct ? xt(i.DEPTH_TEST) : ft(i.DEPTH_TEST);
      },
      setMask: function(ct) {
        V !== ct && !I && (i.depthMask(ct), V = ct);
      },
      setFunc: function(ct) {
        if (lt && (ct = tv[ct]), Y !== ct) {
          switch (ct) {
            case ma:
              i.depthFunc(i.NEVER);
              break;
            case ga:
              i.depthFunc(i.ALWAYS);
              break;
            case _a:
              i.depthFunc(i.LESS);
              break;
            case ts:
              i.depthFunc(i.LEQUAL);
              break;
            case va:
              i.depthFunc(i.EQUAL);
              break;
            case xa:
              i.depthFunc(i.GEQUAL);
              break;
            case ya:
              i.depthFunc(i.GREATER);
              break;
            case Ma:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          Y = ct;
        }
      },
      setLocked: function(ct) {
        I = ct;
      },
      setClear: function(ct) {
        ot !== ct && (i.clearDepth(ct), ot = ct);
      },
      reset: function() {
        I = !1, V = null, Y = null, ot = null;
      }
    };
  }
  function n() {
    let I = !1, lt = null, V = null, Y = null, ot = null, ct = null, Xt = null, Me = null, Ge = null;
    return {
      setTest: function(Kt) {
        I || (Kt ? xt(i.STENCIL_TEST) : ft(i.STENCIL_TEST));
      },
      setMask: function(Kt) {
        lt !== Kt && !I && (i.stencilMask(Kt), lt = Kt);
      },
      setFunc: function(Kt, We, Tn) {
        (V !== Kt || Y !== We || ot !== Tn) && (i.stencilFunc(Kt, We, Tn), V = Kt, Y = We, ot = Tn);
      },
      setOp: function(Kt, We, Tn) {
        (ct !== Kt || Xt !== We || Me !== Tn) && (i.stencilOp(Kt, We, Tn), ct = Kt, Xt = We, Me = Tn);
      },
      setLocked: function(Kt) {
        I = Kt;
      },
      setClear: function(Kt) {
        Ge !== Kt && (i.clearStencil(Kt), Ge = Kt);
      },
      reset: function() {
        I = !1, lt = null, V = null, Y = null, ot = null, ct = null, Xt = null, Me = null, Ge = null;
      }
    };
  }
  const s = new t(), r = new e(), o = new n(), a = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
  let c = {}, h = {}, u = /* @__PURE__ */ new WeakMap(), d = [], f = null, g = !1, _ = null, p = null, m = null, y = null, v = null, M = null, P = null, w = new Tt(0, 0, 0), A = 0, L = !1, G = null, x = null, b = null, B = null, k = null;
  const H = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let K = !1, z = 0;
  const nt = i.getParameter(i.VERSION);
  nt.indexOf("WebGL") !== -1 ? (z = parseFloat(/^WebGL (\d)/.exec(nt)[1]), K = z >= 1) : nt.indexOf("OpenGL ES") !== -1 && (z = parseFloat(/^OpenGL ES (\d)/.exec(nt)[1]), K = z >= 2);
  let W = null, ut = {};
  const dt = i.getParameter(i.SCISSOR_BOX), Mt = i.getParameter(i.VIEWPORT), Yt = new Zt().fromArray(dt), ee = new Zt().fromArray(Mt);
  function $(I, lt, V, Y) {
    const ot = new Uint8Array(4), ct = i.createTexture();
    i.bindTexture(I, ct), i.texParameteri(I, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(I, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Xt = 0; Xt < V; Xt++)
      I === i.TEXTURE_3D || I === i.TEXTURE_2D_ARRAY ? i.texImage3D(lt, 0, i.RGBA, 1, 1, Y, 0, i.RGBA, i.UNSIGNED_BYTE, ot) : i.texImage2D(lt + Xt, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, ot);
    return ct;
  }
  const Q = {};
  Q[i.TEXTURE_2D] = $(i.TEXTURE_2D, i.TEXTURE_2D, 1), Q[i.TEXTURE_CUBE_MAP] = $(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), Q[i.TEXTURE_2D_ARRAY] = $(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), Q[i.TEXTURE_3D] = $(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), r.setClear(1), o.setClear(0), xt(i.DEPTH_TEST), r.setFunc(ts), Ht(!1), $t(hc), xt(i.CULL_FACE), C(Jn);
  function xt(I) {
    c[I] !== !0 && (i.enable(I), c[I] = !0);
  }
  function ft(I) {
    c[I] !== !1 && (i.disable(I), c[I] = !1);
  }
  function Nt(I, lt) {
    return h[I] !== lt ? (i.bindFramebuffer(I, lt), h[I] = lt, I === i.DRAW_FRAMEBUFFER && (h[i.FRAMEBUFFER] = lt), I === i.FRAMEBUFFER && (h[i.DRAW_FRAMEBUFFER] = lt), !0) : !1;
  }
  function wt(I, lt) {
    let V = d, Y = !1;
    if (I) {
      V = u.get(lt), V === void 0 && (V = [], u.set(lt, V));
      const ot = I.textures;
      if (V.length !== ot.length || V[0] !== i.COLOR_ATTACHMENT0) {
        for (let ct = 0, Xt = ot.length; ct < Xt; ct++)
          V[ct] = i.COLOR_ATTACHMENT0 + ct;
        V.length = ot.length, Y = !0;
      }
    } else
      V[0] !== i.BACK && (V[0] = i.BACK, Y = !0);
    Y && i.drawBuffers(V);
  }
  function Gt(I) {
    return f !== I ? (i.useProgram(I), f = I, !0) : !1;
  }
  const ae = {
    [pi]: i.FUNC_ADD,
    [Qd]: i.FUNC_SUBTRACT,
    [tf]: i.FUNC_REVERSE_SUBTRACT
  };
  ae[ef] = i.MIN, ae[nf] = i.MAX;
  const Wt = {
    [sf]: i.ZERO,
    [rf]: i.ONE,
    [of]: i.SRC_COLOR,
    [fa]: i.SRC_ALPHA,
    [df]: i.SRC_ALPHA_SATURATE,
    [hf]: i.DST_COLOR,
    [lf]: i.DST_ALPHA,
    [af]: i.ONE_MINUS_SRC_COLOR,
    [pa]: i.ONE_MINUS_SRC_ALPHA,
    [uf]: i.ONE_MINUS_DST_COLOR,
    [cf]: i.ONE_MINUS_DST_ALPHA,
    [ff]: i.CONSTANT_COLOR,
    [pf]: i.ONE_MINUS_CONSTANT_COLOR,
    [mf]: i.CONSTANT_ALPHA,
    [gf]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function C(I, lt, V, Y, ot, ct, Xt, Me, Ge, Kt) {
    if (I === Jn) {
      g === !0 && (ft(i.BLEND), g = !1);
      return;
    }
    if (g === !1 && (xt(i.BLEND), g = !0), I !== Jd) {
      if (I !== _ || Kt !== L) {
        if ((p !== pi || v !== pi) && (i.blendEquation(i.FUNC_ADD), p = pi, v = pi), Kt)
          switch (I) {
            case ji:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case uc:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case dc:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case fc:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", I);
              break;
          }
        else
          switch (I) {
            case ji:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case uc:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case dc:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case fc:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", I);
              break;
          }
        m = null, y = null, M = null, P = null, w.set(0, 0, 0), A = 0, _ = I, L = Kt;
      }
      return;
    }
    ot = ot || lt, ct = ct || V, Xt = Xt || Y, (lt !== p || ot !== v) && (i.blendEquationSeparate(ae[lt], ae[ot]), p = lt, v = ot), (V !== m || Y !== y || ct !== M || Xt !== P) && (i.blendFuncSeparate(Wt[V], Wt[Y], Wt[ct], Wt[Xt]), m = V, y = Y, M = ct, P = Xt), (Me.equals(w) === !1 || Ge !== A) && (i.blendColor(Me.r, Me.g, Me.b, Ge), w.copy(Me), A = Ge), _ = I, L = !1;
  }
  function qe(I, lt) {
    I.side === fn ? ft(i.CULL_FACE) : xt(i.CULL_FACE);
    let V = I.side === $e;
    lt && (V = !V), Ht(V), I.blending === ji && I.transparent === !1 ? C(Jn) : C(I.blending, I.blendEquation, I.blendSrc, I.blendDst, I.blendEquationAlpha, I.blendSrcAlpha, I.blendDstAlpha, I.blendColor, I.blendAlpha, I.premultipliedAlpha), r.setFunc(I.depthFunc), r.setTest(I.depthTest), r.setMask(I.depthWrite), s.setMask(I.colorWrite);
    const Y = I.stencilWrite;
    o.setTest(Y), Y && (o.setMask(I.stencilWriteMask), o.setFunc(I.stencilFunc, I.stencilRef, I.stencilFuncMask), o.setOp(I.stencilFail, I.stencilZFail, I.stencilZPass)), de(I.polygonOffset, I.polygonOffsetFactor, I.polygonOffsetUnits), I.alphaToCoverage === !0 ? xt(i.SAMPLE_ALPHA_TO_COVERAGE) : ft(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Ht(I) {
    G !== I && (I ? i.frontFace(i.CW) : i.frontFace(i.CCW), G = I);
  }
  function $t(I) {
    I !== Kd ? (xt(i.CULL_FACE), I !== x && (I === hc ? i.cullFace(i.BACK) : I === Zd ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : ft(i.CULL_FACE), x = I;
  }
  function Ct(I) {
    I !== b && (K && i.lineWidth(I), b = I);
  }
  function de(I, lt, V) {
    I ? (xt(i.POLYGON_OFFSET_FILL), (B !== lt || k !== V) && (i.polygonOffset(lt, V), B = lt, k = V)) : ft(i.POLYGON_OFFSET_FILL);
  }
  function It(I) {
    I ? xt(i.SCISSOR_TEST) : ft(i.SCISSOR_TEST);
  }
  function T(I) {
    I === void 0 && (I = i.TEXTURE0 + H - 1), W !== I && (i.activeTexture(I), W = I);
  }
  function S(I, lt, V) {
    V === void 0 && (W === null ? V = i.TEXTURE0 + H - 1 : V = W);
    let Y = ut[V];
    Y === void 0 && (Y = { type: void 0, texture: void 0 }, ut[V] = Y), (Y.type !== I || Y.texture !== lt) && (W !== V && (i.activeTexture(V), W = V), i.bindTexture(I, lt || Q[I]), Y.type = I, Y.texture = lt);
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
  function Vt(I, lt) {
    let V = l.get(lt);
    V === void 0 && (V = /* @__PURE__ */ new WeakMap(), l.set(lt, V));
    let Y = V.get(I);
    Y === void 0 && (Y = i.getUniformBlockIndex(lt, I.name), V.set(I, Y));
  }
  function Ut(I, lt) {
    const Y = l.get(lt).get(I);
    a.get(lt) !== Y && (i.uniformBlockBinding(lt, Y, I.__bindingPointIndex), a.set(lt, Y));
  }
  function he() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), c = {}, W = null, ut = {}, h = {}, u = /* @__PURE__ */ new WeakMap(), d = [], f = null, g = !1, _ = null, p = null, m = null, y = null, v = null, M = null, P = null, w = new Tt(0, 0, 0), A = 0, L = !1, G = null, x = null, b = null, B = null, k = null, Yt.set(0, 0, i.canvas.width, i.canvas.height), ee.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), r.reset(), o.reset();
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
    setFlipSided: Ht,
    setCullFace: $t,
    setLineWidth: Ct,
    setPolygonOffset: de,
    setScissorTest: It,
    activeTexture: T,
    bindTexture: S,
    unbindTexture: U,
    compressedTexImage2D: q,
    compressedTexImage3D: Z,
    texImage2D: mt,
    texImage3D: Pt,
    updateUBOMapping: Vt,
    uniformBlockBinding: Ut,
    texStorage2D: jt,
    texStorage3D: et,
    texSubImage2D: j,
    texSubImage3D: St,
    compressedTexSubImage2D: rt,
    compressedTexSubImage3D: pt,
    scissor: Lt,
    viewport: gt,
    reset: he
  };
}
function ah(i, t, e, n) {
  const s = nv(n);
  switch (e) {
    case Su:
      return i * t;
    case bu:
      return i * t;
    case Tu:
      return i * t * 2;
    case xl:
      return i * t / s.components * s.byteLength;
    case yl:
      return i * t / s.components * s.byteLength;
    case Au:
      return i * t * 2 / s.components * s.byteLength;
    case Ml:
      return i * t * 2 / s.components * s.byteLength;
    case Eu:
      return i * t * 3 / s.components * s.byteLength;
    case rn:
      return i * t * 4 / s.components * s.byteLength;
    case Sl:
      return i * t * 4 / s.components * s.byteLength;
    case Gr:
    case Wr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Xr:
    case $r:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Ta:
    case wa:
      return Math.max(i, 16) * Math.max(t, 8) / 4;
    case ba:
    case Aa:
      return Math.max(i, 8) * Math.max(t, 8) / 2;
    case Ra:
    case Ca:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Pa:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case La:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Ia:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case Da:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case Na:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case Ua:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case Oa:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case Fa:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case Ba:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case ka:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case za:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case Ha:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case Va:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case Ga:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case Wa:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case jr:
    case Xa:
    case $a:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    case wu:
    case ja:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case qa:
    case Ya:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${e} format.`
  );
}
function nv(i) {
  switch (i) {
    case Bn:
    case xu:
      return { byteLength: 1, components: 1 };
    case Ws:
    case yu:
    case tr:
      return { byteLength: 2, components: 1 };
    case _l:
    case vl:
      return { byteLength: 2, components: 4 };
    case vi:
    case gl:
    case mn:
      return { byteLength: 4, components: 1 };
    case Mu:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function iv(i, t, e, n, s, r, o) {
  const a = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, l = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), c = new tt(), h = /* @__PURE__ */ new WeakMap();
  let u;
  const d = /* @__PURE__ */ new WeakMap();
  let f = !1;
  try {
    f = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(T, S) {
    return f ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(T, S)
    ) : js("canvas");
  }
  function _(T, S, U) {
    let q = 1;
    const Z = It(T);
    if ((Z.width > U || Z.height > U) && (q = U / Math.max(Z.width, Z.height)), q < 1)
      if (typeof HTMLImageElement < "u" && T instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && T instanceof ImageBitmap || typeof VideoFrame < "u" && T instanceof VideoFrame) {
        const j = Math.floor(q * Z.width), St = Math.floor(q * Z.height);
        u === void 0 && (u = g(j, St));
        const rt = S ? g(j, St) : u;
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
  function y(T, S, U, q, Z = !1) {
    if (T !== null) {
      if (i[T] !== void 0) return i[T];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + T + "'");
    }
    let j = S;
    if (S === i.RED && (U === i.FLOAT && (j = i.R32F), U === i.HALF_FLOAT && (j = i.R16F), U === i.UNSIGNED_BYTE && (j = i.R8)), S === i.RED_INTEGER && (U === i.UNSIGNED_BYTE && (j = i.R8UI), U === i.UNSIGNED_SHORT && (j = i.R16UI), U === i.UNSIGNED_INT && (j = i.R32UI), U === i.BYTE && (j = i.R8I), U === i.SHORT && (j = i.R16I), U === i.INT && (j = i.R32I)), S === i.RG && (U === i.FLOAT && (j = i.RG32F), U === i.HALF_FLOAT && (j = i.RG16F), U === i.UNSIGNED_BYTE && (j = i.RG8)), S === i.RG_INTEGER && (U === i.UNSIGNED_BYTE && (j = i.RG8UI), U === i.UNSIGNED_SHORT && (j = i.RG16UI), U === i.UNSIGNED_INT && (j = i.RG32UI), U === i.BYTE && (j = i.RG8I), U === i.SHORT && (j = i.RG16I), U === i.INT && (j = i.RG32I)), S === i.RGB_INTEGER && (U === i.UNSIGNED_BYTE && (j = i.RGB8UI), U === i.UNSIGNED_SHORT && (j = i.RGB16UI), U === i.UNSIGNED_INT && (j = i.RGB32UI), U === i.BYTE && (j = i.RGB8I), U === i.SHORT && (j = i.RGB16I), U === i.INT && (j = i.RGB32I)), S === i.RGBA_INTEGER && (U === i.UNSIGNED_BYTE && (j = i.RGBA8UI), U === i.UNSIGNED_SHORT && (j = i.RGBA16UI), U === i.UNSIGNED_INT && (j = i.RGBA32UI), U === i.BYTE && (j = i.RGBA8I), U === i.SHORT && (j = i.RGBA16I), U === i.INT && (j = i.RGBA32I)), S === i.RGB && U === i.UNSIGNED_INT_5_9_9_9_REV && (j = i.RGB9_E5), S === i.RGBA) {
      const St = Z ? Qr : qt.getTransfer(q);
      U === i.FLOAT && (j = i.RGBA32F), U === i.HALF_FLOAT && (j = i.RGBA16F), U === i.UNSIGNED_BYTE && (j = St === pe ? i.SRGB8_ALPHA8 : i.RGBA8), U === i.UNSIGNED_SHORT_4_4_4_4 && (j = i.RGBA4), U === i.UNSIGNED_SHORT_5_5_5_1 && (j = i.RGB5_A1);
    }
    return (j === i.R16F || j === i.R32F || j === i.RG16F || j === i.RG32F || j === i.RGBA16F || j === i.RGBA32F) && t.get("EXT_color_buffer_float"), j;
  }
  function v(T, S) {
    let U;
    return T ? S === null || S === vi || S === ss ? U = i.DEPTH24_STENCIL8 : S === mn ? U = i.DEPTH32F_STENCIL8 : S === Ws && (U = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : S === null || S === vi || S === ss ? U = i.DEPTH_COMPONENT24 : S === mn ? U = i.DEPTH_COMPONENT32F : S === Ws && (U = i.DEPTH_COMPONENT16), U;
  }
  function M(T, S) {
    return p(T) === !0 || T.isFramebufferTexture && T.minFilter !== Ve && T.minFilter !== Qe ? Math.log2(Math.max(S.width, S.height)) + 1 : T.mipmaps !== void 0 && T.mipmaps.length > 0 ? T.mipmaps.length : T.isCompressedTexture && Array.isArray(T.image) ? S.mipmaps.length : 1;
  }
  function P(T) {
    const S = T.target;
    S.removeEventListener("dispose", P), A(S), S.isVideoTexture && h.delete(S);
  }
  function w(T) {
    const S = T.target;
    S.removeEventListener("dispose", w), G(S);
  }
  function A(T) {
    const S = n.get(T);
    if (S.__webglInit === void 0) return;
    const U = T.source, q = d.get(U);
    if (q) {
      const Z = q[S.__cacheKey];
      Z.usedTimes--, Z.usedTimes === 0 && L(T), Object.keys(q).length === 0 && d.delete(U);
    }
    n.remove(T);
  }
  function L(T) {
    const S = n.get(T);
    i.deleteTexture(S.__webglTexture);
    const U = T.source, q = d.get(U);
    delete q[S.__cacheKey], o.memory.textures--;
  }
  function G(T) {
    const S = n.get(T);
    if (T.depthTexture && T.depthTexture.dispose(), T.isWebGLCubeRenderTarget)
      for (let q = 0; q < 6; q++) {
        if (Array.isArray(S.__webglFramebuffer[q]))
          for (let Z = 0; Z < S.__webglFramebuffer[q].length; Z++) i.deleteFramebuffer(S.__webglFramebuffer[q][Z]);
        else
          i.deleteFramebuffer(S.__webglFramebuffer[q]);
        S.__webglDepthbuffer && i.deleteRenderbuffer(S.__webglDepthbuffer[q]);
      }
    else {
      if (Array.isArray(S.__webglFramebuffer))
        for (let q = 0; q < S.__webglFramebuffer.length; q++) i.deleteFramebuffer(S.__webglFramebuffer[q]);
      else
        i.deleteFramebuffer(S.__webglFramebuffer);
      if (S.__webglDepthbuffer && i.deleteRenderbuffer(S.__webglDepthbuffer), S.__webglMultisampledFramebuffer && i.deleteFramebuffer(S.__webglMultisampledFramebuffer), S.__webglColorRenderbuffer)
        for (let q = 0; q < S.__webglColorRenderbuffer.length; q++)
          S.__webglColorRenderbuffer[q] && i.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);
      S.__webglDepthRenderbuffer && i.deleteRenderbuffer(S.__webglDepthRenderbuffer);
    }
    const U = T.textures;
    for (let q = 0, Z = U.length; q < Z; q++) {
      const j = n.get(U[q]);
      j.__webglTexture && (i.deleteTexture(j.__webglTexture), o.memory.textures--), n.remove(U[q]);
    }
    n.remove(T);
  }
  let x = 0;
  function b() {
    x = 0;
  }
  function B() {
    const T = x;
    return T >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + T + " texture units while this GPU supports only " + s.maxTextures), x += 1, T;
  }
  function k(T) {
    const S = [];
    return S.push(T.wrapS), S.push(T.wrapT), S.push(T.wrapR || 0), S.push(T.magFilter), S.push(T.minFilter), S.push(T.anisotropy), S.push(T.internalFormat), S.push(T.format), S.push(T.type), S.push(T.generateMipmaps), S.push(T.premultiplyAlpha), S.push(T.flipY), S.push(T.unpackAlignment), S.push(T.colorSpace), S.join();
  }
  function H(T, S) {
    const U = n.get(T);
    if (T.isVideoTexture && Ct(T), T.isRenderTargetTexture === !1 && T.version > 0 && U.__version !== T.version) {
      const q = T.image;
      if (q === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (q.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        ee(U, T, S);
        return;
      }
    }
    e.bindTexture(i.TEXTURE_2D, U.__webglTexture, i.TEXTURE0 + S);
  }
  function K(T, S) {
    const U = n.get(T);
    if (T.version > 0 && U.__version !== T.version) {
      ee(U, T, S);
      return;
    }
    e.bindTexture(i.TEXTURE_2D_ARRAY, U.__webglTexture, i.TEXTURE0 + S);
  }
  function z(T, S) {
    const U = n.get(T);
    if (T.version > 0 && U.__version !== T.version) {
      ee(U, T, S);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, U.__webglTexture, i.TEXTURE0 + S);
  }
  function nt(T, S) {
    const U = n.get(T);
    if (T.version > 0 && U.__version !== T.version) {
      $(U, T, S);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, U.__webglTexture, i.TEXTURE0 + S);
  }
  const W = {
    [is]: i.REPEAT,
    [Kn]: i.CLAMP_TO_EDGE,
    [Jr]: i.MIRRORED_REPEAT
  }, ut = {
    [Ve]: i.NEAREST,
    [vu]: i.NEAREST_MIPMAP_NEAREST,
    [Is]: i.NEAREST_MIPMAP_LINEAR,
    [Qe]: i.LINEAR,
    [Vr]: i.LINEAR_MIPMAP_NEAREST,
    [Un]: i.LINEAR_MIPMAP_LINEAR
  }, dt = {
    [If]: i.NEVER,
    [Bf]: i.ALWAYS,
    [Df]: i.LESS,
    [Pu]: i.LEQUAL,
    [Nf]: i.EQUAL,
    [Ff]: i.GEQUAL,
    [Uf]: i.GREATER,
    [Of]: i.NOTEQUAL
  };
  function Mt(T, S) {
    if (S.type === mn && t.has("OES_texture_float_linear") === !1 && (S.magFilter === Qe || S.magFilter === Vr || S.magFilter === Is || S.magFilter === Un || S.minFilter === Qe || S.minFilter === Vr || S.minFilter === Is || S.minFilter === Un) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(T, i.TEXTURE_WRAP_S, W[S.wrapS]), i.texParameteri(T, i.TEXTURE_WRAP_T, W[S.wrapT]), (T === i.TEXTURE_3D || T === i.TEXTURE_2D_ARRAY) && i.texParameteri(T, i.TEXTURE_WRAP_R, W[S.wrapR]), i.texParameteri(T, i.TEXTURE_MAG_FILTER, ut[S.magFilter]), i.texParameteri(T, i.TEXTURE_MIN_FILTER, ut[S.minFilter]), S.compareFunction && (i.texParameteri(T, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(T, i.TEXTURE_COMPARE_FUNC, dt[S.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (S.magFilter === Ve || S.minFilter !== Is && S.minFilter !== Un || S.type === mn && t.has("OES_texture_float_linear") === !1) return;
      if (S.anisotropy > 1 || n.get(S).__currentAnisotropy) {
        const U = t.get("EXT_texture_filter_anisotropic");
        i.texParameterf(T, U.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(S.anisotropy, s.getMaxAnisotropy())), n.get(S).__currentAnisotropy = S.anisotropy;
      }
    }
  }
  function Yt(T, S) {
    let U = !1;
    T.__webglInit === void 0 && (T.__webglInit = !0, S.addEventListener("dispose", P));
    const q = S.source;
    let Z = d.get(q);
    Z === void 0 && (Z = {}, d.set(q, Z));
    const j = k(S);
    if (j !== T.__cacheKey) {
      Z[j] === void 0 && (Z[j] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, U = !0), Z[j].usedTimes++;
      const St = Z[T.__cacheKey];
      St !== void 0 && (Z[T.__cacheKey].usedTimes--, St.usedTimes === 0 && L(S)), T.__cacheKey = j, T.__webglTexture = Z[j].texture;
    }
    return U;
  }
  function ee(T, S, U) {
    let q = i.TEXTURE_2D;
    (S.isDataArrayTexture || S.isCompressedArrayTexture) && (q = i.TEXTURE_2D_ARRAY), S.isData3DTexture && (q = i.TEXTURE_3D);
    const Z = Yt(T, S), j = S.source;
    e.bindTexture(q, T.__webglTexture, i.TEXTURE0 + U);
    const St = n.get(j);
    if (j.version !== St.__version || Z === !0) {
      e.activeTexture(i.TEXTURE0 + U);
      const rt = qt.getPrimaries(qt.workingColorSpace), pt = S.colorSpace === Yn ? null : qt.getPrimaries(S.colorSpace), jt = S.colorSpace === Yn || rt === pt ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, S.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, S.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, S.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, jt);
      let et = _(S.image, !1, s.maxTextureSize);
      et = de(S, et);
      const mt = r.convert(S.format, S.colorSpace), Pt = r.convert(S.type);
      let Lt = y(S.internalFormat, mt, Pt, S.colorSpace, S.isVideoTexture);
      Mt(q, S);
      let gt;
      const Vt = S.mipmaps, Ut = S.isVideoTexture !== !0, he = St.__version === void 0 || Z === !0, I = j.dataReady, lt = M(S, et);
      if (S.isDepthTexture)
        Lt = v(S.format === rs, S.type), he && (Ut ? e.texStorage2D(i.TEXTURE_2D, 1, Lt, et.width, et.height) : e.texImage2D(i.TEXTURE_2D, 0, Lt, et.width, et.height, 0, mt, Pt, null));
      else if (S.isDataTexture)
        if (Vt.length > 0) {
          Ut && he && e.texStorage2D(i.TEXTURE_2D, lt, Lt, Vt[0].width, Vt[0].height);
          for (let V = 0, Y = Vt.length; V < Y; V++)
            gt = Vt[V], Ut ? I && e.texSubImage2D(i.TEXTURE_2D, V, 0, 0, gt.width, gt.height, mt, Pt, gt.data) : e.texImage2D(i.TEXTURE_2D, V, Lt, gt.width, gt.height, 0, mt, Pt, gt.data);
          S.generateMipmaps = !1;
        } else
          Ut ? (he && e.texStorage2D(i.TEXTURE_2D, lt, Lt, et.width, et.height), I && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, et.width, et.height, mt, Pt, et.data)) : e.texImage2D(i.TEXTURE_2D, 0, Lt, et.width, et.height, 0, mt, Pt, et.data);
      else if (S.isCompressedTexture)
        if (S.isCompressedArrayTexture) {
          Ut && he && e.texStorage3D(i.TEXTURE_2D_ARRAY, lt, Lt, Vt[0].width, Vt[0].height, et.depth);
          for (let V = 0, Y = Vt.length; V < Y; V++)
            if (gt = Vt[V], S.format !== rn)
              if (mt !== null)
                if (Ut) {
                  if (I)
                    if (S.layerUpdates.size > 0) {
                      const ot = ah(gt.width, gt.height, S.format, S.type);
                      for (const ct of S.layerUpdates) {
                        const Xt = gt.data.subarray(
                          ct * ot / gt.data.BYTES_PER_ELEMENT,
                          (ct + 1) * ot / gt.data.BYTES_PER_ELEMENT
                        );
                        e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, ct, gt.width, gt.height, 1, mt, Xt, 0, 0);
                      }
                      S.clearLayerUpdates();
                    } else
                      e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, gt.width, gt.height, et.depth, mt, gt.data, 0, 0);
                } else
                  e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, V, Lt, gt.width, gt.height, et.depth, 0, gt.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Ut ? I && e.texSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, gt.width, gt.height, et.depth, mt, Pt, gt.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, V, Lt, gt.width, gt.height, et.depth, 0, mt, Pt, gt.data);
        } else {
          Ut && he && e.texStorage2D(i.TEXTURE_2D, lt, Lt, Vt[0].width, Vt[0].height);
          for (let V = 0, Y = Vt.length; V < Y; V++)
            gt = Vt[V], S.format !== rn ? mt !== null ? Ut ? I && e.compressedTexSubImage2D(i.TEXTURE_2D, V, 0, 0, gt.width, gt.height, mt, gt.data) : e.compressedTexImage2D(i.TEXTURE_2D, V, Lt, gt.width, gt.height, 0, gt.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ut ? I && e.texSubImage2D(i.TEXTURE_2D, V, 0, 0, gt.width, gt.height, mt, Pt, gt.data) : e.texImage2D(i.TEXTURE_2D, V, Lt, gt.width, gt.height, 0, mt, Pt, gt.data);
        }
      else if (S.isDataArrayTexture)
        if (Ut) {
          if (he && e.texStorage3D(i.TEXTURE_2D_ARRAY, lt, Lt, et.width, et.height, et.depth), I)
            if (S.layerUpdates.size > 0) {
              const V = ah(et.width, et.height, S.format, S.type);
              for (const Y of S.layerUpdates) {
                const ot = et.data.subarray(
                  Y * V / et.data.BYTES_PER_ELEMENT,
                  (Y + 1) * V / et.data.BYTES_PER_ELEMENT
                );
                e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, Y, et.width, et.height, 1, mt, Pt, ot);
              }
              S.clearLayerUpdates();
            } else
              e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, et.width, et.height, et.depth, mt, Pt, et.data);
        } else
          e.texImage3D(i.TEXTURE_2D_ARRAY, 0, Lt, et.width, et.height, et.depth, 0, mt, Pt, et.data);
      else if (S.isData3DTexture)
        Ut ? (he && e.texStorage3D(i.TEXTURE_3D, lt, Lt, et.width, et.height, et.depth), I && e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, et.width, et.height, et.depth, mt, Pt, et.data)) : e.texImage3D(i.TEXTURE_3D, 0, Lt, et.width, et.height, et.depth, 0, mt, Pt, et.data);
      else if (S.isFramebufferTexture) {
        if (he)
          if (Ut)
            e.texStorage2D(i.TEXTURE_2D, lt, Lt, et.width, et.height);
          else {
            let V = et.width, Y = et.height;
            for (let ot = 0; ot < lt; ot++)
              e.texImage2D(i.TEXTURE_2D, ot, Lt, V, Y, 0, mt, Pt, null), V >>= 1, Y >>= 1;
          }
      } else if (Vt.length > 0) {
        if (Ut && he) {
          const V = It(Vt[0]);
          e.texStorage2D(i.TEXTURE_2D, lt, Lt, V.width, V.height);
        }
        for (let V = 0, Y = Vt.length; V < Y; V++)
          gt = Vt[V], Ut ? I && e.texSubImage2D(i.TEXTURE_2D, V, 0, 0, mt, Pt, gt) : e.texImage2D(i.TEXTURE_2D, V, Lt, mt, Pt, gt);
        S.generateMipmaps = !1;
      } else if (Ut) {
        if (he) {
          const V = It(et);
          e.texStorage2D(i.TEXTURE_2D, lt, Lt, V.width, V.height);
        }
        I && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, mt, Pt, et);
      } else
        e.texImage2D(i.TEXTURE_2D, 0, Lt, mt, Pt, et);
      p(S) && m(q), St.__version = j.version, S.onUpdate && S.onUpdate(S);
    }
    T.__version = S.version;
  }
  function $(T, S, U) {
    if (S.image.length !== 6) return;
    const q = Yt(T, S), Z = S.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, T.__webglTexture, i.TEXTURE0 + U);
    const j = n.get(Z);
    if (Z.version !== j.__version || q === !0) {
      e.activeTexture(i.TEXTURE0 + U);
      const St = qt.getPrimaries(qt.workingColorSpace), rt = S.colorSpace === Yn ? null : qt.getPrimaries(S.colorSpace), pt = S.colorSpace === Yn || St === rt ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, S.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, S.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, S.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, pt);
      const jt = S.isCompressedTexture || S.image[0].isCompressedTexture, et = S.image[0] && S.image[0].isDataTexture, mt = [];
      for (let Y = 0; Y < 6; Y++)
        !jt && !et ? mt[Y] = _(S.image[Y], !0, s.maxCubemapSize) : mt[Y] = et ? S.image[Y].image : S.image[Y], mt[Y] = de(S, mt[Y]);
      const Pt = mt[0], Lt = r.convert(S.format, S.colorSpace), gt = r.convert(S.type), Vt = y(S.internalFormat, Lt, gt, S.colorSpace), Ut = S.isVideoTexture !== !0, he = j.__version === void 0 || q === !0, I = Z.dataReady;
      let lt = M(S, Pt);
      Mt(i.TEXTURE_CUBE_MAP, S);
      let V;
      if (jt) {
        Ut && he && e.texStorage2D(i.TEXTURE_CUBE_MAP, lt, Vt, Pt.width, Pt.height);
        for (let Y = 0; Y < 6; Y++) {
          V = mt[Y].mipmaps;
          for (let ot = 0; ot < V.length; ot++) {
            const ct = V[ot];
            S.format !== rn ? Lt !== null ? Ut ? I && e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot, 0, 0, ct.width, ct.height, Lt, ct.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot, Vt, ct.width, ct.height, 0, ct.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Ut ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot, 0, 0, ct.width, ct.height, Lt, gt, ct.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot, Vt, ct.width, ct.height, 0, Lt, gt, ct.data);
          }
        }
      } else {
        if (V = S.mipmaps, Ut && he) {
          V.length > 0 && lt++;
          const Y = It(mt[0]);
          e.texStorage2D(i.TEXTURE_CUBE_MAP, lt, Vt, Y.width, Y.height);
        }
        for (let Y = 0; Y < 6; Y++)
          if (et) {
            Ut ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, 0, 0, mt[Y].width, mt[Y].height, Lt, gt, mt[Y].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, Vt, mt[Y].width, mt[Y].height, 0, Lt, gt, mt[Y].data);
            for (let ot = 0; ot < V.length; ot++) {
              const Xt = V[ot].image[Y].image;
              Ut ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot + 1, 0, 0, Xt.width, Xt.height, Lt, gt, Xt.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot + 1, Vt, Xt.width, Xt.height, 0, Lt, gt, Xt.data);
            }
          } else {
            Ut ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, 0, 0, Lt, gt, mt[Y]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0, Vt, Lt, gt, mt[Y]);
            for (let ot = 0; ot < V.length; ot++) {
              const ct = V[ot];
              Ut ? I && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot + 1, 0, 0, Lt, gt, ct.image[Y]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, ot + 1, Vt, Lt, gt, ct.image[Y]);
            }
          }
      }
      p(S) && m(i.TEXTURE_CUBE_MAP), j.__version = Z.version, S.onUpdate && S.onUpdate(S);
    }
    T.__version = S.version;
  }
  function Q(T, S, U, q, Z, j) {
    const St = r.convert(U.format, U.colorSpace), rt = r.convert(U.type), pt = y(U.internalFormat, St, rt, U.colorSpace);
    if (!n.get(S).__hasExternalTextures) {
      const et = Math.max(1, S.width >> j), mt = Math.max(1, S.height >> j);
      Z === i.TEXTURE_3D || Z === i.TEXTURE_2D_ARRAY ? e.texImage3D(Z, j, pt, et, mt, S.depth, 0, St, rt, null) : e.texImage2D(Z, j, pt, et, mt, 0, St, rt, null);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, T), $t(S) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, q, Z, n.get(U).__webglTexture, 0, Ht(S)) : (Z === i.TEXTURE_2D || Z >= i.TEXTURE_CUBE_MAP_POSITIVE_X && Z <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, q, Z, n.get(U).__webglTexture, j), e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function xt(T, S, U) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, T), S.depthBuffer) {
      const q = S.depthTexture, Z = q && q.isDepthTexture ? q.type : null, j = v(S.stencilBuffer, Z), St = S.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, rt = Ht(S);
      $t(S) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, rt, j, S.width, S.height) : U ? i.renderbufferStorageMultisample(i.RENDERBUFFER, rt, j, S.width, S.height) : i.renderbufferStorage(i.RENDERBUFFER, j, S.width, S.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, St, i.RENDERBUFFER, T);
    } else {
      const q = S.textures;
      for (let Z = 0; Z < q.length; Z++) {
        const j = q[Z], St = r.convert(j.format, j.colorSpace), rt = r.convert(j.type), pt = y(j.internalFormat, St, rt, j.colorSpace), jt = Ht(S);
        U && $t(S) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, jt, pt, S.width, S.height) : $t(S) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, jt, pt, S.width, S.height) : i.renderbufferStorage(i.RENDERBUFFER, pt, S.width, S.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function ft(T, S) {
    if (S && S.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (e.bindFramebuffer(i.FRAMEBUFFER, T), !(S.depthTexture && S.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!n.get(S.depthTexture).__webglTexture || S.depthTexture.image.width !== S.width || S.depthTexture.image.height !== S.height) && (S.depthTexture.image.width = S.width, S.depthTexture.image.height = S.height, S.depthTexture.needsUpdate = !0), H(S.depthTexture, 0);
    const q = n.get(S.depthTexture).__webglTexture, Z = Ht(S);
    if (S.depthTexture.format === qi)
      $t(S) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, q, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, q, 0);
    else if (S.depthTexture.format === rs)
      $t(S) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, q, 0, Z) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, q, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Nt(T) {
    const S = n.get(T), U = T.isWebGLCubeRenderTarget === !0;
    if (S.__boundDepthTexture !== T.depthTexture) {
      const q = T.depthTexture;
      if (S.__depthDisposeCallback && S.__depthDisposeCallback(), q) {
        const Z = () => {
          delete S.__boundDepthTexture, delete S.__depthDisposeCallback, q.removeEventListener("dispose", Z);
        };
        q.addEventListener("dispose", Z), S.__depthDisposeCallback = Z;
      }
      S.__boundDepthTexture = q;
    }
    if (T.depthTexture && !S.__autoAllocateDepthBuffer) {
      if (U) throw new Error("target.depthTexture not supported in Cube render targets");
      ft(S.__webglFramebuffer, T);
    } else if (U) {
      S.__webglDepthbuffer = [];
      for (let q = 0; q < 6; q++)
        if (e.bindFramebuffer(i.FRAMEBUFFER, S.__webglFramebuffer[q]), S.__webglDepthbuffer[q] === void 0)
          S.__webglDepthbuffer[q] = i.createRenderbuffer(), xt(S.__webglDepthbuffer[q], T, !1);
        else {
          const Z = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, j = S.__webglDepthbuffer[q];
          i.bindRenderbuffer(i.RENDERBUFFER, j), i.framebufferRenderbuffer(i.FRAMEBUFFER, Z, i.RENDERBUFFER, j);
        }
    } else if (e.bindFramebuffer(i.FRAMEBUFFER, S.__webglFramebuffer), S.__webglDepthbuffer === void 0)
      S.__webglDepthbuffer = i.createRenderbuffer(), xt(S.__webglDepthbuffer, T, !1);
    else {
      const q = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, Z = S.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, Z), i.framebufferRenderbuffer(i.FRAMEBUFFER, q, i.RENDERBUFFER, Z);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function wt(T, S, U) {
    const q = n.get(T);
    S !== void 0 && Q(q.__webglFramebuffer, T, T.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), U !== void 0 && Nt(T);
  }
  function Gt(T) {
    const S = T.texture, U = n.get(T), q = n.get(S);
    T.addEventListener("dispose", w);
    const Z = T.textures, j = T.isWebGLCubeRenderTarget === !0, St = Z.length > 1;
    if (St || (q.__webglTexture === void 0 && (q.__webglTexture = i.createTexture()), q.__version = S.version, o.memory.textures++), j) {
      U.__webglFramebuffer = [];
      for (let rt = 0; rt < 6; rt++)
        if (S.mipmaps && S.mipmaps.length > 0) {
          U.__webglFramebuffer[rt] = [];
          for (let pt = 0; pt < S.mipmaps.length; pt++)
            U.__webglFramebuffer[rt][pt] = i.createFramebuffer();
        } else
          U.__webglFramebuffer[rt] = i.createFramebuffer();
    } else {
      if (S.mipmaps && S.mipmaps.length > 0) {
        U.__webglFramebuffer = [];
        for (let rt = 0; rt < S.mipmaps.length; rt++)
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
          const jt = r.convert(pt.format, pt.colorSpace), et = r.convert(pt.type), mt = y(pt.internalFormat, jt, et, pt.colorSpace, T.isXRRenderTarget === !0), Pt = Ht(T);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Pt, mt, T.width, T.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + rt, i.RENDERBUFFER, U.__webglColorRenderbuffer[rt]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), T.depthBuffer && (U.__webglDepthRenderbuffer = i.createRenderbuffer(), xt(U.__webglDepthRenderbuffer, T, !0)), e.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (j) {
      e.bindTexture(i.TEXTURE_CUBE_MAP, q.__webglTexture), Mt(i.TEXTURE_CUBE_MAP, S);
      for (let rt = 0; rt < 6; rt++)
        if (S.mipmaps && S.mipmaps.length > 0)
          for (let pt = 0; pt < S.mipmaps.length; pt++)
            Q(U.__webglFramebuffer[rt][pt], T, S, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, pt);
        else
          Q(U.__webglFramebuffer[rt], T, S, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + rt, 0);
      p(S) && m(i.TEXTURE_CUBE_MAP), e.unbindTexture();
    } else if (St) {
      for (let rt = 0, pt = Z.length; rt < pt; rt++) {
        const jt = Z[rt], et = n.get(jt);
        e.bindTexture(i.TEXTURE_2D, et.__webglTexture), Mt(i.TEXTURE_2D, jt), Q(U.__webglFramebuffer, T, jt, i.COLOR_ATTACHMENT0 + rt, i.TEXTURE_2D, 0), p(jt) && m(i.TEXTURE_2D);
      }
      e.unbindTexture();
    } else {
      let rt = i.TEXTURE_2D;
      if ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (rt = T.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(rt, q.__webglTexture), Mt(rt, S), S.mipmaps && S.mipmaps.length > 0)
        for (let pt = 0; pt < S.mipmaps.length; pt++)
          Q(U.__webglFramebuffer[pt], T, S, i.COLOR_ATTACHMENT0, rt, pt);
      else
        Q(U.__webglFramebuffer, T, S, i.COLOR_ATTACHMENT0, rt, 0);
      p(S) && m(rt), e.unbindTexture();
    }
    T.depthBuffer && Nt(T);
  }
  function ae(T) {
    const S = T.textures;
    for (let U = 0, q = S.length; U < q; U++) {
      const Z = S[U];
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
        const S = T.textures, U = T.width, q = T.height;
        let Z = i.COLOR_BUFFER_BIT;
        const j = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, St = n.get(T), rt = S.length > 1;
        if (rt)
          for (let pt = 0; pt < S.length; pt++)
            e.bindFramebuffer(i.FRAMEBUFFER, St.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + pt, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, St.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + pt, i.TEXTURE_2D, null, 0);
        e.bindFramebuffer(i.READ_FRAMEBUFFER, St.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, St.__webglFramebuffer);
        for (let pt = 0; pt < S.length; pt++) {
          if (T.resolveDepthBuffer && (T.depthBuffer && (Z |= i.DEPTH_BUFFER_BIT), T.stencilBuffer && T.resolveStencilBuffer && (Z |= i.STENCIL_BUFFER_BIT)), rt) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, St.__webglColorRenderbuffer[pt]);
            const jt = n.get(S[pt]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, jt, 0);
          }
          i.blitFramebuffer(0, 0, U, q, 0, 0, U, q, Z, i.NEAREST), l === !0 && (Wt.length = 0, C.length = 0, Wt.push(i.COLOR_ATTACHMENT0 + pt), T.depthBuffer && T.resolveDepthBuffer === !1 && (Wt.push(j), C.push(j), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, C)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, Wt));
        }
        if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), rt)
          for (let pt = 0; pt < S.length; pt++) {
            e.bindFramebuffer(i.FRAMEBUFFER, St.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + pt, i.RENDERBUFFER, St.__webglColorRenderbuffer[pt]);
            const jt = n.get(S[pt]).__webglTexture;
            e.bindFramebuffer(i.FRAMEBUFFER, St.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + pt, i.TEXTURE_2D, jt, 0);
          }
        e.bindFramebuffer(i.DRAW_FRAMEBUFFER, St.__webglMultisampledFramebuffer);
      } else if (T.depthBuffer && T.resolveDepthBuffer === !1 && l) {
        const S = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [S]);
      }
    }
  }
  function Ht(T) {
    return Math.min(s.maxSamples, T.samples);
  }
  function $t(T) {
    const S = n.get(T);
    return T.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && S.__useRenderToTexture !== !1;
  }
  function Ct(T) {
    const S = o.render.frame;
    h.get(T) !== S && (h.set(T, S), T.update());
  }
  function de(T, S) {
    const U = T.colorSpace, q = T.format, Z = T.type;
    return T.isCompressedTexture === !0 || T.isVideoTexture === !0 || U !== Ne && U !== Yn && (qt.getTransfer(U) === pe ? (q !== rn || Z !== Bn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", U)), S;
  }
  function It(T) {
    return typeof HTMLImageElement < "u" && T instanceof HTMLImageElement ? (c.width = T.naturalWidth || T.width, c.height = T.naturalHeight || T.height) : typeof VideoFrame < "u" && T instanceof VideoFrame ? (c.width = T.displayWidth, c.height = T.displayHeight) : (c.width = T.width, c.height = T.height), c;
  }
  this.allocateTextureUnit = B, this.resetTextureUnits = b, this.setTexture2D = H, this.setTexture2DArray = K, this.setTexture3D = z, this.setTextureCube = nt, this.rebindTextures = wt, this.setupRenderTarget = Gt, this.updateRenderTargetMipmap = ae, this.updateMultisampleRenderTarget = qe, this.setupDepthRenderbuffer = Nt, this.setupFrameBufferTexture = Q, this.useMultisampledRTT = $t;
}
function sv(i, t) {
  function e(n, s = Yn) {
    let r;
    const o = qt.getTransfer(s);
    if (n === Bn) return i.UNSIGNED_BYTE;
    if (n === _l) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === vl) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === Mu) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === xu) return i.BYTE;
    if (n === yu) return i.SHORT;
    if (n === Ws) return i.UNSIGNED_SHORT;
    if (n === gl) return i.INT;
    if (n === vi) return i.UNSIGNED_INT;
    if (n === mn) return i.FLOAT;
    if (n === tr) return i.HALF_FLOAT;
    if (n === Su) return i.ALPHA;
    if (n === Eu) return i.RGB;
    if (n === rn) return i.RGBA;
    if (n === bu) return i.LUMINANCE;
    if (n === Tu) return i.LUMINANCE_ALPHA;
    if (n === qi) return i.DEPTH_COMPONENT;
    if (n === rs) return i.DEPTH_STENCIL;
    if (n === xl) return i.RED;
    if (n === yl) return i.RED_INTEGER;
    if (n === Au) return i.RG;
    if (n === Ml) return i.RG_INTEGER;
    if (n === Sl) return i.RGBA_INTEGER;
    if (n === Gr || n === Wr || n === Xr || n === $r)
      if (o === pe)
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
    if (n === ba || n === Ta || n === Aa || n === wa)
      if (r = t.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
        if (n === ba) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === Ta) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === Aa) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === wa) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === Ra || n === Ca || n === Pa)
      if (r = t.get("WEBGL_compressed_texture_etc"), r !== null) {
        if (n === Ra || n === Ca) return o === pe ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (n === Pa) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === La || n === Ia || n === Da || n === Na || n === Ua || n === Oa || n === Fa || n === Ba || n === ka || n === za || n === Ha || n === Va || n === Ga || n === Wa)
      if (r = t.get("WEBGL_compressed_texture_astc"), r !== null) {
        if (n === La) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === Ia) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === Da) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === Na) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === Ua) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === Oa) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === Fa) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === Ba) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === ka) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === za) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === Ha) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === Va) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === Ga) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === Wa) return o === pe ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === jr || n === Xa || n === $a)
      if (r = t.get("EXT_texture_compression_bptc"), r !== null) {
        if (n === jr) return o === pe ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === Xa) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === $a) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === wu || n === ja || n === qa || n === Ya)
      if (r = t.get("EXT_texture_compression_rgtc"), r !== null) {
        if (n === jr) return r.COMPRESSED_RED_RGTC1_EXT;
        if (n === ja) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === qa) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === Ya) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === ss ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: e };
}
class rv extends Be {
  constructor(t = []) {
    super(), this.isArrayCamera = !0, this.cameras = t;
  }
}
class _t extends me {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const ov = { type: "move" };
class Ko {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new _t(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new _t(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new R(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new R()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new _t(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new R(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new R()), this._grip;
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
    const a = this._targetRay, l = this._grip, c = this._hand;
    if (t && e.session.visibilityState !== "visible-blurred") {
      if (c && t.hand) {
        o = !0;
        for (const _ of t.hand.values()) {
          const p = e.getJointPose(_, n), m = this._getHandJoint(c, _);
          p !== null && (m.matrix.fromArray(p.transform.matrix), m.matrix.decompose(m.position, m.rotation, m.scale), m.matrixWorldNeedsUpdate = !0, m.jointRadius = p.radius), m.visible = p !== null;
        }
        const h = c.joints["index-finger-tip"], u = c.joints["thumb-tip"], d = h.position.distanceTo(u.position), f = 0.02, g = 5e-3;
        c.inputState.pinching && d > f + g ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: t.handedness,
          target: this
        })) : !c.inputState.pinching && d <= f - g && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: t.handedness,
          target: this
        }));
      } else
        l !== null && t.gripSpace && (r = e.getPose(t.gripSpace, n), r !== null && (l.matrix.fromArray(r.transform.matrix), l.matrix.decompose(l.position, l.rotation, l.scale), l.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (l.hasLinearVelocity = !0, l.linearVelocity.copy(r.linearVelocity)) : l.hasLinearVelocity = !1, r.angularVelocity ? (l.hasAngularVelocity = !0, l.angularVelocity.copy(r.angularVelocity)) : l.hasAngularVelocity = !1));
      a !== null && (s = e.getPose(t.targetRaySpace, n), s === null && r !== null && (s = r), s !== null && (a.matrix.fromArray(s.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(s.linearVelocity)) : a.hasLinearVelocity = !1, s.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(s.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(ov)));
    }
    return a !== null && (a.visible = s !== null), l !== null && (l.visible = r !== null), c !== null && (c.visible = o !== null), this;
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
const av = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, lv = `
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
class cv {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(t, e, n) {
    if (this.texture === null) {
      const s = new Ae(), r = t.properties.get(s);
      r.__webglTexture = e.texture, (e.depthNear != n.depthNear || e.depthFar != n.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = s;
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport, n = new ti({
        vertexShader: av,
        fragmentShader: lv,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: e.z },
          depthHeight: { value: e.w }
        }
      });
      this.mesh = new xe(new uo(20, 20), n);
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
class hv extends Mi {
  constructor(t, e) {
    super();
    const n = this;
    let s = null, r = 1, o = null, a = "local-floor", l = 1, c = null, h = null, u = null, d = null, f = null, g = null;
    const _ = new cv(), p = e.getContextAttributes();
    let m = null, y = null;
    const v = [], M = [], P = new tt();
    let w = null;
    const A = new Be();
    A.layers.enable(1), A.viewport = new Zt();
    const L = new Be();
    L.layers.enable(2), L.viewport = new Zt();
    const G = [A, L], x = new rv();
    x.layers.enable(1), x.layers.enable(2);
    let b = null, B = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function($) {
      let Q = v[$];
      return Q === void 0 && (Q = new Ko(), v[$] = Q), Q.getTargetRaySpace();
    }, this.getControllerGrip = function($) {
      let Q = v[$];
      return Q === void 0 && (Q = new Ko(), v[$] = Q), Q.getGripSpace();
    }, this.getHand = function($) {
      let Q = v[$];
      return Q === void 0 && (Q = new Ko(), v[$] = Q), Q.getHandSpace();
    };
    function k($) {
      const Q = M.indexOf($.inputSource);
      if (Q === -1)
        return;
      const xt = v[Q];
      xt !== void 0 && (xt.update($.inputSource, $.frame, c || o), xt.dispatchEvent({ type: $.type, data: $.inputSource }));
    }
    function H() {
      s.removeEventListener("select", k), s.removeEventListener("selectstart", k), s.removeEventListener("selectend", k), s.removeEventListener("squeeze", k), s.removeEventListener("squeezestart", k), s.removeEventListener("squeezeend", k), s.removeEventListener("end", H), s.removeEventListener("inputsourceschange", K);
      for (let $ = 0; $ < v.length; $++) {
        const Q = M[$];
        Q !== null && (M[$] = null, v[$].disconnect(Q));
      }
      b = null, B = null, _.reset(), t.setRenderTarget(m), f = null, d = null, u = null, s = null, y = null, ee.stop(), n.isPresenting = !1, t.setPixelRatio(w), t.setSize(P.width, P.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function($) {
      r = $, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function($) {
      a = $, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || o;
    }, this.setReferenceSpace = function($) {
      c = $;
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
        if (m = t.getRenderTarget(), s.addEventListener("select", k), s.addEventListener("selectstart", k), s.addEventListener("selectend", k), s.addEventListener("squeeze", k), s.addEventListener("squeezestart", k), s.addEventListener("squeezeend", k), s.addEventListener("end", H), s.addEventListener("inputsourceschange", K), p.xrCompatible !== !0 && await e.makeXRCompatible(), w = t.getPixelRatio(), t.getSize(P), s.renderState.layers === void 0) {
          const Q = {
            antialias: p.antialias,
            alpha: !0,
            depth: p.depth,
            stencil: p.stencil,
            framebufferScaleFactor: r
          };
          f = new XRWebGLLayer(s, e, Q), s.updateRenderState({ baseLayer: f }), t.setPixelRatio(1), t.setSize(f.framebufferWidth, f.framebufferHeight, !1), y = new xi(
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
          p.depth && (ft = p.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, Q = p.stencil ? rs : qi, xt = p.stencil ? ss : vi);
          const Nt = {
            colorFormat: e.RGBA8,
            depthFormat: ft,
            scaleFactor: r
          };
          u = new XRWebGLBinding(s, e), d = u.createProjectionLayer(Nt), s.updateRenderState({ layers: [d] }), t.setPixelRatio(1), t.setSize(d.textureWidth, d.textureHeight, !1), y = new xi(
            d.textureWidth,
            d.textureHeight,
            {
              format: rn,
              type: Bn,
              depthTexture: new Hu(d.textureWidth, d.textureHeight, xt, void 0, void 0, void 0, void 0, void 0, void 0, Q),
              stencilBuffer: p.stencil,
              colorSpace: t.outputColorSpace,
              samples: p.antialias ? 4 : 0,
              resolveDepthBuffer: d.ignoreDepthValues === !1
            }
          );
        }
        y.isXRRenderTarget = !0, this.setFoveation(l), c = null, o = await s.requestReferenceSpace(a), ee.setContext(s), ee.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
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
        ft >= 0 && (M[ft] = null, v[ft].disconnect(xt));
      }
      for (let Q = 0; Q < $.added.length; Q++) {
        const xt = $.added[Q];
        let ft = M.indexOf(xt);
        if (ft === -1) {
          for (let wt = 0; wt < v.length; wt++)
            if (wt >= M.length) {
              M.push(xt), ft = wt;
              break;
            } else if (M[wt] === null) {
              M[wt] = xt, ft = wt;
              break;
            }
          if (ft === -1) break;
        }
        const Nt = v[ft];
        Nt && Nt.connect(xt);
      }
    }
    const z = new R(), nt = new R();
    function W($, Q, xt) {
      z.setFromMatrixPosition(Q.matrixWorld), nt.setFromMatrixPosition(xt.matrixWorld);
      const ft = z.distanceTo(nt), Nt = Q.projectionMatrix.elements, wt = xt.projectionMatrix.elements, Gt = Nt[14] / (Nt[10] - 1), ae = Nt[14] / (Nt[10] + 1), Wt = (Nt[9] + 1) / Nt[5], C = (Nt[9] - 1) / Nt[5], qe = (Nt[8] - 1) / Nt[0], Ht = (wt[8] + 1) / wt[0], $t = Gt * qe, Ct = Gt * Ht, de = ft / (-qe + Ht), It = de * -qe;
      if (Q.matrixWorld.decompose($.position, $.quaternion, $.scale), $.translateX(It), $.translateZ(de), $.matrixWorld.compose($.position, $.quaternion, $.scale), $.matrixWorldInverse.copy($.matrixWorld).invert(), Nt[10] === -1)
        $.projectionMatrix.copy(Q.projectionMatrix), $.projectionMatrixInverse.copy(Q.projectionMatrixInverse);
      else {
        const T = Gt + de, S = ae + de, U = $t - It, q = Ct + (ft - It), Z = Wt * ae / S * T, j = C * ae / S * T;
        $.projectionMatrix.makePerspective(U, q, Z, j, T, S), $.projectionMatrixInverse.copy($.projectionMatrix).invert();
      }
    }
    function ut($, Q) {
      Q === null ? $.matrixWorld.copy($.matrix) : $.matrixWorld.multiplyMatrices(Q.matrixWorld, $.matrix), $.matrixWorldInverse.copy($.matrixWorld).invert();
    }
    this.updateCamera = function($) {
      if (s === null) return;
      let Q = $.near, xt = $.far;
      _.texture !== null && (_.depthNear > 0 && (Q = _.depthNear), _.depthFar > 0 && (xt = _.depthFar)), x.near = L.near = A.near = Q, x.far = L.far = A.far = xt, (b !== x.near || B !== x.far) && (s.updateRenderState({
        depthNear: x.near,
        depthFar: x.far
      }), b = x.near, B = x.far);
      const ft = $.parent, Nt = x.cameras;
      ut(x, ft);
      for (let wt = 0; wt < Nt.length; wt++)
        ut(Nt[wt], ft);
      Nt.length === 2 ? W(x, A, L) : x.projectionMatrix.copy(A.projectionMatrix), dt($, x, ft);
    };
    function dt($, Q, xt) {
      xt === null ? $.matrix.copy(Q.matrixWorld) : ($.matrix.copy(xt.matrixWorld), $.matrix.invert(), $.matrix.multiply(Q.matrixWorld)), $.matrix.decompose($.position, $.quaternion, $.scale), $.updateMatrixWorld(!0), $.projectionMatrix.copy(Q.projectionMatrix), $.projectionMatrixInverse.copy(Q.projectionMatrixInverse), $.isPerspectiveCamera && ($.fov = os * 2 * Math.atan(1 / $.projectionMatrix.elements[5]), $.zoom = 1);
    }
    this.getCamera = function() {
      return x;
    }, this.getFoveation = function() {
      if (!(d === null && f === null))
        return l;
    }, this.setFoveation = function($) {
      l = $, d !== null && (d.fixedFoveation = $), f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = $);
    }, this.hasDepthSensing = function() {
      return _.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return _.getMesh(x);
    };
    let Mt = null;
    function Yt($, Q) {
      if (h = Q.getViewerPose(c || o), g = Q, h !== null) {
        const xt = h.views;
        f !== null && (t.setRenderTargetFramebuffer(y, f.framebuffer), t.setRenderTarget(y));
        let ft = !1;
        xt.length !== x.cameras.length && (x.cameras.length = 0, ft = !0);
        for (let wt = 0; wt < xt.length; wt++) {
          const Gt = xt[wt];
          let ae = null;
          if (f !== null)
            ae = f.getViewport(Gt);
          else {
            const C = u.getViewSubImage(d, Gt);
            ae = C.viewport, wt === 0 && (t.setRenderTargetTextures(
              y,
              C.colorTexture,
              d.ignoreDepthValues ? void 0 : C.depthStencilTexture
            ), t.setRenderTarget(y));
          }
          let Wt = G[wt];
          Wt === void 0 && (Wt = new Be(), Wt.layers.enable(wt), Wt.viewport = new Zt(), G[wt] = Wt), Wt.matrix.fromArray(Gt.transform.matrix), Wt.matrix.decompose(Wt.position, Wt.quaternion, Wt.scale), Wt.projectionMatrix.fromArray(Gt.projectionMatrix), Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(), Wt.viewport.set(ae.x, ae.y, ae.width, ae.height), wt === 0 && (x.matrix.copy(Wt.matrix), x.matrix.decompose(x.position, x.quaternion, x.scale)), ft === !0 && x.cameras.push(Wt);
        }
        const Nt = s.enabledFeatures;
        if (Nt && Nt.includes("depth-sensing")) {
          const wt = u.getDepthInformation(xt[0]);
          wt && wt.isValid && wt.texture && _.init(t, wt, s.renderState);
        }
      }
      for (let xt = 0; xt < v.length; xt++) {
        const ft = M[xt], Nt = v[xt];
        ft !== null && Nt !== void 0 && Nt.update(ft, Q, c || o);
      }
      Mt && Mt($, Q), Q.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: Q }), g = null;
    }
    const ee = new zu();
    ee.setAnimationLoop(Yt), this.setAnimationLoop = function($) {
      Mt = $;
    }, this.dispose = function() {
    };
  }
}
const ui = /* @__PURE__ */ new yn(), uv = /* @__PURE__ */ new Dt();
function dv(i, t) {
  function e(p, m) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), m.value.copy(p.matrix);
  }
  function n(p, m) {
    m.color.getRGB(p.fogColor.value, Fu(i)), m.isFog ? (p.fogNear.value = m.near, p.fogFar.value = m.far) : m.isFogExp2 && (p.fogDensity.value = m.density);
  }
  function s(p, m, y, v, M) {
    m.isMeshBasicMaterial || m.isMeshLambertMaterial ? r(p, m) : m.isMeshToonMaterial ? (r(p, m), u(p, m)) : m.isMeshPhongMaterial ? (r(p, m), h(p, m)) : m.isMeshStandardMaterial ? (r(p, m), d(p, m), m.isMeshPhysicalMaterial && f(p, m, M)) : m.isMeshMatcapMaterial ? (r(p, m), g(p, m)) : m.isMeshDepthMaterial ? r(p, m) : m.isMeshDistanceMaterial ? (r(p, m), _(p, m)) : m.isMeshNormalMaterial ? r(p, m) : m.isLineBasicMaterial ? (o(p, m), m.isLineDashedMaterial && a(p, m)) : m.isPointsMaterial ? l(p, m, y, v) : m.isSpriteMaterial ? c(p, m) : m.isShadowMaterial ? (p.color.value.copy(m.color), p.opacity.value = m.opacity) : m.isShaderMaterial && (m.uniformsNeedUpdate = !1);
  }
  function r(p, m) {
    p.opacity.value = m.opacity, m.color && p.diffuse.value.copy(m.color), m.emissive && p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity), m.map && (p.map.value = m.map, e(m.map, p.mapTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, e(m.alphaMap, p.alphaMapTransform)), m.bumpMap && (p.bumpMap.value = m.bumpMap, e(m.bumpMap, p.bumpMapTransform), p.bumpScale.value = m.bumpScale, m.side === $e && (p.bumpScale.value *= -1)), m.normalMap && (p.normalMap.value = m.normalMap, e(m.normalMap, p.normalMapTransform), p.normalScale.value.copy(m.normalScale), m.side === $e && p.normalScale.value.negate()), m.displacementMap && (p.displacementMap.value = m.displacementMap, e(m.displacementMap, p.displacementMapTransform), p.displacementScale.value = m.displacementScale, p.displacementBias.value = m.displacementBias), m.emissiveMap && (p.emissiveMap.value = m.emissiveMap, e(m.emissiveMap, p.emissiveMapTransform)), m.specularMap && (p.specularMap.value = m.specularMap, e(m.specularMap, p.specularMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
    const y = t.get(m), v = y.envMap, M = y.envMapRotation;
    v && (p.envMap.value = v, ui.copy(M), ui.x *= -1, ui.y *= -1, ui.z *= -1, v.isCubeTexture && v.isRenderTargetTexture === !1 && (ui.y *= -1, ui.z *= -1), p.envMapRotation.value.setFromMatrix4(uv.makeRotationFromEuler(ui)), p.flipEnvMap.value = v.isCubeTexture && v.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = m.reflectivity, p.ior.value = m.ior, p.refractionRatio.value = m.refractionRatio), m.lightMap && (p.lightMap.value = m.lightMap, p.lightMapIntensity.value = m.lightMapIntensity, e(m.lightMap, p.lightMapTransform)), m.aoMap && (p.aoMap.value = m.aoMap, p.aoMapIntensity.value = m.aoMapIntensity, e(m.aoMap, p.aoMapTransform));
  }
  function o(p, m) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, m.map && (p.map.value = m.map, e(m.map, p.mapTransform));
  }
  function a(p, m) {
    p.dashSize.value = m.dashSize, p.totalSize.value = m.dashSize + m.gapSize, p.scale.value = m.scale;
  }
  function l(p, m, y, v) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, p.size.value = m.size * y, p.scale.value = v * 0.5, m.map && (p.map.value = m.map, e(m.map, p.uvTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, e(m.alphaMap, p.alphaMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
  }
  function c(p, m) {
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
  function f(p, m, y) {
    p.ior.value = m.ior, m.sheen > 0 && (p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen), p.sheenRoughness.value = m.sheenRoughness, m.sheenColorMap && (p.sheenColorMap.value = m.sheenColorMap, e(m.sheenColorMap, p.sheenColorMapTransform)), m.sheenRoughnessMap && (p.sheenRoughnessMap.value = m.sheenRoughnessMap, e(m.sheenRoughnessMap, p.sheenRoughnessMapTransform))), m.clearcoat > 0 && (p.clearcoat.value = m.clearcoat, p.clearcoatRoughness.value = m.clearcoatRoughness, m.clearcoatMap && (p.clearcoatMap.value = m.clearcoatMap, e(m.clearcoatMap, p.clearcoatMapTransform)), m.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = m.clearcoatRoughnessMap, e(m.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), m.clearcoatNormalMap && (p.clearcoatNormalMap.value = m.clearcoatNormalMap, e(m.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale), m.side === $e && p.clearcoatNormalScale.value.negate())), m.dispersion > 0 && (p.dispersion.value = m.dispersion), m.iridescence > 0 && (p.iridescence.value = m.iridescence, p.iridescenceIOR.value = m.iridescenceIOR, p.iridescenceThicknessMinimum.value = m.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = m.iridescenceThicknessRange[1], m.iridescenceMap && (p.iridescenceMap.value = m.iridescenceMap, e(m.iridescenceMap, p.iridescenceMapTransform)), m.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = m.iridescenceThicknessMap, e(m.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), m.transmission > 0 && (p.transmission.value = m.transmission, p.transmissionSamplerMap.value = y.texture, p.transmissionSamplerSize.value.set(y.width, y.height), m.transmissionMap && (p.transmissionMap.value = m.transmissionMap, e(m.transmissionMap, p.transmissionMapTransform)), p.thickness.value = m.thickness, m.thicknessMap && (p.thicknessMap.value = m.thicknessMap, e(m.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = m.attenuationDistance, p.attenuationColor.value.copy(m.attenuationColor)), m.anisotropy > 0 && (p.anisotropyVector.value.set(m.anisotropy * Math.cos(m.anisotropyRotation), m.anisotropy * Math.sin(m.anisotropyRotation)), m.anisotropyMap && (p.anisotropyMap.value = m.anisotropyMap, e(m.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = m.specularIntensity, p.specularColor.value.copy(m.specularColor), m.specularColorMap && (p.specularColorMap.value = m.specularColorMap, e(m.specularColorMap, p.specularColorMapTransform)), m.specularIntensityMap && (p.specularIntensityMap.value = m.specularIntensityMap, e(m.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function g(p, m) {
    m.matcap && (p.matcap.value = m.matcap);
  }
  function _(p, m) {
    const y = t.get(m).light;
    p.referencePosition.value.setFromMatrixPosition(y.matrixWorld), p.nearDistance.value = y.shadow.camera.near, p.farDistance.value = y.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: s
  };
}
function fv(i, t, e, n) {
  let s = {}, r = {}, o = [];
  const a = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(y, v) {
    const M = v.program;
    n.uniformBlockBinding(y, M);
  }
  function c(y, v) {
    let M = s[y.id];
    M === void 0 && (g(y), M = h(y), s[y.id] = M, y.addEventListener("dispose", p));
    const P = v.program;
    n.updateUBOMapping(y, P);
    const w = t.render.frame;
    r[y.id] !== w && (d(y), r[y.id] = w);
  }
  function h(y) {
    const v = u();
    y.__bindingPointIndex = v;
    const M = i.createBuffer(), P = y.__size, w = y.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, M), i.bufferData(i.UNIFORM_BUFFER, P, w), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, v, M), M;
  }
  function u() {
    for (let y = 0; y < a; y++)
      if (o.indexOf(y) === -1)
        return o.push(y), y;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(y) {
    const v = s[y.id], M = y.uniforms, P = y.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, v);
    for (let w = 0, A = M.length; w < A; w++) {
      const L = Array.isArray(M[w]) ? M[w] : [M[w]];
      for (let G = 0, x = L.length; G < x; G++) {
        const b = L[G];
        if (f(b, w, G, P) === !0) {
          const B = b.__offset, k = Array.isArray(b.value) ? b.value : [b.value];
          let H = 0;
          for (let K = 0; K < k.length; K++) {
            const z = k[K], nt = _(z);
            typeof z == "number" || typeof z == "boolean" ? (b.__data[0] = z, i.bufferSubData(i.UNIFORM_BUFFER, B + H, b.__data)) : z.isMatrix3 ? (b.__data[0] = z.elements[0], b.__data[1] = z.elements[1], b.__data[2] = z.elements[2], b.__data[3] = 0, b.__data[4] = z.elements[3], b.__data[5] = z.elements[4], b.__data[6] = z.elements[5], b.__data[7] = 0, b.__data[8] = z.elements[6], b.__data[9] = z.elements[7], b.__data[10] = z.elements[8], b.__data[11] = 0) : (z.toArray(b.__data, H), H += nt.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, B, b.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function f(y, v, M, P) {
    const w = y.value, A = v + "_" + M;
    if (P[A] === void 0)
      return typeof w == "number" || typeof w == "boolean" ? P[A] = w : P[A] = w.clone(), !0;
    {
      const L = P[A];
      if (typeof w == "number" || typeof w == "boolean") {
        if (L !== w)
          return P[A] = w, !0;
      } else if (L.equals(w) === !1)
        return L.copy(w), !0;
    }
    return !1;
  }
  function g(y) {
    const v = y.uniforms;
    let M = 0;
    const P = 16;
    for (let A = 0, L = v.length; A < L; A++) {
      const G = Array.isArray(v[A]) ? v[A] : [v[A]];
      for (let x = 0, b = G.length; x < b; x++) {
        const B = G[x], k = Array.isArray(B.value) ? B.value : [B.value];
        for (let H = 0, K = k.length; H < K; H++) {
          const z = k[H], nt = _(z), W = M % P, ut = W % nt.boundary, dt = W + ut;
          M += ut, dt !== 0 && P - dt < nt.storage && (M += P - dt), B.__data = new Float32Array(nt.storage / Float32Array.BYTES_PER_ELEMENT), B.__offset = M, M += nt.storage;
        }
      }
    }
    const w = M % P;
    return w > 0 && (M += P - w), y.__size = M, y.__cache = {}, this;
  }
  function _(y) {
    const v = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof y == "number" || typeof y == "boolean" ? (v.boundary = 4, v.storage = 4) : y.isVector2 ? (v.boundary = 8, v.storage = 8) : y.isVector3 || y.isColor ? (v.boundary = 16, v.storage = 12) : y.isVector4 ? (v.boundary = 16, v.storage = 16) : y.isMatrix3 ? (v.boundary = 48, v.storage = 48) : y.isMatrix4 ? (v.boundary = 64, v.storage = 64) : y.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", y), v;
  }
  function p(y) {
    const v = y.target;
    v.removeEventListener("dispose", p);
    const M = o.indexOf(v.__bindingPointIndex);
    o.splice(M, 1), i.deleteBuffer(s[v.id]), delete s[v.id], delete r[v.id];
  }
  function m() {
    for (const y in s)
      i.deleteBuffer(s[y]);
    o = [], s = {}, r = {};
  }
  return {
    bind: l,
    update: c,
    dispose: m
  };
}
class $u {
  constructor(t = {}) {
    const {
      canvas: e = ep(),
      context: n = null,
      depth: s = !0,
      stencil: r = !1,
      alpha: o = !1,
      antialias: a = !1,
      premultipliedAlpha: l = !0,
      preserveDrawingBuffer: c = !1,
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
    const m = [], y = [];
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
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = He, this.toneMapping = Qn, this.toneMappingExposure = 1;
    const v = this;
    let M = !1, P = 0, w = 0, A = null, L = -1, G = null;
    const x = new Zt(), b = new Zt();
    let B = null;
    const k = new Tt(0);
    let H = 0, K = e.width, z = e.height, nt = 1, W = null, ut = null;
    const dt = new Zt(0, 0, K, z), Mt = new Zt(0, 0, K, z);
    let Yt = !1;
    const ee = new Al();
    let $ = !1, Q = !1;
    const xt = new Dt(), ft = new Dt(), Nt = new R(), wt = new Zt(), Gt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let ae = !1;
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
        premultipliedAlpha: l,
        preserveDrawingBuffer: c,
        powerPreference: h,
        failIfMajorPerformanceCaveat: u
      };
      if ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${ml}`), e.addEventListener("webglcontextlost", Y, !1), e.addEventListener("webglcontextrestored", ot, !1), e.addEventListener("webglcontextcreationerror", ct, !1), C === null) {
        const D = "webgl2";
        if (C = qe(D, E), C === null)
          throw qe(D) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (E) {
      throw console.error("THREE.WebGLRenderer: " + E.message), E;
    }
    let Ht, $t, Ct, de, It, T, S, U, q, Z, j, St, rt, pt, jt, et, mt, Pt, Lt, gt, Vt, Ut, he, I;
    function lt() {
      Ht = new x_(C), Ht.init(), Ut = new sv(C, Ht), $t = new f_(C, Ht, t, Ut), Ct = new ev(C), $t.reverseDepthBuffer && Ct.buffers.depth.setReversed(!0), de = new S_(C), It = new z0(), T = new iv(C, Ht, Ct, It, $t, Ut, de), S = new m_(v), U = new v_(v), q = new Cp(C), he = new u_(C, q), Z = new y_(C, q, de, he), j = new b_(C, Z, q, de), Lt = new E_(C, $t, T), et = new p_(It), St = new k0(v, S, U, Ht, $t, he, et), rt = new dv(v, It), pt = new V0(), jt = new q0(Ht), Pt = new h_(v, S, U, Ct, j, d, l), mt = new Q0(v, j, $t), I = new fv(C, de, $t, Ct), gt = new d_(C, Ht, de), Vt = new M_(C, Ht, de), de.programs = St.programs, v.capabilities = $t, v.extensions = Ht, v.properties = It, v.renderLists = pt, v.shadowMap = mt, v.state = Ct, v.info = de;
    }
    lt();
    const V = new hv(v, C);
    this.xr = V, this.getContext = function() {
      return C;
    }, this.getContextAttributes = function() {
      return C.getContextAttributes();
    }, this.forceContextLoss = function() {
      const E = Ht.get("WEBGL_lose_context");
      E && E.loseContext();
    }, this.forceContextRestore = function() {
      const E = Ht.get("WEBGL_lose_context");
      E && E.restoreContext();
    }, this.getPixelRatio = function() {
      return nt;
    }, this.setPixelRatio = function(E) {
      E !== void 0 && (nt = E, this.setSize(K, z, !1));
    }, this.getSize = function(E) {
      return E.set(K, z);
    }, this.setSize = function(E, D, O = !0) {
      if (V.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      K = E, z = D, e.width = Math.floor(E * nt), e.height = Math.floor(D * nt), O === !0 && (e.style.width = E + "px", e.style.height = D + "px"), this.setViewport(0, 0, E, D);
    }, this.getDrawingBufferSize = function(E) {
      return E.set(K * nt, z * nt).floor();
    }, this.setDrawingBufferSize = function(E, D, O) {
      K = E, z = D, nt = O, e.width = Math.floor(E * O), e.height = Math.floor(D * O), this.setViewport(0, 0, E, D);
    }, this.getCurrentViewport = function(E) {
      return E.copy(x);
    }, this.getViewport = function(E) {
      return E.copy(dt);
    }, this.setViewport = function(E, D, O, F) {
      E.isVector4 ? dt.set(E.x, E.y, E.z, E.w) : dt.set(E, D, O, F), Ct.viewport(x.copy(dt).multiplyScalar(nt).round());
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
          N = it === Sl || it === Ml || it === yl;
        }
        if (N) {
          const it = A.texture.type, at = it === Bn || it === vi || it === Ws || it === ss || it === _l || it === vl, vt = Pt.getClearColor(), yt = Pt.getClearAlpha(), At = vt.r, Rt = vt.g, Et = vt.b;
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
      e.removeEventListener("webglcontextlost", Y, !1), e.removeEventListener("webglcontextrestored", ot, !1), e.removeEventListener("webglcontextcreationerror", ct, !1), pt.dispose(), jt.dispose(), It.dispose(), S.dispose(), U.dispose(), j.dispose(), he.dispose(), I.dispose(), St.dispose(), V.dispose(), V.removeEventListener("sessionstart", Xl), V.removeEventListener("sessionend", $l), si.stop();
    };
    function Y(E) {
      E.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), M = !0;
    }
    function ot() {
      console.log("THREE.WebGLRenderer: Context Restored."), M = !1;
      const E = de.autoReset, D = mt.enabled, O = mt.autoUpdate, F = mt.needsUpdate, N = mt.type;
      lt(), de.autoReset = E, mt.enabled = D, mt.autoUpdate = O, mt.needsUpdate = F, mt.type = N;
    }
    function ct(E) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", E.statusMessage);
    }
    function Xt(E) {
      const D = E.target;
      D.removeEventListener("dispose", Xt), Me(D);
    }
    function Me(E) {
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
      const at = N.isMesh && N.matrixWorld.determinant() < 0, vt = yd(E, D, O, F, N);
      Ct.setMaterial(F, at);
      let yt = O.index, At = 1;
      if (F.wireframe === !0) {
        if (yt = Z.getWireframeAttribute(O), yt === void 0) return;
        At = 2;
      }
      const Rt = O.drawRange, Et = O.attributes.position;
      let ne = Rt.start * At, fe = (Rt.start + Rt.count) * At;
      it !== null && (ne = Math.max(ne, it.start * At), fe = Math.min(fe, (it.start + it.count) * At)), yt !== null ? (ne = Math.max(ne, 0), fe = Math.min(fe, yt.count)) : Et != null && (ne = Math.max(ne, 0), fe = Math.min(fe, Et.count));
      const ve = fe - ne;
      if (ve < 0 || ve === 1 / 0) return;
      he.setup(N, F, vt, O, yt);
      let Ye, Jt = gt;
      if (yt !== null && (Ye = q.get(yt), Jt = Vt, Jt.setIndex(Ye)), N.isMesh)
        F.wireframe === !0 ? (Ct.setLineWidth(F.wireframeLinewidth * Wt()), Jt.setMode(C.LINES)) : Jt.setMode(C.TRIANGLES);
      else if (N.isLine) {
        let bt = F.linewidth;
        bt === void 0 && (bt = 1), Ct.setLineWidth(bt * Wt()), N.isLineSegments ? Jt.setMode(C.LINES) : N.isLineLoop ? Jt.setMode(C.LINE_LOOP) : Jt.setMode(C.LINE_STRIP);
      } else N.isPoints ? Jt.setMode(C.POINTS) : N.isSprite && Jt.setMode(C.TRIANGLES);
      if (N.isBatchedMesh)
        if (N._multiDrawInstances !== null)
          Jt.renderMultiDrawInstances(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount, N._multiDrawInstances);
        else if (Ht.get("WEBGL_multi_draw"))
          Jt.renderMultiDraw(N._multiDrawStarts, N._multiDrawCounts, N._multiDrawCount);
        else {
          const bt = N._multiDrawStarts, Ie = N._multiDrawCounts, Qt = N._multiDrawCount, an = yt ? q.get(yt).bytesPerElement : 1, Si = It.get(F).currentProgram.getUniforms();
          for (let Ke = 0; Ke < Qt; Ke++)
            Si.setValue(C, "_gl_DrawID", Ke), Jt.render(bt[Ke] / an, Ie[Ke]);
        }
      else if (N.isInstancedMesh)
        Jt.renderInstances(ne, ve, N.count);
      else if (O.isInstancedBufferGeometry) {
        const bt = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, Ie = Math.min(O.instanceCount, bt);
        Jt.renderInstances(ne, ve, Ie);
      } else
        Jt.render(ne, ve);
    };
    function Kt(E, D, O) {
      E.transparent === !0 && E.side === fn && E.forceSinglePass === !1 ? (E.side = $e, E.needsUpdate = !0, rr(E, D, O), E.side = Fn, E.needsUpdate = !0, rr(E, D, O), E.side = fn) : rr(E, D, O);
    }
    this.compile = function(E, D, O = null) {
      O === null && (O = E), p = jt.get(O), p.init(D), y.push(p), O.traverseVisible(function(N) {
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
      }), y.pop(), p = null, F;
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
        Ht.get("KHR_parallel_shader_compile") !== null ? it() : setTimeout(it, 10);
      });
    };
    let We = null;
    function Tn(E) {
      We && We(E);
    }
    function Xl() {
      si.stop();
    }
    function $l() {
      si.start();
    }
    const si = new zu();
    si.setAnimationLoop(Tn), typeof self < "u" && si.setContext(self), this.setAnimationLoop = function(E) {
      We = E, V.setAnimationLoop(E), E === null ? si.stop() : si.start();
    }, V.addEventListener("sessionstart", Xl), V.addEventListener("sessionend", $l), this.render = function(E, D) {
      if (D !== void 0 && D.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (M === !0) return;
      if (E.matrixWorldAutoUpdate === !0 && E.updateMatrixWorld(), D.parent === null && D.matrixWorldAutoUpdate === !0 && D.updateMatrixWorld(), V.enabled === !0 && V.isPresenting === !0 && (V.cameraAutoUpdate === !0 && V.updateCamera(D), D = V.getCamera()), E.isScene === !0 && E.onBeforeRender(v, E, D, A), p = jt.get(E, y.length), p.init(D), y.push(p), ft.multiplyMatrices(D.projectionMatrix, D.matrixWorldInverse), ee.setFromProjectionMatrix(ft), Q = this.localClippingEnabled, $ = et.init(this.clippingPlanes, Q), _ = pt.get(E, m.length), _.init(), m.push(_), V.enabled === !0 && V.isPresenting === !0) {
        const it = v.xr.getDepthSensingMesh();
        it !== null && _o(it, D, -1 / 0, v.sortObjects);
      }
      _o(E, D, 0, v.sortObjects), _.finish(), v.sortObjects === !0 && _.sort(W, ut), ae = V.enabled === !1 || V.isPresenting === !1 || V.hasDepthSensing() === !1, ae && Pt.addToRenderList(_, E), this.info.render.frame++, $ === !0 && et.beginShadows();
      const O = p.state.shadowsArray;
      mt.render(O, E, D), $ === !0 && et.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const F = _.opaque, N = _.transmissive;
      if (p.setupLights(), D.isArrayCamera) {
        const it = D.cameras;
        if (N.length > 0)
          for (let at = 0, vt = it.length; at < vt; at++) {
            const yt = it[at];
            ql(F, N, E, yt);
          }
        ae && Pt.render(E);
        for (let at = 0, vt = it.length; at < vt; at++) {
          const yt = it[at];
          jl(_, E, yt, yt.viewport);
        }
      } else
        N.length > 0 && ql(F, N, E, D), ae && Pt.render(E), jl(_, E, D);
      A !== null && (T.updateMultisampleRenderTarget(A), T.updateRenderTargetMipmap(A)), E.isScene === !0 && E.onAfterRender(v, E, D), he.resetDefaultState(), L = -1, G = null, y.pop(), y.length > 0 ? (p = y[y.length - 1], $ === !0 && et.setGlobalState(v.clippingPlanes, p.state.camera)) : p = null, m.pop(), m.length > 0 ? _ = m[m.length - 1] : _ = null;
    };
    function _o(E, D, O, F) {
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
        _o(it[at], D, O, F);
    }
    function jl(E, D, O, F) {
      const N = E.opaque, it = E.transmissive, at = E.transparent;
      p.setupLightsView(O), $ === !0 && et.setGlobalState(v.clippingPlanes, O), F && Ct.viewport(x.copy(F)), N.length > 0 && sr(N, D, O), it.length > 0 && sr(it, D, O), at.length > 0 && sr(at, D, O), Ct.buffers.depth.setTest(!0), Ct.buffers.depth.setMask(!0), Ct.buffers.color.setMask(!0), Ct.setPolygonOffset(!1);
    }
    function ql(E, D, O, F) {
      if ((O.isScene === !0 ? O.overrideMaterial : null) !== null)
        return;
      p.state.transmissionRenderTarget[F.id] === void 0 && (p.state.transmissionRenderTarget[F.id] = new xi(1, 1, {
        generateMipmaps: !0,
        type: Ht.has("EXT_color_buffer_half_float") || Ht.has("EXT_color_buffer_float") ? tr : Bn,
        minFilter: Un,
        samples: 4,
        stencilBuffer: r,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: qt.workingColorSpace
      }));
      const it = p.state.transmissionRenderTarget[F.id], at = F.viewport || x;
      it.setSize(at.z, at.w);
      const vt = v.getRenderTarget();
      v.setRenderTarget(it), v.getClearColor(k), H = v.getClearAlpha(), H < 1 && v.setClearColor(16777215, 0.5), v.clear(), ae && Pt.render(O);
      const yt = v.toneMapping;
      v.toneMapping = Qn;
      const At = F.viewport;
      if (F.viewport !== void 0 && (F.viewport = void 0), p.setupLightsView(F), $ === !0 && et.setGlobalState(v.clippingPlanes, F), sr(E, O, F), T.updateMultisampleRenderTarget(it), T.updateRenderTargetMipmap(it), Ht.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Rt = !1;
        for (let Et = 0, ne = D.length; Et < ne; Et++) {
          const fe = D[Et], ve = fe.object, Ye = fe.geometry, Jt = fe.material, bt = fe.group;
          if (Jt.side === fn && ve.layers.test(F.layers)) {
            const Ie = Jt.side;
            Jt.side = $e, Jt.needsUpdate = !0, Yl(ve, O, F, Ye, Jt, bt), Jt.side = Ie, Jt.needsUpdate = !0, Rt = !0;
          }
        }
        Rt === !0 && (T.updateMultisampleRenderTarget(it), T.updateRenderTargetMipmap(it));
      }
      v.setRenderTarget(vt), v.setClearColor(k, H), At !== void 0 && (F.viewport = At), v.toneMapping = yt;
    }
    function sr(E, D, O) {
      const F = D.isScene === !0 ? D.overrideMaterial : null;
      for (let N = 0, it = E.length; N < it; N++) {
        const at = E[N], vt = at.object, yt = at.geometry, At = F === null ? at.material : F, Rt = at.group;
        vt.layers.test(O.layers) && Yl(vt, D, O, yt, At, Rt);
      }
    }
    function Yl(E, D, O, F, N, it) {
      E.onBeforeRender(v, D, O, F, N, it), E.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, E.matrixWorld), E.normalMatrix.getNormalMatrix(E.modelViewMatrix), N.onBeforeRender(v, D, O, F, E, it), N.transparent === !0 && N.side === fn && N.forceSinglePass === !1 ? (N.side = $e, N.needsUpdate = !0, v.renderBufferDirect(O, D, F, N, E, it), N.side = Fn, N.needsUpdate = !0, v.renderBufferDirect(O, D, F, N, E, it), N.side = fn) : v.renderBufferDirect(O, D, F, N, E, it), E.onAfterRender(v, D, O, F, N, it);
    }
    function rr(E, D, O) {
      D.isScene !== !0 && (D = Gt);
      const F = It.get(E), N = p.state.lights, it = p.state.shadowsArray, at = N.state.version, vt = St.getParameters(E, N.state, it, D, O), yt = St.getProgramCacheKey(vt);
      let At = F.programs;
      F.environment = E.isMeshStandardMaterial ? D.environment : null, F.fog = D.fog, F.envMap = (E.isMeshStandardMaterial ? U : S).get(E.envMap || F.environment), F.envMapRotation = F.environment !== null && E.envMap === null ? D.environmentRotation : E.envMapRotation, At === void 0 && (E.addEventListener("dispose", Xt), At = /* @__PURE__ */ new Map(), F.programs = At);
      let Rt = At.get(yt);
      if (Rt !== void 0) {
        if (F.currentProgram === Rt && F.lightsStateVersion === at)
          return Zl(E, vt), Rt;
      } else
        vt.uniforms = St.getUniforms(E), E.onBeforeCompile(vt, v), Rt = St.acquireProgram(vt, yt), At.set(yt, Rt), F.uniforms = vt.uniforms;
      const Et = F.uniforms;
      return (!E.isShaderMaterial && !E.isRawShaderMaterial || E.clipping === !0) && (Et.clippingPlanes = et.uniform), Zl(E, vt), F.needsLights = Sd(E), F.lightsStateVersion = at, F.needsLights && (Et.ambientLightColor.value = N.state.ambient, Et.lightProbe.value = N.state.probe, Et.directionalLights.value = N.state.directional, Et.directionalLightShadows.value = N.state.directionalShadow, Et.spotLights.value = N.state.spot, Et.spotLightShadows.value = N.state.spotShadow, Et.rectAreaLights.value = N.state.rectArea, Et.ltc_1.value = N.state.rectAreaLTC1, Et.ltc_2.value = N.state.rectAreaLTC2, Et.pointLights.value = N.state.point, Et.pointLightShadows.value = N.state.pointShadow, Et.hemisphereLights.value = N.state.hemi, Et.directionalShadowMap.value = N.state.directionalShadowMap, Et.directionalShadowMatrix.value = N.state.directionalShadowMatrix, Et.spotShadowMap.value = N.state.spotShadowMap, Et.spotLightMatrix.value = N.state.spotLightMatrix, Et.spotLightMap.value = N.state.spotLightMap, Et.pointShadowMap.value = N.state.pointShadowMap, Et.pointShadowMatrix.value = N.state.pointShadowMatrix), F.currentProgram = Rt, F.uniformsList = null, Rt;
    }
    function Kl(E) {
      if (E.uniformsList === null) {
        const D = E.currentProgram.getUniforms();
        E.uniformsList = Yr.seqWithValue(D.seq, E.uniforms);
      }
      return E.uniformsList;
    }
    function Zl(E, D) {
      const O = It.get(E);
      O.outputColorSpace = D.outputColorSpace, O.batching = D.batching, O.batchingColor = D.batchingColor, O.instancing = D.instancing, O.instancingColor = D.instancingColor, O.instancingMorph = D.instancingMorph, O.skinning = D.skinning, O.morphTargets = D.morphTargets, O.morphNormals = D.morphNormals, O.morphColors = D.morphColors, O.morphTargetsCount = D.morphTargetsCount, O.numClippingPlanes = D.numClippingPlanes, O.numIntersection = D.numClipIntersection, O.vertexAlphas = D.vertexAlphas, O.vertexTangents = D.vertexTangents, O.toneMapping = D.toneMapping;
    }
    function yd(E, D, O, F, N) {
      D.isScene !== !0 && (D = Gt), T.resetTextureUnits();
      const it = D.fog, at = F.isMeshStandardMaterial ? D.environment : null, vt = A === null ? v.outputColorSpace : A.isXRRenderTarget === !0 ? A.texture.colorSpace : Ne, yt = (F.isMeshStandardMaterial ? U : S).get(F.envMap || at), At = F.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4, Rt = !!O.attributes.tangent && (!!F.normalMap || F.anisotropy > 0), Et = !!O.morphAttributes.position, ne = !!O.morphAttributes.normal, fe = !!O.morphAttributes.color;
      let ve = Qn;
      F.toneMapped && (A === null || A.isXRRenderTarget === !0) && (ve = v.toneMapping);
      const Ye = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, Jt = Ye !== void 0 ? Ye.length : 0, bt = It.get(F), Ie = p.state.lights;
      if ($ === !0 && (Q === !0 || E !== G)) {
        const tn = E === G && F.id === L;
        et.setState(F, E, tn);
      }
      let Qt = !1;
      F.version === bt.__version ? (bt.needsLights && bt.lightsStateVersion !== Ie.state.version || bt.outputColorSpace !== vt || N.isBatchedMesh && bt.batching === !1 || !N.isBatchedMesh && bt.batching === !0 || N.isBatchedMesh && bt.batchingColor === !0 && N.colorTexture === null || N.isBatchedMesh && bt.batchingColor === !1 && N.colorTexture !== null || N.isInstancedMesh && bt.instancing === !1 || !N.isInstancedMesh && bt.instancing === !0 || N.isSkinnedMesh && bt.skinning === !1 || !N.isSkinnedMesh && bt.skinning === !0 || N.isInstancedMesh && bt.instancingColor === !0 && N.instanceColor === null || N.isInstancedMesh && bt.instancingColor === !1 && N.instanceColor !== null || N.isInstancedMesh && bt.instancingMorph === !0 && N.morphTexture === null || N.isInstancedMesh && bt.instancingMorph === !1 && N.morphTexture !== null || bt.envMap !== yt || F.fog === !0 && bt.fog !== it || bt.numClippingPlanes !== void 0 && (bt.numClippingPlanes !== et.numPlanes || bt.numIntersection !== et.numIntersection) || bt.vertexAlphas !== At || bt.vertexTangents !== Rt || bt.morphTargets !== Et || bt.morphNormals !== ne || bt.morphColors !== fe || bt.toneMapping !== ve || bt.morphTargetsCount !== Jt) && (Qt = !0) : (Qt = !0, bt.__version = F.version);
      let an = bt.currentProgram;
      Qt === !0 && (an = rr(F, D, N));
      let Si = !1, Ke = !1, vo = !1;
      const ye = an.getUniforms(), kn = bt.uniforms;
      if (Ct.useProgram(an.program) && (Si = !0, Ke = !0, vo = !0), F.id !== L && (L = F.id, Ke = !0), Si || G !== E) {
        $t.reverseDepthBuffer ? (xt.copy(E.projectionMatrix), ip(xt), sp(xt), ye.setValue(C, "projectionMatrix", xt)) : ye.setValue(C, "projectionMatrix", E.projectionMatrix), ye.setValue(C, "viewMatrix", E.matrixWorldInverse);
        const tn = ye.map.cameraPosition;
        tn !== void 0 && tn.setValue(C, Nt.setFromMatrixPosition(E.matrixWorld)), $t.logarithmicDepthBuffer && ye.setValue(
          C,
          "logDepthBufFC",
          2 / (Math.log(E.far + 1) / Math.LN2)
        ), (F.isMeshPhongMaterial || F.isMeshToonMaterial || F.isMeshLambertMaterial || F.isMeshBasicMaterial || F.isMeshStandardMaterial || F.isShaderMaterial) && ye.setValue(C, "isOrthographic", E.isOrthographicCamera === !0), G !== E && (G = E, Ke = !0, vo = !0);
      }
      if (N.isSkinnedMesh) {
        ye.setOptional(C, N, "bindMatrix"), ye.setOptional(C, N, "bindMatrixInverse");
        const tn = N.skeleton;
        tn && (tn.boneTexture === null && tn.computeBoneTexture(), ye.setValue(C, "boneTexture", tn.boneTexture, T));
      }
      N.isBatchedMesh && (ye.setOptional(C, N, "batchingTexture"), ye.setValue(C, "batchingTexture", N._matricesTexture, T), ye.setOptional(C, N, "batchingIdTexture"), ye.setValue(C, "batchingIdTexture", N._indirectTexture, T), ye.setOptional(C, N, "batchingColorTexture"), N._colorsTexture !== null && ye.setValue(C, "batchingColorTexture", N._colorsTexture, T));
      const xo = O.morphAttributes;
      if ((xo.position !== void 0 || xo.normal !== void 0 || xo.color !== void 0) && Lt.update(N, O, an), (Ke || bt.receiveShadow !== N.receiveShadow) && (bt.receiveShadow = N.receiveShadow, ye.setValue(C, "receiveShadow", N.receiveShadow)), F.isMeshGouraudMaterial && F.envMap !== null && (kn.envMap.value = yt, kn.flipEnvMap.value = yt.isCubeTexture && yt.isRenderTargetTexture === !1 ? -1 : 1), F.isMeshStandardMaterial && F.envMap === null && D.environment !== null && (kn.envMapIntensity.value = D.environmentIntensity), Ke && (ye.setValue(C, "toneMappingExposure", v.toneMappingExposure), bt.needsLights && Md(kn, vo), it && F.fog === !0 && rt.refreshFogUniforms(kn, it), rt.refreshMaterialUniforms(kn, F, nt, z, p.state.transmissionRenderTarget[E.id]), Yr.upload(C, Kl(bt), kn, T)), F.isShaderMaterial && F.uniformsNeedUpdate === !0 && (Yr.upload(C, Kl(bt), kn, T), F.uniformsNeedUpdate = !1), F.isSpriteMaterial && ye.setValue(C, "center", N.center), ye.setValue(C, "modelViewMatrix", N.modelViewMatrix), ye.setValue(C, "normalMatrix", N.normalMatrix), ye.setValue(C, "modelMatrix", N.matrixWorld), F.isShaderMaterial || F.isRawShaderMaterial) {
        const tn = F.uniformsGroups;
        for (let yo = 0, Ed = tn.length; yo < Ed; yo++) {
          const Jl = tn[yo];
          I.update(Jl, an), I.bind(Jl, an);
        }
      }
      return an;
    }
    function Md(E, D) {
      E.ambientLightColor.needsUpdate = D, E.lightProbe.needsUpdate = D, E.directionalLights.needsUpdate = D, E.directionalLightShadows.needsUpdate = D, E.pointLights.needsUpdate = D, E.pointLightShadows.needsUpdate = D, E.spotLights.needsUpdate = D, E.spotLightShadows.needsUpdate = D, E.rectAreaLights.needsUpdate = D, E.hemisphereLights.needsUpdate = D;
    }
    function Sd(E) {
      return E.isMeshLambertMaterial || E.isMeshToonMaterial || E.isMeshPhongMaterial || E.isMeshStandardMaterial || E.isShadowMaterial || E.isShaderMaterial && E.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return P;
    }, this.getActiveMipmapLevel = function() {
      return w;
    }, this.getRenderTarget = function() {
      return A;
    }, this.setRenderTargetTextures = function(E, D, O) {
      It.get(E.texture).__webglTexture = D, It.get(E.depthTexture).__webglTexture = O;
      const F = It.get(E);
      F.__hasExternalTextures = !0, F.__autoAllocateDepthBuffer = O === void 0, F.__autoAllocateDepthBuffer || Ht.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), F.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(E, D) {
      const O = It.get(E);
      O.__webglFramebuffer = D, O.__useDefaultFramebuffer = D === void 0;
    }, this.setRenderTarget = function(E, D = 0, O = 0) {
      A = E, P = D, w = O;
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
        E.isWebGLCubeRenderTarget ? (Array.isArray(Rt[D]) ? N = Rt[D][O] : N = Rt[D], it = !0) : E.samples > 0 && T.useMultisampledRTT(E) === !1 ? N = It.get(E).__webglMultisampledFramebuffer : Array.isArray(Rt) ? N = Rt[O] : N = Rt, x.copy(E.viewport), b.copy(E.scissor), B = E.scissorTest;
      } else
        x.copy(dt).multiplyScalar(nt).floor(), b.copy(Mt).multiplyScalar(nt).floor(), B = Yt;
      if (Ct.bindFramebuffer(C.FRAMEBUFFER, N) && F && Ct.drawBuffers(E, N), Ct.viewport(x), Ct.scissor(b), Ct.setScissorTest(B), it) {
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
          const fe = C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return C.flush(), await np(C, fe, 4), C.bindBuffer(C.PIXEL_PACK_BUFFER, Et), C.getBufferSubData(C.PIXEL_PACK_BUFFER, 0, it), C.deleteBuffer(Et), C.deleteSync(fe), it;
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
      const fe = C.getParameter(C.UNPACK_ROW_LENGTH), ve = C.getParameter(C.UNPACK_IMAGE_HEIGHT), Ye = C.getParameter(C.UNPACK_SKIP_PIXELS), Jt = C.getParameter(C.UNPACK_SKIP_ROWS), bt = C.getParameter(C.UNPACK_SKIP_IMAGES), Ie = E.isCompressedTexture ? E.mipmaps[N] : E.image;
      C.pixelStorei(C.UNPACK_ROW_LENGTH, Ie.width), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, Ie.height), C.pixelStorei(C.UNPACK_SKIP_PIXELS, vt), C.pixelStorei(C.UNPACK_SKIP_ROWS, yt), E.isDataTexture ? C.texSubImage2D(C.TEXTURE_2D, N, At, Rt, it, at, Et, ne, Ie.data) : E.isCompressedTexture ? C.compressedTexSubImage2D(C.TEXTURE_2D, N, At, Rt, Ie.width, Ie.height, Et, Ie.data) : C.texSubImage2D(C.TEXTURE_2D, N, At, Rt, it, at, Et, ne, Ie), C.pixelStorei(C.UNPACK_ROW_LENGTH, fe), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, ve), C.pixelStorei(C.UNPACK_SKIP_PIXELS, Ye), C.pixelStorei(C.UNPACK_SKIP_ROWS, Jt), C.pixelStorei(C.UNPACK_SKIP_IMAGES, bt), N === 0 && D.generateMipmaps && C.generateMipmap(C.TEXTURE_2D), Ct.unbindTexture();
    }, this.copyTextureToTexture3D = function(E, D, O = null, F = null, N = 0) {
      E.isTexture !== !0 && (qr("WebGLRenderer: copyTextureToTexture3D function signature has changed."), O = arguments[0] || null, F = arguments[1] || null, E = arguments[2], D = arguments[3], N = arguments[4] || 0);
      let it, at, vt, yt, At, Rt, Et, ne, fe;
      const ve = E.isCompressedTexture ? E.mipmaps[N] : E.image;
      O !== null ? (it = O.max.x - O.min.x, at = O.max.y - O.min.y, vt = O.max.z - O.min.z, yt = O.min.x, At = O.min.y, Rt = O.min.z) : (it = ve.width, at = ve.height, vt = ve.depth, yt = 0, At = 0, Rt = 0), F !== null ? (Et = F.x, ne = F.y, fe = F.z) : (Et = 0, ne = 0, fe = 0);
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
      const Ie = C.getParameter(C.UNPACK_ROW_LENGTH), Qt = C.getParameter(C.UNPACK_IMAGE_HEIGHT), an = C.getParameter(C.UNPACK_SKIP_PIXELS), Si = C.getParameter(C.UNPACK_SKIP_ROWS), Ke = C.getParameter(C.UNPACK_SKIP_IMAGES);
      C.pixelStorei(C.UNPACK_ROW_LENGTH, ve.width), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, ve.height), C.pixelStorei(C.UNPACK_SKIP_PIXELS, yt), C.pixelStorei(C.UNPACK_SKIP_ROWS, At), C.pixelStorei(C.UNPACK_SKIP_IMAGES, Rt), E.isDataTexture || E.isData3DTexture ? C.texSubImage3D(bt, N, Et, ne, fe, it, at, vt, Ye, Jt, ve.data) : D.isCompressedArrayTexture ? C.compressedTexSubImage3D(bt, N, Et, ne, fe, it, at, vt, Ye, ve.data) : C.texSubImage3D(bt, N, Et, ne, fe, it, at, vt, Ye, Jt, ve), C.pixelStorei(C.UNPACK_ROW_LENGTH, Ie), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, Qt), C.pixelStorei(C.UNPACK_SKIP_PIXELS, an), C.pixelStorei(C.UNPACK_SKIP_ROWS, Si), C.pixelStorei(C.UNPACK_SKIP_IMAGES, Ke), N === 0 && D.generateMipmaps && C.generateMipmap(bt), Ct.unbindTexture();
    }, this.initRenderTarget = function(E) {
      It.get(E).__webglFramebuffer === void 0 && T.setupRenderTarget(E);
    }, this.initTexture = function(E) {
      E.isCubeTexture ? T.setTextureCube(E, 0) : E.isData3DTexture ? T.setTexture3D(E, 0) : E.isDataArrayTexture || E.isCompressedArrayTexture ? T.setTexture2DArray(E, 0) : T.setTexture2D(E, 0), Ct.unbindTexture();
    }, this.resetState = function() {
      P = 0, w = 0, A = null, Ct.reset(), he.reset();
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
    e.drawingBufferColorSpace = t === El ? "display-p3" : "srgb", e.unpackColorSpace = qt.workingColorSpace === ho ? "display-p3" : "srgb";
  }
}
class ju extends me {
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
class qu {
  constructor(t, e) {
    this.isInterleavedBuffer = !0, this.array = t, this.stride = e, this.count = t !== void 0 ? t.length / e : 0, this.usage = Za, this.updateRanges = [], this.version = 0, this.uuid = on();
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
const ke = /* @__PURE__ */ new R();
class qs {
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
      ke.fromBufferAttribute(this, e), ke.applyMatrix4(t), this.setXYZ(e, ke.x, ke.y, ke.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ke.fromBufferAttribute(this, e), ke.applyNormalMatrix(t), this.setXYZ(e, ke.x, ke.y, ke.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++)
      ke.fromBufferAttribute(this, e), ke.transformDirection(t), this.setXYZ(e, ke.x, ke.y, ke.z);
    return this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.data.stride + this.offset + e];
    return this.normalized && (n = pn(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = se(n, this.array)), this.data.array[t * this.data.stride + this.offset + e] = n, this;
  }
  setX(t, e) {
    return this.normalized && (e = se(e, this.array)), this.data.array[t * this.data.stride + this.offset] = e, this;
  }
  setY(t, e) {
    return this.normalized && (e = se(e, this.array)), this.data.array[t * this.data.stride + this.offset + 1] = e, this;
  }
  setZ(t, e) {
    return this.normalized && (e = se(e, this.array)), this.data.array[t * this.data.stride + this.offset + 2] = e, this;
  }
  setW(t, e) {
    return this.normalized && (e = se(e, this.array)), this.data.array[t * this.data.stride + this.offset + 3] = e, this;
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
    return t = t * this.data.stride + this.offset, this.normalized && (e = se(e, this.array), n = se(n, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, s) {
    return t = t * this.data.stride + this.offset, this.normalized && (e = se(e, this.array), n = se(n, this.array), s = se(s, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = s, this;
  }
  setXYZW(t, e, n, s, r) {
    return t = t * this.data.stride + this.offset, this.normalized && (e = se(e, this.array), n = se(n, this.array), s = se(s, this.array), r = se(r, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = s, this.data.array[t + 3] = r, this;
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
      return new De(new this.array.constructor(e), this.itemSize, this.normalized);
    } else
      return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new qs(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
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
class Yu extends gn {
  constructor(t) {
    super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new Tt(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.rotation = t.rotation, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
  }
}
let Fi;
const Ss = /* @__PURE__ */ new R(), Bi = /* @__PURE__ */ new R(), ki = /* @__PURE__ */ new R(), zi = /* @__PURE__ */ new tt(), Es = /* @__PURE__ */ new tt(), Ku = /* @__PURE__ */ new Dt(), Ar = /* @__PURE__ */ new R(), bs = /* @__PURE__ */ new R(), wr = /* @__PURE__ */ new R(), lh = /* @__PURE__ */ new tt(), Zo = /* @__PURE__ */ new tt(), ch = /* @__PURE__ */ new tt();
class pv extends me {
  constructor(t = new Yu()) {
    if (super(), this.isSprite = !0, this.type = "Sprite", Fi === void 0) {
      Fi = new Le();
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
      ]), n = new qu(e, 5);
      Fi.setIndex([0, 1, 2, 0, 2, 3]), Fi.setAttribute("position", new qs(n, 3, 0, !1)), Fi.setAttribute("uv", new qs(n, 2, 3, !1));
    }
    this.geometry = Fi, this.material = t, this.center = new tt(0.5, 0.5);
  }
  raycast(t, e) {
    t.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), Bi.setFromMatrixScale(this.matrixWorld), Ku.copy(t.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse, this.matrixWorld), ki.setFromMatrixPosition(this.modelViewMatrix), t.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && Bi.multiplyScalar(-ki.z);
    const n = this.material.rotation;
    let s, r;
    n !== 0 && (r = Math.cos(n), s = Math.sin(n));
    const o = this.center;
    Rr(Ar.set(-0.5, -0.5, 0), ki, o, Bi, s, r), Rr(bs.set(0.5, -0.5, 0), ki, o, Bi, s, r), Rr(wr.set(0.5, 0.5, 0), ki, o, Bi, s, r), lh.set(0, 0), Zo.set(1, 0), ch.set(1, 1);
    let a = t.ray.intersectTriangle(Ar, bs, wr, !1, Ss);
    if (a === null && (Rr(bs.set(-0.5, 0.5, 0), ki, o, Bi, s, r), Zo.set(0, 1), a = t.ray.intersectTriangle(Ar, wr, bs, !1, Ss), a === null))
      return;
    const l = t.ray.origin.distanceTo(Ss);
    l < t.near || l > t.far || e.push({
      distance: l,
      point: Ss.clone(),
      uv: sn.getInterpolation(Ss, Ar, bs, wr, lh, Zo, ch, new tt()),
      face: null,
      object: this
    });
  }
  copy(t, e) {
    return super.copy(t, e), t.center !== void 0 && this.center.copy(t.center), this.material = t.material, this;
  }
}
function Rr(i, t, e, n, s, r) {
  zi.subVectors(i, e).addScalar(0.5).multiply(n), s !== void 0 ? (Es.x = r * zi.x - s * zi.y, Es.y = s * zi.x + r * zi.y) : Es.copy(zi), i.copy(t), i.x += Es.x, i.y += Es.y, i.applyMatrix4(Ku);
}
const hh = /* @__PURE__ */ new R(), uh = /* @__PURE__ */ new Zt(), dh = /* @__PURE__ */ new Zt(), mv = /* @__PURE__ */ new R(), fh = /* @__PURE__ */ new Dt(), Cr = /* @__PURE__ */ new R(), Jo = /* @__PURE__ */ new Mn(), ph = /* @__PURE__ */ new Dt(), Qo = /* @__PURE__ */ new us();
class gv extends xe {
  constructor(t, e) {
    super(t, e), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = pc, this.bindMatrix = new Dt(), this.bindMatrixInverse = new Dt(), this.boundingBox = null, this.boundingSphere = null;
  }
  computeBoundingBox() {
    const t = this.geometry;
    this.boundingBox === null && (this.boundingBox = new je()), this.boundingBox.makeEmpty();
    const e = t.getAttribute("position");
    for (let n = 0; n < e.count; n++)
      this.getVertexPosition(n, Cr), this.boundingBox.expandByPoint(Cr);
  }
  computeBoundingSphere() {
    const t = this.geometry;
    this.boundingSphere === null && (this.boundingSphere = new Mn()), this.boundingSphere.makeEmpty();
    const e = t.getAttribute("position");
    for (let n = 0; n < e.count; n++)
      this.getVertexPosition(n, Cr), this.boundingSphere.expandByPoint(Cr);
  }
  copy(t, e) {
    return super.copy(t, e), this.bindMode = t.bindMode, this.bindMatrix.copy(t.bindMatrix), this.bindMatrixInverse.copy(t.bindMatrixInverse), this.skeleton = t.skeleton, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this;
  }
  raycast(t, e) {
    const n = this.material, s = this.matrixWorld;
    n !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Jo.copy(this.boundingSphere), Jo.applyMatrix4(s), t.ray.intersectsSphere(Jo) !== !1 && (ph.copy(s).invert(), Qo.copy(t.ray).applyMatrix4(ph), !(this.boundingBox !== null && Qo.intersectsBox(this.boundingBox) === !1) && this._computeIntersections(t, e, Qo)));
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
    super.updateMatrixWorld(t), this.bindMode === pc ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === Af ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
  }
  applyBoneTransform(t, e) {
    const n = this.skeleton, s = this.geometry;
    uh.fromBufferAttribute(s.attributes.skinIndex, t), dh.fromBufferAttribute(s.attributes.skinWeight, t), hh.copy(e).applyMatrix4(this.bindMatrix), e.set(0, 0, 0);
    for (let r = 0; r < 4; r++) {
      const o = dh.getComponent(r);
      if (o !== 0) {
        const a = uh.getComponent(r);
        fh.multiplyMatrices(n.bones[a].matrixWorld, n.boneInverses[a]), e.addScaledVector(mv.copy(hh).applyMatrix4(fh), o);
      }
    }
    return e.applyMatrix4(this.bindMatrixInverse);
  }
}
class Zu extends me {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}
class Ju extends Ae {
  constructor(t = null, e = 1, n = 1, s, r, o, a, l, c = Ve, h = Ve, u, d) {
    super(null, o, a, l, c, h, s, r, u, d), this.isDataTexture = !0, this.image = { data: t, width: e, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const mh = /* @__PURE__ */ new Dt(), _v = /* @__PURE__ */ new Dt();
class Cl {
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
      const a = t[r] ? t[r].matrixWorld : _v;
      mh.multiplyMatrices(a, e[r]), mh.toArray(n, r * 16);
    }
    s !== null && (s.needsUpdate = !0);
  }
  clone() {
    return new Cl(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let t = Math.sqrt(this.bones.length * 4);
    t = Math.ceil(t / 4) * 4, t = Math.max(t, 4);
    const e = new Float32Array(t * t * 4);
    e.set(this.boneMatrices);
    const n = new Ju(e, t, t, rn, mn);
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
      o === void 0 && (console.warn("THREE.Skeleton: No bone found with UUID:", r), o = new Zu()), this.bones.push(o), this.boneInverses.push(new Dt().fromArray(t.boneInverses[n]));
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
class Qa extends De {
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
const Hi = /* @__PURE__ */ new Dt(), gh = /* @__PURE__ */ new Dt(), Pr = [], _h = /* @__PURE__ */ new je(), vv = /* @__PURE__ */ new Dt(), Ts = /* @__PURE__ */ new xe(), As = /* @__PURE__ */ new Mn();
class xv extends xe {
  constructor(t, e, n) {
    super(t, e), this.isInstancedMesh = !0, this.instanceMatrix = new Qa(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
    for (let s = 0; s < n; s++)
      this.setMatrixAt(s, vv);
  }
  computeBoundingBox() {
    const t = this.geometry, e = this.count;
    this.boundingBox === null && (this.boundingBox = new je()), t.boundingBox === null && t.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < e; n++)
      this.getMatrixAt(n, Hi), _h.copy(t.boundingBox).applyMatrix4(Hi), this.boundingBox.union(_h);
  }
  computeBoundingSphere() {
    const t = this.geometry, e = this.count;
    this.boundingSphere === null && (this.boundingSphere = new Mn()), t.boundingSphere === null && t.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < e; n++)
      this.getMatrixAt(n, Hi), As.copy(t.boundingSphere).applyMatrix4(Hi), this.boundingSphere.union(As);
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
    if (Ts.geometry = this.geometry, Ts.material = this.material, Ts.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), As.copy(this.boundingSphere), As.applyMatrix4(n), t.ray.intersectsSphere(As) !== !1))
      for (let r = 0; r < s; r++) {
        this.getMatrixAt(r, Hi), gh.multiplyMatrices(n, Hi), Ts.matrixWorld = gh, Ts.raycast(t, Pr);
        for (let o = 0, a = Pr.length; o < a; o++) {
          const l = Pr[o];
          l.instanceId = r, l.object = this, e.push(l);
        }
        Pr.length = 0;
      }
  }
  setColorAt(t, e) {
    this.instanceColor === null && (this.instanceColor = new Qa(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), e.toArray(this.instanceColor.array, t * 3);
  }
  setMatrixAt(t, e) {
    e.toArray(this.instanceMatrix.array, t * 16);
  }
  setMorphAt(t, e) {
    const n = e.morphTargetInfluences, s = n.length + 1;
    this.morphTexture === null && (this.morphTexture = new Ju(new Float32Array(s * this.count), s, this.count, xl, mn));
    const r = this.morphTexture.source.data.data;
    let o = 0;
    for (let c = 0; c < n.length; c++)
      o += n[c];
    const a = this.geometry.morphTargetsRelative ? 1 : 1 - o, l = s * t;
    r[l] = a, r.set(n, l + 1);
  }
  updateMorphTargets() {
  }
  dispose() {
    return this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null), this;
  }
}
class po extends gn {
  constructor(t) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Tt(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this.fog = t.fog, this;
  }
}
const io = /* @__PURE__ */ new R(), so = /* @__PURE__ */ new R(), vh = /* @__PURE__ */ new Dt(), ws = /* @__PURE__ */ new us(), Lr = /* @__PURE__ */ new Mn(), ta = /* @__PURE__ */ new R(), xh = /* @__PURE__ */ new R();
class Pl extends me {
  constructor(t = new Le(), e = new po()) {
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
      t.setAttribute("lineDistance", new ue(n, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.matrixWorld, r = t.params.Line.threshold, o = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Lr.copy(n.boundingSphere), Lr.applyMatrix4(s), Lr.radius += r, t.ray.intersectsSphere(Lr) === !1) return;
    vh.copy(s).invert(), ws.copy(t.ray).applyMatrix4(vh);
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = a * a, c = this.isLineSegments ? 2 : 1, h = n.index, d = n.attributes.position;
    if (h !== null) {
      const f = Math.max(0, o.start), g = Math.min(h.count, o.start + o.count);
      for (let _ = f, p = g - 1; _ < p; _ += c) {
        const m = h.getX(_), y = h.getX(_ + 1), v = Ir(this, t, ws, l, m, y);
        v && e.push(v);
      }
      if (this.isLineLoop) {
        const _ = h.getX(g - 1), p = h.getX(f), m = Ir(this, t, ws, l, _, p);
        m && e.push(m);
      }
    } else {
      const f = Math.max(0, o.start), g = Math.min(d.count, o.start + o.count);
      for (let _ = f, p = g - 1; _ < p; _ += c) {
        const m = Ir(this, t, ws, l, _, _ + 1);
        m && e.push(m);
      }
      if (this.isLineLoop) {
        const _ = Ir(this, t, ws, l, g - 1, f);
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
function Ir(i, t, e, n, s, r) {
  const o = i.geometry.attributes.position;
  if (io.fromBufferAttribute(o, s), so.fromBufferAttribute(o, r), e.distanceSqToSegment(io, so, ta, xh) > n) return;
  ta.applyMatrix4(i.matrixWorld);
  const l = t.ray.origin.distanceTo(ta);
  if (!(l < t.near || l > t.far))
    return {
      distance: l,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: xh.clone().applyMatrix4(i.matrixWorld),
      index: s,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i
    };
}
const yh = /* @__PURE__ */ new R(), Mh = /* @__PURE__ */ new R();
class Ll extends Pl {
  constructor(t, e) {
    super(t, e), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position, n = [];
      for (let s = 0, r = e.count; s < r; s += 2)
        yh.fromBufferAttribute(e, s), Mh.fromBufferAttribute(e, s + 1), n[s] = s === 0 ? 0 : n[s - 1], n[s + 1] = n[s] + yh.distanceTo(Mh);
      t.setAttribute("lineDistance", new ue(n, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class yv extends Pl {
  constructor(t, e) {
    super(t, e), this.isLineLoop = !0, this.type = "LineLoop";
  }
}
class Qu extends gn {
  constructor(t) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Tt(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
  }
}
const Sh = /* @__PURE__ */ new Dt(), tl = /* @__PURE__ */ new us(), Dr = /* @__PURE__ */ new Mn(), Nr = /* @__PURE__ */ new R();
class Mv extends me {
  constructor(t = new Le(), e = new Qu()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.matrixWorld, r = t.params.Points.threshold, o = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Dr.copy(n.boundingSphere), Dr.applyMatrix4(s), Dr.radius += r, t.ray.intersectsSphere(Dr) === !1) return;
    Sh.copy(s).invert(), tl.copy(t.ray).applyMatrix4(Sh);
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), l = a * a, c = n.index, u = n.attributes.position;
    if (c !== null) {
      const d = Math.max(0, o.start), f = Math.min(c.count, o.start + o.count);
      for (let g = d, _ = f; g < _; g++) {
        const p = c.getX(g);
        Nr.fromBufferAttribute(u, p), Eh(Nr, p, l, s, t, e, this);
      }
    } else {
      const d = Math.max(0, o.start), f = Math.min(u.count, o.start + o.count);
      for (let g = d, _ = f; g < _; g++)
        Nr.fromBufferAttribute(u, g), Eh(Nr, g, l, s, t, e, this);
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
function Eh(i, t, e, n, s, r, o) {
  const a = tl.distanceSqToPoint(i);
  if (a < e) {
    const l = new R();
    tl.closestPointToPoint(i, l), l.applyMatrix4(n);
    const c = s.ray.origin.distanceTo(l);
    if (c < s.near || c > s.far) return;
    r.push({
      distance: c,
      distanceToRay: Math.sqrt(a),
      point: l,
      index: t,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: o
    });
  }
}
class Sv extends Ae {
  constructor(t, e, n, s, r, o, a, l, c) {
    super(t, e, n, s, r, o, a, l, c), this.isCanvasTexture = !0, this.needsUpdate = !0;
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
    let a = 0, l = r - 1, c;
    for (; a <= l; )
      if (s = Math.floor(a + (l - a) / 2), c = n[s] - o, c < 0)
        a = s + 1;
      else if (c > 0)
        l = s - 1;
      else {
        l = s;
        break;
      }
    if (s = l, n[s] === o)
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
    const o = this.getPoint(s), a = this.getPoint(r), l = e || (o.isVector2 ? new tt() : new R());
    return l.copy(a).sub(o).normalize(), l;
  }
  getTangentAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getTangent(n, e);
  }
  computeFrenetFrames(t, e) {
    const n = new R(), s = [], r = [], o = [], a = new R(), l = new Dt();
    for (let f = 0; f <= t; f++) {
      const g = f / t;
      s[f] = this.getTangentAt(g, new R());
    }
    r[0] = new R(), o[0] = new R();
    let c = Number.MAX_VALUE;
    const h = Math.abs(s[0].x), u = Math.abs(s[0].y), d = Math.abs(s[0].z);
    h <= c && (c = h, n.set(1, 0, 0)), u <= c && (c = u, n.set(0, 1, 0)), d <= c && n.set(0, 0, 1), a.crossVectors(s[0], n).normalize(), r[0].crossVectors(s[0], a), o[0].crossVectors(s[0], r[0]);
    for (let f = 1; f <= t; f++) {
      if (r[f] = r[f - 1].clone(), o[f] = o[f - 1].clone(), a.crossVectors(s[f - 1], s[f]), a.length() > Number.EPSILON) {
        a.normalize();
        const g = Math.acos(Te(s[f - 1].dot(s[f]), -1, 1));
        r[f].applyMatrix4(l.makeRotationAxis(a, g));
      }
      o[f].crossVectors(s[f], r[f]);
    }
    if (e === !0) {
      let f = Math.acos(Te(r[0].dot(r[t]), -1, 1));
      f /= t, s[0].dot(a.crossVectors(r[0], r[t])) > 0 && (f = -f);
      for (let g = 1; g <= t; g++)
        r[g].applyMatrix4(l.makeRotationAxis(s[g], f * g)), o[g].crossVectors(s[g], r[g]);
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
class Il extends Sn {
  constructor(t = 0, e = 0, n = 1, s = 1, r = 0, o = Math.PI * 2, a = !1, l = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = s, this.aStartAngle = r, this.aEndAngle = o, this.aClockwise = a, this.aRotation = l;
  }
  getPoint(t, e = new tt()) {
    const n = e, s = Math.PI * 2;
    let r = this.aEndAngle - this.aStartAngle;
    const o = Math.abs(r) < Number.EPSILON;
    for (; r < 0; ) r += s;
    for (; r > s; ) r -= s;
    r < Number.EPSILON && (o ? r = 0 : r = s), this.aClockwise === !0 && !o && (r === s ? r = -s : r = r - s);
    const a = this.aStartAngle + t * r;
    let l = this.aX + this.xRadius * Math.cos(a), c = this.aY + this.yRadius * Math.sin(a);
    if (this.aRotation !== 0) {
      const h = Math.cos(this.aRotation), u = Math.sin(this.aRotation), d = l - this.aX, f = c - this.aY;
      l = d * h - f * u + this.aX, c = d * u + f * h + this.aY;
    }
    return n.set(l, c);
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
class Ev extends Il {
  constructor(t, e, n, s, r, o) {
    super(t, e, n, n, s, r, o), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Dl() {
  let i = 0, t = 0, e = 0, n = 0;
  function s(r, o, a, l) {
    i = r, t = a, e = -3 * r + 3 * o - 2 * a - l, n = 2 * r - 2 * o + a + l;
  }
  return {
    initCatmullRom: function(r, o, a, l, c) {
      s(o, a, c * (a - r), c * (l - o));
    },
    initNonuniformCatmullRom: function(r, o, a, l, c, h, u) {
      let d = (o - r) / c - (a - r) / (c + h) + (a - o) / h, f = (a - o) / h - (l - o) / (h + u) + (l - a) / u;
      d *= h, f *= h, s(o, a, d, f);
    },
    calc: function(r) {
      const o = r * r, a = o * r;
      return i + t * r + e * o + n * a;
    }
  };
}
const Ur = /* @__PURE__ */ new R(), ea = /* @__PURE__ */ new Dl(), na = /* @__PURE__ */ new Dl(), ia = /* @__PURE__ */ new Dl();
class bv extends Sn {
  constructor(t = [], e = !1, n = "centripetal", s = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = t, this.closed = e, this.curveType = n, this.tension = s;
  }
  getPoint(t, e = new R()) {
    const n = e, s = this.points, r = s.length, o = (r - (this.closed ? 0 : 1)) * t;
    let a = Math.floor(o), l = o - a;
    this.closed ? a += a > 0 ? 0 : (Math.floor(Math.abs(a) / r) + 1) * r : l === 0 && a === r - 1 && (a = r - 2, l = 1);
    let c, h;
    this.closed || a > 0 ? c = s[(a - 1) % r] : (Ur.subVectors(s[0], s[1]).add(s[0]), c = Ur);
    const u = s[a % r], d = s[(a + 1) % r];
    if (this.closed || a + 2 < r ? h = s[(a + 2) % r] : (Ur.subVectors(s[r - 1], s[r - 2]).add(s[r - 1]), h = Ur), this.curveType === "centripetal" || this.curveType === "chordal") {
      const f = this.curveType === "chordal" ? 0.5 : 0.25;
      let g = Math.pow(c.distanceToSquared(u), f), _ = Math.pow(u.distanceToSquared(d), f), p = Math.pow(d.distanceToSquared(h), f);
      _ < 1e-4 && (_ = 1), g < 1e-4 && (g = _), p < 1e-4 && (p = _), ea.initNonuniformCatmullRom(c.x, u.x, d.x, h.x, g, _, p), na.initNonuniformCatmullRom(c.y, u.y, d.y, h.y, g, _, p), ia.initNonuniformCatmullRom(c.z, u.z, d.z, h.z, g, _, p);
    } else this.curveType === "catmullrom" && (ea.initCatmullRom(c.x, u.x, d.x, h.x, this.tension), na.initCatmullRom(c.y, u.y, d.y, h.y, this.tension), ia.initCatmullRom(c.z, u.z, d.z, h.z, this.tension));
    return n.set(
      ea.calc(l),
      na.calc(l),
      ia.calc(l)
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
      this.points.push(new R().fromArray(s));
    }
    return this.closed = t.closed, this.curveType = t.curveType, this.tension = t.tension, this;
  }
}
function bh(i, t, e, n, s) {
  const r = (n - t) * 0.5, o = (s - e) * 0.5, a = i * i, l = i * a;
  return (2 * e - 2 * n + r + o) * l + (-3 * e + 3 * n - 2 * r - o) * a + r * i + e;
}
function Tv(i, t) {
  const e = 1 - i;
  return e * e * t;
}
function Av(i, t) {
  return 2 * (1 - i) * i * t;
}
function wv(i, t) {
  return i * i * t;
}
function Fs(i, t, e, n) {
  return Tv(i, t) + Av(i, e) + wv(i, n);
}
function Rv(i, t) {
  const e = 1 - i;
  return e * e * e * t;
}
function Cv(i, t) {
  const e = 1 - i;
  return 3 * e * e * i * t;
}
function Pv(i, t) {
  return 3 * (1 - i) * i * i * t;
}
function Lv(i, t) {
  return i * i * i * t;
}
function Bs(i, t, e, n, s) {
  return Rv(i, t) + Cv(i, e) + Pv(i, n) + Lv(i, s);
}
class td extends Sn {
  constructor(t = new tt(), e = new tt(), n = new tt(), s = new tt()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
  }
  getPoint(t, e = new tt()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2, a = this.v3;
    return n.set(
      Bs(t, s.x, r.x, o.x, a.x),
      Bs(t, s.y, r.y, o.y, a.y)
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
class Iv extends Sn {
  constructor(t = new R(), e = new R(), n = new R(), s = new R()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
  }
  getPoint(t, e = new R()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2, a = this.v3;
    return n.set(
      Bs(t, s.x, r.x, o.x, a.x),
      Bs(t, s.y, r.y, o.y, a.y),
      Bs(t, s.z, r.z, o.z, a.z)
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
class ed extends Sn {
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
class Dv extends Sn {
  constructor(t = new R(), e = new R()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new R()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new R()) {
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
class nd extends Sn {
  constructor(t = new tt(), e = new tt(), n = new tt()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new tt()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2;
    return n.set(
      Fs(t, s.x, r.x, o.x),
      Fs(t, s.y, r.y, o.y)
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
class Nv extends Sn {
  constructor(t = new R(), e = new R(), n = new R()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new R()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2;
    return n.set(
      Fs(t, s.x, r.x, o.x),
      Fs(t, s.y, r.y, o.y),
      Fs(t, s.z, r.z, o.z)
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
class id extends Sn {
  constructor(t = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = t;
  }
  getPoint(t, e = new tt()) {
    const n = e, s = this.points, r = (s.length - 1) * t, o = Math.floor(r), a = r - o, l = s[o === 0 ? o : o - 1], c = s[o], h = s[o > s.length - 2 ? s.length - 1 : o + 1], u = s[o > s.length - 3 ? s.length - 1 : o + 2];
    return n.set(
      bh(a, l.x, c.x, h.x, u.x),
      bh(a, l.y, c.y, h.y, u.y)
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
var Th = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: Ev,
  CatmullRomCurve3: bv,
  CubicBezierCurve: td,
  CubicBezierCurve3: Iv,
  EllipseCurve: Il,
  LineCurve: ed,
  LineCurve3: Dv,
  QuadraticBezierCurve: nd,
  QuadraticBezierCurve3: Nv,
  SplineCurve: id
});
class Uv extends Sn {
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
      this.curves.push(new Th[n](e, t));
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
        const o = s[r] - n, a = this.curves[r], l = a.getLength(), c = l === 0 ? 0 : 1 - o / l;
        return a.getPointAt(c, e);
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
      const o = r[s], a = o.isEllipseCurve ? t * 2 : o.isLineCurve || o.isLineCurve3 ? 1 : o.isSplineCurve ? t * o.points.length : t, l = o.getPoints(a);
      for (let c = 0; c < l.length; c++) {
        const h = l[c];
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
      this.curves.push(new Th[s.type]().fromJSON(s));
    }
    return this;
  }
}
class Ah extends Uv {
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
    const n = new ed(this.currentPoint.clone(), new tt(t, e));
    return this.curves.push(n), this.currentPoint.set(t, e), this;
  }
  quadraticCurveTo(t, e, n, s) {
    const r = new nd(
      this.currentPoint.clone(),
      new tt(t, e),
      new tt(n, s)
    );
    return this.curves.push(r), this.currentPoint.set(n, s), this;
  }
  bezierCurveTo(t, e, n, s, r, o) {
    const a = new td(
      this.currentPoint.clone(),
      new tt(t, e),
      new tt(n, s),
      new tt(r, o)
    );
    return this.curves.push(a), this.currentPoint.set(r, o), this;
  }
  splineThru(t) {
    const e = [this.currentPoint.clone()].concat(t), n = new id(e);
    return this.curves.push(n), this.currentPoint.copy(t[t.length - 1]), this;
  }
  arc(t, e, n, s, r, o) {
    const a = this.currentPoint.x, l = this.currentPoint.y;
    return this.absarc(
      t + a,
      e + l,
      n,
      s,
      r,
      o
    ), this;
  }
  absarc(t, e, n, s, r, o) {
    return this.absellipse(t, e, n, n, s, r, o), this;
  }
  ellipse(t, e, n, s, r, o, a, l) {
    const c = this.currentPoint.x, h = this.currentPoint.y;
    return this.absellipse(t + c, e + h, n, s, r, o, a, l), this;
  }
  absellipse(t, e, n, s, r, o, a, l) {
    const c = new Il(t, e, n, s, r, o, a, l);
    if (this.curves.length > 0) {
      const u = c.getPoint(0);
      u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
    }
    this.curves.push(c);
    const h = c.getPoint(1);
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
class Nl extends Le {
  constructor(t = 1, e = 1, n = 1, s = 32, r = 1, o = !1, a = 0, l = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: t,
      radiusBottom: e,
      height: n,
      radialSegments: s,
      heightSegments: r,
      openEnded: o,
      thetaStart: a,
      thetaLength: l
    };
    const c = this;
    s = Math.floor(s), r = Math.floor(r);
    const h = [], u = [], d = [], f = [];
    let g = 0;
    const _ = [], p = n / 2;
    let m = 0;
    y(), o === !1 && (t > 0 && v(!0), e > 0 && v(!1)), this.setIndex(h), this.setAttribute("position", new ue(u, 3)), this.setAttribute("normal", new ue(d, 3)), this.setAttribute("uv", new ue(f, 2));
    function y() {
      const M = new R(), P = new R();
      let w = 0;
      const A = (e - t) / n;
      for (let L = 0; L <= r; L++) {
        const G = [], x = L / r, b = x * (e - t) + t;
        for (let B = 0; B <= s; B++) {
          const k = B / s, H = k * l + a, K = Math.sin(H), z = Math.cos(H);
          P.x = b * K, P.y = -x * n + p, P.z = b * z, u.push(P.x, P.y, P.z), M.set(K, A, z).normalize(), d.push(M.x, M.y, M.z), f.push(k, 1 - x), G.push(g++);
        }
        _.push(G);
      }
      for (let L = 0; L < s; L++)
        for (let G = 0; G < r; G++) {
          const x = _[G][L], b = _[G + 1][L], B = _[G + 1][L + 1], k = _[G][L + 1];
          t > 0 && (h.push(x, b, k), w += 3), e > 0 && (h.push(b, B, k), w += 3);
        }
      c.addGroup(m, w, 0), m += w;
    }
    function v(M) {
      const P = g, w = new tt(), A = new R();
      let L = 0;
      const G = M === !0 ? t : e, x = M === !0 ? 1 : -1;
      for (let B = 1; B <= s; B++)
        u.push(0, p * x, 0), d.push(0, x, 0), f.push(0.5, 0.5), g++;
      const b = g;
      for (let B = 0; B <= s; B++) {
        const H = B / s * l + a, K = Math.cos(H), z = Math.sin(H);
        A.x = G * z, A.y = p * x, A.z = G * K, u.push(A.x, A.y, A.z), d.push(0, x, 0), w.x = K * 0.5 + 0.5, w.y = z * 0.5 * x + 0.5, f.push(w.x, w.y), g++;
      }
      for (let B = 0; B < s; B++) {
        const k = P + B, H = b + B;
        M === !0 ? h.push(H, H + 1, k) : h.push(H + 1, H, k), L += 3;
      }
      c.addGroup(m, L, M === !0 ? 1 : 2), m += L;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Nl(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}
class Ul extends Le {
  constructor(t = [], e = [], n = 1, s = 0) {
    super(), this.type = "PolyhedronGeometry", this.parameters = {
      vertices: t,
      indices: e,
      radius: n,
      detail: s
    };
    const r = [], o = [];
    a(s), c(n), h(), this.setAttribute("position", new ue(r, 3)), this.setAttribute("normal", new ue(r.slice(), 3)), this.setAttribute("uv", new ue(o, 2)), s === 0 ? this.computeVertexNormals() : this.normalizeNormals();
    function a(y) {
      const v = new R(), M = new R(), P = new R();
      for (let w = 0; w < e.length; w += 3)
        f(e[w + 0], v), f(e[w + 1], M), f(e[w + 2], P), l(v, M, P, y);
    }
    function l(y, v, M, P) {
      const w = P + 1, A = [];
      for (let L = 0; L <= w; L++) {
        A[L] = [];
        const G = y.clone().lerp(M, L / w), x = v.clone().lerp(M, L / w), b = w - L;
        for (let B = 0; B <= b; B++)
          B === 0 && L === w ? A[L][B] = G : A[L][B] = G.clone().lerp(x, B / b);
      }
      for (let L = 0; L < w; L++)
        for (let G = 0; G < 2 * (w - L) - 1; G++) {
          const x = Math.floor(G / 2);
          G % 2 === 0 ? (d(A[L][x + 1]), d(A[L + 1][x]), d(A[L][x])) : (d(A[L][x + 1]), d(A[L + 1][x + 1]), d(A[L + 1][x]));
        }
    }
    function c(y) {
      const v = new R();
      for (let M = 0; M < r.length; M += 3)
        v.x = r[M + 0], v.y = r[M + 1], v.z = r[M + 2], v.normalize().multiplyScalar(y), r[M + 0] = v.x, r[M + 1] = v.y, r[M + 2] = v.z;
    }
    function h() {
      const y = new R();
      for (let v = 0; v < r.length; v += 3) {
        y.x = r[v + 0], y.y = r[v + 1], y.z = r[v + 2];
        const M = p(y) / 2 / Math.PI + 0.5, P = m(y) / Math.PI + 0.5;
        o.push(M, 1 - P);
      }
      g(), u();
    }
    function u() {
      for (let y = 0; y < o.length; y += 6) {
        const v = o[y + 0], M = o[y + 2], P = o[y + 4], w = Math.max(v, M, P), A = Math.min(v, M, P);
        w > 0.9 && A < 0.1 && (v < 0.2 && (o[y + 0] += 1), M < 0.2 && (o[y + 2] += 1), P < 0.2 && (o[y + 4] += 1));
      }
    }
    function d(y) {
      r.push(y.x, y.y, y.z);
    }
    function f(y, v) {
      const M = y * 3;
      v.x = t[M + 0], v.y = t[M + 1], v.z = t[M + 2];
    }
    function g() {
      const y = new R(), v = new R(), M = new R(), P = new R(), w = new tt(), A = new tt(), L = new tt();
      for (let G = 0, x = 0; G < r.length; G += 9, x += 6) {
        y.set(r[G + 0], r[G + 1], r[G + 2]), v.set(r[G + 3], r[G + 4], r[G + 5]), M.set(r[G + 6], r[G + 7], r[G + 8]), w.set(o[x + 0], o[x + 1]), A.set(o[x + 2], o[x + 3]), L.set(o[x + 4], o[x + 5]), P.copy(y).add(v).add(M).divideScalar(3);
        const b = p(P);
        _(w, x + 0, y, b), _(A, x + 2, v, b), _(L, x + 4, M, b);
      }
    }
    function _(y, v, M, P) {
      P < 0 && y.x === 1 && (o[v] = y.x - 1), M.x === 0 && M.z === 0 && (o[v] = P / 2 / Math.PI + 0.5);
    }
    function p(y) {
      return Math.atan2(y.z, -y.x);
    }
    function m(y) {
      return Math.atan2(-y.y, Math.sqrt(y.x * y.x + y.z * y.z));
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Ul(t.vertices, t.indices, t.radius, t.details);
  }
}
class sd extends Ah {
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
      this.holes.push(new Ah().fromJSON(s));
    }
    return this;
  }
}
const Ov = {
  triangulate: function(i, t, e = 2) {
    const n = t && t.length, s = n ? t[0] * e : i.length;
    let r = rd(i, 0, s, e, !0);
    const o = [];
    if (!r || r.next === r.prev) return o;
    let a, l, c, h, u, d, f;
    if (n && (r = Hv(i, t, r, e)), i.length > 80 * e) {
      a = c = i[0], l = h = i[1];
      for (let g = e; g < s; g += e)
        u = i[g], d = i[g + 1], u < a && (a = u), d < l && (l = d), u > c && (c = u), d > h && (h = d);
      f = Math.max(c - a, h - l), f = f !== 0 ? 32767 / f : 0;
    }
    return Ys(r, o, e, a, l, f, 0), o;
  }
};
function rd(i, t, e, n, s) {
  let r, o;
  if (s === Jv(i, t, e, n) > 0)
    for (r = t; r < e; r += n) o = wh(r, i[r], i[r + 1], o);
  else
    for (r = e - n; r >= t; r -= n) o = wh(r, i[r], i[r + 1], o);
  return o && mo(o, o.next) && (Zs(o), o = o.next), o;
}
function yi(i, t) {
  if (!i) return i;
  t || (t = i);
  let e = i, n;
  do
    if (n = !1, !e.steiner && (mo(e, e.next) || _e(e.prev, e, e.next) === 0)) {
      if (Zs(e), e = t = e.prev, e === e.next) break;
      n = !0;
    } else
      e = e.next;
  while (n || e !== t);
  return t;
}
function Ys(i, t, e, n, s, r, o) {
  if (!i) return;
  !o && r && $v(i, n, s, r);
  let a = i, l, c;
  for (; i.prev !== i.next; ) {
    if (l = i.prev, c = i.next, r ? Bv(i, n, s, r) : Fv(i)) {
      t.push(l.i / e | 0), t.push(i.i / e | 0), t.push(c.i / e | 0), Zs(i), i = c.next, a = c.next;
      continue;
    }
    if (i = c, i === a) {
      o ? o === 1 ? (i = kv(yi(i), t, e), Ys(i, t, e, n, s, r, 2)) : o === 2 && zv(i, t, e, n, s, r) : Ys(yi(i), t, e, n, s, r, 1);
      break;
    }
  }
}
function Fv(i) {
  const t = i.prev, e = i, n = i.next;
  if (_e(t, e, n) >= 0) return !1;
  const s = t.x, r = e.x, o = n.x, a = t.y, l = e.y, c = n.y, h = s < r ? s < o ? s : o : r < o ? r : o, u = a < l ? a < c ? a : c : l < c ? l : c, d = s > r ? s > o ? s : o : r > o ? r : o, f = a > l ? a > c ? a : c : l > c ? l : c;
  let g = n.next;
  for (; g !== t; ) {
    if (g.x >= h && g.x <= d && g.y >= u && g.y <= f && Xi(s, a, r, l, o, c, g.x, g.y) && _e(g.prev, g, g.next) >= 0) return !1;
    g = g.next;
  }
  return !0;
}
function Bv(i, t, e, n) {
  const s = i.prev, r = i, o = i.next;
  if (_e(s, r, o) >= 0) return !1;
  const a = s.x, l = r.x, c = o.x, h = s.y, u = r.y, d = o.y, f = a < l ? a < c ? a : c : l < c ? l : c, g = h < u ? h < d ? h : d : u < d ? u : d, _ = a > l ? a > c ? a : c : l > c ? l : c, p = h > u ? h > d ? h : d : u > d ? u : d, m = el(f, g, t, e, n), y = el(_, p, t, e, n);
  let v = i.prevZ, M = i.nextZ;
  for (; v && v.z >= m && M && M.z <= y; ) {
    if (v.x >= f && v.x <= _ && v.y >= g && v.y <= p && v !== s && v !== o && Xi(a, h, l, u, c, d, v.x, v.y) && _e(v.prev, v, v.next) >= 0 || (v = v.prevZ, M.x >= f && M.x <= _ && M.y >= g && M.y <= p && M !== s && M !== o && Xi(a, h, l, u, c, d, M.x, M.y) && _e(M.prev, M, M.next) >= 0)) return !1;
    M = M.nextZ;
  }
  for (; v && v.z >= m; ) {
    if (v.x >= f && v.x <= _ && v.y >= g && v.y <= p && v !== s && v !== o && Xi(a, h, l, u, c, d, v.x, v.y) && _e(v.prev, v, v.next) >= 0) return !1;
    v = v.prevZ;
  }
  for (; M && M.z <= y; ) {
    if (M.x >= f && M.x <= _ && M.y >= g && M.y <= p && M !== s && M !== o && Xi(a, h, l, u, c, d, M.x, M.y) && _e(M.prev, M, M.next) >= 0) return !1;
    M = M.nextZ;
  }
  return !0;
}
function kv(i, t, e) {
  let n = i;
  do {
    const s = n.prev, r = n.next.next;
    !mo(s, r) && od(s, n, n.next, r) && Ks(s, r) && Ks(r, s) && (t.push(s.i / e | 0), t.push(n.i / e | 0), t.push(r.i / e | 0), Zs(n), Zs(n.next), n = i = r), n = n.next;
  } while (n !== i);
  return yi(n);
}
function zv(i, t, e, n, s, r) {
  let o = i;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && Yv(o, a)) {
        let l = ad(o, a);
        o = yi(o, o.next), l = yi(l, l.next), Ys(o, t, e, n, s, r, 0), Ys(l, t, e, n, s, r, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== i);
}
function Hv(i, t, e, n) {
  const s = [];
  let r, o, a, l, c;
  for (r = 0, o = t.length; r < o; r++)
    a = t[r] * n, l = r < o - 1 ? t[r + 1] * n : i.length, c = rd(i, a, l, n, !1), c === c.next && (c.steiner = !0), s.push(qv(c));
  for (s.sort(Vv), r = 0; r < s.length; r++)
    e = Gv(s[r], e);
  return e;
}
function Vv(i, t) {
  return i.x - t.x;
}
function Gv(i, t) {
  const e = Wv(i, t);
  if (!e)
    return t;
  const n = ad(e, i);
  return yi(n, n.next), yi(e, e.next);
}
function Wv(i, t) {
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
  const a = s, l = s.x, c = s.y;
  let h = 1 / 0, u;
  e = s;
  do
    r >= e.x && e.x >= l && r !== e.x && Xi(o < c ? r : n, o, l, c, o < c ? n : r, o, e.x, e.y) && (u = Math.abs(o - e.y) / (r - e.x), Ks(e, i) && (u < h || u === h && (e.x > s.x || e.x === s.x && Xv(s, e))) && (s = e, h = u)), e = e.next;
  while (e !== a);
  return s;
}
function Xv(i, t) {
  return _e(i.prev, i, t.prev) < 0 && _e(t.next, i, i.next) < 0;
}
function $v(i, t, e, n) {
  let s = i;
  do
    s.z === 0 && (s.z = el(s.x, s.y, t, e, n)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
  while (s !== i);
  s.prevZ.nextZ = null, s.prevZ = null, jv(s);
}
function jv(i) {
  let t, e, n, s, r, o, a, l, c = 1;
  do {
    for (e = i, i = null, r = null, o = 0; e; ) {
      for (o++, n = e, a = 0, t = 0; t < c && (a++, n = n.nextZ, !!n); t++)
        ;
      for (l = c; a > 0 || l > 0 && n; )
        a !== 0 && (l === 0 || !n || e.z <= n.z) ? (s = e, e = e.nextZ, a--) : (s = n, n = n.nextZ, l--), r ? r.nextZ = s : i = s, s.prevZ = r, r = s;
      e = n;
    }
    r.nextZ = null, c *= 2;
  } while (o > 1);
  return i;
}
function el(i, t, e, n, s) {
  return i = (i - e) * s | 0, t = (t - n) * s | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, i | t << 1;
}
function qv(i) {
  let t = i, e = i;
  do
    (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
  while (t !== i);
  return e;
}
function Xi(i, t, e, n, s, r, o, a) {
  return (s - o) * (t - a) >= (i - o) * (r - a) && (i - o) * (n - a) >= (e - o) * (t - a) && (e - o) * (r - a) >= (s - o) * (n - a);
}
function Yv(i, t) {
  return i.next.i !== t.i && i.prev.i !== t.i && !Kv(i, t) && // dones't intersect other edges
  (Ks(i, t) && Ks(t, i) && Zv(i, t) && // locally visible
  (_e(i.prev, i, t.prev) || _e(i, t.prev, t)) || // does not create opposite-facing sectors
  mo(i, t) && _e(i.prev, i, i.next) > 0 && _e(t.prev, t, t.next) > 0);
}
function _e(i, t, e) {
  return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
}
function mo(i, t) {
  return i.x === t.x && i.y === t.y;
}
function od(i, t, e, n) {
  const s = Fr(_e(i, t, e)), r = Fr(_e(i, t, n)), o = Fr(_e(e, n, i)), a = Fr(_e(e, n, t));
  return !!(s !== r && o !== a || s === 0 && Or(i, e, t) || r === 0 && Or(i, n, t) || o === 0 && Or(e, i, n) || a === 0 && Or(e, t, n));
}
function Or(i, t, e) {
  return t.x <= Math.max(i.x, e.x) && t.x >= Math.min(i.x, e.x) && t.y <= Math.max(i.y, e.y) && t.y >= Math.min(i.y, e.y);
}
function Fr(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function Kv(i, t) {
  let e = i;
  do {
    if (e.i !== i.i && e.next.i !== i.i && e.i !== t.i && e.next.i !== t.i && od(e, e.next, i, t)) return !0;
    e = e.next;
  } while (e !== i);
  return !1;
}
function Ks(i, t) {
  return _e(i.prev, i, i.next) < 0 ? _e(i, t, i.next) >= 0 && _e(i, i.prev, t) >= 0 : _e(i, t, i.prev) < 0 || _e(i, i.next, t) < 0;
}
function Zv(i, t) {
  let e = i, n = !1;
  const s = (i.x + t.x) / 2, r = (i.y + t.y) / 2;
  do
    e.y > r != e.next.y > r && e.next.y !== e.y && s < (e.next.x - e.x) * (r - e.y) / (e.next.y - e.y) + e.x && (n = !n), e = e.next;
  while (e !== i);
  return n;
}
function ad(i, t) {
  const e = new nl(i.i, i.x, i.y), n = new nl(t.i, t.x, t.y), s = i.next, r = t.prev;
  return i.next = t, t.prev = i, e.next = s, s.prev = e, n.next = e, e.prev = n, r.next = n, n.prev = r, n;
}
function wh(i, t, e, n) {
  const s = new nl(i, t, e);
  return n ? (s.next = n.next, s.prev = n, n.next.prev = s, n.next = s) : (s.prev = s, s.next = s), s;
}
function Zs(i) {
  i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function nl(i, t, e) {
  this.i = i, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function Jv(i, t, e, n) {
  let s = 0;
  for (let r = t, o = e - n; r < e; r += n)
    s += (i[o] - i[r]) * (i[r + 1] + i[o + 1]), o = r;
  return s;
}
class ks {
  // calculate area of the contour polygon
  static area(t) {
    const e = t.length;
    let n = 0;
    for (let s = e - 1, r = 0; r < e; s = r++)
      n += t[s].x * t[r].y - t[r].x * t[s].y;
    return n * 0.5;
  }
  static isClockWise(t) {
    return ks.area(t) < 0;
  }
  static triangulateShape(t, e) {
    const n = [], s = [], r = [];
    Rh(t), Ch(n, t);
    let o = t.length;
    e.forEach(Rh);
    for (let l = 0; l < e.length; l++)
      s.push(o), o += e[l].length, Ch(n, e[l]);
    const a = Ov.triangulate(n, s);
    for (let l = 0; l < a.length; l += 3)
      r.push(a.slice(l, l + 3));
    return r;
  }
}
function Rh(i) {
  const t = i.length;
  t > 2 && i[t - 1].equals(i[0]) && i.pop();
}
function Ch(i, t) {
  for (let e = 0; e < t.length; e++)
    i.push(t[e].x), i.push(t[e].y);
}
class Ol extends Ul {
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
    return new Ol(t.radius, t.detail);
  }
}
class Fl extends Le {
  constructor(t = new sd([new tt(0, 0.5), new tt(-0.5, -0.5), new tt(0.5, -0.5)]), e = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: t,
      curveSegments: e
    };
    const n = [], s = [], r = [], o = [];
    let a = 0, l = 0;
    if (Array.isArray(t) === !1)
      c(t);
    else
      for (let h = 0; h < t.length; h++)
        c(t[h]), this.addGroup(a, l, h), a += l, l = 0;
    this.setIndex(n), this.setAttribute("position", new ue(s, 3)), this.setAttribute("normal", new ue(r, 3)), this.setAttribute("uv", new ue(o, 2));
    function c(h) {
      const u = s.length / 3, d = h.extractPoints(e);
      let f = d.shape;
      const g = d.holes;
      ks.isClockWise(f) === !1 && (f = f.reverse());
      for (let p = 0, m = g.length; p < m; p++) {
        const y = g[p];
        ks.isClockWise(y) === !0 && (g[p] = y.reverse());
      }
      const _ = ks.triangulateShape(f, g);
      for (let p = 0, m = g.length; p < m; p++) {
        const y = g[p];
        f = f.concat(y);
      }
      for (let p = 0, m = f.length; p < m; p++) {
        const y = f[p];
        s.push(y.x, y.y, 0), r.push(0, 0, 1), o.push(y.x, y.y);
      }
      for (let p = 0, m = _.length; p < m; p++) {
        const y = _[p], v = y[0] + u, M = y[1] + u, P = y[2] + u;
        n.push(v, M, P), l += 3;
      }
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON(), e = this.parameters.shapes;
    return Qv(e, t);
  }
  static fromJSON(t, e) {
    const n = [];
    for (let s = 0, r = t.shapes.length; s < r; s++) {
      const o = e[t.shapes[s]];
      n.push(o);
    }
    return new Fl(n, t.curveSegments);
  }
}
function Qv(i, t) {
  if (t.shapes = [], Array.isArray(i))
    for (let e = 0, n = i.length; e < n; e++) {
      const s = i[e];
      t.shapes.push(s.uuid);
    }
  else
    t.shapes.push(i.uuid);
  return t;
}
class go extends Le {
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
    const l = Math.min(o + a, Math.PI);
    let c = 0;
    const h = [], u = new R(), d = new R(), f = [], g = [], _ = [], p = [];
    for (let m = 0; m <= n; m++) {
      const y = [], v = m / n;
      let M = 0;
      m === 0 && o === 0 ? M = 0.5 / e : m === n && l === Math.PI && (M = -0.5 / e);
      for (let P = 0; P <= e; P++) {
        const w = P / e;
        u.x = -t * Math.cos(s + w * r) * Math.sin(o + v * a), u.y = t * Math.cos(o + v * a), u.z = t * Math.sin(s + w * r) * Math.sin(o + v * a), g.push(u.x, u.y, u.z), d.copy(u).normalize(), _.push(d.x, d.y, d.z), p.push(w + M, 1 - v), y.push(c++);
      }
      h.push(y);
    }
    for (let m = 0; m < n; m++)
      for (let y = 0; y < e; y++) {
        const v = h[m][y + 1], M = h[m][y], P = h[m + 1][y], w = h[m + 1][y + 1];
        (m !== 0 || o > 0) && f.push(v, M, w), (m !== n - 1 || l < Math.PI) && f.push(M, P, w);
      }
    this.setIndex(f), this.setAttribute("position", new ue(g, 3)), this.setAttribute("normal", new ue(_, 3)), this.setAttribute("uv", new ue(p, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new go(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
  }
}
class Bl extends Le {
  constructor(t = 1, e = 0.4, n = 12, s = 48, r = Math.PI * 2) {
    super(), this.type = "TorusGeometry", this.parameters = {
      radius: t,
      tube: e,
      radialSegments: n,
      tubularSegments: s,
      arc: r
    }, n = Math.floor(n), s = Math.floor(s);
    const o = [], a = [], l = [], c = [], h = new R(), u = new R(), d = new R();
    for (let f = 0; f <= n; f++)
      for (let g = 0; g <= s; g++) {
        const _ = g / s * r, p = f / n * Math.PI * 2;
        u.x = (t + e * Math.cos(p)) * Math.cos(_), u.y = (t + e * Math.cos(p)) * Math.sin(_), u.z = e * Math.sin(p), a.push(u.x, u.y, u.z), h.x = t * Math.cos(_), h.y = t * Math.sin(_), d.subVectors(u, h).normalize(), l.push(d.x, d.y, d.z), c.push(g / s), c.push(f / n);
      }
    for (let f = 1; f <= n; f++)
      for (let g = 1; g <= s; g++) {
        const _ = (s + 1) * f + g - 1, p = (s + 1) * (f - 1) + g - 1, m = (s + 1) * (f - 1) + g, y = (s + 1) * f + g;
        o.push(_, p, y), o.push(p, m, y);
      }
    this.setIndex(o), this.setAttribute("position", new ue(a, 3)), this.setAttribute("normal", new ue(l, 3)), this.setAttribute("uv", new ue(c, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Bl(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc);
  }
}
class ei extends gn {
  constructor(t) {
    super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.type = "MeshStandardMaterial", this.color = new Tt(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Tt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Cu, this.normalScale = new tt(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new yn(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class En extends ei {
  constructor(t) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new tt(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function() {
        return Te(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
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
function Br(i, t, e) {
  return !i || // let 'undefined' and 'null' pass
  !e && i.constructor === t ? i : typeof t.BYTES_PER_ELEMENT == "number" ? new t(i) : Array.prototype.slice.call(i);
}
function tx(i) {
  return ArrayBuffer.isView(i) && !(i instanceof DataView);
}
function ex(i) {
  function t(s, r) {
    return i[s] - i[r];
  }
  const e = i.length, n = new Array(e);
  for (let s = 0; s !== e; ++s) n[s] = s;
  return n.sort(t), n;
}
function Ph(i, t, e) {
  const n = i.length, s = new i.constructor(n);
  for (let r = 0, o = 0; o !== n; ++r) {
    const a = e[r] * t;
    for (let l = 0; l !== t; ++l)
      s[o++] = i[a + l];
  }
  return s;
}
function ld(i, t, e, n) {
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
class er {
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
            for (let l = n - 2; ; ) {
              if (r === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (n === l) break;
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
class nx extends er {
  constructor(t, e, n, s) {
    super(t, e, n, s), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: mc,
      endingEnd: mc
    };
  }
  intervalChanged_(t, e, n) {
    const s = this.parameterPositions;
    let r = t - 2, o = t + 1, a = s[r], l = s[o];
    if (a === void 0)
      switch (this.getSettings_().endingStart) {
        case gc:
          r = t, a = 2 * e - n;
          break;
        case _c:
          r = s.length - 2, a = e + s[r] - s[r + 1];
          break;
        default:
          r = t, a = n;
      }
    if (l === void 0)
      switch (this.getSettings_().endingEnd) {
        case gc:
          o = t, l = 2 * n - e;
          break;
        case _c:
          o = 1, l = n + s[1] - s[0];
          break;
        default:
          o = t - 1, l = e;
      }
    const c = (n - e) * 0.5, h = this.valueSize;
    this._weightPrev = c / (e - a), this._weightNext = c / (l - n), this._offsetPrev = r * h, this._offsetNext = o * h;
  }
  interpolate_(t, e, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, l = t * a, c = l - a, h = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, g = (n - e) / (s - e), _ = g * g, p = _ * g, m = -d * p + 2 * d * _ - d * g, y = (1 + d) * p + (-1.5 - 2 * d) * _ + (-0.5 + d) * g + 1, v = (-1 - f) * p + (1.5 + f) * _ + 0.5 * g, M = f * p - f * _;
    for (let P = 0; P !== a; ++P)
      r[P] = m * o[h + P] + y * o[c + P] + v * o[l + P] + M * o[u + P];
    return r;
  }
}
class ix extends er {
  constructor(t, e, n, s) {
    super(t, e, n, s);
  }
  interpolate_(t, e, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, l = t * a, c = l - a, h = (n - e) / (s - e), u = 1 - h;
    for (let d = 0; d !== a; ++d)
      r[d] = o[c + d] * u + o[l + d] * h;
    return r;
  }
}
class sx extends er {
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
    this.name = t, this.times = Br(e, this.TimeBufferType), this.values = Br(n, this.ValueBufferType), this.setInterpolation(s || this.DefaultInterpolation);
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
        times: Br(t.times, Array),
        values: Br(t.values, Array)
      };
      const s = t.getInterpolation();
      s !== t.DefaultInterpolation && (n.interpolation = s);
    }
    return n.type = t.ValueTypeName, n;
  }
  InterpolantFactoryMethodDiscrete(t) {
    return new sx(this.times, this.values, this.getValueSize(), t);
  }
  InterpolantFactoryMethodLinear(t) {
    return new ix(this.times, this.values, this.getValueSize(), t);
  }
  InterpolantFactoryMethodSmooth(t) {
    return new nx(this.times, this.values, this.getValueSize(), t);
  }
  setInterpolation(t) {
    let e;
    switch (t) {
      case Xs:
        e = this.InterpolantFactoryMethodDiscrete;
        break;
      case $s:
        e = this.InterpolantFactoryMethodLinear;
        break;
      case So:
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
        return Xs;
      case this.InterpolantFactoryMethodLinear:
        return $s;
      case this.InterpolantFactoryMethodSmooth:
        return So;
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
      const l = n[a];
      if (typeof l == "number" && isNaN(l)) {
        console.error("THREE.KeyframeTrack: Time is not a valid number.", this, a, l), t = !1;
        break;
      }
      if (o !== null && o > l) {
        console.error("THREE.KeyframeTrack: Out of order keys.", this, a, l, o), t = !1;
        break;
      }
      o = l;
    }
    if (s !== void 0 && tx(s))
      for (let a = 0, l = s.length; a !== l; ++a) {
        const c = s[a];
        if (isNaN(c)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, a, c), t = !1;
          break;
        }
      }
    return t;
  }
  // removes equivalent sequential keys as common in morph target sequences
  // (0,0,0,0,1,1,1,0,0,0,0,0,0,0) --> (0,0,1,1,0,0)
  optimize() {
    const t = this.times.slice(), e = this.values.slice(), n = this.getValueSize(), s = this.getInterpolation() === So, r = t.length - 1;
    let o = 1;
    for (let a = 1; a < r; ++a) {
      let l = !1;
      const c = t[a], h = t[a + 1];
      if (c !== h && (a !== 1 || c !== t[0]))
        if (s)
          l = !0;
        else {
          const u = a * n, d = u - n, f = u + n;
          for (let g = 0; g !== n; ++g) {
            const _ = e[u + g];
            if (_ !== e[d + g] || _ !== e[f + g]) {
              l = !0;
              break;
            }
          }
        }
      if (l) {
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
      for (let a = r * n, l = o * n, c = 0; c !== n; ++c)
        e[l + c] = e[a + c];
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
bn.prototype.DefaultInterpolation = $s;
class fs extends bn {
  // No interpolation parameter because only InterpolateDiscrete is valid.
  constructor(t, e, n) {
    super(t, e, n);
  }
}
fs.prototype.ValueTypeName = "bool";
fs.prototype.ValueBufferType = Array;
fs.prototype.DefaultInterpolation = Xs;
fs.prototype.InterpolantFactoryMethodLinear = void 0;
fs.prototype.InterpolantFactoryMethodSmooth = void 0;
class cd extends bn {
}
cd.prototype.ValueTypeName = "color";
class ls extends bn {
}
ls.prototype.ValueTypeName = "number";
class rx extends er {
  constructor(t, e, n, s) {
    super(t, e, n, s);
  }
  interpolate_(t, e, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, l = (n - e) / (s - e);
    let c = t * a;
    for (let h = c + a; c !== h; c += 4)
      xn.slerpFlat(r, 0, o, c - a, o, c, l);
    return r;
  }
}
class cs extends bn {
  InterpolantFactoryMethodLinear(t) {
    return new rx(this.times, this.values, this.getValueSize(), t);
  }
}
cs.prototype.ValueTypeName = "quaternion";
cs.prototype.InterpolantFactoryMethodSmooth = void 0;
class ps extends bn {
  // No interpolation parameter because only InterpolateDiscrete is valid.
  constructor(t, e, n) {
    super(t, e, n);
  }
}
ps.prototype.ValueTypeName = "string";
ps.prototype.ValueBufferType = Array;
ps.prototype.DefaultInterpolation = Xs;
ps.prototype.InterpolantFactoryMethodLinear = void 0;
ps.prototype.InterpolantFactoryMethodSmooth = void 0;
class hs extends bn {
}
hs.prototype.ValueTypeName = "vector";
class ox {
  constructor(t = "", e = -1, n = [], s = wf) {
    this.name = t, this.tracks = n, this.duration = e, this.blendMode = s, this.uuid = on(), this.duration < 0 && this.resetDuration();
  }
  static parse(t) {
    const e = [], n = t.tracks, s = 1 / (t.fps || 1);
    for (let o = 0, a = n.length; o !== a; ++o)
      e.push(lx(n[o]).scale(s));
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
      let l = [], c = [];
      l.push(
        (a + r - 1) % r,
        a,
        (a + 1) % r
      ), c.push(0, 1, 0);
      const h = ex(l);
      l = Ph(l, 1, h), c = Ph(c, 1, h), !s && l[0] === 0 && (l.push(r), c.push(c[0])), o.push(
        new ls(
          ".morphTargetInfluences[" + e[a].name + "]",
          l,
          c
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
    for (let a = 0, l = t.length; a < l; a++) {
      const c = t[a], h = c.name.match(r);
      if (h && h.length > 1) {
        const u = h[1];
        let d = s[u];
        d || (s[u] = d = []), d.push(c);
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
        ld(f, p, m, g), p.length !== 0 && _.push(new u(d, p, m));
      }
    }, s = [], r = t.name || "default", o = t.fps || 30, a = t.blendMode;
    let l = t.length || -1;
    const c = t.hierarchy || [];
    for (let u = 0; u < c.length; u++) {
      const d = c[u].keys;
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
            for (let y = 0; y !== d[g].morphTargets.length; ++y) {
              const v = d[g];
              p.push(v.time), m.push(v.morphTarget === _ ? 1 : 0);
            }
            s.push(new ls(".morphTargetInfluence[" + _ + "]", p, m));
          }
          l = f.length * o;
        } else {
          const f = ".bones[" + e[u].name + "]";
          n(
            hs,
            f + ".position",
            d,
            "pos",
            s
          ), n(
            cs,
            f + ".quaternion",
            d,
            "rot",
            s
          ), n(
            hs,
            f + ".scale",
            d,
            "scl",
            s
          );
        }
    }
    return s.length === 0 ? null : new this(r, l, s, a);
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
function ax(i) {
  switch (i.toLowerCase()) {
    case "scalar":
    case "double":
    case "float":
    case "number":
    case "integer":
      return ls;
    case "vector":
    case "vector2":
    case "vector3":
    case "vector4":
      return hs;
    case "color":
      return cd;
    case "quaternion":
      return cs;
    case "bool":
    case "boolean":
      return fs;
    case "string":
      return ps;
  }
  throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + i);
}
function lx(i) {
  if (i.type === void 0)
    throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const t = ax(i.type);
  if (i.times === void 0) {
    const e = [], n = [];
    ld(i.keys, e, n, "value"), i.times = e, i.values = n;
  }
  return t.parse !== void 0 ? t.parse(i) : new t(i.name, i.times, i.values, i.interpolation);
}
const Zn = {
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
class cx {
  constructor(t, e, n) {
    const s = this;
    let r = !1, o = 0, a = 0, l;
    const c = [];
    this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = n, this.itemStart = function(h) {
      a++, r === !1 && s.onStart !== void 0 && s.onStart(h, o, a), r = !0;
    }, this.itemEnd = function(h) {
      o++, s.onProgress !== void 0 && s.onProgress(h, o, a), o === a && (r = !1, s.onLoad !== void 0 && s.onLoad());
    }, this.itemError = function(h) {
      s.onError !== void 0 && s.onError(h);
    }, this.resolveURL = function(h) {
      return l ? l(h) : h;
    }, this.setURLModifier = function(h) {
      return l = h, this;
    }, this.addHandler = function(h, u) {
      return c.push(h, u), this;
    }, this.removeHandler = function(h) {
      const u = c.indexOf(h);
      return u !== -1 && c.splice(u, 2), this;
    }, this.getHandler = function(h) {
      for (let u = 0, d = c.length; u < d; u += 2) {
        const f = c[u], g = c[u + 1];
        if (f.global && (f.lastIndex = 0), f.test(h))
          return g;
      }
      return null;
    };
  }
}
const hx = /* @__PURE__ */ new cx();
class ms {
  constructor(t) {
    this.manager = t !== void 0 ? t : hx, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
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
ms.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const Ln = {};
class ux extends Error {
  constructor(t, e) {
    super(t), this.response = e;
  }
}
class hd extends ms {
  constructor(t) {
    super(t);
  }
  load(t, e, n, s) {
    t === void 0 && (t = ""), this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const r = Zn.get(t);
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
    }), a = this.mimeType, l = this.responseType;
    fetch(o).then((c) => {
      if (c.status === 200 || c.status === 0) {
        if (c.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || c.body === void 0 || c.body.getReader === void 0)
          return c;
        const h = Ln[t], u = c.body.getReader(), d = c.headers.get("X-File-Size") || c.headers.get("Content-Length"), f = d ? parseInt(d) : 0, g = f !== 0;
        let _ = 0;
        const p = new ReadableStream({
          start(m) {
            y();
            function y() {
              u.read().then(({ done: v, value: M }) => {
                if (v)
                  m.close();
                else {
                  _ += M.byteLength;
                  const P = new ProgressEvent("progress", { lengthComputable: g, loaded: _, total: f });
                  for (let w = 0, A = h.length; w < A; w++) {
                    const L = h[w];
                    L.onProgress && L.onProgress(P);
                  }
                  m.enqueue(M), y();
                }
              }, (v) => {
                m.error(v);
              });
            }
          }
        });
        return new Response(p);
      } else
        throw new ux(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`, c);
    }).then((c) => {
      switch (l) {
        case "arraybuffer":
          return c.arrayBuffer();
        case "blob":
          return c.blob();
        case "document":
          return c.text().then((h) => new DOMParser().parseFromString(h, a));
        case "json":
          return c.json();
        default:
          if (a === void 0)
            return c.text();
          {
            const u = /charset="?([^;"\s]*)"?/i.exec(a), d = u && u[1] ? u[1].toLowerCase() : void 0, f = new TextDecoder(d);
            return c.arrayBuffer().then((g) => f.decode(g));
          }
      }
    }).then((c) => {
      Zn.add(t, c);
      const h = Ln[t];
      delete Ln[t];
      for (let u = 0, d = h.length; u < d; u++) {
        const f = h[u];
        f.onLoad && f.onLoad(c);
      }
    }).catch((c) => {
      const h = Ln[t];
      if (h === void 0)
        throw this.manager.itemError(t), c;
      delete Ln[t];
      for (let u = 0, d = h.length; u < d; u++) {
        const f = h[u];
        f.onError && f.onError(c);
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
class dx extends ms {
  constructor(t) {
    super(t);
  }
  load(t, e, n, s) {
    this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const r = this, o = Zn.get(t);
    if (o !== void 0)
      return r.manager.itemStart(t), setTimeout(function() {
        e && e(o), r.manager.itemEnd(t);
      }, 0), o;
    const a = js("img");
    function l() {
      h(), Zn.add(t, this), e && e(this), r.manager.itemEnd(t);
    }
    function c(u) {
      h(), s && s(u), r.manager.itemError(t), r.manager.itemEnd(t);
    }
    function h() {
      a.removeEventListener("load", l, !1), a.removeEventListener("error", c, !1);
    }
    return a.addEventListener("load", l, !1), a.addEventListener("error", c, !1), t.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (a.crossOrigin = this.crossOrigin), r.manager.itemStart(t), a.src = t, a;
  }
}
class fx extends ms {
  constructor(t) {
    super(t);
  }
  load(t, e, n, s) {
    const r = new Ae(), o = new dx(this.manager);
    return o.setCrossOrigin(this.crossOrigin), o.setPath(this.path), o.load(t, function(a) {
      r.image = a, r.needsUpdate = !0, e !== void 0 && e(r);
    }, n, s), r;
  }
}
class nr extends me {
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
class px extends nr {
  constructor(t, e, n) {
    super(t, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(me.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Tt(e);
  }
  copy(t, e) {
    return super.copy(t, e), this.groundColor.copy(t.groundColor), this;
  }
}
const sa = /* @__PURE__ */ new Dt(), Lh = /* @__PURE__ */ new R(), Ih = /* @__PURE__ */ new R();
class kl {
  constructor(t) {
    this.camera = t, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new tt(512, 512), this.map = null, this.mapPass = null, this.matrix = new Dt(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Al(), this._frameExtents = new tt(1, 1), this._viewportCount = 1, this._viewports = [
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
    Lh.setFromMatrixPosition(t.matrixWorld), e.position.copy(Lh), Ih.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(Ih), e.updateMatrixWorld(), sa.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(sa), n.set(
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
    ), n.multiply(sa);
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
class mx extends kl {
  constructor() {
    super(new Be(50, 1, 0.5, 500)), this.isSpotLightShadow = !0, this.focus = 1;
  }
  updateMatrices(t) {
    const e = this.camera, n = os * 2 * t.angle * this.focus, s = this.mapSize.width / this.mapSize.height, r = t.distance || e.far;
    (n !== e.fov || s !== e.aspect || r !== e.far) && (e.fov = n, e.aspect = s, e.far = r, e.updateProjectionMatrix()), super.updateMatrices(t);
  }
  copy(t) {
    return super.copy(t), this.focus = t.focus, this;
  }
}
class gx extends nr {
  constructor(t, e, n = 0, s = Math.PI / 3, r = 0, o = 2) {
    super(t, e), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(me.DEFAULT_UP), this.updateMatrix(), this.target = new me(), this.distance = n, this.angle = s, this.penumbra = r, this.decay = o, this.map = null, this.shadow = new mx();
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
const Dh = /* @__PURE__ */ new Dt(), Rs = /* @__PURE__ */ new R(), ra = /* @__PURE__ */ new R();
class _x extends kl {
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
      new R(1, 0, 0),
      new R(-1, 0, 0),
      new R(0, 0, 1),
      new R(0, 0, -1),
      new R(0, 1, 0),
      new R(0, -1, 0)
    ], this._cubeUps = [
      new R(0, 1, 0),
      new R(0, 1, 0),
      new R(0, 1, 0),
      new R(0, 1, 0),
      new R(0, 0, 1),
      new R(0, 0, -1)
    ];
  }
  updateMatrices(t, e = 0) {
    const n = this.camera, s = this.matrix, r = t.distance || n.far;
    r !== n.far && (n.far = r, n.updateProjectionMatrix()), Rs.setFromMatrixPosition(t.matrixWorld), n.position.copy(Rs), ra.copy(n.position), ra.add(this._cubeDirections[e]), n.up.copy(this._cubeUps[e]), n.lookAt(ra), n.updateMatrixWorld(), s.makeTranslation(-Rs.x, -Rs.y, -Rs.z), Dh.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Dh);
  }
}
class ud extends nr {
  constructor(t, e, n = 0, s = 2) {
    super(t, e), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = s, this.shadow = new _x();
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
class vx extends kl {
  constructor() {
    super(new wl(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class zl extends nr {
  constructor(t, e) {
    super(t, e), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(me.DEFAULT_UP), this.updateMatrix(), this.target = new me(), this.shadow = new vx();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
  }
}
class dd extends nr {
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
class xx extends ms {
  constructor(t) {
    super(t), this.isImageBitmapLoader = !0, typeof createImageBitmap > "u" && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch > "u" && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.options = { premultiplyAlpha: "none" };
  }
  setOptions(t) {
    return this.options = t, this;
  }
  load(t, e, n, s) {
    t === void 0 && (t = ""), this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const r = this, o = Zn.get(t);
    if (o !== void 0) {
      if (r.manager.itemStart(t), o.then) {
        o.then((c) => {
          e && e(c), r.manager.itemEnd(t);
        }).catch((c) => {
          s && s(c);
        });
        return;
      }
      return setTimeout(function() {
        e && e(o), r.manager.itemEnd(t);
      }, 0), o;
    }
    const a = {};
    a.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include", a.headers = this.requestHeader;
    const l = fetch(t, a).then(function(c) {
      return c.blob();
    }).then(function(c) {
      return createImageBitmap(c, Object.assign(r.options, { colorSpaceConversion: "none" }));
    }).then(function(c) {
      return Zn.add(t, c), e && e(c), r.manager.itemEnd(t), c;
    }).catch(function(c) {
      s && s(c), Zn.remove(t), r.manager.itemError(t), r.manager.itemEnd(t);
    });
    Zn.add(t, l), r.manager.itemStart(t);
  }
}
class yx {
  constructor(t = !0) {
    this.autoStart = t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1;
  }
  start() {
    this.startTime = Nh(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
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
      const e = Nh();
      t = (e - this.oldTime) / 1e3, this.oldTime = e, this.elapsedTime += t;
    }
    return t;
  }
}
function Nh() {
  return performance.now();
}
const Hl = "\\[\\]\\.:\\/", Mx = new RegExp("[" + Hl + "]", "g"), Vl = "[^" + Hl + "]", Sx = "[^" + Hl.replace("\\.", "") + "]", Ex = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", Vl), bx = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", Sx), Tx = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Vl), Ax = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Vl), wx = new RegExp(
  "^" + Ex + bx + Tx + Ax + "$"
), Rx = ["material", "materials", "bones", "map"];
class Cx {
  constructor(t, e, n) {
    const s = n || re.parseTrackName(e);
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
class re {
  constructor(t, e, n) {
    this.path = e, this.parsedPath = n || re.parseTrackName(e), this.node = re.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(t, e, n) {
    return t && t.isAnimationObjectGroup ? new re.Composite(t, e, n) : new re(t, e, n);
  }
  /**
   * Replaces spaces with underscores and removes unsupported characters from
   * node names, to ensure compatibility with parseTrackName().
   *
   * @param {string} name Node name to be sanitized.
   * @return {string}
   */
  static sanitizeNodeName(t) {
    return t.replace(/\s/g, "_").replace(Mx, "");
  }
  static parseTrackName(t) {
    const e = wx.exec(t);
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
      Rx.indexOf(r) !== -1 && (n.nodeName = n.nodeName.substring(0, s), n.objectName = r);
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
          const l = n(a.children);
          if (l) return l;
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
    if (t || (t = re.findNode(this.rootNode, e.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
      console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (n) {
      let c = e.objectIndex;
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
            if (t[h].name === c) {
              c = h;
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
      if (c !== void 0) {
        if (t[c] === void 0) {
          console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, t);
          return;
        }
        t = t[c];
      }
    }
    const o = t[s];
    if (o === void 0) {
      const c = e.nodeName;
      console.error("THREE.PropertyBinding: Trying to update property for track: " + c + "." + s + " but it wasn't found.", t);
      return;
    }
    let a = this.Versioning.None;
    this.targetObject = t, t.needsUpdate !== void 0 ? a = this.Versioning.NeedsUpdate : t.matrixWorldNeedsUpdate !== void 0 && (a = this.Versioning.MatrixWorldNeedsUpdate);
    let l = this.BindingType.Direct;
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
      l = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = r;
    } else o.fromArray !== void 0 && o.toArray !== void 0 ? (l = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (l = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = s;
    this.getValue = this.GetterByBindingType[l], this.setValue = this.SetterByBindingTypeAndVersioning[l][a];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
}
re.Composite = Cx;
re.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
re.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
re.prototype.GetterByBindingType = [
  re.prototype._getValue_direct,
  re.prototype._getValue_array,
  re.prototype._getValue_arrayElement,
  re.prototype._getValue_toArray
];
re.prototype.SetterByBindingTypeAndVersioning = [
  [
    // Direct
    re.prototype._setValue_direct,
    re.prototype._setValue_direct_setNeedsUpdate,
    re.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    // EntireArray
    re.prototype._setValue_array,
    re.prototype._setValue_array_setNeedsUpdate,
    re.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    // ArrayElement
    re.prototype._setValue_arrayElement,
    re.prototype._setValue_arrayElement_setNeedsUpdate,
    re.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    // HasToFromArray
    re.prototype._setValue_fromArray,
    re.prototype._setValue_fromArray_setNeedsUpdate,
    re.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
const Uh = /* @__PURE__ */ new Dt();
class Px {
  constructor(t, e, n = 0, s = 1 / 0) {
    this.ray = new us(t, e), this.near = n, this.far = s, this.camera = null, this.layers = new Tl(), this.params = {
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
    return Uh.identity().extractRotation(t.matrixWorld), this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Uh), this;
  }
  intersectObject(t, e = !0, n = []) {
    return il(t, this, n, e), n.sort(Oh), n;
  }
  intersectObjects(t, e = !0, n = []) {
    for (let s = 0, r = t.length; s < r; s++)
      il(t[s], this, n, e);
    return n.sort(Oh), n;
  }
}
function Oh(i, t) {
  return i.distance - t.distance;
}
function il(i, t, e, n) {
  let s = !0;
  if (i.layers.test(t.layers) && i.raycast(t, e) === !1 && (s = !1), s === !0 && n === !0) {
    const r = i.children;
    for (let o = 0, a = r.length; o < a; o++)
      il(r[o], t, e, !0);
  }
}
class Fh {
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
    return this.radius = Math.sqrt(t * t + e * e + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t, n), this.phi = Math.acos(Te(e / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Lx extends Ll {
  constructor(t = 10, e = 10, n = 4473924, s = 8947848) {
    n = new Tt(n), s = new Tt(s);
    const r = e / 2, o = t / e, a = t / 2, l = [], c = [];
    for (let d = 0, f = 0, g = -a; d <= e; d++, g += o) {
      l.push(-a, 0, g, a, 0, g), l.push(g, 0, -a, g, 0, a);
      const _ = d === r ? n : s;
      _.toArray(c, f), f += 3, _.toArray(c, f), f += 3, _.toArray(c, f), f += 3, _.toArray(c, f), f += 3;
    }
    const h = new Le();
    h.setAttribute("position", new ue(l, 3)), h.setAttribute("color", new ue(c, 3));
    const u = new po({ vertexColors: !0, toneMapped: !1 });
    super(h, u), this.type = "GridHelper";
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
const kr = /* @__PURE__ */ new je();
class Ix extends Ll {
  constructor(t, e = 16776960) {
    const n = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]), s = new Float32Array(8 * 3), r = new Le();
    r.setIndex(new De(n, 1)), r.setAttribute("position", new De(s, 3)), super(r, new po({ color: e, toneMapped: !1 })), this.object = t, this.type = "BoxHelper", this.matrixAutoUpdate = !1, this.update();
  }
  update(t) {
    if (t !== void 0 && console.warn("THREE.BoxHelper: .update() has no longer arguments."), this.object !== void 0 && kr.setFromObject(this.object), kr.isEmpty()) return;
    const e = kr.min, n = kr.max, s = this.geometry.attributes.position, r = s.array;
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
class Dx extends Mi {
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
  revision: ml
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = ml);
const Bh = { type: "change" }, Gl = { type: "start" }, fd = { type: "end" }, zr = new us(), kh = new Nn(), Nx = Math.cos(70 * Yi.DEG2RAD), be = new R(), Xe = 2 * Math.PI, le = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, oa = 1e-6;
class Ux extends Dx {
  constructor(t, e = null) {
    super(t, e), this.state = le.NONE, this.enabled = !0, this.target = new R(), this.cursor = new R(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: un.ROTATE, MIDDLE: un.DOLLY, RIGHT: un.PAN }, this.touches = { ONE: dn.ROTATE, TWO: dn.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new R(), this._lastQuaternion = new xn(), this._lastTargetPosition = new R(), this._quat = new xn().setFromUnitVectors(t.up, new R(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Fh(), this._sphericalDelta = new Fh(), this._scale = 1, this._panOffset = new R(), this._rotateStart = new tt(), this._rotateEnd = new tt(), this._rotateDelta = new tt(), this._panStart = new tt(), this._panEnd = new tt(), this._panDelta = new tt(), this._dollyStart = new tt(), this._dollyEnd = new tt(), this._dollyDelta = new tt(), this._dollyDirection = new R(), this._mouse = new tt(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = Fx.bind(this), this._onPointerDown = Ox.bind(this), this._onPointerUp = Bx.bind(this), this._onContextMenu = Xx.bind(this), this._onMouseWheel = Hx.bind(this), this._onKeyDown = Vx.bind(this), this._onTouchStart = Gx.bind(this), this._onTouchMove = Wx.bind(this), this._onMouseDown = kx.bind(this), this._onMouseMove = zx.bind(this), this._interceptControlDown = $x.bind(this), this._interceptControlUp = jx.bind(this), this.domElement !== null && this.connect(), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(Bh), this.update(), this.state = le.NONE;
  }
  update(t = null) {
    const e = this.object.position;
    be.copy(e).sub(this.target), be.applyQuaternion(this._quat), this._spherical.setFromVector3(be), this.autoRotate && this.state === le.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(n) && isFinite(s) && (n < -Math.PI ? n += Xe : n > Math.PI && (n -= Xe), s < -Math.PI ? s += Xe : s > Math.PI && (s -= Xe), n <= s ? this._spherical.theta = Math.max(n, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + s) / 2 ? Math.max(n, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const o = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = o != this._spherical.radius;
    }
    if (be.setFromSpherical(this._spherical), be.applyQuaternion(this._quatInverse), e.copy(this.target).add(be), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const a = be.length();
        o = this._clampDistance(a * this._scale);
        const l = a - o;
        this.object.position.addScaledVector(this._dollyDirection, l), this.object.updateMatrixWorld(), r = !!l;
      } else if (this.object.isOrthographicCamera) {
        const a = new R(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const l = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = l !== this.object.zoom;
        const c = new R(this._mouse.x, this._mouse.y, 0);
        c.unproject(this.object), this.object.position.sub(c).add(a), this.object.updateMatrixWorld(), o = be.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      o !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position) : (zr.origin.copy(this.object.position), zr.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(zr.direction)) < Nx ? this.object.lookAt(this.target) : (kh.setFromNormalAndCoplanarPoint(this.object.up, this.target), zr.intersectPlane(kh, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), o !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > oa || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > oa || this._lastTargetPosition.distanceToSquared(this.target) > oa ? (this.dispatchEvent(Bh), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
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
    be.setFromMatrixColumn(e, 0), be.multiplyScalar(-t), this._panOffset.add(be);
  }
  _panUp(t, e) {
    this.screenSpacePanning === !0 ? be.setFromMatrixColumn(e, 1) : (be.setFromMatrixColumn(e, 0), be.crossVectors(this.object.up, be)), be.multiplyScalar(t), this._panOffset.add(be);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(t, e) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      be.copy(s).sub(this.target);
      let r = be.length();
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
function Ox(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function Fx(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function Bx(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(fd), this.state = le.NONE;
      break;
    case 1:
      const t = this._pointers[0], e = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: e.x, pageY: e.y });
      break;
  }
}
function kx(i) {
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
      this._handleMouseDownDolly(i), this.state = le.DOLLY;
      break;
    case un.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = le.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = le.ROTATE;
      }
      break;
    case un.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = le.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = le.PAN;
      }
      break;
    default:
      this.state = le.NONE;
  }
  this.state !== le.NONE && this.dispatchEvent(Gl);
}
function zx(i) {
  switch (this.state) {
    case le.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(i);
      break;
    case le.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(i);
      break;
    case le.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(i);
      break;
  }
}
function Hx(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== le.NONE || (i.preventDefault(), this.dispatchEvent(Gl), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(fd));
}
function Vx(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function Gx(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case dn.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(i), this.state = le.TOUCH_ROTATE;
          break;
        case dn.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(i), this.state = le.TOUCH_PAN;
          break;
        default:
          this.state = le.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case dn.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(i), this.state = le.TOUCH_DOLLY_PAN;
          break;
        case dn.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(i), this.state = le.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = le.NONE;
      }
      break;
    default:
      this.state = le.NONE;
  }
  this.state !== le.NONE && this.dispatchEvent(Gl);
}
function Wx(i) {
  switch (this._trackPointer(i), this.state) {
    case le.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case le.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(i), this.update();
      break;
    case le.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case le.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = le.NONE;
  }
}
function Xx(i) {
  this.enabled !== !1 && i.preventDefault();
}
function $x(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function jx(i) {
  i.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function zh(i, t) {
  if (t === Rf)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), i;
  if (t === Ka || t === Ru) {
    let e = i.getIndex();
    if (e === null) {
      const o = [], a = i.getAttribute("position");
      if (a !== void 0) {
        for (let l = 0; l < a.count; l++)
          o.push(l);
        i.setIndex(o), e = i.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), i;
    }
    const n = e.count - 2, s = [];
    if (t === Ka)
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
class qx extends ms {
  constructor(t) {
    super(t), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
      return new Qx(e);
    }), this.register(function(e) {
      return new ty(e);
    }), this.register(function(e) {
      return new cy(e);
    }), this.register(function(e) {
      return new hy(e);
    }), this.register(function(e) {
      return new uy(e);
    }), this.register(function(e) {
      return new ny(e);
    }), this.register(function(e) {
      return new iy(e);
    }), this.register(function(e) {
      return new sy(e);
    }), this.register(function(e) {
      return new ry(e);
    }), this.register(function(e) {
      return new Jx(e);
    }), this.register(function(e) {
      return new oy(e);
    }), this.register(function(e) {
      return new ey(e);
    }), this.register(function(e) {
      return new ly(e);
    }), this.register(function(e) {
      return new ay(e);
    }), this.register(function(e) {
      return new Kx(e);
    }), this.register(function(e) {
      return new dy(e);
    }), this.register(function(e) {
      return new fy(e);
    });
  }
  load(t, e, n, s) {
    const r = this;
    let o;
    if (this.resourcePath !== "")
      o = this.resourcePath;
    else if (this.path !== "") {
      const c = zs.extractUrlBase(t);
      o = zs.resolveURL(c, this.path);
    } else
      o = zs.extractUrlBase(t);
    this.manager.itemStart(t);
    const a = function(c) {
      s ? s(c) : console.error(c), r.manager.itemError(t), r.manager.itemEnd(t);
    }, l = new hd(this.manager);
    l.setPath(this.path), l.setResponseType("arraybuffer"), l.setRequestHeader(this.requestHeader), l.setWithCredentials(this.withCredentials), l.load(t, function(c) {
      try {
        r.parse(c, o, function(h) {
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
    const o = {}, a = {}, l = new TextDecoder();
    if (typeof t == "string")
      r = JSON.parse(t);
    else if (t instanceof ArrayBuffer)
      if (l.decode(new Uint8Array(t, 0, 4)) === pd) {
        try {
          o[kt.KHR_BINARY_GLTF] = new py(t);
        } catch (u) {
          s && s(u);
          return;
        }
        r = JSON.parse(o[kt.KHR_BINARY_GLTF].content);
      } else
        r = JSON.parse(l.decode(t));
    else
      r = t;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const c = new wy(r, {
      path: e || this.resourcePath || "",
      crossOrigin: this.crossOrigin,
      requestHeader: this.requestHeader,
      manager: this.manager,
      ktx2Loader: this.ktx2Loader,
      meshoptDecoder: this.meshoptDecoder
    });
    c.fileLoader.setRequestHeader(this.requestHeader);
    for (let h = 0; h < this.pluginCallbacks.length; h++) {
      const u = this.pluginCallbacks[h](c);
      u.name || console.error("THREE.GLTFLoader: Invalid plugin found: missing name"), a[u.name] = u, o[u.name] = !0;
    }
    if (r.extensionsUsed)
      for (let h = 0; h < r.extensionsUsed.length; ++h) {
        const u = r.extensionsUsed[h], d = r.extensionsRequired || [];
        switch (u) {
          case kt.KHR_MATERIALS_UNLIT:
            o[u] = new Zx();
            break;
          case kt.KHR_DRACO_MESH_COMPRESSION:
            o[u] = new my(r, this.dracoLoader);
            break;
          case kt.KHR_TEXTURE_TRANSFORM:
            o[u] = new gy();
            break;
          case kt.KHR_MESH_QUANTIZATION:
            o[u] = new _y();
            break;
          default:
            d.indexOf(u) >= 0 && a[u] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + u + '".');
        }
      }
    c.setExtensions(o), c.setPlugins(a), c.parse(n, s);
  }
  parseAsync(t, e) {
    const n = this;
    return new Promise(function(s, r) {
      n.parse(t, e, s, r);
    });
  }
}
function Yx() {
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
const kt = {
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
class Kx {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
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
    const r = e.json, l = ((r.extensions && r.extensions[this.name] || {}).lights || [])[t];
    let c;
    const h = new Tt(16777215);
    l.color !== void 0 && h.setRGB(l.color[0], l.color[1], l.color[2], Ne);
    const u = l.range !== void 0 ? l.range : 0;
    switch (l.type) {
      case "directional":
        c = new zl(h), c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      case "point":
        c = new ud(h), c.distance = u;
        break;
      case "spot":
        c = new gx(h), c.distance = u, l.spot = l.spot || {}, l.spot.innerConeAngle = l.spot.innerConeAngle !== void 0 ? l.spot.innerConeAngle : 0, l.spot.outerConeAngle = l.spot.outerConeAngle !== void 0 ? l.spot.outerConeAngle : Math.PI / 4, c.angle = l.spot.outerConeAngle, c.penumbra = 1 - l.spot.innerConeAngle / l.spot.outerConeAngle, c.target.position.set(0, 0, -1), c.add(c.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + l.type);
    }
    return c.position.set(0, 0, 0), c.decay = 2, Dn(c, l), l.intensity !== void 0 && (c.intensity = l.intensity), c.name = e.createUniqueName(l.name || "light_" + t), s = Promise.resolve(c), e.cache.add(n, s), s;
  }
  getDependency(t, e) {
    if (t === "light")
      return this._loadLight(e);
  }
  createNodeAttachment(t) {
    const e = this, n = this.parser, r = n.json.nodes[t], a = (r.extensions && r.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(l) {
      return n._getNodeRef(e.cache, a, l);
    });
  }
}
class Zx {
  constructor() {
    this.name = kt.KHR_MATERIALS_UNLIT;
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
        t.color.setRGB(o[0], o[1], o[2], Ne), t.opacity = o[3];
      }
      r.baseColorTexture !== void 0 && s.push(n.assignTexture(t, "map", r.baseColorTexture, He));
    }
    return Promise.all(s);
  }
}
class Jx {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(t, e) {
    const s = this.parser.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name].emissiveStrength;
    return r !== void 0 && (e.emissiveIntensity = r), Promise.resolve();
  }
}
class Qx {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_MATERIALS_CLEARCOAT;
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
class ty {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_MATERIALS_DISPERSION;
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
class ey {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_MATERIALS_IRIDESCENCE;
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
class ny {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_MATERIALS_SHEEN;
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
      e.sheenColor.setRGB(a[0], a[1], a[2], Ne);
    }
    return o.sheenRoughnessFactor !== void 0 && (e.sheenRoughness = o.sheenRoughnessFactor), o.sheenColorTexture !== void 0 && r.push(n.assignTexture(e, "sheenColorMap", o.sheenColorTexture, He)), o.sheenRoughnessTexture !== void 0 && r.push(n.assignTexture(e, "sheenRoughnessMap", o.sheenRoughnessTexture)), Promise.all(r);
  }
}
class iy {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_MATERIALS_TRANSMISSION;
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
class sy {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_MATERIALS_VOLUME;
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
    return e.attenuationColor = new Tt().setRGB(a[0], a[1], a[2], Ne), Promise.all(r);
  }
}
class ry {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_MATERIALS_IOR;
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
class oy {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_MATERIALS_SPECULAR;
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
    return e.specularColor = new Tt().setRGB(a[0], a[1], a[2], Ne), o.specularColorTexture !== void 0 && r.push(n.assignTexture(e, "specularColorMap", o.specularColorTexture, He)), Promise.all(r);
  }
}
class ay {
  constructor(t) {
    this.parser = t, this.name = kt.EXT_MATERIALS_BUMP;
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
class ly {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_MATERIALS_ANISOTROPY;
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
class cy {
  constructor(t) {
    this.parser = t, this.name = kt.KHR_TEXTURE_BASISU;
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
class hy {
  constructor(t) {
    this.parser = t, this.name = kt.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(t) {
    const e = this.name, n = this.parser, s = n.json, r = s.textures[t];
    if (!r.extensions || !r.extensions[e])
      return null;
    const o = r.extensions[e], a = s.images[o.source];
    let l = n.textureLoader;
    if (a.uri) {
      const c = n.options.manager.getHandler(a.uri);
      c !== null && (l = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return n.loadTextureImage(t, o.source, l);
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
class uy {
  constructor(t) {
    this.parser = t, this.name = kt.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(t) {
    const e = this.name, n = this.parser, s = n.json, r = s.textures[t];
    if (!r.extensions || !r.extensions[e])
      return null;
    const o = r.extensions[e], a = s.images[o.source];
    let l = n.textureLoader;
    if (a.uri) {
      const c = n.options.manager.getHandler(a.uri);
      c !== null && (l = c);
    }
    return this.detectSupport().then(function(c) {
      if (c) return n.loadTextureImage(t, o.source, l);
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
class dy {
  constructor(t) {
    this.name = kt.EXT_MESHOPT_COMPRESSION, this.parser = t;
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
        const l = s.byteOffset || 0, c = s.byteLength || 0, h = s.count, u = s.byteStride, d = new Uint8Array(a, l, c);
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
class fy {
  constructor(t) {
    this.name = kt.EXT_MESH_GPU_INSTANCING, this.parser = t;
  }
  createNodeMesh(t) {
    const e = this.parser.json, n = e.nodes[t];
    if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0)
      return null;
    const s = e.meshes[n.mesh];
    for (const c of s.primitives)
      if (c.mode !== nn.TRIANGLES && c.mode !== nn.TRIANGLE_STRIP && c.mode !== nn.TRIANGLE_FAN && c.mode !== void 0)
        return null;
    const o = n.extensions[this.name].attributes, a = [], l = {};
    for (const c in o)
      a.push(this.parser.getDependency("accessor", o[c]).then((h) => (l[c] = h, l[c])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(t)), Promise.all(a).then((c) => {
      const h = c.pop(), u = h.isGroup ? h.children : [h], d = c[0].count, f = [];
      for (const g of u) {
        const _ = new Dt(), p = new R(), m = new xn(), y = new R(1, 1, 1), v = new xv(g.geometry, g.material, d);
        for (let M = 0; M < d; M++)
          l.TRANSLATION && p.fromBufferAttribute(l.TRANSLATION, M), l.ROTATION && m.fromBufferAttribute(l.ROTATION, M), l.SCALE && y.fromBufferAttribute(l.SCALE, M), v.setMatrixAt(M, _.compose(p, m, y));
        for (const M in l)
          if (M === "_COLOR_0") {
            const P = l[M];
            v.instanceColor = new Qa(P.array, P.itemSize, P.normalized);
          } else M !== "TRANSLATION" && M !== "ROTATION" && M !== "SCALE" && g.geometry.setAttribute(M, l[M]);
        me.prototype.copy.call(v, g), this.parser.assignFinalMaterial(v), f.push(v);
      }
      return h.isGroup ? (h.clear(), h.add(...f), h) : f[0];
    }));
  }
}
const pd = "glTF", Cs = 12, Hh = { JSON: 1313821514, BIN: 5130562 };
class py {
  constructor(t) {
    this.name = kt.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const e = new DataView(t, 0, Cs), n = new TextDecoder();
    if (this.header = {
      magic: n.decode(new Uint8Array(t.slice(0, 4))),
      version: e.getUint32(4, !0),
      length: e.getUint32(8, !0)
    }, this.header.magic !== pd)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - Cs, r = new DataView(t, Cs);
    let o = 0;
    for (; o < s; ) {
      const a = r.getUint32(o, !0);
      o += 4;
      const l = r.getUint32(o, !0);
      if (o += 4, l === Hh.JSON) {
        const c = new Uint8Array(t, Cs + o, a);
        this.content = n.decode(c);
      } else if (l === Hh.BIN) {
        const c = Cs + o;
        this.body = t.slice(c, c + a);
      }
      o += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class my {
  constructor(t, e) {
    if (!e)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = kt.KHR_DRACO_MESH_COMPRESSION, this.json = t, this.dracoLoader = e, this.dracoLoader.preload();
  }
  decodePrimitive(t, e) {
    const n = this.json, s = this.dracoLoader, r = t.extensions[this.name].bufferView, o = t.extensions[this.name].attributes, a = {}, l = {}, c = {};
    for (const h in o) {
      const u = sl[h] || h.toLowerCase();
      a[u] = o[h];
    }
    for (const h in t.attributes) {
      const u = sl[h] || h.toLowerCase();
      if (o[h] !== void 0) {
        const d = n.accessors[t.attributes[h]], f = Zi[d.componentType];
        c[u] = f.name, l[u] = d.normalized === !0;
      }
    }
    return e.getDependency("bufferView", r).then(function(h) {
      return new Promise(function(u, d) {
        s.decodeDracoFile(h, function(f) {
          for (const g in f.attributes) {
            const _ = f.attributes[g], p = l[g];
            p !== void 0 && (_.normalized = p);
          }
          u(f);
        }, a, c, Ne, d);
      });
    });
  }
}
class gy {
  constructor() {
    this.name = kt.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(t, e) {
    return (e.texCoord === void 0 || e.texCoord === t.channel) && e.offset === void 0 && e.rotation === void 0 && e.scale === void 0 || (t = t.clone(), e.texCoord !== void 0 && (t.channel = e.texCoord), e.offset !== void 0 && t.offset.fromArray(e.offset), e.rotation !== void 0 && (t.rotation = e.rotation), e.scale !== void 0 && t.repeat.fromArray(e.scale), t.needsUpdate = !0), t;
  }
}
class _y {
  constructor() {
    this.name = kt.KHR_MESH_QUANTIZATION;
  }
}
class md extends er {
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
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, l = a * 2, c = a * 3, h = s - e, u = (n - e) / h, d = u * u, f = d * u, g = t * c, _ = g - c, p = -2 * f + 3 * d, m = f - d, y = 1 - p, v = m - d + u;
    for (let M = 0; M !== a; M++) {
      const P = o[_ + M + a], w = o[_ + M + l] * h, A = o[g + M + a], L = o[g + M] * h;
      r[M] = y * P + v * w + p * A + m * L;
    }
    return r;
  }
}
const vy = new xn();
class xy extends md {
  interpolate_(t, e, n, s) {
    const r = super.interpolate_(t, e, n, s);
    return vy.fromArray(r).normalize().toArray(r), r;
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
}, Zi = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
}, Vh = {
  9728: Ve,
  9729: Qe,
  9984: vu,
  9985: Vr,
  9986: Is,
  9987: Un
}, Gh = {
  33071: Kn,
  33648: Jr,
  10497: is
}, aa = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, sl = {
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
}, yy = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: $s,
  STEP: Xs
}, la = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function My(i) {
  return i.DefaultMaterial === void 0 && (i.DefaultMaterial = new ei({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: Fn
  })), i.DefaultMaterial;
}
function di(i, t, e) {
  for (const n in e.extensions)
    i[n] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[n] = e.extensions[n]);
}
function Dn(i, t) {
  t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(i.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function Sy(i, t, e) {
  let n = !1, s = !1, r = !1;
  for (let c = 0, h = t.length; c < h; c++) {
    const u = t[c];
    if (u.POSITION !== void 0 && (n = !0), u.NORMAL !== void 0 && (s = !0), u.COLOR_0 !== void 0 && (r = !0), n && s && r) break;
  }
  if (!n && !s && !r) return Promise.resolve(i);
  const o = [], a = [], l = [];
  for (let c = 0, h = t.length; c < h; c++) {
    const u = t[c];
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
      l.push(d);
    }
  }
  return Promise.all([
    Promise.all(o),
    Promise.all(a),
    Promise.all(l)
  ]).then(function(c) {
    const h = c[0], u = c[1], d = c[2];
    return n && (i.morphAttributes.position = h), s && (i.morphAttributes.normal = u), r && (i.morphAttributes.color = d), i.morphTargetsRelative = !0, i;
  });
}
function Ey(i, t) {
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
function by(i) {
  let t;
  const e = i.extensions && i.extensions[kt.KHR_DRACO_MESH_COMPRESSION];
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
function rl(i) {
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
function Ty(i) {
  return i.search(/\.jpe?g($|\?)/i) > 0 || i.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : i.search(/\.webp($|\?)/i) > 0 || i.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const Ay = new Dt();
class wy {
  constructor(t = {}, e = {}) {
    this.json = t, this.extensions = {}, this.plugins = {}, this.options = e, this.cache = new Yx(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1, s = -1, r = !1, o = -1;
    if (typeof navigator < "u") {
      const a = navigator.userAgent;
      n = /^((?!chrome|android).)*safari/i.test(a) === !0;
      const l = a.match(/Version\/(\d+)/);
      s = n && l ? parseInt(l[1], 10) : -1, r = a.indexOf("Firefox") > -1, o = r ? a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || n && s < 17 || r && o < 98 ? this.textureLoader = new fx(this.options.manager) : this.textureLoader = new xx(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new hd(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
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
      return di(r, a, s), Dn(a, s), Promise.all(n._invokeAll(function(l) {
        return l.afterRoot && l.afterRoot(a);
      })).then(function() {
        for (const l of a.scenes)
          l.updateMatrixWorld();
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
      for (let a = 0, l = o.length; a < l; a++)
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
      const l = this.associations.get(o);
      l != null && this.associations.set(a, l);
      for (const [c, h] of o.children.entries())
        r(h, a.children[c]);
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
      return Promise.resolve(this.extensions[kt.KHR_BINARY_GLTF].body);
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
      const o = aa[s.type], a = Zi[s.componentType], l = s.normalized === !0, c = new a(s.count * o);
      return Promise.resolve(new De(c, o, l));
    }
    const r = [];
    return s.bufferView !== void 0 ? r.push(this.getDependency("bufferView", s.bufferView)) : r.push(null), s.sparse !== void 0 && (r.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(r).then(function(o) {
      const a = o[0], l = aa[s.type], c = Zi[s.componentType], h = c.BYTES_PER_ELEMENT, u = h * l, d = s.byteOffset || 0, f = s.bufferView !== void 0 ? n.bufferViews[s.bufferView].byteStride : void 0, g = s.normalized === !0;
      let _, p;
      if (f && f !== u) {
        const m = Math.floor(d / f), y = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + m + ":" + s.count;
        let v = e.cache.get(y);
        v || (_ = new c(a, m * f, s.count * f / h), v = new qu(_, f / h), e.cache.add(y, v)), p = new qs(v, l, d % f / h, g);
      } else
        a === null ? _ = new c(s.count * l) : _ = new c(a, d, s.count * l), p = new De(_, l, g);
      if (s.sparse !== void 0) {
        const m = aa.SCALAR, y = Zi[s.sparse.indices.componentType], v = s.sparse.indices.byteOffset || 0, M = s.sparse.values.byteOffset || 0, P = new y(o[1], v, s.sparse.count * m), w = new c(o[2], M, s.sparse.count * l);
        a !== null && (p = new De(p.array.slice(), p.itemSize, p.normalized)), p.normalized = !1;
        for (let A = 0, L = P.length; A < L; A++) {
          const G = P[A];
          if (p.setX(G, w[A * l]), l >= 2 && p.setY(G, w[A * l + 1]), l >= 3 && p.setZ(G, w[A * l + 2]), l >= 4 && p.setW(G, w[A * l + 3]), l >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
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
      const l = n.manager.getHandler(o.uri);
      l !== null && (a = l);
    }
    return this.loadTextureImage(t, r, a);
  }
  loadTextureImage(t, e, n) {
    const s = this, r = this.json, o = r.textures[t], a = r.images[e], l = (a.uri || a.bufferView) + ":" + o.sampler;
    if (this.textureCache[l])
      return this.textureCache[l];
    const c = this.loadImageSource(e, n).then(function(h) {
      h.flipY = !1, h.name = o.name || a.name || "", h.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (h.name = a.uri);
      const d = (r.samplers || {})[o.sampler] || {};
      return h.magFilter = Vh[d.magFilter] || Qe, h.minFilter = Vh[d.minFilter] || Un, h.wrapS = Gh[d.wrapS] || is, h.wrapT = Gh[d.wrapT] || is, s.associations.set(h, { textures: t }), h;
    }).catch(function() {
      return null;
    });
    return this.textureCache[l] = c, c;
  }
  loadImageSource(t, e) {
    const n = this, s = this.json, r = this.options;
    if (this.sourceCache[t] !== void 0)
      return this.sourceCache[t].then((u) => u.clone());
    const o = s.images[t], a = self.URL || self.webkitURL;
    let l = o.uri || "", c = !1;
    if (o.bufferView !== void 0)
      l = n.getDependency("bufferView", o.bufferView).then(function(u) {
        c = !0;
        const d = new Blob([u], { type: o.mimeType });
        return l = a.createObjectURL(d), l;
      });
    else if (o.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + t + " is missing URI and bufferView");
    const h = Promise.resolve(l).then(function(u) {
      return new Promise(function(d, f) {
        let g = d;
        e.isImageBitmapLoader === !0 && (g = function(_) {
          const p = new Ae(_);
          p.needsUpdate = !0, d(p);
        }), e.load(zs.resolveURL(u, r.path), g, void 0, f);
      });
    }).then(function(u) {
      return c === !0 && a.revokeObjectURL(l), Dn(u, o), u.userData.mimeType = o.mimeType || Ty(o.uri), u;
    }).catch(function(u) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", l), u;
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
      if (n.texCoord !== void 0 && n.texCoord > 0 && (o = o.clone(), o.channel = n.texCoord), r.extensions[kt.KHR_TEXTURE_TRANSFORM]) {
        const a = n.extensions !== void 0 ? n.extensions[kt.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const l = r.associations.get(o);
          o = r.extensions[kt.KHR_TEXTURE_TRANSFORM].extendTexture(o, a), r.associations.set(o, l);
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
      let l = this.cache.get(a);
      l || (l = new Qu(), gn.prototype.copy.call(l, n), l.color.copy(n.color), l.map = n.map, l.sizeAttenuation = !1, this.cache.add(a, l)), n = l;
    } else if (t.isLine) {
      const a = "LineBasicMaterial:" + n.uuid;
      let l = this.cache.get(a);
      l || (l = new po(), gn.prototype.copy.call(l, n), l.color.copy(n.color), l.map = n.map, this.cache.add(a, l)), n = l;
    }
    if (s || r || o) {
      let a = "ClonedMaterial:" + n.uuid + ":";
      s && (a += "derivative-tangents:"), r && (a += "vertex-colors:"), o && (a += "flat-shading:");
      let l = this.cache.get(a);
      l || (l = n.clone(), r && (l.vertexColors = !0), o && (l.flatShading = !0), s && (l.normalScale && (l.normalScale.y *= -1), l.clearcoatNormalScale && (l.clearcoatNormalScale.y *= -1)), this.cache.add(a, l), this.associations.set(l, this.associations.get(n))), n = l;
    }
    t.material = n;
  }
  getMaterialType() {
    return ei;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(t) {
    const e = this, n = this.json, s = this.extensions, r = n.materials[t];
    let o;
    const a = {}, l = r.extensions || {}, c = [];
    if (l[kt.KHR_MATERIALS_UNLIT]) {
      const u = s[kt.KHR_MATERIALS_UNLIT];
      o = u.getMaterialType(), c.push(u.extendParams(a, r, e));
    } else {
      const u = r.pbrMetallicRoughness || {};
      if (a.color = new Tt(1, 1, 1), a.opacity = 1, Array.isArray(u.baseColorFactor)) {
        const d = u.baseColorFactor;
        a.color.setRGB(d[0], d[1], d[2], Ne), a.opacity = d[3];
      }
      u.baseColorTexture !== void 0 && c.push(e.assignTexture(a, "map", u.baseColorTexture, He)), a.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1, a.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1, u.metallicRoughnessTexture !== void 0 && (c.push(e.assignTexture(a, "metalnessMap", u.metallicRoughnessTexture)), c.push(e.assignTexture(a, "roughnessMap", u.metallicRoughnessTexture))), o = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(t);
      }), c.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(t, a);
      })));
    }
    r.doubleSided === !0 && (a.side = fn);
    const h = r.alphaMode || la.OPAQUE;
    if (h === la.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, h === la.MASK && (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)), r.normalTexture !== void 0 && o !== vn && (c.push(e.assignTexture(a, "normalMap", r.normalTexture)), a.normalScale = new tt(1, 1), r.normalTexture.scale !== void 0)) {
      const u = r.normalTexture.scale;
      a.normalScale.set(u, u);
    }
    if (r.occlusionTexture !== void 0 && o !== vn && (c.push(e.assignTexture(a, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && o !== vn) {
      const u = r.emissiveFactor;
      a.emissive = new Tt().setRGB(u[0], u[1], u[2], Ne);
    }
    return r.emissiveTexture !== void 0 && o !== vn && c.push(e.assignTexture(a, "emissiveMap", r.emissiveTexture, He)), Promise.all(c).then(function() {
      const u = new o(a);
      return r.name && (u.name = r.name), Dn(u, r), e.associations.set(u, { materials: t }), r.extensions && di(s, u, r), u;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(t) {
    const e = re.sanitizeNodeName(t || "");
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
      return n[kt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, e).then(function(l) {
        return Wh(l, a, e);
      });
    }
    const o = [];
    for (let a = 0, l = t.length; a < l; a++) {
      const c = t[a], h = by(c), u = s[h];
      if (u)
        o.push(u.promise);
      else {
        let d;
        c.extensions && c.extensions[kt.KHR_DRACO_MESH_COMPRESSION] ? d = r(c) : d = Wh(new Le(), c, e), s[h] = { primitive: c, promise: d }, o.push(d);
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
    for (let l = 0, c = o.length; l < c; l++) {
      const h = o[l].material === void 0 ? My(this.cache) : this.getDependency("material", o[l].material);
      a.push(h);
    }
    return a.push(e.loadGeometries(o)), Promise.all(a).then(function(l) {
      const c = l.slice(0, l.length - 1), h = l[l.length - 1], u = [];
      for (let f = 0, g = h.length; f < g; f++) {
        const _ = h[f], p = o[f];
        let m;
        const y = c[f];
        if (p.mode === nn.TRIANGLES || p.mode === nn.TRIANGLE_STRIP || p.mode === nn.TRIANGLE_FAN || p.mode === void 0)
          m = r.isSkinnedMesh === !0 ? new gv(_, y) : new xe(_, y), m.isSkinnedMesh === !0 && m.normalizeSkinWeights(), p.mode === nn.TRIANGLE_STRIP ? m.geometry = zh(m.geometry, Ru) : p.mode === nn.TRIANGLE_FAN && (m.geometry = zh(m.geometry, Ka));
        else if (p.mode === nn.LINES)
          m = new Ll(_, y);
        else if (p.mode === nn.LINE_STRIP)
          m = new Pl(_, y);
        else if (p.mode === nn.LINE_LOOP)
          m = new yv(_, y);
        else if (p.mode === nn.POINTS)
          m = new Mv(_, y);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + p.mode);
        Object.keys(m.geometry.morphAttributes).length > 0 && Ey(m, r), m.name = e.createUniqueName(r.name || "mesh_" + t), Dn(m, r), p.extensions && di(s, m, p), e.assignFinalMaterial(m), u.push(m);
      }
      for (let f = 0, g = u.length; f < g; f++)
        e.associations.set(u[f], {
          meshes: t,
          primitives: f
        });
      if (u.length === 1)
        return r.extensions && di(s, u[0], r), u[0];
      const d = new _t();
      r.extensions && di(s, d, r), e.associations.set(d, { meshes: t });
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
    return n.type === "perspective" ? e = new Be(Yi.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : n.type === "orthographic" && (e = new wl(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), n.name && (e.name = this.createUniqueName(n.name)), Dn(e, n), Promise.resolve(e);
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
      const r = s.pop(), o = s, a = [], l = [];
      for (let c = 0, h = o.length; c < h; c++) {
        const u = o[c];
        if (u) {
          a.push(u);
          const d = new Dt();
          r !== null && d.fromArray(r.array, c * 16), l.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', e.joints[c]);
      }
      return new Cl(a, l);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(t) {
    const e = this.json, n = this, s = e.animations[t], r = s.name ? s.name : "animation_" + t, o = [], a = [], l = [], c = [], h = [];
    for (let u = 0, d = s.channels.length; u < d; u++) {
      const f = s.channels[u], g = s.samplers[f.sampler], _ = f.target, p = _.node, m = s.parameters !== void 0 ? s.parameters[g.input] : g.input, y = s.parameters !== void 0 ? s.parameters[g.output] : g.output;
      _.node !== void 0 && (o.push(this.getDependency("node", p)), a.push(this.getDependency("accessor", m)), l.push(this.getDependency("accessor", y)), c.push(g), h.push(_));
    }
    return Promise.all([
      Promise.all(o),
      Promise.all(a),
      Promise.all(l),
      Promise.all(c),
      Promise.all(h)
    ]).then(function(u) {
      const d = u[0], f = u[1], g = u[2], _ = u[3], p = u[4], m = [];
      for (let y = 0, v = d.length; y < v; y++) {
        const M = d[y], P = f[y], w = g[y], A = _[y], L = p[y];
        if (M === void 0) continue;
        M.updateMatrix && M.updateMatrix();
        const G = n._createAnimationTracks(M, P, w, A, L);
        if (G)
          for (let x = 0; x < G.length; x++)
            m.push(G[x]);
      }
      return new ox(r, void 0, m);
    });
  }
  createNodeMesh(t) {
    const e = this.json, n = this, s = e.nodes[t];
    return s.mesh === void 0 ? null : n.getDependency("mesh", s.mesh).then(function(r) {
      const o = n._getNodeRef(n.meshCache, s.mesh, r);
      return s.weights !== void 0 && o.traverse(function(a) {
        if (a.isMesh)
          for (let l = 0, c = s.weights.length; l < c; l++)
            a.morphTargetInfluences[l] = s.weights[l];
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
    for (let c = 0, h = a.length; c < h; c++)
      o.push(n.getDependency("node", a[c]));
    const l = s.skin === void 0 ? Promise.resolve(null) : n.getDependency("skin", s.skin);
    return Promise.all([
      r,
      Promise.all(o),
      l
    ]).then(function(c) {
      const h = c[0], u = c[1], d = c[2];
      d !== null && h.traverse(function(f) {
        f.isSkinnedMesh && f.bind(d, Ay);
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
    const r = e.nodes[t], o = r.name ? s.createUniqueName(r.name) : "", a = [], l = s._invokeOne(function(c) {
      return c.createNodeMesh && c.createNodeMesh(t);
    });
    return l && a.push(l), r.camera !== void 0 && a.push(s.getDependency("camera", r.camera).then(function(c) {
      return s._getNodeRef(s.cameraCache, r.camera, c);
    })), s._invokeAll(function(c) {
      return c.createNodeAttachment && c.createNodeAttachment(t);
    }).forEach(function(c) {
      a.push(c);
    }), this.nodeCache[t] = Promise.all(a).then(function(c) {
      let h;
      if (r.isBone === !0 ? h = new Zu() : c.length > 1 ? h = new _t() : c.length === 1 ? h = c[0] : h = new me(), h !== c[0])
        for (let u = 0, d = c.length; u < d; u++)
          h.add(c[u]);
      if (r.name && (h.userData.name = r.name, h.name = o), Dn(h, r), r.extensions && di(n, h, r), r.matrix !== void 0) {
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
    n.name && (r.name = s.createUniqueName(n.name)), Dn(r, n), n.extensions && di(e, r, n);
    const o = n.nodes || [], a = [];
    for (let l = 0, c = o.length; l < c; l++)
      a.push(s.getDependency("node", o[l]));
    return Promise.all(a).then(function(l) {
      for (let h = 0, u = l.length; h < u; h++)
        r.add(l[h]);
      const c = (h) => {
        const u = /* @__PURE__ */ new Map();
        for (const [d, f] of s.associations)
          (d instanceof gn || d instanceof Ae) && u.set(d, f);
        return h.traverse((d) => {
          const f = s.associations.get(d);
          f != null && u.set(d, f);
        }), u;
      };
      return s.associations = c(r), r;
    });
  }
  _createAnimationTracks(t, e, n, s, r) {
    const o = [], a = t.name ? t.name : t.uuid, l = [];
    $n[r.path] === $n.weights ? t.traverse(function(d) {
      d.morphTargetInfluences && l.push(d.name ? d.name : d.uuid);
    }) : l.push(a);
    let c;
    switch ($n[r.path]) {
      case $n.weights:
        c = ls;
        break;
      case $n.rotation:
        c = cs;
        break;
      case $n.position:
      case $n.scale:
        c = hs;
        break;
      default:
        switch (n.itemSize) {
          case 1:
            c = ls;
            break;
          case 2:
          case 3:
          default:
            c = hs;
            break;
        }
        break;
    }
    const h = s.interpolation !== void 0 ? yy[s.interpolation] : $s, u = this._getArrayFromAccessor(n);
    for (let d = 0, f = l.length; d < f; d++) {
      const g = new c(
        l[d] + "." + $n[r.path],
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
      const n = rl(e.constructor), s = new Float32Array(e.length);
      for (let r = 0, o = e.length; r < o; r++)
        s[r] = e[r] * n;
      e = s;
    }
    return e;
  }
  _createCubicSplineTrackInterpolant(t) {
    t.createInterpolant = function(n) {
      const s = this instanceof cs ? xy : md;
      return new s(this.times, this.values, this.getValueSize() / 3, n);
    }, t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function Ry(i, t, e) {
  const n = t.attributes, s = new je();
  if (n.POSITION !== void 0) {
    const a = e.json.accessors[n.POSITION], l = a.min, c = a.max;
    if (l !== void 0 && c !== void 0) {
      if (s.set(
        new R(l[0], l[1], l[2]),
        new R(c[0], c[1], c[2])
      ), a.normalized) {
        const h = rl(Zi[a.componentType]);
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
    const a = new R(), l = new R();
    for (let c = 0, h = r.length; c < h; c++) {
      const u = r[c];
      if (u.POSITION !== void 0) {
        const d = e.json.accessors[u.POSITION], f = d.min, g = d.max;
        if (f !== void 0 && g !== void 0) {
          if (l.setX(Math.max(Math.abs(f[0]), Math.abs(g[0]))), l.setY(Math.max(Math.abs(f[1]), Math.abs(g[1]))), l.setZ(Math.max(Math.abs(f[2]), Math.abs(g[2]))), d.normalized) {
            const _ = rl(Zi[d.componentType]);
            l.multiplyScalar(_);
          }
          a.max(l);
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
function Wh(i, t, e) {
  const n = t.attributes, s = [];
  function r(o, a) {
    return e.getDependency("accessor", o).then(function(l) {
      i.setAttribute(a, l);
    });
  }
  for (const o in n) {
    const a = sl[o] || o.toLowerCase();
    a in i.attributes || s.push(r(n[o], a));
  }
  if (t.indices !== void 0 && !i.index) {
    const o = e.getDependency("accessor", t.indices).then(function(a) {
      i.setIndex(a);
    });
    s.push(o);
  }
  return qt.workingColorSpace !== Ne && "COLOR_0" in n && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qt.workingColorSpace}" not supported.`), Dn(i, t), Ry(i, t, e), Promise.all(s).then(function() {
    return t.targets !== void 0 ? Sy(i, t.targets, e) : i;
  });
}
const Ee = 10251071, ha = 7306636, te = 12106948, Fe = 15921906, Pe = 2830134, Ps = 8962256;
function X(i, t = {}) {
  return new ei({
    color: i,
    roughness: 0.8,
    metalness: 0.05,
    ...t
  });
}
function J(i, t, e, n, s = 0, r = 0, o = 0) {
  const a = new xe(new ii(i, t, e), n);
  return a.position.set(s, r, o), a.castShadow = !0, a.receiveShadow = !0, a;
}
function zt(i, t, e, n, s = 0, r = 0, o = 0, a = 16) {
  const l = new xe(new Nl(i, t, e, a), n);
  return l.position.set(s, r, o), l.castShadow = !0, l.receiveShadow = !0, l;
}
function ht(i, t) {
  return i.material.color.copy(t), i;
}
const ol = {
  sofa: (i) => {
    const t = new _t(), e = X(ha);
    return t.add(ht(J(1.9, 0.4, 0.85, e, 0, 0.2, 0), i)), t.add(ht(J(1.9, 0.5, 0.2, e, 0, 0.55, -0.32), i)), t.add(ht(J(0.2, 0.45, 0.85, e, -0.85, 0.5, 0), i)), t.add(ht(J(0.2, 0.45, 0.85, e, 0.85, 0.5, 0), i)), t;
  },
  bed: (i) => {
    const t = new _t();
    return t.add(J(1.6, 0.3, 2, X(Ee), 0, 0.15, 0)), t.add(ht(J(1.55, 0.18, 1.95, X(Fe), 0, 0.39, 0), i)), t.add(J(1.6, 0.6, 0.1, X(Ee), 0, 0.5, -0.95)), t.add(J(0.5, 0.12, 0.35, X(Fe), -0.45, 0.5, -0.7)), t.add(J(0.5, 0.12, 0.35, X(Fe), 0.45, 0.5, -0.7)), t;
  },
  table: (i) => {
    const t = new _t(), e = X(Ee);
    t.add(ht(J(1.4, 0.06, 0.8, e, 0, 0.74, 0), i));
    const n = 0.62, s = 0.32;
    for (const [r, o] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(J(0.07, 0.74, 0.07, e, r * n, 0.37, o * s));
    return t;
  },
  chair: (i) => {
    const t = new _t(), e = X(Ee);
    t.add(ht(J(0.45, 0.05, 0.45, e, 0, 0.45, 0), i)), t.add(ht(J(0.45, 0.45, 0.05, e, 0, 0.68, -0.2), i));
    const n = 0.18, s = 0.18;
    for (const [r, o] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(J(0.05, 0.45, 0.05, e, r * n, 0.22, o * s));
    return t;
  },
  wardrobe: (i) => {
    const t = new _t();
    return t.add(ht(J(1.2, 2, 0.6, X(Ee), 0, 1, 0), i)), t.add(J(0.04, 1.8, 0.02, X(te), -0.02, 1, 0.31)), t.add(zt(0.02, 0.02, 0.15, X(te), -0.2, 1, 0.32)), t.add(zt(0.02, 0.02, 0.15, X(te), 0.16, 1, 0.32)), t;
  },
  kitchen_counter: (i) => {
    const t = new _t();
    return t.add(ht(J(2, 0.85, 0.6, X(Fe), 0, 0.425, 0), i)), t.add(J(2.05, 0.05, 0.65, X(Pe), 0, 0.875, 0)), t;
  },
  tv: (i) => {
    const t = new _t();
    t.add(J(1.2, 0.7, 0.05, X(Pe), 0, 0.95, 0));
    const e = J(1.1, 0.6, 0.02, X(657930, { emissive: 1119255 }), 0, 0.95, 0.03);
    return t.add(e), t.add(J(0.4, 0.05, 0.2, X(Pe), 0, 0.6, 0)), ht(t.children[0], i), t;
  },
  fridge: (i) => {
    const t = new _t();
    return t.add(ht(J(0.7, 1.8, 0.7, X(te), 0, 0.9, 0), i)), t.add(J(0.04, 0.1, 0.02, X(Pe), 0.3, 1.3, 0.36)), t.add(J(0.04, 0.1, 0.02, X(Pe), 0.3, 0.6, 0.36)), t;
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
    return t.add(ht(J(0.85, 2, 0.05, X(Ee), 0, 1, 0), i)), t.add(zt(0.03, 0.03, 0.1, X(te), 0.32, 1, 0.05)), t;
  },
  window_frame: (i) => {
    const t = new _t(), e = X(Fe);
    return t.add(ht(J(1, 0.05, 0.08, e, 0, 1.5, 0), i)), t.add(ht(J(1, 0.05, 0.08, e, 0, 0.9, 0), i)), t.add(J(0.05, 0.6, 0.08, e, -0.47, 1.2, 0)), t.add(J(0.05, 0.6, 0.08, e, 0.47, 1.2, 0)), t.add(J(0.9, 0.55, 0.01, X(Ps, { transparent: !0, opacity: 0.35 }), 0, 1.2, 0)), t;
  },
  ceiling_light: (i) => {
    const t = new _t(), e = zt(0.18, 0.22, 0.12, X(Fe, { emissive: 0 }), 0, 0, 0);
    return e.name = "emissive", t.add(ht(e, i)), t.add(zt(0.01, 0.01, 0.25, X(te), 0, 0.18, 0)), t;
  },
  ac_unit: (i) => {
    const t = new _t();
    return t.add(ht(J(0.9, 0.28, 0.18, X(Fe), 0, 0, 0), i)), t.add(J(0.8, 0.04, 0.02, X(Pe), 0, -0.1, 0.09)), t;
  },
  intercom: (i) => {
    const t = new _t();
    t.add(ht(J(0.16, 0.26, 0.04, X(Pe), 0, 0, 0), i));
    const e = J(0.12, 0.14, 0.01, X(1053720, { emissive: 666170 }), 0, 0.03, 0.025);
    return e.name = "emissive", t.add(e), t;
  },
  armchair: (i) => {
    const t = new _t(), e = X(ha);
    return t.add(ht(J(0.85, 0.4, 0.85, e, 0, 0.2, 0), i)), t.add(ht(J(0.85, 0.5, 0.18, e, 0, 0.55, -0.33), i)), t.add(ht(J(0.16, 0.45, 0.85, e, -0.42, 0.5, 0), i)), t.add(ht(J(0.16, 0.45, 0.85, e, 0.42, 0.5, 0), i)), t;
  },
  coffee_table: (i) => {
    const t = new _t();
    t.add(ht(J(1, 0.05, 0.55, X(Ee), 0, 0.4, 0), i));
    for (const [e, n] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(J(0.06, 0.4, 0.06, X(Ee), e * 0.42, 0.2, n * 0.22));
    return t;
  },
  dining_table: (i) => {
    const t = new _t();
    t.add(ht(J(1.8, 0.06, 0.95, X(Ee), 0, 0.75, 0), i));
    for (const [e, n] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(J(0.08, 0.75, 0.08, X(Ee), e * 0.8, 0.37, n * 0.4));
    return t;
  },
  bookshelf: (i) => {
    const t = new _t();
    t.add(ht(J(1, 1.8, 0.32, X(Ee), 0, 0.9, 0), i));
    for (let e = 1; e <= 4; e++) t.add(J(0.94, 0.03, 0.3, X(Pe), 0, e * 0.36, 0));
    return t;
  },
  desk: (i) => {
    const t = new _t();
    return t.add(ht(J(1.3, 0.05, 0.65, X(Ee), 0, 0.74, 0), i)), t.add(J(0.5, 0.7, 0.6, X(Pe), 0.35, 0.37, 0)), t.add(J(0.05, 0.74, 0.6, X(Ee), -0.6, 0.37, 0)), t;
  },
  office_chair: (i) => {
    const t = new _t();
    return t.add(ht(J(0.5, 0.06, 0.5, X(Pe), 0, 0.5, 0), i)), t.add(ht(J(0.5, 0.5, 0.06, X(Pe), 0, 0.78, -0.22), i)), t.add(zt(0.04, 0.04, 0.45, X(te), 0, 0.25, 0)), t.add(zt(0.26, 0.26, 0.04, X(te), 0, 0.04, 0)), t;
  },
  nightstand: (i) => {
    const t = new _t();
    return t.add(ht(J(0.45, 0.5, 0.4, X(Ee), 0, 0.25, 0), i)), t.add(J(0.4, 0.02, 0.02, X(te), 0, 0.32, 0.21)), t;
  },
  dresser: (i) => {
    const t = new _t();
    t.add(ht(J(1.1, 0.85, 0.5, X(Ee), 0, 0.42, 0), i));
    for (let e = 0; e < 3; e++) t.add(J(0.9, 0.02, 0.02, X(te), 0, 0.2 + e * 0.25, 0.26));
    return t;
  },
  stove: (i) => {
    const t = new _t();
    t.add(ht(J(0.6, 0.85, 0.6, X(te), 0, 0.42, 0), i)), t.add(J(0.55, 0.02, 0.55, X(Pe), 0, 0.86, 0));
    for (const [e, n] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(zt(0.08, 0.08, 0.01, X(2236962), e * 0.13, 0.875, n * 0.13));
    return t;
  },
  microwave: (i) => {
    const t = new _t();
    return t.add(ht(J(0.5, 0.3, 0.35, X(Pe), 0, 0.15, 0), i)), t.add(J(0.32, 0.22, 0.01, X(1053720, { emissive: 662050 }), -0.05, 0.15, 0.18)), t;
  },
  dishwasher: (i) => {
    const t = new _t();
    return t.add(ht(J(0.6, 0.85, 0.6, X(te), 0, 0.42, 0), i)), t.add(J(0.5, 0.02, 0.02, X(Pe), 0, 0.75, 0.31)), t;
  },
  washing_machine: (i) => {
    const t = new _t();
    return t.add(ht(J(0.6, 0.85, 0.6, X(Fe), 0, 0.42, 0), i)), t.add(zt(0.2, 0.2, 0.04, X(Pe), 0, 0.45, 0.31).rotateX(Math.PI / 2)), t;
  },
  bathtub: (i) => {
    const t = new _t();
    return t.add(ht(J(1.6, 0.55, 0.75, X(Fe), 0, 0.275, 0), i)), t.add(J(1.45, 0.2, 0.6, X(14675698), 0, 0.4, 0)), t;
  },
  shower: (i) => {
    const t = new _t();
    return t.add(ht(J(0.9, 0.04, 0.9, X(Fe), 0, 0.02, 0), i)), t.add(J(0.04, 2, 0.9, X(Ps, { transparent: !0, opacity: 0.25 }), -0.43, 1, 0)), t.add(J(0.9, 2, 0.04, X(Ps, { transparent: !0, opacity: 0.25 }), 0, 1, -0.43)), t.add(zt(0.06, 0.06, 0.04, X(te), 0.3, 1.9, 0.3)), t;
  },
  mirror: (i) => {
    const t = new _t();
    return t.add(ht(J(0.6, 0.9, 0.04, X(te), 0, 0, 0), i)), t.add(J(0.5, 0.8, 0.01, X(11195616, { metalness: 0.9, roughness: 0.1 }), 0, 0, 0.03)), t;
  },
  plant: (i) => {
    const t = new _t();
    return t.add(zt(0.16, 0.2, 0.3, X(9067056), 0, 0.15, 0)), t.add(ht(new xe(new Ol(0.32, 0), X(4160831)), i).translateY(0.6)), t;
  },
  rug: (i) => {
    const t = new _t();
    return t.add(ht(J(2, 0.02, 1.4, X(8930372), 0, 0.012, 0), i)), t;
  },
  stairs: (i) => {
    const t = new _t(), e = 8;
    for (let n = 0; n < e; n++)
      t.add(ht(J(1, 0.18, 0.3, X(Ee), 0, 0.09 + n * 0.18, -n * 0.3), i));
    return t;
  },
  curtain: (i) => {
    const t = new _t();
    return t.add(ht(J(1.4, 1.8, 0.05, X(ha), 0, 1.4, 0), i)), t;
  },
  painting: (i) => {
    const t = new _t();
    return t.add(ht(J(0.7, 0.5, 0.04, X(Ee), 0, 0, 0), i)), t.add(J(0.6, 0.4, 0.01, X(6719658), 0, 0, 0.03)), t;
  },
  speaker: (i) => {
    const t = new _t();
    return t.add(ht(J(0.25, 0.4, 0.25, X(Pe), 0, 0.2, 0), i)), t.add(zt(0.08, 0.08, 0.01, X(1118481), 0, 0.26, 0.13).rotateX(Math.PI / 2)), t;
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
      const n = e / 6 * Math.PI * 2, s = new xe(
        new go(0.06, 10, 10),
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
    t.add(zt(8e-3, 8e-3, 0.4, X(Pe), 0, 0.2, 0));
    const e = zt(0.16, 0.05, 0.2, X(16774358, { emissive: 0 }), 0, -0.1, 0);
    return e.name = "emissive", t.add(ht(e, i)), t;
  },
  led_strip: (i) => {
    const t = new _t(), e = J(1.5, 0.03, 0.04, X(16777215, { emissive: 0 }), 0, 0, 0);
    return e.name = "emissive", t.add(ht(e, i)), t;
  },
  double_door: (i) => {
    const t = new _t();
    return t.add(ht(J(0.7, 2, 0.05, X(Ee), -0.36, 1, 0), i)), t.add(ht(J(0.7, 2, 0.05, X(Ee), 0.36, 1, 0), i)), t.add(zt(0.025, 0.025, 0.1, X(te), -0.05, 1, 0.05)), t.add(zt(0.025, 0.025, 0.1, X(te), 0.05, 1, 0.05)), t;
  },
  sliding_door: (i) => {
    const t = new _t();
    return t.add(J(1.6, 0.06, 0.08, X(te), 0, 2.05, 0)), t.add(ht(J(0.78, 1.95, 0.04, X(Ps, { transparent: !0, opacity: 0.4 }), -0.4, 1, 0), i)), t.add(ht(J(0.78, 1.95, 0.04, X(Ps, { transparent: !0, opacity: 0.4 }), 0.4, 1, 0.05), i)), t;
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
    return t.add(ht(zt(0.18, 0.18, 0.05, X(Ee), 0, 0.66, 0), i)), t.add(zt(0.03, 0.03, 0.66, X(te), 0, 0.33, 0)), t.add(zt(0.2, 0.2, 0.02, X(te), 0, 0.02, 0)), t;
  },
  tv_stand: (i) => {
    const t = new _t();
    return t.add(ht(J(1.4, 0.4, 0.4, X(Pe), 0, 0.2, 0), i)), t.add(J(0.6, 0.02, 0.36, X(te), -0.35, 0.41, 0)), t;
  },
  // Generic fallback marker so an unknown model key still renders something.
  marker: (i) => {
    const t = new _t();
    return t.add(ht(zt(0, 0.12, 0.3, X(16733525), 0, 0.15, 0, 8), i)), t;
  }
}, Cy = Object.keys(ol).filter((i) => i !== "marker"), al = [
  "ceiling_light",
  "floor_lamp",
  "table_lamp",
  "wall_light",
  "chandelier",
  "spotlight",
  "pendant_light",
  "led_strip"
];
function Py(i) {
  if (al.includes(i)) return ["light", "switch"];
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
function Ly(i, t = 2.6) {
  return i === "ceiling_light" || i === "chandelier" || i === "pendant_light" ? t - 0.05 : i === "spotlight" || i === "led_strip" ? t - 0.02 : i === "wall_light" || i === "ac_unit" || i === "security_camera" ? 2 : i === "painting" || i === "mirror" || i === "tv" || i === "intercom" ? 1.4 : i === "curtain" ? 0.1 : 0;
}
function ll(i, t) {
  const e = ol[i] ?? ol.marker, n = new Tt(t ?? "#ffffff"), s = e(n);
  return s.userData.model = i, s;
}
const Iy = new qx(), Xh = /* @__PURE__ */ new Map();
function Dy(i) {
  let t = Xh.get(i);
  return t || (t = new Promise((e, n) => {
    Iy.load(
      i,
      (s) => {
        s.scene.traverse((r) => {
          r.castShadow = !0, r.receiveShadow = !0;
        }), e(s.scene);
      },
      void 0,
      (s) => n(s)
    );
  }), Xh.set(i, t)), t;
}
function $h(i, t) {
  i.position.set(t.position[0], t.position[1], t.position[2]), t.rotation && (i.rotation.y = Yi.degToRad(t.rotation));
  const e = t.scale ?? 1;
  Array.isArray(e) ? i.scale.set(e[0], e[1], e[2]) : i.scale.setScalar(e);
}
function Ny(i, t) {
  const e = t ? new Tt(t) : null;
  i.traverse((n) => {
    const s = n;
    if (s.isMesh && (s.geometry && (s.geometry = s.geometry.clone()), s.material))
      if (Array.isArray(s.material))
        s.material = s.material.map((r) => {
          const o = r.clone();
          return e && o.color && o.color.multiply(e), o;
        });
      else {
        const r = s.material.clone();
        e && r.color && r.color.multiply(e), s.material = r;
      }
  });
}
function Uy(i) {
  if (i.glb) {
    const e = new _t();
    $h(e, i), e.userData.furnitureId = i.id;
    const n = ll("marker", i.color);
    return e.add(n), Dy(i.glb).then((s) => {
      const r = s.clone(!0);
      Ny(r, i.color), e.remove(n), e.add(r);
    }).catch((s) => {
      console.error(`[3d-floorplan] failed to load GLB "${i.glb}":`, s);
    }), e;
  }
  const t = ll(i.model, i.color);
  return $h(t, i), t.userData.furnitureId = i.id, t;
}
class Wl {
  constructor(t = 1) {
    this.current = "", this.canvas = document.createElement("canvas"), this.canvas.width = 256, this.canvas.height = 128, this.ctx = this.canvas.getContext("2d"), this.texture = new Sv(this.canvas), this.texture.anisotropy = 4;
    const e = new Yu({
      map: this.texture,
      transparent: !0,
      depthWrite: !1,
      depthTest: !1
    });
    this.sprite = new pv(e), this.sprite.scale.set(1 * t, 0.5 * t, 1), this.sprite.renderOrder = 999;
  }
  setText(t, e = "#ffffff") {
    if (t === this.current) return;
    this.current = t;
    const n = this.ctx;
    n.clearRect(0, 0, this.canvas.width, this.canvas.height), n.fillStyle = "rgba(20,22,26,0.78)", Oy(n, 8, 28, 240, 72, 16), n.fill(), n.fillStyle = e, n.font = "bold 48px system-ui, sans-serif", n.textAlign = "center", n.textBaseline = "middle", n.fillText(t, 128, 64, 224), this.texture.needsUpdate = !0;
  }
  setPosition(t, e, n) {
    this.sprite.position.set(t, e, n);
  }
  dispose() {
    this.texture.dispose(), this.sprite.material.dispose();
  }
}
function Oy(i, t, e, n, s, r) {
  i.beginPath(), i.moveTo(t + r, e), i.arcTo(t + n, e, t + n, e + s, r), i.arcTo(t + n, e + s, t, e + s, r), i.arcTo(t, e + s, t, e, r), i.arcTo(t, e, t + n, e, r), i.closePath();
}
const Fy = 2.6, By = 0.12;
function ky(i) {
  return new ei({
    color: i ?? "#e6e6e6",
    roughness: 0.95,
    metalness: 0
  });
}
function Vi(i, t, e, n, s, r, o, a, l, c) {
  const h = r - s;
  if (h <= 1e-4) return;
  const u = a - o;
  if (u <= 1e-4) return;
  const d = new ii(h, u, l), f = new xe(d, c);
  f.castShadow = !0, f.receiveShadow = !0;
  const g = s + h / 2, _ = t.x + e.x * g, p = t.y + e.y * g;
  f.position.set(_, o + u / 2, p), f.rotation.y = n, i.add(f);
}
function zy(i, t, e, n) {
  const s = new tt(t.start[0], t.start[1]), o = new tt(t.end[0], t.end[1]).clone().sub(s), a = o.length();
  if (a <= 1e-4) return null;
  const l = o.clone().normalize(), c = new _t();
  c.userData.wallIndex = n;
  const u = -Math.atan2(l.y, l.x), d = t.height ?? e, f = t.thickness ?? By, g = ky(t.color), _ = new ei({ color: 10251071, roughness: 0.7 }), p = new ei({
    color: 8962256,
    transparent: !0,
    opacity: 0.35,
    roughness: 0.1,
    metalness: 0.1
  }), m = [...t.openings ?? []].sort((v, M) => v.position - M.position);
  let y = 0;
  for (const v of m) {
    const M = jh(v.position, 0, a), P = jh(v.position + v.width, 0, a);
    if (P <= y) continue;
    Vi(c, s, l, u, y, M, 0, d, f, g);
    const w = v.sill ?? (v.kind === "window" ? 0.9 : 0), A = v.top ?? (v.kind === "window" ? 2.1 : 2.05);
    w > 0 && Vi(c, s, l, u, M, P, 0, w, f, g), A < d && Vi(c, s, l, u, M, P, A, d, f, g), v.kind === "door" ? Vi(c, s, l, u, M, P, w, A, 0.05, _) : Vi(c, s, l, u, M, P, w, A, 0.03, p), y = Math.max(y, P);
  }
  return Vi(c, s, l, u, y, a, 0, d, f, g), i.add(c), c;
}
function Hy(i, t, e) {
  if (!t.polygon || t.polygon.length < 3) return null;
  const n = new sd();
  t.polygon.forEach((l, c) => {
    c === 0 ? n.moveTo(l[0], l[1]) : n.lineTo(l[0], l[1]);
  }), n.closePath();
  const s = new Fl(n);
  s.rotateX(Math.PI / 2);
  const r = new xe(
    s,
    new ei({
      color: t.color ?? "#cfc7ba",
      roughness: 1,
      metalness: 0,
      side: fn
    })
  );
  r.position.y = 5e-3, r.receiveShadow = !0, r.userData.roomIndex = e, i.add(r);
  let o = 0, a = 0;
  for (const l of t.polygon)
    o += l[0], a += l[1];
  return {
    centroid: new tt(o / t.polygon.length, a / t.polygon.length),
    mesh: r
  };
}
function Vy(i, t) {
  const e = new _t();
  e.position.y = i.elevation ?? 0;
  const n = i.wallHeight ?? t ?? Fy, s = [], r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map();
  (i.rooms ?? []).forEach((c, h) => {
    const u = Hy(e, c, h);
    if (u && (o.set(h, u.mesh), c.name)) {
      const d = new Wl(1.4);
      d.setText(c.name, "#e8e8e8"), d.setPosition(u.centroid.x, 0.05, u.centroid.y), s.push(d), e.add(d.sprite);
    }
  }), (i.walls ?? []).forEach((c, h) => {
    const u = zy(e, c, n, h);
    u && r.set(h, u);
  });
  const a = /* @__PURE__ */ new Map();
  for (const c of i.furniture ?? []) {
    const h = Uy(c);
    e.add(h), c.id && a.set(c.id, h);
  }
  const l = new je().setFromObject(e);
  return { group: e, furnitureById: a, wallById: r, roomById: o, bbox: l, labels: s };
}
function jh(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
const Gy = /* @__PURE__ */ new Set(["light", "switch", "fan", "cover", "media_player"]);
function gd(i) {
  return i.split(".")[0];
}
function Wy(i) {
  return i.behavior && i.behavior !== "auto" ? i.behavior : gd(i.entity_id);
}
function Xy(i) {
  const t = [];
  i.traverse((n) => {
    const s = n;
    s.isMesh && (s.name === "emissive" ? t.unshift(s) : t.push(s));
  });
  const e = t.filter((n) => n.name === "emissive");
  return e.length ? e : t;
}
class $y {
  constructor(t) {
    this.bindings = [], this.byEntity = /* @__PURE__ */ new Map(), this.root = t;
  }
  /** Register all bindings for a freshly built floor. */
  register(t, e) {
    for (const n of e) {
      const s = Wy(n);
      let r = null;
      const o = new R();
      n.anchor_object && t.furnitureById.has(n.anchor_object) ? (r = t.furnitureById.get(n.anchor_object), r.getWorldPosition(o)) : n.anchor ? (o.set(n.anchor[0], n.anchor[1], n.anchor[2]), o.y += t.group.position.y) : (t.bbox.getCenter(o), o.y = t.group.position.y + 1.5);
      const a = {
        def: n,
        behavior: s,
        anchor: r,
        worldPos: o,
        emissiveMeshes: r ? Xy(r) : []
      };
      this.setupVisual(a, t), this.bindings.push(a), this.byEntity.has(n.entity_id) || this.byEntity.set(n.entity_id, []), this.byEntity.get(n.entity_id).push(a), r && (r.userData.bindingEntity = n.entity_id);
    }
  }
  setupVisual(t, e) {
    const { behavior: n, worldPos: s } = t;
    if (n === "light") {
      const r = new ud(16773584, 0, 8, 2);
      r.position.copy(s), r.castShadow = !1, this.root.add(r), t.pointLight = r;
    }
    if (n === "climate" || n === "sensor" || n === "binary_sensor" || n === "lock" || n === "media_player" || n === "label") {
      const r = new Wl(1.2), o = t.anchor ? 0.6 : 0;
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
        t.label?.setText(`${qh(s)}: ${n}${r}`, "#ffe7a0");
        break;
      }
      case "binary_sensor": {
        const r = n === "on";
        t.label?.setText(
          `${qh(s)}: ${r ? "ON" : "off"}`,
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
function jy(i, t) {
  const e = gd(i), n = { entity_id: i };
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
      return Gy.has(e) ? { domain: e, service: "toggle", data: n } : null;
  }
}
function qh(i) {
  return i.length > 18 ? i.slice(0, 16) + "…" : i;
}
class qy {
  constructor(t, e = "#1b1d22") {
    this.clock = new yx(), this.running = !1, this.rafId = 0, this.floors = [], this.floorGroups = [], this.bindingManagers = [], this.activeFloor = 0, this.fullBBox = new je(), this.raycaster = new Px(), this.pointer = new tt(), this.downPos = { x: 0, y: 0 }, this.downTime = 0, this.previewGroup = new _t(), this.editing = !1, this.groundPlane = new Nn(new R(0, 1, 0), 0), this.container = t, this.renderer = new $u({ antialias: !0, alpha: !1 }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = mu, this.renderer.domElement.style.touchAction = "none", this.renderer.domElement.style.display = "block", this.renderer.domElement.style.width = "100%", this.renderer.domElement.style.height = "100%", t.appendChild(this.renderer.domElement), this.scene = new ju(), this.scene.background = new Tt(e), this.scene.add(this.previewGroup), this.camera = new Be(55, 1, 0.1, 1e3), this.camera.position.set(8, 8, 8), this.controls = new Ux(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.dampingFactor = 0.12, this.controls.screenSpacePanning = !1, this.controls.zoomToCursor = !0, this.controls.minDistance = 2, this.controls.maxDistance = 40, this.controls.maxPolarAngle = Math.PI * 0.49, this.controls.touches = {
      ONE: dn.ROTATE,
      TWO: dn.DOLLY_PAN
    }, this.controls.addEventListener("change", () => this.clampTarget()), this.setupLights(), this.setupResize(), this.setupPointer();
  }
  setupLights() {
    const t = new dd(16777215, 0.55);
    this.scene.add(t);
    const e = new zl(16777215, 0.9);
    e.position.set(10, 18, 8), e.castShadow = !0, e.shadow.mapSize.set(1024, 1024), e.shadow.camera.near = 1, e.shadow.camera.far = 60;
    const n = 20;
    e.shadow.camera.left = -n, e.shadow.camera.right = n, e.shadow.camera.top = n, e.shadow.camera.bottom = -n, this.scene.add(e);
    const s = new px(16777215, 4473941, 0.4);
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
      const l = Vy(a, t.wallHeight), c = new $y(l.group);
      c.register(l, a.bindings ?? []), this.scene.add(l.group), this.floors.push(l), this.floorGroups.push(l.group), this.bindingManagers.push(c), this.fullBBox.union(l.bbox);
    });
    const o = e ? Math.min(r, this.floors.length - 1) : 0;
    this.activeFloor = Math.max(0, o), this.floorGroups.forEach((a, l) => a.visible = l === this.activeFloor), e ? (this.controls.target.copy(n), this.camera.position.copy(s), this.controls.update()) : this.resetView();
  }
  clearPlan() {
    for (const t of this.bindingManagers) t.dispose();
    for (const t of this.floors)
      for (const e of t.labels) e.dispose();
    for (const t of this.floorGroups)
      this.scene.remove(t), Yy(t);
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
      new R(-4, 0, -4),
      new R(4, 2.6, 4)
    ));
    const e = t.getCenter(new R()), n = t.getSize(new R()), s = Math.max(n.x, n.z, 2);
    this.controls.target.copy(e);
    const r = s * 1.4 + 4;
    this.camera.position.set(e.x + r * 0.7, e.y + r * 0.8, e.z + r * 0.7), this.controls.maxDistance = r * 2.2, this.controls.minDistance = Math.max(1.5, s * 0.15), this.camera.lookAt(e), this.controls.update();
  }
  /** Keep the orbit target from drifting outside the floor bbox + margin. */
  clampTarget() {
    const t = this.floors[this.activeFloor]?.bbox ?? this.fullBBox;
    if (t.isEmpty()) return;
    const e = 3, n = this.controls.target, s = Yi.clamp(n.x, t.min.x - e, t.max.x + e), r = Yi.clamp(n.y, t.min.y, t.max.y + 1), o = Yi.clamp(n.z, t.min.z - e, t.max.z + e);
    this.camera.position.x += s - n.x, this.camera.position.y += r - n.y, this.camera.position.z += o - n.z, n.set(s, r, o);
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
    this.editing = t, this.groundPlane.constant = -e, t ? (this.gridHelper || (this.gridHelper = new Lx(40, 80, 4891647, 2765632), this.gridHelper.material.transparent = !0, this.gridHelper.material.opacity = 0.5, this.scene.add(this.gridHelper)), this.gridHelper.position.y = e + 2e-3, this.gridHelper.visible = !0) : (this.gridHelper && (this.gridHelper.visible = !1), this.clearPreview(), this.setSelection(null));
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
  getWallObject(t) {
    return this.floors[this.activeFloor]?.wallById.get(t);
  }
  getRoomObject(t) {
    return this.floors[this.activeFloor]?.roomById.get(t);
  }
  /** Raycast for a wall sub-group (returns its wall array-index). */
  pickWall(t) {
    return this.pickByUserData(t, "wallIndex");
  }
  /** Raycast for a room floor mesh (returns its room array-index). */
  pickRoom(t) {
    return this.pickByUserData(t, "roomIndex");
  }
  pickByUserData(t, e) {
    const n = this.floorGroups[this.activeFloor];
    if (!n) return null;
    const s = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = (t.clientX - s.left) / s.width * 2 - 1, this.pointer.y = -((t.clientY - s.top) / s.height) * 2 + 1, this.raycaster.setFromCamera(this.pointer, this.camera);
    const r = this.raycaster.intersectObject(n, !0);
    for (const o of r) {
      let a = o.object;
      for (; a; ) {
        const l = a.userData?.[e];
        if (typeof l == "number") return { index: l, object: a };
        a = a.parent;
      }
    }
    return null;
  }
  /** Highlight a selected object with a bounding box, or clear it. */
  setSelection(t) {
    this.selectionHelper && (this.scene.remove(this.selectionHelper), this.selectionHelper.geometry.dispose(), this.selectionHelper = void 0), t && (this.selectionHelper = new Ix(t, 5230698), this.scene.add(this.selectionHelper));
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
    const n = new R();
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
function Yy(i) {
  i.traverse((t) => {
    const e = t;
    e.geometry && e.geometry.dispose(), e.material && (Array.isArray(e.material) ? e.material : [e.material]).forEach((s) => s.dispose());
  });
}
const Ky = "0.8.1", ro = "ha-3d-floorplan-sidebar-item", Yh = "ha-3d-floorplan-overlay";
function Zy() {
  return window.ha3dFloorplan ?? {};
}
function Jy(i) {
  const t = i.shadowRoot;
  return t.querySelector("ha-md-list") || t.querySelector("paper-listbox") || t.querySelector("ul.ha-scrollbar") || t.querySelector("ul") || t.querySelector(".menu");
}
function Qy(i) {
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
    s.preventDefault(), nM(i);
  }), t;
}
function Kh(i, t) {
  const e = i.shadowRoot;
  if (e.getElementById(ro)) return;
  const n = Jy(i), s = Qy(t);
  n && n.parentNode ? n.parentNode.insertBefore(s, n.nextSibling) : e.appendChild(s);
}
function tM(i) {
  if (i.config) return { type: "custom:ha-3d-floorplan-card", height: "100vh", ...i.config };
  const t = { type: "custom:ha-3d-floorplan-card", height: "100vh" };
  return i.url && (t.url = i.url), t;
}
function eM() {
  const e = document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-sidebar");
  if (!e) return 0;
  const n = e.getBoundingClientRect();
  return n.width === 0 || n.right <= 0 ? 0 : Math.max(0, Math.round(n.right));
}
function nM(i) {
  if (document.getElementById(Yh)) return;
  const t = document.createElement("div");
  t.id = Yh, t.style.cssText = [
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
    t.style.left = `${eM()}px`;
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
  const l = document.createElement("ha-3d-floorplan-card");
  l.style.cssText = "display:block;width:100%;height:100%;";
  try {
    l.setConfig(tM(i));
  } catch (_) {
    console.error("[3d-floorplan] sidebar config error:", _);
  }
  const c = document.querySelector("home-assistant");
  c?.hass && (l.hass = c.hass);
  const h = window.setInterval(() => {
    c?.hass && (l.hass = c.hass), location.pathname !== u && f();
  }, 1e3), u = location.pathname, d = () => {
    location.pathname !== u && f();
  }, f = () => {
    window.clearInterval(h), window.clearInterval(o), window.removeEventListener("resize", e), window.removeEventListener("location-changed", d), window.removeEventListener("popstate", d), n?.disconnect(), t.remove(), document.removeEventListener("keydown", g);
  }, g = (_) => {
    _.key === "Escape" && f();
  };
  window.addEventListener("location-changed", d), window.addEventListener("popstate", d), a.addEventListener("click", f), document.addEventListener("keydown", g), t.appendChild(a), t.appendChild(l), document.body.appendChild(t);
}
function iM() {
  const e = document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-sidebar");
  return e && e.shadowRoot ? e : null;
}
let Zh = !1;
function sM() {
  const i = Zy();
  if (i.sidebar === !1 || Zh) return;
  Zh = !0;
  const t = () => {
    const e = iM();
    if (!e) return;
    const n = e.shadowRoot;
    if (n.querySelector(
      'a[href="/3d-floorplan"], a[href$="/3d-floorplan"], a[href$="/ha-3d-floorplan-card"]'
    ) || window.__ha3dPanelMode) {
      n.getElementById(ro)?.remove();
      return;
    }
    if (Kh(e, i), !e.__ha3dObs) {
      const r = e.shadowRoot, o = new MutationObserver(() => {
        r.getElementById(ro) || Kh(e, i);
      });
      o.observe(r, { childList: !0, subtree: !0 }), e.__ha3dObs = o;
    }
  };
  t(), window.setInterval(t, 1500);
}
const rM = {
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
}, oo = 0.1, Jh = 0.4, oM = 0.3, Qh = Math.PI / 12, aM = 0.12, tu = 0.25, jn = (i) => Math.round(i / oo) * oo;
class lM {
  constructor(t, e) {
    this.floorIndex = 0, this.tool = "wall", this.selectedModel = "sofa", this.selectedKind = null, this.selectedId = null, this.selectedWall = -1, this.selectedRoom = -1, this.chain = [], this.cursor = null, this.snapEnabled = !0, this.snapInfo = null, this.sm = t, this.plan = e;
  }
  get pointCount() {
    return this.chain.length;
  }
  start() {
    this.measureLabel = new Wl(1.2), this.measureLabel.sprite.visible = !1, this.sm.scene.add(this.measureLabel.sprite), this.applySceneEditState(), this.setTool("wall");
  }
  stop() {
    this.cancelChain(), this.measureLabel && (this.sm.scene.remove(this.measureLabel.sprite), this.measureLabel.dispose(), this.measureLabel = void 0), this.sm.setGroundHandler(void 0), this.sm.setEditMode(!1), this.sm.setDrawMode(!1);
  }
  setSnap(t) {
    this.snapEnabled = t, this.onChange?.();
  }
  /** Switch the floor being edited; keeps the scene's visible floor, grid
   *  elevation and edit target in lockstep. */
  setFloor(t) {
    t < 0 || t >= this.plan.floors.length || (this.cancelChain(), this.clearSelection(), this.floorIndex = t, this.sm.setActiveFloor(t), this.applySceneEditState(), this.onChange?.());
  }
  setTool(t) {
    this.tool = t, this.sm.setDrawMode(t !== "orbit"), t !== "wall" && this.cancelChain(), t !== "select" && this.clearSelection(), this.onChange?.();
  }
  floor() {
    return this.plan.floors[this.floorIndex];
  }
  get selectedEntity() {
    return this.selectedKind !== "furniture" || !this.selectedId ? null : this.floor().bindings?.find((e) => e.anchor_object === this.selectedId)?.entity_id ?? null;
  }
  /** Model key of the currently selected furniture (for domain-filtered binding). */
  get selectedObjectModel() {
    return this.selectedKind !== "furniture" || !this.selectedId ? null : this.floor().furniture?.find((e) => e.id === this.selectedId)?.model ?? null;
  }
  /** Current color of the selected furniture / wall / room (for the color picker). */
  get selectedColor() {
    const t = this.floor();
    return this.selectedKind === "furniture" ? t.furniture?.find((e) => e.id === this.selectedId)?.color ?? null : this.selectedKind === "wall" ? t.walls?.[this.selectedWall]?.color ?? null : this.selectedKind === "room" ? t.rooms?.[this.selectedRoom]?.color ?? null : null;
  }
  // -- Furniture / selection --------------------------------------------------
  placeFurniture(t) {
    const e = this.floor();
    e.furniture || (e.furniture = []);
    const n = e.wallHeight ?? this.plan.wallHeight ?? 2.6, s = `f${e.furniture.length}_${Math.floor(performance.now() % 1e5)}`;
    e.furniture.push({
      model: this.selectedModel,
      position: [jn(t.x), Ly(this.selectedModel, n), jn(t.z)],
      rotation: 0,
      id: s
    }), this.rebuild(), this.selectFurniture(s);
  }
  moveSelected(t) {
    const e = this.floor().furniture?.find((n) => n.id === this.selectedId);
    e && (e.position = [jn(t.x), e.position[1], jn(t.z)], this.rebuild(), this.reselect(), this.onChange?.());
  }
  selectFurniture(t) {
    this.selectedKind = t ? "furniture" : null, this.selectedId = t, this.selectedWall = -1, this.selectedRoom = -1, this.sm.setSelection(t ? this.sm.getFurnitureObject(t) ?? null : null), this.onChange?.();
  }
  selectWall(t) {
    this.selectedKind = "wall", this.selectedWall = t, this.selectedId = null, this.selectedRoom = -1, this.sm.setSelection(this.sm.getWallObject(t) ?? null), this.onChange?.();
  }
  selectRoom(t) {
    this.selectedKind = "room", this.selectedRoom = t, this.selectedId = null, this.selectedWall = -1, this.sm.setSelection(this.sm.getRoomObject(t) ?? null), this.onChange?.();
  }
  clearSelection() {
    this.selectedKind = null, this.selectedId = null, this.selectedWall = -1, this.selectedRoom = -1, this.sm.setSelection(null), this.onChange?.();
  }
  /** Re-apply the selection highlight after a rebuild (object instances change). */
  reselect() {
    this.selectedKind === "furniture" && this.selectedId ? this.sm.setSelection(this.sm.getFurnitureObject(this.selectedId) ?? null) : this.selectedKind === "wall" && this.selectedWall >= 0 ? this.sm.setSelection(this.sm.getWallObject(this.selectedWall) ?? null) : this.selectedKind === "room" && this.selectedRoom >= 0 && this.sm.setSelection(this.sm.getRoomObject(this.selectedRoom) ?? null);
  }
  rotateSelected() {
    if (this.selectedKind !== "furniture") return;
    const t = this.floor().furniture?.find((e) => e.id === this.selectedId);
    t && (t.rotation = ((t.rotation ?? 0) + 45) % 360, this.rebuild(), this.reselect(), this.onChange?.());
  }
  /** Move the selected furniture up/down along the vertical axis. */
  nudgeHeight(t) {
    if (this.selectedKind !== "furniture") return;
    const e = this.floor().furniture?.find((n) => n.id === this.selectedId);
    e && (e.position[1] = Math.max(0, Math.round((e.position[1] + t) * 100) / 100), this.rebuild(), this.reselect(), this.onChange?.());
  }
  /** Set the color of the selected furniture / wall / room. */
  setColor(t) {
    const e = this.floor();
    if (this.selectedKind === "furniture") {
      const n = e.furniture?.find((s) => s.id === this.selectedId);
      n && (n.color = t);
    } else if (this.selectedKind === "wall" && e.walls?.[this.selectedWall])
      e.walls[this.selectedWall].color = t;
    else if (this.selectedKind === "room" && e.rooms?.[this.selectedRoom])
      e.rooms[this.selectedRoom].color = t;
    else
      return;
    this.rebuild(), this.reselect(), this.onChange?.();
  }
  deleteSelected() {
    const t = this.floor();
    if (this.selectedKind === "furniture" && this.selectedId)
      t.furniture = (t.furniture ?? []).filter((e) => e.id !== this.selectedId), t.bindings = (t.bindings ?? []).filter((e) => e.anchor_object !== this.selectedId);
    else if (this.selectedKind === "wall" && this.selectedWall >= 0)
      t.walls?.splice(this.selectedWall, 1);
    else if (this.selectedKind === "room" && this.selectedRoom >= 0)
      t.rooms?.splice(this.selectedRoom, 1);
    else
      return;
    this.clearSelection(), this.rebuild();
  }
  bindEntity(t) {
    if (this.selectedKind !== "furniture" || !this.selectedId) return;
    const e = this.floor();
    e.bindings || (e.bindings = []), e.bindings = e.bindings.filter((n) => n.anchor_object !== this.selectedId), t && e.bindings.push({ entity_id: t, anchor_object: this.selectedId, behavior: "auto" }), this.rebuild(), this.reselect(), this.onChange?.();
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
      if (o) {
        this.selectFurniture(o.id);
        return;
      }
      const a = e ? this.sm.pickWall(e) : null;
      if (a) {
        this.selectWall(a.index);
        return;
      }
      if (this.selectedKind === "furniture" && this.selectedId) {
        this.moveSelected(t);
        return;
      }
      const l = e ? this.sm.pickRoom(e) : null;
      l ? this.selectRoom(l.index) : this.clearSelection();
      return;
    }
    if (this.tool !== "wall") return;
    const { pt: n } = this.snapPoint(t.x, t.z);
    if (this.chain.length === 0) {
      this.chain = [n], this.renderPreview(), this.onChange?.();
      return;
    }
    const s = this.chain[0], r = this.chain[this.chain.length - 1];
    if (this.chain.length >= 3 && Math.hypot(n[0] - s[0], n[1] - s[1]) < Jh) {
      this.commitWall(r, s), this.addRoom(this.chain), this.chain = [], this.cursor = null, this.rebuild(), this.onChange?.();
      return;
    }
    r[0] === n[0] && r[1] === n[1] || (this.commitWall(r, n), this.chain.push(n), this.rebuild(), this.renderPreview(), this.onChange?.());
  }
  onMove(t) {
    if (this.tool !== "wall" || this.chain.length === 0) return;
    const e = this.snapPoint(t.x, t.z);
    this.cursor = e.pt, this.snapInfo = e, this.renderPreview();
  }
  commitWall(t, e) {
    const n = this.floor();
    n.walls || (n.walls = []), n.walls.push({ start: [t[0], t[1]], end: [e[0], e[1]] });
  }
  addRoom(t) {
    const e = this.floor();
    e.rooms || (e.rooms = []), e.rooms.push({ polygon: t.map((n) => [n[0], n[1]]) });
  }
  /**
   * Snap a candidate point with drawing aids, in priority:
   *  1) join — onto a nearby existing endpoint / chain vertex,
   *  2) angle — snap the segment direction to 15° steps (parallel / perpendicular),
   *  3) length — match a nearby existing wall's length (equal-length walls),
   * plus first-point axis alignment. Disabled when snapEnabled is false (free grid).
   */
  snapPoint(t, e) {
    const n = this.chain[this.chain.length - 1], s = (y, v) => Math.atan2(v[1] - y[1], v[0] - y[0]) * 180 / Math.PI, r = (y, v = {}) => ({
      pt: y,
      joined: !1,
      matchedLen: !1,
      parallel: !1,
      lengthM: n ? Math.hypot(y[0] - n[0], y[1] - n[1]) : 0,
      angleDeg: n ? s(n, y) : 0,
      ...v
    });
    let o = null, a = oM;
    for (const y of [...this.existingEndpoints(), ...this.chain]) {
      const v = Math.hypot(t - y[0], e - y[1]);
      v < a && (a = v, o = y);
    }
    if (o) return r([o[0], o[1]], { joined: !0 });
    if (!this.snapEnabled) return r([jn(t), jn(e)]);
    if (!n) {
      let y = jn(t), v = jn(e);
      for (const M of this.existingEndpoints())
        Math.abs(t - M[0]) < tu && (y = M[0]), Math.abs(e - M[1]) < tu && (v = M[1]);
      return r([y, v]);
    }
    const l = t - n[0], c = e - n[1], h = Math.hypot(l, c);
    if (h < 1e-4) return r([n[0], n[1]]);
    const u = Math.round(Math.atan2(c, l) / Qh) * Qh;
    let d = Math.round(h / oo) * oo, f = !1, g = aM;
    for (const y of this.floor().walls ?? []) {
      const v = Math.hypot(y.end[0] - y.start[0], y.end[1] - y.start[1]);
      Math.abs(v - h) < g && (g = Math.abs(v - h), d = v, f = !0);
    }
    const _ = [n[0] + Math.cos(u) * d, n[1] + Math.sin(u) * d], p = Math.atan2(_[1] - n[1], _[0] - n[0]), m = (this.floor().walls ?? []).some((y) => {
      const v = Math.atan2(y.end[1] - y.start[1], y.end[0] - y.start[0]);
      let M = Math.abs(v - p) % Math.PI;
      return M > Math.PI / 2 && (M = Math.PI - M), M < 0.03;
    });
    return r(_, { matchedLen: f, parallel: m });
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
      let y = ((t.x - u) * _ + (t.z - d) * p) / m;
      y = Math.max(0, Math.min(1, y));
      const v = u + _ * y, M = d + p * y, P = Math.hypot(t.x - v, t.z - M);
      if (P < r) {
        r = P, s = h;
        const w = Math.sqrt(m);
        o = y * w, a = w;
      }
    }
    if (!s) {
      this.onMessage?.(
        (this.floor().walls?.length ?? 0) === 0 ? "Draw a wall first, then tap it to add a door/window" : "Tap closer to a wall"
      );
      return;
    }
    s.openings || (s.openings = []);
    const l = e === "door" ? 0.9 : 1, c = Math.max(0, Math.min(a - l, o - l / 2));
    s.openings.push({ kind: e, position: c, width: l }), this.rebuild(), this.onChange?.();
  }
  /** Undo: remove the last committed wall of the current run (and its point). */
  undoPoint() {
    this.chain.length >= 2 ? (this.floor().walls?.pop(), this.chain.pop(), this.rebuild(), this.renderPreview()) : this.chain.length === 1 && (this.chain = [], this.cursor = null, this.snapInfo = null, this.measureLabel && (this.measureLabel.sprite.visible = !1), this.sm.clearPreview()), this.onChange?.();
  }
  /** End the current wall run (walls are already committed). */
  finishChain() {
    this.cancelChain();
  }
  cancelChain() {
    this.chain = [], this.cursor = null, this.snapInfo = null, this.measureLabel && (this.measureLabel.sprite.visible = !1), this.sm.clearPreview(), this.onChange?.();
  }
  /** Start a fresh blank plan to draw from scratch. */
  loadPlan(t) {
    this.plan = t, this.floorIndex = 0, this.cancelChain(), this.clearSelection(), this.sm.loadPlan(t, !1), this.applySceneEditState(), this.onChange?.();
  }
  rebuild() {
    this.sm.loadPlan(this.plan, !0), this.applySceneEditState();
  }
  renderPreview() {
    this.sm.clearPreview();
    const t = this.sm.previewGroup, e = this.elevation(), n = this.wallHeight(), s = this.cursor ? [...this.chain, this.cursor] : [...this.chain];
    for (const r of s) {
      const o = this.isConnection(r), a = new xe(
        new go(o ? 0.12 : 0.07, 12, 12),
        new vn({ color: o ? 5230698 : 4500223 })
      );
      a.position.set(r[0], e + 0.06, r[1]), t.add(a);
    }
    for (let r = 0; r < s.length - 1; r++) {
      const o = s[r], a = s[r + 1], l = Math.hypot(a[0] - o[0], a[1] - o[1]);
      if (l < 1e-3) continue;
      const h = r === s.length - 2 && !!this.cursor && this.snapInfo && (this.snapInfo.matchedLen || this.snapInfo.parallel), u = new xe(
        new ii(l, n, 0.1),
        new vn({
          color: h ? 5230698 : 4500223,
          transparent: !0,
          opacity: h ? 0.5 : 0.35
        })
      ), d = Math.atan2(a[1] - o[1], a[0] - o[0]);
      u.position.set((o[0] + a[0]) / 2, e + n / 2, (o[1] + a[1]) / 2), u.rotation.y = -d, t.add(u);
    }
    if (this.measureLabel)
      if (this.cursor && this.chain.length >= 1 && this.snapInfo) {
        const r = this.chain[this.chain.length - 1], o = this.cursor, a = this.snapInfo, l = `${a.parallel ? " ∥" : ""}${a.matchedLen ? " =" : ""}`;
        this.measureLabel.setText(
          `${a.lengthM.toFixed(2)}m  ${Math.round((a.angleDeg % 360 + 360) % 360)}°${l}`,
          a.matchedLen || a.parallel ? "#7CFC8A" : "#ffffff"
        ), this.measureLabel.setPosition((r[0] + o[0]) / 2, e + n + 0.4, (r[1] + o[1]) / 2), this.measureLabel.sprite.visible = !0;
      } else
        this.measureLabel.sprite.visible = !1;
    if (this.chain.length >= 2 && this.cursor) {
      const r = this.chain[0];
      if (Math.hypot(this.cursor[0] - r[0], this.cursor[1] - r[1]) < Jh) {
        const o = new xe(
          new Bl(0.22, 0.04, 8, 24),
          new vn({ color: 5230698 })
        );
        o.rotation.x = Math.PI / 2, o.position.set(r[0], e + 0.06, r[1]), t.add(o);
      }
    }
  }
}
const _d = "ha3d_floorplans", vd = "ha3d-floorplans-set", cM = "ha3d-floorplan-default";
function xd(i) {
  return !!i && Array.isArray(i.floors) && i.floors.length > 0;
}
async function hM(i) {
  try {
    const e = (await i.callWS?.({ type: "frontend/get_user_data", key: _d }))?.value;
    if (e && e.projects) return e;
  } catch {
  }
  return null;
}
async function ua(i) {
  if (i) {
    const t = await hM(i);
    if (t) return t;
  }
  return uM() ?? { projects: {} };
}
async function eu(i, t) {
  if (dM(i), !t) return { ha: !1 };
  try {
    return await t.callWS?.({ type: "frontend/set_user_data", key: _d, value: i }), { ha: !0 };
  } catch (e) {
    return console.error("[3d-floorplan] HA save failed, kept localStorage copy:", e), { ha: !1 };
  }
}
function uM() {
  try {
    const t = localStorage.getItem(vd);
    if (t) {
      const e = JSON.parse(t);
      if (e && e.projects) return e;
    }
  } catch {
  }
  const i = fM();
  return i ? { active: "default", projects: { default: i } } : null;
}
function dM(i) {
  try {
    localStorage.setItem(vd, JSON.stringify(i));
  } catch {
  }
}
function fM() {
  try {
    const i = localStorage.getItem(cM);
    if (!i) return null;
    const t = JSON.parse(i);
    return xd(t) ? t : null;
  } catch {
    return null;
  }
}
function da(i) {
  return Object.entries(i.projects).filter(([, t]) => xd(t)).map(([t, e]) => ({ id: t, name: e.name || t })).sort((t, e) => t.name.localeCompare(e.name));
}
function nu() {
  try {
    if (typeof crypto < "u" && crypto.randomUUID)
      return "p" + crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  } catch {
  }
  return `p${Date.now().toString(36)}${Math.floor(Math.random() * 1e9).toString(36)}`;
}
function iu(i = "New Plan") {
  return {
    name: i,
    wallHeight: 2.6,
    floors: [{ name: "Ground Floor", elevation: 0, wallHeight: 2.6, walls: [], rooms: [], furniture: [], bindings: [] }]
  };
}
const su = 76, ru = /* @__PURE__ */ new Map();
let Ls;
function pM() {
  return Ls || (Ls = new $u({
    antialias: !0,
    alpha: !0,
    preserveDrawingBuffer: !0
    // required for toDataURL
  }), Ls.setSize(su, su), Ls.setPixelRatio(1)), Ls;
}
function ou(i) {
  const t = ru.get(i);
  if (t) return t;
  const e = pM(), n = new ju();
  n.add(new dd(16777215, 0.95));
  const s = new zl(16777215, 0.8);
  s.position.set(3, 5, 4), n.add(s);
  const r = ll(i, "#aab4c0");
  n.add(r);
  const o = new je().setFromObject(r), a = o.getCenter(new R()), l = o.getSize(new R()), c = Math.max(l.x, l.y, l.z, 0.4), h = new Be(38, 1, 0.01, 100), u = c * 2.3;
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
  }), ru.set(i, d), d;
}
var mM = Object.defineProperty, gM = Object.getOwnPropertyDescriptor, ce = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? gM(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && mM(t, e, s), s;
};
let oe = class extends $i {
  constructor() {
    super(...arguments), this.floorNames = [], this.activeFloorIndex = 0, this.editing = !1, this.editTool = "wall", this.editPoints = 0, this.editSelectedModel = "sofa", this.editSelectedEntity = null, this.editSelectedObjModel = null, this.editShowAllEntities = !1, this.editSnap = !0, this.editFloorIndex = 0, this.editSelectedKind = null, this.editSelectedColor = null, this.projectList = [], this.currentProjectId = null, this.editingProjectId = null, this.editPlanName = "", this.paletteOpen = !1, this.storedProjects = { projects: {} }, this.planLoaded = !1;
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
    return await Promise.resolve().then(() => xM), document.createElement("ha-3d-floorplan-card-editor");
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
    !this.sceneManager && this.viewport && this.initScene(), this.pendingHass && this.sceneManager && this.planLoaded && !this.editing && (this.applyHass(this.pendingHass), this.pendingHass = void 0);
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
    this.sceneManager = new qy(this.viewport, i), this.sceneManager.setPickHandler((t) => this.handlePick(t)), this.sceneManager.start(), this.loadActiveProject();
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
    if (i.plan) return i.plan;
    if (i.url) return this.fetchPlan(i.url);
    this.storedProjects = await ua(this.hass), this.projectList = da(this.storedProjects);
    const t = this.storedProjects.active && this.storedProjects.projects[this.storedProjects.active] ? this.storedProjects.active : this.projectList[0]?.id;
    return t ? (this.currentProjectId = t, this.storedProjects.projects[t]) : (this.currentProjectId = null, rM);
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
    const e = jy(i.entity_id, i.behavior);
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
    this.editor = new lM(this.sceneManager, i), this.editor.onChange = () => {
      const t = this.editor;
      this.editTool = t.tool, this.editPoints = t.pointCount, this.editSelectedModel = t.selectedModel, this.editSelectedEntity = t.selectedEntity, this.editSelectedObjModel = t.selectedObjectModel, this.editSelectedKind = t.selectedKind, this.editSelectedColor = t.selectedColor, this.editFloorIndex = t.floorIndex, this.editPlanName = t.plan.name ?? "", this.requestUpdate();
    }, this.editor.onMessage = (t) => this.showToast(t), this.sceneManager.loadPlan(i, !0), this.editor.floorIndex = Math.min(this.activeFloorIndex, i.floors.length - 1), this.editFloorIndex = this.editor.floorIndex, this.editor.setSnap(this.editSnap), this.editShowAllEntities = !1, this.editingProjectId = this.currentProjectId, this.editPlanName = i.name ?? "Plan", this.editor.start(), this.editing = !0, this.editTool = this.editor.tool, this.showToast('Edit mode — pick "Draw wall", tap the floor to place points');
  }
  exitEdit() {
    this.editor?.stop(), this.editor = void 0, this.editing = !1, this.currentPlan && this.sceneManager && (this.sceneManager.loadPlan(this.currentPlan), this.hass && (this.lastHass = void 0, this.applyHass(this.hass)));
  }
  onEditTool(i) {
    this.editor?.setTool(i);
  }
  onSelectEditFloor(i) {
    const t = parseInt(i.target.value, 10);
    Number.isNaN(t) || !this.editor || t < 0 || t >= this.editor.plan.floors.length || (this.editor.setFloor(t), this.activeFloorIndex = t);
  }
  onFinishChain() {
    this.editor?.finishChain();
  }
  onUndoPoint() {
    this.editor?.undoPoint();
  }
  onToggleSnap() {
    this.editor && (this.editSnap = !this.editSnap, this.editor.setSnap(this.editSnap));
  }
  onNewPlan() {
    if (!this.editor || !window.confirm(
      `Create a NEW project?

Your other saved projects stay. Unsaved changes in the current one will be lost. Draw, then Save to keep the new project.`
    )) return;
    const t = `Plan ${this.projectList.length + 1}`;
    this.editingProjectId = null, this.editor.loadPlan(iu(t)), this.editPlanName = t, this.showToast("New project — draw it, then Save to keep it");
  }
  onRenamePlan(i) {
    const t = i.target.value;
    this.editPlanName = t, this.editor && (this.editor.plan.name = t);
  }
  onSelectStorageProject(i) {
    const t = i.target.value;
    if (!t || t === this.currentProjectId) return;
    const e = this.storedProjects.projects[t];
    if (!e) return;
    if (this.editing && !window.confirm("Switch project? Unsaved changes in the current one will be lost.")) {
      this.requestUpdate();
      return;
    }
    this.currentProjectId = t, this.editingProjectId = t, this.activeFloorIndex = 0;
    const n = JSON.parse(JSON.stringify(e)), s = JSON.parse(JSON.stringify(e));
    this.currentPlan = s, this.floorNames = e.floors.map((r, o) => r.name || `Floor ${o + 1}`), this.editing && this.editor ? (this.editor.loadPlan(n), this.editPlanName = n.name ?? "") : this.sceneManager && (this.sceneManager.loadPlan(s), this.hass && (this.lastHass = void 0, this.applyHass(this.hass))), this.showToast(`Loaded "${e.name || t}"`);
  }
  async onDeleteProject() {
    const i = this.editingProjectId ?? this.currentProjectId;
    if (this.storedProjects = await ua(this.hass), !i || !this.storedProjects.projects[i]) {
      this.showToast("This project is not saved yet");
      return;
    }
    if (!window.confirm(`Delete project "${this.storedProjects.projects[i].name || i}"? This cannot be undone.`))
      return;
    delete this.storedProjects.projects[i];
    const t = da(this.storedProjects);
    this.storedProjects.active = t[0]?.id, await eu(this.storedProjects, this.hass), this.projectList = t, this.currentProjectId = this.storedProjects.active ?? null, this.editingProjectId = this.currentProjectId, this.activeFloorIndex = 0;
    const e = this.currentProjectId ? this.storedProjects.projects[this.currentProjectId] : iu();
    this.currentPlan = JSON.parse(JSON.stringify(e)), this.floorNames = e.floors.map((n, s) => n.name || `Floor ${s + 1}`), this.editor && (this.editor.loadPlan(JSON.parse(JSON.stringify(e))), this.editPlanName = e.name ?? ""), this.showToast("Project deleted");
  }
  onSetColor(i) {
    const t = i.target.value;
    this.editor?.setColor(t);
  }
  onNudgeHeight(i) {
    this.editor?.nudgeHeight(i);
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
  /** Entity ids for the selected piece, filtered by its natural domain(s).
   *  If the domain filter matches nothing, fall back to ALL entities so the
   *  dropdown is never empty. */
  candidateEntities(i) {
    if (!this.hass) return { ids: [], fellBack: !1 };
    const t = Object.keys(this.hass.states);
    let e = i.length ? t.filter((s) => i.includes(s.split(".")[0])) : t;
    const n = i.length > 0 && e.length === 0;
    return n && (e = t), e = [...e].sort((s, r) => this.entityLabel(s).localeCompare(this.entityLabel(r))), { ids: e, fellBack: n };
  }
  entityLabel(i) {
    return this.hass?.states[i]?.attributes?.friendly_name || i;
  }
  async onSavePlan() {
    if (!this.editor) return;
    const i = this.editor.plan;
    i.name || (i.name = this.editPlanName || "Plan"), this.storedProjects = await ua(this.hass);
    let t = this.editingProjectId;
    if (!t)
      for (t = nu(); this.storedProjects.projects[t]; ) t = nu();
    this.editingProjectId = t, this.currentProjectId = t, this.storedProjects.projects[t] = JSON.parse(JSON.stringify(i)), this.storedProjects.active = t;
    const e = await eu(this.storedProjects, this.hass);
    this.currentPlan = JSON.parse(JSON.stringify(i)), this.projectList = da(this.storedProjects), this.floorNames = i.floors.map((n, s) => n.name || `Floor ${s + 1}`), this.showToast(
      e.ha ? `Saved "${i.name}" to Home Assistant (all devices)` : `Saved "${i.name}" locally (HA unavailable)`
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
    return ie`
      <button
        class="palette-cell ${i === this.editSelectedModel ? "active" : ""}"
        title=${t}
        @click=${() => this.pickModel(i)}
      >
        <img src=${ou(i)} alt="" />
        <span>${t}</span>
      </button>
    `;
  }
  renderEditor() {
    const i = this.editTool, t = (o) => o.replace(/_/g, " ").replace(/\b\w/g, (a) => a.toUpperCase()), e = Cy.filter((o) => !al.includes(o)), n = this.editSelectedKind, s = i === "select" && !!n, r = n === "furniture";
    return ie`
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

        ${(() => {
      const o = this.editor?.plan.floors ?? [];
      return o.length > 1 ? ie`<div class="toolrow">
                <span class="hint">Floor:</span>
                <select class="select" @change=${this.onSelectEditFloor}>
                  ${o.map(
        (a, l) => ie`<option value=${l} ?selected=${l === this.editFloorIndex}>
                      ${a.name || `Floor ${l + 1}`}
                    </option>`
      )}
                </select>
              </div>` : Bt;
    })()}

        ${i === "wall" ? ie`<div class="toolrow">
              <button class="btn" ?disabled=${this.editPoints < 1}
                title="End this run (start a new wall elsewhere)" @click=${this.onFinishChain}>⤓ End run</button>
              <button class="btn" ?disabled=${this.editPoints < 1}
                title="Undo last wall" @click=${this.onUndoPoint}>⤺ Undo</button>
              <button class="btn ${this.editSnap ? "active" : ""}"
                title="Snap assist: parallel/perpendicular angles, equal lengths, alignment"
                @click=${this.onToggleSnap}>🧲 Snap</button>
            </div>` : Bt}

        ${i === "furniture" ? ie`<div class="toolrow">
              <button class="btn palette-btn" title="Choose a model" @click=${this.togglePalette}>
                <img class="palette-thumb" src=${ou(this.editSelectedModel)} alt="" />
                ${t(this.editSelectedModel)} ▾
              </button>
              <span class="hint">tap floor to place</span>
            </div>
            ${this.paletteOpen ? ie`<div class="palette">
                  <div class="palette-group">Lighting</div>
                  <div class="palette-grid">
                    ${al.map((o) => this.renderPaletteCell(o, t(o)))}
                  </div>
                  <div class="palette-group">Furniture</div>
                  <div class="palette-grid">
                    ${e.map((o) => this.renderPaletteCell(o, t(o)))}
                  </div>
                </div>` : Bt}` : Bt}

        ${s ? ie`<div class="toolrow">
              <span class="hint">${n} selected</span>
              ${r ? ie`<button class="btn" title="Rotate 45°" @click=${this.onRotateSelected}>⟳ Rotate</button>
                    <button class="btn" title="Lower" @click=${() => this.onNudgeHeight(-0.1)}>▼ Down</button>
                    <button class="btn" title="Raise" @click=${() => this.onNudgeHeight(0.1)}>▲ Up</button>` : Bt}
              ${n !== "room" ? ie`<button class="btn" title="Delete" @click=${this.onDeleteSelected}>🗑 Delete</button>` : Bt}
            </div>
            <div class="toolrow">
              <span class="hint">Color:</span>
              <input
                class="color"
                type="color"
                .value=${this.editSelectedColor ?? (n === "room" ? "#cfc7ba" : n === "wall" ? "#e6e6e6" : "#ffffff")}
                @input=${this.onSetColor}
              />
            </div>
            ${r && this.hass ? (() => {
      const o = this.editShowAllEntities || !this.editSelectedObjModel ? [] : Py(this.editSelectedObjModel), { ids: a, fellBack: l } = this.candidateEntities(o);
      return ie`<div class="toolrow">
                      <select class="select wide" @change=${this.onPickEntity}>
                        <option value="" ?selected=${!this.editSelectedEntity}>
                          — bind entity —
                        </option>
                        ${a.map(
        (c) => ie`<option value=${c} ?selected=${c === this.editSelectedEntity}>
                            ${this.entityLabel(c)}
                          </option>`
      )}
                      </select>
                      <button
                        class="btn ${this.editShowAllEntities ? "active" : ""}"
                        title="Show all entities (ignore type filter)"
                        @click=${() => this.editShowAllEntities = !this.editShowAllEntities}
                      >
                        All
                      </button>
                    </div>
                    <span class="hint">
                      ${this.editSelectedEntity ? `bound: ${this.editSelectedEntity}` : l ? `${a.length} entities (no ${o.join(" / ")} found)` : o.length ? `${a.length} ${o.join(" / ")} entities (tap All for every entity)` : `${a.length} entities`}
                    </span>`;
    })() : Bt}` : Bt}

        ${i === "select" && !n ? ie`<span class="hint">tap a piece, wall, or floor to select · tap floor to move selected furniture</span>` : Bt}
        ${i === "door" || i === "window" ? ie`<span class="hint">tap a wall to add a ${i}</span>` : Bt}
        ${i === "wall" ? ie`<span class="hint">2 taps = 1 wall · 🧲 snaps parallel/right-angle + equal length (green = aided) · right-drag / two-finger to orbit</span>` : Bt}

        <div class="panel-section">
          <div class="toolrow">
            <span class="hint">Project</span>
            <input
              class="name-input"
              type="text"
              placeholder="Project name"
              .value=${this.editPlanName}
              @input=${this.onRenamePlan}
            />
          </div>
          ${this.projectList.length > 0 ? ie`<div class="toolrow">
                <select class="select wide" @change=${this.onSelectStorageProject}>
                  ${this.editingProjectId ? Bt : ie`<option value="" selected>(unsaved new)</option>`}
                  ${this.projectList.map(
      (o) => ie`<option value=${o.id} ?selected=${o.id === this.editingProjectId}>${o.name}</option>`
    )}
                </select>
                <button class="btn" title="Delete this project" @click=${this.onDeleteProject}>🗑</button>
              </div>` : Bt}
          <div class="toolrow">
            <button class="btn" title="Create a new project (keeps the others)" @click=${this.onNewPlan}>✚ New</button>
            <button class="btn primary" title="Save this project" @click=${this.onSavePlan}>💾 Save</button>
          </div>
        </div>
      </div>
    `;
  }
  // -- Render -----------------------------------------------------------------
  render() {
    if (!this.config) return Bt;
    const i = this.config.height ?? "500px", t = this.config.projects ?? [];
    return ie`
      <ha-card>
        <div class="viewport" style="height:${i}"></div>

        ${this.loadError ? ie`<div class="error">⚠ ${this.loadError}</div>` : Bt}

        <div class="overlay top-right">
          <button class="btn" title="Reset view" @click=${this.onResetView}>
            ⌂ Reset
          </button>
          ${this.editing ? ie`<button class="btn primary" title="Exit editor" @click=${this.exitEdit}>
                ✓ Done
              </button>` : ie`<button class="btn" title="Edit floor plan" @click=${this.enterEdit}>
                ✎ Edit
              </button>`}
        </div>

        ${this.editing ? this.renderEditor() : Bt}

        ${this.toast ? ie`<div class="toast">${this.toast}</div>` : Bt}

        ${t.length > 1 ? ie`
              <div class="overlay top-left">
                <select class="select" @change=${this.onSelectProject}>
                  ${t.map(
      (e) => ie`<option value=${e.id} ?selected=${e.id === this.activeProjectId}>
                      ${e.name || e.id}
                    </option>`
    )}
                </select>
              </div>
            ` : Bt}

        ${this.floorNames.length > 1 && !this.editing ? ie`
              <div class="overlay bottom">
                ${this.floorNames.map(
      (e, n) => ie`
                    <button
                      class="tab ${n === this.activeFloorIndex ? "active" : ""}"
                      @click=${() => this.onSelectFloor(n)}
                    >
                      ${e}
                    </button>
                  `
    )}
              </div>
            ` : Bt}
      </ha-card>
    `;
  }
};
oe.styles = lu`
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
      align-items: stretch;
      gap: 6px;
      top: 10px;
      left: 10px;
      bottom: 10px;
      width: 270px;
      max-width: 80%;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 10px;
      border-radius: 12px;
      background: rgba(22, 24, 28, 0.86);
      border: 1px solid rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(6px);
      -webkit-overflow-scrolling: touch;
    }
    .panel-section {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }
    .color {
      width: 42px;
      height: 30px;
      padding: 0;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 6px;
      background: transparent;
      cursor: pointer;
    }
    .name-input {
      flex: 1;
      min-width: 0;
      font: inherit;
      font-size: 13px;
      color: #fff;
      background: rgba(30, 33, 40, 0.82);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      padding: 7px 10px;
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
ce([
  Qs({ attribute: !1 })
], oe.prototype, "hass", 2);
ce([
  Qs({ attribute: !1 })
], oe.prototype, "panel", 2);
ce([
  Qs({ attribute: !1 })
], oe.prototype, "narrow", 2);
ce([
  ge()
], oe.prototype, "config", 2);
ce([
  ge()
], oe.prototype, "activeProjectId", 2);
ce([
  ge()
], oe.prototype, "loadError", 2);
ce([
  ge()
], oe.prototype, "floorNames", 2);
ce([
  ge()
], oe.prototype, "activeFloorIndex", 2);
ce([
  ge()
], oe.prototype, "editing", 2);
ce([
  ge()
], oe.prototype, "editTool", 2);
ce([
  ge()
], oe.prototype, "editPoints", 2);
ce([
  ge()
], oe.prototype, "editSelectedModel", 2);
ce([
  ge()
], oe.prototype, "editSelectedEntity", 2);
ce([
  ge()
], oe.prototype, "editSelectedObjModel", 2);
ce([
  ge()
], oe.prototype, "editShowAllEntities", 2);
ce([
  ge()
], oe.prototype, "editSnap", 2);
ce([
  ge()
], oe.prototype, "editFloorIndex", 2);
ce([
  ge()
], oe.prototype, "editSelectedKind", 2);
ce([
  ge()
], oe.prototype, "editSelectedColor", 2);
ce([
  ge()
], oe.prototype, "projectList", 2);
ce([
  ge()
], oe.prototype, "currentProjectId", 2);
ce([
  ge()
], oe.prototype, "editingProjectId", 2);
ce([
  ge()
], oe.prototype, "editPlanName", 2);
ce([
  ge()
], oe.prototype, "paletteOpen", 2);
ce([
  ge()
], oe.prototype, "toast", 2);
ce([
  Yd(".viewport")
], oe.prototype, "viewport", 2);
oe = ce([
  fu("ha-3d-floorplan-card")
], oe);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-3d-floorplan-card",
  name: "3D Floor Plan Card",
  description: "Interactive true-3D floor plan with live entity bindings.",
  preview: !1,
  documentationURL: "https://github.com/your-org/ha-3d-floorplan-card"
});
console.info(
  `%c 3D-FLOORPLAN-CARD %c v${Ky} `,
  "color:#fff;background:#03a9f4;border-radius:4px 0 0 4px;padding:2px 6px",
  "color:#03a9f4;background:#222;border-radius:0 4px 4px 0;padding:2px 6px"
);
sM();
var _M = Object.defineProperty, vM = Object.getOwnPropertyDescriptor, ir = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? vM(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && _M(t, e, s), s;
};
let ni = class extends $i {
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
    return this._config ? ie`
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
        ${this._jsonError ? ie`<div class="err">⚠ ${this._jsonError}</div>` : Bt}

        <p class="hint">
          A full visual wall-drawing editor with a furniture palette and
          entity-binding dropdowns is planned (Phase 2). For now, author the
          plan JSON here or point to a file under <code>/config/www/</code>.
        </p>
      </div>
    ` : Bt;
  }
};
ni.styles = lu`
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
ir([
  Qs({ attribute: !1 })
], ni.prototype, "hass", 2);
ir([
  ge()
], ni.prototype, "_config", 2);
ir([
  ge()
], ni.prototype, "_planText", 2);
ir([
  ge()
], ni.prototype, "_jsonError", 2);
ni = ir([
  fu("ha-3d-floorplan-card-editor")
], ni);
const xM = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get Ha3dFloorplanCardEditor() {
    return ni;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  oe as Ha3dFloorplanCard
};
