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
    attack: 0.001,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1
  }
}).toMaster(); //.chain(distortion, tremolo, Tone.Master);

function toggleTransport() {
  var bpm = document.getElementById('BPM').value;
  console.log("Setting BPM to " + bpm);
  Tone.Transport.bpm.value = bpm;
  synth.volume.value = 0;

  Tone.Transport.toggle();
  console.log("Tone Transport toggled");
}

// Util
var MIDI_NUM_NAMES = ["C_1", "C#_1", "D_1", "D#_1", "E_1", "F_1", "F#_1", "G_1", "G#_1", "A_1", "A#_1", "B_1",
                "C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0",
                "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
                "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
                "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
                "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
                "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
                "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
                "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7",
                "C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8",
                "C9", "C#9", "D9", "D#9", "E9", "F9", "F#9", "G9"];

var MAJOR_SCALE = [0,2,4,5,7,9,11,12];
var startingNote = 60;  // middle C
var myScale = [];
for(var i = 0; i < MAJOR_SCALE.length; i++) {
    myScale.push(MIDI_NUM_NAMES[MAJOR_SCALE[i] + startingNote]);
}

var pattern = new Tone.Pattern(function(time, note){
  //the order of the notes passed in depends on the pattern
  synth.triggerAttackRelease(note, "4n", time);
}, myScale, 'random').start(0);    

// Event Listeners
document.addEventListener('keydown', function() {
  const keyName = event.key;

  // start/stop the transport
  if (keyName === ' ') {
    toggleTransport();
  } 
});

document.addEventListener('mousedown', function() {
  // synth.triggerAttack(['C4', 'E4', 'G4', 'B4']);
});

document.addEventListener('mouseup', function() {
  // synth.triggerRelease();
});
