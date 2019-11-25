function makeCompositeTable(x0,xf,n,degree,xTitle,yTitle,pTitle){
    const h = (xf-x0)/n;
    let table =[[xTitle, yTitle, pTitle]];
    for (let i=0; i<n;i++){
        let xa = x0+i*h;
        let xb = x0+(i+1)*h;
        let smallH = (xb-xa)/smallN;
        for (let j=0; j<=smallN;j++){
            let k = xa+j*smallH;
            table.push([k,toSolve(k),lagrangeFromDegree(k,xa,xb,degree)])
        }
    }
    return table;
}

let composite;
function makeCompositePlot(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    var table = makeCompositeTable(x0,xf,n,degree1,xT,yT,`n=${degree1}`)
    // console.log(table);

    function drawChart() {
    var data = google.visualization.arrayToDataTable(table);

    var options = {
        title: `Composite Newton-Cotes n=${degree1}, divisions=${n}`,
        hAxis: {title: xT,  titleTextStyle: {color: '#333'}},
        vAxis: {title: yT, minValue: 0}
    };

    if(!composite){
        composite = new google.visualization.AreaChart(document.getElementById('composite_chart_div'));
    }
    composite.draw(data, options);
    }
}

let composite2;
function makeCompositePlot2(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    var table = makeCompositeTable(x0,xf,n,degree2,xT,yT,`n=${degree2}`)
    console.log(table);

    function drawChart() {
    var data = google.visualization.arrayToDataTable(table);

    var options = {
        title: `Composite Newton-Cotes n=${degree2}, divisions=${n}`,
        hAxis: {title: xT,  titleTextStyle: {color: '#333'}},
        vAxis: {title: yT, minValue: 0}
    };

    if(!composite2){
        composite2 = new google.visualization.AreaChart(document.getElementById('composite_2_chart_div'));
    }
    composite2.draw(data, options);
    }
}

makeCompositePlot();
makeCompositePlot2();