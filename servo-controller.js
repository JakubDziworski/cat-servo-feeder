const Gpio = require('pigpio').Gpio;

const motor = new Gpio(24, {mode: Gpio.OUTPUT});

let pulseWidth = 1000;
let increment = 100;

const Max = 2500;
const Min = 500;

function change(percentage) {
  const pw = (Max-Min)*(percentage/100) + Min;
  motor.servoWrite(pw);
}

function getOpenPercentage() {
  const pw = motor.getServoPulseWidth();
  const percentage = (pw - Min)/(Max-Min) * 100;
  if(percentage < 0) {
    throw new Error("Unable to fetch servo status");
  } else {
    return percentage;
  }
}

module.exports = {
  change,getOpenPercentage
};