// ── Reusable Mini Quiz Component ──
// Import this in any page and call renderQuiz(container, quizData) to append a quiz section.

/**
 * @param {HTMLElement} container - The page container to append the quiz to
 * @param {Object} config - Quiz configuration
 * @param {string} config.title - Quiz title (e.g., "Foundations")
 * @param {Array} config.questions - Array of question objects
 * @param {string} config.questions[].question - The question text
 * @param {string[]} config.questions[].options - Array of 4 answer options
 * @param {number} config.questions[].correct - Index of correct answer (0-3)
 * @param {string} config.questions[].explanation - Why the correct answer is right
 */
export function renderQuiz(container, config) {
  const quizId = 'quiz-' + Math.random().toString(36).slice(2, 8);
  const totalQ = config.questions.length;

  const quizHTML = `
    <div class="quiz-section" id="${quizId}">
      <div class="quiz-header">
        <div class="quiz-header-left">
          <span class="quiz-icon">🧠</span>
          <div>
            <h3 class="quiz-title">Quick Quiz: ${config.title}</h3>
            <p class="quiz-subtitle">Test your understanding — ${totalQ} questions with instant feedback</p>
          </div>
        </div>
        <div class="quiz-score-badge" id="${quizId}-score">
          <span id="${quizId}-correct">0</span> / ${totalQ}
        </div>
      </div>

      <div class="quiz-questions">
        ${config.questions.map((q, qi) => `
          <div class="quiz-question" id="${quizId}-q${qi}">
            <div class="quiz-q-header">
              <span class="quiz-q-number">Q${qi + 1}</span>
              <span class="quiz-q-text">${q.question}</span>
            </div>
            <div class="quiz-options">
              ${q.options.map((opt, oi) => `
                <button class="quiz-option" data-quiz="${quizId}" data-q="${qi}" data-o="${oi}"
                        id="${quizId}-q${qi}-o${oi}">
                  <span class="quiz-option-letter">${String.fromCharCode(65 + oi)}</span>
                  <span class="quiz-option-text">${opt}</span>
                  <span class="quiz-option-icon" id="${quizId}-q${qi}-o${oi}-icon"></span>
                </button>
              `).join('')}
            </div>
            <div class="quiz-feedback" id="${quizId}-q${qi}-feedback"></div>
          </div>
        `).join('')}
      </div>

      <div class="quiz-footer" id="${quizId}-footer">
        <div class="quiz-progress">
          <div class="quiz-progress-bar" id="${quizId}-progress" style="width:0%"></div>
        </div>
        <div class="quiz-footer-text">
          <span id="${quizId}-answered">0</span> of ${totalQ} answered
        </div>
      </div>

      <div class="quiz-result" id="${quizId}-result" style="display:none;">
        <div class="quiz-result-emoji" id="${quizId}-result-emoji">🎉</div>
        <div class="quiz-result-title" id="${quizId}-result-title">Great job!</div>
        <div class="quiz-result-text" id="${quizId}-result-text"></div>
        <button class="btn btn-primary btn-pill quiz-retry-btn" id="${quizId}-retry">🔄 Try Again</button>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', quizHTML);

  // Quiz state
  const answered = new Set();
  let correctCount = 0;

  // Event delegation for option clicks
  const quizEl = document.getElementById(quizId);
  quizEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.quiz-option');
    if (!btn) return;

    const qi = parseInt(btn.dataset.q);
    const oi = parseInt(btn.dataset.o);

    if (answered.has(qi)) return; // Already answered
    answered.add(qi);

    const q = config.questions[qi];
    const isCorrect = oi === q.correct;

    // Disable all options for this question
    const questionEl = document.getElementById(`${quizId}-q${qi}`);
    questionEl.querySelectorAll('.quiz-option').forEach((optBtn, idx) => {
      optBtn.classList.add('disabled');
      if (idx === q.correct) {
        optBtn.classList.add('correct');
        document.getElementById(`${quizId}-q${qi}-o${idx}-icon`).textContent = '✅';
      }
      if (idx === oi && !isCorrect) {
        optBtn.classList.add('wrong');
        document.getElementById(`${quizId}-q${qi}-o${idx}-icon`).textContent = '❌';
      }
    });

    // Show feedback
    const feedbackEl = document.getElementById(`${quizId}-q${qi}-feedback`);
    feedbackEl.style.display = 'block';
    if (isCorrect) {
      correctCount++;
      feedbackEl.className = 'quiz-feedback correct';
      feedbackEl.innerHTML = `<span>✅ Correct!</span> ${q.explanation}`;
    } else {
      feedbackEl.className = 'quiz-feedback wrong';
      feedbackEl.innerHTML = `<span>❌ Not quite.</span> ${q.explanation}`;
    }

    // Update score
    document.getElementById(`${quizId}-correct`).textContent = correctCount;
    document.getElementById(`${quizId}-answered`).textContent = answered.size;
    document.getElementById(`${quizId}-progress`).style.width = `${(answered.size / totalQ) * 100}%`;

    // Check completion
    if (answered.size === totalQ) {
      setTimeout(() => showResult(), 500);
    }
  });

  function showResult() {
    const resultEl = document.getElementById(`${quizId}-result`);
    resultEl.style.display = 'block';
    const pct = Math.round((correctCount / totalQ) * 100);
    let emoji, title, text;
    if (pct === 100) {
      emoji = '🏆'; title = 'Perfect Score!'; text = `You got all ${totalQ} questions right. You\'re a pro!`;
    } else if (pct >= 70) {
      emoji = '🎉'; title = 'Great Job!'; text = `You got ${correctCount}/${totalQ} correct (${pct}%). Solid understanding!`;
    } else if (pct >= 40) {
      emoji = '💪'; title = 'Good Effort!'; text = `You got ${correctCount}/${totalQ} correct (${pct}%). Review the lesson and try again!`;
    } else {
      emoji = '📖'; title = 'Keep Learning!'; text = `You got ${correctCount}/${totalQ} correct (${pct}%). Re-read the lesson above and retry.`;
    }
    document.getElementById(`${quizId}-result-emoji`).textContent = emoji;
    document.getElementById(`${quizId}-result-title`).textContent = title;
    document.getElementById(`${quizId}-result-text`).textContent = text;
  }

  // Retry button
  document.getElementById(`${quizId}-retry`).addEventListener('click', () => {
    answered.clear();
    correctCount = 0;
    document.getElementById(`${quizId}-correct`).textContent = '0';
    document.getElementById(`${quizId}-answered`).textContent = '0';
    document.getElementById(`${quizId}-progress`).style.width = '0%';
    document.getElementById(`${quizId}-result`).style.display = 'none';

    config.questions.forEach((q, qi) => {
      const questionEl = document.getElementById(`${quizId}-q${qi}`);
      questionEl.querySelectorAll('.quiz-option').forEach((optBtn, idx) => {
        optBtn.classList.remove('disabled', 'correct', 'wrong');
        document.getElementById(`${quizId}-q${qi}-o${idx}-icon`).textContent = '';
      });
      const feedbackEl = document.getElementById(`${quizId}-q${qi}-feedback`);
      feedbackEl.style.display = 'none';
      feedbackEl.className = 'quiz-feedback';
    });
  });
}
