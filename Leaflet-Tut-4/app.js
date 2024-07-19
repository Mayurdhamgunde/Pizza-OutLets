const map = L.map('map').setView([51.505, -0.09], 13);
const titleUrl = `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;
const attribution = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`;

const tiles = L.tileLayer(titleUrl, { attribution });
tiles.addTo(map);

const CLayer = L.circle([22.9074872,79.07306671],{radius:20000,color:'coral'}); // value in meters
CLayer.addTo(map);

const bounds = [[54.559322,-5.767822],[56.1210604,-3.021240]];
const rectangle = L.rectangle(bounds);
rectangle.addTo(map);

const bTriangleCoors = [
    [[25.774,-80.19],
     [18.466,-66.118],
     [32.321,-64.757]]
];

const polygon = L.polygon(bTriangleCoors);
polygon.addTo(map);

const latlngs = [
    [45.51,-122.68],
    [37.77,-122.43],
    [34.04,-118.2]
];

const polyline = L.polyline(latlngs,{});
polyline.addTo(map);

const cMarker = L.circleMarker([18.920675417289807,72.82952788802635],{radius:30,color:'coral'});
cMarker.addTo(map);

/*

 Diff btw circlelayer and circlemarker is that in circlelayer we were giving radius value as in meters while in 
 circlemarker we were giving radius value as in pixels. Circle Marker is has fixed size.

*/

const marker = L.marker([30.920675417289807,20.82952788802635]);
marker.addTo(map);

//   with Icon marker   // 

const Icon = L.icon({
    iconUrl:'marke.png',
    iconSize:[40,50]
})
const Marker = L.marker([19.920675417289807,18.82952788802635],{icon:Icon});
Marker.bindPopup('<h2>Pizza outlet </h2>');
Marker.addTo(map);
