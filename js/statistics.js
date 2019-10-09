
/**
 * In checkDensity, run:
 * runStats(result);
 * 
 * 
 * 
 */

 //global variable;
let _totalCheckinsPark = 0;
let attractionList = [];

//this is based on the checkin data and therefore misses the once who only walk around
//Unless the data set with unique visitors is  read.
function runStats(dataSet){
    attractionList = extractAllLocations(dataSet);
}

function calcTotalCheckins(dataSet){
    let totalCheckins = 0;
    
    //recurringly add the length of each member to the total
    totalCheckins = dataSet.reduce( (currentTotal, nrCheckins ) => {
        return nrCheckins.length + currentTotal;
    },0 );

    return (totalCheckins);
}

function getUniqueVisitors(data){
    let uniqueVisitors = [...new Set(data.map(person => {
        return person.id
    }))];
    console.log("Number of visitors " + uniqueVisitors.length);
    return uniqueVisitors;
}



//not used anymore, save if we use it later
function removeExtracted(data, idx){
    //need to start with removing last object
    
    idx.forEach( index => {
        let n = idx.length-index-1; //erase from the back
        //console.log(n);
        data.splice(n, 1);
    })
    return data;
}




//will return unique ids from movementData who are not in checkinData, 
function findWalkers(movementData, checkinData) {
    let walkers = [];

    //get the unique ids of the movers and the checkers
    let uniqueMovers = getUniqueVisitors(movementData);
    let uniqueCheckers = getUniqueVisitors(checkinData);

    //the difference is everyone who is in the movement data but has not checked in
    walkers = movementData.filter(x => !checkinData.includes(x));

    console.log (walkers);
}
/****************************************************************************************
 * 
 * 
 *                              AUXILLARY FUNCTIONS
 * 
 * 
 ***************************************************************************************/


function intersectionGroup(SetA, SetB){
    let intersection = [];

    intersection = SetA.filter( x => { 
        return (SetB.includes(x))
    });
    return intersection;    
}

//returns the elements of Set A that is not in Set B
function differenceGroup(SetA, SetB){
    let difference = [];

    difference = SetA.filter( (x) => { 
        return ( !SetB.includes(x) )
    })

    return (difference);
}


function compareId(dataPointA, dataPointB){
    
    const idA = Number(dataPointA.id);
    const idB = Number(dataPointB.id);

    return (idA-idB);
}

function compareLocation(locationA, locationB ){
    return ( Number(locationA.X) == Number(locationB.X) 
             && Number(locationA.Y) == Number(locationB.Y) )
}


function timeAtAttraction (person, data) {
    let checkinTime = person.TimeStamp;
    let checkOutTime = 0;
    
    //define parser, should be done globally? 
    let hourParser = d3.timeParse('%Y-%m-%d %H:%M:%S');
    
    //find index of the searched timestamp
    let timestampIdx = data.findIndex(x => {
        return (x.Timestamp === checkinTime)
    });

    //the first movement after the attraction
    checkOutTime = data[timestampIdx+1].Timestamp;
    
    //parse the strings to be able to count seconds.
    checkinTime = hourParser(checkinTime);
    checkOutTime = hourParser(checkOutTime);

    //divide by 1000 to get in seconds (time in miliseconds)
    console.log( (checkOutTime - checkinTime)/1000)
}
/****************************************************************************************
 * 
 * 
 *                              TEST SECTION
 * 
 * 
 ***************************************************************************************/
function testing (data) {
    //generic datapoint
    let dataPoint = data[26529];
    
    //extract all movements of datapoint
    d3.csv('./data/newData/' + 'friday.csv', function (largeData) {
        largeData = largeData.filter( person => person.id === dataPoint.id);

        //send that list to check timeAtAttraction
        timeAtAttraction(dataPoint, largeData);
    });
}
