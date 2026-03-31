// ── Decision Tree (CART-style) ──

export class DecisionTree {
  constructor(maxDepth = 5, minSamples = 2) {
    this.maxDepth = maxDepth;
    this.minSamples = minSamples;
    this.tree = null;
    this.buildSteps = [];
  }

  fit(data) {
    this.buildSteps = [];
    this.tree = this._buildNode(data, 0);
    return this.tree;
  }

  _buildNode(data, depth) {
    const labels = data.map(d => d.label);
    const uniqueLabels = [...new Set(labels)];

    // Leaf conditions
    if (uniqueLabels.length === 1 || depth >= this.maxDepth || data.length < this.minSamples) {
      const leafValue = this._majority(labels);
      const node = { type: 'leaf', value: leafValue, count: data.length, depth };
      this.buildSteps.push({ action: 'leaf', node, data: data.length });
      return node;
    }

    // Find best split
    const best = this._findBestSplit(data);
    if (!best) {
      const leafValue = this._majority(labels);
      const node = { type: 'leaf', value: leafValue, count: data.length, depth };
      this.buildSteps.push({ action: 'leaf', node, data: data.length });
      return node;
    }

    const { featureIndex, threshold, left, right, gini } = best;

    this.buildSteps.push({
      action: 'split',
      featureIndex,
      threshold: threshold.toFixed(2),
      gini: gini.toFixed(4),
      leftCount: left.length,
      rightCount: right.length,
      depth
    });

    const node = {
      type: 'split',
      featureIndex,
      threshold,
      gini,
      depth,
      count: data.length,
      left: this._buildNode(left, depth + 1),
      right: this._buildNode(right, depth + 1)
    };

    return node;
  }

  _findBestSplit(data) {
    let bestGini = Infinity, best = null;
    const numFeatures = data[0].features.length;

    for (let f = 0; f < numFeatures; f++) {
      const values = [...new Set(data.map(d => d.features[f]))].sort((a, b) => a - b);
      for (let i = 0; i < values.length - 1; i++) {
        const threshold = (values[i] + values[i + 1]) / 2;
        const left = data.filter(d => d.features[f] <= threshold);
        const right = data.filter(d => d.features[f] > threshold);
        if (left.length === 0 || right.length === 0) continue;

        const gini = (left.length * this._gini(left) + right.length * this._gini(right)) / data.length;
        if (gini < bestGini) {
          bestGini = gini;
          best = { featureIndex: f, threshold, left, right, gini };
        }
      }
    }
    return best;
  }

  _gini(data) {
    const labels = data.map(d => d.label);
    const counts = {};
    for (const l of labels) counts[l] = (counts[l] || 0) + 1;
    let sum = 0;
    for (const c of Object.values(counts)) {
      const p = c / data.length;
      sum += p * p;
    }
    return 1 - sum;
  }

  _majority(labels) {
    const counts = {};
    for (const l of labels) counts[l] = (counts[l] || 0) + 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }

  predict(features) {
    let node = this.tree;
    while (node && node.type === 'split') {
      node = features[node.featureIndex] <= node.threshold ? node.left : node.right;
    }
    return node ? parseInt(node.value) : 0;
  }

  predictBoundary(x1, x2) {
    return this.predict([x1, x2]);
  }

  getAccuracy(data) {
    let correct = 0;
    for (const d of data) {
      if (this.predict(d.features) === d.label) correct++;
    }
    return correct / data.length;
  }

  toVisualization(node = this.tree, x = 0, y = 0, level = 0) {
    if (!node) return { nodes: [], edges: [] };
    const nodes = [];
    const edges = [];
    const id = `n_${Math.random().toString(36).substr(2, 6)}`;

    nodes.push({
      id, x, y, level,
      type: node.type,
      label: node.type === 'split'
        ? `X${node.featureIndex} ≤ ${node.threshold.toFixed(2)}`
        : `Class ${node.value}`,
      gini: node.gini,
      count: node.count,
      value: node.value
    });

    if (node.type === 'split') {
      const spacing = 120 / (level + 1);
      const childY = y + 70;

      const leftResult = this.toVisualization(node.left, x - spacing, childY, level + 1);
      const rightResult = this.toVisualization(node.right, x + spacing, childY, level + 1);

      if (leftResult.nodes.length > 0) {
        edges.push({ from: id, to: leftResult.nodes[0].id, label: 'Yes' });
      }
      if (rightResult.nodes.length > 0) {
        edges.push({ from: id, to: rightResult.nodes[0].id, label: 'No' });
      }

      nodes.push(...leftResult.nodes, ...rightResult.nodes);
      edges.push(...leftResult.edges, ...rightResult.edges);
    }

    return { nodes, edges };
  }
}
