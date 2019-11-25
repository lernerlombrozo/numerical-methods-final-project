// legendre coef nd roots start at n = 2;
const LegendreCoef =[[1,1],[5/9,8/9,5/9],[0.3478548451,0.6521451549,0.6521451549,0.3478548451],[0.2369268850,0.4786286705,0.5688888889,0.4786286705,0.2369268850]];
const LegendreRoots =[[0.5773502692,-0.5773502692],[0.7745966692, 0, -0.7745966692],[0.8611363116,0.3399810436,-0.3399810436,-0.8611363116],[0.9061798459,0.5384693101,0,-0.5384693101,-0.9061798459]];

function transformToT(a,b,x){
    return ((b-a)*x+(a+b))/2; 
}

function gaussianQuadrature(x0,xf,n){
    if(n>LegendreCoef.length+1){
        return 'max n achievable by this program is '+LegendreCoef.length+1;
    }
    let I = 0;
    for(let i=0;i<LegendreCoef[n-1].length;i++){
        I += LegendreCoef[n-1][i] * toSolve(transformToT(x0,xf,LegendreRoots[n-1][i]));
    }
    return I*(xf-x0)/2;
}