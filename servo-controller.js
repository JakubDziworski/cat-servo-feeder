const Gpio = require('pigpio').Gpio;
const Config = require('./config');
const Max = 2400;
const Min = 800;
const Bowls = Config.bowls.map(bowl => Object.assign({},bowl,{motor: new Gpio(bowl.servoPin, {mode: Gpio.OUTPUT})}));

function change(bowlId,percentage) {
  const bowlMotor = Bowls.find(i => i.id === bowlId).motor;
  const pw = (Max-Min)*(percentage/100) + Min;
  bowlMotor.servoWrite(pw);
}

module.exports = {
  change
};