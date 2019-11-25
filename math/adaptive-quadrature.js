function adap(a,b,tol,level,maxLevel,centers,topLevel,allLevels){
    level++;
    let c=(a+b)/2;
    let S1 = simpson(a,b);
    let S2 = simpson(a,c) + simpson(c,b);
    if(level>topLevel){
        topLevel=level;
    }
    if (level >= maxLevel){
        console.warn('maximum level reached');
        alert('maximum level reached');
        return
    } else {
        if(Math.abs(S2-S1)<15*tol){
            centers.push(S2+(S2-S1)/15);
            allLevels.push(level);
            return {answer: S2+(S2-S1)/15, centers, topLevel,allLevels};
        }
        else{
            SL = adap(a,c,tol/2,level,maxLevel,centers,topLevel,allLevels).answer;
            SR = adap(c,b,tol/2,level,maxLevel,centers,topLevel,allLevels).answer;
            return {answer:SL+SR,centers,topLevel,allLevels}
        }
    }
}

function adaptiveQuadrature(a,b,tol,maxLevel,analyticalSolution){
    S=0;
    const result=adap(a,b,tol,0,maxLevel,[],0,[]);
    const resultArray=result.centers;
    resultArray.forEach(element => {
        S+=element;
    });
    if(analyticalSolution){
        const adaptiveError = analyticalSolution - S;
        const timesFunctionWasCalled=result.allLevels.reduce(function(a,b) {return a+b},0)*0.25;
        const similarComposite = getSimilarComposite(result.topLevel, adaptiveError, tol)
        return {
            integral:S,
        }
    }
    return S
}

function getSimilarComposite(maxLevel,adaptiveError,tol){
    let l = 0;
    let 
}

function adaptiveTable(a,b,tol,level,maxLevel,centers){
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
            centers.push([level,a,b]);
            return {answer: S2+(S2-S1)/15, centers}
        }
        else{
            SL = adaptiveTable(a,c,tol/2,level,maxLevel,centers).answer;
            SR = adaptiveTable(c,b,tol/2,level,maxLevel,centers).answer;
            return {answer:SL+SR,centers}
        }
    }
}