---
layout: splash
permalink: /brugesgand/
title: "bruges / gand"
---


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

<!-- Lightbox -->
<div class="lightbox" id="lightbox">
  <img id="lightbox-img" src="" alt="">
</div>

<script>
  const track = document.querySelector('.carousel-track');
  const images = document.querySelectorAll('.carousel img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  let index = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % images.length;
    updateCarousel();
  });

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    updateCarousel();
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  images.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
</script>