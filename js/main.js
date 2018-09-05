/**
 * Created by Agnes on 2018-03-26.
 */
queue()
  .defer(d3.csv,'./data/smallData.csv')
  //.defer(d3.csv,'./data/testData2.csv')
    .await(draw);

var test;
var mainPage;
 

function draw(error, data){
    if (error) throw error;

    var t0 = performance.now();

    test = new test(data);
    mainPage = new mainPage(data);
    var t1 = performance.now();
    console.log("Call to project " + (t1 - t0) + " milliseconds.");

}