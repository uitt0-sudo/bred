
import { create } from 'zustand'
import { Howl } from 'howler'

const persisted = JSON.parse(localStorage.getItem('bnb.v10')||'{}')

const sfx = {
  click: new Howl({ src: ['/assets/sfx/click.wav'], volume: .4 }),
  coin: new Howl({ src: ['/assets/sfx/coin.wav'], volume: .5 }),
  success: new Howl({ src: ['/assets/sfx/success.wav'], volume: .6 }),
}

export const useApp = create((set,get)=>({
  user: persisted.user || null,
  stars: persisted.stars || 0,
  settings: persisted.settings || { sound:true, volume:0.7, motion:false, tts:true },
  authOpen: null,
  toast: null,
  achievements: persisted.achievements || [],
  progress: persisted.progress || {}, // { lessonId: {page: n, done: bool} }
  openAuth(mode){ set({authOpen:mode}) },
  closeAuth(){ set({authOpen:null}) },
  save(part){
    const state = { 
      user:get().user, stars:get().stars, settings:get().settings,
      achievements:get().achievements, progress:get().progress, ...part
    }
    localStorage.setItem('bnb.v10', JSON.stringify(state))
    set(part)
  },
  play(name){ const { sound, volume } = get().settings; if(!sound) return; const h=sfx[name]; if(h){ h.volume(volume); h.play() } },
  gainStar(){
    const s = Math.min(get().stars+1, 999)
    get().save({stars:s})
    if([1,5,10,20,50].includes(s)){ 
      const badge = { id:'star-'+s, title:`${s} Stars`, at: Date.now() }
      get().save({ achievements:[...get().achievements, badge] })
    }
    get().play('coin')
  },
  resetStars(){ get().save({stars:0}); get().play('click') },
  showToast(text){ set({toast:text}); setTimeout(()=>set({toast:null}), 1800) },
  markProgress(id, part){ const p={...get().progress}; p[id]={...(p[id]||{}),...part}; get().save({progress:p}) },
}))
