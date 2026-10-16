/* Ash particles: a quiet fixed canvas behind the whole page.
   To disable, remove the <script src="js/particles.js"> line from index.html. */
(function(){
  if(matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const cv=document.createElement("canvas");
  cv.setAttribute("aria-hidden","true");
  cv.style.cssText="position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none";
  document.body.prepend(cv);
  const ctx=cv.getContext("2d");
  let W=0,H=0,P=[],last=performance.now();
  const rnd=(a,b)=>a+Math.random()*(b-a);

  function spawn(fresh){
    const ember=Math.random()<.18, max=rnd(12,26);
    return { x0:rnd(0,W), y:fresh?H+10:rnd(0,H), vy:-rnd(6,20), sway:rnd(8,28), ph:rnd(0,6.28), fr:rnd(.25,.6),
      r:ember?rnd(1,2):rnd(.7,1.9), a:ember?rnd(.35,.6):rnd(.12,.28), ember, max, life:fresh?0:rnd(0,max) };
  }
  function resize(){
    const dpr=Math.min(window.devicePixelRatio||1,2);
    W=innerWidth; H=innerHeight;
    cv.width=W*dpr; cv.height=H*dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    const n=Math.min(70,Math.round(W*H/22000));   // fewer particles on small screens
    while(P.length<n) P.push(spawn(false));
    P.length=Math.min(P.length,n);
  }
  function frame(now){
    const dt=Math.min((now-last)/1000,.05); last=now;
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<P.length;i++){
      const p=P[i];
      p.life+=dt; p.y+=p.vy*dt;
      if(p.life>p.max||p.y<-10){ P[i]=spawn(true); continue; }
      const x=p.x0+Math.sin(p.ph+p.life*p.fr)*p.sway;
      const al=p.a*Math.sin(Math.PI*p.life/p.max);          // fade in and out
      ctx.fillStyle=p.ember?`rgba(229,56,59,${al})`:`rgba(232,230,227,${al})`;
      ctx.beginPath(); ctx.arc(x,p.y,p.r,0,6.2832); ctx.fill();
    }
    requestAnimationFrame(frame);
  }
  addEventListener("resize",resize);
  document.addEventListener("visibilitychange",()=>{ last=performance.now(); });
  resize(); requestAnimationFrame(frame);
})();
