'use client';

import { FormEvent, useEffect, useState } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState('');
  const [pending, setPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!showSuccess) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowSuccess(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [showSuccess]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus('');
    const form = event.currentTarget;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();

      if (!response.ok) {
        setStatus(result.message);
        return;
      }

      form.reset();
      setShowSuccess(true);
    } catch {
      setStatus('We couldn’t send your request. Please check your connection and try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <form className="contact-form" onSubmit={submit}>
        <div className="field">
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" autoComplete="name" placeholder="Your name" required maxLength={100} />
        </div>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} />
        </div>
        <div className="field full-field">
          <label htmlFor="artist">Artist name *</label>
          <input id="artist" name="artist" placeholder="The name behind the music" required maxLength={150} />
        </div>
        <div className="field full-field">
          <label htmlFor="sound">TikTok sound link *</label>
          <input id="sound" name="sound" type="url" placeholder="https://www.tiktok.com/music/your-song" required maxLength={2000} />
        </div>
        <div className="field">
          <label htmlFor="genre">Genre *</label>
          <input id="genre" name="genre" placeholder="All genres welcome" required maxLength={100} />
        </div>
        <div className="field">
          <label htmlFor="posts">Number of posts wanted *</label>
          <input id="posts" name="posts" type="number" min={1} max={100000} step={1} placeholder="e.g. 200" required />
        </div>
        <div className="field full-field">
          <label htmlFor="message">Campaign instructions / message</label>
          <textarea id="message" name="message" placeholder="Tell us about your sound and what you have in mind…" maxLength={5000} />
        </div>
        <div className="honey" aria-hidden="true">
          <label htmlFor="website">Leave blank</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <p className="form-note full-field">
          We’ll use these details to respond to your campaign request. <a href="/privacy">Privacy Policy</a>
        </p>
        <button className="button full-field" type="submit" disabled={pending}>
          {pending ? 'Sending…' : 'Send campaign request'}
          <ArrowUpRight size={18} />
        </button>
        {status && <p role="alert" className="form-status error full-field">{status}</p>}
      </form>

      {showSuccess && (
        <div className="contact-success-backdrop" role="presentation" onMouseDown={() => setShowSuccess(false)}>
          <section
            className="contact-success-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="contact-success-close" type="button" aria-label="Close confirmation" onClick={() => setShowSuccess(false)}>
              <X size={20} />
            </button>
            <span className="contact-success-icon" aria-hidden="true"><Check size={30} strokeWidth={2.5} /></span>
            <p className="eyebrow">REQUEST RECEIVED</p>
            <h2 id="contact-success-title">Your music is in good hands.</h2>
            <p>Thanks for reaching out. We’ve received your campaign details and will get back to you soon.</p>
            <button className="button contact-success-button" type="button" autoFocus onClick={() => setShowSuccess(false)}>
              Done
            </button>
          </section>
        </div>
      )}
    </>
  );
}
