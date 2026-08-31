import{MessageCircle}from'lucide-react'

// Altere VITE_WHATSAPP_NUMBER no arquivo .env para o número real da loja.
const numero=(import.meta.env.VITE_WHATSAPP_NUMBER||'5538999999999').replace(/\D/g,'')
export function criarLinkWhatsApp(produto){const pagina=window.location.href;const mensagem=produto?`Olá! Tenho interesse no produto ${produto.name}, por R$ ${produto.price.toFixed(2).replace('.',',')}. Link: ${pagina}`:`Olá! Vim pelo site da EJ Importados e gostaria de atendimento. Link: ${pagina}`;return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`}
export default function WhatsAppButton(){return <a className="whatsapp-floating" href={criarLinkWhatsApp()} target="_blank" rel="noreferrer" aria-label="Falar com a EJ Importados no WhatsApp"><MessageCircle/><span>Fale com a gente</span></a>}
