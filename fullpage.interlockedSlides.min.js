/*!
 * fullpage.js Interlocked Slides Extension 0.0.7 for fullPage.js v3
 * https://github.com/alvarotrigo/fullPage.js
 *
 * @license This code has been bought from www.alvarotrigo.com/fullPage/ and it is not free to use or distribute.
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
/* eslint-disable */

/*!
 * fullpage.js Interlocked Slides Extension 0.0.7 for fullPage.js v3
 * https://github.com/alvarotrigo/fullPage.js
 *
 * @license This code has been bought from www.alvarotrigo.com/fullPage/ and it is not free to use or distribute.
 * Copyright (C) 2016 alvarotrigo.com - A project by Alvaro Trigo
 */
/* eslint-disable */

window.fp_interlockedSlidesExtension = function() {
  var e = this,
    g = window.fp_utils,
    v = window.fullpage_api,
    x = g.$,
    i = v.getFullpageData(),
    y = i.options,
    w = i.internals,
    S = "active",
    h = "." + S,
    I = ".fp-section",
    k = ".fp-slide",
    m = ".fp-slides",
    z = ".fp-slidesNav",
    E = ".fp-bg",
    b = g.addClass,
    A = g.removeClass;
  (e.apply = function(r) {
    r.slides;
    var c = r.destiny,
      f = (r.direction, r.localIsResizing),
      p = (r.destinyPos, r.slideIndex),
      u = (r.section, r.sectionIndex);
    e.getInterlockedSlides().forEach(function(e, i) {
      if (e !== u + 1) {
        var n = x(I)[e - 1];
        if (
          ((r.section = n),
          (r.sectionIndex = g.index(n, I)),
          p + 1 <= x(k, n).length)
        ) {
          var t = x(z, n)[0];
          if (!x(m, n)[0]) return;
          w.performHorizontalMove(x(m, n)[0], r, !1);
          var o = x(E, x(".fp-slide.active", n)[0]),
            l = o.length ? o[0].getAttribute("data-final-y") : 0,
            a = x(k, n)[p],
            d = g.siblings(a);
          if (
            (b(a, S),
            A(d, S),
            w.usingExtension("parallax") &&
              (d.forEach(function(e) {
                v.parallax.applyProperties(e, 0, "silent");
              }),
              x(E, a)[0].setAttribute("data-final-y", l),
              y.continuousHorizontal &&
              void 0 !== r.direction &&
              r.direction != r.xMovement
                ? ((r.destiny = a),
                  (r.destinyPos = { left: a.offsetLeft }),
                  (r.slideIndex = g.index(r.destiny)),
                  (r.prevSlideIndex = g.index(r.prevSlide)),
                  g.trigger(
                    x(".fullpage-wrapper")[0],
                    "onContinuosHorizontal",
                    r
                  ))
                : v.parallax.applyHorizontal(r)),
            f || w.lazyLoad(c),
            w.toggleControlArrows(r),
            y.slidesNavigation)
          ) {
            A(x(h, t), S);
            var s = x("li", t)[p];
            b(x("a", s), S);
          }
        }
      }
    });
  }),
    (e.getInterlockedSlides = function() {
      var i = [];
      return "boolean" == typeof y.interlockedSlides
        ? (x(I).forEach(function(e) {
            x(k, e).length && i.push(g.index(e, I) + 1);
          }),
          i)
        : y.interlockedSlides;
    }),
    (e.c = w.c);
  var n = e["common".charAt(0)];
  return (
    "complete" === document.readyState && n("interlockedSlides"),
    window.addEventListener("load", function() {
      n("interlockedSlides");
    }),
    e
  );
};
