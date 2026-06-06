const router = require('express').Router();
const ctrl = require('../controllers/bookings.controller');
router.get('/', ctrl.list);
router.post('/', ctrl.create);
module.exports = router;
