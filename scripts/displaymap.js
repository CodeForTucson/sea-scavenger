async function drawMap() {   

    // Get dimensions of map container in current viewport.
    let mapContainer = document.getElementById("worldmap");
    let dimensions = {
        height: mapContainer.offsetHeight,
        width: mapContainer.offsetWidth
    };
    
    // Retrieve GeoJSON for countries.
    const countryShapes = await d3.json("data/world-geojson.json");

    // Calculate Equirectangular projection for country data.
    const projection = d3.geoEquirectangular()
        .fitSize([dimensions.width, dimensions.height], countryShapes)
        .translate([dimensions.width / 2, dimensions.height / 2]);

    // Generate SVG path for projection.
    const pathGenerator = d3.geoPath(projection);

    // Create map container.
    const wrapper = d3.select("#worldmap")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);
//        .style("stroke", "gray")
//        .style("fill", "lightgray");

    // Render map.
    const countries = wrapper.selectAll(".country")
        .data(countryShapes.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator);

}

drawMap();