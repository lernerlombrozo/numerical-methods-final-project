let x0 = 0; // initial x
let xf = 4; // final x
let n = 2; // for composite plots
let h = ((xf-x0)/n); // this h is the distance between two points.
let degree1=1;
let degree2=2;
const smallH = 0.01; // this h is to make plot continuous.
const xT="x";
var yT= "f(x)=exp(x)";
let toEvaluate="";

function toSolve(x){
  if(toEvaluate){
    return(eval(toEvaluate)); 
  }
  // return (Math.sqrt(1-x**2)) // Circle centered in (0,0) with radius 1. Can be evaluated from -1 to 1;
  return (Math.exp(x));
  // return x**3 + 3*x**2;
  // return Math.sin(x)
}

var app = new Vue({
    el: '#app',
    data: {
      x0: x0,
      xf:xf,
      n:n,
      degree1:degree1,
      degree2:degree2,
      message: "",
      toEvaluate:"",
      table1:null,
      table2:null,
      table3:null,
    },
    methods: {
        makeTables: function(){
          this.table1=compositeTrapezoidTable(x0,xf,h);
          this.table2=compositeSimpsonTable(x0,xf,h);
          this.table3=compositeSimpson38Table(x0,xf,h);
        },
        makeCharts: function () {
            x0 = +this.x0;
            xf = +this.xf;
            this.n=Math.round(+this.n)
            n = this.n;
            h = ((xf-x0)/n);
            degree1=+this.degree1;
            degree2=+this.degree2;
            this.message = "";
            toEvaluate=this.toEvaluate;
            if(toEvaluate) yT = "f(x)="+toEvaluate;
            if(n <1){
              this.message="n must be a positive integer";
              return
            }
            if(n % degree1 == 0 && n % degree2 == 0){
              makeCompositePlot();
              makeCompositePlot2();
              makeSimplePlot();
              this.makeTables();
            } else {
                this.message = "n must be multiple of the all polynomials";
            }
        },
      }
})