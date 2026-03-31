// ── K-Nearest Neighbors Page ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';

export function renderKNN(container) {
  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Algorithm — K-Nearest Neighbors</span>
      <h2>Classify by Your Neighbors</h2>
      <p>"Tell me who your neighbors are, and I'll tell you who you are." — That's literally how KNN works.</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:28px;">
      </div>
    </div>

    <div class="glass-card" style="border-top:4px solid var(--accent-cyan); margin-top: 40px;">
      <div class="glass-card-header">
        <h3>🎯 Interactive: Click to Classify</h3>
        <p style="font-size:0.88rem;color:var(--text-secondary);">Click anywhere on the canvas to add a mystery point (⭐). KNN will vote using the K nearest neighbors.</p>
      </div>

      <div style="display:grid;grid-template-columns:2fr 1fr;gap:24px;margin-top:20px;align-items:start;">
        <div>
          <div style="position:relative;border-radius:12px;overflow:hidden;background:rgba(0,0,0,0.3);">
            <canvas id="knn-canvas" style="width:100%;height:340px;display:block;cursor:crosshair;"></canvas>
          </div>
          <div style="display:flex;gap:16px;margin-top:12px;font-size:0.75rem;color:var(--text-muted);flex-wrap:wrap;">
            <span style="display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:50%;background:var(--accent-cyan);display:inline-block;"></span>Class A</span>
            <span style="display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:50%;background:#f472b6;display:inline-block;"></span>Class B</span>
            <span style="display:flex;align-items:center;gap:5px;"><span style="width:10px;height:10px;border-radius:50%;background:var(--accent-amber);display:inline-block;"></span>⭐ Mystery Point</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:16px;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:8px;">K (Number of Neighbors)</div>
            <input type="range" id="knn-k" min="1" max="9" step="2" value="3" style="width:100%;">
            <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:var(--text-muted);margin-top:4px;">
              <span>K=1</span><span>K=5</span><span>K=9</span>
            </div>
            <div style="text-align:center;margin-top:8px;font-size:1.2rem;font-weight:900;color:var(--accent-cyan);">K = <span id="knn-k-val">3</span></div>
          </div>
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:16px;text-align:center;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;">Prediction</div>
            <div id="knn-result" style="font-size:1.2rem;font-weight:900;color:var(--text-muted);">Click canvas →</div>
          </div>
          <div style="background:rgba(255,255,255,0.03);border-radius:12px;padding:14px;">
            <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:8px;">Votes</div>
            <div id="knn-votes" style="font-size:0.82rem;color:var(--text-secondary);">—</div>
          </div>
          <button id="knn-reset" class="btn btn-secondary" style="font-size:0.8rem;">🔄 Reset</button>
        </div>
      </div>
    </div>

  `;

  const canvas = document.getElementById('knn-canvas');
  const ctx = canvas.getContext('2d');
  const kSlider = document.getElementById('knn-k');
  const kVal = document.getElementById('knn-k-val');
  const resultEl = document.getElementById('knn-result');
  const votesEl = document.getElementById('knn-votes');

  const resize = () => { const b = canvas.getBoundingClientRect(); canvas.width = b.width; canvas.height = b.height; };
  resize();

  // Pre-seeded data points
  const classA = [[0.15,0.2],[0.25,0.35],[0.1,0.5],[0.3,0.15],[0.2,0.6],[0.35,0.45],[0.05,0.75],[0.4,0.25]];
  const classB = [[0.65,0.7],[0.75,0.55],[0.8,0.8],[0.6,0.85],[0.7,0.35],[0.85,0.5],[0.9,0.2],[0.6,0.6]];
  let mystery = null;
  let K = 3;

  function dist(a, b) { return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2); }

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Light grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath(); ctx.moveTo(i/10*W, 0); ctx.lineTo(i/10*W, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i/10*H); ctx.lineTo(W, i/10*H); ctx.stroke();
    }

    const allPoints = [
      ...classA.map(p => ({ x: p[0], y: p[1], cls: 'A' })),
      ...classB.map(p => ({ x: p[0], y: p[1], cls: 'B' }))
    ];

    let neighbors = [];
    if (mystery) {
      // Sort by distance
      const withDist = allPoints.map(p => ({ ...p, d: dist([mystery.x, mystery.y], [p.x, p.y]) }));
      withDist.sort((a, b) => a.d - b.d);
      neighbors = withDist.slice(0, K);

      // Draw radius circle
      const maxD = neighbors[neighbors.length - 1].d;
      ctx.beginPath();
      ctx.arc(mystery.x * W, mystery.y * H, maxD * Math.max(W, H), 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245,158,11,0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.stroke(); ctx.setLineDash([]);

      // Draw lines to neighbors
      neighbors.forEach(p => {
        ctx.beginPath();
        ctx.moveTo(mystery.x*W, mystery.y*H);
        ctx.lineTo(p.x*W, p.y*H);
        ctx.strokeStyle = 'rgba(245,158,11,0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Compute vote
      const votesA = neighbors.filter(p => p.cls === 'A').length;
      const votesB = K - votesA;
      const predicted = votesA > votesB ? 'A' : 'B';
      const color = predicted === 'A' ? 'var(--accent-cyan)' : '#f472b6';
      resultEl.textContent = `Class ${predicted}`;
      resultEl.style.color = color;
      votesEl.innerHTML = `
        <div style="display:flex;gap:10px;flex-direction:column;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="width:8px;height:8px;border-radius:50%;background:var(--accent-cyan);display:inline-block;"></span>
            Class A: <strong style="color:var(--accent-cyan);">${votesA} vote${votesA!==1?'s':''}</strong>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#f472b6;display:inline-block;"></span>
            Class B: <strong style="color:#f472b6;">${votesB} vote${votesB!==1?'s':''}</strong>
          </div>
          <div style="font-size:0.7rem;color:var(--text-muted);margin-top:4px;">Majority wins → Class <strong style="color:${color}">${predicted}</strong></div>
        </div>
      `;
    }

    // Draw data points
    allPoints.forEach(p => {
      const isNeighbor = neighbors.some(n => n.x === p.x && n.y === p.y);
      ctx.beginPath();
      ctx.arc(p.x*W, p.y*H, isNeighbor ? 8 : 6, 0, Math.PI*2);
      ctx.fillStyle = p.cls === 'A' ? 'rgba(6,182,212,0.9)' : 'rgba(244,114,182,0.9)';
      ctx.fill();
      if (isNeighbor) {
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.stroke();
      }
    });

    // Mystery point
    if (mystery) {
      ctx.beginPath(); ctx.arc(mystery.x*W, mystery.y*H, 10, 0, Math.PI*2);
      ctx.fillStyle = '#f59e0b'; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
      ctx.fillStyle = '#000'; ctx.font = 'bold 9px Inter,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('?', mystery.x*W, mystery.y*H);
      ctx.textAlign = 'left';
    }
  }

  canvas.onclick = (e) => {
    const r = canvas.getBoundingClientRect();
    mystery = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    draw();
  };

  kSlider.oninput = () => { K = parseInt(kSlider.value); kVal.textContent = K; draw(); };

  document.getElementById('knn-reset').onclick = () => {
    mystery = null; resultEl.textContent = 'Click canvas →'; resultEl.style.color = 'var(--text-muted)'; votesEl.textContent = '—'; draw();
  };

  draw();

  // Quiz
  renderQuiz(container, QUIZ_DATA.knn);
  renderNextLessonButton(container, 'knn');
}
