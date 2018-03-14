# Advanced Task: Line chart with D3js 
For this task, we have got the data of the price of OIL Brent during approximately a month.
 

We are going to create a line graph about data above. For this, we have save this data in a CSV file.
To draw the line Graph we have used D3js javascript library. 

We have created four files:

    1. index.html
    2. main.js
    3. styles.css
    4. gdpesp.csv

### 1. index.html

- First let's create the basic HTML.


```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Line Chart Task Advance</title>
</head>

<body>

  <script src="http://d3js.org/d3.v3.min.js"></script>

</body>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.5/nv.d3.min.css" />
<link rel="stylesheet" href="./styles.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.2/d3.min.js" charset="utf-8"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.5/nv.d3.js"></script>
<script src="./main.js"></script>

</html>
```

### 2. main.js

Here, We create the line graph.

- Firts of all, we set the dimensions of the graph.

```javascript

var margin = { top: 60, right: 20, bottom: 90, left: 190 },
    width = 1700 - margin.left - margin.right,
    height = 670 - margin.top - margin.bottom;

```

- We parse the date and time.

```javascript
var parseDate = d3.time.format("%d-%b-%y").parse;
var formatTime = d3.time.format("%e %B");
```


- We set the ranges.
```javascript
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
```

- We define the axes.
```javascript
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(18);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(18)
    .tickFormat(d3.format("$,"));
```
- We define the line.
```javascript
var valueline = d3.svg.line()
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.close); });
```
- Now, we define the div for the tooltip.
```javascript
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.9)
    .style("left", (1800) + "px")
    .style("top", (370) + "px");
```


- We create svg object on body with their attributes.
```javascript
var svg = d3.select("body")
    .append("svg")
    .attr("width", + width + margin.left + margin.right)
    .attr("height", + height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
 ```

- We load the data from data.csv file and we create a function to get the data. Map function goes through every element, then returns the price and the date for OIL Brent.

```javascript

d3.csv("data.csv", function (error, data) {
    data.forEach(function (d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
    });

```
- Scale the domain of the data for x and y axis.

```javascript  
    x.domain(d3.extent(data, function (d) { return d.date; }));
    y.domain([40, d3.max(data, function (d) { return d.close; })]);
```

- We add the valueline path.
```javascript      
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));
```
- We add the dots and set attributes and styles. Besides, we set function "click", so that you can see the values on the right of the chart.
```javascript     
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

       
```
- We set axis x and y.
```javascript
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
```

- Adding a label at the bottom of the chart, beside x axis.
```javascript

  svg.append("g")
        .attr("transform", "translate(" + (width / 2) + ",610)")
        .append("text")
        .text("Date")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "25px" });

```

- Adding a label to the left of the chart, beside y axis.
```javascript    
   svg.append("g")
        .attr("transform", "translate(" + (margin.right - 70) + "," + (10 + height / 2) + ")rotate(-90)")
        .append("text")
        .text("Price USD Dollars")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "25px" });

```
   
- Adding a label at the top of the chart.
```javascript   
    svg.append("g")
        .attr("transform", "translate(" + (10 + width / 2) + ", -15)")
        .append("text")
        .text("Brent Oil Futures Chart")
        .style({ "text-anchor": "middle", "font-family": "Arial", "font-weight": "100", "font-size": "35px" });
```


### 3. styles.css

- Lastly, we set styles for each element of graph.

```javascript  
body { font: 12px Arial;}

path { 
    stroke: rgb(224, 13, 13);
    stroke-width: 2;
    fill: none;
}

.axis path,
.axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;
}

div.tooltip {	
    position: absolute;			
    text-align: left;			
    width: 160px;					
    height: 50px;					
    padding: 10px;				
    font: 25px sans-serif;		
    background: rgb(207, 73, 11);	
    border: 2px;		
    border-radius: 8px;			
    pointer-events: none;			
}

```
### 4. Data.csv

- File CSV, where we have saved the data.