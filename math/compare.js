function makeComparissonChart(x0,xf,n){
    console.log('making comparisson chart')
    let ref;
    if(analyticalSolution) ref = analyticalSolution
    else ref= compositeSimpson(x0,xf,100000);
    const trap = trapezoid(x0,xf);
    const simp = simpson(x0,xf);
    const simp38 = simpson38(x0,xf);
    const cTrap = efficientCompositeTrapezoid(x0,xf,n);
    const cSimp = compositeSimpson(x0,xf,n);
    const cSimp38 = compositeSimpson38(x0,xf,n);
    const GQ2 = gaussianQuadrature(x0,xf,2);
    const GQ3 = gaussianQuadrature(x0,xf,3);
    const adaptVsComposite = adaptiveQuadrature(x0,xf,tol,maxLevel,ref);
    const adaptVsComposite2 = adaptiveQuadrature(x0,xf,tol2,maxLevel,ref);
    const adaptVsComposite3 = adaptiveQuadrature(x0,xf,tol3,maxLevel,ref);
    // const adaptVsComposite4 = adaptiveQuadrature(x0,xf,tol4,maxLevel,ref);
    // const adaptVsComposite5 = adaptiveQuadrature(x0,xf,tol5,maxLevel,ref);
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
        ["Gaussian Quadrature n=3", GQ3,Math.abs(ref-GQ3)],
        [`Adaptive Quadrature n=2, ε=${tol}, Lmax=${adaptVsComposite.adaptive.maxL} f(x) called ${adaptVsComposite.adaptive.timesFunctionWasCalled} times`, adaptVsComposite.adaptive.integral,adaptVsComposite.adaptive.error],
        [`Composite Newton-Cotes n=2, divisions=${adaptVsComposite.composite.n}, f(x) called ${adaptVsComposite.composite.timesFunctionWasCalled} times`, adaptVsComposite.composite.integral, adaptVsComposite.composite.error],
        [`Adaptive Quadrature n=2, ε=${tol2}, Lmax=${adaptVsComposite2.adaptive.maxL} f(x) called ${adaptVsComposite2.adaptive.timesFunctionWasCalled} times`, adaptVsComposite2.adaptive.integral,adaptVsComposite2.adaptive.error],
        [`Composite Newton-Cotes n=2, divisions=${adaptVsComposite2.composite.n}, f(x) called ${adaptVsComposite2.composite.timesFunctionWasCalled} times`, adaptVsComposite2.composite.integral, adaptVsComposite2.composite.error],
        [`Adaptive Quadrature n=2, ε=${tol3}, Lmax=${adaptVsComposite3.adaptive.maxL} f(x) called ${adaptVsComposite3.adaptive.timesFunctionWasCalled} times`, adaptVsComposite3.adaptive.integral,adaptVsComposite3.adaptive.error],
        [`Composite Newton-Cotes n=2, divisions=${adaptVsComposite3.composite.n}, f(x) called ${adaptVsComposite3.composite.timesFunctionWasCalled} times`, adaptVsComposite3.composite.integral, adaptVsComposite3.composite.error],
        // [`Adaptive Quadrature n=2, ε=${tol4}, Lmax=${adaptVsComposite4.adaptive.maxL} f(x) called ${adaptVsComposite4.adaptive.timesFunctionWasCalled} times`, adaptVsComposite4.adaptive.integral,adaptVsComposite4.adaptive.error],
        // [`Composite Newton-Cotes n=2, divisions=${adaptVsComposite4.composite.n}, f(x) called ${adaptVsComposite4.composite.timesFunctionWasCalled} times`, adaptVsComposite4.composite.integral, adaptVsComposite4.composite.error],
        // [`Adaptive Quadrature n=2, ε=${tol5}, Lmax=${adaptVsComposite5.adaptive.maxL} f(x) called ${adaptVsComposite5.adaptive.timesFunctionWasCalled} times`, adaptVsComposite5.adaptive.integral,adaptVsComposite5.adaptive.error],
        // [`Composite Newton-Cotes n=2, divisions=${adaptVsComposite5.composite.n}, f(x) called ${adaptVsComposite5.composite.timesFunctionWasCalled} times`, adaptVsComposite5.composite.integral, adaptVsComposite5.composite.error],
    ]
    return table;
}