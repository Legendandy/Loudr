import type { Metadata } from 'next';
import { Navigation, Footer } from '@/components/shell';
import './globals.css';
export const metadata: Metadata = { metadataBase: new URL('https://loudr.me'), title: { default: 'Loudr — Get your music heard on TikTok', template: '%s | Loudr' }, description: 'Get your music used in more TikTok posts and put your sound in front of more potential listeners.', icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }], shortcut: '/icon.svg' } };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Navigation />{children}<Footer /></body></html>; }
