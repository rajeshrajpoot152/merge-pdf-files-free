'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/send-mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Fallback: If server script isn't handling it, open mail client
        setStatus('error');
        setErrorMessage(data?.error || 'Unable to deliver message automatically. You can contact us directly via email below.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Server connection not available. You can reach out directly via our email link.');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">Send Us a Message</h2>
      <p className="text-xs text-slate-500 mb-6">
        Fill out the form below and our team will get back to you promptly.
      </p>

      {status === 'success' ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
          <span className="text-3xl">🎉</span>
          <h3 className="text-base font-bold text-emerald-950">Thank You! Message Sent.</h3>
          <p className="text-xs text-emerald-800">
            Our support team has received your message and will respond within 24 business hours.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Doe"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
              Your Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-bold text-slate-700 mb-1">
              Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none bg-white transition-all"
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Partnership / Business">Partnership / Business</option>
              <option value="Privacy & Legal">Privacy & Legal</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help you today?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
            />
          </div>

          {status === 'error' && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-2">
              <p className="font-semibold">{errorMessage}</p>
              <a
                href={`mailto:hello@mergepdffilesfree.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                  `From: ${name} (${email})\n\n${message}`
                )}`}
                className="inline-block font-bold text-blue-600 hover:underline"
              >
                Click here to send directly via your default email app &rarr;
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}
