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

//opciones del mapa
var options = {

    zoom:15,
    disableDefaultUI: true,
    center: posicionActual,
    center:{ lat:6.5, lng:-75.0589 }
  }



function initMap() {


    // se inicializa el mapa con las opciones
    let map = new google.maps.Map(document.getElementById('map'),options);

    if (navigator.geolocation) {

    //se utiliza la geolocation para centrar el mapa

        navigator.geolocation.getCurrentPosition( function(position) {
            posicionActual = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
          // se centra el mapa
            map.setCenter(posicionActual);

        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
              
    }

}


window.onload = function(){
    initMap();
};


