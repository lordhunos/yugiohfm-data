'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const FusionSchema = Schema({
    c1: { type: Schema.ObjectId, ref: 'cards' },
    c2: { type: Schema.ObjectId, ref: 'cards' },
    f: { type: Schema.ObjectId, ref: 'cards' }
})

module.exports = mongoose.model('fusions', FusionSchema);