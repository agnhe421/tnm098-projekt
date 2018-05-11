/**
 * Created by Agnes on 2018-04-12.
 */
//Your code from lab2 here..
/**
 * k means algorithm
 * @param data
 * @param k
 * @return {Object}
 */

function kmeans(originalData, k) {

    //Implement the algorithm here..
    //Remember to reference any code that you have not implemented yourself!
    var MAX_ITERATIONS = 10;
    var MIN_QUALITY_DECREASE = 0.01;


    var iteration = 0;
    var updatedData = [];
    var qualityVal = 99999;

    var data = [];
    data = transformData(originalData);
    var DIMENSION = Object.keys(data[0]);

    //1. Randomly place K points into the space
    var centroids = initCentroids(k, data);

    //do while quality is decreasing with at least MIN_QUALITY_DECREASE
    do{
        //save old qualityVal to check quality decrease
        oldQuality = qualityVal;

        //2. Assign each item to the cluster that has the closest centroid
        updatedData = assignClusters(DIMENSION, centroids, data);

        // 3. Recalculate the K centroids to be in the centre of the cluster
        centroids = reCalcCentroid(centroids, updatedData, DIMENSION);

        //4. Do recalc until quality is good enough.
        qualityVal = checkQuality(DIMENSION, centroids, updatedData);
        //console.log(qualityVal);

    }while(oldQuality - qualityVal > MIN_QUALITY_DECREASE
    && iteration < MAX_ITERATIONS);

    return updatedData;
};

function initCentroids(k, data){
    var centroids = [];
    for( i = 0; i < k ; i++){
        //randomly generate number in space
        centroids.push(data[Math.floor(Math.random()*data.length)]);
    };
    return centroids;
}

//Check the quality of the cluster.
function checkQuality(dim, centroids, data)
{
    var distance = 0;

    centroids.forEach( function(c, idx)
    {
        //console.log('Centroid: ' + idx);
        data.forEach(function(d)
        {
            if(d.assignments == idx)
            {
                for( var i = 0 ; i < dim.length ; i++ ){

                    distance += Math.pow(d[ dim[i] ] - c[ dim[i] ] , 2);
                }
            }
        });
    });

    return distance;
}


//asign each item to the cluster that has the closest centroid
function assignClusters(dim, centroids, data)
{
    var nrOfCentroids = centroids.length;
    var newDiff = 0;
    var idx = 0;
    var assignedData = [];

    data.forEach( function (d, j) {

        assignedData[j] = {};
        var assignments = -1;
        var totDiff = Number.MAX_VALUE;

        //console.log("Tot pre check: " + totDiff);
        for(i = 0; i < nrOfCentroids; i++)
        {
            newDiff = getEuclidianDistance(centroids[i], data[j], dim);

            if(newDiff < totDiff){
                totDiff = newDiff;
                assignments = i;
                //console.log("assign: " + data.assignements);
            }
        }
        if(assignedData[j]["assignments"] == -1 || assignedData[j]["assignments"] == null){
            for(var currentDim = 0; currentDim < dim.length; currentDim++) {
                assignedData[j][dim[currentDim]] = Number(d[dim[currentDim]]);
            }

            assignedData[j]["assignments"] = assignments;
        }
    });

    //console.log(assignedData);
    return assignedData;

}

// Recalculate centroids to be in center of clusters
function reCalcCentroid(theCentroids, theData, dim)
{
    var reCalcedCentr = [];
    //var returnList = [];

    theCentroids.forEach( function(c, idx)
    {
        //declarations
        var avgDistance = {};
        var numberOfLines = 0;

        //init values in all dimensions to 0.
        for( var i = 0 ; i < dim.length ; i++){
            avgDistance[ dim[i] ] = 0;
        }

        //does data.assignements exist yet?	-> change to theData.assignments
        theData.forEach( function(d) {

            if(d.assignments == idx)
            {
                numberOfLines += 1;
                for(var i = 0; i < dim.length ; i++){
                    avgDistance[dim[i]] += d[dim[i]];
                }
            }
        });

        for(var i = 0 ; i < dim.length ; i++){
            avgDistance[ dim[i] ] /= numberOfLines;
        }

        reCalcedCentr.push(avgDistance);

    });

    //returnList = assignClusters(dim, reCalcedCentr, theData);

    return reCalcedCentr;
}

// Euclidian distance between two points.
function getEuclidianDistance(centroid, point, dimension)
{
    var distance = 0;

    for(var i = 0 ; i < dimension.length ; i++ ){
        distance += Math.pow( point[dimension[i]] - centroid[dimension[i]], 2);
    }

    return Math.sqrt(distance);

}


//transform data to fit lab3
function transformData(data){
    var recTime = "RecordingTimestamp"
    var transformData = [];
    data.forEach(function(d)
    {
        transformData.push({
            recordTime : +d["RecordingTimestamp"],
           xVal: +d["GazePointX(px)"],
           yVal: +d["GazePointY(px)"]
        });
    })
    console.log("hejfrån k means");
    return transformData;
}