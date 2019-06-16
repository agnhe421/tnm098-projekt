var width = 500
height = 500
margin = 100

var radius = Math.min(width, height) / 2 - margin

function pieChart(test) {
    this.test = test;
}

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#pieChart")
.append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// create 2 data_set
var groupSizesFriday = { alone: 24016, twoToThree: 8532, threeToFour:6430, moreThanFour:2721 }
var groupSizesSaturday = { alone: 52838, twoToThree: 11375, threeToFour:6168, moreThanFour:2379 }
var groupSizesFriday = { alone: 67791, twoToThree: 12841, threeToFour:6341, moreThanFour:1882 }


// set the color scale
var color = d3.scaleOrdinal()
.domain(["a", "b", "c", "d", "e", "f"])
.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

// // shape helper to build arcs:
// var arcGenerator = d3.arc()
//   .innerRadius(0)
//   .outerRadius(radius)

  var arcGenerator = d3.arc()
	.innerRadius(radius * 1.3)
  .outerRadius(radius * 1.3);
// A function that create / update the plot for a given variable:
function updatePieChart(data) {

console.warn('updating piechart')

// Compute the position of each group on the pie:
var pie = d3.pie()
.value(function(d) { return d.value; })
.sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
var data_ready = pie(d3.entries(data))

// map to data
var u = svg.selectAll("path")
.data(data_ready)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
u.enter()
.append('path')
.merge(u)
.transition()
.duration(1000)
.attr('d', d3.arc()
  .innerRadius(0)
  .outerRadius(radius)
)
.attr('fill', function(d){
  console.warn('d', d)
  return(color(d.data.key)) })
.attr("stroke", "white")
.style("stroke-width", "2px")
.style("opacity", 1)

svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data.key})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 17)
// remove the group that is not present anymore
u.exit()
.remove()

}

// Initialize the plot with the first dataset
updatePieChart(groupSizesFriday)
