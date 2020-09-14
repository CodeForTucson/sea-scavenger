var width = 900;
var height = 550;

var projection = d3.geoMercator()
    .center([0, 20])
    .scale(120)
    .rotate([-10, 0]);

var svg = d3.select(".worldmap").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geoPath()
    .projection(projection);

var g = svg.append("g");

d3.json("maps/countries-110m.json").then(function(topology) {
    g.selectAll("path")
        .data(topojson.feature(topology, topology.objects.countries).features)
            .enter()
            .append("path")
            .attr("d", path);
});
