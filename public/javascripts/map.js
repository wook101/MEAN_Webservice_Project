const lat = document.currentScript.getAttribute('lat');
const lng = document.currentScript.getAttribute('lng');
var mapOptions = {
    center: new naver.maps.LatLng(lat, lng),
    zoom: 17
};

new naver.maps.Map('map', mapOptions);