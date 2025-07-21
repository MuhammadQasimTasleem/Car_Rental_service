const Booking = require('../models/Booking');
const Fleet = require('../models/Fleet');


exports.createBooking = async (req, res) => {
    try {
        const {
            vehicleId,
            firstName,
            lastName,
            email,
            phoneNumber,
            fromAddress,
            toAddress,
            persons,
            luggage,
            journeyDate,
            journeyTime,
            note
        } = req.body;

        // Validate required fields
        if (!vehicleId || !firstName || !lastName || !email || !phoneNumber || !fromAddress || !toAddress || !persons || !luggage || !journeyDate || !journeyTime) {
            return res.status(400).json({ success: false, message: "All required fields must be filled." });
        }

        // Check vehicle exists
        const vehicle = await Fleet.findById(vehicleId);
        if (!vehicle) {
            return res.status(404).json({ success: false, message: "Vehicle not found" });
        }

        // Check for existing booking for the same vehicle, date, and time
        const existingBooking = await Booking.findOne({
            vehicle: vehicleId,
            journeyDate: new Date(journeyDate),
            journeyTime: journeyTime
        });

        if (existingBooking) {
            return res.status(400).json({
                success: false,
                message: "This car is already booked for the selected date and time."
            });
        }

        // Create booking
        const newBooking = await Booking.create({
            user: req.user ? req.user._id : undefined, // If using auth
            vehicle: vehicleId,
            firstName,
            lastName,
            email,
            phoneNumber,
            fromAddress,
            toAddress,
            persons,
            luggage,
            journeyDate,
            journeyTime,
            note
        });

        res.status(201).json({ success: true, data: newBooking });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};



exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id });
        res.json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};