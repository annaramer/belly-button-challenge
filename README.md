# Belly Button Biodiversity Dashboard

## Project Overview
This project focuses on building an interactive dashboard to explore the Belly Button Biodiversity dataset. The following components were implemented:

### Data Integration
- Utilized the D3 library to read the `samples.json` file from the provided URL: https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json

### Bar Chart
- Created a horizontal bar chart to display the top 10 Operational Taxonomic Units (OTUs) found in an individual.
- Utilized `sample_values` as bar values, `otu_ids` as labels, and `otu_labels` for hovertext.
- Ensured the chart updates dynamically when a new sample is selected.

### Bubble Chart
- Developed a bubble chart to visualize each sample, using `otu_ids` for x-values, `sample_values` for y-values and marker size, `otu_ids` for marker colors, and `otu_labels` for text values.
- Ensured the chart updates dynamically upon selecting a new sample.

### Metadata Display
- Displayed an individual's demographic information showing each key-value pair from the metadata JSON object.
- Ensured the metadata updates accordingly when a new sample is selected.

## Files
- `index.html`: HTML file containing the structure of the dashboard.
- Displays the visualizations and metadata generated from the JavaScript files (`app.js` and `bonus.js`).
- Provides the user interface for interacting with the dashboard and selecting samples.

## Credits
- This project was completed by Anna Ramer.
- The Gauge Chart code used in this project was developed using the interactive tools and examples provided on [Plotly - Gauge Charts](https://plotly.com/javascript/gauge-charts).

