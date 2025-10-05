
import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
let supa = null
if(url && key){ supa = createClient(url, key) }
export function hasCloud(){ return !!supa }
export async function cloudSignup(name,email,password){
  if(!supa) throw new Error('Cloud not configured')
  const { data, error } = await supa.auth.signUp({ email, password, options:{ data:{ name } } })
  if(error) throw error; return data
}
export async function cloudLogin(email,password){
  if(!supa) throw new Error('Cloud not configured')
  const { data, error } = await supa.auth.signInWithPassword({ email, password })
  if(error) throw error; return data
}
export async function cloudUser(){
  if(!supa) return null; const { data: { user } } = await supa.auth.getUser(); return user
}
