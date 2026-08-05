const layers=document.querySelectorAll('.parallax');
let mx=0,my=0,px=0,py=0;
window.addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-.5);my=(e.clientY/innerHeight-.5)},{passive:true});
function parallax(){px+=(mx-px)*.035;py+=(my-py)*.035;document.querySelector('.p1').style.transform=`translate3d(${px*90}px,${py*90}px,0)`;document.querySelector('.p2').style.transform=`translate3d(${-px*120}px,${-py*70}px,0)`;document.querySelector('.p3').style.transform=`translate3d(${px*60}px,${py*120}px,0)`;document.querySelectorAll('.layer').forEach(el=>{const s=parseFloat(el.dataset.speed||.2);el.style.transform=`translate3d(${px*s*45}px,${py*s*45}px,0) rotateX(${py*s*-1.8}deg) rotateY(${px*s*1.8}deg)`});requestAnimationFrame(parallax)}parallax();

const track=document.querySelector('.track'), prev=document.querySelector('.prev'), next=document.querySelector('.next');
function amount(){const card=track.querySelector('.episode-card');return card?card.getBoundingClientRect().width+14:300}
prev.addEventListener('click',()=>track.scrollBy({left:-amount(),behavior:'smooth'}));
next.addEventListener('click',()=>track.scrollBy({left:amount(),behavior:'smooth'}));

let down=false,start=0,scroll=0;
track.addEventListener('pointerdown',e=>{down=true;start=e.clientX;scroll=track.scrollLeft;track.setPointerCapture(e.pointerId)});
track.addEventListener('pointermove',e=>{if(down)track.scrollLeft=scroll-(e.clientX-start)*1.1});
track.addEventListener('pointerup',()=>down=false);track.addEventListener('pointercancel',()=>down=false);
