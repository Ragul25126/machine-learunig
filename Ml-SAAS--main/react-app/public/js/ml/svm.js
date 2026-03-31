// ── SVM (Simplified Gradient-based) ──

export class SVM {
  constructor() {
    this.w = [Math.random() - 0.5, Math.random() - 0.5];
    this.b = 0;
    this.lossHistory = [];
    this.supportVectors = [];
  }

  predict(features) {
    const decision = this.w[0] * features[0] + this.w[1] * features[1] + this.b;
    return decision;
  }

  classify(features) {
    return this.predict(features) >= 0 ? 1 : 0;
  }

  train(data, lr = 0.001, C = 1.0, epochs = 1) {
    // Convert labels to {-1, 1}
    const converted = data.map(d => ({
      features: d.features,
      y: d.label === 0 ? -1 : 1
    }));

    for (let e = 0; e < epochs; e++) {
      let totalLoss = 0;

      for (const sample of converted) {
        const margin = sample.y * (this.w[0] * sample.features[0] + this.w[1] * sample.features[1] + this.b);

        if (margin < 1) {
          // Misclassified or within margin
          this.w[0] -= lr * (this.w[0] - C * sample.y * sample.features[0]);
          this.w[1] -= lr * (this.w[1] - C * sample.y * sample.features[1]);
          this.b -= lr * (-C * sample.y);
          totalLoss += 1 - margin;
        } else {
          // Correctly classified
          this.w[0] -= lr * this.w[0];
          this.w[1] -= lr * this.w[1];
        }
      }

      // Regularization + hinge loss
      const regLoss = 0.5 * (this.w[0] ** 2 + this.w[1] ** 2);
      totalLoss = regLoss + C * Math.max(0, totalLoss);
      this.lossHistory.push(totalLoss / data.length);
    }

    // Find support vectors (points close to boundary)
    this.supportVectors = data.filter(d => {
      const y = d.label === 0 ? -1 : 1;
      const margin = Math.abs(y * (this.w[0] * d.features[0] + this.w[1] * d.features[1] + this.b));
      return margin < 1.2;
    });

    return {
      loss: this.lossHistory[this.lossHistory.length - 1],
      supportVectorCount: this.supportVectors.length
    };
  }

  getDecisionBoundary(xRange) {
    // w0*x + w1*y + b = 0  =>  y = -(w0*x + b) / w1
    const [x1, x2] = xRange;
    if (Math.abs(this.w[1]) < 1e-10) return null;
    return {
      line: [
        { x: x1, y: -(this.w[0] * x1 + this.b) / this.w[1] },
        { x: x2, y: -(this.w[0] * x2 + this.b) / this.w[1] }
      ],
      marginUpper: [
        { x: x1, y: -(this.w[0] * x1 + this.b - 1) / this.w[1] },
        { x: x2, y: -(this.w[0] * x2 + this.b - 1) / this.w[1] }
      ],
      marginLower: [
        { x: x1, y: -(this.w[0] * x1 + this.b + 1) / this.w[1] },
        { x: x2, y: -(this.w[0] * x2 + this.b + 1) / this.w[1] }
      ]
    };
  }

  getAccuracy(data) {
    let correct = 0;
    for (const d of data) {
      if (this.classify(d.features) === d.label) correct++;
    }
    return correct / data.length;
  }

  reset() {
    this.w = [Math.random() - 0.5, Math.random() - 0.5];
    this.b = 0;
    this.lossHistory = [];
    this.supportVectors = [];
  }
}
