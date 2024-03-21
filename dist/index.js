var DEFINE_TYTE__DEBUG = !0, DEFINE_TYTE__EXPORT = !0, DEFINE_TYTE__DROP_INLINE_STYLE = !1, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT = !1, DEFINE_TYTE__USE_RENDER_SSR = !0, DEFINE_TYTE__USE_RENDER_DOM = !0, DEFINE_TYTE__USE_RENDER_HTMLJSON = !0, DEFINE_TYTE__FROM_VIRTUAL_DOM = !1, TYTE_NODE_TYPE = {ELEMENT_NODE:1, DOCUMENT_FRAGMENT_NODE:DEFINE_TYTE__DEBUG ? 11 : 2, TEXT_NODE:3, DYNAMIC_NODE:4};
(function(sa) {
  function f(x, y) {
  }
  var A, g, k, q;
  (function() {
    function x(b) {
      return "function" === typeof b;
    }
    function y(b) {
      return "object" === typeof b;
    }
    function G(b, a, c) {
      var d = [], e = -1, l;
      for (l in b) {
        var h = b[l];
        x(h) && (h = h.call(a, c, l));
        if (null != h) {
          for (var m = ++e, n, p = [], r = l.split(""), H = r.length; H;) {
            n = r[--H], "A" <= n && "Z" >= n && (n = "-" + n.toLowerCase()), p[H] = n;
          }
          n = p.join("");
          d[m] = n + ":" + h;
        }
      }
      return d.join(";");
    }
    function I(b, a) {
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
          if (a.children.length) {
            throw "childNodes.length missmatch!";
          }
        } else if (b.getChildElements().length !== a.children.length) {
          throw "childNodes.length missmatch!";
        }
      }
    }
    function J(b, a, c, d) {
      a = a._childNodes;
      var e = 0, l;
      if (a) {
        if (DEFINE_TYTE__USE_RENDER_DOM && d) {
          var h = a.length;
          for (l = d.childNodes; e < h; ++e) {
            var m = a[e];
            var n = l[e];
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
          for (h = a.length; e < h; ++e) {
            if (b(a[e], c)) {
              return !0;
            }
          }
        }
      }
    }
    function K(b, a, c) {
      DEFINE_TYTE__DEBUG && c && I(b, c);
      return !0 === (DEFINE_TYTE__USE_RENDER_DOM ? a(b, c) : a(b)) ? !0 : J(K, b, a, c);
    }
    function C(b, a, c) {
      DEFINE_TYTE__DEBUG && c && I(b, c);
      if (b.nodeType === TYTE_NODE_TYPE.TEXT_NODE) {
        if (!0 === (DEFINE_TYTE__USE_RENDER_DOM ? a(b, c) : a(b))) {
          return !0;
        }
      } else {
        return J(C, b, a, c);
      }
    }
    function v(b, a, c) {
      DEFINE_TYTE__DEBUG && c && I(b, c);
      return b.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && !0 === (DEFINE_TYTE__USE_RENDER_DOM ? a(b, c) : a(b)) ? !0 : J(v, b, a, c);
    }
    function D(b, a) {
      b && b.constructor === a || (b = new a());
      return b;
    }
    function w(b) {
      var a = b.parent;
      return a ? (a = a._childNodes, a.indexOf(b)) : -1;
    }
    function B(b, a) {
      for (var c = b.length, d, e; c;) {
        d = b[--c], d === d + "" || d === +d ? b[c] = new g(d) : DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || d.nodeType !== TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE || (d = d._childNodes) && d.length && (d.unshift(c, 1), b.splice.apply(b, d));
      }
      for (c = b.length; c;) {
        d = b[--c], (e = d.parent) && e._childNodes.splice(w(d), 1), d.parent = a;
      }
      return b;
    }
    function u(b) {
      return Array.prototype.slice.call(b);
    }
    function P(b) {
      var a = null, c, d;
      if (b) {
        for (c in a = {}, b) {
          (d = b[c]) && y(d) ? a[c] = P(d) : a[c] = d;
        }
      }
      return a;
    }
    function L(b) {
      return b.split("<").join("&lt;").split(">").join("&gt;");
    }
    function Q(b, a) {
      DEFINE_TYTE__USE_RENDER_DOM ? v(this, b, a) : v(this, b);
      return this;
    }
    function R(b) {
      var a = null;
      v(this, function(c) {
        if (c.getAttr("id") === b) {
          return a = c, !0;
        }
      });
      return a;
    }
    function S(b) {
      var a = [], c = -1;
      v(this, function(d) {
        d._tagName === b && (a[++c] = d);
      });
      return a;
    }
    function T(b) {
      var a = [], c = -1;
      v(this, function(d) {
        d.hasClass(b) && (a[++c] = d);
      });
      return a;
    }
    function U(b) {
      var a = [], c = -1;
      v(this, function(d) {
        d.getAttr("name") === b && (a[++c] = d);
      });
      return a;
    }
    function V() {
      var b = this._childNodes;
      return b && b[0] || null;
    }
    function W() {
      var b = this._childNodes;
      return b && b[b.length - 1] || null;
    }
    function X() {
      return this._childNodes;
    }
    function Y() {
      for (var b = [], a = this._childNodes, c = 0, d = a.length, e; c < d; ++c) {
        e = a[c], e.nodeType === TYTE_NODE_TYPE.ELEMENT_NODE && b.push(e);
      }
      return b;
    }
    function Z(b) {
      var a = this._childNodes = this._childNodes || [], c = B(u(arguments), this);
      a.push.apply(a, c);
      return this;
    }
    function aa(b) {
      var a = this._childNodes = this._childNodes || [], c = B(u(arguments), this);
      c.unshift(0, 0);
      a.splice.apply(a, c);
      return this;
    }
    function ba() {
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
    function ca() {
      var b = "";
      C(this, function(a) {
        b += a.text;
      });
      return b;
    }
    function da(b) {
      var a = this._childNodes;
      a && 1 === a.length && a[0].nodeType === TYTE_NODE_TYPE.TEXT_NODE ? a[0].text = b : (a && this.empty(), this.appendNode(b));
      return this;
    }
    function ja(b) {
      function a(d, e) {
        var l = arguments, h = D(this, a);
        l = u(l);
        var m = l[0], n;
        if (m && y(m) && (!m || m.walkNodes !== g.prototype.walkNodes && m.getPrev !== g.prototype.getPrev)) {
          for (n in m) {
            h.setAttr(n, m[n]);
          }
          l.shift();
        }
        l.length && h.appendNode.apply(h, l);
        return h;
      }
      var c = new f();
      c._tagName = b;
      c.constructor = a;
      a.prototype = c;
      return a;
    }
    function ka(b) {
      function a() {
        var d = arguments, e = D(this, a);
        e.initialParams = u(d);
        return e;
      }
      var c = new q();
      c._renderer = b;
      c.constructor = a;
      a.prototype = c;
      return a;
    }
    function ea(b) {
      var a = [], c = this._childNodes, d = 0, e;
      if (c) {
        for (e = c.length; d < e; ++d) {
          a[d] = c[d].renderSSR(b);
        }
      }
      return a.join("");
    }
    function fa(b) {
      var a = [], c = this._childNodes, d = 0, e;
      if (c) {
        for (e = c.length; d < e; ++d) {
          a[d] = c[d].renderHTMLJSON(b);
        }
      }
      return a;
    }
    function E(b, a) {
      var c = a;
      b && (a === a + "" ? c = [3, a] : c.unshift(11), t = !0);
      return c;
    }
    A = function(b) {
      if (x(b)) {
        return la(b);
      }
      if (b === b + "") {
        return ma(b);
      }
    };
    DEFINE_TYTE__EXPORT && (module.exports = A);
    DEFINE_TYTE__FROM_VIRTUAL_DOM && (A.fromVDOM = function(b) {
    });
    var ha = {className:"class", htmlFor:"for"};
    g = function(b) {
      var a = D(this, g);
      a.text = "" + b;
      return a;
    };
    A.Text = g;
    g.prototype.nodeType = TYTE_NODE_TYPE.TEXT_NODE;
    g.prototype.text = "";
    g.prototype.parent = null;
    g.prototype.walkNodes = function(b, a) {
      DEFINE_TYTE__USE_RENDER_DOM ? K(this, b, a) : K(this, b);
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
        var c = B(u(arguments), a);
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
        a = B(u(arguments), a);
        d < c.length ? (a.unshift(d, 0), c.splice.apply(c, a)) : c.push.apply(c, a);
      }
      return this;
    };
    g.prototype.swap = function(b) {
      var a = this.parent;
      if (a) {
        var c = B(u(arguments), a);
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
    DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (k = function(b) {
      var a = D(this, k);
      return a.appendNode.apply(a, u(arguments));
    }, A.DocumentFragment = k, k.prototype._childNodes = null, k.prototype.nodeType = TYTE_NODE_TYPE.DOCUMENT_FRAGMENT_NODE, k.prototype.parent = null, k.prototype.walkNodes = g.prototype.walkNodes, k.prototype.walkTextNodes = g.prototype.walkTextNodes, k.prototype.walkNodes = Q, k.prototype.getElementByID = R, k.prototype.getElementListByTag = S, k.prototype.getElementListByClass = T, k.prototype.getElementListByName = U, k.prototype.getFirstChild = V, k.prototype.getLastChild = W, k.prototype.getChildNodes = 
    X, k.prototype.getChildElements = Y, k.prototype.appendNode = Z, k.prototype.prependNode = aa, k.prototype.empty = ba, k.prototype.getTextContent = ca, k.prototype.setTextContent = da, k.prototype.clone = function(b) {
      var a = new k();
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
    var ma = function(b) {
      return ia[b] = ia[b] || ja(b);
    };
    var ia = {};
    f.prototype._attrs = null;
    f.prototype._childNodes = null;
    f.prototype.nodeType = TYTE_NODE_TYPE.ELEMENT_NODE;
    f.prototype.parent = null;
    f.prototype.walkNodes = g.prototype.walkNodes;
    f.prototype.walkTextNodes = g.prototype.walkTextNodes;
    f.prototype.walkElements = Q;
    f.prototype.getElementByID = R;
    f.prototype.getElementListByTag = S;
    f.prototype.getElementListByClass = T;
    f.prototype.getElementListByName = U;
    f.prototype.getFirstChild = V;
    f.prototype.getLastChild = W;
    f.prototype.getChildNodes = X;
    f.prototype.getChildElements = Y;
    f.prototype.appendNode = Z;
    f.prototype.prependNode = aa;
    f.prototype.empty = ba;
    f.prototype.getPrev = g.prototype.getPrev;
    f.prototype.setPrev = g.prototype.setPrev;
    f.prototype.getNext = g.prototype.getNext;
    f.prototype.setNext = g.prototype.setNext;
    f.prototype.swap = g.prototype.swap;
    f.prototype.remove = g.prototype.remove;
    f.prototype.getTextContent = ca;
    f.prototype.setTextContent = da;
    f.prototype.clone = function(b) {
      var a = this.constructor;
      a = this._attrs ? new a(P(this._attrs)) : new a();
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
    f.prototype.getAttr = function(b) {
      var a = this._attrs;
      b = a ? a[b] : null;
      return null != b ? b : null;
    };
    f.prototype.setAttr = function(b, a) {
      if (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== b || a !== a + "") {
        var c = this._attrs = this._attrs || {};
        null != a ? c[b] = a : delete c[b];
      } else {
        this.setCSSText(a);
      }
      return this;
    };
    f.prototype.hasAttr = function(b) {
      var a = this._attrs;
      return a ? null != a[b] : !1;
    };
    f.prototype.removeAttr = function(b) {
      var a = this._attrs;
      a && delete a[b];
      return this;
    };
    f.prototype.hasClass = function(b) {
      return -1 !== (" " + this.getClass() + " ").indexOf(" " + b + " ");
    };
    f.prototype.getClass = function() {
      return this.getAttr("className") || "";
    };
    f.prototype.setClass = function(b) {
      return this.setAttr("className", b);
    };
    f.prototype.addClass = function(b) {
      if (b && !this.hasClass(b)) {
        var a = this.getClass();
        this.setClass(a ? a + " " + b : b);
      }
      return this;
    };
    f.prototype.removeClass = function(b) {
      if (b && this.hasClass(b)) {
        var a = this.getClass().split(" ");
        a.splice(a.indexOf(b), 1);
        this.setClass(a.join(" "));
      }
      return this;
    };
    f.prototype.toggleClass = function(b, a) {
      return !0 === a || (!1 === a ? 0 : !this.hasClass(b)) ? this.addClass(b) : this.removeClass(b);
    };
    DEFINE_TYTE__DROP_INLINE_STYLE || (f.prototype.getStyle = function(b) {
      var a = this._attrs && this._attrs.style;
      b = a ? a[b] : "";
      return null == b ? "" : b;
    }, f.prototype.setStyle = function(b, a) {
      var c = this._attrs, d = c && c.style;
      d || (d = {}, c = this._attrs = c || {}, c.style = d);
      d[b] = a;
      return this;
    }, f.prototype.removeStyle = function(b) {
      var a = this._attrs && this._attrs.style;
      a && delete a[b];
      return this;
    }, f.prototype.setCSSText = function(b) {
      if (b) {
        b = b.split(";");
        var a = 0, c;
        for (c = b.length; a < c; ++a) {
          var d = b[a];
          var e = d.split(":")[0].split(" ").join("");
          this.setStyle(e, d.substr(d.indexOf(":") + 1));
        }
      }
      return this;
    });
    var la = function(b) {
      return ka(b);
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
    var na = {checked:!0, compact:!0, declare:!0, defer:!0, disabled:!0, ismap:!0, multiple:!0, nohref:!0, noresize:!0, noshade:!0, nowrap:!0, readonly:!0, selected:!0}, oa = {link:!0, meta:!0, br:!0, hr:!0, img:!0, input:!0, area:!0, base:!0, col:!0, embed:!0, keygen:!0, param:!0, source:!0}, pa = {p:!0, dt:!0, dd:!0, li:!0, option:!0, thead:!0, tfoot:!0, th:!0, tr:!0, td:!0, rt:!0, rp:!0, optgroup:!0, caption:!0, colgroup:!0, col:!0}, qa = {a:!0, audio:!0, del:!0, ins:!0, map:!0, noscript:!0, video:!0}, 
    M = {xml:"http://www.w3.org/1999/xhtml", svg:"http://www.w3.org/2000/svg", math:"http://www.w3.org/1998/Math/MathML"}, ra = {script:!0, style:!0, plaintext:!0, xmp:!0, noscript:!0};
    if (DEFINE_TYTE__USE_RENDER_DOM) {
      var z;
      g.prototype.renderDOM = function(b) {
        return document.createTextNode(this.text);
      };
      DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (k.prototype.renderDOM = function(b) {
        var a = document.createDocumentFragment(), c = this._childNodes, d = 0, e, l;
        if (c) {
          for (e = c.length; d < e; ++d) {
            (l = c[d].renderDOM(b)) && a.append(l);
          }
        }
        return a;
      });
      f.prototype.renderDOM = function(b) {
        var a = this._tagName, c;
        !z && M[a] && (z = c = M[a]);
        a = z ? document.createElementNS(z, a) : document.createElement(a);
        var d = this._attrs, e = this._childNodes, l = 0;
        for (m in d) {
          var h = d[m];
          x(h) && (h = h.call(this, b, m));
          if (null != h) {
            if (DEFINE_TYTE__DROP_INLINE_STYLE || "style" !== m) {
              var m = ha[m] || m;
              z ? a.setAttributeNS(null, m, "" + h) : a.setAttribute(m, "" + h);
            } else {
              a.style.cssText = y(h) ? G(h, this, b) : h;
            }
          }
        }
        if (e) {
          for (m = e.length; l < m; ++l) {
            (d = e[l].renderDOM(b)) && a.appendChild(d);
          }
        }
        c && (z = !1);
        return a;
      };
      q.prototype.renderDOM = function(b) {
        var a = this._renderer(b);
        if (a === a + "" || a === +a) {
          return document.createTextNode("" + a);
        }
        if (null != a) {
          return a.renderDOM(b);
        }
      };
    }
    var F, N, O;
    DEFINE_TYTE__USE_RENDER_SSR && (g.prototype.renderSSR = function(b) {
      return F ? this.text : L(this.text);
    }, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (k.prototype.renderSSR = ea), f.prototype.renderSSR = function(b) {
      var a = this._tagName, c = ["<", a], d = 1, e = this._attrs, l, h, m, n;
      if (e) {
        for (r in e) {
          var p = e[r];
          x(p) && (p = p.call(this, b, r));
          if (null != p) {
            var r = ha[r] || r;
            na[r] ? !1 !== p && (c[++d] = " " + r) : (!DEFINE_TYTE__DROP_INLINE_STYLE && "style" === r && y(p) && (p = G(p, this, b)), p = L("" + p), p = 0 <= p.indexOf('"') ? 0 <= p.indexOf("'") ? '="' + p.split('"').join("&quot;") + '"' : "='" + p + "'" : '="' + p + '"', c[++d] = " " + r + p);
          }
        }
      }
      F ||= l = !!ra[a];
      N ||= h = !!qa[a];
      O ||= m = !!M[a] || 0 < a.indexOf(":");
      this._childNodes && (n = ea.call(this, b));
      n ? c[++d] = ">" + n : c[++d] = O ? "/>" : ">";
      l && (F = !1);
      h && (N = !1);
      m && (O = !1);
      if (!pa[a] || N) {
        if (n || !oa[a]) {
          c[++d] = "</" + a + ">";
        }
      }
      return c.join("");
    }, q.prototype.renderSSR = function(b) {
      var a = this._renderer(b);
      return a === a + "" ? F ? a : L(a) : a === +a ? "" + a : null != a ? a.renderSSR(b) : "";
    });
    var t = !0;
    DEFINE_TYTE__USE_RENDER_HTMLJSON && (g.prototype.renderHTMLJSON = function(b) {
      return E(t, this.text);
    }, DEFINE_TYTE__DROP_DOCUMENT_FRAGMENT || (k.prototype.renderHTMLJSON = function(b) {
      var a = t;
      t = !1;
      return E(a, fa.call(this, b));
    }), f.prototype.renderHTMLJSON = function(b) {
      var a = [this._tagName], c = this._attrs, d = t, e, l = {};
      if (c) {
        for (e in c) {
          var h = c[e];
          x(h) && (h = h.call(this, b, e));
          null != h && ("id" === e ? a[0] = a[0] + "#" + h : "className" === e ? a[0] = a[0] + "." + h : (!DEFINE_TYTE__DROP_INLINE_STYLE && "style" === e && y(h) && (h = G(h, this, b)), l[e] = h, a[1] = l));
        }
      }
      this._childNodes && (t = !1, a.push.apply(a, fa.call(this, b)), t = d);
      return a;
    }, q.prototype.renderHTMLJSON = function(b) {
      var a = t, c = this._renderer(b);
      return c === c + "" ? E(a, c) : c === +c ? E(a, "" + c) : null != c ? (t = !1, b = c.renderHTMLJSON(b), t = a, b) : [3, ""];
    });
  })();
})(void 0);

