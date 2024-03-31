// Function to initialize the dashboard for loading data from samples.json
function init() {
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => {
        console.log("Loaded data:", data); // Log loaded data

        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        // Extract necessary data
        var names = data.names;
        var samples = data.samples;
        var metadata = data.metadata;

        // Populate the dropdown menu with test subject IDs
        var selectDropdown = d3.select("#selDataset");
        names.forEach(name => {
            selectDropdown.append("option").text(name).property("value", name);
        });

        // Initialize the dashboard with the first test subject ID
        var firstID = names[0];
        updatePlots(firstID, samples, metadata);

        // Add event listener for dropdown change
        selectDropdown.on("change", function() {
            var selectedID = d3.select(this).property("value");
            updatePlots(selectedID, samples, metadata);
        });
    });
}


// Function to update the bar chart
function updateBarChart(selectedSample) {
    // Extract top 10 OTUs
    var otuIDs = selectedSample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    var sampleValues = selectedSample.sample_values.slice(0, 10).reverse();
    var otuLabels = selectedSample.otu_labels.slice(0, 10).reverse();

    // Create trace for horizontal bar chart
    var trace = {
        x: sampleValues,
        y: otuIDs,
        text: otuLabels,
        type: "bar",
        orientation: "h"
    };

    // Data for the plot
    var data = [trace];

    // Layout for the plot
    var layout = {
        title: "Top 10 OTUs Found",
        yaxis: { title: "OTU ID" }
    };

    // Plot the chart
    console.log("Bar Chart Data:", data);
    Plotly.newPlot("bar", data, layout);
}

// Function to update the bubble chart
function updateBubbleChart(selectedSample) {
    // Create trace for bubble chart
    var trace = {
        x: selectedSample.otu_ids,
        y: selectedSample.sample_values,
        text: selectedSample.otu_labels,
        mode: 'markers',
        marker: {
            size: selectedSample.sample_values,
            color: selectedSample.otu_ids,
            colorscale: 'Earth'
        }
    };

    // Data for the plot
    var data = [trace];

    // Layout for the plot
    var layout = {
        xaxis: { title: 'OTU IDs' },

    };

    // Plot the chart
    console.log("Bubble Chart Data:", data);
    Plotly.newPlot('bubble', data, layout);
}

// Function to display sample metadata
function displayMetadata(metadata) {
    var metadataPanel = d3.select("#sample-metadata");
    metadataPanel.html(""); // Clear previous metadata

    // Iterate over each key-value pair in metadata
    Object.entries(metadata).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
    });
}

// Function to update all plots and metadata based on the selected test subject ID
function updatePlots(selectedID, samples, metadata) {
    var selectedSample = samples.filter(sample => sample.id === selectedID)[0];
    console.log("Selected Sample:", selectedSample);
    updateBarChart(selectedSample);
    updateBubbleChart(selectedSample);
    displayMetadata(metadata.filter(meta => meta.id.toString() === selectedID)[0]);
}

// Select the element with the correct class 
var demographicInfo = document.querySelector('.card-header');

// Change background color and font color - apply styles
demographicInfo.style.backgroundColor = "#1f77b4";
demographicInfo.style.color = 'white';


// Initialize the dashboard
init();
