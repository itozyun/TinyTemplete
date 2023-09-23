var DEFINE_TYTE__DEBUG = !0, DEFINE_TYTE__EXPORT = !0, DEFINE_TYTE__DROP_INLINE_STYLE = !1, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT = !1, DEFINE_TYTE__USE_VML = !1, DEFINE_TYTE__USE_RENDER_SSR = !0, DEFINE_TYTE__USE_RENDER_DOM = !0, TYTE_NODE_TYPE = {ELEMENT_NODE:1, DOCUMENT_FRAGMENT_NODE:DEFINE_TYTE__DEBUG ? 11 : 2, TEXT_NODE:3, DYNAMIC_NODE:4};
(function(la) {
  function e(D, y) {
  }
  var z, f, k, n;
  (function() {
    function D(a, b, c) {
      var d = [], g = -1, l;
      for (l in a) {
        var h = a[l];
        "function" === typeof h && (h = h.call(b, c, l));
        null != h && (d[++g] = l + ":" + h);
      }
      return d.join(";");
    }
    function y(a, b) {
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
          if (b.childNodes.length && (1 !== b.childNodes.length || 3 !== b.childNodes[0].nodeType)) {
            throw "childNodes.length missmatch!";
          }
        } else if (a.getChildNodes().length < b.childNodes.length) {
          throw "childNodes.length missmatch!";
        }
      }
    }
    function E(a, b, c, d) {
      b = b._childNodes;
      var g = 0, l;
      if (b) {
        if (DEFINE_TYTE__USE_RENDER_DOM && d) {
          var h = b.length;
          for (l = d.childNodes; g < h; ++g) {
            var m = b[g];
            var p = l[g];
            if (m.nodeType === TYTE_NODE_TYPE.TEXT_NODE && (!p || 3 !== p.nodeType)) {
              var q = document.createTextNode("");
              p ? d.insertBefore(q, p) : d.appendChild(q);
              p = q;
            }
            if (a(m, c, p)) {
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
    function F(a, b, c) {
      DEFINE_TYTE__DEBUG && c && y(a, c);
      return !0 === (DEFINE_TYTE__USE_RENDER_DOM ? b(a, c) : b(a)) ? !0 : E(F, a, b, c);
    }
    function A(a, b, c) {
      DEFINE_TYTE__DEBUG && c && y(a, c);
      if (a.nodeType === TYTE_NODE_TYPE.TEXT_NODE) {
        if (!0 === (DEFINE_TYTE__USE_RENDER_DOM ? b(a, c) : b(a))) {
          return !0;
        }
      } else {
        return E(A, a, b, c);
      }
    }
    function u(a, b, c) {
      DEFINE_TYTE__DEBUG && c && y(a, c);
      return a.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && !0 === (DEFINE_TYTE__USE_RENDER_DOM ? b(a, c) : b(a)) ? !0 : E(u, a, b, c);
    }
    function B(a, b) {
      a && a.constructor === b || (a = new b());
      return a;
    }
    function v(a) {
      var b = a.parent;
      return b ? (b = b._childNodes, b.indexOf(a)) : -1;
    }
    function x(a, b) {
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
    function J(a) {
      var b = null, c;
      if (a) {
        for (c in b = {}, a) {
          var d = a[c];
          b[c] = d && "object" === typeof d ? J(d) : d;
        }
      }
      return b;
    }
    function G(a) {
      return a.split("<").join("&lt;").split(">").join("&gt;");
    }
    function K(a, b) {
      DEFINE_TYTE__USE_RENDER_DOM ? u(this, a, b) : u(this, a);
      return this;
    }
    function L(a) {
      var b = null;
      u(this, function(c) {
        if (c.getAttr("id") === a) {
          return b = c, !0;
        }
      });
      return b;
    }
    function M(a) {
      var b = [], c = -1;
      u(this, function(d) {
        d._tagName === a && (b[++c] = d);
      });
      return b;
    }
    function N(a) {
      var b = [], c = -1;
      u(this, function(d) {
        d.hasClass(a) && (b[++c] = d);
      });
      return b;
    }
    function O(a) {
      var b = [], c = -1;
      u(this, function(d) {
        d.getAttr("name") === a && (b[++c] = d);
      });
      return b;
    }
    function P() {
      var a = this._childNodes;
      return a && a[0] || null;
    }
    function Q() {
      var a = this._childNodes;
      return a && a[a.length - 1] || null;
    }
    function R() {
      return this._childNodes;
    }
    function S(a) {
      var b = this._childNodes = this._childNodes || [], c = x(t(arguments), this);
      b.push.apply(b, c);
      return this;
    }
    function T(a) {
      var b = this._childNodes = this._childNodes || [], c = x(t(arguments), this);
      c.unshift(0, 0);
      b.splice.apply(b, c);
      return this;
    }
    function U() {
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
    function V() {
      var a = "";
      A(this, function(b) {
        a += b.text;
      });
      return a;
    }
    function W(a) {
      var b = this._childNodes;
      b && 1 === b.length && b[0].nodeType === TYTE_NODE_TYPE.TEXT_NODE ? b[0].text = a : (b && this.empty(), this.appendNode(a));
      return this;
    }
    function ba(a) {
      function b(d, g) {
        var l = arguments, h = B(this, b);
        l = t(l);
        var m = l[0], p;
        if (m && "object" === typeof m && (!m || m.walkNodes !== f.prototype.walkNodes && m.getPrev !== f.prototype.getPrev)) {
          for (p in m) {
            h.setAttr(p, m[p]);
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
    function ca(a) {
      function b() {
        var d = arguments, g = B(this, b);
        g.initialParams = t(d);
        return g;
      }
      var c = new n();
      c._renderer = a;
      c.constructor = b;
      b.prototype = c;
      return b;
    }
    function X(a) {
      var b = [], c = this._childNodes, d = 0, g;
      if (c) {
        for (g = c.length; d < g; ++d) {
          b[d] = c[d].renderSSR(a);
        }
      }
      return b.join("");
    }
    z = function(a) {
      if ("function" === typeof a) {
        return da(a);
      }
      if ("string" === typeof a) {
        return ea(a);
      }
    };
    DEFINE_TYTE__EXPORT && (module.exports = z);
    var Y = {className:"class", htmlFor:"for"};
    f = function(a) {
      var b = B(this, f);
      b.text = "" + a;
      return b;
    };
    z.Text = f;
    f.prototype.nodeType = TYTE_NODE_TYPE.TEXT_NODE;
    f.prototype.text = "";
    f.prototype.parent = null;
    f.prototype.walkNodes = function(a, b) {
      DEFINE_TYTE__USE_RENDER_DOM ? F(this, a, b) : F(this, a);
      return this;
    };
    f.prototype.walkTextNodes = function(a, b) {
      DEFINE_TYTE__USE_RENDER_DOM ? A(this, a, b) : A(this, a);
      return this;
    };
    f.prototype.getPrev = function() {
      var a = this.parent;
      return a && a._childNodes[v(this) - 1] || null;
    };
    f.prototype.setPrev = function(a) {
      var b = this.parent;
      if (b) {
        var c = x(t(arguments), b);
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
        b = x(t(arguments), b);
        d < c.length ? (b.unshift(d, 0), c.splice.apply(c, b)) : c.push.apply(c, b);
      }
      return this;
    };
    f.prototype.swap = function(a) {
      var b = this.parent;
      if (b) {
        var c = x(t(arguments), b);
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
      var b = B(this, k);
      return b.appendNode.apply(b, t(arguments));
    }, z.DocumentFragment = k, k.prototype._childNodes = null, k.prototype.nodeType = TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE, k.prototype.parent = null, k.prototype.walkNodes = f.prototype.walkNodes, k.prototype.walkTextNodes = f.prototype.walkTextNodes, k.prototype.walkNodes = K, k.prototype.getElementByID = L, k.prototype.getElementListByTag = M, k.prototype.getElementListByClass = N, k.prototype.getElementListByName = O, k.prototype.getFirstChild = P, k.prototype.getLastChild = Q, k.prototype.getChildNodes = 
    R, k.prototype.appendNode = S, k.prototype.prependNode = T, k.prototype.empty = U, k.prototype.getTextContent = V, k.prototype.setTextContent = W, k.prototype.clone = function(a) {
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
    n = function(a) {
    };
    var ea = function(a) {
      return Z[a] = Z[a] || ba(a);
    };
    var Z = {};
    e.prototype._attrs = null;
    e.prototype._childNodes = null;
    e.prototype.nodeType = TYTE_NODE_TYPE.ELEMENT_NODE;
    e.prototype.parent = null;
    e.prototype.walkNodes = f.prototype.walkNodes;
    e.prototype.walkTextNodes = f.prototype.walkTextNodes;
    e.prototype.walkElements = K;
    e.prototype.getElementByID = L;
    e.prototype.getElementListByTag = M;
    e.prototype.getElementListByClass = N;
    e.prototype.getElementListByName = O;
    e.prototype.getFirstChild = P;
    e.prototype.getLastChild = Q;
    e.prototype.getChildNodes = R;
    e.prototype.appendNode = S;
    e.prototype.prependNode = T;
    e.prototype.empty = U;
    e.prototype.getPrev = f.prototype.getPrev;
    e.prototype.setPrev = f.prototype.setPrev;
    e.prototype.getNext = f.prototype.getNext;
    e.prototype.setNext = f.prototype.setNext;
    e.prototype.swap = f.prototype.swap;
    e.prototype.remove = f.prototype.remove;
    e.prototype.getTextContent = V;
    e.prototype.setTextContent = W;
    e.prototype.clone = function(a) {
      var b = this.constructor;
      b = this._attrs ? new b(J(this._attrs)) : new b();
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
    var da = function(a) {
      return ca(a);
    };
    n.prototype._renderer = null;
    n.prototype.initialParams = null;
    n.prototype.nodeType = TYTE_NODE_TYPE.DYNAMIC_NODE;
    n.prototype.parent = null;
    n.prototype.walkNodes = f.prototype.walkNodes;
    n.prototype.getPrev = f.prototype.getPrev;
    n.prototype.setPrev = f.prototype.setPrev;
    n.prototype.getNext = f.prototype.getNext;
    n.prototype.setNext = f.prototype.setNext;
    n.prototype.swap = f.prototype.swap;
    n.prototype.remove = f.prototype.remove;
    n.prototype.clone = function(a) {
      a = new this.constructor();
      a.initialParams = this.initialParams;
      return a;
    };
    var fa = {checked:!0, compact:!0, declare:!0, defer:!0, disabled:!0, ismap:!0, multiple:!0, nohref:!0, noresize:!0, noshade:!0, nowrap:!0, readonly:!0, selected:!0}, ha = {link:!0, meta:!0, br:!0, hr:!0, img:!0, input:!0, area:!0, base:!0, col:!0, embed:!0, keygen:!0, param:!0, source:!0}, ia = {p:!0, dt:!0, dd:!0, li:!0, option:!0, thead:!0, tfoot:!0, th:!0, tr:!0, td:!0, rt:!0, rp:!0, optgroup:!0, caption:!0, colgroup:!0, col:!0}, ja = {a:!0, audio:!0, del:!0, ins:!0, map:!0, noscript:!0, video:!0}, 
    aa = DEFINE_TYTE__USE_VML ? {svg:!0, math:!0, "v:polyline":!0, "v:rect":!0, "v:line":!0} : {svg:!0, math:!0}, ka = {script:!0, style:!0, plaintext:!0, xmp:!0, noscript:!0};
    if (DEFINE_TYTE__USE_RENDER_DOM) {
      var w;
      f.prototype.renderDOM = function(a) {
        return document.createTextNode(this.text);
      };
      DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (k.prototype.renderDOM = function(a) {
        var b = document.createDocumentFragment(), c = this._childNodes, d = 0, g, l;
        if (c) {
          for (g = c.length; d < g; ++d) {
            (l = c[d].renderDOM(a)) && b.append(l);
          }
        }
        return b;
      });
      e.prototype.renderDOM = function(a) {
        var b = this._tagName, c;
        !w && aa[b] && (w = c = "svg" === b ? "http://www.w3.org/2000/svg" : "http://www.w3.org/1998/Math/MathML");
        b = w ? document.createElementNS(w, b) : document.createElement(b);
        var d = this._attrs, g = this._childNodes, l = 0;
        for (m in d) {
          var h = d[m];
          "function" === typeof h && (h = h.call(this, a, m));
          if (null != h) {
            if (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== m) {
              var m = Y[m] || m;
              w ? b.setAttributeNS(null, m, "" + h) : b.setAttribute(m, "" + h);
            } else {
              b.style.cssText = "object" === typeof h ? D(h, this, a) : h;
            }
          }
        }
        if (g) {
          for (m = g.length; l < m; ++l) {
            (d = g[l].renderDOM(a)) && b.appendChild(d);
          }
        }
        c && (w = !1);
        return b;
      };
      n.prototype.renderDOM = function(a) {
        var b = this._renderer(a);
        if ("string" === typeof b || "number" === typeof b) {
          return document.createTextNode("" + b);
        }
        if (null != b) {
          return b.renderDOM(a);
        }
      };
    }
    var C, H, I;
    DEFINE_TYTE__USE_RENDER_SSR && (f.prototype.renderSSR = function(a) {
      return C ? this.text : G(this.text);
    }, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (k.prototype.renderSSR = X), e.prototype.renderSSR = function(a) {
      var b = this._tagName, c = ["<", b], d = 1, g = this._attrs, l, h, m, p;
      if (g) {
        for (r in g) {
          var q = g[r];
          "function" === typeof q && (q = q.call(this, a, r));
          if (null != q) {
            var r = Y[r] || r;
            fa[r] ? !1 !== q && (c[++d] = " " + r) : (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== r || "object" !== typeof q || (q = D(q, this, a)), c[++d] = " " + r + '="' + G("" + q).split('"').join('\\"') + '"');
          }
        }
      }
      C ||= l = !!ka[b];
      H ||= h = !!ja[b];
      I ||= m = !!aa[b];
      this._childNodes && (p = X.call(this, a));
      p ? c[++d] = ">" + p : c[++d] = I ? "/>" : ">";
      l && (C = !1);
      h && (H = !1);
      m && (I = !1);
      if (!ia[b] || H) {
        if (p || !ha[b]) {
          c[++d] = "</" + b + ">";
        }
      }
      return c.join("");
    }, n.prototype.renderSSR = function(a) {
      var b = this._renderer(a);
      return "string" === typeof b ? C ? b : G(b) : "number" === typeof b ? "" + b : null != b ? b.renderSSR(a) : "";
    });
  })();
})(void 0);

