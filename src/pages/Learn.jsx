
import React,{useEffect,useState}from'react'
import Card from'../components/Card.jsx'
import Modal from'../ui/Modal.jsx'
import {useApp}from'../store'

function LessonPlayer({item,onDone}){
  const { markProgress, progress, settings } = useApp()
  const id = item.id; const pr = progress[id]||{page:0,done:false}
  const [p,setP]=useState(pr.page||0)
  useEffect(()=>{ markProgress(id,{page:p}) },[p])
  function tts(text){ if(!settings.tts) return; const u=new SpeechSynthesisUtterance(text); u.rate=1.0; u.pitch=1.05; speechSynthesis.speak(u) }
  const pages = item.pages||[]; const cur = pages[p]
  return (<div>
    <h3>{cur.h}</h3>
    <p className="muted">{cur.p}</p>
    <div className="row">
      <button className="btn ghost" onClick={()=>setP(v=>Math.max(0,v-1))}>Prev</button>
      <button className="btn" onClick={()=>setP(v=>Math.min(pages.length-1,v+1))}>Next</button>
      <button className="btn ghost" onClick={()=>tts(cur.p)}>Read aloud</button>
    </div>
    <div className="small muted" style={{marginTop:8}}>Page {p+1}/{pages.length}</div>
    {p===pages.length-1 && <div style={{marginTop:10}}><button className="btn" onClick={()=>onDone(id)}>Complete Lesson</button></div>}
  </div>)
}

export default function Learn(){
  const [items,setItems]=useState([])
  const [open,setOpen]=useState(null)
  const { gainStar, markProgress, play } = useApp()
  useEffect(()=>{ fetch('/public/data/content.json').then(r=>r.json()).then(d=>setItems(d['lessons'])) },[])
  function done(id){ markProgress(id,{done:true}); gainStar(); play('success'); alert('⭐ Lesson complete!') }
  return (<div>
    <h2>Learn</h2>
    <div className="grid">{items.map(it=><Card key={it.id} item={it} onOpen={()=>setOpen(it)}/>)}</div>
    <Modal open={!!open} title={open?.title} onClose={()=>setOpen(null)}>
      {open && <LessonPlayer item={open} onDone={done}/>}
    </Modal>
  </div>)
}
