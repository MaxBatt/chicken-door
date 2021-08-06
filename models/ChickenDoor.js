var mongoose = require('mongoose');
var Schema = mongoose.Schema;

ChickenDoorSchema = Schema({
    doorState: { type: String, default: 'STATE_DOWN'},
    lastKnownDoorState: { type: String, default: 'STATE_DOWN'},
    upTime: { type: Number, default: 0},
    pir: { type: Number, default: 0},
});

module.exports = mongoose.model('ChickenDoor', ChickenDoorSchema)