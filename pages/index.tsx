import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMessage(res.ok ? ` ${data.message}` : ` ${data.error}`);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <img src="/icipe-logo.png" alt="ICIPE Logo" className="logo" />
        <title>WCA ICIPE | Register Here.</title>
        <h1>Welcome to WCA ICIPE. Register Here</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
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
          <button type="submit" className="button">Register</button>
          {message && (
          <p className="status-message" style={{ marginBottom: '10px', color: 'green' }}>
              {message}
          </p>
              )}
        </form>
      </div>
    </div>
  );
}
