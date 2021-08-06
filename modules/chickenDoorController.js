var _this;
const ChickenDoor = require('../models/ChickenDoor');

module.exports = function () {
    _this = this;
    this.createChickenDoor = function () {
        return new Promise(async function (resolve, reject) {
            ChickenDoor.countDocuments({}, function(err, count) {
                if(count == 0){
                    const chickenSettings = new ChickenDoor();
                    chickenSettings.save(function (err, data) {
                        if (!err) {
                            resolve(data);
                        } else {
                            console.log(err);
                            reject(err);
                        }
                    });
                }
           });
        });
    }
    this.getChickenDoor = async function () {
        return new Promise( function (resolve, reject) {
            const query = ChickenDoor.find({}).limit(1);
            query.exec(async function(err, chickenDoors) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                // if no chicken door exists yet (first app start)
                if(chickenDoors.length == 0){
                    let chickenDoor = await _this.createChickenDoor();
                    resolve(chickenDoor);
                }
                else{
                    resolve(chickenDoors[0]);
                }
            });
        });
    }

    this.updateChickenDoor = function (chickenDoor) {
        return new Promise(async function (resolve, reject) {
            try {
                let dbChickenDoor = await _this.getChickenDoor();
                if(chickenDoor.doorState){
                    dbChickenDoor.doorState = chickenDoor.doorState
                }
                if(chickenDoor.lastKnownDoorState){
                    if(chickenDoor.lastKnownDoorState){
                        if(chickenDoor.lastKnownDoorState === 'STATE_DOWN'){
                            chickenDoor.lastKnownDoorState = 'Down'
                        }
                        else if(chickenDoor.lastKnownDoorState === 'STATE_UP'){
                            chickenDoor.lastKnownDoorState = 'Up'
                        }
                    }
                    dbChickenDoor.lastKnownDoorState = chickenDoor.lastKnownDoorState
                }
                if(chickenDoor.upTime){
                    dbChickenDoor.upTime = chickenDoor.upTime
                }
                if(chickenDoor.pir){
                    dbChickenDoor.pir = chickenDoor.pir
                }
                dbChickenDoor.save(function (err, data) {
                    if (!err) {
                        resolve(data);
                    } else {
                        console.log(err);
                        reject(err);
                    }
                });
            } catch (error) {
                console.log(error);
                reject.error;
            }
        });
    }

    this.updateDoorState = function (params) {
        return new Promise(async function (resolve, reject) {
            try {
                let dbChickenDoor = await _this.getChickenDoor();
                dbChickenDoor.doorState = params.doorState

                dbChickenDoor.save(function (err, data) {
                    if (!err) {
                        resolve(data);
                    } else {
                        console.log(err);
                        reject(err);
                    }
                });
            } catch (error) {
                console.log(error);
                reject.error;
            }
        });
    }
}