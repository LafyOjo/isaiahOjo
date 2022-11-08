//Loading Map
var globalmap = new L.map('globalMap', { zoomControl: false }).setView([24.05179, -74.53138], 10); 
    L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=zGp8PWHFV24kX0dkciIBGaWLpWIHRDXIhZd9AzmfOnB2jhkqra0vEhpeGE60g3sG', {
        zoomControl: false
    }).addTo(globalmap);
    globalmap.attributionControl.addAttribution("<a href=\"https://www.jawg.io\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org\" target=\"_blank\">&copy; OpenStreetMap</a>");
    L.control.zoom({
        position:'bottomright'
    }).addTo(globalmap);

$(document).ready(function() {
    $.ajax({
        url: 'libs/php/population.php',
        type: 'POST',
        dataType: 'json',
        success: function(result) {
            result['data'].forEach(function (info) {
                $("<option>", {
                    value: info.iso_a2,
                    text: info.name
                }).appendTo("#userSelection");
            });
            sortation();
        }
    });
    
function sortation() {
        $("#userSelection").append($("#userSelection option")
            .remove().sort(function(a, b) {
                var at = $(a).text(),
                    bt = $(b).text();
                return (at > bt) ? 1 : ((at < bt) ? -1 : 0);
            })
        );
    };
    navigator.geolocation.getCurrentPosition(returnCurrentLocation);
});

function returnCurrentLocation(area) {
    var latLocation = area.coords.latitude;
    var lngLocation = area.coords.longitude;
    
    $.ajax({
        url: 'libs/php/currentLocationData.php',
        type: 'POST',
        dataType: 'json',
        data: {
            lat: latLocation,
            lng: lngLocation
        },

        success: function(result) {

            isoa2 = result['data'];

            $('#userSelection option[value=' +isoa2+']').prop("selected", true).change();

        },

        error: function(jqXHR, textStatus, errr) {
            console.log(jqXHR);
        }
    })
};

    
    var JSONGeo = new L.GeoJSON();
    
    var countryData = L.easyButton({
    position: 'bottomright',
    states: [{
        stateName: 'open-country-modal',
        icon: 'fa-globe-americas fa-2x',
        title: 'Open Country Information',
        onClick: function onEachFeature(f, l){
                var result = $('#userSelection option:selected').val();
                createRibbon(result);
        }
    }]
});
    
    var weatherData = L.easyButton({
    position: 'bottomright',
    states: [{
        stateName: 'open-weather-modal',
        icon: 'fa-cloud-sun-rain fa-2x',
        title: 'Open Weather Information',
        onClick: function onEachFeature(f, l) {
            var result = $('#userSelection option:selected').text(); 
            weatherModal(result);
        }
    }]
});
    
    var covidData = L.easyButton({
    position: 'bottomright',
    states: [{
        stateName: 'open-covid-modal',
        icon: 'fa-virus fa-2x',
        title: 'Open COVID Information',
        onClick: function onEachFeature(f, l) {
            var result = $('#userSelection option:selected').val(); 
            covidModal(result);
        }
    }]
});

weatherData.button.style.cssText = "height: 40px;width:42px;padding: 7px;color: red;";
countryData.button.style.cssText = "height: 40px;width:42px;padding: 7px;color: blue;";
covidData.button.style.cssText = "height: 40px;width:42px;padding: 7px;color: green;";

var groupedRibbons = L.markerClusterGroup({
    showCoverageOnHover: false,
});
    
$('#userSelection').change(function() {
    var resSelect = $('#userSelection option:selected').val();
    $.ajax({
        url: "libs/php/countryBoundaries.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: resSelect
        },
        success: function(result) {

            if (result.status.name == "ok") {

                JSONGeo.clearLayers();
                groupedRibbons.clearLayers();

                var JSONRes = result['data'];
                JSONGeo.addData( JSONRes ).setStyle( stylesheet ).addTo( globalmap );
                countryData.addTo( globalmap );
                weatherData.addTo( globalmap );
                covidData.addTo( globalmap );
                globalmap.fitBounds(JSONGeo.getBounds());

                addCityRibbons( resSelect );
                dynamicRibbons( resSelect );
                groupedRibbons.addTo( globalmap );
            }
    
        },
        error: function(jqXHR, textStatus, err) {
            console.log(jqXHR);
        }
    });
});
    
function addCityRibbons() {
    var resSelect = $('#userSelection option:selected').val();
    $.ajax({
        url: "libs/php/cityRibbons.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: resSelect
        },
        success: function(result) {
                
            var ribbon = L.geoJson(result, {
                onEachFeature: cityDisplayModel
            });
            ribbon.addTo(groupedRibbons);

        },
        error: function(jqXHR, textStatus, err) {
            console.log(jqXHR);
        }
    })
};
    
function dynamicRibbons() {
    var resSelect = $('#userSelection option:selected').val();
    $.ajax({
        url: "libs/php/windData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: resSelect
        },
        success: function(result) {
            var ribbonDatas = result['data']['ribbonDatas'];

            ribbonDatas.forEach(function(ribbonDatas) {
                var longitude = ribbonData.location.longitude;
                var latitude = ribbonData.location.latitude;

                var dynamicRibbons = L.AwesomeMarkers.icon({
                    icon: 'camera',
                    prefix: 'fa',
                    markerColor: 'green'
                });

                var ribbonDataMarkers = L.marker([latitude,longitude], {
                    icon: dynamicRibbons
                }).on('click', function(e){

                    document.getElementById('ribbonDataName').innerText = ribbonData.title;
                    if (ribbonData.player.live.available) {
                        document.getElementById('ribbonDataText').innerText = "Live video";
                        document.getElementById('ribbonDataContainer').src = ribbonData.player.live.embed;
                    } else if (ribbonData.player.month.available) {
                        document.getElementById('ribbonDataText').innerText = "Past month video";
                        document.getElementById('ribbonDataContainer').src = ribbonData.player.month.embed;
                    } else if (ribbonData.player.day.available) {
                        document.getElementById('ribbonDataText').innerText = "Past day video";
                        document.getElementById('ribbonDataContainer').src = ribbonData.player.day.embed;
                    } else {
                        document.getElementById('ribbonDataContainer').src = "";
                        document.getElementById('ribbonDataContainer').innerText = "ribbonData is not available.";
                    };

                    $('#modalRibbonData').modal('show');
                    globalmap.setView(e.latlng, 13);
                });
                dynamicRibbons.addTo(groupedRibbons);
            });

        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
};
    
    var createRibbon = function(resSelect){
    $.ajax({
        url: "libs/php/countryInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: resSelect
        },
        success: function(result) {

            e = result['name'];
            capital = result['capital'];

            //Modal Content
            document.getElementById('cName').innerText = result['name'];
            document.getElementById("cCapital").innerText = result['capital'] + ".";

            wikApi(capital);

            document.getElementById('cPop').innerText = result['population'] + " people.";
            document.getElementById('cLanguage').innerText = result["languages"].map(lang => lang.name).join(", ") + ".";
            document.getElementById('cRegion').innerText = result["region"] + ".";
            document.getElementById('cCurrency').innerText = result["currency"][0]["symbol"] + " " + result["currency"][0]["code"] + ", " + result["currency"][0]["name"] + ".";

            $('#ribbonDisplay').modal('show');

        },
        error: function(jqXHR, textStatus, err) {
            console.log(jqXHR);
        }
    });
}
    
    
    var weatherModal = function(resSelect){
    $.ajax({
        url: "libs/php/weatherData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            q: resSelect
        },
        success: function(result) {

            document.getElementById('location').innerText = 'Weather in ' + resSelect;
            document.getElementById('currentWeather').innerText = result['weather'][0]['main'] + ', ' + result['weather'][0]['description'];
            document.getElementById('temperature').innerText = result['temps']['temp'] + '°C';
            document.getElementById('weatherAttribute').innerText = result['temps']['feels_like'] + '°C';
            document.getElementById('lowTemperature').innerText = result['temps']['temp_min'] + '°C';
            document.getElementById('highTemperature').innerText = result['temps']['temp_max'] + '°C';
            document.getElementById('humidity').innerText = result['temps']['humidity'] + '%';
            document.getElementById('windSpeed').innerText = result['wind']['speed'] + 'm/s';
            document.getElementById('windForce').innerText = result['wind']['force'] + 'm/s';

            var sunrise = result['sys']['sunrise'];
            var sunset = result['sys']['sunset'];
            var sunriseTime = new Date(sunrise * 1000).toDateString();
            var sunsetTime = new Date(sunset * 1000).toDateString();
            document.getElementById('sunSet').innerText = sunriseTime;
            document.getElementById('sunRise').innerText = sunsetTime;

            $('#weatherFrameWork').modal('show');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
};
    
    var covidModal = function(resSelect){
    var isoa2 = $('#userSelection option:selected').val();
    $.ajax({
        url: "libs/php/covidInformation.php", //covid stats api
        type: 'POST',
        dataType: 'json',
        data: {
            iso: resSelect
        },
        success: function(result) {

            var covidTime = result['data']['lastUpdated'];
            var covidFormat = new Date(covidTime).toLocaleDateString("en-UK")

            document.getElementById('covidArea').innerText = "COVID info in " + $('#userSelection option:selected').text();

            document.getElementById('dailyCases').innerText = result['data']['confirmedCases'].toLocaleString("en-US");
            document.getElementById('dailyDeaths').innerText = result['data']['dailyDeaths'].toLocaleString("en-US");
            document.getElementById('activeStatus').innerText = result['data']['activeCases'].toLocaleString("en-US");
            document.getElementById('criticalInfo').innerText = result['data']['totalCritical'].toLocaleString("en-US");
            document.getElementById('totalCases').innerText = result['data']['totalConfirmed'].toLocaleString("en-US");
            document.getElementById('totalDeaths').innerText = result['data']['totalDeaths'].toLocaleString("en-US");
            document.getElementById('recoveredCases').innerText = result['data']['totalRecovered'].toLocaleString("en-US");
            document.getElementById('lastUpdated').innerText = covidDateFormat;

            $('#covidInfo').modal('show');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
};
    
    function cityDisplayModel(a,b) {
    var displayRibbon = L.AwesomeMarkers.icon({
        icon: 'city',
        prefix: 'fa',
        markerColor: 'orange'
    });
        b.setIcon(displayRibbon);

    b.on('click', function(e) {
        var id = a.properties.name;
        document.getElementById('cdmName').innerText = a.properties.name;
        document.getElementById('cdmType').innerText = "Town.";
        wikiData(id);
        $('#frameWorkID').modal('show');
        globalmap.setView(e.latlng, 13);
    })
};
    
    var wikiData = function(e) {
    $.ajax({
        url: "libs/php/wikiData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            q: e
        },
        success: function(result) {
            
            document.getElementById("locationWiki").href = 'https://' + result['data'][0]['wikipediaUrl'];
            document.getElementById('areaData').href = 'https://' + result['data'][0]['wikipediaUrl'];
            document.getElementById('areaSummary').innerText = result['data'][0]['summary'];

        },
        error: function(jqXHR, textStatus, err) {
            console.log(jqXHR);
        }   
    });
}

    
var stylesheet = {
    "color": "#808080",
    "weight": 4,
    "opacity": 1.5,
};
    
    