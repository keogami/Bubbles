class Mouse {
  constructor() {
    this.coord = {x: 0, y: 0}
  }

  connect(element) {
    element.addEventListener("mousemove", (ev) => {
      this.coord.x = ev.clientX
      this.coord.y = ev.clientY
    })
  }
}

export default Mouse