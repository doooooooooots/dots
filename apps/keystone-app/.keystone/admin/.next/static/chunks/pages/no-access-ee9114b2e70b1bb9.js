(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [568],
  {
    2869: function (n, t, e) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        '/no-access',
        function () {
          return e(7057);
        },
      ]);
    },
    7057: function (n, t, e) {
      'use strict';
      e.r(t),
        e.d(t, {
          default: function () {
            return c;
          },
        });
      var s = e(1053),
        u = e(2316),
        a = e(9690),
        l = e(7626);
      e(6970), e(1902);
      const i = (n) => {
        let { sessionsEnabled: t } = n;
        return (0, s.tZ)(
          l.a,
          null,
          (0, s.tZ)(
            s.Kq,
            { align: 'center', gap: 'medium' },
            (0, s.tZ)(u.l, { size: 'large' }),
            (0, s.tZ)('div', null, "You don't have access to this page."),
            t ? (0, s.tZ)(a.S, null) : null
          )
        );
      };
      var r,
        c = ((r = { sessionsEnabled: !0 }), () => (0, s.tZ)(i, r));
    },
  },
  function (n) {
    n.O(0, [888, 774, 179], function () {
      return (t = 2869), n((n.s = t));
      var t;
    });
    var t = n.O();
    _N_E = t;
  },
]);
