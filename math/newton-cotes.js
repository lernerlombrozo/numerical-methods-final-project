// newton - cotes functions
// n=1;
function trapezoid(x0,xf){
    let h = (xf-x0);
    return h * 0.5 * (toSolve(x0)+toSolve(xf));
}
 
// n = 2;
function simpson(x0,xf){
    let h = (xf-x0) * 0.5;
    return (h / 3) * (toSolve(x0) + 4 * toSolve(x0+h) + toSolve(xf));
}

// n=3;
function simpson38(x0,xf){
    let h = (xf-x0) / 3;
    console.log(h)
    return (h * 0.375) * (toSolve(x0) + 3 * (toSolve(x0+h) + toSolve(xf-h)) + toSolve(xf));
}

// newton - cotes composite functions
function compositeTrapezoid(x0,xf,h){
    let integral=0;
    for(let i=x0;i<xf;i+=h){
        integral = integral + trapezoid(i,i+h)
    }
    return(integral);
}

function compositeSimpson(x0,xf,h){
    let integral=0;
    for(let i=x0;i<xf;i+=h){
        integral = integral + simpson(i,i+h)
    }
    return(integral);
}

function compositeSimpson38(x0,xf,h){
    let integral=0;
    for(let i=x0;i<xf;i+=h){
        integral = integral + simpson38(i,i+h)
    }
    return(integral);
}

// newton - cotes composite functions building tables
// [x, integral of current segment, sum of integrals, error, segment error, total error]
function compositeTrapezoidTable(x0,xf,h){
    let table =[
        ['i','i+h', "integral from i to i+h","integral from "+x0+' to i+h',"local error (i to i+h)","total error (x0 to i+h)"]
    ];
    let integral=0;
    for(let i=x0;i<xf;i+=h){
        let I = trapezoid(i,i+h);
        integral = integral + I;
        localErr=Math.abs(compositeSimpson(i,i+h,0.0001)-I);
        totalErr=Math.abs(compositeSimpson(x0,i+h,0.0001)-integral);
        table.push([i,i+h,I,integral,localErr,totalErr]);
    }
    return(table);
}

function compositeSimpsonTable(x0,xf,h){
    let table =[
        ['i','i+h', "integral from i to i+h","integral from "+x0+' to i+h',"local error (i to i+h)","total error (x0 to i+h)"]
    ];
    let integral=0;
    for(let i=x0;i<xf;i+=h){
        let I = simpson(i,i+h);
        integral = integral + I;
        localErr=Math.abs(compositeSimpson(i,i+h,0.0001)-I);
        totalErr=Math.abs(compositeSimpson(x0,i+h,0.0001)-integral);
        table.push([i,i+h,I,integral,localErr,totalErr]);
    }
    return(table);
}

function compositeSimpson38Table(x0,xf,h){
    let table =[
        ['i','i+h', "integral from i to i+h","integral from "+x0+' to i+h',"local error (i to i+h)","total error (x0 to i+h)"]
    ];
    let integral=0;
    for(let i=x0;i<xf;i+=h){
        let I = simpson38(i,i+h);
        integral = integral + I;
        localErr=Math.abs(compositeSimpson(i,i+h,0.0001)-I);
        totalErr=Math.abs(compositeSimpson(x0,i+h,0.0001)-integral);
        table.push([i,i+h,I,integral,localErr,totalErr]);
    }
    return(table);
}
