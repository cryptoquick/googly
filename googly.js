var toucher = document.getElementById('toucher')
var touchEvents = {}
var ax = 1
var ay = 1

function touching() {
  var vector = ax / ay
  var touches = []

  for (var t in touchEvents) {
    var touch = touchEvents[t]
    if (touch.pageX) {
      touches.push({
        x: touch.pageX - 100,
        y: touch.pageY - 100,
        gx: touch.pageX - 50 + ax * 5,
        gy: touch.pageY - 50 - ay * 5,
      })
    }
  }

  var touchElements = []

  for (var i = 0; i < touches.length; i++) {
    var t = touches[i]
    touchElements.push(
      '<div class="pip" style="left: ' + t.x + 'px; top: ' + t.y + 'px;"></div>'
    )
    touchElements.push(
      '<div class="eye" style="left: ' +
        t.gx +
        'px; top: ' +
        t.gy +
        'px;"></div>'
    )
  }

  toucher.innerHTML = touchElements.join('\n')
}

toucher.ontouchstart = function(evt) {
  touchEvents = evt.touches
  evt.preventDefault()
  return false
}

toucher.onmousedown = function(evt) {
  touchEvents = [{pageX: evt.pageX, pageY: evt.pageY}]
  touching()
  evt.preventDefault()
  return false
}

window.ondevicemotion = function(evt) {
  ax = evt.accelerationIncludingGravity.x || 1
  ay = evt.accelerationIncludingGravity.y || 1
  touching()
}
