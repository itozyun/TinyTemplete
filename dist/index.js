var DEFINE_TYTE__DEBUG = !0, DEFINE_TYTE__EXPORT = !0, DEFINE_TYTE__DROP_INLINE_STYLE = !1, DEFINE_TYTE__DROP_DOCUMET_FRAGMENT = !1, DEFINE_TYTE__USE_VML = !1, DEFINE_TYTE__USE_RENDER_SSR = !0, DEFINE_TYTE__USE_RENDER_DOM = !0, TYTE_NODE_TYPE = {ELEMENT_NODE:1, DOCUMENT_FRAGMENT_NODE:DEFINE_TYTE__DEBUG ? 11 : 2, TEXT_NODE:3, DYNAMIC_NODE:4};
(function(S) {
  function e(z, A) {
  }
  var w, g, f, m;
  (function() {
    function z(a, b, c) {
      var d = [], h = -1, l;
      for (l in a) {
        var k = a[l];
        "function" === typeof k && (k = k.call(b, c, l));
        null != k && (d[++h] = l + ":" + k);
      }
      return d.join(";");
    }
    function A(a, b) {
      if (!0 === b(a)) {
        return !0;
      }
      a = a._childNodes;
      var c = 0, d;
      if (a) {
        for (d = a.length; c < d; ++c) {
          if (A(a[c], b)) {
            return !0;
          }
        }
      }
    }
    function B(a, b) {
      if (a.nodeType === TYTE_NODE_TYPE.TEXT_NODE) {
        if (!0 === b(a)) {
          return !0;
        }
      } else {
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
    }
    function u(a, b) {
      if (a.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && !0 === b(a)) {
        return !0;
      }
      a = a._childNodes;
      var c = 0, d;
      if (a) {
        for (d = a.length; c < d; ++c) {
          var h = a[c];
          if (h.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && u(h, b)) {
            return !0;
          }
        }
      }
    }
    function x(a, b) {
      a && a.constructor === b || (a = new b());
      return a;
    }
    function t(a) {
      var b = a.parent;
      return b ? (b = b._childNodes, b.indexOf(a)) : -1;
    }
    function v(a, b) {
      for (var c = a.length, d, h; c;) {
        d = a[--c], "string" === typeof d || "number" === typeof d ? a[c] = new g(d) : d.nodeType === TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE && (d = d._childNodes) && d.length && (d.unshift(c, 1), a.splice.apply(a, d));
      }
      for (c = a.length; c;) {
        d = a[--c], (h = d.parent) && h._childNodes.splice(t(d), 1), d.parent = b;
      }
      return a;
    }
    function r(a) {
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
    function C(a) {
      return a.split("<").join("&lt;").split(">").join("&gt;");
    }
    function I(a) {
      function b(d, h) {
        var l = arguments, k = x(this, b);
        l = r(l);
        var p = l[0], n;
        if (p && "object" === typeof p && (!p || p.walkNodes !== g.prototype.walkNodes && p.getPrev !== g.prototype.getPrev)) {
          for (n in p) {
            k.setAttr(n, p[n]);
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
      function b() {
        var d = arguments, h = x(this, b);
        h.initialParams = r(d);
        return h;
      }
      var c = new m();
      c._renderer = a;
      c.constructor = b;
      b.prototype = c;
      return b;
    }
    function F(a) {
      var b = [], c = this._childNodes, d = 0, h;
      if (c) {
        for (h = c.length; d < h; ++d) {
          b[d] = c[d].renderSSR(a);
        }
      }
      return b.join("");
    }
    w = function(a) {
      if ("function" === typeof a) {
        return K(a);
      }
      if ("string" === typeof a) {
        return L(a);
      }
    };
    DEFINE_TYTE__EXPORT && (module.exports = w);
    g = function(a) {
      var b = x(this, g);
      b.text = "" + a;
      return b;
    };
    w.Text = g;
    f = function(a) {
      var b = x(this, f);
      return b.appendNode.apply(b, r(arguments));
    };
    w.DocumentFragment = f;
    m = function(a) {
    };
    g.prototype.walkNodes = e.prototype.walkNodes = f.prototype.walkNodes = function(a) {
      A(this, a);
      return this;
    };
    g.prototype.walkTextNodes = e.prototype.walkTextNodes = f.prototype.walkTextNodes = function(a) {
      B(this, a);
      return this;
    };
    e.prototype.walkElements = f.prototype.walkNodes = function(a) {
      u(this, a);
      return this;
    };
    var G = {className:"class", htmlFor:"for"};
    g.prototype.nodeType = TYTE_NODE_TYPE.TEXT_NODE;
    g.prototype.text = "";
    g.prototype.parent = null;
    g.prototype.getPrev = function() {
      var a = this.parent;
      return a && a._childNodes[t(this) - 1] || null;
    };
    g.prototype.setPrev = function(a) {
      var b = this.parent;
      if (b) {
        var c = v(r(arguments), b);
        c.unshift(t(this), 0);
        b = b._childNodes;
        b.splice.apply(b, c);
      }
      return this;
    };
    g.prototype.getNext = function() {
      var a = this.parent;
      return a && a._childNodes[t(this) + 1] || null;
    };
    g.prototype.setNext = function(a) {
      var b = this.parent;
      if (b) {
        var c = b._childNodes;
        var d = t(this) + 1;
        b = v(r(arguments), b);
        d < c.length ? (b.unshift(d, 0), c.splice.apply(c, b)) : c.push.apply(c, b);
      }
      return this;
    };
    g.prototype.swap = function(a) {
      var b = this.parent;
      if (b) {
        var c = v(r(arguments), b);
        c.unshift(t(this), 1);
        b = b._childNodes;
        b.splice.apply(b, c);
        this.parent = null;
      }
      return this;
    };
    g.prototype.remove = function() {
      var a = this.parent;
      a && (a._childNodes.splice(t(this), 1), this.parent = null);
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
      u(this, function(c) {
        if (c.getAttr("id") === a) {
          return b = c, !0;
        }
      });
      return b;
    };
    f.prototype.getElementListByTag = function(a) {
      var b = [], c = -1;
      u(this, function(d) {
        d._tagName === a && (b[++c] = d);
      });
      return b;
    };
    f.prototype.getElementListByClass = function(a) {
      var b = [], c = -1;
      u(this, function(d) {
        d.hasClass(a) && (b[++c] = d);
      });
      return b;
    };
    f.prototype.getElementListByName = function(a) {
      var b = [], c = -1;
      u(this, function(d) {
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
      var b = this._childNodes = this._childNodes || [], c = v(r(arguments), this);
      b.push.apply(b, c);
      return this;
    };
    f.prototype.prependNode = function(a) {
      var b = this._childNodes = this._childNodes || [], c = v(r(arguments), this);
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
      B(this, function(b) {
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
    var L = function(a) {
      return H[a] = H[a] || I(a);
    };
    var H = {};
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
      b = this._attrs ? new b(E(this._attrs)) : new b();
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
          var h = d.split(":")[0].split(" ").join("");
          this.setStyle(h, d.substr(d.indexOf(":") + 1));
        }
      }
      return this;
    });
    var K = function(a) {
      return J(a);
    };
    m.prototype._renderer = null;
    m.prototype.initialParams = null;
    m.prototype.nodeType = TYTE_NODE_TYPE.DYNAMIC_NODE;
    m.prototype.parent = null;
    m.prototype.getPrev = g.prototype.getPrev;
    m.prototype.setPrev = g.prototype.setPrev;
    m.prototype.getNext = g.prototype.getNext;
    m.prototype.setNext = g.prototype.setNext;
    m.prototype.swap = g.prototype.swap;
    m.prototype.remove = g.prototype.remove;
    m.prototype.clone = function(a) {
      a = new this.constructor();
      a.initialParams = this.initialParams;
      return a;
    };
    var M = {checked:!0, compact:!0, declare:!0, defer:!0, disabled:!0, ismap:!0, multiple:!0, nohref:!0, noresize:!0, noshade:!0, nowrap:!0, readonly:!0, selected:!0}, N = {link:!0, meta:!0, br:!0, hr:!0, img:!0, input:!0, area:!0, base:!0, col:!0, embed:!0, keygen:!0, param:!0, source:!0}, O = {p:!0, dt:!0, dd:!0, li:!0, option:!0, thead:!0, tfoot:!0, th:!0, tr:!0, td:!0, rt:!0, rp:!0, optgroup:!0, caption:!0, colgroup:!0, col:!0}, P = {a:!0, audio:!0, del:!0, ins:!0, map:!0, noscript:!0, video:!0}, 
    Q = DEFINE_TYTE__USE_VML ? {polyline:!0, rect:!0, line:!0, path:!0, "v:polyline":!0, "v:rect":!0, "v:line":!0} : {polyline:!0, rect:!0, line:!0, path:!0}, R = {script:!0, style:!0, plaintext:!0, xmp:!0, noscript:!0}, y, D;
    DEFINE_TYTE__USE_RENDER_SSR && (g.prototype.renderSSR = function(a) {
      return y ? this.text : C(this.text);
    }, f.prototype.renderSSR = F, e.prototype.renderSSR = function(a) {
      var b = this._tagName, c = ["<", b], d = 1, h = this._attrs, l, k, p;
      if (h) {
        for (q in h) {
          var n = h[q];
          "function" === typeof n && (n = n.call(this, a, q));
          if (null != n) {
            var q = G[q] || q;
            M[q] ? !1 !== n && (c[++d] = " " + q) : (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== q || "object" !== typeof n || (n = z(n, this, a)), c[++d] = " " + q + '="' + C("" + n).split('"').join('\\"') + '"');
          }
        }
      }
      y ||= l = !!R[b];
      D ||= k = !!P[b];
      this._childNodes ? (c[++d] = ">", c[++d] = p = F.call(this, a)) : c[++d] = Q[b] ? "/>" : ">";
      l && (y = !1);
      k && (D = !1);
      if (!O[b] || D) {
        if (p || !N[b]) {
          c[++d] = "</" + b + ">";
        }
      }
      return c.join("");
    }, m.prototype.renderSSR = function(a) {
      var b = this._renderer(a);
      return "string" === typeof b ? y ? b : C(b) : "number" === typeof b ? "" + b : null != b ? b.renderSSR(a) : "";
    });
    DEFINE_TYTE__USE_RENDER_DOM && (g.prototype.renderDOM = function(a) {
      return document.createTextNode(this.text);
    }, f.prototype.renderDOM = function(a) {
      var b = document.createDocumentFragment(), c = this._childNodes, d = 0, h, l;
      if (c) {
        for (h = c.length; d < h; ++d) {
          (l = c[d].renderDOM(a)) && b.append(l);
        }
      }
      return b;
    }, e.prototype.renderDOM = function(a) {
      var b = document.createElement(this._tagName), c = this._attrs, d, h = this._childNodes, l = 0;
      for (d in c) {
        var k = c[d];
        "function" === typeof k && (k = k.call(this, a, d));
        null != k && (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== d ? b.setAttribute(G[d] || d, "" + k) : b.style.cssText = "object" === typeof k ? z(k, this, a) : k);
      }
      if (h) {
        for (c = h.length; l < c; ++l) {
          (d = h[l].renderDOM(a)) && b.appendChild(d);
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

