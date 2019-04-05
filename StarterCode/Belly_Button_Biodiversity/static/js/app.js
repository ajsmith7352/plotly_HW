function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var defaultURL = '/metadata/${sample}';
        d3.json(defaultURL).then(function(sample) {
             var sampleMetaData = d3.select(#sample-metadata");
            // Use `.html("") to clear any existing metadata
             sampleMetaData.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sample.forEach(function ([key, value]) {
        var row = sampleMetaData.append("tr");
        row.text('${key}: ${value}');
    });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
});

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json(url).then(function(data) {
    // @TODO: Build a Bubble Chart using the sample data
        //using the sample_metadata,otu_ids, otu_labels, and sample_values objects defined in the app.py
        var x = data.otu_ids;
        var y = data.sample_values;
        var markerSize = data.sample_values;
        var markerColor = data.otu_ids;
        var text =data.otu_labels;
    //fill in the 'parameters(?)' of the bubble chart using the variables established above   
        var bubbleChart = {
            type: 'bubble',
            x: x,
            y: y,
            mode: 'markers',
            text: text,
            marker: {
                size: markerSize,
                color: markerColor,
            }
        };
        var dataBubble = [bubbleData];
        var bubbleLayout = {
            xaxis: {title: "OTU_IDs"},
        };
        // using the objects to fill in (Dom node, data, layout)
    Plotly.newPlot("bubble", dataBubble, bubbleLayout);
    });
    //@TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    d3.json(defaultURLB).then(function(data) {
        var pieLabels = data.otu_ids.slice(0,10);
        var pieValues = data.sample_values.slice(0,10);
        var pieHovers = data.otu_labels.slice(0,10);
        
        var pieData = [{
            value: pieValues,
            labels: pieLabels,
            text: pieHovers,
            type: 'pie',
        }];
        var pieLayout = {height: 500,
                         width: 500,
                        };
        Plotly.newPlot("pie", pieData, pieLayout);
    });

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
