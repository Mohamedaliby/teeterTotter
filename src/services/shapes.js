const Shapes = {
  rect(context, color, x, y, width, height) {
    context.fillStyle = color
    context.fillRect(x, y, width, height)
  },

  triangle(context, color, ax, ay, bx, by, cx, cy) {
    context.beginPath();
    context.fillStyle = color;
    context.moveTo(ax, ay); // pick up "pen," reposition at 500 (horiz), 0 (vert)
    context.lineTo(bx, by); // draw straight down by 200px (200 + 200)
    context.lineTo(cx, cy); // draw up toward left (100 less than 300, so left)
    context.closePath(); // connect end to start
    context.fill(); // outline the shape that's been described
  },

  circle() {

  }
}
export default Shapes
