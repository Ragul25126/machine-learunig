// ── Data Preprocessing Page — Chapter 3 ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';

export function renderDataPreprocessing(container) {
  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Chapter 3 — Data Preprocessing</span>
      <h2>Cleaning & Preparing Data</h2>
      <p>Real-world data is messy. Preprocessing is the art of cleaning it before the AI sees it.</p>
    </div>

    <!-- Missing Values & Encoding -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 28px;">
      <div class="glass-card">
        <h4 style="margin-bottom: 12px; color: var(--accent-emerald);">🩹 1. Handling Missing Values</h4>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
          Sometimes data contains "NaN" (Not a Number). We can't just ignore it!
          <ul style="margin-top: 10px; padding-left: 20px; font-size: 0.82rem;">
            <li><strong>Delete:</strong> Remove the row (only if you have lots of data).</li>
            <li><strong>Impute:</strong> Fill the hole with the <strong>Average (Mean)</strong> or most common value.</li>
          </ul>
        </p>
      </div>
      <div class="glass-card">
        <h4 style="margin-bottom: 12px; color: var(--accent-cyan);">🔡 2. Encoding Categories</h4>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
          Computers only understand numbers, not words like "Red" or "Blue".
          <ul style="margin-top: 10px; padding-left: 20px; font-size: 0.82rem;">
            <li><strong>Label Encoding:</strong> Red = 1, Blue = 2.</li>
            <li><strong>One-Hot Encoding:</strong> Create new columns for each color.</li>
          </ul>
        </p>
      </div>
    </div>

    <!-- Feature Scaling -->
    <div class="glass-card" style="margin-bottom: 28px;">
      <div class="glass-card-header">
        <h3>⚖️ 3. Feature Scaling</h3>
      </div>
      <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px;">
        Imagine comparing a <strong>Salary ($50,000)</strong> to an <strong>Age (25)</strong>. The huge salary numbers will confuse the AI! We need to bring them to the same scale.
      </p>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="background: rgba(255,255,255,0.02); padding: 15px; border-radius: 8px;">
          <h5 style="margin-bottom: 8px;">Normalization</h5>
          <p style="font-size: 0.8rem; color: var(--text-muted);">Squashes all values between <strong>0 and 1</strong>.</p>
        </div>
        <div style="background: rgba(255,255,255,0.02); padding: 15px; border-radius: 8px;">
          <h5 style="margin-bottom: 8px;">Standardization</h5>
          <p style="font-size: 0.8rem; color: var(--text-muted);">Centers data around <strong>0</strong> with a standard spread.</p>
        </div>
      </div>
    </div>

    <!-- Interactive: Data Cleaning Lab -->
    <div class="glass-card" style="border-top: 4px solid var(--accent-emerald);">
      <div class="glass-card-header">
         <h3>🧪 Interactive: Data Cleaning Lab</h3>
         <p style="font-size:0.88rem; color: var(--text-secondary);">Watch the "Messy Table" transform into clean data.</p>
      </div>

      <div style="margin-top: 24px;">
        <div style="display: flex; gap: 10px; margin-bottom: 20px;">
           <button class="btn btn-secondary btn-pill" id="btn-fix-missing" style="font-size:0.8rem;">🩹 Fill Missing</button>
           <button class="btn btn-secondary btn-pill" id="btn-encode" style="font-size:0.8rem;">🔡 Encode Text</button>
           <button class="btn btn-primary btn-pill" id="btn-scale" style="font-size:0.8rem;">⚖️ Scale Features</button>
           <button class="btn btn-secondary" id="btn-reset-lab" style="font-size:0.8rem; margin-left: auto;">🔄 Reset</button>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1); color: var(--text-muted);">
                <th style="padding: 12px; text-align: left;">Customer</th>
                <th style="padding: 12px; text-align: left;">Age</th>
                <th style="padding: 12px; text-align: left;">Salary</th>
                <th style="padding: 12px; text-align: left;">Purchased</th>
              </tr>
            </thead>
            <tbody id="lab-table-body">
              <!-- Rows added by JS -->
            </tbody>
          </table>
        </div>
        <div id="lab-status" style="margin-top: 20px; font-size: 0.8rem; text-align: center; color: var(--accent-emerald); font-weight: 700;">Status: Ready for cleaning</div>
      </div>
    </div>
  `;

  const tableBody = document.getElementById('lab-table-body');
  const statusLine = document.getElementById('lab-status');
  
  const rawData = [
    { name: 'Alice', age: 25, salary: 50000, buy: 'No' },
    { name: 'Bob', age: null, salary: 60000, buy: 'Yes' },
    { name: 'Charlie', age: 27, salary: null, buy: 'No' },
    { name: 'David', age: 35, salary: 85000, buy: 'Yes' }
  ];

  let currentData = JSON.parse(JSON.stringify(rawData));

  function renderRows() {
    tableBody.innerHTML = currentData.map((d, i) => `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.03); transition: all 0.5s ease;">
        <td style="padding: 12px;">${d.name}</td>
        <td style="padding: 12px; font-weight: ${d.age === null ? '800' : '400'}; color: ${d.age === null ? 'var(--accent-amber)' : 'inherit'};">
           ${d.age === null ? 'Missing' : d.age}
        </td>
        <td style="padding: 12px; font-weight: ${d.salary === null ? '800' : '400'}; color: ${d.salary === null ? 'var(--accent-amber)' : 'inherit'};">
           ${d.salary === null ? 'Missing' : d.salary.toLocaleString()}
        </td>
        <td style="padding: 12px; color: ${typeof d.buy === 'number' ? 'var(--accent-emerald)' : 'inherit'}; font-weight: ${typeof d.buy === 'number' ? '800' : '400'};">
           ${d.buy}
        </td>
      </tr>
    `).join('');
  }

  renderRows();

  document.getElementById('btn-fix-missing').onclick = () => {
    currentData[1].age = 29; // Average
    currentData[2].salary = 65000; // Imputed
    statusLine.textContent = "Status: Missing values filled with Averages!";
    renderRows();
  };

  document.getElementById('btn-encode').onclick = () => {
    currentData.forEach(d => {
      if (typeof d.buy === 'string') {
        d.buy = d.buy === 'Yes' ? 1 : 0;
      }
    });
    statusLine.textContent = "Status: Categories encoded (Yes=1, No=0)!";
    renderRows();
  };

  document.getElementById('btn-scale').onclick = () => {
    currentData.forEach(d => {
      if (d.age && d.salary) {
        d.age = (d.age / 40).toFixed(2); // Mock scaling
        d.salary = (d.salary / 100000).toFixed(2);
      }
    });
    statusLine.textContent = "Status: Features scaled between 0 and 1!";
    renderRows();
  };

  document.getElementById('btn-reset-lab').onclick = () => {
    currentData = JSON.parse(JSON.stringify(rawData));
    statusLine.textContent = "Status: Ready for cleaning";
    renderRows();
  };

  // Quiz
  renderQuiz(container, QUIZ_DATA.dataPreprocessing);
  renderNextLessonButton(container, 'data-preprocessing');
}
