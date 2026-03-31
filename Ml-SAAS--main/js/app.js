// ── ML Viz Lab — App Router (Production) ──────────────────────────────────────
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
  console.error(`[ML Viz Lab] Failed to render page "${page}":`, err);
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
  document.title = route ? `${route.title} — ML Viz Lab` : 'ML Viz Lab';
}

// ── Auth: Read session from localStorage & update sidebar ──────────────────────
function loadUserSession() {
  try {
    const session = JSON.parse(localStorage.getItem('mlvizlab_user') || 'null');
    if (session && session.loggedIn) {
      const name = session.name || 'Learner';
      const plan = session.plan || 'Free';
      const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

      const nameEl       = document.getElementById('sidebar-user-name');
      const roleEl       = document.getElementById('sidebar-user-role');
      const avatarEl     = document.getElementById('user-avatar-initials');
      const topbarAvatar = document.getElementById('topbar-user-avatar');

      if (nameEl) nameEl.textContent = name;
      if (roleEl) roleEl.innerHTML = `${plan} Plan · <span style="color:var(--accent-emerald)">Active</span>`;
      if (avatarEl) avatarEl.textContent = initials;
      if (topbarAvatar) topbarAvatar.textContent = initials;
    }
  } catch (_) { /* silently fail if localStorage is unavailable */ }
}

// ── Init ───────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Load user session first
  loadUserSession();

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

  // Start on dashboard
  navigate('dashboard');
});
