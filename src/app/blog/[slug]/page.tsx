import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import { getPosts, dateLabel } from '@/lib/posts';

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPosts().find((entry) => entry.slug === slug);
  return { title: post?.title || 'Article not found', description: post?.excerpt };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getPosts();
  const post = posts.find((entry) => entry.slug === slug);
  if (!post) notFound();
  const related = posts.filter((entry) => entry.slug !== slug).slice(0, 2);

  return (
    <main id="main" className="container page-main article">
      <Link className="text-link" href="/blog"><ArrowLeft aria-hidden="true" /> All articles</Link>
      <div><span className="eyebrow">{post.category}</span></div>
      <h1 className="page-heading">{post.title}</h1>
      <div className="article-meta">
        <time dateTime={post.date}>{dateLabel(post.date)}</time>{post.author && ` · ${post.author}`}
      </div>
      <img className="article-image" src={post.image} alt="" width={800} height={500} />
      <article className="prose"><Markdown>{post.body}</Markdown></article>
      {related.length > 0 && (
        <aside className="related">
          <h2>Keep reading</h2>
          {related.map((entry) => (
            <Link href={`/blog/${entry.slug}`} key={entry.slug}>{entry.title} <ArrowUpRight aria-hidden="true" /></Link>
          ))}
        </aside>
      )}
    </main>
  );
}
