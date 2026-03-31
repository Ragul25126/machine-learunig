// ── Linear Regression with Gradient Descent ──

export class LinearRegression {
  constructor() {
    this.weight = Math.random() * 2 - 1;
    this.bias = Math.random() * 2 - 1;
    this.history = [];
    this.lossHistory = [];
  }

  predict(x) {
    return this.weight * x + this.bias;
  }

  computeLoss(data) {
    let sum = 0;
    for (const p of data) {
      const pred = this.predict(p.features[0]);
      sum += (pred - p.label) ** 2;
    }
    return sum / (2 * data.length);
  }

  step(data, lr) {
    let dw = 0, db = 0;
    const n = data.length;
    for (const p of data) {
      const x = p.features[0];
      const y = p.label;
      const pred = this.predict(x);
      const error = pred - y;
      dw += error * x;
      db += error;
    }
    dw /= n;
    db /= n;

    this.weight -= lr * dw;
    this.bias -= lr * db;

    const loss = this.computeLoss(data);
    this.history.push({ weight: this.weight, bias: this.bias });
    this.lossHistory.push(loss);

    return { loss, weight: this.weight, bias: this.bias, dw, db };
  }

  reset() {
    this.weight = Math.random() * 2 - 1;
    this.bias = Math.random() * 2 - 1;
    this.history = [];
    this.lossHistory = [];
  }

  getEquation() {
    const w = this.weight.toFixed(3);
    const b = this.bias.toFixed(3);
    return `y = ${w}x + ${b}`;
  }

  getR2(data) {
    const mean = data.reduce((s, p) => s + p.label, 0) / data.length;
    let ssTot = 0, ssRes = 0;
    for (const p of data) {
      ssTot += (p.label - mean) ** 2;
      ssRes += (p.label - this.predict(p.features[0])) ** 2;
    }
    return ssTot === 0 ? 1 : 1 - ssRes / ssTot;
  }
}
