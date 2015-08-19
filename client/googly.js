var accel = new ReactiveVar({});

Template.toucher.onCreated(function () {
  this.touches = new ReactiveVar([]);
});

Template.toucher.events({
  'touchstart .toucher': function (evt, tpl) {
    tpl.touches.set(evt.originalEvent.touches);
    evt.preventDefault();
    return false;
  }
});

Template.toucher.helpers({
  touches: function () {
    var acc = accel.get();
    var vector = acc.ax / acc.ay;

    var touches = [];
    var touchlist = Template.instance().touches.get();
    for (var t in touchlist) {
      var touch = touchlist[t];
      if (touch.pageX) {
        touches.push({
          x: touch.pageX - 100,
          y: touch.pageY - 100,
          gx: touch.pageX - 50 + acc.ax * 5,
          gy: touch.pageY - 50 - acc.ay * 5
        });
      }
    }

    return touches;
  }
});

var accelerationThrottle = _.throttle(function (ax, ay) {
  accel.set({
    ax: ax,
    ay: ay
  });
}, 10);

window.ondevicemotion = function (evt) {
  accelerationThrottle(evt.accelerationIncludingGravity.x, evt.accelerationIncludingGravity.y);
}
