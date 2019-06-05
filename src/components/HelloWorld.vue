<template>
  <div class="hello">
    <p>{{myTime}}</p>
       <p>{{fallingShapeY}}</p>
    <input type="button" value="<<" @click="onCounterClockwise();">
    <input type="button" value=">>" @click="onClockwise();">
     <input type="button" value="start" @click="start();">
     <input type="button" value="pause" @click="pause();">
 <canvas ref="game" id="game" width="1200" height="600">

 </canvas>
  </div>
</template>

<script>
import Shapes from "../services/shapes";
import { Rect, Triangle, Bar } from "../services/classes";
const bar = new Bar(this.context, "red", 250, 400, 500, 15);
export default {
  name: "HelloWorld",
  data() {
    return {
      canvas: null,
      context: null,
      teater: {
        x: 50,
        y: 400,
        w: 1000,
        h: 15
      },
      placementX: [50, 100, 950, 1000],
      shapes: [],
      fallingShape: {
        name: null,
        color: null,
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        weight:1
      },
      shapeY: 0,
      deg: 0,
      time: 0,
      colors: ["red", "blue", "gray", "brown"],
      // rightStack: 350,
      // leftStack: 350,
      rightStack: 350,
      leftStack: 350,
      right: false,
      left: false
    };
  },
  computed: {
    myTime: function() {
      return this.time;
    },
    fallingShapeY: function() {
      return this.shapeY;
    },
    reached: function() {
      return this.shapeY;
    }
  },
  watch: {
    leftStack: function(val) {
      console.log("done");
      console.log(this.rightStack,this.leftStack);
       this.deg = this.deg - this.fallingShape.weight
       if (this.deg > 10|| this.$store.state.leftWeight >20) {
         this.pause()
       }
       this.fallingShape.y = this.leftStack
       this.$store.dispatch("addLeftWeight", this.fallingShape.weight)
    },
    rightStack: function(val) {
       this.deg = this.deg + this.fallingShape.weight
        if (this.deg > 10 || this.$store.state.rightWeight >20) {
         this.pause()
       }
        console.log("done");
        this.fallingShape.y =this.rightStack
        this.$store.dispatch("addRightWeight", this.fallingShape.weight)
    }
    // time: function (oldTime, newTime) {
    //   console.log(newTime - oldTime)
    // //  if (newTime - oldTime > 20) {
    // //    console.log(20202020202)
    // //  }
    // }
    // time: function(time) {
    // if (time%5 ==0) {
    //    this.fallingShapeY = fallingShapeY + 5
    //   //  this.fallingShape.x=  this.fallingShapeY
    // }
    //  console.log(time)
    //  this.newShapeTime++
    //  console.log(this.newShapeTime)
    //  if (itme - newShapeTime > 20) {
    //    console.log(20202020202)
    //  }
    // }
  },
  methods: {
    start() {
      const app = this;
      app.timer = setInterval(function() {
        app.time = app.time + 1;
      }, 1000);
      app.newShape = setInterval(function() {
        app.drawScreen();
        app.drawFallingShape()
        app.drawShapes()
      }, 2000);
      app.falling = setInterval(function() {
        app.shapeY = app.shapeY + 50;
        if (app.shapeY === app.rightStack) {
          app.fallingShape.y = app.rightStack
          // this.shapes.push({name:0,color:this.colors[color],x:this.placementX[place],y:this.fallingShapeY,w:50,h:50})
          app.shapes.push(app.fallingShape);
          (app.fallingShape = {
            name: null,
            color: null,
            x: 0,
            y: 0,
            w: 50,
            h: 50
          }),
            (app.shapeY = 0);
          if (this.right) {
            app.drawScreen();
            app.addNewShape();
            app.rightStack = app.rightStack - 50;
          } else {
            app.drawScreen();
            app.addNewShape();
            app.leftStack = app.leftStack - 50;
          }
        } 
      }, 1000);
    },
    async pause() {
      const app = this;
      await clearInterval(app.timer);
      // clearInterval(app.newShape);
    },
    addNewShape() {
      let color = Math.floor(Math.random() * 3);
      let place = Math.floor(Math.random() * 3);
      console.log(this.placementX[place]);
      if (this.placementX[place] > 100) {
        this.right = true;
        this.left = false;
        console.log(this.right, this.left);
      } else {
        this.right = false;
        this.left = true;
        console.log(this.right, this.left);
      }
      let number = Math.floor(Math.random() * 2);
      switch (number) {
        case 0:
          // when it gets there
          this.fallingShape.name = 0;
          this.fallingShape.x = this.placementX[place];
          this.fallingShape.color = this.colors[color];
          this.fallingShape.weight = Math.floor(Math.random() * 10) +1;

          this.context.fillStyle = this.colors[color];
          this.context.fillRect(
            this.placementX[place],
            this.fallingShapeY + 50,
            50,
            50
          );
          break;
        case 1:
          this.fallingShape.name = 1;
          this.fallingShape.x = this.placementX[place];
          this.fallingShape.color = this.colors[color];
          this.fallingShape.weight = Math.floor(Math.random() * 10) +1;

          this.context.fillStyle = this.colors[color];
          this.context.beginPath();
          this.context.arc(
            this.placementX[place],
            this.fallingShapeY + 50,
            25,
            0,
            2 * Math.PI
          );
          //  arc(x, y, radius, startAngle, endAngle, direction)
          this.context.stroke();
          break;
        // case 2:
        //   this.ax = ax;
        //   this.ay = ay;
        //   this.bx = bx;
        //   this.by = by;
        //   this.cx = cx;
        //   this.cy = cy;
        //   this.context.beginPath();
        //   this.context.fillStyle = this.colors[color]
        //   this.context.moveTo(this.ax, this.ay)
        //   this.context.lineTo(this.bx, this.by)
        //   this.context.lineTo(this.cx, this.cy)
        //   this.context.closePath()
        //   this.context.fill()
        //   break;

        default:
          break;
      }
    },
    drawScreen() {
      let app = this;
      this.canvas = this.$refs.game;
      console.log(this.canvas);
      this.context = this.canvas.getContext("2d");
      this.context.save();
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      let base = new Triangle(
        this.context,
        "gray",
        this.canvas.width / 2 - 50,
        415,
        500 - 50,
        615,
        700 - 50,
        615
      );
      // this.drawFallingShape();
      // this.drawShapes()
      let c = this.getRectCenter();
      this.context.translate(c.x, c.y);
      this.context.rotate(Math.PI / (180.0 / this.deg));
      let r = this.getRotatedRect();
      this.context.strokeRect(r.x, r.y, r.w, r.h);
      this.context.restore();
    },
    getRectCenter() {
      return {
        x: this.teater.x + this.teater.w / 2,
        y: this.teater.y + this.teater.h / 2
      };
    },
    getRotatedRect() {
      return {
        x: this.teater.w / -2,
        y: this.teater.h / -2,
        w: this.teater.w,
        h: this.teater.h
      };
    },
    rotate(n) {
      this.deg += n;
      this.drawScreen();
    },
    onClockwise() {
      this.rotate(5);
    },
    onCounterClockwise() {
      this.rotate(-5);
    },
    drawShapes() {
      console.log(this.shapes)
      this.shapes.forEach(function(shape) {
        let name = shape.name;
        switch (name) {
          case 0:
           this.context.fillStyle = shape.color;
          this.context.fillRect(shape.x, shape.y, 50, 50);
            break;
          case 1:
          this.context.fillStyle = shape.color
          this.context.beginPath();
          this.context.arc(
            shape.x,
            shape.y,
            25,
            0,
            2 * Math.PI
          );
          //  arc(x, y, radius, startAngle, endAngle, direction)
          this.context.stroke();
            break;

          default:
            break;
        }
      }, this);
    },
    drawFallingShape() {
      let name = this.fallingShape.name;
      switch (name) {
        case 0:
          this.context.fillStyle = this.fallingShape.color;
          this.context.fillRect(this.fallingShape.x, this.fallingShapeY, 50, 50);
          break;
        case 1:
          this.context.fillStyle =  this.fallingShape.color;
          this.context.beginPath();
          this.context.arc(
            this.fallingShape.x,
            this.fallingShapeY,
            25,
            0,
            2 * Math.PI
          );
          //  arc(x, y, radius, startAngle, endAngle, direction)
          this.context.stroke();
          break;

        default:
          break;
      }
    }
  },
  mounted() {
    this.start();
    this.drawScreen();
    // window.requestAnimationFrame(this.drawScreen());
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
