/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Or = globalThis, ja = Or.ShadowRoot && (Or.ShadyCSS === void 0 || Or.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ka = Symbol(), Uc = /* @__PURE__ */ new WeakMap();
let Nh = class {
  constructor(e, t, n) {
    if (this._$cssResult$ = !0, n !== Ka) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (ja && e === void 0) {
      const n = t !== void 0 && t.length === 1;
      n && (e = Uc.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Uc.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Yu = (i) => new Nh(typeof i == "string" ? i : i + "", void 0, Ka), Uh = (i, ...e) => {
  const t = i.length === 1 ? i[0] : e.reduce((n, s, r) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[r + 1], i[0]);
  return new Nh(t, i, Ka);
}, ju = (i, e) => {
  if (ja) i.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), s = Or.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = t.cssText, i.appendChild(n);
  }
}, Oc = ja ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return Yu(t);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ku, defineProperty: Zu, getOwnPropertyDescriptor: Ju, getOwnPropertyNames: Qu, getOwnPropertySymbols: ed, getPrototypeOf: td } = Object, eo = globalThis, Fc = eo.trustedTypes, nd = Fc ? Fc.emptyScript : "", id = eo.reactiveElementPolyfillSupport, Ps = (i, e) => i, Xr = { toAttribute(i, e) {
  switch (e) {
    case Boolean:
      i = i ? nd : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, e) {
  let t = i;
  switch (e) {
    case Boolean:
      t = i !== null;
      break;
    case Number:
      t = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(i);
      } catch {
        t = null;
      }
  }
  return t;
} }, Za = (i, e) => !Ku(i, e), Bc = { attribute: !0, type: String, converter: Xr, reflect: !1, useDefault: !1, hasChanged: Za };
Symbol.metadata ??= Symbol("metadata"), eo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let zi = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Bc) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(e, n, t);
      s !== void 0 && Zu(this.prototype, e, s);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: s, set: r } = Ju(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: s, set(o) {
      const a = s?.call(this);
      r?.call(this, o), this.requestUpdate(e, a, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Bc;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ps("elementProperties"))) return;
    const e = td(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ps("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ps("properties"))) {
      const t = this.properties, n = [...Qu(t), ...ed(t)];
      for (const s of n) this.createProperty(s, t[s]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [n, s] of t) this.elementProperties.set(n, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, n] of this.elementProperties) {
      const s = this._$Eu(t, n);
      s !== void 0 && this._$Eh.set(s, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const s of n) t.unshift(Oc(s));
    } else e !== void 0 && t.push(Oc(e));
    return t;
  }
  static _$Eu(e, t) {
    const n = t.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ju(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n);
  }
  _$ET(e, t) {
    const n = this.constructor.elementProperties.get(e), s = this.constructor._$Eu(e, n);
    if (s !== void 0 && n.reflect === !0) {
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : Xr).toAttribute(t, n.type);
      this._$Em = e, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const n = this.constructor, s = n._$Eh.get(e);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Xr;
      this._$Em = s;
      const a = o.fromAttribute(t, r.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, n, s = !1, r) {
    if (e !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[e]), n ??= o.getPropertyOptions(e), !((n.hasChanged ?? Za)(r, t) || n.useDefault && n.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, n)))) return;
      this.C(e, t, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: n, reflect: s, wrapped: r }, o) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), r !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), s === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
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
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
zi.elementStyles = [], zi.shadowRootOptions = { mode: "open" }, zi[Ps("elementProperties")] = /* @__PURE__ */ new Map(), zi[Ps("finalized")] = /* @__PURE__ */ new Map(), id?.({ ReactiveElement: zi }), (eo.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ja = globalThis, zc = (i) => i, $r = Ja.trustedTypes, kc = $r ? $r.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Oh = "$lit$", kn = `lit$${Math.random().toFixed(9).slice(2)}$`, Fh = "?" + kn, sd = `<${Fh}>`, di = document, Fs = () => di.createComment(""), Bs = (i) => i === null || typeof i != "object" && typeof i != "function", Qa = Array.isArray, rd = (i) => Qa(i) || typeof i?.[Symbol.iterator] == "function", uo = `[ 	
\f\r]`, ps = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Hc = /-->/g, Vc = />/g, Jn = RegExp(`>|${uo}(?:([^\\s"'>=/]+)(${uo}*=${uo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Gc = /'/g, Wc = /"/g, Bh = /^(?:script|style|textarea|title)$/i, od = (i) => (e, ...t) => ({ _$litType$: i, strings: e, values: t }), Bn = od(1), ji = Symbol.for("lit-noChange"), ct = Symbol.for("lit-nothing"), Xc = /* @__PURE__ */ new WeakMap(), hi = di.createTreeWalker(di, 129);
function zh(i, e) {
  if (!Qa(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return kc !== void 0 ? kc.createHTML(e) : e;
}
const ad = (i, e) => {
  const t = i.length - 1, n = [];
  let s, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = ps;
  for (let a = 0; a < t; a++) {
    const c = i[a];
    let l, h, u = -1, d = 0;
    for (; d < c.length && (o.lastIndex = d, h = o.exec(c), h !== null); ) d = o.lastIndex, o === ps ? h[1] === "!--" ? o = Hc : h[1] !== void 0 ? o = Vc : h[2] !== void 0 ? (Bh.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = Jn) : h[3] !== void 0 && (o = Jn) : o === Jn ? h[0] === ">" ? (o = s ?? ps, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? Jn : h[3] === '"' ? Wc : Gc) : o === Wc || o === Gc ? o = Jn : o === Hc || o === Vc ? o = ps : (o = Jn, s = void 0);
    const f = o === Jn && i[a + 1].startsWith("/>") ? " " : "";
    r += o === ps ? c + sd : u >= 0 ? (n.push(l), c.slice(0, u) + Oh + c.slice(u) + kn + f) : c + kn + (u === -2 ? a : f);
  }
  return [zh(i, r + (i[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class zs {
  constructor({ strings: e, _$litType$: t }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = e.length - 1, c = this.parts, [l, h] = ad(e, t);
    if (this.el = zs.createElement(l, n), hi.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = hi.nextNode()) !== null && c.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(Oh)) {
          const d = h[o++], f = s.getAttribute(u).split(kn), g = /([.?@])?(.*)/.exec(d);
          c.push({ type: 1, index: r, name: g[2], strings: f, ctor: g[1] === "." ? ld : g[1] === "?" ? hd : g[1] === "@" ? ud : to }), s.removeAttribute(u);
        } else u.startsWith(kn) && (c.push({ type: 6, index: r }), s.removeAttribute(u));
        if (Bh.test(s.tagName)) {
          const u = s.textContent.split(kn), d = u.length - 1;
          if (d > 0) {
            s.textContent = $r ? $r.emptyScript : "";
            for (let f = 0; f < d; f++) s.append(u[f], Fs()), hi.nextNode(), c.push({ type: 2, index: ++r });
            s.append(u[d], Fs());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Fh) c.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(kn, u + 1)) !== -1; ) c.push({ type: 7, index: r }), u += kn.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const n = di.createElement("template");
    return n.innerHTML = e, n;
  }
}
function Ki(i, e, t = i, n) {
  if (e === ji) return e;
  let s = n !== void 0 ? t._$Co?.[n] : t._$Cl;
  const r = Bs(e) ? void 0 : e._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(i), s._$AT(i, t, n)), n !== void 0 ? (t._$Co ??= [])[n] = s : t._$Cl = s), s !== void 0 && (e = Ki(i, s._$AS(i, e.values), s, n)), e;
}
class cd {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: n } = this._$AD, s = (e?.creationScope ?? di).importNode(t, !0);
    hi.currentNode = s;
    let r = hi.nextNode(), o = 0, a = 0, c = n[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new Ys(r, r.nextSibling, this, e) : c.type === 1 ? l = new c.ctor(r, c.name, c.strings, this, e) : c.type === 6 && (l = new dd(r, this, e)), this._$AV.push(l), c = n[++a];
      }
      o !== c?.index && (r = hi.nextNode(), o++);
    }
    return hi.currentNode = di, s;
  }
  p(e) {
    let t = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, t), t += n.strings.length - 2) : n._$AI(e[t])), t++;
  }
}
class Ys {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, n, s) {
    this.type = 2, this._$AH = ct, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = Ki(this, e, t), Bs(e) ? e === ct || e == null || e === "" ? (this._$AH !== ct && this._$AR(), this._$AH = ct) : e !== this._$AH && e !== ji && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : rd(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== ct && Bs(this._$AH) ? this._$AA.nextSibling.data = e : this.T(di.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: n } = e, s = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = zs.createElement(zh(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(t);
    else {
      const r = new cd(s, this), o = r.u(this.options);
      r.p(t), this.T(o), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = Xc.get(e.strings);
    return t === void 0 && Xc.set(e.strings, t = new zs(e)), t;
  }
  k(e) {
    Qa(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, s = 0;
    for (const r of e) s === t.length ? t.push(n = new Ys(this.O(Fs()), this.O(Fs()), this, this.options)) : n = t[s], n._$AI(r), s++;
    s < t.length && (this._$AR(n && n._$AB.nextSibling, s), t.length = s);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const n = zc(e).nextSibling;
      zc(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class to {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, n, s, r) {
    this.type = 1, this._$AH = ct, this._$AN = void 0, this.element = e, this.name = t, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = ct;
  }
  _$AI(e, t = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) e = Ki(this, e, t, 0), o = !Bs(e) || e !== this._$AH && e !== ji, o && (this._$AH = e);
    else {
      const a = e;
      let c, l;
      for (e = r[0], c = 0; c < r.length - 1; c++) l = Ki(this, a[n + c], t, c), l === ji && (l = this._$AH[c]), o ||= !Bs(l) || l !== this._$AH[c], l === ct ? e = ct : e !== ct && (e += (l ?? "") + r[c + 1]), this._$AH[c] = l;
    }
    o && !s && this.j(e);
  }
  j(e) {
    e === ct ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ld extends to {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === ct ? void 0 : e;
  }
}
class hd extends to {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== ct);
  }
}
class ud extends to {
  constructor(e, t, n, s, r) {
    super(e, t, n, s, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = Ki(this, e, t, 0) ?? ct) === ji) return;
    const n = this._$AH, s = e === ct && n !== ct || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== ct && (n === ct || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class dd {
  constructor(e, t, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    Ki(this, e);
  }
}
const fd = Ja.litHtmlPolyfillSupport;
fd?.(zs, Ys), (Ja.litHtmlVersions ??= []).push("3.3.3");
const pd = (i, e, t) => {
  const n = t?.renderBefore ?? e;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = t?.renderBefore ?? null;
    n._$litPart$ = s = new Ys(e.insertBefore(Fs(), r), r, void 0, t ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ec = globalThis;
class Vi extends zi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = pd(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ji;
  }
}
Vi._$litElement$ = !0, Vi.finalized = !0, ec.litElementHydrateSupport?.({ LitElement: Vi });
const md = ec.litElementPolyfillSupport;
md?.({ LitElement: Vi });
(ec.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const kh = (i) => (e, t) => {
  t !== void 0 ? t.addInitializer(() => {
    customElements.define(i, e);
  }) : customElements.define(i, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gd = { attribute: !0, type: String, converter: Xr, reflect: !1, hasChanged: Za }, _d = (i = gd, e, t) => {
  const { kind: n, metadata: s } = t;
  let r = globalThis.litPropertyMetadata.get(s);
  if (r === void 0 && globalThis.litPropertyMetadata.set(s, r = /* @__PURE__ */ new Map()), n === "setter" && ((i = Object.create(i)).wrapped = !0), r.set(t.name, i), n === "accessor") {
    const { name: o } = t;
    return { set(a) {
      const c = e.get.call(this);
      e.set.call(this, a), this.requestUpdate(o, c, i, !0, a);
    }, init(a) {
      return a !== void 0 && this.C(o, void 0, i, a), a;
    } };
  }
  if (n === "setter") {
    const { name: o } = t;
    return function(a) {
      const c = this[o];
      e.call(this, a), this.requestUpdate(o, c, i, !0, a);
    };
  }
  throw Error("Unsupported decorator location: " + n);
};
function tc(i) {
  return (e, t) => typeof t == "object" ? _d(i, e, t) : ((n, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(i, e, t);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function jn(i) {
  return tc({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const vd = (i, e, t) => (t.configurable = !0, t.enumerable = !0, Reflect.decorate && typeof e != "object" && Object.defineProperty(i, e, t), t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function xd(i, e) {
  return (t, n, s) => {
    const r = (o) => o.renderRoot?.querySelector(i) ?? null;
    return vd(t, n, { get() {
      return r(this);
    } });
  };
}
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const nc = "169", Gi = { ROTATE: 0, DOLLY: 1, PAN: 2 }, Vn = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, yd = 0, $c = 1, Md = 2, Hh = 1, Vh = 2, En = 3, wn = 0, Ot = 1, tn = 2, Xn = 0, Wi = 1, qc = 2, Yc = 3, jc = 4, Sd = 5, ci = 100, Ed = 101, Td = 102, bd = 103, Ad = 104, wd = 200, Rd = 201, Cd = 202, Pd = 203, ta = 204, na = 205, Ld = 206, Id = 207, Dd = 208, Nd = 209, Ud = 210, Od = 211, Fd = 212, Bd = 213, zd = 214, ia = 0, sa = 1, ra = 2, Zi = 3, oa = 4, aa = 5, ca = 6, la = 7, Gh = 0, kd = 1, Hd = 2, $n = 0, Vd = 1, Gd = 2, Wd = 3, Xd = 4, $d = 5, qd = 6, Yd = 7, Kc = "attached", jd = "detached", Wh = 300, Ji = 301, Qi = 302, ha = 303, ua = 304, no = 306, es = 1e3, Gn = 1001, qr = 1002, Pt = 1003, Xh = 1004, Rs = 1005, Vt = 1006, Fr = 1007, bn = 1008, Rn = 1009, $h = 1010, qh = 1011, ks = 1012, ic = 1013, fi = 1014, sn = 1015, js = 1016, sc = 1017, rc = 1018, ts = 1020, Yh = 35902, jh = 1021, Kh = 1022, Yt = 1023, Zh = 1024, Jh = 1025, Xi = 1026, ns = 1027, oc = 1028, ac = 1029, Qh = 1030, cc = 1031, lc = 1033, Br = 33776, zr = 33777, kr = 33778, Hr = 33779, da = 35840, fa = 35841, pa = 35842, ma = 35843, ga = 36196, _a = 37492, va = 37496, xa = 37808, ya = 37809, Ma = 37810, Sa = 37811, Ea = 37812, Ta = 37813, ba = 37814, Aa = 37815, wa = 37816, Ra = 37817, Ca = 37818, Pa = 37819, La = 37820, Ia = 37821, Vr = 36492, Da = 36494, Na = 36495, eu = 36283, Ua = 36284, Oa = 36285, Fa = 36286, Hs = 2300, Vs = 2301, fo = 2302, Zc = 2400, Jc = 2401, Qc = 2402, Kd = 2500, Zd = 0, tu = 1, Ba = 2, Jd = 3200, Qd = 3201, nu = 0, ef = 1, Hn = "", Rt = "srgb", Et = "srgb-linear", hc = "display-p3", io = "display-p3-linear", Yr = "linear", rt = "srgb", jr = "rec709", Kr = "p3", xi = 7680, el = 519, tf = 512, nf = 513, sf = 514, iu = 515, rf = 516, of = 517, af = 518, cf = 519, za = 35044, tl = "300 es", An = 2e3, Zr = 2001;
class gi {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  hasEventListener(e, t) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    if (this._listeners === void 0) return;
    const s = this._listeners[e];
    if (s !== void 0) {
      const r = s.indexOf(t);
      r !== -1 && s.splice(r, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const n = this._listeners[e.type];
    if (n !== void 0) {
      e.target = this;
      const s = n.slice(0);
      for (let r = 0, o = s.length; r < o; r++)
        s[r].call(this, e);
      e.target = null;
    }
  }
}
const Tt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let nl = 1234567;
const Ls = Math.PI / 180, is = 180 / Math.PI;
function jt() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (Tt[i & 255] + Tt[i >> 8 & 255] + Tt[i >> 16 & 255] + Tt[i >> 24 & 255] + "-" + Tt[e & 255] + Tt[e >> 8 & 255] + "-" + Tt[e >> 16 & 15 | 64] + Tt[e >> 24 & 255] + "-" + Tt[t & 63 | 128] + Tt[t >> 8 & 255] + "-" + Tt[t >> 16 & 255] + Tt[t >> 24 & 255] + Tt[n & 255] + Tt[n >> 8 & 255] + Tt[n >> 16 & 255] + Tt[n >> 24 & 255]).toLowerCase();
}
function gt(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function uc(i, e) {
  return (i % e + e) % e;
}
function lf(i, e, t, n, s) {
  return n + (i - e) * (s - n) / (t - e);
}
function hf(i, e, t) {
  return i !== e ? (t - i) / (e - i) : 0;
}
function Is(i, e, t) {
  return (1 - t) * i + t * e;
}
function uf(i, e, t, n) {
  return Is(i, e, 1 - Math.exp(-t * n));
}
function df(i, e = 1) {
  return e - Math.abs(uc(i, e * 2) - e);
}
function ff(i, e, t) {
  return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e), i * i * (3 - 2 * i));
}
function pf(i, e, t) {
  return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e), i * i * i * (i * (i * 6 - 15) + 10));
}
function mf(i, e) {
  return i + Math.floor(Math.random() * (e - i + 1));
}
function gf(i, e) {
  return i + Math.random() * (e - i);
}
function _f(i) {
  return i * (0.5 - Math.random());
}
function vf(i) {
  i !== void 0 && (nl = i);
  let e = nl += 1831565813;
  return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
}
function xf(i) {
  return i * Ls;
}
function yf(i) {
  return i * is;
}
function Mf(i) {
  return (i & i - 1) === 0 && i !== 0;
}
function Sf(i) {
  return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2));
}
function Ef(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function Tf(i, e, t, n, s) {
  const r = Math.cos, o = Math.sin, a = r(t / 2), c = o(t / 2), l = r((e + n) / 2), h = o((e + n) / 2), u = r((e - n) / 2), d = o((e - n) / 2), f = r((n - e) / 2), g = o((n - e) / 2);
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
function nn(i, e) {
  switch (e.constructor) {
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
function Je(i, e) {
  switch (e.constructor) {
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
const $i = {
  DEG2RAD: Ls,
  RAD2DEG: is,
  generateUUID: jt,
  clamp: gt,
  euclideanModulo: uc,
  mapLinear: lf,
  inverseLerp: hf,
  lerp: Is,
  damp: uf,
  pingpong: df,
  smoothstep: ff,
  smootherstep: pf,
  randInt: mf,
  randFloat: gf,
  randFloatSpread: _f,
  seededRandom: vf,
  degToRad: xf,
  radToDeg: yf,
  isPowerOfTwo: Mf,
  ceilPowerOfTwo: Sf,
  floorPowerOfTwo: Ef,
  setQuaternionFromProperEuler: Tf,
  normalize: Je,
  denormalize: nn
};
class te {
  constructor(e = 0, t = 0) {
    te.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, s = e.elements;
    return this.x = s[0] * t + s[3] * n + s[6], this.y = s[1] * t + s[4] * n + s[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
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
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
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
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(gt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const n = Math.cos(t), s = Math.sin(t), r = this.x - e.x, o = this.y - e.y;
    return this.x = r * n - o * s + e.x, this.y = r * s + o * n + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class De {
  constructor(e, t, n, s, r, o, a, c, l) {
    De.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, s, r, o, a, c, l);
  }
  set(e, t, n, s, r, o, a, c, l) {
    const h = this.elements;
    return h[0] = e, h[1] = s, h[2] = a, h[3] = t, h[4] = r, h[5] = c, h[6] = n, h[7] = o, h[8] = l, this;
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
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, s = t.elements, r = this.elements, o = n[0], a = n[3], c = n[6], l = n[1], h = n[4], u = n[7], d = n[2], f = n[5], g = n[8], _ = s[0], p = s[3], m = s[6], T = s[1], y = s[4], S = s[7], D = s[2], R = s[5], A = s[8];
    return r[0] = o * _ + a * T + c * D, r[3] = o * p + a * y + c * R, r[6] = o * m + a * S + c * A, r[1] = l * _ + h * T + u * D, r[4] = l * p + h * y + u * R, r[7] = l * m + h * S + u * A, r[2] = d * _ + f * T + g * D, r[5] = d * p + f * y + g * R, r[8] = d * m + f * S + g * A, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[1], s = e[2], r = e[3], o = e[4], a = e[5], c = e[6], l = e[7], h = e[8];
    return t * o * h - t * a * l - n * r * h + n * a * c + s * r * l - s * o * c;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], s = e[2], r = e[3], o = e[4], a = e[5], c = e[6], l = e[7], h = e[8], u = h * o - a * l, d = a * c - h * r, f = l * r - o * c, g = t * u + n * d + s * f;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const _ = 1 / g;
    return e[0] = u * _, e[1] = (s * l - h * n) * _, e[2] = (a * n - s * o) * _, e[3] = d * _, e[4] = (h * t - s * c) * _, e[5] = (s * r - a * t) * _, e[6] = f * _, e[7] = (n * c - l * t) * _, e[8] = (o * t - n * r) * _, this;
  }
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, n, s, r, o, a) {
    const c = Math.cos(r), l = Math.sin(r);
    return this.set(
      n * c,
      n * l,
      -n * (c * o + l * a) + o + e,
      -s * l,
      s * c,
      -s * (-l * o + c * a) + a + t,
      0,
      0,
      1
    ), this;
  }
  //
  scale(e, t) {
    return this.premultiply(po.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(po.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(po.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let s = 0; s < 9; s++)
      if (t[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const po = /* @__PURE__ */ new De();
function su(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function Gs(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function bf() {
  const i = Gs("canvas");
  return i.style.display = "block", i;
}
const il = {};
function Gr(i) {
  i in il || (il[i] = !0, console.warn(i));
}
function Af(i, e, t) {
  return new Promise(function(n, s) {
    function r() {
      switch (i.clientWaitSync(e, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          s();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(r, t);
          break;
        default:
          n();
      }
    }
    setTimeout(r, t);
  });
}
function wf(i) {
  const e = i.elements;
  e[2] = 0.5 * e[2] + 0.5 * e[3], e[6] = 0.5 * e[6] + 0.5 * e[7], e[10] = 0.5 * e[10] + 0.5 * e[11], e[14] = 0.5 * e[14] + 0.5 * e[15];
}
function Rf(i) {
  const e = i.elements;
  e[11] === -1 ? (e[10] = -e[10] - 1, e[14] = -e[14]) : (e[10] = -e[10], e[14] = -e[14] + 1);
}
const sl = /* @__PURE__ */ new De().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), rl = /* @__PURE__ */ new De().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), ms = {
  [Et]: {
    transfer: Yr,
    primaries: jr,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (i) => i,
    fromReference: (i) => i
  },
  [Rt]: {
    transfer: rt,
    primaries: jr,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (i) => i.convertSRGBToLinear(),
    fromReference: (i) => i.convertLinearToSRGB()
  },
  [io]: {
    transfer: Yr,
    primaries: Kr,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (i) => i.applyMatrix3(rl),
    fromReference: (i) => i.applyMatrix3(sl)
  },
  [hc]: {
    transfer: rt,
    primaries: Kr,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (i) => i.convertSRGBToLinear().applyMatrix3(rl),
    fromReference: (i) => i.applyMatrix3(sl).convertLinearToSRGB()
  }
}, Cf = /* @__PURE__ */ new Set([Et, io]), We = {
  enabled: !0,
  _workingColorSpace: Et,
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(i) {
    if (!Cf.has(i))
      throw new Error(`Unsupported working color space, "${i}".`);
    this._workingColorSpace = i;
  },
  convert: function(i, e, t) {
    if (this.enabled === !1 || e === t || !e || !t)
      return i;
    const n = ms[e].toReference, s = ms[t].fromReference;
    return s(n(i));
  },
  fromWorkingColorSpace: function(i, e) {
    return this.convert(i, this._workingColorSpace, e);
  },
  toWorkingColorSpace: function(i, e) {
    return this.convert(i, e, this._workingColorSpace);
  },
  getPrimaries: function(i) {
    return ms[i].primaries;
  },
  getTransfer: function(i) {
    return i === Hn ? Yr : ms[i].transfer;
  },
  getLuminanceCoefficients: function(i, e = this._workingColorSpace) {
    return i.fromArray(ms[e].luminanceCoefficients);
  }
};
function qi(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function mo(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let yi;
class Pf {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let t;
    if (e instanceof HTMLCanvasElement)
      t = e;
    else {
      yi === void 0 && (yi = Gs("canvas")), yi.width = e.width, yi.height = e.height;
      const n = yi.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = yi;
    }
    return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", 0.6)) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = Gs("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const s = n.getImageData(0, 0, e.width, e.height), r = s.data;
      for (let o = 0; o < r.length; o++)
        r[o] = qi(r[o] / 255) * 255;
      return n.putImageData(s, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(qi(t[n] / 255) * 255) : t[n] = qi(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Lf = 0;
class ru {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Lf++ }), this.uuid = jt(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, s = this.data;
    if (s !== null) {
      let r;
      if (Array.isArray(s)) {
        r = [];
        for (let o = 0, a = s.length; o < a; o++)
          s[o].isDataTexture ? r.push(go(s[o].image)) : r.push(go(s[o]));
      } else
        r = go(s);
      n.url = r;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function go(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Pf.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let If = 0;
class _t extends gi {
  constructor(e = _t.DEFAULT_IMAGE, t = _t.DEFAULT_MAPPING, n = Gn, s = Gn, r = Vt, o = bn, a = Yt, c = Rn, l = _t.DEFAULT_ANISOTROPY, h = Hn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: If++ }), this.uuid = jt(), this.name = "", this.source = new ru(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = s, this.magFilter = r, this.minFilter = o, this.anisotropy = l, this.format = a, this.internalFormat = null, this.type = c, this.offset = new te(0, 0), this.repeat = new te(1, 1), this.center = new te(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new De(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
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
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== Wh) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case es:
          e.x = e.x - Math.floor(e.x);
          break;
        case Gn:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case qr:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case es:
          e.y = e.y - Math.floor(e.y);
          break;
        case Gn:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case qr:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
_t.DEFAULT_IMAGE = null;
_t.DEFAULT_MAPPING = Wh;
_t.DEFAULT_ANISOTROPY = 1;
class qe {
  constructor(e = 0, t = 0, n = 0, s = 1) {
    qe.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = s;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, n, s) {
    return this.x = e, this.y = t, this.z = n, this.w = s, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, s = this.z, r = this.w, o = e.elements;
    return this.x = o[0] * t + o[4] * n + o[8] * s + o[12] * r, this.y = o[1] * t + o[5] * n + o[9] * s + o[13] * r, this.z = o[2] * t + o[6] * n + o[10] * s + o[14] * r, this.w = o[3] * t + o[7] * n + o[11] * s + o[15] * r, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, n, s, r;
    const c = e.elements, l = c[0], h = c[4], u = c[8], d = c[1], f = c[5], g = c[9], _ = c[2], p = c[6], m = c[10];
    if (Math.abs(h - d) < 0.01 && Math.abs(u - _) < 0.01 && Math.abs(g - p) < 0.01) {
      if (Math.abs(h + d) < 0.1 && Math.abs(u + _) < 0.1 && Math.abs(g + p) < 0.1 && Math.abs(l + f + m - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const y = (l + 1) / 2, S = (f + 1) / 2, D = (m + 1) / 2, R = (h + d) / 4, A = (u + _) / 4, N = (g + p) / 4;
      return y > S && y > D ? y < 0.01 ? (n = 0, s = 0.707106781, r = 0.707106781) : (n = Math.sqrt(y), s = R / n, r = A / n) : S > D ? S < 0.01 ? (n = 0.707106781, s = 0, r = 0.707106781) : (s = Math.sqrt(S), n = R / s, r = N / s) : D < 0.01 ? (n = 0.707106781, s = 0.707106781, r = 0) : (r = Math.sqrt(D), n = A / r, s = N / r), this.set(n, s, r, t), this;
    }
    let T = Math.sqrt((p - g) * (p - g) + (u - _) * (u - _) + (d - h) * (d - h));
    return Math.abs(T) < 1e-3 && (T = 1), this.x = (p - g) / T, this.y = (u - _) / T, this.z = (d - h) / T, this.w = Math.acos((l + f + m - 1) / 2), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
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
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
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
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class Df extends gi {
  constructor(e = 1, t = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new qe(0, 0, e, t), this.scissorTest = !1, this.viewport = new qe(0, 0, e, t);
    const s = { width: e, height: t, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: Vt,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, n);
    const r = new _t(s, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
    r.flipY = !1, r.generateMipmaps = n.generateMipmaps, r.internalFormat = n.internalFormat, this.textures = [];
    const o = n.count;
    for (let a = 0; a < o; a++)
      this.textures[a] = r.clone(), this.textures[a].isRenderTargetTexture = !0;
    this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      this.width = e, this.height = t, this.depth = n;
      for (let s = 0, r = this.textures.length; s < r; s++)
        this.textures[s].image.width = e, this.textures[s].image.height = t, this.textures[s].image.depth = n;
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let n = 0, s = e.textures.length; n < s; n++)
      this.textures[n] = e.textures[n].clone(), this.textures[n].isRenderTargetTexture = !0;
    const t = Object.assign({}, e.texture.image);
    return this.texture.source = new ru(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class pi extends Df {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class ou extends _t {
  constructor(e = null, t = 1, n = 1, s = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: s }, this.magFilter = Pt, this.minFilter = Pt, this.wrapR = Gn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class Nf extends _t {
  constructor(e = null, t = 1, n = 1, s = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: s }, this.magFilter = Pt, this.minFilter = Pt, this.wrapR = Gn, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class cn {
  constructor(e = 0, t = 0, n = 0, s = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = s;
  }
  static slerpFlat(e, t, n, s, r, o, a) {
    let c = n[s + 0], l = n[s + 1], h = n[s + 2], u = n[s + 3];
    const d = r[o + 0], f = r[o + 1], g = r[o + 2], _ = r[o + 3];
    if (a === 0) {
      e[t + 0] = c, e[t + 1] = l, e[t + 2] = h, e[t + 3] = u;
      return;
    }
    if (a === 1) {
      e[t + 0] = d, e[t + 1] = f, e[t + 2] = g, e[t + 3] = _;
      return;
    }
    if (u !== _ || c !== d || l !== f || h !== g) {
      let p = 1 - a;
      const m = c * d + l * f + h * g + u * _, T = m >= 0 ? 1 : -1, y = 1 - m * m;
      if (y > Number.EPSILON) {
        const D = Math.sqrt(y), R = Math.atan2(D, m * T);
        p = Math.sin(p * R) / D, a = Math.sin(a * R) / D;
      }
      const S = a * T;
      if (c = c * p + d * S, l = l * p + f * S, h = h * p + g * S, u = u * p + _ * S, p === 1 - a) {
        const D = 1 / Math.sqrt(c * c + l * l + h * h + u * u);
        c *= D, l *= D, h *= D, u *= D;
      }
    }
    e[t] = c, e[t + 1] = l, e[t + 2] = h, e[t + 3] = u;
  }
  static multiplyQuaternionsFlat(e, t, n, s, r, o) {
    const a = n[s], c = n[s + 1], l = n[s + 2], h = n[s + 3], u = r[o], d = r[o + 1], f = r[o + 2], g = r[o + 3];
    return e[t] = a * g + h * u + c * f - l * d, e[t + 1] = c * g + h * d + l * u - a * f, e[t + 2] = l * g + h * f + a * d - c * u, e[t + 3] = h * g - a * u - c * d - l * f, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, s) {
    return this._x = e, this._y = t, this._z = n, this._w = s, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const n = e._x, s = e._y, r = e._z, o = e._order, a = Math.cos, c = Math.sin, l = a(n / 2), h = a(s / 2), u = a(r / 2), d = c(n / 2), f = c(s / 2), g = c(r / 2);
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
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2, s = Math.sin(n);
    return this._x = e.x * s, this._y = e.y * s, this._z = e.z * s, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], s = t[4], r = t[8], o = t[1], a = t[5], c = t[9], l = t[2], h = t[6], u = t[10], d = n + a + u;
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
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(gt(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const s = Math.min(1, t / n);
    return this.slerp(e, s), this;
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
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x, s = e._y, r = e._z, o = e._w, a = t._x, c = t._y, l = t._z, h = t._w;
    return this._x = n * h + o * a + s * l - r * c, this._y = s * h + o * c + r * a - n * l, this._z = r * h + o * l + n * c - s * a, this._w = o * h - n * a - s * c - r * l, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(e);
    const n = this._x, s = this._y, r = this._z, o = this._w;
    let a = o * e._w + n * e._x + s * e._y + r * e._z;
    if (a < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, a = -a) : this.copy(e), a >= 1)
      return this._w = o, this._x = n, this._y = s, this._z = r, this;
    const c = 1 - a * a;
    if (c <= Number.EPSILON) {
      const f = 1 - t;
      return this._w = f * o + t * this._w, this._x = f * n + t * this._x, this._y = f * s + t * this._y, this._z = f * r + t * this._z, this.normalize(), this;
    }
    const l = Math.sqrt(c), h = Math.atan2(l, a), u = Math.sin((1 - t) * h) / l, d = Math.sin(t * h) / l;
    return this._w = o * u + this._w * d, this._x = n * u + this._x * d, this._y = s * u + this._y * d, this._z = r * u + this._z * d, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), s = Math.sqrt(1 - n), r = Math.sqrt(n);
    return this.set(
      s * Math.sin(e),
      s * Math.cos(e),
      r * Math.sin(t),
      r * Math.cos(t)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class w {
  constructor(e = 0, t = 0, n = 0) {
    w.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n;
  }
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(ol.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(ol.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, s = this.z, r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6] * s, this.y = r[1] * t + r[4] * n + r[7] * s, this.z = r[2] * t + r[5] * n + r[8] * s, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, s = this.z, r = e.elements, o = 1 / (r[3] * t + r[7] * n + r[11] * s + r[15]);
    return this.x = (r[0] * t + r[4] * n + r[8] * s + r[12]) * o, this.y = (r[1] * t + r[5] * n + r[9] * s + r[13]) * o, this.z = (r[2] * t + r[6] * n + r[10] * s + r[14]) * o, this;
  }
  applyQuaternion(e) {
    const t = this.x, n = this.y, s = this.z, r = e.x, o = e.y, a = e.z, c = e.w, l = 2 * (o * s - a * n), h = 2 * (a * t - r * s), u = 2 * (r * n - o * t);
    return this.x = t + c * l + o * u - a * h, this.y = n + c * h + a * l - r * u, this.z = s + c * u + r * h - o * l, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x, n = this.y, s = this.z, r = e.elements;
    return this.x = r[0] * t + r[4] * n + r[8] * s, this.y = r[1] * t + r[5] * n + r[9] * s, this.z = r[2] * t + r[6] * n + r[10] * s, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
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
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
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
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const n = e.x, s = e.y, r = e.z, o = t.x, a = t.y, c = t.z;
    return this.x = s * c - r * a, this.y = r * o - n * c, this.z = n * a - s * o, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  projectOnPlane(e) {
    return _o.copy(this).projectOnVector(e), this.sub(_o);
  }
  reflect(e) {
    return this.sub(_o.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(gt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, s = this.z - e.z;
    return t * t + n * n + s * s;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, n) {
    const s = Math.sin(t) * e;
    return this.x = s * Math.sin(n), this.y = Math.cos(t) * e, this.z = s * Math.cos(n), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), s = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = s, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
    return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const _o = /* @__PURE__ */ new w(), ol = /* @__PURE__ */ new cn();
class on {
  constructor(e = new w(1 / 0, 1 / 0, 1 / 0), t = new w(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(Zt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(Zt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = Zt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const r = n.getAttribute("position");
      if (t === !0 && r !== void 0 && e.isInstancedMesh !== !0)
        for (let o = 0, a = r.count; o < a; o++)
          e.isMesh === !0 ? e.getVertexPosition(o, Zt) : Zt.fromBufferAttribute(r, o), Zt.applyMatrix4(e.matrixWorld), this.expandByPoint(Zt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), tr.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), tr.copy(n.boundingBox)), tr.applyMatrix4(e.matrixWorld), this.union(tr);
    }
    const s = e.children;
    for (let r = 0, o = s.length; r < o; r++)
      this.expandByObject(s[r], t);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, Zt), Zt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(gs), nr.subVectors(this.max, gs), Mi.subVectors(e.a, gs), Si.subVectors(e.b, gs), Ei.subVectors(e.c, gs), Pn.subVectors(Si, Mi), Ln.subVectors(Ei, Si), Qn.subVectors(Mi, Ei);
    let t = [
      0,
      -Pn.z,
      Pn.y,
      0,
      -Ln.z,
      Ln.y,
      0,
      -Qn.z,
      Qn.y,
      Pn.z,
      0,
      -Pn.x,
      Ln.z,
      0,
      -Ln.x,
      Qn.z,
      0,
      -Qn.x,
      -Pn.y,
      Pn.x,
      0,
      -Ln.y,
      Ln.x,
      0,
      -Qn.y,
      Qn.x,
      0
    ];
    return !vo(t, Mi, Si, Ei, nr) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !vo(t, Mi, Si, Ei, nr)) ? !1 : (ir.crossVectors(Pn, Ln), t = [ir.x, ir.y, ir.z], vo(t, Mi, Si, Ei, nr));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, Zt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Zt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (gn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), gn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), gn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), gn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), gn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), gn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), gn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), gn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(gn), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const gn = [
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w()
], Zt = /* @__PURE__ */ new w(), tr = /* @__PURE__ */ new on(), Mi = /* @__PURE__ */ new w(), Si = /* @__PURE__ */ new w(), Ei = /* @__PURE__ */ new w(), Pn = /* @__PURE__ */ new w(), Ln = /* @__PURE__ */ new w(), Qn = /* @__PURE__ */ new w(), gs = /* @__PURE__ */ new w(), nr = /* @__PURE__ */ new w(), ir = /* @__PURE__ */ new w(), ei = /* @__PURE__ */ new w();
function vo(i, e, t, n, s) {
  for (let r = 0, o = i.length - 3; r <= o; r += 3) {
    ei.fromArray(i, r);
    const a = s.x * Math.abs(ei.x) + s.y * Math.abs(ei.y) + s.z * Math.abs(ei.z), c = e.dot(ei), l = t.dot(ei), h = n.dot(ei);
    if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > a)
      return !1;
  }
  return !0;
}
const Uf = /* @__PURE__ */ new on(), _s = /* @__PURE__ */ new w(), xo = /* @__PURE__ */ new w();
class un {
  constructor(e = new w(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : Uf.setFromPoints(e).getCenter(n);
    let s = 0;
    for (let r = 0, o = e.length; r < o; r++)
      s = Math.max(s, n.distanceToSquared(e[r]));
    return this.radius = Math.sqrt(s), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    _s.subVectors(e, this.center);
    const t = _s.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), s = (n - this.radius) * 0.5;
      this.center.addScaledVector(_s, s / n), this.radius += s;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (xo.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(_s.copy(e.center).add(xo)), this.expandByPoint(_s.copy(e.center).sub(xo))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _n = /* @__PURE__ */ new w(), yo = /* @__PURE__ */ new w(), sr = /* @__PURE__ */ new w(), In = /* @__PURE__ */ new w(), Mo = /* @__PURE__ */ new w(), rr = /* @__PURE__ */ new w(), So = /* @__PURE__ */ new w();
class cs {
  constructor(e = new w(), t = new w(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, _n)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = _n.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (_n.copy(this.origin).addScaledVector(this.direction, t), _n.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, s) {
    yo.copy(e).add(t).multiplyScalar(0.5), sr.copy(t).sub(e).normalize(), In.copy(this.origin).sub(yo);
    const r = e.distanceTo(t) * 0.5, o = -this.direction.dot(sr), a = In.dot(this.direction), c = -In.dot(sr), l = In.lengthSq(), h = Math.abs(1 - o * o);
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
    return n && n.copy(this.origin).addScaledVector(this.direction, u), s && s.copy(yo).addScaledVector(sr, d), f;
  }
  intersectSphere(e, t) {
    _n.subVectors(e.center, this.origin);
    const n = _n.dot(this.direction), s = _n.dot(_n) - n * n, r = e.radius * e.radius;
    if (s > r) return null;
    const o = Math.sqrt(r - s), a = n - o, c = n + o;
    return c < 0 ? null : a < 0 ? this.at(c, t) : this.at(a, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, s, r, o, a, c;
    const l = 1 / this.direction.x, h = 1 / this.direction.y, u = 1 / this.direction.z, d = this.origin;
    return l >= 0 ? (n = (e.min.x - d.x) * l, s = (e.max.x - d.x) * l) : (n = (e.max.x - d.x) * l, s = (e.min.x - d.x) * l), h >= 0 ? (r = (e.min.y - d.y) * h, o = (e.max.y - d.y) * h) : (r = (e.max.y - d.y) * h, o = (e.min.y - d.y) * h), n > o || r > s || ((r > n || isNaN(n)) && (n = r), (o < s || isNaN(s)) && (s = o), u >= 0 ? (a = (e.min.z - d.z) * u, c = (e.max.z - d.z) * u) : (a = (e.max.z - d.z) * u, c = (e.min.z - d.z) * u), n > c || a > s) || ((a > n || n !== n) && (n = a), (c < s || s !== s) && (s = c), s < 0) ? null : this.at(n >= 0 ? n : s, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, _n) !== null;
  }
  intersectTriangle(e, t, n, s, r) {
    Mo.subVectors(t, e), rr.subVectors(n, e), So.crossVectors(Mo, rr);
    let o = this.direction.dot(So), a;
    if (o > 0) {
      if (s) return null;
      a = 1;
    } else if (o < 0)
      a = -1, o = -o;
    else
      return null;
    In.subVectors(this.origin, e);
    const c = a * this.direction.dot(rr.crossVectors(In, rr));
    if (c < 0)
      return null;
    const l = a * this.direction.dot(Mo.cross(In));
    if (l < 0 || c + l > o)
      return null;
    const h = -a * In.dot(So);
    return h < 0 ? null : this.at(h / o, r);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Ce {
  constructor(e, t, n, s, r, o, a, c, l, h, u, d, f, g, _, p) {
    Ce.prototype.isMatrix4 = !0, this.elements = [
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
    ], e !== void 0 && this.set(e, t, n, s, r, o, a, c, l, h, u, d, f, g, _, p);
  }
  set(e, t, n, s, r, o, a, c, l, h, u, d, f, g, _, p) {
    const m = this.elements;
    return m[0] = e, m[4] = t, m[8] = n, m[12] = s, m[1] = r, m[5] = o, m[9] = a, m[13] = c, m[2] = l, m[6] = h, m[10] = u, m[14] = d, m[3] = f, m[7] = g, m[11] = _, m[15] = p, this;
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
    return new Ce().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(e) {
    const t = this.elements, n = e.elements, s = 1 / Ti.setFromMatrixColumn(e, 0).length(), r = 1 / Ti.setFromMatrixColumn(e, 1).length(), o = 1 / Ti.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * s, t[1] = n[1] * s, t[2] = n[2] * s, t[3] = 0, t[4] = n[4] * r, t[5] = n[5] * r, t[6] = n[6] * r, t[7] = 0, t[8] = n[8] * o, t[9] = n[9] * o, t[10] = n[10] * o, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, s = e.y, r = e.z, o = Math.cos(n), a = Math.sin(n), c = Math.cos(s), l = Math.sin(s), h = Math.cos(r), u = Math.sin(r);
    if (e.order === "XYZ") {
      const d = o * h, f = o * u, g = a * h, _ = a * u;
      t[0] = c * h, t[4] = -c * u, t[8] = l, t[1] = f + g * l, t[5] = d - _ * l, t[9] = -a * c, t[2] = _ - d * l, t[6] = g + f * l, t[10] = o * c;
    } else if (e.order === "YXZ") {
      const d = c * h, f = c * u, g = l * h, _ = l * u;
      t[0] = d + _ * a, t[4] = g * a - f, t[8] = o * l, t[1] = o * u, t[5] = o * h, t[9] = -a, t[2] = f * a - g, t[6] = _ + d * a, t[10] = o * c;
    } else if (e.order === "ZXY") {
      const d = c * h, f = c * u, g = l * h, _ = l * u;
      t[0] = d - _ * a, t[4] = -o * u, t[8] = g + f * a, t[1] = f + g * a, t[5] = o * h, t[9] = _ - d * a, t[2] = -o * l, t[6] = a, t[10] = o * c;
    } else if (e.order === "ZYX") {
      const d = o * h, f = o * u, g = a * h, _ = a * u;
      t[0] = c * h, t[4] = g * l - f, t[8] = d * l + _, t[1] = c * u, t[5] = _ * l + d, t[9] = f * l - g, t[2] = -l, t[6] = a * c, t[10] = o * c;
    } else if (e.order === "YZX") {
      const d = o * c, f = o * l, g = a * c, _ = a * l;
      t[0] = c * h, t[4] = _ - d * u, t[8] = g * u + f, t[1] = u, t[5] = o * h, t[9] = -a * h, t[2] = -l * h, t[6] = f * u + g, t[10] = d - _ * u;
    } else if (e.order === "XZY") {
      const d = o * c, f = o * l, g = a * c, _ = a * l;
      t[0] = c * h, t[4] = -u, t[8] = l * h, t[1] = d * u + _, t[5] = o * h, t[9] = f * u - g, t[2] = g * u - f, t[6] = a * h, t[10] = _ * u + d;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(Of, e, Ff);
  }
  lookAt(e, t, n) {
    const s = this.elements;
    return kt.subVectors(e, t), kt.lengthSq() === 0 && (kt.z = 1), kt.normalize(), Dn.crossVectors(n, kt), Dn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? kt.x += 1e-4 : kt.z += 1e-4, kt.normalize(), Dn.crossVectors(n, kt)), Dn.normalize(), or.crossVectors(kt, Dn), s[0] = Dn.x, s[4] = or.x, s[8] = kt.x, s[1] = Dn.y, s[5] = or.y, s[9] = kt.y, s[2] = Dn.z, s[6] = or.z, s[10] = kt.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, s = t.elements, r = this.elements, o = n[0], a = n[4], c = n[8], l = n[12], h = n[1], u = n[5], d = n[9], f = n[13], g = n[2], _ = n[6], p = n[10], m = n[14], T = n[3], y = n[7], S = n[11], D = n[15], R = s[0], A = s[4], N = s[8], Y = s[12], v = s[1], E = s[5], z = s[9], B = s[13], H = s[2], j = s[6], k = s[10], Q = s[14], G = s[3], ce = s[7], le = s[11], _e = s[15];
    return r[0] = o * R + a * v + c * H + l * G, r[4] = o * A + a * E + c * j + l * ce, r[8] = o * N + a * z + c * k + l * le, r[12] = o * Y + a * B + c * Q + l * _e, r[1] = h * R + u * v + d * H + f * G, r[5] = h * A + u * E + d * j + f * ce, r[9] = h * N + u * z + d * k + f * le, r[13] = h * Y + u * B + d * Q + f * _e, r[2] = g * R + _ * v + p * H + m * G, r[6] = g * A + _ * E + p * j + m * ce, r[10] = g * N + _ * z + p * k + m * le, r[14] = g * Y + _ * B + p * Q + m * _e, r[3] = T * R + y * v + S * H + D * G, r[7] = T * A + y * E + S * j + D * ce, r[11] = T * N + y * z + S * k + D * le, r[15] = T * Y + y * B + S * Q + D * _e, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[4], s = e[8], r = e[12], o = e[1], a = e[5], c = e[9], l = e[13], h = e[2], u = e[6], d = e[10], f = e[14], g = e[3], _ = e[7], p = e[11], m = e[15];
    return g * (+r * c * u - s * l * u - r * a * d + n * l * d + s * a * f - n * c * f) + _ * (+t * c * f - t * l * d + r * o * d - s * o * f + s * l * h - r * c * h) + p * (+t * l * u - t * a * f - r * o * u + n * o * f + r * a * h - n * l * h) + m * (-s * a * h - t * c * u + t * a * d + s * o * u - n * o * d + n * c * h);
  }
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, n) {
    const s = this.elements;
    return e.isVector3 ? (s[12] = e.x, s[13] = e.y, s[14] = e.z) : (s[12] = e, s[13] = t, s[14] = n), this;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], s = e[2], r = e[3], o = e[4], a = e[5], c = e[6], l = e[7], h = e[8], u = e[9], d = e[10], f = e[11], g = e[12], _ = e[13], p = e[14], m = e[15], T = u * p * l - _ * d * l + _ * c * f - a * p * f - u * c * m + a * d * m, y = g * d * l - h * p * l - g * c * f + o * p * f + h * c * m - o * d * m, S = h * _ * l - g * u * l + g * a * f - o * _ * f - h * a * m + o * u * m, D = g * u * c - h * _ * c - g * a * d + o * _ * d + h * a * p - o * u * p, R = t * T + n * y + s * S + r * D;
    if (R === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const A = 1 / R;
    return e[0] = T * A, e[1] = (_ * d * r - u * p * r - _ * s * f + n * p * f + u * s * m - n * d * m) * A, e[2] = (a * p * r - _ * c * r + _ * s * l - n * p * l - a * s * m + n * c * m) * A, e[3] = (u * c * r - a * d * r - u * s * l + n * d * l + a * s * f - n * c * f) * A, e[4] = y * A, e[5] = (h * p * r - g * d * r + g * s * f - t * p * f - h * s * m + t * d * m) * A, e[6] = (g * c * r - o * p * r - g * s * l + t * p * l + o * s * m - t * c * m) * A, e[7] = (o * d * r - h * c * r + h * s * l - t * d * l - o * s * f + t * c * f) * A, e[8] = S * A, e[9] = (g * u * r - h * _ * r - g * n * f + t * _ * f + h * n * m - t * u * m) * A, e[10] = (o * _ * r - g * a * r + g * n * l - t * _ * l - o * n * m + t * a * m) * A, e[11] = (h * a * r - o * u * r - h * n * l + t * u * l + o * n * f - t * a * f) * A, e[12] = D * A, e[13] = (h * _ * s - g * u * s + g * n * d - t * _ * d - h * n * p + t * u * p) * A, e[14] = (g * a * s - o * _ * s - g * n * c + t * _ * c + o * n * p - t * a * p) * A, e[15] = (o * u * s - h * a * s + h * n * c - t * u * c - o * n * d + t * a * d) * A, this;
  }
  scale(e) {
    const t = this.elements, n = e.x, s = e.y, r = e.z;
    return t[0] *= n, t[4] *= s, t[8] *= r, t[1] *= n, t[5] *= s, t[9] *= r, t[2] *= n, t[6] *= s, t[10] *= r, t[3] *= n, t[7] *= s, t[11] *= r, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], s = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, s));
  }
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
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
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
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
  makeRotationAxis(e, t) {
    const n = Math.cos(t), s = Math.sin(t), r = 1 - n, o = e.x, a = e.y, c = e.z, l = r * o, h = r * a;
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
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
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
  makeShear(e, t, n, s, r, o) {
    return this.set(
      1,
      n,
      r,
      0,
      e,
      1,
      o,
      0,
      t,
      s,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(e, t, n) {
    const s = this.elements, r = t._x, o = t._y, a = t._z, c = t._w, l = r + r, h = o + o, u = a + a, d = r * l, f = r * h, g = r * u, _ = o * h, p = o * u, m = a * u, T = c * l, y = c * h, S = c * u, D = n.x, R = n.y, A = n.z;
    return s[0] = (1 - (_ + m)) * D, s[1] = (f + S) * D, s[2] = (g - y) * D, s[3] = 0, s[4] = (f - S) * R, s[5] = (1 - (d + m)) * R, s[6] = (p + T) * R, s[7] = 0, s[8] = (g + y) * A, s[9] = (p - T) * A, s[10] = (1 - (d + _)) * A, s[11] = 0, s[12] = e.x, s[13] = e.y, s[14] = e.z, s[15] = 1, this;
  }
  decompose(e, t, n) {
    const s = this.elements;
    let r = Ti.set(s[0], s[1], s[2]).length();
    const o = Ti.set(s[4], s[5], s[6]).length(), a = Ti.set(s[8], s[9], s[10]).length();
    this.determinant() < 0 && (r = -r), e.x = s[12], e.y = s[13], e.z = s[14], Jt.copy(this);
    const l = 1 / r, h = 1 / o, u = 1 / a;
    return Jt.elements[0] *= l, Jt.elements[1] *= l, Jt.elements[2] *= l, Jt.elements[4] *= h, Jt.elements[5] *= h, Jt.elements[6] *= h, Jt.elements[8] *= u, Jt.elements[9] *= u, Jt.elements[10] *= u, t.setFromRotationMatrix(Jt), n.x = r, n.y = o, n.z = a, this;
  }
  makePerspective(e, t, n, s, r, o, a = An) {
    const c = this.elements, l = 2 * r / (t - e), h = 2 * r / (n - s), u = (t + e) / (t - e), d = (n + s) / (n - s);
    let f, g;
    if (a === An)
      f = -(o + r) / (o - r), g = -2 * o * r / (o - r);
    else if (a === Zr)
      f = -o / (o - r), g = -o * r / (o - r);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return c[0] = l, c[4] = 0, c[8] = u, c[12] = 0, c[1] = 0, c[5] = h, c[9] = d, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = f, c[14] = g, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
  }
  makeOrthographic(e, t, n, s, r, o, a = An) {
    const c = this.elements, l = 1 / (t - e), h = 1 / (n - s), u = 1 / (o - r), d = (t + e) * l, f = (n + s) * h;
    let g, _;
    if (a === An)
      g = (o + r) * u, _ = -2 * u;
    else if (a === Zr)
      g = r * u, _ = -1 * u;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + a);
    return c[0] = 2 * l, c[4] = 0, c[8] = 0, c[12] = -d, c[1] = 0, c[5] = 2 * h, c[9] = 0, c[13] = -f, c[2] = 0, c[6] = 0, c[10] = _, c[14] = -g, c[3] = 0, c[7] = 0, c[11] = 0, c[15] = 1, this;
  }
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let s = 0; s < 16; s++)
      if (t[s] !== n[s]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
}
const Ti = /* @__PURE__ */ new w(), Jt = /* @__PURE__ */ new Ce(), Of = /* @__PURE__ */ new w(0, 0, 0), Ff = /* @__PURE__ */ new w(1, 1, 1), Dn = /* @__PURE__ */ new w(), or = /* @__PURE__ */ new w(), kt = /* @__PURE__ */ new w(), al = /* @__PURE__ */ new Ce(), cl = /* @__PURE__ */ new cn();
class ln {
  constructor(e = 0, t = 0, n = 0, s = ln.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = s;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, n, s = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = s, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const s = e.elements, r = s[0], o = s[4], a = s[8], c = s[1], l = s[5], h = s[9], u = s[2], d = s[6], f = s[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(gt(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-h, f), this._z = Math.atan2(-o, r)) : (this._x = Math.atan2(d, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-gt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(a, f), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-u, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(gt(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-o, l)) : (this._y = 0, this._z = Math.atan2(c, r));
        break;
      case "ZYX":
        this._y = Math.asin(-gt(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(c, r)) : (this._x = 0, this._z = Math.atan2(-o, l));
        break;
      case "YZX":
        this._z = Math.asin(gt(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-u, r)) : (this._x = 0, this._y = Math.atan2(a, f));
        break;
      case "XZY":
        this._z = Math.asin(-gt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(d, l), this._y = Math.atan2(a, r)) : (this._x = Math.atan2(-h, f), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return al.makeRotationFromQuaternion(e), this.setFromRotationMatrix(al, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return cl.setFromEuler(this), this.setFromQuaternion(cl, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
ln.DEFAULT_ORDER = "XYZ";
class dc {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Bf = 0;
const ll = /* @__PURE__ */ new w(), bi = /* @__PURE__ */ new cn(), vn = /* @__PURE__ */ new Ce(), ar = /* @__PURE__ */ new w(), vs = /* @__PURE__ */ new w(), zf = /* @__PURE__ */ new w(), kf = /* @__PURE__ */ new cn(), hl = /* @__PURE__ */ new w(1, 0, 0), ul = /* @__PURE__ */ new w(0, 1, 0), dl = /* @__PURE__ */ new w(0, 0, 1), fl = { type: "added" }, Hf = { type: "removed" }, Ai = { type: "childadded", child: null }, Eo = { type: "childremoved", child: null };
class at extends gi {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Bf++ }), this.uuid = jt(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = at.DEFAULT_UP.clone();
    const e = new w(), t = new ln(), n = new cn(), s = new w(1, 1, 1);
    function r() {
      n.setFromEuler(t, !1);
    }
    function o() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(r), n._onChange(o), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
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
        value: new Ce()
      },
      normalMatrix: {
        value: new De()
      }
    }), this.matrix = new Ce(), this.matrixWorld = new Ce(), this.matrixAutoUpdate = at.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new dc(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return bi.setFromAxisAngle(e, t), this.quaternion.multiply(bi), this;
  }
  rotateOnWorldAxis(e, t) {
    return bi.setFromAxisAngle(e, t), this.quaternion.premultiply(bi), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(hl, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(ul, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(dl, e);
  }
  translateOnAxis(e, t) {
    return ll.copy(e).applyQuaternion(this.quaternion), this.position.add(ll.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(hl, e);
  }
  translateY(e) {
    return this.translateOnAxis(ul, e);
  }
  translateZ(e) {
    return this.translateOnAxis(dl, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(vn.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? ar.copy(e) : ar.set(e, t, n);
    const s = this.parent;
    this.updateWorldMatrix(!0, !1), vs.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? vn.lookAt(vs, ar, this.up) : vn.lookAt(ar, vs, this.up), this.quaternion.setFromRotationMatrix(vn), s && (vn.extractRotation(s.matrixWorld), bi.setFromRotationMatrix(vn), this.quaternion.premultiply(bi.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(fl), Ai.child = e, this.dispatchEvent(Ai), Ai.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Hf), Eo.child = e, this.dispatchEvent(Eo), Eo.child = null), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), vn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), vn.multiply(e.parent.matrixWorld)), e.applyMatrix4(vn), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(fl), Ai.child = e, this.dispatchEvent(Ai), Ai.child = null, this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, s = this.children.length; n < s; n++) {
      const o = this.children[n].getObjectByProperty(e, t);
      if (o !== void 0)
        return o;
    }
  }
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const s = this.children;
    for (let r = 0, o = s.length; r < o; r++)
      s[r].getObjectsByProperty(e, t, n);
    return n;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(vs, e, zf), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(vs, kf, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, s = t.length; n < s; n++)
      t[n].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, s = t.length; n < s; n++)
      t[n].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, s = t.length; n < s; n++)
      t[n].updateMatrixWorld(e);
  }
  updateWorldMatrix(e, t) {
    const n = this.parent;
    if (e === !0 && n !== null && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), t === !0) {
      const s = this.children;
      for (let r = 0, o = s.length; r < o; r++)
        s[r].updateWorldMatrix(!1, !0);
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
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
    })), s.maxInstanceCount = this._maxInstanceCount, s.maxVertexCount = this._maxVertexCount, s.maxIndexCount = this._maxIndexCount, s.geometryInitialized = this._geometryInitialized, s.geometryCount = this._geometryCount, s.matricesTexture = this._matricesTexture.toJSON(e), this._colorsTexture !== null && (s.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (s.boundingSphere = {
      center: s.boundingSphere.center.toArray(),
      radius: s.boundingSphere.radius
    }), this.boundingBox !== null && (s.boundingBox = {
      min: s.boundingBox.min.toArray(),
      max: s.boundingBox.max.toArray()
    }));
    function r(a, c) {
      return a[c.uuid] === void 0 && (a[c.uuid] = c.toJSON(e)), c.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? s.background = this.background.toJSON() : this.background.isTexture && (s.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (s.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      s.geometry = r(e.geometries, this.geometry);
      const a = this.geometry.parameters;
      if (a !== void 0 && a.shapes !== void 0) {
        const c = a.shapes;
        if (Array.isArray(c))
          for (let l = 0, h = c.length; l < h; l++) {
            const u = c[l];
            r(e.shapes, u);
          }
        else
          r(e.shapes, c);
      }
    }
    if (this.isSkinnedMesh && (s.bindMode = this.bindMode, s.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(e.skeletons, this.skeleton), s.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const a = [];
        for (let c = 0, l = this.material.length; c < l; c++)
          a.push(r(e.materials, this.material[c]));
        s.material = a;
      } else
        s.material = r(e.materials, this.material);
    if (this.children.length > 0) {
      s.children = [];
      for (let a = 0; a < this.children.length; a++)
        s.children.push(this.children[a].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      s.animations = [];
      for (let a = 0; a < this.animations.length; a++) {
        const c = this.animations[a];
        s.animations.push(r(e.animations, c));
      }
    }
    if (t) {
      const a = o(e.geometries), c = o(e.materials), l = o(e.textures), h = o(e.images), u = o(e.shapes), d = o(e.skeletons), f = o(e.animations), g = o(e.nodes);
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
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const s = e.children[n];
        this.add(s.clone());
      }
    return this;
  }
}
at.DEFAULT_UP = /* @__PURE__ */ new w(0, 1, 0);
at.DEFAULT_MATRIX_AUTO_UPDATE = !0;
at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const Qt = /* @__PURE__ */ new w(), xn = /* @__PURE__ */ new w(), To = /* @__PURE__ */ new w(), yn = /* @__PURE__ */ new w(), wi = /* @__PURE__ */ new w(), Ri = /* @__PURE__ */ new w(), pl = /* @__PURE__ */ new w(), bo = /* @__PURE__ */ new w(), Ao = /* @__PURE__ */ new w(), wo = /* @__PURE__ */ new w(), Ro = /* @__PURE__ */ new qe(), Co = /* @__PURE__ */ new qe(), Po = /* @__PURE__ */ new qe();
class qt {
  constructor(e = new w(), t = new w(), n = new w()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, s) {
    s.subVectors(n, t), Qt.subVectors(e, t), s.cross(Qt);
    const r = s.lengthSq();
    return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, t, n, s, r) {
    Qt.subVectors(s, t), xn.subVectors(n, t), To.subVectors(e, t);
    const o = Qt.dot(Qt), a = Qt.dot(xn), c = Qt.dot(To), l = xn.dot(xn), h = xn.dot(To), u = o * l - a * a;
    if (u === 0)
      return r.set(0, 0, 0), null;
    const d = 1 / u, f = (l * c - a * h) * d, g = (o * h - a * c) * d;
    return r.set(1 - f - g, g, f);
  }
  static containsPoint(e, t, n, s) {
    return this.getBarycoord(e, t, n, s, yn) === null ? !1 : yn.x >= 0 && yn.y >= 0 && yn.x + yn.y <= 1;
  }
  static getInterpolation(e, t, n, s, r, o, a, c) {
    return this.getBarycoord(e, t, n, s, yn) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(r, yn.x), c.addScaledVector(o, yn.y), c.addScaledVector(a, yn.z), c);
  }
  static getInterpolatedAttribute(e, t, n, s, r, o) {
    return Ro.setScalar(0), Co.setScalar(0), Po.setScalar(0), Ro.fromBufferAttribute(e, t), Co.fromBufferAttribute(e, n), Po.fromBufferAttribute(e, s), o.setScalar(0), o.addScaledVector(Ro, r.x), o.addScaledVector(Co, r.y), o.addScaledVector(Po, r.z), o;
  }
  static isFrontFacing(e, t, n, s) {
    return Qt.subVectors(n, t), xn.subVectors(e, t), Qt.cross(xn).dot(s) < 0;
  }
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  setFromPointsAndIndices(e, t, n, s) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[s]), this;
  }
  setFromAttributeAndIndices(e, t, n, s) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, s), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return Qt.subVectors(this.c, this.b), xn.subVectors(this.a, this.b), Qt.cross(xn).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return qt.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return qt.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, n, s, r) {
    return qt.getInterpolation(e, this.a, this.b, this.c, t, n, s, r);
  }
  containsPoint(e) {
    return qt.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return qt.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a, s = this.b, r = this.c;
    let o, a;
    wi.subVectors(s, n), Ri.subVectors(r, n), bo.subVectors(e, n);
    const c = wi.dot(bo), l = Ri.dot(bo);
    if (c <= 0 && l <= 0)
      return t.copy(n);
    Ao.subVectors(e, s);
    const h = wi.dot(Ao), u = Ri.dot(Ao);
    if (h >= 0 && u <= h)
      return t.copy(s);
    const d = c * u - h * l;
    if (d <= 0 && c >= 0 && h <= 0)
      return o = c / (c - h), t.copy(n).addScaledVector(wi, o);
    wo.subVectors(e, r);
    const f = wi.dot(wo), g = Ri.dot(wo);
    if (g >= 0 && f <= g)
      return t.copy(r);
    const _ = f * l - c * g;
    if (_ <= 0 && l >= 0 && g <= 0)
      return a = l / (l - g), t.copy(n).addScaledVector(Ri, a);
    const p = h * g - f * u;
    if (p <= 0 && u - h >= 0 && f - g >= 0)
      return pl.subVectors(r, s), a = (u - h) / (u - h + (f - g)), t.copy(s).addScaledVector(pl, a);
    const m = 1 / (p + _ + d);
    return o = _ * m, a = d * m, t.copy(n).addScaledVector(wi, o).addScaledVector(Ri, a);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const au = {
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
}, Nn = { h: 0, s: 0, l: 0 }, cr = { h: 0, s: 0, l: 0 };
function Lo(i, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i;
}
class Me {
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const s = e;
      s && s.isColor ? this.copy(s) : typeof s == "number" ? this.setHex(s) : typeof s == "string" && this.setStyle(s);
    } else
      this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = Rt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, We.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, n, s = We.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, We.toWorkingColorSpace(this, s), this;
  }
  setHSL(e, t, n, s = We.workingColorSpace) {
    if (e = uc(e, 1), t = gt(t, 0, 1), n = gt(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const r = n <= 0.5 ? n * (1 + t) : n + t - n * t, o = 2 * n - r;
      this.r = Lo(o, r, e + 1 / 3), this.g = Lo(o, r, e), this.b = Lo(o, r, e - 1 / 3);
    }
    return We.toWorkingColorSpace(this, s), this;
  }
  setStyle(e, t = Rt) {
    function n(r) {
      r !== void 0 && parseFloat(r) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let s;
    if (s = /^(\w+)\(([^\)]*)\)/.exec(e)) {
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
              t
            );
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return n(r[4]), this.setRGB(
              Math.min(100, parseInt(r[1], 10)) / 100,
              Math.min(100, parseInt(r[2], 10)) / 100,
              Math.min(100, parseInt(r[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))
            return n(r[4]), this.setHSL(
              parseFloat(r[1]) / 360,
              parseFloat(r[2]) / 100,
              parseFloat(r[3]) / 100,
              t
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (s = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const r = s[1], o = r.length;
      if (o === 3)
        return this.setRGB(
          parseInt(r.charAt(0), 16) / 15,
          parseInt(r.charAt(1), 16) / 15,
          parseInt(r.charAt(2), 16) / 15,
          t
        );
      if (o === 6)
        return this.setHex(parseInt(r, 16), t);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = Rt) {
    const n = au[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = qi(e.r), this.g = qi(e.g), this.b = qi(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = mo(e.r), this.g = mo(e.g), this.b = mo(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = Rt) {
    return We.fromWorkingColorSpace(bt.copy(this), e), Math.round(gt(bt.r * 255, 0, 255)) * 65536 + Math.round(gt(bt.g * 255, 0, 255)) * 256 + Math.round(gt(bt.b * 255, 0, 255));
  }
  getHexString(e = Rt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = We.workingColorSpace) {
    We.fromWorkingColorSpace(bt.copy(this), t);
    const n = bt.r, s = bt.g, r = bt.b, o = Math.max(n, s, r), a = Math.min(n, s, r);
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
    return e.h = c, e.s = l, e.l = h, e;
  }
  getRGB(e, t = We.workingColorSpace) {
    return We.fromWorkingColorSpace(bt.copy(this), t), e.r = bt.r, e.g = bt.g, e.b = bt.b, e;
  }
  getStyle(e = Rt) {
    We.fromWorkingColorSpace(bt.copy(this), e);
    const t = bt.r, n = bt.g, s = bt.b;
    return e !== Rt ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(s * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(Nn), this.setHSL(Nn.h + e, Nn.s + t, Nn.l + n);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(Nn), e.getHSL(cr);
    const n = Is(Nn.h, cr.h, t), s = Is(Nn.s, cr.s, t), r = Is(Nn.l, cr.l, t);
    return this.setHSL(n, s, r), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, n = this.g, s = this.b, r = e.elements;
    return this.r = r[0] * t + r[3] * n + r[6] * s, this.g = r[1] * t + r[4] * n + r[7] * s, this.b = r[2] * t + r[5] * n + r[8] * s, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const bt = /* @__PURE__ */ new Me();
Me.NAMES = au;
let Vf = 0;
class rn extends gi {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Vf++ }), this.uuid = jt(), this.name = "", this.type = "Material", this.blending = Wi, this.side = wn, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = ta, this.blendDst = na, this.blendEquation = ci, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Me(0, 0, 0), this.blendAlpha = 0, this.depthFunc = Zi, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = el, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = xi, this.stencilZFail = xi, this.stencilZPass = xi, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  // onBeforeRender and onBeforeCompile only supported in WebGLRenderer
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const s = this[t];
        if (s === void 0) {
          console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        s && s.isColor ? s.set(n) : s && s.isVector3 && n && n.isVector3 ? s.copy(n) : this[t] = n;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
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
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== Wi && (n.blending = this.blending), this.side !== wn && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== ta && (n.blendSrc = this.blendSrc), this.blendDst !== na && (n.blendDst = this.blendDst), this.blendEquation !== ci && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== Zi && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== el && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== xi && (n.stencilFail = this.stencilFail), this.stencilZFail !== xi && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== xi && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function s(r) {
      const o = [];
      for (const a in r) {
        const c = r[a];
        delete c.metadata, o.push(c);
      }
      return o;
    }
    if (t) {
      const r = s(e.textures), o = s(e.images);
      r.length > 0 && (n.textures = r), o.length > 0 && (n.images = o);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const s = t.length;
      n = new Array(s);
      for (let r = 0; r !== s; ++r)
        n[r] = t[r].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  onBuild() {
    console.warn("Material: onBuild() has been removed.");
  }
}
class ui extends rn {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Me(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new ln(), this.combine = Gh, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const pt = /* @__PURE__ */ new w(), lr = /* @__PURE__ */ new te();
class Lt {
  constructor(e, t, n = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = za, this.updateRanges = [], this.gpuType = sn, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let s = 0, r = this.itemSize; s < r; s++)
      this.array[e + s] = t.array[n + s];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        lr.fromBufferAttribute(this, t), lr.applyMatrix3(e), this.setXY(t, lr.x, lr.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        pt.fromBufferAttribute(this, t), pt.applyMatrix3(e), this.setXYZ(t, pt.x, pt.y, pt.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      pt.fromBufferAttribute(this, t), pt.applyMatrix4(e), this.setXYZ(t, pt.x, pt.y, pt.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      pt.fromBufferAttribute(this, t), pt.applyNormalMatrix(e), this.setXYZ(t, pt.x, pt.y, pt.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      pt.fromBufferAttribute(this, t), pt.transformDirection(e), this.setXYZ(t, pt.x, pt.y, pt.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = nn(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = Je(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = nn(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = nn(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = nn(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = nn(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = Je(t, this.array), n = Je(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, s) {
    return e *= this.itemSize, this.normalized && (t = Je(t, this.array), n = Je(n, this.array), s = Je(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = s, this;
  }
  setXYZW(e, t, n, s, r) {
    return e *= this.itemSize, this.normalized && (t = Je(t, this.array), n = Je(n, this.array), s = Je(s, this.array), r = Je(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = s, this.array[e + 3] = r, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== za && (e.usage = this.usage), e;
  }
}
class cu extends Lt {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class lu extends Lt {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class It extends Lt {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
let Gf = 0;
const Xt = /* @__PURE__ */ new Ce(), Io = /* @__PURE__ */ new at(), Ci = /* @__PURE__ */ new w(), Ht = /* @__PURE__ */ new on(), xs = /* @__PURE__ */ new on(), yt = /* @__PURE__ */ new w();
class Gt extends gi {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Gf++ }), this.uuid = jt(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (su(e) ? lu : cu)(e, 1) : this.index = e, this;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const r = new De().getNormalMatrix(e);
      n.applyNormalMatrix(r), n.needsUpdate = !0;
    }
    const s = this.attributes.tangent;
    return s !== void 0 && (s.transformDirection(e), s.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return Xt.makeRotationFromQuaternion(e), this.applyMatrix4(Xt), this;
  }
  rotateX(e) {
    return Xt.makeRotationX(e), this.applyMatrix4(Xt), this;
  }
  rotateY(e) {
    return Xt.makeRotationY(e), this.applyMatrix4(Xt), this;
  }
  rotateZ(e) {
    return Xt.makeRotationZ(e), this.applyMatrix4(Xt), this;
  }
  translate(e, t, n) {
    return Xt.makeTranslation(e, t, n), this.applyMatrix4(Xt), this;
  }
  scale(e, t, n) {
    return Xt.makeScale(e, t, n), this.applyMatrix4(Xt), this;
  }
  lookAt(e) {
    return Io.lookAt(e), Io.updateMatrix(), this.applyMatrix4(Io.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Ci).negate(), this.translate(Ci.x, Ci.y, Ci.z), this;
  }
  setFromPoints(e) {
    const t = [];
    for (let n = 0, s = e.length; n < s; n++) {
      const r = e[n];
      t.push(r.x, r.y, r.z || 0);
    }
    return this.setAttribute("position", new It(t, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new on());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new w(-1 / 0, -1 / 0, -1 / 0),
        new w(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, s = t.length; n < s; n++) {
          const r = t[n];
          Ht.setFromBufferAttribute(r), this.morphTargetsRelative ? (yt.addVectors(this.boundingBox.min, Ht.min), this.boundingBox.expandByPoint(yt), yt.addVectors(this.boundingBox.max, Ht.max), this.boundingBox.expandByPoint(yt)) : (this.boundingBox.expandByPoint(Ht.min), this.boundingBox.expandByPoint(Ht.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new un());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new w(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Ht.setFromBufferAttribute(e), t)
        for (let r = 0, o = t.length; r < o; r++) {
          const a = t[r];
          xs.setFromBufferAttribute(a), this.morphTargetsRelative ? (yt.addVectors(Ht.min, xs.min), Ht.expandByPoint(yt), yt.addVectors(Ht.max, xs.max), Ht.expandByPoint(yt)) : (Ht.expandByPoint(xs.min), Ht.expandByPoint(xs.max));
        }
      Ht.getCenter(n);
      let s = 0;
      for (let r = 0, o = e.count; r < o; r++)
        yt.fromBufferAttribute(e, r), s = Math.max(s, n.distanceToSquared(yt));
      if (t)
        for (let r = 0, o = t.length; r < o; r++) {
          const a = t[r], c = this.morphTargetsRelative;
          for (let l = 0, h = a.count; l < h; l++)
            yt.fromBufferAttribute(a, l), c && (Ci.fromBufferAttribute(e, l), yt.add(Ci)), s = Math.max(s, n.distanceToSquared(yt));
        }
      this.boundingSphere.radius = Math.sqrt(s), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = t.position, s = t.normal, r = t.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Lt(new Float32Array(4 * n.count), 4));
    const o = this.getAttribute("tangent"), a = [], c = [];
    for (let N = 0; N < n.count; N++)
      a[N] = new w(), c[N] = new w();
    const l = new w(), h = new w(), u = new w(), d = new te(), f = new te(), g = new te(), _ = new w(), p = new w();
    function m(N, Y, v) {
      l.fromBufferAttribute(n, N), h.fromBufferAttribute(n, Y), u.fromBufferAttribute(n, v), d.fromBufferAttribute(r, N), f.fromBufferAttribute(r, Y), g.fromBufferAttribute(r, v), h.sub(l), u.sub(l), f.sub(d), g.sub(d);
      const E = 1 / (f.x * g.y - g.x * f.y);
      isFinite(E) && (_.copy(h).multiplyScalar(g.y).addScaledVector(u, -f.y).multiplyScalar(E), p.copy(u).multiplyScalar(f.x).addScaledVector(h, -g.x).multiplyScalar(E), a[N].add(_), a[Y].add(_), a[v].add(_), c[N].add(p), c[Y].add(p), c[v].add(p));
    }
    let T = this.groups;
    T.length === 0 && (T = [{
      start: 0,
      count: e.count
    }]);
    for (let N = 0, Y = T.length; N < Y; ++N) {
      const v = T[N], E = v.start, z = v.count;
      for (let B = E, H = E + z; B < H; B += 3)
        m(
          e.getX(B + 0),
          e.getX(B + 1),
          e.getX(B + 2)
        );
    }
    const y = new w(), S = new w(), D = new w(), R = new w();
    function A(N) {
      D.fromBufferAttribute(s, N), R.copy(D);
      const Y = a[N];
      y.copy(Y), y.sub(D.multiplyScalar(D.dot(Y))).normalize(), S.crossVectors(R, Y);
      const E = S.dot(c[N]) < 0 ? -1 : 1;
      o.setXYZW(N, y.x, y.y, y.z, E);
    }
    for (let N = 0, Y = T.length; N < Y; ++N) {
      const v = T[N], E = v.start, z = v.count;
      for (let B = E, H = E + z; B < H; B += 3)
        A(e.getX(B + 0)), A(e.getX(B + 1)), A(e.getX(B + 2));
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Lt(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let d = 0, f = n.count; d < f; d++)
          n.setXYZ(d, 0, 0, 0);
      const s = new w(), r = new w(), o = new w(), a = new w(), c = new w(), l = new w(), h = new w(), u = new w();
      if (e)
        for (let d = 0, f = e.count; d < f; d += 3) {
          const g = e.getX(d + 0), _ = e.getX(d + 1), p = e.getX(d + 2);
          s.fromBufferAttribute(t, g), r.fromBufferAttribute(t, _), o.fromBufferAttribute(t, p), h.subVectors(o, r), u.subVectors(s, r), h.cross(u), a.fromBufferAttribute(n, g), c.fromBufferAttribute(n, _), l.fromBufferAttribute(n, p), a.add(h), c.add(h), l.add(h), n.setXYZ(g, a.x, a.y, a.z), n.setXYZ(_, c.x, c.y, c.z), n.setXYZ(p, l.x, l.y, l.z);
        }
      else
        for (let d = 0, f = t.count; d < f; d += 3)
          s.fromBufferAttribute(t, d + 0), r.fromBufferAttribute(t, d + 1), o.fromBufferAttribute(t, d + 2), h.subVectors(o, r), u.subVectors(s, r), h.cross(u), n.setXYZ(d + 0, h.x, h.y, h.z), n.setXYZ(d + 1, h.x, h.y, h.z), n.setXYZ(d + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      yt.fromBufferAttribute(e, t), yt.normalize(), e.setXYZ(t, yt.x, yt.y, yt.z);
  }
  toNonIndexed() {
    function e(a, c) {
      const l = a.array, h = a.itemSize, u = a.normalized, d = new l.constructor(c.length * h);
      let f = 0, g = 0;
      for (let _ = 0, p = c.length; _ < p; _++) {
        a.isInterleavedBufferAttribute ? f = c[_] * a.data.stride + a.offset : f = c[_] * h;
        for (let m = 0; m < h; m++)
          d[g++] = l[f++];
      }
      return new Lt(d, h, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new Gt(), n = this.index.array, s = this.attributes;
    for (const a in s) {
      const c = s[a], l = e(c, n);
      t.setAttribute(a, l);
    }
    const r = this.morphAttributes;
    for (const a in r) {
      const c = [], l = r[a];
      for (let h = 0, u = l.length; h < u; h++) {
        const d = l[h], f = e(d, n);
        c.push(f);
      }
      t.morphAttributes[a] = c;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const o = this.groups;
    for (let a = 0, c = o.length; a < c; a++) {
      const l = o[a];
      t.addGroup(l.start, l.count, l.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const c = this.parameters;
      for (const l in c)
        c[l] !== void 0 && (e[l] = c[l]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const c in n) {
      const l = n[c];
      e.data.attributes[c] = l.toJSON(e.data);
    }
    const s = {};
    let r = !1;
    for (const c in this.morphAttributes) {
      const l = this.morphAttributes[c], h = [];
      for (let u = 0, d = l.length; u < d; u++) {
        const f = l[u];
        h.push(f.toJSON(e.data));
      }
      h.length > 0 && (s[c] = h, r = !0);
    }
    r && (e.data.morphAttributes = s, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const o = this.groups;
    o.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(o)));
    const a = this.boundingSphere;
    return a !== null && (e.data.boundingSphere = {
      center: a.center.toArray(),
      radius: a.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone(t));
    const s = e.attributes;
    for (const l in s) {
      const h = s[l];
      this.setAttribute(l, h.clone(t));
    }
    const r = e.morphAttributes;
    for (const l in r) {
      const h = [], u = r[l];
      for (let d = 0, f = u.length; d < f; d++)
        h.push(u[d].clone(t));
      this.morphAttributes[l] = h;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const o = e.groups;
    for (let l = 0, h = o.length; l < h; l++) {
      const u = o[l];
      this.addGroup(u.start, u.count, u.materialIndex);
    }
    const a = e.boundingBox;
    a !== null && (this.boundingBox = a.clone());
    const c = e.boundingSphere;
    return c !== null && (this.boundingSphere = c.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const ml = /* @__PURE__ */ new Ce(), ti = /* @__PURE__ */ new cs(), hr = /* @__PURE__ */ new un(), gl = /* @__PURE__ */ new w(), ur = /* @__PURE__ */ new w(), dr = /* @__PURE__ */ new w(), fr = /* @__PURE__ */ new w(), Do = /* @__PURE__ */ new w(), pr = /* @__PURE__ */ new w(), _l = /* @__PURE__ */ new w(), mr = /* @__PURE__ */ new w();
class St extends at {
  constructor(e = new Gt(), t = new ui()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const s = t[n[0]];
      if (s !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let r = 0, o = s.length; r < o; r++) {
          const a = s[r].name || String(r);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[a] = r;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry, s = n.attributes.position, r = n.morphAttributes.position, o = n.morphTargetsRelative;
    t.fromBufferAttribute(s, e);
    const a = this.morphTargetInfluences;
    if (r && a) {
      pr.set(0, 0, 0);
      for (let c = 0, l = r.length; c < l; c++) {
        const h = a[c], u = r[c];
        h !== 0 && (Do.fromBufferAttribute(u, e), o ? pr.addScaledVector(Do, h) : pr.addScaledVector(Do.sub(t), h));
      }
      t.add(pr);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, s = this.material, r = this.matrixWorld;
    s !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), hr.copy(n.boundingSphere), hr.applyMatrix4(r), ti.copy(e.ray).recast(e.near), !(hr.containsPoint(ti.origin) === !1 && (ti.intersectSphere(hr, gl) === null || ti.origin.distanceToSquared(gl) > (e.far - e.near) ** 2)) && (ml.copy(r).invert(), ti.copy(e.ray).applyMatrix4(ml), !(n.boundingBox !== null && ti.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, ti)));
  }
  _computeIntersections(e, t, n) {
    let s;
    const r = this.geometry, o = this.material, a = r.index, c = r.attributes.position, l = r.attributes.uv, h = r.attributes.uv1, u = r.attributes.normal, d = r.groups, f = r.drawRange;
    if (a !== null)
      if (Array.isArray(o))
        for (let g = 0, _ = d.length; g < _; g++) {
          const p = d[g], m = o[p.materialIndex], T = Math.max(p.start, f.start), y = Math.min(a.count, Math.min(p.start + p.count, f.start + f.count));
          for (let S = T, D = y; S < D; S += 3) {
            const R = a.getX(S), A = a.getX(S + 1), N = a.getX(S + 2);
            s = gr(this, m, e, n, l, h, u, R, A, N), s && (s.faceIndex = Math.floor(S / 3), s.face.materialIndex = p.materialIndex, t.push(s));
          }
        }
      else {
        const g = Math.max(0, f.start), _ = Math.min(a.count, f.start + f.count);
        for (let p = g, m = _; p < m; p += 3) {
          const T = a.getX(p), y = a.getX(p + 1), S = a.getX(p + 2);
          s = gr(this, o, e, n, l, h, u, T, y, S), s && (s.faceIndex = Math.floor(p / 3), t.push(s));
        }
      }
    else if (c !== void 0)
      if (Array.isArray(o))
        for (let g = 0, _ = d.length; g < _; g++) {
          const p = d[g], m = o[p.materialIndex], T = Math.max(p.start, f.start), y = Math.min(c.count, Math.min(p.start + p.count, f.start + f.count));
          for (let S = T, D = y; S < D; S += 3) {
            const R = S, A = S + 1, N = S + 2;
            s = gr(this, m, e, n, l, h, u, R, A, N), s && (s.faceIndex = Math.floor(S / 3), s.face.materialIndex = p.materialIndex, t.push(s));
          }
        }
      else {
        const g = Math.max(0, f.start), _ = Math.min(c.count, f.start + f.count);
        for (let p = g, m = _; p < m; p += 3) {
          const T = p, y = p + 1, S = p + 2;
          s = gr(this, o, e, n, l, h, u, T, y, S), s && (s.faceIndex = Math.floor(p / 3), t.push(s));
        }
      }
  }
}
function Wf(i, e, t, n, s, r, o, a) {
  let c;
  if (e.side === Ot ? c = n.intersectTriangle(o, r, s, !0, a) : c = n.intersectTriangle(s, r, o, e.side === wn, a), c === null) return null;
  mr.copy(a), mr.applyMatrix4(i.matrixWorld);
  const l = t.ray.origin.distanceTo(mr);
  return l < t.near || l > t.far ? null : {
    distance: l,
    point: mr.clone(),
    object: i
  };
}
function gr(i, e, t, n, s, r, o, a, c, l) {
  i.getVertexPosition(a, ur), i.getVertexPosition(c, dr), i.getVertexPosition(l, fr);
  const h = Wf(i, e, t, n, ur, dr, fr, _l);
  if (h) {
    const u = new w();
    qt.getBarycoord(_l, ur, dr, fr, u), s && (h.uv = qt.getInterpolatedAttribute(s, a, c, l, u, new te())), r && (h.uv1 = qt.getInterpolatedAttribute(r, a, c, l, u, new te())), o && (h.normal = qt.getInterpolatedAttribute(o, a, c, l, u, new w()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = {
      a,
      b: c,
      c: l,
      normal: new w(),
      materialIndex: 0
    };
    qt.getNormal(ur, dr, fr, d.normal), h.face = d, h.barycoord = u;
  }
  return h;
}
class _i extends Gt {
  constructor(e = 1, t = 1, n = 1, s = 1, r = 1, o = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: s,
      heightSegments: r,
      depthSegments: o
    };
    const a = this;
    s = Math.floor(s), r = Math.floor(r), o = Math.floor(o);
    const c = [], l = [], h = [], u = [];
    let d = 0, f = 0;
    g("z", "y", "x", -1, -1, n, t, e, o, r, 0), g("z", "y", "x", 1, -1, n, t, -e, o, r, 1), g("x", "z", "y", 1, 1, e, n, t, s, o, 2), g("x", "z", "y", 1, -1, e, n, -t, s, o, 3), g("x", "y", "z", 1, -1, e, t, n, s, r, 4), g("x", "y", "z", -1, -1, e, t, -n, s, r, 5), this.setIndex(c), this.setAttribute("position", new It(l, 3)), this.setAttribute("normal", new It(h, 3)), this.setAttribute("uv", new It(u, 2));
    function g(_, p, m, T, y, S, D, R, A, N, Y) {
      const v = S / A, E = D / N, z = S / 2, B = D / 2, H = R / 2, j = A + 1, k = N + 1;
      let Q = 0, G = 0;
      const ce = new w();
      for (let le = 0; le < k; le++) {
        const _e = le * E - B;
        for (let Xe = 0; Xe < j; Xe++) {
          const Ke = Xe * v - z;
          ce[_] = Ke * T, ce[p] = _e * y, ce[m] = H, l.push(ce.x, ce.y, ce.z), ce[_] = 0, ce[p] = 0, ce[m] = R > 0 ? 1 : -1, h.push(ce.x, ce.y, ce.z), u.push(Xe / A), u.push(1 - le / N), Q += 1;
        }
      }
      for (let le = 0; le < N; le++)
        for (let _e = 0; _e < A; _e++) {
          const Xe = d + _e + j * le, Ke = d + _e + j * (le + 1), W = d + (_e + 1) + j * (le + 1), Z = d + (_e + 1) + j * le;
          c.push(Xe, Ke, Z), c.push(Ke, W, Z), G += 6;
        }
      a.addGroup(f, G, Y), f += G, d += Q;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new _i(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function ss(i) {
  const e = {};
  for (const t in i) {
    e[t] = {};
    for (const n in i[t]) {
      const s = i[t][n];
      s && (s.isColor || s.isMatrix3 || s.isMatrix4 || s.isVector2 || s.isVector3 || s.isVector4 || s.isTexture || s.isQuaternion) ? s.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = s.clone() : Array.isArray(s) ? e[t][n] = s.slice() : e[t][n] = s;
    }
  }
  return e;
}
function wt(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = ss(i[t]);
    for (const s in n)
      e[s] = n[s];
  }
  return e;
}
function Xf(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function hu(i) {
  const e = i.getRenderTarget();
  return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : We.workingColorSpace;
}
const $f = { clone: ss, merge: wt };
var qf = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Yf = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class qn extends rn {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = qf, this.fragmentShader = Yf, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = ss(e.uniforms), this.uniformsGroups = Xf(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const s in this.uniforms) {
      const o = this.uniforms[s].value;
      o && o.isTexture ? t.uniforms[s] = {
        type: "t",
        value: o.toJSON(e).uuid
      } : o && o.isColor ? t.uniforms[s] = {
        type: "c",
        value: o.getHex()
      } : o && o.isVector2 ? t.uniforms[s] = {
        type: "v2",
        value: o.toArray()
      } : o && o.isVector3 ? t.uniforms[s] = {
        type: "v3",
        value: o.toArray()
      } : o && o.isVector4 ? t.uniforms[s] = {
        type: "v4",
        value: o.toArray()
      } : o && o.isMatrix3 ? t.uniforms[s] = {
        type: "m3",
        value: o.toArray()
      } : o && o.isMatrix4 ? t.uniforms[s] = {
        type: "m4",
        value: o.toArray()
      } : t.uniforms[s] = {
        value: o
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const s in this.extensions)
      this.extensions[s] === !0 && (n[s] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}
class uu extends at {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Ce(), this.projectionMatrix = new Ce(), this.projectionMatrixInverse = new Ce(), this.coordinateSystem = An;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Un = /* @__PURE__ */ new w(), vl = /* @__PURE__ */ new te(), xl = /* @__PURE__ */ new te();
class Ct extends uu {
  constructor(e = 50, t = 1, n = 0.1, s = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = s, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = is * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const e = Math.tan(Ls * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return is * 2 * Math.atan(
      Math.tan(Ls * 0.5 * this.fov) / this.zoom
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
  getViewBounds(e, t, n) {
    Un.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Un.x, Un.y).multiplyScalar(-e / Un.z), Un.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(Un.x, Un.y).multiplyScalar(-e / Un.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, vl, xl), t.subVectors(xl, vl);
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
  setViewOffset(e, t, n, s, r, o) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(Ls * 0.5 * this.fov) / this.zoom, n = 2 * t, s = this.aspect * n, r = -0.5 * s;
    const o = this.view;
    if (this.view !== null && this.view.enabled) {
      const c = o.fullWidth, l = o.fullHeight;
      r += o.offsetX * s / c, t -= o.offsetY * n / l, s *= o.width / c, n *= o.height / l;
    }
    const a = this.filmOffset;
    a !== 0 && (r += e * a / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + s, t, t - n, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
const Pi = -90, Li = 1;
class jf extends at {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const s = new Ct(Pi, Li, e, t);
    s.layers = this.layers, this.add(s);
    const r = new Ct(Pi, Li, e, t);
    r.layers = this.layers, this.add(r);
    const o = new Ct(Pi, Li, e, t);
    o.layers = this.layers, this.add(o);
    const a = new Ct(Pi, Li, e, t);
    a.layers = this.layers, this.add(a);
    const c = new Ct(Pi, Li, e, t);
    c.layers = this.layers, this.add(c);
    const l = new Ct(Pi, Li, e, t);
    l.layers = this.layers, this.add(l);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, s, r, o, a, c] = t;
    for (const l of t) this.remove(l);
    if (e === An)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), c.up.set(0, 1, 0), c.lookAt(0, 0, -1);
    else if (e === Zr)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), s.up.set(0, -1, 0), s.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), o.up.set(0, 0, -1), o.lookAt(0, -1, 0), a.up.set(0, -1, 0), a.lookAt(0, 0, 1), c.up.set(0, -1, 0), c.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const l of t)
      this.add(l), l.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: s } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [r, o, a, c, l, h] = this.children, u = e.getRenderTarget(), d = e.getActiveCubeFace(), f = e.getActiveMipmapLevel(), g = e.xr.enabled;
    e.xr.enabled = !1;
    const _ = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, s), e.render(t, r), e.setRenderTarget(n, 1, s), e.render(t, o), e.setRenderTarget(n, 2, s), e.render(t, a), e.setRenderTarget(n, 3, s), e.render(t, c), e.setRenderTarget(n, 4, s), e.render(t, l), n.texture.generateMipmaps = _, e.setRenderTarget(n, 5, s), e.render(t, h), e.setRenderTarget(u, d, f), e.xr.enabled = g, n.texture.needsPMREMUpdate = !0;
  }
}
class du extends _t {
  constructor(e, t, n, s, r, o, a, c, l, h) {
    e = e !== void 0 ? e : [], t = t !== void 0 ? t : Ji, super(e, t, n, s, r, o, a, c, l, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Kf extends pi {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, s = [n, n, n, n, n, n];
    this.texture = new du(s, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : Vt;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
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
    }, s = new _i(5, 5, 5), r = new qn({
      name: "CubemapFromEquirect",
      uniforms: ss(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: Ot,
      blending: Xn
    });
    r.uniforms.tEquirect.value = t;
    const o = new St(s, r), a = t.minFilter;
    return t.minFilter === bn && (t.minFilter = Vt), new jf(1, 10, this).update(e, o), t.minFilter = a, o.geometry.dispose(), o.material.dispose(), this;
  }
  clear(e, t, n, s) {
    const r = e.getRenderTarget();
    for (let o = 0; o < 6; o++)
      e.setRenderTarget(this, o), e.clear(t, n, s);
    e.setRenderTarget(r);
  }
}
const No = /* @__PURE__ */ new w(), Zf = /* @__PURE__ */ new w(), Jf = /* @__PURE__ */ new De();
class zn {
  constructor(e = new w(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, n, s) {
    return this.normal.set(e, t, n), this.constant = s, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, n) {
    const s = No.subVectors(n, t).cross(Zf.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(s, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const n = e.delta(No), s = this.normal.dot(n);
    if (s === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const r = -(e.start.dot(this.normal) + this.constant) / s;
    return r < 0 || r > 1 ? null : t.copy(e.start).addScaledVector(n, r);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || Jf.getNormalMatrix(e), s = this.coplanarPoint(No).applyMatrix4(e), r = this.normal.applyMatrix3(n).normalize();
    return this.constant = -s.dot(r), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const ni = /* @__PURE__ */ new un(), _r = /* @__PURE__ */ new w();
class fc {
  constructor(e = new zn(), t = new zn(), n = new zn(), s = new zn(), r = new zn(), o = new zn()) {
    this.planes = [e, t, n, s, r, o];
  }
  set(e, t, n, s, r, o) {
    const a = this.planes;
    return a[0].copy(e), a[1].copy(t), a[2].copy(n), a[3].copy(s), a[4].copy(r), a[5].copy(o), this;
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = An) {
    const n = this.planes, s = e.elements, r = s[0], o = s[1], a = s[2], c = s[3], l = s[4], h = s[5], u = s[6], d = s[7], f = s[8], g = s[9], _ = s[10], p = s[11], m = s[12], T = s[13], y = s[14], S = s[15];
    if (n[0].setComponents(c - r, d - l, p - f, S - m).normalize(), n[1].setComponents(c + r, d + l, p + f, S + m).normalize(), n[2].setComponents(c + o, d + h, p + g, S + T).normalize(), n[3].setComponents(c - o, d - h, p - g, S - T).normalize(), n[4].setComponents(c - a, d - u, p - _, S - y).normalize(), t === An)
      n[5].setComponents(c + a, d + u, p + _, S + y).normalize();
    else if (t === Zr)
      n[5].setComponents(a, u, _, y).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(ni);
  }
  intersectsSprite(e) {
    return ni.center.set(0, 0, 0), ni.radius = 0.7071067811865476, ni.applyMatrix4(e.matrixWorld), this.intersectsSphere(ni);
  }
  intersectsSphere(e) {
    const t = this.planes, n = e.center, s = -e.radius;
    for (let r = 0; r < 6; r++)
      if (t[r].distanceToPoint(n) < s)
        return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const s = t[n];
      if (_r.x = s.normal.x > 0 ? e.max.x : e.min.x, _r.y = s.normal.y > 0 ? e.max.y : e.min.y, _r.z = s.normal.z > 0 ? e.max.z : e.min.z, s.distanceToPoint(_r) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function fu() {
  let i = null, e = !1, t = null, n = null;
  function s(r, o) {
    t(r, o), n = i.requestAnimationFrame(s);
  }
  return {
    start: function() {
      e !== !0 && t !== null && (n = i.requestAnimationFrame(s), e = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(r) {
      t = r;
    },
    setContext: function(r) {
      i = r;
    }
  };
}
function Qf(i) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(a, c) {
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
    return a.isInterleavedBufferAttribute && (a = a.data), e.get(a);
  }
  function r(a) {
    a.isInterleavedBufferAttribute && (a = a.data);
    const c = e.get(a);
    c && (i.deleteBuffer(c.buffer), e.delete(a));
  }
  function o(a, c) {
    if (a.isInterleavedBufferAttribute && (a = a.data), a.isGLBufferAttribute) {
      const h = e.get(a);
      (!h || h.version < a.version) && e.set(a, {
        buffer: a.buffer,
        type: a.type,
        bytesPerElement: a.elementSize,
        version: a.version
      });
      return;
    }
    const l = e.get(a);
    if (l === void 0)
      e.set(a, t(a, c));
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
class so extends Gt {
  constructor(e = 1, t = 1, n = 1, s = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: s
    };
    const r = e / 2, o = t / 2, a = Math.floor(n), c = Math.floor(s), l = a + 1, h = c + 1, u = e / a, d = t / c, f = [], g = [], _ = [], p = [];
    for (let m = 0; m < h; m++) {
      const T = m * d - o;
      for (let y = 0; y < l; y++) {
        const S = y * u - r;
        g.push(S, -T, 0), _.push(0, 0, 1), p.push(y / a), p.push(1 - m / c);
      }
    }
    for (let m = 0; m < c; m++)
      for (let T = 0; T < a; T++) {
        const y = T + l * m, S = T + l * (m + 1), D = T + 1 + l * (m + 1), R = T + 1 + l * m;
        f.push(y, S, R), f.push(S, D, R);
      }
    this.setIndex(f), this.setAttribute("position", new It(g, 3)), this.setAttribute("normal", new It(_, 3)), this.setAttribute("uv", new It(p, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new so(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var ep = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, tp = `#ifdef USE_ALPHAHASH
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
#endif`, np = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, ip = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, sp = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, rp = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, op = `#ifdef USE_AOMAP
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
#endif`, ap = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, cp = `#ifdef USE_BATCHING
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
#endif`, lp = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, hp = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, up = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, dp = `float G_BlinnPhong_Implicit( ) {
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
} // validated`, fp = `#ifdef USE_IRIDESCENCE
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
#endif`, pp = `#ifdef USE_BUMPMAP
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
#endif`, mp = `#if NUM_CLIPPING_PLANES > 0
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
#endif`, gp = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, _p = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, vp = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, xp = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, yp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Mp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, Sp = `#if defined( USE_COLOR_ALPHA )
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
#endif`, Ep = `#define PI 3.141592653589793
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
} // validated`, Tp = `#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`, bp = `vec3 transformedNormal = objectNormal;
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
#endif`, Ap = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, wp = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Rp = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Cp = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Pp = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Lp = `
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
}`, Ip = `#ifdef USE_ENVMAP
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
#endif`, Dp = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Np = `#ifdef USE_ENVMAP
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
#endif`, Up = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Op = `#ifdef USE_ENVMAP
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
#endif`, Fp = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Bp = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, zp = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, kp = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Hp = `#ifdef USE_GRADIENTMAP
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
}`, Vp = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Gp = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Wp = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Xp = `uniform bool receiveShadow;
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
#endif`, $p = `#ifdef USE_ENVMAP
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
#endif`, qp = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Yp = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, jp = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Kp = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, Zp = `PhysicalMaterial material;
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
#endif`, Jp = `struct PhysicalMaterial {
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
}`, Qp = `
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
#endif`, em = `#if defined( RE_IndirectDiffuse )
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
#endif`, tm = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, nm = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, im = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, sm = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, rm = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, om = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, am = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, cm = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`, lm = `#if defined( USE_POINTS_UV )
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
#endif`, hm = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, um = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, dm = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, fm = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, pm = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, mm = `#ifdef USE_MORPHTARGETS
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
#endif`, gm = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, _m = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`, vm = `#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`, xm = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, ym = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Mm = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, Sm = `#ifdef USE_NORMALMAP
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
#endif`, Em = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Tm = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, bm = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Am = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, wm = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Rm = `vec3 packNormalToRGB( const in vec3 normal ) {
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
}`, Cm = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Pm = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Lm = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Im = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Dm = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Nm = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Um = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, Om = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, Fm = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`, Bm = `float getShadowMask() {
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
}`, zm = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, km = `#ifdef USE_SKINNING
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
#endif`, Hm = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Vm = `#ifdef USE_SKINNING
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
#endif`, Gm = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Wm = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Xm = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, $m = `#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`, qm = `#ifdef USE_TRANSMISSION
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
#endif`, Ym = `#ifdef USE_TRANSMISSION
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
#endif`, jm = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Km = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Zm = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, Jm = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Qm = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, eg = `uniform sampler2D t2D;
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
}`, tg = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, ng = `#ifdef ENVMAP_TYPE_CUBE
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
}`, ig = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, sg = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, rg = `#include <common>
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
}`, og = `#if DEPTH_PACKING == 3200
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
}`, ag = `#define DISTANCE
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
}`, cg = `#define DISTANCE
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
}`, lg = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, hg = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, ug = `uniform float scale;
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
}`, dg = `uniform vec3 diffuse;
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
}`, fg = `#include <common>
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
}`, pg = `uniform vec3 diffuse;
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
}`, mg = `#define LAMBERT
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
}`, gg = `#define LAMBERT
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
}`, _g = `#define MATCAP
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
}`, vg = `#define MATCAP
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
}`, xg = `#define NORMAL
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
}`, yg = `#define NORMAL
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
}`, Mg = `#define PHONG
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
}`, Sg = `#define PHONG
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
}`, Eg = `#define STANDARD
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
}`, Tg = `#define STANDARD
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
}`, bg = `#define TOON
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
}`, Ag = `#define TOON
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
}`, wg = `uniform float size;
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
}`, Rg = `uniform vec3 diffuse;
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
}`, Cg = `#include <common>
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
}`, Pg = `uniform vec3 color;
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
}`, Lg = `uniform float rotation;
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
}`, Ig = `uniform vec3 diffuse;
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
}`, Ie = {
  alphahash_fragment: ep,
  alphahash_pars_fragment: tp,
  alphamap_fragment: np,
  alphamap_pars_fragment: ip,
  alphatest_fragment: sp,
  alphatest_pars_fragment: rp,
  aomap_fragment: op,
  aomap_pars_fragment: ap,
  batching_pars_vertex: cp,
  batching_vertex: lp,
  begin_vertex: hp,
  beginnormal_vertex: up,
  bsdfs: dp,
  iridescence_fragment: fp,
  bumpmap_pars_fragment: pp,
  clipping_planes_fragment: mp,
  clipping_planes_pars_fragment: gp,
  clipping_planes_pars_vertex: _p,
  clipping_planes_vertex: vp,
  color_fragment: xp,
  color_pars_fragment: yp,
  color_pars_vertex: Mp,
  color_vertex: Sp,
  common: Ep,
  cube_uv_reflection_fragment: Tp,
  defaultnormal_vertex: bp,
  displacementmap_pars_vertex: Ap,
  displacementmap_vertex: wp,
  emissivemap_fragment: Rp,
  emissivemap_pars_fragment: Cp,
  colorspace_fragment: Pp,
  colorspace_pars_fragment: Lp,
  envmap_fragment: Ip,
  envmap_common_pars_fragment: Dp,
  envmap_pars_fragment: Np,
  envmap_pars_vertex: Up,
  envmap_physical_pars_fragment: $p,
  envmap_vertex: Op,
  fog_vertex: Fp,
  fog_pars_vertex: Bp,
  fog_fragment: zp,
  fog_pars_fragment: kp,
  gradientmap_pars_fragment: Hp,
  lightmap_pars_fragment: Vp,
  lights_lambert_fragment: Gp,
  lights_lambert_pars_fragment: Wp,
  lights_pars_begin: Xp,
  lights_toon_fragment: qp,
  lights_toon_pars_fragment: Yp,
  lights_phong_fragment: jp,
  lights_phong_pars_fragment: Kp,
  lights_physical_fragment: Zp,
  lights_physical_pars_fragment: Jp,
  lights_fragment_begin: Qp,
  lights_fragment_maps: em,
  lights_fragment_end: tm,
  logdepthbuf_fragment: nm,
  logdepthbuf_pars_fragment: im,
  logdepthbuf_pars_vertex: sm,
  logdepthbuf_vertex: rm,
  map_fragment: om,
  map_pars_fragment: am,
  map_particle_fragment: cm,
  map_particle_pars_fragment: lm,
  metalnessmap_fragment: hm,
  metalnessmap_pars_fragment: um,
  morphinstance_vertex: dm,
  morphcolor_vertex: fm,
  morphnormal_vertex: pm,
  morphtarget_pars_vertex: mm,
  morphtarget_vertex: gm,
  normal_fragment_begin: _m,
  normal_fragment_maps: vm,
  normal_pars_fragment: xm,
  normal_pars_vertex: ym,
  normal_vertex: Mm,
  normalmap_pars_fragment: Sm,
  clearcoat_normal_fragment_begin: Em,
  clearcoat_normal_fragment_maps: Tm,
  clearcoat_pars_fragment: bm,
  iridescence_pars_fragment: Am,
  opaque_fragment: wm,
  packing: Rm,
  premultiplied_alpha_fragment: Cm,
  project_vertex: Pm,
  dithering_fragment: Lm,
  dithering_pars_fragment: Im,
  roughnessmap_fragment: Dm,
  roughnessmap_pars_fragment: Nm,
  shadowmap_pars_fragment: Um,
  shadowmap_pars_vertex: Om,
  shadowmap_vertex: Fm,
  shadowmask_pars_fragment: Bm,
  skinbase_vertex: zm,
  skinning_pars_vertex: km,
  skinning_vertex: Hm,
  skinnormal_vertex: Vm,
  specularmap_fragment: Gm,
  specularmap_pars_fragment: Wm,
  tonemapping_fragment: Xm,
  tonemapping_pars_fragment: $m,
  transmission_fragment: qm,
  transmission_pars_fragment: Ym,
  uv_pars_fragment: jm,
  uv_pars_vertex: Km,
  uv_vertex: Zm,
  worldpos_vertex: Jm,
  background_vert: Qm,
  background_frag: eg,
  backgroundCube_vert: tg,
  backgroundCube_frag: ng,
  cube_vert: ig,
  cube_frag: sg,
  depth_vert: rg,
  depth_frag: og,
  distanceRGBA_vert: ag,
  distanceRGBA_frag: cg,
  equirect_vert: lg,
  equirect_frag: hg,
  linedashed_vert: ug,
  linedashed_frag: dg,
  meshbasic_vert: fg,
  meshbasic_frag: pg,
  meshlambert_vert: mg,
  meshlambert_frag: gg,
  meshmatcap_vert: _g,
  meshmatcap_frag: vg,
  meshnormal_vert: xg,
  meshnormal_frag: yg,
  meshphong_vert: Mg,
  meshphong_frag: Sg,
  meshphysical_vert: Eg,
  meshphysical_frag: Tg,
  meshtoon_vert: bg,
  meshtoon_frag: Ag,
  points_vert: wg,
  points_frag: Rg,
  shadow_vert: Cg,
  shadow_frag: Pg,
  sprite_vert: Lg,
  sprite_frag: Ig
}, ne = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Me(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new De() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new De() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new De() },
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
    aoMapTransform: { value: /* @__PURE__ */ new De() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new De() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new De() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new De() },
    normalScale: { value: /* @__PURE__ */ new te(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new De() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new De() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new De() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new De() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Me(16777215) }
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
    diffuse: { value: /* @__PURE__ */ new Me(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new De() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Me(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new te(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new De() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new De() },
    alphaTest: { value: 0 }
  }
}, an = {
  basic: {
    uniforms: /* @__PURE__ */ wt([
      ne.common,
      ne.specularmap,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.fog
    ]),
    vertexShader: Ie.meshbasic_vert,
    fragmentShader: Ie.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ wt([
      ne.common,
      ne.specularmap,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new Me(0) }
      }
    ]),
    vertexShader: Ie.meshlambert_vert,
    fragmentShader: Ie.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ wt([
      ne.common,
      ne.specularmap,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new Me(0) },
        specular: { value: /* @__PURE__ */ new Me(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Ie.meshphong_vert,
    fragmentShader: Ie.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ wt([
      ne.common,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.roughnessmap,
      ne.metalnessmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new Me(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ie.meshphysical_vert,
    fragmentShader: Ie.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ wt([
      ne.common,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.gradientmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new Me(0) }
      }
    ]),
    vertexShader: Ie.meshtoon_vert,
    fragmentShader: Ie.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ wt([
      ne.common,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Ie.meshmatcap_vert,
    fragmentShader: Ie.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ wt([
      ne.points,
      ne.fog
    ]),
    vertexShader: Ie.points_vert,
    fragmentShader: Ie.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ wt([
      ne.common,
      ne.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ie.linedashed_vert,
    fragmentShader: Ie.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ wt([
      ne.common,
      ne.displacementmap
    ]),
    vertexShader: Ie.depth_vert,
    fragmentShader: Ie.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ wt([
      ne.common,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ie.meshnormal_vert,
    fragmentShader: Ie.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ wt([
      ne.sprite,
      ne.fog
    ]),
    vertexShader: Ie.sprite_vert,
    fragmentShader: Ie.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new De() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ie.background_vert,
    fragmentShader: Ie.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new De() }
    },
    vertexShader: Ie.backgroundCube_vert,
    fragmentShader: Ie.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ie.cube_vert,
    fragmentShader: Ie.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Ie.equirect_vert,
    fragmentShader: Ie.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ wt([
      ne.common,
      ne.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new w() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ie.distanceRGBA_vert,
    fragmentShader: Ie.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ wt([
      ne.lights,
      ne.fog,
      {
        color: { value: /* @__PURE__ */ new Me(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ie.shadow_vert,
    fragmentShader: Ie.shadow_frag
  }
};
an.physical = {
  uniforms: /* @__PURE__ */ wt([
    an.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new De() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new De() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new te(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new De() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new De() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new De() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Me(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new De() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new De() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new De() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new te() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new De() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Me(0) },
      specularColor: { value: /* @__PURE__ */ new Me(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new De() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new De() },
      anisotropyVector: { value: /* @__PURE__ */ new te() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new De() }
    }
  ]),
  vertexShader: Ie.meshphysical_vert,
  fragmentShader: Ie.meshphysical_frag
};
const vr = { r: 0, b: 0, g: 0 }, ii = /* @__PURE__ */ new ln(), Dg = /* @__PURE__ */ new Ce();
function Ng(i, e, t, n, s, r, o) {
  const a = new Me(0);
  let c = r === !0 ? 0 : 1, l, h, u = null, d = 0, f = null;
  function g(T) {
    let y = T.isScene === !0 ? T.background : null;
    return y && y.isTexture && (y = (T.backgroundBlurriness > 0 ? t : e).get(y)), y;
  }
  function _(T) {
    let y = !1;
    const S = g(T);
    S === null ? m(a, c) : S && S.isColor && (m(S, 1), y = !0);
    const D = i.xr.getEnvironmentBlendMode();
    D === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, o) : D === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, o), (i.autoClear || y) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function p(T, y) {
    const S = g(y);
    S && (S.isCubeTexture || S.mapping === no) ? (h === void 0 && (h = new St(
      new _i(1, 1, 1),
      new qn({
        name: "BackgroundCubeMaterial",
        uniforms: ss(an.backgroundCube.uniforms),
        vertexShader: an.backgroundCube.vertexShader,
        fragmentShader: an.backgroundCube.fragmentShader,
        side: Ot,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(D, R, A) {
      this.matrixWorld.copyPosition(A.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), s.update(h)), ii.copy(y.backgroundRotation), ii.x *= -1, ii.y *= -1, ii.z *= -1, S.isCubeTexture && S.isRenderTargetTexture === !1 && (ii.y *= -1, ii.z *= -1), h.material.uniforms.envMap.value = S, h.material.uniforms.flipEnvMap.value = S.isCubeTexture && S.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = y.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(Dg.makeRotationFromEuler(ii)), h.material.toneMapped = We.getTransfer(S.colorSpace) !== rt, (u !== S || d !== S.version || f !== i.toneMapping) && (h.material.needsUpdate = !0, u = S, d = S.version, f = i.toneMapping), h.layers.enableAll(), T.unshift(h, h.geometry, h.material, 0, 0, null)) : S && S.isTexture && (l === void 0 && (l = new St(
      new so(2, 2),
      new qn({
        name: "BackgroundMaterial",
        uniforms: ss(an.background.uniforms),
        vertexShader: an.background.vertexShader,
        fragmentShader: an.background.fragmentShader,
        side: wn,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), s.update(l)), l.material.uniforms.t2D.value = S, l.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, l.material.toneMapped = We.getTransfer(S.colorSpace) !== rt, S.matrixAutoUpdate === !0 && S.updateMatrix(), l.material.uniforms.uvTransform.value.copy(S.matrix), (u !== S || d !== S.version || f !== i.toneMapping) && (l.material.needsUpdate = !0, u = S, d = S.version, f = i.toneMapping), l.layers.enableAll(), T.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function m(T, y) {
    T.getRGB(vr, hu(i)), n.buffers.color.setClear(vr.r, vr.g, vr.b, y, o);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(T, y = 1) {
      a.set(T), c = y, m(a, c);
    },
    getClearAlpha: function() {
      return c;
    },
    setClearAlpha: function(T) {
      c = T, m(a, c);
    },
    render: _,
    addToRenderList: p
  };
}
function Ug(i, e) {
  const t = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, s = d(null);
  let r = s, o = !1;
  function a(v, E, z, B, H) {
    let j = !1;
    const k = u(B, z, E);
    r !== k && (r = k, l(r.object)), j = f(v, B, z, H), j && g(v, B, z, H), H !== null && e.update(H, i.ELEMENT_ARRAY_BUFFER), (j || o) && (o = !1, S(v, E, z, B), H !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(H).buffer));
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
  function u(v, E, z) {
    const B = z.wireframe === !0;
    let H = n[v.id];
    H === void 0 && (H = {}, n[v.id] = H);
    let j = H[E.id];
    j === void 0 && (j = {}, H[E.id] = j);
    let k = j[B];
    return k === void 0 && (k = d(c()), j[B] = k), k;
  }
  function d(v) {
    const E = [], z = [], B = [];
    for (let H = 0; H < t; H++)
      E[H] = 0, z[H] = 0, B[H] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: E,
      enabledAttributes: z,
      attributeDivisors: B,
      object: v,
      attributes: {},
      index: null
    };
  }
  function f(v, E, z, B) {
    const H = r.attributes, j = E.attributes;
    let k = 0;
    const Q = z.getAttributes();
    for (const G in Q)
      if (Q[G].location >= 0) {
        const le = H[G];
        let _e = j[G];
        if (_e === void 0 && (G === "instanceMatrix" && v.instanceMatrix && (_e = v.instanceMatrix), G === "instanceColor" && v.instanceColor && (_e = v.instanceColor)), le === void 0 || le.attribute !== _e || _e && le.data !== _e.data) return !0;
        k++;
      }
    return r.attributesNum !== k || r.index !== B;
  }
  function g(v, E, z, B) {
    const H = {}, j = E.attributes;
    let k = 0;
    const Q = z.getAttributes();
    for (const G in Q)
      if (Q[G].location >= 0) {
        let le = j[G];
        le === void 0 && (G === "instanceMatrix" && v.instanceMatrix && (le = v.instanceMatrix), G === "instanceColor" && v.instanceColor && (le = v.instanceColor));
        const _e = {};
        _e.attribute = le, le && le.data && (_e.data = le.data), H[G] = _e, k++;
      }
    r.attributes = H, r.attributesNum = k, r.index = B;
  }
  function _() {
    const v = r.newAttributes;
    for (let E = 0, z = v.length; E < z; E++)
      v[E] = 0;
  }
  function p(v) {
    m(v, 0);
  }
  function m(v, E) {
    const z = r.newAttributes, B = r.enabledAttributes, H = r.attributeDivisors;
    z[v] = 1, B[v] === 0 && (i.enableVertexAttribArray(v), B[v] = 1), H[v] !== E && (i.vertexAttribDivisor(v, E), H[v] = E);
  }
  function T() {
    const v = r.newAttributes, E = r.enabledAttributes;
    for (let z = 0, B = E.length; z < B; z++)
      E[z] !== v[z] && (i.disableVertexAttribArray(z), E[z] = 0);
  }
  function y(v, E, z, B, H, j, k) {
    k === !0 ? i.vertexAttribIPointer(v, E, z, H, j) : i.vertexAttribPointer(v, E, z, B, H, j);
  }
  function S(v, E, z, B) {
    _();
    const H = B.attributes, j = z.getAttributes(), k = E.defaultAttributeValues;
    for (const Q in j) {
      const G = j[Q];
      if (G.location >= 0) {
        let ce = H[Q];
        if (ce === void 0 && (Q === "instanceMatrix" && v.instanceMatrix && (ce = v.instanceMatrix), Q === "instanceColor" && v.instanceColor && (ce = v.instanceColor)), ce !== void 0) {
          const le = ce.normalized, _e = ce.itemSize, Xe = e.get(ce);
          if (Xe === void 0) continue;
          const Ke = Xe.buffer, W = Xe.type, Z = Xe.bytesPerElement, me = W === i.INT || W === i.UNSIGNED_INT || ce.gpuType === ic;
          if (ce.isInterleavedBufferAttribute) {
            const he = ce.data, Pe = he.stride, Ee = ce.offset;
            if (he.isInstancedInterleavedBuffer) {
              for (let ze = 0; ze < G.locationSize; ze++)
                m(G.location + ze, he.meshPerAttribute);
              v.isInstancedMesh !== !0 && B._maxInstanceCount === void 0 && (B._maxInstanceCount = he.meshPerAttribute * he.count);
            } else
              for (let ze = 0; ze < G.locationSize; ze++)
                p(G.location + ze);
            i.bindBuffer(i.ARRAY_BUFFER, Ke);
            for (let ze = 0; ze < G.locationSize; ze++)
              y(
                G.location + ze,
                _e / G.locationSize,
                W,
                le,
                Pe * Z,
                (Ee + _e / G.locationSize * ze) * Z,
                me
              );
          } else {
            if (ce.isInstancedBufferAttribute) {
              for (let he = 0; he < G.locationSize; he++)
                m(G.location + he, ce.meshPerAttribute);
              v.isInstancedMesh !== !0 && B._maxInstanceCount === void 0 && (B._maxInstanceCount = ce.meshPerAttribute * ce.count);
            } else
              for (let he = 0; he < G.locationSize; he++)
                p(G.location + he);
            i.bindBuffer(i.ARRAY_BUFFER, Ke);
            for (let he = 0; he < G.locationSize; he++)
              y(
                G.location + he,
                _e / G.locationSize,
                W,
                le,
                _e * Z,
                _e / G.locationSize * he * Z,
                me
              );
          }
        } else if (k !== void 0) {
          const le = k[Q];
          if (le !== void 0)
            switch (le.length) {
              case 2:
                i.vertexAttrib2fv(G.location, le);
                break;
              case 3:
                i.vertexAttrib3fv(G.location, le);
                break;
              case 4:
                i.vertexAttrib4fv(G.location, le);
                break;
              default:
                i.vertexAttrib1fv(G.location, le);
            }
        }
      }
    }
    T();
  }
  function D() {
    N();
    for (const v in n) {
      const E = n[v];
      for (const z in E) {
        const B = E[z];
        for (const H in B)
          h(B[H].object), delete B[H];
        delete E[z];
      }
      delete n[v];
    }
  }
  function R(v) {
    if (n[v.id] === void 0) return;
    const E = n[v.id];
    for (const z in E) {
      const B = E[z];
      for (const H in B)
        h(B[H].object), delete B[H];
      delete E[z];
    }
    delete n[v.id];
  }
  function A(v) {
    for (const E in n) {
      const z = n[E];
      if (z[v.id] === void 0) continue;
      const B = z[v.id];
      for (const H in B)
        h(B[H].object), delete B[H];
      delete z[v.id];
    }
  }
  function N() {
    Y(), o = !0, r !== s && (r = s, l(r.object));
  }
  function Y() {
    s.geometry = null, s.program = null, s.wireframe = !1;
  }
  return {
    setup: a,
    reset: N,
    resetDefaultState: Y,
    dispose: D,
    releaseStatesOfGeometry: R,
    releaseStatesOfProgram: A,
    initAttributes: _,
    enableAttribute: p,
    disableUnusedAttributes: T
  };
}
function Og(i, e, t) {
  let n;
  function s(l) {
    n = l;
  }
  function r(l, h) {
    i.drawArrays(n, l, h), t.update(h, n, 1);
  }
  function o(l, h, u) {
    u !== 0 && (i.drawArraysInstanced(n, l, h, u), t.update(h, n, u));
  }
  function a(l, h, u) {
    if (u === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, l, 0, h, 0, u);
    let f = 0;
    for (let g = 0; g < u; g++)
      f += h[g];
    t.update(f, n, 1);
  }
  function c(l, h, u, d) {
    if (u === 0) return;
    const f = e.get("WEBGL_multi_draw");
    if (f === null)
      for (let g = 0; g < l.length; g++)
        o(l[g], h[g], d[g]);
    else {
      f.multiDrawArraysInstancedWEBGL(n, l, 0, h, 0, d, 0, u);
      let g = 0;
      for (let _ = 0; _ < u; _++)
        g += h[_];
      for (let _ = 0; _ < d.length; _++)
        t.update(g, n, d[_]);
    }
  }
  this.setMode = s, this.render = r, this.renderInstances = o, this.renderMultiDraw = a, this.renderMultiDrawInstances = c;
}
function Fg(i, e, t, n) {
  let s;
  function r() {
    if (s !== void 0) return s;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const A = e.get("EXT_texture_filter_anisotropic");
      s = i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      s = 0;
    return s;
  }
  function o(A) {
    return !(A !== Yt && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(A) {
    const N = A === js && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(A !== Rn && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    A !== sn && !N);
  }
  function c(A) {
    if (A === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      A = "mediump";
    }
    return A === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let l = t.precision !== void 0 ? t.precision : "highp";
  const h = c(l);
  h !== l && (console.warn("THREE.WebGLRenderer:", l, "not supported, using", h, "instead."), l = h);
  const u = t.logarithmicDepthBuffer === !0, d = t.reverseDepthBuffer === !0 && e.has("EXT_clip_control");
  if (d === !0) {
    const A = e.get("EXT_clip_control");
    A.clipControlEXT(A.LOWER_LEFT_EXT, A.ZERO_TO_ONE_EXT);
  }
  const f = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_TEXTURE_SIZE), p = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), m = i.getParameter(i.MAX_VERTEX_ATTRIBS), T = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), y = i.getParameter(i.MAX_VARYING_VECTORS), S = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), D = g > 0, R = i.getParameter(i.MAX_SAMPLES);
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
    maxVertexUniforms: T,
    maxVaryings: y,
    maxFragmentUniforms: S,
    vertexTextures: D,
    maxSamples: R
  };
}
function Bg(i) {
  const e = this;
  let t = null, n = 0, s = !1, r = !1;
  const o = new zn(), a = new De(), c = { value: null, needsUpdate: !1 };
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
    t = h(u, d, 0);
  }, this.setState = function(u, d, f) {
    const g = u.clippingPlanes, _ = u.clipIntersection, p = u.clipShadows, m = i.get(u);
    if (!s || g === null || g.length === 0 || r && !p)
      r ? h(null) : l();
    else {
      const T = r ? 0 : n, y = T * 4;
      let S = m.clippingState || null;
      c.value = S, S = h(g, d, y, f);
      for (let D = 0; D !== y; ++D)
        S[D] = t[D];
      m.clippingState = S, this.numIntersection = _ ? this.numPlanes : 0, this.numPlanes += T;
    }
  };
  function l() {
    c.value !== t && (c.value = t, c.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function h(u, d, f, g) {
    const _ = u !== null ? u.length : 0;
    let p = null;
    if (_ !== 0) {
      if (p = c.value, g !== !0 || p === null) {
        const m = f + _ * 4, T = d.matrixWorldInverse;
        a.getNormalMatrix(T), (p === null || p.length < m) && (p = new Float32Array(m));
        for (let y = 0, S = f; y !== _; ++y, S += 4)
          o.copy(u[y]).applyMatrix4(T, a), o.normal.toArray(p, S), p[S + 3] = o.constant;
      }
      c.value = p, c.needsUpdate = !0;
    }
    return e.numPlanes = _, e.numIntersection = 0, p;
  }
}
function zg(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(o, a) {
    return a === ha ? o.mapping = Ji : a === ua && (o.mapping = Qi), o;
  }
  function n(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === ha || a === ua)
        if (e.has(o)) {
          const c = e.get(o).texture;
          return t(c, o.mapping);
        } else {
          const c = o.image;
          if (c && c.height > 0) {
            const l = new Kf(c.height);
            return l.fromEquirectangularTexture(i, o), e.set(o, l), o.addEventListener("dispose", s), t(l.texture, o.mapping);
          } else
            return null;
        }
    }
    return o;
  }
  function s(o) {
    const a = o.target;
    a.removeEventListener("dispose", s);
    const c = e.get(a);
    c !== void 0 && (e.delete(a), c.dispose());
  }
  function r() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: r
  };
}
class pc extends uu {
  constructor(e = -1, t = 1, n = 1, s = -1, r = 0.1, o = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = s, this.near = r, this.far = o, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, s, r, o) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = s, this.view.width = r, this.view.height = o, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, s = (this.top + this.bottom) / 2;
    let r = n - e, o = n + e, a = s + t, c = s - t;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      r += l * this.view.offsetX, o = r + l * this.view.width, a -= h * this.view.offsetY, c = a - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(r, o, a, c, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const ki = 4, yl = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], li = 20, Uo = /* @__PURE__ */ new pc(), Ml = /* @__PURE__ */ new Me();
let Oo = null, Fo = 0, Bo = 0, zo = !1;
const ai = (1 + Math.sqrt(5)) / 2, Ii = 1 / ai, Sl = [
  /* @__PURE__ */ new w(-ai, Ii, 0),
  /* @__PURE__ */ new w(ai, Ii, 0),
  /* @__PURE__ */ new w(-Ii, 0, ai),
  /* @__PURE__ */ new w(Ii, 0, ai),
  /* @__PURE__ */ new w(0, ai, -Ii),
  /* @__PURE__ */ new w(0, ai, Ii),
  /* @__PURE__ */ new w(-1, 1, -1),
  /* @__PURE__ */ new w(1, 1, -1),
  /* @__PURE__ */ new w(-1, 1, 1),
  /* @__PURE__ */ new w(1, 1, 1)
];
class El {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(e, t = 0, n = 0.1, s = 100) {
    Oo = this._renderer.getRenderTarget(), Fo = this._renderer.getActiveCubeFace(), Bo = this._renderer.getActiveMipmapLevel(), zo = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
    const r = this._allocateTargets();
    return r.depthBuffer = !0, this._sceneToCubeUV(e, n, s, r), t > 0 && this._blur(r, 0, 0, t), this._applyPMREM(r), this._cleanup(r), r;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported equirectangular image size is 64 x 32.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   * The smallest supported cube size is 16 x 16.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Al(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = bl(), this._compileMaterial(this._equirectMaterial));
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
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(Oo, Fo, Bo), this._renderer.xr.enabled = zo, e.scissorTest = !1, xr(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === Ji || e.mapping === Qi ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Oo = this._renderer.getRenderTarget(), Fo = this._renderer.getActiveCubeFace(), Bo = this._renderer.getActiveMipmapLevel(), zo = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: Vt,
      minFilter: Vt,
      generateMipmaps: !1,
      type: js,
      format: Yt,
      colorSpace: Et,
      depthBuffer: !1
    }, s = Tl(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Tl(e, t, n);
      const { _lodMax: r } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = kg(r)), this._blurMaterial = Hg(r, e, t);
    }
    return s;
  }
  _compileMaterial(e) {
    const t = new St(this._lodPlanes[0], e);
    this._renderer.compile(t, Uo);
  }
  _sceneToCubeUV(e, t, n, s) {
    const a = new Ct(90, 1, t, n), c = [1, -1, 1, 1, 1, 1], l = [1, 1, 1, -1, -1, -1], h = this._renderer, u = h.autoClear, d = h.toneMapping;
    h.getClearColor(Ml), h.toneMapping = $n, h.autoClear = !1;
    const f = new ui({
      name: "PMREM.Background",
      side: Ot,
      depthWrite: !1,
      depthTest: !1
    }), g = new St(new _i(), f);
    let _ = !1;
    const p = e.background;
    p ? p.isColor && (f.color.copy(p), e.background = null, _ = !0) : (f.color.copy(Ml), _ = !0);
    for (let m = 0; m < 6; m++) {
      const T = m % 3;
      T === 0 ? (a.up.set(0, c[m], 0), a.lookAt(l[m], 0, 0)) : T === 1 ? (a.up.set(0, 0, c[m]), a.lookAt(0, l[m], 0)) : (a.up.set(0, c[m], 0), a.lookAt(0, 0, l[m]));
      const y = this._cubeSize;
      xr(s, T * y, m > 2 ? y : 0, y, y), h.setRenderTarget(s), _ && h.render(g, a), h.render(e, a);
    }
    g.geometry.dispose(), g.material.dispose(), h.toneMapping = d, h.autoClear = u, e.background = p;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, s = e.mapping === Ji || e.mapping === Qi;
    s ? (this._cubemapMaterial === null && (this._cubemapMaterial = Al()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = bl());
    const r = s ? this._cubemapMaterial : this._equirectMaterial, o = new St(this._lodPlanes[0], r), a = r.uniforms;
    a.envMap.value = e;
    const c = this._cubeSize;
    xr(t, 0, 0, 3 * c, 2 * c), n.setRenderTarget(t), n.render(o, Uo);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const s = this._lodPlanes.length;
    for (let r = 1; r < s; r++) {
      const o = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), a = Sl[(s - r - 1) % Sl.length];
      this._blur(e, r - 1, r, o, a);
    }
    t.autoClear = n;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(e, t, n, s, r) {
    const o = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      o,
      t,
      n,
      s,
      "latitudinal",
      r
    ), this._halfBlur(
      o,
      e,
      n,
      n,
      s,
      "longitudinal",
      r
    );
  }
  _halfBlur(e, t, n, s, r, o, a) {
    const c = this._renderer, l = this._blurMaterial;
    o !== "latitudinal" && o !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, u = new St(this._lodPlanes[s], l), d = l.uniforms, f = this._sizeLods[n] - 1, g = isFinite(r) ? Math.PI / (2 * f) : 2 * Math.PI / (2 * li - 1), _ = r / g, p = isFinite(r) ? 1 + Math.floor(h * _) : li;
    p > li && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${li}`);
    const m = [];
    let T = 0;
    for (let A = 0; A < li; ++A) {
      const N = A / _, Y = Math.exp(-N * N / 2);
      m.push(Y), A === 0 ? T += Y : A < p && (T += 2 * Y);
    }
    for (let A = 0; A < m.length; A++)
      m[A] = m[A] / T;
    d.envMap.value = e.texture, d.samples.value = p, d.weights.value = m, d.latitudinal.value = o === "latitudinal", a && (d.poleAxis.value = a);
    const { _lodMax: y } = this;
    d.dTheta.value = g, d.mipInt.value = y - n;
    const S = this._sizeLods[s], D = 3 * S * (s > y - ki ? s - y + ki : 0), R = 4 * (this._cubeSize - S);
    xr(t, D, R, 3 * S, 2 * S), c.setRenderTarget(t), c.render(u, Uo);
  }
}
function kg(i) {
  const e = [], t = [], n = [];
  let s = i;
  const r = i - ki + 1 + yl.length;
  for (let o = 0; o < r; o++) {
    const a = Math.pow(2, s);
    t.push(a);
    let c = 1 / a;
    o > i - ki ? c = yl[o - i + ki - 1] : o === 0 && (c = 0), n.push(c);
    const l = 1 / (a - 2), h = -l, u = 1 + l, d = [h, h, u, h, u, u, h, h, u, u, h, u], f = 6, g = 6, _ = 3, p = 2, m = 1, T = new Float32Array(_ * g * f), y = new Float32Array(p * g * f), S = new Float32Array(m * g * f);
    for (let R = 0; R < f; R++) {
      const A = R % 3 * 2 / 3 - 1, N = R > 2 ? 0 : -1, Y = [
        A,
        N,
        0,
        A + 2 / 3,
        N,
        0,
        A + 2 / 3,
        N + 1,
        0,
        A,
        N,
        0,
        A + 2 / 3,
        N + 1,
        0,
        A,
        N + 1,
        0
      ];
      T.set(Y, _ * g * R), y.set(d, p * g * R);
      const v = [R, R, R, R, R, R];
      S.set(v, m * g * R);
    }
    const D = new Gt();
    D.setAttribute("position", new Lt(T, _)), D.setAttribute("uv", new Lt(y, p)), D.setAttribute("faceIndex", new Lt(S, m)), e.push(D), s > ki && s--;
  }
  return { lodPlanes: e, sizeLods: t, sigmas: n };
}
function Tl(i, e, t) {
  const n = new pi(i, e, t);
  return n.texture.mapping = no, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function xr(i, e, t, n, s) {
  i.viewport.set(e, t, n, s), i.scissor.set(e, t, n, s);
}
function Hg(i, e, t) {
  const n = new Float32Array(li), s = new w(0, 1, 0);
  return new qn({
    name: "SphericalGaussianBlur",
    defines: {
      n: li,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
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
    vertexShader: mc(),
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
    blending: Xn,
    depthTest: !1,
    depthWrite: !1
  });
}
function bl() {
  return new qn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: mc(),
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
    blending: Xn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Al() {
  return new qn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: mc(),
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
    blending: Xn,
    depthTest: !1,
    depthWrite: !1
  });
}
function mc() {
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
function Vg(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function n(a) {
    if (a && a.isTexture) {
      const c = a.mapping, l = c === ha || c === ua, h = c === Ji || c === Qi;
      if (l || h) {
        let u = e.get(a);
        const d = u !== void 0 ? u.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== d)
          return t === null && (t = new El(i)), u = l ? t.fromEquirectangular(a, u) : t.fromCubemap(a, u), u.texture.pmremVersion = a.pmremVersion, e.set(a, u), u.texture;
        if (u !== void 0)
          return u.texture;
        {
          const f = a.image;
          return l && f && f.height > 0 || h && f && s(f) ? (t === null && (t = new El(i)), u = l ? t.fromEquirectangular(a) : t.fromCubemap(a), u.texture.pmremVersion = a.pmremVersion, e.set(a, u), a.addEventListener("dispose", r), u.texture) : null;
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
    const l = e.get(c);
    l !== void 0 && (e.delete(c), l.dispose());
  }
  function o() {
    e = /* @__PURE__ */ new WeakMap(), t !== null && (t.dispose(), t = null);
  }
  return {
    get: n,
    dispose: o
  };
}
function Gg(i) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
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
    return e[n] = s, s;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const s = t(n);
      return s === null && Gr("THREE.WebGLRenderer: " + n + " extension not supported."), s;
    }
  };
}
function Wg(i, e, t, n) {
  const s = {}, r = /* @__PURE__ */ new WeakMap();
  function o(u) {
    const d = u.target;
    d.index !== null && e.remove(d.index);
    for (const g in d.attributes)
      e.remove(d.attributes[g]);
    for (const g in d.morphAttributes) {
      const _ = d.morphAttributes[g];
      for (let p = 0, m = _.length; p < m; p++)
        e.remove(_[p]);
    }
    d.removeEventListener("dispose", o), delete s[d.id];
    const f = r.get(d);
    f && (e.remove(f), r.delete(d)), n.releaseStatesOfGeometry(d), d.isInstancedBufferGeometry === !0 && delete d._maxInstanceCount, t.memory.geometries--;
  }
  function a(u, d) {
    return s[d.id] === !0 || (d.addEventListener("dispose", o), s[d.id] = !0, t.memory.geometries++), d;
  }
  function c(u) {
    const d = u.attributes;
    for (const g in d)
      e.update(d[g], i.ARRAY_BUFFER);
    const f = u.morphAttributes;
    for (const g in f) {
      const _ = f[g];
      for (let p = 0, m = _.length; p < m; p++)
        e.update(_[p], i.ARRAY_BUFFER);
    }
  }
  function l(u) {
    const d = [], f = u.index, g = u.attributes.position;
    let _ = 0;
    if (f !== null) {
      const T = f.array;
      _ = f.version;
      for (let y = 0, S = T.length; y < S; y += 3) {
        const D = T[y + 0], R = T[y + 1], A = T[y + 2];
        d.push(D, R, R, A, A, D);
      }
    } else if (g !== void 0) {
      const T = g.array;
      _ = g.version;
      for (let y = 0, S = T.length / 3 - 1; y < S; y += 3) {
        const D = y + 0, R = y + 1, A = y + 2;
        d.push(D, R, R, A, A, D);
      }
    } else
      return;
    const p = new (su(d) ? lu : cu)(d, 1);
    p.version = _;
    const m = r.get(u);
    m && e.remove(m), r.set(u, p);
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
function Xg(i, e, t) {
  let n;
  function s(d) {
    n = d;
  }
  let r, o;
  function a(d) {
    r = d.type, o = d.bytesPerElement;
  }
  function c(d, f) {
    i.drawElements(n, f, r, d * o), t.update(f, n, 1);
  }
  function l(d, f, g) {
    g !== 0 && (i.drawElementsInstanced(n, f, r, d * o, g), t.update(f, n, g));
  }
  function h(d, f, g) {
    if (g === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, f, 0, r, d, 0, g);
    let p = 0;
    for (let m = 0; m < g; m++)
      p += f[m];
    t.update(p, n, 1);
  }
  function u(d, f, g, _) {
    if (g === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let m = 0; m < d.length; m++)
        l(d[m] / o, f[m], _[m]);
    else {
      p.multiDrawElementsInstancedWEBGL(n, f, 0, r, d, 0, _, 0, g);
      let m = 0;
      for (let T = 0; T < g; T++)
        m += f[T];
      for (let T = 0; T < _.length; T++)
        t.update(m, n, _[T]);
    }
  }
  this.setMode = s, this.setIndex = a, this.render = c, this.renderInstances = l, this.renderMultiDraw = h, this.renderMultiDrawInstances = u;
}
function $g(i) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(r, o, a) {
    switch (t.calls++, o) {
      case i.TRIANGLES:
        t.triangles += a * (r / 3);
        break;
      case i.LINES:
        t.lines += a * (r / 2);
        break;
      case i.LINE_STRIP:
        t.lines += a * (r - 1);
        break;
      case i.LINE_LOOP:
        t.lines += a * r;
        break;
      case i.POINTS:
        t.points += a * r;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", o);
        break;
    }
  }
  function s() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: s,
    update: n
  };
}
function qg(i, e, t) {
  const n = /* @__PURE__ */ new WeakMap(), s = new qe();
  function r(o, a, c) {
    const l = o.morphTargetInfluences, h = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, u = h !== void 0 ? h.length : 0;
    let d = n.get(a);
    if (d === void 0 || d.count !== u) {
      let Y = function() {
        A.dispose(), n.delete(a), a.removeEventListener("dispose", Y);
      };
      d !== void 0 && d.texture.dispose();
      const f = a.morphAttributes.position !== void 0, g = a.morphAttributes.normal !== void 0, _ = a.morphAttributes.color !== void 0, p = a.morphAttributes.position || [], m = a.morphAttributes.normal || [], T = a.morphAttributes.color || [];
      let y = 0;
      f === !0 && (y = 1), g === !0 && (y = 2), _ === !0 && (y = 3);
      let S = a.attributes.position.count * y, D = 1;
      S > e.maxTextureSize && (D = Math.ceil(S / e.maxTextureSize), S = e.maxTextureSize);
      const R = new Float32Array(S * D * 4 * u), A = new ou(R, S, D, u);
      A.type = sn, A.needsUpdate = !0;
      const N = y * 4;
      for (let v = 0; v < u; v++) {
        const E = p[v], z = m[v], B = T[v], H = S * D * 4 * v;
        for (let j = 0; j < E.count; j++) {
          const k = j * N;
          f === !0 && (s.fromBufferAttribute(E, j), R[H + k + 0] = s.x, R[H + k + 1] = s.y, R[H + k + 2] = s.z, R[H + k + 3] = 0), g === !0 && (s.fromBufferAttribute(z, j), R[H + k + 4] = s.x, R[H + k + 5] = s.y, R[H + k + 6] = s.z, R[H + k + 7] = 0), _ === !0 && (s.fromBufferAttribute(B, j), R[H + k + 8] = s.x, R[H + k + 9] = s.y, R[H + k + 10] = s.z, R[H + k + 11] = B.itemSize === 4 ? s.w : 1);
        }
      }
      d = {
        count: u,
        texture: A,
        size: new te(S, D)
      }, n.set(a, d), a.addEventListener("dispose", Y);
    }
    if (o.isInstancedMesh === !0 && o.morphTexture !== null)
      c.getUniforms().setValue(i, "morphTexture", o.morphTexture, t);
    else {
      let f = 0;
      for (let _ = 0; _ < l.length; _++)
        f += l[_];
      const g = a.morphTargetsRelative ? 1 : 1 - f;
      c.getUniforms().setValue(i, "morphTargetBaseInfluence", g), c.getUniforms().setValue(i, "morphTargetInfluences", l);
    }
    c.getUniforms().setValue(i, "morphTargetsTexture", d.texture, t), c.getUniforms().setValue(i, "morphTargetsTextureSize", d.size);
  }
  return {
    update: r
  };
}
function Yg(i, e, t, n) {
  let s = /* @__PURE__ */ new WeakMap();
  function r(c) {
    const l = n.render.frame, h = c.geometry, u = e.get(c, h);
    if (s.get(u) !== l && (e.update(u), s.set(u, l)), c.isInstancedMesh && (c.hasEventListener("dispose", a) === !1 && c.addEventListener("dispose", a), s.get(c) !== l && (t.update(c.instanceMatrix, i.ARRAY_BUFFER), c.instanceColor !== null && t.update(c.instanceColor, i.ARRAY_BUFFER), s.set(c, l))), c.isSkinnedMesh) {
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
    l.removeEventListener("dispose", a), t.remove(l.instanceMatrix), l.instanceColor !== null && t.remove(l.instanceColor);
  }
  return {
    update: r,
    dispose: o
  };
}
class pu extends _t {
  constructor(e, t, n, s, r, o, a, c, l, h = Xi) {
    if (h !== Xi && h !== ns)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === Xi && (n = fi), n === void 0 && h === ns && (n = ts), super(null, s, r, o, a, c, h, n, l), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = a !== void 0 ? a : Pt, this.minFilter = c !== void 0 ? c : Pt, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
const mu = /* @__PURE__ */ new _t(), wl = /* @__PURE__ */ new pu(1, 1), gu = /* @__PURE__ */ new ou(), _u = /* @__PURE__ */ new Nf(), vu = /* @__PURE__ */ new du(), Rl = [], Cl = [], Pl = new Float32Array(16), Ll = new Float32Array(9), Il = new Float32Array(4);
function ls(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const s = e * t;
  let r = Rl[s];
  if (r === void 0 && (r = new Float32Array(s), Rl[s] = r), e !== 0) {
    n.toArray(r, 0);
    for (let o = 1, a = 0; o !== e; ++o)
      a += t, i[o].toArray(r, a);
  }
  return r;
}
function vt(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function xt(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function ro(i, e) {
  let t = Cl[e];
  t === void 0 && (t = new Int32Array(e), Cl[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function jg(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function Kg(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (vt(t, e)) return;
    i.uniform2fv(this.addr, e), xt(t, e);
  }
}
function Zg(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (vt(t, e)) return;
    i.uniform3fv(this.addr, e), xt(t, e);
  }
}
function Jg(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (vt(t, e)) return;
    i.uniform4fv(this.addr, e), xt(t, e);
  }
}
function Qg(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (vt(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), xt(t, e);
  } else {
    if (vt(t, n)) return;
    Il.set(n), i.uniformMatrix2fv(this.addr, !1, Il), xt(t, n);
  }
}
function e_(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (vt(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), xt(t, e);
  } else {
    if (vt(t, n)) return;
    Ll.set(n), i.uniformMatrix3fv(this.addr, !1, Ll), xt(t, n);
  }
}
function t_(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (vt(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), xt(t, e);
  } else {
    if (vt(t, n)) return;
    Pl.set(n), i.uniformMatrix4fv(this.addr, !1, Pl), xt(t, n);
  }
}
function n_(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function i_(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (vt(t, e)) return;
    i.uniform2iv(this.addr, e), xt(t, e);
  }
}
function s_(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (vt(t, e)) return;
    i.uniform3iv(this.addr, e), xt(t, e);
  }
}
function r_(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (vt(t, e)) return;
    i.uniform4iv(this.addr, e), xt(t, e);
  }
}
function o_(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function a_(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (vt(t, e)) return;
    i.uniform2uiv(this.addr, e), xt(t, e);
  }
}
function c_(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (vt(t, e)) return;
    i.uniform3uiv(this.addr, e), xt(t, e);
  }
}
function l_(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (vt(t, e)) return;
    i.uniform4uiv(this.addr, e), xt(t, e);
  }
}
function h_(i, e, t) {
  const n = this.cache, s = t.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s);
  let r;
  this.type === i.SAMPLER_2D_SHADOW ? (wl.compareFunction = iu, r = wl) : r = mu, t.setTexture2D(e || r, s);
}
function u_(i, e, t) {
  const n = this.cache, s = t.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), t.setTexture3D(e || _u, s);
}
function d_(i, e, t) {
  const n = this.cache, s = t.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), t.setTextureCube(e || vu, s);
}
function f_(i, e, t) {
  const n = this.cache, s = t.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), t.setTexture2DArray(e || gu, s);
}
function p_(i) {
  switch (i) {
    case 5126:
      return jg;
    case 35664:
      return Kg;
    case 35665:
      return Zg;
    case 35666:
      return Jg;
    case 35674:
      return Qg;
    case 35675:
      return e_;
    case 35676:
      return t_;
    case 5124:
    case 35670:
      return n_;
    case 35667:
    case 35671:
      return i_;
    case 35668:
    case 35672:
      return s_;
    case 35669:
    case 35673:
      return r_;
    case 5125:
      return o_;
    case 36294:
      return a_;
    case 36295:
      return c_;
    case 36296:
      return l_;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return h_;
    case 35679:
    case 36299:
    case 36307:
      return u_;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return d_;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return f_;
  }
}
function m_(i, e) {
  i.uniform1fv(this.addr, e);
}
function g_(i, e) {
  const t = ls(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function __(i, e) {
  const t = ls(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function v_(i, e) {
  const t = ls(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function x_(i, e) {
  const t = ls(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function y_(i, e) {
  const t = ls(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function M_(i, e) {
  const t = ls(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function S_(i, e) {
  i.uniform1iv(this.addr, e);
}
function E_(i, e) {
  i.uniform2iv(this.addr, e);
}
function T_(i, e) {
  i.uniform3iv(this.addr, e);
}
function b_(i, e) {
  i.uniform4iv(this.addr, e);
}
function A_(i, e) {
  i.uniform1uiv(this.addr, e);
}
function w_(i, e) {
  i.uniform2uiv(this.addr, e);
}
function R_(i, e) {
  i.uniform3uiv(this.addr, e);
}
function C_(i, e) {
  i.uniform4uiv(this.addr, e);
}
function P_(i, e, t) {
  const n = this.cache, s = e.length, r = ro(t, s);
  vt(n, r) || (i.uniform1iv(this.addr, r), xt(n, r));
  for (let o = 0; o !== s; ++o)
    t.setTexture2D(e[o] || mu, r[o]);
}
function L_(i, e, t) {
  const n = this.cache, s = e.length, r = ro(t, s);
  vt(n, r) || (i.uniform1iv(this.addr, r), xt(n, r));
  for (let o = 0; o !== s; ++o)
    t.setTexture3D(e[o] || _u, r[o]);
}
function I_(i, e, t) {
  const n = this.cache, s = e.length, r = ro(t, s);
  vt(n, r) || (i.uniform1iv(this.addr, r), xt(n, r));
  for (let o = 0; o !== s; ++o)
    t.setTextureCube(e[o] || vu, r[o]);
}
function D_(i, e, t) {
  const n = this.cache, s = e.length, r = ro(t, s);
  vt(n, r) || (i.uniform1iv(this.addr, r), xt(n, r));
  for (let o = 0; o !== s; ++o)
    t.setTexture2DArray(e[o] || gu, r[o]);
}
function N_(i) {
  switch (i) {
    case 5126:
      return m_;
    case 35664:
      return g_;
    case 35665:
      return __;
    case 35666:
      return v_;
    case 35674:
      return x_;
    case 35675:
      return y_;
    case 35676:
      return M_;
    case 5124:
    case 35670:
      return S_;
    case 35667:
    case 35671:
      return E_;
    case 35668:
    case 35672:
      return T_;
    case 35669:
    case 35673:
      return b_;
    case 5125:
      return A_;
    case 36294:
      return w_;
    case 36295:
      return R_;
    case 36296:
      return C_;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return P_;
    case 35679:
    case 36299:
    case 36307:
      return L_;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return I_;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return D_;
  }
}
class U_ {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = p_(t.type);
  }
}
class O_ {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = N_(t.type);
  }
}
class F_ {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const s = this.seq;
    for (let r = 0, o = s.length; r !== o; ++r) {
      const a = s[r];
      a.setValue(e, t[a.id], n);
    }
  }
}
const ko = /(\w+)(\])?(\[|\.)?/g;
function Dl(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function B_(i, e, t) {
  const n = i.name, s = n.length;
  for (ko.lastIndex = 0; ; ) {
    const r = ko.exec(n), o = ko.lastIndex;
    let a = r[1];
    const c = r[2] === "]", l = r[3];
    if (c && (a = a | 0), l === void 0 || l === "[" && o + 2 === s) {
      Dl(t, l === void 0 ? new U_(a, i, e) : new O_(a, i, e));
      break;
    } else {
      let u = t.map[a];
      u === void 0 && (u = new F_(a), Dl(t, u)), t = u;
    }
  }
}
class Wr {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let s = 0; s < n; ++s) {
      const r = e.getActiveUniform(t, s), o = e.getUniformLocation(t, r.name);
      B_(r, o, this);
    }
  }
  setValue(e, t, n, s) {
    const r = this.map[t];
    r !== void 0 && r.setValue(e, n, s);
  }
  setOptional(e, t, n) {
    const s = t[n];
    s !== void 0 && this.setValue(e, n, s);
  }
  static upload(e, t, n, s) {
    for (let r = 0, o = t.length; r !== o; ++r) {
      const a = t[r], c = n[a.id];
      c.needsUpdate !== !1 && a.setValue(e, c.value, s);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let s = 0, r = e.length; s !== r; ++s) {
      const o = e[s];
      o.id in t && n.push(o);
    }
    return n;
  }
}
function Nl(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const z_ = 37297;
let k_ = 0;
function H_(i, e) {
  const t = i.split(`
`), n = [], s = Math.max(e - 6, 0), r = Math.min(e + 6, t.length);
  for (let o = s; o < r; o++) {
    const a = o + 1;
    n.push(`${a === e ? ">" : " "} ${a}: ${t[o]}`);
  }
  return n.join(`
`);
}
function V_(i) {
  const e = We.getPrimaries(We.workingColorSpace), t = We.getPrimaries(i);
  let n;
  switch (e === t ? n = "" : e === Kr && t === jr ? n = "LinearDisplayP3ToLinearSRGB" : e === jr && t === Kr && (n = "LinearSRGBToLinearDisplayP3"), i) {
    case Et:
    case io:
      return [n, "LinearTransferOETF"];
    case Rt:
    case hc:
      return [n, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", i), [n, "LinearTransferOETF"];
  }
}
function Ul(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), s = i.getShaderInfoLog(e).trim();
  if (n && s === "") return "";
  const r = /ERROR: 0:(\d+)/.exec(s);
  if (r) {
    const o = parseInt(r[1]);
    return t.toUpperCase() + `

` + s + `

` + H_(i.getShaderSource(e), o);
  } else
    return s;
}
function G_(i, e) {
  const t = V_(e);
  return `vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`;
}
function W_(i, e) {
  let t;
  switch (e) {
    case Vd:
      t = "Linear";
      break;
    case Gd:
      t = "Reinhard";
      break;
    case Wd:
      t = "Cineon";
      break;
    case Xd:
      t = "ACESFilmic";
      break;
    case qd:
      t = "AgX";
      break;
    case Yd:
      t = "Neutral";
      break;
    case $d:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const yr = /* @__PURE__ */ new w();
function X_() {
  We.getLuminanceCoefficients(yr);
  const i = yr.x.toFixed(4), e = yr.y.toFixed(4), t = yr.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function $_(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Cs).join(`
`);
}
function q_(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function Y_(i, e) {
  const t = {}, n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
  for (let s = 0; s < n; s++) {
    const r = i.getActiveAttrib(e, s), o = r.name;
    let a = 1;
    r.type === i.FLOAT_MAT2 && (a = 2), r.type === i.FLOAT_MAT3 && (a = 3), r.type === i.FLOAT_MAT4 && (a = 4), t[o] = {
      type: r.type,
      location: i.getAttribLocation(e, o),
      locationSize: a
    };
  }
  return t;
}
function Cs(i) {
  return i !== "";
}
function Ol(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Fl(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const j_ = /^[ \t]*#include +<([\w\d./]+)>/gm;
function ka(i) {
  return i.replace(j_, Z_);
}
const K_ = /* @__PURE__ */ new Map();
function Z_(i, e) {
  let t = Ie[e];
  if (t === void 0) {
    const n = K_.get(e);
    if (n !== void 0)
      t = Ie[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return ka(t);
}
const J_ = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Bl(i) {
  return i.replace(J_, Q_);
}
function Q_(i, e, t, n) {
  let s = "";
  for (let r = parseInt(e); r < parseInt(t); r++)
    s += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
  return s;
}
function zl(i) {
  let e = `precision ${i.precision} float;
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
  return i.precision === "highp" ? e += `
#define HIGH_PRECISION` : i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function e0(i) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === Hh ? e = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === Vh ? e = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === En && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function t0(i) {
  let e = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case Ji:
      case Qi:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case no:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function n0(i) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case Qi:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function i0(i) {
  let e = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case Gh:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case kd:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case Hd:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function s0(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 7 * 16)), texelHeight: n, maxMip: t };
}
function r0(i, e, t, n) {
  const s = i.getContext(), r = t.defines;
  let o = t.vertexShader, a = t.fragmentShader;
  const c = e0(t), l = t0(t), h = n0(t), u = i0(t), d = s0(t), f = $_(t), g = q_(r), _ = s.createProgram();
  let p, m, T = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (p = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g
  ].filter(Cs).join(`
`), p.length > 0 && (p += `
`), m = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g
  ].filter(Cs).join(`
`), m.length > 0 && (m += `
`)) : (p = [
    zl(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + h : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + c : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
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
  ].filter(Cs).join(`
`), m = [
    zl(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + l : "",
    t.envMap ? "#define " + h : "",
    t.envMap ? "#define " + u : "",
    d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "",
    d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "",
    d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor || t.batchingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + c : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== $n ? "#define TONE_MAPPING" : "",
    t.toneMapping !== $n ? Ie.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== $n ? W_("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Ie.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    G_("linearToOutputTexel", t.outputColorSpace),
    X_(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Cs).join(`
`)), o = ka(o), o = Ol(o, t), o = Fl(o, t), a = ka(a), a = Ol(a, t), a = Fl(a, t), o = Bl(o), a = Bl(a), t.isRawShaderMaterial !== !0 && (T = `#version 300 es
`, p = [
    f,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + p, m = [
    "#define varying in",
    t.glslVersion === tl ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === tl ? "" : "#define gl_FragColor pc_fragColor",
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
  const y = T + p + o, S = T + m + a, D = Nl(s, s.VERTEX_SHADER, y), R = Nl(s, s.FRAGMENT_SHADER, S);
  s.attachShader(_, D), s.attachShader(_, R), t.index0AttributeName !== void 0 ? s.bindAttribLocation(_, 0, t.index0AttributeName) : t.morphTargets === !0 && s.bindAttribLocation(_, 0, "position"), s.linkProgram(_);
  function A(E) {
    if (i.debug.checkShaderErrors) {
      const z = s.getProgramInfoLog(_).trim(), B = s.getShaderInfoLog(D).trim(), H = s.getShaderInfoLog(R).trim();
      let j = !0, k = !0;
      if (s.getProgramParameter(_, s.LINK_STATUS) === !1)
        if (j = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(s, _, D, R);
        else {
          const Q = Ul(s, D, "vertex"), G = Ul(s, R, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(_, s.VALIDATE_STATUS) + `

Material Name: ` + E.name + `
Material Type: ` + E.type + `

Program Info Log: ` + z + `
` + Q + `
` + G
          );
        }
      else z !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", z) : (B === "" || H === "") && (k = !1);
      k && (E.diagnostics = {
        runnable: j,
        programLog: z,
        vertexShader: {
          log: B,
          prefix: p
        },
        fragmentShader: {
          log: H,
          prefix: m
        }
      });
    }
    s.deleteShader(D), s.deleteShader(R), N = new Wr(s, _), Y = Y_(s, _);
  }
  let N;
  this.getUniforms = function() {
    return N === void 0 && A(this), N;
  };
  let Y;
  this.getAttributes = function() {
    return Y === void 0 && A(this), Y;
  };
  let v = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return v === !1 && (v = s.getProgramParameter(_, z_)), v;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), s.deleteProgram(_), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = k_++, this.cacheKey = e, this.usedTimes = 1, this.program = _, this.vertexShader = D, this.fragmentShader = R, this;
}
let o0 = 0;
class a0 {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, n = e.fragmentShader, s = this._getShaderStage(t), r = this._getShaderStage(n), o = this._getShaderCacheForMaterial(e);
    return o.has(s) === !1 && (o.add(s), s.usedTimes++), o.has(r) === !1 && (o.add(r), r.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new c0(e), t.set(e, n)), n;
  }
}
class c0 {
  constructor(e) {
    this.id = o0++, this.code = e, this.usedTimes = 0;
  }
}
function l0(i, e, t, n, s, r, o) {
  const a = new dc(), c = new a0(), l = /* @__PURE__ */ new Set(), h = [], u = s.logarithmicDepthBuffer, d = s.reverseDepthBuffer, f = s.vertexTextures;
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
  function m(v, E, z, B, H) {
    const j = B.fog, k = H.geometry, Q = v.isMeshStandardMaterial ? B.environment : null, G = (v.isMeshStandardMaterial ? t : e).get(v.envMap || Q), ce = G && G.mapping === no ? G.image.height : null, le = _[v.type];
    v.precision !== null && (g = s.getMaxPrecision(v.precision), g !== v.precision && console.warn("THREE.WebGLProgram.getParameters:", v.precision, "not supported, using", g, "instead."));
    const _e = k.morphAttributes.position || k.morphAttributes.normal || k.morphAttributes.color, Xe = _e !== void 0 ? _e.length : 0;
    let Ke = 0;
    k.morphAttributes.position !== void 0 && (Ke = 1), k.morphAttributes.normal !== void 0 && (Ke = 2), k.morphAttributes.color !== void 0 && (Ke = 3);
    let W, Z, me, he;
    if (le) {
      const Nt = an[le];
      W = Nt.vertexShader, Z = Nt.fragmentShader;
    } else
      W = v.vertexShader, Z = v.fragmentShader, c.update(v), me = c.getVertexShaderID(v), he = c.getFragmentShaderID(v);
    const Pe = i.getRenderTarget(), Ee = H.isInstancedMesh === !0, ze = H.isBatchedMesh === !0, et = !!v.map, ke = !!v.matcap, C = !!G, Ft = !!v.aoMap, Fe = !!v.lightMap, Ve = !!v.bumpMap, be = !!v.normalMap, it = !!v.displacementMap, Re = !!v.emissiveMap, b = !!v.metalnessMap, x = !!v.roughnessMap, U = v.anisotropy > 0, $ = v.clearcoat > 0, K = v.dispersion > 0, X = v.iridescence > 0, ve = v.sheen > 0, ie = v.transmission > 0, ue = U && !!v.anisotropyMap, Ge = $ && !!v.clearcoatMap, J = $ && !!v.clearcoatNormalMap, de = $ && !!v.clearcoatRoughnessMap, Ae = X && !!v.iridescenceMap, we = X && !!v.iridescenceThicknessMap, fe = ve && !!v.sheenColorMap, Be = ve && !!v.sheenRoughnessMap, Le = !!v.specularMap, nt = !!v.specularColorMap, P = !!v.specularIntensityMap, oe = ie && !!v.transmissionMap, V = ie && !!v.thicknessMap, q = !!v.gradientMap, se = !!v.alphaMap, ae = v.alphaTest > 0, He = !!v.alphaHash, ft = !!v.extensions;
    let Dt = $n;
    v.toneMapped && (Pe === null || Pe.isXRRenderTarget === !0) && (Dt = i.toneMapping);
    const $e = {
      shaderID: le,
      shaderType: v.type,
      shaderName: v.name,
      vertexShader: W,
      fragmentShader: Z,
      defines: v.defines,
      customVertexShaderID: me,
      customFragmentShaderID: he,
      isRawShaderMaterial: v.isRawShaderMaterial === !0,
      glslVersion: v.glslVersion,
      precision: g,
      batching: ze,
      batchingColor: ze && H._colorsTexture !== null,
      instancing: Ee,
      instancingColor: Ee && H.instanceColor !== null,
      instancingMorph: Ee && H.morphTexture !== null,
      supportsVertexTextures: f,
      outputColorSpace: Pe === null ? i.outputColorSpace : Pe.isXRRenderTarget === !0 ? Pe.texture.colorSpace : Et,
      alphaToCoverage: !!v.alphaToCoverage,
      map: et,
      matcap: ke,
      envMap: C,
      envMapMode: C && G.mapping,
      envMapCubeUVHeight: ce,
      aoMap: Ft,
      lightMap: Fe,
      bumpMap: Ve,
      normalMap: be,
      displacementMap: f && it,
      emissiveMap: Re,
      normalMapObjectSpace: be && v.normalMapType === ef,
      normalMapTangentSpace: be && v.normalMapType === nu,
      metalnessMap: b,
      roughnessMap: x,
      anisotropy: U,
      anisotropyMap: ue,
      clearcoat: $,
      clearcoatMap: Ge,
      clearcoatNormalMap: J,
      clearcoatRoughnessMap: de,
      dispersion: K,
      iridescence: X,
      iridescenceMap: Ae,
      iridescenceThicknessMap: we,
      sheen: ve,
      sheenColorMap: fe,
      sheenRoughnessMap: Be,
      specularMap: Le,
      specularColorMap: nt,
      specularIntensityMap: P,
      transmission: ie,
      transmissionMap: oe,
      thicknessMap: V,
      gradientMap: q,
      opaque: v.transparent === !1 && v.blending === Wi && v.alphaToCoverage === !1,
      alphaMap: se,
      alphaTest: ae,
      alphaHash: He,
      combine: v.combine,
      //
      mapUv: et && p(v.map.channel),
      aoMapUv: Ft && p(v.aoMap.channel),
      lightMapUv: Fe && p(v.lightMap.channel),
      bumpMapUv: Ve && p(v.bumpMap.channel),
      normalMapUv: be && p(v.normalMap.channel),
      displacementMapUv: it && p(v.displacementMap.channel),
      emissiveMapUv: Re && p(v.emissiveMap.channel),
      metalnessMapUv: b && p(v.metalnessMap.channel),
      roughnessMapUv: x && p(v.roughnessMap.channel),
      anisotropyMapUv: ue && p(v.anisotropyMap.channel),
      clearcoatMapUv: Ge && p(v.clearcoatMap.channel),
      clearcoatNormalMapUv: J && p(v.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: de && p(v.clearcoatRoughnessMap.channel),
      iridescenceMapUv: Ae && p(v.iridescenceMap.channel),
      iridescenceThicknessMapUv: we && p(v.iridescenceThicknessMap.channel),
      sheenColorMapUv: fe && p(v.sheenColorMap.channel),
      sheenRoughnessMapUv: Be && p(v.sheenRoughnessMap.channel),
      specularMapUv: Le && p(v.specularMap.channel),
      specularColorMapUv: nt && p(v.specularColorMap.channel),
      specularIntensityMapUv: P && p(v.specularIntensityMap.channel),
      transmissionMapUv: oe && p(v.transmissionMap.channel),
      thicknessMapUv: V && p(v.thicknessMap.channel),
      alphaMapUv: se && p(v.alphaMap.channel),
      //
      vertexTangents: !!k.attributes.tangent && (be || U),
      vertexColors: v.vertexColors,
      vertexAlphas: v.vertexColors === !0 && !!k.attributes.color && k.attributes.color.itemSize === 4,
      pointsUvs: H.isPoints === !0 && !!k.attributes.uv && (et || se),
      fog: !!j,
      useFog: v.fog === !0,
      fogExp2: !!j && j.isFogExp2,
      flatShading: v.flatShading === !0,
      sizeAttenuation: v.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reverseDepthBuffer: d,
      skinning: H.isSkinnedMesh === !0,
      morphTargets: k.morphAttributes.position !== void 0,
      morphNormals: k.morphAttributes.normal !== void 0,
      morphColors: k.morphAttributes.color !== void 0,
      morphTargetsCount: Xe,
      morphTextureStride: Ke,
      numDirLights: E.directional.length,
      numPointLights: E.point.length,
      numSpotLights: E.spot.length,
      numSpotLightMaps: E.spotLightMap.length,
      numRectAreaLights: E.rectArea.length,
      numHemiLights: E.hemi.length,
      numDirLightShadows: E.directionalShadowMap.length,
      numPointLightShadows: E.pointShadowMap.length,
      numSpotLightShadows: E.spotShadowMap.length,
      numSpotLightShadowsWithMaps: E.numSpotLightShadowsWithMaps,
      numLightProbes: E.numLightProbes,
      numClippingPlanes: o.numPlanes,
      numClipIntersection: o.numIntersection,
      dithering: v.dithering,
      shadowMapEnabled: i.shadowMap.enabled && z.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: Dt,
      decodeVideoTexture: et && v.map.isVideoTexture === !0 && We.getTransfer(v.map.colorSpace) === rt,
      premultipliedAlpha: v.premultipliedAlpha,
      doubleSided: v.side === tn,
      flipSided: v.side === Ot,
      useDepthPacking: v.depthPacking >= 0,
      depthPacking: v.depthPacking || 0,
      index0AttributeName: v.index0AttributeName,
      extensionClipCullDistance: ft && v.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (ft && v.extensions.multiDraw === !0 || ze) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: v.customProgramCacheKey()
    };
    return $e.vertexUv1s = l.has(1), $e.vertexUv2s = l.has(2), $e.vertexUv3s = l.has(3), l.clear(), $e;
  }
  function T(v) {
    const E = [];
    if (v.shaderID ? E.push(v.shaderID) : (E.push(v.customVertexShaderID), E.push(v.customFragmentShaderID)), v.defines !== void 0)
      for (const z in v.defines)
        E.push(z), E.push(v.defines[z]);
    return v.isRawShaderMaterial === !1 && (y(E, v), S(E, v), E.push(i.outputColorSpace)), E.push(v.customProgramCacheKey), E.join();
  }
  function y(v, E) {
    v.push(E.precision), v.push(E.outputColorSpace), v.push(E.envMapMode), v.push(E.envMapCubeUVHeight), v.push(E.mapUv), v.push(E.alphaMapUv), v.push(E.lightMapUv), v.push(E.aoMapUv), v.push(E.bumpMapUv), v.push(E.normalMapUv), v.push(E.displacementMapUv), v.push(E.emissiveMapUv), v.push(E.metalnessMapUv), v.push(E.roughnessMapUv), v.push(E.anisotropyMapUv), v.push(E.clearcoatMapUv), v.push(E.clearcoatNormalMapUv), v.push(E.clearcoatRoughnessMapUv), v.push(E.iridescenceMapUv), v.push(E.iridescenceThicknessMapUv), v.push(E.sheenColorMapUv), v.push(E.sheenRoughnessMapUv), v.push(E.specularMapUv), v.push(E.specularColorMapUv), v.push(E.specularIntensityMapUv), v.push(E.transmissionMapUv), v.push(E.thicknessMapUv), v.push(E.combine), v.push(E.fogExp2), v.push(E.sizeAttenuation), v.push(E.morphTargetsCount), v.push(E.morphAttributeCount), v.push(E.numDirLights), v.push(E.numPointLights), v.push(E.numSpotLights), v.push(E.numSpotLightMaps), v.push(E.numHemiLights), v.push(E.numRectAreaLights), v.push(E.numDirLightShadows), v.push(E.numPointLightShadows), v.push(E.numSpotLightShadows), v.push(E.numSpotLightShadowsWithMaps), v.push(E.numLightProbes), v.push(E.shadowMapType), v.push(E.toneMapping), v.push(E.numClippingPlanes), v.push(E.numClipIntersection), v.push(E.depthPacking);
  }
  function S(v, E) {
    a.disableAll(), E.supportsVertexTextures && a.enable(0), E.instancing && a.enable(1), E.instancingColor && a.enable(2), E.instancingMorph && a.enable(3), E.matcap && a.enable(4), E.envMap && a.enable(5), E.normalMapObjectSpace && a.enable(6), E.normalMapTangentSpace && a.enable(7), E.clearcoat && a.enable(8), E.iridescence && a.enable(9), E.alphaTest && a.enable(10), E.vertexColors && a.enable(11), E.vertexAlphas && a.enable(12), E.vertexUv1s && a.enable(13), E.vertexUv2s && a.enable(14), E.vertexUv3s && a.enable(15), E.vertexTangents && a.enable(16), E.anisotropy && a.enable(17), E.alphaHash && a.enable(18), E.batching && a.enable(19), E.dispersion && a.enable(20), E.batchingColor && a.enable(21), v.push(a.mask), a.disableAll(), E.fog && a.enable(0), E.useFog && a.enable(1), E.flatShading && a.enable(2), E.logarithmicDepthBuffer && a.enable(3), E.reverseDepthBuffer && a.enable(4), E.skinning && a.enable(5), E.morphTargets && a.enable(6), E.morphNormals && a.enable(7), E.morphColors && a.enable(8), E.premultipliedAlpha && a.enable(9), E.shadowMapEnabled && a.enable(10), E.doubleSided && a.enable(11), E.flipSided && a.enable(12), E.useDepthPacking && a.enable(13), E.dithering && a.enable(14), E.transmission && a.enable(15), E.sheen && a.enable(16), E.opaque && a.enable(17), E.pointsUvs && a.enable(18), E.decodeVideoTexture && a.enable(19), E.alphaToCoverage && a.enable(20), v.push(a.mask);
  }
  function D(v) {
    const E = _[v.type];
    let z;
    if (E) {
      const B = an[E];
      z = $f.clone(B.uniforms);
    } else
      z = v.uniforms;
    return z;
  }
  function R(v, E) {
    let z;
    for (let B = 0, H = h.length; B < H; B++) {
      const j = h[B];
      if (j.cacheKey === E) {
        z = j, ++z.usedTimes;
        break;
      }
    }
    return z === void 0 && (z = new r0(i, E, v, r), h.push(z)), z;
  }
  function A(v) {
    if (--v.usedTimes === 0) {
      const E = h.indexOf(v);
      h[E] = h[h.length - 1], h.pop(), v.destroy();
    }
  }
  function N(v) {
    c.remove(v);
  }
  function Y() {
    c.dispose();
  }
  return {
    getParameters: m,
    getProgramCacheKey: T,
    getUniforms: D,
    acquireProgram: R,
    releaseProgram: A,
    releaseShaderCache: N,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: h,
    dispose: Y
  };
}
function h0() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(o) {
    return i.has(o);
  }
  function t(o) {
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
    has: e,
    get: t,
    remove: n,
    update: s,
    dispose: r
  };
}
function u0(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function kl(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function Hl() {
  const i = [];
  let e = 0;
  const t = [], n = [], s = [];
  function r() {
    e = 0, t.length = 0, n.length = 0, s.length = 0;
  }
  function o(u, d, f, g, _, p) {
    let m = i[e];
    return m === void 0 ? (m = {
      id: u.id,
      object: u,
      geometry: d,
      material: f,
      groupOrder: g,
      renderOrder: u.renderOrder,
      z: _,
      group: p
    }, i[e] = m) : (m.id = u.id, m.object = u, m.geometry = d, m.material = f, m.groupOrder = g, m.renderOrder = u.renderOrder, m.z = _, m.group = p), e++, m;
  }
  function a(u, d, f, g, _, p) {
    const m = o(u, d, f, g, _, p);
    f.transmission > 0 ? n.push(m) : f.transparent === !0 ? s.push(m) : t.push(m);
  }
  function c(u, d, f, g, _, p) {
    const m = o(u, d, f, g, _, p);
    f.transmission > 0 ? n.unshift(m) : f.transparent === !0 ? s.unshift(m) : t.unshift(m);
  }
  function l(u, d) {
    t.length > 1 && t.sort(u || u0), n.length > 1 && n.sort(d || kl), s.length > 1 && s.sort(d || kl);
  }
  function h() {
    for (let u = e, d = i.length; u < d; u++) {
      const f = i[u];
      if (f.id === null) break;
      f.id = null, f.object = null, f.geometry = null, f.material = null, f.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: s,
    init: r,
    push: a,
    unshift: c,
    finish: h,
    sort: l
  };
}
function d0() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, s) {
    const r = i.get(n);
    let o;
    return r === void 0 ? (o = new Hl(), i.set(n, [o])) : s >= r.length ? (o = new Hl(), r.push(o)) : o = r[s], o;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function f0() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new w(),
            color: new Me()
          };
          break;
        case "SpotLight":
          t = {
            position: new w(),
            direction: new w(),
            color: new Me(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new w(),
            color: new Me(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new w(),
            skyColor: new Me(),
            groundColor: new Me()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Me(),
            position: new w(),
            halfWidth: new w(),
            halfHeight: new w()
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
function p0() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new te()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new te()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new te(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let m0 = 0;
function g0(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function _0(i) {
  const e = new f0(), t = p0(), n = {
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
  const s = new w(), r = new Ce(), o = new Ce();
  function a(l) {
    let h = 0, u = 0, d = 0;
    for (let Y = 0; Y < 9; Y++) n.probe[Y].set(0, 0, 0);
    let f = 0, g = 0, _ = 0, p = 0, m = 0, T = 0, y = 0, S = 0, D = 0, R = 0, A = 0;
    l.sort(g0);
    for (let Y = 0, v = l.length; Y < v; Y++) {
      const E = l[Y], z = E.color, B = E.intensity, H = E.distance, j = E.shadow && E.shadow.map ? E.shadow.map.texture : null;
      if (E.isAmbientLight)
        h += z.r * B, u += z.g * B, d += z.b * B;
      else if (E.isLightProbe) {
        for (let k = 0; k < 9; k++)
          n.probe[k].addScaledVector(E.sh.coefficients[k], B);
        A++;
      } else if (E.isDirectionalLight) {
        const k = e.get(E);
        if (k.color.copy(E.color).multiplyScalar(E.intensity), E.castShadow) {
          const Q = E.shadow, G = t.get(E);
          G.shadowIntensity = Q.intensity, G.shadowBias = Q.bias, G.shadowNormalBias = Q.normalBias, G.shadowRadius = Q.radius, G.shadowMapSize = Q.mapSize, n.directionalShadow[f] = G, n.directionalShadowMap[f] = j, n.directionalShadowMatrix[f] = E.shadow.matrix, T++;
        }
        n.directional[f] = k, f++;
      } else if (E.isSpotLight) {
        const k = e.get(E);
        k.position.setFromMatrixPosition(E.matrixWorld), k.color.copy(z).multiplyScalar(B), k.distance = H, k.coneCos = Math.cos(E.angle), k.penumbraCos = Math.cos(E.angle * (1 - E.penumbra)), k.decay = E.decay, n.spot[_] = k;
        const Q = E.shadow;
        if (E.map && (n.spotLightMap[D] = E.map, D++, Q.updateMatrices(E), E.castShadow && R++), n.spotLightMatrix[_] = Q.matrix, E.castShadow) {
          const G = t.get(E);
          G.shadowIntensity = Q.intensity, G.shadowBias = Q.bias, G.shadowNormalBias = Q.normalBias, G.shadowRadius = Q.radius, G.shadowMapSize = Q.mapSize, n.spotShadow[_] = G, n.spotShadowMap[_] = j, S++;
        }
        _++;
      } else if (E.isRectAreaLight) {
        const k = e.get(E);
        k.color.copy(z).multiplyScalar(B), k.halfWidth.set(E.width * 0.5, 0, 0), k.halfHeight.set(0, E.height * 0.5, 0), n.rectArea[p] = k, p++;
      } else if (E.isPointLight) {
        const k = e.get(E);
        if (k.color.copy(E.color).multiplyScalar(E.intensity), k.distance = E.distance, k.decay = E.decay, E.castShadow) {
          const Q = E.shadow, G = t.get(E);
          G.shadowIntensity = Q.intensity, G.shadowBias = Q.bias, G.shadowNormalBias = Q.normalBias, G.shadowRadius = Q.radius, G.shadowMapSize = Q.mapSize, G.shadowCameraNear = Q.camera.near, G.shadowCameraFar = Q.camera.far, n.pointShadow[g] = G, n.pointShadowMap[g] = j, n.pointShadowMatrix[g] = E.shadow.matrix, y++;
        }
        n.point[g] = k, g++;
      } else if (E.isHemisphereLight) {
        const k = e.get(E);
        k.skyColor.copy(E.color).multiplyScalar(B), k.groundColor.copy(E.groundColor).multiplyScalar(B), n.hemi[m] = k, m++;
      }
    }
    p > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = ne.LTC_FLOAT_1, n.rectAreaLTC2 = ne.LTC_FLOAT_2) : (n.rectAreaLTC1 = ne.LTC_HALF_1, n.rectAreaLTC2 = ne.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = u, n.ambient[2] = d;
    const N = n.hash;
    (N.directionalLength !== f || N.pointLength !== g || N.spotLength !== _ || N.rectAreaLength !== p || N.hemiLength !== m || N.numDirectionalShadows !== T || N.numPointShadows !== y || N.numSpotShadows !== S || N.numSpotMaps !== D || N.numLightProbes !== A) && (n.directional.length = f, n.spot.length = _, n.rectArea.length = p, n.point.length = g, n.hemi.length = m, n.directionalShadow.length = T, n.directionalShadowMap.length = T, n.pointShadow.length = y, n.pointShadowMap.length = y, n.spotShadow.length = S, n.spotShadowMap.length = S, n.directionalShadowMatrix.length = T, n.pointShadowMatrix.length = y, n.spotLightMatrix.length = S + D - R, n.spotLightMap.length = D, n.numSpotLightShadowsWithMaps = R, n.numLightProbes = A, N.directionalLength = f, N.pointLength = g, N.spotLength = _, N.rectAreaLength = p, N.hemiLength = m, N.numDirectionalShadows = T, N.numPointShadows = y, N.numSpotShadows = S, N.numSpotMaps = D, N.numLightProbes = A, n.version = m0++);
  }
  function c(l, h) {
    let u = 0, d = 0, f = 0, g = 0, _ = 0;
    const p = h.matrixWorldInverse;
    for (let m = 0, T = l.length; m < T; m++) {
      const y = l[m];
      if (y.isDirectionalLight) {
        const S = n.directional[u];
        S.direction.setFromMatrixPosition(y.matrixWorld), s.setFromMatrixPosition(y.target.matrixWorld), S.direction.sub(s), S.direction.transformDirection(p), u++;
      } else if (y.isSpotLight) {
        const S = n.spot[f];
        S.position.setFromMatrixPosition(y.matrixWorld), S.position.applyMatrix4(p), S.direction.setFromMatrixPosition(y.matrixWorld), s.setFromMatrixPosition(y.target.matrixWorld), S.direction.sub(s), S.direction.transformDirection(p), f++;
      } else if (y.isRectAreaLight) {
        const S = n.rectArea[g];
        S.position.setFromMatrixPosition(y.matrixWorld), S.position.applyMatrix4(p), o.identity(), r.copy(y.matrixWorld), r.premultiply(p), o.extractRotation(r), S.halfWidth.set(y.width * 0.5, 0, 0), S.halfHeight.set(0, y.height * 0.5, 0), S.halfWidth.applyMatrix4(o), S.halfHeight.applyMatrix4(o), g++;
      } else if (y.isPointLight) {
        const S = n.point[d];
        S.position.setFromMatrixPosition(y.matrixWorld), S.position.applyMatrix4(p), d++;
      } else if (y.isHemisphereLight) {
        const S = n.hemi[_];
        S.direction.setFromMatrixPosition(y.matrixWorld), S.direction.transformDirection(p), _++;
      }
    }
  }
  return {
    setup: a,
    setupView: c,
    state: n
  };
}
function Vl(i) {
  const e = new _0(i), t = [], n = [];
  function s(h) {
    l.camera = h, t.length = 0, n.length = 0;
  }
  function r(h) {
    t.push(h);
  }
  function o(h) {
    n.push(h);
  }
  function a() {
    e.setup(t);
  }
  function c(h) {
    e.setupView(t, h);
  }
  const l = {
    lightsArray: t,
    shadowsArray: n,
    camera: null,
    lights: e,
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
function v0(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(s, r = 0) {
    const o = e.get(s);
    let a;
    return o === void 0 ? (a = new Vl(i), e.set(s, [a])) : r >= o.length ? (a = new Vl(i), o.push(a)) : a = o[r], a;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
class x0 extends rn {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Jd, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class y0 extends rn {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const M0 = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, S0 = `uniform sampler2D shadow_pass;
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
function E0(i, e, t) {
  let n = new fc();
  const s = new te(), r = new te(), o = new qe(), a = new x0({ depthPacking: Qd }), c = new y0(), l = {}, h = t.maxTextureSize, u = { [wn]: Ot, [Ot]: wn, [tn]: tn }, d = new qn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new te() },
      radius: { value: 4 }
    },
    vertexShader: M0,
    fragmentShader: S0
  }), f = d.clone();
  f.defines.HORIZONTAL_PASS = 1;
  const g = new Gt();
  g.setAttribute(
    "position",
    new Lt(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const _ = new St(g, d), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = Hh;
  let m = this.type;
  this.render = function(R, A, N) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || R.length === 0) return;
    const Y = i.getRenderTarget(), v = i.getActiveCubeFace(), E = i.getActiveMipmapLevel(), z = i.state;
    z.setBlending(Xn), z.buffers.color.setClear(1, 1, 1, 1), z.buffers.depth.setTest(!0), z.setScissorTest(!1);
    const B = m !== En && this.type === En, H = m === En && this.type !== En;
    for (let j = 0, k = R.length; j < k; j++) {
      const Q = R[j], G = Q.shadow;
      if (G === void 0) {
        console.warn("THREE.WebGLShadowMap:", Q, "has no shadow.");
        continue;
      }
      if (G.autoUpdate === !1 && G.needsUpdate === !1) continue;
      s.copy(G.mapSize);
      const ce = G.getFrameExtents();
      if (s.multiply(ce), r.copy(G.mapSize), (s.x > h || s.y > h) && (s.x > h && (r.x = Math.floor(h / ce.x), s.x = r.x * ce.x, G.mapSize.x = r.x), s.y > h && (r.y = Math.floor(h / ce.y), s.y = r.y * ce.y, G.mapSize.y = r.y)), G.map === null || B === !0 || H === !0) {
        const _e = this.type !== En ? { minFilter: Pt, magFilter: Pt } : {};
        G.map !== null && G.map.dispose(), G.map = new pi(s.x, s.y, _e), G.map.texture.name = Q.name + ".shadowMap", G.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(G.map), i.clear();
      const le = G.getViewportCount();
      for (let _e = 0; _e < le; _e++) {
        const Xe = G.getViewport(_e);
        o.set(
          r.x * Xe.x,
          r.y * Xe.y,
          r.x * Xe.z,
          r.y * Xe.w
        ), z.viewport(o), G.updateMatrices(Q, _e), n = G.getFrustum(), S(A, N, G.camera, Q, this.type);
      }
      G.isPointLightShadow !== !0 && this.type === En && T(G, N), G.needsUpdate = !1;
    }
    m = this.type, p.needsUpdate = !1, i.setRenderTarget(Y, v, E);
  };
  function T(R, A) {
    const N = e.update(_);
    d.defines.VSM_SAMPLES !== R.blurSamples && (d.defines.VSM_SAMPLES = R.blurSamples, f.defines.VSM_SAMPLES = R.blurSamples, d.needsUpdate = !0, f.needsUpdate = !0), R.mapPass === null && (R.mapPass = new pi(s.x, s.y)), d.uniforms.shadow_pass.value = R.map.texture, d.uniforms.resolution.value = R.mapSize, d.uniforms.radius.value = R.radius, i.setRenderTarget(R.mapPass), i.clear(), i.renderBufferDirect(A, null, N, d, _, null), f.uniforms.shadow_pass.value = R.mapPass.texture, f.uniforms.resolution.value = R.mapSize, f.uniforms.radius.value = R.radius, i.setRenderTarget(R.map), i.clear(), i.renderBufferDirect(A, null, N, f, _, null);
  }
  function y(R, A, N, Y) {
    let v = null;
    const E = N.isPointLight === !0 ? R.customDistanceMaterial : R.customDepthMaterial;
    if (E !== void 0)
      v = E;
    else if (v = N.isPointLight === !0 ? c : a, i.localClippingEnabled && A.clipShadows === !0 && Array.isArray(A.clippingPlanes) && A.clippingPlanes.length !== 0 || A.displacementMap && A.displacementScale !== 0 || A.alphaMap && A.alphaTest > 0 || A.map && A.alphaTest > 0) {
      const z = v.uuid, B = A.uuid;
      let H = l[z];
      H === void 0 && (H = {}, l[z] = H);
      let j = H[B];
      j === void 0 && (j = v.clone(), H[B] = j, A.addEventListener("dispose", D)), v = j;
    }
    if (v.visible = A.visible, v.wireframe = A.wireframe, Y === En ? v.side = A.shadowSide !== null ? A.shadowSide : A.side : v.side = A.shadowSide !== null ? A.shadowSide : u[A.side], v.alphaMap = A.alphaMap, v.alphaTest = A.alphaTest, v.map = A.map, v.clipShadows = A.clipShadows, v.clippingPlanes = A.clippingPlanes, v.clipIntersection = A.clipIntersection, v.displacementMap = A.displacementMap, v.displacementScale = A.displacementScale, v.displacementBias = A.displacementBias, v.wireframeLinewidth = A.wireframeLinewidth, v.linewidth = A.linewidth, N.isPointLight === !0 && v.isMeshDistanceMaterial === !0) {
      const z = i.properties.get(v);
      z.light = N;
    }
    return v;
  }
  function S(R, A, N, Y, v) {
    if (R.visible === !1) return;
    if (R.layers.test(A.layers) && (R.isMesh || R.isLine || R.isPoints) && (R.castShadow || R.receiveShadow && v === En) && (!R.frustumCulled || n.intersectsObject(R))) {
      R.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse, R.matrixWorld);
      const B = e.update(R), H = R.material;
      if (Array.isArray(H)) {
        const j = B.groups;
        for (let k = 0, Q = j.length; k < Q; k++) {
          const G = j[k], ce = H[G.materialIndex];
          if (ce && ce.visible) {
            const le = y(R, ce, Y, v);
            R.onBeforeShadow(i, R, A, N, B, le, G), i.renderBufferDirect(N, null, B, le, R, G), R.onAfterShadow(i, R, A, N, B, le, G);
          }
        }
      } else if (H.visible) {
        const j = y(R, H, Y, v);
        R.onBeforeShadow(i, R, A, N, B, j, null), i.renderBufferDirect(N, null, B, j, R, null), R.onAfterShadow(i, R, A, N, B, j, null);
      }
    }
    const z = R.children;
    for (let B = 0, H = z.length; B < H; B++)
      S(z[B], A, N, Y, v);
  }
  function D(R) {
    R.target.removeEventListener("dispose", D);
    for (const N in l) {
      const Y = l[N], v = R.target.uuid;
      v in Y && (Y[v].dispose(), delete Y[v]);
    }
  }
}
const T0 = {
  [ia]: sa,
  [ra]: ca,
  [oa]: la,
  [Zi]: aa,
  [sa]: ia,
  [ca]: ra,
  [la]: oa,
  [aa]: Zi
};
function b0(i) {
  function e() {
    let P = !1;
    const oe = new qe();
    let V = null;
    const q = new qe(0, 0, 0, 0);
    return {
      setMask: function(se) {
        V !== se && !P && (i.colorMask(se, se, se, se), V = se);
      },
      setLocked: function(se) {
        P = se;
      },
      setClear: function(se, ae, He, ft, Dt) {
        Dt === !0 && (se *= ft, ae *= ft, He *= ft), oe.set(se, ae, He, ft), q.equals(oe) === !1 && (i.clearColor(se, ae, He, ft), q.copy(oe));
      },
      reset: function() {
        P = !1, V = null, q.set(-1, 0, 0, 0);
      }
    };
  }
  function t() {
    let P = !1, oe = !1, V = null, q = null, se = null;
    return {
      setReversed: function(ae) {
        oe = ae;
      },
      setTest: function(ae) {
        ae ? me(i.DEPTH_TEST) : he(i.DEPTH_TEST);
      },
      setMask: function(ae) {
        V !== ae && !P && (i.depthMask(ae), V = ae);
      },
      setFunc: function(ae) {
        if (oe && (ae = T0[ae]), q !== ae) {
          switch (ae) {
            case ia:
              i.depthFunc(i.NEVER);
              break;
            case sa:
              i.depthFunc(i.ALWAYS);
              break;
            case ra:
              i.depthFunc(i.LESS);
              break;
            case Zi:
              i.depthFunc(i.LEQUAL);
              break;
            case oa:
              i.depthFunc(i.EQUAL);
              break;
            case aa:
              i.depthFunc(i.GEQUAL);
              break;
            case ca:
              i.depthFunc(i.GREATER);
              break;
            case la:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          q = ae;
        }
      },
      setLocked: function(ae) {
        P = ae;
      },
      setClear: function(ae) {
        se !== ae && (i.clearDepth(ae), se = ae);
      },
      reset: function() {
        P = !1, V = null, q = null, se = null;
      }
    };
  }
  function n() {
    let P = !1, oe = null, V = null, q = null, se = null, ae = null, He = null, ft = null, Dt = null;
    return {
      setTest: function($e) {
        P || ($e ? me(i.STENCIL_TEST) : he(i.STENCIL_TEST));
      },
      setMask: function($e) {
        oe !== $e && !P && (i.stencilMask($e), oe = $e);
      },
      setFunc: function($e, Nt, mn) {
        (V !== $e || q !== Nt || se !== mn) && (i.stencilFunc($e, Nt, mn), V = $e, q = Nt, se = mn);
      },
      setOp: function($e, Nt, mn) {
        (ae !== $e || He !== Nt || ft !== mn) && (i.stencilOp($e, Nt, mn), ae = $e, He = Nt, ft = mn);
      },
      setLocked: function($e) {
        P = $e;
      },
      setClear: function($e) {
        Dt !== $e && (i.clearStencil($e), Dt = $e);
      },
      reset: function() {
        P = !1, oe = null, V = null, q = null, se = null, ae = null, He = null, ft = null, Dt = null;
      }
    };
  }
  const s = new e(), r = new t(), o = new n(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let l = {}, h = {}, u = /* @__PURE__ */ new WeakMap(), d = [], f = null, g = !1, _ = null, p = null, m = null, T = null, y = null, S = null, D = null, R = new Me(0, 0, 0), A = 0, N = !1, Y = null, v = null, E = null, z = null, B = null;
  const H = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let j = !1, k = 0;
  const Q = i.getParameter(i.VERSION);
  Q.indexOf("WebGL") !== -1 ? (k = parseFloat(/^WebGL (\d)/.exec(Q)[1]), j = k >= 1) : Q.indexOf("OpenGL ES") !== -1 && (k = parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]), j = k >= 2);
  let G = null, ce = {};
  const le = i.getParameter(i.SCISSOR_BOX), _e = i.getParameter(i.VIEWPORT), Xe = new qe().fromArray(le), Ke = new qe().fromArray(_e);
  function W(P, oe, V, q) {
    const se = new Uint8Array(4), ae = i.createTexture();
    i.bindTexture(P, ae), i.texParameteri(P, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(P, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let He = 0; He < V; He++)
      P === i.TEXTURE_3D || P === i.TEXTURE_2D_ARRAY ? i.texImage3D(oe, 0, i.RGBA, 1, 1, q, 0, i.RGBA, i.UNSIGNED_BYTE, se) : i.texImage2D(oe + He, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, se);
    return ae;
  }
  const Z = {};
  Z[i.TEXTURE_2D] = W(i.TEXTURE_2D, i.TEXTURE_2D, 1), Z[i.TEXTURE_CUBE_MAP] = W(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), Z[i.TEXTURE_2D_ARRAY] = W(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), Z[i.TEXTURE_3D] = W(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), r.setClear(1), o.setClear(0), me(i.DEPTH_TEST), r.setFunc(Zi), Fe(!1), Ve($c), me(i.CULL_FACE), C(Xn);
  function me(P) {
    l[P] !== !0 && (i.enable(P), l[P] = !0);
  }
  function he(P) {
    l[P] !== !1 && (i.disable(P), l[P] = !1);
  }
  function Pe(P, oe) {
    return h[P] !== oe ? (i.bindFramebuffer(P, oe), h[P] = oe, P === i.DRAW_FRAMEBUFFER && (h[i.FRAMEBUFFER] = oe), P === i.FRAMEBUFFER && (h[i.DRAW_FRAMEBUFFER] = oe), !0) : !1;
  }
  function Ee(P, oe) {
    let V = d, q = !1;
    if (P) {
      V = u.get(oe), V === void 0 && (V = [], u.set(oe, V));
      const se = P.textures;
      if (V.length !== se.length || V[0] !== i.COLOR_ATTACHMENT0) {
        for (let ae = 0, He = se.length; ae < He; ae++)
          V[ae] = i.COLOR_ATTACHMENT0 + ae;
        V.length = se.length, q = !0;
      }
    } else
      V[0] !== i.BACK && (V[0] = i.BACK, q = !0);
    q && i.drawBuffers(V);
  }
  function ze(P) {
    return f !== P ? (i.useProgram(P), f = P, !0) : !1;
  }
  const et = {
    [ci]: i.FUNC_ADD,
    [Ed]: i.FUNC_SUBTRACT,
    [Td]: i.FUNC_REVERSE_SUBTRACT
  };
  et[bd] = i.MIN, et[Ad] = i.MAX;
  const ke = {
    [wd]: i.ZERO,
    [Rd]: i.ONE,
    [Cd]: i.SRC_COLOR,
    [ta]: i.SRC_ALPHA,
    [Ud]: i.SRC_ALPHA_SATURATE,
    [Dd]: i.DST_COLOR,
    [Ld]: i.DST_ALPHA,
    [Pd]: i.ONE_MINUS_SRC_COLOR,
    [na]: i.ONE_MINUS_SRC_ALPHA,
    [Nd]: i.ONE_MINUS_DST_COLOR,
    [Id]: i.ONE_MINUS_DST_ALPHA,
    [Od]: i.CONSTANT_COLOR,
    [Fd]: i.ONE_MINUS_CONSTANT_COLOR,
    [Bd]: i.CONSTANT_ALPHA,
    [zd]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function C(P, oe, V, q, se, ae, He, ft, Dt, $e) {
    if (P === Xn) {
      g === !0 && (he(i.BLEND), g = !1);
      return;
    }
    if (g === !1 && (me(i.BLEND), g = !0), P !== Sd) {
      if (P !== _ || $e !== N) {
        if ((p !== ci || y !== ci) && (i.blendEquation(i.FUNC_ADD), p = ci, y = ci), $e)
          switch (P) {
            case Wi:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case qc:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case Yc:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case jc:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        else
          switch (P) {
            case Wi:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case qc:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case Yc:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case jc:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        m = null, T = null, S = null, D = null, R.set(0, 0, 0), A = 0, _ = P, N = $e;
      }
      return;
    }
    se = se || oe, ae = ae || V, He = He || q, (oe !== p || se !== y) && (i.blendEquationSeparate(et[oe], et[se]), p = oe, y = se), (V !== m || q !== T || ae !== S || He !== D) && (i.blendFuncSeparate(ke[V], ke[q], ke[ae], ke[He]), m = V, T = q, S = ae, D = He), (ft.equals(R) === !1 || Dt !== A) && (i.blendColor(ft.r, ft.g, ft.b, Dt), R.copy(ft), A = Dt), _ = P, N = !1;
  }
  function Ft(P, oe) {
    P.side === tn ? he(i.CULL_FACE) : me(i.CULL_FACE);
    let V = P.side === Ot;
    oe && (V = !V), Fe(V), P.blending === Wi && P.transparent === !1 ? C(Xn) : C(P.blending, P.blendEquation, P.blendSrc, P.blendDst, P.blendEquationAlpha, P.blendSrcAlpha, P.blendDstAlpha, P.blendColor, P.blendAlpha, P.premultipliedAlpha), r.setFunc(P.depthFunc), r.setTest(P.depthTest), r.setMask(P.depthWrite), s.setMask(P.colorWrite);
    const q = P.stencilWrite;
    o.setTest(q), q && (o.setMask(P.stencilWriteMask), o.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask), o.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)), it(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits), P.alphaToCoverage === !0 ? me(i.SAMPLE_ALPHA_TO_COVERAGE) : he(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Fe(P) {
    Y !== P && (P ? i.frontFace(i.CW) : i.frontFace(i.CCW), Y = P);
  }
  function Ve(P) {
    P !== yd ? (me(i.CULL_FACE), P !== v && (P === $c ? i.cullFace(i.BACK) : P === Md ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : he(i.CULL_FACE), v = P;
  }
  function be(P) {
    P !== E && (j && i.lineWidth(P), E = P);
  }
  function it(P, oe, V) {
    P ? (me(i.POLYGON_OFFSET_FILL), (z !== oe || B !== V) && (i.polygonOffset(oe, V), z = oe, B = V)) : he(i.POLYGON_OFFSET_FILL);
  }
  function Re(P) {
    P ? me(i.SCISSOR_TEST) : he(i.SCISSOR_TEST);
  }
  function b(P) {
    P === void 0 && (P = i.TEXTURE0 + H - 1), G !== P && (i.activeTexture(P), G = P);
  }
  function x(P, oe, V) {
    V === void 0 && (G === null ? V = i.TEXTURE0 + H - 1 : V = G);
    let q = ce[V];
    q === void 0 && (q = { type: void 0, texture: void 0 }, ce[V] = q), (q.type !== P || q.texture !== oe) && (G !== V && (i.activeTexture(V), G = V), i.bindTexture(P, oe || Z[P]), q.type = P, q.texture = oe);
  }
  function U() {
    const P = ce[G];
    P !== void 0 && P.type !== void 0 && (i.bindTexture(P.type, null), P.type = void 0, P.texture = void 0);
  }
  function $() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function K() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function X() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ve() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ie() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ue() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Ge() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function J() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function de() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Ae() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function we(P) {
    Xe.equals(P) === !1 && (i.scissor(P.x, P.y, P.z, P.w), Xe.copy(P));
  }
  function fe(P) {
    Ke.equals(P) === !1 && (i.viewport(P.x, P.y, P.z, P.w), Ke.copy(P));
  }
  function Be(P, oe) {
    let V = c.get(oe);
    V === void 0 && (V = /* @__PURE__ */ new WeakMap(), c.set(oe, V));
    let q = V.get(P);
    q === void 0 && (q = i.getUniformBlockIndex(oe, P.name), V.set(P, q));
  }
  function Le(P, oe) {
    const q = c.get(oe).get(P);
    a.get(oe) !== q && (i.uniformBlockBinding(oe, q, P.__bindingPointIndex), a.set(oe, q));
  }
  function nt() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), l = {}, G = null, ce = {}, h = {}, u = /* @__PURE__ */ new WeakMap(), d = [], f = null, g = !1, _ = null, p = null, m = null, T = null, y = null, S = null, D = null, R = new Me(0, 0, 0), A = 0, N = !1, Y = null, v = null, E = null, z = null, B = null, Xe.set(0, 0, i.canvas.width, i.canvas.height), Ke.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), r.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: r,
      stencil: o
    },
    enable: me,
    disable: he,
    bindFramebuffer: Pe,
    drawBuffers: Ee,
    useProgram: ze,
    setBlending: C,
    setMaterial: Ft,
    setFlipSided: Fe,
    setCullFace: Ve,
    setLineWidth: be,
    setPolygonOffset: it,
    setScissorTest: Re,
    activeTexture: b,
    bindTexture: x,
    unbindTexture: U,
    compressedTexImage2D: $,
    compressedTexImage3D: K,
    texImage2D: de,
    texImage3D: Ae,
    updateUBOMapping: Be,
    uniformBlockBinding: Le,
    texStorage2D: Ge,
    texStorage3D: J,
    texSubImage2D: X,
    texSubImage3D: ve,
    compressedTexSubImage2D: ie,
    compressedTexSubImage3D: ue,
    scissor: we,
    viewport: fe,
    reset: nt
  };
}
function Gl(i, e, t, n) {
  const s = A0(n);
  switch (t) {
    case jh:
      return i * e;
    case Zh:
      return i * e;
    case Jh:
      return i * e * 2;
    case oc:
      return i * e / s.components * s.byteLength;
    case ac:
      return i * e / s.components * s.byteLength;
    case Qh:
      return i * e * 2 / s.components * s.byteLength;
    case cc:
      return i * e * 2 / s.components * s.byteLength;
    case Kh:
      return i * e * 3 / s.components * s.byteLength;
    case Yt:
      return i * e * 4 / s.components * s.byteLength;
    case lc:
      return i * e * 4 / s.components * s.byteLength;
    case Br:
    case zr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case kr:
    case Hr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case fa:
    case ma:
      return Math.max(i, 16) * Math.max(e, 8) / 4;
    case da:
    case pa:
      return Math.max(i, 8) * Math.max(e, 8) / 2;
    case ga:
    case _a:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case va:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case xa:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case ya:
      return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case Ma:
      return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case Sa:
      return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case Ea:
      return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case Ta:
      return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case ba:
      return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case Aa:
      return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case wa:
      return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case Ra:
      return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case Ca:
      return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case Pa:
      return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case La:
      return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case Ia:
      return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    case Vr:
    case Da:
    case Na:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    case eu:
    case Ua:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case Oa:
    case Fa:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function A0(i) {
  switch (i) {
    case Rn:
    case $h:
      return { byteLength: 1, components: 1 };
    case ks:
    case qh:
    case js:
      return { byteLength: 2, components: 1 };
    case sc:
    case rc:
      return { byteLength: 2, components: 4 };
    case fi:
    case ic:
    case sn:
      return { byteLength: 4, components: 1 };
    case Yh:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function w0(i, e, t, n, s, r, o) {
  const a = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new te(), h = /* @__PURE__ */ new WeakMap();
  let u;
  const d = /* @__PURE__ */ new WeakMap();
  let f = !1;
  try {
    f = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(b, x) {
    return f ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(b, x)
    ) : Gs("canvas");
  }
  function _(b, x, U) {
    let $ = 1;
    const K = Re(b);
    if ((K.width > U || K.height > U) && ($ = U / Math.max(K.width, K.height)), $ < 1)
      if (typeof HTMLImageElement < "u" && b instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && b instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && b instanceof ImageBitmap || typeof VideoFrame < "u" && b instanceof VideoFrame) {
        const X = Math.floor($ * K.width), ve = Math.floor($ * K.height);
        u === void 0 && (u = g(X, ve));
        const ie = x ? g(X, ve) : u;
        return ie.width = X, ie.height = ve, ie.getContext("2d").drawImage(b, 0, 0, X, ve), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + K.width + "x" + K.height + ") to (" + X + "x" + ve + ")."), ie;
      } else
        return "data" in b && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + K.width + "x" + K.height + ")."), b;
    return b;
  }
  function p(b) {
    return b.generateMipmaps && b.minFilter !== Pt && b.minFilter !== Vt;
  }
  function m(b) {
    i.generateMipmap(b);
  }
  function T(b, x, U, $, K = !1) {
    if (b !== null) {
      if (i[b] !== void 0) return i[b];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + b + "'");
    }
    let X = x;
    if (x === i.RED && (U === i.FLOAT && (X = i.R32F), U === i.HALF_FLOAT && (X = i.R16F), U === i.UNSIGNED_BYTE && (X = i.R8)), x === i.RED_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.R8UI), U === i.UNSIGNED_SHORT && (X = i.R16UI), U === i.UNSIGNED_INT && (X = i.R32UI), U === i.BYTE && (X = i.R8I), U === i.SHORT && (X = i.R16I), U === i.INT && (X = i.R32I)), x === i.RG && (U === i.FLOAT && (X = i.RG32F), U === i.HALF_FLOAT && (X = i.RG16F), U === i.UNSIGNED_BYTE && (X = i.RG8)), x === i.RG_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.RG8UI), U === i.UNSIGNED_SHORT && (X = i.RG16UI), U === i.UNSIGNED_INT && (X = i.RG32UI), U === i.BYTE && (X = i.RG8I), U === i.SHORT && (X = i.RG16I), U === i.INT && (X = i.RG32I)), x === i.RGB_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.RGB8UI), U === i.UNSIGNED_SHORT && (X = i.RGB16UI), U === i.UNSIGNED_INT && (X = i.RGB32UI), U === i.BYTE && (X = i.RGB8I), U === i.SHORT && (X = i.RGB16I), U === i.INT && (X = i.RGB32I)), x === i.RGBA_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.RGBA8UI), U === i.UNSIGNED_SHORT && (X = i.RGBA16UI), U === i.UNSIGNED_INT && (X = i.RGBA32UI), U === i.BYTE && (X = i.RGBA8I), U === i.SHORT && (X = i.RGBA16I), U === i.INT && (X = i.RGBA32I)), x === i.RGB && U === i.UNSIGNED_INT_5_9_9_9_REV && (X = i.RGB9_E5), x === i.RGBA) {
      const ve = K ? Yr : We.getTransfer($);
      U === i.FLOAT && (X = i.RGBA32F), U === i.HALF_FLOAT && (X = i.RGBA16F), U === i.UNSIGNED_BYTE && (X = ve === rt ? i.SRGB8_ALPHA8 : i.RGBA8), U === i.UNSIGNED_SHORT_4_4_4_4 && (X = i.RGBA4), U === i.UNSIGNED_SHORT_5_5_5_1 && (X = i.RGB5_A1);
    }
    return (X === i.R16F || X === i.R32F || X === i.RG16F || X === i.RG32F || X === i.RGBA16F || X === i.RGBA32F) && e.get("EXT_color_buffer_float"), X;
  }
  function y(b, x) {
    let U;
    return b ? x === null || x === fi || x === ts ? U = i.DEPTH24_STENCIL8 : x === sn ? U = i.DEPTH32F_STENCIL8 : x === ks && (U = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : x === null || x === fi || x === ts ? U = i.DEPTH_COMPONENT24 : x === sn ? U = i.DEPTH_COMPONENT32F : x === ks && (U = i.DEPTH_COMPONENT16), U;
  }
  function S(b, x) {
    return p(b) === !0 || b.isFramebufferTexture && b.minFilter !== Pt && b.minFilter !== Vt ? Math.log2(Math.max(x.width, x.height)) + 1 : b.mipmaps !== void 0 && b.mipmaps.length > 0 ? b.mipmaps.length : b.isCompressedTexture && Array.isArray(b.image) ? x.mipmaps.length : 1;
  }
  function D(b) {
    const x = b.target;
    x.removeEventListener("dispose", D), A(x), x.isVideoTexture && h.delete(x);
  }
  function R(b) {
    const x = b.target;
    x.removeEventListener("dispose", R), Y(x);
  }
  function A(b) {
    const x = n.get(b);
    if (x.__webglInit === void 0) return;
    const U = b.source, $ = d.get(U);
    if ($) {
      const K = $[x.__cacheKey];
      K.usedTimes--, K.usedTimes === 0 && N(b), Object.keys($).length === 0 && d.delete(U);
    }
    n.remove(b);
  }
  function N(b) {
    const x = n.get(b);
    i.deleteTexture(x.__webglTexture);
    const U = b.source, $ = d.get(U);
    delete $[x.__cacheKey], o.memory.textures--;
  }
  function Y(b) {
    const x = n.get(b);
    if (b.depthTexture && b.depthTexture.dispose(), b.isWebGLCubeRenderTarget)
      for (let $ = 0; $ < 6; $++) {
        if (Array.isArray(x.__webglFramebuffer[$]))
          for (let K = 0; K < x.__webglFramebuffer[$].length; K++) i.deleteFramebuffer(x.__webglFramebuffer[$][K]);
        else
          i.deleteFramebuffer(x.__webglFramebuffer[$]);
        x.__webglDepthbuffer && i.deleteRenderbuffer(x.__webglDepthbuffer[$]);
      }
    else {
      if (Array.isArray(x.__webglFramebuffer))
        for (let $ = 0; $ < x.__webglFramebuffer.length; $++) i.deleteFramebuffer(x.__webglFramebuffer[$]);
      else
        i.deleteFramebuffer(x.__webglFramebuffer);
      if (x.__webglDepthbuffer && i.deleteRenderbuffer(x.__webglDepthbuffer), x.__webglMultisampledFramebuffer && i.deleteFramebuffer(x.__webglMultisampledFramebuffer), x.__webglColorRenderbuffer)
        for (let $ = 0; $ < x.__webglColorRenderbuffer.length; $++)
          x.__webglColorRenderbuffer[$] && i.deleteRenderbuffer(x.__webglColorRenderbuffer[$]);
      x.__webglDepthRenderbuffer && i.deleteRenderbuffer(x.__webglDepthRenderbuffer);
    }
    const U = b.textures;
    for (let $ = 0, K = U.length; $ < K; $++) {
      const X = n.get(U[$]);
      X.__webglTexture && (i.deleteTexture(X.__webglTexture), o.memory.textures--), n.remove(U[$]);
    }
    n.remove(b);
  }
  let v = 0;
  function E() {
    v = 0;
  }
  function z() {
    const b = v;
    return b >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + b + " texture units while this GPU supports only " + s.maxTextures), v += 1, b;
  }
  function B(b) {
    const x = [];
    return x.push(b.wrapS), x.push(b.wrapT), x.push(b.wrapR || 0), x.push(b.magFilter), x.push(b.minFilter), x.push(b.anisotropy), x.push(b.internalFormat), x.push(b.format), x.push(b.type), x.push(b.generateMipmaps), x.push(b.premultiplyAlpha), x.push(b.flipY), x.push(b.unpackAlignment), x.push(b.colorSpace), x.join();
  }
  function H(b, x) {
    const U = n.get(b);
    if (b.isVideoTexture && be(b), b.isRenderTargetTexture === !1 && b.version > 0 && U.__version !== b.version) {
      const $ = b.image;
      if ($ === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if ($.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Ke(U, b, x);
        return;
      }
    }
    t.bindTexture(i.TEXTURE_2D, U.__webglTexture, i.TEXTURE0 + x);
  }
  function j(b, x) {
    const U = n.get(b);
    if (b.version > 0 && U.__version !== b.version) {
      Ke(U, b, x);
      return;
    }
    t.bindTexture(i.TEXTURE_2D_ARRAY, U.__webglTexture, i.TEXTURE0 + x);
  }
  function k(b, x) {
    const U = n.get(b);
    if (b.version > 0 && U.__version !== b.version) {
      Ke(U, b, x);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, U.__webglTexture, i.TEXTURE0 + x);
  }
  function Q(b, x) {
    const U = n.get(b);
    if (b.version > 0 && U.__version !== b.version) {
      W(U, b, x);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, U.__webglTexture, i.TEXTURE0 + x);
  }
  const G = {
    [es]: i.REPEAT,
    [Gn]: i.CLAMP_TO_EDGE,
    [qr]: i.MIRRORED_REPEAT
  }, ce = {
    [Pt]: i.NEAREST,
    [Xh]: i.NEAREST_MIPMAP_NEAREST,
    [Rs]: i.NEAREST_MIPMAP_LINEAR,
    [Vt]: i.LINEAR,
    [Fr]: i.LINEAR_MIPMAP_NEAREST,
    [bn]: i.LINEAR_MIPMAP_LINEAR
  }, le = {
    [tf]: i.NEVER,
    [cf]: i.ALWAYS,
    [nf]: i.LESS,
    [iu]: i.LEQUAL,
    [sf]: i.EQUAL,
    [af]: i.GEQUAL,
    [rf]: i.GREATER,
    [of]: i.NOTEQUAL
  };
  function _e(b, x) {
    if (x.type === sn && e.has("OES_texture_float_linear") === !1 && (x.magFilter === Vt || x.magFilter === Fr || x.magFilter === Rs || x.magFilter === bn || x.minFilter === Vt || x.minFilter === Fr || x.minFilter === Rs || x.minFilter === bn) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(b, i.TEXTURE_WRAP_S, G[x.wrapS]), i.texParameteri(b, i.TEXTURE_WRAP_T, G[x.wrapT]), (b === i.TEXTURE_3D || b === i.TEXTURE_2D_ARRAY) && i.texParameteri(b, i.TEXTURE_WRAP_R, G[x.wrapR]), i.texParameteri(b, i.TEXTURE_MAG_FILTER, ce[x.magFilter]), i.texParameteri(b, i.TEXTURE_MIN_FILTER, ce[x.minFilter]), x.compareFunction && (i.texParameteri(b, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(b, i.TEXTURE_COMPARE_FUNC, le[x.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (x.magFilter === Pt || x.minFilter !== Rs && x.minFilter !== bn || x.type === sn && e.has("OES_texture_float_linear") === !1) return;
      if (x.anisotropy > 1 || n.get(x).__currentAnisotropy) {
        const U = e.get("EXT_texture_filter_anisotropic");
        i.texParameterf(b, U.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(x.anisotropy, s.getMaxAnisotropy())), n.get(x).__currentAnisotropy = x.anisotropy;
      }
    }
  }
  function Xe(b, x) {
    let U = !1;
    b.__webglInit === void 0 && (b.__webglInit = !0, x.addEventListener("dispose", D));
    const $ = x.source;
    let K = d.get($);
    K === void 0 && (K = {}, d.set($, K));
    const X = B(x);
    if (X !== b.__cacheKey) {
      K[X] === void 0 && (K[X] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, U = !0), K[X].usedTimes++;
      const ve = K[b.__cacheKey];
      ve !== void 0 && (K[b.__cacheKey].usedTimes--, ve.usedTimes === 0 && N(x)), b.__cacheKey = X, b.__webglTexture = K[X].texture;
    }
    return U;
  }
  function Ke(b, x, U) {
    let $ = i.TEXTURE_2D;
    (x.isDataArrayTexture || x.isCompressedArrayTexture) && ($ = i.TEXTURE_2D_ARRAY), x.isData3DTexture && ($ = i.TEXTURE_3D);
    const K = Xe(b, x), X = x.source;
    t.bindTexture($, b.__webglTexture, i.TEXTURE0 + U);
    const ve = n.get(X);
    if (X.version !== ve.__version || K === !0) {
      t.activeTexture(i.TEXTURE0 + U);
      const ie = We.getPrimaries(We.workingColorSpace), ue = x.colorSpace === Hn ? null : We.getPrimaries(x.colorSpace), Ge = x.colorSpace === Hn || ie === ue ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ge);
      let J = _(x.image, !1, s.maxTextureSize);
      J = it(x, J);
      const de = r.convert(x.format, x.colorSpace), Ae = r.convert(x.type);
      let we = T(x.internalFormat, de, Ae, x.colorSpace, x.isVideoTexture);
      _e($, x);
      let fe;
      const Be = x.mipmaps, Le = x.isVideoTexture !== !0, nt = ve.__version === void 0 || K === !0, P = X.dataReady, oe = S(x, J);
      if (x.isDepthTexture)
        we = y(x.format === ns, x.type), nt && (Le ? t.texStorage2D(i.TEXTURE_2D, 1, we, J.width, J.height) : t.texImage2D(i.TEXTURE_2D, 0, we, J.width, J.height, 0, de, Ae, null));
      else if (x.isDataTexture)
        if (Be.length > 0) {
          Le && nt && t.texStorage2D(i.TEXTURE_2D, oe, we, Be[0].width, Be[0].height);
          for (let V = 0, q = Be.length; V < q; V++)
            fe = Be[V], Le ? P && t.texSubImage2D(i.TEXTURE_2D, V, 0, 0, fe.width, fe.height, de, Ae, fe.data) : t.texImage2D(i.TEXTURE_2D, V, we, fe.width, fe.height, 0, de, Ae, fe.data);
          x.generateMipmaps = !1;
        } else
          Le ? (nt && t.texStorage2D(i.TEXTURE_2D, oe, we, J.width, J.height), P && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, J.width, J.height, de, Ae, J.data)) : t.texImage2D(i.TEXTURE_2D, 0, we, J.width, J.height, 0, de, Ae, J.data);
      else if (x.isCompressedTexture)
        if (x.isCompressedArrayTexture) {
          Le && nt && t.texStorage3D(i.TEXTURE_2D_ARRAY, oe, we, Be[0].width, Be[0].height, J.depth);
          for (let V = 0, q = Be.length; V < q; V++)
            if (fe = Be[V], x.format !== Yt)
              if (de !== null)
                if (Le) {
                  if (P)
                    if (x.layerUpdates.size > 0) {
                      const se = Gl(fe.width, fe.height, x.format, x.type);
                      for (const ae of x.layerUpdates) {
                        const He = fe.data.subarray(
                          ae * se / fe.data.BYTES_PER_ELEMENT,
                          (ae + 1) * se / fe.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, ae, fe.width, fe.height, 1, de, He, 0, 0);
                      }
                      x.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, fe.width, fe.height, J.depth, de, fe.data, 0, 0);
                } else
                  t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, V, we, fe.width, fe.height, J.depth, 0, fe.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Le ? P && t.texSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, fe.width, fe.height, J.depth, de, Ae, fe.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, V, we, fe.width, fe.height, J.depth, 0, de, Ae, fe.data);
        } else {
          Le && nt && t.texStorage2D(i.TEXTURE_2D, oe, we, Be[0].width, Be[0].height);
          for (let V = 0, q = Be.length; V < q; V++)
            fe = Be[V], x.format !== Yt ? de !== null ? Le ? P && t.compressedTexSubImage2D(i.TEXTURE_2D, V, 0, 0, fe.width, fe.height, de, fe.data) : t.compressedTexImage2D(i.TEXTURE_2D, V, we, fe.width, fe.height, 0, fe.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Le ? P && t.texSubImage2D(i.TEXTURE_2D, V, 0, 0, fe.width, fe.height, de, Ae, fe.data) : t.texImage2D(i.TEXTURE_2D, V, we, fe.width, fe.height, 0, de, Ae, fe.data);
        }
      else if (x.isDataArrayTexture)
        if (Le) {
          if (nt && t.texStorage3D(i.TEXTURE_2D_ARRAY, oe, we, J.width, J.height, J.depth), P)
            if (x.layerUpdates.size > 0) {
              const V = Gl(J.width, J.height, x.format, x.type);
              for (const q of x.layerUpdates) {
                const se = J.data.subarray(
                  q * V / J.data.BYTES_PER_ELEMENT,
                  (q + 1) * V / J.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, q, J.width, J.height, 1, de, Ae, se);
              }
              x.clearLayerUpdates();
            } else
              t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, J.width, J.height, J.depth, de, Ae, J.data);
        } else
          t.texImage3D(i.TEXTURE_2D_ARRAY, 0, we, J.width, J.height, J.depth, 0, de, Ae, J.data);
      else if (x.isData3DTexture)
        Le ? (nt && t.texStorage3D(i.TEXTURE_3D, oe, we, J.width, J.height, J.depth), P && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, J.width, J.height, J.depth, de, Ae, J.data)) : t.texImage3D(i.TEXTURE_3D, 0, we, J.width, J.height, J.depth, 0, de, Ae, J.data);
      else if (x.isFramebufferTexture) {
        if (nt)
          if (Le)
            t.texStorage2D(i.TEXTURE_2D, oe, we, J.width, J.height);
          else {
            let V = J.width, q = J.height;
            for (let se = 0; se < oe; se++)
              t.texImage2D(i.TEXTURE_2D, se, we, V, q, 0, de, Ae, null), V >>= 1, q >>= 1;
          }
      } else if (Be.length > 0) {
        if (Le && nt) {
          const V = Re(Be[0]);
          t.texStorage2D(i.TEXTURE_2D, oe, we, V.width, V.height);
        }
        for (let V = 0, q = Be.length; V < q; V++)
          fe = Be[V], Le ? P && t.texSubImage2D(i.TEXTURE_2D, V, 0, 0, de, Ae, fe) : t.texImage2D(i.TEXTURE_2D, V, we, de, Ae, fe);
        x.generateMipmaps = !1;
      } else if (Le) {
        if (nt) {
          const V = Re(J);
          t.texStorage2D(i.TEXTURE_2D, oe, we, V.width, V.height);
        }
        P && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, de, Ae, J);
      } else
        t.texImage2D(i.TEXTURE_2D, 0, we, de, Ae, J);
      p(x) && m($), ve.__version = X.version, x.onUpdate && x.onUpdate(x);
    }
    b.__version = x.version;
  }
  function W(b, x, U) {
    if (x.image.length !== 6) return;
    const $ = Xe(b, x), K = x.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, b.__webglTexture, i.TEXTURE0 + U);
    const X = n.get(K);
    if (K.version !== X.__version || $ === !0) {
      t.activeTexture(i.TEXTURE0 + U);
      const ve = We.getPrimaries(We.workingColorSpace), ie = x.colorSpace === Hn ? null : We.getPrimaries(x.colorSpace), ue = x.colorSpace === Hn || ve === ie ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ue);
      const Ge = x.isCompressedTexture || x.image[0].isCompressedTexture, J = x.image[0] && x.image[0].isDataTexture, de = [];
      for (let q = 0; q < 6; q++)
        !Ge && !J ? de[q] = _(x.image[q], !0, s.maxCubemapSize) : de[q] = J ? x.image[q].image : x.image[q], de[q] = it(x, de[q]);
      const Ae = de[0], we = r.convert(x.format, x.colorSpace), fe = r.convert(x.type), Be = T(x.internalFormat, we, fe, x.colorSpace), Le = x.isVideoTexture !== !0, nt = X.__version === void 0 || $ === !0, P = K.dataReady;
      let oe = S(x, Ae);
      _e(i.TEXTURE_CUBE_MAP, x);
      let V;
      if (Ge) {
        Le && nt && t.texStorage2D(i.TEXTURE_CUBE_MAP, oe, Be, Ae.width, Ae.height);
        for (let q = 0; q < 6; q++) {
          V = de[q].mipmaps;
          for (let se = 0; se < V.length; se++) {
            const ae = V[se];
            x.format !== Yt ? we !== null ? Le ? P && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, se, 0, 0, ae.width, ae.height, we, ae.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, se, Be, ae.width, ae.height, 0, ae.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Le ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, se, 0, 0, ae.width, ae.height, we, fe, ae.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, se, Be, ae.width, ae.height, 0, we, fe, ae.data);
          }
        }
      } else {
        if (V = x.mipmaps, Le && nt) {
          V.length > 0 && oe++;
          const q = Re(de[0]);
          t.texStorage2D(i.TEXTURE_CUBE_MAP, oe, Be, q.width, q.height);
        }
        for (let q = 0; q < 6; q++)
          if (J) {
            Le ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, 0, 0, de[q].width, de[q].height, we, fe, de[q].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, Be, de[q].width, de[q].height, 0, we, fe, de[q].data);
            for (let se = 0; se < V.length; se++) {
              const He = V[se].image[q].image;
              Le ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, se + 1, 0, 0, He.width, He.height, we, fe, He.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, se + 1, Be, He.width, He.height, 0, we, fe, He.data);
            }
          } else {
            Le ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, 0, 0, we, fe, de[q]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, Be, we, fe, de[q]);
            for (let se = 0; se < V.length; se++) {
              const ae = V[se];
              Le ? P && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, se + 1, 0, 0, we, fe, ae.image[q]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, se + 1, Be, we, fe, ae.image[q]);
            }
          }
      }
      p(x) && m(i.TEXTURE_CUBE_MAP), X.__version = K.version, x.onUpdate && x.onUpdate(x);
    }
    b.__version = x.version;
  }
  function Z(b, x, U, $, K, X) {
    const ve = r.convert(U.format, U.colorSpace), ie = r.convert(U.type), ue = T(U.internalFormat, ve, ie, U.colorSpace);
    if (!n.get(x).__hasExternalTextures) {
      const J = Math.max(1, x.width >> X), de = Math.max(1, x.height >> X);
      K === i.TEXTURE_3D || K === i.TEXTURE_2D_ARRAY ? t.texImage3D(K, X, ue, J, de, x.depth, 0, ve, ie, null) : t.texImage2D(K, X, ue, J, de, 0, ve, ie, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, b), Ve(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, $, K, n.get(U).__webglTexture, 0, Fe(x)) : (K === i.TEXTURE_2D || K >= i.TEXTURE_CUBE_MAP_POSITIVE_X && K <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, $, K, n.get(U).__webglTexture, X), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function me(b, x, U) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, b), x.depthBuffer) {
      const $ = x.depthTexture, K = $ && $.isDepthTexture ? $.type : null, X = y(x.stencilBuffer, K), ve = x.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ie = Fe(x);
      Ve(x) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ie, X, x.width, x.height) : U ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ie, X, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, X, x.width, x.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, ve, i.RENDERBUFFER, b);
    } else {
      const $ = x.textures;
      for (let K = 0; K < $.length; K++) {
        const X = $[K], ve = r.convert(X.format, X.colorSpace), ie = r.convert(X.type), ue = T(X.internalFormat, ve, ie, X.colorSpace), Ge = Fe(x);
        U && Ve(x) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Ge, ue, x.width, x.height) : Ve(x) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Ge, ue, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, ue, x.width, x.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function he(b, x) {
    if (x && x.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(i.FRAMEBUFFER, b), !(x.depthTexture && x.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!n.get(x.depthTexture).__webglTexture || x.depthTexture.image.width !== x.width || x.depthTexture.image.height !== x.height) && (x.depthTexture.image.width = x.width, x.depthTexture.image.height = x.height, x.depthTexture.needsUpdate = !0), H(x.depthTexture, 0);
    const $ = n.get(x.depthTexture).__webglTexture, K = Fe(x);
    if (x.depthTexture.format === Xi)
      Ve(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0, K) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else if (x.depthTexture.format === ns)
      Ve(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0, K) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Pe(b) {
    const x = n.get(b), U = b.isWebGLCubeRenderTarget === !0;
    if (x.__boundDepthTexture !== b.depthTexture) {
      const $ = b.depthTexture;
      if (x.__depthDisposeCallback && x.__depthDisposeCallback(), $) {
        const K = () => {
          delete x.__boundDepthTexture, delete x.__depthDisposeCallback, $.removeEventListener("dispose", K);
        };
        $.addEventListener("dispose", K), x.__depthDisposeCallback = K;
      }
      x.__boundDepthTexture = $;
    }
    if (b.depthTexture && !x.__autoAllocateDepthBuffer) {
      if (U) throw new Error("target.depthTexture not supported in Cube render targets");
      he(x.__webglFramebuffer, b);
    } else if (U) {
      x.__webglDepthbuffer = [];
      for (let $ = 0; $ < 6; $++)
        if (t.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer[$]), x.__webglDepthbuffer[$] === void 0)
          x.__webglDepthbuffer[$] = i.createRenderbuffer(), me(x.__webglDepthbuffer[$], b, !1);
        else {
          const K = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, X = x.__webglDepthbuffer[$];
          i.bindRenderbuffer(i.RENDERBUFFER, X), i.framebufferRenderbuffer(i.FRAMEBUFFER, K, i.RENDERBUFFER, X);
        }
    } else if (t.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer), x.__webglDepthbuffer === void 0)
      x.__webglDepthbuffer = i.createRenderbuffer(), me(x.__webglDepthbuffer, b, !1);
    else {
      const $ = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, K = x.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, K), i.framebufferRenderbuffer(i.FRAMEBUFFER, $, i.RENDERBUFFER, K);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Ee(b, x, U) {
    const $ = n.get(b);
    x !== void 0 && Z($.__webglFramebuffer, b, b.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), U !== void 0 && Pe(b);
  }
  function ze(b) {
    const x = b.texture, U = n.get(b), $ = n.get(x);
    b.addEventListener("dispose", R);
    const K = b.textures, X = b.isWebGLCubeRenderTarget === !0, ve = K.length > 1;
    if (ve || ($.__webglTexture === void 0 && ($.__webglTexture = i.createTexture()), $.__version = x.version, o.memory.textures++), X) {
      U.__webglFramebuffer = [];
      for (let ie = 0; ie < 6; ie++)
        if (x.mipmaps && x.mipmaps.length > 0) {
          U.__webglFramebuffer[ie] = [];
          for (let ue = 0; ue < x.mipmaps.length; ue++)
            U.__webglFramebuffer[ie][ue] = i.createFramebuffer();
        } else
          U.__webglFramebuffer[ie] = i.createFramebuffer();
    } else {
      if (x.mipmaps && x.mipmaps.length > 0) {
        U.__webglFramebuffer = [];
        for (let ie = 0; ie < x.mipmaps.length; ie++)
          U.__webglFramebuffer[ie] = i.createFramebuffer();
      } else
        U.__webglFramebuffer = i.createFramebuffer();
      if (ve)
        for (let ie = 0, ue = K.length; ie < ue; ie++) {
          const Ge = n.get(K[ie]);
          Ge.__webglTexture === void 0 && (Ge.__webglTexture = i.createTexture(), o.memory.textures++);
        }
      if (b.samples > 0 && Ve(b) === !1) {
        U.__webglMultisampledFramebuffer = i.createFramebuffer(), U.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, U.__webglMultisampledFramebuffer);
        for (let ie = 0; ie < K.length; ie++) {
          const ue = K[ie];
          U.__webglColorRenderbuffer[ie] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, U.__webglColorRenderbuffer[ie]);
          const Ge = r.convert(ue.format, ue.colorSpace), J = r.convert(ue.type), de = T(ue.internalFormat, Ge, J, ue.colorSpace, b.isXRRenderTarget === !0), Ae = Fe(b);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Ae, de, b.width, b.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ie, i.RENDERBUFFER, U.__webglColorRenderbuffer[ie]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), b.depthBuffer && (U.__webglDepthRenderbuffer = i.createRenderbuffer(), me(U.__webglDepthRenderbuffer, b, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (X) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, $.__webglTexture), _e(i.TEXTURE_CUBE_MAP, x);
      for (let ie = 0; ie < 6; ie++)
        if (x.mipmaps && x.mipmaps.length > 0)
          for (let ue = 0; ue < x.mipmaps.length; ue++)
            Z(U.__webglFramebuffer[ie][ue], b, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ie, ue);
        else
          Z(U.__webglFramebuffer[ie], b, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ie, 0);
      p(x) && m(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (ve) {
      for (let ie = 0, ue = K.length; ie < ue; ie++) {
        const Ge = K[ie], J = n.get(Ge);
        t.bindTexture(i.TEXTURE_2D, J.__webglTexture), _e(i.TEXTURE_2D, Ge), Z(U.__webglFramebuffer, b, Ge, i.COLOR_ATTACHMENT0 + ie, i.TEXTURE_2D, 0), p(Ge) && m(i.TEXTURE_2D);
      }
      t.unbindTexture();
    } else {
      let ie = i.TEXTURE_2D;
      if ((b.isWebGL3DRenderTarget || b.isWebGLArrayRenderTarget) && (ie = b.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(ie, $.__webglTexture), _e(ie, x), x.mipmaps && x.mipmaps.length > 0)
        for (let ue = 0; ue < x.mipmaps.length; ue++)
          Z(U.__webglFramebuffer[ue], b, x, i.COLOR_ATTACHMENT0, ie, ue);
      else
        Z(U.__webglFramebuffer, b, x, i.COLOR_ATTACHMENT0, ie, 0);
      p(x) && m(ie), t.unbindTexture();
    }
    b.depthBuffer && Pe(b);
  }
  function et(b) {
    const x = b.textures;
    for (let U = 0, $ = x.length; U < $; U++) {
      const K = x[U];
      if (p(K)) {
        const X = b.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : i.TEXTURE_2D, ve = n.get(K).__webglTexture;
        t.bindTexture(X, ve), m(X), t.unbindTexture();
      }
    }
  }
  const ke = [], C = [];
  function Ft(b) {
    if (b.samples > 0) {
      if (Ve(b) === !1) {
        const x = b.textures, U = b.width, $ = b.height;
        let K = i.COLOR_BUFFER_BIT;
        const X = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ve = n.get(b), ie = x.length > 1;
        if (ie)
          for (let ue = 0; ue < x.length; ue++)
            t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.TEXTURE_2D, null, 0);
        t.bindFramebuffer(i.READ_FRAMEBUFFER, ve.__webglMultisampledFramebuffer), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ve.__webglFramebuffer);
        for (let ue = 0; ue < x.length; ue++) {
          if (b.resolveDepthBuffer && (b.depthBuffer && (K |= i.DEPTH_BUFFER_BIT), b.stencilBuffer && b.resolveStencilBuffer && (K |= i.STENCIL_BUFFER_BIT)), ie) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, ve.__webglColorRenderbuffer[ue]);
            const Ge = n.get(x[ue]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Ge, 0);
          }
          i.blitFramebuffer(0, 0, U, $, 0, 0, U, $, K, i.NEAREST), c === !0 && (ke.length = 0, C.length = 0, ke.push(i.COLOR_ATTACHMENT0 + ue), b.depthBuffer && b.resolveDepthBuffer === !1 && (ke.push(X), C.push(X), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, C)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, ke));
        }
        if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), ie)
          for (let ue = 0; ue < x.length; ue++) {
            t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.RENDERBUFFER, ve.__webglColorRenderbuffer[ue]);
            const Ge = n.get(x[ue]).__webglTexture;
            t.bindFramebuffer(i.FRAMEBUFFER, ve.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ue, i.TEXTURE_2D, Ge, 0);
          }
        t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ve.__webglMultisampledFramebuffer);
      } else if (b.depthBuffer && b.resolveDepthBuffer === !1 && c) {
        const x = b.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [x]);
      }
    }
  }
  function Fe(b) {
    return Math.min(s.maxSamples, b.samples);
  }
  function Ve(b) {
    const x = n.get(b);
    return b.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && x.__useRenderToTexture !== !1;
  }
  function be(b) {
    const x = o.render.frame;
    h.get(b) !== x && (h.set(b, x), b.update());
  }
  function it(b, x) {
    const U = b.colorSpace, $ = b.format, K = b.type;
    return b.isCompressedTexture === !0 || b.isVideoTexture === !0 || U !== Et && U !== Hn && (We.getTransfer(U) === rt ? ($ !== Yt || K !== Rn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", U)), x;
  }
  function Re(b) {
    return typeof HTMLImageElement < "u" && b instanceof HTMLImageElement ? (l.width = b.naturalWidth || b.width, l.height = b.naturalHeight || b.height) : typeof VideoFrame < "u" && b instanceof VideoFrame ? (l.width = b.displayWidth, l.height = b.displayHeight) : (l.width = b.width, l.height = b.height), l;
  }
  this.allocateTextureUnit = z, this.resetTextureUnits = E, this.setTexture2D = H, this.setTexture2DArray = j, this.setTexture3D = k, this.setTextureCube = Q, this.rebindTextures = Ee, this.setupRenderTarget = ze, this.updateRenderTargetMipmap = et, this.updateMultisampleRenderTarget = Ft, this.setupDepthRenderbuffer = Pe, this.setupFrameBufferTexture = Z, this.useMultisampledRTT = Ve;
}
function R0(i, e) {
  function t(n, s = Hn) {
    let r;
    const o = We.getTransfer(s);
    if (n === Rn) return i.UNSIGNED_BYTE;
    if (n === sc) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === rc) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === Yh) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === $h) return i.BYTE;
    if (n === qh) return i.SHORT;
    if (n === ks) return i.UNSIGNED_SHORT;
    if (n === ic) return i.INT;
    if (n === fi) return i.UNSIGNED_INT;
    if (n === sn) return i.FLOAT;
    if (n === js) return i.HALF_FLOAT;
    if (n === jh) return i.ALPHA;
    if (n === Kh) return i.RGB;
    if (n === Yt) return i.RGBA;
    if (n === Zh) return i.LUMINANCE;
    if (n === Jh) return i.LUMINANCE_ALPHA;
    if (n === Xi) return i.DEPTH_COMPONENT;
    if (n === ns) return i.DEPTH_STENCIL;
    if (n === oc) return i.RED;
    if (n === ac) return i.RED_INTEGER;
    if (n === Qh) return i.RG;
    if (n === cc) return i.RG_INTEGER;
    if (n === lc) return i.RGBA_INTEGER;
    if (n === Br || n === zr || n === kr || n === Hr)
      if (o === rt)
        if (r = e.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
          if (n === Br) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === zr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === kr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === Hr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (r = e.get("WEBGL_compressed_texture_s3tc"), r !== null) {
        if (n === Br) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === zr) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === kr) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === Hr) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === da || n === fa || n === pa || n === ma)
      if (r = e.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
        if (n === da) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === fa) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === pa) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === ma) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === ga || n === _a || n === va)
      if (r = e.get("WEBGL_compressed_texture_etc"), r !== null) {
        if (n === ga || n === _a) return o === rt ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (n === va) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === xa || n === ya || n === Ma || n === Sa || n === Ea || n === Ta || n === ba || n === Aa || n === wa || n === Ra || n === Ca || n === Pa || n === La || n === Ia)
      if (r = e.get("WEBGL_compressed_texture_astc"), r !== null) {
        if (n === xa) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === ya) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === Ma) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === Sa) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === Ea) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === Ta) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === ba) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === Aa) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === wa) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === Ra) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === Ca) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === Pa) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === La) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === Ia) return o === rt ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === Vr || n === Da || n === Na)
      if (r = e.get("EXT_texture_compression_bptc"), r !== null) {
        if (n === Vr) return o === rt ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === Da) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === Na) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === eu || n === Ua || n === Oa || n === Fa)
      if (r = e.get("EXT_texture_compression_rgtc"), r !== null) {
        if (n === Vr) return r.COMPRESSED_RED_RGTC1_EXT;
        if (n === Ua) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === Oa) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === Fa) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === ts ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: t };
}
class C0 extends Ct {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class ot extends at {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const P0 = { type: "move" };
class Ho {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new ot(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new ot(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new w(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new w()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new ot(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new w(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new w()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, n) {
    let s = null, r = null, o = null;
    const a = this._targetRay, c = this._grip, l = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (l && e.hand) {
        o = !0;
        for (const _ of e.hand.values()) {
          const p = t.getJointPose(_, n), m = this._getHandJoint(l, _);
          p !== null && (m.matrix.fromArray(p.transform.matrix), m.matrix.decompose(m.position, m.rotation, m.scale), m.matrixWorldNeedsUpdate = !0, m.jointRadius = p.radius), m.visible = p !== null;
        }
        const h = l.joints["index-finger-tip"], u = l.joints["thumb-tip"], d = h.position.distanceTo(u.position), f = 0.02, g = 5e-3;
        l.inputState.pinching && d > f + g ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !l.inputState.pinching && d <= f - g && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        c !== null && e.gripSpace && (r = t.getPose(e.gripSpace, n), r !== null && (c.matrix.fromArray(r.transform.matrix), c.matrix.decompose(c.position, c.rotation, c.scale), c.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (c.hasLinearVelocity = !0, c.linearVelocity.copy(r.linearVelocity)) : c.hasLinearVelocity = !1, r.angularVelocity ? (c.hasAngularVelocity = !0, c.angularVelocity.copy(r.angularVelocity)) : c.hasAngularVelocity = !1));
      a !== null && (s = t.getPose(e.targetRaySpace, n), s === null && r !== null && (s = r), s !== null && (a.matrix.fromArray(s.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(s.linearVelocity)) : a.hasLinearVelocity = !1, s.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(s.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(P0)));
    }
    return a !== null && (a.visible = s !== null), c !== null && (c.visible = r !== null), l !== null && (l.visible = o !== null), this;
  }
  // private method
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new ot();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
const L0 = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, I0 = `
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
class D0 {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t, n) {
    if (this.texture === null) {
      const s = new _t(), r = e.properties.get(s);
      r.__webglTexture = t.texture, (t.depthNear != n.depthNear || t.depthFar != n.depthFar) && (this.depthNear = t.depthNear, this.depthFar = t.depthFar), this.texture = s;
    }
  }
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new qn({
        vertexShader: L0,
        fragmentShader: I0,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new St(new so(20, 20), n);
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
class N0 extends gi {
  constructor(e, t) {
    super();
    const n = this;
    let s = null, r = 1, o = null, a = "local-floor", c = 1, l = null, h = null, u = null, d = null, f = null, g = null;
    const _ = new D0(), p = t.getContextAttributes();
    let m = null, T = null;
    const y = [], S = [], D = new te();
    let R = null;
    const A = new Ct();
    A.layers.enable(1), A.viewport = new qe();
    const N = new Ct();
    N.layers.enable(2), N.viewport = new qe();
    const Y = [A, N], v = new C0();
    v.layers.enable(1), v.layers.enable(2);
    let E = null, z = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(W) {
      let Z = y[W];
      return Z === void 0 && (Z = new Ho(), y[W] = Z), Z.getTargetRaySpace();
    }, this.getControllerGrip = function(W) {
      let Z = y[W];
      return Z === void 0 && (Z = new Ho(), y[W] = Z), Z.getGripSpace();
    }, this.getHand = function(W) {
      let Z = y[W];
      return Z === void 0 && (Z = new Ho(), y[W] = Z), Z.getHandSpace();
    };
    function B(W) {
      const Z = S.indexOf(W.inputSource);
      if (Z === -1)
        return;
      const me = y[Z];
      me !== void 0 && (me.update(W.inputSource, W.frame, l || o), me.dispatchEvent({ type: W.type, data: W.inputSource }));
    }
    function H() {
      s.removeEventListener("select", B), s.removeEventListener("selectstart", B), s.removeEventListener("selectend", B), s.removeEventListener("squeeze", B), s.removeEventListener("squeezestart", B), s.removeEventListener("squeezeend", B), s.removeEventListener("end", H), s.removeEventListener("inputsourceschange", j);
      for (let W = 0; W < y.length; W++) {
        const Z = S[W];
        Z !== null && (S[W] = null, y[W].disconnect(Z));
      }
      E = null, z = null, _.reset(), e.setRenderTarget(m), f = null, d = null, u = null, s = null, T = null, Ke.stop(), n.isPresenting = !1, e.setPixelRatio(R), e.setSize(D.width, D.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(W) {
      r = W, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(W) {
      a = W, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return l || o;
    }, this.setReferenceSpace = function(W) {
      l = W;
    }, this.getBaseLayer = function() {
      return d !== null ? d : f;
    }, this.getBinding = function() {
      return u;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return s;
    }, this.setSession = async function(W) {
      if (s = W, s !== null) {
        if (m = e.getRenderTarget(), s.addEventListener("select", B), s.addEventListener("selectstart", B), s.addEventListener("selectend", B), s.addEventListener("squeeze", B), s.addEventListener("squeezestart", B), s.addEventListener("squeezeend", B), s.addEventListener("end", H), s.addEventListener("inputsourceschange", j), p.xrCompatible !== !0 && await t.makeXRCompatible(), R = e.getPixelRatio(), e.getSize(D), s.renderState.layers === void 0) {
          const Z = {
            antialias: p.antialias,
            alpha: !0,
            depth: p.depth,
            stencil: p.stencil,
            framebufferScaleFactor: r
          };
          f = new XRWebGLLayer(s, t, Z), s.updateRenderState({ baseLayer: f }), e.setPixelRatio(1), e.setSize(f.framebufferWidth, f.framebufferHeight, !1), T = new pi(
            f.framebufferWidth,
            f.framebufferHeight,
            {
              format: Yt,
              type: Rn,
              colorSpace: e.outputColorSpace,
              stencilBuffer: p.stencil
            }
          );
        } else {
          let Z = null, me = null, he = null;
          p.depth && (he = p.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, Z = p.stencil ? ns : Xi, me = p.stencil ? ts : fi);
          const Pe = {
            colorFormat: t.RGBA8,
            depthFormat: he,
            scaleFactor: r
          };
          u = new XRWebGLBinding(s, t), d = u.createProjectionLayer(Pe), s.updateRenderState({ layers: [d] }), e.setPixelRatio(1), e.setSize(d.textureWidth, d.textureHeight, !1), T = new pi(
            d.textureWidth,
            d.textureHeight,
            {
              format: Yt,
              type: Rn,
              depthTexture: new pu(d.textureWidth, d.textureHeight, me, void 0, void 0, void 0, void 0, void 0, void 0, Z),
              stencilBuffer: p.stencil,
              colorSpace: e.outputColorSpace,
              samples: p.antialias ? 4 : 0,
              resolveDepthBuffer: d.ignoreDepthValues === !1
            }
          );
        }
        T.isXRRenderTarget = !0, this.setFoveation(c), l = null, o = await s.requestReferenceSpace(a), Ke.setContext(s), Ke.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (s !== null)
        return s.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return _.getDepthTexture();
    };
    function j(W) {
      for (let Z = 0; Z < W.removed.length; Z++) {
        const me = W.removed[Z], he = S.indexOf(me);
        he >= 0 && (S[he] = null, y[he].disconnect(me));
      }
      for (let Z = 0; Z < W.added.length; Z++) {
        const me = W.added[Z];
        let he = S.indexOf(me);
        if (he === -1) {
          for (let Ee = 0; Ee < y.length; Ee++)
            if (Ee >= S.length) {
              S.push(me), he = Ee;
              break;
            } else if (S[Ee] === null) {
              S[Ee] = me, he = Ee;
              break;
            }
          if (he === -1) break;
        }
        const Pe = y[he];
        Pe && Pe.connect(me);
      }
    }
    const k = new w(), Q = new w();
    function G(W, Z, me) {
      k.setFromMatrixPosition(Z.matrixWorld), Q.setFromMatrixPosition(me.matrixWorld);
      const he = k.distanceTo(Q), Pe = Z.projectionMatrix.elements, Ee = me.projectionMatrix.elements, ze = Pe[14] / (Pe[10] - 1), et = Pe[14] / (Pe[10] + 1), ke = (Pe[9] + 1) / Pe[5], C = (Pe[9] - 1) / Pe[5], Ft = (Pe[8] - 1) / Pe[0], Fe = (Ee[8] + 1) / Ee[0], Ve = ze * Ft, be = ze * Fe, it = he / (-Ft + Fe), Re = it * -Ft;
      if (Z.matrixWorld.decompose(W.position, W.quaternion, W.scale), W.translateX(Re), W.translateZ(it), W.matrixWorld.compose(W.position, W.quaternion, W.scale), W.matrixWorldInverse.copy(W.matrixWorld).invert(), Pe[10] === -1)
        W.projectionMatrix.copy(Z.projectionMatrix), W.projectionMatrixInverse.copy(Z.projectionMatrixInverse);
      else {
        const b = ze + it, x = et + it, U = Ve - Re, $ = be + (he - Re), K = ke * et / x * b, X = C * et / x * b;
        W.projectionMatrix.makePerspective(U, $, K, X, b, x), W.projectionMatrixInverse.copy(W.projectionMatrix).invert();
      }
    }
    function ce(W, Z) {
      Z === null ? W.matrixWorld.copy(W.matrix) : W.matrixWorld.multiplyMatrices(Z.matrixWorld, W.matrix), W.matrixWorldInverse.copy(W.matrixWorld).invert();
    }
    this.updateCamera = function(W) {
      if (s === null) return;
      let Z = W.near, me = W.far;
      _.texture !== null && (_.depthNear > 0 && (Z = _.depthNear), _.depthFar > 0 && (me = _.depthFar)), v.near = N.near = A.near = Z, v.far = N.far = A.far = me, (E !== v.near || z !== v.far) && (s.updateRenderState({
        depthNear: v.near,
        depthFar: v.far
      }), E = v.near, z = v.far);
      const he = W.parent, Pe = v.cameras;
      ce(v, he);
      for (let Ee = 0; Ee < Pe.length; Ee++)
        ce(Pe[Ee], he);
      Pe.length === 2 ? G(v, A, N) : v.projectionMatrix.copy(A.projectionMatrix), le(W, v, he);
    };
    function le(W, Z, me) {
      me === null ? W.matrix.copy(Z.matrixWorld) : (W.matrix.copy(me.matrixWorld), W.matrix.invert(), W.matrix.multiply(Z.matrixWorld)), W.matrix.decompose(W.position, W.quaternion, W.scale), W.updateMatrixWorld(!0), W.projectionMatrix.copy(Z.projectionMatrix), W.projectionMatrixInverse.copy(Z.projectionMatrixInverse), W.isPerspectiveCamera && (W.fov = is * 2 * Math.atan(1 / W.projectionMatrix.elements[5]), W.zoom = 1);
    }
    this.getCamera = function() {
      return v;
    }, this.getFoveation = function() {
      if (!(d === null && f === null))
        return c;
    }, this.setFoveation = function(W) {
      c = W, d !== null && (d.fixedFoveation = W), f !== null && f.fixedFoveation !== void 0 && (f.fixedFoveation = W);
    }, this.hasDepthSensing = function() {
      return _.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return _.getMesh(v);
    };
    let _e = null;
    function Xe(W, Z) {
      if (h = Z.getViewerPose(l || o), g = Z, h !== null) {
        const me = h.views;
        f !== null && (e.setRenderTargetFramebuffer(T, f.framebuffer), e.setRenderTarget(T));
        let he = !1;
        me.length !== v.cameras.length && (v.cameras.length = 0, he = !0);
        for (let Ee = 0; Ee < me.length; Ee++) {
          const ze = me[Ee];
          let et = null;
          if (f !== null)
            et = f.getViewport(ze);
          else {
            const C = u.getViewSubImage(d, ze);
            et = C.viewport, Ee === 0 && (e.setRenderTargetTextures(
              T,
              C.colorTexture,
              d.ignoreDepthValues ? void 0 : C.depthStencilTexture
            ), e.setRenderTarget(T));
          }
          let ke = Y[Ee];
          ke === void 0 && (ke = new Ct(), ke.layers.enable(Ee), ke.viewport = new qe(), Y[Ee] = ke), ke.matrix.fromArray(ze.transform.matrix), ke.matrix.decompose(ke.position, ke.quaternion, ke.scale), ke.projectionMatrix.fromArray(ze.projectionMatrix), ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(), ke.viewport.set(et.x, et.y, et.width, et.height), Ee === 0 && (v.matrix.copy(ke.matrix), v.matrix.decompose(v.position, v.quaternion, v.scale)), he === !0 && v.cameras.push(ke);
        }
        const Pe = s.enabledFeatures;
        if (Pe && Pe.includes("depth-sensing")) {
          const Ee = u.getDepthInformation(me[0]);
          Ee && Ee.isValid && Ee.texture && _.init(e, Ee, s.renderState);
        }
      }
      for (let me = 0; me < y.length; me++) {
        const he = S[me], Pe = y[me];
        he !== null && Pe !== void 0 && Pe.update(he, Z, l || o);
      }
      _e && _e(W, Z), Z.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: Z }), g = null;
    }
    const Ke = new fu();
    Ke.setAnimationLoop(Xe), this.setAnimationLoop = function(W) {
      _e = W;
    }, this.dispose = function() {
    };
  }
}
const si = /* @__PURE__ */ new ln(), U0 = /* @__PURE__ */ new Ce();
function O0(i, e) {
  function t(p, m) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), m.value.copy(p.matrix);
  }
  function n(p, m) {
    m.color.getRGB(p.fogColor.value, hu(i)), m.isFog ? (p.fogNear.value = m.near, p.fogFar.value = m.far) : m.isFogExp2 && (p.fogDensity.value = m.density);
  }
  function s(p, m, T, y, S) {
    m.isMeshBasicMaterial || m.isMeshLambertMaterial ? r(p, m) : m.isMeshToonMaterial ? (r(p, m), u(p, m)) : m.isMeshPhongMaterial ? (r(p, m), h(p, m)) : m.isMeshStandardMaterial ? (r(p, m), d(p, m), m.isMeshPhysicalMaterial && f(p, m, S)) : m.isMeshMatcapMaterial ? (r(p, m), g(p, m)) : m.isMeshDepthMaterial ? r(p, m) : m.isMeshDistanceMaterial ? (r(p, m), _(p, m)) : m.isMeshNormalMaterial ? r(p, m) : m.isLineBasicMaterial ? (o(p, m), m.isLineDashedMaterial && a(p, m)) : m.isPointsMaterial ? c(p, m, T, y) : m.isSpriteMaterial ? l(p, m) : m.isShadowMaterial ? (p.color.value.copy(m.color), p.opacity.value = m.opacity) : m.isShaderMaterial && (m.uniformsNeedUpdate = !1);
  }
  function r(p, m) {
    p.opacity.value = m.opacity, m.color && p.diffuse.value.copy(m.color), m.emissive && p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity), m.map && (p.map.value = m.map, t(m.map, p.mapTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, t(m.alphaMap, p.alphaMapTransform)), m.bumpMap && (p.bumpMap.value = m.bumpMap, t(m.bumpMap, p.bumpMapTransform), p.bumpScale.value = m.bumpScale, m.side === Ot && (p.bumpScale.value *= -1)), m.normalMap && (p.normalMap.value = m.normalMap, t(m.normalMap, p.normalMapTransform), p.normalScale.value.copy(m.normalScale), m.side === Ot && p.normalScale.value.negate()), m.displacementMap && (p.displacementMap.value = m.displacementMap, t(m.displacementMap, p.displacementMapTransform), p.displacementScale.value = m.displacementScale, p.displacementBias.value = m.displacementBias), m.emissiveMap && (p.emissiveMap.value = m.emissiveMap, t(m.emissiveMap, p.emissiveMapTransform)), m.specularMap && (p.specularMap.value = m.specularMap, t(m.specularMap, p.specularMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
    const T = e.get(m), y = T.envMap, S = T.envMapRotation;
    y && (p.envMap.value = y, si.copy(S), si.x *= -1, si.y *= -1, si.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === !1 && (si.y *= -1, si.z *= -1), p.envMapRotation.value.setFromMatrix4(U0.makeRotationFromEuler(si)), p.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = m.reflectivity, p.ior.value = m.ior, p.refractionRatio.value = m.refractionRatio), m.lightMap && (p.lightMap.value = m.lightMap, p.lightMapIntensity.value = m.lightMapIntensity, t(m.lightMap, p.lightMapTransform)), m.aoMap && (p.aoMap.value = m.aoMap, p.aoMapIntensity.value = m.aoMapIntensity, t(m.aoMap, p.aoMapTransform));
  }
  function o(p, m) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, m.map && (p.map.value = m.map, t(m.map, p.mapTransform));
  }
  function a(p, m) {
    p.dashSize.value = m.dashSize, p.totalSize.value = m.dashSize + m.gapSize, p.scale.value = m.scale;
  }
  function c(p, m, T, y) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, p.size.value = m.size * T, p.scale.value = y * 0.5, m.map && (p.map.value = m.map, t(m.map, p.uvTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, t(m.alphaMap, p.alphaMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
  }
  function l(p, m) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, p.rotation.value = m.rotation, m.map && (p.map.value = m.map, t(m.map, p.mapTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, t(m.alphaMap, p.alphaMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
  }
  function h(p, m) {
    p.specular.value.copy(m.specular), p.shininess.value = Math.max(m.shininess, 1e-4);
  }
  function u(p, m) {
    m.gradientMap && (p.gradientMap.value = m.gradientMap);
  }
  function d(p, m) {
    p.metalness.value = m.metalness, m.metalnessMap && (p.metalnessMap.value = m.metalnessMap, t(m.metalnessMap, p.metalnessMapTransform)), p.roughness.value = m.roughness, m.roughnessMap && (p.roughnessMap.value = m.roughnessMap, t(m.roughnessMap, p.roughnessMapTransform)), m.envMap && (p.envMapIntensity.value = m.envMapIntensity);
  }
  function f(p, m, T) {
    p.ior.value = m.ior, m.sheen > 0 && (p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen), p.sheenRoughness.value = m.sheenRoughness, m.sheenColorMap && (p.sheenColorMap.value = m.sheenColorMap, t(m.sheenColorMap, p.sheenColorMapTransform)), m.sheenRoughnessMap && (p.sheenRoughnessMap.value = m.sheenRoughnessMap, t(m.sheenRoughnessMap, p.sheenRoughnessMapTransform))), m.clearcoat > 0 && (p.clearcoat.value = m.clearcoat, p.clearcoatRoughness.value = m.clearcoatRoughness, m.clearcoatMap && (p.clearcoatMap.value = m.clearcoatMap, t(m.clearcoatMap, p.clearcoatMapTransform)), m.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = m.clearcoatRoughnessMap, t(m.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), m.clearcoatNormalMap && (p.clearcoatNormalMap.value = m.clearcoatNormalMap, t(m.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale), m.side === Ot && p.clearcoatNormalScale.value.negate())), m.dispersion > 0 && (p.dispersion.value = m.dispersion), m.iridescence > 0 && (p.iridescence.value = m.iridescence, p.iridescenceIOR.value = m.iridescenceIOR, p.iridescenceThicknessMinimum.value = m.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = m.iridescenceThicknessRange[1], m.iridescenceMap && (p.iridescenceMap.value = m.iridescenceMap, t(m.iridescenceMap, p.iridescenceMapTransform)), m.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = m.iridescenceThicknessMap, t(m.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), m.transmission > 0 && (p.transmission.value = m.transmission, p.transmissionSamplerMap.value = T.texture, p.transmissionSamplerSize.value.set(T.width, T.height), m.transmissionMap && (p.transmissionMap.value = m.transmissionMap, t(m.transmissionMap, p.transmissionMapTransform)), p.thickness.value = m.thickness, m.thicknessMap && (p.thicknessMap.value = m.thicknessMap, t(m.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = m.attenuationDistance, p.attenuationColor.value.copy(m.attenuationColor)), m.anisotropy > 0 && (p.anisotropyVector.value.set(m.anisotropy * Math.cos(m.anisotropyRotation), m.anisotropy * Math.sin(m.anisotropyRotation)), m.anisotropyMap && (p.anisotropyMap.value = m.anisotropyMap, t(m.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = m.specularIntensity, p.specularColor.value.copy(m.specularColor), m.specularColorMap && (p.specularColorMap.value = m.specularColorMap, t(m.specularColorMap, p.specularColorMapTransform)), m.specularIntensityMap && (p.specularIntensityMap.value = m.specularIntensityMap, t(m.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function g(p, m) {
    m.matcap && (p.matcap.value = m.matcap);
  }
  function _(p, m) {
    const T = e.get(m).light;
    p.referencePosition.value.setFromMatrixPosition(T.matrixWorld), p.nearDistance.value = T.shadow.camera.near, p.farDistance.value = T.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: s
  };
}
function F0(i, e, t, n) {
  let s = {}, r = {}, o = [];
  const a = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(T, y) {
    const S = y.program;
    n.uniformBlockBinding(T, S);
  }
  function l(T, y) {
    let S = s[T.id];
    S === void 0 && (g(T), S = h(T), s[T.id] = S, T.addEventListener("dispose", p));
    const D = y.program;
    n.updateUBOMapping(T, D);
    const R = e.render.frame;
    r[T.id] !== R && (d(T), r[T.id] = R);
  }
  function h(T) {
    const y = u();
    T.__bindingPointIndex = y;
    const S = i.createBuffer(), D = T.__size, R = T.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, S), i.bufferData(i.UNIFORM_BUFFER, D, R), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, y, S), S;
  }
  function u() {
    for (let T = 0; T < a; T++)
      if (o.indexOf(T) === -1)
        return o.push(T), T;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(T) {
    const y = s[T.id], S = T.uniforms, D = T.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, y);
    for (let R = 0, A = S.length; R < A; R++) {
      const N = Array.isArray(S[R]) ? S[R] : [S[R]];
      for (let Y = 0, v = N.length; Y < v; Y++) {
        const E = N[Y];
        if (f(E, R, Y, D) === !0) {
          const z = E.__offset, B = Array.isArray(E.value) ? E.value : [E.value];
          let H = 0;
          for (let j = 0; j < B.length; j++) {
            const k = B[j], Q = _(k);
            typeof k == "number" || typeof k == "boolean" ? (E.__data[0] = k, i.bufferSubData(i.UNIFORM_BUFFER, z + H, E.__data)) : k.isMatrix3 ? (E.__data[0] = k.elements[0], E.__data[1] = k.elements[1], E.__data[2] = k.elements[2], E.__data[3] = 0, E.__data[4] = k.elements[3], E.__data[5] = k.elements[4], E.__data[6] = k.elements[5], E.__data[7] = 0, E.__data[8] = k.elements[6], E.__data[9] = k.elements[7], E.__data[10] = k.elements[8], E.__data[11] = 0) : (k.toArray(E.__data, H), H += Q.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, z, E.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function f(T, y, S, D) {
    const R = T.value, A = y + "_" + S;
    if (D[A] === void 0)
      return typeof R == "number" || typeof R == "boolean" ? D[A] = R : D[A] = R.clone(), !0;
    {
      const N = D[A];
      if (typeof R == "number" || typeof R == "boolean") {
        if (N !== R)
          return D[A] = R, !0;
      } else if (N.equals(R) === !1)
        return N.copy(R), !0;
    }
    return !1;
  }
  function g(T) {
    const y = T.uniforms;
    let S = 0;
    const D = 16;
    for (let A = 0, N = y.length; A < N; A++) {
      const Y = Array.isArray(y[A]) ? y[A] : [y[A]];
      for (let v = 0, E = Y.length; v < E; v++) {
        const z = Y[v], B = Array.isArray(z.value) ? z.value : [z.value];
        for (let H = 0, j = B.length; H < j; H++) {
          const k = B[H], Q = _(k), G = S % D, ce = G % Q.boundary, le = G + ce;
          S += ce, le !== 0 && D - le < Q.storage && (S += D - le), z.__data = new Float32Array(Q.storage / Float32Array.BYTES_PER_ELEMENT), z.__offset = S, S += Q.storage;
        }
      }
    }
    const R = S % D;
    return R > 0 && (S += D - R), T.__size = S, T.__cache = {}, this;
  }
  function _(T) {
    const y = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof T == "number" || typeof T == "boolean" ? (y.boundary = 4, y.storage = 4) : T.isVector2 ? (y.boundary = 8, y.storage = 8) : T.isVector3 || T.isColor ? (y.boundary = 16, y.storage = 12) : T.isVector4 ? (y.boundary = 16, y.storage = 16) : T.isMatrix3 ? (y.boundary = 48, y.storage = 48) : T.isMatrix4 ? (y.boundary = 64, y.storage = 64) : T.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", T), y;
  }
  function p(T) {
    const y = T.target;
    y.removeEventListener("dispose", p);
    const S = o.indexOf(y.__bindingPointIndex);
    o.splice(S, 1), i.deleteBuffer(s[y.id]), delete s[y.id], delete r[y.id];
  }
  function m() {
    for (const T in s)
      i.deleteBuffer(s[T]);
    o = [], s = {}, r = {};
  }
  return {
    bind: c,
    update: l,
    dispose: m
  };
}
class B0 {
  constructor(e = {}) {
    const {
      canvas: t = bf(),
      context: n = null,
      depth: s = !0,
      stencil: r = !1,
      alpha: o = !1,
      antialias: a = !1,
      premultipliedAlpha: c = !0,
      preserveDrawingBuffer: l = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: u = !1
    } = e;
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
    const m = [], T = [];
    this.domElement = t, this.debug = {
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
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = Rt, this.toneMapping = $n, this.toneMappingExposure = 1;
    const y = this;
    let S = !1, D = 0, R = 0, A = null, N = -1, Y = null;
    const v = new qe(), E = new qe();
    let z = null;
    const B = new Me(0);
    let H = 0, j = t.width, k = t.height, Q = 1, G = null, ce = null;
    const le = new qe(0, 0, j, k), _e = new qe(0, 0, j, k);
    let Xe = !1;
    const Ke = new fc();
    let W = !1, Z = !1;
    const me = new Ce(), he = new Ce(), Pe = new w(), Ee = new qe(), ze = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let et = !1;
    function ke() {
      return A === null ? Q : 1;
    }
    let C = n;
    function Ft(M, L) {
      return t.getContext(M, L);
    }
    try {
      const M = {
        alpha: !0,
        depth: s,
        stencil: r,
        antialias: a,
        premultipliedAlpha: c,
        preserveDrawingBuffer: l,
        powerPreference: h,
        failIfMajorPerformanceCaveat: u
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${nc}`), t.addEventListener("webglcontextlost", q, !1), t.addEventListener("webglcontextrestored", se, !1), t.addEventListener("webglcontextcreationerror", ae, !1), C === null) {
        const L = "webgl2";
        if (C = Ft(L, M), C === null)
          throw Ft(L) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (M) {
      throw console.error("THREE.WebGLRenderer: " + M.message), M;
    }
    let Fe, Ve, be, it, Re, b, x, U, $, K, X, ve, ie, ue, Ge, J, de, Ae, we, fe, Be, Le, nt, P;
    function oe() {
      Fe = new Gg(C), Fe.init(), Le = new R0(C, Fe), Ve = new Fg(C, Fe, e, Le), be = new b0(C), Ve.reverseDepthBuffer && be.buffers.depth.setReversed(!0), it = new $g(C), Re = new h0(), b = new w0(C, Fe, be, Re, Ve, Le, it), x = new zg(y), U = new Vg(y), $ = new Qf(C), nt = new Ug(C, $), K = new Wg(C, $, it, nt), X = new Yg(C, K, $, it), we = new qg(C, Ve, b), J = new Bg(Re), ve = new l0(y, x, U, Fe, Ve, nt, J), ie = new O0(y, Re), ue = new d0(), Ge = new v0(Fe), Ae = new Ng(y, x, U, be, X, d, c), de = new E0(y, X, Ve), P = new F0(C, it, Ve, be), fe = new Og(C, Fe, it), Be = new Xg(C, Fe, it), it.programs = ve.programs, y.capabilities = Ve, y.extensions = Fe, y.properties = Re, y.renderLists = ue, y.shadowMap = de, y.state = be, y.info = it;
    }
    oe();
    const V = new N0(y, C);
    this.xr = V, this.getContext = function() {
      return C;
    }, this.getContextAttributes = function() {
      return C.getContextAttributes();
    }, this.forceContextLoss = function() {
      const M = Fe.get("WEBGL_lose_context");
      M && M.loseContext();
    }, this.forceContextRestore = function() {
      const M = Fe.get("WEBGL_lose_context");
      M && M.restoreContext();
    }, this.getPixelRatio = function() {
      return Q;
    }, this.setPixelRatio = function(M) {
      M !== void 0 && (Q = M, this.setSize(j, k, !1));
    }, this.getSize = function(M) {
      return M.set(j, k);
    }, this.setSize = function(M, L, O = !0) {
      if (V.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      j = M, k = L, t.width = Math.floor(M * Q), t.height = Math.floor(L * Q), O === !0 && (t.style.width = M + "px", t.style.height = L + "px"), this.setViewport(0, 0, M, L);
    }, this.getDrawingBufferSize = function(M) {
      return M.set(j * Q, k * Q).floor();
    }, this.setDrawingBufferSize = function(M, L, O) {
      j = M, k = L, Q = O, t.width = Math.floor(M * O), t.height = Math.floor(L * O), this.setViewport(0, 0, M, L);
    }, this.getCurrentViewport = function(M) {
      return M.copy(v);
    }, this.getViewport = function(M) {
      return M.copy(le);
    }, this.setViewport = function(M, L, O, F) {
      M.isVector4 ? le.set(M.x, M.y, M.z, M.w) : le.set(M, L, O, F), be.viewport(v.copy(le).multiplyScalar(Q).round());
    }, this.getScissor = function(M) {
      return M.copy(_e);
    }, this.setScissor = function(M, L, O, F) {
      M.isVector4 ? _e.set(M.x, M.y, M.z, M.w) : _e.set(M, L, O, F), be.scissor(E.copy(_e).multiplyScalar(Q).round());
    }, this.getScissorTest = function() {
      return Xe;
    }, this.setScissorTest = function(M) {
      be.setScissorTest(Xe = M);
    }, this.setOpaqueSort = function(M) {
      G = M;
    }, this.setTransparentSort = function(M) {
      ce = M;
    }, this.getClearColor = function(M) {
      return M.copy(Ae.getClearColor());
    }, this.setClearColor = function() {
      Ae.setClearColor.apply(Ae, arguments);
    }, this.getClearAlpha = function() {
      return Ae.getClearAlpha();
    }, this.setClearAlpha = function() {
      Ae.setClearAlpha.apply(Ae, arguments);
    }, this.clear = function(M = !0, L = !0, O = !0) {
      let F = 0;
      if (M) {
        let I = !1;
        if (A !== null) {
          const ee = A.texture.format;
          I = ee === lc || ee === cc || ee === ac;
        }
        if (I) {
          const ee = A.texture.type, re = ee === Rn || ee === fi || ee === ks || ee === ts || ee === sc || ee === rc, pe = Ae.getClearColor(), ge = Ae.getClearAlpha(), Se = pe.r, Te = pe.g, xe = pe.b;
          re ? (f[0] = Se, f[1] = Te, f[2] = xe, f[3] = ge, C.clearBufferuiv(C.COLOR, 0, f)) : (g[0] = Se, g[1] = Te, g[2] = xe, g[3] = ge, C.clearBufferiv(C.COLOR, 0, g));
        } else
          F |= C.COLOR_BUFFER_BIT;
      }
      L && (F |= C.DEPTH_BUFFER_BIT, C.clearDepth(this.capabilities.reverseDepthBuffer ? 0 : 1)), O && (F |= C.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), C.clear(F);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", q, !1), t.removeEventListener("webglcontextrestored", se, !1), t.removeEventListener("webglcontextcreationerror", ae, !1), ue.dispose(), Ge.dispose(), Re.dispose(), x.dispose(), U.dispose(), X.dispose(), nt.dispose(), P.dispose(), ve.dispose(), V.dispose(), V.removeEventListener("sessionstart", wc), V.removeEventListener("sessionend", Rc), Zn.stop();
    };
    function q(M) {
      M.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), S = !0;
    }
    function se() {
      console.log("THREE.WebGLRenderer: Context Restored."), S = !1;
      const M = it.autoReset, L = de.enabled, O = de.autoUpdate, F = de.needsUpdate, I = de.type;
      oe(), it.autoReset = M, de.enabled = L, de.autoUpdate = O, de.needsUpdate = F, de.type = I;
    }
    function ae(M) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", M.statusMessage);
    }
    function He(M) {
      const L = M.target;
      L.removeEventListener("dispose", He), ft(L);
    }
    function ft(M) {
      Dt(M), Re.remove(M);
    }
    function Dt(M) {
      const L = Re.get(M).programs;
      L !== void 0 && (L.forEach(function(O) {
        ve.releaseProgram(O);
      }), M.isShaderMaterial && ve.releaseShaderCache(M));
    }
    this.renderBufferDirect = function(M, L, O, F, I, ee) {
      L === null && (L = ze);
      const re = I.isMesh && I.matrixWorld.determinant() < 0, pe = Wu(M, L, O, F, I);
      be.setMaterial(F, re);
      let ge = O.index, Se = 1;
      if (F.wireframe === !0) {
        if (ge = K.getWireframeAttribute(O), ge === void 0) return;
        Se = 2;
      }
      const Te = O.drawRange, xe = O.attributes.position;
      let Ze = Te.start * Se, st = (Te.start + Te.count) * Se;
      ee !== null && (Ze = Math.max(Ze, ee.start * Se), st = Math.min(st, (ee.start + ee.count) * Se)), ge !== null ? (Ze = Math.max(Ze, 0), st = Math.min(st, ge.count)) : xe != null && (Ze = Math.max(Ze, 0), st = Math.min(st, xe.count));
      const ht = st - Ze;
      if (ht < 0 || ht === 1 / 0) return;
      nt.setup(I, F, pe, O, ge);
      let Bt, Ye = fe;
      if (ge !== null && (Bt = $.get(ge), Ye = Be, Ye.setIndex(Bt)), I.isMesh)
        F.wireframe === !0 ? (be.setLineWidth(F.wireframeLinewidth * ke()), Ye.setMode(C.LINES)) : Ye.setMode(C.TRIANGLES);
      else if (I.isLine) {
        let ye = F.linewidth;
        ye === void 0 && (ye = 1), be.setLineWidth(ye * ke()), I.isLineSegments ? Ye.setMode(C.LINES) : I.isLineLoop ? Ye.setMode(C.LINE_LOOP) : Ye.setMode(C.LINE_STRIP);
      } else I.isPoints ? Ye.setMode(C.POINTS) : I.isSprite && Ye.setMode(C.TRIANGLES);
      if (I.isBatchedMesh)
        if (I._multiDrawInstances !== null)
          Ye.renderMultiDrawInstances(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount, I._multiDrawInstances);
        else if (Fe.get("WEBGL_multi_draw"))
          Ye.renderMultiDraw(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount);
        else {
          const ye = I._multiDrawStarts, Mt = I._multiDrawCounts, je = I._multiDrawCount, Kt = ge ? $.get(ge).bytesPerElement : 1, vi = Re.get(F).currentProgram.getUniforms();
          for (let zt = 0; zt < je; zt++)
            vi.setValue(C, "_gl_DrawID", zt), Ye.render(ye[zt] / Kt, Mt[zt]);
        }
      else if (I.isInstancedMesh)
        Ye.renderInstances(Ze, ht, I.count);
      else if (O.isInstancedBufferGeometry) {
        const ye = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, Mt = Math.min(O.instanceCount, ye);
        Ye.renderInstances(Ze, ht, Mt);
      } else
        Ye.render(Ze, ht);
    };
    function $e(M, L, O) {
      M.transparent === !0 && M.side === tn && M.forceSinglePass === !1 ? (M.side = Ot, M.needsUpdate = !0, er(M, L, O), M.side = wn, M.needsUpdate = !0, er(M, L, O), M.side = tn) : er(M, L, O);
    }
    this.compile = function(M, L, O = null) {
      O === null && (O = M), p = Ge.get(O), p.init(L), T.push(p), O.traverseVisible(function(I) {
        I.isLight && I.layers.test(L.layers) && (p.pushLight(I), I.castShadow && p.pushShadow(I));
      }), M !== O && M.traverseVisible(function(I) {
        I.isLight && I.layers.test(L.layers) && (p.pushLight(I), I.castShadow && p.pushShadow(I));
      }), p.setupLights();
      const F = /* @__PURE__ */ new Set();
      return M.traverse(function(I) {
        if (!(I.isMesh || I.isPoints || I.isLine || I.isSprite))
          return;
        const ee = I.material;
        if (ee)
          if (Array.isArray(ee))
            for (let re = 0; re < ee.length; re++) {
              const pe = ee[re];
              $e(pe, O, I), F.add(pe);
            }
          else
            $e(ee, O, I), F.add(ee);
      }), T.pop(), p = null, F;
    }, this.compileAsync = function(M, L, O = null) {
      const F = this.compile(M, L, O);
      return new Promise((I) => {
        function ee() {
          if (F.forEach(function(re) {
            Re.get(re).currentProgram.isReady() && F.delete(re);
          }), F.size === 0) {
            I(M);
            return;
          }
          setTimeout(ee, 10);
        }
        Fe.get("KHR_parallel_shader_compile") !== null ? ee() : setTimeout(ee, 10);
      });
    };
    let Nt = null;
    function mn(M) {
      Nt && Nt(M);
    }
    function wc() {
      Zn.stop();
    }
    function Rc() {
      Zn.start();
    }
    const Zn = new fu();
    Zn.setAnimationLoop(mn), typeof self < "u" && Zn.setContext(self), this.setAnimationLoop = function(M) {
      Nt = M, V.setAnimationLoop(M), M === null ? Zn.stop() : Zn.start();
    }, V.addEventListener("sessionstart", wc), V.addEventListener("sessionend", Rc), this.render = function(M, L) {
      if (L !== void 0 && L.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (S === !0) return;
      if (M.matrixWorldAutoUpdate === !0 && M.updateMatrixWorld(), L.parent === null && L.matrixWorldAutoUpdate === !0 && L.updateMatrixWorld(), V.enabled === !0 && V.isPresenting === !0 && (V.cameraAutoUpdate === !0 && V.updateCamera(L), L = V.getCamera()), M.isScene === !0 && M.onBeforeRender(y, M, L, A), p = Ge.get(M, T.length), p.init(L), T.push(p), he.multiplyMatrices(L.projectionMatrix, L.matrixWorldInverse), Ke.setFromProjectionMatrix(he), Z = this.localClippingEnabled, W = J.init(this.clippingPlanes, Z), _ = ue.get(M, m.length), _.init(), m.push(_), V.enabled === !0 && V.isPresenting === !0) {
        const ee = y.xr.getDepthSensingMesh();
        ee !== null && ao(ee, L, -1 / 0, y.sortObjects);
      }
      ao(M, L, 0, y.sortObjects), _.finish(), y.sortObjects === !0 && _.sort(G, ce), et = V.enabled === !1 || V.isPresenting === !1 || V.hasDepthSensing() === !1, et && Ae.addToRenderList(_, M), this.info.render.frame++, W === !0 && J.beginShadows();
      const O = p.state.shadowsArray;
      de.render(O, M, L), W === !0 && J.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const F = _.opaque, I = _.transmissive;
      if (p.setupLights(), L.isArrayCamera) {
        const ee = L.cameras;
        if (I.length > 0)
          for (let re = 0, pe = ee.length; re < pe; re++) {
            const ge = ee[re];
            Pc(F, I, M, ge);
          }
        et && Ae.render(M);
        for (let re = 0, pe = ee.length; re < pe; re++) {
          const ge = ee[re];
          Cc(_, M, ge, ge.viewport);
        }
      } else
        I.length > 0 && Pc(F, I, M, L), et && Ae.render(M), Cc(_, M, L);
      A !== null && (b.updateMultisampleRenderTarget(A), b.updateRenderTargetMipmap(A)), M.isScene === !0 && M.onAfterRender(y, M, L), nt.resetDefaultState(), N = -1, Y = null, T.pop(), T.length > 0 ? (p = T[T.length - 1], W === !0 && J.setGlobalState(y.clippingPlanes, p.state.camera)) : p = null, m.pop(), m.length > 0 ? _ = m[m.length - 1] : _ = null;
    };
    function ao(M, L, O, F) {
      if (M.visible === !1) return;
      if (M.layers.test(L.layers)) {
        if (M.isGroup)
          O = M.renderOrder;
        else if (M.isLOD)
          M.autoUpdate === !0 && M.update(L);
        else if (M.isLight)
          p.pushLight(M), M.castShadow && p.pushShadow(M);
        else if (M.isSprite) {
          if (!M.frustumCulled || Ke.intersectsSprite(M)) {
            F && Ee.setFromMatrixPosition(M.matrixWorld).applyMatrix4(he);
            const re = X.update(M), pe = M.material;
            pe.visible && _.push(M, re, pe, O, Ee.z, null);
          }
        } else if ((M.isMesh || M.isLine || M.isPoints) && (!M.frustumCulled || Ke.intersectsObject(M))) {
          const re = X.update(M), pe = M.material;
          if (F && (M.boundingSphere !== void 0 ? (M.boundingSphere === null && M.computeBoundingSphere(), Ee.copy(M.boundingSphere.center)) : (re.boundingSphere === null && re.computeBoundingSphere(), Ee.copy(re.boundingSphere.center)), Ee.applyMatrix4(M.matrixWorld).applyMatrix4(he)), Array.isArray(pe)) {
            const ge = re.groups;
            for (let Se = 0, Te = ge.length; Se < Te; Se++) {
              const xe = ge[Se], Ze = pe[xe.materialIndex];
              Ze && Ze.visible && _.push(M, re, Ze, O, Ee.z, xe);
            }
          } else pe.visible && _.push(M, re, pe, O, Ee.z, null);
        }
      }
      const ee = M.children;
      for (let re = 0, pe = ee.length; re < pe; re++)
        ao(ee[re], L, O, F);
    }
    function Cc(M, L, O, F) {
      const I = M.opaque, ee = M.transmissive, re = M.transparent;
      p.setupLightsView(O), W === !0 && J.setGlobalState(y.clippingPlanes, O), F && be.viewport(v.copy(F)), I.length > 0 && Qs(I, L, O), ee.length > 0 && Qs(ee, L, O), re.length > 0 && Qs(re, L, O), be.buffers.depth.setTest(!0), be.buffers.depth.setMask(!0), be.buffers.color.setMask(!0), be.setPolygonOffset(!1);
    }
    function Pc(M, L, O, F) {
      if ((O.isScene === !0 ? O.overrideMaterial : null) !== null)
        return;
      p.state.transmissionRenderTarget[F.id] === void 0 && (p.state.transmissionRenderTarget[F.id] = new pi(1, 1, {
        generateMipmaps: !0,
        type: Fe.has("EXT_color_buffer_half_float") || Fe.has("EXT_color_buffer_float") ? js : Rn,
        minFilter: bn,
        samples: 4,
        stencilBuffer: r,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: We.workingColorSpace
      }));
      const ee = p.state.transmissionRenderTarget[F.id], re = F.viewport || v;
      ee.setSize(re.z, re.w);
      const pe = y.getRenderTarget();
      y.setRenderTarget(ee), y.getClearColor(B), H = y.getClearAlpha(), H < 1 && y.setClearColor(16777215, 0.5), y.clear(), et && Ae.render(O);
      const ge = y.toneMapping;
      y.toneMapping = $n;
      const Se = F.viewport;
      if (F.viewport !== void 0 && (F.viewport = void 0), p.setupLightsView(F), W === !0 && J.setGlobalState(y.clippingPlanes, F), Qs(M, O, F), b.updateMultisampleRenderTarget(ee), b.updateRenderTargetMipmap(ee), Fe.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Te = !1;
        for (let xe = 0, Ze = L.length; xe < Ze; xe++) {
          const st = L[xe], ht = st.object, Bt = st.geometry, Ye = st.material, ye = st.group;
          if (Ye.side === tn && ht.layers.test(F.layers)) {
            const Mt = Ye.side;
            Ye.side = Ot, Ye.needsUpdate = !0, Lc(ht, O, F, Bt, Ye, ye), Ye.side = Mt, Ye.needsUpdate = !0, Te = !0;
          }
        }
        Te === !0 && (b.updateMultisampleRenderTarget(ee), b.updateRenderTargetMipmap(ee));
      }
      y.setRenderTarget(pe), y.setClearColor(B, H), Se !== void 0 && (F.viewport = Se), y.toneMapping = ge;
    }
    function Qs(M, L, O) {
      const F = L.isScene === !0 ? L.overrideMaterial : null;
      for (let I = 0, ee = M.length; I < ee; I++) {
        const re = M[I], pe = re.object, ge = re.geometry, Se = F === null ? re.material : F, Te = re.group;
        pe.layers.test(O.layers) && Lc(pe, L, O, ge, Se, Te);
      }
    }
    function Lc(M, L, O, F, I, ee) {
      M.onBeforeRender(y, L, O, F, I, ee), M.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, M.matrixWorld), M.normalMatrix.getNormalMatrix(M.modelViewMatrix), I.onBeforeRender(y, L, O, F, M, ee), I.transparent === !0 && I.side === tn && I.forceSinglePass === !1 ? (I.side = Ot, I.needsUpdate = !0, y.renderBufferDirect(O, L, F, I, M, ee), I.side = wn, I.needsUpdate = !0, y.renderBufferDirect(O, L, F, I, M, ee), I.side = tn) : y.renderBufferDirect(O, L, F, I, M, ee), M.onAfterRender(y, L, O, F, I, ee);
    }
    function er(M, L, O) {
      L.isScene !== !0 && (L = ze);
      const F = Re.get(M), I = p.state.lights, ee = p.state.shadowsArray, re = I.state.version, pe = ve.getParameters(M, I.state, ee, L, O), ge = ve.getProgramCacheKey(pe);
      let Se = F.programs;
      F.environment = M.isMeshStandardMaterial ? L.environment : null, F.fog = L.fog, F.envMap = (M.isMeshStandardMaterial ? U : x).get(M.envMap || F.environment), F.envMapRotation = F.environment !== null && M.envMap === null ? L.environmentRotation : M.envMapRotation, Se === void 0 && (M.addEventListener("dispose", He), Se = /* @__PURE__ */ new Map(), F.programs = Se);
      let Te = Se.get(ge);
      if (Te !== void 0) {
        if (F.currentProgram === Te && F.lightsStateVersion === re)
          return Dc(M, pe), Te;
      } else
        pe.uniforms = ve.getUniforms(M), M.onBeforeCompile(pe, y), Te = ve.acquireProgram(pe, ge), Se.set(ge, Te), F.uniforms = pe.uniforms;
      const xe = F.uniforms;
      return (!M.isShaderMaterial && !M.isRawShaderMaterial || M.clipping === !0) && (xe.clippingPlanes = J.uniform), Dc(M, pe), F.needsLights = $u(M), F.lightsStateVersion = re, F.needsLights && (xe.ambientLightColor.value = I.state.ambient, xe.lightProbe.value = I.state.probe, xe.directionalLights.value = I.state.directional, xe.directionalLightShadows.value = I.state.directionalShadow, xe.spotLights.value = I.state.spot, xe.spotLightShadows.value = I.state.spotShadow, xe.rectAreaLights.value = I.state.rectArea, xe.ltc_1.value = I.state.rectAreaLTC1, xe.ltc_2.value = I.state.rectAreaLTC2, xe.pointLights.value = I.state.point, xe.pointLightShadows.value = I.state.pointShadow, xe.hemisphereLights.value = I.state.hemi, xe.directionalShadowMap.value = I.state.directionalShadowMap, xe.directionalShadowMatrix.value = I.state.directionalShadowMatrix, xe.spotShadowMap.value = I.state.spotShadowMap, xe.spotLightMatrix.value = I.state.spotLightMatrix, xe.spotLightMap.value = I.state.spotLightMap, xe.pointShadowMap.value = I.state.pointShadowMap, xe.pointShadowMatrix.value = I.state.pointShadowMatrix), F.currentProgram = Te, F.uniformsList = null, Te;
    }
    function Ic(M) {
      if (M.uniformsList === null) {
        const L = M.currentProgram.getUniforms();
        M.uniformsList = Wr.seqWithValue(L.seq, M.uniforms);
      }
      return M.uniformsList;
    }
    function Dc(M, L) {
      const O = Re.get(M);
      O.outputColorSpace = L.outputColorSpace, O.batching = L.batching, O.batchingColor = L.batchingColor, O.instancing = L.instancing, O.instancingColor = L.instancingColor, O.instancingMorph = L.instancingMorph, O.skinning = L.skinning, O.morphTargets = L.morphTargets, O.morphNormals = L.morphNormals, O.morphColors = L.morphColors, O.morphTargetsCount = L.morphTargetsCount, O.numClippingPlanes = L.numClippingPlanes, O.numIntersection = L.numClipIntersection, O.vertexAlphas = L.vertexAlphas, O.vertexTangents = L.vertexTangents, O.toneMapping = L.toneMapping;
    }
    function Wu(M, L, O, F, I) {
      L.isScene !== !0 && (L = ze), b.resetTextureUnits();
      const ee = L.fog, re = F.isMeshStandardMaterial ? L.environment : null, pe = A === null ? y.outputColorSpace : A.isXRRenderTarget === !0 ? A.texture.colorSpace : Et, ge = (F.isMeshStandardMaterial ? U : x).get(F.envMap || re), Se = F.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4, Te = !!O.attributes.tangent && (!!F.normalMap || F.anisotropy > 0), xe = !!O.morphAttributes.position, Ze = !!O.morphAttributes.normal, st = !!O.morphAttributes.color;
      let ht = $n;
      F.toneMapped && (A === null || A.isXRRenderTarget === !0) && (ht = y.toneMapping);
      const Bt = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, Ye = Bt !== void 0 ? Bt.length : 0, ye = Re.get(F), Mt = p.state.lights;
      if (W === !0 && (Z === !0 || M !== Y)) {
        const Wt = M === Y && F.id === N;
        J.setState(F, M, Wt);
      }
      let je = !1;
      F.version === ye.__version ? (ye.needsLights && ye.lightsStateVersion !== Mt.state.version || ye.outputColorSpace !== pe || I.isBatchedMesh && ye.batching === !1 || !I.isBatchedMesh && ye.batching === !0 || I.isBatchedMesh && ye.batchingColor === !0 && I.colorTexture === null || I.isBatchedMesh && ye.batchingColor === !1 && I.colorTexture !== null || I.isInstancedMesh && ye.instancing === !1 || !I.isInstancedMesh && ye.instancing === !0 || I.isSkinnedMesh && ye.skinning === !1 || !I.isSkinnedMesh && ye.skinning === !0 || I.isInstancedMesh && ye.instancingColor === !0 && I.instanceColor === null || I.isInstancedMesh && ye.instancingColor === !1 && I.instanceColor !== null || I.isInstancedMesh && ye.instancingMorph === !0 && I.morphTexture === null || I.isInstancedMesh && ye.instancingMorph === !1 && I.morphTexture !== null || ye.envMap !== ge || F.fog === !0 && ye.fog !== ee || ye.numClippingPlanes !== void 0 && (ye.numClippingPlanes !== J.numPlanes || ye.numIntersection !== J.numIntersection) || ye.vertexAlphas !== Se || ye.vertexTangents !== Te || ye.morphTargets !== xe || ye.morphNormals !== Ze || ye.morphColors !== st || ye.toneMapping !== ht || ye.morphTargetsCount !== Ye) && (je = !0) : (je = !0, ye.__version = F.version);
      let Kt = ye.currentProgram;
      je === !0 && (Kt = er(F, L, I));
      let vi = !1, zt = !1, co = !1;
      const ut = Kt.getUniforms(), Cn = ye.uniforms;
      if (be.useProgram(Kt.program) && (vi = !0, zt = !0, co = !0), F.id !== N && (N = F.id, zt = !0), vi || Y !== M) {
        Ve.reverseDepthBuffer ? (me.copy(M.projectionMatrix), wf(me), Rf(me), ut.setValue(C, "projectionMatrix", me)) : ut.setValue(C, "projectionMatrix", M.projectionMatrix), ut.setValue(C, "viewMatrix", M.matrixWorldInverse);
        const Wt = ut.map.cameraPosition;
        Wt !== void 0 && Wt.setValue(C, Pe.setFromMatrixPosition(M.matrixWorld)), Ve.logarithmicDepthBuffer && ut.setValue(
          C,
          "logDepthBufFC",
          2 / (Math.log(M.far + 1) / Math.LN2)
        ), (F.isMeshPhongMaterial || F.isMeshToonMaterial || F.isMeshLambertMaterial || F.isMeshBasicMaterial || F.isMeshStandardMaterial || F.isShaderMaterial) && ut.setValue(C, "isOrthographic", M.isOrthographicCamera === !0), Y !== M && (Y = M, zt = !0, co = !0);
      }
      if (I.isSkinnedMesh) {
        ut.setOptional(C, I, "bindMatrix"), ut.setOptional(C, I, "bindMatrixInverse");
        const Wt = I.skeleton;
        Wt && (Wt.boneTexture === null && Wt.computeBoneTexture(), ut.setValue(C, "boneTexture", Wt.boneTexture, b));
      }
      I.isBatchedMesh && (ut.setOptional(C, I, "batchingTexture"), ut.setValue(C, "batchingTexture", I._matricesTexture, b), ut.setOptional(C, I, "batchingIdTexture"), ut.setValue(C, "batchingIdTexture", I._indirectTexture, b), ut.setOptional(C, I, "batchingColorTexture"), I._colorsTexture !== null && ut.setValue(C, "batchingColorTexture", I._colorsTexture, b));
      const lo = O.morphAttributes;
      if ((lo.position !== void 0 || lo.normal !== void 0 || lo.color !== void 0) && we.update(I, O, Kt), (zt || ye.receiveShadow !== I.receiveShadow) && (ye.receiveShadow = I.receiveShadow, ut.setValue(C, "receiveShadow", I.receiveShadow)), F.isMeshGouraudMaterial && F.envMap !== null && (Cn.envMap.value = ge, Cn.flipEnvMap.value = ge.isCubeTexture && ge.isRenderTargetTexture === !1 ? -1 : 1), F.isMeshStandardMaterial && F.envMap === null && L.environment !== null && (Cn.envMapIntensity.value = L.environmentIntensity), zt && (ut.setValue(C, "toneMappingExposure", y.toneMappingExposure), ye.needsLights && Xu(Cn, co), ee && F.fog === !0 && ie.refreshFogUniforms(Cn, ee), ie.refreshMaterialUniforms(Cn, F, Q, k, p.state.transmissionRenderTarget[M.id]), Wr.upload(C, Ic(ye), Cn, b)), F.isShaderMaterial && F.uniformsNeedUpdate === !0 && (Wr.upload(C, Ic(ye), Cn, b), F.uniformsNeedUpdate = !1), F.isSpriteMaterial && ut.setValue(C, "center", I.center), ut.setValue(C, "modelViewMatrix", I.modelViewMatrix), ut.setValue(C, "normalMatrix", I.normalMatrix), ut.setValue(C, "modelMatrix", I.matrixWorld), F.isShaderMaterial || F.isRawShaderMaterial) {
        const Wt = F.uniformsGroups;
        for (let ho = 0, qu = Wt.length; ho < qu; ho++) {
          const Nc = Wt[ho];
          P.update(Nc, Kt), P.bind(Nc, Kt);
        }
      }
      return Kt;
    }
    function Xu(M, L) {
      M.ambientLightColor.needsUpdate = L, M.lightProbe.needsUpdate = L, M.directionalLights.needsUpdate = L, M.directionalLightShadows.needsUpdate = L, M.pointLights.needsUpdate = L, M.pointLightShadows.needsUpdate = L, M.spotLights.needsUpdate = L, M.spotLightShadows.needsUpdate = L, M.rectAreaLights.needsUpdate = L, M.hemisphereLights.needsUpdate = L;
    }
    function $u(M) {
      return M.isMeshLambertMaterial || M.isMeshToonMaterial || M.isMeshPhongMaterial || M.isMeshStandardMaterial || M.isShadowMaterial || M.isShaderMaterial && M.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return D;
    }, this.getActiveMipmapLevel = function() {
      return R;
    }, this.getRenderTarget = function() {
      return A;
    }, this.setRenderTargetTextures = function(M, L, O) {
      Re.get(M.texture).__webglTexture = L, Re.get(M.depthTexture).__webglTexture = O;
      const F = Re.get(M);
      F.__hasExternalTextures = !0, F.__autoAllocateDepthBuffer = O === void 0, F.__autoAllocateDepthBuffer || Fe.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), F.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(M, L) {
      const O = Re.get(M);
      O.__webglFramebuffer = L, O.__useDefaultFramebuffer = L === void 0;
    }, this.setRenderTarget = function(M, L = 0, O = 0) {
      A = M, D = L, R = O;
      let F = !0, I = null, ee = !1, re = !1;
      if (M) {
        const ge = Re.get(M);
        if (ge.__useDefaultFramebuffer !== void 0)
          be.bindFramebuffer(C.FRAMEBUFFER, null), F = !1;
        else if (ge.__webglFramebuffer === void 0)
          b.setupRenderTarget(M);
        else if (ge.__hasExternalTextures)
          b.rebindTextures(M, Re.get(M.texture).__webglTexture, Re.get(M.depthTexture).__webglTexture);
        else if (M.depthBuffer) {
          const xe = M.depthTexture;
          if (ge.__boundDepthTexture !== xe) {
            if (xe !== null && Re.has(xe) && (M.width !== xe.image.width || M.height !== xe.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            b.setupDepthRenderbuffer(M);
          }
        }
        const Se = M.texture;
        (Se.isData3DTexture || Se.isDataArrayTexture || Se.isCompressedArrayTexture) && (re = !0);
        const Te = Re.get(M).__webglFramebuffer;
        M.isWebGLCubeRenderTarget ? (Array.isArray(Te[L]) ? I = Te[L][O] : I = Te[L], ee = !0) : M.samples > 0 && b.useMultisampledRTT(M) === !1 ? I = Re.get(M).__webglMultisampledFramebuffer : Array.isArray(Te) ? I = Te[O] : I = Te, v.copy(M.viewport), E.copy(M.scissor), z = M.scissorTest;
      } else
        v.copy(le).multiplyScalar(Q).floor(), E.copy(_e).multiplyScalar(Q).floor(), z = Xe;
      if (be.bindFramebuffer(C.FRAMEBUFFER, I) && F && be.drawBuffers(M, I), be.viewport(v), be.scissor(E), be.setScissorTest(z), ee) {
        const ge = Re.get(M.texture);
        C.framebufferTexture2D(C.FRAMEBUFFER, C.COLOR_ATTACHMENT0, C.TEXTURE_CUBE_MAP_POSITIVE_X + L, ge.__webglTexture, O);
      } else if (re) {
        const ge = Re.get(M.texture), Se = L || 0;
        C.framebufferTextureLayer(C.FRAMEBUFFER, C.COLOR_ATTACHMENT0, ge.__webglTexture, O || 0, Se);
      }
      N = -1;
    }, this.readRenderTargetPixels = function(M, L, O, F, I, ee, re) {
      if (!(M && M.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let pe = Re.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && re !== void 0 && (pe = pe[re]), pe) {
        be.bindFramebuffer(C.FRAMEBUFFER, pe);
        try {
          const ge = M.texture, Se = ge.format, Te = ge.type;
          if (!Ve.textureFormatReadable(Se)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!Ve.textureTypeReadable(Te)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          L >= 0 && L <= M.width - F && O >= 0 && O <= M.height - I && C.readPixels(L, O, F, I, Le.convert(Se), Le.convert(Te), ee);
        } finally {
          const ge = A !== null ? Re.get(A).__webglFramebuffer : null;
          be.bindFramebuffer(C.FRAMEBUFFER, ge);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(M, L, O, F, I, ee, re) {
      if (!(M && M.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let pe = Re.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && re !== void 0 && (pe = pe[re]), pe) {
        const ge = M.texture, Se = ge.format, Te = ge.type;
        if (!Ve.textureFormatReadable(Se))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!Ve.textureTypeReadable(Te))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (L >= 0 && L <= M.width - F && O >= 0 && O <= M.height - I) {
          be.bindFramebuffer(C.FRAMEBUFFER, pe);
          const xe = C.createBuffer();
          C.bindBuffer(C.PIXEL_PACK_BUFFER, xe), C.bufferData(C.PIXEL_PACK_BUFFER, ee.byteLength, C.STREAM_READ), C.readPixels(L, O, F, I, Le.convert(Se), Le.convert(Te), 0);
          const Ze = A !== null ? Re.get(A).__webglFramebuffer : null;
          be.bindFramebuffer(C.FRAMEBUFFER, Ze);
          const st = C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return C.flush(), await Af(C, st, 4), C.bindBuffer(C.PIXEL_PACK_BUFFER, xe), C.getBufferSubData(C.PIXEL_PACK_BUFFER, 0, ee), C.deleteBuffer(xe), C.deleteSync(st), ee;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(M, L = null, O = 0) {
      M.isTexture !== !0 && (Gr("WebGLRenderer: copyFramebufferToTexture function signature has changed."), L = arguments[0] || null, M = arguments[1]);
      const F = Math.pow(2, -O), I = Math.floor(M.image.width * F), ee = Math.floor(M.image.height * F), re = L !== null ? L.x : 0, pe = L !== null ? L.y : 0;
      b.setTexture2D(M, 0), C.copyTexSubImage2D(C.TEXTURE_2D, O, 0, 0, re, pe, I, ee), be.unbindTexture();
    }, this.copyTextureToTexture = function(M, L, O = null, F = null, I = 0) {
      M.isTexture !== !0 && (Gr("WebGLRenderer: copyTextureToTexture function signature has changed."), F = arguments[0] || null, M = arguments[1], L = arguments[2], I = arguments[3] || 0, O = null);
      let ee, re, pe, ge, Se, Te;
      O !== null ? (ee = O.max.x - O.min.x, re = O.max.y - O.min.y, pe = O.min.x, ge = O.min.y) : (ee = M.image.width, re = M.image.height, pe = 0, ge = 0), F !== null ? (Se = F.x, Te = F.y) : (Se = 0, Te = 0);
      const xe = Le.convert(L.format), Ze = Le.convert(L.type);
      b.setTexture2D(L, 0), C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, L.flipY), C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL, L.premultiplyAlpha), C.pixelStorei(C.UNPACK_ALIGNMENT, L.unpackAlignment);
      const st = C.getParameter(C.UNPACK_ROW_LENGTH), ht = C.getParameter(C.UNPACK_IMAGE_HEIGHT), Bt = C.getParameter(C.UNPACK_SKIP_PIXELS), Ye = C.getParameter(C.UNPACK_SKIP_ROWS), ye = C.getParameter(C.UNPACK_SKIP_IMAGES), Mt = M.isCompressedTexture ? M.mipmaps[I] : M.image;
      C.pixelStorei(C.UNPACK_ROW_LENGTH, Mt.width), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, Mt.height), C.pixelStorei(C.UNPACK_SKIP_PIXELS, pe), C.pixelStorei(C.UNPACK_SKIP_ROWS, ge), M.isDataTexture ? C.texSubImage2D(C.TEXTURE_2D, I, Se, Te, ee, re, xe, Ze, Mt.data) : M.isCompressedTexture ? C.compressedTexSubImage2D(C.TEXTURE_2D, I, Se, Te, Mt.width, Mt.height, xe, Mt.data) : C.texSubImage2D(C.TEXTURE_2D, I, Se, Te, ee, re, xe, Ze, Mt), C.pixelStorei(C.UNPACK_ROW_LENGTH, st), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, ht), C.pixelStorei(C.UNPACK_SKIP_PIXELS, Bt), C.pixelStorei(C.UNPACK_SKIP_ROWS, Ye), C.pixelStorei(C.UNPACK_SKIP_IMAGES, ye), I === 0 && L.generateMipmaps && C.generateMipmap(C.TEXTURE_2D), be.unbindTexture();
    }, this.copyTextureToTexture3D = function(M, L, O = null, F = null, I = 0) {
      M.isTexture !== !0 && (Gr("WebGLRenderer: copyTextureToTexture3D function signature has changed."), O = arguments[0] || null, F = arguments[1] || null, M = arguments[2], L = arguments[3], I = arguments[4] || 0);
      let ee, re, pe, ge, Se, Te, xe, Ze, st;
      const ht = M.isCompressedTexture ? M.mipmaps[I] : M.image;
      O !== null ? (ee = O.max.x - O.min.x, re = O.max.y - O.min.y, pe = O.max.z - O.min.z, ge = O.min.x, Se = O.min.y, Te = O.min.z) : (ee = ht.width, re = ht.height, pe = ht.depth, ge = 0, Se = 0, Te = 0), F !== null ? (xe = F.x, Ze = F.y, st = F.z) : (xe = 0, Ze = 0, st = 0);
      const Bt = Le.convert(L.format), Ye = Le.convert(L.type);
      let ye;
      if (L.isData3DTexture)
        b.setTexture3D(L, 0), ye = C.TEXTURE_3D;
      else if (L.isDataArrayTexture || L.isCompressedArrayTexture)
        b.setTexture2DArray(L, 0), ye = C.TEXTURE_2D_ARRAY;
      else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, L.flipY), C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL, L.premultiplyAlpha), C.pixelStorei(C.UNPACK_ALIGNMENT, L.unpackAlignment);
      const Mt = C.getParameter(C.UNPACK_ROW_LENGTH), je = C.getParameter(C.UNPACK_IMAGE_HEIGHT), Kt = C.getParameter(C.UNPACK_SKIP_PIXELS), vi = C.getParameter(C.UNPACK_SKIP_ROWS), zt = C.getParameter(C.UNPACK_SKIP_IMAGES);
      C.pixelStorei(C.UNPACK_ROW_LENGTH, ht.width), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, ht.height), C.pixelStorei(C.UNPACK_SKIP_PIXELS, ge), C.pixelStorei(C.UNPACK_SKIP_ROWS, Se), C.pixelStorei(C.UNPACK_SKIP_IMAGES, Te), M.isDataTexture || M.isData3DTexture ? C.texSubImage3D(ye, I, xe, Ze, st, ee, re, pe, Bt, Ye, ht.data) : L.isCompressedArrayTexture ? C.compressedTexSubImage3D(ye, I, xe, Ze, st, ee, re, pe, Bt, ht.data) : C.texSubImage3D(ye, I, xe, Ze, st, ee, re, pe, Bt, Ye, ht), C.pixelStorei(C.UNPACK_ROW_LENGTH, Mt), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, je), C.pixelStorei(C.UNPACK_SKIP_PIXELS, Kt), C.pixelStorei(C.UNPACK_SKIP_ROWS, vi), C.pixelStorei(C.UNPACK_SKIP_IMAGES, zt), I === 0 && L.generateMipmaps && C.generateMipmap(ye), be.unbindTexture();
    }, this.initRenderTarget = function(M) {
      Re.get(M).__webglFramebuffer === void 0 && b.setupRenderTarget(M);
    }, this.initTexture = function(M) {
      M.isCubeTexture ? b.setTextureCube(M, 0) : M.isData3DTexture ? b.setTexture3D(M, 0) : M.isDataArrayTexture || M.isCompressedArrayTexture ? b.setTexture2DArray(M, 0) : b.setTexture2D(M, 0), be.unbindTexture();
    }, this.resetState = function() {
      D = 0, R = 0, A = null, be.reset(), nt.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return An;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = e === hc ? "display-p3" : "srgb", t.unpackColorSpace = We.workingColorSpace === io ? "display-p3" : "srgb";
  }
}
class z0 extends at {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new ln(), this.environmentIntensity = 1, this.environmentRotation = new ln(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
class xu {
  constructor(e, t) {
    this.isInterleavedBuffer = !0, this.array = e, this.stride = t, this.count = e !== void 0 ? e.length / t : 0, this.usage = za, this.updateRanges = [], this.version = 0, this.uuid = jt();
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.array = new e.array.constructor(e.array), this.count = e.count, this.stride = e.stride, this.usage = e.usage, this;
  }
  copyAt(e, t, n) {
    e *= this.stride, n *= t.stride;
    for (let s = 0, r = this.stride; s < r; s++)
      this.array[e + s] = t.array[n + s];
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  clone(e) {
    e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = jt()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(t, this.stride);
    return n.setUsage(this.usage), n;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  toJSON(e) {
    return e.arrayBuffers === void 0 && (e.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = jt()), e.arrayBuffers[this.array.buffer._uuid] === void 0 && (e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
const At = /* @__PURE__ */ new w();
class Ws {
  constructor(e, t, n, s = !1) {
    this.isInterleavedBufferAttribute = !0, this.name = "", this.data = e, this.itemSize = t, this.offset = n, this.normalized = s;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(e) {
    this.data.needsUpdate = e;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.data.count; t < n; t++)
      At.fromBufferAttribute(this, t), At.applyMatrix4(e), this.setXYZ(t, At.x, At.y, At.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      At.fromBufferAttribute(this, t), At.applyNormalMatrix(e), this.setXYZ(t, At.x, At.y, At.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      At.fromBufferAttribute(this, t), At.transformDirection(e), this.setXYZ(t, At.x, At.y, At.z);
    return this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.data.stride + this.offset + t];
    return this.normalized && (n = nn(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = Je(n, this.array)), this.data.array[e * this.data.stride + this.offset + t] = n, this;
  }
  setX(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.data.array[e * this.data.stride + this.offset] = t, this;
  }
  setY(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.data.array[e * this.data.stride + this.offset + 1] = t, this;
  }
  setZ(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.data.array[e * this.data.stride + this.offset + 2] = t, this;
  }
  setW(e, t) {
    return this.normalized && (t = Je(t, this.array)), this.data.array[e * this.data.stride + this.offset + 3] = t, this;
  }
  getX(e) {
    let t = this.data.array[e * this.data.stride + this.offset];
    return this.normalized && (t = nn(t, this.array)), t;
  }
  getY(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 1];
    return this.normalized && (t = nn(t, this.array)), t;
  }
  getZ(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 2];
    return this.normalized && (t = nn(t, this.array)), t;
  }
  getW(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 3];
    return this.normalized && (t = nn(t, this.array)), t;
  }
  setXY(e, t, n) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = Je(t, this.array), n = Je(n, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, s) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = Je(t, this.array), n = Je(n, this.array), s = Je(s, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = s, this;
  }
  setXYZW(e, t, n, s, r) {
    return e = e * this.data.stride + this.offset, this.normalized && (t = Je(t, this.array), n = Je(n, this.array), s = Je(s, this.array), r = Je(r, this.array)), this.data.array[e + 0] = t, this.data.array[e + 1] = n, this.data.array[e + 2] = s, this.data.array[e + 3] = r, this;
  }
  clone(e) {
    if (e === void 0) {
      console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const t = [];
      for (let n = 0; n < this.count; n++) {
        const s = n * this.data.stride + this.offset;
        for (let r = 0; r < this.itemSize; r++)
          t.push(this.data.array[s + r]);
      }
      return new Lt(new this.array.constructor(t), this.itemSize, this.normalized);
    } else
      return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.clone(e)), new Ws(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
  }
  toJSON(e) {
    if (e === void 0) {
      console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const t = [];
      for (let n = 0; n < this.count; n++) {
        const s = n * this.data.stride + this.offset;
        for (let r = 0; r < this.itemSize; r++)
          t.push(this.data.array[s + r]);
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: t,
        normalized: this.normalized
      };
    } else
      return e.interleavedBuffers === void 0 && (e.interleavedBuffers = {}), e.interleavedBuffers[this.data.uuid] === void 0 && (e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e)), {
        isInterleavedBufferAttribute: !0,
        itemSize: this.itemSize,
        data: this.data.uuid,
        offset: this.offset,
        normalized: this.normalized
      };
  }
}
class yu extends rn {
  constructor(e) {
    super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new Me(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.rotation = e.rotation, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
let Di;
const ys = /* @__PURE__ */ new w(), Ni = /* @__PURE__ */ new w(), Ui = /* @__PURE__ */ new w(), Oi = /* @__PURE__ */ new te(), Ms = /* @__PURE__ */ new te(), Mu = /* @__PURE__ */ new Ce(), Mr = /* @__PURE__ */ new w(), Ss = /* @__PURE__ */ new w(), Sr = /* @__PURE__ */ new w(), Wl = /* @__PURE__ */ new te(), Vo = /* @__PURE__ */ new te(), Xl = /* @__PURE__ */ new te();
class k0 extends at {
  constructor(e = new yu()) {
    if (super(), this.isSprite = !0, this.type = "Sprite", Di === void 0) {
      Di = new Gt();
      const t = new Float32Array([
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
      ]), n = new xu(t, 5);
      Di.setIndex([0, 1, 2, 0, 2, 3]), Di.setAttribute("position", new Ws(n, 3, 0, !1)), Di.setAttribute("uv", new Ws(n, 2, 3, !1));
    }
    this.geometry = Di, this.material = e, this.center = new te(0.5, 0.5);
  }
  raycast(e, t) {
    e.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), Ni.setFromMatrixScale(this.matrixWorld), Mu.copy(e.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse, this.matrixWorld), Ui.setFromMatrixPosition(this.modelViewMatrix), e.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && Ni.multiplyScalar(-Ui.z);
    const n = this.material.rotation;
    let s, r;
    n !== 0 && (r = Math.cos(n), s = Math.sin(n));
    const o = this.center;
    Er(Mr.set(-0.5, -0.5, 0), Ui, o, Ni, s, r), Er(Ss.set(0.5, -0.5, 0), Ui, o, Ni, s, r), Er(Sr.set(0.5, 0.5, 0), Ui, o, Ni, s, r), Wl.set(0, 0), Vo.set(1, 0), Xl.set(1, 1);
    let a = e.ray.intersectTriangle(Mr, Ss, Sr, !1, ys);
    if (a === null && (Er(Ss.set(-0.5, 0.5, 0), Ui, o, Ni, s, r), Vo.set(0, 1), a = e.ray.intersectTriangle(Mr, Sr, Ss, !1, ys), a === null))
      return;
    const c = e.ray.origin.distanceTo(ys);
    c < e.near || c > e.far || t.push({
      distance: c,
      point: ys.clone(),
      uv: qt.getInterpolation(ys, Mr, Ss, Sr, Wl, Vo, Xl, new te()),
      face: null,
      object: this
    });
  }
  copy(e, t) {
    return super.copy(e, t), e.center !== void 0 && this.center.copy(e.center), this.material = e.material, this;
  }
}
function Er(i, e, t, n, s, r) {
  Oi.subVectors(i, t).addScalar(0.5).multiply(n), s !== void 0 ? (Ms.x = r * Oi.x - s * Oi.y, Ms.y = s * Oi.x + r * Oi.y) : Ms.copy(Oi), i.copy(e), i.x += Ms.x, i.y += Ms.y, i.applyMatrix4(Mu);
}
const $l = /* @__PURE__ */ new w(), ql = /* @__PURE__ */ new qe(), Yl = /* @__PURE__ */ new qe(), H0 = /* @__PURE__ */ new w(), jl = /* @__PURE__ */ new Ce(), Tr = /* @__PURE__ */ new w(), Go = /* @__PURE__ */ new un(), Kl = /* @__PURE__ */ new Ce(), Wo = /* @__PURE__ */ new cs();
class V0 extends St {
  constructor(e, t) {
    super(e, t), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = Kc, this.bindMatrix = new Ce(), this.bindMatrixInverse = new Ce(), this.boundingBox = null, this.boundingSphere = null;
  }
  computeBoundingBox() {
    const e = this.geometry;
    this.boundingBox === null && (this.boundingBox = new on()), this.boundingBox.makeEmpty();
    const t = e.getAttribute("position");
    for (let n = 0; n < t.count; n++)
      this.getVertexPosition(n, Tr), this.boundingBox.expandByPoint(Tr);
  }
  computeBoundingSphere() {
    const e = this.geometry;
    this.boundingSphere === null && (this.boundingSphere = new un()), this.boundingSphere.makeEmpty();
    const t = e.getAttribute("position");
    for (let n = 0; n < t.count; n++)
      this.getVertexPosition(n, Tr), this.boundingSphere.expandByPoint(Tr);
  }
  copy(e, t) {
    return super.copy(e, t), this.bindMode = e.bindMode, this.bindMatrix.copy(e.bindMatrix), this.bindMatrixInverse.copy(e.bindMatrixInverse), this.skeleton = e.skeleton, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this;
  }
  raycast(e, t) {
    const n = this.material, s = this.matrixWorld;
    n !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Go.copy(this.boundingSphere), Go.applyMatrix4(s), e.ray.intersectsSphere(Go) !== !1 && (Kl.copy(s).invert(), Wo.copy(e.ray).applyMatrix4(Kl), !(this.boundingBox !== null && Wo.intersectsBox(this.boundingBox) === !1) && this._computeIntersections(e, t, Wo)));
  }
  getVertexPosition(e, t) {
    return super.getVertexPosition(e, t), this.applyBoneTransform(e, t), t;
  }
  bind(e, t) {
    this.skeleton = e, t === void 0 && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), t = this.matrixWorld), this.bindMatrix.copy(t), this.bindMatrixInverse.copy(t).invert();
  }
  pose() {
    this.skeleton.pose();
  }
  normalizeSkinWeights() {
    const e = new qe(), t = this.geometry.attributes.skinWeight;
    for (let n = 0, s = t.count; n < s; n++) {
      e.fromBufferAttribute(t, n);
      const r = 1 / e.manhattanLength();
      r !== 1 / 0 ? e.multiplyScalar(r) : e.set(1, 0, 0, 0), t.setXYZW(n, e.x, e.y, e.z, e.w);
    }
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.bindMode === Kc ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === jd ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
  }
  applyBoneTransform(e, t) {
    const n = this.skeleton, s = this.geometry;
    ql.fromBufferAttribute(s.attributes.skinIndex, e), Yl.fromBufferAttribute(s.attributes.skinWeight, e), $l.copy(t).applyMatrix4(this.bindMatrix), t.set(0, 0, 0);
    for (let r = 0; r < 4; r++) {
      const o = Yl.getComponent(r);
      if (o !== 0) {
        const a = ql.getComponent(r);
        jl.multiplyMatrices(n.bones[a].matrixWorld, n.boneInverses[a]), t.addScaledVector(H0.copy($l).applyMatrix4(jl), o);
      }
    }
    return t.applyMatrix4(this.bindMatrixInverse);
  }
}
class Su extends at {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}
class Eu extends _t {
  constructor(e = null, t = 1, n = 1, s, r, o, a, c, l = Pt, h = Pt, u, d) {
    super(null, o, a, c, l, h, s, r, u, d), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const Zl = /* @__PURE__ */ new Ce(), G0 = /* @__PURE__ */ new Ce();
class gc {
  constructor(e = [], t = []) {
    this.uuid = jt(), this.bones = e.slice(0), this.boneInverses = t, this.boneMatrices = null, this.boneTexture = null, this.init();
  }
  init() {
    const e = this.bones, t = this.boneInverses;
    if (this.boneMatrices = new Float32Array(e.length * 16), t.length === 0)
      this.calculateInverses();
    else if (e.length !== t.length) {
      console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
      for (let n = 0, s = this.bones.length; n < s; n++)
        this.boneInverses.push(new Ce());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const n = new Ce();
      this.bones[e] && n.copy(this.bones[e].matrixWorld).invert(), this.boneInverses.push(n);
    }
  }
  pose() {
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const n = this.bones[e];
      n && n.matrixWorld.copy(this.boneInverses[e]).invert();
    }
    for (let e = 0, t = this.bones.length; e < t; e++) {
      const n = this.bones[e];
      n && (n.parent && n.parent.isBone ? (n.matrix.copy(n.parent.matrixWorld).invert(), n.matrix.multiply(n.matrixWorld)) : n.matrix.copy(n.matrixWorld), n.matrix.decompose(n.position, n.quaternion, n.scale));
    }
  }
  update() {
    const e = this.bones, t = this.boneInverses, n = this.boneMatrices, s = this.boneTexture;
    for (let r = 0, o = e.length; r < o; r++) {
      const a = e[r] ? e[r].matrixWorld : G0;
      Zl.multiplyMatrices(a, t[r]), Zl.toArray(n, r * 16);
    }
    s !== null && (s.needsUpdate = !0);
  }
  clone() {
    return new gc(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let e = Math.sqrt(this.bones.length * 4);
    e = Math.ceil(e / 4) * 4, e = Math.max(e, 4);
    const t = new Float32Array(e * e * 4);
    t.set(this.boneMatrices);
    const n = new Eu(t, e, e, Yt, sn);
    return n.needsUpdate = !0, this.boneMatrices = t, this.boneTexture = n, this;
  }
  getBoneByName(e) {
    for (let t = 0, n = this.bones.length; t < n; t++) {
      const s = this.bones[t];
      if (s.name === e)
        return s;
    }
  }
  dispose() {
    this.boneTexture !== null && (this.boneTexture.dispose(), this.boneTexture = null);
  }
  fromJSON(e, t) {
    this.uuid = e.uuid;
    for (let n = 0, s = e.bones.length; n < s; n++) {
      const r = e.bones[n];
      let o = t[r];
      o === void 0 && (console.warn("THREE.Skeleton: No bone found with UUID:", r), o = new Su()), this.bones.push(o), this.boneInverses.push(new Ce().fromArray(e.boneInverses[n]));
    }
    return this.init(), this;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "Skeleton",
        generator: "Skeleton.toJSON"
      },
      bones: [],
      boneInverses: []
    };
    e.uuid = this.uuid;
    const t = this.bones, n = this.boneInverses;
    for (let s = 0, r = t.length; s < r; s++) {
      const o = t[s];
      e.bones.push(o.uuid);
      const a = n[s];
      e.boneInverses.push(a.toArray());
    }
    return e;
  }
}
class Ha extends Lt {
  constructor(e, t, n, s = 1) {
    super(e, t, n), this.isInstancedBufferAttribute = !0, this.meshPerAttribute = s;
  }
  copy(e) {
    return super.copy(e), this.meshPerAttribute = e.meshPerAttribute, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.meshPerAttribute = this.meshPerAttribute, e.isInstancedBufferAttribute = !0, e;
  }
}
const Fi = /* @__PURE__ */ new Ce(), Jl = /* @__PURE__ */ new Ce(), br = [], Ql = /* @__PURE__ */ new on(), W0 = /* @__PURE__ */ new Ce(), Es = /* @__PURE__ */ new St(), Ts = /* @__PURE__ */ new un();
class X0 extends St {
  constructor(e, t, n) {
    super(e, t), this.isInstancedMesh = !0, this.instanceMatrix = new Ha(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
    for (let s = 0; s < n; s++)
      this.setMatrixAt(s, W0);
  }
  computeBoundingBox() {
    const e = this.geometry, t = this.count;
    this.boundingBox === null && (this.boundingBox = new on()), e.boundingBox === null && e.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < t; n++)
      this.getMatrixAt(n, Fi), Ql.copy(e.boundingBox).applyMatrix4(Fi), this.boundingBox.union(Ql);
  }
  computeBoundingSphere() {
    const e = this.geometry, t = this.count;
    this.boundingSphere === null && (this.boundingSphere = new un()), e.boundingSphere === null && e.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < t; n++)
      this.getMatrixAt(n, Fi), Ts.copy(e.boundingSphere).applyMatrix4(Fi), this.boundingSphere.union(Ts);
  }
  copy(e, t) {
    return super.copy(e, t), this.instanceMatrix.copy(e.instanceMatrix), e.morphTexture !== null && (this.morphTexture = e.morphTexture.clone()), e.instanceColor !== null && (this.instanceColor = e.instanceColor.clone()), this.count = e.count, e.boundingBox !== null && (this.boundingBox = e.boundingBox.clone()), e.boundingSphere !== null && (this.boundingSphere = e.boundingSphere.clone()), this;
  }
  getColorAt(e, t) {
    t.fromArray(this.instanceColor.array, e * 3);
  }
  getMatrixAt(e, t) {
    t.fromArray(this.instanceMatrix.array, e * 16);
  }
  getMorphAt(e, t) {
    const n = t.morphTargetInfluences, s = this.morphTexture.source.data.data, r = n.length + 1, o = e * r + 1;
    for (let a = 0; a < n.length; a++)
      n[a] = s[o + a];
  }
  raycast(e, t) {
    const n = this.matrixWorld, s = this.count;
    if (Es.geometry = this.geometry, Es.material = this.material, Es.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Ts.copy(this.boundingSphere), Ts.applyMatrix4(n), e.ray.intersectsSphere(Ts) !== !1))
      for (let r = 0; r < s; r++) {
        this.getMatrixAt(r, Fi), Jl.multiplyMatrices(n, Fi), Es.matrixWorld = Jl, Es.raycast(e, br);
        for (let o = 0, a = br.length; o < a; o++) {
          const c = br[o];
          c.instanceId = r, c.object = this, t.push(c);
        }
        br.length = 0;
      }
  }
  setColorAt(e, t) {
    this.instanceColor === null && (this.instanceColor = new Ha(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), t.toArray(this.instanceColor.array, e * 3);
  }
  setMatrixAt(e, t) {
    t.toArray(this.instanceMatrix.array, e * 16);
  }
  setMorphAt(e, t) {
    const n = t.morphTargetInfluences, s = n.length + 1;
    this.morphTexture === null && (this.morphTexture = new Eu(new Float32Array(s * this.count), s, this.count, oc, sn));
    const r = this.morphTexture.source.data.data;
    let o = 0;
    for (let l = 0; l < n.length; l++)
      o += n[l];
    const a = this.geometry.morphTargetsRelative ? 1 : 1 - o, c = s * e;
    r[c] = a, r.set(n, c + 1);
  }
  updateMorphTargets() {
  }
  dispose() {
    return this.dispatchEvent({ type: "dispose" }), this.morphTexture !== null && (this.morphTexture.dispose(), this.morphTexture = null), this;
  }
}
class Tu extends rn {
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Me(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}
const Jr = /* @__PURE__ */ new w(), Qr = /* @__PURE__ */ new w(), eh = /* @__PURE__ */ new Ce(), bs = /* @__PURE__ */ new cs(), Ar = /* @__PURE__ */ new un(), Xo = /* @__PURE__ */ new w(), th = /* @__PURE__ */ new w();
class _c extends at {
  constructor(e = new Gt(), t = new Tu()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [0];
      for (let s = 1, r = t.count; s < r; s++)
        Jr.fromBufferAttribute(t, s - 1), Qr.fromBufferAttribute(t, s), n[s] = n[s - 1], n[s] += Jr.distanceTo(Qr);
      e.setAttribute("lineDistance", new It(n, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(e, t) {
    const n = this.geometry, s = this.matrixWorld, r = e.params.Line.threshold, o = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Ar.copy(n.boundingSphere), Ar.applyMatrix4(s), Ar.radius += r, e.ray.intersectsSphere(Ar) === !1) return;
    eh.copy(s).invert(), bs.copy(e.ray).applyMatrix4(eh);
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = a * a, l = this.isLineSegments ? 2 : 1, h = n.index, d = n.attributes.position;
    if (h !== null) {
      const f = Math.max(0, o.start), g = Math.min(h.count, o.start + o.count);
      for (let _ = f, p = g - 1; _ < p; _ += l) {
        const m = h.getX(_), T = h.getX(_ + 1), y = wr(this, e, bs, c, m, T);
        y && t.push(y);
      }
      if (this.isLineLoop) {
        const _ = h.getX(g - 1), p = h.getX(f), m = wr(this, e, bs, c, _, p);
        m && t.push(m);
      }
    } else {
      const f = Math.max(0, o.start), g = Math.min(d.count, o.start + o.count);
      for (let _ = f, p = g - 1; _ < p; _ += l) {
        const m = wr(this, e, bs, c, _, _ + 1);
        m && t.push(m);
      }
      if (this.isLineLoop) {
        const _ = wr(this, e, bs, c, g - 1, f);
        _ && t.push(_);
      }
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const s = t[n[0]];
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
function wr(i, e, t, n, s, r) {
  const o = i.geometry.attributes.position;
  if (Jr.fromBufferAttribute(o, s), Qr.fromBufferAttribute(o, r), t.distanceSqToSegment(Jr, Qr, Xo, th) > n) return;
  Xo.applyMatrix4(i.matrixWorld);
  const c = e.ray.origin.distanceTo(Xo);
  if (!(c < e.near || c > e.far))
    return {
      distance: c,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: th.clone().applyMatrix4(i.matrixWorld),
      index: s,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i
    };
}
const nh = /* @__PURE__ */ new w(), ih = /* @__PURE__ */ new w();
class $0 extends _c {
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [];
      for (let s = 0, r = t.count; s < r; s += 2)
        nh.fromBufferAttribute(t, s), ih.fromBufferAttribute(t, s + 1), n[s] = s === 0 ? 0 : n[s - 1], n[s + 1] = n[s] + nh.distanceTo(ih);
      e.setAttribute("lineDistance", new It(n, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class q0 extends _c {
  constructor(e, t) {
    super(e, t), this.isLineLoop = !0, this.type = "LineLoop";
  }
}
class bu extends rn {
  constructor(e) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Me(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
const sh = /* @__PURE__ */ new Ce(), Va = /* @__PURE__ */ new cs(), Rr = /* @__PURE__ */ new un(), Cr = /* @__PURE__ */ new w();
class Y0 extends at {
  constructor(e = new Gt(), t = new bu()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  raycast(e, t) {
    const n = this.geometry, s = this.matrixWorld, r = e.params.Points.threshold, o = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Rr.copy(n.boundingSphere), Rr.applyMatrix4(s), Rr.radius += r, e.ray.intersectsSphere(Rr) === !1) return;
    sh.copy(s).invert(), Va.copy(e.ray).applyMatrix4(sh);
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = a * a, l = n.index, u = n.attributes.position;
    if (l !== null) {
      const d = Math.max(0, o.start), f = Math.min(l.count, o.start + o.count);
      for (let g = d, _ = f; g < _; g++) {
        const p = l.getX(g);
        Cr.fromBufferAttribute(u, p), rh(Cr, p, c, s, e, t, this);
      }
    } else {
      const d = Math.max(0, o.start), f = Math.min(u.count, o.start + o.count);
      for (let g = d, _ = f; g < _; g++)
        Cr.fromBufferAttribute(u, g), rh(Cr, g, c, s, e, t, this);
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const s = t[n[0]];
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
function rh(i, e, t, n, s, r, o) {
  const a = Va.distanceSqToPoint(i);
  if (a < t) {
    const c = new w();
    Va.closestPointToPoint(i, c), c.applyMatrix4(n);
    const l = s.ray.origin.distanceTo(c);
    if (l < s.near || l > s.far) return;
    r.push({
      distance: l,
      distanceToRay: Math.sqrt(a),
      point: c,
      index: e,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: o
    });
  }
}
class j0 extends _t {
  constructor(e, t, n, s, r, o, a, c, l) {
    super(e, t, n, s, r, o, a, c, l), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class dn {
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
  getPointAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getPoint(n, t);
  }
  // Get sequence of points using getPoint( t )
  getPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++)
      t.push(this.getPoint(n / e));
    return t;
  }
  // Get sequence of points using getPointAt( u )
  getSpacedPoints(e = 5) {
    const t = [];
    for (let n = 0; n <= e; n++)
      t.push(this.getPointAt(n / e));
    return t;
  }
  // Get total curve arc length
  getLength() {
    const e = this.getLengths();
    return e[e.length - 1];
  }
  // Get list of cumulative segment lengths
  getLengths(e = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate)
      return this.cacheArcLengths;
    this.needsUpdate = !1;
    const t = [];
    let n, s = this.getPoint(0), r = 0;
    t.push(0);
    for (let o = 1; o <= e; o++)
      n = this.getPoint(o / e), r += n.distanceTo(s), t.push(r), s = n;
    return this.cacheArcLengths = t, t;
  }
  updateArcLengths() {
    this.needsUpdate = !0, this.getLengths();
  }
  // Given u ( 0 .. 1 ), get a t to find p. This gives you points which are equidistant
  getUtoTmapping(e, t) {
    const n = this.getLengths();
    let s = 0;
    const r = n.length;
    let o;
    t ? o = t : o = e * n[r - 1];
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
  getTangent(e, t) {
    let s = e - 1e-4, r = e + 1e-4;
    s < 0 && (s = 0), r > 1 && (r = 1);
    const o = this.getPoint(s), a = this.getPoint(r), c = t || (o.isVector2 ? new te() : new w());
    return c.copy(a).sub(o).normalize(), c;
  }
  getTangentAt(e, t) {
    const n = this.getUtoTmapping(e);
    return this.getTangent(n, t);
  }
  computeFrenetFrames(e, t) {
    const n = new w(), s = [], r = [], o = [], a = new w(), c = new Ce();
    for (let f = 0; f <= e; f++) {
      const g = f / e;
      s[f] = this.getTangentAt(g, new w());
    }
    r[0] = new w(), o[0] = new w();
    let l = Number.MAX_VALUE;
    const h = Math.abs(s[0].x), u = Math.abs(s[0].y), d = Math.abs(s[0].z);
    h <= l && (l = h, n.set(1, 0, 0)), u <= l && (l = u, n.set(0, 1, 0)), d <= l && n.set(0, 0, 1), a.crossVectors(s[0], n).normalize(), r[0].crossVectors(s[0], a), o[0].crossVectors(s[0], r[0]);
    for (let f = 1; f <= e; f++) {
      if (r[f] = r[f - 1].clone(), o[f] = o[f - 1].clone(), a.crossVectors(s[f - 1], s[f]), a.length() > Number.EPSILON) {
        a.normalize();
        const g = Math.acos(gt(s[f - 1].dot(s[f]), -1, 1));
        r[f].applyMatrix4(c.makeRotationAxis(a, g));
      }
      o[f].crossVectors(s[f], r[f]);
    }
    if (t === !0) {
      let f = Math.acos(gt(r[0].dot(r[e]), -1, 1));
      f /= e, s[0].dot(a.crossVectors(r[0], r[e])) > 0 && (f = -f);
      for (let g = 1; g <= e; g++)
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
  copy(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    return e.arcLengthDivisions = this.arcLengthDivisions, e.type = this.type, e;
  }
  fromJSON(e) {
    return this.arcLengthDivisions = e.arcLengthDivisions, this;
  }
}
class vc extends dn {
  constructor(e = 0, t = 0, n = 1, s = 1, r = 0, o = Math.PI * 2, a = !1, c = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = e, this.aY = t, this.xRadius = n, this.yRadius = s, this.aStartAngle = r, this.aEndAngle = o, this.aClockwise = a, this.aRotation = c;
  }
  getPoint(e, t = new te()) {
    const n = t, s = Math.PI * 2;
    let r = this.aEndAngle - this.aStartAngle;
    const o = Math.abs(r) < Number.EPSILON;
    for (; r < 0; ) r += s;
    for (; r > s; ) r -= s;
    r < Number.EPSILON && (o ? r = 0 : r = s), this.aClockwise === !0 && !o && (r === s ? r = -s : r = r - s);
    const a = this.aStartAngle + e * r;
    let c = this.aX + this.xRadius * Math.cos(a), l = this.aY + this.yRadius * Math.sin(a);
    if (this.aRotation !== 0) {
      const h = Math.cos(this.aRotation), u = Math.sin(this.aRotation), d = c - this.aX, f = l - this.aY;
      c = d * h - f * u + this.aX, l = d * u + f * h + this.aY;
    }
    return n.set(c, l);
  }
  copy(e) {
    return super.copy(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.aX = this.aX, e.aY = this.aY, e.xRadius = this.xRadius, e.yRadius = this.yRadius, e.aStartAngle = this.aStartAngle, e.aEndAngle = this.aEndAngle, e.aClockwise = this.aClockwise, e.aRotation = this.aRotation, e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.aX = e.aX, this.aY = e.aY, this.xRadius = e.xRadius, this.yRadius = e.yRadius, this.aStartAngle = e.aStartAngle, this.aEndAngle = e.aEndAngle, this.aClockwise = e.aClockwise, this.aRotation = e.aRotation, this;
  }
}
class K0 extends vc {
  constructor(e, t, n, s, r, o) {
    super(e, t, n, n, s, r, o), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function xc() {
  let i = 0, e = 0, t = 0, n = 0;
  function s(r, o, a, c) {
    i = r, e = a, t = -3 * r + 3 * o - 2 * a - c, n = 2 * r - 2 * o + a + c;
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
      return i + e * r + t * o + n * a;
    }
  };
}
const Pr = /* @__PURE__ */ new w(), $o = /* @__PURE__ */ new xc(), qo = /* @__PURE__ */ new xc(), Yo = /* @__PURE__ */ new xc();
class Z0 extends dn {
  constructor(e = [], t = !1, n = "centripetal", s = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = e, this.closed = t, this.curveType = n, this.tension = s;
  }
  getPoint(e, t = new w()) {
    const n = t, s = this.points, r = s.length, o = (r - (this.closed ? 0 : 1)) * e;
    let a = Math.floor(o), c = o - a;
    this.closed ? a += a > 0 ? 0 : (Math.floor(Math.abs(a) / r) + 1) * r : c === 0 && a === r - 1 && (a = r - 2, c = 1);
    let l, h;
    this.closed || a > 0 ? l = s[(a - 1) % r] : (Pr.subVectors(s[0], s[1]).add(s[0]), l = Pr);
    const u = s[a % r], d = s[(a + 1) % r];
    if (this.closed || a + 2 < r ? h = s[(a + 2) % r] : (Pr.subVectors(s[r - 1], s[r - 2]).add(s[r - 1]), h = Pr), this.curveType === "centripetal" || this.curveType === "chordal") {
      const f = this.curveType === "chordal" ? 0.5 : 0.25;
      let g = Math.pow(l.distanceToSquared(u), f), _ = Math.pow(u.distanceToSquared(d), f), p = Math.pow(d.distanceToSquared(h), f);
      _ < 1e-4 && (_ = 1), g < 1e-4 && (g = _), p < 1e-4 && (p = _), $o.initNonuniformCatmullRom(l.x, u.x, d.x, h.x, g, _, p), qo.initNonuniformCatmullRom(l.y, u.y, d.y, h.y, g, _, p), Yo.initNonuniformCatmullRom(l.z, u.z, d.z, h.z, g, _, p);
    } else this.curveType === "catmullrom" && ($o.initCatmullRom(l.x, u.x, d.x, h.x, this.tension), qo.initCatmullRom(l.y, u.y, d.y, h.y, this.tension), Yo.initCatmullRom(l.z, u.z, d.z, h.z, this.tension));
    return n.set(
      $o.calc(c),
      qo.calc(c),
      Yo.calc(c)
    ), n;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const s = e.points[t];
      this.points.push(s.clone());
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const s = this.points[t];
      e.points.push(s.toArray());
    }
    return e.closed = this.closed, e.curveType = this.curveType, e.tension = this.tension, e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const s = e.points[t];
      this.points.push(new w().fromArray(s));
    }
    return this.closed = e.closed, this.curveType = e.curveType, this.tension = e.tension, this;
  }
}
function oh(i, e, t, n, s) {
  const r = (n - e) * 0.5, o = (s - t) * 0.5, a = i * i, c = i * a;
  return (2 * t - 2 * n + r + o) * c + (-3 * t + 3 * n - 2 * r - o) * a + r * i + t;
}
function J0(i, e) {
  const t = 1 - i;
  return t * t * e;
}
function Q0(i, e) {
  return 2 * (1 - i) * i * e;
}
function ev(i, e) {
  return i * i * e;
}
function Ds(i, e, t, n) {
  return J0(i, e) + Q0(i, t) + ev(i, n);
}
function tv(i, e) {
  const t = 1 - i;
  return t * t * t * e;
}
function nv(i, e) {
  const t = 1 - i;
  return 3 * t * t * i * e;
}
function iv(i, e) {
  return 3 * (1 - i) * i * i * e;
}
function sv(i, e) {
  return i * i * i * e;
}
function Ns(i, e, t, n, s) {
  return tv(i, e) + nv(i, t) + iv(i, n) + sv(i, s);
}
class Au extends dn {
  constructor(e = new te(), t = new te(), n = new te(), s = new te()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = s;
  }
  getPoint(e, t = new te()) {
    const n = t, s = this.v0, r = this.v1, o = this.v2, a = this.v3;
    return n.set(
      Ns(e, s.x, r.x, o.x, a.x),
      Ns(e, s.y, r.y, o.y, a.y)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}
class rv extends dn {
  constructor(e = new w(), t = new w(), n = new w(), s = new w()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n, this.v3 = s;
  }
  getPoint(e, t = new w()) {
    const n = t, s = this.v0, r = this.v1, o = this.v2, a = this.v3;
    return n.set(
      Ns(e, s.x, r.x, o.x, a.x),
      Ns(e, s.y, r.y, o.y, a.y),
      Ns(e, s.z, r.z, o.z, a.z)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this.v3.copy(e.v3), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e.v3 = this.v3.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this.v3.fromArray(e.v3), this;
  }
}
class wu extends dn {
  constructor(e = new te(), t = new te()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new te()) {
    const n = t;
    return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new te()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class ov extends dn {
  constructor(e = new w(), t = new w()) {
    super(), this.isLineCurve3 = !0, this.type = "LineCurve3", this.v1 = e, this.v2 = t;
  }
  getPoint(e, t = new w()) {
    const n = t;
    return e === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(e).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new w()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    return super.copy(e), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class Ru extends dn {
  constructor(e = new te(), t = new te(), n = new te()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = e, this.v1 = t, this.v2 = n;
  }
  getPoint(e, t = new te()) {
    const n = t, s = this.v0, r = this.v1, o = this.v2;
    return n.set(
      Ds(e, s.x, r.x, o.x),
      Ds(e, s.y, r.y, o.y)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class av extends dn {
  constructor(e = new w(), t = new w(), n = new w()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = e, this.v1 = t, this.v2 = n;
  }
  getPoint(e, t = new w()) {
    const n = t, s = this.v0, r = this.v1, o = this.v2;
    return n.set(
      Ds(e, s.x, r.x, o.x),
      Ds(e, s.y, r.y, o.y),
      Ds(e, s.z, r.z, o.z)
    ), n;
  }
  copy(e) {
    return super.copy(e), this.v0.copy(e.v0), this.v1.copy(e.v1), this.v2.copy(e.v2), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.v0 = this.v0.toArray(), e.v1 = this.v1.toArray(), e.v2 = this.v2.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.v0.fromArray(e.v0), this.v1.fromArray(e.v1), this.v2.fromArray(e.v2), this;
  }
}
class Cu extends dn {
  constructor(e = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = e;
  }
  getPoint(e, t = new te()) {
    const n = t, s = this.points, r = (s.length - 1) * e, o = Math.floor(r), a = r - o, c = s[o === 0 ? o : o - 1], l = s[o], h = s[o > s.length - 2 ? s.length - 1 : o + 1], u = s[o > s.length - 3 ? s.length - 1 : o + 2];
    return n.set(
      oh(a, c.x, l.x, h.x, u.x),
      oh(a, c.y, l.y, h.y, u.y)
    ), n;
  }
  copy(e) {
    super.copy(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const s = e.points[t];
      this.points.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, n = this.points.length; t < n; t++) {
      const s = this.points[t];
      e.points.push(s.toArray());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.points = [];
    for (let t = 0, n = e.points.length; t < n; t++) {
      const s = e.points[t];
      this.points.push(new te().fromArray(s));
    }
    return this;
  }
}
var ah = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: K0,
  CatmullRomCurve3: Z0,
  CubicBezierCurve: Au,
  CubicBezierCurve3: rv,
  EllipseCurve: vc,
  LineCurve: wu,
  LineCurve3: ov,
  QuadraticBezierCurve: Ru,
  QuadraticBezierCurve3: av,
  SplineCurve: Cu
});
class cv extends dn {
  constructor() {
    super(), this.type = "CurvePath", this.curves = [], this.autoClose = !1;
  }
  add(e) {
    this.curves.push(e);
  }
  closePath() {
    const e = this.curves[0].getPoint(0), t = this.curves[this.curves.length - 1].getPoint(1);
    if (!e.equals(t)) {
      const n = e.isVector2 === !0 ? "LineCurve" : "LineCurve3";
      this.curves.push(new ah[n](t, e));
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
  getPoint(e, t) {
    const n = e * this.getLength(), s = this.getCurveLengths();
    let r = 0;
    for (; r < s.length; ) {
      if (s[r] >= n) {
        const o = s[r] - n, a = this.curves[r], c = a.getLength(), l = c === 0 ? 0 : 1 - o / c;
        return a.getPointAt(l, t);
      }
      r++;
    }
    return null;
  }
  // We cannot use the default THREE.Curve getPoint() with getLength() because in
  // THREE.Curve, getLength() depends on getPoint() but in THREE.CurvePath
  // getPoint() depends on getLength
  getLength() {
    const e = this.getCurveLengths();
    return e[e.length - 1];
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
    const e = [];
    let t = 0;
    for (let n = 0, s = this.curves.length; n < s; n++)
      t += this.curves[n].getLength(), e.push(t);
    return this.cacheLengths = e, e;
  }
  getSpacedPoints(e = 40) {
    const t = [];
    for (let n = 0; n <= e; n++)
      t.push(this.getPoint(n / e));
    return this.autoClose && t.push(t[0]), t;
  }
  getPoints(e = 12) {
    const t = [];
    let n;
    for (let s = 0, r = this.curves; s < r.length; s++) {
      const o = r[s], a = o.isEllipseCurve ? e * 2 : o.isLineCurve || o.isLineCurve3 ? 1 : o.isSplineCurve ? e * o.points.length : e, c = o.getPoints(a);
      for (let l = 0; l < c.length; l++) {
        const h = c[l];
        n && n.equals(h) || (t.push(h), n = h);
      }
    }
    return this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0]) && t.push(t[0]), t;
  }
  copy(e) {
    super.copy(e), this.curves = [];
    for (let t = 0, n = e.curves.length; t < n; t++) {
      const s = e.curves[t];
      this.curves.push(s.clone());
    }
    return this.autoClose = e.autoClose, this;
  }
  toJSON() {
    const e = super.toJSON();
    e.autoClose = this.autoClose, e.curves = [];
    for (let t = 0, n = this.curves.length; t < n; t++) {
      const s = this.curves[t];
      e.curves.push(s.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.autoClose = e.autoClose, this.curves = [];
    for (let t = 0, n = e.curves.length; t < n; t++) {
      const s = e.curves[t];
      this.curves.push(new ah[s.type]().fromJSON(s));
    }
    return this;
  }
}
class ch extends cv {
  constructor(e) {
    super(), this.type = "Path", this.currentPoint = new te(), e && this.setFromPoints(e);
  }
  setFromPoints(e) {
    this.moveTo(e[0].x, e[0].y);
    for (let t = 1, n = e.length; t < n; t++)
      this.lineTo(e[t].x, e[t].y);
    return this;
  }
  moveTo(e, t) {
    return this.currentPoint.set(e, t), this;
  }
  lineTo(e, t) {
    const n = new wu(this.currentPoint.clone(), new te(e, t));
    return this.curves.push(n), this.currentPoint.set(e, t), this;
  }
  quadraticCurveTo(e, t, n, s) {
    const r = new Ru(
      this.currentPoint.clone(),
      new te(e, t),
      new te(n, s)
    );
    return this.curves.push(r), this.currentPoint.set(n, s), this;
  }
  bezierCurveTo(e, t, n, s, r, o) {
    const a = new Au(
      this.currentPoint.clone(),
      new te(e, t),
      new te(n, s),
      new te(r, o)
    );
    return this.curves.push(a), this.currentPoint.set(r, o), this;
  }
  splineThru(e) {
    const t = [this.currentPoint.clone()].concat(e), n = new Cu(t);
    return this.curves.push(n), this.currentPoint.copy(e[e.length - 1]), this;
  }
  arc(e, t, n, s, r, o) {
    const a = this.currentPoint.x, c = this.currentPoint.y;
    return this.absarc(
      e + a,
      t + c,
      n,
      s,
      r,
      o
    ), this;
  }
  absarc(e, t, n, s, r, o) {
    return this.absellipse(e, t, n, n, s, r, o), this;
  }
  ellipse(e, t, n, s, r, o, a, c) {
    const l = this.currentPoint.x, h = this.currentPoint.y;
    return this.absellipse(e + l, t + h, n, s, r, o, a, c), this;
  }
  absellipse(e, t, n, s, r, o, a, c) {
    const l = new vc(e, t, n, s, r, o, a, c);
    if (this.curves.length > 0) {
      const u = l.getPoint(0);
      u.equals(this.currentPoint) || this.lineTo(u.x, u.y);
    }
    this.curves.push(l);
    const h = l.getPoint(1);
    return this.currentPoint.copy(h), this;
  }
  copy(e) {
    return super.copy(e), this.currentPoint.copy(e.currentPoint), this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.currentPoint = this.currentPoint.toArray(), e;
  }
  fromJSON(e) {
    return super.fromJSON(e), this.currentPoint.fromArray(e.currentPoint), this;
  }
}
class yc extends Gt {
  constructor(e = 1, t = 1, n = 1, s = 32, r = 1, o = !1, a = 0, c = Math.PI * 2) {
    super(), this.type = "CylinderGeometry", this.parameters = {
      radiusTop: e,
      radiusBottom: t,
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
    T(), o === !1 && (e > 0 && y(!0), t > 0 && y(!1)), this.setIndex(h), this.setAttribute("position", new It(u, 3)), this.setAttribute("normal", new It(d, 3)), this.setAttribute("uv", new It(f, 2));
    function T() {
      const S = new w(), D = new w();
      let R = 0;
      const A = (t - e) / n;
      for (let N = 0; N <= r; N++) {
        const Y = [], v = N / r, E = v * (t - e) + e;
        for (let z = 0; z <= s; z++) {
          const B = z / s, H = B * c + a, j = Math.sin(H), k = Math.cos(H);
          D.x = E * j, D.y = -v * n + p, D.z = E * k, u.push(D.x, D.y, D.z), S.set(j, A, k).normalize(), d.push(S.x, S.y, S.z), f.push(B, 1 - v), Y.push(g++);
        }
        _.push(Y);
      }
      for (let N = 0; N < s; N++)
        for (let Y = 0; Y < r; Y++) {
          const v = _[Y][N], E = _[Y + 1][N], z = _[Y + 1][N + 1], B = _[Y][N + 1];
          e > 0 && (h.push(v, E, B), R += 3), t > 0 && (h.push(E, z, B), R += 3);
        }
      l.addGroup(m, R, 0), m += R;
    }
    function y(S) {
      const D = g, R = new te(), A = new w();
      let N = 0;
      const Y = S === !0 ? e : t, v = S === !0 ? 1 : -1;
      for (let z = 1; z <= s; z++)
        u.push(0, p * v, 0), d.push(0, v, 0), f.push(0.5, 0.5), g++;
      const E = g;
      for (let z = 0; z <= s; z++) {
        const H = z / s * c + a, j = Math.cos(H), k = Math.sin(H);
        A.x = Y * k, A.y = p * v, A.z = Y * j, u.push(A.x, A.y, A.z), d.push(0, v, 0), R.x = j * 0.5 + 0.5, R.y = k * 0.5 * v + 0.5, f.push(R.x, R.y), g++;
      }
      for (let z = 0; z < s; z++) {
        const B = D + z, H = E + z;
        S === !0 ? h.push(H, H + 1, B) : h.push(H + 1, H, B), N += 3;
      }
      l.addGroup(m, N, S === !0 ? 1 : 2), m += N;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new yc(e.radiusTop, e.radiusBottom, e.height, e.radialSegments, e.heightSegments, e.openEnded, e.thetaStart, e.thetaLength);
  }
}
class Pu extends ch {
  constructor(e) {
    super(e), this.uuid = jt(), this.type = "Shape", this.holes = [];
  }
  getPointsHoles(e) {
    const t = [];
    for (let n = 0, s = this.holes.length; n < s; n++)
      t[n] = this.holes[n].getPoints(e);
    return t;
  }
  // get points of shape and holes (keypoints based on segments parameter)
  extractPoints(e) {
    return {
      shape: this.getPoints(e),
      holes: this.getPointsHoles(e)
    };
  }
  copy(e) {
    super.copy(e), this.holes = [];
    for (let t = 0, n = e.holes.length; t < n; t++) {
      const s = e.holes[t];
      this.holes.push(s.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.uuid = this.uuid, e.holes = [];
    for (let t = 0, n = this.holes.length; t < n; t++) {
      const s = this.holes[t];
      e.holes.push(s.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e), this.uuid = e.uuid, this.holes = [];
    for (let t = 0, n = e.holes.length; t < n; t++) {
      const s = e.holes[t];
      this.holes.push(new ch().fromJSON(s));
    }
    return this;
  }
}
const lv = {
  triangulate: function(i, e, t = 2) {
    const n = e && e.length, s = n ? e[0] * t : i.length;
    let r = Lu(i, 0, s, t, !0);
    const o = [];
    if (!r || r.next === r.prev) return o;
    let a, c, l, h, u, d, f;
    if (n && (r = pv(i, e, r, t)), i.length > 80 * t) {
      a = l = i[0], c = h = i[1];
      for (let g = t; g < s; g += t)
        u = i[g], d = i[g + 1], u < a && (a = u), d < c && (c = d), u > l && (l = u), d > h && (h = d);
      f = Math.max(l - a, h - c), f = f !== 0 ? 32767 / f : 0;
    }
    return Xs(r, o, t, a, c, f, 0), o;
  }
};
function Lu(i, e, t, n, s) {
  let r, o;
  if (s === bv(i, e, t, n) > 0)
    for (r = e; r < t; r += n) o = lh(r, i[r], i[r + 1], o);
  else
    for (r = t - n; r >= e; r -= n) o = lh(r, i[r], i[r + 1], o);
  return o && oo(o, o.next) && (qs(o), o = o.next), o;
}
function mi(i, e) {
  if (!i) return i;
  e || (e = i);
  let t = i, n;
  do
    if (n = !1, !t.steiner && (oo(t, t.next) || lt(t.prev, t, t.next) === 0)) {
      if (qs(t), t = e = t.prev, t === t.next) break;
      n = !0;
    } else
      t = t.next;
  while (n || t !== e);
  return e;
}
function Xs(i, e, t, n, s, r, o) {
  if (!i) return;
  !o && r && xv(i, n, s, r);
  let a = i, c, l;
  for (; i.prev !== i.next; ) {
    if (c = i.prev, l = i.next, r ? uv(i, n, s, r) : hv(i)) {
      e.push(c.i / t | 0), e.push(i.i / t | 0), e.push(l.i / t | 0), qs(i), i = l.next, a = l.next;
      continue;
    }
    if (i = l, i === a) {
      o ? o === 1 ? (i = dv(mi(i), e, t), Xs(i, e, t, n, s, r, 2)) : o === 2 && fv(i, e, t, n, s, r) : Xs(mi(i), e, t, n, s, r, 1);
      break;
    }
  }
}
function hv(i) {
  const e = i.prev, t = i, n = i.next;
  if (lt(e, t, n) >= 0) return !1;
  const s = e.x, r = t.x, o = n.x, a = e.y, c = t.y, l = n.y, h = s < r ? s < o ? s : o : r < o ? r : o, u = a < c ? a < l ? a : l : c < l ? c : l, d = s > r ? s > o ? s : o : r > o ? r : o, f = a > c ? a > l ? a : l : c > l ? c : l;
  let g = n.next;
  for (; g !== e; ) {
    if (g.x >= h && g.x <= d && g.y >= u && g.y <= f && Hi(s, a, r, c, o, l, g.x, g.y) && lt(g.prev, g, g.next) >= 0) return !1;
    g = g.next;
  }
  return !0;
}
function uv(i, e, t, n) {
  const s = i.prev, r = i, o = i.next;
  if (lt(s, r, o) >= 0) return !1;
  const a = s.x, c = r.x, l = o.x, h = s.y, u = r.y, d = o.y, f = a < c ? a < l ? a : l : c < l ? c : l, g = h < u ? h < d ? h : d : u < d ? u : d, _ = a > c ? a > l ? a : l : c > l ? c : l, p = h > u ? h > d ? h : d : u > d ? u : d, m = Ga(f, g, e, t, n), T = Ga(_, p, e, t, n);
  let y = i.prevZ, S = i.nextZ;
  for (; y && y.z >= m && S && S.z <= T; ) {
    if (y.x >= f && y.x <= _ && y.y >= g && y.y <= p && y !== s && y !== o && Hi(a, h, c, u, l, d, y.x, y.y) && lt(y.prev, y, y.next) >= 0 || (y = y.prevZ, S.x >= f && S.x <= _ && S.y >= g && S.y <= p && S !== s && S !== o && Hi(a, h, c, u, l, d, S.x, S.y) && lt(S.prev, S, S.next) >= 0)) return !1;
    S = S.nextZ;
  }
  for (; y && y.z >= m; ) {
    if (y.x >= f && y.x <= _ && y.y >= g && y.y <= p && y !== s && y !== o && Hi(a, h, c, u, l, d, y.x, y.y) && lt(y.prev, y, y.next) >= 0) return !1;
    y = y.prevZ;
  }
  for (; S && S.z <= T; ) {
    if (S.x >= f && S.x <= _ && S.y >= g && S.y <= p && S !== s && S !== o && Hi(a, h, c, u, l, d, S.x, S.y) && lt(S.prev, S, S.next) >= 0) return !1;
    S = S.nextZ;
  }
  return !0;
}
function dv(i, e, t) {
  let n = i;
  do {
    const s = n.prev, r = n.next.next;
    !oo(s, r) && Iu(s, n, n.next, r) && $s(s, r) && $s(r, s) && (e.push(s.i / t | 0), e.push(n.i / t | 0), e.push(r.i / t | 0), qs(n), qs(n.next), n = i = r), n = n.next;
  } while (n !== i);
  return mi(n);
}
function fv(i, e, t, n, s, r) {
  let o = i;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && Sv(o, a)) {
        let c = Du(o, a);
        o = mi(o, o.next), c = mi(c, c.next), Xs(o, e, t, n, s, r, 0), Xs(c, e, t, n, s, r, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== i);
}
function pv(i, e, t, n) {
  const s = [];
  let r, o, a, c, l;
  for (r = 0, o = e.length; r < o; r++)
    a = e[r] * n, c = r < o - 1 ? e[r + 1] * n : i.length, l = Lu(i, a, c, n, !1), l === l.next && (l.steiner = !0), s.push(Mv(l));
  for (s.sort(mv), r = 0; r < s.length; r++)
    t = gv(s[r], t);
  return t;
}
function mv(i, e) {
  return i.x - e.x;
}
function gv(i, e) {
  const t = _v(i, e);
  if (!t)
    return e;
  const n = Du(t, i);
  return mi(n, n.next), mi(t, t.next);
}
function _v(i, e) {
  let t = e, n = -1 / 0, s;
  const r = i.x, o = i.y;
  do {
    if (o <= t.y && o >= t.next.y && t.next.y !== t.y) {
      const d = t.x + (o - t.y) * (t.next.x - t.x) / (t.next.y - t.y);
      if (d <= r && d > n && (n = d, s = t.x < t.next.x ? t : t.next, d === r))
        return s;
    }
    t = t.next;
  } while (t !== e);
  if (!s) return null;
  const a = s, c = s.x, l = s.y;
  let h = 1 / 0, u;
  t = s;
  do
    r >= t.x && t.x >= c && r !== t.x && Hi(o < l ? r : n, o, c, l, o < l ? n : r, o, t.x, t.y) && (u = Math.abs(o - t.y) / (r - t.x), $s(t, i) && (u < h || u === h && (t.x > s.x || t.x === s.x && vv(s, t))) && (s = t, h = u)), t = t.next;
  while (t !== a);
  return s;
}
function vv(i, e) {
  return lt(i.prev, i, e.prev) < 0 && lt(e.next, i, i.next) < 0;
}
function xv(i, e, t, n) {
  let s = i;
  do
    s.z === 0 && (s.z = Ga(s.x, s.y, e, t, n)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
  while (s !== i);
  s.prevZ.nextZ = null, s.prevZ = null, yv(s);
}
function yv(i) {
  let e, t, n, s, r, o, a, c, l = 1;
  do {
    for (t = i, i = null, r = null, o = 0; t; ) {
      for (o++, n = t, a = 0, e = 0; e < l && (a++, n = n.nextZ, !!n); e++)
        ;
      for (c = l; a > 0 || c > 0 && n; )
        a !== 0 && (c === 0 || !n || t.z <= n.z) ? (s = t, t = t.nextZ, a--) : (s = n, n = n.nextZ, c--), r ? r.nextZ = s : i = s, s.prevZ = r, r = s;
      t = n;
    }
    r.nextZ = null, l *= 2;
  } while (o > 1);
  return i;
}
function Ga(i, e, t, n, s) {
  return i = (i - t) * s | 0, e = (e - n) * s | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, i | e << 1;
}
function Mv(i) {
  let e = i, t = i;
  do
    (e.x < t.x || e.x === t.x && e.y < t.y) && (t = e), e = e.next;
  while (e !== i);
  return t;
}
function Hi(i, e, t, n, s, r, o, a) {
  return (s - o) * (e - a) >= (i - o) * (r - a) && (i - o) * (n - a) >= (t - o) * (e - a) && (t - o) * (r - a) >= (s - o) * (n - a);
}
function Sv(i, e) {
  return i.next.i !== e.i && i.prev.i !== e.i && !Ev(i, e) && // dones't intersect other edges
  ($s(i, e) && $s(e, i) && Tv(i, e) && // locally visible
  (lt(i.prev, i, e.prev) || lt(i, e.prev, e)) || // does not create opposite-facing sectors
  oo(i, e) && lt(i.prev, i, i.next) > 0 && lt(e.prev, e, e.next) > 0);
}
function lt(i, e, t) {
  return (e.y - i.y) * (t.x - e.x) - (e.x - i.x) * (t.y - e.y);
}
function oo(i, e) {
  return i.x === e.x && i.y === e.y;
}
function Iu(i, e, t, n) {
  const s = Ir(lt(i, e, t)), r = Ir(lt(i, e, n)), o = Ir(lt(t, n, i)), a = Ir(lt(t, n, e));
  return !!(s !== r && o !== a || s === 0 && Lr(i, t, e) || r === 0 && Lr(i, n, e) || o === 0 && Lr(t, i, n) || a === 0 && Lr(t, e, n));
}
function Lr(i, e, t) {
  return e.x <= Math.max(i.x, t.x) && e.x >= Math.min(i.x, t.x) && e.y <= Math.max(i.y, t.y) && e.y >= Math.min(i.y, t.y);
}
function Ir(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function Ev(i, e) {
  let t = i;
  do {
    if (t.i !== i.i && t.next.i !== i.i && t.i !== e.i && t.next.i !== e.i && Iu(t, t.next, i, e)) return !0;
    t = t.next;
  } while (t !== i);
  return !1;
}
function $s(i, e) {
  return lt(i.prev, i, i.next) < 0 ? lt(i, e, i.next) >= 0 && lt(i, i.prev, e) >= 0 : lt(i, e, i.prev) < 0 || lt(i, i.next, e) < 0;
}
function Tv(i, e) {
  let t = i, n = !1;
  const s = (i.x + e.x) / 2, r = (i.y + e.y) / 2;
  do
    t.y > r != t.next.y > r && t.next.y !== t.y && s < (t.next.x - t.x) * (r - t.y) / (t.next.y - t.y) + t.x && (n = !n), t = t.next;
  while (t !== i);
  return n;
}
function Du(i, e) {
  const t = new Wa(i.i, i.x, i.y), n = new Wa(e.i, e.x, e.y), s = i.next, r = e.prev;
  return i.next = e, e.prev = i, t.next = s, s.prev = t, n.next = t, t.prev = n, r.next = n, n.prev = r, n;
}
function lh(i, e, t, n) {
  const s = new Wa(i, e, t);
  return n ? (s.next = n.next, s.prev = n, n.next.prev = s, n.next = s) : (s.prev = s, s.next = s), s;
}
function qs(i) {
  i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function Wa(i, e, t) {
  this.i = i, this.x = e, this.y = t, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function bv(i, e, t, n) {
  let s = 0;
  for (let r = e, o = t - n; r < t; r += n)
    s += (i[o] - i[r]) * (i[r + 1] + i[o + 1]), o = r;
  return s;
}
class Us {
  // calculate area of the contour polygon
  static area(e) {
    const t = e.length;
    let n = 0;
    for (let s = t - 1, r = 0; r < t; s = r++)
      n += e[s].x * e[r].y - e[r].x * e[s].y;
    return n * 0.5;
  }
  static isClockWise(e) {
    return Us.area(e) < 0;
  }
  static triangulateShape(e, t) {
    const n = [], s = [], r = [];
    hh(e), uh(n, e);
    let o = e.length;
    t.forEach(hh);
    for (let c = 0; c < t.length; c++)
      s.push(o), o += t[c].length, uh(n, t[c]);
    const a = lv.triangulate(n, s);
    for (let c = 0; c < a.length; c += 3)
      r.push(a.slice(c, c + 3));
    return r;
  }
}
function hh(i) {
  const e = i.length;
  e > 2 && i[e - 1].equals(i[0]) && i.pop();
}
function uh(i, e) {
  for (let t = 0; t < e.length; t++)
    i.push(e[t].x), i.push(e[t].y);
}
class Mc extends Gt {
  constructor(e = new Pu([new te(0, 0.5), new te(-0.5, -0.5), new te(0.5, -0.5)]), t = 12) {
    super(), this.type = "ShapeGeometry", this.parameters = {
      shapes: e,
      curveSegments: t
    };
    const n = [], s = [], r = [], o = [];
    let a = 0, c = 0;
    if (Array.isArray(e) === !1)
      l(e);
    else
      for (let h = 0; h < e.length; h++)
        l(e[h]), this.addGroup(a, c, h), a += c, c = 0;
    this.setIndex(n), this.setAttribute("position", new It(s, 3)), this.setAttribute("normal", new It(r, 3)), this.setAttribute("uv", new It(o, 2));
    function l(h) {
      const u = s.length / 3, d = h.extractPoints(t);
      let f = d.shape;
      const g = d.holes;
      Us.isClockWise(f) === !1 && (f = f.reverse());
      for (let p = 0, m = g.length; p < m; p++) {
        const T = g[p];
        Us.isClockWise(T) === !0 && (g[p] = T.reverse());
      }
      const _ = Us.triangulateShape(f, g);
      for (let p = 0, m = g.length; p < m; p++) {
        const T = g[p];
        f = f.concat(T);
      }
      for (let p = 0, m = f.length; p < m; p++) {
        const T = f[p];
        s.push(T.x, T.y, 0), r.push(0, 0, 1), o.push(T.x, T.y);
      }
      for (let p = 0, m = _.length; p < m; p++) {
        const T = _[p], y = T[0] + u, S = T[1] + u, D = T[2] + u;
        n.push(y, S, D), c += 3;
      }
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  toJSON() {
    const e = super.toJSON(), t = this.parameters.shapes;
    return Av(t, e);
  }
  static fromJSON(e, t) {
    const n = [];
    for (let s = 0, r = e.shapes.length; s < r; s++) {
      const o = t[e.shapes[s]];
      n.push(o);
    }
    return new Mc(n, e.curveSegments);
  }
}
function Av(i, e) {
  if (e.shapes = [], Array.isArray(i))
    for (let t = 0, n = i.length; t < n; t++) {
      const s = i[t];
      e.shapes.push(s.uuid);
    }
  else
    e.shapes.push(i.uuid);
  return e;
}
class hs extends rn {
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.type = "MeshStandardMaterial", this.color = new Me(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Me(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = nu, this.normalScale = new te(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new ln(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class fn extends hs {
  constructor(e) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new te(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function() {
        return gt(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function(t) {
        this.ior = (1 + 0.4 * t) / (1 - 0.4 * t);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new Me(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new Me(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Me(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(e);
  }
  get anisotropy() {
    return this._anisotropy;
  }
  set anisotropy(e) {
    this._anisotropy > 0 != e > 0 && this.version++, this._anisotropy = e;
  }
  get clearcoat() {
    return this._clearcoat;
  }
  set clearcoat(e) {
    this._clearcoat > 0 != e > 0 && this.version++, this._clearcoat = e;
  }
  get iridescence() {
    return this._iridescence;
  }
  set iridescence(e) {
    this._iridescence > 0 != e > 0 && this.version++, this._iridescence = e;
  }
  get dispersion() {
    return this._dispersion;
  }
  set dispersion(e) {
    this._dispersion > 0 != e > 0 && this.version++, this._dispersion = e;
  }
  get sheen() {
    return this._sheen;
  }
  set sheen(e) {
    this._sheen > 0 != e > 0 && this.version++, this._sheen = e;
  }
  get transmission() {
    return this._transmission;
  }
  set transmission(e) {
    this._transmission > 0 != e > 0 && this.version++, this._transmission = e;
  }
  copy(e) {
    return super.copy(e), this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.anisotropy = e.anisotropy, this.anisotropyRotation = e.anisotropyRotation, this.anisotropyMap = e.anisotropyMap, this.clearcoat = e.clearcoat, this.clearcoatMap = e.clearcoatMap, this.clearcoatRoughness = e.clearcoatRoughness, this.clearcoatRoughnessMap = e.clearcoatRoughnessMap, this.clearcoatNormalMap = e.clearcoatNormalMap, this.clearcoatNormalScale.copy(e.clearcoatNormalScale), this.dispersion = e.dispersion, this.ior = e.ior, this.iridescence = e.iridescence, this.iridescenceMap = e.iridescenceMap, this.iridescenceIOR = e.iridescenceIOR, this.iridescenceThicknessRange = [...e.iridescenceThicknessRange], this.iridescenceThicknessMap = e.iridescenceThicknessMap, this.sheen = e.sheen, this.sheenColor.copy(e.sheenColor), this.sheenColorMap = e.sheenColorMap, this.sheenRoughness = e.sheenRoughness, this.sheenRoughnessMap = e.sheenRoughnessMap, this.transmission = e.transmission, this.transmissionMap = e.transmissionMap, this.thickness = e.thickness, this.thicknessMap = e.thicknessMap, this.attenuationDistance = e.attenuationDistance, this.attenuationColor.copy(e.attenuationColor), this.specularIntensity = e.specularIntensity, this.specularIntensityMap = e.specularIntensityMap, this.specularColor.copy(e.specularColor), this.specularColorMap = e.specularColorMap, this;
  }
}
function Dr(i, e, t) {
  return !i || // let 'undefined' and 'null' pass
  !t && i.constructor === e ? i : typeof e.BYTES_PER_ELEMENT == "number" ? new e(i) : Array.prototype.slice.call(i);
}
function wv(i) {
  return ArrayBuffer.isView(i) && !(i instanceof DataView);
}
function Rv(i) {
  function e(s, r) {
    return i[s] - i[r];
  }
  const t = i.length, n = new Array(t);
  for (let s = 0; s !== t; ++s) n[s] = s;
  return n.sort(e), n;
}
function dh(i, e, t) {
  const n = i.length, s = new i.constructor(n);
  for (let r = 0, o = 0; o !== n; ++r) {
    const a = t[r] * e;
    for (let c = 0; c !== e; ++c)
      s[o++] = i[a + c];
  }
  return s;
}
function Nu(i, e, t, n) {
  let s = 1, r = i[0];
  for (; r !== void 0 && r[n] === void 0; )
    r = i[s++];
  if (r === void 0) return;
  let o = r[n];
  if (o !== void 0)
    if (Array.isArray(o))
      do
        o = r[n], o !== void 0 && (e.push(r.time), t.push.apply(t, o)), r = i[s++];
      while (r !== void 0);
    else if (o.toArray !== void 0)
      do
        o = r[n], o !== void 0 && (e.push(r.time), o.toArray(t, t.length)), r = i[s++];
      while (r !== void 0);
    else
      do
        o = r[n], o !== void 0 && (e.push(r.time), t.push(o)), r = i[s++];
      while (r !== void 0);
}
class Ks {
  constructor(e, t, n, s) {
    this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = s !== void 0 ? s : new t.constructor(n), this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    const t = this.parameterPositions;
    let n = this._cachedIndex, s = t[n], r = t[n - 1];
    n: {
      e: {
        let o;
        t: {
          i: if (!(e < s)) {
            for (let a = n + 2; ; ) {
              if (s === void 0) {
                if (e < r) break i;
                return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
              }
              if (n === a) break;
              if (r = s, s = t[++n], e < s)
                break e;
            }
            o = t.length;
            break t;
          }
          if (!(e >= r)) {
            const a = t[1];
            e < a && (n = 2, r = a);
            for (let c = n - 2; ; ) {
              if (r === void 0)
                return this._cachedIndex = 0, this.copySampleValue_(0);
              if (n === c) break;
              if (s = r, r = t[--n - 1], e >= r)
                break e;
            }
            o = n, n = 0;
            break t;
          }
          break n;
        }
        for (; n < o; ) {
          const a = n + o >>> 1;
          e < t[a] ? o = a : n = a + 1;
        }
        if (s = t[n], r = t[n - 1], r === void 0)
          return this._cachedIndex = 0, this.copySampleValue_(0);
        if (s === void 0)
          return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
      }
      this._cachedIndex = n, this.intervalChanged_(n, r, s);
    }
    return this.interpolate_(n, r, e, s);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, s = this.valueSize, r = e * s;
    for (let o = 0; o !== s; ++o)
      t[o] = n[r + o];
    return t;
  }
  // Template methods for derived classes:
  interpolate_() {
    throw new Error("call to abstract method");
  }
  intervalChanged_() {
  }
}
class Cv extends Ks {
  constructor(e, t, n, s) {
    super(e, t, n, s), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: Zc,
      endingEnd: Zc
    };
  }
  intervalChanged_(e, t, n) {
    const s = this.parameterPositions;
    let r = e - 2, o = e + 1, a = s[r], c = s[o];
    if (a === void 0)
      switch (this.getSettings_().endingStart) {
        case Jc:
          r = e, a = 2 * t - n;
          break;
        case Qc:
          r = s.length - 2, a = t + s[r] - s[r + 1];
          break;
        default:
          r = e, a = n;
      }
    if (c === void 0)
      switch (this.getSettings_().endingEnd) {
        case Jc:
          o = e, c = 2 * n - t;
          break;
        case Qc:
          o = 1, c = n + s[1] - s[0];
          break;
        default:
          o = e - 1, c = t;
      }
    const l = (n - t) * 0.5, h = this.valueSize;
    this._weightPrev = l / (t - a), this._weightNext = l / (c - n), this._offsetPrev = r * h, this._offsetNext = o * h;
  }
  interpolate_(e, t, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, c = e * a, l = c - a, h = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, g = (n - t) / (s - t), _ = g * g, p = _ * g, m = -d * p + 2 * d * _ - d * g, T = (1 + d) * p + (-1.5 - 2 * d) * _ + (-0.5 + d) * g + 1, y = (-1 - f) * p + (1.5 + f) * _ + 0.5 * g, S = f * p - f * _;
    for (let D = 0; D !== a; ++D)
      r[D] = m * o[h + D] + T * o[l + D] + y * o[c + D] + S * o[u + D];
    return r;
  }
}
class Pv extends Ks {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  interpolate_(e, t, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, c = e * a, l = c - a, h = (n - t) / (s - t), u = 1 - h;
    for (let d = 0; d !== a; ++d)
      r[d] = o[l + d] * u + o[c + d] * h;
    return r;
  }
}
class Lv extends Ks {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}
class pn {
  constructor(e, t, n, s) {
    if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = Dr(t, this.TimeBufferType), this.values = Dr(n, this.ValueBufferType), this.setInterpolation(s || this.DefaultInterpolation);
  }
  // Serialization (in static context, because of constructor invocation
  // and automatic invocation of .toJSON):
  static toJSON(e) {
    const t = e.constructor;
    let n;
    if (t.toJSON !== this.toJSON)
      n = t.toJSON(e);
    else {
      n = {
        name: e.name,
        times: Dr(e.times, Array),
        values: Dr(e.values, Array)
      };
      const s = e.getInterpolation();
      s !== e.DefaultInterpolation && (n.interpolation = s);
    }
    return n.type = e.ValueTypeName, n;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new Lv(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new Pv(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new Cv(this.times, this.values, this.getValueSize(), e);
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case Hs:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case Vs:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case fo:
        t = this.InterpolantFactoryMethodSmooth;
        break;
    }
    if (t === void 0) {
      const n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0)
        if (e !== this.DefaultInterpolation)
          this.setInterpolation(this.DefaultInterpolation);
        else
          throw new Error(n);
      return console.warn("THREE.KeyframeTrack:", n), this;
    }
    return this.createInterpolant = t, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return Hs;
      case this.InterpolantFactoryMethodLinear:
        return Vs;
      case this.InterpolantFactoryMethodSmooth:
        return fo;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  // move all keyframes either forwards or backwards in time
  shift(e) {
    if (e !== 0) {
      const t = this.times;
      for (let n = 0, s = t.length; n !== s; ++n)
        t[n] += e;
    }
    return this;
  }
  // scale all keyframe times by a factor (useful for frame <-> seconds conversions)
  scale(e) {
    if (e !== 1) {
      const t = this.times;
      for (let n = 0, s = t.length; n !== s; ++n)
        t[n] *= e;
    }
    return this;
  }
  // removes keyframes before and after animation without changing any values within the range [startTime, endTime].
  // IMPORTANT: We do not shift around keys to the start of the track time, because for interpolated keys this will change their values
  trim(e, t) {
    const n = this.times, s = n.length;
    let r = 0, o = s - 1;
    for (; r !== s && n[r] < e; )
      ++r;
    for (; o !== -1 && n[o] > t; )
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
    let e = !0;
    const t = this.getValueSize();
    t - Math.floor(t) !== 0 && (console.error("THREE.KeyframeTrack: Invalid value size in track.", this), e = !1);
    const n = this.times, s = this.values, r = n.length;
    r === 0 && (console.error("THREE.KeyframeTrack: Track is empty.", this), e = !1);
    let o = null;
    for (let a = 0; a !== r; a++) {
      const c = n[a];
      if (typeof c == "number" && isNaN(c)) {
        console.error("THREE.KeyframeTrack: Time is not a valid number.", this, a, c), e = !1;
        break;
      }
      if (o !== null && o > c) {
        console.error("THREE.KeyframeTrack: Out of order keys.", this, a, c, o), e = !1;
        break;
      }
      o = c;
    }
    if (s !== void 0 && wv(s))
      for (let a = 0, c = s.length; a !== c; ++a) {
        const l = s[a];
        if (isNaN(l)) {
          console.error("THREE.KeyframeTrack: Value is not a valid number.", this, a, l), e = !1;
          break;
        }
      }
    return e;
  }
  // removes equivalent sequential keys as common in morph target sequences
  // (0,0,0,0,1,1,1,0,0,0,0,0,0,0) --> (0,0,1,1,0,0)
  optimize() {
    const e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), s = this.getInterpolation() === fo, r = e.length - 1;
    let o = 1;
    for (let a = 1; a < r; ++a) {
      let c = !1;
      const l = e[a], h = e[a + 1];
      if (l !== h && (a !== 1 || l !== e[0]))
        if (s)
          c = !0;
        else {
          const u = a * n, d = u - n, f = u + n;
          for (let g = 0; g !== n; ++g) {
            const _ = t[u + g];
            if (_ !== t[d + g] || _ !== t[f + g]) {
              c = !0;
              break;
            }
          }
        }
      if (c) {
        if (a !== o) {
          e[o] = e[a];
          const u = a * n, d = o * n;
          for (let f = 0; f !== n; ++f)
            t[d + f] = t[u + f];
        }
        ++o;
      }
    }
    if (r > 0) {
      e[o] = e[r];
      for (let a = r * n, c = o * n, l = 0; l !== n; ++l)
        t[c + l] = t[a + l];
      ++o;
    }
    return o !== e.length ? (this.times = e.slice(0, o), this.values = t.slice(0, o * n)) : (this.times = e, this.values = t), this;
  }
  clone() {
    const e = this.times.slice(), t = this.values.slice(), n = this.constructor, s = new n(this.name, e, t);
    return s.createInterpolant = this.createInterpolant, s;
  }
}
pn.prototype.TimeBufferType = Float32Array;
pn.prototype.ValueBufferType = Float32Array;
pn.prototype.DefaultInterpolation = Vs;
class us extends pn {
  // No interpolation parameter because only InterpolateDiscrete is valid.
  constructor(e, t, n) {
    super(e, t, n);
  }
}
us.prototype.ValueTypeName = "bool";
us.prototype.ValueBufferType = Array;
us.prototype.DefaultInterpolation = Hs;
us.prototype.InterpolantFactoryMethodLinear = void 0;
us.prototype.InterpolantFactoryMethodSmooth = void 0;
class Uu extends pn {
}
Uu.prototype.ValueTypeName = "color";
class rs extends pn {
}
rs.prototype.ValueTypeName = "number";
class Iv extends Ks {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  interpolate_(e, t, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, c = (n - t) / (s - t);
    let l = e * a;
    for (let h = l + a; l !== h; l += 4)
      cn.slerpFlat(r, 0, o, l - a, o, l, c);
    return r;
  }
}
class os extends pn {
  InterpolantFactoryMethodLinear(e) {
    return new Iv(this.times, this.values, this.getValueSize(), e);
  }
}
os.prototype.ValueTypeName = "quaternion";
os.prototype.InterpolantFactoryMethodSmooth = void 0;
class ds extends pn {
  // No interpolation parameter because only InterpolateDiscrete is valid.
  constructor(e, t, n) {
    super(e, t, n);
  }
}
ds.prototype.ValueTypeName = "string";
ds.prototype.ValueBufferType = Array;
ds.prototype.DefaultInterpolation = Hs;
ds.prototype.InterpolantFactoryMethodLinear = void 0;
ds.prototype.InterpolantFactoryMethodSmooth = void 0;
class as extends pn {
}
as.prototype.ValueTypeName = "vector";
class Dv {
  constructor(e = "", t = -1, n = [], s = Kd) {
    this.name = e, this.tracks = n, this.duration = t, this.blendMode = s, this.uuid = jt(), this.duration < 0 && this.resetDuration();
  }
  static parse(e) {
    const t = [], n = e.tracks, s = 1 / (e.fps || 1);
    for (let o = 0, a = n.length; o !== a; ++o)
      t.push(Uv(n[o]).scale(s));
    const r = new this(e.name, e.duration, t, e.blendMode);
    return r.uuid = e.uuid, r;
  }
  static toJSON(e) {
    const t = [], n = e.tracks, s = {
      name: e.name,
      duration: e.duration,
      tracks: t,
      uuid: e.uuid,
      blendMode: e.blendMode
    };
    for (let r = 0, o = n.length; r !== o; ++r)
      t.push(pn.toJSON(n[r]));
    return s;
  }
  static CreateFromMorphTargetSequence(e, t, n, s) {
    const r = t.length, o = [];
    for (let a = 0; a < r; a++) {
      let c = [], l = [];
      c.push(
        (a + r - 1) % r,
        a,
        (a + 1) % r
      ), l.push(0, 1, 0);
      const h = Rv(c);
      c = dh(c, 1, h), l = dh(l, 1, h), !s && c[0] === 0 && (c.push(r), l.push(l[0])), o.push(
        new rs(
          ".morphTargetInfluences[" + t[a].name + "]",
          c,
          l
        ).scale(1 / n)
      );
    }
    return new this(e, -1, o);
  }
  static findByName(e, t) {
    let n = e;
    if (!Array.isArray(e)) {
      const s = e;
      n = s.geometry && s.geometry.animations || s.animations;
    }
    for (let s = 0; s < n.length; s++)
      if (n[s].name === t)
        return n[s];
    return null;
  }
  static CreateClipsFromMorphTargetSequences(e, t, n) {
    const s = {}, r = /^([\w-]*?)([\d]+)$/;
    for (let a = 0, c = e.length; a < c; a++) {
      const l = e[a], h = l.name.match(r);
      if (h && h.length > 1) {
        const u = h[1];
        let d = s[u];
        d || (s[u] = d = []), d.push(l);
      }
    }
    const o = [];
    for (const a in s)
      o.push(this.CreateFromMorphTargetSequence(a, s[a], t, n));
    return o;
  }
  // parse the animation.hierarchy format
  static parseAnimation(e, t) {
    if (!e)
      return console.error("THREE.AnimationClip: No animation in JSONLoader data."), null;
    const n = function(u, d, f, g, _) {
      if (f.length !== 0) {
        const p = [], m = [];
        Nu(f, p, m, g), p.length !== 0 && _.push(new u(d, p, m));
      }
    }, s = [], r = e.name || "default", o = e.fps || 30, a = e.blendMode;
    let c = e.length || -1;
    const l = e.hierarchy || [];
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
            for (let T = 0; T !== d[g].morphTargets.length; ++T) {
              const y = d[g];
              p.push(y.time), m.push(y.morphTarget === _ ? 1 : 0);
            }
            s.push(new rs(".morphTargetInfluence[" + _ + "]", p, m));
          }
          c = f.length * o;
        } else {
          const f = ".bones[" + t[u].name + "]";
          n(
            as,
            f + ".position",
            d,
            "pos",
            s
          ), n(
            os,
            f + ".quaternion",
            d,
            "rot",
            s
          ), n(
            as,
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
    const e = this.tracks;
    let t = 0;
    for (let n = 0, s = e.length; n !== s; ++n) {
      const r = this.tracks[n];
      t = Math.max(t, r.times[r.times.length - 1]);
    }
    return this.duration = t, this;
  }
  trim() {
    for (let e = 0; e < this.tracks.length; e++)
      this.tracks[e].trim(0, this.duration);
    return this;
  }
  validate() {
    let e = !0;
    for (let t = 0; t < this.tracks.length; t++)
      e = e && this.tracks[t].validate();
    return e;
  }
  optimize() {
    for (let e = 0; e < this.tracks.length; e++)
      this.tracks[e].optimize();
    return this;
  }
  clone() {
    const e = [];
    for (let t = 0; t < this.tracks.length; t++)
      e.push(this.tracks[t].clone());
    return new this.constructor(this.name, this.duration, e, this.blendMode);
  }
  toJSON() {
    return this.constructor.toJSON(this);
  }
}
function Nv(i) {
  switch (i.toLowerCase()) {
    case "scalar":
    case "double":
    case "float":
    case "number":
    case "integer":
      return rs;
    case "vector":
    case "vector2":
    case "vector3":
    case "vector4":
      return as;
    case "color":
      return Uu;
    case "quaternion":
      return os;
    case "bool":
    case "boolean":
      return us;
    case "string":
      return ds;
  }
  throw new Error("THREE.KeyframeTrack: Unsupported typeName: " + i);
}
function Uv(i) {
  if (i.type === void 0)
    throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const e = Nv(i.type);
  if (i.times === void 0) {
    const t = [], n = [];
    Nu(i.keys, t, n, "value"), i.times = t, i.values = n;
  }
  return e.parse !== void 0 ? e.parse(i) : new e(i.name, i.times, i.values, i.interpolation);
}
const Wn = {
  enabled: !1,
  files: {},
  add: function(i, e) {
    this.enabled !== !1 && (this.files[i] = e);
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
class Ov {
  constructor(e, t, n) {
    const s = this;
    let r = !1, o = 0, a = 0, c;
    const l = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this.itemStart = function(h) {
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
const Fv = /* @__PURE__ */ new Ov();
class fs {
  constructor(e) {
    this.manager = e !== void 0 ? e : Fv, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
  }
  load() {
  }
  loadAsync(e, t) {
    const n = this;
    return new Promise(function(s, r) {
      n.load(e, s, t, r);
    });
  }
  parse() {
  }
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  setPath(e) {
    return this.path = e, this;
  }
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
}
fs.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const Mn = {};
class Bv extends Error {
  constructor(e, t) {
    super(e), this.response = t;
  }
}
class Ou extends fs {
  constructor(e) {
    super(e);
  }
  load(e, t, n, s) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const r = Wn.get(e);
    if (r !== void 0)
      return this.manager.itemStart(e), setTimeout(() => {
        t && t(r), this.manager.itemEnd(e);
      }, 0), r;
    if (Mn[e] !== void 0) {
      Mn[e].push({
        onLoad: t,
        onProgress: n,
        onError: s
      });
      return;
    }
    Mn[e] = [], Mn[e].push({
      onLoad: t,
      onProgress: n,
      onError: s
    });
    const o = new Request(e, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin"
      // An abort controller could be added within a future PR
    }), a = this.mimeType, c = this.responseType;
    fetch(o).then((l) => {
      if (l.status === 200 || l.status === 0) {
        if (l.status === 0 && console.warn("THREE.FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || l.body === void 0 || l.body.getReader === void 0)
          return l;
        const h = Mn[e], u = l.body.getReader(), d = l.headers.get("X-File-Size") || l.headers.get("Content-Length"), f = d ? parseInt(d) : 0, g = f !== 0;
        let _ = 0;
        const p = new ReadableStream({
          start(m) {
            T();
            function T() {
              u.read().then(({ done: y, value: S }) => {
                if (y)
                  m.close();
                else {
                  _ += S.byteLength;
                  const D = new ProgressEvent("progress", { lengthComputable: g, loaded: _, total: f });
                  for (let R = 0, A = h.length; R < A; R++) {
                    const N = h[R];
                    N.onProgress && N.onProgress(D);
                  }
                  m.enqueue(S), T();
                }
              }, (y) => {
                m.error(y);
              });
            }
          }
        });
        return new Response(p);
      } else
        throw new Bv(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`, l);
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
      Wn.add(e, l);
      const h = Mn[e];
      delete Mn[e];
      for (let u = 0, d = h.length; u < d; u++) {
        const f = h[u];
        f.onLoad && f.onLoad(l);
      }
    }).catch((l) => {
      const h = Mn[e];
      if (h === void 0)
        throw this.manager.itemError(e), l;
      delete Mn[e];
      for (let u = 0, d = h.length; u < d; u++) {
        const f = h[u];
        f.onError && f.onError(l);
      }
      this.manager.itemError(e);
    }).finally(() => {
      this.manager.itemEnd(e);
    }), this.manager.itemStart(e);
  }
  setResponseType(e) {
    return this.responseType = e, this;
  }
  setMimeType(e) {
    return this.mimeType = e, this;
  }
}
class zv extends fs {
  constructor(e) {
    super(e);
  }
  load(e, t, n, s) {
    this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const r = this, o = Wn.get(e);
    if (o !== void 0)
      return r.manager.itemStart(e), setTimeout(function() {
        t && t(o), r.manager.itemEnd(e);
      }, 0), o;
    const a = Gs("img");
    function c() {
      h(), Wn.add(e, this), t && t(this), r.manager.itemEnd(e);
    }
    function l(u) {
      h(), s && s(u), r.manager.itemError(e), r.manager.itemEnd(e);
    }
    function h() {
      a.removeEventListener("load", c, !1), a.removeEventListener("error", l, !1);
    }
    return a.addEventListener("load", c, !1), a.addEventListener("error", l, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (a.crossOrigin = this.crossOrigin), r.manager.itemStart(e), a.src = e, a;
  }
}
class kv extends fs {
  constructor(e) {
    super(e);
  }
  load(e, t, n, s) {
    const r = new _t(), o = new zv(this.manager);
    return o.setCrossOrigin(this.crossOrigin), o.setPath(this.path), o.load(e, function(a) {
      r.image = a, r.needsUpdate = !0, t !== void 0 && t(r);
    }, n, s), r;
  }
}
class Zs extends at {
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Me(e), this.intensity = t;
  }
  dispose() {
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, this.groundColor !== void 0 && (t.object.groundColor = this.groundColor.getHex()), this.distance !== void 0 && (t.object.distance = this.distance), this.angle !== void 0 && (t.object.angle = this.angle), this.decay !== void 0 && (t.object.decay = this.decay), this.penumbra !== void 0 && (t.object.penumbra = this.penumbra), this.shadow !== void 0 && (t.object.shadow = this.shadow.toJSON()), this.target !== void 0 && (t.object.target = this.target.uuid), t;
  }
}
class Hv extends Zs {
  constructor(e, t, n) {
    super(e, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(at.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Me(t);
  }
  copy(e, t) {
    return super.copy(e, t), this.groundColor.copy(e.groundColor), this;
  }
}
const jo = /* @__PURE__ */ new Ce(), fh = /* @__PURE__ */ new w(), ph = /* @__PURE__ */ new w();
class Sc {
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new te(512, 512), this.map = null, this.mapPass = null, this.matrix = new Ce(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new fc(), this._frameExtents = new te(1, 1), this._viewportCount = 1, this._viewports = [
      new qe(0, 0, 1, 1)
    ];
  }
  getViewportCount() {
    return this._viewportCount;
  }
  getFrustum() {
    return this._frustum;
  }
  updateMatrices(e) {
    const t = this.camera, n = this.matrix;
    fh.setFromMatrixPosition(e.matrixWorld), t.position.copy(fh), ph.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(ph), t.updateMatrixWorld(), jo.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), this._frustum.setFromProjectionMatrix(jo), n.set(
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
    ), n.multiply(jo);
  }
  getViewport(e) {
    return this._viewports[e];
  }
  getFrameExtents() {
    return this._frameExtents;
  }
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.mapSize.copy(e.mapSize), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    const e = {};
    return this.intensity !== 1 && (e.intensity = this.intensity), this.bias !== 0 && (e.bias = this.bias), this.normalBias !== 0 && (e.normalBias = this.normalBias), this.radius !== 1 && (e.radius = this.radius), (this.mapSize.x !== 512 || this.mapSize.y !== 512) && (e.mapSize = this.mapSize.toArray()), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
class Vv extends Sc {
  constructor() {
    super(new Ct(50, 1, 0.5, 500)), this.isSpotLightShadow = !0, this.focus = 1;
  }
  updateMatrices(e) {
    const t = this.camera, n = is * 2 * e.angle * this.focus, s = this.mapSize.width / this.mapSize.height, r = e.distance || t.far;
    (n !== t.fov || s !== t.aspect || r !== t.far) && (t.fov = n, t.aspect = s, t.far = r, t.updateProjectionMatrix()), super.updateMatrices(e);
  }
  copy(e) {
    return super.copy(e), this.focus = e.focus, this;
  }
}
class Gv extends Zs {
  constructor(e, t, n = 0, s = Math.PI / 3, r = 0, o = 2) {
    super(e, t), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(at.DEFAULT_UP), this.updateMatrix(), this.target = new at(), this.distance = n, this.angle = s, this.penumbra = r, this.decay = o, this.map = null, this.shadow = new Vv();
  }
  get power() {
    return this.intensity * Math.PI;
  }
  set power(e) {
    this.intensity = e / Math.PI;
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.angle = e.angle, this.penumbra = e.penumbra, this.decay = e.decay, this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
const mh = /* @__PURE__ */ new Ce(), As = /* @__PURE__ */ new w(), Ko = /* @__PURE__ */ new w();
class Wv extends Sc {
  constructor() {
    super(new Ct(90, 1, 0.5, 500)), this.isPointLightShadow = !0, this._frameExtents = new te(4, 2), this._viewportCount = 6, this._viewports = [
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
      new qe(2, 1, 1, 1),
      // negative X
      new qe(0, 1, 1, 1),
      // positive Z
      new qe(3, 1, 1, 1),
      // negative Z
      new qe(1, 1, 1, 1),
      // positive Y
      new qe(3, 0, 1, 1),
      // negative Y
      new qe(1, 0, 1, 1)
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
  updateMatrices(e, t = 0) {
    const n = this.camera, s = this.matrix, r = e.distance || n.far;
    r !== n.far && (n.far = r, n.updateProjectionMatrix()), As.setFromMatrixPosition(e.matrixWorld), n.position.copy(As), Ko.copy(n.position), Ko.add(this._cubeDirections[t]), n.up.copy(this._cubeUps[t]), n.lookAt(Ko), n.updateMatrixWorld(), s.makeTranslation(-As.x, -As.y, -As.z), mh.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(mh);
  }
}
class Fu extends Zs {
  constructor(e, t, n = 0, s = 2) {
    super(e, t), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = s, this.shadow = new Wv();
  }
  get power() {
    return this.intensity * 4 * Math.PI;
  }
  set power(e) {
    this.intensity = e / (4 * Math.PI);
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e, t) {
    return super.copy(e, t), this.distance = e.distance, this.decay = e.decay, this.shadow = e.shadow.clone(), this;
  }
}
class Xv extends Sc {
  constructor() {
    super(new pc(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class Bu extends Zs {
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(at.DEFAULT_UP), this.updateMatrix(), this.target = new at(), this.shadow = new Xv();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
}
class $v extends Zs {
  constructor(e, t) {
    super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
class Os {
  static decodeText(e) {
    if (console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."), typeof TextDecoder < "u")
      return new TextDecoder().decode(e);
    let t = "";
    for (let n = 0, s = e.length; n < s; n++)
      t += String.fromCharCode(e[n]);
    try {
      return decodeURIComponent(escape(t));
    } catch {
      return t;
    }
  }
  static extractUrlBase(e) {
    const t = e.lastIndexOf("/");
    return t === -1 ? "./" : e.slice(0, t + 1);
  }
  static resolveURL(e, t) {
    return typeof e != "string" || e === "" ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e);
  }
}
class qv extends fs {
  constructor(e) {
    super(e), this.isImageBitmapLoader = !0, typeof createImageBitmap > "u" && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch > "u" && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.options = { premultiplyAlpha: "none" };
  }
  setOptions(e) {
    return this.options = e, this;
  }
  load(e, t, n, s) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const r = this, o = Wn.get(e);
    if (o !== void 0) {
      if (r.manager.itemStart(e), o.then) {
        o.then((l) => {
          t && t(l), r.manager.itemEnd(e);
        }).catch((l) => {
          s && s(l);
        });
        return;
      }
      return setTimeout(function() {
        t && t(o), r.manager.itemEnd(e);
      }, 0), o;
    }
    const a = {};
    a.credentials = this.crossOrigin === "anonymous" ? "same-origin" : "include", a.headers = this.requestHeader;
    const c = fetch(e, a).then(function(l) {
      return l.blob();
    }).then(function(l) {
      return createImageBitmap(l, Object.assign(r.options, { colorSpaceConversion: "none" }));
    }).then(function(l) {
      return Wn.add(e, l), t && t(l), r.manager.itemEnd(e), l;
    }).catch(function(l) {
      s && s(l), Wn.remove(e), r.manager.itemError(e), r.manager.itemEnd(e);
    });
    Wn.add(e, c), r.manager.itemStart(e);
  }
}
class Yv {
  constructor(e = !0) {
    this.autoStart = e, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1;
  }
  start() {
    this.startTime = gh(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
  }
  stop() {
    this.getElapsedTime(), this.running = !1, this.autoStart = !1;
  }
  getElapsedTime() {
    return this.getDelta(), this.elapsedTime;
  }
  getDelta() {
    let e = 0;
    if (this.autoStart && !this.running)
      return this.start(), 0;
    if (this.running) {
      const t = gh();
      e = (t - this.oldTime) / 1e3, this.oldTime = t, this.elapsedTime += e;
    }
    return e;
  }
}
function gh() {
  return performance.now();
}
const Ec = "\\[\\]\\.:\\/", jv = new RegExp("[" + Ec + "]", "g"), Tc = "[^" + Ec + "]", Kv = "[^" + Ec.replace("\\.", "") + "]", Zv = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", Tc), Jv = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", Kv), Qv = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Tc), ex = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Tc), tx = new RegExp(
  "^" + Zv + Jv + Qv + ex + "$"
), nx = ["material", "materials", "bones", "map"];
class ix {
  constructor(e, t, n) {
    const s = n || Qe.parseTrackName(t);
    this._targetGroup = e, this._bindings = e.subscribe_(t, s);
  }
  getValue(e, t) {
    this.bind();
    const n = this._targetGroup.nCachedObjects_, s = this._bindings[n];
    s !== void 0 && s.getValue(e, t);
  }
  setValue(e, t) {
    const n = this._bindings;
    for (let s = this._targetGroup.nCachedObjects_, r = n.length; s !== r; ++s)
      n[s].setValue(e, t);
  }
  bind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)
      e[t].bind();
  }
  unbind() {
    const e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t)
      e[t].unbind();
  }
}
class Qe {
  constructor(e, t, n) {
    this.path = t, this.parsedPath = n || Qe.parseTrackName(t), this.node = Qe.findNode(e, this.parsedPath.nodeName), this.rootNode = e, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(e, t, n) {
    return e && e.isAnimationObjectGroup ? new Qe.Composite(e, t, n) : new Qe(e, t, n);
  }
  /**
   * Replaces spaces with underscores and removes unsupported characters from
   * node names, to ensure compatibility with parseTrackName().
   *
   * @param {string} name Node name to be sanitized.
   * @return {string}
   */
  static sanitizeNodeName(e) {
    return e.replace(/\s/g, "_").replace(jv, "");
  }
  static parseTrackName(e) {
    const t = tx.exec(e);
    if (t === null)
      throw new Error("PropertyBinding: Cannot parse trackName: " + e);
    const n = {
      // directoryName: matches[ 1 ], // (tschw) currently unused
      nodeName: t[2],
      objectName: t[3],
      objectIndex: t[4],
      propertyName: t[5],
      // required
      propertyIndex: t[6]
    }, s = n.nodeName && n.nodeName.lastIndexOf(".");
    if (s !== void 0 && s !== -1) {
      const r = n.nodeName.substring(s + 1);
      nx.indexOf(r) !== -1 && (n.nodeName = n.nodeName.substring(0, s), n.objectName = r);
    }
    if (n.propertyName === null || n.propertyName.length === 0)
      throw new Error("PropertyBinding: can not parse propertyName from trackName: " + e);
    return n;
  }
  static findNode(e, t) {
    if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid)
      return e;
    if (e.skeleton) {
      const n = e.skeleton.getBoneByName(t);
      if (n !== void 0)
        return n;
    }
    if (e.children) {
      const n = function(r) {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          if (a.name === t || a.uuid === t)
            return a;
          const c = n(a.children);
          if (c) return c;
        }
        return null;
      }, s = n(e.children);
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
  _getValue_direct(e, t) {
    e[t] = this.targetObject[this.propertyName];
  }
  _getValue_array(e, t) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      e[t++] = n[s];
  }
  _getValue_arrayElement(e, t) {
    e[t] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(e, t) {
    this.resolvedProperty.toArray(e, t);
  }
  // Direct
  _setValue_direct(e, t) {
    this.targetObject[this.propertyName] = e[t];
  }
  _setValue_direct_setNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  // EntireArray
  _setValue_array(e, t) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      n[s] = e[t++];
  }
  _setValue_array_setNeedsUpdate(e, t) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      n[s] = e[t++];
    this.targetObject.needsUpdate = !0;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(e, t) {
    const n = this.resolvedProperty;
    for (let s = 0, r = n.length; s !== r; ++s)
      n[s] = e[t++];
    this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  // ArrayElement
  _setValue_arrayElement(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t];
  }
  _setValue_arrayElement_setNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = !0;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  // HasToFromArray
  _setValue_fromArray(e, t) {
    this.resolvedProperty.fromArray(e, t);
  }
  _setValue_fromArray_setNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = !0;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = !0;
  }
  _getValue_unbound(e, t) {
    this.bind(), this.getValue(e, t);
  }
  _setValue_unbound(e, t) {
    this.bind(), this.setValue(e, t);
  }
  // create getter / setter pair for a property in the scene graph
  bind() {
    let e = this.node;
    const t = this.parsedPath, n = t.objectName, s = t.propertyName;
    let r = t.propertyIndex;
    if (e || (e = Qe.findNode(this.rootNode, t.nodeName), this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) {
      console.warn("THREE.PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (n) {
      let l = t.objectIndex;
      switch (n) {
        case "materials":
          if (!e.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!e.material.materials) {
            console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          e = e.material.materials;
          break;
        case "bones":
          if (!e.skeleton) {
            console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          e = e.skeleton.bones;
          for (let h = 0; h < e.length; h++)
            if (e[h].name === l) {
              l = h;
              break;
            }
          break;
        case "map":
          if ("map" in e) {
            e = e.map;
            break;
          }
          if (!e.material) {
            console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!e.material.map) {
            console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          e = e.material.map;
          break;
        default:
          if (e[n] === void 0) {
            console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          e = e[n];
      }
      if (l !== void 0) {
        if (e[l] === void 0) {
          console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e);
          return;
        }
        e = e[l];
      }
    }
    const o = e[s];
    if (o === void 0) {
      const l = t.nodeName;
      console.error("THREE.PropertyBinding: Trying to update property for track: " + l + "." + s + " but it wasn't found.", e);
      return;
    }
    let a = this.Versioning.None;
    this.targetObject = e, e.needsUpdate !== void 0 ? a = this.Versioning.NeedsUpdate : e.matrixWorldNeedsUpdate !== void 0 && (a = this.Versioning.MatrixWorldNeedsUpdate);
    let c = this.BindingType.Direct;
    if (r !== void 0) {
      if (s === "morphTargetInfluences") {
        if (!e.geometry) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!e.geometry.morphAttributes) {
          console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        e.morphTargetDictionary[r] !== void 0 && (r = e.morphTargetDictionary[r]);
      }
      c = this.BindingType.ArrayElement, this.resolvedProperty = o, this.propertyIndex = r;
    } else o.fromArray !== void 0 && o.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = o) : Array.isArray(o) ? (c = this.BindingType.EntireArray, this.resolvedProperty = o) : this.propertyName = s;
    this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][a];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
}
Qe.Composite = ix;
Qe.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
Qe.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
Qe.prototype.GetterByBindingType = [
  Qe.prototype._getValue_direct,
  Qe.prototype._getValue_array,
  Qe.prototype._getValue_arrayElement,
  Qe.prototype._getValue_toArray
];
Qe.prototype.SetterByBindingTypeAndVersioning = [
  [
    // Direct
    Qe.prototype._setValue_direct,
    Qe.prototype._setValue_direct_setNeedsUpdate,
    Qe.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    // EntireArray
    Qe.prototype._setValue_array,
    Qe.prototype._setValue_array_setNeedsUpdate,
    Qe.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    // ArrayElement
    Qe.prototype._setValue_arrayElement,
    Qe.prototype._setValue_arrayElement_setNeedsUpdate,
    Qe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    // HasToFromArray
    Qe.prototype._setValue_fromArray,
    Qe.prototype._setValue_fromArray_setNeedsUpdate,
    Qe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
const _h = /* @__PURE__ */ new Ce();
class sx {
  constructor(e, t, n = 0, s = 1 / 0) {
    this.ray = new cs(e, t), this.near = n, this.far = s, this.camera = null, this.layers = new dc(), this.params = {
      Mesh: {},
      Line: { threshold: 1 },
      LOD: {},
      Points: { threshold: 1 },
      Sprite: {}
    };
  }
  set(e, t) {
    this.ray.set(e, t);
  }
  setFromCamera(e, t) {
    t.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(e.x, e.y, 0.5).unproject(t).sub(this.ray.origin).normalize(), this.camera = t) : t.isOrthographicCamera ? (this.ray.origin.set(e.x, e.y, (t.near + t.far) / (t.near - t.far)).unproject(t), this.ray.direction.set(0, 0, -1).transformDirection(t.matrixWorld), this.camera = t) : console.error("THREE.Raycaster: Unsupported camera type: " + t.type);
  }
  setFromXRController(e) {
    return _h.identity().extractRotation(e.matrixWorld), this.ray.origin.setFromMatrixPosition(e.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(_h), this;
  }
  intersectObject(e, t = !0, n = []) {
    return Xa(e, this, n, t), n.sort(vh), n;
  }
  intersectObjects(e, t = !0, n = []) {
    for (let s = 0, r = e.length; s < r; s++)
      Xa(e[s], this, n, t);
    return n.sort(vh), n;
  }
}
function vh(i, e) {
  return i.distance - e.distance;
}
function Xa(i, e, t, n) {
  let s = !0;
  if (i.layers.test(e.layers) && i.raycast(e, t) === !1 && (s = !1), s === !0 && n === !0) {
    const r = i.children;
    for (let o = 0, a = r.length; o < a; o++)
      Xa(r[o], e, t, !0);
  }
}
class xh {
  constructor(e = 1, t = 0, n = 0) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  set(e, t, n) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  // restrict phi to be between EPS and PI-EPS
  makeSafe() {
    return this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi)), this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, n) {
    return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(gt(t / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class rx extends gi {
  constructor(e, t = null) {
    super(), this.object = e, this.domElement = t, this.enabled = !0, this.state = -1, this.keys = {}, this.mouseButtons = { LEFT: null, MIDDLE: null, RIGHT: null }, this.touches = { ONE: null, TWO: null };
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
  revision: nc
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = nc);
const yh = { type: "change" }, bc = { type: "start" }, zu = { type: "end" }, Nr = new cs(), Mh = new zn(), ox = Math.cos(70 * $i.DEG2RAD), mt = new w(), Ut = 2 * Math.PI, tt = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Zo = 1e-6;
class ax extends rx {
  constructor(e, t = null) {
    super(e, t), this.state = tt.NONE, this.enabled = !0, this.target = new w(), this.cursor = new w(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Gi.ROTATE, MIDDLE: Gi.DOLLY, RIGHT: Gi.PAN }, this.touches = { ONE: Vn.ROTATE, TWO: Vn.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new w(), this._lastQuaternion = new cn(), this._lastTargetPosition = new w(), this._quat = new cn().setFromUnitVectors(e.up, new w(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new xh(), this._sphericalDelta = new xh(), this._scale = 1, this._panOffset = new w(), this._rotateStart = new te(), this._rotateEnd = new te(), this._rotateDelta = new te(), this._panStart = new te(), this._panEnd = new te(), this._panDelta = new te(), this._dollyStart = new te(), this._dollyEnd = new te(), this._dollyDelta = new te(), this._dollyDirection = new w(), this._mouse = new te(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = lx.bind(this), this._onPointerDown = cx.bind(this), this._onPointerUp = hx.bind(this), this._onContextMenu = _x.bind(this), this._onMouseWheel = fx.bind(this), this._onKeyDown = px.bind(this), this._onTouchStart = mx.bind(this), this._onTouchMove = gx.bind(this), this._onMouseDown = ux.bind(this), this._onMouseMove = dx.bind(this), this._interceptControlDown = vx.bind(this), this._interceptControlUp = xx.bind(this), this.domElement !== null && this.connect(), this.update();
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
  listenToKeyEvents(e) {
    e.addEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = e;
  }
  stopListenToKeyEvents() {
    this._domElementKeyEvents !== null && (this._domElementKeyEvents.removeEventListener("keydown", this._onKeyDown), this._domElementKeyEvents = null);
  }
  saveState() {
    this.target0.copy(this.target), this.position0.copy(this.object.position), this.zoom0 = this.object.zoom;
  }
  reset() {
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(yh), this.update(), this.state = tt.NONE;
  }
  update(e = null) {
    const t = this.object.position;
    mt.copy(t).sub(this.target), mt.applyQuaternion(this._quat), this._spherical.setFromVector3(mt), this.autoRotate && this.state === tt.NONE && this._rotateLeft(this._getAutoRotationAngle(e)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(n) && isFinite(s) && (n < -Math.PI ? n += Ut : n > Math.PI && (n -= Ut), s < -Math.PI ? s += Ut : s > Math.PI && (s -= Ut), n <= s ? this._spherical.theta = Math.max(n, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + s) / 2 ? Math.max(n, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const o = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = o != this._spherical.radius;
    }
    if (mt.setFromSpherical(this._spherical), mt.applyQuaternion(this._quatInverse), t.copy(this.target).add(mt), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const a = mt.length();
        o = this._clampDistance(a * this._scale);
        const c = a - o;
        this.object.position.addScaledVector(this._dollyDirection, c), this.object.updateMatrixWorld(), r = !!c;
      } else if (this.object.isOrthographicCamera) {
        const a = new w(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const c = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = c !== this.object.zoom;
        const l = new w(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(a), this.object.updateMatrixWorld(), o = mt.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      o !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position) : (Nr.origin.copy(this.object.position), Nr.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Nr.direction)) < ox ? this.object.lookAt(this.target) : (Mh.setFromNormalAndCoplanarPoint(this.object.up, this.target), Nr.intersectPlane(Mh, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), o !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > Zo || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Zo || this._lastTargetPosition.distanceToSquared(this.target) > Zo ? (this.dispatchEvent(yh), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(e) {
    return e !== null ? Ut / 60 * this.autoRotateSpeed * e : Ut / 60 / 60 * this.autoRotateSpeed;
  }
  _getZoomScale(e) {
    const t = Math.abs(e * 0.01);
    return Math.pow(0.95, this.zoomSpeed * t);
  }
  _rotateLeft(e) {
    this._sphericalDelta.theta -= e;
  }
  _rotateUp(e) {
    this._sphericalDelta.phi -= e;
  }
  _panLeft(e, t) {
    mt.setFromMatrixColumn(t, 0), mt.multiplyScalar(-e), this._panOffset.add(mt);
  }
  _panUp(e, t) {
    this.screenSpacePanning === !0 ? mt.setFromMatrixColumn(t, 1) : (mt.setFromMatrixColumn(t, 0), mt.crossVectors(this.object.up, mt)), mt.multiplyScalar(e), this._panOffset.add(mt);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(e, t) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      mt.copy(s).sub(this.target);
      let r = mt.length();
      r *= Math.tan(this.object.fov / 2 * Math.PI / 180), this._panLeft(2 * e * r / n.clientHeight, this.object.matrix), this._panUp(2 * t * r / n.clientHeight, this.object.matrix);
    } else this.object.isOrthographicCamera ? (this._panLeft(e * (this.object.right - this.object.left) / this.object.zoom / n.clientWidth, this.object.matrix), this._panUp(t * (this.object.top - this.object.bottom) / this.object.zoom / n.clientHeight, this.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), this.enablePan = !1);
  }
  _dollyOut(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale /= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _dollyIn(e) {
    this.object.isPerspectiveCamera || this.object.isOrthographicCamera ? this._scale *= e : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), this.enableZoom = !1);
  }
  _updateZoomParameters(e, t) {
    if (!this.zoomToCursor)
      return;
    this._performCursorZoom = !0;
    const n = this.domElement.getBoundingClientRect(), s = e - n.left, r = t - n.top, o = n.width, a = n.height;
    this._mouse.x = s / o * 2 - 1, this._mouse.y = -(r / a) * 2 + 1, this._dollyDirection.set(this._mouse.x, this._mouse.y, 1).unproject(this.object).sub(this.object.position).normalize();
  }
  _clampDistance(e) {
    return Math.max(this.minDistance, Math.min(this.maxDistance, e));
  }
  //
  // event callbacks - update the object state
  //
  _handleMouseDownRotate(e) {
    this._rotateStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownDolly(e) {
    this._updateZoomParameters(e.clientX, e.clientX), this._dollyStart.set(e.clientX, e.clientY);
  }
  _handleMouseDownPan(e) {
    this._panStart.set(e.clientX, e.clientY);
  }
  _handleMouseMoveRotate(e) {
    this._rotateEnd.set(e.clientX, e.clientY), this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(Ut * this._rotateDelta.x / t.clientHeight), this._rotateUp(Ut * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
  }
  _handleMouseMoveDolly(e) {
    this._dollyEnd.set(e.clientX, e.clientY), this._dollyDelta.subVectors(this._dollyEnd, this._dollyStart), this._dollyDelta.y > 0 ? this._dollyOut(this._getZoomScale(this._dollyDelta.y)) : this._dollyDelta.y < 0 && this._dollyIn(this._getZoomScale(this._dollyDelta.y)), this._dollyStart.copy(this._dollyEnd), this.update();
  }
  _handleMouseMovePan(e) {
    this._panEnd.set(e.clientX, e.clientY), this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd), this.update();
  }
  _handleMouseWheel(e) {
    this._updateZoomParameters(e.clientX, e.clientY), e.deltaY < 0 ? this._dollyIn(this._getZoomScale(e.deltaY)) : e.deltaY > 0 && this._dollyOut(this._getZoomScale(e.deltaY)), this.update();
  }
  _handleKeyDown(e) {
    let t = !1;
    switch (e.code) {
      case this.keys.UP:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(Ut * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), t = !0;
        break;
      case this.keys.BOTTOM:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateUp(-Ut * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), t = !0;
        break;
      case this.keys.LEFT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(Ut * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), t = !0;
        break;
      case this.keys.RIGHT:
        e.ctrlKey || e.metaKey || e.shiftKey ? this._rotateLeft(-Ut * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), t = !0;
        break;
    }
    t && (e.preventDefault(), this.update());
  }
  _handleTouchStartRotate(e) {
    if (this._pointers.length === 1)
      this._rotateStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._rotateStart.set(n, s);
    }
  }
  _handleTouchStartPan(e) {
    if (this._pointers.length === 1)
      this._panStart.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._panStart.set(n, s);
    }
  }
  _handleTouchStartDolly(e) {
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, s = e.pageY - t.y, r = Math.sqrt(n * n + s * s);
    this._dollyStart.set(0, r);
  }
  _handleTouchStartDollyPan(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enablePan && this._handleTouchStartPan(e);
  }
  _handleTouchStartDollyRotate(e) {
    this.enableZoom && this._handleTouchStartDolly(e), this.enableRotate && this._handleTouchStartRotate(e);
  }
  _handleTouchMoveRotate(e) {
    if (this._pointers.length == 1)
      this._rotateEnd.set(e.pageX, e.pageY);
    else {
      const n = this._getSecondPointerPosition(e), s = 0.5 * (e.pageX + n.x), r = 0.5 * (e.pageY + n.y);
      this._rotateEnd.set(s, r);
    }
    this._rotateDelta.subVectors(this._rotateEnd, this._rotateStart).multiplyScalar(this.rotateSpeed);
    const t = this.domElement;
    this._rotateLeft(Ut * this._rotateDelta.x / t.clientHeight), this._rotateUp(Ut * this._rotateDelta.y / t.clientHeight), this._rotateStart.copy(this._rotateEnd);
  }
  _handleTouchMovePan(e) {
    if (this._pointers.length === 1)
      this._panEnd.set(e.pageX, e.pageY);
    else {
      const t = this._getSecondPointerPosition(e), n = 0.5 * (e.pageX + t.x), s = 0.5 * (e.pageY + t.y);
      this._panEnd.set(n, s);
    }
    this._panDelta.subVectors(this._panEnd, this._panStart).multiplyScalar(this.panSpeed), this._pan(this._panDelta.x, this._panDelta.y), this._panStart.copy(this._panEnd);
  }
  _handleTouchMoveDolly(e) {
    const t = this._getSecondPointerPosition(e), n = e.pageX - t.x, s = e.pageY - t.y, r = Math.sqrt(n * n + s * s);
    this._dollyEnd.set(0, r), this._dollyDelta.set(0, Math.pow(this._dollyEnd.y / this._dollyStart.y, this.zoomSpeed)), this._dollyOut(this._dollyDelta.y), this._dollyStart.copy(this._dollyEnd);
    const o = (e.pageX + t.x) * 0.5, a = (e.pageY + t.y) * 0.5;
    this._updateZoomParameters(o, a);
  }
  _handleTouchMoveDollyPan(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enablePan && this._handleTouchMovePan(e);
  }
  _handleTouchMoveDollyRotate(e) {
    this.enableZoom && this._handleTouchMoveDolly(e), this.enableRotate && this._handleTouchMoveRotate(e);
  }
  // pointers
  _addPointer(e) {
    this._pointers.push(e.pointerId);
  }
  _removePointer(e) {
    delete this._pointerPositions[e.pointerId];
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) {
        this._pointers.splice(t, 1);
        return;
      }
  }
  _isTrackingPointer(e) {
    for (let t = 0; t < this._pointers.length; t++)
      if (this._pointers[t] == e.pointerId) return !0;
    return !1;
  }
  _trackPointer(e) {
    let t = this._pointerPositions[e.pointerId];
    t === void 0 && (t = new te(), this._pointerPositions[e.pointerId] = t), t.set(e.pageX, e.pageY);
  }
  _getSecondPointerPosition(e) {
    const t = e.pointerId === this._pointers[0] ? this._pointers[1] : this._pointers[0];
    return this._pointerPositions[t];
  }
  //
  _customWheelEvent(e) {
    const t = e.deltaMode, n = {
      clientX: e.clientX,
      clientY: e.clientY,
      deltaY: e.deltaY
    };
    switch (t) {
      case 1:
        n.deltaY *= 16;
        break;
      case 2:
        n.deltaY *= 100;
        break;
    }
    return e.ctrlKey && !this._controlActive && (n.deltaY *= 10), n;
  }
}
function cx(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function lx(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function hx(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(zu), this.state = tt.NONE;
      break;
    case 1:
      const e = this._pointers[0], t = this._pointerPositions[e];
      this._onTouchStart({ pointerId: e, pageX: t.x, pageY: t.y });
      break;
  }
}
function ux(i) {
  let e;
  switch (i.button) {
    case 0:
      e = this.mouseButtons.LEFT;
      break;
    case 1:
      e = this.mouseButtons.MIDDLE;
      break;
    case 2:
      e = this.mouseButtons.RIGHT;
      break;
    default:
      e = -1;
  }
  switch (e) {
    case Gi.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(i), this.state = tt.DOLLY;
      break;
    case Gi.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = tt.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = tt.ROTATE;
      }
      break;
    case Gi.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = tt.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = tt.PAN;
      }
      break;
    default:
      this.state = tt.NONE;
  }
  this.state !== tt.NONE && this.dispatchEvent(bc);
}
function dx(i) {
  switch (this.state) {
    case tt.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(i);
      break;
    case tt.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(i);
      break;
    case tt.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(i);
      break;
  }
}
function fx(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== tt.NONE || (i.preventDefault(), this.dispatchEvent(bc), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(zu));
}
function px(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function mx(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case Vn.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(i), this.state = tt.TOUCH_ROTATE;
          break;
        case Vn.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(i), this.state = tt.TOUCH_PAN;
          break;
        default:
          this.state = tt.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case Vn.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(i), this.state = tt.TOUCH_DOLLY_PAN;
          break;
        case Vn.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(i), this.state = tt.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = tt.NONE;
      }
      break;
    default:
      this.state = tt.NONE;
  }
  this.state !== tt.NONE && this.dispatchEvent(bc);
}
function gx(i) {
  switch (this._trackPointer(i), this.state) {
    case tt.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case tt.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(i), this.update();
      break;
    case tt.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case tt.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = tt.NONE;
  }
}
function _x(i) {
  this.enabled !== !1 && i.preventDefault();
}
function vx(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function xx(i) {
  i.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Sh(i, e) {
  if (e === Zd)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), i;
  if (e === Ba || e === tu) {
    let t = i.getIndex();
    if (t === null) {
      const o = [], a = i.getAttribute("position");
      if (a !== void 0) {
        for (let c = 0; c < a.count; c++)
          o.push(c);
        i.setIndex(o), t = i.getIndex();
      } else
        return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."), i;
    }
    const n = t.count - 2, s = [];
    if (e === Ba)
      for (let o = 1; o <= n; o++)
        s.push(t.getX(0)), s.push(t.getX(o)), s.push(t.getX(o + 1));
    else
      for (let o = 0; o < n; o++)
        o % 2 === 0 ? (s.push(t.getX(o)), s.push(t.getX(o + 1)), s.push(t.getX(o + 2))) : (s.push(t.getX(o + 2)), s.push(t.getX(o + 1)), s.push(t.getX(o)));
    s.length / 3 !== n && console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");
    const r = i.clone();
    return r.setIndex(s), r.clearGroups(), r;
  } else
    return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:", e), i;
}
class yx extends fs {
  constructor(e) {
    super(e), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(t) {
      return new bx(t);
    }), this.register(function(t) {
      return new Ax(t);
    }), this.register(function(t) {
      return new Ux(t);
    }), this.register(function(t) {
      return new Ox(t);
    }), this.register(function(t) {
      return new Fx(t);
    }), this.register(function(t) {
      return new Rx(t);
    }), this.register(function(t) {
      return new Cx(t);
    }), this.register(function(t) {
      return new Px(t);
    }), this.register(function(t) {
      return new Lx(t);
    }), this.register(function(t) {
      return new Tx(t);
    }), this.register(function(t) {
      return new Ix(t);
    }), this.register(function(t) {
      return new wx(t);
    }), this.register(function(t) {
      return new Nx(t);
    }), this.register(function(t) {
      return new Dx(t);
    }), this.register(function(t) {
      return new Sx(t);
    }), this.register(function(t) {
      return new Bx(t);
    }), this.register(function(t) {
      return new zx(t);
    });
  }
  load(e, t, n, s) {
    const r = this;
    let o;
    if (this.resourcePath !== "")
      o = this.resourcePath;
    else if (this.path !== "") {
      const l = Os.extractUrlBase(e);
      o = Os.resolveURL(l, this.path);
    } else
      o = Os.extractUrlBase(e);
    this.manager.itemStart(e);
    const a = function(l) {
      s ? s(l) : console.error(l), r.manager.itemError(e), r.manager.itemEnd(e);
    }, c = new Ou(this.manager);
    c.setPath(this.path), c.setResponseType("arraybuffer"), c.setRequestHeader(this.requestHeader), c.setWithCredentials(this.withCredentials), c.load(e, function(l) {
      try {
        r.parse(l, o, function(h) {
          t(h), r.manager.itemEnd(e);
        }, a);
      } catch (h) {
        a(h);
      }
    }, n, a);
  }
  setDRACOLoader(e) {
    return this.dracoLoader = e, this;
  }
  setKTX2Loader(e) {
    return this.ktx2Loader = e, this;
  }
  setMeshoptDecoder(e) {
    return this.meshoptDecoder = e, this;
  }
  register(e) {
    return this.pluginCallbacks.indexOf(e) === -1 && this.pluginCallbacks.push(e), this;
  }
  unregister(e) {
    return this.pluginCallbacks.indexOf(e) !== -1 && this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e), 1), this;
  }
  parse(e, t, n, s) {
    let r;
    const o = {}, a = {}, c = new TextDecoder();
    if (typeof e == "string")
      r = JSON.parse(e);
    else if (e instanceof ArrayBuffer)
      if (c.decode(new Uint8Array(e, 0, 4)) === ku) {
        try {
          o[Oe.KHR_BINARY_GLTF] = new kx(e);
        } catch (u) {
          s && s(u);
          return;
        }
        r = JSON.parse(o[Oe.KHR_BINARY_GLTF].content);
      } else
        r = JSON.parse(c.decode(e));
    else
      r = e;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const l = new Qx(r, {
      path: t || this.resourcePath || "",
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
          case Oe.KHR_MATERIALS_UNLIT:
            o[u] = new Ex();
            break;
          case Oe.KHR_DRACO_MESH_COMPRESSION:
            o[u] = new Hx(r, this.dracoLoader);
            break;
          case Oe.KHR_TEXTURE_TRANSFORM:
            o[u] = new Vx();
            break;
          case Oe.KHR_MESH_QUANTIZATION:
            o[u] = new Gx();
            break;
          default:
            d.indexOf(u) >= 0 && a[u] === void 0 && console.warn('THREE.GLTFLoader: Unknown extension "' + u + '".');
        }
      }
    l.setExtensions(o), l.setPlugins(a), l.parse(n, s);
  }
  parseAsync(e, t) {
    const n = this;
    return new Promise(function(s, r) {
      n.parse(e, t, s, r);
    });
  }
}
function Mx() {
  let i = {};
  return {
    get: function(e) {
      return i[e];
    },
    add: function(e, t) {
      i[e] = t;
    },
    remove: function(e) {
      delete i[e];
    },
    removeAll: function() {
      i = {};
    }
  };
}
const Oe = {
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
class Sx {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
  }
  _markDefs() {
    const e = this.parser, t = this.parser.json.nodes || [];
    for (let n = 0, s = t.length; n < s; n++) {
      const r = t[n];
      r.extensions && r.extensions[this.name] && r.extensions[this.name].light !== void 0 && e._addNodeRef(this.cache, r.extensions[this.name].light);
    }
  }
  _loadLight(e) {
    const t = this.parser, n = "light:" + e;
    let s = t.cache.get(n);
    if (s) return s;
    const r = t.json, c = ((r.extensions && r.extensions[this.name] || {}).lights || [])[e];
    let l;
    const h = new Me(16777215);
    c.color !== void 0 && h.setRGB(c.color[0], c.color[1], c.color[2], Et);
    const u = c.range !== void 0 ? c.range : 0;
    switch (c.type) {
      case "directional":
        l = new Bu(h), l.target.position.set(0, 0, -1), l.add(l.target);
        break;
      case "point":
        l = new Fu(h), l.distance = u;
        break;
      case "spot":
        l = new Gv(h), l.distance = u, c.spot = c.spot || {}, c.spot.innerConeAngle = c.spot.innerConeAngle !== void 0 ? c.spot.innerConeAngle : 0, c.spot.outerConeAngle = c.spot.outerConeAngle !== void 0 ? c.spot.outerConeAngle : Math.PI / 4, l.angle = c.spot.outerConeAngle, l.penumbra = 1 - c.spot.innerConeAngle / c.spot.outerConeAngle, l.target.position.set(0, 0, -1), l.add(l.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + c.type);
    }
    return l.position.set(0, 0, 0), l.decay = 2, Tn(l, c), c.intensity !== void 0 && (l.intensity = c.intensity), l.name = t.createUniqueName(c.name || "light_" + e), s = Promise.resolve(l), t.cache.add(n, s), s;
  }
  getDependency(e, t) {
    if (e === "light")
      return this._loadLight(t);
  }
  createNodeAttachment(e) {
    const t = this, n = this.parser, r = n.json.nodes[e], a = (r.extensions && r.extensions[this.name] || {}).light;
    return a === void 0 ? null : this._loadLight(a).then(function(c) {
      return n._getNodeRef(t.cache, a, c);
    });
  }
}
class Ex {
  constructor() {
    this.name = Oe.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return ui;
  }
  extendParams(e, t, n) {
    const s = [];
    e.color = new Me(1, 1, 1), e.opacity = 1;
    const r = t.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const o = r.baseColorFactor;
        e.color.setRGB(o[0], o[1], o[2], Et), e.opacity = o[3];
      }
      r.baseColorTexture !== void 0 && s.push(n.assignTexture(e, "map", r.baseColorTexture, Rt));
    }
    return Promise.all(s);
  }
}
class Tx {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name].emissiveStrength;
    return r !== void 0 && (t.emissiveIntensity = r), Promise.resolve();
  }
}
class bx {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : fn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    if (o.clearcoatFactor !== void 0 && (t.clearcoat = o.clearcoatFactor), o.clearcoatTexture !== void 0 && r.push(n.assignTexture(t, "clearcoatMap", o.clearcoatTexture)), o.clearcoatRoughnessFactor !== void 0 && (t.clearcoatRoughness = o.clearcoatRoughnessFactor), o.clearcoatRoughnessTexture !== void 0 && r.push(n.assignTexture(t, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)), o.clearcoatNormalTexture !== void 0 && (r.push(n.assignTexture(t, "clearcoatNormalMap", o.clearcoatNormalTexture)), o.clearcoatNormalTexture.scale !== void 0)) {
      const a = o.clearcoatNormalTexture.scale;
      t.clearcoatNormalScale = new te(a, a);
    }
    return Promise.all(r);
  }
}
class Ax {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : fn;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name];
    return t.dispersion = r.dispersion !== void 0 ? r.dispersion : 0, Promise.resolve();
  }
}
class wx {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : fn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return o.iridescenceFactor !== void 0 && (t.iridescence = o.iridescenceFactor), o.iridescenceTexture !== void 0 && r.push(n.assignTexture(t, "iridescenceMap", o.iridescenceTexture)), o.iridescenceIor !== void 0 && (t.iridescenceIOR = o.iridescenceIor), t.iridescenceThicknessRange === void 0 && (t.iridescenceThicknessRange = [100, 400]), o.iridescenceThicknessMinimum !== void 0 && (t.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum), o.iridescenceThicknessMaximum !== void 0 && (t.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum), o.iridescenceThicknessTexture !== void 0 && r.push(n.assignTexture(t, "iridescenceThicknessMap", o.iridescenceThicknessTexture)), Promise.all(r);
  }
}
class Rx {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : fn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [];
    t.sheenColor = new Me(0, 0, 0), t.sheenRoughness = 0, t.sheen = 1;
    const o = s.extensions[this.name];
    if (o.sheenColorFactor !== void 0) {
      const a = o.sheenColorFactor;
      t.sheenColor.setRGB(a[0], a[1], a[2], Et);
    }
    return o.sheenRoughnessFactor !== void 0 && (t.sheenRoughness = o.sheenRoughnessFactor), o.sheenColorTexture !== void 0 && r.push(n.assignTexture(t, "sheenColorMap", o.sheenColorTexture, Rt)), o.sheenRoughnessTexture !== void 0 && r.push(n.assignTexture(t, "sheenRoughnessMap", o.sheenRoughnessTexture)), Promise.all(r);
  }
}
class Cx {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : fn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return o.transmissionFactor !== void 0 && (t.transmission = o.transmissionFactor), o.transmissionTexture !== void 0 && r.push(n.assignTexture(t, "transmissionMap", o.transmissionTexture)), Promise.all(r);
  }
}
class Px {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : fn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    t.thickness = o.thicknessFactor !== void 0 ? o.thicknessFactor : 0, o.thicknessTexture !== void 0 && r.push(n.assignTexture(t, "thicknessMap", o.thicknessTexture)), t.attenuationDistance = o.attenuationDistance || 1 / 0;
    const a = o.attenuationColor || [1, 1, 1];
    return t.attenuationColor = new Me().setRGB(a[0], a[1], a[2], Et), Promise.all(r);
  }
}
class Lx {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_MATERIALS_IOR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : fn;
  }
  extendMaterialParams(e, t) {
    const s = this.parser.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name];
    return t.ior = r.ior !== void 0 ? r.ior : 1.5, Promise.resolve();
  }
}
class Ix {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : fn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    t.specularIntensity = o.specularFactor !== void 0 ? o.specularFactor : 1, o.specularTexture !== void 0 && r.push(n.assignTexture(t, "specularIntensityMap", o.specularTexture));
    const a = o.specularColorFactor || [1, 1, 1];
    return t.specularColor = new Me().setRGB(a[0], a[1], a[2], Et), o.specularColorTexture !== void 0 && r.push(n.assignTexture(t, "specularColorMap", o.specularColorTexture, Rt)), Promise.all(r);
  }
}
class Dx {
  constructor(e) {
    this.parser = e, this.name = Oe.EXT_MATERIALS_BUMP;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : fn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return t.bumpScale = o.bumpFactor !== void 0 ? o.bumpFactor : 1, o.bumpTexture !== void 0 && r.push(n.assignTexture(t, "bumpMap", o.bumpTexture)), Promise.all(r);
  }
}
class Nx {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(e) {
    const n = this.parser.json.materials[e];
    return !n.extensions || !n.extensions[this.name] ? null : fn;
  }
  extendMaterialParams(e, t) {
    const n = this.parser, s = n.json.materials[e];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return o.anisotropyStrength !== void 0 && (t.anisotropy = o.anisotropyStrength), o.anisotropyRotation !== void 0 && (t.anisotropyRotation = o.anisotropyRotation), o.anisotropyTexture !== void 0 && r.push(n.assignTexture(t, "anisotropyMap", o.anisotropyTexture)), Promise.all(r);
  }
}
class Ux {
  constructor(e) {
    this.parser = e, this.name = Oe.KHR_TEXTURE_BASISU;
  }
  loadTexture(e) {
    const t = this.parser, n = t.json, s = n.textures[e];
    if (!s.extensions || !s.extensions[this.name])
      return null;
    const r = s.extensions[this.name], o = t.options.ktx2Loader;
    if (!o) {
      if (n.extensionsRequired && n.extensionsRequired.indexOf(this.name) >= 0)
        throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
      return null;
    }
    return t.loadTextureImage(e, r.source, o);
  }
}
class Ox {
  constructor(e) {
    this.parser = e, this.name = Oe.EXT_TEXTURE_WEBP, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, s = n.json, r = s.textures[e];
    if (!r.extensions || !r.extensions[t])
      return null;
    const o = r.extensions[t], a = s.images[o.source];
    let c = n.textureLoader;
    if (a.uri) {
      const l = n.options.manager.getHandler(a.uri);
      l !== null && (c = l);
    }
    return this.detectSupport().then(function(l) {
      if (l) return n.loadTextureImage(e, o.source, c);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");
      return n.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class Fx {
  constructor(e) {
    this.parser = e, this.name = Oe.EXT_TEXTURE_AVIF, this.isSupported = null;
  }
  loadTexture(e) {
    const t = this.name, n = this.parser, s = n.json, r = s.textures[e];
    if (!r.extensions || !r.extensions[t])
      return null;
    const o = r.extensions[t], a = s.images[o.source];
    let c = n.textureLoader;
    if (a.uri) {
      const l = n.options.manager.getHandler(a.uri);
      l !== null && (c = l);
    }
    return this.detectSupport().then(function(l) {
      if (l) return n.loadTextureImage(e, o.source, c);
      if (s.extensionsRequired && s.extensionsRequired.indexOf(t) >= 0)
        throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
      return n.loadTexture(e);
    });
  }
  detectSupport() {
    return this.isSupported || (this.isSupported = new Promise(function(e) {
      const t = new Image();
      t.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=", t.onload = t.onerror = function() {
        e(t.height === 1);
      };
    })), this.isSupported;
  }
}
class Bx {
  constructor(e) {
    this.name = Oe.EXT_MESHOPT_COMPRESSION, this.parser = e;
  }
  loadBufferView(e) {
    const t = this.parser.json, n = t.bufferViews[e];
    if (n.extensions && n.extensions[this.name]) {
      const s = n.extensions[this.name], r = this.parser.getDependency("buffer", s.buffer), o = this.parser.options.meshoptDecoder;
      if (!o || !o.supported) {
        if (t.extensionsRequired && t.extensionsRequired.indexOf(this.name) >= 0)
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
class zx {
  constructor(e) {
    this.name = Oe.EXT_MESH_GPU_INSTANCING, this.parser = e;
  }
  createNodeMesh(e) {
    const t = this.parser.json, n = t.nodes[e];
    if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0)
      return null;
    const s = t.meshes[n.mesh];
    for (const l of s.primitives)
      if (l.mode !== $t.TRIANGLES && l.mode !== $t.TRIANGLE_STRIP && l.mode !== $t.TRIANGLE_FAN && l.mode !== void 0)
        return null;
    const o = n.extensions[this.name].attributes, a = [], c = {};
    for (const l in o)
      a.push(this.parser.getDependency("accessor", o[l]).then((h) => (c[l] = h, c[l])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(e)), Promise.all(a).then((l) => {
      const h = l.pop(), u = h.isGroup ? h.children : [h], d = l[0].count, f = [];
      for (const g of u) {
        const _ = new Ce(), p = new w(), m = new cn(), T = new w(1, 1, 1), y = new X0(g.geometry, g.material, d);
        for (let S = 0; S < d; S++)
          c.TRANSLATION && p.fromBufferAttribute(c.TRANSLATION, S), c.ROTATION && m.fromBufferAttribute(c.ROTATION, S), c.SCALE && T.fromBufferAttribute(c.SCALE, S), y.setMatrixAt(S, _.compose(p, m, T));
        for (const S in c)
          if (S === "_COLOR_0") {
            const D = c[S];
            y.instanceColor = new Ha(D.array, D.itemSize, D.normalized);
          } else S !== "TRANSLATION" && S !== "ROTATION" && S !== "SCALE" && g.geometry.setAttribute(S, c[S]);
        at.prototype.copy.call(y, g), this.parser.assignFinalMaterial(y), f.push(y);
      }
      return h.isGroup ? (h.clear(), h.add(...f), h) : f[0];
    }));
  }
}
const ku = "glTF", ws = 12, Eh = { JSON: 1313821514, BIN: 5130562 };
class kx {
  constructor(e) {
    this.name = Oe.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const t = new DataView(e, 0, ws), n = new TextDecoder();
    if (this.header = {
      magic: n.decode(new Uint8Array(e.slice(0, 4))),
      version: t.getUint32(4, !0),
      length: t.getUint32(8, !0)
    }, this.header.magic !== ku)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - ws, r = new DataView(e, ws);
    let o = 0;
    for (; o < s; ) {
      const a = r.getUint32(o, !0);
      o += 4;
      const c = r.getUint32(o, !0);
      if (o += 4, c === Eh.JSON) {
        const l = new Uint8Array(e, ws + o, a);
        this.content = n.decode(l);
      } else if (c === Eh.BIN) {
        const l = ws + o;
        this.body = e.slice(l, l + a);
      }
      o += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Hx {
  constructor(e, t) {
    if (!t)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = Oe.KHR_DRACO_MESH_COMPRESSION, this.json = e, this.dracoLoader = t, this.dracoLoader.preload();
  }
  decodePrimitive(e, t) {
    const n = this.json, s = this.dracoLoader, r = e.extensions[this.name].bufferView, o = e.extensions[this.name].attributes, a = {}, c = {}, l = {};
    for (const h in o) {
      const u = $a[h] || h.toLowerCase();
      a[u] = o[h];
    }
    for (const h in e.attributes) {
      const u = $a[h] || h.toLowerCase();
      if (o[h] !== void 0) {
        const d = n.accessors[e.attributes[h]], f = Yi[d.componentType];
        l[u] = f.name, c[u] = d.normalized === !0;
      }
    }
    return t.getDependency("bufferView", r).then(function(h) {
      return new Promise(function(u, d) {
        s.decodeDracoFile(h, function(f) {
          for (const g in f.attributes) {
            const _ = f.attributes[g], p = c[g];
            p !== void 0 && (_.normalized = p);
          }
          u(f);
        }, a, l, Et, d);
      });
    });
  }
}
class Vx {
  constructor() {
    this.name = Oe.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(e, t) {
    return (t.texCoord === void 0 || t.texCoord === e.channel) && t.offset === void 0 && t.rotation === void 0 && t.scale === void 0 || (e = e.clone(), t.texCoord !== void 0 && (e.channel = t.texCoord), t.offset !== void 0 && e.offset.fromArray(t.offset), t.rotation !== void 0 && (e.rotation = t.rotation), t.scale !== void 0 && e.repeat.fromArray(t.scale), e.needsUpdate = !0), e;
  }
}
class Gx {
  constructor() {
    this.name = Oe.KHR_MESH_QUANTIZATION;
  }
}
class Hu extends Ks {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  copySampleValue_(e) {
    const t = this.resultBuffer, n = this.sampleValues, s = this.valueSize, r = e * s * 3 + s;
    for (let o = 0; o !== s; o++)
      t[o] = n[r + o];
    return t;
  }
  interpolate_(e, t, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, c = a * 2, l = a * 3, h = s - t, u = (n - t) / h, d = u * u, f = d * u, g = e * l, _ = g - l, p = -2 * f + 3 * d, m = f - d, T = 1 - p, y = m - d + u;
    for (let S = 0; S !== a; S++) {
      const D = o[_ + S + a], R = o[_ + S + c] * h, A = o[g + S + a], N = o[g + S] * h;
      r[S] = T * D + y * R + p * A + m * N;
    }
    return r;
  }
}
const Wx = new cn();
class Xx extends Hu {
  interpolate_(e, t, n, s) {
    const r = super.interpolate_(e, t, n, s);
    return Wx.fromArray(r).normalize().toArray(r), r;
  }
}
const $t = {
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
}, Th = {
  9728: Pt,
  9729: Vt,
  9984: Xh,
  9985: Fr,
  9986: Rs,
  9987: bn
}, bh = {
  33071: Gn,
  33648: qr,
  10497: es
}, Jo = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, $a = {
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
}, On = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, $x = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Vs,
  STEP: Hs
}, Qo = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function qx(i) {
  return i.DefaultMaterial === void 0 && (i.DefaultMaterial = new hs({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: wn
  })), i.DefaultMaterial;
}
function ri(i, e, t) {
  for (const n in t.extensions)
    i[n] === void 0 && (e.userData.gltfExtensions = e.userData.gltfExtensions || {}, e.userData.gltfExtensions[n] = t.extensions[n]);
}
function Tn(i, e) {
  e.extras !== void 0 && (typeof e.extras == "object" ? Object.assign(i.userData, e.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + e.extras));
}
function Yx(i, e, t) {
  let n = !1, s = !1, r = !1;
  for (let l = 0, h = e.length; l < h; l++) {
    const u = e[l];
    if (u.POSITION !== void 0 && (n = !0), u.NORMAL !== void 0 && (s = !0), u.COLOR_0 !== void 0 && (r = !0), n && s && r) break;
  }
  if (!n && !s && !r) return Promise.resolve(i);
  const o = [], a = [], c = [];
  for (let l = 0, h = e.length; l < h; l++) {
    const u = e[l];
    if (n) {
      const d = u.POSITION !== void 0 ? t.getDependency("accessor", u.POSITION) : i.attributes.position;
      o.push(d);
    }
    if (s) {
      const d = u.NORMAL !== void 0 ? t.getDependency("accessor", u.NORMAL) : i.attributes.normal;
      a.push(d);
    }
    if (r) {
      const d = u.COLOR_0 !== void 0 ? t.getDependency("accessor", u.COLOR_0) : i.attributes.color;
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
function jx(i, e) {
  if (i.updateMorphTargets(), e.weights !== void 0)
    for (let t = 0, n = e.weights.length; t < n; t++)
      i.morphTargetInfluences[t] = e.weights[t];
  if (e.extras && Array.isArray(e.extras.targetNames)) {
    const t = e.extras.targetNames;
    if (i.morphTargetInfluences.length === t.length) {
      i.morphTargetDictionary = {};
      for (let n = 0, s = t.length; n < s; n++)
        i.morphTargetDictionary[t[n]] = n;
    } else
      console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.");
  }
}
function Kx(i) {
  let e;
  const t = i.extensions && i.extensions[Oe.KHR_DRACO_MESH_COMPRESSION];
  if (t ? e = "draco:" + t.bufferView + ":" + t.indices + ":" + ea(t.attributes) : e = i.indices + ":" + ea(i.attributes) + ":" + i.mode, i.targets !== void 0)
    for (let n = 0, s = i.targets.length; n < s; n++)
      e += ":" + ea(i.targets[n]);
  return e;
}
function ea(i) {
  let e = "";
  const t = Object.keys(i).sort();
  for (let n = 0, s = t.length; n < s; n++)
    e += t[n] + ":" + i[t[n]] + ";";
  return e;
}
function qa(i) {
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
function Zx(i) {
  return i.search(/\.jpe?g($|\?)/i) > 0 || i.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : i.search(/\.webp($|\?)/i) > 0 || i.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const Jx = new Ce();
class Qx {
  constructor(e = {}, t = {}) {
    this.json = e, this.extensions = {}, this.plugins = {}, this.options = t, this.cache = new Mx(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1, s = -1, r = !1, o = -1;
    if (typeof navigator < "u") {
      const a = navigator.userAgent;
      n = /^((?!chrome|android).)*safari/i.test(a) === !0;
      const c = a.match(/Version\/(\d+)/);
      s = n && c ? parseInt(c[1], 10) : -1, r = a.indexOf("Firefox") > -1, o = r ? a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || n && s < 17 || r && o < 98 ? this.textureLoader = new kv(this.options.manager) : this.textureLoader = new qv(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Ou(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
  }
  setExtensions(e) {
    this.extensions = e;
  }
  setPlugins(e) {
    this.plugins = e;
  }
  parse(e, t) {
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
      return ri(r, a, s), Tn(a, s), Promise.all(n._invokeAll(function(c) {
        return c.afterRoot && c.afterRoot(a);
      })).then(function() {
        for (const c of a.scenes)
          c.updateMatrixWorld();
        e(a);
      });
    }).catch(t);
  }
  /**
   * Marks the special nodes/meshes in json for efficient parse.
   */
  _markDefs() {
    const e = this.json.nodes || [], t = this.json.skins || [], n = this.json.meshes || [];
    for (let s = 0, r = t.length; s < r; s++) {
      const o = t[s].joints;
      for (let a = 0, c = o.length; a < c; a++)
        e[o[a]].isBone = !0;
    }
    for (let s = 0, r = e.length; s < r; s++) {
      const o = e[s];
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
  _addNodeRef(e, t) {
    t !== void 0 && (e.refs[t] === void 0 && (e.refs[t] = e.uses[t] = 0), e.refs[t]++);
  }
  /** Returns a reference to a shared resource, cloning it if necessary. */
  _getNodeRef(e, t, n) {
    if (e.refs[t] <= 1) return n;
    const s = n.clone(), r = (o, a) => {
      const c = this.associations.get(o);
      c != null && this.associations.set(a, c);
      for (const [l, h] of o.children.entries())
        r(h, a.children[l]);
    };
    return r(n, s), s.name += "_instance_" + e.uses[t]++, s;
  }
  _invokeOne(e) {
    const t = Object.values(this.plugins);
    t.push(this);
    for (let n = 0; n < t.length; n++) {
      const s = e(t[n]);
      if (s) return s;
    }
    return null;
  }
  _invokeAll(e) {
    const t = Object.values(this.plugins);
    t.unshift(this);
    const n = [];
    for (let s = 0; s < t.length; s++) {
      const r = e(t[s]);
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
  getDependency(e, t) {
    const n = e + ":" + t;
    let s = this.cache.get(n);
    if (!s) {
      switch (e) {
        case "scene":
          s = this.loadScene(t);
          break;
        case "node":
          s = this._invokeOne(function(r) {
            return r.loadNode && r.loadNode(t);
          });
          break;
        case "mesh":
          s = this._invokeOne(function(r) {
            return r.loadMesh && r.loadMesh(t);
          });
          break;
        case "accessor":
          s = this.loadAccessor(t);
          break;
        case "bufferView":
          s = this._invokeOne(function(r) {
            return r.loadBufferView && r.loadBufferView(t);
          });
          break;
        case "buffer":
          s = this.loadBuffer(t);
          break;
        case "material":
          s = this._invokeOne(function(r) {
            return r.loadMaterial && r.loadMaterial(t);
          });
          break;
        case "texture":
          s = this._invokeOne(function(r) {
            return r.loadTexture && r.loadTexture(t);
          });
          break;
        case "skin":
          s = this.loadSkin(t);
          break;
        case "animation":
          s = this._invokeOne(function(r) {
            return r.loadAnimation && r.loadAnimation(t);
          });
          break;
        case "camera":
          s = this.loadCamera(t);
          break;
        default:
          if (s = this._invokeOne(function(r) {
            return r != this && r.getDependency && r.getDependency(e, t);
          }), !s)
            throw new Error("Unknown type: " + e);
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
  getDependencies(e) {
    let t = this.cache.get(e);
    if (!t) {
      const n = this, s = this.json[e + (e === "mesh" ? "es" : "s")] || [];
      t = Promise.all(s.map(function(r, o) {
        return n.getDependency(e, o);
      })), this.cache.add(e, t);
    }
    return t;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBuffer(e) {
    const t = this.json.buffers[e], n = this.fileLoader;
    if (t.type && t.type !== "arraybuffer")
      throw new Error("THREE.GLTFLoader: " + t.type + " buffer type is not supported.");
    if (t.uri === void 0 && e === 0)
      return Promise.resolve(this.extensions[Oe.KHR_BINARY_GLTF].body);
    const s = this.options;
    return new Promise(function(r, o) {
      n.load(Os.resolveURL(t.uri, s.path), r, void 0, function() {
        o(new Error('THREE.GLTFLoader: Failed to load buffer "' + t.uri + '".'));
      });
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#buffers-and-buffer-views
   * @param {number} bufferViewIndex
   * @return {Promise<ArrayBuffer>}
   */
  loadBufferView(e) {
    const t = this.json.bufferViews[e];
    return this.getDependency("buffer", t.buffer).then(function(n) {
      const s = t.byteLength || 0, r = t.byteOffset || 0;
      return n.slice(r, r + s);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#accessors
   * @param {number} accessorIndex
   * @return {Promise<BufferAttribute|InterleavedBufferAttribute>}
   */
  loadAccessor(e) {
    const t = this, n = this.json, s = this.json.accessors[e];
    if (s.bufferView === void 0 && s.sparse === void 0) {
      const o = Jo[s.type], a = Yi[s.componentType], c = s.normalized === !0, l = new a(s.count * o);
      return Promise.resolve(new Lt(l, o, c));
    }
    const r = [];
    return s.bufferView !== void 0 ? r.push(this.getDependency("bufferView", s.bufferView)) : r.push(null), s.sparse !== void 0 && (r.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(r).then(function(o) {
      const a = o[0], c = Jo[s.type], l = Yi[s.componentType], h = l.BYTES_PER_ELEMENT, u = h * c, d = s.byteOffset || 0, f = s.bufferView !== void 0 ? n.bufferViews[s.bufferView].byteStride : void 0, g = s.normalized === !0;
      let _, p;
      if (f && f !== u) {
        const m = Math.floor(d / f), T = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + m + ":" + s.count;
        let y = t.cache.get(T);
        y || (_ = new l(a, m * f, s.count * f / h), y = new xu(_, f / h), t.cache.add(T, y)), p = new Ws(y, c, d % f / h, g);
      } else
        a === null ? _ = new l(s.count * c) : _ = new l(a, d, s.count * c), p = new Lt(_, c, g);
      if (s.sparse !== void 0) {
        const m = Jo.SCALAR, T = Yi[s.sparse.indices.componentType], y = s.sparse.indices.byteOffset || 0, S = s.sparse.values.byteOffset || 0, D = new T(o[1], y, s.sparse.count * m), R = new l(o[2], S, s.sparse.count * c);
        a !== null && (p = new Lt(p.array.slice(), p.itemSize, p.normalized)), p.normalized = !1;
        for (let A = 0, N = D.length; A < N; A++) {
          const Y = D[A];
          if (p.setX(Y, R[A * c]), c >= 2 && p.setY(Y, R[A * c + 1]), c >= 3 && p.setZ(Y, R[A * c + 2]), c >= 4 && p.setW(Y, R[A * c + 3]), c >= 5) throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.");
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
  loadTexture(e) {
    const t = this.json, n = this.options, r = t.textures[e].source, o = t.images[r];
    let a = this.textureLoader;
    if (o.uri) {
      const c = n.manager.getHandler(o.uri);
      c !== null && (a = c);
    }
    return this.loadTextureImage(e, r, a);
  }
  loadTextureImage(e, t, n) {
    const s = this, r = this.json, o = r.textures[e], a = r.images[t], c = (a.uri || a.bufferView) + ":" + o.sampler;
    if (this.textureCache[c])
      return this.textureCache[c];
    const l = this.loadImageSource(t, n).then(function(h) {
      h.flipY = !1, h.name = o.name || a.name || "", h.name === "" && typeof a.uri == "string" && a.uri.startsWith("data:image/") === !1 && (h.name = a.uri);
      const d = (r.samplers || {})[o.sampler] || {};
      return h.magFilter = Th[d.magFilter] || Vt, h.minFilter = Th[d.minFilter] || bn, h.wrapS = bh[d.wrapS] || es, h.wrapT = bh[d.wrapT] || es, s.associations.set(h, { textures: e }), h;
    }).catch(function() {
      return null;
    });
    return this.textureCache[c] = l, l;
  }
  loadImageSource(e, t) {
    const n = this, s = this.json, r = this.options;
    if (this.sourceCache[e] !== void 0)
      return this.sourceCache[e].then((u) => u.clone());
    const o = s.images[e], a = self.URL || self.webkitURL;
    let c = o.uri || "", l = !1;
    if (o.bufferView !== void 0)
      c = n.getDependency("bufferView", o.bufferView).then(function(u) {
        l = !0;
        const d = new Blob([u], { type: o.mimeType });
        return c = a.createObjectURL(d), c;
      });
    else if (o.uri === void 0)
      throw new Error("THREE.GLTFLoader: Image " + e + " is missing URI and bufferView");
    const h = Promise.resolve(c).then(function(u) {
      return new Promise(function(d, f) {
        let g = d;
        t.isImageBitmapLoader === !0 && (g = function(_) {
          const p = new _t(_);
          p.needsUpdate = !0, d(p);
        }), t.load(Os.resolveURL(u, r.path), g, void 0, f);
      });
    }).then(function(u) {
      return l === !0 && a.revokeObjectURL(c), Tn(u, o), u.userData.mimeType = o.mimeType || Zx(o.uri), u;
    }).catch(function(u) {
      throw console.error("THREE.GLTFLoader: Couldn't load texture", c), u;
    });
    return this.sourceCache[e] = h, h;
  }
  /**
   * Asynchronously assigns a texture to the given material parameters.
   * @param {Object} materialParams
   * @param {string} mapName
   * @param {Object} mapDef
   * @return {Promise<Texture>}
   */
  assignTexture(e, t, n, s) {
    const r = this;
    return this.getDependency("texture", n.index).then(function(o) {
      if (!o) return null;
      if (n.texCoord !== void 0 && n.texCoord > 0 && (o = o.clone(), o.channel = n.texCoord), r.extensions[Oe.KHR_TEXTURE_TRANSFORM]) {
        const a = n.extensions !== void 0 ? n.extensions[Oe.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const c = r.associations.get(o);
          o = r.extensions[Oe.KHR_TEXTURE_TRANSFORM].extendTexture(o, a), r.associations.set(o, c);
        }
      }
      return s !== void 0 && (o.colorSpace = s), e[t] = o, o;
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
  assignFinalMaterial(e) {
    const t = e.geometry;
    let n = e.material;
    const s = t.attributes.tangent === void 0, r = t.attributes.color !== void 0, o = t.attributes.normal === void 0;
    if (e.isPoints) {
      const a = "PointsMaterial:" + n.uuid;
      let c = this.cache.get(a);
      c || (c = new bu(), rn.prototype.copy.call(c, n), c.color.copy(n.color), c.map = n.map, c.sizeAttenuation = !1, this.cache.add(a, c)), n = c;
    } else if (e.isLine) {
      const a = "LineBasicMaterial:" + n.uuid;
      let c = this.cache.get(a);
      c || (c = new Tu(), rn.prototype.copy.call(c, n), c.color.copy(n.color), c.map = n.map, this.cache.add(a, c)), n = c;
    }
    if (s || r || o) {
      let a = "ClonedMaterial:" + n.uuid + ":";
      s && (a += "derivative-tangents:"), r && (a += "vertex-colors:"), o && (a += "flat-shading:");
      let c = this.cache.get(a);
      c || (c = n.clone(), r && (c.vertexColors = !0), o && (c.flatShading = !0), s && (c.normalScale && (c.normalScale.y *= -1), c.clearcoatNormalScale && (c.clearcoatNormalScale.y *= -1)), this.cache.add(a, c), this.associations.set(c, this.associations.get(n))), n = c;
    }
    e.material = n;
  }
  getMaterialType() {
    return hs;
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials
   * @param {number} materialIndex
   * @return {Promise<Material>}
   */
  loadMaterial(e) {
    const t = this, n = this.json, s = this.extensions, r = n.materials[e];
    let o;
    const a = {}, c = r.extensions || {}, l = [];
    if (c[Oe.KHR_MATERIALS_UNLIT]) {
      const u = s[Oe.KHR_MATERIALS_UNLIT];
      o = u.getMaterialType(), l.push(u.extendParams(a, r, t));
    } else {
      const u = r.pbrMetallicRoughness || {};
      if (a.color = new Me(1, 1, 1), a.opacity = 1, Array.isArray(u.baseColorFactor)) {
        const d = u.baseColorFactor;
        a.color.setRGB(d[0], d[1], d[2], Et), a.opacity = d[3];
      }
      u.baseColorTexture !== void 0 && l.push(t.assignTexture(a, "map", u.baseColorTexture, Rt)), a.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1, a.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1, u.metallicRoughnessTexture !== void 0 && (l.push(t.assignTexture(a, "metalnessMap", u.metallicRoughnessTexture)), l.push(t.assignTexture(a, "roughnessMap", u.metallicRoughnessTexture))), o = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(e);
      }), l.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(e, a);
      })));
    }
    r.doubleSided === !0 && (a.side = tn);
    const h = r.alphaMode || Qo.OPAQUE;
    if (h === Qo.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, h === Qo.MASK && (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)), r.normalTexture !== void 0 && o !== ui && (l.push(t.assignTexture(a, "normalMap", r.normalTexture)), a.normalScale = new te(1, 1), r.normalTexture.scale !== void 0)) {
      const u = r.normalTexture.scale;
      a.normalScale.set(u, u);
    }
    if (r.occlusionTexture !== void 0 && o !== ui && (l.push(t.assignTexture(a, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && o !== ui) {
      const u = r.emissiveFactor;
      a.emissive = new Me().setRGB(u[0], u[1], u[2], Et);
    }
    return r.emissiveTexture !== void 0 && o !== ui && l.push(t.assignTexture(a, "emissiveMap", r.emissiveTexture, Rt)), Promise.all(l).then(function() {
      const u = new o(a);
      return r.name && (u.name = r.name), Tn(u, r), t.associations.set(u, { materials: e }), r.extensions && ri(s, u, r), u;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(e) {
    const t = Qe.sanitizeNodeName(e || "");
    return t in this.nodeNamesUsed ? t + "_" + ++this.nodeNamesUsed[t] : (this.nodeNamesUsed[t] = 0, t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#geometry
   *
   * Creates BufferGeometries from primitives.
   *
   * @param {Array<GLTF.Primitive>} primitives
   * @return {Promise<Array<BufferGeometry>>}
   */
  loadGeometries(e) {
    const t = this, n = this.extensions, s = this.primitiveCache;
    function r(a) {
      return n[Oe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, t).then(function(c) {
        return Ah(c, a, t);
      });
    }
    const o = [];
    for (let a = 0, c = e.length; a < c; a++) {
      const l = e[a], h = Kx(l), u = s[h];
      if (u)
        o.push(u.promise);
      else {
        let d;
        l.extensions && l.extensions[Oe.KHR_DRACO_MESH_COMPRESSION] ? d = r(l) : d = Ah(new Gt(), l, t), s[h] = { primitive: l, promise: d }, o.push(d);
      }
    }
    return Promise.all(o);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
   * @param {number} meshIndex
   * @return {Promise<Group|Mesh|SkinnedMesh>}
   */
  loadMesh(e) {
    const t = this, n = this.json, s = this.extensions, r = n.meshes[e], o = r.primitives, a = [];
    for (let c = 0, l = o.length; c < l; c++) {
      const h = o[c].material === void 0 ? qx(this.cache) : this.getDependency("material", o[c].material);
      a.push(h);
    }
    return a.push(t.loadGeometries(o)), Promise.all(a).then(function(c) {
      const l = c.slice(0, c.length - 1), h = c[c.length - 1], u = [];
      for (let f = 0, g = h.length; f < g; f++) {
        const _ = h[f], p = o[f];
        let m;
        const T = l[f];
        if (p.mode === $t.TRIANGLES || p.mode === $t.TRIANGLE_STRIP || p.mode === $t.TRIANGLE_FAN || p.mode === void 0)
          m = r.isSkinnedMesh === !0 ? new V0(_, T) : new St(_, T), m.isSkinnedMesh === !0 && m.normalizeSkinWeights(), p.mode === $t.TRIANGLE_STRIP ? m.geometry = Sh(m.geometry, tu) : p.mode === $t.TRIANGLE_FAN && (m.geometry = Sh(m.geometry, Ba));
        else if (p.mode === $t.LINES)
          m = new $0(_, T);
        else if (p.mode === $t.LINE_STRIP)
          m = new _c(_, T);
        else if (p.mode === $t.LINE_LOOP)
          m = new q0(_, T);
        else if (p.mode === $t.POINTS)
          m = new Y0(_, T);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + p.mode);
        Object.keys(m.geometry.morphAttributes).length > 0 && jx(m, r), m.name = t.createUniqueName(r.name || "mesh_" + e), Tn(m, r), p.extensions && ri(s, m, p), t.assignFinalMaterial(m), u.push(m);
      }
      for (let f = 0, g = u.length; f < g; f++)
        t.associations.set(u[f], {
          meshes: e,
          primitives: f
        });
      if (u.length === 1)
        return r.extensions && ri(s, u[0], r), u[0];
      const d = new ot();
      r.extensions && ri(s, d, r), t.associations.set(d, { meshes: e });
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
  loadCamera(e) {
    let t;
    const n = this.json.cameras[e], s = n[n.type];
    if (!s) {
      console.warn("THREE.GLTFLoader: Missing camera parameters.");
      return;
    }
    return n.type === "perspective" ? t = new Ct($i.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : n.type === "orthographic" && (t = new pc(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), n.name && (t.name = this.createUniqueName(n.name)), Tn(t, n), Promise.resolve(t);
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#skins
   * @param {number} skinIndex
   * @return {Promise<Skeleton>}
   */
  loadSkin(e) {
    const t = this.json.skins[e], n = [];
    for (let s = 0, r = t.joints.length; s < r; s++)
      n.push(this._loadNodeShallow(t.joints[s]));
    return t.inverseBindMatrices !== void 0 ? n.push(this.getDependency("accessor", t.inverseBindMatrices)) : n.push(null), Promise.all(n).then(function(s) {
      const r = s.pop(), o = s, a = [], c = [];
      for (let l = 0, h = o.length; l < h; l++) {
        const u = o[l];
        if (u) {
          a.push(u);
          const d = new Ce();
          r !== null && d.fromArray(r.array, l * 16), c.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', t.joints[l]);
      }
      return new gc(a, c);
    });
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#animations
   * @param {number} animationIndex
   * @return {Promise<AnimationClip>}
   */
  loadAnimation(e) {
    const t = this.json, n = this, s = t.animations[e], r = s.name ? s.name : "animation_" + e, o = [], a = [], c = [], l = [], h = [];
    for (let u = 0, d = s.channels.length; u < d; u++) {
      const f = s.channels[u], g = s.samplers[f.sampler], _ = f.target, p = _.node, m = s.parameters !== void 0 ? s.parameters[g.input] : g.input, T = s.parameters !== void 0 ? s.parameters[g.output] : g.output;
      _.node !== void 0 && (o.push(this.getDependency("node", p)), a.push(this.getDependency("accessor", m)), c.push(this.getDependency("accessor", T)), l.push(g), h.push(_));
    }
    return Promise.all([
      Promise.all(o),
      Promise.all(a),
      Promise.all(c),
      Promise.all(l),
      Promise.all(h)
    ]).then(function(u) {
      const d = u[0], f = u[1], g = u[2], _ = u[3], p = u[4], m = [];
      for (let T = 0, y = d.length; T < y; T++) {
        const S = d[T], D = f[T], R = g[T], A = _[T], N = p[T];
        if (S === void 0) continue;
        S.updateMatrix && S.updateMatrix();
        const Y = n._createAnimationTracks(S, D, R, A, N);
        if (Y)
          for (let v = 0; v < Y.length; v++)
            m.push(Y[v]);
      }
      return new Dv(r, void 0, m);
    });
  }
  createNodeMesh(e) {
    const t = this.json, n = this, s = t.nodes[e];
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
  loadNode(e) {
    const t = this.json, n = this, s = t.nodes[e], r = n._loadNodeShallow(e), o = [], a = s.children || [];
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
        f.isSkinnedMesh && f.bind(d, Jx);
      });
      for (let f = 0, g = u.length; f < g; f++)
        h.add(u[f]);
      return h;
    });
  }
  // ._loadNodeShallow() parses a single node.
  // skin and child nodes are created and added in .loadNode() (no '_' prefix).
  _loadNodeShallow(e) {
    const t = this.json, n = this.extensions, s = this;
    if (this.nodeCache[e] !== void 0)
      return this.nodeCache[e];
    const r = t.nodes[e], o = r.name ? s.createUniqueName(r.name) : "", a = [], c = s._invokeOne(function(l) {
      return l.createNodeMesh && l.createNodeMesh(e);
    });
    return c && a.push(c), r.camera !== void 0 && a.push(s.getDependency("camera", r.camera).then(function(l) {
      return s._getNodeRef(s.cameraCache, r.camera, l);
    })), s._invokeAll(function(l) {
      return l.createNodeAttachment && l.createNodeAttachment(e);
    }).forEach(function(l) {
      a.push(l);
    }), this.nodeCache[e] = Promise.all(a).then(function(l) {
      let h;
      if (r.isBone === !0 ? h = new Su() : l.length > 1 ? h = new ot() : l.length === 1 ? h = l[0] : h = new at(), h !== l[0])
        for (let u = 0, d = l.length; u < d; u++)
          h.add(l[u]);
      if (r.name && (h.userData.name = r.name, h.name = o), Tn(h, r), r.extensions && ri(n, h, r), r.matrix !== void 0) {
        const u = new Ce();
        u.fromArray(r.matrix), h.applyMatrix4(u);
      } else
        r.translation !== void 0 && h.position.fromArray(r.translation), r.rotation !== void 0 && h.quaternion.fromArray(r.rotation), r.scale !== void 0 && h.scale.fromArray(r.scale);
      return s.associations.has(h) || s.associations.set(h, {}), s.associations.get(h).nodes = e, h;
    }), this.nodeCache[e];
  }
  /**
   * Specification: https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#scenes
   * @param {number} sceneIndex
   * @return {Promise<Group>}
   */
  loadScene(e) {
    const t = this.extensions, n = this.json.scenes[e], s = this, r = new ot();
    n.name && (r.name = s.createUniqueName(n.name)), Tn(r, n), n.extensions && ri(t, r, n);
    const o = n.nodes || [], a = [];
    for (let c = 0, l = o.length; c < l; c++)
      a.push(s.getDependency("node", o[c]));
    return Promise.all(a).then(function(c) {
      for (let h = 0, u = c.length; h < u; h++)
        r.add(c[h]);
      const l = (h) => {
        const u = /* @__PURE__ */ new Map();
        for (const [d, f] of s.associations)
          (d instanceof rn || d instanceof _t) && u.set(d, f);
        return h.traverse((d) => {
          const f = s.associations.get(d);
          f != null && u.set(d, f);
        }), u;
      };
      return s.associations = l(r), r;
    });
  }
  _createAnimationTracks(e, t, n, s, r) {
    const o = [], a = e.name ? e.name : e.uuid, c = [];
    On[r.path] === On.weights ? e.traverse(function(d) {
      d.morphTargetInfluences && c.push(d.name ? d.name : d.uuid);
    }) : c.push(a);
    let l;
    switch (On[r.path]) {
      case On.weights:
        l = rs;
        break;
      case On.rotation:
        l = os;
        break;
      case On.position:
      case On.scale:
        l = as;
        break;
      default:
        switch (n.itemSize) {
          case 1:
            l = rs;
            break;
          case 2:
          case 3:
          default:
            l = as;
            break;
        }
        break;
    }
    const h = s.interpolation !== void 0 ? $x[s.interpolation] : Vs, u = this._getArrayFromAccessor(n);
    for (let d = 0, f = c.length; d < f; d++) {
      const g = new l(
        c[d] + "." + On[r.path],
        t.array,
        u,
        h
      );
      s.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(g), o.push(g);
    }
    return o;
  }
  _getArrayFromAccessor(e) {
    let t = e.array;
    if (e.normalized) {
      const n = qa(t.constructor), s = new Float32Array(t.length);
      for (let r = 0, o = t.length; r < o; r++)
        s[r] = t[r] * n;
      t = s;
    }
    return t;
  }
  _createCubicSplineTrackInterpolant(e) {
    e.createInterpolant = function(n) {
      const s = this instanceof os ? Xx : Hu;
      return new s(this.times, this.values, this.getValueSize() / 3, n);
    }, e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function ey(i, e, t) {
  const n = e.attributes, s = new on();
  if (n.POSITION !== void 0) {
    const a = t.json.accessors[n.POSITION], c = a.min, l = a.max;
    if (c !== void 0 && l !== void 0) {
      if (s.set(
        new w(c[0], c[1], c[2]),
        new w(l[0], l[1], l[2])
      ), a.normalized) {
        const h = qa(Yi[a.componentType]);
        s.min.multiplyScalar(h), s.max.multiplyScalar(h);
      }
    } else {
      console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");
      return;
    }
  } else
    return;
  const r = e.targets;
  if (r !== void 0) {
    const a = new w(), c = new w();
    for (let l = 0, h = r.length; l < h; l++) {
      const u = r[l];
      if (u.POSITION !== void 0) {
        const d = t.json.accessors[u.POSITION], f = d.min, g = d.max;
        if (f !== void 0 && g !== void 0) {
          if (c.setX(Math.max(Math.abs(f[0]), Math.abs(g[0]))), c.setY(Math.max(Math.abs(f[1]), Math.abs(g[1]))), c.setZ(Math.max(Math.abs(f[2]), Math.abs(g[2]))), d.normalized) {
            const _ = qa(Yi[d.componentType]);
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
  const o = new un();
  s.getCenter(o.center), o.radius = s.min.distanceTo(s.max) / 2, i.boundingSphere = o;
}
function Ah(i, e, t) {
  const n = e.attributes, s = [];
  function r(o, a) {
    return t.getDependency("accessor", o).then(function(c) {
      i.setAttribute(a, c);
    });
  }
  for (const o in n) {
    const a = $a[o] || o.toLowerCase();
    a in i.attributes || s.push(r(n[o], a));
  }
  if (e.indices !== void 0 && !i.index) {
    const o = t.getDependency("accessor", e.indices).then(function(a) {
      i.setIndex(a);
    });
    s.push(o);
  }
  return We.workingColorSpace !== Et && "COLOR_0" in n && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${We.workingColorSpace}" not supported.`), Tn(i, e), ey(i, e, t), Promise.all(s).then(function() {
    return e.targets !== void 0 ? Yx(i, e.targets, t) : i;
  });
}
const Bi = 10251071, ty = 7306636, Fn = 12106948, en = 15921906, oi = 2830134, ny = 8962256;
function Ne(i, e = {}) {
  return new hs({
    color: i,
    roughness: 0.8,
    metalness: 0.05,
    ...e
  });
}
function Ue(i, e, t, n, s = 0, r = 0, o = 0) {
  const a = new St(new _i(i, e, t), n);
  return a.position.set(s, r, o), a.castShadow = !0, a.receiveShadow = !0, a;
}
function Sn(i, e, t, n, s = 0, r = 0, o = 0, a = 16) {
  const c = new St(new yc(i, e, t, a), n);
  return c.position.set(s, r, o), c.castShadow = !0, c.receiveShadow = !0, c;
}
function dt(i, e) {
  return i.material.color.copy(e), i;
}
const Ya = {
  sofa: (i) => {
    const e = new ot(), t = Ne(ty);
    return e.add(dt(Ue(1.9, 0.4, 0.85, t, 0, 0.2, 0), i)), e.add(dt(Ue(1.9, 0.5, 0.2, t, 0, 0.55, -0.32), i)), e.add(dt(Ue(0.2, 0.45, 0.85, t, -0.85, 0.5, 0), i)), e.add(dt(Ue(0.2, 0.45, 0.85, t, 0.85, 0.5, 0), i)), e;
  },
  bed: (i) => {
    const e = new ot();
    return e.add(Ue(1.6, 0.3, 2, Ne(Bi), 0, 0.15, 0)), e.add(dt(Ue(1.55, 0.18, 1.95, Ne(en), 0, 0.39, 0), i)), e.add(Ue(1.6, 0.6, 0.1, Ne(Bi), 0, 0.5, -0.95)), e.add(Ue(0.5, 0.12, 0.35, Ne(en), -0.45, 0.5, -0.7)), e.add(Ue(0.5, 0.12, 0.35, Ne(en), 0.45, 0.5, -0.7)), e;
  },
  table: (i) => {
    const e = new ot(), t = Ne(Bi);
    e.add(dt(Ue(1.4, 0.06, 0.8, t, 0, 0.74, 0), i));
    const n = 0.62, s = 0.32;
    for (const [r, o] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      e.add(Ue(0.07, 0.74, 0.07, t, r * n, 0.37, o * s));
    return e;
  },
  chair: (i) => {
    const e = new ot(), t = Ne(Bi);
    e.add(dt(Ue(0.45, 0.05, 0.45, t, 0, 0.45, 0), i)), e.add(dt(Ue(0.45, 0.45, 0.05, t, 0, 0.68, -0.2), i));
    const n = 0.18, s = 0.18;
    for (const [r, o] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      e.add(Ue(0.05, 0.45, 0.05, t, r * n, 0.22, o * s));
    return e;
  },
  wardrobe: (i) => {
    const e = new ot();
    return e.add(dt(Ue(1.2, 2, 0.6, Ne(Bi), 0, 1, 0), i)), e.add(Ue(0.04, 1.8, 0.02, Ne(Fn), -0.02, 1, 0.31)), e.add(Sn(0.02, 0.02, 0.15, Ne(Fn), -0.2, 1, 0.32)), e.add(Sn(0.02, 0.02, 0.15, Ne(Fn), 0.16, 1, 0.32)), e;
  },
  kitchen_counter: (i) => {
    const e = new ot();
    return e.add(dt(Ue(2, 0.85, 0.6, Ne(en), 0, 0.425, 0), i)), e.add(Ue(2.05, 0.05, 0.65, Ne(oi), 0, 0.875, 0)), e;
  },
  tv: (i) => {
    const e = new ot();
    e.add(Ue(1.2, 0.7, 0.05, Ne(oi), 0, 0.95, 0));
    const t = Ue(1.1, 0.6, 0.02, Ne(657930, { emissive: 1119255 }), 0, 0.95, 0.03);
    return e.add(t), e.add(Ue(0.4, 0.05, 0.2, Ne(oi), 0, 0.6, 0)), dt(e.children[0], i), e;
  },
  fridge: (i) => {
    const e = new ot();
    return e.add(dt(Ue(0.7, 1.8, 0.7, Ne(Fn), 0, 0.9, 0), i)), e.add(Ue(0.04, 0.1, 0.02, Ne(oi), 0.3, 1.3, 0.36)), e.add(Ue(0.04, 0.1, 0.02, Ne(oi), 0.3, 0.6, 0.36)), e;
  },
  sink: (i) => {
    const e = new ot();
    return e.add(dt(Ue(0.6, 0.8, 0.5, Ne(en), 0, 0.4, 0), i)), e.add(Ue(0.5, 0.08, 0.4, Ne(Fn), 0, 0.82, 0)), e.add(Sn(0.02, 0.02, 0.25, Ne(Fn), 0, 0.95, -0.12)), e;
  },
  toilet: (i) => {
    const e = new ot();
    return e.add(dt(Sn(0.22, 0.25, 0.4, Ne(en), 0, 0.2, 0.05), i)), e.add(Ue(0.35, 0.5, 0.18, Ne(en), 0, 0.45, -0.18)), e.add(Sn(0.24, 0.24, 0.05, Ne(en), 0, 0.42, 0.05)), e;
  },
  door: (i) => {
    const e = new ot();
    return e.add(dt(Ue(0.85, 2, 0.05, Ne(Bi), 0, 1, 0), i)), e.add(Sn(0.03, 0.03, 0.1, Ne(Fn), 0.32, 1, 0.05)), e;
  },
  window_frame: (i) => {
    const e = new ot(), t = Ne(en);
    return e.add(dt(Ue(1, 0.05, 0.08, t, 0, 1.5, 0), i)), e.add(dt(Ue(1, 0.05, 0.08, t, 0, 0.9, 0), i)), e.add(Ue(0.05, 0.6, 0.08, t, -0.47, 1.2, 0)), e.add(Ue(0.05, 0.6, 0.08, t, 0.47, 1.2, 0)), e.add(Ue(0.9, 0.55, 0.01, Ne(ny, { transparent: !0, opacity: 0.35 }), 0, 1.2, 0)), e;
  },
  ceiling_light: (i) => {
    const e = new ot(), t = Sn(0.18, 0.22, 0.12, Ne(en, { emissive: 0 }), 0, 0, 0);
    return t.name = "emissive", e.add(dt(t, i)), e.add(Sn(0.01, 0.01, 0.25, Ne(Fn), 0, 0.18, 0)), e;
  },
  ac_unit: (i) => {
    const e = new ot();
    return e.add(dt(Ue(0.9, 0.28, 0.18, Ne(en), 0, 0, 0), i)), e.add(Ue(0.8, 0.04, 0.02, Ne(oi), 0, -0.1, 0.09)), e;
  },
  intercom: (i) => {
    const e = new ot();
    e.add(dt(Ue(0.16, 0.26, 0.04, Ne(oi), 0, 0, 0), i));
    const t = Ue(0.12, 0.14, 0.01, Ne(1053720, { emissive: 666170 }), 0, 0.03, 0.025);
    return t.name = "emissive", e.add(t), e;
  },
  // Generic fallback marker so an unknown model key still renders something.
  marker: (i) => {
    const e = new ot();
    return e.add(dt(Sn(0, 0.12, 0.3, Ne(16733525), 0, 0.15, 0, 8), i)), e;
  }
};
Object.keys(Ya).filter((i) => i !== "marker");
function wh(i, e) {
  const t = Ya[i] ?? Ya.marker, n = new Me(e ?? "#ffffff"), s = t(n);
  return s.userData.model = i, s;
}
const iy = new yx(), Rh = /* @__PURE__ */ new Map();
function sy(i) {
  let e = Rh.get(i);
  return e || (e = new Promise((t, n) => {
    iy.load(
      i,
      (s) => {
        s.scene.traverse((r) => {
          r.castShadow = !0, r.receiveShadow = !0;
        }), t(s.scene);
      },
      void 0,
      (s) => n(s)
    );
  }), Rh.set(i, e)), e;
}
function Ch(i, e) {
  i.position.set(e.position[0], e.position[1], e.position[2]), e.rotation && (i.rotation.y = $i.degToRad(e.rotation));
  const t = e.scale ?? 1;
  Array.isArray(t) ? i.scale.set(t[0], t[1], t[2]) : i.scale.setScalar(t);
}
function ry(i, e) {
  if (!e) return;
  const t = new Me(e);
  i.traverse((n) => {
    const s = n;
    if (s.isMesh && s.material) {
      const r = s.material.clone();
      r.color && r.color.multiply(t), s.material = r;
    }
  });
}
function oy(i) {
  if (i.glb) {
    const t = new ot();
    Ch(t, i), t.userData.furnitureId = i.id;
    const n = wh("marker", i.color);
    return t.add(n), sy(i.glb).then((s) => {
      const r = s.clone(!0);
      ry(r, i.color), t.remove(n), t.add(r);
    }).catch((s) => {
      console.error(`[3d-floorplan] failed to load GLB "${i.glb}":`, s);
    }), t;
  }
  const e = wh(i.model, i.color);
  return Ch(e, i), e.userData.furnitureId = i.id, e;
}
class Vu {
  constructor(e = 1) {
    this.current = "", this.canvas = document.createElement("canvas"), this.canvas.width = 256, this.canvas.height = 128, this.ctx = this.canvas.getContext("2d"), this.texture = new j0(this.canvas), this.texture.anisotropy = 4;
    const t = new yu({
      map: this.texture,
      transparent: !0,
      depthWrite: !1,
      depthTest: !1
    });
    this.sprite = new k0(t), this.sprite.scale.set(1 * e, 0.5 * e, 1), this.sprite.renderOrder = 999;
  }
  setText(e, t = "#ffffff") {
    if (e === this.current) return;
    this.current = e;
    const n = this.ctx;
    n.clearRect(0, 0, this.canvas.width, this.canvas.height), n.fillStyle = "rgba(20,22,26,0.78)", ay(n, 8, 28, 240, 72, 16), n.fill(), n.fillStyle = t, n.font = "bold 48px system-ui, sans-serif", n.textAlign = "center", n.textBaseline = "middle", n.fillText(e, 128, 64, 224), this.texture.needsUpdate = !0;
  }
  setPosition(e, t, n) {
    this.sprite.position.set(e, t, n);
  }
  dispose() {
    this.texture.dispose(), this.sprite.material.dispose();
  }
}
function ay(i, e, t, n, s, r) {
  i.beginPath(), i.moveTo(e + r, t), i.arcTo(e + n, t, e + n, t + s, r), i.arcTo(e + n, t + s, e, t + s, r), i.arcTo(e, t + s, e, t, r), i.arcTo(e, t, e + n, t, r), i.closePath();
}
const cy = 2.6, ly = 0.12;
function hy(i) {
  return new hs({
    color: i ?? "#e6e6e6",
    roughness: 0.95,
    metalness: 0
  });
}
function Ur(i, e, t, n, s, r, o, a, c, l) {
  const h = r - s;
  if (h <= 1e-4) return;
  const u = a - o;
  if (u <= 1e-4) return;
  const d = new _i(h, u, c), f = new St(d, l);
  f.castShadow = !0, f.receiveShadow = !0;
  const g = s + h / 2, _ = e.x + t.x * g, p = e.y + t.y * g;
  f.position.set(_, o + u / 2, p), f.rotation.y = n, i.add(f);
}
function uy(i, e, t) {
  const n = new te(e.start[0], e.start[1]), r = new te(e.end[0], e.end[1]).clone().sub(n), o = r.length();
  if (o <= 1e-4) return;
  const a = r.clone().normalize(), l = -Math.atan2(a.y, a.x), h = e.height ?? t, u = e.thickness ?? ly, d = hy(e.color), f = [...e.openings ?? []].sort((_, p) => _.position - p.position);
  let g = 0;
  for (const _ of f) {
    const p = Ph(_.position, 0, o), m = Ph(_.position + _.width, 0, o);
    Ur(i, n, a, l, g, p, 0, h, u, d);
    const T = _.sill ?? (_.kind === "window" ? 0.9 : 0), y = _.top ?? (_.kind === "window" ? 2.1 : 2.05);
    T > 0 && Ur(i, n, a, l, p, m, 0, T, u, d), y < h && Ur(i, n, a, l, p, m, y, h, u, d), g = Math.max(g, m);
  }
  Ur(i, n, a, l, g, o, 0, h, u, d);
}
function dy(i, e) {
  if (!e.polygon || e.polygon.length < 3) return null;
  const t = new Pu();
  e.polygon.forEach((a, c) => {
    c === 0 ? t.moveTo(a[0], a[1]) : t.lineTo(a[0], a[1]);
  }), t.closePath();
  const n = new Mc(t);
  n.rotateX(Math.PI / 2);
  const s = new St(
    n,
    new hs({
      color: e.color ?? "#cfc7ba",
      roughness: 1,
      metalness: 0,
      side: tn
    })
  );
  s.position.y = 5e-3, s.receiveShadow = !0, i.add(s);
  let r = 0, o = 0;
  for (const a of e.polygon)
    r += a[0], o += a[1];
  return new te(r / e.polygon.length, o / e.polygon.length);
}
function fy(i, e) {
  const t = new ot();
  t.position.y = i.elevation ?? 0;
  const n = i.wallHeight ?? e ?? cy, s = [];
  for (const a of i.rooms ?? []) {
    const c = dy(t, a);
    if (c && a.name) {
      const l = new Vu(1.4);
      l.setText(a.name, "#e8e8e8"), l.setPosition(c.x, 0.05, c.y), s.push(l), t.add(l.sprite);
    }
  }
  for (const a of i.walls ?? [])
    uy(t, a, n);
  const r = /* @__PURE__ */ new Map();
  for (const a of i.furniture ?? []) {
    const c = oy(a);
    t.add(c), a.id && r.set(a.id, c);
  }
  const o = new on().setFromObject(t);
  return { group: t, furnitureById: r, bbox: o, labels: s };
}
function Ph(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
const py = /* @__PURE__ */ new Set(["light", "switch", "fan", "cover", "media_player"]);
function Gu(i) {
  return i.split(".")[0];
}
function my(i) {
  return i.behavior && i.behavior !== "auto" ? i.behavior : Gu(i.entity_id);
}
function gy(i) {
  const e = [];
  i.traverse((n) => {
    const s = n;
    s.isMesh && (s.name === "emissive" ? e.unshift(s) : e.push(s));
  });
  const t = e.filter((n) => n.name === "emissive");
  return t.length ? t : e;
}
class _y {
  constructor(e) {
    this.bindings = [], this.byEntity = /* @__PURE__ */ new Map(), this.root = e;
  }
  /** Register all bindings for a freshly built floor. */
  register(e, t) {
    for (const n of t) {
      const s = my(n);
      let r = null;
      const o = new w();
      n.anchor_object && e.furnitureById.has(n.anchor_object) ? (r = e.furnitureById.get(n.anchor_object), r.getWorldPosition(o)) : n.anchor ? (o.set(n.anchor[0], n.anchor[1], n.anchor[2]), o.y += e.group.position.y) : (e.bbox.getCenter(o), o.y = e.group.position.y + 1.5);
      const a = {
        def: n,
        behavior: s,
        anchor: r,
        worldPos: o,
        emissiveMeshes: r ? gy(r) : []
      };
      this.setupVisual(a, e), this.bindings.push(a), this.byEntity.has(n.entity_id) || this.byEntity.set(n.entity_id, []), this.byEntity.get(n.entity_id).push(a), r && (r.userData.bindingEntity = n.entity_id);
    }
  }
  setupVisual(e, t) {
    const { behavior: n, worldPos: s } = e;
    if (n === "light") {
      const r = new Fu(16773584, 0, 8, 2);
      r.position.copy(s), r.castShadow = !1, this.root.add(r), e.pointLight = r;
    }
    if (n === "climate" || n === "sensor" || n === "binary_sensor" || n === "lock" || n === "media_player" || n === "label") {
      const r = new Vu(1.2), o = e.anchor ? 0.6 : 0;
      r.setPosition(s.x, s.y + o + 0.4, s.z), this.root.add(r.sprite), t.labels.push(r), e.label = r;
    }
    n === "fan" && (e.spin = e.anchor ?? void 0);
  }
  /** Apply current HA state to all bindings. Only changed entities do work. */
  update(e) {
    for (const t of this.bindings) {
      const n = e.states[t.def.entity_id];
      this.applyState(t, n);
    }
  }
  /** Targeted update for a single entity (used on subscribed state changes). */
  updateEntity(e, t) {
    const n = this.byEntity.get(e);
    if (!n) return;
    const s = t.states[e];
    for (const r of n) this.applyState(r, s);
  }
  applyState(e, t) {
    const n = t?.state ?? "unavailable", s = e.def.label ?? t?.attributes?.friendly_name ?? e.def.entity_id;
    switch (e.behavior) {
      case "light": {
        const r = n === "on", o = (t?.attributes?.brightness ?? 255) / 255;
        e.pointLight && (e.pointLight.intensity = r ? 2.5 * o : 0), this.setEmissive(e, r ? 16773584 : 0, r ? o : 0);
        break;
      }
      case "switch":
      case "media_player": {
        const r = n === "on" || n === "playing" || n === "home";
        this.setEmissive(e, r ? 5230698 : 0, r ? 0.6 : 0), e.label && e.behavior === "media_player" && e.label.setText(n, r ? "#7CFC8A" : "#cccccc");
        break;
      }
      case "climate": {
        const r = t?.attributes?.current_temperature, o = t?.attributes?.temperature, a = r != null ? `${r}°${o != null ? ` → ${o}°` : ""}` : n;
        e.label?.setText(a, "#9ad0ff");
        break;
      }
      case "sensor":
      case "label": {
        const r = t?.attributes?.unit_of_measurement ?? "";
        e.label?.setText(`${Lh(s)}: ${n}${r}`, "#ffe7a0");
        break;
      }
      case "binary_sensor": {
        const r = n === "on";
        e.label?.setText(
          `${Lh(s)}: ${r ? "ON" : "off"}`,
          r ? "#ff8080" : "#bbbbbb"
        ), this.setEmissive(e, r ? 16733525 : 0, r ? 0.5 : 0);
        break;
      }
      case "lock": {
        const r = n === "locked";
        e.label?.setText(
          r ? "🔒 locked" : "🔓 unlocked",
          r ? "#7CFC8A" : "#ff8080"
        ), this.setEmissive(e, r ? 5230698 : 16733525, 0.5);
        break;
      }
      case "cover": {
        const r = n === "open";
        this.setEmissive(e, r ? 5230698 : 0, r ? 0.4 : 0);
        break;
      }
      case "fan": {
        e.spin = n === "on" ? e.anchor ?? void 0 : void 0;
        break;
      }
    }
    e.lastState = n;
  }
  setEmissive(e, t, n) {
    for (const s of e.emissiveMeshes) {
      const r = s.material;
      !r || !("emissive" in r) || (r.emissive.setHex(t), r.emissiveIntensity = n, r.needsUpdate = !1);
    }
  }
  /** Per-frame animation for fans etc. */
  animate(e) {
    for (const t of this.bindings)
      t.behavior === "fan" && t.spin && (t.spin.rotation.y += e * 6);
  }
  /**
   * Given a clicked Object3D, walk up to find a bound anchor and return the
   * action to perform. Returns null if the object isn't bound.
   */
  resolveClick(e) {
    let t = e;
    for (; t; ) {
      const n = t.userData?.bindingEntity;
      if (n) {
        const s = this.byEntity.get(n)?.[0];
        return { entity_id: n, behavior: s?.behavior ?? "auto" };
      }
      t = t.parent;
    }
    return null;
  }
  /** All anchor objects, for raycasting. */
  get anchors() {
    return this.bindings.map((e) => e.anchor).filter((e) => !!e);
  }
  dispose() {
    for (const e of this.bindings)
      e.pointLight && this.root.remove(e.pointLight);
    this.bindings = [], this.byEntity.clear();
  }
}
function vy(i, e) {
  const t = Gu(i), n = { entity_id: i };
  switch (e) {
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
      return py.has(t) ? { domain: t, service: "toggle", data: n } : null;
  }
}
function Lh(i) {
  return i.length > 18 ? i.slice(0, 16) + "…" : i;
}
class xy {
  constructor(e, t = "#1b1d22") {
    this.clock = new Yv(), this.running = !1, this.rafId = 0, this.floors = [], this.floorGroups = [], this.bindingManagers = [], this.activeFloor = 0, this.fullBBox = new on(), this.raycaster = new sx(), this.pointer = new te(), this.downPos = { x: 0, y: 0 }, this.downTime = 0, this.container = e, this.renderer = new B0({ antialias: !0, alpha: !1 }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = Vh, this.renderer.domElement.style.touchAction = "none", this.renderer.domElement.style.display = "block", this.renderer.domElement.style.width = "100%", this.renderer.domElement.style.height = "100%", e.appendChild(this.renderer.domElement), this.scene = new z0(), this.scene.background = new Me(t), this.camera = new Ct(55, 1, 0.1, 1e3), this.camera.position.set(8, 8, 8), this.controls = new ax(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.dampingFactor = 0.12, this.controls.screenSpacePanning = !1, this.controls.minDistance = 2, this.controls.maxDistance = 40, this.controls.maxPolarAngle = Math.PI * 0.49, this.controls.touches = {
      ONE: Vn.ROTATE,
      TWO: Vn.DOLLY_PAN
    }, this.controls.addEventListener("change", () => this.clampTarget()), this.setupLights(), this.setupResize(), this.setupPointer();
  }
  setupLights() {
    const e = new $v(16777215, 0.55);
    this.scene.add(e);
    const t = new Bu(16777215, 0.9);
    t.position.set(10, 18, 8), t.castShadow = !0, t.shadow.mapSize.set(1024, 1024), t.shadow.camera.near = 1, t.shadow.camera.far = 60;
    const n = 20;
    t.shadow.camera.left = -n, t.shadow.camera.right = n, t.shadow.camera.top = n, t.shadow.camera.bottom = -n, this.scene.add(t);
    const s = new Hv(16777215, 4473941, 0.4);
    this.scene.add(s);
  }
  setupResize() {
    this.resizeObserver = new ResizeObserver(() => this.resize()), this.resizeObserver.observe(this.container), this.resize();
  }
  resize() {
    const e = this.container.clientWidth || 1, t = this.container.clientHeight || 1;
    this.renderer.setSize(e, t, !1), this.camera.aspect = e / t, this.camera.updateProjectionMatrix();
  }
  // -- Floor plan loading -----------------------------------------------------
  loadPlan(e) {
    this.clearPlan(), this.fullBBox.makeEmpty(), e.floors.forEach((t) => {
      const n = fy(t, e.wallHeight), s = new _y(n.group);
      s.register(n, t.bindings ?? []), this.scene.add(n.group), this.floors.push(n), this.floorGroups.push(n.group), this.bindingManagers.push(s), this.fullBBox.union(n.bbox);
    }), this.setActiveFloor(0), this.resetView();
  }
  clearPlan() {
    for (const e of this.bindingManagers) e.dispose();
    for (const e of this.floorGroups)
      this.scene.remove(e), yy(e);
    this.floors = [], this.floorGroups = [], this.bindingManagers = [], this.activeFloor = 0;
  }
  get floorCount() {
    return this.floors.length;
  }
  setActiveFloor(e) {
    e < 0 || e >= this.floors.length || (this.activeFloor = e, this.floorGroups.forEach((t, n) => {
      t.visible = n === e;
    }), this.resetView());
  }
  get currentFloor() {
    return this.activeFloor;
  }
  // -- Camera / touch hardening ----------------------------------------------
  /** Recenter on the visible floor's bounding box. The kiosk safety net. */
  resetView() {
    const e = this.floors[this.activeFloor]?.bbox ?? this.fullBBox;
    if (e.isEmpty()) return;
    const t = e.getCenter(new w()), n = e.getSize(new w()), s = Math.max(n.x, n.z, 2);
    this.controls.target.copy(t);
    const r = s * 1.4 + 4;
    this.camera.position.set(t.x + r * 0.7, t.y + r * 0.8, t.z + r * 0.7), this.controls.maxDistance = r * 2.2, this.controls.minDistance = Math.max(1.5, s * 0.15), this.camera.lookAt(t), this.controls.update();
  }
  /** Keep the orbit target from drifting outside the floor bbox + margin. */
  clampTarget() {
    const e = this.floors[this.activeFloor]?.bbox ?? this.fullBBox;
    if (e.isEmpty()) return;
    const t = 3, n = this.controls.target;
    n.x = $i.clamp(n.x, e.min.x - t, e.max.x + t), n.z = $i.clamp(n.z, e.min.z - t, e.max.z + t), n.y = $i.clamp(n.y, e.min.y, e.max.y + 1);
  }
  // -- Picking ----------------------------------------------------------------
  setPickHandler(e) {
    this.onPick = e;
  }
  setupPointer() {
    const e = this.renderer.domElement;
    e.addEventListener("pointerdown", (t) => {
      this.downPos = { x: t.clientX, y: t.clientY }, this.downTime = performance.now();
    }), e.addEventListener("pointerup", (t) => {
      const n = t.clientX - this.downPos.x, s = t.clientY - this.downPos.y, r = Math.hypot(n, s), o = performance.now() - this.downTime;
      r < 8 && o < 600 && this.handlePick(t);
    });
  }
  handlePick(e) {
    if (!this.onPick) return;
    const t = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = (e.clientX - t.left) / t.width * 2 - 1, this.pointer.y = -((e.clientY - t.top) / t.height) * 2 + 1, this.raycaster.setFromCamera(this.pointer, this.camera);
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
  updateEntity(e, t) {
    this.bindingManagers[this.activeFloor]?.updateEntity(e, t), this.bindingManagers.forEach((s, r) => {
      r !== this.activeFloor && s.updateEntity(e, t);
    });
  }
  /** Full state sync (called on each hass update from the card). */
  syncAll(e) {
    for (const t of this.bindingManagers) t.update(e);
  }
  // -- Render loop ------------------------------------------------------------
  start() {
    if (this.running) return;
    this.running = !0;
    const e = () => {
      if (!this.running) return;
      this.rafId = requestAnimationFrame(e);
      const t = this.clock.getDelta();
      this.controls.update(), this.bindingManagers[this.activeFloor]?.animate(t), this.renderer.render(this.scene, this.camera);
    };
    e();
  }
  stop() {
    this.running = !1, cancelAnimationFrame(this.rafId);
  }
  dispose() {
    this.stop(), this.resizeObserver?.disconnect(), this.clearPlan(), this.controls.dispose(), this.renderer.dispose(), this.renderer.domElement.remove();
  }
}
function yy(i) {
  i.traverse((e) => {
    const t = e;
    t.geometry && t.geometry.dispose(), t.material && (Array.isArray(t.material) ? t.material : [t.material]).forEach((s) => s.dispose());
  });
}
const My = "0.2.1", Ac = "ha-3d-floorplan-sidebar-item", Ih = "ha-3d-floorplan-overlay";
function Sy() {
  return window.ha3dFloorplan ?? {};
}
function Ey(i) {
  return new Promise((e) => setTimeout(e, i));
}
async function Ty() {
  for (let i = 0; i < 40; i++) {
    const n = document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-sidebar");
    if (n && n.shadowRoot) return n;
    await Ey(500);
  }
  return null;
}
function by(i) {
  const e = i.shadowRoot;
  return e.querySelector("ha-md-list") || e.querySelector("paper-listbox") || e.querySelector("ul.ha-scrollbar") || e.querySelector("ul") || e.querySelector(".menu");
}
function Ay(i) {
  const e = document.createElement("a");
  e.id = Ac, e.href = "#", e.setAttribute("role", "menuitem"), e.style.cssText = [
    "display:flex",
    "align-items:center",
    "gap:12px",
    "box-sizing:border-box",
    "width:calc(100% - 12px)",
    "margin:4px 8px",
    "padding:12px",
    "border-radius:12px",
    "cursor:pointer",
    "color:var(--sidebar-icon-color, var(--primary-text-color, #888))",
    "font:inherit",
    "font-size:14px",
    "text-decoration:none",
    "-webkit-tap-highlight-color:transparent"
  ].join(";");
  const t = document.createElement("ha-icon");
  t.setAttribute("icon", i.icon ?? "mdi:floor-plan"), t.style.cssText = "width:24px;height:24px;flex:0 0 24px;";
  const n = document.createElement("span");
  return n.textContent = i.title ?? "3D Floor Plan", n.style.cssText = "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;", e.appendChild(t), e.appendChild(n), e.addEventListener("mouseenter", () => e.style.background = "var(--sidebar-selected-icon-color, rgba(255,255,255,0.06))"), e.addEventListener("mouseleave", () => e.style.background = "transparent"), e.addEventListener("click", (s) => {
    s.preventDefault(), Cy(i);
  }), e;
}
function Dh(i, e) {
  const t = i.shadowRoot;
  if (t.getElementById(Ac)) return;
  const n = by(i), s = Ay(e);
  n && n.parentNode ? n.parentNode.insertBefore(s, n.nextSibling) : t.appendChild(s);
}
function wy(i) {
  return i.config ? { type: "custom:ha-3d-floorplan-card", height: "100vh", ...i.config } : {
    type: "custom:ha-3d-floorplan-card",
    height: "100vh",
    url: i.url ?? "/local/floorplans/home.json"
  };
}
function Ry() {
  const t = document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-sidebar");
  if (!t) return 0;
  const n = t.getBoundingClientRect();
  return n.width === 0 || n.right <= 0 ? 0 : Math.max(0, Math.round(n.right));
}
function Cy(i) {
  if (document.getElementById(Ih)) return;
  const e = document.createElement("div");
  e.id = Ih, e.style.cssText = [
    "position:fixed",
    "top:0",
    "right:0",
    "bottom:0",
    "left:0",
    "z-index:9999",
    "background:var(--primary-background-color, #111)",
    "display:block"
  ].join(";");
  const t = () => {
    e.style.left = `${Ry()}px`;
  };
  t(), window.addEventListener("resize", t);
  let n;
  const r = document.querySelector("home-assistant")?.shadowRoot?.querySelector(
    "home-assistant-main"
  )?.shadowRoot?.querySelector("ha-sidebar");
  r && "ResizeObserver" in window && (n = new ResizeObserver(t), n.observe(r));
  const o = window.setInterval(t, 500), a = document.createElement("button");
  a.textContent = "✕", a.title = "Close", a.style.cssText = [
    "position:absolute",
    "top:14px",
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
    c.setConfig(wy(i));
  } catch (f) {
    console.error("[3d-floorplan] sidebar config error:", f);
  }
  const l = document.querySelector("home-assistant");
  l?.hass && (c.hass = l.hass);
  const h = window.setInterval(() => {
    l?.hass && (c.hass = l.hass);
  }, 1e3), u = () => {
    window.clearInterval(h), window.clearInterval(o), window.removeEventListener("resize", t), n?.disconnect(), e.remove(), document.removeEventListener("keydown", d);
  }, d = (f) => {
    f.key === "Escape" && u();
  };
  a.addEventListener("click", u), document.addEventListener("keydown", d), e.appendChild(a), e.appendChild(c), document.body.appendChild(e);
}
async function Py() {
  const i = Sy();
  if (i.sidebar === !1) return;
  const e = await Ty();
  if (!e) {
    console.info(
      "[3d-floorplan] sidebar not found — auto-injection skipped. Use panel_custom (see README) for a guaranteed sidebar entry."
    );
    return;
  }
  Dh(e, i);
  const t = e.shadowRoot;
  new MutationObserver(() => {
    t.getElementById(Ac) || Dh(e, i);
  }).observe(t, { childList: !0, subtree: !0 });
}
var Ly = Object.defineProperty, Iy = Object.getOwnPropertyDescriptor, Kn = (i, e, t, n) => {
  for (var s = n > 1 ? void 0 : n ? Iy(e, t) : e, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(e, t, s) : o(s)) || s);
  return n && s && Ly(e, t, s), s;
};
let hn = class extends Vi {
  constructor() {
    super(...arguments), this.floorNames = [], this.activeFloorIndex = 0, this.planLoaded = !1;
  }
  // -- Lovelace lifecycle -----------------------------------------------------
  setConfig(i) {
    if (!i) throw new Error("Invalid configuration");
    if (!i.plan && !i.url && !(i.projects && i.projects.length))
      throw new Error(
        "Provide one of: `plan` (inline), `url` (JSON file), or `projects` (list)."
      );
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
    return await Promise.resolve().then(() => Uy), document.createElement("ha-3d-floorplan-card-editor");
  }
  // -- hass updates -----------------------------------------------------------
  willUpdate(i) {
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
        for (const e in i.states)
          i.states[e] !== this.lastHass.states[e] && this.sceneManager.updateEntity(e, i);
      this.lastHass = i;
    }
  }
  // -- Scene setup ------------------------------------------------------------
  initScene() {
    if (!this.viewport) return;
    const i = this.config?.background ?? "#1b1d22";
    this.sceneManager = new xy(this.viewport, i), this.sceneManager.setPickHandler((e) => this.handlePick(e)), this.sceneManager.start(), this.loadActiveProject();
  }
  async loadActiveProject() {
    if (!(!this.config || !this.sceneManager)) {
      this.loadError = void 0, this.planLoaded = !1;
      try {
        const i = await this.resolvePlan();
        this.sceneManager.loadPlan(i), this.floorNames = i.floors.map((e, t) => e.name || `Floor ${t + 1}`), this.activeFloorIndex = 0, this.planLoaded = !0, this.hass && (this.lastHass = void 0, this.applyHass(this.hass));
      } catch (i) {
        this.loadError = i?.message ?? String(i), console.error("[3d-floorplan] load failed:", i);
      }
    }
  }
  async resolvePlan() {
    const i = this.config;
    if (i.projects && i.projects.length) {
      const e = i.projects.find((t) => t.id === this.activeProjectId) ?? i.projects[0];
      return this.loadProjectRef(e);
    }
    if (i.plan) return i.plan;
    if (i.url) return this.fetchPlan(i.url);
    throw new Error("No plan, url, or projects configured.");
  }
  async loadProjectRef(i) {
    if (i.plan) return i.plan;
    if (i.url) return this.fetchPlan(i.url);
    if (this.config?.backend)
      return this.fetchPlan(`${this.config.backend.replace(/\/$/, "")}/projects/${i.id}`);
    throw new Error(`Project "${i.id}" has no plan, url, or backend.`);
  }
  async fetchPlan(i) {
    const e = await fetch(i, { cache: "no-cache" });
    if (!e.ok) throw new Error(`Failed to fetch ${i}: ${e.status}`);
    return await e.json();
  }
  // -- Interaction ------------------------------------------------------------
  handlePick(i) {
    if (!i || !this.hass) return;
    const e = this.hass.states[i.entity_id];
    if (i.behavior === "lock" && e) {
      const n = e.state === "locked" ? "unlock" : "lock";
      this.hass.callService("lock", n, { entity_id: i.entity_id });
      return;
    }
    const t = vy(i.entity_id, i.behavior);
    t ? this.hass.callService(t.domain, t.service, t.data) : this.fireMoreInfo(i.entity_id);
  }
  fireMoreInfo(i) {
    const e = new CustomEvent("hass-more-info", {
      detail: { entityId: i },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
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
  // -- Lit lifecycle ----------------------------------------------------------
  connectedCallback() {
    super.connectedCallback(), this.sceneManager?.start();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.sceneManager?.stop();
  }
  // -- Render -----------------------------------------------------------------
  render() {
    if (!this.config) return ct;
    const i = this.config.height ?? "500px", e = this.config.projects ?? [];
    return Bn`
      <ha-card>
        <div class="viewport" style="height:${i}"></div>

        ${this.loadError ? Bn`<div class="error">⚠ ${this.loadError}</div>` : ct}

        <div class="overlay top-right">
          <button class="btn" title="Reset view" @click=${this.onResetView}>
            ⌂ Reset
          </button>
        </div>

        ${e.length > 1 ? Bn`
              <div class="overlay top-left">
                <select class="select" @change=${this.onSelectProject}>
                  ${e.map(
      (t) => Bn`<option value=${t.id} ?selected=${t.id === this.activeProjectId}>
                      ${t.name || t.id}
                    </option>`
    )}
                </select>
              </div>
            ` : ct}

        ${this.floorNames.length > 1 ? Bn`
              <div class="overlay bottom">
                ${this.floorNames.map(
      (t, n) => Bn`
                    <button
                      class="tab ${n === this.activeFloorIndex ? "active" : ""}"
                      @click=${() => this.onSelectFloor(n)}
                    >
                      ${t}
                    </button>
                  `
    )}
              </div>
            ` : ct}
      </ha-card>
    `;
  }
};
hn.styles = Uh`
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
    .tab.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
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
Kn([
  tc({ attribute: !1 })
], hn.prototype, "hass", 2);
Kn([
  jn()
], hn.prototype, "config", 2);
Kn([
  jn()
], hn.prototype, "activeProjectId", 2);
Kn([
  jn()
], hn.prototype, "loadError", 2);
Kn([
  jn()
], hn.prototype, "floorNames", 2);
Kn([
  jn()
], hn.prototype, "activeFloorIndex", 2);
Kn([
  xd(".viewport")
], hn.prototype, "viewport", 2);
hn = Kn([
  kh("ha-3d-floorplan-card")
], hn);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-3d-floorplan-card",
  name: "3D Floor Plan Card",
  description: "Interactive true-3D floor plan with live entity bindings.",
  preview: !1,
  documentationURL: "https://github.com/your-org/ha-3d-floorplan-card"
});
console.info(
  `%c 3D-FLOORPLAN-CARD %c v${My} `,
  "color:#fff;background:#03a9f4;border-radius:4px 0 0 4px;padding:2px 6px",
  "color:#03a9f4;background:#222;border-radius:0 4px 4px 0;padding:2px 6px"
);
Py();
var Dy = Object.defineProperty, Ny = Object.getOwnPropertyDescriptor, Js = (i, e, t, n) => {
  for (var s = n > 1 ? void 0 : n ? Ny(e, t) : e, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(e, t, s) : o(s)) || s);
  return n && s && Dy(e, t, s), s;
};
let Yn = class extends Vi {
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
  _onField(i, e) {
    if (!this._config) return;
    const t = e.target.value, n = { ...this._config };
    t === "" ? delete n[i] : n[i] = t, this._emit(n);
  }
  _onPlanInput(i) {
    if (this._planText = i.target.value, !!this._config) {
      if (this._planText.trim() === "") {
        this._jsonError = void 0;
        const e = { ...this._config };
        delete e.plan, this._emit(e);
        return;
      }
      try {
        const e = JSON.parse(this._planText);
        if (!e.floors || !Array.isArray(e.floors))
          throw new Error('Plan must have a "floors" array.');
        this._jsonError = void 0;
        const t = { ...this._config, plan: e };
        delete t.url, this._emit(t);
      } catch (e) {
        this._jsonError = e?.message ?? "Invalid JSON";
      }
    }
  }
  render() {
    return this._config ? Bn`
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
        ${this._jsonError ? Bn`<div class="err">⚠ ${this._jsonError}</div>` : ct}

        <p class="hint">
          A full visual wall-drawing editor with a furniture palette and
          entity-binding dropdowns is planned (Phase 2). For now, author the
          plan JSON here or point to a file under <code>/config/www/</code>.
        </p>
      </div>
    ` : ct;
  }
};
Yn.styles = Uh`
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
Js([
  tc({ attribute: !1 })
], Yn.prototype, "hass", 2);
Js([
  jn()
], Yn.prototype, "_config", 2);
Js([
  jn()
], Yn.prototype, "_planText", 2);
Js([
  jn()
], Yn.prototype, "_jsonError", 2);
Yn = Js([
  kh("ha-3d-floorplan-card-editor")
], Yn);
const Uy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get Ha3dFloorplanCardEditor() {
    return Yn;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  hn as Ha3dFloorplanCard
};
