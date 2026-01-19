import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  // I WILL CHANGE LATER AFTER I GET THE DASHBOARD PAGE FROM GITHUB.
  //useEffect(() => {
   // if (session) {
     // router.push('https://wca-ew.icipe.org/');
   //}
  //}, [session, router]);

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
        <title>WCA ICIPE | Login Here.</title>
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
            <Link
              href="/forgot-password"
              style={{ fontSize: '14px', color: '#1a73e8', textDecoration: 'none' }}
            >
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="button">Login</button>
        </form>
        <div style={{ marginTop: '15px' }} />

        <button
          type="button"
          onClick={() => signIn('google')}
          className="button"
          style={{
            backgroundColor: '#4285F4',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google icon"
            width="30"
            height="30"
            style={{ background: 'white', borderRadius: '50%' }}
          />
          Sign in with Google
        </button>
        {message && (
        <p className="status-message" style={{ marginBottom: '10px', color: 'green' }}>
          {message}
        </p>
          )}
      </div>
    </div>
  );
}
