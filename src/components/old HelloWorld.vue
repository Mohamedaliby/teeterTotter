<template>
  <div class="hello">
    <p>{{time}}</p>
    <input type="button" value="<<" @click="onCounterClockwise();">
    <input type="button" value=">>" @click="onClockwise();">
 <canvas ref="game" id="game" width="1000" height="600">

 </canvas>
  </div>
</template>

<script>
import Shapes from "../services/shapes";
import { Rect, Triangle, Bar } from "../services/classes";
export default {
  name: "HelloWorld",
  data() {
    return {
      canvas: null,
      context: null,
      deg:0,
      time:0
    };
  },
computed:{
 time: function () {
      return this.time++
    }
},
  methods: {
    start() {
          setInterval(function(){ this.time++ }, 1000);
      // this.canvas = document.getElementById('game')
      this.canvas = this.$refs.game;
      console.log(this.canvas);
      this.context = this.canvas.getContext("2d");
      // Shapes.rect(this.context,'black',0,0,this.canvas.width, this.canvas.height)

      const screen = new Rect(
        this.context,
        "black",
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      const teeter = new Rect(this.context, "red", 250, 400, 500, 15);
      let base = new Triangle(
        this.context,
        "gray",
        this.canvas.width / 2,
        415,
        400,
        615,
        600,
        615
      );

      // this.context.rotate(20 * Math.PI / 180);
      const bar = new Bar(this.context, "white", 10, 10, 500, 15, 2);
      // bar.draw(this.context);

      this.context.save();
      // this.context.clearRect(0, 0,this.canvas.width,this.canvas.height)
  
      this.context.restore();
      bar.roty(this.context, 5);
      bar.draw(this.context)
      bar.roty(this.context,10);
      bar.draw(this.context)

      // this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
      // this.context.restore();
    },
    draw() {
      this.canvas = this.$refs.game;
      console.log(this.canvas);
      this.context = this.canvas.getContext("2d");
      this.context.save();
      this.context.clearRect(0, 0, this.context.width, this.context.height);
      this.context.rotate(Math.PI / (180.0 / this.deg));
      var r = this.getRotatedRect();
      cx.strokeRect(r.x, r.y, r.w, r.h);
      cx.restore();
    },
    rotate(n) {
    this.deg += n;
    this.draw();
    },
    onClockwise() {
      this.rotate(5);
    },
    onCounterClockwise() {
      this.rotate(-5);
    }
  },
  mounted() {
    this.start();
    // this.context.fillStyle = "black";
    // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Shapes.rect(this.context, "white", 0, 0, 20, 20);
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
