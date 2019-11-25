function adaptive(a,b,tol,level,maxLevel){
    level++;
    let c=(a+b)/2;
    let S1 = simpson(a,b);
    let S2 = simpson(a,c) + simpson(c,b);
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
            return {answer: S2+(S2-S1)/15, centers}
        }
        else{
            SL = adaptiveTable(a,c,tol/2,level,maxLevel,centers).answer;
            SR = adaptiveTable(c,b,tol/2,level,maxLevel,centers).answer;
            return {answer:SL+SR,centers}
        }
    }
}