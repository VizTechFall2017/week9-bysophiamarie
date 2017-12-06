var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;

var marginLeft = 100;
var marginTop = 100;

//var nestedData = [];

var svg = d3.select('#svg1')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var svg2 = d3.select('#svg2')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');


//these are the size that the axes will be on the screen; set the domain values after the data loads.
var scaleX = d3.scaleBand().rangeRound([0, width-2*marginLeft]).padding(0.1);
var scaleY = d3.scaleLinear().range([height-2*marginTop, 0]);
var scaleX2 = d3.scaleBand().rangeRound([0, width-2*marginLeft]).padding(0.1);
var scaleY2 = d3.scaleLinear().range([height-2*marginTop, 0]);



//import the data from the .csv file
d3.csv('./Week7_PS01_HouseRegion.csv', function(dataIn){

  dataIn.forEach(function(d) {
    d.HousesinRegion = +d.HousesinRegion;
  });

  console.log (dataIn);

  //  nestedData = d3.nest()
    //    .key(function(d){return d.year})
      //  .entries(dataIn);

  //  var loadData = nestedData.filter(function(d){return d.key == '1987'})[0].values;

    // Add the x Axis
    svg.append("g")
        .attr('class','xaxis')
        .attr('transform','translate(0,' + (height-2*marginTop) + ')')  //move the x axis from the top of the y axis to the bottom
        .call(d3.axisBottom(scaleX));

    svg.append("g")
        .attr('class', 'yaxis')
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
    //svg.selectAll('rect')
    //    .data(loadData, function(d){return d;});

    //call the drawPoints function below, and hand it the data2016 variable with the 2016 object array in it
    drawPoints(dataIn);

});

//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints(pointData){

    scaleX.domain(pointData.map(function(d){return d.Region;}));

    scaleY.domain([0, d3.max(pointData.map(function(d){return +d.HousesinRegion}))]);

    d3.selectAll('.xaxis')
        .call(d3.axisBottom(scaleX));

    d3.selectAll('.yaxis')
        .call(d3.axisLeft(scaleY));

    //select all bars in SVG1, and bind them to the new data
    var rects = svg.selectAll('.bars')
        .data(pointData, function(d){return d.Region;});

    //look to see if there are any old bars that don't have keys in the new data list, and remove them.


    //update the properties of the remaining bars (as before)


    //add the enter() function to make bars for any new countries in the list, and set their properties
    rects
        .enter()
        .append('rect')
        .attr('class','bars')
        .attr('fill', "slategray")
        .attr('x',function(d){
            return scaleX(d.Region);
        })
        .attr('y',function(d){
            return scaleY(d.HousesinRegion);
        })
        .attr('width',function(d){
            return scaleX.bandwidth();
        })
        .attr('height',function(d){
            return height-2*marginTop - scaleY(d.HousesinRegion);  //400 is the beginning domain value of the y axis, set above
        })
        .attr("class", function(d){
          return d.Region
        })
        .on('mouseover', function(d) {
          d3.select (this) .attr("fill", "#004d4d")


          var selection = d3.select (this).attr("class")

          svg2.selectAll("." + selection).attr("fill", "#642a34");




})

      .on('mouseout', function(d) {
        d3.select (this) .attr("fill","slategray")
        var selection = d3.select (this).attr("class")

        svg2.selectAll("." + selection).attr("fill","slategray");
      })
};





    //select all bars in SVG2, and bind them to the new

d3.csv('./Week7_PS01_HouseCharacters.csv', function(dataIn2){
  console.log (dataIn2);

  //dataIn2.forEach(function(d){
    //d.Characters = +d.Characters;
  //});

  /*  nestedData = d3.nest()
        .key(function(d){return d.year})
        .entries(dataIn);

    var loadData = nestedData.filter(function(d){return d.key == '1987'})[0].values;
*/
    // Add the x Axis


    svg2.append("g")
        .attr('class','xaxis2')
        .attr('transform','translate(0,' + (height-2*marginTop) + ')')  //move the x axis from the top of the y axis to the bottom
        .call(d3.axisBottom(scaleX2));

    svg2.append("g")
        .attr('class', 'yaxis2')
        .call(d3.axisLeft(scaleY2));

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
    //svg.selectAll('rect')
    //    .data(loadData, function(d){return d;});

    //call the drawPoints function below, and hand it the data2016 variable with the 2016 object array in it
    drawPoints2(dataIn2);

});

//this function draws the actual data points as circles. It's split from the enter() command because we want to run it many times
//without adding more circles each time.
function drawPoints2(pointData){

    scaleX2.domain(pointData.map(function(d){return d.House;}));
    scaleY2.domain([0, d3.max(pointData.map(function(d){return +d.Characters}))]);

    d3.selectAll('.xaxis2')
        .call(d3.axisBottom(scaleX2));

    d3.selectAll('.yaxis2')
        .call(d3.axisLeft(scaleY2));


    //select all bars in SVG2, and bind them to the new data
    var rects2 = svg2.selectAll('.bars')
        .data(pointData, function(d){return d.House;});

    //look to see if there are any old bars that don't have keys in the new data list, and remove them.

    //add the enter() function to make bars for any new countries in the list, and set their properties
    rects2
        .enter()
        .append('rect')
        .attr('class','bars')
        .attr('fill', "slategray")
        .attr('x',function(d){
            return scaleX2(d.House);
        })
        .attr('y',function(d){
            return scaleY2(d.Characters);
        })
        .attr('width',function(d){
            return scaleX2.bandwidth();
        })
        .attr('height',function(d){
            return height-2*marginTop - scaleY2(d.Characters);  //400 is the beginning domain value of the y axis, set above
        })
        .attr("class", function(d){
          return d.HouseRegion
        })};


function updateData(selectedYear){
    return nestedData.filter(function(d){return d.key == selectedYear})[0].values;
}


//this function runs when the HTML slider is moved
function sliderMoved(value){

    newData = updateData(value);
    drawPoints(newData);

}
