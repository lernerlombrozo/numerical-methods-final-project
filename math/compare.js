function makeComparissonChart(x0,xf,n){
    console.log('making comparisson chart')
    let ref;
    if(analyticalSolution) ref = analyticalSolution
    else ref= compositeSimpson(x0,xf,100000);
    const trap = trapezoid(x0,xf);
    const simp = simpson(x0,xf);
    const simp38 = simpson38(x0,xf);
    // const cTrap = compositeTrapezoid(x0,xf,n)
    const cTrap = efficientCompositeTrapezoid(x0,xf,n)
    const cSimp = compositeSimpson(x0,xf,n)
    // const cSimp2 = efficientCompositeSimpson(x0,xf,n)
    // console.log('i',cSimp,'e',cSimp2);
    const cSimp38 = compositeSimpson38(x0,xf,n)
    const GQ2 = gaussianQuadrature(x0,xf,2)
    const GQ3 = gaussianQuadrature(x0,xf,3)
    const table = [
        ['Method',`integral from ${x0} to ${xf}`,'error'],
        [`Reference: ${analyticalSolution? 'analytical solution': '(composite n=2 divisions=100000)' }`, ref,null],
        ["Newton-Cotes n=1",trap ,Math.abs(ref-trap)],
        ["Newton-Cotes n=2", simp, Math.abs(ref-simp)],
        ["Newton-Cotes n=3", simp38,Math.abs(ref-simp38)],
        [`Composite Newton-Cotes n=1, divisions=${n}`,cTrap ,Math.abs(ref-cTrap)],
        [`Composite Newton-Cotes n=2, divisions=${n}`, cSimp, Math.abs(ref-cSimp)],
        [`Composite Newton-Cotes n=3, divisions=${n}`,cSimp38 ,Math.abs(ref-cSimp38)],
        ["Gaussian Quadrature n=2", GQ2,Math.abs(ref-GQ2)],
        ["Gaussian Quadrature n=3", GQ3,Math.abs(ref-GQ3)]
    ]
    return table;
}