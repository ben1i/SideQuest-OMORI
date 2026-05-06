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

var lastMap;

/*
map.on('mousemove', function (e) {
    console.log(e.latlng);
});

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

/*
fetch('./assets/data/data.json')
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {

        var maps  = data.maps;
        
        var currentMap = maps.ghostparty;
        
        var exits = currentMap.exits;

        var bounds = currentMap.size;
        var image = L.imageOverlay("" + currentMap.pathtoimage + "", bounds).addTo(map);
        
        map.setView([(bounds[1][0]) / 2, (bounds[1][1] / 2)], 1);
        map.setMaxBounds(bounds);

        var interaction = L.imageOverlay("" + currentMap.interactions[0].interactionimage + "", currentMap.interactions[0].coordinates, {
            interactive: true
        }).addTo(map);

        var marker = L.marker(exits[0].coordinates, {icon: handIcon}).addTo(map);
        marker.on('click', function() {

            var lastMap = currentMap;
            console.log(lastMap.exits[0].setView)
            currentMap = maps[exits[0].exitTo];

            bounds = currentMap.size;
            var image = L.imageOverlay("" + currentMap.pathtoimage + "", bounds).addTo(map);
            map.setMaxBounds(bounds);
            map.setView(lastMap.exits[0].setView, 1);

            marker.remove();
        });
    })
*/

fetch('./assets/data/data.json')
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
        var maps = data.maps;

        var currentMapElements = L.layerGroup().addTo(map);

        function loadMap(mapName, targetView) {
            var currentMap = maps[mapName];
            console.log(currentMap);
            var bounds = currentMap.size;

            currentMapElements.clearLayers();

            var bgImage = L.imageOverlay(currentMap.pathtoimage, bounds, { zIndex: 1 });
            currentMapElements.addLayer(bgImage);
            
            map.setMaxBounds(bounds);

            if (targetView) {
                map.setView(targetView, 1);
            } else {
                map.setView([(bounds[1][0]) / 2, (bounds[1][1] / 2)], 1);
            }

            if (currentMap.interactions) {
                currentMap.interactions.forEach(function(interactionData) {
                    var interaction = L.imageOverlay(interactionData.interactionimage, interactionData.coordinates, {
                        interactive: true,
                        zIndex: 2
                    });
                    
                    //Interaction
                    interaction.on('click', function() {
                        console.log("Interaction cliquée :", interactionData.interactonName);
                    });

                    currentMapElements.addLayer(interaction);
                });
            }

            if (currentMap.exits) {
                currentMap.exits.forEach(function(exitData) {
                    var marker = L.marker(exitData.coordinates, {icon: handIcon});
                    
                    marker.on('click', function() {
                        loadMap(exitData.exitTo, exitData.setView);
                    });

                    currentMapElements.addLayer(marker);
                });
            }

            console.log(currentMapElements)
        }

        loadMap('vastforest-left');

    })
    .catch(function(error) {
        console.error("Erreur critique lors du chargement :", error);
    });