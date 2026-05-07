// ============================================================
// config.js — OLS IMS Frontend
// Central config. Update API_URL after each new deployment.
// ============================================================

const CONFIG = {
  API_URL: 'https://script.google.com/macros/s/AKfycbw86DTin9sJlWjt3V1Ab9xmJjJwe7s56SYC72CD14_cHe0ZPZfBCugEWWYwlRIishe7/exec',
};

// ── Session helpers ───────────────────────────────────────

function saveSession(data) {
  sessionStorage.setItem('ols_role',       data.role);
  sessionStorage.setItem('ols_userId',     data.userId);
  sessionStorage.setItem('ols_retailerId', data.retailerId || '');
  sessionStorage.setItem('ols_name',       data.name       || '');
  sessionStorage.setItem('ols_tier',       data.tier       || '');
}

function getSession() {
  return {
    role       : sessionStorage.getItem('ols_role'),
    userId     : sessionStorage.getItem('ols_userId'),
    retailerId : sessionStorage.getItem('ols_retailerId'),
    name       : sessionStorage.getItem('ols_name'),
    tier       : sessionStorage.getItem('ols_tier'),
  };
}

function clearSession() {
  sessionStorage.clear();
}

function isLoggedIn() {
  return !!sessionStorage.getItem('ols_role');
}

function isAdmin() {
  return sessionStorage.getItem('ols_role') === 'admin';
}

// ── API helper ────────────────────────────────────────────

async function apiGet(action, params = {}) {
  const session = getSession();
  const code    = session.role === 'admin'
    ? sessionStorage.getItem('ols_code')
    : sessionStorage.getItem('ols_code');

  const query = new URLSearchParams({
    action,
    code: sessionStorage.getItem('ols_code') || '',
    ...params,
  }).toString();

  const res  = await fetch(`${CONFIG.API_URL}?${query}`);
  const data = await res.json();
  return data;
}

async function apiPost(action, body = {}) {
  const res = await fetch(CONFIG.API_URL, {
    method : 'POST',
    body   : JSON.stringify({
      action,
      code: sessionStorage.getItem('ols_code') || '',
      ...body,
    }),
  });
  const data = await res.json();
  return data;
}
function isViewer() {
  return sessionStorage.getItem('ols_role') === 'viewer';
}
function isRetailer() {
  return sessionStorage.getItem('ols_role') === 'retailer';
}