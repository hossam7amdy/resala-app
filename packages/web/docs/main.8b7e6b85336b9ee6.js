'use strict';
(self.webpackChunkfreshcart = self.webpackChunkfreshcart || []).push([
  [179],
  {
    6842: (We, fe, M) => {
      var m = M(6593),
        U = M(1120),
        B = M(4769);
      const ie = [
        {
          path: '',
          loadComponent: () =>
            Promise.all([M.e(756), M.e(592), M.e(329)])
              .then(M.bind(M, 9329))
              .then(w => w.BlankLayoutComponent),
          children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
              path: 'home',
              loadComponent: () =>
                Promise.all([M.e(756), M.e(592), M.e(454)])
                  .then(M.bind(M, 4454))
                  .then(w => w.HomeComponent),
              title: 'Home',
            },
            {
              path: 'brands',
              loadComponent: () =>
                M.e(299)
                  .then(M.bind(M, 5299))
                  .then(w => w.BrandsComponent),
              title: 'Brands',
            },
            {
              path: 'categories',
              loadComponent: () =>
                M.e(937)
                  .then(M.bind(M, 937))
                  .then(w => w.CategoriesComponent),
              title: 'Categories',
            },
            {
              path: 'products',
              loadComponent: () =>
                M.e(510)
                  .then(M.bind(M, 9510))
                  .then(w => w.ProductsComponent),
              title: 'Products',
            },
            {
              path: 'cart',
              loadComponent: () =>
                M.e(290)
                  .then(M.bind(M, 5290))
                  .then(w => w.CartComponent),
              title: 'Cart',
            },
            {
              path: 'favorites',
              loadComponent: () =>
                M.e(517)
                  .then(M.bind(M, 1517))
                  .then(w => w.FavoritesComponent),
              title: 'Favorites',
            },
            {
              path: 'product-details/:product-id',
              loadComponent: () =>
                Promise.all([M.e(95), M.e(756), M.e(592), M.e(165)])
                  .then(M.bind(M, 5165))
                  .then(w => w.ProductDetailsComponent),
              title: 'Product',
            },
          ],
        },
        {
          path: '',
          loadComponent: () =>
            Promise.all([M.e(592), M.e(448)])
              .then(M.bind(M, 7448))
              .then(w => w.AuthLayoutComponent),
          children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            {
              path: 'login',
              loadComponent: () =>
                Promise.all([M.e(95), M.e(592), M.e(932)])
                  .then(M.bind(M, 6666))
                  .then(w => w.LoginComponent),
              title: 'Login',
            },
            {
              path: 'register',
              loadComponent: () =>
                Promise.all([M.e(95), M.e(592), M.e(560)])
                  .then(M.bind(M, 6560))
                  .then(w => w.RegisterComponent),
              title: 'Register',
            },
          ],
        },
        {
          path: '',
          loadComponent: () =>
            Promise.all([M.e(756), M.e(592), M.e(329)])
              .then(M.bind(M, 9329))
              .then(w => w.BlankLayoutComponent),
          children: [
            {
              path: '**',
              loadComponent: () =>
                M.e(337)
                  .then(M.bind(M, 1337))
                  .then(w => w.NotfoundComponent),
              title: 'Not Found',
            },
          ],
        },
      ];
      let Q = (() => {
        class w {
          static #e = (this.ɵfac = function (v) {
            return new (v || w)();
          });
          static #t = (this.ɵmod = B.oAB({ type: w }));
          static #n = (this.ɵinj = B.cJS({ imports: [U.Bz.forRoot(ie), U.Bz] }));
        }
        return w;
      })();
      var q = M(8672);
      let pe = (() => {
        class w {
          constructor() {
            this.title = 'Resala';
          }
          static #e = (this.ɵfac = function (v) {
            return new (v || w)();
          });
          static #t = (this.ɵcmp = B.Xpm({
            type: w,
            selectors: [['app-root']],
            decls: 2,
            vars: 0,
            consts: [['type', 'ball-scale-multiple']],
            template: function (v, b) {
              1 & v && B._UZ(0, 'router-outlet')(1, 'ngx-spinner', 0);
            },
            dependencies: [U.lC, q.Ro],
          }));
        }
        return w;
      })();
      var Te = M(9862),
        se = M(6825);
      function te(w) {
        return new B.vHH(3e3, !1);
      }
      function vt(w) {
        switch (w.length) {
          case 0:
            return new se.ZN();
          case 1:
            return w[0];
          default:
            return new se.ZE(w);
        }
      }
      function Ft(w, a, f = new Map(), v = new Map()) {
        const b = [],
          T = [];
        let O = -1,
          k = null;
        if (
          (a.forEach(G => {
            const ee = G.get('offset'),
              Ae = ee == O,
              Pe = (Ae && k) || new Map();
            G.forEach((bt, ht) => {
              let Je = ht,
                ot = bt;
              if ('offset' !== ht)
                switch (((Je = w.normalizePropertyName(Je, b)), ot)) {
                  case se.k1:
                    ot = f.get(ht);
                    break;
                  case se.l3:
                    ot = v.get(ht);
                    break;
                  default:
                    ot = w.normalizeStyleValue(ht, Je, ot, b);
                }
              Pe.set(Je, ot);
            }),
              Ae || T.push(Pe),
              (k = Pe),
              (O = ee);
          }),
          b.length)
        )
          throw (function An(w) {
            return new B.vHH(3502, !1);
          })();
        return T;
      }
      function Ue(w, a, f, v) {
        switch (a) {
          case 'start':
            w.onStart(() => v(f && $t(f, 'start', w)));
            break;
          case 'done':
            w.onDone(() => v(f && $t(f, 'done', w)));
            break;
          case 'destroy':
            w.onDestroy(() => v(f && $t(f, 'destroy', w)));
        }
      }
      function $t(w, a, f) {
        const T = Qe(
            w.element,
            w.triggerName,
            w.fromState,
            w.toState,
            a || w.phaseName,
            f.totalTime ?? w.totalTime,
            !!f.disabled
          ),
          O = w._data;
        return null != O && (T._data = O), T;
      }
      function Qe(w, a, f, v, b = '', T = 0, O) {
        return {
          element: w,
          triggerName: a,
          fromState: f,
          toState: v,
          phaseName: b,
          totalTime: T,
          disabled: !!O,
        };
      }
      function Kt(w, a, f) {
        let v = w.get(a);
        return v || w.set(a, (v = f)), v;
      }
      function Jt(w) {
        const a = w.indexOf(':');
        return [w.substring(1, a), w.slice(a + 1)];
      }
      const Ar = (() => (typeof document > 'u' ? null : document.documentElement))();
      function dr(w) {
        const a = w.parentNode || w.host || null;
        return a === Ar ? null : a;
      }
      let Vt = null,
        Rn = !1;
      function nr(w, a) {
        for (; a; ) {
          if (a === w) return !0;
          a = dr(a);
        }
        return !1;
      }
      function Nn(w, a, f) {
        if (f) return Array.from(w.querySelectorAll(a));
        const v = w.querySelector(a);
        return v ? [v] : [];
      }
      let Ze = (() => {
          class w {
            validateStyleProperty(f) {
              return (function Dt(w) {
                Vt ||
                  ((Vt =
                    (function Rr() {
                      return typeof document < 'u' ? document.body : null;
                    })() || {}),
                  (Rn = !!Vt.style && 'WebkitAppearance' in Vt.style));
                let a = !0;
                return (
                  Vt.style &&
                    !(function Yn(w) {
                      return 'ebkit' == w.substring(1, 6);
                    })(w) &&
                    ((a = w in Vt.style),
                    !a &&
                      Rn &&
                      (a = 'Webkit' + w.charAt(0).toUpperCase() + w.slice(1) in Vt.style)),
                  a
                );
              })(f);
            }
            matchesElement(f, v) {
              return !1;
            }
            containsElement(f, v) {
              return nr(f, v);
            }
            getParentElement(f) {
              return dr(f);
            }
            query(f, v, b) {
              return Nn(f, v, b);
            }
            computeStyle(f, v, b) {
              return b || '';
            }
            animate(f, v, b, T, O, k = [], G) {
              return new se.ZN(b, T);
            }
            static #e = (this.ɵfac = function (v) {
              return new (v || w)();
            });
            static #t = (this.ɵprov = B.Yz7({ token: w, factory: w.ɵfac }));
          }
          return w;
        })(),
        Pr = (() => {
          class w {
            static #e = (this.NOOP = new Ze());
          }
          return w;
        })();
      const zt = 1e3,
        rr = 'ng-enter',
        qe = 'ng-leave',
        qn = 'ng-trigger',
        mr = '.ng-trigger',
        et = 'ng-animating',
        En = '.ng-animating';
      function ln(w) {
        if ('number' == typeof w) return w;
        const a = w.match(/^(-?[\.\d]+)(m?s)/);
        return !a || a.length < 2 ? 0 : ir(parseFloat(a[1]), a[2]);
      }
      function ir(w, a) {
        return 's' === a ? w * zt : w;
      }
      function Qn(w, a, f) {
        return w.hasOwnProperty('duration')
          ? w
          : (function $r(w, a, f) {
              let b,
                T = 0,
                O = '';
              if ('string' == typeof w) {
                const k = w.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === k) return a.push(te()), { duration: 0, delay: 0, easing: '' };
                b = ir(parseFloat(k[1]), k[2]);
                const G = k[3];
                null != G && (T = ir(parseFloat(G), k[4]));
                const ee = k[5];
                ee && (O = ee);
              } else b = w;
              if (!f) {
                let k = !1,
                  G = a.length;
                b < 0 &&
                  (a.push(
                    (function Ce() {
                      return new B.vHH(3100, !1);
                    })()
                  ),
                  (k = !0)),
                  T < 0 &&
                    (a.push(
                      (function He() {
                        return new B.vHH(3101, !1);
                      })()
                    ),
                    (k = !0)),
                  k && a.splice(G, 0, te());
              }
              return { duration: b, delay: T, easing: O };
            })(w, a, f);
      }
      function Ln(w, a = {}) {
        return (
          Object.keys(w).forEach(f => {
            a[f] = w[f];
          }),
          a
        );
      }
      function Ii(w) {
        const a = new Map();
        return (
          Object.keys(w).forEach(f => {
            a.set(f, w[f]);
          }),
          a
        );
      }
      function z(w, a = new Map(), f) {
        if (f) for (let [v, b] of f) a.set(v, b);
        for (let [v, b] of w) a.set(v, b);
        return a;
      }
      function N(w, a, f) {
        a.forEach((v, b) => {
          const T = Zn(b);
          f && !f.has(b) && f.set(b, w.style[T]), (w.style[T] = v);
        });
      }
      function L(w, a) {
        a.forEach((f, v) => {
          const b = Zn(v);
          w.style[b] = '';
        });
      }
      function le(w) {
        return Array.isArray(w) ? (1 == w.length ? w[0] : (0, se.vP)(w)) : w;
      }
      const Xe = new RegExp('{{\\s*(.+?)\\s*}}', 'g');
      function Lt(w) {
        let a = [];
        if ('string' == typeof w) {
          let f;
          for (; (f = Xe.exec(w)); ) a.push(f[1]);
          Xe.lastIndex = 0;
        }
        return a;
      }
      function Ct(w, a, f) {
        const v = w.toString(),
          b = v.replace(Xe, (T, O) => {
            let k = a[O];
            return (
              null == k &&
                (f.push(
                  (function $e(w) {
                    return new B.vHH(3003, !1);
                  })()
                ),
                (k = '')),
              k.toString()
            );
          });
        return b == v ? w : b;
      }
      function Qt(w) {
        const a = [];
        let f = w.next();
        for (; !f.done; ) a.push(f.value), (f = w.next());
        return a;
      }
      const Cn = /-+([a-z0-9])/g;
      function Zn(w) {
        return w.replace(Cn, (...a) => a[1].toUpperCase());
      }
      function ue(w, a, f) {
        switch (a.type) {
          case 7:
            return w.visitTrigger(a, f);
          case 0:
            return w.visitState(a, f);
          case 1:
            return w.visitTransition(a, f);
          case 2:
            return w.visitSequence(a, f);
          case 3:
            return w.visitGroup(a, f);
          case 4:
            return w.visitAnimate(a, f);
          case 5:
            return w.visitKeyframes(a, f);
          case 6:
            return w.visitStyle(a, f);
          case 8:
            return w.visitReference(a, f);
          case 9:
            return w.visitAnimateChild(a, f);
          case 10:
            return w.visitAnimateRef(a, f);
          case 11:
            return w.visitQuery(a, f);
          case 12:
            return w.visitStagger(a, f);
          default:
            throw (function Et(w) {
              return new B.vHH(3004, !1);
            })();
        }
      }
      function ge(w, a) {
        return window.getComputedStyle(w)[a];
      }
      const Ht = '*';
      function un(w, a) {
        const f = [];
        return (
          'string' == typeof w
            ? w.split(/\s*,\s*/).forEach(v =>
                (function kn(w, a, f) {
                  if (':' == w[0]) {
                    const G = (function gn(w, a) {
                      switch (w) {
                        case ':enter':
                          return 'void => *';
                        case ':leave':
                          return '* => void';
                        case ':increment':
                          return (f, v) => parseFloat(v) > parseFloat(f);
                        case ':decrement':
                          return (f, v) => parseFloat(v) < parseFloat(f);
                        default:
                          return (
                            a.push(
                              (function Ve(w) {
                                return new B.vHH(3016, !1);
                              })()
                            ),
                            '* => *'
                          );
                      }
                    })(w, f);
                    if ('function' == typeof G) return void a.push(G);
                    w = G;
                  }
                  const v = w.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == v || v.length < 4)
                    return (
                      f.push(
                        (function ke(w) {
                          return new B.vHH(3015, !1);
                        })()
                      ),
                      a
                    );
                  const b = v[1],
                    T = v[2],
                    O = v[3];
                  a.push(On(b, O));
                  '<' == T[0] && !(b == Ht && O == Ht) && a.push(On(O, b));
                })(v, f, a)
              )
            : f.push(w),
          f
        );
      }
      const ze = new Set(['true', '1']),
        kt = new Set(['false', '0']);
      function On(w, a) {
        const f = ze.has(w) || kt.has(w),
          v = ze.has(a) || kt.has(a);
        return (b, T) => {
          let O = w == Ht || w == b,
            k = a == Ht || a == T;
          return (
            !O && f && 'boolean' == typeof b && (O = b ? ze.has(w) : kt.has(w)),
            !k && v && 'boolean' == typeof T && (k = T ? ze.has(a) : kt.has(a)),
            O && k
          );
        };
      }
      const yn = new RegExp('s*:selfs*,?', 'g');
      function wn(w, a, f, v) {
        return new Dr(w).build(a, f, v);
      }
      class Dr {
        constructor(a) {
          this._driver = a;
        }
        build(a, f, v) {
          const b = new Wi(f);
          return this._resetContextStyleTimingState(b), ue(this, le(a), b);
        }
        _resetContextStyleTimingState(a) {
          (a.currentQuerySelector = ''),
            (a.collectedStyles = new Map()),
            a.collectedStyles.set('', new Map()),
            (a.currentTime = 0);
        }
        visitTrigger(a, f) {
          let v = (f.queryCount = 0),
            b = (f.depCount = 0);
          const T = [],
            O = [];
          return (
            '@' == a.name.charAt(0) &&
              f.errors.push(
                (function lt() {
                  return new B.vHH(3006, !1);
                })()
              ),
            a.definitions.forEach(k => {
              if ((this._resetContextStyleTimingState(f), 0 == k.type)) {
                const G = k,
                  ee = G.name;
                ee
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach(Ae => {
                    (G.name = Ae), T.push(this.visitState(G, f));
                  }),
                  (G.name = ee);
              } else if (1 == k.type) {
                const G = this.visitTransition(k, f);
                (v += G.queryCount), (b += G.depCount), O.push(G);
              } else
                f.errors.push(
                  (function tt() {
                    return new B.vHH(3007, !1);
                  })()
                );
            }),
            {
              type: 7,
              name: a.name,
              states: T,
              transitions: O,
              queryCount: v,
              depCount: b,
              options: null,
            }
          );
        }
        visitState(a, f) {
          const v = this.visitStyle(a.styles, f),
            b = (a.options && a.options.params) || null;
          if (v.containsDynamicStyles) {
            const T = new Set(),
              O = b || {};
            v.styles.forEach(k => {
              k instanceof Map &&
                k.forEach(G => {
                  Lt(G).forEach(ee => {
                    O.hasOwnProperty(ee) || T.add(ee);
                  });
                });
            }),
              T.size &&
                (Qt(T.values()),
                f.errors.push(
                  (function Ke(w, a) {
                    return new B.vHH(3008, !1);
                  })()
                ));
          }
          return { type: 0, name: a.name, style: v, options: b ? { params: b } : null };
        }
        visitTransition(a, f) {
          (f.queryCount = 0), (f.depCount = 0);
          const v = ue(this, le(a.animation), f);
          return {
            type: 1,
            matchers: un(a.expr, f.errors),
            animation: v,
            queryCount: f.queryCount,
            depCount: f.depCount,
            options: Xn(a.options),
          };
        }
        visitSequence(a, f) {
          return { type: 2, steps: a.steps.map(v => ue(this, v, f)), options: Xn(a.options) };
        }
        visitGroup(a, f) {
          const v = f.currentTime;
          let b = 0;
          const T = a.steps.map(O => {
            f.currentTime = v;
            const k = ue(this, O, f);
            return (b = Math.max(b, f.currentTime)), k;
          });
          return (f.currentTime = b), { type: 3, steps: T, options: Xn(a.options) };
        }
        visitAnimate(a, f) {
          const v = (function Nr(w, a) {
            if (w.hasOwnProperty('duration')) return w;
            if ('number' == typeof w) return Hn(Qn(w, a).duration, 0, '');
            const f = w;
            if (f.split(/\s+/).some(T => '{' == T.charAt(0) && '{' == T.charAt(1))) {
              const T = Hn(0, 0, '');
              return (T.dynamic = !0), (T.strValue = f), T;
            }
            const b = Qn(f, a);
            return Hn(b.duration, b.delay, b.easing);
          })(a.timings, f.errors);
          f.currentAnimateTimings = v;
          let b,
            T = a.styles ? a.styles : (0, se.oB)({});
          if (5 == T.type) b = this.visitKeyframes(T, f);
          else {
            let O = a.styles,
              k = !1;
            if (!O) {
              k = !0;
              const ee = {};
              v.easing && (ee.easing = v.easing), (O = (0, se.oB)(ee));
            }
            f.currentTime += v.duration + v.delay;
            const G = this.visitStyle(O, f);
            (G.isEmptyStep = k), (b = G);
          }
          return (f.currentAnimateTimings = null), { type: 4, timings: v, style: b, options: null };
        }
        visitStyle(a, f) {
          const v = this._makeStyleAst(a, f);
          return this._validateStyleAst(v, f), v;
        }
        _makeStyleAst(a, f) {
          const v = [],
            b = Array.isArray(a.styles) ? a.styles : [a.styles];
          for (let k of b)
            'string' == typeof k
              ? k === se.l3
                ? v.push(k)
                : f.errors.push(new B.vHH(3002, !1))
              : v.push(Ii(k));
          let T = !1,
            O = null;
          return (
            v.forEach(k => {
              if (
                k instanceof Map &&
                (k.has('easing') && ((O = k.get('easing')), k.delete('easing')), !T)
              )
                for (let G of k.values())
                  if (G.toString().indexOf('{{') >= 0) {
                    T = !0;
                    break;
                  }
            }),
            {
              type: 6,
              styles: v,
              easing: O,
              offset: a.offset,
              containsDynamicStyles: T,
              options: null,
            }
          );
        }
        _validateStyleAst(a, f) {
          const v = f.currentAnimateTimings;
          let b = f.currentTime,
            T = f.currentTime;
          v && T > 0 && (T -= v.duration + v.delay),
            a.styles.forEach(O => {
              'string' != typeof O &&
                O.forEach((k, G) => {
                  const ee = f.collectedStyles.get(f.currentQuerySelector),
                    Ae = ee.get(G);
                  let Pe = !0;
                  Ae &&
                    (T != b &&
                      T >= Ae.startTime &&
                      b <= Ae.endTime &&
                      (f.errors.push(
                        (function he(w, a, f, v, b) {
                          return new B.vHH(3010, !1);
                        })()
                      ),
                      (Pe = !1)),
                    (T = Ae.startTime)),
                    Pe && ee.set(G, { startTime: T, endTime: b }),
                    f.options &&
                      (function je(w, a, f) {
                        const v = a.params || {},
                          b = Lt(w);
                        b.length &&
                          b.forEach(T => {
                            v.hasOwnProperty(T) ||
                              f.push(
                                (function Re(w) {
                                  return new B.vHH(3001, !1);
                                })()
                              );
                          });
                      })(k, f.options, f.errors);
                });
            });
        }
        visitKeyframes(a, f) {
          const v = { type: 5, styles: [], options: null };
          if (!f.currentAnimateTimings)
            return (
              f.errors.push(
                (function Ie() {
                  return new B.vHH(3011, !1);
                })()
              ),
              v
            );
          let T = 0;
          const O = [];
          let k = !1,
            G = !1,
            ee = 0;
          const Ae = a.steps.map(on => {
            const cn = this._makeStyleAst(on, f);
            let Mn =
                null != cn.offset
                  ? cn.offset
                  : (function di(w) {
                      if ('string' == typeof w) return null;
                      let a = null;
                      if (Array.isArray(w))
                        w.forEach(f => {
                          if (f instanceof Map && f.has('offset')) {
                            const v = f;
                            (a = parseFloat(v.get('offset'))), v.delete('offset');
                          }
                        });
                      else if (w instanceof Map && w.has('offset')) {
                        const f = w;
                        (a = parseFloat(f.get('offset'))), f.delete('offset');
                      }
                      return a;
                    })(cn.styles),
              Dn = 0;
            return (
              null != Mn && (T++, (Dn = cn.offset = Mn)),
              (G = G || Dn < 0 || Dn > 1),
              (k = k || Dn < ee),
              (ee = Dn),
              O.push(Dn),
              cn
            );
          });
          G &&
            f.errors.push(
              (function we() {
                return new B.vHH(3012, !1);
              })()
            ),
            k &&
              f.errors.push(
                (function X() {
                  return new B.vHH(3200, !1);
                })()
              );
          const Pe = a.steps.length;
          let bt = 0;
          T > 0 && T < Pe
            ? f.errors.push(
                (function Se() {
                  return new B.vHH(3202, !1);
                })()
              )
            : 0 == T && (bt = 1 / (Pe - 1));
          const ht = Pe - 1,
            Je = f.currentTime,
            ot = f.currentAnimateTimings,
            qt = ot.duration;
          return (
            Ae.forEach((on, cn) => {
              const Mn = bt > 0 ? (cn == ht ? 1 : bt * cn) : O[cn],
                Dn = Mn * qt;
              (f.currentTime = Je + ot.delay + Dn),
                (ot.duration = Dn),
                this._validateStyleAst(on, f),
                (on.offset = Mn),
                v.styles.push(on);
            }),
            v
          );
        }
        visitReference(a, f) {
          return { type: 8, animation: ue(this, le(a.animation), f), options: Xn(a.options) };
        }
        visitAnimateChild(a, f) {
          return f.depCount++, { type: 9, options: Xn(a.options) };
        }
        visitAnimateRef(a, f) {
          return {
            type: 10,
            animation: this.visitReference(a.animation, f),
            options: Xn(a.options),
          };
        }
        visitQuery(a, f) {
          const v = f.currentQuerySelector,
            b = a.options || {};
          f.queryCount++, (f.currentQuery = a);
          const [T, O] = (function Ti(w) {
            const a = !!w.split(/\s*,\s*/).find(f => ':self' == f);
            return (
              a && (w = w.replace(yn, '')),
              (w = w
                .replace(/@\*/g, mr)
                .replace(/@\w+/g, f => mr + '-' + f.slice(1))
                .replace(/:animating/g, En)),
              [w, a]
            );
          })(a.selector);
          (f.currentQuerySelector = v.length ? v + ' ' + T : T),
            Kt(f.collectedStyles, f.currentQuerySelector, new Map());
          const k = ue(this, le(a.animation), f);
          return (
            (f.currentQuery = null),
            (f.currentQuerySelector = v),
            {
              type: 11,
              selector: T,
              limit: b.limit || 0,
              optional: !!b.optional,
              includeSelf: O,
              animation: k,
              originalSelector: a.selector,
              options: Xn(a.options),
            }
          );
        }
        visitStagger(a, f) {
          f.currentQuery ||
            f.errors.push(
              (function ne() {
                return new B.vHH(3013, !1);
              })()
            );
          const v =
            'full' === a.timings
              ? { duration: 0, delay: 0, easing: 'full' }
              : Qn(a.timings, f.errors, !0);
          return { type: 12, animation: ue(this, le(a.animation), f), timings: v, options: null };
        }
      }
      class Wi {
        constructor(a) {
          (this.errors = a),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function Xn(w) {
        return (
          w
            ? (w = Ln(w)).params &&
              (w.params = (function ei(w) {
                return w ? Ln(w) : null;
              })(w.params))
            : (w = {}),
          w
        );
      }
      function Hn(w, a, f) {
        return { duration: w, delay: a, easing: f };
      }
      function fi(w, a, f, v, b, T, O = null, k = !1) {
        return {
          type: 1,
          element: w,
          keyframes: a,
          preStyleProps: f,
          postStyleProps: v,
          duration: b,
          delay: T,
          totalTime: b + T,
          easing: O,
          subTimeline: k,
        };
      }
      class Un {
        constructor() {
          this._map = new Map();
        }
        get(a) {
          return this._map.get(a) || [];
        }
        append(a, f) {
          let v = this._map.get(a);
          v || this._map.set(a, (v = [])), v.push(...f);
        }
        has(a) {
          return this._map.has(a);
        }
        clear() {
          this._map.clear();
        }
      }
      const xn = new RegExp(':enter', 'g'),
        Jn = new RegExp(':leave', 'g');
      function Ki(w, a, f, v, b, T = new Map(), O = new Map(), k, G, ee = []) {
        return new Mo().buildKeyframes(w, a, f, v, b, T, O, k, G, ee);
      }
      class Mo {
        buildKeyframes(a, f, v, b, T, O, k, G, ee, Ae = []) {
          ee = ee || new Un();
          const Pe = new Yi(a, f, ee, b, T, Ae, []);
          Pe.options = G;
          const bt = G.delay ? ln(G.delay) : 0;
          Pe.currentTimeline.delayNextStep(bt),
            Pe.currentTimeline.setStyles([O], null, Pe.errors, G),
            ue(this, v, Pe);
          const ht = Pe.timelines.filter(Je => Je.containsAnimation());
          if (ht.length && k.size) {
            let Je;
            for (let ot = ht.length - 1; ot >= 0; ot--) {
              const qt = ht[ot];
              if (qt.element === f) {
                Je = qt;
                break;
              }
            }
            Je && !Je.allowOnlyTimelineStyles() && Je.setStyles([k], null, Pe.errors, G);
          }
          return ht.length ? ht.map(Je => Je.buildKeyframes()) : [fi(f, [], [], [], 0, bt, '', !1)];
        }
        visitTrigger(a, f) {}
        visitState(a, f) {}
        visitTransition(a, f) {}
        visitAnimateChild(a, f) {
          const v = f.subInstructions.get(f.element);
          if (v) {
            const b = f.createSubContext(a.options),
              T = f.currentTimeline.currentTime,
              O = this._visitSubInstructions(v, b, b.options);
            T != O && f.transformIntoNewTimeline(O);
          }
          f.previousNode = a;
        }
        visitAnimateRef(a, f) {
          const v = f.createSubContext(a.options);
          v.transformIntoNewTimeline(),
            this._applyAnimationRefDelays([a.options, a.animation.options], f, v),
            this.visitReference(a.animation, v),
            f.transformIntoNewTimeline(v.currentTimeline.currentTime),
            (f.previousNode = a);
        }
        _applyAnimationRefDelays(a, f, v) {
          for (const b of a) {
            const T = b?.delay;
            if (T) {
              const O = 'number' == typeof T ? T : ln(Ct(T, b?.params ?? {}, f.errors));
              v.delayNextStep(O);
            }
          }
        }
        _visitSubInstructions(a, f, v) {
          let T = f.currentTimeline.currentTime;
          const O = null != v.duration ? ln(v.duration) : null,
            k = null != v.delay ? ln(v.delay) : null;
          return (
            0 !== O &&
              a.forEach(G => {
                const ee = f.appendInstructionToTimeline(G, O, k);
                T = Math.max(T, ee.duration + ee.delay);
              }),
            T
          );
        }
        visitReference(a, f) {
          f.updateOptions(a.options, !0), ue(this, a.animation, f), (f.previousNode = a);
        }
        visitSequence(a, f) {
          const v = f.subContextCount;
          let b = f;
          const T = a.options;
          if (
            T &&
            (T.params || T.delay) &&
            ((b = f.createSubContext(T)), b.transformIntoNewTimeline(), null != T.delay)
          ) {
            6 == b.previousNode.type &&
              (b.currentTimeline.snapshotCurrentStyles(), (b.previousNode = Ai));
            const O = ln(T.delay);
            b.delayNextStep(O);
          }
          a.steps.length &&
            (a.steps.forEach(O => ue(this, O, b)),
            b.currentTimeline.applyStylesToKeyframe(),
            b.subContextCount > v && b.transformIntoNewTimeline()),
            (f.previousNode = a);
        }
        visitGroup(a, f) {
          const v = [];
          let b = f.currentTimeline.currentTime;
          const T = a.options && a.options.delay ? ln(a.options.delay) : 0;
          a.steps.forEach(O => {
            const k = f.createSubContext(a.options);
            T && k.delayNextStep(T),
              ue(this, O, k),
              (b = Math.max(b, k.currentTimeline.currentTime)),
              v.push(k.currentTimeline);
          }),
            v.forEach(O => f.currentTimeline.mergeTimelineCollectedStyles(O)),
            f.transformIntoNewTimeline(b),
            (f.previousNode = a);
        }
        _visitTiming(a, f) {
          if (a.dynamic) {
            const v = a.strValue;
            return Qn(f.params ? Ct(v, f.params, f.errors) : v, f.errors);
          }
          return { duration: a.duration, delay: a.delay, easing: a.easing };
        }
        visitAnimate(a, f) {
          const v = (f.currentAnimateTimings = this._visitTiming(a.timings, f)),
            b = f.currentTimeline;
          v.delay && (f.incrementTime(v.delay), b.snapshotCurrentStyles());
          const T = a.style;
          5 == T.type
            ? this.visitKeyframes(T, f)
            : (f.incrementTime(v.duration), this.visitStyle(T, f), b.applyStylesToKeyframe()),
            (f.currentAnimateTimings = null),
            (f.previousNode = a);
        }
        visitStyle(a, f) {
          const v = f.currentTimeline,
            b = f.currentAnimateTimings;
          !b && v.hasCurrentStyleProperties() && v.forwardFrame();
          const T = (b && b.easing) || a.easing;
          a.isEmptyStep ? v.applyEmptyStep(T) : v.setStyles(a.styles, T, f.errors, f.options),
            (f.previousNode = a);
        }
        visitKeyframes(a, f) {
          const v = f.currentAnimateTimings,
            b = f.currentTimeline.duration,
            T = v.duration,
            k = f.createSubContext().currentTimeline;
          (k.easing = v.easing),
            a.styles.forEach(G => {
              k.forwardTime((G.offset || 0) * T),
                k.setStyles(G.styles, G.easing, f.errors, f.options),
                k.applyStylesToKeyframe();
            }),
            f.currentTimeline.mergeTimelineCollectedStyles(k),
            f.transformIntoNewTimeline(b + T),
            (f.previousNode = a);
        }
        visitQuery(a, f) {
          const v = f.currentTimeline.currentTime,
            b = a.options || {},
            T = b.delay ? ln(b.delay) : 0;
          T &&
            (6 === f.previousNode.type ||
              (0 == v && f.currentTimeline.hasCurrentStyleProperties())) &&
            (f.currentTimeline.snapshotCurrentStyles(), (f.previousNode = Ai));
          let O = v;
          const k = f.invokeQuery(
            a.selector,
            a.originalSelector,
            a.limit,
            a.includeSelf,
            !!b.optional,
            f.errors
          );
          f.currentQueryTotal = k.length;
          let G = null;
          k.forEach((ee, Ae) => {
            f.currentQueryIndex = Ae;
            const Pe = f.createSubContext(a.options, ee);
            T && Pe.delayNextStep(T),
              ee === f.element && (G = Pe.currentTimeline),
              ue(this, a.animation, Pe),
              Pe.currentTimeline.applyStylesToKeyframe(),
              (O = Math.max(O, Pe.currentTimeline.currentTime));
          }),
            (f.currentQueryIndex = 0),
            (f.currentQueryTotal = 0),
            f.transformIntoNewTimeline(O),
            G &&
              (f.currentTimeline.mergeTimelineCollectedStyles(G),
              f.currentTimeline.snapshotCurrentStyles()),
            (f.previousNode = a);
        }
        visitStagger(a, f) {
          const v = f.parentContext,
            b = f.currentTimeline,
            T = a.timings,
            O = Math.abs(T.duration),
            k = O * (f.currentQueryTotal - 1);
          let G = O * f.currentQueryIndex;
          switch (T.duration < 0 ? 'reverse' : T.easing) {
            case 'reverse':
              G = k - G;
              break;
            case 'full':
              G = v.currentStaggerTime;
          }
          const Ae = f.currentTimeline;
          G && Ae.delayNextStep(G);
          const Pe = Ae.currentTime;
          ue(this, a.animation, f),
            (f.previousNode = a),
            (v.currentStaggerTime =
              b.currentTime - Pe + (b.startTime - v.currentTimeline.startTime));
        }
      }
      const Ai = {};
      class Yi {
        constructor(a, f, v, b, T, O, k, G) {
          (this._driver = a),
            (this.element = f),
            (this.subInstructions = v),
            (this._enterClassName = b),
            (this._leaveClassName = T),
            (this.errors = O),
            (this.timelines = k),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Ai),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = G || new pi(this._driver, f, 0)),
            k.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(a, f) {
          if (!a) return;
          const v = a;
          let b = this.options;
          null != v.duration && (b.duration = ln(v.duration)),
            null != v.delay && (b.delay = ln(v.delay));
          const T = v.params;
          if (T) {
            let O = b.params;
            O || (O = this.options.params = {}),
              Object.keys(T).forEach(k => {
                (!f || !O.hasOwnProperty(k)) && (O[k] = Ct(T[k], O, this.errors));
              });
          }
        }
        _copyOptions() {
          const a = {};
          if (this.options) {
            const f = this.options.params;
            if (f) {
              const v = (a.params = {});
              Object.keys(f).forEach(b => {
                v[b] = f[b];
              });
            }
          }
          return a;
        }
        createSubContext(a = null, f, v) {
          const b = f || this.element,
            T = new Yi(
              this._driver,
              b,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(b, v || 0)
            );
          return (
            (T.previousNode = this.previousNode),
            (T.currentAnimateTimings = this.currentAnimateTimings),
            (T.options = this._copyOptions()),
            T.updateOptions(a),
            (T.currentQueryIndex = this.currentQueryIndex),
            (T.currentQueryTotal = this.currentQueryTotal),
            (T.parentContext = this),
            this.subContextCount++,
            T
          );
        }
        transformIntoNewTimeline(a) {
          return (
            (this.previousNode = Ai),
            (this.currentTimeline = this.currentTimeline.fork(this.element, a)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(a, f, v) {
          const b = {
              duration: f ?? a.duration,
              delay: this.currentTimeline.currentTime + (v ?? 0) + a.delay,
              easing: '',
            },
            T = new Io(
              this._driver,
              a.element,
              a.keyframes,
              a.preStyleProps,
              a.postStyleProps,
              b,
              a.stretchStartingKeyframe
            );
          return this.timelines.push(T), b;
        }
        incrementTime(a) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + a);
        }
        delayNextStep(a) {
          a > 0 && this.currentTimeline.delayNextStep(a);
        }
        invokeQuery(a, f, v, b, T, O) {
          let k = [];
          if ((b && k.push(this.element), a.length > 0)) {
            a = (a = a.replace(xn, '.' + this._enterClassName)).replace(
              Jn,
              '.' + this._leaveClassName
            );
            let ee = this._driver.query(this.element, a, 1 != v);
            0 !== v && (ee = v < 0 ? ee.slice(ee.length + v, ee.length) : ee.slice(0, v)),
              k.push(...ee);
          }
          return (
            !T &&
              0 == k.length &&
              O.push(
                (function yt(w) {
                  return new B.vHH(3014, !1);
                })()
              ),
            k
          );
        }
      }
      class pi {
        constructor(a, f, v, b) {
          (this._driver = a),
            (this.element = f),
            (this.startTime = v),
            (this._elementTimelineStylesLookup = b),
            (this.duration = 0),
            (this.easing = null),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(f)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(f, this._localTimelineStyles)),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(a) {
          const f = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || f
            ? (this.forwardTime(this.currentTime + a), f && this.snapshotCurrentStyles())
            : (this.startTime += a);
        }
        fork(a, f) {
          return (
            this.applyStylesToKeyframe(),
            new pi(this._driver, a, f || this.currentTime, this._elementTimelineStylesLookup)
          );
        }
        _loadKeyframe() {
          this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(a) {
          this.applyStylesToKeyframe(), (this.duration = a), this._loadKeyframe();
        }
        _updateStyle(a, f) {
          this._localTimelineStyles.set(a, f),
            this._globalTimelineStyles.set(a, f),
            this._styleSummary.set(a, { time: this.currentTime, value: f });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(a) {
          a && this._previousKeyframe.set('easing', a);
          for (let [f, v] of this._globalTimelineStyles)
            this._backFill.set(f, v || se.l3), this._currentKeyframe.set(f, se.l3);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(a, f, v, b) {
          f && this._previousKeyframe.set('easing', f);
          const T = (b && b.params) || {},
            O = (function To(w, a) {
              const f = new Map();
              let v;
              return (
                w.forEach(b => {
                  if ('*' === b) {
                    v = v || a.keys();
                    for (let T of v) f.set(T, se.l3);
                  } else z(b, f);
                }),
                f
              );
            })(a, this._globalTimelineStyles);
          for (let [k, G] of O) {
            const ee = Ct(G, T, v);
            this._pendingStyles.set(k, ee),
              this._localTimelineStyles.has(k) ||
                this._backFill.set(k, this._globalTimelineStyles.get(k) ?? se.l3),
              this._updateStyle(k, ee);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((a, f) => {
              this._currentKeyframe.set(f, a);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((a, f) => {
              this._currentKeyframe.has(f) || this._currentKeyframe.set(f, a);
            }));
        }
        snapshotCurrentStyles() {
          for (let [a, f] of this._localTimelineStyles)
            this._pendingStyles.set(a, f), this._updateStyle(a, f);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const a = [];
          for (let f in this._currentKeyframe) a.push(f);
          return a;
        }
        mergeTimelineCollectedStyles(a) {
          a._styleSummary.forEach((f, v) => {
            const b = this._styleSummary.get(v);
            (!b || f.time > b.time) && this._updateStyle(v, f.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const a = new Set(),
            f = new Set(),
            v = 1 === this._keyframes.size && 0 === this.duration;
          let b = [];
          this._keyframes.forEach((k, G) => {
            const ee = z(k, new Map(), this._backFill);
            ee.forEach((Ae, Pe) => {
              Ae === se.k1 ? a.add(Pe) : Ae === se.l3 && f.add(Pe);
            }),
              v || ee.set('offset', G / this.duration),
              b.push(ee);
          });
          const T = a.size ? Qt(a.values()) : [],
            O = f.size ? Qt(f.values()) : [];
          if (v) {
            const k = b[0],
              G = new Map(k);
            k.set('offset', 0), G.set('offset', 1), (b = [k, G]);
          }
          return fi(this.element, b, T, O, this.duration, this.startTime, this.easing, !1);
        }
      }
      class Io extends pi {
        constructor(a, f, v, b, T, O, k = !1) {
          super(a, f, O.delay),
            (this.keyframes = v),
            (this.preStyleProps = b),
            (this.postStyleProps = T),
            (this._stretchStartingKeyframe = k),
            (this.timings = { duration: O.duration, delay: O.delay, easing: O.easing });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let a = this.keyframes,
            { delay: f, duration: v, easing: b } = this.timings;
          if (this._stretchStartingKeyframe && f) {
            const T = [],
              O = v + f,
              k = f / O,
              G = z(a[0]);
            G.set('offset', 0), T.push(G);
            const ee = z(a[0]);
            ee.set('offset', ao(k)), T.push(ee);
            const Ae = a.length - 1;
            for (let Pe = 1; Pe <= Ae; Pe++) {
              let bt = z(a[Pe]);
              const ht = bt.get('offset');
              bt.set('offset', ao((f + ht * v) / O)), T.push(bt);
            }
            (v = O), (f = 0), (b = ''), (a = T);
          }
          return fi(this.element, a, this.preStyleProps, this.postStyleProps, v, f, b, !0);
        }
      }
      function ao(w, a = 3) {
        const f = Math.pow(10, a - 1);
        return Math.round(w * f) / f;
      }
      class Ri {}
      const qi = new Set([
        'width',
        'height',
        'minWidth',
        'minHeight',
        'maxWidth',
        'maxHeight',
        'left',
        'top',
        'bottom',
        'right',
        'fontSize',
        'outlineWidth',
        'outlineOffset',
        'paddingTop',
        'paddingLeft',
        'paddingBottom',
        'paddingRight',
        'marginTop',
        'marginLeft',
        'marginBottom',
        'marginRight',
        'borderRadius',
        'borderWidth',
        'borderTopWidth',
        'borderLeftWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'textIndent',
        'perspective',
      ]);
      class uo extends Ri {
        normalizePropertyName(a, f) {
          return Zn(a);
        }
        normalizeStyleValue(a, f, v, b) {
          let T = '';
          const O = v.toString().trim();
          if (qi.has(f) && 0 !== v && '0' !== v)
            if ('number' == typeof v) T = 'px';
            else {
              const k = v.match(/^[+-]?[\d\.]+([a-z]*)$/);
              k &&
                0 == k[1].length &&
                b.push(
                  (function Le(w, a) {
                    return new B.vHH(3005, !1);
                  })()
                );
            }
          return O + T;
        }
      }
      function co(w, a, f, v, b, T, O, k, G, ee, Ae, Pe, bt) {
        return {
          type: 0,
          element: w,
          triggerName: a,
          isRemovalTransition: b,
          fromState: f,
          fromStyles: T,
          toState: v,
          toStyles: O,
          timelines: k,
          queriedElements: G,
          preStyleProps: ee,
          postStyleProps: Ae,
          totalTime: Pe,
          errors: bt,
        };
      }
      const Or = {};
      class Pi {
        constructor(a, f, v) {
          (this._triggerName = a), (this.ast = f), (this._stateStyles = v);
        }
        match(a, f, v, b) {
          return (function _t(w, a, f, v, b) {
            return w.some(T => T(a, f, v, b));
          })(this.ast.matchers, a, f, v, b);
        }
        buildStyles(a, f, v) {
          let b = this._stateStyles.get('*');
          return (
            void 0 !== a && (b = this._stateStyles.get(a?.toString()) || b),
            b ? b.buildStyles(f, v) : new Map()
          );
        }
        build(a, f, v, b, T, O, k, G, ee, Ae) {
          const Pe = [],
            bt = (this.ast.options && this.ast.options.params) || Or,
            Je = this.buildStyles(v, (k && k.params) || Or, Pe),
            ot = (G && G.params) || Or,
            qt = this.buildStyles(b, ot, Pe),
            on = new Set(),
            cn = new Map(),
            Mn = new Map(),
            Dn = 'void' === b,
            ni = { params: Yt(ot, bt), delay: this.ast.options?.delay },
            fr = Ae ? [] : Ki(a, f, this.ast.animation, T, O, Je, qt, ni, ee, Pe);
          let dn = 0;
          if (
            (fr.forEach(Vn => {
              dn = Math.max(Vn.duration + Vn.delay, dn);
            }),
            Pe.length)
          )
            return co(f, this._triggerName, v, b, Dn, Je, qt, [], [], cn, Mn, dn, Pe);
          fr.forEach(Vn => {
            const Sr = Vn.element,
              es = Kt(cn, Sr, new Set());
            Vn.preStyleProps.forEach(Ci => es.add(Ci));
            const Xi = Kt(Mn, Sr, new Set());
            Vn.postStyleProps.forEach(Ci => Xi.add(Ci)), Sr !== f && on.add(Sr);
          });
          const er = Qt(on.values());
          return co(f, this._triggerName, v, b, Dn, Je, qt, fr, er, cn, Mn, dn);
        }
      }
      function Yt(w, a) {
        const f = Ln(a);
        for (const v in w) w.hasOwnProperty(v) && null != w[v] && (f[v] = w[v]);
        return f;
      }
      class sn {
        constructor(a, f, v) {
          (this.styles = a), (this.defaultParams = f), (this.normalizer = v);
        }
        buildStyles(a, f) {
          const v = new Map(),
            b = Ln(this.defaultParams);
          return (
            Object.keys(a).forEach(T => {
              const O = a[T];
              null !== O && (b[T] = O);
            }),
            this.styles.styles.forEach(T => {
              'string' != typeof T &&
                T.forEach((O, k) => {
                  O && (O = Ct(O, b, f));
                  const G = this.normalizer.normalizePropertyName(k, f);
                  (O = this.normalizer.normalizeStyleValue(k, G, O, f)), v.set(k, O);
                });
            }),
            v
          );
        }
      }
      class jn {
        constructor(a, f, v) {
          (this.name = a),
            (this.ast = f),
            (this._normalizer = v),
            (this.transitionFactories = []),
            (this.states = new Map()),
            f.states.forEach(b => {
              this.states.set(b.name, new sn(b.style, (b.options && b.options.params) || {}, v));
            }),
            sr(this.states, 'true', '1'),
            sr(this.states, 'false', '0'),
            f.transitions.forEach(b => {
              this.transitionFactories.push(new Pi(a, b, this.states));
            }),
            (this.fallbackTransition = (function fo(w, a, f) {
              return new Pi(
                w,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(O, k) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                a
              );
            })(a, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(a, f, v, b) {
          return this.transitionFactories.find(O => O.match(a, f, v, b)) || null;
        }
        matchStyles(a, f, v) {
          return this.fallbackTransition.buildStyles(a, f, v);
        }
      }
      function sr(w, a, f) {
        w.has(a) ? w.has(f) || w.set(f, w.get(a)) : w.has(f) && w.set(a, w.get(f));
      }
      const Gr = new Un();
      class qo {
        constructor(a, f, v) {
          (this.bodyNode = a),
            (this._driver = f),
            (this._normalizer = v),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(a, f) {
          const v = [],
            T = wn(this._driver, f, v, []);
          if (v.length)
            throw (function V(w) {
              return new B.vHH(3503, !1);
            })();
          this._animations.set(a, T);
        }
        _buildPlayer(a, f, v) {
          const b = a.element,
            T = Ft(this._normalizer, a.keyframes, f, v);
          return this._driver.animate(b, T, a.duration, a.delay, a.easing, [], !0);
        }
        create(a, f, v = {}) {
          const b = [],
            T = this._animations.get(a);
          let O;
          const k = new Map();
          if (
            (T
              ? ((O = Ki(this._driver, f, T, rr, qe, new Map(), new Map(), v, Gr, b)),
                O.forEach(Ae => {
                  const Pe = Kt(k, Ae.element, new Map());
                  Ae.postStyleProps.forEach(bt => Pe.set(bt, null));
                }))
              : (b.push(
                  (function J() {
                    return new B.vHH(3300, !1);
                  })()
                ),
                (O = [])),
            b.length)
          )
            throw (function ae(w) {
              return new B.vHH(3504, !1);
            })();
          k.forEach((Ae, Pe) => {
            Ae.forEach((bt, ht) => {
              Ae.set(ht, this._driver.computeStyle(Pe, ht, se.l3));
            });
          });
          const ee = vt(
            O.map(Ae => {
              const Pe = k.get(Ae.element);
              return this._buildPlayer(Ae, new Map(), Pe);
            })
          );
          return (
            this._playersById.set(a, ee),
            ee.onDestroy(() => this.destroy(a)),
            this.players.push(ee),
            ee
          );
        }
        destroy(a) {
          const f = this._getPlayer(a);
          f.destroy(), this._playersById.delete(a);
          const v = this.players.indexOf(f);
          v >= 0 && this.players.splice(v, 1);
        }
        _getPlayer(a) {
          const f = this._playersById.get(a);
          if (!f)
            throw (function re(w) {
              return new B.vHH(3301, !1);
            })();
          return f;
        }
        listen(a, f, v, b) {
          const T = Qe(f, '', '', '');
          return Ue(this._getPlayer(a), v, T, b), () => {};
        }
        command(a, f, v, b) {
          if ('register' == v) return void this.register(a, b[0]);
          if ('create' == v) return void this.create(a, f, b[0] || {});
          const T = this._getPlayer(a);
          switch (v) {
            case 'play':
              T.play();
              break;
            case 'pause':
              T.pause();
              break;
            case 'reset':
              T.reset();
              break;
            case 'restart':
              T.restart();
              break;
            case 'finish':
              T.finish();
              break;
            case 'init':
              T.init();
              break;
            case 'setPosition':
              T.setPosition(parseFloat(b[0]));
              break;
            case 'destroy':
              this.destroy(a);
          }
        }
      }
      const Ni = 'ng-animate-queued',
        Ne = 'ng-animate-disabled',
        Wr = [],
        bn = {
          namespaceId: '',
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        xr = {
          namespaceId: '',
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        Nt = '__ng_removed';
      class Er {
        get params() {
          return this.options.params;
        }
        constructor(a, f = '') {
          this.namespaceId = f;
          const v = a && a.hasOwnProperty('value');
          if (
            ((this.value = (function Kr(w) {
              return w ?? null;
            })(v ? a.value : a)),
            v)
          ) {
            const T = Ln(a);
            delete T.value, (this.options = T);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        absorbOptions(a) {
          const f = a.params;
          if (f) {
            const v = this.options.params;
            Object.keys(f).forEach(b => {
              null == v[b] && (v[b] = f[b]);
            });
          }
        }
      }
      const Bn = 'void',
        it = new Er(Bn);
      class gi {
        constructor(a, f, v) {
          (this.id = a),
            (this.hostElement = f),
            (this._engine = v),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = 'ng-tns-' + a),
            mn(f, this._hostClassName);
        }
        listen(a, f, v, b) {
          if (!this._triggers.has(f))
            throw (function De(w, a) {
              return new B.vHH(3302, !1);
            })();
          if (null == v || 0 == v.length)
            throw (function be(w) {
              return new B.vHH(3303, !1);
            })();
          if (
            !(function ar(w) {
              return 'start' == w || 'done' == w;
            })(v)
          )
            throw (function nt(w, a) {
              return new B.vHH(3400, !1);
            })();
          const T = Kt(this._elementListeners, a, []),
            O = { name: f, phase: v, callback: b };
          T.push(O);
          const k = Kt(this._engine.statesByElement, a, new Map());
          return (
            k.has(f) || (mn(a, qn), mn(a, qn + '-' + f), k.set(f, it)),
            () => {
              this._engine.afterFlush(() => {
                const G = T.indexOf(O);
                G >= 0 && T.splice(G, 1), this._triggers.has(f) || k.delete(f);
              });
            }
          );
        }
        register(a, f) {
          return !this._triggers.has(a) && (this._triggers.set(a, f), !0);
        }
        _getTrigger(a) {
          const f = this._triggers.get(a);
          if (!f)
            throw (function Tt(w) {
              return new B.vHH(3401, !1);
            })();
          return f;
        }
        trigger(a, f, v, b = !0) {
          const T = this._getTrigger(f),
            O = new Cr(this.id, f, a);
          let k = this._engine.statesByElement.get(a);
          k ||
            (mn(a, qn), mn(a, qn + '-' + f), this._engine.statesByElement.set(a, (k = new Map())));
          let G = k.get(f);
          const ee = new Er(v, this.id);
          if (
            (!(v && v.hasOwnProperty('value')) && G && ee.absorbOptions(G.options),
            k.set(f, ee),
            G || (G = it),
            ee.value !== Bn && G.value === ee.value)
          ) {
            if (
              !(function po(w, a) {
                const f = Object.keys(w),
                  v = Object.keys(a);
                if (f.length != v.length) return !1;
                for (let b = 0; b < f.length; b++) {
                  const T = f[b];
                  if (!a.hasOwnProperty(T) || w[T] !== a[T]) return !1;
                }
                return !0;
              })(G.params, ee.params)
            ) {
              const ot = [],
                qt = T.matchStyles(G.value, G.params, ot),
                on = T.matchStyles(ee.value, ee.params, ot);
              ot.length
                ? this._engine.reportError(ot)
                : this._engine.afterFlush(() => {
                    L(a, qt), N(a, on);
                  });
            }
            return;
          }
          const bt = Kt(this._engine.playersByElement, a, []);
          bt.forEach(ot => {
            ot.namespaceId == this.id && ot.triggerName == f && ot.queued && ot.destroy();
          });
          let ht = T.matchTransition(G.value, ee.value, a, ee.params),
            Je = !1;
          if (!ht) {
            if (!b) return;
            (ht = T.fallbackTransition), (Je = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: a,
              triggerName: f,
              transition: ht,
              fromState: G,
              toState: ee,
              player: O,
              isFallbackTransition: Je,
            }),
            Je ||
              (mn(a, Ni),
              O.onStart(() => {
                Fr(a, Ni);
              })),
            O.onDone(() => {
              let ot = this.players.indexOf(O);
              ot >= 0 && this.players.splice(ot, 1);
              const qt = this._engine.playersByElement.get(a);
              if (qt) {
                let on = qt.indexOf(O);
                on >= 0 && qt.splice(on, 1);
              }
            }),
            this.players.push(O),
            bt.push(O),
            O
          );
        }
        deregister(a) {
          this._triggers.delete(a),
            this._engine.statesByElement.forEach(f => f.delete(a)),
            this._elementListeners.forEach((f, v) => {
              this._elementListeners.set(
                v,
                f.filter(b => b.name != a)
              );
            });
        }
        clearElementCache(a) {
          this._engine.statesByElement.delete(a), this._elementListeners.delete(a);
          const f = this._engine.playersByElement.get(a);
          f && (f.forEach(v => v.destroy()), this._engine.playersByElement.delete(a));
        }
        _signalRemovalForInnerTriggers(a, f) {
          const v = this._engine.driver.query(a, mr, !0);
          v.forEach(b => {
            if (b[Nt]) return;
            const T = this._engine.fetchNamespacesByElement(b);
            T.size
              ? T.forEach(O => O.triggerLeaveAnimation(b, f, !1, !0))
              : this.clearElementCache(b);
          }),
            this._engine.afterFlushAnimationsDone(() => v.forEach(b => this.clearElementCache(b)));
        }
        triggerLeaveAnimation(a, f, v, b) {
          const T = this._engine.statesByElement.get(a),
            O = new Map();
          if (T) {
            const k = [];
            if (
              (T.forEach((G, ee) => {
                if ((O.set(ee, G.value), this._triggers.has(ee))) {
                  const Ae = this.trigger(a, ee, Bn, b);
                  Ae && k.push(Ae);
                }
              }),
              k.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, a, !0, f, O),
                v && vt(k).onDone(() => this._engine.processLeaveNode(a)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(a) {
          const f = this._elementListeners.get(a),
            v = this._engine.statesByElement.get(a);
          if (f && v) {
            const b = new Set();
            f.forEach(T => {
              const O = T.name;
              if (b.has(O)) return;
              b.add(O);
              const G = this._triggers.get(O).fallbackTransition,
                ee = v.get(O) || it,
                Ae = new Er(Bn),
                Pe = new Cr(this.id, O, a);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: a,
                  triggerName: O,
                  transition: G,
                  fromState: ee,
                  toState: Ae,
                  player: Pe,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(a, f) {
          const v = this._engine;
          if (
            (a.childElementCount && this._signalRemovalForInnerTriggers(a, f),
            this.triggerLeaveAnimation(a, f, !0))
          )
            return;
          let b = !1;
          if (v.totalAnimations) {
            const T = v.players.length ? v.playersByQueriedElement.get(a) : [];
            if (T && T.length) b = !0;
            else {
              let O = a;
              for (; (O = O.parentNode); )
                if (v.statesByElement.get(O)) {
                  b = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(a), b))
            v.markElementAsRemoved(this.id, a, !1, f);
          else {
            const T = a[Nt];
            (!T || T === bn) &&
              (v.afterFlush(() => this.clearElementCache(a)),
              v.destroyInnerAnimations(a),
              v._onRemovalComplete(a, f));
          }
        }
        insertNode(a, f) {
          mn(a, this._hostClassName);
        }
        drainQueuedTransitions(a) {
          const f = [];
          return (
            this._queue.forEach(v => {
              const b = v.player;
              if (b.destroyed) return;
              const T = v.element,
                O = this._elementListeners.get(T);
              O &&
                O.forEach(k => {
                  if (k.name == v.triggerName) {
                    const G = Qe(T, v.triggerName, v.fromState.value, v.toState.value);
                    (G._data = a), Ue(v.player, k.phase, G, k.callback);
                  }
                }),
                b.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      b.destroy();
                    })
                  : f.push(v);
            }),
            (this._queue = []),
            f.sort((v, b) => {
              const T = v.transition.ast.depCount,
                O = b.transition.ast.depCount;
              return 0 == T || 0 == O
                ? T - O
                : this._engine.driver.containsElement(v.element, b.element)
                  ? 1
                  : -1;
            })
          );
        }
        destroy(a) {
          this.players.forEach(f => f.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, a);
        }
      }
      class Zi {
        _onRemovalComplete(a, f) {
          this.onRemovalComplete(a, f);
        }
        constructor(a, f, v) {
          (this.bodyNode = a),
            (this.driver = f),
            (this._normalizer = v),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (b, T) => {});
        }
        get queuedPlayers() {
          const a = [];
          return (
            this._namespaceList.forEach(f => {
              f.players.forEach(v => {
                v.queued && a.push(v);
              });
            }),
            a
          );
        }
        createNamespace(a, f) {
          const v = new gi(a, f, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, f)
              ? this._balanceNamespaceList(v, f)
              : (this.newHostElements.set(f, v), this.collectEnterElement(f)),
            (this._namespaceLookup[a] = v)
          );
        }
        _balanceNamespaceList(a, f) {
          const v = this._namespaceList,
            b = this.namespacesByHostElement;
          if (v.length - 1 >= 0) {
            let O = !1,
              k = this.driver.getParentElement(f);
            for (; k; ) {
              const G = b.get(k);
              if (G) {
                const ee = v.indexOf(G);
                v.splice(ee + 1, 0, a), (O = !0);
                break;
              }
              k = this.driver.getParentElement(k);
            }
            O || v.unshift(a);
          } else v.push(a);
          return b.set(f, a), a;
        }
        register(a, f) {
          let v = this._namespaceLookup[a];
          return v || (v = this.createNamespace(a, f)), v;
        }
        registerTrigger(a, f, v) {
          let b = this._namespaceLookup[a];
          b && b.register(f, v) && this.totalAnimations++;
        }
        destroy(a, f) {
          a &&
            (this.afterFlush(() => {}),
            this.afterFlushAnimationsDone(() => {
              const v = this._fetchNamespace(a);
              this.namespacesByHostElement.delete(v.hostElement);
              const b = this._namespaceList.indexOf(v);
              b >= 0 && this._namespaceList.splice(b, 1),
                v.destroy(f),
                delete this._namespaceLookup[a];
            }));
        }
        _fetchNamespace(a) {
          return this._namespaceLookup[a];
        }
        fetchNamespacesByElement(a) {
          const f = new Set(),
            v = this.statesByElement.get(a);
          if (v)
            for (let b of v.values())
              if (b.namespaceId) {
                const T = this._fetchNamespace(b.namespaceId);
                T && f.add(T);
              }
          return f;
        }
        trigger(a, f, v, b) {
          if (_r(f)) {
            const T = this._fetchNamespace(a);
            if (T) return T.trigger(f, v, b), !0;
          }
          return !1;
        }
        insertNode(a, f, v, b) {
          if (!_r(f)) return;
          const T = f[Nt];
          if (T && T.setForRemoval) {
            (T.setForRemoval = !1), (T.setForMove = !0);
            const O = this.collectedLeaveElements.indexOf(f);
            O >= 0 && this.collectedLeaveElements.splice(O, 1);
          }
          if (a) {
            const O = this._fetchNamespace(a);
            O && O.insertNode(f, v);
          }
          b && this.collectEnterElement(f);
        }
        collectEnterElement(a) {
          this.collectedEnterElements.push(a);
        }
        markElementAsDisabled(a, f) {
          f
            ? this.disabledNodes.has(a) || (this.disabledNodes.add(a), mn(a, Ne))
            : this.disabledNodes.has(a) && (this.disabledNodes.delete(a), Fr(a, Ne));
        }
        removeNode(a, f, v) {
          if (_r(f)) {
            const b = a ? this._fetchNamespace(a) : null;
            b ? b.removeNode(f, v) : this.markElementAsRemoved(a, f, !1, v);
            const T = this.namespacesByHostElement.get(f);
            T && T.id !== a && T.removeNode(f, v);
          } else this._onRemovalComplete(f, v);
        }
        markElementAsRemoved(a, f, v, b, T) {
          this.collectedLeaveElements.push(f),
            (f[Nt] = {
              namespaceId: a,
              setForRemoval: b,
              hasAnimation: v,
              removedBeforeQueried: !1,
              previousTriggersValues: T,
            });
        }
        listen(a, f, v, b, T) {
          return _r(f) ? this._fetchNamespace(a).listen(f, v, b, T) : () => {};
        }
        _buildInstruction(a, f, v, b, T) {
          return a.transition.build(
            this.driver,
            a.element,
            a.fromState.value,
            a.toState.value,
            v,
            b,
            a.fromState.options,
            a.toState.options,
            f,
            T
          );
        }
        destroyInnerAnimations(a) {
          let f = this.driver.query(a, mr, !0);
          f.forEach(v => this.destroyActiveAnimationsForElement(v)),
            0 != this.playersByQueriedElement.size &&
              ((f = this.driver.query(a, En, !0)),
              f.forEach(v => this.finishActiveQueriedAnimationOnElement(v)));
        }
        destroyActiveAnimationsForElement(a) {
          const f = this.playersByElement.get(a);
          f &&
            f.forEach(v => {
              v.queued ? (v.markedForDestroy = !0) : v.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(a) {
          const f = this.playersByQueriedElement.get(a);
          f && f.forEach(v => v.finish());
        }
        whenRenderingDone() {
          return new Promise(a => {
            if (this.players.length) return vt(this.players).onDone(() => a());
            a();
          });
        }
        processLeaveNode(a) {
          const f = a[Nt];
          if (f && f.setForRemoval) {
            if (((a[Nt] = bn), f.namespaceId)) {
              this.destroyInnerAnimations(a);
              const v = this._fetchNamespace(f.namespaceId);
              v && v.clearElementCache(a);
            }
            this._onRemovalComplete(a, f.setForRemoval);
          }
          a.classList?.contains(Ne) && this.markElementAsDisabled(a, !1),
            this.driver.query(a, '.ng-animate-disabled', !0).forEach(v => {
              this.markElementAsDisabled(v, !1);
            });
        }
        flush(a = -1) {
          let f = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((v, b) => this._balanceNamespaceList(v, b)),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let v = 0; v < this.collectedEnterElements.length; v++)
              mn(this.collectedEnterElements[v], 'ng-star-inserted');
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const v = [];
            try {
              f = this._flushAnimations(v, a);
            } finally {
              for (let b = 0; b < v.length; b++) v[b]();
            }
          } else
            for (let v = 0; v < this.collectedLeaveElements.length; v++)
              this.processLeaveNode(this.collectedLeaveElements[v]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach(v => v()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const v = this._whenQuietFns;
            (this._whenQuietFns = []),
              f.length
                ? vt(f).onDone(() => {
                    v.forEach(b => b());
                  })
                : v.forEach(b => b());
          }
        }
        reportError(a) {
          throw (function hn(w) {
            return new B.vHH(3402, !1);
          })();
        }
        _flushAnimations(a, f) {
          const v = new Un(),
            b = [],
            T = new Map(),
            O = [],
            k = new Map(),
            G = new Map(),
            ee = new Map(),
            Ae = new Set();
          this.disabledNodes.forEach(Ge => {
            Ae.add(Ge);
            const d = this.driver.query(Ge, '.ng-animate-queued', !0);
            for (let _ = 0; _ < d.length; _++) Ae.add(d[_]);
          });
          const Pe = this.bodyNode,
            bt = Array.from(this.statesByElement.keys()),
            ht = lr(bt, this.collectedEnterElements),
            Je = new Map();
          let ot = 0;
          ht.forEach((Ge, d) => {
            const _ = rr + ot++;
            Je.set(d, _), Ge.forEach(y => mn(y, _));
          });
          const qt = [],
            on = new Set(),
            cn = new Set();
          for (let Ge = 0; Ge < this.collectedLeaveElements.length; Ge++) {
            const d = this.collectedLeaveElements[Ge],
              _ = d[Nt];
            _ &&
              _.setForRemoval &&
              (qt.push(d),
              on.add(d),
              _.hasAnimation
                ? this.driver.query(d, '.ng-star-inserted', !0).forEach(y => on.add(y))
                : cn.add(d));
          }
          const Mn = new Map(),
            Dn = lr(bt, Array.from(on));
          Dn.forEach((Ge, d) => {
            const _ = qe + ot++;
            Mn.set(d, _), Ge.forEach(y => mn(y, _));
          }),
            a.push(() => {
              ht.forEach((Ge, d) => {
                const _ = Je.get(d);
                Ge.forEach(y => Fr(y, _));
              }),
                Dn.forEach((Ge, d) => {
                  const _ = Mn.get(d);
                  Ge.forEach(y => Fr(y, _));
                }),
                qt.forEach(Ge => {
                  this.processLeaveNode(Ge);
                });
            });
          const ni = [],
            fr = [];
          for (let Ge = this._namespaceList.length - 1; Ge >= 0; Ge--)
            this._namespaceList[Ge].drainQueuedTransitions(f).forEach(_ => {
              const y = _.player,
                C = _.element;
              if ((ni.push(y), this.collectedEnterElements.length)) {
                const st = C[Nt];
                if (st && st.setForMove) {
                  if (st.previousTriggersValues && st.previousTriggersValues.has(_.triggerName)) {
                    const ct = st.previousTriggersValues.get(_.triggerName),
                      Pt = this.statesByElement.get(_.element);
                    if (Pt && Pt.has(_.triggerName)) {
                      const jt = Pt.get(_.triggerName);
                      (jt.value = ct), Pt.set(_.triggerName, jt);
                    }
                  }
                  return void y.destroy();
                }
              }
              const R = !Pe || !this.driver.containsElement(Pe, C),
                W = Mn.get(C),
                de = Je.get(C),
                Me = this._buildInstruction(_, v, de, W, R);
              if (Me.errors && Me.errors.length) return void fr.push(Me);
              if (R)
                return (
                  y.onStart(() => L(C, Me.fromStyles)),
                  y.onDestroy(() => N(C, Me.toStyles)),
                  void b.push(y)
                );
              if (_.isFallbackTransition)
                return (
                  y.onStart(() => L(C, Me.fromStyles)),
                  y.onDestroy(() => N(C, Me.toStyles)),
                  void b.push(y)
                );
              const Ot = [];
              Me.timelines.forEach(st => {
                (st.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(st.element) || Ot.push(st);
              }),
                (Me.timelines = Ot),
                v.append(C, Me.timelines),
                O.push({ instruction: Me, player: y, element: C }),
                Me.queriedElements.forEach(st => Kt(k, st, []).push(y)),
                Me.preStyleProps.forEach((st, ct) => {
                  if (st.size) {
                    let Pt = G.get(ct);
                    Pt || G.set(ct, (Pt = new Set())), st.forEach((jt, Zt) => Pt.add(Zt));
                  }
                }),
                Me.postStyleProps.forEach((st, ct) => {
                  let Pt = ee.get(ct);
                  Pt || ee.set(ct, (Pt = new Set())), st.forEach((jt, Zt) => Pt.add(Zt));
                });
            });
          if (fr.length) {
            const Ge = [];
            fr.forEach(d => {
              Ge.push(
                (function Ut(w, a) {
                  return new B.vHH(3505, !1);
                })()
              );
            }),
              ni.forEach(d => d.destroy()),
              this.reportError(Ge);
          }
          const dn = new Map(),
            er = new Map();
          O.forEach(Ge => {
            const d = Ge.element;
            v.has(d) &&
              (er.set(d, d), this._beforeAnimationBuild(Ge.player.namespaceId, Ge.instruction, dn));
          }),
            b.forEach(Ge => {
              const d = Ge.element;
              this._getPreviousPlayers(d, !1, Ge.namespaceId, Ge.triggerName, null).forEach(y => {
                Kt(dn, d, []).push(y), y.destroy();
              });
            });
          const Vn = qt.filter(Ge => yi(Ge, G, ee)),
            Sr = new Map();
          ho(Sr, this.driver, cn, ee, se.l3).forEach(Ge => {
            yi(Ge, G, ee) && Vn.push(Ge);
          });
          const Xi = new Map();
          ht.forEach((Ge, d) => {
            ho(Xi, this.driver, new Set(Ge), G, se.k1);
          }),
            Vn.forEach(Ge => {
              const d = Sr.get(Ge),
                _ = Xi.get(Ge);
              Sr.set(Ge, new Map([...(d?.entries() ?? []), ...(_?.entries() ?? [])]));
            });
          const Ci = [],
            vo = [],
            Fi = {};
          O.forEach(Ge => {
            const { element: d, player: _, instruction: y } = Ge;
            if (v.has(d)) {
              if (Ae.has(d))
                return (
                  _.onDestroy(() => N(d, y.toStyles)),
                  (_.disabled = !0),
                  _.overrideTotalTime(y.totalTime),
                  void b.push(_)
                );
              let C = Fi;
              if (er.size > 1) {
                let W = d;
                const de = [];
                for (; (W = W.parentNode); ) {
                  const Me = er.get(W);
                  if (Me) {
                    C = Me;
                    break;
                  }
                  de.push(W);
                }
                de.forEach(Me => er.set(Me, C));
              }
              const R = this._buildAnimation(_.namespaceId, y, dn, T, Xi, Sr);
              if ((_.setRealPlayer(R), C === Fi)) Ci.push(_);
              else {
                const W = this.playersByElement.get(C);
                W && W.length && (_.parentPlayer = vt(W)), b.push(_);
              }
            } else
              L(d, y.fromStyles),
                _.onDestroy(() => N(d, y.toStyles)),
                vo.push(_),
                Ae.has(d) && b.push(_);
          }),
            vo.forEach(Ge => {
              const d = T.get(Ge.element);
              if (d && d.length) {
                const _ = vt(d);
                Ge.setRealPlayer(_);
              }
            }),
            b.forEach(Ge => {
              Ge.parentPlayer ? Ge.syncPlayerEvents(Ge.parentPlayer) : Ge.destroy();
            });
          for (let Ge = 0; Ge < qt.length; Ge++) {
            const d = qt[Ge],
              _ = d[Nt];
            if ((Fr(d, qe), _ && _.hasAnimation)) continue;
            let y = [];
            if (k.size) {
              let R = k.get(d);
              R && R.length && y.push(...R);
              let W = this.driver.query(d, En, !0);
              for (let de = 0; de < W.length; de++) {
                let Me = k.get(W[de]);
                Me && Me.length && y.push(...Me);
              }
            }
            const C = y.filter(R => !R.destroyed);
            C.length ? mi(this, d, C) : this.processLeaveNode(d);
          }
          return (
            (qt.length = 0),
            Ci.forEach(Ge => {
              this.players.push(Ge),
                Ge.onDone(() => {
                  Ge.destroy();
                  const d = this.players.indexOf(Ge);
                  this.players.splice(d, 1);
                }),
                Ge.play();
            }),
            Ci
          );
        }
        afterFlush(a) {
          this._flushFns.push(a);
        }
        afterFlushAnimationsDone(a) {
          this._whenQuietFns.push(a);
        }
        _getPreviousPlayers(a, f, v, b, T) {
          let O = [];
          if (f) {
            const k = this.playersByQueriedElement.get(a);
            k && (O = k);
          } else {
            const k = this.playersByElement.get(a);
            if (k) {
              const G = !T || T == Bn;
              k.forEach(ee => {
                ee.queued || (!G && ee.triggerName != b) || O.push(ee);
              });
            }
          }
          return (
            (v || b) &&
              (O = O.filter(k => !((v && v != k.namespaceId) || (b && b != k.triggerName)))),
            O
          );
        }
        _beforeAnimationBuild(a, f, v) {
          const T = f.element,
            O = f.isRemovalTransition ? void 0 : a,
            k = f.isRemovalTransition ? void 0 : f.triggerName;
          for (const G of f.timelines) {
            const ee = G.element,
              Ae = ee !== T,
              Pe = Kt(v, ee, []);
            this._getPreviousPlayers(ee, Ae, O, k, f.toState).forEach(ht => {
              const Je = ht.getRealPlayer();
              Je.beforeDestroy && Je.beforeDestroy(), ht.destroy(), Pe.push(ht);
            });
          }
          L(T, f.fromStyles);
        }
        _buildAnimation(a, f, v, b, T, O) {
          const k = f.triggerName,
            G = f.element,
            ee = [],
            Ae = new Set(),
            Pe = new Set(),
            bt = f.timelines.map(Je => {
              const ot = Je.element;
              Ae.add(ot);
              const qt = ot[Nt];
              if (qt && qt.removedBeforeQueried) return new se.ZN(Je.duration, Je.delay);
              const on = ot !== G,
                cn = (function wt(w) {
                  const a = [];
                  return Qo(w, a), a;
                })((v.get(ot) || Wr).map(dn => dn.getRealPlayer())).filter(
                  dn => !!dn.element && dn.element === ot
                ),
                Mn = T.get(ot),
                Dn = O.get(ot),
                ni = Ft(this._normalizer, Je.keyframes, Mn, Dn),
                fr = this._buildPlayer(Je, ni, cn);
              if ((Je.subTimeline && b && Pe.add(ot), on)) {
                const dn = new Cr(a, k, ot);
                dn.setRealPlayer(fr), ee.push(dn);
              }
              return fr;
            });
          ee.forEach(Je => {
            Kt(this.playersByQueriedElement, Je.element, []).push(Je),
              Je.onDone(() =>
                (function an(w, a, f) {
                  let v = w.get(a);
                  if (v) {
                    if (v.length) {
                      const b = v.indexOf(f);
                      v.splice(b, 1);
                    }
                    0 == v.length && w.delete(a);
                  }
                  return v;
                })(this.playersByQueriedElement, Je.element, Je)
              );
          }),
            Ae.forEach(Je => mn(Je, et));
          const ht = vt(bt);
          return (
            ht.onDestroy(() => {
              Ae.forEach(Je => Fr(Je, et)), N(G, f.toStyles);
            }),
            Pe.forEach(Je => {
              Kt(b, Je, []).push(ht);
            }),
            ht
          );
        }
        _buildPlayer(a, f, v) {
          return f.length > 0
            ? this.driver.animate(a.element, f, a.duration, a.delay, a.easing, v)
            : new se.ZN(a.duration, a.delay);
        }
      }
      class Cr {
        constructor(a, f, v) {
          (this.namespaceId = a),
            (this.triggerName = f),
            (this.element = v),
            (this._player = new se.ZN()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.parentPlayer = null),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(a) {
          this._containsRealPlayer ||
            ((this._player = a),
            this._queuedCallbacks.forEach((f, v) => {
              f.forEach(b => Ue(a, v, void 0, b));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(a.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(a) {
          this.totalTime = a;
        }
        syncPlayerEvents(a) {
          const f = this._player;
          f.triggerCallback && a.onStart(() => f.triggerCallback('start')),
            a.onDone(() => this.finish()),
            a.onDestroy(() => this.destroy());
        }
        _queueEvent(a, f) {
          Kt(this._queuedCallbacks, a, []).push(f);
        }
        onDone(a) {
          this.queued && this._queueEvent('done', a), this._player.onDone(a);
        }
        onStart(a) {
          this.queued && this._queueEvent('start', a), this._player.onStart(a);
        }
        onDestroy(a) {
          this.queued && this._queueEvent('destroy', a), this._player.onDestroy(a);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(a) {
          this.queued || this._player.setPosition(a);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(a) {
          const f = this._player;
          f.triggerCallback && f.triggerCallback(a);
        }
      }
      function _r(w) {
        return w && 1 === w.nodeType;
      }
      function ti(w, a) {
        const f = w.style.display;
        return (w.style.display = a ?? 'none'), f;
      }
      function ho(w, a, f, v, b) {
        const T = [];
        f.forEach(G => T.push(ti(G)));
        const O = [];
        v.forEach((G, ee) => {
          const Ae = new Map();
          G.forEach(Pe => {
            const bt = a.computeStyle(ee, Pe, b);
            Ae.set(Pe, bt), (!bt || 0 == bt.length) && ((ee[Nt] = xr), O.push(ee));
          }),
            w.set(ee, Ae);
        });
        let k = 0;
        return f.forEach(G => ti(G, T[k++])), O;
      }
      function lr(w, a) {
        const f = new Map();
        if ((w.forEach(k => f.set(k, [])), 0 == a.length)) return f;
        const b = new Set(a),
          T = new Map();
        function O(k) {
          if (!k) return 1;
          let G = T.get(k);
          if (G) return G;
          const ee = k.parentNode;
          return (G = f.has(ee) ? ee : b.has(ee) ? 1 : O(ee)), T.set(k, G), G;
        }
        return (
          a.forEach(k => {
            const G = O(k);
            1 !== G && f.get(G).push(k);
          }),
          f
        );
      }
      function mn(w, a) {
        w.classList?.add(a);
      }
      function Fr(w, a) {
        w.classList?.remove(a);
      }
      function mi(w, a, f) {
        vt(f).onDone(() => w.processLeaveNode(a));
      }
      function Qo(w, a) {
        for (let f = 0; f < w.length; f++) {
          const v = w[f];
          v instanceof se.ZE ? Qo(v.players, a) : a.push(v);
        }
      }
      function yi(w, a, f) {
        const v = f.get(w);
        if (!v) return !1;
        let b = a.get(w);
        return b ? v.forEach(T => b.add(T)) : a.set(w, v), f.delete(w), !0;
      }
      class tn {
        constructor(a, f, v) {
          (this.bodyNode = a),
            (this._driver = f),
            (this._normalizer = v),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (b, T) => {}),
            (this._transitionEngine = new Zi(a, f, v)),
            (this._timelineEngine = new qo(a, f, v)),
            (this._transitionEngine.onRemovalComplete = (b, T) => this.onRemovalComplete(b, T));
        }
        registerTrigger(a, f, v, b, T) {
          const O = a + '-' + b;
          let k = this._triggerCache[O];
          if (!k) {
            const G = [],
              Ae = wn(this._driver, T, G, []);
            if (G.length)
              throw (function Tr(w, a) {
                return new B.vHH(3404, !1);
              })();
            (k = (function zr(w, a, f) {
              return new jn(w, a, f);
            })(b, Ae, this._normalizer)),
              (this._triggerCache[O] = k);
          }
          this._transitionEngine.registerTrigger(f, b, k);
        }
        register(a, f) {
          this._transitionEngine.register(a, f);
        }
        destroy(a, f) {
          this._transitionEngine.destroy(a, f);
        }
        onInsert(a, f, v, b) {
          this._transitionEngine.insertNode(a, f, v, b);
        }
        onRemove(a, f, v) {
          this._transitionEngine.removeNode(a, f, v);
        }
        disableAnimations(a, f) {
          this._transitionEngine.markElementAsDisabled(a, f);
        }
        process(a, f, v, b) {
          if ('@' == v.charAt(0)) {
            const [T, O] = Jt(v);
            this._timelineEngine.command(T, f, O, b);
          } else this._transitionEngine.trigger(a, f, v, b);
        }
        listen(a, f, v, b, T) {
          if ('@' == v.charAt(0)) {
            const [O, k] = Jt(v);
            return this._timelineEngine.listen(O, f, k, T);
          }
          return this._transitionEngine.listen(a, f, v, b, T);
        }
        flush(a = -1) {
          this._transitionEngine.flush(a);
        }
        get players() {
          return [...this._transitionEngine.players, ...this._timelineEngine.players];
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
        afterFlushAnimationsDone(a) {
          this._transitionEngine.afterFlushAnimationsDone(a);
        }
      }
      let wr = (() => {
        class w {
          static #e = (this.initialStylesByElement = new WeakMap());
          constructor(f, v, b) {
            (this._element = f), (this._startStyles = v), (this._endStyles = b), (this._state = 0);
            let T = w.initialStylesByElement.get(f);
            T || w.initialStylesByElement.set(f, (T = new Map())), (this._initialStyles = T);
          }
          start() {
            this._state < 1 &&
              (this._startStyles && N(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (N(this._element, this._initialStyles),
                this._endStyles && (N(this._element, this._endStyles), (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (w.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (L(this._element, this._startStyles), (this._endStyles = null)),
                this._endStyles && (L(this._element, this._endStyles), (this._endStyles = null)),
                N(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return w;
      })();
      function vi(w) {
        let a = null;
        return (
          w.forEach((f, v) => {
            (function Sn(w) {
              return 'display' === w || 'position' === w;
            })(v) && ((a = a || new Map()), a.set(v, f));
          }),
          a
        );
      }
      class Ro {
        constructor(a, f, v, b) {
          (this.element = a),
            (this.keyframes = f),
            (this.options = v),
            (this._specialStyles = b),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = v.duration),
            (this._delay = v.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0), this._onDoneFns.forEach(a => a()), (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const a = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(this.element, a, this.options)),
            (this._finalKeyframe = a.length ? a[a.length - 1] : new Map());
          const f = () => this._onFinish();
          this.domPlayer.addEventListener('finish', f),
            this.onDestroy(() => {
              this.domPlayer.removeEventListener('finish', f);
            });
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(a) {
          const f = [];
          return (
            a.forEach(v => {
              f.push(Object.fromEntries(v));
            }),
            f
          );
        }
        _triggerWebAnimation(a, f, v) {
          return a.animate(this._convertKeyframesToObject(f), v);
        }
        onStart(a) {
          this._originalOnStartFns.push(a), this._onStartFns.push(a);
        }
        onDone(a) {
          this._originalOnDoneFns.push(a), this._onDoneFns.push(a);
        }
        onDestroy(a) {
          this._onDestroyFns.push(a);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach(a => a()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach(a => a()),
            (this._onDestroyFns = []));
        }
        setPosition(a) {
          void 0 === this.domPlayer && this.init(), (this.domPlayer.currentTime = a * this.time);
        }
        getPosition() {
          return +(this.domPlayer.currentTime ?? 0) / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const a = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((v, b) => {
              'offset' !== b && a.set(b, this._finished ? v : ge(this.element, b));
            }),
            (this.currentSnapshot = a);
        }
        triggerCallback(a) {
          const f = 'start' === a ? this._onStartFns : this._onDoneFns;
          f.forEach(v => v()), (f.length = 0);
        }
      }
      class Fn {
        validateStyleProperty(a) {
          return !0;
        }
        validateAnimatableStyleProperty(a) {
          return !0;
        }
        matchesElement(a, f) {
          return !1;
        }
        containsElement(a, f) {
          return nr(a, f);
        }
        getParentElement(a) {
          return dr(a);
        }
        query(a, f, v) {
          return Nn(a, f, v);
        }
        computeStyle(a, f, v) {
          return window.getComputedStyle(a)[f];
        }
        animate(a, f, v, b, T, O = []) {
          const G = { duration: v, delay: b, fill: 0 == b ? 'both' : 'forwards' };
          T && (G.easing = T);
          const ee = new Map(),
            Ae = O.filter(ht => ht instanceof Ro);
          (function x(w, a) {
            return 0 === w || 0 === a;
          })(v, b) &&
            Ae.forEach(ht => {
              ht.currentSnapshot.forEach((Je, ot) => ee.set(ot, Je));
            });
          let Pe = (function ci(w) {
            return w.length ? (w[0] instanceof Map ? w : w.map(a => Ii(a))) : [];
          })(f).map(ht => z(ht));
          Pe = (function F(w, a, f) {
            if (f.size && a.length) {
              let v = a[0],
                b = [];
              if (
                (f.forEach((T, O) => {
                  v.has(O) || b.push(O), v.set(O, T);
                }),
                b.length)
              )
                for (let T = 1; T < a.length; T++) {
                  let O = a[T];
                  b.forEach(k => O.set(k, ge(w, k)));
                }
            }
            return a;
          })(a, Pe, ee);
          const bt = (function Oi(w, a) {
            let f = null,
              v = null;
            return (
              Array.isArray(a) && a.length
                ? ((f = vi(a[0])), a.length > 1 && (v = vi(a[a.length - 1])))
                : a instanceof Map && (f = vi(a)),
              f || v ? new wr(w, f, v) : null
            );
          })(a, Pe);
          return new Ro(a, Pe, G, bt);
        }
      }
      var vn = M(6814);
      let go = (() => {
        class w extends se._j {
          constructor(f, v) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = f.createRenderer(v.body, {
                id: '0',
                encapsulation: B.ifc.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(f) {
            const v = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const b = Array.isArray(f) ? (0, se.vP)(f) : f;
            return Pn(this._renderer, null, v, 'register', [b]), new Yr(v, this._renderer);
          }
          static #e = (this.ɵfac = function (v) {
            return new (v || w)(B.LFG(B.FYo), B.LFG(vn.K0));
          });
          static #t = (this.ɵprov = B.Yz7({ token: w, factory: w.ɵfac }));
        }
        return w;
      })();
      class Yr extends se.LC {
        constructor(a, f) {
          super(), (this._id = a), (this._renderer = f);
        }
        create(a, f) {
          return new br(this._id, a, f || {}, this._renderer);
        }
      }
      class br {
        constructor(a, f, v, b) {
          (this.id = a),
            (this.element = f),
            (this._renderer = b),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command('create', v);
        }
        _listen(a, f) {
          return this._renderer.listen(this.element, `@@${this.id}:${a}`, f);
        }
        _command(a, ...f) {
          return Pn(this._renderer, this.element, this.id, a, f);
        }
        onDone(a) {
          this._listen('done', a);
        }
        onStart(a) {
          this._listen('start', a);
        }
        onDestroy(a) {
          this._listen('destroy', a);
        }
        init() {
          this._command('init');
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command('play'), (this._started = !0);
        }
        pause() {
          this._command('pause');
        }
        restart() {
          this._command('restart');
        }
        finish() {
          this._command('finish');
        }
        destroy() {
          this._command('destroy');
        }
        reset() {
          this._command('reset'), (this._started = !1);
        }
        setPosition(a) {
          this._command('setPosition', a);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function Pn(w, a, f, v, b) {
        return w.setProperty(a, `@@${f}:${v}`, b);
      }
      const Po = '@.disabled';
      let Wt = (() => {
        class w {
          constructor(f, v, b) {
            (this.delegate = f),
              (this.engine = v),
              (this._zone = b),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (v.onRemovalComplete = (T, O) => {
                const k = O?.parentNode(T);
                k && O.removeChild(k, T);
              });
          }
          createRenderer(f, v) {
            const T = this.delegate.createRenderer(f, v);
            if (!(f && v && v.data && v.data.animation)) {
              let Ae = this._rendererCache.get(T);
              return (
                Ae ||
                  ((Ae = new xi('', T, this.engine, () => this._rendererCache.delete(T))),
                  this._rendererCache.set(T, Ae)),
                Ae
              );
            }
            const O = v.id,
              k = v.id + '-' + this._currentId;
            this._currentId++, this.engine.register(k, f);
            const G = Ae => {
              Array.isArray(Ae) ? Ae.forEach(G) : this.engine.registerTrigger(O, k, f, Ae.name, Ae);
            };
            return v.data.animation.forEach(G), new Zo(this, k, T, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            queueMicrotask(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(f, v, b) {
            f >= 0 && f < this._microtaskId
              ? this._zone.run(() => v(b))
              : (0 == this._animationCallbacksBuffer.length &&
                  queueMicrotask(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach(T => {
                        const [O, k] = T;
                        O(k);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([v, b]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(), this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
          static #e = (this.ɵfac = function (v) {
            return new (v || w)(B.LFG(B.FYo), B.LFG(tn), B.LFG(B.R0b));
          });
          static #t = (this.ɵprov = B.Yz7({ token: w, factory: w.ɵfac }));
        }
        return w;
      })();
      class xi {
        constructor(a, f, v, b) {
          (this.namespaceId = a), (this.delegate = f), (this.engine = v), (this._onDestroy = b);
        }
        get data() {
          return this.delegate.data;
        }
        destroyNode(a) {
          this.delegate.destroyNode?.(a);
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.engine.afterFlushAnimationsDone(() => {
              queueMicrotask(() => {
                this.delegate.destroy();
              });
            }),
            this._onDestroy?.();
        }
        createElement(a, f) {
          return this.delegate.createElement(a, f);
        }
        createComment(a) {
          return this.delegate.createComment(a);
        }
        createText(a) {
          return this.delegate.createText(a);
        }
        appendChild(a, f) {
          this.delegate.appendChild(a, f), this.engine.onInsert(this.namespaceId, f, a, !1);
        }
        insertBefore(a, f, v, b = !0) {
          this.delegate.insertBefore(a, f, v), this.engine.onInsert(this.namespaceId, f, a, b);
        }
        removeChild(a, f, v) {
          this.engine.onRemove(this.namespaceId, f, this.delegate);
        }
        selectRootElement(a, f) {
          return this.delegate.selectRootElement(a, f);
        }
        parentNode(a) {
          return this.delegate.parentNode(a);
        }
        nextSibling(a) {
          return this.delegate.nextSibling(a);
        }
        setAttribute(a, f, v, b) {
          this.delegate.setAttribute(a, f, v, b);
        }
        removeAttribute(a, f, v) {
          this.delegate.removeAttribute(a, f, v);
        }
        addClass(a, f) {
          this.delegate.addClass(a, f);
        }
        removeClass(a, f) {
          this.delegate.removeClass(a, f);
        }
        setStyle(a, f, v, b) {
          this.delegate.setStyle(a, f, v, b);
        }
        removeStyle(a, f, v) {
          this.delegate.removeStyle(a, f, v);
        }
        setProperty(a, f, v) {
          '@' == f.charAt(0) && f == Po
            ? this.disableAnimations(a, !!v)
            : this.delegate.setProperty(a, f, v);
        }
        setValue(a, f) {
          this.delegate.setValue(a, f);
        }
        listen(a, f, v) {
          return this.delegate.listen(a, f, v);
        }
        disableAnimations(a, f) {
          this.engine.disableAnimations(a, f);
        }
      }
      class Zo extends xi {
        constructor(a, f, v, b, T) {
          super(f, v, b, T), (this.factory = a), (this.namespaceId = f);
        }
        setProperty(a, f, v) {
          '@' == f.charAt(0)
            ? '.' == f.charAt(1) && f == Po
              ? this.disableAnimations(a, (v = void 0 === v || !!v))
              : this.engine.process(this.namespaceId, a, f.slice(1), v)
            : this.delegate.setProperty(a, f, v);
        }
        listen(a, f, v) {
          if ('@' == f.charAt(0)) {
            const b = (function Xo(w) {
              switch (w) {
                case 'body':
                  return document.body;
                case 'document':
                  return document;
                case 'window':
                  return window;
                default:
                  return w;
              }
            })(a);
            let T = f.slice(1),
              O = '';
            return (
              '@' != T.charAt(0) &&
                ([T, O] = (function $s(w) {
                  const a = w.indexOf('.');
                  return [w.substring(0, a), w.slice(a + 1)];
                })(T)),
              this.engine.listen(this.namespaceId, b, T, O, k => {
                this.factory.scheduleListenerCallback(k._data || -1, v, k);
              })
            );
          }
          return this.delegate.listen(a, f, v);
        }
      }
      const Jo = [
          { provide: se._j, useClass: go },
          {
            provide: Ri,
            useFactory: function zs() {
              return new uo();
            },
          },
          {
            provide: tn,
            useClass: (() => {
              class w extends tn {
                constructor(f, v, b, T) {
                  super(f.body, v, b);
                }
                ngOnDestroy() {
                  this.flush();
                }
                static #e = (this.ɵfac = function (v) {
                  return new (v || w)(B.LFG(vn.K0), B.LFG(Pr), B.LFG(Ri), B.LFG(B.z2F));
                });
                static #t = (this.ɵprov = B.Yz7({ token: w, factory: w.ɵfac }));
              }
              return w;
            })(),
          },
          {
            provide: B.FYo,
            useFactory: function Gs(w, a, f) {
              return new Wt(w, a, f);
            },
            deps: [m.se, tn, B.R0b],
          },
        ],
        No = [
          { provide: Pr, useFactory: () => new Fn() },
          { provide: B.QbO, useValue: 'BrowserAnimations' },
          ...Jo,
        ],
        Oo = [{ provide: Pr, useClass: Ze }, { provide: B.QbO, useValue: 'NoopAnimations' }, ...Jo];
      let mo = (() => {
          class w {
            static withConfig(f) {
              return { ngModule: w, providers: f.disableAnimations ? Oo : No };
            }
            static #e = (this.ɵfac = function (v) {
              return new (v || w)();
            });
            static #t = (this.ɵmod = B.oAB({ type: w }));
            static #n = (this.ɵinj = B.cJS({ providers: No, imports: [m.b2] }));
          }
          return w;
        })(),
        yo = (() => {
          class w {
            static #e = (this.ɵfac = function (v) {
              return new (v || w)();
            });
            static #t = (this.ɵmod = B.oAB({ type: w, bootstrap: [pe] }));
            static #n = (this.ɵinj = B.cJS({ imports: [m.b2, Q, U.Bz, Te.JF, mo, q.ef] }));
          }
          return w;
        })();
      m.q6()
        .bootstrapModule(yo)
        .catch(w => console.error(w));
    },
    5619: (We, fe, M) => {
      M.d(fe, { X: () => U });
      var m = M(8645);
      class U extends m.x {
        constructor(ie) {
          super(), (this._value = ie);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(ie) {
          const Q = super._subscribe(ie);
          return !Q.closed && ie.next(this._value), Q;
        }
        getValue() {
          const { hasError: ie, thrownError: Q, _value: q } = this;
          if (ie) throw Q;
          return this._throwIfClosed(), q;
        }
        next(ie) {
          super.next((this._value = ie));
        }
      }
    },
    5592: (We, fe, M) => {
      M.d(fe, { y: () => Te });
      var m = M(305),
        U = M(7394),
        B = M(4850),
        ie = M(8407),
        Q = M(2653),
        q = M(4674),
        pe = M(1441);
      let Te = (() => {
        class Ce {
          constructor(Re) {
            Re && (this._subscribe = Re);
          }
          lift(Re) {
            const $e = new Ce();
            return ($e.source = this), ($e.operator = Re), $e;
          }
          subscribe(Re, $e, Et) {
            const Le = (function te(Ce) {
              return (
                (Ce && Ce instanceof m.Lv) ||
                ((function ye(Ce) {
                  return Ce && (0, q.m)(Ce.next) && (0, q.m)(Ce.error) && (0, q.m)(Ce.complete);
                })(Ce) &&
                  (0, U.Nn)(Ce))
              );
            })(Re)
              ? Re
              : new m.Hp(Re, $e, Et);
            return (
              (0, pe.x)(() => {
                const { operator: lt, source: tt } = this;
                Le.add(lt ? lt.call(Le, tt) : tt ? this._subscribe(Le) : this._trySubscribe(Le));
              }),
              Le
            );
          }
          _trySubscribe(Re) {
            try {
              return this._subscribe(Re);
            } catch ($e) {
              Re.error($e);
            }
          }
          forEach(Re, $e) {
            return new ($e = se($e))((Et, Le) => {
              const lt = new m.Hp({
                next: tt => {
                  try {
                    Re(tt);
                  } catch (Ke) {
                    Le(Ke), lt.unsubscribe();
                  }
                },
                error: Le,
                complete: Et,
              });
              this.subscribe(lt);
            });
          }
          _subscribe(Re) {
            var $e;
            return null === ($e = this.source) || void 0 === $e ? void 0 : $e.subscribe(Re);
          }
          [B.L]() {
            return this;
          }
          pipe(...Re) {
            return (0, ie.U)(Re)(this);
          }
          toPromise(Re) {
            return new (Re = se(Re))(($e, Et) => {
              let Le;
              this.subscribe(
                lt => (Le = lt),
                lt => Et(lt),
                () => $e(Le)
              );
            });
          }
        }
        return (Ce.create = He => new Ce(He)), Ce;
      })();
      function se(Ce) {
        var He;
        return null !== (He = Ce ?? Q.config.Promise) && void 0 !== He ? He : Promise;
      }
    },
    8645: (We, fe, M) => {
      M.d(fe, { x: () => pe });
      var m = M(5592),
        U = M(7394);
      const ie = (0, M(2306).d)(
        se =>
          function () {
            se(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed');
          }
      );
      var Q = M(9039),
        q = M(1441);
      let pe = (() => {
        class se extends m.y {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(te) {
            const Ce = new Te(this, this);
            return (Ce.operator = te), Ce;
          }
          _throwIfClosed() {
            if (this.closed) throw new ie();
          }
          next(te) {
            (0, q.x)(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                for (const Ce of this.currentObservers) Ce.next(te);
              }
            });
          }
          error(te) {
            (0, q.x)(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = te);
                const { observers: Ce } = this;
                for (; Ce.length; ) Ce.shift().error(te);
              }
            });
          }
          complete() {
            (0, q.x)(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: te } = this;
                for (; te.length; ) te.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0), (this.observers = this.currentObservers = null);
          }
          get observed() {
            var te;
            return (null === (te = this.observers) || void 0 === te ? void 0 : te.length) > 0;
          }
          _trySubscribe(te) {
            return this._throwIfClosed(), super._trySubscribe(te);
          }
          _subscribe(te) {
            return (
              this._throwIfClosed(), this._checkFinalizedStatuses(te), this._innerSubscribe(te)
            );
          }
          _innerSubscribe(te) {
            const { hasError: Ce, isStopped: He, observers: Re } = this;
            return Ce || He
              ? U.Lc
              : ((this.currentObservers = null),
                Re.push(te),
                new U.w0(() => {
                  (this.currentObservers = null), (0, Q.P)(Re, te);
                }));
          }
          _checkFinalizedStatuses(te) {
            const { hasError: Ce, thrownError: He, isStopped: Re } = this;
            Ce ? te.error(He) : Re && te.complete();
          }
          asObservable() {
            const te = new m.y();
            return (te.source = this), te;
          }
        }
        return (se.create = (ye, te) => new Te(ye, te)), se;
      })();
      class Te extends pe {
        constructor(ye, te) {
          super(), (this.destination = ye), (this.source = te);
        }
        next(ye) {
          var te, Ce;
          null === (Ce = null === (te = this.destination) || void 0 === te ? void 0 : te.next) ||
            void 0 === Ce ||
            Ce.call(te, ye);
        }
        error(ye) {
          var te, Ce;
          null === (Ce = null === (te = this.destination) || void 0 === te ? void 0 : te.error) ||
            void 0 === Ce ||
            Ce.call(te, ye);
        }
        complete() {
          var ye, te;
          null ===
            (te = null === (ye = this.destination) || void 0 === ye ? void 0 : ye.complete) ||
            void 0 === te ||
            te.call(ye);
        }
        _subscribe(ye) {
          var te, Ce;
          return null !==
            (Ce = null === (te = this.source) || void 0 === te ? void 0 : te.subscribe(ye)) &&
            void 0 !== Ce
            ? Ce
            : U.Lc;
        }
      }
    },
    305: (We, fe, M) => {
      M.d(fe, { Hp: () => Et, Lv: () => Ce });
      var m = M(4674),
        U = M(7394),
        B = M(2653),
        ie = M(3894),
        Q = M(2420);
      const q = se('C', void 0, void 0);
      function se(K, ve, he) {
        return { kind: K, value: ve, error: he };
      }
      var ye = M(7599),
        te = M(1441);
      class Ce extends U.w0 {
        constructor(ve) {
          super(),
            (this.isStopped = !1),
            ve ? ((this.destination = ve), (0, U.Nn)(ve) && ve.add(this)) : (this.destination = Ke);
        }
        static create(ve, he, Ie) {
          return new Et(ve, he, Ie);
        }
        next(ve) {
          this.isStopped
            ? tt(
                (function Te(K) {
                  return se('N', K, void 0);
                })(ve),
                this
              )
            : this._next(ve);
        }
        error(ve) {
          this.isStopped
            ? tt(
                (function pe(K) {
                  return se('E', void 0, K);
                })(ve),
                this
              )
            : ((this.isStopped = !0), this._error(ve));
        }
        complete() {
          this.isStopped ? tt(q, this) : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
        }
        _next(ve) {
          this.destination.next(ve);
        }
        _error(ve) {
          try {
            this.destination.error(ve);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const He = Function.prototype.bind;
      function Re(K, ve) {
        return He.call(K, ve);
      }
      class $e {
        constructor(ve) {
          this.partialObserver = ve;
        }
        next(ve) {
          const { partialObserver: he } = this;
          if (he.next)
            try {
              he.next(ve);
            } catch (Ie) {
              Le(Ie);
            }
        }
        error(ve) {
          const { partialObserver: he } = this;
          if (he.error)
            try {
              he.error(ve);
            } catch (Ie) {
              Le(Ie);
            }
          else Le(ve);
        }
        complete() {
          const { partialObserver: ve } = this;
          if (ve.complete)
            try {
              ve.complete();
            } catch (he) {
              Le(he);
            }
        }
      }
      class Et extends Ce {
        constructor(ve, he, Ie) {
          let we;
          if ((super(), (0, m.m)(ve) || !ve))
            we = { next: ve ?? void 0, error: he ?? void 0, complete: Ie ?? void 0 };
          else {
            let X;
            this && B.config.useDeprecatedNextContext
              ? ((X = Object.create(ve)),
                (X.unsubscribe = () => this.unsubscribe()),
                (we = {
                  next: ve.next && Re(ve.next, X),
                  error: ve.error && Re(ve.error, X),
                  complete: ve.complete && Re(ve.complete, X),
                }))
              : (we = ve);
          }
          this.destination = new $e(we);
        }
      }
      function Le(K) {
        B.config.useDeprecatedSynchronousErrorHandling ? (0, te.O)(K) : (0, ie.h)(K);
      }
      function tt(K, ve) {
        const { onStoppedNotification: he } = B.config;
        he && ye.z.setTimeout(() => he(K, ve));
      }
      const Ke = {
        closed: !0,
        next: Q.Z,
        error: function lt(K) {
          throw K;
        },
        complete: Q.Z,
      };
    },
    7394: (We, fe, M) => {
      M.d(fe, { Lc: () => q, w0: () => Q, Nn: () => pe });
      var m = M(4674);
      const B = (0, M(2306).d)(
        se =>
          function (te) {
            se(this),
              (this.message = te
                ? `${te.length} errors occurred during unsubscription:\n${te.map((Ce, He) => `${He + 1}) ${Ce.toString()}`).join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = te);
          }
      );
      var ie = M(9039);
      class Q {
        constructor(ye) {
          (this.initialTeardown = ye),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let ye;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: te } = this;
            if (te)
              if (((this._parentage = null), Array.isArray(te)))
                for (const Re of te) Re.remove(this);
              else te.remove(this);
            const { initialTeardown: Ce } = this;
            if ((0, m.m)(Ce))
              try {
                Ce();
              } catch (Re) {
                ye = Re instanceof B ? Re.errors : [Re];
              }
            const { _finalizers: He } = this;
            if (He) {
              this._finalizers = null;
              for (const Re of He)
                try {
                  Te(Re);
                } catch ($e) {
                  (ye = ye ?? []), $e instanceof B ? (ye = [...ye, ...$e.errors]) : ye.push($e);
                }
            }
            if (ye) throw new B(ye);
          }
        }
        add(ye) {
          var te;
          if (ye && ye !== this)
            if (this.closed) Te(ye);
            else {
              if (ye instanceof Q) {
                if (ye.closed || ye._hasParent(this)) return;
                ye._addParent(this);
              }
              (this._finalizers = null !== (te = this._finalizers) && void 0 !== te ? te : []).push(
                ye
              );
            }
        }
        _hasParent(ye) {
          const { _parentage: te } = this;
          return te === ye || (Array.isArray(te) && te.includes(ye));
        }
        _addParent(ye) {
          const { _parentage: te } = this;
          this._parentage = Array.isArray(te) ? (te.push(ye), te) : te ? [te, ye] : ye;
        }
        _removeParent(ye) {
          const { _parentage: te } = this;
          te === ye ? (this._parentage = null) : Array.isArray(te) && (0, ie.P)(te, ye);
        }
        remove(ye) {
          const { _finalizers: te } = this;
          te && (0, ie.P)(te, ye), ye instanceof Q && ye._removeParent(this);
        }
      }
      Q.EMPTY = (() => {
        const se = new Q();
        return (se.closed = !0), se;
      })();
      const q = Q.EMPTY;
      function pe(se) {
        return (
          se instanceof Q ||
          (se &&
            'closed' in se &&
            (0, m.m)(se.remove) &&
            (0, m.m)(se.add) &&
            (0, m.m)(se.unsubscribe))
        );
      }
      function Te(se) {
        (0, m.m)(se) ? se() : se.unsubscribe();
      }
    },
    2653: (We, fe, M) => {
      M.d(fe, { config: () => m });
      const m = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: void 0,
        useDeprecatedSynchronousErrorHandling: !1,
        useDeprecatedNextContext: !1,
      };
    },
    5211: (We, fe, M) => {
      M.d(fe, { z: () => Q });
      var m = M(7537),
        B = M(9940),
        ie = M(7715);
      function Q(...q) {
        return (function U() {
          return (0, m.J)(1);
        })()((0, ie.D)(q, (0, B.yG)(q)));
      }
    },
    6232: (We, fe, M) => {
      M.d(fe, { E: () => U });
      const U = new (M(5592).y)(Q => Q.complete());
    },
    7715: (We, fe, M) => {
      M.d(fe, { D: () => Ie });
      var m = M(4829),
        U = M(7103),
        B = M(9360),
        ie = M(8251);
      function Q(we, X = 0) {
        return (0, B.e)((Se, ne) => {
          Se.subscribe(
            (0, ie.x)(
              ne,
              yt => (0, U.f)(ne, we, () => ne.next(yt), X),
              () => (0, U.f)(ne, we, () => ne.complete(), X),
              yt => (0, U.f)(ne, we, () => ne.error(yt), X)
            )
          );
        });
      }
      function q(we, X = 0) {
        return (0, B.e)((Se, ne) => {
          ne.add(we.schedule(() => Se.subscribe(ne), X));
        });
      }
      var se = M(5592),
        te = M(4971),
        Ce = M(4674);
      function Re(we, X) {
        if (!we) throw new Error('Iterable cannot be null');
        return new se.y(Se => {
          (0, U.f)(Se, X, () => {
            const ne = we[Symbol.asyncIterator]();
            (0, U.f)(
              Se,
              X,
              () => {
                ne.next().then(yt => {
                  yt.done ? Se.complete() : Se.next(yt.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      var $e = M(8382),
        Et = M(4026),
        Le = M(4266),
        lt = M(3664),
        tt = M(5726),
        Ke = M(9853),
        K = M(541);
      function Ie(we, X) {
        return X
          ? (function he(we, X) {
              if (null != we) {
                if ((0, $e.c)(we))
                  return (function pe(we, X) {
                    return (0, m.Xf)(we).pipe(q(X), Q(X));
                  })(we, X);
                if ((0, Le.z)(we))
                  return (function ye(we, X) {
                    return new se.y(Se => {
                      let ne = 0;
                      return X.schedule(function () {
                        ne === we.length
                          ? Se.complete()
                          : (Se.next(we[ne++]), Se.closed || this.schedule());
                      });
                    });
                  })(we, X);
                if ((0, Et.t)(we))
                  return (function Te(we, X) {
                    return (0, m.Xf)(we).pipe(q(X), Q(X));
                  })(we, X);
                if ((0, tt.D)(we)) return Re(we, X);
                if ((0, lt.T)(we))
                  return (function He(we, X) {
                    return new se.y(Se => {
                      let ne;
                      return (
                        (0, U.f)(Se, X, () => {
                          (ne = we[te.h]()),
                            (0, U.f)(
                              Se,
                              X,
                              () => {
                                let yt, ke;
                                try {
                                  ({ value: yt, done: ke } = ne.next());
                                } catch (Ve) {
                                  return void Se.error(Ve);
                                }
                                ke ? Se.complete() : Se.next(yt);
                              },
                              0,
                              !0
                            );
                        }),
                        () => (0, Ce.m)(ne?.return) && ne.return()
                      );
                    });
                  })(we, X);
                if ((0, K.L)(we))
                  return (function ve(we, X) {
                    return Re((0, K.Q)(we), X);
                  })(we, X);
              }
              throw (0, Ke.z)(we);
            })(we, X)
          : (0, m.Xf)(we);
      }
    },
    4829: (We, fe, M) => {
      M.d(fe, { Xf: () => He });
      var m = M(7582),
        U = M(4266),
        B = M(4026),
        ie = M(5592),
        Q = M(8382),
        q = M(5726),
        pe = M(9853),
        Te = M(3664),
        se = M(541),
        ye = M(4674),
        te = M(3894),
        Ce = M(4850);
      function He(K) {
        if (K instanceof ie.y) return K;
        if (null != K) {
          if ((0, Q.c)(K))
            return (function Re(K) {
              return new ie.y(ve => {
                const he = K[Ce.L]();
                if ((0, ye.m)(he.subscribe)) return he.subscribe(ve);
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                );
              });
            })(K);
          if ((0, U.z)(K))
            return (function $e(K) {
              return new ie.y(ve => {
                for (let he = 0; he < K.length && !ve.closed; he++) ve.next(K[he]);
                ve.complete();
              });
            })(K);
          if ((0, B.t)(K))
            return (function Et(K) {
              return new ie.y(ve => {
                K.then(
                  he => {
                    ve.closed || (ve.next(he), ve.complete());
                  },
                  he => ve.error(he)
                ).then(null, te.h);
              });
            })(K);
          if ((0, q.D)(K)) return lt(K);
          if ((0, Te.T)(K))
            return (function Le(K) {
              return new ie.y(ve => {
                for (const he of K) if ((ve.next(he), ve.closed)) return;
                ve.complete();
              });
            })(K);
          if ((0, se.L)(K))
            return (function tt(K) {
              return lt((0, se.Q)(K));
            })(K);
        }
        throw (0, pe.z)(K);
      }
      function lt(K) {
        return new ie.y(ve => {
          (function Ke(K, ve) {
            var he, Ie, we, X;
            return (0, m.mG)(this, void 0, void 0, function* () {
              try {
                for (he = (0, m.KL)(K); !(Ie = yield he.next()).done; )
                  if ((ve.next(Ie.value), ve.closed)) return;
              } catch (Se) {
                we = { error: Se };
              } finally {
                try {
                  Ie && !Ie.done && (X = he.return) && (yield X.call(he));
                } finally {
                  if (we) throw we.error;
                }
              }
              ve.complete();
            });
          })(K, ve).catch(he => ve.error(he));
        });
      }
    },
    3019: (We, fe, M) => {
      M.d(fe, { T: () => q });
      var m = M(7537),
        U = M(4829),
        B = M(6232),
        ie = M(9940),
        Q = M(7715);
      function q(...pe) {
        const Te = (0, ie.yG)(pe),
          se = (0, ie._6)(pe, 1 / 0),
          ye = pe;
        return ye.length
          ? 1 === ye.length
            ? (0, U.Xf)(ye[0])
            : (0, m.J)(se)((0, Q.D)(ye, Te))
          : B.E;
      }
    },
    2096: (We, fe, M) => {
      M.d(fe, { of: () => B });
      var m = M(9940),
        U = M(7715);
      function B(...ie) {
        const Q = (0, m.yG)(ie);
        return (0, U.D)(ie, Q);
      }
    },
    8251: (We, fe, M) => {
      M.d(fe, { x: () => U });
      var m = M(305);
      function U(ie, Q, q, pe, Te) {
        return new B(ie, Q, q, pe, Te);
      }
      class B extends m.Lv {
        constructor(Q, q, pe, Te, se, ye) {
          super(Q),
            (this.onFinalize = se),
            (this.shouldUnsubscribe = ye),
            (this._next = q
              ? function (te) {
                  try {
                    q(te);
                  } catch (Ce) {
                    Q.error(Ce);
                  }
                }
              : super._next),
            (this._error = Te
              ? function (te) {
                  try {
                    Te(te);
                  } catch (Ce) {
                    Q.error(Ce);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = pe
              ? function () {
                  try {
                    pe();
                  } catch (te) {
                    Q.error(te);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var Q;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: q } = this;
            super.unsubscribe(),
              !q && (null === (Q = this.onFinalize) || void 0 === Q || Q.call(this));
          }
        }
      }
    },
    6328: (We, fe, M) => {
      M.d(fe, { b: () => B });
      var m = M(1631),
        U = M(4674);
      function B(ie, Q) {
        return (0, U.m)(Q) ? (0, m.z)(ie, Q, 1) : (0, m.z)(ie, 1);
      }
    },
    3572: (We, fe, M) => {
      M.d(fe, { d: () => B });
      var m = M(9360),
        U = M(8251);
      function B(ie) {
        return (0, m.e)((Q, q) => {
          let pe = !1;
          Q.subscribe(
            (0, U.x)(
              q,
              Te => {
                (pe = !0), q.next(Te);
              },
              () => {
                pe || q.next(ie), q.complete();
              }
            )
          );
        });
      }
    },
    2181: (We, fe, M) => {
      M.d(fe, { h: () => B });
      var m = M(9360),
        U = M(8251);
      function B(ie, Q) {
        return (0, m.e)((q, pe) => {
          let Te = 0;
          q.subscribe((0, U.x)(pe, se => ie.call(Q, se, Te++) && pe.next(se)));
        });
      }
    },
    4716: (We, fe, M) => {
      M.d(fe, { x: () => U });
      var m = M(9360);
      function U(B) {
        return (0, m.e)((ie, Q) => {
          try {
            ie.subscribe(Q);
          } finally {
            Q.add(B);
          }
        });
      }
    },
    1374: (We, fe, M) => {
      M.d(fe, { P: () => pe });
      var m = M(6973),
        U = M(2181),
        B = M(8180),
        ie = M(3572),
        Q = M(3026),
        q = M(2737);
      function pe(Te, se) {
        const ye = arguments.length >= 2;
        return te =>
          te.pipe(
            Te ? (0, U.h)((Ce, He) => Te(Ce, He, te)) : q.y,
            (0, B.q)(1),
            ye ? (0, ie.d)(se) : (0, Q.T)(() => new m.K())
          );
      }
    },
    7398: (We, fe, M) => {
      M.d(fe, { U: () => B });
      var m = M(9360),
        U = M(8251);
      function B(ie, Q) {
        return (0, m.e)((q, pe) => {
          let Te = 0;
          q.subscribe(
            (0, U.x)(pe, se => {
              pe.next(ie.call(Q, se, Te++));
            })
          );
        });
      }
    },
    975: (We, fe, M) => {
      M.d(fe, { h: () => U });
      var m = M(7398);
      function U(B) {
        return (0, m.U)(() => B);
      }
    },
    7537: (We, fe, M) => {
      M.d(fe, { J: () => B });
      var m = M(1631),
        U = M(2737);
      function B(ie = 1 / 0) {
        return (0, m.z)(U.y, ie);
      }
    },
    1631: (We, fe, M) => {
      M.d(fe, { z: () => Te });
      var m = M(7398),
        U = M(4829),
        B = M(9360),
        ie = M(7103),
        Q = M(8251),
        pe = M(4674);
      function Te(se, ye, te = 1 / 0) {
        return (0, pe.m)(ye)
          ? Te((Ce, He) => (0, m.U)((Re, $e) => ye(Ce, Re, He, $e))((0, U.Xf)(se(Ce, He))), te)
          : ('number' == typeof ye && (te = ye),
            (0, B.e)((Ce, He) =>
              (function q(se, ye, te, Ce, He, Re, $e, Et) {
                const Le = [];
                let lt = 0,
                  tt = 0,
                  Ke = !1;
                const K = () => {
                    Ke && !Le.length && !lt && ye.complete();
                  },
                  ve = Ie => (lt < Ce ? he(Ie) : Le.push(Ie)),
                  he = Ie => {
                    Re && ye.next(Ie), lt++;
                    let we = !1;
                    (0, U.Xf)(te(Ie, tt++)).subscribe(
                      (0, Q.x)(
                        ye,
                        X => {
                          He?.(X), Re ? ve(X) : ye.next(X);
                        },
                        () => {
                          we = !0;
                        },
                        void 0,
                        () => {
                          if (we)
                            try {
                              for (lt--; Le.length && lt < Ce; ) {
                                const X = Le.shift();
                                $e ? (0, ie.f)(ye, $e, () => he(X)) : he(X);
                              }
                              K();
                            } catch (X) {
                              ye.error(X);
                            }
                        }
                      )
                    );
                  };
                return (
                  se.subscribe(
                    (0, Q.x)(ye, ve, () => {
                      (Ke = !0), K();
                    })
                  ),
                  () => {
                    Et?.();
                  }
                );
              })(Ce, He, se, te)
            ));
      }
    },
    9732: (We, fe, M) => {
      M.d(fe, { U: () => U });
      var m = M(8251);
      function U(B, ie, Q, q, pe) {
        return (Te, se) => {
          let ye = Q,
            te = ie,
            Ce = 0;
          Te.subscribe(
            (0, m.x)(
              se,
              He => {
                const Re = Ce++;
                (te = ye ? B(te, He, Re) : ((ye = !0), He)), q && se.next(te);
              },
              pe &&
                (() => {
                  ye && se.next(te), se.complete();
                })
            )
          );
        };
      }
    },
    4664: (We, fe, M) => {
      M.d(fe, { w: () => ie });
      var m = M(4829),
        U = M(9360),
        B = M(8251);
      function ie(Q, q) {
        return (0, U.e)((pe, Te) => {
          let se = null,
            ye = 0,
            te = !1;
          const Ce = () => te && !se && Te.complete();
          pe.subscribe(
            (0, B.x)(
              Te,
              He => {
                se?.unsubscribe();
                let Re = 0;
                const $e = ye++;
                (0, m.Xf)(Q(He, $e)).subscribe(
                  (se = (0, B.x)(
                    Te,
                    Et => Te.next(q ? q(He, Et, $e, Re++) : Et),
                    () => {
                      (se = null), Ce();
                    }
                  ))
                );
              },
              () => {
                (te = !0), Ce();
              }
            )
          );
        });
      }
    },
    8180: (We, fe, M) => {
      M.d(fe, { q: () => ie });
      var m = M(6232),
        U = M(9360),
        B = M(8251);
      function ie(Q) {
        return Q <= 0
          ? () => m.E
          : (0, U.e)((q, pe) => {
              let Te = 0;
              q.subscribe(
                (0, B.x)(pe, se => {
                  ++Te <= Q && (pe.next(se), Q <= Te && pe.complete());
                })
              );
            });
      }
    },
    9773: (We, fe, M) => {
      M.d(fe, { R: () => Q });
      var m = M(9360),
        U = M(8251),
        B = M(4829),
        ie = M(2420);
      function Q(q) {
        return (0, m.e)((pe, Te) => {
          (0, B.Xf)(q).subscribe((0, U.x)(Te, () => Te.complete(), ie.Z)),
            !Te.closed && pe.subscribe(Te);
        });
      }
    },
    9397: (We, fe, M) => {
      M.d(fe, { b: () => Q });
      var m = M(4674),
        U = M(9360),
        B = M(8251),
        ie = M(2737);
      function Q(q, pe, Te) {
        const se = (0, m.m)(q) || pe || Te ? { next: q, error: pe, complete: Te } : q;
        return se
          ? (0, U.e)((ye, te) => {
              var Ce;
              null === (Ce = se.subscribe) || void 0 === Ce || Ce.call(se);
              let He = !0;
              ye.subscribe(
                (0, B.x)(
                  te,
                  Re => {
                    var $e;
                    null === ($e = se.next) || void 0 === $e || $e.call(se, Re), te.next(Re);
                  },
                  () => {
                    var Re;
                    (He = !1),
                      null === (Re = se.complete) || void 0 === Re || Re.call(se),
                      te.complete();
                  },
                  Re => {
                    var $e;
                    (He = !1),
                      null === ($e = se.error) || void 0 === $e || $e.call(se, Re),
                      te.error(Re);
                  },
                  () => {
                    var Re, $e;
                    He && (null === (Re = se.unsubscribe) || void 0 === Re || Re.call(se)),
                      null === ($e = se.finalize) || void 0 === $e || $e.call(se);
                  }
                )
              );
            })
          : ie.y;
      }
    },
    3026: (We, fe, M) => {
      M.d(fe, { T: () => ie });
      var m = M(6973),
        U = M(9360),
        B = M(8251);
      function ie(q = Q) {
        return (0, U.e)((pe, Te) => {
          let se = !1;
          pe.subscribe(
            (0, B.x)(
              Te,
              ye => {
                (se = !0), Te.next(ye);
              },
              () => (se ? Te.complete() : Te.error(q()))
            )
          );
        });
      }
      function Q() {
        return new m.K();
      }
    },
    7599: (We, fe, M) => {
      M.d(fe, { z: () => m });
      const m = {
        setTimeout(U, B, ...ie) {
          const { delegate: Q } = m;
          return Q?.setTimeout ? Q.setTimeout(U, B, ...ie) : setTimeout(U, B, ...ie);
        },
        clearTimeout(U) {
          const { delegate: B } = m;
          return (B?.clearTimeout || clearTimeout)(U);
        },
        delegate: void 0,
      };
    },
    4971: (We, fe, M) => {
      M.d(fe, { h: () => U });
      const U = (function m() {
        return 'function' == typeof Symbol && Symbol.iterator ? Symbol.iterator : '@@iterator';
      })();
    },
    4850: (We, fe, M) => {
      M.d(fe, { L: () => m });
      const m = ('function' == typeof Symbol && Symbol.observable) || '@@observable';
    },
    6973: (We, fe, M) => {
      M.d(fe, { K: () => U });
      const U = (0, M(2306).d)(
        B =>
          function () {
            B(this), (this.name = 'EmptyError'), (this.message = 'no elements in sequence');
          }
      );
    },
    9940: (We, fe, M) => {
      M.d(fe, { _6: () => q, jO: () => ie, yG: () => Q });
      var m = M(4674),
        U = M(671);
      function B(pe) {
        return pe[pe.length - 1];
      }
      function ie(pe) {
        return (0, m.m)(B(pe)) ? pe.pop() : void 0;
      }
      function Q(pe) {
        return (0, U.K)(B(pe)) ? pe.pop() : void 0;
      }
      function q(pe, Te) {
        return 'number' == typeof B(pe) ? pe.pop() : Te;
      }
    },
    7453: (We, fe, M) => {
      M.d(fe, { D: () => Q });
      const { isArray: m } = Array,
        { getPrototypeOf: U, prototype: B, keys: ie } = Object;
      function Q(pe) {
        if (1 === pe.length) {
          const Te = pe[0];
          if (m(Te)) return { args: Te, keys: null };
          if (
            (function q(pe) {
              return pe && 'object' == typeof pe && U(pe) === B;
            })(Te)
          ) {
            const se = ie(Te);
            return { args: se.map(ye => Te[ye]), keys: se };
          }
        }
        return { args: pe, keys: null };
      }
    },
    9039: (We, fe, M) => {
      function m(U, B) {
        if (U) {
          const ie = U.indexOf(B);
          0 <= ie && U.splice(ie, 1);
        }
      }
      M.d(fe, { P: () => m });
    },
    2306: (We, fe, M) => {
      function m(U) {
        const ie = U(Q => {
          Error.call(Q), (Q.stack = new Error().stack);
        });
        return (ie.prototype = Object.create(Error.prototype)), (ie.prototype.constructor = ie), ie;
      }
      M.d(fe, { d: () => m });
    },
    2714: (We, fe, M) => {
      function m(U, B) {
        return U.reduce((ie, Q, q) => ((ie[Q] = B[q]), ie), {});
      }
      M.d(fe, { n: () => m });
    },
    1441: (We, fe, M) => {
      M.d(fe, { O: () => ie, x: () => B });
      var m = M(2653);
      let U = null;
      function B(Q) {
        if (m.config.useDeprecatedSynchronousErrorHandling) {
          const q = !U;
          if ((q && (U = { errorThrown: !1, error: null }), Q(), q)) {
            const { errorThrown: pe, error: Te } = U;
            if (((U = null), pe)) throw Te;
          }
        } else Q();
      }
      function ie(Q) {
        m.config.useDeprecatedSynchronousErrorHandling &&
          U &&
          ((U.errorThrown = !0), (U.error = Q));
      }
    },
    7103: (We, fe, M) => {
      function m(U, B, ie, Q = 0, q = !1) {
        const pe = B.schedule(function () {
          ie(), q ? U.add(this.schedule(null, Q)) : this.unsubscribe();
        }, Q);
        if ((U.add(pe), !q)) return pe;
      }
      M.d(fe, { f: () => m });
    },
    2737: (We, fe, M) => {
      function m(U) {
        return U;
      }
      M.d(fe, { y: () => m });
    },
    4266: (We, fe, M) => {
      M.d(fe, { z: () => m });
      const m = U => U && 'number' == typeof U.length && 'function' != typeof U;
    },
    5726: (We, fe, M) => {
      M.d(fe, { D: () => U });
      var m = M(4674);
      function U(B) {
        return Symbol.asyncIterator && (0, m.m)(B?.[Symbol.asyncIterator]);
      }
    },
    4674: (We, fe, M) => {
      function m(U) {
        return 'function' == typeof U;
      }
      M.d(fe, { m: () => m });
    },
    8382: (We, fe, M) => {
      M.d(fe, { c: () => B });
      var m = M(4850),
        U = M(4674);
      function B(ie) {
        return (0, U.m)(ie[m.L]);
      }
    },
    3664: (We, fe, M) => {
      M.d(fe, { T: () => B });
      var m = M(4971),
        U = M(4674);
      function B(ie) {
        return (0, U.m)(ie?.[m.h]);
      }
    },
    4026: (We, fe, M) => {
      M.d(fe, { t: () => U });
      var m = M(4674);
      function U(B) {
        return (0, m.m)(B?.then);
      }
    },
    541: (We, fe, M) => {
      M.d(fe, { L: () => ie, Q: () => B });
      var m = M(7582),
        U = M(4674);
      function B(Q) {
        return (0, m.FC)(this, arguments, function* () {
          const pe = Q.getReader();
          try {
            for (;;) {
              const { value: Te, done: se } = yield (0, m.qq)(pe.read());
              if (se) return yield (0, m.qq)(void 0);
              yield yield (0, m.qq)(Te);
            }
          } finally {
            pe.releaseLock();
          }
        });
      }
      function ie(Q) {
        return (0, U.m)(Q?.getReader);
      }
    },
    671: (We, fe, M) => {
      M.d(fe, { K: () => U });
      var m = M(4674);
      function U(B) {
        return B && (0, m.m)(B.schedule);
      }
    },
    9360: (We, fe, M) => {
      M.d(fe, { A: () => U, e: () => B });
      var m = M(4674);
      function U(ie) {
        return (0, m.m)(ie?.lift);
      }
      function B(ie) {
        return Q => {
          if (U(Q))
            return Q.lift(function (q) {
              try {
                return ie(q, this);
              } catch (pe) {
                this.error(pe);
              }
            });
          throw new TypeError('Unable to lift unknown Observable type');
        };
      }
    },
    7400: (We, fe, M) => {
      M.d(fe, { Z: () => ie });
      var m = M(7398);
      const { isArray: U } = Array;
      function ie(Q) {
        return (0, m.U)(q =>
          (function B(Q, q) {
            return U(q) ? Q(...q) : Q(q);
          })(Q, q)
        );
      }
    },
    2420: (We, fe, M) => {
      function m() {}
      M.d(fe, { Z: () => m });
    },
    8407: (We, fe, M) => {
      M.d(fe, { U: () => B, z: () => U });
      var m = M(2737);
      function U(...ie) {
        return B(ie);
      }
      function B(ie) {
        return 0 === ie.length
          ? m.y
          : 1 === ie.length
            ? ie[0]
            : function (q) {
                return ie.reduce((pe, Te) => Te(pe), q);
              };
      }
    },
    3894: (We, fe, M) => {
      M.d(fe, { h: () => B });
      var m = M(2653),
        U = M(7599);
      function B(ie) {
        U.z.setTimeout(() => {
          const { onUnhandledError: Q } = m.config;
          if (!Q) throw ie;
          Q(ie);
        });
      }
    },
    9853: (We, fe, M) => {
      function m(U) {
        return new TypeError(
          `You provided ${null !== U && 'object' == typeof U ? 'an invalid object' : `'${U}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      M.d(fe, { z: () => m });
    },
    6825: (We, fe, M) => {
      M.d(fe, {
        LC: () => U,
        SB: () => se,
        X$: () => ie,
        ZE: () => lt,
        ZN: () => Le,
        _j: () => m,
        eR: () => te,
        jt: () => Q,
        k1: () => tt,
        l3: () => B,
        oB: () => Te,
        vP: () => pe,
      });
      class m {}
      class U {}
      const B = '*';
      function ie(Ke, K) {
        return { type: 7, name: Ke, definitions: K, options: {} };
      }
      function Q(Ke, K = null) {
        return { type: 4, styles: K, timings: Ke };
      }
      function pe(Ke, K = null) {
        return { type: 2, steps: Ke, options: K };
      }
      function Te(Ke) {
        return { type: 6, styles: Ke, offset: null };
      }
      function se(Ke, K, ve) {
        return { type: 0, name: Ke, styles: K, options: ve };
      }
      function te(Ke, K, ve = null) {
        return { type: 1, expr: Ke, animation: K, options: ve };
      }
      class Le {
        constructor(K = 0, ve = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = K + ve);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0), this._onDoneFns.forEach(K => K()), (this._onDoneFns = []));
        }
        onStart(K) {
          this._originalOnStartFns.push(K), this._onStartFns.push(K);
        }
        onDone(K) {
          this._originalOnDoneFns.push(K), this._onDoneFns.push(K);
        }
        onDestroy(K) {
          this._onDestroyFns.push(K);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()), (this._started = !0);
        }
        triggerMicrotask() {
          queueMicrotask(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach(K => K()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach(K => K()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(K) {
          this._position = this.totalTime ? K * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(K) {
          const ve = 'start' == K ? this._onStartFns : this._onDoneFns;
          ve.forEach(he => he()), (ve.length = 0);
        }
      }
      class lt {
        constructor(K) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = K);
          let ve = 0,
            he = 0,
            Ie = 0;
          const we = this.players.length;
          0 == we
            ? queueMicrotask(() => this._onFinish())
            : this.players.forEach(X => {
                X.onDone(() => {
                  ++ve == we && this._onFinish();
                }),
                  X.onDestroy(() => {
                    ++he == we && this._onDestroy();
                  }),
                  X.onStart(() => {
                    ++Ie == we && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce((X, Se) => Math.max(X, Se.totalTime), 0));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0), this._onDoneFns.forEach(K => K()), (this._onDoneFns = []));
        }
        init() {
          this.players.forEach(K => K.init());
        }
        onStart(K) {
          this._onStartFns.push(K);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0), this._onStartFns.forEach(K => K()), (this._onStartFns = []));
        }
        onDone(K) {
          this._onDoneFns.push(K);
        }
        onDestroy(K) {
          this._onDestroyFns.push(K);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(), this._onStart(), this.players.forEach(K => K.play());
        }
        pause() {
          this.players.forEach(K => K.pause());
        }
        restart() {
          this.players.forEach(K => K.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach(K => K.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach(K => K.destroy()),
            this._onDestroyFns.forEach(K => K()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach(K => K.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(K) {
          const ve = K * this.totalTime;
          this.players.forEach(he => {
            const Ie = he.totalTime ? Math.min(1, ve / he.totalTime) : 1;
            he.setPosition(Ie);
          });
        }
        getPosition() {
          const K = this.players.reduce(
            (ve, he) => (null === ve || he.totalTime > ve.totalTime ? he : ve),
            null
          );
          return null != K ? K.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach(K => {
            K.beforeDestroy && K.beforeDestroy();
          });
        }
        triggerCallback(K) {
          const ve = 'start' == K ? this._onStartFns : this._onDoneFns;
          ve.forEach(he => he()), (ve.length = 0);
        }
      }
      const tt = '!';
    },
    6814: (We, fe, M) => {
      M.d(fe, {
        Do: () => Et,
        EM: () => Bn,
        HT: () => ie,
        JF: () => Cr,
        K0: () => q,
        Mx: () => kn,
        NF: () => Wr,
        O5: () => Ti,
        PC: () => Vr,
        PM: () => bn,
        S$: () => He,
        V_: () => Te,
        Ye: () => Le,
        b0: () => $e,
        bD: () => Ne,
        ez: () => en,
        mk: () => kt,
        q: () => B,
        sg: () => wn,
        tP: () => xn,
        w_: () => Q,
      });
      var m = M(4769);
      let U = null;
      function B() {
        return U;
      }
      function ie(d) {
        U || (U = d);
      }
      class Q {}
      const q = new m.OlP('DocumentToken');
      let pe = (() => {
        class d {
          historyGo(y) {
            throw new Error('Not implemented');
          }
          static #e = (this.ɵfac = function (C) {
            return new (C || d)();
          });
          static #t = (this.ɵprov = m.Yz7({
            token: d,
            factory: function () {
              return (0, m.f3M)(se);
            },
            providedIn: 'platform',
          }));
        }
        return d;
      })();
      const Te = new m.OlP('Location Initialized');
      let se = (() => {
        class d extends pe {
          constructor() {
            super(),
              (this._doc = (0, m.f3M)(q)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return B().getBaseHref(this._doc);
          }
          onPopState(y) {
            const C = B().getGlobalEventTarget(this._doc, 'window');
            return (
              C.addEventListener('popstate', y, !1), () => C.removeEventListener('popstate', y)
            );
          }
          onHashChange(y) {
            const C = B().getGlobalEventTarget(this._doc, 'window');
            return (
              C.addEventListener('hashchange', y, !1), () => C.removeEventListener('hashchange', y)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(y) {
            this._location.pathname = y;
          }
          pushState(y, C, R) {
            this._history.pushState(y, C, R);
          }
          replaceState(y, C, R) {
            this._history.replaceState(y, C, R);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(y = 0) {
            this._history.go(y);
          }
          getState() {
            return this._history.state;
          }
          static #e = (this.ɵfac = function (C) {
            return new (C || d)();
          });
          static #t = (this.ɵprov = m.Yz7({
            token: d,
            factory: function () {
              return new d();
            },
            providedIn: 'platform',
          }));
        }
        return d;
      })();
      function ye(d, _) {
        if (0 == d.length) return _;
        if (0 == _.length) return d;
        let y = 0;
        return (
          d.endsWith('/') && y++,
          _.startsWith('/') && y++,
          2 == y ? d + _.substring(1) : 1 == y ? d + _ : d + '/' + _
        );
      }
      function te(d) {
        const _ = d.match(/#|\?|$/),
          y = (_ && _.index) || d.length;
        return d.slice(0, y - ('/' === d[y - 1] ? 1 : 0)) + d.slice(y);
      }
      function Ce(d) {
        return d && '?' !== d[0] ? '?' + d : d;
      }
      let He = (() => {
        class d {
          historyGo(y) {
            throw new Error('Not implemented');
          }
          static #e = (this.ɵfac = function (C) {
            return new (C || d)();
          });
          static #t = (this.ɵprov = m.Yz7({
            token: d,
            factory: function () {
              return (0, m.f3M)($e);
            },
            providedIn: 'root',
          }));
        }
        return d;
      })();
      const Re = new m.OlP('appBaseHref');
      let $e = (() => {
          class d extends He {
            constructor(y, C) {
              super(),
                (this._platformLocation = y),
                (this._removeListenerFns = []),
                (this._baseHref =
                  C ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  (0, m.f3M)(q).location?.origin ??
                  '');
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
            }
            onPopState(y) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(y),
                this._platformLocation.onHashChange(y)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(y) {
              return ye(this._baseHref, y);
            }
            path(y = !1) {
              const C = this._platformLocation.pathname + Ce(this._platformLocation.search),
                R = this._platformLocation.hash;
              return R && y ? `${C}${R}` : C;
            }
            pushState(y, C, R, W) {
              const de = this.prepareExternalUrl(R + Ce(W));
              this._platformLocation.pushState(y, C, de);
            }
            replaceState(y, C, R, W) {
              const de = this.prepareExternalUrl(R + Ce(W));
              this._platformLocation.replaceState(y, C, de);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(y = 0) {
              this._platformLocation.historyGo?.(y);
            }
            static #e = (this.ɵfac = function (C) {
              return new (C || d)(m.LFG(pe), m.LFG(Re, 8));
            });
            static #t = (this.ɵprov = m.Yz7({ token: d, factory: d.ɵfac, providedIn: 'root' }));
          }
          return d;
        })(),
        Et = (() => {
          class d extends He {
            constructor(y, C) {
              super(),
                (this._platformLocation = y),
                (this._baseHref = ''),
                (this._removeListenerFns = []),
                null != C && (this._baseHref = C);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
            }
            onPopState(y) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(y),
                this._platformLocation.onHashChange(y)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(y = !1) {
              let C = this._platformLocation.hash;
              return null == C && (C = '#'), C.length > 0 ? C.substring(1) : C;
            }
            prepareExternalUrl(y) {
              const C = ye(this._baseHref, y);
              return C.length > 0 ? '#' + C : C;
            }
            pushState(y, C, R, W) {
              let de = this.prepareExternalUrl(R + Ce(W));
              0 == de.length && (de = this._platformLocation.pathname),
                this._platformLocation.pushState(y, C, de);
            }
            replaceState(y, C, R, W) {
              let de = this.prepareExternalUrl(R + Ce(W));
              0 == de.length && (de = this._platformLocation.pathname),
                this._platformLocation.replaceState(y, C, de);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(y = 0) {
              this._platformLocation.historyGo?.(y);
            }
            static #e = (this.ɵfac = function (C) {
              return new (C || d)(m.LFG(pe), m.LFG(Re, 8));
            });
            static #t = (this.ɵprov = m.Yz7({ token: d, factory: d.ɵfac }));
          }
          return d;
        })(),
        Le = (() => {
          class d {
            constructor(y) {
              (this._subject = new m.vpe()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = y);
              const C = this._locationStrategy.getBaseHref();
              (this._basePath = (function K(d) {
                if (new RegExp('^(https?:)?//').test(d)) {
                  const [, y] = d.split(/\/\/[^\/]+/);
                  return y;
                }
                return d;
              })(te(Ke(C)))),
                this._locationStrategy.onPopState(R => {
                  this._subject.emit({ url: this.path(!0), pop: !0, state: R.state, type: R.type });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = []);
            }
            path(y = !1) {
              return this.normalize(this._locationStrategy.path(y));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(y, C = '') {
              return this.path() == this.normalize(y + Ce(C));
            }
            normalize(y) {
              return d.stripTrailingSlash(
                (function tt(d, _) {
                  if (!d || !_.startsWith(d)) return _;
                  const y = _.substring(d.length);
                  return '' === y || ['/', ';', '?', '#'].includes(y[0]) ? y : _;
                })(this._basePath, Ke(y))
              );
            }
            prepareExternalUrl(y) {
              return (
                y && '/' !== y[0] && (y = '/' + y), this._locationStrategy.prepareExternalUrl(y)
              );
            }
            go(y, C = '', R = null) {
              this._locationStrategy.pushState(R, '', y, C),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(y + Ce(C)), R);
            }
            replaceState(y, C = '', R = null) {
              this._locationStrategy.replaceState(R, '', y, C),
                this._notifyUrlChangeListeners(this.prepareExternalUrl(y + Ce(C)), R);
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(y = 0) {
              this._locationStrategy.historyGo?.(y);
            }
            onUrlChange(y) {
              return (
                this._urlChangeListeners.push(y),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe(C => {
                    this._notifyUrlChangeListeners(C.url, C.state);
                  })),
                () => {
                  const C = this._urlChangeListeners.indexOf(y);
                  this._urlChangeListeners.splice(C, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(y = '', C) {
              this._urlChangeListeners.forEach(R => R(y, C));
            }
            subscribe(y, C, R) {
              return this._subject.subscribe({ next: y, error: C, complete: R });
            }
            static #e = (this.normalizeQueryParams = Ce);
            static #t = (this.joinWithSlash = ye);
            static #n = (this.stripTrailingSlash = te);
            static #r = (this.ɵfac = function (C) {
              return new (C || d)(m.LFG(He));
            });
            static #i = (this.ɵprov = m.Yz7({
              token: d,
              factory: function () {
                return (function lt() {
                  return new Le((0, m.LFG)(He));
                })();
              },
              providedIn: 'root',
            }));
          }
          return d;
        })();
      function Ke(d) {
        return d.replace(/\/index.html$/, '');
      }
      function kn(d, _) {
        _ = encodeURIComponent(_);
        for (const y of d.split(';')) {
          const C = y.indexOf('='),
            [R, W] = -1 == C ? [y, ''] : [y.slice(0, C), y.slice(C + 1)];
          if (R.trim() === _) return decodeURIComponent(W);
        }
        return null;
      }
      const gn = /\s+/,
        ze = [];
      let kt = (() => {
        class d {
          constructor(y, C, R, W) {
            (this._iterableDiffers = y),
              (this._keyValueDiffers = C),
              (this._ngEl = R),
              (this._renderer = W),
              (this.initialClasses = ze),
              (this.stateMap = new Map());
          }
          set klass(y) {
            this.initialClasses = null != y ? y.trim().split(gn) : ze;
          }
          set ngClass(y) {
            this.rawClass = 'string' == typeof y ? y.trim().split(gn) : y;
          }
          ngDoCheck() {
            for (const C of this.initialClasses) this._updateState(C, !0);
            const y = this.rawClass;
            if (Array.isArray(y) || y instanceof Set) for (const C of y) this._updateState(C, !0);
            else if (null != y) for (const C of Object.keys(y)) this._updateState(C, !!y[C]);
            this._applyStateDiff();
          }
          _updateState(y, C) {
            const R = this.stateMap.get(y);
            void 0 !== R
              ? (R.enabled !== C && ((R.changed = !0), (R.enabled = C)), (R.touched = !0))
              : this.stateMap.set(y, { enabled: C, changed: !0, touched: !0 });
          }
          _applyStateDiff() {
            for (const y of this.stateMap) {
              const C = y[0],
                R = y[1];
              R.changed
                ? (this._toggleClass(C, R.enabled), (R.changed = !1))
                : R.touched || (R.enabled && this._toggleClass(C, !1), this.stateMap.delete(C)),
                (R.touched = !1);
            }
          }
          _toggleClass(y, C) {
            (y = y.trim()).length > 0 &&
              y.split(gn).forEach(R => {
                C
                  ? this._renderer.addClass(this._ngEl.nativeElement, R)
                  : this._renderer.removeClass(this._ngEl.nativeElement, R);
              });
          }
          static #e = (this.ɵfac = function (C) {
            return new (C || d)(m.Y36(m.ZZ4), m.Y36(m.aQg), m.Y36(m.SBq), m.Y36(m.Qsj));
          });
          static #t = (this.ɵdir = m.lG2({
            type: d,
            selectors: [['', 'ngClass', '']],
            inputs: { klass: ['class', 'klass'], ngClass: 'ngClass' },
            standalone: !0,
          }));
        }
        return d;
      })();
      class yn {
        constructor(_, y, C, R) {
          (this.$implicit = _), (this.ngForOf = y), (this.index = C), (this.count = R);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let wn = (() => {
        class d {
          set ngForOf(y) {
            (this._ngForOf = y), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(y) {
            this._trackByFn = y;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(y, C, R) {
            (this._viewContainer = y),
              (this._template = C),
              (this._differs = R),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(y) {
            y && (this._template = y);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const y = this._ngForOf;
              !this._differ &&
                y &&
                (this._differ = this._differs.find(y).create(this.ngForTrackBy));
            }
            if (this._differ) {
              const y = this._differ.diff(this._ngForOf);
              y && this._applyChanges(y);
            }
          }
          _applyChanges(y) {
            const C = this._viewContainer;
            y.forEachOperation((R, W, de) => {
              if (null == R.previousIndex)
                C.createEmbeddedView(
                  this._template,
                  new yn(R.item, this._ngForOf, -1, -1),
                  null === de ? void 0 : de
                );
              else if (null == de) C.remove(null === W ? void 0 : W);
              else if (null !== W) {
                const Me = C.get(W);
                C.move(Me, de), or(Me, R);
              }
            });
            for (let R = 0, W = C.length; R < W; R++) {
              const Me = C.get(R).context;
              (Me.index = R), (Me.count = W), (Me.ngForOf = this._ngForOf);
            }
            y.forEachIdentityChange(R => {
              or(C.get(R.currentIndex), R);
            });
          }
          static ngTemplateContextGuard(y, C) {
            return !0;
          }
          static #e = (this.ɵfac = function (C) {
            return new (C || d)(m.Y36(m.s_b), m.Y36(m.Rgc), m.Y36(m.ZZ4));
          });
          static #t = (this.ɵdir = m.lG2({
            type: d,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: {
              ngForOf: 'ngForOf',
              ngForTrackBy: 'ngForTrackBy',
              ngForTemplate: 'ngForTemplate',
            },
            standalone: !0,
          }));
        }
        return d;
      })();
      function or(d, _) {
        d.context.$implicit = _.item;
      }
      let Ti = (() => {
        class d {
          constructor(y, C) {
            (this._viewContainer = y),
              (this._context = new ei()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = C);
          }
          set ngIf(y) {
            (this._context.$implicit = this._context.ngIf = y), this._updateView();
          }
          set ngIfThen(y) {
            Wi('ngIfThen', y),
              (this._thenTemplateRef = y),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(y) {
            Wi('ngIfElse', y),
              (this._elseTemplateRef = y),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(y, C) {
            return !0;
          }
          static #e = (this.ɵfac = function (C) {
            return new (C || d)(m.Y36(m.s_b), m.Y36(m.Rgc));
          });
          static #t = (this.ɵdir = m.lG2({
            type: d,
            selectors: [['', 'ngIf', '']],
            inputs: { ngIf: 'ngIf', ngIfThen: 'ngIfThen', ngIfElse: 'ngIfElse' },
            standalone: !0,
          }));
        }
        return d;
      })();
      class ei {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function Wi(d, _) {
        if (_ && !_.createEmbeddedView)
          throw new Error(`${d} must be a TemplateRef, but received '${(0, m.AaK)(_)}'.`);
      }
      let Vr = (() => {
          class d {
            constructor(y, C, R) {
              (this._ngEl = y),
                (this._differs = C),
                (this._renderer = R),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(y) {
              (this._ngStyle = y),
                !this._differ && y && (this._differ = this._differs.find(y).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const y = this._differ.diff(this._ngStyle);
                y && this._applyChanges(y);
              }
            }
            _setStyle(y, C) {
              const [R, W] = y.split('.'),
                de = -1 === R.indexOf('-') ? void 0 : m.JOm.DashCase;
              null != C
                ? this._renderer.setStyle(this._ngEl.nativeElement, R, W ? `${C}${W}` : C, de)
                : this._renderer.removeStyle(this._ngEl.nativeElement, R, de);
            }
            _applyChanges(y) {
              y.forEachRemovedItem(C => this._setStyle(C.key, null)),
                y.forEachAddedItem(C => this._setStyle(C.key, C.currentValue)),
                y.forEachChangedItem(C => this._setStyle(C.key, C.currentValue));
            }
            static #e = (this.ɵfac = function (C) {
              return new (C || d)(m.Y36(m.SBq), m.Y36(m.aQg), m.Y36(m.Qsj));
            });
            static #t = (this.ɵdir = m.lG2({
              type: d,
              selectors: [['', 'ngStyle', '']],
              inputs: { ngStyle: 'ngStyle' },
              standalone: !0,
            }));
          }
          return d;
        })(),
        xn = (() => {
          class d {
            constructor(y) {
              (this._viewContainerRef = y),
                (this._viewRef = null),
                (this.ngTemplateOutletContext = null),
                (this.ngTemplateOutlet = null),
                (this.ngTemplateOutletInjector = null);
            }
            ngOnChanges(y) {
              if (y.ngTemplateOutlet || y.ngTemplateOutletInjector) {
                const C = this._viewContainerRef;
                if ((this._viewRef && C.remove(C.indexOf(this._viewRef)), this.ngTemplateOutlet)) {
                  const {
                    ngTemplateOutlet: R,
                    ngTemplateOutletContext: W,
                    ngTemplateOutletInjector: de,
                  } = this;
                  this._viewRef = C.createEmbeddedView(R, W, de ? { injector: de } : void 0);
                } else this._viewRef = null;
              } else
                this._viewRef &&
                  y.ngTemplateOutletContext &&
                  this.ngTemplateOutletContext &&
                  (this._viewRef.context = this.ngTemplateOutletContext);
            }
            static #e = (this.ɵfac = function (C) {
              return new (C || d)(m.Y36(m.s_b));
            });
            static #t = (this.ɵdir = m.lG2({
              type: d,
              selectors: [['', 'ngTemplateOutlet', '']],
              inputs: {
                ngTemplateOutletContext: 'ngTemplateOutletContext',
                ngTemplateOutlet: 'ngTemplateOutlet',
                ngTemplateOutletInjector: 'ngTemplateOutletInjector',
              },
              standalone: !0,
              features: [m.TTD],
            }));
          }
          return d;
        })(),
        en = (() => {
          class d {
            static #e = (this.ɵfac = function (C) {
              return new (C || d)();
            });
            static #t = (this.ɵmod = m.oAB({ type: d }));
            static #n = (this.ɵinj = m.cJS({}));
          }
          return d;
        })();
      const Ne = 'browser',
        ut = 'server';
      function Wr(d) {
        return d === Ne;
      }
      function bn(d) {
        return d === ut;
      }
      let Bn = (() => {
        class d {
          static #e = (this.ɵprov = (0, m.Yz7)({
            token: d,
            providedIn: 'root',
            factory: () => new it((0, m.LFG)(q), window),
          }));
        }
        return d;
      })();
      class it {
        constructor(_, y) {
          (this.document = _), (this.window = y), (this.offset = () => [0, 0]);
        }
        setOffset(_) {
          this.offset = Array.isArray(_) ? () => _ : _;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(_) {
          this.supportsScrolling() && this.window.scrollTo(_[0], _[1]);
        }
        scrollToAnchor(_) {
          if (!this.supportsScrolling()) return;
          const y = (function gi(d, _) {
            const y = d.getElementById(_) || d.getElementsByName(_)[0];
            if (y) return y;
            if (
              'function' == typeof d.createTreeWalker &&
              d.body &&
              'function' == typeof d.body.attachShadow
            ) {
              const C = d.createTreeWalker(d.body, NodeFilter.SHOW_ELEMENT);
              let R = C.currentNode;
              for (; R; ) {
                const W = R.shadowRoot;
                if (W) {
                  const de = W.getElementById(_) || W.querySelector(`[name="${_}"]`);
                  if (de) return de;
                }
                R = C.nextNode();
              }
            }
            return null;
          })(this.document, _);
          y && (this.scrollToElement(y), y.focus());
        }
        setHistoryScrollRestoration(_) {
          this.supportsScrolling() && (this.window.history.scrollRestoration = _);
        }
        scrollToElement(_) {
          const y = _.getBoundingClientRect(),
            C = y.left + this.window.pageXOffset,
            R = y.top + this.window.pageYOffset,
            W = this.offset();
          this.window.scrollTo(C - W[0], R - W[1]);
        }
        supportsScrolling() {
          try {
            return !!this.window && !!this.window.scrollTo && 'pageXOffset' in this.window;
          } catch {
            return !1;
          }
        }
      }
      class Cr {}
    },
    9862: (We, fe, M) => {
      M.d(fe, { JF: () => L, eN: () => V });
      var m = M(4769),
        U = M(2096),
        B = M(7715),
        ie = M(5592),
        Q = M(6328),
        q = M(2181),
        pe = M(7398),
        Te = M(4716),
        se = M(4664),
        ye = M(6814);
      class te {}
      class Ce {}
      class He {
        constructor(x) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            x
              ? 'string' == typeof x
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      x.split('\n').forEach(F => {
                        const ue = F.indexOf(':');
                        if (ue > 0) {
                          const ge = F.slice(0, ue),
                            Fe = ge.toLowerCase(),
                            Oe = F.slice(ue + 1).trim();
                          this.maybeSetNormalizedName(ge, Fe),
                            this.headers.has(Fe)
                              ? this.headers.get(Fe).push(Oe)
                              : this.headers.set(Fe, [Oe]);
                        }
                      });
                  })
                : typeof Headers < 'u' && x instanceof Headers
                  ? ((this.headers = new Map()),
                    x.forEach((F, ue) => {
                      this.setHeaderEntries(ue, F);
                    }))
                  : (this.lazyInit = () => {
                      (this.headers = new Map()),
                        Object.entries(x).forEach(([F, ue]) => {
                          this.setHeaderEntries(F, ue);
                        });
                    })
              : (this.headers = new Map());
        }
        has(x) {
          return this.init(), this.headers.has(x.toLowerCase());
        }
        get(x) {
          this.init();
          const F = this.headers.get(x.toLowerCase());
          return F && F.length > 0 ? F[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(x) {
          return this.init(), this.headers.get(x.toLowerCase()) || null;
        }
        append(x, F) {
          return this.clone({ name: x, value: F, op: 'a' });
        }
        set(x, F) {
          return this.clone({ name: x, value: F, op: 's' });
        }
        delete(x, F) {
          return this.clone({ name: x, value: F, op: 'd' });
        }
        maybeSetNormalizedName(x, F) {
          this.normalizedNames.has(F) || this.normalizedNames.set(F, x);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof He ? this.copyFrom(this.lazyInit) : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach(x => this.applyUpdate(x)), (this.lazyUpdate = null)));
        }
        copyFrom(x) {
          x.init(),
            Array.from(x.headers.keys()).forEach(F => {
              this.headers.set(F, x.headers.get(F)),
                this.normalizedNames.set(F, x.normalizedNames.get(F));
            });
        }
        clone(x) {
          const F = new He();
          return (
            (F.lazyInit = this.lazyInit && this.lazyInit instanceof He ? this.lazyInit : this),
            (F.lazyUpdate = (this.lazyUpdate || []).concat([x])),
            F
          );
        }
        applyUpdate(x) {
          const F = x.name.toLowerCase();
          switch (x.op) {
            case 'a':
            case 's':
              let ue = x.value;
              if (('string' == typeof ue && (ue = [ue]), 0 === ue.length)) return;
              this.maybeSetNormalizedName(x.name, F);
              const ge = ('a' === x.op ? this.headers.get(F) : void 0) || [];
              ge.push(...ue), this.headers.set(F, ge);
              break;
            case 'd':
              const Fe = x.value;
              if (Fe) {
                let Oe = this.headers.get(F);
                if (!Oe) return;
                (Oe = Oe.filter(At => -1 === Fe.indexOf(At))),
                  0 === Oe.length
                    ? (this.headers.delete(F), this.normalizedNames.delete(F))
                    : this.headers.set(F, Oe);
              } else this.headers.delete(F), this.normalizedNames.delete(F);
          }
        }
        setHeaderEntries(x, F) {
          const ue = (Array.isArray(F) ? F : [F]).map(Fe => Fe.toString()),
            ge = x.toLowerCase();
          this.headers.set(ge, ue), this.maybeSetNormalizedName(x, ge);
        }
        forEach(x) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach(F =>
              x(this.normalizedNames.get(F), this.headers.get(F))
            );
        }
      }
      class $e {
        encodeKey(x) {
          return tt(x);
        }
        encodeValue(x) {
          return tt(x);
        }
        decodeKey(x) {
          return decodeURIComponent(x);
        }
        decodeValue(x) {
          return decodeURIComponent(x);
        }
      }
      const Le = /%(\d[a-f0-9])/gi,
        lt = { 40: '@', '3A': ':', 24: '$', '2C': ',', '3B': ';', '3D': '=', '3F': '?', '2F': '/' };
      function tt($) {
        return encodeURIComponent($).replace(Le, (x, F) => lt[F] ?? x);
      }
      function Ke($) {
        return `${$}`;
      }
      class K {
        constructor(x = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = x.encoder || new $e()),
            x.fromString)
          ) {
            if (x.fromObject) throw new Error('Cannot specify both fromString and fromObject.');
            this.map = (function Et($, x) {
              const F = new Map();
              return (
                $.length > 0 &&
                  $.replace(/^\?/, '')
                    .split('&')
                    .forEach(ge => {
                      const Fe = ge.indexOf('='),
                        [Oe, At] =
                          -1 == Fe
                            ? [x.decodeKey(ge), '']
                            : [x.decodeKey(ge.slice(0, Fe)), x.decodeValue(ge.slice(Fe + 1))],
                        dt = F.get(Oe) || [];
                      dt.push(At), F.set(Oe, dt);
                    }),
                F
              );
            })(x.fromString, this.encoder);
          } else
            x.fromObject
              ? ((this.map = new Map()),
                Object.keys(x.fromObject).forEach(F => {
                  const ue = x.fromObject[F],
                    ge = Array.isArray(ue) ? ue.map(Ke) : [Ke(ue)];
                  this.map.set(F, ge);
                }))
              : (this.map = null);
        }
        has(x) {
          return this.init(), this.map.has(x);
        }
        get(x) {
          this.init();
          const F = this.map.get(x);
          return F ? F[0] : null;
        }
        getAll(x) {
          return this.init(), this.map.get(x) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(x, F) {
          return this.clone({ param: x, value: F, op: 'a' });
        }
        appendAll(x) {
          const F = [];
          return (
            Object.keys(x).forEach(ue => {
              const ge = x[ue];
              Array.isArray(ge)
                ? ge.forEach(Fe => {
                    F.push({ param: ue, value: Fe, op: 'a' });
                  })
                : F.push({ param: ue, value: ge, op: 'a' });
            }),
            this.clone(F)
          );
        }
        set(x, F) {
          return this.clone({ param: x, value: F, op: 's' });
        }
        delete(x, F) {
          return this.clone({ param: x, value: F, op: 'd' });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map(x => {
                const F = this.encoder.encodeKey(x);
                return this.map
                  .get(x)
                  .map(ue => F + '=' + this.encoder.encodeValue(ue))
                  .join('&');
              })
              .filter(x => '' !== x)
              .join('&')
          );
        }
        clone(x) {
          const F = new K({ encoder: this.encoder });
          return (
            (F.cloneFrom = this.cloneFrom || this), (F.updates = (this.updates || []).concat(x)), F
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom.keys().forEach(x => this.map.set(x, this.cloneFrom.map.get(x))),
              this.updates.forEach(x => {
                switch (x.op) {
                  case 'a':
                  case 's':
                    const F = ('a' === x.op ? this.map.get(x.param) : void 0) || [];
                    F.push(Ke(x.value)), this.map.set(x.param, F);
                    break;
                  case 'd':
                    if (void 0 === x.value) {
                      this.map.delete(x.param);
                      break;
                    }
                    {
                      let ue = this.map.get(x.param) || [];
                      const ge = ue.indexOf(Ke(x.value));
                      -1 !== ge && ue.splice(ge, 1),
                        ue.length > 0 ? this.map.set(x.param, ue) : this.map.delete(x.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class he {
        constructor() {
          this.map = new Map();
        }
        set(x, F) {
          return this.map.set(x, F), this;
        }
        get(x) {
          return this.map.has(x) || this.map.set(x, x.defaultValue()), this.map.get(x);
        }
        delete(x) {
          return this.map.delete(x), this;
        }
        has(x) {
          return this.map.has(x);
        }
        keys() {
          return this.map.keys();
        }
      }
      function we($) {
        return typeof ArrayBuffer < 'u' && $ instanceof ArrayBuffer;
      }
      function X($) {
        return typeof Blob < 'u' && $ instanceof Blob;
      }
      function Se($) {
        return typeof FormData < 'u' && $ instanceof FormData;
      }
      class yt {
        constructor(x, F, ue, ge) {
          let Fe;
          if (
            ((this.url = F),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = 'json'),
            (this.method = x.toUpperCase()),
            (function Ie($) {
              switch ($) {
                case 'DELETE':
                case 'GET':
                case 'HEAD':
                case 'OPTIONS':
                case 'JSONP':
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || ge
              ? ((this.body = void 0 !== ue ? ue : null), (Fe = ge))
              : (Fe = ue),
            Fe &&
              ((this.reportProgress = !!Fe.reportProgress),
              (this.withCredentials = !!Fe.withCredentials),
              Fe.responseType && (this.responseType = Fe.responseType),
              Fe.headers && (this.headers = Fe.headers),
              Fe.context && (this.context = Fe.context),
              Fe.params && (this.params = Fe.params)),
            this.headers || (this.headers = new He()),
            this.context || (this.context = new he()),
            this.params)
          ) {
            const Oe = this.params.toString();
            if (0 === Oe.length) this.urlWithParams = F;
            else {
              const At = F.indexOf('?');
              this.urlWithParams = F + (-1 === At ? '?' : At < F.length - 1 ? '&' : '') + Oe;
            }
          } else (this.params = new K()), (this.urlWithParams = F);
        }
        serializeBody() {
          return null === this.body
            ? null
            : we(this.body) ||
                X(this.body) ||
                Se(this.body) ||
                (function ne($) {
                  return typeof URLSearchParams < 'u' && $ instanceof URLSearchParams;
                })(this.body) ||
                'string' == typeof this.body
              ? this.body
              : this.body instanceof K
                ? this.body.toString()
                : 'object' == typeof this.body ||
                    'boolean' == typeof this.body ||
                    Array.isArray(this.body)
                  ? JSON.stringify(this.body)
                  : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || Se(this.body)
            ? null
            : X(this.body)
              ? this.body.type || null
              : we(this.body)
                ? null
                : 'string' == typeof this.body
                  ? 'text/plain'
                  : this.body instanceof K
                    ? 'application/x-www-form-urlencoded;charset=UTF-8'
                    : 'object' == typeof this.body ||
                        'number' == typeof this.body ||
                        'boolean' == typeof this.body
                      ? 'application/json'
                      : null;
        }
        clone(x = {}) {
          const F = x.method || this.method,
            ue = x.url || this.url,
            ge = x.responseType || this.responseType,
            Fe = void 0 !== x.body ? x.body : this.body,
            Oe = void 0 !== x.withCredentials ? x.withCredentials : this.withCredentials,
            At = void 0 !== x.reportProgress ? x.reportProgress : this.reportProgress;
          let dt = x.headers || this.headers,
            _n = x.params || this.params;
          const yr = x.context ?? this.context;
          return (
            void 0 !== x.setHeaders &&
              (dt = Object.keys(x.setHeaders).reduce((Ht, un) => Ht.set(un, x.setHeaders[un]), dt)),
            x.setParams &&
              (_n = Object.keys(x.setParams).reduce((Ht, un) => Ht.set(un, x.setParams[un]), _n)),
            new yt(F, ue, Fe, {
              params: _n,
              headers: dt,
              context: yr,
              reportProgress: At,
              responseType: ge,
              withCredentials: Oe,
            })
          );
        }
      }
      var ke = (function ($) {
        return (
          ($[($.Sent = 0)] = 'Sent'),
          ($[($.UploadProgress = 1)] = 'UploadProgress'),
          ($[($.ResponseHeader = 2)] = 'ResponseHeader'),
          ($[($.DownloadProgress = 3)] = 'DownloadProgress'),
          ($[($.Response = 4)] = 'Response'),
          ($[($.User = 5)] = 'User'),
          $
        );
      })(ke || {});
      class Ve {
        constructor(x, F = 200, ue = 'OK') {
          (this.headers = x.headers || new He()),
            (this.status = void 0 !== x.status ? x.status : F),
            (this.statusText = x.statusText || ue),
            (this.url = x.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class fn extends Ve {
        constructor(x = {}) {
          super(x), (this.type = ke.ResponseHeader);
        }
        clone(x = {}) {
          return new fn({
            headers: x.headers || this.headers,
            status: void 0 !== x.status ? x.status : this.status,
            statusText: x.statusText || this.statusText,
            url: x.url || this.url || void 0,
          });
        }
      }
      class Tn extends Ve {
        constructor(x = {}) {
          super(x), (this.type = ke.Response), (this.body = void 0 !== x.body ? x.body : null);
        }
        clone(x = {}) {
          return new Tn({
            body: void 0 !== x.body ? x.body : this.body,
            headers: x.headers || this.headers,
            status: void 0 !== x.status ? x.status : this.status,
            statusText: x.statusText || this.statusText,
            url: x.url || this.url || void 0,
          });
        }
      }
      class Tr extends Ve {
        constructor(x) {
          super(x, 0, 'Unknown Error'),
            (this.name = 'HttpErrorResponse'),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${x.url || '(unknown url)'}`
                : `Http failure response for ${x.url || '(unknown url)'}: ${x.status} ${x.statusText}`),
            (this.error = x.error || null);
        }
      }
      function An($, x) {
        return {
          body: x,
          headers: $.headers,
          context: $.context,
          observe: $.observe,
          params: $.params,
          reportProgress: $.reportProgress,
          responseType: $.responseType,
          withCredentials: $.withCredentials,
        };
      }
      let V = (() => {
        class $ {
          constructor(F) {
            this.handler = F;
          }
          request(F, ue, ge = {}) {
            let Fe;
            if (F instanceof yt) Fe = F;
            else {
              let dt, _n;
              (dt = ge.headers instanceof He ? ge.headers : new He(ge.headers)),
                ge.params &&
                  (_n = ge.params instanceof K ? ge.params : new K({ fromObject: ge.params })),
                (Fe = new yt(F, ue, void 0 !== ge.body ? ge.body : null, {
                  headers: dt,
                  context: ge.context,
                  params: _n,
                  reportProgress: ge.reportProgress,
                  responseType: ge.responseType || 'json',
                  withCredentials: ge.withCredentials,
                }));
            }
            const Oe = (0, U.of)(Fe).pipe((0, Q.b)(dt => this.handler.handle(dt)));
            if (F instanceof yt || 'events' === ge.observe) return Oe;
            const At = Oe.pipe((0, q.h)(dt => dt instanceof Tn));
            switch (ge.observe || 'body') {
              case 'body':
                switch (Fe.responseType) {
                  case 'arraybuffer':
                    return At.pipe(
                      (0, pe.U)(dt => {
                        if (null !== dt.body && !(dt.body instanceof ArrayBuffer))
                          throw new Error('Response is not an ArrayBuffer.');
                        return dt.body;
                      })
                    );
                  case 'blob':
                    return At.pipe(
                      (0, pe.U)(dt => {
                        if (null !== dt.body && !(dt.body instanceof Blob))
                          throw new Error('Response is not a Blob.');
                        return dt.body;
                      })
                    );
                  case 'text':
                    return At.pipe(
                      (0, pe.U)(dt => {
                        if (null !== dt.body && 'string' != typeof dt.body)
                          throw new Error('Response is not a string.');
                        return dt.body;
                      })
                    );
                  default:
                    return At.pipe((0, pe.U)(dt => dt.body));
                }
              case 'response':
                return At;
              default:
                throw new Error(`Unreachable: unhandled observe type ${ge.observe}}`);
            }
          }
          delete(F, ue = {}) {
            return this.request('DELETE', F, ue);
          }
          get(F, ue = {}) {
            return this.request('GET', F, ue);
          }
          head(F, ue = {}) {
            return this.request('HEAD', F, ue);
          }
          jsonp(F, ue) {
            return this.request('JSONP', F, {
              params: new K().append(ue, 'JSONP_CALLBACK'),
              observe: 'body',
              responseType: 'json',
            });
          }
          options(F, ue = {}) {
            return this.request('OPTIONS', F, ue);
          }
          patch(F, ue, ge = {}) {
            return this.request('PATCH', F, An(ge, ue));
          }
          post(F, ue, ge = {}) {
            return this.request('POST', F, An(ge, ue));
          }
          put(F, ue, ge = {}) {
            return this.request('PUT', F, An(ge, ue));
          }
          static #e = (this.ɵfac = function (ue) {
            return new (ue || $)(m.LFG(te));
          });
          static #t = (this.ɵprov = m.Yz7({ token: $, factory: $.ɵfac }));
        }
        return $;
      })();
      function hn($, x) {
        return x($);
      }
      function rt($, x) {
        return (F, ue) => x.intercept(F, { handle: ge => $(ge, ue) });
      }
      const Xt = new m.OlP(''),
        vt = new m.OlP(''),
        Ft = new m.OlP('');
      function Ue() {
        let $ = null;
        return (x, F) => {
          null === $ && ($ = ((0, m.f3M)(Xt, { optional: !0 }) ?? []).reduceRight(rt, hn));
          const ue = (0, m.f3M)(m.HDt),
            ge = ue.add();
          return $(x, F).pipe((0, Te.x)(() => ue.remove(ge)));
        };
      }
      let $t = (() => {
        class $ extends te {
          constructor(F, ue) {
            super(),
              (this.backend = F),
              (this.injector = ue),
              (this.chain = null),
              (this.pendingTasks = (0, m.f3M)(m.HDt));
          }
          handle(F) {
            if (null === this.chain) {
              const ge = Array.from(
                new Set([...this.injector.get(vt), ...this.injector.get(Ft, [])])
              );
              this.chain = ge.reduceRight(
                (Fe, Oe) =>
                  (function Ut($, x, F) {
                    return (ue, ge) => F.runInContext(() => x(ue, Fe => $(Fe, ge)));
                  })(Fe, Oe, this.injector),
                hn
              );
            }
            const ue = this.pendingTasks.add();
            return this.chain(F, ge => this.backend.handle(ge)).pipe(
              (0, Te.x)(() => this.pendingTasks.remove(ue))
            );
          }
          static #e = (this.ɵfac = function (ue) {
            return new (ue || $)(m.LFG(Ce), m.LFG(m.lqb));
          });
          static #t = (this.ɵprov = m.Yz7({ token: $, factory: $.ɵfac }));
        }
        return $;
      })();
      const nr = /^\)\]\}',?\n/;
      let Ur = (() => {
        class $ {
          constructor(F) {
            this.xhrFactory = F;
          }
          handle(F) {
            if ('JSONP' === F.method) throw new m.vHH(-2800, !1);
            const ue = this.xhrFactory;
            return (ue.ɵloadImpl ? (0, B.D)(ue.ɵloadImpl()) : (0, U.of)(null)).pipe(
              (0, se.w)(
                () =>
                  new ie.y(Fe => {
                    const Oe = ue.build();
                    if (
                      (Oe.open(F.method, F.urlWithParams),
                      F.withCredentials && (Oe.withCredentials = !0),
                      F.headers.forEach((ze, kt) => Oe.setRequestHeader(ze, kt.join(','))),
                      F.headers.has('Accept') ||
                        Oe.setRequestHeader('Accept', 'application/json, text/plain, */*'),
                      !F.headers.has('Content-Type'))
                    ) {
                      const ze = F.detectContentTypeHeader();
                      null !== ze && Oe.setRequestHeader('Content-Type', ze);
                    }
                    if (F.responseType) {
                      const ze = F.responseType.toLowerCase();
                      Oe.responseType = 'json' !== ze ? ze : 'text';
                    }
                    const At = F.serializeBody();
                    let dt = null;
                    const _n = () => {
                        if (null !== dt) return dt;
                        const ze = Oe.statusText || 'OK',
                          kt = new He(Oe.getAllResponseHeaders()),
                          On =
                            (function Nn($) {
                              return 'responseURL' in $ && $.responseURL
                                ? $.responseURL
                                : /^X-Request-URL:/m.test($.getAllResponseHeaders())
                                  ? $.getResponseHeader('X-Request-URL')
                                  : null;
                            })(Oe) || F.url;
                        return (
                          (dt = new fn({
                            headers: kt,
                            status: Oe.status,
                            statusText: ze,
                            url: On,
                          })),
                          dt
                        );
                      },
                      yr = () => {
                        let { headers: ze, status: kt, statusText: On, url: vr } = _n(),
                          yn = null;
                        204 !== kt &&
                          (yn = typeof Oe.response > 'u' ? Oe.responseText : Oe.response),
                          0 === kt && (kt = yn ? 200 : 0);
                        let wn = kt >= 200 && kt < 300;
                        if ('json' === F.responseType && 'string' == typeof yn) {
                          const or = yn;
                          yn = yn.replace(nr, '');
                          try {
                            yn = '' !== yn ? JSON.parse(yn) : null;
                          } catch (Dr) {
                            (yn = or), wn && ((wn = !1), (yn = { error: Dr, text: yn }));
                          }
                        }
                        wn
                          ? (Fe.next(
                              new Tn({
                                body: yn,
                                headers: ze,
                                status: kt,
                                statusText: On,
                                url: vr || void 0,
                              })
                            ),
                            Fe.complete())
                          : Fe.error(
                              new Tr({
                                error: yn,
                                headers: ze,
                                status: kt,
                                statusText: On,
                                url: vr || void 0,
                              })
                            );
                      },
                      Ht = ze => {
                        const { url: kt } = _n(),
                          On = new Tr({
                            error: ze,
                            status: Oe.status || 0,
                            statusText: Oe.statusText || 'Unknown Error',
                            url: kt || void 0,
                          });
                        Fe.error(On);
                      };
                    let un = !1;
                    const kn = ze => {
                        un || (Fe.next(_n()), (un = !0));
                        let kt = { type: ke.DownloadProgress, loaded: ze.loaded };
                        ze.lengthComputable && (kt.total = ze.total),
                          'text' === F.responseType &&
                            Oe.responseText &&
                            (kt.partialText = Oe.responseText),
                          Fe.next(kt);
                      },
                      gn = ze => {
                        let kt = { type: ke.UploadProgress, loaded: ze.loaded };
                        ze.lengthComputable && (kt.total = ze.total), Fe.next(kt);
                      };
                    return (
                      Oe.addEventListener('load', yr),
                      Oe.addEventListener('error', Ht),
                      Oe.addEventListener('timeout', Ht),
                      Oe.addEventListener('abort', Ht),
                      F.reportProgress &&
                        (Oe.addEventListener('progress', kn),
                        null !== At && Oe.upload && Oe.upload.addEventListener('progress', gn)),
                      Oe.send(At),
                      Fe.next({ type: ke.Sent }),
                      () => {
                        Oe.removeEventListener('error', Ht),
                          Oe.removeEventListener('abort', Ht),
                          Oe.removeEventListener('load', yr),
                          Oe.removeEventListener('timeout', Ht),
                          F.reportProgress &&
                            (Oe.removeEventListener('progress', kn),
                            null !== At &&
                              Oe.upload &&
                              Oe.upload.removeEventListener('progress', gn)),
                          Oe.readyState !== Oe.DONE && Oe.abort();
                      }
                    );
                  })
              )
            );
          }
          static #e = (this.ɵfac = function (ue) {
            return new (ue || $)(m.LFG(ye.JF));
          });
          static #t = (this.ɵprov = m.Yz7({ token: $, factory: $.ɵfac }));
        }
        return $;
      })();
      const Ze = new m.OlP('XSRF_ENABLED'),
        zt = new m.OlP('XSRF_COOKIE_NAME', { providedIn: 'root', factory: () => 'XSRF-TOKEN' }),
        St = new m.OlP('XSRF_HEADER_NAME', { providedIn: 'root', factory: () => 'X-XSRF-TOKEN' });
      class rr {}
      let qe = (() => {
        class $ {
          constructor(F, ue, ge) {
            (this.doc = F),
              (this.platform = ue),
              (this.cookieName = ge),
              (this.lastCookieString = ''),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ('server' === this.platform) return null;
            const F = this.doc.cookie || '';
            return (
              F !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = (0, ye.Mx)(F, this.cookieName)),
                (this.lastCookieString = F)),
              this.lastToken
            );
          }
          static #e = (this.ɵfac = function (ue) {
            return new (ue || $)(m.LFG(ye.K0), m.LFG(m.Lbi), m.LFG(zt));
          });
          static #t = (this.ɵprov = m.Yz7({ token: $, factory: $.ɵfac }));
        }
        return $;
      })();
      function qn($, x) {
        const F = $.url.toLowerCase();
        if (
          !(0, m.f3M)(Ze) ||
          'GET' === $.method ||
          'HEAD' === $.method ||
          F.startsWith('http://') ||
          F.startsWith('https://')
        )
          return x($);
        const ue = (0, m.f3M)(rr).getToken(),
          ge = (0, m.f3M)(St);
        return (
          null != ue && !$.headers.has(ge) && ($ = $.clone({ headers: $.headers.set(ge, ue) })),
          x($)
        );
      }
      var et = (function ($) {
        return (
          ($[($.Interceptors = 0)] = 'Interceptors'),
          ($[($.LegacyInterceptors = 1)] = 'LegacyInterceptors'),
          ($[($.CustomXsrfConfiguration = 2)] = 'CustomXsrfConfiguration'),
          ($[($.NoXsrfProtection = 3)] = 'NoXsrfProtection'),
          ($[($.JsonpSupport = 4)] = 'JsonpSupport'),
          ($[($.RequestsMadeViaParent = 5)] = 'RequestsMadeViaParent'),
          ($[($.Fetch = 6)] = 'Fetch'),
          $
        );
      })(et || {});
      function ln(...$) {
        const x = [
          V,
          Ur,
          $t,
          { provide: te, useExisting: $t },
          { provide: Ce, useExisting: Ur },
          { provide: vt, useValue: qn, multi: !0 },
          { provide: Ze, useValue: !0 },
          { provide: rr, useClass: qe },
        ];
        for (const F of $) x.push(...F.ɵproviders);
        return (0, m.MR2)(x);
      }
      const Qn = new m.OlP('LEGACY_INTERCEPTOR_FN');
      function $r() {
        return (function En($, x) {
          return { ɵkind: $, ɵproviders: x };
        })(et.LegacyInterceptors, [
          { provide: Qn, useFactory: Ue },
          { provide: vt, useExisting: Qn, multi: !0 },
        ]);
      }
      let L = (() => {
        class $ {
          static #e = (this.ɵfac = function (ue) {
            return new (ue || $)();
          });
          static #t = (this.ɵmod = m.oAB({ type: $ }));
          static #n = (this.ɵinj = m.cJS({ providers: [ln($r())] }));
        }
        return $;
      })();
    },
    4769: (We, fe, M) => {
      M.d(fe, {
        QbO: () => fE,
        tb: () => Ld,
        AFp: () => Eh,
        ip1: () => _y,
        hGG: () => RS,
        z2F: () => Hs,
        Ojb: () => hE,
        sBO: () => pS,
        Sil: () => Ob,
        EJc: () => Rb,
        Xts: () => pa,
        SBq: () => ya,
        lqb: () => Hi,
        qLn: () => _o,
        vpe: () => Ui,
        XFs: () => Ze,
        OlP: () => et,
        zs3: () => bi,
        ZZ4: () => $d,
        aQg: () => Vd,
        soG: () => su,
        YKP: () => Cm,
        h0i: () => Ko,
        PXZ: () => oS,
        R0b: () => tr,
        FiY: () => sl,
        Lbi: () => dc,
        g9A: () => Ch,
        Qsj: () => TE,
        FYo: () => Ih,
        JOm: () => pl,
        q3G: () => $o,
        tp0: () => al,
        Rgc: () => Fa,
        dDg: () => tS,
        eoX: () => Ry,
        GfV: () => Th,
        s_b: () => iu,
        ifc: () => kn,
        VuI: () => US,
        MMx: () => wm,
        Lck: () => v0,
        eFA: () => xy,
        Gpc: () => ve,
        f3M: () => ge,
        X6Q: () => hS,
        $WT: () => zr,
        MR2: () => ic,
        _c5: () => AS,
        qFp: () => VS,
        rg0: () => Pt,
        c2e: () => wy,
        zSh: () => ac,
        HDt: () => by,
        wAp: () => Ls,
        vHH: () => ne,
        lri: () => Ty,
        rWj: () => Ay,
        JZr: () => Se,
        EiD: () => uh,
        mCW: () => wl,
        qzn: () => gs,
        JVY: () => kD,
        pB0: () => UD,
        eBb: () => BD,
        L6k: () => jD,
        LAX: () => HD,
        cg1: () => ud,
        kL8: () => Wg,
        dqk: () => qe,
        Z0I: () => Vt,
        eJc: () => Md,
        QGY: () => Xc,
        F4k: () => Yp,
        RDi: () => RD,
        AaK: () => tt,
        z3N: () => no,
        qOj: () => Uc,
        Xq5: () => Tp,
        TTD: () => ur,
        _Bn: () => Em,
        jDz: () => bm,
        xp6: () => Jh,
        uIk: () => Vc,
        Tol: () => vg,
        ekj: () => od,
        Suo: () => ty,
        Xpm: () => Ao,
        lG2: () => Pi,
        Yz7: () => Jt,
        cJS: () => dr,
        oAB: () => uo,
        Yjl: () => Qi,
        Y36: () => ws,
        _UZ: () => Zc,
        BQk: () => ql,
        ynx: () => Yl,
        qZA: () => Kl,
        TgZ: () => Wl,
        EpF: () => Kp,
        n5z: () => hf,
        LFG: () => F,
        $8M: () => Pu,
        $Z: () => tp,
        NdJ: () => Jc,
        CRH: () => ny,
        oxw: () => Jp,
        ALo: () => Hm,
        lcZ: () => Um,
        Hsn: () => tg,
        F$t: () => eg,
        Q6J: () => qc,
        VKq: () => Pm,
        WLB: () => Nm,
        l5B: () => Om,
        qbA: () => xm,
        iGM: () => Jm,
        KtG: () => Ka,
        evT: () => Hh,
        CHM: () => Wa,
        oJD: () => ch,
        LSH: () => nc,
        P3R: () => fh,
        Udp: () => id,
        YNc: () => Up,
        _uU: () => Sg,
        Oqu: () => ad,
        Gf: () => ey,
      });
      var m = M(8645),
        U = M(7394),
        B = M(5592),
        ie = M(3019),
        Q = M(5619),
        q = M(2096),
        pe = M(4829),
        Te = M(305),
        se = M(9360);
      function ye(e = {}) {
        const {
          connector: t = () => new m.x(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: i = !0,
        } = e;
        return o => {
          let s,
            u,
            h,
            D = 0,
            S = !1,
            A = !1;
          const j = () => {
              u?.unsubscribe(), (u = void 0);
            },
            H = () => {
              j(), (s = h = void 0), (S = A = !1);
            },
            ce = () => {
              const _e = s;
              H(), _e?.unsubscribe();
            };
          return (0, se.e)((_e, xe) => {
            D++, !A && !S && j();
            const Ye = (h = h ?? t());
            xe.add(() => {
              D--, 0 === D && !A && !S && (u = te(ce, i));
            }),
              Ye.subscribe(xe),
              !s &&
                D > 0 &&
                ((s = new Te.Hp({
                  next: me => Ye.next(me),
                  error: me => {
                    (A = !0), j(), (u = te(H, n, me)), Ye.error(me);
                  },
                  complete: () => {
                    (S = !0), j(), (u = te(H, r)), Ye.complete();
                  },
                })),
                (0, pe.Xf)(_e).subscribe(s));
          })(o);
        };
      }
      function te(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new Te.Hp({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return (0, pe.Xf)(t(...n)).subscribe(r);
      }
      var Ce = M(4664),
        He = M(2737),
        Re = M(8251);
      function Et(e, t) {
        return e === t;
      }
      function Le(e) {
        for (let t in e) if (e[t] === Le) return t;
        throw Error('Could not find renamed property on target object.');
      }
      function lt(e, t) {
        for (const n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
      }
      function tt(e) {
        if ('string' == typeof e) return e;
        if (Array.isArray(e)) return '[' + e.map(tt).join(', ') + ']';
        if (null == e) return '' + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return '' + t;
        const n = t.indexOf('\n');
        return -1 === n ? t : t.substring(0, n);
      }
      function Ke(e, t) {
        return null == e || '' === e
          ? null === t
            ? ''
            : t
          : null == t || '' === t
            ? e
            : e + ' ' + t;
      }
      const K = Le({ __forward_ref__: Le });
      function ve(e) {
        return (
          (e.__forward_ref__ = ve),
          (e.toString = function () {
            return tt(this());
          }),
          e
        );
      }
      function he(e) {
        return Ie(e) ? e() : e;
      }
      function Ie(e) {
        return 'function' == typeof e && e.hasOwnProperty(K) && e.__forward_ref__ === ve;
      }
      function we(e) {
        return e && !!e.ɵproviders;
      }
      const Se = 'https://g.co/ng/security#xss';
      class ne extends Error {
        constructor(t, n) {
          super(
            (function yt(e, t) {
              return `NG0${Math.abs(e)}${t ? ': ' + t : ''}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function ke(e) {
        return 'string' == typeof e ? e : null == e ? '' : String(e);
      }
      function An(e, t) {
        throw new ne(-201, !1);
      }
      function Ft(e, t) {
        null == e &&
          (function Ue(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` + (null == r ? '' : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, '!=');
      }
      function Jt(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function dr(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Yn(e) {
        return Rn(e, Rr) || Rn(e, Nn);
      }
      function Vt(e) {
        return null !== Yn(e);
      }
      function Rn(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function at(e) {
        return e && (e.hasOwnProperty(nr) || e.hasOwnProperty(Ur)) ? e[nr] : null;
      }
      const Rr = Le({ ɵprov: Le }),
        nr = Le({ ɵinj: Le }),
        Nn = Le({ ngInjectableDef: Le }),
        Ur = Le({ ngInjectorDef: Le });
      var Ze = (function (e) {
        return (
          (e[(e.Default = 0)] = 'Default'),
          (e[(e.Host = 1)] = 'Host'),
          (e[(e.Self = 2)] = 'Self'),
          (e[(e.SkipSelf = 4)] = 'SkipSelf'),
          (e[(e.Optional = 8)] = 'Optional'),
          e
        );
      })(Ze || {});
      let Pr;
      function pn(e) {
        const t = Pr;
        return (Pr = e), t;
      }
      function St(e, t, n) {
        const r = Yn(e);
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & Ze.Optional
            ? null
            : void 0 !== t
              ? t
              : void An(tt(e));
      }
      const qe = globalThis;
      class et {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = Jt({
                  token: this,
                  providedIn: n.providedIn || 'root',
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const L = {},
        le = '__NG_DI_FLAG__',
        je = 'ngTempTokenPath',
        Lt = /\n/gm,
        Qt = '__source';
      let Cn;
      function $(e) {
        const t = Cn;
        return (Cn = e), t;
      }
      function x(e, t = Ze.Default) {
        if (void 0 === Cn) throw new ne(-203, !1);
        return null === Cn ? St(e, void 0, t) : Cn.get(e, t & Ze.Optional ? null : void 0, t);
      }
      function F(e, t = Ze.Default) {
        return (
          (function zt() {
            return Pr;
          })() || x
        )(he(e), t);
      }
      function ge(e, t = Ze.Default) {
        return F(e, Fe(t));
      }
      function Fe(e) {
        return typeof e > 'u' || 'number' == typeof e
          ? e
          : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
      }
      function Oe(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = he(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new ne(900, !1);
            let i,
              o = Ze.Default;
            for (let s = 0; s < r.length; s++) {
              const u = r[s],
                h = dt(u);
              'number' == typeof h ? (-1 === h ? (i = u.token) : (o |= h)) : (i = u);
            }
            t.push(F(i, o));
          } else t.push(F(r));
        }
        return t;
      }
      function At(e, t) {
        return (e[le] = t), (e.prototype[le] = t), e;
      }
      function dt(e) {
        return e[le];
      }
      function Ht(e) {
        return { toString: e }.toString();
      }
      var un = (function (e) {
          return (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e;
        })(un || {}),
        kn = (function (e) {
          return (
            (e[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            e
          );
        })(kn || {});
      const gn = {},
        ze = [],
        kt = Le({ ɵcmp: Le }),
        On = Le({ ɵdir: Le }),
        vr = Le({ ɵpipe: Le }),
        yn = Le({ ɵmod: Le }),
        wn = Le({ ɵfac: Le }),
        or = Le({ __NG_ELEMENT_ID__: Le }),
        Dr = Le({ __NG_ENV_ID__: Le });
      function Ti(e, t, n) {
        let r = e.length;
        for (;;) {
          const i = e.indexOf(t, n);
          if (-1 === i) return i;
          if (0 === i || e.charCodeAt(i - 1) <= 32) {
            const o = t.length;
            if (i + o === r || e.charCodeAt(i + o) <= 32) return i;
          }
          n = i + 1;
        }
      }
      function ei(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if ('number' == typeof i) {
            if (0 !== i) break;
            r++;
            const o = n[r++],
              s = n[r++],
              u = n[r++];
            e.setAttribute(t, s, u, o);
          } else {
            const o = i,
              s = n[++r];
            di(o) ? e.setProperty(t, o, s) : e.setAttribute(t, o, s), r++;
          }
        }
        return r;
      }
      function Wi(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function di(e) {
        return 64 === e.charCodeAt(0);
      }
      function Nr(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const i = t[r];
              'number' == typeof i
                ? (n = i)
                : 0 === n || Xn(e, n, i, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Xn(e, t, n, r, i) {
        let o = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; o < e.length; ) {
            const u = e[o++];
            if ('number' == typeof u) {
              if (u === t) {
                s = -1;
                break;
              }
              if (u > t) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < e.length; ) {
          const u = e[o];
          if ('number' == typeof u) break;
          if (u === n) {
            if (null === r) return void (null !== i && (e[o + 1] = i));
            if (r === e[o + 1]) return void (e[o + 2] = i);
          }
          o++, null !== r && o++, null !== i && o++;
        }
        -1 !== s && (e.splice(s, 0, t), (o = s + 1)),
          e.splice(o++, 0, n),
          null !== r && e.splice(o++, 0, r),
          null !== i && e.splice(o++, 0, i);
      }
      const Hn = 'ng-template';
      function fi(e, t, n) {
        let r = 0,
          i = !0;
        for (; r < e.length; ) {
          let o = e[r++];
          if ('string' == typeof o && i) {
            const s = e[r++];
            if (n && 'class' === o && -1 !== Ti(s.toLowerCase(), t, 0)) return !0;
          } else {
            if (1 === o) {
              for (; r < e.length && 'string' == typeof (o = e[r++]); )
                if (o.toLowerCase() === t) return !0;
              return !1;
            }
            'number' == typeof o && (i = !1);
          }
        }
        return !1;
      }
      function Un(e) {
        return 4 === e.type && e.value !== Hn;
      }
      function hi(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Hn);
      }
      function Vr(e, t, n) {
        let r = 4;
        const i = e.attrs || [],
          o = (function Mo(e) {
            for (let t = 0; t < e.length; t++) if (Wi(e[t])) return t;
            return e.length;
          })(i);
        let s = !1;
        for (let u = 0; u < t.length; u++) {
          const h = t[u];
          if ('number' != typeof h) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)), ('' !== h && !hi(e, h, n)) || ('' === h && 1 === t.length))
                ) {
                  if (xn(r)) return !1;
                  s = !0;
                }
              } else {
                const D = 8 & r ? h : t[++u];
                if (8 & r && null !== e.attrs) {
                  if (!fi(e.attrs, D, n)) {
                    if (xn(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const A = So(8 & r ? 'class' : h, i, Un(e), n);
                if (-1 === A) {
                  if (xn(r)) return !1;
                  s = !0;
                  continue;
                }
                if ('' !== D) {
                  let j;
                  j = A > o ? '' : i[A + 1].toLowerCase();
                  const H = 8 & r ? j : null;
                  if ((H && -1 !== Ti(H, D, 0)) || (2 & r && D !== j)) {
                    if (xn(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !xn(r) && !xn(h)) return !1;
            if (s && xn(h)) continue;
            (s = !1), (r = h | (1 & r));
          }
        }
        return xn(r) || s;
      }
      function xn(e) {
        return 0 == (1 & e);
      }
      function So(e, t, n, r) {
        if (null === t) return -1;
        let i = 0;
        if (r || !n) {
          let o = !1;
          for (; i < t.length; ) {
            const s = t[i];
            if (s === e) return i;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let u = t[++i];
                for (; 'string' == typeof u; ) u = t[++i];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                i += 4;
                continue;
              }
            }
            i += o ? 1 : 2;
          }
          return -1;
        }
        return (function Ai(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ('number' == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function Jn(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (Vr(e, t[r], n)) return !0;
        return !1;
      }
      function Yi(e, t) {
        e: for (let n = 0; n < t.length; n++) {
          const r = t[n];
          if (e.length === r.length) {
            for (let i = 0; i < e.length; i++) if (e[i] !== r[i]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function pi(e, t) {
        return e ? ':not(' + t.trim() + ')' : t;
      }
      function Io(e) {
        let t = e[0],
          n = 1,
          r = 2,
          i = '',
          o = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ('string' == typeof s)
            if (2 & r) {
              const u = e[++n];
              i += '[' + s + (u.length > 0 ? '="' + u + '"' : '') + ']';
            } else 8 & r ? (i += '.' + s) : 4 & r && (i += ' ' + s);
          else '' !== i && !xn(s) && ((t += pi(o, i)), (i = '')), (r = s), (o = o || !xn(r));
          n++;
        }
        return '' !== i && (t += pi(o, i)), t;
      }
      function Ao(e) {
        return Ht(() => {
          const t = fo(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === un.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || kn.Emulated,
              styles: e.styles || ze,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: '',
            };
          sr(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = Gr(r, !1)),
            (n.pipeDefs = Gr(r, !0)),
            (n.id = (function Ni(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join('|');
              for (const i of n) t = (Math.imul(31, t) + i.charCodeAt(0)) << 0;
              return (t += 2147483648), 'c' + t;
            })(n)),
            n
          );
        });
      }
      function lo(e) {
        return _t(e) || Yt(e);
      }
      function qi(e) {
        return null !== e;
      }
      function uo(e) {
        return Ht(() => ({
          type: e.type,
          bootstrap: e.bootstrap || ze,
          declarations: e.declarations || ze,
          imports: e.imports || ze,
          exports: e.exports || ze,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function Or(e, t) {
        if (null == e) return gn;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let i = e[r],
              o = i;
            Array.isArray(i) && ((o = i[1]), (i = i[0])), (n[i] = r), t && (t[i] = o);
          }
        return n;
      }
      function Pi(e) {
        return Ht(() => {
          const t = fo(e);
          return sr(t), t;
        });
      }
      function Qi(e) {
        return {
          type: e.type,
          name: e.name,
          factory: null,
          pure: !1 !== e.pure,
          standalone: !0 === e.standalone,
          onDestroy: e.type.prototype.ngOnDestroy || null,
        };
      }
      function _t(e) {
        return e[kt] || null;
      }
      function Yt(e) {
        return e[On] || null;
      }
      function sn(e) {
        return e[vr] || null;
      }
      function zr(e) {
        const t = _t(e) || Yt(e) || sn(e);
        return null !== t && t.standalone;
      }
      function jn(e, t) {
        const n = e[yn] || null;
        if (!n && !0 === t) throw new Error(`Type ${tt(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function fo(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || gn,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || ze,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Or(e.inputs, t),
          outputs: Or(e.outputs),
        };
      }
      function sr(e) {
        e.features?.forEach(t => t(e));
      }
      function Gr(e, t) {
        if (!e) return null;
        const n = t ? sn : lo;
        return () => ('function' == typeof e ? e() : e).map(r => n(r)).filter(qi);
      }
      const en = 0,
        Ne = 1,
        ut = 2,
        Gt = 3,
        $n = 4,
        Wr = 5,
        bn = 6,
        xr = 7,
        Nt = 8,
        Er = 9,
        Bn = 10,
        it = 11,
        gi = 12,
        Zi = 13,
        Cr = 14,
        an = 15,
        Kr = 16,
        _r = 17,
        ar = 18,
        ti = 19,
        ho = 20,
        lr = 21,
        mn = 22,
        Fr = 23,
        mi = 24,
        wt = 25,
        po = 1,
        yi = 2,
        tn = 7,
        wr = 9,
        Sn = 11;
      function Fn(e) {
        return Array.isArray(e) && 'object' == typeof e[po];
      }
      function vn(e) {
        return Array.isArray(e) && !0 === e[po];
      }
      function go(e) {
        return 0 != (4 & e.flags);
      }
      function Yr(e) {
        return e.componentOffset > -1;
      }
      function br(e) {
        return 1 == (1 & e.flags);
      }
      function Pn(e) {
        return !!e.template;
      }
      function Di(e) {
        return 0 != (512 & e[ut]);
      }
      function T(e, t) {
        return e.hasOwnProperty(wn) ? e[wn] : null;
      }
      let ee = null,
        Ae = !1;
      function Pe(e) {
        const t = ee;
        return (ee = e), t;
      }
      const bt = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      };
      function Je(e) {
        if (!er(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !Dn(e)) return void (e.dirty = !1);
          e.producerRecomputeValue(e), (e.dirty = !1);
        }
      }
      function on(e) {
        (e.dirty = !0),
          (function ot(e) {
            if (void 0 === e.liveConsumerNode) return;
            const t = Ae;
            Ae = !0;
            try {
              for (const n of e.liveConsumerNode) n.dirty || on(n);
            } finally {
              Ae = t;
            }
          })(e),
          e.consumerMarkedDirty?.(e);
      }
      function cn(e) {
        return e && (e.nextProducerIndex = 0), Pe(e);
      }
      function Mn(e, t) {
        if (
          (Pe(t),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (er(e))
            for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
              dn(e.producerNode[n], e.producerIndexOfThis[n]);
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop();
        }
      }
      function Dn(e) {
        Vn(e);
        for (let t = 0; t < e.producerNode.length; t++) {
          const n = e.producerNode[t],
            r = e.producerLastReadVersion[t];
          if (r !== n.version || (Je(n), r !== n.version)) return !0;
        }
        return !1;
      }
      function ni(e) {
        if ((Vn(e), er(e)))
          for (let t = 0; t < e.producerNode.length; t++)
            dn(e.producerNode[t], e.producerIndexOfThis[t]);
        (e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
      }
      function dn(e, t) {
        if (
          ((function Sr(e) {
            (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
          })(e),
          Vn(e),
          1 === e.liveConsumerNode.length)
        )
          for (let r = 0; r < e.producerNode.length; r++)
            dn(e.producerNode[r], e.producerIndexOfThis[r]);
        const n = e.liveConsumerNode.length - 1;
        if (
          ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
          (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          t < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[t],
            i = e.liveConsumerNode[t];
          Vn(i), (i.producerIndexOfThis[r] = t);
        }
      }
      function er(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
      }
      function Vn(e) {
        (e.producerNode ??= []), (e.producerIndexOfThis ??= []), (e.producerLastReadVersion ??= []);
      }
      let d = null;
      function Pt(e) {
        const t = Pe(null);
        try {
          return e();
        } finally {
          Pe(t);
        }
      }
      const Zt = () => {},
        qr = (() => ({
          ...bt,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: e => {
            e.schedule(e.ref);
          },
          hasRun: !1,
          cleanupFn: Zt,
        }))();
      class Li {
        constructor(t, n, r) {
          (this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function ur() {
        return ri;
      }
      function ri(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = Zr), _i;
      }
      function _i() {
        const e = Ba(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === gn) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function Zr(e, t, n, r) {
        const i = this.declaredInputs[n],
          o =
            Ba(e) ||
            (function xo(e, t) {
              return (e[ja] = t);
            })(e, { previous: gn, current: null }),
          s = o.current || (o.current = {}),
          u = o.previous,
          h = u[i];
        (s[i] = new Li(h && h.currentValue, t, u === gn)), (e[r] = t);
      }
      ur.ngInherit = !0;
      const ja = '__ngSimpleChanges__';
      function Ba(e) {
        return e[ja] || null;
      }
      const ii = function (e, t, n) {};
      function Mt(e) {
        for (; Array.isArray(e); ) e = e[en];
        return e;
      }
      function Fo(e, t) {
        return Mt(t[e]);
      }
      function zn(e, t) {
        return Mt(t[e.index]);
      }
      function Va(e, t) {
        return e.data[t];
      }
      function Lr(e, t) {
        const n = t[e];
        return Fn(n) ? n : n[en];
      }
      function wi(e, t) {
        return null == t ? null : e[t];
      }
      function pu(e) {
        e[_r] = 0;
      }
      function za(e) {
        1024 & e[ut] || ((e[ut] |= 1024), Ga(e, 1));
      }
      function oi(e) {
        1024 & e[ut] && ((e[ut] &= -1025), Ga(e, -1));
      }
      function Ga(e, t) {
        let n = e[Gt];
        if (null === n) return;
        n[Wr] += t;
        let r = n;
        for (n = n[Gt]; null !== n && ((1 === t && 1 === r[Wr]) || (-1 === t && 0 === r[Wr])); )
          (n[Wr] += t), (r = n), (n = n[Gt]);
      }
      const ft = { lFrame: Bt(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
      function Du() {
        return ft.bindingsEnabled;
      }
      function eo() {
        return null !== ft.skipHydrationRootTNode;
      }
      function Ee() {
        return ft.lFrame.lView;
      }
      function xt() {
        return ft.lFrame.tView;
      }
      function Wa(e) {
        return (ft.lFrame.contextLView = e), e[Nt];
      }
      function Ka(e) {
        return (ft.lFrame.contextLView = null), e;
      }
      function Gn() {
        let e = Ya();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Ya() {
        return ft.lFrame.currentTNode;
      }
      function si(e, t) {
        const n = ft.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Xs() {
        return ft.lFrame.isParent;
      }
      function Js() {
        ft.lFrame.isParent = !1;
      }
      function hr() {
        const e = ft.lFrame;
        let t = e.bindingRootIndex;
        return -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
      }
      function ko() {
        return ft.lFrame.bindingIndex++;
      }
      function ji(e) {
        const t = ft.lFrame,
          n = t.bindingIndex;
        return (t.bindingIndex = t.bindingIndex + e), n;
      }
      function l(e, t) {
        const n = ft.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), E(t);
      }
      function E(e) {
        ft.lFrame.currentDirectiveIndex = e;
      }
      function P() {
        return ft.lFrame.currentQueryIndex;
      }
      function Z(e) {
        ft.lFrame.currentQueryIndex = e;
      }
      function Y(e) {
        const t = e[Ne];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[bn] : null;
      }
      function Be(e, t, n) {
        if (n & Ze.SkipSelf) {
          let i = t,
            o = e;
          for (
            ;
            !((i = i.parent),
            null !== i || n & Ze.Host || ((i = Y(o)), null === i || ((o = o[Cr]), 10 & i.type)));

          );
          if (null === i) return !1;
          (t = i), (e = o);
        }
        const r = (ft.lFrame = nn());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function pt(e) {
        const t = nn(),
          n = e[Ne];
        (ft.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function nn() {
        const e = ft.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Bt(e) : t;
      }
      function Bt(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function ai() {
        const e = ft.lFrame;
        return (ft.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
      }
      const Do = ai;
      function to() {
        const e = ai();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function cr() {
        return ft.lFrame.selectedIndex;
      }
      function jo(e) {
        ft.lFrame.selectedIndex = e;
      }
      function In() {
        const e = ft.lFrame;
        return Va(e.tView, e.selectedIndex);
      }
      let Jd = !0;
      function Qa() {
        return Jd;
      }
      function Co(e) {
        Jd = e;
      }
      function Za(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const o = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: u,
              ngAfterViewInit: h,
              ngAfterViewChecked: D,
              ngOnDestroy: S,
            } = o;
          s && (e.contentHooks ??= []).push(-n, s),
            u && ((e.contentHooks ??= []).push(n, u), (e.contentCheckHooks ??= []).push(n, u)),
            h && (e.viewHooks ??= []).push(-n, h),
            D && ((e.viewHooks ??= []).push(n, D), (e.viewCheckHooks ??= []).push(n, D)),
            null != S && (e.destroyHooks ??= []).push(n, S);
        }
      }
      function Xa(e, t, n) {
        ef(e, t, 3, n);
      }
      function Ja(e, t, n, r) {
        (3 & e[ut]) === n && ef(e, t, n, r);
      }
      function bu(e, t) {
        let n = e[ut];
        (3 & n) === t && ((n &= 8191), (n += 1), (e[ut] = n));
      }
      function ef(e, t, n, r) {
        const o = r ?? -1,
          s = t.length - 1;
        let u = 0;
        for (let h = void 0 !== r ? 65535 & e[_r] : 0; h < s; h++)
          if ('number' == typeof t[h + 1]) {
            if (((u = t[h]), null != r && u >= r)) break;
          } else
            t[h] < 0 && (e[_r] += 65536),
              (u < o || -1 == o) && (dv(e, n, t, h), (e[_r] = (4294901760 & e[_r]) + h + 2)),
              h++;
      }
      function tf(e, t) {
        ii(4, e, t);
        const n = Pe(null);
        try {
          t.call(e);
        } finally {
          Pe(n), ii(5, e, t);
        }
      }
      function dv(e, t, n, r) {
        const i = n[r] < 0,
          o = n[r + 1],
          u = e[i ? -n[r] : n[r]];
        i
          ? e[ut] >> 13 < e[_r] >> 16 && (3 & e[ut]) === t && ((e[ut] += 8192), tf(u, o))
          : tf(u, o);
      }
      const ns = -1;
      class ta {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Mu(e) {
        return e !== ns;
      }
      function na(e) {
        return 32767 & e;
      }
      function ra(e, t) {
        let n = (function gv(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[Cr]), n--;
        return r;
      }
      let Iu = !0;
      function el(e) {
        const t = Iu;
        return (Iu = e), t;
      }
      const nf = 255,
        rf = 5;
      let mv = 0;
      const Bi = {};
      function tl(e, t) {
        const n = sf(e, t);
        if (-1 !== n) return n;
        const r = t[Ne];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length), Tu(r.data, e), Tu(t, null), Tu(r.blueprint, null));
        const i = nl(e, t),
          o = e.injectorIndex;
        if (Mu(i)) {
          const s = na(i),
            u = ra(i, t),
            h = u[Ne].data;
          for (let D = 0; D < 8; D++) t[o + D] = u[s + D] | h[s + D];
        }
        return (t[o + 8] = i), o;
      }
      function Tu(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function sf(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function nl(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
        let n = 0,
          r = null,
          i = t;
        for (; null !== i; ) {
          if (((r = pf(i)), null === r)) return ns;
          if ((n++, (i = i[Cr]), -1 !== r.injectorIndex)) return r.injectorIndex | (n << 16);
        }
        return ns;
      }
      function Au(e, t, n) {
        !(function yv(e, t, n) {
          let r;
          'string' == typeof n ? (r = n.charCodeAt(0) || 0) : n.hasOwnProperty(or) && (r = n[or]),
            null == r && (r = n[or] = mv++);
          const i = r & nf;
          t.data[e + (i >> rf)] |= 1 << i;
        })(e, t, n);
      }
      function af(e, t, n) {
        if (n & Ze.Optional || void 0 !== e) return e;
        An();
      }
      function lf(e, t, n, r) {
        if ((n & Ze.Optional && void 0 === r && (r = null), !(n & (Ze.Self | Ze.Host)))) {
          const i = e[Er],
            o = pn(void 0);
          try {
            return i ? i.get(t, r, n & Ze.Optional) : St(t, r, n & Ze.Optional);
          } finally {
            pn(o);
          }
        }
        return af(r, 0, n);
      }
      function uf(e, t, n, r = Ze.Default, i) {
        if (null !== e) {
          if (2048 & t[ut] && !(r & Ze.Self)) {
            const s = (function wv(e, t, n, r, i) {
              let o = e,
                s = t;
              for (; null !== o && null !== s && 2048 & s[ut] && !(512 & s[ut]); ) {
                const u = cf(o, s, n, r | Ze.Self, Bi);
                if (u !== Bi) return u;
                let h = o.parent;
                if (!h) {
                  const D = s[ho];
                  if (D) {
                    const S = D.get(n, Bi, r);
                    if (S !== Bi) return S;
                  }
                  (h = pf(s)), (s = s[Cr]);
                }
                o = h;
              }
              return i;
            })(e, t, n, r, Bi);
            if (s !== Bi) return s;
          }
          const o = cf(e, t, n, r, Bi);
          if (o !== Bi) return o;
        }
        return lf(t, n, r, i);
      }
      function cf(e, t, n, r, i) {
        const o = (function Ev(e) {
          if ('string' == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(or) ? e[or] : void 0;
          return 'number' == typeof t ? (t >= 0 ? t & nf : _v) : t;
        })(n);
        if ('function' == typeof o) {
          if (!Be(t, e, r)) return r & Ze.Host ? af(i, 0, r) : lf(t, n, r, i);
          try {
            let s;
            if (((s = o(r)), null != s || r & Ze.Optional)) return s;
            An();
          } finally {
            Do();
          }
        } else if ('number' == typeof o) {
          let s = null,
            u = sf(e, t),
            h = ns,
            D = r & Ze.Host ? t[an][bn] : null;
          for (
            (-1 === u || r & Ze.SkipSelf) &&
            ((h = -1 === u ? nl(e, t) : t[u + 8]),
            h !== ns && ff(r, !1) ? ((s = t[Ne]), (u = na(h)), (t = ra(h, t))) : (u = -1));
            -1 !== u;

          ) {
            const S = t[Ne];
            if (df(o, u, S.data)) {
              const A = Dv(u, t, n, s, r, D);
              if (A !== Bi) return A;
            }
            (h = t[u + 8]),
              h !== ns && ff(r, t[Ne].data[u + 8] === D) && df(o, u, t)
                ? ((s = S), (u = na(h)), (t = ra(h, t)))
                : (u = -1);
          }
        }
        return i;
      }
      function Dv(e, t, n, r, i, o) {
        const s = t[Ne],
          u = s.data[e + 8],
          S = rl(
            u,
            s,
            n,
            null == r ? Yr(u) && Iu : r != s && 0 != (3 & u.type),
            i & Ze.Host && o === u
          );
        return null !== S ? Bo(t, s, S, u) : Bi;
      }
      function rl(e, t, n, r, i) {
        const o = e.providerIndexes,
          s = t.data,
          u = 1048575 & o,
          h = e.directiveStart,
          S = o >> 20,
          j = i ? u + S : e.directiveEnd;
        for (let H = r ? u : u + S; H < j; H++) {
          const ce = s[H];
          if ((H < h && n === ce) || (H >= h && ce.type === n)) return H;
        }
        if (i) {
          const H = s[h];
          if (H && Pn(H) && H.type === n) return h;
        }
        return null;
      }
      function Bo(e, t, n, r) {
        let i = e[n];
        const o = t.data;
        if (
          (function fv(e) {
            return e instanceof ta;
          })(i)
        ) {
          const s = i;
          s.resolving &&
            (function fn(e, t) {
              const n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : '';
              throw new ne(-200, `Circular dependency in DI detected for ${e}${n}`);
            })(
              (function Ve(e) {
                return 'function' == typeof e
                  ? e.name || e.toString()
                  : 'object' == typeof e && null != e && 'function' == typeof e.type
                    ? e.type.name || e.type.toString()
                    : ke(e);
              })(o[n])
            );
          const u = el(s.canSeeViewProviders);
          s.resolving = !0;
          const D = s.injectImpl ? pn(s.injectImpl) : null;
          Be(e, r, Ze.Default);
          try {
            (i = e[n] = s.factory(void 0, o, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function cv(e, t, n) {
                  const { ngOnChanges: r, ngOnInit: i, ngDoCheck: o } = t.type.prototype;
                  if (r) {
                    const s = ri(t);
                    (n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s);
                  }
                  i && (n.preOrderHooks ??= []).push(0 - e, i),
                    o &&
                      ((n.preOrderHooks ??= []).push(e, o),
                      (n.preOrderCheckHooks ??= []).push(e, o));
                })(n, o[n], t);
          } finally {
            null !== D && pn(D), el(u), (s.resolving = !1), Do();
          }
        }
        return i;
      }
      function df(e, t, n) {
        return !!(n[t + (e >> rf)] & (1 << e));
      }
      function ff(e, t) {
        return !(e & Ze.Self || (e & Ze.Host && t));
      }
      class Mr {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return uf(this._tNode, this._lView, t, Fe(r), n);
        }
      }
      function _v() {
        return new Mr(Gn(), Ee());
      }
      function hf(e) {
        return Ht(() => {
          const t = e.prototype.constructor,
            n = t[wn] || Ru(t),
            r = Object.prototype;
          let i = Object.getPrototypeOf(e.prototype).constructor;
          for (; i && i !== r; ) {
            const o = i[wn] || Ru(i);
            if (o && o !== n) return o;
            i = Object.getPrototypeOf(i);
          }
          return o => new o();
        });
      }
      function Ru(e) {
        return Ie(e)
          ? () => {
              const t = Ru(he(e));
              return t && t();
            }
          : T(e);
      }
      function pf(e) {
        const t = e[Ne],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[bn] : null;
      }
      function Pu(e) {
        return (function vv(e, t) {
          if ('class' === t) return e.classes;
          if ('style' === t) return e.styles;
          const n = e.attrs;
          if (n) {
            const r = n.length;
            let i = 0;
            for (; i < r; ) {
              const o = n[i];
              if (Wi(o)) break;
              if (0 === o) i += 2;
              else if ('number' == typeof o) for (i++; i < r && 'string' == typeof n[i]; ) i++;
              else {
                if (o === t) return n[i + 1];
                i += 2;
              }
            }
          }
          return null;
        })(Gn(), e);
      }
      const is = '__parameters__';
      function ss(e, t, n) {
        return Ht(() => {
          const r = (function Nu(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const i in r) this[i] = r[i];
              }
            };
          })(t);
          function i(...o) {
            if (this instanceof i) return r.apply(this, o), this;
            const s = new i(...o);
            return (u.annotation = s), u;
            function u(h, D, S) {
              const A = h.hasOwnProperty(is)
                ? h[is]
                : Object.defineProperty(h, is, { value: [] })[is];
              for (; A.length <= S; ) A.push(null);
              return (A[S] = A[S] || []).push(s), h;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = e),
            (i.annotationCls = i),
            i
          );
        });
      }
      function ls(e, t) {
        e.forEach(n => (Array.isArray(n) ? ls(n, t) : t(n)));
      }
      function mf(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function il(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function sa(e, t) {
        const n = [];
        for (let r = 0; r < e; r++) n.push(t);
        return n;
      }
      function Xr(e, t, n) {
        let r = us(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function Rv(e, t, n, r) {
                let i = e.length;
                if (i == t) e.push(n, r);
                else if (1 === i) e.push(r, e[0]), (e[0] = n);
                else {
                  for (i--, e.push(e[i - 1], e[i]); i > t; ) (e[i] = e[i - 2]), i--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function Ou(e, t) {
        const n = us(e, t);
        if (n >= 0) return e[1 | n];
      }
      function us(e, t) {
        return (function yf(e, t, n) {
          let r = 0,
            i = e.length >> n;
          for (; i !== r; ) {
            const o = r + ((i - r) >> 1),
              s = e[o << n];
            if (t === s) return o << n;
            s > t ? (i = o) : (r = o + 1);
          }
          return ~(i << n);
        })(e, t, 1);
      }
      const sl = At(ss('Optional'), 8),
        al = At(ss('SkipSelf'), 4);
      function fl(e) {
        return 128 == (128 & e.flags);
      }
      var pl = (function (e) {
        return (e[(e.Important = 1)] = 'Important'), (e[(e.DashCase = 2)] = 'DashCase'), e;
      })(pl || {});
      const Zv = /^>|^->|<!--|-->|--!>|<!-$/g,
        Xv = /(<|>)/g,
        Jv = '\u200b$1\u200b';
      const ju = new Map();
      let eD = 0;
      const Hu = '__ngContext__';
      function pr(e, t) {
        Fn(t)
          ? ((e[Hu] = t[ti]),
            (function nD(e) {
              ju.set(e[ti], e);
            })(t))
          : (e[Hu] = t);
      }
      let Uu;
      function $u(e, t) {
        return Uu(e, t);
      }
      function ua(e) {
        const t = e[Gt];
        return vn(t) ? t[Gt] : t;
      }
      function kf(e) {
        return Bf(e[gi]);
      }
      function jf(e) {
        return Bf(e[$n]);
      }
      function Bf(e) {
        for (; null !== e && !vn(e); ) e = e[$n];
        return e;
      }
      function fs(e, t, n, r, i) {
        if (null != r) {
          let o,
            s = !1;
          vn(r) ? (o = r) : Fn(r) && ((s = !0), (r = r[en]));
          const u = Mt(r);
          0 === e && null !== n
            ? null == i
              ? Vf(t, n, u)
              : Ho(t, n, u, i || null, !0)
            : 1 === e && null !== n
              ? Ho(t, n, u, i || null, !0)
              : 2 === e
                ? (function El(e, t, n) {
                    const r = vl(e, t);
                    r &&
                      (function CD(e, t, n, r) {
                        e.removeChild(t, n, r);
                      })(e, r, t, n);
                  })(t, u, s)
                : 3 === e && t.destroyNode(u),
            null != o &&
              (function bD(e, t, n, r, i) {
                const o = n[tn];
                o !== Mt(n) && fs(t, e, r, o, i);
                for (let u = Sn; u < n.length; u++) {
                  const h = n[u];
                  da(h[Ne], h, e, t, r, o);
                }
              })(t, e, o, n, i);
        }
      }
      function Vu(e, t) {
        return e.createComment(
          (function Af(e) {
            return e.replace(Zv, t => t.replace(Xv, Jv));
          })(t)
        );
      }
      function ml(e, t, n) {
        return e.createElement(t, n);
      }
      function Uf(e, t) {
        const n = e[wr],
          r = n.indexOf(t);
        oi(t), n.splice(r, 1);
      }
      function yl(e, t) {
        if (e.length <= Sn) return;
        const n = Sn + t,
          r = e[n];
        if (r) {
          const i = r[Kr];
          null !== i && i !== e && Uf(i, r), t > 0 && (e[n - 1][$n] = r[$n]);
          const o = il(e, Sn + t);
          !(function hD(e, t) {
            da(e, t, t[it], 2, null, null), (t[en] = null), (t[bn] = null);
          })(r[Ne], r);
          const s = o[ar];
          null !== s && s.detachView(o[Ne]), (r[Gt] = null), (r[$n] = null), (r[ut] &= -129);
        }
        return r;
      }
      function zu(e, t) {
        if (!(256 & t[ut])) {
          const n = t[it];
          t[Fr] && ni(t[Fr]),
            t[mi] && ni(t[mi]),
            n.destroyNode && da(e, t, n, 3, null, null),
            (function mD(e) {
              let t = e[gi];
              if (!t) return Gu(e[Ne], e);
              for (; t; ) {
                let n = null;
                if (Fn(t)) n = t[gi];
                else {
                  const r = t[Sn];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[$n] && t !== e; ) Fn(t) && Gu(t[Ne], t), (t = t[Gt]);
                  null === t && (t = e), Fn(t) && Gu(t[Ne], t), (n = t && t[$n]);
                }
                t = n;
              }
            })(t);
        }
      }
      function Gu(e, t) {
        if (!(256 & t[ut])) {
          (t[ut] &= -129),
            (t[ut] |= 256),
            (function ED(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = t[n[r]];
                  if (!(i instanceof ta)) {
                    const o = n[r + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const u = i[o[s]],
                          h = o[s + 1];
                        ii(4, u, h);
                        try {
                          h.call(u);
                        } finally {
                          ii(5, u, h);
                        }
                      }
                    else {
                      ii(4, i, o);
                      try {
                        o.call(i);
                      } finally {
                        ii(5, i, o);
                      }
                    }
                  }
                }
            })(e, t),
            (function DD(e, t) {
              const n = e.cleanup,
                r = t[xr];
              if (null !== n)
                for (let o = 0; o < n.length - 1; o += 2)
                  if ('string' == typeof n[o]) {
                    const s = n[o + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (o += 2);
                  } else n[o].call(r[n[o + 1]]);
              null !== r && (t[xr] = null);
              const i = t[lr];
              if (null !== i) {
                t[lr] = null;
                for (let o = 0; o < i.length; o++) (0, i[o])();
              }
            })(e, t),
            1 === t[Ne].type && t[it].destroy();
          const n = t[Kr];
          if (null !== n && vn(t[Gt])) {
            n !== t[Gt] && Uf(n, t);
            const r = t[ar];
            null !== r && r.detachView(e);
          }
          !(function rD(e) {
            ju.delete(e[ti]);
          })(t);
        }
      }
      function Wu(e, t, n) {
        return (function $f(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[en];
          {
            const { componentOffset: i } = r;
            if (i > -1) {
              const { encapsulation: o } = e.data[r.directiveStart + i];
              if (o === kn.None || o === kn.Emulated) return null;
            }
            return zn(r, n);
          }
        })(e, t.parent, n);
      }
      function Ho(e, t, n, r, i) {
        e.insertBefore(t, n, r, i);
      }
      function Vf(e, t, n) {
        e.appendChild(t, n);
      }
      function zf(e, t, n, r, i) {
        null !== r ? Ho(e, t, n, r, i) : Vf(e, t, n);
      }
      function vl(e, t) {
        return e.parentNode(t);
      }
      function Gf(e, t, n) {
        return Kf(e, t, n);
      }
      let Ku,
        Cl,
        Zu,
        _l,
        Kf = function Wf(e, t, n) {
          return 40 & e.type ? zn(e, n) : null;
        };
      function Dl(e, t, n, r) {
        const i = Wu(e, r, t),
          o = t[it],
          u = Gf(r.parent || t[bn], r, t);
        if (null != i)
          if (Array.isArray(n)) for (let h = 0; h < n.length; h++) zf(o, i, n[h], u, !1);
          else zf(o, i, n, u, !1);
        void 0 !== Ku && Ku(o, r, t, n, i);
      }
      function ca(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return zn(t, e);
          if (4 & n) return Yu(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return ca(e, r);
            {
              const i = e[t.index];
              return vn(i) ? Yu(-1, i) : Mt(i);
            }
          }
          if (32 & n) return $u(t, e)() || Mt(e[t.index]);
          {
            const r = qf(e, t);
            return null !== r ? (Array.isArray(r) ? r[0] : ca(ua(e[an]), r)) : ca(e, t.next);
          }
        }
        return null;
      }
      function qf(e, t) {
        return null !== t ? e[an][bn].projection[t.projection] : null;
      }
      function Yu(e, t) {
        const n = Sn + e + 1;
        if (n < t.length) {
          const r = t[n],
            i = r[Ne].firstChild;
          if (null !== i) return ca(r, i);
        }
        return t[tn];
      }
      function qu(e, t, n, r, i, o, s) {
        for (; null != n; ) {
          const u = r[n.index],
            h = n.type;
          if ((s && 0 === t && (u && pr(Mt(u), r), (n.flags |= 2)), 32 != (32 & n.flags)))
            if (8 & h) qu(e, t, n.child, r, i, o, !1), fs(t, e, i, u, o);
            else if (32 & h) {
              const D = $u(n, r);
              let S;
              for (; (S = D()); ) fs(t, e, i, S, o);
              fs(t, e, i, u, o);
            } else 16 & h ? Zf(e, t, r, n, i, o) : fs(t, e, i, u, o);
          n = s ? n.projectionNext : n.next;
        }
      }
      function da(e, t, n, r, i, o) {
        qu(n, r, e.firstChild, t, i, o, !1);
      }
      function Zf(e, t, n, r, i, o) {
        const s = n[an],
          h = s[bn].projection[r.projection];
        if (Array.isArray(h)) for (let D = 0; D < h.length; D++) fs(t, e, i, h[D], o);
        else {
          let D = h;
          const S = s[Gt];
          fl(r) && (D.flags |= 128), qu(e, t, D, S, i, o, !0);
        }
      }
      function Xf(e, t, n) {
        '' === n ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n);
      }
      function Jf(e, t, n) {
        const { mergedAttrs: r, classes: i, styles: o } = n;
        null !== r && ei(e, t, r),
          null !== i && Xf(e, t, i),
          null !== o &&
            (function MD(e, t, n) {
              e.setAttribute(t, 'style', n);
            })(e, t, o);
      }
      function hs(e) {
        return (
          (function Qu() {
            if (void 0 === Cl && ((Cl = null), qe.trustedTypes))
              try {
                Cl = qe.trustedTypes.createPolicy('angular', {
                  createHTML: e => e,
                  createScript: e => e,
                  createScriptURL: e => e,
                });
              } catch {}
            return Cl;
          })()?.createHTML(e) || e
        );
      }
      function RD(e) {
        Zu = e;
      }
      function ps() {
        if (void 0 !== Zu) return Zu;
        if (typeof document < 'u') return document;
        throw new ne(210, !1);
      }
      function Xu() {
        if (void 0 === _l && ((_l = null), qe.trustedTypes))
          try {
            _l = qe.trustedTypes.createPolicy('angular#unsafe-bypass', {
              createHTML: e => e,
              createScript: e => e,
              createScriptURL: e => e,
            });
          } catch {}
        return _l;
      }
      function eh(e) {
        return Xu()?.createHTML(e) || e;
      }
      function nh(e) {
        return Xu()?.createScriptURL(e) || e;
      }
      class Uo {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Se})`;
        }
      }
      class PD extends Uo {
        getTypeName() {
          return 'HTML';
        }
      }
      class ND extends Uo {
        getTypeName() {
          return 'Style';
        }
      }
      class OD extends Uo {
        getTypeName() {
          return 'Script';
        }
      }
      class xD extends Uo {
        getTypeName() {
          return 'URL';
        }
      }
      class FD extends Uo {
        getTypeName() {
          return 'ResourceURL';
        }
      }
      function no(e) {
        return e instanceof Uo ? e.changingThisBreaksApplicationSecurity : e;
      }
      function gs(e, t) {
        const n = (function LD(e) {
          return (e instanceof Uo && e.getTypeName()) || null;
        })(e);
        if (null != n && n !== t) {
          if ('ResourceURL' === n && 'URL' === t) return !0;
          throw new Error(`Required a safe ${t}, got a ${n} (see ${Se})`);
        }
        return n === t;
      }
      function kD(e) {
        return new PD(e);
      }
      function jD(e) {
        return new ND(e);
      }
      function BD(e) {
        return new OD(e);
      }
      function HD(e) {
        return new xD(e);
      }
      function UD(e) {
        return new FD(e);
      }
      class $D {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = '<body><remove></remove>' + t;
          try {
            const n = new window.DOMParser().parseFromString(hs(t), 'text/html').body;
            return null === n
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (n.removeChild(n.firstChild), n);
          } catch {
            return null;
          }
        }
      }
      class VD {
        constructor(t) {
          (this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument('sanitization-inert'));
        }
        getInertBodyElement(t) {
          const n = this.inertDocument.createElement('template');
          return (n.innerHTML = hs(t)), n;
        }
      }
      const GD = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      function wl(e) {
        return (e = String(e)).match(GD) ? e : 'unsafe:' + e;
      }
      function ro(e) {
        const t = {};
        for (const n of e.split(',')) t[n] = !0;
        return t;
      }
      function fa(...e) {
        const t = {};
        for (const n of e) for (const r in n) n.hasOwnProperty(r) && (t[r] = !0);
        return t;
      }
      const ih = ro('area,br,col,hr,img,wbr'),
        oh = ro('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        sh = ro('rp,rt'),
        Ju = fa(
          ih,
          fa(
            oh,
            ro(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
            )
          ),
          fa(
            sh,
            ro(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
            )
          ),
          fa(sh, oh)
        ),
        ec = ro('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        ah = fa(
          ec,
          ro(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
          ),
          ro(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
          )
        ),
        WD = ro('script,style,template');
      class KD {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let n = t.firstChild,
            r = !0;
          for (; n; )
            if (
              (n.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(n))
                : n.nodeType === Node.TEXT_NODE
                  ? this.chars(n.nodeValue)
                  : (this.sanitizedSomething = !0),
              r && n.firstChild)
            )
              n = n.firstChild;
            else
              for (; n; ) {
                n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                let i = this.checkClobberedElement(n, n.nextSibling);
                if (i) {
                  n = i;
                  break;
                }
                n = this.checkClobberedElement(n, n.parentNode);
              }
          return this.buf.join('');
        }
        startElement(t) {
          const n = t.nodeName.toLowerCase();
          if (!Ju.hasOwnProperty(n)) return (this.sanitizedSomething = !0), !WD.hasOwnProperty(n);
          this.buf.push('<'), this.buf.push(n);
          const r = t.attributes;
          for (let i = 0; i < r.length; i++) {
            const o = r.item(i),
              s = o.name,
              u = s.toLowerCase();
            if (!ah.hasOwnProperty(u)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let h = o.value;
            ec[u] && (h = wl(h)), this.buf.push(' ', s, '="', lh(h), '"');
          }
          return this.buf.push('>'), !0;
        }
        endElement(t) {
          const n = t.nodeName.toLowerCase();
          Ju.hasOwnProperty(n) &&
            !ih.hasOwnProperty(n) &&
            (this.buf.push('</'), this.buf.push(n), this.buf.push('>'));
        }
        chars(t) {
          this.buf.push(lh(t));
        }
        checkClobberedElement(t, n) {
          if (
            n &&
            (t.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            );
          return n;
        }
      }
      const YD = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        qD = /([^\#-~ |!])/g;
      function lh(e) {
        return e
          .replace(/&/g, '&amp;')
          .replace(YD, function (t) {
            return (
              '&#' + (1024 * (t.charCodeAt(0) - 55296) + (t.charCodeAt(1) - 56320) + 65536) + ';'
            );
          })
          .replace(qD, function (t) {
            return '&#' + t.charCodeAt(0) + ';';
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      let bl;
      function uh(e, t) {
        let n = null;
        try {
          bl =
            bl ||
            (function rh(e) {
              const t = new VD(e);
              return (function zD() {
                try {
                  return !!new window.DOMParser().parseFromString(hs(''), 'text/html');
                } catch {
                  return !1;
                }
              })()
                ? new $D(t)
                : t;
            })(e);
          let r = t ? String(t) : '';
          n = bl.getInertBodyElement(r);
          let i = 5,
            o = r;
          do {
            if (0 === i) throw new Error('Failed to sanitize html because the input is unstable');
            i--, (r = o), (o = n.innerHTML), (n = bl.getInertBodyElement(r));
          } while (r !== o);
          return hs(new KD().sanitizeChildren(tc(n) || n));
        } finally {
          if (n) {
            const r = tc(n) || n;
            for (; r.firstChild; ) r.removeChild(r.firstChild);
          }
        }
      }
      function tc(e) {
        return 'content' in e &&
          (function QD(e) {
            return e.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === e.nodeName;
          })(e)
          ? e.content
          : null;
      }
      var $o = (function (e) {
        return (
          (e[(e.NONE = 0)] = 'NONE'),
          (e[(e.HTML = 1)] = 'HTML'),
          (e[(e.STYLE = 2)] = 'STYLE'),
          (e[(e.SCRIPT = 3)] = 'SCRIPT'),
          (e[(e.URL = 4)] = 'URL'),
          (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
          e
        );
      })($o || {});
      function ch(e) {
        const t = ha();
        return t ? eh(t.sanitize($o.HTML, e) || '') : gs(e, 'HTML') ? eh(no(e)) : uh(ps(), ke(e));
      }
      function nc(e) {
        const t = ha();
        return t ? t.sanitize($o.URL, e) || '' : gs(e, 'URL') ? no(e) : wl(ke(e));
      }
      function dh(e) {
        const t = ha();
        if (t) return nh(t.sanitize($o.RESOURCE_URL, e) || '');
        if (gs(e, 'ResourceURL')) return nh(no(e));
        throw new ne(904, !1);
      }
      function fh(e, t, n) {
        return (function tE(e, t) {
          return ('src' === t &&
            ('embed' === e ||
              'frame' === e ||
              'iframe' === e ||
              'media' === e ||
              'script' === e)) ||
            ('href' === t && ('base' === e || 'link' === e))
            ? dh
            : nc;
        })(
          t,
          n
        )(e);
      }
      function ha() {
        const e = Ee();
        return e && e[Bn].sanitizer;
      }
      const pa = new et('ENVIRONMENT_INITIALIZER'),
        hh = new et('INJECTOR', -1),
        ph = new et('INJECTOR_DEF_TYPES');
      class rc {
        get(t, n = L) {
          if (n === L) {
            const r = new Error(`NullInjectorError: No provider for ${tt(t)}!`);
            throw ((r.name = 'NullInjectorError'), r);
          }
          return n;
        }
      }
      function ic(e) {
        return { ɵproviders: e };
      }
      function nE(...e) {
        return { ɵproviders: gh(0, e), ɵfromNgModule: !0 };
      }
      function gh(e, ...t) {
        const n = [],
          r = new Set();
        let i;
        const o = s => {
          n.push(s);
        };
        return (
          ls(t, s => {
            const u = s;
            Sl(u, o, [], r) && ((i ||= []), i.push(u));
          }),
          void 0 !== i && mh(i, o),
          n
        );
      }
      function mh(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { ngModule: r, providers: i } = e[n];
          oc(i, o => {
            t(o, r);
          });
        }
      }
      function Sl(e, t, n, r) {
        if (!(e = he(e))) return !1;
        let i = null,
          o = at(e);
        const s = !o && _t(e);
        if (o || s) {
          if (s && !s.standalone) return !1;
          i = e;
        } else {
          const h = e.ngModule;
          if (((o = at(h)), !o)) return !1;
          i = h;
        }
        const u = r.has(i);
        if (s) {
          if (u) return !1;
          if ((r.add(i), s.dependencies)) {
            const h = 'function' == typeof s.dependencies ? s.dependencies() : s.dependencies;
            for (const D of h) Sl(D, t, n, r);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !u) {
              let D;
              r.add(i);
              try {
                ls(o.imports, S => {
                  Sl(S, t, n, r) && ((D ||= []), D.push(S));
                });
              } finally {
              }
              void 0 !== D && mh(D, t);
            }
            if (!u) {
              const D = T(i) || (() => new i());
              t({ provide: i, useFactory: D, deps: ze }, i),
                t({ provide: ph, useValue: i, multi: !0 }, i),
                t({ provide: pa, useValue: () => F(i), multi: !0 }, i);
            }
            const h = o.providers;
            if (null != h && !u) {
              const D = e;
              oc(h, S => {
                t(S, D);
              });
            }
          }
        }
        return i !== e && void 0 !== e.providers;
      }
      function oc(e, t) {
        for (let n of e) we(n) && (n = n.ɵproviders), Array.isArray(n) ? oc(n, t) : t(n);
      }
      const rE = Le({ provide: String, useValue: Le });
      function sc(e) {
        return null !== e && 'object' == typeof e && rE in e;
      }
      function Vo(e) {
        return 'function' == typeof e;
      }
      const ac = new et('Set Injector scope.'),
        Ml = {},
        oE = {};
      let lc;
      function Il() {
        return void 0 === lc && (lc = new rc()), lc;
      }
      class Hi {}
      class ms extends Hi {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, i) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = i),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            cc(t, s => this.processProvider(s)),
            this.records.set(hh, ys(void 0, this)),
            i.has('environment') && this.records.set(Hi, ys(void 0, this));
          const o = this.records.get(ac);
          null != o && 'string' == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(ph.multi, ze, Ze.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = $(this),
            r = pn(void 0);
          try {
            return t();
          } finally {
            $(n), pn(r);
          }
        }
        get(t, n = L, r = Ze.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(Dr))) return t[Dr](this);
          r = Fe(r);
          const o = $(this),
            s = pn(void 0);
          try {
            if (!(r & Ze.SkipSelf)) {
              let h = this.records.get(t);
              if (void 0 === h) {
                const D =
                  (function cE(e) {
                    return 'function' == typeof e || ('object' == typeof e && e instanceof et);
                  })(t) && Yn(t);
                (h = D && this.injectableDefInScope(D) ? ys(uc(t), Ml) : null),
                  this.records.set(t, h);
              }
              if (null != h) return this.hydrate(t, h);
            }
            return (r & Ze.Self ? Il() : this.parent).get(
              t,
              (n = r & Ze.Optional && n === L ? null : n)
            );
          } catch (u) {
            if ('NullInjectorError' === u.name) {
              if (((u[je] = u[je] || []).unshift(tt(t)), o)) throw u;
              return (function _n(e, t, n, r) {
                const i = e[je];
                throw (
                  (t[Qt] && i.unshift(t[Qt]),
                  (e.message = (function yr(e, t, n, r = null) {
                    e = e && '\n' === e.charAt(0) && '\u0275' == e.charAt(1) ? e.slice(2) : e;
                    let i = tt(t);
                    if (Array.isArray(t)) i = t.map(tt).join(' -> ');
                    else if ('object' == typeof t) {
                      let o = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let u = t[s];
                          o.push(s + ':' + ('string' == typeof u ? JSON.stringify(u) : tt(u)));
                        }
                      i = `{${o.join(', ')}}`;
                    }
                    return `${n}${r ? '(' + r + ')' : ''}[${i}]: ${e.replace(Lt, '\n  ')}`;
                  })('\n' + e.message, i, n, r)),
                  (e.ngTokenPath = i),
                  (e[je] = null),
                  e)
                );
              })(u, t, 'R3InjectorError', this.source);
            }
            throw u;
          } finally {
            pn(s), $(o);
          }
        }
        resolveInjectorInitializers() {
          const t = $(this),
            n = pn(void 0);
          try {
            const i = this.get(pa.multi, ze, Ze.Self);
            for (const o of i) o();
          } finally {
            $(t), pn(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(tt(r));
          return `R3Injector[${t.join(', ')}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new ne(205, !1);
        }
        processProvider(t) {
          let n = Vo((t = he(t))) ? t : he(t && t.provide);
          const r = (function aE(e) {
            return sc(e) ? ys(void 0, e.useValue) : ys(Dh(e), Ml);
          })(t);
          if (Vo(t) || !0 !== t.multi) this.records.get(n);
          else {
            let i = this.records.get(n);
            i ||
              ((i = ys(void 0, Ml, !0)), (i.factory = () => Oe(i.multi)), this.records.set(n, i)),
              (n = t),
              i.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Ml && ((n.value = oE), (n.value = n.factory())),
            'object' == typeof n.value &&
              n.value &&
              (function uE(e) {
                return null !== e && 'object' == typeof e && 'function' == typeof e.ngOnDestroy;
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = he(t.providedIn);
          return 'string' == typeof n
            ? 'any' === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function uc(e) {
        const t = Yn(e),
          n = null !== t ? t.factory : T(e);
        if (null !== n) return n;
        if (e instanceof et) throw new ne(204, !1);
        if (e instanceof Function)
          return (function sE(e) {
            const t = e.length;
            if (t > 0) throw (sa(t, '?'), new ne(204, !1));
            const n = (function Dt(e) {
              return (e && (e[Rr] || e[Nn])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new ne(204, !1);
      }
      function Dh(e, t, n) {
        let r;
        if (Vo(e)) {
          const i = he(e);
          return T(i) || uc(i);
        }
        if (sc(e)) r = () => he(e.useValue);
        else if (
          (function vh(e) {
            return !(!e || !e.useFactory);
          })(e)
        )
          r = () => e.useFactory(...Oe(e.deps || []));
        else if (
          (function yh(e) {
            return !(!e || !e.useExisting);
          })(e)
        )
          r = () => F(he(e.useExisting));
        else {
          const i = he(e && (e.useClass || e.provide));
          if (
            !(function lE(e) {
              return !!e.deps;
            })(e)
          )
            return T(i) || uc(i);
          r = () => new i(...Oe(e.deps));
        }
        return r;
      }
      function ys(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function cc(e, t) {
        for (const n of e) Array.isArray(n) ? cc(n, t) : n && we(n) ? cc(n.ɵproviders, t) : t(n);
      }
      const Eh = new et('AppId', { providedIn: 'root', factory: () => dE }),
        dE = 'ng',
        Ch = new et('Platform Initializer'),
        dc = new et('Platform ID', { providedIn: 'platform', factory: () => 'unknown' }),
        fE = new et('AnimationModuleType'),
        hE = new et('CSP nonce', {
          providedIn: 'root',
          factory: () =>
            ps().body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') || null,
        });
      let _h = (e, t, n) => null;
      function Dc(e, t, n = !1) {
        return _h(e, t, n);
      }
      class wE {}
      class Sh {}
      class SE {
        resolveComponentFactory(t) {
          throw (function bE(e) {
            const t = Error(`No component factory found for ${tt(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Ol = (() => {
        class e {
          static #e = (this.NULL = new SE());
        }
        return e;
      })();
      function ME() {
        return Es(Gn(), Ee());
      }
      function Es(e, t) {
        return new ya(zn(e, t));
      }
      let ya = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
          static #e = (this.__NG_ELEMENT_ID__ = ME);
        }
        return e;
      })();
      function IE(e) {
        return e instanceof ya ? e.nativeElement : e;
      }
      class Ih {}
      let TE = (() => {
          class e {
            constructor() {
              this.destroyNode = null;
            }
            static #e = (this.__NG_ELEMENT_ID__ = () =>
              (function AE() {
                const e = Ee(),
                  n = Lr(Gn().index, e);
                return (Fn(n) ? n : e)[it];
              })());
          }
          return e;
        })(),
        RE = (() => {
          class e {
            static #e = (this.ɵprov = Jt({ token: e, providedIn: 'root', factory: () => null }));
          }
          return e;
        })();
      class Th {
        constructor(t) {
          (this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'));
        }
      }
      const PE = new Th('16.2.12'),
        _c = {};
      function Nh(e, t = null, n = null, r) {
        const i = Oh(e, t, n, r);
        return i.resolveInjectorInitializers(), i;
      }
      function Oh(e, t = null, n = null, r, i = new Set()) {
        const o = [n || ze, nE(e)];
        return (
          (r = r || ('object' == typeof e ? void 0 : tt(e))), new ms(o, t || Il(), r || null, i)
        );
      }
      let bi = (() => {
        class e {
          static #e = (this.THROW_IF_NOT_FOUND = L);
          static #t = (this.NULL = new rc());
          static create(n, r) {
            if (Array.isArray(n)) return Nh({ name: '' }, r, n, '');
            {
              const i = n.name ?? '';
              return Nh({ name: i }, n.parent, n.providers, i);
            }
          }
          static #n = (this.ɵprov = Jt({ token: e, providedIn: 'any', factory: () => F(hh) }));
          static #r = (this.__NG_ELEMENT_ID__ = -1);
        }
        return e;
      })();
      function bc(e) {
        return e.ngOriginalError;
      }
      class _o {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error('ERROR', t), n && this._console.error('ORIGINAL ERROR', n);
        }
        _findOriginalError(t) {
          let n = t && bc(t);
          for (; n && bc(n); ) n = bc(n);
          return n || null;
        }
      }
      function Mc(e) {
        return t => {
          setTimeout(e, void 0, t);
        };
      }
      const Ui = class jE extends m.x {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let i = t,
            o = n || (() => null),
            s = r;
          if (t && 'object' == typeof t) {
            const h = t;
            (i = h.next?.bind(h)), (o = h.error?.bind(h)), (s = h.complete?.bind(h));
          }
          this.__isAsync && ((o = Mc(o)), i && (i = Mc(i)), s && (s = Mc(s)));
          const u = super.subscribe({ next: i, error: o, complete: s });
          return t instanceof U.w0 && t.add(u), u;
        }
      };
      function Fh(...e) {}
      class tr {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ui(!1)),
            (this.onMicrotaskEmpty = new Ui(!1)),
            (this.onStable = new Ui(!1)),
            (this.onError = new Ui(!1)),
            typeof Zone > 'u')
          )
            throw new ne(908, !1);
          Zone.assertZonePatched();
          const i = this;
          (i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function BE() {
              const e = 'function' == typeof qe.requestAnimationFrame;
              let t = qe[e ? 'requestAnimationFrame' : 'setTimeout'],
                n = qe[e ? 'cancelAnimationFrame' : 'clearTimeout'];
              if (typeof Zone < 'u' && t && n) {
                const r = t[Zone.__symbol__('OriginalDelegate')];
                r && (t = r);
                const i = n[Zone.__symbol__('OriginalDelegate')];
                i && (n = i);
              }
              return { nativeRequestAnimationFrame: t, nativeCancelAnimationFrame: n };
            })().nativeRequestAnimationFrame),
            (function $E(e) {
              const t = () => {
                !(function UE(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(qe, () => {
                      e.fakeTopEventTask ||
                        (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                          'fakeTopEventTask',
                          () => {
                            (e.lastRequestAnimationFrameId = -1),
                              Tc(e),
                              (e.isCheckStableRunning = !0),
                              Ic(e),
                              (e.isCheckStableRunning = !1);
                          },
                          void 0,
                          () => {},
                          () => {}
                        )),
                        e.fakeTopEventTask.invoke();
                    })),
                    Tc(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, o, s, u) => {
                  if (
                    (function zE(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      );
                    })(u)
                  )
                    return n.invokeTask(i, o, s, u);
                  try {
                    return Lh(e), n.invokeTask(i, o, s, u);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection && 'eventTask' === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      kh(e);
                  }
                },
                onInvoke: (n, r, i, o, s, u, h) => {
                  try {
                    return Lh(e), n.invoke(i, o, s, u, h);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), kh(e);
                  }
                },
                onHasTask: (n, r, i, o) => {
                  n.hasTask(i, o),
                    r === i &&
                      ('microTask' == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask), Tc(e), Ic(e))
                        : 'macroTask' == o.change && (e.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (n, r, i, o) => (
                  n.handleError(i, o), e.runOutsideAngular(() => e.onError.emit(o)), !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return typeof Zone < 'u' && !0 === Zone.current.get('isAngularZone');
        }
        static assertInAngularZone() {
          if (!tr.isInAngularZone()) throw new ne(909, !1);
        }
        static assertNotInAngularZone() {
          if (tr.isInAngularZone()) throw new ne(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, i) {
          const o = this._inner,
            s = o.scheduleEventTask('NgZoneEvent: ' + i, t, HE, Fh, Fh);
          try {
            return o.runTask(s, n, r);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const HE = {};
      function Ic(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Tc(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Lh(e) {
        e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function kh(e) {
        e._nesting--, Ic(e);
      }
      class VE {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ui()),
            (this.onMicrotaskEmpty = new Ui()),
            (this.onStable = new Ui()),
            (this.onError = new Ui());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, i) {
          return t.apply(n, r);
        }
      }
      const jh = new et('', { providedIn: 'root', factory: Bh });
      function Bh() {
        const e = ge(tr);
        let t = !0;
        const n = new B.y(i => {
            (t = e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                i.next(t), i.complete();
              });
          }),
          r = new B.y(i => {
            let o;
            e.runOutsideAngular(() => {
              o = e.onStable.subscribe(() => {
                tr.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), i.next(!0));
                  });
              });
            });
            const s = e.onUnstable.subscribe(() => {
              tr.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    i.next(!1);
                  }));
            });
            return () => {
              o.unsubscribe(), s.unsubscribe();
            };
          });
        return (0, ie.T)(n, r.pipe(ye()));
      }
      function Hh(e) {
        return e.ownerDocument;
      }
      function io(e) {
        return e instanceof Function ? e() : e;
      }
      let Ac = (() => {
        class e {
          constructor() {
            (this.renderDepth = 0), (this.handler = null);
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++;
          }
          end() {
            this.renderDepth--, 0 === this.renderDepth && this.handler?.execute();
          }
          ngOnDestroy() {
            this.handler?.destroy(), (this.handler = null);
          }
          static #e = (this.ɵprov = Jt({ token: e, providedIn: 'root', factory: () => new e() }));
        }
        return e;
      })();
      function va(e) {
        for (; e; ) {
          e[ut] |= 64;
          const t = ua(e);
          if (Di(e) && !t) return e;
          e = t;
        }
        return null;
      }
      const Gh = new et('', { providedIn: 'root', factory: () => !1 });
      let Fl = null;
      function qh(e, t) {
        return e[t] ?? Xh();
      }
      function Qh(e, t) {
        const n = Xh();
        n.producerNode?.length && ((e[t] = Fl), (n.lView = e), (Fl = Zh()));
      }
      const JE = {
        ...bt,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: e => {
          va(e.lView);
        },
        lView: null,
      };
      function Zh() {
        return Object.create(JE);
      }
      function Xh() {
        return (Fl ??= Zh()), Fl;
      }
      const mt = {};
      function Jh(e) {
        ep(xt(), Ee(), cr() + e, !1);
      }
      function ep(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[ut])) {
            const o = e.preOrderCheckHooks;
            null !== o && Xa(t, o, n);
          } else {
            const o = e.preOrderHooks;
            null !== o && Ja(t, o, 0, n);
          }
        jo(n);
      }
      function ws(e, t = Ze.Default) {
        const n = Ee();
        return null === n ? F(e, t) : uf(Gn(), n, he(e), t);
      }
      function tp() {
        throw new Error('invalid');
      }
      function Ll(e, t, n, r, i, o, s, u, h, D, S) {
        const A = t.blueprint.slice();
        return (
          (A[en] = i),
          (A[ut] = 140 | r),
          (null !== D || (e && 2048 & e[ut])) && (A[ut] |= 2048),
          pu(A),
          (A[Gt] = A[Cr] = e),
          (A[Nt] = n),
          (A[Bn] = s || (e && e[Bn])),
          (A[it] = u || (e && e[it])),
          (A[Er] = h || (e && e[Er]) || null),
          (A[bn] = o),
          (A[ti] = (function tD() {
            return eD++;
          })()),
          (A[mn] = S),
          (A[ho] = D),
          (A[an] = 2 == t.type ? e[an] : A),
          A
        );
      }
      function bs(e, t, n, r, i) {
        let o = e.data[t];
        if (null === o)
          (o = (function Rc(e, t, n, r, i) {
            const o = Ya(),
              s = Xs(),
              h = (e.data[t] = (function aC(e, t, n, r, i, o) {
                let s = t ? t.injectorIndex : -1,
                  u = 0;
                return (
                  eo() && (u |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: u,
                    providerIndexes: 0,
                    value: i,
                    attrs: o,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? o : o && o.parent, n, t, r, i));
            return (
              null === e.firstChild && (e.firstChild = h),
              null !== o &&
                (s
                  ? null == o.child && null !== h.parent && (o.child = h)
                  : null === o.next && ((o.next = h), (h.prev = o))),
              h
            );
          })(e, t, n, r, i)),
            (function c() {
              return ft.lFrame.inI18n;
            })() && (o.flags |= 32);
        else if (64 & o.type) {
          (o.type = n), (o.value = r), (o.attrs = i);
          const s = (function Lo() {
            const e = ft.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return si(o, !0), o;
      }
      function Da(e, t, n, r) {
        if (0 === n) return -1;
        const i = t.length;
        for (let o = 0; o < n; o++) t.push(r), e.blueprint.push(r), e.data.push(null);
        return i;
      }
      function np(e, t, n, r, i) {
        const o = qh(t, Fr),
          s = cr(),
          u = 2 & r;
        try {
          jo(-1), u && t.length > wt && ep(e, t, wt, !1), ii(u ? 2 : 0, i);
          const D = u ? o : null,
            S = cn(D);
          try {
            null !== D && (D.dirty = !1), n(r, i);
          } finally {
            Mn(D, S);
          }
        } finally {
          u && null === t[Fr] && Qh(t, Fr), jo(s), ii(u ? 3 : 1, i);
        }
      }
      function Pc(e, t, n) {
        if (go(t)) {
          const r = Pe(null);
          try {
            const o = t.directiveEnd;
            for (let s = t.directiveStart; s < o; s++) {
              const u = e.data[s];
              u.contentQueries && u.contentQueries(1, n[s], s);
            }
          } finally {
            Pe(r);
          }
        }
      }
      function Nc(e, t, n) {
        Du() &&
          ((function pC(e, t, n, r) {
            const i = n.directiveStart,
              o = n.directiveEnd;
            Yr(n) &&
              (function CC(e, t, n) {
                const r = zn(t, e),
                  i = rp(n);
                let s = 16;
                n.signals ? (s = 4096) : n.onPush && (s = 64);
                const u = kl(
                  e,
                  Ll(
                    e,
                    i,
                    null,
                    s,
                    r,
                    t,
                    null,
                    e[Bn].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null
                  )
                );
                e[t.index] = u;
              })(t, n, e.data[i + n.componentOffset]),
              e.firstCreatePass || tl(n, t),
              pr(r, t);
            const s = n.initialInputs;
            for (let u = i; u < o; u++) {
              const h = e.data[u],
                D = Bo(t, e, u, n);
              pr(D, t),
                null !== s && _C(0, u - i, D, h, 0, s),
                Pn(h) && (Lr(n.index, t)[Nt] = Bo(t, e, u, n));
            }
          })(e, t, n, zn(n, t)),
          64 == (64 & n.flags) && lp(e, t, n));
      }
      function Oc(e, t, n = zn) {
        const r = t.localNames;
        if (null !== r) {
          let i = t.index + 1;
          for (let o = 0; o < r.length; o += 2) {
            const s = r[o + 1],
              u = -1 === s ? n(t, e) : e[s];
            e[i++] = u;
          }
        }
      }
      function rp(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = xc(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function xc(e, t, n, r, i, o, s, u, h, D, S) {
        const A = wt + r,
          j = A + i,
          H = (function tC(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : mt);
            return n;
          })(A, j),
          ce = 'function' == typeof D ? D() : D;
        return (H[Ne] = {
          type: e,
          blueprint: H,
          template: n,
          queries: null,
          viewQuery: u,
          declTNode: t,
          data: H.slice().fill(null, A),
          bindingStartIndex: A,
          expandoStartIndex: j,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof o ? o() : o,
          pipeRegistry: 'function' == typeof s ? s() : s,
          firstChild: null,
          schemas: h,
          consts: ce,
          incompleteFirstPass: !1,
          ssrId: S,
        });
      }
      let ip = e => null;
      function op(e, t, n, r) {
        for (let i in e)
          if (e.hasOwnProperty(i)) {
            n = null === n ? {} : n;
            const o = e[i];
            null === r ? sp(n, t, i, o) : r.hasOwnProperty(i) && sp(n, t, r[i], o);
          }
        return n;
      }
      function sp(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Fc(e, t, n, r) {
        if (Du()) {
          const i = null === r ? null : { '': -1 },
            o = (function mC(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                i = null;
              if (n)
                for (let o = 0; o < n.length; o++) {
                  const s = n[o];
                  if (Jn(t, s.selectors, !1))
                    if ((r || (r = []), Pn(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const u = [];
                        (i = i || new Map()),
                          s.findHostDirectiveDefs(s, u, i),
                          r.unshift(...u, s),
                          Lc(e, t, u.length);
                      } else r.unshift(s), Lc(e, t, 0);
                    else (i = i || new Map()), s.findHostDirectiveDefs?.(s, r, i), r.push(s);
                }
              return null === r ? null : [r, i];
            })(e, n);
          let s, u;
          null === o ? (s = u = null) : ([s, u] = o),
            null !== s && ap(e, t, n, s, i, u),
            i &&
              (function yC(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let i = 0; i < t.length; i += 2) {
                    const o = n[t[i + 1]];
                    if (null == o) throw new ne(-301, !1);
                    r.push(t[i], o);
                  }
                }
              })(n, r, i);
        }
        n.mergedAttrs = Nr(n.mergedAttrs, n.attrs);
      }
      function ap(e, t, n, r, i, o) {
        for (let D = 0; D < r.length; D++) Au(tl(n, t), e, r[D].type);
        !(function DC(e, t, n) {
          (e.flags |= 1), (e.directiveStart = t), (e.directiveEnd = t + n), (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let D = 0; D < r.length; D++) {
          const S = r[D];
          S.providersResolver && S.providersResolver(S);
        }
        let s = !1,
          u = !1,
          h = Da(e, t, r.length, null);
        for (let D = 0; D < r.length; D++) {
          const S = r[D];
          (n.mergedAttrs = Nr(n.mergedAttrs, S.hostAttrs)),
            EC(e, n, t, h, S),
            vC(h, S, i),
            null !== S.contentQueries && (n.flags |= 4),
            (null !== S.hostBindings || null !== S.hostAttrs || 0 !== S.hostVars) &&
              (n.flags |= 64);
          const A = S.type.prototype;
          !s &&
            (A.ngOnChanges || A.ngOnInit || A.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !u &&
              (A.ngOnChanges || A.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (u = !0)),
            h++;
        }
        !(function lC(e, t, n) {
          const i = t.directiveEnd,
            o = e.data,
            s = t.attrs,
            u = [];
          let h = null,
            D = null;
          for (let S = t.directiveStart; S < i; S++) {
            const A = o[S],
              j = n ? n.get(A) : null,
              ce = j ? j.outputs : null;
            (h = op(A.inputs, S, h, j ? j.inputs : null)), (D = op(A.outputs, S, D, ce));
            const _e = null === h || null === s || Un(t) ? null : wC(h, S, s);
            u.push(_e);
          }
          null !== h &&
            (h.hasOwnProperty('class') && (t.flags |= 8),
            h.hasOwnProperty('style') && (t.flags |= 16)),
            (t.initialInputs = u),
            (t.inputs = h),
            (t.outputs = D);
        })(e, n, o);
      }
      function lp(e, t, n) {
        const r = n.directiveStart,
          i = n.directiveEnd,
          o = n.index,
          s = (function g() {
            return ft.lFrame.currentDirectiveIndex;
          })();
        try {
          jo(o);
          for (let u = r; u < i; u++) {
            const h = e.data[u],
              D = t[u];
            E(u), (null !== h.hostBindings || 0 !== h.hostVars || null !== h.hostAttrs) && gC(h, D);
          }
        } finally {
          jo(-1), E(s);
        }
      }
      function gC(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function Lc(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function vC(e, t, n) {
        if (n) {
          if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Pn(t) && (n[''] = e);
        }
      }
      function EC(e, t, n, r, i) {
        e.data[r] = i;
        const o = i.factory || (i.factory = T(i.type)),
          s = new ta(o, Pn(i), ws);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function fC(e, t, n, r, i) {
            const o = i.hostBindings;
            if (o) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const u = ~t.index;
              (function hC(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ('number' == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != u && s.push(u),
                s.push(n, r, o);
            }
          })(e, t, r, Da(e, n, i.hostVars, mt), i);
      }
      function $i(e, t, n, r, i, o) {
        const s = zn(e, t);
        !(function kc(e, t, n, r, i, o, s) {
          if (null == o) e.removeAttribute(t, i, n);
          else {
            const u = null == s ? ke(o) : s(o, r || '', i);
            e.setAttribute(t, i, u, n);
          }
        })(t[it], s, o, e.value, n, r, i);
      }
      function _C(e, t, n, r, i, o) {
        const s = o[t];
        if (null !== s) for (let u = 0; u < s.length; ) up(r, n, s[u++], s[u++], s[u++]);
      }
      function up(e, t, n, r, i) {
        const o = Pe(null);
        try {
          const s = e.inputTransforms;
          null !== s && s.hasOwnProperty(r) && (i = s[r].call(t, i)),
            null !== e.setInput ? e.setInput(t, i, n, r) : (t[r] = i);
        } finally {
          Pe(o);
        }
      }
      function wC(e, t, n) {
        let r = null,
          i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if (0 !== o)
            if (5 !== o) {
              if ('number' == typeof o) break;
              if (e.hasOwnProperty(o)) {
                null === r && (r = []);
                const s = e[o];
                for (let u = 0; u < s.length; u += 2)
                  if (s[u] === t) {
                    r.push(o, s[u + 1], n[i + 1]);
                    break;
                  }
              }
              i += 2;
            } else i += 2;
          else i += 4;
        }
        return r;
      }
      function cp(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null, null];
      }
      function dp(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r + 1];
            if (-1 !== o) {
              const s = e.data[o];
              Z(n[r]), s.contentQueries(2, t[o], o);
            }
          }
      }
      function kl(e, t) {
        return e[gi] ? (e[Zi][$n] = t) : (e[gi] = t), (e[Zi] = t), t;
      }
      function jc(e, t, n) {
        Z(0);
        const r = Pe(null);
        try {
          t(e, n);
        } finally {
          Pe(r);
        }
      }
      function fp(e) {
        return e[xr] || (e[xr] = []);
      }
      function hp(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function gp(e, t) {
        const n = e[Er],
          r = n ? n.get(_o, null) : null;
        r && r.handleError(t);
      }
      function Bc(e, t, n, r, i) {
        for (let o = 0; o < n.length; ) {
          const s = n[o++],
            u = n[o++];
          up(e.data[s], t[s], r, u, i);
        }
      }
      function bC(e, t) {
        const n = Lr(t, e),
          r = n[Ne];
        !(function SC(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
        })(r, n);
        const i = n[en];
        null !== i && null === n[mn] && (n[mn] = Dc(i, n[Er])), Hc(r, n, n[Nt]);
      }
      function Hc(e, t, n) {
        pt(t);
        try {
          const r = e.viewQuery;
          null !== r && jc(1, r, n);
          const i = e.template;
          null !== i && np(e, t, i, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && dp(e, t),
            e.staticViewQueries && jc(2, e.viewQuery, n);
          const o = e.components;
          null !== o &&
            (function MC(e, t) {
              for (let n = 0; n < t.length; n++) bC(e, t[n]);
            })(t, o);
        } catch (r) {
          throw (e.firstCreatePass && ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)), r);
        } finally {
          (t[ut] &= -5), to();
        }
      }
      let mp = (() => {
        class e {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, r, i) {
            const o = typeof Zone > 'u' ? null : Zone.current,
              s = (function jt(e, t, n) {
                const r = Object.create(qr);
                n && (r.consumerAllowSignalWrites = !0), (r.fn = e), (r.schedule = t);
                const i = s => {
                  r.cleanupFn = s;
                };
                return (
                  (r.ref = {
                    notify: () => on(r),
                    run: () => {
                      if (((r.dirty = !1), r.hasRun && !Dn(r))) return;
                      r.hasRun = !0;
                      const s = cn(r);
                      try {
                        r.cleanupFn(), (r.cleanupFn = Zt), r.fn(i);
                      } finally {
                        Mn(r, s);
                      }
                    },
                    cleanup: () => r.cleanupFn(),
                  }),
                  r.ref
                );
              })(
                n,
                D => {
                  this.all.has(D) && this.queue.set(D, o);
                },
                i
              );
            let u;
            this.all.add(s), s.notify();
            const h = () => {
              s.cleanup(), u?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (u = r?.onDestroy(h)), { destroy: h };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, r] of this.queue)
                this.queue.delete(n), r ? r.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
          static #e = (this.ɵprov = Jt({ token: e, providedIn: 'root', factory: () => new e() }));
        }
        return e;
      })();
      function jl(e, t, n) {
        let r = n ? e.styles : null,
          i = n ? e.classes : null,
          o = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const u = t[s];
            'number' == typeof u
              ? (o = u)
              : 1 == o
                ? (i = Ke(i, u))
                : 2 == o && (r = Ke(r, u + ': ' + t[++s] + ';'));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = i) : (e.classesWithoutHost = i);
      }
      function Ea(e, t, n, r, i = !1) {
        for (; null !== n; ) {
          const o = t[n.index];
          null !== o && r.push(Mt(o)), vn(o) && yp(o, r);
          const s = n.type;
          if (8 & s) Ea(e, t, n.child, r);
          else if (32 & s) {
            const u = $u(n, t);
            let h;
            for (; (h = u()); ) r.push(h);
          } else if (16 & s) {
            const u = qf(t, n);
            if (Array.isArray(u)) r.push(...u);
            else {
              const h = ua(t[an]);
              Ea(h[Ne], h, u, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      function yp(e, t) {
        for (let n = Sn; n < e.length; n++) {
          const r = e[n],
            i = r[Ne].firstChild;
          null !== i && Ea(r[Ne], r, i, t);
        }
        e[tn] !== e[en] && t.push(e[tn]);
      }
      function Bl(e, t, n, r = !0) {
        const i = t[Bn],
          o = i.rendererFactory,
          s = i.afterRenderEventManager;
        o.begin?.(), s?.begin();
        try {
          vp(e, t, e.template, n);
        } catch (h) {
          throw (r && gp(t, h), h);
        } finally {
          o.end?.(), i.effectManager?.flush(), s?.end();
        }
      }
      function vp(e, t, n, r) {
        const i = t[ut];
        if (256 != (256 & i)) {
          t[Bn].effectManager?.flush(), pt(t);
          try {
            pu(t),
              (function wu(e) {
                return (ft.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && np(e, t, n, 2, r);
            const s = 3 == (3 & i);
            if (s) {
              const D = e.preOrderCheckHooks;
              null !== D && Xa(t, D, null);
            } else {
              const D = e.preOrderHooks;
              null !== D && Ja(t, D, 0, null), bu(t, 0);
            }
            if (
              ((function AC(e) {
                for (let t = kf(e); null !== t; t = jf(t)) {
                  if (!t[yi]) continue;
                  const n = t[wr];
                  for (let r = 0; r < n.length; r++) {
                    za(n[r]);
                  }
                }
              })(t),
              Dp(t, 2),
              null !== e.contentQueries && dp(e, t),
              s)
            ) {
              const D = e.contentCheckHooks;
              null !== D && Xa(t, D);
            } else {
              const D = e.contentHooks;
              null !== D && Ja(t, D, 1), bu(t, 1);
            }
            !(function eC(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = qh(t, mi);
              try {
                for (let i = 0; i < n.length; i++) {
                  const o = n[i];
                  if (o < 0) jo(~o);
                  else {
                    const s = o,
                      u = n[++i],
                      h = n[++i];
                    l(u, s), (r.dirty = !1);
                    const D = cn(r);
                    try {
                      h(2, t[s]);
                    } finally {
                      Mn(r, D);
                    }
                  }
                }
              } finally {
                null === t[mi] && Qh(t, mi), jo(-1);
              }
            })(e, t);
            const u = e.components;
            null !== u && Cp(t, u, 0);
            const h = e.viewQuery;
            if ((null !== h && jc(2, h, r), s)) {
              const D = e.viewCheckHooks;
              null !== D && Xa(t, D);
            } else {
              const D = e.viewHooks;
              null !== D && Ja(t, D, 2), bu(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1), (t[ut] &= -73), oi(t);
          } finally {
            to();
          }
        }
      }
      function Dp(e, t) {
        for (let n = kf(e); null !== n; n = jf(n)) for (let r = Sn; r < n.length; r++) Ep(n[r], t);
      }
      function RC(e, t, n) {
        Ep(Lr(t, e), n);
      }
      function Ep(e, t) {
        if (
          !(function hu(e) {
            return 128 == (128 & e[ut]);
          })(e)
        )
          return;
        const n = e[Ne],
          r = e[ut];
        if ((80 & r && 0 === t) || 1024 & r || 2 === t) vp(n, e, n.template, e[Nt]);
        else if (e[Wr] > 0) {
          Dp(e, 1);
          const i = n.components;
          null !== i && Cp(e, i, 1);
        }
      }
      function Cp(e, t, n) {
        for (let r = 0; r < t.length; r++) RC(e, t[r], n);
      }
      class Ca {
        get rootNodes() {
          const t = this._lView,
            n = t[Ne];
          return Ea(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[Nt];
        }
        set context(t) {
          this._lView[Nt] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[ut]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[Gt];
            if (vn(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (yl(t, r), il(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          zu(this._lView[Ne], this._lView);
        }
        onDestroy(t) {
          !(function gu(e, t) {
            if (256 == (256 & e[ut])) throw new ne(911, !1);
            null === e[lr] && (e[lr] = []), e[lr].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          va(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[ut] &= -129;
        }
        reattach() {
          this._lView[ut] |= 128;
        }
        detectChanges() {
          Bl(this._lView[Ne], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new ne(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function gD(e, t) {
              da(e, t, t[it], 2, null, null);
            })(this._lView[Ne], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new ne(902, !1);
          this._appRef = t;
        }
      }
      class PC extends Ca {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Bl(t[Ne], t, t[Nt], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class _p extends Ol {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = _t(t);
          return new _a(n, this.ngModule);
        }
      }
      function wp(e) {
        const t = [];
        for (let n in e) e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class OC {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Fe(r);
          const i = this.injector.get(t, _c, r);
          return i !== _c || n === _c ? i : this.parentInjector.get(t, n, r);
        }
      }
      class _a extends Sh {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = wp(t.inputs);
          if (null !== n)
            for (const i of r) n.hasOwnProperty(i.propName) && (i.transform = n[i.propName]);
          return r;
        }
        get outputs() {
          return wp(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function ao(e) {
              return e.map(Io).join(',');
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors ? t.ngContentSelectors : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, i) {
          let o = (i = i || this.ngModule) instanceof Hi ? i : i?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new OC(t, o) : t,
            u = s.get(Ih, null);
          if (null === u) throw new ne(407, !1);
          const A = {
              rendererFactory: u,
              sanitizer: s.get(RE, null),
              effectManager: s.get(mp, null),
              afterRenderEventManager: s.get(Ac, null),
            },
            j = u.createRenderer(null, this.componentDef),
            H = this.componentDef.selectors[0][0] || 'div',
            ce = r
              ? (function nC(e, t, n, r) {
                  const o = r.get(Gh, !1) || n === kn.ShadowDom,
                    s = e.selectRootElement(t, o);
                  return (
                    (function rC(e) {
                      ip(e);
                    })(s),
                    s
                  );
                })(j, r, this.componentDef.encapsulation, s)
              : ml(
                  j,
                  H,
                  (function NC(e) {
                    const t = e.toLowerCase();
                    return 'svg' === t ? 'svg' : 'math' === t ? 'math' : null;
                  })(H)
                ),
            Ye = this.componentDef.signals ? 4608 : this.componentDef.onPush ? 576 : 528;
          let me = null;
          null !== ce && (me = Dc(ce, s, !0));
          const gt = xc(0, null, null, 1, 0, null, null, null, null, null, null),
            It = Ll(null, gt, null, Ye, null, null, A, j, s, null, me);
          let rn, Hr;
          pt(It);
          try {
            const so = this.componentDef;
            let Us,
              Gd = null;
            so.findHostDirectiveDefs
              ? ((Us = []), (Gd = new Map()), so.findHostDirectiveDefs(so, Us, Gd), Us.push(so))
              : (Us = [so]);
            const zS = (function FC(e, t) {
                const n = e[Ne],
                  r = wt;
                return (e[r] = t), bs(n, r, 2, '#host', null);
              })(It, ce),
              GS = (function LC(e, t, n, r, i, o, s) {
                const u = i[Ne];
                !(function kC(e, t, n, r) {
                  for (const i of e) t.mergedAttrs = Nr(t.mergedAttrs, i.hostAttrs);
                  null !== t.mergedAttrs && (jl(t, t.mergedAttrs, !0), null !== n && Jf(r, n, t));
                })(r, e, t, s);
                let h = null;
                null !== t && (h = Dc(t, i[Er]));
                const D = o.rendererFactory.createRenderer(t, n);
                let S = 16;
                n.signals ? (S = 4096) : n.onPush && (S = 64);
                const A = Ll(i, rp(n), null, S, i[e.index], e, o, D, null, null, h);
                return u.firstCreatePass && Lc(u, e, r.length - 1), kl(i, A), (i[e.index] = A);
              })(zS, ce, so, Us, It, A, j);
            (Hr = Va(gt, wt)),
              ce &&
                (function BC(e, t, n, r) {
                  if (r) ei(e, n, ['ng-version', PE.full]);
                  else {
                    const { attrs: i, classes: o } = (function To(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        i = 2;
                      for (; r < e.length; ) {
                        let o = e[r];
                        if ('string' == typeof o)
                          2 === i ? '' !== o && t.push(o, e[++r]) : 8 === i && n.push(o);
                        else {
                          if (!xn(i)) break;
                          i = o;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    i && ei(e, n, i), o && o.length > 0 && Xf(e, n, o.join(' '));
                  }
                })(j, so, ce, r),
              void 0 !== n &&
                (function HC(e, t, n) {
                  const r = (e.projection = []);
                  for (let i = 0; i < t.length; i++) {
                    const o = n[i];
                    r.push(null != o ? Array.from(o) : null);
                  }
                })(Hr, this.ngContentSelectors, n),
              (rn = (function jC(e, t, n, r, i, o) {
                const s = Gn(),
                  u = i[Ne],
                  h = zn(s, i);
                ap(u, i, s, n, null, r);
                for (let S = 0; S < n.length; S++) pr(Bo(i, u, s.directiveStart + S, s), i);
                lp(u, i, s), h && pr(h, i);
                const D = Bo(i, u, s.directiveStart + s.componentOffset, s);
                if (((e[Nt] = i[Nt] = D), null !== o)) for (const S of o) S(D, t);
                return Pc(u, s, e), D;
              })(GS, so, Us, Gd, It, [UC])),
              Hc(gt, It, null);
          } finally {
            to();
          }
          return new xC(this.componentType, rn, Es(Hr, It), It, Hr);
        }
      }
      class xC extends wE {
        constructor(t, n, r, i, o) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = o),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new PC(i)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let i;
          if (null !== r && (i = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const o = this._rootLView;
            Bc(o[Ne], o, i, t, n), this.previousInputValues.set(t, n), va(Lr(this._tNode.index, o));
          }
        }
        get injector() {
          return new Mr(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function UC() {
        const e = Gn();
        Za(Ee()[Ne], e);
      }
      function Uc(e) {
        let t = (function bp(e) {
            return Object.getPrototypeOf(e.prototype).constructor;
          })(e.type),
          n = !0;
        const r = [e];
        for (; t; ) {
          let i;
          if (Pn(e)) i = t.ɵcmp || t.ɵdir;
          else {
            if (t.ɵcmp) throw new ne(903, !1);
            i = t.ɵdir;
          }
          if (i) {
            if (n) {
              r.push(i);
              const s = e;
              (s.inputs = Hl(e.inputs)),
                (s.inputTransforms = Hl(e.inputTransforms)),
                (s.declaredInputs = Hl(e.declaredInputs)),
                (s.outputs = Hl(e.outputs));
              const u = i.hostBindings;
              u && GC(e, u);
              const h = i.viewQuery,
                D = i.contentQueries;
              if (
                (h && VC(e, h),
                D && zC(e, D),
                lt(e.inputs, i.inputs),
                lt(e.declaredInputs, i.declaredInputs),
                lt(e.outputs, i.outputs),
                null !== i.inputTransforms &&
                  (null === s.inputTransforms && (s.inputTransforms = {}),
                  lt(s.inputTransforms, i.inputTransforms)),
                Pn(i) && i.data.animation)
              ) {
                const S = e.data;
                S.animation = (S.animation || []).concat(i.data.animation);
              }
            }
            const o = i.features;
            if (o)
              for (let s = 0; s < o.length; s++) {
                const u = o[s];
                u && u.ngInherit && u(e), u === Uc && (n = !1);
              }
          }
          t = Object.getPrototypeOf(t);
        }
        !(function $C(e) {
          let t = 0,
            n = null;
          for (let r = e.length - 1; r >= 0; r--) {
            const i = e[r];
            (i.hostVars = t += i.hostVars),
              (i.hostAttrs = Nr(i.hostAttrs, (n = Nr(n, i.hostAttrs))));
          }
        })(r);
      }
      function Hl(e) {
        return e === gn ? {} : e === ze ? [] : e;
      }
      function VC(e, t) {
        const n = e.viewQuery;
        e.viewQuery = n
          ? (r, i) => {
              t(r, i), n(r, i);
            }
          : t;
      }
      function zC(e, t) {
        const n = e.contentQueries;
        e.contentQueries = n
          ? (r, i, o) => {
              t(r, i, o), n(r, i, o);
            }
          : t;
      }
      function GC(e, t) {
        const n = e.hostBindings;
        e.hostBindings = n
          ? (r, i) => {
              t(r, i), n(r, i);
            }
          : t;
      }
      function Tp(e) {
        const t = e.inputConfig,
          n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            const i = t[r];
            Array.isArray(i) && i[2] && (n[r] = i[2]);
          }
        e.inputTransforms = n;
      }
      function Ul(e) {
        return !!$c(e) && (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e));
      }
      function $c(e) {
        return null !== e && ('function' == typeof e || 'object' == typeof e);
      }
      function Vi(e, t, n) {
        return (e[t] = n);
      }
      function gr(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function zo(e, t, n, r) {
        const i = gr(e, t, n);
        return gr(e, t + 1, r) || i;
      }
      function ui(e, t, n, r, i, o) {
        const s = zo(e, t, n, r);
        return zo(e, t + 2, i, o) || s;
      }
      function Vc(e, t, n, r) {
        const i = Ee();
        return gr(i, ko(), t) && (xt(), $i(In(), i, e, t, n, r)), Vc;
      }
      function Up(e, t, n, r, i, o, s, u) {
        const h = Ee(),
          D = xt(),
          S = e + wt,
          A = D.firstCreatePass
            ? (function m_(e, t, n, r, i, o, s, u, h) {
                const D = t.consts,
                  S = bs(t, e, 4, s || null, wi(D, u));
                Fc(t, n, S, wi(D, h)), Za(t, S);
                const A = (S.tView = xc(
                  2,
                  S,
                  r,
                  i,
                  o,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  D,
                  null
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, S), (A.queries = t.queries.embeddedTView(S))),
                  S
                );
              })(S, D, h, t, n, r, i, o, s)
            : D.data[S];
        si(A, !1);
        const j = $p(D, h, A, e);
        Qa() && Dl(D, h, j, A),
          pr(j, h),
          kl(h, (h[S] = cp(j, h, j, A))),
          br(A) && Nc(D, h, A),
          null != s && Oc(h, A, u);
      }
      let $p = function Vp(e, t, n, r) {
        return Co(!0), t[it].createComment('');
      };
      function qc(e, t, n) {
        const r = Ee();
        return (
          gr(r, ko(), t) &&
            (function Jr(e, t, n, r, i, o, s, u) {
              const h = zn(t, n);
              let S,
                D = t.inputs;
              !u && null != D && (S = D[r])
                ? (Bc(e, n, S, r, i),
                  Yr(t) &&
                    (function cC(e, t) {
                      const n = Lr(t, e);
                      16 & n[ut] || (n[ut] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function uC(e) {
                    return 'class' === e
                      ? 'className'
                      : 'for' === e
                        ? 'htmlFor'
                        : 'formaction' === e
                          ? 'formAction'
                          : 'innerHtml' === e
                            ? 'innerHTML'
                            : 'readonly' === e
                              ? 'readOnly'
                              : 'tabindex' === e
                                ? 'tabIndex'
                                : e;
                  })(r)),
                  (i = null != s ? s(i, t.value || '', r) : i),
                  o.setProperty(h, r, i));
            })(xt(), In(), r, e, t, r[it], n, !1),
          qc
        );
      }
      function Qc(e, t, n, r, i) {
        const s = i ? 'class' : 'style';
        Bc(e, n, t.inputs[s], s, r);
      }
      function Wl(e, t, n, r) {
        const i = Ee(),
          o = xt(),
          s = wt + e,
          u = i[it],
          h = o.firstCreatePass
            ? (function C_(e, t, n, r, i, o) {
                const s = t.consts,
                  h = bs(t, e, 2, r, wi(s, i));
                return (
                  Fc(t, n, h, wi(s, o)),
                  null !== h.attrs && jl(h, h.attrs, !1),
                  null !== h.mergedAttrs && jl(h, h.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, h),
                  h
                );
              })(s, o, i, t, n, r)
            : o.data[s],
          D = zp(o, i, h, u, t, e);
        i[s] = D;
        const S = br(h);
        return (
          si(h, !0),
          Jf(u, D, h),
          32 != (32 & h.flags) && Qa() && Dl(o, i, D, h),
          0 ===
            (function Zs() {
              return ft.lFrame.elementDepthCount;
            })() && pr(D, i),
          (function yu() {
            ft.lFrame.elementDepthCount++;
          })(),
          S && (Nc(o, i, h), Pc(o, h, i)),
          null !== r && Oc(i, h),
          Wl
        );
      }
      function Kl() {
        let e = Gn();
        Xs() ? Js() : ((e = e.parent), si(e, !1));
        const t = e;
        (function Eu(e) {
          return ft.skipHydrationRootTNode === e;
        })(t) &&
          (function Cu() {
            ft.skipHydrationRootTNode = null;
          })(),
          (function vu() {
            ft.lFrame.elementDepthCount--;
          })();
        const n = xt();
        return (
          n.firstCreatePass && (Za(n, e), go(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function hv(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            Qc(n, t, Ee(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function pv(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            Qc(n, t, Ee(), t.stylesWithoutHost, !1),
          Kl
        );
      }
      function Zc(e, t, n, r) {
        return Wl(e, t, n, r), Kl(), Zc;
      }
      let zp = (e, t, n, r, i, o) => (
        Co(!0),
        ml(
          r,
          i,
          (function Xd() {
            return ft.lFrame.currentNamespace;
          })()
        )
      );
      function Yl(e, t, n) {
        const r = Ee(),
          i = xt(),
          o = e + wt,
          s = i.firstCreatePass
            ? (function b_(e, t, n, r, i) {
                const o = t.consts,
                  s = wi(o, r),
                  u = bs(t, e, 8, 'ng-container', s);
                return (
                  null !== s && jl(u, s, !0),
                  Fc(t, n, u, wi(o, i)),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(o, i, r, t, n)
            : i.data[o];
        si(s, !0);
        const u = Wp(i, r, s, e);
        return (
          (r[o] = u),
          Qa() && Dl(i, r, u, s),
          pr(u, r),
          br(s) && (Nc(i, r, s), Pc(i, s, r)),
          null != n && Oc(r, s),
          Yl
        );
      }
      function ql() {
        let e = Gn();
        const t = xt();
        return (
          Xs() ? Js() : ((e = e.parent), si(e, !1)),
          t.firstCreatePass && (Za(t, e), go(e) && t.queries.elementEnd(e)),
          ql
        );
      }
      let Wp = (e, t, n, r) => (Co(!0), Vu(t[it], ''));
      function Kp() {
        return Ee();
      }
      function Xc(e) {
        return !!e && 'function' == typeof e.then;
      }
      function Yp(e) {
        return !!e && 'function' == typeof e.subscribe;
      }
      function Jc(e, t, n, r) {
        const i = Ee(),
          o = xt(),
          s = Gn();
        return (
          (function Qp(e, t, n, r, i, o, s) {
            const u = br(r),
              D = e.firstCreatePass && hp(e),
              S = t[Nt],
              A = fp(t);
            let j = !0;
            if (3 & r.type || s) {
              const _e = zn(r, t),
                xe = s ? s(_e) : _e,
                Ye = A.length,
                me = s ? It => s(Mt(It[r.index])) : r.index;
              let gt = null;
              if (
                (!s &&
                  u &&
                  (gt = (function I_(e, t, n, r) {
                    const i = e.cleanup;
                    if (null != i)
                      for (let o = 0; o < i.length - 1; o += 2) {
                        const s = i[o];
                        if (s === n && i[o + 1] === r) {
                          const u = t[xr],
                            h = i[o + 2];
                          return u.length > h ? u[h] : null;
                        }
                        'string' == typeof s && (o += 2);
                      }
                    return null;
                  })(e, t, i, r.index)),
                null !== gt)
              )
                ((gt.__ngLastListenerFn__ || gt).__ngNextListenerFn__ = o),
                  (gt.__ngLastListenerFn__ = o),
                  (j = !1);
              else {
                o = Xp(r, t, S, o, !1);
                const It = n.listen(xe, i, o);
                A.push(o, It), D && D.push(i, me, Ye, Ye + 1);
              }
            } else o = Xp(r, t, S, o, !1);
            const H = r.outputs;
            let ce;
            if (j && null !== H && (ce = H[i])) {
              const _e = ce.length;
              if (_e)
                for (let xe = 0; xe < _e; xe += 2) {
                  const rn = t[ce[xe]][ce[xe + 1]].subscribe(o),
                    Hr = A.length;
                  A.push(o, rn), D && D.push(i, r.index, Hr, -(Hr + 1));
                }
            }
          })(o, i, i[it], s, e, t, r),
          Jc
        );
      }
      function Zp(e, t, n, r) {
        try {
          return ii(6, t, n), !1 !== n(r);
        } catch (i) {
          return gp(e, i), !1;
        } finally {
          ii(7, t, n);
        }
      }
      function Xp(e, t, n, r, i) {
        return function o(s) {
          if (s === Function) return r;
          va(e.componentOffset > -1 ? Lr(e.index, t) : t);
          let h = Zp(t, n, r, s),
            D = o.__ngNextListenerFn__;
          for (; D; ) (h = Zp(t, n, D, s) && h), (D = D.__ngNextListenerFn__);
          return i && !1 === h && s.preventDefault(), h;
        };
      }
      function Jp(e = 1) {
        return (function ea(e) {
          return (ft.lFrame.contextLView = (function Eo(e, t) {
            for (; e > 0; ) (t = t[Cr]), e--;
            return t;
          })(e, ft.lFrame.contextLView))[Nt];
        })(e);
      }
      function T_(e, t) {
        let n = null;
        const r = (function Ki(e) {
          const t = e.attrs;
          if (null != t) {
            const n = t.indexOf(5);
            if (!(1 & n)) return t[n + 1];
          }
          return null;
        })(e);
        for (let i = 0; i < t.length; i++) {
          const o = t[i];
          if ('*' !== o) {
            if (null === r ? Jn(e, o, !0) : Yi(r, o)) return i;
          } else n = i;
        }
        return n;
      }
      function eg(e) {
        const t = Ee()[an][bn];
        if (!t.projection) {
          const r = (t.projection = sa(e ? e.length : 1, null)),
            i = r.slice();
          let o = t.child;
          for (; null !== o; ) {
            const s = e ? T_(o, e) : 0;
            null !== s && (i[s] ? (i[s].projectionNext = o) : (r[s] = o), (i[s] = o)), (o = o.next);
          }
        }
      }
      function tg(e, t = 0, n) {
        const r = Ee(),
          i = xt(),
          o = bs(i, wt + e, 16, null, n || null);
        null === o.projection && (o.projection = t),
          Js(),
          (!r[mn] || eo()) &&
            32 != (32 & o.flags) &&
            (function wD(e, t, n) {
              Zf(t[it], 0, t, n, Wu(e, n, t), Gf(n.parent || t[bn], n, t));
            })(i, r, o);
      }
      function Ql(e, t) {
        return (e << 17) | (t << 2);
      }
      function wo(e) {
        return (e >> 17) & 32767;
      }
      function td(e) {
        return 2 | e;
      }
      function Go(e) {
        return (131068 & e) >> 2;
      }
      function nd(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function rd(e) {
        return 1 | e;
      }
      function dg(e, t, n, r, i) {
        const o = e[n + 1],
          s = null === t;
        let u = r ? wo(o) : Go(o),
          h = !1;
        for (; 0 !== u && (!1 === h || s); ) {
          const S = e[u + 1];
          x_(e[u], t) && ((h = !0), (e[u + 1] = r ? rd(S) : td(S))), (u = r ? wo(S) : Go(S));
        }
        h && (e[n + 1] = r ? td(o) : rd(o));
      }
      function x_(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || 'string' != typeof t) && us(e, t) >= 0)
        );
      }
      const Kn = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function fg(e) {
        return e.substring(Kn.key, Kn.keyEnd);
      }
      function hg(e, t) {
        const n = Kn.textEnd;
        return n === t
          ? -1
          : ((t = Kn.keyEnd =
              (function j_(e, t, n) {
                for (; t < n && e.charCodeAt(t) > 32; ) t++;
                return t;
              })(e, (Kn.key = t), n)),
            xs(e, t, n));
      }
      function xs(e, t, n) {
        for (; t < n && e.charCodeAt(t) <= 32; ) t++;
        return t;
      }
      function id(e, t, n) {
        return Si(e, t, n, !1), id;
      }
      function od(e, t) {
        return Si(e, t, null, !0), od;
      }
      function vg(e) {
        !(function Mi(e, t, n, r) {
          const i = xt(),
            o = ji(2);
          i.firstUpdatePass && Eg(i, null, o, r);
          const s = Ee();
          if (n !== mt && gr(s, o, n)) {
            const u = i.data[cr()];
            if (bg(u, r) && !Dg(i, o)) {
              let h = r ? u.classesWithoutHost : u.stylesWithoutHost;
              null !== h && (n = Ke(h, n || '')), Qc(i, u, s, n, r);
            } else
              !(function Y_(e, t, n, r, i, o, s, u) {
                i === mt && (i = ze);
                let h = 0,
                  D = 0,
                  S = 0 < i.length ? i[0] : null,
                  A = 0 < o.length ? o[0] : null;
                for (; null !== S || null !== A; ) {
                  const j = h < i.length ? i[h + 1] : void 0,
                    H = D < o.length ? o[D + 1] : void 0;
                  let _e,
                    ce = null;
                  S === A
                    ? ((h += 2), (D += 2), j !== H && ((ce = A), (_e = H)))
                    : null === A || (null !== S && S < A)
                      ? ((h += 2), (ce = S))
                      : ((D += 2), (ce = A), (_e = H)),
                    null !== ce && _g(e, t, n, r, ce, _e, s, u),
                    (S = h < i.length ? i[h] : null),
                    (A = D < o.length ? o[D] : null);
                }
              })(
                i,
                u,
                s,
                s[it],
                s[o + 1],
                (s[o + 1] = (function W_(e, t, n) {
                  if (null == n || '' === n) return ze;
                  const r = [],
                    i = no(n);
                  if (Array.isArray(i)) for (let o = 0; o < i.length; o++) e(r, i[o], !0);
                  else if ('object' == typeof i)
                    for (const o in i) i.hasOwnProperty(o) && e(r, o, i[o]);
                  else 'string' == typeof i && t(r, i);
                  return r;
                })(e, t, n)),
                r,
                o
              );
          }
        })(K_, Gi, e, !0);
      }
      function Gi(e, t) {
        for (
          let n = (function L_(e) {
            return (
              (function gg(e) {
                (Kn.key = 0),
                  (Kn.keyEnd = 0),
                  (Kn.value = 0),
                  (Kn.valueEnd = 0),
                  (Kn.textEnd = e.length);
              })(e),
              hg(e, xs(e, 0, Kn.textEnd))
            );
          })(t);
          n >= 0;
          n = hg(t, n)
        )
          Xr(e, fg(t), !0);
      }
      function Si(e, t, n, r) {
        const i = Ee(),
          o = xt(),
          s = ji(2);
        o.firstUpdatePass && Eg(o, e, s, r),
          t !== mt &&
            gr(i, s, t) &&
            _g(
              o,
              o.data[cr()],
              i,
              i[it],
              e,
              (i[s + 1] = (function q_(e, t) {
                return (
                  null == e ||
                    '' === e ||
                    ('string' == typeof t ? (e += t) : 'object' == typeof e && (e = tt(no(e)))),
                  e
                );
              })(t, n)),
              r,
              s
            );
      }
      function Dg(e, t) {
        return t >= e.expandoStartIndex;
      }
      function Eg(e, t, n, r) {
        const i = e.data;
        if (null === i[n + 1]) {
          const o = i[cr()],
            s = Dg(e, n);
          bg(o, r) && null === t && !s && (t = !1),
            (t = (function $_(e, t, n, r) {
              const i = (function I(e) {
                const t = ft.lFrame.currentDirectiveIndex;
                return -1 === t ? null : e[t];
              })(e);
              let o = r ? t.residualClasses : t.residualStyles;
              if (null === i)
                0 === (r ? t.classBindings : t.styleBindings) &&
                  ((n = Ia((n = sd(null, e, t, n, r)), t.attrs, r)), (o = null));
              else {
                const s = t.directiveStylingLast;
                if (-1 === s || e[s] !== i)
                  if (((n = sd(i, e, t, n, r)), null === o)) {
                    let h = (function V_(e, t, n) {
                      const r = n ? t.classBindings : t.styleBindings;
                      if (0 !== Go(r)) return e[wo(r)];
                    })(e, t, r);
                    void 0 !== h &&
                      Array.isArray(h) &&
                      ((h = sd(null, e, t, h[1], r)),
                      (h = Ia(h, t.attrs, r)),
                      (function z_(e, t, n, r) {
                        e[wo(n ? t.classBindings : t.styleBindings)] = r;
                      })(e, t, r, h));
                  } else
                    o = (function G_(e, t, n) {
                      let r;
                      const i = t.directiveEnd;
                      for (let o = 1 + t.directiveStylingLast; o < i; o++)
                        r = Ia(r, e[o].hostAttrs, n);
                      return Ia(r, t.attrs, n);
                    })(e, t, r);
              }
              return void 0 !== o && (r ? (t.residualClasses = o) : (t.residualStyles = o)), n;
            })(i, o, t, r)),
            (function N_(e, t, n, r, i, o) {
              let s = o ? t.classBindings : t.styleBindings,
                u = wo(s),
                h = Go(s);
              e[r] = n;
              let S,
                D = !1;
              if (
                (Array.isArray(n)
                  ? ((S = n[1]), (null === S || us(n, S) > 0) && (D = !0))
                  : (S = n),
                i)
              )
                if (0 !== h) {
                  const j = wo(e[u + 1]);
                  (e[r + 1] = Ql(j, u)),
                    0 !== j && (e[j + 1] = nd(e[j + 1], r)),
                    (e[u + 1] = (function R_(e, t) {
                      return (131071 & e) | (t << 17);
                    })(e[u + 1], r));
                } else (e[r + 1] = Ql(u, 0)), 0 !== u && (e[u + 1] = nd(e[u + 1], r)), (u = r);
              else (e[r + 1] = Ql(h, 0)), 0 === u ? (u = r) : (e[h + 1] = nd(e[h + 1], r)), (h = r);
              D && (e[r + 1] = td(e[r + 1])),
                dg(e, S, r, !0),
                dg(e, S, r, !1),
                (function O_(e, t, n, r, i) {
                  const o = i ? e.residualClasses : e.residualStyles;
                  null != o && 'string' == typeof t && us(o, t) >= 0 && (n[r + 1] = rd(n[r + 1]));
                })(t, S, e, r, o),
                (s = Ql(u, h)),
                o ? (t.classBindings = s) : (t.styleBindings = s);
            })(i, o, t, n, s, r);
        }
      }
      function sd(e, t, n, r, i) {
        let o = null;
        const s = n.directiveEnd;
        let u = n.directiveStylingLast;
        for (
          -1 === u ? (u = n.directiveStart) : u++;
          u < s && ((o = t[u]), (r = Ia(r, o.hostAttrs, i)), o !== e);

        )
          u++;
        return null !== e && (n.directiveStylingLast = u), r;
      }
      function Ia(e, t, n) {
        const r = n ? 1 : 2;
        let i = -1;
        if (null !== t)
          for (let o = 0; o < t.length; o++) {
            const s = t[o];
            'number' == typeof s
              ? (i = s)
              : i === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ['', e]), Xr(e, s, !!n || t[++o]));
          }
        return void 0 === e ? null : e;
      }
      function K_(e, t, n) {
        const r = String(t);
        '' !== r && !r.includes(' ') && Xr(e, r, n);
      }
      function _g(e, t, n, r, i, o, s, u) {
        if (!(3 & t.type)) return;
        const h = e.data,
          D = h[u + 1],
          S = (function P_(e) {
            return 1 == (1 & e);
          })(D)
            ? wg(h, t, n, i, Go(D), s)
            : void 0;
        Zl(S) ||
          (Zl(o) ||
            ((function A_(e) {
              return 2 == (2 & e);
            })(D) &&
              (o = wg(h, null, n, i, u, s))),
          (function SD(e, t, n, r, i) {
            if (t) i ? e.addClass(n, r) : e.removeClass(n, r);
            else {
              let o = -1 === r.indexOf('-') ? void 0 : pl.DashCase;
              null == i
                ? e.removeStyle(n, r, o)
                : ('string' == typeof i &&
                    i.endsWith('!important') &&
                    ((i = i.slice(0, -10)), (o |= pl.Important)),
                  e.setStyle(n, r, i, o));
            }
          })(r, s, Fo(cr(), n), i, o));
      }
      function wg(e, t, n, r, i, o) {
        const s = null === t;
        let u;
        for (; i > 0; ) {
          const h = e[i],
            D = Array.isArray(h),
            S = D ? h[1] : h,
            A = null === S;
          let j = n[i + 1];
          j === mt && (j = A ? ze : void 0);
          let H = A ? Ou(j, r) : S === r ? j : void 0;
          if ((D && !Zl(H) && (H = Ou(h, r)), Zl(H) && ((u = H), s))) return u;
          const ce = e[i + 1];
          i = s ? wo(ce) : Go(ce);
        }
        if (null !== t) {
          let h = o ? t.residualClasses : t.residualStyles;
          null != h && (u = Ou(h, r));
        }
        return u;
      }
      function Zl(e) {
        return void 0 !== e;
      }
      function bg(e, t) {
        return 0 != (e.flags & (t ? 8 : 16));
      }
      function Sg(e, t = '') {
        const n = Ee(),
          r = xt(),
          i = e + wt,
          o = r.firstCreatePass ? bs(r, i, 1, t, null) : r.data[i],
          s = Mg(r, n, o, t, e);
        (n[i] = s), Qa() && Dl(r, n, s, o), si(o, !1);
      }
      let Mg = (e, t, n, r, i) => (
        Co(!0),
        (function gl(e, t) {
          return e.createText(t);
        })(t[it], r)
      );
      function ad(e) {
        return ld('', e, ''), ad;
      }
      function ld(e, t, n) {
        const r = Ee(),
          i = (function Ms(e, t, n, r) {
            return gr(e, ko(), n) ? t + ke(n) + r : mt;
          })(r, e, t, n);
        return (
          i !== mt &&
            (function oo(e, t, n) {
              const r = Fo(t, e);
              !(function Hf(e, t, n) {
                e.setValue(t, n);
              })(e[it], r, n);
            })(r, cr(), i),
          ld
        );
      }
      const Wo = void 0;
      var yw = [
        'en',
        [['a', 'p'], ['AM', 'PM'], Wo],
        [['AM', 'PM'], Wo, Wo],
        [
          ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        ],
        Wo,
        [
          ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
        ],
        Wo,
        [
          ['B', 'A'],
          ['BC', 'AD'],
          ['Before Christ', 'Anno Domini'],
        ],
        0,
        [6, 0],
        ['M/d/yy', 'MMM d, y', 'MMMM d, y', 'EEEE, MMMM d, y'],
        ['h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'],
        ['{1}, {0}', Wo, "{1} 'at' {0}", Wo],
        ['.', ',', ';', '%', '+', '-', 'E', '\xd7', '\u2030', '\u221e', 'NaN', ':'],
        ['#,##0.###', '#,##0%', '\xa4#,##0.00', '#E0'],
        'USD',
        '$',
        'US Dollar',
        {},
        'ltr',
        function mw(e) {
          const n = Math.floor(Math.abs(e)),
            r = e.toString().replace(/^[^.]*\.?/, '').length;
          return 1 === n && 0 === r ? 1 : 5;
        },
      ];
      let Fs = {};
      function ud(e) {
        const t = (function vw(e) {
          return e.toLowerCase().replace(/_/g, '-');
        })(e);
        let n = Kg(t);
        if (n) return n;
        const r = t.split('-')[0];
        if (((n = Kg(r)), n)) return n;
        if ('en' === r) return yw;
        throw new ne(701, !1);
      }
      function Wg(e) {
        return ud(e)[Ls.PluralCase];
      }
      function Kg(e) {
        return (
          e in Fs ||
            (Fs[e] = qe.ng && qe.ng.common && qe.ng.common.locales && qe.ng.common.locales[e]),
          Fs[e]
        );
      }
      var Ls = (function (e) {
        return (
          (e[(e.LocaleId = 0)] = 'LocaleId'),
          (e[(e.DayPeriodsFormat = 1)] = 'DayPeriodsFormat'),
          (e[(e.DayPeriodsStandalone = 2)] = 'DayPeriodsStandalone'),
          (e[(e.DaysFormat = 3)] = 'DaysFormat'),
          (e[(e.DaysStandalone = 4)] = 'DaysStandalone'),
          (e[(e.MonthsFormat = 5)] = 'MonthsFormat'),
          (e[(e.MonthsStandalone = 6)] = 'MonthsStandalone'),
          (e[(e.Eras = 7)] = 'Eras'),
          (e[(e.FirstDayOfWeek = 8)] = 'FirstDayOfWeek'),
          (e[(e.WeekendRange = 9)] = 'WeekendRange'),
          (e[(e.DateFormat = 10)] = 'DateFormat'),
          (e[(e.TimeFormat = 11)] = 'TimeFormat'),
          (e[(e.DateTimeFormat = 12)] = 'DateTimeFormat'),
          (e[(e.NumberSymbols = 13)] = 'NumberSymbols'),
          (e[(e.NumberFormats = 14)] = 'NumberFormats'),
          (e[(e.CurrencyCode = 15)] = 'CurrencyCode'),
          (e[(e.CurrencySymbol = 16)] = 'CurrencySymbol'),
          (e[(e.CurrencyName = 17)] = 'CurrencyName'),
          (e[(e.Currencies = 18)] = 'Currencies'),
          (e[(e.Directionality = 19)] = 'Directionality'),
          (e[(e.PluralCase = 20)] = 'PluralCase'),
          (e[(e.ExtraData = 21)] = 'ExtraData'),
          e
        );
      })(Ls || {});
      const ks = 'en-US';
      let Yg = ks;
      function fd(e, t, n, r, i) {
        if (((e = he(e)), Array.isArray(e)))
          for (let o = 0; o < e.length; o++) fd(e[o], t, n, r, i);
        else {
          const o = xt(),
            s = Ee(),
            u = Gn();
          let h = Vo(e) ? e : he(e.provide);
          const D = Dh(e),
            S = 1048575 & u.providerIndexes,
            A = u.directiveStart,
            j = u.providerIndexes >> 20;
          if (Vo(e) || !e.multi) {
            const H = new ta(D, i, ws),
              ce = pd(h, t, i ? S : S + j, A);
            -1 === ce
              ? (Au(tl(u, s), o, h),
                hd(o, e, t.length),
                t.push(h),
                u.directiveStart++,
                u.directiveEnd++,
                i && (u.providerIndexes += 1048576),
                n.push(H),
                s.push(H))
              : ((n[ce] = H), (s[ce] = H));
          } else {
            const H = pd(h, t, S + j, A),
              ce = pd(h, t, S, S + j),
              xe = ce >= 0 && n[ce];
            if ((i && !xe) || (!i && !(H >= 0 && n[H]))) {
              Au(tl(u, s), o, h);
              const Ye = (function y0(e, t, n, r, i) {
                const o = new ta(e, n, ws);
                return (
                  (o.multi = []), (o.index = t), (o.componentProviders = 0), Dm(o, i, r && !n), o
                );
              })(i ? m0 : g0, n.length, i, r, D);
              !i && xe && (n[ce].providerFactory = Ye),
                hd(o, e, t.length, 0),
                t.push(h),
                u.directiveStart++,
                u.directiveEnd++,
                i && (u.providerIndexes += 1048576),
                n.push(Ye),
                s.push(Ye);
            } else hd(o, e, H > -1 ? H : ce, Dm(n[i ? ce : H], D, !i && r));
            !i && r && xe && n[ce].componentProviders++;
          }
        }
      }
      function hd(e, t, n, r) {
        const i = Vo(t),
          o = (function iE(e) {
            return !!e.useClass;
          })(t);
        if (i || o) {
          const h = (o ? he(t.useClass) : t).prototype.ngOnDestroy;
          if (h) {
            const D = e.destroyHooks || (e.destroyHooks = []);
            if (!i && t.multi) {
              const S = D.indexOf(n);
              -1 === S ? D.push(n, [r, h]) : D[S + 1].push(r, h);
            } else D.push(n, h);
          }
        }
      }
      function Dm(e, t, n) {
        return n && e.componentProviders++, e.multi.push(t) - 1;
      }
      function pd(e, t, n, r) {
        for (let i = n; i < r; i++) if (t[i] === e) return i;
        return -1;
      }
      function g0(e, t, n, r) {
        return gd(this.multi, []);
      }
      function m0(e, t, n, r) {
        const i = this.multi;
        let o;
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            u = Bo(n, n[Ne], this.providerFactory.index, r);
          (o = u.slice(0, s)), gd(i, o);
          for (let h = s; h < u.length; h++) o.push(u[h]);
        } else (o = []), gd(i, o);
        return o;
      }
      function gd(e, t) {
        for (let n = 0; n < e.length; n++) t.push((0, e[n])());
        return t;
      }
      function Em(e, t = []) {
        return n => {
          n.providersResolver = (r, i) =>
            (function p0(e, t, n) {
              const r = xt();
              if (r.firstCreatePass) {
                const i = Pn(e);
                fd(n, r.data, r.blueprint, i, !0), fd(t, r.data, r.blueprint, i, !1);
              }
            })(r, i ? i(e) : e, t);
        };
      }
      class Ko {}
      class Cm {}
      function v0(e, t) {
        return new md(e, t ?? null, []);
      }
      class md extends Ko {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new _p(this));
          const i = jn(t);
          (this._bootstrapComponents = io(i.bootstrap)),
            (this._r3Injector = Oh(
              t,
              n,
              [
                { provide: Ko, useValue: this },
                { provide: Ol, useValue: this.componentFactoryResolver },
                ...r,
              ],
              tt(t),
              new Set(['environment'])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(), this.destroyCbs.forEach(n => n()), (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class yd extends Cm {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new md(this.moduleType, t, []);
        }
      }
      class _m extends Ko {
        constructor(t) {
          super(), (this.componentFactoryResolver = new _p(this)), (this.instance = null);
          const n = new ms(
            [
              ...t.providers,
              { provide: Ko, useValue: this },
              { provide: Ol, useValue: this.componentFactoryResolver },
            ],
            t.parent || Il(),
            t.debugName,
            new Set(['environment'])
          );
          (this.injector = n), t.runEnvironmentInitializers && n.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function wm(e, t, n = null) {
        return new _m({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: !0 })
          .injector;
      }
      let E0 = (() => {
        class e {
          constructor(n) {
            (this._injector = n), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(n) {
            if (!n.standalone) return null;
            if (!this.cachedInjectors.has(n)) {
              const r = gh(0, n.type),
                i = r.length > 0 ? wm([r], this._injector, `Standalone[${n.type.name}]`) : null;
              this.cachedInjectors.set(n, i);
            }
            return this.cachedInjectors.get(n);
          }
          ngOnDestroy() {
            try {
              for (const n of this.cachedInjectors.values()) null !== n && n.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
          static #e = (this.ɵprov = Jt({
            token: e,
            providedIn: 'environment',
            factory: () => new e(F(Hi)),
          }));
        }
        return e;
      })();
      function bm(e) {
        e.getStandaloneInjector = t => t.get(E0).getOrCreateStandaloneInjector(e);
      }
      function Pm(e, t, n, r) {
        return Fm(Ee(), hr(), e, t, n, r);
      }
      function Nm(e, t, n, r, i) {
        return (function Lm(e, t, n, r, i, o, s) {
          const u = t + n;
          return zo(e, u, i, o) ? Vi(e, u + 2, s ? r.call(s, i, o) : r(i, o)) : Oa(e, u + 2);
        })(Ee(), hr(), e, t, n, r, i);
      }
      function Om(e, t, n, r, i, o, s) {
        return (function jm(e, t, n, r, i, o, s, u, h) {
          const D = t + n;
          return ui(e, D, i, o, s, u)
            ? Vi(e, D + 4, h ? r.call(h, i, o, s, u) : r(i, o, s, u))
            : Oa(e, D + 4);
        })(Ee(), hr(), e, t, n, r, i, o, s);
      }
      function xm(e, t, n, r, i, o, s, u) {
        const h = hr() + e,
          D = Ee(),
          S = ui(D, h, n, r, i, o);
        return gr(D, h + 4, s) || S
          ? Vi(D, h + 5, u ? t.call(u, n, r, i, o, s) : t(n, r, i, o, s))
          : (function wa(e, t) {
              return e[t];
            })(D, h + 5);
      }
      function Oa(e, t) {
        const n = e[t];
        return n === mt ? void 0 : n;
      }
      function Fm(e, t, n, r, i, o) {
        const s = t + n;
        return gr(e, s, i) ? Vi(e, s + 1, o ? r.call(o, i) : r(i)) : Oa(e, s + 1);
      }
      function Hm(e, t) {
        const n = xt();
        let r;
        const i = e + wt;
        n.firstCreatePass
          ? ((r = (function F0(e, t) {
              if (t)
                for (let n = t.length - 1; n >= 0; n--) {
                  const r = t[n];
                  if (e === r.name) return r;
                }
            })(t, n.pipeRegistry)),
            (n.data[i] = r),
            r.onDestroy && (n.destroyHooks ??= []).push(i, r.onDestroy))
          : (r = n.data[i]);
        const o = r.factory || (r.factory = T(r.type)),
          u = pn(ws);
        try {
          const h = el(!1),
            D = o();
          return (
            el(h),
            (function D_(e, t, n, r) {
              n >= e.data.length && ((e.data[n] = null), (e.blueprint[n] = null)), (t[n] = r);
            })(n, Ee(), i, D),
            D
          );
        } finally {
          pn(u);
        }
      }
      function Um(e, t, n) {
        const r = e + wt,
          i = Ee(),
          o = (function Ji(e, t) {
            return e[t];
          })(i, r);
        return (function xa(e, t) {
          return e[Ne].data[t].pure;
        })(i, r)
          ? Fm(i, hr(), t, o.transform, n, o)
          : o.transform(n);
      }
      function H0() {
        return this._results[Symbol.iterator]();
      }
      class Dd {
        static #e = Symbol.iterator;
        get changes() {
          return this._changes || (this._changes = new Ui());
        }
        constructor(t = !1) {
          (this._emitDistinctChangesOnly = t),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0);
          const n = Dd.prototype;
          n[Symbol.iterator] || (n[Symbol.iterator] = H0);
        }
        get(t) {
          return this._results[t];
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, n) {
          return this._results.reduce(t, n);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t, n) {
          const r = this;
          r.dirty = !1;
          const i = (function li(e) {
            return e.flat(Number.POSITIVE_INFINITY);
          })(t);
          (this._changesDetected = !(function Tv(e, t, n) {
            if (e.length !== t.length) return !1;
            for (let r = 0; r < e.length; r++) {
              let i = e[r],
                o = t[r];
              if ((n && ((i = n(i)), (o = n(o))), o !== i)) return !1;
            }
            return !0;
          })(r._results, i, n)) &&
            ((r._results = i),
            (r.length = i.length),
            (r.last = i[this.length - 1]),
            (r.first = i[0]));
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      function $0(e, t, n, r = !0) {
        const i = t[Ne];
        if (
          ((function yD(e, t, n, r) {
            const i = Sn + r,
              o = n.length;
            r > 0 && (n[i - 1][$n] = t),
              r < o - Sn ? ((t[$n] = n[i]), mf(n, Sn + r, t)) : (n.push(t), (t[$n] = null)),
              (t[Gt] = n);
            const s = t[Kr];
            null !== s &&
              n !== s &&
              (function vD(e, t) {
                const n = e[wr];
                t[an] !== t[Gt][Gt][an] && (e[yi] = !0), null === n ? (e[wr] = [t]) : n.push(t);
              })(s, t);
            const u = t[ar];
            null !== u && u.insertView(e), (t[ut] |= 128);
          })(i, t, e, n),
          r)
        ) {
          const o = Yu(n, e),
            s = t[it],
            u = vl(s, e[tn]);
          null !== u &&
            (function pD(e, t, n, r, i, o) {
              (r[en] = i), (r[bn] = t), da(e, r, n, 1, i, o);
            })(i, e[bn], s, t, u, o);
        }
      }
      let Fa = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = G0);
        }
        return e;
      })();
      const V0 = Fa,
        z0 = class extends V0 {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n);
          }
          createEmbeddedViewImpl(t, n, r) {
            const i = (function U0(e, t, n, r) {
              const i = t.tView,
                u = Ll(
                  e,
                  i,
                  n,
                  4096 & e[ut] ? 4096 : 16,
                  null,
                  t,
                  null,
                  null,
                  null,
                  r?.injector ?? null,
                  r?.hydrationInfo ?? null
                );
              u[Kr] = e[t.index];
              const D = e[ar];
              return null !== D && (u[ar] = D.createEmbeddedView(i)), Hc(i, u, n), u;
            })(this._declarationLView, this._declarationTContainer, t, {
              injector: n,
              hydrationInfo: r,
            });
            return new Ca(i);
          }
        };
      function G0() {
        return nu(Gn(), Ee());
      }
      function nu(e, t) {
        return 4 & e.type ? new z0(t, e, Es(e, t)) : null;
      }
      let iu = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = Z0);
        }
        return e;
      })();
      function Z0() {
        return Ym(Gn(), Ee());
      }
      const X0 = iu,
        Wm = class extends X0 {
          constructor(t, n, r) {
            super(), (this._lContainer = t), (this._hostTNode = n), (this._hostLView = r);
          }
          get element() {
            return Es(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Mr(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = nl(this._hostTNode, this._hostLView);
            if (Mu(t)) {
              const n = ra(t, this._hostLView),
                r = na(t);
              return new Mr(n[Ne].data[r + 8], n);
            }
            return new Mr(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = Km(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Sn;
          }
          createEmbeddedView(t, n, r) {
            let i, o;
            'number' == typeof r ? (i = r) : null != r && ((i = r.index), (o = r.injector));
            const u = t.createEmbeddedViewImpl(n || {}, o, null);
            return this.insertImpl(u, i, false), u;
          }
          createComponent(t, n, r, i, o) {
            const s =
              t &&
              !(function oa(e) {
                return 'function' == typeof e;
              })(t);
            let u;
            if (s) u = n;
            else {
              const _e = n || {};
              (u = _e.index),
                (r = _e.injector),
                (i = _e.projectableNodes),
                (o = _e.environmentInjector || _e.ngModuleRef);
            }
            const h = s ? t : new _a(_t(t)),
              D = r || this.parentInjector;
            if (!o && null == h.ngModule) {
              const xe = (s ? D : this.parentInjector).get(Hi, null);
              xe && (o = xe);
            }
            _t(h.componentType ?? {});
            const H = h.create(D, i, null, o);
            return this.insertImpl(H.hostView, u, false), H;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1);
          }
          insertImpl(t, n, r) {
            const i = t._lView;
            if (
              (function qs(e) {
                return vn(e[Gt]);
              })(i)
            ) {
              const h = this.indexOf(t);
              if (-1 !== h) this.detach(h);
              else {
                const D = i[Gt],
                  S = new Wm(D, D[bn], D[Gt]);
                S.detach(S.indexOf(t));
              }
            }
            const s = this._adjustIndex(n),
              u = this._lContainer;
            return $0(u, i, s, !r), t.attachToViewContainerRef(), mf(Ed(u), s, t), t;
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = Km(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = yl(this._lContainer, n);
            r && (il(Ed(this._lContainer), n), zu(r[Ne], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = yl(this._lContainer, n);
            return r && null != il(Ed(this._lContainer), n) ? new Ca(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function Km(e) {
        return e[8];
      }
      function Ed(e) {
        return e[8] || (e[8] = []);
      }
      function Ym(e, t) {
        let n;
        const r = t[e.index];
        return (
          vn(r) ? (n = r) : ((n = cp(r, t, null, e)), (t[e.index] = n), kl(t, n)),
          qm(n, t, e, r),
          new Wm(n, e, t)
        );
      }
      let qm = function Qm(e, t, n, r) {
        if (e[tn]) return;
        let i;
        (i =
          8 & n.type
            ? Mt(r)
            : (function J0(e, t) {
                const n = e[it],
                  r = n.createComment(''),
                  i = zn(t, e);
                return (
                  Ho(
                    n,
                    vl(n, i),
                    r,
                    (function _D(e, t) {
                      return e.nextSibling(t);
                    })(n, i),
                    !1
                  ),
                  r
                );
              })(t, n)),
          (e[tn] = i);
      };
      class Cd {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Cd(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class _d {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const n = t.queries;
          if (null !== n) {
            const r = null !== t.contentQueries ? t.contentQueries[0] : n.length,
              i = [];
            for (let o = 0; o < r; o++) {
              const s = n.getByIndex(o);
              i.push(this.queries[s.indexInDeclarationView].clone());
            }
            return new _d(i);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let n = 0; n < this.queries.length; n++)
            null !== oy(t, n).matches && this.queries[n].setDirty();
        }
      }
      class Zm {
        constructor(t, n, r = null) {
          (this.predicate = t), (this.flags = n), (this.read = r);
        }
      }
      class wd {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, n) {
          for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(t, n);
        }
        elementEnd(t) {
          for (let n = 0; n < this.queries.length; n++) this.queries[n].elementEnd(t);
        }
        embeddedTView(t) {
          let n = null;
          for (let r = 0; r < this.length; r++) {
            const i = null !== n ? n.length : 0,
              o = this.getByIndex(r).embeddedTView(t, i);
            o && ((o.indexInDeclarationView = r), null !== n ? n.push(o) : (n = [o]));
          }
          return null !== n ? new wd(n) : null;
        }
        template(t, n) {
          for (let r = 0; r < this.queries.length; r++) this.queries[r].template(t, n);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class bd {
        constructor(t, n = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = n);
        }
        elementStart(t, n) {
          this.isApplyingToNode(n) && this.matchTNode(t, n);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
        }
        template(t, n) {
          this.elementStart(t, n);
        }
        embeddedTView(t, n) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0), this.addMatch(-t.index, n), new bd(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const n = this._declarationNodeIndex;
            let r = t.parent;
            for (; null !== r && 8 & r.type && r.index !== n; ) r = r.parent;
            return n === (null !== r ? r.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, n) {
          const r = this.metadata.predicate;
          if (Array.isArray(r))
            for (let i = 0; i < r.length; i++) {
              const o = r[i];
              this.matchTNodeWithReadOption(t, n, nb(n, o)),
                this.matchTNodeWithReadOption(t, n, rl(n, t, o, !1, !1));
            }
          else
            r === Fa
              ? 4 & n.type && this.matchTNodeWithReadOption(t, n, -1)
              : this.matchTNodeWithReadOption(t, n, rl(n, t, r, !1, !1));
        }
        matchTNodeWithReadOption(t, n, r) {
          if (null !== r) {
            const i = this.metadata.read;
            if (null !== i)
              if (i === ya || i === iu || (i === Fa && 4 & n.type)) this.addMatch(n.index, -2);
              else {
                const o = rl(n, t, i, !1, !1);
                null !== o && this.addMatch(n.index, o);
              }
            else this.addMatch(n.index, r);
          }
        }
        addMatch(t, n) {
          null === this.matches ? (this.matches = [t, n]) : this.matches.push(t, n);
        }
      }
      function nb(e, t) {
        const n = e.localNames;
        if (null !== n) for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
        return null;
      }
      function ib(e, t, n, r) {
        return -1 === n
          ? (function rb(e, t) {
              return 11 & e.type ? Es(e, t) : 4 & e.type ? nu(e, t) : null;
            })(t, e)
          : -2 === n
            ? (function ob(e, t, n) {
                return n === ya ? Es(t, e) : n === Fa ? nu(t, e) : n === iu ? Ym(t, e) : void 0;
              })(e, t, r)
            : Bo(e, e[Ne], n, t);
      }
      function Xm(e, t, n, r) {
        const i = t[ar].queries[r];
        if (null === i.matches) {
          const o = e.data,
            s = n.matches,
            u = [];
          for (let h = 0; h < s.length; h += 2) {
            const D = s[h];
            u.push(D < 0 ? null : ib(t, o[D], s[h + 1], n.metadata.read));
          }
          i.matches = u;
        }
        return i.matches;
      }
      function Sd(e, t, n, r) {
        const i = e.queries.getByIndex(n),
          o = i.matches;
        if (null !== o) {
          const s = Xm(e, t, i, n);
          for (let u = 0; u < o.length; u += 2) {
            const h = o[u];
            if (h > 0) r.push(s[u / 2]);
            else {
              const D = o[u + 1],
                S = t[-h];
              for (let A = Sn; A < S.length; A++) {
                const j = S[A];
                j[Kr] === j[Gt] && Sd(j[Ne], j, D, r);
              }
              if (null !== S[wr]) {
                const A = S[wr];
                for (let j = 0; j < A.length; j++) {
                  const H = A[j];
                  Sd(H[Ne], H, D, r);
                }
              }
            }
          }
        }
        return r;
      }
      function Jm(e) {
        const t = Ee(),
          n = xt(),
          r = P();
        Z(r + 1);
        const i = oy(n, r);
        if (
          e.dirty &&
          (function Wd(e) {
            return 4 == (4 & e[ut]);
          })(t) ===
            (2 == (2 & i.metadata.flags))
        ) {
          if (null === i.matches) e.reset([]);
          else {
            const o = i.crossesNgTemplate ? Sd(n, t, r, []) : Xm(n, t, i, r);
            e.reset(o, IE), e.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function ey(e, t, n) {
        const r = xt();
        r.firstCreatePass &&
          (iy(r, new Zm(e, t, n), -1), 2 == (2 & t) && (r.staticViewQueries = !0)),
          ry(r, Ee(), t);
      }
      function ty(e, t, n, r) {
        const i = xt();
        if (i.firstCreatePass) {
          const o = Gn();
          iy(i, new Zm(t, n, r), o.index),
            (function ab(e, t) {
              const n = e.contentQueries || (e.contentQueries = []);
              t !== (n.length ? n[n.length - 1] : -1) && n.push(e.queries.length - 1, t);
            })(i, e),
            2 == (2 & n) && (i.staticContentQueries = !0);
        }
        ry(i, Ee(), n);
      }
      function ny() {
        return (function sb(e, t) {
          return e[ar].queries[t].queryList;
        })(Ee(), P());
      }
      function ry(e, t, n) {
        const r = new Dd(4 == (4 & n));
        (function sC(e, t, n, r) {
          const i = fp(t);
          i.push(n), e.firstCreatePass && hp(e).push(r, i.length - 1);
        })(e, t, r, r.destroy),
          null === t[ar] && (t[ar] = new _d()),
          t[ar].queries.push(new Cd(r));
      }
      function iy(e, t, n) {
        null === e.queries && (e.queries = new wd()), e.queries.track(new bd(t, n));
      }
      function oy(e, t) {
        return e.queries.getByIndex(t);
      }
      function Md(e) {
        return !!jn(e);
      }
      const _y = new et('Application Initializer');
      let Pd = (() => {
          class e {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((n, r) => {
                  (this.resolve = n), (this.reject = r);
                })),
                (this.appInits = ge(_y, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const n = [];
              for (const i of this.appInits) {
                const o = i();
                if (Xc(o)) n.push(o);
                else if (Yp(o)) {
                  const s = new Promise((u, h) => {
                    o.subscribe({ complete: u, error: h });
                  });
                  n.push(s);
                }
              }
              const r = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(n)
                .then(() => {
                  r();
                })
                .catch(i => {
                  this.reject(i);
                }),
                0 === n.length && r(),
                (this.initialized = !0);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = Jt({ token: e, factory: e.ɵfac, providedIn: 'root' }));
          }
          return e;
        })(),
        wy = (() => {
          class e {
            log(n) {
              console.log(n);
            }
            warn(n) {
              console.warn(n);
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = Jt({ token: e, factory: e.ɵfac, providedIn: 'platform' }));
          }
          return e;
        })();
      const su = new et('LocaleId', {
          providedIn: 'root',
          factory: () =>
            ge(su, Ze.Optional | Ze.SkipSelf) ||
            (function Ab() {
              return (typeof $localize < 'u' && $localize.locale) || ks;
            })(),
        }),
        Rb = new et('DefaultCurrencyCode', { providedIn: 'root', factory: () => 'USD' });
      let by = (() => {
        class e {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new Q.X(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = Jt({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        }
        return e;
      })();
      class Nb {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let Ob = (() => {
        class e {
          compileModuleSync(n) {
            return new yd(n);
          }
          compileModuleAsync(n) {
            return Promise.resolve(this.compileModuleSync(n));
          }
          compileModuleAndAllComponentsSync(n) {
            const r = this.compileModuleSync(n),
              o = io(jn(n).declarations).reduce((s, u) => {
                const h = _t(u);
                return h && s.push(new _a(h)), s;
              }, []);
            return new Nb(r, o);
          }
          compileModuleAndAllComponentsAsync(n) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = Jt({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        }
        return e;
      })();
      const Ty = new et(''),
        Ay = new et('');
      let xd,
        tS = (() => {
          class e {
            constructor(n, r, i) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                xd ||
                  ((function nS(e) {
                    xd = e;
                  })(i),
                  i.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > 'u' ? null : Zone.current.get('TaskTrackingZone');
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      tr.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0), this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (this._pendingCount += 1), (this._didWork = !0), this._pendingCount;
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero');
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  r => !r.updateCb || !r.updateCb(n) || (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(n => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, i) {
              let o = -1;
              r &&
                r > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(s => s.timeoutId !== o)),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: o, updateCb: i });
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, i) {
              return [];
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(F(tr), F(Ry), F(Ay));
            });
            static #t = (this.ɵprov = Jt({ token: e, factory: e.ɵfac }));
          }
          return e;
        })(),
        Ry = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return xd?.findTestabilityInTree(this, n, r) ?? null;
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)();
            });
            static #t = (this.ɵprov = Jt({ token: e, factory: e.ɵfac, providedIn: 'platform' }));
          }
          return e;
        })(),
        bo = null;
      const Py = new et('AllowMultipleToken'),
        Fd = new et('PlatformDestroyListeners'),
        Ld = new et('appBootstrapListener');
      class oS {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function xy(e, t, n = []) {
        const r = `Platform: ${t}`,
          i = new et(r);
        return (o = []) => {
          let s = kd();
          if (!s || s.injector.get(Py, !1)) {
            const u = [...n, ...o, { provide: i, useValue: !0 }];
            e
              ? e(u)
              : (function sS(e) {
                  if (bo && !bo.get(Py, !1)) throw new ne(400, !1);
                  (function Ny() {
                    !(function y(e) {
                      d = e;
                    })(() => {
                      throw new ne(600, !1);
                    });
                  })(),
                    (bo = e);
                  const t = e.get(Ly);
                  (function Oy(e) {
                    e.get(Ch, null)?.forEach(n => n());
                  })(e);
                })(
                  (function Fy(e = [], t) {
                    return bi.create({
                      name: t,
                      providers: [
                        { provide: ac, useValue: 'platform' },
                        { provide: Fd, useValue: new Set([() => (bo = null)]) },
                        ...e,
                      ],
                    });
                  })(u, r)
                );
          }
          return (function lS(e) {
            const t = kd();
            if (!t) throw new ne(401, !1);
            return t;
          })();
        };
      }
      function kd() {
        return bo?.get(Ly) ?? null;
      }
      let Ly = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const i = (function uS(e = 'zone.js', t) {
              return 'noop' === e ? new VE() : 'zone.js' === e ? new tr(t) : e;
            })(
              r?.ngZone,
              (function ky(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return i.run(() => {
              const o = (function D0(e, t, n) {
                  return new md(e, t, n);
                })(
                  n.moduleType,
                  this.injector,
                  (function $y(e) {
                    return [
                      { provide: tr, useFactory: e },
                      {
                        provide: pa,
                        multi: !0,
                        useFactory: () => {
                          const t = ge(dS, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: Uy, useFactory: cS },
                      { provide: jh, useFactory: Bh },
                    ];
                  })(() => i)
                ),
                s = o.injector.get(_o, null);
              return (
                i.runOutsideAngular(() => {
                  const u = i.onError.subscribe({
                    next: h => {
                      s.handleError(h);
                    },
                  });
                  o.onDestroy(() => {
                    lu(this._modules, o), u.unsubscribe();
                  });
                }),
                (function jy(e, t, n) {
                  try {
                    const r = n();
                    return Xc(r)
                      ? r.catch(i => {
                          throw (t.runOutsideAngular(() => e.handleError(i)), i);
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(s, i, () => {
                  const u = o.injector.get(Pd);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function qg(e) {
                          Ft(e, 'Expected localeId to be defined'),
                            'string' == typeof e && (Yg = e.toLowerCase().replace(/_/g, '-'));
                        })(o.injector.get(su, ks) || ks),
                        this._moduleDoBootstrap(o),
                        o
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const i = By({}, r);
            return (function rS(e, t, n) {
              const r = new yd(n);
              return Promise.resolve(r);
            })(0, 0, n).then(o => this.bootstrapModuleFactory(o, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Hs);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach(i => r.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new ne(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new ne(404, !1);
            this._modules.slice().forEach(r => r.destroy()),
              this._destroyListeners.forEach(r => r());
            const n = this._injector.get(Fd, null);
            n && (n.forEach(r => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(F(bi));
          });
          static #t = (this.ɵprov = Jt({ token: e, factory: e.ɵfac, providedIn: 'platform' }));
        }
        return e;
      })();
      function By(e, t) {
        return Array.isArray(t) ? t.reduce(By, e) : { ...e, ...t };
      }
      let Hs = (() => {
        class e {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = ge(Uy)),
              (this.zoneIsStable = ge(jh)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = ge(by).hasPendingTasks.pipe(
                (0, Ce.w)(n => (n ? (0, q.of)(!1) : this.zoneIsStable)),
                (function $e(e, t = He.y) {
                  return (
                    (e = e ?? Et),
                    (0, se.e)((n, r) => {
                      let i,
                        o = !0;
                      n.subscribe(
                        (0, Re.x)(r, s => {
                          const u = t(s);
                          (o || !e(i, u)) && ((o = !1), (i = u), r.next(s));
                        })
                      );
                    })
                  );
                })(),
                ye()
              )),
              (this._injector = ge(Hi));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const i = n instanceof Sh;
            if (!this._injector.get(Pd).done) throw (!i && zr(n), new ne(405, !1));
            let s;
            (s = i ? n : this._injector.get(Ol).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const u = (function iS(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Ko),
              D = s.create(bi.NULL, [], r || s.selector, u),
              S = D.location.nativeElement,
              A = D.injector.get(Ty, null);
            return (
              A?.registerApplication(S),
              D.onDestroy(() => {
                this.detachView(D.hostView), lu(this.components, D), A?.unregisterApplication(S);
              }),
              this._loadComponent(D),
              D
            );
          }
          tick() {
            if (this._runningTick) throw new ne(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            lu(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(Ld, []);
            r.push(...this._bootstrapListeners), r.forEach(i => i(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach(n => n()),
                  this._views.slice().forEach(n => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return this._destroyListeners.push(n), () => lu(this._destroyListeners, n);
          }
          destroy() {
            if (this._destroyed) throw new ne(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = Jt({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        }
        return e;
      })();
      function lu(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const Uy = new et('', { providedIn: 'root', factory: () => ge(_o).handleError.bind(void 0) });
      function cS() {
        const e = ge(tr),
          t = ge(_o);
        return n => e.runOutsideAngular(() => t.handleError(n));
      }
      let dS = (() => {
        class e {
          constructor() {
            (this.zone = ge(tr)), (this.applicationRef = ge(Hs));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this.zone.run(() => {
                    this.applicationRef.tick();
                  });
                },
              }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)();
          });
          static #t = (this.ɵprov = Jt({ token: e, factory: e.ɵfac, providedIn: 'root' }));
        }
        return e;
      })();
      function hS() {
        return !1;
      }
      let pS = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = gS);
        }
        return e;
      })();
      function gS(e) {
        return (function mS(e, t, n) {
          if (Yr(e) && !n) {
            const r = Lr(e.index, t);
            return new Ca(r, r);
          }
          return 47 & e.type ? new Ca(t[an], t) : null;
        })(Gn(), Ee(), 16 == (16 & e));
      }
      class Wy {
        constructor() {}
        supports(t) {
          return Ul(t);
        }
        create(t) {
          return new _S(t);
        }
      }
      const CS = (e, t) => t;
      class _S {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || CS);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            i = 0,
            o = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Yy(r, i, o)) ? n : r,
              u = Yy(s, i, o),
              h = s.currentIndex;
            if (s === r) i--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) i++;
            else {
              o || (o = []);
              const D = u - i,
                S = h - i;
              if (D != S) {
                for (let j = 0; j < D; j++) {
                  const H = j < o.length ? o[j] : (o[j] = 0),
                    ce = H + j;
                  S <= ce && ce < D && (o[j] = H + 1);
                }
                o[s.previousIndex] = S - D;
              }
            }
            u !== h && t(s, u, h);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (n = this._identityChangesHead; null !== n; n = n._nextIdentityChange) t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Ul(t))) throw new ne(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let i,
            o,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let u = 0; u < this.length; u++)
              (o = t[u]),
                (s = this._trackByFn(u, o)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, o, s, u)),
                    Object.is(n.item, o) || this._addIdentityChange(n, o))
                  : ((n = this._mismatch(n, o, s, u)), (r = !0)),
                (n = n._next);
          } else
            (i = 0),
              (function XC(e, t) {
                if (Array.isArray(e)) for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, u => {
                (s = this._trackByFn(i, u)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, u, s, i)),
                      Object.is(n.item, u) || this._addIdentityChange(n, u))
                    : ((n = this._mismatch(n, u, s, i)), (r = !0)),
                  (n = n._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (t = this._previousItHead = this._itHead; null !== t; t = t._next)
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null, t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, i) {
          let o;
          return (
            null === t ? (o = this._itTail) : ((o = t._prev), this._remove(t)),
            null !==
            (t = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, o, i))
              : null !== (t = null === this._linkedRecords ? null : this._linkedRecords.get(r, i))
                ? (Object.is(t.item, n) || this._addIdentityChange(t, n), this._moveAfter(t, o, i))
                : (t = this._addAfter(new wS(n, r), o, i)),
            t
          );
        }
        _verifyReinsertion(t, n, r, i) {
          let o = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(r, null);
          return (
            null !== o
              ? (t = this._reinsertAfter(o, t._prev, i))
              : t.currentIndex != i && ((t.currentIndex = i), this._addToMoves(t, i)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail && (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail && (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const i = t._prevRemoved,
            o = t._nextRemoved;
          return (
            null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
            null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return this._unlink(t), this._insertAfter(t, n, r), this._addToMoves(t, r), t;
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const i = null === n ? this._itHead : n._next;
          return (
            (t._next = i),
            (t._prev = n),
            null === i ? (this._itTail = t) : (i._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new Ky()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords && (this._unlinkedRecords = new Ky()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t), (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class wS {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class bS {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t), (t._nextDup = null), (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if ((null === n || n <= r.currentIndex) && Object.is(r.trackById, t)) return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Ky {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new bS()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const i = this.map.get(t);
          return i ? i.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Yy(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + t + i;
      }
      class qy {
        constructor() {}
        supports(t) {
          return t instanceof Map || $c(t);
        }
        create() {
          return new SS();
        }
      }
      class SS {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || $c(t))) throw new ne(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, i) => {
              if (n && n.key === i)
                this._maybeAddToChanges(n, r), (this._appendAfter = n), (n = n._next);
              else {
                const o = this._getOrCreateRecordForKey(i, r);
                n = this._insertBeforeOrAppend(n, o);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const i = this._records.get(t);
            this._maybeAddToChanges(i, n);
            const o = i._prev,
              s = i._next;
            return o && (o._next = s), s && (s._prev = o), (i._next = null), (i._prev = null), i;
          }
          const r = new MS(t);
          return this._records.set(t, r), (r.currentValue = n), this._addToAdditions(r), r;
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue), (t.currentValue = n), this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map ? t.forEach(n) : Object.keys(t).forEach(r => n(t[r], r));
        }
      }
      class MS {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function Qy() {
        return new $d([new Wy()]);
      }
      let $d = (() => {
        class e {
          static #e = (this.ɵprov = Jt({ token: e, providedIn: 'root', factory: Qy }));
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: r => e.create(n, r || Qy()),
              deps: [[e, new al(), new sl()]],
            };
          }
          find(n) {
            const r = this.factories.find(i => i.supports(n));
            if (null != r) return r;
            throw new ne(901, !1);
          }
        }
        return e;
      })();
      function Zy() {
        return new Vd([new qy()]);
      }
      let Vd = (() => {
        class e {
          static #e = (this.ɵprov = Jt({ token: e, providedIn: 'root', factory: Zy }));
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: r => e.create(n, r || Zy()),
              deps: [[e, new al(), new sl()]],
            };
          }
          find(n) {
            const r = this.factories.find(i => i.supports(n));
            if (r) return r;
            throw new ne(901, !1);
          }
        }
        return e;
      })();
      const AS = xy(null, 'core', []);
      let RS = (() => {
        class e {
          constructor(n) {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(F(Hs));
          });
          static #t = (this.ɵmod = uo({ type: e }));
          static #n = (this.ɵinj = dr({}));
        }
        return e;
      })();
      function US(e) {
        return 'boolean' == typeof e ? e : null != e && 'false' !== e;
      }
      function VS(e) {
        const t = _t(e);
        if (!t) return null;
        const n = new _a(t);
        return {
          get selector() {
            return n.selector;
          },
          get type() {
            return n.componentType;
          },
          get inputs() {
            return n.inputs;
          },
          get outputs() {
            return n.outputs;
          },
          get ngContentSelectors() {
            return n.ngContentSelectors;
          },
          get isStandalone() {
            return t.standalone;
          },
          get isSignal() {
            return t.signals;
          },
        };
      }
    },
    6593: (We, fe, M) => {
      M.d(fe, { Dx: () => dr, H7: () => qn, b2: () => $t, q6: () => Xt, se: () => X });
      var m = M(4769),
        U = M(6814);
      class B extends U.w_ {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class ie extends B {
        static makeCurrent() {
          (0, U.HT)(new ie());
        }
        onAndCancel(z, N, L) {
          return (
            z.addEventListener(N, L),
            () => {
              z.removeEventListener(N, L);
            }
          );
        }
        dispatchEvent(z, N) {
          z.dispatchEvent(N);
        }
        remove(z) {
          z.parentNode && z.parentNode.removeChild(z);
        }
        createElement(z, N) {
          return (N = N || this.getDefaultDocument()).createElement(z);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle');
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(z) {
          return z.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(z) {
          return z instanceof DocumentFragment;
        }
        getGlobalEventTarget(z, N) {
          return 'window' === N ? window : 'document' === N ? z : 'body' === N ? z.body : null;
        }
        getBaseHref(z) {
          const N = (function q() {
            return (Q = Q || document.querySelector('base')), Q ? Q.getAttribute('href') : null;
          })();
          return null == N
            ? null
            : (function Te(oe) {
                (pe = pe || document.createElement('a')), pe.setAttribute('href', oe);
                const z = pe.pathname;
                return '/' === z.charAt(0) ? z : `/${z}`;
              })(N);
        }
        resetBaseElement() {
          Q = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(z) {
          return (0, U.Mx)(document.cookie, z);
        }
      }
      let pe,
        Q = null,
        ye = (() => {
          class oe {
            build() {
              return new XMLHttpRequest();
            }
            static #e = (this.ɵfac = function (L) {
              return new (L || oe)();
            });
            static #t = (this.ɵprov = m.Yz7({ token: oe, factory: oe.ɵfac }));
          }
          return oe;
        })();
      const te = new m.OlP('EventManagerPlugins');
      let Ce = (() => {
        class oe {
          constructor(N, L) {
            (this._zone = L),
              (this._eventNameToPlugin = new Map()),
              N.forEach(le => {
                le.manager = this;
              }),
              (this._plugins = N.slice().reverse());
          }
          addEventListener(N, L, le) {
            return this._findPluginFor(L).addEventListener(N, L, le);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(N) {
            let L = this._eventNameToPlugin.get(N);
            if (L) return L;
            if (((L = this._plugins.find(je => je.supports(N))), !L)) throw new m.vHH(5101, !1);
            return this._eventNameToPlugin.set(N, L), L;
          }
          static #e = (this.ɵfac = function (L) {
            return new (L || oe)(m.LFG(te), m.LFG(m.R0b));
          });
          static #t = (this.ɵprov = m.Yz7({ token: oe, factory: oe.ɵfac }));
        }
        return oe;
      })();
      class He {
        constructor(z) {
          this._doc = z;
        }
      }
      const Re = 'ng-app-id';
      let $e = (() => {
        class oe {
          constructor(N, L, le, je = {}) {
            (this.doc = N),
              (this.appId = L),
              (this.nonce = le),
              (this.platformId = je),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = (0, U.PM)(je)),
              this.resetHostNodes();
          }
          addStyles(N) {
            for (const L of N) 1 === this.changeUsageCount(L, 1) && this.onStyleAdded(L);
          }
          removeStyles(N) {
            for (const L of N) this.changeUsageCount(L, -1) <= 0 && this.onStyleRemoved(L);
          }
          ngOnDestroy() {
            const N = this.styleNodesInDOM;
            N && (N.forEach(L => L.remove()), N.clear());
            for (const L of this.getAllStyles()) this.onStyleRemoved(L);
            this.resetHostNodes();
          }
          addHost(N) {
            this.hostNodes.add(N);
            for (const L of this.getAllStyles()) this.addStyleToHost(N, L);
          }
          removeHost(N) {
            this.hostNodes.delete(N);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(N) {
            for (const L of this.hostNodes) this.addStyleToHost(L, N);
          }
          onStyleRemoved(N) {
            const L = this.styleRef;
            L.get(N)?.elements?.forEach(le => le.remove()), L.delete(N);
          }
          collectServerRenderedStyles() {
            const N = this.doc.head?.querySelectorAll(`style[${Re}="${this.appId}"]`);
            if (N?.length) {
              const L = new Map();
              return (
                N.forEach(le => {
                  null != le.textContent && L.set(le.textContent, le);
                }),
                L
              );
            }
            return null;
          }
          changeUsageCount(N, L) {
            const le = this.styleRef;
            if (le.has(N)) {
              const je = le.get(N);
              return (je.usage += L), je.usage;
            }
            return le.set(N, { usage: L, elements: [] }), L;
          }
          getStyleElement(N, L) {
            const le = this.styleNodesInDOM,
              je = le?.get(L);
            if (je?.parentNode === N) return le.delete(L), je.removeAttribute(Re), je;
            {
              const Xe = this.doc.createElement('style');
              return (
                this.nonce && Xe.setAttribute('nonce', this.nonce),
                (Xe.textContent = L),
                this.platformIsServer && Xe.setAttribute(Re, this.appId),
                Xe
              );
            }
          }
          addStyleToHost(N, L) {
            const le = this.getStyleElement(N, L);
            N.appendChild(le);
            const je = this.styleRef,
              Xe = je.get(L)?.elements;
            Xe ? Xe.push(le) : je.set(L, { elements: [le], usage: 1 });
          }
          resetHostNodes() {
            const N = this.hostNodes;
            N.clear(), N.add(this.doc.head);
          }
          static #e = (this.ɵfac = function (L) {
            return new (L || oe)(m.LFG(U.K0), m.LFG(m.AFp), m.LFG(m.Ojb, 8), m.LFG(m.Lbi));
          });
          static #t = (this.ɵprov = m.Yz7({ token: oe, factory: oe.ɵfac }));
        }
        return oe;
      })();
      const Et = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        Le = /%COMP%/g,
        ve = new m.OlP('RemoveStylesOnCompDestroy', { providedIn: 'root', factory: () => !1 });
      function we(oe, z) {
        return z.map(N => N.replace(Le, oe));
      }
      let X = (() => {
        class oe {
          constructor(N, L, le, je, Xe, Lt, Ct, Qt = null) {
            (this.eventManager = N),
              (this.sharedStylesHost = L),
              (this.appId = le),
              (this.removeStylesOnCompDestroy = je),
              (this.doc = Xe),
              (this.platformId = Lt),
              (this.ngZone = Ct),
              (this.nonce = Qt),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = (0, U.PM)(Lt)),
              (this.defaultRenderer = new Se(N, Xe, Ct, this.platformIsServer));
          }
          createRenderer(N, L) {
            if (!N || !L) return this.defaultRenderer;
            this.platformIsServer &&
              L.encapsulation === m.ifc.ShadowDom &&
              (L = { ...L, encapsulation: m.ifc.Emulated });
            const le = this.getOrCreateRenderer(N, L);
            return le instanceof Tn ? le.applyToHost(N) : le instanceof fn && le.applyStyles(), le;
          }
          getOrCreateRenderer(N, L) {
            const le = this.rendererByCompId;
            let je = le.get(L.id);
            if (!je) {
              const Xe = this.doc,
                Lt = this.ngZone,
                Ct = this.eventManager,
                Qt = this.sharedStylesHost,
                Cn = this.removeStylesOnCompDestroy,
                Zn = this.platformIsServer;
              switch (L.encapsulation) {
                case m.ifc.Emulated:
                  je = new Tn(Ct, Qt, L, this.appId, Cn, Xe, Lt, Zn);
                  break;
                case m.ifc.ShadowDom:
                  return new Ve(Ct, Qt, N, L, Xe, Lt, this.nonce, Zn);
                default:
                  je = new fn(Ct, Qt, L, Cn, Xe, Lt, Zn);
              }
              le.set(L.id, je);
            }
            return je;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          static #e = (this.ɵfac = function (L) {
            return new (L || oe)(
              m.LFG(Ce),
              m.LFG($e),
              m.LFG(m.AFp),
              m.LFG(ve),
              m.LFG(U.K0),
              m.LFG(m.Lbi),
              m.LFG(m.R0b),
              m.LFG(m.Ojb)
            );
          });
          static #t = (this.ɵprov = m.Yz7({ token: oe, factory: oe.ɵfac }));
        }
        return oe;
      })();
      class Se {
        constructor(z, N, L, le) {
          (this.eventManager = z),
            (this.doc = N),
            (this.ngZone = L),
            (this.platformIsServer = le),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(z, N) {
          return N ? this.doc.createElementNS(Et[N] || N, z) : this.doc.createElement(z);
        }
        createComment(z) {
          return this.doc.createComment(z);
        }
        createText(z) {
          return this.doc.createTextNode(z);
        }
        appendChild(z, N) {
          (ke(z) ? z.content : z).appendChild(N);
        }
        insertBefore(z, N, L) {
          z && (ke(z) ? z.content : z).insertBefore(N, L);
        }
        removeChild(z, N) {
          z && z.removeChild(N);
        }
        selectRootElement(z, N) {
          let L = 'string' == typeof z ? this.doc.querySelector(z) : z;
          if (!L) throw new m.vHH(-5104, !1);
          return N || (L.textContent = ''), L;
        }
        parentNode(z) {
          return z.parentNode;
        }
        nextSibling(z) {
          return z.nextSibling;
        }
        setAttribute(z, N, L, le) {
          if (le) {
            N = le + ':' + N;
            const je = Et[le];
            je ? z.setAttributeNS(je, N, L) : z.setAttribute(N, L);
          } else z.setAttribute(N, L);
        }
        removeAttribute(z, N, L) {
          if (L) {
            const le = Et[L];
            le ? z.removeAttributeNS(le, N) : z.removeAttribute(`${L}:${N}`);
          } else z.removeAttribute(N);
        }
        addClass(z, N) {
          z.classList.add(N);
        }
        removeClass(z, N) {
          z.classList.remove(N);
        }
        setStyle(z, N, L, le) {
          le & (m.JOm.DashCase | m.JOm.Important)
            ? z.style.setProperty(N, L, le & m.JOm.Important ? 'important' : '')
            : (z.style[N] = L);
        }
        removeStyle(z, N, L) {
          L & m.JOm.DashCase ? z.style.removeProperty(N) : (z.style[N] = '');
        }
        setProperty(z, N, L) {
          z[N] = L;
        }
        setValue(z, N) {
          z.nodeValue = N;
        }
        listen(z, N, L) {
          if ('string' == typeof z && !(z = (0, U.q)().getGlobalEventTarget(this.doc, z)))
            throw new Error(`Unsupported event target ${z} for event ${N}`);
          return this.eventManager.addEventListener(z, N, this.decoratePreventDefault(L));
        }
        decoratePreventDefault(z) {
          return N => {
            if ('__ngUnwrap__' === N) return z;
            !1 === (this.platformIsServer ? this.ngZone.runGuarded(() => z(N)) : z(N)) &&
              N.preventDefault();
          };
        }
      }
      function ke(oe) {
        return 'TEMPLATE' === oe.tagName && void 0 !== oe.content;
      }
      class Ve extends Se {
        constructor(z, N, L, le, je, Xe, Lt, Ct) {
          super(z, je, Xe, Ct),
            (this.sharedStylesHost = N),
            (this.hostEl = L),
            (this.shadowRoot = L.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const Qt = we(le.id, le.styles);
          for (const Cn of Qt) {
            const Zn = document.createElement('style');
            Lt && Zn.setAttribute('nonce', Lt),
              (Zn.textContent = Cn),
              this.shadowRoot.appendChild(Zn);
          }
        }
        nodeOrShadowRoot(z) {
          return z === this.hostEl ? this.shadowRoot : z;
        }
        appendChild(z, N) {
          return super.appendChild(this.nodeOrShadowRoot(z), N);
        }
        insertBefore(z, N, L) {
          return super.insertBefore(this.nodeOrShadowRoot(z), N, L);
        }
        removeChild(z, N) {
          return super.removeChild(this.nodeOrShadowRoot(z), N);
        }
        parentNode(z) {
          return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(z)));
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class fn extends Se {
        constructor(z, N, L, le, je, Xe, Lt, Ct) {
          super(z, je, Xe, Lt),
            (this.sharedStylesHost = N),
            (this.removeStylesOnCompDestroy = le),
            (this.styles = Ct ? we(Ct, L.styles) : L.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class Tn extends fn {
        constructor(z, N, L, le, je, Xe, Lt, Ct) {
          const Qt = le + '-' + L.id;
          super(z, N, L, je, Xe, Lt, Ct, Qt),
            (this.contentAttr = (function he(oe) {
              return '_ngcontent-%COMP%'.replace(Le, oe);
            })(Qt)),
            (this.hostAttr = (function Ie(oe) {
              return '_nghost-%COMP%'.replace(Le, oe);
            })(Qt));
        }
        applyToHost(z) {
          this.applyStyles(), this.setAttribute(z, this.hostAttr, '');
        }
        createElement(z, N) {
          const L = super.createElement(z, N);
          return super.setAttribute(L, this.contentAttr, ''), L;
        }
      }
      let Tr = (() => {
        class oe extends He {
          constructor(N) {
            super(N);
          }
          supports(N) {
            return !0;
          }
          addEventListener(N, L, le) {
            return N.addEventListener(L, le, !1), () => this.removeEventListener(N, L, le);
          }
          removeEventListener(N, L, le) {
            return N.removeEventListener(L, le);
          }
          static #e = (this.ɵfac = function (L) {
            return new (L || oe)(m.LFG(U.K0));
          });
          static #t = (this.ɵprov = m.Yz7({ token: oe, factory: oe.ɵfac }));
        }
        return oe;
      })();
      const An = ['alt', 'control', 'meta', 'shift'],
        V = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        J = {
          alt: oe => oe.altKey,
          control: oe => oe.ctrlKey,
          meta: oe => oe.metaKey,
          shift: oe => oe.shiftKey,
        };
      let ae = (() => {
        class oe extends He {
          constructor(N) {
            super(N);
          }
          supports(N) {
            return null != oe.parseEventName(N);
          }
          addEventListener(N, L, le) {
            const je = oe.parseEventName(L),
              Xe = oe.eventCallback(je.fullKey, le, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => (0, U.q)().onAndCancel(N, je.domEventName, Xe));
          }
          static parseEventName(N) {
            const L = N.toLowerCase().split('.'),
              le = L.shift();
            if (0 === L.length || ('keydown' !== le && 'keyup' !== le)) return null;
            const je = oe._normalizeKey(L.pop());
            let Xe = '',
              Lt = L.indexOf('code');
            if (
              (Lt > -1 && (L.splice(Lt, 1), (Xe = 'code.')),
              An.forEach(Qt => {
                const Cn = L.indexOf(Qt);
                Cn > -1 && (L.splice(Cn, 1), (Xe += Qt + '.'));
              }),
              (Xe += je),
              0 != L.length || 0 === je.length)
            )
              return null;
            const Ct = {};
            return (Ct.domEventName = le), (Ct.fullKey = Xe), Ct;
          }
          static matchEventFullKeyCode(N, L) {
            let le = V[N.key] || N.key,
              je = '';
            return (
              L.indexOf('code.') > -1 && ((le = N.code), (je = 'code.')),
              !(null == le || !le) &&
                ((le = le.toLowerCase()),
                ' ' === le ? (le = 'space') : '.' === le && (le = 'dot'),
                An.forEach(Xe => {
                  Xe !== le && (0, J[Xe])(N) && (je += Xe + '.');
                }),
                (je += le),
                je === L)
            );
          }
          static eventCallback(N, L, le) {
            return je => {
              oe.matchEventFullKeyCode(je, N) && le.runGuarded(() => L(je));
            };
          }
          static _normalizeKey(N) {
            return 'esc' === N ? 'escape' : N;
          }
          static #e = (this.ɵfac = function (L) {
            return new (L || oe)(m.LFG(U.K0));
          });
          static #t = (this.ɵprov = m.Yz7({ token: oe, factory: oe.ɵfac }));
        }
        return oe;
      })();
      const Xt = (0, m.eFA)(m._c5, 'browser', [
          { provide: m.Lbi, useValue: U.bD },
          {
            provide: m.g9A,
            useValue: function Tt() {
              ie.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: U.K0,
            useFactory: function rt() {
              return (0, m.RDi)(document), document;
            },
            deps: [],
          },
        ]),
        vt = new m.OlP(''),
        Ft = [
          {
            provide: m.rWj,
            useClass: class se {
              addToWindow(z) {
                (m.dqk.getAngularTestability = (L, le = !0) => {
                  const je = z.findTestabilityInTree(L, le);
                  if (null == je) throw new m.vHH(5103, !1);
                  return je;
                }),
                  (m.dqk.getAllAngularTestabilities = () => z.getAllTestabilities()),
                  (m.dqk.getAllAngularRootElements = () => z.getAllRootElements()),
                  m.dqk.frameworkStabilizers || (m.dqk.frameworkStabilizers = []),
                  m.dqk.frameworkStabilizers.push(L => {
                    const le = m.dqk.getAllAngularTestabilities();
                    let je = le.length,
                      Xe = !1;
                    const Lt = function (Ct) {
                      (Xe = Xe || Ct), je--, 0 == je && L(Xe);
                    };
                    le.forEach(Ct => {
                      Ct.whenStable(Lt);
                    });
                  });
              }
              findTestabilityInTree(z, N, L) {
                return null == N
                  ? null
                  : z.getTestability(N) ??
                      (L
                        ? (0, U.q)().isShadowRoot(N)
                          ? this.findTestabilityInTree(z, N.host, !0)
                          : this.findTestabilityInTree(z, N.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: m.lri, useClass: m.dDg, deps: [m.R0b, m.eoX, m.rWj] },
          { provide: m.dDg, useClass: m.dDg, deps: [m.R0b, m.eoX, m.rWj] },
        ],
        Ue = [
          { provide: m.zSh, useValue: 'root' },
          {
            provide: m.qLn,
            useFactory: function hn() {
              return new m.qLn();
            },
            deps: [],
          },
          { provide: te, useClass: Tr, multi: !0, deps: [U.K0, m.R0b, m.Lbi] },
          { provide: te, useClass: ae, multi: !0, deps: [U.K0] },
          X,
          $e,
          Ce,
          { provide: m.FYo, useExisting: X },
          { provide: U.JF, useClass: ye, deps: [] },
          [],
        ];
      let $t = (() => {
          class oe {
            constructor(N) {}
            static withServerTransition(N) {
              return { ngModule: oe, providers: [{ provide: m.AFp, useValue: N.appId }] };
            }
            static #e = (this.ɵfac = function (L) {
              return new (L || oe)(m.LFG(vt, 12));
            });
            static #t = (this.ɵmod = m.oAB({ type: oe }));
            static #n = (this.ɵinj = m.cJS({ providers: [...Ue, ...Ft], imports: [U.ez, m.hGG] }));
          }
          return oe;
        })(),
        dr = (() => {
          class oe {
            constructor(N) {
              this._doc = N;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(N) {
              this._doc.title = N || '';
            }
            static #e = (this.ɵfac = function (L) {
              return new (L || oe)(m.LFG(U.K0));
            });
            static #t = (this.ɵprov = m.Yz7({
              token: oe,
              factory: function (L) {
                let le = null;
                return (
                  (le = L
                    ? new L()
                    : (function Ar() {
                        return new dr((0, m.LFG)(U.K0));
                      })()),
                  le
                );
              },
              providedIn: 'root',
            }));
          }
          return oe;
        })();
      typeof window < 'u' && window;
      let qn = (() => {
          class oe {
            static #e = (this.ɵfac = function (L) {
              return new (L || oe)();
            });
            static #t = (this.ɵprov = m.Yz7({
              token: oe,
              factory: function (L) {
                let le = null;
                return (le = L ? new (L || oe)() : m.LFG(et)), le;
              },
              providedIn: 'root',
            }));
          }
          return oe;
        })(),
        et = (() => {
          class oe extends qn {
            constructor(N) {
              super(), (this._doc = N);
            }
            sanitize(N, L) {
              if (null == L) return null;
              switch (N) {
                case m.q3G.NONE:
                  return L;
                case m.q3G.HTML:
                  return (0, m.qzn)(L, 'HTML')
                    ? (0, m.z3N)(L)
                    : (0, m.EiD)(this._doc, String(L)).toString();
                case m.q3G.STYLE:
                  return (0, m.qzn)(L, 'Style') ? (0, m.z3N)(L) : L;
                case m.q3G.SCRIPT:
                  if ((0, m.qzn)(L, 'Script')) return (0, m.z3N)(L);
                  throw new m.vHH(5200, !1);
                case m.q3G.URL:
                  return (0, m.qzn)(L, 'URL') ? (0, m.z3N)(L) : (0, m.mCW)(String(L));
                case m.q3G.RESOURCE_URL:
                  if ((0, m.qzn)(L, 'ResourceURL')) return (0, m.z3N)(L);
                  throw new m.vHH(5201, !1);
                default:
                  throw new m.vHH(5202, !1);
              }
            }
            bypassSecurityTrustHtml(N) {
              return (0, m.JVY)(N);
            }
            bypassSecurityTrustStyle(N) {
              return (0, m.L6k)(N);
            }
            bypassSecurityTrustScript(N) {
              return (0, m.eBb)(N);
            }
            bypassSecurityTrustUrl(N) {
              return (0, m.LAX)(N);
            }
            bypassSecurityTrustResourceUrl(N) {
              return (0, m.pB0)(N);
            }
            static #e = (this.ɵfac = function (L) {
              return new (L || oe)(m.LFG(U.K0));
            });
            static #t = (this.ɵprov = m.Yz7({
              token: oe,
              factory: function (L) {
                let le = null;
                return (
                  (le = L
                    ? new L()
                    : (function mr(oe) {
                        return new et(oe.get(U.K0));
                      })(m.LFG(m.zs3))),
                  le
                );
              },
              providedIn: 'root',
            }));
          }
          return oe;
        })();
    },
    1120: (We, fe, M) => {
      M.d(fe, {
        gz: () => sr,
        F0: () => Mt,
        rH: () => zn,
        Od: () => $a,
        Bz: () => Gn,
        lC: () => Wr,
      });
      var m = M(4769),
        U = M(5592),
        B = M(4674),
        Q = M(7715),
        q = M(2096),
        pe = M(5619),
        Te = M(7453),
        se = M(2737),
        ye = M(7400),
        te = M(9940),
        Ce = M(2714),
        He = M(8251),
        Re = M(7103);
      function $e(...c) {
        const p = (0, te.yG)(c),
          l = (0, te.jO)(c),
          { args: g, keys: E } = (0, Te.D)(c);
        if (0 === g.length) return (0, Q.D)([], p);
        const I = new U.y(
          (function Et(c, p, l = se.y) {
            return g => {
              Le(
                p,
                () => {
                  const { length: E } = c,
                    I = new Array(E);
                  let P = E,
                    Z = E;
                  for (let Y = 0; Y < E; Y++)
                    Le(
                      p,
                      () => {
                        const Be = (0, Q.D)(c[Y], p);
                        let pt = !1;
                        Be.subscribe(
                          (0, He.x)(
                            g,
                            nn => {
                              (I[Y] = nn), pt || ((pt = !0), Z--), Z || g.next(l(I.slice()));
                            },
                            () => {
                              --P || g.complete();
                            }
                          )
                        );
                      },
                      g
                    );
                },
                g
              );
            };
          })(g, p, E ? P => (0, Ce.n)(E, P) : se.y)
        );
        return l ? I.pipe((0, ye.Z)(l)) : I;
      }
      function Le(c, p, l) {
        c ? (0, Re.f)(l, c, p) : p();
      }
      var lt = M(6973),
        tt = M(5211),
        Ke = M(4829);
      function K(c) {
        return new U.y(p => {
          (0, Ke.Xf)(c()).subscribe(p);
        });
      }
      var ve = M(8407);
      function he(c, p) {
        const l = (0, B.m)(c) ? c : () => c,
          g = E => E.error(l());
        return new U.y(p ? E => p.schedule(g, 0, E) : g);
      }
      var Ie = M(6232),
        we = M(7394),
        X = M(9360);
      function Se() {
        return (0, X.e)((c, p) => {
          let l = null;
          c._refCount++;
          const g = (0, He.x)(p, void 0, void 0, void 0, () => {
            if (!c || c._refCount <= 0 || 0 < --c._refCount) return void (l = null);
            const E = c._connection,
              I = l;
            (l = null), E && (!I || E === I) && E.unsubscribe(), p.unsubscribe();
          });
          c.subscribe(g), g.closed || (l = c.connect());
        });
      }
      class ne extends U.y {
        constructor(p, l) {
          super(),
            (this.source = p),
            (this.subjectFactory = l),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            (0, X.A)(p) && (this.lift = p.lift);
        }
        _subscribe(p) {
          return this.getSubject().subscribe(p);
        }
        getSubject() {
          const p = this._subject;
          return (!p || p.isStopped) && (this._subject = this.subjectFactory()), this._subject;
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: p } = this;
          (this._subject = this._connection = null), p?.unsubscribe();
        }
        connect() {
          let p = this._connection;
          if (!p) {
            p = this._connection = new we.w0();
            const l = this.getSubject();
            p.add(
              this.source.subscribe(
                (0, He.x)(
                  l,
                  void 0,
                  () => {
                    this._teardown(), l.complete();
                  },
                  g => {
                    this._teardown(), l.error(g);
                  },
                  () => this._teardown()
                )
              )
            ),
              p.closed && ((this._connection = null), (p = we.w0.EMPTY));
          }
          return p;
        }
        refCount() {
          return Se()(this);
        }
      }
      var yt = M(8645),
        ke = M(6814),
        Ve = M(7398),
        fn = M(4664),
        Tn = M(8180),
        An = M(2181),
        V = M(1631),
        J = M(1374),
        ae = M(6328),
        re = M(9397);
      function De(c) {
        return (0, X.e)((p, l) => {
          let I,
            g = null,
            E = !1;
          (g = p.subscribe(
            (0, He.x)(l, void 0, void 0, P => {
              (I = (0, Ke.Xf)(c(P, De(c)(p)))),
                g ? (g.unsubscribe(), (g = null), I.subscribe(l)) : (E = !0);
            })
          )),
            E && (g.unsubscribe(), (g = null), I.subscribe(l));
        });
      }
      var be = M(9732),
        Tt = M(3572);
      function hn(c) {
        return c <= 0
          ? () => Ie.E
          : (0, X.e)((p, l) => {
              let g = [];
              p.subscribe(
                (0, He.x)(
                  l,
                  E => {
                    g.push(E), c < g.length && g.shift();
                  },
                  () => {
                    for (const E of g) l.next(E);
                    l.complete();
                  },
                  void 0,
                  () => {
                    g = null;
                  }
                )
              );
            });
      }
      var rt = M(3026),
        Xt = M(975),
        vt = M(4716),
        Ft = M(9773),
        Ue = M(7537),
        $t = M(6593);
      const Qe = 'primary',
        Kt = Symbol('RouteTitle');
      class Jt {
        constructor(p) {
          this.params = p || {};
        }
        has(p) {
          return Object.prototype.hasOwnProperty.call(this.params, p);
        }
        get(p) {
          if (this.has(p)) {
            const l = this.params[p];
            return Array.isArray(l) ? l[0] : l;
          }
          return null;
        }
        getAll(p) {
          if (this.has(p)) {
            const l = this.params[p];
            return Array.isArray(l) ? l : [l];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function Ar(c) {
        return new Jt(c);
      }
      function dr(c, p, l) {
        const g = l.path.split('/');
        if (
          g.length > c.length ||
          ('full' === l.pathMatch && (p.hasChildren() || g.length < c.length))
        )
          return null;
        const E = {};
        for (let I = 0; I < g.length; I++) {
          const P = g[I],
            Z = c[I];
          if (P.startsWith(':')) E[P.substring(1)] = Z;
          else if (P !== Z.path) return null;
        }
        return { consumed: c.slice(0, g.length), posParams: E };
      }
      function Vt(c, p) {
        const l = c ? Object.keys(c) : void 0,
          g = p ? Object.keys(p) : void 0;
        if (!l || !g || l.length != g.length) return !1;
        let E;
        for (let I = 0; I < l.length; I++) if (((E = l[I]), !Rn(c[E], p[E]))) return !1;
        return !0;
      }
      function Rn(c, p) {
        if (Array.isArray(c) && Array.isArray(p)) {
          if (c.length !== p.length) return !1;
          const l = [...c].sort(),
            g = [...p].sort();
          return l.every((E, I) => g[I] === E);
        }
        return c === p;
      }
      function Dt(c) {
        return c.length > 0 ? c[c.length - 1] : null;
      }
      function at(c) {
        return (function ie(c) {
          return !!c && (c instanceof U.y || ((0, B.m)(c.lift) && (0, B.m)(c.subscribe)));
        })(c)
          ? c
          : (0, m.QGY)(c)
            ? (0, Q.D)(Promise.resolve(c))
            : (0, q.of)(c);
      }
      const Rr = {
          exact: function Ze(c, p, l) {
            if (
              !et(c.segments, p.segments) ||
              !St(c.segments, p.segments, l) ||
              c.numberOfChildren !== p.numberOfChildren
            )
              return !1;
            for (const g in p.children)
              if (!c.children[g] || !Ze(c.children[g], p.children[g], l)) return !1;
            return !0;
          },
          subset: zt,
        },
        nr = {
          exact: function Ur(c, p) {
            return Vt(c, p);
          },
          subset: function Pr(c, p) {
            return (
              Object.keys(p).length <= Object.keys(c).length &&
              Object.keys(p).every(l => Rn(c[l], p[l]))
            );
          },
          ignored: () => !0,
        };
      function Nn(c, p, l) {
        return (
          Rr[l.paths](c.root, p.root, l.matrixParams) &&
          nr[l.queryParams](c.queryParams, p.queryParams) &&
          !('exact' === l.fragment && c.fragment !== p.fragment)
        );
      }
      function zt(c, p, l) {
        return pn(c, p, p.segments, l);
      }
      function pn(c, p, l, g) {
        if (c.segments.length > l.length) {
          const E = c.segments.slice(0, l.length);
          return !(!et(E, l) || p.hasChildren() || !St(E, l, g));
        }
        if (c.segments.length === l.length) {
          if (!et(c.segments, l) || !St(c.segments, l, g)) return !1;
          for (const E in p.children)
            if (!c.children[E] || !zt(c.children[E], p.children[E], g)) return !1;
          return !0;
        }
        {
          const E = l.slice(0, c.segments.length),
            I = l.slice(c.segments.length);
          return (
            !!(et(c.segments, E) && St(c.segments, E, g) && c.children[Qe]) &&
            pn(c.children[Qe], p, I, g)
          );
        }
      }
      function St(c, p, l) {
        return p.every((g, E) => nr[l](c[E].parameters, g.parameters));
      }
      class rr {
        constructor(p = new qe([], {}), l = {}, g = null) {
          (this.root = p), (this.queryParams = l), (this.fragment = g);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ar(this.queryParams)), this._queryParamMap
          );
        }
        toString() {
          return Qn.serialize(this);
        }
      }
      class qe {
        constructor(p, l) {
          (this.segments = p),
            (this.children = l),
            (this.parent = null),
            Object.values(l).forEach(g => (g.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return $r(this);
        }
      }
      class qn {
        constructor(p, l) {
          (this.path = p), (this.parameters = l);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = Ar(this.parameters)), this._parameterMap
          );
        }
        toString() {
          return le(this);
        }
      }
      function et(c, p) {
        return c.length === p.length && c.every((l, g) => l.path === p[g].path);
      }
      let ln = (() => {
        class c {
          static #e = (this.ɵfac = function (g) {
            return new (g || c)();
          });
          static #t = (this.ɵprov = m.Yz7({
            token: c,
            factory: function () {
              return new ir();
            },
            providedIn: 'root',
          }));
        }
        return c;
      })();
      class ir {
        parse(p) {
          const l = new ue(p);
          return new rr(l.parseRootSegment(), l.parseQueryParams(), l.parseFragment());
        }
        serialize(p) {
          const l = `/${Ln(p.root, !0)}`,
            g = (function Xe(c) {
              const p = Object.keys(c)
                .map(l => {
                  const g = c[l];
                  return Array.isArray(g)
                    ? g.map(E => `${ci(l)}=${ci(E)}`).join('&')
                    : `${ci(l)}=${ci(g)}`;
                })
                .filter(l => !!l);
              return p.length ? `?${p.join('&')}` : '';
            })(p.queryParams);
          return `${l}${g}${
            'string' == typeof p.fragment
              ? `#${(function oe(c) {
                  return encodeURI(c);
                })(p.fragment)}`
              : ''
          }`;
        }
      }
      const Qn = new ir();
      function $r(c) {
        return c.segments.map(p => le(p)).join('/');
      }
      function Ln(c, p) {
        if (!c.hasChildren()) return $r(c);
        if (p) {
          const l = c.children[Qe] ? Ln(c.children[Qe], !1) : '',
            g = [];
          return (
            Object.entries(c.children).forEach(([E, I]) => {
              E !== Qe && g.push(`${E}:${Ln(I, !1)}`);
            }),
            g.length > 0 ? `${l}(${g.join('//')})` : l
          );
        }
        {
          const l = (function En(c, p) {
            let l = [];
            return (
              Object.entries(c.children).forEach(([g, E]) => {
                g === Qe && (l = l.concat(p(E, g)));
              }),
              Object.entries(c.children).forEach(([g, E]) => {
                g !== Qe && (l = l.concat(p(E, g)));
              }),
              l
            );
          })(c, (g, E) => (E === Qe ? [Ln(c.children[Qe], !1)] : [`${E}:${Ln(g, !1)}`]));
          return 1 === Object.keys(c.children).length && null != c.children[Qe]
            ? `${$r(c)}/${l[0]}`
            : `${$r(c)}/(${l.join('//')})`;
        }
      }
      function Ii(c) {
        return encodeURIComponent(c)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',');
      }
      function ci(c) {
        return Ii(c).replace(/%3B/gi, ';');
      }
      function z(c) {
        return Ii(c).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
      }
      function N(c) {
        return decodeURIComponent(c);
      }
      function L(c) {
        return N(c.replace(/\+/g, '%20'));
      }
      function le(c) {
        return `${z(c.path)}${(function je(c) {
          return Object.keys(c)
            .map(p => `;${z(p)}=${z(c[p])}`)
            .join('');
        })(c.parameters)}`;
      }
      const Lt = /^[^\/()?;#]+/;
      function Ct(c) {
        const p = c.match(Lt);
        return p ? p[0] : '';
      }
      const Qt = /^[^\/()?;=#]+/,
        Zn = /^[^=?&#]+/,
        x = /^[^&#]+/;
      class ue {
        constructor(p) {
          (this.url = p), (this.remaining = p);
        }
        parseRootSegment() {
          return (
            this.consumeOptional('/'),
            '' === this.remaining || this.peekStartsWith('?') || this.peekStartsWith('#')
              ? new qe([], {})
              : new qe([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const p = {};
          if (this.consumeOptional('?'))
            do {
              this.parseQueryParam(p);
            } while (this.consumeOptional('&'));
          return p;
        }
        parseFragment() {
          return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
        }
        parseChildren() {
          if ('' === this.remaining) return {};
          this.consumeOptional('/');
          const p = [];
          for (
            this.peekStartsWith('(') || p.push(this.parseSegment());
            this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');

          )
            this.capture('/'), p.push(this.parseSegment());
          let l = {};
          this.peekStartsWith('/(') && (this.capture('/'), (l = this.parseParens(!0)));
          let g = {};
          return (
            this.peekStartsWith('(') && (g = this.parseParens(!1)),
            (p.length > 0 || Object.keys(l).length > 0) && (g[Qe] = new qe(p, l)),
            g
          );
        }
        parseSegment() {
          const p = Ct(this.remaining);
          if ('' === p && this.peekStartsWith(';')) throw new m.vHH(4009, !1);
          return this.capture(p), new qn(N(p), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const p = {};
          for (; this.consumeOptional(';'); ) this.parseParam(p);
          return p;
        }
        parseParam(p) {
          const l = (function Cn(c) {
            const p = c.match(Qt);
            return p ? p[0] : '';
          })(this.remaining);
          if (!l) return;
          this.capture(l);
          let g = '';
          if (this.consumeOptional('=')) {
            const E = Ct(this.remaining);
            E && ((g = E), this.capture(g));
          }
          p[N(l)] = N(g);
        }
        parseQueryParam(p) {
          const l = (function $(c) {
            const p = c.match(Zn);
            return p ? p[0] : '';
          })(this.remaining);
          if (!l) return;
          this.capture(l);
          let g = '';
          if (this.consumeOptional('=')) {
            const P = (function F(c) {
              const p = c.match(x);
              return p ? p[0] : '';
            })(this.remaining);
            P && ((g = P), this.capture(g));
          }
          const E = L(l),
            I = L(g);
          if (p.hasOwnProperty(E)) {
            let P = p[E];
            Array.isArray(P) || ((P = [P]), (p[E] = P)), P.push(I);
          } else p[E] = I;
        }
        parseParens(p) {
          const l = {};
          for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
            const g = Ct(this.remaining),
              E = this.remaining[g.length];
            if ('/' !== E && ')' !== E && ';' !== E) throw new m.vHH(4010, !1);
            let I;
            g.indexOf(':') > -1
              ? ((I = g.slice(0, g.indexOf(':'))), this.capture(I), this.capture(':'))
              : p && (I = Qe);
            const P = this.parseChildren();
            (l[I] = 1 === Object.keys(P).length ? P[Qe] : new qe([], P)),
              this.consumeOptional('//');
          }
          return l;
        }
        peekStartsWith(p) {
          return this.remaining.startsWith(p);
        }
        consumeOptional(p) {
          return (
            !!this.peekStartsWith(p) && ((this.remaining = this.remaining.substring(p.length)), !0)
          );
        }
        capture(p) {
          if (!this.consumeOptional(p)) throw new m.vHH(4011, !1);
        }
      }
      function ge(c) {
        return c.segments.length > 0 ? new qe([], { [Qe]: c }) : c;
      }
      function Fe(c) {
        const p = {};
        for (const g of Object.keys(c.children)) {
          const I = Fe(c.children[g]);
          if (g === Qe && 0 === I.segments.length && I.hasChildren())
            for (const [P, Z] of Object.entries(I.children)) p[P] = Z;
          else (I.segments.length > 0 || I.hasChildren()) && (p[g] = I);
        }
        return (function Oe(c) {
          if (1 === c.numberOfChildren && c.children[Qe]) {
            const p = c.children[Qe];
            return new qe(c.segments.concat(p.segments), p.children);
          }
          return c;
        })(new qe(c.segments, p));
      }
      function At(c) {
        return c instanceof rr;
      }
      function _n(c) {
        let p;
        const E = ge(
          (function l(I) {
            const P = {};
            for (const Y of I.children) {
              const Be = l(Y);
              P[Y.outlet] = Be;
            }
            const Z = new qe(I.url, P);
            return I === c && (p = Z), Z;
          })(c.root)
        );
        return p ?? E;
      }
      function yr(c, p, l, g) {
        let E = c;
        for (; E.parent; ) E = E.parent;
        if (0 === p.length) return kn(E, E, E, l, g);
        const I = (function kt(c) {
          if ('string' == typeof c[0] && 1 === c.length && '/' === c[0]) return new ze(!0, 0, c);
          let p = 0,
            l = !1;
          const g = c.reduce((E, I, P) => {
            if ('object' == typeof I && null != I) {
              if (I.outlets) {
                const Z = {};
                return (
                  Object.entries(I.outlets).forEach(([Y, Be]) => {
                    Z[Y] = 'string' == typeof Be ? Be.split('/') : Be;
                  }),
                  [...E, { outlets: Z }]
                );
              }
              if (I.segmentPath) return [...E, I.segmentPath];
            }
            return 'string' != typeof I
              ? [...E, I]
              : 0 === P
                ? (I.split('/').forEach((Z, Y) => {
                    (0 == Y && '.' === Z) ||
                      (0 == Y && '' === Z ? (l = !0) : '..' === Z ? p++ : '' != Z && E.push(Z));
                  }),
                  E)
                : [...E, I];
          }, []);
          return new ze(l, p, g);
        })(p);
        if (I.toRoot()) return kn(E, E, new qe([], {}), l, g);
        const P = (function vr(c, p, l) {
            if (c.isAbsolute) return new On(p, !0, 0);
            if (!l) return new On(p, !1, NaN);
            if (null === l.parent) return new On(l, !0, 0);
            const g = Ht(c.commands[0]) ? 0 : 1;
            return (function yn(c, p, l) {
              let g = c,
                E = p,
                I = l;
              for (; I > E; ) {
                if (((I -= E), (g = g.parent), !g)) throw new m.vHH(4005, !1);
                E = g.segments.length;
              }
              return new On(g, !1, E - I);
            })(l, l.segments.length - 1 + g, c.numberOfDoubleDots);
          })(I, E, c),
          Z = P.processChildren
            ? Dr(P.segmentGroup, P.index, I.commands)
            : or(P.segmentGroup, P.index, I.commands);
        return kn(E, P.segmentGroup, Z, l, g);
      }
      function Ht(c) {
        return 'object' == typeof c && null != c && !c.outlets && !c.segmentPath;
      }
      function un(c) {
        return 'object' == typeof c && null != c && c.outlets;
      }
      function kn(c, p, l, g, E) {
        let P,
          I = {};
        g &&
          Object.entries(g).forEach(([Y, Be]) => {
            I[Y] = Array.isArray(Be) ? Be.map(pt => `${pt}`) : `${Be}`;
          }),
          (P = c === p ? l : gn(c, p, l));
        const Z = ge(Fe(P));
        return new rr(Z, I, E);
      }
      function gn(c, p, l) {
        const g = {};
        return (
          Object.entries(c.children).forEach(([E, I]) => {
            g[E] = I === p ? l : gn(I, p, l);
          }),
          new qe(c.segments, g)
        );
      }
      class ze {
        constructor(p, l, g) {
          if (
            ((this.isAbsolute = p),
            (this.numberOfDoubleDots = l),
            (this.commands = g),
            p && g.length > 0 && Ht(g[0]))
          )
            throw new m.vHH(4003, !1);
          const E = g.find(un);
          if (E && E !== Dt(g)) throw new m.vHH(4004, !1);
        }
        toRoot() {
          return this.isAbsolute && 1 === this.commands.length && '/' == this.commands[0];
        }
      }
      class On {
        constructor(p, l, g) {
          (this.segmentGroup = p), (this.processChildren = l), (this.index = g);
        }
      }
      function or(c, p, l) {
        if ((c || (c = new qe([], {})), 0 === c.segments.length && c.hasChildren()))
          return Dr(c, p, l);
        const g = (function Ti(c, p, l) {
            let g = 0,
              E = p;
            const I = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; E < c.segments.length; ) {
              if (g >= l.length) return I;
              const P = c.segments[E],
                Z = l[g];
              if (un(Z)) break;
              const Y = `${Z}`,
                Be = g < l.length - 1 ? l[g + 1] : null;
              if (E > 0 && void 0 === Y) break;
              if (Y && Be && 'object' == typeof Be && void 0 === Be.outlets) {
                if (!Nr(Y, Be, P)) return I;
                g += 2;
              } else {
                if (!Nr(Y, {}, P)) return I;
                g++;
              }
              E++;
            }
            return { match: !0, pathIndex: E, commandIndex: g };
          })(c, p, l),
          E = l.slice(g.commandIndex);
        if (g.match && g.pathIndex < c.segments.length) {
          const I = new qe(c.segments.slice(0, g.pathIndex), {});
          return (I.children[Qe] = new qe(c.segments.slice(g.pathIndex), c.children)), Dr(I, 0, E);
        }
        return g.match && 0 === E.length
          ? new qe(c.segments, {})
          : g.match && !c.hasChildren()
            ? ei(c, p, l)
            : g.match
              ? Dr(c, 0, E)
              : ei(c, p, l);
      }
      function Dr(c, p, l) {
        if (0 === l.length) return new qe(c.segments, {});
        {
          const g = (function wn(c) {
              return un(c[0]) ? c[0].outlets : { [Qe]: c };
            })(l),
            E = {};
          if (
            Object.keys(g).some(I => I !== Qe) &&
            c.children[Qe] &&
            1 === c.numberOfChildren &&
            0 === c.children[Qe].segments.length
          ) {
            const I = Dr(c.children[Qe], p, l);
            return new qe(c.segments, I.children);
          }
          return (
            Object.entries(g).forEach(([I, P]) => {
              'string' == typeof P && (P = [P]), null !== P && (E[I] = or(c.children[I], p, P));
            }),
            Object.entries(c.children).forEach(([I, P]) => {
              void 0 === g[I] && (E[I] = P);
            }),
            new qe(c.segments, E)
          );
        }
      }
      function ei(c, p, l) {
        const g = c.segments.slice(0, p);
        let E = 0;
        for (; E < l.length; ) {
          const I = l[E];
          if (un(I)) {
            const Y = Wi(I.outlets);
            return new qe(g, Y);
          }
          if (0 === E && Ht(l[0])) {
            g.push(new qn(c.segments[p].path, di(l[0]))), E++;
            continue;
          }
          const P = un(I) ? I.outlets[Qe] : `${I}`,
            Z = E < l.length - 1 ? l[E + 1] : null;
          P && Z && Ht(Z) ? (g.push(new qn(P, di(Z))), (E += 2)) : (g.push(new qn(P, {})), E++);
        }
        return new qe(g, {});
      }
      function Wi(c) {
        const p = {};
        return (
          Object.entries(c).forEach(([l, g]) => {
            'string' == typeof g && (g = [g]), null !== g && (p[l] = ei(new qe([], {}), 0, g));
          }),
          p
        );
      }
      function di(c) {
        const p = {};
        return Object.entries(c).forEach(([l, g]) => (p[l] = `${g}`)), p;
      }
      function Nr(c, p, l) {
        return c == l.path && Vt(p, l.parameters);
      }
      const Xn = 'imperative';
      class Hn {
        constructor(p, l) {
          (this.id = p), (this.url = l);
        }
      }
      class fi extends Hn {
        constructor(p, l, g = 'imperative', E = null) {
          super(p, l), (this.type = 0), (this.navigationTrigger = g), (this.restoredState = E);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Un extends Hn {
        constructor(p, l, g) {
          super(p, l), (this.urlAfterRedirects = g), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class hi extends Hn {
        constructor(p, l, g, E) {
          super(p, l), (this.reason = g), (this.code = E), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Vr extends Hn {
        constructor(p, l, g, E) {
          super(p, l), (this.reason = g), (this.code = E), (this.type = 16);
        }
      }
      class xn extends Hn {
        constructor(p, l, g, E) {
          super(p, l), (this.error = g), (this.target = E), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class So extends Hn {
        constructor(p, l, g, E) {
          super(p, l), (this.urlAfterRedirects = g), (this.state = E), (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Jn extends Hn {
        constructor(p, l, g, E) {
          super(p, l), (this.urlAfterRedirects = g), (this.state = E), (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Ki extends Hn {
        constructor(p, l, g, E, I) {
          super(p, l),
            (this.urlAfterRedirects = g),
            (this.state = E),
            (this.shouldActivate = I),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Mo extends Hn {
        constructor(p, l, g, E) {
          super(p, l), (this.urlAfterRedirects = g), (this.state = E), (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Ai extends Hn {
        constructor(p, l, g, E) {
          super(p, l), (this.urlAfterRedirects = g), (this.state = E), (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Yi {
        constructor(p) {
          (this.route = p), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class pi {
        constructor(p) {
          (this.route = p), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class Io {
        constructor(p) {
          (this.snapshot = p), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class ao {
        constructor(p) {
          (this.snapshot = p), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class To {
        constructor(p) {
          (this.snapshot = p), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class Ao {
        constructor(p) {
          (this.snapshot = p), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
        }
      }
      class Ri {
        constructor(p, l, g) {
          (this.routerEvent = p), (this.position = l), (this.anchor = g), (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${this.position ? `${this.position[0]}, ${this.position[1]}` : null}')`;
        }
      }
      class lo {}
      class qi {
        constructor(p) {
          this.url = p;
        }
      }
      class co {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new Or()),
            (this.attachRef = null);
        }
      }
      let Or = (() => {
        class c {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(l, g) {
            const E = this.getOrCreateContext(l);
            (E.outlet = g), this.contexts.set(l, E);
          }
          onChildOutletDestroyed(l) {
            const g = this.getContext(l);
            g && ((g.outlet = null), (g.attachRef = null));
          }
          onOutletDeactivated() {
            const l = this.contexts;
            return (this.contexts = new Map()), l;
          }
          onOutletReAttached(l) {
            this.contexts = l;
          }
          getOrCreateContext(l) {
            let g = this.getContext(l);
            return g || ((g = new co()), this.contexts.set(l, g)), g;
          }
          getContext(l) {
            return this.contexts.get(l) || null;
          }
          static #e = (this.ɵfac = function (g) {
            return new (g || c)();
          });
          static #t = (this.ɵprov = m.Yz7({ token: c, factory: c.ɵfac, providedIn: 'root' }));
        }
        return c;
      })();
      class Pi {
        constructor(p) {
          this._root = p;
        }
        get root() {
          return this._root.value;
        }
        parent(p) {
          const l = this.pathFromRoot(p);
          return l.length > 1 ? l[l.length - 2] : null;
        }
        children(p) {
          const l = Qi(p, this._root);
          return l ? l.children.map(g => g.value) : [];
        }
        firstChild(p) {
          const l = Qi(p, this._root);
          return l && l.children.length > 0 ? l.children[0].value : null;
        }
        siblings(p) {
          const l = _t(p, this._root);
          return l.length < 2
            ? []
            : l[l.length - 2].children.map(E => E.value).filter(E => E !== p);
        }
        pathFromRoot(p) {
          return _t(p, this._root).map(l => l.value);
        }
      }
      function Qi(c, p) {
        if (c === p.value) return p;
        for (const l of p.children) {
          const g = Qi(c, l);
          if (g) return g;
        }
        return null;
      }
      function _t(c, p) {
        if (c === p.value) return [p];
        for (const l of p.children) {
          const g = _t(c, l);
          if (g.length) return g.unshift(p), g;
        }
        return [];
      }
      class Yt {
        constructor(p, l) {
          (this.value = p), (this.children = l);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function sn(c) {
        const p = {};
        return c && c.children.forEach(l => (p[l.value.outlet] = l)), p;
      }
      class zr extends Pi {
        constructor(p, l) {
          super(p), (this.snapshot = l), Ne(this, p);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function jn(c, p) {
        const l = (function fo(c, p) {
            const P = new Ni([], {}, {}, '', {}, Qe, p, null, {});
            return new en('', new Yt(P, []));
          })(0, p),
          g = new pe.X([new qn('', {})]),
          E = new pe.X({}),
          I = new pe.X({}),
          P = new pe.X({}),
          Z = new pe.X(''),
          Y = new sr(g, E, P, Z, I, Qe, p, l.root);
        return (Y.snapshot = l.root), new zr(new Yt(Y, []), l);
      }
      class sr {
        constructor(p, l, g, E, I, P, Z, Y) {
          (this.urlSubject = p),
            (this.paramsSubject = l),
            (this.queryParamsSubject = g),
            (this.fragmentSubject = E),
            (this.dataSubject = I),
            (this.outlet = P),
            (this.component = Z),
            (this._futureSnapshot = Y),
            (this.title = this.dataSubject?.pipe((0, Ve.U)(Be => Be[Kt])) ?? (0, q.of)(void 0)),
            (this.url = p),
            (this.params = l),
            (this.queryParams = g),
            (this.fragment = E),
            (this.data = I);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = this.params.pipe((0, Ve.U)(p => Ar(p)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe((0, Ve.U)(p => Ar(p)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
        }
      }
      function Gr(c, p = 'emptyOnly') {
        const l = c.pathFromRoot;
        let g = 0;
        if ('always' !== p)
          for (g = l.length - 1; g >= 1; ) {
            const E = l[g],
              I = l[g - 1];
            if (E.routeConfig && '' === E.routeConfig.path) g--;
            else {
              if (I.component) break;
              g--;
            }
          }
        return (function qo(c) {
          return c.reduce(
            (p, l) => ({
              params: { ...p.params, ...l.params },
              data: { ...p.data, ...l.data },
              resolve: { ...l.data, ...p.resolve, ...l.routeConfig?.data, ...l._resolvedData },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(l.slice(g));
      }
      class Ni {
        get title() {
          return this.data?.[Kt];
        }
        constructor(p, l, g, E, I, P, Z, Y, Be) {
          (this.url = p),
            (this.params = l),
            (this.queryParams = g),
            (this.fragment = E),
            (this.data = I),
            (this.outlet = P),
            (this.component = Z),
            (this.routeConfig = Y),
            (this._resolve = Be);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return this._paramMap || (this._paramMap = Ar(this.params)), this._paramMap;
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = Ar(this.queryParams)), this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url.map(g => g.toString()).join('/')}', path:'${this.routeConfig ? this.routeConfig.path : ''}')`;
        }
      }
      class en extends Pi {
        constructor(p, l) {
          super(l), (this.url = p), Ne(this, l);
        }
        toString() {
          return ut(this._root);
        }
      }
      function Ne(c, p) {
        (p.value._routerState = c), p.children.forEach(l => Ne(c, l));
      }
      function ut(c) {
        const p = c.children.length > 0 ? ` { ${c.children.map(ut).join(', ')} } ` : '';
        return `${c.value}${p}`;
      }
      function Gt(c) {
        if (c.snapshot) {
          const p = c.snapshot,
            l = c._futureSnapshot;
          (c.snapshot = l),
            Vt(p.queryParams, l.queryParams) || c.queryParamsSubject.next(l.queryParams),
            p.fragment !== l.fragment && c.fragmentSubject.next(l.fragment),
            Vt(p.params, l.params) || c.paramsSubject.next(l.params),
            (function Yn(c, p) {
              if (c.length !== p.length) return !1;
              for (let l = 0; l < c.length; ++l) if (!Vt(c[l], p[l])) return !1;
              return !0;
            })(p.url, l.url) || c.urlSubject.next(l.url),
            Vt(p.data, l.data) || c.dataSubject.next(l.data);
        } else (c.snapshot = c._futureSnapshot), c.dataSubject.next(c._futureSnapshot.data);
      }
      function $n(c, p) {
        const l =
          Vt(c.params, p.params) &&
          (function mr(c, p) {
            return et(c, p) && c.every((l, g) => Vt(l.parameters, p[g].parameters));
          })(c.url, p.url);
        return l && !(!c.parent != !p.parent) && (!c.parent || $n(c.parent, p.parent));
      }
      let Wr = (() => {
        class c {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = Qe),
              (this.activateEvents = new m.vpe()),
              (this.deactivateEvents = new m.vpe()),
              (this.attachEvents = new m.vpe()),
              (this.detachEvents = new m.vpe()),
              (this.parentContexts = (0, m.f3M)(Or)),
              (this.location = (0, m.f3M)(m.s_b)),
              (this.changeDetector = (0, m.f3M)(m.sBO)),
              (this.environmentInjector = (0, m.f3M)(m.lqb)),
              (this.inputBinder = (0, m.f3M)(xr, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(l) {
            if (l.name) {
              const { firstChange: g, previousValue: E } = l.name;
              if (g) return;
              this.isTrackedInParentContexts(E) &&
                (this.deactivate(), this.parentContexts.onChildOutletDestroyed(E)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(l) {
            return this.parentContexts.getContext(l)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if ((this.parentContexts.onChildOutletCreated(this.name, this), this.activated)) return;
            const l = this.parentContexts.getContext(this.name);
            l?.route &&
              (l.attachRef
                ? this.attach(l.attachRef, l.route)
                : this.activateWith(l.route, l.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new m.vHH(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new m.vHH(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
          }
          detach() {
            if (!this.activated) throw new m.vHH(4012, !1);
            this.location.detach();
            const l = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(l.instance),
              l
            );
          }
          attach(l, g) {
            (this.activated = l),
              (this._activatedRoute = g),
              this.location.insert(l.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(l.instance);
          }
          deactivate() {
            if (this.activated) {
              const l = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(l);
            }
          }
          activateWith(l, g) {
            if (this.isActivated) throw new m.vHH(4013, !1);
            this._activatedRoute = l;
            const E = this.location,
              P = l.snapshot.component,
              Z = this.parentContexts.getOrCreateContext(this.name).children,
              Y = new bn(l, Z, E.injector);
            (this.activated = E.createComponent(P, {
              index: E.length,
              injector: Y,
              environmentInjector: g ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
          static #e = (this.ɵfac = function (g) {
            return new (g || c)();
          });
          static #t = (this.ɵdir = m.lG2({
            type: c,
            selectors: [['router-outlet']],
            inputs: { name: 'name' },
            outputs: {
              activateEvents: 'activate',
              deactivateEvents: 'deactivate',
              attachEvents: 'attach',
              detachEvents: 'detach',
            },
            exportAs: ['outlet'],
            standalone: !0,
            features: [m.TTD],
          }));
        }
        return c;
      })();
      class bn {
        constructor(p, l, g) {
          (this.route = p), (this.childContexts = l), (this.parent = g);
        }
        get(p, l) {
          return p === sr ? this.route : p === Or ? this.childContexts : this.parent.get(p, l);
        }
      }
      const xr = new m.OlP('');
      let Nt = (() => {
        class c {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(l) {
            this.unsubscribeFromRouteData(l), this.subscribeToRouteData(l);
          }
          unsubscribeFromRouteData(l) {
            this.outletDataSubscriptions.get(l)?.unsubscribe(),
              this.outletDataSubscriptions.delete(l);
          }
          subscribeToRouteData(l) {
            const { activatedRoute: g } = l,
              E = $e([g.queryParams, g.params, g.data])
                .pipe(
                  (0, fn.w)(
                    ([I, P, Z], Y) => (
                      (Z = { ...I, ...P, ...Z }), 0 === Y ? (0, q.of)(Z) : Promise.resolve(Z)
                    )
                  )
                )
                .subscribe(I => {
                  if (
                    !l.isActivated ||
                    !l.activatedComponentRef ||
                    l.activatedRoute !== g ||
                    null === g.component
                  )
                    return void this.unsubscribeFromRouteData(l);
                  const P = (0, m.qFp)(g.component);
                  if (P)
                    for (const { templateName: Z } of P.inputs)
                      l.activatedComponentRef.setInput(Z, I[Z]);
                  else this.unsubscribeFromRouteData(l);
                });
            this.outletDataSubscriptions.set(l, E);
          }
          static #e = (this.ɵfac = function (g) {
            return new (g || c)();
          });
          static #t = (this.ɵprov = m.Yz7({ token: c, factory: c.ɵfac }));
        }
        return c;
      })();
      function Bn(c, p, l) {
        if (l && c.shouldReuseRoute(p.value, l.value.snapshot)) {
          const g = l.value;
          g._futureSnapshot = p.value;
          const E = (function it(c, p, l) {
            return p.children.map(g => {
              for (const E of l.children)
                if (c.shouldReuseRoute(g.value, E.value.snapshot)) return Bn(c, g, E);
              return Bn(c, g);
            });
          })(c, p, l);
          return new Yt(g, E);
        }
        {
          if (c.shouldAttach(p.value)) {
            const I = c.retrieve(p.value);
            if (null !== I) {
              const P = I.route;
              return (
                (P.value._futureSnapshot = p.value), (P.children = p.children.map(Z => Bn(c, Z))), P
              );
            }
          }
          const g = (function gi(c) {
              return new sr(
                new pe.X(c.url),
                new pe.X(c.params),
                new pe.X(c.queryParams),
                new pe.X(c.fragment),
                new pe.X(c.data),
                c.outlet,
                c.component,
                c
              );
            })(p.value),
            E = p.children.map(I => Bn(c, I));
          return new Yt(g, E);
        }
      }
      const Zi = 'ngNavigationCancelingError';
      function Cr(c, p) {
        const { redirectTo: l, navigationBehaviorOptions: g } = At(p)
            ? { redirectTo: p, navigationBehaviorOptions: void 0 }
            : p,
          E = an(!1, 0, p);
        return (E.url = l), (E.navigationBehaviorOptions = g), E;
      }
      function an(c, p, l) {
        const g = new Error('NavigationCancelingError: ' + (c || ''));
        return (g[Zi] = !0), (g.cancellationCode = p), l && (g.url = l), g;
      }
      function _r(c) {
        return c && c[Zi];
      }
      let ar = (() => {
        class c {
          static #e = (this.ɵfac = function (g) {
            return new (g || c)();
          });
          static #t = (this.ɵcmp = m.Xpm({
            type: c,
            selectors: [['ng-component']],
            standalone: !0,
            features: [m.jDz],
            decls: 1,
            vars: 0,
            template: function (g, E) {
              1 & g && m._UZ(0, 'router-outlet');
            },
            dependencies: [Wr],
            encapsulation: 2,
          }));
        }
        return c;
      })();
      function yi(c) {
        const p = c.children && c.children.map(yi),
          l = p ? { ...c, children: p } : { ...c };
        return (
          !l.component &&
            !l.loadComponent &&
            (p || l.loadChildren) &&
            l.outlet &&
            l.outlet !== Qe &&
            (l.component = ar),
          l
        );
      }
      function tn(c) {
        return c.outlet || Qe;
      }
      function wr(c) {
        if (!c) return null;
        if (c.routeConfig?._injector) return c.routeConfig._injector;
        for (let p = c.parent; p; p = p.parent) {
          const l = p.routeConfig;
          if (l?._loadedInjector) return l._loadedInjector;
          if (l?._injector) return l._injector;
        }
        return null;
      }
      class Ro {
        constructor(p, l, g, E, I) {
          (this.routeReuseStrategy = p),
            (this.futureState = l),
            (this.currState = g),
            (this.forwardEvent = E),
            (this.inputBindingEnabled = I);
        }
        activate(p) {
          const l = this.futureState._root,
            g = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(l, g, p),
            Gt(this.futureState.root),
            this.activateChildRoutes(l, g, p);
        }
        deactivateChildRoutes(p, l, g) {
          const E = sn(l);
          p.children.forEach(I => {
            const P = I.value.outlet;
            this.deactivateRoutes(I, E[P], g), delete E[P];
          }),
            Object.values(E).forEach(I => {
              this.deactivateRouteAndItsChildren(I, g);
            });
        }
        deactivateRoutes(p, l, g) {
          const E = p.value,
            I = l ? l.value : null;
          if (E === I)
            if (E.component) {
              const P = g.getContext(E.outlet);
              P && this.deactivateChildRoutes(p, l, P.children);
            } else this.deactivateChildRoutes(p, l, g);
          else I && this.deactivateRouteAndItsChildren(l, g);
        }
        deactivateRouteAndItsChildren(p, l) {
          p.value.component && this.routeReuseStrategy.shouldDetach(p.value.snapshot)
            ? this.detachAndStoreRouteSubtree(p, l)
            : this.deactivateRouteAndOutlet(p, l);
        }
        detachAndStoreRouteSubtree(p, l) {
          const g = l.getContext(p.value.outlet),
            E = g && p.value.component ? g.children : l,
            I = sn(p);
          for (const P of Object.keys(I)) this.deactivateRouteAndItsChildren(I[P], E);
          if (g && g.outlet) {
            const P = g.outlet.detach(),
              Z = g.children.onOutletDeactivated();
            this.routeReuseStrategy.store(p.value.snapshot, {
              componentRef: P,
              route: p,
              contexts: Z,
            });
          }
        }
        deactivateRouteAndOutlet(p, l) {
          const g = l.getContext(p.value.outlet),
            E = g && p.value.component ? g.children : l,
            I = sn(p);
          for (const P of Object.keys(I)) this.deactivateRouteAndItsChildren(I[P], E);
          g &&
            (g.outlet && (g.outlet.deactivate(), g.children.onOutletDeactivated()),
            (g.attachRef = null),
            (g.route = null));
        }
        activateChildRoutes(p, l, g) {
          const E = sn(l);
          p.children.forEach(I => {
            this.activateRoutes(I, E[I.value.outlet], g),
              this.forwardEvent(new Ao(I.value.snapshot));
          }),
            p.children.length && this.forwardEvent(new ao(p.value.snapshot));
        }
        activateRoutes(p, l, g) {
          const E = p.value,
            I = l ? l.value : null;
          if ((Gt(E), E === I))
            if (E.component) {
              const P = g.getOrCreateContext(E.outlet);
              this.activateChildRoutes(p, l, P.children);
            } else this.activateChildRoutes(p, l, g);
          else if (E.component) {
            const P = g.getOrCreateContext(E.outlet);
            if (this.routeReuseStrategy.shouldAttach(E.snapshot)) {
              const Z = this.routeReuseStrategy.retrieve(E.snapshot);
              this.routeReuseStrategy.store(E.snapshot, null),
                P.children.onOutletReAttached(Z.contexts),
                (P.attachRef = Z.componentRef),
                (P.route = Z.route.value),
                P.outlet && P.outlet.attach(Z.componentRef, Z.route.value),
                Gt(Z.route.value),
                this.activateChildRoutes(p, null, P.children);
            } else {
              const Z = wr(E.snapshot);
              (P.attachRef = null),
                (P.route = E),
                (P.injector = Z),
                P.outlet && P.outlet.activateWith(E, P.injector),
                this.activateChildRoutes(p, null, P.children);
            }
          } else this.activateChildRoutes(p, null, g);
        }
      }
      class Fn {
        constructor(p) {
          (this.path = p), (this.route = this.path[this.path.length - 1]);
        }
      }
      class vn {
        constructor(p, l) {
          (this.component = p), (this.route = l);
        }
      }
      function go(c, p, l) {
        const g = c._root;
        return Pn(g, p ? p._root : null, l, [g.value]);
      }
      function br(c, p) {
        const l = Symbol(),
          g = p.get(c, l);
        return g === l ? ('function' != typeof c || (0, m.Z0I)(c) ? p.get(c) : c) : g;
      }
      function Pn(c, p, l, g, E = { canDeactivateChecks: [], canActivateChecks: [] }) {
        const I = sn(p);
        return (
          c.children.forEach(P => {
            (function Di(c, p, l, g, E = { canDeactivateChecks: [], canActivateChecks: [] }) {
              const I = c.value,
                P = p ? p.value : null,
                Z = l ? l.getContext(c.value.outlet) : null;
              if (P && I.routeConfig === P.routeConfig) {
                const Y = (function Po(c, p, l) {
                  if ('function' == typeof l) return l(c, p);
                  switch (l) {
                    case 'pathParamsChange':
                      return !et(c.url, p.url);
                    case 'pathParamsOrQueryParamsChange':
                      return !et(c.url, p.url) || !Vt(c.queryParams, p.queryParams);
                    case 'always':
                      return !0;
                    case 'paramsOrQueryParamsChange':
                      return !$n(c, p) || !Vt(c.queryParams, p.queryParams);
                    default:
                      return !$n(c, p);
                  }
                })(P, I, I.routeConfig.runGuardsAndResolvers);
                Y
                  ? E.canActivateChecks.push(new Fn(g))
                  : ((I.data = P.data), (I._resolvedData = P._resolvedData)),
                  Pn(c, p, I.component ? (Z ? Z.children : null) : l, g, E),
                  Y &&
                    Z &&
                    Z.outlet &&
                    Z.outlet.isActivated &&
                    E.canDeactivateChecks.push(new vn(Z.outlet.component, P));
              } else
                P && Wt(p, Z, E),
                  E.canActivateChecks.push(new Fn(g)),
                  Pn(c, null, I.component ? (Z ? Z.children : null) : l, g, E);
            })(P, I[P.value.outlet], l, g.concat([P.value]), E),
              delete I[P.value.outlet];
          }),
          Object.entries(I).forEach(([P, Z]) => Wt(Z, l.getContext(P), E)),
          E
        );
      }
      function Wt(c, p, l) {
        const g = sn(c),
          E = c.value;
        Object.entries(g).forEach(([I, P]) => {
          Wt(P, E.component ? (p ? p.children.getContext(I) : null) : p, l);
        }),
          l.canDeactivateChecks.push(
            new vn(
              E.component && p && p.outlet && p.outlet.isActivated ? p.outlet.component : null,
              E
            )
          );
      }
      function xi(c) {
        return 'function' == typeof c;
      }
      function Oo(c) {
        return c instanceof lt.K || 'EmptyError' === c?.name;
      }
      const mo = Symbol('INITIAL_VALUE');
      function Ei() {
        return (0, fn.w)(c =>
          $e(
            c.map(p =>
              p.pipe(
                (0, Tn.q)(1),
                (function Tr(...c) {
                  const p = (0, te.yG)(c);
                  return (0, X.e)((l, g) => {
                    (p ? (0, tt.z)(c, l, p) : (0, tt.z)(c, l)).subscribe(g);
                  });
                })(mo)
              )
            )
          ).pipe(
            (0, Ve.U)(p => {
              for (const l of p)
                if (!0 !== l) {
                  if (l === mo) return mo;
                  if (!1 === l || l instanceof rr) return l;
                }
              return !0;
            }),
            (0, An.h)(p => p !== mo),
            (0, Tn.q)(1)
          )
        );
      }
      function O(c) {
        return (0, ve.z)(
          (0, re.b)(p => {
            if (At(p)) throw Cr(0, p);
          }),
          (0, Ve.U)(p => !0 === p)
        );
      }
      class G {
        constructor(p) {
          this.segmentGroup = p || null;
        }
      }
      class ee {
        constructor(p) {
          this.urlTree = p;
        }
      }
      function Ae(c) {
        return he(new G(c));
      }
      function Pe(c) {
        return he(new ee(c));
      }
      class Je {
        constructor(p, l) {
          (this.urlSerializer = p), (this.urlTree = l);
        }
        noMatchError(p) {
          return new m.vHH(4002, !1);
        }
        lineralizeSegments(p, l) {
          let g = [],
            E = l.root;
          for (;;) {
            if (((g = g.concat(E.segments)), 0 === E.numberOfChildren)) return (0, q.of)(g);
            if (E.numberOfChildren > 1 || !E.children[Qe]) return he(new m.vHH(4e3, !1));
            E = E.children[Qe];
          }
        }
        applyRedirectCommands(p, l, g) {
          return this.applyRedirectCreateUrlTree(l, this.urlSerializer.parse(l), p, g);
        }
        applyRedirectCreateUrlTree(p, l, g, E) {
          const I = this.createSegmentGroup(p, l.root, g, E);
          return new rr(
            I,
            this.createQueryParams(l.queryParams, this.urlTree.queryParams),
            l.fragment
          );
        }
        createQueryParams(p, l) {
          const g = {};
          return (
            Object.entries(p).forEach(([E, I]) => {
              if ('string' == typeof I && I.startsWith(':')) {
                const Z = I.substring(1);
                g[E] = l[Z];
              } else g[E] = I;
            }),
            g
          );
        }
        createSegmentGroup(p, l, g, E) {
          const I = this.createSegments(p, l.segments, g, E);
          let P = {};
          return (
            Object.entries(l.children).forEach(([Z, Y]) => {
              P[Z] = this.createSegmentGroup(p, Y, g, E);
            }),
            new qe(I, P)
          );
        }
        createSegments(p, l, g, E) {
          return l.map(I =>
            I.path.startsWith(':') ? this.findPosParam(p, I, E) : this.findOrReturn(I, g)
          );
        }
        findPosParam(p, l, g) {
          const E = g[l.path.substring(1)];
          if (!E) throw new m.vHH(4001, !1);
          return E;
        }
        findOrReturn(p, l) {
          let g = 0;
          for (const E of l) {
            if (E.path === p.path) return l.splice(g), E;
            g++;
          }
          return p;
        }
      }
      const ot = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function qt(c, p, l, g, E) {
        const I = on(c, p, l);
        return I.matched
          ? ((g = (function ti(c, p) {
              return (
                c.providers &&
                  !c._injector &&
                  (c._injector = (0, m.MMx)(c.providers, p, `Route: ${c.path}`)),
                c._injector ?? p
              );
            })(p, g)),
            (function k(c, p, l, g) {
              const E = p.canMatch;
              if (!E || 0 === E.length) return (0, q.of)(!0);
              const I = E.map(P => {
                const Z = br(P, c);
                return at(
                  (function Gs(c) {
                    return c && xi(c.canMatch);
                  })(Z)
                    ? Z.canMatch(p, l)
                    : c.runInContext(() => Z(p, l))
                );
              });
              return (0, q.of)(I).pipe(Ei(), O());
            })(g, p, l).pipe((0, Ve.U)(P => (!0 === P ? I : { ...ot }))))
          : (0, q.of)(I);
      }
      function on(c, p, l) {
        if ('' === p.path)
          return 'full' === p.pathMatch && (c.hasChildren() || l.length > 0)
            ? { ...ot }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: l,
                parameters: {},
                positionalParamSegments: {},
              };
        const E = (p.matcher || dr)(l, c, p);
        if (!E) return { ...ot };
        const I = {};
        Object.entries(E.posParams ?? {}).forEach(([Z, Y]) => {
          I[Z] = Y.path;
        });
        const P =
          E.consumed.length > 0 ? { ...I, ...E.consumed[E.consumed.length - 1].parameters } : I;
        return {
          matched: !0,
          consumedSegments: E.consumed,
          remainingSegments: l.slice(E.consumed.length),
          parameters: P,
          positionalParamSegments: E.posParams ?? {},
        };
      }
      function cn(c, p, l, g) {
        return l.length > 0 &&
          (function ni(c, p, l) {
            return l.some(g => dn(c, p, g) && tn(g) !== Qe);
          })(c, l, g)
          ? { segmentGroup: new qe(p, Dn(g, new qe(l, c.children))), slicedSegments: [] }
          : 0 === l.length &&
              (function fr(c, p, l) {
                return l.some(g => dn(c, p, g));
              })(c, l, g)
            ? { segmentGroup: new qe(c.segments, Mn(c, 0, l, g, c.children)), slicedSegments: l }
            : { segmentGroup: new qe(c.segments, c.children), slicedSegments: l };
      }
      function Mn(c, p, l, g, E) {
        const I = {};
        for (const P of g)
          if (dn(c, l, P) && !E[tn(P)]) {
            const Z = new qe([], {});
            I[tn(P)] = Z;
          }
        return { ...E, ...I };
      }
      function Dn(c, p) {
        const l = {};
        l[Qe] = p;
        for (const g of c)
          if ('' === g.path && tn(g) !== Qe) {
            const E = new qe([], {});
            l[tn(g)] = E;
          }
        return l;
      }
      function dn(c, p, l) {
        return (!(c.hasChildren() || p.length > 0) || 'full' !== l.pathMatch) && '' === l.path;
      }
      class es {
        constructor(p, l, g, E, I, P, Z) {
          (this.injector = p),
            (this.configLoader = l),
            (this.rootComponentType = g),
            (this.config = E),
            (this.urlTree = I),
            (this.paramsInheritanceStrategy = P),
            (this.urlSerializer = Z),
            (this.allowRedirects = !0),
            (this.applyRedirects = new Je(this.urlSerializer, this.urlTree));
        }
        noMatchError(p) {
          return new m.vHH(4002, !1);
        }
        recognize() {
          const p = cn(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(this.injector, this.config, p, Qe).pipe(
            De(l => {
              if (l instanceof ee)
                return (
                  (this.allowRedirects = !1), (this.urlTree = l.urlTree), this.match(l.urlTree)
                );
              throw l instanceof G ? this.noMatchError(l) : l;
            }),
            (0, Ve.U)(l => {
              const g = new Ni(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  Qe,
                  this.rootComponentType,
                  null,
                  {}
                ),
                E = new Yt(g, l),
                I = new en('', E),
                P = (function dt(c, p, l = null, g = null) {
                  return yr(_n(c), p, l, g);
                })(g, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (P.queryParams = this.urlTree.queryParams),
                (I.url = this.urlSerializer.serialize(P)),
                this.inheritParamsAndData(I._root),
                { state: I, tree: P }
              );
            })
          );
        }
        match(p) {
          return this.processSegmentGroup(this.injector, this.config, p.root, Qe).pipe(
            De(g => {
              throw g instanceof G ? this.noMatchError(g) : g;
            })
          );
        }
        inheritParamsAndData(p) {
          const l = p.value,
            g = Gr(l, this.paramsInheritanceStrategy);
          (l.params = Object.freeze(g.params)),
            (l.data = Object.freeze(g.data)),
            p.children.forEach(E => this.inheritParamsAndData(E));
        }
        processSegmentGroup(p, l, g, E) {
          return 0 === g.segments.length && g.hasChildren()
            ? this.processChildren(p, l, g)
            : this.processSegment(p, l, g, g.segments, E, !0);
        }
        processChildren(p, l, g) {
          const E = [];
          for (const I of Object.keys(g.children)) 'primary' === I ? E.unshift(I) : E.push(I);
          return (0, Q.D)(E).pipe(
            (0, ae.b)(I => {
              const P = g.children[I],
                Z = (function Oi(c, p) {
                  const l = c.filter(g => tn(g) === p);
                  return l.push(...c.filter(g => tn(g) !== p)), l;
                })(l, I);
              return this.processSegmentGroup(p, Z, P, I);
            }),
            (function nt(c, p) {
              return (0, X.e)((0, be.U)(c, p, arguments.length >= 2, !0));
            })((I, P) => (I.push(...P), I)),
            (0, Tt.d)(null),
            (function Ut(c, p) {
              const l = arguments.length >= 2;
              return g =>
                g.pipe(
                  c ? (0, An.h)((E, I) => c(E, I, g)) : se.y,
                  hn(1),
                  l ? (0, Tt.d)(p) : (0, rt.T)(() => new lt.K())
                );
            })(),
            (0, V.z)(I => {
              if (null === I) return Ae(g);
              const P = vo(I);
              return (
                (function Xi(c) {
                  c.sort((p, l) =>
                    p.value.outlet === Qe
                      ? -1
                      : l.value.outlet === Qe
                        ? 1
                        : p.value.outlet.localeCompare(l.value.outlet)
                  );
                })(P),
                (0, q.of)(P)
              );
            })
          );
        }
        processSegment(p, l, g, E, I, P) {
          return (0, Q.D)(l).pipe(
            (0, ae.b)(Z =>
              this.processSegmentAgainstRoute(Z._injector ?? p, l, Z, g, E, I, P).pipe(
                De(Y => {
                  if (Y instanceof G) return (0, q.of)(null);
                  throw Y;
                })
              )
            ),
            (0, J.P)(Z => !!Z),
            De(Z => {
              if (Oo(Z))
                return (function Vn(c, p, l) {
                  return 0 === p.length && !c.children[l];
                })(g, E, I)
                  ? (0, q.of)([])
                  : Ae(g);
              throw Z;
            })
          );
        }
        processSegmentAgainstRoute(p, l, g, E, I, P, Z) {
          return (function er(c, p, l, g) {
            return (
              !!(tn(c) === g || (g !== Qe && dn(p, l, c))) &&
              ('**' === c.path || on(p, c, l).matched)
            );
          })(g, E, I, P)
            ? void 0 === g.redirectTo
              ? this.matchSegmentAgainstRoute(p, E, g, I, P, Z)
              : Z && this.allowRedirects
                ? this.expandSegmentAgainstRouteUsingRedirect(p, E, l, g, I, P)
                : Ae(E)
            : Ae(E);
        }
        expandSegmentAgainstRouteUsingRedirect(p, l, g, E, I, P) {
          return '**' === E.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(p, g, E, P)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(p, l, g, E, I, P);
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(p, l, g, E) {
          const I = this.applyRedirects.applyRedirectCommands([], g.redirectTo, {});
          return g.redirectTo.startsWith('/')
            ? Pe(I)
            : this.applyRedirects.lineralizeSegments(g, I).pipe(
                (0, V.z)(P => {
                  const Z = new qe(P, {});
                  return this.processSegment(p, l, Z, P, E, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(p, l, g, E, I, P) {
          const {
            matched: Z,
            consumedSegments: Y,
            remainingSegments: Be,
            positionalParamSegments: pt,
          } = on(l, E, I);
          if (!Z) return Ae(l);
          const nn = this.applyRedirects.applyRedirectCommands(Y, E.redirectTo, pt);
          return E.redirectTo.startsWith('/')
            ? Pe(nn)
            : this.applyRedirects
                .lineralizeSegments(E, nn)
                .pipe((0, V.z)(Bt => this.processSegment(p, g, l, Bt.concat(Be), P, !1)));
        }
        matchSegmentAgainstRoute(p, l, g, E, I, P) {
          let Z;
          if ('**' === g.path) {
            const Y = E.length > 0 ? Dt(E).parameters : {},
              Be = new Ni(
                E,
                Y,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                Ge(g),
                tn(g),
                g.component ?? g._loadedComponent ?? null,
                g,
                d(g)
              );
            (Z = (0, q.of)({ snapshot: Be, consumedSegments: [], remainingSegments: [] })),
              (l.children = {});
          } else
            Z = qt(l, g, E, p).pipe(
              (0, Ve.U)(
                ({ matched: Y, consumedSegments: Be, remainingSegments: pt, parameters: nn }) =>
                  Y
                    ? {
                        snapshot: new Ni(
                          Be,
                          nn,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          Ge(g),
                          tn(g),
                          g.component ?? g._loadedComponent ?? null,
                          g,
                          d(g)
                        ),
                        consumedSegments: Be,
                        remainingSegments: pt,
                      }
                    : null
              )
            );
          return Z.pipe(
            (0, fn.w)(Y =>
              null === Y
                ? Ae(l)
                : this.getChildConfig((p = g._injector ?? p), g, E).pipe(
                    (0, fn.w)(({ routes: Be }) => {
                      const pt = g._loadedInjector ?? p,
                        { snapshot: nn, consumedSegments: Bt, remainingSegments: ai } = Y,
                        { segmentGroup: Do, slicedSegments: to } = cn(l, Bt, ai, Be);
                      if (0 === to.length && Do.hasChildren())
                        return this.processChildren(pt, Be, Do).pipe(
                          (0, Ve.U)(Eo => (null === Eo ? null : [new Yt(nn, Eo)]))
                        );
                      if (0 === Be.length && 0 === to.length) return (0, q.of)([new Yt(nn, [])]);
                      const ea = tn(g) === I;
                      return this.processSegment(pt, Be, Do, to, ea ? Qe : I, !0).pipe(
                        (0, Ve.U)(Eo => [new Yt(nn, Eo)])
                      );
                    })
                  )
            )
          );
        }
        getChildConfig(p, l, g) {
          return l.children
            ? (0, q.of)({ routes: l.children, injector: p })
            : l.loadChildren
              ? void 0 !== l._loadedRoutes
                ? (0, q.of)({ routes: l._loadedRoutes, injector: l._loadedInjector })
                : (function T(c, p, l, g) {
                    const E = p.canLoad;
                    if (void 0 === E || 0 === E.length) return (0, q.of)(!0);
                    const I = E.map(P => {
                      const Z = br(P, c);
                      return at(
                        (function Xo(c) {
                          return c && xi(c.canLoad);
                        })(Z)
                          ? Z.canLoad(p, l)
                          : c.runInContext(() => Z(p, l))
                      );
                    });
                    return (0, q.of)(I).pipe(Ei(), O());
                  })(p, l, g).pipe(
                    (0, V.z)(E =>
                      E
                        ? this.configLoader.loadChildren(p, l).pipe(
                            (0, re.b)(I => {
                              (l._loadedRoutes = I.routes), (l._loadedInjector = I.injector);
                            })
                          )
                        : (function ht(c) {
                            return he(an(!1, 3));
                          })()
                    )
                  )
              : (0, q.of)({ routes: [], injector: p });
        }
      }
      function Ci(c) {
        const p = c.value.routeConfig;
        return p && '' === p.path;
      }
      function vo(c) {
        const p = [],
          l = new Set();
        for (const g of c) {
          if (!Ci(g)) {
            p.push(g);
            continue;
          }
          const E = p.find(I => g.value.routeConfig === I.value.routeConfig);
          void 0 !== E ? (E.children.push(...g.children), l.add(E)) : p.push(g);
        }
        for (const g of l) {
          const E = vo(g.children);
          p.push(new Yt(g.value, E));
        }
        return p.filter(g => !l.has(g));
      }
      function Ge(c) {
        return c.data || {};
      }
      function d(c) {
        return c.resolve || {};
      }
      function Me(c) {
        return 'string' == typeof c.title || null === c.title;
      }
      function Ot(c) {
        return (0, fn.w)(p => {
          const l = c(p);
          return l ? (0, Q.D)(l).pipe((0, Ve.U)(() => p)) : (0, q.of)(p);
        });
      }
      const Rt = new m.OlP('ROUTES');
      let st = (() => {
        class c {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = (0, m.f3M)(m.Sil));
          }
          loadComponent(l) {
            if (this.componentLoaders.get(l)) return this.componentLoaders.get(l);
            if (l._loadedComponent) return (0, q.of)(l._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(l);
            const g = at(l.loadComponent()).pipe(
                (0, Ve.U)(jt),
                (0, re.b)(I => {
                  this.onLoadEndListener && this.onLoadEndListener(l), (l._loadedComponent = I);
                }),
                (0, vt.x)(() => {
                  this.componentLoaders.delete(l);
                })
              ),
              E = new ne(g, () => new yt.x()).pipe(Se());
            return this.componentLoaders.set(l, E), E;
          }
          loadChildren(l, g) {
            if (this.childrenLoaders.get(g)) return this.childrenLoaders.get(g);
            if (g._loadedRoutes)
              return (0, q.of)({ routes: g._loadedRoutes, injector: g._loadedInjector });
            this.onLoadStartListener && this.onLoadStartListener(g);
            const I = (function ct(c, p, l, g) {
                return at(c.loadChildren()).pipe(
                  (0, Ve.U)(jt),
                  (0, V.z)(E =>
                    E instanceof m.YKP || Array.isArray(E)
                      ? (0, q.of)(E)
                      : (0, Q.D)(p.compileModuleAsync(E))
                  ),
                  (0, Ve.U)(E => {
                    g && g(c);
                    let I,
                      P,
                      Z = !1;
                    return (
                      Array.isArray(E)
                        ? ((P = E), !0)
                        : ((I = E.create(l).injector),
                          (P = I.get(Rt, [], { optional: !0, self: !0 }).flat())),
                      { routes: P.map(yi), injector: I }
                    );
                  })
                );
              })(g, this.compiler, l, this.onLoadEndListener).pipe(
                (0, vt.x)(() => {
                  this.childrenLoaders.delete(g);
                })
              ),
              P = new ne(I, () => new yt.x()).pipe(Se());
            return this.childrenLoaders.set(g, P), P;
          }
          static #e = (this.ɵfac = function (g) {
            return new (g || c)();
          });
          static #t = (this.ɵprov = m.Yz7({ token: c, factory: c.ɵfac, providedIn: 'root' }));
        }
        return c;
      })();
      function jt(c) {
        return (function Pt(c) {
          return c && 'object' == typeof c && 'default' in c;
        })(c)
          ? c.default
          : c;
      }
      let Zt = (() => {
        class c {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.currentTransition = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new yt.x()),
              (this.transitionAbortSubject = new yt.x()),
              (this.configLoader = (0, m.f3M)(st)),
              (this.environmentInjector = (0, m.f3M)(m.lqb)),
              (this.urlSerializer = (0, m.f3M)(ln)),
              (this.rootContexts = (0, m.f3M)(Or)),
              (this.inputBindingEnabled = null !== (0, m.f3M)(xr, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => (0, q.of)(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = E => this.events.next(new pi(E))),
              (this.configLoader.onLoadStartListener = E => this.events.next(new Yi(E)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(l) {
            const g = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...l, id: g });
          }
          setupNavigations(l, g, E) {
            return (
              (this.transitions = new pe.X({
                id: 0,
                currentUrlTree: g,
                currentRawUrl: g,
                currentBrowserUrl: g,
                extractedUrl: l.urlHandlingStrategy.extract(g),
                urlAfterRedirects: l.urlHandlingStrategy.extract(g),
                rawUrl: g,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Xn,
                restoredState: null,
                currentSnapshot: E.snapshot,
                targetSnapshot: null,
                currentRouterState: E,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                (0, An.h)(I => 0 !== I.id),
                (0, Ve.U)(I => ({ ...I, extractedUrl: l.urlHandlingStrategy.extract(I.rawUrl) })),
                (0, fn.w)(I => {
                  this.currentTransition = I;
                  let P = !1,
                    Z = !1;
                  return (0, q.of)(I).pipe(
                    (0, re.b)(Y => {
                      this.currentNavigation = {
                        id: Y.id,
                        initialUrl: Y.rawUrl,
                        extractedUrl: Y.extractedUrl,
                        trigger: Y.source,
                        extras: Y.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? { ...this.lastSuccessfulNavigation, previousNavigation: null }
                          : null,
                      };
                    }),
                    (0, fn.w)(Y => {
                      const Be = Y.currentBrowserUrl.toString(),
                        pt =
                          !l.navigated ||
                          Y.extractedUrl.toString() !== Be ||
                          Be !== Y.currentUrlTree.toString();
                      if (
                        !pt &&
                        'reload' !== (Y.extras.onSameUrlNavigation ?? l.onSameUrlNavigation)
                      ) {
                        const Bt = '';
                        return (
                          this.events.next(
                            new Vr(Y.id, this.urlSerializer.serialize(Y.rawUrl), Bt, 0)
                          ),
                          Y.resolve(null),
                          Ie.E
                        );
                      }
                      if (l.urlHandlingStrategy.shouldProcessUrl(Y.rawUrl))
                        return (0, q.of)(Y).pipe(
                          (0, fn.w)(Bt => {
                            const ai = this.transitions?.getValue();
                            return (
                              this.events.next(
                                new fi(
                                  Bt.id,
                                  this.urlSerializer.serialize(Bt.extractedUrl),
                                  Bt.source,
                                  Bt.restoredState
                                )
                              ),
                              ai !== this.transitions?.getValue() ? Ie.E : Promise.resolve(Bt)
                            );
                          }),
                          (function _(c, p, l, g, E, I) {
                            return (0, V.z)(P =>
                              (function Sr(c, p, l, g, E, I, P = 'emptyOnly') {
                                return new es(c, p, l, g, E, P, I).recognize();
                              })(c, p, l, g, P.extractedUrl, E, I).pipe(
                                (0, Ve.U)(({ state: Z, tree: Y }) => ({
                                  ...P,
                                  targetSnapshot: Z,
                                  urlAfterRedirects: Y,
                                }))
                              )
                            );
                          })(
                            this.environmentInjector,
                            this.configLoader,
                            this.rootComponentType,
                            l.config,
                            this.urlSerializer,
                            l.paramsInheritanceStrategy
                          ),
                          (0, re.b)(Bt => {
                            (I.targetSnapshot = Bt.targetSnapshot),
                              (I.urlAfterRedirects = Bt.urlAfterRedirects),
                              (this.currentNavigation = {
                                ...this.currentNavigation,
                                finalUrl: Bt.urlAfterRedirects,
                              });
                            const ai = new So(
                              Bt.id,
                              this.urlSerializer.serialize(Bt.extractedUrl),
                              this.urlSerializer.serialize(Bt.urlAfterRedirects),
                              Bt.targetSnapshot
                            );
                            this.events.next(ai);
                          })
                        );
                      if (pt && l.urlHandlingStrategy.shouldProcessUrl(Y.currentRawUrl)) {
                        const {
                            id: Bt,
                            extractedUrl: ai,
                            source: Do,
                            restoredState: to,
                            extras: ea,
                          } = Y,
                          Eo = new fi(Bt, this.urlSerializer.serialize(ai), Do, to);
                        this.events.next(Eo);
                        const cr = jn(0, this.rootComponentType).snapshot;
                        return (
                          (this.currentTransition = I =
                            {
                              ...Y,
                              targetSnapshot: cr,
                              urlAfterRedirects: ai,
                              extras: { ...ea, skipLocationChange: !1, replaceUrl: !1 },
                            }),
                          (0, q.of)(I)
                        );
                      }
                      {
                        const Bt = '';
                        return (
                          this.events.next(
                            new Vr(Y.id, this.urlSerializer.serialize(Y.extractedUrl), Bt, 1)
                          ),
                          Y.resolve(null),
                          Ie.E
                        );
                      }
                    }),
                    (0, re.b)(Y => {
                      const Be = new Jn(
                        Y.id,
                        this.urlSerializer.serialize(Y.extractedUrl),
                        this.urlSerializer.serialize(Y.urlAfterRedirects),
                        Y.targetSnapshot
                      );
                      this.events.next(Be);
                    }),
                    (0, Ve.U)(
                      Y => (
                        (this.currentTransition = I =
                          {
                            ...Y,
                            guards: go(Y.targetSnapshot, Y.currentSnapshot, this.rootContexts),
                          }),
                        I
                      )
                    ),
                    (function Ws(c, p) {
                      return (0, V.z)(l => {
                        const {
                          targetSnapshot: g,
                          currentSnapshot: E,
                          guards: { canActivateChecks: I, canDeactivateChecks: P },
                        } = l;
                        return 0 === P.length && 0 === I.length
                          ? (0, q.of)({ ...l, guardsResult: !0 })
                          : (function Ks(c, p, l, g) {
                              return (0, Q.D)(c).pipe(
                                (0, V.z)(E =>
                                  (function b(c, p, l, g, E) {
                                    const I =
                                      p && p.routeConfig ? p.routeConfig.canDeactivate : null;
                                    if (!I || 0 === I.length) return (0, q.of)(!0);
                                    const P = I.map(Z => {
                                      const Y = wr(p) ?? E,
                                        Be = br(Z, Y);
                                      return at(
                                        (function zs(c) {
                                          return c && xi(c.canDeactivate);
                                        })(Be)
                                          ? Be.canDeactivate(c, p, l, g)
                                          : Y.runInContext(() => Be(c, p, l, g))
                                      ).pipe((0, J.P)());
                                    });
                                    return (0, q.of)(P).pipe(Ei());
                                  })(E.component, E.route, l, p, g)
                                ),
                                (0, J.P)(E => !0 !== E, !0)
                              );
                            })(P, g, E, c).pipe(
                              (0, V.z)(Z =>
                                Z &&
                                (function Zo(c) {
                                  return 'boolean' == typeof c;
                                })(Z)
                                  ? (function yo(c, p, l, g) {
                                      return (0, Q.D)(p).pipe(
                                        (0, ae.b)(E =>
                                          (0, tt.z)(
                                            (function a(c, p) {
                                              return null !== c && p && p(new Io(c)), (0, q.of)(!0);
                                            })(E.route.parent, g),
                                            (function w(c, p) {
                                              return null !== c && p && p(new To(c)), (0, q.of)(!0);
                                            })(E.route, g),
                                            (function v(c, p, l) {
                                              const g = p[p.length - 1],
                                                I = p
                                                  .slice(0, p.length - 1)
                                                  .reverse()
                                                  .map(P =>
                                                    (function Yr(c) {
                                                      const p = c.routeConfig
                                                        ? c.routeConfig.canActivateChild
                                                        : null;
                                                      return p && 0 !== p.length
                                                        ? { node: c, guards: p }
                                                        : null;
                                                    })(P)
                                                  )
                                                  .filter(P => null !== P)
                                                  .map(P =>
                                                    K(() => {
                                                      const Z = P.guards.map(Y => {
                                                        const Be = wr(P.node) ?? l,
                                                          pt = br(Y, Be);
                                                        return at(
                                                          (function Vs(c) {
                                                            return c && xi(c.canActivateChild);
                                                          })(pt)
                                                            ? pt.canActivateChild(g, c)
                                                            : Be.runInContext(() => pt(g, c))
                                                        ).pipe((0, J.P)());
                                                      });
                                                      return (0, q.of)(Z).pipe(Ei());
                                                    })
                                                  );
                                              return (0, q.of)(I).pipe(Ei());
                                            })(c, E.path, l),
                                            (function f(c, p, l) {
                                              const g = p.routeConfig
                                                ? p.routeConfig.canActivate
                                                : null;
                                              if (!g || 0 === g.length) return (0, q.of)(!0);
                                              const E = g.map(I =>
                                                K(() => {
                                                  const P = wr(p) ?? l,
                                                    Z = br(I, P);
                                                  return at(
                                                    (function $s(c) {
                                                      return c && xi(c.canActivate);
                                                    })(Z)
                                                      ? Z.canActivate(p, c)
                                                      : P.runInContext(() => Z(p, c))
                                                  ).pipe((0, J.P)());
                                                })
                                              );
                                              return (0, q.of)(E).pipe(Ei());
                                            })(c, E.route, l)
                                          )
                                        ),
                                        (0, J.P)(E => !0 !== E, !0)
                                      );
                                    })(g, I, c, p)
                                  : (0, q.of)(Z)
                              ),
                              (0, Ve.U)(Z => ({ ...l, guardsResult: Z }))
                            );
                      });
                    })(this.environmentInjector, Y => this.events.next(Y)),
                    (0, re.b)(Y => {
                      if (((I.guardsResult = Y.guardsResult), At(Y.guardsResult)))
                        throw Cr(0, Y.guardsResult);
                      const Be = new Ki(
                        Y.id,
                        this.urlSerializer.serialize(Y.extractedUrl),
                        this.urlSerializer.serialize(Y.urlAfterRedirects),
                        Y.targetSnapshot,
                        !!Y.guardsResult
                      );
                      this.events.next(Be);
                    }),
                    (0, An.h)(
                      Y => !!Y.guardsResult || (this.cancelNavigationTransition(Y, '', 3), !1)
                    ),
                    Ot(Y => {
                      if (Y.guards.canActivateChecks.length)
                        return (0, q.of)(Y).pipe(
                          (0, re.b)(Be => {
                            const pt = new Mo(
                              Be.id,
                              this.urlSerializer.serialize(Be.extractedUrl),
                              this.urlSerializer.serialize(Be.urlAfterRedirects),
                              Be.targetSnapshot
                            );
                            this.events.next(pt);
                          }),
                          (0, fn.w)(Be => {
                            let pt = !1;
                            return (0, q.of)(Be).pipe(
                              (function y(c, p) {
                                return (0, V.z)(l => {
                                  const {
                                    targetSnapshot: g,
                                    guards: { canActivateChecks: E },
                                  } = l;
                                  if (!E.length) return (0, q.of)(l);
                                  let I = 0;
                                  return (0, Q.D)(E).pipe(
                                    (0, ae.b)(P =>
                                      (function C(c, p, l, g) {
                                        const E = c.routeConfig,
                                          I = c._resolve;
                                        return (
                                          void 0 !== E?.title && !Me(E) && (I[Kt] = E.title),
                                          (function R(c, p, l, g) {
                                            const E = (function W(c) {
                                              return [
                                                ...Object.keys(c),
                                                ...Object.getOwnPropertySymbols(c),
                                              ];
                                            })(c);
                                            if (0 === E.length) return (0, q.of)({});
                                            const I = {};
                                            return (0, Q.D)(E).pipe(
                                              (0, V.z)(P =>
                                                (function de(c, p, l, g) {
                                                  const E = wr(p) ?? g,
                                                    I = br(c, E);
                                                  return at(
                                                    I.resolve
                                                      ? I.resolve(p, l)
                                                      : E.runInContext(() => I(p, l))
                                                  );
                                                })(c[P], p, l, g).pipe(
                                                  (0, J.P)(),
                                                  (0, re.b)(Z => {
                                                    I[P] = Z;
                                                  })
                                                )
                                              ),
                                              hn(1),
                                              (0, Xt.h)(I),
                                              De(P => (Oo(P) ? Ie.E : he(P)))
                                            );
                                          })(I, c, p, g).pipe(
                                            (0, Ve.U)(
                                              P => (
                                                (c._resolvedData = P),
                                                (c.data = Gr(c, l).resolve),
                                                E && Me(E) && (c.data[Kt] = E.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(P.route, g, c, p)
                                    ),
                                    (0, re.b)(() => I++),
                                    hn(1),
                                    (0, V.z)(P => (I === E.length ? (0, q.of)(l) : Ie.E))
                                  );
                                });
                              })(l.paramsInheritanceStrategy, this.environmentInjector),
                              (0, re.b)({
                                next: () => (pt = !0),
                                complete: () => {
                                  pt || this.cancelNavigationTransition(Be, '', 2);
                                },
                              })
                            );
                          }),
                          (0, re.b)(Be => {
                            const pt = new Ai(
                              Be.id,
                              this.urlSerializer.serialize(Be.extractedUrl),
                              this.urlSerializer.serialize(Be.urlAfterRedirects),
                              Be.targetSnapshot
                            );
                            this.events.next(pt);
                          })
                        );
                    }),
                    Ot(Y => {
                      const Be = pt => {
                        const nn = [];
                        pt.routeConfig?.loadComponent &&
                          !pt.routeConfig._loadedComponent &&
                          nn.push(
                            this.configLoader.loadComponent(pt.routeConfig).pipe(
                              (0, re.b)(Bt => {
                                pt.component = Bt;
                              }),
                              (0, Ve.U)(() => {})
                            )
                          );
                        for (const Bt of pt.children) nn.push(...Be(Bt));
                        return nn;
                      };
                      return $e(Be(Y.targetSnapshot.root)).pipe((0, Tt.d)(), (0, Tn.q)(1));
                    }),
                    Ot(() => this.afterPreactivation()),
                    (0, Ve.U)(Y => {
                      const Be = (function Er(c, p, l) {
                        const g = Bn(c, p._root, l ? l._root : void 0);
                        return new zr(g, p);
                      })(l.routeReuseStrategy, Y.targetSnapshot, Y.currentRouterState);
                      return (this.currentTransition = I = { ...Y, targetRouterState: Be }), I;
                    }),
                    (0, re.b)(() => {
                      this.events.next(new lo());
                    }),
                    ((c, p, l, g) =>
                      (0, Ve.U)(
                        E => (
                          new Ro(p, E.targetRouterState, E.currentRouterState, l, g).activate(c), E
                        )
                      ))(
                      this.rootContexts,
                      l.routeReuseStrategy,
                      Y => this.events.next(Y),
                      this.inputBindingEnabled
                    ),
                    (0, Tn.q)(1),
                    (0, re.b)({
                      next: Y => {
                        (P = !0),
                          (this.lastSuccessfulNavigation = this.currentNavigation),
                          this.events.next(
                            new Un(
                              Y.id,
                              this.urlSerializer.serialize(Y.extractedUrl),
                              this.urlSerializer.serialize(Y.urlAfterRedirects)
                            )
                          ),
                          l.titleStrategy?.updateTitle(Y.targetRouterState.snapshot),
                          Y.resolve(!0);
                      },
                      complete: () => {
                        P = !0;
                      },
                    }),
                    (0, Ft.R)(
                      this.transitionAbortSubject.pipe(
                        (0, re.b)(Y => {
                          throw Y;
                        })
                      )
                    ),
                    (0, vt.x)(() => {
                      P || Z || this.cancelNavigationTransition(I, '', 1),
                        this.currentNavigation?.id === I.id && (this.currentNavigation = null);
                    }),
                    De(Y => {
                      if (((Z = !0), _r(Y)))
                        this.events.next(
                          new hi(
                            I.id,
                            this.urlSerializer.serialize(I.extractedUrl),
                            Y.message,
                            Y.cancellationCode
                          )
                        ),
                          (function Kr(c) {
                            return _r(c) && At(c.url);
                          })(Y)
                            ? this.events.next(new qi(Y.url))
                            : I.resolve(!1);
                      else {
                        this.events.next(
                          new xn(
                            I.id,
                            this.urlSerializer.serialize(I.extractedUrl),
                            Y,
                            I.targetSnapshot ?? void 0
                          )
                        );
                        try {
                          I.resolve(l.errorHandler(Y));
                        } catch (Be) {
                          I.reject(Be);
                        }
                      }
                      return Ie.E;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(l, g, E) {
            const I = new hi(l.id, this.urlSerializer.serialize(l.extractedUrl), g, E);
            this.events.next(I), l.resolve(!1);
          }
          static #e = (this.ɵfac = function (g) {
            return new (g || c)();
          });
          static #t = (this.ɵprov = m.Yz7({ token: c, factory: c.ɵfac, providedIn: 'root' }));
        }
        return c;
      })();
      function qr(c) {
        return c !== Xn;
      }
      let Qr = (() => {
          class c {
            buildTitle(l) {
              let g,
                E = l.root;
              for (; void 0 !== E; )
                (g = this.getResolvedTitleForRoute(E) ?? g),
                  (E = E.children.find(I => I.outlet === Qe));
              return g;
            }
            getResolvedTitleForRoute(l) {
              return l.data[Kt];
            }
            static #e = (this.ɵfac = function (g) {
              return new (g || c)();
            });
            static #t = (this.ɵprov = m.Yz7({
              token: c,
              factory: function () {
                return (0, m.f3M)(Li);
              },
              providedIn: 'root',
            }));
          }
          return c;
        })(),
        Li = (() => {
          class c extends Qr {
            constructor(l) {
              super(), (this.title = l);
            }
            updateTitle(l) {
              const g = this.buildTitle(l);
              void 0 !== g && this.title.setTitle(g);
            }
            static #e = (this.ɵfac = function (g) {
              return new (g || c)(m.LFG($t.Dx));
            });
            static #t = (this.ɵprov = m.Yz7({ token: c, factory: c.ɵfac, providedIn: 'root' }));
          }
          return c;
        })(),
        ur = (() => {
          class c {
            static #e = (this.ɵfac = function (g) {
              return new (g || c)();
            });
            static #t = (this.ɵprov = m.Yz7({
              token: c,
              factory: function () {
                return (0, m.f3M)(_i);
              },
              providedIn: 'root',
            }));
          }
          return c;
        })();
      class ri {
        shouldDetach(p) {
          return !1;
        }
        store(p, l) {}
        shouldAttach(p) {
          return !1;
        }
        retrieve(p) {
          return null;
        }
        shouldReuseRoute(p, l) {
          return p.routeConfig === l.routeConfig;
        }
      }
      let _i = (() => {
        class c extends ri {
          static #e = (this.ɵfac = (function () {
            let l;
            return function (E) {
              return (l || (l = m.n5z(c)))(E || c);
            };
          })());
          static #t = (this.ɵprov = m.Yz7({ token: c, factory: c.ɵfac, providedIn: 'root' }));
        }
        return c;
      })();
      const Zr = new m.OlP('', { providedIn: 'root', factory: () => ({}) });
      let ja = (() => {
          class c {
            static #e = (this.ɵfac = function (g) {
              return new (g || c)();
            });
            static #t = (this.ɵprov = m.Yz7({
              token: c,
              factory: function () {
                return (0, m.f3M)(Ba);
              },
              providedIn: 'root',
            }));
          }
          return c;
        })(),
        Ba = (() => {
          class c {
            shouldProcessUrl(l) {
              return !0;
            }
            extract(l) {
              return l;
            }
            merge(l, g) {
              return l;
            }
            static #e = (this.ɵfac = function (g) {
              return new (g || c)();
            });
            static #t = (this.ɵprov = m.Yz7({ token: c, factory: c.ɵfac, providedIn: 'root' }));
          }
          return c;
        })();
      var xo = (function (c) {
        return (
          (c[(c.COMPLETE = 0)] = 'COMPLETE'),
          (c[(c.FAILED = 1)] = 'FAILED'),
          (c[(c.REDIRECTING = 2)] = 'REDIRECTING'),
          c
        );
      })(xo || {});
      function ts(c, p) {
        c.events
          .pipe(
            (0, An.h)(
              l => l instanceof Un || l instanceof hi || l instanceof xn || l instanceof Vr
            ),
            (0, Ve.U)(l =>
              l instanceof Un || l instanceof Vr
                ? xo.COMPLETE
                : l instanceof hi && (0 === l.code || 1 === l.code)
                  ? xo.REDIRECTING
                  : xo.FAILED
            ),
            (0, An.h)(l => l !== xo.REDIRECTING),
            (0, Tn.q)(1)
          )
          .subscribe(() => {
            p();
          });
      }
      function fu(c) {
        throw c;
      }
      function ii(c, p, l) {
        return p.parse('/');
      }
      const Ha = {
          paths: 'exact',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'exact',
        },
        Ua = {
          paths: 'subset',
          fragment: 'ignored',
          matrixParams: 'ignored',
          queryParams: 'subset',
        };
      let Mt = (() => {
        class c {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            return 'computed' !== this.canceledNavigationResolution
              ? this.currentPageId
              : this.location.getState()?.ɵrouterPageId ?? this.currentPageId;
          }
          get events() {
            return this._events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = (0, m.f3M)(m.c2e)),
              (this.isNgZoneEnabled = !1),
              (this._events = new yt.x()),
              (this.options = (0, m.f3M)(Zr, { optional: !0 }) || {}),
              (this.pendingTasks = (0, m.f3M)(m.HDt)),
              (this.errorHandler = this.options.errorHandler || fu),
              (this.malformedUriErrorHandler = this.options.malformedUriErrorHandler || ii),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = (0, m.f3M)(ja)),
              (this.routeReuseStrategy = (0, m.f3M)(ur)),
              (this.titleStrategy = (0, m.f3M)(Qr)),
              (this.onSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore'),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || 'emptyOnly'),
              (this.urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred'),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || 'replace'),
              (this.config = (0, m.f3M)(Rt, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = (0, m.f3M)(Zt)),
              (this.urlSerializer = (0, m.f3M)(ln)),
              (this.location = (0, m.f3M)(ke.Ye)),
              (this.componentInputBindingEnabled = !!(0, m.f3M)(xr, { optional: !0 })),
              (this.eventsSubscription = new we.w0()),
              (this.isNgZoneEnabled =
                (0, m.f3M)(m.R0b) instanceof m.R0b && m.R0b.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new rr()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = jn(0, null)),
              this.navigationTransitions
                .setupNavigations(this, this.currentUrlTree, this.routerState)
                .subscribe(
                  l => {
                    (this.lastSuccessfulId = l.id), (this.currentPageId = this.browserPageId);
                  },
                  l => {
                    this.console.warn(`Unhandled Navigation Error: ${l}`);
                  }
                ),
              this.subscribeToNavigationEvents();
          }
          subscribeToNavigationEvents() {
            const l = this.navigationTransitions.events.subscribe(g => {
              try {
                const { currentTransition: E } = this.navigationTransitions;
                if (null === E) return void (Fo(g) && this._events.next(g));
                if (g instanceof fi) qr(E.source) && (this.browserUrlTree = E.extractedUrl);
                else if (g instanceof Vr) this.rawUrlTree = E.rawUrl;
                else if (g instanceof So) {
                  if ('eager' === this.urlUpdateStrategy) {
                    if (!E.extras.skipLocationChange) {
                      const I = this.urlHandlingStrategy.merge(E.urlAfterRedirects, E.rawUrl);
                      this.setBrowserUrl(I, E);
                    }
                    this.browserUrlTree = E.urlAfterRedirects;
                  }
                } else if (g instanceof lo)
                  (this.currentUrlTree = E.urlAfterRedirects),
                    (this.rawUrlTree = this.urlHandlingStrategy.merge(
                      E.urlAfterRedirects,
                      E.rawUrl
                    )),
                    (this.routerState = E.targetRouterState),
                    'deferred' === this.urlUpdateStrategy &&
                      (E.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, E),
                      (this.browserUrlTree = E.urlAfterRedirects));
                else if (g instanceof hi)
                  0 !== g.code && 1 !== g.code && (this.navigated = !0),
                    (3 === g.code || 2 === g.code) && this.restoreHistory(E);
                else if (g instanceof qi) {
                  const I = this.urlHandlingStrategy.merge(g.url, E.currentRawUrl),
                    P = {
                      skipLocationChange: E.extras.skipLocationChange,
                      replaceUrl: 'eager' === this.urlUpdateStrategy || qr(E.source),
                    };
                  this.scheduleNavigation(I, Xn, null, P, {
                    resolve: E.resolve,
                    reject: E.reject,
                    promise: E.promise,
                  });
                }
                g instanceof xn && this.restoreHistory(E, !0),
                  g instanceof Un && (this.navigated = !0),
                  Fo(g) && this._events.next(g);
              } catch (E) {
                this.navigationTransitions.transitionAbortSubject.next(E);
              }
            });
            this.eventsSubscription.add(l);
          }
          resetRootComponentType(l) {
            (this.routerState.root.component = l),
              (this.navigationTransitions.rootComponentType = l);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const l = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Xn, l);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe(l => {
                const g = 'popstate' === l.type ? 'popstate' : 'hashchange';
                'popstate' === g &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(l.url, g, l.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(l, g, E) {
            const I = { replaceUrl: !0 },
              P = E?.navigationId ? E : null;
            if (E) {
              const Y = { ...E };
              delete Y.navigationId,
                delete Y.ɵrouterPageId,
                0 !== Object.keys(Y).length && (I.state = Y);
            }
            const Z = this.parseUrl(l);
            this.scheduleNavigation(Z, g, P, I);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(l) {
            (this.config = l.map(yi)), (this.navigated = !1), (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(), (this.locationSubscription = void 0)),
              (this.disposed = !0),
              this.eventsSubscription.unsubscribe();
          }
          createUrlTree(l, g = {}) {
            const {
                relativeTo: E,
                queryParams: I,
                fragment: P,
                queryParamsHandling: Z,
                preserveFragment: Y,
              } = g,
              Be = Y ? this.currentUrlTree.fragment : P;
            let nn,
              pt = null;
            switch (Z) {
              case 'merge':
                pt = { ...this.currentUrlTree.queryParams, ...I };
                break;
              case 'preserve':
                pt = this.currentUrlTree.queryParams;
                break;
              default:
                pt = I || null;
            }
            null !== pt && (pt = this.removeEmptyProps(pt));
            try {
              nn = _n(E ? E.snapshot : this.routerState.snapshot.root);
            } catch {
              ('string' != typeof l[0] || !l[0].startsWith('/')) && (l = []),
                (nn = this.currentUrlTree.root);
            }
            return yr(nn, l, pt, Be ?? null);
          }
          navigateByUrl(l, g = { skipLocationChange: !1 }) {
            const E = At(l) ? l : this.parseUrl(l),
              I = this.urlHandlingStrategy.merge(E, this.rawUrlTree);
            return this.scheduleNavigation(I, Xn, null, g);
          }
          navigate(l, g = { skipLocationChange: !1 }) {
            return (
              (function Ys(c) {
                for (let p = 0; p < c.length; p++) if (null == c[p]) throw new m.vHH(4008, !1);
              })(l),
              this.navigateByUrl(this.createUrlTree(l, g), g)
            );
          }
          serializeUrl(l) {
            return this.urlSerializer.serialize(l);
          }
          parseUrl(l) {
            let g;
            try {
              g = this.urlSerializer.parse(l);
            } catch (E) {
              g = this.malformedUriErrorHandler(E, this.urlSerializer, l);
            }
            return g;
          }
          isActive(l, g) {
            let E;
            if (((E = !0 === g ? { ...Ha } : !1 === g ? { ...Ua } : g), At(l)))
              return Nn(this.currentUrlTree, l, E);
            const I = this.parseUrl(l);
            return Nn(this.currentUrlTree, I, E);
          }
          removeEmptyProps(l) {
            return Object.keys(l).reduce((g, E) => {
              const I = l[E];
              return null != I && (g[E] = I), g;
            }, {});
          }
          scheduleNavigation(l, g, E, I, P) {
            if (this.disposed) return Promise.resolve(!1);
            let Z, Y, Be;
            P
              ? ((Z = P.resolve), (Y = P.reject), (Be = P.promise))
              : (Be = new Promise((nn, Bt) => {
                  (Z = nn), (Y = Bt);
                }));
            const pt = this.pendingTasks.add();
            return (
              ts(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(pt));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: g,
                restoredState: E,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                currentBrowserUrl: this.browserUrlTree,
                rawUrl: l,
                extras: I,
                resolve: Z,
                reject: Y,
                promise: Be,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              Be.catch(nn => Promise.reject(nn))
            );
          }
          setBrowserUrl(l, g) {
            const E = this.urlSerializer.serialize(l);
            if (this.location.isCurrentPathEqualTo(E) || g.extras.replaceUrl) {
              const P = {
                ...g.extras.state,
                ...this.generateNgRouterState(g.id, this.browserPageId),
              };
              this.location.replaceState(E, '', P);
            } else {
              const I = {
                ...g.extras.state,
                ...this.generateNgRouterState(g.id, this.browserPageId + 1),
              };
              this.location.go(E, '', I);
            }
          }
          restoreHistory(l, g = !1) {
            if ('computed' === this.canceledNavigationResolution) {
              const I = this.currentPageId - this.browserPageId;
              0 !== I
                ? this.location.historyGo(I)
                : this.currentUrlTree === this.getCurrentNavigation()?.finalUrl &&
                  0 === I &&
                  (this.resetState(l),
                  (this.browserUrlTree = l.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              'replace' === this.canceledNavigationResolution &&
                (g && this.resetState(l), this.resetUrlToCurrentUrlTree());
          }
          resetState(l) {
            (this.routerState = l.currentRouterState),
              (this.currentUrlTree = l.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, l.rawUrl));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              '',
              this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
            );
          }
          generateNgRouterState(l, g) {
            return 'computed' === this.canceledNavigationResolution
              ? { navigationId: l, ɵrouterPageId: g }
              : { navigationId: l };
          }
          static #e = (this.ɵfac = function (g) {
            return new (g || c)();
          });
          static #t = (this.ɵprov = m.Yz7({ token: c, factory: c.ɵfac, providedIn: 'root' }));
        }
        return c;
      })();
      function Fo(c) {
        return !(c instanceof lo || c instanceof qi);
      }
      let zn = (() => {
          class c {
            constructor(l, g, E, I, P, Z) {
              (this.router = l),
                (this.route = g),
                (this.tabIndexAttribute = E),
                (this.renderer = I),
                (this.el = P),
                (this.locationStrategy = Z),
                (this.href = null),
                (this.commands = null),
                (this.onChanges = new yt.x()),
                (this.preserveFragment = !1),
                (this.skipLocationChange = !1),
                (this.replaceUrl = !1);
              const Y = P.nativeElement.tagName?.toLowerCase();
              (this.isAnchorElement = 'a' === Y || 'area' === Y),
                this.isAnchorElement
                  ? (this.subscription = l.events.subscribe(Be => {
                      Be instanceof Un && this.updateHref();
                    }))
                  : this.setTabIndexIfNotOnNativeEl('0');
            }
            setTabIndexIfNotOnNativeEl(l) {
              null != this.tabIndexAttribute ||
                this.isAnchorElement ||
                this.applyAttributeValue('tabindex', l);
            }
            ngOnChanges(l) {
              this.isAnchorElement && this.updateHref(), this.onChanges.next(this);
            }
            set routerLink(l) {
              null != l
                ? ((this.commands = Array.isArray(l) ? l : [l]),
                  this.setTabIndexIfNotOnNativeEl('0'))
                : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null));
            }
            onClick(l, g, E, I, P) {
              return (
                !!(
                  null === this.urlTree ||
                  (this.isAnchorElement &&
                    (0 !== l ||
                      g ||
                      E ||
                      I ||
                      P ||
                      ('string' == typeof this.target && '_self' != this.target)))
                ) ||
                (this.router.navigateByUrl(this.urlTree, {
                  skipLocationChange: this.skipLocationChange,
                  replaceUrl: this.replaceUrl,
                  state: this.state,
                }),
                !this.isAnchorElement)
              );
            }
            ngOnDestroy() {
              this.subscription?.unsubscribe();
            }
            updateHref() {
              this.href =
                null !== this.urlTree && this.locationStrategy
                  ? this.locationStrategy?.prepareExternalUrl(
                      this.router.serializeUrl(this.urlTree)
                    )
                  : null;
              const l =
                null === this.href
                  ? null
                  : (0, m.P3R)(this.href, this.el.nativeElement.tagName.toLowerCase(), 'href');
              this.applyAttributeValue('href', l);
            }
            applyAttributeValue(l, g) {
              const E = this.renderer,
                I = this.el.nativeElement;
              null !== g ? E.setAttribute(I, l, g) : E.removeAttribute(I, l);
            }
            get urlTree() {
              return null === this.commands
                ? null
                : this.router.createUrlTree(this.commands, {
                    relativeTo: void 0 !== this.relativeTo ? this.relativeTo : this.route,
                    queryParams: this.queryParams,
                    fragment: this.fragment,
                    queryParamsHandling: this.queryParamsHandling,
                    preserveFragment: this.preserveFragment,
                  });
            }
            static #e = (this.ɵfac = function (g) {
              return new (g || c)(
                m.Y36(Mt),
                m.Y36(sr),
                m.$8M('tabindex'),
                m.Y36(m.Qsj),
                m.Y36(m.SBq),
                m.Y36(ke.S$)
              );
            });
            static #t = (this.ɵdir = m.lG2({
              type: c,
              selectors: [['', 'routerLink', '']],
              hostVars: 1,
              hostBindings: function (g, E) {
                1 & g &&
                  m.NdJ('click', function (P) {
                    return E.onClick(P.button, P.ctrlKey, P.shiftKey, P.altKey, P.metaKey);
                  }),
                  2 & g && m.uIk('target', E.target);
              },
              inputs: {
                target: 'target',
                queryParams: 'queryParams',
                fragment: 'fragment',
                queryParamsHandling: 'queryParamsHandling',
                state: 'state',
                relativeTo: 'relativeTo',
                preserveFragment: ['preserveFragment', 'preserveFragment', m.VuI],
                skipLocationChange: ['skipLocationChange', 'skipLocationChange', m.VuI],
                replaceUrl: ['replaceUrl', 'replaceUrl', m.VuI],
                routerLink: 'routerLink',
              },
              standalone: !0,
              features: [m.Xq5, m.TTD],
            }));
          }
          return c;
        })(),
        $a = (() => {
          class c {
            get isActive() {
              return this._isActive;
            }
            constructor(l, g, E, I, P) {
              (this.router = l),
                (this.element = g),
                (this.renderer = E),
                (this.cdr = I),
                (this.link = P),
                (this.classes = []),
                (this._isActive = !1),
                (this.routerLinkActiveOptions = { exact: !1 }),
                (this.isActiveChange = new m.vpe()),
                (this.routerEventsSubscription = l.events.subscribe(Z => {
                  Z instanceof Un && this.update();
                }));
            }
            ngAfterContentInit() {
              (0, q.of)(this.links.changes, (0, q.of)(null))
                .pipe((0, Ue.J)())
                .subscribe(l => {
                  this.update(), this.subscribeToEachLinkOnChanges();
                });
            }
            subscribeToEachLinkOnChanges() {
              this.linkInputChangesSubscription?.unsubscribe();
              const l = [...this.links.toArray(), this.link].filter(g => !!g).map(g => g.onChanges);
              this.linkInputChangesSubscription = (0, Q.D)(l)
                .pipe((0, Ue.J)())
                .subscribe(g => {
                  this._isActive !== this.isLinkActive(this.router)(g) && this.update();
                });
            }
            set routerLinkActive(l) {
              const g = Array.isArray(l) ? l : l.split(' ');
              this.classes = g.filter(E => !!E);
            }
            ngOnChanges(l) {
              this.update();
            }
            ngOnDestroy() {
              this.routerEventsSubscription.unsubscribe(),
                this.linkInputChangesSubscription?.unsubscribe();
            }
            update() {
              !this.links ||
                !this.router.navigated ||
                queueMicrotask(() => {
                  const l = this.hasActiveLinks();
                  this._isActive !== l &&
                    ((this._isActive = l),
                    this.cdr.markForCheck(),
                    this.classes.forEach(g => {
                      l
                        ? this.renderer.addClass(this.element.nativeElement, g)
                        : this.renderer.removeClass(this.element.nativeElement, g);
                    }),
                    l && void 0 !== this.ariaCurrentWhenActive
                      ? this.renderer.setAttribute(
                          this.element.nativeElement,
                          'aria-current',
                          this.ariaCurrentWhenActive.toString()
                        )
                      : this.renderer.removeAttribute(this.element.nativeElement, 'aria-current'),
                    this.isActiveChange.emit(l));
                });
            }
            isLinkActive(l) {
              const g = (function Va(c) {
                return !!c.paths;
              })(this.routerLinkActiveOptions)
                ? this.routerLinkActiveOptions
                : this.routerLinkActiveOptions.exact || !1;
              return E => !!E.urlTree && l.isActive(E.urlTree, g);
            }
            hasActiveLinks() {
              const l = this.isLinkActive(this.router);
              return (this.link && l(this.link)) || this.links.some(l);
            }
            static #e = (this.ɵfac = function (g) {
              return new (g || c)(
                m.Y36(Mt),
                m.Y36(m.SBq),
                m.Y36(m.Qsj),
                m.Y36(m.sBO),
                m.Y36(zn, 8)
              );
            });
            static #t = (this.ɵdir = m.lG2({
              type: c,
              selectors: [['', 'routerLinkActive', '']],
              contentQueries: function (g, E, I) {
                if ((1 & g && m.Suo(I, zn, 5), 2 & g)) {
                  let P;
                  m.iGM((P = m.CRH())) && (E.links = P);
                }
              },
              inputs: {
                routerLinkActiveOptions: 'routerLinkActiveOptions',
                ariaCurrentWhenActive: 'ariaCurrentWhenActive',
                routerLinkActive: 'routerLinkActive',
              },
              outputs: { isActiveChange: 'isActiveChange' },
              exportAs: ['routerLinkActive'],
              standalone: !0,
              features: [m.TTD],
            }));
          }
          return c;
        })();
      class Ji {}
      let hu = (() => {
        class c {
          constructor(l, g, E, I, P) {
            (this.router = l),
              (this.injector = E),
              (this.preloadingStrategy = I),
              (this.loader = P);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                (0, An.h)(l => l instanceof Un),
                (0, ae.b)(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(l, g) {
            const E = [];
            for (const I of g) {
              I.providers &&
                !I._injector &&
                (I._injector = (0, m.MMx)(I.providers, l, `Route: ${I.path}`));
              const P = I._injector ?? l,
                Z = I._loadedInjector ?? P;
              ((I.loadChildren && !I._loadedRoutes && void 0 === I.canLoad) ||
                (I.loadComponent && !I._loadedComponent)) &&
                E.push(this.preloadConfig(P, I)),
                (I.children || I._loadedRoutes) &&
                  E.push(this.processRoutes(Z, I.children ?? I._loadedRoutes));
            }
            return (0, Q.D)(E).pipe((0, Ue.J)());
          }
          preloadConfig(l, g) {
            return this.preloadingStrategy.preload(g, () => {
              let E;
              E =
                g.loadChildren && void 0 === g.canLoad
                  ? this.loader.loadChildren(l, g)
                  : (0, q.of)(null);
              const I = E.pipe(
                (0, V.z)(P =>
                  null === P
                    ? (0, q.of)(void 0)
                    : ((g._loadedRoutes = P.routes),
                      (g._loadedInjector = P.injector),
                      this.processRoutes(P.injector ?? l, P.routes))
                )
              );
              if (g.loadComponent && !g._loadedComponent) {
                const P = this.loader.loadComponent(g);
                return (0, Q.D)([I, P]).pipe((0, Ue.J)());
              }
              return I;
            });
          }
          static #e = (this.ɵfac = function (g) {
            return new (g || c)(m.LFG(Mt), m.LFG(m.Sil), m.LFG(m.lqb), m.LFG(Ji), m.LFG(st));
          });
          static #t = (this.ɵprov = m.Yz7({ token: c, factory: c.ɵfac, providedIn: 'root' }));
        }
        return c;
      })();
      const qs = new m.OlP('');
      let wi = (() => {
        class c {
          constructor(l, g, E, I, P = {}) {
            (this.urlSerializer = l),
              (this.transitions = g),
              (this.viewportScroller = E),
              (this.zone = I),
              (this.options = P),
              (this.lastId = 0),
              (this.lastSource = 'imperative'),
              (this.restoredId = 0),
              (this.store = {}),
              (P.scrollPositionRestoration = P.scrollPositionRestoration || 'disabled'),
              (P.anchorScrolling = P.anchorScrolling || 'disabled');
          }
          init() {
            'disabled' !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration('manual'),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe(l => {
              l instanceof fi
                ? ((this.store[this.lastId] = this.viewportScroller.getScrollPosition()),
                  (this.lastSource = l.navigationTrigger),
                  (this.restoredId = l.restoredState ? l.restoredState.navigationId : 0))
                : l instanceof Un
                  ? ((this.lastId = l.id),
                    this.scheduleScrollEvent(
                      l,
                      this.urlSerializer.parse(l.urlAfterRedirects).fragment
                    ))
                  : l instanceof Vr &&
                    0 === l.code &&
                    ((this.lastSource = void 0),
                    (this.restoredId = 0),
                    this.scheduleScrollEvent(l, this.urlSerializer.parse(l.url).fragment));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe(l => {
              l instanceof Ri &&
                (l.position
                  ? 'top' === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : 'enabled' === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(l.position)
                  : l.anchor && 'enabled' === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(l.anchor)
                    : 'disabled' !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(l, g) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new Ri(
                      l,
                      'popstate' === this.lastSource ? this.store[this.restoredId] : null,
                      g
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
          static #e = (this.ɵfac = function (g) {
            m.$Z();
          });
          static #t = (this.ɵprov = m.Yz7({ token: c, factory: c.ɵfac }));
        }
        return c;
      })();
      function oi(c, p) {
        return { ɵkind: c, ɵproviders: p };
      }
      function Qs() {
        const c = (0, m.f3M)(m.zs3);
        return p => {
          const l = c.get(m.z2F);
          if (p !== l.components[0]) return;
          const g = c.get(Mt),
            E = c.get(mu);
          1 === c.get(Zs) && g.initialNavigation(),
            c.get(eo, null, m.XFs.Optional)?.setUpPreloading(),
            c.get(qs, null, m.XFs.Optional)?.init(),
            g.resetRootComponentType(l.componentTypes[0]),
            E.closed || (E.next(), E.complete(), E.unsubscribe());
        };
      }
      const mu = new m.OlP('', { factory: () => new yt.x() }),
        Zs = new m.OlP('', { providedIn: 'root', factory: () => 1 }),
        eo = new m.OlP('');
      function Eu(c) {
        return oi(0, [
          { provide: eo, useExisting: hu },
          { provide: Ji, useExisting: c },
        ]);
      }
      const xt = new m.OlP('ROUTER_FORROOT_GUARD'),
        Wa = [
          ke.Ye,
          { provide: ln, useClass: ir },
          Mt,
          Or,
          {
            provide: sr,
            useFactory: function za(c) {
              return c.routerState.root;
            },
            deps: [Mt],
          },
          st,
          [],
        ];
      function Ka() {
        return new m.PXZ('Router', Mt);
      }
      let Gn = (() => {
        class c {
          constructor(l) {}
          static forRoot(l, g) {
            return {
              ngModule: c,
              providers: [
                Wa,
                [],
                { provide: Rt, multi: !0, useValue: l },
                { provide: xt, useFactory: Xs, deps: [[Mt, new m.FiY(), new m.tp0()]] },
                { provide: Zr, useValue: g || {} },
                g?.useHash
                  ? { provide: ke.S$, useClass: ke.Do }
                  : { provide: ke.S$, useClass: ke.b0 },
                {
                  provide: qs,
                  useFactory: () => {
                    const c = (0, m.f3M)(ke.EM),
                      p = (0, m.f3M)(m.R0b),
                      l = (0, m.f3M)(Zr),
                      g = (0, m.f3M)(Zt),
                      E = (0, m.f3M)(ln);
                    return l.scrollOffset && c.setOffset(l.scrollOffset), new wi(E, g, c, p, l);
                  },
                },
                g?.preloadingStrategy ? Eu(g.preloadingStrategy).ɵproviders : [],
                { provide: m.PXZ, multi: !0, useFactory: Ka },
                g?.initialNavigation ? Js(g) : [],
                g?.bindToComponentInputs
                  ? oi(8, [Nt, { provide: xr, useExisting: Nt }]).ɵproviders
                  : [],
                [
                  { provide: qa, useFactory: Qs },
                  { provide: m.tb, multi: !0, useExisting: qa },
                ],
              ],
            };
          }
          static forChild(l) {
            return { ngModule: c, providers: [{ provide: Rt, multi: !0, useValue: l }] };
          }
          static #e = (this.ɵfac = function (g) {
            return new (g || c)(m.LFG(xt, 8));
          });
          static #t = (this.ɵmod = m.oAB({ type: c }));
          static #n = (this.ɵinj = m.cJS({}));
        }
        return c;
      })();
      function Xs(c) {
        return 'guarded';
      }
      function Js(c) {
        return [
          'disabled' === c.initialNavigation
            ? oi(3, [
                {
                  provide: m.ip1,
                  multi: !0,
                  useFactory: () => {
                    const p = (0, m.f3M)(Mt);
                    return () => {
                      p.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: Zs, useValue: 2 },
              ]).ɵproviders
            : [],
          'enabledBlocking' === c.initialNavigation
            ? oi(2, [
                { provide: Zs, useValue: 0 },
                {
                  provide: m.ip1,
                  multi: !0,
                  deps: [m.zs3],
                  useFactory: p => {
                    const l = p.get(ke.V_, Promise.resolve());
                    return () =>
                      l.then(
                        () =>
                          new Promise(g => {
                            const E = p.get(Mt),
                              I = p.get(mu);
                            ts(E, () => {
                              g(!0);
                            }),
                              (p.get(Zt).afterPreactivation = () => (
                                g(!0), I.closed ? (0, q.of)(void 0) : I
                              )),
                              E.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const qa = new m.OlP('');
    },
    8672: (We, fe, M) => {
      M.d(fe, { Ro: () => ve, ef: () => he, t2: () => tt });
      var m = M(4769),
        U = M(5619),
        B = M(8645),
        ie = M(2181),
        Q = M(9773),
        q = M(6825),
        pe = M(6814),
        Te = M(6593);
      const se = ['overlay'];
      function ye(Ie, we) {
        1 & Ie && m._UZ(0, 'div');
      }
      function te(Ie, we) {
        if ((1 & Ie && (m.TgZ(0, 'div'), m.YNc(1, ye, 1, 0, 'div', 6), m.qZA()), 2 & Ie)) {
          const X = m.oxw(2);
          m.Tol(X.spinner.class),
            m.Udp('color', X.spinner.color),
            m.xp6(1),
            m.Q6J('ngForOf', X.spinner.divArray);
        }
      }
      function Ce(Ie, we) {
        if ((1 & Ie && (m._UZ(0, 'div', 7), m.ALo(1, 'safeHtml')), 2 & Ie)) {
          const X = m.oxw(2);
          m.Q6J('innerHTML', m.lcZ(1, 1, X.template), m.oJD);
        }
      }
      function He(Ie, we) {
        if (
          (1 & Ie &&
            (m.TgZ(0, 'div', 1, 2),
            m.YNc(2, te, 2, 5, 'div', 3),
            m.YNc(3, Ce, 2, 3, 'div', 4),
            m.TgZ(4, 'div', 5),
            m.Hsn(5),
            m.qZA()()),
          2 & Ie)
        ) {
          const X = m.oxw();
          m.Udp('background-color', X.spinner.bdColor)('z-index', X.spinner.zIndex)(
            'position',
            X.spinner.fullScreen ? 'fixed' : 'absolute'
          ),
            m.Q6J('@.disabled', X.disableAnimation)('@fadeIn', 'in'),
            m.xp6(2),
            m.Q6J('ngIf', !X.template),
            m.xp6(1),
            m.Q6J('ngIf', X.template),
            m.xp6(1),
            m.Udp('z-index', X.spinner.zIndex);
        }
      }
      const Re = ['*'],
        $e = {
          'ball-8bits': 16,
          'ball-atom': 4,
          'ball-beat': 3,
          'ball-circus': 5,
          'ball-climbing-dot': 4,
          'ball-clip-rotate': 1,
          'ball-clip-rotate-multiple': 2,
          'ball-clip-rotate-pulse': 2,
          'ball-elastic-dots': 5,
          'ball-fall': 3,
          'ball-fussion': 4,
          'ball-grid-beat': 9,
          'ball-grid-pulse': 9,
          'ball-newton-cradle': 4,
          'ball-pulse': 3,
          'ball-pulse-rise': 5,
          'ball-pulse-sync': 3,
          'ball-rotate': 1,
          'ball-running-dots': 5,
          'ball-scale': 1,
          'ball-scale-multiple': 3,
          'ball-scale-pulse': 2,
          'ball-scale-ripple': 1,
          'ball-scale-ripple-multiple': 3,
          'ball-spin': 8,
          'ball-spin-clockwise': 8,
          'ball-spin-clockwise-fade': 8,
          'ball-spin-clockwise-fade-rotating': 8,
          'ball-spin-fade': 8,
          'ball-spin-fade-rotating': 8,
          'ball-spin-rotate': 2,
          'ball-square-clockwise-spin': 8,
          'ball-square-spin': 8,
          'ball-triangle-path': 3,
          'ball-zig-zag': 2,
          'ball-zig-zag-deflect': 2,
          cog: 1,
          'cube-transition': 2,
          fire: 3,
          'line-scale': 5,
          'line-scale-party': 5,
          'line-scale-pulse-out': 5,
          'line-scale-pulse-out-rapid': 5,
          'line-spin-clockwise-fade': 8,
          'line-spin-clockwise-fade-rotating': 8,
          'line-spin-fade': 8,
          'line-spin-fade-rotating': 8,
          pacman: 6,
          'square-jelly-box': 2,
          'square-loader': 1,
          'square-spin': 1,
          timer: 1,
          'triangle-skew-spin': 1,
        },
        Le = 'primary';
      class lt {
        constructor(we) {
          Object.assign(this, we);
        }
        static create(we) {
          return (
            !we?.template &&
              !we?.type &&
              console.warn(
                '[ngx-spinner]: Property "type" is missed. Please, provide animation type to <ngx-spinner> component\n        and ensure css is added to angular.json file'
              ),
            new lt(we)
          );
        }
      }
      let tt = (() => {
        class Ie {
          constructor() {
            this.spinnerObservable = new U.X(null);
          }
          getSpinner(X) {
            return this.spinnerObservable.asObservable().pipe((0, ie.h)(Se => Se && Se.name === X));
          }
          show(X = Le, Se) {
            return new Promise((ne, yt) => {
              setTimeout(() => {
                Se && Object.keys(Se).length
                  ? ((Se.name = X),
                    this.spinnerObservable.next(new lt({ ...Se, show: !0 })),
                    ne(!0))
                  : (this.spinnerObservable.next(new lt({ name: X, show: !0 })), ne(!0));
              }, 10);
            });
          }
          hide(X = Le, Se = 10) {
            return new Promise((ne, yt) => {
              setTimeout(() => {
                this.spinnerObservable.next(new lt({ name: X, show: !1 })), ne(!0);
              }, Se);
            });
          }
          static #e = (this.ɵfac = function (Se) {
            return new (Se || Ie)();
          });
          static #t = (this.ɵprov = m.Yz7({ token: Ie, factory: Ie.ɵfac, providedIn: 'root' }));
        }
        return Ie;
      })();
      const Ke = new m.OlP('NGX_SPINNER_CONFIG');
      let K = (() => {
          class Ie {
            constructor(X) {
              this._sanitizer = X;
            }
            transform(X) {
              if (X) return this._sanitizer.bypassSecurityTrustHtml(X);
            }
            static #e = (this.ɵfac = function (Se) {
              return new (Se || Ie)(m.Y36(Te.H7, 16));
            });
            static #t = (this.ɵpipe = m.Yjl({ name: 'safeHtml', type: Ie, pure: !0 }));
          }
          return Ie;
        })(),
        ve = (() => {
          class Ie {
            constructor(X, Se, ne, yt) {
              (this.spinnerService = X),
                (this.changeDetector = Se),
                (this.elementRef = ne),
                (this.globalConfig = yt),
                (this.disableAnimation = !1),
                (this.spinner = new lt()),
                (this.ngUnsubscribe = new B.x()),
                (this.setDefaultOptions = () => {
                  const { type: ke } = this.globalConfig ?? {};
                  this.spinner = lt.create({
                    name: this.name,
                    bdColor: this.bdColor,
                    size: this.size,
                    color: this.color,
                    type: this.type ?? ke,
                    fullScreen: this.fullScreen,
                    divArray: this.divArray,
                    divCount: this.divCount,
                    show: this.show,
                    zIndex: this.zIndex,
                    template: this.template,
                    showSpinner: this.showSpinner,
                  });
                }),
                (this.bdColor = 'rgba(51,51,51,0.8)'),
                (this.zIndex = 99999),
                (this.color = '#fff'),
                (this.size = 'large'),
                (this.fullScreen = !0),
                (this.name = Le),
                (this.template = null),
                (this.showSpinner = !1),
                (this.divArray = []),
                (this.divCount = 0),
                (this.show = !1);
            }
            initObservable() {
              this.spinnerService
                .getSpinner(this.name)
                .pipe((0, Q.R)(this.ngUnsubscribe))
                .subscribe(X => {
                  this.setDefaultOptions(),
                    Object.assign(this.spinner, X),
                    X.show && this.onInputChange(),
                    this.changeDetector.detectChanges();
                });
            }
            ngOnInit() {
              this.setDefaultOptions(), this.initObservable();
            }
            isSpinnerZone(X) {
              return (
                X === this.elementRef.nativeElement.parentElement ||
                (X.parentNode && this.isSpinnerZone(X.parentNode))
              );
            }
            ngOnChanges(X) {
              for (const Se in X)
                if (Se) {
                  const ne = X[Se];
                  if (ne.isFirstChange()) return;
                  typeof ne.currentValue < 'u' &&
                    ne.currentValue !== ne.previousValue &&
                    '' !== ne.currentValue &&
                    ((this.spinner[Se] = ne.currentValue),
                    'showSpinner' === Se &&
                      (ne.currentValue
                        ? this.spinnerService.show(this.spinner.name, this.spinner)
                        : this.spinnerService.hide(this.spinner.name)),
                    'name' === Se && this.initObservable());
                }
            }
            getClass(X, Se) {
              (this.spinner.divCount = $e[X]),
                (this.spinner.divArray = Array(this.spinner.divCount)
                  .fill(0)
                  .map((yt, ke) => ke));
              let ne = '';
              switch (Se.toLowerCase()) {
                case 'small':
                  ne = 'la-sm';
                  break;
                case 'medium':
                  ne = 'la-2x';
                  break;
                case 'large':
                  ne = 'la-3x';
              }
              return 'la-' + X + ' ' + ne;
            }
            onInputChange() {
              this.spinner.class = this.getClass(this.spinner.type, this.spinner.size);
            }
            ngOnDestroy() {
              this.ngUnsubscribe.next(), this.ngUnsubscribe.complete();
            }
            static #e = (this.ɵfac = function (Se) {
              return new (Se || Ie)(m.Y36(tt), m.Y36(m.sBO), m.Y36(m.SBq), m.Y36(Ke, 8));
            });
            static #t = (this.ɵcmp = m.Xpm({
              type: Ie,
              selectors: [['ngx-spinner']],
              viewQuery: function (Se, ne) {
                if ((1 & Se && m.Gf(se, 5), 2 & Se)) {
                  let yt;
                  m.iGM((yt = m.CRH())) && (ne.spinnerDOM = yt.first);
                }
              },
              inputs: {
                bdColor: 'bdColor',
                size: 'size',
                color: 'color',
                type: 'type',
                fullScreen: 'fullScreen',
                name: 'name',
                zIndex: 'zIndex',
                template: 'template',
                showSpinner: 'showSpinner',
                disableAnimation: 'disableAnimation',
              },
              features: [m.TTD],
              ngContentSelectors: Re,
              decls: 1,
              vars: 1,
              consts: [
                [
                  'class',
                  'ngx-spinner-overlay',
                  3,
                  'background-color',
                  'z-index',
                  'position',
                  4,
                  'ngIf',
                ],
                [1, 'ngx-spinner-overlay'],
                ['overlay', ''],
                [3, 'class', 'color', 4, 'ngIf'],
                [3, 'innerHTML', 4, 'ngIf'],
                [1, 'loading-text'],
                [4, 'ngFor', 'ngForOf'],
                [3, 'innerHTML'],
              ],
              template: function (Se, ne) {
                1 & Se && (m.F$t(), m.YNc(0, He, 6, 12, 'div', 0)),
                  2 & Se && m.Q6J('ngIf', ne.spinner.show);
              },
              dependencies: [pe.sg, pe.O5, K],
              styles: [
                '.ngx-spinner-overlay[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:100%;height:100%}.ngx-spinner-overlay[_ngcontent-%COMP%] > div[_ngcontent-%COMP%]:not(.loading-text){top:50%;left:50%;margin:0;position:absolute;transform:translate(-50%,-50%)}.loading-text[_ngcontent-%COMP%]{position:absolute;top:60%;left:50%;transform:translate(-50%,-60%)}',
              ],
              data: {
                animation: [
                  (0, q.X$)('fadeIn', [
                    (0, q.SB)('in', (0, q.oB)({ opacity: 1 })),
                    (0, q.eR)(':enter', [(0, q.oB)({ opacity: 0 }), (0, q.jt)(300)]),
                    (0, q.eR)(':leave', (0, q.jt)(200, (0, q.oB)({ opacity: 0 }))),
                  ]),
                ],
              },
              changeDetection: 0,
            }));
          }
          return Ie;
        })(),
        he = (() => {
          class Ie {
            static forRoot(X) {
              return { ngModule: Ie, providers: [{ provide: Ke, useValue: X }] };
            }
            static #e = (this.ɵfac = function (Se) {
              return new (Se || Ie)();
            });
            static #t = (this.ɵmod = m.oAB({ type: Ie }));
            static #n = (this.ɵinj = m.cJS({ imports: [pe.ez] }));
          }
          return Ie;
        })();
    },
    7582: (We, fe, M) => {
      function Ce(V, J, ae, re) {
        return new (ae || (ae = Promise))(function (be, nt) {
          function Tt(Ut) {
            try {
              rt(re.next(Ut));
            } catch (Xt) {
              nt(Xt);
            }
          }
          function hn(Ut) {
            try {
              rt(re.throw(Ut));
            } catch (Xt) {
              nt(Xt);
            }
          }
          function rt(Ut) {
            Ut.done
              ? be(Ut.value)
              : (function De(be) {
                  return be instanceof ae
                    ? be
                    : new ae(function (nt) {
                        nt(be);
                      });
                })(Ut.value).then(Tt, hn);
          }
          rt((re = re.apply(V, J || [])).next());
        });
      }
      function K(V) {
        return this instanceof K ? ((this.v = V), this) : new K(V);
      }
      function ve(V, J, ae) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
        var De,
          re = ae.apply(V, J || []),
          be = [];
        return (
          (De = {}),
          nt('next'),
          nt('throw'),
          nt('return'),
          (De[Symbol.asyncIterator] = function () {
            return this;
          }),
          De
        );
        function nt(vt) {
          re[vt] &&
            (De[vt] = function (Ft) {
              return new Promise(function (Ue, $t) {
                be.push([vt, Ft, Ue, $t]) > 1 || Tt(vt, Ft);
              });
            });
        }
        function Tt(vt, Ft) {
          try {
            !(function hn(vt) {
              vt.value instanceof K ? Promise.resolve(vt.value.v).then(rt, Ut) : Xt(be[0][2], vt);
            })(re[vt](Ft));
          } catch (Ue) {
            Xt(be[0][3], Ue);
          }
        }
        function rt(vt) {
          Tt('next', vt);
        }
        function Ut(vt) {
          Tt('throw', vt);
        }
        function Xt(vt, Ft) {
          vt(Ft), be.shift(), be.length && Tt(be[0][0], be[0][1]);
        }
      }
      function Ie(V) {
        if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
        var ae,
          J = V[Symbol.asyncIterator];
        return J
          ? J.call(V)
          : ((V = (function Et(V) {
              var J = 'function' == typeof Symbol && Symbol.iterator,
                ae = J && V[J],
                re = 0;
              if (ae) return ae.call(V);
              if (V && 'number' == typeof V.length)
                return {
                  next: function () {
                    return V && re >= V.length && (V = void 0), { value: V && V[re++], done: !V };
                  },
                };
              throw new TypeError(
                J ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
              );
            })(V)),
            (ae = {}),
            re('next'),
            re('throw'),
            re('return'),
            (ae[Symbol.asyncIterator] = function () {
              return this;
            }),
            ae);
        function re(be) {
          ae[be] =
            V[be] &&
            function (nt) {
              return new Promise(function (Tt, hn) {
                !(function De(be, nt, Tt, hn) {
                  Promise.resolve(hn).then(function (rt) {
                    be({ value: rt, done: Tt });
                  }, nt);
                })(Tt, hn, (nt = V[be](nt)).done, nt.value);
              });
            };
        }
      }
      M.d(fe, { FC: () => ve, KL: () => Ie, mG: () => Ce, qq: () => K }),
        'function' == typeof SuppressedError && SuppressedError;
    },
  },
  We => {
    We((We.s = 6842));
  },
]);
