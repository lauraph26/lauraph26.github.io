---
layout: splash
permalink: /birthday/
title: "Birthday"
---


<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/fireworks-js@2/dist/index.umd.js"></script>

<style>

body{
  text-align:center;
  font-family:sans-serif;
  background:#111;
  color:white;
}

.cake{
  width:200px;
  height:120px;
  background:#ff9ecb;
  border-radius:12px;
  margin:80px auto;
  position:relative;
}

.candle{
  width:10px;
  height:40px;
  background:white;
  position:absolute;
  top:-40px;
}

.candle:nth-child(1){left:40px}
.candle:nth-child(2){left:95px}
.candle:nth-child(3){left:150px}

.flame{
  width:10px;
  height:15px;
  background:orange;
  border-radius:50%;
  position:absolute;
  top:-15px;
  animation:flicker 0.15s infinite alternate;
}

@keyframes flicker{
  from{transform:scale(1)}
  to{transform:scale(1.25)}
}

#fireworks{
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  pointer-events:none;
  z-index:9999;
  overflow: visible;
}
#fireworks canvas{
  position: absolute !important;
  width: 100% !important;
  height: 100% !important;
}

#gifs{
  margin-top:30px;
  display:none;
}

#gifs img{
  width:200px;
  margin:10px;
}

</style>

<h1>alleeez fais pas la timide, fais un voeu et souffle les bougies (oui oui souffle dans le micro là) </h1>

<div class="cake">
  <div class="candle"><div class="flame"></div></div>
  <div class="candle"><div class="flame"></div></div>
  <div class="candle"><div class="flame"></div></div>
</div>

<button id="startMic">faut peut-être activer le micro en cliquant ici . . . </button>
<p id="status"></p>

<div id="fireworks"></div>

<div id="gifs">
  <img src="/assets/gifs/party1.gif">
  <img src="/assets/gifs/party2.gif">
  <img src="/assets/gifs/party3.gif">
</div>

<audio id="music" src="/assets/music/happy-birthday.mp3"></audio>

<script>

const button = document.getElementById("startMic")
const status = document.getElementById("status")
const music = document.getElementById("music")

button.onclick = async () => {

  const stream = await navigator.mediaDevices.getUserMedia({audio:true})

  const audioContext = new AudioContext()
  const microphone = audioContext.createMediaStreamSource(stream)
  const analyser = audioContext.createAnalyser()

  microphone.connect(analyser)

  const data = new Uint8Array(analyser.frequencyBinCount)

  status.innerText=""

  function detectBlow(){

    analyser.getByteFrequencyData(data)

    let volume=data.reduce((a,b)=>a+b)/data.length

    if(volume>60){
      triggerParty()
      return
    }

    requestAnimationFrame(detectBlow)
  }

  detectBlow()
}

function triggerParty(){

  document.querySelectorAll(".flame").forEach(f=>{
    f.style.display="none"
  })

  status.innerText="joyeux anniversaire !!!!!!"

  music.play()

  startConfetti()

  startFireworks();
  setTimeout(startFireworks, 2000);
  setTimeout(startFireworks, 4000);

  document.getElementById("gifs").style.display="block"
}

function startConfetti() {

  function shoot() {

    confetti({
      particleCount: 20,
      spread: 360,
      startVelocity: 45,
      scalar: 1.6,
      colors:['#ff4d4d','#ffd24d','#4dff88','#4da6ff','#ff66ff'],
      ticks: 125,
      origin: {
        x: Math.random(),
        y: -0.1
      },
      opacity: 1
    });

    requestAnimationFrame(shoot);
  }

  shoot();
}

function startFireworks(){

  const container = document.getElementById("fireworks");

  const fireworks = new Fireworks.default(container, {
    rocketsPoint: 20,
    hue: { min: 0, max: 360 },
    delay: { min: 2, max: 8 },
    speed: 4,
    acceleration: 1.08,
    friction: 0.95,
    gravity: 1.3,
    particles: 200,
    trace: 8,
    explosion: 8
  });
    console.log("fireworks launching")
  fireworks.start();
}

</script>