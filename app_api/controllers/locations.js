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
    let locationid = req.params.locationid;
    Location
        .findById(locationid)
        .exec(function(err, location){  //db쿼리 실행이 비동기적으로 작동, node메인 프로세스 블록킹을 방지
            console.log("findById complete");
            sendJsonResponse(res, 200, location);
        });

};
module.exports.locationsUpdateOne = function(req,res){
    
};
module.exports.locationsDeleteOne = function(req,res){
    
};