const lenis=new Lenis({
duration:1.4,
smoothWheel:true,
smoothTouch:false
});

gsap.registerPlugin(ScrollTrigger);

lenis.on("scroll",ScrollTrigger.update);

gsap.ticker.add(time=>{
lenis.raf(time*1000);
});

gsap.ticker.lagSmoothing(0);


// CURSOR CUBOS

const cubes=document.getElementById("cubes");
const cursor=document.querySelector(".cursor");

const GRID=24;
const cubeMap=new Map();

function snap(v){
return Math.floor(v/GRID)*GRID;
}

function addCube(x,y){

if(!cubes)return;

const key=`${x},${y}`;

if(cubeMap.has(key))return;

const cube=document.createElement("div");

cube.className="cube";
cube.style.left=x+"px";
cube.style.top=y+"px";

cubes.appendChild(cube);

cubeMap.set(key,cube);

setTimeout(()=>{

cube.style.opacity=0;
cube.style.transform="scale(.85)";

setTimeout(()=>{
cube.remove();
cubeMap.delete(key);
},350);

},900);

}

window.addEventListener("mousemove",e=>{

if(cursor){

gsap.to(cursor,{
x:e.clientX,
y:e.clientY,
duration:.2,
ease:"power3.out"
});

}

addCube(
snap(e.clientX),
snap(e.clientY)
);

});


// LOADER

const loader=document.querySelector(".loader");

if(loader){

window.addEventListener("load",()=>{

gsap.to(loader,{
opacity:0,
duration:1,
delay:.5,
ease:"power3.inOut",
onComplete:()=>{
loader.style.display="none";
}
});

});

}


// HERO SCALE

const heroImage=document.querySelector(".hero-media img");

if(heroImage){

gsap.to(heroImage,{
scale:1,
ease:"none",
scrollTrigger:{
trigger:".hero",
start:"top top",
end:"bottom top",
scrub:true
}
});

}


// PARALLAX IMÁGENES

document.querySelectorAll(
".editorial-media img,.split-media img,.gallery-item img,.fullscreen img,.floating img"
).forEach(img=>{

gsap.to(img,{
scale:1,
ease:"none",
scrollTrigger:{
trigger:img,
start:"top bottom",
end:"bottom top",
scrub:true
}
});

});


// REVELADO TIPOGRAFÍA

document.querySelectorAll(
".split,.hero-overlay span,.hero-overlay p,.editorial-content span,.editorial-content h2,.editorial-content p,.split-content span,.split-content h2,.split-content p"
).forEach(el=>{

gsap.from(el,{
y:80,
opacity:0,
duration:1.2,
ease:"power4.out",
scrollTrigger:{
trigger:el,
start:"top 80%",
toggleActions:"play none none reverse"
}
});

});

document.querySelectorAll(".panel").forEach(section=>{

gsap.fromTo(section,{
opacity:.6
},{
opacity:1,
scrollTrigger:{
trigger:section,
start:"top 80%",
end:"top 30%",
scrub:true
}
});

});


// FULLSCREEN + VIDEO

document.querySelectorAll(".fullscreen,.video-section").forEach(section=>{

const media=section.querySelector("img,video");

if(media){

gsap.fromTo(media,{
scale:1.15
},{
scale:1,
ease:"none",
scrollTrigger:{
trigger:section,
start:"top bottom",
end:"bottom top",
scrub:true
}
});

}

});


// GALERÍA FLOTANTE

document.querySelectorAll(".floating").forEach((item,index)=>{

gsap.to(item,{
y:index%2===0?120:-120,
rotate:index%2===0?3:-3,
ease:"none",
scrollTrigger:{
trigger:".floating-gallery",
start:"top bottom",
end:"bottom top",
scrub:true
}
});

});


// CAMBIO DE FONDO POR SECCIONES

const backgrounds=[
"#7655d3",
"#9a8ae4",
"#111111",
"#e8e1d8",
"#ffe5b1"
];

document.querySelectorAll(".panel").forEach((section,index)=>{

ScrollTrigger.create({

trigger:section,

start:"top center",

end:"bottom center",

onEnter:()=>{

gsap.to(".bg-layer",{
backgroundColor:backgrounds[index%backgrounds.length],
duration:.8,
ease:"power2.out"
});

},

onEnterBack:()=>{

gsap.to(".bg-layer",{
backgroundColor:backgrounds[index%backgrounds.length],
duration:.8,
ease:"power2.out"
});

}

});

});


// PIN SECCIONES

document.querySelectorAll(
".editorial,.split-section"
).forEach(section=>{

ScrollTrigger.create({

trigger:section,

start:"top top",

end:"+=150%",

pin:true,

pinSpacing:true

});

});


// ESCALA TEXTOS GRANDES

gsap.utils.toArray(
".quote p,.manifest h2"
).forEach(text=>{

gsap.from(text,{

scale:.8,

opacity:0,

duration:1.5,

scrollTrigger:{

trigger:text,

start:"top 75%",

end:"top 30%",

scrub:true

}

});

});


// ENTRADA GALERÍA

gsap.utils.toArray(".gallery-item").forEach((item,i)=>{

gsap.from(item,{

y:100,

opacity:0,

duration:1,

delay:i*.15,

scrollTrigger:{

trigger:item,

start:"top 85%",

toggleActions:"play none none reverse"

}

});

});


// CLIP PATH EDITORIAL

document.querySelectorAll(
".editorial-media,.split-media,.hero-media,.fullscreen,.video-section"
).forEach(container=>{

const media=container.querySelector("img,video");

if(!media)return;

gsap.fromTo(container,{

clipPath:"inset(12% 12% 12% 12%)"

},{

clipPath:"inset(0% 0% 0% 0%)",

ease:"power3.out",

scrollTrigger:{

trigger:container,

start:"top 75%",

end:"top 25%",

scrub:true

}

});

});
document.querySelectorAll(".gallery-item,.floating").forEach(item=>{

gsap.fromTo(item,{

clipPath:"inset(100% 0 0 0)"

},{

clipPath:"inset(0% 0 0 0)",

duration:1.2,

ease:"power4.out",

scrollTrigger:{

trigger:item,

start:"top 85%",

toggleActions:"play none none reverse"

}

});

});


// NAVEGACIÓN LENIS

const navLinks=document.querySelectorAll(".nav a");

navLinks.forEach(link=>{

link.addEventListener("click",e=>{

const target=document.querySelector(
link.getAttribute("href")
);

if(target){

e.preventDefault();

lenis.scrollTo(target,{
offset:-80,
duration:1.5
});

}

});

});


// HEADER OCULTAR / MOSTRAR

const header=document.querySelector(".header");

if(header){

ScrollTrigger.create({

start:"top -100",

onUpdate:self=>{

if(self.direction===-1){

gsap.to(header,{
y:0,
duration:.4,
ease:"power3.out"
});

}else{

gsap.to(header,{
y:-100,
duration:.4,
ease:"power3.out"
});

}

}

});

}


// REVELADO SECCIONES IMPORTANTES

document.querySelectorAll(
".statement,.manifest,.contact"
).forEach(section=>{

const elements=section.querySelectorAll(
"h2,p,a,span"
);

gsap.from(elements,{

y:60,

opacity:0,

stagger:.08,

duration:1,

ease:"power3.out",

scrollTrigger:{

trigger:section,

start:"top 70%",

toggleActions:"play none none reverse"

}

});

});


// CONTACTO CAMBIO DE CONTRASTE

const body=document.body;

const contact=document.querySelector(".contact");

if(contact){

ScrollTrigger.create({

trigger:contact,

start:"top center",

onEnter:()=>{

body.classList.add("light-mode");

},

onLeaveBack:()=>{

body.classList.remove("light-mode");

}

});

}


// REFRESH

window.addEventListener("load",()=>{

ScrollTrigger.refresh();

});

window.addEventListener("resize",()=>{

ScrollTrigger.refresh();

});


// HERO ENTRADA

document.addEventListener("DOMContentLoaded",()=>{

const title=document.querySelector(
".hero-overlay h1"
);

if(title){

gsap.set(title,{
y:100,
opacity:0
});


gsap.to(title,{

y:0,

opacity:1,

duration:1.8,

delay:.8,

ease:"power4.out"

});

}

});
