/*========== DISEÑO HORIZONTAL ==========*/

document.addEventListener("DOMContentLoaded",()=>{

gsap.registerPlugin(ScrollTrigger);


const section=document.querySelector(".diseno-panel");
const track=document.querySelector(".diseno-track");

if(!section||!track)return;


const getDistance=()=>{

return track.scrollWidth-window.innerWidth;

};



gsap.to(track,{

x:()=>-getDistance(),

ease:"none",

scrollTrigger:{

trigger:section,

start:"top top",

end:()=>"+="+getDistance(),

pin:true,

scrub:1,

invalidateOnRefresh:true

}

});


window.addEventListener("resize",()=>{

ScrollTrigger.refresh();

});


});