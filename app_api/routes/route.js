const express = require('express');
const router = express.Router(); //express에서 라우팅 모듈 가져옴

const mainController = require('../controllers/main');
const locationsController = require('../controllers/locations');
const othersController = require('../controllers/others');


router.get('/', mainController.main);
router.get('/location', locationsController.locationInfo);
router.get('/location/review/new', locationsController.addReview);
router.get('/about', othersController.about);

module.exports = router;