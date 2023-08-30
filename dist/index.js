var DEFINE_TYTE__DEBUG = !0, DEFINE_TYTE__EXPORT = !0, DEFINE_TYTE__DROP_INLINE_STYLE = !1, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT = !1, DEFINE_TYTE__USE_VML = !1, DEFINE_TYTE__USE_RENDER_SSR = !0, DEFINE_TYTE__USE_RENDER_DOM = !0, TYTE_NODE_TYPE = {ELEMENT_NODE:1, DOCUMENT_FRAGMENT_NODE:DEFINE_TYTE__DEBUG ? 11 : 2, TEXT_NODE:3, DYNAMIC_NODE:4};
(function(ia) {
  function e(A, B) {
  }
  var x, f, h, m;
  (function() {
    function A(a, b, c) {
      var d = [], g = -1, l;
      for (l in a) {
        var k = a[l];
        "function" === typeof k && (k = k.call(b, c, l));
        null != k && (d[++g] = l + ":" + k);
      }
      return d.join(";");
    }
    function B(a, b) {
      if (!0 === b(a)) {
        return !0;
      }
      a = a._childNodes;
      var c = 0, d;
      if (a) {
        for (d = a.length; c < d; ++c) {
          if (B(a[c], b)) {
            return !0;
          }
        }
      }
    }
    function C(a, b) {
      if (a.nodeType === TYTE_NODE_TYPE.TEXT_NODE) {
        if (!0 === b(a)) {
          return !0;
        }
      } else {
        a = a._childNodes;
        var c = 0, d;
        if (a) {
          for (d = a.length; c < d; ++c) {
            if (C(a[c], b)) {
              return !0;
            }
          }
        }
      }
    }
    function v(a, b) {
      if (a.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && !0 === b(a)) {
        return !0;
      }
      a = a._childNodes;
      var c = 0, d;
      if (a) {
        for (d = a.length; c < d; ++c) {
          var g = a[c];
          if (g.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && v(g, b)) {
            return !0;
          }
        }
      }
    }
    function y(a, b) {
      a && a.constructor === b || (a = new b());
      return a;
    }
    function u(a) {
      var b = a.parent;
      return b ? (b = b._childNodes, b.indexOf(a)) : -1;
    }
    function w(a, b) {
      for (var c = a.length, d, g; c;) {
        d = a[--c], "string" === typeof d || "number" === typeof d ? a[c] = new f(d) : DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || d.nodeType !== TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE || (d = d._childNodes) && d.length && (d.unshift(c, 1), a.splice.apply(a, d));
      }
      for (c = a.length; c;) {
        d = a[--c], (g = d.parent) && g._childNodes.splice(u(d), 1), d.parent = b;
      }
      return a;
    }
    function r(a) {
      return Array.prototype.slice.call(a);
    }
    function G(a) {
      var b = null, c;
      if (a) {
        for (c in b = {}, a) {
          var d = a[c];
          b[c] = d && "object" === typeof d ? G(d) : d;
        }
      }
      return b;
    }
    function D(a) {
      return a.split("<").join("&lt;").split(">").join("&gt;");
    }
    function H(a) {
      v(this, a);
      return this;
    }
    function I(a) {
      var b = null;
      v(this, function(c) {
        if (c.getAttr("id") === a) {
          return b = c, !0;
        }
      });
      return b;
    }
    function J(a) {
      var b = [], c = -1;
      v(this, function(d) {
        d._tagName === a && (b[++c] = d);
      });
      return b;
    }
    function K(a) {
      var b = [], c = -1;
      v(this, function(d) {
        d.hasClass(a) && (b[++c] = d);
      });
      return b;
    }
    function L(a) {
      var b = [], c = -1;
      v(this, function(d) {
        d.getAttr("name") === a && (b[++c] = d);
      });
      return b;
    }
    function M() {
      var a = this._childNodes;
      return a && a[0] || null;
    }
    function N() {
      var a = this._childNodes;
      return a && a[a.length - 1] || null;
    }
    function O() {
      return this._childNodes;
    }
    function P(a) {
      var b = this._childNodes = this._childNodes || [], c = w(r(arguments), this);
      b.push.apply(b, c);
      return this;
    }
    function Q(a) {
      var b = this._childNodes = this._childNodes || [], c = w(r(arguments), this);
      c.unshift(0, 0);
      b.splice.apply(b, c);
      return this;
    }
    function R() {
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
    function S() {
      var a = "";
      C(this, function(b) {
        a += b.text;
      });
      return a;
    }
    function T(a) {
      var b = this._childNodes;
      b && 1 === b.length && b[0].nodeType === TYTE_NODE_TYPE.TEXT_NODE ? b[0].text = a : (b && this.empty(), this.appendNode(a));
      return this;
    }
    function X(a) {
      function b(d, g) {
        var l = arguments, k = y(this, b);
        l = r(l);
        var n = l[0], t;
        if (n && "object" === typeof n && (!n || n.walkNodes !== f.prototype.walkNodes && n.getPrev !== f.prototype.getPrev)) {
          for (t in n) {
            k.setAttr(t, n[t]);
          }
          l.shift();
        }
        l.length && k.appendNode.apply(k, l);
        return k;
      }
      var c = new e();
      c._tagName = a;
      c.constructor = b;
      b.prototype = c;
      return b;
    }
    function Y(a) {
      function b() {
        var d = arguments, g = y(this, b);
        g.initialParams = r(d);
        return g;
      }
      var c = new m();
      c._renderer = a;
      c.constructor = b;
      b.prototype = c;
      return b;
    }
    function U(a) {
      var b = [], c = this._childNodes, d = 0, g;
      if (c) {
        for (g = c.length; d < g; ++d) {
          b[d] = c[d].renderSSR(a);
        }
      }
      return b.join("");
    }
    x = function(a) {
      if ("function" === typeof a) {
        return Z(a);
      }
      if ("string" === typeof a) {
        return aa(a);
      }
    };
    DEFINE_TYTE__EXPORT && (module.exports = x);
    var V = {className:"class", htmlFor:"for"};
    f = function(a) {
      var b = y(this, f);
      b.text = "" + a;
      return b;
    };
    x.Text = f;
    f.prototype.nodeType = TYTE_NODE_TYPE.TEXT_NODE;
    f.prototype.text = "";
    f.prototype.parent = null;
    f.prototype.walkNodes = function(a) {
      B(this, a);
      return this;
    };
    f.prototype.walkTextNodes = function(a) {
      C(this, a);
      return this;
    };
    f.prototype.getPrev = function() {
      var a = this.parent;
      return a && a._childNodes[u(this) - 1] || null;
    };
    f.prototype.setPrev = function(a) {
      var b = this.parent;
      if (b) {
        var c = w(r(arguments), b);
        c.unshift(u(this), 0);
        b = b._childNodes;
        b.splice.apply(b, c);
      }
      return this;
    };
    f.prototype.getNext = function() {
      var a = this.parent;
      return a && a._childNodes[u(this) + 1] || null;
    };
    f.prototype.setNext = function(a) {
      var b = this.parent;
      if (b) {
        var c = b._childNodes;
        var d = u(this) + 1;
        b = w(r(arguments), b);
        d < c.length ? (b.unshift(d, 0), c.splice.apply(c, b)) : c.push.apply(c, b);
      }
      return this;
    };
    f.prototype.swap = function(a) {
      var b = this.parent;
      if (b) {
        var c = w(r(arguments), b);
        c.unshift(u(this), 1);
        b = b._childNodes;
        b.splice.apply(b, c);
        this.parent = null;
      }
      return this;
    };
    f.prototype.remove = function() {
      var a = this.parent;
      a && (a._childNodes.splice(u(this), 1), this.parent = null);
      return this;
    };
    f.prototype.clone = function(a) {
      return new f(this.text);
    };
    DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (h = function(a) {
      var b = y(this, h);
      return b.appendNode.apply(b, r(arguments));
    }, x.DocumentFragment = h, h.prototype._childNodes = null, h.prototype.nodeType = TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE, h.prototype.parent = null, h.prototype.walkNodes = f.prototype.walkNodes, h.prototype.walkTextNodes = f.prototype.walkTextNodes, h.prototype.walkNodes = H, h.prototype.getElementByID = I, h.prototype.getElementListByTag = J, h.prototype.getElementListByClass = K, h.prototype.getElementListByName = L, h.prototype.getFirstChild = M, h.prototype.getLastChild = N, h.prototype.getChildNodes = 
    O, h.prototype.appendNode = P, h.prototype.prependNode = Q, h.prototype.empty = R, h.prototype.getTextContent = S, h.prototype.setTextContent = T, h.prototype.clone = function(a) {
      var b = new h();
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
    var aa = function(a) {
      return W[a] = W[a] || X(a);
    };
    var W = {};
    e.prototype._attrs = null;
    e.prototype._childNodes = null;
    e.prototype.nodeType = TYTE_NODE_TYPE.ELEMENT_NODE;
    e.prototype.parent = null;
    e.prototype.walkNodes = f.prototype.walkNodes;
    e.prototype.walkTextNodes = f.prototype.walkTextNodes;
    e.prototype.walkElements = H;
    e.prototype.getElementByID = I;
    e.prototype.getElementListByTag = J;
    e.prototype.getElementListByClass = K;
    e.prototype.getElementListByName = L;
    e.prototype.getFirstChild = M;
    e.prototype.getLastChild = N;
    e.prototype.getChildNodes = O;
    e.prototype.appendNode = P;
    e.prototype.prependNode = Q;
    e.prototype.empty = R;
    e.prototype.getPrev = f.prototype.getPrev;
    e.prototype.setPrev = f.prototype.setPrev;
    e.prototype.getNext = f.prototype.getNext;
    e.prototype.setNext = f.prototype.setNext;
    e.prototype.swap = f.prototype.swap;
    e.prototype.remove = f.prototype.remove;
    e.prototype.getTextContent = S;
    e.prototype.setTextContent = T;
    e.prototype.clone = function(a) {
      var b = this.constructor;
      b = this._attrs ? new b(G(this._attrs)) : new b();
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
    var Z = function(a) {
      return Y(a);
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
    var ba = {checked:!0, compact:!0, declare:!0, defer:!0, disabled:!0, ismap:!0, multiple:!0, nohref:!0, noresize:!0, noshade:!0, nowrap:!0, readonly:!0, selected:!0}, ca = {link:!0, meta:!0, br:!0, hr:!0, img:!0, input:!0, area:!0, base:!0, col:!0, embed:!0, keygen:!0, param:!0, source:!0}, da = {p:!0, dt:!0, dd:!0, li:!0, option:!0, thead:!0, tfoot:!0, th:!0, tr:!0, td:!0, rt:!0, rp:!0, optgroup:!0, caption:!0, colgroup:!0, col:!0}, ea = {a:!0, audio:!0, del:!0, ins:!0, map:!0, noscript:!0, video:!0}, 
    fa = DEFINE_TYTE__USE_VML ? {svg:!0, math:!0, "v:polyline":!0, "v:rect":!0, "v:line":!0} : {svg:!0, math:!0}, ha = {script:!0, style:!0, plaintext:!0, xmp:!0, noscript:!0}, z, E, F;
    DEFINE_TYTE__USE_RENDER_SSR && (f.prototype.renderSSR = function(a) {
      return z ? this.text : D(this.text);
    }, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (h.prototype.renderSSR = U), e.prototype.renderSSR = function(a) {
      var b = this._tagName, c = ["<", b], d = 1, g = this._attrs, l, k, n, t;
      if (g) {
        for (p in g) {
          var q = g[p];
          "function" === typeof q && (q = q.call(this, a, p));
          if (null != q) {
            var p = V[p] || p;
            ba[p] ? !1 !== q && (c[++d] = " " + p) : (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== p || "object" !== typeof q || (q = A(q, this, a)), c[++d] = " " + p + '="' + D("" + q).split('"').join('\\"') + '"');
          }
        }
      }
      z ||= l = !!ha[b];
      E ||= k = !!ea[b];
      F ||= n = !!fa[b];
      this._childNodes && (t = U.call(this, a));
      t ? c[++d] = ">" + t : c[++d] = F ? "/>" : ">";
      l && (z = !1);
      k && (E = !1);
      n && (F = !1);
      if (!da[b] || E) {
        if (t || !ca[b]) {
          c[++d] = "</" + b + ">";
        }
      }
      return c.join("");
    }, m.prototype.renderSSR = function(a) {
      var b = this._renderer(a);
      return "string" === typeof b ? z ? b : D(b) : "number" === typeof b ? "" + b : null != b ? b.renderSSR(a) : "";
    });
    DEFINE_TYTE__USE_RENDER_DOM && (f.prototype.renderDOM = function(a) {
      return document.createTextNode(this.text);
    }, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (h.prototype.renderDOM = function(a) {
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
        var k = c[d];
        "function" === typeof k && (k = k.call(this, a, d));
        null != k && (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== d ? b.setAttribute(V[d] || d, "" + k) : b.style.cssText = "object" === typeof k ? A(k, this, a) : k);
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

