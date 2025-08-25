const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export async function apiFetch(path, options = {}) {
	const url = `${BASE}${path}`;
	const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
	const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
	if (token) headers['Authorization'] = `Bearer ${token}`;

	const res = await fetch(url, { ...options, headers });
	const data = await res.json().catch(() => null);
	if (!res.ok) {
		const err = new Error(data?.error || `Request failed ${res.status}`);
		err.status = res.status;
		err.data = data;
		throw err;
	}
	return data;
}

export function setToken(token) {
	if (typeof window !== 'undefined') localStorage.setItem('token', token);
}

export function clearToken() {
	if (typeof window !== 'undefined') localStorage.removeItem('token');
}
