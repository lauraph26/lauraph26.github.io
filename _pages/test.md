---
layout: splash
permalink: /test/
title: "Test"
---

<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/fireworks-js@2/dist/index.umd.js"></script>

<div id="fireworks" style="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;background:rgba(0,0,0,0.1)"></div>
<script>
const fw = new Fireworks.Fireworks(document.getElementById('fireworks'));
fw.start();
</script>