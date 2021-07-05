const express = require('express');
const router = express.Router(); //express에서 라우팅 모듈 가져옴

const mainCtl = require('../controllers/main');
const locationsCtl = require('../controllers/locations');
const reviewsCtl = require('../controllers/reviews');
const othersCtl = require('../controllers/others');


router.get('/', mainCtl.main);
router.get('/location/review/new', locationsCtl.addReview);

//locations
router.get('/locations', locationsCtl.locationsListByDistance);
router.post('/locations', locationsCtl.locationsCreate);                        //json응답 성공
router.get('/locations/:locationid',locationsCtl.locationsReadOne);             //json응답 성공
router.put('/locations/:locationid',locationsCtl.locationsUpdateOne);           //json응답 성공
router.delete('/locations/:locationid',locationsCtl.locationsDeleteOne);

//reviews
router.post('/locations/:locationid/reviews', reviewsCtl.reviewsCreate);            //json응답 성공
router.get('/locations/:locationid/reviews/:reviewid',reviewsCtl.reviewsReadOne);   //json응답 성공
router.put('/locations/:locationid/reviews/:reviewid',reviewsCtl.reviewsUpdateOne); //json응답 성공
router.delete('/locations/:locationid/reviews/:reivewid',reviewsCtl.reviewsDeleteOne);





//review
router.get('/about', othersCtl.about);

module.exports = router;