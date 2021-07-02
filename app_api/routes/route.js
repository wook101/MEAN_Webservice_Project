const express = require('express');
const router = express.Router(); //express에서 라우팅 모듈 가져옴

const mainCtl = require('../controllers/main');
const locationsCtl = require('../controllers/locations');
const reviewsCtl = require('../controllers/reviews');
const othersCtl = require('../controllers/others');


router.get('/', mainCtl.main);
router.get('/location/review/new', locationsCtl.addReview);

//location
router.get('/locations', locationsCtl.locationsListByDistance);
router.post('/locations', locationsCtl.locationsCreate);
router.get('/locations/:locationid',locationsCtl.locationsReadOne);
router.put('/locations/:locationid',locationsCtl.locationsUpdateOne);
router.delete('/locations/:locationid',locationsCtl.locationsDeleteOne);

//review
router.post('/locations/:locationid/reviews', reviewsCtl.reviewsCreate);
router.get('/locations/:locationid/reviews/:reivewid',reviewsCtl.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reivewid',reviewsCtl.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reivewid',reviewsCtl.reviewsDeleteOne);





//review
router.get('/about', othersCtl.about);

module.exports = router;