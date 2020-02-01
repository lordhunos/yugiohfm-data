'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const DropSchema = Schema({
    rival: { type: Schema.ObjectId, ref: 'rivals' },
    card: { type: Schema.ObjectId, ref: 'cards' },
    prob: Number,
    rank: {
        type: String,
        enum: ['sapow', 'bcdpt', 'satec']
    }
})

module.exports = mongoose.model('drops', DropSchema);