// ── Foundations Page — Chapter 1 ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';

export function renderFoundations(container) {
  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Chapter 1 — The Foundations</span>
      <h2>Welcome to the World of AI</h2>
      <p>Before we dive into the math and algorithms, let's understand the landscape of Machine Learning.</p>
    </div>

    <!-- AI vs ML vs DL -->
    <div class="glass-card" style="margin-bottom: 28px;">
      <div class="glass-card-header">
        <h3>🧠 AI vs. ML vs. Deep Learning</h3>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; align-items: center;">
        <div>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 20px;">
            Think of these as degrees of "smartness":
          </p>
          <ul style="color: var(--text-secondary); line-height: 1.8; padding-left: 20px;">
            <li><strong>AI (The Big Goal):</strong> Any computer doing something "smart." Like a calculator that solves math or a chess game.</li>
            <li><strong>ML (The Learning):</strong> A way to make machines smart by giving them <strong>examples</strong> instead of rules. Like a music app learning what songs you like.</li>
            <li><strong>DL (The Superbrain):</strong> A very powerful way to learn using many layers (like a human brain). Used for complex things like Face ID.</li>
          </ul>
        </div>
        <div style="display: flex; justify-content: center; position: relative; height: 260px;">
          <!-- Simple CSS Venn Diagram -->
          <div class="venn-circle ai" style="width: 240px; height: 240px; border: 2px solid rgba(255,255,255,0.2); border-radius: 50%; background: rgba(255,255,255,0.03); display: flex; align-items: center; justify-content: center; position: absolute;">
            <span style="position: absolute; top: 10px; font-weight: 800; font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">AI</span>
            <div class="venn-circle ml" style="width: 170px; height: 170px; border: 2px solid var(--accent-emerald); border-radius: 50%; background: rgba(0,255,157,0.05); display: flex; align-items: center; justify-content: center; position: relative;">
               <span style="position: absolute; top: 10px; font-weight: 800; font-size: 0.7rem; color: var(--accent-emerald); text-transform: uppercase;">ML</span>
               <div class="venn-circle dl" style="width: 100px; height: 100px; border: 2px solid var(--accent-cyan); border-radius: 50%; background: rgba(6,182,212,0.1); display: flex; align-items: center; justify-content: center;">
                 <span style="font-weight: 800; font-size: 0.7rem; color: var(--accent-cyan); text-transform: uppercase; text-align: center;">Deep<br>Learning</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Types of ML -->
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 28px;">
      <div class="glass-card">
        <div style="font-size: 2rem; margin-bottom: 12px;">👨‍🏫</div>
        <h4 style="margin-bottom: 8px;">1. Learning with a Teacher</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
          (Supervised) You give the computer the <strong>Questions and the Answers</strong>. Like showing 1000 pictures of cats and saying "This is a cat."
        </p>
        <div class="tag tag-emerald" style="margin-top: 12px; font-size: 0.7rem;">Spam Filters</div>
      </div>
      <div class="glass-card">
        <div style="font-size: 2rem; margin-bottom: 12px;">🔍</div>
        <h4 style="margin-bottom: 8px;">2. Finding Patterns</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
          (Unsupervised) The computer finds <strong>Groups</strong> on its own without knowing the names. Like sorting toys into "round ones" and "square ones."
        </p>
        <div class="tag tag-blue" style="margin-top: 12px; font-size: 0.7rem;">Grouping Customers</div>
      </div>
      <div class="glass-card">
        <div style="font-size: 2rem; margin-bottom: 12px;">🎮</div>
        <h4 style="margin-bottom: 8px;">3. Trial & Error</h4>
        <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6;">
          (Reinforcement) The computer learns from <strong>Rewards</strong> (points). Like a robot learning to walk by getting points for every step it doesn't fall.
        </p>
        <div class="tag tag-amber" style="margin-top: 12px; font-size: 0.7rem;">Video Game Bots</div>
      </div>
    </div>

    <!-- Deep Dive: 3 Types of ML -->
    <div class="glass-card" style="margin-bottom:28px;">
      <div class="glass-card-header">
        <h3>📚 The 3 Types of ML — Explained Simply</h3>
        <p style="font-size:0.88rem;color:var(--text-secondary);">Every ML algorithm in the world belongs to one of these three families. Let's understand them once and for all.</p>
      </div>

      <!-- Supervised -->
      <div style="margin-top:24px;padding:20px;background:rgba(52,211,153,0.05);border-radius:14px;border:1px solid rgba(52,211,153,0.15);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <span style="font-size:2rem;">👨‍🏫</span>
          <div>
            <h4 style="color:var(--accent-emerald);margin:0;">1. Supervised Learning</h4>
            <p style="font-size:0.75rem;color:var(--text-muted);margin:2px 0 0;">"Learning with a Teacher"</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          <div>
            <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.8;">
              In supervised learning, you give the model <strong>labeled data</strong> — data where you already know the answer.
              <br><br>
              <strong>Analogy:</strong> Imagine you're teaching a child to recognize dogs. You show them 100 photos and say "this is a dog ✅" and "this is not a dog ❌". After seeing enough examples, they can identify dogs on their own.
              <br><br>
              The model learns a <strong>mapping from inputs → outputs</strong>.
            </p>
          </div>
          <div>
            <div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:14px;">
              <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:10px;font-weight:700;">HOW IT WORKS</div>
              <div style="display:flex;align-items:center;gap:6px;font-size:0.78rem;flex-wrap:wrap;">
                <div style="padding:6px 10px;background:rgba(52,211,153,0.1);border-radius:8px;color:var(--accent-emerald);">📸 Input</div>
                <span style="color:var(--text-muted);">+</span>
                <div style="padding:6px 10px;background:rgba(245,158,11,0.1);border-radius:8px;color:var(--accent-amber);">🏷️ Label (answer)</div>
                <span style="color:var(--text-muted);">→</span>
                <div style="padding:6px 10px;background:rgba(6,182,212,0.1);border-radius:8px;color:var(--accent-cyan);">🧠 Model learns</div>
                <span style="color:var(--text-muted);">→</span>
                <div style="padding:6px 10px;background:rgba(52,211,153,0.1);border-radius:8px;color:var(--accent-emerald);">🔮 Predicts new</div>
              </div>
              <div style="margin-top:14px;">
                <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;font-weight:700;">REAL EXAMPLES</div>
                <ul style="font-size:0.78rem;color:var(--text-secondary);padding-left:16px;line-height:1.8;">
                  <li>📧 Email spam detection (spam / not spam)</li>
                  <li>🏠 House price prediction (price = ?)</li>
                  <li>🩺 Disease diagnosis (sick / healthy)</li>
                  <li>😊 Face recognition (who is this?)</li>
                </ul>
              </div>
              <div style="margin-top:10px;">
                <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;font-weight:700;">ALGORITHMS USED</div>
                <div style="display:flex;gap:6px;flex-wrap:wrap;">
                  ${['Linear Regression','Logistic Regression','Decision Trees','KNN','Neural Networks'].map(a =>
                    `<span style="font-size:0.65rem;padding:3px 8px;background:rgba(52,211,153,0.08);border-radius:6px;color:var(--accent-emerald);">${a}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Unsupervised -->
      <div style="margin-top:16px;padding:20px;background:rgba(6,182,212,0.05);border-radius:14px;border:1px solid rgba(6,182,212,0.15);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <span style="font-size:2rem;">🔍</span>
          <div>
            <h4 style="color:var(--accent-cyan);margin:0;">2. Unsupervised Learning</h4>
            <p style="font-size:0.75rem;color:var(--text-muted);margin:2px 0 0;">"Finding Hidden Patterns"</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          <div>
            <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.8;">
              In unsupervised learning, you give the model <strong>unlabeled data</strong> — no answers provided. The model discovers <strong>hidden structure</strong> on its own.
              <br><br>
              <strong>Analogy:</strong> You drop 1,000 songs in front of someone who has never heard music before. They'll naturally start grouping them — "these have fast beats... these have slow rhythms..." — without anyone telling them the categories.
              <br><br>
              There's <strong>no right or wrong answer</strong>. The model finds whatever patterns exist.
            </p>
          </div>
          <div>
            <div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:14px;">
              <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:10px;font-weight:700;">HOW IT WORKS</div>
              <div style="display:flex;align-items:center;gap:6px;font-size:0.78rem;flex-wrap:wrap;">
                <div style="padding:6px 10px;background:rgba(6,182,212,0.1);border-radius:8px;color:var(--accent-cyan);">📦 Raw Data</div>
                <span style="color:var(--text-muted);">(no labels)</span>
                <span style="color:var(--text-muted);">→</span>
                <div style="padding:6px 10px;background:rgba(6,182,212,0.1);border-radius:8px;color:var(--accent-cyan);">🧠 Model finds groups</div>
              </div>
              <div style="margin-top:14px;">
                <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;font-weight:700;">REAL EXAMPLES</div>
                <ul style="font-size:0.78rem;color:var(--text-secondary);padding-left:16px;line-height:1.8;">
                  <li>🛍️ Customer segmentation (group shoppers by behavior)</li>
                  <li>🎵 Music recommendation (find similar songs)</li>
                  <li>🖼️ Image compression (find redundant pixels)</li>
                  <li>🎯 Anomaly detection (what doesn't fit?)</li>
                </ul>
              </div>
              <div style="margin-top:10px;">
                <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;font-weight:700;">ALGORITHMS USED</div>
                <div style="display:flex;gap:6px;flex-wrap:wrap;">
                  ${['K-Means','DBSCAN','PCA','Autoencoders'].map(a =>
                    `<span style="font-size:0.65rem;padding:3px 8px;background:rgba(6,182,212,0.08);border-radius:6px;color:var(--accent-cyan);">${a}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reinforcement -->
      <div style="margin-top:16px;padding:20px;background:rgba(245,158,11,0.05);border-radius:14px;border:1px solid rgba(245,158,11,0.15);">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <span style="font-size:2rem;">🎮</span>
          <div>
            <h4 style="color:var(--accent-amber);margin:0;">3. Reinforcement Learning</h4>
            <p style="font-size:0.75rem;color:var(--text-muted);margin:2px 0 0;">"Learning from Rewards & Punishments"</p>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          <div>
            <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.8;">
              An <strong>"agent"</strong> takes actions in an environment and learns from <strong>rewards (+) or penalties (-)</strong>. No labeled data — just trial and error.
              <br><br>
              <strong>Analogy:</strong> Teaching a dog tricks. If it sits when you say "sit" → 🍖 treat (reward). If it doesn't → nothing. Over thousands of tries, the dog learns what earns treats.
              <br><br>
              The goal: <strong>maximize total reward over time</strong>.
            </p>
          </div>
          <div>
            <div style="background:rgba(255,255,255,0.02);border-radius:10px;padding:14px;">
              <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:10px;font-weight:700;">THE LOOP</div>
              <div style="display:flex;align-items:center;gap:6px;font-size:0.75rem;flex-wrap:wrap;">
                <div style="padding:6px 10px;background:rgba(245,158,11,0.1);border-radius:8px;color:var(--accent-amber);">🤖 Agent</div>
                <span style="color:var(--text-muted);">→ Action →</span>
                <div style="padding:6px 10px;background:rgba(245,158,11,0.1);border-radius:8px;color:var(--accent-amber);">🌍 Environment</div>
                <span style="color:var(--text-muted);">→ Reward →</span>
                <div style="padding:6px 10px;background:rgba(245,158,11,0.1);border-radius:8px;color:var(--accent-amber);">🤖 Agent (learns)</div>
              </div>
              <div style="margin-top:14px;">
                <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;font-weight:700;">REAL EXAMPLES</div>
                <ul style="font-size:0.78rem;color:var(--text-secondary);padding-left:16px;line-height:1.8;">
                  <li>🎯 AlphaGo — learned to beat world chess/Go champions</li>
                  <li>🚗 Self-driving cars — reward = don't crash</li>
                  <li>🤖 Robot walking — reward = don't fall</li>
                  <li>💹 Trading bots — reward = make profit</li>
                </ul>
              </div>
              <div style="margin-top:10px;">
                <div style="font-size:0.7rem;color:var(--text-muted);margin-bottom:6px;font-weight:700;">ALGORITHMS USED</div>
                <div style="display:flex;gap:6px;flex-wrap:wrap;">
                  ${['Q-Learning','PPO','A3C','DQN'].map(a =>
                    `<span style="font-size:0.65rem;padding:3px 8px;background:rgba(245,158,11,0.08);border-radius:6px;color:var(--accent-amber);">${a}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Comparison Table -->
      <div style="margin-top:16px;overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:0.78rem;">
          <thead>
            <tr style="background:rgba(255,255,255,0.03);">
              <th style="padding:10px 14px;text-align:left;color:var(--text-muted);font-size:0.65rem;text-transform:uppercase;letter-spacing:0.08em;">Type</th>
              <th style="padding:10px 14px;text-align:left;color:var(--text-muted);font-size:0.65rem;text-transform:uppercase;letter-spacing:0.08em;">Has Labels?</th>
              <th style="padding:10px 14px;text-align:left;color:var(--text-muted);font-size:0.65rem;text-transform:uppercase;letter-spacing:0.08em;">Goal</th>
              <th style="padding:10px 14px;text-align:left;color:var(--text-muted);font-size:0.65rem;text-transform:uppercase;letter-spacing:0.08em;">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-top:1px solid rgba(255,255,255,0.05);">
              <td style="padding:10px 14px;"><strong style="color:var(--accent-emerald);">👨‍🏫 Supervised</strong></td>
              <td style="padding:10px 14px;color:var(--accent-emerald);">✅ Yes</td>
              <td style="padding:10px 14px;color:var(--text-secondary);">Predict output from input</td>
              <td style="padding:10px 14px;color:var(--text-secondary);">Spam detection</td>
            </tr>
            <tr style="border-top:1px solid rgba(255,255,255,0.05);">
              <td style="padding:10px 14px;"><strong style="color:var(--accent-cyan);">🔍 Unsupervised</strong></td>
              <td style="padding:10px 14px;color:#f472b6;">❌ No</td>
              <td style="padding:10px 14px;color:var(--text-secondary);">Find hidden clusters/patterns</td>
              <td style="padding:10px 14px;color:var(--text-secondary);">Customer grouping</td>
            </tr>
            <tr style="border-top:1px solid rgba(255,255,255,0.05);">
              <td style="padding:10px 14px;"><strong style="color:var(--accent-amber);">🎮 Reinforcement</strong></td>
              <td style="padding:10px 14px;color:var(--accent-amber);">🏆 Rewards</td>
              <td style="padding:10px 14px;color:var(--text-secondary);">Maximize cumulative reward</td>
              <td style="padding:10px 14px;color:var(--text-secondary);">Game-playing AI</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Interactive: Classify Fruits -->

    <div class="glass-card" style="margin-bottom: 28px; border-top: 4px solid var(--accent-emerald);">
      <div class="glass-card-header">
        <h3>🍎 Interactive: Classifying Fruits</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary);">Watch how a model uses features to make a prediction.</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 30px; margin-top: 20px;">
        <!-- Controls -->
        <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px;">
          <h5 style="margin-bottom: 16px; font-size: 0.9rem; color: var(--text-primary);">Inputs (Features)</h5>
          
          <div class="slider-group">
            <div class="slider-label">
              <span>Weight (grams)</span>
              <span class="slider-value" id="fruit-weight-val">150g</span>
            </div>
            <input type="range" id="fruit-weight-slider" min="50" max="300" step="1" value="150">
          </div>

          <div class="slider-group" style="margin-top: 20px;">
            <div class="slider-label">
              <span>Texture (Smooth to Bumpy)</span>
              <span class="slider-value" id="fruit-texture-val">50%</span>
            </div>
            <input type="range" id="fruit-texture-slider" min="0" max="100" step="1" value="50">
          </div>

          <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 10px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Ground Truth</div>
            <div style="display: flex; gap: 10px;">
               <button class="btn btn-secondary btn-pill" id="btn-apple" style="flex: 1; font-size: 0.8rem;">🍎 Apple</button>
               <button class="btn btn-secondary btn-pill" id="btn-banana" style="flex: 1; font-size: 0.8rem;">🍌 Banana</button>
            </div>
          </div>
        </div>

        <!-- Visualization -->
        <div style="position: relative; background: rgba(0,0,0,0.2); border-radius: 12px; border: 1px dashed rgba(255,255,255,0.1); padding: 20px; display: flex; align-items: center; justify-content: center; min-height: 300px;">
          
          <!-- Input -->
          <div id="fruit-input" style="text-align: center; transition: all 0.5s ease;">
             <div id="fruit-emoji" style="font-size: 4rem; margin-bottom: 10px; filter: drop-shadow(0 0 10px rgba(255,255,255,0.2));">🍎</div>
             <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">NEW INPUT</div>
          </div>

          <!-- Connecting Arrow -->
          <div style="margin: 0 30px; color: var(--text-muted); font-size: 1.5rem; animation: pulse 2s infinite;">→</div>

          <!-- Model -->
          <div style="background: var(--bg-card); border: 2px solid var(--accent-emerald); padding: 20px; border-radius: 16px; text-align: center; box-shadow: 0 0 30px rgba(0,255,157,0.1);">
             <div style="font-size: 1.5rem; margin-bottom: 5px;">🤖</div>
             <div style="font-size: 0.7rem; font-weight: 800; letter-spacing: 0.1em; color: var(--accent-emerald);">MODEL</div>
             <div id="model-status" style="font-size: 0.8rem; margin-top: 5px; color: var(--text-primary);">Processing...</div>
          </div>

          <!-- Connecting Arrow -->
          <div style="margin: 0 30px; color: var(--text-muted); font-size: 1.5rem; animation: pulse 2s infinite;">→</div>

          <!-- Output -->
          <div id="fruit-output" style="text-align: center;">
             <div id="predicted-label" style="font-size: 1.1rem; font-weight: 800; color: var(--accent-emerald);">?</div>
             <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted);">PREDICTION</div>
          </div>

          <!-- Background Decorative Flow -->
          <canvas id="flow-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.3;"></canvas>
        </div>
      </div>

      <!-- Real-world examples list -->
      <div style="margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px;">
        <h4 style="margin-bottom: 16px;">🌍 Where do you see this?</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 8px;">
            <span style="font-size: 1.2rem;">📧</span>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700;">Gmail Spam Filter</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">Supervised Learning</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 8px;">
            <span style="font-size: 1.2rem;">🎬</span>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700;">Netflix Recommendations</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">Unsupervised/Reinforcement</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 8px;">
            <span style="font-size: 1.2rem;">🛒</span>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700;">Amazon's "You might like"</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">Recommendation Engines</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 8px;">
            <span style="font-size: 1.2rem;">🚗</span>
            <div>
              <div style="font-size: 0.85rem; font-weight: 700;">Self-Driving Cars</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">Deep Learning/Computer Vision</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Logic for the interactive demo
  const weightSlider = document.getElementById('fruit-weight-slider');
  const textureSlider = document.getElementById('fruit-texture-slider');
  const weightVal = document.getElementById('fruit-weight-val');
  const textureVal = document.getElementById('fruit-texture-val');
  const emojiDisplay = document.getElementById('fruit-emoji');
  const predictedLabel = document.getElementById('predicted-label');
  const modelStatus = document.getElementById('model-status');

  function updatePrediction() {
    const weight = parseInt(weightSlider.value);
    const texture = parseInt(textureSlider.value);
    
    weightVal.textContent = `${weight}g`;
    textureVal.textContent = `${texture}%`;

    // Simple heuristic for classification
    // Bananas are usually lighter and smoother (low texture) or longer...
    // Let's say: If weight > 200 and texture < 40 => Banana
    // Or weight < 120 and texture > 60 => Apple?
    // Let's make it simpler: Weight > 180 is likely Banana (longer/heavier), Texture > 70 is Apple (bumpy/rough species)
    
    // Prediction logic
    let prediction = "";
    let confidence = 0;

    // Decision boundary: Banana if weight > 170 OR (weight > 130 AND texture < 30)
    if (weight > 170 || (weight > 130 && texture < 40)) {
      prediction = "🍌 Banana";
      emojiDisplay.textContent = "🍌";
      emojiDisplay.style.transform = `scale(${0.8 + weight/200}) rotate(${texture/10}deg)`;
    } else {
      prediction = "🍎 Apple";
      emojiDisplay.textContent = "🍎";
      emojiDisplay.style.transform = `scale(${0.8 + weight/250})`;
    }

    modelStatus.textContent = "Classifying...";
    
    setTimeout(() => {
      predictedLabel.textContent = prediction;
      modelStatus.textContent = "Ready";
    }, 300);
  }

  weightSlider.addEventListener('input', updatePrediction);
  textureSlider.addEventListener('input', updatePrediction);

  document.getElementById('btn-apple').addEventListener('click', () => {
    weightSlider.value = 130;
    textureSlider.value = 70;
    updatePrediction();
  });

  document.getElementById('btn-banana').addEventListener('click', () => {
    weightSlider.value = 220;
    textureSlider.value = 20;
    updatePrediction();
  });

  // Initial call
  updatePrediction();

  // Quiz
  renderQuiz(container, QUIZ_DATA.foundations);
  renderNextLessonButton(container, 'foundations');
}
