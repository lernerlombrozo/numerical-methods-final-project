// comment if you want to use from HTML file
function simpson(x0,xf){
    const h = (xf-x0) * 0.5;
    return (h / 3) * (toSolve(x0) + 4 * toSolve(x0+h) + toSolve(xf));
}
function toSolve(x){
    return Math.cos(2*x)/Math.exp(x);
}

function adaptive(a,b,tol,level,maxLevel){
    level++;
    console.log(level);
    let c=(a+b)/2;
    let S1 = simpson(a,b);
    let S2 = simpson(a,c) + simpson(c,b);
    console.log(S1,S2)
    if (level >= maxLevel){
        throw new Error('maximum level reached');
    } else {
        if(Math.abs(S2-S1)<15*tol){
            return S2+(S2-S1)/15
        }
        else{
            SL = adaptive(a,c,tol/2,level,maxLevel)
            SR = adaptive(c,b,tol/2,level,maxLevel)
            return SL+SR
        }
    }
}

function adaptiveTable(a,b,tol,level,maxLevel,centers){
    level++;
    let c=(a+b)/2;
    centers.push([level,a,b]);
    let S1 = simpson(a,b);
    let S2 = simpson(a,c) + simpson(c,b);
    if (level >= maxLevel){
        throw new Error('maximum level reached');
    } else {
        if(Math.abs(S2-S1)<15*tol){
            // centers = centers.sort(function(a, b) { 
            //     return a[0] > b[0] ? 1 : -1;
            // });;
            return {answer: S2+(S2-S1)/15, centers}
        }
        else{
            SL = adaptiveTable(a,c,tol/2,level,maxLevel,centers).answer;
            SR = adaptiveTable(c,b,tol/2,level,maxLevel,centers).answer;
            return {answer:SL+SR,centers}
        }
    }
}

function buildTable(a,b,tol,level,maxLevel,centers){
    let rawData = adaptiveTable(a,b,tol,level,maxLevel,centers);
    let orderedCenters=rawData.centers.sort(function(a, b) { 
        return a[1] > b[1] ? 1 : -1;
    });
    // let orderedLevels=[];
    // orderedCenters.forEach(element => {
    //     orderedLevels.push(element[0])
    // });
    minData=[];
    let x= a;
    let maxInRange=orderedCenters[0];
    for(let i=1;i<orderedCenters.length;i++){
        console.log(i,orderedCenters[i])
        if(orderedCenters[i][1]==maxInRange[1]){
            if(orderedCenters[i][0]>maxInRange[0]){
                maxInRange = orderedCenters[i]; 
            }
        } else{
            console.log('here',i,maxInRange)
            minData.push(maxInRange);
            maxInRange =orderedCenters[i]; 
            if(i==orderedCenters.length-1){
                minData.push(maxInRange);  
            }
        } 
    }
    console.log(minData)
}

// console.log(adaptive(0,Math.PI * 1.25,0.001,0,10));
buildTable(0,Math.PI * 1.25,0.0001,0,10,[]);



// function adaptiveTable(x0,xf,n,tol,maxDivisions){
//     const h = (xf-x0)/n;
//     let table =[
//         ['i','i+h', "integral from i to i+h","integral from "+x0+' to i+h',"local error (i to i+h)","total error (x0 to i+h)"]
//     ];
//     let integral=0;
//     for (let i=0; i<n;i++){
//         let I = simpson38(x0+i*h,x0+(i+1)*h);
//         integral = integral + I;
//         localErr=Math.abs(compositeSimpson(x0+i*h,x0+(i+1)*h,10000)-I);
//         totalErr=Math.abs(compositeSimpson(x0,x0+(i+1)*h,10000)-integral);
//         table.push([x0+i*h,x0+(i+1)*h,I,integral,localErr,totalErr]);
//     }
//     return(table);
// }