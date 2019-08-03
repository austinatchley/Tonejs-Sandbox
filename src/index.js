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

var synth = new Tone.PluckSynth().toMaster()

// this function is called right before the scheduled time
function triggerSynth(time) {
	// the time is the sample-accurate time of the event
	synth.triggerAttackRelease('C4', '8n', time)
}

// schedule a few notes
Tone.Transport.schedule(triggerSynth, 0)
Tone.Transport.schedule(triggerSynth, '0:1')
Tone.Transport.schedule(triggerSynth, '0:1:2')
Tone.Transport.schedule(triggerSynth, '0:1:2:3')

// set the transport to repeat
Tone.Transport.loopEnd = '1m'
Tone.Transport.loop = true

document.addEventListener('keydown', function() {
  const keyName = event.key;

  // start/stop the transport
  if (keyName === ' ') {
    Tone.Transport.toggle()
    console.log("Tone Transport toggled");
  }
});
