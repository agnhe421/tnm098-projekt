
var fridayNumberOfPeople = [
  { group: "8-9", value: 3557 },
  { group: "9-10", value: 3453 },
  { group: "10-11", value: 3456 },
  { group: "11-12", value: 3456 },
  { group: "12-13", value: 3456 },
  { group: "13-14", value: 3456 },
  { group: "14-15", value: 3456 },
  { group: "15-16", value: 3456 },
  { group: "16-17", value: 3456 },
  { group: "17-18", value: 3456 },
  { group: "18-19", value: 3456 },
  { group: "19-20", value: 3456 },
  { group: "20-21", value: 3456 },
  { group: "21-22", value: 3456 },
  { group: "22-23", value: 3456 }
];

var saturdayNumberOfPeople = [
  { group: "8-9", value: 3557 },
  { group: "9-10", value: 3456 },
  { group: "10-11", value: 3456 },
  { group: "11-12", value: 3456 },
  { group: "12-13", value: 3456 },
  { group: "14-14", value: 3456 },
  { group: "13-14", value: 3456 },
  { group: "14-15", value: 3456 },
  { group: "15-16", value: 3456 },
  { group: "16-17", value: 3456 },
  { group: "17-18", value: 3456 },
  { group: "18-19", value: 3456 },
  { group: "19-20", value: 3456 },
  { group: "20-21", value: 3456 },
  { group: "21-22", value: 3456 },
  { group: "22-23", value: 3456 }
];

var sundayNumberOfPeople = [
  { group: "8-9", value: 3557 },
  { group: "9-10", value: 3456 },
  { group: "10-11", value: 3456 },
  { group: "11-12", value: 3456 },
  { group: "12-13", value: 3456 },
  { group: "13-14", value: 3456 },
  { group: "13-14", value: 3456 },
  { group: "14-15", value: 3456 },
  { group: "15-16", value: 3456 },
  { group: "16-17", value: 3456 },
  { group: "17-18", value: 3456 },
  { group: "18-19", value: 3456 },
  { group: "19-20", value: 3456 },
  { group: "20-21", value: 3456 },
  { group: "21-22", value: 3456 },
  { group: "22-23", value: 3456 }
];

var barMargin = { top: 30, right: 3, bottom: 70, left: 40 },
  barWidth = 350,
  barHeight = 150

//  append the svg object to the body of the page
var svg2 = d3.select("#barPlot")
  .append("svg")
  .attr("width", barWidth + barMargin.left + barMargin.right)
  .attr("height", barHeight + barMargin.top + barMargin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + barMargin.left + "," + barMargin.top + ")");

// A function that create / update the plot for a given variable:
function updateBarPlot(data) {
  //  X axis
  var x = d3.scaleBand()
    .range([0, barWidth])
    .domain(fridayNumberOfPeople.map(function (d) { return d.group; }))
    .padding(0.2);
  svg2.append("g")
    .attr("transform", "translate(0," + barHeight + ")")
    .call(d3.axisBottom(x))

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 7500])
    .range([barHeight, 0]);

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
    .attr("height", function (d) { return barHeight - y(d.value); })
    .attr("fill", "#69b3a2")
    .style('pointer-events', 'all')

  svg2.selectAll('rect')
    .data(data)
    .on("mouseover", function () {
      d3.select(this)
        .attr("fill", "red");
    })
    .on("mouseout", function (d, i) {
      d3.select(this)
      .attr("fill", "#69b3a2");
    })
    .on("click", function () {
        console.log('click')
        setDataPath('hejsan');
    });
}
// Initialize the plot with the first dataset
updateBarPlot(fridayNumberOfPeople)
