import { useState } from 'react';
import { useAdminSession } from '../../hooks/useAdminSession';
import Login from './Login';
import Leads from './Leads';
import Images from './Images';

type AdminTab = 'leads' | 'images';

const TAB_LABELS: Record<AdminTab, string> = {
  leads:  '📋 Prospectos',
  images: '🖼️ Imágenes',
};

const Admin = () => {
  const { session, loading, signIn, signOut } = useAdminSession();
  const [activeTab, setActiveTab] = useState<AdminTab>('leads');

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          color: '#94a3b8',
          fontSize: '0.95rem',
        }}
      >
        Verificando sesión...
      </div>
    );
  }

  if (!session) {
    return <Login signIn={signIn} />;
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div>
          <h1 style={{ color: '#f1f5f9', fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>
            ⚙️ Panel de Administración
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '0.25rem 0 0' }}>
            {session.user.email}
          </p>
        </div>
        <button
          onClick={() => signOut()}
          style={{
            padding: '0.45rem 1rem',
            borderRadius: 8,
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#f87171',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.2)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.25rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {(Object.keys(TAB_LABELS) as AdminTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.6rem 1.2rem',
              borderRadius: '8px 8px 0 0',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #2563eb' : '2px solid transparent',
              background: activeTab === tab ? 'rgba(37,99,235,0.1)' : 'transparent',
              color: activeTab === tab ? '#60a5fa' : '#64748b',
              fontWeight: activeTab === tab ? 700 : 400,
              fontSize: '0.88rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div
        className="glass-card"
        style={{
          padding: '1.5rem',
          borderRadius: 12,
          background: '#0d121f',
          border: '1px solid rgba(37,99,235,0.15)',
        }}
      >
        {activeTab === 'leads'  && <Leads />}
        {activeTab === 'images' && <Images />}
      </div>
    </div>
  );
};

export default Admin;
