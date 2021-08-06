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
    this.getChickenDoor = function () {
        return new Promise(async function (resolve, reject) {
            const query = ChickenDoor.find({}).limit(1);
            query.exec(function(err, chickenDoor) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(chickenDoor[0]);
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
}