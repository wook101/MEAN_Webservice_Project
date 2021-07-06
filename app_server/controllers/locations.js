const Location = require('mongoose').model('Location'); 
const request = require('request');
const apiOptions = {
    server : "http://localhost:3000"
};
if (process.env.NODE_ENV==='production'){
    apiOptions.server = "http://외부 호스트 서버주소"
}

module.exports.locationInfo = function(req,res){
    
    /*
    res.render('locationInfo',
    {
        title:'locationInfo',
        sidebar:'해당 카페는......................',
        location:{
            name: '스타벅스 건대입구점',
            address:'서울특별시 광진구 화양동 5-47',
            rating: 3,
            facilities:['Hot drinks','Food','Premium wifi'],
            coords: {lat: 37.540632644213474,
                     lng: 127.07074699425593}
        },
        openingTimes:[
            {
                days: '월요일 - 금요일',
                opening: '08:00am',
                closing: '22:00pm',
                closed: false
            },
            {
                days: '토요일',
                opening: '09:00am',
                closing: '22:00pm',
                closed: false
            },
            {
                days: '일요일',
                opening: '10:00am',
                closing: '21:00pm',
                closed: false
            }
        ],
        reviews:[
            {  
                author:'김동욱',
                rating:5,
                timestamp:'2021.06.13',
                reviewText:'잠깐 휴식하기 좋은 장소 입니다.'
            },
            {  
                author:'김유진',
                rating:4,
                timestamp:'2021.06.20',
                reviewText:'시원하고, 커피가 맛있어요.'
            }
        ]
    });
    */
};

module.exports.addReview = function(req,res){
    res.render('locations-review',{title:'addReview'});
};

