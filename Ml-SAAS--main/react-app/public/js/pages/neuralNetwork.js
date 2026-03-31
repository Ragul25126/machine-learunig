// ── Neural Network Page ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';
import { NeuralNetwork } from '../ml/neuralNetwork.js';
import { DATASETS } from '../ml/datasets.js';

export function renderNeuralNetwork(container) {
  let data = DATASETS.moons.data;
  const numClasses = 2;
  let nn = new NeuralNetwork([2, 6, 4, numClasses]);
  let animId = null;
  let isTraining = false;
  let epoch = 0;

  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Algorithm — Neural Networks</span>
      <h2>Neural Networks</h2>
      <p>Visualize how neurons activate, weights update, and the network learns to classify data through layers of computation.</p>
    </div>

    <div class="explainer-callout">
      <div class="callout-title">💡 How Neural Networks Learn</div>
      <p>A neural network passes data through layers of neurons. Each neuron applies weights, adds a bias, and uses an <strong>activation function</strong> (ReLU). The network adjusts weights via <strong>backpropagation</strong> — computing how much each weight contributed to the error and nudging it in the right direction.</p>
    </div>

    <div class="viz-layout">
      <div class="viz-controls">
        <div class="glass-card">
          <div class="glass-card-header"><h3>⚙️ Parameters</h3></div>
          <div class="slider-group">
            <div class="slider-label"><span>Learning Rate</span><span class="slider-value" id="nn-lr-val">0.03</span></div>
            <input type="range" id="nn-lr" min="0.001" max="0.1" step="0.001" value="0.03">
          </div>
          <div class="slider-group">
            <div class="slider-label"><span>Hidden Layer Size</span><span class="slider-value" id="nn-hidden-val">6</span></div>
            <input type="range" id="nn-hidden" min="2" max="12" step="1" value="6">
          </div>
          <select id="nn-dataset" style="margin-bottom:12px;">
            <option value="moons">Two Moons</option>
            <option value="xor">XOR Pattern</option>
            <option value="blobs">Gaussian Blobs</option>
          </select>
          <div class="btn-group" style="flex-wrap:wrap;">
            <button class="btn btn-primary" id="nn-train">▶ Train</button>
            <button class="btn btn-secondary" id="nn-step">⏭ Step</button>
            <button class="btn btn-secondary" id="nn-reset">↺ Reset</button>
          </div>
        </div>

        <div class="glass-card">
          <div class="glass-card-header"><h3>📊 Metrics</h3></div>
          <div class="metric-row"><span class="metric-label">Epoch</span><span class="metric-value" id="nn-epoch">0</span></div>
          <div class="metric-row"><span class="metric-label">Loss</span><span class="metric-value" id="nn-loss">—</span></div>
          <div class="metric-row"><span class="metric-label">Accuracy</span><span class="metric-value" id="nn-acc">—</span></div>
        </div>
      </div>

      <div class="glass-card viz-canvas-wrapper">
        <canvas id="nn-canvas" width="700" height="500"></canvas>
      </div>

      <div class="viz-info-panel">
        <div class="glass-card">
          <div class="glass-card-header"><h3>🧠 Network Topology</h3></div>
          <canvas id="topo-canvas" width="260" height="200"></canvas>
        </div>
        <div class="glass-card">
          <div class="glass-card-header"><h3>📈 Training Curves</h3></div>
          <canvas id="nn-loss-canvas" width="260" height="120"></canvas>
        </div>
        <div class="glass-card">
          <div class="glass-card-header"><h3>🐍 Python Equivalent</h3></div>
          <div class="code-block">
            <div class="code-block-header"><span>Python / TensorFlow</span></div>
            <pre><span class="kw">import</span> tensorflow <span class="kw">as</span> tf

model = tf.keras.<span class="fn">Sequential</span>([
  tf.keras.layers.<span class="fn">Dense</span>(<span class="num">6</span>, activation=<span class="str">'relu'</span>),
  tf.keras.layers.<span class="fn">Dense</span>(<span class="num">4</span>, activation=<span class="str">'relu'</span>),
  tf.keras.layers.<span class="fn">Dense</span>(<span class="num">2</span>, activation=<span class="str">'softmax'</span>)
])
model.<span class="fn">compile</span>(loss=<span class="str">'categorical_crossentropy'</span>)
model.<span class="fn">fit</span>(X, y, epochs=<span class="num">100</span>)</pre>
          </div>    <div class="explainer-callout" style="margin-top:20px;">
          <div class="callout-title">💡 Pro Tip</div>
          <p>Deeper networks aren't always better. A small network with a good learning rate can often learn faster and more effectively than a massive, expressive network. Switch datasets to challenge the network!</p>
        </div>
      </div>
    </div>
  `;

  const canvas = document.getElementById('nn-canvas');
  const topoCanvas = document.getElementById('topo-canvas');
  const lossCanvas = document.getElementById('nn-loss-canvas');
  const ctx = canvas.getContext('2d');
  const tctx = topoCanvas.getContext('2d');
  const lctx = lossCanvas.getContext('2d');

  const classColors = ['rgba(255,255,255,0.08)', 'rgba(244,63,94,0.08)', 'rgba(161,161,170,0.08)'];
  const pointColors = ['rgba(255,255,255,0.8)', 'rgba(244,63,94,0.8)', 'rgba(161,161,170,0.8)'];

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width - 48;
    canvas.height = Math.max(400, rect.height - 48);
    drawScene();
  }

  function getRange() {
    let xMin = Infinity, xMax = -Infinity, yMin = Infinity, yMax = -Infinity;
    for (const p of data) {
      xMin = Math.min(xMin, p.features[0]); xMax = Math.max(xMax, p.features[0]);
      yMin = Math.min(yMin, p.features[1]); yMax = Math.max(yMax, p.features[1]);
    }
    const pad = 0.5;
    return { xMin: xMin - pad, xMax: xMax + pad, yMin: yMin - pad, yMax: yMax + pad };
  }

  function drawScene() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const range = getRange();

    if (epoch > 0) {
      const res = 5;
      for (let px = 40; px < W - 40; px += res) {
        for (let py = 40; py < H - 40; py += res) {
          const x = range.xMin + (px - 40) / (W - 80) * (range.xMax - range.xMin);
          const y = range.yMax - (py - 40) / (H - 80) * (range.yMax - range.yMin);
          const cls = nn.predict([x, y]);
          ctx.fillStyle = classColors[cls % classColors.length];
          ctx.fillRect(px, py, res, res);
        }
      }
    }

    const pad = 40;
    for (const p of data) {
      const sx = pad + (p.features[0] - range.xMin) / (range.xMax - range.xMin) * (W - 2 * pad);
      const sy = H - pad - (p.features[1] - range.yMin) / (range.yMax - range.yMin) * (H - 2 * pad);
      ctx.fillStyle = pointColors[p.label % pointColors.length];
      ctx.beginPath();
      ctx.arc(sx, sy, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawTopology() {
    tctx.clearRect(0, 0, 260, 200);
    const topo = nn.getNetworkTopology();
    const scaleX = 260 / (nn.layers.length * 160 + 80);
    const scaleY = 200 / (Math.max(...nn.layers) * 50 + 40);
    const scale = Math.min(scaleX, scaleY, 1) * 0.85;

    for (const conn of topo.connections) {
      const from = topo.nodes.find(n => n.id === conn.from);
      const to = topo.nodes.find(n => n.id === conn.to);
      if (from && to) {
        const absW = Math.min(Math.abs(conn.weight), 2);
        const alpha = 0.05 + absW * 0.3;
        tctx.strokeStyle = conn.weight > 0 ? `rgba(255,255,255,${alpha})` : `rgba(244,63,94,${alpha})`;
        tctx.lineWidth = 0.5 + absW * 0.5;
        tctx.beginPath();
        tctx.moveTo(from.x * scale + 10, from.y * scale + 10);
        tctx.lineTo(to.x * scale + 10, to.y * scale + 10);
        tctx.stroke();
      }
    }

    for (const node of topo.nodes) {
      const x = node.x * scale + 10;
      const y = node.y * scale + 10;
      const act = Math.max(0, Math.min(1, node.activation || 0));
      const hue = node.layer === 0 ? 240 : node.layer === nn.layers.length - 1 ? 330 : 280;
      tctx.fillStyle = `hsla(${hue}, 70%, ${40 + act * 30}%, ${0.5 + act * 0.5})`;
      tctx.beginPath();
      tctx.arc(x, y, 5, 0, Math.PI * 2);
      tctx.fill();
    }
  }

  function drawLossCurve() {
    const W = 260, H = 120;
    lctx.clearRect(0, 0, W, H);
    if (nn.lossHistory.length < 2) return;
    const max = Math.max(...nn.lossHistory) * 1.1;
    const min = Math.min(...nn.lossHistory) * 0.9;
    const grad = lctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, '#34d399');
    grad.addColorStop(1, '#ffffff');
    lctx.strokeStyle = grad;
    lctx.lineWidth = 2;
    lctx.beginPath();
    for (let i = 0; i < nn.lossHistory.length; i++) {
      const x = 10 + i / (nn.lossHistory.length - 1) * (W - 20);
      const y = H - 10 - (nn.lossHistory[i] - min) / (max - min + 0.001) * (H - 20);
      if (i === 0) lctx.moveTo(x, y); else lctx.lineTo(x, y);
    }
    lctx.stroke();
  }

  function trainStep() {
    const lr = parseFloat(document.getElementById('nn-lr').value);
    const result = nn.train(data, lr);
    epoch++;
    document.getElementById('nn-epoch').textContent = epoch;
    document.getElementById('nn-loss').textContent = result.loss.toFixed(4);
    document.getElementById('nn-acc').textContent = (result.accuracy * 100).toFixed(1) + '%';
    const accEl = document.getElementById('nn-acc');
    accEl.className = 'metric-value ' + (result.accuracy > 0.9 ? 'good' : result.accuracy > 0.7 ? 'warn' : 'bad');

    if (epoch % 5 === 0) drawScene();
    drawTopology();
    drawLossCurve();
  }

  function trainLoop() {
    if (!isTraining) return;
    for (let i = 0; i < 3; i++) trainStep();
    animId = requestAnimationFrame(trainLoop);
  }

  document.getElementById('nn-train').addEventListener('click', () => {
    if (isTraining) {
      isTraining = false;
      if (animId) cancelAnimationFrame(animId);
      document.getElementById('nn-train').textContent = '▶ Train';
    } else {
      isTraining = true;
      document.getElementById('nn-train').textContent = '⏸ Pause';
      trainLoop();
    }
  });

  document.getElementById('nn-step').addEventListener('click', () => { if (!isTraining) trainStep(); });

  document.getElementById('nn-reset').addEventListener('click', () => {
    isTraining = false;
    if (animId) cancelAnimationFrame(animId);
    epoch = 0;
    const hidden = parseInt(document.getElementById('nn-hidden').value);
    const dsName = document.getElementById('nn-dataset').value;
    const nc = dsName === 'blobs' ? 3 : 2;
    nn = new NeuralNetwork([2, hidden, Math.max(2, Math.floor(hidden / 2)), nc]);
    document.getElementById('nn-train').textContent = '▶ Train';
    document.getElementById('nn-epoch').textContent = '0';
    document.getElementById('nn-loss').textContent = '—';
    document.getElementById('nn-acc').textContent = '—';
    drawScene();
    drawTopology();
    drawLossCurve();
  });

  document.getElementById('nn-lr').addEventListener('input', e => {
    document.getElementById('nn-lr-val').textContent = parseFloat(e.target.value).toFixed(3);
  });

  document.getElementById('nn-hidden').addEventListener('input', e => {
    document.getElementById('nn-hidden-val').textContent = e.target.value;
  });

  document.getElementById('nn-dataset').addEventListener('change', e => {
    const dsName = e.target.value;
    data = DATASETS[dsName].data;
    const nc = dsName === 'blobs' ? 3 : 2;
    const hidden = parseInt(document.getElementById('nn-hidden').value);
    nn = new NeuralNetwork([2, hidden, Math.max(2, Math.floor(hidden / 2)), nc]);
    epoch = 0;
    isTraining = false;
    if (animId) cancelAnimationFrame(animId);
    document.getElementById('nn-train').textContent = '▶ Train';
    drawScene();
    drawTopology();
  });

  setTimeout(resizeCanvas, 50);
  window.addEventListener('resize', resizeCanvas);
  drawTopology();

  // Quiz
  renderQuiz(container, QUIZ_DATA.neuralNetwork);

  return () => {
    isTraining = false;
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', resizeCanvas);
  };
  renderNextLessonButton(container, 'neural-network');
}
