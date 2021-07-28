//Geolcation Api를 이용하여 현재 웹브라우저의 위치정보를 얻어온다.
let lat,lng;
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);

}

function renderCafeList(){
    if (lat!=undefined && lng!=undefined){
        $.ajax({
            url: "/",
            type: "post",
            dataType : "json",
            data: {'lat':lat,
                    'lng':lng}
        }).done(function(data){
            location.href="/locations";
        }).fail(function(err){
            console.log("실패");
        });
    }else{
        alert("geolocaiton API를 지원하지 않습니다.");
    }
    
}

function showPosition(position){
    lat = position.coords.latitude;
    lng = position.coords.longitude;
    /*
    $.ajax({
        url: "/",
        type: "get",
        dataType : "json",
        data: {'lat':position.coords.latitude,
                'lng':position.coords.longitude}
    }).done(function(data){
        console.log("성공");
    }).fail(function(err){
        console.log("실패");
    });
    */
}