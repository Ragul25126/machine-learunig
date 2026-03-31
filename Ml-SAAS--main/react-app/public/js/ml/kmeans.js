// ── K-Means Clustering ──

export class KMeans {
  constructor(k = 3) {
    this.k = k;
    this.centroids = [];
    this.assignments = [];
    this.history = [];
    this.converged = false;
  }

  initialize(data) {
    this.centroids = [];
    this.converged = false;
    this.history = [];
    const indices = new Set();
    while (indices.size < this.k) {
      indices.add(Math.floor(Math.random() * data.length));
    }
    for (const idx of indices) {
      this.centroids.push([...data[idx].features]);
    }
    this.assignments = new Array(data.length).fill(-1);
    this.history.push(this.centroids.map(c => [...c]));
  }

  step(data) {
    // Assign
    let changed = false;
    for (let i = 0; i < data.length; i++) {
      let minDist = Infinity, minC = 0;
      for (let c = 0; c < this.k; c++) {
        const dist = this.distance(data[i].features, this.centroids[c]);
        if (dist < minDist) { minDist = dist; minC = c; }
      }
      if (this.assignments[i] !== minC) changed = true;
      this.assignments[i] = minC;
    }

    // Update centroids
    for (let c = 0; c < this.k; c++) {
      const members = data.filter((_, i) => this.assignments[i] === c);
      if (members.length > 0) {
        const dim = members[0].features.length;
        for (let d = 0; d < dim; d++) {
          this.centroids[c][d] = members.reduce((s, m) => s + m.features[d], 0) / members.length;
        }
      }
    }

    this.history.push(this.centroids.map(c => [...c]));
    this.converged = !changed;

    return {
      centroids: this.centroids.map(c => [...c]),
      assignments: [...this.assignments],
      converged: this.converged,
      inertia: this.computeInertia(data)
    };
  }

  distance(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2;
    return Math.sqrt(sum);
  }

  computeInertia(data) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += this.distance(data[i].features, this.centroids[this.assignments[i]]) ** 2;
    }
    return sum;
  }

  reset(k) {
    if (k !== undefined) this.k = k;
    this.centroids = [];
    this.assignments = [];
    this.history = [];
    this.converged = false;
  }
}
