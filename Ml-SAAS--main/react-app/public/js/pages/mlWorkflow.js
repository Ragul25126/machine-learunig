// ── ML Workflow Page — Chapter 6: Interactive Training Process ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';

export function renderMLWorkflow(container) {

  /* ── Step Definitions ── */
  const steps = [
    {
      n: 1, emoji: '🎲', color: '#22d3ee', title: 'Initialize',
      subtitle: 'Random Starting Point',
      desc: 'The model starts with <strong>random weights</strong> — it has no idea what the answer is. This is like a student walking into an exam without studying.',
      code: 'weights = random()\nbias = random()\n# Model knows NOTHING yet',
      insight: 'Every great model starts completely clueless!'
    },
    {
      n: 2, emoji: '🔮', color: '#a78bfa', title: 'Predict',
      subtitle: 'Make a Guess',
      desc: 'The model runs each data point through its formula: <strong>y = weight × x + bias</strong>. With random weights, these predictions are terrible — but that\'s okay!',
      code: 'for each data_point:\n  prediction = weight * x + bias\n# Predictions are BAD at first',
      insight: 'The green line shows the model\'s current guess'
    },
    {
      n: 3, emoji: '📉', color: '#f59e0b', title: 'Calculate Loss',
      subtitle: 'Measure the Error',
      desc: 'We measure <strong>how wrong</strong> each prediction is. The dashed orange lines show the gap between each guess and reality. We square these errors and average them: this is the <strong>loss</strong>.',
      code: 'loss = 0\nfor each point:\n  error = prediction - actual\n  loss += error²\nloss = loss / n_points',
      insight: 'Lower loss = better model. We want this at zero!'
    },
    {
      n: 4, emoji: '⚙️', color: '#00ff9d', title: 'Update Weights',
      subtitle: 'Learn from Mistakes',
      desc: 'Using <strong>gradient descent</strong>, we calculate which direction to adjust the weights to reduce the loss. We nudge them by a tiny amount (the <strong>learning rate</strong>).',
      code: 'gradient = compute_gradient(loss)\nweight -= learning_rate * gradient_w\nbias -= learning_rate * gradient_b',
      insight: 'Like tuning a radio dial — small turns toward the right station'
    },
    {
      n: 5, emoji: '🔁', color: '#f472b6', title: 'Repeat',
      subtitle: 'Do It All Again',
      desc: 'One full cycle through all 4 steps is called an <strong>epoch</strong>. We repeat this process many times. Each epoch the model gets a little smarter, the loss drops, and the line moves closer to the data.',
      code: 'for epoch in range(num_epochs):\n  predictions = predict(data)\n  loss = compute_loss(predictions)\n  update_weights(loss)\n  # Model gets better each time!',
      insight: 'After enough epochs, the model converges — it\'s learned the pattern!'
    }
  ];

  const totalEpochs = 50;

  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Chapter 6 — The Training Process</span>
      <h2>How Every ML Model Learns</h2>
      <p>Drag the slider to walk through the training loop step by step. Watch the model go from clueless to confident.</p>
    </div>

    <!-- Phase Segmented Bar -->
    <div class="training-phase-bar" id="phase-bar">
      ${steps.map((s, i) => `
        <div class="training-phase-segment" id="phase-seg-${i}" data-step="${i}">
          <div class="phase-seg-fill" id="phase-fill-${i}"></div>
          <div class="phase-seg-label">
            <span class="phase-seg-emoji">${s.emoji}</span>
            <span class="phase-seg-title">${s.title}</span>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Main Slider -->
    <div class="training-slider-container">
      <div class="training-slider-track">
        <input type="range" id="training-slider" class="training-slider" min="0" max="${totalEpochs * 5}" value="0" step="1">
      </div>
      <div class="training-slider-labels">
        <span>Epoch 0</span>
        <span id="slider-epoch-label" style="font-weight:700;color:var(--accent-emerald);font-size:0.9rem;">Drag to begin →</span>
        <span>Epoch ${totalEpochs}</span>
      </div>
    </div>

    <!-- Play Controls -->
    <div class="training-controls">
      <button id="tp-play" class="btn btn-primary btn-pill" style="min-width:150px;">
        <span id="tp-play-icon">▶</span> <span id="tp-play-text">Auto-Play</span>
      </button>
      <button id="tp-reset" class="btn btn-secondary btn-pill">🔄 Reset</button>
      <div class="training-speed-control">
        <label for="tp-speed">Speed</label>
        <select id="tp-speed">
          <option value="120">🐢 Slow</option>
          <option value="60" selected>⚡ Normal</option>
          <option value="25">🚀 Fast</option>
        </select>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="training-main-grid">
      <!-- Canvas -->
      <div class="glass-card training-canvas-card">
        <div class="glass-card-header">
          <h3>📊 Model Visualization</h3>
          <div id="tp-epoch-badge" class="training-epoch-badge">Epoch <span id="tp-epoch-num">0</span> / ${totalEpochs}</div>
        </div>
        <div class="training-canvas-wrap">
          <canvas id="tp-canvas"></canvas>
        </div>
      </div>

      <!-- Metrics Panel -->
      <div class="training-metrics-panel">
        <!-- Current Step Card -->
        <div class="training-step-card glass-card" id="tp-step-card">
          <div class="training-step-badge" id="tp-step-badge">
            <span class="training-step-emoji" id="tp-step-emoji">🎲</span>
            <span class="training-step-number" id="tp-step-num">Step 1</span>
          </div>
          <h4 id="tp-step-title" class="training-step-title">Initialize</h4>
          <p id="tp-step-subtitle" class="training-step-subtitle">Random Starting Point</p>
        </div>

        <!-- Metrics -->
        <div class="glass-card" style="padding:16px;">
          <div class="metric-row">
            <span class="metric-label">Total Loss</span>
            <span class="metric-value warn" id="tp-loss" style="font-size:1.1rem;">—</span>
          </div>
          <div style="height:6px;background:rgba(255,255,255,0.05);border-radius:3px;margin:8px 0;overflow:hidden;">
            <div id="tp-loss-fill" style="height:100%;width:100%;background:var(--gradient-warm);border-radius:3px;transition:width 0.3s ease;"></div>
          </div>
          <div class="metric-row">
            <span class="metric-label">Weight (m)</span>
            <span class="metric-value" id="tp-m" style="color:var(--accent-emerald);">0.00</span>
          </div>
          <div class="metric-row">
            <span class="metric-label">Bias (b)</span>
            <span class="metric-value" id="tp-b" style="color:var(--accent-emerald);">0.00</span>
          </div>
          <div class="metric-row" style="border-bottom:none;">
            <span class="metric-label">Accuracy</span>
            <span class="metric-value good" id="tp-accuracy">0%</span>
          </div>
        </div>

        <!-- Weight Dial Visual -->
        <div class="glass-card" style="padding:16px;text-align:center;">
          <div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px;">Weight Dial</div>
          <div class="training-dial-container">
            <svg viewBox="0 0 120 70" id="tp-dial-svg" style="width:100%;max-width:160px;">
              <path d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="8" stroke-linecap="round"/>
              <path id="tp-dial-arc" d="M 10 65 A 50 50 0 0 1 110 65" fill="none" stroke="url(#dialGrad)" stroke-width="8" stroke-linecap="round" stroke-dasharray="157" stroke-dashoffset="157"/>
              <defs>
                <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#f59e0b"/>
                  <stop offset="100%" stop-color="#00ff9d"/>
                </linearGradient>
              </defs>
              <circle id="tp-dial-dot" cx="10" cy="65" r="6" fill="#00ff9d" style="filter:drop-shadow(0 0 6px rgba(0,255,157,0.6));transition:all 0.3s ease;"/>
            </svg>
          </div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">
            <span id="tp-dial-label">Not tuned</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Explanation Card -->
    <div class="training-explanation glass-card" id="tp-explanation">
      <div class="training-explanation-content">
        <div class="training-explanation-text">
          <div class="training-explanation-header">
            <span id="tp-exp-emoji" style="font-size:1.6rem;">🎲</span>
            <div>
              <h4 id="tp-exp-title">Initialize</h4>
              <span id="tp-exp-sub" style="font-size:0.75rem;color:var(--text-muted);">Random Starting Point</span>
            </div>
          </div>
          <p id="tp-exp-desc" style="font-size:0.88rem;color:var(--text-secondary);line-height:1.75;margin-top:14px;">
            ${steps[0].desc}
          </p>
          <div class="training-insight" id="tp-exp-insight">
            <span>💡</span> <span id="tp-exp-insight-text">${steps[0].insight}</span>
          </div>
        </div>
        <div class="training-explanation-code">
          <div style="font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">Pseudocode</div>
          <pre id="tp-exp-code"><code>${steps[0].code}</code></pre>
        </div>
      </div>
    </div>
  `;

  /* ── Canvas Setup ── */
  const canvas = document.getElementById('tp-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    const box = canvas.parentElement.getBoundingClientRect();
    canvas.width = box.width * (window.devicePixelRatio || 1);
    canvas.height = box.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    canvas.style.width = box.width + 'px';
    canvas.style.height = box.height + 'px';
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  /* ── Data Points ── */
  const rawPoints = [
    [1,1.2],[2,1.8],[3,3.1],[4,3.9],[5,5.2],
    [6,5.8],[7,7.1],[8,7.8],[9,9.0],[10,10.2]
  ];

  /* ── Drawing ── */
  function getCanvasSize() {
    const box = canvas.parentElement.getBoundingClientRect();
    return { W: box.width, H: box.height };
  }

  function toCanvasX(x, W, pad) { return pad + (x / 11) * (W - 2*pad); }
  function toCanvasY(y, H, pad) { return H - pad - (y / 12) * (H - 2*pad); }

  function drawScene(m, b, phase, progress) {
    const { W, H } = getCanvasSize();
    const pad = 44;
    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 11; i++) {
      const x = toCanvasX(i, W, pad);
      ctx.beginPath(); ctx.moveTo(x, pad); ctx.lineTo(x, H-pad); ctx.stroke();
      const y = toCanvasY(i, H, pad);
      ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(W-pad, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad, H-pad); ctx.lineTo(W-pad, H-pad); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad, H-pad); ctx.lineTo(pad, pad); ctx.stroke();

    // Axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('House Size →', W/2, H - 8);
    ctx.save(); ctx.translate(14, H/2); ctx.rotate(-Math.PI/2);
    ctx.fillText('Price →', 0, 0); ctx.restore();
    ctx.textAlign = 'start';

    // Loss lines (only during loss phase)
    if (phase === 2) {
      rawPoints.forEach(([x, y]) => {
        const cx = toCanvasX(x, W, pad);
        const cy = toCanvasY(y, H, pad);
        const predY = m * x + b;
        const predCY = toCanvasY(predY, H, pad);
        ctx.strokeStyle = 'rgba(245,158,11,0.55)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, predCY); ctx.stroke();
        ctx.setLineDash([]);

        // Error value label
        const err = Math.abs(predY - y);
        if (err > 0.3) {
          ctx.fillStyle = 'rgba(245,158,11,0.7)';
          ctx.font = '9px JetBrains Mono, monospace';
          ctx.fillText(err.toFixed(1), cx + 6, (cy + predCY) / 2);
        }
      });
    }

    // Weight adjustment arrows (during update phase)
    if (phase === 3) {
      const arrowLen = 14;
      rawPoints.forEach(([x, y]) => {
        const cx = toCanvasX(x, W, pad);
        const predY = m * x + b;
        const predCY = toCanvasY(predY, H, pad);
        const actualCY = toCanvasY(y, H, pad);
        const dir = predCY > actualCY ? -1 : 1;
        ctx.strokeStyle = 'rgba(0,255,157,0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, predCY);
        ctx.lineTo(cx, predCY + dir * arrowLen);
        ctx.stroke();
        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(cx - 4, predCY + dir * (arrowLen - 5));
        ctx.lineTo(cx, predCY + dir * arrowLen);
        ctx.lineTo(cx + 4, predCY + dir * (arrowLen - 5));
        ctx.strokeStyle = 'rgba(0,255,157,0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // Data points with glow
    rawPoints.forEach(([x, y]) => {
      const cx = toCanvasX(x, W, pad);
      const cy = toCanvasY(y, H, pad);
      // Glow
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.fill();
      // Point
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Prediction line with glow
    const x0 = 0, x1 = 11;
    const y0 = m * x0 + b, y1 = m * x1 + b;
    // Glow line
    ctx.beginPath();
    ctx.moveTo(toCanvasX(x0, W, pad), toCanvasY(y0, H, pad));
    ctx.lineTo(toCanvasX(x1, W, pad), toCanvasY(y1, H, pad));
    ctx.strokeStyle = 'rgba(0,255,157,0.15)';
    ctx.lineWidth = 10;
    ctx.stroke();
    // Main line
    ctx.beginPath();
    ctx.moveTo(toCanvasX(x0, W, pad), toCanvasY(y0, H, pad));
    ctx.lineTo(toCanvasX(x1, W, pad), toCanvasY(y1, H, pad));
    ctx.strokeStyle = 'rgba(0,255,157,0.85)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Equation label on line
    const labelX = toCanvasX(8, W, pad);
    const labelY = toCanvasY(m * 8 + b, H, pad) - 14;
    ctx.fillStyle = 'rgba(0,255,157,0.6)';
    ctx.font = '11px JetBrains Mono, monospace';
    ctx.fillText(`y = ${m.toFixed(2)}x + ${b.toFixed(2)}`, labelX - 50, Math.max(pad + 14, Math.min(H - pad - 10, labelY)));
  }

  /* ── Training Math ── */
  const lr = 0.025;

  function calcLoss(m, b) {
    return rawPoints.reduce((sum, [x, y]) => sum + (m * x + b - y) ** 2, 0) / rawPoints.length;
  }

  function gradientStep(m, b) {
    let dm = 0, db = 0;
    rawPoints.forEach(([x, y]) => {
      const err = m * x + b - y;
      dm += err * x;
      db += err;
    });
    const n = rawPoints.length;
    return [m - lr * (dm / n), b - lr * (db / n)];
  }

  /* ── State ── */
  let stateM = 0.1, stateB = 5.0; // Bad initial guess
  const initialM = 0.1, initialB = 5.0;
  const initialLoss = calcLoss(initialM, initialB);
  let playing = false;
  let playTimer = null;
  let currentSliderVal = 0;

  // Pre-compute all epoch states for smooth scrubbing
  const epochStates = [{ m: initialM, b: initialB, loss: initialLoss }];
  {
    let sm = initialM, sb = initialB;
    for (let e = 0; e < totalEpochs; e++) {
      [sm, sb] = gradientStep(sm, sb);
      epochStates.push({ m: sm, b: sb, loss: calcLoss(sm, sb) });
    }
  }

  /* ── UI Update Functions ── */
  const slider = document.getElementById('training-slider');
  const maxSlider = totalEpochs * 5;

  function getEpochAndPhase(val) {
    const epoch = Math.floor(val / 5);
    const phase = val % 5; // 0=init, 1=predict, 2=loss, 3=update, 4=repeat
    return { epoch: Math.min(epoch, totalEpochs), phase };
  }

  function interpolateState(val) {
    const { epoch } = getEpochAndPhase(val);
    const e = Math.min(epoch, totalEpochs);
    return epochStates[e];
  }

  function updatePhaseBar(phase) {
    for (let i = 0; i < 5; i++) {
      const seg = document.getElementById(`phase-seg-${i}`);
      const fill = document.getElementById(`phase-fill-${i}`);
      if (i === phase) {
        seg.classList.add('active');
        fill.style.width = '100%';
      } else if (i < phase) {
        seg.classList.remove('active');
        fill.style.width = '100%';
        fill.style.opacity = '0.4';
      } else {
        seg.classList.remove('active');
        fill.style.width = '0%';
        fill.style.opacity = '1';
      }
    }
  }

  function updateExplanation(phase) {
    const s = steps[phase];
    document.getElementById('tp-exp-emoji').textContent = s.emoji;
    document.getElementById('tp-exp-title').textContent = s.title;
    document.getElementById('tp-exp-sub').textContent = s.subtitle;
    document.getElementById('tp-exp-desc').innerHTML = s.desc;
    document.getElementById('tp-exp-code').querySelector('code').textContent = s.code;
    document.getElementById('tp-exp-insight-text').textContent = s.insight;

    // Step card
    document.getElementById('tp-step-emoji').textContent = s.emoji;
    document.getElementById('tp-step-num').textContent = `Step ${s.n}`;
    document.getElementById('tp-step-title').textContent = s.title;
    document.getElementById('tp-step-title').style.color = s.color;
    document.getElementById('tp-step-subtitle').textContent = s.subtitle;
    document.getElementById('tp-step-badge').style.borderColor = s.color;

    // Animate explanation card
    const card = document.getElementById('tp-explanation');
    card.style.borderTopColor = s.color;
  }

  function updateDial(epoch) {
    const progress = epoch / totalEpochs;
    const arcLen = 157; // approx half circle circumference
    const offset = arcLen * (1 - progress);
    document.getElementById('tp-dial-arc').setAttribute('stroke-dashoffset', offset);

    // Move dot along arc
    const angle = Math.PI + progress * Math.PI; // from 180 to 360 degrees
    const cx = 60 + 50 * Math.cos(angle);
    const cy = 65 + 50 * Math.sin(angle);
    const dot = document.getElementById('tp-dial-dot');
    dot.setAttribute('cx', cx);
    dot.setAttribute('cy', cy);

    const labels = ['Not tuned', 'Finding signal...', 'Getting warm...', 'Almost there...', 'Dialed in! ✨'];
    const idx = Math.min(Math.floor(progress * 5), 4);
    document.getElementById('tp-dial-label').textContent = labels[idx];
  }

  function updateUI(val) {
    const { epoch, phase } = getEpochAndPhase(val);
    const state = interpolateState(val);

    // Metrics
    document.getElementById('tp-epoch-num').textContent = epoch;
    document.getElementById('tp-loss').textContent = state.loss.toFixed(2);
    document.getElementById('tp-m').textContent = state.m.toFixed(3);
    document.getElementById('tp-b').textContent = state.b.toFixed(3);

    // Loss bar
    const lossPct = Math.max(2, (state.loss / initialLoss) * 100);
    document.getElementById('tp-loss-fill').style.width = `${lossPct}%`;

    // Accuracy (inverse of normalized loss)
    const acc = Math.min(100, Math.max(0, (1 - state.loss / initialLoss) * 100));
    const accEl = document.getElementById('tp-accuracy');
    accEl.textContent = `${Math.round(acc)}%`;
    accEl.className = `metric-value ${acc > 80 ? 'good' : acc > 40 ? 'warn' : 'bad'}`;

    // Loss color
    const lossEl = document.getElementById('tp-loss');
    lossEl.className = `metric-value ${state.loss < 1 ? 'good' : state.loss < 5 ? 'warn' : 'bad'}`;

    // Slider label
    const label = document.getElementById('slider-epoch-label');
    if (val === 0) {
      label.textContent = 'Drag to begin →';
    } else {
      label.textContent = `${steps[phase].emoji} ${steps[phase].title} · Epoch ${epoch}`;
      label.style.color = steps[phase].color;
    }

    // Phase bar
    updatePhaseBar(phase);

    // Explanation
    updateExplanation(phase);

    // Dial
    updateDial(epoch);

    // Canvas
    drawScene(state.m, state.b, phase, val);
  }

  /* ── Event Handlers ── */
  slider.addEventListener('input', (e) => {
    currentSliderVal = parseInt(e.target.value);
    updateUI(currentSliderVal);
  });

  // Play/Pause
  document.getElementById('tp-play').addEventListener('click', () => {
    if (playing) {
      clearInterval(playTimer);
      playing = false;
      document.getElementById('tp-play-icon').textContent = '▶';
      document.getElementById('tp-play-text').textContent = 'Resume';
    } else {
      if (currentSliderVal >= maxSlider) {
        currentSliderVal = 0;
        slider.value = 0;
      }
      playing = true;
      document.getElementById('tp-play-icon').textContent = '⏸';
      document.getElementById('tp-play-text').textContent = 'Pause';
      const speed = parseInt(document.getElementById('tp-speed').value);
      playTimer = setInterval(() => {
        currentSliderVal++;
        if (currentSliderVal > maxSlider) {
          currentSliderVal = maxSlider;
          clearInterval(playTimer);
          playing = false;
          document.getElementById('tp-play-icon').textContent = '✅';
          document.getElementById('tp-play-text').textContent = 'Done!';
        }
        slider.value = currentSliderVal;
        updateUI(currentSliderVal);
      }, speed);
    }
  });

  // Reset
  document.getElementById('tp-reset').addEventListener('click', () => {
    clearInterval(playTimer);
    playing = false;
    currentSliderVal = 0;
    slider.value = 0;
    document.getElementById('tp-play-icon').textContent = '▶';
    document.getElementById('tp-play-text').textContent = 'Auto-Play';
    updateUI(0);
  });

  // Speed change while playing
  document.getElementById('tp-speed').addEventListener('change', () => {
    if (playing) {
      clearInterval(playTimer);
      const speed = parseInt(document.getElementById('tp-speed').value);
      playTimer = setInterval(() => {
        currentSliderVal++;
        if (currentSliderVal > maxSlider) {
          currentSliderVal = maxSlider;
          clearInterval(playTimer);
          playing = false;
          document.getElementById('tp-play-icon').textContent = '✅';
          document.getElementById('tp-play-text').textContent = 'Done!';
        }
        slider.value = currentSliderVal;
        updateUI(currentSliderVal);
      }, speed);
    }
  });

  // Initial draw
  updateUI(0);

  // Quiz
  renderQuiz(container, QUIZ_DATA.mlWorkflow);

  // Cleanup
  return () => {
    clearInterval(playTimer);
    window.removeEventListener('resize', resizeCanvas);
  };
  renderNextLessonButton(container, 'ml-workflow');
}
