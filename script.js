// =====================================
// INPAR PORTFOLIO
// GSAP + LENIS CINEMATIC SCROLL
// =====================================


document.addEventListener("DOMContentLoaded",()=>{


// =====================================
// LENIS SMOOTH SCROLL
// =====================================

const lenis = new Lenis({
    duration:1.4,
    smoothWheel:true,
    smoothTouch:false
});


gsap.registerPlugin(ScrollTrigger);


lenis.on(
    "scroll",
    ScrollTrigger.update
);


gsap.ticker.add((time)=>{

    lenis.raf(time * 1000);

});


gsap.ticker.lagSmoothing(0);

// =====================================
// LOADER
// =====================================


const loader=document.querySelector(".loader");


if(loader){


    window.addEventListener(
    "load",
    ()=>{


        gsap.to(
            loader,
            {
                opacity:0,
                duration:1,
                delay:.4,
                ease:"power4.inOut",

                onComplete(){

                    loader.style.display="none";

                }

            }
        );


    });


}







// =====================================
// HERO IMAGE ZOOM
// =====================================


const heroImage=document.querySelector(
".hero-media img"
);



if(heroImage){


gsap.to(
heroImage,
{

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






// =====================================
// PARALLAX GENERAL IMAGES
// =====================================


const images=document.querySelectorAll(

".editorial-media img,\
.split-media img,\
.gallery-item img,\
.fullscreen img,\
.floating img"

);



images.forEach(img=>{


gsap.to(
img,
{

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


// =====================================
// REVELADO DE TEXTOS
// =====================================


const revealElements=document.querySelectorAll(

".split,\
.hero-overlay span,\
.hero-overlay p,\
.editorial-content span,\
.editorial-content h2,\
.editorial-content p,\
.split-content span,\
.split-content h2,\
.split-content p"

);



revealElements.forEach(el=>{


gsap.from(
el,
{

y:90,

opacity:0,

duration:1.2,

ease:"power4.out",

scrollTrigger:{

trigger:el,

start:"top 85%",

toggleActions:"play none none reverse"

}

}

);


});






// =====================================
// FADE CINEMÁTICO DE SECCIONES
// =====================================


document.querySelectorAll(".panel")
.forEach(section=>{


gsap.fromTo(
section,
{

opacity:.65

},
{

opacity:1,


scrollTrigger:{

trigger:section,

start:"top 80%",

end:"top 30%",

scrub:true

}


});


});







// =====================================
// FULLSCREEN + VIDEO SCALE
// =====================================


document.querySelectorAll(
".fullscreen,.video-section"
)
.forEach(section=>{


const media=
section.querySelector("img,video");



if(!media)return;



gsap.fromTo(
media,
{

scale:1.15

},
{

scale:1,

ease:"none",


scrollTrigger:{

trigger:section,

start:"top bottom",

end:"bottom top",

scrub:true

}

}

);



});








// =====================================
// GALERÍA FLOTANTE PARALLAX
// =====================================


const floatingItems=
document.querySelectorAll(".floating");



floatingItems.forEach(
(item,index)=>{


gsap.to(
item,
{


y:index%2===0 ? 140 : -140,


rotate:index%2===0 ? 4 : -4,


ease:"none",


scrollTrigger:{

trigger:".floating-gallery",

start:"top bottom",

end:"bottom top",

scrub:true

}


});


});







// =====================================
// CAMBIO DE COLOR DE FONDO
// =====================================


const backgrounds=[


"#7655d3",

"#9a8ae4",

"#111111",

"#e8e1d8",

"#ffe5b1"

];




document.querySelectorAll(".panel")
.forEach((section,index)=>{


ScrollTrigger.create({

trigger:section,


start:"top center",


end:"bottom center",



onEnter(){


gsap.to(
".bg-layer",
{

backgroundColor:
backgrounds[index % backgrounds.length],

duration:.8,

ease:"power2.out"

}

);


},




onEnterBack(){


gsap.to(
".bg-layer",
{

backgroundColor:
backgrounds[index % backgrounds.length],

duration:.8,

ease:"power2.out"

}

);


}



});



});









// =====================================
// PIN CINEMÁTICO
// (tipo Magnolia Magazine)
// =====================================



document.querySelectorAll(

".editorial,\
.split-section"

)

.forEach(section=>{


ScrollTrigger.create({

trigger:section,


start:"top top",


end:"+=120%",


pin:true,


pinSpacing:true



});



});







// =====================================
// ESCALA DE FRASES GRANDES
// =====================================



gsap.utils.toArray(

".quote p,\
.manifest h2"

)

.forEach(text=>{


gsap.from(

text,

{

scale:.75,

opacity:0,


ease:"power3.out",



scrollTrigger:{

trigger:text,


start:"top 80%",


end:"top 35%",


scrub:true



}


}

);



});









// =====================================
// ENTRADA CASCADA GALERÍA
// =====================================



gsap.utils.toArray(
".gallery-item"
)
.forEach(
(item,index)=>{


gsap.from(

item,

{


y:120,

opacity:0,


duration:1,


delay:index*.15,

ease:"power3.out",



scrollTrigger:{


trigger:item,


start:"top 85%",


toggleActions:
"play none none reverse"



}


}

);


});









// =====================================
// CLIP PATH CINEMÁTICO
// =====================================



document.querySelectorAll(

".editorial-media,\
.split-media,\
.hero-media,\
.fullscreen,\
.video-section"

)

.forEach(container=>{


const media =
container.querySelector("img,video");



if(!media)return;



gsap.fromTo(

container,

{


clipPath:
"inset(15% 15% 15% 15%)"


},

{


clipPath:
"inset(0% 0% 0% 0%)",


ease:"power3.out",



scrollTrigger:{


trigger:container,


start:"top 80%",


end:"top 25%",


scrub:true



}



}

);



});








// =====================================
// REVELADO DE TARJETAS
// =====================================


document.querySelectorAll(

".gallery-item,\
.floating"

)

.forEach(item=>{


gsap.fromTo(

item,

{


clipPath:
"inset(100% 0 0 0)"

},


{


clipPath:
"inset(0% 0 0 0)",


duration:1.2,


ease:"power4.out",



scrollTrigger:{


trigger:item,


start:"top 85%",


toggleActions:
"play none none reverse"



}



}

);



});


// =====================================
// NAVEGACIÓN SUAVE LENIS
// =====================================


const navLinks=document.querySelectorAll(
".nav a, .logo"
);



navLinks.forEach(link=>{


link.addEventListener(
"click",
(e)=>{


const href=
link.getAttribute("href");



if(!href || !href.startsWith("#")) return;



const target=
document.querySelector(href);



if(target){


e.preventDefault();



lenis.scrollTo(
target,
{

offset:-90,

duration:1.5,

ease:
(t)=>1-Math.pow(1-t,4)

}

);


}



});



});








// =====================================
// HEADER AUTO HIDE / SHOW
// =====================================



const header=
document.querySelector(".header");



let lastScroll=0;



if(header){


ScrollTrigger.create({

start:"top top",


end:99999,


onUpdate(self){


const current=
self.scroll();



if(current > lastScroll && current>150){


gsap.to(
header,
{

y:-120,

duration:.5,

ease:"power3.out"

}

);


}else{


gsap.to(
header,
{

y:0,

duration:.5,

ease:"power3.out"

}

);



}



lastScroll=current;



}


});



}









// =====================================
// CONTACTO CAMBIO DE TEMA
// =====================================



const contact=
document.querySelector(".contact");



const body=
document.body;



if(contact){



ScrollTrigger.create({

trigger:contact,


start:"top center",



onEnter(){


body.classList.add(
"light-mode"
);



},



onLeaveBack(){


body.classList.remove(
"light-mode"
);



}



});



}









// =====================================
// REFRESH GSAP
// =====================================



window.addEventListener(
"load",
()=>{


setTimeout(()=>{


ScrollTrigger.refresh();


},500);



});



window.addEventListener(
"resize",
()=>{


ScrollTrigger.refresh();



});










// =====================================
// ENTRADA HERO INPAR
// =====================================



const heroTitle=
document.querySelector(
".hero-overlay h1"
);



const heroMeta=
document.querySelectorAll(
".hero-overlay span,\
.hero-overlay p"
);



if(heroTitle){



gsap.set(
heroTitle,
{

y:120,

opacity:0

}

);



gsap.to(
heroTitle,
{

y:0,


opacity:1,


duration:1.8,


delay:.6,


ease:"power4.out"



}

);



}



if(heroMeta.length){



gsap.from(
heroMeta,
{

y:40,

opacity:0,


stagger:.15,


duration:1,


delay:.8,


ease:"power3.out"



}

);



}









// =====================================
// LIMPIEZA FINAL SCROLLTRIGGER
// =====================================


ScrollTrigger.refresh();




});

//=====================================
// ARTE HORIZONTAL
//=====================================

const arteTrack=document.querySelector(".arte-track");

if(arteTrack){

gsap.to(arteTrack,{
x:()=>-(arteTrack.scrollWidth-window.innerWidth+160),
ease:"none",
scrollTrigger:{
trigger:"#arte",
start:"top top",
end:()=>"+="+arteTrack.scrollWidth,
pin:".arte-pin",
scrub:1,
invalidateOnRefresh:true
}
});

gsap.utils.toArray(".arte-item").forEach(item=>{

ScrollTrigger.create({
trigger:item,
containerAnimation:gsap.getTweensOf(arteTrack)[0],
start:"left center",
end:"right center",
toggleClass:{targets:item,className:"active"}
});

});

}