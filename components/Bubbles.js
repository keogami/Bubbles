import "./Bubble.js"
import Bubble from "./Bubble.js"

class Bubbles {
  constructor(canvas, {color="black", size=3, velocity=2} = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.bubbleSet = new Set()

    this._color = color
    this._size = size
    this._velocity = velocity

    this._spawnBubbleTimeout = null
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

  update(timestamp) {
    for (let bubble of this.bubbleSet) {
      bubble.update(timestamp)
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (let bubble of this.bubbleSet) {
      bubble.draw({ctx: this.ctx})
    }
  }

  run() {
    this.bubbleSet.add(new Bubble({
      color: this._color,
      coord: {x: this.canvas.width/2, y: this.canvas.height/2},
      velocity: this._velocity,
      size: this._size
    }))
    const frame = (timestamp) => {
      requestAnimationFrame(frame)

      this.update(timestamp)
      this.draw()
    }

    requestAnimationFrame(frame)
  }
}

export default Bubbles