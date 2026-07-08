// ==========================================================
// INPAR PORTFOLIO
// GSAP + LENIS
// ==========================================================

gsap.registerPlugin(ScrollTrigger);

// ==========================================================
// LENIS
// ==========================================================

const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false
});


lenis.on("scroll", ScrollTrigger.update);

// sincronizar GSAP

gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ==========================================================
// HERO
// ==========================================================

const hero = gsap.timeline({

    scrollTrigger:{

        trigger:".hero",

        start:"top top",

        end:"bottom top",

        scrub:true

    }

});

hero

.to(".hero-title",{

    y:-220,

    opacity:0,

    scale:.9,

    ease:"none"

},0)

.to(".hero-subtitle",{

    y:-80,

    opacity:0,

    ease:"none"

},0);

// ==========================================================
// MENÚ (Optimizado para evitar Glitches con Pins)
// ==========================================================

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute("href");
        const targetScene = document.querySelector(targetId);
        
        if (targetScene) {
            // Buscamos el objeto ScrollTrigger global asignado a esa escena
            const st = ScrollTrigger.getAll().find(trigger => trigger.trigger === targetScene);
            
            if (st) {
                // Si el trigger ya calculó la posición del pin, Lenis viaja directo allí
                lenis.scrollTo(st.start, {
                    duration: 1.5,
                    force: true, // Fuerza a Lenis a saltarse el cálculo nativo
                    immediate: false
                });
            } else {
                // Respaldo alternativo por si no ha cargado ScrollTrigger
                lenis.scrollTo(targetScene, {
                    duration: 1.5
                });
            }
        }
    });
});


// ==========================================================
// PIN GENERAL
// ==========================================================

const scenes = gsap.utils.toArray(".scene");

scenes.forEach(scene=>{

    ScrollTrigger.create({

        trigger:scene,

        start:"top top",

        end:"bottom+=200% top",

        pin:scene.querySelector(".scene-inner"),

        pinSpacing:true,

        anticipatePin:1

    });

});

// ==========================================================
// PARALLAX DE TODAS LAS CAPAS
// ==========================================================

document.querySelectorAll(".layer").forEach((layer,index)=>{

    gsap.fromTo(

        layer,

        {

            scale:1,

            yPercent:0

        },

        {

            scale:1.15,

            yPercent:-(8+index*3),

            ease:"none",

            scrollTrigger:{

                trigger:layer.closest(".scene"),

                start:"top bottom",

                end:"bottom top",

                scrub:true

            }

        }

    );

});

// ==========================================================
// TITULARES
// ==========================================================

document.querySelectorAll(".scene-content").forEach(content=>{

    gsap.from(content.querySelector("h2"),{

        y:80,

        opacity:0,

        duration:1,

        scrollTrigger:{

            trigger:content,

            start:"top 80%"

        }

    });

});

// ==========================================================
// ARTE (Desplazamiento Lateral Rápido)
// ==========================================================

const arte = document.querySelector("#arte");

if (arte) {
    const leftDoor = arte.querySelector(".panel-left");
    const rightDoor = arte.querySelector(".panel-right");
    const background = arte.querySelector(".layer");
    const captions = arte.querySelectorAll(".caption");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: arte,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5 // Mantiene la respuesta rápida al interactuar
        }
    });

    // 1. Imagen de fondo fija/escala
    tl.fromTo(background,
        { scale: 1, opacity: 0.6 },
        { scale: 1.12, opacity: 1, ease: "none" },
        0
    );

    // 2. Desplazamiento lateral plano y veloz (Hacia los lados opuestos)
    tl.to(leftDoor, {
        xPercent: -100,      // Se desliza completamente hacia la izquierda fuera de la pantalla
        opacity: 0,          // Desvanecimiento sutil para mayor suavidad visual
        duration: 0.25,      // Duración corta para que despeje rápido el centro
        ease: "power2.inOut"
    }, 0);

    tl.to(rightDoor, {
        xPercent: 100,       // Se desliza completamente hacia la derecha fuera de la pantalla
        opacity: 0,
        duration: 0.25,
        ease: "power2.inOut"
    }, 0);

    // 3. Zoom coordinado en las imágenes de los paneles mientras se deslizan
    tl.to(".panel img", {
        scale: 1.12,
        ease: "none",
        duration: 0.25
    }, 0);

    // 4. Textos secuenciales (Empiezan justo después de que las imágenes salieron de pantalla)
    if (captions[0]) {
        gsap.fromTo(captions[0],
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                scrollTrigger: {
                    trigger: arte,
                    start: "30% center", // Espera al 30% del scroll para mostrar el primer texto
                    end: "45% center",
                    scrub: true
                }
            }
        );
    }

    if (captions[1]) {
        gsap.fromTo(captions[1],
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                scrollTrigger: {
                    trigger: arte,
                    start: "50% center",
                    end: "65% center",
                    scrub: true
                }
            }
        );
    }

    if (captions[2]) {
        gsap.fromTo(captions[2],
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                scrollTrigger: {
                    trigger: arte,
                    start: "70% center",
                    end: "85% center",
                    scrub: true
                }
            }
        );
    }
}

    // --------------------------
    // Imagen del fondo
    // --------------------------

    tl.fromTo(

        background,

        {

            scale:1,
            opacity:.8

        },

        {

            scale:1.18,
            opacity:1,
            ease:"none"

        },

        0

    );

    // --------------------------
    // Apertura puertas
    // --------------------------

    tl.to(

        leftDoor,

        {

            rotateY:-95,
            xPercent:-8,
            ease:"power2.inOut"

        },

        .15

    );

    tl.to(

        rightDoor,

        {

            rotateY:95,
            xPercent:8,
            ease:"power2.inOut"

        },

        .15

    );

    // --------------------------
    // Zoom imágenes puertas
    // --------------------------

    gsap.to(".panel img",{

        scale:1.15,

        ease:"none",

        scrollTrigger:{

            trigger:arte,

            start:"top top",

            end:"bottom bottom",

            scrub:true

        }

    });

    // --------------------------
    // Texto 1
    // --------------------------

    if(captions[0]){

        gsap.fromTo(

            captions[0],

            {

                opacity:0,
                y:80

            },

            {

                opacity:1,
                y:0,

                scrollTrigger:{

                    trigger:arte,

                    start:"10% center",

                    end:"25% center",

                    scrub:true

                }

            }

        );

    }

    // --------------------------
    // Texto 2
    // --------------------------

    if(captions[1]){

        gsap.fromTo(

            captions[1],

            {

                opacity:0,
                y:80

            },

            {

                opacity:1,
                y:0,

                scrollTrigger:{

                    trigger:arte,

                    start:"35% center",

                    end:"55% center",

                    scrub:true

                }

            }

        );

    }

    // --------------------------
    // Texto 3
    // --------------------------

    if(captions[2]){

        gsap.fromTo(

            captions[2],

            {

                opacity:0,
                y:80

            },

            {

                opacity:1,
                y:0,

                scrollTrigger:{

                    trigger:arte,

                    start:"65% center",

                    end:"85% center",

                    scrub:true

                }

            }

        );

    }

// ==========================================================
// ESCENAS GENERALES
// Multimedia / Diseño / Música
// ==========================================================

["#multimedia", "#diseno", "#musica"].forEach((id) => {

    const scene = document.querySelector(id);

    if (!scene) return;

    const layers = scene.querySelectorAll(".layer");
    const captions = scene.querySelectorAll(".caption");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: scene,
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });

    // -----------------------
    // IMAGEN 1
    // -----------------------

    if (layers[0]) {

        tl.fromTo(
            layers[0],
            {
                opacity: 1,
                scale: 1
            },
            {
                opacity: 1,
                scale: 1.12,
                ease: "none"
            },
            0
        );

    }

    // -----------------------
    // IMAGEN 2
    // -----------------------

    if (layers[1]) {

        tl.fromTo(
            layers[1],
            {
                opacity: 0,
                scale: 1.05
            },
            {
                opacity: 1,
                scale: 1.15,
                ease: "none"
            },
            0.35
        );

    }

    // -----------------------
    // IMAGEN 3
    // -----------------------

    if (layers[2]) {

        tl.fromTo(
            layers[2],
            {
                opacity: 0,
                scale: 1.05
            },
            {
                opacity: 1,
                scale: 1.18,
                ease: "none"
            },
            0.7
        );

    }

    // -----------------------
    // TEXTOS
    // -----------------------
    // -----------------------
    // TEXTOS (Cierre correcto del bucle que se encontraba cortado)
    // -----------------------
    captions.forEach((caption, i) => {
        gsap.fromTo(
            caption,
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                    trigger: scene,
                    // Divide el scroll de la sección equitativamente para activar cada texto
                    start: `${(i * 30) + 10}% center`,
                    end: `${((i + 1) * 30) + 10}% center`,
                    scrub: true
                }
            }
        );
    });
}); // Cierre de forEach de escenas

// ==========================================================
// CURSOR CUBOS
// ==========================================================

const cubes = document.getElementById("cubes");

if (cubes) {

    const GRID = 24;
    const LIFE = 700;
    const FADE = 300;

    const map = new Map();

    const snap = (v) => Math.floor(v / GRID) * GRID;

    window.addEventListener("mousemove", (e) => {

        const x = snap(e.clientX);
        const y = snap(e.clientY);
        const key = `${x},${y}`;

        if (map.has(key)) return;

        const cube = document.createElement("div");

        cube.className = "cube";
        cube.style.left = `${x}px`;
        cube.style.top = `${y}px`;

        cubes.appendChild(cube);
        map.set(key, cube);

        setTimeout(() => {

            cube.classList.add("is-dying");

            setTimeout(() => {

                cube.remove();
                map.delete(key);

            }, FADE);

        }, LIFE);

    });

}
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});