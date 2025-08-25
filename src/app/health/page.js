"use client";
import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/api';

export default function HealthPage() {
  const [state, setState] = useState({ loading: true });

  useEffect(() => {
    let mounted = true;
    apiFetch('/api/health')
      .then((d) => mounted && setState({ loading: false, data: d }))
      .catch((err) => mounted && setState({ loading: false, error: err.message || String(err) }));
    return () => (mounted = false);
  }, []);

  if (state.loading) return <div>Checking backend...</div>;
  if (state.error) return <div>Error: {state.error}</div>;
  return (
    <div>
      <h2>Backend Health</h2>
      <pre>{JSON.stringify(state.data, null, 2)}</pre>
    </div>
  );
}
