const $=s=>document.querySelector(s),D=Math.PI/180;
const COL={mare:'#7fb8ff',crater:'#ffd27f',mount:'#8fe3a0',site:'#ff8c8c',basin:'#d3a4ff'};
const TN={mare:'Maria (lava plains)',crater:'Craters',mount:'Mountain ranges',site:'Landing sites',basin:'Impact basins'};
const SN={mare:'Mare',crater:'Crater',mount:'Mountain range',site:'Landing site',basin:'Impact basin'};
// [name,type,lat,lon,priority(1 = shown when zoomed out),description]
const F=[
["Mare Imbrium","mare",32.8,-15.6,1,"Sea of Showers. A basalt plain about 1,150 km across, flooding a basin carved by an impact roughly 3.9 billion years ago; lava filled it 3.2–3.8 Gya."],
["Mare Serenitatis","mare",28,17.5,1,"Sea of Serenity. A ~700 km circular mare ringed by the Caucasus, Haemus and Taurus mountains; it hides a dense mass concentration (mascon)."],
["Mare Tranquillitatis","mare",8.5,31.4,1,"Sea of Tranquility. Titanium-rich basalts; the Apollo 11 landing site (1969)."],
["Mare Fecunditatis","mare",-4,52,2,"Sea of Fertility. Luna 16 returned robotic soil samples from its edge in 1970."],
["Mare Crisium","mare",17,59.1,1,"Sea of Crises. A ~560 km isolated basin that looks oval from Earth because of foreshortening; sampled by Luna 24 in 1976."],
["Mare Nectaris","mare",-15.2,34.6,2,"Sea of Nectar. A small ~350 km mare in the Nectaris basin, bordered by Theophilus, Cyrillus and Catharina."],
["Mare Nubium","mare",-21.3,-16.6,2,"Sea of Clouds. Home to the Rupes Recta (Straight Wall), a 110 km fault scarp, and the crater Bullialdus."],
["Mare Humorum","mare",-24.4,-38.6,2,"Sea of Moisture. A circular ~390 km mare with the large crater Gassendi on its northern rim."],
["Oceanus Procellarum","mare",18.4,-57.4,1,"Ocean of Storms. The largest mare (~2,500 km), roughly a tenth of the lunar surface, rich in KREEP material. Apollo 12 landed here."],
["Mare Frigoris","mare",56,1.4,2,"Sea of Cold. A long, narrow mare stretching ~1,600 km along the northern near side."],
["Mare Vaporum","mare",13.3,3.6,3,"Sea of Vapors. A small mare beside the Apennines, near the Hyginus rille."],
["Mare Cognitum","mare",-10.5,-23.1,3,"The Sea That Has Become Known. Ranger 7 sent the first close-up US lunar images before impacting here in 1964."],
["Mare Moscoviense","mare",27.3,147.9,2,"Sea of Moscow. One of very few large maria on the far side, ~277 km across."],
["Mare Ingenii","mare",-33.7,163.5,3,"Sea of Ingenuity. A far-side mare crossed by bright swirl-like magnetic anomalies."],
["Mare Orientale","basin",-19.4,-92.8,1,"Eastern Sea. The best-preserved multi-ring impact basin (outer ring ~930 km, Montes Cordillera). Seen only near the western limb."],
["South Pole–Aitken Basin","basin",-53,-169,1,"The Moon’s largest, deepest and oldest recognised impact basin: ~2,500 km wide and up to ~8 km deep, on the far side. Target of Chang’e-4."],
["Tycho","crater",-43.3,-11.4,1,"A young (~108 Myr) 85 km crater whose bright rays stretch more than 1,500 km across the near side."],
["Copernicus","crater",9.6,-20.1,1,"93 km, ~800 Myr old. Terraced walls, central peaks and a bright ray system; a classic complex crater."],
["Kepler","crater",8.1,-38,2,"A 32 km young crater with bright rays, set in Oceanus Procellarum."],
["Aristarchus","crater",23.7,-47.4,1,"A 40 km crater, among the brightest features on the Moon; site of reported transient lunar phenomena."],
["Plato","crater",51.6,-9.3,2,"A 101 km crater with a dark, lava-flooded floor, on the northern edge of Mare Imbrium."],
["Grimaldi","crater",-5.2,-68.3,2,"A dark-floored walled plain ~170 km wide near the western limb."],
["Clavius","crater",-58.8,-14.4,1,"One of the largest named craters (~225 km), in the southern highlands, with an arc of smaller craters on its floor."],
["Langrenus","crater",-8.9,61.1,3,"A 132 km crater with terraced walls and a central peak, near Mare Fecunditatis."],
["Petavius","crater",-25.1,60.4,3,"A 177 km crater with a central peak complex and a prominent rille across its floor."],
["Posidonius","crater",31.8,29.9,3,"A 95 km crater on the edge of Mare Serenitatis with a fractured floor."],
["Archimedes","crater",29.7,-4,3,"An 83 km crater with a smooth, lava-flooded floor in Mare Imbrium."],
["Eratosthenes","crater",14.5,-11.3,3,"A 58 km crater that gives its name to the Eratosthenian lunar period (~3.2–1.1 Gya)."],
["Schickard","crater",-44.3,-55.3,3,"A ~227 km walled plain with a partly dark, flooded floor."],
["Tsiolkovsky","crater",-20.4,129.1,2,"A 180 km far-side crater with a dark mare-flooded floor and a tall central peak."],
["Montes Apenninus","mount",21,-1,1,"Peaks up to ~5 km, forming the south-eastern rim of the Imbrium basin. Apollo 15 landed at their foot."],
["Montes Alpes","mount",48,0,2,"Imbrium rim range split by Vallis Alpes, a ~166 km rift valley."],
["Montes Caucasus","mount",38.4,10,2,"Rugged peaks up to ~6 km high, between Mare Imbrium and Mare Serenitatis."],
["Montes Carpatus","mount",15.2,-24.4,3,"A range along the southern edge of Mare Imbrium, north of Copernicus."],
["Montes Jura","mount",47.5,-34,3,"A curving range enclosing Sinus Iridum, the Bay of Rainbows."],
["Montes Taurus","mount",28,41,3,"Highlands east of Mare Serenitatis; the Apollo 17 valley lies within them."],
["Apollo 11","site",0.67,23.47,1,"20 July 1969. First humans on the Moon: Neil Armstrong and Buzz Aldrin, in Mare Tranquillitatis."],
["Apollo 12","site",-3.01,-23.42,3,"November 1969. Pinpoint landing next to the Surveyor 3 probe (Conrad and Bean)."],
["Apollo 14","site",-3.65,-17.47,3,"February 1971. Fra Mauro highlands (Shepard and Mitchell)."],
["Apollo 15","site",26.13,3.63,2,"July 1971. First lunar rover, at Hadley Rille beside the Apennines (Scott and Irwin)."],
["Apollo 16","site",-8.97,15.5,3,"April 1972. Descartes Highlands (Young and Duke)."],
["Apollo 17","site",20.19,30.77,2,"December 1972. Last crewed landing, in the Taurus–Littrow valley, with geologist Harrison Schmitt."],
["Chandrayaan-3","site",-69.37,32.32,1,"23 August 2023. India’s Vikram lander and Pragyan rover touched down near the south pole, at Shiv Shakti Point."],
["Chang’e 4","site",-45.46,177.6,2,"January 2019. First soft landing on the lunar far side, in Von Kármán crater inside the South Pole–Aitken Basin."],
["Chang’e 5","site",43.06,-51.92,3,"December 2020. Sample-return mission that brought back ~1.7 kg of young basalt."]
];
const P=(la,lo,r=1)=>new THREE.Vector3(r*Math.cos(la*D)*Math.sin(lo*D),r*Math.sin(la*D),r*Math.cos(la*D)*Math.cos(lo*D));
const fmt=(la,lo)=>Math.abs(la).toFixed(1)+'°'+(la<0?'S':'N')+' '+Math.abs(lo).toFixed(1)+'°'+(lo<0?'W':'E');
const labs=$('#labs');
const feats=F.map(([n,t,lat,lon,pr,desc])=>{const el=document.createElement('div');el.className='lab t-'+t;el.textContent=n;el.style.setProperty('--c',COL[t]);const f={n,t,lat,lon,pr,desc,el,p:P(lat,lon)};el.onclick=()=>pick(f);labs.appendChild(el);return f});

// ---------- three.js scene with real NASA LRO maps ----------
const cvs=$('#c'),ren=new THREE.WebGLRenderer({canvas:cvs,antialias:true});ren.setPixelRatio(Math.min(devicePixelRatio,2));ren.outputEncoding=THREE.sRGBEncoding;
const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,100);
const TL=new THREE.TextureLoader(),tex=TL.load(COLOR_URI,()=>{const l=$('#load');if(l)l.remove()}),elev=TL.load(ELEV_URI);
tex.anisotropy=ren.capabilities.getMaxAnisotropy();tex.encoding=THREE.sRGBEncoding;
const geo=new THREE.SphereGeometry(1,256,128);geo.rotateY(-Math.PI/2); // maps are centred on 0° longitude
const mat=new THREE.MeshStandardMaterial({map:tex,bumpMap:elev,displacementMap:elev,roughness:1,metalness:0});
function setEx(k){mat.displacementScale=.0115*k;mat.displacementBias=-.00524*k;mat.bumpScale=.0115*k;mat.needsUpdate=true}setEx(4);
const moon=new THREE.Mesh(geo,mat);moon.rotation.order='XYZ';scene.add(moon);
const light=new THREE.DirectionalLight(0xffffff,1.25);scene.add(light,new THREE.AmbientLight(0x39445f,.9));
const sp=[];for(let i=0;i<1600;i++){const u=Math.random()*2-1,a=Math.random()*6.283,s=Math.sqrt(1-u*u);sp.push(40*s*Math.cos(a),40*u,40*s*Math.sin(a))}
const sg=new THREE.BufferGeometry();sg.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));scene.add(new THREE.Points(sg,new THREE.PointsMaterial({color:0xffffff,size:.12,sizeAttenuation:true})));
const gp=[];for(let lo=-180;lo<180;lo+=30)for(let la=-90;la<90;la+=5){const a=P(la,lo,1.012),b=P(la+5,lo,1.012);gp.push(a.x,a.y,a.z,b.x,b.y,b.z)}
for(let la=-60;la<=60;la+=30)for(let lo=-180;lo<180;lo+=5){const a=P(la,lo,1.012),b=P(la,lo+5,1.012);gp.push(a.x,a.y,a.z,b.x,b.y,b.z)}
const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.Float32BufferAttribute(gp,3));
const grid=new THREE.LineSegments(gg,new THREE.LineBasicMaterial({color:0x66aaff,transparent:true,opacity:.4}));grid.visible=false;moon.add(grid);

// ---------- UI ----------
const vis={};Object.keys(TN).forEach(t=>{vis[t]=true;const l=document.createElement('label');l.innerHTML='<input type="checkbox" checked><i style="background:'+COL[t]+'"></i>'+TN[t];l.firstChild.onchange=e=>vis[t]=e.target.checked;$('#layers').appendChild(l)});
const jump=$('#jump');Object.keys(TN).forEach(t=>{const og=document.createElement('optgroup');og.label=TN[t];feats.filter(f=>f.t===t).sort((a,b)=>a.n.localeCompare(b.n)).forEach(f=>{const o=document.createElement('option');o.value=feats.indexOf(f);o.textContent=f.n;og.appendChild(o)});jump.appendChild(og)});
jump.onchange=()=>{if(jump.value!=='')pick(feats[jump.value])};
$('#ex').oninput=e=>setEx(+e.target.value);
$('#grid').onchange=e=>grid.visible=e.target.checked;
if(innerWidth<700)$('#panel').open=false;
const info=$('#info');let cur=null;
const home='<h2>Earth’s Moon</h2><div class="s">Mean radius 1,737 km · gravity 1.62 m/s² · mean distance 384,400 km</div><p>Tidally locked, so the same near side always faces Earth. Drag to rotate, scroll or pinch to zoom, and tap any label to fly to it. Zoom in to reveal more names. Move the sunlight slider so the terminator crosses a region to see its relief.</p>';
info.innerHTML=home;
let rx=.1,ry=0,vx=0,vy=0,dist=4.4,tD=4.4,fly=null;
function pick(f){if(cur)cur.el.classList.remove('sel');cur=f;f.el.classList.add('sel');
info.innerHTML='<h2>'+f.n+'</h2><div class="s"><i style="background:'+COL[f.t]+'"></i>'+SN[f.t]+' · '+fmt(f.lat,f.lon)+'</div><p>'+f.desc+'</p>';
fly={x:f.lat*D,y:-f.lon*D};tD=Math.min(tD,2.4)}
document.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{const[a,o]=b.dataset.v.split(',').map(Number);fly={x:a*D,y:-o*D};tD=4.4;if(cur){cur.el.classList.remove('sel');cur=null;info.innerHTML=home}});
const ptrs=new Map();let pd=0;const pinch=()=>{const a=[...ptrs.values()];return a.length<2?0:Math.hypot(a[0][0]-a[1][0],a[0][1]-a[1][1])};
cvs.addEventListener('pointerdown',e=>{cvs.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,[e.clientX,e.clientY]);fly=null;vx=vy=0;pd=pinch()});
cvs.addEventListener('pointermove',e=>{const p=ptrs.get(e.pointerId);if(!p)return;
if(ptrs.size===1){const k=.005*Math.min(1,dist/3);vy=(e.clientX-p[0])*k;vx=(e.clientY-p[1])*k;ry+=vy;rx+=vx}
p[0]=e.clientX;p[1]=e.clientY;if(ptrs.size===2){const n=pinch();if(pd)tD=Math.max(1.5,Math.min(9,tD*pd/n));pd=n}});
const up=e=>{ptrs.delete(e.pointerId);pd=pinch()};cvs.addEventListener('pointerup',up);cvs.addEventListener('pointercancel',up);
cvs.addEventListener('wheel',e=>{e.preventDefault();tD=Math.max(1.5,Math.min(9,tD*Math.exp(e.deltaY*.001)))},{passive:false});
function size(){const w=innerWidth,h=innerHeight;ren.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}addEventListener('resize',size);size();

const v=new THREE.Vector3(),w=new THREE.Vector3(),wrap=a=>((a+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
function frame(){requestAnimationFrame(frame);
if(!ptrs.size&&!fly){ry+=vy;rx+=vx;vx*=.93;vy*=.93;if($('#auto').checked)ry+=.0018}
if(fly){rx+=(fly.x-rx)*.08;ry+=wrap(fly.y-ry)*.08;if(Math.abs(fly.x-rx)<.001&&Math.abs(wrap(fly.y-ry))<.001)fly=null}
rx=Math.max(-1.5,Math.min(1.5,rx));ry=wrap(ry);dist+=(tD-dist)*.1;
cam.position.set(0,0,dist*Math.max(1,.9/cam.aspect));cam.updateMatrixWorld();
moon.rotation.set(rx,ry,0);moon.updateMatrixWorld();
const s=$('#sun').value*D;light.position.set(Math.sin(s)*6,1,Math.cos(s)*6);
const cw=innerWidth,ch=innerHeight,lvl=dist>5.2?1:dist>3.4?2:3,on=$('#labOn').checked;
for(const f of feats){v.copy(f.p);moon.localToWorld(v);w.copy(cam.position).sub(v).normalize();const fc=v.dot(w);
const show=on&&vis[f.t]&&(f.pr<=lvl||f===cur),o=show?Math.max(0,Math.min(1,(fc-.05)*5)):0;
if(o<.02){f.el.style.display='none';continue}
v.project(cam);f.el.style.display='';f.el.style.opacity=o;f.el.style.transform='translate('+((v.x*.5+.5)*cw-6)+'px,'+((-v.y*.5+.5)*ch-7)+'px)'}
const lat=rx/D,lon=wrap(-ry)/D;$('#hud').innerHTML='Centre '+fmt(lat,lon)+'<br>'+(Math.abs(lon)<90?'Near side (Earth-facing)':'Far side');
ren.render(scene,cam)}
frame();