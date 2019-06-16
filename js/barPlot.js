// create 2 data_set
var data1 = [
    {group: "Aa", value: 4},
    {group: "Bb", value: 16},
    {group: "Cc", value: 8}
 ];
 
 var data2 = [
    {group: "Aa", value: 7},
    {group: "Bb", value: 1},
    {group: "Cc", value: 20}
 ];
 
 console.error('initializing bar plot')
 // set the dimensions and margins of the graph
 var margin = {top: 30, right: 30, bottom: 70, left: 60},
     width = 460 - margin.left - margin.right,
     height = 400 - margin.top - margin.bottom;
 
//  append the svg object to the body of the page
 var svg = d3.select("#barPlot")
   .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
   .append("g")
     .attr("transform",
           "translate(" + margin.left + "," + margin.top + ")");
 
//  X axis
 var x = d3.scaleBand()
   .range([ 0, width ])
   .domain(data1.map(function(d) { return d.group; }))
   .padding(0.2);
 svg.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x))
 
 // Add Y axis
 var y = d3.scaleLinear()
   .domain([0, 20])
   .range([ height, 0]);
 svg.append("g")
   .attr("class", "myYaxis")
   .call(d3.axisLeft(y));

   // A function that create / update the plot for a given variable:
   function update(data) {
     console.error('Updating bar plot')

     var bar = svg.selectAll("rect")
     .data(data)
 
     bar.enter()
     .append("rect")
     .merge(bar)
     .transition()
     .duration(1000)
       .attr("x", function(d) { return x(d.group); })
       .attr("y", function(d) { return y(d.value); })
       .attr("width", x.bandwidth())
       .attr("height", function(d) { return height - y(d.value); })
       .attr("fill", "#69b3a2")
 }
 
 // Initialize the plot with the first dataset
 update(data1)