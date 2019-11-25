let x0 = 0; // initial x
let xf = 1; // final x
let n = 2; // for composite plots
let degree1=2;
let degree2=3;
const smallN = 100; // this h is to make plot continuous.
const xT="x";
let analyticalSolution;
let tol = 0.0001;
let maxLevel = 1000;
// let yT= "f(x)=x";
let yT= "f(x)=sqrt(1-x^2)";
// var yT= "f(x)=sin(x)";
// var yT= "f(x)=x^6 - x^2 sin(2x)";
// var yT= "f(x)=cos(2x)/exp(x)";
// var yT= "f(x)=100/x^2*sin(10/x)";
let toEvaluate="";

function toSolve(x){
  if(toEvaluate){
    return(eval(toEvaluate)); 
  }
  // return(2*x)
  return Math.sqrt(1-x**2); // Circle centered in (0,0) with radius 1. Can be evaluated from -1 to 1;
  // return Math.sin(x);
  // return x**6 - x**2 * Math.sin(2*x);
  // return Math.cos(2*x)/Math.exp(x);
  // return 100/x**2 * Math.sin(10/x)
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
      tableComparison:null,
      analyticalSolution:null,
      tol:tol,
      maxLevel:maxLevel,
    },
    methods: {
        makeTables: function(){
          this.table1=compositeTrapezoidTable(x0,xf,n);
          this.table2=compositeSimpsonTable(x0,xf,n);
          this.table3=compositeSimpson38Table(x0,xf,n);
          this.tableComparison=makeComparissonChart(x0,xf,n);
        },
        makeCharts: function () {
            x0 = +this.x0;
            xf = +this.xf;
            this.n=Math.round(+this.n)
            n = this.n;
            degree1=+this.degree1;
            degree2=+this.degree2;
            this.message = "";
            toEvaluate=this.toEvaluate;
            analyticalSolution=this.analyticalSolution;
            tol=+this.tol;
            maxLevel=+this.maxLevel;
            if(toEvaluate) yT = "f(x)="+toEvaluate;
            if(n <1){
              this.message="n must be a positive integer";
              return
            }
            makeCompositePlot();
            makeCompositePlot2();
            makeSimplePlot();
            makeAdaptivePlot();
            this.makeTables();
        },
      }
})