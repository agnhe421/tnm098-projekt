var width2 = 300
height2 = 300
margin2 = 50

var radius = Math.min(width2, height2) / 2 - margin2

function pieChart(data) {
  updatePieChart(data);
}
// append the svg object to the div called 'my_dataviz'
var svg1 = d3.select("#pieChart")
  .append("svg")
  .attr("width", width2)
  .attr("height", height2)
  .append("g")
  .attr("transform", "translate(" + width2 / 2 + "," + height2 / 2 + ")");
/*
// create 2 data_set
var groupSizesFriday = { alone: 24016, two: 17064, three: 12789, four: 8668, five: 5545, six: 3948, seven: 2933, 
                          eight: 1656, moreThanEight: 2624 }

var groupSizesSaturday = { alone: 52838, two: 22750, three: 12768, four: 7648, five: 4400, six: 3150, seven: 2219, 
                        eight: 1360, moreThanEight: 3896 }

var groupSizesSunday = { alone: 67791, two: 25682, three: 13566, four: 7276, five: 3915, six: 2010, seven: 1330, 
                         eight: 832, moreThanEight: 3760 }*/


// set the color scale
var color = d3.scaleOrdinal()
  .domain(["a", "b", "c", "d", "e", "f", "g", "h", "i"])
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

var arcGenerator = d3.arc()
  .innerRadius(radius * 1.3)
  .outerRadius(radius * 1.3);
// A function that create / update the plot for a given variable:
function updatePieChart(data) {
  
  let tourGroup = 0;
  // Compute the position of each group on the pie:
  var pie = d3.pie() //d.value.length is the number of groups in the category, d.value[0].length is the group size
    .value(function (d) { /*console.log(d.value[0].length*d.value.length);*/
      if (d.value[0].length < 100) {
        return (d.value.length*d.value[0].length);}
    })
    .sort(function (d) { return d.value[0].length; })//
  var data_ready = pie(d3.entries(data))

  var tooltip1 = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .text('tooltip1')

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
      return(color(d.data.value[0].length))//(color(d.data[0]))
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1)
    
    
    svg1.selectAll("path")
      .data(data_ready)
      .on("mouseover", function (d) {
      d3.select(this)
        .attr("fill", "orange");
    
      tooltip1.html('Size of group: ' + d.data.value[0].length + '<br>' + 'Number of groups: '+ d.data.value.length + '<br>' )
      tooltip1.style('background-color', 'LightSteelBlue')
      .style('border-radius', '5px')
      .style('padding', '5px');
      console.log('Size of group: ' + d.data.value[0].length + '\n' + 'Number of groups: '+ d.data.value.length + '\n')

      return tooltip1.style("visibility", "visible");
    })
    .on("mouseout", function (d, i) {
      d3.select(this)
      .attr("fill", function (d) {
        tooltip1.style("visibility", "hidden");
        return(color(d.data.value[0].length))
      });
    })
    .on("mousemove", function(){return tooltip1.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
    .on("click", function (d) {
        /*setDataPath(d.group, d.day);*/
      console.log(d.data);
      })

  d3.selectAll("text").remove();

  svg1
    .selectAll('mySlices')
    .data(data_ready)
    .enter()
    .append('text')
    .text(function (d) { if(d.data.value[0].length < 25){ 
                            return ( d.data.value[0].length );} })
    .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
    .style("text-anchor", "middle")
    .style("font-size", 17)

  // remove the group that is not present anymore
  u.exit()
    .remove()

}
// Initialize the plot with the first dataset

