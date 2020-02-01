'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeckSchema = Schema({
    rival: { type: Schema.ObjectId, ref: 'rivals' },
    card: { type: Schema.ObjectId, ref: 'cards' },
    prob: Number
})

module.exports = mongoose.model('decks', DeckSchema);