'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const RivalSchema = Schema({
    battle: Number,
    name: String,
    //deck: [{ type: Schema.ObjectId, ref: 'decks' }],
    //drop: [{ type: Schema.ObjectId, ref: 'drops' }]
})

module.exports = mongoose.model('rivals', RivalSchema);