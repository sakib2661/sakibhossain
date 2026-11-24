document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("heroSlider");
  const slidesTrack = document.getElementById("heroSlides");
  const slides = slidesTrack ? slidesTrack.querySelectorAll(".hero-slide") : [];
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const dots = document.querySelectorAll("#sliderDots .dot");

  if (!slider || !slidesTrack || slides.length === 0) return;

  let currentIndex = 0;
  let startX = 0;
  let deltaX = 0;
  let isDragging = false;
  const swipeThreshold = 50;

  function updateSlider(index) {
    currentIndex = (index + slides.length) % slides.length;
    slidesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function startDrag(clientX) {
    isDragging = true;
    startX = clientX;
    deltaX = 0;
    slidesTrack.classList.add("dragging");
  }

  function moveDrag(clientX) {
    if (!isDragging) return;
    deltaX = clientX - startX;
    const width = slider.clientWidth || 1;
    const dragPercent = (deltaX / width) * 100;
    slidesTrack.style.transform = `translateX(${-currentIndex * 100 + dragPercent}%)`;
  }

  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    slidesTrack.classList.remove("dragging");

    if (deltaX < -swipeThreshold) {
      updateSlider(currentIndex + 1);
    } else if (deltaX > swipeThreshold) {
      updateSlider(currentIndex - 1);
    } else {
      updateSlider(currentIndex);
    }

    startX = 0;
    deltaX = 0;
  }

  slidesTrack.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length === 1) startDrag(e.touches[0].clientX);
    },
    { passive: true }
  );

  slidesTrack.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches.length === 1) moveDrag(e.touches[0].clientX);
    },
    { passive: true }
  );

  slidesTrack.addEventListener("touchend", endDrag);
  slidesTrack.addEventListener("touchcancel", endDrag);

  slidesTrack.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    startDrag(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (isDragging) moveDrag(e.clientX);
  });

  window.addEventListener("mouseup", endDrag);

  if (prevBtn) {
    prevBtn.addEventListener("click", () => updateSlider(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => updateSlider(currentIndex + 1));
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const idx = Number(dot.dataset.index);
      if (!Number.isNaN(idx)) updateSlider(idx);
    });
  });

  updateSlider(0);
});