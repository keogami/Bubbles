import Bubbles from "./components/Bubbles.js"

const $ = document

const canvas = $.querySelector("canvas#bubbles")

canvas.width = innerWidth
canvas.heght = innerHeight

new Bubbles(canvas)
  .color("black")
  .size(4)
  .velocity(2)
  .run()