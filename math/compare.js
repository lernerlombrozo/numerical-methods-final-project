function makeComparissonChart(x0,xf,h){
    console.log('here')
    const ref = compositeSimpson(x0,xf,0.00001);
    console.log('here')
    const trap = trapezoid(x0,xf);
    const simp = simpson(x0,xf);
    const simp38 = simpson38(x0,xf);
    const cTrap = compositeTrapezoid(x0,xf,h)
    const cSimp = compositeTrapezoid(x0,xf,h)
    const cSimp38 = compositeTrapezoid(x0,xf,h)
    const GQ2 = gaussianQuadrature(x0,xf,2)
    const GQ3 = gaussianQuadrature(x0,xf,3)
    const table = [
        ['Method',`integral from ${x0} to ${xf}`,'error'],
        ["Reference (composite n=2 h=0.00001", ref,null],
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