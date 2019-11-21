// newton - cotes functions
function trapezoid(x0,xf){
    // n = 1 division;
    let h = (xf-x0);
    return h * 0.5 * (toSolve(x0)+toSolve(xf))
}
 
// n = 2;
function simpson(x0,xf){
    let h = (xf-x0) * 0.5;
    console.log('h= ',h)
    return (h / 3) * (toSolve(x0) + 4*toSolve(x0+h) + toSolve(xf))
}

function simpson38(x0,xf){
    let h = (xf-x0) / 3;
    return (h * 0.375) * (toSolve(x0)+ 3*(toSolve(x0+h) + toSolve(xf-h)) + toSolve(xf))
}

// newton - cotes composite functions
function compositeTrapezoid(x0,xf,h){
    let integral=0;
    for(let i=0;i<n;i++){
        integral = integral + trapezoid(i,i+h)
    }
    return(integral * h * 0.5);
}

function compositeSimpson(x0,xf,h){
    let integral=0;
    for(let i=x0;i<xf;i+=h){
        integral = integral + simpson(i,i+h)
    }
    return(integral * h /2);
}

console.log('xxx',compositeSimpson(x0,xf,h))

function compositeSimpson38(x0,xf,h){
    let integral=0;
    for(let i=0;i<n;i++){
        integral = integral + simpson38(i,i+h)
    }
    return(integral * h * 0.375);
}