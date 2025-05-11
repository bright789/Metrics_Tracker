const API_BASE = 'http://localhost:5000/api';

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function getTasks(token) {
  const res = await fetch(`${API_BASE}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getCommits(token) {
  const res = await fetch(`${API_BASE}/commits`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createCommit(token, data) {
  const res = await fetch(`${API_BASE}/commits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function createTask(token, data) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getPipelines(token) {
  const res = await fetch(`${API_BASE}/pipelines`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function createPipeline(token, data) {
  const res = await fetch(`${API_BASE}/pipelines`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}
