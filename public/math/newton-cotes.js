// newton - cotes functions
// n=1;
function trapezoid(x0,xf){
    const h = (xf-x0);
    return h * 0.5 * (toSolve(x0)+toSolve(xf));
}
 
// n = 2;
function simpson(x0,xf){
    const h = (xf-x0) * 0.5;
    return (h / 3) * (toSolve(x0) + 4 * toSolve(x0+h) + toSolve(xf));
}

// n=3;
function simpson38(x0,xf){
    const h = (xf-x0) / 3;
    return (h * 0.375) * (toSolve(x0) + 3 * (toSolve(x0+h) + toSolve(xf-h)) + toSolve(xf));
}

// newton - cotes composite functions
function compositeTrapezoid(x0,xf,n){
    const h = (xf-x0)/n;
    let integral=0;
    // higher roundoff error but lower operation count.
    // for(let i=x0;i<xf;i+=h){
    //     integral = integral + trapezoid(i,i+h)
    // }
    // This has a higher operation count but lower roundoff error.
    for (let i=0; i<n;i++){
        integral = integral + trapezoid(x0+i*h,x0+(i+1)*h);
    }
    return(integral);
}

function efficientCompositeTrapezoid(x0,xf,n){
    const h = (xf-x0)/n;
    let integral = toSolve(x0);
    for (let i=1; i<n; i++){
        integral = integral + 2 * toSolve(x0+i*h);
    }
    integral += toSolve(xf);
    integral=integral * h * 0.5;
    return(integral);
}

function compositeSimpson(x0,xf,n){
    const h = (xf-x0)/n;
    let integral=0;
    for (let i=0; i<n;i++){
        integral = integral + simpson(x0+i*h,x0+(i+1)*h);
    }
    return(integral);
}

function compositeSimpson38(x0,xf,n){
    const h = (xf-x0)/n;
    let integral=0;
    for (let i=0; i<n;i++){
        integral = integral + simpson38(x0+i*h,x0+(i+1)*h);
    }
    return(integral);
}

// newton - cotes composite functions building tables
// [x, integral of current segment, sum of integrals, error, segment error, total error]
function compositeTrapezoidTable(x0,xf,n){
    const h = (xf-x0)/n;
    let table =[
        ['i','i+h', "integral from i to i+h","integral from "+x0+' to i+h',"local error (i to i+h)","total error (x0 to i+h)"]
    ];
    let integral=0;
    for (let i=0; i<n;i++){
        let I = trapezoid(x0+i*h,x0+(i+1)*h);
        integral = integral + I;
        localErr=Math.abs(compositeSimpson(x0+i*h,x0+(i+1)*h,10000)-I);
        totalErr=Math.abs(compositeSimpson(x0,x0+(i+1)*h,10000)-integral);
        table.push([x0+i*h,x0+(i+1)*h,I,integral,localErr,totalErr]);
    }
    return(table);
}

function compositeSimpsonTable(x0,xf,n){
    const h = (xf-x0)/n;
    let table =[
        ['i','i+h', "integral from i to i+h","integral from "+x0+' to i+h',"local error (i to i+h)","total error (x0 to i+h)"]
    ];
    let integral=0;
    for (let i=0; i<n;i++){
        let I = simpson(x0+i*h,x0+(i+1)*h);
        integral = integral + I;
        localErr=Math.abs(compositeSimpson(x0+i*h,x0+(i+1)*h,10000)-I);
        totalErr=Math.abs(compositeSimpson(x0,x0+(i+1)*h,10000)-integral);
        table.push([x0+i*h,x0+(i+1)*h,I,integral,localErr,totalErr]);
    }
    return(table);
}

function compositeSimpson38Table(x0,xf,n){
    const h = (xf-x0)/n;
    let table =[
        ['i','i+h', "integral from i to i+h","integral from "+x0+' to i+h',"local error (i to i+h)","total error (x0 to i+h)"]
    ];
    let integral=0;
    for (let i=0; i<n;i++){
        let I = simpson38(x0+i*h,x0+(i+1)*h);
        integral = integral + I;
        localErr=Math.abs(compositeSimpson(x0+i*h,x0+(i+1)*h,10000)-I);
        totalErr=Math.abs(compositeSimpson(x0,x0+(i+1)*h,10000)-integral);
        table.push([x0+i*h,x0+(i+1)*h,I,integral,localErr,totalErr]);
    }
    return(table);
}
