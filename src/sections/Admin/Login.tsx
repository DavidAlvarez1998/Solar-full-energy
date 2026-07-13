import { useState } from 'react';
import type { AdminSession } from '../../hooks/useAdminSession';

interface LoginProps {
  signIn: AdminSession['signIn'];
}

const Login = ({ signIn }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const err = await signIn(email, password);
    if (err) setError(err);
    setLoading(false);
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: '70vh', padding: '2rem' }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: 420,
          padding: '2.5rem 2rem',
          borderRadius: 16,
          background: '#0d121f',
          border: '1px solid rgba(37,99,235,0.2)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⚙️</div>
          <h1 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
            Panel de Administración
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '0.4rem' }}>
            Solar Full Energy
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              htmlFor="admin-email"
              style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.4rem', fontWeight: 600 }}
            >
              CORREO ELECTRÓNICO
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="username"
              placeholder="admin@solarfullenergy.com"
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f1f5f9',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="admin-password"
              style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: '0.4rem', fontWeight: 600 }}
            >
              CONTRASEÑA
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#f1f5f9',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {error && (
            <div
              style={{
                marginBottom: '1rem',
                padding: '0.65rem 0.9rem',
                borderRadius: 8,
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#f87171',
                fontSize: '0.85rem',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: 8,
              background: loading ? '#1e3a8a' : '#2563eb',
              border: 'none',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
