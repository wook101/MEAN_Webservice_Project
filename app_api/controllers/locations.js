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
    sendJsonResponse(res,200,{"state":"success"});
};
module.exports.locationsUpdateOne = function(req,res){
    
};
module.exports.locationsDeleteOne = function(req,res){
    
};