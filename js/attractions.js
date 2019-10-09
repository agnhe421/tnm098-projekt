
var barMargin = { top: 10, right: 30, bottom: 30, left: 60 },
  barWidth = 460 - barMargin.left - barMargin.right,
  barHeight = 450 - barMargin.left - barMargin.right

function attractionsPlot(data) {
  console.warn(data)
  updateAttractionsPlot(data)
}
  
//  append the svg object to the body of the page
var svgAttractions = d3.select("#attractionsPlot")
  .append("svg")
  .attr("width", barWidth + barMargin.left + barMargin.right)
  .attr("height", barHeight + barMargin.top + barMargin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + barMargin.left + "," + barMargin.top + ")");

function updateAttractionsPlot(data) {
  var x = d3.scaleBand()
    .range([0, barWidth])
    .domain(data.map(function (d) { 
       return d.checkins; 
     }))
    .padding(0.2);
  svgAttractions.append("g")
    .attr("transform", "translate(0," + barHeight + ")")
    .call(d3.axisBottom(x))

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.checkins; })])
    .range([barHeight, 0]);

    svgAttractions.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));

  var bar = svgAttractions.selectAll("rect")
    .data(data)

  bar.enter()
    .append("rect")
    .merge(bar)
    .transition()
    .duration(1000)
    .attr("x", function (d) { return x(d.checkins); })
    .attr("y", function (d) { return y(d.checkins); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return barHeight - y(d.checkins);})
    .attr("fill", "#69b3a2")
    .style('pointer-events', 'all')
}
// Initialize the plot with the first dataset
// updateAttractionsPlot(fridayNumberOfPeople)

