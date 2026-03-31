// ── Dashboard Page — Premium Redesign ──
import { getCompletedLessons, LESSON_ORDER } from '../progress.js';

export function renderDashboard(container) {
  const completed = getCompletedLessons();
  const completedCount = completed.length;
  const progressPct = Math.round((completedCount / 16) * 100);

  container.innerHTML = `

    <!-- Hero header -->

    <div class="page-header" style="
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 0;
      margin-bottom: 32px;
      position: relative;
      overflow: hidden;
      display: flex;
      box-shadow: var(--shadow-elevation);
    ">
      <!-- High-fidelity surface noise -->
      <div style="
        position:absolute; inset:0;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        opacity: 0.03; pointer-events:none;
      "></div>

      <!-- Left Column: Hero Main -->
      <div style="flex: 1.2; padding: 48px; border-right: 1px solid var(--border-subtle); position: relative; z-index: 2;">
        <div class="mono-label" style="margin-bottom: 16px; color: var(--accent-gold); opacity: 0.8;">[ CORE_V1.2 / LAB_ENV ]</div>
        <h2 style="
          font-size: 3.2rem; font-weight: 800; letter-spacing: -0.04em;
          margin-bottom: 16px; line-height: 1.0; color: var(--text-primary);
          text-transform: uppercase;
        ">See the Logic</h2>
        <p style="color:var(--text-secondary);font-size:1.1rem;line-height:1.6;max-width:500px;margin-bottom:32px;font-weight:450; opacity: 0.9;">
          Visual Intelligence through Machine Learning Architecture.
        </p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="window.__app.navigate('linear-regression')" style="
            padding: 10px 24px; font-weight: 600; 
            background: var(--accent-gold); color: #071017;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.2);
          ">
            Get Started
          </button>
          <button class="btn btn-secondary" onclick="window.__app.navigate('data-playground')" style="
            padding: 10px 24px; font-weight: 500; 
            border: 1px solid var(--border-subtle);
            background: rgba(255,255,255,0.02);
          ">
            Data Playground
          </button>
        </div>
      </div>

      <!-- Right Column: Status Terminal (Pro Tool Depth) -->
      <div style="flex: 0.8; padding: 48px; background: rgba(0,0,0,0.1); position: relative; z-index: 2; display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div class="mono-label" style="margin-bottom:12px;">SYSTEM_TELEMETRY</div>
          <div style="display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.75rem; color:var(--text-muted); font-weight:500;">Uptime:</span>
              <span class="tabular-nums" style="font-size:0.8rem; color:var(--accent-gold); font-weight:600;">99.998%</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.75rem; color:var(--text-muted); font-weight:500;">Module_Ver:</span>
              <span class="mono-label" style="opacity:1; color:var(--text-secondary);">BUILD_2026.03.24</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.75rem; color:var(--text-muted); font-weight:500;">Environment:</span>
              <span style="display:flex; align-items:center; gap:6px; font-size:0.7rem; color: #4ade80; font-weight:600;">
                <span style="width:6px; height:6px; background: #4ade80; border-radius: 50%; display:inline-block;"></span> PRODUCTION
              </span>
            </div>
          </div>
        </div>
        <div style="margin-top:auto;">
          <div class="mono-label" style="margin-bottom:8px;">BETA_ACCESS</div>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 12px; border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-muted); line-height: 1.4;">
            Advanced explainers currently in <strong style="color:var(--accent-gold)">active developement</strong>. Contact support for early access.
          </div>
        </div>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="dashboard-grid" style="margin-bottom:40px; gap: 20px;">
      <div class="glass-card stat-card" style="padding: 24px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
          <div class="mono-label">[ ID_01 ]</div>
          <div class="stat-icon" style="color: var(--accent-gold);">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          </div>
        </div>
        <div class="stat-content">
          <h4 class="stat-num tabular-nums" data-target="16" style="font-size: 1.8rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 2px;">0</h4>
          <p class="mono-label" style="opacity: 0.6; text-transform:uppercase;">Interactive Modules</p>
        </div>
      </div>

      <div class="glass-card stat-card" style="padding: 24px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
          <div class="mono-label">[ ID_02 ]</div>
          <div class="stat-icon" style="color: var(--accent-gold);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </div>
        </div>
        <div class="stat-content">
          <h4 class="stat-num tabular-nums" data-target="9" style="font-size: 1.8rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 2px;">0</h4>
          <p class="mono-label" style="opacity: 0.6; text-transform:uppercase;">Sample Datasets</p>
        </div>
      </div>

      <div class="glass-card stat-card" style="padding: 24px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
          <div class="mono-label">[ ID_03 ]</div>
          <div class="stat-icon" style="color: var(--accent-rose);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
        </div>
        <div class="stat-content">
          <h4 class="tabular-nums" style="font-size: 1.8rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 2px;">Real-Time</h4>
          <p class="mono-label" style="opacity: 0.6; text-transform:uppercase;">Training Engine</p>
        </div>
      </div>

      <div class="glass-card stat-card" style="padding: 24px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
          <div class="mono-label">[ ID_04 ]</div>
          <div class="stat-icon" style="color: var(--accent-gold);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
          </div>
        </div>
        <div class="stat-content">
          <h4 class="tabular-nums" style="font-size: 1.8rem; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 2px;">Visual</h4>
          <p class="mono-label" style="opacity: 0.6; text-transform:uppercase;">First Learning</p>
        </div>
      </div>
    </div>



    <div class="glass-card" style="margin-bottom:40px; padding:28px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
        <div>
          <div style="font-size:1.1rem;font-weight:800;letter-spacing:-0.03em; color: var(--text-primary);">Learning Progress</div>
          <div style="font-size:0.85rem;color:var(--text-muted);margin-top:4px; font-weight: 500;">${completedCount} of 16 core modules mastered</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size:1.4rem; font-weight: 800; color: var(--accent-teal);">${progressPct}%</div>
          <div style="font-size:0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px;">Completion</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(16,1fr);gap:8px;">
        ${['L1','L2','L3','L4','L5','L6','L7','L8','L9','L10','L11','L12','L13','L14','L15','L16'].map((mod, i) => {
          const lessonId = LESSON_ORDER[i];
          const isDone = completed.includes(lessonId);
          const opacity = isDone ? '1' : '0.15';
          const glow = isDone ? '0 0 0 1px rgba(244, 201, 93, 0.2)' : 'none';
          return `
          <div title="${['Foundations','Data Basics','Preprocessing','Evaluation','Basic Math','ML Workflow','Loss','Gradient','Linear Reg','Logit Reg','KNN','Metrics','K-Means','Decision Trees','Neural Nets','SVM'][i]}" style="cursor:help;">
            <div style="font-size:0.6rem;color:var(--text-muted);font-weight:700;margin-bottom:6px;text-align:center;letter-spacing:0.05em;">${mod}</div>
            <div style="height: 2px; background: rgba(0, 0, 0, 0.2); border-radius: 1px; overflow:hidden;">
              <div style="width:100%; height:100%; background:var(--accent-gold); opacity:${opacity}; transition:all 0.6s var(--ease); box-shadow:${glow};"></div>
            </div>
          </div>
        `}).join('')}
      </div>
    </div>



    <div style="display:flex;align-items:center;justify-content:space-between;margin: 40px 0 24px;">
      <div>
        <div class="mono-label" style="margin-bottom:8px;">[ COURSE_EXPLORER ]</div>
        <h3 style="font-size:1.4rem;font-weight:800;letter-spacing:-0.03em;display:flex;align-items:center;gap:12px; color: var(--text-primary);">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--accent-gold);"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
           Interactive Modules
        </h3>
      </div>

      <div style="display:flex;gap:12px;">
        <button class="btn btn-secondary" style="font-size:0.7rem;padding:6px 14px;" id="filter-all">ALL_LABS</button>
        <button class="btn btn-secondary" style="font-size:0.7rem;padding:6px 14px;" id="filter-beginner">BEGINNER</button>
        <button class="btn btn-secondary" style="font-size:0.7rem;padding:6px 14px;" id="filter-advanced">ADVANCED</button>
      </div>
    </div>



    <!-- Lesson Cards -->

    <div class="lesson-grid">

      <div class="glass-card lesson-card" data-page="foundations" data-level="beginner">
        <div class="lesson-card-preview">
          <canvas id="preview-foundations" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag beginner">Beginner</span>
          <h4>Chapter 1: Foundations</h4>
          <p>What is AI/ML? Learn the basics, types of machine learning, and how models think.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~10 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Here →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="data-basics" data-level="beginner">
        <div class="lesson-card-preview">
          <canvas id="preview-data" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag beginner">Beginner</span>
          <h4>Chapter 2: Data Basics</h4>
          <p>Learn about features, targets, and how we split data for training and testing.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~12 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="data-preprocessing" data-level="beginner">
        <div class="lesson-card-preview">
          <canvas id="preview-preproc" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag beginner">Beginner</span>
          <h4>Chapter 3: Data Preprocessing</h4>
          <p>Learn how to handle missing values, encode categories, and scale features.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~12 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="model-evaluation" data-level="beginner">
        <div class="lesson-card-preview">
          <canvas id="preview-eval" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag beginner">Beginner</span>
          <h4>Chapter 4: Model Evaluation</h4>
          <p>Master the train/test split and learn to identify overfitting vs underfitting.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~15 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="basic-math" data-level="beginner">
        <div class="lesson-card-preview">
          <canvas id="preview-math" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag beginner">Beginner</span>
          <h4>Chapter 5: Basic Mathematics</h4>
          <p>Mean, median, probability and linear equations — the simple math that powers ML models.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~12 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="ml-workflow" data-level="beginner">
        <div class="lesson-card-preview">
          <canvas id="preview-workflow" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag beginner">Beginner</span>
          <h4>Chapter 6: ML Workflow</h4>
          <p>Watch the training loop live — prediction line moves, error drops, model learns.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~12 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="loss-function" data-level="beginner">
        <div class="lesson-card-preview">
          <canvas id="preview-loss" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag beginner">Beginner</span>
          <h4>Chapter 7: Loss Functions</h4>
          <p>What is "Error"? Visualize distances and see how MSE/MAE measure model performance.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~8 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="gradient-descent" data-level="beginner">
        <div class="lesson-card-preview">
          <canvas id="preview-gd" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag beginner">Beginner</span>
          <h4>Chapter 8: Gradient Descent</h4>
          <p>The ball rolling down the hill. Watch optimization live and master the learning rate.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~10 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="linear-regression" data-level="beginner">
        <div class="lesson-card-preview">
          <canvas id="preview-lr" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag beginner">Beginner</span>
          <h4>Chapter 9: Linear Regression</h4>
          <p>Learn how a line fits data points and watch gradient descent optimize step by step.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~10 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="logistic-regression" data-level="intermediate">
        <div class="lesson-card-preview">
          <canvas id="preview-logit" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag intermediate">Intermediate</span>
          <h4>Chapter 10: Logistic Regression</h4>
          <p>Moving from lines to S-curves. Learn classification and the Sigmoid function.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~12 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="knn" data-level="beginner">
        <div class="lesson-card-preview">
          <canvas id="preview-knn" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag beginner">Beginner</span>
          <h4>Chapter 11: K-Nearest Neighbors</h4>
          <p>Birds of a feather. Predict labels based on the closest neighbors in the data.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~10 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="model-metrics" data-level="intermediate">
        <div class="lesson-card-preview">
          <canvas id="preview-metrics" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag intermediate">Intermediate</span>
          <h4>Chapter 12: Model Evaluation</h4>
          <p>Accuracy, Precision, Recall, and the Confusion Matrix. Master the metrics.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~12 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="k-means" data-level="beginner">
        <div class="lesson-card-preview">
          <canvas id="preview-km" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag beginner">Beginner</span>
          <h4>Chapter 13: K-Means Clustering</h4>
          <p>See how clusters form as centroids move iteration by iteration towards convergence.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~8 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="decision-tree" data-level="intermediate">
        <div class="lesson-card-preview">
          <canvas id="preview-dt" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag intermediate">Intermediate</span>
          <h4>Chapter 14: Decision Trees</h4>
          <p>Visualize how trees split data and create human-readable decision boundaries.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~12 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="neural-network" data-level="advanced">
        <div class="lesson-card-preview">
          <canvas id="preview-nn" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag advanced">Advanced</span>
          <h4>Chapter 15: Neural Networks</h4>
          <p>Watch activations flow through layers and weights update during backpropagation.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~15 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

      <div class="glass-card lesson-card" data-page="svm" data-level="intermediate">
        <div class="lesson-card-preview">
          <canvas id="preview-svm" width="320" height="148"></canvas>
        </div>
        <div class="lesson-card-body">
          <span class="lesson-tag intermediate">Intermediate</span>
          <h4>Chapter 16: Support Vector Machines</h4>
          <p>Find the optimal separating hyperplane and see support vectors in action.</p>
          <div class="lesson-card-footer">
            <span class="lesson-duration" style="display:inline-flex; align-items:center; gap:6px; opacity:0.6;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ~10 min
            </span>
            <span class="btn btn-secondary lesson-cta">Start Lesson →</span>
          </div>
        </div>
      </div>

    </div>



    <!-- Info strip at bottom -->

    <div style="
      margin-top:40px;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
      padding: 40px;
      display: flex; align-items: center; gap: 40px;
      box-shadow: var(--shadow-elevation);
      position: relative;
    ">
      <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); width: 64px; height: 64px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
         <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
      </div>
      <div style="flex:1;">
        <div class="mono-label" style="margin-bottom:8px;">PROFESSIONAL_LEARNING</div>
        <div style="font-size:1.2rem;font-weight:800;color:var(--text-primary);margin-bottom:4px;letter-spacing:-0.02em;">Hands-on beats reading every time</div>
        <div style="font-size:0.85rem;color:var(--text-muted); line-height: 1.6; font-weight: 500; max-width: 600px;">Each module comes with live, editable visualizations. Adjust parameters and witness behavior instantly — optimized for technical mastery.</div>
      </div>
      <button class="btn btn-primary" onclick="window.__app.navigate('pricing')" style="flex-shrink:0; padding: 12px 28px; background: var(--accent-gold); color: #071017; font-weight: 700;">
        UPGRADE_TO_PRO
      </button>
    </div>

  `;



  // Card click navigation

  container.querySelectorAll('.lesson-card[data-page]').forEach(card => {

    card.addEventListener('click', () => {

      const { navigate } = window.__app;

      navigate(card.dataset.page);

    });

  });



  // Animated number counters

  container.querySelectorAll('.stat-num').forEach(el => {

    const target = parseInt(el.dataset.target, 10);

    let current = 0;

    const step = Math.ceil(target / 20);

    const timer = setInterval(() => {

      current = Math.min(current + step, target);

      el.textContent = current;

      if (current >= target) clearInterval(timer);

    }, 50);

  });



  // Filter buttons

  const cards = container.querySelectorAll('.lesson-card');

  ['filter-all','filter-beginner','filter-advanced'].forEach(id => {

    const btn = container.querySelector(`#${id}`);

    if (!btn) return;

    btn.addEventListener('click', () => {

      container.querySelectorAll('[id^="filter-"]').forEach(b => b.classList.remove('btn-primary'));

      container.querySelectorAll('[id^="filter-"]').forEach(b => { b.classList.remove('btn-primary'); b.classList.add('btn-secondary'); });

      btn.classList.remove('btn-secondary');

      btn.classList.add('btn-primary');

      const level = id.replace('filter-','');

      cards.forEach(c => {

        const lvl = c.dataset.level;

        if (level === 'all') {

          c.style.display = '';

        } else if (level === 'beginner') {

          c.style.display = lvl === 'beginner' ? '' : 'none';

        } else {

          // advanced: show intermediate + advanced

          c.style.display = (lvl === 'advanced' || lvl === 'intermediate') ? '' : 'none';

        }

      });

    });

  });



  // Draw preview canvases

  requestAnimationFrame(() => {
    drawPreviewFoundations();
    drawPreviewData();
    drawPreviewPreproc();
    drawPreviewEval();
    drawPreviewMath();
    drawPreviewWorkflow();
    drawPreviewLoss();
    drawPreviewGD();
    drawPreviewLR();
    drawPreviewLogit();
    drawPreviewKNN();
    drawPreviewMetrics();
    drawPreviewKM();
    drawPreviewDT();
    drawPreviewNN();
    drawPreviewSVM();
  });

}

// --- NEW PREVIEW FUNCTIONS ---

function drawPreviewFoundations() {
  const canvas = document.getElementById('preview-foundations');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Scatter points (supervised)
  for(let i=0; i<8; i++) {
    ctx.beginPath();
    ctx.arc(40 + i*12, h/2 + Math.sin(i)*15, 4, 0, Math.PI*2);
    ctx.fillStyle = '#06b6d4';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.stroke();
  }
  // Scatter points (unsupervised)
  for(let i=0; i<8; i++) {
    ctx.beginPath();
    ctx.arc(w - 50 + Math.cos(i)*15, h/2 + Math.sin(i*2)*15, 4, 0, Math.PI*2);
    ctx.fillStyle = '#a1a1aa';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.stroke();
  }
}

function drawPreviewData() {
  const canvas = document.getElementById('preview-data');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Data matrix representation
  const cols = 5;
  const rows = 4;
  const cellW = 34;
  const cellH = 16;
  const mx = (w - (cols*cellW + (cols-1)*4)) / 2;
  const my = (h - (rows*cellH + (rows-1)*4)) / 2;

  for(let r=0; r<rows; r++) {
    for(let c=0; c<cols; c++) {
      ctx.fillStyle = (c === cols-1) ? 'rgba(0,255,157,0.3)' : (r === rows-1) ? 'rgba(236,72,153,0.3)' : 'rgba(255,255,255,0.1)';
      ctx.fillRect(mx + c*(cellW+4), my + r*(cellH+4), cellW, cellH);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.strokeRect(mx + c*(cellW+4), my + r*(cellH+4), cellW, cellH);
    }
  }
}

function drawPreviewPreproc() {
  const canvas = document.getElementById('preview-preproc');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const valsRaw = [18, 45, 8, 55, 12];
  const valsScaled = [20, 30, 25, 35, 22]; // normalized distribution

  ctx.fillStyle = 'rgba(236,72,153,0.4)';
  valsRaw.forEach((v, i) => {
    ctx.fillRect(30 + i*18, h - 30 - v*0.8, 10, v*0.8);
  });

  ctx.fillStyle = 'rgba(0,255,157,0.8)';
  valsScaled.forEach((v, i) => {
    ctx.fillRect(w/2 + 30 + i*18, h - 30 - v*1.2, 10, v*1.2);
  });
  
  // arrow
  ctx.fillStyle = '#fff';
  ctx.font = '16px sans-serif';
  ctx.fillText("→", w/2 - 8, h/2 + 6);
}

function drawPreviewEval() {
  const canvas = document.getElementById('preview-eval');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  ctx.beginPath();
  for(let i=20; i<w-20; i+=5) {
    const y = h - 30 - 60 * Math.exp(-(i-20)/40); // train loss goes down
    if(i===20) ctx.moveTo(i, y); else ctx.lineTo(i, y);
  }
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  for(let i=20; i<w-20; i+=5) {
    const y = h - 25 - 50 * Math.exp(-(i-20)/30) + (i>w/2 ? (i-w/2)*0.45 : 0); // test loss goes down then UP (overfit)
    if(i===20) ctx.moveTo(i, y); else ctx.lineTo(i, y);
  }
  ctx.strokeStyle = '#f43f5e';
  ctx.stroke();
}

function drawPreviewMath() {
  const canvas = document.getElementById('preview-math');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Normal distribution curve
  ctx.beginPath();
  for(let i=20; i<w-20; i+=2) {
    const x = (i - w/2) / 30;
    const y = h - 25 - 60 * Math.exp(-0.5 * x * x);
    if(i===20) ctx.moveTo(i, y); else ctx.lineTo(i, y);
  }
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Mean line
  ctx.beginPath();
  ctx.moveTo(w/2, h-25);
  ctx.lineTo(w/2, 25);
  ctx.setLineDash([4,4]);
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPreviewWorkflow() {
  const canvas = document.getElementById('preview-workflow');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const boxes = ['Data', 'Train', 'Deploy'];
  const colors = ['#0891b2', '#f472b6', '#34d399'];
  const bw = 55, bh = 24;
  
  boxes.forEach((text, i) => {
    const x = 30 + i*(bw + 25);
    const y = (h - bh)/2 - 10;
    ctx.fillStyle = colors[i];
    ctx.fillRect(x, y, bw, bh);
    ctx.fillStyle = '#fff';
    ctx.font = '11px sans-serif';
    ctx.fillText(text, x + 8, y + 16);
    
    if(i < boxes.length - 1) {
      ctx.beginPath();
      ctx.moveTo(x + bw + 4, y + bh/2);
      ctx.lineTo(x + bw + 20, y + bh/2);
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });
}

function drawPreviewLoss() {
  const canvas = document.getElementById('preview-loss');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Surface Curve (U shape)
  ctx.beginPath();
  for(let i=30; i<w-30; i+=2) {
    const x = (i - w/2) / 50;
    const y_u = h - 20 - 70 * (1 - x*x);
    if(i===30) ctx.moveTo(i, y_u); else ctx.lineTo(i, y_u);
  }
  ctx.strokeStyle = '#f43f5e';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Ball rolling
  ctx.beginPath();
  const bx = w/2 - 30;
  const bnx = (bx - w/2) / 50;
  ctx.arc(bx, h - 20 - 70 * (1 - bnx*bnx) - 6, 6, 0, Math.PI*2);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.strokeStyle = 'rgba(244,63,94,0.5)';
  ctx.stroke();
  
  // Arrow hinting movement
  ctx.beginPath();
  ctx.moveTo(bx + 8, h - 20 - 70 * (1 - bnx*bnx) - 6 + 4);
  ctx.lineTo(bx + 20, h - 20 - 70 * (1 - bnx*bnx) - 6 + 12);
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawPreviewGD() {
  const canvas = document.getElementById('preview-gd');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Contour lines
  for(let r=1; r<=4; r++) {
    ctx.beginPath();
    ctx.ellipse(w/2, h/2 - 10, r*35, r*15, 0, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(245,158,11,${0.1 + r*0.1})`;
    ctx.stroke();
  }
  
  // GD Path
  ctx.beginPath();
  ctx.moveTo(w/2 + 90, h/2 + 30);
  ctx.lineTo(w/2 + 50, h/2 + 5);
  ctx.lineTo(w/2 + 15, h/2 - 5);
  ctx.lineTo(w/2, h/2 - 10);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // Minimum
  ctx.beginPath();
  ctx.arc(w/2, h/2 - 10, 4, 0, Math.PI*2);
  ctx.fillStyle = '#f43f5e';
  ctx.fill();
}

function drawPreviewLogit() {
  const canvas = document.getElementById('preview-logit');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Decision boundary
  ctx.beginPath();
  ctx.moveTo(20, h/2 - 10);
  ctx.lineTo(w-20, h/2 - 10);
  ctx.setLineDash([4,4]);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.stroke();
  ctx.setLineDash([]);

  // S-Curve (Sigmoid)
  ctx.beginPath();
  for(let i=20; i<w-20; i+=2) {
    const x = (i - w/2) / 20;
    const y = h - 20 - (h - 40) / (1 + Math.exp(-x));
    if(i===20) ctx.moveTo(i, y); else ctx.lineTo(i, y);
  }
  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Points (Class 0)
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath(); ctx.arc(40, h-25, 5, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(70, h-22, 5, 0, Math.PI*2); ctx.fill();
  
  // Points (Class 1)
  ctx.fillStyle = '#34d399';
  ctx.beginPath(); ctx.arc(w-70, 25, 5, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(w-40, 22, 5, 0, Math.PI*2); ctx.fill();
}

function drawPreviewKNN() {
  const canvas = document.getElementById('preview-knn');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Class A
  ctx.fillStyle = '#f59e0b';
  for(let i=0; i<8; i++) {
    // Math.random replaced with deterministic pattern for stable preview
    const rx = Math.sin(i*13)*20;
    const ry = Math.cos(i*17)*20;
    ctx.beginPath(); ctx.arc(60 + rx, 50 + ry, 4, 0, Math.PI*2); ctx.fill();
  }
  // Class B
  ctx.fillStyle = '#06b6d4';
  for(let i=0; i<8; i++) {
    const rx = Math.sin(i*19)*20;
    const ry = Math.cos(i*23)*20;
    ctx.beginPath(); ctx.arc(w-80 + rx, h-50 + ry, 4, 0, Math.PI*2); ctx.fill();
  }
  
  // Target point
  const tx = w/2 - 10, ty = h/2 - 5;
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(tx, ty, 5, 0, Math.PI*2); ctx.fill();
  
  // Neighborhood Circle
  ctx.beginPath();
  ctx.arc(tx, ty, 35, 0, Math.PI*2);
  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.setLineDash([4,4]);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawPreviewMetrics() {
  const canvas = document.getElementById('preview-metrics');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // 2x2 confusion matrix
  const size = 32;
  const mx = w/2 - size;
  const my = h/2 - size - 10;

  ctx.fillStyle = 'rgba(52,211,153,0.8)'; // TP
  ctx.fillRect(mx, my, size-2, size-2);
  
  ctx.fillStyle = 'rgba(244,63,94,0.4)'; // FP
  ctx.fillRect(mx+size, my, size-2, size-2);
  
  ctx.fillStyle = 'rgba(244,63,94,0.4)'; // FN
  ctx.fillRect(mx, my+size, size-2, size-2);
  
  ctx.fillStyle = 'rgba(52,211,153,0.4)'; // TN
  ctx.fillRect(mx+size, my+size, size-2, size-2);
  
  ctx.fillStyle = '#fff';
  ctx.font = '11px sans-serif';
  ctx.fillText("TP", mx+6, my+18);
  ctx.fillText("FP", mx+size+6, my+18);
  ctx.fillText("FN", mx+6, my+size+18);
  ctx.fillText("TN", mx+size+6, my+size+18);
}



function drawPreviewLR() {

  const canvas = document.getElementById('preview-lr');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const w = canvas.width, h = canvas.height;

  ctx.clearRect(0, 0, w, h);



  // Grid lines

  ctx.strokeStyle = 'rgba(255,255,255,0.07)';

  ctx.lineWidth = 1;

  for (let x = 40; x < w; x += 50) {

    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();

  }

  for (let y = 20; y < h; y += 30) {

    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();

  }



  // Gradient fill under line

  const grad = ctx.createLinearGradient(0, 0, 0, h);

  grad.addColorStop(0, 'rgba(255,255,255,0.12)');

  grad.addColorStop(1, 'rgba(255,255,255,0)');

  ctx.beginPath();

  ctx.moveTo(20, h - 25);

  ctx.lineTo(w - 20, 30);

  ctx.lineTo(w - 20, h);

  ctx.lineTo(20, h);

  ctx.closePath();

  ctx.fillStyle = grad;

  ctx.fill();



  // Scatter points

  const pts = [];

  const seed = 42;

  for (let i = 0; i < 22; i++) {

    const t = (seed * (i + 1) * 1637) % 1000 / 1000;

    const x = 24 + t * (w - 48);

    const noise = (((seed * i * 7919) % 1000) / 1000 - 0.5) * 38;

    const y = h - 28 - (x / w) * (h - 52) + noise;

    pts.push({ x, y });

  }



  pts.forEach(({ x, y }) => {

    ctx.beginPath();

    ctx.arc(x, y, 4, 0, Math.PI * 2);

    ctx.fillStyle = '#00ff9d'; // Emerald
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';

    ctx.lineWidth = 1;

    ctx.stroke();

  });



  // Regression line
  ctx.strokeStyle = '#00ff9d'; // Emerald
  ctx.lineWidth = 3;
  ctx.shadowColor = 'rgba(0, 255, 157, 0.4)';

  ctx.shadowBlur = 8;

  ctx.beginPath();

  ctx.moveTo(20, h - 28);

  ctx.lineTo(w - 20, 32);

  ctx.stroke();

  ctx.shadowBlur = 0;

}



function drawPreviewKM() {

  const canvas = document.getElementById('preview-km');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const w = canvas.width, h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const colors = [

    { fill: 'rgba(0, 255, 157, 0.7)',  glow: 'rgba(0, 255, 157, 0.5)' },
    { fill: 'rgba(251, 191, 36, 0.7)',  glow: 'rgba(251, 191, 36, 0.5)' },
    { fill: 'rgba(244, 63, 94, 0.7)',  glow: 'rgba(244, 63, 94, 0.5)' },

  ];

  const centers = [[w * 0.22, h * 0.38], [w * 0.67, h * 0.28], [w * 0.5, h * 0.76]];

  const seeds = [17, 31, 53];



  centers.forEach((c, ci) => {

    for (let i = 0; i < 14; i++) {

      const angle = ((seeds[ci] * (i + 1) * 137) % 360) * Math.PI / 180;

      const r = ((seeds[ci] * (i + 3) * 89) % 1000) / 1000 * 52;

      const x = c[0] + Math.cos(angle) * r;

      const y = c[1] + Math.sin(angle) * r * 0.7;

      ctx.beginPath();

      ctx.arc(x, y, 3.5, 0, Math.PI * 2);

      ctx.fillStyle = colors[ci].fill;

      ctx.fill();

    }

    // centroid with glow

    ctx.shadowColor = colors[ci].glow;

    ctx.shadowBlur = 14;

    ctx.beginPath();

    ctx.arc(c[0], c[1], 8, 0, Math.PI * 2);

    ctx.fillStyle = colors[ci].fill.replace('0.7', '1');

    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.strokeStyle = 'rgba(255,255,255,0.7)';

    ctx.lineWidth = 2;

    ctx.stroke();

    // cross lines

    ctx.strokeStyle = 'rgba(255,255,255,0.5)';

    ctx.lineWidth = 1.5;

    ctx.beginPath(); ctx.moveTo(c[0] - 4, c[1]); ctx.lineTo(c[0] + 4, c[1]); ctx.stroke();

    ctx.beginPath(); ctx.moveTo(c[0], c[1] - 4); ctx.lineTo(c[0], c[1] + 4); ctx.stroke();

  });

}



function drawPreviewDT() {

  const canvas = document.getElementById('preview-dt');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const w = canvas.width, h = canvas.height;

  ctx.clearRect(0, 0, w, h);



  const nodes = [

    [w / 2, 22],

    [w / 3.2, 60], [w * 0.68, 60],

    [w * 0.18, 105], [w * 0.38, 105],

    [w * 0.58, 105], [w * 0.82, 105],

  ];



  // Draw edges

  const edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];

  edges.forEach(([from, to]) => {

    const grad = ctx.createLinearGradient(nodes[from][0], nodes[from][1], nodes[to][0], nodes[to][1]);

    grad.addColorStop(0, 'rgba(245,158,11,0.55)');

    grad.addColorStop(1, 'rgba(161,161,170,0.45)');

    ctx.strokeStyle = grad;

    ctx.lineWidth = 1.5;

    ctx.beginPath();

    ctx.moveTo(nodes[from][0], nodes[from][1]);

    ctx.lineTo(nodes[to][0], nodes[to][1]);

    ctx.stroke();

  });



  // Draw nodes

  nodes.forEach(([x, y], i) => {

    const isLeaf = i > 2;

    const color = isLeaf ? 'rgba(161,161,170,0.85)' : 'rgba(245,158,11,0.85)';

    const radius = i === 0 ? 11 : 8;

    ctx.shadowColor = isLeaf ? 'rgba(161,161,170,0.5)' : 'rgba(245,158,11,0.5)';

    ctx.shadowBlur = 10;

    ctx.beginPath();

    ctx.arc(x, y, radius, 0, Math.PI * 2);

    ctx.fillStyle = color;

    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.strokeStyle = 'rgba(255,255,255,0.3)';

    ctx.lineWidth = 1.5;

    ctx.stroke();

  });

}



function drawPreviewNN() {

  const canvas = document.getElementById('preview-nn');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const w = canvas.width, h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const layers = [3, 4, 4, 2];

  const layerX = layers.map((_, i) => 44 + i * (w - 88) / (layers.length - 1));

  const nodePositions = layers.map((count, li) => {

    const totalH = (count - 1) * 26;

    const startY = (h - totalH) / 2;

    return Array.from({ length: count }, (_, n) => [layerX[li], startY + n * 26]);

  });



  // Connections with glow

  for (let l = 0; l < nodePositions.length - 1; l++) {

    for (const from of nodePositions[l]) {

      for (const to of nodePositions[l + 1]) {

        const alpha = Math.random() * 0.15 + 0.05;

        ctx.strokeStyle = `rgba(236,72,153,${alpha})`;

        ctx.lineWidth = 1;

        ctx.beginPath();

        ctx.moveTo(from[0], from[1]);

        ctx.lineTo(to[0], to[1]);

        ctx.stroke();

      }

    }

  }



  // Nodes

  nodePositions.forEach((layer, li) => {

    const hue = 270 + li * 28;

    layer.forEach(([x, y]) => {

      ctx.shadowColor = `hsla(${hue}, 70%, 65%, 0.6)`;

      ctx.shadowBlur = 10;

      ctx.beginPath();

      ctx.arc(x, y, 6, 0, Math.PI * 2);

      ctx.fillStyle = `hsla(${hue}, 70%, 68%, 0.9)`;

      ctx.fill();

      ctx.shadowBlur = 0;

      ctx.strokeStyle = 'rgba(255,255,255,0.3)';

      ctx.lineWidth = 1;

      ctx.stroke();

    });

  });

}



function drawPreviewSVM() {

  const canvas = document.getElementById('preview-svm');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  const w = canvas.width, h = canvas.height;

  ctx.clearRect(0, 0, w, h);



  // Background zones

  const grad1 = ctx.createLinearGradient(0, 0, w / 2 - 20, 0);

  grad1.addColorStop(0, 'rgba(6,182,212,0.07)');

  grad1.addColorStop(1, 'transparent');

  ctx.fillStyle = grad1;

  ctx.fillRect(0, 0, w / 2 - 20, h);



  const grad2 = ctx.createLinearGradient(w / 2 + 20, 0, w, 0);

  grad2.addColorStop(0, 'transparent');

  grad2.addColorStop(1, 'rgba(244,63,94,0.07)');

  ctx.fillStyle = grad2;

  ctx.fillRect(w / 2 + 20, 0, w / 2, h);



  // Class A points (cyan)

  for (let i = 0; i < 14; i++) {

    const seed = (17 * (i + 1) * 1637) % 1000 / 1000;

    const seed2 = (31 * (i + 2) * 997) % 1000 / 1000;

    const x = 22 + seed * (w / 2 - 60);

    const y = 16 + seed2 * (h - 32);

    ctx.beginPath();

    ctx.arc(x, y, 4.5, 0, Math.PI * 2);

    ctx.fillStyle = 'rgba(6,182,212,0.8)';

    ctx.fill();

    ctx.strokeStyle = 'rgba(6,182,212,0.3)';

    ctx.lineWidth = 1;

    ctx.stroke();

  }



  // Class B points (rose)

  for (let i = 0; i < 14; i++) {

    const seed = (53 * (i + 1) * 1637) % 1000 / 1000;

    const seed2 = (79 * (i + 3) * 997) % 1000 / 1000;

    const x = w / 2 + 38 + seed * (w / 2 - 60);

    const y = 16 + seed2 * (h - 32);

    ctx.beginPath();

    ctx.arc(x, y, 4.5, 0, Math.PI * 2);

    ctx.fillStyle = 'rgba(244,63,94,0.8)';

    ctx.fill();

    ctx.strokeStyle = 'rgba(244,63,94,0.3)';

    ctx.lineWidth = 1;

    ctx.stroke();

  }



  // Decision boundary (glowing)

  ctx.shadowColor = 'rgba(114,227,173,0.7)';

  ctx.shadowBlur = 12;

  ctx.strokeStyle = 'rgba(114,227,173,0.95)';

  ctx.lineWidth = 2.5;

  ctx.beginPath();

  ctx.moveTo(w / 2, 8);

  ctx.lineTo(w / 2, h - 8);

  ctx.stroke();

  ctx.shadowBlur = 0;



  // Margin lines

  ctx.setLineDash([5, 4]);

  ctx.strokeStyle = 'rgba(114,227,173,0.32)';

  ctx.lineWidth = 1.2;

  ctx.beginPath(); ctx.moveTo(w / 2 - 30, 8); ctx.lineTo(w / 2 - 30, h - 8); ctx.stroke();

  ctx.beginPath(); ctx.moveTo(w / 2 + 30, 8); ctx.lineTo(w / 2 + 30, h - 8); ctx.stroke();

  ctx.setLineDash([]);

}

