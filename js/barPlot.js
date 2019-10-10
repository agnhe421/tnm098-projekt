
var fridayNumberOfPeople = [
  { group: "8-9", value: 3171, day: "Friday" },
  { group: "9-10", value: 3210, day: "Friday" },
  { group: "10-11", value: 2660, day: "Friday" },
  { group: "11-12", value: 3134, day: "Friday" },
  { group: "12-13", value: 3117, day: "Friday" },
  { group: "13-14", value: 2994, day: "Friday" },
  { group: "14-15", value: 2949, day: "Friday" },
  { group: "15-16", value: 2225, day: "Friday" },
  { group: "16-17", value: 2837, day: "Friday" },
  { group: "17-18", value: 2565, day: "Friday" },
  { group: "18-19", value: 2309, day: "Friday" },
  { group: "19-20", value: 1669, day: "Friday" },
  { group: "20-21", value: 1063, day: "Friday" },
  { group: "21-22", value: 777, day: "Friday" },
  { group: "22-23", value: 305, day: "Friday" }
];

var saturdayNumberOfPeople = [
  { group: "8-9", value: 5618, day: "Saturday" },
  { group: "9-10", value: 5784, day: "Saturday" },
  { group: "10-11", value: 4782, day: "Saturday" },
  { group: "11-12", value: 5190, day: "Saturday" },
  { group: "12-13", value: 5154, day: "Saturday" },
  { group: "13-14", value: 5143, day: "Saturday" },
  { group: "14-15", value: 5196, day: "Saturday" },
  { group: "15-16", value: 3925, day: "Saturday" },
  { group: "16-17", value: 4866, day: "Saturday" },
  { group: "17-18", value: 4373, day: "Saturday" },
  { group: "18-19", value: 3978, day: "Saturday" },
  { group: "19-20", value: 3166, day: "Saturday" },
  { group: "20-21", value: 2051, day: "Saturday" },
  { group: "21-22", value: 1393, day: "Saturday" },
  { group: "22-23", value: 694, day: "Saturday" }
];

var sundayNumberOfPeople = [
  { group: "8-9", value: 6681, day: "Sunday" },
  { group: "9-10", value: 6802, day: "Sunday" },
  { group: "10-11", value: 5320, day: "Sunday" },
  { group: "11-12", value: 6246, day: "Sunday" },
  { group: "12-13", value: 6015, day: "Sunday" },
  { group: "13-14", value: 5877, day: "Sunday" },
  { group: "14-15", value: 5767, day: "Sunday" },
  { group: "15-16", value: 5740, day: "Sunday" },
  { group: "16-17", value: 5384, day: "Sunday" },
  { group: "17-18", value: 4994, day: "Sunday" },
  { group: "18-19", value: 4406, day: "Sunday" },
  { group: "19-20", value: 3560, day: "Sunday" },
  { group: "20-21", value: 2174, day: "Sunday" },
  { group: "21-22", value: 1699, day: "Sunday" },
  { group: "22-23", value: 895, day: "Sunday" }
];

var barMargin = { top: 30, right: 3, bottom: 70, left: 40 },
  barWidth = 350,
  barHeightAttractions = 150

//  append the svg object to the body of the page
var svg2 = d3.select("#barPlot")
  .append("svg")
  .attr("width", barWidth + barMargin.left + barMargin.right)
  .attr("height", barHeightAttractions + barMargin.top + barMargin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + barMargin.left + "," + barMargin.top + ")");

function updateBarPlot(data) {
  //  X axis
  var x = d3.scaleBand()
    .range([0, barWidth])
    .domain(fridayNumberOfPeople.map(function (d) { return d.group; }))
    .padding(0.2);
  svg2.append("g")
    .attr("transform", "translate(0," + barHeightAttractions + ")")
    .call(d3.axisBottom(x))

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 7000])
    .range([barHeightAttractions, 0]);

  svg2.append("g")
    .attr("class", "myYaxis2")
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
    .attr("height", function (d) { return barHeightAttractions - y(d.value); })
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
updateBarPlot(fridayNumberOfPeople)

