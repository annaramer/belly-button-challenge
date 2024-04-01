// Function to fetch data from samples.json
function fetchData() {
    return fetch("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json")
        .then(response => response.json()) // Parse response as JSON
        .catch(error => {
            console.error("Error fetching data:", error); 
            throw error; 
        });
}

// Function to initialize the dashboard for loading data from samples.json
function init() {
    fetchData()
        .then(data => {
            console.log("Loaded data:", data); 
            
        // Extract data and Populate the dropdown menu
            var names = data.names;
            var selectDropdown = d3.select("#selDataset");
            names.forEach(name => {
                selectDropdown.append("option").text(name).property("value", name);
            }); 
            var firstID = names[0];
            optionChanged(firstID); 
        });
}

// Function to handle dropdown change and extract weekly washing frequency based on the selected ID
function optionChanged(selectedID) {
    fetchData()
        .then(data => {
            var metadata = data.metadata.find(item => item.id == selectedID);
            var wfreq = metadata ? metadata.wfreq : 0; 
            plotGauge(wfreq);
        });
}

// Function to plot the Gauge Chart
function plotGauge(wfreq) {
    var level = parseInt(wfreq);
    var degrees = 180 - (level * 20),
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    var mainPath = 'M -.0 -0.05 L .0 0.05 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [
        { type: 'scatter',
        x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'speed',
            text: level,
            hoverinfo: 'text+name'},
        { values: [1,1,1,1,1,1,1,1,1,9],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                                'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                                'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                                'rgba(242, 241, 236, .5)', 'rgba(243, 240, 239, .5)',
                                'rgba(245, 243, 240, .5)', 'rgba(255, 255, 255, 0)']},
        labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1', ''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
    }];

    var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
        height: 400,
        width: 400,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);
}

// Initialize the dashboard
init();
