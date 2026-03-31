// ── Pricing Page ──
export function renderPricing(container) {
  container.innerHTML = `
    <div class="page-header" style="text-align:center;max-width:none;">
      <span class="lesson-number">Choose Your Plan</span>
      <h2 style="font-size:2rem;">Simple, Transparent Pricing</h2>
      <p style="margin:0 auto;">Start free, upgrade when you need more power. All plans include our interactive visual learning engine.</p>
    </div>
    <div class="pricing-grid">
      <div class="glass-card pricing-card">
        <h3 style="color:var(--text-muted);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;">Free</h3>
        <div class="price">$0<span>/month</span></div>
        <p style="color:var(--text-muted);font-size:0.82rem;">Perfect for getting started</p>
        <ul class="pricing-features">
          <li>3 Algorithm Visualizations</li>
          <li>Sample Datasets Only</li>
          <li>Basic Metrics Dashboard</li>
          <li>Python Code Snippets</li>
          <li class="disabled">CSV Upload</li>
          <li class="disabled">Export Results</li>
          <li class="disabled">All 5+ Algorithms</li>
        </ul>
        <button class="btn btn-secondary" style="width:100%;" onclick="window.__app.navigate('login')">Get Started Free</button>
      </div>
      <div class="glass-card pricing-card featured">
        <h3 style="color:var(--accent-blue-light);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;">Pro</h3>
        <div class="price">$19<span>/month</span></div>
        <p style="color:var(--text-muted);font-size:0.82rem;">For serious learners</p>
        <ul class="pricing-features">
          <li>All Algorithm Visualizations</li>
          <li>CSV Data Upload</li>
          <li>Advanced Metrics & Charts</li>
          <li>Export Results & Images</li>
          <li>Priority Support</li>
          <li>Interactive Explainers</li>
          <li class="disabled">Team Management</li>
        </ul>
        <button class="btn btn-primary" style="width:100%;" onclick="window.__app.navigate('login')">Start Pro Trial</button>
      </div>
      <div class="glass-card pricing-card">
        <h3 style="color:var(--text-muted);font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;">Enterprise</h3>
        <div class="price">$49<span>/month</span></div>
        <p style="color:var(--text-muted);font-size:0.82rem;">For teams & institutions</p>
        <ul class="pricing-features">
          <li>Everything in Pro</li>
          <li>Team Dashboard</li>
          <li>Custom Datasets</li>
          <li>API Access</li>
          <li>SSO Authentication</li>
          <li>Dedicated Support</li>
          <li>White-label Option</li>
        </ul>
        <button class="btn btn-secondary" style="width:100%;">Contact Sales</button>
      </div>
    </div>`;
}
