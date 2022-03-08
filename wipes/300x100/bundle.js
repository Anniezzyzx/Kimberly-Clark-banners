(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
    !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  getBrowser();
  function es5() {
    return parseInt('010', 10) === 10 && function () {
      return !this;
    }() && !!(Date && Date.prototype && Date.prototype.toISOString); // IE10, FF21, CH23, SF6, OP15, iOS7, AN4.4
  }
  ({
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  });
  function domIds(scope) {
    if (scope === void 0) {
      scope = document;
    }

    var all = scope.getElementsByTagName('*');
    var haveIds = {};
    var i = all.length;

    while (i--) {
      if (all[i].id) {
        var safeId = all[i].id.replace(/-|:|\./g, '_');
        haveIds[safeId] = all[i];
      }
    }

    return haveIds;
  }

  var Banner = {
    init: function init() {
      display();

      function display() {
        // Setup -------------------------------------------------
        var dom = domIds();
        clickThrough();
        es5() ? animation() : dom.backup.classList.add('backup'); // Animations --------------------------------------------

        function animation() {
          var tl = gsap.timeline({
            defaults: {
              ease: 'sine.inOut'
            },
            onComplete: rollover
          });
          tl.to('#txt-1,#logo,#wipe-1', 1.5, {
            x: -300,
            ease: "expo.inOut"
          }, '+=1.5').staggerFrom(['#txt-2', '#txt-3'], 1.5, {
            x: 300,
            ease: "expo.inOut"
          }, .05, '-=1.5').from('#legal', .3, {
            autoAlpha: 0
          }, '-=.8').from('#wipe-2', 2.3, {
            x: -420,
            ease: "sine.inOut"
          }).from('#txt-4', .4, {
            autoAlpha: 0
          }, '-=1').to('#txt-3', .2, {
            autoAlpha: 0
          }, '-=0.4').staggerTo(['#txt-2,#txt-3,#txt-4'], 1.5, {
            x: -300,
            ease: "expo.inOut"
          }, .05, '+=1').to('#legal', .2, {
            autoAlpha: 0
          }, '-=1').staggerFrom(['#txt-5', '#txt-6'], 1.5, {
            x: 300,
            ease: "expo.inOut"
          }, .05, '-=1.5').from('#pack-1', .4, {
            y: -200
          }, '-=.9').to(['#pack-1,#txt-5,#txt-6'], .3, {
            autoAlpha: 0
          }, '+=2').to('#logo', .1, {
            y: -45
          }, '-=1').to('#logo', 2, {
            scale: 0.78,
            x: -74,
            y: -2,
            ease: "expo.inOut"
          }, '-=1').from('#txt-9', 2, {
            x: 300,
            ease: "expo.inOut"
          }, '-=1.9').from('#cta', .4, {
            autoAlpha: 0
          });
          dom.ad_content.classList.remove('invisible');
        } // Events ------------------------------------------------


        function rollover() {
          dom.ad_content.addEventListener('mouseenter', function () {
            gsap.to("#cta-bg", 0.2, {
              background: "#ACDF55"
            });
          });
          dom.ad_content.addEventListener('mouseleave', function () {
            gsap.to("#cta-bg", 0.2, {
              background: "#001f53"
            });
          });
        }

        function clickThrough() {
          dom.ad_content.addEventListener('click', function () {
            return window.open(window.clickTag || window.clickTAG);
          });
        }
      }
    }
  };

  window.onload = function () {
    return window.requestAnimationFrame(Banner.init);
  };

}());
