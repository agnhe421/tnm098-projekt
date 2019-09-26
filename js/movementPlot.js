// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


  // append the svg object to the body of the page
var svg = d3.select("#movement")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
  "translate(" + margin.left + "," + margin.top + ")");

let FridayCheckin = "./data/checkin/Friday/FridayCheckIn.csv"; 
let SaturdayCheckin = "./data/checkin/Saturday/SaturdayCheckIn.csv"; 
let SundayCheckin = "./data/checkin/Sunday/SundayCheckIn.csv"; 

function movementPlot(data) {
  this.data = data;
  updateMovementPlot(data)
}

function setDataPath(group, day) {
  console.warn('dataPath: ', group)
  console.warn(day)

  console.log('./data/checkIn/' + day + '/' + group +'CheckIn.csv')
  d3.csv('./data/checkIn/' + day + '/' + group + 'CheckIn.csv', function (newData) {
    updateMovementPlot(newData);
  });

}

function loadNewDay(day) {
    d3.csv(day, function (newData) {
    updateMovementPlot(newData);
  });
}

function updateMovementPlot(data) {
  console.log('loading...')
  svg.selectAll("circle").remove();

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.X); })
    .attr("cy", function (d) { return y(d.Y); })
    .attr("r", 4.0)
    .style("fill", "#69b3a2")

  console.log('finished!')
}