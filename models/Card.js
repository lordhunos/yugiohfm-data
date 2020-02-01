'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const gsTypes = ['Sun', 'Moon', 'Venus', 'Mercury', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

const CardSchema = Schema({
    num: { type: Number, unique: true },
    name: { type: String, unique: true },
    atk: Number,
    def: Number,
    gs: {
        prim: { type: String, enum: gsTypes },
        sec: { type: String, enum: gsTypes }
    },
    type: { 
        prim: { type: String },
        sec: [{ type: String }]
    },
    pass: String,
    price: Number,
    desc: String,
    atr: Number,
    level: Number
})

module.exports = mongoose.model('cards', CardSchema);