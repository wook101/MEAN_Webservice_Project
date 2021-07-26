const express = require('express');
const router = express.Router(); //express에서 라우팅 모듈 가져옴


const locationsController = require('../controllers/locations');
//const othersController = require('../controllers/others');


router.get('/', locationsController.locationList);
router.get('/location/:locationid', locationsController.locationDetail);
router.get('/location/:locationid/reviews/new', locationsController.addReview);
router.post('/location/:locationid/reviews/new', locationsController.doAddReview);   //리뷰추가
//router.get('/about', othersController.about);

module.exports = router;