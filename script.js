// =========================
// GSAP + LENIS
// =========================

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.4,
  smoothWheel: true,
  smoothTouch: false
});

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
  y: -120,
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

gsap.utils.toArray(".scene").forEach((scene, index) => {

  const images = scene.querySelectorAll(".layer");
  const captions = scene.querySelectorAll(".caption");

  // Mantiene la escena fija
  ScrollTrigger.create({
    trigger: scene,
    start: "top top",
    end: "+=250%",
    pin: true,
    scrub: true,
    anticipatePin: 1
  });

  // PARALLAX
  images.forEach((img, i) => {

    gsap.fromTo(
      img,
      {
        scale: 1,
        yPercent: 0
      },
      {
        scale: 1.18,
        yPercent: -(8 + i * 6),
        ease: "none",
        scrollTrigger: {
          trigger: scene,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

  });

  // Imagen inicial

  if(images[0]){
      gsap.set(images[0],{
          opacity:1
      });
  }

  // Imagen 2

  if(images[1]){

      gsap.fromTo(images[1],
      {
          opacity:0
      },
      {
          opacity:1,
          ease:"none",
          scrollTrigger:{
              trigger:scene,
              start:"25% center",
              end:"50% center",
              scrub:true
          }
      });

  }

  // Imagen 3

  if(images[2]){

      gsap.fromTo(images[2],
      {
          opacity:0
      },
      {
          opacity:1,
          ease:"none",
          scrollTrigger:{
              trigger:scene,
              start:"55% center",
              end:"80% center",
              scrub:true
          }
      });

  }

  // =========================
  // TEXTOS
  // =========================

  captions.forEach((caption, i)=>{

      gsap.fromTo(caption,
      {
          opacity:0,
          y:80,
          filter:"blur(12px)"
      },
      {
          opacity:1,
          y:0,
          filter:"blur(0px)",
          ease:"power1.out",
          scrollTrigger:{
              trigger:scene,
              start:`${15 + i*25}% center`,
              end:`${30 + i*25}% center`,
              scrub:true
          }
      });

      if(i<captions.length-1){

          gsap.to(caption,{
              opacity:0,
              y:-80,
              filter:"blur(10px)",
              ease:"none",
              scrollTrigger:{
                  trigger:scene,
                  start:`${30 + i*25}% center`,
                  end:`${45 + i*25}% center`,
                  scrub:true
              }
          });

      }

  });

});

// =========================
// CAMBIO DE COLOR DE FONDO
// =========================

const colors = [
    "#f5efe6",
    "#f7d7cf",
    "#efe5d2",
    "#d8d2c8",
    "#111111"
];

gsap.utils.toArray(".scene").forEach((scene,i)=>{

    gsap.to("body",{

        backgroundColor:colors[i % colors.length],

        duration:1,

        ease:"power1.out",

        scrollTrigger:{
            trigger:scene,
            start:"top center",
            end:"bottom center",
            toggleActions:"play reverse play reverse"
        }

    });

});

// =========================
// MENÚ
// =========================

document.querySelectorAll(".nav-links a").forEach((link)=>{

    link.addEventListener("click",(e)=>{

        e.preventDefault();

        lenis.scrollTo(
            link.getAttribute("href"),
            {
                duration:2
            }
        );

    });

});

// =========================
// CURSOR CUBES
// =========================

const cubesEl = document.getElementById("cubes");

const GRID = 24;
const CUBE_LIFETIME = 800;
const CUBE_FADE_MS = 350;

const cubeMap = new Map();

function snap(v){
    return Math.floor(v/GRID)*GRID;
}

function key(x,y){
    return `${x},${y}`;
}

function addCube(x,y){

    const k = key(x,y);

    if(cubeMap.has(k)) return;

    const cube = document.createElement("div");

    cube.className = "cube";

    cube.style.left = `${x}px`;
    cube.style.top = `${y}px`;

    cubesEl.appendChild(cube);

    cubeMap.set(k,cube);

    setTimeout(()=>{

        if(!cubeMap.has(k)) return;

        cube.classList.add("is-dying");

        setTimeout(()=>{

            cube.remove();
            cubeMap.delete(k);

        },CUBE_FADE_MS);

    },CUBE_LIFETIME);

}

window.addEventListener("mousemove",(e)=>{

    addCube(
        snap(e.clientX),
        snap(e.clientY)
    );

});

// =========================
// REFRESH
// =========================

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});