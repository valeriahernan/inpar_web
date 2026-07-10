/*========== BLUE CUBES MOUSE EFFECT ==========*/

document.addEventListener("DOMContentLoaded",()=>{


const container=document.querySelector("#cubes");

if(!container)return;


const size=24;
let lastX=0;
let lastY=0;


function createCube(x,y){


const cube=document.createElement("div");

cube.className="cube";


cube.style.left=x+"px";
cube.style.top=y+"px";


container.appendChild(cube);



gsap.fromTo(cube,

{
scale:0,
opacity:0
},

{
scale:1,
opacity:1,
duration:.35,
ease:"power2.out"
}

);



gsap.to(cube,

{
opacity:0,
scale:.8,
duration:1.2,
delay:.5,
ease:"power2.in",

onComplete(){

cube.remove();

}

}

);


}



document.addEventListener("mousemove",(e)=>{


const distance=Math.hypot(
e.clientX-lastX,
e.clientY-lastY
);



if(distance>size){


createCube(
Math.floor(e.clientX/size)*size,
Math.floor(e.clientY/size)*size
);


lastX=e.clientX;
lastY=e.clientY;


}


});


});