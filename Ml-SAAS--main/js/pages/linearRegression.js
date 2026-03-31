// ── Linear Regression Page ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';
import { LinearRegression } from '../ml/linearRegression.js';
import { DATASETS } from '../ml/datasets.js';



export function renderLinearRegression(container) {

  const model = new LinearRegression();

  let data = DATASETS.linear.data;

  let animId = null;

  let isTraining = false;

  let epoch = 0;



  container.innerHTML = `

    <div class="page-header">

      <span class="lesson-number">Algorithm — Linear Regression</span>

      <h2>Linear Regression</h2>

      <p>Watch how a line fits data points using gradient descent. Adjust the learning rate and see its effect on convergence.</p>

    </div>



    <div class="explainer-callout">

      <div class="callout-title">💡 What is Linear Regression?</div>

      <p>Linear regression is one of the most fundamental algorithms in machine learning. It finds the <strong>best straight line</strong> (y = wx + b) that fits your data by minimizing the total distance between the line and all data points. The algorithm iteratively adjusts the <strong>slope (w)</strong> and <strong>intercept (b)</strong> using <strong>gradient descent</strong> — a powerful optimization method that follows the steepest path downhill on the error surface until it reaches the bottom.</p>

      <p style="margin-top:10px;font-size:0.85rem;color:var(--text-muted);line-height:1.7;">

        <strong style="color:var(--accent-blue-light);">🌎 Real-World Examples:</strong> Predicting <em>house prices</em> based on square footage, estimating <em>salary</em> from years of experience, forecasting <em>sales revenue</em> from advertising spend, or predicting <em>temperature</em> trends over time. Any scenario where the relationship between input and output is approximately linear.

      </p>

    </div>



    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;">

      <div class="glass-card" style="padding:14px;text-align:center;">

        <div style="font-size:1.3rem;margin-bottom:6px;">⛰️</div>

        <div style="font-size:0.75rem;font-weight:700;color:var(--text-primary);margin-bottom:4px;">Gradient Descent</div>

        <div style="font-size:0.7rem;color:var(--text-muted);line-height:1.5;">Optimization algorithm that finds the minimum of the loss function by taking steps proportional to the negative gradient</div>

      </div>

      <div class="glass-card" style="padding:14px;text-align:center;">

        <div style="font-size:1.3rem;margin-bottom:6px;">🎛️</div>

        <div style="font-size:0.75rem;font-weight:700;color:var(--text-primary);margin-bottom:4px;">Learning Rate (α)</div>

        <div style="font-size:0.7rem;color:var(--text-muted);line-height:1.5;">Controls the step size during optimization. Too high → overshooting; too low → painfully slow convergence</div>

      </div>

      <div class="glass-card" style="padding:14px;text-align:center;">

        <div style="font-size:1.3rem;margin-bottom:6px;">🎯</div>

        <div style="font-size:0.75rem;font-weight:700;color:var(--text-primary);margin-bottom:4px;">Convergence</div>

        <div style="font-size:0.7rem;color:var(--text-muted);line-height:1.5;">The point where the model stops improving — loss stops decreasing and the line has found its optimal position</div>

      </div>

      <div class="glass-card" style="padding:14px;text-align:center;">

        <div style="font-size:1.3rem;margin-bottom:6px;">📈</div>

        <div style="font-size:0.75rem;font-weight:700;color:var(--text-primary);margin-bottom:4px;">R² Score</div>

        <div style="font-size:0.7rem;color:var(--text-muted);line-height:1.5;">Measures how well the line explains the data variance. R²=1 is perfect fit, R²=0 means no better than the average</div>

      </div>

    </div>



    <div class="viz-layout">

      <div class="viz-controls">

        <div class="glass-card">

          <div class="glass-card-header"><h3>⚙️ Parameters</h3></div>



          <div class="slider-group">

            <div class="slider-label">

              <span>Learning Rate</span>

              <span class="slider-value" id="lr-val">0.01</span>

            </div>

            <input type="range" id="lr-slider" min="0.001" max="0.1" step="0.001" value="0.01">

          </div>



          <div class="slider-group">

            <div class="slider-label">

              <span>Data Points</span>

              <span class="slider-value" id="dp-val">80</span>

            </div>

            <input type="range" id="dp-slider" min="20" max="200" step="10" value="80">

          </div>



          <div class="slider-group">

            <div class="slider-label">

              <span>Noise Level</span>

              <span class="slider-value" id="noise-val">8</span>

            </div>

            <input type="range" id="noise-slider" min="1" max="20" step="1" value="8">

          </div>



          <select id="dataset-select" style="margin-bottom:12px;">

            <option value="linear">Linear Data</option>

            <option value="quadratic">Quadratic Data</option>

          </select>



          <div class="btn-group" style="flex-wrap:wrap;">

            <button class="btn btn-primary" id="btn-train">▶ Train</button>

            <button class="btn btn-secondary" id="btn-step">⏭ Step</button>

            <button class="btn btn-secondary" id="btn-reset">↺ Reset</button>

          </div>

        </div>



        <div class="glass-card">

          <div class="glass-card-header"><h3>📊 Metrics</h3></div>

          <div class="metric-row">

            <span class="metric-label">Epoch</span>

            <span class="metric-value" id="metric-epoch">0</span>

          </div>

          <div class="metric-row">

            <span class="metric-label">Loss (MSE)</span>

            <span class="metric-value" id="metric-loss">—</span>

          </div>

          <div class="metric-row">

            <span class="metric-label">R² Score</span>

            <span class="metric-value" id="metric-r2">—</span>

          </div>

          <div class="metric-row">

            <span class="metric-label">Equation</span>

            <span class="metric-value" id="metric-eq">—</span>

          </div>

          <div class="metric-row">

            <span class="metric-label">Weight (w)</span>

            <span class="metric-value" id="metric-w">—</span>

          </div>

          <div class="metric-row">

            <span class="metric-label">Bias (b)</span>

            <span class="metric-value" id="metric-b">—</span>

          </div>

        </div>

      </div>



      <div class="glass-card viz-canvas-wrapper">

        <canvas id="lr-canvas" width="700" height="500"></canvas>

      </div>



      <div class="viz-info-panel">

        <div class="glass-card">

          <div class="glass-card-header"><h3>📉 Loss Curve</h3></div>

          <canvas id="loss-canvas" width="260" height="160"></canvas>

        </div>



        <div class="glass-card">

          <div class="glass-card-header"><h3>🐍 Python Equivalent</h3></div>

          <div class="code-block">

            <div class="code-block-header"><span>Python</span></div>

            <pre><span class="kw">from</span> sklearn.linear_model <span class="kw">import</span> <span class="fn">LinearRegression</span>



<span class="comment"># Create and train model</span>

model = <span class="fn">LinearRegression</span>()

model.<span class="fn">fit</span>(X_train, y_train)



<span class="comment"># Predictions</span>

y_pred = model.<span class="fn">predict</span>(X_test)



<span class="comment"># Evaluate</span>

<span class="kw">from</span> sklearn.metrics <span class="kw">import</span> <span class="fn">r2_score</span>

r2 = <span class="fn">r2_score</span>(y_test, y_pred)</pre>

          </div>

        </div>



        <div class="explainer-callout">

          <div class="callout-title">💡 What to Watch</div>

          <p>Notice how <strong>higher learning rates</strong> make bigger jumps but can overshoot. <strong>Lower rates</strong> are more precise but slower. Try changing the noise level to see how it affects the fit!</p>

        </div>

      </div>

    </div>



    <div class="steps-section">

      <div class="steps-header">

        <span class="steps-badge">📚 How It Works</span>

        <h3>Linear Regression — Step by Step</h3>

        <p>Understanding how a machine learns to fit a line through data using Gradient Descent</p>

      </div>

      <div class="steps-grid">

        <div class="step-card">

          <div class="step-number">1</div>

          <div class="step-icon">📦</div>

          <div class="step-title">Training vs Testing Data</div>

          <div class="step-body">We split our dataset into <strong>training data</strong> (what the model learns from) and <strong>testing data</strong> (how we measure its real-world accuracy). In linear regression, the model never sees the test set while learning.</div>

          <div class="step-formula">Dataset → 80% Train / 20% Test</div>

        </div>

        <div class="step-card">

          <div class="step-number">2</div>

          <div class="step-icon">🎲</div>

          <div class="step-title">Initialize Model</div>

          <div class="step-body">The model starts with random values for its two parameters: <strong>weight (w)</strong> — the slope of the line, and <strong>bias (b)</strong> — where it crosses the y-axis. These random values produce a bad fit at first.</div>

          <div class="step-formula">y = w·x + b &nbsp;(w=random, b=random)</div>

        </div>

        <div class="step-card">

          <div class="step-number">3</div>

          <div class="step-icon">🔮</div>

          <div class="step-title">Predict</div>

          <div class="step-body">For every training point, the model <strong>predicts</strong> a y-value using its current line equation. These predictions are compared to the actual labels to see how wrong we are.</div>

          <div class="step-formula">ŷ = w·x + b</div>

        </div>

        <div class="step-card">

          <div class="step-number">4</div>

          <div class="step-icon">📉</div>

          <div class="step-title">Calculate Loss (MSE)</div>

          <div class="step-body"><strong>Mean Squared Error</strong> measures how far the predictions are from the real values. We square the differences so large errors are penalized more. The goal is to make this number as small as possible.</div>

          <div class="step-formula">MSE = (1/n) Σ(ŷᵢ − yᵢ)²</div>

        </div>

        <div class="step-card">

          <div class="step-number">5</div>

          <div class="step-icon">⬇️</div>

          <div class="step-title">Update Weights (Gradient Descent)</div>

          <div class="step-body">We compute the <strong>gradient</strong> (slope of the loss surface) and move w and b in the direction that reduces loss. The <strong>learning rate</strong> controls how big each step is — too big and we overshoot, too small and we're slow.</div>

          <div class="step-formula">w ← w − α · ∂Loss/∂w &nbsp;|&nbsp; b ← b − α · ∂Loss/∂b</div>

        </div>

        <div class="step-card">

          <div class="step-number">6</div>

          <div class="step-icon">🔁</div>

          <div class="step-title">Repeat (Epochs)</div>

          <div class="step-body">Steps 3â5 repeat for many <strong>epochs</strong>. Each epoch the line gets a little better. You can watch the loss curve drop and the line fit the data more tightly. Training stops when the loss is small enough or a max epoch is reached.</div>

          <div class="step-formula">Repeat until Loss â 0 or Epoch = Max</div>

        </div>

      </div>

      <div class="steps-tip">

        💡 <strong>Try it:</strong> Hit <em>▶ Train</em> and watch the line rotate/slide into place. Use <em>⏭ Step</em> to see one epoch at a time. Crank up the learning rate to see it overshoot!

      </div>

    </div>

  `;



  const lrCanvas = document.getElementById('lr-canvas');

  const lossCanvas = document.getElementById('loss-canvas');

  const ctx = lrCanvas.getContext('2d');

  const lctx = lossCanvas.getContext('2d');



  function resizeCanvas() {

    const rect = lrCanvas.parentElement.getBoundingClientRect();

    lrCanvas.width = rect.width - 48;

    lrCanvas.height = Math.max(400, rect.height - 48);

    drawScene();

  }



  function getRange() {

    let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;

    for (const p of data) {

      xMin = Math.min(xMin, p.features[0]);

      xMax = Math.max(xMax, p.features[0]);

      yMin = Math.min(yMin, p.label);

      yMax = Math.max(yMax, p.label);

    }

    const xPad = (xMax - xMin) * 0.1 || 1;

    const yPad = (yMax - yMin) * 0.1 || 1;

    return { xMin: xMin - xPad, xMax: xMax + xPad, yMin: yMin - yPad, yMax: yMax + yPad };

  }



  function toScreen(x, y, range) {

    const W = lrCanvas.width, H = lrCanvas.height;

    const pad = 40;

    return {

      sx: pad + (x - range.xMin) / (range.xMax - range.xMin) * (W - 2 * pad),

      sy: H - pad - (y - range.yMin) / (range.yMax - range.yMin) * (H - 2 * pad)

    };

  }



  function drawScene() {

    const W = lrCanvas.width, H = lrCanvas.height;

    ctx.clearRect(0, 0, W, H);

    const range = getRange();



    // Grid

    ctx.strokeStyle = 'rgba(255,255,255,0.04)';

    ctx.lineWidth = 1;

    for (let i = 0; i <= 10; i++) {

      const x = 40 + i * (W - 80) / 10;

      const y = 40 + i * (H - 80) / 10;

      ctx.beginPath(); ctx.moveTo(x, 40); ctx.lineTo(x, H - 40); ctx.stroke();

      ctx.beginPath(); ctx.moveTo(40, y); ctx.lineTo(W - 40, y); ctx.stroke();

    }



    // Axes labels

    ctx.fillStyle = 'rgba(148,163,184,0.6)';

    ctx.font = '11px Inter';

    ctx.textAlign = 'center';

    for (let i = 0; i <= 5; i++) {

      const val = range.xMin + i * (range.xMax - range.xMin) / 5;

      const { sx } = toScreen(val, 0, range);

      ctx.fillText(val.toFixed(1), sx, H - 20);

    }

    ctx.textAlign = 'right';

    for (let i = 0; i <= 5; i++) {

      const val = range.yMin + i * (range.yMax - range.yMin) / 5;

      const { sy } = toScreen(0, val, range);

      ctx.fillText(val.toFixed(1), 35, sy + 4);

    }



    // Residual lines

    if (model.history.length > 0) {

      ctx.strokeStyle = 'rgba(244,63,94,0.2)';

      ctx.lineWidth = 1;

      for (const p of data) {

        const pred = model.predict(p.features[0]);

        const { sx: sx1, sy: sy1 } = toScreen(p.features[0], p.label, range);

        const { sx: sx2, sy: sy2 } = toScreen(p.features[0], pred, range);

        ctx.beginPath();

        ctx.moveTo(sx1, sy1);

        ctx.lineTo(sx2, sy2);

        ctx.stroke();

      }

    }



    // Data points

    for (const p of data) {

      const { sx, sy } = toScreen(p.features[0], p.label, range);

      ctx.fillStyle = 'rgba(255,255,255,0.7)';

      ctx.beginPath();

      ctx.arc(sx, sy, 5, 0, Math.PI * 2);

      ctx.fill();

      ctx.strokeStyle = 'rgba(114,227,173,0.4)';

      ctx.lineWidth = 1;

      ctx.stroke();

    }



    // Regression line

    if (model.history.length > 0) {

      const x1 = range.xMin;

      const x2 = range.xMax;

      const y1 = model.predict(x1);

      const y2 = model.predict(x2);

      const p1 = toScreen(x1, y1, range);

      const p2 = toScreen(x2, y2, range);



      ctx.strokeStyle = '#72e3ad';

      ctx.lineWidth = 3;

      ctx.shadowColor = 'rgba(114,227,173,0.5)';

      ctx.shadowBlur = 10;

      ctx.beginPath();

      ctx.moveTo(p1.sx, p1.sy);

      ctx.lineTo(p2.sx, p2.sy);

      ctx.stroke();

      ctx.shadowBlur = 0;

    }

  }



  function drawLossCurve() {

    const W = lossCanvas.width, H = lossCanvas.height;

    lctx.clearRect(0, 0, W, H);

    const losses = model.lossHistory;

    if (losses.length < 2) return;



    const maxLoss = Math.max(...losses) * 1.1;

    const minLoss = Math.min(...losses) * 0.9;



    // Grid

    lctx.strokeStyle = 'rgba(255,255,255,0.05)';

    lctx.lineWidth = 1;

    for (let i = 0; i <= 4; i++) {

      const y = 10 + i * (H - 20) / 4;

      lctx.beginPath(); lctx.moveTo(10, y); lctx.lineTo(W - 10, y); lctx.stroke();

    }



    // Loss line

    const gradient = lctx.createLinearGradient(0, 0, W, 0);

    gradient.addColorStop(0, '#ffffff');

    gradient.addColorStop(1, '#34d399');

    lctx.strokeStyle = gradient;

    lctx.lineWidth = 2;

    lctx.beginPath();

    for (let i = 0; i < losses.length; i++) {

      const x = 10 + i / (losses.length - 1) * (W - 20);

      const y = H - 10 - (losses[i] - minLoss) / (maxLoss - minLoss + 0.001) * (H - 20);

      if (i === 0) lctx.moveTo(x, y); else lctx.lineTo(x, y);

    }

    lctx.stroke();

  }



  function updateMetrics(result) {

    document.getElementById('metric-epoch').textContent = epoch;

    document.getElementById('metric-loss').textContent = result.loss.toFixed(4);

    document.getElementById('metric-r2').textContent = model.getR2(data).toFixed(4);

    document.getElementById('metric-eq').textContent = model.getEquation();

    document.getElementById('metric-w').textContent = result.weight.toFixed(4);

    document.getElementById('metric-b').textContent = result.bias.toFixed(4);



    const r2El = document.getElementById('metric-r2');

    const r2 = model.getR2(data);

    r2El.className = 'metric-value ' + (r2 > 0.8 ? 'good' : r2 > 0.5 ? 'warn' : 'bad');

  }



  function trainStep() {

    const lr = parseFloat(document.getElementById('lr-slider').value);

    const result = model.step(data, lr);

    epoch++;

    updateMetrics(result);

    drawScene();

    drawLossCurve();

  }



  function trainLoop() {

    if (!isTraining) return;

    trainStep();

    if (epoch < 500) {

      animId = requestAnimationFrame(trainLoop);

    } else {

      isTraining = false;

      document.getElementById('btn-train').textContent = '▶ Train';

    }

  }



  // Event listeners

  document.getElementById('btn-train').addEventListener('click', () => {

    if (isTraining) {

      isTraining = false;

      if (animId) cancelAnimationFrame(animId);

      document.getElementById('btn-train').textContent = '▶ Train';

    } else {

      isTraining = true;

      document.getElementById('btn-train').textContent = '⏸ Pause';

      trainLoop();

    }

  });



  document.getElementById('btn-step').addEventListener('click', () => {

    if (!isTraining) trainStep();

  });



  document.getElementById('btn-reset').addEventListener('click', () => {

    isTraining = false;

    if (animId) cancelAnimationFrame(animId);

    epoch = 0;

    model.reset();

    document.getElementById('btn-train').textContent = '▶ Train';

    document.getElementById('metric-epoch').textContent = '0';

    document.getElementById('metric-loss').textContent = '—';

    document.getElementById('metric-r2').textContent = '—';

    document.getElementById('metric-eq').textContent = '—';

    document.getElementById('metric-w').textContent = '—';

    document.getElementById('metric-b').textContent = '—';

    drawScene();

    drawLossCurve();

  });



  document.getElementById('lr-slider').addEventListener('input', (e) => {

    document.getElementById('lr-val').textContent = parseFloat(e.target.value).toFixed(3);

  });



  document.getElementById('dp-slider').addEventListener('input', (e) => {

    document.getElementById('dp-val').textContent = e.target.value;

  });



  document.getElementById('noise-slider').addEventListener('input', (e) => {

    document.getElementById('noise-val').textContent = e.target.value;

  });



  document.getElementById('dataset-select').addEventListener('change', (e) => {

    const dsName = e.target.value;

    if (dsName === 'linear') {

      const n = parseInt(document.getElementById('dp-slider').value);

      const noise = parseInt(document.getElementById('noise-slider').value);

      // regenerate

      data = [];

      for (let i = 0; i < n; i++) {

        const x = Math.random() * 20 - 5;

        const y = 2.5 * x + 10 + (Math.random() * 2 - 1) * noise;

        data.push({ features: [x], label: y });

      }

    } else {

      data = DATASETS[dsName].data;

    }

    model.reset();

    epoch = 0;

    isTraining = false;

    if (animId) cancelAnimationFrame(animId);

    document.getElementById('btn-train').textContent = '▶ Train';

    drawScene();

  });



  setTimeout(resizeCanvas, 50);

  window.addEventListener('resize', resizeCanvas);



  // Quiz
  renderQuiz(container, QUIZ_DATA.linearRegression);

  return () => {

    isTraining = false;

    if (animId) cancelAnimationFrame(animId);

    window.removeEventListener('resize', resizeCanvas);

  };

  renderNextLessonButton(container, 'linear-regression');
}
