const Fleet = require('../models/Fleet');

exports.addVehicle = async (req, res) => {
    try {
        const vehicle = new Fleet(req.body);
        const savedVehicle = await vehicle.save();
        res.status(201).json({
            success: true,
            data: savedVehicle
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Fleet.find();
        res.json({
            success: true,
            data: vehicles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Fleet.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }
        res.json({ success: true, data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
