---
layout: splash
permalink: /brugesgand/
title: "bruges / gand"
---

## photos de bruges

<div class="carousel">
    <div class="carousel-track">
		<img src="/assets/images/bruges/bruges12" alt="bruges12">
		<img src="/assets/images/bruges/bruges11" alt="bruges11">
		<img src="/assets/images/bruges/bruges10" alt="bruges10">
		<img src="/assets/images/bruges/bruges23" alt="bruges23">
		<img src="/assets/images/bruges/bruges1" alt="bruges1">
		<img src="/assets/images/bruges/bruges6" alt="bruges6">
		<img src="/assets/images/bruges/bruges15" alt="bruges15">
		<img src="/assets/images/bruges/bruges9" alt="bruges9">
		<img src="/assets/images/bruges/bruges22" alt="bruges22">
		<img src="/assets/images/bruges/bruges2" alt="bruges2">
		<img src="/assets/images/bruges/bruges25" alt="bruges25">
		<img src="/assets/images/bruges/bruges17" alt="bruges17">
		<img src="/assets/images/bruges/bruges4" alt="bruges4">
		<img src="/assets/images/bruges/bruges20" alt="bruges20">
		<img src="/assets/images/bruges/bruges26" alt="bruges26">
		<img src="/assets/images/bruges/bruges21" alt="bruges21">
		<img src="/assets/images/bruges/bruges13" alt="bruges13">
		<img src="/assets/images/bruges/bruges29" alt="bruges29">
		<img src="/assets/images/bruges/bruges30" alt="bruges30">
		<img src="/assets/images/bruges/bruges5" alt="bruges5">
		<img src="/assets/images/bruges/bruges16" alt="bruges16">
		<img src="/assets/images/bruges/bruges24" alt="bruges24">
		<img src="/assets/images/bruges/bruges27" alt="bruges27">
		<img src="/assets/images/bruges/bruges7" alt="bruges7">
		<img src="/assets/images/bruges/bruges3" alt="bruges3">
		<img src="/assets/images/bruges/bruges18" alt="bruges18">
		<img src="/assets/images/bruges/bruges14" alt="bruges14">
		<img src="/assets/images/bruges/bruges28" alt="bruges28">
		<img src="/assets/images/bruges/bruges19" alt="bruges19">
	</div>
	<button class="carousel-btn prev">‹</button>
	<button class="carousel-btn next">›</button>
</div>

## photos de gand


<div class="carousel">
    <div class="carousel-track">
		<img src="/assets/images/gand/gand41" alt="gand41">
		<img src="/assets/images/gand/gand37" alt="gand37">
		<img src="/assets/images/gand/gand3" alt="gand3">
		<img src="/assets/images/gand/gand34" alt="gand34">
		<img src="/assets/images/gand/gand14" alt="gand14">
		<img src="/assets/images/gand/gand18" alt="gand18">
		<img src="/assets/images/gand/gand10" alt="gand10">
		<img src="/assets/images/gand/gand7" alt="gand7">
		<img src="/assets/images/gand/gand32" alt="gand32">
		<img src="/assets/images/gand/gand1" alt="gand1">
		<img src="/assets/images/gand/gand20" alt="gand20">
		<img src="/assets/images/gand/gand25" alt="gand25">
		<img src="/assets/images/gand/gand2" alt="gand2">
		<img src="/assets/images/gand/gand5" alt="gand5">
		<img src="/assets/images/gand/gand8" alt="gand8">
		<img src="/assets/images/gand/gand31" alt="gand31">
		<img src="/assets/images/gand/gand15" alt="gand15">
		<img src="/assets/images/gand/gand33" alt="gand33">
		<img src="/assets/images/gand/gand27" alt="gand27">
		<img src="/assets/images/gand/gand23" alt="gand23">
		<img src="/assets/images/gand/gand12" alt="gand12">
		<img src="/assets/images/gand/gand42" alt="gand42">
		<img src="/assets/images/gand/gand24" alt="gand24">
		<img src="/assets/images/gand/gand21" alt="gand21">
		<img src="/assets/images/gand/gand39" alt="gand39">
		<img src="/assets/images/gand/gand28" alt="gand28">
		<img src="/assets/images/gand/gand35" alt="gand35">
		<img src="/assets/images/gand/gand43" alt="gand43">
		<img src="/assets/images/gand/gand45" alt="gand45">
		<img src="/assets/images/gand/gand9" alt="gand9">
		<img src="/assets/images/gand/gand11" alt="gand11">
		<img src="/assets/images/gand/gand26" alt="gand26">
		<img src="/assets/images/gand/gand22" alt="gand22">
		<img src="/assets/images/gand/gand13" alt="gand13">
		<img src="/assets/images/gand/gand38" alt="gand38">
		<img src="/assets/images/gand/gand16" alt="gand16">
		<img src="/assets/images/gand/gand29" alt="gand29">
		<img src="/assets/images/gand/gand44" alt="gand44">
		<img src="/assets/images/gand/gand40" alt="gand40">
		<img src="/assets/images/gand/gand30" alt="gand30">
		<img src="/assets/images/gand/gand6" alt="gand6">
		<img src="/assets/images/gand/gand19" alt="gand19">
		<img src="/assets/images/gand/gand4" alt="gand4">
		<img src="/assets/images/gand/gand17" alt="gand17">
		<img src="/assets/images/gand/gand36" alt="gand36">
	</div>
	<button class="carousel-btn prev">‹</button>
	<button class="carousel-btn next">›</button>
</div>

<!-- Lightbox -->
<div class="lightbox" id="lightbox">
  <img id="lightbox-img" src="" alt="">
</div>

<script>
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const images = carousel.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');

    let index = 0;

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % images.length;
      update();
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      update();
    });

    // Lightbox
    images.forEach(img => {
      img.addEventListener('click', () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
      });
    });
  });

  // fermeture lightbox
  document.getElementById('lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
  });
</script>