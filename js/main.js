// import MovementPlot from '/movementPlot.js'
queue()
  .defer(d3.csv,'./data/checkin/Friday/FridayCheckIn.csv')
  .await(draw);

var mainPage;
var pieChart; 
var movement; 

function draw(error, morningFriday){
  if (error) {
    throw error;
  }
    var t0 = performance.now();
    // mainPage = new mainPage(morningFriday, morningFridayCheckIn);
    // pieChart = new pieChart(data2); 
    movement = new movementPlot(morningFriday);
    
    var t1 = performance.now();
    console.log("Call to project " + (t1 - t0) + " milliseconds.");
}