document.addEventListener('DOMContentLoaded',function(){
    req=new XMLHttpRequest();
    req.open("GET",'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json',true);
    req.send();
    req.onload=function(){
      json=JSON.parse(req.responseText);
      const baseTemp = json.baseTemperature;
      const dataset = json.monthlyVariance;
      const padding = 100;
      const w = 1000;
      const h = 600-padding;

      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var  yearFormat = function(d){
        return Number(d);
      }
      var  monthFormat = function(d){
        return months[d-1];
      }
      const xScale = d3.scaleLinear()
                   .domain([d3.min(dataset, (d) => d.year), d3.max(dataset, (d) => d.year)])
                   .range([padding, w-60]);
      const yScale = d3.scaleLinear()
                   .domain([12.5, 0.5])
                   .range([h-padding, padding]);
      const svg = d3.select("div")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
      svg.selectAll("rect")
         .data(dataset)
         .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(d.year))
        .attr("y", (d, i) =>  yScale(d.month)-((h-2*padding)/24).toFixed(2))
        .attr("width", ((w-padding)/(dataset.length/12)).toFixed(2))
        .attr("height", (d, i) => ((h-2*padding)/12).toFixed(2))
        .attr("fill", function(d){
          let color = baseTemp + d.variance;
          if(color < 2.7) {return "purple";}
          else if (color < 3.9) {return "#1d4877"}
          else if (color < 5) {return "#1b8a5a";}
          else if (color < 6.1) {return "#7bc043";}
          else if (color < 7.2) {return "#bbcc43";}
          else if (color < 8.3) {return "#ffee90";}
          else if (color < 9.4) {return "#ffcc50";}
          else if (color < 10.5) {return "#fbb021";}
          else if (color < 11.6) {return "#f68838";}
          else if (color < 12.7) {return "#ee3e32";}
          else {return "#ee1b12";}
        })
        .attr("class", "bar")
        .append("title")
        .text((d) => d.year + " - " + months[d.month-1] + ", " + (d.variance + baseTemp).toFixed(3) + " °C, " + d.variance + " °C");

  //  document.getElementById('test').innerHTML=baseTemp+dataset[0].variance;
      const xAxis = d3.axisBottom(xScale).tickFormat(yearFormat);
      svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")

        .call(xAxis)
      svg.append('g')
        .attr('transform', 'translate(' + w/2 + ', ' + (h-50) + ')')
        .append('text')
        .attr('text-anchor', 'middle')
        .attr("class", "axislabel")
        .text('Years');

      const yAxis = d3.axisLeft(yScale).tickFormat(monthFormat);
      svg.append("g")
        .attr("transform", "translate(0" + padding + ")")

        .call(yAxis);
      svg.append('g')
      .attr('transform', 'translate(' + 30 + ', ' + h/2 + ')')
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr("class", "axislabel")
      .text('Months');

   };
});
