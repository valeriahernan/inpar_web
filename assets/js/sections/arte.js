/*========== ARTE SCROLL ==========*/

document.addEventListener("DOMContentLoaded",()=>{

gsap.registerPlugin(ScrollTrigger);


const arte=document.querySelector(".arte-panel");

if(!arte)return;


const images=arte.querySelectorAll(".marco-foto");
const text=arte.querySelector(".texto-lado");



if(text){

gsap.from(text,{

y:80,
opacity:0,

scrollTrigger:{

trigger:arte,
start:"top 70%",
end:"center center",
scrub:1

}

});

}



images.forEach((img,i)=>{

gsap.from(img,{

y:120+(i*40),
opacity:0,
scale:.85,

scrollTrigger:{

trigger:arte,
start:"top 75%",
end:"center center",
scrub:1

}

});



gsap.to(img,{

yPercent:-20-(i*5),

scrollTrigger:{

trigger:arte,
start:"top bottom",
end:"bottom top",
scrub:1

}

});

});


});