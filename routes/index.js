var express = require('express');
const chickenDoorController = new(require('../modules/chickenDoorController'));
var router = express.Router();
const Config = require('../modules/config')

/** FRONTEND */
/* GET home page. */
router.get('/', async function(req, res, next) {
  let chickenDoor = await chickenDoorController.getChickenDoor();
  res.render('index', { 
    title: Config.appTitle,
    chickenDoor: chickenDoor 
  });
});

router.post('/', async function(req, res, next) {
  const doorState = req.body.doorState;
  try {
    let chickenDoor = await chickenDoorController.updateChickenDoor({
      doorState: doorState
    });
    res.render('index', { 
      title: Config.appTitle,
      chickenDoor: chickenDoor 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

/** API */
/* GET door state. */
router.get('/api/doorstate', async function(req, res, next) {
  const lastKnownDoorState = req.query.State;
  const upTime = parseInt(req.query.Uptime);
  const pir = parseInt(req.query.Pir);

  try {
    let chickenDoor = await chickenDoorController.updateChickenDoor({
      lastKnownDoorState: lastKnownDoorState,
      upTime: upTime,
      pir: pir 
    });
    res.status(200).json(chickenDoor);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
