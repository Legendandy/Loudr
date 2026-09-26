'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
function SocialIcon({platform}:{platform:'instagram'|'x'|'tiktok'}) {
 if(platform==='instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.25"/><circle className="social-icon-fill" cx="17.4" cy="6.7" r="1.1"/></svg>;
 if(platform==='x') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22H17l-4.9-6.4L6.5 22H3.4l7.3-8.4L3 2h6.4l4.4 5.8L18.9 2Zm-1.1 17.9h1.7L8.5 4H6.7l11.1 15.9Z"/></svg>;
 return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 2h3.1c.3 2.2 1.6 3.7 3.7 4.2v3.1c-1.4 0-2.7-.4-3.8-1v7.1A6.6 6.6 0 1 1 11.5 9v3.2a3.5 3.5 0 1 0 2.7 3.4V2Z"/></svg>;
}
export function Logo() { return <span className="logo">LOUDR<span className="logo-bars"><i /><i /><i /></span></span>; }
export function CTA({ children = 'Start a campaign' }: { children?: React.ReactNode }) { return <Link className="button" href="/contact">{children}<ArrowUpRight size={19} /></Link>; }
export function Navigation() {
 const pathname=usePathname();
 const [open,setOpen]=useState(false); const [scrolled,setScrolled]=useState(false);
 const links=pathname==='/'
  ?[['Home','/'],['How it works','/#how-it-works'],['How to start','/#how-to-start'],['Contact us','/contact']]
  :pathname==='/contact'
   ?[['Home','/']]
   :[['Home','/'],['Contact us','/contact']];
 useEffect(()=>{const scroll=()=>setScrolled(window.scrollY>20); scroll();window.addEventListener('scroll',scroll,{passive:true});return()=>window.removeEventListener('scroll',scroll)},[]);
 useEffect(()=>{const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[]);
 return <header className={`header ${scrolled?'scrolled':''}`}><div className="nav-wrap"><Link href="/" aria-label="Loudr home" onClick={()=>setOpen(false)}><Logo /></Link><button className="menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?<X />:<Menu />}</button><nav id="navigation" className={open?'nav open':'nav'} aria-label="Main navigation">{links.map(([label,url])=><Link key={label} href={url} onClick={()=>setOpen(false)}>{label}{label==='Contact us'&&<ArrowUpRight size={16}/>}</Link>)}</nav></div></header>
}
export function Footer(){return <footer className="footer container"><div className="footer-top"><div><Link href="/" aria-label="Loudr home"><Logo/></Link><p>More music. More discovery.</p></div><div className="footer-links">{[['Blog','/blog'],['About','/about'],['Contact','/contact'],['Privacy Policy','/privacy'],['Terms','/terms']].map(([name,url])=><Link key={name} href={url}>{name}</Link>)}</div></div><div className="footer-bottom"><span>© 2026 Loudr. All rights reserved.</span><div className="socials" aria-label="Loudr social profiles"><a href="https://www.instagram.com/loudr_1/" target="_blank" rel="noopener noreferrer" aria-label="Loudr on Instagram"><SocialIcon platform="instagram"/></a><a href="https://x.com/Loudr_1" target="_blank" rel="noopener noreferrer" aria-label="Loudr on X"><SocialIcon platform="x"/></a><a href="https://www.tiktok.com/@loudr_1" target="_blank" rel="noopener noreferrer" aria-label="Loudr on TikTok"><SocialIcon platform="tiktok"/></a></div><span className="footer-turn-up">TURN IT UP <ArrowUpRight aria-hidden="true"/></span></div></footer>}
