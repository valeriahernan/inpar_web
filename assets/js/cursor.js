/*========== CURSOR ==========*/

document.addEventListener("DOMContentLoaded",()=>{

const cursor=document.querySelector(".cursor");

if(!cursor)return;

let mouseX=0;
let mouseY=0;
let posX=0;
let posY=0;


document.addEventListener("mousemove",e=>{

mouseX=e.clientX;
mouseY=e.clientY;

});


function animate(){

posX+=(mouseX-posX)*.15;
posY+=(mouseY-posY)*.15;

cursor.style.left=posX+"px";
cursor.style.top=posY+"px";

requestAnimationFrame(animate);

}

animate();



document.querySelectorAll("a,button,img").forEach(el=>{

el.addEventListener("mouseenter",()=>{

cursor.classList.add("active");

});


el.addEventListener("mouseleave",()=>{

cursor.classList.remove("active");

});

});


});