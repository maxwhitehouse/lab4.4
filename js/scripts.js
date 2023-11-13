var map = L.map('map').setView([39.8283, -98.5795], 4); 

L.tileLayer('https://api.mapbox.com/styles/v1/maxwhitehouse/clonh3vft003t01r7667peoxu/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWF4d2hpdGVob3VzZSIsImEiOiJjbG9peW9nY3UxZTN5MnJvMWV2ZGVxZ3VqIn0.a8iEZsSCZA7IP7mtskj4TQ', {
    maxZoom: 19,
}).addTo(map);

var customIcon = L.icon({
    iconUrl: 'basketball.png',
    iconSize: [32, 32],   
    iconAnchor: [16, 32]  
});

fetch('https://raw.githubusercontent.com/maxwhitehouse/lab4/main/nbaareans.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, { icon: customIcon });
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup('Building Name: ' + feature.properties.NAME1 + '; Team Name: ' + feature.properties.TEAM);
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Error fetching GeoJSON data:', error);
    });

    var legend = L.control({ position: 'topright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<img src="basketball.png" alt="Basketball Icon" width="20" height="20"> NBA Arena';
    div.style.fontWeight = 'bold';


    return div;
};

legend.addTo(map);

var title = L.control({ position: 'bottomleft' });

title.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info title');
    div.innerHTML = '<h1>NBA Arenas Map</h1>';

    div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; 
    div.style.padding = '10px';

    return div;
};

title.addTo(map);