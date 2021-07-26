//Geolcation Api를 이용하여 현재 웹브라우저의 위치정보를 얻어온다.
if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);

}
function showPosition(position){
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    
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
    
}