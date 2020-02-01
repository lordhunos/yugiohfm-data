'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const EquipmentSchema = Schema({
    card: { type: Schema.ObjectId, ref: 'cards' },
    equip: { type: Schema.ObjectId, ref: 'cards' },
})

module.exports = mongoose.model('equipments', EquipmentSchema);