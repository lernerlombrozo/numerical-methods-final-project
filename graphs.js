let x0 = 0; // initial x
let xf = 1; // final x
let n = 4; // for composite plots
let h = ((xf-x0)/n); // this h is the distance between two points.
let degree1=2;
let degree2=3;
const smallH = 0.001; // this h is for making the plot continuous.
const xT="x";
const yT= "f(x)";

function toSolve(x){
  return (Math.sqrt(1-x**2)) // Circle centered in (0,0) with radius 1. Can be evaluated from -1 to 1;
  // return (Math.exp(x))
}

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
      xf:xf,
      n:n,
      degree1:degree1,
      degree2:degree2,
      calculating:false,
      showMessage:false,
      message: "n must be multiple of the biggest polynomial",
    },
    methods: {
        makeCharts: function () {
            this.calculating = true;
            x0 = +this.x0;
            xf = +this.xf;
            n = +this.n;
            h = ((xf-x0)/n);
            degree1=+this.degree1,
            degree2=+this.degree2,
            this.calculating = false;
            this.showMessage = false;
            if(n % degree1 == 0 && n % degree2 == 0){
              makeCompositePlot();
              makeSimplePlot();
            } else {
              console.log(n % degree1, n % degree2)
              this.showMessage = true;
            }
        }
      }
})