const Location = require('mongoose').model('Location'); 
const request = require('request');
const sendJsonResponse = function(res, status, content){ //상태, json응답을 함수로 만듬
    res.status(status);
    res.json(content);
}
const apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV==='production'){
    apiOptions.server = "http://외부 호스트 서버주소"
}

const renderMainpage = function(req,res,responseBody){
    res.render('mainPage',{
        title: '메인화면',
        pageHeader: {
            title:'Cafe',
            strapline: '주위에 Wi-Fi를 사용할 수있는 장소를 찾아보세요!'
        },
        sidebar:'wi-fi를 지원하는 휴식할 수있는 공간을 찾고 계신가요? Cafe.......................................',
        locations: responseBody
    });
}

const _formatDistance = function(distance){
    let retDistance;
    if (distance >= 1){ //거리가 1km이상인 경우 소수점1자리까지 반올림 후 km를 붙임
        retDistance = parseFloat(distance).toFixed(1) + 'km';
    } else {
        retDistance = parseInt(distance*1000)+ 'm';   //그렇지 않으면 미터 단위로 변경
    }
    return retDistance;
}
module.exports.locationList = function(req,res){
    let requestOptions, path;
    path = '/api/locations';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qs : {                  //해당 좌표 기준
            lng : 127.08501,
            lat : 37.54,
            maxDistance : 2     //최대 카페 탐지 거리
        }
    }; 
    request(requestOptions, function(err, response, body){
        if(err) sendJsonResponse(res,404,err);
        if(response.statusCode==200 && body.length){
            for(let i=0; i<body.length;i++){
                body[i].distance = _formatDistance(body[i].distance);
            }
        }
        renderMainpage(req, res, body);
    });
};



module.exports.locationDetail = function(req, res){

};

module.exports.addReview = function(req,res){
    res.render('locations-review',{title:'addReview'});
};

