// REVEAL
const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("active");
        }
    });
},{threshold:0.15});

document.querySelectorAll(".reveal")
.forEach(el=>observer.observe(el));


// DATI
const data={
gelaterie:[
{
name:"CONO LOCO",
city:"DESENZANO DEL GARDA",
folder:"ConoLoco",
description:"Gelato artigianale nato da un’idea pazza e tanta passione.",
address:"Via Roma, 24, 25015 Desenzano del Garda BS"
}
]
};

const dynamic=document.getElementById("dynamic-section");
let current=null;

document.querySelectorAll(".btn-circle")
.forEach(btn=>{
btn.addEventListener("click",()=>{
const cat=btn.dataset.cat;

if(current===cat){
dynamic.innerHTML="";
dynamic.classList.remove("dynamic-active");
btn.classList.remove("active");
current=null;
return;
}

document.querySelectorAll(".btn-circle")
.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");
current=cat;
loadCategory(cat);
});
});

function loadCategory(cat){
dynamic.innerHTML="";
dynamic.classList.add("dynamic-active");

if(!data[cat]) return;

data[cat].forEach(locale=>{
const tile=document.createElement("div");
tile.className="locale-tile";

tile.innerHTML=`
<div class="locale-text">
<h2 style="font-family:Oswald;font-size:22px;">
🍦 ${locale.name} <span style="font-size:14px;">(${locale.city})</span>
</h2>
<p style="margin:15px 0;">${locale.description}</p>
<p style="font-size:13px;">📍 ${locale.address}</p>
</div>

<div class="locale-carousel">
<div class="carousel">
<img src="locali/${locale.folder}/1.jpg">
</div>
</div>
`;

dynamic.appendChild(tile);

enableSwipe(tile.querySelector("img"),locale.folder);
});
}

// SWIPE
function enableSwipe(img,folder){
let index=1;
let startX=0;

img.addEventListener("touchstart",e=>{
startX=e.touches[0].clientX;
});

img.addEventListener("touchend",e=>{
let diff=e.changedTouches[0].clientX-startX;

if(diff>50) index--;
if(diff<-50) index++;

if(index<1) index=5;
if(index>5) index=1;

img.src=`locali/${folder}/${index}.jpg`;
});
}

// NAVIGATION
function scrollToTop(){
window.scrollTo({top:0,behavior:"smooth"});
}

function scrollToMap(){
document.querySelector(".map-section")
.scrollIntoView({behavior:"smooth"});
}

function scrollToBot(){
alert("Colleghiamo il bot dopo 😉");
}