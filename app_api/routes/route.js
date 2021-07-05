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
router.post('/locations', locationsCtl.locationsCreate);            //완료
router.get('/locations/:locationid',locationsCtl.locationsReadOne); //완료
router.put('/locations/:locationid',locationsCtl.locationsUpdateOne);//완료
router.delete('/locations/:locationid',locationsCtl.locationsDeleteOne);

//reviews
router.post('/locations/:locationid/reviews', reviewsCtl.reviewsCreate);   //완료 
router.get('/locations/:locationid/reviews/:reviewid',reviewsCtl.reviewsReadOne);   //완료
router.put('/locations/:locationid/reviews/:reviewid',reviewsCtl.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reivewid',reviewsCtl.reviewsDeleteOne);





//review
router.get('/about', othersCtl.about);

module.exports = router;