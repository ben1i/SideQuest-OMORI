"use strict";

import L from 'leaflet';
import 'leaflet-rotatedmarker';

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

var spawnForms = document.querySelector('.sq__spawn');
var dayForm = document.querySelector('.sq__day');
var heightsForm = document.querySelector('.sq__heights');
var plutoForm = document.querySelector('.sq__pluto');
var sweetheartForm = document.querySelector('.sq__sweetheart');
var orangeoasisForm = document.querySelector('.sq__orangeoasis');
var locationForm = document.querySelector('.sq__location');

var pluto = false;
var heights = false;
var orangeoasis = false;
var sweetheart = false;

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
        let dayValue = "";
        let locationValue = "";

        let vastforestOption = document.querySelector('.sq__label--vastforest');
        let otherworldOption = document.querySelector('.sq__label--otherworld');
        let orangeoasisOption = document.querySelector('.sq__label--orangeoasis');
        let pyreflyforestOption = document.querySelector('.sq__label--pyreflyforest');
        let sweetheartcastleOption = document.querySelector('.sq__label--sweetheartcastle');
        let lastresortOption = document.querySelector('.sq__label--lastresort');
        let underwaterhighwayOption = document.querySelector('.sq__label--underwaterhighway');

        const dayRadios = document.querySelectorAll('.sq__dayradio');
        dayRadios.forEach(radio => {
            radio.addEventListener("change", () => {
                dayValue = radio.value;

                dayForm.classList.add('hidden');

                if (dayValue === "prologue") {
                    plutoForm.classList.remove('hidden');

                    orangeoasisOption.classList.add('hidden');
                    pyreflyforestOption.classList.add('hidden');
                    sweetheartcastleOption.classList.add('hidden');
                    lastresortOption.classList.add('hidden');
                    underwaterhighwayOption.classList.add('hidden');
                } else if (dayValue === "threedaysleft") {
                    sweetheartForm.classList.remove('hidden');

                    pluto = true;
                    heights = true;

                    lastresortOption.classList.add('hidden');
                    underwaterhighwayOption.classList.add('hidden');
                } else if (dayValue === "twodaysleft") {
                    orangeoasisForm.classList.remove('hidden');

                    sweetheart = true;
                    pluto = true;
                    heights = true;
                }
            })
        });

        const plutoRadios = document.querySelectorAll('.sq__plutoradio');
        plutoRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const plutoValue = radio.value;
                plutoForm.classList.add("hidden");

                if (plutoValue === "true") {
                    pluto = true;
                    heights = true;

                    locationForm.classList.remove('hidden');
                } else {
                    pluto = false;

                    heightsForm.classList.remove("hidden");
                }
            })
        })

        const heightsRadios = document.querySelectorAll('.sq__heightradio');
        heightsRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const heightValue = radio.value;
                heightsForm.classList.add("hidden");

                if (heightValue === "true") {
                    heights = true;
                } else {
                    heights = false;

                    otherworldOption.classList.add('hidden');
                    vastforestOption.classList.remove('hidden');
                }

                locationForm.classList.remove("hidden");
            })
        })

        const sweetheartRadios = document.querySelectorAll('.sq__sweetheartradio');
        sweetheartRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const sweetheartValue = radio.value;
                sweetheartForm.classList.add("hidden");

                if (sweetheartValue === "true") {
                    sweetheart = true;
                } else {
                    sweetheart = false;
                }

                orangeoasisForm.classList.remove('hidden');
            })
        })

        const orangeoasisRadios = document.querySelectorAll('.sq__orangeoasisradio');
        orangeoasisRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                const orangeoasisValue = radio.value;
                orangeoasisForm.classList.add("hidden");

                if (orangeoasisValue === "true") {
                    orangeoasis = true;
                } else {
                    orangeoasis = false;

                    orangeoasisOption.classList.add('hidden');
                }

                locationForm.classList.remove('hidden');
            })
        })

        const locationRadios = document.querySelectorAll('.sq__locationradio');
        locationRadios.forEach(radio => {
            radio.addEventListener("change", () => {
                locationValue = radio.value;

                locationForm.classList.add('hidden');
                spawnForms.classList.add('hidden');
                
                if (locationValue === "vastforest") {
                    loadMap('stumpentrance');
                } else if (locationValue === "otherworld") {
                    loadMap('otherworld');
                } else if (locationValue === "orangeoasis") {
                    loadMap('orangeoasis');
                } else if (locationValue === "pyreflyforest") {
                    loadMap('pyrefly-to-mole');
                } else if (locationValue === "sweetheartcastle") {
                    loadMap('sweetheart-castle');
                } else if (locationValue === "lastresort") {
                    loadMap('lastresort');
                } else if (locationValue === "underwaterhighway") {
                    loadMap('deepwell');
                }
                
                localStorage.setItem("day", dayValue);
                localStorage.setItem("location", locationValue);
                localStorage.setItem("heights", heights);
                localStorage.setItem("pluto", pluto);
                localStorage.setItem("sweetheart", sweetheart);
                localStorage.setItem("orangeoasis", orangeoasis);
            })
        })


        var maps = data.maps;

        var currentMapElements = L.layerGroup().addTo(map);

        function loadMap(mapName, targetView) {
            var currentMap = maps[mapName];
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
                    
                    if (mapName === "pluto") {
                        interaction.on('click', function() {
                            loadMap(interactionData.map, interactionData.setView);
                        })
                    }

                    currentMapElements.addLayer(interaction);
                });
            }

            if (currentMap.exits) {
                currentMap.exits.forEach(function(exitData) {
                    var marker = L.marker(exitData.coordinates, {icon: handIcon});
                    
                    if (exitData.rotation) {
                        if (exitData.rotation === "left") {
                            marker.setRotationAngle(90);
                        } else if (exitData.rotation === "right") {
                            marker.setRotationAngle(270);
                        } else if (exitData.rotation === "top") {
                            marker.setRotationAngle(180);
                        }
                    }

                    marker.on('click', function() {
                        loadMap(exitData.exitTo, exitData.setView);
                    });

                    currentMapElements.addLayer(marker);
                });
            }
        }
    })
    .catch(function(error) {
        console.error("Erreur critique lors du chargement :", error);
    });