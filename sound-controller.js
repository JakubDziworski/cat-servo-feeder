const spawn = require('child_process').spawn;

function summon() {
  playSound('summon.wav');
}

function banish() {
  playSound('banish.wav');
}

function playSound(soundFile) {
  const s = spawn('aplay',[soundFile]);

  s.on('error', function (err) {
    console.log('sound playing error', err);
  });
}

module.exports = {
  summon,banish
};