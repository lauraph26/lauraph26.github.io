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

.cake-container {
  position: relative;
  width: 300px;  /* largeur du conteneur */
  margin: 0 auto;
}

.gifs {
  position: absolute;
  top: 50%;   /* centré verticalement par rapport au gâteau */
  left: 0;
  width: 100%;
  height: 0;
  pointer-events: none;  /* pour que le clic passe au gâteau */
  display: none;
  
}

@keyframes floatSide {
  0% { transform: translateY(-50%) translateX(0); }
  50% { transform: translateY(-50%) translateX(10px); }
  100% { transform: translateY(-50%) translateX(0); }
}

.gif {
  position: absolute;
  width: 80px;  /* taille du gif */
  height: 80px;
  animation: floatSide 2s ease-in-out infinite;
  transform: translateY(-50%); /* pour centrer verticalement */
}

/* Position gauche et droite */
.gif.left {
  left: -100px;  /* à gauche du gâteau */
}

.gif.right {
  right: -100px; /* à droite du gâteau */
}

</style>

<h1>allez fais pas la timide, fais un voeu et souffle les bougies (oui oui souffle dans le micro là) </h1>

<div class="cake-container">
  <div class="cake">
    <div class="candle"><div class="flame"></div></div>
    <div class="candle"><div class="flame"></div></div>
    <div class="candle"><div class="flame"></div></div>
  </div>

  <div class="gifs">
    <img src="/assets/gifs/party1.gif" class="gif left">
    <img src="/assets/gifs/party2.gif" class="gif right">
  </div>
</div>

<button id="startMic">faut peut-être activer le micro en cliquant ici . . . </button>
<p id="status"></p>

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

    if(volume>200){
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

   document.querySelectorAll(".gifs").forEach(g => {
    g.style.display = "block";
  });

  status.innerText="joyeux anniversaire !!!!!!"

  music.play()

  startConfetti()

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