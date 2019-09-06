var fridayNumberOfPeople = [
  { group: "EarlyBirds", value: 3646 },
  { group: "MidDayPeople", value: 4000 },
  { group: "LateNighters", value: 3000 }
];

var saturdayNumberOfPeople = [
  { group: "EarlyBirds", value: 3264 },
  { group: "MidDayPeople", value: 1 },
  { group: "LateNighters", value: 20 }
];

var sundayNumberOfPeople = [
  { group: "EarlyBirds", value: 3443 },
  { group: "MidDayPeople", value: 1 },
  { group: "LateNighters", value: 20 }
];

// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

//  append the svg object to the body of the page
var svg2 = d3.select("#barPlot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// A function that create / update the plot for a given variable:
function updateBarPlot(data) {

  console.warn(fridayNumberOfPeople)
  //  X axis
  var x = d3.scaleBand()
    .range([0, width])
    .domain(fridayNumberOfPeople.map(function (d) { return d.group; }))
    .padding(0.2);
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 6000])
    .range([height, 0]);
  svg2.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));

  var bar = svg2.selectAll("rect")
    .data(data)

  bar.enter()
    .append("rect")
    .merge(bar)
    .transition()
    .duration(1000)
    .attr("x", function (d) { return x(d.group); })
    .attr("y", function (d) { return y(d.value); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return height - y(d.value); })
    .attr("fill", "#69b3a2")
}

// Initialize the plot with the first dataset
updateBarPlot(fridayNumberOfPeople)