import { createContext, useContext, useEffect, useState } from 'react'
const StoreContext=createContext()
export function StoreProvider({children}){
 const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem('ej-cart')||'[]'))
 const [favorites,setFavorites]=useState([])
 useEffect(()=>localStorage.setItem('ej-cart',JSON.stringify(cart)),[cart])
 const addToCart=(product,qty=1)=>setCart(current=>{const found=current.find(i=>i.id===product.id);return found?current.map(i=>i.id===product.id?{...i,qty:Math.min(i.qty+qty,product.stock)}:i):[...current,{...product,qty}]})
 const updateQty=(id,qty)=>setCart(c=>c.map(i=>i.id===id?{...i,qty:Math.max(1,Math.min(qty,i.stock))}:i))
 const removeItem=id=>setCart(c=>c.filter(i=>i.id!==id))
 const toggleFavorite=p=>setFavorites(f=>f.some(i=>i.id===p.id)?f.filter(i=>i.id!==p.id):[...f,p])
 const cartCount=cart.reduce((n,i)=>n+i.qty,0)
 const subtotal=cart.reduce((n,i)=>n+i.price*i.qty,0)
 return <StoreContext.Provider value={{cart,setCart,addToCart,updateQty,removeItem,cartCount,subtotal,favorites,toggleFavorite}}>{children}</StoreContext.Provider>
}
export const useStore=()=>useContext(StoreContext)
