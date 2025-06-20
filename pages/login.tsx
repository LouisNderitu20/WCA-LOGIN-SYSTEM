import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage('Login successful!');
    } else {
      setMessage(data.error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <img src="/icipe-logo.png" alt="ICIPE Logo" className="logo" />
        <h1>Welcome back to WCA ICIPE. Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <div style={{ textAlign: 'right', marginBottom: '10px' }}>
            <Link href="/forgot-password" style={{ fontSize: '14px', color: '#1a73e8', textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="button">Login</button>
          {message && <p className="status-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
