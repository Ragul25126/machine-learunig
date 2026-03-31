// ── Progress Tracking Module (Production) ──────────────────────────────────────

export const LESSON_ORDER = [
  'foundations', 'data-basics', 'data-preprocessing', 'model-evaluation',
  'basic-math', 'ml-workflow', 'loss-function', 'gradient-descent', 'linear-regression',
  'logistic-regression', 'knn', 'model-metrics',
  'k-means', 'decision-tree', 'neural-network', 'svm'
];

const STORAGE_KEY = 'ml_completed_lessons';

/** Get array of completed lesson IDs */
export function getCompletedLessons() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

/** Mark a lesson as completed */
export function markCompleted(lessonId) {
  const completed = getCompletedLessons();
  if (!completed.includes(lessonId)) {
    completed.push(lessonId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  }
}

/** Reset all lesson progress */
export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

/** Get progress statistics for dashboard display */
export function getProgressStats() {
  const completed = getCompletedLessons();
  const total = LESSON_ORDER.length;
  const done = completed.filter(id => LESSON_ORDER.includes(id)).length;
  return {
    completed: done,
    total,
    percent: total > 0 ? Math.round((done / total) * 100) : 0,
    completedIds: completed,
    nextLesson: LESSON_ORDER.find(id => !completed.includes(id)) || null,
  };
}

function getNextLesson(currentLessonId) {
  const index = LESSON_ORDER.indexOf(currentLessonId);
  if (index >= 0 && index < LESSON_ORDER.length - 1) {
    return LESSON_ORDER[index + 1];
  }
  return null;
}

export function renderNextLessonButton(container, currentLessonId) {
  const nextLessonId = getNextLesson(currentLessonId);

  const progressHTML = `
    <div class="glass-card" style="margin-top: 40px; text-align: center; padding: 30px; border-top: 4px solid var(--accent-emerald);">
      <h3 style="margin-bottom: 15px; font-size: 1.4rem;">🎉 You've reached the end of this lesson!</h3>
      <p style="color: var(--text-secondary); margin-bottom: 25px;">Did you understand the concepts? Mark it as complete to track your progress on the dashboard.</p>
      <button id="btn-complete-lesson" class="btn btn-primary" style="font-size: 1.1rem; padding: 12px 30px; border-radius: 30px;" aria-label="Mark lesson complete and continue">
        ✅ Mark Complete &amp; Continue
      </button>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', progressHTML);

  const btn = document.getElementById('btn-complete-lesson');
  if (btn) {
    btn.addEventListener('click', () => {
      markCompleted(currentLessonId);
      btn.textContent = '✅ Completed!';
      btn.disabled = true;
      setTimeout(() => {
        if (nextLessonId && window.__app?.navigate) {
          window.__app.navigate(nextLessonId);
        } else if (window.__app?.navigate) {
          window.__app.navigate('dashboard');
        }
      }, 600);
    });
  }
}

