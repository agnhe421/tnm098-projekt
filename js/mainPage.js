/**
 * Created by Agnes on 2018-05-05.
 */
/**************************************************************************************************
*
*								 VARIABLES' DECLARATIONS
*
**************************************************************************************************/

///people need to be within this time to be able to qualify as group
const MINUTE_IN_THRESHOLD = 2;
//convert to milliseconds
const TIME_THRESHOLD =  MINUTE_IN_THRESHOLD * 60000; 
const STARTING_TIME = performance.now();
var hourParser = d3.timeParse("%Y-%m-%d %H:%M:%S");
/**************************************************************************************************
*
*								 FUNCTION START
*
**************************************************************************************************/

function mainPage(data)
{
    this.data = data;

    var div = '#mainVis';
    
    //var data; //what? again?

    /***** SET MARGINS ******/
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    /*** SET THE RANGE ******/
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    /***** SET DOMAINS ********/
    x.domain(d3.extent(data, function(d) { return d.X }));
	y.domain([0, d3.max(data, function(d) { return d.Y; })]);

    /***** CREATE THE BODY ********/
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

/**************************************************************************************************
*
*								 VARIABLES' DECLARATIONS
*
**************************************************************************************************/

	/****** GLOBAL CONSTANTS *********/
	const OPENING_TIME_FRIDAY = new Date('2014-06-06T06:00:00.000Z'); //2014-06-06T07:10:52.000Z
	

	/****** FOR STATISTICS *********/
	var numberOfCheckIns = 0;
    var beforeNine = 0;
    var afterNine = 0;

	/***** COLOR ARRAYS FOR PLOT ******/
    var color = d3.scaleOrdinal(["#ede0e8", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000"]);
	var color2 = d3.scaleOrdinal(["#eddad1", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177"]);
	var color3 = d3.scaleOrdinal(["#dce7ea", "#b3cde3", "#8c96c6", "#8856a7", "#810f7c"]);
	var color4 = d3.scaleOrdinal(["#e0e8d7", "#bae4bc", "#7bccc4", "#43a2ca", "#0868ac"]);
	
	var color5 = d3.scaleOrdinal(["#e5dee6", "#bdc9e1", "#67a9cf", "#1c9099", "#016c59"]);
	var color6 = d3.scaleOrdinal(["#eeeec3", "#fed98e", "#fe9929", "#d95f0e", "#993404"]);
	
	var colors = d3.scaleOrdinal(["#ede0e8", "#fdcc8a", "#fc8d59", "#e34a33", "#b30000",
								  "#eddad1", "#fbb4b9", "#f768a1", "#c51b8a", "#7a0177",
								  "#dce7ea", "#b3cde3", "#8c96c6", "#8856a7", "#810f7c",
								  "#e0e8d7", "#bae4bc", "#7bccc4", "#43a2ca", "#0868ac",
								  "#e5dee6", "#bdc9e1", "#67a9cf", "#1c9099", "#016c59",
								  "#eeeec3", "#fed98e", "#fe9929", "#d95f0e", "#993404"
								 ]);
	//console.log("Colors: " + colorMatrix);
    
    /***** PARSE TIME DATA ******/
  //  var hourParser = d3.timeParse("%Y-%m-%d %H:%M:%S");
    //var time = hourParser(data["Timestamp"]);
    //var hour = d3.timeHour.round(time);
    //var hourData = hour.getHours();
    //console.log(hourData);

	
	/***** VARIABLES FOR QUERIES ******/
	var dataSubset = []; //to store the filtered subset
	var idsInGroup = []; //to store the ids we want to filter
	
	var actionType = "check-in"; //what action are we searching for?
	var someDate = new Date('2014-06-06T06:52:00.000Z'); //09:04 - what time are we looking
	var xCoord = 0, yCoord = 67; //coordinates
	var _queryType = "timeSpent"; //what statistics are we looking for?

    // lista med random ids från datan
	var list = [203184, 483106, 455752]; 

/**************************************************************************************************
*
*											RUNTIME
*
**************************************************************************************************/

	/***** SORT DATA BY ID ******/
	console.log("Sorting..."); //before
	let sortStartTime = performance.now();
	
	data.sort(function(a,b){
		return (a["id"] - b["id"]); 
	});
	
	let sortingTime = performance.now() - sortStartTime;
	console.log("Sorting done. Sorted in " + sortingTime + "ms."); //after

	/***** FORMAT THE DATA ******/
	let parseStartTime = performance.now();
    
    data.forEach(function(d) {
        d.Timestamp = hourParser(d.Timestamp);
        //d.Y = +d.Y;
    });
    
    let parsingTime = performance.now() - parseStartTime;
	console.log("Parsing done. Parsed in " + parsingTime + "ms."); //after
   
	/***** SET QUERY REQUIREMENTS ******/

	
	var query = {
		'theAction': actionType,
		'theDate': someDate,
		'theCoordinates' : { 'xCoord': 0, 'yCoord': 0 } 
	};

	
	console.log(query);
	//query.theCoordinates.push({xCoordinate: xCoord, yCoordinate:yCoord});
	
	//console.dir("Coordinates: " + queryConditions.theCoordinates);
	
	/***** FIND GROUPD ******/
	//function(typeOf, theData, x, y, time, type)
	console.log("Looking for group..."); //after
	let searchStartTime = performance.now();
	
	idsInGroup = getIds(data, xCoord, yCoord, someDate, actionType);
	
	searchingTime = performance.now() - searchStartTime;
	console.log("Searched in " + searchingTime + " milliseconds.");
	//idsInGroup = getIds(queryType, data,xCoord, yCoord, someDate, actionType);
	dataSubset = data.filter(checkId, idsInGroup);

	
/**************************************************************************************************
*
*											DRAW
*
**************************************************************************************************/
   
    /****** DRAW SCATTERPLOT ******/
	updatePlot(dataSubset);
	 /*
   svg.selectAll("dot")
        .data(dataSubset)
		//.data(data.filter(checkId, list) )
        .enter().append("circle")
        .attr("r", function(d){
			if(d.type == "check-in") return 5; 
			return 2; 
		})
        .attr("cx", function(d){return x(d.X)})
        .attr("cy", function(d) { return y(d.Y); })
		.style("fill", function(d, i) {
            
			if( d.type == "check-in"){
                //numberOfCheckIns++;
                //console.log("Check-in at (" + d.X + ", " + d.Y + ")." );
				return "red";
            }
			else {
				let hour = d["Timestamp"] - OPENING_TIME_FRIDAY;

				//console.log(d["Timestamp"]);

				if( d["id"] == idsInGroup[0] ){
					return color(Math.floor(hour/900000)-1);
				}
				else if( d["id"] == idsInGroup[1] ){
					return color2(Math.floor(hour/900000)-1);
				}
				else if(d["id"] == idsInGroup[2]){
					return color3(Math.floor(hour/900000)-1);
				}
				else if(d["id"] == idsInGroup[3]){
					return color3(Math.floor(hour/900000)-1);
				}
				else if(d["id"] == idsInGroup[4]){
					return color4(Math.floor(hour/900000)-1);
				}
				else if(d["id"] == idsInGroup[5]){
					return color5(Math.floor(hour/900000)-1);
				}		
				else if(d["id"] == idsInGroup[6]){
					return color6(Math.floor(hour/900000)-1);
				}
				else{
					//console.log("Wrong coloring!");
					return "black";
				}
			}
		});
		
		*/

 // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

    console.log("DONE.");

	
	function updatePlot(data)
	{
		console.log("Clearing plot...");
		svg.selectAll("circle").remove();
		console.log("Clearing done.");
		
		console.log("Drawing...");
		svg.selectAll("dot")
			.data(data)
			//.data(data.filter(checkId, list) )
			.enter().append("circle")
			.attr("r", function(d){
				if(d.type == "check-in") return 5; 
				return 2; 
			})
			.attr("cx", function(d){return x(d.X)})
			.attr("cy", function(d) { return y(d.Y); })
			.style("fill", function(d, i) {
				
				if( d.type == "check-in"){
					//numberOfCheckIns++;
					//console.log("Check-in at (" + d.X + ", " + d.Y + ")." );
					return "red";
				}
				else {
					let hour = d["Timestamp"] - OPENING_TIME_FRIDAY;

					//console.log(d["Timestamp"]);

					if( d["id"] == idsInGroup[0] ){
						return color(Math.floor(hour/900000)-1);
					}
					else if( d["id"] == idsInGroup[1] ){
						return color2(Math.floor(hour/900000)-1);
					}
					else if(d["id"] == idsInGroup[2]){
						return color3(Math.floor(hour/900000)-1);
					}
					else if(d["id"] == idsInGroup[3]){
						return color3(Math.floor(hour/900000)-1);
					}
					else if(d["id"] == idsInGroup[4]){
						return color4(Math.floor(hour/900000)-1);
					}
					else if(d["id"] == idsInGroup[5]){
						return color5(Math.floor(hour/900000)-1);
					}		
					else if(d["id"] == idsInGroup[6]){
						return color6(Math.floor(hour/900000)-1);
					}
					else{
						//console.log("Wrong coloring!");
						return "black";
					}
				}
			});
			console.log("Drawing done.");
	}
	
	this.loadSat = function()
	{
		
		let startLoad = performance.now();
		
		let emptyDataSet = [];
		//updatePlot(emptyDataSet);
		
		console.log("Loading saturday..."); 
		d3.csv('./data/dataSmallSat.csv', function(data) {

		//data.forEach(function(d) {
		//d["Timestamp"] =+ hourParser(d["Timestamp"]);
		//  d["X"] = +d["X"];
		//	d["Y"] = +d["Y"];
		// });
	
		 console.log(data[5]); 
		
	
		let loadingTime = performance.now() - startLoad;
		console.log("Loaded data of size " +data.length + " in " + loadingTime +" milliseconds." );
		
		return data; 
		}); 
			 
	}	
	

	//



/**************************************************************************************************
*
*									MEMBER FUNCTIONS
*
**************************************************************************************************/

/**
* Function to specify how to compare entries for filter-function
* Returns true if the data entries' ids are present in the list this
* 
***/
function checkId(value)
{
	for( var i = 0 ; i < this.length ; i++){
		if(value["id"] == this[i])
			return true;
	}
	return false;
}


/**
* Function to check which ids satisfies query requirements
* Returns empty array if nothing satisfies 
* 
* Returns an array with ids as integers(?)
***/
/*
typeOf
if(typeOf == "checkins"){
if (typeOf == "timeSpent"){
		newData = checkTimeSpent(theData);
	}*/

function getIds(theData, x, y, time, type) //skicka in vilken typeof value vi letar efter? 
{
	var newData = [];
	//Find the groups 
	
	theData.forEach( function (d, i) {
		if( checkCoordinates(d, x, y, time, type) ){
				newData.push(theData[i]["id"]);
		}});

	//returning
	if( newData.length == 0 )
		console.log("No matches found.");
	else
		console.log("Group of size " + newData.length + " found.");
	return newData; //return newData;
}

function pruneData(dataToPrune, xCoord, yCoord, time){

}


/**
*
* Returns empty array if nothing satisfies 
* 
* Returns an array with ids as integers(?)
***/
function checkTimeSpent( theData ){
	
}

/**
* Function to check if a data entry satisfies query conditions
*
* Returns true if entry fulfilles requirements
* Else returns false
***/
function checkCoordinates(theData, x, y, time, type){
	//console.log("Date: " + time);
	//normalize time to current dates
	var openingTime = new Date('2014-06-06T06:00:00.000Z');
	var askedTime = time - openingTime;
	//console.log("Query time: " + askedTime/600000 + "mins from opening time.");
	
	if( theData["type"] == "check-in" 
		&& theData["X"] == x && theData["Y"] == y 
		&& ( Math.abs(theData["Timestamp"].getTime() - time.getTime())) <= TIME_THRESHOLD ) //Math.floor((theData["Timestamp"]-openingTime)/600000) ==  Math.floor(askedTime/600000))
	{
			//console.log("Time: " + ( Math.abs(theData["Timestamp"].getTime() - time.getTime()) )/60000 + " minutes."); //divide by 60000 to normalize to minutes.
			return true;
	}
	return false;
}

function checkPosition(point1, point2)
{
	if(point1 == point2)
		return true; 
	else return false; 
}

function checkAction(theType)
{
	if(theType == "check-in")
		return true; 
	else return false; 
}

function timeCheck(time1, time2)
{
	if ( Math.abs(time1.getTime() - time2.getTime()) <= TIME_THRESHOLD ) 
		return true; 
	else return false; 
}

}
	
	
 /*** DEFINE THE LINE ******/
   /* var valueline = d3.line()
     //   .x(function(d) { return x(d.Timestamp ) })
   .x(function(d) { return x(d.X )})          
	.y(function(d) { return y(d.Y); });
*/
