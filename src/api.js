const API_BASE = 'http://localhost:3000/api';

export const authState = {
  getToken: () => localStorage.getItem('komorebi_jwt'),
  setToken: (token) => localStorage.setItem('komorebi_jwt', token),
  clearToken: () => localStorage.removeItem('komorebi_jwt'),
  isAuthenticated: () => !!localStorage.getItem('komorebi_jwt')
};

export const apiLogin = async (username, password) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  authState.setToken(data.token);
  return data;
};

export const fetchBookmarks = async () => {
  const res = await fetch(`${API_BASE}/bookmarks`, {
    headers: { 'Authorization': `Bearer ${authState.getToken()}` }
  });
  return res.json();
};

export const toggleBookmark = async (locationId) => {
  const res = await fetch(`${API_BASE}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.getToken()}`
    },
    body: JSON.stringify({ locationId })
  });
  return res.json();
};