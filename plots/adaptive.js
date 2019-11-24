function getAdaptiveTable(x0,xf,tol,level,maxLevel,xTitle,yTitle,pTitle){
    let rawData= adaptiveTable(x0,xf,tol,level,maxLevel,[]);
}

let adaptiveChart;
function makeAdaptivePlot(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    
    var table = getAdaptiveTable(x0,xf,xT,yT,`n=${degree1}`,`n=${degree2}`)
    // console.log(table);
    
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

makeAdaptivePlot()