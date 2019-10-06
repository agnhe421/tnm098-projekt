

function timeAtAttraction (person, data) {
    let checkinAtX = person.X;
    let checkinAtY = person.Y;
    let checkinTime = person.TimeStamp;
    let checkOutTime = 0;

    

    console.log("legnth of data: " + data.length)
    //find index of that action
    let timestampIdx = data.findIndex(x => {
        //console.log(x.TimeStamp);
        return (x.Timestamp === checkinTime)
    })
    /*
    new Date('2014-06-06T06:00:00.000Z'); //2014-06-06T07:10:52.000Z
    var hourParser = d3.timeParse('%Y-%m-%d %H:%M:%S');*/

    new Date(checkinTime); //2014-06-06T07:10:52.000Z
    var hourParser = d3.timeParse('%Y-%m-%d %H:%M:%S');
    checkinTime = hourParser(checkinTime);
    checkOutTime = data[timestampIdx+1].Timestamp;
    checkOutTime = hourParser(checkOutTime);

    console.log(checkinTime);
    //create a sublist of all actions after current timestamp
    /*let personActions = data.slice(timestampIdx+1);

    console.log(personActions);
/*
    for( let i = 0 ; i < personActions.length ; i++){
        if(personActions[i].X === checkinAtX && personActions[i].Y === checkinAtY){
            checkOutTime = personActions[i].timestamp;
        }
        console.log("No actions found");
    }
    */

    console.log( (checkOutTime - checkinTime)/1000)



    /* vad vill jag göra?

    sortera ut alla personens händelser från tidpunkt x till nästa .
    Hitta nästa tidpunkt som överensensträmmer med samma plats. 

    Hitta från en sublista som är utdragen från det aktuella timestampen? */
}

function testing (data) {
    let dataPoint = data[26529];
    let actionList = [];
    
    let checkinTime = dataPoint.TimeStamp;
    //console.log("CheckinTime: " + checkinTime);
    let timestampIdx = data.findIndex(x => {
        
        return (x.TimeStamp === checkinTime)
    })
    //console.log(timestampIdx);
    //console.log(data[timestampIdx]);
    //console.log(dataPoint);
    
    //console.log("Searched Person: " );
    //console.log(dataPoint);
    //console.log(data);
    d3.csv('./data/newData/' + 'friday.csv', function (largeData) {
        
        largeData = largeData.filter( person => person.id === dataPoint.id);
        timeAtAttraction(dataPoint, largeData);
    });


    
    
    //let actionList = extractActions(datapoint);
    

    //console.log(actionList);
    
}

// function extractActions(datapoint){
//     let actionList = []
//     d3.csv('./data/newData/' + 'friday.csv', function (largeData) {
    
//         actionList = largeData.filter( person => person.id === datapoint.id)
        
        
//      });
//      console.log(actionList);
//      return actionList;

// }