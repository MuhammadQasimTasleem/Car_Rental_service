const express = require('express');
const router = express.Router();
const { addVehicle, getAllVehicles,getVehicleById } = require('../controllers/fleetController');

router.post('/', addVehicle);
router.get('/', getAllVehicles);
router.get('/:id', getVehicleById); // Get vehicle by ID

module.exports = router;