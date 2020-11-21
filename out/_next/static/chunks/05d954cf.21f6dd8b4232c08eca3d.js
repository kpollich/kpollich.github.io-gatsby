(window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [4],
  {
    ZMKu: function (t, e, n) {
      'use strict';
      n.d(e, 'a', function () {
        return or;
      }),
        n.d(e, 'b', function () {
          return Qn;
        });
      var r = n('mrSG'),
        i = n('eUsl'),
        o = n('Neuu'),
        a = n('82gj'),
        s = n('Ibe6'),
        u = n('q1tI'),
        c = n.n(u),
        l = function (t) {
          return 'object' === typeof t && t.hasOwnProperty('current');
        },
        f = (function () {
          function t() {
            this.subscriptions = new Set();
          }
          return (
            (t.prototype.add = function (t) {
              var e = this;
              return (
                this.subscriptions.add(t),
                function () {
                  e.subscriptions.delete(t);
                }
              );
            }),
            (t.prototype.notify = function (t, e, n) {
              var i, o;
              if (this.subscriptions.size)
                try {
                  for (
                    var a = Object(r.g)(this.subscriptions), s = a.next();
                    !s.done;
                    s = a.next()
                  ) {
                    (0, s.value)(t, e, n);
                  }
                } catch (u) {
                  i = { error: u };
                } finally {
                  try {
                    s && !s.done && (o = a.return) && o.call(a);
                  } finally {
                    if (i) throw i.error;
                  }
                }
            }),
            (t.prototype.clear = function () {
              this.subscriptions.clear();
            }),
            t
          );
        })(),
        d = (function () {
          function t(t) {
            var e,
              n = this;
            (this.timeDelta = 0),
              (this.lastUpdated = 0),
              (this.updateSubscribers = new f()),
              (this.renderSubscribers = new f()),
              (this.canTrackVelocity = !1),
              (this.updateAndNotify = function (t, e) {
                void 0 === e && (e = !0),
                  (n.prev = n.current),
                  (n.current = t),
                  n.prev !== n.current && n.updateSubscribers.notify(n.current),
                  e && n.renderSubscribers.notify(n.current);
                var r = Object(i.c)(),
                  o = r.delta,
                  a = r.timestamp;
                n.lastUpdated !== a &&
                  ((n.timeDelta = o),
                  (n.lastUpdated = a),
                  i.b.postRender(n.scheduleVelocityCheck));
              }),
              (this.scheduleVelocityCheck = function () {
                return i.b.postRender(n.velocityCheck);
              }),
              (this.velocityCheck = function (t) {
                t.timestamp !== n.lastUpdated && (n.prev = n.current);
              }),
              this.set(t, !1),
              (this.canTrackVelocity =
                ((e = this.current), !isNaN(parseFloat(e))));
          }
          return (
            (t.prototype.onChange = function (t) {
              return this.updateSubscribers.add(t);
            }),
            (t.prototype.clearListeners = function () {
              this.updateSubscribers.clear();
            }),
            (t.prototype.onRenderRequest = function (t) {
              return t(this.get()), this.renderSubscribers.add(t);
            }),
            (t.prototype.attach = function (t) {
              this.passiveEffect = t;
            }),
            (t.prototype.set = function (t, e) {
              void 0 === e && (e = !0),
                e && this.passiveEffect
                  ? this.passiveEffect(t, this.updateAndNotify)
                  : this.updateAndNotify(t, e);
            }),
            (t.prototype.get = function () {
              return this.current;
            }),
            (t.prototype.getPrevious = function () {
              return this.prev;
            }),
            (t.prototype.getVelocity = function () {
              return this.canTrackVelocity
                ? Object(o.velocityPerSecond)(
                    parseFloat(this.current) - parseFloat(this.prev),
                    this.timeDelta
                  )
                : 0;
            }),
            (t.prototype.start = function (t) {
              var e = this;
              return (
                this.stop(),
                new Promise(function (n) {
                  e.stopAnimation = t(n);
                }).then(function () {
                  return e.clearAnimation();
                })
              );
            }),
            (t.prototype.stop = function () {
              this.stopAnimation && this.stopAnimation(), this.clearAnimation();
            }),
            (t.prototype.isAnimating = function () {
              return !!this.stopAnimation;
            }),
            (t.prototype.clearAnimation = function () {
              this.stopAnimation = null;
            }),
            (t.prototype.destroy = function () {
              this.updateSubscribers.clear(),
                this.renderSubscribers.clear(),
                this.stop();
            }),
            t
          );
        })();
      function p(t) {
        return new d(t);
      }
      var h = (function () {
        function t(t, e) {
          var n = this;
          (this.children = new Set()),
            (this.latest = {}),
            (this.values = new Map()),
            (this.valueSubscriptions = new Map()),
            (this.config = {}),
            (this.update = function () {
              return n.config.onUpdate(n.latest);
            }),
            (this.triggerRender = function () {
              return n.render();
            }),
            (this.ref = function (t) {
              t ? n.mount(t) : n.unmount(),
                n.externalRef &&
                  ('function' === typeof n.externalRef
                    ? n.externalRef(t)
                    : l(n.externalRef) && (n.externalRef.current = t));
            }),
            (this.parent = t),
            (this.rootParent = t ? t.rootParent : this),
            (this.treePath = t ? Object(r.e)(t.treePath, [t]) : []),
            (this.depth = t ? t.depth + 1 : 0),
            (this.externalRef = e);
        }
        return (
          (t.prototype.subscribe = function (t) {
            var e = this;
            return (
              this.children.add(t),
              function () {
                return e.children.delete(t);
              }
            );
          }),
          (t.prototype.hasValue = function (t) {
            return this.values.has(t);
          }),
          (t.prototype.addValue = function (t, e) {
            this.hasValue(t) && this.removeValue(t),
              this.values.set(t, e),
              this.setSingleStaticValue(t, e.get()),
              this.subscribeToValue(t, e);
          }),
          (t.prototype.removeValue = function (t) {
            var e;
            null === (e = this.valueSubscriptions.get(t)) ||
              void 0 === e ||
              e(),
              this.valueSubscriptions.delete(t),
              this.values.delete(t),
              delete this.latest[t];
          }),
          (t.prototype.getValue = function (t, e) {
            var n = this.values.get(t);
            return (
              void 0 === n &&
                void 0 !== e &&
                ((n = new d(e)), this.addValue(t, n)),
              n
            );
          }),
          (t.prototype.forEachValue = function (t) {
            this.values.forEach(t);
          }),
          (t.prototype.getInstance = function () {
            return this.element;
          }),
          (t.prototype.updateConfig = function (t) {
            void 0 === t && (t = {}), (this.config = Object(r.a)({}, t));
          }),
          (t.prototype.setSingleStaticValue = function (t, e) {
            this.latest[t] = e;
          }),
          (t.prototype.setStaticValues = function (t, e) {
            if ('string' === typeof t) this.setSingleStaticValue(t, e);
            else for (var n in t) this.setSingleStaticValue(n, t[n]);
          }),
          (t.prototype.scheduleRender = function () {
            i.b.render(this.triggerRender, !1, !0);
          }),
          (t.prototype.scheduleUpdateLayoutDelta = function () {
            i.b.preRender(this.rootParent.updateLayoutDelta, !1, !0);
          }),
          (t.prototype.subscribeToValue = function (t, e) {
            var n = this,
              r = e.onChange(function (e) {
                n.setSingleStaticValue(t, e),
                  n.element &&
                    n.config.onUpdate &&
                    i.b.update(n.update, !1, !0);
              }),
              o = e.onRenderRequest(function () {
                n.element && n.scheduleRender();
              });
            this.valueSubscriptions.set(t, function () {
              r(), o();
            });
          }),
          (t.prototype.mount = function (t) {
            Object(a.a)(
              !!t,
              'No ref found. Ensure components created with motion.custom forward refs using React.forwardRef'
            ),
              this.parent &&
                (this.removeFromParent = this.parent.subscribe(this)),
              (this.element = this.current = t);
          }),
          (t.prototype.unmount = function () {
            var t = this;
            this.forEachValue(function (e, n) {
              return t.removeValue(n);
            }),
              i.a.update(this.update),
              i.a.render(this.render),
              this.removeFromParent && this.removeFromParent();
          }),
          t
        );
      })();
      function v(t) {
        return t;
      }
      function m(t) {
        var e = t.top;
        return {
          x: { min: t.left, max: t.right },
          y: { min: e, max: t.bottom },
        };
      }
      function y(t) {
        return { x: Object(r.a)({}, t.x), y: Object(r.a)({}, t.y) };
      }
      var g = { translate: 0, scale: 1, origin: 0, originPoint: 0 };
      function b() {
        return { x: Object(r.a)({}, g), y: Object(r.a)({}, g) };
      }
      var x = Object(r.a)(Object(r.a)({}, s.g), { transform: Math.round }),
        j = {
          color: s.b,
          backgroundColor: s.b,
          outlineColor: s.b,
          fill: s.b,
          stroke: s.b,
          borderColor: s.b,
          borderTopColor: s.b,
          borderRightColor: s.b,
          borderBottomColor: s.b,
          borderLeftColor: s.b,
          borderWidth: s.j,
          borderTopWidth: s.j,
          borderRightWidth: s.j,
          borderBottomWidth: s.j,
          borderLeftWidth: s.j,
          borderRadius: s.j,
          radius: s.j,
          borderTopLeftRadius: s.j,
          borderTopRightRadius: s.j,
          borderBottomRightRadius: s.j,
          borderBottomLeftRadius: s.j,
          width: s.j,
          maxWidth: s.j,
          height: s.j,
          maxHeight: s.j,
          size: s.j,
          top: s.j,
          right: s.j,
          bottom: s.j,
          left: s.j,
          padding: s.j,
          paddingTop: s.j,
          paddingRight: s.j,
          paddingBottom: s.j,
          paddingLeft: s.j,
          margin: s.j,
          marginTop: s.j,
          marginRight: s.j,
          marginBottom: s.j,
          marginLeft: s.j,
          rotate: s.d,
          rotateX: s.d,
          rotateY: s.d,
          rotateZ: s.d,
          scale: s.l,
          scaleX: s.l,
          scaleY: s.l,
          scaleZ: s.l,
          skew: s.d,
          skewX: s.d,
          skewY: s.d,
          distance: s.j,
          translateX: s.j,
          translateY: s.j,
          translateZ: s.j,
          x: s.j,
          y: s.j,
          z: s.j,
          perspective: s.j,
          transformPerspective: s.j,
          opacity: s.a,
          originX: s.i,
          originY: s.i,
          originZ: s.j,
          zIndex: x,
          fillOpacity: s.a,
          strokeOpacity: s.a,
          numOctaves: x,
        },
        O = [
          s.g,
          s.j,
          s.h,
          s.d,
          s.n,
          s.m,
          {
            test: function (t) {
              return 'auto' === t;
            },
            parse: function (t) {
              return t;
            },
          },
        ],
        E = function (t) {
          return function (e) {
            return e.test(t);
          };
        },
        w = function (t) {
          return O.find(E(t));
        },
        C = Object(r.e)(O, [s.b, s.c]),
        P = function (t) {
          return C.find(E(t));
        },
        S = function (t) {
          return j[t];
        },
        A = function (t, e) {
          return e && 'number' === typeof t ? e.transform(t) : t;
        },
        V = ['', 'X', 'Y', 'Z'],
        T = new Set(),
        L = ['transformPerspective', 'x', 'y', 'z'];
      function B(t, e) {
        return L.indexOf(t) - L.indexOf(e);
      }
      ['perspective', 'translate', 'scale', 'rotate', 'skew'].forEach(function (
        t
      ) {
        var e = new Set(['rotate', 'skew']).has(t);
        V.forEach(function (n) {
          var r = t + n;
          L.push(r), e && T.add(r);
        });
      });
      var k = new Set(L);
      function M(t) {
        return k.has(t);
      }
      var R = new Set(['originX', 'originY', 'originZ']);
      function D(t) {
        return R.has(t);
      }
      var F = {
        x: 'translateX',
        y: 'translateY',
        z: 'translateZ',
        transformPerspective: 'perspective',
      };
      function U(t, e) {
        var n = t.x,
          r = t.y;
        return (
          'translate3d(' +
          n.translate / e.x +
          'px, ' +
          r.translate / e.y +
          'px, 0) scale(' +
          n.scale +
          ', ' +
          r.scale +
          ')'
        );
      }
      var I = U(b(), { x: 1, y: 1 });
      function H(t) {
        return t.startsWith('--');
      }
      function Y(t) {
        return 'string' === typeof t && t.startsWith('var(--');
      }
      var X = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
      function z(t, e, n) {
        void 0 === n && (n = 1),
          Object(a.a)(
            n <= 4,
            'Max CSS variable fallback depth detected in property "' +
              t +
              '". This may indicate a circular fallback dependency.'
          );
        var i = Object(r.c)(
            (function (t) {
              var e = X.exec(t);
              if (!e) return [,];
              var n = Object(r.c)(e, 3);
              return [n[1], n[2]];
            })(t),
            2
          ),
          o = i[0],
          s = i[1];
        if (o) {
          var u = window.getComputedStyle(e).getPropertyValue(o);
          return u || (Y(s) ? z(s, e, n + 1) : s);
        }
      }
      function N(t, e) {
        return (t / (e.max - e.min)) * 100;
      }
      var W = {
          process: function (t, e) {
            if ('string' === typeof t) {
              if (!s.j.test(t)) return t;
              t = parseFloat(t);
            }
            return N(t, e.x) + '% ' + N(t, e.y) + '%';
          },
        },
        G = {
          borderRadius: Object(r.a)(Object(r.a)({}, W), {
            applyTo: [
              'borderTopLeftRadius',
              'borderTopRightRadius',
              'borderBottomLeftRadius',
              'borderBottomRightRadius',
            ],
          }),
          borderTopLeftRadius: W,
          borderTopRightRadius: W,
          borderBottomLeftRadius: W,
          borderBottomRightRadius: W,
          boxShadow: {
            process: function (t, e, n, r) {
              var i = t,
                a = t.includes('var('),
                u = [];
              a &&
                (t = t.replace(X, function (t) {
                  return u.push(t), '_$css';
                }));
              var c = s.c.parse(t);
              if (c.length > 5) return i;
              var l = s.c.createTransformer(t),
                f = 'number' !== typeof c[0] ? 1 : 0,
                d = n.x.scale * r.x,
                p = n.y.scale * r.y;
              (c[0 + f] /= d), (c[1 + f] /= p);
              var h = Object(o.mix)(d, p, 0.5);
              'number' === typeof c[2 + f] && (c[2 + f] /= h),
                'number' === typeof c[3 + f] && (c[3 + f] /= h);
              var v = l(c);
              if (a) {
                var m = 0;
                v = v.replace('_$css', function () {
                  var t = u[m];
                  return m++, t;
                });
              }
              return v;
            },
          },
        };
      function Z(t, e, n, r, i, o, a, s, u, c, l, f) {
        var d = a.enableHardwareAcceleration,
          p = a.transformTemplate,
          h = a.allowTransformNone;
        o.length = 0;
        var v = !1,
          m = !1,
          y = !0;
        for (var g in t) {
          var b = t[g],
            x = S(g),
            j = A(b, x);
          if (M(g)) {
            if (((v = !0), (r[g] = j), o.push(g), !y)) continue;
            b !== (void 0 !== x.default ? x.default : 0) && (y = !1);
          } else if (D(g)) (i[g] = j), (m = !0);
          else if ('transform' !== g || 'function' !== typeof b) {
            var O = H(g) ? n : e;
            if (s && G[g]) {
              var E = G[g].process(b, f, u, l),
                w = G[g].applyTo;
              if (w) for (var C = w.length, P = 0; P < C; P++) O[w[P]] = E;
              else O[g] = E;
            } else O[g] = j;
          }
        }
        s
          ? ((e.transform = U(c, l)),
            e.transform === I && (e.transform = ''),
            v &&
              ((e.transform +=
                ' ' +
                (function (t, e) {
                  var n = '';
                  e.sort(B);
                  for (var r = e.length, i = 0; i < r; i++) {
                    var o = e[i];
                    T.has(o) && (n += o + '(' + t[o] + ') ');
                  }
                  return n;
                })(r, o)),
              (e.transform = e.transform.trim())),
            p && (e.transform = p(r, e.transform)),
            (e.transformOrigin = (function (t) {
              var e = t.x,
                n = t.y;
              return 100 * e.origin + '% ' + 100 * n.origin + '% 0';
            })(c)))
          : (v &&
              (e.transform = (function (t, e, n, r, i, o) {
                void 0 === i && (i = !0), void 0 === o && (o = !0);
                var a = '';
                e.sort(B);
                for (var s = !1, u = e.length, c = 0; c < u; c++) {
                  var l = e[c];
                  (a += (F[l] || l) + '(' + t[l] + ') '), 'z' === l && (s = !0);
                }
                return (
                  !s && i ? (a += 'translateZ(0)') : (a = a.trim()),
                  n ? (a = n(t, r ? '' : a)) : o && r && (a = 'none'),
                  a
                );
              })(r, o, p, y, d, h)),
            m &&
              (e.transformOrigin = (function (t) {
                var e = t.originX,
                  n = void 0 === e ? '50%' : e,
                  r = t.originY,
                  i = void 0 === r ? '50%' : r,
                  o = t.originZ;
                return n + ' ' + i + ' ' + (void 0 === o ? 0 : o);
              })(i)));
      }
      function _(t, e) {
        (t.min = e.min), (t.max = e.max);
      }
      function $(t, e, n) {
        return n + e * (t - n);
      }
      function K(t, e, n, r, i) {
        return void 0 !== i && (t = $(t, i, r)), $(t, n, r) + e;
      }
      function q(t, e, n, r, i) {
        void 0 === e && (e = 0),
          void 0 === n && (n = 1),
          (t.min = K(t.min, e, n, r, i)),
          (t.max = K(t.max, e, n, r, i));
      }
      function J(t, e) {
        var n = e.x,
          r = e.y;
        q(t.x, n.translate, n.scale, n.originPoint),
          q(t.y, r.translate, r.scale, r.originPoint);
      }
      function Q(t, e, n, i) {
        var a = Object(r.c)(i, 3),
          s = a[0],
          u = a[1],
          c = a[2];
        (t.min = e.min), (t.max = e.max);
        var l = void 0 !== n[c] ? n[c] : 0.5,
          f = Object(o.mix)(e.min, e.max, l);
        q(t, n[s], n[u], f, n.scale);
      }
      var tt = ['x', 'scaleX', 'originX'],
        et = ['y', 'scaleY', 'originY'];
      function nt(t, e, n, r, i) {
        return (
          (t = $((t -= e), 1 / n, r)), void 0 !== i && (t = $(t, 1 / i, r)), t
        );
      }
      function rt(t, e, n) {
        var i = Object(r.c)(n, 3),
          a = i[0],
          s = i[1],
          u = i[2];
        !(function (t, e, n, r, i) {
          void 0 === e && (e = 0),
            void 0 === n && (n = 1),
            void 0 === r && (r = 0.5);
          var a = Object(o.mix)(t.min, t.max, r) - e;
          (t.min = nt(t.min, e, n, a, i)), (t.max = nt(t.max, e, n, a, i));
        })(t, e[a], e[s], e[u], e.scale);
      }
      function it(t, e, n) {
        return (
          void 0 === e && (e = 0),
          void 0 === n && (n = 0.01),
          Object(o.distance)(t, e) < n
        );
      }
      function ot(t, e) {
        var n,
          r = 0.5,
          i = t.max - t.min,
          a = e.max - e.min;
        return (
          a > i
            ? (r = Object(o.progress)(e.min, e.max - i, t.min))
            : i > a && (r = Object(o.progress)(t.min, t.max - a, e.min)),
          (n = r),
          Object(o.clamp)(0, 1, n)
        );
      }
      function at(t, e, n, r) {
        var i = e.max - e.min,
          a = n.max - n.min;
        (t.origin = void 0 === r ? ot(e, n) : r),
          (t.originPoint = Object(o.mix)(e.min, e.max, t.origin)),
          (t.scale = a / i),
          it(t.scale, 1, 1e-4) && (t.scale = 1),
          (t.translate = (function (t, e, n) {
            var r = Object(o.mix)(t.min, t.max, n);
            return Object(o.mix)(e.min, e.max, n) - r;
          })(e, n, t.origin)),
          it(t.translate) && (t.translate = 0);
      }
      function st(t, e, n, r) {
        at(t.x, e.x, n.x, r), at(t.y, e.y, n.y, r);
      }
      function ut(t) {
        return [t('x'), t('y')];
      }
      var ct = function (t) {
          return 1e3 * t;
        },
        lt = function (t) {
          if (Array.isArray(t)) {
            Object(a.a)(
              4 === t.length,
              'Cubic bezier arrays must contain four numerical values.'
            );
            var e = Object(r.c)(t, 4),
              n = e[0],
              i = e[1],
              s = e[2],
              u = e[3];
            return Object(o.cubicBezier)(n, i, s, u);
          }
          return 'string' === typeof t
            ? (Object(a.a)(void 0 !== o[t], "Invalid easing type '" + t + "'"),
              o[t])
            : t;
        },
        ft = function (t, e) {
          return (
            'zIndex' !== t &&
            (!('number' !== typeof e && !Array.isArray(e)) ||
              !('string' !== typeof e || !s.c.test(e) || e.startsWith('url(')))
          );
        },
        dt = function (t) {
          return Array.isArray(t);
        },
        pt = function () {
          return {
            type: 'spring',
            stiffness: 500,
            damping: 25,
            restDelta: 0.5,
            restSpeed: 10,
          };
        },
        ht = function (t) {
          return {
            type: 'spring',
            stiffness: 550,
            damping: 0 === t ? 100 : 30,
            restDelta: 0.01,
            restSpeed: 10,
          };
        },
        vt = function () {
          return { type: 'keyframes', ease: 'linear', duration: 0.3 };
        },
        mt = function (t) {
          return { type: 'keyframes', duration: 0.8, values: t };
        },
        yt = {
          x: pt,
          y: pt,
          z: pt,
          rotate: pt,
          rotateX: pt,
          rotateY: pt,
          rotateZ: pt,
          scaleX: ht,
          scaleY: ht,
          scale: ht,
          opacity: vt,
          backgroundColor: vt,
          color: vt,
          default: ht,
        };
      function gt(t) {
        var e = t.yoyo,
          n = t.loop,
          i = t.flip,
          o = t.ease,
          a = t.times,
          s = Object(r.d)(t, ['yoyo', 'loop', 'flip', 'ease', 'times']),
          u = Object(r.a)({}, s);
        return (
          a && (u.offset = a),
          s.duration && (u.duration = ct(s.duration)),
          s.repeatDelay && (u.repeatDelay = ct(s.repeatDelay)),
          o &&
            (u.ease = (function (t) {
              return Array.isArray(t) && 'number' !== typeof t[0];
            })(o)
              ? o.map(lt)
              : lt(o)),
          'tween' === s.type && (u.type = 'keyframes'),
          e
            ? (u.repeatType = 'reverse')
            : n
            ? (u.repeatType = 'loop')
            : i && (u.repeatType = 'mirror'),
          (u.repeat = n || e || i || s.repeat),
          'spring' !== s.type && (u.type = 'keyframes'),
          u
        );
      }
      function bt(t, e, n) {
        return (
          (function (t) {
            Array.isArray(t.to) &&
              null === t.to[0] &&
              ((t.to = Object(r.e)(t.to)), (t.to[0] = t.from));
          })(e),
          (function (t) {
            t.when,
              t.delay,
              t.delayChildren,
              t.staggerChildren,
              t.staggerDirection,
              t.repeat,
              t.repeatType,
              t.repeatDelay,
              t.from;
            var e = Object(r.d)(t, [
              'when',
              'delay',
              'delayChildren',
              'staggerChildren',
              'staggerDirection',
              'repeat',
              'repeatType',
              'repeatDelay',
              'from',
            ]);
            return !!Object.keys(e).length;
          })(t) ||
            (t = Object(r.a)(
              Object(r.a)({}, t),
              (function (t, e) {
                var n;
                return (
                  (n = dt(e) ? mt : yt[t] || yt.default),
                  Object(r.a)({ to: e }, n(e))
                );
              })(n, e.to)
            )),
          Object(r.a)(Object(r.a)({}, e), gt(t))
        );
      }
      function xt(t, e, n, i) {
        return (
          void 0 === i && (i = {}),
          e.start(function (u) {
            var c,
              l,
              f = (function (t, e, n, i, u) {
                var c = i[t] || i.default || i,
                  l = e.get(),
                  f = ft(t, n);
                'none' === l &&
                  f &&
                  'string' === typeof n &&
                  (l = s.c.getAnimatableNone(n));
                var d = ft(t, l);
                return (
                  Object(a.b)(
                    d === f,
                    'You are trying to animate ' +
                      t +
                      ' from "' +
                      l +
                      '" to "' +
                      n +
                      '". ' +
                      l +
                      ' is not an animatable value - to enable this animation set ' +
                      l +
                      ' to a value animatable to ' +
                      n +
                      ' via the `style` property.'
                  ),
                  d && f && !1 !== c.type
                    ? function () {
                        var i = {
                          from: l,
                          to: n,
                          velocity: e.getVelocity(),
                          onComplete: u,
                          onUpdate: function (t) {
                            return e.set(t);
                          },
                        };
                        return 'inertia' === c.type || 'decay' === c.type
                          ? Object(o.inertia)(
                              Object(r.a)(Object(r.a)({}, i), c)
                            )
                          : Object(o.animate)(bt(c, i, t));
                      }
                    : function () {
                        return e.set(n), u(), { stop: function () {} };
                      }
                );
              })(t, e, n, i, u),
              d = (function (t, e) {
                var n, r, i, o, a;
                return null !==
                  (a =
                    null !==
                      (o =
                        null !==
                          (r =
                            null === (n = t[e]) || void 0 === n
                              ? void 0
                              : n.delay) && void 0 !== r
                          ? r
                          : null === (i = t.default) || void 0 === i
                          ? void 0
                          : i.delay) && void 0 !== o
                      ? o
                      : t.delay) && void 0 !== a
                  ? a
                  : 0;
              })(i, t),
              p = function () {
                return (l = f());
              };
            return (
              d ? (c = setTimeout(p, ct(d))) : p(),
              function () {
                clearTimeout(c), null === l || void 0 === l || l.stop();
              }
            );
          })
        );
      }
      function jt(t, e) {
        return m(
          (function (t, e) {
            var n = t.top,
              r = t.left,
              i = t.bottom,
              o = t.right;
            void 0 === e && (e = v);
            var a = e({ x: r, y: n }),
              s = e({ x: o, y: i });
            return { top: a.y, left: a.x, bottom: s.y, right: s.x };
          })(t.getBoundingClientRect(), e)
        );
      }
      var Ot = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (
              (e.defaultConfig = {
                enableHardwareAcceleration: !0,
                allowTransformNone: !0,
              }),
              (e.style = {}),
              (e.reactStyle = {}),
              (e.vars = {}),
              (e.transform = {}),
              (e.transformOrigin = {}),
              (e.transformKeys = []),
              (e.config = e.defaultConfig),
              (e.isLayoutProjectionEnabled = !1),
              (e.layoutUpdateListeners = new f()),
              (e.layoutMeasureListeners = new f()),
              (e.viewportBoxUpdateListeners = new f()),
              (e.hasViewportBoxUpdated = !1),
              (e.targetBoxFinal = {
                x: { min: 0, max: 1 },
                y: { min: 0, max: 1 },
              }),
              (e.treeScale = { x: 1, y: 1 }),
              (e.prevTreeScale = { x: 1, y: 1 }),
              (e.delta = b()),
              (e.deltaFinal = b()),
              (e.deltaTransform = I),
              (e.stopLayoutAxisAnimation = {
                x: function () {},
                y: function () {},
              }),
              (e.isTargetBoxLocked = !1),
              (e.axisProgress = { x: p(0), y: p(0) }),
              (e.updateLayoutDelta = function () {
                e.isLayoutProjectionEnabled && e.box && e.updateLayoutDeltas(),
                  e.children.forEach(Et);
              }),
              e
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.removeValue = function (e) {
              t.prototype.removeValue.call(this, e),
                delete this.vars[e],
                delete this.style[e];
            }),
            (e.prototype.clean = function () {
              (this.style = {}), (this.vars = {}), (this.transform = {});
            }),
            (e.prototype.updateConfig = function (t) {
              void 0 === t && (t = {}),
                (this.config = Object(r.a)(
                  Object(r.a)({}, this.defaultConfig),
                  t
                ));
            }),
            (e.prototype.read = function (t) {
              return this.getComputedStyle()[t] || 0;
            }),
            (e.prototype.addValue = function (e, n) {
              t.prototype.addValue.call(this, e, n),
                e.startsWith('rotate') && (this.layoutOrigin = 0.5);
            }),
            (e.prototype.readNativeValue = function (t) {
              if (M(t)) {
                var e = S(t);
                return (e && e.default) || 0;
              }
              return this.read(t);
            }),
            (e.prototype.enableLayoutProjection = function () {
              this.isLayoutProjectionEnabled = !0;
            }),
            (e.prototype.hide = function () {
              !1 !== this.isVisible &&
                ((this.isVisible = !1), this.scheduleRender());
            }),
            (e.prototype.show = function () {
              !0 !== this.isVisible &&
                ((this.isVisible = !0), this.scheduleRender());
            }),
            (e.prototype.onLayoutUpdate = function (t) {
              return this.layoutUpdateListeners.add(t);
            }),
            (e.prototype.onLayoutMeasure = function (t) {
              return this.layoutMeasureListeners.add(t);
            }),
            (e.prototype.onViewportBoxUpdate = function (t) {
              return this.viewportBoxUpdateListeners.add(t);
            }),
            (e.prototype.layoutReady = function (t) {
              this.layoutUpdateListeners.notify(
                this.box,
                this.prevViewportBox || this.box,
                t
              );
            }),
            (e.prototype.getBoundingBox = function () {
              var t = this.config.transformPagePoint;
              return jt(this.element, t);
            }),
            (e.prototype.getBoundingBoxWithoutTransforms = function () {
              var t,
                e,
                n = this.getBoundingBox();
              return (
                (t = n), (e = this.latest), rt(t.x, e, tt), rt(t.y, e, et), n
              );
            }),
            (e.prototype.getComputedStyle = function () {
              return window.getComputedStyle(this.element);
            }),
            (e.prototype.snapshotBoundingBox = function () {
              (this.prevViewportBox = this.getBoundingBoxWithoutTransforms()),
                this.rebaseTargetBox(!1, this.prevViewportBox);
            }),
            (e.prototype.rebaseTargetBox = function (t, e) {
              var n = this;
              void 0 === t && (t = !1), void 0 === e && (e = this.box);
              var r = this.axisProgress,
                i = r.x,
                o = r.y,
                a =
                  this.box &&
                  !this.isTargetBoxLocked &&
                  !i.isAnimating() &&
                  !o.isAnimating();
              (t || a) &&
                ut(function (t) {
                  var r = e[t],
                    i = r.min,
                    o = r.max;
                  n.setAxisTarget(t, i, o);
                });
            }),
            (e.prototype.measureLayout = function () {
              var t = this;
              (this.box = this.getBoundingBox()),
                (this.boxCorrected = y(this.box)),
                this.targetBox || (this.targetBox = y(this.box)),
                this.layoutMeasureListeners.notify(
                  this.box,
                  this.prevViewportBox || this.box
                ),
                i.b.update(function () {
                  return t.rebaseTargetBox();
                });
            }),
            (e.prototype.lockTargetBox = function () {
              this.isTargetBoxLocked = !0;
            }),
            (e.prototype.unlockTargetBox = function () {
              this.stopLayoutAnimation(), (this.isTargetBoxLocked = !1);
            }),
            (e.prototype.resetTransform = function () {
              var t = this.config.transformTemplate;
              (this.element.style.transform = t ? t({}, '') : 'none'),
                this.scheduleRender();
            }),
            (e.prototype.setAxisTarget = function (t, e, n) {
              var r = this.targetBox[t];
              (r.min = e),
                (r.max = n),
                (this.hasViewportBoxUpdated = !0),
                this.rootParent.scheduleUpdateLayoutDelta();
            }),
            (e.prototype.startLayoutAxisAnimation = function (t, e) {
              var n = this,
                r = this.axisProgress[t],
                i = this.targetBox[t],
                o = i.min,
                a = i.max - o;
              return (
                r.clearListeners(),
                r.set(o),
                r.set(o),
                r.onChange(function (e) {
                  return n.setAxisTarget(t, e, e + a);
                }),
                xt(t, r, 0, e)
              );
            }),
            (e.prototype.stopLayoutAnimation = function () {
              var t = this;
              ut(function (e) {
                return t.axisProgress[e].stop();
              });
            }),
            (e.prototype.updateLayoutDeltas = function () {
              var t, e, n, r, i;
              (t = this.boxCorrected),
                (e = this.box),
                _(t.x, e.x),
                _(t.y, e.y),
                this.parent &&
                  ((this.prevTreeScale.x = this.treeScale.x),
                  (this.prevTreeScale.y = this.treeScale.y),
                  (n = this.treeScale),
                  (r = this.parent.treeScale),
                  (i = this.parent.delta),
                  (n.x = r.x * i.x.scale),
                  (n.y = r.y * i.y.scale)),
                (function (t, e) {
                  for (var n = e.length, r = 0; r < n; r++) J(t, e[r].delta);
                })(this.boxCorrected, this.treePath),
                st(
                  this.delta,
                  this.boxCorrected,
                  this.targetBox,
                  this.layoutOrigin
                ),
                this.hasViewportBoxUpdated &&
                  this.viewportBoxUpdateListeners.notify(
                    this.targetBox,
                    this.delta
                  ),
                (this.hasViewportBoxUpdated = !1);
              var o = U(this.delta, this.treeScale);
              (o === this.deltaTransform &&
                this.prevTreeScale.x === this.treeScale.x &&
                this.prevTreeScale.y === this.treeScale.y) ||
                this.scheduleRender(),
                (this.deltaTransform = o);
            }),
            (e.prototype.updateTransformDeltas = function () {
              var t, e, n;
              this.isLayoutProjectionEnabled &&
                this.box &&
                ((t = this.targetBoxFinal),
                (e = this.targetBox),
                (n = this.latest),
                Q(t.x, e.x, n, tt),
                Q(t.y, e.y, n, et),
                st(
                  this.deltaFinal,
                  this.boxCorrected,
                  this.targetBoxFinal,
                  this.layoutOrigin
                ));
            }),
            (e.prototype.build = function () {
              this.updateTransformDeltas(),
                void 0 !== this.isVisible &&
                  (this.style.visibility = this.isVisible
                    ? 'visible'
                    : 'hidden'),
                Z(
                  this.latest,
                  this.style,
                  this.vars,
                  this.transform,
                  this.transformOrigin,
                  this.transformKeys,
                  this.config,
                  this.isLayoutProjectionEnabled && !!this.box,
                  this.delta,
                  this.deltaFinal,
                  this.treeScale,
                  this.targetBoxFinal
                );
            }),
            (e.prototype.render = function () {
              for (var t in (this.build(),
              Object.assign(this.element.style, this.style),
              this.vars))
                this.element.style.setProperty(t, this.vars[t]);
            }),
            e
          );
        })(h),
        Et = function (t) {
          return t.updateLayoutDelta();
        };
      function wt(t) {
        var e = Object(u.useRef)(null);
        return null === e.current && (e.current = t()), e.current;
      }
      function Ct(t, e, n) {
        return 'string' === typeof t ? t : s.j.transform(e + n * t);
      }
      var Pt = function (t, e) {
          return s.j.transform(t * e);
        },
        St = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
        At = { offset: 'strokeDashoffset', array: 'strokeDasharray' };
      var Vt = { x: 0, y: 0, width: 0, height: 0 };
      function Tt(t, e, n, i, o, a, s, u, c, l, f, d, p, h, v) {
        var m = t.attrX,
          y = t.attrY,
          g = t.originX,
          b = t.originY,
          x = t.pathLength,
          j = t.pathSpacing,
          O = void 0 === j ? 1 : j,
          E = t.pathOffset,
          w = void 0 === E ? 0 : E;
        return (
          Z(
            Object(r.d)(t, [
              'attrX',
              'attrY',
              'originX',
              'originY',
              'pathLength',
              'pathSpacing',
              'pathOffset',
            ]),
            i,
            n,
            o,
            a,
            s,
            u,
            f,
            d,
            p,
            h,
            v
          ),
          i.transform && ((e.transform = i.transform), delete i.transform),
          (void 0 !== g || void 0 !== b || e.transform) &&
            (e.transformOrigin = (function (t, e, n) {
              return Ct(e, t.x, t.width) + ' ' + Ct(n, t.y, t.height);
            })(c || Vt, void 0 !== g ? g : 0.5, void 0 !== b ? b : 0.5)),
          void 0 !== m && (i.x = m),
          void 0 !== y && (i.y = y),
          void 0 !== l &&
            void 0 !== x &&
            (function (t, e, n, r, i, o) {
              void 0 === r && (r = 1),
                void 0 === i && (i = 0),
                void 0 === o && (o = !0);
              var a = o ? St : At;
              t[a.offset] = Pt(-i, e);
              var s = Pt(n, e),
                u = Pt(r, e);
              t[a.array] = s + ' ' + u;
            })(i, l, x, O, w, !1),
          i
        );
      }
      var Lt = new Set([
          'baseFrequency',
          'diffuseConstant',
          'kernelMatrix',
          'kernelUnitLength',
          'keySplines',
          'keyTimes',
          'limitingConeAngle',
          'markerHeight',
          'markerWidth',
          'numOctaves',
          'targetX',
          'targetY',
          'surfaceScale',
          'specularConstant',
          'specularExponent',
          'stdDeviation',
          'tableValues',
          'viewBox',
        ]),
        Bt = /([a-z])([A-Z])/g,
        kt = function (t) {
          return t.replace(Bt, '$1-$2').toLowerCase();
        },
        Mt = (function (t) {
          function e() {
            var e = (null !== t && t.apply(this, arguments)) || this;
            return (
              (e.attrs = {}),
              (e.defaultConfig = { enableHardwareAcceleration: !1 }),
              (e.config = e.defaultConfig),
              e
            );
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.mount = function (e) {
              t.prototype.mount.call(this, e), this.measure();
            }),
            (e.prototype.measure = function () {
              try {
                this.dimensions =
                  'function' === typeof this.element.getBBox
                    ? this.element.getBBox()
                    : this.element.getBoundingClientRect();
              } catch (t) {
                this.dimensions = { x: 0, y: 0, width: 0, height: 0 };
              }
              'path' === this.element.tagName &&
                (this.totalPathLength = this.element.getTotalLength());
            }),
            (e.prototype.clean = function () {
              t.prototype.clean.call(this), (this.attrs = {});
            }),
            (e.prototype.read = function (t) {
              return (t = Lt.has(t) ? t : kt(t)), this.element.getAttribute(t);
            }),
            (e.prototype.build = function () {
              this.updateTransformDeltas(),
                Tt(
                  this.latest,
                  this.style,
                  this.vars,
                  this.attrs,
                  this.transform,
                  this.transformOrigin,
                  this.transformKeys,
                  this.config,
                  this.dimensions,
                  this.totalPathLength,
                  this.isLayoutProjectionEnabled && !!this.box,
                  this.delta,
                  this.deltaFinal,
                  this.treeScale,
                  this.targetBoxFinal
                );
            }),
            (e.prototype.render = function () {
              for (var e in (t.prototype.render.call(this), this.attrs))
                this.element.setAttribute(Lt.has(e) ? e : kt(e), this.attrs[e]);
            }),
            e
          );
        })(Ot);
      var Rt = new Set([
        'animate',
        'circle',
        'clipPath',
        'defs',
        'desc',
        'ellipse',
        'feBlend',
        'feColorMatrix',
        'feComponentTransfer',
        'feComposite',
        'feConvolveMatrix',
        'feDiffuseLighting',
        'feDisplacementMap',
        'feDistantLight',
        'feDropShadow',
        'feFlood',
        'feFuncA',
        'feFuncB',
        'feFuncG',
        'feFuncR',
        'feGaussianBlur',
        'feImage',
        'feMerge',
        'feMergeNode',
        'feMorphology',
        'feOffset',
        'fePointLight',
        'feSpecularLighting',
        'feSpotLight',
        'feTile',
        'feTurbulence',
        'filter',
        'foreignObject',
        'g',
        'image',
        'line',
        'linearGradient',
        'marker',
        'mask',
        'metadata',
        'path',
        'pattern',
        'polygon',
        'polyline',
        'radialGradient',
        'rect',
        'stop',
        'svg',
        'switch',
        'symbol',
        'text',
        'textPath',
        'tspan',
        'use',
        'view',
      ]);
      function Dt(t) {
        return 'string' === typeof t && Rt.has(t);
      }
      var Ft = Object(u.createContext)(null);
      function Ut() {
        var t = Object(u.useContext)(Ft);
        if (null === t) return [!0, null];
        var e = t.isPresent,
          n = t.onExitComplete,
          r = t.register,
          i = Yt();
        Object(u.useEffect)(function () {
          return r(i);
        }, []);
        return !e && n
          ? [
              !1,
              function () {
                return null === n || void 0 === n ? void 0 : n(i);
              },
            ]
          : [!0];
      }
      var It = 0,
        Ht = function () {
          return It++;
        },
        Yt = function () {
          return wt(Ht);
        },
        Xt = function (t, e, n, i, o) {
          var a = wt(function () {
            return new (Dt(t) ? Mt : Ot)(n, o);
          });
          a.updateConfig(Object(r.a)({ enableHardwareAcceleration: !i }, e)),
            (a.layoutId = e.layoutId);
          var s = (function () {
            var t = Object(u.useContext)(Ft);
            return null === t || t.isPresent;
          })();
          return (
            (a.isPresent = void 0 !== e.isPresent ? e.isPresent : s),
            Object(u.useEffect)(
              function () {
                if (e.onViewportBoxUpdate)
                  return a.onViewportBoxUpdate(e.onViewportBoxUpdate);
              },
              [e.onViewportBoxUpdate]
            ),
            a
          );
        },
        zt = new Set([
          'initial',
          'animate',
          'exit',
          'style',
          'variants',
          'transition',
          'transformTemplate',
          'transformValues',
          'custom',
          'inherit',
          'static',
          'layout',
          'layoutId',
          'onLayoutAnimationComplete',
          'onViewportBoxUpdate',
          'onAnimationStart',
          'onAnimationComplete',
          'onUpdate',
          'onDragStart',
          'onDrag',
          'onDragEnd',
          'onMeasureDragConstraints',
          'onDirectionLock',
          'onDragTransitionEnd',
          'drag',
          'dragControls',
          'dragListener',
          'dragConstraints',
          'dragDirectionLock',
          '_dragX',
          '_dragY',
          'dragElastic',
          'dragMomentum',
          'dragPropagation',
          'dragTransition',
          'onPan',
          'onPanStart',
          'onPanEnd',
          'onPanSessionStart',
          'onTap',
          'onTapStart',
          'onTapCancel',
          'whileHover',
          'whileTap',
          'onHoverEnd',
          'onHoverStart',
        ]);
      function Nt(t) {
        return zt.has(t);
      }
      var Wt = function (t) {
        return !Nt(t);
      };
      try {
        var Gt = n('9uj6').default;
        Wt = function (t) {
          return t.startsWith('on') ? !Nt(t) : Gt(t);
        };
      } catch (Bn) {}
      function Zt(t, e, n) {
        var i =
          'string' === typeof t
            ? (function (t) {
                var e = {};
                for (var n in t) Wt(n) && (e[n] = t[n]);
                return e;
              })(e)
            : e;
        n.clean(), n.build();
        var o = Dt(t)
          ? (function (t) {
              return Object(r.a)(Object(r.a)({}, t.attrs), {
                style: Object(r.a)({}, t.reactStyle),
              });
            })(n)
          : (function (t, e) {
              var n = e.drag,
                i = {
                  style: Object(r.a)(
                    Object(r.a)(Object(r.a)({}, t.reactStyle), t.style),
                    t.vars
                  ),
                };
              return (
                n && ((i.style.userSelect = 'none'), (i.draggable = !1)), i
              );
            })(n, e);
        return Object(u.createElement)(
          t,
          Object(r.a)(Object(r.a)(Object(r.a)({}, i), { ref: n.ref }), o)
        );
      }
      var _t,
        $t = new Set([
          'width',
          'height',
          'top',
          'left',
          'right',
          'bottom',
          'x',
          'y',
        ]),
        Kt = function (t) {
          return $t.has(t);
        },
        qt = function (t, e) {
          t.set(e, !1), t.set(e);
        },
        Jt = function (t) {
          return t === s.g || t === s.j;
        };
      !(function (t) {
        (t.width = 'width'),
          (t.height = 'height'),
          (t.left = 'left'),
          (t.right = 'right'),
          (t.top = 'top'),
          (t.bottom = 'bottom');
      })(_t || (_t = {}));
      var Qt = function (t, e) {
          return parseFloat(t.split(', ')[e]);
        },
        te = function (t, e) {
          return function (n, r) {
            var i = r.transform;
            if ('none' === i || !i) return 0;
            var o = i.match(/^matrix3d\((.+)\)$/);
            if (o) return Qt(o[1], e);
            var a = i.match(/^matrix\((.+)\)$/);
            return a ? Qt(a[1], t) : 0;
          };
        },
        ee = new Set(['x', 'y', 'z']),
        ne = L.filter(function (t) {
          return !ee.has(t);
        });
      var re = {
          width: function (t) {
            var e = t.x;
            return e.max - e.min;
          },
          height: function (t) {
            var e = t.y;
            return e.max - e.min;
          },
          top: function (t, e) {
            var n = e.top;
            return parseFloat(n);
          },
          left: function (t, e) {
            var n = e.left;
            return parseFloat(n);
          },
          bottom: function (t, e) {
            var n = t.y,
              r = e.top;
            return parseFloat(r) + (n.max - n.min);
          },
          right: function (t, e) {
            var n = t.x,
              r = e.left;
            return parseFloat(r) + (n.max - n.min);
          },
          x: te(4, 13),
          y: te(5, 14),
        },
        ie = function (t, e, n, i) {
          void 0 === n && (n = {}),
            void 0 === i && (i = {}),
            (e = Object(r.a)({}, e)),
            (i = Object(r.a)({}, i));
          var o = Object.keys(e).filter(Kt),
            u = [],
            c = !1,
            l = [];
          if (
            (o.forEach(function (r) {
              var o = t.getValue(r);
              if (t.hasValue(r)) {
                var f,
                  d = n[r],
                  p = e[r],
                  h = w(d);
                if (dt(p))
                  for (var v = p.length, m = null === p[0] ? 1 : 0; m < v; m++)
                    f
                      ? Object(a.a)(
                          w(p[m]) === f,
                          'All keyframes must be of the same type'
                        )
                      : ((f = w(p[m])),
                        Object(a.a)(
                          f === h || (Jt(h) && Jt(f)),
                          'Keyframes must be of the same dimension as the current value'
                        ));
                else f = w(p);
                if (h !== f)
                  if (Jt(h) && Jt(f)) {
                    var y = o.get();
                    'string' === typeof y && o.set(parseFloat(y)),
                      'string' === typeof p
                        ? (e[r] = parseFloat(p))
                        : Array.isArray(p) &&
                          f === s.j &&
                          (e[r] = p.map(parseFloat));
                  } else
                    (null === h || void 0 === h ? void 0 : h.transform) &&
                    (null === f || void 0 === f ? void 0 : f.transform) &&
                    (0 === d || 0 === p)
                      ? 0 === d
                        ? o.set(f.transform(d))
                        : (e[r] = h.transform(p))
                      : (c ||
                          ((u = (function (t) {
                            var e = [];
                            return (
                              ne.forEach(function (n) {
                                var r = t.getValue(n);
                                void 0 !== r &&
                                  (e.push([n, r.get()]),
                                  r.set(n.startsWith('scale') ? 1 : 0));
                              }),
                              e.length && t.render(),
                              e
                            );
                          })(t)),
                          (c = !0)),
                        l.push(r),
                        (i[r] = void 0 !== i[r] ? i[r] : e[r]),
                        qt(o, p));
              }
            }),
            l.length)
          ) {
            var f = (function (t, e, n) {
              var r = e.getBoundingBox(),
                i = e.getComputedStyle(),
                o = i.display,
                a = {
                  top: i.top,
                  left: i.left,
                  bottom: i.bottom,
                  right: i.right,
                  transform: i.transform,
                };
              'none' === o &&
                e.setStaticValues('display', t.display || 'block'),
                e.render();
              var s = e.getBoundingBox();
              return (
                n.forEach(function (n) {
                  var o = e.getValue(n);
                  qt(o, re[n](r, a)), (t[n] = re[n](s, i));
                }),
                t
              );
            })(e, t, l);
            return (
              u.length &&
                u.forEach(function (e) {
                  var n = Object(r.c)(e, 2),
                    i = n[0],
                    o = n[1];
                  t.getValue(i).set(o);
                }),
              t.render(),
              { target: f, transitionEnd: i }
            );
          }
          return { target: e, transitionEnd: i };
        };
      function oe(t, e, n, r) {
        return (function (t) {
          return Object.keys(t).some(Kt);
        })(e)
          ? ie(t, e, n, r)
          : { target: e, transitionEnd: r };
      }
      var ae = function (t, e, n, i) {
        var o = (function (t, e, n) {
          var i,
            o = Object(r.d)(e, []),
            a = t.getInstance();
          if (!(a instanceof HTMLElement))
            return { target: o, transitionEnd: n };
          for (var s in (n && (n = Object(r.a)({}, n)),
          t.forEachValue(function (t) {
            var e = t.get();
            if (Y(e)) {
              var n = z(e, a);
              n && t.set(n);
            }
          }),
          o)) {
            var u = o[s];
            if (Y(u)) {
              var c = z(u, a);
              c &&
                ((o[s] = c),
                n && ((null !== (i = n[s]) && void 0 !== i) || (n[s] = u)));
            }
          }
          return { target: o, transitionEnd: n };
        })(t, e, i);
        return oe(t, (e = o.target), n, (i = o.transitionEnd));
      };
      var se = (function () {
          function t() {
            (this.hasMounted = !1),
              (this.pendingAnimations = []),
              (this.componentControls = new Set());
          }
          return (
            (t.prototype.setVariants = function (t) {
              (this.variants = t),
                this.componentControls.forEach(function (e) {
                  return e.setVariants(t);
                });
            }),
            (t.prototype.setDefaultTransition = function (t) {
              (this.defaultTransition = t),
                this.componentControls.forEach(function (e) {
                  return e.setDefaultTransition(t);
                });
            }),
            (t.prototype.subscribe = function (t) {
              var e = this;
              return (
                this.componentControls.add(t),
                this.variants && t.setVariants(this.variants),
                this.defaultTransition &&
                  t.setDefaultTransition(this.defaultTransition),
                function () {
                  return e.componentControls.delete(t);
                }
              );
            }),
            (t.prototype.start = function (t, e) {
              var n = this;
              if (this.hasMounted) {
                var r = [];
                return (
                  this.componentControls.forEach(function (n) {
                    var i = n.start(t, { transitionOverride: e });
                    r.push(i);
                  }),
                  Promise.all(r)
                );
              }
              return new Promise(function (r) {
                n.pendingAnimations.push({ animation: [t, e], resolve: r });
              });
            }),
            (t.prototype.set = function (t) {
              return (
                Object(a.a)(
                  this.hasMounted,
                  'controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.'
                ),
                this.componentControls.forEach(function (e) {
                  return e.apply(t);
                })
              );
            }),
            (t.prototype.stop = function () {
              this.componentControls.forEach(function (t) {
                return t.stop();
              });
            }),
            (t.prototype.mount = function () {
              var t = this;
              (this.hasMounted = !0),
                this.pendingAnimations.forEach(function (e) {
                  var n = e.animation,
                    i = e.resolve;
                  return t.start.apply(t, Object(r.e)(n)).then(i);
                });
            }),
            (t.prototype.unmount = function () {
              (this.hasMounted = !1), this.stop();
            }),
            t
          );
        })(),
        ue = Object(u.createContext)({ static: !1 }),
        ce = function (t) {
          return 'string' === typeof t || Array.isArray(t);
        },
        le = function (t) {
          return t instanceof se;
        },
        fe = function (t, e, n, r, i) {
          void 0 === r && (r = !1);
          var o,
            a = i.initial,
            s = i.animate,
            c = i.variants,
            l = i.whileTap,
            f = i.whileHover,
            d = i.layoutId,
            p = Object(u.useContext)(Ft),
            h = null === p || void 0 === p ? void 0 : p.id;
          (n.isPresenceRoot = t.presenceId !== h),
            void 0 !== (null === p || void 0 === p ? void 0 : p.initial) &&
              (a = p.initial),
            !1 !== a || le(s) ? 'boolean' !== typeof a && (o = a) : (o = s);
          var v = Object(u.useRef)(!1),
            m = c || ce(s) || ce(l) || ce(f) || le(s),
            y = ce(o) ? o : t.initial,
            g = ce(s) ? s : t.animate,
            b = r ? y : null,
            x = m && ce(g) ? g : null,
            j = Object(u.useMemo)(
              function () {
                return {
                  controls: m ? e : t.controls,
                  initial: y,
                  animate: g,
                  visualElement: n,
                  hasMounted: v,
                  isReducedMotion: t.isReducedMotion,
                  presenceId: h,
                };
              },
              [b, x, t.isReducedMotion, s, d, h]
            );
          return (
            (j.static = r),
            (function (t, e) {
              void 0 === e && (e = !1);
              var n = Object(u.useRef)(!0);
              (!e || (e && n.current)) && t(), (n.current = !1);
            })(function () {
              var n = o || t.initial;
              n && e.apply(n);
            }, !r),
            Object(u.useEffect)(function () {
              v.current = !0;
            }, []),
            j
          );
        },
        de = function (t) {
          var e = t.animate,
            n = t.variants,
            r = t.inherit;
          return (void 0 === r || r) && !!n && (!e || e instanceof se);
        },
        pe = function (t) {
          return t instanceof d;
        };
      function he(t, e) {
        var n = e.layout,
          r = e.layoutId;
        return M(t) || D(t) || ((n || void 0 !== r) && !!G[t]);
      }
      function ve(t, e, n, r, i) {
        for (var o in (void 0 === r && (r = !1), r && (t.reactStyle = {}), n)) {
          var a = n[o],
            s = !1;
          if (pe(a)) me.has(o) || (t.addValue(o, a), (s = !0));
          else if (he(o, i)) {
            if (t.hasValue(o)) {
              if (a !== e[o]) {
                t.getValue(o).set(a);
              }
            } else t.addValue(o, p(a));
            s = !0;
          } else r && (t.reactStyle[o] = a);
          s && (e[o] = a);
        }
      }
      var me = new Set([]),
        ye = function () {
          return {};
        },
        ge = function (t) {
          return dt(t) ? t[t.length - 1] || 0 : t;
        },
        be = (function () {
          function t(t, e) {
            var n = this,
              r = e.makeTargetAnimatable;
            (this.props = {}),
              (this.variants = {}),
              (this.baseTarget = {}),
              (this.overrides = []),
              (this.resolvedOverrides = []),
              (this.activeOverrides = new Set()),
              (this.isAnimating = new Set()),
              (this.hasValue = function (t) {
                return !n.visualElement.hasValue(t);
              }),
              (this.visualElement = t),
              (this.makeTargetAnimatable = r),
              this.visualElement.forEachValue(function (t, e) {
                return (n.baseTarget[e] = t.get());
              });
          }
          return (
            (t.prototype.setProps = function (t) {
              this.props = t;
            }),
            (t.prototype.setVariants = function (t) {
              t && (this.variants = t);
            }),
            (t.prototype.setDefaultTransition = function (t) {
              t && (this.defaultTransition = t);
            }),
            (t.prototype.setValues = function (t, e) {
              var n = void 0 === e ? {} : e,
                i = n.isActive,
                o = void 0 === i ? new Set() : i,
                a = n.priority,
                s = this.resolveVariant(t),
                u = s.target,
                c = s.transitionEnd;
              for (var l in (u = this.transformValues(
                Object(r.a)(Object(r.a)({}, u), c)
              ))) {
                if (o.has(l)) return;
                if ((o.add(l), u)) {
                  var f = ge(u[l]);
                  if (this.visualElement.hasValue(l)) {
                    var d = this.visualElement.getValue(l);
                    d && d.set(f);
                  } else this.visualElement.addValue(l, p(f));
                  a || (this.baseTarget[l] = f);
                }
              }
            }),
            (t.prototype.transformValues = function (t) {
              var e = this.props.transformValues;
              return e ? e(t) : t;
            }),
            (t.prototype.checkForNewValues = function (t) {
              var e = Object.keys(t).filter(this.hasValue),
                n = e.length;
              if (n)
                for (var r = 0; r < n; r++) {
                  var i = e[r],
                    o = t[i],
                    u = null;
                  if ((Array.isArray(o) && (u = o[0]), null === u)) {
                    var c = this.visualElement.readNativeValue(i);
                    (u = void 0 !== c ? c : t[i]),
                      Object(a.a)(
                        null !== u,
                        'No initial value for "' +
                          i +
                          '" can be inferred. Ensure an initial value for "' +
                          i +
                          '" is defined on the component.'
                      );
                  }
                  'string' === typeof u && /^\-?\d*\.?\d+$/.test(u)
                    ? (u = parseFloat(u))
                    : !P(u) && s.c.test(o) && (u = s.c.getAnimatableNone(o)),
                    this.visualElement.addValue(i, p(u)),
                    (this.baseTarget[i] = u);
                }
            }),
            (t.prototype.resolveVariant = function (t, e) {
              var n = (void 0 === e ? {} : e).custom;
              if (!t)
                return {
                  target: void 0,
                  transition: void 0,
                  transitionEnd: void 0,
                };
              'function' === typeof t &&
                (t = t(
                  null !== n && void 0 !== n ? n : this.props.custom,
                  (function (t) {
                    var e = {};
                    return (
                      t.forEachValue(function (t, n) {
                        return (e[n] = t.get());
                      }),
                      e
                    );
                  })(this.visualElement),
                  (function (t) {
                    var e = {};
                    return (
                      t.forEachValue(function (t, n) {
                        return (e[n] = t.getVelocity());
                      }),
                      e
                    );
                  })(this.visualElement)
                ));
              var i = t.transition;
              return {
                transition: void 0 === i ? this.defaultTransition : i,
                transitionEnd: t.transitionEnd,
                target: Object(r.d)(t, ['transition', 'transitionEnd']),
              };
            }),
            (t.prototype.getHighestPriority = function () {
              return this.activeOverrides.size
                ? Math.max.apply(
                    Math,
                    Object(r.e)(Array.from(this.activeOverrides))
                  )
                : 0;
            }),
            (t.prototype.setOverride = function (t, e) {
              (this.overrides[e] = t),
                this.children &&
                  this.children.forEach(function (n) {
                    return n.setOverride(t, e);
                  });
            }),
            (t.prototype.startOverride = function (t) {
              var e = this.overrides[t];
              if (e) return this.start(e, { priority: t });
            }),
            (t.prototype.clearOverride = function (t) {
              var e = this;
              if (
                (this.children &&
                  this.children.forEach(function (e) {
                    return e.clearOverride(t);
                  }),
                this.overrides[t])
              ) {
                this.activeOverrides.delete(t);
                var n = this.getHighestPriority();
                if ((this.resetIsAnimating(), n))
                  this.overrides[n] && this.startOverride(n);
                var r = this.resolvedOverrides[t];
                if (r) {
                  var i = {};
                  for (var o in this.baseTarget)
                    void 0 !== r[o] && (i[o] = this.baseTarget[o]);
                  this.onStart(),
                    this.animate(i).then(function () {
                      return e.onComplete();
                    });
                }
              }
            }),
            (t.prototype.apply = function (t) {
              return Array.isArray(t)
                ? this.applyVariantLabels(t)
                : 'string' === typeof t
                ? this.applyVariantLabels([t])
                : void this.setValues(t);
            }),
            (t.prototype.applyVariantLabels = function (t) {
              var e = this,
                n = new Set();
              Object(r.e)(t)
                .reverse()
                .forEach(function (r) {
                  var i = e.resolveVariant(e.variants[r]),
                    o = i.target,
                    a = i.transitionEnd;
                  o && e.setValues(o, { isActive: n }),
                    a && e.setValues(a, { isActive: n }),
                    e.children &&
                      e.children.size &&
                      e.children.forEach(function (e) {
                        return e.applyVariantLabels(t);
                      });
                });
            }),
            (t.prototype.start = function (t, e) {
              var n,
                r,
                i = this;
              return (
                void 0 === e && (e = {}),
                e.priority && this.activeOverrides.add(e.priority),
                this.resetIsAnimating(e.priority),
                (r = t),
                (n = Array.isArray(r)
                  ? this.animateVariantLabels(t, e)
                  : 'string' === typeof t
                  ? this.animateVariant(t, e)
                  : this.animate(t, e)),
                this.onStart(),
                n.then(function () {
                  return i.onComplete();
                })
              );
            }),
            (t.prototype.animate = function (t, e) {
              var n = this;
              void 0 === e && (e = {});
              var i = e.delay,
                o = void 0 === i ? 0 : i,
                a = e.priority,
                s = void 0 === a ? 0 : a,
                u = e.transitionOverride,
                c = Object(r.d)(e, ['delay', 'priority', 'transitionOverride']),
                l = this.resolveVariant(t, c),
                f = l.target,
                d = l.transition,
                p = l.transitionEnd;
              if ((u && (d = u), !f)) return Promise.resolve();
              (f = this.transformValues(f)),
                p && (p = this.transformValues(p)),
                this.checkForNewValues(f);
              var h = this.transformValues(
                (function (t, e, n) {
                  var r,
                    i,
                    o = {};
                  for (var a in t)
                    o[a] =
                      null !== (r = xe(a, e)) && void 0 !== r
                        ? r
                        : null === (i = n.getValue(a)) || void 0 === i
                        ? void 0
                        : i.get();
                  return o;
                })(f, d, this.visualElement)
              );
              if (this.makeTargetAnimatable) {
                var v = this.makeTargetAnimatable(this.visualElement, f, h, p);
                (f = v.target), (p = v.transitionEnd);
              }
              s && (this.resolvedOverrides[s] = f), this.checkForNewValues(f);
              var m = [];
              for (var y in f) {
                var g = this.visualElement.getValue(y);
                if (g && f && void 0 !== f[y]) {
                  var b = f[y];
                  s || (this.baseTarget[y] = ge(b)),
                    this.isAnimating.has(y) ||
                      (this.isAnimating.add(y),
                      m.push(xt(y, g, b, Object(r.a)({ delay: o }, d))));
                }
              }
              var x = Promise.all(m);
              return p
                ? x.then(function () {
                    n.setValues(p, { priority: s });
                  })
                : x;
            }),
            (t.prototype.animateVariantLabels = function (t, e) {
              var n = this,
                i = Object(r.e)(t)
                  .reverse()
                  .map(function (t) {
                    return n.animateVariant(t, e);
                  });
              return Promise.all(i);
            }),
            (t.prototype.animateVariant = function (t, e) {
              var n = this,
                i = (e && e.priority) || 0,
                o = this.variants[t],
                a = (o && this.resolveVariant(o, e).transition) || {},
                s = o
                  ? function () {
                      return n.animate(o, e);
                    }
                  : function () {
                      return Promise.resolve();
                    },
                u = this.children
                  ? function (r) {
                      void 0 === r && (r = 0);
                      var o = a.delayChildren,
                        s = void 0 === o ? 0 : o;
                      return n.animateChildren(
                        t,
                        s + r,
                        a.staggerChildren,
                        a.staggerDirection,
                        i,
                        null === e || void 0 === e ? void 0 : e.custom
                      );
                    }
                  : function () {
                      return Promise.resolve();
                    },
                c = a.when;
              if (c) {
                var l = Object(r.c)(
                    'beforeChildren' === c ? [s, u] : [u, s],
                    2
                  ),
                  f = l[0],
                  d = l[1];
                return f().then(d);
              }
              return Promise.all([
                s(),
                u(null === e || void 0 === e ? void 0 : e.delay),
              ]);
            }),
            (t.prototype.animateChildren = function (t, e, n, r, i, o) {
              if (
                (void 0 === e && (e = 0),
                void 0 === n && (n = 0),
                void 0 === r && (r = 1),
                void 0 === i && (i = 0),
                !this.children)
              )
                return Promise.resolve();
              var a = [],
                s = (this.children.size - 1) * n,
                u =
                  1 === r
                    ? function (t) {
                        return t * n;
                      }
                    : function (t) {
                        return s - t * n;
                      };
              return (
                Array.from(this.children).forEach(function (n, r) {
                  var s = n.animateVariant(t, {
                    priority: i,
                    delay: e + u(r),
                    custom: o,
                  });
                  a.push(s);
                }),
                Promise.all(a)
              );
            }),
            (t.prototype.onStart = function () {
              var t = this.props.onAnimationStart;
              t && t();
            }),
            (t.prototype.onComplete = function () {
              var t = this.props.onAnimationComplete;
              t && t();
            }),
            (t.prototype.checkOverrideIsAnimating = function (t) {
              for (var e = this.overrides.length, n = t + 1; n < e; n++) {
                var r = this.resolvedOverrides[n];
                if (r) for (var i in r) this.isAnimating.add(i);
              }
            }),
            (t.prototype.resetIsAnimating = function (t) {
              void 0 === t && (t = 0),
                this.isAnimating.clear(),
                t < this.getHighestPriority() &&
                  this.checkOverrideIsAnimating(t),
                this.children &&
                  this.children.forEach(function (e) {
                    return e.resetIsAnimating(t);
                  });
            }),
            (t.prototype.stop = function () {
              this.visualElement.forEachValue(function (t) {
                return t.stop();
              });
            }),
            (t.prototype.addChild = function (t) {
              this.children || (this.children = new Set()),
                this.children.add(t),
                this.overrides.forEach(function (e, n) {
                  e && t.setOverride(e, n);
                });
            }),
            (t.prototype.removeChild = function (t) {
              this.children && this.children.delete(t);
            }),
            (t.prototype.resetChildren = function () {
              this.children && this.children.clear();
            }),
            t
          );
        })();
      function xe(t, e) {
        if (e) return (e[t] || e.default || e).from;
      }
      function je(t, e, n) {
        var i = de(e),
          o = e.variants,
          a = e.transition,
          s = Object(u.useContext)(ue).controls,
          c = Object(u.useContext)(Ft),
          l = wt(function () {
            return new be(t, n);
          });
        return (
          (c && !c.isPresent) ||
            (l.resetChildren(),
            l.setProps(e),
            l.setVariants(o),
            l.setDefaultTransition(a)),
          Object(u.useEffect)(function () {
            i && s && s.addChild(l);
          }),
          Object(u.useEffect)(function () {
            return function () {
              e.onAnimationComplete;
              var t = Object(r.d)(e, ['onAnimationComplete']);
              l.setProps(t), s && s.removeChild(l);
            };
          }, []),
          l
        );
      }
      var Oe,
        Ee,
        we = Object(u.createContext)({
          transformPagePoint: function (t) {
            return t;
          },
          features: [],
        });
      !(function (t) {
        (t[(t.Entering = 0)] = 'Entering'),
          (t[(t.Present = 1)] = 'Present'),
          (t[(t.Exiting = 2)] = 'Exiting');
      })(Oe || (Oe = {})),
        (function (t) {
          (t[(t.Hide = 0)] = 'Hide'), (t[(t.Show = 1)] = 'Show');
        })(Ee || (Ee = {}));
      var Ce = {
          measureLayout: function (t) {
            return t.measureLayout();
          },
          layoutReady: function (t) {
            return t.layoutReady();
          },
        },
        Pe = function (t, e) {
          return t.depth - e.depth;
        };
      function Se() {
        var t = new Set();
        return {
          add: function (e) {
            return t.add(e);
          },
          flush: function (e) {
            var n = void 0 === e ? Ce : e,
              r = n.measureLayout,
              i = n.layoutReady,
              o = Array.from(t).sort(Pe);
            o.forEach(function (t) {
              return t.resetTransform();
            }),
              o.forEach(r),
              o.forEach(i),
              o.forEach(function (t) {
                t.isPresent && (t.presence = Oe.Present);
              }),
              t.clear();
          },
        };
      }
      function Ae(t) {
        return !!t.forceUpdate;
      }
      var Ve = Object(u.createContext)(Se()),
        Te = 'undefined' !== typeof window ? u.useLayoutEffect : u.useEffect;
      function Le(t, e) {
        var n = e.defaultFeatures,
          i = e.useVisualElement,
          o = e.render,
          a = e.animationControlsConfig;
        return Object(u.forwardRef)(function (e, s) {
          var c = Object(u.useContext)(ue),
            l = de(e),
            f = c.static || e.static || !1,
            d = i(t, e, c.visualElement, f, s);
          !(function (t, e) {
            var n = wt(ye);
            for (var r in n) {
              var i = he(r, e),
                o = e[r],
                a = e.style && e.style[r],
                s = o && pe(e[r]),
                u = a && pe(e.style[r]);
              ((i && !o && !a) || (!i && !s && !u)) &&
                (t.removeValue(r), delete n[r]);
            }
            ve(t, n, e, !1, e),
              e.style && ve(t, n, e.style, !0, e),
              e.transformValues &&
                (t.reactStyle = e.transformValues(t.reactStyle));
          })(d, e);
          var p = je(d, e, a),
            h = fe(c, p, d, f, e),
            v = (function (t, e, n, i, o, a, s, c) {
              var l = Object(u.useContext)(we);
              if (e || 'undefined' === typeof window) return null;
              for (
                var f = Object(r.e)(t, l.features), d = f.length, p = [], h = 0;
                h < d;
                h++
              ) {
                var v = f[h],
                  m = v.shouldRender,
                  y = v.key,
                  g = v.getComponent;
                if (m(o, s)) {
                  var b = g(o);
                  b &&
                    p.push(
                      Object(u.createElement)(
                        b,
                        Object(r.a)({ key: y }, o, {
                          localContext: a,
                          parentContext: s,
                          visualElement: n,
                          controls: i,
                          inherit: c,
                        })
                      )
                    );
                }
              }
              return p;
            })(n, f, d, p, e, h, c, l),
            m = o(t, e, d);
          return (
            (function (t) {
              var e = Object(u.useContext)(Ve);
              Te(function () {
                return function () {
                  Ae(e) && e.remove(t);
                };
              }, []);
            })(d),
            Object(u.createElement)(
              u.Fragment,
              null,
              Object(u.createElement)(ue.Provider, { value: h }, m),
              v
            )
          );
        });
      }
      function Be(t) {
        var e = null;
        return function () {
          return (
            null === e &&
            ((e = t),
            function () {
              e = null;
            })
          );
        };
      }
      var ke = Be('dragHorizontal'),
        Me = Be('dragVertical');
      function Re(t) {
        var e = !1;
        if ('y' === t) e = Me();
        else if ('x' === t) e = ke();
        else {
          var n = ke(),
            r = Me();
          n && r
            ? (e = function () {
                n(), r();
              })
            : (n && n(), r && r());
        }
        return e;
      }
      var De = !1;
      'undefined' !== typeof window &&
        document.addEventListener(
          'touchmove',
          function (t) {
            De && t.preventDefault();
          },
          { passive: !1 }
        );
      var Fe = function () {
        return (De = !1);
      };
      function Ue(t, e, n, r) {
        if (n)
          return (
            t.addEventListener(e, n, r),
            function () {
              return t.removeEventListener(e, n, r);
            }
          );
      }
      function Ie(t) {
        return 'undefined' !== typeof PointerEvent && t instanceof PointerEvent
          ? !('mouse' !== t.pointerType)
          : t instanceof MouseEvent;
      }
      function He(t) {
        return !!t.touches;
      }
      var Ye = { pageX: 0, pageY: 0 };
      function Xe(t, e) {
        void 0 === e && (e = 'page');
        var n = t.touches[0] || t.changedTouches[0] || Ye;
        return { x: n[e + 'X'], y: n[e + 'Y'] };
      }
      function ze(t, e) {
        return void 0 === e && (e = 'page'), { x: t[e + 'X'], y: t[e + 'Y'] };
      }
      function Ne(t, e) {
        return (
          void 0 === e && (e = 'page'), { point: He(t) ? Xe(t, e) : ze(t, e) }
        );
      }
      function We(t) {
        return Ne(t, 'client');
      }
      var Ge,
        Ze = function (t, e) {
          if ((void 0 === e && (e = !1), t)) {
            var n = function (e) {
              return t(e, Ne(e));
            };
            return e
              ? (function (t) {
                  if (t)
                    return function (e) {
                      var n = e instanceof MouseEvent;
                      (!n || (n && 0 === e.button)) && t(e);
                    };
                })(n)
              : n;
          }
        },
        _e = 'undefined' !== typeof window,
        $e = {
          pointerdown: 'mousedown',
          pointermove: 'mousemove',
          pointerup: 'mouseup',
          pointercancel: 'mousecancel',
          pointerover: 'mouseover',
          pointerout: 'mouseout',
          pointerenter: 'mouseenter',
          pointerleave: 'mouseleave',
        },
        Ke = {
          pointerdown: 'touchstart',
          pointermove: 'touchmove',
          pointerup: 'touchend',
          pointercancel: 'touchcancel',
        };
      function qe(t) {
        return _e && null === window.onpointerdown
          ? t
          : _e && null === window.ontouchstart
          ? Ke[t]
          : _e && null === window.onmousedown
          ? $e[t]
          : t;
      }
      function Je(t, e, n, r) {
        return Ue(t, qe(e), Ze(n, 'pointerdown' === e), r);
      }
      function Qe(t, e, n, r) {
        return (function (t, e, n, r) {
          Object(u.useEffect)(
            function () {
              var i = t.current;
              if (n && i) return Ue(i, e, n, r);
            },
            [t, e, n, r]
          );
        })(t, qe(e), Ze(n, 'pointerdown' === e), r);
      }
      !(function (t) {
        (t.subtract = function (t, e) {
          return { x: t.x - e.x, y: t.y - e.y };
        }),
          (t.relativeTo = function (t) {
            var e;
            return function (n) {
              var r = n.x,
                i = n.y,
                o =
                  void 0 !== e
                    ? e
                    : (e =
                        'string' === typeof t ? document.getElementById(t) : t);
              if (o) {
                var a = o.getBoundingClientRect();
                return {
                  x: r - a.left - window.scrollX,
                  y: i - a.top - window.scrollY,
                };
              }
            };
          });
      })(Ge || (Ge = {}));
      var tn = (function () {
        function t(t, e, n) {
          var a = this,
            s = (void 0 === n ? {} : n).transformPagePoint;
          if (
            ((this.startEvent = null),
            (this.lastMoveEvent = null),
            (this.lastMoveEventInfo = null),
            (this.handlers = {}),
            (this.updatePoint = function () {
              if (a.lastMoveEvent && a.lastMoveEventInfo) {
                var t = nn(a.lastMoveEventInfo, a.history),
                  e = null !== a.startEvent,
                  n = Object(o.distance)(t.offset, { x: 0, y: 0 }) >= 3;
                if (e || n) {
                  var s = t.point,
                    u = Object(i.c)().timestamp;
                  a.history.push(
                    Object(r.a)(Object(r.a)({}, s), { timestamp: u })
                  );
                  var c = a.handlers,
                    l = c.onStart,
                    f = c.onMove;
                  e ||
                    (l && l(a.lastMoveEvent, t),
                    (a.startEvent = a.lastMoveEvent)),
                    f && f(a.lastMoveEvent, t);
                }
              }
            }),
            !(He(t) && t.touches.length > 1))
          ) {
            (this.handlers = e), (this.transformPagePoint = s);
            var u = en(Ne(t), this.transformPagePoint),
              c = u.point,
              l = Object(i.c)().timestamp;
            this.history = [Object(r.a)(Object(r.a)({}, c), { timestamp: l })];
            var f = e.onSessionStart;
            f && f(t, nn(u, this.history));
            var d = Je(window, 'pointermove', function (t, e) {
                return a.handlePointerMove(t, e);
              }),
              p = Je(window, 'pointerup', function (t, e) {
                return a.handlePointerUp(t, e);
              });
            this.removeListeners = function () {
              d && d(), p && p();
            };
          }
        }
        return (
          (t.prototype.handlePointerMove = function (t, e) {
            (this.lastMoveEvent = t),
              (this.lastMoveEventInfo = en(e, this.transformPagePoint)),
              Ie(t) && 0 === t.buttons
                ? this.handlePointerUp(t, e)
                : i.b.update(this.updatePoint, !0);
          }),
          (t.prototype.handlePointerUp = function (t, e) {
            this.end();
            var n = this.handlers.onEnd;
            if (n) {
              var r = nn(en(e, this.transformPagePoint), this.history);
              n && n(t, r);
            }
          }),
          (t.prototype.updateHandlers = function (t) {
            this.handlers = t;
          }),
          (t.prototype.end = function () {
            this.removeListeners && this.removeListeners(),
              i.a.update(this.updatePoint),
              Fe();
          }),
          t
        );
      })();
      function en(t, e) {
        return e ? { point: e(t.point) } : t;
      }
      function nn(t, e) {
        var n = t.point;
        return {
          point: n,
          delta: Ge.subtract(n, on(e)),
          offset: Ge.subtract(n, rn(e)),
          velocity: an(e, 0.1),
        };
      }
      function rn(t) {
        return t[0];
      }
      function on(t) {
        return t[t.length - 1];
      }
      function an(t, e) {
        if (t.length < 2) return { x: 0, y: 0 };
        for (
          var n = t.length - 1, r = null, i = on(t);
          n >= 0 && ((r = t[n]), !(i.timestamp - r.timestamp > ct(e)));

        )
          n--;
        if (!r) return { x: 0, y: 0 };
        var o = (i.timestamp - r.timestamp) / 1e3;
        if (0 === o) return { x: 0, y: 0 };
        var a = { x: (i.x - r.x) / o, y: (i.y - r.y) / o };
        return a.x === 1 / 0 && (a.x = 0), a.y === 1 / 0 && (a.y = 0), a;
      }
      function sn(t, e, n) {
        var r = e.min,
          i = e.max;
        return (
          void 0 !== r && t < r
            ? (t = n ? Object(o.mix)(r, t, n) : Math.max(t, r))
            : void 0 !== i &&
              t > i &&
              (t = n ? Object(o.mix)(i, t, n) : Math.min(t, i)),
          t
        );
      }
      function un(t, e, n) {
        return {
          min: void 0 !== e ? t.min + e : void 0,
          max: void 0 !== n ? t.max + n - (t.max - t.min) : void 0,
        };
      }
      function cn(t, e) {
        var n,
          i = e.min - t.min,
          o = e.max - t.max;
        return (
          e.max - e.min < t.max - t.min &&
            ((i = (n = Object(r.c)([o, i], 2))[0]), (o = n[1])),
          { min: t.min + i, max: t.min + o }
        );
      }
      var ln,
        fn = new WeakMap(),
        dn = (function () {
          function t(t) {
            var e = t.visualElement;
            (this.isDragging = !1),
              (this.currentDirection = null),
              (this.constraints = !1),
              (this.props = {}),
              (this.hasMutatedConstraints = !1),
              (this.cursorProgress = { x: 0.5, y: 0.5 }),
              (this.originPoint = {}),
              (this.openGlobalLock = null),
              (this.panSession = null),
              (this.visualElement = e),
              this.visualElement.enableLayoutProjection(),
              fn.set(e, this);
          }
          return (
            (t.prototype.start = function (t, e) {
              var n = this,
                r = void 0 === e ? {} : e,
                i = r.snapToCursor,
                a = void 0 !== i && i,
                s = r.cursorProgress;
              a && this.snapToCursor(t);
              var u = this.props.transformPagePoint;
              this.panSession = new tn(
                t,
                {
                  onSessionStart: function () {
                    (De = !0), n.stopMotion();
                  },
                  onStart: function (t, e) {
                    var r,
                      i,
                      a = n.props,
                      u = a.drag,
                      c = a.dragPropagation;
                    if (
                      !u ||
                      c ||
                      (n.openGlobalLock && n.openGlobalLock(),
                      (n.openGlobalLock = Re(u)),
                      n.openGlobalLock)
                    ) {
                      n.prepareBoundingBox(),
                        n.visualElement.lockTargetBox(),
                        n.resolveDragConstraints();
                      var l = We(t).point;
                      ut(function (t) {
                        var e = n.visualElement.targetBox[t],
                          r = e.min,
                          i = e.max;
                        n.cursorProgress[t] = s
                          ? s[t]
                          : Object(o.progress)(r, i, l[t]);
                        var a = n.getAxisMotionValue(t);
                        a && (n.originPoint[t] = a.get());
                      }),
                        (n.isDragging = !0),
                        (n.currentDirection = null),
                        null === (i = (r = n.props).onDragStart) ||
                          void 0 === i ||
                          i.call(r, t, e);
                    }
                  },
                  onMove: function (t, e) {
                    var r,
                      i,
                      o,
                      a,
                      s = n.props,
                      u = s.dragPropagation,
                      c = s.dragDirectionLock;
                    if (u || n.openGlobalLock) {
                      var l = e.offset;
                      if (c && null === n.currentDirection)
                        return (
                          (n.currentDirection = (function (t, e) {
                            void 0 === e && (e = 10);
                            var n = null;
                            Math.abs(t.y) > e
                              ? (n = 'y')
                              : Math.abs(t.x) > e && (n = 'x');
                            return n;
                          })(l)),
                          void (
                            null !== n.currentDirection &&
                            (null === (i = (r = n.props).onDirectionLock) ||
                              void 0 === i ||
                              i.call(r, n.currentDirection))
                          )
                        );
                      n.updateAxis('x', t, l),
                        n.updateAxis('y', t, l),
                        null === (a = (o = n.props).onDrag) ||
                          void 0 === a ||
                          a.call(o, t, e),
                        (ln = t);
                    }
                  },
                  onEnd: function (t, e) {
                    return n.stop(t, e);
                  },
                },
                { transformPagePoint: u }
              );
            }),
            (t.prototype.prepareBoundingBox = function () {
              var t = this.visualElement.getInstance(),
                e = t.style.transform;
              this.visualElement.resetTransform(),
                this.visualElement.measureLayout(),
                (t.style.transform = e),
                this.visualElement.rebaseTargetBox(!0);
            }),
            (t.prototype.resolveDragConstraints = function () {
              var t = this,
                e = this.props.dragConstraints;
              (this.constraints =
                !!e &&
                (l(e)
                  ? this.resolveRefConstraints(this.visualElement.box, e)
                  : (function (t, e) {
                      var n = e.top,
                        r = e.left,
                        i = e.bottom,
                        o = e.right;
                      return { x: un(t.x, r, o), y: un(t.y, n, i) };
                    })(this.visualElement.box, e))),
                this.constraints &&
                  !this.hasMutatedConstraints &&
                  ut(function (e) {
                    t.getAxisMotionValue(e) &&
                      (t.constraints[e] = (function (t, e) {
                        var n = {};
                        return (
                          void 0 !== e.min && (n.min = e.min - t.min),
                          void 0 !== e.max && (n.max = e.max - t.min),
                          n
                        );
                      })(t.visualElement.box[e], t.constraints[e]));
                  });
            }),
            (t.prototype.resolveRefConstraints = function (t, e) {
              var n = this.props,
                r = n.onMeasureDragConstraints,
                i = n.transformPagePoint,
                o = e.current;
              Object(a.a)(
                null !== o,
                "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
              ),
                (this.constraintsBox = jt(o, i));
              var s = (function (t, e) {
                return { x: cn(t.x, e.x), y: cn(t.y, e.y) };
              })(t, this.constraintsBox);
              if (r) {
                var u = r(
                  (function (t) {
                    var e = t.x,
                      n = t.y;
                    return {
                      top: n.min,
                      bottom: n.max,
                      left: e.min,
                      right: e.max,
                    };
                  })(s)
                );
                (this.hasMutatedConstraints = !!u), u && (s = m(u));
              }
              return s;
            }),
            (t.prototype.cancelDrag = function () {
              Fe(),
                (this.isDragging = !1),
                this.panSession && this.panSession.end(),
                (this.panSession = null),
                !this.props.dragPropagation &&
                  this.openGlobalLock &&
                  (this.openGlobalLock(), (this.openGlobalLock = null));
            }),
            (t.prototype.stop = function (t, e) {
              var n;
              this.visualElement.unlockTargetBox(),
                null === (n = this.panSession) || void 0 === n || n.end(),
                (this.panSession = null);
              var r = this.isDragging;
              if ((this.cancelDrag(), r)) {
                var i = this.props,
                  o = i.dragMomentum,
                  a = i.dragElastic,
                  s = i.onDragEnd;
                if (o || a) {
                  var u = e.velocity;
                  this.animateDragEnd(u);
                }
                null === s || void 0 === s || s(t, e);
              }
            }),
            (t.prototype.snapToCursor = function (t) {
              var e = this;
              this.prepareBoundingBox(),
                ut(function (n) {
                  var r = e.getAxisMotionValue(n);
                  if (r) {
                    var i = We(t).point,
                      o = e.visualElement.box,
                      a = o[n].max - o[n].min,
                      s = o[n].min + a / 2,
                      u = i[n] - s;
                    (e.originPoint[n] = i[n]), r.set(u);
                  } else (e.cursorProgress[n] = 0.5), e.updateVisualElementAxis(n, t);
                });
            }),
            (t.prototype.updateAxis = function (t, e, n) {
              if (pn(t, this.props.drag, this.currentDirection))
                return this.getAxisMotionValue(t)
                  ? this.updateAxisMotionValue(t, n)
                  : this.updateVisualElementAxis(t, e);
            }),
            (t.prototype.updateAxisMotionValue = function (t, e) {
              var n = this.getAxisMotionValue(t);
              if (e && n) {
                var r = this.props.dragElastic,
                  i = this.originPoint[t] + e[t],
                  o = this.constraints ? sn(i, this.constraints[t], r) : i;
                n.set(o);
              }
            }),
            (t.prototype.updateVisualElementAxis = function (t, e) {
              var n,
                r = this.props.dragElastic,
                i = this.visualElement.box[t],
                o = i.max - i.min,
                a = this.cursorProgress[t],
                s = (function (t, e, n, r, i) {
                  var o = t - e * n;
                  return r ? sn(o, r, i) : o;
                })(
                  We(e).point[t],
                  o,
                  a,
                  null === (n = this.constraints) || void 0 === n
                    ? void 0
                    : n[t],
                  r
                );
              this.visualElement.setAxisTarget(t, s, s + o);
            }),
            (t.prototype.updateProps = function (t) {
              var e = t.drag,
                n = void 0 !== e && e,
                i = t.dragDirectionLock,
                o = void 0 !== i && i,
                a = t.dragPropagation,
                s = void 0 !== a && a,
                u = t.dragConstraints,
                c = void 0 !== u && u,
                l = t.dragElastic,
                f = void 0 === l ? 0.35 : l,
                d = t.dragMomentum,
                p = void 0 === d || d,
                h = Object(r.d)(t, [
                  'drag',
                  'dragDirectionLock',
                  'dragPropagation',
                  'dragConstraints',
                  'dragElastic',
                  'dragMomentum',
                ]);
              this.props = Object(r.a)(
                {
                  drag: n,
                  dragDirectionLock: o,
                  dragPropagation: s,
                  dragConstraints: c,
                  dragElastic: f,
                  dragMomentum: p,
                },
                h
              );
            }),
            (t.prototype.getAxisMotionValue = function (t) {
              var e = this.props,
                n = e.layout,
                r = e.layoutId,
                i = '_drag' + t.toUpperCase();
              return this.props[i]
                ? this.props[i]
                : n || void 0 !== r
                ? void 0
                : this.visualElement.getValue(t, 0);
            }),
            (t.prototype.animateDragEnd = function (t) {
              var e = this,
                n = this.props,
                i = n.drag,
                o = n.dragMomentum,
                a = n.dragElastic,
                s = n.dragTransition,
                u = ut(function (n) {
                  if (pn(n, i, e.currentDirection)) {
                    var u = e.constraints ? e.constraints[n] : {},
                      c = a ? 200 : 1e6,
                      l = a ? 40 : 1e7,
                      f = Object(r.a)(
                        Object(r.a)(
                          {
                            type: 'inertia',
                            velocity: o ? t[n] : 0,
                            bounceStiffness: c,
                            bounceDamping: l,
                            timeConstant: 750,
                            restDelta: 1,
                            restSpeed: 10,
                          },
                          s
                        ),
                        u
                      );
                    return e.getAxisMotionValue(n)
                      ? e.startAxisValueAnimation(n, f)
                      : e.visualElement.startLayoutAxisAnimation(n, f);
                  }
                });
              return Promise.all(u).then(function () {
                var t, n;
                null === (n = (t = e.props).onDragTransitionEnd) ||
                  void 0 === n ||
                  n.call(t);
              });
            }),
            (t.prototype.stopMotion = function () {
              var t = this;
              ut(function (e) {
                var n = t.getAxisMotionValue(e);
                n ? n.stop() : t.visualElement.stopLayoutAnimation();
              });
            }),
            (t.prototype.startAxisValueAnimation = function (t, e) {
              var n = this.getAxisMotionValue(t);
              if (n) {
                var r = n.get();
                return n.set(r), n.set(r), xt(t, n, 0, e);
              }
            }),
            (t.prototype.scalePoint = function () {
              var t = this,
                e = this.props,
                n = e.drag,
                r = e.dragConstraints;
              if (l(r) && this.constraintsBox) {
                this.stopMotion();
                var i = { x: 0, y: 0 };
                ut(function (e) {
                  i[e] = ot(t.visualElement.targetBox[e], t.constraintsBox[e]);
                }),
                  this.prepareBoundingBox(),
                  this.resolveDragConstraints(),
                  ut(function (e) {
                    if (pn(e, n, null)) {
                      var r = (function (t, e, n) {
                          var r = t.max - t.min,
                            i = Object(o.mix)(e.min, e.max - r, n);
                          return { min: i, max: i + r };
                        })(
                          t.visualElement.targetBox[e],
                          t.constraintsBox[e],
                          i[e]
                        ),
                        a = r.min,
                        s = r.max;
                      t.visualElement.setAxisTarget(e, a, s);
                    }
                  });
              }
            }),
            (t.prototype.mount = function (t) {
              var e = this,
                n = Je(t.getInstance(), 'pointerdown', function (t) {
                  var n = e.props,
                    r = n.drag,
                    i = n.dragListener;
                  r && (void 0 === i || i) && e.start(t);
                }),
                r = Ue(window, 'resize', function () {
                  e.scalePoint();
                }),
                i = t.onLayoutUpdate(function () {
                  e.isDragging && e.resolveDragConstraints();
                }),
                o = t.prevSnapshot;
              return (
                (null === o || void 0 === o ? void 0 : o.isDragging) &&
                  this.start(ln, { cursorProgress: o.cursorProgress }),
                function () {
                  null === n || void 0 === n || n(),
                    null === r || void 0 === r || r(),
                    null === i || void 0 === i || i(),
                    e.cancelDrag();
                }
              );
            }),
            t
          );
        })();
      function pn(t, e, n) {
        return (!0 === e || e === t) && (null === n || n === t);
      }
      var hn = function (t) {
          return function (e) {
            return t(e), null;
          };
        },
        vn = hn(function (t) {
          var e = t.visualElement;
          return (function (t, e) {
            var n = t.dragControls,
              i = Object(u.useContext)(we).transformPagePoint,
              o = wt(function () {
                return new dn({ visualElement: e });
              });
            o.updateProps(
              Object(r.a)(Object(r.a)({}, t), { transformPagePoint: i })
            ),
              Object(u.useEffect)(
                function () {
                  return n && n.subscribe(o);
                },
                [o]
              ),
              Object(u.useEffect)(function () {
                return o.mount(e);
              }, []);
          })(Object(r.d)(t, ['visualElement']), e);
        }),
        mn = {
          key: 'drag',
          shouldRender: function (t) {
            return !!t.drag;
          },
          getComponent: function () {
            return vn;
          },
        };
      function yn(t) {
        return Object(u.useEffect)(function () {
          return function () {
            return t();
          };
        }, []);
      }
      var gn = function (t, e) {
          return !!e && (t === e || gn(t, e.parentElement));
        },
        bn = ['whileHover', 'whileTap', 'whileDrag'],
        xn = function (t) {
          return bn.indexOf(t) + 1;
        },
        jn = xn('whileTap');
      var On = xn('whileHover'),
        En = function (t) {
          return function (e, n) {
            Ie(e) && t(e, n);
          };
        };
      function wn(t, e) {
        !(function (t, e) {
          var n = t.onPan,
            r = t.onPanStart,
            i = t.onPanEnd,
            o = t.onPanSessionStart,
            a = n || r || i || o,
            s = Object(u.useRef)(null),
            c = Object(u.useContext)(we).transformPagePoint,
            l = {
              onSessionStart: o,
              onStart: r,
              onMove: n,
              onEnd: function (t, e) {
                (s.current = null), i && i(t, e);
              },
            };
          Object(u.useEffect)(function () {
            null !== s.current && s.current.updateHandlers(l);
          }),
            Qe(
              e,
              'pointerdown',
              a &&
                function (t) {
                  s.current = new tn(t, l, { transformPagePoint: c });
                }
            ),
            yn(function () {
              return s.current && s.current.end();
            });
        })(t, e),
          (function (t, e) {
            var n = t.onTap,
              r = t.onTapStart,
              i = t.onTapCancel,
              o = t.whileTap,
              a = t.controls,
              s = n || r || i || o,
              c = Object(u.useRef)(!1),
              l = Object(u.useRef)(null);
            function f() {
              l.current && l.current(), (l.current = null);
            }
            o && a && a.setOverride(o, jn);
            var d = Object(u.useRef)(null);
            (d.current = function (t, r) {
              var s = e.current;
              if ((f(), c.current && s)) {
                (c.current = !1), a && o && a.clearOverride(jn);
                var u = Re(!0);
                u && (u(), gn(s, t.target) ? n && n(t, r) : i && i(t, r));
              }
            }),
              Qe(
                e,
                'pointerdown',
                s
                  ? function (t, n) {
                      f(),
                        (l.current = Je(window, 'pointerup', function (t, e) {
                          return d.current(t, e);
                        })),
                        e.current &&
                          !c.current &&
                          ((c.current = !0),
                          r && r(t, n),
                          a && o && a.startOverride(jn));
                    }
                  : void 0
              ),
              yn(f);
          })(t, e),
          (function (t, e) {
            var n = t.whileHover,
              r = t.onHoverStart,
              i = t.onHoverEnd,
              o = t.controls;
            n && o && o.setOverride(n, On),
              Qe(
                e,
                'pointerenter',
                En(function (t, e) {
                  r && r(t, e), n && o && o.startOverride(On);
                })
              ),
              Qe(
                e,
                'pointerleave',
                En(function (t, e) {
                  i && i(t, e), n && o && o.clearOverride(On);
                })
              );
          })(t, e);
      }
      var Cn,
        Pn = [
          'onPan',
          'onPanStart',
          'onPanEnd',
          'onPanSessionStart',
          'onTap',
          'onTapStart',
          'onTapCancel',
          'whileTap',
          'whileHover',
          'onHoverStart',
          'onHoverEnd',
        ],
        Sn = hn(function (t) {
          var e = t.visualElement;
          wn(Object(r.d)(t, ['visualElement']), e);
        }),
        An = {
          key: 'gestures',
          shouldRender: function (t) {
            return Pn.some(function (e) {
              return t.hasOwnProperty(e);
            });
          },
          getComponent: function () {
            return Sn;
          },
        },
        Vn = hn(function (t) {
          var e = t.animate,
            n = t.controls,
            i = t.exit,
            o = Object(r.c)(Ut(), 2),
            a = o[0],
            s = o[1],
            c = Object(u.useContext)(Ft),
            l = Object(u.useRef)(!1),
            f =
              void 0 !== (null === c || void 0 === c ? void 0 : c.custom)
                ? c.custom
                : t.custom;
          Object(u.useEffect)(
            function () {
              a
                ? !l.current ||
                  !e ||
                  'boolean' === typeof e ||
                  e instanceof se ||
                  n.start(e)
                : (!l.current && i && n.start(i, { custom: f }).then(s),
                  (l.current = !0)),
                a && (l.current = !1);
            },
            [e, n, f, i, a, s, t]
          );
        }),
        Tn = {
          key: 'exit',
          shouldRender: function (t) {
            return !!t.exit && !de(t);
          },
          getComponent: function () {
            return Vn;
          },
        };
      !(function (t) {
        (t.Target = 'Target'),
          (t.VariantLabel = 'VariantLabel'),
          (t.AnimationSubscription = 'AnimationSubscription');
      })(Cn || (Cn = {}));
      function Ln(t, e) {
        void 0 === e && (e = !1);
        t.transition;
        var n = t.transitionEnd,
          i = Object(r.d)(t, ['transition', 'transitionEnd']);
        return e ? Object(r.a)(Object(r.a)({}, i), n) : i;
      }
      var Bn,
        kn,
        Mn = function (t) {
          var e,
            n = t instanceof d ? t.get() : t;
          return Array.from(
            new Set((e = n) ? (Array.isArray(e) ? e : [e]) : [])
          );
        };
      var Rn =
          (((Bn = {})[Cn.Target] = hn(function (t) {
            return (function (t, e, n, i) {
              var o = Object(u.useRef)(!0),
                a = Object(u.useRef)(null);
              a.current || (a.current = Ln(t, !0)),
                Object(u.useEffect)(
                  function () {
                    var s,
                      u,
                      c = {},
                      l = Ln(t),
                      f = Ln(t, !0);
                    for (var d in l) {
                      var p =
                          o.current &&
                          (!n.hasValue(d) || n.getValue(d).get() !== f[d]),
                        h = null !== f[d],
                        v =
                          ((s = a.current[d]),
                          void 0 !== (u = f[d]) &&
                            (Array.isArray(s) && Array.isArray(u)
                              ? !(function (t, e) {
                                  if (null === e) return !1;
                                  var n = e.length;
                                  if (n !== t.length) return !1;
                                  for (var r = 0; r < n; r++)
                                    if (e[r] !== t[r]) return !1;
                                  return !0;
                                })(u, s)
                              : s !== u));
                      h && (v || p) && (c[d] = l[d]);
                    }
                    (o.current = !1),
                      (a.current = Object(r.a)(Object(r.a)({}, a.current), f)),
                      Object.keys(c).length &&
                        e.start(
                          Object(r.a)(Object(r.a)({}, c), {
                            transition: t.transition || i,
                            transitionEnd: t.transitionEnd,
                          })
                        );
                  },
                  [t]
                );
            })(t.animate, t.controls, t.visualElement, t.transition);
          })),
          (Bn[Cn.VariantLabel] = hn(function (t) {
            var e = t.animate,
              n = t.inherit,
              r = void 0 === n || n,
              i = t.controls;
            return (function (t, e, n, r) {
              var i = Mn(e),
                o = Object(u.useContext)(ue),
                a = o.hasMounted && o.hasMounted.current,
                s = Object(u.useRef)(!1);
              Object(u.useEffect)(
                function () {
                  var e,
                    u,
                    c = !1;
                  n
                    ? ((c = !!a), (i = Mn(o.animate)))
                    : (c =
                        s.current ||
                        ((e = Mn(t)), (u = i), e.join(',') !== u.join(','))),
                    c && r.start(i),
                    (s.current = !0);
                },
                [i.join(',')]
              );
            })(t.initial, e, r, i);
          })),
          (Bn[Cn.AnimationSubscription] = hn(function (t) {
            return (function (t, e) {
              var n = Object(u.useMemo)(
                function () {
                  return t.subscribe(e);
                },
                [t]
              );
              Object(u.useEffect)(
                function () {
                  return function () {
                    n && n();
                  };
                },
                [n]
              );
            })(t.animate, t.controls);
          })),
          Bn),
        Dn = function (t) {
          return t.animate instanceof se;
        },
        Fn = ['initial', 'animate', 'whileTap', 'whileHover'],
        Un =
          (((kn = {})[Cn.Target] = function (t) {
            return (
              void 0 !== t.animate &&
              ((e = t.animate), !(Array.isArray(e) || 'string' === typeof e)) &&
              !Dn(t)
            );
            var e;
          }),
          (kn[Cn.VariantLabel] = function (t) {
            return (
              void 0 !== t.variants ||
              Fn.some(function (e) {
                return 'string' === typeof t[e];
              })
            );
          }),
          (kn[Cn.AnimationSubscription] = Dn),
          kn),
        In = {
          key: 'animation',
          shouldRender: function () {
            return !0;
          },
          getComponent: function (t) {
            var e = void 0;
            for (var n in Cn) Un[n](t) && (e = n);
            return e ? Rn[e] : void 0;
          },
        };
      var Hn = (function (t) {
        function e() {
          var e = (null !== t && t.apply(this, arguments)) || this;
          return (
            (e.frameTarget = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
            (e.stopAxisAnimation = { x: void 0, y: void 0 }),
            (e.animate = function (t, n, i) {
              void 0 === i && (i = {});
              var o = i.originBox,
                a = i.targetBox,
                s = i.visibilityAction,
                u = i.shouldStackAnimate,
                c = Object(r.d)(i, [
                  'originBox',
                  'targetBox',
                  'visibilityAction',
                  'shouldStackAnimate',
                ]),
                l = e.props,
                f = l.visualElement,
                d = l.layout;
              if (!1 === u) return e.safeToRemove();
              var p = Xn((n = o || n), (t = a || t)),
                h = ut(function (r) {
                  if ('position' === d) {
                    var i = t[r].max - t[r].min;
                    n[r].max = n[r].min + i;
                  }
                  if (!f.isTargetBoxLocked)
                    return void 0 === s
                      ? p
                        ? e.animateAxis(r, t[r], n[r], c)
                        : f.setAxisTarget(r, t[r].min, t[r].max)
                      : void (s === Ee.Hide ? f.hide() : f.show());
                });
              return (
                f.render(),
                Promise.all(h).then(function () {
                  var t, n;
                  null === (n = (t = e.props).onLayoutAnimationComplete) ||
                    void 0 === n ||
                    n.call(t),
                    f.isPresent ? (f.presence = Oe.Present) : e.safeToRemove();
                })
              );
            }),
            e
          );
        }
        return (
          Object(r.b)(e, t),
          (e.prototype.componentDidMount = function () {
            var t = this.props.visualElement;
            t.enableLayoutProjection(),
              (this.unsubLayoutReady = t.onLayoutUpdate(this.animate));
          }),
          (e.prototype.componentWillUnmount = function () {
            var t = this;
            this.unsubLayoutReady(),
              ut(function (e) {
                var n, r;
                return null === (r = (n = t.stopAxisAnimation)[e]) ||
                  void 0 === r
                  ? void 0
                  : r.call(n);
              });
          }),
          (e.prototype.animateAxis = function (t, e, n, r) {
            var i,
              a,
              s = void 0 === r ? {} : r,
              u = s.transition,
              c = s.crossfadeOpacity;
            null === (a = (i = this.stopAxisAnimation)[t]) ||
              void 0 === a ||
              a.call(i);
            var l,
              f = this.props.visualElement,
              d = this.frameTarget[t],
              p = f.axisProgress[t];
            p.clearListeners(),
              p.set(0),
              p.set(0),
              c && ((l = this.createCrossfadeAnimation(c)), f.show());
            var h = function () {
              var r = p.get() / 1e3;
              !(function (t, e, n, r) {
                (t.min = Object(o.mix)(e.min, n.min, r)),
                  (t.max = Object(o.mix)(e.max, n.max, r));
              })(d, n, e, r),
                f.setAxisTarget(t, d.min, d.max),
                null === l || void 0 === l || l(r);
            };
            h(), f.updateLayoutDelta();
            var v = p.onChange(h),
              m = xt(
                'x' === t ? 'layoutX' : 'layoutY',
                p,
                1e3,
                u || this.props.transition || Nn
              ).then(v);
            return (
              (this.stopAxisAnimation[t] = function () {
                p.stop(), v();
              }),
              m
            );
          }),
          (e.prototype.createCrossfadeAnimation = function (t) {
            var e = this.props.visualElement.getValue('opacity', 0);
            return function (n) {
              e.set(Gn(Object(o.mix)(0, 1, n))),
                t.set(Zn(Object(o.mix)(1, 0, n)));
            };
          }),
          (e.prototype.safeToRemove = function () {
            var t, e;
            null === (e = (t = this.props).safeToRemove) ||
              void 0 === e ||
              e.call(t);
          }),
          (e.prototype.render = function () {
            return null;
          }),
          e
        );
      })(u.Component);
      function Yn(t) {
        var e = Object(r.c)(Ut(), 2)[1];
        return Object(u.createElement)(
          Hn,
          Object(r.a)({}, t, { safeToRemove: e })
        );
      }
      function Xn(t, e) {
        return zn(t.x, e.x) || zn(t.y, e.y);
      }
      function zn(t, e) {
        return t.min !== e.min || t.max !== e.max;
      }
      var Nn = { duration: 0.45, ease: [0.4, 0, 0.1, 1] };
      function Wn(t, e, n) {
        return function (r) {
          return r < t ? 0 : r > e ? 1 : n(Object(o.progress)(t, e, r));
        };
      }
      var Gn = Wn(0, 0.5, o.circOut),
        Zn = Wn(0.5, 0.95, o.linear),
        _n = {
          key: 'animate-layout',
          shouldRender: function (t) {
            return !!t.layout || !!t.layoutId;
          },
          getComponent: function () {
            return Yn;
          },
        },
        $n = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            Object(r.b)(e, t),
            (e.prototype.componentDidMount = function () {
              var t = this.props,
                e = t.syncLayout,
                n = t.visualElement;
              Ae(e) && e.register(n);
            }),
            (e.prototype.getSnapshotBeforeUpdate = function () {
              var t = this.props,
                e = t.syncLayout,
                n = t.visualElement;
              return (
                Ae(e) ? e.syncUpdate() : (n.snapshotBoundingBox(), e.add(n)),
                null
              );
            }),
            (e.prototype.componentDidUpdate = function () {
              var t = this.props,
                e = t.syncLayout,
                n = t.visualElement;
              Ae(e) || e.flush(), n.rebaseTargetBox();
            }),
            (e.prototype.render = function () {
              return null;
            }),
            e
          );
        })(c.a.Component);
      function Kn(t) {
        var e = Object(u.useContext)(Ve);
        return c.a.createElement($n, Object(r.a)({}, t, { syncLayout: e }));
      }
      var qn = {
        key: 'measure-layout',
        shouldRender: function (t) {
          return !!t.drag || !!t.layout || !!t.layoutId;
        },
        getComponent: function () {
          return Kn;
        },
      };
      function Jn(t) {
        var e = {
          defaultFeatures: t,
          useVisualElement: Xt,
          render: Zt,
          animationControlsConfig: { makeTargetAnimatable: ae },
        };
        var n = new Map();
        return new Proxy(
          {
            custom: function (t) {
              return Le(t, e);
            },
          },
          {
            get: function (t, r) {
              return 'custom' === r
                ? t.custom
                : (n.has(r) || n.set(r, Le(r, e)), n.get(r));
            },
          }
        );
      }
      var Qn = Jn([qn, In, mn, An, Tn, _n]);
      var tr = 0;
      function er() {
        var t = tr;
        return tr++, t;
      }
      var nr = function (t) {
        var e = t.children,
          n = t.initial,
          r = t.isPresent,
          i = t.onExitComplete,
          o = t.custom,
          a = t.presenceAffectsLayout,
          s = wt(rr),
          c = wt(er),
          l = Object(u.useMemo)(
            function () {
              return {
                id: c,
                initial: n,
                isPresent: r,
                custom: o,
                onExitComplete: function (t) {
                  s.set(t, !0);
                  var e = !0;
                  s.forEach(function (t) {
                    t || (e = !1);
                  }),
                    e && (null === i || void 0 === i || i());
                },
                register: function (t) {
                  return (
                    s.set(t, !1),
                    function () {
                      return s.delete(t);
                    }
                  );
                },
              };
            },
            a ? void 0 : [r]
          );
        return (
          Object(u.useMemo)(
            function () {
              s.forEach(function (t, e) {
                return s.set(e, !1);
              });
            },
            [r]
          ),
          Object(u.createElement)(Ft.Provider, { value: l }, e)
        );
      };
      function rr() {
        return new Map();
      }
      function ir(t) {
        return t.key || '';
      }
      var or = function (t) {
        var e = t.children,
          n = t.custom,
          i = t.initial,
          o = void 0 === i || i,
          a = t.onExitComplete,
          s = t.exitBeforeEnter,
          c = t.presenceAffectsLayout,
          l = void 0 === c || c,
          f = (function () {
            var t = Object(r.c)(Object(u.useState)(0), 2),
              e = t[0],
              n = t[1];
            return Object(u.useCallback)(
              function () {
                return n(e + 1);
              },
              [e]
            );
          })(),
          d = Object(u.useContext)(Ve);
        Ae(d) && (f = d.forceUpdate);
        var p = Object(u.useRef)(!0),
          h = (function (t) {
            var e = [];
            return (
              u.Children.forEach(t, function (t) {
                Object(u.isValidElement)(t) && e.push(t);
              }),
              e
            );
          })(e),
          v = Object(u.useRef)(h),
          m = Object(u.useRef)(new Map()).current,
          y = Object(u.useRef)(new Set()).current;
        if (
          ((function (t, e) {
            t.forEach(function (t) {
              var n = ir(t);
              e.set(n, t);
            });
          })(h, m),
          p.current)
        )
          return (
            (p.current = !1),
            Object(u.createElement)(
              u.Fragment,
              null,
              h.map(function (t) {
                return Object(u.createElement)(
                  nr,
                  {
                    key: ir(t),
                    isPresent: !0,
                    initial: !!o && void 0,
                    presenceAffectsLayout: l,
                  },
                  t
                );
              })
            )
          );
        for (
          var g = Object(r.e)(h),
            b = v.current.map(ir),
            x = h.map(ir),
            j = b.length,
            O = 0;
          O < j;
          O++
        ) {
          var E = b[O];
          -1 === x.indexOf(E) ? y.add(E) : y.delete(E);
        }
        return (
          s && y.size && (g = []),
          y.forEach(function (t) {
            if (-1 === x.indexOf(t)) {
              var e = m.get(t);
              if (e) {
                var r = b.indexOf(t);
                g.splice(
                  r,
                  0,
                  Object(u.createElement)(
                    nr,
                    {
                      key: ir(e),
                      isPresent: !1,
                      onExitComplete: function () {
                        m.delete(t), y.delete(t);
                        var e = v.current.findIndex(function (e) {
                          return e.key === t;
                        });
                        v.current.splice(e, 1),
                          y.size || ((v.current = h), f(), a && a());
                      },
                      custom: n,
                      presenceAffectsLayout: l,
                    },
                    e
                  )
                );
              }
            }
          }),
          (g = g.map(function (t) {
            var e = t.key;
            return y.has(e)
              ? t
              : Object(u.createElement)(
                  nr,
                  { key: ir(t), isPresent: !0, presenceAffectsLayout: l },
                  t
                );
          })),
          (v.current = g),
          Object(u.createElement)(
            u.Fragment,
            null,
            y.size
              ? g
              : g.map(function (t) {
                  return Object(u.cloneElement)(t);
                })
          )
        );
      };
      function ar(t, e) {
        return e && t !== e.lead
          ? { visibilityAction: Ee.Hide }
          : e &&
            t.presence !== Oe.Entering &&
            t === e.lead &&
            e.lead !== e.prevLead
          ? { visibilityAction: Ee.Show }
          : (t.presence === Oe.Entering
              ? (n = null === e || void 0 === e ? void 0 : e.getFollowOrigin())
              : t.presence === Oe.Exiting &&
                (r = null === e || void 0 === e ? void 0 : e.getFollowTarget()),
            { originBox: n, targetBox: r });
        var n, r;
      }
      function sr(t, e) {
        var n,
          r,
          i,
          o = {},
          a = e && e.lead,
          s = null === a || void 0 === a ? void 0 : a.presence;
        return (
          e && t === a
            ? t.presence === Oe.Entering
              ? (o.originBox = e.getFollowOrigin())
              : t.presence === Oe.Exiting && (o.targetBox = e.getFollowTarget())
            : e &&
              t === e.follow &&
              ((o.transition = e.getLeadTransition()),
              s === Oe.Entering
                ? (o.targetBox = e.getLeadTarget())
                : s === Oe.Exiting && (o.originBox = e.getLeadOrigin())),
          (null === (n = null === e || void 0 === e ? void 0 : e.follow) ||
          void 0 === n
            ? void 0
            : n.isPresenceRoot) ||
          (null === a || void 0 === a ? void 0 : a.isPresenceRoot)
            ? (e && t !== a
                ? e && t === e.follow
                  ? a &&
                    s !== Oe.Entering &&
                    s === Oe.Exiting &&
                    (o.crossfadeOpacity =
                      null ===
                        (i = null === e || void 0 === e ? void 0 : e.lead) ||
                      void 0 === i
                        ? void 0
                        : i.getValue('opacity', 1))
                  : (o.visibilityAction = Ee.Hide)
                : t.presence === Oe.Entering &&
                  (o.crossfadeOpacity =
                    null ===
                      (r = null === e || void 0 === e ? void 0 : e.follow) ||
                    void 0 === r
                      ? void 0
                      : r.getValue('opacity', 0)),
              o)
            : o
        );
      }
      var ur = (function () {
        function t() {
          (this.order = []), (this.hasChildren = !1);
        }
        return (
          (t.prototype.add = function (t) {
            var e;
            if ((this.order.push(t), this.snapshot)) {
              (t.prevSnapshot = this.snapshot),
                (t.prevViewportBox = this.snapshot.boundingBox);
              var n = this.snapshot.latestMotionValues;
              for (var r in n)
                t.hasValue(r)
                  ? null === (e = t.getValue(r)) || void 0 === e || e.set(n[r])
                  : t.addValue(r, p(n[r]));
            }
            this.hasChildren = !0;
          }),
          (t.prototype.remove = function (t) {
            var e = this.order.findIndex(function (e) {
              return t === e;
            });
            -1 !== e && this.order.splice(e, 1);
          }),
          (t.prototype.updateLeadAndFollow = function () {
            (this.prevLead = this.lead), (this.prevFollow = this.follow);
            var t = Object(r.c)(
                (function (t, e) {
                  for (
                    var n = Object(r.c)(e, 2),
                      i = n[0],
                      o = n[1],
                      a = void 0,
                      s = 0,
                      u = void 0,
                      c = t.length,
                      l = !1,
                      f = c - 1;
                    f >= 0;
                    f--
                  ) {
                    var d = t[f];
                    if ((f === c - 1 && (l = d.isPresent), l)) a = d;
                    else {
                      var p = t[f - 1];
                      p && p.isPresent && (a = d);
                    }
                    if (a) {
                      s = f;
                      break;
                    }
                  }
                  if ((a || (a = t[0]), (u = t[s - 1]), a))
                    for (f = s - 1; f >= 0; f--)
                      if ((d = t[f]).isPresent) {
                        u = d;
                        break;
                      }
                  return (
                    a !== i &&
                      !l &&
                      u === o &&
                      t.find(function (t) {
                        return t === i;
                      }) &&
                      (a = i),
                    [a, u]
                  );
                })(this.order, [this.lead, this.follow]),
                2
              ),
              e = t[0],
              n = t[1];
            (this.lead = e), (this.follow = n);
          }),
          (t.prototype.updateSnapshot = function () {
            if (this.lead) {
              var t = {
                boundingBox: this.lead.prevViewportBox,
                latestMotionValues: {},
              };
              this.lead.forEachValue(function (e, n) {
                var r = e.get();
                M(r) || (t.latestMotionValues[n] = r);
              });
              var e = fn.get(this.lead);
              e &&
                e.isDragging &&
                ((t.isDragging = !0), (t.cursorProgress = e.cursorProgress)),
                (this.snapshot = t);
            }
          }),
          (t.prototype.isLeadPresent = function () {
            var t;
            return (
              this.lead &&
              (null === (t = this.lead) || void 0 === t
                ? void 0
                : t.presence) !== Oe.Exiting
            );
          }),
          (t.prototype.getFollowOrigin = function () {
            var t;
            return this.follow
              ? this.follow.prevViewportBox
              : null === (t = this.snapshot) || void 0 === t
              ? void 0
              : t.boundingBox;
          }),
          (t.prototype.getFollowTarget = function () {
            var t;
            return null === (t = this.follow) || void 0 === t ? void 0 : t.box;
          }),
          (t.prototype.getLeadOrigin = function () {
            var t;
            return null === (t = this.lead) || void 0 === t
              ? void 0
              : t.prevViewportBox;
          }),
          (t.prototype.getLeadTarget = function () {
            var t;
            return null === (t = this.lead) || void 0 === t ? void 0 : t.box;
          }),
          (t.prototype.getLeadTransition = function () {
            var t;
            return null === (t = this.lead) || void 0 === t
              ? void 0
              : t.config.transition;
          }),
          t
        );
      })();
      !(function (t) {
        function e() {
          var e = (null !== t && t.apply(this, arguments)) || this;
          return (
            (e.children = new Set()),
            (e.stacks = new Map()),
            (e.hasMounted = !1),
            (e.updateScheduled = !1),
            (e.renderScheduled = !1),
            (e.syncContext = Object(r.a)(Object(r.a)({}, Se()), {
              syncUpdate: function (t) {
                return e.scheduleUpdate(t);
              },
              forceUpdate: function () {
                (e.syncContext = Object(r.a)({}, e.syncContext)),
                  e.scheduleUpdate(!0);
              },
              register: function (t) {
                return e.addChild(t);
              },
              remove: function (t) {
                return e.removeChild(t);
              },
            })),
            e
          );
        }
        Object(r.b)(e, t),
          (e.prototype.componentDidMount = function () {
            (this.hasMounted = !0), this.updateStacks();
          }),
          (e.prototype.componentDidUpdate = function () {
            this.startLayoutAnimation();
          }),
          (e.prototype.shouldComponentUpdate = function () {
            return (this.renderScheduled = !0), !0;
          }),
          (e.prototype.startLayoutAnimation = function () {
            var t = this;
            this.renderScheduled = this.updateScheduled = !1;
            var e = this.props.type;
            this.children.forEach(function (t) {
              t.isPresent
                ? t.presence !== Oe.Entering &&
                  (t.presence =
                    t.presence === Oe.Exiting ? Oe.Entering : Oe.Present)
                : (t.presence = Oe.Exiting);
            }),
              this.updateStacks();
            var n = 'crossfade' === e ? sr : ar,
              r = {
                measureLayout: function (t) {
                  return t.measureLayout();
                },
                layoutReady: function (e) {
                  var r = e.layoutId;
                  e.layoutReady(n(e, t.getStack(r)));
                },
              };
            this.children.forEach(function (e) {
              return t.syncContext.add(e);
            }),
              this.syncContext.flush(r),
              this.stacks.forEach(function (t) {
                return (t.snapshot = void 0);
              });
          }),
          (e.prototype.updateStacks = function () {
            this.stacks.forEach(function (t) {
              return t.updateLeadAndFollow();
            });
          }),
          (e.prototype.scheduleUpdate = function (t) {
            void 0 === t && (t = !1),
              (!t && this.updateScheduled) ||
                ((this.updateScheduled = !0),
                this.children.forEach(function (t) {
                  return t.snapshotBoundingBox();
                }),
                this.stacks.forEach(function (t) {
                  return t.updateSnapshot();
                }),
                (!t && this.renderScheduled) ||
                  ((this.renderScheduled = !0), this.forceUpdate()));
          }),
          (e.prototype.addChild = function (t) {
            this.children.add(t),
              this.addToStack(t),
              (t.presence = this.hasMounted ? Oe.Entering : Oe.Present);
          }),
          (e.prototype.removeChild = function (t) {
            this.scheduleUpdate(),
              this.children.delete(t),
              this.removeFromStack(t);
          }),
          (e.prototype.addToStack = function (t) {
            var e = this.getStack(t.layoutId);
            null === e || void 0 === e || e.add(t);
          }),
          (e.prototype.removeFromStack = function (t) {
            var e = this.getStack(t.layoutId);
            null === e || void 0 === e || e.remove(t);
          }),
          (e.prototype.getStack = function (t) {
            if (void 0 !== t)
              return (
                !this.stacks.has(t) && this.stacks.set(t, new ur()),
                this.stacks.get(t)
              );
          }),
          (e.prototype.render = function () {
            return Object(u.createElement)(
              Ve.Provider,
              { value: this.syncContext },
              this.props.children
            );
          });
      })(u.Component);
      function cr() {
        return {
          scrollX: p(0),
          scrollY: p(0),
          scrollXProgress: p(0),
          scrollYProgress: p(0),
        };
      }
      cr();
      var lr = p(null);
      if ('undefined' !== typeof window)
        if (window.matchMedia) {
          var fr = window.matchMedia('(prefers-reduced-motion)'),
            dr = function () {
              return lr.set(fr.matches);
            };
          fr.addListener(dr), dr();
        } else lr.set(!1);
      !(function () {
        function t() {
          this.componentControls = new Set();
        }
        (t.prototype.subscribe = function (t) {
          var e = this;
          return (
            this.componentControls.add(t),
            function () {
              return e.componentControls.delete(t);
            }
          );
        }),
          (t.prototype.start = function (t, e) {
            this.componentControls.forEach(function (n) {
              n.start(t.nativeEvent || t, e);
            });
          });
      })();
      !(function (t) {
        function e() {
          var e = (null !== t && t.apply(this, arguments)) || this;
          return (e.initialState = {}), e;
        }
        Object(r.b)(e, t),
          (e.prototype.updateLayoutDelta = function () {}),
          (e.prototype.build = function () {}),
          (e.prototype.clean = function () {}),
          (e.prototype.getBoundingBox = function () {
            return { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
          }),
          (e.prototype.readNativeValue = function (t) {
            return this.initialState[t] || 0;
          }),
          (e.prototype.render = function () {
            this.build();
          });
      })(h);
    },
  },
]);
