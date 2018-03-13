// Set the dimensions of the canvas / graph
var margin = { top: 60, right: 20, bottom: 90, left: 190 },
    width = 1700 - margin.left - margin.right,
    height = 670 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.time.format("%d-%b-%y").parse;
var formatTime = d3.time.format("%e %B");

// Set the ranges
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(18);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(18)
    .tickFormat(d3.format("$,"));

// Define the line
var valueline = d3.svg.line()
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.close); });

// Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.9)
    .style("left", (1800) + "px")
    .style("top", (370) + "px");

// Adds the svg canvas
var svg = d3.select("body")
    .append("svg")
    .attr("width", + width + margin.left + margin.right)
    .attr("height", + height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data.csv", function (error, data) {
    data.forEach(function (d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function (d) { return d.date; }));
    y.domain([40, d3.max(data, function (d) { return d.close; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the scatterplot
    svg.selectAll("dot")
        .data(data)
        .enter().append("circle")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d.date); })
        .attr("cy", function (d) { return y(d.close); })
        .style("fill", "#fff8ee")
        .style("opacity", .8)
        .style("stroke", "#f93")
        .style("stroke-width", 3.5)
        .on("click", function (d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(formatTime(d.date) + "<br/>" + '$' + d.close)
                .style("left", (1800) + "px")
                .style("top", (370) + "px");
        });

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    //adding a label to the left of the chart, beside x axis
    svg.append("g")
        .attr("transform", "translate(" + (width / 2) + ",610)")
        .append("text")
        .text("Date")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "25px" });

    //adding a label to the left of the chart, beside y axis
    svg.append("g")
        .attr("transform", "translate(" + (margin.right - 70) + "," + (10 + height / 2) + ")rotate(-90)")
        .append("text")
        .text("Price USD Dollars")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "25px" });

    //adding a label at the top of the chart
    svg.append("g")
        .attr("transform", "translate(" + (10 + width / 2) + ", -15)")
        .append("text")
        .text("Brent Oil Futures Chart")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "35px" });

});
