/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fr = globalThis, Ka = Fr.ShadowRoot && (Fr.ShadyCSS === void 0 || Fr.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Za = Symbol(), kc = /* @__PURE__ */ new WeakMap();
let zh = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== Za) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Ka && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = kc.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && kc.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const sd = (i) => new zh(typeof i == "string" ? i : i + "", void 0, Za), Hh = (i, ...t) => {
  const e = i.length === 1 ? i[0] : t.reduce((n, s, r) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[r + 1], i[0]);
  return new zh(e, i, Za);
}, rd = (i, t) => {
  if (Ka) i.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const n = document.createElement("style"), s = Fr.litNonce;
    s !== void 0 && n.setAttribute("nonce", s), n.textContent = e.cssText, i.appendChild(n);
  }
}, zc = Ka ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules) e += n.cssText;
  return sd(e);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: od, defineProperty: ad, getOwnPropertyDescriptor: cd, getOwnPropertyNames: ld, getOwnPropertySymbols: hd, getPrototypeOf: ud } = Object, eo = globalThis, Hc = eo.trustedTypes, dd = Hc ? Hc.emptyScript : "", fd = eo.reactiveElementPolyfillSupport, Ps = (i, t) => i, $r = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? dd : null;
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
} }, Ja = (i, t) => !od(i, t), Vc = { attribute: !0, type: String, converter: $r, reflect: !1, useDefault: !1, hasChanged: Ja };
Symbol.metadata ??= Symbol("metadata"), eo.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ki = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Vc) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), s = this.getPropertyDescriptor(t, n, e);
      s !== void 0 && ad(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: s, set: r } = cd(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? Vc;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Ps("elementProperties"))) return;
    const t = ud(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Ps("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Ps("properties"))) {
      const e = this.properties, n = [...ld(e), ...hd(e)];
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
      for (const s of n) e.unshift(zc(s));
    } else t !== void 0 && e.push(zc(t));
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
    return rd(t, this.constructor.elementStyles), t;
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
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : $r).toAttribute(e, n.type);
      this._$Em = t, r == null ? this.removeAttribute(s) : this.setAttribute(s, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const n = this.constructor, s = n._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const r = n.getPropertyOptions(s), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : $r;
      this._$Em = s;
      const a = o.fromAttribute(e, r.type);
      this[s] = a ?? this._$Ej?.get(s) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, n, s = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (s === !1 && (r = this[t]), n ??= o.getPropertyOptions(t), !((n.hasChanged ?? Ja)(r, e) || n.useDefault && n.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, n)))) return;
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
ki.elementStyles = [], ki.shadowRootOptions = { mode: "open" }, ki[Ps("elementProperties")] = /* @__PURE__ */ new Map(), ki[Ps("finalized")] = /* @__PURE__ */ new Map(), fd?.({ ReactiveElement: ki }), (eo.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qa = globalThis, Gc = (i) => i, qr = Qa.trustedTypes, Wc = qr ? qr.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Vh = "$lit$", Gn = `lit$${Math.random().toFixed(9).slice(2)}$`, Gh = "?" + Gn, pd = `<${Gh}>`, fi = document, Fs = () => fi.createComment(""), Bs = (i) => i === null || typeof i != "object" && typeof i != "function", tc = Array.isArray, md = (i) => tc(i) || typeof i?.[Symbol.iterator] == "function", fo = `[ 	
\f\r]`, ps = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Xc = /-->/g, $c = />/g, ti = RegExp(`>|${fo}(?:([^\\s"'>=/]+)(${fo}*=${fo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), qc = /'/g, Yc = /"/g, Wh = /^(?:script|style|textarea|title)$/i, gd = (i) => (t, ...e) => ({ _$litType$: i, strings: t, values: e }), qe = gd(1), ji = Symbol.for("lit-noChange"), se = Symbol.for("lit-nothing"), jc = /* @__PURE__ */ new WeakMap(), di = fi.createTreeWalker(fi, 129);
function Xh(i, t) {
  if (!tc(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Wc !== void 0 ? Wc.createHTML(t) : t;
}
const _d = (i, t) => {
  const e = i.length - 1, n = [];
  let s, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ps;
  for (let a = 0; a < e; a++) {
    const c = i[a];
    let l, h, u = -1, d = 0;
    for (; d < c.length && (o.lastIndex = d, h = o.exec(c), h !== null); ) d = o.lastIndex, o === ps ? h[1] === "!--" ? o = Xc : h[1] !== void 0 ? o = $c : h[2] !== void 0 ? (Wh.test(h[2]) && (s = RegExp("</" + h[2], "g")), o = ti) : h[3] !== void 0 && (o = ti) : o === ti ? h[0] === ">" ? (o = s ?? ps, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, l = h[1], o = h[3] === void 0 ? ti : h[3] === '"' ? Yc : qc) : o === Yc || o === qc ? o = ti : o === Xc || o === $c ? o = ps : (o = ti, s = void 0);
    const f = o === ti && i[a + 1].startsWith("/>") ? " " : "";
    r += o === ps ? c + pd : u >= 0 ? (n.push(l), c.slice(0, u) + Vh + c.slice(u) + Gn + f) : c + Gn + (u === -2 ? a : f);
  }
  return [Xh(i, r + (i[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), n];
};
class ks {
  constructor({ strings: t, _$litType$: e }, n) {
    let s;
    this.parts = [];
    let r = 0, o = 0;
    const a = t.length - 1, c = this.parts, [l, h] = _d(t, e);
    if (this.el = ks.createElement(l, n), di.currentNode = this.el.content, e === 2 || e === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (s = di.nextNode()) !== null && c.length < a; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const u of s.getAttributeNames()) if (u.endsWith(Vh)) {
          const d = h[o++], f = s.getAttribute(u).split(Gn), g = /([.?@])?(.*)/.exec(d);
          c.push({ type: 1, index: r, name: g[2], strings: f, ctor: g[1] === "." ? xd : g[1] === "?" ? yd : g[1] === "@" ? Md : no }), s.removeAttribute(u);
        } else u.startsWith(Gn) && (c.push({ type: 6, index: r }), s.removeAttribute(u));
        if (Wh.test(s.tagName)) {
          const u = s.textContent.split(Gn), d = u.length - 1;
          if (d > 0) {
            s.textContent = qr ? qr.emptyScript : "";
            for (let f = 0; f < d; f++) s.append(u[f], Fs()), di.nextNode(), c.push({ type: 2, index: ++r });
            s.append(u[d], Fs());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Gh) c.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = s.data.indexOf(Gn, u + 1)) !== -1; ) c.push({ type: 7, index: r }), u += Gn.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const n = fi.createElement("template");
    return n.innerHTML = t, n;
  }
}
function Ki(i, t, e = i, n) {
  if (t === ji) return t;
  let s = n !== void 0 ? e._$Co?.[n] : e._$Cl;
  const r = Bs(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== r && (s?._$AO?.(!1), r === void 0 ? s = void 0 : (s = new r(i), s._$AT(i, e, n)), n !== void 0 ? (e._$Co ??= [])[n] = s : e._$Cl = s), s !== void 0 && (t = Ki(i, s._$AS(i, t.values), s, n)), t;
}
class vd {
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
    const { el: { content: e }, parts: n } = this._$AD, s = (t?.creationScope ?? fi).importNode(e, !0);
    di.currentNode = s;
    let r = di.nextNode(), o = 0, a = 0, c = n[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let l;
        c.type === 2 ? l = new Ys(r, r.nextSibling, this, t) : c.type === 1 ? l = new c.ctor(r, c.name, c.strings, this, t) : c.type === 6 && (l = new Sd(r, this, t)), this._$AV.push(l), c = n[++a];
      }
      o !== c?.index && (r = di.nextNode(), o++);
    }
    return di.currentNode = fi, s;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class Ys {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, n, s) {
    this.type = 2, this._$AH = se, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = s, this._$Cv = s?.isConnected ?? !0;
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
    t = Ki(this, t, e), Bs(t) ? t === se || t == null || t === "" ? (this._$AH !== se && this._$AR(), this._$AH = se) : t !== this._$AH && t !== ji && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : md(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== se && Bs(this._$AH) ? this._$AA.nextSibling.data = t : this.T(fi.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: n } = t, s = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = ks.createElement(Xh(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === s) this._$AH.p(e);
    else {
      const r = new vd(s, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = jc.get(t.strings);
    return e === void 0 && jc.set(t.strings, e = new ks(t)), e;
  }
  k(t) {
    tc(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, s = 0;
    for (const r of t) s === e.length ? e.push(n = new Ys(this.O(Fs()), this.O(Fs()), this, this.options)) : n = e[s], n._$AI(r), s++;
    s < e.length && (this._$AR(n && n._$AB.nextSibling, s), e.length = s);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const n = Gc(t).nextSibling;
      Gc(t).remove(), t = n;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class no {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, s, r) {
    this.type = 1, this._$AH = se, this._$AN = void 0, this.element = t, this.name = e, this._$AM = s, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = se;
  }
  _$AI(t, e = this, n, s) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = Ki(this, t, e, 0), o = !Bs(t) || t !== this._$AH && t !== ji, o && (this._$AH = t);
    else {
      const a = t;
      let c, l;
      for (t = r[0], c = 0; c < r.length - 1; c++) l = Ki(this, a[n + c], e, c), l === ji && (l = this._$AH[c]), o ||= !Bs(l) || l !== this._$AH[c], l === se ? t = se : t !== se && (t += (l ?? "") + r[c + 1]), this._$AH[c] = l;
    }
    o && !s && this.j(t);
  }
  j(t) {
    t === se ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class xd extends no {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === se ? void 0 : t;
  }
}
class yd extends no {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== se);
  }
}
class Md extends no {
  constructor(t, e, n, s, r) {
    super(t, e, n, s, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Ki(this, t, e, 0) ?? se) === ji) return;
    const n = this._$AH, s = t === se && n !== se || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, r = t !== se && (n === se || s);
    s && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Sd {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Ki(this, t);
  }
}
const Ed = Qa.litHtmlPolyfillSupport;
Ed?.(ks, Ys), (Qa.litHtmlVersions ??= []).push("3.3.3");
const bd = (i, t, e) => {
  const n = e?.renderBefore ?? t;
  let s = n._$litPart$;
  if (s === void 0) {
    const r = e?.renderBefore ?? null;
    n._$litPart$ = s = new Ys(t.insertBefore(Fs(), r), r, void 0, e ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ec = globalThis;
class Vi extends ki {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = bd(e, this.renderRoot, this.renderOptions);
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
const Td = ec.litElementPolyfillSupport;
Td?.({ LitElement: Vi });
(ec.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $h = (i) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ad = { attribute: !0, type: String, converter: $r, reflect: !1, hasChanged: Ja }, wd = (i = Ad, t, e) => {
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
function nc(i) {
  return (t, e) => typeof e == "object" ? wd(i, t, e) : ((n, s, r) => {
    const o = s.hasOwnProperty(r);
    return s.constructor.createProperty(r, n), o ? Object.getOwnPropertyDescriptor(s, r) : void 0;
  })(i, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Je(i) {
  return nc({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rd = (i, t, e) => (e.configurable = !0, e.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(i, t, e), e);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Cd(i, t) {
  return (e, n, s) => {
    const r = (o) => o.renderRoot?.querySelector(i) ?? null;
    return Rd(e, n, { get() {
      return r(this);
    } });
  };
}
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const ic = "169", Gi = { ROTATE: 0, DOLLY: 1, PAN: 2 }, Xn = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }, Pd = 0, Kc = 1, Ld = 2, qh = 1, Yh = 2, wn = 3, In = 0, Fe = 1, on = 2, Yn = 0, Wi = 1, Zc = 2, Jc = 3, Qc = 4, Id = 5, hi = 100, Dd = 101, Nd = 102, Ud = 103, Od = 104, Fd = 200, Bd = 201, kd = 202, zd = 203, na = 204, ia = 205, Hd = 206, Vd = 207, Gd = 208, Wd = 209, Xd = 210, $d = 211, qd = 212, Yd = 213, jd = 214, sa = 0, ra = 1, oa = 2, Zi = 3, aa = 4, ca = 5, la = 6, ha = 7, jh = 0, Kd = 1, Zd = 2, jn = 0, Jd = 1, Qd = 2, tf = 3, ef = 4, nf = 5, sf = 6, rf = 7, tl = "attached", of = "detached", Kh = 300, Ji = 301, Qi = 302, ua = 303, da = 304, io = 306, ts = 1e3, $n = 1001, Yr = 1002, Ie = 1003, Zh = 1004, Rs = 1005, We = 1006, Br = 1007, Pn = 1008, Dn = 1009, Jh = 1010, Qh = 1011, zs = 1012, sc = 1013, pi = 1014, cn = 1015, js = 1016, rc = 1017, oc = 1018, es = 1020, tu = 35902, eu = 1021, nu = 1022, Ke = 1023, iu = 1024, su = 1025, Xi = 1026, ns = 1027, ac = 1028, cc = 1029, ru = 1030, lc = 1031, hc = 1033, kr = 33776, zr = 33777, Hr = 33778, Vr = 33779, fa = 35840, pa = 35841, ma = 35842, ga = 35843, _a = 36196, va = 37492, xa = 37496, ya = 37808, Ma = 37809, Sa = 37810, Ea = 37811, ba = 37812, Ta = 37813, Aa = 37814, wa = 37815, Ra = 37816, Ca = 37817, Pa = 37818, La = 37819, Ia = 37820, Da = 37821, Gr = 36492, Na = 36494, Ua = 36495, ou = 36283, Oa = 36284, Fa = 36285, Ba = 36286, Hs = 2300, Vs = 2301, po = 2302, el = 2400, nl = 2401, il = 2402, af = 2500, cf = 0, au = 1, ka = 2, lf = 3200, hf = 3201, cu = 0, uf = 1, Wn = "", Pe = "srgb", be = "srgb-linear", uc = "display-p3", so = "display-p3-linear", jr = "linear", ae = "srgb", Kr = "rec709", Zr = "p3", xi = 7680, sl = 519, df = 512, ff = 513, pf = 514, lu = 515, mf = 516, gf = 517, _f = 518, vf = 519, za = 35044, rl = "300 es", Ln = 2e3, Jr = 2001;
class _i {
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
const Te = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let ol = 1234567;
const Ls = Math.PI / 180, is = 180 / Math.PI;
function Ze() {
  const i = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (Te[i & 255] + Te[i >> 8 & 255] + Te[i >> 16 & 255] + Te[i >> 24 & 255] + "-" + Te[t & 255] + Te[t >> 8 & 255] + "-" + Te[t >> 16 & 15 | 64] + Te[t >> 24 & 255] + "-" + Te[e & 63 | 128] + Te[e >> 8 & 255] + "-" + Te[e >> 16 & 255] + Te[e >> 24 & 255] + Te[n & 255] + Te[n >> 8 & 255] + Te[n >> 16 & 255] + Te[n >> 24 & 255]).toLowerCase();
}
function ve(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function dc(i, t) {
  return (i % t + t) % t;
}
function xf(i, t, e, n, s) {
  return n + (i - t) * (s - n) / (e - t);
}
function yf(i, t, e) {
  return i !== t ? (e - i) / (t - i) : 0;
}
function Is(i, t, e) {
  return (1 - e) * i + e * t;
}
function Mf(i, t, e, n) {
  return Is(i, t, 1 - Math.exp(-e * n));
}
function Sf(i, t = 1) {
  return t - Math.abs(dc(i, t * 2) - t);
}
function Ef(i, t, e) {
  return i <= t ? 0 : i >= e ? 1 : (i = (i - t) / (e - t), i * i * (3 - 2 * i));
}
function bf(i, t, e) {
  return i <= t ? 0 : i >= e ? 1 : (i = (i - t) / (e - t), i * i * i * (i * (i * 6 - 15) + 10));
}
function Tf(i, t) {
  return i + Math.floor(Math.random() * (t - i + 1));
}
function Af(i, t) {
  return i + Math.random() * (t - i);
}
function wf(i) {
  return i * (0.5 - Math.random());
}
function Rf(i) {
  i !== void 0 && (ol = i);
  let t = ol += 1831565813;
  return t = Math.imul(t ^ t >>> 15, t | 1), t ^= t + Math.imul(t ^ t >>> 7, t | 61), ((t ^ t >>> 14) >>> 0) / 4294967296;
}
function Cf(i) {
  return i * Ls;
}
function Pf(i) {
  return i * is;
}
function Lf(i) {
  return (i & i - 1) === 0 && i !== 0;
}
function If(i) {
  return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2));
}
function Df(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function Nf(i, t, e, n, s) {
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
function an(i, t) {
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
function Jt(i, t) {
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
const $i = {
  DEG2RAD: Ls,
  RAD2DEG: is,
  generateUUID: Ze,
  clamp: ve,
  euclideanModulo: dc,
  mapLinear: xf,
  inverseLerp: yf,
  lerp: Is,
  damp: Mf,
  pingpong: Sf,
  smoothstep: Ef,
  smootherstep: bf,
  randInt: Tf,
  randFloat: Af,
  randFloatSpread: wf,
  seededRandom: Rf,
  degToRad: Cf,
  radToDeg: Pf,
  isPowerOfTwo: Lf,
  ceilPowerOfTwo: If,
  floorPowerOfTwo: Df,
  setQuaternionFromProperEuler: Nf,
  normalize: Jt,
  denormalize: an
};
class et {
  constructor(t = 0, e = 0) {
    et.prototype.isVector2 = !0, this.x = t, this.y = e;
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
    return Math.acos(ve(n, -1, 1));
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
class Dt {
  constructor(t, e, n, s, r, o, a, c, l) {
    Dt.prototype.isMatrix3 = !0, this.elements = [
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
    const n = t.elements, s = e.elements, r = this.elements, o = n[0], a = n[3], c = n[6], l = n[1], h = n[4], u = n[7], d = n[2], f = n[5], g = n[8], _ = s[0], p = s[3], m = s[6], b = s[1], y = s[4], S = s[7], D = s[2], R = s[5], A = s[8];
    return r[0] = o * _ + a * b + c * D, r[3] = o * p + a * y + c * R, r[6] = o * m + a * S + c * A, r[1] = l * _ + h * b + u * D, r[4] = l * p + h * y + u * R, r[7] = l * m + h * S + u * A, r[2] = d * _ + f * b + g * D, r[5] = d * p + f * y + g * R, r[8] = d * m + f * S + g * A, this;
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
    return this.premultiply(mo.makeScale(t, e)), this;
  }
  rotate(t) {
    return this.premultiply(mo.makeRotation(-t)), this;
  }
  translate(t, e) {
    return this.premultiply(mo.makeTranslation(t, e)), this;
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
const mo = /* @__PURE__ */ new Dt();
function hu(i) {
  for (let t = i.length - 1; t >= 0; --t)
    if (i[t] >= 65535) return !0;
  return !1;
}
function Gs(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Uf() {
  const i = Gs("canvas");
  return i.style.display = "block", i;
}
const al = {};
function Wr(i) {
  i in al || (al[i] = !0, console.warn(i));
}
function Of(i, t, e) {
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
function Ff(i) {
  const t = i.elements;
  t[2] = 0.5 * t[2] + 0.5 * t[3], t[6] = 0.5 * t[6] + 0.5 * t[7], t[10] = 0.5 * t[10] + 0.5 * t[11], t[14] = 0.5 * t[14] + 0.5 * t[15];
}
function Bf(i) {
  const t = i.elements;
  t[11] === -1 ? (t[10] = -t[10] - 1, t[14] = -t[14]) : (t[10] = -t[10], t[14] = -t[14] + 1);
}
const cl = /* @__PURE__ */ new Dt().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), ll = /* @__PURE__ */ new Dt().set(
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
  [be]: {
    transfer: jr,
    primaries: Kr,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (i) => i,
    fromReference: (i) => i
  },
  [Pe]: {
    transfer: ae,
    primaries: Kr,
    luminanceCoefficients: [0.2126, 0.7152, 0.0722],
    toReference: (i) => i.convertSRGBToLinear(),
    fromReference: (i) => i.convertLinearToSRGB()
  },
  [so]: {
    transfer: jr,
    primaries: Zr,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (i) => i.applyMatrix3(ll),
    fromReference: (i) => i.applyMatrix3(cl)
  },
  [uc]: {
    transfer: ae,
    primaries: Zr,
    luminanceCoefficients: [0.2289, 0.6917, 0.0793],
    toReference: (i) => i.convertSRGBToLinear().applyMatrix3(ll),
    fromReference: (i) => i.applyMatrix3(cl).convertLinearToSRGB()
  }
}, kf = /* @__PURE__ */ new Set([be, so]), Wt = {
  enabled: !0,
  _workingColorSpace: be,
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(i) {
    if (!kf.has(i))
      throw new Error(`Unsupported working color space, "${i}".`);
    this._workingColorSpace = i;
  },
  convert: function(i, t, e) {
    if (this.enabled === !1 || t === e || !t || !e)
      return i;
    const n = ms[t].toReference, s = ms[e].fromReference;
    return s(n(i));
  },
  fromWorkingColorSpace: function(i, t) {
    return this.convert(i, this._workingColorSpace, t);
  },
  toWorkingColorSpace: function(i, t) {
    return this.convert(i, t, this._workingColorSpace);
  },
  getPrimaries: function(i) {
    return ms[i].primaries;
  },
  getTransfer: function(i) {
    return i === Wn ? jr : ms[i].transfer;
  },
  getLuminanceCoefficients: function(i, t = this._workingColorSpace) {
    return i.fromArray(ms[t].luminanceCoefficients);
  }
};
function qi(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function go(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let yi;
class zf {
  static getDataURL(t) {
    if (/^data:/i.test(t.src) || typeof HTMLCanvasElement > "u")
      return t.src;
    let e;
    if (t instanceof HTMLCanvasElement)
      e = t;
    else {
      yi === void 0 && (yi = Gs("canvas")), yi.width = t.width, yi.height = t.height;
      const n = yi.getContext("2d");
      t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = yi;
    }
    return e.width > 2048 || e.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", t), e.toDataURL("image/jpeg", 0.6)) : e.toDataURL("image/png");
  }
  static sRGBToLinear(t) {
    if (typeof HTMLImageElement < "u" && t instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && t instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && t instanceof ImageBitmap) {
      const e = Gs("canvas");
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
let Hf = 0;
class uu {
  constructor(t = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Hf++ }), this.uuid = Ze(), this.data = t, this.dataReady = !0, this.version = 0;
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
          s[o].isDataTexture ? r.push(_o(s[o].image)) : r.push(_o(s[o]));
      } else
        r = _o(s);
      n.url = r;
    }
    return e || (t.images[this.uuid] = n), n;
  }
}
function _o(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? zf.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let Vf = 0;
class xe extends _i {
  constructor(t = xe.DEFAULT_IMAGE, e = xe.DEFAULT_MAPPING, n = $n, s = $n, r = We, o = Pn, a = Ke, c = Dn, l = xe.DEFAULT_ANISOTROPY, h = Wn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: Vf++ }), this.uuid = Ze(), this.name = "", this.source = new uu(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = s, this.magFilter = r, this.minFilter = o, this.anisotropy = l, this.format = a, this.internalFormat = null, this.type = c, this.offset = new et(0, 0), this.repeat = new et(1, 1), this.center = new et(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Dt(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0;
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
    if (this.mapping !== Kh) return t;
    if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1)
      switch (this.wrapS) {
        case ts:
          t.x = t.x - Math.floor(t.x);
          break;
        case $n:
          t.x = t.x < 0 ? 0 : 1;
          break;
        case Yr:
          Math.abs(Math.floor(t.x) % 2) === 1 ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x);
          break;
      }
    if (t.y < 0 || t.y > 1)
      switch (this.wrapT) {
        case ts:
          t.y = t.y - Math.floor(t.y);
          break;
        case $n:
          t.y = t.y < 0 ? 0 : 1;
          break;
        case Yr:
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
xe.DEFAULT_IMAGE = null;
xe.DEFAULT_MAPPING = Kh;
xe.DEFAULT_ANISOTROPY = 1;
class qt {
  constructor(t = 0, e = 0, n = 0, s = 1) {
    qt.prototype.isVector4 = !0, this.x = t, this.y = e, this.z = n, this.w = s;
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
      const y = (l + 1) / 2, S = (f + 1) / 2, D = (m + 1) / 2, R = (h + d) / 4, A = (u + _) / 4, N = (g + p) / 4;
      return y > S && y > D ? y < 0.01 ? (n = 0, s = 0.707106781, r = 0.707106781) : (n = Math.sqrt(y), s = R / n, r = A / n) : S > D ? S < 0.01 ? (n = 0.707106781, s = 0, r = 0.707106781) : (s = Math.sqrt(S), n = R / s, r = N / s) : D < 0.01 ? (n = 0.707106781, s = 0.707106781, r = 0) : (r = Math.sqrt(D), n = A / r, s = N / r), this.set(n, s, r, e), this;
    }
    let b = Math.sqrt((p - g) * (p - g) + (u - _) * (u - _) + (d - h) * (d - h));
    return Math.abs(b) < 1e-3 && (b = 1), this.x = (p - g) / b, this.y = (u - _) / b, this.z = (d - h) / b, this.w = Math.acos((l + f + m - 1) / 2), this;
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
class Gf extends _i {
  constructor(t = 1, e = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = t, this.height = e, this.depth = 1, this.scissor = new qt(0, 0, t, e), this.scissorTest = !1, this.viewport = new qt(0, 0, t, e);
    const s = { width: t, height: e, depth: 1 };
    n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: We,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1
    }, n);
    const r = new xe(s, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
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
    return this.texture.source = new uu(e), this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, t.depthTexture !== null && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class mi extends Gf {
  constructor(t = 1, e = 1, n = {}) {
    super(t, e, n), this.isWebGLRenderTarget = !0;
  }
}
class du extends xe {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Ie, this.minFilter = Ie, this.wrapR = $n, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  addLayerUpdate(t) {
    this.layerUpdates.add(t);
  }
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class Wf extends xe {
  constructor(t = null, e = 1, n = 1, s = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: t, width: e, height: n, depth: s }, this.magFilter = Ie, this.minFilter = Ie, this.wrapR = $n, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class fn {
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
      const m = c * d + l * f + h * g + u * _, b = m >= 0 ? 1 : -1, y = 1 - m * m;
      if (y > Number.EPSILON) {
        const D = Math.sqrt(y), R = Math.atan2(D, m * b);
        p = Math.sin(p * R) / D, a = Math.sin(a * R) / D;
      }
      const S = a * b;
      if (c = c * p + d * S, l = l * p + f * S, h = h * p + g * S, u = u * p + _ * S, p === 1 - a) {
        const D = 1 / Math.sqrt(c * c + l * l + h * h + u * u);
        c *= D, l *= D, h *= D, u *= D;
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
    return 2 * Math.acos(Math.abs(ve(this.dot(t), -1, 1)));
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
    return this.applyQuaternion(hl.setFromEuler(t));
  }
  applyAxisAngle(t, e) {
    return this.applyQuaternion(hl.setFromAxisAngle(t, e));
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
    return vo.copy(this).projectOnVector(t), this.sub(vo);
  }
  reflect(t) {
    return this.sub(vo.copy(t).multiplyScalar(2 * this.dot(t)));
  }
  angleTo(t) {
    const e = Math.sqrt(this.lengthSq() * t.lengthSq());
    if (e === 0) return Math.PI / 2;
    const n = this.dot(t) / e;
    return Math.acos(ve(n, -1, 1));
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
const vo = /* @__PURE__ */ new w(), hl = /* @__PURE__ */ new fn();
class hn {
  constructor(t = new w(1 / 0, 1 / 0, 1 / 0), e = new w(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = t, this.max = e;
  }
  set(t, e) {
    return this.min.copy(t), this.max.copy(e), this;
  }
  setFromArray(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e += 3)
      this.expandByPoint(en.fromArray(t, e));
    return this;
  }
  setFromBufferAttribute(t) {
    this.makeEmpty();
    for (let e = 0, n = t.count; e < n; e++)
      this.expandByPoint(en.fromBufferAttribute(t, e));
    return this;
  }
  setFromPoints(t) {
    this.makeEmpty();
    for (let e = 0, n = t.length; e < n; e++)
      this.expandByPoint(t[e]);
    return this;
  }
  setFromCenterAndSize(t, e) {
    const n = en.copy(e).multiplyScalar(0.5);
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
          t.isMesh === !0 ? t.getVertexPosition(o, en) : en.fromBufferAttribute(r, o), en.applyMatrix4(t.matrixWorld), this.expandByPoint(en);
      else
        t.boundingBox !== void 0 ? (t.boundingBox === null && t.computeBoundingBox(), er.copy(t.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), er.copy(n.boundingBox)), er.applyMatrix4(t.matrixWorld), this.union(er);
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
    return this.clampPoint(t.center, en), en.distanceToSquared(t.center) <= t.radius * t.radius;
  }
  intersectsPlane(t) {
    let e, n;
    return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant;
  }
  intersectsTriangle(t) {
    if (this.isEmpty())
      return !1;
    this.getCenter(gs), nr.subVectors(this.max, gs), Mi.subVectors(t.a, gs), Si.subVectors(t.b, gs), Ei.subVectors(t.c, gs), Un.subVectors(Si, Mi), On.subVectors(Ei, Si), ei.subVectors(Mi, Ei);
    let e = [
      0,
      -Un.z,
      Un.y,
      0,
      -On.z,
      On.y,
      0,
      -ei.z,
      ei.y,
      Un.z,
      0,
      -Un.x,
      On.z,
      0,
      -On.x,
      ei.z,
      0,
      -ei.x,
      -Un.y,
      Un.x,
      0,
      -On.y,
      On.x,
      0,
      -ei.y,
      ei.x,
      0
    ];
    return !xo(e, Mi, Si, Ei, nr) || (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !xo(e, Mi, Si, Ei, nr)) ? !1 : (ir.crossVectors(Un, On), e = [ir.x, ir.y, ir.z], xo(e, Mi, Si, Ei, nr));
  }
  clampPoint(t, e) {
    return e.copy(t).clamp(this.min, this.max);
  }
  distanceToPoint(t) {
    return this.clampPoint(t, en).distanceTo(t);
  }
  getBoundingSphere(t) {
    return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = this.getSize(en).length() * 0.5), t;
  }
  intersect(t) {
    return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(t) {
    return this.min.min(t.min), this.max.max(t.max), this;
  }
  applyMatrix4(t) {
    return this.isEmpty() ? this : (yn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), yn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), yn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), yn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), yn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), yn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), yn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), yn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(yn), this);
  }
  translate(t) {
    return this.min.add(t), this.max.add(t), this;
  }
  equals(t) {
    return t.min.equals(this.min) && t.max.equals(this.max);
  }
}
const yn = [
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w(),
  /* @__PURE__ */ new w()
], en = /* @__PURE__ */ new w(), er = /* @__PURE__ */ new hn(), Mi = /* @__PURE__ */ new w(), Si = /* @__PURE__ */ new w(), Ei = /* @__PURE__ */ new w(), Un = /* @__PURE__ */ new w(), On = /* @__PURE__ */ new w(), ei = /* @__PURE__ */ new w(), gs = /* @__PURE__ */ new w(), nr = /* @__PURE__ */ new w(), ir = /* @__PURE__ */ new w(), ni = /* @__PURE__ */ new w();
function xo(i, t, e, n, s) {
  for (let r = 0, o = i.length - 3; r <= o; r += 3) {
    ni.fromArray(i, r);
    const a = s.x * Math.abs(ni.x) + s.y * Math.abs(ni.y) + s.z * Math.abs(ni.z), c = t.dot(ni), l = e.dot(ni), h = n.dot(ni);
    if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > a)
      return !1;
  }
  return !0;
}
const Xf = /* @__PURE__ */ new hn(), _s = /* @__PURE__ */ new w(), yo = /* @__PURE__ */ new w();
class mn {
  constructor(t = new w(), e = -1) {
    this.isSphere = !0, this.center = t, this.radius = e;
  }
  set(t, e) {
    return this.center.copy(t), this.radius = e, this;
  }
  setFromPoints(t, e) {
    const n = this.center;
    e !== void 0 ? n.copy(e) : Xf.setFromPoints(t).getCenter(n);
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
    _s.subVectors(t, this.center);
    const e = _s.lengthSq();
    if (e > this.radius * this.radius) {
      const n = Math.sqrt(e), s = (n - this.radius) * 0.5;
      this.center.addScaledVector(_s, s / n), this.radius += s;
    }
    return this;
  }
  union(t) {
    return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (this.center.equals(t.center) === !0 ? this.radius = Math.max(this.radius, t.radius) : (yo.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(_s.copy(t.center).add(yo)), this.expandByPoint(_s.copy(t.center).sub(yo))), this);
  }
  equals(t) {
    return t.center.equals(this.center) && t.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Mn = /* @__PURE__ */ new w(), Mo = /* @__PURE__ */ new w(), sr = /* @__PURE__ */ new w(), Fn = /* @__PURE__ */ new w(), So = /* @__PURE__ */ new w(), rr = /* @__PURE__ */ new w(), Eo = /* @__PURE__ */ new w();
class cs {
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
    return this.origin.copy(this.at(t, Mn)), this;
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
    const e = Mn.subVectors(t, this.origin).dot(this.direction);
    return e < 0 ? this.origin.distanceToSquared(t) : (Mn.copy(this.origin).addScaledVector(this.direction, e), Mn.distanceToSquared(t));
  }
  distanceSqToSegment(t, e, n, s) {
    Mo.copy(t).add(e).multiplyScalar(0.5), sr.copy(e).sub(t).normalize(), Fn.copy(this.origin).sub(Mo);
    const r = t.distanceTo(e) * 0.5, o = -this.direction.dot(sr), a = Fn.dot(this.direction), c = -Fn.dot(sr), l = Fn.lengthSq(), h = Math.abs(1 - o * o);
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
    return n && n.copy(this.origin).addScaledVector(this.direction, u), s && s.copy(Mo).addScaledVector(sr, d), f;
  }
  intersectSphere(t, e) {
    Mn.subVectors(t.center, this.origin);
    const n = Mn.dot(this.direction), s = Mn.dot(Mn) - n * n, r = t.radius * t.radius;
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
    return this.intersectBox(t, Mn) !== null;
  }
  intersectTriangle(t, e, n, s, r) {
    So.subVectors(e, t), rr.subVectors(n, t), Eo.crossVectors(So, rr);
    let o = this.direction.dot(Eo), a;
    if (o > 0) {
      if (s) return null;
      a = 1;
    } else if (o < 0)
      a = -1, o = -o;
    else
      return null;
    Fn.subVectors(this.origin, t);
    const c = a * this.direction.dot(rr.crossVectors(Fn, rr));
    if (c < 0)
      return null;
    const l = a * this.direction.dot(So.cross(Fn));
    if (l < 0 || c + l > o)
      return null;
    const h = -a * Fn.dot(Eo);
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
class Ct {
  constructor(t, e, n, s, r, o, a, c, l, h, u, d, f, g, _, p) {
    Ct.prototype.isMatrix4 = !0, this.elements = [
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
    return new Ct().fromArray(this.elements);
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
    const e = this.elements, n = t.elements, s = 1 / bi.setFromMatrixColumn(t, 0).length(), r = 1 / bi.setFromMatrixColumn(t, 1).length(), o = 1 / bi.setFromMatrixColumn(t, 2).length();
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
    return this.compose($f, t, qf);
  }
  lookAt(t, e, n) {
    const s = this.elements;
    return Ve.subVectors(t, e), Ve.lengthSq() === 0 && (Ve.z = 1), Ve.normalize(), Bn.crossVectors(n, Ve), Bn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Ve.x += 1e-4 : Ve.z += 1e-4, Ve.normalize(), Bn.crossVectors(n, Ve)), Bn.normalize(), or.crossVectors(Ve, Bn), s[0] = Bn.x, s[4] = or.x, s[8] = Ve.x, s[1] = Bn.y, s[5] = or.y, s[9] = Ve.y, s[2] = Bn.z, s[6] = or.z, s[10] = Ve.z, this;
  }
  multiply(t) {
    return this.multiplyMatrices(this, t);
  }
  premultiply(t) {
    return this.multiplyMatrices(t, this);
  }
  multiplyMatrices(t, e) {
    const n = t.elements, s = e.elements, r = this.elements, o = n[0], a = n[4], c = n[8], l = n[12], h = n[1], u = n[5], d = n[9], f = n[13], g = n[2], _ = n[6], p = n[10], m = n[14], b = n[3], y = n[7], S = n[11], D = n[15], R = s[0], A = s[4], N = s[8], Y = s[12], v = s[1], E = s[5], k = s[9], B = s[13], H = s[2], j = s[6], z = s[10], Q = s[14], G = s[3], ct = s[7], lt = s[11], _t = s[15];
    return r[0] = o * R + a * v + c * H + l * G, r[4] = o * A + a * E + c * j + l * ct, r[8] = o * N + a * k + c * z + l * lt, r[12] = o * Y + a * B + c * Q + l * _t, r[1] = h * R + u * v + d * H + f * G, r[5] = h * A + u * E + d * j + f * ct, r[9] = h * N + u * k + d * z + f * lt, r[13] = h * Y + u * B + d * Q + f * _t, r[2] = g * R + _ * v + p * H + m * G, r[6] = g * A + _ * E + p * j + m * ct, r[10] = g * N + _ * k + p * z + m * lt, r[14] = g * Y + _ * B + p * Q + m * _t, r[3] = b * R + y * v + S * H + D * G, r[7] = b * A + y * E + S * j + D * ct, r[11] = b * N + y * k + S * z + D * lt, r[15] = b * Y + y * B + S * Q + D * _t, this;
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
    const t = this.elements, e = t[0], n = t[1], s = t[2], r = t[3], o = t[4], a = t[5], c = t[6], l = t[7], h = t[8], u = t[9], d = t[10], f = t[11], g = t[12], _ = t[13], p = t[14], m = t[15], b = u * p * l - _ * d * l + _ * c * f - a * p * f - u * c * m + a * d * m, y = g * d * l - h * p * l - g * c * f + o * p * f + h * c * m - o * d * m, S = h * _ * l - g * u * l + g * a * f - o * _ * f - h * a * m + o * u * m, D = g * u * c - h * _ * c - g * a * d + o * _ * d + h * a * p - o * u * p, R = e * b + n * y + s * S + r * D;
    if (R === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const A = 1 / R;
    return t[0] = b * A, t[1] = (_ * d * r - u * p * r - _ * s * f + n * p * f + u * s * m - n * d * m) * A, t[2] = (a * p * r - _ * c * r + _ * s * l - n * p * l - a * s * m + n * c * m) * A, t[3] = (u * c * r - a * d * r - u * s * l + n * d * l + a * s * f - n * c * f) * A, t[4] = y * A, t[5] = (h * p * r - g * d * r + g * s * f - e * p * f - h * s * m + e * d * m) * A, t[6] = (g * c * r - o * p * r - g * s * l + e * p * l + o * s * m - e * c * m) * A, t[7] = (o * d * r - h * c * r + h * s * l - e * d * l - o * s * f + e * c * f) * A, t[8] = S * A, t[9] = (g * u * r - h * _ * r - g * n * f + e * _ * f + h * n * m - e * u * m) * A, t[10] = (o * _ * r - g * a * r + g * n * l - e * _ * l - o * n * m + e * a * m) * A, t[11] = (h * a * r - o * u * r - h * n * l + e * u * l + o * n * f - e * a * f) * A, t[12] = D * A, t[13] = (h * _ * s - g * u * s + g * n * d - e * _ * d - h * n * p + e * u * p) * A, t[14] = (g * a * s - o * _ * s - g * n * c + e * _ * c + o * n * p - e * a * p) * A, t[15] = (o * u * s - h * a * s + h * n * c - e * u * c - o * n * d + e * a * d) * A, this;
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
    const s = this.elements, r = e._x, o = e._y, a = e._z, c = e._w, l = r + r, h = o + o, u = a + a, d = r * l, f = r * h, g = r * u, _ = o * h, p = o * u, m = a * u, b = c * l, y = c * h, S = c * u, D = n.x, R = n.y, A = n.z;
    return s[0] = (1 - (_ + m)) * D, s[1] = (f + S) * D, s[2] = (g - y) * D, s[3] = 0, s[4] = (f - S) * R, s[5] = (1 - (d + m)) * R, s[6] = (p + b) * R, s[7] = 0, s[8] = (g + y) * A, s[9] = (p - b) * A, s[10] = (1 - (d + _)) * A, s[11] = 0, s[12] = t.x, s[13] = t.y, s[14] = t.z, s[15] = 1, this;
  }
  decompose(t, e, n) {
    const s = this.elements;
    let r = bi.set(s[0], s[1], s[2]).length();
    const o = bi.set(s[4], s[5], s[6]).length(), a = bi.set(s[8], s[9], s[10]).length();
    this.determinant() < 0 && (r = -r), t.x = s[12], t.y = s[13], t.z = s[14], nn.copy(this);
    const l = 1 / r, h = 1 / o, u = 1 / a;
    return nn.elements[0] *= l, nn.elements[1] *= l, nn.elements[2] *= l, nn.elements[4] *= h, nn.elements[5] *= h, nn.elements[6] *= h, nn.elements[8] *= u, nn.elements[9] *= u, nn.elements[10] *= u, e.setFromRotationMatrix(nn), n.x = r, n.y = o, n.z = a, this;
  }
  makePerspective(t, e, n, s, r, o, a = Ln) {
    const c = this.elements, l = 2 * r / (e - t), h = 2 * r / (n - s), u = (e + t) / (e - t), d = (n + s) / (n - s);
    let f, g;
    if (a === Ln)
      f = -(o + r) / (o - r), g = -2 * o * r / (o - r);
    else if (a === Jr)
      f = -o / (o - r), g = -o * r / (o - r);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + a);
    return c[0] = l, c[4] = 0, c[8] = u, c[12] = 0, c[1] = 0, c[5] = h, c[9] = d, c[13] = 0, c[2] = 0, c[6] = 0, c[10] = f, c[14] = g, c[3] = 0, c[7] = 0, c[11] = -1, c[15] = 0, this;
  }
  makeOrthographic(t, e, n, s, r, o, a = Ln) {
    const c = this.elements, l = 1 / (e - t), h = 1 / (n - s), u = 1 / (o - r), d = (e + t) * l, f = (n + s) * h;
    let g, _;
    if (a === Ln)
      g = (o + r) * u, _ = -2 * u;
    else if (a === Jr)
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
const bi = /* @__PURE__ */ new w(), nn = /* @__PURE__ */ new Ct(), $f = /* @__PURE__ */ new w(0, 0, 0), qf = /* @__PURE__ */ new w(1, 1, 1), Bn = /* @__PURE__ */ new w(), or = /* @__PURE__ */ new w(), Ve = /* @__PURE__ */ new w(), ul = /* @__PURE__ */ new Ct(), dl = /* @__PURE__ */ new fn();
class pn {
  constructor(t = 0, e = 0, n = 0, s = pn.DEFAULT_ORDER) {
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
        this._y = Math.asin(ve(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(-h, f), this._z = Math.atan2(-o, r)) : (this._x = Math.atan2(d, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-ve(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(a, f), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-u, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(ve(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._y = Math.atan2(-u, f), this._z = Math.atan2(-o, l)) : (this._y = 0, this._z = Math.atan2(c, r));
        break;
      case "ZYX":
        this._y = Math.asin(-ve(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._x = Math.atan2(d, f), this._z = Math.atan2(c, r)) : (this._x = 0, this._z = Math.atan2(-o, l));
        break;
      case "YZX":
        this._z = Math.asin(ve(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-u, r)) : (this._x = 0, this._y = Math.atan2(a, f));
        break;
      case "XZY":
        this._z = Math.asin(-ve(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(d, l), this._y = Math.atan2(a, r)) : (this._x = Math.atan2(-h, f), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e);
    }
    return this._order = e, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(t, e, n) {
    return ul.makeRotationFromQuaternion(t), this.setFromRotationMatrix(ul, e, n);
  }
  setFromVector3(t, e = this._order) {
    return this.set(t.x, t.y, t.z, e);
  }
  reorder(t) {
    return dl.setFromEuler(this), this.setFromQuaternion(dl, t);
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
pn.DEFAULT_ORDER = "XYZ";
class fc {
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
let Yf = 0;
const fl = /* @__PURE__ */ new w(), Ti = /* @__PURE__ */ new fn(), Sn = /* @__PURE__ */ new Ct(), ar = /* @__PURE__ */ new w(), vs = /* @__PURE__ */ new w(), jf = /* @__PURE__ */ new w(), Kf = /* @__PURE__ */ new fn(), pl = /* @__PURE__ */ new w(1, 0, 0), ml = /* @__PURE__ */ new w(0, 1, 0), gl = /* @__PURE__ */ new w(0, 0, 1), _l = { type: "added" }, Zf = { type: "removed" }, Ai = { type: "childadded", child: null }, bo = { type: "childremoved", child: null };
class ce extends _i {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Yf++ }), this.uuid = Ze(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = ce.DEFAULT_UP.clone();
    const t = new w(), e = new pn(), n = new fn(), s = new w(1, 1, 1);
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
        value: new Ct()
      },
      normalMatrix: {
        value: new Dt()
      }
    }), this.matrix = new Ct(), this.matrixWorld = new Ct(), this.matrixAutoUpdate = ce.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new fc(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
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
    return Ti.setFromAxisAngle(t, e), this.quaternion.multiply(Ti), this;
  }
  rotateOnWorldAxis(t, e) {
    return Ti.setFromAxisAngle(t, e), this.quaternion.premultiply(Ti), this;
  }
  rotateX(t) {
    return this.rotateOnAxis(pl, t);
  }
  rotateY(t) {
    return this.rotateOnAxis(ml, t);
  }
  rotateZ(t) {
    return this.rotateOnAxis(gl, t);
  }
  translateOnAxis(t, e) {
    return fl.copy(t).applyQuaternion(this.quaternion), this.position.add(fl.multiplyScalar(e)), this;
  }
  translateX(t) {
    return this.translateOnAxis(pl, t);
  }
  translateY(t) {
    return this.translateOnAxis(ml, t);
  }
  translateZ(t) {
    return this.translateOnAxis(gl, t);
  }
  localToWorld(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(t) {
    return this.updateWorldMatrix(!0, !1), t.applyMatrix4(Sn.copy(this.matrixWorld).invert());
  }
  lookAt(t, e, n) {
    t.isVector3 ? ar.copy(t) : ar.set(t, e, n);
    const s = this.parent;
    this.updateWorldMatrix(!0, !1), vs.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Sn.lookAt(vs, ar, this.up) : Sn.lookAt(ar, vs, this.up), this.quaternion.setFromRotationMatrix(Sn), s && (Sn.extractRotation(s.matrixWorld), Ti.setFromRotationMatrix(Sn), this.quaternion.premultiply(Ti.invert()));
  }
  add(t) {
    if (arguments.length > 1) {
      for (let e = 0; e < arguments.length; e++)
        this.add(arguments[e]);
      return this;
    }
    return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent(_l), Ai.child = t, this.dispatchEvent(Ai), Ai.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this);
  }
  remove(t) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const e = this.children.indexOf(t);
    return e !== -1 && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(Zf), bo.child = t, this.dispatchEvent(bo), bo.child = null), this;
  }
  removeFromParent() {
    const t = this.parent;
    return t !== null && t.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(t) {
    return this.updateWorldMatrix(!0, !1), Sn.copy(this.matrixWorld).invert(), t.parent !== null && (t.parent.updateWorldMatrix(!0, !1), Sn.multiply(t.parent.matrixWorld)), t.applyMatrix4(Sn), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent(_l), Ai.child = t, this.dispatchEvent(Ai), Ai.child = null, this;
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
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(vs, t, jf), t;
  }
  getWorldScale(t) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(vs, Kf, t), t;
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
ce.DEFAULT_UP = /* @__PURE__ */ new w(0, 1, 0);
ce.DEFAULT_MATRIX_AUTO_UPDATE = !0;
ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const sn = /* @__PURE__ */ new w(), En = /* @__PURE__ */ new w(), To = /* @__PURE__ */ new w(), bn = /* @__PURE__ */ new w(), wi = /* @__PURE__ */ new w(), Ri = /* @__PURE__ */ new w(), vl = /* @__PURE__ */ new w(), Ao = /* @__PURE__ */ new w(), wo = /* @__PURE__ */ new w(), Ro = /* @__PURE__ */ new w(), Co = /* @__PURE__ */ new qt(), Po = /* @__PURE__ */ new qt(), Lo = /* @__PURE__ */ new qt();
class je {
  constructor(t = new w(), e = new w(), n = new w()) {
    this.a = t, this.b = e, this.c = n;
  }
  static getNormal(t, e, n, s) {
    s.subVectors(n, e), sn.subVectors(t, e), s.cross(sn);
    const r = s.lengthSq();
    return r > 0 ? s.multiplyScalar(1 / Math.sqrt(r)) : s.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(t, e, n, s, r) {
    sn.subVectors(s, e), En.subVectors(n, e), To.subVectors(t, e);
    const o = sn.dot(sn), a = sn.dot(En), c = sn.dot(To), l = En.dot(En), h = En.dot(To), u = o * l - a * a;
    if (u === 0)
      return r.set(0, 0, 0), null;
    const d = 1 / u, f = (l * c - a * h) * d, g = (o * h - a * c) * d;
    return r.set(1 - f - g, g, f);
  }
  static containsPoint(t, e, n, s) {
    return this.getBarycoord(t, e, n, s, bn) === null ? !1 : bn.x >= 0 && bn.y >= 0 && bn.x + bn.y <= 1;
  }
  static getInterpolation(t, e, n, s, r, o, a, c) {
    return this.getBarycoord(t, e, n, s, bn) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(r, bn.x), c.addScaledVector(o, bn.y), c.addScaledVector(a, bn.z), c);
  }
  static getInterpolatedAttribute(t, e, n, s, r, o) {
    return Co.setScalar(0), Po.setScalar(0), Lo.setScalar(0), Co.fromBufferAttribute(t, e), Po.fromBufferAttribute(t, n), Lo.fromBufferAttribute(t, s), o.setScalar(0), o.addScaledVector(Co, r.x), o.addScaledVector(Po, r.y), o.addScaledVector(Lo, r.z), o;
  }
  static isFrontFacing(t, e, n, s) {
    return sn.subVectors(n, e), En.subVectors(t, e), sn.cross(En).dot(s) < 0;
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
    return sn.subVectors(this.c, this.b), En.subVectors(this.a, this.b), sn.cross(En).length() * 0.5;
  }
  getMidpoint(t) {
    return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(t) {
    return je.getNormal(this.a, this.b, this.c, t);
  }
  getPlane(t) {
    return t.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(t, e) {
    return je.getBarycoord(t, this.a, this.b, this.c, e);
  }
  getInterpolation(t, e, n, s, r) {
    return je.getInterpolation(t, this.a, this.b, this.c, e, n, s, r);
  }
  containsPoint(t) {
    return je.containsPoint(t, this.a, this.b, this.c);
  }
  isFrontFacing(t) {
    return je.isFrontFacing(this.a, this.b, this.c, t);
  }
  intersectsBox(t) {
    return t.intersectsTriangle(this);
  }
  closestPointToPoint(t, e) {
    const n = this.a, s = this.b, r = this.c;
    let o, a;
    wi.subVectors(s, n), Ri.subVectors(r, n), Ao.subVectors(t, n);
    const c = wi.dot(Ao), l = Ri.dot(Ao);
    if (c <= 0 && l <= 0)
      return e.copy(n);
    wo.subVectors(t, s);
    const h = wi.dot(wo), u = Ri.dot(wo);
    if (h >= 0 && u <= h)
      return e.copy(s);
    const d = c * u - h * l;
    if (d <= 0 && c >= 0 && h <= 0)
      return o = c / (c - h), e.copy(n).addScaledVector(wi, o);
    Ro.subVectors(t, r);
    const f = wi.dot(Ro), g = Ri.dot(Ro);
    if (g >= 0 && f <= g)
      return e.copy(r);
    const _ = f * l - c * g;
    if (_ <= 0 && l >= 0 && g <= 0)
      return a = l / (l - g), e.copy(n).addScaledVector(Ri, a);
    const p = h * g - f * u;
    if (p <= 0 && u - h >= 0 && f - g >= 0)
      return vl.subVectors(r, s), a = (u - h) / (u - h + (f - g)), e.copy(s).addScaledVector(vl, a);
    const m = 1 / (p + _ + d);
    return o = _ * m, a = d * m, e.copy(n).addScaledVector(wi, o).addScaledVector(Ri, a);
  }
  equals(t) {
    return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c);
  }
}
const fu = {
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
}, kn = { h: 0, s: 0, l: 0 }, cr = { h: 0, s: 0, l: 0 };
function Io(i, t, e) {
  return e < 0 && (e += 1), e > 1 && (e -= 1), e < 1 / 6 ? i + (t - i) * 6 * e : e < 1 / 2 ? t : e < 2 / 3 ? i + (t - i) * 6 * (2 / 3 - e) : i;
}
class Mt {
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
  setHex(t, e = Pe) {
    return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (t & 255) / 255, Wt.toWorkingColorSpace(this, e), this;
  }
  setRGB(t, e, n, s = Wt.workingColorSpace) {
    return this.r = t, this.g = e, this.b = n, Wt.toWorkingColorSpace(this, s), this;
  }
  setHSL(t, e, n, s = Wt.workingColorSpace) {
    if (t = dc(t, 1), e = ve(e, 0, 1), n = ve(n, 0, 1), e === 0)
      this.r = this.g = this.b = n;
    else {
      const r = n <= 0.5 ? n * (1 + e) : n + e - n * e, o = 2 * n - r;
      this.r = Io(o, r, t + 1 / 3), this.g = Io(o, r, t), this.b = Io(o, r, t - 1 / 3);
    }
    return Wt.toWorkingColorSpace(this, s), this;
  }
  setStyle(t, e = Pe) {
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
  setColorName(t, e = Pe) {
    const n = fu[t.toLowerCase()];
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
    return this.r = go(t.r), this.g = go(t.g), this.b = go(t.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(t = Pe) {
    return Wt.fromWorkingColorSpace(Ae.copy(this), t), Math.round(ve(Ae.r * 255, 0, 255)) * 65536 + Math.round(ve(Ae.g * 255, 0, 255)) * 256 + Math.round(ve(Ae.b * 255, 0, 255));
  }
  getHexString(t = Pe) {
    return ("000000" + this.getHex(t).toString(16)).slice(-6);
  }
  getHSL(t, e = Wt.workingColorSpace) {
    Wt.fromWorkingColorSpace(Ae.copy(this), e);
    const n = Ae.r, s = Ae.g, r = Ae.b, o = Math.max(n, s, r), a = Math.min(n, s, r);
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
  getRGB(t, e = Wt.workingColorSpace) {
    return Wt.fromWorkingColorSpace(Ae.copy(this), e), t.r = Ae.r, t.g = Ae.g, t.b = Ae.b, t;
  }
  getStyle(t = Pe) {
    Wt.fromWorkingColorSpace(Ae.copy(this), t);
    const e = Ae.r, n = Ae.g, s = Ae.b;
    return t !== Pe ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})` : `rgb(${Math.round(e * 255)},${Math.round(n * 255)},${Math.round(s * 255)})`;
  }
  offsetHSL(t, e, n) {
    return this.getHSL(kn), this.setHSL(kn.h + t, kn.s + e, kn.l + n);
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
    this.getHSL(kn), t.getHSL(cr);
    const n = Is(kn.h, cr.h, e), s = Is(kn.s, cr.s, e), r = Is(kn.l, cr.l, e);
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
const Ae = /* @__PURE__ */ new Mt();
Mt.NAMES = fu;
let Jf = 0;
class ln extends _i {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Jf++ }), this.uuid = Ze(), this.name = "", this.type = "Material", this.blending = Wi, this.side = In, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = na, this.blendDst = ia, this.blendEquation = hi, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Mt(0, 0, 0), this.blendAlpha = 0, this.depthFunc = Zi, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = sl, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = xi, this.stencilZFail = xi, this.stencilZPass = xi, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
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
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== Wi && (n.blending = this.blending), this.side !== In && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== na && (n.blendSrc = this.blendSrc), this.blendDst !== ia && (n.blendDst = this.blendDst), this.blendEquation !== hi && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== Zi && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== sl && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== xi && (n.stencilFail = this.stencilFail), this.stencilZFail !== xi && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== xi && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
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
class dn extends ln {
  constructor(t) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Mt(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new pn(), this.combine = jh, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this;
  }
}
const me = /* @__PURE__ */ new w(), lr = /* @__PURE__ */ new et();
class De {
  constructor(t, e, n = !1) {
    if (Array.isArray(t))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = t, this.itemSize = e, this.count = t !== void 0 ? t.length / e : 0, this.normalized = n, this.usage = za, this.updateRanges = [], this.gpuType = cn, this.version = 0;
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
        lr.fromBufferAttribute(this, e), lr.applyMatrix3(t), this.setXY(e, lr.x, lr.y);
    else if (this.itemSize === 3)
      for (let e = 0, n = this.count; e < n; e++)
        me.fromBufferAttribute(this, e), me.applyMatrix3(t), this.setXYZ(e, me.x, me.y, me.z);
    return this;
  }
  applyMatrix4(t) {
    for (let e = 0, n = this.count; e < n; e++)
      me.fromBufferAttribute(this, e), me.applyMatrix4(t), this.setXYZ(e, me.x, me.y, me.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++)
      me.fromBufferAttribute(this, e), me.applyNormalMatrix(t), this.setXYZ(e, me.x, me.y, me.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++)
      me.fromBufferAttribute(this, e), me.transformDirection(t), this.setXYZ(e, me.x, me.y, me.z);
    return this;
  }
  set(t, e = 0) {
    return this.array.set(t, e), this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.itemSize + e];
    return this.normalized && (n = an(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = Jt(n, this.array)), this.array[t * this.itemSize + e] = n, this;
  }
  getX(t) {
    let e = this.array[t * this.itemSize];
    return this.normalized && (e = an(e, this.array)), e;
  }
  setX(t, e) {
    return this.normalized && (e = Jt(e, this.array)), this.array[t * this.itemSize] = e, this;
  }
  getY(t) {
    let e = this.array[t * this.itemSize + 1];
    return this.normalized && (e = an(e, this.array)), e;
  }
  setY(t, e) {
    return this.normalized && (e = Jt(e, this.array)), this.array[t * this.itemSize + 1] = e, this;
  }
  getZ(t) {
    let e = this.array[t * this.itemSize + 2];
    return this.normalized && (e = an(e, this.array)), e;
  }
  setZ(t, e) {
    return this.normalized && (e = Jt(e, this.array)), this.array[t * this.itemSize + 2] = e, this;
  }
  getW(t) {
    let e = this.array[t * this.itemSize + 3];
    return this.normalized && (e = an(e, this.array)), e;
  }
  setW(t, e) {
    return this.normalized && (e = Jt(e, this.array)), this.array[t * this.itemSize + 3] = e, this;
  }
  setXY(t, e, n) {
    return t *= this.itemSize, this.normalized && (e = Jt(e, this.array), n = Jt(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, s) {
    return t *= this.itemSize, this.normalized && (e = Jt(e, this.array), n = Jt(n, this.array), s = Jt(s, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this;
  }
  setXYZW(t, e, n, s, r) {
    return t *= this.itemSize, this.normalized && (e = Jt(e, this.array), n = Jt(n, this.array), s = Jt(s, this.array), r = Jt(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = s, this.array[t + 3] = r, this;
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
    return this.name !== "" && (t.name = this.name), this.usage !== za && (t.usage = this.usage), t;
  }
}
class pu extends De {
  constructor(t, e, n) {
    super(new Uint16Array(t), e, n);
  }
}
class mu extends De {
  constructor(t, e, n) {
    super(new Uint32Array(t), e, n);
  }
}
class he extends De {
  constructor(t, e, n) {
    super(new Float32Array(t), e, n);
  }
}
let Qf = 0;
const $e = /* @__PURE__ */ new Ct(), Do = /* @__PURE__ */ new ce(), Ci = /* @__PURE__ */ new w(), Ge = /* @__PURE__ */ new hn(), xs = /* @__PURE__ */ new hn(), Se = /* @__PURE__ */ new w();
class we extends _i {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Qf++ }), this.uuid = Ze(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(t) {
    return Array.isArray(t) ? this.index = new (hu(t) ? mu : pu)(t, 1) : this.index = t, this;
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
      const r = new Dt().getNormalMatrix(t);
      n.applyNormalMatrix(r), n.needsUpdate = !0;
    }
    const s = this.attributes.tangent;
    return s !== void 0 && (s.transformDirection(t), s.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(t) {
    return $e.makeRotationFromQuaternion(t), this.applyMatrix4($e), this;
  }
  rotateX(t) {
    return $e.makeRotationX(t), this.applyMatrix4($e), this;
  }
  rotateY(t) {
    return $e.makeRotationY(t), this.applyMatrix4($e), this;
  }
  rotateZ(t) {
    return $e.makeRotationZ(t), this.applyMatrix4($e), this;
  }
  translate(t, e, n) {
    return $e.makeTranslation(t, e, n), this.applyMatrix4($e), this;
  }
  scale(t, e, n) {
    return $e.makeScale(t, e, n), this.applyMatrix4($e), this;
  }
  lookAt(t) {
    return Do.lookAt(t), Do.updateMatrix(), this.applyMatrix4(Do.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(Ci).negate(), this.translate(Ci.x, Ci.y, Ci.z), this;
  }
  setFromPoints(t) {
    const e = [];
    for (let n = 0, s = t.length; n < s; n++) {
      const r = t[n];
      e.push(r.x, r.y, r.z || 0);
    }
    return this.setAttribute("position", new he(e, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new hn());
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
          Ge.setFromBufferAttribute(r), this.morphTargetsRelative ? (Se.addVectors(this.boundingBox.min, Ge.min), this.boundingBox.expandByPoint(Se), Se.addVectors(this.boundingBox.max, Ge.max), this.boundingBox.expandByPoint(Se)) : (this.boundingBox.expandByPoint(Ge.min), this.boundingBox.expandByPoint(Ge.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new mn());
    const t = this.attributes.position, e = this.morphAttributes.position;
    if (t && t.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new w(), 1 / 0);
      return;
    }
    if (t) {
      const n = this.boundingSphere.center;
      if (Ge.setFromBufferAttribute(t), e)
        for (let r = 0, o = e.length; r < o; r++) {
          const a = e[r];
          xs.setFromBufferAttribute(a), this.morphTargetsRelative ? (Se.addVectors(Ge.min, xs.min), Ge.expandByPoint(Se), Se.addVectors(Ge.max, xs.max), Ge.expandByPoint(Se)) : (Ge.expandByPoint(xs.min), Ge.expandByPoint(xs.max));
        }
      Ge.getCenter(n);
      let s = 0;
      for (let r = 0, o = t.count; r < o; r++)
        Se.fromBufferAttribute(t, r), s = Math.max(s, n.distanceToSquared(Se));
      if (e)
        for (let r = 0, o = e.length; r < o; r++) {
          const a = e[r], c = this.morphTargetsRelative;
          for (let l = 0, h = a.count; l < h; l++)
            Se.fromBufferAttribute(a, l), c && (Ci.fromBufferAttribute(t, l), Se.add(Ci)), s = Math.max(s, n.distanceToSquared(Se));
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
    const o = this.getAttribute("tangent"), a = [], c = [];
    for (let N = 0; N < n.count; N++)
      a[N] = new w(), c[N] = new w();
    const l = new w(), h = new w(), u = new w(), d = new et(), f = new et(), g = new et(), _ = new w(), p = new w();
    function m(N, Y, v) {
      l.fromBufferAttribute(n, N), h.fromBufferAttribute(n, Y), u.fromBufferAttribute(n, v), d.fromBufferAttribute(r, N), f.fromBufferAttribute(r, Y), g.fromBufferAttribute(r, v), h.sub(l), u.sub(l), f.sub(d), g.sub(d);
      const E = 1 / (f.x * g.y - g.x * f.y);
      isFinite(E) && (_.copy(h).multiplyScalar(g.y).addScaledVector(u, -f.y).multiplyScalar(E), p.copy(u).multiplyScalar(f.x).addScaledVector(h, -g.x).multiplyScalar(E), a[N].add(_), a[Y].add(_), a[v].add(_), c[N].add(p), c[Y].add(p), c[v].add(p));
    }
    let b = this.groups;
    b.length === 0 && (b = [{
      start: 0,
      count: t.count
    }]);
    for (let N = 0, Y = b.length; N < Y; ++N) {
      const v = b[N], E = v.start, k = v.count;
      for (let B = E, H = E + k; B < H; B += 3)
        m(
          t.getX(B + 0),
          t.getX(B + 1),
          t.getX(B + 2)
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
    for (let N = 0, Y = b.length; N < Y; ++N) {
      const v = b[N], E = v.start, k = v.count;
      for (let B = E, H = E + k; B < H; B += 3)
        A(t.getX(B + 0)), A(t.getX(B + 1)), A(t.getX(B + 2));
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
      Se.fromBufferAttribute(t, e), Se.normalize(), t.setXYZ(e, Se.x, Se.y, Se.z);
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
      return new De(d, h, u);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const e = new we(), n = this.index.array, s = this.attributes;
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
const xl = /* @__PURE__ */ new Ct(), ii = /* @__PURE__ */ new cs(), hr = /* @__PURE__ */ new mn(), yl = /* @__PURE__ */ new w(), ur = /* @__PURE__ */ new w(), dr = /* @__PURE__ */ new w(), fr = /* @__PURE__ */ new w(), No = /* @__PURE__ */ new w(), pr = /* @__PURE__ */ new w(), Ml = /* @__PURE__ */ new w(), mr = /* @__PURE__ */ new w();
class ge extends ce {
  constructor(t = new we(), e = new dn()) {
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
      pr.set(0, 0, 0);
      for (let c = 0, l = r.length; c < l; c++) {
        const h = a[c], u = r[c];
        h !== 0 && (No.fromBufferAttribute(u, t), o ? pr.addScaledVector(No, h) : pr.addScaledVector(No.sub(e), h));
      }
      e.add(pr);
    }
    return e;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.material, r = this.matrixWorld;
    s !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), hr.copy(n.boundingSphere), hr.applyMatrix4(r), ii.copy(t.ray).recast(t.near), !(hr.containsPoint(ii.origin) === !1 && (ii.intersectSphere(hr, yl) === null || ii.origin.distanceToSquared(yl) > (t.far - t.near) ** 2)) && (xl.copy(r).invert(), ii.copy(t.ray).applyMatrix4(xl), !(n.boundingBox !== null && ii.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(t, e, ii)));
  }
  _computeIntersections(t, e, n) {
    let s;
    const r = this.geometry, o = this.material, a = r.index, c = r.attributes.position, l = r.attributes.uv, h = r.attributes.uv1, u = r.attributes.normal, d = r.groups, f = r.drawRange;
    if (a !== null)
      if (Array.isArray(o))
        for (let g = 0, _ = d.length; g < _; g++) {
          const p = d[g], m = o[p.materialIndex], b = Math.max(p.start, f.start), y = Math.min(a.count, Math.min(p.start + p.count, f.start + f.count));
          for (let S = b, D = y; S < D; S += 3) {
            const R = a.getX(S), A = a.getX(S + 1), N = a.getX(S + 2);
            s = gr(this, m, t, n, l, h, u, R, A, N), s && (s.faceIndex = Math.floor(S / 3), s.face.materialIndex = p.materialIndex, e.push(s));
          }
        }
      else {
        const g = Math.max(0, f.start), _ = Math.min(a.count, f.start + f.count);
        for (let p = g, m = _; p < m; p += 3) {
          const b = a.getX(p), y = a.getX(p + 1), S = a.getX(p + 2);
          s = gr(this, o, t, n, l, h, u, b, y, S), s && (s.faceIndex = Math.floor(p / 3), e.push(s));
        }
      }
    else if (c !== void 0)
      if (Array.isArray(o))
        for (let g = 0, _ = d.length; g < _; g++) {
          const p = d[g], m = o[p.materialIndex], b = Math.max(p.start, f.start), y = Math.min(c.count, Math.min(p.start + p.count, f.start + f.count));
          for (let S = b, D = y; S < D; S += 3) {
            const R = S, A = S + 1, N = S + 2;
            s = gr(this, m, t, n, l, h, u, R, A, N), s && (s.faceIndex = Math.floor(S / 3), s.face.materialIndex = p.materialIndex, e.push(s));
          }
        }
      else {
        const g = Math.max(0, f.start), _ = Math.min(c.count, f.start + f.count);
        for (let p = g, m = _; p < m; p += 3) {
          const b = p, y = p + 1, S = p + 2;
          s = gr(this, o, t, n, l, h, u, b, y, S), s && (s.faceIndex = Math.floor(p / 3), e.push(s));
        }
      }
  }
}
function tp(i, t, e, n, s, r, o, a) {
  let c;
  if (t.side === Fe ? c = n.intersectTriangle(o, r, s, !0, a) : c = n.intersectTriangle(s, r, o, t.side === In, a), c === null) return null;
  mr.copy(a), mr.applyMatrix4(i.matrixWorld);
  const l = e.ray.origin.distanceTo(mr);
  return l < e.near || l > e.far ? null : {
    distance: l,
    point: mr.clone(),
    object: i
  };
}
function gr(i, t, e, n, s, r, o, a, c, l) {
  i.getVertexPosition(a, ur), i.getVertexPosition(c, dr), i.getVertexPosition(l, fr);
  const h = tp(i, t, e, n, ur, dr, fr, Ml);
  if (h) {
    const u = new w();
    je.getBarycoord(Ml, ur, dr, fr, u), s && (h.uv = je.getInterpolatedAttribute(s, a, c, l, u, new et())), r && (h.uv1 = je.getInterpolatedAttribute(r, a, c, l, u, new et())), o && (h.normal = je.getInterpolatedAttribute(o, a, c, l, u, new w()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = {
      a,
      b: c,
      c: l,
      normal: new w(),
      materialIndex: 0
    };
    je.getNormal(ur, dr, fr, d.normal), h.face = d, h.barycoord = u;
  }
  return h;
}
class Jn extends we {
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
    g("z", "y", "x", -1, -1, n, e, t, o, r, 0), g("z", "y", "x", 1, -1, n, e, -t, o, r, 1), g("x", "z", "y", 1, 1, t, n, e, s, o, 2), g("x", "z", "y", 1, -1, t, n, -e, s, o, 3), g("x", "y", "z", 1, -1, t, e, n, s, r, 4), g("x", "y", "z", -1, -1, t, e, -n, s, r, 5), this.setIndex(c), this.setAttribute("position", new he(l, 3)), this.setAttribute("normal", new he(h, 3)), this.setAttribute("uv", new he(u, 2));
    function g(_, p, m, b, y, S, D, R, A, N, Y) {
      const v = S / A, E = D / N, k = S / 2, B = D / 2, H = R / 2, j = A + 1, z = N + 1;
      let Q = 0, G = 0;
      const ct = new w();
      for (let lt = 0; lt < z; lt++) {
        const _t = lt * E - B;
        for (let Xt = 0; Xt < j; Xt++) {
          const Kt = Xt * v - k;
          ct[_] = Kt * b, ct[p] = _t * y, ct[m] = H, l.push(ct.x, ct.y, ct.z), ct[_] = 0, ct[p] = 0, ct[m] = R > 0 ? 1 : -1, h.push(ct.x, ct.y, ct.z), u.push(Xt / A), u.push(1 - lt / N), Q += 1;
        }
      }
      for (let lt = 0; lt < N; lt++)
        for (let _t = 0; _t < A; _t++) {
          const Xt = d + _t + j * lt, Kt = d + _t + j * (lt + 1), W = d + (_t + 1) + j * (lt + 1), Z = d + (_t + 1) + j * lt;
          c.push(Xt, Kt, Z), c.push(Kt, W, Z), G += 6;
        }
      a.addGroup(f, G, Y), f += G, d += Q;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Jn(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments);
  }
}
function ss(i) {
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
function Ce(i) {
  const t = {};
  for (let e = 0; e < i.length; e++) {
    const n = ss(i[e]);
    for (const s in n)
      t[s] = n[s];
  }
  return t;
}
function ep(i) {
  const t = [];
  for (let e = 0; e < i.length; e++)
    t.push(i[e].clone());
  return t;
}
function gu(i) {
  const t = i.getRenderTarget();
  return t === null ? i.outputColorSpace : t.isXRRenderTarget === !0 ? t.texture.colorSpace : Wt.workingColorSpace;
}
const np = { clone: ss, merge: Ce };
var ip = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, sp = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Kn extends ln {
  constructor(t) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = ip, this.fragmentShader = sp, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
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
    return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = ss(t.uniforms), this.uniformsGroups = ep(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this;
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
class _u extends ce {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Ct(), this.projectionMatrix = new Ct(), this.projectionMatrixInverse = new Ct(), this.coordinateSystem = Ln;
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
const zn = /* @__PURE__ */ new w(), Sl = /* @__PURE__ */ new et(), El = /* @__PURE__ */ new et();
class Le extends _u {
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
    this.fov = is * 2 * Math.atan(e), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const t = Math.tan(Ls * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / t;
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
  getViewBounds(t, e, n) {
    zn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), e.set(zn.x, zn.y).multiplyScalar(-t / zn.z), zn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(zn.x, zn.y).multiplyScalar(-t / zn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   * Copies the result into the target Vector2, where x is width and y is height.
   */
  getViewSize(t, e) {
    return this.getViewBounds(t, Sl, El), e.subVectors(El, Sl);
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
    let e = t * Math.tan(Ls * 0.5 * this.fov) / this.zoom, n = 2 * e, s = this.aspect * n, r = -0.5 * s;
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
const Pi = -90, Li = 1;
class rp extends ce {
  constructor(t, e, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const s = new Le(Pi, Li, t, e);
    s.layers = this.layers, this.add(s);
    const r = new Le(Pi, Li, t, e);
    r.layers = this.layers, this.add(r);
    const o = new Le(Pi, Li, t, e);
    o.layers = this.layers, this.add(o);
    const a = new Le(Pi, Li, t, e);
    a.layers = this.layers, this.add(a);
    const c = new Le(Pi, Li, t, e);
    c.layers = this.layers, this.add(c);
    const l = new Le(Pi, Li, t, e);
    l.layers = this.layers, this.add(l);
  }
  updateCoordinateSystem() {
    const t = this.coordinateSystem, e = this.children.concat(), [n, s, r, o, a, c] = e;
    for (const l of e) this.remove(l);
    if (t === Ln)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), s.up.set(0, 1, 0), s.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), o.up.set(0, 0, 1), o.lookAt(0, -1, 0), a.up.set(0, 1, 0), a.lookAt(0, 0, 1), c.up.set(0, 1, 0), c.lookAt(0, 0, -1);
    else if (t === Jr)
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
class vu extends xe {
  constructor(t, e, n, s, r, o, a, c, l, h) {
    t = t !== void 0 ? t : [], e = e !== void 0 ? e : Ji, super(t, e, n, s, r, o, a, c, l, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(t) {
    this.image = t;
  }
}
class op extends mi {
  constructor(t = 1, e = {}) {
    super(t, t, e), this.isWebGLCubeRenderTarget = !0;
    const n = { width: t, height: t, depth: 1 }, s = [n, n, n, n, n, n];
    this.texture = new vu(s, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = e.generateMipmaps !== void 0 ? e.generateMipmaps : !1, this.texture.minFilter = e.minFilter !== void 0 ? e.minFilter : We;
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
    }, s = new Jn(5, 5, 5), r = new Kn({
      name: "CubemapFromEquirect",
      uniforms: ss(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: Fe,
      blending: Yn
    });
    r.uniforms.tEquirect.value = e;
    const o = new ge(s, r), a = e.minFilter;
    return e.minFilter === Pn && (e.minFilter = We), new rp(1, 10, this).update(t, o), e.minFilter = a, o.geometry.dispose(), o.material.dispose(), this;
  }
  clear(t, e, n, s) {
    const r = t.getRenderTarget();
    for (let o = 0; o < 6; o++)
      t.setRenderTarget(this, o), t.clear(e, n, s);
    t.setRenderTarget(r);
  }
}
const Uo = /* @__PURE__ */ new w(), ap = /* @__PURE__ */ new w(), cp = /* @__PURE__ */ new Dt();
class Cn {
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
    const s = Uo.subVectors(n, e).cross(ap.subVectors(t, e)).normalize();
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
    const n = t.delta(Uo), s = this.normal.dot(n);
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
    const n = e || cp.getNormalMatrix(t), s = this.coplanarPoint(Uo).applyMatrix4(t), r = this.normal.applyMatrix3(n).normalize();
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
const si = /* @__PURE__ */ new mn(), _r = /* @__PURE__ */ new w();
class pc {
  constructor(t = new Cn(), e = new Cn(), n = new Cn(), s = new Cn(), r = new Cn(), o = new Cn()) {
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
  setFromProjectionMatrix(t, e = Ln) {
    const n = this.planes, s = t.elements, r = s[0], o = s[1], a = s[2], c = s[3], l = s[4], h = s[5], u = s[6], d = s[7], f = s[8], g = s[9], _ = s[10], p = s[11], m = s[12], b = s[13], y = s[14], S = s[15];
    if (n[0].setComponents(c - r, d - l, p - f, S - m).normalize(), n[1].setComponents(c + r, d + l, p + f, S + m).normalize(), n[2].setComponents(c + o, d + h, p + g, S + b).normalize(), n[3].setComponents(c - o, d - h, p - g, S - b).normalize(), n[4].setComponents(c - a, d - u, p - _, S - y).normalize(), e === Ln)
      n[5].setComponents(c + a, d + u, p + _, S + y).normalize();
    else if (e === Jr)
      n[5].setComponents(a, u, _, y).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
    return this;
  }
  intersectsObject(t) {
    if (t.boundingSphere !== void 0)
      t.boundingSphere === null && t.computeBoundingSphere(), si.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
    else {
      const e = t.geometry;
      e.boundingSphere === null && e.computeBoundingSphere(), si.copy(e.boundingSphere).applyMatrix4(t.matrixWorld);
    }
    return this.intersectsSphere(si);
  }
  intersectsSprite(t) {
    return si.center.set(0, 0, 0), si.radius = 0.7071067811865476, si.applyMatrix4(t.matrixWorld), this.intersectsSphere(si);
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
      if (_r.x = s.normal.x > 0 ? t.max.x : t.min.x, _r.y = s.normal.y > 0 ? t.max.y : t.min.y, _r.z = s.normal.z > 0 ? t.max.z : t.min.z, s.distanceToPoint(_r) < 0)
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
function xu() {
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
function lp(i) {
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
class ro extends we {
  constructor(t = 1, e = 1, n = 1, s = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: t,
      height: e,
      widthSegments: n,
      heightSegments: s
    };
    const r = t / 2, o = e / 2, a = Math.floor(n), c = Math.floor(s), l = a + 1, h = c + 1, u = t / a, d = e / c, f = [], g = [], _ = [], p = [];
    for (let m = 0; m < h; m++) {
      const b = m * d - o;
      for (let y = 0; y < l; y++) {
        const S = y * u - r;
        g.push(S, -b, 0), _.push(0, 0, 1), p.push(y / a), p.push(1 - m / c);
      }
    }
    for (let m = 0; m < c; m++)
      for (let b = 0; b < a; b++) {
        const y = b + l * m, S = b + l * (m + 1), D = b + 1 + l * (m + 1), R = b + 1 + l * m;
        f.push(y, S, R), f.push(S, D, R);
      }
    this.setIndex(f), this.setAttribute("position", new he(g, 3)), this.setAttribute("normal", new he(_, 3)), this.setAttribute("uv", new he(p, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new ro(t.width, t.height, t.widthSegments, t.heightSegments);
  }
}
var hp = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, up = `#ifdef USE_ALPHAHASH
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
#endif`, dp = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, fp = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, pp = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, mp = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, gp = `#ifdef USE_AOMAP
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
#endif`, _p = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, vp = `#ifdef USE_BATCHING
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
#endif`, xp = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, yp = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Mp = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, Sp = `float G_BlinnPhong_Implicit( ) {
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
} // validated`, Ep = `#ifdef USE_IRIDESCENCE
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
#endif`, bp = `#ifdef USE_BUMPMAP
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
#endif`, Tp = `#if NUM_CLIPPING_PLANES > 0
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
#endif`, Ap = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, wp = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Rp = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Cp = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, Pp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, Lp = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`, Ip = `#if defined( USE_COLOR_ALPHA )
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
#endif`, Dp = `#define PI 3.141592653589793
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
} // validated`, Np = `#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`, Up = `vec3 transformedNormal = objectNormal;
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
#endif`, Op = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Fp = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Bp = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, kp = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, zp = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Hp = `
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
}`, Vp = `#ifdef USE_ENVMAP
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
#endif`, Gp = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Wp = `#ifdef USE_ENVMAP
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
#endif`, Xp = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, $p = `#ifdef USE_ENVMAP
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
#endif`, qp = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Yp = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, jp = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Kp = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Zp = `#ifdef USE_GRADIENTMAP
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
}`, Jp = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Qp = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, tm = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, em = `uniform bool receiveShadow;
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
#endif`, nm = `#ifdef USE_ENVMAP
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
#endif`, im = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, sm = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, rm = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, om = `varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, am = `PhysicalMaterial material;
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
#endif`, cm = `struct PhysicalMaterial {
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
}`, lm = `
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
#endif`, hm = `#if defined( RE_IndirectDiffuse )
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
#endif`, um = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, dm = `#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, fm = `#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, pm = `#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, mm = `#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, gm = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, _m = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, vm = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`, xm = `#if defined( USE_POINTS_UV )
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
#endif`, ym = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, Mm = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Sm = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Em = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, bm = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Tm = `#ifdef USE_MORPHTARGETS
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
#endif`, Am = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, wm = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`, Rm = `#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`, Cm = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Pm = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Lm = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, Im = `#ifdef USE_NORMALMAP
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
#endif`, Dm = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Nm = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Um = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Om = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Fm = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Bm = `vec3 packNormalToRGB( const in vec3 normal ) {
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
}`, km = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, zm = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Hm = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Vm = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Gm = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Wm = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Xm = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, $m = `#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`, qm = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`, Ym = `float getShadowMask() {
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
}`, jm = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Km = `#ifdef USE_SKINNING
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
#endif`, Zm = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Jm = `#ifdef USE_SKINNING
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
#endif`, Qm = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, tg = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, eg = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, ng = `#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`, ig = `#ifdef USE_TRANSMISSION
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
#endif`, sg = `#ifdef USE_TRANSMISSION
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
#endif`, rg = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, og = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, ag = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`, cg = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const lg = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, hg = `uniform sampler2D t2D;
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
}`, ug = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, dg = `#ifdef ENVMAP_TYPE_CUBE
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
}`, fg = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, pg = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, mg = `#include <common>
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
}`, gg = `#if DEPTH_PACKING == 3200
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
}`, _g = `#define DISTANCE
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
}`, vg = `#define DISTANCE
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
}`, xg = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, yg = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Mg = `uniform float scale;
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
}`, Sg = `uniform vec3 diffuse;
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
}`, Eg = `#include <common>
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
}`, bg = `uniform vec3 diffuse;
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
}`, Tg = `#define LAMBERT
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
}`, Ag = `#define LAMBERT
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
}`, wg = `#define MATCAP
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
}`, Rg = `#define MATCAP
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
}`, Cg = `#define NORMAL
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
}`, Pg = `#define NORMAL
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
}`, Lg = `#define PHONG
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
}`, Ig = `#define PHONG
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
}`, Dg = `#define STANDARD
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
}`, Ng = `#define STANDARD
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
}`, Ug = `#define TOON
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
}`, Og = `#define TOON
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
}`, Fg = `uniform float size;
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
}`, Bg = `uniform vec3 diffuse;
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
}`, kg = `#include <common>
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
}`, zg = `uniform vec3 color;
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
}`, Hg = `uniform float rotation;
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
}`, Vg = `uniform vec3 diffuse;
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
}`, It = {
  alphahash_fragment: hp,
  alphahash_pars_fragment: up,
  alphamap_fragment: dp,
  alphamap_pars_fragment: fp,
  alphatest_fragment: pp,
  alphatest_pars_fragment: mp,
  aomap_fragment: gp,
  aomap_pars_fragment: _p,
  batching_pars_vertex: vp,
  batching_vertex: xp,
  begin_vertex: yp,
  beginnormal_vertex: Mp,
  bsdfs: Sp,
  iridescence_fragment: Ep,
  bumpmap_pars_fragment: bp,
  clipping_planes_fragment: Tp,
  clipping_planes_pars_fragment: Ap,
  clipping_planes_pars_vertex: wp,
  clipping_planes_vertex: Rp,
  color_fragment: Cp,
  color_pars_fragment: Pp,
  color_pars_vertex: Lp,
  color_vertex: Ip,
  common: Dp,
  cube_uv_reflection_fragment: Np,
  defaultnormal_vertex: Up,
  displacementmap_pars_vertex: Op,
  displacementmap_vertex: Fp,
  emissivemap_fragment: Bp,
  emissivemap_pars_fragment: kp,
  colorspace_fragment: zp,
  colorspace_pars_fragment: Hp,
  envmap_fragment: Vp,
  envmap_common_pars_fragment: Gp,
  envmap_pars_fragment: Wp,
  envmap_pars_vertex: Xp,
  envmap_physical_pars_fragment: nm,
  envmap_vertex: $p,
  fog_vertex: qp,
  fog_pars_vertex: Yp,
  fog_fragment: jp,
  fog_pars_fragment: Kp,
  gradientmap_pars_fragment: Zp,
  lightmap_pars_fragment: Jp,
  lights_lambert_fragment: Qp,
  lights_lambert_pars_fragment: tm,
  lights_pars_begin: em,
  lights_toon_fragment: im,
  lights_toon_pars_fragment: sm,
  lights_phong_fragment: rm,
  lights_phong_pars_fragment: om,
  lights_physical_fragment: am,
  lights_physical_pars_fragment: cm,
  lights_fragment_begin: lm,
  lights_fragment_maps: hm,
  lights_fragment_end: um,
  logdepthbuf_fragment: dm,
  logdepthbuf_pars_fragment: fm,
  logdepthbuf_pars_vertex: pm,
  logdepthbuf_vertex: mm,
  map_fragment: gm,
  map_pars_fragment: _m,
  map_particle_fragment: vm,
  map_particle_pars_fragment: xm,
  metalnessmap_fragment: ym,
  metalnessmap_pars_fragment: Mm,
  morphinstance_vertex: Sm,
  morphcolor_vertex: Em,
  morphnormal_vertex: bm,
  morphtarget_pars_vertex: Tm,
  morphtarget_vertex: Am,
  normal_fragment_begin: wm,
  normal_fragment_maps: Rm,
  normal_pars_fragment: Cm,
  normal_pars_vertex: Pm,
  normal_vertex: Lm,
  normalmap_pars_fragment: Im,
  clearcoat_normal_fragment_begin: Dm,
  clearcoat_normal_fragment_maps: Nm,
  clearcoat_pars_fragment: Um,
  iridescence_pars_fragment: Om,
  opaque_fragment: Fm,
  packing: Bm,
  premultiplied_alpha_fragment: km,
  project_vertex: zm,
  dithering_fragment: Hm,
  dithering_pars_fragment: Vm,
  roughnessmap_fragment: Gm,
  roughnessmap_pars_fragment: Wm,
  shadowmap_pars_fragment: Xm,
  shadowmap_pars_vertex: $m,
  shadowmap_vertex: qm,
  shadowmask_pars_fragment: Ym,
  skinbase_vertex: jm,
  skinning_pars_vertex: Km,
  skinning_vertex: Zm,
  skinnormal_vertex: Jm,
  specularmap_fragment: Qm,
  specularmap_pars_fragment: tg,
  tonemapping_fragment: eg,
  tonemapping_pars_fragment: ng,
  transmission_fragment: ig,
  transmission_pars_fragment: sg,
  uv_pars_fragment: rg,
  uv_pars_vertex: og,
  uv_vertex: ag,
  worldpos_vertex: cg,
  background_vert: lg,
  background_frag: hg,
  backgroundCube_vert: ug,
  backgroundCube_frag: dg,
  cube_vert: fg,
  cube_frag: pg,
  depth_vert: mg,
  depth_frag: gg,
  distanceRGBA_vert: _g,
  distanceRGBA_frag: vg,
  equirect_vert: xg,
  equirect_frag: yg,
  linedashed_vert: Mg,
  linedashed_frag: Sg,
  meshbasic_vert: Eg,
  meshbasic_frag: bg,
  meshlambert_vert: Tg,
  meshlambert_frag: Ag,
  meshmatcap_vert: wg,
  meshmatcap_frag: Rg,
  meshnormal_vert: Cg,
  meshnormal_frag: Pg,
  meshphong_vert: Lg,
  meshphong_frag: Ig,
  meshphysical_vert: Dg,
  meshphysical_frag: Ng,
  meshtoon_vert: Ug,
  meshtoon_frag: Og,
  points_vert: Fg,
  points_frag: Bg,
  shadow_vert: kg,
  shadow_frag: zg,
  sprite_vert: Hg,
  sprite_frag: Vg
}, nt = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Mt(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Dt() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Dt() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Dt() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Dt() },
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
    aoMapTransform: { value: /* @__PURE__ */ new Dt() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Dt() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Dt() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Dt() },
    normalScale: { value: /* @__PURE__ */ new et(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Dt() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Dt() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Dt() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Dt() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Mt(16777215) }
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
    diffuse: { value: /* @__PURE__ */ new Mt(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Dt() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Dt() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Mt(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new et(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Dt() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Dt() },
    alphaTest: { value: 0 }
  }
}, un = {
  basic: {
    uniforms: /* @__PURE__ */ Ce([
      nt.common,
      nt.specularmap,
      nt.envmap,
      nt.aomap,
      nt.lightmap,
      nt.fog
    ]),
    vertexShader: It.meshbasic_vert,
    fragmentShader: It.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Ce([
      nt.common,
      nt.specularmap,
      nt.envmap,
      nt.aomap,
      nt.lightmap,
      nt.emissivemap,
      nt.bumpmap,
      nt.normalmap,
      nt.displacementmap,
      nt.fog,
      nt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Mt(0) }
      }
    ]),
    vertexShader: It.meshlambert_vert,
    fragmentShader: It.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Ce([
      nt.common,
      nt.specularmap,
      nt.envmap,
      nt.aomap,
      nt.lightmap,
      nt.emissivemap,
      nt.bumpmap,
      nt.normalmap,
      nt.displacementmap,
      nt.fog,
      nt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Mt(0) },
        specular: { value: /* @__PURE__ */ new Mt(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: It.meshphong_vert,
    fragmentShader: It.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Ce([
      nt.common,
      nt.envmap,
      nt.aomap,
      nt.lightmap,
      nt.emissivemap,
      nt.bumpmap,
      nt.normalmap,
      nt.displacementmap,
      nt.roughnessmap,
      nt.metalnessmap,
      nt.fog,
      nt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Mt(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: It.meshphysical_vert,
    fragmentShader: It.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Ce([
      nt.common,
      nt.aomap,
      nt.lightmap,
      nt.emissivemap,
      nt.bumpmap,
      nt.normalmap,
      nt.displacementmap,
      nt.gradientmap,
      nt.fog,
      nt.lights,
      {
        emissive: { value: /* @__PURE__ */ new Mt(0) }
      }
    ]),
    vertexShader: It.meshtoon_vert,
    fragmentShader: It.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Ce([
      nt.common,
      nt.bumpmap,
      nt.normalmap,
      nt.displacementmap,
      nt.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: It.meshmatcap_vert,
    fragmentShader: It.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Ce([
      nt.points,
      nt.fog
    ]),
    vertexShader: It.points_vert,
    fragmentShader: It.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Ce([
      nt.common,
      nt.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: It.linedashed_vert,
    fragmentShader: It.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Ce([
      nt.common,
      nt.displacementmap
    ]),
    vertexShader: It.depth_vert,
    fragmentShader: It.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Ce([
      nt.common,
      nt.bumpmap,
      nt.normalmap,
      nt.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: It.meshnormal_vert,
    fragmentShader: It.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Ce([
      nt.sprite,
      nt.fog
    ]),
    vertexShader: It.sprite_vert,
    fragmentShader: It.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Dt() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: It.background_vert,
    fragmentShader: It.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Dt() }
    },
    vertexShader: It.backgroundCube_vert,
    fragmentShader: It.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: It.cube_vert,
    fragmentShader: It.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: It.equirect_vert,
    fragmentShader: It.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ Ce([
      nt.common,
      nt.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new w() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: It.distanceRGBA_vert,
    fragmentShader: It.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Ce([
      nt.lights,
      nt.fog,
      {
        color: { value: /* @__PURE__ */ new Mt(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: It.shadow_vert,
    fragmentShader: It.shadow_frag
  }
};
un.physical = {
  uniforms: /* @__PURE__ */ Ce([
    un.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Dt() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Dt() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new et(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Dt() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Dt() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Dt() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Mt(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Dt() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Dt() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Dt() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new et() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Dt() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Mt(0) },
      specularColor: { value: /* @__PURE__ */ new Mt(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Dt() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Dt() },
      anisotropyVector: { value: /* @__PURE__ */ new et() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Dt() }
    }
  ]),
  vertexShader: It.meshphysical_vert,
  fragmentShader: It.meshphysical_frag
};
const vr = { r: 0, b: 0, g: 0 }, ri = /* @__PURE__ */ new pn(), Gg = /* @__PURE__ */ new Ct();
function Wg(i, t, e, n, s, r, o) {
  const a = new Mt(0);
  let c = r === !0 ? 0 : 1, l, h, u = null, d = 0, f = null;
  function g(b) {
    let y = b.isScene === !0 ? b.background : null;
    return y && y.isTexture && (y = (b.backgroundBlurriness > 0 ? e : t).get(y)), y;
  }
  function _(b) {
    let y = !1;
    const S = g(b);
    S === null ? m(a, c) : S && S.isColor && (m(S, 1), y = !0);
    const D = i.xr.getEnvironmentBlendMode();
    D === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, o) : D === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, o), (i.autoClear || y) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function p(b, y) {
    const S = g(y);
    S && (S.isCubeTexture || S.mapping === io) ? (h === void 0 && (h = new ge(
      new Jn(1, 1, 1),
      new Kn({
        name: "BackgroundCubeMaterial",
        uniforms: ss(un.backgroundCube.uniforms),
        vertexShader: un.backgroundCube.vertexShader,
        fragmentShader: un.backgroundCube.fragmentShader,
        side: Fe,
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
    }), s.update(h)), ri.copy(y.backgroundRotation), ri.x *= -1, ri.y *= -1, ri.z *= -1, S.isCubeTexture && S.isRenderTargetTexture === !1 && (ri.y *= -1, ri.z *= -1), h.material.uniforms.envMap.value = S, h.material.uniforms.flipEnvMap.value = S.isCubeTexture && S.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = y.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, h.material.uniforms.backgroundRotation.value.setFromMatrix4(Gg.makeRotationFromEuler(ri)), h.material.toneMapped = Wt.getTransfer(S.colorSpace) !== ae, (u !== S || d !== S.version || f !== i.toneMapping) && (h.material.needsUpdate = !0, u = S, d = S.version, f = i.toneMapping), h.layers.enableAll(), b.unshift(h, h.geometry, h.material, 0, 0, null)) : S && S.isTexture && (l === void 0 && (l = new ge(
      new ro(2, 2),
      new Kn({
        name: "BackgroundMaterial",
        uniforms: ss(un.background.uniforms),
        vertexShader: un.background.vertexShader,
        fragmentShader: un.background.fragmentShader,
        side: In,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), s.update(l)), l.material.uniforms.t2D.value = S, l.material.uniforms.backgroundIntensity.value = y.backgroundIntensity, l.material.toneMapped = Wt.getTransfer(S.colorSpace) !== ae, S.matrixAutoUpdate === !0 && S.updateMatrix(), l.material.uniforms.uvTransform.value.copy(S.matrix), (u !== S || d !== S.version || f !== i.toneMapping) && (l.material.needsUpdate = !0, u = S, d = S.version, f = i.toneMapping), l.layers.enableAll(), b.unshift(l, l.geometry, l.material, 0, 0, null));
  }
  function m(b, y) {
    b.getRGB(vr, gu(i)), n.buffers.color.setClear(vr.r, vr.g, vr.b, y, o);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(b, y = 1) {
      a.set(b), c = y, m(a, c);
    },
    getClearAlpha: function() {
      return c;
    },
    setClearAlpha: function(b) {
      c = b, m(a, c);
    },
    render: _,
    addToRenderList: p
  };
}
function Xg(i, t) {
  const e = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, s = d(null);
  let r = s, o = !1;
  function a(v, E, k, B, H) {
    let j = !1;
    const z = u(B, k, E);
    r !== z && (r = z, l(r.object)), j = f(v, B, k, H), j && g(v, B, k, H), H !== null && t.update(H, i.ELEMENT_ARRAY_BUFFER), (j || o) && (o = !1, S(v, E, k, B), H !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(H).buffer));
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
  function u(v, E, k) {
    const B = k.wireframe === !0;
    let H = n[v.id];
    H === void 0 && (H = {}, n[v.id] = H);
    let j = H[E.id];
    j === void 0 && (j = {}, H[E.id] = j);
    let z = j[B];
    return z === void 0 && (z = d(c()), j[B] = z), z;
  }
  function d(v) {
    const E = [], k = [], B = [];
    for (let H = 0; H < e; H++)
      E[H] = 0, k[H] = 0, B[H] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: E,
      enabledAttributes: k,
      attributeDivisors: B,
      object: v,
      attributes: {},
      index: null
    };
  }
  function f(v, E, k, B) {
    const H = r.attributes, j = E.attributes;
    let z = 0;
    const Q = k.getAttributes();
    for (const G in Q)
      if (Q[G].location >= 0) {
        const lt = H[G];
        let _t = j[G];
        if (_t === void 0 && (G === "instanceMatrix" && v.instanceMatrix && (_t = v.instanceMatrix), G === "instanceColor" && v.instanceColor && (_t = v.instanceColor)), lt === void 0 || lt.attribute !== _t || _t && lt.data !== _t.data) return !0;
        z++;
      }
    return r.attributesNum !== z || r.index !== B;
  }
  function g(v, E, k, B) {
    const H = {}, j = E.attributes;
    let z = 0;
    const Q = k.getAttributes();
    for (const G in Q)
      if (Q[G].location >= 0) {
        let lt = j[G];
        lt === void 0 && (G === "instanceMatrix" && v.instanceMatrix && (lt = v.instanceMatrix), G === "instanceColor" && v.instanceColor && (lt = v.instanceColor));
        const _t = {};
        _t.attribute = lt, lt && lt.data && (_t.data = lt.data), H[G] = _t, z++;
      }
    r.attributes = H, r.attributesNum = z, r.index = B;
  }
  function _() {
    const v = r.newAttributes;
    for (let E = 0, k = v.length; E < k; E++)
      v[E] = 0;
  }
  function p(v) {
    m(v, 0);
  }
  function m(v, E) {
    const k = r.newAttributes, B = r.enabledAttributes, H = r.attributeDivisors;
    k[v] = 1, B[v] === 0 && (i.enableVertexAttribArray(v), B[v] = 1), H[v] !== E && (i.vertexAttribDivisor(v, E), H[v] = E);
  }
  function b() {
    const v = r.newAttributes, E = r.enabledAttributes;
    for (let k = 0, B = E.length; k < B; k++)
      E[k] !== v[k] && (i.disableVertexAttribArray(k), E[k] = 0);
  }
  function y(v, E, k, B, H, j, z) {
    z === !0 ? i.vertexAttribIPointer(v, E, k, H, j) : i.vertexAttribPointer(v, E, k, B, H, j);
  }
  function S(v, E, k, B) {
    _();
    const H = B.attributes, j = k.getAttributes(), z = E.defaultAttributeValues;
    for (const Q in j) {
      const G = j[Q];
      if (G.location >= 0) {
        let ct = H[Q];
        if (ct === void 0 && (Q === "instanceMatrix" && v.instanceMatrix && (ct = v.instanceMatrix), Q === "instanceColor" && v.instanceColor && (ct = v.instanceColor)), ct !== void 0) {
          const lt = ct.normalized, _t = ct.itemSize, Xt = t.get(ct);
          if (Xt === void 0) continue;
          const Kt = Xt.buffer, W = Xt.type, Z = Xt.bytesPerElement, mt = W === i.INT || W === i.UNSIGNED_INT || ct.gpuType === sc;
          if (ct.isInterleavedBufferAttribute) {
            const ht = ct.data, Pt = ht.stride, Et = ct.offset;
            if (ht.isInstancedInterleavedBuffer) {
              for (let kt = 0; kt < G.locationSize; kt++)
                m(G.location + kt, ht.meshPerAttribute);
              v.isInstancedMesh !== !0 && B._maxInstanceCount === void 0 && (B._maxInstanceCount = ht.meshPerAttribute * ht.count);
            } else
              for (let kt = 0; kt < G.locationSize; kt++)
                p(G.location + kt);
            i.bindBuffer(i.ARRAY_BUFFER, Kt);
            for (let kt = 0; kt < G.locationSize; kt++)
              y(
                G.location + kt,
                _t / G.locationSize,
                W,
                lt,
                Pt * Z,
                (Et + _t / G.locationSize * kt) * Z,
                mt
              );
          } else {
            if (ct.isInstancedBufferAttribute) {
              for (let ht = 0; ht < G.locationSize; ht++)
                m(G.location + ht, ct.meshPerAttribute);
              v.isInstancedMesh !== !0 && B._maxInstanceCount === void 0 && (B._maxInstanceCount = ct.meshPerAttribute * ct.count);
            } else
              for (let ht = 0; ht < G.locationSize; ht++)
                p(G.location + ht);
            i.bindBuffer(i.ARRAY_BUFFER, Kt);
            for (let ht = 0; ht < G.locationSize; ht++)
              y(
                G.location + ht,
                _t / G.locationSize,
                W,
                lt,
                _t * Z,
                _t / G.locationSize * ht * Z,
                mt
              );
          }
        } else if (z !== void 0) {
          const lt = z[Q];
          if (lt !== void 0)
            switch (lt.length) {
              case 2:
                i.vertexAttrib2fv(G.location, lt);
                break;
              case 3:
                i.vertexAttrib3fv(G.location, lt);
                break;
              case 4:
                i.vertexAttrib4fv(G.location, lt);
                break;
              default:
                i.vertexAttrib1fv(G.location, lt);
            }
        }
      }
    }
    b();
  }
  function D() {
    N();
    for (const v in n) {
      const E = n[v];
      for (const k in E) {
        const B = E[k];
        for (const H in B)
          h(B[H].object), delete B[H];
        delete E[k];
      }
      delete n[v];
    }
  }
  function R(v) {
    if (n[v.id] === void 0) return;
    const E = n[v.id];
    for (const k in E) {
      const B = E[k];
      for (const H in B)
        h(B[H].object), delete B[H];
      delete E[k];
    }
    delete n[v.id];
  }
  function A(v) {
    for (const E in n) {
      const k = n[E];
      if (k[v.id] === void 0) continue;
      const B = k[v.id];
      for (const H in B)
        h(B[H].object), delete B[H];
      delete k[v.id];
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
    disableUnusedAttributes: b
  };
}
function $g(i, t, e) {
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
function qg(i, t, e, n) {
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
    return !(A !== Ke && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function a(A) {
    const N = A === js && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
    return !(A !== Dn && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    A !== cn && !N);
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
  const f = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), g = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_TEXTURE_SIZE), p = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), m = i.getParameter(i.MAX_VERTEX_ATTRIBS), b = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), y = i.getParameter(i.MAX_VARYING_VECTORS), S = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), D = g > 0, R = i.getParameter(i.MAX_SAMPLES);
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
    maxVertexUniforms: b,
    maxVaryings: y,
    maxFragmentUniforms: S,
    vertexTextures: D,
    maxSamples: R
  };
}
function Yg(i) {
  const t = this;
  let e = null, n = 0, s = !1, r = !1;
  const o = new Cn(), a = new Dt(), c = { value: null, needsUpdate: !1 };
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
      const b = r ? 0 : n, y = b * 4;
      let S = m.clippingState || null;
      c.value = S, S = h(g, d, y, f);
      for (let D = 0; D !== y; ++D)
        S[D] = e[D];
      m.clippingState = S, this.numIntersection = _ ? this.numPlanes : 0, this.numPlanes += b;
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
        const m = f + _ * 4, b = d.matrixWorldInverse;
        a.getNormalMatrix(b), (p === null || p.length < m) && (p = new Float32Array(m));
        for (let y = 0, S = f; y !== _; ++y, S += 4)
          o.copy(u[y]).applyMatrix4(b, a), o.normal.toArray(p, S), p[S + 3] = o.constant;
      }
      c.value = p, c.needsUpdate = !0;
    }
    return t.numPlanes = _, t.numIntersection = 0, p;
  }
}
function jg(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(o, a) {
    return a === ua ? o.mapping = Ji : a === da && (o.mapping = Qi), o;
  }
  function n(o) {
    if (o && o.isTexture) {
      const a = o.mapping;
      if (a === ua || a === da)
        if (t.has(o)) {
          const c = t.get(o).texture;
          return e(c, o.mapping);
        } else {
          const c = o.image;
          if (c && c.height > 0) {
            const l = new op(c.height);
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
class mc extends _u {
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
const zi = 4, bl = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], ui = 20, Oo = /* @__PURE__ */ new mc(), Tl = /* @__PURE__ */ new Mt();
let Fo = null, Bo = 0, ko = 0, zo = !1;
const li = (1 + Math.sqrt(5)) / 2, Ii = 1 / li, Al = [
  /* @__PURE__ */ new w(-li, Ii, 0),
  /* @__PURE__ */ new w(li, Ii, 0),
  /* @__PURE__ */ new w(-Ii, 0, li),
  /* @__PURE__ */ new w(Ii, 0, li),
  /* @__PURE__ */ new w(0, li, -Ii),
  /* @__PURE__ */ new w(0, li, Ii),
  /* @__PURE__ */ new w(-1, 1, -1),
  /* @__PURE__ */ new w(1, 1, -1),
  /* @__PURE__ */ new w(-1, 1, 1),
  /* @__PURE__ */ new w(1, 1, 1)
];
class wl {
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
    Fo = this._renderer.getRenderTarget(), Bo = this._renderer.getActiveCubeFace(), ko = this._renderer.getActiveMipmapLevel(), zo = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(256);
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
    this._cubemapMaterial === null && (this._cubemapMaterial = Pl(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Cl(), this._compileMaterial(this._equirectMaterial));
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
    this._renderer.setRenderTarget(Fo, Bo, ko), this._renderer.xr.enabled = zo, t.scissorTest = !1, xr(t, 0, 0, t.width, t.height);
  }
  _fromTexture(t, e) {
    t.mapping === Ji || t.mapping === Qi ? this._setSize(t.image.length === 0 ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), Fo = this._renderer.getRenderTarget(), Bo = this._renderer.getActiveCubeFace(), ko = this._renderer.getActiveMipmapLevel(), zo = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = e || this._allocateTargets();
    return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const t = 3 * Math.max(this._cubeSize, 112), e = 4 * this._cubeSize, n = {
      magFilter: We,
      minFilter: We,
      generateMipmaps: !1,
      type: js,
      format: Ke,
      colorSpace: be,
      depthBuffer: !1
    }, s = Rl(t, e, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Rl(t, e, n);
      const { _lodMax: r } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Kg(r)), this._blurMaterial = Zg(r, t, e);
    }
    return s;
  }
  _compileMaterial(t) {
    const e = new ge(this._lodPlanes[0], t);
    this._renderer.compile(e, Oo);
  }
  _sceneToCubeUV(t, e, n, s) {
    const a = new Le(90, 1, e, n), c = [1, -1, 1, 1, 1, 1], l = [1, 1, 1, -1, -1, -1], h = this._renderer, u = h.autoClear, d = h.toneMapping;
    h.getClearColor(Tl), h.toneMapping = jn, h.autoClear = !1;
    const f = new dn({
      name: "PMREM.Background",
      side: Fe,
      depthWrite: !1,
      depthTest: !1
    }), g = new ge(new Jn(), f);
    let _ = !1;
    const p = t.background;
    p ? p.isColor && (f.color.copy(p), t.background = null, _ = !0) : (f.color.copy(Tl), _ = !0);
    for (let m = 0; m < 6; m++) {
      const b = m % 3;
      b === 0 ? (a.up.set(0, c[m], 0), a.lookAt(l[m], 0, 0)) : b === 1 ? (a.up.set(0, 0, c[m]), a.lookAt(0, l[m], 0)) : (a.up.set(0, c[m], 0), a.lookAt(0, 0, l[m]));
      const y = this._cubeSize;
      xr(s, b * y, m > 2 ? y : 0, y, y), h.setRenderTarget(s), _ && h.render(g, a), h.render(t, a);
    }
    g.geometry.dispose(), g.material.dispose(), h.toneMapping = d, h.autoClear = u, t.background = p;
  }
  _textureToCubeUV(t, e) {
    const n = this._renderer, s = t.mapping === Ji || t.mapping === Qi;
    s ? (this._cubemapMaterial === null && (this._cubemapMaterial = Pl()), this._cubemapMaterial.uniforms.flipEnvMap.value = t.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Cl());
    const r = s ? this._cubemapMaterial : this._equirectMaterial, o = new ge(this._lodPlanes[0], r), a = r.uniforms;
    a.envMap.value = t;
    const c = this._cubeSize;
    xr(e, 0, 0, 3 * c, 2 * c), n.setRenderTarget(e), n.render(o, Oo);
  }
  _applyPMREM(t) {
    const e = this._renderer, n = e.autoClear;
    e.autoClear = !1;
    const s = this._lodPlanes.length;
    for (let r = 1; r < s; r++) {
      const o = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), a = Al[(s - r - 1) % Al.length];
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
    const h = 3, u = new ge(this._lodPlanes[s], l), d = l.uniforms, f = this._sizeLods[n] - 1, g = isFinite(r) ? Math.PI / (2 * f) : 2 * Math.PI / (2 * ui - 1), _ = r / g, p = isFinite(r) ? 1 + Math.floor(h * _) : ui;
    p > ui && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ui}`);
    const m = [];
    let b = 0;
    for (let A = 0; A < ui; ++A) {
      const N = A / _, Y = Math.exp(-N * N / 2);
      m.push(Y), A === 0 ? b += Y : A < p && (b += 2 * Y);
    }
    for (let A = 0; A < m.length; A++)
      m[A] = m[A] / b;
    d.envMap.value = t.texture, d.samples.value = p, d.weights.value = m, d.latitudinal.value = o === "latitudinal", a && (d.poleAxis.value = a);
    const { _lodMax: y } = this;
    d.dTheta.value = g, d.mipInt.value = y - n;
    const S = this._sizeLods[s], D = 3 * S * (s > y - zi ? s - y + zi : 0), R = 4 * (this._cubeSize - S);
    xr(e, D, R, 3 * S, 2 * S), c.setRenderTarget(e), c.render(u, Oo);
  }
}
function Kg(i) {
  const t = [], e = [], n = [];
  let s = i;
  const r = i - zi + 1 + bl.length;
  for (let o = 0; o < r; o++) {
    const a = Math.pow(2, s);
    e.push(a);
    let c = 1 / a;
    o > i - zi ? c = bl[o - i + zi - 1] : o === 0 && (c = 0), n.push(c);
    const l = 1 / (a - 2), h = -l, u = 1 + l, d = [h, h, u, h, u, u, h, h, u, u, h, u], f = 6, g = 6, _ = 3, p = 2, m = 1, b = new Float32Array(_ * g * f), y = new Float32Array(p * g * f), S = new Float32Array(m * g * f);
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
      b.set(Y, _ * g * R), y.set(d, p * g * R);
      const v = [R, R, R, R, R, R];
      S.set(v, m * g * R);
    }
    const D = new we();
    D.setAttribute("position", new De(b, _)), D.setAttribute("uv", new De(y, p)), D.setAttribute("faceIndex", new De(S, m)), t.push(D), s > zi && s--;
  }
  return { lodPlanes: t, sizeLods: e, sigmas: n };
}
function Rl(i, t, e) {
  const n = new mi(i, t, e);
  return n.texture.mapping = io, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function xr(i, t, e, n, s) {
  i.viewport.set(t, e, n, s), i.scissor.set(t, e, n, s);
}
function Zg(i, t, e) {
  const n = new Float32Array(ui), s = new w(0, 1, 0);
  return new Kn({
    name: "SphericalGaussianBlur",
    defines: {
      n: ui,
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
    vertexShader: gc(),
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
    blending: Yn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Cl() {
  return new Kn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: gc(),
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
    blending: Yn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Pl() {
  return new Kn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: gc(),
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
    blending: Yn,
    depthTest: !1,
    depthWrite: !1
  });
}
function gc() {
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
function Jg(i) {
  let t = /* @__PURE__ */ new WeakMap(), e = null;
  function n(a) {
    if (a && a.isTexture) {
      const c = a.mapping, l = c === ua || c === da, h = c === Ji || c === Qi;
      if (l || h) {
        let u = t.get(a);
        const d = u !== void 0 ? u.texture.pmremVersion : 0;
        if (a.isRenderTargetTexture && a.pmremVersion !== d)
          return e === null && (e = new wl(i)), u = l ? e.fromEquirectangular(a, u) : e.fromCubemap(a, u), u.texture.pmremVersion = a.pmremVersion, t.set(a, u), u.texture;
        if (u !== void 0)
          return u.texture;
        {
          const f = a.image;
          return l && f && f.height > 0 || h && f && s(f) ? (e === null && (e = new wl(i)), u = l ? e.fromEquirectangular(a) : e.fromCubemap(a), u.texture.pmremVersion = a.pmremVersion, t.set(a, u), a.addEventListener("dispose", r), u.texture) : null;
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
function Qg(i) {
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
      return s === null && Wr("THREE.WebGLRenderer: " + n + " extension not supported."), s;
    }
  };
}
function t_(i, t, e, n) {
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
      const b = f.array;
      _ = f.version;
      for (let y = 0, S = b.length; y < S; y += 3) {
        const D = b[y + 0], R = b[y + 1], A = b[y + 2];
        d.push(D, R, R, A, A, D);
      }
    } else if (g !== void 0) {
      const b = g.array;
      _ = g.version;
      for (let y = 0, S = b.length / 3 - 1; y < S; y += 3) {
        const D = y + 0, R = y + 1, A = y + 2;
        d.push(D, R, R, A, A, D);
      }
    } else
      return;
    const p = new (hu(d) ? mu : pu)(d, 1);
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
function e_(i, t, e) {
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
      for (let b = 0; b < g; b++)
        m += f[b];
      for (let b = 0; b < _.length; b++)
        e.update(m, n, _[b]);
    }
  }
  this.setMode = s, this.setIndex = a, this.render = c, this.renderInstances = l, this.renderMultiDraw = h, this.renderMultiDrawInstances = u;
}
function n_(i) {
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
function i_(i, t, e) {
  const n = /* @__PURE__ */ new WeakMap(), s = new qt();
  function r(o, a, c) {
    const l = o.morphTargetInfluences, h = a.morphAttributes.position || a.morphAttributes.normal || a.morphAttributes.color, u = h !== void 0 ? h.length : 0;
    let d = n.get(a);
    if (d === void 0 || d.count !== u) {
      let Y = function() {
        A.dispose(), n.delete(a), a.removeEventListener("dispose", Y);
      };
      d !== void 0 && d.texture.dispose();
      const f = a.morphAttributes.position !== void 0, g = a.morphAttributes.normal !== void 0, _ = a.morphAttributes.color !== void 0, p = a.morphAttributes.position || [], m = a.morphAttributes.normal || [], b = a.morphAttributes.color || [];
      let y = 0;
      f === !0 && (y = 1), g === !0 && (y = 2), _ === !0 && (y = 3);
      let S = a.attributes.position.count * y, D = 1;
      S > t.maxTextureSize && (D = Math.ceil(S / t.maxTextureSize), S = t.maxTextureSize);
      const R = new Float32Array(S * D * 4 * u), A = new du(R, S, D, u);
      A.type = cn, A.needsUpdate = !0;
      const N = y * 4;
      for (let v = 0; v < u; v++) {
        const E = p[v], k = m[v], B = b[v], H = S * D * 4 * v;
        for (let j = 0; j < E.count; j++) {
          const z = j * N;
          f === !0 && (s.fromBufferAttribute(E, j), R[H + z + 0] = s.x, R[H + z + 1] = s.y, R[H + z + 2] = s.z, R[H + z + 3] = 0), g === !0 && (s.fromBufferAttribute(k, j), R[H + z + 4] = s.x, R[H + z + 5] = s.y, R[H + z + 6] = s.z, R[H + z + 7] = 0), _ === !0 && (s.fromBufferAttribute(B, j), R[H + z + 8] = s.x, R[H + z + 9] = s.y, R[H + z + 10] = s.z, R[H + z + 11] = B.itemSize === 4 ? s.w : 1);
        }
      }
      d = {
        count: u,
        texture: A,
        size: new et(S, D)
      }, n.set(a, d), a.addEventListener("dispose", Y);
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
function s_(i, t, e, n) {
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
class yu extends xe {
  constructor(t, e, n, s, r, o, a, c, l, h = Xi) {
    if (h !== Xi && h !== ns)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === Xi && (n = pi), n === void 0 && h === ns && (n = es), super(null, s, r, o, a, c, h, n, l), this.isDepthTexture = !0, this.image = { width: t, height: e }, this.magFilter = a !== void 0 ? a : Ie, this.minFilter = c !== void 0 ? c : Ie, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(t) {
    return super.copy(t), this.compareFunction = t.compareFunction, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.compareFunction !== null && (e.compareFunction = this.compareFunction), e;
  }
}
const Mu = /* @__PURE__ */ new xe(), Ll = /* @__PURE__ */ new yu(1, 1), Su = /* @__PURE__ */ new du(), Eu = /* @__PURE__ */ new Wf(), bu = /* @__PURE__ */ new vu(), Il = [], Dl = [], Nl = new Float32Array(16), Ul = new Float32Array(9), Ol = new Float32Array(4);
function ls(i, t, e) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const s = t * e;
  let r = Il[s];
  if (r === void 0 && (r = new Float32Array(s), Il[s] = r), t !== 0) {
    n.toArray(r, 0);
    for (let o = 1, a = 0; o !== t; ++o)
      a += e, i[o].toArray(r, a);
  }
  return r;
}
function ye(i, t) {
  if (i.length !== t.length) return !1;
  for (let e = 0, n = i.length; e < n; e++)
    if (i[e] !== t[e]) return !1;
  return !0;
}
function Me(i, t) {
  for (let e = 0, n = t.length; e < n; e++)
    i[e] = t[e];
}
function oo(i, t) {
  let e = Dl[t];
  e === void 0 && (e = new Int32Array(t), Dl[t] = e);
  for (let n = 0; n !== t; ++n)
    e[n] = i.allocateTextureUnit();
  return e;
}
function r_(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1f(this.addr, t), e[0] = t);
}
function o_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2f(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ye(e, t)) return;
    i.uniform2fv(this.addr, t), Me(e, t);
  }
}
function a_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3f(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else if (t.r !== void 0)
    (e[0] !== t.r || e[1] !== t.g || e[2] !== t.b) && (i.uniform3f(this.addr, t.r, t.g, t.b), e[0] = t.r, e[1] = t.g, e[2] = t.b);
  else {
    if (ye(e, t)) return;
    i.uniform3fv(this.addr, t), Me(e, t);
  }
}
function c_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4f(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ye(e, t)) return;
    i.uniform4fv(this.addr, t), Me(e, t);
  }
}
function l_(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ye(e, t)) return;
    i.uniformMatrix2fv(this.addr, !1, t), Me(e, t);
  } else {
    if (ye(e, n)) return;
    Ol.set(n), i.uniformMatrix2fv(this.addr, !1, Ol), Me(e, n);
  }
}
function h_(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ye(e, t)) return;
    i.uniformMatrix3fv(this.addr, !1, t), Me(e, t);
  } else {
    if (ye(e, n)) return;
    Ul.set(n), i.uniformMatrix3fv(this.addr, !1, Ul), Me(e, n);
  }
}
function u_(i, t) {
  const e = this.cache, n = t.elements;
  if (n === void 0) {
    if (ye(e, t)) return;
    i.uniformMatrix4fv(this.addr, !1, t), Me(e, t);
  } else {
    if (ye(e, n)) return;
    Nl.set(n), i.uniformMatrix4fv(this.addr, !1, Nl), Me(e, n);
  }
}
function d_(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1i(this.addr, t), e[0] = t);
}
function f_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2i(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ye(e, t)) return;
    i.uniform2iv(this.addr, t), Me(e, t);
  }
}
function p_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3i(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (ye(e, t)) return;
    i.uniform3iv(this.addr, t), Me(e, t);
  }
}
function m_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4i(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ye(e, t)) return;
    i.uniform4iv(this.addr, t), Me(e, t);
  }
}
function g_(i, t) {
  const e = this.cache;
  e[0] !== t && (i.uniform1ui(this.addr, t), e[0] = t);
}
function __(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y) && (i.uniform2ui(this.addr, t.x, t.y), e[0] = t.x, e[1] = t.y);
  else {
    if (ye(e, t)) return;
    i.uniform2uiv(this.addr, t), Me(e, t);
  }
}
function v_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z) && (i.uniform3ui(this.addr, t.x, t.y, t.z), e[0] = t.x, e[1] = t.y, e[2] = t.z);
  else {
    if (ye(e, t)) return;
    i.uniform3uiv(this.addr, t), Me(e, t);
  }
}
function x_(i, t) {
  const e = this.cache;
  if (t.x !== void 0)
    (e[0] !== t.x || e[1] !== t.y || e[2] !== t.z || e[3] !== t.w) && (i.uniform4ui(this.addr, t.x, t.y, t.z, t.w), e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w);
  else {
    if (ye(e, t)) return;
    i.uniform4uiv(this.addr, t), Me(e, t);
  }
}
function y_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s);
  let r;
  this.type === i.SAMPLER_2D_SHADOW ? (Ll.compareFunction = lu, r = Ll) : r = Mu, e.setTexture2D(t || r, s);
}
function M_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture3D(t || Eu, s);
}
function S_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTextureCube(t || bu, s);
}
function E_(i, t, e) {
  const n = this.cache, s = e.allocateTextureUnit();
  n[0] !== s && (i.uniform1i(this.addr, s), n[0] = s), e.setTexture2DArray(t || Su, s);
}
function b_(i) {
  switch (i) {
    case 5126:
      return r_;
    case 35664:
      return o_;
    case 35665:
      return a_;
    case 35666:
      return c_;
    case 35674:
      return l_;
    case 35675:
      return h_;
    case 35676:
      return u_;
    case 5124:
    case 35670:
      return d_;
    case 35667:
    case 35671:
      return f_;
    case 35668:
    case 35672:
      return p_;
    case 35669:
    case 35673:
      return m_;
    case 5125:
      return g_;
    case 36294:
      return __;
    case 36295:
      return v_;
    case 36296:
      return x_;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return y_;
    case 35679:
    case 36299:
    case 36307:
      return M_;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return S_;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return E_;
  }
}
function T_(i, t) {
  i.uniform1fv(this.addr, t);
}
function A_(i, t) {
  const e = ls(t, this.size, 2);
  i.uniform2fv(this.addr, e);
}
function w_(i, t) {
  const e = ls(t, this.size, 3);
  i.uniform3fv(this.addr, e);
}
function R_(i, t) {
  const e = ls(t, this.size, 4);
  i.uniform4fv(this.addr, e);
}
function C_(i, t) {
  const e = ls(t, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, e);
}
function P_(i, t) {
  const e = ls(t, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, e);
}
function L_(i, t) {
  const e = ls(t, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, e);
}
function I_(i, t) {
  i.uniform1iv(this.addr, t);
}
function D_(i, t) {
  i.uniform2iv(this.addr, t);
}
function N_(i, t) {
  i.uniform3iv(this.addr, t);
}
function U_(i, t) {
  i.uniform4iv(this.addr, t);
}
function O_(i, t) {
  i.uniform1uiv(this.addr, t);
}
function F_(i, t) {
  i.uniform2uiv(this.addr, t);
}
function B_(i, t) {
  i.uniform3uiv(this.addr, t);
}
function k_(i, t) {
  i.uniform4uiv(this.addr, t);
}
function z_(i, t, e) {
  const n = this.cache, s = t.length, r = oo(e, s);
  ye(n, r) || (i.uniform1iv(this.addr, r), Me(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTexture2D(t[o] || Mu, r[o]);
}
function H_(i, t, e) {
  const n = this.cache, s = t.length, r = oo(e, s);
  ye(n, r) || (i.uniform1iv(this.addr, r), Me(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTexture3D(t[o] || Eu, r[o]);
}
function V_(i, t, e) {
  const n = this.cache, s = t.length, r = oo(e, s);
  ye(n, r) || (i.uniform1iv(this.addr, r), Me(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTextureCube(t[o] || bu, r[o]);
}
function G_(i, t, e) {
  const n = this.cache, s = t.length, r = oo(e, s);
  ye(n, r) || (i.uniform1iv(this.addr, r), Me(n, r));
  for (let o = 0; o !== s; ++o)
    e.setTexture2DArray(t[o] || Su, r[o]);
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
class X_ {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = b_(e.type);
  }
}
class $_ {
  constructor(t, e, n) {
    this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = W_(e.type);
  }
}
class q_ {
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
const Ho = /(\w+)(\])?(\[|\.)?/g;
function Fl(i, t) {
  i.seq.push(t), i.map[t.id] = t;
}
function Y_(i, t, e) {
  const n = i.name, s = n.length;
  for (Ho.lastIndex = 0; ; ) {
    const r = Ho.exec(n), o = Ho.lastIndex;
    let a = r[1];
    const c = r[2] === "]", l = r[3];
    if (c && (a = a | 0), l === void 0 || l === "[" && o + 2 === s) {
      Fl(e, l === void 0 ? new X_(a, i, t) : new $_(a, i, t));
      break;
    } else {
      let u = e.map[a];
      u === void 0 && (u = new q_(a), Fl(e, u)), e = u;
    }
  }
}
class Xr {
  constructor(t, e) {
    this.seq = [], this.map = {};
    const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
    for (let s = 0; s < n; ++s) {
      const r = t.getActiveUniform(e, s), o = t.getUniformLocation(e, r.name);
      Y_(r, o, this);
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
function Bl(i, t, e) {
  const n = i.createShader(t);
  return i.shaderSource(n, e), i.compileShader(n), n;
}
const j_ = 37297;
let K_ = 0;
function Z_(i, t) {
  const e = i.split(`
`), n = [], s = Math.max(t - 6, 0), r = Math.min(t + 6, e.length);
  for (let o = s; o < r; o++) {
    const a = o + 1;
    n.push(`${a === t ? ">" : " "} ${a}: ${e[o]}`);
  }
  return n.join(`
`);
}
function J_(i) {
  const t = Wt.getPrimaries(Wt.workingColorSpace), e = Wt.getPrimaries(i);
  let n;
  switch (t === e ? n = "" : t === Zr && e === Kr ? n = "LinearDisplayP3ToLinearSRGB" : t === Kr && e === Zr && (n = "LinearSRGBToLinearDisplayP3"), i) {
    case be:
    case so:
      return [n, "LinearTransferOETF"];
    case Pe:
    case uc:
      return [n, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", i), [n, "LinearTransferOETF"];
  }
}
function kl(i, t, e) {
  const n = i.getShaderParameter(t, i.COMPILE_STATUS), s = i.getShaderInfoLog(t).trim();
  if (n && s === "") return "";
  const r = /ERROR: 0:(\d+)/.exec(s);
  if (r) {
    const o = parseInt(r[1]);
    return e.toUpperCase() + `

` + s + `

` + Z_(i.getShaderSource(t), o);
  } else
    return s;
}
function Q_(i, t) {
  const e = J_(t);
  return `vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`;
}
function t0(i, t) {
  let e;
  switch (t) {
    case Jd:
      e = "Linear";
      break;
    case Qd:
      e = "Reinhard";
      break;
    case tf:
      e = "Cineon";
      break;
    case ef:
      e = "ACESFilmic";
      break;
    case sf:
      e = "AgX";
      break;
    case rf:
      e = "Neutral";
      break;
    case nf:
      e = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", t), e = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + e + "ToneMapping( color ); }";
}
const yr = /* @__PURE__ */ new w();
function e0() {
  Wt.getLuminanceCoefficients(yr);
  const i = yr.x.toFixed(4), t = yr.y.toFixed(4), e = yr.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function n0(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Cs).join(`
`);
}
function i0(i) {
  const t = [];
  for (const e in i) {
    const n = i[e];
    n !== !1 && t.push("#define " + e + " " + n);
  }
  return t.join(`
`);
}
function s0(i, t) {
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
function Cs(i) {
  return i !== "";
}
function zl(i, t) {
  const e = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, e).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function Hl(i, t) {
  return i.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const r0 = /^[ \t]*#include +<([\w\d./]+)>/gm;
function Ha(i) {
  return i.replace(r0, a0);
}
const o0 = /* @__PURE__ */ new Map();
function a0(i, t) {
  let e = It[t];
  if (e === void 0) {
    const n = o0.get(t);
    if (n !== void 0)
      e = It[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, n);
    else
      throw new Error("Can not resolve #include <" + t + ">");
  }
  return Ha(e);
}
const c0 = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Vl(i) {
  return i.replace(c0, l0);
}
function l0(i, t, e, n) {
  let s = "";
  for (let r = parseInt(t); r < parseInt(e); r++)
    s += n.replace(/\[\s*i\s*\]/g, "[ " + r + " ]").replace(/UNROLLED_LOOP_INDEX/g, r);
  return s;
}
function Gl(i) {
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
function h0(i) {
  let t = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === qh ? t = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === Yh ? t = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === wn && (t = "SHADOWMAP_TYPE_VSM"), t;
}
function u0(i) {
  let t = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case Ji:
      case Qi:
        t = "ENVMAP_TYPE_CUBE";
        break;
      case io:
        t = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return t;
}
function d0(i) {
  let t = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case Qi:
        t = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return t;
}
function f0(i) {
  let t = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case jh:
        t = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case Kd:
        t = "ENVMAP_BLENDING_MIX";
        break;
      case Zd:
        t = "ENVMAP_BLENDING_ADD";
        break;
    }
  return t;
}
function p0(i) {
  const t = i.envMapCubeUVHeight;
  if (t === null) return null;
  const e = Math.log2(t) - 2, n = 1 / t;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, e), 7 * 16)), texelHeight: n, maxMip: e };
}
function m0(i, t, e, n) {
  const s = i.getContext(), r = e.defines;
  let o = e.vertexShader, a = e.fragmentShader;
  const c = h0(e), l = u0(e), h = d0(e), u = f0(e), d = p0(e), f = n0(e), g = i0(r), _ = s.createProgram();
  let p, m, b = e.glslVersion ? "#version " + e.glslVersion + `
` : "";
  e.isRawShaderMaterial ? (p = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g
  ].filter(Cs).join(`
`), p.length > 0 && (p += `
`), m = [
    "#define SHADER_TYPE " + e.shaderType,
    "#define SHADER_NAME " + e.shaderName,
    g
  ].filter(Cs).join(`
`), m.length > 0 && (m += `
`)) : (p = [
    Gl(e),
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
  ].filter(Cs).join(`
`), m = [
    Gl(e),
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
    e.toneMapping !== jn ? "#define TONE_MAPPING" : "",
    e.toneMapping !== jn ? It.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    e.toneMapping !== jn ? t0("toneMapping", e.toneMapping) : "",
    e.dithering ? "#define DITHERING" : "",
    e.opaque ? "#define OPAQUE" : "",
    It.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    Q_("linearToOutputTexel", e.outputColorSpace),
    e0(),
    e.useDepthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "",
    `
`
  ].filter(Cs).join(`
`)), o = Ha(o), o = zl(o, e), o = Hl(o, e), a = Ha(a), a = zl(a, e), a = Hl(a, e), o = Vl(o), a = Vl(a), e.isRawShaderMaterial !== !0 && (b = `#version 300 es
`, p = [
    f,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + p, m = [
    "#define varying in",
    e.glslVersion === rl ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    e.glslVersion === rl ? "" : "#define gl_FragColor pc_fragColor",
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
  const y = b + p + o, S = b + m + a, D = Bl(s, s.VERTEX_SHADER, y), R = Bl(s, s.FRAGMENT_SHADER, S);
  s.attachShader(_, D), s.attachShader(_, R), e.index0AttributeName !== void 0 ? s.bindAttribLocation(_, 0, e.index0AttributeName) : e.morphTargets === !0 && s.bindAttribLocation(_, 0, "position"), s.linkProgram(_);
  function A(E) {
    if (i.debug.checkShaderErrors) {
      const k = s.getProgramInfoLog(_).trim(), B = s.getShaderInfoLog(D).trim(), H = s.getShaderInfoLog(R).trim();
      let j = !0, z = !0;
      if (s.getProgramParameter(_, s.LINK_STATUS) === !1)
        if (j = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(s, _, D, R);
        else {
          const Q = kl(s, D, "vertex"), G = kl(s, R, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + s.getError() + " - VALIDATE_STATUS " + s.getProgramParameter(_, s.VALIDATE_STATUS) + `

Material Name: ` + E.name + `
Material Type: ` + E.type + `

Program Info Log: ` + k + `
` + Q + `
` + G
          );
        }
      else k !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", k) : (B === "" || H === "") && (z = !1);
      z && (E.diagnostics = {
        runnable: j,
        programLog: k,
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
    s.deleteShader(D), s.deleteShader(R), N = new Xr(s, _), Y = s0(s, _);
  }
  let N;
  this.getUniforms = function() {
    return N === void 0 && A(this), N;
  };
  let Y;
  this.getAttributes = function() {
    return Y === void 0 && A(this), Y;
  };
  let v = e.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return v === !1 && (v = s.getProgramParameter(_, j_)), v;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), s.deleteProgram(_), this.program = void 0;
  }, this.type = e.shaderType, this.name = e.shaderName, this.id = K_++, this.cacheKey = t, this.usedTimes = 1, this.program = _, this.vertexShader = D, this.fragmentShader = R, this;
}
let g0 = 0;
class _0 {
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
    return n === void 0 && (n = new v0(t), e.set(t, n)), n;
  }
}
class v0 {
  constructor(t) {
    this.id = g0++, this.code = t, this.usedTimes = 0;
  }
}
function x0(i, t, e, n, s, r, o) {
  const a = new fc(), c = new _0(), l = /* @__PURE__ */ new Set(), h = [], u = s.logarithmicDepthBuffer, d = s.reverseDepthBuffer, f = s.vertexTextures;
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
  function m(v, E, k, B, H) {
    const j = B.fog, z = H.geometry, Q = v.isMeshStandardMaterial ? B.environment : null, G = (v.isMeshStandardMaterial ? e : t).get(v.envMap || Q), ct = G && G.mapping === io ? G.image.height : null, lt = _[v.type];
    v.precision !== null && (g = s.getMaxPrecision(v.precision), g !== v.precision && console.warn("THREE.WebGLProgram.getParameters:", v.precision, "not supported, using", g, "instead."));
    const _t = z.morphAttributes.position || z.morphAttributes.normal || z.morphAttributes.color, Xt = _t !== void 0 ? _t.length : 0;
    let Kt = 0;
    z.morphAttributes.position !== void 0 && (Kt = 1), z.morphAttributes.normal !== void 0 && (Kt = 2), z.morphAttributes.color !== void 0 && (Kt = 3);
    let W, Z, mt, ht;
    if (lt) {
      const Ue = un[lt];
      W = Ue.vertexShader, Z = Ue.fragmentShader;
    } else
      W = v.vertexShader, Z = v.fragmentShader, c.update(v), mt = c.getVertexShaderID(v), ht = c.getFragmentShaderID(v);
    const Pt = i.getRenderTarget(), Et = H.isInstancedMesh === !0, kt = H.isBatchedMesh === !0, te = !!v.map, zt = !!v.matcap, C = !!G, ke = !!v.aoMap, Ft = !!v.lightMap, Vt = !!v.bumpMap, Tt = !!v.normalMap, re = !!v.displacementMap, Rt = !!v.emissiveMap, T = !!v.metalnessMap, x = !!v.roughnessMap, U = v.anisotropy > 0, $ = v.clearcoat > 0, K = v.dispersion > 0, X = v.iridescence > 0, vt = v.sheen > 0, it = v.transmission > 0, ut = U && !!v.anisotropyMap, Gt = $ && !!v.clearcoatMap, J = $ && !!v.clearcoatNormalMap, dt = $ && !!v.clearcoatRoughnessMap, At = X && !!v.iridescenceMap, wt = X && !!v.iridescenceThicknessMap, ft = vt && !!v.sheenColorMap, Bt = vt && !!v.sheenRoughnessMap, Lt = !!v.specularMap, ne = !!v.specularColorMap, P = !!v.specularIntensityMap, ot = it && !!v.transmissionMap, V = it && !!v.thicknessMap, q = !!v.gradientMap, st = !!v.alphaMap, at = v.alphaTest > 0, Ht = !!v.alphaHash, pe = !!v.extensions;
    let Ne = jn;
    v.toneMapped && (Pt === null || Pt.isXRRenderTarget === !0) && (Ne = i.toneMapping);
    const $t = {
      shaderID: lt,
      shaderType: v.type,
      shaderName: v.name,
      vertexShader: W,
      fragmentShader: Z,
      defines: v.defines,
      customVertexShaderID: mt,
      customFragmentShaderID: ht,
      isRawShaderMaterial: v.isRawShaderMaterial === !0,
      glslVersion: v.glslVersion,
      precision: g,
      batching: kt,
      batchingColor: kt && H._colorsTexture !== null,
      instancing: Et,
      instancingColor: Et && H.instanceColor !== null,
      instancingMorph: Et && H.morphTexture !== null,
      supportsVertexTextures: f,
      outputColorSpace: Pt === null ? i.outputColorSpace : Pt.isXRRenderTarget === !0 ? Pt.texture.colorSpace : be,
      alphaToCoverage: !!v.alphaToCoverage,
      map: te,
      matcap: zt,
      envMap: C,
      envMapMode: C && G.mapping,
      envMapCubeUVHeight: ct,
      aoMap: ke,
      lightMap: Ft,
      bumpMap: Vt,
      normalMap: Tt,
      displacementMap: f && re,
      emissiveMap: Rt,
      normalMapObjectSpace: Tt && v.normalMapType === uf,
      normalMapTangentSpace: Tt && v.normalMapType === cu,
      metalnessMap: T,
      roughnessMap: x,
      anisotropy: U,
      anisotropyMap: ut,
      clearcoat: $,
      clearcoatMap: Gt,
      clearcoatNormalMap: J,
      clearcoatRoughnessMap: dt,
      dispersion: K,
      iridescence: X,
      iridescenceMap: At,
      iridescenceThicknessMap: wt,
      sheen: vt,
      sheenColorMap: ft,
      sheenRoughnessMap: Bt,
      specularMap: Lt,
      specularColorMap: ne,
      specularIntensityMap: P,
      transmission: it,
      transmissionMap: ot,
      thicknessMap: V,
      gradientMap: q,
      opaque: v.transparent === !1 && v.blending === Wi && v.alphaToCoverage === !1,
      alphaMap: st,
      alphaTest: at,
      alphaHash: Ht,
      combine: v.combine,
      //
      mapUv: te && p(v.map.channel),
      aoMapUv: ke && p(v.aoMap.channel),
      lightMapUv: Ft && p(v.lightMap.channel),
      bumpMapUv: Vt && p(v.bumpMap.channel),
      normalMapUv: Tt && p(v.normalMap.channel),
      displacementMapUv: re && p(v.displacementMap.channel),
      emissiveMapUv: Rt && p(v.emissiveMap.channel),
      metalnessMapUv: T && p(v.metalnessMap.channel),
      roughnessMapUv: x && p(v.roughnessMap.channel),
      anisotropyMapUv: ut && p(v.anisotropyMap.channel),
      clearcoatMapUv: Gt && p(v.clearcoatMap.channel),
      clearcoatNormalMapUv: J && p(v.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: dt && p(v.clearcoatRoughnessMap.channel),
      iridescenceMapUv: At && p(v.iridescenceMap.channel),
      iridescenceThicknessMapUv: wt && p(v.iridescenceThicknessMap.channel),
      sheenColorMapUv: ft && p(v.sheenColorMap.channel),
      sheenRoughnessMapUv: Bt && p(v.sheenRoughnessMap.channel),
      specularMapUv: Lt && p(v.specularMap.channel),
      specularColorMapUv: ne && p(v.specularColorMap.channel),
      specularIntensityMapUv: P && p(v.specularIntensityMap.channel),
      transmissionMapUv: ot && p(v.transmissionMap.channel),
      thicknessMapUv: V && p(v.thicknessMap.channel),
      alphaMapUv: st && p(v.alphaMap.channel),
      //
      vertexTangents: !!z.attributes.tangent && (Tt || U),
      vertexColors: v.vertexColors,
      vertexAlphas: v.vertexColors === !0 && !!z.attributes.color && z.attributes.color.itemSize === 4,
      pointsUvs: H.isPoints === !0 && !!z.attributes.uv && (te || st),
      fog: !!j,
      useFog: v.fog === !0,
      fogExp2: !!j && j.isFogExp2,
      flatShading: v.flatShading === !0,
      sizeAttenuation: v.sizeAttenuation === !0,
      logarithmicDepthBuffer: u,
      reverseDepthBuffer: d,
      skinning: H.isSkinnedMesh === !0,
      morphTargets: z.morphAttributes.position !== void 0,
      morphNormals: z.morphAttributes.normal !== void 0,
      morphColors: z.morphAttributes.color !== void 0,
      morphTargetsCount: Xt,
      morphTextureStride: Kt,
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
      shadowMapEnabled: i.shadowMap.enabled && k.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: Ne,
      decodeVideoTexture: te && v.map.isVideoTexture === !0 && Wt.getTransfer(v.map.colorSpace) === ae,
      premultipliedAlpha: v.premultipliedAlpha,
      doubleSided: v.side === on,
      flipSided: v.side === Fe,
      useDepthPacking: v.depthPacking >= 0,
      depthPacking: v.depthPacking || 0,
      index0AttributeName: v.index0AttributeName,
      extensionClipCullDistance: pe && v.extensions.clipCullDistance === !0 && n.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (pe && v.extensions.multiDraw === !0 || kt) && n.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: v.customProgramCacheKey()
    };
    return $t.vertexUv1s = l.has(1), $t.vertexUv2s = l.has(2), $t.vertexUv3s = l.has(3), l.clear(), $t;
  }
  function b(v) {
    const E = [];
    if (v.shaderID ? E.push(v.shaderID) : (E.push(v.customVertexShaderID), E.push(v.customFragmentShaderID)), v.defines !== void 0)
      for (const k in v.defines)
        E.push(k), E.push(v.defines[k]);
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
    let k;
    if (E) {
      const B = un[E];
      k = np.clone(B.uniforms);
    } else
      k = v.uniforms;
    return k;
  }
  function R(v, E) {
    let k;
    for (let B = 0, H = h.length; B < H; B++) {
      const j = h[B];
      if (j.cacheKey === E) {
        k = j, ++k.usedTimes;
        break;
      }
    }
    return k === void 0 && (k = new m0(i, E, v, r), h.push(k)), k;
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
    getProgramCacheKey: b,
    getUniforms: D,
    acquireProgram: R,
    releaseProgram: A,
    releaseShaderCache: N,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: h,
    dispose: Y
  };
}
function y0() {
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
function M0(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.material.id !== t.material.id ? i.material.id - t.material.id : i.z !== t.z ? i.z - t.z : i.id - t.id;
}
function Wl(i, t) {
  return i.groupOrder !== t.groupOrder ? i.groupOrder - t.groupOrder : i.renderOrder !== t.renderOrder ? i.renderOrder - t.renderOrder : i.z !== t.z ? t.z - i.z : i.id - t.id;
}
function Xl() {
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
    e.length > 1 && e.sort(u || M0), n.length > 1 && n.sort(d || Wl), s.length > 1 && s.sort(d || Wl);
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
function S0() {
  let i = /* @__PURE__ */ new WeakMap();
  function t(n, s) {
    const r = i.get(n);
    let o;
    return r === void 0 ? (o = new Xl(), i.set(n, [o])) : s >= r.length ? (o = new Xl(), r.push(o)) : o = r[s], o;
  }
  function e() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: e
  };
}
function E0() {
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
            color: new Mt()
          };
          break;
        case "SpotLight":
          e = {
            position: new w(),
            direction: new w(),
            color: new Mt(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          e = {
            position: new w(),
            color: new Mt(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          e = {
            direction: new w(),
            skyColor: new Mt(),
            groundColor: new Mt()
          };
          break;
        case "RectAreaLight":
          e = {
            color: new Mt(),
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
function b0() {
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
            shadowMapSize: new et()
          };
          break;
        case "SpotLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new et()
          };
          break;
        case "PointLight":
          e = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new et(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[t.id] = e, e;
    }
  };
}
let T0 = 0;
function A0(i, t) {
  return (t.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (i.map ? 1 : 0);
}
function w0(i) {
  const t = new E0(), e = b0(), n = {
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
  const s = new w(), r = new Ct(), o = new Ct();
  function a(l) {
    let h = 0, u = 0, d = 0;
    for (let Y = 0; Y < 9; Y++) n.probe[Y].set(0, 0, 0);
    let f = 0, g = 0, _ = 0, p = 0, m = 0, b = 0, y = 0, S = 0, D = 0, R = 0, A = 0;
    l.sort(A0);
    for (let Y = 0, v = l.length; Y < v; Y++) {
      const E = l[Y], k = E.color, B = E.intensity, H = E.distance, j = E.shadow && E.shadow.map ? E.shadow.map.texture : null;
      if (E.isAmbientLight)
        h += k.r * B, u += k.g * B, d += k.b * B;
      else if (E.isLightProbe) {
        for (let z = 0; z < 9; z++)
          n.probe[z].addScaledVector(E.sh.coefficients[z], B);
        A++;
      } else if (E.isDirectionalLight) {
        const z = t.get(E);
        if (z.color.copy(E.color).multiplyScalar(E.intensity), E.castShadow) {
          const Q = E.shadow, G = e.get(E);
          G.shadowIntensity = Q.intensity, G.shadowBias = Q.bias, G.shadowNormalBias = Q.normalBias, G.shadowRadius = Q.radius, G.shadowMapSize = Q.mapSize, n.directionalShadow[f] = G, n.directionalShadowMap[f] = j, n.directionalShadowMatrix[f] = E.shadow.matrix, b++;
        }
        n.directional[f] = z, f++;
      } else if (E.isSpotLight) {
        const z = t.get(E);
        z.position.setFromMatrixPosition(E.matrixWorld), z.color.copy(k).multiplyScalar(B), z.distance = H, z.coneCos = Math.cos(E.angle), z.penumbraCos = Math.cos(E.angle * (1 - E.penumbra)), z.decay = E.decay, n.spot[_] = z;
        const Q = E.shadow;
        if (E.map && (n.spotLightMap[D] = E.map, D++, Q.updateMatrices(E), E.castShadow && R++), n.spotLightMatrix[_] = Q.matrix, E.castShadow) {
          const G = e.get(E);
          G.shadowIntensity = Q.intensity, G.shadowBias = Q.bias, G.shadowNormalBias = Q.normalBias, G.shadowRadius = Q.radius, G.shadowMapSize = Q.mapSize, n.spotShadow[_] = G, n.spotShadowMap[_] = j, S++;
        }
        _++;
      } else if (E.isRectAreaLight) {
        const z = t.get(E);
        z.color.copy(k).multiplyScalar(B), z.halfWidth.set(E.width * 0.5, 0, 0), z.halfHeight.set(0, E.height * 0.5, 0), n.rectArea[p] = z, p++;
      } else if (E.isPointLight) {
        const z = t.get(E);
        if (z.color.copy(E.color).multiplyScalar(E.intensity), z.distance = E.distance, z.decay = E.decay, E.castShadow) {
          const Q = E.shadow, G = e.get(E);
          G.shadowIntensity = Q.intensity, G.shadowBias = Q.bias, G.shadowNormalBias = Q.normalBias, G.shadowRadius = Q.radius, G.shadowMapSize = Q.mapSize, G.shadowCameraNear = Q.camera.near, G.shadowCameraFar = Q.camera.far, n.pointShadow[g] = G, n.pointShadowMap[g] = j, n.pointShadowMatrix[g] = E.shadow.matrix, y++;
        }
        n.point[g] = z, g++;
      } else if (E.isHemisphereLight) {
        const z = t.get(E);
        z.skyColor.copy(E.color).multiplyScalar(B), z.groundColor.copy(E.groundColor).multiplyScalar(B), n.hemi[m] = z, m++;
      }
    }
    p > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = nt.LTC_FLOAT_1, n.rectAreaLTC2 = nt.LTC_FLOAT_2) : (n.rectAreaLTC1 = nt.LTC_HALF_1, n.rectAreaLTC2 = nt.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = u, n.ambient[2] = d;
    const N = n.hash;
    (N.directionalLength !== f || N.pointLength !== g || N.spotLength !== _ || N.rectAreaLength !== p || N.hemiLength !== m || N.numDirectionalShadows !== b || N.numPointShadows !== y || N.numSpotShadows !== S || N.numSpotMaps !== D || N.numLightProbes !== A) && (n.directional.length = f, n.spot.length = _, n.rectArea.length = p, n.point.length = g, n.hemi.length = m, n.directionalShadow.length = b, n.directionalShadowMap.length = b, n.pointShadow.length = y, n.pointShadowMap.length = y, n.spotShadow.length = S, n.spotShadowMap.length = S, n.directionalShadowMatrix.length = b, n.pointShadowMatrix.length = y, n.spotLightMatrix.length = S + D - R, n.spotLightMap.length = D, n.numSpotLightShadowsWithMaps = R, n.numLightProbes = A, N.directionalLength = f, N.pointLength = g, N.spotLength = _, N.rectAreaLength = p, N.hemiLength = m, N.numDirectionalShadows = b, N.numPointShadows = y, N.numSpotShadows = S, N.numSpotMaps = D, N.numLightProbes = A, n.version = T0++);
  }
  function c(l, h) {
    let u = 0, d = 0, f = 0, g = 0, _ = 0;
    const p = h.matrixWorldInverse;
    for (let m = 0, b = l.length; m < b; m++) {
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
function $l(i) {
  const t = new w0(i), e = [], n = [];
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
function R0(i) {
  let t = /* @__PURE__ */ new WeakMap();
  function e(s, r = 0) {
    const o = t.get(s);
    let a;
    return o === void 0 ? (a = new $l(i), t.set(s, [a])) : r >= o.length ? (a = new $l(i), o.push(a)) : a = o[r], a;
  }
  function n() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: n
  };
}
class C0 extends ln {
  constructor(t) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = lf, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this;
  }
}
class P0 extends ln {
  constructor(t) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this;
  }
}
const L0 = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, I0 = `uniform sampler2D shadow_pass;
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
function D0(i, t, e) {
  let n = new pc();
  const s = new et(), r = new et(), o = new qt(), a = new C0({ depthPacking: hf }), c = new P0(), l = {}, h = e.maxTextureSize, u = { [In]: Fe, [Fe]: In, [on]: on }, d = new Kn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new et() },
      radius: { value: 4 }
    },
    vertexShader: L0,
    fragmentShader: I0
  }), f = d.clone();
  f.defines.HORIZONTAL_PASS = 1;
  const g = new we();
  g.setAttribute(
    "position",
    new De(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const _ = new ge(g, d), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = qh;
  let m = this.type;
  this.render = function(R, A, N) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || R.length === 0) return;
    const Y = i.getRenderTarget(), v = i.getActiveCubeFace(), E = i.getActiveMipmapLevel(), k = i.state;
    k.setBlending(Yn), k.buffers.color.setClear(1, 1, 1, 1), k.buffers.depth.setTest(!0), k.setScissorTest(!1);
    const B = m !== wn && this.type === wn, H = m === wn && this.type !== wn;
    for (let j = 0, z = R.length; j < z; j++) {
      const Q = R[j], G = Q.shadow;
      if (G === void 0) {
        console.warn("THREE.WebGLShadowMap:", Q, "has no shadow.");
        continue;
      }
      if (G.autoUpdate === !1 && G.needsUpdate === !1) continue;
      s.copy(G.mapSize);
      const ct = G.getFrameExtents();
      if (s.multiply(ct), r.copy(G.mapSize), (s.x > h || s.y > h) && (s.x > h && (r.x = Math.floor(h / ct.x), s.x = r.x * ct.x, G.mapSize.x = r.x), s.y > h && (r.y = Math.floor(h / ct.y), s.y = r.y * ct.y, G.mapSize.y = r.y)), G.map === null || B === !0 || H === !0) {
        const _t = this.type !== wn ? { minFilter: Ie, magFilter: Ie } : {};
        G.map !== null && G.map.dispose(), G.map = new mi(s.x, s.y, _t), G.map.texture.name = Q.name + ".shadowMap", G.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(G.map), i.clear();
      const lt = G.getViewportCount();
      for (let _t = 0; _t < lt; _t++) {
        const Xt = G.getViewport(_t);
        o.set(
          r.x * Xt.x,
          r.y * Xt.y,
          r.x * Xt.z,
          r.y * Xt.w
        ), k.viewport(o), G.updateMatrices(Q, _t), n = G.getFrustum(), S(A, N, G.camera, Q, this.type);
      }
      G.isPointLightShadow !== !0 && this.type === wn && b(G, N), G.needsUpdate = !1;
    }
    m = this.type, p.needsUpdate = !1, i.setRenderTarget(Y, v, E);
  };
  function b(R, A) {
    const N = t.update(_);
    d.defines.VSM_SAMPLES !== R.blurSamples && (d.defines.VSM_SAMPLES = R.blurSamples, f.defines.VSM_SAMPLES = R.blurSamples, d.needsUpdate = !0, f.needsUpdate = !0), R.mapPass === null && (R.mapPass = new mi(s.x, s.y)), d.uniforms.shadow_pass.value = R.map.texture, d.uniforms.resolution.value = R.mapSize, d.uniforms.radius.value = R.radius, i.setRenderTarget(R.mapPass), i.clear(), i.renderBufferDirect(A, null, N, d, _, null), f.uniforms.shadow_pass.value = R.mapPass.texture, f.uniforms.resolution.value = R.mapSize, f.uniforms.radius.value = R.radius, i.setRenderTarget(R.map), i.clear(), i.renderBufferDirect(A, null, N, f, _, null);
  }
  function y(R, A, N, Y) {
    let v = null;
    const E = N.isPointLight === !0 ? R.customDistanceMaterial : R.customDepthMaterial;
    if (E !== void 0)
      v = E;
    else if (v = N.isPointLight === !0 ? c : a, i.localClippingEnabled && A.clipShadows === !0 && Array.isArray(A.clippingPlanes) && A.clippingPlanes.length !== 0 || A.displacementMap && A.displacementScale !== 0 || A.alphaMap && A.alphaTest > 0 || A.map && A.alphaTest > 0) {
      const k = v.uuid, B = A.uuid;
      let H = l[k];
      H === void 0 && (H = {}, l[k] = H);
      let j = H[B];
      j === void 0 && (j = v.clone(), H[B] = j, A.addEventListener("dispose", D)), v = j;
    }
    if (v.visible = A.visible, v.wireframe = A.wireframe, Y === wn ? v.side = A.shadowSide !== null ? A.shadowSide : A.side : v.side = A.shadowSide !== null ? A.shadowSide : u[A.side], v.alphaMap = A.alphaMap, v.alphaTest = A.alphaTest, v.map = A.map, v.clipShadows = A.clipShadows, v.clippingPlanes = A.clippingPlanes, v.clipIntersection = A.clipIntersection, v.displacementMap = A.displacementMap, v.displacementScale = A.displacementScale, v.displacementBias = A.displacementBias, v.wireframeLinewidth = A.wireframeLinewidth, v.linewidth = A.linewidth, N.isPointLight === !0 && v.isMeshDistanceMaterial === !0) {
      const k = i.properties.get(v);
      k.light = N;
    }
    return v;
  }
  function S(R, A, N, Y, v) {
    if (R.visible === !1) return;
    if (R.layers.test(A.layers) && (R.isMesh || R.isLine || R.isPoints) && (R.castShadow || R.receiveShadow && v === wn) && (!R.frustumCulled || n.intersectsObject(R))) {
      R.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse, R.matrixWorld);
      const B = t.update(R), H = R.material;
      if (Array.isArray(H)) {
        const j = B.groups;
        for (let z = 0, Q = j.length; z < Q; z++) {
          const G = j[z], ct = H[G.materialIndex];
          if (ct && ct.visible) {
            const lt = y(R, ct, Y, v);
            R.onBeforeShadow(i, R, A, N, B, lt, G), i.renderBufferDirect(N, null, B, lt, R, G), R.onAfterShadow(i, R, A, N, B, lt, G);
          }
        }
      } else if (H.visible) {
        const j = y(R, H, Y, v);
        R.onBeforeShadow(i, R, A, N, B, j, null), i.renderBufferDirect(N, null, B, j, R, null), R.onAfterShadow(i, R, A, N, B, j, null);
      }
    }
    const k = R.children;
    for (let B = 0, H = k.length; B < H; B++)
      S(k[B], A, N, Y, v);
  }
  function D(R) {
    R.target.removeEventListener("dispose", D);
    for (const N in l) {
      const Y = l[N], v = R.target.uuid;
      v in Y && (Y[v].dispose(), delete Y[v]);
    }
  }
}
const N0 = {
  [sa]: ra,
  [oa]: la,
  [aa]: ha,
  [Zi]: ca,
  [ra]: sa,
  [la]: oa,
  [ha]: aa,
  [ca]: Zi
};
function U0(i) {
  function t() {
    let P = !1;
    const ot = new qt();
    let V = null;
    const q = new qt(0, 0, 0, 0);
    return {
      setMask: function(st) {
        V !== st && !P && (i.colorMask(st, st, st, st), V = st);
      },
      setLocked: function(st) {
        P = st;
      },
      setClear: function(st, at, Ht, pe, Ne) {
        Ne === !0 && (st *= pe, at *= pe, Ht *= pe), ot.set(st, at, Ht, pe), q.equals(ot) === !1 && (i.clearColor(st, at, Ht, pe), q.copy(ot));
      },
      reset: function() {
        P = !1, V = null, q.set(-1, 0, 0, 0);
      }
    };
  }
  function e() {
    let P = !1, ot = !1, V = null, q = null, st = null;
    return {
      setReversed: function(at) {
        ot = at;
      },
      setTest: function(at) {
        at ? mt(i.DEPTH_TEST) : ht(i.DEPTH_TEST);
      },
      setMask: function(at) {
        V !== at && !P && (i.depthMask(at), V = at);
      },
      setFunc: function(at) {
        if (ot && (at = N0[at]), q !== at) {
          switch (at) {
            case sa:
              i.depthFunc(i.NEVER);
              break;
            case ra:
              i.depthFunc(i.ALWAYS);
              break;
            case oa:
              i.depthFunc(i.LESS);
              break;
            case Zi:
              i.depthFunc(i.LEQUAL);
              break;
            case aa:
              i.depthFunc(i.EQUAL);
              break;
            case ca:
              i.depthFunc(i.GEQUAL);
              break;
            case la:
              i.depthFunc(i.GREATER);
              break;
            case ha:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          q = at;
        }
      },
      setLocked: function(at) {
        P = at;
      },
      setClear: function(at) {
        st !== at && (i.clearDepth(at), st = at);
      },
      reset: function() {
        P = !1, V = null, q = null, st = null;
      }
    };
  }
  function n() {
    let P = !1, ot = null, V = null, q = null, st = null, at = null, Ht = null, pe = null, Ne = null;
    return {
      setTest: function($t) {
        P || ($t ? mt(i.STENCIL_TEST) : ht(i.STENCIL_TEST));
      },
      setMask: function($t) {
        ot !== $t && !P && (i.stencilMask($t), ot = $t);
      },
      setFunc: function($t, Ue, xn) {
        (V !== $t || q !== Ue || st !== xn) && (i.stencilFunc($t, Ue, xn), V = $t, q = Ue, st = xn);
      },
      setOp: function($t, Ue, xn) {
        (at !== $t || Ht !== Ue || pe !== xn) && (i.stencilOp($t, Ue, xn), at = $t, Ht = Ue, pe = xn);
      },
      setLocked: function($t) {
        P = $t;
      },
      setClear: function($t) {
        Ne !== $t && (i.clearStencil($t), Ne = $t);
      },
      reset: function() {
        P = !1, ot = null, V = null, q = null, st = null, at = null, Ht = null, pe = null, Ne = null;
      }
    };
  }
  const s = new t(), r = new e(), o = new n(), a = /* @__PURE__ */ new WeakMap(), c = /* @__PURE__ */ new WeakMap();
  let l = {}, h = {}, u = /* @__PURE__ */ new WeakMap(), d = [], f = null, g = !1, _ = null, p = null, m = null, b = null, y = null, S = null, D = null, R = new Mt(0, 0, 0), A = 0, N = !1, Y = null, v = null, E = null, k = null, B = null;
  const H = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let j = !1, z = 0;
  const Q = i.getParameter(i.VERSION);
  Q.indexOf("WebGL") !== -1 ? (z = parseFloat(/^WebGL (\d)/.exec(Q)[1]), j = z >= 1) : Q.indexOf("OpenGL ES") !== -1 && (z = parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]), j = z >= 2);
  let G = null, ct = {};
  const lt = i.getParameter(i.SCISSOR_BOX), _t = i.getParameter(i.VIEWPORT), Xt = new qt().fromArray(lt), Kt = new qt().fromArray(_t);
  function W(P, ot, V, q) {
    const st = new Uint8Array(4), at = i.createTexture();
    i.bindTexture(P, at), i.texParameteri(P, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(P, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Ht = 0; Ht < V; Ht++)
      P === i.TEXTURE_3D || P === i.TEXTURE_2D_ARRAY ? i.texImage3D(ot, 0, i.RGBA, 1, 1, q, 0, i.RGBA, i.UNSIGNED_BYTE, st) : i.texImage2D(ot + Ht, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, st);
    return at;
  }
  const Z = {};
  Z[i.TEXTURE_2D] = W(i.TEXTURE_2D, i.TEXTURE_2D, 1), Z[i.TEXTURE_CUBE_MAP] = W(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), Z[i.TEXTURE_2D_ARRAY] = W(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), Z[i.TEXTURE_3D] = W(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), r.setClear(1), o.setClear(0), mt(i.DEPTH_TEST), r.setFunc(Zi), Ft(!1), Vt(Kc), mt(i.CULL_FACE), C(Yn);
  function mt(P) {
    l[P] !== !0 && (i.enable(P), l[P] = !0);
  }
  function ht(P) {
    l[P] !== !1 && (i.disable(P), l[P] = !1);
  }
  function Pt(P, ot) {
    return h[P] !== ot ? (i.bindFramebuffer(P, ot), h[P] = ot, P === i.DRAW_FRAMEBUFFER && (h[i.FRAMEBUFFER] = ot), P === i.FRAMEBUFFER && (h[i.DRAW_FRAMEBUFFER] = ot), !0) : !1;
  }
  function Et(P, ot) {
    let V = d, q = !1;
    if (P) {
      V = u.get(ot), V === void 0 && (V = [], u.set(ot, V));
      const st = P.textures;
      if (V.length !== st.length || V[0] !== i.COLOR_ATTACHMENT0) {
        for (let at = 0, Ht = st.length; at < Ht; at++)
          V[at] = i.COLOR_ATTACHMENT0 + at;
        V.length = st.length, q = !0;
      }
    } else
      V[0] !== i.BACK && (V[0] = i.BACK, q = !0);
    q && i.drawBuffers(V);
  }
  function kt(P) {
    return f !== P ? (i.useProgram(P), f = P, !0) : !1;
  }
  const te = {
    [hi]: i.FUNC_ADD,
    [Dd]: i.FUNC_SUBTRACT,
    [Nd]: i.FUNC_REVERSE_SUBTRACT
  };
  te[Ud] = i.MIN, te[Od] = i.MAX;
  const zt = {
    [Fd]: i.ZERO,
    [Bd]: i.ONE,
    [kd]: i.SRC_COLOR,
    [na]: i.SRC_ALPHA,
    [Xd]: i.SRC_ALPHA_SATURATE,
    [Gd]: i.DST_COLOR,
    [Hd]: i.DST_ALPHA,
    [zd]: i.ONE_MINUS_SRC_COLOR,
    [ia]: i.ONE_MINUS_SRC_ALPHA,
    [Wd]: i.ONE_MINUS_DST_COLOR,
    [Vd]: i.ONE_MINUS_DST_ALPHA,
    [$d]: i.CONSTANT_COLOR,
    [qd]: i.ONE_MINUS_CONSTANT_COLOR,
    [Yd]: i.CONSTANT_ALPHA,
    [jd]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function C(P, ot, V, q, st, at, Ht, pe, Ne, $t) {
    if (P === Yn) {
      g === !0 && (ht(i.BLEND), g = !1);
      return;
    }
    if (g === !1 && (mt(i.BLEND), g = !0), P !== Id) {
      if (P !== _ || $t !== N) {
        if ((p !== hi || y !== hi) && (i.blendEquation(i.FUNC_ADD), p = hi, y = hi), $t)
          switch (P) {
            case Wi:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case Zc:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case Jc:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case Qc:
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
            case Zc:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case Jc:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case Qc:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", P);
              break;
          }
        m = null, b = null, S = null, D = null, R.set(0, 0, 0), A = 0, _ = P, N = $t;
      }
      return;
    }
    st = st || ot, at = at || V, Ht = Ht || q, (ot !== p || st !== y) && (i.blendEquationSeparate(te[ot], te[st]), p = ot, y = st), (V !== m || q !== b || at !== S || Ht !== D) && (i.blendFuncSeparate(zt[V], zt[q], zt[at], zt[Ht]), m = V, b = q, S = at, D = Ht), (pe.equals(R) === !1 || Ne !== A) && (i.blendColor(pe.r, pe.g, pe.b, Ne), R.copy(pe), A = Ne), _ = P, N = !1;
  }
  function ke(P, ot) {
    P.side === on ? ht(i.CULL_FACE) : mt(i.CULL_FACE);
    let V = P.side === Fe;
    ot && (V = !V), Ft(V), P.blending === Wi && P.transparent === !1 ? C(Yn) : C(P.blending, P.blendEquation, P.blendSrc, P.blendDst, P.blendEquationAlpha, P.blendSrcAlpha, P.blendDstAlpha, P.blendColor, P.blendAlpha, P.premultipliedAlpha), r.setFunc(P.depthFunc), r.setTest(P.depthTest), r.setMask(P.depthWrite), s.setMask(P.colorWrite);
    const q = P.stencilWrite;
    o.setTest(q), q && (o.setMask(P.stencilWriteMask), o.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask), o.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)), re(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits), P.alphaToCoverage === !0 ? mt(i.SAMPLE_ALPHA_TO_COVERAGE) : ht(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Ft(P) {
    Y !== P && (P ? i.frontFace(i.CW) : i.frontFace(i.CCW), Y = P);
  }
  function Vt(P) {
    P !== Pd ? (mt(i.CULL_FACE), P !== v && (P === Kc ? i.cullFace(i.BACK) : P === Ld ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : ht(i.CULL_FACE), v = P;
  }
  function Tt(P) {
    P !== E && (j && i.lineWidth(P), E = P);
  }
  function re(P, ot, V) {
    P ? (mt(i.POLYGON_OFFSET_FILL), (k !== ot || B !== V) && (i.polygonOffset(ot, V), k = ot, B = V)) : ht(i.POLYGON_OFFSET_FILL);
  }
  function Rt(P) {
    P ? mt(i.SCISSOR_TEST) : ht(i.SCISSOR_TEST);
  }
  function T(P) {
    P === void 0 && (P = i.TEXTURE0 + H - 1), G !== P && (i.activeTexture(P), G = P);
  }
  function x(P, ot, V) {
    V === void 0 && (G === null ? V = i.TEXTURE0 + H - 1 : V = G);
    let q = ct[V];
    q === void 0 && (q = { type: void 0, texture: void 0 }, ct[V] = q), (q.type !== P || q.texture !== ot) && (G !== V && (i.activeTexture(V), G = V), i.bindTexture(P, ot || Z[P]), q.type = P, q.texture = ot);
  }
  function U() {
    const P = ct[G];
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
  function vt() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function it() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function ut() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function Gt() {
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
  function dt() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function At() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (P) {
      console.error("THREE.WebGLState:", P);
    }
  }
  function wt(P) {
    Xt.equals(P) === !1 && (i.scissor(P.x, P.y, P.z, P.w), Xt.copy(P));
  }
  function ft(P) {
    Kt.equals(P) === !1 && (i.viewport(P.x, P.y, P.z, P.w), Kt.copy(P));
  }
  function Bt(P, ot) {
    let V = c.get(ot);
    V === void 0 && (V = /* @__PURE__ */ new WeakMap(), c.set(ot, V));
    let q = V.get(P);
    q === void 0 && (q = i.getUniformBlockIndex(ot, P.name), V.set(P, q));
  }
  function Lt(P, ot) {
    const q = c.get(ot).get(P);
    a.get(ot) !== q && (i.uniformBlockBinding(ot, q, P.__bindingPointIndex), a.set(ot, q));
  }
  function ne() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), l = {}, G = null, ct = {}, h = {}, u = /* @__PURE__ */ new WeakMap(), d = [], f = null, g = !1, _ = null, p = null, m = null, b = null, y = null, S = null, D = null, R = new Mt(0, 0, 0), A = 0, N = !1, Y = null, v = null, E = null, k = null, B = null, Xt.set(0, 0, i.canvas.width, i.canvas.height), Kt.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), r.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: r,
      stencil: o
    },
    enable: mt,
    disable: ht,
    bindFramebuffer: Pt,
    drawBuffers: Et,
    useProgram: kt,
    setBlending: C,
    setMaterial: ke,
    setFlipSided: Ft,
    setCullFace: Vt,
    setLineWidth: Tt,
    setPolygonOffset: re,
    setScissorTest: Rt,
    activeTexture: T,
    bindTexture: x,
    unbindTexture: U,
    compressedTexImage2D: $,
    compressedTexImage3D: K,
    texImage2D: dt,
    texImage3D: At,
    updateUBOMapping: Bt,
    uniformBlockBinding: Lt,
    texStorage2D: Gt,
    texStorage3D: J,
    texSubImage2D: X,
    texSubImage3D: vt,
    compressedTexSubImage2D: it,
    compressedTexSubImage3D: ut,
    scissor: wt,
    viewport: ft,
    reset: ne
  };
}
function ql(i, t, e, n) {
  const s = O0(n);
  switch (e) {
    case eu:
      return i * t;
    case iu:
      return i * t;
    case su:
      return i * t * 2;
    case ac:
      return i * t / s.components * s.byteLength;
    case cc:
      return i * t / s.components * s.byteLength;
    case ru:
      return i * t * 2 / s.components * s.byteLength;
    case lc:
      return i * t * 2 / s.components * s.byteLength;
    case nu:
      return i * t * 3 / s.components * s.byteLength;
    case Ke:
      return i * t * 4 / s.components * s.byteLength;
    case hc:
      return i * t * 4 / s.components * s.byteLength;
    case kr:
    case zr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case Hr:
    case Vr:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case pa:
    case ga:
      return Math.max(i, 16) * Math.max(t, 8) / 4;
    case fa:
    case ma:
      return Math.max(i, 8) * Math.max(t, 8) / 2;
    case _a:
    case va:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 8;
    case xa:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case ya:
      return Math.floor((i + 3) / 4) * Math.floor((t + 3) / 4) * 16;
    case Ma:
      return Math.floor((i + 4) / 5) * Math.floor((t + 3) / 4) * 16;
    case Sa:
      return Math.floor((i + 4) / 5) * Math.floor((t + 4) / 5) * 16;
    case Ea:
      return Math.floor((i + 5) / 6) * Math.floor((t + 4) / 5) * 16;
    case ba:
      return Math.floor((i + 5) / 6) * Math.floor((t + 5) / 6) * 16;
    case Ta:
      return Math.floor((i + 7) / 8) * Math.floor((t + 4) / 5) * 16;
    case Aa:
      return Math.floor((i + 7) / 8) * Math.floor((t + 5) / 6) * 16;
    case wa:
      return Math.floor((i + 7) / 8) * Math.floor((t + 7) / 8) * 16;
    case Ra:
      return Math.floor((i + 9) / 10) * Math.floor((t + 4) / 5) * 16;
    case Ca:
      return Math.floor((i + 9) / 10) * Math.floor((t + 5) / 6) * 16;
    case Pa:
      return Math.floor((i + 9) / 10) * Math.floor((t + 7) / 8) * 16;
    case La:
      return Math.floor((i + 9) / 10) * Math.floor((t + 9) / 10) * 16;
    case Ia:
      return Math.floor((i + 11) / 12) * Math.floor((t + 9) / 10) * 16;
    case Da:
      return Math.floor((i + 11) / 12) * Math.floor((t + 11) / 12) * 16;
    case Gr:
    case Na:
    case Ua:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
    case ou:
    case Oa:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 8;
    case Fa:
    case Ba:
      return Math.ceil(i / 4) * Math.ceil(t / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${e} format.`
  );
}
function O0(i) {
  switch (i) {
    case Dn:
    case Jh:
      return { byteLength: 1, components: 1 };
    case zs:
    case Qh:
    case js:
      return { byteLength: 2, components: 1 };
    case rc:
    case oc:
      return { byteLength: 2, components: 4 };
    case pi:
    case sc:
    case cn:
      return { byteLength: 4, components: 1 };
    case tu:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${i}.`);
}
function F0(i, t, e, n, s, r, o) {
  const a = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new et(), h = /* @__PURE__ */ new WeakMap();
  let u;
  const d = /* @__PURE__ */ new WeakMap();
  let f = !1;
  try {
    f = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(T, x) {
    return f ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(T, x)
    ) : Gs("canvas");
  }
  function _(T, x, U) {
    let $ = 1;
    const K = Rt(T);
    if ((K.width > U || K.height > U) && ($ = U / Math.max(K.width, K.height)), $ < 1)
      if (typeof HTMLImageElement < "u" && T instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && T instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && T instanceof ImageBitmap || typeof VideoFrame < "u" && T instanceof VideoFrame) {
        const X = Math.floor($ * K.width), vt = Math.floor($ * K.height);
        u === void 0 && (u = g(X, vt));
        const it = x ? g(X, vt) : u;
        return it.width = X, it.height = vt, it.getContext("2d").drawImage(T, 0, 0, X, vt), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + K.width + "x" + K.height + ") to (" + X + "x" + vt + ")."), it;
      } else
        return "data" in T && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + K.width + "x" + K.height + ")."), T;
    return T;
  }
  function p(T) {
    return T.generateMipmaps && T.minFilter !== Ie && T.minFilter !== We;
  }
  function m(T) {
    i.generateMipmap(T);
  }
  function b(T, x, U, $, K = !1) {
    if (T !== null) {
      if (i[T] !== void 0) return i[T];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + T + "'");
    }
    let X = x;
    if (x === i.RED && (U === i.FLOAT && (X = i.R32F), U === i.HALF_FLOAT && (X = i.R16F), U === i.UNSIGNED_BYTE && (X = i.R8)), x === i.RED_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.R8UI), U === i.UNSIGNED_SHORT && (X = i.R16UI), U === i.UNSIGNED_INT && (X = i.R32UI), U === i.BYTE && (X = i.R8I), U === i.SHORT && (X = i.R16I), U === i.INT && (X = i.R32I)), x === i.RG && (U === i.FLOAT && (X = i.RG32F), U === i.HALF_FLOAT && (X = i.RG16F), U === i.UNSIGNED_BYTE && (X = i.RG8)), x === i.RG_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.RG8UI), U === i.UNSIGNED_SHORT && (X = i.RG16UI), U === i.UNSIGNED_INT && (X = i.RG32UI), U === i.BYTE && (X = i.RG8I), U === i.SHORT && (X = i.RG16I), U === i.INT && (X = i.RG32I)), x === i.RGB_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.RGB8UI), U === i.UNSIGNED_SHORT && (X = i.RGB16UI), U === i.UNSIGNED_INT && (X = i.RGB32UI), U === i.BYTE && (X = i.RGB8I), U === i.SHORT && (X = i.RGB16I), U === i.INT && (X = i.RGB32I)), x === i.RGBA_INTEGER && (U === i.UNSIGNED_BYTE && (X = i.RGBA8UI), U === i.UNSIGNED_SHORT && (X = i.RGBA16UI), U === i.UNSIGNED_INT && (X = i.RGBA32UI), U === i.BYTE && (X = i.RGBA8I), U === i.SHORT && (X = i.RGBA16I), U === i.INT && (X = i.RGBA32I)), x === i.RGB && U === i.UNSIGNED_INT_5_9_9_9_REV && (X = i.RGB9_E5), x === i.RGBA) {
      const vt = K ? jr : Wt.getTransfer($);
      U === i.FLOAT && (X = i.RGBA32F), U === i.HALF_FLOAT && (X = i.RGBA16F), U === i.UNSIGNED_BYTE && (X = vt === ae ? i.SRGB8_ALPHA8 : i.RGBA8), U === i.UNSIGNED_SHORT_4_4_4_4 && (X = i.RGBA4), U === i.UNSIGNED_SHORT_5_5_5_1 && (X = i.RGB5_A1);
    }
    return (X === i.R16F || X === i.R32F || X === i.RG16F || X === i.RG32F || X === i.RGBA16F || X === i.RGBA32F) && t.get("EXT_color_buffer_float"), X;
  }
  function y(T, x) {
    let U;
    return T ? x === null || x === pi || x === es ? U = i.DEPTH24_STENCIL8 : x === cn ? U = i.DEPTH32F_STENCIL8 : x === zs && (U = i.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : x === null || x === pi || x === es ? U = i.DEPTH_COMPONENT24 : x === cn ? U = i.DEPTH_COMPONENT32F : x === zs && (U = i.DEPTH_COMPONENT16), U;
  }
  function S(T, x) {
    return p(T) === !0 || T.isFramebufferTexture && T.minFilter !== Ie && T.minFilter !== We ? Math.log2(Math.max(x.width, x.height)) + 1 : T.mipmaps !== void 0 && T.mipmaps.length > 0 ? T.mipmaps.length : T.isCompressedTexture && Array.isArray(T.image) ? x.mipmaps.length : 1;
  }
  function D(T) {
    const x = T.target;
    x.removeEventListener("dispose", D), A(x), x.isVideoTexture && h.delete(x);
  }
  function R(T) {
    const x = T.target;
    x.removeEventListener("dispose", R), Y(x);
  }
  function A(T) {
    const x = n.get(T);
    if (x.__webglInit === void 0) return;
    const U = T.source, $ = d.get(U);
    if ($) {
      const K = $[x.__cacheKey];
      K.usedTimes--, K.usedTimes === 0 && N(T), Object.keys($).length === 0 && d.delete(U);
    }
    n.remove(T);
  }
  function N(T) {
    const x = n.get(T);
    i.deleteTexture(x.__webglTexture);
    const U = T.source, $ = d.get(U);
    delete $[x.__cacheKey], o.memory.textures--;
  }
  function Y(T) {
    const x = n.get(T);
    if (T.depthTexture && T.depthTexture.dispose(), T.isWebGLCubeRenderTarget)
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
    const U = T.textures;
    for (let $ = 0, K = U.length; $ < K; $++) {
      const X = n.get(U[$]);
      X.__webglTexture && (i.deleteTexture(X.__webglTexture), o.memory.textures--), n.remove(U[$]);
    }
    n.remove(T);
  }
  let v = 0;
  function E() {
    v = 0;
  }
  function k() {
    const T = v;
    return T >= s.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + T + " texture units while this GPU supports only " + s.maxTextures), v += 1, T;
  }
  function B(T) {
    const x = [];
    return x.push(T.wrapS), x.push(T.wrapT), x.push(T.wrapR || 0), x.push(T.magFilter), x.push(T.minFilter), x.push(T.anisotropy), x.push(T.internalFormat), x.push(T.format), x.push(T.type), x.push(T.generateMipmaps), x.push(T.premultiplyAlpha), x.push(T.flipY), x.push(T.unpackAlignment), x.push(T.colorSpace), x.join();
  }
  function H(T, x) {
    const U = n.get(T);
    if (T.isVideoTexture && Tt(T), T.isRenderTargetTexture === !1 && T.version > 0 && U.__version !== T.version) {
      const $ = T.image;
      if ($ === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if ($.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        Kt(U, T, x);
        return;
      }
    }
    e.bindTexture(i.TEXTURE_2D, U.__webglTexture, i.TEXTURE0 + x);
  }
  function j(T, x) {
    const U = n.get(T);
    if (T.version > 0 && U.__version !== T.version) {
      Kt(U, T, x);
      return;
    }
    e.bindTexture(i.TEXTURE_2D_ARRAY, U.__webglTexture, i.TEXTURE0 + x);
  }
  function z(T, x) {
    const U = n.get(T);
    if (T.version > 0 && U.__version !== T.version) {
      Kt(U, T, x);
      return;
    }
    e.bindTexture(i.TEXTURE_3D, U.__webglTexture, i.TEXTURE0 + x);
  }
  function Q(T, x) {
    const U = n.get(T);
    if (T.version > 0 && U.__version !== T.version) {
      W(U, T, x);
      return;
    }
    e.bindTexture(i.TEXTURE_CUBE_MAP, U.__webglTexture, i.TEXTURE0 + x);
  }
  const G = {
    [ts]: i.REPEAT,
    [$n]: i.CLAMP_TO_EDGE,
    [Yr]: i.MIRRORED_REPEAT
  }, ct = {
    [Ie]: i.NEAREST,
    [Zh]: i.NEAREST_MIPMAP_NEAREST,
    [Rs]: i.NEAREST_MIPMAP_LINEAR,
    [We]: i.LINEAR,
    [Br]: i.LINEAR_MIPMAP_NEAREST,
    [Pn]: i.LINEAR_MIPMAP_LINEAR
  }, lt = {
    [df]: i.NEVER,
    [vf]: i.ALWAYS,
    [ff]: i.LESS,
    [lu]: i.LEQUAL,
    [pf]: i.EQUAL,
    [_f]: i.GEQUAL,
    [mf]: i.GREATER,
    [gf]: i.NOTEQUAL
  };
  function _t(T, x) {
    if (x.type === cn && t.has("OES_texture_float_linear") === !1 && (x.magFilter === We || x.magFilter === Br || x.magFilter === Rs || x.magFilter === Pn || x.minFilter === We || x.minFilter === Br || x.minFilter === Rs || x.minFilter === Pn) && console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(T, i.TEXTURE_WRAP_S, G[x.wrapS]), i.texParameteri(T, i.TEXTURE_WRAP_T, G[x.wrapT]), (T === i.TEXTURE_3D || T === i.TEXTURE_2D_ARRAY) && i.texParameteri(T, i.TEXTURE_WRAP_R, G[x.wrapR]), i.texParameteri(T, i.TEXTURE_MAG_FILTER, ct[x.magFilter]), i.texParameteri(T, i.TEXTURE_MIN_FILTER, ct[x.minFilter]), x.compareFunction && (i.texParameteri(T, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(T, i.TEXTURE_COMPARE_FUNC, lt[x.compareFunction])), t.has("EXT_texture_filter_anisotropic") === !0) {
      if (x.magFilter === Ie || x.minFilter !== Rs && x.minFilter !== Pn || x.type === cn && t.has("OES_texture_float_linear") === !1) return;
      if (x.anisotropy > 1 || n.get(x).__currentAnisotropy) {
        const U = t.get("EXT_texture_filter_anisotropic");
        i.texParameterf(T, U.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(x.anisotropy, s.getMaxAnisotropy())), n.get(x).__currentAnisotropy = x.anisotropy;
      }
    }
  }
  function Xt(T, x) {
    let U = !1;
    T.__webglInit === void 0 && (T.__webglInit = !0, x.addEventListener("dispose", D));
    const $ = x.source;
    let K = d.get($);
    K === void 0 && (K = {}, d.set($, K));
    const X = B(x);
    if (X !== T.__cacheKey) {
      K[X] === void 0 && (K[X] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, U = !0), K[X].usedTimes++;
      const vt = K[T.__cacheKey];
      vt !== void 0 && (K[T.__cacheKey].usedTimes--, vt.usedTimes === 0 && N(x)), T.__cacheKey = X, T.__webglTexture = K[X].texture;
    }
    return U;
  }
  function Kt(T, x, U) {
    let $ = i.TEXTURE_2D;
    (x.isDataArrayTexture || x.isCompressedArrayTexture) && ($ = i.TEXTURE_2D_ARRAY), x.isData3DTexture && ($ = i.TEXTURE_3D);
    const K = Xt(T, x), X = x.source;
    e.bindTexture($, T.__webglTexture, i.TEXTURE0 + U);
    const vt = n.get(X);
    if (X.version !== vt.__version || K === !0) {
      e.activeTexture(i.TEXTURE0 + U);
      const it = Wt.getPrimaries(Wt.workingColorSpace), ut = x.colorSpace === Wn ? null : Wt.getPrimaries(x.colorSpace), Gt = x.colorSpace === Wn || it === ut ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Gt);
      let J = _(x.image, !1, s.maxTextureSize);
      J = re(x, J);
      const dt = r.convert(x.format, x.colorSpace), At = r.convert(x.type);
      let wt = b(x.internalFormat, dt, At, x.colorSpace, x.isVideoTexture);
      _t($, x);
      let ft;
      const Bt = x.mipmaps, Lt = x.isVideoTexture !== !0, ne = vt.__version === void 0 || K === !0, P = X.dataReady, ot = S(x, J);
      if (x.isDepthTexture)
        wt = y(x.format === ns, x.type), ne && (Lt ? e.texStorage2D(i.TEXTURE_2D, 1, wt, J.width, J.height) : e.texImage2D(i.TEXTURE_2D, 0, wt, J.width, J.height, 0, dt, At, null));
      else if (x.isDataTexture)
        if (Bt.length > 0) {
          Lt && ne && e.texStorage2D(i.TEXTURE_2D, ot, wt, Bt[0].width, Bt[0].height);
          for (let V = 0, q = Bt.length; V < q; V++)
            ft = Bt[V], Lt ? P && e.texSubImage2D(i.TEXTURE_2D, V, 0, 0, ft.width, ft.height, dt, At, ft.data) : e.texImage2D(i.TEXTURE_2D, V, wt, ft.width, ft.height, 0, dt, At, ft.data);
          x.generateMipmaps = !1;
        } else
          Lt ? (ne && e.texStorage2D(i.TEXTURE_2D, ot, wt, J.width, J.height), P && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, J.width, J.height, dt, At, J.data)) : e.texImage2D(i.TEXTURE_2D, 0, wt, J.width, J.height, 0, dt, At, J.data);
      else if (x.isCompressedTexture)
        if (x.isCompressedArrayTexture) {
          Lt && ne && e.texStorage3D(i.TEXTURE_2D_ARRAY, ot, wt, Bt[0].width, Bt[0].height, J.depth);
          for (let V = 0, q = Bt.length; V < q; V++)
            if (ft = Bt[V], x.format !== Ke)
              if (dt !== null)
                if (Lt) {
                  if (P)
                    if (x.layerUpdates.size > 0) {
                      const st = ql(ft.width, ft.height, x.format, x.type);
                      for (const at of x.layerUpdates) {
                        const Ht = ft.data.subarray(
                          at * st / ft.data.BYTES_PER_ELEMENT,
                          (at + 1) * st / ft.data.BYTES_PER_ELEMENT
                        );
                        e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, at, ft.width, ft.height, 1, dt, Ht, 0, 0);
                      }
                      x.clearLayerUpdates();
                    } else
                      e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, ft.width, ft.height, J.depth, dt, ft.data, 0, 0);
                } else
                  e.compressedTexImage3D(i.TEXTURE_2D_ARRAY, V, wt, ft.width, ft.height, J.depth, 0, ft.data, 0, 0);
              else
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Lt ? P && e.texSubImage3D(i.TEXTURE_2D_ARRAY, V, 0, 0, 0, ft.width, ft.height, J.depth, dt, At, ft.data) : e.texImage3D(i.TEXTURE_2D_ARRAY, V, wt, ft.width, ft.height, J.depth, 0, dt, At, ft.data);
        } else {
          Lt && ne && e.texStorage2D(i.TEXTURE_2D, ot, wt, Bt[0].width, Bt[0].height);
          for (let V = 0, q = Bt.length; V < q; V++)
            ft = Bt[V], x.format !== Ke ? dt !== null ? Lt ? P && e.compressedTexSubImage2D(i.TEXTURE_2D, V, 0, 0, ft.width, ft.height, dt, ft.data) : e.compressedTexImage2D(i.TEXTURE_2D, V, wt, ft.width, ft.height, 0, ft.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Lt ? P && e.texSubImage2D(i.TEXTURE_2D, V, 0, 0, ft.width, ft.height, dt, At, ft.data) : e.texImage2D(i.TEXTURE_2D, V, wt, ft.width, ft.height, 0, dt, At, ft.data);
        }
      else if (x.isDataArrayTexture)
        if (Lt) {
          if (ne && e.texStorage3D(i.TEXTURE_2D_ARRAY, ot, wt, J.width, J.height, J.depth), P)
            if (x.layerUpdates.size > 0) {
              const V = ql(J.width, J.height, x.format, x.type);
              for (const q of x.layerUpdates) {
                const st = J.data.subarray(
                  q * V / J.data.BYTES_PER_ELEMENT,
                  (q + 1) * V / J.data.BYTES_PER_ELEMENT
                );
                e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, q, J.width, J.height, 1, dt, At, st);
              }
              x.clearLayerUpdates();
            } else
              e.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, J.width, J.height, J.depth, dt, At, J.data);
        } else
          e.texImage3D(i.TEXTURE_2D_ARRAY, 0, wt, J.width, J.height, J.depth, 0, dt, At, J.data);
      else if (x.isData3DTexture)
        Lt ? (ne && e.texStorage3D(i.TEXTURE_3D, ot, wt, J.width, J.height, J.depth), P && e.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, J.width, J.height, J.depth, dt, At, J.data)) : e.texImage3D(i.TEXTURE_3D, 0, wt, J.width, J.height, J.depth, 0, dt, At, J.data);
      else if (x.isFramebufferTexture) {
        if (ne)
          if (Lt)
            e.texStorage2D(i.TEXTURE_2D, ot, wt, J.width, J.height);
          else {
            let V = J.width, q = J.height;
            for (let st = 0; st < ot; st++)
              e.texImage2D(i.TEXTURE_2D, st, wt, V, q, 0, dt, At, null), V >>= 1, q >>= 1;
          }
      } else if (Bt.length > 0) {
        if (Lt && ne) {
          const V = Rt(Bt[0]);
          e.texStorage2D(i.TEXTURE_2D, ot, wt, V.width, V.height);
        }
        for (let V = 0, q = Bt.length; V < q; V++)
          ft = Bt[V], Lt ? P && e.texSubImage2D(i.TEXTURE_2D, V, 0, 0, dt, At, ft) : e.texImage2D(i.TEXTURE_2D, V, wt, dt, At, ft);
        x.generateMipmaps = !1;
      } else if (Lt) {
        if (ne) {
          const V = Rt(J);
          e.texStorage2D(i.TEXTURE_2D, ot, wt, V.width, V.height);
        }
        P && e.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, dt, At, J);
      } else
        e.texImage2D(i.TEXTURE_2D, 0, wt, dt, At, J);
      p(x) && m($), vt.__version = X.version, x.onUpdate && x.onUpdate(x);
    }
    T.__version = x.version;
  }
  function W(T, x, U) {
    if (x.image.length !== 6) return;
    const $ = Xt(T, x), K = x.source;
    e.bindTexture(i.TEXTURE_CUBE_MAP, T.__webglTexture, i.TEXTURE0 + U);
    const X = n.get(K);
    if (K.version !== X.__version || $ === !0) {
      e.activeTexture(i.TEXTURE0 + U);
      const vt = Wt.getPrimaries(Wt.workingColorSpace), it = x.colorSpace === Wn ? null : Wt.getPrimaries(x.colorSpace), ut = x.colorSpace === Wn || vt === it ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, x.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, x.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, x.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ut);
      const Gt = x.isCompressedTexture || x.image[0].isCompressedTexture, J = x.image[0] && x.image[0].isDataTexture, dt = [];
      for (let q = 0; q < 6; q++)
        !Gt && !J ? dt[q] = _(x.image[q], !0, s.maxCubemapSize) : dt[q] = J ? x.image[q].image : x.image[q], dt[q] = re(x, dt[q]);
      const At = dt[0], wt = r.convert(x.format, x.colorSpace), ft = r.convert(x.type), Bt = b(x.internalFormat, wt, ft, x.colorSpace), Lt = x.isVideoTexture !== !0, ne = X.__version === void 0 || $ === !0, P = K.dataReady;
      let ot = S(x, At);
      _t(i.TEXTURE_CUBE_MAP, x);
      let V;
      if (Gt) {
        Lt && ne && e.texStorage2D(i.TEXTURE_CUBE_MAP, ot, Bt, At.width, At.height);
        for (let q = 0; q < 6; q++) {
          V = dt[q].mipmaps;
          for (let st = 0; st < V.length; st++) {
            const at = V[st];
            x.format !== Ke ? wt !== null ? Lt ? P && e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, st, 0, 0, at.width, at.height, wt, at.data) : e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, st, Bt, at.width, at.height, 0, at.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Lt ? P && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, st, 0, 0, at.width, at.height, wt, ft, at.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, st, Bt, at.width, at.height, 0, wt, ft, at.data);
          }
        }
      } else {
        if (V = x.mipmaps, Lt && ne) {
          V.length > 0 && ot++;
          const q = Rt(dt[0]);
          e.texStorage2D(i.TEXTURE_CUBE_MAP, ot, Bt, q.width, q.height);
        }
        for (let q = 0; q < 6; q++)
          if (J) {
            Lt ? P && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, 0, 0, dt[q].width, dt[q].height, wt, ft, dt[q].data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, Bt, dt[q].width, dt[q].height, 0, wt, ft, dt[q].data);
            for (let st = 0; st < V.length; st++) {
              const Ht = V[st].image[q].image;
              Lt ? P && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, st + 1, 0, 0, Ht.width, Ht.height, wt, ft, Ht.data) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, st + 1, Bt, Ht.width, Ht.height, 0, wt, ft, Ht.data);
            }
          } else {
            Lt ? P && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, 0, 0, wt, ft, dt[q]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, 0, Bt, wt, ft, dt[q]);
            for (let st = 0; st < V.length; st++) {
              const at = V[st];
              Lt ? P && e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, st + 1, 0, 0, wt, ft, at.image[q]) : e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + q, st + 1, Bt, wt, ft, at.image[q]);
            }
          }
      }
      p(x) && m(i.TEXTURE_CUBE_MAP), X.__version = K.version, x.onUpdate && x.onUpdate(x);
    }
    T.__version = x.version;
  }
  function Z(T, x, U, $, K, X) {
    const vt = r.convert(U.format, U.colorSpace), it = r.convert(U.type), ut = b(U.internalFormat, vt, it, U.colorSpace);
    if (!n.get(x).__hasExternalTextures) {
      const J = Math.max(1, x.width >> X), dt = Math.max(1, x.height >> X);
      K === i.TEXTURE_3D || K === i.TEXTURE_2D_ARRAY ? e.texImage3D(K, X, ut, J, dt, x.depth, 0, vt, it, null) : e.texImage2D(K, X, ut, J, dt, 0, vt, it, null);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, T), Vt(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, $, K, n.get(U).__webglTexture, 0, Ft(x)) : (K === i.TEXTURE_2D || K >= i.TEXTURE_CUBE_MAP_POSITIVE_X && K <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, $, K, n.get(U).__webglTexture, X), e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function mt(T, x, U) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, T), x.depthBuffer) {
      const $ = x.depthTexture, K = $ && $.isDepthTexture ? $.type : null, X = y(x.stencilBuffer, K), vt = x.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, it = Ft(x);
      Vt(x) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, it, X, x.width, x.height) : U ? i.renderbufferStorageMultisample(i.RENDERBUFFER, it, X, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, X, x.width, x.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, vt, i.RENDERBUFFER, T);
    } else {
      const $ = x.textures;
      for (let K = 0; K < $.length; K++) {
        const X = $[K], vt = r.convert(X.format, X.colorSpace), it = r.convert(X.type), ut = b(X.internalFormat, vt, it, X.colorSpace), Gt = Ft(x);
        U && Vt(x) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Gt, ut, x.width, x.height) : Vt(x) ? a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Gt, ut, x.width, x.height) : i.renderbufferStorage(i.RENDERBUFFER, ut, x.width, x.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function ht(T, x) {
    if (x && x.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (e.bindFramebuffer(i.FRAMEBUFFER, T), !(x.depthTexture && x.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!n.get(x.depthTexture).__webglTexture || x.depthTexture.image.width !== x.width || x.depthTexture.image.height !== x.height) && (x.depthTexture.image.width = x.width, x.depthTexture.image.height = x.height, x.depthTexture.needsUpdate = !0), H(x.depthTexture, 0);
    const $ = n.get(x.depthTexture).__webglTexture, K = Ft(x);
    if (x.depthTexture.format === Xi)
      Vt(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0, K) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else if (x.depthTexture.format === ns)
      Vt(x) ? a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0, K) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, $, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Pt(T) {
    const x = n.get(T), U = T.isWebGLCubeRenderTarget === !0;
    if (x.__boundDepthTexture !== T.depthTexture) {
      const $ = T.depthTexture;
      if (x.__depthDisposeCallback && x.__depthDisposeCallback(), $) {
        const K = () => {
          delete x.__boundDepthTexture, delete x.__depthDisposeCallback, $.removeEventListener("dispose", K);
        };
        $.addEventListener("dispose", K), x.__depthDisposeCallback = K;
      }
      x.__boundDepthTexture = $;
    }
    if (T.depthTexture && !x.__autoAllocateDepthBuffer) {
      if (U) throw new Error("target.depthTexture not supported in Cube render targets");
      ht(x.__webglFramebuffer, T);
    } else if (U) {
      x.__webglDepthbuffer = [];
      for (let $ = 0; $ < 6; $++)
        if (e.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer[$]), x.__webglDepthbuffer[$] === void 0)
          x.__webglDepthbuffer[$] = i.createRenderbuffer(), mt(x.__webglDepthbuffer[$], T, !1);
        else {
          const K = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, X = x.__webglDepthbuffer[$];
          i.bindRenderbuffer(i.RENDERBUFFER, X), i.framebufferRenderbuffer(i.FRAMEBUFFER, K, i.RENDERBUFFER, X);
        }
    } else if (e.bindFramebuffer(i.FRAMEBUFFER, x.__webglFramebuffer), x.__webglDepthbuffer === void 0)
      x.__webglDepthbuffer = i.createRenderbuffer(), mt(x.__webglDepthbuffer, T, !1);
    else {
      const $ = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, K = x.__webglDepthbuffer;
      i.bindRenderbuffer(i.RENDERBUFFER, K), i.framebufferRenderbuffer(i.FRAMEBUFFER, $, i.RENDERBUFFER, K);
    }
    e.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Et(T, x, U) {
    const $ = n.get(T);
    x !== void 0 && Z($.__webglFramebuffer, T, T.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), U !== void 0 && Pt(T);
  }
  function kt(T) {
    const x = T.texture, U = n.get(T), $ = n.get(x);
    T.addEventListener("dispose", R);
    const K = T.textures, X = T.isWebGLCubeRenderTarget === !0, vt = K.length > 1;
    if (vt || ($.__webglTexture === void 0 && ($.__webglTexture = i.createTexture()), $.__version = x.version, o.memory.textures++), X) {
      U.__webglFramebuffer = [];
      for (let it = 0; it < 6; it++)
        if (x.mipmaps && x.mipmaps.length > 0) {
          U.__webglFramebuffer[it] = [];
          for (let ut = 0; ut < x.mipmaps.length; ut++)
            U.__webglFramebuffer[it][ut] = i.createFramebuffer();
        } else
          U.__webglFramebuffer[it] = i.createFramebuffer();
    } else {
      if (x.mipmaps && x.mipmaps.length > 0) {
        U.__webglFramebuffer = [];
        for (let it = 0; it < x.mipmaps.length; it++)
          U.__webglFramebuffer[it] = i.createFramebuffer();
      } else
        U.__webglFramebuffer = i.createFramebuffer();
      if (vt)
        for (let it = 0, ut = K.length; it < ut; it++) {
          const Gt = n.get(K[it]);
          Gt.__webglTexture === void 0 && (Gt.__webglTexture = i.createTexture(), o.memory.textures++);
        }
      if (T.samples > 0 && Vt(T) === !1) {
        U.__webglMultisampledFramebuffer = i.createFramebuffer(), U.__webglColorRenderbuffer = [], e.bindFramebuffer(i.FRAMEBUFFER, U.__webglMultisampledFramebuffer);
        for (let it = 0; it < K.length; it++) {
          const ut = K[it];
          U.__webglColorRenderbuffer[it] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, U.__webglColorRenderbuffer[it]);
          const Gt = r.convert(ut.format, ut.colorSpace), J = r.convert(ut.type), dt = b(ut.internalFormat, Gt, J, ut.colorSpace, T.isXRRenderTarget === !0), At = Ft(T);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, At, dt, T.width, T.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + it, i.RENDERBUFFER, U.__webglColorRenderbuffer[it]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), T.depthBuffer && (U.__webglDepthRenderbuffer = i.createRenderbuffer(), mt(U.__webglDepthRenderbuffer, T, !0)), e.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (X) {
      e.bindTexture(i.TEXTURE_CUBE_MAP, $.__webglTexture), _t(i.TEXTURE_CUBE_MAP, x);
      for (let it = 0; it < 6; it++)
        if (x.mipmaps && x.mipmaps.length > 0)
          for (let ut = 0; ut < x.mipmaps.length; ut++)
            Z(U.__webglFramebuffer[it][ut], T, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + it, ut);
        else
          Z(U.__webglFramebuffer[it], T, x, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + it, 0);
      p(x) && m(i.TEXTURE_CUBE_MAP), e.unbindTexture();
    } else if (vt) {
      for (let it = 0, ut = K.length; it < ut; it++) {
        const Gt = K[it], J = n.get(Gt);
        e.bindTexture(i.TEXTURE_2D, J.__webglTexture), _t(i.TEXTURE_2D, Gt), Z(U.__webglFramebuffer, T, Gt, i.COLOR_ATTACHMENT0 + it, i.TEXTURE_2D, 0), p(Gt) && m(i.TEXTURE_2D);
      }
      e.unbindTexture();
    } else {
      let it = i.TEXTURE_2D;
      if ((T.isWebGL3DRenderTarget || T.isWebGLArrayRenderTarget) && (it = T.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), e.bindTexture(it, $.__webglTexture), _t(it, x), x.mipmaps && x.mipmaps.length > 0)
        for (let ut = 0; ut < x.mipmaps.length; ut++)
          Z(U.__webglFramebuffer[ut], T, x, i.COLOR_ATTACHMENT0, it, ut);
      else
        Z(U.__webglFramebuffer, T, x, i.COLOR_ATTACHMENT0, it, 0);
      p(x) && m(it), e.unbindTexture();
    }
    T.depthBuffer && Pt(T);
  }
  function te(T) {
    const x = T.textures;
    for (let U = 0, $ = x.length; U < $; U++) {
      const K = x[U];
      if (p(K)) {
        const X = T.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : i.TEXTURE_2D, vt = n.get(K).__webglTexture;
        e.bindTexture(X, vt), m(X), e.unbindTexture();
      }
    }
  }
  const zt = [], C = [];
  function ke(T) {
    if (T.samples > 0) {
      if (Vt(T) === !1) {
        const x = T.textures, U = T.width, $ = T.height;
        let K = i.COLOR_BUFFER_BIT;
        const X = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, vt = n.get(T), it = x.length > 1;
        if (it)
          for (let ut = 0; ut < x.length; ut++)
            e.bindFramebuffer(i.FRAMEBUFFER, vt.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.RENDERBUFFER, null), e.bindFramebuffer(i.FRAMEBUFFER, vt.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.TEXTURE_2D, null, 0);
        e.bindFramebuffer(i.READ_FRAMEBUFFER, vt.__webglMultisampledFramebuffer), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, vt.__webglFramebuffer);
        for (let ut = 0; ut < x.length; ut++) {
          if (T.resolveDepthBuffer && (T.depthBuffer && (K |= i.DEPTH_BUFFER_BIT), T.stencilBuffer && T.resolveStencilBuffer && (K |= i.STENCIL_BUFFER_BIT)), it) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, vt.__webglColorRenderbuffer[ut]);
            const Gt = n.get(x[ut]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Gt, 0);
          }
          i.blitFramebuffer(0, 0, U, $, 0, 0, U, $, K, i.NEAREST), c === !0 && (zt.length = 0, C.length = 0, zt.push(i.COLOR_ATTACHMENT0 + ut), T.depthBuffer && T.resolveDepthBuffer === !1 && (zt.push(X), C.push(X), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, C)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, zt));
        }
        if (e.bindFramebuffer(i.READ_FRAMEBUFFER, null), e.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), it)
          for (let ut = 0; ut < x.length; ut++) {
            e.bindFramebuffer(i.FRAMEBUFFER, vt.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.RENDERBUFFER, vt.__webglColorRenderbuffer[ut]);
            const Gt = n.get(x[ut]).__webglTexture;
            e.bindFramebuffer(i.FRAMEBUFFER, vt.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ut, i.TEXTURE_2D, Gt, 0);
          }
        e.bindFramebuffer(i.DRAW_FRAMEBUFFER, vt.__webglMultisampledFramebuffer);
      } else if (T.depthBuffer && T.resolveDepthBuffer === !1 && c) {
        const x = T.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [x]);
      }
    }
  }
  function Ft(T) {
    return Math.min(s.maxSamples, T.samples);
  }
  function Vt(T) {
    const x = n.get(T);
    return T.samples > 0 && t.has("WEBGL_multisampled_render_to_texture") === !0 && x.__useRenderToTexture !== !1;
  }
  function Tt(T) {
    const x = o.render.frame;
    h.get(T) !== x && (h.set(T, x), T.update());
  }
  function re(T, x) {
    const U = T.colorSpace, $ = T.format, K = T.type;
    return T.isCompressedTexture === !0 || T.isVideoTexture === !0 || U !== be && U !== Wn && (Wt.getTransfer(U) === ae ? ($ !== Ke || K !== Dn) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", U)), x;
  }
  function Rt(T) {
    return typeof HTMLImageElement < "u" && T instanceof HTMLImageElement ? (l.width = T.naturalWidth || T.width, l.height = T.naturalHeight || T.height) : typeof VideoFrame < "u" && T instanceof VideoFrame ? (l.width = T.displayWidth, l.height = T.displayHeight) : (l.width = T.width, l.height = T.height), l;
  }
  this.allocateTextureUnit = k, this.resetTextureUnits = E, this.setTexture2D = H, this.setTexture2DArray = j, this.setTexture3D = z, this.setTextureCube = Q, this.rebindTextures = Et, this.setupRenderTarget = kt, this.updateRenderTargetMipmap = te, this.updateMultisampleRenderTarget = ke, this.setupDepthRenderbuffer = Pt, this.setupFrameBufferTexture = Z, this.useMultisampledRTT = Vt;
}
function B0(i, t) {
  function e(n, s = Wn) {
    let r;
    const o = Wt.getTransfer(s);
    if (n === Dn) return i.UNSIGNED_BYTE;
    if (n === rc) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === oc) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === tu) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === Jh) return i.BYTE;
    if (n === Qh) return i.SHORT;
    if (n === zs) return i.UNSIGNED_SHORT;
    if (n === sc) return i.INT;
    if (n === pi) return i.UNSIGNED_INT;
    if (n === cn) return i.FLOAT;
    if (n === js) return i.HALF_FLOAT;
    if (n === eu) return i.ALPHA;
    if (n === nu) return i.RGB;
    if (n === Ke) return i.RGBA;
    if (n === iu) return i.LUMINANCE;
    if (n === su) return i.LUMINANCE_ALPHA;
    if (n === Xi) return i.DEPTH_COMPONENT;
    if (n === ns) return i.DEPTH_STENCIL;
    if (n === ac) return i.RED;
    if (n === cc) return i.RED_INTEGER;
    if (n === ru) return i.RG;
    if (n === lc) return i.RG_INTEGER;
    if (n === hc) return i.RGBA_INTEGER;
    if (n === kr || n === zr || n === Hr || n === Vr)
      if (o === ae)
        if (r = t.get("WEBGL_compressed_texture_s3tc_srgb"), r !== null) {
          if (n === kr) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === zr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === Hr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === Vr) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (r = t.get("WEBGL_compressed_texture_s3tc"), r !== null) {
        if (n === kr) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === zr) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === Hr) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === Vr) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === fa || n === pa || n === ma || n === ga)
      if (r = t.get("WEBGL_compressed_texture_pvrtc"), r !== null) {
        if (n === fa) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === pa) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === ma) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === ga) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === _a || n === va || n === xa)
      if (r = t.get("WEBGL_compressed_texture_etc"), r !== null) {
        if (n === _a || n === va) return o === ae ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
        if (n === xa) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (n === ya || n === Ma || n === Sa || n === Ea || n === ba || n === Ta || n === Aa || n === wa || n === Ra || n === Ca || n === Pa || n === La || n === Ia || n === Da)
      if (r = t.get("WEBGL_compressed_texture_astc"), r !== null) {
        if (n === ya) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === Ma) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === Sa) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === Ea) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === ba) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === Ta) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === Aa) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === wa) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === Ra) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === Ca) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === Pa) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === La) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === Ia) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === Da) return o === ae ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === Gr || n === Na || n === Ua)
      if (r = t.get("EXT_texture_compression_bptc"), r !== null) {
        if (n === Gr) return o === ae ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === Na) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === Ua) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === ou || n === Oa || n === Fa || n === Ba)
      if (r = t.get("EXT_texture_compression_rgtc"), r !== null) {
        if (n === Gr) return r.COMPRESSED_RED_RGTC1_EXT;
        if (n === Oa) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === Fa) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === Ba) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === es ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: e };
}
class k0 extends Le {
  constructor(t = []) {
    super(), this.isArrayCamera = !0, this.cameras = t;
  }
}
class ie extends ce {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const z0 = { type: "move" };
class Vo {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new ie(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new ie(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new w(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new w()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new ie(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new w(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new w()), this._grip;
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
      a !== null && (s = e.getPose(t.targetRaySpace, n), s === null && r !== null && (s = r), s !== null && (a.matrix.fromArray(s.transform.matrix), a.matrix.decompose(a.position, a.rotation, a.scale), a.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (a.hasLinearVelocity = !0, a.linearVelocity.copy(s.linearVelocity)) : a.hasLinearVelocity = !1, s.angularVelocity ? (a.hasAngularVelocity = !0, a.angularVelocity.copy(s.angularVelocity)) : a.hasAngularVelocity = !1, this.dispatchEvent(z0)));
    }
    return a !== null && (a.visible = s !== null), c !== null && (c.visible = r !== null), l !== null && (l.visible = o !== null), this;
  }
  // private method
  _getHandJoint(t, e) {
    if (t.joints[e.jointName] === void 0) {
      const n = new ie();
      n.matrixAutoUpdate = !1, n.visible = !1, t.joints[e.jointName] = n, t.add(n);
    }
    return t.joints[e.jointName];
  }
}
const H0 = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, V0 = `
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
class G0 {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(t, e, n) {
    if (this.texture === null) {
      const s = new xe(), r = t.properties.get(s);
      r.__webglTexture = e.texture, (e.depthNear != n.depthNear || e.depthFar != n.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = s;
    }
  }
  getMesh(t) {
    if (this.texture !== null && this.mesh === null) {
      const e = t.cameras[0].viewport, n = new Kn({
        vertexShader: H0,
        fragmentShader: V0,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: e.z },
          depthHeight: { value: e.w }
        }
      });
      this.mesh = new ge(new ro(20, 20), n);
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
class W0 extends _i {
  constructor(t, e) {
    super();
    const n = this;
    let s = null, r = 1, o = null, a = "local-floor", c = 1, l = null, h = null, u = null, d = null, f = null, g = null;
    const _ = new G0(), p = e.getContextAttributes();
    let m = null, b = null;
    const y = [], S = [], D = new et();
    let R = null;
    const A = new Le();
    A.layers.enable(1), A.viewport = new qt();
    const N = new Le();
    N.layers.enable(2), N.viewport = new qt();
    const Y = [A, N], v = new k0();
    v.layers.enable(1), v.layers.enable(2);
    let E = null, k = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(W) {
      let Z = y[W];
      return Z === void 0 && (Z = new Vo(), y[W] = Z), Z.getTargetRaySpace();
    }, this.getControllerGrip = function(W) {
      let Z = y[W];
      return Z === void 0 && (Z = new Vo(), y[W] = Z), Z.getGripSpace();
    }, this.getHand = function(W) {
      let Z = y[W];
      return Z === void 0 && (Z = new Vo(), y[W] = Z), Z.getHandSpace();
    };
    function B(W) {
      const Z = S.indexOf(W.inputSource);
      if (Z === -1)
        return;
      const mt = y[Z];
      mt !== void 0 && (mt.update(W.inputSource, W.frame, l || o), mt.dispatchEvent({ type: W.type, data: W.inputSource }));
    }
    function H() {
      s.removeEventListener("select", B), s.removeEventListener("selectstart", B), s.removeEventListener("selectend", B), s.removeEventListener("squeeze", B), s.removeEventListener("squeezestart", B), s.removeEventListener("squeezeend", B), s.removeEventListener("end", H), s.removeEventListener("inputsourceschange", j);
      for (let W = 0; W < y.length; W++) {
        const Z = S[W];
        Z !== null && (S[W] = null, y[W].disconnect(Z));
      }
      E = null, k = null, _.reset(), t.setRenderTarget(m), f = null, d = null, u = null, s = null, b = null, Kt.stop(), n.isPresenting = !1, t.setPixelRatio(R), t.setSize(D.width, D.height, !1), n.dispatchEvent({ type: "sessionend" });
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
        if (m = t.getRenderTarget(), s.addEventListener("select", B), s.addEventListener("selectstart", B), s.addEventListener("selectend", B), s.addEventListener("squeeze", B), s.addEventListener("squeezestart", B), s.addEventListener("squeezeend", B), s.addEventListener("end", H), s.addEventListener("inputsourceschange", j), p.xrCompatible !== !0 && await e.makeXRCompatible(), R = t.getPixelRatio(), t.getSize(D), s.renderState.layers === void 0) {
          const Z = {
            antialias: p.antialias,
            alpha: !0,
            depth: p.depth,
            stencil: p.stencil,
            framebufferScaleFactor: r
          };
          f = new XRWebGLLayer(s, e, Z), s.updateRenderState({ baseLayer: f }), t.setPixelRatio(1), t.setSize(f.framebufferWidth, f.framebufferHeight, !1), b = new mi(
            f.framebufferWidth,
            f.framebufferHeight,
            {
              format: Ke,
              type: Dn,
              colorSpace: t.outputColorSpace,
              stencilBuffer: p.stencil
            }
          );
        } else {
          let Z = null, mt = null, ht = null;
          p.depth && (ht = p.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, Z = p.stencil ? ns : Xi, mt = p.stencil ? es : pi);
          const Pt = {
            colorFormat: e.RGBA8,
            depthFormat: ht,
            scaleFactor: r
          };
          u = new XRWebGLBinding(s, e), d = u.createProjectionLayer(Pt), s.updateRenderState({ layers: [d] }), t.setPixelRatio(1), t.setSize(d.textureWidth, d.textureHeight, !1), b = new mi(
            d.textureWidth,
            d.textureHeight,
            {
              format: Ke,
              type: Dn,
              depthTexture: new yu(d.textureWidth, d.textureHeight, mt, void 0, void 0, void 0, void 0, void 0, void 0, Z),
              stencilBuffer: p.stencil,
              colorSpace: t.outputColorSpace,
              samples: p.antialias ? 4 : 0,
              resolveDepthBuffer: d.ignoreDepthValues === !1
            }
          );
        }
        b.isXRRenderTarget = !0, this.setFoveation(c), l = null, o = await s.requestReferenceSpace(a), Kt.setContext(s), Kt.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (s !== null)
        return s.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return _.getDepthTexture();
    };
    function j(W) {
      for (let Z = 0; Z < W.removed.length; Z++) {
        const mt = W.removed[Z], ht = S.indexOf(mt);
        ht >= 0 && (S[ht] = null, y[ht].disconnect(mt));
      }
      for (let Z = 0; Z < W.added.length; Z++) {
        const mt = W.added[Z];
        let ht = S.indexOf(mt);
        if (ht === -1) {
          for (let Et = 0; Et < y.length; Et++)
            if (Et >= S.length) {
              S.push(mt), ht = Et;
              break;
            } else if (S[Et] === null) {
              S[Et] = mt, ht = Et;
              break;
            }
          if (ht === -1) break;
        }
        const Pt = y[ht];
        Pt && Pt.connect(mt);
      }
    }
    const z = new w(), Q = new w();
    function G(W, Z, mt) {
      z.setFromMatrixPosition(Z.matrixWorld), Q.setFromMatrixPosition(mt.matrixWorld);
      const ht = z.distanceTo(Q), Pt = Z.projectionMatrix.elements, Et = mt.projectionMatrix.elements, kt = Pt[14] / (Pt[10] - 1), te = Pt[14] / (Pt[10] + 1), zt = (Pt[9] + 1) / Pt[5], C = (Pt[9] - 1) / Pt[5], ke = (Pt[8] - 1) / Pt[0], Ft = (Et[8] + 1) / Et[0], Vt = kt * ke, Tt = kt * Ft, re = ht / (-ke + Ft), Rt = re * -ke;
      if (Z.matrixWorld.decompose(W.position, W.quaternion, W.scale), W.translateX(Rt), W.translateZ(re), W.matrixWorld.compose(W.position, W.quaternion, W.scale), W.matrixWorldInverse.copy(W.matrixWorld).invert(), Pt[10] === -1)
        W.projectionMatrix.copy(Z.projectionMatrix), W.projectionMatrixInverse.copy(Z.projectionMatrixInverse);
      else {
        const T = kt + re, x = te + re, U = Vt - Rt, $ = Tt + (ht - Rt), K = zt * te / x * T, X = C * te / x * T;
        W.projectionMatrix.makePerspective(U, $, K, X, T, x), W.projectionMatrixInverse.copy(W.projectionMatrix).invert();
      }
    }
    function ct(W, Z) {
      Z === null ? W.matrixWorld.copy(W.matrix) : W.matrixWorld.multiplyMatrices(Z.matrixWorld, W.matrix), W.matrixWorldInverse.copy(W.matrixWorld).invert();
    }
    this.updateCamera = function(W) {
      if (s === null) return;
      let Z = W.near, mt = W.far;
      _.texture !== null && (_.depthNear > 0 && (Z = _.depthNear), _.depthFar > 0 && (mt = _.depthFar)), v.near = N.near = A.near = Z, v.far = N.far = A.far = mt, (E !== v.near || k !== v.far) && (s.updateRenderState({
        depthNear: v.near,
        depthFar: v.far
      }), E = v.near, k = v.far);
      const ht = W.parent, Pt = v.cameras;
      ct(v, ht);
      for (let Et = 0; Et < Pt.length; Et++)
        ct(Pt[Et], ht);
      Pt.length === 2 ? G(v, A, N) : v.projectionMatrix.copy(A.projectionMatrix), lt(W, v, ht);
    };
    function lt(W, Z, mt) {
      mt === null ? W.matrix.copy(Z.matrixWorld) : (W.matrix.copy(mt.matrixWorld), W.matrix.invert(), W.matrix.multiply(Z.matrixWorld)), W.matrix.decompose(W.position, W.quaternion, W.scale), W.updateMatrixWorld(!0), W.projectionMatrix.copy(Z.projectionMatrix), W.projectionMatrixInverse.copy(Z.projectionMatrixInverse), W.isPerspectiveCamera && (W.fov = is * 2 * Math.atan(1 / W.projectionMatrix.elements[5]), W.zoom = 1);
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
    let _t = null;
    function Xt(W, Z) {
      if (h = Z.getViewerPose(l || o), g = Z, h !== null) {
        const mt = h.views;
        f !== null && (t.setRenderTargetFramebuffer(b, f.framebuffer), t.setRenderTarget(b));
        let ht = !1;
        mt.length !== v.cameras.length && (v.cameras.length = 0, ht = !0);
        for (let Et = 0; Et < mt.length; Et++) {
          const kt = mt[Et];
          let te = null;
          if (f !== null)
            te = f.getViewport(kt);
          else {
            const C = u.getViewSubImage(d, kt);
            te = C.viewport, Et === 0 && (t.setRenderTargetTextures(
              b,
              C.colorTexture,
              d.ignoreDepthValues ? void 0 : C.depthStencilTexture
            ), t.setRenderTarget(b));
          }
          let zt = Y[Et];
          zt === void 0 && (zt = new Le(), zt.layers.enable(Et), zt.viewport = new qt(), Y[Et] = zt), zt.matrix.fromArray(kt.transform.matrix), zt.matrix.decompose(zt.position, zt.quaternion, zt.scale), zt.projectionMatrix.fromArray(kt.projectionMatrix), zt.projectionMatrixInverse.copy(zt.projectionMatrix).invert(), zt.viewport.set(te.x, te.y, te.width, te.height), Et === 0 && (v.matrix.copy(zt.matrix), v.matrix.decompose(v.position, v.quaternion, v.scale)), ht === !0 && v.cameras.push(zt);
        }
        const Pt = s.enabledFeatures;
        if (Pt && Pt.includes("depth-sensing")) {
          const Et = u.getDepthInformation(mt[0]);
          Et && Et.isValid && Et.texture && _.init(t, Et, s.renderState);
        }
      }
      for (let mt = 0; mt < y.length; mt++) {
        const ht = S[mt], Pt = y[mt];
        ht !== null && Pt !== void 0 && Pt.update(ht, Z, l || o);
      }
      _t && _t(W, Z), Z.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: Z }), g = null;
    }
    const Kt = new xu();
    Kt.setAnimationLoop(Xt), this.setAnimationLoop = function(W) {
      _t = W;
    }, this.dispose = function() {
    };
  }
}
const oi = /* @__PURE__ */ new pn(), X0 = /* @__PURE__ */ new Ct();
function $0(i, t) {
  function e(p, m) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), m.value.copy(p.matrix);
  }
  function n(p, m) {
    m.color.getRGB(p.fogColor.value, gu(i)), m.isFog ? (p.fogNear.value = m.near, p.fogFar.value = m.far) : m.isFogExp2 && (p.fogDensity.value = m.density);
  }
  function s(p, m, b, y, S) {
    m.isMeshBasicMaterial || m.isMeshLambertMaterial ? r(p, m) : m.isMeshToonMaterial ? (r(p, m), u(p, m)) : m.isMeshPhongMaterial ? (r(p, m), h(p, m)) : m.isMeshStandardMaterial ? (r(p, m), d(p, m), m.isMeshPhysicalMaterial && f(p, m, S)) : m.isMeshMatcapMaterial ? (r(p, m), g(p, m)) : m.isMeshDepthMaterial ? r(p, m) : m.isMeshDistanceMaterial ? (r(p, m), _(p, m)) : m.isMeshNormalMaterial ? r(p, m) : m.isLineBasicMaterial ? (o(p, m), m.isLineDashedMaterial && a(p, m)) : m.isPointsMaterial ? c(p, m, b, y) : m.isSpriteMaterial ? l(p, m) : m.isShadowMaterial ? (p.color.value.copy(m.color), p.opacity.value = m.opacity) : m.isShaderMaterial && (m.uniformsNeedUpdate = !1);
  }
  function r(p, m) {
    p.opacity.value = m.opacity, m.color && p.diffuse.value.copy(m.color), m.emissive && p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity), m.map && (p.map.value = m.map, e(m.map, p.mapTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, e(m.alphaMap, p.alphaMapTransform)), m.bumpMap && (p.bumpMap.value = m.bumpMap, e(m.bumpMap, p.bumpMapTransform), p.bumpScale.value = m.bumpScale, m.side === Fe && (p.bumpScale.value *= -1)), m.normalMap && (p.normalMap.value = m.normalMap, e(m.normalMap, p.normalMapTransform), p.normalScale.value.copy(m.normalScale), m.side === Fe && p.normalScale.value.negate()), m.displacementMap && (p.displacementMap.value = m.displacementMap, e(m.displacementMap, p.displacementMapTransform), p.displacementScale.value = m.displacementScale, p.displacementBias.value = m.displacementBias), m.emissiveMap && (p.emissiveMap.value = m.emissiveMap, e(m.emissiveMap, p.emissiveMapTransform)), m.specularMap && (p.specularMap.value = m.specularMap, e(m.specularMap, p.specularMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
    const b = t.get(m), y = b.envMap, S = b.envMapRotation;
    y && (p.envMap.value = y, oi.copy(S), oi.x *= -1, oi.y *= -1, oi.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === !1 && (oi.y *= -1, oi.z *= -1), p.envMapRotation.value.setFromMatrix4(X0.makeRotationFromEuler(oi)), p.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = m.reflectivity, p.ior.value = m.ior, p.refractionRatio.value = m.refractionRatio), m.lightMap && (p.lightMap.value = m.lightMap, p.lightMapIntensity.value = m.lightMapIntensity, e(m.lightMap, p.lightMapTransform)), m.aoMap && (p.aoMap.value = m.aoMap, p.aoMapIntensity.value = m.aoMapIntensity, e(m.aoMap, p.aoMapTransform));
  }
  function o(p, m) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, m.map && (p.map.value = m.map, e(m.map, p.mapTransform));
  }
  function a(p, m) {
    p.dashSize.value = m.dashSize, p.totalSize.value = m.dashSize + m.gapSize, p.scale.value = m.scale;
  }
  function c(p, m, b, y) {
    p.diffuse.value.copy(m.color), p.opacity.value = m.opacity, p.size.value = m.size * b, p.scale.value = y * 0.5, m.map && (p.map.value = m.map, e(m.map, p.uvTransform)), m.alphaMap && (p.alphaMap.value = m.alphaMap, e(m.alphaMap, p.alphaMapTransform)), m.alphaTest > 0 && (p.alphaTest.value = m.alphaTest);
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
  function f(p, m, b) {
    p.ior.value = m.ior, m.sheen > 0 && (p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen), p.sheenRoughness.value = m.sheenRoughness, m.sheenColorMap && (p.sheenColorMap.value = m.sheenColorMap, e(m.sheenColorMap, p.sheenColorMapTransform)), m.sheenRoughnessMap && (p.sheenRoughnessMap.value = m.sheenRoughnessMap, e(m.sheenRoughnessMap, p.sheenRoughnessMapTransform))), m.clearcoat > 0 && (p.clearcoat.value = m.clearcoat, p.clearcoatRoughness.value = m.clearcoatRoughness, m.clearcoatMap && (p.clearcoatMap.value = m.clearcoatMap, e(m.clearcoatMap, p.clearcoatMapTransform)), m.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = m.clearcoatRoughnessMap, e(m.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), m.clearcoatNormalMap && (p.clearcoatNormalMap.value = m.clearcoatNormalMap, e(m.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale), m.side === Fe && p.clearcoatNormalScale.value.negate())), m.dispersion > 0 && (p.dispersion.value = m.dispersion), m.iridescence > 0 && (p.iridescence.value = m.iridescence, p.iridescenceIOR.value = m.iridescenceIOR, p.iridescenceThicknessMinimum.value = m.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = m.iridescenceThicknessRange[1], m.iridescenceMap && (p.iridescenceMap.value = m.iridescenceMap, e(m.iridescenceMap, p.iridescenceMapTransform)), m.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = m.iridescenceThicknessMap, e(m.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), m.transmission > 0 && (p.transmission.value = m.transmission, p.transmissionSamplerMap.value = b.texture, p.transmissionSamplerSize.value.set(b.width, b.height), m.transmissionMap && (p.transmissionMap.value = m.transmissionMap, e(m.transmissionMap, p.transmissionMapTransform)), p.thickness.value = m.thickness, m.thicknessMap && (p.thicknessMap.value = m.thicknessMap, e(m.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = m.attenuationDistance, p.attenuationColor.value.copy(m.attenuationColor)), m.anisotropy > 0 && (p.anisotropyVector.value.set(m.anisotropy * Math.cos(m.anisotropyRotation), m.anisotropy * Math.sin(m.anisotropyRotation)), m.anisotropyMap && (p.anisotropyMap.value = m.anisotropyMap, e(m.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = m.specularIntensity, p.specularColor.value.copy(m.specularColor), m.specularColorMap && (p.specularColorMap.value = m.specularColorMap, e(m.specularColorMap, p.specularColorMapTransform)), m.specularIntensityMap && (p.specularIntensityMap.value = m.specularIntensityMap, e(m.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function g(p, m) {
    m.matcap && (p.matcap.value = m.matcap);
  }
  function _(p, m) {
    const b = t.get(m).light;
    p.referencePosition.value.setFromMatrixPosition(b.matrixWorld), p.nearDistance.value = b.shadow.camera.near, p.farDistance.value = b.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: s
  };
}
function q0(i, t, e, n) {
  let s = {}, r = {}, o = [];
  const a = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(b, y) {
    const S = y.program;
    n.uniformBlockBinding(b, S);
  }
  function l(b, y) {
    let S = s[b.id];
    S === void 0 && (g(b), S = h(b), s[b.id] = S, b.addEventListener("dispose", p));
    const D = y.program;
    n.updateUBOMapping(b, D);
    const R = t.render.frame;
    r[b.id] !== R && (d(b), r[b.id] = R);
  }
  function h(b) {
    const y = u();
    b.__bindingPointIndex = y;
    const S = i.createBuffer(), D = b.__size, R = b.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, S), i.bufferData(i.UNIFORM_BUFFER, D, R), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, y, S), S;
  }
  function u() {
    for (let b = 0; b < a; b++)
      if (o.indexOf(b) === -1)
        return o.push(b), b;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function d(b) {
    const y = s[b.id], S = b.uniforms, D = b.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, y);
    for (let R = 0, A = S.length; R < A; R++) {
      const N = Array.isArray(S[R]) ? S[R] : [S[R]];
      for (let Y = 0, v = N.length; Y < v; Y++) {
        const E = N[Y];
        if (f(E, R, Y, D) === !0) {
          const k = E.__offset, B = Array.isArray(E.value) ? E.value : [E.value];
          let H = 0;
          for (let j = 0; j < B.length; j++) {
            const z = B[j], Q = _(z);
            typeof z == "number" || typeof z == "boolean" ? (E.__data[0] = z, i.bufferSubData(i.UNIFORM_BUFFER, k + H, E.__data)) : z.isMatrix3 ? (E.__data[0] = z.elements[0], E.__data[1] = z.elements[1], E.__data[2] = z.elements[2], E.__data[3] = 0, E.__data[4] = z.elements[3], E.__data[5] = z.elements[4], E.__data[6] = z.elements[5], E.__data[7] = 0, E.__data[8] = z.elements[6], E.__data[9] = z.elements[7], E.__data[10] = z.elements[8], E.__data[11] = 0) : (z.toArray(E.__data, H), H += Q.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, k, E.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function f(b, y, S, D) {
    const R = b.value, A = y + "_" + S;
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
  function g(b) {
    const y = b.uniforms;
    let S = 0;
    const D = 16;
    for (let A = 0, N = y.length; A < N; A++) {
      const Y = Array.isArray(y[A]) ? y[A] : [y[A]];
      for (let v = 0, E = Y.length; v < E; v++) {
        const k = Y[v], B = Array.isArray(k.value) ? k.value : [k.value];
        for (let H = 0, j = B.length; H < j; H++) {
          const z = B[H], Q = _(z), G = S % D, ct = G % Q.boundary, lt = G + ct;
          S += ct, lt !== 0 && D - lt < Q.storage && (S += D - lt), k.__data = new Float32Array(Q.storage / Float32Array.BYTES_PER_ELEMENT), k.__offset = S, S += Q.storage;
        }
      }
    }
    const R = S % D;
    return R > 0 && (S += D - R), b.__size = S, b.__cache = {}, this;
  }
  function _(b) {
    const y = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof b == "number" || typeof b == "boolean" ? (y.boundary = 4, y.storage = 4) : b.isVector2 ? (y.boundary = 8, y.storage = 8) : b.isVector3 || b.isColor ? (y.boundary = 16, y.storage = 12) : b.isVector4 ? (y.boundary = 16, y.storage = 16) : b.isMatrix3 ? (y.boundary = 48, y.storage = 48) : b.isMatrix4 ? (y.boundary = 64, y.storage = 64) : b.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", b), y;
  }
  function p(b) {
    const y = b.target;
    y.removeEventListener("dispose", p);
    const S = o.indexOf(y.__bindingPointIndex);
    o.splice(S, 1), i.deleteBuffer(s[y.id]), delete s[y.id], delete r[y.id];
  }
  function m() {
    for (const b in s)
      i.deleteBuffer(s[b]);
    o = [], s = {}, r = {};
  }
  return {
    bind: c,
    update: l,
    dispose: m
  };
}
class Y0 {
  constructor(t = {}) {
    const {
      canvas: e = Uf(),
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
    const m = [], b = [];
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
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = Pe, this.toneMapping = jn, this.toneMappingExposure = 1;
    const y = this;
    let S = !1, D = 0, R = 0, A = null, N = -1, Y = null;
    const v = new qt(), E = new qt();
    let k = null;
    const B = new Mt(0);
    let H = 0, j = e.width, z = e.height, Q = 1, G = null, ct = null;
    const lt = new qt(0, 0, j, z), _t = new qt(0, 0, j, z);
    let Xt = !1;
    const Kt = new pc();
    let W = !1, Z = !1;
    const mt = new Ct(), ht = new Ct(), Pt = new w(), Et = new qt(), kt = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let te = !1;
    function zt() {
      return A === null ? Q : 1;
    }
    let C = n;
    function ke(M, L) {
      return e.getContext(M, L);
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
      if ("setAttribute" in e && e.setAttribute("data-engine", `three.js r${ic}`), e.addEventListener("webglcontextlost", q, !1), e.addEventListener("webglcontextrestored", st, !1), e.addEventListener("webglcontextcreationerror", at, !1), C === null) {
        const L = "webgl2";
        if (C = ke(L, M), C === null)
          throw ke(L) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (M) {
      throw console.error("THREE.WebGLRenderer: " + M.message), M;
    }
    let Ft, Vt, Tt, re, Rt, T, x, U, $, K, X, vt, it, ut, Gt, J, dt, At, wt, ft, Bt, Lt, ne, P;
    function ot() {
      Ft = new Qg(C), Ft.init(), Lt = new B0(C, Ft), Vt = new qg(C, Ft, t, Lt), Tt = new U0(C), Vt.reverseDepthBuffer && Tt.buffers.depth.setReversed(!0), re = new n_(C), Rt = new y0(), T = new F0(C, Ft, Tt, Rt, Vt, Lt, re), x = new jg(y), U = new Jg(y), $ = new lp(C), ne = new Xg(C, $), K = new t_(C, $, re, ne), X = new s_(C, K, $, re), wt = new i_(C, Vt, T), J = new Yg(Rt), vt = new x0(y, x, U, Ft, Vt, ne, J), it = new $0(y, Rt), ut = new S0(), Gt = new R0(Ft), At = new Wg(y, x, U, Tt, X, d, c), dt = new D0(y, X, Vt), P = new q0(C, re, Vt, Tt), ft = new $g(C, Ft, re), Bt = new e_(C, Ft, re), re.programs = vt.programs, y.capabilities = Vt, y.extensions = Ft, y.properties = Rt, y.renderLists = ut, y.shadowMap = dt, y.state = Tt, y.info = re;
    }
    ot();
    const V = new W0(y, C);
    this.xr = V, this.getContext = function() {
      return C;
    }, this.getContextAttributes = function() {
      return C.getContextAttributes();
    }, this.forceContextLoss = function() {
      const M = Ft.get("WEBGL_lose_context");
      M && M.loseContext();
    }, this.forceContextRestore = function() {
      const M = Ft.get("WEBGL_lose_context");
      M && M.restoreContext();
    }, this.getPixelRatio = function() {
      return Q;
    }, this.setPixelRatio = function(M) {
      M !== void 0 && (Q = M, this.setSize(j, z, !1));
    }, this.getSize = function(M) {
      return M.set(j, z);
    }, this.setSize = function(M, L, O = !0) {
      if (V.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      j = M, z = L, e.width = Math.floor(M * Q), e.height = Math.floor(L * Q), O === !0 && (e.style.width = M + "px", e.style.height = L + "px"), this.setViewport(0, 0, M, L);
    }, this.getDrawingBufferSize = function(M) {
      return M.set(j * Q, z * Q).floor();
    }, this.setDrawingBufferSize = function(M, L, O) {
      j = M, z = L, Q = O, e.width = Math.floor(M * O), e.height = Math.floor(L * O), this.setViewport(0, 0, M, L);
    }, this.getCurrentViewport = function(M) {
      return M.copy(v);
    }, this.getViewport = function(M) {
      return M.copy(lt);
    }, this.setViewport = function(M, L, O, F) {
      M.isVector4 ? lt.set(M.x, M.y, M.z, M.w) : lt.set(M, L, O, F), Tt.viewport(v.copy(lt).multiplyScalar(Q).round());
    }, this.getScissor = function(M) {
      return M.copy(_t);
    }, this.setScissor = function(M, L, O, F) {
      M.isVector4 ? _t.set(M.x, M.y, M.z, M.w) : _t.set(M, L, O, F), Tt.scissor(E.copy(_t).multiplyScalar(Q).round());
    }, this.getScissorTest = function() {
      return Xt;
    }, this.setScissorTest = function(M) {
      Tt.setScissorTest(Xt = M);
    }, this.setOpaqueSort = function(M) {
      G = M;
    }, this.setTransparentSort = function(M) {
      ct = M;
    }, this.getClearColor = function(M) {
      return M.copy(At.getClearColor());
    }, this.setClearColor = function() {
      At.setClearColor.apply(At, arguments);
    }, this.getClearAlpha = function() {
      return At.getClearAlpha();
    }, this.setClearAlpha = function() {
      At.setClearAlpha.apply(At, arguments);
    }, this.clear = function(M = !0, L = !0, O = !0) {
      let F = 0;
      if (M) {
        let I = !1;
        if (A !== null) {
          const tt = A.texture.format;
          I = tt === hc || tt === lc || tt === cc;
        }
        if (I) {
          const tt = A.texture.type, rt = tt === Dn || tt === pi || tt === zs || tt === es || tt === rc || tt === oc, pt = At.getClearColor(), gt = At.getClearAlpha(), St = pt.r, bt = pt.g, xt = pt.b;
          rt ? (f[0] = St, f[1] = bt, f[2] = xt, f[3] = gt, C.clearBufferuiv(C.COLOR, 0, f)) : (g[0] = St, g[1] = bt, g[2] = xt, g[3] = gt, C.clearBufferiv(C.COLOR, 0, g));
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
      e.removeEventListener("webglcontextlost", q, !1), e.removeEventListener("webglcontextrestored", st, !1), e.removeEventListener("webglcontextcreationerror", at, !1), ut.dispose(), Gt.dispose(), Rt.dispose(), x.dispose(), U.dispose(), X.dispose(), ne.dispose(), P.dispose(), vt.dispose(), V.dispose(), V.removeEventListener("sessionstart", Lc), V.removeEventListener("sessionend", Ic), Qn.stop();
    };
    function q(M) {
      M.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), S = !0;
    }
    function st() {
      console.log("THREE.WebGLRenderer: Context Restored."), S = !1;
      const M = re.autoReset, L = dt.enabled, O = dt.autoUpdate, F = dt.needsUpdate, I = dt.type;
      ot(), re.autoReset = M, dt.enabled = L, dt.autoUpdate = O, dt.needsUpdate = F, dt.type = I;
    }
    function at(M) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", M.statusMessage);
    }
    function Ht(M) {
      const L = M.target;
      L.removeEventListener("dispose", Ht), pe(L);
    }
    function pe(M) {
      Ne(M), Rt.remove(M);
    }
    function Ne(M) {
      const L = Rt.get(M).programs;
      L !== void 0 && (L.forEach(function(O) {
        vt.releaseProgram(O);
      }), M.isShaderMaterial && vt.releaseShaderCache(M));
    }
    this.renderBufferDirect = function(M, L, O, F, I, tt) {
      L === null && (L = kt);
      const rt = I.isMesh && I.matrixWorld.determinant() < 0, pt = td(M, L, O, F, I);
      Tt.setMaterial(F, rt);
      let gt = O.index, St = 1;
      if (F.wireframe === !0) {
        if (gt = K.getWireframeAttribute(O), gt === void 0) return;
        St = 2;
      }
      const bt = O.drawRange, xt = O.attributes.position;
      let Zt = bt.start * St, oe = (bt.start + bt.count) * St;
      tt !== null && (Zt = Math.max(Zt, tt.start * St), oe = Math.min(oe, (tt.start + tt.count) * St)), gt !== null ? (Zt = Math.max(Zt, 0), oe = Math.min(oe, gt.count)) : xt != null && (Zt = Math.max(Zt, 0), oe = Math.min(oe, xt.count));
      const ue = oe - Zt;
      if (ue < 0 || ue === 1 / 0) return;
      ne.setup(I, F, pt, O, gt);
      let ze, Yt = ft;
      if (gt !== null && (ze = $.get(gt), Yt = Bt, Yt.setIndex(ze)), I.isMesh)
        F.wireframe === !0 ? (Tt.setLineWidth(F.wireframeLinewidth * zt()), Yt.setMode(C.LINES)) : Yt.setMode(C.TRIANGLES);
      else if (I.isLine) {
        let yt = F.linewidth;
        yt === void 0 && (yt = 1), Tt.setLineWidth(yt * zt()), I.isLineSegments ? Yt.setMode(C.LINES) : I.isLineLoop ? Yt.setMode(C.LINE_LOOP) : Yt.setMode(C.LINE_STRIP);
      } else I.isPoints ? Yt.setMode(C.POINTS) : I.isSprite && Yt.setMode(C.TRIANGLES);
      if (I.isBatchedMesh)
        if (I._multiDrawInstances !== null)
          Yt.renderMultiDrawInstances(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount, I._multiDrawInstances);
        else if (Ft.get("WEBGL_multi_draw"))
          Yt.renderMultiDraw(I._multiDrawStarts, I._multiDrawCounts, I._multiDrawCount);
        else {
          const yt = I._multiDrawStarts, Ee = I._multiDrawCounts, jt = I._multiDrawCount, tn = gt ? $.get(gt).bytesPerElement : 1, vi = Rt.get(F).currentProgram.getUniforms();
          for (let He = 0; He < jt; He++)
            vi.setValue(C, "_gl_DrawID", He), Yt.render(yt[He] / tn, Ee[He]);
        }
      else if (I.isInstancedMesh)
        Yt.renderInstances(Zt, ue, I.count);
      else if (O.isInstancedBufferGeometry) {
        const yt = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, Ee = Math.min(O.instanceCount, yt);
        Yt.renderInstances(Zt, ue, Ee);
      } else
        Yt.render(Zt, ue);
    };
    function $t(M, L, O) {
      M.transparent === !0 && M.side === on && M.forceSinglePass === !1 ? (M.side = Fe, M.needsUpdate = !0, tr(M, L, O), M.side = In, M.needsUpdate = !0, tr(M, L, O), M.side = on) : tr(M, L, O);
    }
    this.compile = function(M, L, O = null) {
      O === null && (O = M), p = Gt.get(O), p.init(L), b.push(p), O.traverseVisible(function(I) {
        I.isLight && I.layers.test(L.layers) && (p.pushLight(I), I.castShadow && p.pushShadow(I));
      }), M !== O && M.traverseVisible(function(I) {
        I.isLight && I.layers.test(L.layers) && (p.pushLight(I), I.castShadow && p.pushShadow(I));
      }), p.setupLights();
      const F = /* @__PURE__ */ new Set();
      return M.traverse(function(I) {
        if (!(I.isMesh || I.isPoints || I.isLine || I.isSprite))
          return;
        const tt = I.material;
        if (tt)
          if (Array.isArray(tt))
            for (let rt = 0; rt < tt.length; rt++) {
              const pt = tt[rt];
              $t(pt, O, I), F.add(pt);
            }
          else
            $t(tt, O, I), F.add(tt);
      }), b.pop(), p = null, F;
    }, this.compileAsync = function(M, L, O = null) {
      const F = this.compile(M, L, O);
      return new Promise((I) => {
        function tt() {
          if (F.forEach(function(rt) {
            Rt.get(rt).currentProgram.isReady() && F.delete(rt);
          }), F.size === 0) {
            I(M);
            return;
          }
          setTimeout(tt, 10);
        }
        Ft.get("KHR_parallel_shader_compile") !== null ? tt() : setTimeout(tt, 10);
      });
    };
    let Ue = null;
    function xn(M) {
      Ue && Ue(M);
    }
    function Lc() {
      Qn.stop();
    }
    function Ic() {
      Qn.start();
    }
    const Qn = new xu();
    Qn.setAnimationLoop(xn), typeof self < "u" && Qn.setContext(self), this.setAnimationLoop = function(M) {
      Ue = M, V.setAnimationLoop(M), M === null ? Qn.stop() : Qn.start();
    }, V.addEventListener("sessionstart", Lc), V.addEventListener("sessionend", Ic), this.render = function(M, L) {
      if (L !== void 0 && L.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (S === !0) return;
      if (M.matrixWorldAutoUpdate === !0 && M.updateMatrixWorld(), L.parent === null && L.matrixWorldAutoUpdate === !0 && L.updateMatrixWorld(), V.enabled === !0 && V.isPresenting === !0 && (V.cameraAutoUpdate === !0 && V.updateCamera(L), L = V.getCamera()), M.isScene === !0 && M.onBeforeRender(y, M, L, A), p = Gt.get(M, b.length), p.init(L), b.push(p), ht.multiplyMatrices(L.projectionMatrix, L.matrixWorldInverse), Kt.setFromProjectionMatrix(ht), Z = this.localClippingEnabled, W = J.init(this.clippingPlanes, Z), _ = ut.get(M, m.length), _.init(), m.push(_), V.enabled === !0 && V.isPresenting === !0) {
        const tt = y.xr.getDepthSensingMesh();
        tt !== null && co(tt, L, -1 / 0, y.sortObjects);
      }
      co(M, L, 0, y.sortObjects), _.finish(), y.sortObjects === !0 && _.sort(G, ct), te = V.enabled === !1 || V.isPresenting === !1 || V.hasDepthSensing() === !1, te && At.addToRenderList(_, M), this.info.render.frame++, W === !0 && J.beginShadows();
      const O = p.state.shadowsArray;
      dt.render(O, M, L), W === !0 && J.endShadows(), this.info.autoReset === !0 && this.info.reset();
      const F = _.opaque, I = _.transmissive;
      if (p.setupLights(), L.isArrayCamera) {
        const tt = L.cameras;
        if (I.length > 0)
          for (let rt = 0, pt = tt.length; rt < pt; rt++) {
            const gt = tt[rt];
            Nc(F, I, M, gt);
          }
        te && At.render(M);
        for (let rt = 0, pt = tt.length; rt < pt; rt++) {
          const gt = tt[rt];
          Dc(_, M, gt, gt.viewport);
        }
      } else
        I.length > 0 && Nc(F, I, M, L), te && At.render(M), Dc(_, M, L);
      A !== null && (T.updateMultisampleRenderTarget(A), T.updateRenderTargetMipmap(A)), M.isScene === !0 && M.onAfterRender(y, M, L), ne.resetDefaultState(), N = -1, Y = null, b.pop(), b.length > 0 ? (p = b[b.length - 1], W === !0 && J.setGlobalState(y.clippingPlanes, p.state.camera)) : p = null, m.pop(), m.length > 0 ? _ = m[m.length - 1] : _ = null;
    };
    function co(M, L, O, F) {
      if (M.visible === !1) return;
      if (M.layers.test(L.layers)) {
        if (M.isGroup)
          O = M.renderOrder;
        else if (M.isLOD)
          M.autoUpdate === !0 && M.update(L);
        else if (M.isLight)
          p.pushLight(M), M.castShadow && p.pushShadow(M);
        else if (M.isSprite) {
          if (!M.frustumCulled || Kt.intersectsSprite(M)) {
            F && Et.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ht);
            const rt = X.update(M), pt = M.material;
            pt.visible && _.push(M, rt, pt, O, Et.z, null);
          }
        } else if ((M.isMesh || M.isLine || M.isPoints) && (!M.frustumCulled || Kt.intersectsObject(M))) {
          const rt = X.update(M), pt = M.material;
          if (F && (M.boundingSphere !== void 0 ? (M.boundingSphere === null && M.computeBoundingSphere(), Et.copy(M.boundingSphere.center)) : (rt.boundingSphere === null && rt.computeBoundingSphere(), Et.copy(rt.boundingSphere.center)), Et.applyMatrix4(M.matrixWorld).applyMatrix4(ht)), Array.isArray(pt)) {
            const gt = rt.groups;
            for (let St = 0, bt = gt.length; St < bt; St++) {
              const xt = gt[St], Zt = pt[xt.materialIndex];
              Zt && Zt.visible && _.push(M, rt, Zt, O, Et.z, xt);
            }
          } else pt.visible && _.push(M, rt, pt, O, Et.z, null);
        }
      }
      const tt = M.children;
      for (let rt = 0, pt = tt.length; rt < pt; rt++)
        co(tt[rt], L, O, F);
    }
    function Dc(M, L, O, F) {
      const I = M.opaque, tt = M.transmissive, rt = M.transparent;
      p.setupLightsView(O), W === !0 && J.setGlobalState(y.clippingPlanes, O), F && Tt.viewport(v.copy(F)), I.length > 0 && Qs(I, L, O), tt.length > 0 && Qs(tt, L, O), rt.length > 0 && Qs(rt, L, O), Tt.buffers.depth.setTest(!0), Tt.buffers.depth.setMask(!0), Tt.buffers.color.setMask(!0), Tt.setPolygonOffset(!1);
    }
    function Nc(M, L, O, F) {
      if ((O.isScene === !0 ? O.overrideMaterial : null) !== null)
        return;
      p.state.transmissionRenderTarget[F.id] === void 0 && (p.state.transmissionRenderTarget[F.id] = new mi(1, 1, {
        generateMipmaps: !0,
        type: Ft.has("EXT_color_buffer_half_float") || Ft.has("EXT_color_buffer_float") ? js : Dn,
        minFilter: Pn,
        samples: 4,
        stencilBuffer: r,
        resolveDepthBuffer: !1,
        resolveStencilBuffer: !1,
        colorSpace: Wt.workingColorSpace
      }));
      const tt = p.state.transmissionRenderTarget[F.id], rt = F.viewport || v;
      tt.setSize(rt.z, rt.w);
      const pt = y.getRenderTarget();
      y.setRenderTarget(tt), y.getClearColor(B), H = y.getClearAlpha(), H < 1 && y.setClearColor(16777215, 0.5), y.clear(), te && At.render(O);
      const gt = y.toneMapping;
      y.toneMapping = jn;
      const St = F.viewport;
      if (F.viewport !== void 0 && (F.viewport = void 0), p.setupLightsView(F), W === !0 && J.setGlobalState(y.clippingPlanes, F), Qs(M, O, F), T.updateMultisampleRenderTarget(tt), T.updateRenderTargetMipmap(tt), Ft.has("WEBGL_multisampled_render_to_texture") === !1) {
        let bt = !1;
        for (let xt = 0, Zt = L.length; xt < Zt; xt++) {
          const oe = L[xt], ue = oe.object, ze = oe.geometry, Yt = oe.material, yt = oe.group;
          if (Yt.side === on && ue.layers.test(F.layers)) {
            const Ee = Yt.side;
            Yt.side = Fe, Yt.needsUpdate = !0, Uc(ue, O, F, ze, Yt, yt), Yt.side = Ee, Yt.needsUpdate = !0, bt = !0;
          }
        }
        bt === !0 && (T.updateMultisampleRenderTarget(tt), T.updateRenderTargetMipmap(tt));
      }
      y.setRenderTarget(pt), y.setClearColor(B, H), St !== void 0 && (F.viewport = St), y.toneMapping = gt;
    }
    function Qs(M, L, O) {
      const F = L.isScene === !0 ? L.overrideMaterial : null;
      for (let I = 0, tt = M.length; I < tt; I++) {
        const rt = M[I], pt = rt.object, gt = rt.geometry, St = F === null ? rt.material : F, bt = rt.group;
        pt.layers.test(O.layers) && Uc(pt, L, O, gt, St, bt);
      }
    }
    function Uc(M, L, O, F, I, tt) {
      M.onBeforeRender(y, L, O, F, I, tt), M.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, M.matrixWorld), M.normalMatrix.getNormalMatrix(M.modelViewMatrix), I.onBeforeRender(y, L, O, F, M, tt), I.transparent === !0 && I.side === on && I.forceSinglePass === !1 ? (I.side = Fe, I.needsUpdate = !0, y.renderBufferDirect(O, L, F, I, M, tt), I.side = In, I.needsUpdate = !0, y.renderBufferDirect(O, L, F, I, M, tt), I.side = on) : y.renderBufferDirect(O, L, F, I, M, tt), M.onAfterRender(y, L, O, F, I, tt);
    }
    function tr(M, L, O) {
      L.isScene !== !0 && (L = kt);
      const F = Rt.get(M), I = p.state.lights, tt = p.state.shadowsArray, rt = I.state.version, pt = vt.getParameters(M, I.state, tt, L, O), gt = vt.getProgramCacheKey(pt);
      let St = F.programs;
      F.environment = M.isMeshStandardMaterial ? L.environment : null, F.fog = L.fog, F.envMap = (M.isMeshStandardMaterial ? U : x).get(M.envMap || F.environment), F.envMapRotation = F.environment !== null && M.envMap === null ? L.environmentRotation : M.envMapRotation, St === void 0 && (M.addEventListener("dispose", Ht), St = /* @__PURE__ */ new Map(), F.programs = St);
      let bt = St.get(gt);
      if (bt !== void 0) {
        if (F.currentProgram === bt && F.lightsStateVersion === rt)
          return Fc(M, pt), bt;
      } else
        pt.uniforms = vt.getUniforms(M), M.onBeforeCompile(pt, y), bt = vt.acquireProgram(pt, gt), St.set(gt, bt), F.uniforms = pt.uniforms;
      const xt = F.uniforms;
      return (!M.isShaderMaterial && !M.isRawShaderMaterial || M.clipping === !0) && (xt.clippingPlanes = J.uniform), Fc(M, pt), F.needsLights = nd(M), F.lightsStateVersion = rt, F.needsLights && (xt.ambientLightColor.value = I.state.ambient, xt.lightProbe.value = I.state.probe, xt.directionalLights.value = I.state.directional, xt.directionalLightShadows.value = I.state.directionalShadow, xt.spotLights.value = I.state.spot, xt.spotLightShadows.value = I.state.spotShadow, xt.rectAreaLights.value = I.state.rectArea, xt.ltc_1.value = I.state.rectAreaLTC1, xt.ltc_2.value = I.state.rectAreaLTC2, xt.pointLights.value = I.state.point, xt.pointLightShadows.value = I.state.pointShadow, xt.hemisphereLights.value = I.state.hemi, xt.directionalShadowMap.value = I.state.directionalShadowMap, xt.directionalShadowMatrix.value = I.state.directionalShadowMatrix, xt.spotShadowMap.value = I.state.spotShadowMap, xt.spotLightMatrix.value = I.state.spotLightMatrix, xt.spotLightMap.value = I.state.spotLightMap, xt.pointShadowMap.value = I.state.pointShadowMap, xt.pointShadowMatrix.value = I.state.pointShadowMatrix), F.currentProgram = bt, F.uniformsList = null, bt;
    }
    function Oc(M) {
      if (M.uniformsList === null) {
        const L = M.currentProgram.getUniforms();
        M.uniformsList = Xr.seqWithValue(L.seq, M.uniforms);
      }
      return M.uniformsList;
    }
    function Fc(M, L) {
      const O = Rt.get(M);
      O.outputColorSpace = L.outputColorSpace, O.batching = L.batching, O.batchingColor = L.batchingColor, O.instancing = L.instancing, O.instancingColor = L.instancingColor, O.instancingMorph = L.instancingMorph, O.skinning = L.skinning, O.morphTargets = L.morphTargets, O.morphNormals = L.morphNormals, O.morphColors = L.morphColors, O.morphTargetsCount = L.morphTargetsCount, O.numClippingPlanes = L.numClippingPlanes, O.numIntersection = L.numClipIntersection, O.vertexAlphas = L.vertexAlphas, O.vertexTangents = L.vertexTangents, O.toneMapping = L.toneMapping;
    }
    function td(M, L, O, F, I) {
      L.isScene !== !0 && (L = kt), T.resetTextureUnits();
      const tt = L.fog, rt = F.isMeshStandardMaterial ? L.environment : null, pt = A === null ? y.outputColorSpace : A.isXRRenderTarget === !0 ? A.texture.colorSpace : be, gt = (F.isMeshStandardMaterial ? U : x).get(F.envMap || rt), St = F.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4, bt = !!O.attributes.tangent && (!!F.normalMap || F.anisotropy > 0), xt = !!O.morphAttributes.position, Zt = !!O.morphAttributes.normal, oe = !!O.morphAttributes.color;
      let ue = jn;
      F.toneMapped && (A === null || A.isXRRenderTarget === !0) && (ue = y.toneMapping);
      const ze = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, Yt = ze !== void 0 ? ze.length : 0, yt = Rt.get(F), Ee = p.state.lights;
      if (W === !0 && (Z === !0 || M !== Y)) {
        const Xe = M === Y && F.id === N;
        J.setState(F, M, Xe);
      }
      let jt = !1;
      F.version === yt.__version ? (yt.needsLights && yt.lightsStateVersion !== Ee.state.version || yt.outputColorSpace !== pt || I.isBatchedMesh && yt.batching === !1 || !I.isBatchedMesh && yt.batching === !0 || I.isBatchedMesh && yt.batchingColor === !0 && I.colorTexture === null || I.isBatchedMesh && yt.batchingColor === !1 && I.colorTexture !== null || I.isInstancedMesh && yt.instancing === !1 || !I.isInstancedMesh && yt.instancing === !0 || I.isSkinnedMesh && yt.skinning === !1 || !I.isSkinnedMesh && yt.skinning === !0 || I.isInstancedMesh && yt.instancingColor === !0 && I.instanceColor === null || I.isInstancedMesh && yt.instancingColor === !1 && I.instanceColor !== null || I.isInstancedMesh && yt.instancingMorph === !0 && I.morphTexture === null || I.isInstancedMesh && yt.instancingMorph === !1 && I.morphTexture !== null || yt.envMap !== gt || F.fog === !0 && yt.fog !== tt || yt.numClippingPlanes !== void 0 && (yt.numClippingPlanes !== J.numPlanes || yt.numIntersection !== J.numIntersection) || yt.vertexAlphas !== St || yt.vertexTangents !== bt || yt.morphTargets !== xt || yt.morphNormals !== Zt || yt.morphColors !== oe || yt.toneMapping !== ue || yt.morphTargetsCount !== Yt) && (jt = !0) : (jt = !0, yt.__version = F.version);
      let tn = yt.currentProgram;
      jt === !0 && (tn = tr(F, L, I));
      let vi = !1, He = !1, lo = !1;
      const de = tn.getUniforms(), Nn = yt.uniforms;
      if (Tt.useProgram(tn.program) && (vi = !0, He = !0, lo = !0), F.id !== N && (N = F.id, He = !0), vi || Y !== M) {
        Vt.reverseDepthBuffer ? (mt.copy(M.projectionMatrix), Ff(mt), Bf(mt), de.setValue(C, "projectionMatrix", mt)) : de.setValue(C, "projectionMatrix", M.projectionMatrix), de.setValue(C, "viewMatrix", M.matrixWorldInverse);
        const Xe = de.map.cameraPosition;
        Xe !== void 0 && Xe.setValue(C, Pt.setFromMatrixPosition(M.matrixWorld)), Vt.logarithmicDepthBuffer && de.setValue(
          C,
          "logDepthBufFC",
          2 / (Math.log(M.far + 1) / Math.LN2)
        ), (F.isMeshPhongMaterial || F.isMeshToonMaterial || F.isMeshLambertMaterial || F.isMeshBasicMaterial || F.isMeshStandardMaterial || F.isShaderMaterial) && de.setValue(C, "isOrthographic", M.isOrthographicCamera === !0), Y !== M && (Y = M, He = !0, lo = !0);
      }
      if (I.isSkinnedMesh) {
        de.setOptional(C, I, "bindMatrix"), de.setOptional(C, I, "bindMatrixInverse");
        const Xe = I.skeleton;
        Xe && (Xe.boneTexture === null && Xe.computeBoneTexture(), de.setValue(C, "boneTexture", Xe.boneTexture, T));
      }
      I.isBatchedMesh && (de.setOptional(C, I, "batchingTexture"), de.setValue(C, "batchingTexture", I._matricesTexture, T), de.setOptional(C, I, "batchingIdTexture"), de.setValue(C, "batchingIdTexture", I._indirectTexture, T), de.setOptional(C, I, "batchingColorTexture"), I._colorsTexture !== null && de.setValue(C, "batchingColorTexture", I._colorsTexture, T));
      const ho = O.morphAttributes;
      if ((ho.position !== void 0 || ho.normal !== void 0 || ho.color !== void 0) && wt.update(I, O, tn), (He || yt.receiveShadow !== I.receiveShadow) && (yt.receiveShadow = I.receiveShadow, de.setValue(C, "receiveShadow", I.receiveShadow)), F.isMeshGouraudMaterial && F.envMap !== null && (Nn.envMap.value = gt, Nn.flipEnvMap.value = gt.isCubeTexture && gt.isRenderTargetTexture === !1 ? -1 : 1), F.isMeshStandardMaterial && F.envMap === null && L.environment !== null && (Nn.envMapIntensity.value = L.environmentIntensity), He && (de.setValue(C, "toneMappingExposure", y.toneMappingExposure), yt.needsLights && ed(Nn, lo), tt && F.fog === !0 && it.refreshFogUniforms(Nn, tt), it.refreshMaterialUniforms(Nn, F, Q, z, p.state.transmissionRenderTarget[M.id]), Xr.upload(C, Oc(yt), Nn, T)), F.isShaderMaterial && F.uniformsNeedUpdate === !0 && (Xr.upload(C, Oc(yt), Nn, T), F.uniformsNeedUpdate = !1), F.isSpriteMaterial && de.setValue(C, "center", I.center), de.setValue(C, "modelViewMatrix", I.modelViewMatrix), de.setValue(C, "normalMatrix", I.normalMatrix), de.setValue(C, "modelMatrix", I.matrixWorld), F.isShaderMaterial || F.isRawShaderMaterial) {
        const Xe = F.uniformsGroups;
        for (let uo = 0, id = Xe.length; uo < id; uo++) {
          const Bc = Xe[uo];
          P.update(Bc, tn), P.bind(Bc, tn);
        }
      }
      return tn;
    }
    function ed(M, L) {
      M.ambientLightColor.needsUpdate = L, M.lightProbe.needsUpdate = L, M.directionalLights.needsUpdate = L, M.directionalLightShadows.needsUpdate = L, M.pointLights.needsUpdate = L, M.pointLightShadows.needsUpdate = L, M.spotLights.needsUpdate = L, M.spotLightShadows.needsUpdate = L, M.rectAreaLights.needsUpdate = L, M.hemisphereLights.needsUpdate = L;
    }
    function nd(M) {
      return M.isMeshLambertMaterial || M.isMeshToonMaterial || M.isMeshPhongMaterial || M.isMeshStandardMaterial || M.isShadowMaterial || M.isShaderMaterial && M.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return D;
    }, this.getActiveMipmapLevel = function() {
      return R;
    }, this.getRenderTarget = function() {
      return A;
    }, this.setRenderTargetTextures = function(M, L, O) {
      Rt.get(M.texture).__webglTexture = L, Rt.get(M.depthTexture).__webglTexture = O;
      const F = Rt.get(M);
      F.__hasExternalTextures = !0, F.__autoAllocateDepthBuffer = O === void 0, F.__autoAllocateDepthBuffer || Ft.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), F.__useRenderToTexture = !1);
    }, this.setRenderTargetFramebuffer = function(M, L) {
      const O = Rt.get(M);
      O.__webglFramebuffer = L, O.__useDefaultFramebuffer = L === void 0;
    }, this.setRenderTarget = function(M, L = 0, O = 0) {
      A = M, D = L, R = O;
      let F = !0, I = null, tt = !1, rt = !1;
      if (M) {
        const gt = Rt.get(M);
        if (gt.__useDefaultFramebuffer !== void 0)
          Tt.bindFramebuffer(C.FRAMEBUFFER, null), F = !1;
        else if (gt.__webglFramebuffer === void 0)
          T.setupRenderTarget(M);
        else if (gt.__hasExternalTextures)
          T.rebindTextures(M, Rt.get(M.texture).__webglTexture, Rt.get(M.depthTexture).__webglTexture);
        else if (M.depthBuffer) {
          const xt = M.depthTexture;
          if (gt.__boundDepthTexture !== xt) {
            if (xt !== null && Rt.has(xt) && (M.width !== xt.image.width || M.height !== xt.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            T.setupDepthRenderbuffer(M);
          }
        }
        const St = M.texture;
        (St.isData3DTexture || St.isDataArrayTexture || St.isCompressedArrayTexture) && (rt = !0);
        const bt = Rt.get(M).__webglFramebuffer;
        M.isWebGLCubeRenderTarget ? (Array.isArray(bt[L]) ? I = bt[L][O] : I = bt[L], tt = !0) : M.samples > 0 && T.useMultisampledRTT(M) === !1 ? I = Rt.get(M).__webglMultisampledFramebuffer : Array.isArray(bt) ? I = bt[O] : I = bt, v.copy(M.viewport), E.copy(M.scissor), k = M.scissorTest;
      } else
        v.copy(lt).multiplyScalar(Q).floor(), E.copy(_t).multiplyScalar(Q).floor(), k = Xt;
      if (Tt.bindFramebuffer(C.FRAMEBUFFER, I) && F && Tt.drawBuffers(M, I), Tt.viewport(v), Tt.scissor(E), Tt.setScissorTest(k), tt) {
        const gt = Rt.get(M.texture);
        C.framebufferTexture2D(C.FRAMEBUFFER, C.COLOR_ATTACHMENT0, C.TEXTURE_CUBE_MAP_POSITIVE_X + L, gt.__webglTexture, O);
      } else if (rt) {
        const gt = Rt.get(M.texture), St = L || 0;
        C.framebufferTextureLayer(C.FRAMEBUFFER, C.COLOR_ATTACHMENT0, gt.__webglTexture, O || 0, St);
      }
      N = -1;
    }, this.readRenderTargetPixels = function(M, L, O, F, I, tt, rt) {
      if (!(M && M.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let pt = Rt.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && rt !== void 0 && (pt = pt[rt]), pt) {
        Tt.bindFramebuffer(C.FRAMEBUFFER, pt);
        try {
          const gt = M.texture, St = gt.format, bt = gt.type;
          if (!Vt.textureFormatReadable(St)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!Vt.textureTypeReadable(bt)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          L >= 0 && L <= M.width - F && O >= 0 && O <= M.height - I && C.readPixels(L, O, F, I, Lt.convert(St), Lt.convert(bt), tt);
        } finally {
          const gt = A !== null ? Rt.get(A).__webglFramebuffer : null;
          Tt.bindFramebuffer(C.FRAMEBUFFER, gt);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(M, L, O, F, I, tt, rt) {
      if (!(M && M.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let pt = Rt.get(M).__webglFramebuffer;
      if (M.isWebGLCubeRenderTarget && rt !== void 0 && (pt = pt[rt]), pt) {
        const gt = M.texture, St = gt.format, bt = gt.type;
        if (!Vt.textureFormatReadable(St))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
        if (!Vt.textureTypeReadable(bt))
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
        if (L >= 0 && L <= M.width - F && O >= 0 && O <= M.height - I) {
          Tt.bindFramebuffer(C.FRAMEBUFFER, pt);
          const xt = C.createBuffer();
          C.bindBuffer(C.PIXEL_PACK_BUFFER, xt), C.bufferData(C.PIXEL_PACK_BUFFER, tt.byteLength, C.STREAM_READ), C.readPixels(L, O, F, I, Lt.convert(St), Lt.convert(bt), 0);
          const Zt = A !== null ? Rt.get(A).__webglFramebuffer : null;
          Tt.bindFramebuffer(C.FRAMEBUFFER, Zt);
          const oe = C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return C.flush(), await Of(C, oe, 4), C.bindBuffer(C.PIXEL_PACK_BUFFER, xt), C.getBufferSubData(C.PIXEL_PACK_BUFFER, 0, tt), C.deleteBuffer(xt), C.deleteSync(oe), tt;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function(M, L = null, O = 0) {
      M.isTexture !== !0 && (Wr("WebGLRenderer: copyFramebufferToTexture function signature has changed."), L = arguments[0] || null, M = arguments[1]);
      const F = Math.pow(2, -O), I = Math.floor(M.image.width * F), tt = Math.floor(M.image.height * F), rt = L !== null ? L.x : 0, pt = L !== null ? L.y : 0;
      T.setTexture2D(M, 0), C.copyTexSubImage2D(C.TEXTURE_2D, O, 0, 0, rt, pt, I, tt), Tt.unbindTexture();
    }, this.copyTextureToTexture = function(M, L, O = null, F = null, I = 0) {
      M.isTexture !== !0 && (Wr("WebGLRenderer: copyTextureToTexture function signature has changed."), F = arguments[0] || null, M = arguments[1], L = arguments[2], I = arguments[3] || 0, O = null);
      let tt, rt, pt, gt, St, bt;
      O !== null ? (tt = O.max.x - O.min.x, rt = O.max.y - O.min.y, pt = O.min.x, gt = O.min.y) : (tt = M.image.width, rt = M.image.height, pt = 0, gt = 0), F !== null ? (St = F.x, bt = F.y) : (St = 0, bt = 0);
      const xt = Lt.convert(L.format), Zt = Lt.convert(L.type);
      T.setTexture2D(L, 0), C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, L.flipY), C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL, L.premultiplyAlpha), C.pixelStorei(C.UNPACK_ALIGNMENT, L.unpackAlignment);
      const oe = C.getParameter(C.UNPACK_ROW_LENGTH), ue = C.getParameter(C.UNPACK_IMAGE_HEIGHT), ze = C.getParameter(C.UNPACK_SKIP_PIXELS), Yt = C.getParameter(C.UNPACK_SKIP_ROWS), yt = C.getParameter(C.UNPACK_SKIP_IMAGES), Ee = M.isCompressedTexture ? M.mipmaps[I] : M.image;
      C.pixelStorei(C.UNPACK_ROW_LENGTH, Ee.width), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, Ee.height), C.pixelStorei(C.UNPACK_SKIP_PIXELS, pt), C.pixelStorei(C.UNPACK_SKIP_ROWS, gt), M.isDataTexture ? C.texSubImage2D(C.TEXTURE_2D, I, St, bt, tt, rt, xt, Zt, Ee.data) : M.isCompressedTexture ? C.compressedTexSubImage2D(C.TEXTURE_2D, I, St, bt, Ee.width, Ee.height, xt, Ee.data) : C.texSubImage2D(C.TEXTURE_2D, I, St, bt, tt, rt, xt, Zt, Ee), C.pixelStorei(C.UNPACK_ROW_LENGTH, oe), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, ue), C.pixelStorei(C.UNPACK_SKIP_PIXELS, ze), C.pixelStorei(C.UNPACK_SKIP_ROWS, Yt), C.pixelStorei(C.UNPACK_SKIP_IMAGES, yt), I === 0 && L.generateMipmaps && C.generateMipmap(C.TEXTURE_2D), Tt.unbindTexture();
    }, this.copyTextureToTexture3D = function(M, L, O = null, F = null, I = 0) {
      M.isTexture !== !0 && (Wr("WebGLRenderer: copyTextureToTexture3D function signature has changed."), O = arguments[0] || null, F = arguments[1] || null, M = arguments[2], L = arguments[3], I = arguments[4] || 0);
      let tt, rt, pt, gt, St, bt, xt, Zt, oe;
      const ue = M.isCompressedTexture ? M.mipmaps[I] : M.image;
      O !== null ? (tt = O.max.x - O.min.x, rt = O.max.y - O.min.y, pt = O.max.z - O.min.z, gt = O.min.x, St = O.min.y, bt = O.min.z) : (tt = ue.width, rt = ue.height, pt = ue.depth, gt = 0, St = 0, bt = 0), F !== null ? (xt = F.x, Zt = F.y, oe = F.z) : (xt = 0, Zt = 0, oe = 0);
      const ze = Lt.convert(L.format), Yt = Lt.convert(L.type);
      let yt;
      if (L.isData3DTexture)
        T.setTexture3D(L, 0), yt = C.TEXTURE_3D;
      else if (L.isDataArrayTexture || L.isCompressedArrayTexture)
        T.setTexture2DArray(L, 0), yt = C.TEXTURE_2D_ARRAY;
      else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, L.flipY), C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL, L.premultiplyAlpha), C.pixelStorei(C.UNPACK_ALIGNMENT, L.unpackAlignment);
      const Ee = C.getParameter(C.UNPACK_ROW_LENGTH), jt = C.getParameter(C.UNPACK_IMAGE_HEIGHT), tn = C.getParameter(C.UNPACK_SKIP_PIXELS), vi = C.getParameter(C.UNPACK_SKIP_ROWS), He = C.getParameter(C.UNPACK_SKIP_IMAGES);
      C.pixelStorei(C.UNPACK_ROW_LENGTH, ue.width), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, ue.height), C.pixelStorei(C.UNPACK_SKIP_PIXELS, gt), C.pixelStorei(C.UNPACK_SKIP_ROWS, St), C.pixelStorei(C.UNPACK_SKIP_IMAGES, bt), M.isDataTexture || M.isData3DTexture ? C.texSubImage3D(yt, I, xt, Zt, oe, tt, rt, pt, ze, Yt, ue.data) : L.isCompressedArrayTexture ? C.compressedTexSubImage3D(yt, I, xt, Zt, oe, tt, rt, pt, ze, ue.data) : C.texSubImage3D(yt, I, xt, Zt, oe, tt, rt, pt, ze, Yt, ue), C.pixelStorei(C.UNPACK_ROW_LENGTH, Ee), C.pixelStorei(C.UNPACK_IMAGE_HEIGHT, jt), C.pixelStorei(C.UNPACK_SKIP_PIXELS, tn), C.pixelStorei(C.UNPACK_SKIP_ROWS, vi), C.pixelStorei(C.UNPACK_SKIP_IMAGES, He), I === 0 && L.generateMipmaps && C.generateMipmap(yt), Tt.unbindTexture();
    }, this.initRenderTarget = function(M) {
      Rt.get(M).__webglFramebuffer === void 0 && T.setupRenderTarget(M);
    }, this.initTexture = function(M) {
      M.isCubeTexture ? T.setTextureCube(M, 0) : M.isData3DTexture ? T.setTexture3D(M, 0) : M.isDataArrayTexture || M.isCompressedArrayTexture ? T.setTexture2DArray(M, 0) : T.setTexture2D(M, 0), Tt.unbindTexture();
    }, this.resetState = function() {
      D = 0, R = 0, A = null, Tt.reset(), ne.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return Ln;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(t) {
    this._outputColorSpace = t;
    const e = this.getContext();
    e.drawingBufferColorSpace = t === uc ? "display-p3" : "srgb", e.unpackColorSpace = Wt.workingColorSpace === so ? "display-p3" : "srgb";
  }
}
class j0 extends ce {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new pn(), this.environmentIntensity = 1, this.environmentRotation = new pn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(t, e) {
    return super.copy(t, e), t.background !== null && (this.background = t.background.clone()), t.environment !== null && (this.environment = t.environment.clone()), t.fog !== null && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), t.overrideMaterial !== null && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this;
  }
  toJSON(t) {
    const e = super.toJSON(t);
    return this.fog !== null && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e;
  }
}
class Tu {
  constructor(t, e) {
    this.isInterleavedBuffer = !0, this.array = t, this.stride = e, this.count = t !== void 0 ? t.length / e : 0, this.usage = za, this.updateRanges = [], this.version = 0, this.uuid = Ze();
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
    t.arrayBuffers === void 0 && (t.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Ze()), t.arrayBuffers[this.array.buffer._uuid] === void 0 && (t.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer);
    const e = new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]), n = new this.constructor(e, this.stride);
    return n.setUsage(this.usage), n;
  }
  onUpload(t) {
    return this.onUploadCallback = t, this;
  }
  toJSON(t) {
    return t.arrayBuffers === void 0 && (t.arrayBuffers = {}), this.array.buffer._uuid === void 0 && (this.array.buffer._uuid = Ze()), t.arrayBuffers[this.array.buffer._uuid] === void 0 && (t.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer))), {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
const Re = /* @__PURE__ */ new w();
class Ws {
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
      Re.fromBufferAttribute(this, e), Re.applyMatrix4(t), this.setXYZ(e, Re.x, Re.y, Re.z);
    return this;
  }
  applyNormalMatrix(t) {
    for (let e = 0, n = this.count; e < n; e++)
      Re.fromBufferAttribute(this, e), Re.applyNormalMatrix(t), this.setXYZ(e, Re.x, Re.y, Re.z);
    return this;
  }
  transformDirection(t) {
    for (let e = 0, n = this.count; e < n; e++)
      Re.fromBufferAttribute(this, e), Re.transformDirection(t), this.setXYZ(e, Re.x, Re.y, Re.z);
    return this;
  }
  getComponent(t, e) {
    let n = this.array[t * this.data.stride + this.offset + e];
    return this.normalized && (n = an(n, this.array)), n;
  }
  setComponent(t, e, n) {
    return this.normalized && (n = Jt(n, this.array)), this.data.array[t * this.data.stride + this.offset + e] = n, this;
  }
  setX(t, e) {
    return this.normalized && (e = Jt(e, this.array)), this.data.array[t * this.data.stride + this.offset] = e, this;
  }
  setY(t, e) {
    return this.normalized && (e = Jt(e, this.array)), this.data.array[t * this.data.stride + this.offset + 1] = e, this;
  }
  setZ(t, e) {
    return this.normalized && (e = Jt(e, this.array)), this.data.array[t * this.data.stride + this.offset + 2] = e, this;
  }
  setW(t, e) {
    return this.normalized && (e = Jt(e, this.array)), this.data.array[t * this.data.stride + this.offset + 3] = e, this;
  }
  getX(t) {
    let e = this.data.array[t * this.data.stride + this.offset];
    return this.normalized && (e = an(e, this.array)), e;
  }
  getY(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 1];
    return this.normalized && (e = an(e, this.array)), e;
  }
  getZ(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 2];
    return this.normalized && (e = an(e, this.array)), e;
  }
  getW(t) {
    let e = this.data.array[t * this.data.stride + this.offset + 3];
    return this.normalized && (e = an(e, this.array)), e;
  }
  setXY(t, e, n) {
    return t = t * this.data.stride + this.offset, this.normalized && (e = Jt(e, this.array), n = Jt(n, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this;
  }
  setXYZ(t, e, n, s) {
    return t = t * this.data.stride + this.offset, this.normalized && (e = Jt(e, this.array), n = Jt(n, this.array), s = Jt(s, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = s, this;
  }
  setXYZW(t, e, n, s, r) {
    return t = t * this.data.stride + this.offset, this.normalized && (e = Jt(e, this.array), n = Jt(n, this.array), s = Jt(s, this.array), r = Jt(r, this.array)), this.data.array[t + 0] = e, this.data.array[t + 1] = n, this.data.array[t + 2] = s, this.data.array[t + 3] = r, this;
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
      return t.interleavedBuffers === void 0 && (t.interleavedBuffers = {}), t.interleavedBuffers[this.data.uuid] === void 0 && (t.interleavedBuffers[this.data.uuid] = this.data.clone(t)), new Ws(t.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
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
class Au extends ln {
  constructor(t) {
    super(), this.isSpriteMaterial = !0, this.type = "SpriteMaterial", this.color = new Mt(16777215), this.map = null, this.alphaMap = null, this.rotation = 0, this.sizeAttenuation = !0, this.transparent = !0, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.rotation = t.rotation, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
  }
}
let Di;
const ys = /* @__PURE__ */ new w(), Ni = /* @__PURE__ */ new w(), Ui = /* @__PURE__ */ new w(), Oi = /* @__PURE__ */ new et(), Ms = /* @__PURE__ */ new et(), wu = /* @__PURE__ */ new Ct(), Mr = /* @__PURE__ */ new w(), Ss = /* @__PURE__ */ new w(), Sr = /* @__PURE__ */ new w(), Yl = /* @__PURE__ */ new et(), Go = /* @__PURE__ */ new et(), jl = /* @__PURE__ */ new et();
class K0 extends ce {
  constructor(t = new Au()) {
    if (super(), this.isSprite = !0, this.type = "Sprite", Di === void 0) {
      Di = new we();
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
      ]), n = new Tu(e, 5);
      Di.setIndex([0, 1, 2, 0, 2, 3]), Di.setAttribute("position", new Ws(n, 3, 0, !1)), Di.setAttribute("uv", new Ws(n, 2, 3, !1));
    }
    this.geometry = Di, this.material = t, this.center = new et(0.5, 0.5);
  }
  raycast(t, e) {
    t.camera === null && console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'), Ni.setFromMatrixScale(this.matrixWorld), wu.copy(t.camera.matrixWorld), this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse, this.matrixWorld), Ui.setFromMatrixPosition(this.modelViewMatrix), t.camera.isPerspectiveCamera && this.material.sizeAttenuation === !1 && Ni.multiplyScalar(-Ui.z);
    const n = this.material.rotation;
    let s, r;
    n !== 0 && (r = Math.cos(n), s = Math.sin(n));
    const o = this.center;
    Er(Mr.set(-0.5, -0.5, 0), Ui, o, Ni, s, r), Er(Ss.set(0.5, -0.5, 0), Ui, o, Ni, s, r), Er(Sr.set(0.5, 0.5, 0), Ui, o, Ni, s, r), Yl.set(0, 0), Go.set(1, 0), jl.set(1, 1);
    let a = t.ray.intersectTriangle(Mr, Ss, Sr, !1, ys);
    if (a === null && (Er(Ss.set(-0.5, 0.5, 0), Ui, o, Ni, s, r), Go.set(0, 1), a = t.ray.intersectTriangle(Mr, Sr, Ss, !1, ys), a === null))
      return;
    const c = t.ray.origin.distanceTo(ys);
    c < t.near || c > t.far || e.push({
      distance: c,
      point: ys.clone(),
      uv: je.getInterpolation(ys, Mr, Ss, Sr, Yl, Go, jl, new et()),
      face: null,
      object: this
    });
  }
  copy(t, e) {
    return super.copy(t, e), t.center !== void 0 && this.center.copy(t.center), this.material = t.material, this;
  }
}
function Er(i, t, e, n, s, r) {
  Oi.subVectors(i, e).addScalar(0.5).multiply(n), s !== void 0 ? (Ms.x = r * Oi.x - s * Oi.y, Ms.y = s * Oi.x + r * Oi.y) : Ms.copy(Oi), i.copy(t), i.x += Ms.x, i.y += Ms.y, i.applyMatrix4(wu);
}
const Kl = /* @__PURE__ */ new w(), Zl = /* @__PURE__ */ new qt(), Jl = /* @__PURE__ */ new qt(), Z0 = /* @__PURE__ */ new w(), Ql = /* @__PURE__ */ new Ct(), br = /* @__PURE__ */ new w(), Wo = /* @__PURE__ */ new mn(), th = /* @__PURE__ */ new Ct(), Xo = /* @__PURE__ */ new cs();
class J0 extends ge {
  constructor(t, e) {
    super(t, e), this.isSkinnedMesh = !0, this.type = "SkinnedMesh", this.bindMode = tl, this.bindMatrix = new Ct(), this.bindMatrixInverse = new Ct(), this.boundingBox = null, this.boundingSphere = null;
  }
  computeBoundingBox() {
    const t = this.geometry;
    this.boundingBox === null && (this.boundingBox = new hn()), this.boundingBox.makeEmpty();
    const e = t.getAttribute("position");
    for (let n = 0; n < e.count; n++)
      this.getVertexPosition(n, br), this.boundingBox.expandByPoint(br);
  }
  computeBoundingSphere() {
    const t = this.geometry;
    this.boundingSphere === null && (this.boundingSphere = new mn()), this.boundingSphere.makeEmpty();
    const e = t.getAttribute("position");
    for (let n = 0; n < e.count; n++)
      this.getVertexPosition(n, br), this.boundingSphere.expandByPoint(br);
  }
  copy(t, e) {
    return super.copy(t, e), this.bindMode = t.bindMode, this.bindMatrix.copy(t.bindMatrix), this.bindMatrixInverse.copy(t.bindMatrixInverse), this.skeleton = t.skeleton, t.boundingBox !== null && (this.boundingBox = t.boundingBox.clone()), t.boundingSphere !== null && (this.boundingSphere = t.boundingSphere.clone()), this;
  }
  raycast(t, e) {
    const n = this.material, s = this.matrixWorld;
    n !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), Wo.copy(this.boundingSphere), Wo.applyMatrix4(s), t.ray.intersectsSphere(Wo) !== !1 && (th.copy(s).invert(), Xo.copy(t.ray).applyMatrix4(th), !(this.boundingBox !== null && Xo.intersectsBox(this.boundingBox) === !1) && this._computeIntersections(t, e, Xo)));
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
    const t = new qt(), e = this.geometry.attributes.skinWeight;
    for (let n = 0, s = e.count; n < s; n++) {
      t.fromBufferAttribute(e, n);
      const r = 1 / t.manhattanLength();
      r !== 1 / 0 ? t.multiplyScalar(r) : t.set(1, 0, 0, 0), e.setXYZW(n, t.x, t.y, t.z, t.w);
    }
  }
  updateMatrixWorld(t) {
    super.updateMatrixWorld(t), this.bindMode === tl ? this.bindMatrixInverse.copy(this.matrixWorld).invert() : this.bindMode === of ? this.bindMatrixInverse.copy(this.bindMatrix).invert() : console.warn("THREE.SkinnedMesh: Unrecognized bindMode: " + this.bindMode);
  }
  applyBoneTransform(t, e) {
    const n = this.skeleton, s = this.geometry;
    Zl.fromBufferAttribute(s.attributes.skinIndex, t), Jl.fromBufferAttribute(s.attributes.skinWeight, t), Kl.copy(e).applyMatrix4(this.bindMatrix), e.set(0, 0, 0);
    for (let r = 0; r < 4; r++) {
      const o = Jl.getComponent(r);
      if (o !== 0) {
        const a = Zl.getComponent(r);
        Ql.multiplyMatrices(n.bones[a].matrixWorld, n.boneInverses[a]), e.addScaledVector(Z0.copy(Kl).applyMatrix4(Ql), o);
      }
    }
    return e.applyMatrix4(this.bindMatrixInverse);
  }
}
class Ru extends ce {
  constructor() {
    super(), this.isBone = !0, this.type = "Bone";
  }
}
class Cu extends xe {
  constructor(t = null, e = 1, n = 1, s, r, o, a, c, l = Ie, h = Ie, u, d) {
    super(null, o, a, c, l, h, s, r, u, d), this.isDataTexture = !0, this.image = { data: t, width: e, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const eh = /* @__PURE__ */ new Ct(), Q0 = /* @__PURE__ */ new Ct();
class _c {
  constructor(t = [], e = []) {
    this.uuid = Ze(), this.bones = t.slice(0), this.boneInverses = e, this.boneMatrices = null, this.boneTexture = null, this.init();
  }
  init() {
    const t = this.bones, e = this.boneInverses;
    if (this.boneMatrices = new Float32Array(t.length * 16), e.length === 0)
      this.calculateInverses();
    else if (t.length !== e.length) {
      console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."), this.boneInverses = [];
      for (let n = 0, s = this.bones.length; n < s; n++)
        this.boneInverses.push(new Ct());
    }
  }
  calculateInverses() {
    this.boneInverses.length = 0;
    for (let t = 0, e = this.bones.length; t < e; t++) {
      const n = new Ct();
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
      const a = t[r] ? t[r].matrixWorld : Q0;
      eh.multiplyMatrices(a, e[r]), eh.toArray(n, r * 16);
    }
    s !== null && (s.needsUpdate = !0);
  }
  clone() {
    return new _c(this.bones, this.boneInverses);
  }
  computeBoneTexture() {
    let t = Math.sqrt(this.bones.length * 4);
    t = Math.ceil(t / 4) * 4, t = Math.max(t, 4);
    const e = new Float32Array(t * t * 4);
    e.set(this.boneMatrices);
    const n = new Cu(e, t, t, Ke, cn);
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
      o === void 0 && (console.warn("THREE.Skeleton: No bone found with UUID:", r), o = new Ru()), this.bones.push(o), this.boneInverses.push(new Ct().fromArray(t.boneInverses[n]));
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
class Va extends De {
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
const Fi = /* @__PURE__ */ new Ct(), nh = /* @__PURE__ */ new Ct(), Tr = [], ih = /* @__PURE__ */ new hn(), tv = /* @__PURE__ */ new Ct(), Es = /* @__PURE__ */ new ge(), bs = /* @__PURE__ */ new mn();
class ev extends ge {
  constructor(t, e, n) {
    super(t, e), this.isInstancedMesh = !0, this.instanceMatrix = new Va(new Float32Array(n * 16), 16), this.instanceColor = null, this.morphTexture = null, this.count = n, this.boundingBox = null, this.boundingSphere = null;
    for (let s = 0; s < n; s++)
      this.setMatrixAt(s, tv);
  }
  computeBoundingBox() {
    const t = this.geometry, e = this.count;
    this.boundingBox === null && (this.boundingBox = new hn()), t.boundingBox === null && t.computeBoundingBox(), this.boundingBox.makeEmpty();
    for (let n = 0; n < e; n++)
      this.getMatrixAt(n, Fi), ih.copy(t.boundingBox).applyMatrix4(Fi), this.boundingBox.union(ih);
  }
  computeBoundingSphere() {
    const t = this.geometry, e = this.count;
    this.boundingSphere === null && (this.boundingSphere = new mn()), t.boundingSphere === null && t.computeBoundingSphere(), this.boundingSphere.makeEmpty();
    for (let n = 0; n < e; n++)
      this.getMatrixAt(n, Fi), bs.copy(t.boundingSphere).applyMatrix4(Fi), this.boundingSphere.union(bs);
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
    if (Es.geometry = this.geometry, Es.material = this.material, Es.material !== void 0 && (this.boundingSphere === null && this.computeBoundingSphere(), bs.copy(this.boundingSphere), bs.applyMatrix4(n), t.ray.intersectsSphere(bs) !== !1))
      for (let r = 0; r < s; r++) {
        this.getMatrixAt(r, Fi), nh.multiplyMatrices(n, Fi), Es.matrixWorld = nh, Es.raycast(t, Tr);
        for (let o = 0, a = Tr.length; o < a; o++) {
          const c = Tr[o];
          c.instanceId = r, c.object = this, e.push(c);
        }
        Tr.length = 0;
      }
  }
  setColorAt(t, e) {
    this.instanceColor === null && (this.instanceColor = new Va(new Float32Array(this.instanceMatrix.count * 3).fill(1), 3)), e.toArray(this.instanceColor.array, t * 3);
  }
  setMatrixAt(t, e) {
    e.toArray(this.instanceMatrix.array, t * 16);
  }
  setMorphAt(t, e) {
    const n = e.morphTargetInfluences, s = n.length + 1;
    this.morphTexture === null && (this.morphTexture = new Cu(new Float32Array(s * this.count), s, this.count, ac, cn));
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
class vc extends ln {
  constructor(t) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Mt(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.linewidth = t.linewidth, this.linecap = t.linecap, this.linejoin = t.linejoin, this.fog = t.fog, this;
  }
}
const Qr = /* @__PURE__ */ new w(), to = /* @__PURE__ */ new w(), sh = /* @__PURE__ */ new Ct(), Ts = /* @__PURE__ */ new cs(), Ar = /* @__PURE__ */ new mn(), $o = /* @__PURE__ */ new w(), rh = /* @__PURE__ */ new w();
class xc extends ce {
  constructor(t = new we(), e = new vc()) {
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
        Qr.fromBufferAttribute(e, s - 1), to.fromBufferAttribute(e, s), n[s] = n[s - 1], n[s] += Qr.distanceTo(to);
      t.setAttribute("lineDistance", new he(n, 1));
    } else
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.matrixWorld, r = t.params.Line.threshold, o = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Ar.copy(n.boundingSphere), Ar.applyMatrix4(s), Ar.radius += r, t.ray.intersectsSphere(Ar) === !1) return;
    sh.copy(s).invert(), Ts.copy(t.ray).applyMatrix4(sh);
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = a * a, l = this.isLineSegments ? 2 : 1, h = n.index, d = n.attributes.position;
    if (h !== null) {
      const f = Math.max(0, o.start), g = Math.min(h.count, o.start + o.count);
      for (let _ = f, p = g - 1; _ < p; _ += l) {
        const m = h.getX(_), b = h.getX(_ + 1), y = wr(this, t, Ts, c, m, b);
        y && e.push(y);
      }
      if (this.isLineLoop) {
        const _ = h.getX(g - 1), p = h.getX(f), m = wr(this, t, Ts, c, _, p);
        m && e.push(m);
      }
    } else {
      const f = Math.max(0, o.start), g = Math.min(d.count, o.start + o.count);
      for (let _ = f, p = g - 1; _ < p; _ += l) {
        const m = wr(this, t, Ts, c, _, _ + 1);
        m && e.push(m);
      }
      if (this.isLineLoop) {
        const _ = wr(this, t, Ts, c, g - 1, f);
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
function wr(i, t, e, n, s, r) {
  const o = i.geometry.attributes.position;
  if (Qr.fromBufferAttribute(o, s), to.fromBufferAttribute(o, r), e.distanceSqToSegment(Qr, to, $o, rh) > n) return;
  $o.applyMatrix4(i.matrixWorld);
  const c = t.ray.origin.distanceTo($o);
  if (!(c < t.near || c > t.far))
    return {
      distance: c,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: rh.clone().applyMatrix4(i.matrixWorld),
      index: s,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i
    };
}
const oh = /* @__PURE__ */ new w(), ah = /* @__PURE__ */ new w();
class Pu extends xc {
  constructor(t, e) {
    super(t, e), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const t = this.geometry;
    if (t.index === null) {
      const e = t.attributes.position, n = [];
      for (let s = 0, r = e.count; s < r; s += 2)
        oh.fromBufferAttribute(e, s), ah.fromBufferAttribute(e, s + 1), n[s] = s === 0 ? 0 : n[s - 1], n[s + 1] = n[s] + oh.distanceTo(ah);
      t.setAttribute("lineDistance", new he(n, 1));
    } else
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class nv extends xc {
  constructor(t, e) {
    super(t, e), this.isLineLoop = !0, this.type = "LineLoop";
  }
}
class Lu extends ln {
  constructor(t) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Mt(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.color.copy(t.color), this.map = t.map, this.alphaMap = t.alphaMap, this.size = t.size, this.sizeAttenuation = t.sizeAttenuation, this.fog = t.fog, this;
  }
}
const ch = /* @__PURE__ */ new Ct(), Ga = /* @__PURE__ */ new cs(), Rr = /* @__PURE__ */ new mn(), Cr = /* @__PURE__ */ new w();
class iv extends ce {
  constructor(t = new we(), e = new Lu()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = t, this.material = e, this.updateMorphTargets();
  }
  copy(t, e) {
    return super.copy(t, e), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this;
  }
  raycast(t, e) {
    const n = this.geometry, s = this.matrixWorld, r = t.params.Points.threshold, o = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), Rr.copy(n.boundingSphere), Rr.applyMatrix4(s), Rr.radius += r, t.ray.intersectsSphere(Rr) === !1) return;
    ch.copy(s).invert(), Ga.copy(t.ray).applyMatrix4(ch);
    const a = r / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = a * a, l = n.index, u = n.attributes.position;
    if (l !== null) {
      const d = Math.max(0, o.start), f = Math.min(l.count, o.start + o.count);
      for (let g = d, _ = f; g < _; g++) {
        const p = l.getX(g);
        Cr.fromBufferAttribute(u, p), lh(Cr, p, c, s, t, e, this);
      }
    } else {
      const d = Math.max(0, o.start), f = Math.min(u.count, o.start + o.count);
      for (let g = d, _ = f; g < _; g++)
        Cr.fromBufferAttribute(u, g), lh(Cr, g, c, s, t, e, this);
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
function lh(i, t, e, n, s, r, o) {
  const a = Ga.distanceSqToPoint(i);
  if (a < e) {
    const c = new w();
    Ga.closestPointToPoint(i, c), c.applyMatrix4(n);
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
class sv extends xe {
  constructor(t, e, n, s, r, o, a, c, l) {
    super(t, e, n, s, r, o, a, c, l), this.isCanvasTexture = !0, this.needsUpdate = !0;
  }
}
class gn {
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
    const o = this.getPoint(s), a = this.getPoint(r), c = e || (o.isVector2 ? new et() : new w());
    return c.copy(a).sub(o).normalize(), c;
  }
  getTangentAt(t, e) {
    const n = this.getUtoTmapping(t);
    return this.getTangent(n, e);
  }
  computeFrenetFrames(t, e) {
    const n = new w(), s = [], r = [], o = [], a = new w(), c = new Ct();
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
        const g = Math.acos(ve(s[f - 1].dot(s[f]), -1, 1));
        r[f].applyMatrix4(c.makeRotationAxis(a, g));
      }
      o[f].crossVectors(s[f], r[f]);
    }
    if (e === !0) {
      let f = Math.acos(ve(r[0].dot(r[t]), -1, 1));
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
class yc extends gn {
  constructor(t = 0, e = 0, n = 1, s = 1, r = 0, o = Math.PI * 2, a = !1, c = 0) {
    super(), this.isEllipseCurve = !0, this.type = "EllipseCurve", this.aX = t, this.aY = e, this.xRadius = n, this.yRadius = s, this.aStartAngle = r, this.aEndAngle = o, this.aClockwise = a, this.aRotation = c;
  }
  getPoint(t, e = new et()) {
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
class rv extends yc {
  constructor(t, e, n, s, r, o) {
    super(t, e, n, n, s, r, o), this.isArcCurve = !0, this.type = "ArcCurve";
  }
}
function Mc() {
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
const Pr = /* @__PURE__ */ new w(), qo = /* @__PURE__ */ new Mc(), Yo = /* @__PURE__ */ new Mc(), jo = /* @__PURE__ */ new Mc();
class ov extends gn {
  constructor(t = [], e = !1, n = "centripetal", s = 0.5) {
    super(), this.isCatmullRomCurve3 = !0, this.type = "CatmullRomCurve3", this.points = t, this.closed = e, this.curveType = n, this.tension = s;
  }
  getPoint(t, e = new w()) {
    const n = e, s = this.points, r = s.length, o = (r - (this.closed ? 0 : 1)) * t;
    let a = Math.floor(o), c = o - a;
    this.closed ? a += a > 0 ? 0 : (Math.floor(Math.abs(a) / r) + 1) * r : c === 0 && a === r - 1 && (a = r - 2, c = 1);
    let l, h;
    this.closed || a > 0 ? l = s[(a - 1) % r] : (Pr.subVectors(s[0], s[1]).add(s[0]), l = Pr);
    const u = s[a % r], d = s[(a + 1) % r];
    if (this.closed || a + 2 < r ? h = s[(a + 2) % r] : (Pr.subVectors(s[r - 1], s[r - 2]).add(s[r - 1]), h = Pr), this.curveType === "centripetal" || this.curveType === "chordal") {
      const f = this.curveType === "chordal" ? 0.5 : 0.25;
      let g = Math.pow(l.distanceToSquared(u), f), _ = Math.pow(u.distanceToSquared(d), f), p = Math.pow(d.distanceToSquared(h), f);
      _ < 1e-4 && (_ = 1), g < 1e-4 && (g = _), p < 1e-4 && (p = _), qo.initNonuniformCatmullRom(l.x, u.x, d.x, h.x, g, _, p), Yo.initNonuniformCatmullRom(l.y, u.y, d.y, h.y, g, _, p), jo.initNonuniformCatmullRom(l.z, u.z, d.z, h.z, g, _, p);
    } else this.curveType === "catmullrom" && (qo.initCatmullRom(l.x, u.x, d.x, h.x, this.tension), Yo.initCatmullRom(l.y, u.y, d.y, h.y, this.tension), jo.initCatmullRom(l.z, u.z, d.z, h.z, this.tension));
    return n.set(
      qo.calc(c),
      Yo.calc(c),
      jo.calc(c)
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
function hh(i, t, e, n, s) {
  const r = (n - t) * 0.5, o = (s - e) * 0.5, a = i * i, c = i * a;
  return (2 * e - 2 * n + r + o) * c + (-3 * e + 3 * n - 2 * r - o) * a + r * i + e;
}
function av(i, t) {
  const e = 1 - i;
  return e * e * t;
}
function cv(i, t) {
  return 2 * (1 - i) * i * t;
}
function lv(i, t) {
  return i * i * t;
}
function Ds(i, t, e, n) {
  return av(i, t) + cv(i, e) + lv(i, n);
}
function hv(i, t) {
  const e = 1 - i;
  return e * e * e * t;
}
function uv(i, t) {
  const e = 1 - i;
  return 3 * e * e * i * t;
}
function dv(i, t) {
  return 3 * (1 - i) * i * i * t;
}
function fv(i, t) {
  return i * i * i * t;
}
function Ns(i, t, e, n, s) {
  return hv(i, t) + uv(i, e) + dv(i, n) + fv(i, s);
}
class Iu extends gn {
  constructor(t = new et(), e = new et(), n = new et(), s = new et()) {
    super(), this.isCubicBezierCurve = !0, this.type = "CubicBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
  }
  getPoint(t, e = new et()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2, a = this.v3;
    return n.set(
      Ns(t, s.x, r.x, o.x, a.x),
      Ns(t, s.y, r.y, o.y, a.y)
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
class pv extends gn {
  constructor(t = new w(), e = new w(), n = new w(), s = new w()) {
    super(), this.isCubicBezierCurve3 = !0, this.type = "CubicBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n, this.v3 = s;
  }
  getPoint(t, e = new w()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2, a = this.v3;
    return n.set(
      Ns(t, s.x, r.x, o.x, a.x),
      Ns(t, s.y, r.y, o.y, a.y),
      Ns(t, s.z, r.z, o.z, a.z)
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
class Du extends gn {
  constructor(t = new et(), e = new et()) {
    super(), this.isLineCurve = !0, this.type = "LineCurve", this.v1 = t, this.v2 = e;
  }
  getPoint(t, e = new et()) {
    const n = e;
    return t === 1 ? n.copy(this.v2) : (n.copy(this.v2).sub(this.v1), n.multiplyScalar(t).add(this.v1)), n;
  }
  // Line curve is linear, so we can overwrite default getPointAt
  getPointAt(t, e) {
    return this.getPoint(t, e);
  }
  getTangent(t, e = new et()) {
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
class mv extends gn {
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
class Nu extends gn {
  constructor(t = new et(), e = new et(), n = new et()) {
    super(), this.isQuadraticBezierCurve = !0, this.type = "QuadraticBezierCurve", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new et()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2;
    return n.set(
      Ds(t, s.x, r.x, o.x),
      Ds(t, s.y, r.y, o.y)
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
class gv extends gn {
  constructor(t = new w(), e = new w(), n = new w()) {
    super(), this.isQuadraticBezierCurve3 = !0, this.type = "QuadraticBezierCurve3", this.v0 = t, this.v1 = e, this.v2 = n;
  }
  getPoint(t, e = new w()) {
    const n = e, s = this.v0, r = this.v1, o = this.v2;
    return n.set(
      Ds(t, s.x, r.x, o.x),
      Ds(t, s.y, r.y, o.y),
      Ds(t, s.z, r.z, o.z)
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
class Uu extends gn {
  constructor(t = []) {
    super(), this.isSplineCurve = !0, this.type = "SplineCurve", this.points = t;
  }
  getPoint(t, e = new et()) {
    const n = e, s = this.points, r = (s.length - 1) * t, o = Math.floor(r), a = r - o, c = s[o === 0 ? o : o - 1], l = s[o], h = s[o > s.length - 2 ? s.length - 1 : o + 1], u = s[o > s.length - 3 ? s.length - 1 : o + 2];
    return n.set(
      hh(a, c.x, l.x, h.x, u.x),
      hh(a, c.y, l.y, h.y, u.y)
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
      this.points.push(new et().fromArray(s));
    }
    return this;
  }
}
var uh = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcCurve: rv,
  CatmullRomCurve3: ov,
  CubicBezierCurve: Iu,
  CubicBezierCurve3: pv,
  EllipseCurve: yc,
  LineCurve: Du,
  LineCurve3: mv,
  QuadraticBezierCurve: Nu,
  QuadraticBezierCurve3: gv,
  SplineCurve: Uu
});
class _v extends gn {
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
      this.curves.push(new uh[n](e, t));
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
      this.curves.push(new uh[s.type]().fromJSON(s));
    }
    return this;
  }
}
class dh extends _v {
  constructor(t) {
    super(), this.type = "Path", this.currentPoint = new et(), t && this.setFromPoints(t);
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
    const n = new Du(this.currentPoint.clone(), new et(t, e));
    return this.curves.push(n), this.currentPoint.set(t, e), this;
  }
  quadraticCurveTo(t, e, n, s) {
    const r = new Nu(
      this.currentPoint.clone(),
      new et(t, e),
      new et(n, s)
    );
    return this.curves.push(r), this.currentPoint.set(n, s), this;
  }
  bezierCurveTo(t, e, n, s, r, o) {
    const a = new Iu(
      this.currentPoint.clone(),
      new et(t, e),
      new et(n, s),
      new et(r, o)
    );
    return this.curves.push(a), this.currentPoint.set(r, o), this;
  }
  splineThru(t) {
    const e = [this.currentPoint.clone()].concat(t), n = new Uu(e);
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
    const l = new yc(t, e, n, s, r, o, a, c);
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
class Sc extends we {
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
    b(), o === !1 && (t > 0 && y(!0), e > 0 && y(!1)), this.setIndex(h), this.setAttribute("position", new he(u, 3)), this.setAttribute("normal", new he(d, 3)), this.setAttribute("uv", new he(f, 2));
    function b() {
      const S = new w(), D = new w();
      let R = 0;
      const A = (e - t) / n;
      for (let N = 0; N <= r; N++) {
        const Y = [], v = N / r, E = v * (e - t) + t;
        for (let k = 0; k <= s; k++) {
          const B = k / s, H = B * c + a, j = Math.sin(H), z = Math.cos(H);
          D.x = E * j, D.y = -v * n + p, D.z = E * z, u.push(D.x, D.y, D.z), S.set(j, A, z).normalize(), d.push(S.x, S.y, S.z), f.push(B, 1 - v), Y.push(g++);
        }
        _.push(Y);
      }
      for (let N = 0; N < s; N++)
        for (let Y = 0; Y < r; Y++) {
          const v = _[Y][N], E = _[Y + 1][N], k = _[Y + 1][N + 1], B = _[Y][N + 1];
          t > 0 && (h.push(v, E, B), R += 3), e > 0 && (h.push(E, k, B), R += 3);
        }
      l.addGroup(m, R, 0), m += R;
    }
    function y(S) {
      const D = g, R = new et(), A = new w();
      let N = 0;
      const Y = S === !0 ? t : e, v = S === !0 ? 1 : -1;
      for (let k = 1; k <= s; k++)
        u.push(0, p * v, 0), d.push(0, v, 0), f.push(0.5, 0.5), g++;
      const E = g;
      for (let k = 0; k <= s; k++) {
        const H = k / s * c + a, j = Math.cos(H), z = Math.sin(H);
        A.x = Y * z, A.y = p * v, A.z = Y * j, u.push(A.x, A.y, A.z), d.push(0, v, 0), R.x = j * 0.5 + 0.5, R.y = z * 0.5 * v + 0.5, f.push(R.x, R.y), g++;
      }
      for (let k = 0; k < s; k++) {
        const B = D + k, H = E + k;
        S === !0 ? h.push(H, H + 1, B) : h.push(H + 1, H, B), N += 3;
      }
      l.addGroup(m, N, S === !0 ? 1 : 2), m += N;
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Sc(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, t.heightSegments, t.openEnded, t.thetaStart, t.thetaLength);
  }
}
class Ou extends dh {
  constructor(t) {
    super(t), this.uuid = Ze(), this.type = "Shape", this.holes = [];
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
      this.holes.push(new dh().fromJSON(s));
    }
    return this;
  }
}
const vv = {
  triangulate: function(i, t, e = 2) {
    const n = t && t.length, s = n ? t[0] * e : i.length;
    let r = Fu(i, 0, s, e, !0);
    const o = [];
    if (!r || r.next === r.prev) return o;
    let a, c, l, h, u, d, f;
    if (n && (r = Ev(i, t, r, e)), i.length > 80 * e) {
      a = l = i[0], c = h = i[1];
      for (let g = e; g < s; g += e)
        u = i[g], d = i[g + 1], u < a && (a = u), d < c && (c = d), u > l && (l = u), d > h && (h = d);
      f = Math.max(l - a, h - c), f = f !== 0 ? 32767 / f : 0;
    }
    return Xs(r, o, e, a, c, f, 0), o;
  }
};
function Fu(i, t, e, n, s) {
  let r, o;
  if (s === Nv(i, t, e, n) > 0)
    for (r = t; r < e; r += n) o = fh(r, i[r], i[r + 1], o);
  else
    for (r = e - n; r >= t; r -= n) o = fh(r, i[r], i[r + 1], o);
  return o && ao(o, o.next) && (qs(o), o = o.next), o;
}
function gi(i, t) {
  if (!i) return i;
  t || (t = i);
  let e = i, n;
  do
    if (n = !1, !e.steiner && (ao(e, e.next) || le(e.prev, e, e.next) === 0)) {
      if (qs(e), e = t = e.prev, e === e.next) break;
      n = !0;
    } else
      e = e.next;
  while (n || e !== t);
  return t;
}
function Xs(i, t, e, n, s, r, o) {
  if (!i) return;
  !o && r && Rv(i, n, s, r);
  let a = i, c, l;
  for (; i.prev !== i.next; ) {
    if (c = i.prev, l = i.next, r ? yv(i, n, s, r) : xv(i)) {
      t.push(c.i / e | 0), t.push(i.i / e | 0), t.push(l.i / e | 0), qs(i), i = l.next, a = l.next;
      continue;
    }
    if (i = l, i === a) {
      o ? o === 1 ? (i = Mv(gi(i), t, e), Xs(i, t, e, n, s, r, 2)) : o === 2 && Sv(i, t, e, n, s, r) : Xs(gi(i), t, e, n, s, r, 1);
      break;
    }
  }
}
function xv(i) {
  const t = i.prev, e = i, n = i.next;
  if (le(t, e, n) >= 0) return !1;
  const s = t.x, r = e.x, o = n.x, a = t.y, c = e.y, l = n.y, h = s < r ? s < o ? s : o : r < o ? r : o, u = a < c ? a < l ? a : l : c < l ? c : l, d = s > r ? s > o ? s : o : r > o ? r : o, f = a > c ? a > l ? a : l : c > l ? c : l;
  let g = n.next;
  for (; g !== t; ) {
    if (g.x >= h && g.x <= d && g.y >= u && g.y <= f && Hi(s, a, r, c, o, l, g.x, g.y) && le(g.prev, g, g.next) >= 0) return !1;
    g = g.next;
  }
  return !0;
}
function yv(i, t, e, n) {
  const s = i.prev, r = i, o = i.next;
  if (le(s, r, o) >= 0) return !1;
  const a = s.x, c = r.x, l = o.x, h = s.y, u = r.y, d = o.y, f = a < c ? a < l ? a : l : c < l ? c : l, g = h < u ? h < d ? h : d : u < d ? u : d, _ = a > c ? a > l ? a : l : c > l ? c : l, p = h > u ? h > d ? h : d : u > d ? u : d, m = Wa(f, g, t, e, n), b = Wa(_, p, t, e, n);
  let y = i.prevZ, S = i.nextZ;
  for (; y && y.z >= m && S && S.z <= b; ) {
    if (y.x >= f && y.x <= _ && y.y >= g && y.y <= p && y !== s && y !== o && Hi(a, h, c, u, l, d, y.x, y.y) && le(y.prev, y, y.next) >= 0 || (y = y.prevZ, S.x >= f && S.x <= _ && S.y >= g && S.y <= p && S !== s && S !== o && Hi(a, h, c, u, l, d, S.x, S.y) && le(S.prev, S, S.next) >= 0)) return !1;
    S = S.nextZ;
  }
  for (; y && y.z >= m; ) {
    if (y.x >= f && y.x <= _ && y.y >= g && y.y <= p && y !== s && y !== o && Hi(a, h, c, u, l, d, y.x, y.y) && le(y.prev, y, y.next) >= 0) return !1;
    y = y.prevZ;
  }
  for (; S && S.z <= b; ) {
    if (S.x >= f && S.x <= _ && S.y >= g && S.y <= p && S !== s && S !== o && Hi(a, h, c, u, l, d, S.x, S.y) && le(S.prev, S, S.next) >= 0) return !1;
    S = S.nextZ;
  }
  return !0;
}
function Mv(i, t, e) {
  let n = i;
  do {
    const s = n.prev, r = n.next.next;
    !ao(s, r) && Bu(s, n, n.next, r) && $s(s, r) && $s(r, s) && (t.push(s.i / e | 0), t.push(n.i / e | 0), t.push(r.i / e | 0), qs(n), qs(n.next), n = i = r), n = n.next;
  } while (n !== i);
  return gi(n);
}
function Sv(i, t, e, n, s, r) {
  let o = i;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && Lv(o, a)) {
        let c = ku(o, a);
        o = gi(o, o.next), c = gi(c, c.next), Xs(o, t, e, n, s, r, 0), Xs(c, t, e, n, s, r, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== i);
}
function Ev(i, t, e, n) {
  const s = [];
  let r, o, a, c, l;
  for (r = 0, o = t.length; r < o; r++)
    a = t[r] * n, c = r < o - 1 ? t[r + 1] * n : i.length, l = Fu(i, a, c, n, !1), l === l.next && (l.steiner = !0), s.push(Pv(l));
  for (s.sort(bv), r = 0; r < s.length; r++)
    e = Tv(s[r], e);
  return e;
}
function bv(i, t) {
  return i.x - t.x;
}
function Tv(i, t) {
  const e = Av(i, t);
  if (!e)
    return t;
  const n = ku(e, i);
  return gi(n, n.next), gi(e, e.next);
}
function Av(i, t) {
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
    r >= e.x && e.x >= c && r !== e.x && Hi(o < l ? r : n, o, c, l, o < l ? n : r, o, e.x, e.y) && (u = Math.abs(o - e.y) / (r - e.x), $s(e, i) && (u < h || u === h && (e.x > s.x || e.x === s.x && wv(s, e))) && (s = e, h = u)), e = e.next;
  while (e !== a);
  return s;
}
function wv(i, t) {
  return le(i.prev, i, t.prev) < 0 && le(t.next, i, i.next) < 0;
}
function Rv(i, t, e, n) {
  let s = i;
  do
    s.z === 0 && (s.z = Wa(s.x, s.y, t, e, n)), s.prevZ = s.prev, s.nextZ = s.next, s = s.next;
  while (s !== i);
  s.prevZ.nextZ = null, s.prevZ = null, Cv(s);
}
function Cv(i) {
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
function Wa(i, t, e, n, s) {
  return i = (i - e) * s | 0, t = (t - n) * s | 0, i = (i | i << 8) & 16711935, i = (i | i << 4) & 252645135, i = (i | i << 2) & 858993459, i = (i | i << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, i | t << 1;
}
function Pv(i) {
  let t = i, e = i;
  do
    (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
  while (t !== i);
  return e;
}
function Hi(i, t, e, n, s, r, o, a) {
  return (s - o) * (t - a) >= (i - o) * (r - a) && (i - o) * (n - a) >= (e - o) * (t - a) && (e - o) * (r - a) >= (s - o) * (n - a);
}
function Lv(i, t) {
  return i.next.i !== t.i && i.prev.i !== t.i && !Iv(i, t) && // dones't intersect other edges
  ($s(i, t) && $s(t, i) && Dv(i, t) && // locally visible
  (le(i.prev, i, t.prev) || le(i, t.prev, t)) || // does not create opposite-facing sectors
  ao(i, t) && le(i.prev, i, i.next) > 0 && le(t.prev, t, t.next) > 0);
}
function le(i, t, e) {
  return (t.y - i.y) * (e.x - t.x) - (t.x - i.x) * (e.y - t.y);
}
function ao(i, t) {
  return i.x === t.x && i.y === t.y;
}
function Bu(i, t, e, n) {
  const s = Ir(le(i, t, e)), r = Ir(le(i, t, n)), o = Ir(le(e, n, i)), a = Ir(le(e, n, t));
  return !!(s !== r && o !== a || s === 0 && Lr(i, e, t) || r === 0 && Lr(i, n, t) || o === 0 && Lr(e, i, n) || a === 0 && Lr(e, t, n));
}
function Lr(i, t, e) {
  return t.x <= Math.max(i.x, e.x) && t.x >= Math.min(i.x, e.x) && t.y <= Math.max(i.y, e.y) && t.y >= Math.min(i.y, e.y);
}
function Ir(i) {
  return i > 0 ? 1 : i < 0 ? -1 : 0;
}
function Iv(i, t) {
  let e = i;
  do {
    if (e.i !== i.i && e.next.i !== i.i && e.i !== t.i && e.next.i !== t.i && Bu(e, e.next, i, t)) return !0;
    e = e.next;
  } while (e !== i);
  return !1;
}
function $s(i, t) {
  return le(i.prev, i, i.next) < 0 ? le(i, t, i.next) >= 0 && le(i, i.prev, t) >= 0 : le(i, t, i.prev) < 0 || le(i, i.next, t) < 0;
}
function Dv(i, t) {
  let e = i, n = !1;
  const s = (i.x + t.x) / 2, r = (i.y + t.y) / 2;
  do
    e.y > r != e.next.y > r && e.next.y !== e.y && s < (e.next.x - e.x) * (r - e.y) / (e.next.y - e.y) + e.x && (n = !n), e = e.next;
  while (e !== i);
  return n;
}
function ku(i, t) {
  const e = new Xa(i.i, i.x, i.y), n = new Xa(t.i, t.x, t.y), s = i.next, r = t.prev;
  return i.next = t, t.prev = i, e.next = s, s.prev = e, n.next = e, e.prev = n, r.next = n, n.prev = r, n;
}
function fh(i, t, e, n) {
  const s = new Xa(i, t, e);
  return n ? (s.next = n.next, s.prev = n, n.next.prev = s, n.next = s) : (s.prev = s, s.next = s), s;
}
function qs(i) {
  i.next.prev = i.prev, i.prev.next = i.next, i.prevZ && (i.prevZ.nextZ = i.nextZ), i.nextZ && (i.nextZ.prevZ = i.prevZ);
}
function Xa(i, t, e) {
  this.i = i, this.x = t, this.y = e, this.prev = null, this.next = null, this.z = 0, this.prevZ = null, this.nextZ = null, this.steiner = !1;
}
function Nv(i, t, e, n) {
  let s = 0;
  for (let r = t, o = e - n; r < e; r += n)
    s += (i[o] - i[r]) * (i[r + 1] + i[o + 1]), o = r;
  return s;
}
class Us {
  // calculate area of the contour polygon
  static area(t) {
    const e = t.length;
    let n = 0;
    for (let s = e - 1, r = 0; r < e; s = r++)
      n += t[s].x * t[r].y - t[r].x * t[s].y;
    return n * 0.5;
  }
  static isClockWise(t) {
    return Us.area(t) < 0;
  }
  static triangulateShape(t, e) {
    const n = [], s = [], r = [];
    ph(t), mh(n, t);
    let o = t.length;
    e.forEach(ph);
    for (let c = 0; c < e.length; c++)
      s.push(o), o += e[c].length, mh(n, e[c]);
    const a = vv.triangulate(n, s);
    for (let c = 0; c < a.length; c += 3)
      r.push(a.slice(c, c + 3));
    return r;
  }
}
function ph(i) {
  const t = i.length;
  t > 2 && i[t - 1].equals(i[0]) && i.pop();
}
function mh(i, t) {
  for (let e = 0; e < t.length; e++)
    i.push(t[e].x), i.push(t[e].y);
}
class Ec extends we {
  constructor(t = new Ou([new et(0, 0.5), new et(-0.5, -0.5), new et(0.5, -0.5)]), e = 12) {
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
    this.setIndex(n), this.setAttribute("position", new he(s, 3)), this.setAttribute("normal", new he(r, 3)), this.setAttribute("uv", new he(o, 2));
    function l(h) {
      const u = s.length / 3, d = h.extractPoints(e);
      let f = d.shape;
      const g = d.holes;
      Us.isClockWise(f) === !1 && (f = f.reverse());
      for (let p = 0, m = g.length; p < m; p++) {
        const b = g[p];
        Us.isClockWise(b) === !0 && (g[p] = b.reverse());
      }
      const _ = Us.triangulateShape(f, g);
      for (let p = 0, m = g.length; p < m; p++) {
        const b = g[p];
        f = f.concat(b);
      }
      for (let p = 0, m = f.length; p < m; p++) {
        const b = f[p];
        s.push(b.x, b.y, 0), r.push(0, 0, 1), o.push(b.x, b.y);
      }
      for (let p = 0, m = _.length; p < m; p++) {
        const b = _[p], y = b[0] + u, S = b[1] + u, D = b[2] + u;
        n.push(y, S, D), c += 3;
      }
    }
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  toJSON() {
    const t = super.toJSON(), e = this.parameters.shapes;
    return Uv(e, t);
  }
  static fromJSON(t, e) {
    const n = [];
    for (let s = 0, r = t.shapes.length; s < r; s++) {
      const o = e[t.shapes[s]];
      n.push(o);
    }
    return new Ec(n, t.curveSegments);
  }
}
function Uv(i, t) {
  if (t.shapes = [], Array.isArray(i))
    for (let e = 0, n = i.length; e < n; e++) {
      const s = i[e];
      t.shapes.push(s.uuid);
    }
  else
    t.shapes.push(i.uuid);
  return t;
}
class bc extends we {
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
      const b = [], y = m / n;
      let S = 0;
      m === 0 && o === 0 ? S = 0.5 / e : m === n && c === Math.PI && (S = -0.5 / e);
      for (let D = 0; D <= e; D++) {
        const R = D / e;
        u.x = -t * Math.cos(s + R * r) * Math.sin(o + y * a), u.y = t * Math.cos(o + y * a), u.z = t * Math.sin(s + R * r) * Math.sin(o + y * a), g.push(u.x, u.y, u.z), d.copy(u).normalize(), _.push(d.x, d.y, d.z), p.push(R + S, 1 - y), b.push(l++);
      }
      h.push(b);
    }
    for (let m = 0; m < n; m++)
      for (let b = 0; b < e; b++) {
        const y = h[m][b + 1], S = h[m][b], D = h[m + 1][b], R = h[m + 1][b + 1];
        (m !== 0 || o > 0) && f.push(y, S, R), (m !== n - 1 || c < Math.PI) && f.push(S, D, R);
      }
    this.setIndex(f), this.setAttribute("position", new he(g, 3)), this.setAttribute("normal", new he(_, 3)), this.setAttribute("uv", new he(p, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new bc(t.radius, t.widthSegments, t.heightSegments, t.phiStart, t.phiLength, t.thetaStart, t.thetaLength);
  }
}
class Tc extends we {
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
        const _ = (s + 1) * f + g - 1, p = (s + 1) * (f - 1) + g - 1, m = (s + 1) * (f - 1) + g, b = (s + 1) * f + g;
        o.push(_, p, b), o.push(p, m, b);
      }
    this.setIndex(o), this.setAttribute("position", new he(a, 3)), this.setAttribute("normal", new he(c, 3)), this.setAttribute("uv", new he(l, 2));
  }
  copy(t) {
    return super.copy(t), this.parameters = Object.assign({}, t.parameters), this;
  }
  static fromJSON(t) {
    return new Tc(t.radius, t.tube, t.radialSegments, t.tubularSegments, t.arc);
  }
}
class hs extends ln {
  constructor(t) {
    super(), this.isMeshStandardMaterial = !0, this.defines = { STANDARD: "" }, this.type = "MeshStandardMaterial", this.color = new Mt(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Mt(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = cu, this.normalScale = new et(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new pn(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(t);
  }
  copy(t) {
    return super.copy(t), this.defines = { STANDARD: "" }, this.color.copy(t.color), this.roughness = t.roughness, this.metalness = t.metalness, this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.emissive.copy(t.emissive), this.emissiveMap = t.emissiveMap, this.emissiveIntensity = t.emissiveIntensity, this.bumpMap = t.bumpMap, this.bumpScale = t.bumpScale, this.normalMap = t.normalMap, this.normalMapType = t.normalMapType, this.normalScale.copy(t.normalScale), this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.roughnessMap = t.roughnessMap, this.metalnessMap = t.metalnessMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.envMapIntensity = t.envMapIntensity, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.flatShading = t.flatShading, this.fog = t.fog, this;
  }
}
class _n extends hs {
  constructor(t) {
    super(), this.isMeshPhysicalMaterial = !0, this.defines = {
      STANDARD: "",
      PHYSICAL: ""
    }, this.type = "MeshPhysicalMaterial", this.anisotropyRotation = 0, this.anisotropyMap = null, this.clearcoatMap = null, this.clearcoatRoughness = 0, this.clearcoatRoughnessMap = null, this.clearcoatNormalScale = new et(1, 1), this.clearcoatNormalMap = null, this.ior = 1.5, Object.defineProperty(this, "reflectivity", {
      get: function() {
        return ve(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1);
      },
      set: function(e) {
        this.ior = (1 + 0.4 * e) / (1 - 0.4 * e);
      }
    }), this.iridescenceMap = null, this.iridescenceIOR = 1.3, this.iridescenceThicknessRange = [100, 400], this.iridescenceThicknessMap = null, this.sheenColor = new Mt(0), this.sheenColorMap = null, this.sheenRoughness = 1, this.sheenRoughnessMap = null, this.transmissionMap = null, this.thickness = 0, this.thicknessMap = null, this.attenuationDistance = 1 / 0, this.attenuationColor = new Mt(1, 1, 1), this.specularIntensity = 1, this.specularIntensityMap = null, this.specularColor = new Mt(1, 1, 1), this.specularColorMap = null, this._anisotropy = 0, this._clearcoat = 0, this._dispersion = 0, this._iridescence = 0, this._sheen = 0, this._transmission = 0, this.setValues(t);
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
function Dr(i, t, e) {
  return !i || // let 'undefined' and 'null' pass
  !e && i.constructor === t ? i : typeof t.BYTES_PER_ELEMENT == "number" ? new t(i) : Array.prototype.slice.call(i);
}
function Ov(i) {
  return ArrayBuffer.isView(i) && !(i instanceof DataView);
}
function Fv(i) {
  function t(s, r) {
    return i[s] - i[r];
  }
  const e = i.length, n = new Array(e);
  for (let s = 0; s !== e; ++s) n[s] = s;
  return n.sort(t), n;
}
function gh(i, t, e) {
  const n = i.length, s = new i.constructor(n);
  for (let r = 0, o = 0; o !== n; ++r) {
    const a = e[r] * t;
    for (let c = 0; c !== t; ++c)
      s[o++] = i[a + c];
  }
  return s;
}
function zu(i, t, e, n) {
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
class Ks {
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
class Bv extends Ks {
  constructor(t, e, n, s) {
    super(t, e, n, s), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = {
      endingStart: el,
      endingEnd: el
    };
  }
  intervalChanged_(t, e, n) {
    const s = this.parameterPositions;
    let r = t - 2, o = t + 1, a = s[r], c = s[o];
    if (a === void 0)
      switch (this.getSettings_().endingStart) {
        case nl:
          r = t, a = 2 * e - n;
          break;
        case il:
          r = s.length - 2, a = e + s[r] - s[r + 1];
          break;
        default:
          r = t, a = n;
      }
    if (c === void 0)
      switch (this.getSettings_().endingEnd) {
        case nl:
          o = t, c = 2 * n - e;
          break;
        case il:
          o = 1, c = n + s[1] - s[0];
          break;
        default:
          o = t - 1, c = e;
      }
    const l = (n - e) * 0.5, h = this.valueSize;
    this._weightPrev = l / (e - a), this._weightNext = l / (c - n), this._offsetPrev = r * h, this._offsetNext = o * h;
  }
  interpolate_(t, e, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, c = t * a, l = c - a, h = this._offsetPrev, u = this._offsetNext, d = this._weightPrev, f = this._weightNext, g = (n - e) / (s - e), _ = g * g, p = _ * g, m = -d * p + 2 * d * _ - d * g, b = (1 + d) * p + (-1.5 - 2 * d) * _ + (-0.5 + d) * g + 1, y = (-1 - f) * p + (1.5 + f) * _ + 0.5 * g, S = f * p - f * _;
    for (let D = 0; D !== a; ++D)
      r[D] = m * o[h + D] + b * o[l + D] + y * o[c + D] + S * o[u + D];
    return r;
  }
}
class kv extends Ks {
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
class zv extends Ks {
  constructor(t, e, n, s) {
    super(t, e, n, s);
  }
  interpolate_(t) {
    return this.copySampleValue_(t - 1);
  }
}
class vn {
  constructor(t, e, n, s) {
    if (t === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (e === void 0 || e.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + t);
    this.name = t, this.times = Dr(e, this.TimeBufferType), this.values = Dr(n, this.ValueBufferType), this.setInterpolation(s || this.DefaultInterpolation);
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
        times: Dr(t.times, Array),
        values: Dr(t.values, Array)
      };
      const s = t.getInterpolation();
      s !== t.DefaultInterpolation && (n.interpolation = s);
    }
    return n.type = t.ValueTypeName, n;
  }
  InterpolantFactoryMethodDiscrete(t) {
    return new zv(this.times, this.values, this.getValueSize(), t);
  }
  InterpolantFactoryMethodLinear(t) {
    return new kv(this.times, this.values, this.getValueSize(), t);
  }
  InterpolantFactoryMethodSmooth(t) {
    return new Bv(this.times, this.values, this.getValueSize(), t);
  }
  setInterpolation(t) {
    let e;
    switch (t) {
      case Hs:
        e = this.InterpolantFactoryMethodDiscrete;
        break;
      case Vs:
        e = this.InterpolantFactoryMethodLinear;
        break;
      case po:
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
        return Hs;
      case this.InterpolantFactoryMethodLinear:
        return Vs;
      case this.InterpolantFactoryMethodSmooth:
        return po;
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
    if (s !== void 0 && Ov(s))
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
    const t = this.times.slice(), e = this.values.slice(), n = this.getValueSize(), s = this.getInterpolation() === po, r = t.length - 1;
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
vn.prototype.TimeBufferType = Float32Array;
vn.prototype.ValueBufferType = Float32Array;
vn.prototype.DefaultInterpolation = Vs;
class us extends vn {
  // No interpolation parameter because only InterpolateDiscrete is valid.
  constructor(t, e, n) {
    super(t, e, n);
  }
}
us.prototype.ValueTypeName = "bool";
us.prototype.ValueBufferType = Array;
us.prototype.DefaultInterpolation = Hs;
us.prototype.InterpolantFactoryMethodLinear = void 0;
us.prototype.InterpolantFactoryMethodSmooth = void 0;
class Hu extends vn {
}
Hu.prototype.ValueTypeName = "color";
class rs extends vn {
}
rs.prototype.ValueTypeName = "number";
class Hv extends Ks {
  constructor(t, e, n, s) {
    super(t, e, n, s);
  }
  interpolate_(t, e, n, s) {
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, c = (n - e) / (s - e);
    let l = t * a;
    for (let h = l + a; l !== h; l += 4)
      fn.slerpFlat(r, 0, o, l - a, o, l, c);
    return r;
  }
}
class os extends vn {
  InterpolantFactoryMethodLinear(t) {
    return new Hv(this.times, this.values, this.getValueSize(), t);
  }
}
os.prototype.ValueTypeName = "quaternion";
os.prototype.InterpolantFactoryMethodSmooth = void 0;
class ds extends vn {
  // No interpolation parameter because only InterpolateDiscrete is valid.
  constructor(t, e, n) {
    super(t, e, n);
  }
}
ds.prototype.ValueTypeName = "string";
ds.prototype.ValueBufferType = Array;
ds.prototype.DefaultInterpolation = Hs;
ds.prototype.InterpolantFactoryMethodLinear = void 0;
ds.prototype.InterpolantFactoryMethodSmooth = void 0;
class as extends vn {
}
as.prototype.ValueTypeName = "vector";
class Vv {
  constructor(t = "", e = -1, n = [], s = af) {
    this.name = t, this.tracks = n, this.duration = e, this.blendMode = s, this.uuid = Ze(), this.duration < 0 && this.resetDuration();
  }
  static parse(t) {
    const e = [], n = t.tracks, s = 1 / (t.fps || 1);
    for (let o = 0, a = n.length; o !== a; ++o)
      e.push(Wv(n[o]).scale(s));
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
      e.push(vn.toJSON(n[r]));
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
      const h = Fv(c);
      c = gh(c, 1, h), l = gh(l, 1, h), !s && c[0] === 0 && (c.push(r), l.push(l[0])), o.push(
        new rs(
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
        zu(f, p, m, g), p.length !== 0 && _.push(new u(d, p, m));
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
            for (let b = 0; b !== d[g].morphTargets.length; ++b) {
              const y = d[g];
              p.push(y.time), m.push(y.morphTarget === _ ? 1 : 0);
            }
            s.push(new rs(".morphTargetInfluence[" + _ + "]", p, m));
          }
          c = f.length * o;
        } else {
          const f = ".bones[" + e[u].name + "]";
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
function Gv(i) {
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
      return Hu;
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
function Wv(i) {
  if (i.type === void 0)
    throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");
  const t = Gv(i.type);
  if (i.times === void 0) {
    const e = [], n = [];
    zu(i.keys, e, n, "value"), i.times = e, i.values = n;
  }
  return t.parse !== void 0 ? t.parse(i) : new t(i.name, i.times, i.values, i.interpolation);
}
const qn = {
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
class Xv {
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
const $v = /* @__PURE__ */ new Xv();
class fs {
  constructor(t) {
    this.manager = t !== void 0 ? t : $v, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {};
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
fs.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const Tn = {};
class qv extends Error {
  constructor(t, e) {
    super(t), this.response = e;
  }
}
class Vu extends fs {
  constructor(t) {
    super(t);
  }
  load(t, e, n, s) {
    t === void 0 && (t = ""), this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const r = qn.get(t);
    if (r !== void 0)
      return this.manager.itemStart(t), setTimeout(() => {
        e && e(r), this.manager.itemEnd(t);
      }, 0), r;
    if (Tn[t] !== void 0) {
      Tn[t].push({
        onLoad: e,
        onProgress: n,
        onError: s
      });
      return;
    }
    Tn[t] = [], Tn[t].push({
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
        const h = Tn[t], u = l.body.getReader(), d = l.headers.get("X-File-Size") || l.headers.get("Content-Length"), f = d ? parseInt(d) : 0, g = f !== 0;
        let _ = 0;
        const p = new ReadableStream({
          start(m) {
            b();
            function b() {
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
                  m.enqueue(S), b();
                }
              }, (y) => {
                m.error(y);
              });
            }
          }
        });
        return new Response(p);
      } else
        throw new qv(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`, l);
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
      qn.add(t, l);
      const h = Tn[t];
      delete Tn[t];
      for (let u = 0, d = h.length; u < d; u++) {
        const f = h[u];
        f.onLoad && f.onLoad(l);
      }
    }).catch((l) => {
      const h = Tn[t];
      if (h === void 0)
        throw this.manager.itemError(t), l;
      delete Tn[t];
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
class Yv extends fs {
  constructor(t) {
    super(t);
  }
  load(t, e, n, s) {
    this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const r = this, o = qn.get(t);
    if (o !== void 0)
      return r.manager.itemStart(t), setTimeout(function() {
        e && e(o), r.manager.itemEnd(t);
      }, 0), o;
    const a = Gs("img");
    function c() {
      h(), qn.add(t, this), e && e(this), r.manager.itemEnd(t);
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
class jv extends fs {
  constructor(t) {
    super(t);
  }
  load(t, e, n, s) {
    const r = new xe(), o = new Yv(this.manager);
    return o.setCrossOrigin(this.crossOrigin), o.setPath(this.path), o.load(t, function(a) {
      r.image = a, r.needsUpdate = !0, e !== void 0 && e(r);
    }, n, s), r;
  }
}
class Zs extends ce {
  constructor(t, e = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Mt(t), this.intensity = e;
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
class Kv extends Zs {
  constructor(t, e, n) {
    super(t, n), this.isHemisphereLight = !0, this.type = "HemisphereLight", this.position.copy(ce.DEFAULT_UP), this.updateMatrix(), this.groundColor = new Mt(e);
  }
  copy(t, e) {
    return super.copy(t, e), this.groundColor.copy(t.groundColor), this;
  }
}
const Ko = /* @__PURE__ */ new Ct(), _h = /* @__PURE__ */ new w(), vh = /* @__PURE__ */ new w();
class Ac {
  constructor(t) {
    this.camera = t, this.intensity = 1, this.bias = 0, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new et(512, 512), this.map = null, this.mapPass = null, this.matrix = new Ct(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new pc(), this._frameExtents = new et(1, 1), this._viewportCount = 1, this._viewports = [
      new qt(0, 0, 1, 1)
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
    _h.setFromMatrixPosition(t.matrixWorld), e.position.copy(_h), vh.setFromMatrixPosition(t.target.matrixWorld), e.lookAt(vh), e.updateMatrixWorld(), Ko.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), this._frustum.setFromProjectionMatrix(Ko), n.set(
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
    ), n.multiply(Ko);
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
class Zv extends Ac {
  constructor() {
    super(new Le(50, 1, 0.5, 500)), this.isSpotLightShadow = !0, this.focus = 1;
  }
  updateMatrices(t) {
    const e = this.camera, n = is * 2 * t.angle * this.focus, s = this.mapSize.width / this.mapSize.height, r = t.distance || e.far;
    (n !== e.fov || s !== e.aspect || r !== e.far) && (e.fov = n, e.aspect = s, e.far = r, e.updateProjectionMatrix()), super.updateMatrices(t);
  }
  copy(t) {
    return super.copy(t), this.focus = t.focus, this;
  }
}
class Jv extends Zs {
  constructor(t, e, n = 0, s = Math.PI / 3, r = 0, o = 2) {
    super(t, e), this.isSpotLight = !0, this.type = "SpotLight", this.position.copy(ce.DEFAULT_UP), this.updateMatrix(), this.target = new ce(), this.distance = n, this.angle = s, this.penumbra = r, this.decay = o, this.map = null, this.shadow = new Zv();
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
const xh = /* @__PURE__ */ new Ct(), As = /* @__PURE__ */ new w(), Zo = /* @__PURE__ */ new w();
class Qv extends Ac {
  constructor() {
    super(new Le(90, 1, 0.5, 500)), this.isPointLightShadow = !0, this._frameExtents = new et(4, 2), this._viewportCount = 6, this._viewports = [
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
      new qt(2, 1, 1, 1),
      // negative X
      new qt(0, 1, 1, 1),
      // positive Z
      new qt(3, 1, 1, 1),
      // negative Z
      new qt(1, 1, 1, 1),
      // positive Y
      new qt(3, 0, 1, 1),
      // negative Y
      new qt(1, 0, 1, 1)
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
    r !== n.far && (n.far = r, n.updateProjectionMatrix()), As.setFromMatrixPosition(t.matrixWorld), n.position.copy(As), Zo.copy(n.position), Zo.add(this._cubeDirections[e]), n.up.copy(this._cubeUps[e]), n.lookAt(Zo), n.updateMatrixWorld(), s.makeTranslation(-As.x, -As.y, -As.z), xh.multiplyMatrices(n.projectionMatrix, n.matrixWorldInverse), this._frustum.setFromProjectionMatrix(xh);
  }
}
class Gu extends Zs {
  constructor(t, e, n = 0, s = 2) {
    super(t, e), this.isPointLight = !0, this.type = "PointLight", this.distance = n, this.decay = s, this.shadow = new Qv();
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
class tx extends Ac {
  constructor() {
    super(new mc(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class Wu extends Zs {
  constructor(t, e) {
    super(t, e), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(ce.DEFAULT_UP), this.updateMatrix(), this.target = new ce(), this.shadow = new tx();
  }
  dispose() {
    this.shadow.dispose();
  }
  copy(t) {
    return super.copy(t), this.target = t.target.clone(), this.shadow = t.shadow.clone(), this;
  }
}
class ex extends Zs {
  constructor(t, e) {
    super(t, e), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
class Os {
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
class nx extends fs {
  constructor(t) {
    super(t), this.isImageBitmapLoader = !0, typeof createImageBitmap > "u" && console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."), typeof fetch > "u" && console.warn("THREE.ImageBitmapLoader: fetch() not supported."), this.options = { premultiplyAlpha: "none" };
  }
  setOptions(t) {
    return this.options = t, this;
  }
  load(t, e, n, s) {
    t === void 0 && (t = ""), this.path !== void 0 && (t = this.path + t), t = this.manager.resolveURL(t);
    const r = this, o = qn.get(t);
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
      return qn.add(t, l), e && e(l), r.manager.itemEnd(t), l;
    }).catch(function(l) {
      s && s(l), qn.remove(t), r.manager.itemError(t), r.manager.itemEnd(t);
    });
    qn.add(t, c), r.manager.itemStart(t);
  }
}
class ix {
  constructor(t = !0) {
    this.autoStart = t, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, this.running = !1;
  }
  start() {
    this.startTime = yh(), this.oldTime = this.startTime, this.elapsedTime = 0, this.running = !0;
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
      const e = yh();
      t = (e - this.oldTime) / 1e3, this.oldTime = e, this.elapsedTime += t;
    }
    return t;
  }
}
function yh() {
  return performance.now();
}
const wc = "\\[\\]\\.:\\/", sx = new RegExp("[" + wc + "]", "g"), Rc = "[^" + wc + "]", rx = "[^" + wc.replace("\\.", "") + "]", ox = /* @__PURE__ */ /((?:WC+[\/:])*)/.source.replace("WC", Rc), ax = /* @__PURE__ */ /(WCOD+)?/.source.replace("WCOD", rx), cx = /* @__PURE__ */ /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Rc), lx = /* @__PURE__ */ /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Rc), hx = new RegExp(
  "^" + ox + ax + cx + lx + "$"
), ux = ["material", "materials", "bones", "map"];
class dx {
  constructor(t, e, n) {
    const s = n || Qt.parseTrackName(e);
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
class Qt {
  constructor(t, e, n) {
    this.path = e, this.parsedPath = n || Qt.parseTrackName(e), this.node = Qt.findNode(t, this.parsedPath.nodeName), this.rootNode = t, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(t, e, n) {
    return t && t.isAnimationObjectGroup ? new Qt.Composite(t, e, n) : new Qt(t, e, n);
  }
  /**
   * Replaces spaces with underscores and removes unsupported characters from
   * node names, to ensure compatibility with parseTrackName().
   *
   * @param {string} name Node name to be sanitized.
   * @return {string}
   */
  static sanitizeNodeName(t) {
    return t.replace(/\s/g, "_").replace(sx, "");
  }
  static parseTrackName(t) {
    const e = hx.exec(t);
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
      ux.indexOf(r) !== -1 && (n.nodeName = n.nodeName.substring(0, s), n.objectName = r);
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
    if (t || (t = Qt.findNode(this.rootNode, e.nodeName), this.node = t), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !t) {
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
Qt.Composite = dx;
Qt.prototype.BindingType = {
  Direct: 0,
  EntireArray: 1,
  ArrayElement: 2,
  HasFromToArray: 3
};
Qt.prototype.Versioning = {
  None: 0,
  NeedsUpdate: 1,
  MatrixWorldNeedsUpdate: 2
};
Qt.prototype.GetterByBindingType = [
  Qt.prototype._getValue_direct,
  Qt.prototype._getValue_array,
  Qt.prototype._getValue_arrayElement,
  Qt.prototype._getValue_toArray
];
Qt.prototype.SetterByBindingTypeAndVersioning = [
  [
    // Direct
    Qt.prototype._setValue_direct,
    Qt.prototype._setValue_direct_setNeedsUpdate,
    Qt.prototype._setValue_direct_setMatrixWorldNeedsUpdate
  ],
  [
    // EntireArray
    Qt.prototype._setValue_array,
    Qt.prototype._setValue_array_setNeedsUpdate,
    Qt.prototype._setValue_array_setMatrixWorldNeedsUpdate
  ],
  [
    // ArrayElement
    Qt.prototype._setValue_arrayElement,
    Qt.prototype._setValue_arrayElement_setNeedsUpdate,
    Qt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate
  ],
  [
    // HasToFromArray
    Qt.prototype._setValue_fromArray,
    Qt.prototype._setValue_fromArray_setNeedsUpdate,
    Qt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate
  ]
];
const Mh = /* @__PURE__ */ new Ct();
class fx {
  constructor(t, e, n = 0, s = 1 / 0) {
    this.ray = new cs(t, e), this.near = n, this.far = s, this.camera = null, this.layers = new fc(), this.params = {
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
    return Mh.identity().extractRotation(t.matrixWorld), this.ray.origin.setFromMatrixPosition(t.matrixWorld), this.ray.direction.set(0, 0, -1).applyMatrix4(Mh), this;
  }
  intersectObject(t, e = !0, n = []) {
    return $a(t, this, n, e), n.sort(Sh), n;
  }
  intersectObjects(t, e = !0, n = []) {
    for (let s = 0, r = t.length; s < r; s++)
      $a(t[s], this, n, e);
    return n.sort(Sh), n;
  }
}
function Sh(i, t) {
  return i.distance - t.distance;
}
function $a(i, t, e, n) {
  let s = !0;
  if (i.layers.test(t.layers) && i.raycast(t, e) === !1 && (s = !1), s === !0 && n === !0) {
    const r = i.children;
    for (let o = 0, a = r.length; o < a; o++)
      $a(r[o], t, e, !0);
  }
}
class Eh {
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
    return this.radius = Math.sqrt(t * t + e * e + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(t, n), this.phi = Math.acos(ve(e / this.radius, -1, 1))), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class px extends Pu {
  constructor(t = 10, e = 10, n = 4473924, s = 8947848) {
    n = new Mt(n), s = new Mt(s);
    const r = e / 2, o = t / e, a = t / 2, c = [], l = [];
    for (let d = 0, f = 0, g = -a; d <= e; d++, g += o) {
      c.push(-a, 0, g, a, 0, g), c.push(g, 0, -a, g, 0, a);
      const _ = d === r ? n : s;
      _.toArray(l, f), f += 3, _.toArray(l, f), f += 3, _.toArray(l, f), f += 3, _.toArray(l, f), f += 3;
    }
    const h = new we();
    h.setAttribute("position", new he(c, 3)), h.setAttribute("color", new he(l, 3));
    const u = new vc({ vertexColors: !0, toneMapped: !1 });
    super(h, u), this.type = "GridHelper";
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class mx extends _i {
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
  revision: ic
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = ic);
const bh = { type: "change" }, Cc = { type: "start" }, Xu = { type: "end" }, Nr = new cs(), Th = new Cn(), gx = Math.cos(70 * $i.DEG2RAD), _e = new w(), Oe = 2 * Math.PI, ee = {
  NONE: -1,
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2,
  TOUCH_ROTATE: 3,
  TOUCH_PAN: 4,
  TOUCH_DOLLY_PAN: 5,
  TOUCH_DOLLY_ROTATE: 6
}, Jo = 1e-6;
class _x extends mx {
  constructor(t, e = null) {
    super(t, e), this.state = ee.NONE, this.enabled = !0, this.target = new w(), this.cursor = new w(), this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minTargetRadius = 0, this.maxTargetRadius = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = 0.05, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panSpeed = 1, this.screenSpacePanning = !0, this.keyPanSpeed = 7, this.zoomToCursor = !1, this.autoRotate = !1, this.autoRotateSpeed = 2, this.keys = { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" }, this.mouseButtons = { LEFT: Gi.ROTATE, MIDDLE: Gi.DOLLY, RIGHT: Gi.PAN }, this.touches = { ONE: Xn.ROTATE, TWO: Xn.DOLLY_PAN }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this._domElementKeyEvents = null, this._lastPosition = new w(), this._lastQuaternion = new fn(), this._lastTargetPosition = new w(), this._quat = new fn().setFromUnitVectors(t.up, new w(0, 1, 0)), this._quatInverse = this._quat.clone().invert(), this._spherical = new Eh(), this._sphericalDelta = new Eh(), this._scale = 1, this._panOffset = new w(), this._rotateStart = new et(), this._rotateEnd = new et(), this._rotateDelta = new et(), this._panStart = new et(), this._panEnd = new et(), this._panDelta = new et(), this._dollyStart = new et(), this._dollyEnd = new et(), this._dollyDelta = new et(), this._dollyDirection = new w(), this._mouse = new et(), this._performCursorZoom = !1, this._pointers = [], this._pointerPositions = {}, this._controlActive = !1, this._onPointerMove = xx.bind(this), this._onPointerDown = vx.bind(this), this._onPointerUp = yx.bind(this), this._onContextMenu = wx.bind(this), this._onMouseWheel = Ex.bind(this), this._onKeyDown = bx.bind(this), this._onTouchStart = Tx.bind(this), this._onTouchMove = Ax.bind(this), this._onMouseDown = Mx.bind(this), this._onMouseMove = Sx.bind(this), this._interceptControlDown = Rx.bind(this), this._interceptControlUp = Cx.bind(this), this.domElement !== null && this.connect(), this.update();
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
    this.target.copy(this.target0), this.object.position.copy(this.position0), this.object.zoom = this.zoom0, this.object.updateProjectionMatrix(), this.dispatchEvent(bh), this.update(), this.state = ee.NONE;
  }
  update(t = null) {
    const e = this.object.position;
    _e.copy(e).sub(this.target), _e.applyQuaternion(this._quat), this._spherical.setFromVector3(_e), this.autoRotate && this.state === ee.NONE && this._rotateLeft(this._getAutoRotationAngle(t)), this.enableDamping ? (this._spherical.theta += this._sphericalDelta.theta * this.dampingFactor, this._spherical.phi += this._sphericalDelta.phi * this.dampingFactor) : (this._spherical.theta += this._sphericalDelta.theta, this._spherical.phi += this._sphericalDelta.phi);
    let n = this.minAzimuthAngle, s = this.maxAzimuthAngle;
    isFinite(n) && isFinite(s) && (n < -Math.PI ? n += Oe : n > Math.PI && (n -= Oe), s < -Math.PI ? s += Oe : s > Math.PI && (s -= Oe), n <= s ? this._spherical.theta = Math.max(n, Math.min(s, this._spherical.theta)) : this._spherical.theta = this._spherical.theta > (n + s) / 2 ? Math.max(n, this._spherical.theta) : Math.min(s, this._spherical.theta)), this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi)), this._spherical.makeSafe(), this.enableDamping === !0 ? this.target.addScaledVector(this._panOffset, this.dampingFactor) : this.target.add(this._panOffset), this.target.sub(this.cursor), this.target.clampLength(this.minTargetRadius, this.maxTargetRadius), this.target.add(this.cursor);
    let r = !1;
    if (this.zoomToCursor && this._performCursorZoom || this.object.isOrthographicCamera)
      this._spherical.radius = this._clampDistance(this._spherical.radius);
    else {
      const o = this._spherical.radius;
      this._spherical.radius = this._clampDistance(this._spherical.radius * this._scale), r = o != this._spherical.radius;
    }
    if (_e.setFromSpherical(this._spherical), _e.applyQuaternion(this._quatInverse), e.copy(this.target).add(_e), this.object.lookAt(this.target), this.enableDamping === !0 ? (this._sphericalDelta.theta *= 1 - this.dampingFactor, this._sphericalDelta.phi *= 1 - this.dampingFactor, this._panOffset.multiplyScalar(1 - this.dampingFactor)) : (this._sphericalDelta.set(0, 0, 0), this._panOffset.set(0, 0, 0)), this.zoomToCursor && this._performCursorZoom) {
      let o = null;
      if (this.object.isPerspectiveCamera) {
        const a = _e.length();
        o = this._clampDistance(a * this._scale);
        const c = a - o;
        this.object.position.addScaledVector(this._dollyDirection, c), this.object.updateMatrixWorld(), r = !!c;
      } else if (this.object.isOrthographicCamera) {
        const a = new w(this._mouse.x, this._mouse.y, 0);
        a.unproject(this.object);
        const c = this.object.zoom;
        this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), this.object.updateProjectionMatrix(), r = c !== this.object.zoom;
        const l = new w(this._mouse.x, this._mouse.y, 0);
        l.unproject(this.object), this.object.position.sub(l).add(a), this.object.updateMatrixWorld(), o = _e.length();
      } else
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."), this.zoomToCursor = !1;
      o !== null && (this.screenSpacePanning ? this.target.set(0, 0, -1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position) : (Nr.origin.copy(this.object.position), Nr.direction.set(0, 0, -1).transformDirection(this.object.matrix), Math.abs(this.object.up.dot(Nr.direction)) < gx ? this.object.lookAt(this.target) : (Th.setFromNormalAndCoplanarPoint(this.object.up, this.target), Nr.intersectPlane(Th, this.target))));
    } else if (this.object.isOrthographicCamera) {
      const o = this.object.zoom;
      this.object.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, this.object.zoom / this._scale)), o !== this.object.zoom && (this.object.updateProjectionMatrix(), r = !0);
    }
    return this._scale = 1, this._performCursorZoom = !1, r || this._lastPosition.distanceToSquared(this.object.position) > Jo || 8 * (1 - this._lastQuaternion.dot(this.object.quaternion)) > Jo || this._lastTargetPosition.distanceToSquared(this.target) > Jo ? (this.dispatchEvent(bh), this._lastPosition.copy(this.object.position), this._lastQuaternion.copy(this.object.quaternion), this._lastTargetPosition.copy(this.target), !0) : !1;
  }
  _getAutoRotationAngle(t) {
    return t !== null ? Oe / 60 * this.autoRotateSpeed * t : Oe / 60 / 60 * this.autoRotateSpeed;
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
    _e.setFromMatrixColumn(e, 0), _e.multiplyScalar(-t), this._panOffset.add(_e);
  }
  _panUp(t, e) {
    this.screenSpacePanning === !0 ? _e.setFromMatrixColumn(e, 1) : (_e.setFromMatrixColumn(e, 0), _e.crossVectors(this.object.up, _e)), _e.multiplyScalar(t), this._panOffset.add(_e);
  }
  // deltaX and deltaY are in pixels; right and down are positive
  _pan(t, e) {
    const n = this.domElement;
    if (this.object.isPerspectiveCamera) {
      const s = this.object.position;
      _e.copy(s).sub(this.target);
      let r = _e.length();
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
    this._rotateLeft(Oe * this._rotateDelta.x / e.clientHeight), this._rotateUp(Oe * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd), this.update();
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
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateUp(Oe * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, this.keyPanSpeed), e = !0;
        break;
      case this.keys.BOTTOM:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateUp(-Oe * this.rotateSpeed / this.domElement.clientHeight) : this._pan(0, -this.keyPanSpeed), e = !0;
        break;
      case this.keys.LEFT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateLeft(Oe * this.rotateSpeed / this.domElement.clientHeight) : this._pan(this.keyPanSpeed, 0), e = !0;
        break;
      case this.keys.RIGHT:
        t.ctrlKey || t.metaKey || t.shiftKey ? this._rotateLeft(-Oe * this.rotateSpeed / this.domElement.clientHeight) : this._pan(-this.keyPanSpeed, 0), e = !0;
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
    this._rotateLeft(Oe * this._rotateDelta.x / e.clientHeight), this._rotateUp(Oe * this._rotateDelta.y / e.clientHeight), this._rotateStart.copy(this._rotateEnd);
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
    e === void 0 && (e = new et(), this._pointerPositions[t.pointerId] = e), e.set(t.pageX, t.pageY);
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
function vx(i) {
  this.enabled !== !1 && (this._pointers.length === 0 && (this.domElement.setPointerCapture(i.pointerId), this.domElement.addEventListener("pointermove", this._onPointerMove), this.domElement.addEventListener("pointerup", this._onPointerUp)), !this._isTrackingPointer(i) && (this._addPointer(i), i.pointerType === "touch" ? this._onTouchStart(i) : this._onMouseDown(i)));
}
function xx(i) {
  this.enabled !== !1 && (i.pointerType === "touch" ? this._onTouchMove(i) : this._onMouseMove(i));
}
function yx(i) {
  switch (this._removePointer(i), this._pointers.length) {
    case 0:
      this.domElement.releasePointerCapture(i.pointerId), this.domElement.removeEventListener("pointermove", this._onPointerMove), this.domElement.removeEventListener("pointerup", this._onPointerUp), this.dispatchEvent(Xu), this.state = ee.NONE;
      break;
    case 1:
      const t = this._pointers[0], e = this._pointerPositions[t];
      this._onTouchStart({ pointerId: t, pageX: e.x, pageY: e.y });
      break;
  }
}
function Mx(i) {
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
    case Gi.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseDownDolly(i), this.state = ee.DOLLY;
      break;
    case Gi.ROTATE:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = ee.PAN;
      } else {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = ee.ROTATE;
      }
      break;
    case Gi.PAN:
      if (i.ctrlKey || i.metaKey || i.shiftKey) {
        if (this.enableRotate === !1) return;
        this._handleMouseDownRotate(i), this.state = ee.ROTATE;
      } else {
        if (this.enablePan === !1) return;
        this._handleMouseDownPan(i), this.state = ee.PAN;
      }
      break;
    default:
      this.state = ee.NONE;
  }
  this.state !== ee.NONE && this.dispatchEvent(Cc);
}
function Sx(i) {
  switch (this.state) {
    case ee.ROTATE:
      if (this.enableRotate === !1) return;
      this._handleMouseMoveRotate(i);
      break;
    case ee.DOLLY:
      if (this.enableZoom === !1) return;
      this._handleMouseMoveDolly(i);
      break;
    case ee.PAN:
      if (this.enablePan === !1) return;
      this._handleMouseMovePan(i);
      break;
  }
}
function Ex(i) {
  this.enabled === !1 || this.enableZoom === !1 || this.state !== ee.NONE || (i.preventDefault(), this.dispatchEvent(Cc), this._handleMouseWheel(this._customWheelEvent(i)), this.dispatchEvent(Xu));
}
function bx(i) {
  this.enabled === !1 || this.enablePan === !1 || this._handleKeyDown(i);
}
function Tx(i) {
  switch (this._trackPointer(i), this._pointers.length) {
    case 1:
      switch (this.touches.ONE) {
        case Xn.ROTATE:
          if (this.enableRotate === !1) return;
          this._handleTouchStartRotate(i), this.state = ee.TOUCH_ROTATE;
          break;
        case Xn.PAN:
          if (this.enablePan === !1) return;
          this._handleTouchStartPan(i), this.state = ee.TOUCH_PAN;
          break;
        default:
          this.state = ee.NONE;
      }
      break;
    case 2:
      switch (this.touches.TWO) {
        case Xn.DOLLY_PAN:
          if (this.enableZoom === !1 && this.enablePan === !1) return;
          this._handleTouchStartDollyPan(i), this.state = ee.TOUCH_DOLLY_PAN;
          break;
        case Xn.DOLLY_ROTATE:
          if (this.enableZoom === !1 && this.enableRotate === !1) return;
          this._handleTouchStartDollyRotate(i), this.state = ee.TOUCH_DOLLY_ROTATE;
          break;
        default:
          this.state = ee.NONE;
      }
      break;
    default:
      this.state = ee.NONE;
  }
  this.state !== ee.NONE && this.dispatchEvent(Cc);
}
function Ax(i) {
  switch (this._trackPointer(i), this.state) {
    case ee.TOUCH_ROTATE:
      if (this.enableRotate === !1) return;
      this._handleTouchMoveRotate(i), this.update();
      break;
    case ee.TOUCH_PAN:
      if (this.enablePan === !1) return;
      this._handleTouchMovePan(i), this.update();
      break;
    case ee.TOUCH_DOLLY_PAN:
      if (this.enableZoom === !1 && this.enablePan === !1) return;
      this._handleTouchMoveDollyPan(i), this.update();
      break;
    case ee.TOUCH_DOLLY_ROTATE:
      if (this.enableZoom === !1 && this.enableRotate === !1) return;
      this._handleTouchMoveDollyRotate(i), this.update();
      break;
    default:
      this.state = ee.NONE;
  }
}
function wx(i) {
  this.enabled !== !1 && i.preventDefault();
}
function Rx(i) {
  i.key === "Control" && (this._controlActive = !0, this.domElement.getRootNode().addEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Cx(i) {
  i.key === "Control" && (this._controlActive = !1, this.domElement.getRootNode().removeEventListener("keyup", this._interceptControlUp, { passive: !0, capture: !0 }));
}
function Ah(i, t) {
  if (t === cf)
    return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."), i;
  if (t === ka || t === au) {
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
    if (t === ka)
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
class Px extends fs {
  constructor(t) {
    super(t), this.dracoLoader = null, this.ktx2Loader = null, this.meshoptDecoder = null, this.pluginCallbacks = [], this.register(function(e) {
      return new Ux(e);
    }), this.register(function(e) {
      return new Ox(e);
    }), this.register(function(e) {
      return new Xx(e);
    }), this.register(function(e) {
      return new $x(e);
    }), this.register(function(e) {
      return new qx(e);
    }), this.register(function(e) {
      return new Bx(e);
    }), this.register(function(e) {
      return new kx(e);
    }), this.register(function(e) {
      return new zx(e);
    }), this.register(function(e) {
      return new Hx(e);
    }), this.register(function(e) {
      return new Nx(e);
    }), this.register(function(e) {
      return new Vx(e);
    }), this.register(function(e) {
      return new Fx(e);
    }), this.register(function(e) {
      return new Wx(e);
    }), this.register(function(e) {
      return new Gx(e);
    }), this.register(function(e) {
      return new Ix(e);
    }), this.register(function(e) {
      return new Yx(e);
    }), this.register(function(e) {
      return new jx(e);
    });
  }
  load(t, e, n, s) {
    const r = this;
    let o;
    if (this.resourcePath !== "")
      o = this.resourcePath;
    else if (this.path !== "") {
      const l = Os.extractUrlBase(t);
      o = Os.resolveURL(l, this.path);
    } else
      o = Os.extractUrlBase(t);
    this.manager.itemStart(t);
    const a = function(l) {
      s ? s(l) : console.error(l), r.manager.itemError(t), r.manager.itemEnd(t);
    }, c = new Vu(this.manager);
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
      if (c.decode(new Uint8Array(t, 0, 4)) === $u) {
        try {
          o[Ot.KHR_BINARY_GLTF] = new Kx(t);
        } catch (u) {
          s && s(u);
          return;
        }
        r = JSON.parse(o[Ot.KHR_BINARY_GLTF].content);
      } else
        r = JSON.parse(c.decode(t));
    else
      r = t;
    if (r.asset === void 0 || r.asset.version[0] < 2) {
      s && s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));
      return;
    }
    const l = new ly(r, {
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
          case Ot.KHR_MATERIALS_UNLIT:
            o[u] = new Dx();
            break;
          case Ot.KHR_DRACO_MESH_COMPRESSION:
            o[u] = new Zx(r, this.dracoLoader);
            break;
          case Ot.KHR_TEXTURE_TRANSFORM:
            o[u] = new Jx();
            break;
          case Ot.KHR_MESH_QUANTIZATION:
            o[u] = new Qx();
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
function Lx() {
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
const Ot = {
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
class Ix {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_LIGHTS_PUNCTUAL, this.cache = { refs: {}, uses: {} };
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
    const h = new Mt(16777215);
    c.color !== void 0 && h.setRGB(c.color[0], c.color[1], c.color[2], be);
    const u = c.range !== void 0 ? c.range : 0;
    switch (c.type) {
      case "directional":
        l = new Wu(h), l.target.position.set(0, 0, -1), l.add(l.target);
        break;
      case "point":
        l = new Gu(h), l.distance = u;
        break;
      case "spot":
        l = new Jv(h), l.distance = u, c.spot = c.spot || {}, c.spot.innerConeAngle = c.spot.innerConeAngle !== void 0 ? c.spot.innerConeAngle : 0, c.spot.outerConeAngle = c.spot.outerConeAngle !== void 0 ? c.spot.outerConeAngle : Math.PI / 4, l.angle = c.spot.outerConeAngle, l.penumbra = 1 - c.spot.innerConeAngle / c.spot.outerConeAngle, l.target.position.set(0, 0, -1), l.add(l.target);
        break;
      default:
        throw new Error("THREE.GLTFLoader: Unexpected light type: " + c.type);
    }
    return l.position.set(0, 0, 0), l.decay = 2, Rn(l, c), c.intensity !== void 0 && (l.intensity = c.intensity), l.name = e.createUniqueName(c.name || "light_" + t), s = Promise.resolve(l), e.cache.add(n, s), s;
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
class Dx {
  constructor() {
    this.name = Ot.KHR_MATERIALS_UNLIT;
  }
  getMaterialType() {
    return dn;
  }
  extendParams(t, e, n) {
    const s = [];
    t.color = new Mt(1, 1, 1), t.opacity = 1;
    const r = e.pbrMetallicRoughness;
    if (r) {
      if (Array.isArray(r.baseColorFactor)) {
        const o = r.baseColorFactor;
        t.color.setRGB(o[0], o[1], o[2], be), t.opacity = o[3];
      }
      r.baseColorTexture !== void 0 && s.push(n.assignTexture(t, "map", r.baseColorTexture, Pe));
    }
    return Promise.all(s);
  }
}
class Nx {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_MATERIALS_EMISSIVE_STRENGTH;
  }
  extendMaterialParams(t, e) {
    const s = this.parser.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name].emissiveStrength;
    return r !== void 0 && (e.emissiveIntensity = r), Promise.resolve();
  }
}
class Ux {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_MATERIALS_CLEARCOAT;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : _n;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    if (o.clearcoatFactor !== void 0 && (e.clearcoat = o.clearcoatFactor), o.clearcoatTexture !== void 0 && r.push(n.assignTexture(e, "clearcoatMap", o.clearcoatTexture)), o.clearcoatRoughnessFactor !== void 0 && (e.clearcoatRoughness = o.clearcoatRoughnessFactor), o.clearcoatRoughnessTexture !== void 0 && r.push(n.assignTexture(e, "clearcoatRoughnessMap", o.clearcoatRoughnessTexture)), o.clearcoatNormalTexture !== void 0 && (r.push(n.assignTexture(e, "clearcoatNormalMap", o.clearcoatNormalTexture)), o.clearcoatNormalTexture.scale !== void 0)) {
      const a = o.clearcoatNormalTexture.scale;
      e.clearcoatNormalScale = new et(a, a);
    }
    return Promise.all(r);
  }
}
class Ox {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_MATERIALS_DISPERSION;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : _n;
  }
  extendMaterialParams(t, e) {
    const s = this.parser.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name];
    return e.dispersion = r.dispersion !== void 0 ? r.dispersion : 0, Promise.resolve();
  }
}
class Fx {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_MATERIALS_IRIDESCENCE;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : _n;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return o.iridescenceFactor !== void 0 && (e.iridescence = o.iridescenceFactor), o.iridescenceTexture !== void 0 && r.push(n.assignTexture(e, "iridescenceMap", o.iridescenceTexture)), o.iridescenceIor !== void 0 && (e.iridescenceIOR = o.iridescenceIor), e.iridescenceThicknessRange === void 0 && (e.iridescenceThicknessRange = [100, 400]), o.iridescenceThicknessMinimum !== void 0 && (e.iridescenceThicknessRange[0] = o.iridescenceThicknessMinimum), o.iridescenceThicknessMaximum !== void 0 && (e.iridescenceThicknessRange[1] = o.iridescenceThicknessMaximum), o.iridescenceThicknessTexture !== void 0 && r.push(n.assignTexture(e, "iridescenceThicknessMap", o.iridescenceThicknessTexture)), Promise.all(r);
  }
}
class Bx {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_MATERIALS_SHEEN;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : _n;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [];
    e.sheenColor = new Mt(0, 0, 0), e.sheenRoughness = 0, e.sheen = 1;
    const o = s.extensions[this.name];
    if (o.sheenColorFactor !== void 0) {
      const a = o.sheenColorFactor;
      e.sheenColor.setRGB(a[0], a[1], a[2], be);
    }
    return o.sheenRoughnessFactor !== void 0 && (e.sheenRoughness = o.sheenRoughnessFactor), o.sheenColorTexture !== void 0 && r.push(n.assignTexture(e, "sheenColorMap", o.sheenColorTexture, Pe)), o.sheenRoughnessTexture !== void 0 && r.push(n.assignTexture(e, "sheenRoughnessMap", o.sheenRoughnessTexture)), Promise.all(r);
  }
}
class kx {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_MATERIALS_TRANSMISSION;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : _n;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return o.transmissionFactor !== void 0 && (e.transmission = o.transmissionFactor), o.transmissionTexture !== void 0 && r.push(n.assignTexture(e, "transmissionMap", o.transmissionTexture)), Promise.all(r);
  }
}
class zx {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_MATERIALS_VOLUME;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : _n;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    e.thickness = o.thicknessFactor !== void 0 ? o.thicknessFactor : 0, o.thicknessTexture !== void 0 && r.push(n.assignTexture(e, "thicknessMap", o.thicknessTexture)), e.attenuationDistance = o.attenuationDistance || 1 / 0;
    const a = o.attenuationColor || [1, 1, 1];
    return e.attenuationColor = new Mt().setRGB(a[0], a[1], a[2], be), Promise.all(r);
  }
}
class Hx {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_MATERIALS_IOR;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : _n;
  }
  extendMaterialParams(t, e) {
    const s = this.parser.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = s.extensions[this.name];
    return e.ior = r.ior !== void 0 ? r.ior : 1.5, Promise.resolve();
  }
}
class Vx {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_MATERIALS_SPECULAR;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : _n;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    e.specularIntensity = o.specularFactor !== void 0 ? o.specularFactor : 1, o.specularTexture !== void 0 && r.push(n.assignTexture(e, "specularIntensityMap", o.specularTexture));
    const a = o.specularColorFactor || [1, 1, 1];
    return e.specularColor = new Mt().setRGB(a[0], a[1], a[2], be), o.specularColorTexture !== void 0 && r.push(n.assignTexture(e, "specularColorMap", o.specularColorTexture, Pe)), Promise.all(r);
  }
}
class Gx {
  constructor(t) {
    this.parser = t, this.name = Ot.EXT_MATERIALS_BUMP;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : _n;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return e.bumpScale = o.bumpFactor !== void 0 ? o.bumpFactor : 1, o.bumpTexture !== void 0 && r.push(n.assignTexture(e, "bumpMap", o.bumpTexture)), Promise.all(r);
  }
}
class Wx {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_MATERIALS_ANISOTROPY;
  }
  getMaterialType(t) {
    const n = this.parser.json.materials[t];
    return !n.extensions || !n.extensions[this.name] ? null : _n;
  }
  extendMaterialParams(t, e) {
    const n = this.parser, s = n.json.materials[t];
    if (!s.extensions || !s.extensions[this.name])
      return Promise.resolve();
    const r = [], o = s.extensions[this.name];
    return o.anisotropyStrength !== void 0 && (e.anisotropy = o.anisotropyStrength), o.anisotropyRotation !== void 0 && (e.anisotropyRotation = o.anisotropyRotation), o.anisotropyTexture !== void 0 && r.push(n.assignTexture(e, "anisotropyMap", o.anisotropyTexture)), Promise.all(r);
  }
}
class Xx {
  constructor(t) {
    this.parser = t, this.name = Ot.KHR_TEXTURE_BASISU;
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
class $x {
  constructor(t) {
    this.parser = t, this.name = Ot.EXT_TEXTURE_WEBP, this.isSupported = null;
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
class qx {
  constructor(t) {
    this.parser = t, this.name = Ot.EXT_TEXTURE_AVIF, this.isSupported = null;
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
class Yx {
  constructor(t) {
    this.name = Ot.EXT_MESHOPT_COMPRESSION, this.parser = t;
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
class jx {
  constructor(t) {
    this.name = Ot.EXT_MESH_GPU_INSTANCING, this.parser = t;
  }
  createNodeMesh(t) {
    const e = this.parser.json, n = e.nodes[t];
    if (!n.extensions || !n.extensions[this.name] || n.mesh === void 0)
      return null;
    const s = e.meshes[n.mesh];
    for (const l of s.primitives)
      if (l.mode !== Ye.TRIANGLES && l.mode !== Ye.TRIANGLE_STRIP && l.mode !== Ye.TRIANGLE_FAN && l.mode !== void 0)
        return null;
    const o = n.extensions[this.name].attributes, a = [], c = {};
    for (const l in o)
      a.push(this.parser.getDependency("accessor", o[l]).then((h) => (c[l] = h, c[l])));
    return a.length < 1 ? null : (a.push(this.parser.createNodeMesh(t)), Promise.all(a).then((l) => {
      const h = l.pop(), u = h.isGroup ? h.children : [h], d = l[0].count, f = [];
      for (const g of u) {
        const _ = new Ct(), p = new w(), m = new fn(), b = new w(1, 1, 1), y = new ev(g.geometry, g.material, d);
        for (let S = 0; S < d; S++)
          c.TRANSLATION && p.fromBufferAttribute(c.TRANSLATION, S), c.ROTATION && m.fromBufferAttribute(c.ROTATION, S), c.SCALE && b.fromBufferAttribute(c.SCALE, S), y.setMatrixAt(S, _.compose(p, m, b));
        for (const S in c)
          if (S === "_COLOR_0") {
            const D = c[S];
            y.instanceColor = new Va(D.array, D.itemSize, D.normalized);
          } else S !== "TRANSLATION" && S !== "ROTATION" && S !== "SCALE" && g.geometry.setAttribute(S, c[S]);
        ce.prototype.copy.call(y, g), this.parser.assignFinalMaterial(y), f.push(y);
      }
      return h.isGroup ? (h.clear(), h.add(...f), h) : f[0];
    }));
  }
}
const $u = "glTF", ws = 12, wh = { JSON: 1313821514, BIN: 5130562 };
class Kx {
  constructor(t) {
    this.name = Ot.KHR_BINARY_GLTF, this.content = null, this.body = null;
    const e = new DataView(t, 0, ws), n = new TextDecoder();
    if (this.header = {
      magic: n.decode(new Uint8Array(t.slice(0, 4))),
      version: e.getUint32(4, !0),
      length: e.getUint32(8, !0)
    }, this.header.magic !== $u)
      throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
    if (this.header.version < 2)
      throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
    const s = this.header.length - ws, r = new DataView(t, ws);
    let o = 0;
    for (; o < s; ) {
      const a = r.getUint32(o, !0);
      o += 4;
      const c = r.getUint32(o, !0);
      if (o += 4, c === wh.JSON) {
        const l = new Uint8Array(t, ws + o, a);
        this.content = n.decode(l);
      } else if (c === wh.BIN) {
        const l = ws + o;
        this.body = t.slice(l, l + a);
      }
      o += a;
    }
    if (this.content === null)
      throw new Error("THREE.GLTFLoader: JSON content not found.");
  }
}
class Zx {
  constructor(t, e) {
    if (!e)
      throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");
    this.name = Ot.KHR_DRACO_MESH_COMPRESSION, this.json = t, this.dracoLoader = e, this.dracoLoader.preload();
  }
  decodePrimitive(t, e) {
    const n = this.json, s = this.dracoLoader, r = t.extensions[this.name].bufferView, o = t.extensions[this.name].attributes, a = {}, c = {}, l = {};
    for (const h in o) {
      const u = qa[h] || h.toLowerCase();
      a[u] = o[h];
    }
    for (const h in t.attributes) {
      const u = qa[h] || h.toLowerCase();
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
        }, a, l, be, d);
      });
    });
  }
}
class Jx {
  constructor() {
    this.name = Ot.KHR_TEXTURE_TRANSFORM;
  }
  extendTexture(t, e) {
    return (e.texCoord === void 0 || e.texCoord === t.channel) && e.offset === void 0 && e.rotation === void 0 && e.scale === void 0 || (t = t.clone(), e.texCoord !== void 0 && (t.channel = e.texCoord), e.offset !== void 0 && t.offset.fromArray(e.offset), e.rotation !== void 0 && (t.rotation = e.rotation), e.scale !== void 0 && t.repeat.fromArray(e.scale), t.needsUpdate = !0), t;
  }
}
class Qx {
  constructor() {
    this.name = Ot.KHR_MESH_QUANTIZATION;
  }
}
class qu extends Ks {
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
    const r = this.resultBuffer, o = this.sampleValues, a = this.valueSize, c = a * 2, l = a * 3, h = s - e, u = (n - e) / h, d = u * u, f = d * u, g = t * l, _ = g - l, p = -2 * f + 3 * d, m = f - d, b = 1 - p, y = m - d + u;
    for (let S = 0; S !== a; S++) {
      const D = o[_ + S + a], R = o[_ + S + c] * h, A = o[g + S + a], N = o[g + S] * h;
      r[S] = b * D + y * R + p * A + m * N;
    }
    return r;
  }
}
const ty = new fn();
class ey extends qu {
  interpolate_(t, e, n, s) {
    const r = super.interpolate_(t, e, n, s);
    return ty.fromArray(r).normalize().toArray(r), r;
  }
}
const Ye = {
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
}, Rh = {
  9728: Ie,
  9729: We,
  9984: Zh,
  9985: Br,
  9986: Rs,
  9987: Pn
}, Ch = {
  33071: $n,
  33648: Yr,
  10497: ts
}, Qo = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
}, qa = {
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
}, Hn = {
  scale: "scale",
  translation: "position",
  rotation: "quaternion",
  weights: "morphTargetInfluences"
}, ny = {
  CUBICSPLINE: void 0,
  // We use a custom interpolant (GLTFCubicSplineInterpolation) for CUBICSPLINE tracks. Each
  // keyframe track will be initialized with a default interpolation type, then modified.
  LINEAR: Vs,
  STEP: Hs
}, ta = {
  OPAQUE: "OPAQUE",
  MASK: "MASK",
  BLEND: "BLEND"
};
function iy(i) {
  return i.DefaultMaterial === void 0 && (i.DefaultMaterial = new hs({
    color: 16777215,
    emissive: 0,
    metalness: 1,
    roughness: 1,
    transparent: !1,
    depthTest: !0,
    side: In
  })), i.DefaultMaterial;
}
function ai(i, t, e) {
  for (const n in e.extensions)
    i[n] === void 0 && (t.userData.gltfExtensions = t.userData.gltfExtensions || {}, t.userData.gltfExtensions[n] = e.extensions[n]);
}
function Rn(i, t) {
  t.extras !== void 0 && (typeof t.extras == "object" ? Object.assign(i.userData, t.extras) : console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, " + t.extras));
}
function sy(i, t, e) {
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
function ry(i, t) {
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
function oy(i) {
  let t;
  const e = i.extensions && i.extensions[Ot.KHR_DRACO_MESH_COMPRESSION];
  if (e ? t = "draco:" + e.bufferView + ":" + e.indices + ":" + ea(e.attributes) : t = i.indices + ":" + ea(i.attributes) + ":" + i.mode, i.targets !== void 0)
    for (let n = 0, s = i.targets.length; n < s; n++)
      t += ":" + ea(i.targets[n]);
  return t;
}
function ea(i) {
  let t = "";
  const e = Object.keys(i).sort();
  for (let n = 0, s = e.length; n < s; n++)
    t += e[n] + ":" + i[e[n]] + ";";
  return t;
}
function Ya(i) {
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
function ay(i) {
  return i.search(/\.jpe?g($|\?)/i) > 0 || i.search(/^data\:image\/jpeg/) === 0 ? "image/jpeg" : i.search(/\.webp($|\?)/i) > 0 || i.search(/^data\:image\/webp/) === 0 ? "image/webp" : "image/png";
}
const cy = new Ct();
class ly {
  constructor(t = {}, e = {}) {
    this.json = t, this.extensions = {}, this.plugins = {}, this.options = e, this.cache = new Lx(), this.associations = /* @__PURE__ */ new Map(), this.primitiveCache = {}, this.nodeCache = {}, this.meshCache = { refs: {}, uses: {} }, this.cameraCache = { refs: {}, uses: {} }, this.lightCache = { refs: {}, uses: {} }, this.sourceCache = {}, this.textureCache = {}, this.nodeNamesUsed = {};
    let n = !1, s = -1, r = !1, o = -1;
    if (typeof navigator < "u") {
      const a = navigator.userAgent;
      n = /^((?!chrome|android).)*safari/i.test(a) === !0;
      const c = a.match(/Version\/(\d+)/);
      s = n && c ? parseInt(c[1], 10) : -1, r = a.indexOf("Firefox") > -1, o = r ? a.match(/Firefox\/([0-9]+)\./)[1] : -1;
    }
    typeof createImageBitmap > "u" || n && s < 17 || r && o < 98 ? this.textureLoader = new jv(this.options.manager) : this.textureLoader = new nx(this.options.manager), this.textureLoader.setCrossOrigin(this.options.crossOrigin), this.textureLoader.setRequestHeader(this.options.requestHeader), this.fileLoader = new Vu(this.options.manager), this.fileLoader.setResponseType("arraybuffer"), this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0);
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
      return ai(r, a, s), Rn(a, s), Promise.all(n._invokeAll(function(c) {
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
      return Promise.resolve(this.extensions[Ot.KHR_BINARY_GLTF].body);
    const s = this.options;
    return new Promise(function(r, o) {
      n.load(Os.resolveURL(e.uri, s.path), r, void 0, function() {
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
      const o = Qo[s.type], a = Yi[s.componentType], c = s.normalized === !0, l = new a(s.count * o);
      return Promise.resolve(new De(l, o, c));
    }
    const r = [];
    return s.bufferView !== void 0 ? r.push(this.getDependency("bufferView", s.bufferView)) : r.push(null), s.sparse !== void 0 && (r.push(this.getDependency("bufferView", s.sparse.indices.bufferView)), r.push(this.getDependency("bufferView", s.sparse.values.bufferView))), Promise.all(r).then(function(o) {
      const a = o[0], c = Qo[s.type], l = Yi[s.componentType], h = l.BYTES_PER_ELEMENT, u = h * c, d = s.byteOffset || 0, f = s.bufferView !== void 0 ? n.bufferViews[s.bufferView].byteStride : void 0, g = s.normalized === !0;
      let _, p;
      if (f && f !== u) {
        const m = Math.floor(d / f), b = "InterleavedBuffer:" + s.bufferView + ":" + s.componentType + ":" + m + ":" + s.count;
        let y = e.cache.get(b);
        y || (_ = new l(a, m * f, s.count * f / h), y = new Tu(_, f / h), e.cache.add(b, y)), p = new Ws(y, c, d % f / h, g);
      } else
        a === null ? _ = new l(s.count * c) : _ = new l(a, d, s.count * c), p = new De(_, c, g);
      if (s.sparse !== void 0) {
        const m = Qo.SCALAR, b = Yi[s.sparse.indices.componentType], y = s.sparse.indices.byteOffset || 0, S = s.sparse.values.byteOffset || 0, D = new b(o[1], y, s.sparse.count * m), R = new l(o[2], S, s.sparse.count * c);
        a !== null && (p = new De(p.array.slice(), p.itemSize, p.normalized)), p.normalized = !1;
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
      return h.magFilter = Rh[d.magFilter] || We, h.minFilter = Rh[d.minFilter] || Pn, h.wrapS = Ch[d.wrapS] || ts, h.wrapT = Ch[d.wrapT] || ts, s.associations.set(h, { textures: t }), h;
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
          const p = new xe(_);
          p.needsUpdate = !0, d(p);
        }), e.load(Os.resolveURL(u, r.path), g, void 0, f);
      });
    }).then(function(u) {
      return l === !0 && a.revokeObjectURL(c), Rn(u, o), u.userData.mimeType = o.mimeType || ay(o.uri), u;
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
      if (n.texCoord !== void 0 && n.texCoord > 0 && (o = o.clone(), o.channel = n.texCoord), r.extensions[Ot.KHR_TEXTURE_TRANSFORM]) {
        const a = n.extensions !== void 0 ? n.extensions[Ot.KHR_TEXTURE_TRANSFORM] : void 0;
        if (a) {
          const c = r.associations.get(o);
          o = r.extensions[Ot.KHR_TEXTURE_TRANSFORM].extendTexture(o, a), r.associations.set(o, c);
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
      c || (c = new Lu(), ln.prototype.copy.call(c, n), c.color.copy(n.color), c.map = n.map, c.sizeAttenuation = !1, this.cache.add(a, c)), n = c;
    } else if (t.isLine) {
      const a = "LineBasicMaterial:" + n.uuid;
      let c = this.cache.get(a);
      c || (c = new vc(), ln.prototype.copy.call(c, n), c.color.copy(n.color), c.map = n.map, this.cache.add(a, c)), n = c;
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
    return hs;
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
    if (c[Ot.KHR_MATERIALS_UNLIT]) {
      const u = s[Ot.KHR_MATERIALS_UNLIT];
      o = u.getMaterialType(), l.push(u.extendParams(a, r, e));
    } else {
      const u = r.pbrMetallicRoughness || {};
      if (a.color = new Mt(1, 1, 1), a.opacity = 1, Array.isArray(u.baseColorFactor)) {
        const d = u.baseColorFactor;
        a.color.setRGB(d[0], d[1], d[2], be), a.opacity = d[3];
      }
      u.baseColorTexture !== void 0 && l.push(e.assignTexture(a, "map", u.baseColorTexture, Pe)), a.metalness = u.metallicFactor !== void 0 ? u.metallicFactor : 1, a.roughness = u.roughnessFactor !== void 0 ? u.roughnessFactor : 1, u.metallicRoughnessTexture !== void 0 && (l.push(e.assignTexture(a, "metalnessMap", u.metallicRoughnessTexture)), l.push(e.assignTexture(a, "roughnessMap", u.metallicRoughnessTexture))), o = this._invokeOne(function(d) {
        return d.getMaterialType && d.getMaterialType(t);
      }), l.push(Promise.all(this._invokeAll(function(d) {
        return d.extendMaterialParams && d.extendMaterialParams(t, a);
      })));
    }
    r.doubleSided === !0 && (a.side = on);
    const h = r.alphaMode || ta.OPAQUE;
    if (h === ta.BLEND ? (a.transparent = !0, a.depthWrite = !1) : (a.transparent = !1, h === ta.MASK && (a.alphaTest = r.alphaCutoff !== void 0 ? r.alphaCutoff : 0.5)), r.normalTexture !== void 0 && o !== dn && (l.push(e.assignTexture(a, "normalMap", r.normalTexture)), a.normalScale = new et(1, 1), r.normalTexture.scale !== void 0)) {
      const u = r.normalTexture.scale;
      a.normalScale.set(u, u);
    }
    if (r.occlusionTexture !== void 0 && o !== dn && (l.push(e.assignTexture(a, "aoMap", r.occlusionTexture)), r.occlusionTexture.strength !== void 0 && (a.aoMapIntensity = r.occlusionTexture.strength)), r.emissiveFactor !== void 0 && o !== dn) {
      const u = r.emissiveFactor;
      a.emissive = new Mt().setRGB(u[0], u[1], u[2], be);
    }
    return r.emissiveTexture !== void 0 && o !== dn && l.push(e.assignTexture(a, "emissiveMap", r.emissiveTexture, Pe)), Promise.all(l).then(function() {
      const u = new o(a);
      return r.name && (u.name = r.name), Rn(u, r), e.associations.set(u, { materials: t }), r.extensions && ai(s, u, r), u;
    });
  }
  /** When Object3D instances are targeted by animation, they need unique names. */
  createUniqueName(t) {
    const e = Qt.sanitizeNodeName(t || "");
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
      return n[Ot.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a, e).then(function(c) {
        return Ph(c, a, e);
      });
    }
    const o = [];
    for (let a = 0, c = t.length; a < c; a++) {
      const l = t[a], h = oy(l), u = s[h];
      if (u)
        o.push(u.promise);
      else {
        let d;
        l.extensions && l.extensions[Ot.KHR_DRACO_MESH_COMPRESSION] ? d = r(l) : d = Ph(new we(), l, e), s[h] = { primitive: l, promise: d }, o.push(d);
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
      const h = o[c].material === void 0 ? iy(this.cache) : this.getDependency("material", o[c].material);
      a.push(h);
    }
    return a.push(e.loadGeometries(o)), Promise.all(a).then(function(c) {
      const l = c.slice(0, c.length - 1), h = c[c.length - 1], u = [];
      for (let f = 0, g = h.length; f < g; f++) {
        const _ = h[f], p = o[f];
        let m;
        const b = l[f];
        if (p.mode === Ye.TRIANGLES || p.mode === Ye.TRIANGLE_STRIP || p.mode === Ye.TRIANGLE_FAN || p.mode === void 0)
          m = r.isSkinnedMesh === !0 ? new J0(_, b) : new ge(_, b), m.isSkinnedMesh === !0 && m.normalizeSkinWeights(), p.mode === Ye.TRIANGLE_STRIP ? m.geometry = Ah(m.geometry, au) : p.mode === Ye.TRIANGLE_FAN && (m.geometry = Ah(m.geometry, ka));
        else if (p.mode === Ye.LINES)
          m = new Pu(_, b);
        else if (p.mode === Ye.LINE_STRIP)
          m = new xc(_, b);
        else if (p.mode === Ye.LINE_LOOP)
          m = new nv(_, b);
        else if (p.mode === Ye.POINTS)
          m = new iv(_, b);
        else
          throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + p.mode);
        Object.keys(m.geometry.morphAttributes).length > 0 && ry(m, r), m.name = e.createUniqueName(r.name || "mesh_" + t), Rn(m, r), p.extensions && ai(s, m, p), e.assignFinalMaterial(m), u.push(m);
      }
      for (let f = 0, g = u.length; f < g; f++)
        e.associations.set(u[f], {
          meshes: t,
          primitives: f
        });
      if (u.length === 1)
        return r.extensions && ai(s, u[0], r), u[0];
      const d = new ie();
      r.extensions && ai(s, d, r), e.associations.set(d, { meshes: t });
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
    return n.type === "perspective" ? e = new Le($i.radToDeg(s.yfov), s.aspectRatio || 1, s.znear || 1, s.zfar || 2e6) : n.type === "orthographic" && (e = new mc(-s.xmag, s.xmag, s.ymag, -s.ymag, s.znear, s.zfar)), n.name && (e.name = this.createUniqueName(n.name)), Rn(e, n), Promise.resolve(e);
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
          const d = new Ct();
          r !== null && d.fromArray(r.array, l * 16), c.push(d);
        } else
          console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', e.joints[l]);
      }
      return new _c(a, c);
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
      const f = s.channels[u], g = s.samplers[f.sampler], _ = f.target, p = _.node, m = s.parameters !== void 0 ? s.parameters[g.input] : g.input, b = s.parameters !== void 0 ? s.parameters[g.output] : g.output;
      _.node !== void 0 && (o.push(this.getDependency("node", p)), a.push(this.getDependency("accessor", m)), c.push(this.getDependency("accessor", b)), l.push(g), h.push(_));
    }
    return Promise.all([
      Promise.all(o),
      Promise.all(a),
      Promise.all(c),
      Promise.all(l),
      Promise.all(h)
    ]).then(function(u) {
      const d = u[0], f = u[1], g = u[2], _ = u[3], p = u[4], m = [];
      for (let b = 0, y = d.length; b < y; b++) {
        const S = d[b], D = f[b], R = g[b], A = _[b], N = p[b];
        if (S === void 0) continue;
        S.updateMatrix && S.updateMatrix();
        const Y = n._createAnimationTracks(S, D, R, A, N);
        if (Y)
          for (let v = 0; v < Y.length; v++)
            m.push(Y[v]);
      }
      return new Vv(r, void 0, m);
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
        f.isSkinnedMesh && f.bind(d, cy);
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
      if (r.isBone === !0 ? h = new Ru() : l.length > 1 ? h = new ie() : l.length === 1 ? h = l[0] : h = new ce(), h !== l[0])
        for (let u = 0, d = l.length; u < d; u++)
          h.add(l[u]);
      if (r.name && (h.userData.name = r.name, h.name = o), Rn(h, r), r.extensions && ai(n, h, r), r.matrix !== void 0) {
        const u = new Ct();
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
    const e = this.extensions, n = this.json.scenes[t], s = this, r = new ie();
    n.name && (r.name = s.createUniqueName(n.name)), Rn(r, n), n.extensions && ai(e, r, n);
    const o = n.nodes || [], a = [];
    for (let c = 0, l = o.length; c < l; c++)
      a.push(s.getDependency("node", o[c]));
    return Promise.all(a).then(function(c) {
      for (let h = 0, u = c.length; h < u; h++)
        r.add(c[h]);
      const l = (h) => {
        const u = /* @__PURE__ */ new Map();
        for (const [d, f] of s.associations)
          (d instanceof ln || d instanceof xe) && u.set(d, f);
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
    Hn[r.path] === Hn.weights ? t.traverse(function(d) {
      d.morphTargetInfluences && c.push(d.name ? d.name : d.uuid);
    }) : c.push(a);
    let l;
    switch (Hn[r.path]) {
      case Hn.weights:
        l = rs;
        break;
      case Hn.rotation:
        l = os;
        break;
      case Hn.position:
      case Hn.scale:
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
    const h = s.interpolation !== void 0 ? ny[s.interpolation] : Vs, u = this._getArrayFromAccessor(n);
    for (let d = 0, f = c.length; d < f; d++) {
      const g = new l(
        c[d] + "." + Hn[r.path],
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
      const n = Ya(e.constructor), s = new Float32Array(e.length);
      for (let r = 0, o = e.length; r < o; r++)
        s[r] = e[r] * n;
      e = s;
    }
    return e;
  }
  _createCubicSplineTrackInterpolant(t) {
    t.createInterpolant = function(n) {
      const s = this instanceof os ? ey : qu;
      return new s(this.times, this.values, this.getValueSize() / 3, n);
    }, t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0;
  }
}
function hy(i, t, e) {
  const n = t.attributes, s = new hn();
  if (n.POSITION !== void 0) {
    const a = e.json.accessors[n.POSITION], c = a.min, l = a.max;
    if (c !== void 0 && l !== void 0) {
      if (s.set(
        new w(c[0], c[1], c[2]),
        new w(l[0], l[1], l[2])
      ), a.normalized) {
        const h = Ya(Yi[a.componentType]);
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
            const _ = Ya(Yi[d.componentType]);
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
  const o = new mn();
  s.getCenter(o.center), o.radius = s.min.distanceTo(s.max) / 2, i.boundingSphere = o;
}
function Ph(i, t, e) {
  const n = t.attributes, s = [];
  function r(o, a) {
    return e.getDependency("accessor", o).then(function(c) {
      i.setAttribute(a, c);
    });
  }
  for (const o in n) {
    const a = qa[o] || o.toLowerCase();
    a in i.attributes || s.push(r(n[o], a));
  }
  if (t.indices !== void 0 && !i.index) {
    const o = e.getDependency("accessor", t.indices).then(function(a) {
      i.setIndex(a);
    });
    s.push(o);
  }
  return Wt.workingColorSpace !== be && "COLOR_0" in n && console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Wt.workingColorSpace}" not supported.`), Rn(i, t), hy(i, t, e), Promise.all(s).then(function() {
    return t.targets !== void 0 ? sy(i, t.targets, e) : i;
  });
}
const Bi = 10251071, uy = 7306636, Vn = 12106948, rn = 15921906, ci = 2830134, dy = 8962256;
function Nt(i, t = {}) {
  return new hs({
    color: i,
    roughness: 0.8,
    metalness: 0.05,
    ...t
  });
}
function Ut(i, t, e, n, s = 0, r = 0, o = 0) {
  const a = new ge(new Jn(i, t, e), n);
  return a.position.set(s, r, o), a.castShadow = !0, a.receiveShadow = !0, a;
}
function An(i, t, e, n, s = 0, r = 0, o = 0, a = 16) {
  const c = new ge(new Sc(i, t, e, a), n);
  return c.position.set(s, r, o), c.castShadow = !0, c.receiveShadow = !0, c;
}
function fe(i, t) {
  return i.material.color.copy(t), i;
}
const ja = {
  sofa: (i) => {
    const t = new ie(), e = Nt(uy);
    return t.add(fe(Ut(1.9, 0.4, 0.85, e, 0, 0.2, 0), i)), t.add(fe(Ut(1.9, 0.5, 0.2, e, 0, 0.55, -0.32), i)), t.add(fe(Ut(0.2, 0.45, 0.85, e, -0.85, 0.5, 0), i)), t.add(fe(Ut(0.2, 0.45, 0.85, e, 0.85, 0.5, 0), i)), t;
  },
  bed: (i) => {
    const t = new ie();
    return t.add(Ut(1.6, 0.3, 2, Nt(Bi), 0, 0.15, 0)), t.add(fe(Ut(1.55, 0.18, 1.95, Nt(rn), 0, 0.39, 0), i)), t.add(Ut(1.6, 0.6, 0.1, Nt(Bi), 0, 0.5, -0.95)), t.add(Ut(0.5, 0.12, 0.35, Nt(rn), -0.45, 0.5, -0.7)), t.add(Ut(0.5, 0.12, 0.35, Nt(rn), 0.45, 0.5, -0.7)), t;
  },
  table: (i) => {
    const t = new ie(), e = Nt(Bi);
    t.add(fe(Ut(1.4, 0.06, 0.8, e, 0, 0.74, 0), i));
    const n = 0.62, s = 0.32;
    for (const [r, o] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(Ut(0.07, 0.74, 0.07, e, r * n, 0.37, o * s));
    return t;
  },
  chair: (i) => {
    const t = new ie(), e = Nt(Bi);
    t.add(fe(Ut(0.45, 0.05, 0.45, e, 0, 0.45, 0), i)), t.add(fe(Ut(0.45, 0.45, 0.05, e, 0, 0.68, -0.2), i));
    const n = 0.18, s = 0.18;
    for (const [r, o] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      t.add(Ut(0.05, 0.45, 0.05, e, r * n, 0.22, o * s));
    return t;
  },
  wardrobe: (i) => {
    const t = new ie();
    return t.add(fe(Ut(1.2, 2, 0.6, Nt(Bi), 0, 1, 0), i)), t.add(Ut(0.04, 1.8, 0.02, Nt(Vn), -0.02, 1, 0.31)), t.add(An(0.02, 0.02, 0.15, Nt(Vn), -0.2, 1, 0.32)), t.add(An(0.02, 0.02, 0.15, Nt(Vn), 0.16, 1, 0.32)), t;
  },
  kitchen_counter: (i) => {
    const t = new ie();
    return t.add(fe(Ut(2, 0.85, 0.6, Nt(rn), 0, 0.425, 0), i)), t.add(Ut(2.05, 0.05, 0.65, Nt(ci), 0, 0.875, 0)), t;
  },
  tv: (i) => {
    const t = new ie();
    t.add(Ut(1.2, 0.7, 0.05, Nt(ci), 0, 0.95, 0));
    const e = Ut(1.1, 0.6, 0.02, Nt(657930, { emissive: 1119255 }), 0, 0.95, 0.03);
    return t.add(e), t.add(Ut(0.4, 0.05, 0.2, Nt(ci), 0, 0.6, 0)), fe(t.children[0], i), t;
  },
  fridge: (i) => {
    const t = new ie();
    return t.add(fe(Ut(0.7, 1.8, 0.7, Nt(Vn), 0, 0.9, 0), i)), t.add(Ut(0.04, 0.1, 0.02, Nt(ci), 0.3, 1.3, 0.36)), t.add(Ut(0.04, 0.1, 0.02, Nt(ci), 0.3, 0.6, 0.36)), t;
  },
  sink: (i) => {
    const t = new ie();
    return t.add(fe(Ut(0.6, 0.8, 0.5, Nt(rn), 0, 0.4, 0), i)), t.add(Ut(0.5, 0.08, 0.4, Nt(Vn), 0, 0.82, 0)), t.add(An(0.02, 0.02, 0.25, Nt(Vn), 0, 0.95, -0.12)), t;
  },
  toilet: (i) => {
    const t = new ie();
    return t.add(fe(An(0.22, 0.25, 0.4, Nt(rn), 0, 0.2, 0.05), i)), t.add(Ut(0.35, 0.5, 0.18, Nt(rn), 0, 0.45, -0.18)), t.add(An(0.24, 0.24, 0.05, Nt(rn), 0, 0.42, 0.05)), t;
  },
  door: (i) => {
    const t = new ie();
    return t.add(fe(Ut(0.85, 2, 0.05, Nt(Bi), 0, 1, 0), i)), t.add(An(0.03, 0.03, 0.1, Nt(Vn), 0.32, 1, 0.05)), t;
  },
  window_frame: (i) => {
    const t = new ie(), e = Nt(rn);
    return t.add(fe(Ut(1, 0.05, 0.08, e, 0, 1.5, 0), i)), t.add(fe(Ut(1, 0.05, 0.08, e, 0, 0.9, 0), i)), t.add(Ut(0.05, 0.6, 0.08, e, -0.47, 1.2, 0)), t.add(Ut(0.05, 0.6, 0.08, e, 0.47, 1.2, 0)), t.add(Ut(0.9, 0.55, 0.01, Nt(dy, { transparent: !0, opacity: 0.35 }), 0, 1.2, 0)), t;
  },
  ceiling_light: (i) => {
    const t = new ie(), e = An(0.18, 0.22, 0.12, Nt(rn, { emissive: 0 }), 0, 0, 0);
    return e.name = "emissive", t.add(fe(e, i)), t.add(An(0.01, 0.01, 0.25, Nt(Vn), 0, 0.18, 0)), t;
  },
  ac_unit: (i) => {
    const t = new ie();
    return t.add(fe(Ut(0.9, 0.28, 0.18, Nt(rn), 0, 0, 0), i)), t.add(Ut(0.8, 0.04, 0.02, Nt(ci), 0, -0.1, 0.09)), t;
  },
  intercom: (i) => {
    const t = new ie();
    t.add(fe(Ut(0.16, 0.26, 0.04, Nt(ci), 0, 0, 0), i));
    const e = Ut(0.12, 0.14, 0.01, Nt(1053720, { emissive: 666170 }), 0, 0.03, 0.025);
    return e.name = "emissive", t.add(e), t;
  },
  // Generic fallback marker so an unknown model key still renders something.
  marker: (i) => {
    const t = new ie();
    return t.add(fe(An(0, 0.12, 0.3, Nt(16733525), 0, 0.15, 0, 8), i)), t;
  }
};
Object.keys(ja).filter((i) => i !== "marker");
function Lh(i, t) {
  const e = ja[i] ?? ja.marker, n = new Mt(t ?? "#ffffff"), s = e(n);
  return s.userData.model = i, s;
}
const fy = new Px(), Ih = /* @__PURE__ */ new Map();
function py(i) {
  let t = Ih.get(i);
  return t || (t = new Promise((e, n) => {
    fy.load(
      i,
      (s) => {
        s.scene.traverse((r) => {
          r.castShadow = !0, r.receiveShadow = !0;
        }), e(s.scene);
      },
      void 0,
      (s) => n(s)
    );
  }), Ih.set(i, t)), t;
}
function Dh(i, t) {
  i.position.set(t.position[0], t.position[1], t.position[2]), t.rotation && (i.rotation.y = $i.degToRad(t.rotation));
  const e = t.scale ?? 1;
  Array.isArray(e) ? i.scale.set(e[0], e[1], e[2]) : i.scale.setScalar(e);
}
function my(i, t) {
  if (!t) return;
  const e = new Mt(t);
  i.traverse((n) => {
    const s = n;
    if (s.isMesh && s.material) {
      const r = s.material.clone();
      r.color && r.color.multiply(e), s.material = r;
    }
  });
}
function gy(i) {
  if (i.glb) {
    const e = new ie();
    Dh(e, i), e.userData.furnitureId = i.id;
    const n = Lh("marker", i.color);
    return e.add(n), py(i.glb).then((s) => {
      const r = s.clone(!0);
      my(r, i.color), e.remove(n), e.add(r);
    }).catch((s) => {
      console.error(`[3d-floorplan] failed to load GLB "${i.glb}":`, s);
    }), e;
  }
  const t = Lh(i.model, i.color);
  return Dh(t, i), t.userData.furnitureId = i.id, t;
}
class Yu {
  constructor(t = 1) {
    this.current = "", this.canvas = document.createElement("canvas"), this.canvas.width = 256, this.canvas.height = 128, this.ctx = this.canvas.getContext("2d"), this.texture = new sv(this.canvas), this.texture.anisotropy = 4;
    const e = new Au({
      map: this.texture,
      transparent: !0,
      depthWrite: !1,
      depthTest: !1
    });
    this.sprite = new K0(e), this.sprite.scale.set(1 * t, 0.5 * t, 1), this.sprite.renderOrder = 999;
  }
  setText(t, e = "#ffffff") {
    if (t === this.current) return;
    this.current = t;
    const n = this.ctx;
    n.clearRect(0, 0, this.canvas.width, this.canvas.height), n.fillStyle = "rgba(20,22,26,0.78)", _y(n, 8, 28, 240, 72, 16), n.fill(), n.fillStyle = e, n.font = "bold 48px system-ui, sans-serif", n.textAlign = "center", n.textBaseline = "middle", n.fillText(t, 128, 64, 224), this.texture.needsUpdate = !0;
  }
  setPosition(t, e, n) {
    this.sprite.position.set(t, e, n);
  }
  dispose() {
    this.texture.dispose(), this.sprite.material.dispose();
  }
}
function _y(i, t, e, n, s, r) {
  i.beginPath(), i.moveTo(t + r, e), i.arcTo(t + n, e, t + n, e + s, r), i.arcTo(t + n, e + s, t, e + s, r), i.arcTo(t, e + s, t, e, r), i.arcTo(t, e, t + n, e, r), i.closePath();
}
const vy = 2.6, xy = 0.12;
function yy(i) {
  return new hs({
    color: i ?? "#e6e6e6",
    roughness: 0.95,
    metalness: 0
  });
}
function Ur(i, t, e, n, s, r, o, a, c, l) {
  const h = r - s;
  if (h <= 1e-4) return;
  const u = a - o;
  if (u <= 1e-4) return;
  const d = new Jn(h, u, c), f = new ge(d, l);
  f.castShadow = !0, f.receiveShadow = !0;
  const g = s + h / 2, _ = t.x + e.x * g, p = t.y + e.y * g;
  f.position.set(_, o + u / 2, p), f.rotation.y = n, i.add(f);
}
function My(i, t, e) {
  const n = new et(t.start[0], t.start[1]), r = new et(t.end[0], t.end[1]).clone().sub(n), o = r.length();
  if (o <= 1e-4) return;
  const a = r.clone().normalize(), l = -Math.atan2(a.y, a.x), h = t.height ?? e, u = t.thickness ?? xy, d = yy(t.color), f = [...t.openings ?? []].sort((_, p) => _.position - p.position);
  let g = 0;
  for (const _ of f) {
    const p = Nh(_.position, 0, o), m = Nh(_.position + _.width, 0, o);
    Ur(i, n, a, l, g, p, 0, h, u, d);
    const b = _.sill ?? (_.kind === "window" ? 0.9 : 0), y = _.top ?? (_.kind === "window" ? 2.1 : 2.05);
    b > 0 && Ur(i, n, a, l, p, m, 0, b, u, d), y < h && Ur(i, n, a, l, p, m, y, h, u, d), g = Math.max(g, m);
  }
  Ur(i, n, a, l, g, o, 0, h, u, d);
}
function Sy(i, t) {
  if (!t.polygon || t.polygon.length < 3) return null;
  const e = new Ou();
  t.polygon.forEach((a, c) => {
    c === 0 ? e.moveTo(a[0], a[1]) : e.lineTo(a[0], a[1]);
  }), e.closePath();
  const n = new Ec(e);
  n.rotateX(Math.PI / 2);
  const s = new ge(
    n,
    new hs({
      color: t.color ?? "#cfc7ba",
      roughness: 1,
      metalness: 0,
      side: on
    })
  );
  s.position.y = 5e-3, s.receiveShadow = !0, i.add(s);
  let r = 0, o = 0;
  for (const a of t.polygon)
    r += a[0], o += a[1];
  return new et(r / t.polygon.length, o / t.polygon.length);
}
function Ey(i, t) {
  const e = new ie();
  e.position.y = i.elevation ?? 0;
  const n = i.wallHeight ?? t ?? vy, s = [];
  for (const a of i.rooms ?? []) {
    const c = Sy(e, a);
    if (c && a.name) {
      const l = new Yu(1.4);
      l.setText(a.name, "#e8e8e8"), l.setPosition(c.x, 0.05, c.y), s.push(l), e.add(l.sprite);
    }
  }
  for (const a of i.walls ?? [])
    My(e, a, n);
  const r = /* @__PURE__ */ new Map();
  for (const a of i.furniture ?? []) {
    const c = gy(a);
    e.add(c), a.id && r.set(a.id, c);
  }
  const o = new hn().setFromObject(e);
  return { group: e, furnitureById: r, bbox: o, labels: s };
}
function Nh(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
const by = /* @__PURE__ */ new Set(["light", "switch", "fan", "cover", "media_player"]);
function ju(i) {
  return i.split(".")[0];
}
function Ty(i) {
  return i.behavior && i.behavior !== "auto" ? i.behavior : ju(i.entity_id);
}
function Ay(i) {
  const t = [];
  i.traverse((n) => {
    const s = n;
    s.isMesh && (s.name === "emissive" ? t.unshift(s) : t.push(s));
  });
  const e = t.filter((n) => n.name === "emissive");
  return e.length ? e : t;
}
class wy {
  constructor(t) {
    this.bindings = [], this.byEntity = /* @__PURE__ */ new Map(), this.root = t;
  }
  /** Register all bindings for a freshly built floor. */
  register(t, e) {
    for (const n of e) {
      const s = Ty(n);
      let r = null;
      const o = new w();
      n.anchor_object && t.furnitureById.has(n.anchor_object) ? (r = t.furnitureById.get(n.anchor_object), r.getWorldPosition(o)) : n.anchor ? (o.set(n.anchor[0], n.anchor[1], n.anchor[2]), o.y += t.group.position.y) : (t.bbox.getCenter(o), o.y = t.group.position.y + 1.5);
      const a = {
        def: n,
        behavior: s,
        anchor: r,
        worldPos: o,
        emissiveMeshes: r ? Ay(r) : []
      };
      this.setupVisual(a, t), this.bindings.push(a), this.byEntity.has(n.entity_id) || this.byEntity.set(n.entity_id, []), this.byEntity.get(n.entity_id).push(a), r && (r.userData.bindingEntity = n.entity_id);
    }
  }
  setupVisual(t, e) {
    const { behavior: n, worldPos: s } = t;
    if (n === "light") {
      const r = new Gu(16773584, 0, 8, 2);
      r.position.copy(s), r.castShadow = !1, this.root.add(r), t.pointLight = r;
    }
    if (n === "climate" || n === "sensor" || n === "binary_sensor" || n === "lock" || n === "media_player" || n === "label") {
      const r = new Yu(1.2), o = t.anchor ? 0.6 : 0;
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
        t.label?.setText(`${Uh(s)}: ${n}${r}`, "#ffe7a0");
        break;
      }
      case "binary_sensor": {
        const r = n === "on";
        t.label?.setText(
          `${Uh(s)}: ${r ? "ON" : "off"}`,
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
function Ry(i, t) {
  const e = ju(i), n = { entity_id: i };
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
      return by.has(e) ? { domain: e, service: "toggle", data: n } : null;
  }
}
function Uh(i) {
  return i.length > 18 ? i.slice(0, 16) + "…" : i;
}
class Cy {
  constructor(t, e = "#1b1d22") {
    this.clock = new ix(), this.running = !1, this.rafId = 0, this.floors = [], this.floorGroups = [], this.bindingManagers = [], this.activeFloor = 0, this.fullBBox = new hn(), this.raycaster = new fx(), this.pointer = new et(), this.downPos = { x: 0, y: 0 }, this.downTime = 0, this.previewGroup = new ie(), this.editing = !1, this.groundPlane = new Cn(new w(0, 1, 0), 0), this.container = t, this.renderer = new Y0({ antialias: !0, alpha: !1 }), this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)), this.renderer.shadowMap.enabled = !0, this.renderer.shadowMap.type = Yh, this.renderer.domElement.style.touchAction = "none", this.renderer.domElement.style.display = "block", this.renderer.domElement.style.width = "100%", this.renderer.domElement.style.height = "100%", t.appendChild(this.renderer.domElement), this.scene = new j0(), this.scene.background = new Mt(e), this.scene.add(this.previewGroup), this.camera = new Le(55, 1, 0.1, 1e3), this.camera.position.set(8, 8, 8), this.controls = new _x(this.camera, this.renderer.domElement), this.controls.enableDamping = !0, this.controls.dampingFactor = 0.12, this.controls.screenSpacePanning = !1, this.controls.minDistance = 2, this.controls.maxDistance = 40, this.controls.maxPolarAngle = Math.PI * 0.49, this.controls.touches = {
      ONE: Xn.ROTATE,
      TWO: Xn.DOLLY_PAN
    }, this.controls.addEventListener("change", () => this.clampTarget()), this.setupLights(), this.setupResize(), this.setupPointer();
  }
  setupLights() {
    const t = new ex(16777215, 0.55);
    this.scene.add(t);
    const e = new Wu(16777215, 0.9);
    e.position.set(10, 18, 8), e.castShadow = !0, e.shadow.mapSize.set(1024, 1024), e.shadow.camera.near = 1, e.shadow.camera.far = 60;
    const n = 20;
    e.shadow.camera.left = -n, e.shadow.camera.right = n, e.shadow.camera.top = n, e.shadow.camera.bottom = -n, this.scene.add(e);
    const s = new Kv(16777215, 4473941, 0.4);
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
      const c = Ey(a, t.wallHeight), l = new wy(c.group);
      l.register(c, a.bindings ?? []), this.scene.add(c.group), this.floors.push(c), this.floorGroups.push(c.group), this.bindingManagers.push(l), this.fullBBox.union(c.bbox);
    });
    const o = e ? Math.min(r, this.floors.length - 1) : 0;
    this.activeFloor = Math.max(0, o), this.floorGroups.forEach((a, c) => a.visible = c === this.activeFloor), e ? (this.controls.target.copy(n), this.camera.position.copy(s), this.controls.update()) : this.resetView();
  }
  clearPlan() {
    for (const t of this.bindingManagers) t.dispose();
    for (const t of this.floorGroups)
      this.scene.remove(t), Py(t);
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
    const t = this.floors[this.activeFloor]?.bbox ?? this.fullBBox;
    if (t.isEmpty()) return;
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
    n.x = $i.clamp(n.x, t.min.x - e, t.max.x + e), n.z = $i.clamp(n.z, t.min.z - e, t.max.z + e), n.y = $i.clamp(n.y, t.min.y, t.max.y + 1);
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
    this.editing = t, this.groundPlane.constant = -e, t ? (this.gridHelper || (this.gridHelper = new px(40, 80, 4891647, 2765632), this.gridHelper.material.transparent = !0, this.gridHelper.material.opacity = 0.5, this.scene.add(this.gridHelper)), this.gridHelper.position.y = e + 2e-3, this.gridHelper.visible = !0) : (this.gridHelper && (this.gridHelper.visible = !1), this.clearPreview());
  }
  setGroundHandler(t) {
    this.onGround = t;
  }
  /** Enable/disable camera orbit + pan (zoom stays on so you never get stuck). */
  setControlsEnabled(t) {
    this.controls.enableRotate = t, this.controls.enablePan = t;
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
function Py(i) {
  i.traverse((t) => {
    const e = t;
    e.geometry && e.geometry.dispose(), e.material && (Array.isArray(e.material) ? e.material : [e.material]).forEach((s) => s.dispose());
  });
}
const Ly = "0.3.0", Pc = "ha-3d-floorplan-sidebar-item", Oh = "ha-3d-floorplan-overlay";
function Iy() {
  return window.ha3dFloorplan ?? {};
}
function Dy(i) {
  return new Promise((t) => setTimeout(t, i));
}
async function Ny() {
  for (let i = 0; i < 40; i++) {
    const n = document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-sidebar");
    if (n && n.shadowRoot) return n;
    await Dy(500);
  }
  return null;
}
function Uy(i) {
  const t = i.shadowRoot;
  return t.querySelector("ha-md-list") || t.querySelector("paper-listbox") || t.querySelector("ul.ha-scrollbar") || t.querySelector("ul") || t.querySelector(".menu");
}
function Oy(i) {
  const t = document.createElement("a");
  t.id = Pc, t.href = "#", t.setAttribute("role", "menuitem"), t.style.cssText = [
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
  const e = document.createElement("ha-icon");
  e.setAttribute("icon", i.icon ?? "mdi:floor-plan"), e.style.cssText = "width:24px;height:24px;flex:0 0 24px;";
  const n = document.createElement("span");
  return n.textContent = i.title ?? "3D Floor Plan", n.style.cssText = "white-space:nowrap;overflow:hidden;text-overflow:ellipsis;", t.appendChild(e), t.appendChild(n), t.addEventListener("mouseenter", () => t.style.background = "var(--sidebar-selected-icon-color, rgba(255,255,255,0.06))"), t.addEventListener("mouseleave", () => t.style.background = "transparent"), t.addEventListener("click", (s) => {
    s.preventDefault(), ky(i);
  }), t;
}
function Fh(i, t) {
  const e = i.shadowRoot;
  if (e.getElementById(Pc)) return;
  const n = Uy(i), s = Oy(t);
  n && n.parentNode ? n.parentNode.insertBefore(s, n.nextSibling) : e.appendChild(s);
}
function Fy(i) {
  if (i.config) return { type: "custom:ha-3d-floorplan-card", height: "100vh", ...i.config };
  const t = { type: "custom:ha-3d-floorplan-card", height: "100vh" };
  return i.url && (t.url = i.url), t;
}
function By() {
  const e = document.querySelector("home-assistant")?.shadowRoot?.querySelector("home-assistant-main")?.shadowRoot?.querySelector("ha-sidebar");
  if (!e) return 0;
  const n = e.getBoundingClientRect();
  return n.width === 0 || n.right <= 0 ? 0 : Math.max(0, Math.round(n.right));
}
function ky(i) {
  if (document.getElementById(Oh)) return;
  const t = document.createElement("div");
  t.id = Oh, t.style.cssText = [
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
    t.style.left = `${By()}px`;
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
    c.setConfig(Fy(i));
  } catch (f) {
    console.error("[3d-floorplan] sidebar config error:", f);
  }
  const l = document.querySelector("home-assistant");
  l?.hass && (c.hass = l.hass);
  const h = window.setInterval(() => {
    l?.hass && (c.hass = l.hass);
  }, 1e3), u = () => {
    window.clearInterval(h), window.clearInterval(o), window.removeEventListener("resize", e), n?.disconnect(), t.remove(), document.removeEventListener("keydown", d);
  }, d = (f) => {
    f.key === "Escape" && u();
  };
  a.addEventListener("click", u), document.addEventListener("keydown", d), t.appendChild(a), t.appendChild(c), document.body.appendChild(t);
}
async function zy() {
  const i = Iy();
  if (i.sidebar === !1) return;
  const t = await Ny();
  if (!t) {
    console.info(
      "[3d-floorplan] sidebar not found — auto-injection skipped. Use panel_custom (see README) for a guaranteed sidebar entry."
    );
    return;
  }
  Fh(t, i);
  const e = t.shadowRoot;
  new MutationObserver(() => {
    e.getElementById(Pc) || Fh(t, i);
  }).observe(e, { childList: !0, subtree: !0 });
}
const Hy = {
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
}, Bh = 0.1, kh = 0.4, Or = (i) => Math.round(i / Bh) * Bh;
class Vy {
  constructor(t, e) {
    this.floorIndex = 0, this.tool = "wall", this.points = [], this.cursor = null, this.sm = t, this.plan = e;
  }
  get pointCount() {
    return this.points.length;
  }
  start() {
    this.applySceneEditState(), this.setTool("wall");
  }
  stop() {
    this.cancelChain(), this.sm.setGroundHandler(void 0), this.sm.setEditMode(!1), this.sm.setControlsEnabled(!0);
  }
  setTool(t) {
    this.tool = t, this.sm.setControlsEnabled(t === "orbit"), t !== "wall" && this.cancelChain(), this.onChange?.();
  }
  elevation() {
    return this.plan.floors[this.floorIndex]?.elevation ?? 0;
  }
  wallHeight() {
    return this.plan.floors[this.floorIndex]?.wallHeight ?? this.plan.wallHeight ?? 2.6;
  }
  applySceneEditState() {
    this.sm.setEditMode(!0, this.elevation()), this.sm.setGroundHandler({
      click: (t) => this.onClick(t),
      move: (t) => this.onMove(t)
    }), this.sm.setControlsEnabled(this.tool === "orbit");
  }
  onClick(t) {
    if (this.tool !== "wall") return;
    const e = [Or(t.x), Or(t.z)];
    if (this.points.length >= 2) {
      const s = this.points[0];
      if (Math.hypot(e[0] - s[0], e[1] - s[1]) < kh) {
        this.commit(!0);
        return;
      }
    }
    const n = this.points[this.points.length - 1];
    n && n[0] === e[0] && n[1] === e[1] || (this.points.push(e), this.renderPreview(), this.onChange?.());
  }
  onMove(t) {
    this.tool !== "wall" || this.points.length === 0 || (this.cursor = [Or(t.x), Or(t.z)], this.renderPreview());
  }
  undoPoint() {
    this.points.length && (this.points.pop(), this.renderPreview(), this.onChange?.());
  }
  finishChain() {
    this.commit(!1);
  }
  cancelChain() {
    this.points = [], this.cursor = null, this.sm.clearPreview(), this.onChange?.();
  }
  /** Start a fresh blank plan to draw from scratch. */
  loadPlan(t) {
    this.plan = t, this.floorIndex = 0, this.cancelChain(), this.sm.loadPlan(t, !0), this.applySceneEditState(), this.onChange?.();
  }
  commit(t) {
    if (this.points.length < 2) {
      this.cancelChain();
      return;
    }
    const e = this.plan.floors[this.floorIndex];
    e.walls || (e.walls = []);
    const n = this.points, s = t ? n.length : n.length - 1;
    for (let r = 0; r < s; r++) {
      const o = n[r], a = n[(r + 1) % n.length];
      e.walls.push({ start: o, end: a });
    }
    t && (e.rooms || (e.rooms = []), e.rooms.push({ polygon: n.slice() })), this.cancelChain(), this.rebuild(), this.onChange?.();
  }
  rebuild() {
    this.sm.loadPlan(this.plan, !0), this.applySceneEditState();
  }
  renderPreview() {
    this.sm.clearPreview();
    const t = this.sm.previewGroup, e = this.elevation(), n = this.wallHeight(), s = this.cursor ? [...this.points, this.cursor] : [...this.points];
    for (const r of this.points) {
      const o = new ge(
        new bc(0.07, 10, 10),
        new dn({ color: 4500223 })
      );
      o.position.set(r[0], e + 0.06, r[1]), t.add(o);
    }
    for (let r = 0; r < s.length - 1; r++) {
      const o = s[r], a = s[r + 1], c = Math.hypot(a[0] - o[0], a[1] - o[1]);
      if (c < 1e-3) continue;
      const l = new ge(
        new Jn(c, n, 0.1),
        new dn({ color: 4500223, transparent: !0, opacity: 0.35 })
      ), h = Math.atan2(a[1] - o[1], a[0] - o[0]);
      l.position.set((o[0] + a[0]) / 2, e + n / 2, (o[1] + a[1]) / 2), l.rotation.y = -h, t.add(l);
    }
    if (this.points.length >= 2 && this.cursor) {
      const r = this.points[0];
      if (Math.hypot(this.cursor[0] - r[0], this.cursor[1] - r[1]) < kh) {
        const o = new ge(
          new Tc(0.22, 0.04, 8, 24),
          new dn({ color: 5230698 })
        );
        o.rotation.x = Math.PI / 2, o.position.set(r[0], e + 0.06, r[1]), t.add(o);
      }
    }
  }
}
const Ku = "ha3d_floorplans", Zu = "ha3d-floorplan-default";
function Ju(i) {
  return !!i && Array.isArray(i.floors) && i.floors.length > 0;
}
async function Qu(i) {
  try {
    const e = (await i.callWS?.({ type: "frontend/get_user_data", key: Ku }))?.value;
    if (e && e.projects) return e;
  } catch {
  }
  return null;
}
async function Gy(i) {
  if (i) {
    const t = await Qu(i);
    if (t) {
      const e = t.active && t.projects[t.active] ? t.active : Object.keys(t.projects)[0], n = e ? t.projects[e] : null;
      if (Ju(n)) return n;
    }
  }
  return Xy();
}
async function Wy(i, t, e = "default") {
  if ($y(i), !t) return { ha: !1 };
  try {
    const n = await Qu(t) ?? { projects: {} };
    return n.projects[e] = i, n.active = e, await t.callWS?.({
      type: "frontend/set_user_data",
      key: Ku,
      value: n
    }), { ha: !0 };
  } catch (n) {
    return console.error("[3d-floorplan] HA save failed, kept localStorage copy:", n), { ha: !1 };
  }
}
function Xy() {
  try {
    const i = localStorage.getItem(Zu);
    if (!i) return null;
    const t = JSON.parse(i);
    return Ju(t) ? t : null;
  } catch {
    return null;
  }
}
function $y(i) {
  try {
    localStorage.setItem(Zu, JSON.stringify(i));
  } catch {
  }
}
function qy() {
  return {
    name: "New Plan",
    wallHeight: 2.6,
    floors: [{ name: "Ground Floor", elevation: 0, wallHeight: 2.6, walls: [], rooms: [], furniture: [], bindings: [] }]
  };
}
var Yy = Object.defineProperty, jy = Object.getOwnPropertyDescriptor, Qe = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? jy(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && Yy(t, e, s), s;
};
let Be = class extends Vi {
  constructor() {
    super(...arguments), this.floorNames = [], this.activeFloorIndex = 0, this.editing = !1, this.editTool = "wall", this.editPoints = 0, this.planLoaded = !1;
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
    return await Promise.resolve().then(() => Jy), document.createElement("ha-3d-floorplan-card-editor");
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
        for (const t in i.states)
          i.states[t] !== this.lastHass.states[t] && this.sceneManager.updateEntity(t, i);
      this.lastHass = i;
    }
  }
  // -- Scene setup ------------------------------------------------------------
  initScene() {
    if (!this.viewport) return;
    const i = this.config?.background ?? "#1b1d22";
    this.sceneManager = new Cy(this.viewport, i), this.sceneManager.setPickHandler((t) => this.handlePick(t)), this.sceneManager.start(), this.loadActiveProject();
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
    return i.plan ? i.plan : i.url ? this.fetchPlan(i.url) : await Gy(this.hass) ?? Hy;
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
    const e = Ry(i.entity_id, i.behavior);
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
    this.editor = new Vy(this.sceneManager, i), this.editor.onChange = () => {
      this.editTool = this.editor.tool, this.editPoints = this.editor.pointCount, this.requestUpdate();
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
    this.editor && (this.editor.loadPlan(qy()), this.showToast("Blank plan — draw your walls"));
  }
  async onSavePlan() {
    if (!this.editor) return;
    const i = this.editor.plan, t = await Wy(i, this.hass);
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
  // -- Render -----------------------------------------------------------------
  render() {
    if (!this.config) return se;
    const i = this.config.height ?? "500px", t = this.config.projects ?? [];
    return qe`
      <ha-card>
        <div class="viewport" style="height:${i}"></div>

        ${this.loadError ? qe`<div class="error">⚠ ${this.loadError}</div>` : se}

        <div class="overlay top-right">
          <button class="btn" title="Reset view" @click=${this.onResetView}>
            ⌂ Reset
          </button>
          ${this.editing ? qe`<button class="btn primary" title="Exit editor" @click=${this.exitEdit}>
                ✓ Done
              </button>` : qe`<button class="btn" title="Edit floor plan" @click=${this.enterEdit}>
                ✎ Edit
              </button>`}
        </div>

        ${this.editing ? qe`
              <div class="overlay top-left toolbar">
                <button class="btn ${this.editTool === "wall" ? "active" : ""}"
                  title="Draw walls" @click=${() => this.onEditTool("wall")}>▟ Draw wall</button>
                <button class="btn ${this.editTool === "orbit" ? "active" : ""}"
                  title="Move camera" @click=${() => this.onEditTool("orbit")}>✋ Move view</button>
                <button class="btn" ?disabled=${this.editPoints < 2}
                  title="Finish this run of walls" @click=${this.onFinishChain}>✓ Finish</button>
                <button class="btn" ?disabled=${this.editPoints < 1}
                  title="Undo last point" @click=${this.onUndoPoint}>⤺ Undo</button>
                <button class="btn" title="Start a blank plan" @click=${this.onNewPlan}>✚ New</button>
                <button class="btn primary" title="Save" @click=${this.onSavePlan}>💾 Save</button>
              </div>
            ` : se}

        ${this.toast ? qe`<div class="toast">${this.toast}</div>` : se}

        ${t.length > 1 ? qe`
              <div class="overlay top-left">
                <select class="select" @change=${this.onSelectProject}>
                  ${t.map(
      (e) => qe`<option value=${e.id} ?selected=${e.id === this.activeProjectId}>
                      ${e.name || e.id}
                    </option>`
    )}
                </select>
              </div>
            ` : se}

        ${this.floorNames.length > 1 && !this.editing ? qe`
              <div class="overlay bottom">
                ${this.floorNames.map(
      (e, n) => qe`
                    <button
                      class="tab ${n === this.activeFloorIndex ? "active" : ""}"
                      @click=${() => this.onSelectFloor(n)}
                    >
                      ${e}
                    </button>
                  `
    )}
              </div>
            ` : se}
      </ha-card>
    `;
  }
};
Be.styles = Hh`
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
      flex-wrap: wrap;
      max-width: calc(100% - 130px);
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
Qe([
  nc({ attribute: !1 })
], Be.prototype, "hass", 2);
Qe([
  Je()
], Be.prototype, "config", 2);
Qe([
  Je()
], Be.prototype, "activeProjectId", 2);
Qe([
  Je()
], Be.prototype, "loadError", 2);
Qe([
  Je()
], Be.prototype, "floorNames", 2);
Qe([
  Je()
], Be.prototype, "activeFloorIndex", 2);
Qe([
  Je()
], Be.prototype, "editing", 2);
Qe([
  Je()
], Be.prototype, "editTool", 2);
Qe([
  Je()
], Be.prototype, "editPoints", 2);
Qe([
  Je()
], Be.prototype, "toast", 2);
Qe([
  Cd(".viewport")
], Be.prototype, "viewport", 2);
Be = Qe([
  $h("ha-3d-floorplan-card")
], Be);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "ha-3d-floorplan-card",
  name: "3D Floor Plan Card",
  description: "Interactive true-3D floor plan with live entity bindings.",
  preview: !1,
  documentationURL: "https://github.com/your-org/ha-3d-floorplan-card"
});
console.info(
  `%c 3D-FLOORPLAN-CARD %c v${Ly} `,
  "color:#fff;background:#03a9f4;border-radius:4px 0 0 4px;padding:2px 6px",
  "color:#03a9f4;background:#222;border-radius:0 4px 4px 0;padding:2px 6px"
);
zy();
var Ky = Object.defineProperty, Zy = Object.getOwnPropertyDescriptor, Js = (i, t, e, n) => {
  for (var s = n > 1 ? void 0 : n ? Zy(t, e) : t, r = i.length - 1, o; r >= 0; r--)
    (o = i[r]) && (s = (n ? o(t, e, s) : o(s)) || s);
  return n && s && Ky(t, e, s), s;
};
let Zn = class extends Vi {
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
    return this._config ? qe`
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
        ${this._jsonError ? qe`<div class="err">⚠ ${this._jsonError}</div>` : se}

        <p class="hint">
          A full visual wall-drawing editor with a furniture palette and
          entity-binding dropdowns is planned (Phase 2). For now, author the
          plan JSON here or point to a file under <code>/config/www/</code>.
        </p>
      </div>
    ` : se;
  }
};
Zn.styles = Hh`
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
  nc({ attribute: !1 })
], Zn.prototype, "hass", 2);
Js([
  Je()
], Zn.prototype, "_config", 2);
Js([
  Je()
], Zn.prototype, "_planText", 2);
Js([
  Je()
], Zn.prototype, "_jsonError", 2);
Zn = Js([
  $h("ha-3d-floorplan-card-editor")
], Zn);
const Jy = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get Ha3dFloorplanCardEditor() {
    return Zn;
  }
}, Symbol.toStringTag, { value: "Module" }));
export {
  Be as Ha3dFloorplanCard
};
