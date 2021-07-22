const Location = require('mongoose').model('Location'); 
const request = require('request');
const apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV==='production'){
    apiOptions.server = "http://외부 호스트 서버주소"
}

const renderMainpage = function(req,res,responseBody){
    res.render('locations-main',{
        title: '메인화면',
        pageHeader: {
            title:'Cafe',
            strapline: '주위에 Wi-Fi를 사용할 수있는 장소를 찾아보세요!'
        },
        sidebar:'wi-fi를 지원하는 휴식할 수있는 공간을 찾고 계신가요? Cafe.......................................',
        locations: responseBody
    });
}

module.exports.locationMain = function(req,res){
    let requestOptions, path;
    path = '/api/locations';
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {},
        qs : {
            lng : 127.06,
            lat : 37.54,
            maxDistance : 1
        }
    }; 
    request(requestOptions, function(err, response, body){
        if(err){
            console.log(err);
        } else if(response.statusCode == 200){
            console.log(body);
        } else{
            console.log(response.statusCode);
        }

        renderMainpage(req, res, body);
    });
};

module.exports.addReview = function(req,res){
    res.render('locations-review',{title:'addReview'});
};

