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
    iconUrl: './assets/images/arrow.webp',

    iconSize: [50, 96,66],
    iconAnchor: [22, 94]
})

var itineraryIcon = L.icon({
    iconUrl: './assets/images/arrow-highlight.webp',
    iconSize: [50, 96,66],
    iconAnchor: [22, 94]
})

var lastMap;

var homeScreen = document.querySelector('.sq__home');
var homeButton = document.querySelector('.sq__okButton');

homeButton.addEventListener('click', function() {
    homeScreen.classList.add('hidden');

    localStorage.setItem('homeScreen', 'closed');
})

var creditsSection = document.querySelector('.sq__credits');
var creditsButton = document.querySelector('.sq__creditsButton');
var creditsClose = document.querySelector('.sq__creditsclose')

creditsButton.addEventListener('click', function() {
    creditsButton.classList.add('hidden');

    creditsSection.classList.remove('hidden');
});

creditsClose.addEventListener('click', function() {
    creditsButton.classList.remove('hidden');

    creditsSection.classList.add('hidden');
})

var spawnForms = document.querySelector('.sq__spawn');
var dayForm = document.querySelector('.sq__day');
var heightsForm = document.querySelector('.sq__heights');
var plutoForm = document.querySelector('.sq__pluto');
var sweetheartForm = document.querySelector('.sq__sweetheart');
var orangeoasisForm = document.querySelector('.sq__orangeoasis');
var locationForm = document.querySelector('.sq__location');

var pluto = false;
var heights = false;
var sweetheart = false;

var settingsDiv = document.querySelector('.sq__settings');
var chapterSettings = document.querySelector('.sq__parameter--chapter');
var heightsSettings = document.querySelector('.sq__parameter--heights');
var plutoSettings = document.querySelector('.sq__parameter--pluto');
var sweetheartSettings = document.querySelector('.sq__parameter--sweetheart');

var settingsButton = document.querySelector('.sq__opensettings');
var resetButton = document.querySelector('.sq__reset');
var settingsClose = document.querySelector('.sq__settingsclose img');

var questMenu = document.querySelector('.sq__quests');
var questButton = document.querySelector('.sq__openquests');
var questClose = document.querySelector('.sq__questclose');

var questList = document.querySelectorAll('.sq__questName');

var splashtextBox = document.querySelector('.sq__splashtext');

var stopQuestButton= document.querySelector('.sq__stopquest');

var questWarning = document.querySelector('.sq__warning');
var questWarningYes = document.querySelector('.sq__yesQuest');
var questWarningNo = document.querySelector('.sq__noQuest');
var questWarningText = document.querySelector('.sq__warningtext');

settingsButton.addEventListener('click', function() {
    settingsDiv.classList.add('sq__settings--appear');
    localStorage.setItem('settings', 'open');

    settingsButton.classList.add('hidden');
});

settingsClose.addEventListener('click', function() {
    settingsDiv.classList.remove('sq__settings--appear');
    localStorage.setItem('settings', 'closed');

    settingsButton.classList.remove('hidden');
})

questButton.addEventListener('click', function() {
    questMenu.classList.add('sq__quests--appear');
    localStorage.setItem('questmenu', "open");

    questButton.classList.add('hidden');
});

questClose.addEventListener('click', function() {
    questMenu.classList.remove('sq__quests--appear');
    localStorage.setItem('questmenu', "closed");

    questButton.classList.remove('hidden');
})

const heightsBlocked = [
    "pinwheelforest",
    "otherworld-ladder",
    "northlake",
    "pyreflyforest-1",
    "trainstation-vastforest",
    "orangeoasis"
];

const plutoBlocked = [
    "pluto",
    "northlake",
    "pyreflyforest-1",
    "trainstation-vastforest",
    "orangeoasis"
];

const prologueBlocked = [
    "northlake",
    "pyreflyforest-1",
    "trainstation-vastforest",
    "orangeoasis"
];

const threedaysleftBlocked = [
    "northlake"
];

fetch('./assets/data/data.json')
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {

        var currentDay = localStorage.getItem("day");
        pluto = localStorage.getItem("pluto") === "true";
        heights = localStorage.getItem("heights") === "true";
        sweetheart = localStorage.getItem("sweetheart") === "true";
        var lastLocation = localStorage.getItem('location');
        var loadView = JSON.parse(localStorage.getItem('setView'));

        var activeQuest = localStorage.getItem('quest');
        var activeQuestStep = localStorage.getItem('questStep');

        var maps = data.maps;
        var currentMapElements = L.layerGroup().addTo(map);

        var isHomeScreenOpen = localStorage.getItem('homeScreen');
        if (isHomeScreenOpen) {
            if (isHomeScreenOpen === "open") {
                homeScreen.classList.remove('hidden');
            } else {
                homeScreen.classList.add('hidden');
            }
        }

        document.querySelectorAll('.sq__chapterradio').forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.checked) {
                    localStorage.setItem('day', this.value);
                    currentDay = this.value;

                    location.reload();
                    
                }
            })
        });

        document.querySelectorAll('.sq__heightsradio').forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.checked) {
                    localStorage.setItem('heights', this.value);
                    heights = this.value;

                    location.reload();
                }
            })
        });

        document.querySelectorAll('.sq__plutoradioSettings').forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.checked) {
                    localStorage.setItem('pluto', this.value);
                    pluto = this.value;

                    location.reload();
                }
            })
        });

        document.querySelectorAll('.sq__sweetheartradioSettings').forEach(radio => {
            radio.addEventListener('change', function () {
                if (this.checked) {
                    localStorage.setItem('sweetheart', this.value);
                    sweetheart = this.value;

                    location.reload();
                }
            })
        });

        resetButton.addEventListener('click', function() {
            localStorage.clear();
            localStorage.setItem('settings', 'closed');

            location.reload();
        });
        
        if (!currentDay) {
            let locationValue = "";

            let vastforestOption = document.querySelector('.sq__label--vastforest');
            let otherworldOption = document.querySelector('.sq__label--otherworld');
            let orangeoasisOption = document.querySelector('.sq__label--orangeoasis');
            let pyreflyforestOption = document.querySelector('.sq__label--pyreflyforest');
            let sweetheartcastleOption = document.querySelector('.sq__label--sweetheartcastle');
            let lastresortOption = document.querySelector('.sq__label--lastresort');
            let underwaterhighwayOption = document.querySelector('.sq__label--underwaterhighway');

            settingsButton.classList.add('hidden');
            questButton.classList.add('hidden');

            const dayRadios = document.querySelectorAll('.sq__dayradio');
            dayRadios.forEach(radio => {
                radio.addEventListener("change", () => {
                    currentDay = radio.value;

                    dayForm.classList.add('hidden');

                    if (currentDay === "prologue") {
                        document.getElementById('prologueSettings').checked = true;

                        plutoForm.classList.remove('hidden');

                        pyreflyforestOption.classList.add('hidden');
                        sweetheartcastleOption.classList.add('hidden');
                        lastresortOption.classList.add('hidden');
                        underwaterhighwayOption.classList.add('hidden');
                        orangeoasisOption.classList.add('hidden');

                    } else if (currentDay === "threedaysleft") {
                        document.getElementById('plutoTrue').checked = true;
                        document.getElementById('heightsTrue').checked = true;

                        document.getElementById('threedaysleftSettings').checked = true;

                        sweetheartForm.classList.remove('hidden');

                        pluto = true;
                        heights = true;

                        lastresortOption.classList.add('hidden');
                        underwaterhighwayOption.classList.add('hidden');

                    } else if (currentDay === "twodaysleft") {
                        document.getElementById('twodaysleftSettings').checked = true;
                        document.getElementById('plutoTrue').checked = true;
                        document.getElementById('heightsTrue').checked = true;
                        document.getElementById('sweetheartTrue').checked = true;

                        locationForm.classList.remove('hidden');

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
                        document.getElementById('plutoTrue').checked = true;

                        pluto = true;
                        heights = true;

                        locationForm.classList.remove('hidden');

                    } else {
                        document.getElementById('plutoFalse').checked = true;

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
                        document.getElementById('heightsTrue').checked = true;

                        heights = true;

                    } else {
                        document.getElementById('heightsFalse').checked = true;

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
                        document.getElementById('sweetheartTrue').checked = true;

                        sweetheart = true;

                    } else {
                        document.getElementById('sweetheartFalse').checked = true;

                        sweetheart = false;
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
                    
                    localStorage.setItem("day", currentDay);

                    if (locationValue === "vastforest") {
                        localStorage.setItem("location", "stumpentrance");
                    } else if (locationValue === "pyreflyforest") {
                        localStorage.setItem("location", "pyrefly-to-mole");
                    } else if (locationValue === "sweetheartcastle") {
                        localStorage.setItem("location", "sweetheart-castle");
                    } else if (locationValue === "underwaterhighway") {
                        localStorage.setItem("location", "deepwell");
                    } else {
                        localStorage.setItem("location", locationValue);
                    }

                    localStorage.setItem("heights", heights);
                    localStorage.setItem("pluto", pluto);
                    localStorage.setItem("sweetheart", sweetheart);

                    settingsDiv.classList.remove('hidden');
                    questMenu.classList.remove('hidden');

                    location.reload();
                })
            })
        } else {
            spawnForms.classList.add('hidden');

            settingsDiv.classList.remove('hidden');
            questMenu.classList.remove('hidden');

            loadMap(lastLocation, loadView);
        }

        questList.forEach(list => {
            list.addEventListener('click', function() {
                localStorage.removeItem('quest');
                localStorage.removeItem('questStep');
                
                if (list.textContent === "Ghost Party" && currentDay === "twodaysleft") {
                    stopQuestButton.classList.remove('hidden');
                    localStorage.setItem('stopQuestButton', 'open');

                    localStorage.setItem('quest', list.textContent);
                    localStorage.setItem('questStep', 0);

                    questMenu.classList.remove('sq__quests--appear');
                    localStorage.setItem('questmenu', 'closed');

                    location.reload();
                } else {
                    alert('This quest cannot be done in your current chapter');
                }
            })
        })

        function loadMap(mapName, targetView) {
            var currentMap = maps[mapName];
            var bounds = currentMap.size;

            localStorage.setItem("location", mapName);

            var openSettings = localStorage.getItem('settings');
            if (openSettings === "open") {
                settingsDiv.classList.add('sq__settings--appear');

                settingsButton.classList.add('hidden');
            } else if (openSettings === "closed") {
                settingsDiv.classList.remove('sq__settings--appear');

                settingsButton.classList.remove('hidden');
            }

            var openQuests = localStorage.getItem('questmenu');
            if (openQuests === "open") {
                questMenu.classList.add('sq__settings--appear');

                questButton.classList.add('hidden');
            } else if (openQuests === "closed") {
                questMenu.classList.remove('sq__settings--appear');

                questButton.classList.remove('hidden');
            }

            var stopQuestButtonMemory = localStorage.getItem('stopQuestButton');
            if (stopQuestButtonMemory === "open") {
                stopQuestButton.classList.remove('hidden');
            } else {
                stopQuestButton.classList.add('hidden');
            }

            stopQuestButton.addEventListener('click', function() {
                localStorage.removeItem('quest');
                localStorage.removeItem('questStep');

                localStorage.setItem('stopQuestButton', 'close');

                location.reload();
            })

            map.on('moveend', function(e) {
                let currentView = map.getCenter();

                const coords = [currentView.lat, currentView.lng];

                localStorage.setItem('setView', JSON.stringify(coords));
            })

            if (currentDay === 'prologue') {
                sweetheart = false;

                document.getElementById('prologueSettings').checked = true;

                sweetheartSettings.classList.add('hidden');
                document.getElementById('sweetheartFalse').checked = true;
            } else if (currentDay === "threedaysleft") {
                heights = true;
                pluto = true;

                document.getElementById('threedaysleftSettings').checked = true;

                heightsSettings.classList.add('hidden');
                plutoSettings.classList.add('hidden');
                document.getElementById('heightsTrue').checked = true;
                document.getElementById('plutoTrue').checked = true;
            } else if (currentDay === "twodaysleft") {
                heights = true;
                pluto = true;
                sweetheart = true;

                document.getElementById('twodaysleftSettings').checked = true;

                heightsSettings.classList.add('hidden');
                plutoSettings.classList.add('hidden');
                sweetheartSettings.classList.add('hidden');
                document.getElementById('heightsTrue').checked = true;
                document.getElementById('plutoTrue').checked = true;
                document.getElementById('sweetheartTrue').checked = true;
            }

            if (heights === true) {
                document.getElementById('heightsTrue').checked = true;
            } else {
                pluto = false;
                sweetheart = false;
                document.getElementById('heightsFalse').checked = true;
                plutoSettings.classList.add('hidden');
            }

            if (pluto === true) {
                document.getElementById('plutoTrue').checked = true;
            } else {
                sweetheart = false;
                document.getElementById('plutoFalse').checked = true;
            }

            if (sweetheart === true) {
                document.getElementById('sweetheartTrue').checked = true;
            } else {
                document.getElementById('sweetheartFalse').checked = true;
            }

            currentMapElements.clearLayers();

            var bgImage = L.imageOverlay(currentMap.pathtoimage, bounds, { zIndex: 1 });
            currentMapElements.addLayer(bgImage);
            
            map.setMaxBounds(bounds);

            console.log(bounds)

            if (targetView) {
                map.setView(targetView, 1);
            } else {
                map.setView([(bounds[1][0]) / 2, (bounds[1][1] / 2)], 1); //toujours au centre de la carte [y de la carte / 2, x de la map / 2]
            }

            if (currentMap.interactions) {
                currentMap.interactions.forEach(function(interactionData) {
                    var interactionSplashtext;
                    if (activeQuest) {
                        let currentStep = data.questsItinerary[activeQuest][activeQuestStep];

                        let targetMap = currentStep[mapName].goto;

                        interactionSplashtext = currentStep[mapName].splashtext;
                    }

                    if (mapName === "pluto") {
                        if (currentDay === "prologue" && (interactionData.interactionName === "orangeoasis" || interactionData.interactionName === "pyreflyforest" || interactionData.interactionName === "deepwell")) {
                            console.log("This path is not available");
                            return;
                        } else if (currentDay === "threedaysleft" && interactionData.interactionName === "deepwell") {
                            console.log("This path is not available");
                            return;
                        } else {
                            var interaction = L.imageOverlay(interactionData.interactionimage, interactionData.coordinates, {
                                interactive: true,
                                zIndex: 2
                            })
                        }
                    } else {
                        var interaction = L.imageOverlay(interactionData.interactionimage, interactionData.coordinates, {
                            interactive: true,
                            zIndex: 2
                        });

                        if (!activeQuest && interactionData.questName === "Ghost Party") {
                            interaction.on('click', function() {
                                questWarningText.textContent = "This interaction is part of the " + interactionData.questName + " quest. Would you like to start this quest ?"
                                questWarning.classList.remove('hidden');

                                questWarningYes.addEventListener('click', function() {
                                    if (interactionData.questName === "Ghost Party" && currentDay === "twodaysleft") {
                                        localStorage.setItem('quest', interactionData.questName);
                                        localStorage.setItem('questStep', 0);
                                        localStorage.setItem('stopQuestButton', 'open');

                                        location.reload();
                                    } else {
                                        alert('This quest cannot be done in your current chapter');
                                        questWarning.classList.add('hidden');
                                    }
                                });

                                questWarningNo.addEventListener('click', function() {
                                    questWarning.classList.add('hidden');
                                });
                            })
                        }
                    }

                    if (interactionSplashtext && interaction) {
                        splashtextBox.textContent = interactionSplashtext;

                        splashtextBox.classList.remove('hidden');
                    }

                    if (mapName === "pluto") {
                        interaction.on('click', function() {
                            loadMap(interactionData.map, interactionData.setView);
                        });
                    } else {
                        interaction.on('click', function() {
                            if (activeQuest) {
                                let currentStep = data.questsItinerary[activeQuest][activeQuestStep];

                                if (interactionData.interactionName === currentStep[mapName].goto) {
                                    let totalSteps = data.questsItinerary[activeQuest].length;
                                    activeQuestStep++;

                                    if (activeQuestStep >= totalSteps) {
                                        alert("Félicitations, la quête" + activeQuest + "est terminée !");
                                        localStorage.removeItem('quest');
                                        localStorage.removeItem('questStep');
                                        localStorage.setItem('stopQuestButton', 'closed')
                                        activeQuest = null;

                                        location.reload();
                                    } else {
                                        alert("Étape terminée! Suivante");
                                        localStorage.setItem('questStep', activeQuestStep);
                                    }

                                    loadMap(mapName);
                                }
                            }
                        })
                    }

                    currentMapElements.addLayer(interaction);
                });
            }

            if (currentMap.exits) {
                currentMap.exits.forEach(function(exitData) {
                    if (heights === false && heightsBlocked.includes(exitData.exitTo)) {
                        console.log("you haven't beaten your fear of heights");
                    } else if (pluto === false && plutoBlocked.includes(exitData.exitTo)) {
                        console.log("You haven't unlocked Pluto's Ride");
                    } else if (currentDay === "prologue" && prologueBlocked.includes(exitData.exitTo)) {
                        console.log("This area is not accessible during the prologue");
                    } else if (currentDay === "threedaysleft" && threedaysleftBlocked.includes(exitData.exitTo)) {
                        console.log("This area is not accessible during Three Days Left");
                    } else {
                        var currentIcon = handIcon;
                        var currentSplashtext;

                        if (activeQuest) {
                            let currentStep = data.questsItinerary[activeQuest][activeQuestStep];

                            let nextDestination = currentStep[mapName].goto;

                            if (exitData.exitTo === nextDestination) {
                                currentIcon = itineraryIcon;
                                currentSplashtext = currentStep[mapName].splashtext;
                            }
                        }

                        var marker = L.marker(exitData.coordinates, {icon: currentIcon});

                        if (currentSplashtext) {
                            splashtextBox.textContent = currentSplashtext;

                            splashtextBox.classList.remove('hidden');
                        }

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
                    }
                });
            }
        }
    })
    .catch(function(error) {
        console.error("Erreur critique lors du chargement :", error);
    });