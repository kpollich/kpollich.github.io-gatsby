_N_E = (window.webpackJsonp_N_E = window.webpackJsonp_N_E || []).push([
  [11],
  {
    '1GPU': function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, '__N_SSG', function () {
          return P;
        });
      var r = n('nKUr'),
        i = n('q1tI'),
        o = n.n(i),
        a = n('vOnD'),
        s = n('/Tr7'),
        c = n('jIYg');
      var l = n('sWYD'),
        d = n('YFqc'),
        u = n.n(d),
        b = n('Aiso'),
        j = n.n(b),
        h = n('+ego'),
        f = n('oIEm'),
        g = n('17x9'),
        p = n.n(g);
      function O() {
        return (O =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          }).apply(this, arguments);
      }
      function x(e, t) {
        if (null == e) return {};
        var n,
          r,
          i = (function (e, t) {
            if (null == e) return {};
            var n,
              r,
              i = {},
              o = Object.keys(e);
            for (r = 0; r < o.length; r++)
              (n = o[r]), t.indexOf(n) >= 0 || (i[n] = e[n]);
            return i;
          })(e, t);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          for (r = 0; r < o.length; r++)
            (n = o[r]),
              t.indexOf(n) >= 0 ||
                (Object.prototype.propertyIsEnumerable.call(e, n) &&
                  (i[n] = e[n]));
        }
        return i;
      }
      var m = Object(i.forwardRef)(function (e, t) {
        var n = e.color,
          r = void 0 === n ? 'currentColor' : n,
          i = e.size,
          a = void 0 === i ? 24 : i,
          s = x(e, ['color', 'size']);
        return o.a.createElement(
          'svg',
          O(
            {
              ref: t,
              xmlns: 'http://www.w3.org/2000/svg',
              width: a,
              height: a,
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: r,
              strokeWidth: '2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            },
            s
          ),
          o.a.createElement('line', { x1: '5', y1: '12', x2: '19', y2: '12' }),
          o.a.createElement('polyline', { points: '12 5 19 12 12 19' })
        );
      });
      (m.propTypes = {
        color: p.a.string,
        size: p.a.oneOfType([p.a.string, p.a.number]),
      }),
        (m.displayName = 'ArrowRight');
      var w = m,
        y = n('ZMKu'),
        v = n('UYbT'),
        _ = a.d.section.withConfig({
          displayName: 'blog__Wrapper',
          componentId: 'sc-16gdxf5-0',
        })([
          'display:flex;flex-direction:column;align-items:center;max-width:800px;margin:auto;',
        ]),
        M = a.d.ul.withConfig({
          displayName: 'blog__BlogPostList',
          componentId: 'sc-16gdxf5-1',
        })([
          'list-style:none;padding:0;li{margin-bottom:6em;:last-child{margin-bottom:0;}a{text-decoration:none;}}',
        ]),
        P = !0;
      t.default = function (e) {
        var t = e.posts;
        return Object(r.jsxs)(h.a, {
          children: [
            Object(r.jsx)(v.a, {
              title: 'Blog',
              description:
                'Where I blog about web technologies and software engineering culture.',
            }),
            Object(r.jsx)(f.a, {
              children: Object(r.jsxs)(_, {
                children: [
                  Object(r.jsx)(y.b.h1, {
                    variants: f.b,
                    children: 'Blog Posts',
                  }),
                  Object(r.jsx)(M, {
                    children: t
                      .sort(function (e, t) {
                        return (function (e, t) {
                          Object(c.a)(2, arguments);
                          var n = Object(s.a)(e),
                            r = Object(s.a)(t),
                            i = n.getTime() - r.getTime();
                          return i > 0 ? -1 : i < 0 ? 1 : i;
                        })(
                          new Date(e.frontMatter.datePublished),
                          new Date(t.frontMatter.datePublished)
                        );
                      })
                      .map(function (e) {
                        var t;
                        return Object(r.jsxs)(
                          y.b.li,
                          {
                            variants: f.b,
                            children: [
                              Object(r.jsx)(u.a, {
                                href: '/posts/'.concat(e.slug),
                                children: Object(r.jsx)('a', {
                                  children: Object(r.jsx)(j.a, {
                                    src:
                                      null !== (t = e.frontMatter.image) &&
                                      void 0 !== t
                                        ? t
                                        : '',
                                    alt: e.frontMatter.imageAlt,
                                    width: 800,
                                    height: 450,
                                  }),
                                }),
                              }),
                              Object(r.jsx)('h3', {
                                children: Object(r.jsx)(u.a, {
                                  href: '/posts/'.concat(e.slug),
                                  children: Object(r.jsx)('a', {
                                    children: e.frontMatter.title,
                                  }),
                                }),
                              }),
                              Object(r.jsx)('time', {
                                children: Object(l.a)(
                                  new Date(e.frontMatter.datePublished),
                                  'MMMM do, yyyy'
                                ),
                              }),
                              Object(r.jsx)('p', {
                                children: e.frontMatter.subtitle,
                              }),
                              Object(r.jsx)('div', {
                                children: Object(r.jsx)(u.a, {
                                  href: '/posts/'.concat(e.slug),
                                  children: Object(r.jsxs)('a', {
                                    style: {
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      textDecoration: 'underline',
                                    },
                                    children: [
                                      Object(r.jsx)('span', {
                                        style: { marginRight: '0.5rem' },
                                        children: 'Read',
                                      }),
                                      ' ',
                                      Object(r.jsx)(w, { size: 20 }),
                                    ],
                                  }),
                                }),
                              }),
                            ],
                          },
                          e.slug
                        );
                      }),
                  }),
                ],
              }),
            }),
          ],
        });
      };
    },
    vHou: function (e, t, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        '/blog',
        function () {
          return n('1GPU');
        },
      ]);
    },
  },
  [['vHou', 0, 2, 4, 1, 3, 5, 6]],
]);
