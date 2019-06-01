queue()
  .defer(d3.csv,'./data/smallData.csv')
  .defer(d3.csv,'./data/processed/groupSizes.csv')
  .await(draw);

var mainPage;
var pieChart; 


function draw(error, data, data2){
    if (error) throw error;

    var t0 = performance.now();
    mainPage = new mainPage(data);
    pieChart = new pieChart(data2); 
    
    var t1 = performance.now();
    console.log("Call to project " + (t1 - t0) + " milliseconds.");

}