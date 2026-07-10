/*========== DISEÑO HORIZONTAL SCROLL ==========*/

document.addEventListener("DOMContentLoaded",()=>{

gsap.registerPlugin(ScrollTrigger);


const section=document.querySelector(".diseno-panel");
const track=document.querySelector(".diseno-track");

if(!section||!track)return;


function horizontalScroll(){

const distance=track.scrollWidth-window.innerWidth;


gsap.to(track,{

x:-distance,

ease:"none",

scrollTrigger:{

trigger:section,

start:"top top",

end:()=>"+="+distance,

pin:true,

scrub:1,

invalidateOnRefresh:true

}

});

}


horizontalScroll();


window.addEventListener("resize",()=>{

ScrollTrigger.refresh();

});


});