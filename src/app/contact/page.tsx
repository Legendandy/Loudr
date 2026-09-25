import type { Metadata } from 'next';
import ContactForm from '@/components/contact-form';
import { Check } from 'lucide-react';
export const metadata: Metadata={title:'Start a campaign'};
export default function Contact(){return <main id="main" className="container page-main contact-layout"><div><span className="eyebrow">LET’S TURN IT UP</span><h1 className="page-heading">Start a<br/>campaign<span className="lime">.</span></h1><p className="page-lead">Tell us about the music you want to promote.</p><div className="contact-aside"><p><Check/> Real TikTok accounts</p><p><Check/> Human-powered posting</p><p><Check/> All genres welcome</p></div></div><ContactForm/></main>}
