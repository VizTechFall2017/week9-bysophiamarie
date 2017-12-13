var width = d3.select('svg').attr('width');
var height = d3.select('svg').attr('height');

var marginLeft = 100;
var marginTop = 100;

var nestedData = [];

var svg = d3.select('svg')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

//these are the size that the axes will be on the screen; set the domain values after the data loads.
var scaleX = d3.scaleBand().rangeRound([0, 600]).padding(0.5);
var scaleY = d3.scaleLinear().range([400, 0]);


//import the data from the .csv file
d3.csv('./Characters_got.csv', function(dataIn){
  console.log(dataIn)

  Title ();
  ChartTitle ();

    //nestedData = d3.nest()
      //  .key(function(d){return d.Name})
        //.entries(dataIn);
        //console.log (nestedData)

    //var loadData = nestedData.filter(function(d){return d.key == 'Baratheon', })[0].values;
    //console.log (loadData)

    scaleX.domain(dataIn.map(function(d){return d.Name;}));
    scaleY.domain([0, d3.max(dataIn.map(function(d){return +d.Total}))]);

    // Add the x Axis
    svg.append("g")
        .attr('transform','translate(0,400)')  //move the x axis from the top of the y axis to the bottom
        .call(d3.axisBottom(scaleX))
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".25em")
        .attr("transform", "rotate(90)")
        .style ("text-anchor", "start");

    svg.append("g")
        .attr('class','yaxis')
        .call(d3.axisLeft(scaleY));

/*
    svg.append('text')
        .text('Weekly income by age and gender')
        .attr('transform','translate(300, -20)')
        .style('text-anchor','middle');

    svg.append('text')
        .text('age group')
        .attr('transform','translate(260, 440)');

    svg.append('text')
        .text('weekly income')
        .attr('transform', 'translate(-50,250)rotate(270)');

        */

    //bind the data to the d3 selection, but don't draw it yet
    svg.selectAll('rect')
        .data(dataIn)
        .enter()
        .append('rect')
        .attr('class','bars')
        .attr ('fill', Colorcode);


    //call the drawPoints function below, and hand it the data2016 variable with the 2016 object array in it
    drawPoints(dataIn);

});

//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    scaleY.domain([0, d3.max(pointData.map(function(d){return +d.Total}))]);

    svg.selectAll('.yaxis')
        .call(d3.axisLeft(scaleY));

    svg.selectAll('rect')
        .data(pointData)
        .attr('x',function(d){
            return scaleX(d.Name);
        })
        .attr('y',function(d){
            return scaleY(+d.Total);
        })
        .attr('width',function(d){
            return scaleX.bandwidth();
        })
        .attr('height',function(d){
            return 400 - scaleY(+d.Total);  //400 is the beginning domain value of the y axis, set above
        });

}
function Colorcode(d) {
  if (d.House == 'Baratheon') {return "purple"}

  else if (d.House == 'Greyjoy') {return "green"}
  else if (d.House == 'Stark') {return "gray"}
  else if (d.House == 'Lannister') {return "red"}
  else if (d.House == 'Frey') {return "black"}
  else if (d.House == 'Targaryen') {return "orange"}

  else {return "white"}
}

function Title () {
  svg.append ("text")
    .attr("y", 40)
    .attr("x", 0)
    .text ("Number of Book Appearances")
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style ("text-anchor", "start")
    .attr ("class", "Title")
}

function ChartTitle () {
    svg.append ("text")
    .attr ("x", 50)
    .attr ("y", -25)
    .attr("class", "ChartTitle")
    .text ("Game of Thrones Character Appearances")

}
//function updateData(selectedYear){
  //  return nestedData.filter(function(d){return d.key == selectedYear})[0].values;
//}


//this function runs when the HTML slider is moved
//function sliderMoved(value){

  //  newData = updateData(value);
    //drawPoints(newData);

//}
