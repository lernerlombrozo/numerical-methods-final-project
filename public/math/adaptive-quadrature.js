function adap(a,b,tol,level,maxLevel,centers,allLevels){
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
            allLevels.push(level);
            return {answer: S2+(S2-S1)/15, centers,allLevels};
        }
        else{
            SL = adap(a,c,tol/2,level,maxLevel,centers,allLevels).answer;
            SR = adap(c,b,tol/2,level,maxLevel,centers,allLevels).answer;
            allLevels.push(level);
            return {answer:SL+SR,centers,allLevels}
        }
    }
}

function adaptiveQuadrature(a,b,tol,maxLevel,analyticalSolution){
    S=0;
    const result=adap(a,b,tol,0,maxLevel,[],[]);
    const resultArray=result.centers;
    resultArray.forEach(element => {
        S+=element;
    });

    if(analyticalSolution){
        const adaptiveError = Math.abs(analyticalSolution - S);
        const timesFunctionWasCalled=result.allLevels.length*5;
        topLevelReached = Math.max(...result.allLevels)
        const similarComposite = getSimilarComposite(a,b,topLevelReached, adaptiveError,analyticalSolution)
        return {
            adaptive:{
                integral:S,
                error:adaptiveError,
                timesFunctionWasCalled,
                maxL:topLevelReached
            },
            composite:similarComposite
        }
    }
    return S
}

function getSimilarComposite(a,b,maxLevel,adaptiveError,analyticalSolution){
    let l = 0;
    let r = 15*2**(maxLevel);
    console.log('xx',r)
    let prevC;
    let c = Math.ceil((l+r)*0.5);
    let compositeError = Math.abs(analyticalSolution-compositeSimpson(a,b,c));
    count=0;
    while(compositeError!=adaptiveError && prevC!=c){
        count++
        if(compositeError>adaptiveError){
            l=c;
        }else{
            r=c;
        }
        let S = compositeSimpson(a,b,c)
        prevC=c
        c = Math.ceil((l+r)*0.5);
        compositeError = Math.abs(analyticalSolution-S);
    }
    return {
        integral:S,
        error:compositeError,
        timesFunctionWasCalled:2*c+3,
        n:c
    }
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