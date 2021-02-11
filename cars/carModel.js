const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Date,
        required: true,
    },
    run: {
        type: Number,
        min: [0, 'cannot be above zero?'],
        required: true
    },
    gearbox: {
        type: String,
        enum: ['manual', 'auto'],
        required: true
    }
})

const Car = mongoose.model('cars', CarSchema)

module.exports = Car