
var barMargin = { top: 10, right: 30, bottom: 30, left: 60 },
  barWidth = 460 - barMargin.left - barMargin.right,
  barHeight = 450 - barMargin.left - barMargin.right

function attractionsPlot(data) {
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
    // Add Y axis
  var y = d3.scaleLinear()
  .domain([0, 60])
  .range([barHeight, 0]);

  svgAttractions.append("g")
  .attr("class", "myYaxis")
  .call(d3.axisLeft(y));

  var x = d3.scaleBand()
    .range([0, barWidth])
    .domain(data.map(function (d) {
      return d.name;
    }))
    .padding(0.2);
  svgAttractions.append("g")
    .attr("transform", "translate(0," + barHeight + ")")
    .call(d3.axisBottom(x))

  var bar = svgAttractions.selectAll("rect")
    .data(data)

  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text('tooltip')

  bar.enter()
    .append("rect")
    .merge(bar)
    .transition()
    .duration(1000)
    .attr("x", function (d) { return x(d.name); })
    .attr("y", function (d) { return y(d.ratio); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return barHeight - y(d.ratio); })
    .attr("fill", "#69b3a2")
    .style('pointer-events', 'all')

    svgAttractions.selectAll('rect')
    .data(data)
    .on("mouseover", function(d) {
      d3.select(this)
      .attr("fill", "orange");
      tooltip.html('name: ' + d.name + '<br>' + 'ratio: '+ d.ratio + '<br>' + 'checkins: ' + d.checkins )
      tooltip.style('background-color', 'LightSteelBlue')
      .style('border-radius', '5px')
      .style('padding', '5px');	

      return tooltip.style("visibility", "visible");
    })
    .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function() {
      d3.select(this)
      .attr("fill", "#69b3a2");
      return tooltip.style("visibility", "hidden");
    });

}

