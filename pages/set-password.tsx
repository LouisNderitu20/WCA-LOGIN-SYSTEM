import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";

export default function SetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!password || !confirm) {
      setError("Please fill in both fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/set-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
    } else {
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    }
  };

  return (
    <>
      <Head>
        <title>Set Password | WCA</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <style>{`
          body {
            font-family: 'Inter', sans-serif;
            background: #f4f6f9;
          }
          .card {
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          }
          .form-control:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
          }
        `}</style>
      </Head>

      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card w-100 text-center" style={{ maxWidth: 450 }}>
          <img
            src="/icipe-logo.png"
            alt="ICIPE Logo"
            style={{ width: 80, marginBottom: "1rem" }}
          />
          <h3 className="mb-4">Set Your Password</h3>

          {error && <div className="alert alert-danger">{error}</div>}
          {success ? (
            <div className="alert alert-success text-center">
              Password set successfully! Redirecting to login...
            </div>
          ) : (
            <>
              <div className="mb-3 text-start">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4 text-start">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary w-100"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Setting Password..." : "Set Password"}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
