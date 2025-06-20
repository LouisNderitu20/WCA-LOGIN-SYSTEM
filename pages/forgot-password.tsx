import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(res.ok ? data.message : data.error);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <img src="/icipe-logo.png" alt="ICIPE Logo" className="logo" />
        <h1>Reset Your Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="button">Send Reset Link</button>
          {message && <p className="status-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
