// ── Logistic Regression Page ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';

export function renderLogisticRegression(container) {
  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Algorithm — Logistic Regression</span>
      <h2>Predict Probability, Not Price</h2>
      <p>Linear Regression predicts a <em>number</em>. Logistic Regression predicts a <em>probability</em> (0–100%). Perfect for Yes/No decisions.</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px;">
      <div class="glass-card">
        <h4 style="color:var(--accent-emerald);margin-bottom:10px;">🤔 Why Not Linear Regression?</h4>
        <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.8;">
          For "Will it rain? (Yes/No)", linear regression could predict <strong>2.7</strong> — which makes no sense! We need output <strong>between 0 and 1</strong>.
          <br><br>
          Logistic Regression uses the <strong>sigmoid function</strong> to squash any number into a 0-to-1 probability.
        </p>
      </div>
      <div class="glass-card">
        <h4 style="color:var(--accent-cyan);margin-bottom:10px;">🌊 The Sigmoid Function</h4>
        <div style="font-family:monospace;font-size:1rem;color:var(--accent-cyan);text-align:center;padding:12px;background:rgba(6,182,212,0.05);border-radius:8px;margin-bottom:10px;">
          σ(z) = 1 / (1 + e⁻ᶻ)
        </div>
        <p style="font-size:0.8rem;color:var(--text-secondary);line-height:1.7;">
          No matter what number goes in (z), the output is always between 0 and 1.
          <br>z → -∞ gives 0, z → +∞ gives 1, z = 0 gives exactly <strong>0.5</strong>.
        </p>
      </div>
    </div>


    <!-- Interactive Sigmoid Visualizer -->
    <div class="glass-card" style="border-top:4px solid var(--accent-emerald);">
      <div class="glass-card-header">
        <h3>🌊 Interactive: Explore the Sigmoid Curve</h3>
        <p style="font-size:0.88rem;color:var(--text-secondary);">Adjust z to see how the probability output changes. Then try classifying sample data points.</p>
      </div>

      <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;margin-top:24px;align-items:start;">
        <div>
          <div style="position:relative;border-radius:12px;overflow:hidden;background:rgba(0,0,0,0.3);">
            <canvas id="logit-canvas" style="width:100%;height:300px;display:block;"></canvas>
          </div>
          <div style="margin-top:14px;">
            <div style="display:flex;justify-content:space-between;font-size:0.78rem;color:var(--text-secondary);margin-bottom:6px;">
              <span>Input z (raw score)</span>
              <span id="logit-z-val" style="color:var(--accent-cyan);font-family:monospace;">0.00</span>
            </div>
            <input type="range" id="logit-z" min="-8" max="8" step="0.1" value="0" style="width:100%;">
            <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--text-muted);margin-top:3px;">
              <span>-8 (Very negative)</span><span>0</span><span>+8 (Very positive)</span>
            </div>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:16px;text-align:center;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:4px;">Probability Output</div>
            <div id="logit-prob" style="font-size:2.4rem;font-weight:900;color:var(--accent-emerald);">50.0%</div>
          </div>
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:14px;text-align:center;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;">Decision (threshold: 50%)</div>
            <div id="logit-decision" style="font-size:1.1rem;font-weight:900;color:var(--accent-amber);">UNCERTAIN</div>
          </div>
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:14px;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;">Formula output</div>
            <div style="font-family:monospace;font-size:0.75rem;color:var(--text-secondary);">
              σ(<span id='logit-z-formula'>0</span>) = 1/(1+e⁻<span id='logit-z-formula2'>0</span>)
              <br>= <span id='logit-exact' style="color:var(--accent-cyan);">0.5000</span>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:12px;">
            <p style="font-size:0.72rem;color:var(--text-secondary);line-height:1.5;">
              💡 If P &gt; 0.5 → predict <strong>Yes/Positive</strong><br>
              If P &lt; 0.5 → predict <strong>No/Negative</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  /* Canvas */
  const canvas = document.getElementById('logit-canvas');
  const ctx = canvas.getContext('2d');
  const zSlider = document.getElementById('logit-z');

  const resize = () => { const b = canvas.getBoundingClientRect(); canvas.width = b.width; canvas.height = b.height; };
  resize();

  const sigmoid = z => 1 / (1 + Math.exp(-z));

  function draw(z) {
    const W = canvas.width, H = canvas.height;
    const pad = 40;
    ctx.clearRect(0, 0, W, H);

    function toX(v) { return pad + ((v + 8) / 16) * (W - 2 * pad); }
    function toY(v) { return H - pad - v * (H - 2 * pad); }

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
    [0, 0.25, 0.5, 0.75, 1].forEach(y => {
      ctx.beginPath(); ctx.moveTo(pad, toY(y)); ctx.lineTo(W - pad, toY(y)); ctx.stroke();
    });

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad, H - pad); ctx.lineTo(W - pad, H - pad); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad, H - pad); ctx.lineTo(pad, pad); ctx.stroke();

    // Axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '10px Inter,sans-serif';
    ['0', '0.25', '0.5', '0.75', '1.0'].forEach(v => {
      ctx.fillText(v, pad - 30, toY(parseFloat(v)) + 4);
    });
    ctx.fillText('z →', W/2 - 10, H - 8);

    // 0.5 decision line
    ctx.beginPath(); ctx.setLineDash([5, 4]);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1;
    ctx.moveTo(pad, toY(0.5)); ctx.lineTo(W - pad, toY(0.5)); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.fillText('0.5 threshold', W - pad - 80, toY(0.5) - 5);

    // Shaded areas
    ctx.beginPath();
    ctx.moveTo(toX(-8), toY(0));
    for (let zv = -8; zv <= 0; zv += 0.1) ctx.lineTo(toX(zv), toY(sigmoid(zv)));
    ctx.lineTo(toX(0), toY(0)); ctx.closePath();
    ctx.fillStyle = 'rgba(244,114,182,0.05)'; ctx.fill();

    ctx.beginPath();
    ctx.moveTo(toX(0), toY(0));
    for (let zv = 0; zv <= 8; zv += 0.1) ctx.lineTo(toX(zv), toY(sigmoid(zv)));
    ctx.lineTo(toX(8), toY(0)); ctx.closePath();
    ctx.fillStyle = 'rgba(52,211,153,0.05)'; ctx.fill();

    // Sigmoid curve
    ctx.beginPath();
    let first = true;
    for (let zv = -8; zv <= 8; zv += 0.05) {
      const px = toX(zv), py = toY(sigmoid(zv));
      first ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      first = false;
    }
    ctx.strokeStyle = 'rgba(52,211,153,0.9)'; ctx.lineWidth = 2.5; ctx.stroke();

    // Vertical line at z
    const pz = sigmoid(z);
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(245,158,11,0.6)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]);
    ctx.moveTo(toX(z), H - pad); ctx.lineTo(toX(z), toY(pz));
    ctx.moveTo(toX(z), toY(pz)); ctx.lineTo(pad, toY(pz));
    ctx.stroke(); ctx.setLineDash([]);

    // Ball on curve
    ctx.beginPath(); ctx.arc(toX(z), toY(pz), 7, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
  }

  function update() {
    const z = parseFloat(zSlider.value);
    const prob = sigmoid(z);
    document.getElementById('logit-z-val').textContent = z.toFixed(2);
    document.getElementById('logit-prob').textContent = (prob * 100).toFixed(1) + '%';
    document.getElementById('logit-prob').style.color = prob > 0.5 ? 'var(--accent-emerald)' : '#f472b6';
    document.getElementById('logit-z-formula').textContent = z.toFixed(2);
    document.getElementById('logit-z-formula2').textContent = z.toFixed(2);
    document.getElementById('logit-exact').textContent = prob.toFixed(4);
    const dec = document.getElementById('logit-decision');
    if (prob > 0.7) { dec.textContent = '✅ POSITIVE'; dec.style.color = 'var(--accent-emerald)'; }
    else if (prob < 0.3) { dec.textContent = '❌ NEGATIVE'; dec.style.color = '#f472b6'; }
    else { dec.textContent = '⚠️ UNCERTAIN'; dec.style.color = 'var(--accent-amber)'; }
    draw(z);
  }

  zSlider.oninput = update;
  update();

  // Quiz
  renderQuiz(container, QUIZ_DATA.logisticRegression);
  renderNextLessonButton(container, 'logistic-regression');
}
