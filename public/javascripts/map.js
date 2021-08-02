const lat = document.currentScript.getAttribute('lat');
const lng = document.currentScript.getAttribute('lng');
var mapOptions = {
    center: new naver.maps.LatLng(lat, lng),
    zoom: 17
};

var myMap = new naver.maps.Map('map', mapOptions);

//마커표시하기
new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lng),
    map: myMap
});