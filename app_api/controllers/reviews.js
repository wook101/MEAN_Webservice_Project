const Location = require('mongoose').model('Location');
const sendJsonResponse = function(res, status, content){ //상태, json응답을 함수로 만듬
    res.status(status);
    res.json(content);
}
module.exports.reviewsCreate = function(req,res){
    
};
module.exports.reviewsReadOne = function(req,res){
    if (req.params && req.params.locationid && req.params.reviewid){
        Location
            .findById(req.params.locationid)
            .select('name reviews')
            .exec(function(err, location){  //db쿼리 실행이 비동기적으로 작동, node메인 프로세스 블록킹을 방지
                let response, review;
                if(!location){
                    sendJsonResponse(res, 404, {"message":"mongodb에 해당 locationid가 존재하지 않습니다."});    
                    return;
                }
                else if(err){
                    sendJsonResponse(res, 404, err);   //mongoose가 실행에러를 리턴할때    
                    return;
                }
                if (location.reviews && location.reviews.length > 0){   //location이 review를 가지고 있는지 확인
                    review = location.reviews.id(req.params.reviewid);
                    if(!review){
                        sendJsonResponse(res, 404, {"message":"mongodb에서 해당 reviewid가 존재하지 않습니다."}); 
                    }else{
                        response = {
                            location:{
                                name: location.name,
                                id : req.params.locationid
                            },
                            review : review
                        };
                        sendJsonResponse(res, 200, response);   //리뷰 응답 성공
                    }
                }else{
                    sendJsonResponse(res, 404, {"message":"review를 찾을 수 없습니다."});             
                }
            });
    }else{  //실패한 요청에 대한 404에러,
        sendJsonResponse(res, 404, {"message":"요청내에 locationid 존재하지 않습니다."}); 
    }
};
module.exports.reviewsUpdateOne = function(req,res){
    
};
module.exports.reviewsDeleteOne = function(req,res){
    
};