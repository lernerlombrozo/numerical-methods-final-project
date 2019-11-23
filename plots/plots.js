function efficientTable(x0,xf,xTitle,yTitle,tTitle,sTitle){
    let smallH = (xf-x0)/smallN;
    var table =[[xTitle, yTitle, tTitle, sTitle]];
    for(let i = 0;i<=smallN;i++){
        let j = x0+i*smallH;
        table.push([j,toSolve(j),lagrangeFromDegree(j,x0,xf,degree1),lagrangeFromDegree(j,x0,xf,degree2)])
    }
    return table;
}

let simpleChart;
function makeSimplePlot(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    var table = efficientTable(x0,xf,xT,yT,`n=${degree1}`,`n=${degree2}`)
    console.log(table);
    
    function drawChart() {
        var data = google.visualization.arrayToDataTable(table);

        var options = {
            title: `Newton-Cotes n=${degree1} and n=${degree2}`,
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
