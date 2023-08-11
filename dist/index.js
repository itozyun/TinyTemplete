var DEFINE_TYTE__DEBUG = !0, DEFINE_TYTE__EXPORT = !0, DEFINE_TYTE__USE_RENDER_SSR = !0, DEFINE_TYTE__USE_RENDER_DOM = !0, TYTE_NODE_TYPE = {ELEMENT_NODE:1, DOCUMENT_FRAGMENT_NODE:DEFINE_TYTE__DEBUG ? 11 : 2, TEXT_NODE:3, DYNAMIC_NODE:4};
(function(Q) {
  function H(n) {
    var x = {Text:h, DocumentFragment:f};
    if (n) {
      n = n.split(",");
      for (var t = 0, r = n.length, u; t < r; ++t) {
        (u = n[t]) && (x[u] = C(u));
      }
    }
    return x;
  }
  function e(n, x) {
  }
  var C, h, f;
  DEFINE_TYTE__EXPORT && (module.exports = H);
  (function() {
    function n(a) {
      var b = [], c = -1, d;
      for (d in a) {
        b[++c] = d + ":" + a[d];
      }
      return b.join(";");
    }
    function x(a, b) {
      if (!0 === b(a)) {
        return !0;
      }
      a = a._childNodes;
      var c = 0, d;
      if (a) {
        for (d = a.length; c < d; ++c) {
          if (x(a[c], b)) {
            return !0;
          }
        }
      }
    }
    function t(a, b) {
      if (a.nodeType === TYTE_NODE_TYPE.TEXT_NODE) {
        if (!0 === b(a)) {
          return !0;
        }
      } else {
        a = a._childNodes;
        var c = 0, d;
        if (a) {
          for (d = a.length; c < d; ++c) {
            if (t(a[c], b)) {
              return !0;
            }
          }
        }
      }
    }
    function r(a, b) {
      if (a.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && !0 === b(a)) {
        return !0;
      }
      a = a._childNodes;
      var c = 0, d;
      if (a) {
        for (d = a.length; c < d; ++c) {
          var g = a[c];
          if (g.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && r(g, b)) {
            return !0;
          }
        }
      }
    }
    function u(a, b) {
      a && a.constructor === b || (a = new b());
      return a;
    }
    function y(a, b) {
      for (var c = 0, d = a.length, g; c < d; ++c) {
        g = a[c];
        var l = b, k = g.parent;
        k && k._childNodes.splice(v(g), 1);
        g.parent = l;
      }
    }
    function v(a) {
      var b = a.parent;
      return b ? (b = b._childNodes, b.indexOf(a)) : -1;
    }
    function z(a) {
      for (var b = a.length, c; b;) {
        c = a[--b], "string" === typeof c ? a[b] = new h(c) : c.nodeType === TYTE_NODE_TYPE.DOCUMENT_FRAGMENT && (c = c._childNodes) && c.length && (c.unshift(b, 0), a.splice.apply(a, c));
      }
      return a;
    }
    function w(a) {
      return Array.prototype.slice.call(a);
    }
    function D(a) {
      var b = null, c;
      if (a) {
        for (c in b = {}, a) {
          var d = a[c];
          b[c] = d && "object" === typeof d ? D(d) : d;
        }
      }
      return b;
    }
    function E(a) {
      return a.split("<").join("&lt;").split(">").join("&gt;");
    }
    function I(a) {
      function b(d, g) {
        var l = arguments, k = u(this, b);
        l = w(l);
        var p = l[0], m;
        if (p && "object" === typeof p && (!p || p.walkNodes !== h.prototype.walkNodes)) {
          for (m in p) {
            k.setAttr(m, p[m]);
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
    function J(a) {
      var b = [], c = this._childNodes, d = 0, g;
      if (c) {
        for (g = c.length; d < g; ++d) {
          b[d] = c[d].renderSSR(a);
        }
      }
      return b.join("");
    }
    h = function(a) {
      var b = u(this, h);
      b.text = a;
      return b;
    };
    f = function(a) {
      var b = u(this, f);
      return b.appendNode.apply(b, w(arguments));
    };
    h.prototype.walkNodes = e.prototype.walkNodes = f.prototype.walkNodes = function(a) {
      x(this, a);
      return this;
    };
    h.prototype.walkTextNodes = e.prototype.walkTextNodes = f.prototype.walkTextNodes = function(a) {
      t(this, a);
      return this;
    };
    e.prototype.walkElements = f.prototype.walkNodes = function(a) {
      r(this, a);
      return this;
    };
    var F = {className:"class", htmlFor:"for"};
    h.prototype.nodeType = TYTE_NODE_TYPE.TEXT_NODE;
    h.prototype.text = "";
    h.prototype.parent = null;
    h.prototype.getPrev = function() {
      var a = this.parent;
      return a && a._childNodes[v(this) - 1] || null;
    };
    h.prototype.setPrev = function(a) {
      var b = this.parent;
      if (b) {
        var c = z(w(arguments));
        y(c, b);
        c.unshift(v(this), 0);
        b = b._childNodes;
        b.splice.apply(b, c);
      }
      return this;
    };
    h.prototype.getNext = function() {
      var a = this.parent;
      return a && a._childNodes[v(this) + 1] || null;
    };
    h.prototype.setNext = function(a) {
      var b = this.parent;
      if (b) {
        var c = b._childNodes;
        var d = v(this) + 1;
        var g = z(w(arguments));
        y(g, b);
        d < c.length ? (g.unshift(d, 0), c.splice.apply(c, g)) : c.push.apply(c, g);
      }
      return this;
    };
    h.prototype.swap = function(a) {
      var b = this.parent;
      if (b) {
        var c = z(w(arguments));
        y(c, b);
        c.unshift(v(this), 1);
        b = b._childNodes;
        b.splice.apply(b, c);
        this.parent = null;
      }
      return this;
    };
    h.prototype.remove = function() {
      var a = this.parent;
      a && (a._childNodes.splice(v(this), 1), this.parent = null);
      return this;
    };
    h.prototype.clone = function(a) {
      return new h(this.text);
    };
    f.prototype._childNodes = null;
    f.prototype.nodeType = TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE;
    f.prototype.parent = null;
    f.prototype.getElementByID = function(a) {
      var b = null;
      r(this, function(c) {
        if (c.getAttr("id") === a) {
          return b = c, !0;
        }
      });
      return b;
    };
    f.prototype.getElementListByTag = function(a) {
      var b = [], c = -1;
      r(this, function(d) {
        d._tagName === a && (b[++c] = d);
      });
      return b;
    };
    f.prototype.getElementListByClass = function(a) {
      var b = [], c = -1;
      r(this, function(d) {
        d.hasClass(a) && (b[++c] = d);
      });
      return b;
    };
    f.prototype.getElementListByName = function(a) {
      var b = [], c = -1;
      r(this, function(d) {
        d.getAttr("name") === a && (b[++c] = d);
      });
      return b;
    };
    f.prototype.getFirstChild = function() {
      var a = this._childNodes;
      return a && a[0] || null;
    };
    f.prototype.getLastChild = function() {
      var a = this._childNodes;
      return a && a[a.length - 1] || null;
    };
    f.prototype.getChildNodes = function() {
      return this._childNodes;
    };
    f.prototype.appendNode = function(a) {
      var b = this._childNodes = this._childNodes || [], c = z(w(arguments));
      y(c, this);
      b.push.apply(b, c);
      return this;
    };
    f.prototype.prependNode = function(a) {
      var b = this._childNodes = this._childNodes || [], c = z(w(arguments));
      y(c, this);
      c.unshift(0, 0);
      b.splice.apply(b, c);
      return this;
    };
    f.prototype.empty = function() {
      var a = this._childNodes, b = 0, c;
      if (a) {
        for (c = a.length; b < c; ++b) {
          var d = a[b];
          d.parent = null;
        }
        a.length = 0;
      }
      return this;
    };
    f.prototype.getTextContent = function() {
      var a = "";
      t(this, function(b) {
        a += b.text;
      });
      return a;
    };
    f.prototype.setTextContent = function(a) {
      var b = this._childNodes;
      b && 1 === b.length && b[0].nodeType === TYTE_NODE_TYPE.TEXT_NODE ? b[0].text = a : (b && this.empty(), this.appendNode(a));
      return this;
    };
    f.prototype.clone = function(a) {
      var b = new f();
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
    C = function(a) {
      return G[a] = G[a] || I(a);
    };
    var G = {};
    e.prototype._attrs = null;
    e.prototype._childNodes = null;
    e.prototype.nodeType = TYTE_NODE_TYPE.ELEMENT_NODE;
    e.prototype.parent = null;
    e.prototype.getElementByID = f.prototype.getElementByID;
    e.prototype.getElementListByTag = f.prototype.getElementListByTag;
    e.prototype.getElementListByClass = f.prototype.getElementListByClass;
    e.prototype.getElementListByName = f.prototype.getElementListByName;
    e.prototype.getFirstChild = f.prototype.getFirstChild;
    e.prototype.getLastChild = f.prototype.getLastChild;
    e.prototype.getChildNodes = f.prototype.getChildNodes;
    e.prototype.appendNode = f.prototype.appendNode;
    e.prototype.prependNode = f.prototype.prependNode;
    e.prototype.empty = f.prototype.empty;
    e.prototype.getPrev = h.prototype.getPrev;
    e.prototype.setPrev = h.prototype.setPrev;
    e.prototype.getNext = h.prototype.getNext;
    e.prototype.setNext = h.prototype.setNext;
    e.prototype.swap = h.prototype.swap;
    e.prototype.remove = h.prototype.remove;
    e.prototype.getTextContent = f.prototype.getTextContent;
    e.prototype.setTextContent = f.prototype.setTextContent;
    e.prototype.clone = function(a) {
      var b = this.constructor;
      b = this._attrs ? new b(D(this._attrs)) : new b();
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
      if ("style" === a && "string" === typeof b) {
        this.setCSSText(b);
      } else {
        var c = this._attrs = this._attrs || {};
        null != b ? c[a] = b : delete c[a];
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
    e.prototype.getStyle = function(a) {
      var b = this._attrs && this._attrs.style;
      a = b ? b[a] : "";
      return null == a ? "" : a;
    };
    e.prototype.setStyle = function(a, b) {
      var c = this._attrs, d = c && c.style;
      d || (c = this._attrs = c || {}, c.style = {});
      d[a] = b;
      return this;
    };
    e.prototype.removeStyle = function(a) {
      var b = this._attrs && this._attrs.style;
      b && delete b[a];
      return this;
    };
    e.prototype.setCSSText = function(a) {
      a = a.split(";");
      var b = 0, c;
      for (c = a.length; b < c; ++b) {
        var d = a[b];
        var g = d.split(":")[0].split(" ").join("");
        this.setStyle(g, d.substr(d.indexOf(":") + 1));
      }
      return this;
    };
    var K = {checked:!0, compact:!0, declare:!0, defer:!0, disabled:!0, ismap:!0, multiple:!0, nohref:!0, noresize:!0, noshade:!0, nowrap:!0, readonly:!0, selected:!0}, L = {link:!0, meta:!0, br:!0, hr:!0, img:!0, input:!0, area:!0, base:!0, col:!0, embed:!0, keygen:!0, param:!0, source:!0}, M = {p:!0, dt:!0, dd:!0, li:!0, option:!0, thead:!0, tfoot:!0, th:!0, tr:!0, td:!0, rt:!0, rp:!0, optgroup:!0, caption:!0, colgroup:!0, col:!0}, N = {a:!0, audio:!0, del:!0, ins:!0, map:!0, noscript:!0, video:!0}, 
    O = {polyline:!0, rect:!0, line:!0, "v:polyline":!0, "v:rect":!0, "v:line":!0}, P = {script:!0, style:!0, plaintext:!0, xmp:!0, noscript:!0}, A, B;
    DEFINE_TYTE__USE_RENDER_SSR && (h.prototype.renderSSR = function(a) {
      return A ? this.text : E(this.text);
    }, f.prototype.renderSSR = J, e.prototype.renderSSR = function(a) {
      var b = this._tagName, c = ["<", b], d = 1, g = this._attrs, l, k, p;
      if (g) {
        for (q in g) {
          var m = g[q];
          "function" === typeof m && (m = m.call(this, a, q));
          if (null != m) {
            var q = F[q] || q;
            K[q] ? !1 !== m && (c[++d] = " " + q) : ("style" === q && "object" === typeof m && (m = n(m)), c[++d] = " " + q + '="' + E("" + m).split('"').join('\\"') + '"');
          }
        }
      }
      A ||= l = !!P[b];
      B ||= k = !!N[b];
      this._childNodes ? (c[++d] = ">", c[++d] = p = f.prototype.renderSSR.call(this, a)) : c[++d] = O[b] ? "/>" : ">";
      l && (A = !1);
      k && (B = !1);
      if (!M[b] || B) {
        if (p || !L[b]) {
          c[++d] = "</" + b + ">";
        }
      }
      return c.join("");
    });
    DEFINE_TYTE__USE_RENDER_DOM && (h.prototype.renderDOM = function(a) {
      return document.createTextNode(this.text);
    }, f.prototype.renderDOM = function(a) {
      var b = document.createDocumentFragment(), c = this._childNodes, d = 0, g, l;
      if (c) {
        for (g = c.length; d < g; ++d) {
          (l = c[d].renderDOM(a)) && b.append(l);
        }
      }
      return b;
    }, e.prototype.renderDOM = function(a) {
      var b = document.createElement(this._tagName), c = this._attrs, d, g = this._childNodes, l = 0;
      for (d in c) {
        var k = c[d];
        "function" === typeof k && (k = k.call(this, a, d));
        null != k && ("style" === d ? b.style.cssText = "object" === typeof k ? n(k) : k : b.setAttribute(F[d] || d, "" + k));
      }
      if (g) {
        for (c = g.length; l < c; ++l) {
          (d = g[l].renderDOM(a)) && b.appendChild(d);
        }
      }
      return b;
    });
  })();
})(void 0);

