// 1. Initialize Lenis Smooth Scroll cleanly
const lenis = new Lenis({
  duration: 1.4,
  smoothWheel: true,
  smoothTouch: false
});

// Sync ScrollTrigger cleanly using a single unified GSAP Ticker link
gsap.registerPlugin(ScrollTrigger);
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

const cubes=document.getElementById("cubes");
const cursor=document.querySelector(".cursor");

const GRID=24;
const cubeMap=new Map();

let mouseX=0;
let mouseY=0;

function snap(v){
return Math.floor(v/GRID)*GRID;
}

function addCube(x,y){

const key=`${x},${y}`;

if(cubeMap.has(key))return;

const cube=document.createElement("div");

cube.className="cube";
cube.style.left=x+"px";
cube.style.top=y+"px";

cubes.appendChild(cube);

cubeMap.set(key,cube);

setTimeout(()=>{

cube.classList.add("is-dying");

setTimeout(()=>{
cube.remove();
cubeMap.delete(key);
},350);

},1000);

}

window.addEventListener("mousemove",e=>{

mouseX=e.clientX;
mouseY=e.clientY;

gsap.to(cursor,{
x:mouseX,
y:mouseY,
duration:.2
});

addCube(
snap(mouseX),
snap(mouseY)
);

});
  // Variables for tracking 3D rotation angles
  let rotateX = 45;
  let rotateY = 45;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Direct movement calculation: Add velocity-driven tumble rotation when mouse moves
    rotateX += e.movementY * 0.25;
    rotateY += e.movementX * 0.25;
  });

  // High performance custom ticker addition for continuous rendering
  gsap.ticker.add(() => {
    // Linear interpolation loop (Lerp) to smoothly glide toward the mouse pointer position
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;

// 3. Page Loading Screen Animation Setup
const loader = document.querySelector(".loader");
if (loader) {
  window.addEventListener("load", () => {
    gsap.to(loader, {
      opacity: 0,
      duration: 1,
      delay: .5,
      ease: "power3.inOut",
      onComplete: () => {
        loader.style.display = "none";
      }
    });
  });
}

// 4. Hero Section Visual Scale Anim
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

// 5. Global Image Parallax Scaling System
document.querySelectorAll(".editorial-media img,.split-media img,.gallery-item img,.fullscreen img,.floating img").forEach(img => {
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

// 6. Section Typography Reveal Transitions
document.querySelectorAll(".split,.hero-overlay span,.hero-overlay p,.editorial-content span,.editorial-content h2,.editorial-content p,.split-content span,.split-content h2,.split-content p").forEach(el => {
  gsap.from(el, {
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

// 7. General Section Opacity Blend Triggers
document.querySelectorAll(".panel").forEach(section => {
  gsap.fromTo(section, {
    opacity: .6
  }, {
    opacity: 1,
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "top 30%",
      scrub: true
    }
  });
});

// 8. Media Scaling for Fullscreen and Video Layout elements
document.querySelectorAll(".fullscreen,.video-section").forEach(section => {
  const media = section.querySelector("img,video");
  if (media) {
    gsap.fromTo(media, {
      scale: 1.15
    }, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }
});

// 9. Floating Portfolio Gallery Offset Transforms
const floatingItems = document.querySelectorAll(".floating");
floatingItems.forEach((item, index) => {
  gsap.to(item, {
    y: index % 2 === 0 ? 120 : -120,
    rotate: index % 2 === 0 ? 3 : -3,
    ease: "none",
    scrollTrigger: {
      trigger: ".floating-gallery",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
});

// 10. Dynamic Portfolio Section Color Palette Engine
const backgrounds = [
  "#f7f5f1",
  "#ffffff",
  "#111111",
  "#e8e1d8",
  "#f7f5f1"
];

document.querySelectorAll(".panel").forEach((section, index) => {
  ScrollTrigger.create({
    trigger: section,
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      gsap.to(".bg-layer", {
        backgroundColor: backgrounds[index % backgrounds.length],
        duration: .8,
        ease: "power2.out"
      });
    },
    onEnterBack: () => {
      gsap.to(".bg-layer", {
        backgroundColor: backgrounds[index % backgrounds.length],
        duration: .8,
        ease: "power2.out"
      });
    }
  });
});

// 11. Component Content Section Layout Pinning
const sections = document.querySelectorAll(".chapter,.editorial,.split-section");
sections.forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: "top top",
    end: "+=200%",
    pin: true,
    pinSpacing: true
  });
});

// 12. Typographic Text Scaling Micro-interactions
gsap.utils.toArray(".quote p,.manifest h2").forEach(text => {
  gsap.from(text, {
    scale: .8,
    opacity: 0,
    duration: 1.5,
    scrollTrigger: {
      trigger: text,
      start: "top 75%",
      end: "top 30%",
      scrub: true
    }
  });
});

// 13. Grid Items Cascading Fade Animation
gsap.utils.toArray(".gallery-item").forEach((item, i) => {
  gsap.from(item, {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: i * .15,
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

// 14. Smooth Inset Cinematic ClipPath Masks
document.querySelectorAll(".editorial-media,.split-media,.hero-media,.fullscreen,.video-section").forEach(container => {
  const image = container.querySelector("img,video");
  if (!image) return;
  gsap.fromTo(container, {
    clipPath: "inset(12% 12% 12% 12%)"
  }, {
    clipPath: "inset(0% 0% 0% 0%)",
    ease: "power3.out",
    scrollTrigger: {
      trigger: container,
      start: "top 75%",
      end: "top 25%",
      scrub: true
    }
  });
});

document.querySelectorAll(".gallery-item,.floating").forEach(item => {
  gsap.fromTo(item, {
    clipPath: "inset(100% 0 0 0)"
  }, {
    clipPath: "inset(0% 0 0 0)",
    duration: 1.2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: item,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

// 15. Smooth Internal Header Anchor Links Navigation
const navLinks = document.querySelectorAll(".nav a");
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, {
        offset: -80,
        duration: 1.5
      });
    }
  });
});

// 16. Smart Auto-Hiding Interactive Header Layout System
const header = document.querySelector(".header");
ScrollTrigger.create({
  start: "top -100",
  onUpdate: self => {
    if (self.direction === -1) {
      gsap.to(header, { y: 0, duration: .4 });
    } else {
      gsap.to(header, { y: -100, duration: .4 });
    }
  }
});

// 17. Section Text Stagger Reveal Sequence Configuration
const sectionsReveal = document.querySelectorAll(".statement,.manifest,.contact");
sectionsReveal.forEach(section => {
  const elements = section.querySelectorAll("h2,p,a,span");
  gsap.from(elements, {
    y: 60,
    opacity: 0,
    stagger: .08,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: section,
      start: "top 70%",
      toggleActions: "play none none reverse"
    }
  });
});

// 18. Contact Footer Viewport Theme Contrast Modifiers
const body = document.body;
ScrollTrigger.create({
  trigger: ".contact",
  start: "top center",
  onEnter: () => {
    body.classList.add("light-mode");
  },
  onLeaveBack: () => {
    body.classList.remove("light-mode");
  }
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

// 19. Hero H1 Split Entry Staging Timeline initialization
document.addEventListener("DOMContentLoaded", () => {
  gsap.set(".hero-overlay h1", {
    y: 100,
    opacity: 0
  });
  gsap.to(".hero-overlay h1", {
    y: 0,
    opacity: 1,
    duration: 1.8,
    delay: .8,
    ease: "power4.out"
  });
});
