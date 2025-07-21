const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Set to false if booking can be made without login
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fleet',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    fromAddress: {
        type: String,
        required: true
    },
    toAddress: {
        type: String,
        required: true
    },
    persons: {
        type: String,
        required: true
    },
    luggage: {
        type: String,
        required: true
    },
    journeyDate: {
        type: Date,
        required: true
    },
    journeyTime: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);