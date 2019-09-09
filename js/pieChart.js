var width = 300
height = 300
margin = 50

var radius = Math.min(width, height) / 2 - margin

function pieChart(test) {
  this.test = test;
}
// append the svg object to the div called 'my_dataviz'
var svg1 = d3.select("#pieChart")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  console.log(svg1)
// create 2 data_set
var groupSizesFriday = { alone: 24016, two: 17064, three: 12789, four: 8668, five: 5545, six: 3948, seven: 2933, 
                          eight: 1656, moreThanEight: 2624 }

var groupSizesSaturday = { alone: 52838, two: 22750, three: 12768, four: 7648, five: 4400, six: 3150, seven: 2219, 
                        eight: 1360, moreThanEight: 3896 }

var groupSizesSunday = { alone: 67791, two: 25682, three: 13566, four: 7276, five: 3915, six: 2010, seven: 1330, 
                         eight: 832, moreThanEight: 3760 }
// set the color scale
var color = d3.scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f", "g", "h", "i"])
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

var arcGenerator = d3.arc()
  .innerRadius(radius * 1.3)
  .outerRadius(radius * 1.3);
// A function that create / update the plot for a given variable:
function updatePieChart(data) {
  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function (d) { return d.value; })
    .sort(function (a, b) { return d3.ascending(a.key, b.key); }) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data))

  // map to data
  var u = svg1.selectAll("path")
    .data(data_ready)

  u.enter()
    .append('path')
    .merge(u)
    .transition()
    .duration(1000)
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function (d) {
      return (color(d.data.key))
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)

  d3.selectAll("text").remove();

  svg1
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function (d) { return d.data.key })
    .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
    .style("text-anchor", "middle")
    .style("font-size", 17)

  // remove the group that is not present anymore
  u.exit()
    .remove()

}
// Initialize the plot with the first dataset
updatePieChart(groupSizesFriday)
