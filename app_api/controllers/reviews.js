const Location = require('mongoose').model('Location');
const sendJsonResponse = function(res, status, content){ //상태, json응답을 함수로 만듬
    res.status(status);
    res.json(content);
}
let doAddReview = function(req, res, location){
    if (!location){
        sendJsonResponse(res, 404, {"message":"db에서 locationid를 찾을 수 없습니다."});
    }else{
        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        });
        location.save(function(err, location){
            let thisReview;
            if(err){
                sendJsonResponse(res, 400, err);
            }else{
                updateAverageRating(location._id);  //rating은 reivew객체 내에 없음으로 따로 처리
                thisReview = location.reviews[location.reviews.length-1];
                sendJsonResponse(res, 201, thisReview);
            }
        });
    }
}
let updateAverageRating = function(locationid){
    Location
        .findById(locationid)
        .select('rating reviews')   
        .exec(
            function(err, location){
                if(!err){
                    //reviews의 rating의 평균을 구해서 상위 rating에 적용하기
                    doSetAverageRating(location);
                }
            });
};
let doSetAverageRating = function(location){
    let i, reviewCount, ratingAverage, ratingTotal;
    if(location.reviews && location.reviews.length > 0){
        reviewCount = location.reviews.length;
        ratingTotal = 0;
        for(i=0;i<reviewCount;i++){
            ratingTotal = ratingTotal + location.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal/reviewCount, 10);
        location.rating = ratingAverage;
        location.save(function(err){
            if(err){
                console.log(err);
            } else{
                console.log("평균 평점이 갱신됬습니다.", ratingAverage);
            }
        });
    }
};
module.exports.reviewsCreate = function(req,res){
    let locationid = req.params.locationid;
    if (locationid){
        Location
            .findById(locationid)
            .select('reviews')
            .exec(function(err, location){
                if(err){
                    sendJsonResponse(res, 400, err);
                } else{
                    doAddReview(req, res, location);
                }
            });
    }else{
        sendJsonResponse(res, 404, {"message:":"locationid를 요청params에서 찾을 수 없습니다."})
    }
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