const mongoose = require('mongoose');

const fleetSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    carName: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    speed: {
        type: String,
        default: ""
    },
    gps: {
        type: String,
        default: ""
    },
    seatType: {
        type: String,
        default: ""
    },
    automatic: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Fleet', fleetSchema);