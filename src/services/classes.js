export class Rect {
  constructor(context, color, x, y, width, height) {
    this.x = x
    this.y = y
    this.height = height
    this.width = width
    this.color = color
    context.fillStyle = this.color
    context.fillRect(x, y, this.width, this.height)

  }
//    get x() {
//       return this._x;
//     };

//     set x(value) {
//       this._x = value;
//     }
}

export class Triangle {
  constructor(context, color, ax, ay, bx, by, cx, cy) {
    this.color = color
    this.ax = ax
    this.ay = ay
    this.bx = bx
    this.by = by
    this.cx = cx
    this.cy = cy
    context.beginPath();
    context.fillStyle = this.color;
    context.moveTo(this.ax, this.ay); // pick up "pen," reposition at 500 (horiz), 0 (vert)
    context.lineTo(this.bx, this.by); // draw straight down by 200px (200 + 200)
    context.lineTo(this.cx, this.cy); // draw up toward left (100 less than 300, so left)
    context.closePath(); // connect end to start
    context.fill(); // outline the shape that's been described
  }

  get color() {
    return this._color;
  };

  set color(value) {
    this._color = value;
  }

  changeColor(color) {
    this.color = color
  }

}


export class Circle {
  constructor(context, color) {
    this.color = color

  }
}

export class Bar {
  constructor(context, color, x, y, w, h, deg) {
    this.x = x
    this.y = y
    this.h = h
    this.w = w
    this.color = color
    this.deg = 0
    this.dir = 1


  }
  draw(context) {
    //  context.save()
    //  context.translate(this.x, this.y)
    //  context.rotate(Math.PI / 180 * this.deg)
    //  context.fillStyle = this.color
    //  for(var i=0;i<2;i++) {
    //     context.save()
    //     context.scale((i*2-1),1)
    //     context.fillRect(0,-this.hight,this.width,this.height)
    //     context.restore()
    // }
    // //  context.fillRect(this.x, this.y, this.width, this.height)
    //  context.restore()
    context.save();
    context.translate(this.x, this.y);
    // context.clearRect(0, 0, 1000, 600);
    context.rotate(Math.PI / (180.0 / this.deg));
    for (var i = 0; i < 2; i++) {
      context.save()
      context.scale((i * 2 - 1), 1)
      context.fillRect(0, this.h, this.w, this.h)
      // this.context.restore()
    }
    // this.context.fillRect(
    //   this.teater.x,
    //   this.teater.y,
    //   this.teater.w,
    //   this.teater.h
    // );
    // this.context.restore();

  }
  update() {
    this.deg += this.dir * 6
    if (this.deg <= -30) {
      this.dir = 1
    }

    if (this.deg >= 30) {
      this.dir = -1
    }
    // this.draw()
  }
  handleTap(x, y) {
    var handler1XL = this.x - (4 * this.w) / 5 - this.w / 10,
      handler1XH = handler1XL + (this.w / 10)
    var handler2XL = this.x + (4 * this.w) / 5,
      handler2XH = handler2XL + (this.w / 10)
    var handlerYL = this.y - (2 * this.h),
      handlerYH = handlerYL + this.h
    if (y >= handlerYL && y <= handlerYH && this.deg == 0) {
      if (x >= handler1XL && x <= handler1XH) {
        this.dir = -1;
      } else if (x >= handler2XL && x <= handler2XH) {
        this.dir = 1;
      }
    }
  }

  roty(context, deg) {
    context.rotate(Math.PI / 180 * deg)
  }


  rotate(d) {
    var handler1XL = this.x - (4 * this.w) / 5 - this.w / 10,
      handler1XH = handler1XL + (this.w / 10)
    var handler2XL = this.x + (4 * this.w) / 5,
      handler2XH = handler2XL + (this.w / 10)
    var handlerYL = this.y - (2 * this.h),
      handlerYH = handlerYL + this.h
    if (y >= handlerYL && y <= handlerYH && this.deg == 0) {
      if (x >= handler1XL && x <= handler1XH) {
        this.dir = -1;
      } else if (x >= handler2XL && x <= handler2XH) {
        this.dir = 1;
      }
    }
  }
  //  get x() {
  //     return this.x;
  //   };

  //   set x(value) {
  //     this.x = value;
  //   }
}
