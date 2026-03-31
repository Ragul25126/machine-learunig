// ── Login Page (Production) ────────────────────────────────────────────────────
const SESSION_KEY = 'mlvizlab_user';

/** Read the current session from localStorage */
export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch { return null; }
}

/** Save a new session to localStorage */
function saveSession(name, email, plan = 'Free') {
  const session = { name, email, plan, loggedIn: true, loginTime: Date.now() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  // Update sidebar immediately without reload
  updateSidebarUser(session);
}

/** Clear session (logout) */
export function logout() {
  localStorage.removeItem(SESSION_KEY);
  updateSidebarUser(null);
  if (window.__app) window.__app.navigate('login');
}

/** Update sidebar user capsule with session data */
function updateSidebarUser(session) {
  const nameEl       = document.getElementById('sidebar-user-name');
  const roleEl       = document.getElementById('sidebar-user-role');
  const avatarEl     = document.getElementById('user-avatar-initials');
  const topbarAvatar = document.getElementById('topbar-user-avatar');

  if (session && session.loggedIn) {
    const name = session.name || 'Learner';
    const plan = session.plan || 'Free';
    const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    if (nameEl) nameEl.textContent = name;
    if (roleEl) roleEl.innerHTML = `${plan} Plan · <span style="color:var(--accent-emerald)">Active</span>`;
    if (avatarEl) avatarEl.textContent = initials;
    if (topbarAvatar) topbarAvatar.textContent = initials;
  } else {
    if (nameEl) nameEl.textContent = 'Guest Learner';
    if (roleEl) roleEl.innerHTML = `Free Plan · <span style="color:var(--accent-emerald)">Active</span>`;
    if (avatarEl) avatarEl.textContent = 'ML';
    if (topbarAvatar) topbarAvatar.textContent = 'ML';
  }
}

/** Show the login/signup form */
export function renderLogin(container) {
  // If already logged in, show profile instead
  const existing = getSession();
  if (existing && existing.loggedIn) {
    container.innerHTML = `
      <div class="auth-page">
        <div class="glass-card auth-card" style="text-align:center;">
          <div class="auth-logo">👤</div>
          <h2>Welcome back, ${existing.name || 'Learner'}!</h2>
          <p class="auth-subtitle">${existing.email}</p>
          <p style="color:var(--text-muted);margin:8px 0 24px;">Plan: <strong>${existing.plan || 'Free'}</strong></p>
          <button class="btn btn-primary" id="goto-dashboard-btn" style="width:100%;margin-bottom:12px;">Go to Dashboard →</button>
          <button class="btn" id="logout-btn" style="width:100%;background:rgba(244,63,94,0.15);color:var(--accent-rose);border:1px solid rgba(244,63,94,0.3);">Logout</button>
        </div>
      </div>`;
    document.getElementById('goto-dashboard-btn').addEventListener('click', () => window.__app.navigate('dashboard'));
    document.getElementById('logout-btn').addEventListener('click', logout);
    return;
  }

  container.innerHTML = `
    <div class="auth-page">
      <div class="glass-card auth-card">
        <div class="auth-logo">🧠</div>
        <h2 id="auth-title">Welcome Back</h2>
        <p class="auth-subtitle" id="auth-subtitle">Sign in to continue your ML journey</p>
        <div class="form-group" id="name-group" style="display:none;">
          <label for="login-name">Full Name</label>
          <input type="text" id="login-name" placeholder="Your name" autocomplete="name">
        </div>
        <div class="form-group">
          <label for="login-email">Email Address</label>
          <input type="email" id="login-email" placeholder="you@example.com" autocomplete="email">
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input type="password" id="login-password" placeholder="••••••••" autocomplete="current-password">
        </div>
        <button class="btn btn-primary" style="width:100%;margin-top:8px;" id="login-btn">Sign In</button>
        <p style="margin-top:16px;font-size:0.8rem;color:var(--text-muted);">
          Don't have an account? <a href="#" style="color:var(--accent-blue-light);text-decoration:none;" id="signup-link">Sign Up</a>
        </p>
        <div id="login-msg" style="margin-top:12px;font-size:0.82rem;display:none;padding:10px;border-radius:8px;"></div>
      </div>
    </div>`;

  let isSignup = false;

  document.getElementById('signup-link').addEventListener('click', (e) => {
    e.preventDefault();
    isSignup = !isSignup;
    document.getElementById('auth-title').textContent      = isSignup ? 'Create Account'  : 'Welcome Back';
    document.getElementById('auth-subtitle').textContent   = isSignup ? 'Start your ML learning journey today' : 'Sign in to continue your ML journey';
    document.getElementById('login-btn').textContent       = isSignup ? 'Create Account'  : 'Sign In';
    document.getElementById('signup-link').textContent     = isSignup ? 'Sign In'          : 'Sign Up';
    document.getElementById('name-group').style.display    = isSignup ? ''                 : 'none';
  });

  document.getElementById('login-btn').addEventListener('click', () => {
    const email    = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const nameVal  = isSignup ? document.getElementById('login-name').value.trim() : '';
    const msg = document.getElementById('login-msg');

    // Validation
    if (isSignup && !nameVal) {
      showMsg(msg, 'error', 'Please enter your full name.'); return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMsg(msg, 'error', 'Please enter a valid email address.'); return;
    }
    if (!password || password.length < 6) {
      showMsg(msg, 'error', 'Password must be at least 6 characters.'); return;
    }

    // Save session
    const displayName = isSignup ? nameVal : (email.split('@')[0]);
    saveSession(displayName, email, 'Free');
    showMsg(msg, 'success', isSignup ? '✅ Account created! Redirecting...' : '✅ Logged in! Redirecting...');
    setTimeout(() => window.__app.navigate('dashboard'), 1200);
  });
}

function showMsg(el, type, text) {
  el.style.display  = 'block';
  el.style.background = type === 'error' ? 'rgba(244,63,94,0.1)' : 'rgba(161,161,170,0.1)';
  el.style.color      = type === 'error' ? 'var(--accent-rose)'  : 'var(--accent-emerald)';
  el.textContent      = text;
}
