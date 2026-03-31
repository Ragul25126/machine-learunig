// ── Basic Mathematics Page — Chapter 5 ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';

export function renderBasicMath(container) {
  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Chapter 5 — Basic Mathematics</span>
      <h2>The Simple Math Behind ML</h2>
      <p>You don't need to be a math genius. These are the only 4 ideas that matter.</p>
    </div>

    <!-- Mean / Median / Mode -->
    <div class="glass-card" style="margin-bottom:28px;">
      <div class="glass-card-header">
        <h3>📊 1. Mean, Median & Mode</h3>
        <p style="font-size:0.88rem;color:var(--text-secondary);">Three ways to describe the "center" of your data.</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-top:20px;">
        <div style="background:rgba(6,182,212,0.08);border-radius:12px;padding:16px;">
          <div style="font-size:1.6rem;margin-bottom:8px;">➕</div>
          <h5 style="color:var(--accent-cyan);margin-bottom:6px;">Mean (Average)</h5>
          <p style="font-size:0.78rem;color:var(--text-secondary);">Add all numbers, divide by count.<br><br>
          <strong>Example:</strong> Scores: 70, 80, 90<br>
          Mean = (70+80+90) ÷ 3 = <strong>80</strong></p>
        </div>
        <div style="background:rgba(52,211,153,0.08);border-radius:12px;padding:16px;">
          <div style="font-size:1.6rem;margin-bottom:8px;">🎯</div>
          <h5 style="color:var(--accent-emerald);margin-bottom:6px;">Median (Middle)</h5>
          <p style="font-size:0.78rem;color:var(--text-secondary);">Sort the numbers, pick the middle one.<br><br>
          <strong>Example:</strong> 60, 75, <strong>80</strong>, 90, 95<br>
          Median = <strong>80</strong></p>
        </div>
        <div style="background:rgba(245,158,11,0.08);border-radius:12px;padding:16px;">
          <div style="font-size:1.6rem;margin-bottom:8px;">🏆</div>
          <h5 style="color:var(--accent-amber);margin-bottom:6px;">Mode (Most Common)</h5>
          <p style="font-size:0.78rem;color:var(--text-secondary);">The number that appears the most.<br><br>
          <strong>Example:</strong> 70, 80, 80, 90<br>
          Mode = <strong>80</strong> (appears twice)</p>
        </div>
      </div>

      <!-- Mean Line Visualizer -->
      <div style="margin-top:24px;">
        <h5 style="margin-bottom:12px;font-size:0.85rem;">👆 Add Data Points — Watch the Mean Move!</h5>
        <div style="display:flex;gap:10px;align-items:center;margin-bottom:14px;">
          <input type="number" id="math-input" min="0" max="200" placeholder="Enter a number (e.g. 75)"
            style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:8px 14px;color:var(--text-primary);font-size:0.85rem;width:220px;">
          <button class="btn btn-primary btn-pill" id="math-add-btn" style="font-size:0.8rem;">+ Add</button>
          <button class="btn btn-secondary" id="math-reset-btn" style="font-size:0.8rem;">🔄 Reset</button>
        </div>
        <div style="height:80px;background:rgba(255,255,255,0.02);border-radius:12px;position:relative;overflow:hidden;" id="math-chart">
          <div id="math-mean-line" style="position:absolute;top:0;bottom:0;width:2px;background:var(--accent-amber);transition:left 0.5s ease;display:none;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:10px;font-size:0.78rem;color:var(--text-muted);">
          <span>Values: <strong id="math-values">—</strong></span>
          <span>Mean: <strong id="math-mean" style="color:var(--accent-amber);">—</strong></span>
          <span>Median: <strong id="math-median" style="color:var(--accent-emerald);">—</strong></span>
        </div>
      </div>
    </div>

    <!-- Variance & Std Dev -->
    <div class="glass-card" style="margin-bottom:28px;">
      <div class="glass-card-header">
        <h3>📏 2. Variance & Standard Deviation</h3>
        <p style="font-size:0.88rem;color:var(--text-secondary);">How "spread out" is your data?</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:16px;">
        <div>
          <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.7;">
            Imagine two classes both scored an average of <strong>75</strong>:
            <ul style="margin-top:8px;padding-left:20px;font-size:0.82rem;">
              <li>Class A: 73, 74, 75, 76, 77 — <strong style="color:var(--accent-emerald);">Consistent!</strong></li>
              <li>Class B: 20, 50, 75, 100, 130 — <strong style="color:var(--accent-amber);">All over the place!</strong></li>
            </ul>
            <br>The <strong>Standard Deviation</strong> captures this spread. Small = consistent, Large = chaotic.
          </p>
        </div>
        <div style="background:rgba(255,255,255,0.02);border-radius:12px;padding:16px;">
          <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:10px;">Standard Deviation Formula (Don't worry about memorizing this!)</p>
          <div style="font-family:monospace;font-size:0.9rem;color:var(--accent-cyan);text-align:center;padding:10px;background:rgba(6,182,212,0.05);border-radius:8px;">
            σ = √( Σ(x - μ)² / n )
          </div>
          <p style="font-size:0.72rem;color:var(--text-muted);margin-top:8px;">μ = mean, n = count, Σ = "sum of all"</p>
        </div>
      </div>
    </div>

    <!-- Probability -->
    <div class="glass-card" style="margin-bottom:28px;">
      <div class="glass-card-header">
        <h3>🎲 3. Basic Probability</h3>
      </div>
      <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-top:16px;align-items:center;">
        <div>
          <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.7;">
            Probability is just a number from <strong>0 to 1</strong> that tells us "how likely is this?"
            <ul style="margin-top:10px;padding-left:20px;font-size:0.82rem;">
              <li><strong>0</strong> = Impossible (pigs can fly 🐷)</li>
              <li><strong>0.5</strong> = 50/50 (coin flip 🪙)</li>
              <li><strong>1</strong> = Certain (sun rises tomorrow ☀️)</li>
            </ul>
            <br>In ML, a model might say "I'm 85% sure this email is spam" — that's probability!
          </p>
        </div>
        <div style="text-align:center;padding:20px;background:rgba(255,255,255,0.02);border-radius:12px;">
          <div style="font-size:3rem;margin-bottom:8px;">🪙</div>
          <div style="font-size:1.5rem;font-weight:800;color:var(--accent-emerald);">P = 0.5</div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">Heads = 50%</div>
        </div>
      </div>
    </div>

    <!-- What is a Model + House Predictor -->
    <div class="glass-card" style="border-top:4px solid var(--accent-emerald);">
      <div class="glass-card-header">
        <h3>🏠 4. What is a Model? (The Big Idea)</h3>
        <p style="font-size:0.88rem;color:var(--text-secondary);">A model is just a function: <strong>Input → Output</strong>. That's it.</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-top:24px;align-items:start;">
        <!-- Explanation -->
        <div>
          <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.8;">
            Think of a model like a <strong>vending machine</strong>:
            <ul style="margin-top:8px;padding-left:20px;font-size:0.82rem;">
              <li>You put in money (Input)</li>
              <li>You get a snack (Output)</li>
            </ul>
            <br>
            A house price model works the same way. We know that — generally —
            a bigger house costs more money. So:
          </p>
          <div style="font-family:monospace;font-size:1.1rem;color:var(--accent-cyan);text-align:center;padding:12px;background:rgba(6,182,212,0.05);border-radius:8px;margin-top:12px;">
            price = size × 500 + 50,000
          </div>
          <p style="font-size:0.75rem;color:var(--text-muted);margin-top:8px;text-align:center;">This is <strong>y = mx + c</strong> — the linear equation!</p>
        </div>

        <!-- Interactive Predictor -->
        <div style="background:rgba(255,255,255,0.02);border-radius:16px;padding:24px;">
          <div class="slider-group">
            <div class="slider-label">
              <span>House Size</span>
              <span class="slider-value" id="house-size-val">1000 sq ft</span>
            </div>
            <input type="range" id="house-size" min="500" max="5000" step="50" value="1000">
          </div>

          <div class="slider-group" style="margin-top:16px;">
            <div class="slider-label">
              <span>Bedrooms</span>
              <span class="slider-value" id="house-beds-val">2</span>
            </div>
            <input type="range" id="house-beds" min="1" max="6" step="1" value="2">
          </div>

          <div style="margin-top:28px;text-align:center;padding:20px;background:linear-gradient(135deg,rgba(52,211,153,0.1),rgba(6,182,212,0.1));border-radius:12px;border:1px solid rgba(52,211,153,0.2);">
            <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:4px;">Predicted Price</div>
            <div id="house-price" style="font-size:2rem;font-weight:900;color:var(--accent-emerald);letter-spacing:-0.02em;">$100,000</div>
            <div style="font-size:0.7rem;color:var(--text-muted);margin-top:6px;">Model: price = (size × 500) + (beds × 20,000) + 50,000</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dive Deeper Resources -->
    <div class="glass-card" style="margin-top:28px; border-left: 4px solid var(--accent-amber);">
      <div class="glass-card-header">
        <h3>📚 Want to Go Deeper?</h3>
        <p style="font-size:0.88rem;color:var(--text-secondary);">This chapter gives you the intuition. These free books give you the full picture.</p>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-top:20px;">

        <a href="https://mml-book.github.io/" target="_blank" rel="noopener" style="text-decoration:none;">
          <div style="background:rgba(245,158,11,0.08);border:1px solid rgba(245,158,11,0.15);border-radius:12px;padding:16px;transition:all 0.3s;cursor:pointer;" onmouseover="this.style.background='rgba(245,158,11,0.15)'" onmouseout="this.style.background='rgba(245,158,11,0.08)'">
            <div style="font-size:1.8rem;margin-bottom:8px;">📖</div>
            <h5 style="color:var(--accent-amber);margin-bottom:6px;font-size:0.85rem;">Mathematics for Machine Learning</h5>
            <p style="font-size:0.72rem;color:var(--text-secondary);line-height:1.5;">Deisenroth, Faisal & Ong — Free PDF. Covers linear algebra, calculus, probability and stats for ML.</p>
            <div style="margin-top:10px;font-size:0.7rem;color:var(--accent-amber);">mml-book.github.io →</div>
          </div>
        </a>

        <a href="https://www.khanacademy.org/math/statistics-probability" target="_blank" rel="noopener" style="text-decoration:none;">
          <div style="background:rgba(52,211,153,0.08);border:1px solid rgba(52,211,153,0.15);border-radius:12px;padding:16px;transition:all 0.3s;cursor:pointer;" onmouseover="this.style.background='rgba(52,211,153,0.15)'" onmouseout="this.style.background='rgba(52,211,153,0.08)'">
            <div style="font-size:1.8rem;margin-bottom:8px;">🎓</div>
            <h5 style="color:var(--accent-emerald);margin-bottom:6px;font-size:0.85rem;">Khan Academy: Statistics & Probability</h5>
            <p style="font-size:0.72rem;color:var(--text-secondary);line-height:1.5;">Free, beginner-friendly video lessons on mean, variance, distributions, and more — with practice.</p>
            <div style="margin-top:10px;font-size:0.7rem;color:var(--accent-emerald);">khanacademy.org →</div>
          </div>
        </a>

        <a href="https://seeing-theory.brown.edu/" target="_blank" rel="noopener" style="text-decoration:none;">
          <div style="background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.15);border-radius:12px;padding:16px;transition:all 0.3s;cursor:pointer;" onmouseover="this.style.background='rgba(6,182,212,0.15)'" onmouseout="this.style.background='rgba(6,182,212,0.08)'">
            <div style="font-size:1.8rem;margin-bottom:8px;">👁️</div>
            <h5 style="color:var(--accent-cyan);margin-bottom:6px;font-size:0.85rem;">Seeing Theory — Visual Probability</h5>
            <p style="font-size:0.72rem;color:var(--text-secondary);line-height:1.5;">Beautiful interactive probability visualizations from Brown University. Perfect for visual learners.</p>
            <div style="margin-top:10px;font-size:0.7rem;color:var(--accent-cyan);">seeing-theory.brown.edu →</div>
          </div>
        </a>

      </div>
    </div>
  `;


  // ── Mean / Median Logic ──
  let vals = [];
  const chart = document.getElementById('math-chart');
  const meanLine = document.getElementById('math-mean-line');
  const valDisplay = document.getElementById('math-values');
  const meanDisplay = document.getElementById('math-mean');
  const medianDisplay = document.getElementById('math-median');

  function updateStats() {
    if (vals.length === 0) return;
    const sorted = [...vals].sort((a,b) => a-b);
    const mean = vals.reduce((a,b) => a+b, 0) / vals.length;
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length/2 - 1] + sorted[sorted.length/2]) / 2
      : sorted[Math.floor(sorted.length/2)];

    valDisplay.textContent = vals.join(', ');
    meanDisplay.textContent = mean.toFixed(1);
    medianDisplay.textContent = median.toFixed(1);

    // Draw dots
    chart.querySelectorAll('.math-dot').forEach(d => d.remove());
    const minV = sorted[0], maxV = sorted[sorted.length-1];
    const range = maxV - minV || 1;

    vals.forEach(v => {
      const dot = document.createElement('div');
      dot.className = 'math-dot';
      const left = ((v - minV) / range) * 90 + 5; // 5%-95%
      dot.style.cssText = `position:absolute;width:10px;height:10px;border-radius:50%;background:var(--accent-cyan);top:50%;transform:translateY(-50%) translateX(-50%);left:${left}%;transition:all 0.5s;`;
      chart.appendChild(dot);
    });

    // Mean vertical line
    const meanLeft = ((mean - minV) / range) * 90 + 5;
    meanLine.style.left = `${meanLeft}%`;
    meanLine.style.display = 'block';
  }

  document.getElementById('math-add-btn').onclick = () => {
    const input = document.getElementById('math-input');
    const v = parseFloat(input.value);
    if (!isNaN(v) && v >= 0 && v <= 200) {
      vals.push(v);
      input.value = '';
      updateStats();
    }
  };

  document.getElementById('math-reset-btn').onclick = () => {
    vals = [];
    chart.querySelectorAll('.math-dot').forEach(d => d.remove());
    meanLine.style.display = 'none';
    valDisplay.textContent = '—';
    meanDisplay.textContent = '—';
    medianDisplay.textContent = '—';
  };

  // ── House Price Logic ──
  const sizeSlider = document.getElementById('house-size');
  const bedsSlider = document.getElementById('house-beds');
  const sizeVal = document.getElementById('house-size-val');
  const bedsVal = document.getElementById('house-beds-val');
  const priceDisplay = document.getElementById('house-price');

  function updatePrice() {
    const size = parseInt(sizeSlider.value);
    const beds = parseInt(bedsSlider.value);
    sizeVal.textContent = `${size.toLocaleString()} sq ft`;
    bedsVal.textContent = beds;
    const price = size * 500 + beds * 20000 + 50000;
    priceDisplay.textContent = `$${price.toLocaleString()}`;
  }

  sizeSlider.oninput = updatePrice;
  bedsSlider.oninput = updatePrice;
  updatePrice();

  // Quiz
  renderQuiz(container, QUIZ_DATA.basicMath);
  renderNextLessonButton(container, 'basic-math');
}
