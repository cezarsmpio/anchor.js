/*!
 * anchor.js v1.0.1
 * https://github.com/CezarLuiz0/anchor
 *
 * Licensed MIT © Cezar Luiz
 */
(function(window, document) {

  // requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
  var requestAnimFrame = (function(){
    return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
  })();

  var deepExtend = function(out) {
    out = out || {};

    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];

      if (!obj)
        continue;

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            out[key] = deepExtend(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }

    return out;
  };

  var Anchor = function(options) {
    var self = this;

    var defaults = {
      easings: {
        easeInOutQuad: function (t, b, c, d) {
          t /= d/2;
          if (t < 1) {
            return c/2*t*t + b;
          }
          t--;
          return -c/2 * (t*(t-2) - 1) + b;
        },

        easeInCubic: function(t, b, c, d) {
          var tc = (t/=d)*t*t;
          return b+c*(tc);
        },

        inOutQuintic: function(t, b, c, d) {
          var ts = (t/=d)*t,
          tc = ts*t;
          return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
        }
      }
    };

    this.anchors = document.querySelectorAll('[data-anchor]');

    this.opts = deepExtend({}, defaults, options);

    // Exports
    return {
      init: function() {
        self.bindAnchors();
      }
    };
  };

  Anchor.prototype = {
    bindAnchors: function() {
      var self = this;

      [].slice.call(self.anchors).forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();

          var target = document.querySelector(this.getAttribute('data-anchor'));
          var offset = this.getAttribute('data-anchor-offset') || 0;
          var duration = this.getAttribute('data-anchor-duration') || 800;
          var callback = this.getAttribute('data-anchor-callback');
          var easing = this.getAttribute('data-anchor-easing') || 'easeInOutQuad';

          self.scrollTo(
            target.offsetTop - parseInt(offset),
            self.executeFunctionByName.bind(this, callback),
            duration,
            self.opts.easings[easing]
          );
        });
      });
    },

    executeFunctionByName: function(functionName) {
      if (!!functionName) {
        // find object
        var fn = window[functionName];

        // is object a function?
        if (typeof fn === "function") fn.apply(null);
      }
    },

    position: function() {
      return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
    },

    move: function(amount) {
      document.documentElement.scrollTop = amount;
      document.body.parentNode.scrollTop = amount;
      document.body.scrollTop = amount;
    },

    scrollTo: function(to, callback, duration, easing) {
      var self = this;

      var start = self.position();
      var change = to - start;
      var currentTime = 0;
      var increment = 20;
      var duration = (typeof(duration) === 'undefined') ? 500 : duration;

      var animateScroll = function() {
        // increment the time
        currentTime += increment;
        // find the value with the quadratic in-out easing function
        var val = easing(currentTime, start, change, duration);
        // move the document.body
        self.move(val);
        // do the animation unless its over
        if (currentTime < duration) {
          requestAnimFrame(animateScroll);
        } else {
          if (callback && typeof(callback) === 'function') {
            // the animation is done so lets callback
            callback();
          }
        }
      };

      animateScroll();
    }
  };

  window.Anchor = Anchor;

})(window, document);