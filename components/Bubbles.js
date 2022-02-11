import "./Bubble.js"
import Bubble from "./Bubble.js"

const isInRange = (min, max) => (n) => (n >= min) && (n <= max)
const isInBound = (inRangeX, inRangeY) => ({x, y}) => inRangeX(x) && inRangeY(y)
const isInRect = (x, y, width, height) => (
  isInBound(isInRange(x, x + width), isInRange(y, y + height))
)

const randInRange = (min, max) => Math.floor(Math.random() * (max - min)) + min

class Bubbles {
  constructor(canvas, {color="black", size=3, velocity=2} = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.bubbleSet = new Set()

    this._color = color
    this._size = size
    this._velocity = velocity

    this._spawnBubbleTimeout = null
    this._isInScreen = isInRect(0, 0, this.canvas.width, this.canvas.height)
    this._end = true
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
      if (!this._isInScreen(bubble._coord)) {
        this.bubbleSet.delete(bubble)
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (let bubble of this.bubbleSet) {
      bubble.draw({ctx: this.ctx})
    }
  }

  genRandomCoord() {
    return {
      x: randInRange(10, this.canvas.width - 10),
      y: this.canvas.height,
    }
  }

  startSpawningBubbles() {
    this._spawnBubbleTimeout = setTimeout((function spawnBubble() {
      this.bubbleSet.add(new Bubble({
        color: this._color,
        coord: this.genRandomCoord(),
        velocity: this._velocity,
        size: this._size
      }))
      this._spawnBubbleTimeout = setTimeout(spawnBubble.bind(this), 3000)
    }).bind(this), 3000)
  }

  end() {
    this._end = true
  }

  run() {
    this._end = false
    this.startSpawningBubbles()
    const frame = (timestamp) => {
      !this._end && requestAnimationFrame(frame)

      this.update(timestamp)
      this.draw()
    }

    requestAnimationFrame(frame)
  }
}

export default Bubbles