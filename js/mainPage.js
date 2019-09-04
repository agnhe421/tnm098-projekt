
var uniqueVisitors_ = 0;
var query = 'Timestamp';
const checkIn = 'check-in';

const MINUTE_IN_THRESHOLD = 2;
const TIME_THRESHOLD = MINUTE_IN_THRESHOLD * 60000;
const STARTING_TIME = performance.now();
const OPENING_TIME_FRIDAY = new Date('2014-06-06T06:00:00.000Z'); //2014-06-06T07:10:52.000Z
var hourParser = d3.timeParse('%Y-%m-%d %H:%M:%S');

//kids area 
let xCoordList = [0, 99];
let yCoordList = [0, 99];

//entertainment area 
let xCoasterAlley = [0, 99], yCoasterAlley = [0, 33];
let xKids = [73, 99], yKids = [56, 99];
let xWetLand = [0, 82], yWetLand = [33, 55];
let xTundraLand = [0, 72], yTundraLand = [56, 99];

let time = [OPENING_TIME_FRIDAY.getTime() + 9 * 3600 * 1000, OPENING_TIME_FRIDAY.getTime() + 13 * 3600 * 1000];

xCoordList = time;
yCoordList = yKids;

var color1 = d3.scaleLinear().domain(1402034400000, 1402091999000).range('#ede0e8', '#b30000');
var color2 = d3.scaleLinear().domain(1402034400000, 1402091999000).range('#eddad1', '#7a0177');//d3.scaleLinear();
var color3 = d3.scaleLinear().domain(1402034400000, 1402091999000).range('#dce7ea', '#810f7c'); d3.scaleLinear();
var color4 = d3.scaleLinear().domain(1402034400000, 1402091999000).range('#e0e8d7', '#0868ac'); d3.scaleLinear('#e0e8d7', '#0868ac');
var color5 = d3.scaleLinear().domain(1402034400000, 1402091999000).range('#e5dee6', '#016c59'); d3.scaleLinear();
var color6 = d3.scaleLinear().domain(1402034400000, 1402091999000).range('#eeeec3', '#993404'); d3.scaleLinear();

function mainPage(data) {
	console.warn('hello from main page')
	this.data = data;
	var margin = { top: 20, right: 20, bottom: 30, left: 50 },
		width = 500 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	x.domain([0, d3.max(data, function (d) { return d.X; })]);
	y.domain([0, d3.max(data, function (d) { return d.Y; })]);

	var svg = d3.select('#movementPlot').append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.append('g')
		.attr('transform',
			'translate(' + margin.left + ',' + margin.top + ')');

	const OPENING_TIME_FRIDAY = new Date('2014-06-06T06:00:00.000Z'); //2014-06-06T08:00:00.000Z
	const CLOSING_TIME_FRIDAY = new Date('2014-06-06T21:59:59.000Z'); //2014-06-06T23:59:59.000Z

	newData = handleData(data, xCoordList, yCoordList);
	updatePlot(newData);

	svg.append('g')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(x));

	svg.append('g')
		.call(d3.axisLeft(y));

	function handleData(data, xCoords, yCoords) {
		data.sort(function (a, b) {
			return (a['id'] - b['id']);
		});

		data.forEach(function (d) {
			d.Timestamp = hourParser(d.Timestamp);
		});

		let newData = peopleInArea(data, xCoords, yCoords);
		let newData1 = pruneData(newData, xCoords, yCoords);

		return newData1;
	}

	function updatePlot(data) {
		svg.selectAll('circle').remove();

		svg.selectAll('dot')
			.data(data)
			.enter().append('circle')
			.attr('r', function (d) {
				if (d['type'] === checkIn) return 6;
				else return 2;
			})
			.attr('cx', function (d) { return x(d.X); })
			.attr('cy', function (d) { return y(d.Y); })
			.style('fill', function (d) {
				if (d['type'] === checkIn) {
					console.warn(d.X)

					if(d.X == 86)
					{ 
						return '##32a852'
					}

					return 'red';
				}
				return '#ede0e8';
			});
	}

	this.loadNewData = function(dataPath) {
		var newData = [];
		d3.csv(dataPath, function (data) {
			newData = handleData(data, xCoordList, yCoordList);
			updatePlot(newData);
		});
	}

	function checkId(value) {
		for (var i = 0; i < this.length; i++) {
			if (value['id'] == this[i])
				return true;
		}
		return false;
	}

	function deleteId(value) {
		for (var i = 0; i < this.length; i++) {
			if (value['id'] == this[i])
				return false;
		}
		return true;
	}

	function peopleInArea(theData, theXRange, theYRange) {
		let idData = [];
		let newData = [];
		theData.forEach(function (dataPoint) {
			if (!idData.includes(dataPoint['id'])
				&& checkAction(dataPoint['type'])
				&& isInRange(dataPoint, theXRange, theYRange, query)) {

				idData.push(dataPoint['id']);
			}
		});

		uniqueVisitors_ = idData.length;
		newData = theData.filter(checkId, idData);

		return newData;
	}

	function peopleTime(theData, theXRange, theYRange) {
		let idData = [];
		let newData = [];

		theData.forEach(function (dataPoint) {
			if (!idData.includes(dataPoint['id'])
				&& checkAction(dataPoint['type'])
				&& isInRange(dataPoint, theXRange, theYRange, query)) {

				idData.push(dataPoint['id']);
			}
		});
		uniqueVisitors_ = idData.length;
		newData = theData.filter(checkId, idData);

		return newData;
	}

	function pruneData(list, xCoordList, yCoordList) {
		var newList = [];
		var idsToPrune = [];

		idsToPrune = idsOutsideRange(list, xCoordList, yCoordList);
		uniqueVisitors_ = uniqueVisitors_ - idsToPrune.length;

		newList = list.filter(deleteId, idsToPrune);
		return newList;
	}

	function isInRange(dataPoint, xRange, yRange, query) {
		if (query === 'area') {
			if (dataPoint['X'] >= d3.min(xRange) && dataPoint['X'] <= d3.max(xRange)
				&& dataPoint['Y'] >= d3.min(yRange) && dataPoint['Y'] <= d3.max(yRange))
				return true;
		}

		else if (query === 'Timestamp') {
			if (dataPoint[query].getTime() >= d3.min(xRange) && dataPoint[query].getTime() <= d3.max(xRange))
				return true;
		}

		else return false;
	}

	function idsOutsideRange(theList, xRange, yRange) {
		var idList = [];
		let i = 0;

		while (i < theList.length) {
			if (!idList.includes(theList[i]['id']) && checkAction(theList[i]['type']) && !isInRange(theList[i], xRange, yRange, query)) {
				//newList.splice(i,1); //have to store ids of the people who checked in outside of range and then delete all of those.
				idList.push(theList[i]['id']);
			}
			else i++;
		}

		return idList;
	}

	function checkCoordinates(theData, x, y, time, type) {
		var openingTime = new Date('2014-06-06T06:00:00.000Z');
		var askedTime = time - openingTime;

		if ( /*theData['type'] === 'check-in' 
			&&*/ theData['X'] === x && theData['Y'] === y
			&& timeCheck(time, theData['Timestamp'])) //Math.floor((theData['Timestamp']-openingTime)/600000) ===  Math.floor(askedTime/600000))
		{
			return true;
		}
		return false;
	}

	function checkPosition(point1, point2) {
		if (point1 > point2)
			return true;
		else return false;
	}

	function checkAction(theType) {
		if (theType === checkIn)
			return true;
		else return false;
	}

	function timeCheck(time1, time2) {
		if (Math.abs(time1.getTime() - time2.getTime()) <= TIME_THRESHOLD)
			return true;
		else return false;
	}

	function checkTime(time, data) {
		if (time === data['Timestamp'])
			return true;
		else return false;
	}

	function printTime(date) {
		hour = date.getHours();
		minutes = date.getMinutes();

		if (minutes < 10) {
			minutes = '0' + date.getMinutes();
		}
		return (hour + ':' + minutes);
	}

	function retrieveIds(theList) {
		listOfIds = [];

		theList.forEach(function (d) {

			if (!listOfIds.includes(d['id']))
				listOfIds.push(d['id'])
		});

		return listOfIds;
	}

	function findPeople(theData, xCoords, yCoords, time, type) {
		let newData = [];

		theData.forEach(function (dataPoint) {
			if (checkAction(dataPoint['type']) && checkPosition(dataPoint['X'], xCoords[0])
				&& checkPosition(dataPoint['Y'], yCoords[0])) {

				newData.push(dataPoint);
			}
		});

		newData = theData.filter(checkId, newData);
		if (xCoords.length === 1) {
			return newData;
		}
		else {
			newData = findPeopleAgain(newData, xCoords.slice(1), yCoords.slice(1));
			return newData;
		}
	}

	function findPeopleAgain(theData, xCoords, yCoords) {
		let newData = [];
		theData.forEach(function (dataPoint) {
			if (checkAction(dataPoint['type']) && checkPosition(dataPoint['X'], xCoords[0])
				&& checkPosition(dataPoint['Y'], yCoords[0])) {
				newData.push(dataPoint);
			}
		});

		newData = theData.filter(checkId, newData);

		if (xCoords.length === 1) {
			return newData;
		}
		else {
			newData = findPeopleAgain(newData, xCoords.slice(1), yCoords.slice(1));
			return newData;
		}
	}
}