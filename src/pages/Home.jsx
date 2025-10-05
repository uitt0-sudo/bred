
import React,{useEffect,useRef,useState}from'react'
import {useApp}from'../store'
import lottie from 'lottie-web'

export default function Home(){
  const { stars, resetStars, openAuth } = useApp()
  const lRef = useRef(null)
  const [data,setData]=useState({lessons:[],books:[],games:[]})
  useEffect(()=>{ fetch('/public/data/content.json').then(r=>r.json()).then(setData) },[])
  useEffect(()=>{
    const anim = lottie.loadAnimation({ container:lRef.current, renderer:'svg', loop:true, autoplay:true, path:'/assets/anim/hero.json' })
    return ()=>anim.destroy()
  },[])
  return (
    <div>
      <section className="hero">
        <div ref={lRef} style={{position:'absolute',inset:'0',opacity:.35}} />
        <div className="container">
          <div className="grid" style={{gridTemplateColumns:'1.2fr .8fr',alignItems:'center'}}>
            <div>
              <div className="badge">Kid‑safe • No ads • Playful learning</div>
              <h1>Joyful learning that feels premium.</h1>
              <p className="muted">Interactive lessons, picture books with read‑aloud, mini‑games, and “live‑ish” shows.</p>
              <div style={{display:'flex',gap:10,marginTop:10}}>
                <a className="btn" href="/learn">Start Learning</a>
                <button className="btn ghost" onClick={()=>openAuth('signup')}>Join Free</button>
              </div>
            </div>
            <div className="panel" style={{textAlign:'center'}}>
              <img src="/assets/img/logo-bear.png" style={{width:200,height:200,borderRadius:18}}/>
              <p className="muted" style={{marginTop:10}}>“Hi! I’m Gold Bear. Let’s earn stars!”</p>
              <div className="progress"><div style={{width:(stars%10*10)+'%'}}></div></div>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:8}} className="muted">
                <span>Stars: <b>{stars}</b></span>
                <button className="btn ghost" style={{padding:'6px 10px'}} onClick={resetStars}>Reset</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Popular lessons</h2>
          <div className="grid">
            {data.lessons.slice(0,6).map(l=>(
              <div className="card" key={l.id}><img src={l.img} style={{width:'100%',borderRadius:12}}/><h3>{l.title}</h3><p className="muted">{l.desc}</p><a className="btn" href="/learn">Open</a></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Books & mini‑games</h2>
          <div className="grid">
            {data.books.slice(0,4).map(b=>(<div className="card" key={b.id}><img src={b.img} style={{width:'100%',borderRadius:12}}/><h3>{b.title}</h3><p className="muted">{b.desc}</p><a className="btn" href="/books">Read</a></div>))}
            {data.games.slice(0,4).map(g=>(<div className="card" key={g.id}><img src={g.img} style={{width:'100%',borderRadius:12}}/><h3>{g.title}</h3><p className="muted">{g.desc}</p><a className="btn" href="/games">Play</a></div>))}
          </div>
        </div>
      </section>
    </div>
  )
}
