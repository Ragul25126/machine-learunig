// ── Data Playground Page ──
import { DATASETS, parseCSV } from '../ml/datasets.js';

export function renderDataPlayground(container) {
  let currentData = null;
  let currentHeaders = [];

  container.innerHTML = `
    <div class="page-header">
      <span class="lesson-number">Tools — Data Exploration</span>
      <h2>Data Playground</h2>
      <p>Upload your own CSV dataset or explore built-in samples. Visualize statistics, correlations, and prepare data for ML.</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">
      <div class="glass-card">
        <div class="glass-card-header"><h3>📂 Load Dataset</h3></div>
        <select id="dp-dataset" style="margin-bottom:12px;">
          <option value="">Select a sample dataset...</option>
          <option value="iris">Iris Flower (Classification)</option>
          <option value="linear">Linear (Regression)</option>
          <option value="moons">Two Moons (Classification)</option>
          <option value="blobs">Gaussian Blobs (Clustering)</option>
        </select>
        <div class="upload-zone" id="upload-zone">
          <div class="upload-icon">📁</div>
          <p>Drop a CSV file here or click to upload</p>
          <div class="upload-hint">Supports .csv files up to 5MB</div>
        </div>
        <input type="file" id="file-input" accept=".csv" style="display:none;">
      </div>

      <div class="glass-card">
        <div class="glass-card-header"><h3>📊 Dataset Info</h3></div>
        <div id="dataset-info">
          <p style="color:var(--text-muted);font-size:0.85rem;">No dataset loaded. Select a sample or upload CSV.</p>
        </div>
      </div>
    </div>

    <div id="data-panels" style="display:none;">
      <div class="tab-bar">
        <button class="tab-btn active" data-tab="preview">Data Preview</button>
        <button class="tab-btn" data-tab="stats">Statistics</button>
        <button class="tab-btn" data-tab="correlation">Correlation</button>
        <button class="tab-btn" data-tab="split">Train/Test Split</button>
      </div>

      <div id="tab-preview" class="glass-card" style="overflow-x:auto;max-height:400px;overflow-y:auto;"></div>
      <div id="tab-stats" class="glass-card" style="display:none;"></div>
      <div id="tab-correlation" class="glass-card" style="display:none;"><canvas id="corr-canvas" width="500" height="500"></canvas></div>
      <div id="tab-split" class="glass-card" style="display:none;">
        <div class="slider-group">
          <div class="slider-label"><span>Train / Test Split</span><span class="slider-value" id="split-val">80% / 20%</span></div>
          <input type="range" id="split-slider" min="50" max="90" step="5" value="80">
        </div>
        <div style="display:flex;gap:4px;height:30px;border-radius:6px;overflow:hidden;margin-top:12px;">
          <div id="split-train-bar" style="background:var(--accent-blue);width:80%;transition:width 0.3s;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:600;">Train</div>
          <div id="split-test-bar" style="background:var(--accent-amber);width:20%;transition:width 0.3s;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:600;">Test</div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:8px;">
          <span id="train-count" style="font-size:0.78rem;color:var(--text-muted);">—</span>
          <span id="test-count" style="font-size:0.78rem;color:var(--text-muted);">—</span>
        </div>
      </div>
    </div>`;

  // Tab switching
  container.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      ['preview','stats','correlation','split'].forEach(t => {
        const el = document.getElementById('tab-'+t);
        if(el) el.style.display = t === btn.dataset.tab ? '' : 'none';
      });
    });
  });

  function loadSampleDataset(name) {
    const ds = DATASETS[name];
    if (!ds) return;
    const headers = [...ds.features, ds.target];
    const rows = ds.data.map(d => {
      const row = {};
      ds.features.forEach((f, i) => row[f] = d.features[i]);
      row[ds.target] = d.label;
      return row;
    });
    currentHeaders = headers;
    currentData = rows;
    showData();
  }

  function showData() {
    document.getElementById('data-panels').style.display = '';
    // Info
    const numericCols = currentHeaders.filter(h => typeof currentData[0][h] === 'number');
    document.getElementById('dataset-info').innerHTML = `
      <div class="metric-row"><span class="metric-label">Rows</span><span class="metric-value">${currentData.length}</span></div>
      <div class="metric-row"><span class="metric-label">Features</span><span class="metric-value">${currentHeaders.length}</span></div>
      <div class="metric-row"><span class="metric-label">Numeric Columns</span><span class="metric-value">${numericCols.length}</span></div>`;
    showPreview();
    showStats(numericCols);
    drawCorrelation(numericCols);
    updateSplit();
  }

  function showPreview() {
    const el = document.getElementById('tab-preview');
    const rows = currentData.slice(0, 50);
    el.innerHTML = `<table class="data-table"><thead><tr>${currentHeaders.map(h=>'<th>'+h+'</th>').join('')}</tr></thead>
      <tbody>${rows.map(r=>'<tr>'+currentHeaders.map(h=>'<td>'+(typeof r[h]==='number'?r[h].toFixed(3):r[h])+'</td>').join('')+'</tr>').join('')}</tbody></table>`;
  }

  function showStats(numericCols) {
    const el = document.getElementById('tab-stats');
    const stats = numericCols.map(col => {
      const vals = currentData.map(r => r[col]).filter(v => typeof v === 'number');
      const n = vals.length;
      const mean = vals.reduce((s,v)=>s+v,0)/n;
      const sorted = [...vals].sort((a,b)=>a-b);
      const median = n%2===0 ? (sorted[n/2-1]+sorted[n/2])/2 : sorted[Math.floor(n/2)];
      const std = Math.sqrt(vals.reduce((s,v)=>s+(v-mean)**2,0)/n);
      return { col, mean, median, std, min: sorted[0], max: sorted[n-1] };
    });
    el.innerHTML = `<table class="data-table"><thead><tr><th>Feature</th><th>Mean</th><th>Median</th><th>Std</th><th>Min</th><th>Max</th></tr></thead>
      <tbody>${stats.map(s=>`<tr><td>${s.col}</td><td>${s.mean.toFixed(3)}</td><td>${s.median.toFixed(3)}</td><td>${s.std.toFixed(3)}</td><td>${s.min.toFixed(3)}</td><td>${s.max.toFixed(3)}</td></tr>`).join('')}</tbody></table>`;
  }

  function drawCorrelation(numericCols) {
    const canvas = document.getElementById('corr-canvas');
    if (!canvas) return;
    const cctx = canvas.getContext('2d');
    const n = numericCols.length;
    if (n < 2) { cctx.clearRect(0,0,500,500); return; }
    const cellSize = Math.min(60, (500 - 80) / n);
    canvas.width = n * cellSize + 80;
    canvas.height = n * cellSize + 80;
    cctx.clearRect(0, 0, canvas.width, canvas.height);

    // Compute correlation matrix
    const means = numericCols.map(col => currentData.reduce((s,r)=>s+r[col],0)/currentData.length);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let sumXY=0, sumX2=0, sumY2=0;
        for (const r of currentData) {
          const xi = r[numericCols[i]] - means[i];
          const xj = r[numericCols[j]] - means[j];
          sumXY += xi*xj; sumX2 += xi*xi; sumY2 += xj*xj;
        }
        const corr = sumXY / (Math.sqrt(sumX2*sumY2) || 1);
        const x = 60 + j * cellSize, y = 60 + i * cellSize;
        // Color
        const intensity = Math.abs(corr);
        if (corr >= 0) cctx.fillStyle = `rgba(255,255,255,${intensity*0.8})`;
        else cctx.fillStyle = `rgba(244,63,94,${intensity*0.8})`;
        cctx.fillRect(x, y, cellSize-2, cellSize-2);
        // Value
        cctx.fillStyle = intensity > 0.5 ? 'white' : 'rgba(148,163,184,0.8)';
        cctx.font = '10px JetBrains Mono';
        cctx.textAlign = 'center';
        cctx.fillText(corr.toFixed(2), x+cellSize/2-1, y+cellSize/2+4);
      }
    }
    // Labels
    cctx.fillStyle = 'rgba(148,163,184,0.8)';
    cctx.font = '10px Inter';
    cctx.textAlign = 'right';
    for (let i = 0; i < n; i++) cctx.fillText(numericCols[i].substring(0,10), 55, 60+i*cellSize+cellSize/2+4);
    cctx.textAlign = 'center';
    for (let j = 0; j < n; j++) {
      cctx.save();
      cctx.translate(60+j*cellSize+cellSize/2, 55);
      cctx.rotate(-Math.PI/4);
      cctx.fillText(numericCols[j].substring(0,10), 0, 0);
      cctx.restore();
    }
  }

  function updateSplit() {
    const val = parseInt(document.getElementById('split-slider').value);
    document.getElementById('split-val').textContent = `${val}% / ${100-val}%`;
    document.getElementById('split-train-bar').style.width = val+'%';
    document.getElementById('split-test-bar').style.width = (100-val)+'%';
    if (currentData) {
      const tc = Math.round(currentData.length * val / 100);
      document.getElementById('train-count').textContent = `${tc} samples`;
      document.getElementById('test-count').textContent = `${currentData.length - tc} samples`;
    }
  }

  document.getElementById('dp-dataset').addEventListener('change', e => { if(e.target.value) loadSampleDataset(e.target.value); });
  document.getElementById('split-slider').addEventListener('input', updateSplit);

  const uploadZone = document.getElementById('upload-zone');
  const fileInput = document.getElementById('file-input');
  uploadZone.addEventListener('click', () => fileInput.click());
  uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.style.borderColor='var(--accent-blue)'; });
  uploadZone.addEventListener('dragleave', () => { uploadZone.style.borderColor=''; });
  uploadZone.addEventListener('drop', e => { e.preventDefault(); uploadZone.style.borderColor=''; handleFile(e.dataTransfer.files[0]); });
  fileInput.addEventListener('change', e => { if(e.target.files[0]) handleFile(e.target.files[0]); });

  function handleFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = parseCSV(e.target.result);
      currentHeaders = result.headers;
      currentData = result.rows;
      showData();
    };
    reader.readAsText(file);
  }
}
