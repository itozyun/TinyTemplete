var DEFINE_TYTE__DEBUG = !0, DEFINE_TYTE__EXPORT = !0, DEFINE_TYTE__DROP_INLINE_STYLE = !1, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT = !1, DEFINE_TYTE__USE_VML = !1, DEFINE_TYTE__USE_RENDER_SSR = !0, DEFINE_TYTE__USE_RENDER_DOM = !0, TYTE_NODE_TYPE = {ELEMENT_NODE:1, DOCUMENT_FRAGMENT_NODE:DEFINE_TYTE__DEBUG ? 11 : 2, TEXT_NODE:3, DYNAMIC_NODE:4};
(function(ka) {
  function e(C, x) {
  }
  var y, f, k, m;
  (function() {
    function C(a, b, c) {
      var d = [], g = -1, l;
      for (l in a) {
        var h = a[l];
        "function" === typeof h && (h = h.call(b, c, l));
        null != h && (d[++g] = l + ":" + h);
      }
      return d.join(";");
    }
    function x(a, b) {
      if (3 === b.nodeType && a.nodeType !== TYTE_NODE_TYPE.TEXT_NODE) {
        throw "nodeType missmatch!";
      }
      if (1 === b.nodeType) {
        if (a.nodeType !== TYTE_NODE_TYPE.ELEMENT_NODE) {
          throw "nodeType missmatch!";
        }
        if (a._tagName.toUpperCase() !== b.tagName.toUpperCase()) {
          throw "tagName missmatch!";
        }
        if (!a.getChildNodes()) {
          if (b.childNodes.length) {
            throw "childNodes.length missmatch!";
          }
        } else if (a.getChildNodes().length < b.childNodes.length) {
          throw "childNodes.length missmatch!";
        }
      }
    }
    function D(a, b, c, d) {
      b = b._childNodes;
      var g = 0, l;
      if (b) {
        if (DEFINE_TYTE__USE_RENDER_DOM && d) {
          var h = b.length;
          for (l = d.childNodes; g < h; ++g) {
            var p = b[g];
            var n = l[g];
            if (p.nodeType === TYTE_NODE_TYPE.TEXT_NODE && (!n || 3 !== n.nodeType)) {
              var q = document.createTextNode("");
              n ? d.insertBefore(q, n) : d.appendChild(q);
              n = q;
            }
            if (a(p, c, n)) {
              return !0;
            }
          }
        } else {
          for (h = b.length; g < h; ++g) {
            if (a(b[g], c)) {
              return !0;
            }
          }
        }
      }
    }
    function E(a, b, c) {
      DEFINE_TYTE__DEBUG && c && x(a, c);
      return !0 === (DEFINE_TYTE__USE_RENDER_DOM ? b(a, c) : b(a)) ? !0 : D(E, a, b, c);
    }
    function z(a, b, c) {
      DEFINE_TYTE__DEBUG && c && x(a, c);
      if (a.nodeType === TYTE_NODE_TYPE.TEXT_NODE) {
        if (!0 === (DEFINE_TYTE__USE_RENDER_DOM ? b(a, c) : b(a))) {
          return !0;
        }
      } else {
        return D(z, a, b, c);
      }
    }
    function u(a, b, c) {
      DEFINE_TYTE__DEBUG && c && x(a, c);
      return a.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && !0 === (DEFINE_TYTE__USE_RENDER_DOM ? b(a, c) : b(a)) ? !0 : D(u, a, b, c);
    }
    function A(a, b) {
      a && a.constructor === b || (a = new b());
      return a;
    }
    function v(a) {
      var b = a.parent;
      return b ? (b = b._childNodes, b.indexOf(a)) : -1;
    }
    function w(a, b) {
      for (var c = a.length, d, g; c;) {
        d = a[--c], "string" === typeof d || "number" === typeof d ? a[c] = new f(d) : DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || d.nodeType !== TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE || (d = d._childNodes) && d.length && (d.unshift(c, 1), a.splice.apply(a, d));
      }
      for (c = a.length; c;) {
        d = a[--c], (g = d.parent) && g._childNodes.splice(v(d), 1), d.parent = b;
      }
      return a;
    }
    function t(a) {
      return Array.prototype.slice.call(a);
    }
    function I(a) {
      var b = null, c;
      if (a) {
        for (c in b = {}, a) {
          var d = a[c];
          b[c] = d && "object" === typeof d ? I(d) : d;
        }
      }
      return b;
    }
    function F(a) {
      return a.split("<").join("&lt;").split(">").join("&gt;");
    }
    function J(a, b) {
      DEFINE_TYTE__USE_RENDER_DOM ? u(this, a, b) : u(this, a);
      return this;
    }
    function K(a) {
      var b = null;
      u(this, function(c) {
        if (c.getAttr("id") === a) {
          return b = c, !0;
        }
      });
      return b;
    }
    function L(a) {
      var b = [], c = -1;
      u(this, function(d) {
        d._tagName === a && (b[++c] = d);
      });
      return b;
    }
    function M(a) {
      var b = [], c = -1;
      u(this, function(d) {
        d.hasClass(a) && (b[++c] = d);
      });
      return b;
    }
    function N(a) {
      var b = [], c = -1;
      u(this, function(d) {
        d.getAttr("name") === a && (b[++c] = d);
      });
      return b;
    }
    function O() {
      var a = this._childNodes;
      return a && a[0] || null;
    }
    function P() {
      var a = this._childNodes;
      return a && a[a.length - 1] || null;
    }
    function Q() {
      return this._childNodes;
    }
    function R(a) {
      var b = this._childNodes = this._childNodes || [], c = w(t(arguments), this);
      b.push.apply(b, c);
      return this;
    }
    function S(a) {
      var b = this._childNodes = this._childNodes || [], c = w(t(arguments), this);
      c.unshift(0, 0);
      b.splice.apply(b, c);
      return this;
    }
    function T() {
      var a = this._childNodes, b = 0, c;
      if (a) {
        for (c = a.length; b < c; ++b) {
          var d = a[b];
          d.parent = null;
        }
        a.length = 0;
      }
      return this;
    }
    function U() {
      var a = "";
      z(this, function(b) {
        a += b.text;
      });
      return a;
    }
    function V(a) {
      var b = this._childNodes;
      b && 1 === b.length && b[0].nodeType === TYTE_NODE_TYPE.TEXT_NODE ? b[0].text = a : (b && this.empty(), this.appendNode(a));
      return this;
    }
    function Z(a) {
      function b(d, g) {
        var l = arguments, h = A(this, b);
        l = t(l);
        var p = l[0], n;
        if (p && "object" === typeof p && (!p || p.walkNodes !== f.prototype.walkNodes && p.getPrev !== f.prototype.getPrev)) {
          for (n in p) {
            h.setAttr(n, p[n]);
          }
          l.shift();
        }
        l.length && h.appendNode.apply(h, l);
        return h;
      }
      var c = new e();
      c._tagName = a;
      c.constructor = b;
      b.prototype = c;
      return b;
    }
    function aa(a) {
      function b() {
        var d = arguments, g = A(this, b);
        g.initialParams = t(d);
        return g;
      }
      var c = new m();
      c._renderer = a;
      c.constructor = b;
      b.prototype = c;
      return b;
    }
    function W(a) {
      var b = [], c = this._childNodes, d = 0, g;
      if (c) {
        for (g = c.length; d < g; ++d) {
          b[d] = c[d].renderSSR(a);
        }
      }
      return b.join("");
    }
    y = function(a) {
      if ("function" === typeof a) {
        return ba(a);
      }
      if ("string" === typeof a) {
        return ca(a);
      }
    };
    DEFINE_TYTE__EXPORT && (module.exports = y);
    var X = {className:"class", htmlFor:"for"};
    f = function(a) {
      var b = A(this, f);
      b.text = "" + a;
      return b;
    };
    y.Text = f;
    f.prototype.nodeType = TYTE_NODE_TYPE.TEXT_NODE;
    f.prototype.text = "";
    f.prototype.parent = null;
    f.prototype.walkNodes = function(a, b) {
      DEFINE_TYTE__USE_RENDER_DOM ? E(this, a, b) : E(this, a);
      return this;
    };
    f.prototype.walkTextNodes = function(a, b) {
      DEFINE_TYTE__USE_RENDER_DOM ? z(this, a, b) : z(this, a);
      return this;
    };
    f.prototype.getPrev = function() {
      var a = this.parent;
      return a && a._childNodes[v(this) - 1] || null;
    };
    f.prototype.setPrev = function(a) {
      var b = this.parent;
      if (b) {
        var c = w(t(arguments), b);
        c.unshift(v(this), 0);
        b = b._childNodes;
        b.splice.apply(b, c);
      }
      return this;
    };
    f.prototype.getNext = function() {
      var a = this.parent;
      return a && a._childNodes[v(this) + 1] || null;
    };
    f.prototype.setNext = function(a) {
      var b = this.parent;
      if (b) {
        var c = b._childNodes;
        var d = v(this) + 1;
        b = w(t(arguments), b);
        d < c.length ? (b.unshift(d, 0), c.splice.apply(c, b)) : c.push.apply(c, b);
      }
      return this;
    };
    f.prototype.swap = function(a) {
      var b = this.parent;
      if (b) {
        var c = w(t(arguments), b);
        c.unshift(v(this), 1);
        b = b._childNodes;
        b.splice.apply(b, c);
        this.parent = null;
      }
      return this;
    };
    f.prototype.remove = function() {
      var a = this.parent;
      a && (a._childNodes.splice(v(this), 1), this.parent = null);
      return this;
    };
    f.prototype.clone = function(a) {
      return new f(this.text);
    };
    DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (k = function(a) {
      var b = A(this, k);
      return b.appendNode.apply(b, t(arguments));
    }, y.DocumentFragment = k, k.prototype._childNodes = null, k.prototype.nodeType = TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE, k.prototype.parent = null, k.prototype.walkNodes = f.prototype.walkNodes, k.prototype.walkTextNodes = f.prototype.walkTextNodes, k.prototype.walkNodes = J, k.prototype.getElementByID = K, k.prototype.getElementListByTag = L, k.prototype.getElementListByClass = M, k.prototype.getElementListByName = N, k.prototype.getFirstChild = O, k.prototype.getLastChild = P, k.prototype.getChildNodes = 
    Q, k.prototype.appendNode = R, k.prototype.prependNode = S, k.prototype.empty = T, k.prototype.getTextContent = U, k.prototype.setTextContent = V, k.prototype.clone = function(a) {
      var b = new k();
      if (a) {
        a = this._childNodes;
        var c = 0, d;
        if (a) {
          for (d = a.length; c < d; ++c) {
            b.appendNode(a[c].clone(!0));
          }
        }
      }
      return b;
    });
    m = function(a) {
    };
    var ca = function(a) {
      return Y[a] = Y[a] || Z(a);
    };
    var Y = {};
    e.prototype._attrs = null;
    e.prototype._childNodes = null;
    e.prototype.nodeType = TYTE_NODE_TYPE.ELEMENT_NODE;
    e.prototype.parent = null;
    e.prototype.walkNodes = f.prototype.walkNodes;
    e.prototype.walkTextNodes = f.prototype.walkTextNodes;
    e.prototype.walkElements = J;
    e.prototype.getElementByID = K;
    e.prototype.getElementListByTag = L;
    e.prototype.getElementListByClass = M;
    e.prototype.getElementListByName = N;
    e.prototype.getFirstChild = O;
    e.prototype.getLastChild = P;
    e.prototype.getChildNodes = Q;
    e.prototype.appendNode = R;
    e.prototype.prependNode = S;
    e.prototype.empty = T;
    e.prototype.getPrev = f.prototype.getPrev;
    e.prototype.setPrev = f.prototype.setPrev;
    e.prototype.getNext = f.prototype.getNext;
    e.prototype.setNext = f.prototype.setNext;
    e.prototype.swap = f.prototype.swap;
    e.prototype.remove = f.prototype.remove;
    e.prototype.getTextContent = U;
    e.prototype.setTextContent = V;
    e.prototype.clone = function(a) {
      var b = this.constructor;
      b = this._attrs ? new b(I(this._attrs)) : new b();
      if (a) {
        a = this._childNodes;
        var c = 0, d;
        if (a) {
          for (d = a.length; c < d; ++c) {
            b.appendNode(a[c].clone(!0));
          }
        }
      }
      return b;
    };
    e.prototype.getAttr = function(a) {
      var b = this._attrs;
      a = b ? b[a] : null;
      return null != a ? a : null;
    };
    e.prototype.setAttr = function(a, b) {
      if (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== a || "string" !== typeof b) {
        var c = this._attrs = this._attrs || {};
        null != b ? c[a] = b : delete c[a];
      } else {
        this.setCSSText(b);
      }
      return this;
    };
    e.prototype.hasAttr = function(a) {
      var b = this._attrs;
      return b ? null != b[a] : !1;
    };
    e.prototype.removeAttr = function(a) {
      var b = this._attrs;
      b && delete b[a];
      return this;
    };
    e.prototype.hasClass = function(a) {
      return -1 !== (" " + this.getClass() + " ").indexOf(" " + a + " ");
    };
    e.prototype.getClass = function() {
      return this.getAttr("className") || "";
    };
    e.prototype.setClass = function(a) {
      return this.setAttr("className", a);
    };
    e.prototype.addClass = function(a) {
      if (a && !this.hasClass(a)) {
        var b = this.getClass();
        this.setClass(b ? b + " " + a : a);
      }
      return this;
    };
    e.prototype.removeClass = function(a) {
      if (a && this.hasClass(a)) {
        var b = this.getClass().split(" ");
        b.splice(b.indexOf(a), 1);
        this.setClass(b.join(" "));
      }
      return this;
    };
    e.prototype.toggleClass = function(a, b) {
      return !0 === b || (!1 === b ? 0 : !this.hasClass(a)) ? this.addClass(a) : this.removeClass(a);
    };
    DEFINE_TYTE__DROP_INLINE_STYLE || (e.prototype.getStyle = function(a) {
      var b = this._attrs && this._attrs.style;
      a = b ? b[a] : "";
      return null == a ? "" : a;
    }, e.prototype.setStyle = function(a, b) {
      var c = this._attrs, d = c && c.style;
      d || (d = {}, c = this._attrs = c || {}, c.style = d);
      d[a] = b;
      return this;
    }, e.prototype.removeStyle = function(a) {
      var b = this._attrs && this._attrs.style;
      b && delete b[a];
      return this;
    }, e.prototype.setCSSText = function(a) {
      if (a) {
        a = a.split(";");
        var b = 0, c;
        for (c = a.length; b < c; ++b) {
          var d = a[b];
          var g = d.split(":")[0].split(" ").join("");
          this.setStyle(g, d.substr(d.indexOf(":") + 1));
        }
      }
      return this;
    });
    var ba = function(a) {
      return aa(a);
    };
    m.prototype._renderer = null;
    m.prototype.initialParams = null;
    m.prototype.nodeType = TYTE_NODE_TYPE.DYNAMIC_NODE;
    m.prototype.parent = null;
    m.prototype.walkNodes = f.prototype.walkNodes;
    m.prototype.getPrev = f.prototype.getPrev;
    m.prototype.setPrev = f.prototype.setPrev;
    m.prototype.getNext = f.prototype.getNext;
    m.prototype.setNext = f.prototype.setNext;
    m.prototype.swap = f.prototype.swap;
    m.prototype.remove = f.prototype.remove;
    m.prototype.clone = function(a) {
      a = new this.constructor();
      a.initialParams = this.initialParams;
      return a;
    };
    var da = {checked:!0, compact:!0, declare:!0, defer:!0, disabled:!0, ismap:!0, multiple:!0, nohref:!0, noresize:!0, noshade:!0, nowrap:!0, readonly:!0, selected:!0}, ea = {link:!0, meta:!0, br:!0, hr:!0, img:!0, input:!0, area:!0, base:!0, col:!0, embed:!0, keygen:!0, param:!0, source:!0}, fa = {p:!0, dt:!0, dd:!0, li:!0, option:!0, thead:!0, tfoot:!0, th:!0, tr:!0, td:!0, rt:!0, rp:!0, optgroup:!0, caption:!0, colgroup:!0, col:!0}, ha = {a:!0, audio:!0, del:!0, ins:!0, map:!0, noscript:!0, video:!0}, 
    ia = DEFINE_TYTE__USE_VML ? {svg:!0, math:!0, "v:polyline":!0, "v:rect":!0, "v:line":!0} : {svg:!0, math:!0}, ja = {script:!0, style:!0, plaintext:!0, xmp:!0, noscript:!0}, B, G, H;
    DEFINE_TYTE__USE_RENDER_SSR && (f.prototype.renderSSR = function(a) {
      return B ? this.text : F(this.text);
    }, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (k.prototype.renderSSR = W), e.prototype.renderSSR = function(a) {
      var b = this._tagName, c = ["<", b], d = 1, g = this._attrs, l, h, p, n;
      if (g) {
        for (r in g) {
          var q = g[r];
          "function" === typeof q && (q = q.call(this, a, r));
          if (null != q) {
            var r = X[r] || r;
            da[r] ? !1 !== q && (c[++d] = " " + r) : (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== r || "object" !== typeof q || (q = C(q, this, a)), c[++d] = " " + r + '="' + F("" + q).split('"').join('\\"') + '"');
          }
        }
      }
      B ||= l = !!ja[b];
      G ||= h = !!ha[b];
      H ||= p = !!ia[b];
      this._childNodes && (n = W.call(this, a));
      n ? c[++d] = ">" + n : c[++d] = H ? "/>" : ">";
      l && (B = !1);
      h && (G = !1);
      p && (H = !1);
      if (!fa[b] || G) {
        if (n || !ea[b]) {
          c[++d] = "</" + b + ">";
        }
      }
      return c.join("");
    }, m.prototype.renderSSR = function(a) {
      var b = this._renderer(a);
      return "string" === typeof b ? B ? b : F(b) : "number" === typeof b ? "" + b : null != b ? b.renderSSR(a) : "";
    });
    DEFINE_TYTE__USE_RENDER_DOM && (f.prototype.renderDOM = function(a) {
      return document.createTextNode(this.text);
    }, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (k.prototype.renderDOM = function(a) {
      var b = document.createDocumentFragment(), c = this._childNodes, d = 0, g, l;
      if (c) {
        for (g = c.length; d < g; ++d) {
          (l = c[d].renderDOM(a)) && b.append(l);
        }
      }
      return b;
    }), e.prototype.renderDOM = function(a) {
      var b = document.createElement(this._tagName), c = this._attrs, d, g = this._childNodes, l = 0;
      for (d in c) {
        var h = c[d];
        "function" === typeof h && (h = h.call(this, a, d));
        null != h && (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== d ? b.setAttribute(X[d] || d, "" + h) : b.style.cssText = "object" === typeof h ? C(h, this, a) : h);
      }
      if (g) {
        for (c = g.length; l < c; ++l) {
          (d = g[l].renderDOM(a)) && b.appendChild(d);
        }
      }
      return b;
    }, m.prototype.renderDOM = function(a) {
      var b = this._renderer(a);
      if ("string" === typeof b || "number" === typeof b) {
        return document.createTextNode("" + b);
      }
      if (null != b) {
        return b.renderDOM(a);
      }
    });
  })();
})(void 0);

