const mongoose = require('mongoose');

//opengTime스키마 정의 (서브 document)
const openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});
//reviews스키마 정의 (서브 document)
const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {type: Number, "default":0, min:0, max:5},
    reviewText: String,
    createdOn: {type: Date, "default": Date.now}
});
//location스키마 정의
const locationSchema = new mongoose.Schema({
    name: {type: String, required:true},
    address: String,
    rating: {type: Number, "default":0, min:0, max:5},
    facilities: [String], //배열내에 모든 데이터 타입이 String인 경우
    coordinates: {type:[Number], index:'2dsphere', required:true},
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

mongoose.model('Location',locationSchema,'locations'); //첫번째 인자:모델명, 두번째 인자:스키마 이름, 세번째 인자: mongoDB컬렉션 명 