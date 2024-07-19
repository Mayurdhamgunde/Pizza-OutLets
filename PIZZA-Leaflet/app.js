var myMap = L.map('map').setView([21.5937, 84.9629], 5.2);

const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by coder\'s mayur with ♥️';

var titleLayer = L.tileLayer(tileUrl, { attribution });
titleLayer.addTo(myMap);
function generalList() {
    const ul = document.querySelector('.list');
    storeList.forEach((shop) => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const p = document.createElement('p');
        a.addEventListener('click', () => {
            flyToStore(shop);
        });
        div.classList.add('shop-item');
        a.innerText = shop.properties.name;
        a.href = '#';
        p.innerText = shop.properties.address;
        div.appendChild(a);
        div.appendChild(p);
        li.appendChild(div);
        ul.appendChild(li);
    });
}
generalList();
function makePopupContent(shop) {
    return `
        <div>
            <h4>${shop.properties.name}</h4>
            <p>${shop.properties.address}</p>
            <div class="phone-number">
                <a href="tel:${shop.properties.phone}">${shop.properties.phone}</a>
            </div>
        </div>
    `;
}
function onEachFeature(feature, layer) {
    layer.bindPopup(makePopupContent(feature), { closeButton: false, offset: L.point(0, -8) });
}

var myIcon = L.icon({
    iconUrl: 'marker.png',
    iconSize: [30, 40],
})

const shopsLayer = L.geoJSON(storeList, {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: myIcon });
    }
});
shopsLayer.addTo(myMap);

function flyToStore(store) {            // First we have to give longitude and second latitude..
    const lat = store.geometry.coordinates[1];
    const lng = store.geometry.coordinates[0];
    myMap.flyTo([lat, lng], 14, {
        duration: 3
    });
    setTimeout(() => {
        L.popup({ closeButton: false, offset: L.point(0, -8) })
            .setLatLng([lat, lng])
            .setContent(makePopupContent(store))
            .openOn(myMap)
    }, 3000);
}

var darkmap = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
});

googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var baseMaps = {
    "OSM": titleLayer,
    "Dark": darkmap,
    "Google Street": googleStreets,
    "Google Satellite": googleSat
}

L.control.layers(baseMaps).addTo(myMap);