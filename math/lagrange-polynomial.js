// x the value 
// xl list of xi
function lagrangeFromDataPoints(x,xl){
    let n = xl.length; // degree of polynomial
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
function lagrangeFromDegree(x,x0,xf,n){
    let h = (xf-x0)/n
    let L = 0;
    let Cx = x0;
    for (let j=0;j<=n;j++){
        let l = 1;
        let cx=x0;
        for (let i=0;i<=n;i++){
            if(i!=j)l=l*(x-cx)/(Cx-cx);
            cx+=h;
        }
        L+=(l*toSolve(Cx));
        Cx+=h;
    }
    return L
}

// function legendreCoeficients(n){
//     let h = (xf-x0)/n
//     let L = 0;
//     let Cx = x0;
//     for (let j=0;j<=n;j++){
//         let l = 1;
//         let cx=x0;
//         for (let i=0;i<=n;i++){
//             if(i!=j)l=l*(x-cx)/(Cx-cx);
//             cx+=h;
//         }
//         L+=(l*toSolve(Cx));
//         Cx+=h;
//     }
//     return L
// }