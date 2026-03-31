// ── K-Means Clustering Page ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';
import { KMeans } from '../ml/kmeans.js';
import { DATASETS } from '../ml/datasets.js';

export function renderKMeans(container) {
  const kmeans = new KMeans(3);
  let data = DATASETS.blobs.data;
  let animId = null;
  let isTraining = false;
  let iteration = 0;

  const clusterColors = [
    'rgba(255,255,255,0.7)', 'rgba(161,161,170,0.7)', 'rgba(245,158,11,0.7)',
    'rgba(244,63,94,0.7)', 'rgba(6,182,212,0.7)', 'rgba(212,212,216,0.7)',
    'rgba(236,72,153,0.7)', 'rgba(34,197,94,0.7)'
  ];

  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Algorithm — K-Means Clustering</span>
      <h2>K-Means Clustering</h2>
      <p>Watch how the algorithm finds natural groups in your data by moving centroids step by step until convergence.</p>
    </div>

    <div class="explainer-callout">
      <div class="callout-title">💡 How K-Means Works</div>
      <p><strong>Step 1:</strong> Place K random centroids. <strong>Step 2:</strong> Assign each point to its nearest centroid. <strong>Step 3:</strong> Move centroids to the mean of their assigned points. <strong>Repeat</strong> until centroids stop moving (convergence).</p>
    </div>

    <div class="viz-layout">
      <div class="viz-controls">
        <div class="glass-card">
          <div class="glass-card-header"><h3>⚙️ Parameters</h3></div>
          <div class="slider-group">
            <div class="slider-label">
              <span>K (Clusters)</span>
              <span class="slider-value" id="k-val">3</span>
            </div>
            <input type="range" id="k-slider" min="2" max="8" step="1" value="3">
          </div>
          <div class="slider-group">
            <div class="slider-label">
              <span>Animation Speed</span>
              <span class="slider-value" id="speed-val">Medium</span>
            </div>
            <input type="range" id="speed-slider" min="1" max="5" step="1" value="3">
          </div>
          <div class="btn-group" style="flex-wrap:wrap;">
            <button class="btn btn-primary" id="btn-run">▶ Run</button>
            <button class="btn btn-secondary" id="btn-step">⏭ Step</button>
            <button class="btn btn-secondary" id="btn-reset">↺ Reset</button>
          </div>
        </div>

        <div class="glass-card">
          <div class="glass-card-header"><h3>📊 Metrics</h3></div>
          <div class="metric-row">
            <span class="metric-label">Iteration</span>
            <span class="metric-value" id="km-iter">0</span>
          </div>
          <div class="metric-row">
            <span class="metric-label">Inertia</span>
            <span class="metric-value" id="km-inertia">—</span>
          </div>
          <div class="metric-row">
            <span class="metric-label">Status</span>
            <span class="metric-value" id="km-status">Ready</span>
          </div>
        </div>
      </div>

      <div class="glass-card viz-canvas-wrapper">
        <canvas id="km-canvas" width="700" height="500"></canvas>
      </div>

      <div class="viz-info-panel">
        <div class="glass-card">
          <div class="glass-card-header"><h3>📉 Inertia Curve</h3></div>
          <canvas id="inertia-canvas" width="260" height="160"></canvas>
        </div>
        <div class="glass-card">
          <div class="glass-card-header"><h3>🐍 Python Equivalent</h3></div>
          <div class="code-block">
            <div class="code-block-header"><span>Python</span></div>
            <pre><span class="kw">from</span> sklearn.cluster <span class="kw">import</span> <span class="fn">KMeans</span>

# Create model
kmeans = <span class="fn">KMeans</span>(n_clusters=<span class="num">3</span>)

# Fit to data
kmeans.<span class="fn">fit</span>(X)

# Get cluster labels
labels = kmeans.labels_
centroids = kmeans.cluster_centers_</pre>
          </div>
        </div>
        <div class="explainer-callout">
          <div class="callout-title">💡 What to Watch</div>
          <p>Try different values of K. When K matches the natural clusters, inertia drops rapidly. Too many clusters = overfitting, too few = underfitting!</p>
        </div>
      </div>
    </div>

    <div class="steps-section">
      <div class="steps-header">
        <span class="steps-badge">🤝 The Social Butterfly</span>
        <h3>K-Means: Finding Your Tribe</h3>
        <p>Imagine a giant party where nobody knows each other. K-Means is the algorithm that helps everyone find their friend group.</p>
      </div>

      <div class="steps-grid">
        <div class="step-card">
          <div class="step-number">1</div>
          <div class="step-icon">🤷‍♂️</div>
          <div class="step-title">The "Lonely" Start</div>
          <div class="step-body">We start with a crowd of data points that have no labels. They don't know which group they belong to. K-Means doesn't need a teacher; it just looks at <strong>how close</strong> points are to each other.</div>
          <div class="step-formula">Input: Unlabeled Raw Data</div>
        </div>

        <div class="step-card">
          <div class="step-number">2</div>
          <div class="step-icon">🚩</div>
          <div class="step-title">Choosing Group Leaders</div>
          <div class="step-body">We pick <strong>K random spots</strong> on the map to be "Group Leaders" (Centroids). At first, these leaders are placed randomly and might not be anywhere near the actual groups.</div>
          <div class="step-formula">K = Number of tribes to find</div>
        </div>

        <div class="step-card">
          <div class="step-number">3</div>
          <div class="step-icon">🏘️</div>
          <div class="step-title">Joining a Tribe</div>
          <div class="step-body">Every person (data point) looks around and joins the <strong>nearest leader's tribe</strong>. This creates our first rough version of the groups based purely on distance.</div>
          <div class="step-formula">Distance = Euclidean (Straight Line)</div>
        </div>

        <div class="step-card">
          <div class="step-number">4</div>
          <div class="step-icon">📍</div>
          <div class="step-title">Relocating the Clubhouse</div>
          <div class="step-body">Once everyone has joined a tribe, each group leader realizes they aren't in the middle of their group! They <strong>move their clubhouse</strong> to the exact average (mean) position of all their members.</div>
          <div class="step-formula">New Lead = Average(x, y) of Tribe</div>
        </div>

        <div class="step-card">
          <div class="step-number">5</div>
          <div class="step-icon">🔄</div>
          <div class="step-title">The Musical Chairs</div>
          <div class="step-body">Because the leaders moved, some people might now be closer to a <em>different</em> leader! We repeat the joining and moving steps over and over until <strong>nobody changes groups</strong> anymore.</div>
          <div class="step-formula">Repeat until Centroids stop moving</div>
        </div>

        <div class="step-card">
          <div class="step-number">6</div>
          <div class="step-icon">📏</div>
          <div class="step-title">Measuring "Tightness"</div>
          <div class="step-body">We use <strong>Inertia</strong> to see how well we did. If the tribes are "tight" (everyone is very close to their leader), inertia is low. If the tribes are spread out and messy, inertia is high.</div>
          <div class="step-formula">Inertia = Total sum of distances²</div>
        </div>
      </div>

      <div class="steps-tip">
        💡 <strong>Try it:</strong> Hit <em>▶ Run</em> and watch the centroids migrate. Use <em>⏭ Step</em> to see one iteration at a time. Change K to 2 or 5 and see how inertia changes!
      </div>
    </div>
  `;

  const canvas = document.getElementById('km-canvas');
  const ictx = document.getElementById('inertia-canvas').getContext('2d');
  const ctx = canvas.getContext('2d');
  const inertiaHistory = [];

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width - 48;
    canvas.height = Math.max(400, rect.height - 48);
    drawScene();
  }

  function getRange() {
    let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
    for (const p of data) {
      xMin = Math.min(xMin, p.features[0]); xMax = Math.max(xMax, p.features[0]);
      yMin = Math.min(yMin, p.features[1]); yMax = Math.max(yMax, p.features[1]);
    }
    const pad = 0.5;
    return { xMin: xMin - pad, xMax: xMax + pad, yMin: yMin - pad, yMax: yMax + pad };
  }

  function toScreen(x, y, range) {
    const W = canvas.width, H = canvas.height, pad = 40;
    return {
      sx: pad + (x - range.xMin) / (range.xMax - range.xMin) * (W - 2 * pad),
      sy: H - pad - (y - range.yMin) / (range.yMax - range.yMin) * (H - 2 * pad)
    };
  }

  function drawScene() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const range = getRange();

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = 40 + i * (W - 80) / 10;
      ctx.beginPath(); ctx.moveTo(x, 40); ctx.lineTo(x, H - 40); ctx.stroke();
      const y = 40 + i * (H - 80) / 10;
      ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W - 40, y); ctx.stroke();
    }

    // Data points
    for (let i = 0; i < data.length; i++) {
      const p = data[i];
      const { sx, sy } = toScreen(p.features[0], p.features[1], range);
      const colorIdx = kmeans.assignments[i] >= 0 ? kmeans.assignments[i] : (p.label || 0);
      ctx.fillStyle = clusterColors[colorIdx % clusterColors.length];
      ctx.beginPath();
      ctx.arc(sx, sy, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Centroids
    for (let c = 0; c < kmeans.centroids.length; c++) {
      const { sx, sy } = toScreen(kmeans.centroids[c][0], kmeans.centroids[c][1], range);
      ctx.shadowColor = clusterColors[c].replace('0.7', '0.8');
      ctx.shadowBlur = 15;
      ctx.fillStyle = clusterColors[c].replace('0.7', '1');
      ctx.beginPath();
      ctx.arc(sx, sy, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sx - 5, sy); ctx.lineTo(sx + 5, sy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(sx, sy - 5); ctx.lineTo(sx, sy + 5); ctx.stroke();
    }
  }

  function drawInertiaCurve() {
    const W = 260, H = 160;
    ictx.clearRect(0, 0, W, H);
    if (inertiaHistory.length < 2) return;
    const max = Math.max(...inertiaHistory) * 1.1;
    const min = Math.min(...inertiaHistory) * 0.9;
    const gradient = ictx.createLinearGradient(0, 0, W, 0);
    gradient.addColorStop(0, '#a1a1aa');
    gradient.addColorStop(1, '#06b6d4');
    ictx.strokeStyle = gradient;
    ictx.lineWidth = 2;
    ictx.beginPath();
    for (let i = 0; i < inertiaHistory.length; i++) {
      const x = 10 + i / (inertiaHistory.length - 1) * (W - 20);
      const y = H - 10 - (inertiaHistory[i] - min) / (max - min + 0.001) * (H - 20);
      if (i === 0) ictx.moveTo(x, y); else ictx.lineTo(x, y);
    }
    ictx.stroke();
  }

  function kmeansStep() {
    if (kmeans.centroids.length === 0) kmeans.initialize(data);
    const result = kmeans.step(data);
    iteration++;
    inertiaHistory.push(result.inertia);
    document.getElementById('km-iter').textContent = iteration;
    document.getElementById('km-inertia').textContent = result.inertia.toFixed(2);
    document.getElementById('km-status').textContent = result.converged ? '✅ Converged!' : '🔄 Training...';
    document.getElementById('km-status').className = 'metric-value ' + (result.converged ? 'good' : '');
    drawScene();
    drawInertiaCurve();
    return result.converged;
  }

  function runLoop() {
    if (!isTraining) return;
    const converged = kmeansStep();
    if (!converged && iteration < 100) {
      const speed = parseInt(document.getElementById('speed-slider').value);
      const delay = [800, 400, 200, 100, 30][speed - 1];
      animId = setTimeout(runLoop, delay);
    } else {
      isTraining = false;
      document.getElementById('btn-run').textContent = '▶ Run';
    }
  }

  document.getElementById('btn-run').addEventListener('click', () => {
    if (isTraining) {
      isTraining = false;
      if (animId) clearTimeout(animId);
      document.getElementById('btn-run').textContent = '▶ Run';
    } else {
      isTraining = true;
      document.getElementById('btn-run').textContent = '⏸ Pause';
      runLoop();
    }
  });

  document.getElementById('btn-step').addEventListener('click', () => {
    if (!isTraining) kmeansStep();
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    isTraining = false;
    if (animId) clearTimeout(animId);
    iteration = 0;
    inertiaHistory.length = 0;
    const k = parseInt(document.getElementById('k-slider').value);
    kmeans.reset(k);
    document.getElementById('btn-run').textContent = '▶ Run';
    document.getElementById('km-iter').textContent = '0';
    document.getElementById('km-inertia').textContent = '—';
    document.getElementById('km-status').textContent = 'Ready';
    document.getElementById('km-status').className = 'metric-value';
    drawScene();
    drawInertiaCurve();
  });

  document.getElementById('k-slider').addEventListener('input', (e) => {
    document.getElementById('k-val').textContent = e.target.value;
  });

  document.getElementById('speed-slider').addEventListener('input', (e) => {
    const labels = ['Very Slow', 'Slow', 'Medium', 'Fast', 'Very Fast'];
    document.getElementById('speed-val').textContent = labels[parseInt(e.target.value) - 1];
  });

  setTimeout(resizeCanvas, 50);
  window.addEventListener('resize', resizeCanvas);

  // Quiz
  renderQuiz(container, QUIZ_DATA.kMeans);

  return () => {
    isTraining = false;
    if (animId) clearTimeout(animId);
    window.removeEventListener('resize', resizeCanvas);
  };
  renderNextLessonButton(container, 'k-means');
}
