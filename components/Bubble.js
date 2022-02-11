class Bubble {
  constructor({
    color = "black",
    coord = {x: 50, y: 50},
    velocity = .125,
    size = 4,
  } = {}) {
    this._color = color
    this._coord = coord
    this._velocity = velocity
    this._size = size
  }

  update(timestamp) {
    this._coord.y -= this._velocity
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