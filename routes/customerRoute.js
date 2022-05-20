const router = require('express').Router();
const customerController = require('./../controllers/customerCon');
const validation = require('./../middlewares/validation');

router
    .route('/')
    .get(customerController.findHTML);
    
router
    .route('/Knearest')
    .get(validation.validate('K-nearest'), customerController.findKnearest);

router
    .route('/clustering').get(customerController.createList);

module.exports = router;