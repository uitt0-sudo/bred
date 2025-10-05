
import React,{useEffect,useState,useRef}from'react'
import Card from'../components/Card.jsx'
import Modal from'../ui/Modal.jsx'
import {useApp}from'../store'

function MemoryGame(){ const [cards,setCards]=useState(()=>{ const items=['🍌','🍎','🍇','🍓','🍊','🍉']; const d=[...items,...items].sort(()=>Math.random()-0.5); return d.map(x=>({x,open:false,done:false}))}); const [prev,setPrev]=useState(-1); const [pairs,setPairs]=useState(0); function flip(i){ if(cards[i].done||cards[i].open) return; const c=[...cards]; c[i].open=true; setCards(c); if(prev<0){ setPrev(i) } else { if(c[i].x===c[prev].x){ c[i].done=c[prev].done=true; setCards([...c]); setPrev(-1); setPairs(p=>p+1) } else { setTimeout(()=>{ c[i].open=false; c[prev].open=false; setCards([...c]); setPrev(-1) }, 650) } } } return (<div><div className='grid' style={{gridTemplateColumns:'repeat(4,1fr)'}}>{cards.map((c,i)=>(<div key={i} className='panel' onClick={()=>flip(i)} style={{height:90,display:'grid',placeItems:'center',cursor:'pointer',fontSize:28}}>{c.open||c.done?c.x:'❓'}</div>))}</div><div className='muted' style={{marginTop:8}}>Pairs: {pairs}/6</div></div>) }

function CoinCatcher(){ const ref=useRef(null); const [score,setScore]=useState(0); useEffect(()=>{ const c=ref.current; const x=c.getContext('2d'); let w=c.width=520,h=c.height=260; let p={x:250}; let coins=[]; let rId; const loop=()=>{ x.fillStyle='#0f1118'; x.fillRect(0,0,w,h); x.fillStyle='#ffd34d'; x.fillRect(p.x-30,h-20,60,10); if(Math.random()<.05) coins.push({x:Math.random()*w,y:-10,vy:2+Math.random()*2}); coins.forEach(o=>{o.y+=o.vy}); coins=coins.filter(o=>o.y<h+20); x.fillStyle='#f3b400'; coins.forEach(o=>{x.beginPath(); x.arc(o.x,o.y,6,0,Math.PI*2); x.fill(); if(Math.abs(o.x-p.x)<36 && o.y>h-30){ setScore(s=>s+1); o.y=h+99 } }); rId=requestAnimationFrame(loop) }; loop(); const onMove=e=>{ const rect=c.getBoundingClientRect(); p.x=Math.max(36,Math.min(w-36, e.clientX-rect.left)) }; c.addEventListener('mousemove', onMove); return ()=>{ cancelAnimationFrame(rId); c.removeEventListener('mousemove', onMove) } },[]); return (<div><canvas ref={ref} width='520' height='260' style={{width:'100%',background:'#0f1118',borderRadius:12}}/><div className='muted'>Score: {score}</div></div>) }

function TypingRocket(){ const words=['bear','coin','math','read','play','star','happy']; const [w,setW]=useState(words[0]); const [typed,setT]=useState(''); const [ok,setOk]=useState(0); useEffect(()=>{ setW(words[Math.floor(Math.random()*words.length)]) },[ok]); function onType(e){ const v=e.target.value; setT(v); if(v===w){ setOk(x=>x+1); setT('') } } return (<div className='panel'><div>Type: <b>{w}</b></div><input className='input' value={typed} onChange={onType} placeholder='type here'/><div className='muted'>Correct words: {ok}</div></div>) }

function DragCoins(){ const [target]=useState(25); const [tray,setTray]=useState(0); const coins=[1,5,10,25]; function drop(v){ setTray(t=>t+v) } return (<div className='grid' style={{gridTemplateColumns:'1fr 1fr'}}><div className='panel'><h4>Drag a coin</h4><div className='row'>{coins.map(v=>(<div key={v} draggable onDragStart={e=>e.dataTransfer.setData('v',v)} className='panel' style={{width:60,height:60,display:'grid',placeItems:'center',cursor:'grab'}}>¢{v}</div>))}</div></div><div className='panel' onDragOver={e=>e.preventDefault()} onDrop={e=>drop(parseInt(e.dataTransfer.getData('v')))}><h4>Tray (target {target})</h4><div className='muted'>Total: {tray}</div></div></div>) }

function NumberLine(){ const [target]=useState(()=>Math.floor(Math.random()*20)+1); const [picked,setP]=useState(null); const w=500; function pick(e){ const rect=e.currentTarget.getBoundingClientRect(); const x=e.clientX-rect.left; const v=Math.round((x/w)*20); setP(v) } return (<div className='panel'><div className='muted'>Click the number: <b>{target}</b></div><svg width={w} height='80' onClick={pick} style={{cursor:'crosshair'}}><line x1='10' x2={w-10} y1='40' y2='40' stroke='#fff' strokeOpacity='.2'/>{Array.from({length:21}).map((_,i)=>{const x=10+(w-20)*(i/20);return(<g key={i}><line x1={x} x2={x} y1='30' y2='50' stroke='#fff' strokeOpacity='.2'/><text x={x} y='65' fontSize='10' textAnchor='middle' fill='#b8bfd8'>{i}</text></g>)})}</svg><div className='muted'>You picked: {picked!==null?picked:'…'} {picked===target?'✅':''}</div></div>) }

function WordBuilder(){ const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); const target='BEAR'; const [word,setW]=useState(''); function add(l){ setW(w=> (w+l).slice(0,5)) } return (<div className='panel'><div>Make the word: <b>{target}</b></div><div className='grid' style={{gridTemplateColumns:'repeat(13,1fr)'}}>{letters.map(l=>(<button key={l} className='btn' onClick={()=>add(l)}>{l}</button>))}</div><div className='muted'>Your word: {word} {word===target?'✅':''}</div></div>) }

export default function Games(){
  const [items,setItems]=useState([]); const [open,setOpen]=useState(null); const {gainStar,play}=useApp()
  useEffect(()=>{ fetch('/public/data/content.json').then(r=>r.json()).then(d=>setItems(d['games'])) },[])
  return (<div><h2>Games</h2><div className='grid'>{items.map(it=><Card key={it.id} item={it} onOpen={()=>setOpen(it)} cta='Play'/>)}</div>
  <Modal open={!!open} title={open?.title} onClose={()=>setOpen(null)}>
    {open?.id==='memory' && <MemoryGame/>}
    {open?.id==='coins' && <CoinCatcher/>}
    {open?.id==='typing' && <TypingRocket/>}
    {open?.id==='dragcoins' && <DragCoins/>}
    {open?.id==='numberline' && <NumberLine/>}
    {open?.id==='wordbuilder' && <WordBuilder/>}
    {open && <div style={{marginTop:10}}><button className='btn' onClick={()=>{gainStar();play('success');alert('⭐ Nice play!')}}>Claim Star</button></div>}
  </Modal></div>)
}
