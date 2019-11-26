let x0 = 0; // initial x
let xf = 1; // final x
let n = 2; // for composite plots
let degree1=2;
let degree2=3;
const smallN = 100; // this h is to make plot continuous.
const xT="x";
let analyticalSolution;
let tol = 0.001;
let tol2 = 0.0001;
let tol3 = 0.00001;
// let tol4 = 0.000001;
// let tol5 = 0.0000001;
let maxLevel = 1000;
let yT= "f(x)=sqrt(1-x^2)";
// var yT= "f(x)=sin(x)";
// var yT= "f(x)=x^6 - x^2 sin(2x)";
// var yT= "f(x)=cos(2x)/exp(x)"; // from 0 to 1.25 pi is 0.207881149194646844113073541726788584508990098
// var yT= "f(x)=100/x^2*sin(10/x)"; // from 1 to 3 is -1.4260247563462661207624674268804183113448083
let toEvaluate="";

if(yT=="f(x)=cos(2x)/exp(x)" && x0 ==0 && xf==0.25*Math.PI){
  analyticalSolution=0.207881149194646844113073541726788584508990098;
} else if(yT=="f(x)=100/x^2*sin(10/x)" && x0 ==1 && xf==3){
  analyticalSolution= -1.4260247563462661207624674268804183113448083;
} else if(yT=="f(x)=sqrt(1-x^2)" && x0 ==0 && xf==1){
  analyticalSolution=Math.PI*0.25;
} else if(yT=="sin(x)" && x0 ==0 && xf==Math.PI){
  analyticalSolution=2;
}

function toSolve(x){
  if(toEvaluate){
    return(eval(toEvaluate)); 
  }
  return Math.sqrt(1-x**2); // Circle centered in (0,0) with radius 1. Can be evaluated from -1 to 1;
  // return Math.sin(x);
  // return x**6 - x**2 * Math.sin(2*x);
  // return Math.cos(2*x)/Math.exp(x);
  // return 100/x**2 * Math.sin(10/x)
}

var app = new Vue({
    el: '#app',
    data: {
      x0,
      xf,
      n,
      degree1,
      degree2,
      message: "",
      toEvaluate:"",
      table1:null,
      table2:null,
      table3:null,
      tableComparison:null,
      analyticalSolution,
      tol,
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
            if(toEvaluate==this.toEvaluate && (x0 != this.x0 || xf!=this.xf)){
              this.analyticalSolution="";
              analyticalSolution="";
            }else if(toEvaluate!=this.toEvaluate && analyticalSolution==this.analyticalSolution){
              analyticalSolution="";
              this.analyticalSolution="";
            } else{
              analyticalSolution=this.analyticalSolution;
            }
            toEvaluate=this.toEvaluate;
            x0 = +this.x0;
            xf = +this.xf;
            this.n=Math.round(+this.n)
            n = this.n;
            degree1=+this.degree1;
            degree2=+this.degree2;
            this.message = "";
            tol=+this.tol;
            maxLevel=+this.maxLevel;
            if(toEvaluate) yT = "f(x)="+toEvaluate;
            if(n <1){
              this.message="n must be a positive integer";
              return
            }
            if(yT=="f(x)=cos(2x)/exp(x)" && x0 ==0 && xf==0.25*Math.PI){
              analyticalSolution=0.207881149194646844113073541726788584508990098;
            } else if(yT=="f(x)=100/x^2*sin(10/x)" && x0 ==1 && xf==3){
              analyticalSolution= -1.4260247563462661207624674268804183113448083;
            } else if(yT=="f(x)=sqrt(1-x^2)" && x0 ==0 && xf==1){
              analyticalSolution=Math.PI*0.25;
            } else if(yT=="sin(x)" && x0 ==0 && xf==Math.PI){
              analyticalSolution=2;
            }
            this.analyticalSolution=analyticalSolution;
            makeCompositePlot();
            makeCompositePlot2();
            makeSimplePlot();
            makeAdaptivePlot();
            this.makeTables();
        },
      }
})