import Bubbles from "./components/Bubbles.js"

const $ = document

const canvas = $.querySelector("canvas#bubbles")

canvas.width = innerWidth
canvas.height = innerHeight

new Bubbles(canvas, [
  {
    color: "black", size: 4, velocity: 0.325,
  }
]).run()