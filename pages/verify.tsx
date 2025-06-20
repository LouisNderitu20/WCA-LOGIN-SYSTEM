import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function VerifyPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');

  useEffect(() => {
    const verifyToken = async () => {
      const token = router.query.token as string;
      if (!token) return;

      try {
        const res = await fetch(`/api/verify?token=${token}`);
        if (res.ok) {
          setStatus('success');
          setTimeout(() => router.push('/login'), 3000);
        } else {
          setStatus('failed');
        }
      } catch {
        setStatus('failed');
      }
    };

    verifyToken();
  }, [router]);

  return (
    <>
      <Head>
        <title>Email Verification | WCA Auth</title>
      </Head>

      <div style={{
        background: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          padding: '30px 30px',
          textAlign: 'center'
        }}>
          <img src="/icipe-logo.png" alt="ICIPE Logo" style={{ height: '60px', marginBottom: '20px' }} />
          {status === 'verifying' && (
            <h4 style={{ color: '#1a73e8' }}>Verifying your email...</h4>
          )}
          {status === 'success' && (
            <h4 style={{ color: '#28a745' }}>Email verified! Redirecting to login...</h4>
          )}
          {status === 'failed' && (
            <h4 style={{ color: '#dc3545' }}>Verification failed or link expired.</h4>
          )}
        </div>
      </div>
    </>
  );
}
