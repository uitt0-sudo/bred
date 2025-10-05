
import { hasCloud, cloudSignup, cloudLogin, cloudUser } from './cloud'
export const api = {
  async signup(name,email,password){
    if(hasCloud()){ await cloudSignup(name,email,password); return {ok:true} }
    const db = JSON.parse(localStorage.getItem('bnb.v10.users')||'[]')
    if(db.find(u=>u.email===email)) throw new Error('Email already used')
    db.push({name,email,password,avatar:'/assets/img/logo-bear.png'})
    localStorage.setItem('bnb.v10.users', JSON.stringify(db))
    return { ok:true }
  },
  async login(email,password){
    if(hasCloud()){ const r=await cloudLogin(email,password); const user=r.user; return { ok:true, user:{name:user.user_metadata?.name||'User',email:user.email,avatar:'/assets/img/logo-bear.png'} } }
    const db = JSON.parse(localStorage.getItem('bnb.v10.users')||'[]')
    const u = db.find(x=>x.email===email && x.password===password)
    if(!u) throw new Error('Invalid credentials')
    return { ok:true, user:{name:u.name,email:u.email,avatar:u.avatar} }
  },
  async update(email,update){
    const db = JSON.parse(localStorage.getItem('bnb.v10.users')||'[]')
    const idx = db.findIndex(x=>x.email===email)
    if(idx<0) throw new Error('User not found')
    db[idx] = {...db[idx], ...update}
    localStorage.setItem('bnb.v10.users', JSON.stringify(db))
    return { ok:true, user:{name:db[idx].name,email:db[idx].email,avatar:db[idx].avatar} }
  }
}
