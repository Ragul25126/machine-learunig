// ── Sample Datasets ──
export const DATASETS = {
  iris: {
    name: 'Iris Flower Dataset',
    description: 'Classic dataset: classify iris species by petal/sepal measurements',
    features: ['Sepal Length', 'Sepal Width', 'Petal Length', 'Petal Width'],
    target: 'Species',
    type: 'classification',
    classes: ['Setosa', 'Versicolor', 'Virginica'],
    data: generateIris()
  },
  moons: {
    name: 'Two Moons',
    description: 'Two interleaving half circles — great for non-linear classification',
    features: ['X1', 'X2'],
    target: 'Class',
    type: 'classification',
    classes: ['Moon A', 'Moon B'],
    data: generateMoons(200, 0.15)
  },
  blobs: {
    name: 'Gaussian Blobs',
    description: 'Clusters of points sampled from Gaussian distributions',
    features: ['X1', 'X2'],
    target: 'Cluster',
    type: 'clustering',
    classes: ['Cluster 1', 'Cluster 2', 'Cluster 3'],
    data: generateBlobs(200, 3)
  },
  linear: {
    name: 'Linear Relationship',
    description: 'Noisy linear data — perfect for regression',
    features: ['X'],
    target: 'Y',
    type: 'regression',
    data: generateLinear(80, 2.5, 10, 8)
  },
  quadratic: {
    name: 'Quadratic Curve',
    description: 'Non-linear relationship — see where linear regression fails',
    features: ['X'],
    target: 'Y',
    type: 'regression',
    data: generateQuadratic(80)
  },
  xor: {
    name: 'XOR Pattern',
    description: 'Non-linearly separable — a challenge for linear classifiers',
    features: ['X1', 'X2'],
    target: 'Class',
    type: 'classification',
    classes: ['Class 0', 'Class 1'],
    data: generateXOR(200)
  }
};

function generateIris() {
  const data = [];
  // Setosa
  for (let i = 0; i < 50; i++) {
    data.push({
      features: [4.5 + Math.random() * 1.5, 2.5 + Math.random() * 1.5, 1 + Math.random() * 0.9, 0.1 + Math.random() * 0.5],
      label: 0
    });
  }
  // Versicolor
  for (let i = 0; i < 50; i++) {
    data.push({
      features: [5.5 + Math.random() * 1.5, 2 + Math.random() * 1, 3.5 + Math.random() * 1.5, 1 + Math.random() * 0.7],
      label: 1
    });
  }
  // Virginica
  for (let i = 0; i < 50; i++) {
    data.push({
      features: [6 + Math.random() * 2, 2.5 + Math.random() * 1.2, 4.8 + Math.random() * 2, 1.5 + Math.random() * 1],
      label: 2
    });
  }
  return data;
}

function generateMoons(n, noise) {
  const data = [];
  const half = Math.floor(n / 2);
  for (let i = 0; i < half; i++) {
    const angle = Math.PI * i / half;
    data.push({
      features: [Math.cos(angle) + (Math.random() - 0.5) * noise * 2, Math.sin(angle) + (Math.random() - 0.5) * noise * 2],
      label: 0
    });
  }
  for (let i = 0; i < half; i++) {
    const angle = Math.PI * i / half;
    data.push({
      features: [1 - Math.cos(angle) + (Math.random() - 0.5) * noise * 2, 0.5 - Math.sin(angle) + (Math.random() - 0.5) * noise * 2],
      label: 1
    });
  }
  return data;
}

function generateBlobs(n, k) {
  const data = [];
  const centers = [[-2, -2], [2, 2], [-2, 2]];
  const perCluster = Math.floor(n / k);
  for (let c = 0; c < k; c++) {
    for (let i = 0; i < perCluster; i++) {
      data.push({
        features: [centers[c][0] + randn() * 0.7, centers[c][1] + randn() * 0.7],
        label: c
      });
    }
  }
  return data;
}

function generateLinear(n, slope, intercept, noise) {
  const data = [];
  for (let i = 0; i < n; i++) {
    const x = Math.random() * 20 - 5;
    const y = slope * x + intercept + randn() * noise;
    data.push({ features: [x], label: y });
  }
  return data;
}

function generateQuadratic(n) {
  const data = [];
  for (let i = 0; i < n; i++) {
    const x = Math.random() * 10 - 5;
    const y = 0.5 * x * x - 2 * x + 3 + randn() * 2;
    data.push({ features: [x], label: y });
  }
  return data;
}

function generateXOR(n) {
  const data = [];
  const qn = Math.floor(n / 4);
  for (let i = 0; i < qn; i++) {
    data.push({ features: [Math.random() * 2, Math.random() * 2], label: 0 });
    data.push({ features: [2 + Math.random() * 2, 2 + Math.random() * 2], label: 0 });
    data.push({ features: [Math.random() * 2, 2 + Math.random() * 2], label: 1 });
    data.push({ features: [2 + Math.random() * 2, Math.random() * 2], label: 1 });
  }
  return data;
}

function randn() {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export function parseCSV(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    if (values.length === headers.length) {
      const row = {};
      headers.forEach((h, j) => {
        const num = parseFloat(values[j]);
        row[h] = isNaN(num) ? values[j] : num;
      });
      rows.push(row);
    }
  }
  return { headers, rows };
}
