import "./Bubble.js"
import Bubble from "./Bubble.js"
import Mouse from "./Mouse.js"

const isInRange = (min, max) => (n) => (n >= min) && (n <= max)
const isInBound = (inRangeX, inRangeY) => ({x, y}) => inRangeX(x) && inRangeY(y)
const isInRect = (x, y, width, height) => (
  isInBound(isInRange(x, x + width), isInRange(y, y + height))
)

const randInRange = (min, max) => Math.floor(Math.random() * (max - min)) + min
const randInArray = (arr) => arr[randInRange(0, arr.length)]

class Bubbles {
  constructor(canvas, variants = []) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.bubbleSet = new Set()
    this.mouse = new Mouse()
    this.mouse.connect(canvas)

    this._variants = variants

    this._spawnBubbleTimeout = null
    this._isInScreen = isInRect(0, 0, this.canvas.width, this.canvas.height)
    this._end = true
    this._lastMousePos = null
  }

  getMouseDisplacement() {
    if (!this._lastMousePos) {
      this._lastMousePos = {
        x: this.mouse.coord.x, y: this.mouse.coord.y
      }
      return {x: 0, y: 0}
    }

    const displacement = {
      x: this.mouse.coord.x - this._lastMousePos.x,
      y: this.mouse.coord.y - this._lastMousePos.y,
    }

    this._lastMousePos = {
      x: this.mouse.coord.x, y: this.mouse.coord.y
    }

    return displacement
  }

  update(data) {
    for (let bubble of this.bubbleSet) {
      bubble.update(data)
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
        ...randInArray(this._variants),
        coord: this.genRandomCoord(),
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
      const displacement = this.getMouseDisplacement()

      this.update({timestamp, displacement})
      this.draw()
    }

    requestAnimationFrame(frame)
  }
}

export default Bubbles