/*========== SCROLL GSAP ==========*/

document.addEventListener("DOMContentLoaded",()=>{

gsap.registerPlugin(ScrollTrigger);


const panels=gsap.utils.toArray(".panel");


panels.forEach((panel,i)=>{

gsap.set(panel,{zIndex:i+1});


if(i<panels.length-1){

ScrollTrigger.create({

trigger:panel,
start:"top top",
end:"bottom top",
pin:true,
pinSpacing:false,
scrub:true,
anticipatePin:1

});

}



const text=panel.querySelector(".texto-lado");
const images=panel.querySelectorAll(".marco-foto");


if(text){

gsap.from(text,{

y:80,
opacity:0,
duration:1,
ease:"power3.out",

scrollTrigger:{
trigger:panel,
start:"top 70%",
toggleActions:"play none none reverse"
}

});

}



if(images.length){

gsap.from(images,{

y:120,
opacity:0,
scale:.9,
stagger:.15,
duration:1,
ease:"power3.out",

scrollTrigger:{
trigger:panel,
start:"top 65%",
toggleActions:"play none none reverse"
}

});

}



gsap.to(images,{

yPercent:-12,
ease:"none",

scrollTrigger:{
trigger:panel,
start:"top bottom",
end:"bottom top",
scrub:true
}

});


});


});