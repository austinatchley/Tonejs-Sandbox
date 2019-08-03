import Tone from 'tone';

function draw() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  context.fillStyle = 'rgb(200,0,0)';
  context.fillRect(10, 10, 50, 50);

  context.fillStyle = 'rgb(0,0,100,0.5)';
  context.fillRect(30, 30, 50, 50);
}

draw();

var pluckSynth = new Tone.PluckSynth().toMaster();

var distortion = new Tone.Distortion(0.6);
var tremolo = new Tone.Tremolo().start();

var synth = new Tone.PolySynth(4, Tone.Synth, {
  oscillator: {
    type: 'triangle8'
  },
  envelope: {
    attack: 1,
    decay: 0.5,
    sustain: 0.1,
    release: 4
  }
}).chain(distortion, tremolo, Tone.Master);

document.addEventListener('keydown', function() {
  const keyName = event.key;

  // start/stop the transport
  if (keyName === ' ') {
    Tone.Transport.toggle();
    console.log("Tone Transport toggled");
  } 
});

document.addEventListener('mousedown', function() {
  synth.triggerAttack(['C4', 'E4', 'G4', 'B4']);
});

document.addEventListener('mouseup', function() {
  synth.triggerRelease();
});
