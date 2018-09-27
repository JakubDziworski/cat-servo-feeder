const Gpio = require('pigpio').Gpio;
const schedule = require('node-schedule');

const MAX_BRIGHTNESS = 255;
let job;
let fade;

function setConfig(startHour,startMinute, fadeInMinutes) {
    console.log(`Setting light to start every ${startHour}:${startMinute} and fade in ${fadeInMinutes} minutes`);
    const pins = [22, 23, 24].map(p => new Gpio(p, {mode: Gpio.OUTPUT}));
    const startFadeCron = `0 ${startMinute} ${startHour} * * *`;
    const tick = (fadeInMinutes / MAX_BRIGHTNESS) * 60 * 1000;
    console.log('Cron set to ' + startFadeCron);
    let brightness = 0;
    if(job) {
        console.log('Clearing up exiting job');
        clearInterval(fade);
        job.cancel();
    }
    const fadeIn = () => {
        console.log('Fading in ' + brightness);
        if(brightness < MAX_BRIGHTNESS) {
            brightness++;
            pins.forEach(pin => pin.pwmWrite(brightness));
        } else {
            console.log('Done fading');
            clearInterval(fade);
        }
    };
    job = schedule.scheduleJob(startFadeCron,() => {
        console.log('Starting job!');
        fade = setInterval(fadeIn,tick)
    });
}

module.exports = {
    setConfig
};