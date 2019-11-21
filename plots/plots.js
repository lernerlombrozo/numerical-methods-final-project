function efficientTable(x0,xf,smallH,xTitle,yTitle,tTitle,sTitle){
    var table =[[xTitle, yTitle, tTitle, sTitle]];
    for(let i = x0;i<=xf+smallH;i=i+smallH){
        table.push([i,toSolve(i.toPrecision(7)),lagrangeFromDegree(i,x0,xf,degree1),lagrangeFromDegree(i,x0,xf,degree2)])
    }
    return table;
}

let simpleChart;
function makeSimplePlot(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    var table = efficientTable(x0,xf,smallH,xT,yT,`n=${degree1}`,`n=${degree2}`)
    // console.log(table);
    
    function drawChart() {
        var data = google.visualization.arrayToDataTable(table);

        var options = {
            title: `n=${degree1} and n=${degree2}`,
            hAxis: {title: xT,  titleTextStyle: {color: '#333'}},
            vAxis: {title: yT, minValue: 0}
        };

        if(!simpleChart){
            simpleChart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        }
        simpleChart.draw(data, options);
    }
}

makeSimplePlot()
