// ── Loss Functions Page — Chapter 7 ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';

export function renderLossFunction(container) {
  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Chapter 7 — Loss Functions</span>
      <h2>How Wrong is Your Model?</h2>
      <p>Before a model can improve, it needs to <em>measure</em> its mistakes. That's what a Loss Function does.</p>
    </div>

    <!-- What is Error? -->
    <div class="glass-card" style="margin-bottom:28px;">
      <div class="glass-card-header">
        <h3>🎯 What is Error?</h3>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:16px;align-items:center;">
        <div>
          <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.8;">
            Imagine you're trying to predict tomorrow's temperature.
            <ul style="margin-top:10px;padding-left:20px;font-size:0.82rem;">
              <li>The model predicts: <strong style="color:var(--accent-emerald);">28°C</strong></li>
              <li>The actual temperature: <strong style="color:var(--accent-amber);">32°C</strong></li>
              <li>Error = 32 - 28 = <strong style="color:#f472b6;">4 degrees off</strong></li>
            </ul>
            <br>
            Simple! But if you have <strong>1000 predictions</strong>, you need one number to summarize all the errors. That's the <strong>Loss</strong>.
          </p>
        </div>
        <div style="background:rgba(255,255,255,0.02);border-radius:14px;padding:20px;text-align:center;">
          <div style="display:flex;align-items:center;justify-content:center;gap:20px;font-size:1.1rem;margin-bottom:12px;">
            <div>
              <div style="font-size:0.65rem;color:var(--text-muted);margin-bottom:4px;">PREDICTED</div>
              <div style="font-size:1.8rem;font-weight:900;color:var(--accent-emerald);">28°</div>
            </div>
            <div style="font-size:1.5rem;color:var(--text-muted);">→</div>
            <div>
              <div style="font-size:0.65rem;color:var(--text-muted);margin-bottom:4px;">ACTUAL</div>
              <div style="font-size:1.8rem;font-weight:900;color:var(--accent-amber);">32°</div>
            </div>
          </div>
          <div style="background:rgba(244,114,182,0.08);border-radius:10px;padding:10px;">
            <div style="font-size:0.7rem;color:var(--text-muted);">Error</div>
            <div style="font-size:1.5rem;font-weight:900;color:#f472b6;">4°</div>
          </div>
        </div>
      </div>
    </div>

    <!-- MSE -->
    <div class="glass-card" style="margin-bottom:28px;">
      <div class="glass-card-header">
        <h3>📐 Mean Squared Error (MSE)</h3>
        <p style="font-size:0.88rem;color:var(--text-secondary);">The most common loss function. It penalizes big mistakes heavily.</p>
      </div>
      <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;margin-top:16px;align-items:start;">
        <div>
          <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.8;">
            Here's the idea in plain English:
            <ol style="margin-top:10px;padding-left:20px;font-size:0.82rem;">
              <li>For each data point, calculate: <em>predicted - actual</em></li>
              <li><strong>Square it</strong> (this makes negatives positive, and punishes big errors more)</li>
              <li>Take the <strong>average</strong> of all squared errors</li>
            </ol>
            <br>
            Why square it? Because if you just averaged the errors, positives and negatives would cancel out and give you zero — even for a terrible model!
          </p>
        </div>
        <div style="background:rgba(255,255,255,0.02);border-radius:12px;padding:16px;">
          <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:8px;">The Formula</div>
          <div style="font-family:monospace;font-size:0.9rem;color:var(--accent-cyan);text-align:center;padding:12px;background:rgba(6,182,212,0.05);border-radius:8px;line-height:1.8;">
            MSE = (1/n) × Σ(ŷ - y)²
          </div>
          <p style="font-size:0.7rem;color:var(--text-muted);margin-top:8px;line-height:1.5;">ŷ = predicted, y = actual, n = number of points</p>
        </div>
      </div>
    </div>

    <!-- Interactive Visualizer -->
    <div class="glass-card" style="border-top:4px solid var(--accent-amber);">
      <div class="glass-card-header">
        <h3>📊 Interactive: See the Error Gaps</h3>
        <p style="font-size:0.88rem;color:var(--text-secondary);">Drag the line to see how the error (the gaps) change. The total MSE updates live.</p>
      </div>

      <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;margin-top:24px;align-items:start;">
        <div>
          <div style="position:relative;border-radius:12px;overflow:hidden;background:rgba(0,0,0,0.3);">
            <canvas id="loss-canvas" style="width:100%;height:300px;display:block;cursor:ns-resize;"></canvas>
          </div>
          <p style="font-size:0.72rem;color:var(--text-muted);margin-top:8px;text-align:center;">
            ↕ Drag the green line up/down to adjust your model's prediction slope
          </p>
          <div style="display:flex;gap:10px;margin-top:10px;align-items:center;">
            <label style="font-size:0.78rem;color:var(--text-secondary);">Slope (m):</label>
            <input type="range" id="loss-slope" min="-0.5" max="2.5" step="0.05" value="0.5" style="flex:1;">
            <span id="loss-slope-val" style="font-size:0.78rem;color:var(--accent-emerald);font-family:monospace;width:40px;">0.50</span>
          </div>
          <div style="display:flex;gap:10px;margin-top:8px;align-items:center;">
            <label style="font-size:0.78rem;color:var(--text-secondary);">Intercept (b):</label>
            <input type="range" id="loss-intercept" min="-3" max="8" step="0.1" value="1" style="flex:1;">
            <span id="loss-intercept-val" style="font-size:0.78rem;color:var(--accent-emerald);font-family:monospace;width:40px;">1.0</span>
          </div>
        </div>

        <!-- MSE Panel -->
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:20px;text-align:center;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.1em;">Total MSE</div>
            <div id="loss-mse" style="font-size:2.2rem;font-weight:900;color:var(--accent-amber);">—</div>
            <div id="loss-verdict" style="margin-top:10px;font-size:0.72rem;padding:6px 12px;border-radius:20px;background:rgba(255,255,255,0.04);color:var(--text-muted);">Adjust the line</div>
          </div>
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:14px;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:8px;">Individual Errors²</div>
            <div id="loss-breakdown" style="font-family:monospace;font-size:0.7rem;color:var(--text-secondary);line-height:1.8;"></div>
          </div>
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:14px;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:8px;">Key Insight</div>
            <p style="font-size:0.75rem;color:var(--text-secondary);line-height:1.5;">
              🎯 <strong>Lower MSE = Better model</strong>. The goal of training is to slide the line until MSE is as small as possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  /* ── Canvas Setup ── */
  const canvas = document.getElementById('loss-canvas');
  const ctx = canvas.getContext('2d');
  const slopeSlider = document.getElementById('loss-slope');
  const interceptSlider = document.getElementById('loss-intercept');
  const slopeVal = document.getElementById('loss-slope-val');
  const interceptVal = document.getElementById('loss-intercept-val');
  const mseDisplay = document.getElementById('loss-mse');
  const verdictDisplay = document.getElementById('loss-verdict');
  const breakdownDisplay = document.getElementById('loss-breakdown');

  const resize = () => {
    const box = canvas.getBoundingClientRect();
    canvas.width = box.width;
    canvas.height = box.height;
  };
  resize();

  // Data points
  const data = [
    [1,1.3],[2,2.1],[3,2.9],[4,4.2],[5,5.1],
    [6,5.8],[7,7.2],[8,7.9],[9,8.8],[10,10.1]
  ];

  const W = () => canvas.width, H = () => canvas.height;
  const pad = 36;

  function toX(x) { return pad + (x / 11) * (W() - 2*pad); }
  function toY(y) { return H() - pad - (y / 12) * (H() - 2*pad); }
  function fromY(py) { return (H() - pad - py) / (H() - 2*pad) * 12; }

  function draw(m, b) {
    ctx.clearRect(0, 0, W(), H());

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 11; i++) {
      ctx.beginPath(); ctx.moveTo(toX(i), pad); ctx.lineTo(toX(i), H()-pad); ctx.stroke();
    }
    for (let i = 0; i <= 12; i++) {
      ctx.beginPath(); ctx.moveTo(pad, toY(i)); ctx.lineTo(W()-pad, toY(i)); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad, H()-pad); ctx.lineTo(W()-pad, H()-pad); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad, H()-pad); ctx.lineTo(pad, pad); ctx.stroke();

    // Prediction line
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(m * 0 + b));
    ctx.lineTo(toX(11), toY(m * 11 + b));
    ctx.strokeStyle = 'rgba(52,211,153,0.85)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Error bars and data points
    let errors = [];
    data.forEach(([x, y]) => {
      const pred = m * x + b;
      const err = pred - y;
      errors.push(err);

      // Error gap (dashed amber line)
      const errMag = Math.abs(err);
      if (errMag > 0.01) {
        const grd = ctx.createLinearGradient(toX(x), toY(y), toX(x), toY(pred));
        grd.addColorStop(0, 'rgba(245,158,11,0.6)');
        grd.addColorStop(1, 'rgba(245,158,11,0.1)');
        ctx.fillStyle = grd;
        const rectX = toX(x) - 3;
        const rectTop = Math.min(toY(y), toY(pred));
        const rectH = Math.abs(toY(y) - toY(pred));
        ctx.fillRect(rectX, rectTop, 6, rectH);
      }

      // Data points
      ctx.beginPath();
      ctx.arc(toX(x), toY(y), 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fill();
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // MSE
    const mse = errors.reduce((s, e) => s + e*e, 0) / errors.length;
    mseDisplay.textContent = mse.toFixed(2);
    if (mse < 0.3) {
      verdictDisplay.textContent = '🏆 Excellent fit!';
      verdictDisplay.style.background = 'rgba(52,211,153,0.15)';
      verdictDisplay.style.color = 'var(--accent-emerald)';
    } else if (mse < 1.5) {
      verdictDisplay.textContent = '✅ Good fit';
      verdictDisplay.style.background = 'rgba(6,182,212,0.1)';
      verdictDisplay.style.color = 'var(--accent-cyan)';
    } else if (mse < 5) {
      verdictDisplay.textContent = '⚠️ Decent — can improve';
      verdictDisplay.style.background = 'rgba(245,158,11,0.1)';
      verdictDisplay.style.color = 'var(--accent-amber)';
    } else {
      verdictDisplay.textContent = '❌ Poor fit — high error';
      verdictDisplay.style.background = 'rgba(244,114,182,0.1)';
      verdictDisplay.style.color = '#f472b6';
    }

    breakdownDisplay.innerHTML = errors.map((e, i) =>
      `Point ${i+1}: err=${e.toFixed(2)}, err²=<strong style="color:var(--accent-amber)">${(e*e).toFixed(2)}</strong>`
    ).join('<br>');
  }

  function update() {
    const m = parseFloat(slopeSlider.value);
    const b = parseFloat(interceptSlider.value);
    slopeVal.textContent = m.toFixed(2);
    interceptVal.textContent = b.toFixed(1);
    draw(m, b);
  }

  slopeSlider.oninput = update;
  interceptSlider.oninput = update;
  update();

  // Quiz
  renderQuiz(container, QUIZ_DATA.lossFunction);
  renderNextLessonButton(container, 'loss-function');
}
