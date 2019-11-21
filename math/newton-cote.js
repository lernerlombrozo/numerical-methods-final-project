// newton - cotes functions
function trapezoid(h,x0,x1){
    return h * 0.5 * (toSolve(x0)+toSolve(x1))
}

function simpson(h,x0,x1,x2){
    return h / 3 * (toSolve(x0)+4*toSolve(x1)+toSolve(x2))
}

function simpson38(h,x0,x1,x2,x3){
    return h * 0.375 * (toSolve(x0)+3*(toSolve(x1)+toSolve(x2))+toSolve(x3))
}

// newton - cotes composite functions
function compositeTrapezoid(n,h,x0,x1){
    for(let i=0;i<n;i++){
        
    }
}

function compositeSimpson(n,h,x0,x1){

}

function compositeSimpson38(n,h,x0,x1){

}