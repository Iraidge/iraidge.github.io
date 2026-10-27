// ===== Site settings: edit the data blocks below (CFG, PROJECTS, ABOUT, FACTS, LINKS, SKILLS) =====
const CFG = {
  name: "Ivan Deriabin",
  github: "Iraidge",
  repo: "Iraidge/iraidge.github.io",
  email: "ivanderb26@gmail.com",
  typed: "int main(void) { return 0; }",
  photo: "",
  lead: "I'm a Game Design student at Leeds Beckett University, looking for a placement year in gameplay or graphics programming starting in summer or September 2027. I write games and prototypes in C++ with raylib and Unreal Engine, and I'm learning how engines work under the hood, starting with OpenGL and aiming for Vulkan."
};
// Projects. Optional fields: youtube (demo video URL), repo (GitHub repo name), itch (itch.io page URL),
// links ([["Label","url"]] for extra links), pin:true (shows the project on the home page).
const PROJECTS = [
  { title:"CryoCannon-Component",
    desc:"A modular Cryo Cannon weapon component prototype built with C++ for Unreal Engine 5.7",
    tags:["C++","UE5"], img:"assets/CryoCannon.png", pin:true,
    youtube:"https://youtu.be/n7KydgAHSE4", repo:"UE5-CryoCannonComponent" },

  { title:"Inventory System with raylib",
    desc:"A 2D inventory system made with C++ and Raylib, featuring Drag & Drop, item swapping, selling mechanics, and lazy texture loading for 1244 unique items.",
    tags:["C++","raylib"], img:"assets/InventorySystem.png",
    repo:"Raylib-Inventory-System" },

  { title:"Rooftop Farmer",
    desc:"A small game prototype about farming vegetables on rooftops, built with Unreal Engine 5.6 using Blueprints.",
    tags:["UE5","Blueprints"], img:"assets/Rooftop-Farmer.png",
    youtube:"https://youtu.be/qA4leDZABsw", itch:"https://iraidge.itch.io/rooftop-farmer" }
];

const ABOUT = [
  "I'm a Game Design student at Leeds Beckett University, working mostly in C++ with Unreal Engine and raylib. I enjoy understanding how things work under the hood and I want to get better at it. I'm looking for a gameplay or graphics programming placement starting in September 2027.",
  "What drew me to games is the idea of building something that other people play together and enjoy. I like the whole loop: coming up with an idea, making it work, and watching someone else pick it up and have fun with it. I'm still early in my career, but I take the work seriously and hold myself to a high standard.",
  "What keeps me going is inventing things. I constantly design mechanics in my head, even ones I'll never build, like a horror game where each level ends with you travelling back in time to scare your past self. Sometimes they do get built. CryoCannon started as an idea for a Portal-style puzzle game built around a freeze gun, with some inspiration from Prey's GLOO Cannon. I moved away from the puzzles and built it as a weapon component that shoots a freeze ray, spawns ice spikes and creates protective ice walls.",
  "Away from the keyboard I play board games and listen to music. My favourite kind of game is an old-school RPG like Oblivion. I love its dated look and the way its combat feels: you throw a fireball and the enemy ragdolls across the room. I can't fully explain why, it just feels close to my heart."
];
const FACTS = [["LOCATION","Leeds, UK"],["LOOKING FOR","Placement, Summer/Sept 2027"], ["CURRENTLY", "Learning OpenGL and getting better at C++"]];

const LINKS = [
  ["Email","mailto:"+CFG.email,CFG.email],
  ["GitHub","https://github.com/"+CFG.github,"@"+CFG.github],
  ["X","https://x.com/Iraidge","@Iraidge"],
  ["LinkedIn", "https://www.linkedin.com/in/ivanderb/", "Ivan Deriabin"],
  ["YouTube", "https://www.youtube.com/@iraidge", "@Iraidge"],
  ["itch.io", "https://iraidge.itch.io/", "Iraidge"]
];

// Skills: groups of [name, detail] rows.
const SKILLS = [
  ["Working with", [
    ["C++", "game code, memory, templates"],
    ["Unreal Engine", "Interfaces, Blueprints, C++"],
    ["raylib", "2D games, game loop, input"],
    ["Git", "branches, commits, GitHub"]
  ]],
  ["Learning", [
    ["Game math", "vectors, matrices, collisions"],
    ["OpenGL", "graphics pipeline, theory for now"]
  ]],
  ["Aiming for", [
    ["Vulkan", "a low-level graphics API"]
  ]]
];

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
    return "<p>"+inline(b.replace(/( {2,}|\\)\n/g,"<br>").replace(/\n/g," "))+"</p>";
  }).join("").replace(/\u0000(\d+)\u0000/g,(_,i)=>"<pre><code>"+code[i]+"</code></pre>");
}
function parsePost(file,text){
  const meta={}; let body=text.replace(/\r/g,"");
  const m=body.match(/^---\n([\s\S]*?)\n---\n?/);
  if(m){ m[1].split("\n").forEach(l=>{const i=l.indexOf(":"); if(i>0) meta[l.slice(0,i).trim()]=l.slice(i+1).trim()}); body=body.slice(m[0].length); }
  return { slug:file.replace(/\.md$/,""), title:meta.title||file.replace(/\.md$/,""), date:meta.date||"", desc:meta.description||"", image:meta.image||"", body };
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
  try{ // local index.json is merged with the GitHub list (so unpushed posts show up when testing locally)
    const r=await fetch("blog/posts/index.json"); if(r.ok) files=[...new Set([...files,...await r.json()])];
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

function home(){
  app.innerHTML=`
  <section class="hero${CFG.photo?"":" solo"}">
    <div>
      <h1>${esc(CFG.name)},<br><em>Gameplay & Graphics</em><br>Programmer.</h1>
      <p class="lead">${esc(CFG.lead)}</p>
      <div class="btns">
        <a class="btn pri" href="#/portfolio">View projects</a>
        <a class="btn" href="#/blog">Read the blog</a>
        <a class="btn" href="https://github.com/${CFG.github}" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    ${CFG.photo?`<figure class="photo"><img src="${esc(CFG.photo)}" alt="${esc(CFG.name)}"><figcaption>${esc(CFG.name)}</figcaption></figure>`:""}
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
    <h3>What I can do</h3>
    <div class="skills">${SKILLS.map(([g,rows])=>`<div class="sg"><h4>${esc(g)}</h4><dl>${rows.map(([n,d])=>`<div><dt>${esc(n)}</dt><dd>${esc(d)}</dd></div>`).join("")}</dl></div>`).join("")}</div>
  </section>
  <section class="road">
    <h3>Contact</h3>
    <ul class="links">${LINKS.map(([n,u,h])=>`<li><a href="${esc(u)}"${u.startsWith("mailto:")?"":' target="_blank" rel="noopener"'}><span>${n}</span>${esc(h)}</a></li>`).join("")}</ul>
  </section>`;
}

function projectLinks(p){
  const l=[];
  if(p.youtube) l.push(["Watch demo",p.youtube]);
  if(p.repo) l.push(["GitHub",`https://github.com/${CFG.github}/${p.repo}`]);
  if(p.itch) l.push(["itch.io",p.itch]);
  const all=[...l,...(p.links||[])];
  return all.length?`<div class="plinks">${all.map(([t,u])=>`<a class="gh" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>`).join("")}</div>`:"";
}

function projectCard(p){
  return `<article class="card">
    <div class="shot">${p.img?`<img src="${esc(p.img)}" alt="Screenshot of ${esc(p.title)}" loading="lazy">`:`<div class="ph">screenshot / gif</div>`}</div>
    <div class="body">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="tags">${p.tags.map(t=>`<span>${esc(t)}</span>`).join("")}</div>
      ${projectLinks(p)}
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
    ? `<ul class="posts">${posts.map(p=>`<li><a href="#/blog/${encodeURIComponent(p.slug)}"><time>${p.date}</time><div><h3>${esc(p.title)}</h3>${p.desc?`<p>${esc(p.desc)}</p>`:""}</div></a></li>`).join("")}</ul>`
    : `<p class="empty">No posts yet. Add a .md file to blog/posts/.</p>`;
}

async function post(slug){
  app.innerHTML=`<div class="empty">loading…</div>`;
  const p=(await loadPosts()).find(x=>x.slug===slug);
  if(!p){ app.innerHTML=`<a class="back" href="#/blog">← all posts</a><p class="empty">Post not found.</p>`; return; }
  document.title=p.title+" — "+CFG.name;
  app.innerHTML=`<a class="back" href="#/blog">← all posts</a>
    <article class="post">${p.image?`<img class="banner" src="${esc(p.image)}" alt="">`:""}<h1>${esc(p.title)}</h1><div class="meta">${p.date}</div><div class="md">${md(p.body)}</div></article>`;
}

function route(){
  const h=(location.hash||"#/").replace(/^#\/?/,"").split("/");
  const r=h[0]||"home";
  document.title=CFG.name+" — game developer";
  document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("on",a.dataset.r===r));
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

(function(){
  const b=document.getElementById("theme"), root=document.documentElement;
  const sync=()=>{ const t=root.dataset.theme==="light"?"dark":"light"; b.title="Switch to "+t+" theme"; b.setAttribute("aria-label",b.title); };
  b.onclick=()=>{
    const light=root.dataset.theme!=="light";
    if(light) root.dataset.theme="light"; else delete root.dataset.theme;
    try{ localStorage.setItem("theme",light?"light":"dark"); }catch(e){}
    sync();
  };
  sync();
})();
