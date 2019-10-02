// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


// append the svg object to the body of the page
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
  checkDensity(data);
}

function setDataPath(group, day) {
  console.warn('dataPath: ', group)
  console.warn(day)

  console.log('./data/checkIn/' + day + '/' + group + 'CheckIn.csv')
  d3.csv('./data/checkIn/' + day + '/' + group + 'CheckIn.csv', function (newData) {

    checkDensity(newData);
  });
}

function checkDensity(data) {
  //only runs groupBy, could be refactored away.
  var result = groupBy(data, function (dataPoint) {
    return [dataPoint.X, dataPoint.Y];
  });

  updateMovementPlot(result)
  //return result;
}

function groupBy(array, f) {
  var groups = {};
  array.forEach(function (o) {
    var group = JSON.stringify(f(o));
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.keys(groups).map(function (group) {
    return groups[group];
  })
}

function addPoint(xVal, yVal, list) {
  list.push({ id: String(xVal + yVal), nrCheckIns: 1 });
}

function updateMovementPlot(data) {
  console.log('loading...')
  
  svg.selectAll("circle").remove();

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { 
      console.log(d)
      return x(d[0].X); })
    .attr("cy", function (d) { return y(d[0].Y); })
    .attr("r", function (d) { return (2.0 + d.length / 100) })
    .style("fill", "#69b3a2")

  console.log('finished!')
}

/**
 * Check the time it takes to run a function call. Outputs runtime in miliseconds.
 * 
 * @param {function } foo     Name of funciton, without brackets (so that it does not run)
 * @param {string} argument Arguments of function f.
 */
function checkPerformance(foo, argument) {
  var t0 = performance.now();
  var list = foo(argument);
  var t1 = performance.now();

  console.log("Call to checkDensity took " + (t1 - t0) + " milliseconds.");
  return list;
}

function loadNewDay(day) {
  d3.csv(day, function (newData) {
    checkDensity(newData);
    //updateMovementPlot(newData);
  });
}

