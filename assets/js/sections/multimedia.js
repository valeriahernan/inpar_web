/*========== MULTIMEDIA SCROLL ==========*/

document.addEventListener("DOMContentLoaded",()=>{

gsap.registerPlugin(ScrollTrigger);

const multimedia=document.querySelector(".multimedia-panel");

if(!multimedia)return;


const images=multimedia.querySelectorAll(".marco-foto");
const text=multimedia.querySelector(".texto-lado");



if(text){

gsap.from(text,{

x:-100,
opacity:0,

scrollTrigger:{

trigger:multimedia,
start:"top 70%",
end:"center center",
scrub:1

}

});

}



images.forEach((img,i)=>{

gsap.from(img,{

scale:.7,
opacity:0,
y:100,

scrollTrigger:{

trigger:multimedia,
start:"top 75%",
end:"center center",
scrub:1

}

});



gsap.to(img,{

yPercent:-35-(i*10),
scale:1.08,

scrollTrigger:{

trigger:multimedia,
start:"top bottom",
end:"bottom top",
scrub:1

}

});

});



gsap.to(multimedia,{

backgroundPosition:"50% 100%",

scrollTrigger:{

trigger:multimedia,
start:"top bottom",
end:"bottom top",
scrub:1

}

});


});