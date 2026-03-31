// ── Decision Tree Page ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';
import { DecisionTree } from '../ml/decisionTree.js';
import { DATASETS } from '../ml/datasets.js';

export function renderDecisionTree(container) {
  let data = DATASETS.moons.data;
  let tree = new DecisionTree(4, 2);
  let trained = false;

  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Algorithm — Decision Trees</span>
      <h2>Decision Trees</h2>
      <p>See how a decision tree splits data by asking yes/no questions about features, creating decision boundaries that carve up the feature space.</p>
    </div>

    <div class="explainer-callout">
      <div class="callout-title">💡 How Decision Trees Work</div>
      <p>A decision tree asks a series of questions like "Is Feature X ≤ 2.5?". At each step it picks the question that best separates the classes (lowest <strong>Gini impurity</strong>). The result is a tree of rules that can classify new data points.</p>
    </div>

    <div class="viz-layout">
      <div class="viz-controls">
        <div class="glass-card">
          <div class="glass-card-header"><h3>⚙️ Parameters</h3></div>
          <div class="slider-group">
            <div class="slider-label"><span>Max Depth</span><span class="slider-value" id="depth-val">4</span></div>
            <input type="range" id="depth-slider" min="1" max="10" step="1" value="4">
          </div>
          <div class="slider-group">
            <div class="slider-label"><span>Min Samples Split</span><span class="slider-value" id="minsamp-val">2</span></div>
            <input type="range" id="minsamp-slider" min="2" max="20" step="1" value="2">
          </div>
          <select id="dt-dataset" style="margin-bottom:12px;">
            <option value="moons">Two Moons</option>
            <option value="xor">XOR Pattern</option>
            <option value="iris">Iris (2D)</option>
          </select>
          <div class="btn-group" style="flex-wrap:wrap;">
            <button class="btn btn-primary" id="btn-build">🌳 Build Tree</button>
            <button class="btn btn-secondary" id="btn-dt-reset">↺ Reset</button>
          </div>
        </div>

        <div class="glass-card">
          <div class="glass-card-header"><h3>📊 Metrics</h3></div>
          <div class="metric-row"><span class="metric-label">Accuracy</span><span class="metric-value" id="dt-acc">—</span></div>
          <div class="metric-row"><span class="metric-label">Tree Depth</span><span class="metric-value" id="dt-depth">—</span></div>
          <div class="metric-row"><span class="metric-label">Nodes</span><span class="metric-value" id="dt-nodes">—</span></div>
        </div>
      </div>

      <div class="glass-card viz-canvas-wrapper">
        <canvas id="dt-canvas" width="700" height="500"></canvas>
      </div>

      <div class="viz-info-panel">
        <div class="glass-card">
          <div class="glass-card-header"><h3>🌳 Tree Structure</h3></div>
          <canvas id="tree-canvas" width="260" height="200"></canvas>
        </div>
        <div class="glass-card">
          <div class="glass-card-header"><h3>🐍 Python Equivalent</h3></div>
          <div class="code-block">
            <div class="code-block-header"><span>Python</span></div>
            <pre><span class="kw">from</span> sklearn.tree <span class="kw">import</span> <span class="fn">DecisionTreeClassifier</span>

model = <span class="fn">DecisionTreeClassifier</span>(
    max_depth=<span class="num">4</span>,
    min_samples_split=<span class="num">2</span>
)
model.<span class="fn">fit</span>(X_train, y_train)
accuracy = model.<span class="fn">score</span>(X_test, y_test)</pre>
          </div>
        </div>
        <div class="explainer-callout">
          <div class="callout-title">💡 What to Watch</div>
          <p>Increase <strong>max depth</strong> and watch the boundary get more complex. Too deep = overfitting (memorizing noise). Try the XOR dataset — it needs depth ≥ 2!</p>
        </div>
      </div>
    </div>

    <div class="steps-section">
      <div class="steps-header">
        <span class="steps-badge">🌳 The Master Questioner</span>
        <h3>Decision Trees: Sorting the Crowd</h3>
        <p>A Decision Tree is like playing a game of "20 Questions" with your data. It asks the smartest questions to find the truth.</p>
      </div>

      <div class="steps-grid">
        <div class="step-card">
          <div class="step-number">1</div>
          <div class="step-icon">🎤</div>
          <div class="step-title">The First Question</div>
          <div class="step-body">The tree starts at the <strong>Root</strong> with the entire crowd. It looks for one single yes/no question (like "Is height > 5ft?") that splits the crowd most effectively into two separate classes.</div>
          <div class="step-formula">Root Node → All Data</div>
        </div>

        <div class="step-card">
          <div class="step-number">2</div>
          <div class="step-icon">📊</div>
          <div class="step-title">Measuring "Pureness"</div>
          <div class="step-body">How do we pick the best question? We use <strong>Gini Impurity</strong>. A "Pure" group has only one type of data. The algorithm picks the question that creates the purest possible groups at each split.</div>
          <div class="step-formula">Lower Gini = Purer Group</div>
        </div>

        <div class="step-card">
          <div class="step-number">3</div>
          <div class="step-icon">✂️</div>
          <div class="step-title">Splitting the Crowd</div>
          <div class="step-body">Once a question is chosen, the crowd <strong>branches</strong> out. "Yes" goes left, "No" goes right. Each of these new groups will now be asked their <em>own</em> specific questions.</div>
          <div class="step-formula">Branching logic: IF [A] THEN [B]</div>
        </div>

        <div class="step-card">
          <div class="step-number">4</div>
          <div class="step-icon">🛑</div>
          <div class="step-title">Knowing When to Stop</div>
          <div class="step-body">We can't ask questions forever! We stop if: a group is perfectly pure, we reach the <strong>Max Depth</strong> (too many rules), or the group is too small to split further.</div>
          <div class="step-formula">Depth = Number of questions deep</div>
        </div>

        <div class="step-card">
          <div class="step-number">5</div>
          <div class="step-icon">🍃</div>
          <div class="step-title">The Leaf Verdict</div>
          <div class="step-body">The final boxes with no more questions are called <strong>Leaves</strong>. For a new data point, we just follow the rules until we hit a leaf. Whatever the majority is in that leaf, that's our prediction!</div>
          <div class="step-formula">Leaf = Prediction Result</div>
        </div>

        <div class="step-card">
          <div class="step-number">6</div>
          <div class="step-icon">📏</div>
          <div class="step-title">The Depth Tradeoff</div>
          <div class="step-body"><strong>Overfitting:</strong> A tree that is too deep asks too many weird questions ("Is your hair 12.3cm long?") and fails on new data. A "Good" tree keeps it simple and focuses on the patterns that matter.</div>
          <div class="step-formula">Bias vs Variance Balance</div>
        </div>
      </div>

      <div class="steps-tip">
        💡 <strong>Try it:</strong> Build the tree, then increase <em>Max Depth</em> and rebuild. Watch the boundary get more complex. Try switching to XOR — it's impossible with depth 1!
      </div>
    </div>
  `;

  const canvas = document.getElementById('dt-canvas');
  const treeCanvas = document.getElementById('tree-canvas');
  const ctx = canvas.getContext('2d');
  const tctx = treeCanvas.getContext('2d');
  const colors = ['rgba(255,255,255,0.7)', 'rgba(244,63,94,0.7)', 'rgba(161,161,170,0.7)'];
  const bgColors = ['rgba(255,255,255,0.08)', 'rgba(244,63,94,0.08)', 'rgba(161,161,170,0.08)'];

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
    const pad = 0.3;
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

    if (trained) {
      const resolution = 4;
      for (let px = 40; px < W - 40; px += resolution) {
        for (let py = 40; py < H - 40; py += resolution) {
          const x = range.xMin + (px - 40) / (W - 80) * (range.xMax - range.xMin);
          const y = range.yMax - (py - 40) / (H - 80) * (range.yMax - range.min);
          const cls = tree.predictBoundary(x, y);
          ctx.fillStyle = bgColors[cls % bgColors.length];
          ctx.fillRect(px, py, resolution, resolution);
        }
      }
    }

    for (const p of data) {
      const { sx, sy } = toScreen(p.features[0], p.features[1], range);
      ctx.fillStyle = colors[p.label % colors.length];
      ctx.beginPath();
      ctx.arc(sx, sy, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawTreeDiagram() {
    tctx.clearRect(0, 0, 260, 200);
    if (!tree.tree) return;
    const viz = tree.toVisualization(tree.tree, 130, 20, 0);
    tctx.strokeStyle = 'rgba(245,158,11,0.4)';
    tctx.lineWidth = 1;
    for (const edge of viz.edges) {
      const from = viz.nodes.find(n => n.id === edge.from);
      const to = viz.nodes.find(n => n.id === edge.to);
      if (from && to) {
        tctx.beginPath();
        tctx.moveTo(from.x, from.y);
        tctx.lineTo(to.x, to.y);
        tctx.stroke();
      }
    }
    for (const node of viz.nodes) {
      const r = node.type === 'leaf' ? 6 : 8;
      tctx.fillStyle = node.type === 'leaf' ? 'rgba(161,161,170,0.7)' : 'rgba(245,158,11,0.7)';
      tctx.beginPath();
      tctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      tctx.fill();
    }
  }

  function loadDataset(name) {
    if (name === 'iris') {
      data = DATASETS.iris.data.map(d => ({ features: [d.features[0], d.features[1]], label: d.label }));
    } else {
      data = DATASETS[name].data;
    }
  }

  document.getElementById('btn-build').addEventListener('click', () => {
    const maxDepth = parseInt(document.getElementById('depth-slider').value);
    const minSamples = parseInt(document.getElementById('minsamp-slider').value);
    tree = new DecisionTree(maxDepth, minSamples);
    tree.fit(data);
    trained = true;
    const acc = tree.getAccuracy(data);
    const viz = tree.toVisualization(tree.tree, 130, 20, 0);
    document.getElementById('dt-acc').textContent = (acc * 100).toFixed(1) + '%';
    document.getElementById('dt-acc').className = 'metric-value ' + (acc > 0.9 ? 'good' : acc > 0.7 ? 'warn' : 'bad');
    document.getElementById('dt-depth').textContent = maxDepth;
    document.getElementById('dt-nodes').textContent = viz.nodes.length;
    drawScene();
    drawTreeDiagram();
  });

  document.getElementById('btn-dt-reset').addEventListener('click', () => {
    tree = new DecisionTree(4, 2);
    trained = false;
    document.getElementById('dt-acc').textContent = '—';
    document.getElementById('dt-depth').textContent = '—';
    document.getElementById('dt-nodes').textContent = '—';
    drawScene();
    drawTreeDiagram();
  });

  document.getElementById('depth-slider').addEventListener('input', e => {
    document.getElementById('depth-val').textContent = e.target.value;
  });

  document.getElementById('minsamp-slider').addEventListener('input', e => {
    document.getElementById('minsamp-val').textContent = e.target.value;
  });

  document.getElementById('dt-dataset').addEventListener('change', e => {
    loadDataset(e.target.value);
    trained = false;
    tree = new DecisionTree(parseInt(document.getElementById('depth-slider').value), parseInt(document.getElementById('minsamp-slider').value));
    drawScene();
  });

  setTimeout(resizeCanvas, 50);
  window.addEventListener('resize', resizeCanvas);

  // Quiz
  renderQuiz(container, QUIZ_DATA.decisionTree);

  return () => window.removeEventListener('resize', resizeCanvas);
  renderNextLessonButton(container, 'decision-tree');
}
