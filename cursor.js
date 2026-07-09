const cubes=document.querySelector("#cubes");
const cursor=document.querySelector(".cursor");
const GRID=24;
const cubeMap=new Map();
let mouse={x:window.innerWidth*.5,y:window.innerHeight*.5};
let render={x:mouse.x,y:mouse.y};
const lerp=(a,b,n)=>a+(b-a)*n;
const snap=v=>Math.floor(v/GRID)*GRID;

function createCube(x,y){
const key=`${x},${y}`;
if(cubeMap.has(key))return;
const cube=document.createElement("div");
cube.className="cube";
cube.style.left=x+"px";
cube.style.top=y+"px";
cubes.appendChild(cube);
cubeMap.set(key,cube);
gsap.fromTo(cube,{scale:.25,rotation:-20,opacity:0},{scale:1,rotation:0,opacity:1,duration:.28,ease:"power2.out"});
gsap.to(cube,{delay:.45,scale:.15,rotation:120,opacity:0,duration:.55,ease:"power2.in",onComplete:()=>{cube.remove();cubeMap.delete(key);}});
}

window.addEventListener("mousemove",e=>{
mouse.x=e.clientX;
mouse.y=e.clientY;
const gx=snap(mouse.x);
const gy=snap(mouse.y);
createCube(gx,gy);
});

window.addEventListener("mousedown",()=>cursor.classList.add("active"));
window.addEventListener("mouseup",()=>cursor.classList.remove("active"));
window.addEventListener("mouseleave",()=>gsap.to(cursor,{opacity:0,duration:.2}));
window.addEventListener("mouseenter",()=>gsap.to(cursor,{opacity:1,duration:.2}));

const trail=[];
const TRAIL=8;

function animateCursor(){
render.x=lerp(render.x,mouse.x,.22);
render.y=lerp(render.y,mouse.y,.22);
gsap.set(cursor,{x:render.x,y:render.y});
trail.unshift({x:render.x,y:render.y});
if(trail.length>TRAIL)trail.pop();
requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll("a,button").forEach(el=>{
el.addEventListener("mouseenter",()=>{
gsap.to(".cursor span",{scale:2,duration:.25,ease:"power2.out"});
});
el.addEventListener("mouseleave",()=>{
gsap.to(".cursor span",{scale:1,duration:.25,ease:"power2.out"});
});
});

window.addEventListener("resize",()=>{
mouse.x=window.innerWidth*.5;
mouse.y=window.innerHeight*.5;
render.x=mouse.x;
render.y=mouse.y;
});

document.addEventListener("visibilitychange",()=>{
if(document.hidden){
gsap.set(cursor,{opacity:0});
}else{
gsap.set(cursor,{opacity:1});
}
});

let lastX=mouse.x,lastY=mouse.y,lastGX=-1,lastGY=-1;

function updateCubes(){
const gx=snap(render.x);
const gy=snap(render.y);
if(gx!==lastGX||gy!==lastGY){
createCube(gx,gy);
lastGX=gx;
lastGY=gy;
}
const dx=render.x-lastX;
const dy=render.y-lastY;
const speed=Math.min(Math.hypot(dx,dy),40);
const angle=Math.atan2(dy,dx)*180/Math.PI;
gsap.set(cursor,{rotation:angle,scale:1+speed*.015});
lastX=render.x;
lastY=render.y;
requestAnimationFrame(updateCubes);
}

updateCubes();

document.addEventListener("mousedown",()=>{
gsap.to(".cursor span",{scale:.65,duration:.12,ease:"power2.out"});
});

document.addEventListener("mouseup",()=>{
gsap.to(".cursor span",{scale:1,duration:.25,ease:"power2.out"});
});

document.querySelectorAll("img,video").forEach(el=>{
el.addEventListener("mouseenter",()=>{
gsap.to(".cursor span",{scale:2.5,duration:.3,ease:"power3.out"});
});
el.addEventListener("mouseleave",()=>{
gsap.to(".cursor span",{scale:1,duration:.3,ease:"power3.out"});
});
});

gsap.ticker.add(()=>{
cursor.style.willChange="transform";
});

console.log("INPAR Cursor Loaded");