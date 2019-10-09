
var barMargin = { top: 30, right: 3, bottom: 70, left: 40 },
  barWidth = 350,
  barHeight = 150


function attractionsPlot(data) {
  console.warn(data)
  
}
  
//  append the svg object to the body of the page
var svg2 = d3.select("#attractionsPlot")
  .append("svg")
  .attr("width", barWidth + barMargin.left + barMargin.right)
  .attr("height", barHeight + barMargin.top + barMargin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + barMargin.left + "," + barMargin.top + ")");

function updateAttractionsPlot(data) {
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
    .domain([0, 7000])
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
    .on("mouseover", function (d) {
      d3.select(this)
        .attr("fill", "orange");
    })
    .on("mouseout", function (d, i) {
      d3.select(this)
      .attr("fill", "#69b3a2");
    })
    .on("click", function (d) {
        console.log('click')
        setDataPath(d.group, d.day);
    });
}
// Initialize the plot with the first dataset
// updateAttractionsPlot(fridayNumberOfPeople)

