/*========== MUSICA SCROLL ==========*/

document.addEventListener("DOMContentLoaded",()=>{

gsap.registerPlugin(ScrollTrigger);


const musica=document.querySelector(".musica-panel");

if(!musica)return;


const images=musica.querySelectorAll(".marco-foto");
const text=musica.querySelector(".texto-lado");



if(text){

gsap.from(text,{

y:100,
opacity:0,

scrollTrigger:{

trigger:musica,
start:"top 75%",
end:"center center",
scrub:1

}

});

}



images.forEach((img,i)=>{


gsap.from(img,{

scale:.5,
opacity:0,
rotation:i%2===0?-8:8,

scrollTrigger:{

trigger:musica,
start:"top 70%",
end:"center center",
scrub:1

}

});



gsap.to(img,{

yPercent:-25-(i*8),
rotation:i%2===0?5:-5,

scrollTrigger:{

trigger:musica,
start:"top bottom",
end:"bottom top",
scrub:1

}

});


});



gsap.to(musica,{

backgroundColor:"#111",

scrollTrigger:{

trigger:musica,
start:"top center",
end:"bottom center",
scrub:1

}

});


});