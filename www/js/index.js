// /*
//  * Licensed to the Apache Software Foundation (ASF) under one
//  * or more contributor license agreements.  See the NOTICE file
//  * distributed with this work for additional information
//  * regarding copyright ownership.  The ASF licenses this file
//  * to you under the Apache License, Version 2.0 (the
//  * "License"); you may not use this file except in compliance
//  * with the License.  You may obtain a copy of the License at
//  *
//  * http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing,
//  * software distributed under the License is distributed on an
//  * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
//  * KIND, either express or implied.  See the License for the
//  * specific language governing permissions and limitations
//  * under the License.
//  */


// var app = {
//     // Application Constructor
//     initialize: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//     },

//     // deviceready Event Handler
//     //
//     // Bind any cordova events here. Common events are:
//     // 'pause', 'resume', etc.
//     onDeviceReady: function() {
//         this.receivedEvent('deviceready');
//     },

//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
//     }
// };

// app.initialize();

var iRoutes = new Framework7();
var $$ = Dom7;
var posicionActual;
var radio=500;
var Url = 'http://iroutes.azurewebsites.net';
var rutas;
var map;

//opciones del mapa
var options = {

    zoom:15,
    disableDefaultUI: true,
    center: posicionActual,
    center:{ lat:6.5, lng:-75.0589 }
}
var styledMapType = new google.maps.StyledMapType(
                [
                  {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
                  {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
                  {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
                  {
                    featureType: 'administrative',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#c9b2a6'}]
                  },
                  {
                    featureType: 'administrative.land_parcel',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#dcd2be'}]
                  },
                  {
                    featureType: 'administrative.land_parcel',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#ae9e90'}]
                  },
                  {
                    featureType: 'landscape.natural',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                  },
                  {
                    featureType: 'poi',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                  },
                  {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#93817c'}]
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'geometry.fill',
                    stylers: [{color: '#a5b076'}]
                  },
                  {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#447530'}]
                  },
                  {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#f5f1e6'}]
                  },
                  {
                    featureType: 'road.arterial',
                    elementType: 'geometry',
                    stylers: [{color: '#fdfcf8'}]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#f8c967'}]
                  },
                  {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#e9bc62'}]
                  },
                  {
                    featureType: 'road.highway.controlled_access',
                    elementType: 'geometry',
                    stylers: [{color: '#e98d58'}]
                  },
                  {
                    featureType: 'road.highway.controlled_access',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#db8555'}]
                  },
                  {
                    featureType: 'road.local',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#806b63'}]
                  },
                  {
                    featureType: 'transit.line',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                  },
                  {
                    featureType: 'transit.line',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#8f7d77'}]
                  },
                  {
                    featureType: 'transit.line',
                    elementType: 'labels.text.stroke',
                    stylers: [{color: '#ebe3cd'}]
                  },
                  {
                    featureType: 'transit.station',
                    elementType: 'geometry',
                    stylers: [{color: '#dfd2ae'}]
                  },
                  {
                    featureType: 'water',
                    elementType: 'geometry.fill',
                    stylers: [{color: '#b9d3c2'}]
                  },
                  {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#92998d'}]
                  }
                ],
                {name: 'Styled Map'}
);



function initMap() {


    // se inicializa el mapa con las opciones
    map = new google.maps.Map(document.getElementById('map'),options);

    // se añade un estilo al mapa
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    if (navigator.geolocation) {

    //se utiliza la geolocation para centrar el mapa
        navigator.geolocation.getCurrentPosition( function(position) {
            posicionActual = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // se centra el mapa
            map.setCenter(posicionActual);

            //se crea un marcador para señala nuestra posicion actual
            let marker = new google.maps.Marker({
                position:posicionActual,
                map: map,
                icon:'img/posicion-actual.png'
            });
        
            // se crea un circulo en el mapa para representar el radio de busqueda
            let circle = new google.maps.Circle({
                strokeColor: '#33658a',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillOpacity: 0.3,
                fillColor: '#33658a',
                center:posicionActual,
                map: map,
                radius: radio
        
            });

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });


              
    }
    else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
  }

// funcion para abrir el panel con las rutas 

$$('.open-left-panel').on('click', function (e) {
    iRoutes.panel.open('left');
});

//evento click para realizar una peticion a la API para buscar las rutas cercanas

$$('.buscar').on('click', function (e) {

    $$('.iroutes').empty();
    iRoutes.request.get(Url + '/api/Ruta', {radio:'500',lat:posicionActual.lat,lng:posicionActual.lng}, function (data) {

      rutas = JSON.parse(data);

      for (var i = 0; i < rutas.length; i++) {

           var color = randomColor({hue:'green',luminosity:'dark'});
          render(rutas[i],color);

       }

   });

  });

//funcion para mostrar el nombre de las rutas de buses encontradas
function render(obj,color) {
  $$(".iroutes").prepend("<li id='"+obj.Nombre+"Color' style='background-color:"+color+"' class='item-content'><div class='item-inner ruta' id='"+obj.Nombre+"'><div id='"+obj.Nombre+"' class='item-title' style='color:#ffffff'>"+obj.Nombre+"</div></div></li>");
}

// funcion para trazar una linea en el mapa con la forma de la ruta encontrada
function visualizar(obj,color){
    var path= obj.Coordenadas;
    
      var trazo = new google.maps.Polyline({
            path: path,
              geodesic: true,
              strokeColor:color,
              strokeOpacity: 1.0,
              strokeWeight: 2
      });
    
     trazo.setMap(map);
    
}
 
// evento click que llama a la funcion trazar y visualiza la ruta correspondiente al elemento seleccionado 
$$("body").on('click','.iroutes li',function(e){
        var id = e.target.id;
        var idColor = id+"Color";
        for (var i = 0; i < rutas.length; i++) {
            if(rutas[i].Nombre.localeCompare(id)==0){
                var color = document.getElementById(idColor).style;
                visualizar(rutas[i],color.backgroundColor);
                break;
            }
        }
});
    
window.onload = function(){
    initMap();
};


