const inMilliSeconds = {
    QUARTER_HOUR: 900000,
    HALF_HOUR: 1800000,
    HOUR: 3600000
}
//method to extract all locations of a specific type from a dataSet which is grouped by coordinates
function extractLocation(data, locationList){
    let toExtract = [];
    //let indices = [];

    for(let idx = 0 ; idx < data.length ; idx++) {

        let dataPoint = data[idx];

        for( let i = 0 ; i < locationList.length; i++){
            if( compareLocation(dataPoint[0], locationList[i].coords) ) {
                toExtract.push(dataPoint);
                //indices.push(idx);
            }
        }
    }
    let newData = [];
    //exclude extracted data from group
    newData = differenceGroup(data, toExtract);

    return [toExtract,newData] ;
}

//method for extracting all timestamps in a 
//returns a list of datapoints
function extractTimePeriod(dataSet, TimestampStart, TimestampEnd){
    //delcarations
    let extractedData = []
    let startTime = comparableTime(TimestampStart) - inMilliSeconds.HALF_HOUR; 
    let endTime = comparableTime(TimestampEnd) + inMilliSeconds.HALF_HOUR;
    
    //extract from dataSet each timestamp between startTime and endTime
    extractedData = dataSet.filter( (dataPoint) => {
        //create a comparable date
        let currentTimestamp = comparableTime(dataPoint.TimeStamp); //if processed
        //return true if within span
        return (startTime < currentTimestamp && currentTimestamp < endTime);
    })

    console.log(extractedData);  
}

//returns the time in milliseconds for comparison
function comparableTime(timestamp){
    //create a new Date to convert
    let newTime = new Date(timestamp);
    //convert to milliseconds
    newTime = newTime.getTime();

    return newTime;
}

//hard coded calculations to get data for all attractions, this should really be refactored
//returns a list of all data for attraction groups
function extractAllLocations(dataSet) {
    attractionList = [];
    
    //stats from entrance
    let entranceData = [];
    let totalEntranceCheckins = 0;
    let entranceRatio = 0.0;
    let tempData, newData = [];

    tempData = extractLocation(dataSet, entrances);
    entranceData = tempData[0];
    newData = tempData[1];
    totalEntranceCheckins = calcTotalCheckins(entranceData);
    entranceRatio = Number((totalEntranceCheckins / _totalCheckinsPark*100).toPrecision(3));   
    
    let entrance = { name: "entrance", 
                    checkins: totalEntranceCheckins, 
                    ratio: entranceRatio};
    attractionList.push(entrance);
    findWalkers(dataSet, newData);
    
    //stats from thrill rides
    let thrillData = [];
    let totalThrillCheckins = 0;
    let thrillRatio = 0.0;
    //doCakculations
    tempData = extractLocation(newData, thrillRides);
    thrillData = tempData[0];
    newData = tempData[1];
    totalThrillCheckins = calcTotalCheckins(thrillData);
    thrillRatio = Number((totalThrillCheckins / _totalCheckinsPark*100).toPrecision(3));   

    let thrillRide = {name: "thrillRide", 
                      checkins: totalThrillCheckins, 
                      ratio: thrillRatio};

    attractionList.push(thrillRide);

    //stats from kiddie rides
    let kidData = [];
    let totalKidCheckins = 0;
    let kidRatio = 0.0;
    //do calculations 
    tempData = extractLocation(newData, kiddieRides);
    kidData = tempData[0];
    newData = tempData[1];
    //kidData = extractLocation(dataSet, kiddieRides);
    totalKidCheckins = calcTotalCheckins(kidData);  
    kidRatio = Number((totalKidCheckins / _totalCheckinsPark*100).toPrecision(3));   

    let kidRide = {name: "kidRide", 
                   checkins: totalKidCheckins, 
                   ratio: kidRatio};

    attractionList.push(kidRide);

    //stats from general rides
    let generalData = [];
    let totalGeneralCheckins = 0;
    let generalRatio = 0.0;
    //do calc
    tempData = extractLocation(newData, ridesForEveryone);
    generalData = tempData[0];
    newData = tempData[1];
    //generalData = extractLocation(dataSet, ridesForEveryone);
    totalGeneralCheckins = calcTotalCheckins(generalData); 
    generalRatio = Number((totalGeneralCheckins / _totalCheckinsPark*100).toPrecision(3));   
    //create object
    let generalRide = {name: "generalRide", 
                       checkins: totalGeneralCheckins, 
                       ratio: generalRatio};

    attractionList.push(generalRide);

    //stats from medic
    let medicData = [];
    let totalMedicCheckins = 0;
    let medicRatio = 0.0;
    //do calc

    tempData = extractLocation(newData, medic);
    medicData = tempData[0];
    newData = tempData[1];
    //medicData = extractLocation(dataSet, medic);
    totalMedicCheckins = calcTotalCheckins(medicData);    
    medicRatio = Number((totalMedicCheckins / _totalCheckinsPark*100).toPrecision(3));
    //create obj
    let medicHouse = {name: "medic", 
                      checkins: totalMedicCheckins, 
                      ratio: medicRatio};

    attractionList.push(medicHouse);
    
    //stats from pavillion
    let pavillionData = [];
    let totalPavillionCheckins = 0;
    let pavillionRatio = 0.0;

    tempData = extractLocation(newData, pavillion);
    pavillionData = tempData[0];
    newData = tempData[1];
    //pavillionData = extractLocation(dataSet, pavillion);
    totalPavillionCheckins = calcTotalCheckins(pavillionData);
    pavillionRatio = Number((totalPavillionCheckins / _totalCheckinsPark*100).toPrecision(3));

    let pavillionPlace = {name: "Pavillion", 
                          checkins: totalPavillionCheckins, 
                          ratio: pavillionRatio};

    attractionList.push(pavillionPlace);
    
    let totalOtherCheckins = [];
    newData.forEach( (array) => {
        totalOtherCheckins = totalOtherCheckins.concat(array);
    })

    let notInterestingRatio = Number((totalOtherCheckins.length / _totalCheckinsPark*100).toPrecision(3));
    let notSoInteresting = {name: "Other",
                            checkins: totalOtherCheckins.length,
                            ratio: notInterestingRatio}
    
    attractionList.push(notSoInteresting);
    
    return attractionList;
}


/****************************************************************************************
 * 
 * 
 *                              AUXILLARY FUNCTIONS
 * 
 * 
 ***************************************************************************************/

function calcTotalCheckins(dataSet){
    let totalCheckins = 0;
    
    //recurringly add the length of each member to the total
    totalCheckins = dataSet.reduce( (currentTotal, nrCheckins ) => {
        return nrCheckins.length + currentTotal;
    },0 );

    return (totalCheckins);
}
