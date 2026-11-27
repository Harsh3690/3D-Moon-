const $=s=>document.querySelector(s),D=Math.PI/180;
const COL={mare:'#7fb8ff',crater:'#ffd27f',mount:'#8fe3a0',site:'#ff8c8c',basin:'#d3a4ff'};
const TN={mare:'Maria (lava plains)',crater:'Craters',mount:'Mountain ranges',site:'Landing sites',basin:'Impact basins'};
const SN={mare:'Mare',crater:'Crater',mount:'Mountain range',site:'Landing site',basin:'Impact basin'};
// Feature catalogue is loaded from js/lunar-features.js as structured objects.
const F = window.LUNAR_FEATURES;
const P=(la,lo,r=1)=>new THREE.Vector3(r*Math.cos(la*D)*Math.sin(lo*D),r*Math.sin(la*D),r*Math.cos(la*D)*Math.cos(lo*D));
const fmt=(la,lo)=>Math.abs(la).toFixed(1)+'°'+(la<0?'S':'N')+' '+Math.abs(lo).toFixed(1)+'°'+(lo<0?'W':'E');
const labs=$('#labs');
const feats = F.map(data => {
    const {name, type, lat, lon, priority, description} = data;

    const el = document.createElement('div');
    el.className = 'lab t-' + type;
    el.textContent = name;
    el.style.setProperty('--c', COL[type]);

    const f = {
        ...data,
        el,
        p: P(lat, lon)
    };

    el.onclick = () => pick(f);
    labs.appendChild(el);

    return f;
});

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
const jump=$('#jump');Object.keys(TN).forEach(t=>{const og=document.createElement('optgroup');og.label=TN[t];feats.filter(f=>f.type===t).sort((a,b)=>a.name.localeCompare(b.name)).forEach(f=>{const o=document.createElement('option');o.value=feats.indexOf(f);o.textContent=f.name;og.appendChild(o)});jump.appendChild(og)});
jump.onchange=()=>{if(jump.value!=='')pick(feats[jump.value])};
// ---------- FEATURE EXPLORER ----------
const featureSearch = $('#featureSearch');
const featureCategory = $('#featureCategory');
const featureResults = $('#featureResults');

function renderFeatureResults() {
    const query = featureSearch.value.trim().toLowerCase();
    const category = featureCategory.value;

    const matches = feats.filter(f => {
        const matchesQuery =
            f.name.toLowerCase().includes(query) ||
            f.description.toLowerCase().includes(query);

        const matchesCategory =
            category === 'all' || f.type === category;

        return matchesQuery && matchesCategory;
    });

    featureResults.replaceChildren();

    if (matches.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No matching lunar features found.';
        featureResults.appendChild(message);
        return;
    }

    matches.forEach(f => {
        const item = document.createElement('button');
        item.className = 'feature-result';
        item.type = 'button';
        item.textContent = f.name + ' · ' + fmt(f.lat, f.lon);
        item.addEventListener('click', () => pick(f));
        featureResults.appendChild(item);
    });
}

featureSearch.addEventListener('input', renderFeatureResults);
featureCategory.addEventListener('change', renderFeatureResults);

renderFeatureResults();
$('#ex').oninput=e=>setEx(+e.target.value);
$('#grid').onchange=e=>grid.visible=e.target.checked;
if(innerWidth<700)$('#panel').open=false;
const info=$('#info');let cur=null;
const home='<h2>Earth’s Moon</h2><div class="s">Mean radius 1,737 km · gravity 1.62 m/s² · mean distance 384,400 km</div><p>Tidally locked, so the same near side always faces Earth. Drag to rotate, scroll or pinch to zoom, and tap any label to fly to it. Zoom in to reveal more names. Move the sunlight slider so the terminator crosses a region to see its relief.</p>';
info.innerHTML=home;
let rx=.1,ry=0,vx=0,vy=0,dist=4.4,tD=4.4,fly=null;

function pick(f){if(cur)cur.el.classList.remove('sel');cur=f;f.el.classList.add('sel');
info.innerHTML='<h2>'+f.name+'</h2><div class="s"><i style="background:'+COL[f.type]+'"></i>'+SN[f.type]+' · '+fmt(f.lat,f.lon)+'</div><p>'+f.description+'</p>';
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
const show=on&&vis[f.type]&&(f.priority<=lvl||f===cur),o=show?Math.max(0,Math.min(1,(fc-.05)*5)):0;
if(o<.02){f.el.style.display='none';continue}
v.project(cam);f.el.style.display='';f.el.style.opacity=o;f.el.style.transform='translate('+((v.x*.5+.5)*cw-6)+'px,'+((-v.y*.5+.5)*ch-7)+'px)'}
const lat=rx/D,lon=wrap(-ry)/D;$('#hud').innerHTML='Centre '+fmt(lat,lon)+'<br>'+(Math.abs(lon)<90?'Near side (Earth-facing)':'Far side');
ren.render(scene,cam)}
frame();
