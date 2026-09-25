import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
export type Post={slug:string;title:string;category:string;date:string;image:string;excerpt:string;author?:string;body:string};
export function getPosts():Post[]{const directory=path.join(process.cwd(),'content/blog');if(!fs.existsSync(directory))return [];return fs.readdirSync(directory).filter(f=>f.endsWith('.md')).flatMap(file=>{const {data,content}=matter(fs.readFileSync(path.join(directory,file),'utf8'));if(data.draft)return [];return [{slug:file.replace(/\.md$/,''),title:String(data.title),category:String(data.category),date:new Date(data.date).toISOString(),image:String(data.image||'/images/music-discovery.svg'),excerpt:String(data.excerpt||''),author:data.author?String(data.author):undefined,body:content}]}).sort((a,b)=>b.date.localeCompare(a.date))}
export function dateLabel(date:string){return new Intl.DateTimeFormat('en',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(new Date(date))}
