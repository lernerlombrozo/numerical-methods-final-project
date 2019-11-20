function makeCompositeTable(x0,xf,h,smallH,xTitle,yTitle,tTitle,sTitle){
    var table =[[xTitle, yTitle, tTitle, sTitle]];
    for(let i = x0;i<xf;i=i+h){
        let xb = i+h;
        for(let j = i;j<xb;j=j+smallH){
            table.push([j,toSolve(j.toPrecision(7)),lagrangeFromDegree(j,i,xb,degree1),lagrangeFromDegree(j,i,xb,degree2)])
        }
    }
    return table;
}

let composite;
function makeCompositePlot(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    // console.log(n)
    var table = makeCompositeTable(x0,xf,h,smallH,xT,yT,`n=${degree1}`,`n=${degree2}`)
    console.log(table);

    function drawChart() {
    var data = google.visualization.arrayToDataTable(table);

    var options = {
        title: `n=${degree1} and n=${degree2}`,
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