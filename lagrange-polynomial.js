// x the value 
// xl list of xi
function lagrangeFromDataPoints(x,xl){
    let n = xl.length; // degree of polynomial
    console.log('degree', n, x, xl)
    let L = 0;
    for (let j=0;j<n;j++){
        let l = 1;
        for (let i=0;i<n;i++){
            if(i!=j)l=l*(x-xl[i])/(xl[j]-xl[i]);
        }
        L+=(l*toSolve(xl[j]));
    }
    return L
}

// n degree of polynomial
function lagrangeFromDegree(x0,xf,n){
    console.log('degree', n, x, xl)
    let L = 0;
    for (let j=0;j<n;j++){
        let l = 1;
        for (let i=0;i<n;i++){
            if(i!=j)l=l*(x-xl[i])/(xl[j]-xl[i]);
        }
        L+=(l*toSolve(xl[j]));
    }
    return L
}