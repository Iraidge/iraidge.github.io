/* ============ НАСТРОЙКИ — правь здесь ============ */
const CFG = {
  name: "Ivan Deriabin",
  github: "iraidge",
  repo: "",                    
  email: "ivanderb26@gmail.com",
  typed: "int main(void) { return 0; }",
  photo: "",
  lead: "I write games in C++ and raylib and want to understand what happens under the hood. I'm reading about OpenGL for now; Vulkan is the goal for later."
};

const PROJECTS = [
  { title:"CryoCannon-Component", desc:"A modular Cryo Cannon weapon component prototype built with C++ for Unreal Engine 5.7",
    tags:["C++20","UE"], repo:"UE5-CryoCannonComponent", img:"assets/CryoCannon.png", pin:true},
  { title:"Inventory System with raylib", desc:"A 2D inventory system made with C++ and Raylib, featuring Drag & Drop, item swapping, selling mechanics, and lazy texture loading for 1244 unique items.",
    tags:["C++","raylib"], repo:"Raylib-Inventory-System", img:"assets/InventorySystem.png" },
];

const ROADMAP = [
  { t:"C++ and raylib", s:"now", d:"building games, learning the game loop" },
  { t:"OpenGL", s:"theory", d:"theory for now, reading and sketching on paper" },
  { t:"Vulkan", s:"goal", d:"the goal, not touched yet" }
];


const ABOUT = [
  "Hi! I'm a game developer writing in C++ and raylib. I like the low level: memory, the game loop, the path from code to pixels on screen.",
  "Right now I build small games and tools and read about the graphics pipeline and OpenGL (on paper, for now). Next I want to get to Vulkan."
];
const FACTS = [["location","Leeds, UK"],["stack","C++, raylib"],["learning","C++, raylib, OpenGL"],["goal","Vulkan"]];

const LINKS = [
  ["Email","mailto:"+CFG.email,CFG.email],
  ["GitHub","https://github.com/"+CFG.github,"@"+CFG.github],
  ["Telegram","https://t.me/Iraidge_dev","@Iraidge_dev"],
  ["X","https://x.com/Iraidge","@Iraidge"],
];

// Skills: n — name, d — description, i — icons (from ICONS), s — status: now (write) / theory (learning) / goal (goal).
const ICONS = {
  code:'<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  pad:'<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5"/><circle cx="16" cy="11.5" r=".7"/><circle cx="18.5" cy="13.5" r=".7"/>',
  tool:'<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  git:'<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 7v10M18 10c0 4-6 3-12 7"/>',
  layers:'<polygon points="12 2 2 7 12 12 22 7"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  math:'<path d="M8 3H5v18h3M16 3h3v18h-3"/><path d="M10 9h4M10 15h4"/>',
  cube:'<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M3 7l9 5 9-5M12 12v10"/>'
};
const SKILLS = [
  { n:"C++", d:"game code, memory, templates", i:"code", s:"now" },
  { n:"Unreal Engine", d:"Interfaces, Blueprints, C++", i:"tool", s:"now" },
  { n:"raylib", d:"2D games, game loop, input", i:"pad", s:"now" },
  { n:"Git", d:"branches, commits, GitHub", i:"git", s:"now" },
  { n:"Game math", d:"vectors, matrices, collisions", i:"math", s:"theory" },
  { n:"OpenGL", d:"graphics pipeline, theory for now", i:"layers", s:"theory" },
  { n:"Vulkan", d:"a goal for the future", i:"cube", s:"goal" }
];
const ST = { now:"writing", theory:"learning", goal:"goal" };

const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function inline(s){
  return s.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g,'<img alt="$1" src="$2" loading="lazy">')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/`([^`]+)`/g,"<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")
    .replace(/(^|[^*])\*([^*]+)\*/g,"$1<em>$2</em>");
}
function md(src){
  const code=[];
  src=esc(src.replace(/\r/g,"")).replace(/(```|~~~)\w*\n([\s\S]*?)\1/g,(_,f,c)=>{code.push(c.replace(/\n$/,""));return "\u0000"+(code.length-1)+"\u0000"});
  return src.split(/\n{2,}/).map(b=>{
    b=b.trim(); if(!b) return "";
    let m;
    if((m=b.match(/^\u0000(\d+)\u0000$/))) return "<pre><code>"+code[m[1]]+"</code></pre>";
    if((m=b.match(/^(#{1,4})\s+(.*)$/))) return `<h${Math.max(m[1].length,2)}>${inline(m[2])}</h${Math.max(m[1].length,2)}>`;
    if(/^(-{3,}|\*{3,})$/.test(b)) return "<hr>";
    if(/^&gt;/.test(b)) return "<blockquote>"+inline(b.replace(/^&gt;\s?/gm,"").replace(/\n/g," "))+"</blockquote>";
    if(/^[-*]\s/.test(b)) return "<ul>"+b.split("\n").map(l=>"<li>"+inline(l.replace(/^[-*]\s+/,""))+"</li>").join("")+"</ul>";
    if(/^\d+\.\s/.test(b)) return "<ol>"+b.split("\n").map(l=>"<li>"+inline(l.replace(/^\d+\.\s+/,""))+"</li>").join("")+"</ol>";
    return "<p>"+inline(b.replace(/\n/g," "))+"</p>";
  }).join("").replace(/\u0000(\d+)\u0000/g,(_,i)=>"<pre><code>"+code[i]+"</code></pre>");
}
function parsePost(file,text){
  const meta={}; let body=text.replace(/\r/g,"");
  const m=body.match(/^---\n([\s\S]*?)\n---\n?/);
  if(m){ m[1].split("\n").forEach(l=>{const i=l.indexOf(":"); if(i>0) meta[l.slice(0,i).trim()]=l.slice(i+1).trim()}); body=body.slice(m[0].length); }
  return { slug:file.replace(/\.md$/,""), title:meta.title||file.replace(/\.md$/,""), date:meta.date||"", desc:meta.description||"", body };
}

let postsCache=null;
async function loadPosts(){
  if(postsCache) return postsCache;
  let files=[], texts={};
  try{
    if(CFG.repo){
      const r=await fetch(`https://api.github.com/repos/${CFG.repo}/contents/blog/posts`);
      if(r.ok) files=(await r.json()).map(f=>f.name);
    }
  }catch(e){}
  if(!files.length) try{
    const r=await fetch("blog/posts/index.json"); if(r.ok) files=await r.json();
  }catch(e){}
  files=files.filter(f=>/\.md$/i.test(f));
  if(files.length){
    await Promise.all(files.map(async f=>{
      try{ const r=await fetch("blog/posts/"+encodeURIComponent(f)); if(r.ok) texts[f]=await r.text(); }catch(e){}
    }));
  }
  postsCache=Object.entries(texts).map(([f,t])=>parsePost(f,t)).sort((a,b)=>b.date.localeCompare(a.date));
  return postsCache;
}

const app=document.getElementById("app");
const fmt=d=>d||"";

function home(){
  const photo=CFG.photo?`<img src="${esc(CFG.photo)}" alt="${esc(CFG.name)}">`:`<span>your photo</span>`;
  app.innerHTML=`
  <section class="hero">
    <div>
      <div class="prompt"><i>$</i> <span id="typed"></span><span class="cursor"></span></div>
      <h1>${esc(CFG.name)},<br><em>low-level</em><br>game developer.</h1>
      <p class="lead">${esc(CFG.lead)}</p>
      <div class="btns">
        <a class="btn pri" href="#/portfolio">View projects</a>
        <a class="btn" href="#/blog">Read the blog</a>
        <a class="btn" href="https://github.com/${CFG.github}" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <figure class="photo">${photo}<figcaption>${esc(CFG.name)}</figcaption></figure>
  </section>
  <section class="road about">
    <div>
      <h3>About me</h3>
      ${ABOUT.map(t=>`<p>${t}</p>`).join("")}
      <dl class="facts">${FACTS.map(([k,v])=>`<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
    </div>
    <div class="pin"><h3>Pinned project</h3>${projectCard(PROJECTS.find(p=>p.pin)||PROJECTS[0])}</div>
  </section>
  <section class="road">
    <h3>GitHub activity</h3>
    <div id="hm"><p class="empty">loading…</p></div>
  </section>
  <section class="road">
    <h3>What I can do</h3>
    <div class="skills">${SKILLS.map(k=>`<article class="sk"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k.i]}</svg></div><div><b>${esc(k.n)}</b><span>${esc(k.d)}</span></div><em class="st ${k.s}">${ST[k.s]}</em></article>`).join("")}</div>
  </section>
  <section class="road">
    <h3>Contact</h3>
    <ul class="links">${LINKS.map(([n,u,h])=>`<li><a href="${esc(u)}"${u.startsWith("mailto:")?"":' target="_blank" rel="noopener"'}><span>${n}</span>${esc(h)}</a></li>`).join("")}</ul>
  </section>`;
  typeLine(); heatmap();
}

let typeTimer;
function typeLine(){
  const el=document.getElementById("typed"); if(!el) return;
  const s=CFG.typed; let i=0;
  if(matchMedia("(prefers-reduced-motion:reduce)").matches){ el.textContent=s; return; }
  clearInterval(typeTimer);
  typeTimer=setInterval(()=>{ el.textContent=s.slice(0,++i); if(i>=s.length) clearInterval(typeTimer); },55);
}

function demoDays(){
  const out=[], end=new Date(); end.setHours(12,0,0,0);
  let seed=7; const rnd=()=>(seed=seed*16807%2147483647)/2147483647;
  for(let i=364;i>=0;i--){
    const d=new Date(end-i*864e5), wd=d.getDay();
    const p=((wd===0||wd===6)?.25:.6)*(.5+.5*Math.sin(i/23))+.08;
    const c=rnd()<p?Math.ceil(rnd()*rnd()*12):0;
    out.push({date:d.toISOString().slice(0,10),count:c,level:c===0?0:c<3?1:c<6?2:c<10?3:4});
  }
  return out;
}
async function heatmap(){
  const el=document.getElementById("hm"); if(!el) return;
  const demo=CFG.github==="username"; let days=[], note="";
  if(demo){ days=demoDays(); note=" · demo data, yours will appear once CFG.github is set"; }
  else try{
    const r=await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(CFG.github)}?y=last`);
    days=(await r.json()).contributions||[];
  }catch(e){}
  if(!document.getElementById("hm")) return;
  if(!days.length){ el.innerHTML=`<p class="empty">Couldn't load GitHub activity.</p>`; return; }
  const total=days.reduce((a,d)=>a+d.count,0);
  const lead=new Date(days[0].date+"T12:00:00").getDay();
  const cells=[...Array(lead).fill(null),...days], weeks=Math.ceil(cells.length/7);
  const MN=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let mo="", prevM=-1, lastW=-9;
  for(let w=0;w<weeks;w++){
    const d=cells.slice(w*7,w*7+7).find(Boolean), m=d?new Date(d.date+"T12:00:00").getMonth():prevM;
    mo+=`<span>${m!==prevM&&w-lastW>=3?(lastW=w,MN[m]):""}</span>`; prevM=m;
  }
  const grid=cells.map((d,i)=>d?`<i class="c l${d.level}" style="--i:${i/7|0}" title="${d.count} · ${d.date}"></i>`:`<i class="c n"></i>`).join("");
  el.innerHTML=`<div class="hm"><div class="hm-in"><div class="mo">${mo}</div><div class="cells">${grid}</div></div></div>
    <div class="hm-foot"><span>${total} contributions in the last year${note}</span>
    <span class="leg">less <i class="c"></i><i class="c l1"></i><i class="c l2"></i><i class="c l3"></i><i class="c l4"></i> more</span></div>`;
  el.querySelector(".hm").scrollLeft=1e5;
}

function projectCard(p){
  return `<article class="card">
    <div class="shot">${p.img?`<img src="${esc(p.img)}" alt="Screenshot of ${esc(p.title)}" loading="lazy">`:`<div class="ph">screenshot / gif</div>`}</div>
    <div class="body">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div>
      <a class="gh" href="https://github.com/${CFG.github}/${p.repo}" target="_blank" rel="noopener">View on GitHub</a>
    </div>
  </article>`;
}

function portfolio(){
  app.innerHTML=`<h2 class="page">Portfolio</h2>
  <p class="sub">Small projects where I figure out how things work inside.</p>
  <div class="grid">${PROJECTS.map(projectCard).join("")}</div>`;
}

async function blog(){
  app.innerHTML=`<h2 class="page">Blog</h2><p class="sub">Notes on C++, graphics and games.</p><div class="empty">loading…</div>`;
  const posts=await loadPosts();
  app.querySelector(".empty").outerHTML = posts.length
    ? `<ul class="posts">${posts.map(p=>`<li><a href="#/blog/${encodeURIComponent(p.slug)}"><time>${fmt(p.date)}</time><div><h3>${esc(p.title)}</h3>${p.desc?`<p>${esc(p.desc)}</p>`:""}</div></a></li>`).join("")}</ul>`
    : `<p class="empty">No posts yet. Add a .md file to blog/posts/.</p>`;
}

async function post(slug){
  app.innerHTML=`<div class="empty">loading…</div>`;
  const p=(await loadPosts()).find(x=>x.slug===slug);
  if(!p){ app.innerHTML=`<a class="back" href="#/blog">← all posts</a><p class="empty">Post not found.</p>`; return; }
  document.title=p.title+" — "+CFG.name;
  app.innerHTML=`<a class="back" href="#/blog">← all posts</a>
    <article class="post"><h1>${esc(p.title)}</h1><div class="meta">${fmt(p.date)}</div><div class="md">${md(p.body)}</div></article>`;
}

function route(){
  const h=(location.hash||"#/").replace(/^#\/?/,"").split("/");
  const r=h[0]||"home";
  document.title=CFG.name+" — game developer";
  document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("on",a.dataset.r===r));
  clearInterval(typeTimer);
  window.scrollTo(0,0);
  if(r==="portfolio") portfolio();
  else if(r==="blog") h[1]?post(decodeURIComponent(h[1])):blog();
  else home();
}
document.getElementById("yr").textContent=new Date().getFullYear();
document.getElementById("fl").textContent=CFG.email;
document.getElementById("fn").textContent=CFG.name;
document.getElementById("lg").textContent=CFG.github;
addEventListener("hashchange",route);
route();
