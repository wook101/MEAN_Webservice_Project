const Location = require('mongoose').model('Location'); //api가db와 연결하기, Location모델 가져옴
const sendJsonResponse = function(res, status, content){ //상태, json응답을 함수로 만듬
    res.status(status);
    res.json(content);
}
module.exports.locationInfo = function(req,res){

};

module.exports.addReview = function(req,res){
    res.render('locations-review',{title:'addReview'});
};

module.exports.locationsList = function(req,res){
    
};
module.exports.locationsCreate = function(req,res){
    
};
module.exports.locationsReadOne = function(req,res){
    
    if (req.params && req.params.locationid){
        Location
            .findById(req.params.locationid)
            .exec(function(err, location){  //db쿼리 실행이 비동기적으로 작동, node메인 프로세스 블록킹을 방지
                if(!location){
                    sendJsonResponse(res, 404, {"message":"mongodb에 해당 locationid가 존재하지 않습니다."});    
                    return;
                }
                else if(err){
                    sendJsonResponse(res, 404, err);   //mongoose가 실행에러를 리턴할때    
                    return;
                }
                sendJsonResponse(res, 200, location);   //응답 성공
            });
    }else{  //실패한 요청에 대한 404에러,
        sendJsonResponse(res, 404, {"message":"요청내에 locationid 존재하지 않습니다."}); 
    }

};
module.exports.locationsUpdateOne = function(req,res){
    
};
module.exports.locationsDeleteOne = function(req,res){
    
};