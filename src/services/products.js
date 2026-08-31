import { supabase } from './supabase'

// Dados de demonstração isolados: usados somente enquanto o Supabase não está configurado.
export const demoProducts = [
 {id:1,slug:'perfume-noir-oud-100ml',name:'Noir Oud Intense 100ml',brand:'Maison Al Wadi',category:'Perfumaria',tag:'MAIS VENDIDO',price:349.9,oldPrice:429.9,stock:12,rating:4.9,image:'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',description:'Uma fragrância marcante com notas quentes, especiadas e um fundo amadeirado envolvente.'},
 {id:2,slug:'fone-aura-pro',name:'Fone Aura Pro ANC',brand:'Soundlab',category:'Eletrônicos',tag:'NOVO',price:289.9,oldPrice:359.9,stock:8,rating:4.8,image:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85',description:'Som imersivo, cancelamento de ruído e até 32 horas de bateria.'},
 {id:3,slug:'serum-glow-c',name:'Sérum Glow C 30ml',brand:'Lumina',category:'Cosméticos',tag:'OFERTA',price:79.9,oldPrice:109.9,stock:21,rating:4.7,image:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=85',description:'Sérum facial leve com textura de rápida absorção e acabamento luminoso.'},
 {id:4,slug:'smartwatch-pulse-s2',name:'Smartwatch Pulse S2',brand:'Nexio',category:'Eletrônicos',tag:'OFERTA',price:399.9,oldPrice:499.9,stock:6,rating:4.8,image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',description:'Tela AMOLED, monitoramento de saúde e design leve para todos os dias.'},
 {id:5,slug:'eau-de-lumiere-80ml',name:'Eau de Lumière 80ml',brand:'Maison Belle',category:'Perfumaria',tag:'NOVO',price:459.9,oldPrice:529.9,stock:9,rating:4.9,image:'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',description:'Floral sofisticado com saída cítrica e um rastro delicadamente almiscarado.'},
 {id:6,slug:'carregador-flux-gan',name:'Carregador Flux GaN 65W',brand:'Voltz',category:'Acessórios',tag:'MAIS VENDIDO',price:149.9,oldPrice:189.9,stock:18,rating:4.9,image:'https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=900&q=85',description:'Carregamento rápido e seguro em formato compacto com duas portas.'},
 {id:7,slug:'lip-oil-rose',name:'Lip Oil Rosé',brand:'Lumina',category:'Cosméticos',tag:'NOVO',price:49.9,oldPrice:59.9,stock:0,rating:4.6,image:'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=85',description:'Brilho confortável e hidratação com toque de cor natural.'},
 {id:8,slug:'capa-clear-magsafe',name:'Capa Clear MagSafe',brand:'CoverLab',category:'Acessórios',tag:'OFERTA',price:69.9,oldPrice:89.9,stock:32,rating:4.7,image:'https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&w=900&q=85',description:'Proteção transparente com encaixe preciso e compatibilidade magnética.'}
]

export async function getProducts(filters={}) {
 if (!supabase) return demoProducts.filter(p => !filters.category || p.category === filters.category)
 let query = supabase.from('products').select('*, brand:brands(name), images:product_images(url,is_cover)').eq('active',true)
 if(filters.category) query = query.eq('category_name', filters.category)
 const {data,error}=await query.order('created_at',{ascending:false})
 if(error) throw error
 return data.map(p=>({...p,brand:p.brand?.name,image:p.images?.find(i=>i.is_cover)?.url||p.images?.[0]?.url}))
}
