var DEFINE_TYTE__DEBUG = !0, DEFINE_TYTE__EXPORT = !0, DEFINE_TYTE__USE_RENDER_SSR = !0, DEFINE_TYTE__USE_RENDER_DOM = !0, TYTE_NODE_TYPE = {ELEMENT_NODE:1, TEXT_NODE:3, DOCUMENT_FRAGMENT_NODE:DEFINE_TYTE__DEBUG ? 11 : 2};
(function(P) {
  function H(q) {
    var t = {Text:g, DocumentFragment:f};
    if (q) {
      q = q.split(",");
      for (var n = 0, x = q.length, r; n < x; ++n) {
        (r = q[n]) && (t[r] = C(r));
      }
    }
    return t;
  }
  function e(q, t) {
  }
  var C, g, f;
  DEFINE_TYTE__EXPORT && (module.exports = H);
  (function() {
    function q(a, b) {
      if (!0 === b(a)) {
        return !0;
      }
      a = a._childNodes;
      var c = 0, d;
      if (a) {
        for (d = a.length; c < d; ++c) {
          if (q(a[c], b)) {
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
    function n(a, b) {
      if (a.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && !0 === b(a)) {
        return !0;
      }
      a = a._childNodes;
      var c = 0, d;
      if (a) {
        for (d = a.length; c < d; ++c) {
          var h = a[c];
          if (h.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && (!0 === b(h) || h._childNodes && n(h, b))) {
            return !0;
          }
        }
      }
    }
    function x(a, b) {
      a && a.constructor === b || (a = new b());
      return a;
    }
    function r(a, b) {
      for (var c = 0, d = a.length, h; c < d; ++c) {
        h = a[c];
        var l = b, p = h.parent;
        p && p._childNodes.splice(u(h), 1);
        h.parent = l;
      }
    }
    function u(a) {
      var b = a.parent;
      return b ? (b = b._childNodes, b.indexOf(a)) : -1;
    }
    function y(a) {
      for (var b = a.length, c; b;) {
        c = a[--b], "string" === typeof c ? a[b] = new g(c) : c.nodeType === TYTE_NODE_TYPE.DOCUMENT_FRAGMENT && (c = c._childNodes) && c.length && (c.unshift(b, 0), a.splice.apply(a, c));
      }
      return a;
    }
    function v(a) {
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
      function b(d, h) {
        var l = arguments, p = x(this, b);
        l = v(l);
        var m = l[0], k;
        if (m && "object" === typeof m && (!m || m.walkNodes !== g.prototype.walkNodes)) {
          for (k in m) {
            p.setAttr(k, m[k]);
          }
          l.shift();
        }
        l.length && p.appendNode.apply(p, l);
        return p;
      }
      var c = new e();
      c._tagName = a;
      c.constructor = b;
      b.prototype = c;
      return b;
    }
    g = function(a) {
      var b = x(this, g);
      b.text = a;
      return b;
    };
    f = function(a) {
      var b = x(this, f);
      return b.appendNode.apply(b, v(arguments));
    };
    g.prototype.walkNodes = e.prototype.walkNodes = f.prototype.walkNodes = function(a) {
      q(this, a);
      return this;
    };
    g.prototype.walkTextNodes = e.prototype.walkTextNodes = f.prototype.walkTextNodes = function(a) {
      t(this, a);
      return this;
    };
    e.prototype.walkElements = f.prototype.walkNodes = function(a) {
      n(this, a);
      return this;
    };
    var F = {className:"class", htmlFor:"for"};
    g.prototype.nodeType = TYTE_NODE_TYPE.TEXT_NODE;
    g.prototype.text = "";
    g.prototype.parent = null;
    g.prototype.getPrev = function() {
      var a = this.parent;
      return a && a._childNodes[u(this) - 1] || null;
    };
    g.prototype.setPrev = function(a) {
      var b = this.parent;
      if (b) {
        var c = y(v(arguments));
        r(c, b);
        c.unshift(u(this), 0);
        b = b._childNodes;
        b.splice.apply(b, c);
      }
      return this;
    };
    g.prototype.getNext = function() {
      var a = this.parent;
      return a && a._childNodes[u(this) + 1] || null;
    };
    g.prototype.setNext = function(a) {
      var b = this.parent;
      if (b) {
        var c = b._childNodes;
        var d = u(this) + 1;
        var h = y(v(arguments));
        r(h, b);
        d < c.length ? (h.unshift(d, 0), c.splice.apply(c, h)) : c.push.apply(c, h);
      }
      return this;
    };
    g.prototype.swap = function(a) {
      var b = this.parent;
      if (b) {
        var c = y(v(arguments));
        r(c, b);
        c.unshift(u(this), 1);
        b = b._childNodes;
        b.splice.apply(b, c);
        this.parent = null;
      }
      return this;
    };
    g.prototype.remove = function() {
      var a = this.parent;
      a && (a._childNodes.splice(u(this), 1), this.parent = null);
      return this;
    };
    g.prototype.clone = function(a) {
      return new g(this.text);
    };
    f.prototype._childNodes = null;
    f.prototype.nodeType = TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE;
    f.prototype.parent = null;
    f.prototype.getElementByID = function(a) {
      var b = null;
      n(this, function(c) {
        if (c.getAttr("id") === a) {
          return b = c, !0;
        }
      });
      return b;
    };
    f.prototype.getElementListByTag = function(a) {
      var b = [], c = -1;
      n(this, function(d) {
        d._tagName === a && (b[++c] = d);
      });
      return b;
    };
    f.prototype.getElementListByClass = function(a) {
      var b = [], c = -1;
      n(this, function(d) {
        d.hasClass(a) && (b[++c] = d);
      });
      return b;
    };
    f.prototype.getElementListByName = function(a) {
      var b = [], c = -1;
      n(this, function(d) {
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
      var b = this._childNodes = this._childNodes || [], c = y(v(arguments));
      r(c, this);
      b.push.apply(b, c);
      return this;
    };
    f.prototype.prependNode = function(a) {
      var b = this._childNodes = this._childNodes || [], c = y(v(arguments));
      r(c, this);
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
    e.prototype.getPrev = g.prototype.getPrev;
    e.prototype.setPrev = g.prototype.setPrev;
    e.prototype.getNext = g.prototype.getNext;
    e.prototype.setNext = g.prototype.setNext;
    e.prototype.swap = g.prototype.swap;
    e.prototype.remove = g.prototype.remove;
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
    e.prototype.getCSSText = function() {
      var a = [], b = -1, c = this._attrs && this._attrs.style, d;
      for (d in c) {
        a[++b] = d + ":" + c[d];
      }
      return a.join(";");
    };
    e.prototype.setCSSText = function(a) {
      a = a.split(";");
      var b = 0, c;
      for (c = a.length; b < c; ++b) {
        var d = a[b];
        var h = d.split(":")[0].split(" ").join("");
        this.setStyle(h, d.substr(d.indexOf(":") + 1));
      }
      return this;
    };
    var J = {checked:!0, compact:!0, declare:!0, defer:!0, disabled:!0, ismap:!0, multiple:!0, nohref:!0, noresize:!0, noshade:!0, nowrap:!0, readonly:!0, selected:!0}, K = {link:!0, meta:!0, br:!0, hr:!0, img:!0, input:!0, area:!0, base:!0, col:!0, embed:!0, keygen:!0, param:!0, source:!0}, L = {p:!0, dt:!0, dd:!0, li:!0, option:!0, thead:!0, tfoot:!0, th:!0, tr:!0, td:!0, rt:!0, rp:!0, optgroup:!0, caption:!0, colgroup:!0, col:!0}, M = {a:!0, audio:!0, del:!0, ins:!0, map:!0, noscript:!0, video:!0}, 
    N = {polyline:!0, rect:!0, line:!0, "v:polyline":!0, "v:rect":!0, "v:line":!0}, O = {script:!0, style:!0, plaintext:!0, xmp:!0, noscript:!0}, A, B;
    DEFINE_TYTE__USE_RENDER_SSR && (g.prototype.renderSSR = function() {
      return A ? this.text : E(this.text);
    }, f.prototype.renderSSR = function() {
      var a = [], b = this._childNodes, c = 0, d;
      if (b) {
        for (d = b.length; c < d; ++c) {
          a[c] = b[c].renderSSR();
        }
      }
      return a.join("");
    }, e.prototype.renderSSR = function() {
      var a = this._tagName, b = ["<", a], c = 1, d = this._attrs, h, l, p;
      if (d) {
        for (k in d) {
          var m = d[k];
          if (null != m) {
            var k = F[k] || k;
            J[k] ? !1 !== m && (b[++c] = " " + k) : ("style" === k && (m = this.getCSSText()), b[++c] = " " + k + '="' + E(m).split('"').join('\\"') + '"');
          }
        }
      }
      A ||= h = !!O[a];
      B ||= l = !!M[a];
      this._childNodes ? (b[++c] = ">", b[++c] = p = f.prototype.renderSSR.call(this)) : b[++c] = N[a] ? "/>" : ">";
      h && (A = !1);
      l && (B = !1);
      if (!L[a] || B) {
        if (p || !K[a]) {
          b[++c] = "</" + a + ">";
        }
      }
      return b.join("");
    });
    var z, w;
    DEFINE_TYTE__USE_RENDER_DOM && (g.prototype.renderDOM = function() {
      var a = document.createTextNode(this.text);
      if (w) {
        w.appendChild(a);
      } else {
        return a;
      }
    }, f.prototype.renderDOM = function() {
      var a = document.createDocumentFragment(), b = this._childNodes, c = 0, d;
      z = a;
      if (b) {
        for (d = b.length; c < d; ++c) {
          w = a, b[c].renderDOM();
        }
      }
      z = w = null;
      return a;
    }, e.prototype.renderDOM = function() {
      var a = document.createElement(this._tagName), b = this._attrs, c, d = this._childNodes, h = 0;
      for (c in b) {
        "style" === c ? a.style.cssText = this.getCSSText() : a.setAttribute(F[c] || c, b[c]);
      }
      z ||= a;
      if (d) {
        for (b = d.length; h < b; ++h) {
          w = a, d[h].renderDOM();
        }
        w = null;
      }
      if (z === a) {
        return z = null, a;
      }
    });
  })();
})(void 0);

