class Bubbles {
  constructor(canvas, {color="black", size=3, velocity=2} = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.bubbleSet = new Set()

    this._color = color
    this._size = size
    this._velocity = velocity
    
    console.log("shit's working")
  }

  color(c) {
    this._color = c
    return this
  }

  size(s) {
    this._size = s
    return this
  }

  velocity(v) {
    this._velocity = v
    return this
  }

  run() {
    console.log("running ;3")
  }
}

export default Bubbles