let x0 = 0;
let x1 = 1;
let n = 4;
let h = ((x1-x0)/n); // this h is the distance between two points.
const smallH = 0.001; // this h is for making the plot continuous.
const xT="x";
const yT= "f(x)";
const tT="trapesoid";
const sT="simpson's";

var alert = new Vue({
    el: '#alert',
    data: {
      message: 'Hello Vue!',
      seen: false
    }
})

var app = new Vue({
    el: '#app',
    data: {
      x0: x0,
      x1:x1,
      n:n,
      calculating:false
    },
    methods: {
        makeCharts: function () {
            this.calculating = true;
            x0 = +this.x0;
            x1 = +this.x1;
            n = +this.n;
            h = ((x1-x0)/n);
            this.calculating = false;
            makeCompositePlot();
            makeSimplePlot();
        }
      }
})