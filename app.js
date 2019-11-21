let x0 = 0; // initial x
let xf = 10; // final x
let n = 4; // for composite plots
let h = ((xf-x0)/n); // this h is the distance between two points.
let degree1=2;
let degree2=1;
const smallH = 0.01; // this h is to make plot continuous.
const xT="x";
const yT= "f(x)";

function toSolve(x){
  // return (Math.sqrt(1-x**2)) // Circle centered in (0,0) with radius 1. Can be evaluated from -1 to 1;
  // return (Math.exp(x));
  // return x**3 + 3*x**2;
  return Math.sin(x)
}

var app = new Vue({
    el: '#app',
    data: {
      x0: x0,
      xf:xf,
      n:n,
      degree1:degree1,
      degree2:degree2,
      calculating:false,
      message: "",
    },
    methods: {
        makeCharts: function () {
            this.calculating = true;
            x0 = +this.x0;
            xf = +this.xf;
            this.n=Math.round(+this.n)
            n = this.n;
            h = ((xf-x0)/n);
            degree1=+this.degree1;
            degree2=+this.degree2;
            this.calculating = false;
            this.message = "";
            if(n <1){
              this.message="n must be a positive integer";
              return
            }
            if(n % degree1 == 0 && n % degree2 == 0){
              makeCompositePlot();
              makeCompositePlot2();
              makeSimplePlot();
            } else {
                console.log(n)
                this.message = "n must be multiple of the all polynomials";
            }
        }
      }
})