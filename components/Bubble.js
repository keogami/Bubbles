class Bubble {
  constructor({
    color = "black",
    coord = {x: 50, y: 50},
    velocity = .125,
    size = 4,
    sway = 0.05,
  } = {}) {
    this._color = color
    this._coord = coord
    this._velocity = velocity
    this._size = size
    this._sway = sway
  }

  update({timestamp, displacement}) {
    this._coord.y -= this._velocity

    this._coord.x += (displacement.x * this._sway)
    this._coord.y += (displacement.y * this._sway)
  }

  draw({ctx}) {
    ctx.beginPath()

    ctx.fillstyle = this._color
    ctx.arc(this._coord.x, this._coord.y, this._size, 0, 2 * Math.PI)
    ctx.fill()

    ctx.closePath()
  }
}

export default Bubble