// =====================================
// INPAR PORTFOLIO - GSAP + LENIS CINEMATIC SCROLL
// =====================================

document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // INIT LENIS SMOOTH SCROLL
  // ==============================
  const lenis = new Lenis({
    duration: 1.4,
    smoothWheel: true,
    smoothTouch: false
  });

  // Register GSAP's ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Sync Lenis with ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // ==============================
  // LOADER ANIMATION
  // ==============================
  const loader = document.querySelector(".loader");
  if (loader) {
    window.addEventListener("load", () => {
      gsap.to(loader, {
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power4.inOut",
        onComplete: () => {
          loader.style.display = "none";
        }
      });
    });
  }

  // ==============================
  // HERO IMAGE ZOOM
  // ==============================
  const heroImage = document.querySelector(".hero-media img");
  if (heroImage) {
    gsap.to(heroImage, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // ==============================
  // PARALLAX FOR IMAGES
  // ==============================
  const images = document.querySelectorAll(
    ".editorial-media img, .split-media img, .gallery-item img, .fullscreen img, .floating img"
  );
  images.forEach((img) => {
    gsap.to(img, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // ==============================
  // REVEAL TEXT ELEMENTS
  // ==============================
  const revealElements = document.querySelectorAll(
    ".split, .hero-overlay span, .hero-overlay p, .editorial-content span, .editorial-content h2, .editorial-content p, .split-content span, .split-content h2, .split-content p"
  );
  revealElements.forEach((el) => {
    gsap.from(el, {
      y: 90,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // ==============================
  // CINEMATIC FADE IN SECTIONS
  // ==============================
  document.querySelectorAll(".panel").forEach((section) => {
    gsap.fromTo(
      section,
      { opacity: 0.65 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 30%",
          scrub: true
        }
      }
    );
  });

  // ==============================
  // FULLSCREEN AND VIDEO SCALE EFFECT
  // ==============================
  document.querySelectorAll(".fullscreen, .video-section").forEach((section) => {
    const media = section.querySelector("img,video");
    if (!media) return;

    gsap.fromTo(
      media,
      { scale: 1.15 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  });

  // ==============================
  // FLOTATING GALLERY PARALLAX
  // ==============================
  const floatingItems = document.querySelectorAll(".floating");
  floatingItems.forEach((item, index) => {
    gsap.to(item, {
      y: index % 2 === 0 ? 140 : -140,
      rotate: index % 2 === 0 ? 4 : -4,
      ease: "none",
      scrollTrigger: {
        trigger: ".floating-gallery",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // ==============================
  // BACKGROUND COLOR CHANGE
  // ==============================
  const backgrounds = ["#7655d3", "#9a8ae4", "#111111", "#e8e1d8", "#ffe5b1"];
  document.querySelectorAll(".panel").forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter() {
        gsap.to(".bg-layer", {
          backgroundColor: backgrounds[index % backgrounds.length],
          duration: 0.8,
          ease: "power2.out"
        });
      },
      onEnterBack() {
        gsap.to(".bg-layer", {
          backgroundColor: backgrounds[index % backgrounds.length],
          duration: 0.8,
          ease: "power2.out"
        });
      }
    });
  });

  // ==============================
  // PIN SECTIONS (e.g. editorial, split-section)
  // ==============================
  document.querySelectorAll(".editorial, .split-section").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=120%",
      pin: true,
      pinSpacing: true
    });
  });

  // ==============================
  // SCALE BIG QUOTES AND HEADINGS
  // ==============================
  gsap.utils.toArray(".quote p, .manifest h2").forEach((text) => {
    gsap.from(text, {
      scale: 0.75,
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: text,
        start: "top 80%",
        end: "top 35%",
        scrub: true
      }
    });
  });

  // ==============================
  // GALLERY ITEMS ENTRY ANIMATION
  // ==============================
  gsap.utils.toArray(".gallery-item").forEach((item, index) => {
    gsap.from(item, {
      y: 120,
      opacity: 0,
      duration: 1,
      delay: index * 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  // ==============================
  // CLIP PATH CINEMATIC EFFECT
  // ==============================
  document.querySelectorAll(
    ".editorial-media, .split-media, .hero-media, .fullscreen, .video-section"
  ).forEach((container) => {
    const media = container.querySelector("img,video");
    if (!media) return;

    gsap.fromTo(
      container,
      { clipPath: "inset(15% 15% 15% 15%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "top 25%",
          scrub: true
        }
      }
    );
  });

  // ==============================
  // REVEAL CARDS ANIMATION
  // ==============================
  document.querySelectorAll(".gallery-item, .floating").forEach((item) => {
    gsap.fromTo(
      item,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // ==============================
  // SMOOTH NAVIGATION WITH LENIS
  // ==============================
  const navLinks = document.querySelectorAll(".nav a, .logo");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, {
          offset: -90,
          duration: 1.5,
          ease: (t) => 1 - Math.pow(1 - t, 4)
        });
      }
    });
  });

  // ==============================
  // HEADER HIDE/SHOW ON SCROLL
  // ==============================
  const header = document.querySelector(".header");
  let lastScroll = 0;
  if (header) {
    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        const current = self.scroll();
        if (current > lastScroll && current > 150) {
          // Scrolling down
          gsap.to(header, { y: -120, duration: 0.5, ease: "power3.out" });
        } else {
          // Scrolling up
          gsap.to(header, { y: 0, duration: 0.5, ease: "power3.out" });
        }
        lastScroll = current;
      }
    });
  }

  // ==============================
  // CONTACT THEME TOGGLE
  // ==============================
  const contact = document.querySelector(".contact");
  const body = document.body;
  if (contact) {
    ScrollTrigger.create({
      trigger: contact,
      start: "top center",
      onEnter() {
        body.classList.add("light-mode");
      },
      onLeaveBack() {
        body.classList.remove("light-mode");
      }
    });
  }

  // ==============================
  // REFRESH GSAP ON LOAD & RESIZE
  // ==============================
  window.addEventListener("load", () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
  });
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });

  // ==============================
  // ANIMATED HERO HEADER
  // ==============================
  const heroTitle = document.querySelector(".hero-overlay h1");
  const heroMeta = document.querySelectorAll(".hero-overlay span, .hero-overlay p");
  if (heroTitle) {
    gsap.set(heroTitle, { y: 120, opacity: 0 });
    gsap.to(heroTitle, {
      y: 0,
      opacity: 1,
      duration: 1.8,
      delay: 0.6,
      ease: "power4.out"
    });
  }
  if (heroMeta.length) {
    gsap.from(heroMeta, {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      delay: 0.8,
      ease: "power3.out"
    });
  }

  // ==============================
  // TRANSICIONES Y ANIMACIONES PARA IMÁGENES
  // ==============================

  // Agrega transiciones CSS para todas las imágenes
  const imgs = document.querySelectorAll('img');
  imgs.forEach(img => {
    img.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  });

  // Animación de entrada para imágenes en vista
  gsap.utils.toArray('img').forEach((img) => {
    gsap.from(img, {
      opacity: 0,
      scale: 0.95,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: img,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  });

});