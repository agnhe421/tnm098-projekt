var width = 350
height = 350
margin = 40

var radius = Math.min(width, height) / 2 - margin

function pieChart(test) {
    this.test = test;
}

console.warn('initializing piechart')
    //Note to self:
    //Det fungerar inte att byta dataset av någon anlednign - Fixa det
    //Koppla knapparna för pie-chartet till de stora knapparna för dagarna
    //Se till så att datan kommer från faktisk data och inte hårdkodat i componenten
    //Bestäm vad som ska visas i bar-charten längst ner till höger 
    //Koppla knapparna för bar-charten till de stora kanpparna för dagarna
    //Generera faktisk data 

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#pieChart")
.append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// create 2 data_set
var data11 = {a: 9, b: 20, c:30, d:8, e:12}
var data22 = {a: 6, b: 16, c:20, d:14, e:19, f:12}

// set the color scale
var color = d3.scaleOrdinal()
.domain(["a", "b", "c", "d", "e", "f"])
.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])


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

// remove the group that is not present anymore
u.exit()
.remove()

}

// Initialize the plot with the first dataset
updatePieChart(data11)