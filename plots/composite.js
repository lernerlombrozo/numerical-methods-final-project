function makeCompositeTable(x1,x2,x3,h,smallH,xTitle,yTitle,tTitle,sTitle){
    var table =[[xTitle, yTitle, tTitle, sTitle]];
    for(let i = x1;i<x2;i=i+h){
        let xb = i+h;
        let y1 = toSolve(i);
        let y2 = toSolve(xb);
        let m = (y2-y1)/(xb-i);
        let b = y1 - m*i;
        for(let j = i;j<xb;j=j+smallH){
            table.push([j,toSolve(j.toPrecision(7)),m*j+b,i])
        }
    }
    return table;
}

let composite;
function makeCompositePlot(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    // console.log(n)
    var table = makeCompositeTable(x0,x1,null,h,smallH,xT,yT,tT,sT)
    console.log(table);

    function drawChart() {
    var data = google.visualization.arrayToDataTable(table);

    var options = {
        title: "Composite Trapezoidal Rule vs Simpson's 3/8 Rule",
        hAxis: {title: xT,  titleTextStyle: {color: '#333'}},
        vAxis: {title: yT, minValue: 0}
    };

    if(!composite){
        var composite = new google.visualization.AreaChart(document.getElementById('composite_chart_div'));
    }
    composite.draw(data, options);
    }
}

makeCompositePlot()