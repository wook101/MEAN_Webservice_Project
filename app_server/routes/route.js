const mainController = require('../controllers/main');
const locationsController = require('../controllers/locations');
const othersController = require('../controllers/others');


module.exports = function(app){
    app.route('/').get(mainController.main);
    app.route('/location').get(locationsController.locationInfo);
    app.route('/location/review/new').get(locationsController.addReview);
    app.route('/about').get(othersController.about);
};
