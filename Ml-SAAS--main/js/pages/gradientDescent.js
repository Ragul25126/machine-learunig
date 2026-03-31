// ── Gradient Descent Page — Chapter 8 ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';

export function renderGradientDescent(container) {
  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Chapter 8 — Gradient Descent</span>
      <h2>How a Model Actually Learns</h2>
      <p>Gradient Descent is the engine of learning. It finds the lowest possible error, one small step at a time.</p>
    </div>

    <!-- The Intuition -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px;">
      <div class="glass-card">
        <h4 style="margin-bottom:12px;color:var(--accent-cyan);">⛰️ The Mountain Analogy</h4>
        <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.8;">
          Imagine you're blindfolded on a hilly landscape. Your goal is to reach the <strong>valley</strong> (lowest point = lowest error).
          <br><br>
          You can't see the whole map, but you can feel which direction goes <strong>downhill</strong>. So you take a small step downhill, then another, then another — until you reach the bottom.
          <br><br>
          That's <strong>gradient descent</strong>. The "gradient" tells you which direction is downhill, and you "descend" step by step.
        </p>
      </div>
      <div class="glass-card">
        <h4 style="margin-bottom:12px;color:var(--accent-amber);">📏 What is Learning Rate?</h4>
        <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.8;">
          The <strong>learning rate</strong> controls how big each step is.
          <ul style="margin-top:8px;padding-left:18px;font-size:0.82rem;">
            <li><strong style="color:var(--accent-amber);">Too large</strong> → You overshoot the valley! Jump back and forth, never settling.</li>
            <li><strong style="color:#f472b6;">Too small</strong> → You'll get there, but it takes forever.</li>
            <li><strong style="color:var(--accent-emerald);">Just right</strong> → Smooth descent to the minimum. 🎯</li>
          </ul>
        </p>
      </div>
    </div>

    <!-- The Interactive: Ball Rolling Down -->
    <div class="glass-card" style="border-top:4px solid var(--accent-emerald);">
      <div class="glass-card-header">
        <h3>🎱 Interactive: Ball Rolling to the Minimum</h3>
        <p style="font-size:0.88rem;color:var(--text-secondary);">Watch how different learning rates affect how the ball finds the lowest point.</p>
      </div>

      <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;margin-top:24px;align-items:start;">

        <div>
          <!-- Step indicators -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
            <div id="gd-status" style="font-size:0.88rem;font-weight:700;color:var(--accent-emerald);">Ready — Press Start</div>
            <div style="display:flex;gap:8px;">
              <span style="display:inline-flex;align-items:center;gap:5px;font-size:0.7rem;color:var(--text-muted);">
                <span style="width:10px;height:10px;border-radius:50%;background:var(--accent-emerald);display:inline-block;"></span>Ball (current position)
              </span>
              <span style="display:inline-flex;align-items:center;gap:5px;font-size:0.7rem;color:var(--text-muted);">
                <span style="width:10px;height:2px;background:var(--accent-amber);display:inline-block;"></span>History
              </span>
            </div>
          </div>
          <div style="position:relative;border-radius:12px;overflow:hidden;background:rgba(0,0,0,0.3);">
            <canvas id="gd-canvas" style="width:100%;height:320px;display:block;"></canvas>
          </div>
          <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
            <button id="gd-play" class="btn btn-primary btn-pill" style="font-size:0.82rem;">▶ Start Descent</button>
            <button id="gd-step" class="btn btn-secondary btn-pill" style="font-size:0.82rem;">⏭ Step Once</button>
            <button id="gd-reset" class="btn btn-secondary" style="font-size:0.82rem;margin-left:auto;">🔄 Reset</button>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;">
          <!-- Learning Rate Selector -->
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:16px;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:8px;">Learning Rate (α)</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              ${[
                { label: '0.01', desc: 'Slow', color: '#f472b6' },
                { label: '0.1',  desc: 'Good', color: 'var(--accent-emerald)' },
                { label: '0.5',  desc: 'Fast',  color: 'var(--accent-amber)' },
                { label: '0.95', desc: 'Chaotic!', color: '#ef4444' }
              ].map(r => `
                <button class="lr-btn" data-lr="${r.label}" style="padding:6px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);font-size:0.72rem;cursor:pointer;color:${r.color};transition:all 0.2s;">
                  α = ${r.label}<br><span style="font-size:0.6rem;opacity:0.7;">${r.desc}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Current State -->
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:16px;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;">Current Position (x)</div>
            <div id="gd-pos" style="font-size:1.6rem;font-weight:900;color:var(--accent-cyan);">—</div>
          </div>

          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:16px;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;">Loss at this position</div>
            <div id="gd-loss" style="font-size:1.6rem;font-weight:900;color:var(--accent-amber);">—</div>
          </div>

          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:16px;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;">Steps taken</div>
            <div id="gd-steps" style="font-size:1.6rem;font-weight:900;color:var(--accent-emerald);">0</div>
          </div>

          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:14px;">
            <p style="font-size:0.72rem;color:var(--text-secondary);line-height:1.5;">
              💡 Try <strong>α = 0.95</strong> to see it oscillate wildly,
              then <strong>α = 0.1</strong> to see perfect smooth descent.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  /* ── Canvas Setup ── */
  const canvas = document.getElementById('gd-canvas');
  const ctx = canvas.getContext('2d');

  const resize = () => {
    const box = canvas.getBoundingClientRect();
    canvas.width = box.width;
    canvas.height = box.height;
  };
  resize();

  // Loss landscape: L(x) = (x-5)² + 1  — minimum at x=5
  const lossFunc = x => (x - 5) ** 2 + 1;
  const gradient = x => 2 * (x - 5);  // dL/dx

  const X_MIN = -1, X_MAX = 11;
  const Y_MIN = 0,  Y_MAX = 40;
  const W = () => canvas.width, H = () => canvas.height;
  const pad = { l: 44, r: 20, t: 20, b: 36 };

  function toCanvasX(x) { return pad.l + ((x - X_MIN) / (X_MAX - X_MIN)) * (W() - pad.l - pad.r); }
  function toCanvasY(y) { return H() - pad.b - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * (H() - pad.t - pad.b); }

  let ballX = 10.0;
  let lr = 0.1;
  let steps = 0;
  let playing = false;
  let playInterval = null;
  let history = [];
  const MAX_STEPS = 80;

  function drawScene() {
    ctx.clearRect(0, 0, W(), H());

    // Draw loss curve
    ctx.beginPath();
    let first = true;
    for (let x = X_MIN; x <= X_MAX; x += 0.05) {
      const y = lossFunc(x);
      if (y > Y_MAX) { first = true; continue; }
      const cx = toCanvasX(x), cy = toCanvasY(y);
      if (first) { ctx.moveTo(cx, cy); first = false; }
      else ctx.lineTo(cx, cy);
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Gradient under curve
    const grd = ctx.createLinearGradient(0, toCanvasY(Y_MAX), 0, toCanvasY(0));
    grd.addColorStop(0, 'rgba(52,211,153,0.15)');
    grd.addColorStop(1, 'rgba(52,211,153,0.0)');
    ctx.beginPath();
    ctx.moveTo(toCanvasX(X_MIN), toCanvasY(0));
    for (let x = X_MIN; x <= X_MAX; x += 0.05) {
      const y = lossFunc(x);
      if (y <= Y_MAX) ctx.lineTo(toCanvasX(x), toCanvasY(y));
    }
    ctx.lineTo(toCanvasX(X_MAX), toCanvasY(0));
    ctx.fillStyle = grd;
    ctx.fill();

    // Minimum marker
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(52,211,153,0.3)';
    ctx.lineWidth = 1;
    ctx.moveTo(toCanvasX(5), toCanvasY(0));
    ctx.lineTo(toCanvasX(5), toCanvasY(lossFunc(5)));
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillText('⭐ Minimum', toCanvasX(5) + 6, toCanvasY(lossFunc(5)) - 6);

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(pad.l, H()-pad.b); ctx.lineTo(W()-pad.r, H()-pad.b); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad.l, H()-pad.b); ctx.lineTo(pad.l, pad.t); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Weight →', W()/2 - 20, H() - 8);
    ctx.save(); ctx.translate(12, H()/2+20); ctx.rotate(-Math.PI/2);
    ctx.fillText('Loss →', 0, 0); ctx.restore();

    // History trail
    if (history.length > 1) {
      ctx.beginPath();
      ctx.moveTo(toCanvasX(history[0]), toCanvasY(lossFunc(history[0])));
      history.forEach(hx => ctx.lineTo(toCanvasX(hx), toCanvasY(lossFunc(hx))));
      ctx.strokeStyle = 'rgba(245,158,11,0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([2, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
      // Small dots
      history.forEach(hx => {
        ctx.beginPath();
        ctx.arc(toCanvasX(hx), toCanvasY(lossFunc(hx)), 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245,158,11,0.5)';
        ctx.fill();
      });
    }

    // Ball
    const ballY = lossFunc(ballX);
    if (ballY <= Y_MAX) {
      // Glow
      const glow = ctx.createRadialGradient(toCanvasX(ballX), toCanvasY(ballY), 0, toCanvasX(ballX), toCanvasY(ballY), 20);
      glow.addColorStop(0, 'rgba(52,211,153,0.4)');
      glow.addColorStop(1, 'rgba(52,211,153,0)');
      ctx.beginPath();
      ctx.arc(toCanvasX(ballX), toCanvasY(ballY), 20, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      // Ball
      ctx.beginPath();
      ctx.arc(toCanvasX(ballX), toCanvasY(ballY), 8, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Update UI
    document.getElementById('gd-pos').textContent = ballX.toFixed(3);
    document.getElementById('gd-loss').textContent = ballY.toFixed(3);
    document.getElementById('gd-steps').textContent = steps;
  }

  function doStep() {
    const grad = gradient(ballX);
    history.push(ballX);
    ballX = ballX - lr * grad;
    steps++;
    drawScene();

    const atMin = Math.abs(ballX - 5) < 0.01;
    const diverged = Math.abs(ballX) > 20;

    if ((atMin || steps >= MAX_STEPS || diverged) && playing) {
      clearInterval(playInterval);
      playing = false;
      document.getElementById('gd-play').textContent = atMin ? '✅ Converged!' : diverged ? '💥 Diverged!' : '🏁 Done';
      const statusEl = document.getElementById('gd-status');
      if (atMin) { statusEl.textContent = '🎉 Found the minimum!'; statusEl.style.color = 'var(--accent-emerald)'; }
      else if (diverged) { statusEl.textContent = '💥 Diverged — learning rate too high!'; statusEl.style.color = '#ef4444'; }
      else { statusEl.textContent = '🏁 Training complete'; statusEl.style.color = 'var(--text-secondary)'; }
    }
  }

  function resetState() {
    ballX = 10.0; steps = 0; history = []; playing = false;
    clearInterval(playInterval);
    document.getElementById('gd-play').textContent = '▶ Start Descent';
    document.getElementById('gd-status').textContent = 'Ready — Press Start';
    document.getElementById('gd-status').style.color = 'var(--accent-emerald)';
    document.getElementById('gd-pos').textContent = '—';
    document.getElementById('gd-loss').textContent = '—';
    document.getElementById('gd-steps').textContent = '0';
    resize();
    drawScene();
  }

  document.getElementById('gd-play').onclick = () => {
    if (playing) {
      clearInterval(playInterval); playing = false;
      document.getElementById('gd-play').textContent = '▶ Resume';
    } else {
      playing = true;
      document.getElementById('gd-play').textContent = '⏸ Pause';
      playInterval = setInterval(doStep, 120);
    }
  };

  document.getElementById('gd-step').onclick = () => { if (!playing) doStep(); };
  document.getElementById('gd-reset').onclick = resetState;

  // Learning rate buttons
  document.querySelectorAll('.lr-btn').forEach(btn => {
    btn.onclick = () => {
      lr = parseFloat(btn.dataset.lr);
      document.querySelectorAll('.lr-btn').forEach(b => b.style.opacity = '0.5');
      btn.style.opacity = '1';
      btn.style.borderColor = 'rgba(52,211,153,0.5)';
      resetState();
    };
  });
  // Default highlight
  document.querySelector('.lr-btn[data-lr="0.1"]').style.opacity = '1';
  document.querySelector('.lr-btn[data-lr="0.1"]').style.borderColor = 'rgba(52,211,153,0.5)';
  document.querySelectorAll('.lr-btn:not([data-lr="0.1"])').forEach(b => b.style.opacity = '0.5');

  resize();
  drawScene();

  // Quiz
  renderQuiz(container, QUIZ_DATA.gradientDescent);
  renderNextLessonButton(container, 'gradient-descent');
}
