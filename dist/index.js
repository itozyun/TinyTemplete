var DEFINE_TYTE__DEBUG = !0, DEFINE_TYTE__EXPORT = !0, DEFINE_TYTE__USE_RENDER_SSR = !0, DEFINE_TYTE__USE_RENDER_DOM = !0, TYTE_NODE_TYPE = {ELEMENT_NODE:1, TEXT_NODE:3, DOCUMENT_FRAGMENT_NODE:DEFINE_TYTE__DEBUG ? 11 : 2};
(function(Q) {
  function I(p) {
    var t = {Text:h, DocumentFragment:g};
    if (p) {
      p = p.split(",");
      for (var q = 0, y = p.length, r; q < y; ++q) {
        (r = p[q]) && (t[r] = D(r));
      }
    }
    return t;
  }
  function f(p, t) {
  }
  var D, h, g;
  DEFINE_TYTE__EXPORT && (module.exports = I);
  (function() {
    function p(a, b) {
      if (!0 === b(a)) {
        return !0;
      }
      a = a._childNodes;
      var c = 0, d;
      if (a) {
        for (d = a.length; c < d; ++c) {
          if (p(a[c], b)) {
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
    function q(a, b) {
      if (a.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && !0 === b(a)) {
        return !0;
      }
      a = a._childNodes;
      var c = 0, d;
      if (a) {
        for (d = a.length; c < d; ++c) {
          var e = a[c];
          if (e.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && (!0 === b(e) || e._childNodes && q(e, b))) {
            return !0;
          }
        }
      }
    }
    function y(a, b) {
      a && a.constructor === b || (a = new b());
      return a;
    }
    function r(a, b) {
      function c(e, k) {
        var l = e._childNodes, m = 0;
        e.parent = k;
        if (l) {
          for (k = l.length; m < k; ++m) {
            var n = l[m];
            n._childNodes ? c(n, e) : n.parent = e;
          }
        }
      }
      var d = a.parent;
      d && d._childNodes.splice(u(a), 1);
      d === b && d || c(a, b);
    }
    function z(a, b) {
      for (var c = 0, d = a.length, e; c < d; ++c) {
        e = a[c], r(e, b);
      }
    }
    function u(a) {
      var b = a.parent;
      return b ? (b = b._childNodes, b.indexOf(a)) : -1;
    }
    function v(a) {
      for (var b = a.length, c; b;) {
        c = a[--b], "string" === typeof c ? a[b] = new h(c) : c.nodeType === TYTE_NODE_TYPE.DOCUMENT_FRAGMENT && (c = c._childNodes) && c.length && (c.unshift(b, 0), a.splice.apply(a, c));
      }
      return a;
    }
    function w(a) {
      return Array.prototype.slice.call(a);
    }
    function E(a) {
      var b = null, c;
      if (a) {
        for (c in b = {}, a) {
          var d = a[c];
          b[c] = d && "object" === typeof d ? E(d) : d;
        }
      }
      return b;
    }
    function F(a) {
      return a.split("<").join("&lt;").split(">").join("&gt;");
    }
    function J(a) {
      function b(c, d) {
        var e = arguments, k = y(this, b);
        e = w(e);
        var l = e[0], m;
        if (l && "object" === typeof l && (!l || l.walkNodes !== h.prototype.walkNodes)) {
          for (m in l) {
            k.setAttr(m, l[m]);
          }
          e.shift();
        }
        e.length && (k._childNodes = v(e));
        return k;
      }
      b.prototype = new f();
      b.prototype._tagName = a;
      return b.prototype.constructor = b;
    }
    h = function(a) {
      var b = y(this, h);
      b.text = a;
      return b;
    };
    g = function(a) {
      var b = y(this, g);
      b._childNodes = v(w(arguments));
      return b;
    };
    h.prototype.walkNodes = f.prototype.walkNodes = g.prototype.walkNodes = function(a) {
      p(this, a);
      return this;
    };
    h.prototype.walkTextNodes = f.prototype.walkTextNodes = g.prototype.walkTextNodes = function(a) {
      t(this, a);
      return this;
    };
    f.prototype.walkElements = g.prototype.walkNodes = function(a) {
      q(this, a);
      return this;
    };
    var G = {className:"class", htmlFor:"for"};
    h.prototype.nodeType = TYTE_NODE_TYPE.TEXT_NODE;
    h.prototype.text = "";
    h.prototype.parent = null;
    h.prototype.getPrev = function() {
      var a = this.parent;
      return a && a._childNodes[u(this) - 1] || null;
    };
    h.prototype.setPrev = function(a) {
      var b = this.parent;
      if (b) {
        var c = v(w(arguments));
        z(c, b);
        c.unshift(u(this), 0);
        b = b._childNodes;
        b.splice.apply(b, c);
      }
      return this;
    };
    h.prototype.getNext = function() {
      var a = this.parent;
      return a && a._childNodes[u(this) + 1] || null;
    };
    h.prototype.setNext = function(a) {
      var b = this.parent;
      if (b) {
        var c = b._childNodes;
        var d = u(this) + 1;
        var e = v(w(arguments));
        z(e, b);
        d < c.length ? (e.unshift(d, 0), c.splice.apply(c, e)) : c.push.apply(c, e);
      }
      return this;
    };
    h.prototype.swap = function(a) {
      var b = this.parent;
      if (b) {
        var c = v(w(arguments));
        z(c, b);
        c.unshift(u(this), 1);
        b = b._childNodes;
        b.splice.apply(b, c);
        r(this, null);
      }
      return this;
    };
    h.prototype.remove = function() {
      var a = this.parent;
      a && (a._childNodes.splice(u(this), 1), r(this, null));
      return this;
    };
    h.prototype.ready = function() {
      r(this, null);
      return this;
    };
    h.prototype.clone = function(a) {
      var b = [], c = [], d;
      p(this, function(e) {
        var k = e.constructor;
        k = e.nodeType === TYTE_NODE_TYPE.TEXT_NODE ? new k(e.text) : e.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && e._attrs ? new k(E(e._attrs)) : new k();
        d ||= k;
        if (!a) {
          return !0;
        }
        b.push(e);
        c.push(k);
        e._childNodes && e._childNodes.length && (k._childNodes = []);
        e.parent && (e = b.indexOf(e.parent), 0 <= e && (c[e]._childNodes.push(k), k.parent = c[e]));
      });
      return d.ready();
    };
    g.prototype._childNodes = null;
    g.prototype.nodeType = TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE;
    g.prototype.parent = null;
    g.prototype.getElementByID = function(a) {
      var b = null;
      q(this, function(c) {
        if (c.getAttr("id") === a) {
          return b = c, !0;
        }
      });
      return b;
    };
    g.prototype.getElementListByTag = function(a) {
      var b = [], c = -1;
      q(this, function(d) {
        d._tagName === a && (b[++c] = d);
      });
      return b;
    };
    g.prototype.getElementListByClass = function(a) {
      var b = [], c = -1;
      q(this, function(d) {
        d.hasClass(a) && (b[++c] = d);
      });
      return b;
    };
    g.prototype.getElementListByName = function(a) {
      var b = [], c = -1;
      q(this, function(d) {
        d.getAttr("name") === a && (b[++c] = d);
      });
      return b;
    };
    g.prototype.getFirstChild = function() {
      var a = this._childNodes;
      return a && a[0] || null;
    };
    g.prototype.getLastChild = function() {
      var a = this._childNodes;
      return a && a[a.length - 1] || null;
    };
    g.prototype.getChildNodes = function() {
      return this._childNodes;
    };
    g.prototype.appendNode = function(a) {
      var b = this._childNodes = this._childNodes || [], c = v(w(arguments));
      z(c, this);
      b.push.apply(b, c);
      return this;
    };
    g.prototype.prependNode = function(a) {
      var b = this._childNodes = this._childNodes || [], c = v(w(arguments));
      z(c, this);
      c.unshift(0, 0);
      b.splice.apply(b, c);
      return this;
    };
    g.prototype.empty = function() {
      var a = this._childNodes, b = 0, c;
      if (a) {
        for (c = a.length; b < c; ++b) {
          var d = a[b];
          r(d, null);
        }
        a.length = 0;
      }
      return this;
    };
    g.prototype.getTextContent = function() {
      var a = "";
      t(this, function(b) {
        a += b.text;
      });
      return a;
    };
    g.prototype.setTextContent = function(a) {
      var b = this._childNodes;
      b && 1 === b.length && b[0].nodeType === TYTE_NODE_TYPE.TEXT_NODE ? b[0].text = a : (b && this.empty(), this.appendNode(a));
      return this;
    };
    g.prototype.ready = h.prototype.ready;
    g.prototype.clone = h.prototype.clone;
    D = function(a) {
      return H[a] = H[a] || J(a);
    };
    var H = {};
    f.prototype._attrs = null;
    f.prototype._childNodes = null;
    f.prototype.nodeType = TYTE_NODE_TYPE.ELEMENT_NODE;
    f.prototype.parent = null;
    f.prototype.getElementByID = g.prototype.getElementByID;
    f.prototype.getElementListByTag = g.prototype.getElementListByTag;
    f.prototype.getElementListByClass = g.prototype.getElementListByClass;
    f.prototype.getElementListByName = g.prototype.getElementListByName;
    f.prototype.getFirstChild = g.prototype.getFirstChild;
    f.prototype.getLastChild = g.prototype.getLastChild;
    f.prototype.getChildNodes = g.prototype.getChildNodes;
    f.prototype.appendNode = g.prototype.appendNode;
    f.prototype.prependNode = g.prototype.prependNode;
    f.prototype.empty = g.prototype.empty;
    f.prototype.getPrev = h.prototype.getPrev;
    f.prototype.setPrev = h.prototype.setPrev;
    f.prototype.getNext = h.prototype.getNext;
    f.prototype.setNext = h.prototype.setNext;
    f.prototype.swap = h.prototype.swap;
    f.prototype.remove = h.prototype.remove;
    f.prototype.getTextContent = g.prototype.getTextContent;
    f.prototype.setTextContent = g.prototype.setTextContent;
    f.prototype.ready = h.prototype.ready;
    f.prototype.clone = h.prototype.clone;
    f.prototype.getAttr = function(a) {
      var b = this._attrs;
      a = b ? b[a] : null;
      return null != a ? a : null;
    };
    f.prototype.setAttr = function(a, b) {
      if ("style" === a && "string" === typeof b) {
        this.setCSSText(b);
      } else {
        var c = this._attrs = this._attrs || {};
        null != b ? c[a] = b : delete c[a];
      }
      return this;
    };
    f.prototype.hasAttr = function(a) {
      var b = this._attrs;
      return b ? null != b[a] : !1;
    };
    f.prototype.removeAttr = function(a) {
      var b = this._attrs;
      b && delete b[a];
      return this;
    };
    f.prototype.hasClass = function(a) {
      return -1 !== (" " + this.getClass() + " ").indexOf(" " + a + " ");
    };
    f.prototype.getClass = function() {
      return this.getAttr("className") || "";
    };
    f.prototype.setClass = function(a) {
      return this.setAttr("className", a);
    };
    f.prototype.addClass = function(a) {
      if (a && !this.hasClass(a)) {
        var b = this.getClass();
        this.setClass(b ? b + " " + a : a);
      }
      return this;
    };
    f.prototype.removeClass = function(a) {
      if (a && this.hasClass(a)) {
        var b = this.getClass().split(" ");
        b.splice(b.indexOf(a), 1);
        this.setClass(b.join(" "));
      }
      return this;
    };
    f.prototype.toggleClass = function(a, b) {
      return !0 === b || (!1 === b ? 0 : !this.hasClass(a)) ? this.addClass(a) : this.removeClass(a);
    };
    f.prototype.getStyle = function(a) {
      var b = this._attrs && this._attrs.style;
      a = b ? b[a] : "";
      return null == a ? "" : a;
    };
    f.prototype.setStyle = function(a, b) {
      var c = this._attrs, d = c && c.style;
      d || (c = this._attrs = c || {}, c.style = {});
      d[a] = b;
      return this;
    };
    f.prototype.removeStyle = function(a) {
      var b = this._attrs && this._attrs.style;
      b && delete b[a];
      return this;
    };
    f.prototype.getCSSText = function() {
      var a = [], b = -1, c = this._attrs && this._attrs.style, d;
      for (d in c) {
        a[++b] = d + ":" + c[d];
      }
      return a.join(";");
    };
    f.prototype.setCSSText = function(a) {
      a = a.split(";");
      var b = 0, c;
      for (c = a.length; b < c; ++b) {
        var d = a[b];
        var e = d.split(":")[0].split(" ").join("");
        this.setStyle(e, d.substr(d.indexOf(":") + 1));
      }
      return this;
    };
    var K = {checked:!0, compact:!0, declare:!0, defer:!0, disabled:!0, ismap:!0, multiple:!0, nohref:!0, noresize:!0, noshade:!0, nowrap:!0, readonly:!0, selected:!0}, L = {link:!0, meta:!0, br:!0, hr:!0, img:!0, input:!0, area:!0, base:!0, col:!0, embed:!0, keygen:!0, param:!0, source:!0}, M = {p:!0, dt:!0, dd:!0, li:!0, option:!0, thead:!0, tfoot:!0, th:!0, tr:!0, td:!0, rt:!0, rp:!0, optgroup:!0, caption:!0, colgroup:!0, col:!0}, N = {a:!0, audio:!0, del:!0, ins:!0, map:!0, noscript:!0, video:!0}, 
    O = {polyline:!0, rect:!0, line:!0, "v:polyline":!0, "v:rect":!0, "v:line":!0}, P = {script:!0, style:!0, plaintext:!0, xmp:!0, noscript:!0}, B, C;
    DEFINE_TYTE__USE_RENDER_SSR && (h.prototype.renderSSR = function() {
      return B ? this.text : F(this.text);
    }, g.prototype.renderSSR = function() {
      var a = [], b = this._childNodes, c = 0, d;
      if (b) {
        for (d = b.length; c < d; ++c) {
          a[c] = b[c].renderSSR();
        }
      }
      return a.join("");
    }, f.prototype.renderSSR = function() {
      var a = this._tagName, b = ["<", a], c = 1, d = this._attrs, e, k, l;
      if (d) {
        for (n in d) {
          var m = d[n];
          if (null != m) {
            var n = G[n] || n;
            K[n] ? !1 !== m && (b[++c] = " " + n) : ("style" === n && (m = this.getCSSText()), b[++c] = " " + n + '="' + F(m).split('"').join('\\"') + '"');
          }
        }
      }
      B ||= e = !!P[a];
      C ||= k = !!N[a];
      this._childNodes ? (b[++c] = ">", b[++c] = l = g.prototype.renderSSR.call(this)) : b[++c] = O[a] ? "/>" : ">";
      e && (B = !1);
      k && (C = !1);
      if (!M[a] || C) {
        if (l || !L[a]) {
          b[++c] = "</" + a + ">";
        }
      }
      return b.join("");
    });
    var A, x;
    DEFINE_TYTE__USE_RENDER_DOM && (h.prototype.renderDOM = function() {
      var a = document.createTextNode(this.text);
      if (x) {
        x.appendChild(a);
      } else {
        return a;
      }
    }, g.prototype.renderDOM = function() {
      var a = document.createDocumentFragment(), b = this._childNodes, c = 0, d;
      A = a;
      if (b) {
        for (d = b.length; c < d; ++c) {
          x = a, b[c].renderDOM();
        }
      }
      A = x = null;
      return a;
    }, f.prototype.renderDOM = function() {
      var a = document.createElement(this._tagName), b = this._attrs, c, d = this._childNodes, e = 0;
      for (c in b) {
        "style" === c ? a.style.cssText = this.getCSSText() : a.setAttribute(G[c] || c, b[c]);
      }
      A ||= a;
      if (d) {
        for (b = d.length; e < b; ++e) {
          x = a, d[e].renderDOM();
        }
        x = null;
      }
      if (A === a) {
        return A = null, a;
      }
    });
  })();
})(void 0);

