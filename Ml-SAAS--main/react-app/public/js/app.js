// ── DECONSTRUCTING AI SYSTEMS — App Router (Production) ──────────────────────────────────────
import { renderDashboard } from './pages/dashboard.js';
import { renderLinearRegression } from './pages/linearRegression.js';
import { renderKMeans } from './pages/kmeans.js';
import { renderDecisionTree } from './pages/decisionTree.js';
import { renderNeuralNetwork } from './pages/neuralNetwork.js';
import { renderSVM } from './pages/svm.js';
import { renderDataPlayground } from './pages/dataPlayground.js';
import { renderExplainers } from './pages/explainers.js';
import { renderFoundations } from './pages/foundations.js';
import { renderDataBasics } from './pages/dataBasics.js';
import { renderDataPreprocessing } from './pages/dataPreprocessing.js';
import { renderModelEvaluation } from './pages/modelEvaluation.js';
import { renderBasicMath } from './pages/basicMath.js';
import { renderMLWorkflow } from './pages/mlWorkflow.js';
import { renderLossFunction } from './pages/lossFunction.js';
import { renderGradientDescent } from './pages/gradientDescent.js';
import { renderKNN } from './pages/knn.js';
import { renderLogisticRegression } from './pages/logisticRegression.js';
import { renderModelMetrics } from './pages/modelMetrics.js';
import { renderPricing } from './pages/pricing.js';
import { renderLogin } from './pages/login.js';

// ── Route Table ────────────────────────────────────────────────────────────────
const routes = {
  dashboard:             { render: renderDashboard,         title: 'Dashboard',          breadcrumb: 'Home → Dashboard' },
  'linear-regression':   { render: renderLinearRegression,  title: 'Linear Regression',  breadcrumb: 'Algorithms → Linear Regression' },
  'k-means':             { render: renderKMeans,            title: 'K-Means Clustering', breadcrumb: 'Algorithms → K-Means Clustering' },
  'decision-tree':       { render: renderDecisionTree,      title: 'Decision Trees',     breadcrumb: 'Algorithms → Decision Trees' },
  'neural-network':      { render: renderNeuralNetwork,     title: 'Neural Networks',    breadcrumb: 'Algorithms → Neural Networks' },
  svm:                   { render: renderSVM,               title: 'SVM',                breadcrumb: 'Algorithms → Support Vector Machines' },
  'data-playground':     { render: renderDataPlayground,    title: 'Data Playground',    breadcrumb: 'Tools → Data Playground' },
  foundations:           { render: renderFoundations,       title: 'Foundations',        breadcrumb: 'Course → Foundations' },
  'data-basics':         { render: renderDataBasics,        title: 'Data Basics',        breadcrumb: 'Course → Data Basics' },
  'data-preprocessing':  { render: renderDataPreprocessing, title: 'Data Preprocessing', breadcrumb: 'Course → Data Preprocessing' },
  'model-evaluation':    { render: renderModelEvaluation,   title: 'Model Evaluation',   breadcrumb: 'Course → Model Evaluation' },
  'basic-math':          { render: renderBasicMath,         title: 'Basic Mathematics',  breadcrumb: 'Course → Basic Mathematics' },
  'ml-workflow':         { render: renderMLWorkflow,        title: 'ML Workflow',        breadcrumb: 'Course → ML Workflow' },
  'loss-function':       { render: renderLossFunction,      title: 'Loss Functions',     breadcrumb: 'Course → Loss Functions' },
  'gradient-descent':    { render: renderGradientDescent,   title: 'Gradient Descent',   breadcrumb: 'Course → Gradient Descent' },
  knn:                   { render: renderKNN,               title: 'K-Nearest Neighbors',breadcrumb: 'Algorithms → KNN' },
  'logistic-regression': { render: renderLogisticRegression,title: 'Logistic Regression',breadcrumb: 'Algorithms → Logistic Regression' },
  'model-metrics':       { render: renderModelMetrics,      title: 'Model Metrics',      breadcrumb: 'Course → Model Metrics' },
  explainers:            { render: renderExplainers,        title: 'Explainers',         breadcrumb: 'Learn → Why Did This Happen?' },
  pricing:               { render: renderPricing,           title: 'Pricing',            breadcrumb: 'Pricing' },
  login:                 { render: renderLogin,             title: 'Login',              breadcrumb: 'Login' },
};

let currentPage = 'dashboard';
let cleanupFn = null;

// ── Loading Spinner ────────────────────────────────────────────────────────────
function showLoader(container) {
  container.innerHTML = '<div id="page-loader"><div class="spinner"></div></div>';
}

// ── Error Boundary ─────────────────────────────────────────────────────────────
function showError(container, page, err) {
  console.error(`[DECONSTRUCTING AI SYSTEMS] Failed to render page "${page}":`, err);
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;gap:16px;text-align:center;padding:2rem;">
      <div style="font-size:48px">⚠️</div>
      <h2 style="color:var(--text-primary,#fff);margin:0">Something went wrong</h2>
      <p style="color:var(--text-muted,#888);max-width:400px">
        The <strong>${page}</strong> module failed to load. Please try refreshing or navigating to another page.
      </p>
      <button onclick="window.__app.navigate('dashboard')"
        style="padding:10px 24px;border-radius:8px;border:none;background:var(--accent-blue,#6366f1);color:#fff;cursor:pointer;font-size:14px;font-weight:600;">
        ← Back to Dashboard
      </button>
    </div>`;
}

// ── 404 Fallback ───────────────────────────────────────────────────────────────
function show404(container, page) {
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;gap:16px;text-align:center;padding:2rem;">
      <div style="font-size:64px">🔍</div>
      <h2 style="color:var(--text-primary,#fff);margin:0">Page Not Found</h2>
      <p style="color:var(--text-muted,#888)">No module found for <code>"${page}"</code>.</p>
      <button onclick="window.__app.navigate('dashboard')"
        style="padding:10px 24px;border-radius:8px;border:none;background:var(--accent-blue,#6366f1);color:#fff;cursor:pointer;font-size:14px;font-weight:600;">
        ← Back to Dashboard
      </button>
    </div>`;
}

// ── Navigate ───────────────────────────────────────────────────────────────────
export function navigate(page) {
  if (cleanupFn) { try { cleanupFn(); } catch (_) {} cleanupFn = null; }

  currentPage = page;
  updateActiveNav();
  updateBreadcrumb();
  updateDocumentTitle(page);

  const mainContent = document.getElementById('page-content');
  mainContent.innerHTML = '';
  mainContent.className = 'page-content';

  const route = routes[page];
  if (!route) {
    show404(mainContent, page);
    return;
  }

  showLoader(mainContent);

  // Use setTimeout(0) to let the spinner render before heavy sync work
  setTimeout(() => {
    try {
      mainContent.innerHTML = '';
      cleanupFn = route.render(mainContent) || null;
    } catch (err) {
      showError(mainContent, page, err);
    }
  }, 0);
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function updateActiveNav() {
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    const isActive = a.dataset.page === currentPage;
    a.classList.toggle('active', isActive);
    if (isActive) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function updateBreadcrumb() {
  const bc = document.getElementById('breadcrumb');
  const route = routes[currentPage];
  if (bc && route) {
    let html = route.breadcrumb.replace(/→/g, '<span style="color:var(--text-muted);margin:0 6px" aria-hidden="true">›</span>');
    // Make Home link back to the landing page
    html = html.replace(/^Home/, '<a href="/" style="color:inherit;text-decoration:none;" class="hover-link">Home</a>');
    // Make app categories link back to the dashboard
    html = html.replace(/(Course|Algorithms|Learn|Tools)/g, (match) => {
      return `<a href="#" onclick="window.__app.navigate('dashboard');return false;" style="color:inherit;text-decoration:none;" class="hover-link">${match}</a>`;
    });
    bc.innerHTML = html;
  }
}

function updateDocumentTitle(page) {
  const route = routes[page];
  document.title = route ? `${route.title} — DECONSTRUCTING AI SYSTEMS` : 'DECONSTRUCTING AI SYSTEMS';
}

// ── Audio Feedback (Sound Effects) ───────────────────────────────────────────
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('mlviz_sound') !== 'false';
  }
  init() {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  play(type) {
    if (!this.enabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      const now = this.ctx.currentTime;
      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (_) {}
  }
  setEnabled(val) {
    this.enabled = val;
    localStorage.setItem('mlviz_sound', val);
  }
}
const sounds = new SoundManager();

// ── Interactive Dropdowns & Notifications ─────────────────────────────────────
function initDropdowns() {
  const dropdownTriggers = [
    { trigger: 'notif-dropdown-trigger',    menu: 'notif-menu' },
    { trigger: 'settings-dropdown-trigger', menu: 'settings-menu' },
    { trigger: 'profile-dropdown-trigger',  menu: 'profile-menu' }
  ];

  // Close all dropdowns
  const closeAll = () => {
    document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('open'));
    document.querySelector('.dropdown-backdrop')?.classList.remove('active');
  };

  // Add backdrop if it doesn't exist
  if (!document.querySelector('.dropdown-backdrop')) {
    const backdrop = document.createElement('div');
    backdrop.className = 'dropdown-backdrop';
    document.body.appendChild(backdrop);
    backdrop.addEventListener('click', closeAll);
  }

  const backdrop = document.querySelector('.dropdown-backdrop');

  dropdownTriggers.forEach(({ trigger, menu }) => {
    const triggerEl = document.getElementById(trigger);
    const menuEl = document.getElementById(menu);
    // Also check for the internal button since that's what's actually clicked
    const btnEl = triggerEl ? triggerEl.querySelector('.topbar-btn') : null;

    const toggle = (e) => {
      e.stopPropagation();
      const isOpen = menuEl.classList.contains('open');
      closeAll();
      if (!isOpen) {
        menuEl.classList.add('open');
        backdrop.classList.add('active');
        sounds.play('click');
      }
    };

    if (triggerEl && menuEl) triggerEl.addEventListener('click', toggle);
    if (btnEl && menuEl) btnEl.addEventListener('click', toggle);
  });

  // Prevent closing when clicking inside menu
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.addEventListener('click', (e) => e.stopPropagation());
  });
}

function renderNotifications() {
  const list = document.getElementById('notif-list');
  const dot = document.getElementById('notif-dot-spark');
  if (!list) return;

  if (mockNotifications.length === 0) {
    list.innerHTML = '<div class="empty-state">No new notifications</div>';
    if (dot) dot.style.display = 'none';
    return;
  }

  list.innerHTML = mockNotifications.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}" data-id="${n.id}">
      <div class="notif-title">${n.title}</div>
      <div class="notif-desc">${n.desc}</div>
      <div class="notif-time">${n.time}</div>
    </div>
  `).join('');

  if (dot) {
    const unreadCount = mockNotifications.filter(n => n.unread).length;
    dot.style.display = unreadCount > 0 ? 'block' : 'none';
  }
}

function initSettings() {
  const toggles = ['theme-toggle', 'sound-toggle', 'autoplay-toggle'];
  toggles.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    // Load state
    const prefKey = `mlviz_${id.replace('-toggle', '')}`;
    const state = localStorage.getItem(prefKey);
    if (state !== null) el.checked = state === 'true';

    el.addEventListener('change', () => {
      localStorage.setItem(prefKey, el.checked);
      if (id === 'theme-toggle') {
        document.documentElement.classList.toggle('dark', el.checked);
      } else if (id === 'sound-toggle') {
        sounds.setEnabled(el.checked);
      }
    });
  });

  // accessibility scaling
  const body = document.body;
  window.setTextScale = (scale) => {
    body.style.fontSize = scale === 'large' ? '18px' : scale === 'extra' ? '21px' : '15px';
    localStorage.setItem('mlviz_text_scale', scale);
  };
  const savedScale = localStorage.getItem('mlviz_text_scale');
  if (savedScale) window.setTextScale(savedScale);
}

function initProfileSync() {
  try {
    const session = JSON.parse(localStorage.getItem('mlvizlab_user') || 'null');
    if (session && session.loggedIn) {
      const name = session.name || 'Learner';
      const plan = session.plan || 'Free';
      const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

      // Update Sidebar Primary Identity
      const nameEl       = document.getElementById('sidebar-user-name');
      const roleEl       = document.getElementById('sidebar-user-role');
      const avatarEl     = document.getElementById('user-avatar-initials');
      if (nameEl) nameEl.textContent = name;
      if (roleEl) roleEl.innerHTML = `${plan} Plan · <span style="color:var(--accent-emerald)">Active</span>`;
      if (avatarEl) avatarEl.textContent = initials;

      // Update Dropdown/Topbar Identities
      const dropdownName = document.getElementById('dropdown-user-name');
      const dropdownPlan = document.querySelector('.user-plan');
      const topbarAvatar = document.getElementById('topbar-user-avatar');
      const dropdownAvatar = document.querySelector('.dropdown-user-header .user-avatar');

      if (dropdownName) dropdownName.textContent = name;
      if (dropdownPlan) dropdownPlan.textContent = `${plan} Plan`;
      
      // If user wants dynamic initials instead of static "DA"
      if (topbarAvatar && session.useInitials) topbarAvatar.textContent = initials;
      if (dropdownAvatar && session.useInitials) dropdownAvatar.textContent = initials;
    }
  } catch (_) {}

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('mlvizlab_user');
      window.location.reload();
    });
  }
}

function setLanguage(lang) {
  const translations = {
    en: { course: 'Course', algorithms: 'Algorithms', tools: 'Tools', learn: 'Learn' },
    es: { course: 'Cursos', algorithms: 'Algoritmos', tools: 'Herramientas', learn: 'Aprender' },
    hi: { course: 'पाठ्यक्रम', algorithms: 'कलन विधि', tools: 'उपकरण', learn: 'सीखें' }
  };
  const t = translations[lang] || translations.en;
  
  // Update section headers
  document.querySelectorAll('.sidebar-section-header').forEach(header => {
    const key = header.textContent.toLowerCase().trim();
    if (t[key]) header.textContent = t[key];
  });
  
  localStorage.setItem('mlviz_lang', lang);
}
window.setLanguage = setLanguage;

// ── Init ───────────────────────────────────────────────────────────────────────
function initApp() {
  // Initialize Custom Modules & Session
  initProfileSync();

  // Sidebar nav click handlers
  document.querySelectorAll('.sidebar-nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(a.dataset.page);
    });
  });

  // Mobile menu toggle
  const menuBtn = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Search: filter sidebar nav items
  const searchInput = document.getElementById('topbar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      document.querySelectorAll('.sidebar-nav a').forEach(a => {
        const text = a.textContent.toLowerCase();
        a.parentElement.style.display = (!q || text.includes(q)) ? '' : 'none';
      });
    });
  }

  // Initialize Custom Modules
  initDropdowns();
  initSettings();
  renderNotifications();

  // Start on dashboard
  navigate('dashboard');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
