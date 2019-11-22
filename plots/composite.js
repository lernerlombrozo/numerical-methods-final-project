function makeCompositeTable(x0,xf,h,degree,smallH,xTitle,yTitle,pTitle){
    var table =[[xTitle, yTitle, pTitle]];
    for(let i = x0;i<xf;i=i+h){
        let xb = i+h;
        for(let j = i;j<xb;j=j+smallH){
            table.push([j,toSolve(j.toPrecision(7)),lagrangeFromDegree(j,i,xb,degree)])
        }
    }
    return table;
}

let composite;
function makeCompositePlot(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    var table = makeCompositeTable(x0,xf,h,degree1, smallH,xT,yT,`n=${degree1}`)
    // console.log(table);

    function drawChart() {
    var data = google.visualization.arrayToDataTable(table);

    var options = {
        title: `Composite Newton-Cotes n=${degree1}`,
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

    var table = makeCompositeTable(x0,xf,h,degree2,smallH,xT,yT,`n=${degree2}`)
    // console.log(table);

    function drawChart() {
    var data = google.visualization.arrayToDataTable(table);

    var options = {
        title: `Composite Newton-Cotes n=${degree2}`,
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