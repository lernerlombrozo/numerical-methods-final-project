function efficientTable(x0,xf,h,xTitle,yTitle,tTitle,sTitle){
    var table =[[xTitle, yTitle, tTitle, sTitle]];
    for(let i = x1;i<=x2+h;i=i+h){
        table.push([i,toSolve(i.toPrecision(7)),m*i+b,lagrange(i,[x1,x2,x3])])
    }
    return table;
}

let simpleChart;
function makeSimplePlot(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    // var x = x(x0,x1,h)
    // var y = fOfX(x0,x1,h);
    // var t = trapezoid(x0,x1,h);

    // var table = makeTable(x,y,t,xT, yT, tT)
    var table = efficientTable(x0,x1,null,smallH,xT,yT,tT,sT)
    console.log(table);
    
    function drawChart() {
        var data = google.visualization.arrayToDataTable(table);

        var options = {
            title: "Trapezoidal rule vs simpson's 3/8 rule",
            hAxis: {title: xT,  titleTextStyle: {color: '#333'}},
            vAxis: {title: yT, minValue: 0}
        };

        if(!simpleChart){
            console.log('here')
            simpleChart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        }
        simpleChart.draw(data, options);
    }
}

makeSimplePlot()
