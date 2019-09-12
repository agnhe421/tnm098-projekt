queue()
  .defer(d3.csv,'./data/dataGroups/beforeNineFriday.csv')
  .defer(d3.csv,'./data/processed/groupSizes.csv')
  .defer(d3.csv, './data/dataGroups/morningFridayCheckIn.csv')
  .defer(d3.csv, './data/dataGroups/nineToTenFriday.csv')
  .await(draw);
var mainPage;
var pieChart; 

function draw(error, morningFriday, data2, morningFridayCheckIn, nineToTenFriday){
  if (error) {
    throw error;
  }
    var t0 = performance.now();
    // mainPage = new mainPage(morningFriday, morningFridayCheckIn);
    pieChart = new pieChart(data2); 
    movement = new movement(nineToTenFriday)
    var t1 = performance.now();
    console.log("Call to project " + (t1 - t0) + " milliseconds.");
}