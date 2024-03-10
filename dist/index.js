var DEFINE_TYTE__DEBUG = !0, DEFINE_TYTE__EXPORT = !0, DEFINE_TYTE__DROP_INLINE_STYLE = !1, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT = !1, DEFINE_TYTE__USE_RENDER_SSR = !0, DEFINE_TYTE__USE_RENDER_DOM = !0, DEFINE_TYTE__USE_RENDER_HTMLJSON = !0, DEFINE_TYTE__FROM_VIRTUAL_DOM = !1, TYTE_NODE_TYPE = {ELEMENT_NODE:1, DOCUMENT_FRAGMENT_NODE:DEFINE_TYTE__DEBUG ? 11 : 2, TEXT_NODE:3, DYNAMIC_NODE:4};
(function(pa) {
  function e(A, B) {
  }
  var y, g, l, q;
  (function() {
    function A(b, a, c) {
      var d = [], f = -1, k;
      for (k in b) {
        var h = b[k];
        "function" === typeof h && (h = h.call(a, c, k));
        if (null != h) {
          for (var m = ++f, n, p = [], r = k.split(""), G = r.length; G;) {
            n = r[--G], "A" <= n && "Z" >= n && (n = "-" + n.toLowerCase()), p[G] = n;
          }
          n = p.join("");
          d[m] = n + ":" + h;
        }
      }
      return d.join(";");
    }
    function B(b, a) {
      if (3 === a.nodeType && b.nodeType !== TYTE_NODE_TYPE.TEXT_NODE) {
        throw "nodeType missmatch!";
      }
      if (1 === a.nodeType) {
        if (b.nodeType !== TYTE_NODE_TYPE.ELEMENT_NODE) {
          throw "nodeType missmatch!";
        }
        if (b._tagName.toUpperCase() !== a.tagName.toUpperCase()) {
          throw "tagName missmatch!";
        }
        if (!b.getChildNodes()) {
          if (a.childNodes.length && (1 !== a.childNodes.length || 3 !== a.childNodes[0].nodeType)) {
            throw "childNodes.length missmatch!";
          }
        } else if (b.getChildNodes().length < a.childNodes.length) {
          throw "childNodes.length missmatch!";
        }
      }
    }
    function H(b, a, c, d) {
      a = a._childNodes;
      var f = 0, k;
      if (a) {
        if (DEFINE_TYTE__USE_RENDER_DOM && d) {
          var h = a.length;
          for (k = d.childNodes; f < h; ++f) {
            var m = a[f];
            var n = k[f];
            if (m.nodeType === TYTE_NODE_TYPE.TEXT_NODE && (!n || 3 !== n.nodeType)) {
              var p = document.createTextNode("");
              n ? d.insertBefore(p, n) : d.appendChild(p);
              n = p;
            }
            if (b(m, c, n)) {
              return !0;
            }
          }
        } else {
          for (h = a.length; f < h; ++f) {
            if (b(a[f], c)) {
              return !0;
            }
          }
        }
      }
    }
    function I(b, a, c) {
      DEFINE_TYTE__DEBUG && c && B(b, c);
      return !0 === (DEFINE_TYTE__USE_RENDER_DOM ? a(b, c) : a(b)) ? !0 : H(I, b, a, c);
    }
    function C(b, a, c) {
      DEFINE_TYTE__DEBUG && c && B(b, c);
      if (b.nodeType === TYTE_NODE_TYPE.TEXT_NODE) {
        if (!0 === (DEFINE_TYTE__USE_RENDER_DOM ? a(b, c) : a(b))) {
          return !0;
        }
      } else {
        return H(C, b, a, c);
      }
    }
    function v(b, a, c) {
      DEFINE_TYTE__DEBUG && c && B(b, c);
      return b.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && !0 === (DEFINE_TYTE__USE_RENDER_DOM ? a(b, c) : a(b)) ? !0 : H(v, b, a, c);
    }
    function D(b, a) {
      b && b.constructor === a || (b = new a());
      return b;
    }
    function w(b) {
      var a = b.parent;
      return a ? (a = a._childNodes, a.indexOf(b)) : -1;
    }
    function z(b, a) {
      for (var c = b.length, d, f; c;) {
        d = b[--c], "string" === typeof d || "number" === typeof d ? b[c] = new g(d) : DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || d.nodeType !== TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE || (d = d._childNodes) && d.length && (d.unshift(c, 1), b.splice.apply(b, d));
      }
      for (c = b.length; c;) {
        d = b[--c], (f = d.parent) && f._childNodes.splice(w(d), 1), d.parent = a;
      }
      return b;
    }
    function u(b) {
      return Array.prototype.slice.call(b);
    }
    function N(b) {
      var a = null, c;
      if (b) {
        for (c in a = {}, b) {
          var d = b[c];
          a[c] = d && "object" === typeof d ? N(d) : d;
        }
      }
      return a;
    }
    function J(b) {
      return b.split("<").join("&lt;").split(">").join("&gt;");
    }
    function O(b, a) {
      DEFINE_TYTE__USE_RENDER_DOM ? v(this, b, a) : v(this, b);
      return this;
    }
    function P(b) {
      var a = null;
      v(this, function(c) {
        if (c.getAttr("id") === b) {
          return a = c, !0;
        }
      });
      return a;
    }
    function Q(b) {
      var a = [], c = -1;
      v(this, function(d) {
        d._tagName === b && (a[++c] = d);
      });
      return a;
    }
    function R(b) {
      var a = [], c = -1;
      v(this, function(d) {
        d.hasClass(b) && (a[++c] = d);
      });
      return a;
    }
    function S(b) {
      var a = [], c = -1;
      v(this, function(d) {
        d.getAttr("name") === b && (a[++c] = d);
      });
      return a;
    }
    function T() {
      var b = this._childNodes;
      return b && b[0] || null;
    }
    function U() {
      var b = this._childNodes;
      return b && b[b.length - 1] || null;
    }
    function V() {
      return this._childNodes;
    }
    function W(b) {
      var a = this._childNodes = this._childNodes || [], c = z(u(arguments), this);
      a.push.apply(a, c);
      return this;
    }
    function X(b) {
      var a = this._childNodes = this._childNodes || [], c = z(u(arguments), this);
      c.unshift(0, 0);
      a.splice.apply(a, c);
      return this;
    }
    function Y() {
      var b = this._childNodes, a = 0, c;
      if (b) {
        for (c = b.length; a < c; ++a) {
          var d = b[a];
          d.parent = null;
        }
        b.length = 0;
      }
      return this;
    }
    function Z() {
      var b = "";
      C(this, function(a) {
        b += a.text;
      });
      return b;
    }
    function aa(b) {
      var a = this._childNodes;
      a && 1 === a.length && a[0].nodeType === TYTE_NODE_TYPE.TEXT_NODE ? a[0].text = b : (a && this.empty(), this.appendNode(b));
      return this;
    }
    function fa(b) {
      function a(d, f) {
        var k = arguments, h = D(this, a);
        k = u(k);
        var m = k[0], n;
        if (m && "object" === typeof m && (!m || m.walkNodes !== g.prototype.walkNodes && m.getPrev !== g.prototype.getPrev)) {
          for (n in m) {
            h.setAttr(n, m[n]);
          }
          k.shift();
        }
        k.length && h.appendNode.apply(h, k);
        return h;
      }
      var c = new e();
      c._tagName = b;
      c.constructor = a;
      a.prototype = c;
      return a;
    }
    function ha(b) {
      function a() {
        var d = arguments, f = D(this, a);
        f.initialParams = u(d);
        return f;
      }
      var c = new q();
      c._renderer = b;
      c.constructor = a;
      a.prototype = c;
      return a;
    }
    function ba(b) {
      var a = [], c = this._childNodes, d = 0, f;
      if (c) {
        for (f = c.length; d < f; ++d) {
          a[d] = c[d].renderSSR(b);
        }
      }
      return a.join("");
    }
    function ca(b) {
      var a = [], c = this._childNodes, d = 0, f;
      if (c) {
        for (f = c.length; d < f; ++d) {
          a[d] = c[d].renderHTMLJSON(b);
        }
      }
      return a;
    }
    function E(b, a) {
      var c = a;
      b && ("string" === typeof a ? c = [3, a] : c.unshift(11), t = !0);
      return c;
    }
    y = function(b) {
      if ("function" === typeof b) {
        return ia(b);
      }
      if ("string" === typeof b) {
        return ja(b);
      }
    };
    DEFINE_TYTE__EXPORT && (module.exports = y);
    DEFINE_TYTE__FROM_VIRTUAL_DOM && (y.fromVDOM = function(b) {
    });
    var da = {className:"class", htmlFor:"for"};
    g = function(b) {
      var a = D(this, g);
      a.text = "" + b;
      return a;
    };
    y.Text = g;
    g.prototype.nodeType = TYTE_NODE_TYPE.TEXT_NODE;
    g.prototype.text = "";
    g.prototype.parent = null;
    g.prototype.walkNodes = function(b, a) {
      DEFINE_TYTE__USE_RENDER_DOM ? I(this, b, a) : I(this, b);
      return this;
    };
    g.prototype.walkTextNodes = function(b, a) {
      DEFINE_TYTE__USE_RENDER_DOM ? C(this, b, a) : C(this, b);
      return this;
    };
    g.prototype.getPrev = function() {
      var b = this.parent;
      return b && b._childNodes[w(this) - 1] || null;
    };
    g.prototype.setPrev = function(b) {
      var a = this.parent;
      if (a) {
        var c = z(u(arguments), a);
        c.unshift(w(this), 0);
        a = a._childNodes;
        a.splice.apply(a, c);
      }
      return this;
    };
    g.prototype.getNext = function() {
      var b = this.parent;
      return b && b._childNodes[w(this) + 1] || null;
    };
    g.prototype.setNext = function(b) {
      var a = this.parent;
      if (a) {
        var c = a._childNodes;
        var d = w(this) + 1;
        a = z(u(arguments), a);
        d < c.length ? (a.unshift(d, 0), c.splice.apply(c, a)) : c.push.apply(c, a);
      }
      return this;
    };
    g.prototype.swap = function(b) {
      var a = this.parent;
      if (a) {
        var c = z(u(arguments), a);
        c.unshift(w(this), 1);
        a = a._childNodes;
        a.splice.apply(a, c);
        this.parent = null;
      }
      return this;
    };
    g.prototype.remove = function() {
      var b = this.parent;
      b && (b._childNodes.splice(w(this), 1), this.parent = null);
      return this;
    };
    g.prototype.clone = function(b) {
      return new g(this.text);
    };
    DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (l = function(b) {
      var a = D(this, l);
      return a.appendNode.apply(a, u(arguments));
    }, y.DocumentFragment = l, l.prototype._childNodes = null, l.prototype.nodeType = TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE, l.prototype.parent = null, l.prototype.walkNodes = g.prototype.walkNodes, l.prototype.walkTextNodes = g.prototype.walkTextNodes, l.prototype.walkNodes = O, l.prototype.getElementByID = P, l.prototype.getElementListByTag = Q, l.prototype.getElementListByClass = R, l.prototype.getElementListByName = S, l.prototype.getFirstChild = T, l.prototype.getLastChild = U, l.prototype.getChildNodes = 
    V, l.prototype.appendNode = W, l.prototype.prependNode = X, l.prototype.empty = Y, l.prototype.getTextContent = Z, l.prototype.setTextContent = aa, l.prototype.clone = function(b) {
      var a = new l();
      if (b) {
        b = this._childNodes;
        var c = 0, d;
        if (b) {
          for (d = b.length; c < d; ++c) {
            a.appendNode(b[c].clone(!0));
          }
        }
      }
      return a;
    });
    q = function(b) {
    };
    var ja = function(b) {
      return ea[b] = ea[b] || fa(b);
    };
    var ea = {};
    e.prototype._attrs = null;
    e.prototype._childNodes = null;
    e.prototype.nodeType = TYTE_NODE_TYPE.ELEMENT_NODE;
    e.prototype.parent = null;
    e.prototype.walkNodes = g.prototype.walkNodes;
    e.prototype.walkTextNodes = g.prototype.walkTextNodes;
    e.prototype.walkElements = O;
    e.prototype.getElementByID = P;
    e.prototype.getElementListByTag = Q;
    e.prototype.getElementListByClass = R;
    e.prototype.getElementListByName = S;
    e.prototype.getFirstChild = T;
    e.prototype.getLastChild = U;
    e.prototype.getChildNodes = V;
    e.prototype.appendNode = W;
    e.prototype.prependNode = X;
    e.prototype.empty = Y;
    e.prototype.getPrev = g.prototype.getPrev;
    e.prototype.setPrev = g.prototype.setPrev;
    e.prototype.getNext = g.prototype.getNext;
    e.prototype.setNext = g.prototype.setNext;
    e.prototype.swap = g.prototype.swap;
    e.prototype.remove = g.prototype.remove;
    e.prototype.getTextContent = Z;
    e.prototype.setTextContent = aa;
    e.prototype.clone = function(b) {
      var a = this.constructor;
      a = this._attrs ? new a(N(this._attrs)) : new a();
      if (b) {
        b = this._childNodes;
        var c = 0, d;
        if (b) {
          for (d = b.length; c < d; ++c) {
            a.appendNode(b[c].clone(!0));
          }
        }
      }
      return a;
    };
    e.prototype.getAttr = function(b) {
      var a = this._attrs;
      b = a ? a[b] : null;
      return null != b ? b : null;
    };
    e.prototype.setAttr = function(b, a) {
      if (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== b || "string" !== typeof a) {
        var c = this._attrs = this._attrs || {};
        null != a ? c[b] = a : delete c[b];
      } else {
        this.setCSSText(a);
      }
      return this;
    };
    e.prototype.hasAttr = function(b) {
      var a = this._attrs;
      return a ? null != a[b] : !1;
    };
    e.prototype.removeAttr = function(b) {
      var a = this._attrs;
      a && delete a[b];
      return this;
    };
    e.prototype.hasClass = function(b) {
      return -1 !== (" " + this.getClass() + " ").indexOf(" " + b + " ");
    };
    e.prototype.getClass = function() {
      return this.getAttr("className") || "";
    };
    e.prototype.setClass = function(b) {
      return this.setAttr("className", b);
    };
    e.prototype.addClass = function(b) {
      if (b && !this.hasClass(b)) {
        var a = this.getClass();
        this.setClass(a ? a + " " + b : b);
      }
      return this;
    };
    e.prototype.removeClass = function(b) {
      if (b && this.hasClass(b)) {
        var a = this.getClass().split(" ");
        a.splice(a.indexOf(b), 1);
        this.setClass(a.join(" "));
      }
      return this;
    };
    e.prototype.toggleClass = function(b, a) {
      return !0 === a || (!1 === a ? 0 : !this.hasClass(b)) ? this.addClass(b) : this.removeClass(b);
    };
    DEFINE_TYTE__DROP_INLINE_STYLE || (e.prototype.getStyle = function(b) {
      var a = this._attrs && this._attrs.style;
      b = a ? a[b] : "";
      return null == b ? "" : b;
    }, e.prototype.setStyle = function(b, a) {
      var c = this._attrs, d = c && c.style;
      d || (d = {}, c = this._attrs = c || {}, c.style = d);
      d[b] = a;
      return this;
    }, e.prototype.removeStyle = function(b) {
      var a = this._attrs && this._attrs.style;
      a && delete a[b];
      return this;
    }, e.prototype.setCSSText = function(b) {
      if (b) {
        b = b.split(";");
        var a = 0, c;
        for (c = b.length; a < c; ++a) {
          var d = b[a];
          var f = d.split(":")[0].split(" ").join("");
          this.setStyle(f, d.substr(d.indexOf(":") + 1));
        }
      }
      return this;
    });
    var ia = function(b) {
      return ha(b);
    };
    q.prototype._renderer = null;
    q.prototype.initialParams = null;
    q.prototype.nodeType = TYTE_NODE_TYPE.DYNAMIC_NODE;
    q.prototype.parent = null;
    q.prototype.walkNodes = g.prototype.walkNodes;
    q.prototype.getPrev = g.prototype.getPrev;
    q.prototype.setPrev = g.prototype.setPrev;
    q.prototype.getNext = g.prototype.getNext;
    q.prototype.setNext = g.prototype.setNext;
    q.prototype.swap = g.prototype.swap;
    q.prototype.remove = g.prototype.remove;
    q.prototype.clone = function(b) {
      b = new this.constructor();
      b.initialParams = this.initialParams;
      return b;
    };
    var ka = {checked:!0, compact:!0, declare:!0, defer:!0, disabled:!0, ismap:!0, multiple:!0, nohref:!0, noresize:!0, noshade:!0, nowrap:!0, readonly:!0, selected:!0}, la = {link:!0, meta:!0, br:!0, hr:!0, img:!0, input:!0, area:!0, base:!0, col:!0, embed:!0, keygen:!0, param:!0, source:!0}, ma = {p:!0, dt:!0, dd:!0, li:!0, option:!0, thead:!0, tfoot:!0, th:!0, tr:!0, td:!0, rt:!0, rp:!0, optgroup:!0, caption:!0, colgroup:!0, col:!0}, na = {a:!0, audio:!0, del:!0, ins:!0, map:!0, noscript:!0, video:!0}, 
    K = {xml:"http://www.w3.org/1999/xhtml", svg:"http://www.w3.org/2000/svg", math:"http://www.w3.org/1998/Math/MathML"}, oa = {script:!0, style:!0, plaintext:!0, xmp:!0, noscript:!0};
    if (DEFINE_TYTE__USE_RENDER_DOM) {
      var x;
      g.prototype.renderDOM = function(b) {
        return document.createTextNode(this.text);
      };
      DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (l.prototype.renderDOM = function(b) {
        var a = document.createDocumentFragment(), c = this._childNodes, d = 0, f, k;
        if (c) {
          for (f = c.length; d < f; ++d) {
            (k = c[d].renderDOM(b)) && a.append(k);
          }
        }
        return a;
      });
      e.prototype.renderDOM = function(b) {
        var a = this._tagName, c;
        !x && K[a] && (x = c = K[a]);
        a = x ? document.createElementNS(x, a) : document.createElement(a);
        var d = this._attrs, f = this._childNodes, k = 0;
        for (m in d) {
          var h = d[m];
          "function" === typeof h && (h = h.call(this, b, m));
          if (null != h) {
            if (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== m) {
              var m = da[m] || m;
              x ? a.setAttributeNS(null, m, "" + h) : a.setAttribute(m, "" + h);
            } else {
              a.style.cssText = "object" === typeof h ? A(h, this, b) : h;
            }
          }
        }
        if (f) {
          for (m = f.length; k < m; ++k) {
            (d = f[k].renderDOM(b)) && a.appendChild(d);
          }
        }
        c && (x = !1);
        return a;
      };
      q.prototype.renderDOM = function(b) {
        var a = this._renderer(b);
        if ("string" === typeof a || "number" === typeof a) {
          return document.createTextNode("" + a);
        }
        if (null != a) {
          return a.renderDOM(b);
        }
      };
    }
    var F, L, M;
    DEFINE_TYTE__USE_RENDER_SSR && (g.prototype.renderSSR = function(b) {
      return F ? this.text : J(this.text);
    }, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (l.prototype.renderSSR = ba), e.prototype.renderSSR = function(b) {
      var a = this._tagName, c = ["<", a], d = 1, f = this._attrs, k, h, m, n;
      if (f) {
        for (r in f) {
          var p = f[r];
          "function" === typeof p && (p = p.call(this, b, r));
          if (null != p) {
            var r = da[r] || r;
            ka[r] ? !1 !== p && (c[++d] = " " + r) : (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== r || "object" !== typeof p || (p = A(p, this, b)), p = J("" + p), p = 0 <= p.indexOf('"') ? 0 <= p.indexOf("'") ? '="' + p.split('"').join("&quot;") + '"' : "='" + p + "'" : '="' + p + '"', c[++d] = " " + r + p);
          }
        }
      }
      F ||= k = !!oa[a];
      L ||= h = !!na[a];
      M ||= m = !!K[a] || 0 < a.indexOf(":");
      this._childNodes && (n = ba.call(this, b));
      n ? c[++d] = ">" + n : c[++d] = M ? "/>" : ">";
      k && (F = !1);
      h && (L = !1);
      m && (M = !1);
      if (!ma[a] || L) {
        if (n || !la[a]) {
          c[++d] = "</" + a + ">";
        }
      }
      return c.join("");
    }, q.prototype.renderSSR = function(b) {
      var a = this._renderer(b);
      return "string" === typeof a ? F ? a : J(a) : "number" === typeof a ? "" + a : null != a ? a.renderSSR(b) : "";
    });
    var t = !0;
    DEFINE_TYTE__USE_RENDER_HTMLJSON && (g.prototype.renderHTMLJSON = function(b) {
      return E(t, this.text);
    }, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (l.prototype.renderHTMLJSON = function(b) {
      var a = t;
      t = !1;
      return E(a, ca.call(this, b));
    }), e.prototype.renderHTMLJSON = function(b) {
      var a = [this._tagName], c = this._attrs, d = t, f, k = {};
      if (c) {
        for (f in c) {
          var h = c[f];
          "function" === typeof h && (h = h.call(this, b, f));
          null != h && ("id" === f ? a[0] = a[0] + "#" + h : "className" === f ? a[0] = a[0] + "." + h : (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== f || "object" !== typeof h || (h = A(h, this, b)), k[f] = h, a[1] = k));
        }
      }
      this._childNodes && (t = !1, a.push.apply(a, ca.call(this, b)), t = d);
      return a;
    }, q.prototype.renderHTMLJSON = function(b) {
      var a = t, c = this._renderer(b);
      return "string" === typeof c ? E(a, c) : "number" === typeof c ? E(a, "" + c) : null != c ? (t = !1, b = c.renderHTMLJSON(b), t = a, b) : [3, ""];
    });
  })();
})(void 0);

