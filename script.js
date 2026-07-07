```js
// =========================
// LENIS SMOOTH SCROLL
// =========================

const lenis = new Lenis({
  duration: 1.4,
  smoothWheel: true
});

// Integración Lenis + GSAP
gsap.registerPlugin(ScrollTrigger);

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// =========================
// INTRO
// =========================

gsap.to(".hero-title", {
  y: -250,
  opacity: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".intro",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

gsap.to(".hero-subtitle", {
  y: -100,
  opacity: 0,
  ease: "none",
  scrollTrigger: {
    trigger: ".intro",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// =========================
// SCENES
// =========================

gsap.utils.toArray(".scene").forEach((scene) => {
  const images = scene.querySelectorAll(".layer");
  const captions = scene.querySelectorAll(".caption");

  // Zoom lento de las imágenes
  images.forEach((img) => {
    gsap.to(img, {
      scale: 1.2,
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: scene,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Imagen 2
  if (images[1]) {
    gsap.to(images[1], {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: scene,
        start: "25% center",
        end: "45% center",
        scrub: true
      }
    });
  }

  // Imagen 3
  if (images[2]) {
    gsap.to(images[2], {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: scene,
        start: "55% center",
        end: "75% center",
        scrub: true
      }
    });
  }

  // Texto 1
  if (captions[0]) {
    gsap.fromTo(
      captions[0],
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scene,
          start: "top center",
          end: "25% center",
          scrub: true
        }
      }
    );

    gsap.to(captions[0], {
      opacity: 0,
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: scene,
        start: "30% center",
        end: "45% center",
        scrub: true
      }
    });
  }

  // Texto 2
  if (captions[1]) {
    gsap.fromTo(
      captions[1],
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scene,
          start: "40% center",
          end: "55% center",
          scrub: true
        }
      }
    );

    gsap.to(captions[1], {
      opacity: 0,
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: scene,
        start: "60% center",
        end: "75% center",
        scrub: true
      }
    });
  }

  // Texto 3
  if (captions[2]) {
    gsap.fromTo(
      captions[2],
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scene,
          start: "70% center",
          end: "85% center",
          scrub: true
        }
      }
    );
  }
});

// =========================
// MENÚ SUAVE
// =========================

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = link.getAttribute("href");

    lenis.scrollTo(id, {
      duration: 2
    });
  });
});
```
