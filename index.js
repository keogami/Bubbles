import Bubbles from "./components/Bubbles.js"

const $ = document

const canvas = $.querySelector("canvas#bubbles")

canvas.width = innerWidth
canvas.height = innerHeight

new Bubbles(canvas, [
  { color: "black", size: 5, velocity: 0.550, sway: 0.04 }, // lighter
  { color: "black", size: 4, velocity: 0.325, sway: 0.02 }, // normal
  { color: "black", size: 3, velocity: 0.225, sway: 0.01 }, // heavier
]).run()