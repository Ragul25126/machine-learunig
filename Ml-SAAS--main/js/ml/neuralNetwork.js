// ── Simple Neural Network (for visualization) ──

export class NeuralNetwork {
  constructor(layers = [2, 4, 3, 2]) {
    this.layers = layers;
    this.weights = [];
    this.biases = [];
    this.activations = [];
    this.lossHistory = [];
    this.accuracyHistory = [];
    this._initWeights();
  }

  _initWeights() {
    this.weights = [];
    this.biases = [];
    for (let i = 0; i < this.layers.length - 1; i++) {
      const w = [];
      for (let j = 0; j < this.layers[i]; j++) {
        const row = [];
        for (let k = 0; k < this.layers[i + 1]; k++) {
          row.push((Math.random() - 0.5) * 2 * Math.sqrt(2 / this.layers[i]));
        }
        w.push(row);
      }
      this.weights.push(w);
      this.biases.push(new Array(this.layers[i + 1]).fill(0).map(() => (Math.random() - 0.5) * 0.1));
    }
  }

  _relu(x) { return Math.max(0, x); }
  _reluDeriv(x) { return x > 0 ? 1 : 0; }

  _softmax(arr) {
    const max = Math.max(...arr);
    const exps = arr.map(x => Math.exp(x - max));
    const sum = exps.reduce((s, e) => s + e, 0);
    return exps.map(e => e / sum);
  }

  forward(input) {
    this.activations = [input];
    let current = [...input];

    for (let l = 0; l < this.weights.length; l++) {
      const next = [];
      for (let j = 0; j < this.layers[l + 1]; j++) {
        let sum = this.biases[l][j];
        for (let i = 0; i < current.length; i++) {
          sum += current[i] * this.weights[l][i][j];
        }
        // ReLU for hidden, raw for output
        next.push(l < this.weights.length - 1 ? this._relu(sum) : sum);
      }
      if (l === this.weights.length - 1) {
        this.activations.push(this._softmax(next));
      } else {
        this.activations.push(next);
      }
      current = this.activations[this.activations.length - 1];
    }
    return current;
  }

  train(data, lr = 0.01) {
    let totalLoss = 0;
    let correct = 0;

    for (const sample of data) {
      const output = this.forward(sample.features);
      const target = new Array(this.layers[this.layers.length - 1]).fill(0);
      target[sample.label] = 1;

      // Cross-entropy loss
      for (let i = 0; i < output.length; i++) {
        totalLoss -= target[i] * Math.log(Math.max(output[i], 1e-10));
      }

      if (output.indexOf(Math.max(...output)) === sample.label) correct++;

      // Backpropagation
      this._backprop(target, lr);
    }

    const avgLoss = totalLoss / data.length;
    const accuracy = correct / data.length;
    this.lossHistory.push(avgLoss);
    this.accuracyHistory.push(accuracy);

    return { loss: avgLoss, accuracy };
  }

  _backprop(target, lr) {
    const numLayers = this.weights.length;
    const deltas = [];

    // Output layer delta
    const outputAct = this.activations[numLayers];
    const outputDelta = [];
    for (let i = 0; i < outputAct.length; i++) {
      outputDelta.push(outputAct[i] - target[i]);
    }
    deltas[numLayers - 1] = outputDelta;

    // Hidden layers
    for (let l = numLayers - 2; l >= 0; l--) {
      const delta = [];
      for (let i = 0; i < this.layers[l + 1]; i++) {
        let error = 0;
        for (let j = 0; j < this.layers[l + 2]; j++) {
          error += deltas[l + 1][j] * this.weights[l + 1][i][j];
        }
        delta.push(error * this._reluDeriv(this.activations[l + 1][i]));
      }
      deltas[l] = delta;
    }

    // Update weights and biases
    for (let l = 0; l < numLayers; l++) {
      for (let i = 0; i < this.layers[l]; i++) {
        for (let j = 0; j < this.layers[l + 1]; j++) {
          this.weights[l][i][j] -= lr * deltas[l][j] * this.activations[l][i];
        }
      }
      for (let j = 0; j < this.layers[l + 1]; j++) {
        this.biases[l][j] -= lr * deltas[l][j];
      }
    }
  }

  predict(features) {
    const output = this.forward(features);
    return output.indexOf(Math.max(...output));
  }

  getAccuracy(data) {
    let correct = 0;
    for (const d of data) {
      if (this.predict(d.features) === d.label) correct++;
    }
    return correct / data.length;
  }

  reset(layers) {
    if (layers) this.layers = layers;
    this._initWeights();
    this.lossHistory = [];
    this.accuracyHistory = [];
    this.activations = [];
  }

  getNetworkTopology() {
    const nodes = [];
    const connections = [];
    const layerSpacing = 160;
    const maxNodes = Math.max(...this.layers);

    for (let l = 0; l < this.layers.length; l++) {
      const nodeSpacing = 50;
      const offsetY = (maxNodes - this.layers[l]) * nodeSpacing / 2;

      for (let n = 0; n < this.layers[l]; n++) {
        const nodeId = `${l}_${n}`;
        nodes.push({
          id: nodeId,
          layer: l,
          index: n,
          x: l * layerSpacing + 80,
          y: n * nodeSpacing + offsetY + 40,
          activation: this.activations[l] ? this.activations[l][n] : 0
        });

        if (l > 0) {
          for (let pn = 0; pn < this.layers[l - 1]; pn++) {
            connections.push({
              from: `${l - 1}_${pn}`,
              to: nodeId,
              weight: this.weights[l - 1][pn][n]
            });
          }
        }
      }
    }

    return { nodes, connections };
  }
}
