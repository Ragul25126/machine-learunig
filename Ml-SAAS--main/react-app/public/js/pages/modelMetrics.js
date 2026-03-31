// ── Model Metrics Page — Confusion Matrix ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';

export function renderModelMetrics(container) {
  // Data for interactive confusion matrix
  const labels = ['Spam', 'Not Spam'];

  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Advanced — Model Evaluation Metrics</span>
      <h2>Is Your Model Actually Good?</h2>
      <p>Accuracy alone is <em>not enough</em>. Here's the full picture — and it's not as scary as it sounds.</p>
    </div>

    <!-- Concepts row -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:28px;">
      <div class="glass-card">
        <h5 style="color:var(--accent-emerald);margin-bottom:8px;">✅ Accuracy</h5>
        <p style="font-size:0.78rem;color:var(--text-secondary);line-height:1.6;">
          Out of <em>all</em> predictions, how many were correct?<br><br>
          <code style="color:var(--accent-cyan);">(TP + TN) / Total</code><br><br>
          ⚠️ Beware! 99% accuracy can still be terrible if data is imbalanced.
        </p>
      </div>
      <div class="glass-card">
        <h5 style="color:var(--accent-cyan);margin-bottom:8px;">🔍 Precision</h5>
        <p style="font-size:0.78rem;color:var(--text-secondary);line-height:1.6;">
          Of everything labeled Positive, how many were actually positive?<br><br>
          <code style="color:var(--accent-cyan);">TP / (TP + FP)</code><br><br>
          Use when <strong>false alarms are costly</strong> (e.g. spam filter flagging legit emails).
        </p>
      </div>
      <div class="glass-card">
        <h5 style="color:var(--accent-amber);margin-bottom:8px;">🎣 Recall (Sensitivity)</h5>
        <p style="font-size:0.78rem;color:var(--text-secondary);line-height:1.6;">
          Of everything that actually was Positive, how many did we find?<br><br>
          <code style="color:var(--accent-cyan);">TP / (TP + FN)</code><br><br>
          Use when <strong>missing positives is costly</strong> (e.g. cancer detection).
        </p>
      </div>
    </div>

    <!-- Confusion Matrix Interactive -->
    <div class="glass-card" style="border-top:4px solid var(--accent-emerald);">
      <div class="glass-card-header">
        <h3>🟩 Interactive Confusion Matrix</h3>
        <p style="font-size:0.88rem;color:var(--text-secondary);">Adjust the sliders to change predictions, and see how all metrics update live.</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:24px;align-items:start;">

        <!-- Matrix itself -->
        <div>
          <p style="font-size:0.72rem;color:var(--text-muted);margin-bottom:12px;text-align:center;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Predicted →</p>
          <div style="display:grid;grid-template-columns:auto 1fr 1fr;gap:4px;align-items:center;">
            <div style="font-size:0.65rem;color:var(--text-muted);writing-mode:vertical-lr;transform:rotate(180deg);padding-right:8px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">Actual ↓</div>
            <div style="font-size:0.75rem;color:var(--accent-cyan);font-weight:700;text-align:center;padding:6px;">Spam (Pos)</div>
            <div style="font-size:0.75rem;color:var(--text-muted);font-weight:700;text-align:center;padding:6px;">Not Spam (Neg)</div>

            <div style="font-size:0.75rem;color:var(--accent-cyan);font-weight:700;padding:6px;">Spam (Pos)</div>
            <div id="cm-tp" style="background:rgba(52,211,153,0.15);border:2px solid rgba(52,211,153,0.4);border-radius:10px;padding:20px;text-align:center;">
              <div style="font-size:0.6rem;color:var(--text-muted);margin-bottom:4px;">TRUE POSITIVE</div>
              <div id="cm-tp-val" style="font-size:2rem;font-weight:900;color:var(--accent-emerald);">50</div>
              <div style="font-size:0.62rem;color:var(--text-muted);margin-top:4px;">Correctly labeled spam ✅</div>
            </div>
            <div id="cm-fp" style="background:rgba(245,158,11,0.08);border:2px solid rgba(245,158,11,0.2);border-radius:10px;padding:20px;text-align:center;">
              <div style="font-size:0.6rem;color:var(--text-muted);margin-bottom:4px;">FALSE POSITIVE</div>
              <div id="cm-fp-val" style="font-size:2rem;font-weight:900;color:var(--accent-amber);">10</div>
              <div style="font-size:0.62rem;color:var(--text-muted);margin-top:4px;">Legit email called spam ⚠️</div>
            </div>

            <div style="font-size:0.75rem;color:var(--text-muted);font-weight:700;padding:6px;">Not Spam (Neg)</div>
            <div id="cm-fn" style="background:rgba(244,114,182,0.08);border:2px solid rgba(244,114,182,0.2);border-radius:10px;padding:20px;text-align:center;">
              <div style="font-size:0.6rem;color:var(--text-muted);margin-bottom:4px;">FALSE NEGATIVE</div>
              <div id="cm-fn-val" style="font-size:2rem;font-weight:900;color:#f472b6;">5</div>
              <div style="font-size:0.62rem;color:var(--text-muted);margin-top:4px;">Spam that slipped through ❌</div>
            </div>
            <div id="cm-tn" style="background:rgba(52,211,153,0.15);border:2px solid rgba(52,211,153,0.4);border-radius:10px;padding:20px;text-align:center;">
              <div style="font-size:0.6rem;color:var(--text-muted);margin-bottom:4px;">TRUE NEGATIVE</div>
              <div id="cm-tn-val" style="font-size:2rem;font-weight:900;color:var(--accent-emerald);">35</div>
              <div style="font-size:0.62rem;color:var(--text-muted);margin-top:4px;">Correctly labeled legit ✅</div>
            </div>
          </div>
        </div>

        <!-- Controls + Metrics -->
        <div style="display:flex;flex-direction:column;gap:16px;">
          <!-- Sliders -->
          <div style="background:rgba(255,255,255,0.02);border-radius:12px;padding:16px;">
            <div style="font-size:0.75rem;color:var(--text-secondary);font-weight:700;margin-bottom:12px;">Adjust Counts</div>
            ${[
              { id:'tp', label:'True Positives (TP)', min:0, max:100, val:50, color:'var(--accent-emerald)' },
              { id:'fp', label:'False Positives (FP)', min:0, max:50,  val:10, color:'var(--accent-amber)' },
              { id:'fn', label:'False Negatives (FN)', min:0, max:50,  val:5,  color:'#f472b6' },
              { id:'tn', label:'True Negatives (TN)',  min:0, max:100, val:35, color:'var(--accent-emerald)' },
            ].map(s => `
              <div style="margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;font-size:0.72rem;margin-bottom:4px;">
                  <span style="color:${s.color};">${s.label}</span>
                  <span id="sl-${s.id}-val" style="color:${s.color};font-family:monospace;">${s.val}</span>
                </div>
                <input type="range" id="sl-${s.id}" min="${s.min}" max="${s.max}" value="${s.val}" style="width:100%;">
              </div>
            `).join('')}
          </div>

          <!-- Calculated Metrics -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${[
              { id:'acc',  label:'Accuracy',  color:'var(--accent-emerald)' },
              { id:'prec', label:'Precision', color:'var(--accent-cyan)' },
              { id:'rec',  label:'Recall',    color:'var(--accent-amber)' },
              { id:'f1',   label:'F1 Score',  color:'#a78bfa' },
            ].map(m => `
              <div style="background:rgba(255,255,255,0.03);border-radius:10px;padding:14px;text-align:center;">
                <div style="font-size:0.65rem;color:var(--text-muted);margin-bottom:4px;">${m.label}</div>
                <div id="metric-${m.id}" style="font-size:1.4rem;font-weight:900;color:${m.color};">—</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  function update() {
    const tp = parseInt(document.getElementById('sl-tp').value);
    const fp = parseInt(document.getElementById('sl-fp').value);
    const fn = parseInt(document.getElementById('sl-fn').value);
    const tn = parseInt(document.getElementById('sl-tn').value);

    const counts = { tp, fp, fn, tn };
    ['tp','fp','fn','tn'].forEach(id => {
      document.getElementById(`sl-${id}-val`).textContent = counts[id];
      document.getElementById(`cm-${id}-val`).textContent = counts[id];
    });

    const total = tp + fp + fn + tn;
    const acc   = total ? ((tp + tn) / total * 100).toFixed(1) + '%' : '—';
    const prec  = (tp + fp) ? (tp / (tp + fp) * 100).toFixed(1) + '%' : '—';
    const rec   = (tp + fn) ? (tp / (tp + fn) * 100).toFixed(1) + '%' : '—';
    const pNum  = (tp + fp) ? tp / (tp + fp) : 0;
    const rNum  = (tp + fn) ? tp / (tp + fn) : 0;
    const f1    = (pNum + rNum) ? (2 * pNum * rNum / (pNum + rNum) * 100).toFixed(1) + '%' : '—';

    document.getElementById('metric-acc').textContent  = acc;
    document.getElementById('metric-prec').textContent = prec;
    document.getElementById('metric-rec').textContent  = rec;
    document.getElementById('metric-f1').textContent   = f1;
  }

  ['tp','fp','fn','tn'].forEach(id => {
    document.getElementById(`sl-${id}`).oninput = update;
  });
  update();

  // Quiz
  renderQuiz(container, QUIZ_DATA.modelMetrics);
  renderNextLessonButton(container, 'model-metrics');
}
