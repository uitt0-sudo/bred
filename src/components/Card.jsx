import React from'react'
export default function Card({item,onOpen,cta='Open'}){return(<div className='card'><img src={item.img} alt={item.title} style={{width:'100%',borderRadius:12}}/><h3>{item.title}</h3><p className='muted'>{item.desc}</p><button className='btn' onClick={()=>onOpen&&onOpen(item)}>{cta}</button></div>)}
