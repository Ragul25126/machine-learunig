// ── SVM Page ──
import { renderNextLessonButton } from '../progress.js';

import { renderQuiz } from '../quizComponent.js';
import { QUIZ_DATA } from '../quizData.js';
import { SVM } from '../ml/svm.js';
import { DATASETS } from '../ml/datasets.js';



export function renderSVM(container) {

  let data = DATASETS.moons.data;

  let svm = new SVM();

  let animId = null, isTraining = false, epoch = 0;



  container.innerHTML = `

    <div class="page-header">

      <span class="lesson-number">Algorithm — Support Vector Machines</span>

      <h2>Support Vector Machines</h2>

      <p>Watch SVM find the optimal separating hyperplane with the widest margin between classes.</p>

    </div>

    <div class="explainer-callout">

      <div class="callout-title">💡 What is SVM?</div>

      <p>SVM finds the boundary that <strong>maximizes the margin</strong> between classes. Points closest to it are <strong>support vectors</strong>. Parameter C controls the tradeoff: high C = tight fit, low C = wider margin.</p>

    </div>

    <div class="viz-layout">

      <div class="viz-controls">

        <div class="glass-card">

          <div class="glass-card-header"><h3>⚙️ Parameters</h3></div>

          <div class="slider-group">

            <div class="slider-label"><span>Learning Rate</span><span class="slider-value" id="svm-lr-val">0.001</span></div>

            <input type="range" id="svm-lr" min="0.0001" max="0.01" step="0.0001" value="0.001">

          </div>

          <div class="slider-group">

            <div class="slider-label"><span>C (Regularization)</span><span class="slider-value" id="svm-c-val">1.0</span></div>

            <input type="range" id="svm-c" min="0.1" max="10" step="0.1" value="1.0">

          </div>

          <div class="btn-group" style="flex-wrap:wrap;">

            <button class="btn btn-primary" id="svm-train">▶ Train</button>

            <button class="btn btn-secondary" id="svm-step">⏭ Step</button>

            <button class="btn btn-secondary" id="svm-reset">↺ Reset</button>

          </div>

        </div>

        <div class="glass-card">

          <div class="glass-card-header"><h3>📊 Metrics</h3></div>

          <div class="metric-row"><span class="metric-label">Epoch</span><span class="metric-value" id="svm-epoch">0</span></div>

          <div class="metric-row"><span class="metric-label">Accuracy</span><span class="metric-value" id="svm-acc">—</span></div>

          <div class="metric-row"><span class="metric-label">Support Vectors</span><span class="metric-value" id="svm-sv">—</span></div>

        </div>

      </div>

      <div class="glass-card viz-canvas-wrapper">

        <canvas id="svm-canvas" width="700" height="500"></canvas>

      </div>

      <div class="viz-info-panel">

        <div class="glass-card">

          <div class="glass-card-header"><h3>📉 Loss Curve</h3></div>

          <canvas id="svm-loss-canvas" width="260" height="160"></canvas>

        </div>

        <div class="glass-card">

          <div class="glass-card-header"><h3>🐍 Python Equivalent</h3></div>

          <div class="code-block"><div class="code-block-header"><span>Python</span></div>

            <pre><span class="kw">from</span> sklearn.svm <span class="kw">import</span> <span class="fn">SVC</span>

model = <span class="fn">SVC</span>(C=<span class="num">1.0</span>, kernel=<span class="str">'linear'</span>)

model.<span class="fn">fit</span>(X_train, y_train)

sv = model.support_vectors_</pre>

          </div>

        </div>

      </div>

    </div>



    <div class="steps-section">
      <div class="steps-header">
        <span class="steps-badge">⚔️ The Wide Street</span>
        <h3>SVM: The Ultimate Boundary</h3>
        <p>Support Vector Machines don't just find a boundary; they find the biggest, safest "No-Man's Land" between classes.</p>
      </div>

      <div class="steps-grid">

        <div class="step-card">
          <div class="step-number">1</div>
          <div class="step-icon">🗺️</div>
          <div class="step-title">Creating the No-Man's Land</div>
          <div class="step-body">Imagine two rival groups. SVM doesn't just draw a thin line between them; it tries to build a <strong>wide street</strong> (the Margin). The goal is to keep the street as empty as possible for maximum safety.</div>
          <div class="step-formula">Goal → Maximize the Margin</div>
        </div>

        <div class="step-card">
          <div class="step-number">2</div>
          <div class="step-icon">🥋</div>
          <div class="step-title">The Street Fighters</div>
          <div class="step-body">Not every point matters! Only the points closest to the "street" are important. These are the <strong>Support Vectors</strong>. They are the tough guys holding up the boundary. If they move, the street moves.</div>
          <div class="step-formula">Highlighted in Gold on Canvas</div>
        </div>

        <div class="step-card">
          <div class="step-number">3</div>
          <div class="step-icon">📏</div>
          <div class="step-title">Widening the Gap</div>
          <div class="step-body">The algorithm uses math to push the boundary as far away from both classes as possible. This "social distancing" ensures that when new data arrives, it's less likely to be on the wrong side.</div>
          <div class="step-formula">Formula: w·x + b = 0</div>
        </div>

        <div class="step-card">
          <div class="step-number">4</div>
          <div class="step-icon">🥨</div>
          <div class="step-title">Dealing with Rule-Breakers</div>
          <div class="step-body">Sometimes data is messy and a point lands on the wrong side of the street. The <strong>C Parameter</strong> controls how much we "relax" the rules. High C = zero tolerance; Low C = okay with some mistakes to keep the street wide.</div>
          <div class="step-formula">C = Penalty for misclassification</div>
        </div>

        <div class="step-card">
          <div class="step-number">5</div>
          <div class="step-icon">🛡️</div>
          <div class="step-title">The Safety Buffer</div>
          <div class="step-body">When classifying a new point, we see which side of the street it's on. The further it is from the center of the street, the more "confident" we are in our prediction.</div>
          <div class="step-formula">Confidence ∝ Distance from Hyperplane</div>
        </div>

        <div class="step-card">
          <div class="step-number">6</div>
          <div class="step-icon">✨</div>
          <div class="step-title">Kernel Magic (Advanced)</div>
          <div class="step-body">If the groups are mixed up and no straight street can separate them, SVM uses a "Kernel Trick" to lift the data into a higher dimension (like throwing it in the air) until a clean separation becomes possible!</div>
          <div class="step-formula">Non-linear: RBF / Polynomial Kernels</div>
        </div>

      </div>

      <div class="steps-tip">

        💡 <strong>Try it:</strong> Train and observe the gold circles (support vectors). High <em>C</em> = tight margin. Low <em>C</em> = wide margin, more tolerant of errors near the boundary.

      </div>

    </div>`;



  const canvas = document.getElementById('svm-canvas');

  const lossCanvas = document.getElementById('svm-loss-canvas');

  const ctx = canvas.getContext('2d');

  const lctx = lossCanvas.getContext('2d');



  function resizeCanvas() {

    const rect = canvas.parentElement.getBoundingClientRect();

    canvas.width = rect.width - 48;

    canvas.height = Math.max(400, rect.height - 48);

    drawScene();

  }



  function getRange() {

    let xMin=Infinity,xMax=-Infinity,yMin=Infinity,yMax=-Infinity;

    for (const p of data) {

      xMin=Math.min(xMin,p.features[0]);xMax=Math.max(xMax,p.features[0]);

      yMin=Math.min(yMin,p.features[1]);yMax=Math.max(yMax,p.features[1]);

    }

    return {xMin:xMin-0.5,xMax:xMax+0.5,yMin:yMin-0.5,yMax:yMax+0.5};

  }



  function toScreen(x,y,r){

    const W=canvas.width,H=canvas.height,p=40;

    return{sx:p+(x-r.xMin)/(r.xMax-r.xMin)*(W-2*p),sy:H-p-(y-r.yMin)/(r.yMax-r.yMin)*(H-2*p)};

  }



  function drawScene() {

    const W=canvas.width,H=canvas.height;ctx.clearRect(0,0,W,H);const range=getRange();

    if(epoch>0){

      const b=svm.getDecisionBoundary([range.xMin,range.xMax]);

      if(b){

        const p1=toScreen(b.line[0].x,b.line[0].y,range),p2=toScreen(b.line[1].x,b.line[1].y,range);

        ctx.strokeStyle='#72e3ad';ctx.lineWidth=2.5;ctx.shadowColor='rgba(114,227,173,0.5)';ctx.shadowBlur=10;

        ctx.beginPath();ctx.moveTo(p1.sx,p1.sy);ctx.lineTo(p2.sx,p2.sy);ctx.stroke();ctx.shadowBlur=0;

        ctx.setLineDash([6,4]);ctx.strokeStyle='rgba(114,227,173,0.35)';ctx.lineWidth=1.5;

        let m1=toScreen(b.marginUpper[0].x,b.marginUpper[0].y,range),m2=toScreen(b.marginUpper[1].x,b.marginUpper[1].y,range);

        ctx.beginPath();ctx.moveTo(m1.sx,m1.sy);ctx.lineTo(m2.sx,m2.sy);ctx.stroke();

        m1=toScreen(b.marginLower[0].x,b.marginLower[0].y,range);m2=toScreen(b.marginLower[1].x,b.marginLower[1].y,range);

        ctx.beginPath();ctx.moveTo(m1.sx,m1.sy);ctx.lineTo(m2.sx,m2.sy);ctx.stroke();ctx.setLineDash([]);

      }

    }

    for(const sv of svm.supportVectors){const{sx,sy}=toScreen(sv.features[0],sv.features[1],range);

      ctx.strokeStyle='rgba(245,158,11,0.7)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(sx,sy,10,0,Math.PI*2);ctx.stroke();}

    for(const p of data){const{sx,sy}=toScreen(p.features[0],p.features[1],range);

      ctx.fillStyle=p.label===0?'rgba(6,182,212,0.8)':'rgba(244,63,94,0.8)';ctx.beginPath();ctx.arc(sx,sy,5,0,Math.PI*2);ctx.fill();}

  }



  function drawLoss(){

    const W=260,H=160;lctx.clearRect(0,0,W,H);if(svm.lossHistory.length<2)return;

    const max=Math.max(...svm.lossHistory)*1.1,min=Math.min(...svm.lossHistory)*0.9;

    lctx.strokeStyle='#06b6d4';lctx.lineWidth=2;lctx.beginPath();

    const step=Math.max(1,Math.floor(svm.lossHistory.length/200));let c=0;

    for(let i=0;i<svm.lossHistory.length;i+=step){

      const x=10+c/Math.ceil(svm.lossHistory.length/step)*(W-20);

      const y=H-10-(svm.lossHistory[i]-min)/(max-min+0.001)*(H-20);

      if(c===0)lctx.moveTo(x,y);else lctx.lineTo(x,y);c++;

    }lctx.stroke();

  }



  function trainStep(n=10){

    const lr=parseFloat(document.getElementById('svm-lr').value),C=parseFloat(document.getElementById('svm-c').value);

    svm.train(data,lr,C,n);epoch+=n;const acc=svm.getAccuracy(data);

    document.getElementById('svm-epoch').textContent=epoch;

    document.getElementById('svm-acc').textContent=(acc*100).toFixed(1)+'%';

    document.getElementById('svm-acc').className='metric-value '+(acc>0.9?'good':acc>0.7?'warn':'bad');

    document.getElementById('svm-sv').textContent=svm.supportVectors.length;

    drawScene();drawLoss();

  }



  function loop(){if(!isTraining)return;trainStep(5);if(epoch<3000)animId=requestAnimationFrame(loop);

    else{isTraining=false;document.getElementById('svm-train').textContent='▶ Train';}}



  document.getElementById('svm-train').addEventListener('click',()=>{

    if(isTraining){isTraining=false;if(animId)cancelAnimationFrame(animId);document.getElementById('svm-train').textContent='▶ Train';}

    else{isTraining=true;document.getElementById('svm-train').textContent = '⏸ Pause';loop();}});

  document.getElementById('svm-step').addEventListener('click',()=>{if(!isTraining)trainStep(10);});

  document.getElementById('svm-reset').addEventListener('click',()=>{

    isTraining=false;if(animId)cancelAnimationFrame(animId);epoch=0;svm.reset();

    document.getElementById('svm-train').textContent='▶ Train';document.getElementById('svm-epoch').textContent='0';

    document.getElementById('svm-acc').textContent='—';document.getElementById('svm-sv').textContent='—';drawScene();drawLoss();});

  document.getElementById('svm-lr').addEventListener('input',e=>{document.getElementById('svm-lr-val').textContent=parseFloat(e.target.value).toFixed(4);});

  document.getElementById('svm-c').addEventListener('input',e=>{document.getElementById('svm-c-val').textContent=parseFloat(e.target.value).toFixed(1);});



  setTimeout(resizeCanvas,50);window.addEventListener('resize',resizeCanvas);

  // Quiz
  renderQuiz(container, QUIZ_DATA.svm);

  return()=>{isTraining=false;if(animId)cancelAnimationFrame(animId);window.removeEventListener('resize',resizeCanvas);};

  renderNextLessonButton(container, 'svm');
}
