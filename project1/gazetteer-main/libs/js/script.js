let globalMap = L.map('globalMap');

// other maps
let lights = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
	bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
	minZoom: 1,
	maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
});

let appid = "0f03b00173b58e7509c8411978ab491d";
let cloudsLayer = L.tileLayer(`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${appid}`);
let precipitationLayer = L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${appid}`);
let pressureLayer = L.tileLayer(`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${appid}`);
let windSpeedLayer = L.tileLayer(`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${appid}`);
let temperatureLayer = L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${appid}`);

let overlayMaps = {
  "Clouds Layer": cloudsLayer,
  "Precipitation": precipitationLayer,
  "Sea level pressure": pressureLayer,
  "Wind speed": windSpeedLayer,
  "Temperature Layer": temperatureLayer,
}

let terrain = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

let = googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

let = googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3']
});


let differentMaps = {
  "Basic map": globalMap,
  "Lights during the night": lights,
  "Terrain": terrain,
  "Google street": googleStreets,
  "Google sattelite": googleSat,
  "Google terrain": googleTerrain
};

const gotPos = position => {
  let lat = position.coords.latitude;
  let lng = position.coords.longitude;

  $(window).ready(function () {
    $('#organiser').fadeOut('slow');

    $.ajax({
      url: 'libs/php/currentLocation.php',
      type: 'POST',
      dataType: 'json',
      data: {
        lat: lat,
        lng: lng
      },
      success: function (result) {


        if (result.status.name == 'ok') {
          $('#countrySelect').val(result.data.countryCode);
          $('#countrySelect').trigger('change');

        }
      }
    }).then(countryInfo)
  });

  globalMap.setView([lat, lng], 5)

  const OpenStreetglobalMap_globalMapnik = L.tileLayer('https://tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=zGp8PWHFV24kX0dkciIBGaWLpWIHRDXIhZd9AzmfOnB2jhkqra0vEhpeGE60g3sG', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetglobalMap.org/copyright">OpenStreetglobalMap</a> contributors'
  }).addTo(globalMap);

};

L.control.layers(differentMaps, overlayMaps).addTo(globalMap);

L.control.scale().addTo(globalMap);

// modal
const details = document.getElementById("mainDisplay");
const corona = document.getElementById("corona");
const youtube = document.getElementById("youtube");
const vdetails = document.getElementById("details");
const news = document.getElementById("news");
const weather = document.getElementById("weather");
const countryImaging = document.getElementById("countryImaging");
const currencyConverter = document.getElementById("currency");

const btn = document.getElementById("theButton");
const span = document.getElementsByClassName("close");

let border;
let markers;
 var clusterMarkers = L.markerClusterGroup();
let countryObjects = new L.FeatureGroup();

const markerIcon = L.ExtraMarkers.icon({
    
  shape: 'circle',
  markerColor: 'violet',
  prefix: 'fas',
  icon: 'fa-city',
  iconColor: '#fff',
  svg: false
});

const windDirection = degree => {

  switch (true) {
    case degree === 0:
    case degree === 360:
      return 'E';
    case degree === 270:
      return 'S';
    case degree === 180:
      return 'W';
    case degree === 90:
      return 'N';
    case (degree > 0 && degree < 90):
      return 'NE';
    case (degree > 90 && degree < 180):
      return 'NW';
    case (degree > 180 && degree < 270):
      return 'SW';
    case (degree > 270 && degree < 360):
      return 'SE';
  }
}

const roundData = data => {
  let num = Math.abs(Number(data));

  if (num >= 1.e+6) {
    return (num / 1.e+6).toFixed(2) + ' M';
  } else if (num >= 1.e+3) {
    return (num / 1.e+3).toFixed(2) + ' K';
  }
  return num;
};

const getCities = () => {
  $.ajax({
    url: 'libs/php/cityRibbon.php',
    type: 'POST',
    dataType: 'json',
    data: {
      north: $('#north').text(),
      south: $('#south').text(),
      east: $('#east').text(),
      west: $('#west').text()
    },
    success: function (result) {
        
      const data = result.data.geonames

      if (result.status.name == 'ok') 
      {
        for (let i = 0; i < 20; i++) {

          try {
            if (data[i].countrycode == $('#countrySelect').val() && data[i].population >= 5.e+5) {
              globalMap.addLayer(countryObjects);

              const marker = L.marker([data[i].lat, data[i].lng], { icon: markerIcon }).bindPopup(
                `<h3 style="font-size: 1.2rem;">${data[i].name}</h3>
                <table>
                  <tr>
                    <td>Population:</td>
                    <td class="pl-2">${roundData(data[i].population)}</td>
                  </tr>
                </table>
                <p><a href="https://${data[i].wikipedia}" target="_blank">wikipedia</a></p>`
              ).addTo(clusterMarkers);
                marker.addTo(clusterMarkers);
            }

          } catch (e) {

            globalMap.addLayer(countryObjects);

            const marker = L.marker(globalMap.getCenter(border), { icon: markerIcon }).bindPopup(
              `<h3 style="font-size: 1.2rem;">${$('#countrySelect option:selected').text()}</h3>
              <p>No data available</p>`
            ).addTo(countryObjects);
          }

        }

      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // your error code
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    }
  }).then(() => $('#organiser').fadeOut('slow'));
}

const countryInfo = () => {
  $.ajax({
    url: 'libs/php/CountryInfo.php',
    type: 'POST',
    dataType: 'json',
    data: {
      country: $('#countrySelect').val()
    },
    success: function (result) {



      if (result.status.name == 'ok') {
        $('#flag').attr('src', `https://www.countryflags.io/${$('#countrySelect').val()}/flat/64.png`);
        $('#txtCountry').html(result.data[0].countryName);
        $('#txtCapital').html(result.data[0].capital);
        $('#txtPop').html(roundData(result.data[0].population));
        $('#txtcurrencyConverter').html(result.data[0].currencyConverterCode);
        $('#wiki').attr('href', `https://en.wikipedia.org/wiki/${$('#countrySelect option:selected').text()}`);

        $('#north').html(result.data[0].north);
        $('#south').html(result.data[0].south);
        $('#east').html(result.data[0].east);
        $('#west').html(result.data[0].west);



      }
    }
  }).then(getCities)
};



const fail = err => {
  let errors = {
    1: 'no permission',
    2: 'unable to determine',
    3: 'took too long'
  };
  console.log(errors[err]);
};

if (navigator.geolocation) {
  let giveUp = 1000 * 30;
  let tooOld = 1000 * 60 * 5;
  let options = {
    enableHighAccuracy: true,
    timeout: giveUp,
    maximumAge: tooOld
  }
  navigator.geolocation.getCurrentPosition(gotPos, fail, options);
}


$(document).ready(function () {

  $(window).ready(function () {

    $.ajax({
      url: 'libs/php/countryBorder.php',
      type: 'POST',
      dataType: 'json',

      success: function (result) {

        $('#countrySelect').html('');

        $.each(result.data, function (index) {

          $('#countrySelect').append($('<option>', {
            value: result.data[index].code,
            text: result.data[index].name
          }));
        });
        // NAVIGATOR 


      },
      error: function (jqXHR, textStatus, errorThrown) {
        // your error code
        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR);
      }
    })
  })
   

    var JSONGeo = new L.GeoJSON();
    
    var stylesheet = {
    "color": "#36454f",
    "weight": 2,
    "opacity": 0.5,
    "fillOpacity": 0
};

  $('#countrySelect').change(function () {
    $('#organiser').show();
      var isoa2 = $('#countrySelect option:selected').val();
    $.ajax({
      url: 'libs/php/borders.php',
      type: 'POST',
      dataType: 'json',
      data: {
        country: $('#countrySelect option:selected').val()

      },
      success: function (result) {

        const polystyle = () => {
          return {
            fillColor: '#3b7a4c',
            weight: 1,
            opacity: 1,
            color: '#3b7a4c',
            fillOpacity: 0.2
          };
        }

        if (result.status.name == 'ok') {
            
            var feat = result['data'];
        
            JSONGeo.clearLayers();
            clusterMarkers.clearLayers();
            
            JSONGeo.addData( feat ).setStyle( stylesheet ).addTo( globalMap );
          countryObjects.eachLayer(function (layer) {
            countryObjects.removeLayer(layer);
          });
          border = L.geoJSON(result.data, { style: polystyle }).addTo(countryObjects);
          globalMap.fitBounds(border.getBounds());
            
          addVisibleCityMarkers(isoa2);
            webcamMarkers(isoa2);
            clusterMarkers.addTo(globalMap);
        }


      },
      error: function (jqXHR, textStatus, errorThrown) {
        // your error code
        console.log(errorThrown);
        console.log(textStatus);
        console.log(jqXHR);
      }
    }).then(countryInfo);

  });
    
    function addVisibleCityMarkers() {
    var isoa2 = $('#countrySelect option:selected').val();
    $.ajax({
        url: "libs/php/populateRibbons.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: isoa2
        },
        success: function(result) {
                
            var citiesMarkers = L.geoJson(result, {
                onEachFeature: citiesModal
            });
            citiesMarkers.addTo(clusterMarkers);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    })
};
    
    function citiesModal(f,l) {
    var cityMarker = L.AwesomeMarkers.icon({
        icon: 'city',
        prefix: 'fa',
        markerColor: 'gray'
    });

    l.setIcon(cityMarker);

    l.on('click', function(e) {
        var name = f.properties.name;
        console.log("The variable of 'name' is called " + name);
        console.log("The variable of 'f' is called " + f);
        console.log("The variable of 'e' is " + e);
        document.getElementById('featureName').innerText = f.properties.name;
        document.getElementById('featureType').innerText = "City.";
        getWikiInfo(name);
        $('#modalMarker').modal('show');
        globalMap.setView(e.latlng, 13);
    })
};
    
    
    function webcamMarkers() {
    var isoa2 = $('#countrySelect option:selected').val();
    $.ajax({
        url: "libs/php/windData.php",
        type: 'POST',
        dataType: 'json',
        data: {
            iso: isoa2
        },
        success: function(result) {
            var webcams = result['data']['webcams'];

            webcams.forEach(function(webcam) {
                var longitude = webcam.location.longitude;
                var latitude = webcam.location.latitude;

                var webcamMarker = L.AwesomeMarkers.icon({
                    icon: 'camera',
                    prefix: 'fa',
                    markerColor: 'blue'
                });

                var webcamMarkers = L.marker([latitude,longitude], {
                    icon: webcamMarker
                }).on('click', function(e){

                    document.getElementById('webcamName').innerText = webcam.title;
                    if (webcam.player.live.available) {
                        document.getElementById('webcamNote').innerText = "Live video feed";
                        document.getElementById('webcamViewport').src = webcam.player.live.embed;
                    } else if (webcam.player.month.available) {
                        document.getElementById('webcamNote').innerText = "Past month timelapse video";
                        document.getElementById('webcamViewport').src = webcam.player.month.embed;
                    } else if (webcam.player.day.available) {
                        document.getElementById('webcamNote').innerText = "Past day timelapse video";
                        document.getElementById('webcamViewport').src = webcam.player.day.embed;
                    } else {
                        document.getElementById('webcamViewport').src = "";
                        document.getElementById('webcamViewport').innerText = "Webcam footage is not available.";
                    };

                    $('#modalWebcam').modal('show');
                    globalMap.setView(e.latlng, 13);
                });
                webcamMarkers.addTo(clusterMarkers);
            });

        },

        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
    });
};
    
    

    // button ISS
let issIcon = L.icon({
  iconUrl: 'libs/vendors/leaflet-extra-markers/dist./img/iss.png',
  iconSize: [80, 50],
  iconAnchor: [40, 25],
});
let latISS = '';
let longISS = '';
let markerISS = L.marker([0, 0], { icon: issIcon }).addTo(globalMap);
function ajaxISS() {
  $.ajax({
    type: 'POST',
    url: 'libs/php/iss.php',
    data: {},
    dataType: 'json',
    success: function (data) {
      latISS = data['data']['latitude'];
      longISS = data['data']['longitude'];
      markerISS.setLatLng([latISS, longISS]);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
  });
}
ajaxISS();
setInterval(ajaxISS, 5000);
    
L.easyButton({
  id: 'btnISS',
  states: [{
      icon: "fa-satellite-dish",
      title: 'Show position of ISS',
      onClick: function(btn,globalMap) {
        globalMap.setView([latISS, longISS], 4)
      }
  },]
}).addTo(globalMap);

    
    //covid easybutton
  L.easyButton('fa-virus', function () {
    corona.style.display = "block";

    $('.close').click(function () {
      corona.style.display = "none";
    });

    window.onclick = function (event) {
      if (event.target == corona) {
        corona.style.display = "none";
      };
    };

    $.ajax({
      url: 'libs/php/covidCorona.php',
      type: 'POST',
      dataType: 'json',
      data: {
        country: $('#countrySelect option:selected').text()
      },
      success: function (result) {

        let data = result.data;
        let covid = data.pop();

        if (result.status.name == 'ok') {
          $('#txtConfirmed').html(roundData(covid.Confirmed));
          $('#txtActive').html(roundData(covid.Active));
          $('#txtRecovered').html(roundData(covid.Recovered));
          $('#txtDeaths').html(roundData(covid.Deaths));
        }
      }
    })
      
  }).addTo(globalMap);
    
    L.easyButton('fa-flag', function() {
        youtube.style.display = "block";
        
        $('.close').click(function(){
        youtube.style.display = "none";
        });
        
        window.onlick = function (event) {
            if(event.target == youtube) {
        youtube.style.display = "none";
            };
        };
        
        $.ajax({
        url: 'libs/php/CountryInfo.php',
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#countrySelect option:selected').val()
        },
        success: function (result) {


      if (result.status.name == 'ok') {
          var cname = $('#countrySelect option:selected').text();
          console.log("This is the country name " + cname);
          console.log("The variable of 'name' is called " + cname);
          
          if(cname === "United Kingdom"){    
          var shorthand = "England";
          console.log(shorthand);
          getWikiInfoA(shorthand);
          } else if(cname === "United Arab Emirates"){
          var shorthandO = "UAE";
          console.log(shorthandO);
          getWikiInfoA(shorthandO);
            } else if (cname === "Trinidad and Tobago"){
          var shorthandA = "Tobago";
          console.log(shorthandA);
          getWikiInfoA(shorthandA);
            } else if (cname === "Sri Lanka"){
          var shorthandB = "Sri_Lanka" 
          console.log(shorthandB);
          getWikiInfoA(shorthandB);
            } else if (cname === "United States"){
                var shorthandC = "America";
                console.log(shorthandC);
                getWikiInfoA(shorthandC);
            } else if (cname === "W. Sahara"){
                var shorthandD = "sahara";
                console.log(shorthandD);
                getWikiInfoA(shorthandD);
            } else if (cname === "South Africa"){
                var shorthandE = "africa";
                console.log(shorthandE);
                getWikiInfoA(shorthandE);
            } else if (cname === "Saudi Arabia"){
                var shorthandF = "Saudi";
                console.log(shorthandF);
                getWikiInfoA(shorthandE);
            } else if (cname === "Sierra Leone"){
                var shorthandG = "Sierra_Leone";
                console.log(shorthandG);
                getWikiInfoA(shorthandG);
            } else if (cname === "Puerto Rico"){
                var shorthandH = "Puerto_Rico";
                console.log(shorthandH);
                getWikiInfoA(shorthandG);
            }
                    
                    else{
              getWikiInfo(cname);
          }
          
          
        $('#flag').attr('src', `https://www.countryflags.io/${$('#countrySelect').val()}/flat/64.png`);
        $('#ytCountry').html(result.data[0].countryName);
        $('#ytTxt').html(result.data[0].capital);
        $('#txtcurrencyConverter').html(result.data[0].currencyCode);
        $('#anthem').attr('href', `https://www.youtube.com/results?search_query=national+anthem+${$('#countrySelect option:selected').text()}`);

        $('#north').html(result.data[0].north);
        $('#south').html(result.data[0].south);
        $('#east').html(result.data[0].east);
        $('#west').html(result.data[0].west);
            }
        }
    }).then(getCities)
}).addTo(globalMap);   
    
     L.easyButton('fa-pen', function() {
        vdetails.style.display = "block";
        
        $('.close').click(function(){
        vdetails.style.display = "none";
        });
        
        window.onlick = function (event) {
            if(event.target == vdetails) {
        vdetails.style.display = "none";
            };
        };
        
        $.ajax({
        url: 'libs/php/CountryInfo.php',
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#countrySelect option:selected').val()
        },
        success: function (result) {


      if (result.status.name == 'ok') {
        $('#flag').attr('src', `https://www.countryflags.io/${$('#countrySelect').val()}/flat/64.png`);
        $('#txtCountry').html(result.data[0].countryName);
        $('#txtCapital').html(result.data[0].capital);
        $('#txtPop').html(roundData(result.data[0].population));
        $('#txtcurrencyConverter').html(result.data[0].currencyCode);
        $('#wiki').attr('href', `https://en.wikipedia.org/wiki/${$('#countrySelect option:selected').text()}`);

        $('#north').html(result.data[0].north);
        $('#south').html(result.data[0].south);
        $('#east').html(result.data[0].east);
        $('#west').html(result.data[0].west);
            }
        }
    }).then(getCities)
}).addTo(globalMap);   



  L.easyButton('fa-cloud-sun-rain', function () {
    weather.style.display = "block";

    $('.close').click(function () {
      weather.style.display = "none";
    });

    window.onclick = function (event) {
      if (event.target == weather) {
        weather.style.display = "none";
      };
    };

    $.ajax({
      url: 'libs/php/weatherUpdate.php',
      type: 'POST',
      dataType: 'json',
      data: {
        city: $('#countrySelect option:selected').text()
      },
      success: function (result) {



        const icon = result.data.weather[0].icon;
        const data = result.data
        console.log("Data " + data);
        console.log("Icon " + icon);
        console.log("Result " + result);

        if (result.status.name == 'ok') {
          $('#weatherIcon').attr('src', `https://openweatherglobalMap.org/img/wn/${icon}.png`);
          $('#txtTemp').html(`${data.main.temp}°C`);
          $('#description').html(`Feels like ${data.main.feels_like}°C. ${data.weather[0].description}.`);
          $('#maxMin').html(`${data.main.temp_max} / ${data.main.temp_min}°C`);
          $('#txtWind').html(`${data.wind.speed}m/s ${windDirection(data.wind.deg)}`);
          $('#humidity').html(`Humidity: ${data.main.humidity}%`)

        }
      }
    });
  }).addTo(globalMap);


  L.easyButton('fa-images', function () {
    countryImaging.style.display = "block";

    $('.close').click(function () {
      countryImaging.style.display = "none";
    });

    window.onclick = function (event) {
      if (event.target == countryImaging) {
        countryImaging.style.display = "none";
      };
    };

    $.ajax({
      url: 'libs/php/countryImaging.php',
      type: 'POST',
      dataType: 'json',
      data: {
        image: $('#txtCapital').text()
      },
      success: function (result) {

        if (result.status.name == 'ok') {
          $('#img1').attr('src', result.data.results[0].urls.regular);
          $('#img2').attr('src', result.data.results[1].urls.regular);
          $('#img3').attr('src', result.data.results[2].urls.regular);
          $('#imgDescription1').html(result.data.results[0].alt_description);
          $('#imgDescription2').html(result.data.results[1].alt_description);
          $('#imgDescription3').html(result.data.results[2].alt_description);

        }
      }
    });

  }).addTo(globalMap);

  L.easyButton('fa-money-bill', function () {
    currencyConverter.style.display = "block";

    $('.close').click(function () {
      currencyConverter.style.display = "none";
    });

    window.onclick = function (event) {
      if (event.target == currencyConverter) {
        currencyConverter.style.display = "none";
           }
      };
  
      
      $.ajax({
        url: 'libs/php/CountryInfo.php',
        type: 'POST',
        dataType: 'json',
        data: {
            country: $('#countrySelect option:selected').val()
        },
        success: function (result) {

      // Ajax call for currency data
      $.ajax({
        url: "libs/php/currencyConverter.php",
        type: 'POST',
        dataType: 'json',
        data: {
          symbols: result.data[0]['currencyCode']
        },
        success: function(result2) {
  
          console.log(JSON.stringify(result2));
  
            var converted = 0;
            $('#amount').keyup(function() {
              converted = result2["data"]["rates"][result.data[0]['currencyCode']] * $('#amount').val();
              $('#txtRates').html(converted + " " + result.data[0]['currencyCode']);
            });
            $('#amount').click(function() {
              converted = result2["data"]["rates"][result.data[0]['currencyCode']] * $('#amount').val();
              $('#txtRates').html(converted + " " + result.data[0]['currencyCode']);
            });

        
        },
        error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        },
      });
    
             },
            
     
        error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);	
           }
     
      })
       
  }).addTo(globalMap);
    
 
    function addCityRibbons() {
    var resSelect = $('#countrySelect option:selected').val();
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
        globalMap.setView(e.latlng, 13);
    }).addTo(globalMap);
};
    
    var getWikiInfo = function(e) {
    $.ajax({
        url: "libs/php/getWikiInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            q: e
        },
        success: function(result) {
            console.log('This is e 1' + e );
            document.getElementById("countryCapitalWikiLink").href = 'https://' + result['data'][0]['wikipediaUrl'];
            document.getElementById('cityWikiLink').href = 'https://' + result['data'][0]['wikipediaUrl'];
            document.getElementById('citySummary').innerText = result['data'][0]['summary'];

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }   
    });
}
    
     var getWikiInfoA = function(e) {
    $.ajax({
        url: "libs/php/getWikiInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            q: e
        },
        success: function(result) {
            console.log("Thia is result " + result);
            console.log("Thia is e 2" + e);

            document.getElementById('areaSummaryi').innerText = result['data'][0]['summary'];
            var s = result['data'][0]['summary'];
            console.log("This is s " + s);

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }   
    });
}
    
    
    
    function dynamicRibbons() {
    var resSelect = $('#countrySelect option:selected').val();
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
    
    
});

