import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { token } = router.query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (res.ok) {
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000); 
    } else {
      setMessage(`${data.error}`);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <img src="/icipe-logo.png" alt="ICIPE Logo" className="logo" />
        <h1>Reset Your Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
            {submitting ? 'Resetting...' : 'Reset Password'}
          </button>
          {message && <p className="status-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}
