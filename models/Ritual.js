'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const RitualSchema = Schema({
    cr: { type: Schema.ObjectId, ref: 'cards' },
    c1: { type: Schema.ObjectId, ref: 'cards' },
    c2: { type: Schema.ObjectId, ref: 'cards' },
    c3: { type: Schema.ObjectId, ref: 'cards' },
    cf: { type: Schema.ObjectId, ref: 'cards' }
})

module.exports = mongoose.model('rituals', RitualSchema);