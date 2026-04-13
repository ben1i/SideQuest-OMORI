"use strict";

var map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: 0.2,
    maxZoom: 1,
    maxBoundsViscosity: 1
});

var handIcon = L.icon({
    iconUrl: './assets/images/arrow.png',

    iconSize: [50, 96,66],
    iconAnchor: [22, 94]
})

/*
map.on('mousemove', function (e) {
    console.log(e.latlng);
});

var bounds = [[0, 0], [1472, 1344]];
var image = L.imageOverlay('./assets/images/map92.png', bounds).addTo(map);


map.setView([736, 672], 0.2)
map.setMaxBounds(bounds);

var marker = L.marker([10, 750], {icon: handIcon});
marker.addTo(map);
marker.on('click', function() {
    bounds = [[0, 0], [2560, 1600]];
    image = L.imageOverlay("./assets/images/map93.webp", bounds).addTo(map);
    map.setMaxBounds(bounds);
    map.setView([2560, 800], 0.2);

    marker.remove();
});

var daisy = L.imageOverlay('./assets/images/daisy.png', [[550, 165], [595, 210]], {
    interactive: true
}).addTo(map);
*/

fetch('./assets/data/data.json')
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
        var bounds = data.maps.ghostparty.size;
        var image = L.imageOverlay("" + data.maps.ghostparty.pathtoimage + "", bounds).addTo(map);
        
        map.setView([(bounds[1][0]) / 2, (bounds[1][1] / 2)], 1);
        map.setMaxBounds(bounds);

        var interaction = L.imageOverlay("" + data.maps.ghostparty.interactions[0].interactionimage + "", data.maps.ghostparty.interactions[0].coordinates, {
            interactive: true
        }).addTo(map);

        var marker = L.marker(data.maps.ghostparty.exits[0].coordinates, {icon: handIcon}).addTo(map);
    })