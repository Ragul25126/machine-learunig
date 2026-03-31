// ── Data Basics Page — Chapter 2 ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';

export function renderDataBasics(container) {
  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Chapter 2 — Data Basics</span>
      <h2>The Core of Everything: Data</h2>
      <p>Before any algorithm can learn, it needs a good dataset. Let's learn how we organize information.</p>
    </div>

    <!-- What is a Dataset -->
    <div class="glass-card" style="margin-bottom: 28px;">
      <div class="glass-card-header">
        <h3>📊 1. What is a Dataset?</h3>
      </div>
      <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px;">
        A <strong>dataset</strong> is just a collection of information, usually organized in a table. Think of it like an Excel sheet or a database of your favorite movies.
      </p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div class="glass-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
          <h4 style="font-size: 0.9rem; margin-bottom: 10px; color: var(--accent-emerald);">Features (X)</h4>
          <p style="font-size: 0.82rem; color: var(--text-secondary);">The <strong>Questions</strong>. The inputs we use to make a prediction. (e.g., Size of house, Number of rooms).</p>
        </div>
        <div class="glass-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);">
          <h4 style="font-size: 0.9rem; margin-bottom: 10px; color: var(--accent-amber);">Target (Y)</h4>
          <p style="font-size: 0.82rem; color: var(--text-secondary);">The <strong>Answer</strong>. What the model is trying to predict. (e.g., Price of the house).</p>
        </div>
      </div>
    </div>

    <!-- Data Types -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px;">
      <div class="glass-card">
        <div style="font-size: 1.8rem; margin-bottom: 12px;">🔢</div>
        <h4 style="margin-bottom: 8px;">Numerical Data</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
          Information you can count or measure. 
          <br><strong>Example:</strong> Age (25), Price ($500), Height (170cm).
        </p>
      </div>
      <div class="glass-card">
        <div style="font-size: 1.8rem; margin-bottom: 12px;">🏷️</div>
        <h4 style="margin-bottom: 8px;">Categorical Data</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
          Information used for labels or categories.
          <br><strong>Example:</strong> Eye color (Blue), City (New York), Class (Cat or Dog).
        </p>
      </div>
    </div>

    <!-- Interactive: Train vs Test Split -->
    <div class="glass-card" style="margin-bottom: 28px; border-top: 4px solid var(--accent-emerald);">
      <div class="glass-card-header">
        <h3>🏁 Interactive: Train vs. Test Split</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">We never test a student on the exact same questions they practiced. We do the same with AI.</p>
      </div>

      <div style="margin-top: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary);">Sample Dataset: Student Performance</div>
          <button class="btn btn-primary btn-pill" id="btn-split-data" style="font-size: 0.8rem; padding: 6px 16px;">⚡ Split Data</button>
        </div>

        <div style="position: relative; overflow-x: auto;">
          <table class="data-table" id="sampling-table" style="width: 100%; border-collapse: collapse; font-size: 0.8rem;">
            <thead>
              <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                <th style="padding: 12px; text-align: left; color: var(--text-muted);">Row</th>
                <th style="padding: 12px; text-align: left; color: var(--accent-emerald);">Hours Studied (X)</th>
                <th style="padding: 12px; text-align: left; color: var(--accent-emerald);">Attendance (%) (X)</th>
                <th style="padding: 12px; text-align: left; color: var(--accent-amber);">Final Grade (Y)</th>
                <th id="status-col-header" style="padding: 12px; text-align: left; color: var(--text-muted); opacity: 0;">Split Role</th>
              </tr>
            </thead>
            <tbody id="table-body">
              <!-- Rows will be added by JS -->
            </tbody>
          </table>
        </div>

        <div id="split-summary" style="margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; opacity: 0; transition: opacity 0.5s ease;">
           <div class="glass-card" style="border: 1px solid var(--accent-emerald); background: rgba(0,255,157,0.05);">
             <h4 style="color: var(--accent-emerald); font-size: 0.9rem; margin-bottom: 8px;">📖 Training Set (80%)</h4>
             <p style="font-size: 0.78rem;">Used to teach the model. The model sees the questions and the answers here.</p>
           </div>
           <div class="glass-card" style="border: 1px solid var(--accent-cyan); background: rgba(6,182,212,0.05);">
             <h4 style="color: var(--accent-cyan); font-size: 0.9rem; margin-bottom: 8px;">🧪 Testing Set (20%)</h4>
             <p style="font-size: 0.78rem;">The final exam. We hide the answers and ask the model to predict them.</p>
           </div>
        </div>
      </div>
    </div>
  `;

  const tableBody = document.getElementById('table-body');
  const splitBtn = document.getElementById('btn-split-data');
  const summary = document.getElementById('split-summary');
  const statusHeader = document.getElementById('status-col-header');

  const sampleData = [
    { hours: 10, attend: 95, grade: 'A' },
    { hours: 2, attend: 60, grade: 'D' },
    { hours: 8, attend: 90, grade: 'B' },
    { hours: 12, attend: 98, grade: 'A' },
    { hours: 5, attend: 75, grade: 'C' },
    { hours: 1, attend: 10, grade: 'F' },
    { hours: 7, attend: 85, grade: 'B' },
    { hours: 9, attend: 92, grade: 'A' },
    { hours: 4, attend: 70, grade: 'C' },
    { hours: 3, attend: 65, grade: 'D' }
  ];

  function renderRows() {
    tableBody.innerHTML = sampleData.map((d, i) => `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.03); transition: all 0.3s ease;" id="row-${i}">
        <td style="padding: 10px; color: var(--text-muted);">${i + 1}</td>
        <td style="padding: 10px;">${d.hours} hrs</td>
        <td style="padding: 10px;">${d.attend}%</td>
        <td style="padding: 10px; font-weight: 700; color: var(--accent-amber);">${d.grade}</td>
        <td id="role-${i}" style="padding: 10px; font-weight: 800; opacity: 0;">-</td>
      </tr>
    `).join('');
  }

  renderRows();

  splitBtn.addEventListener('click', () => {
    splitBtn.disabled = true;
    splitBtn.textContent = "Splitting...";
    statusHeader.style.opacity = "1";

    sampleData.forEach((_, i) => {
      const row = document.getElementById(`row-${i}`);
      const role = document.getElementById(`role-${i}`);
      
      // 80/20 split
      const isTest = i === 1 || i === 8; // Row 2 and 9 for testing
      
      setTimeout(() => {
        if (isTest) {
          row.style.background = "rgba(6,182,212,0.15)";
          role.textContent = "TEST";
          role.style.color = "var(--accent-cyan)";
        } else {
          row.style.background = "rgba(0,255,157,0.1)";
          role.textContent = "TRAIN";
          role.style.color = "var(--accent-emerald)";
        }
        role.style.opacity = "1";

        if (i === sampleData.length - 1) {
          summary.style.opacity = "1";
          splitBtn.textContent = "Reset";
          splitBtn.disabled = false;
          splitBtn.onclick = () => {
             renderRows();
             statusHeader.style.opacity = "0";
             summary.style.opacity = "0";
             splitBtn.textContent = "⚡ Split Data";
             splitBtn.onclick = null;
          };
        }
      }, i * 150);
    });
  });

  // Quiz
  renderQuiz(container, QUIZ_DATA.dataBasics);
  renderNextLessonButton(container, 'data-basics');
}
