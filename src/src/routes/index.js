const router = require('express').Router();
const entityController = require('../controllers/entityController');


router.use('/entities/filter', entityController.entityFilter);
module.exports = router;