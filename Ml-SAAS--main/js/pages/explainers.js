// ── Explainers Page ──

export function renderExplainers(container) {

  container.innerHTML = `

    <div class="page-header">

      <span class="lesson-number">Learn — Conceptual Understanding</span>

      <h2>Why Did This Happen?</h2>

      <p>Interactive visual explainers for the most confusing ML concepts.</p>

    </div>



    <div class="tab-bar">

      <button class="tab-btn active" data-tab="overfit">Overfitting</button>

      <button class="tab-btn" data-tab="lr-explore">Learning Rate</button>

      <button class="tab-btn" data-tab="bias-var">Bias-Variance</button>

    </div>



    <div id="tab-overfit">

      <div class="glass-card" style="margin-bottom:20px;">

        <div class="glass-card-header"><h3>📈 Overfitting vs Underfitting</h3></div>

        <p style="color:var(--text-secondary);font-size:0.88rem;line-height:1.7;margin-bottom:16px;">

          <strong>Underfitting</strong>: Model is too simple to capture the pattern. <strong>Overfitting</strong>: Model memorizes noise instead of learning the pattern. Use the slider to see the effect of model complexity.

        </p>

        <div class="slider-group">

          <div class="slider-label"><span>Model Complexity (Polynomial Degree)</span><span class="slider-value" id="poly-val">1</span></div>

          <input type="range" id="poly-slider" min="1" max="15" step="1" value="1">

        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:16px;">

          <div>

            <canvas id="fit-canvas" width="400" height="280"></canvas>

            <div id="fit-label" style="text-align:center;margin-top:8px;font-size:0.82rem;color:var(--accent-amber);font-weight:600;">⚠️ Underfitting — Too simple!</div>

          </div>

          <div>

            <canvas id="loss-compare-canvas" width="400" height="280"></canvas>

            <div style="text-align:center;margin-top:8px;font-size:0.78rem;color:var(--text-muted);">Train Loss vs Validation Loss</div>

          </div>

        </div>

      </div>

    </div>



    <div id="tab-lr-explore" style="display:none;">

      <div class="glass-card">

        <div class="glass-card-header"><h3>⚡ Learning Rate Explorer</h3></div>

        <p style="color:var(--text-secondary);font-size:0.88rem;line-height:1.7;margin-bottom:16px;">

          The learning rate controls how big each optimization step is. Too high → diverges. Too low → takes forever. Just right → converges smoothly.

        </p>

        <div class="slider-group">

          <div class="slider-label"><span>Learning Rate</span><span class="slider-value" id="exlr-val">0.01</span></div>

          <input type="range" id="exlr-slider" min="-3" max="0" step="0.1" value="-2">

        </div>

        <canvas id="lr-explore-canvas" width="700" height="300" style="width:100%;"></canvas>

        <div id="lr-status" style="text-align:center;margin-top:8px;font-size:0.85rem;font-weight:600;color:var(--accent-emerald);">✅ Good learning rate — converges nicely</div>

      </div>

    </div>



    <div id="tab-bias-var" style="display:none;">

      <div class="glass-card">

        <div class="glass-card-header"><h3>⚖️ Bias-Variance Tradeoff</h3></div>

        <p style="color:var(--text-secondary);font-size:0.88rem;line-height:1.7;margin-bottom:16px;">

          <strong>High bias</strong> = model too simple, consistently wrong. <strong>High variance</strong> = model too complex, changes wildly with data. The sweet spot minimizes total error.

        </p>

        <canvas id="bv-canvas" width="700" height="300" style="width:100%;"></canvas>

        <div class="slider-group" style="margin-top:16px;">

          <div class="slider-label"><span>Model Complexity</span><span class="slider-value" id="bv-val">5</span></div>

          <input type="range" id="bv-slider" min="1" max="10" step="1" value="5">

        </div>

        <div id="bv-explanation" style="margin-top:16px;text-align:center;font-size:0.9rem;font-weight:600;color:var(--text-primary)">
          ⚖️ <strong>Balanced</strong> — The model has a good tradeoff between bias and variance.
        </div>

      </div>

    </div>`;



  // Tab switching

  container.querySelectorAll('.tab-btn').forEach(btn => {

    btn.addEventListener('click', () => {

      container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

      btn.classList.add('active');

      ['overfit','lr-explore','bias-var'].forEach(t => {

        const el = document.getElementById('tab-'+t);

        if(el) el.style.display = t === btn.dataset.tab ? '' : 'none';

      });

      if (btn.dataset.tab === 'lr-explore') drawLRExplorer();

      if (btn.dataset.tab === 'bias-var') drawBiasVariance();

    });

  });



  // Generate data for overfitting demo

  const demoData = [];

  for (let i = 0; i < 30; i++) {

    const x = (i / 29) * 6 - 3;

    const y = Math.sin(x) * 2 + (Math.random() - 0.5) * 1.5;

    demoData.push({ x, y });

  }



  function polyFit(data, degree) {

    // Simple polynomial via normal equation (for small degrees)

    const n = data.length;

    const X = data.map(d => { const row = []; for(let i=0;i<=degree;i++) row.push(d.x**i); return row; });

    // X^T X

    const XtX = [];

    for(let i=0;i<=degree;i++){const row=[];for(let j=0;j<=degree;j++){let s=0;for(let k=0;k<n;k++)s+=X[k][i]*X[k][j];row.push(s);}XtX.push(row);}

    // X^T y

    const Xty = [];

    for(let i=0;i<=degree;i++){let s=0;for(let k=0;k<n;k++)s+=X[k][i]*data[k].y;Xty.push(s);}

    // Solve (Gaussian elimination)

    const m=degree+1;const A=XtX.map((r,i)=>[...r,Xty[i]]);

    for(let i=0;i<m;i++){let max=i;for(let j=i+1;j<m;j++)if(Math.abs(A[j][i])>Math.abs(A[max][i]))max=j;

      [A[i],A[max]]=[A[max],A[i]];if(Math.abs(A[i][i])<1e-12)continue;

      for(let j=i+1;j<m;j++){const f=A[j][i]/A[i][i];for(let k=i;k<=m;k++)A[j][k]-=f*A[i][k];}}

    const coeffs=new Array(m).fill(0);

    for(let i=m-1;i>=0;i--){coeffs[i]=A[i][m];for(let j=i+1;j<m;j++)coeffs[i]-=A[i][j]*coeffs[j];coeffs[i]/=(A[i][i]||1);}

    return coeffs;

  }



  function evalPoly(coeffs, x){let y=0;for(let i=0;i<coeffs.length;i++)y+=coeffs[i]*(x**i);return y;}



  function drawOverfitting() {

    const degree = parseInt(document.getElementById('poly-slider').value);

    const canvas = document.getElementById('fit-canvas');

    const ctx = canvas.getContext('2d');

    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0,0,W,H);

    // Fit

    const coeffs = polyFit(demoData, Math.min(degree, demoData.length-1));

    // Draw curve

    ctx.strokeStyle = '#72e3ad'; ctx.lineWidth = 2;

    ctx.beginPath();

    for(let px=20;px<W-20;px++){

      const x = -3 + (px-20)/(W-40)*6;

      const y = evalPoly(coeffs, x);

      const sy = H/2 - y * 30;

      if(px===20)ctx.moveTo(px,Math.max(5,Math.min(H-5,sy)));else ctx.lineTo(px,Math.max(5,Math.min(H-5,sy)));

    }

    ctx.stroke();

    // Points

    for(const d of demoData) {

      const px = 20 + (d.x+3)/6*(W-40);

      const py = H/2 - d.y*30;

      ctx.fillStyle='rgba(255,255,255,0.6)';ctx.beginPath();ctx.arc(px,py,4,0,Math.PI*2);ctx.fill();

    }

    // Label

    const label = document.getElementById('fit-label');

    if(degree<=2){label.textContent='⚠️ Underfitting — Too simple!';label.style.color='var(--accent-amber)';}

    else if(degree<=6){label.textContent='✅ Good fit — Captures the pattern';label.style.color='var(--accent-emerald)';}

    else{label.textContent='🔴 Overfitting — Memorizing noise!';label.style.color='var(--accent-rose)';}

    document.getElementById('poly-val').textContent = degree;



    // Loss comparison

    const lctx = document.getElementById('loss-compare-canvas').getContext('2d');

    const LW = 400, LH = 280;

    lctx.clearRect(0,0,LW,LH);

    // Simulate train/val loss curves

    lctx.strokeStyle = 'rgba(255,255,255,0.05)'; lctx.lineWidth = 1;

    for(let i=0;i<=4;i++){const y=20+i*(LH-40)/4;lctx.beginPath();lctx.moveTo(30,y);lctx.lineTo(LW-10,y);lctx.stroke();}

    // Train loss (decreases with complexity)

    lctx.strokeStyle='#ffffff';lctx.lineWidth=2;lctx.beginPath();

    for(let d=1;d<=15;d++){

      const x=30+(d-1)/14*(LW-40);

      const tl = Math.max(0.05, 1/d + 0.05);

      const y=30+tl*(LH-60);

      if(d===1)lctx.moveTo(x,y);else lctx.lineTo(x,y);

    }lctx.stroke();

    // Val loss (U-shape)

    lctx.strokeStyle='#f43f5e';lctx.lineWidth=2;lctx.beginPath();

    for(let d=1;d<=15;d++){

      const x=30+(d-1)/14*(LW-40);

      const vl = 0.8/(d)+0.1+Math.max(0,(d-5)*0.08);

      const y=30+vl*(LH-60);

      if(d===1)lctx.moveTo(x,y);else lctx.lineTo(x,y);

    }lctx.stroke();

    // Current position line

    lctx.strokeStyle='rgba(245,158,11,0.5)';lctx.setLineDash([4,4]);lctx.lineWidth=1;

    const cx=30+(degree-1)/14*(LW-40);

    lctx.beginPath();lctx.moveTo(cx,20);lctx.lineTo(cx,LH-20);lctx.stroke();lctx.setLineDash([]);

    // Legend

    lctx.fillStyle='#ffffff';lctx.fillRect(LW-100,LH-30,12,3);lctx.fillStyle='#71717a';lctx.font='10px Inter';lctx.fillText('Train',LW-85,LH-26);

    lctx.fillStyle='#f43f5e';lctx.fillRect(LW-100,LH-20,12,3);lctx.fillText('Validation',LW-85,LH-16);

  }



  function drawLRExplorer(){

    const canvas = document.getElementById('lr-explore-canvas');

    const ctx = canvas.getContext('2d');

    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0,0,W,H);

    const logLR = parseFloat(document.getElementById('exlr-slider').value);

    const lr = Math.pow(10, logLR);

    document.getElementById('exlr-val').textContent = lr.toFixed(4);

    // Simulate loss curves

    const losses = []; let loss = 5;

    for(let i=0;i<100;i++){

      if(lr>0.3) loss += (Math.random()-0.3)*lr*5; // diverge

      else if(lr>0.05) loss *= (1-lr*0.8) + (Math.random()-0.5)*0.1; // oscillate then converge

      else loss *= (1-lr*2); // smooth convergence

      losses.push(Math.max(0.01, loss));

    }

    const max = Math.max(...losses)*1.2;

    ctx.strokeStyle='#72e3ad';ctx.lineWidth=2;ctx.beginPath();

    for(let i=0;i<losses.length;i++){

      const x=30+i/(losses.length-1)*(W-60);

      const y=H-20-Math.min(losses[i]/max,1)*(H-40);

      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);

    }ctx.stroke();

    const status = document.getElementById('lr-status');

    if(lr>0.3){status.textContent='🔴 Diverging! Learning rate too high';status.style.color='var(--accent-rose)';}

    else if(lr>0.05){status.textContent='⚠️ Oscillating — might converge eventually';status.style.color='var(--accent-amber)';}

    else if(lr>0.005){status.textContent='✅ Good — converges nicely';status.style.color='var(--accent-emerald)';}
    else{status.textContent='🐌 Very slow convergence — might need more epochs';status.style.color='var(--accent-cyan)';}
  }

  function drawBiasVariance(){

    const canvas = document.getElementById('bv-canvas');

    const ctx = canvas.getContext('2d');

    const W = canvas.width, H = canvas.height;

    ctx.clearRect(0,0,W,H);

    const complexity = parseInt(document.getElementById('bv-slider').value);

    document.getElementById('bv-val').textContent = complexity;

    // Draw bias curve (decreasing)

    ctx.strokeStyle='#ffffff';ctx.lineWidth=2;ctx.beginPath();

    for(let x=1;x<=10;x++){const px=40+(x-1)/9*(W-80);const py=H-30-(1/x)*(H-60);if(x===1)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.stroke();

    // Variance curve (increasing)

    ctx.strokeStyle='#f43f5e';ctx.lineWidth=2;ctx.beginPath();

    for(let x=1;x<=10;x++){const px=40+(x-1)/9*(W-80);const py=H-30-(x*x/100)*(H-60)*0.8;if(x===1)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.stroke();

    // Total error (U-shape)

    ctx.strokeStyle='#a1a1aa';ctx.lineWidth=2;ctx.setLineDash([4,4]);ctx.beginPath();

    for(let x=1;x<=10;x++){const px=40+(x-1)/9*(W-80);const total=(1/x)+(x*x/100)*0.8;const py=H-30-total*(H-60);if(x===1)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.stroke();ctx.setLineDash([]);

    // Current line

    const cx=40+(complexity-1)/9*(W-80);

    ctx.strokeStyle='rgba(245,158,11,0.6)';ctx.setLineDash([4,4]);ctx.lineWidth=1;

    ctx.beginPath();ctx.moveTo(cx,20);ctx.lineTo(cx,H-20);ctx.stroke();ctx.setLineDash([]);

    // Legend

    ctx.font='11px Inter';ctx.fillStyle='#ffffff';ctx.fillRect(W-130,20,14,3);ctx.fillStyle='rgba(148,163,184,0.8)';ctx.fillText('Bias²',W-112,24);

    ctx.fillStyle='#f43f5e';ctx.fillRect(W-130,32,14,3);ctx.fillStyle='rgba(148,163,184,0.8)';ctx.fillText('Variance',W-112,36);

    ctx.fillStyle='#a1a1aa';ctx.fillRect(W-130,44,14,3);ctx.fillStyle='rgba(148,163,184,0.8)';ctx.fillText('Total Error',W-112,48);

    // Explanation

    const el = document.getElementById('bv-explanation');

    if(complexity<=3) el.innerHTML='📏 <strong>High Bias</strong> — Model is too simple. It underfits the data, missing important patterns.';

    if(complexity<=3) el.innerHTML='📏 <strong>High Bias</strong> — Model is too simple. It underfits the data, missing important patterns.';

    else if(complexity<=7) el.innerHTML='⚖️ <strong>Balanced</strong> — Good tradeoff! Model captures patterns without memorizing noise.';

  }



  document.getElementById('poly-slider').addEventListener('input', drawOverfitting);

  document.getElementById('exlr-slider').addEventListener('input', drawLRExplorer);

  document.getElementById('bv-slider').addEventListener('input', drawBiasVariance);



  drawOverfitting();

}

