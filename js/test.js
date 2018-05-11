/**
 * Created by Agnes on 2018-03-26.
 */

function test(data){
//
//    this.data = data;
//
//     var div = '#map';
// 	var data;
// 	/*
// 	var hourParser = d3.timeParse("%Y-%m-%d %H:%M:%S");
//
//     var time = hourParser("2014-6-06 08:15:32");
//     var hour = d3.timeHour.round(time);
//
//     console.log(hour);
//
// */
//
//     var hourParser = d3.timeParse("%Y-%m-%d %H:%M:%S");
//     var time = hourParser("2014-6-06 08:15:32");
//     var time2 = hourParser("2014-6-06 09:31:32");
//
//     var hour = d3.timeHour.round(data["Timestamp"]);
//
//
// //	var test = data[20]["Timestamp"].split(" ");
// //	console.log(test);
//
//   //test = parseTime(data["Timestamp"]);
//   //console.log(test);
//
//
// /*
// 	data.forEach(function(d) {
// 		if(d["type"] == "movement"){
// 			console.log("Here's a " + d["type"] + ". Person " + d["id"] + " entered the park " + d["Timestamp"] + ".");
// 		}
// 	});
//   */
//
// var height = 500;
//     var parentWidth = $(div).parent().width();
//     var margin = {top: 20, right: 20, bottom: 60, left: 40},
//         width = parentWidth - margin.right - margin.left,
//         height = height - margin.top - margin.bottom;
// 	var hashmap = d3.map();
//
//  //set colorDomain
// 	var color = d3.scaleLinear()
// 		.domain([127, 280814])
// 		.range(["#dd1c77", "#e7e1ef"]);
//
//     var tooltip = d3.select(div).append("div")
//         .attr("class", "tooltip")
//         .style("opacity", 0);
//
//     var x = d3.scaleLinear().range([0, width]);
//     var y = d3.scaleLinear().range([height, 0]);
//
// 	//DOMAINS ARE HERE*****************************************************************************
//
//
// 	//x.domain(d3.extent(data, function(d) { return parseTime(d.id); }));
//
// 	var xAxis = d3.axisBottom(x);
//
// 	x.domain([0,200]); //
//
// 	// d3.extent(data, function(d){return d["X"]}));
// 	y.domain(d3.extent(data, function(d){return d["Y"]}));
//
//
//
// 	  var svg = d3.select(div).append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform","translate(" + margin.left + "," + margin.top + ")");
//
// 		//y-axis
// 		 svg.append("g")
// 		.call(d3.axisLeft(y));
//
// 		//x-axis
// 		  svg.append("g")
// 		.attr("transform", "translate(0," + height + ")")
// 		.call(xAxis);
// 		//.call(xAxis.tickFormat(d3.timeFormat("%H:%M")));
//
// 	    // text label for the x axis
// 		svg.append("text")
// 		  .attr("transform",
// 				"translate(" + (width/2) + " ," +
// 							   (height + margin.top + 20) + ")")
// 		  .style("text-anchor", "middle")
// 		  .text("time");
//
// 		//text label for the y axis
// 		svg.append("text")
// 		  .attr("transform", "rotate(-90)")
// 		  .attr("y", 0 - margin.left)
// 		  .attr("x",0 - (height / 2))
// 		  .attr("dy", "1em")
// 		  .style("text-anchor", "middle")
// 		  .text("Movement");
//
// //draw
// 		var circles =
// 			svg.selectAll(".dot").
// 				data(data).
// 				enter().append("circle").
// 				transition()
// 				.attr("class", "non_brushed").
// 				attr("r", 3) .
// 				style("fill", "red").
// 				style("opacity", 0.7).
// 				attr("cx", function(d) {
//
//                 // var time = hourParser(d["Timestamp"]);
//                	// var hour = d3.timeHour.round(time);
//                 //
// 				// console.log(  hour.getHours() );
//                 //
// 				// return hour.getHours();
//
// 				return 100;
//
// 					})
// 				.attr("cy", function(d) {
// 							//console.log( d["Y"] )
// 							return y(d["Y"])}
// 							);
//

}