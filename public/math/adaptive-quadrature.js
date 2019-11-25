function adap(a,b,tol,level,maxLevel,centers){
    level++;
    let c=(a+b)/2;
    let S1 = simpson(a,b);
    let S2 = simpson(a,c) + simpson(c,b);
    if (level >= maxLevel){
        console.warn('maximum level reached');
        alert('maximum level reached');
        return
    } else {
        if(Math.abs(S2-S1)<15*tol){
            centers.push(S2+(S2-S1)/15);
            return {answer: S2+(S2-S1)/15, centers};
        }
        else{
            SL = adap(a,c,tol/2,level,maxLevel,centers).answer;
            SR = adap(c,b,tol/2,level,maxLevel,centers).answer;
            return {answer:SL+SR,centers}
        }
    }
}
// function adaptiveQuadrature(a,b,tol,level,maxLevel){
//     console.log({a,b,tol,level,maxLevel})
//     level++;
//     let c=(a+b)/2;
//     let S1 = simpson(a,b);
//     let S2 = simpson(a,c) + simpson(c,b);
//     if (level >= maxLevel){
//         console.warn('maximum level reached');
//         alert('maximum level reached');
//         return
//     } else {
//         if(Math.abs(S2-S1)<15*tol){
//             return S2+(S2-S1)/15;
//         }
//         else{
//             SL = adap(a,c,tol/2,level,maxLevel);
//             SR = adap(c,b,tol/2,level,maxLevel);
//             return SL+SR
//         }
//     }
// }

function adaptiveQuadrature(a,b,tol,level,maxLevel){
    S=0;
    const resultArray=adap(a,b,tol,level,maxLevel,[]).centers;
    resultArray.forEach(element => {
        S+=element;
    });
    return S
}

function adaptiveTable(a,b,tol,level,maxLevel,centers){
    level++;
    let c=(a+b)/2;
    centers.push([level,a,b]);
    let S1 = simpson(a,b);
    let S2 = simpson(a,c) + simpson(c,b);
    if (level >= maxLevel){
        console.warn('maximum level reached');
        alert('maximum level reached');
        return
    } else {
        if(Math.abs(S2-S1)<15*tol){
            return {answer: S2+(S2-S1)/15, centers}
        }
        else{
            SL = adaptiveTable(a,c,tol/2,level,maxLevel,centers).answer;
            SR = adaptiveTable(c,b,tol/2,level,maxLevel,centers).answer;
            return {answer:SL+SR,centers}
        }
    }
}