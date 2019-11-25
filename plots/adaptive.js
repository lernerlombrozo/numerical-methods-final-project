function getAdaptiveTable(a,b,tol,level,maxLevel,centers,xTitle,yTitle){
    let rawData = adaptiveTable(a,b,tol,level,maxLevel,centers);
    let orderedCenters=rawData.centers.sort(function(a, b) { 
        return a[1] > b[1] ? 1 : -1;
    });
    minData=[];
    let x= a;
    let maxInRange=orderedCenters[0];
    for(let i=1;i<orderedCenters.length;i++){
        if(orderedCenters[i][1]==maxInRange[1]){
            if(orderedCenters[i][0]>maxInRange[0]){
                maxInRange = orderedCenters[i]; 
            }
        } else{
            minData.push(maxInRange);
            maxInRange =orderedCenters[i]; 
            if(i==orderedCenters.length-1){
                minData.push(maxInRange);  
            }
        } 
    }
    let maxLevelObtained=0;
    let minLevelObtained=maxLevel;
    for(let i = 0; i< minData.length;i++){
        if(minData[i][0]>maxLevelObtained){
            maxLevelObtained=minData[i][0]
        }
        if(minData[i][0]<minLevelObtained){
            minLevelObtained=minData[i][0]
        }
    }
    console.log({maxLevelObtained,minLevelObtained})
    let table =[[xTitle, yTitle]];
    for (let w=minLevelObtained; w<=maxLevelObtained;w++){
        console.log(w)
        table[0].push(`h/${w}`);
    };
    console.log({table})
    for(let i=0;i<minData.length;i++){
        let xa = minData[i][1]
        let smallH = (minData[i][2]-minData[i][1])/smallN;
        for (let j=0; j<=smallN;j++){
            let k = xa+j*smallH;
            let l = lagrangeFromDegree(k,minData[i][1],minData[i][2],2);
            currentLine=[k,toSolve(k)]
            for (let w=minLevelObtained; w<=maxLevelObtained;w++){
                if(w==minData[i][0]){
                    currentLine.push(l)
                }else{
                    currentLine.push(null);
                }
            };
            table.push(currentLine)
        }
    }
    return table
}

let adaptiveChart;
function makeAdaptivePlot(){
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    
    var table = getAdaptiveTable(x0,xf,tol,0, 10, [],xT, yT,`n=${degree1}`,`n=2, ε=${tol}, max level=${maxLevel}`)
    // table=[
    //     ['a','b','c'],
    //     [1,2,3],
    //     [1,2,3],
    //     [2,3,4],
    //     [3,4,5]
    // ]
    console.log(table);
    
    function drawChart() {
        var data = google.visualization.arrayToDataTable(table);

        var options = {
            title: `Adaptive Quadrature ε=${tol}, Max level=${maxLevel}`,
            hAxis: {title: xT,  titleTextStyle: {color: '#333'}},
            vAxis: {title: yT, minValue: 0},
            // interpolateNulls: true,
        };

        if(!adaptiveChart){
            adaptiveChart = new google.visualization.AreaChart(document.getElementById('adaptive_chart_div'));
        }
        adaptiveChart.draw(data, options);
    }
}

makeAdaptivePlot()