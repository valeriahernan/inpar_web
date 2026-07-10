/*========== CUBES ==========*/

document.addEventListener("DOMContentLoaded",()=>{

const container=document.querySelector("#cubes");

if(!container)return;

const GRID=24;
const cubes=new Map();

function snap(value){
return Math.floor(value/GRID)*GRID;
}

function createCube(x,y){

const key=`${x},${y}`;

if(cubes.has(key))return;

const cube=document.createElement("div");

cube.className="cube";
cube.style.left=x+"px";
cube.style.top=y+"px";

container.appendChild(cube);
cubes.set(key,cube);


setTimeout(()=>{

cube.classList.add("remove");

setTimeout(()=>{

cube.remove();
cubes.delete(key);

},500);

},700);

}


document.addEventListener("mousemove",e=>{

createCube(
snap(e.clientX),
snap(e.clientY)
);

});

});