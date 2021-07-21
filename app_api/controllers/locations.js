const Location = require('mongoose').model('Location'); //api가db와 연결하기, Location모델 가져옴
const sendJsonResponse = function(res, status, content){ //상태, json응답을 함수로 만듬
    res.status(status);
    res.json(content);
}
const meterConversion = (function(){
    let mToKm = function(distance){
        return parseFloat(distance / 1000);
    };
    let kmToM = function(distance){
        return parseFloat(distance * 1000);
    };
    return {
        mToKm : mToKm,
        kmToM : kmToM
    };
})();
module.exports.locationInfo = function(req,res){

};

module.exports.addReview = function(req,res){
    res.render('locations-review',{title:'addReview'});
};

module.exports.locationsListByDistance = function(req,res){
    let lng = parseFloat(req.query.lng);
    let lat = parseFloat(req.query.lat);
    let maxDistance = parseFloat(req.query.maxDistance);

    if (!lng || !lat){
        sendJsonResponse(res, 404, {"message":"요청 쿼리에서 위도 또는 경도의 값이 존재하지 않습니다."});
        return;
    }

    Location.aggregate([
        {
            $geoNear:{
                        spherical: true,
                        near: { type: "Point", coordinates: [ lng, lat ] },
                        maxDistance: meterConversion.kmToM(maxDistance),
                        distanceField: 'distance'
                    }
        }],
            function(err, results, stats){
            let locations = [];
            if (err){
                sendJsonResponse(res, 404, err);
            } else{
                
                results.forEach(function(doc){
                    
                    locations.push({
                        _id: doc._id,
                        name: doc.name,
                        address: doc.address,
                        rating: doc.rating,
                        facilities: doc.facilities,
                        distance: meterConversion.mToKm(doc.distance)
                    });
                    
                });
                
                sendJsonResponse(res, 200, locations);
            }
        }
    );
};

module.exports.locationsCreate = function(req,res){
    Location.create({
       name: req.body.name,
       address: req.body.address,
       facilities: req.body.facilities.split(","),
       coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
       openingTimes:[{
            days: req.body.days1,
            opening: req.body.opening1,
            closing: req.body.closing1,
            closed:req.body.closed1
       },
       {
            days: req.body.days2,
            opening: req.body.opening2,
            closing: req.body.closing2,
            closed:req.body.closed2
        }] 
    }, function(err, location){
        if(err){
            sendJsonResponse(res, 400, err);
        } else{
            sendJsonResponse(res, 201, location);
        }
    });
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
    if(!req.params.locationid){
        sendJsonResponse(res, 404, {"message":"locationid를 찾을 수 없습니다."});
        return;
    }
    Location
        .findById(req.params.locationid)
        .select('-reviews -rating') //-대쉬를 붙이는 이유는 해당 컬럼들(reviews, rating)을 제외하고 검색 하겠다는 뜻
        .exec(function(err, location){
            if(!location){
                sendJsonResponse(res, 404, {"message":"해당 locationid가 db에 존재하지 않습니다."});
                return;
            }else if(err){
                sendJsonResponse(res, 400, err);
                return;
            }
            location.name = req.body.name;
            location.address = req.body.address;
            location.facilities = req.body.facilities.split(",");
            location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
            location.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            },{
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
            }];
            location.save(function(err,location){
                if (err){
                    sendJsonResponse(res, 404, err);
                } else{
                    sendJsonResponse(res, 200, location);
                }
            });
        });

};
module.exports.locationsDeleteOne = function(req,res){
    let locationid = req.params.locationid;
    if (locationid){
        Location
            .findByIdAndRemove(locationid)
            .exec(function(err, location){
                if (err){
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, {"message":"해당 location이 제거 되었습니다."});
            });
    } else{
        sendJsonResponse(res, 404, {"message":"요청 파라미터에 locationid가 존재하지 않습니다."});
    }
};