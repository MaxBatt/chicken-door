var mongoose = require('mongoose');
var Schema = mongoose.Schema;

ChickenDoorSchema = Schema({
    doorState: { type: String, default: 'closed'},
    lastKnownDoorState: { type: String, default: 'closed'},
    upTime: { type: Number, default: 0},
    pir: { type: Number, default: 0},
});

module.exports = mongoose.model('ChickenDoor', ChickenDoorSchema)