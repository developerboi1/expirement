// Simple MindMate Script - Immediate Working Version

// Enhanced Quiz Data with 12 Sophisticated Questions
const QUIZ_QUESTIONS = [
    {
        key: 'interests',
        type: 'multiple_choice',
        question: 'Which areas genuinely fascinate you? (Select all that apply)',
        multiSelect: true,
        options: [
            { value: 'technology', label: '💻 Technology & Innovation', weight: { tech: 3, business: 1 } },
            { value: 'science', label: '🔬 Science & Research', weight: { tech: 2, healthcare: 3, research: 3 } },
            { value: 'arts', label: '🎨 Arts & Creative Expression', weight: { creative: 3, education: 1 } },
            { value: 'business', label: '📈 Business & Entrepreneurship', weight: { business: 3, management: 2 } },
            { value: 'health', label: '🏥 Health & Wellness', weight: { healthcare: 3, social: 2 } },
            { value: 'social', label: '🤝 Social Impact & Community', weight: { social: 3, education: 2, nonprofit: 3 } }
        ]
    },
    {
        key: 'workStyle',
        type: 'slider',
        question: 'How do you prefer to work?',
        options: [
            { label: 'Independently', opposite: 'In Teams', weight: { independent: 1, collaborative: -1 } },
            { label: 'Structured Environment', opposite: 'Flexible Environment', weight: { structured: 1, flexible: -1 } },
            { label: 'Analytical Tasks', opposite: 'Creative Tasks', weight: { analytical: 1, creative: -1 } }
        ]
    },
    {
        key: 'problemSolving',
        type: 'scenario',
        question: 'You encounter a complex problem. What\'s your first instinct?',
        options: [
            { value: 'research', label: 'Research thoroughly before acting', weight: { research: 2, analytical: 2 } },
            { value: 'experiment', label: 'Start experimenting with solutions', weight: { tech: 2, creative: 2 } },
            { value: 'collaborate', label: 'Discuss with others for insights', weight: { social: 2, management: 1 } },
            { value: 'systematize', label: 'Break it down systematically', weight: { analytical: 3, tech: 1 } }
        ]
    },
    {
        key: 'motivation',
        type: 'ranking',
        question: 'Rank these motivations from most to least important (drag to reorder):',
        options: [
            { value: 'impact', label: '🌍 Making a positive impact', weight: { social: 3, nonprofit: 2, healthcare: 1 } },
            { value: 'money', label: '💰 Financial success', weight: { business: 2, tech: 1, finance: 3 } },
            { value: 'creativity', label: '🎨 Creative expression', weight: { creative: 3, marketing: 1 } },
            { value: 'stability', label: '⚖️ Job security & stability', weight: { government: 2, healthcare: 1 } },
            { value: 'challenge', label: '🧗 Intellectual challenges', weight: { tech: 2, research: 3, consulting: 2 } }
        ]
    },
    {
        key: 'skills',
        type: 'confidence',
        question: 'Rate your confidence in these skill areas (1-5 scale):',
        options: [
            { value: 'technical', label: 'Technical/Programming Skills', weight: { tech: 1 } },
            { value: 'communication', label: 'Communication & Presentation', weight: { social: 1, management: 1, education: 1 } },
            { value: 'analytical', label: 'Data Analysis & Logic', weight: { analytical: 1, research: 1, finance: 1 } },
            { value: 'creative', label: 'Design & Creative Thinking', weight: { creative: 1, marketing: 1 } },
            { value: 'leadership', label: 'Leadership & Management', weight: { management: 1, business: 1 } }
        ]
    },
    {
        key: 'environment',
        type: 'multiple_choice',
        question: 'What work environments energize you?',
        options: [
            { value: 'office', label: '🏢 Traditional office setting', weight: { corporate: 2, finance: 1 } },
            { value: 'remote', label: '🏠 Remote/work from home', weight: { tech: 2, freelance: 3 } },
            { value: 'field', label: '🌍 Field work/on-location', weight: { research: 2, consulting: 2 } },
            { value: 'studio', label: '🎭 Creative studio/workshop', weight: { creative: 3, arts: 2 } },
            { value: 'lab', label: '🔬 Laboratory/research facility', weight: { research: 3, healthcare: 2, tech: 1 } },
            { value: 'retail', label: '🛍️ Customer-facing environment', weight: { social: 2, sales: 3 } }
        ]
    },
    {
        key: 'subjects',
        type: 'multiple_choice',
        question: 'Which academic subjects were/are your strongest?',
        multiSelect: true,
        options: [
            { value: 'math', label: '📊 Mathematics & Statistics', weight: { tech: 2, finance: 3, research: 2 } },
            { value: 'science', label: '🧪 Physical Sciences', weight: { research: 3, tech: 1, healthcare: 2 } },
            { value: 'biology', label: '🧬 Life Sciences/Biology', weight: { healthcare: 3, research: 2 } },
            { value: 'english', label: '📝 English & Literature', weight: { education: 2, creative: 2, social: 1 } },
            { value: 'history', label: '📚 History & Social Studies', weight: { education: 2, social: 2, government: 1 } },
            { value: 'arts', label: '🎨 Visual/Performing Arts', weight: { creative: 3, entertainment: 2 } }
        ]
    },
    {
        key: 'careerValues',
        type: 'multiple_choice',
        question: 'What matters most to you in a career?',
        options: [
            { value: 'growth', label: '📈 Continuous learning & growth', weight: { tech: 2, consulting: 2, education: 1 } },
            { value: 'balance', label: '⚖️ Work-life balance', weight: { government: 2, education: 2 } },
            { value: 'prestige', label: '🏆 Recognition & prestige', weight: { corporate: 2, finance: 2, consulting: 2 } },
            { value: 'autonomy', label: '🗽 Independence & autonomy', weight: { freelance: 3, entrepreneurship: 2 } },
            { value: 'collaboration', label: '🤝 Teamwork & collaboration', weight: { social: 2, management: 2 } }
        ]
    },
    {
        key: 'industryInterest',
        type: 'multiple_choice',
        question: 'Which industries excite you most?',
        multiSelect: true,
        options: [
            { value: 'tech', label: '💻 Technology & Software', weight: { tech: 3, startup: 2 } },
            { value: 'healthcare', label: '🏥 Healthcare & Medicine', weight: { healthcare: 3, research: 1 } },
            { value: 'finance', label: '💳 Finance & Banking', weight: { finance: 3, business: 2 } },
            { value: 'education', label: '🎓 Education & Training', weight: { education: 3, social: 1 } },
            { value: 'media', label: '📺 Media & Entertainment', weight: { creative: 3, marketing: 2 } },
            { value: 'nonprofit', label: '🌍 Non-profit & NGO', weight: { social: 3, nonprofit: 3 } }
        ]
    },
    {
        key: 'personalityType',
        type: 'scenario',
        question: 'At a networking event, you typically:',
        options: [
            { value: 'mingle', label: 'Actively mingle and meet new people', weight: { social: 2, sales: 2, management: 1 } },
            { value: 'listen', label: 'Listen more than talk, observe dynamics', weight: { analytical: 2, research: 1 } },
            { value: 'deep', label: 'Have a few deep conversations', weight: { consulting: 2, education: 1 } },
            { value: 'avoid', label: 'Prefer to avoid such events', weight: { tech: 1, research: 2 } }
        ]
    },
    {
        key: 'learningStyle',
        type: 'multiple_choice',
        question: 'How do you learn best?',
        options: [
            { value: 'hands_on', label: '🛠️ Hands-on practice & experimentation', weight: { tech: 2, creative: 2, research: 1 } },
            { value: 'visual', label: '👁️ Visual aids & diagrams', weight: { creative: 2, design: 2 } },
            { value: 'reading', label: '📖 Reading & written materials', weight: { research: 2, education: 1 } },
            { value: 'discussion', label: '💬 Discussion & collaboration', weight: { social: 2, management: 1, education: 2 } },
            { value: 'structured', label: '📋 Structured courses & curricula', weight: { traditional: 2, corporate: 1 } }
        ]
    },
    {
        key: 'riskTolerance',
        type: 'slider',
        question: 'How do you feel about risk and uncertainty?',
        options: [
            { label: 'Risk Averse', opposite: 'Risk Seeking', weight: { stable: 1, entrepreneurial: -1 } },
            { label: 'Predictable Income', opposite: 'Variable Income', weight: { corporate: 1, freelance: -1 } },
            { label: 'Established Companies', opposite: 'Startups', weight: { corporate: 1, startup: -1 } }
        ]
    }
];

// Global Variables
let currentQuestionIndex = 0;
let quizAnswers = {};
let careerScores = {
    tech: 0, healthcare: 0, business: 0, creative: 0, social: 0,
    research: 0, education: 0, finance: 0, management: 0,
    consulting: 0, nonprofit: 0, startup: 0, government: 0,
    freelance: 0, corporate: 0, sales: 0, marketing: 0
};

// Navigation Functions
function showSection(sectionName) {
    console.log('Showing section:', sectionName);
    trackEvent('section_view', { section: sectionName });

    // Hide all sections including features
    const allSections = document.querySelectorAll('section[id]');
    console.log('Found sections:', allSections.length, Array.from(allSections).map(s => s.id));

    allSections.forEach(section => {
        section.classList.remove('active');
        section.setAttribute('aria-hidden', 'true');
        console.log('Removed active from:', section.id);
    });

    // Explicitly hide features section first
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.classList.remove('active');
        console.log('Features section explicitly hidden');
    }

    // Show selected section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.removeAttribute('aria-hidden');
        console.log('Added active to:', sectionName, 'Classes:', targetSection.className);
    } else {
        console.error('Section not found:', sectionName);
    }

    // Special handling for hero section - show features too
    if (sectionName === 'hero') {
        console.log('Showing features section for hero');
        if (featuresSection) {
            featuresSection.classList.add('active');
            console.log('Features section shown for hero');
        }
    }

    // Load career profiles when roadmap section is shown
    if (sectionName === 'roadmap-section') {
        console.log('Loading career profiles for roadmap section');
        loadCareerProfiles();
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Sync URL (routing)
    try {
        if (!window.__suppressNavigation) {
            const url = new URL(window.location.href);
            url.searchParams.set('section', sectionName);
            // Remove legacy action param when navigating by section
            url.searchParams.delete('action');
            history.pushState({ section: sectionName }, '', url.toString());
        }
    } catch (e) {
        console.warn('Routing update failed:', e);
    }
}

// Quiz Functions
function startQuiz() {
    trackEvent('assessment_start');
    showSection('quiz-section');
    currentQuestionIndex = 0;
    quizAnswers = {};
    displayQuestion();
}

function displayQuestion() {
    const question = QUIZ_QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

    // Update progress display
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    document.getElementById('total-questions').textContent = QUIZ_QUESTIONS.length;
    document.getElementById('progress-fill').style.width = progress + '%';

    const quizContent = document.getElementById('quiz-content');
    let questionHTML = '';

    switch(question.type) {
        case 'multiple_choice':
            questionHTML = renderMultipleChoice(question);
            break;
        case 'slider':
            questionHTML = renderSlider(question);
            break;
        case 'scenario':
            questionHTML = renderScenario(question);
            break;
        case 'ranking':
            questionHTML = renderRanking(question);
            break;
        case 'confidence':
            questionHTML = renderConfidence(question);
            break;
        default:
            questionHTML = renderMultipleChoice(question);
    }

    quizContent.innerHTML = `
        <div class="quiz-question">
            <h3>${question.question}</h3>
            ${questionHTML}
            <div class="quiz-navigation">
                ${currentQuestionIndex > 0 ? '<button onclick="previousQuestion()" class="btn btn-secondary">Previous</button>' : ''}
                <button onclick="nextQuestion()" class="btn btn-primary">
                    ${currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'Complete Assessment' : 'Next'}
                </button>
            </div>
        </div>
    `;

    // Initialize interactive elements
    initializeQuestionInteractions(question);
}

function renderMultipleChoice(question) {
    const isMultiSelect = question.multiSelect;
    const selectedValues = quizAnswers[question.key] || (isMultiSelect ? [] : null);

    return `
        <div class="quiz-options ${isMultiSelect ? 'multi-select' : ''}">
            ${question.options.map((option, index) => {
                const optionValue = option.value || option.label || option;
                const optionLabel = option.label || option;
                const isSelected = isMultiSelect ? 
                    selectedValues.includes(optionValue) : 
                    selectedValues === optionValue;

                return `
                    <div class="quiz-option ${isSelected ? 'selected' : ''}"
                         role="button" tabindex="0" aria-pressed="${isSelected}"
                         data-action="quiz-select" data-key="${question.key}" data-value="${optionValue}" data-multi="${isMultiSelect}">
                        ${isMultiSelect ? '<span class="checkbox">✓</span>' : ''}
                        ${optionLabel}
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderSlider(question) {
    return `
        <div class="quiz-sliders">
            ${question.options.map((option, index) => {
                const value = quizAnswers[question.key]?.[index] || 50;
                return `
                    <div class="slider-container">
                        <div class="slider-labels">
                            <span>${option.label}</span>
                            <span>${option.opposite}</span>
                        </div>
                        <input type="range" class="quiz-slider" 
                               min="0" max="100" value="${value}"
                               aria-label="${option.label} versus ${option.opposite}"
                               oninput="updateSliderValue('${question.key}', ${index}, this.value)"
                               onchange="updateSliderValue('${question.key}', ${index}, this.value)">
                        <div class="slider-value">${value}%</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderScenario(question) {
    const selectedValue = quizAnswers[question.key];

    return `
        <div class="quiz-scenarios">
            ${question.options.map(option => {
                const isSelected = selectedValue === option.value;
                return `
                    <div class="scenario-option ${isSelected ? 'selected' : ''}"
                         role="button" tabindex="0" aria-pressed="${isSelected}"
                         data-action="quiz-select" data-key="${question.key}" data-value="${option.value}" data-multi="false">
                        <div class="scenario-text">${option.label}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function renderRanking(question) {
    const rankings = quizAnswers[question.key] || question.options.map((_, i) => i);

    return `
        <div class="quiz-ranking">
            <p class="ranking-instruction">Drag to reorder from most important (top) to least important (bottom):</p>
            <div class="ranking-list" id="ranking-${question.key}">
                ${rankings.map((rankIndex, position) => {
                    const option = question.options[rankIndex];
                    return `
                        <div class="ranking-item" data-index="${rankIndex}" draggable="true" tabindex="0" role="listitem">
                            <span class="rank-number">${position + 1}</span>
                            <span class="rank-label">${option.label}</span>
                            <span class="drag-handle">⋮⋮</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function renderConfidence(question) {
    return `
        <div class="quiz-confidence">
            ${question.options.map(option => {
                const value = quizAnswers[question.key]?.[option.value] || 3;
                return `
                    <div class="confidence-item">
                        <label>${option.label}</label>
                        <div class="confidence-rating">
                            ${[1, 2, 3, 4, 5].map(rating => `
                                <button class="confidence-btn ${value >= rating ? 'active' : ''}" 
                                        onclick="setConfidenceRating('${question.key}', '${option.value}', ${rating})">
                                    ${rating}
                                </button>
                            `).join('')}
                        </div>
                        <div class="confidence-labels">
                            <span>Beginner</span>
                            <span>Expert</span>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function selectOption(key, value, isMultiSelect = false) {
    if (isMultiSelect) {
        if (!quizAnswers[key]) quizAnswers[key] = [];
        const index = quizAnswers[key].indexOf(value);
        if (index > -1) {
            quizAnswers[key].splice(index, 1);
        } else {
            quizAnswers[key].push(value);
        }
    } else {
        quizAnswers[key] = value;
    }

    // Update UI
    displayQuestion();
}

function updateSliderValue(key, index, value) {
    if (!quizAnswers[key]) quizAnswers[key] = {};
    quizAnswers[key][index] = parseInt(value);

    // Update the display
    const sliderContainer = document.querySelectorAll('.slider-container')[index];
    sliderContainer.querySelector('.slider-value').textContent = value + '%';
}

function setConfidenceRating(key, skillKey, rating) {
    if (!quizAnswers[key]) quizAnswers[key] = {};
    quizAnswers[key][skillKey] = rating;

    // Update UI
    displayQuestion();
}

function initializeQuestionInteractions(question) {
    if (question.type === 'ranking') {
        initializeDragAndDrop(question.key);
    }
}

function initializeDragAndDrop(questionKey) {
    const rankingList = document.getElementById(`ranking-${questionKey}`);
    if (!rankingList) return;

    let draggedElement = null;

    rankingList.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('ranking-item')) {
            draggedElement = e.target;
            e.target.style.opacity = '0.5';
        }
    });

    rankingList.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('ranking-item')) {
            e.target.style.opacity = '1';
        }
    });

    rankingList.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    rankingList.addEventListener('drop', (e) => {
        e.preventDefault();

        if (draggedElement && e.target.classList.contains('ranking-item')) {
            const items = Array.from(rankingList.children);
            const draggedIndex = items.indexOf(draggedElement);
            const targetIndex = items.indexOf(e.target);

            if (draggedIndex !== targetIndex) {
                if (draggedIndex < targetIndex) {
                    rankingList.insertBefore(draggedElement, e.target.nextSibling);
                } else {
                    rankingList.insertBefore(draggedElement, e.target);
                }

                updateRankingOrder(questionKey);
            }
        }
    });
}

function updateRankingOrder(questionKey) {
    const rankingList = document.getElementById(`ranking-${questionKey}`);
    const items = Array.from(rankingList.children);

    quizAnswers[questionKey] = items.map(item => parseInt(item.dataset.index));

    // Update rank numbers
    items.forEach((item, index) => {
        item.querySelector('.rank-number').textContent = index + 1;
    });
}

function nextQuestion() {
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

    // Validate current question
    if (!validateQuestionAnswer(currentQuestion)) {
        showNotification('Please complete this question before continuing.', 'warning');
        return;
    }

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        completeQuiz();
    }
}

function validateQuestionAnswer(question) {
    const answer = quizAnswers[question.key];

    switch(question.type) {
        case 'multiple_choice':
            if (question.multiSelect) {
                return answer && answer.length > 0;
            }
            return answer !== undefined && answer !== null;
        case 'slider':
            return answer && Object.keys(answer).length === question.options.length;
        case 'scenario':
            return answer !== undefined && answer !== null;
        case 'ranking':
            return answer && answer.length === question.options.length;
        case 'confidence':
            return answer && Object.keys(answer).length === question.options.length;
        default:
            return answer !== undefined && answer !== null;
    }
}

function calculateCareerScores() {
    // Reset scores
    Object.keys(careerScores).forEach(key => careerScores[key] = 0);

    QUIZ_QUESTIONS.forEach(question => {
        const answer = quizAnswers[question.key];
        if (!answer) return;

        switch(question.type) {
            case 'multiple_choice':
                if (question.multiSelect && Array.isArray(answer)) {
                    answer.forEach(value => {
                        const option = question.options.find(opt => opt.value === value);
                        if (option && option.weight) {
                            Object.entries(option.weight).forEach(([career, weight]) => {
                                careerScores[career] = (careerScores[career] || 0) + weight;
                            });
                        }
                    });
                } else {
                    const option = question.options.find(opt => opt.value === answer || opt.label === answer);
                    if (option && option.weight) {
                        Object.entries(option.weight).forEach(([career, weight]) => {
                            careerScores[career] = (careerScores[career] || 0) + weight;
                        });
                    }
                }
                break;

            case 'slider':
                question.options.forEach((option, index) => {
                    if (answer[index] !== undefined && option.weight) {
                        const normalizedValue = (answer[index] - 50) / 50; // -1 to 1
                        Object.entries(option.weight).forEach(([career, weight]) => {
                            careerScores[career] = (careerScores[career] || 0) + (weight * normalizedValue);
                        });
                    }
                });
                break;

            case 'ranking':
                answer.forEach((optionIndex, rank) => {
                    const option = question.options[optionIndex];
                    if (option && option.weight) {
                        const rankWeight = (question.options.length - rank) / question.options.length;
                        Object.entries(option.weight).forEach(([career, weight]) => {
                            careerScores[career] = (careerScores[career] || 0) + (weight * rankWeight);
                        });
                    }
                });
                break;

            case 'confidence':
                Object.entries(answer).forEach(([skillKey, rating]) => {
                    const option = question.options.find(opt => opt.value === skillKey);
                    if (option && option.weight) {
                        const confidenceMultiplier = rating / 5; // 0.2 to 1
                        Object.entries(option.weight).forEach(([career, weight]) => {
                            careerScores[career] = (careerScores[career] || 0) + (weight * confidenceMultiplier);
                        });
                    }
                });
                break;
        }
    });

    return careerScores;
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Announce to screen readers
    const live = document.getElementById('notification-live');
    if (live) { live.textContent = message; }

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

async function completeQuiz() {
    // Calculate career scores
    const scores = calculateCareerScores();

    // Show roadmap section
    showSection('roadmap-section');

    try {
        const roadmapContent = document.querySelector('.roadmap-container');
        roadmapContent.innerHTML = `
            <div class="loading-roadmap">
                <h2>🧠 Analyzing Your Assessment...</h2>
                <div class="loading-spinner"></div>
                <p>Creating your personalized career roadmap based on 12 data points...</p>
                <div class="analysis-progress">
                    <div class="progress-item completed">✓ Personality Analysis</div>
                    <div class="progress-item completed">✓ Skills Assessment</div>
                    <div class="progress-item active">🔄 Career Matching</div>
                    <div class="progress-item">⏳ Roadmap Generation</div>
                </div>
            </div>
        `;

        // Get top career matches
        const topCareers = Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([career, score]) => ({ career, score }));

        // Create detailed prompt for AI
        const detailedPrompt = `
User Assessment Results:
- Top Career Matches: ${topCareers.map(c => `${c.career} (${c.score.toFixed(1)})`).join(', ')}
- Quiz Answers: ${JSON.stringify(quizAnswers, null, 2)}

Generate a personalized career roadmap with:
1. Top 3 career recommendations with match percentages
2. Specific skills to develop for each career
3. Learning resources and next steps
4. Salary ranges and growth prospects
5. Timeline for career transition

Format as clear, actionable sections. Keep each career description to 3-4 sentences maximum.`;

        // Call AI to generate personalized roadmap
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                provider: 'gemini',
                model: 'gemini-1.5-flash',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert career counselor. Create detailed, actionable career roadmaps based on assessment data. Use specific percentages, salary ranges, and concrete next steps.'
                    },
                    {
                        role: 'user',
                        content: detailedPrompt
                    }
                ],
                max_tokens: 600,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate roadmap');
        }

        const data = await response.json();

        trackEvent('assessment_complete', { topCareers: topCareers.map(c=>c.career).slice(0,3) });

        // Display comprehensive results
        roadmapContent.innerHTML = `
            <div class="assessment-results">
                <h2>🎆 Your Personalized Career Assessment Results</h2>
                <div class="results-summary">
                    <div class="completion-badge">
                        <span class="badge-icon">🏆</span>
                        <div>
                            <h3>Assessment Complete!</h3>
                            <p>Analyzed ${QUIZ_QUESTIONS.length} key factors</p>
                        </div>
                    </div>
                </div>

                <div class="top-matches">
                    <h3>🎯 Your Top Career Matches</h3>
                    <div class="career-matches">
                        ${topCareers.slice(0, 3).map((career, index) => {
                            const percentage = Math.min(95, Math.max(65, (career.score * 10) + 70));
                            return `
                                <div class="career-match-card">
                                    <div class="match-header">
                                        <span class="match-rank">#${index + 1}</span>
                                        <span class="match-percentage">${percentage.toFixed(0)}% Match</span>
                                    </div>
                                    <h4>${career.career.charAt(0).toUpperCase() + career.career.slice(1)}</h4>
                                    <div class="match-bar">
                                        <div class="match-fill" style="width: ${percentage}%"></div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="ai-roadmap">
                    <h3>📝 Your Personalized Career Roadmap</h3>
                    <div class="roadmap-content">
                        ${data.response.replace(/\n/g, '<br>')}
                    </div>
                </div>

                <div class="next-steps">
                    <h3>🚀 Next Steps</h3>
                    <div class="action-buttons">
                        <button onclick="showSection('chat-section')" class="btn btn-primary">
                            🤖 Chat with AI Mentor
                        </button>
                        <button onclick="downloadResults()" class="btn btn-secondary">
                            💾 Download Results
                        </button>
                        <button onclick="retakeQuiz()" class="btn btn-secondary">
                            🔄 Retake Assessment
                        </button>
                    </div>
                </div>
            </div>
        `;

        showNotification('Assessment completed successfully! 🎉', 'success');

        // Save assessment results
        if (typeof authManager !== 'undefined') {
            const saveResult = await authManager.saveAssessmentResult(quizAnswers, scores, topCareers);
            if (saveResult.success) {
                showNotification(saveResult.message, 'success');
                trackEvent('assessment_saved');
            }
        }

        // Update user profile for AI conversations
        updateUserProfile();

        // Initialize enhanced AI chat if user navigates to chat
        if (document.getElementById('chat-messages').children.length <= 1) {
            // Clear default message and add personalized welcome
            document.getElementById('chat-messages').innerHTML = '';
        }

    } catch (error) {
        console.error('Error generating roadmap:', error);
        showNotification('Unable to generate AI roadmap. Showing default recommendations.', 'warning');
        trackEvent('assessment_ai_fallback');

        // Fallback to static content with calculated scores
        const topCareers = Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3);

        roadmapContent.innerHTML = `
            <div class="assessment-results">
                <h2>Your Career Assessment Results</h2>
                <div class="top-matches">
                    ${topCareers.map((career, index) => {
                        const percentage = Math.min(95, Math.max(65, (career[1] * 10) + 70));
                        return `
                            <div class="career-match-card">
                                <h4>#${index + 1}: ${career[0].charAt(0).toUpperCase() + career[0].slice(1)}</h4>
                                <div class="match-percentage">${percentage.toFixed(0)}% Match</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="action-buttons">
                    <button onclick="showSection('chat-section')" class="btn btn-primary">Chat with AI Mentor</button>
                    <button onclick="retakeQuiz()" class="btn btn-secondary">Retake Assessment</button>
                </div>
            </div>
        `;
    }
}

function retakeQuiz() {
    currentQuestionIndex = 0;
    quizAnswers = {};
    Object.keys(careerScores).forEach(key => careerScores[key] = 0);
    startQuiz();
}

function downloadResults() {
    const scores = calculateCareerScores();
    const topCareers = Object.entries(scores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);

    const resultsText = `
MindMate Career Assessment Results
=================================

Top Career Matches:
${topCareers.map((career, index) => {
    const percentage = Math.min(95, Math.max(65, (career[1] * 10) + 70));
    return `${index + 1}. ${career[0].charAt(0).toUpperCase() + career[0].slice(1)} - ${percentage.toFixed(0)}% Match`;
}).join('\n')}

Assessment Date: ${new Date().toLocaleDateString()}
Generated by: MindMate AI Career Guidance Platform
`;

    const blob = new Blob([resultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmate-career-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('Results downloaded successfully! 💾', 'success');
}

// Chat Functions with Memory
let conversationHistory = [];
let userProfile = {
    assessmentCompleted: false,
    topCareers: [],
    interests: [],
    skills: {},
    preferences: {}
};

function handleChatKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function initializeAIChat() {
    // Add welcome message with personality
    const welcomeMessage = userProfile.assessmentCompleted ? 
        `Welcome back! I see you've completed your career assessment. Based on your results showing strong matches for ${userProfile.topCareers.slice(0, 2).join(' and ')}, I'm here to help you with specific guidance. What would you like to explore?` :
        "Hello! I'm your AI career mentor. I can help you explore career paths, develop skills, and make important career decisions. Have you taken our career assessment yet?";

    addChatMessage(welcomeMessage, 'ai');
}

function updateUserProfile() {
    if (Object.keys(quizAnswers).length > 0) {
        userProfile.assessmentCompleted = true;
        const scores = calculateCareerScores();
        userProfile.topCareers = Object.entries(scores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([career]) => career);

        // Extract interests and skills from quiz
        if (quizAnswers.interests) {
            userProfile.interests = Array.isArray(quizAnswers.interests) ? 
                quizAnswers.interests : [quizAnswers.interests];
        }

        if (quizAnswers.skills) {
            userProfile.skills = quizAnswers.skills;
        }

        if (quizAnswers.careerValues) {
            userProfile.preferences.values = quizAnswers.careerValues;
        }
    }
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (!message) return;

    trackEvent('chat_send');

    // Add user message
    addChatMessage(message, 'user');
    input.value = '';

    // Add to conversation history
    conversationHistory.push({ role: 'user', content: message });

    // Show enhanced typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message ai typing-indicator';
    typingDiv.innerHTML = `
        <div class="ai-avatar">🤖</div>
        <div class="message-content">
            <strong>AI Mentor:</strong> 
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="thinking-text">Analyzing your question...</div>
        </div>
    `;
    document.getElementById('chat-messages').appendChild(typingDiv);
    document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;

    try {
        // Create context-aware prompt
        const systemPrompt = createContextualSystemPrompt(message);
        const messages = [{ role: 'system', content: systemPrompt }];

        // Add recent conversation history (last 6 messages)
        const recentHistory = conversationHistory.slice(-6);
        messages.push(...recentHistory);

        // Call the AI API
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                provider: 'gemini',
                model: 'gemini-1.5-flash',
                messages: messages,
                max_tokens: 250,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();

        // Remove typing indicator
        typingDiv.remove();

        // Add AI response with enhanced formatting
        addEnhancedChatMessage(data.response, 'ai');

        // Add to conversation history
        conversationHistory.push({ role: 'assistant', content: data.response });

        // Suggest follow-up questions
        suggestFollowUpQuestions(message, data.response);

    } catch (error) {
        console.error('Error calling AI API:', error);

        // Remove typing indicator
        typingDiv.remove();

        // Smart fallback based on user message
        const fallbackResponse = generateSmartFallback(message);
        addEnhancedChatMessage(fallbackResponse, 'ai');
    }
}

function createContextualSystemPrompt(userMessage) {
    let prompt = "You are an expert AI career mentor with deep knowledge of career paths, skills development, and industry trends. ";

    if (userProfile.assessmentCompleted) {
        prompt += `The user has completed a career assessment. Their top career matches are: ${userProfile.topCareers.join(', ')}. `;

        if (userProfile.interests.length > 0) {
            prompt += `Their interests include: ${userProfile.interests.join(', ')}. `;
        }

        if (Object.keys(userProfile.skills).length > 0) {
            const skillLevels = Object.entries(userProfile.skills)
                .map(([skill, level]) => `${skill} (${level}/5)`)
                .join(', ');
            prompt += `Their skill confidence levels: ${skillLevels}. `;
        }
    } else {
        prompt += "The user hasn't taken the career assessment yet. Encourage them to take it for personalized advice. ";
    }

    // Analyze user message for intent
    const messageIntent = analyzeMessageIntent(userMessage);

    switch(messageIntent) {
        case 'career_exploration':
            prompt += "Focus on exploring different career options, providing specific examples and pathways.";
            break;
        case 'skill_development':
            prompt += "Provide specific, actionable advice on skill development with concrete resources and timelines.";
            break;
        case 'job_search':
            prompt += "Give practical job search advice including resume tips, interview prep, and networking strategies.";
            break;
        case 'salary_negotiation':
            prompt += "Provide strategic salary negotiation advice with specific tactics and market insights.";
            break;
        default:
            prompt += "Provide helpful, specific career guidance tailored to their situation.";
    }

    prompt += " Keep responses conversational but informative, under 200 words, and always end with a relevant follow-up question.";

    return prompt;
}

function analyzeMessageIntent(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('profession')) {
        return 'career_exploration';
    }
    if (lowerMessage.includes('skill') || lowerMessage.includes('learn') || lowerMessage.includes('course')) {
        return 'skill_development';
    }
    if (lowerMessage.includes('resume') || lowerMessage.includes('interview') || lowerMessage.includes('job search')) {
        return 'job_search';
    }
    if (lowerMessage.includes('salary') || lowerMessage.includes('negotiate') || lowerMessage.includes('pay')) {
        return 'salary_negotiation';
    }

    return 'general';
}

function addEnhancedChatMessage(content, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender} enhanced`;

    if (sender === 'ai') {
        messageDiv.innerHTML = `
            <div class="ai-avatar">🤖</div>
            <div class="message-content">
                <strong>AI Mentor:</strong>
                <div class="message-text">${formatAIResponse(content)}</div>
                <div class="message-actions">
                    <button class="message-action" onclick="copyToClipboard('${content.replace(/'/g, "\\'")}')">📋 Copy</button>
                    <button class="message-action" onclick="likeMessage(this)">👍 Helpful</button>
                </div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="user-avatar">👤</div>
            <div class="message-content">
                <div class="message-text">${content}</div>
            </div>
        `;
    }

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Animate message appearance
    setTimeout(() => {
        messageDiv.classList.add('appear');
    }, 100);
}

function formatAIResponse(response) {
    // Format lists, bold text, and add structure
    return response
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>')
        .replace(/\n- /g, '</p><ul><li>')
        .replace(/\n/g, '<br>');
}

function suggestFollowUpQuestions(userMessage, aiResponse) {
    const suggestions = generateFollowUpSuggestions(userMessage, aiResponse);

    if (suggestions.length > 0) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'follow-up-suggestions';
        suggestionsDiv.innerHTML = `
            <div class="suggestions-header">💡 You might also ask:</div>
            <div class="suggestions-list">
                ${suggestions.map(suggestion => 
                    `<button class="suggestion-btn" onclick="askFollowUp('${suggestion.replace(/'/g, "\\'")}')">🔍 ${suggestion}</button>`
                ).join('')}
            </div>
        `;

        document.getElementById('chat-messages').appendChild(suggestionsDiv);
        document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    }
}

function generateFollowUpSuggestions(userMessage, aiResponse) {
    const suggestions = [];
    const messageIntent = analyzeMessageIntent(userMessage);

    switch(messageIntent) {
        case 'career_exploration':
            suggestions.push(
                "What skills do I need for this career?",
                "What's the typical salary range?",
                "How do I get started in this field?"
            );
            break;
        case 'skill_development':
            suggestions.push(
                "What are the best free resources to learn this?",
                "How long does it typically take to master?",
                "Which certifications are most valuable?"
            );
            break;
        case 'job_search':
            suggestions.push(
                "How can I stand out to employers?",
                "What questions should I ask in interviews?",
                "How do I network effectively?"
            );
            break;
        default:
            if (userProfile.assessmentCompleted) {
                suggestions.push(
                    "Tell me more about my top career match",
                    "What should I focus on improving?",
                    "How can I transition to a new career?"
                );
            } else {
                suggestions.push(
                    "How can I discover my ideal career?",
                    "What are the most in-demand careers?",
                    "Should I take the career assessment?"
                );
            }
    }

    return suggestions.slice(0, 3);
}

function askFollowUp(question) {
    document.getElementById('chat-input').value = question;
    sendMessage();

    // Remove suggestions after use
    const suggestionsDiv = document.querySelector('.follow-up-suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.remove();
    }
}

function generateSmartFallback(userMessage) {
    const intent = analyzeMessageIntent(userMessage);

    const fallbacks = {
        career_exploration: "I'd love to help you explore career options! While I'm having trouble accessing my AI services, I can suggest starting with our career assessment to identify your strengths and interests. Based on that, I can provide more targeted advice.",
        skill_development: "Skill development is crucial for career growth! Even though my AI services are temporarily unavailable, I recommend checking out free platforms like Coursera, Khan Academy, and YouTube for learning new skills. What specific skill were you interested in?",
        job_search: "Job searching can be challenging, but you're taking the right steps by seeking guidance! While my AI is offline, some quick tips: tailor your resume to each job, practice your elevator pitch, and leverage LinkedIn for networking.",
        salary_negotiation: "Salary negotiation is an important skill! Research market rates for your role and location, document your achievements, and practice your negotiation conversation. Would you like some specific strategies?",
        general: "I'm here to help with your career journey! Though my AI services are temporarily down, feel free to ask about career paths, skill development, or job search strategies. I'll do my best to provide helpful guidance."
    };

    return fallbacks[intent] || fallbacks.general;
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Message copied to clipboard! 📋', 'success');
    });
}

function likeMessage(button) {
    button.innerHTML = '✅ Thanks!';
    button.disabled = true;
    showNotification('Feedback noted! This helps me improve. 🙏', 'success');
}

function addChatMessage(content, sender) {
    addEnhancedChatMessage(content, sender);
}

// Career Explorer Functions
let allCareers = [];
let filteredCareers = [];

async function loadCareerProfiles() {
    try {
        const response = await fetch('/api/careers');
        if (response.ok) {
            allCareers = await response.json();
            filteredCareers = [...allCareers];
            displayCareers(filteredCareers);
        } else {
            console.log('Failed to load careers from API, using fallback');
            loadFallbackCareers();
        }
    } catch (error) {
        console.error('Error loading careers:', error);
        loadFallbackCareers();
    }
}

function loadFallbackCareers() {
    // Fallback career data if API is not available
    allCareers = [
        {
            name: 'Software Developer',
            category: 'Technology',
            description: 'Design, develop, and maintain software applications and systems.',
            skills_required: ['Programming', 'Problem Solving', 'Software Design', 'Testing'],
            salary_range: { min: 70000, max: 150000, median: 95000 },
            growth_outlook: 'Excellent - 22% growth expected',
            education_requirements: ['Computer Science Degree', 'Coding Bootcamp', 'Self-taught with Portfolio']
        },
        {
            name: 'Data Scientist',
            category: 'Technology',
            description: 'Analyze complex data to extract insights and help organizations make data-driven decisions.',
            skills_required: ['Statistics', 'Python/R', 'Machine Learning', 'Data Visualization'],
            salary_range: { min: 90000, max: 180000, median: 126000 },
            growth_outlook: 'Excellent - 35% growth expected',
            education_requirements: ['Statistics/Math Degree', 'Computer Science Degree', 'Data Science Bootcamp']
        },
        {
            name: 'UX Designer',
            category: 'Design',
            description: 'Create user-friendly and visually appealing digital experiences.',
            skills_required: ['User Research', 'Prototyping', 'Design Tools', 'Psychology'],
            salary_range: { min: 65000, max: 130000, median: 85000 },
            growth_outlook: 'Very Good - 13% growth expected',
            education_requirements: ['Design Degree', 'Psychology Degree', 'UX Bootcamp']
        }
    ];
    filteredCareers = [...allCareers];
    displayCareers(filteredCareers);
}

function displayCareers(careers) {
    const careerGrid = document.getElementById('careerGrid');
    const loadingElement = document.getElementById('loadingCareers');

    if (loadingElement) {
        loadingElement.style.display = 'none';
    }

    if (!careerGrid) return;

    if (careers.length === 0) {
        careerGrid.innerHTML = `
            <div class="no-careers-found">
                <div class="no-results-icon">🔍</div>
                <h3>No careers found</h3>
                <p>Try adjusting your search criteria or filters.</p>
                <button class="btn btn-secondary" onclick="clearFilters()">Clear All Filters</button>
            </div>
        `;
        return;
    }

    careerGrid.innerHTML = careers.map(career => {
        const categoryIcon = getCategoryIcon(career.category);
        const salaryRange = career.salary_range;
        const salaryText = salaryRange ? 
            `$${(salaryRange.min / 1000).toFixed(0)}K - $${(salaryRange.max / 1000).toFixed(0)}K` : 
            'Salary varies';
        const medianSalary = salaryRange?.median ? 
            ` (Avg: $${(salaryRange.median / 1000).toFixed(0)}K)` : '';

        const growthClass = getGrowthClass(career.growth_outlook);
        const skillsDisplay = Array.isArray(career.skills_required) ? 
            career.skills_required.slice(0, 4).join(', ') : 
            'Various skills required';

        return `
            <div class="career-card enhanced" onclick="showCareerDetails('${career.name.replace(/'/g, "\\'")}')
                data-category="${career.category.toLowerCase()}"
                data-salary-min="${salaryRange?.min || 0}"
                data-salary-max="${salaryRange?.max || 0}"
                data-growth="${growthClass}">

                <div class="career-header">
                    <div class="career-icon">${categoryIcon}</div>
                    <div class="career-badge ${growthClass}">${getGrowthLabel(career.growth_outlook)}</div>
                </div>

                <div class="career-info">
                    <h3>${career.name}</h3>
                    <div class="career-category">${career.category}</div>
                    <p class="career-description">${career.description}</p>

                    <div class="career-metrics">
                        <div class="metric">
                            <span class="metric-label">💰 Salary</span>
                            <span class="metric-value">${salaryText}${medianSalary}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">📈 Growth</span>
                            <span class="metric-value">${career.growth_outlook.split(' - ')[0]}</span>
                        </div>
                    </div>

                    <div class="career-skills">
                        <span class="skills-label">🛠️ Key Skills:</span>
                        <span class="skills-text">${skillsDisplay}</span>
                    </div>
                </div>

                <div class="career-actions">
                    <button class="btn btn-primary btn-small" onclick="event.stopPropagation(); exploreCareer('${career.name.replace(/'/g, "\\'")}')">Explore Path</button>
                    <button class="btn btn-secondary btn-small" onclick="event.stopPropagation(); saveCareer('${career.name.replace(/'/g, "\\'")}')">❤️ Save</button>
                </div>
            </div>
        `;
    }).join('');
}

function getCategoryIcon(category) {
    const icons = {
        'Technology': '💻',
        'Design': '🎨',
        'Healthcare': '🏥',
        'Finance': '💳',
        'Marketing': '📢',
        'Business': '📈',
        'Education': '🎓',
        'Creative': '🎥',
        'Sales': '🤝',
        'Operations': '⚙️',
        'Environmental': '🌱'
    };
    return icons[category] || '🖼️';
}

function getGrowthClass(growthOutlook) {
    const lower = growthOutlook.toLowerCase();
    if (lower.includes('excellent') || lower.includes('40+') || lower.includes('35%') || lower.includes('31%') || lower.includes('30%') || lower.includes('28%') || lower.includes('25%') || lower.includes('22%') || lower.includes('21%') || lower.includes('20+') || lower.includes('18%') || lower.includes('15+')) {
        return 'excellent';
    } else if (lower.includes('very good') || lower.includes('good') || lower.includes('11%') || lower.includes('10%') || lower.includes('9%') || lower.includes('8%') || lower.includes('7%') || lower.includes('6%')) {
        return 'good';
    } else {
        return 'stable';
    }
}

function getGrowthLabel(growthOutlook) {
    const growthClass = getGrowthClass(growthOutlook);
    switch(growthClass) {
        case 'excellent': return 'High Growth';
        case 'good': return 'Growing';
        default: return 'Stable';
    }
}

function filterCareers() {
    const searchTerm = document.getElementById('careerSearch')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    const salaryFilter = document.getElementById('salaryFilter')?.value || '';
    const growthFilter = document.getElementById('growthFilter')?.value || '';

    filteredCareers = allCareers.filter(career => {
        // Search filter
        const matchesSearch = !searchTerm || 
            career.name.toLowerCase().includes(searchTerm) ||
            career.description.toLowerCase().includes(searchTerm) ||
            career.category.toLowerCase().includes(searchTerm) ||
            (Array.isArray(career.skills_required) && 
             career.skills_required.some(skill => skill.toLowerCase().includes(searchTerm)));

        // Category filter
        const matchesCategory = !categoryFilter || career.category === categoryFilter;

        // Salary filter
        let matchesSalary = true;
        if (salaryFilter && career.salary_range) {
            const min = career.salary_range.min || 0;
            const max = career.salary_range.max || 0;
            switch(salaryFilter) {
                case 'entry':
                    matchesSalary = min < 60000;
                    break;
                case 'mid':
                    matchesSalary = min >= 60000 && max <= 100000;
                    break;
                case 'senior':
                    matchesSalary = max > 100000;
                    break;
            }
        }

        // Growth filter
        const matchesGrowth = !growthFilter || getGrowthClass(career.growth_outlook) === growthFilter;

        return matchesSearch && matchesCategory && matchesSalary && matchesGrowth;
    });

    displayCareers(filteredCareers);

    // Update results count
    updateResultsCount();
}

function updateResultsCount() {
    const count = filteredCareers.length;
    const totalCount = allCareers.length;

    // You can add a results counter element if desired
    console.log(`Showing ${count} of ${totalCount} careers`);
}

function clearFilters() {
    document.getElementById('careerSearch').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('salaryFilter').value = '';
    document.getElementById('growthFilter').value = '';

    filteredCareers = [...allCareers];
    displayCareers(filteredCareers);
    updateResultsCount();
}

function showCareerDetails(careerName) {
    const career = allCareers.find(c => c.name === careerName);
    if (!career) return;

    const modal = document.createElement('div');
    modal.className = 'career-modal';

    const skillsList = Array.isArray(career.skills_required) ? 
        career.skills_required.map(skill => `<li>${skill}</li>`).join('') : 
        '<li>Skills information not available</li>';

    const educationList = Array.isArray(career.education_requirements) ? 
        career.education_requirements.map(req => `<li>${req}</li>`).join('') : 
        '<li>Education requirements not available</li>';

    const salaryInfo = career.salary_range ? 
        `<p><strong>Salary Range:</strong> $${(career.salary_range.min / 1000).toFixed(0)}K - $${(career.salary_range.max / 1000).toFixed(0)}K</p>
         ${career.salary_range.median ? `<p><strong>Median Salary:</strong> $${(career.salary_range.median / 1000).toFixed(0)}K</p>` : ''}` : 
        '<p><strong>Salary:</strong> Information varies by location and experience</p>';

    modal.innerHTML = `
        <div class="career-modal-content">
            <div class="career-modal-header">
                <div class="career-title-section">
                    <div class="career-icon-large">${getCategoryIcon(career.category)}</div>
                    <div>
                        <h2>${career.name}</h2>
                        <div class="career-category-badge">${career.category}</div>
                        <div class="growth-badge ${getGrowthClass(career.growth_outlook)}">${getGrowthLabel(career.growth_outlook)}</div>
                    </div>
                </div>
                <button class="close-modal" onclick="this.closest('.career-modal').remove()">&times;</button>
            </div>

            <div class="career-modal-body">
                <div class="career-overview">
                    <h3>📝 Overview</h3>
                    <p>${career.description}</p>
                </div>

                <div class="career-details-grid">
                    <div class="detail-section">
                        <h3>💰 Compensation</h3>
                        ${salaryInfo}
                        <p><strong>Growth Outlook:</strong> ${career.growth_outlook}</p>
                    </div>

                    <div class="detail-section">
                        <h3>🛠️ Required Skills</h3>
                        <ul class="skills-list">${skillsList}</ul>
                    </div>

                    <div class="detail-section">
                        <h3>🎓 Education & Qualifications</h3>
                        <ul class="education-list">${educationList}</ul>
                    </div>

                    <div class="detail-section">
                        <h3>🚀 Next Steps</h3>
                        <ul>
                            <li>Take our career assessment for personalized guidance</li>
                            <li>Explore skill development resources</li>
                            <li>Connect with professionals in this field</li>
                            <li>Research entry-level opportunities</li>
                        </ul>
                    </div>
                </div>

                <div class="career-modal-actions">
                    <button class="btn btn-primary" onclick="startCareerPath('${career.name.replace(/'/g, "\\'")}')">Start Career Path</button>
                    <button class="btn btn-secondary" onclick="showSection('chat-section'); this.closest('.career-modal').remove();">Ask AI Mentor</button>
                    <button class="btn btn-secondary" onclick="downloadCareerInfo('${career.name.replace(/'/g, "\\'")}')">Download Info</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function exploreCareer(careerName) {
    showCareerDetails(careerName);
}

function saveCareer(careerName) {
    // Add to saved careers (implement with local storage or user account)
    const savedCareers = JSON.parse(localStorage.getItem('mindmate_saved_careers') || '[]');
    if (!savedCareers.includes(careerName)) {
        savedCareers.push(careerName);
        localStorage.setItem('mindmate_saved_careers', JSON.stringify(savedCareers));
        showNotification(`${careerName} saved to your favorites! ❤️`, 'success');
    } else {
        showNotification(`${careerName} is already in your favorites!`, 'info');
    }
}

function startCareerPath(careerName) {
    // Navigate to quiz or chat with career-specific context
    showSection('quiz-section');
    showNotification(`Starting personalized path for ${careerName}! 🚀`, 'success');
    document.querySelector('.career-modal').remove();
}

function downloadCareerInfo(careerName) {
    const career = allCareers.find(c => c.name === careerName);
    if (!career) return;

    const content = `
MindMate Career Profile: ${career.name}
${'='.repeat(40)}

Category: ${career.category}
Description: ${career.description}

Salary Information:
${career.salary_range ? `- Range: $${career.salary_range.min.toLocaleString()} - $${career.salary_range.max.toLocaleString()}` : '- Varies by location and experience'}
${career.salary_range?.median ? `- Median: $${career.salary_range.median.toLocaleString()}` : ''}

Growth Outlook: ${career.growth_outlook}

Required Skills:
${Array.isArray(career.skills_required) ? career.skills_required.map(skill => `- ${skill}`).join('\n') : '- Information not available'}

Education Requirements:
${Array.isArray(career.education_requirements) ? career.education_requirements.map(req => `- ${req}`).join('\n') : '- Information not available'}

Generated by: MindMate Career Guidance Platform
Date: ${new Date().toLocaleDateString()}
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindmate-${careerName.toLowerCase().replace(/\s+/g, '-')}-profile.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification(`Career profile downloaded! 💾`, 'success');
}

// Mobile navigation toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    if (nav) {
        nav.classList.toggle('open');
    }
}

// Skip loading function for demo mode
function skipLoading() {
    console.log('Skipping loading screen...');

    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    if (loadingScreen) {
        loadingScreen.style.display = 'none';
        loadingScreen.classList.add('hidden');
        console.log('Loading screen hidden');
    }
    if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.classList.remove('hidden');
        console.log('Main content shown');
    }

    // Show hero section by default
    setTimeout(() => {
        showSection('hero');
        showNotification('Welcome to MindMate! 🚀', 'success');
    }, 100);
}

// Retry connection function for error screen
function retryConnection() {
    console.log('Retrying connection...');

    // Hide error screen and try to load main content
    const errorScreen = document.getElementById('error-screen');
    const mainContent = document.getElementById('main-content');

    if (errorScreen) {
        errorScreen.classList.add('hidden');
    }
    if (mainContent) {
        mainContent.classList.remove('hidden');
    }

    // Show hero section by default
    showSection('hero');

    showNotification('Connection retried! Welcome to MindMate! 🚀', 'success');
}

// Initialize the app immediately
document.addEventListener('DOMContentLoaded', function() {
    console.log('MindMate app initializing...');

    // Add debug info
    console.log('Current sections:', document.querySelectorAll('section[id]'));

    // Router: resolve initial section from URL or manifest shortcuts
    setTimeout(() => {
        console.log('Initializing router and section');
        const url = new URL(window.location.href);
        const action = url.searchParams.get('action');
        const sectionParam = url.searchParams.get('section');

        let initialSection = 'hero';
        if (sectionParam) {
            initialSection = mapRouteToSection(sectionParam);
        } else if (action) {
            initialSection = mapActionToSection(action);
        }

        // Ensure initial render reflects URL without relying on animations
        window.__suppressNavigation = true;
        try { showSection(initialSection); } finally { window.__suppressNavigation = false; }

        // Lazy init heavy sections on first intersection
        setupSectionLazyInit();

        // Initialize quiz
        const totalQuestionsEl = document.getElementById('total-questions');
        if (totalQuestionsEl) {
            totalQuestionsEl.textContent = QUIZ_QUESTIONS.length;
        }

        console.log('MindMate app initialized successfully!');
    }, 100);

    // Delegated click handling for navigation and actions
    document.addEventListener('click', (e) => {
        // Intercept anchor links with ?section= as SPA navigation
        const link = e.target.closest('a[href*="?section="]');
        if (link) {
            e.preventDefault();
            const u = new URL(link.href, window.location.origin);
            const section = mapRouteToSection(u.searchParams.get('section'));
            trackEvent('nav_click', { section });
            showSection(section);
            return;
        }

        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.getAttribute('data-action');
        if (action === 'navigate') {
            e.preventDefault();
            const section = target.getAttribute('data-section');
            if (section) {
                trackEvent('nav_click', { section });
                showSection(section);
            }
        } else if (action === 'start-quiz') {
            e.preventDefault();
            trackEvent('cta_click', { action: 'start_quiz' });
            startQuiz();
        } else if (action === 'toggle-mobile-menu') {
            e.preventDefault();
            document.querySelector('.nav-links')?.classList.toggle('open');
        } else if (action === 'quiz-select') {
            e.preventDefault();
            const key = target.getAttribute('data-key');
            const value = target.getAttribute('data-value');
            const isMulti = target.getAttribute('data-multi') === 'true';
            selectOption(key, value, isMulti);
        } else if (action === 'consent-accept') {
            e.preventDefault();
            setConsent(true);
        } else if (action === 'consent-decline') {
            e.preventDefault();
            setConsent(false);
        }
    });

    // Keyboard support for quiz selection elements
    document.addEventListener('keydown', (e) => {
        const el = e.target;
        if (!el || el.getAttribute === undefined) return;
        const action = el.getAttribute('data-action');
        if (!action) return;

        if ((action === 'quiz-select') && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            const key = el.getAttribute('data-key');
            const value = el.getAttribute('data-value');
            const isMulti = el.getAttribute('data-multi') === 'true';
            selectOption(key, value, isMulti);
        }
    });
});

// Lightweight analytics dispatcher (replace with GA4/PostHog later)
function trackEvent(eventName, payload = {}) {
    try {
        const event = {
            event: eventName,
            payload,
            ts: Date.now(),
            path: location.pathname + location.search
        };
        // Log locally; optionally POST to /api/analytics/events
        console.debug('[analytics]', event);
        bufferAnalyticsEvent(event);
    } catch (e) {
        // no-op
    }
}

// Behavioral SDK v0
const __analyticsBuffer = [];
let __lastInteractionTs = Date.now();
let __sessionId = (Math.random().toString(36).slice(2) + Date.now().toString(36));
let __flushTimer = null;
let __consent = true; // replace with user setting later

function bufferAnalyticsEvent(evt) {
    if (!__consent) return;
    __analyticsBuffer.push(evt);
    if (!__flushTimer) {
        __flushTimer = setTimeout(flushAnalytics, 5000);
    }
}

function flushAnalytics() {
    __flushTimer = null;
    if (!__consent || __analyticsBuffer.length === 0) return;
    const batch = __analyticsBuffer.splice(0, __analyticsBuffer.length);
    fetch('/api/analytics/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: __sessionId, events: batch })
    }).catch(() => {});
}

// Dwell and scroll metrics
document.addEventListener('visibilitychange', () => {
    trackEvent('visibility_change', { state: document.visibilityState });
});

window.addEventListener('scroll', () => {
    const scrolled = Math.round((window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight)) * 100);
    trackEvent('scroll_progress', { pct: Math.min(100, Math.max(0, scrolled)) });
});

// Hesitation (latency-to-click)
document.addEventListener('mousemove', () => { __lastInteractionTs = Date.now(); }, { passive: true });
document.addEventListener('keydown', () => { __lastInteractionTs = Date.now(); });
document.addEventListener('click', (e) => {
    const latency = Date.now() - __lastInteractionTs;
    const targetName = (e.target.closest('[data-action]')?.getAttribute('data-action')) || e.target.tagName;
    trackEvent('click_latency', { latency, target: targetName });
});

// Career card hover compare (delegate)
document.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.career-card, .learning-card');
    if (card && !card.__hoverStart) {
        card.__hoverStart = performance.now();
    }
});
document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.career-card, .learning-card');
    if (card && card.__hoverStart) {
        const dwell = Math.round(performance.now() - card.__hoverStart);
        card.__hoverStart = null;
        trackEvent('card_dwell', { dwell, kind: card.classList.contains('learning-card') ? 'learning' : 'career' });
    }
});

// Periodic flush on unload
window.addEventListener('beforeunload', () => {
    try { flushAnalytics(); } catch (_) {}
});

// Consent persistence
function loadConsent() {
    const saved = localStorage.getItem('mm_analytics_consent');
    if (saved === null) {
        document.getElementById('consent-banner').style.display = 'block';
        __consent = false;
    } else {
        __consent = saved === 'true';
    }
}

function setConsent(value) {
    __consent = !!value;
    localStorage.setItem('mm_analytics_consent', String(__consent));
    const banner = document.getElementById('consent-banner');
    if (banner) banner.style.display = 'none';
    trackEvent('consent_update', { consent: __consent });
}

// Initialize consent on load
loadConsent();

// Lazy-initialize heavy sections (careers, learning, community, analytics)
const __initializedSections = new Set();
function setupSectionLazyInit() {
    if (!('IntersectionObserver' in window)) {
        // Fallback: initialize immediately
        initializeSection('roadmap-section');
        initializeSection('learning-section');
        initializeSection('community-section');
        initializeSection('analytics-section');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                initializeSection(id);
            }
        }
    }, { rootMargin: '0px 0px -40% 0px', threshold: 0.1 });

    ['roadmap-section','learning-section','community-section','analytics-section']
        .forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
}

function initializeSection(sectionId) {
    if (__initializedSections.has(sectionId)) return;
    __initializedSections.add(sectionId);

    switch(sectionId) {
        case 'roadmap-section':
            try { loadCareerProfiles && loadCareerProfiles(); } catch(_) {}
            break;
        case 'learning-section':
            try { showLearningTab('courses'); } catch(_) {}
            break;
        case 'community-section':
            try { showCommunityTab('forum'); } catch(_) {}
            break;
        case 'analytics-section':
            try { showAnalyticsTab('predictions'); } catch(_) {}
            break;
    }
}

// Map URL params to section ids
function mapRouteToSection(route) {
    const routes = {
        'home': 'hero',
        'assessment': 'quiz-section',
        'chat': 'chat-section',
        'careers': 'roadmap-section',
        'learning': 'learning-section',
        'community': 'community-section',
        'analytics': 'analytics-section'
    };
    return routes[route] || route;
}

function mapActionToSection(action) {
    // Support manifest shortcuts (assessment, chat, community)
    const map = {
        'assessment': 'quiz-section',
        'chat': 'chat-section',
        'community': 'community-section'
    };
    return map[action] || mapRouteToSection(action);
}

// Handle browser navigation
window.addEventListener('popstate', (event) => {
    const stateSection = event.state?.section;
    const url = new URL(window.location.href);
    const sectionParam = url.searchParams.get('section');
    const action = url.searchParams.get('action');
    const target = stateSection || (sectionParam ? mapRouteToSection(sectionParam) : (action ? mapActionToSection(action) : 'hero'));

    window.__suppressNavigation = true;
    try { showSection(target); } finally { window.__suppressNavigation = false; }
});

// Learning Resources Functions
let allLearningResources = [];
let filteredLearningResources = [];
let currentLearningTab = 'courses';

// Show learning tab
function showLearningTab(tabName) {
    trackEvent('learning_tab_view', { tab: tabName });
    currentLearningTab = tabName;

    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + 'Content').classList.add('active');

    // Load content based on tab
    switch(tabName) {
        case 'courses':
            if (allLearningResources.length === 0) {
                loadLearningResources();
            }
            break;
        case 'paths':
            loadLearningPaths();
            loadUserLearningPaths();
            loadRecommendedPaths();
            break;
        case 'progress':
            loadUserLearningProgress();
            loadGamificationProfile();
            loadAchievements();
            break;
        case 'skills':
            loadAllSkills();
            loadUserSkillProgress();
            loadSkillCategories();
            setTimeout(() => {
                displaySkillsWithPrerequisites();
            }, 500);
            break;
    }
}

// Load learning resources from API
async function loadLearningResources() {
    try {
        document.getElementById('loadingLearning').style.display = 'block';

        const response = await fetch('/api/learning/resources');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        allLearningResources = await response.json();
        filteredLearningResources = [...allLearningResources];

        displayLearningResources(filteredLearningResources);
        document.getElementById('loadingLearning').style.display = 'none';

    } catch (error) {
        console.error('Error loading learning resources:', error);
        document.getElementById('loadingLearning').innerHTML = `
            <div class="error-message">
                <p>🚀 Learning resources are loading...</p>
                <p>Please wait a moment while we initialize the learning database.</p>
                <button onclick="loadLearningResources()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

// Display learning resources
function displayLearningResources(resources) {
    const learningGrid = document.getElementById('learningGrid');

    if (resources.length === 0) {
        learningGrid.innerHTML = `
            <div class="no-results">
                <h3>🔍 No resources found</h3>
                <p>Try adjusting your filters or search terms.</p>
                <button onclick="clearLearningFilters()" class="btn btn-secondary">Clear Filters</button>
            </div>
        `;
        return;
    }

    learningGrid.innerHTML = resources.map(resource => {
        const rating = '⭐'.repeat(Math.floor(resource.rating));
        const isFree = resource.cost.toLowerCase().includes('free');

        return `
            <div class="learning-card" onclick="showResourceDetails('${resource.id}')">
                <div class="learning-card-header">
                    <div>
                        <h3 class="learning-card-title">${resource.title}</h3>
                        <div class="learning-card-provider">${resource.provider}</div>
                    </div>
                    <div class="learning-card-rating">
                        ${rating} ${resource.rating.toFixed(1)}
                    </div>
                </div>

                <div class="learning-card-meta">
                    <span class="learning-meta-item">
                        📚 ${resource.type}
                    </span>
                    <span class="learning-meta-item">
                        📊 ${resource.difficulty_level}
                    </span>
                    <span class="learning-meta-item">
                        ⏱️ ${resource.duration}
                    </span>
                </div>

                <p class="learning-card-description">${resource.description}</p>

                <div class="learning-card-footer">
                    <span class="learning-card-cost ${isFree ? 'free' : ''}">${resource.cost}</span>
                    <div class="learning-card-actions">
                        <button class="btn btn-secondary btn-sm start-course-btn" data-resource-id="${resource.id}" data-resource-title="${resource.title}">
                            🚀 Start (+25 XP)
                        </button>
                        <a href="${resource.url}" target="_blank" class="learning-card-btn" onclick="event.stopPropagation(); trackResourceClick('${resource.id}')">
                            View Course <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Filter learning resources
function filterLearningResources() {
    trackEvent('learning_filter_change');
    const searchTerm = document.getElementById('learningSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('learningCategoryFilter').value;
    const difficultyFilter = document.getElementById('difficultyFilter').value;
    const costFilter = document.getElementById('costFilter').value;

    filteredLearningResources = allLearningResources.filter(resource => {
        const matchesSearch = !searchTerm || 
            resource.title.toLowerCase().includes(searchTerm) ||
            resource.description.toLowerCase().includes(searchTerm) ||
            resource.provider.toLowerCase().includes(searchTerm) ||
            resource.skill_category.toLowerCase().includes(searchTerm);

        const matchesCategory = !categoryFilter || resource.category === categoryFilter;
        const matchesDifficulty = !difficultyFilter || resource.difficulty_level === difficultyFilter;
        const matchesCost = !costFilter || 
            (costFilter === 'Free' && resource.cost.toLowerCase().includes('free')) ||
            (costFilter === 'Paid' && !resource.cost.toLowerCase().includes('free'));

        return matchesSearch && matchesCategory && matchesDifficulty && matchesCost;
    });

    displayLearningResources(filteredLearningResources);
}

// Clear learning filters
function clearLearningFilters() {
    document.getElementById('learningSearch').value = '';
    document.getElementById('learningCategoryFilter').value = '';
    document.getElementById('difficultyFilter').value = '';
    document.getElementById('costFilter').value = '';

    filteredLearningResources = [...allLearningResources];
    displayLearningResources(filteredLearningResources);
}

// Show resource details modal
function showResourceDetails(resourceId) {
    const resource = allLearningResources.find(r => r.id === resourceId);
    if (!resource) return;

    const modal = document.createElement('div');
    modal.className = 'career-modal'; // Reuse career modal styles

    const prerequisitesList = Array.isArray(resource.prerequisites) && resource.prerequisites.length > 0 ? 
        resource.prerequisites.map(prereq => `<li>${prereq}</li>`).join('') : 
        '<li>No specific prerequisites</li>';

    const outcomesList = Array.isArray(resource.outcomes) && resource.outcomes.length > 0 ? 
        resource.outcomes.map(outcome => `<li>${outcome}</li>`).join('') : 
        '<li>Skills and knowledge as described</li>';

    const careersList = Array.isArray(resource.career_relevance) && resource.career_relevance.length > 0 ? 
        resource.career_relevance.map(career => `<span class="career-tag">${career}</span>`).join('') : 
        '<span class="career-tag">Various careers</span>';

    modal.innerHTML = `
        <div class="career-modal-content">
            <div class="career-modal-header">
                <div class="career-title-section">
                    <div class="career-icon-large">📚</div>
                    <div>
                        <h2>${resource.title}</h2>
                        <div class="career-category-badge">${resource.provider}</div>
                        <div class="growth-badge good">${resource.type} • ${resource.difficulty_level}</div>
                    </div>
                </div>
                <button class="close-modal" onclick="this.closest('.career-modal').remove()">&times;</button>
            </div>

            <div class="career-modal-body">
                <div class="career-overview">
                    <h3>📝 Course Description</h3>
                    <p>${resource.description}</p>
                </div>

                <div class="career-details-grid">
                    <div class="detail-section">
                        <h3>📊 Course Information</h3>
                        <p><strong>Duration:</strong> ${resource.duration}</p>
                        <p><strong>Cost:</strong> ${resource.cost}</p>
                        <p><strong>Rating:</strong> ${'⭐'.repeat(Math.floor(resource.rating))} ${resource.rating.toFixed(1)}/5</p>
                        <p><strong>Difficulty:</strong> ${resource.difficulty_level}</p>
                    </div>

                    <div class="detail-section">
                        <h3>✅ Prerequisites</h3>
                        <ul>${prerequisitesList}</ul>
                    </div>

                    <div class="detail-section">
                        <h3>🎯 Learning Outcomes</h3>
                        <ul>${outcomesList}</ul>
                    </div>

                    <div class="detail-section">
                        <h3>🚀 Relevant Careers</h3>
                        <div class="career-tags">${careersList}</div>
                    </div>
                </div>

                <div class="career-modal-actions">
                    ${authManager && authManager.isAuthenticated() ? `
                        <button class="btn btn-success start-course-btn" data-resource-id="${resource.id}" data-resource-title="${resource.title}" onclick="this.closest('.career-modal').remove();">
                            🚀 Start Course (+25 XP)
                        </button>
                        <button class="btn btn-primary complete-course-btn" data-resource-id="${resource.id}" data-resource-title="${resource.title}" onclick="this.closest('.career-modal').remove();">
                            ✅ Mark Complete (+100 XP)
                        </button>
                    ` : `
                        <button class="btn btn-secondary" onclick="authManager.showLoginModal()">
                            🔒 Sign in to track progress
                        </button>
                    `}
                    <a href="${resource.url}" target="_blank" class="btn btn-outline" onclick="trackResourceClick('${resource.id}')">
                        View Course <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}



// Save resource for later
function saveResource(resourceId) {
    const savedResources = JSON.parse(localStorage.getItem('mindmate_saved_resources') || '[]');
    if (!savedResources.includes(resourceId)) {
        savedResources.push(resourceId);
        localStorage.setItem('mindmate_saved_resources', JSON.stringify(savedResources));
        showNotification('Resource saved for later! 💾', 'success');
    } else {
        showNotification('Resource already saved!', 'info');
    }
}

// Share resource
function shareResource(resourceId) {
    const resource = allLearningResources.find(r => r.id === resourceId);
    if (!resource) return;

    const shareText = `Check out this learning resource: ${resource.title} by ${resource.provider}\n${resource.url}`;

    if (navigator.share) {
        navigator.share({
            title: resource.title,
            text: shareText,
            url: resource.url
        });
    } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Share link copied to clipboard! 📋', 'success');
        });
    }
}

// Load learning paths
async function loadLearningPaths() {
    try {
        // For now, we'll create some sample learning paths
        // In a real implementation, this would fetch from the API
        const samplePaths = [
            {
                id: 'web-dev-beginner',
                career_title: 'Web Developer',
                path_name: 'Complete Web Development Path',
                level: 'Beginner to Advanced',
                description: 'Master full-stack web development from HTML basics to advanced frameworks',
                duration: '6-12 months',
                steps: [
                    'HTML & CSS Fundamentals',
                    'JavaScript Programming',
                    'Frontend Framework (React)',
                    'Backend Development (Node.js)',
                    'Database Management',
                    'Deployment & DevOps'
                ]
            },
            {
                id: 'data-science-path',
                career_title: 'Data Scientist',
                path_name: 'Data Science Mastery',
                level: 'Intermediate',
                description: 'Learn data analysis, machine learning, and statistical modeling',
                duration: '8-15 months',
                steps: [
                    'Python Programming',
                    'Statistics & Probability',
                    'Data Analysis with Pandas',
                    'Data Visualization',
                    'Machine Learning Algorithms',
                    'Deep Learning & AI'
                ]
            },
            {
                id: 'digital-marketing-path',
                career_title: 'Digital Marketing Manager',
                path_name: 'Digital Marketing Excellence',
                level: 'Beginner',
                description: 'Master all aspects of digital marketing from SEO to social media',
                duration: '4-8 months',
                steps: [
                    'Marketing Fundamentals',
                    'SEO & Content Marketing',
                    'Social Media Marketing',
                    'Paid Advertising (PPC)',
                    'Email Marketing',
                    'Analytics & Optimization'
                ]
            }
        ];

        displayLearningPaths(samplePaths);

    } catch (error) {
        console.error('Error loading learning paths:', error);
    }
}

// Display learning paths
function displayLearningPaths(paths) {
    const pathsGrid = document.getElementById('pathsGrid');

    pathsGrid.innerHTML = paths.map(path => {
        const stepsList = Array.isArray(path.steps) ? 
            path.steps.map((step, index) => `
                <div class="path-step">
                    <div class="path-step-number">${index + 1}</div>
                    <div class="path-step-content">${step}</div>
                </div>
            `).join('') : '';

        return `
            <div class="path-card">
                <div class="path-card-header">
                    <h3 class="path-card-title">${path.path_name}</h3>
                    <div class="path-card-subtitle">${path.career_title}</div>
                </div>

                <div class="path-card-meta">
                    <div class="path-meta-item">
                        <span class="path-meta-label">Level</span>
                        <span class="path-meta-value">${path.level}</span>
                    </div>
                    <div class="path-meta-item">
                        <span class="path-meta-label">Duration</span>
                        <span class="path-meta-value">${path.duration}</span>
                    </div>
                </div>

                <p class="path-card-description">${path.description}</p>

                <div class="path-steps">
                    <h4 class="path-steps-title">🗺️ Learning Journey</h4>
                    ${stepsList}
                </div>

                <div class="career-modal-actions">
                    <button onclick="startLearningPath('${path.id}')" class="btn btn-primary">
                        Start This Path 🚀
                    </button>
                    <button onclick="saveLearningPath('${path.id}')" class="btn btn-secondary">
                        Save Path 💾
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Start learning path
function startLearningPath(pathId) {
    showNotification('Learning path started! Check your progress tab to track your journey. 🚀', 'success');
    // In a real app, this would create a learning plan for the user
}

// Save learning path
function saveLearningPath(pathId) {
    const savedPaths = JSON.parse(localStorage.getItem('mindmate_saved_paths') || '[]');
    if (!savedPaths.includes(pathId)) {
        savedPaths.push(pathId);
        localStorage.setItem('mindmate_saved_paths', JSON.stringify(savedPaths));
        showNotification('Learning path saved! 💾', 'success');
    } else {
        showNotification('Path already saved!', 'info');
    }
}

// Dynamic Learning Path Functions
let userLearningPaths = [];
let recommendedPaths = [];

// Load user learning paths
async function loadUserLearningPaths() {
    if (!authManager.isAuthenticated()) {
        displayUserPaths([]);
        return;
    }

    try {
        const response = await fetch('/api/learning-paths/user-paths', {
            headers: authManager.getAuthHeader()
        });

        if (response.ok) {
            userLearningPaths = await response.json();
            displayUserPaths(userLearningPaths);
        }
    } catch (error) {
        console.error('Error loading user paths:', error);
    }
}

// Load recommended paths
async function loadRecommendedPaths() {
    if (!authManager.isAuthenticated()) {
        displayRecommendedPaths([]);
        return;
    }

    try {
        const response = await fetch('/api/learning-paths/recommended', {
            headers: authManager.getAuthHeader()
        });

        if (response.ok) {
            recommendedPaths = await response.json();
            displayRecommendedPaths(recommendedPaths);
        }
    } catch (error) {
        console.error('Error loading recommended paths:', error);
        // Show default paths if user hasn't taken assessment
        const defaultPaths = getDefaultLearningPaths();
        displayRecommendedPaths(defaultPaths);
    }
}

// Display user paths
function displayUserPaths(paths) {
    const pathsContainer = document.getElementById('userPathsContainer');
    if (!pathsContainer) return;

    if (paths.length === 0) {
        pathsContainer.innerHTML = `
            <div class="no-paths-message">
                <div class="no-paths-icon">🎯</div>
                <h4>No Learning Paths Yet</h4>
                <p>Create a personalized learning path based on your career goals!</p>
                <button onclick="showPathCreation()" class="btn btn-primary">Create Your First Path</button>
            </div>
        `;
        return;
    }

    pathsContainer.innerHTML = `
        <div class="learning-paths-grid">
            ${paths.map(path => `
                <div class="learning-path-card">
                    <div class="path-header">
                        <div class="path-category">${path.career_category}</div>
                        <div class="path-difficulty ${path.difficulty_level}">${path.difficulty_level}</div>
                    </div>
                    <h4>${path.name}</h4>
                    <p>${path.description}</p>

                    <div class="path-progress">
                        <div class="progress-info">
                            <span>Progress: ${Math.round(path.progress_percentage)}%</span>
                            <span>Module ${path.current_module_index + 1}/${path.path_structure.length}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${path.progress_percentage}%"></div>
                        </div>
                    </div>

                    <div class="path-info">
                        <div class="path-stat">
                            <span class="stat-icon">⏱️</span>
                            <span>${path.estimated_duration}h total</span>
                        </div>
                        <div class="path-stat">
                            <span class="stat-icon">🎯</span>
                            <span>${path.skills_covered.length} skills</span>
                        </div>
                    </div>

                    <div class="path-actions">
                        <button onclick="viewPathDetails('${path.id}')" class="btn btn-secondary">View Details</button>
                        <button onclick="continuePathLearning('${path.id}')" class="btn btn-primary">
                            ${path.progress_percentage > 0 ? 'Continue' : 'Start'}
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Display recommended paths
function displayRecommendedPaths(paths) {
    const pathsContainer = document.getElementById('recommendedPathsContainer');
    if (!pathsContainer) return;

    if (paths.length === 0) {
        pathsContainer.innerHTML = `
            <div class="no-paths-message">
                <div class="no-paths-icon">🔍</div>
                <h4>Take the Assessment First</h4>
                <p>Complete our career assessment to get personalized learning path recommendations!</p>
                <button onclick="startQuiz()" class="btn btn-primary">Take Assessment</button>
            </div>
        `;
        return;
    }

    pathsContainer.innerHTML = `
        <div class="recommended-paths-grid">
            ${paths.map(path => `
                <div class="recommended-path-card">
                    <div class="path-header">
                        <div class="path-category">${path.career_category}</div>
                        <div class="recommendation-badge">Recommended</div>
                    </div>
                    <h4>${path.name}</h4>
                    <p>${path.description}</p>

                    <div class="path-info">
                        <div class="path-stat">
                            <span class="stat-icon">⏱️</span>
                            <span>${path.estimated_duration}h</span>
                        </div>
                        <div class="path-stat">
                            <span class="stat-icon">📚</span>
                            <span>${path.path_structure.length} modules</span>
                        </div>
                        <div class="path-stat">
                            <span class="stat-icon">🎯</span>
                            <span>${path.skills_covered.slice(0, 2).join(', ')}${path.skills_covered.length > 2 ? '...' : ''}</span>
                        </div>
                    </div>

                    <div class="path-objectives">
                        <h5>Learning Objectives:</h5>
                        <ul>
                            ${path.learning_objectives.slice(0, 3).map(obj => `<li>${obj}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="path-actions">
                        <button onclick="enrollInPath('${path.id}')" class="btn btn-primary">Enroll Now</button>
                        <button onclick="viewPathPreview('${path.id}')" class="btn btn-secondary">Preview</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Show path creation modal
function showPathCreation() {
    if (!authManager.isAuthenticated()) {
        authManager.showLoginModal();
        return;
    }

    // Check if user has completed assessment
    if (!userProfile.assessmentCompleted) {
        showNotification('Complete the career assessment first to get personalized path recommendations!', 'info');
        startQuiz();
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'path-creation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎯 Create Your Learning Path</h3>
                <button class="close-modal" onclick="this.closest('.path-creation-modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p>Based on your assessment results, we can create a personalized learning path for your career goals.</p>

                <div class="career-selection">
                    <h4>Select Career Goal:</h4>
                    <div class="career-options">
                        ${userProfile.topCareers.map(career => `
                            <div class="career-option" onclick="selectCareerGoal('${career}', this)">
                                <span class="career-name">${career.charAt(0).toUpperCase() + career.slice(1)}</span>
                                <span class="career-badge">Top Match</span>
                            </div>
                        `).join('')}

                        <div class="career-option" onclick="showAllCareers()">
                            <span class="career-name">Other Career...</span>
                            <span class="career-icon">➕</span>
                        </div>
                    </div>
                </div>

                <div class="skill-level-selection">
                    <h4>Current Skill Level:</h4>
                    <div class="skill-level-options">
                        <div class="skill-option selected" onclick="selectSkillLevel('beginner', this)">
                            <span class="level-icon">🌱</span>
                            <span>Beginner</span>
                            <small>New to this field</small>
                        </div>
                        <div class="skill-option" onclick="selectSkillLevel('intermediate', this)">
                            <span class="level-icon">🚀</span>
                            <span>Intermediate</span>
                            <small>Some experience</small>
                        </div>
                        <div class="skill-option" onclick="selectSkillLevel('advanced', this)">
                            <span class="level-icon">⭐</span>
                            <span>Advanced</span>
                            <small>Looking to specialize</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="this.closest('.path-creation-modal').remove()" class="btn btn-secondary">Cancel</button>
                <button onclick="generateLearningPath()" class="btn btn-primary" id="generatePathBtn" disabled>Generate Path</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Learning path utility functions
function selectCareerGoal(career, element) {
    // Remove previous selection
    document.querySelectorAll('.career-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');

    // Store selected career
    window.selectedCareerGoal = career;

    // Enable generate button if both career and skill level selected
    updateGenerateButton();
}

function selectSkillLevel(level, element) {
    // Remove previous selection
    document.querySelectorAll('.skill-option').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');

    // Store selected level
    window.selectedSkillLevel = level;

    // Enable generate button if both career and skill level selected
    updateGenerateButton();
}

function updateGenerateButton() {
    const generateBtn = document.getElementById('generatePathBtn');
    if (generateBtn && window.selectedCareerGoal && window.selectedSkillLevel) {
        generateBtn.disabled = false;
    }
}

// Generate learning path
async function generateLearningPath() {
    if (!window.selectedCareerGoal || !window.selectedSkillLevel) {
        showNotification('Please select both a career goal and skill level', 'warning');
        return;
    }

    const generateBtn = document.getElementById('generatePathBtn');
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';

    try {
        const response = await fetch('/api/learning-paths/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authManager.getAuthHeader()
            },
            body: JSON.stringify({
                careerGoal: window.selectedCareerGoal,
                skillLevel: window.selectedSkillLevel
            })
        });

        const result = await response.json();

        if (result.success) {
            // Close modal
            document.querySelector('.path-creation-modal').remove();

            // Show success message
            showNotification(result.message, 'success');

            // Award XP notification
            showXPNotification({
                xpAwarded: 50,
                levelUp: false
            });

            // Reload user paths
            loadUserLearningPaths();

            // Show path details
            setTimeout(() => {
                viewPathDetails(result.pathId);
            }, 1000);
        } else {
            throw new Error(result.error || 'Failed to generate path');
        }
    } catch (error) {
        console.error('Error generating path:', error);
        showNotification('Failed to generate learning path. Please try again.', 'error');
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate Path';
    }
}

// Enroll in recommended path
async function enrollInPath(pathId) {
    if (!authManager.isAuthenticated()) {
        authManager.showLoginModal();
        return;
    }

    try {
        const response = await fetch('/api/learning-paths/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authManager.getAuthHeader()
            },
            body: JSON.stringify({ pathId })
        });

        const result = await response.json();

        if (result.success) {
            showNotification(result.message, 'success');

            // Award XP notification
            showXPNotification({
                xpAwarded: 25,
                levelUp: false
            });

            // Reload user paths and recommended paths
            loadUserLearningPaths();
            loadRecommendedPaths();
        } else {
            throw new Error(result.error || 'Failed to enroll');
        }
    } catch (error) {
        console.error('Error enrolling in path:', error);
        showNotification('Failed to enroll in path. Please try again.', 'error');
    }
}

// Get default learning paths for users without assessment
function getDefaultLearningPaths() {
    return [
        {
            id: 'default-1',
            name: 'Digital Skills Foundation',
            description: 'Essential digital skills for the modern workplace',
            career_category: 'General',
            estimated_duration: 40,
            path_structure: [1, 2, 3, 4],
            skills_covered: ['computer_literacy', 'communication', 'problem_solving'],
            learning_objectives: [
                'Master basic computer skills',
                'Develop digital communication abilities',
                'Build problem-solving confidence'
            ]
        },
        {
            id: 'default-2',
            name: 'Professional Development Basics',
            description: 'Core professional skills for career advancement',
            career_category: 'Business',
            estimated_duration: 35,
            path_structure: [1, 2, 3],
            skills_covered: ['leadership', 'communication', 'time_management'],
            learning_objectives: [
                'Develop leadership qualities',
                'Improve communication skills',
                'Master time management'
            ]
        }
    ];
}

// Skill Prerequisites and Dependency Management
let allSkills = [];
let userSkillProgress = [];
let skillCategories = [];

// Load all skills with prerequisites
async function loadAllSkills() {
    try {
        const response = await fetch('/api/skills/all');
        if (response.ok) {
            allSkills = await response.json();
            return allSkills;
        }
    } catch (error) {
        console.error('Error loading skills:', error);
    }
    return [];
}

// Load user skill progress
async function loadUserSkillProgress() {
    if (!authManager.isAuthenticated()) {
        userSkillProgress = [];
        return [];
    }

    try {
        const response = await fetch('/api/skills/user/progress', {
            headers: authManager.getAuthHeader()
        });

        if (response.ok) {
            userSkillProgress = await response.json();
            return userSkillProgress;
        }
    } catch (error) {
        console.error('Error loading user skill progress:', error);
    }
    return [];
}

// Load skill categories
async function loadSkillCategories() {
    try {
        const response = await fetch('/api/skills/categories');
        if (response.ok) {
            skillCategories = await response.json();
            return skillCategories;
        }
    } catch (error) {
        console.error('Error loading skill categories:', error);
    }
    return [];
}

// Update user skill progress
async function updateSkillProgress(skillId, progressData) {
    if (!authManager.isAuthenticated()) {
        authManager.showLoginModal();
        return;
    }

    try {
        const response = await fetch('/api/skills/user/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authManager.getAuthHeader()
            },
            body: JSON.stringify({
                skillId,
                ...progressData
            })
        });

        const result = await response.json();

        if (result.success) {
            showNotification(result.message, 'success');

            // Award XP notification
            if (progressData.current_level > 0) {
                showXPNotification({
                    xpAwarded: progressData.current_level * 10,
                    levelUp: false
                });
            }

            // Reload user progress
            await loadUserSkillProgress();

            return true;
        } else {
            throw new Error(result.error || 'Failed to update progress');
        }
    } catch (error) {
        console.error('Error updating skill progress:', error);
        showNotification('Failed to update skill progress', 'error');
        return false;
    }
}

// Get optimal learning sequence
async function getOptimalLearningSequence(targetSkills) {
    if (!authManager.isAuthenticated()) {
        authManager.showLoginModal();
        return null;
    }

    try {
        const response = await fetch('/api/skills/learning-sequence', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authManager.getAuthHeader()
            },
            body: JSON.stringify({ targetSkills })
        });

        const result = await response.json();

        if (result.success) {
            return result;
        } else {
            throw new Error(result.error || 'Failed to generate sequence');
        }
    } catch (error) {
        console.error('Error getting learning sequence:', error);
        showNotification('Failed to generate learning sequence', 'error');
        return null;
    }
}

// Display skills with prerequisites
function displaySkillsWithPrerequisites() {
    const skillsContainer = document.getElementById('skillsPrerequisitesContainer');
    if (!skillsContainer) return;

    if (allSkills.length === 0) {
        skillsContainer.innerHTML = `
            <div class="no-skills-message">
                <div class="no-skills-icon">🎯</div>
                <h4>Loading Skills...</h4>
                <p>Fetching skill prerequisites and dependencies</p>
            </div>
        `;
        return;
    }

    // Group skills by category
    const groupedSkills = skillCategories.reduce((acc, category) => {
        acc[category.name] = category.skills;
        return acc;
    }, {});

    skillsContainer.innerHTML = `
        <div class="skills-overview">
            <h3>🎯 Skill Prerequisites & Dependencies</h3>
            <p>Understand skill relationships and plan your learning journey</p>
        </div>

        <div class="skill-categories">
            ${Object.entries(groupedSkills).map(([categoryName, skills]) => `
                <div class="skill-category-section">
                    <h4 class="category-header">
                        <span class="category-name">${categoryName}</span>
                        <span class="category-count">${skills.length} skills</span>
                    </h4>

                    <div class="skills-grid">
                        ${skills.map(skill => {
                            const userProgress = userSkillProgress.find(p => p.skill_id === skill.id);
                            const currentLevel = userProgress?.current_level || 0;
                            const confidence = userProgress?.confidence_score || 0;

                            return `
                                <div class="skill-card" onclick="showSkillDetails('${skill.id}')">
                                    <div class="skill-header">
                                        <div class="skill-icon" style="background-color: ${skill.color}">
                                            ${skill.icon}
                                        </div>
                                        <div class="skill-info">
                                            <h5>${skill.name}</h5>
                                            <div class="skill-meta">
                                                <span class="difficulty">Level ${skill.difficulty_level}</span>
                                                <span class="duration">${skill.estimated_hours}h</span>
                                            </div>
                                        </div>
                                    </div>

                                    <p class="skill-description">${skill.description}</p>

                                    ${skill.prerequisites.length > 0 ? `
                                        <div class="prerequisites">
                                            <div class="prereq-header">Prerequisites:</div>
                                            <div class="prereq-list">
                                                ${skill.prerequisites.map(prereq => `
                                                    <span class="prereq-badge ${prereq.is_hard_requirement ? 'required' : 'recommended'}">
                                                        ${prereq.name} (Lv.${prereq.required_level})
                                                    </span>
                                                `).join('')}
                                            </div>
                                        </div>
                                    ` : '<div class="no-prerequisites">No prerequisites</div>'}

                                    <div class="skill-progress">
                                        <div class="progress-info">
                                            <span>Your Level: ${currentLevel}/${skill.difficulty_level}</span>
                                            <span>Confidence: ${Math.round(confidence * 100)}%</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${(currentLevel / skill.difficulty_level) * 100}%"></div>
                                        </div>
                                    </div>

                                    <div class="skill-actions">
                                        <button onclick="event.stopPropagation(); updateSkillModal('${skill.id}')" class="btn btn-sm btn-secondary">Update Progress</button>
                                        ${currentLevel < skill.difficulty_level ? `
                                            <button onclick="event.stopPropagation(); startSkillLearning('${skill.id}')" class="btn btn-sm btn-primary">Start Learning</button>
                                        ` : `
                                            <span class="skill-completed">✓ Completed</span>
                                        `}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Show skill details modal
function showSkillDetails(skillId) {
    const skill = allSkills.find(s => s.id === skillId);
    if (!skill) return;

    const userProgress = userSkillProgress.find(p => p.skill_id === skillId);

    const modal = document.createElement('div');
    modal.className = 'skill-details-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="skill-title">
                    <div class="skill-icon" style="background-color: ${skill.color}">${skill.icon}</div>
                    <div>
                        <h3>${skill.name}</h3>
                        <p class="skill-category">${skill.category} • Level ${skill.difficulty_level} • ${skill.estimated_hours} hours</p>
                    </div>
                </div>
                <button class="close-modal" onclick="this.closest('.skill-details-modal').remove()">&times;</button>
            </div>

            <div class="modal-body">
                <div class="skill-description">
                    <h4>Description</h4>
                    <p>${skill.description}</p>
                </div>

                ${skill.prerequisites.length > 0 ? `
                    <div class="skill-prerequisites">
                        <h4>Prerequisites</h4>
                        <div class="prerequisites-list">
                            ${skill.prerequisites.map(prereq => {
                                const userPrereqProgress = userSkillProgress.find(p => p.skill_id === prereq.id);
                                const metRequirement = (userPrereqProgress?.current_level || 0) >= prereq.required_level;

                                return `
                                    <div class="prerequisite-item ${metRequirement ? 'met' : 'unmet'}">
                                        <div class="prereq-info">
                                            <span class="prereq-name">${prereq.name}</span>
                                            <span class="prereq-level">Level ${prereq.required_level} required</span>
                                            <span class="prereq-type">${prereq.is_hard_requirement ? 'Required' : 'Recommended'}</span>
                                        </div>
                                        <div class="prereq-status">
                                            ${metRequirement ? '✓ Met' : '⚠ Not Met'}
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="skill-progress-detail">
                    <h4>Your Progress</h4>
                    <div class="progress-stats">
                        <div class="stat">
                            <span class="stat-label">Current Level:</span>
                            <span class="stat-value">${userProgress?.current_level || 0}/${skill.difficulty_level}</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Confidence:</span>
                            <span class="stat-value">${Math.round((userProgress?.confidence_score || 0) * 100)}%</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Time Spent:</span>
                            <span class="stat-value">${userProgress?.total_hours_spent || 0} hours</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button onclick="this.closest('.skill-details-modal').remove()" class="btn btn-secondary">Close</button>
                <button onclick="updateSkillModal('${skillId}')" class="btn btn-primary">Update Progress</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Show update skill progress modal
function updateSkillModal(skillId) {
    const skill = allSkills.find(s => s.id === skillId);
    if (!skill) return;

    const userProgress = userSkillProgress.find(p => p.skill_id === skillId);
    const currentLevel = userProgress?.current_level || 0;
    const currentConfidence = userProgress?.confidence_score || 0;

    const modal = document.createElement('div');
    modal.className = 'update-skill-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Update ${skill.name} Progress</h3>
                <button class="close-modal" onclick="this.closest('.update-skill-modal').remove()">&times;</button>
            </div>

            <div class="modal-body">
                <div class="skill-level-update">
                    <label>Skill Level (0-${skill.difficulty_level}):</label>
                    <input type="range" id="skillLevelSlider" min="0" max="${skill.difficulty_level}" value="${currentLevel}" 
                           oninput="updateSkillLevelDisplay(this.value)">
                    <div class="level-display">
                        <span>Level: </span>
                        <span id="skillLevelDisplay">${currentLevel}</span>
                        <span>/${skill.difficulty_level}</span>
                    </div>
                </div>

                <div class="confidence-update">
                    <label>Confidence Level (0-100%):</label>
                    <input type="range" id="confidenceSlider" min="0" max="100" value="${currentConfidence * 100}" 
                           oninput="updateConfidenceDisplay(this.value)">
                    <div class="confidence-display">
                        <span>Confidence: </span>
                        <span id="confidenceDisplay">${Math.round(currentConfidence * 100)}</span>
                        <span>%</span>
                    </div>
                </div>

                <div class="hours-update">
                    <label>Hours spent learning this skill:</label>
                    <input type="number" id="hoursInput" min="0" max="100" value="1" step="0.5">
                </div>
            </div>

            <div class="modal-footer">
                <button onclick="this.closest('.update-skill-modal').remove()" class="btn btn-secondary">Cancel</button>
                <button onclick="saveSkillProgress('${skillId}')" class="btn btn-primary">Save Progress</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Helper functions for skill modals
function updateSkillLevelDisplay(value) {
    document.getElementById('skillLevelDisplay').textContent = value;
}

function updateConfidenceDisplay(value) {
    document.getElementById('confidenceDisplay').textContent = value;
}

// Save skill progress
async function saveSkillProgress(skillId) {
    const level = parseInt(document.getElementById('skillLevelSlider').value);
    const confidence = parseFloat(document.getElementById('confidenceSlider').value) / 100;
    const hours = parseFloat(document.getElementById('hoursInput').value) || 0;

    const success = await updateSkillProgress(skillId, {
        current_level: level,
        confidence_score: confidence,
        hours_spent: hours
    });

    if (success) {
        document.querySelector('.update-skill-modal').remove();

        // Refresh skill display
        displaySkillsWithPrerequisites();
    }
}

// Start skill learning
function startSkillLearning(skillId) {
    const skill = allSkills.find(s => s.id === skillId);
    if (!skill) return;

    // Check prerequisites
    const unmetPrerequisites = skill.prerequisites.filter(prereq => {
        const userProgress = userSkillProgress.find(p => p.skill_id === prereq.id);
        return (userProgress?.current_level || 0) < prereq.required_level;
    });

    if (unmetPrerequisites.length > 0 && unmetPrerequisites.some(p => p.is_hard_requirement)) {
        showNotification(
            `You need to complete these prerequisites first: ${unmetPrerequisites.map(p => p.name).join(', ')}`, 
            'warning'
        );
        return;
    }

    // Navigate to learning resources
    showNotification(`Starting ${skill.name} learning journey!`, 'success');

    // Switch to courses tab and filter by skill
    showLearningTab('courses');
    // You could implement filtering here
}

// Enhanced Career Predictions
let enhancedPredictions = null;

// Load enhanced career predictions
async function loadEnhancedCareerPredictions() {
    if (!authManager.isAuthenticated()) {
        displayPredictionsAuthRequired();
        return;
    }

    try {
        const response = await fetch('/api/analytics/enhanced-predictions', {
            headers: authManager.getAuthHeader()
        });

        if (response.ok) {
            const result = await response.json();

            if (result.success) {
                enhancedPredictions = result;
                displayEnhancedPredictions(result);
            } else {
                displayPredictionsError(result.error);
            }
        } else {
            throw new Error('Failed to fetch predictions');
        }
    } catch (error) {
        console.error('Error loading enhanced predictions:', error);
        displayPredictionsError('Failed to load career predictions');
    }
}

// Display enhanced predictions
function displayEnhancedPredictions(predictionsData) {
    const container = document.getElementById('predictionsGrid');
    if (!container) return;

    container.style.display = 'block';

    container.innerHTML = `
        <div class="predictions-overview">
            <div class="analysis-summary">
                <h4>📊 Career Success Analysis</h4>
                <p>${predictionsData.overallAnalysis}</p>
                <div class="prediction-meta">
                    <span>Generated: ${new Date(predictionsData.generatedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Based on ${predictionsData.predictions.length} career matches</span>
                </div>
            </div>
        </div>

        <div class="predictions-list">
            ${predictionsData.predictions.map((prediction, index) => `
                <div class="prediction-card ${index === 0 ? 'top-match' : ''}" onclick="showCareerInsightModal('${prediction.careerId}')">
                    <div class="prediction-header">
                        <div class="career-info">
                            <h5>${prediction.career}</h5>
                            <div class="confidence-badge ${prediction.confidenceLevel.toLowerCase().replace(' ', '-')}">
                                ${prediction.confidenceLevel} Confidence
                            </div>
                        </div>
                        <div class="success-probability">
                            <div class="probability-circle" data-percentage="${prediction.successProbability}">
                                <span class="percentage">${prediction.successProbability}%</span>
                                <span class="label">Success Rate</span>
                            </div>
                        </div>
                    </div>

                    <div class="prediction-factors">
                        <h6>Key Factors Analysis:</h6>
                        <div class="factors-grid">
                            <div class="factor">
                                <span class="factor-name">Assessment Fit</span>
                                <div class="factor-bar">
                                    <div class="factor-fill" style="width: ${prediction.factors.assessmentAlignment}%"></div>
                                </div>
                                <span class="factor-value">${prediction.factors.assessmentAlignment}%</span>
                            </div>
                            <div class="factor">
                                <span class="factor-name">Skill Readiness</span>
                                <div class="factor-bar">
                                    <div class="factor-fill" style="width: ${prediction.factors.skillReadiness}%"></div>
                                </div>
                                <span class="factor-value">${prediction.factors.skillReadiness}%</span>
                            </div>
                            <div class="factor">
                                <span class="factor-name">Learning Momentum</span>
                                <div class="factor-bar">
                                    <div class="factor-fill" style="width: ${prediction.factors.learningMomentum}%"></div>
                                </div>
                                <span class="factor-value">${prediction.factors.learningMomentum}%</span>
                            </div>
                            <div class="factor">
                                <span class="factor-name">Market Demand</span>
                                <div class="factor-bar">
                                    <div class="factor-fill" style="width: ${prediction.factors.marketDemand}%"></div>
                                </div>
                                <span class="factor-value">${prediction.factors.marketDemand}%</span>
                            </div>
                        </div>
                    </div>

                    <div class="prediction-insights">
                        <h6>Key Insights:</h6>
                        <ul>
                            ${prediction.insights.map(insight => `<li>${insight}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="prediction-quick-stats">
                        <div class="quick-stat">
                            <span class="stat-icon">⏱️</span>
                            <span class="stat-text">${prediction.timeToReadiness} months to readiness</span>
                        </div>
                        <div class="quick-stat">
                            <span class="stat-icon">💰</span>
                            <span class="stat-text">$${prediction.salaryProjection.entry.toLocaleString()} - $${prediction.salaryProjection.senior.toLocaleString()}</span>
                        </div>
                        <div class="quick-stat">
                            <span class="stat-icon">📈</span>
                            <span class="stat-text">${prediction.growthPotential}</span>
                        </div>
                    </div>

                    <div class="prediction-actions">
                        <button onclick="event.stopPropagation(); generateLearningPlan('${prediction.careerId}')" class="btn btn-sm btn-primary">
                            📚 Create Learning Plan
                        </button>
                        <button onclick="event.stopPropagation(); showCareerInsightModal('${prediction.careerId}')" class="btn btn-sm btn-secondary">
                            🔍 View Details
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="prediction-methodology">
            <div class="methodology-header">
                <h5>📋 Prediction Methodology</h5>
                <p>Our enhanced algorithm uses weighted factors to provide accurate career success predictions:</p>
            </div>
            <div class="factors-weights">
                ${Object.entries(predictionsData.factorWeights).map(([factor, weight]) => `
                    <div class="weight-item">
                        <span class="weight-name">${factor.replace('_', ' ').toUpperCase()}</span>
                        <span class="weight-value">${Math.round(weight * 100)}%</span>
                        <div class="weight-bar">
                            <div class="weight-fill" style="width: ${weight * 100}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Initialize circular progress indicators
    setTimeout(() => {
        initializeCircularProgress();
    }, 100);
}

// Initialize circular progress indicators
function initializeCircularProgress() {
    document.querySelectorAll('.probability-circle').forEach(circle => {
        const percentage = circle.dataset.percentage;
        circle.style.background = `conic-gradient(
            var(--primary-color) ${percentage * 3.6}deg,
            #e0e0e0 ${percentage * 3.6}deg
        )`;
    });
}

// Show career insight modal
function showCareerInsightModal(careerId) {
    const prediction = enhancedPredictions?.predictions.find(p => p.careerId === careerId);
    if (!prediction) return;

    const modal = document.createElement('div');
    modal.className = 'career-insight-modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <div class="career-title">
                    <h3>${prediction.career} - Career Insights</h3>
                    <div class="confidence-indicator ${prediction.confidenceLevel.toLowerCase().replace(' ', '-')}">
                        ${prediction.successProbability}% Success Probability (${prediction.confidenceLevel})
                    </div>
                </div>
                <button class="close-modal" onclick="this.closest('.career-insight-modal').remove()">&times;</button>
            </div>

            <div class="modal-body">
                <div class="insight-sections">
                    <div class="insight-section">
                        <h4>📊 Detailed Factor Analysis</h4>
                        <div class="detailed-factors">
                            ${Object.entries(prediction.factors).map(([factor, value]) => `
                                <div class="detailed-factor">
                                    <div class="factor-header">
                                        <span class="factor-name">${factor.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                                        <span class="factor-score">${value}%</span>
                                    </div>
                                    <div class="factor-progress">
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${value}%"></div>
                                        </div>
                                    </div>
                                    <div class="factor-explanation">
                                        ${getFactorExplanation(factor, value)}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="insight-section">
                        <h4>💡 Recommendations</h4>
                        <div class="recommendations-list">
                            ${prediction.recommendations.map(rec => `
                                <div class="recommendation-item">
                                    <span class="rec-icon">✨</span>
                                    <span class="rec-text">${rec}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="insight-section">
                        <h4>💰 Career Outlook</h4>
                        <div class="career-outlook">
                            <div class="outlook-item">
                                <span class="outlook-label">Entry Level Salary:</span>
                                <span class="outlook-value">$${prediction.salaryProjection.entry.toLocaleString()}</span>
                            </div>
                            <div class="outlook-item">
                                <span class="outlook-label">Mid-Level Salary:</span>
                                <span class="outlook-value">$${prediction.salaryProjection.mid.toLocaleString()}</span>
                            </div>
                            <div class="outlook-item">
                                <span class="outlook-label">Senior Level Salary:</span>
                                <span class="outlook-value">$${prediction.salaryProjection.senior.toLocaleString()}</span>
                            </div>
                            <div class="outlook-item">
                                <span class="outlook-label">Growth Potential:</span>
                                <span class="outlook-value">${prediction.growthPotential}</span>
                            </div>
                            <div class="outlook-item">
                                <span class="outlook-label">Time to Readiness:</span>
                                <span class="outlook-value">${prediction.timeToReadiness} months</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button onclick="this.closest('.career-insight-modal').remove()" class="btn btn-secondary">Close</button>
                <button onclick="generateLearningPlan('${careerId}')" class="btn btn-primary">Create Learning Plan</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Get factor explanation
function getFactorExplanation(factor, value) {
    const explanations = {
        assessmentAlignment: {
            high: 'Strong personality and interest alignment with this career path.',
            medium: 'Good alignment with some areas for growth.',
            low: 'Consider exploring if this career truly matches your interests.'
        },
        skillReadiness: {
            high: 'You have most of the required skills for this career.',
            medium: 'Some skill development needed to reach full readiness.',
            low: 'Significant skill building required before pursuing this path.'
        },
        learningMomentum: {
            high: 'Excellent learning activity and engagement levels.',
            medium: 'Good learning progress with room for improvement.',
            low: 'Increase learning activities to improve career readiness.'
        },
        marketDemand: {
            high: 'Very strong job market with excellent opportunities.',
            medium: 'Steady market demand with good job prospects.',
            low: 'Limited market demand - consider specialization.'
        },
        experienceMatch: {
            high: 'Your background strongly aligns with this career.',
            medium: 'Some relevant experience with areas to develop.',
            low: 'Limited relevant experience - focus on building background.'
        }
    };

    const level = value >= 70 ? 'high' : value >= 40 ? 'medium' : 'low';
    return explanations[factor]?.[level] || 'Analysis based on your assessment and activity data.';
}

// Generate learning plan for career
function generateLearningPlan(careerId) {
    // This would integrate with the learning paths system
    showNotification('Creating personalized learning plan...', 'info');

    // Navigate to learning paths and create path for this career
    showSection('learning-section');
    showLearningTab('paths');

    // Trigger path creation with the specific career
    setTimeout(() => {
        window.selectedCareerGoal = careerId;
        showPathCreation();
    }, 1000);
}

// Peer Comparison Functions
let peerComparisonData = null;

// Load peer comparison data
async function loadPeerComparison() {
    if (!authManager.isAuthenticated()) {
        displayPeerComparisonAuthRequired();
        return;
    }

    try {
        showPeerComparisonLoading();

        const response = await fetch('/api/analytics/peer-comparison', {
            headers: authManager.getAuthHeader()
        });

        if (response.ok) {
            const result = await response.json();

            if (result.success) {
                peerComparisonData = result;
                displayPeerComparison(result);
            } else {
                displayPeerComparisonError(result.error);
            }
        } else {
            throw new Error('Failed to fetch peer comparison');
        }
    } catch (error) {
        console.error('Error loading peer comparison:', error);
        displayPeerComparisonError('Failed to load peer comparison data');
    }
}

// Show loading state for peer comparison
function showPeerComparisonLoading() {
    const container = document.getElementById('peerComparisonGrid');
    if (!container) return;

    container.style.display = 'block';
    container.innerHTML = `
        <div class="peer-comparison-loading">
            <div class="loading-spinner"></div>
            <h4>🔄 Analyzing Your Performance</h4>
            <p>Comparing your progress with peers in your field...</p>
            <div class="analysis-steps">
                <div class="step-item active">
                    <span class="step-icon">📈</span>
                    <span>Gathering performance data</span>
                </div>
                <div class="step-item">
                    <span class="step-icon">👥</span>
                    <span>Finding similar peers</span>
                </div>
                <div class="step-item">
                    <span class="step-icon">📊</span>
                    <span>Calculating benchmarks</span>
                </div>
                <div class="step-item">
                    <span class="step-icon">🎯</span>
                    <span>Generating insights</span>
                </div>
            </div>
        </div>
    `;

    // Animate loading steps
    let currentStep = 0;
    const steps = container.querySelectorAll('.step-item');
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            currentStep++;
        } else {
            clearInterval(interval);
        }
    }, 800);
}

// Display peer comparison results
function displayPeerComparison(data) {
    const container = document.getElementById('peerComparisonGrid');
    if (!container) return;

    container.style.display = 'block';

    container.innerHTML = `
        <div class="peer-comparison-overview">
            <div class="comparison-summary">
                <h4>📈 Your Performance Overview</h4>
                <p>Compared to ${data.comparisonData.totalPeers} peers in ${data.comparisonData.careerCategory}</p>
                <div class="comparison-meta">
                    <span>Updated: ${new Date(data.comparisonData.lastUpdated).toLocaleDateString()}</span>
                </div>
            </div>
        </div>

        <div class="percentile-rankings">
            <h5>🏆 Percentile Rankings</h5>
            <div class="rankings-grid">
                ${Object.entries(data.percentileRankings).map(([metric, percentile]) => `
                    <div class="ranking-card">
                        <div class="ranking-header">
                            <h6>${formatMetricName(metric)}</h6>
                            <div class="percentile-badge ${getPercentileBadgeClass(percentile)}">
                                ${percentile}%
                            </div>
                        </div>
                        <div class="ranking-bar">
                            <div class="ranking-fill" style="width: ${percentile}%"></div>
                        </div>
                        <div class="ranking-description">
                            ${getPercentileDescription(percentile)}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="peer-insights">
            <h5>💡 Key Insights</h5>
            <div class="insights-list">
                ${data.insights.map(insight => `
                    <div class="insight-item">
                        <span class="insight-icon">📈</span>
                        <span class="insight-text">${insight}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="improvement-recommendations">
            <h5>🎯 Improvement Recommendations</h5>
            <div class="recommendations-grid">
                ${data.recommendations.map(rec => `
                    <div class="recommendation-card">
                        <div class="rec-header">
                            <h6>${rec.area}</h6>
                            <span class="rec-target">${rec.target}</span>
                        </div>
                        <div class="rec-action">
                            <strong>Action:</strong> ${rec.action}
                        </div>
                        <div class="rec-impact">
                            <strong>Impact:</strong> ${rec.impact}
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="implementRecommendation('${rec.area}')">
                            Start Improving
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="peer-metrics-details">
            <h5>📊 Detailed Metrics Comparison</h5>
            <div class="metrics-comparison">
                ${generateMetricsComparison(data.userMetrics, data.peerMetrics)}
            </div>
        </div>

        <div class="benchmark-actions">
            <h5>🚀 Take Action</h5>
            <div class="action-buttons">
                <button class="btn btn-primary" onclick="showIndustryBenchmarks('${data.userMetrics.careerCategory}')">
                    🏢 View Industry Benchmarks
                </button>
                <button class="btn btn-secondary" onclick="generateImprovementPlan()">
                    📋 Create Improvement Plan
                </button>
                <button class="btn btn-secondary" onclick="findSimilarPeers()">
                    👥 Connect with Similar Peers
                </button>
            </div>
        </div>
    `;

    // Animate the ranking bars
    setTimeout(() => {
        animateRankingBars();
    }, 100);
}

// Helper functions for peer comparison
function formatMetricName(metric) {
    const names = {
        'totalXP': 'Total Experience Points',
        'currentLevel': 'Current Level',
        'currentStreak': 'Learning Streak',
        'completedCourses': 'Completed Courses',
        'avgSkillLevel': 'Average Skill Level'
    };
    return names[metric] || metric;
}

function getPercentileBadgeClass(percentile) {
    if (percentile >= 80) return 'excellent';
    if (percentile >= 60) return 'good';
    if (percentile >= 40) return 'average';
    if (percentile >= 20) return 'below-average';
    return 'needs-improvement';
}

function getPercentileDescription(percentile) {
    if (percentile >= 90) return 'Top 10% - Outstanding performance!';
    if (percentile >= 75) return 'Top 25% - Excellent performance!';
    if (percentile >= 50) return 'Above average - Good progress!';
    if (percentile >= 25) return 'Below average - Room for improvement';
    return 'Bottom 25% - Focus needed';
}

function generateMetricsComparison(userMetrics, peerMetrics) {
    const metrics = [
        { key: 'totalXP', user: userMetrics.totalXP, peer: peerMetrics.totalXP.avg, label: 'Total XP' },
        { key: 'currentLevel', user: userMetrics.currentLevel, peer: peerMetrics.currentLevel.avg, label: 'Current Level' },
        { key: 'currentStreak', user: userMetrics.currentStreak, peer: peerMetrics.currentStreak.avg, label: 'Learning Streak' },
        { key: 'completedCourses', user: userMetrics.completedCourses, peer: peerMetrics.coursesCompleted.avg, label: 'Completed Courses' },
        { key: 'avgSkillLevel', user: userMetrics.avgSkillLevel, peer: peerMetrics.avgSkillLevel.avg, label: 'Avg Skill Level' }
    ];

    return metrics.map(metric => `
        <div class="metric-comparison">
            <div class="metric-label">${metric.label}</div>
            <div class="metric-bars">
                <div class="metric-bar user">
                    <span class="bar-label">You</span>
                    <div class="bar">
                        <div class="bar-fill" style="width: ${Math.min(100, (metric.user / Math.max(metric.user, metric.peer)) * 100)}%"></div>
                    </div>
                    <span class="bar-value">${Math.round(metric.user * 10) / 10}</span>
                </div>
                <div class="metric-bar peer">
                    <span class="bar-label">Peer Avg</span>
                    <div class="bar">
                        <div class="bar-fill" style="width: ${Math.min(100, (metric.peer / Math.max(metric.user, metric.peer)) * 100)}%"></div>
                    </div>
                    <span class="bar-value">${Math.round(metric.peer * 10) / 10}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function animateRankingBars() {
    document.querySelectorAll('.ranking-fill').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Action functions
function implementRecommendation(area) {
    showNotification(`Starting improvement plan for ${area}!`, 'success');

    // Navigate to relevant section based on area
    switch (area.toLowerCase()) {
        case 'experience points':
        case 'learning consistency':
            showSection('learning-section');
            break;
        case 'course completion':
            showSection('learning-section');
            showLearningTab('courses');
            break;
        case 'skill development':
            showSection('learning-section');
            showLearningTab('skills');
            break;
        default:
            showSection('learning-section');
    }
}

function generateImprovementPlan() {
    if (!peerComparisonData) return;

    showNotification('Generating personalized improvement plan...', 'info');

    // Create improvement plan modal
    const modal = document.createElement('div');
    modal.className = 'improvement-plan-modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>📋 Personal Improvement Plan</h3>
                <button class="close-modal" onclick="this.closest('.improvement-plan-modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="plan-summary">
                    <h4>30-Day Improvement Focus</h4>
                    <p>Based on your peer comparison analysis, here's your personalized action plan:</p>
                </div>

                <div class="improvement-timeline">
                    ${peerComparisonData.recommendations.map((rec, index) => `
                        <div class="timeline-item">
                            <div class="timeline-date">Week ${index + 1}</div>
                            <div class="timeline-content">
                                <h5>${rec.area}</h5>
                                <p><strong>Goal:</strong> ${rec.target}</p>
                                <p><strong>Action:</strong> ${rec.action}</p>
                                <div class="timeline-actions">
                                    <button class="btn btn-primary btn-sm" onclick="implementRecommendation('${rec.area}')">
                                        Start Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="this.closest('.improvement-plan-modal').remove()" class="btn btn-secondary">Close</button>
                <button onclick="saveImprovementPlan()" class="btn btn-primary">Save Plan</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function saveImprovementPlan() {
    showNotification('Improvement plan saved to your profile!', 'success');
    document.querySelector('.improvement-plan-modal')?.remove();
}

function findSimilarPeers() {
    showNotification('Connecting you with similar peers...', 'info');
    showSection('community-section');
    showCommunityTab('networking');
}

// Show industry benchmarks
async function showIndustryBenchmarks(category) {
    try {
        const response = await fetch(`/api/analytics/industry-benchmarks/${category}`);

        if (response.ok) {
            const data = await response.json();
            displayIndustryBenchmarks(data);
        } else {
            throw new Error('Failed to fetch industry benchmarks');
        }
    } catch (error) {
        console.error('Error loading industry benchmarks:', error);
        showNotification('Failed to load industry benchmarks', 'error');
    }
}

function displayIndustryBenchmarks(data) {
    const modal = document.createElement('div');
    modal.className = 'industry-benchmarks-modal';
    modal.innerHTML = `
        <div class="modal-content large">
            <div class="modal-header">
                <h3>🏢 ${data.category.toUpperCase()} Industry Benchmarks</h3>
                <button class="close-modal" onclick="this.closest('.industry-benchmarks-modal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="benchmarks-overview">
                    <div class="benchmark-section">
                        <h4>💰 Salary Ranges</h4>
                        <div class="salary-ranges">
                            <div class="salary-level">
                                <span class="level-label">Entry Level:</span>
                                <span class="level-value">$${data.benchmarks.avgSalary.entry.toLocaleString()}</span>
                            </div>
                            <div class="salary-level">
                                <span class="level-label">Mid Level:</span>
                                <span class="level-value">$${data.benchmarks.avgSalary.mid.toLocaleString()}</span>
                            </div>
                            <div class="salary-level">
                                <span class="level-label">Senior Level:</span>
                                <span class="level-value">$${data.benchmarks.avgSalary.senior.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div class="benchmark-section">
                        <h4>📈 Job Market Growth</h4>
                        <p class="growth-rate">${data.benchmarks.jobGrowth}</p>
                    </div>

                    <div class="benchmark-section">
                        <h4>🎓 Top Skills</h4>
                        <div class="skills-list">
                            ${data.benchmarks.popularSkills.map(skill => `
                                <span class="skill-tag">${skill}</span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="benchmark-section">
                        <h4>🏅 Recommended Certifications</h4>
                        <div class="certifications-list">
                            ${data.benchmarks.certifications.map(cert => `
                                <div class="certification-item">${cert}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button onclick="this.closest('.industry-benchmarks-modal').remove()" class="btn btn-secondary">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Display auth required message
function displayPeerComparisonAuthRequired() {
    const container = document.getElementById('peerComparisonContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="auth-required-message">
            <div class="empty-state">
                <div class="empty-icon">🔐</div>
                <h4>Sign in for Peer Comparison</h4>
                <p>Complete your career assessment and sign in to see how you compare to peers in your field.</p>
                <div class="empty-actions">
                    <button onclick="typeof authManager !== 'undefined' ? authManager.showLoginModal() : showNotification('Authentication not available', 'error')" class="btn btn-primary">Sign In</button>
                    <button onclick="showSection('quiz-section')" class="btn btn-secondary">Take Assessment</button>
                </div>
            </div>
        </div>
    `;
}

// Display error message
function displayPeerComparisonError(errorMessage) {
    const container = document.getElementById('peerComparisonContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="peer-comparison-error">
            <div class="error-icon">⚠️</div>
            <h4>Unable to Load Comparison Data</h4>
            <p>${errorMessage}</p>
            <div class="error-actions">
                <button onclick="loadPeerComparison()" class="btn btn-primary">Retry</button>
            </div>
        </div>
    `;
}

// Display auth required message
function displayPredictionsAuthRequired() {
    const container = document.getElementById('predictionsContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="auth-required-message">
            <div class="empty-state">
                <div class="empty-icon">🔐</div>
                <h4>Sign in for Personalized Predictions</h4>
                <p>Complete your career assessment and sign in to get detailed success predictions for your career path.</p>
                <div class="empty-actions">
                    <button onclick="typeof authManager !== 'undefined' ? authManager.showLoginModal() : showNotification('Authentication not available', 'error')" class="btn btn-primary">Sign In</button>
                    <button onclick="showSection('quiz-section')" class="btn btn-secondary">Take Assessment</button>
                </div>
            </div>
        </div>
    `;
}

// Display error message
function displayPredictionsError(errorMessage) {
    const container = document.getElementById('predictionsGrid');
    if (!container) return;

    container.innerHTML = `
        <div class="predictions-error">
            <div class="error-icon">⚠️</div>
            <h4>Unable to Generate Predictions</h4>
            <p>${errorMessage}</p>
            <div class="error-actions">
                <button onclick="showSection('quiz-section')" class="btn btn-primary">Take Assessment</button>
                <button onclick="loadEnhancedCareerPredictions()" class="btn btn-secondary">Retry</button>
            </div>
        </div>
    `;
}

// Gamification Functions
let gamificationProfile = null;
let achievements = [];

// Load gamification profile
async function loadGamificationProfile() {
    if (!authManager.isAuthenticated()) {
        return null;
    }

    try {
        const response = await fetch('/api/gamification/profile', {
            headers: authManager.getAuthHeader()
        });

        if (response.ok) {
            gamificationProfile = await response.json();
            updateGamificationDisplay();
            return gamificationProfile;
        }
    } catch (error) {
        console.error('Error loading gamification profile:', error);
    }
    return null;
}

// Update gamification display in UI
function updateGamificationDisplay() {
    if (!gamificationProfile || !authManager.isAuthenticated()) {
        return;
    }

    // Update level and XP display
    const levelElements = document.querySelectorAll('.user-level');
    const xpElements = document.querySelectorAll('.user-xp');
    const progressElements = document.querySelectorAll('.xp-progress');

    levelElements.forEach(el => el.textContent = gamificationProfile.current_level);
    xpElements.forEach(el => el.textContent = gamificationProfile.total_xp.toLocaleString());

    progressElements.forEach(el => {
        const progressBar = el.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = `${gamificationProfile.progressToNextLevel}%`;
        }

        const progressText = el.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${gamificationProfile.total_xp} / ${gamificationProfile.nextLevelXP} XP`;
        }
    });

    // Update streak display
    const streakElements = document.querySelectorAll('.current-streak');
    streakElements.forEach(el => el.textContent = gamificationProfile.current_streak);

    // Update badges count
    const badgeCountElements = document.querySelectorAll('.badges-count');
    badgeCountElements.forEach(el => el.textContent = gamificationProfile.badges_earned.length);

    // Update achievements count
    const achievementCountElements = document.querySelectorAll('.achievements-count');
    achievementCountElements.forEach(el => el.textContent = gamificationProfile.achievements_unlocked.length);
}

// Award XP and show notification
async function awardXP(amount, source = 'general') {
    if (!authManager.isAuthenticated()) {
        return;
    }

    try {
        const response = await fetch('/api/gamification/award-xp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authManager.getAuthHeader()
            },
            body: JSON.stringify({ amount, source })
        });

        const result = await response.json();

        if (result.success) {
            // Update local profile
            if (gamificationProfile) {
                gamificationProfile.total_xp = result.newTotalXP;
                gamificationProfile.current_level = result.newLevel;
                updateGamificationDisplay();
            }

            // Show XP notification
            showXPNotification(result);

            // Handle new achievements
            if (result.newAchievements && result.newAchievements.length > 0) {
                result.newAchievements.forEach(achievement => {
                    showAchievementNotification(achievement);
                });
            }
        }
    } catch (error) {
        console.error('Error awarding XP:', error);
    }
}

// Show XP gain notification
function showXPNotification(result) {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';

    let message = `+${result.xpAwarded} XP`;
    if (result.levelUp) {
        message += ` • Level Up! (${result.newLevel})`;
    }
    if (result.newStreak > 1) {
        message += ` • ${result.newStreak} day streak! 🔥`;
    }

    notification.innerHTML = `
        <div class="xp-notification-content">
            <div class="xp-icon">⭐</div>
            <div class="xp-text">${message}</div>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Show achievement unlock notification
function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';

    notification.innerHTML = `
        <div class="achievement-notification-content">
            <div class="achievement-header">
                <div class="achievement-icon">${achievement.icon || '🏆'}</div>
                <div class="achievement-title">Achievement Unlocked!</div>
            </div>
            <div class="achievement-details">
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
                ${achievement.xp_reward ? `<div class="achievement-xp">+${achievement.xp_reward} XP</div>` : ''}
            </div>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Animate out and remove
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Complete a course with gamification
async function completeCourse(resourceId, courseTitle) {
    if (!authManager.isAuthenticated()) {
        showNotification('Please sign in to track your progress!', 'error');
        return;
    }

    try {
        const response = await fetch('/api/gamification/complete-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authManager.getAuthHeader()
            },
            body: JSON.stringify({ resourceId, courseTitle })
        });

        const result = await response.json();

        if (result.success) {
            // Update local profile
            if (gamificationProfile) {
                gamificationProfile.total_xp += result.xpAwarded;
                if (result.levelUp) {
                    gamificationProfile.current_level = result.newLevel;
                }
                updateGamificationDisplay();
            }

            // Show success message
            showNotification(result.message, 'success');

            // Show XP notification
            showXPNotification({
                xpAwarded: result.xpAwarded,
                levelUp: result.levelUp,
                newLevel: result.newLevel
            });

            // Handle achievements
            if (result.newAchievements && result.newAchievements.length > 0) {
                result.newAchievements.forEach(achievement => {
                    showAchievementNotification(achievement);
                });
            }

            // Refresh progress
            loadUserLearningProgress();
        }
    } catch (error) {
        console.error('Error completing course:', error);
        showNotification('Failed to complete course. Please try again.', 'error');
    }
}



// Career Reports Functions  
let reportTemplates = [];
let currentReportData = null;

// Load report templates
async function loadReportTemplates() {
    if (!authManager.isAuthenticated()) {
        displayReportsAuthRequired();
        return;
    }

    try {
        const response = await fetch('/api/analytics/report-templates', {
            headers: authManager.getAuthHeader()
        });

        if (response.ok) {
            const result = await response.json();

            if (result.success) {
                reportTemplates = result.templates;
                displayReportTemplates(result.templates);
            } else {
                displayReportsError('Failed to load report templates');
            }
        } else {
            throw new Error('Failed to fetch report templates');
        }
    } catch (error) {
        console.error('Error loading report templates:', error);
        displayReportsError('Failed to load report templates');
    }
}

// Display report templates
function displayReportTemplates(templates) {
    const container = document.getElementById('reportsGrid');
    if (!container) return;

    container.style.display = 'block';

    container.innerHTML = `
        <div class="reports-overview">
            <div class="reports-summary">
                <h4>📋 Available Report Types</h4>
                <p>Choose from ${templates.length} comprehensive report templates to analyze different aspects of your career journey</p>
            </div>
        </div>

        <div class="templates-grid">
            ${templates.map(template => `
                <div class="template-card" data-template="${template.id}">
                    <div class="template-header">
                        <h5>${template.name}</h5>
                        <div class="template-meta">
                            <span class="template-pages">${template.estimatedPages}</span>
                            <span class="template-time">${template.generationTime}</span>
                        </div>
                    </div>

                    <div class="template-description">
                        <p>${template.description}</p>
                    </div>

                    <div class="template-sections">
                        <h6>Report Sections:</h6>
                        <div class="sections-list">
                            ${template.sections.map(section => `
                                <span class="section-tag">${section}</span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="template-actions">
                        <button class="btn btn-primary" onclick="generateReport('${template.id}')">
                            📄 Generate Report
                        </button>
                        <button class="btn btn-secondary" onclick="previewTemplate('${template.id}')">
                            👀 Preview
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="reports-actions">
            <h5>💡 Report Tips</h5>
            <div class="report-tips">
                <div class="tip-item">
                    <span class="tip-icon">📊</span>
                    <span>Reports are generated based on your latest assessment and learning data</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">📅</span>
                    <span>Regular report generation helps track your career development progress</span>
                </div>
                <div class="tip-item">
                    <span class="tip-icon">📤</span>
                    <span>Export reports to share with mentors, counselors, or employers</span>
                </div>
            </div>
        </div>
    `;
}

// Generate report
async function generateReport(templateId) {
    const template = reportTemplates.find(t => t.id === templateId);
    if (!template) return;

    try {
        showReportGenerationProgress(template);

        const response = await fetch(`/api/analytics/generate-report/${templateId}`, {
            headers: authManager.getAuthHeader()
        });

        if (response.ok) {
            const result = await response.json();

            if (result.success) {
                currentReportData = result.report;
                displayGeneratedReport(result.report, template);
            } else {
                displayReportsError(result.error);
            }
        } else {
            throw new Error('Failed to generate report');
        }
    } catch (error) {
        console.error('Error generating report:', error);
        displayReportsError('Failed to generate report');
    }
}

// Export report
async function exportReport(format) {
    if (!currentReportData) {
        showNotification('No report data available for export', 'error');
        return;
    }

    try {
        showNotification(`Preparing ${format.toUpperCase()} export...`, 'info');

        const response = await fetch('/api/analytics/export-report', {
            method: 'POST',
            headers: {
                ...authManager.getAuthHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reportData: currentReportData,
                format
            })
        });

        if (response.ok) {
            const result = await response.json();

            if (result.success) {
                showNotification('Report exported successfully!', 'success');

                // Create download link
                const blob = new Blob([JSON.stringify(result.export.content, null, 2)], {
                    type: result.export.contentType
                });

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = result.export.filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                showNotification('Failed to export report', 'error');
            }
        } else {
            throw new Error('Export failed');
        }
    } catch (error) {
        console.error('Error exporting report:', error);
        showNotification('Failed to export report', 'error');
    }
}

// Display auth required message
function displayReportsAuthRequired() {
    const container = document.getElementById('reportsContainer');
    if (!container) return;

    container.querySelector('.auth-required-message').style.display = 'block';
    container.querySelector('.reports-grid').style.display = 'none';
}

// Display error message  
function displayReportsError(errorMessage) {
    const container = document.getElementById('reportsGrid');
    if (!container) return;

    container.innerHTML = `
        <div class="reports-error">
            <div class="error-icon">⚠️</div>
            <h4>Unable to Generate Reports</h4>
            <p>${errorMessage}</p>
            <div class="error-actions">
                <button onclick="showSection('quiz-section')" class="btn btn-primary">Take Assessment</button>
                <button onclick="loadReportTemplates()" class="btn btn-secondary">Retry</button>
            </div>
        </div>
    `;
}

// Start Course Function
async function startCourse(resourceId, courseTitle) {
    if (!authManager.isAuthenticated()) {
        showNotification('Please login to start courses.', 'error');
        return;
    }

    try {
        const response = await fetch('/api/gamification/start-course', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authManager.getAuthHeader()
            },
            body: JSON.stringify({ resourceId, courseTitle })
        });

        const result = await response.json();

        if (result.success) {
            // Update local profile
            if (gamificationProfile) {
                gamificationProfile.total_xp += result.xpAwarded;
                if (result.levelUp) {
                    gamificationProfile.current_level = result.newLevel;
                }
                updateGamificationDisplay();
            }

            // Show success message
            showNotification(result.message, 'success');

            // Show XP notification
            showXPNotification({
                xpAwarded: result.xpAwarded,
                levelUp: result.levelUp,
                newLevel: result.newLevel
            });

            // Handle achievements
            if (result.newAchievements && result.newAchievements.length > 0) {
                result.newAchievements.forEach(achievement => {
                    showAchievementNotification(achievement);
                });
            }

            // Refresh progress
            loadUserLearningProgress();
        }
    } catch (error) {
        console.error('Error starting course:', error);
        showNotification('Failed to start course. Please try again.', 'error');
    }
}

// Load achievements
async function loadAchievements() {
    if (!authManager.isAuthenticated()) {
        return;
    }

    try {
        const response = await fetch('/api/gamification/achievements', {
            headers: authManager.getAuthHeader()
        });

        if (response.ok) {
            const data = await response.json();
            achievements = data.achievements;
            displayAchievements(achievements, data.badges);
        }
    } catch (error) {
        console.error('Error loading achievements:', error);
    }
}

// Display achievements in progress tab
function displayAchievements(achievementsList, badges) {
    const achievementsContainer = document.getElementById('achievementsContainer');
    if (!achievementsContainer) return;

    const unlockedAchievements = achievementsList.filter(a => a.unlocked);
    const lockedAchievements = achievementsList.filter(a => !a.unlocked);

    achievementsContainer.innerHTML = `
        <div class="achievements-section">
            <div class="achievements-summary">
                <div class="achievement-stat">
                    <div class="stat-number">${unlockedAchievements.length}</div>
                    <div class="stat-label">Achievements</div>
                </div>
                <div class="achievement-stat">
                    <div class="stat-number">${badges.length}</div>
                    <div class="stat-label">Badges</div>
                </div>
            </div>

            <div class="achievements-tabs">
                <button class="achievement-tab active" onclick="showAchievementTab('unlocked')">Unlocked (${unlockedAchievements.length})</button>
                <button class="achievement-tab" onclick="showAchievementTab('locked')">Locked (${lockedAchievements.length})</button>
                <button class="achievement-tab" onclick="showAchievementTab('badges')">Badges (${badges.length})</button>
            </div>

            <div id="unlockedTab" class="achievement-tab-content active">
                <div class="achievements-grid">
                    ${unlockedAchievements.map(achievement => `
                        <div class="achievement-card unlocked">
                            <div class="achievement-icon">${achievement.icon}</div>
                            <div class="achievement-info">
                                <div class="achievement-name">${achievement.name}</div>
                                <div class="achievement-description">${achievement.description}</div>
                                <div class="achievement-reward">+${achievement.xp_reward} XP</div>
                                ${achievement.unlocked_at ? `<div class="achievement-date">Unlocked: ${new Date(achievement.unlocked_at).toLocaleDateString()}</div>` : ''}
                            </div>
                            <div class="achievement-status">✅</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div id="lockedTab" class="achievement-tab-content">
                <div class="achievements-grid">
                    ${lockedAchievements.map(achievement => `
                        <div class="achievement-card locked">
                            <div class="achievement-icon grayscale">${achievement.icon}</div>
                            <div class="achievement-info">
                                <div class="achievement-name">${achievement.name}</div>
                                <div class="achievement-description">${achievement.description}</div>
                                <div class="achievement-reward">+${achievement.xp_reward} XP</div>
                            </div>
                            <div class="achievement-status">🔒</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div id="badgesTab" class="achievement-tab-content">
                <div class="badges-grid">
                    ${badges.map(badge => `
                        <div class="badge-card">
                            <div class="badge-icon">${badge.icon}</div>
                            <div class="badge-info">
                                <div class="badge-name">${badge.name}</div>
                                <div class="badge-date">Earned: ${new Date(badge.earned_at).toLocaleDateString()}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Show achievement tab
function showAchievementTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.achievement-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.achievement-tab[onclick*="'${tabName}'"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.achievement-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// Load leaderboard
async function loadLeaderboard() {
    try {
        const response = await fetch('/api/gamification/leaderboard');

        if (response.ok) {
            const leaderboard = await response.json();
            displayLeaderboard(leaderboard);
        }
    } catch (error) {
        console.error('Error loading leaderboard:', error);
    }
}

// Display leaderboard
function displayLeaderboard(leaderboard) {
    const leaderboardContainer = document.getElementById('leaderboardContainer');
    if (!leaderboardContainer) return;

    leaderboardContainer.innerHTML = `
        <div class="leaderboard-list">
            ${leaderboard.map((entry, index) => `
                <div class="leaderboard-entry ${index < 3 ? 'top-three' : ''}">
                    <div class="rank-badge rank-${index + 1}">${index + 1}</div>
                    <div class="user-info">
                        <div class="username">${entry.username}</div>
                        <div class="user-stats">
                            Level ${entry.current_level} • ${entry.total_xp.toLocaleString()} XP
                            ${entry.current_streak > 0 ? `• ${entry.current_streak} day streak 🔥` : ''}
                        </div>
                    </div>
                    <div class="user-badges">
                        ${entry.badges_earned.slice(0, 3).map(badge => `<span class="mini-badge">${badge.icon}</span>`).join('')}
                        ${entry.badges_earned.length > 3 ? `<span class="badge-count">+${entry.badges_earned.length - 3}</span>` : ''}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Track resource click for gamification
function trackResourceClick(resourceId) {
    const resource = allLearningResources.find(r => r.id === resourceId);
    if (resource && authManager.isAuthenticated()) {
        // Award small XP for exploring resources
        setTimeout(() => {
            awardXP(5, 'resource_view');
        }, 1000); // Delay to let the page load
    }
}

// Initialize gamification when user logs in
function initializeGamification() {
    if (authManager.isAuthenticated()) {
        loadGamificationProfile();
        loadAchievements();
    }
}

// Load user learning progress
async function loadUserLearningProgress() {
    if (!authManager.isAuthenticated()) {
        document.getElementById('progressGrid').innerHTML = `
            <div class="auth-required-message">
                <h3>🔐 Sign in to track your progress</h3>
                <p>Create an account to save your learning progress and get personalized recommendations.</p>
                <button onclick="authManager.showLoginModal()" class="btn btn-primary">Sign In</button>
                <button onclick="authManager.showRegisterModal()" class="btn btn-secondary">Create Account</button>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch('/api/learning/progress', {
            headers: authManager.getAuthHeader()
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const progress = await response.json();
        displayUserProgress(progress);

    } catch (error) {
        console.error('Error loading learning progress:', error);
        document.getElementById('progressGrid').innerHTML = `
            <div class="error-message">
                <p>Unable to load learning progress. Please try again.</p>
                <button onclick="loadUserLearningProgress()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

// Display user progress
function displayUserProgress(progressData) {
    const progressGrid = document.getElementById('progressGrid');

    const completedCourses = progressData.filter(p => p.status === 'completed').length;
    const inProgressCourses = progressData.filter(p => p.status === 'in_progress').length;

    // Create comprehensive progress display
    let content = '';

    // Add gamification profile if authenticated
    if (gamificationProfile) {
        content += `
            <div class="gamification-profile">
                <div class="profile-header">
                    <h4>🏆 Your Learning Stats</h4>
                </div>
                <div class="gamification-stats">
                    <div class="stat-card level">
                        <div class="stat-icon">🎯</div>
                        <div class="stat-content">
                            <div class="stat-number user-level">${gamificationProfile.current_level}</div>
                            <div class="stat-label">Level</div>
                        </div>
                    </div>
                    <div class="stat-card xp">
                        <div class="stat-icon">⭐</div>
                        <div class="stat-content">
                            <div class="stat-number user-xp">${gamificationProfile.total_xp.toLocaleString()}</div>
                            <div class="stat-label">Total XP</div>
                        </div>
                    </div>
                    <div class="stat-card streak">
                        <div class="stat-icon">🔥</div>
                        <div class="stat-content">
                            <div class="stat-number current-streak">${gamificationProfile.current_streak}</div>
                            <div class="stat-label">Day Streak</div>
                        </div>
                    </div>
                    <div class="stat-card badges">
                        <div class="stat-icon">🏅</div>
                        <div class="stat-content">
                            <div class="stat-number badges-count">${gamificationProfile.badges_earned.length}</div>
                            <div class="stat-label">Badges</div>
                        </div>
                    </div>
                </div>

                <div class="xp-progress-section">
                    <h5>Progress to Next Level</h5>
                    <div class="xp-progress">
                        <div class="progress-bar" style="width: ${gamificationProfile.progressToNextLevel}%"></div>
                        <div class="progress-text">${gamificationProfile.total_xp} / ${gamificationProfile.nextLevelXP} XP</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Add course progress section
    content += `
        <div class="course-progress-section">
            <div class="section-header">
                <h4>📚 Your Course Progress</h4>
                <div class="progress-summary">
                    <span class="progress-stat">${completedCourses} Completed</span>
                    <span class="progress-stat">${inProgressCourses} In Progress</span>
                </div>
            </div>
    `;

    if (progressData.length === 0) {
        content += `
            <div class="no-progress">
                <div class="no-progress-icon">🎆</div>
                <h4>Start Your Learning Journey!</h4>
                <p>Begin taking courses to track your progress and earn XP points.</p>
                <button onclick="showLearningTab('courses')" class="btn btn-primary">
                    Browse Courses 🚀
                </button>
            </div>
        `;
    } else {
        content += `
            <div class="progress-courses">
                ${progressData.map(item => `
                    <div class="progress-card ${item.status}">
                        <div class="progress-card-header">
                            <div class="progress-info">
                                <h5>${item.title}</h5>
                                <div class="progress-meta">
                                    ${item.provider} • ${item.category} • ${item.type}
                                </div>
                            </div>
                            <div class="progress-status ${item.status}">
                                ${item.status === 'completed' ? '✅ Completed' : 
                                  item.status === 'in_progress' ? '🟡 In Progress' : 
                                  '⚪ Not Started'}
                            </div>
                        </div>

                        <div class="progress-bar-container">
                            <div class="progress-bar-label">
                                <span>Progress</span>
                                <span>${item.progress_percentage || 0}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-bar-fill" style="width: ${item.progress_percentage || 0}%"></div>
                            </div>
                        </div>

                        ${item.notes ? `<p class="progress-notes"><strong>Notes:</strong> ${item.notes}</p>` : ''}

                        <div class="progress-actions">
                            ${item.status === 'completed' ? 
                                '<span class="completed-badge">🏆 Well done! (+100 XP earned)</span>' :
                                `<button class="btn btn-primary" onclick="completeCourse('${item.resource_id}', '${item.title}')">
                                    ✅ Mark Complete (+100 XP)
                                </button>`
                            }
                            <button class="btn btn-secondary" onclick="continueResource('${item.resource_id}')">
                                ${item.status === 'completed' ? 'Review' : 'Continue'}
                            </button>
                            ${item.started_at ? `<span class="progress-date">Started: ${new Date(item.started_at).toLocaleDateString()}</span>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    content += '</div>'; // Close course-progress-section

    // Add achievements section placeholder
    content += '<div class="achievements-section" id="achievementsContainer"><!-- Achievements will be loaded here --></div>';

    progressGrid.innerHTML = content;
}

// Continue resource learning
function continueResource(resourceId) {
    const resource = allLearningResources.find(r => r.id === resourceId);
    if (resource) {
        window.open(resource.url, '_blank');
        trackResourceClick(resourceId);
    }
}

// Update progress
function updateProgress(resourceId) {
    // This would open a modal to update progress
    // For now, just show a notification
    showNotification('Progress update feature coming soon! 📊', 'info');
}

// Enhanced navigation to load learning resources when section is shown
const originalShowSection = showSection;
showSection = function(sectionName) {
    originalShowSection(sectionName);

    if (sectionName === 'learning-section') {
        // Show courses tab by default
        showLearningTab('courses');

        // Update auth-required elements
        if (authManager && authManager.isAuthenticated()) {
            document.querySelectorAll('.auth-required').forEach(el => {
                el.style.display = 'block';
            });
        }
    }
};

// Community Features Functions
let currentCommunityTab = 'forum';
let forumCategories = [];
let forumPosts = [];

// Show community tab
function showCommunityTab(tabName) {
    trackEvent('community_tab_view', { tab: tabName });
    currentCommunityTab = tabName;

    // Update tab buttons
    document.querySelectorAll('.community-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(tabName + 'NavBtn').classList.add('active');

    // Update tab content
    document.querySelectorAll('.community-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + 'Content').classList.add('active');

    // Load content based on tab
    switch(tabName) {
        case 'forum':
            loadForumContent();
            break;
        case 'networking':
            loadNetworkingContent();
            break;
        case 'mentorship':
            loadMentorshipContent();
            break;
        case 'activity':
            loadUserActivity();
            break;
    }
}

// Forum Functions
async function loadForumContent() {
    try {
        await loadForumCategories();
        await loadForumPosts();
    } catch (error) {
        console.error('Error loading forum content:', error);
    }
}

async function loadForumCategories() {
    try {
        const response = await fetch('/api/community/forum/categories');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        forumCategories = await response.json();
        displayForumCategories(forumCategories);
    } catch (error) {
        console.error('Error loading forum categories:', error);
        document.getElementById('forumCategories').innerHTML = `
            <div class="error-message">
                <p>Forum is starting up... Please wait a moment.</p>
                <button onclick="loadForumCategories()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

function displayForumCategories(categories) {
    const categoriesContainer = document.getElementById('forumCategories');

    categoriesContainer.innerHTML = categories.map(category => {
        return `
            <div class="forum-category-card" 
                 style="--category-color: ${category.color}" 
                 onclick="showCategoryPosts('${category.id}', '${category.name}')">
                <div class="forum-category-header">
                    <span class="forum-category-icon">${category.icon}</span>
                    <h4 class="forum-category-name">${category.name}</h4>
                </div>
                <p class="forum-category-description">${category.description}</p>
            </div>
        `;
    }).join('');
}

async function loadForumPosts(categoryId = null) {
    try {
        const url = categoryId ? 
            `/api/community/forum/posts?categoryId=${categoryId}` : 
            '/api/community/forum/posts';

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        forumPosts = await response.json();
        displayForumPosts(forumPosts);
    } catch (error) {
        console.error('Error loading forum posts:', error);
        document.getElementById('forumPosts').innerHTML = `
            <div class="error-message">
                <p>Loading forum discussions...</p>
                <button onclick="loadForumPosts()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

function displayForumPosts(posts) {
    const postsContainer = document.getElementById('forumPosts');

    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="no-posts">
                <h4>No discussions yet</h4>
                <p>Be the first to start a conversation!</p>
                <button class="btn btn-primary auth-required" onclick="showCreatePostModal()" style="display: none;">
                    Create First Post
                </button>
                <div class="auth-prompt" style="display: block;">
                    <p>Sign in to start discussions</p>
                    <button onclick="authManager.showLoginModal()" class="btn btn-primary">Sign In</button>
                </div>
            </div>
        `;
        return;
    }

    postsContainer.innerHTML = posts.map(post => {
        const timeAgo = formatTimeAgo(new Date(post.created_at));
        return `
            <div class="forum-post-card" onclick="showPostDetails('${post.id}')">
                <div class="forum-post-header">
                    <h4 class="forum-post-title">${post.title}</h4>
                    <span class="forum-post-category" style="background: ${post.category_color}">
                        ${post.category_name}
                    </span>
                </div>
                <div class="forum-post-meta">
                    <span>👤 ${post.username}</span>
                    <span>⏰ ${timeAgo}</span>
                </div>
                <div class="forum-post-stats">
                    <span>👁️ ${post.views_count} views</span>
                    <span>💬 ${post.replies_count} replies</span>
                    <span>❤️ ${post.likes_count} likes</span>
                </div>
            </div>
        `;
    }).join('');
}

function showCreatePostModal() {
    if (!authManager.isAuthenticated()) {
        authManager.showLoginModal();
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'career-modal';
    modal.innerHTML = `
        <div class="career-modal-content">
            <div class="career-modal-header">
                <h2>✏️ Create New Discussion</h2>
                <button class="close-modal" onclick="this.closest('.career-modal').remove()">&times;</button>
            </div>
            <form class="create-post-form" onsubmit="handleCreatePost(event)">
                <div class="form-group">
                    <label>Category:</label>
                    <select name="categoryId" required>
                        ${forumCategories.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" placeholder="What would you like to discuss?" required>
                </div>
                <div class="form-group">
                    <label>Content:</label>
                    <textarea name="content" rows="6" placeholder="Share your thoughts, questions, or insights..." required></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Create Post</button>
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.career-modal').remove()">Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

async function handleCreatePost(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const postData = {
        categoryId: formData.get('categoryId'),
        title: formData.get('title'),
        content: formData.get('content'),
        tags: []
    };

    try {
        const response = await fetch('/api/community/forum/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authManager.getAuthHeader()
            },
            body: JSON.stringify(postData)
        });

        const result = await response.json();

        if (result.success) {
            showNotification('Discussion created successfully! 🎉', 'success');
            document.querySelector('.career-modal').remove();
            loadForumPosts();
        } else {
            throw new Error(result.error || 'Failed to create post');
        }
    } catch (error) {
        console.error('Create post error:', error);
        showNotification(`Failed to create post: ${error.message}`, 'error');
    }
}

// Networking Functions
async function loadNetworkingContent() {
    if (authManager.isAuthenticated()) {
        await loadUserConnections();
    }
}

async function loadUserConnections() {
    try {
        const response = await fetch('/api/community/networking/connections', {
            headers: authManager.getAuthHeader()
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const connections = await response.json();
        document.getElementById('connectionsCount').textContent = connections.length;
        displayConnections(connections);
    } catch (error) {
        console.error('Error loading connections:', error);
    }
}

function displayConnections(connections) {
    const connectionsGrid = document.getElementById('connectionsGrid');

    if (connections.length === 0) {
        connectionsGrid.innerHTML = `
            <div class="no-connections">
                <h4>Start Building Your Network</h4>
                <p>Connect with professionals in your field to grow your career.</p>
            </div>
        `;
        return;
    }

    connectionsGrid.innerHTML = connections.map(connection => {
        const otherUser = connection.requester_id === authManager.user.id ? 
            { username: connection.addressee_username, email: connection.addressee_email } :
            { username: connection.requester_username, email: connection.requester_email };

        return `
            <div class="connection-card">
                <div class="connection-avatar">
                    ${otherUser.username.charAt(0).toUpperCase()}
                </div>
                <h4 class="connection-name">${otherUser.username}</h4>
                <p class="connection-role">Connected on ${formatDate(connection.accepted_at)}</p>
                <button class="btn btn-secondary" onclick="messageConnection('${otherUser.username}')">
                    💬 Message
                </button>
            </div>
        `;
    }).join('');
}

// Mentorship Functions
async function loadMentorshipContent() {
    await loadFeaturedMentors();
}

async function loadFeaturedMentors() {
    try {
        const response = await fetch('/api/community/mentorship/mentors');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const mentors = await response.json();
        displayMentors(mentors);
    } catch (error) {
        console.error('Error loading mentors:', error);
        document.getElementById('mentorsGrid').innerHTML = `
            <div class="error-message">
                <p>Loading mentors... This may take a moment on first load.</p>
                <button onclick="loadFeaturedMentors()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

function displayMentors(mentors) {
    const mentorsGrid = document.getElementById('mentorsGrid');

    if (mentors.length === 0) {
        mentorsGrid.innerHTML = `
            <div class="no-mentors">
                <h4>No mentors available yet</h4>
                <p>Be the first to join our mentorship program!</p>
            </div>
        `;
        return;
    }

    mentorsGrid.innerHTML = mentors.slice(0, 6).map(mentor => {
        const skills = Array.isArray(mentor.skills_offered) ? mentor.skills_offered.slice(0, 3) : [];
        return `
            <div class="mentor-card">
                <div class="mentor-avatar">
                    ${mentor.username.charAt(0).toUpperCase()}
                </div>
                <h4 class="mentor-name">${mentor.username}</h4>
                <p class="mentor-field">${mentor.career_field || 'General'}</p>
                <p class="mentor-experience">${mentor.experience_level || 'Experienced'} Professional</p>
                <div class="mentor-skills">
                    ${skills.map(skill => `<span class="mentor-skill">${skill}</span>`).join('')}
                </div>
                <button class="btn btn-primary" onclick="requestMentorship('${mentor.user_id}', '${mentor.username}')">
                    Request Mentorship
                </button>
            </div>
        `;
    }).join('');
}

function showFindMentorsModal() {
    showNotification('Advanced mentor search coming soon! 🚀', 'info');
}

async function requestMentorship(mentorId, mentorName) {
    if (!authManager.isAuthenticated()) {
        authManager.showLoginModal();
        return;
    }

    const message = prompt(`Send a message to ${mentorName}:`, 
        `Hi ${mentorName}, I'm interested in learning from your experience. Could you mentor me in my career journey?`);

    if (!message) return;

    try {
        const response = await fetch('/api/community/mentorship/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authManager.getAuthHeader()
            },
            body: JSON.stringify({ mentorId, message })
        });

        const result = await response.json();

        if (result.success) {
            showNotification(`Mentorship request sent to ${mentorName}! 🎉`, 'success');
        } else {
            throw new Error(result.error || 'Failed to send mentorship request');
        }
    } catch (error) {
        console.error('Mentorship request error:', error);
        showNotification(`Failed to send request: ${error.message}`, 'error');
    }
}

// Activity Functions
async function loadUserActivity() {
    if (!authManager.isAuthenticated()) {
        document.getElementById('activityTimeline').innerHTML = `
            <div class="auth-required-message">
                <h3>🔐 Sign in to view your activity</h3>
                <p>Track your community engagement and contributions.</p>
                <button onclick="authManager.showLoginModal()" class="btn btn-primary">Sign In</button>
            </div>
        `;
        return;
    }

    try {
        const response = await fetch('/api/community/activity', {
            headers: authManager.getAuthHeader()
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const activities = await response.json();
        displayUserActivity(activities);
    } catch (error) {
        console.error('Error loading user activity:', error);
        document.getElementById('activityTimeline').innerHTML = `
            <div class="error-message">
                <p>Unable to load activity. Please try again.</p>
                <button onclick="loadUserActivity()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

function displayUserActivity(activities) {
    const timeline = document.getElementById('activityTimeline');

    if (activities.length === 0) {
        timeline.innerHTML = `
            <div class="no-activity">
                <h4>No activity yet</h4>
                <p>Start participating in the community to see your activity here.</p>
                <button onclick="showCommunityTab('forum')" class="btn btn-primary">Join Discussions</button>
            </div>
        `;
        return;
    }

    timeline.innerHTML = activities.map(activity => {
        const icon = getActivityIcon(activity.activity_type);
        const timeAgo = formatTimeAgo(new Date(activity.created_at));

        return `
            <div class="activity-item">
                <div class="activity-icon">${icon}</div>
                <div class="activity-content">
                    <p class="activity-description">${activity.description}</p>
                    <span class="activity-time">${timeAgo}</span>
                </div>
            </div>
        `;
    }).join('');
}

// Utility Functions
function getActivityIcon(activityType) {
    const icons = {
        'forum_post_created': '📝',
        'forum_reply_created': '💬',
        'connection_request_sent': '🤝',
        'connection_accepted': '✅',
        'mentorship_request_sent': '🎓',
        'mentorship_profile_created': '👨‍🏫',
        'assessment_completed': '📊',
        'learning_resource_started': '📚'
    };
    return icons[activityType] || '📋';
}

function formatTimeAgo(date) {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

function messageConnection(username) {
    showNotification(`Messaging feature coming soon! You can connect with ${username} on LinkedIn for now.`, 'info');
}

function showBecomeMentorModal() {
    if (!authManager.isAuthenticated()) {
        authManager.showLoginModal();
        return;
    }

    showNotification('Mentor registration feature coming soon! 🚀', 'info');
}

function showFindPeersModal() {
    showNotification('Peer finder feature coming soon! 🚀', 'info');
}

function showMyConnections() {
    // This is already handled by loadUserConnections
    loadUserConnections();
}

// Enhanced navigation to load community content when section is shown
const originalShowSection2 = showSection;
showSection = function(sectionName) {
    originalShowSection2(sectionName);

    if (sectionName === 'learning-section') {
        showLearningTab('courses');
        if (authManager && authManager.isAuthenticated()) {
            document.querySelectorAll('.auth-required').forEach(el => {
                el.style.display = 'block';
            });
        }
    }

    if (sectionName === 'community-section') {
        showCommunityTab('forum');
        if (authManager && authManager.isAuthenticated()) {
            document.querySelectorAll('.auth-required').forEach(el => {
                el.style.display = 'block';
            });
        }
    }

    if (sectionName === 'analytics-section') {
        showAnalyticsTab('predictions');
        if (authManager && authManager.isAuthenticated()) {
            document.querySelectorAll('.auth-required').forEach(el => {
                el.style.display = 'block';
            });
        }
    }
};

// Advanced Analytics Functions
let currentAnalyticsTab = 'predictions';

// Show analytics tab
function showAnalyticsTab(tabName) {
    console.log('showAnalyticsTab called with:', tabName); // Debug log
    trackEvent('analytics_tab_view', { tab: tabName });
    currentAnalyticsTab = tabName;

    // Update tab buttons
    document.querySelectorAll('.analytics-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Handle special cases for button IDs
    let buttonId;
    if (tabName === 'ai-twin') {
        buttonId = 'aiTwinNavBtn';
    } else {
        buttonId = tabName + 'NavBtn';
    }
    
    const targetButton = document.getElementById(buttonId);
    if (targetButton) {
        targetButton.classList.add('active');
        console.log('Active class added to button:', buttonId); // Debug log
    } else {
        console.error('Button not found:', buttonId); // Debug log
    }

    // Update tab content
    console.log('Removing active class from all tabs...'); // Debug log
    document.querySelectorAll('.analytics-tab-content').forEach(content => {
        content.classList.remove('active');
        console.log('Removed active from:', content.id); // Debug log
    });
    
    // Show selected tab content
    let contentId;
    if (tabName === 'skills') {
        contentId = 'skillsAnalyticsContent';
    } else if (tabName === 'ai-twin') {
        contentId = 'ai-twinContent';
    } else {
        contentId = tabName + 'Content';
    }
    
    console.log('Setting active for contentId:', contentId); // Debug log
    const targetContent = document.getElementById(contentId);
    console.log('Target content element:', targetContent); // Debug log
    
    if (targetContent) {
        targetContent.classList.add('active');
        console.log('Active class added to:', contentId); // Debug log
    } else {
        console.error('Target content not found:', contentId); // Debug log
    }

    // Load content based on tab
    switch(tabName) {
        case 'predictions':
            loadEnhancedCareerPredictions();
            break;
        case 'peer-comparison':
            loadPeerComparison();
            break;
        case 'reports':
            loadReportTemplates();
            break;
        case 'trends':
            loadMarketTrends();
            break;
        case 'ai-twin':
            console.log('Loading AI Twin simulations...'); // Debug log
            console.log('AI Twin case triggered!'); // Debug log
            loadAITwinSimulations();
            break;
        case 'salary':
            // Salary explorer is always ready
            break;
        case 'skills':
            // Skills gap analyzer is always ready
            break;
    }
}

// Career Predictions Functions
async function loadCareerPredictions() {
    if (!authManager.isAuthenticated()) {
        document.querySelector('.auth-required-message').style.display = 'block';
        document.getElementById('predictionsGrid').style.display = 'none';
        return;
    }

    try {
        const response = await fetch('/api/analytics/predictions', {
            headers: authManager.getAuthHeader()
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();

        if (data.hasPredictions) {
            document.querySelector('.auth-required-message').style.display = 'none';
            document.getElementById('predictionsGrid').style.display = 'block';
            displayCareerPredictions(data.predictions);
        } else {
            document.getElementById('predictionsContainer').innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📊</div>
                    <h4>Complete Assessment for Predictions</h4>
                    <p>${data.message}</p>
                    <div class="empty-actions">
                        <button onclick="showSection('quiz-section')" class="btn btn-primary">Take Assessment</button>
                        <button onclick="loadMarketTrends(); showAnalyticsTab('trends')" class="btn btn-secondary">View Market Trends</button>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading career predictions:', error);
        document.getElementById('predictionsContainer').innerHTML = `
            <div class="error-message">
                <p>Unable to load predictions. Please try again.</p>
                <button onclick="loadCareerPredictions()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

function displayCareerPredictions(predictions) {
    const grid = document.getElementById('predictionsGrid');

    grid.innerHTML = predictions.map(prediction => {
        return `
            <div class="prediction-card">
                <div class="prediction-header">
                    <h4>${prediction.career}</h4>
                    <div class="success-probability">
                        <span class="probability-score">${prediction.successProbability}%</span>
                        <span class="probability-label">Success Probability</span>
                    </div>
                </div>

                <div class="prediction-content">
                    <div class="prediction-section">
                        <h5>💰 Projected Salary Timeline</h5>
                        <div class="salary-timeline">
                            <div class="salary-milestone">
                                <span class="year">Year 1</span>
                                <span class="amount">$${(prediction.projectedSalary.year1 / 1000).toFixed(0)}K</span>
                            </div>
                            <div class="salary-milestone">
                                <span class="year">Year 3</span>
                                <span class="amount">$${(prediction.projectedSalary.year3 / 1000).toFixed(0)}K</span>
                            </div>
                            <div class="salary-milestone">
                                <span class="year">Year 5</span>
                                <span class="amount">$${(prediction.projectedSalary.year5 / 1000).toFixed(0)}K</span>
                            </div>
                            <div class="salary-milestone">
                                <span class="year">Year 10</span>
                                <span class="amount">$${(prediction.projectedSalary.year10 / 1000).toFixed(0)}K</span>
                            </div>
                        </div>
                    </div>

                    <div class="prediction-section">
                        <h5>⚠️ Risk Factors</h5>
                        <ul class="risk-list">
                            ${prediction.riskFactors.map(risk => `<li>${risk}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="prediction-section">
                        <h5>✅ Your Advantages</h5>
                        <ul class="advantage-list">
                            ${prediction.advantages.map(advantage => `<li>${advantage}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="prediction-section">
                        <h5>🗺️ Career Timeline</h5>
                        <div class="career-timeline-grid">
                            ${Object.entries(prediction.timeline).map(([level, info]) => `
                                <div class="timeline-stage">
                                    <h6>${info.title}</h6>
                                    <div class="stage-timeframe">${info.timeframe}</div>
                                    <div class="stage-salary">$${(info.salary / 1000).toFixed(0)}K</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="prediction-actions">
                    <button class="btn btn-primary" onclick="exploreCareerPath('${prediction.career}')">Explore Path</button>
                    <button class="btn btn-secondary" onclick="getSalaryInsights('${prediction.career}')">Salary Details</button>
                </div>
            </div>
        `;
    }).join('');
}

function exploreCareerPath(careerName) {
    // Find and show career details
    showSection('roadmap-section');
    setTimeout(() => {
        const searchInput = document.getElementById('careerSearch');
        if (searchInput) {
            searchInput.value = careerName;
            filterCareers();
        }
    }, 500);
}

// Market Trends Functions
async function loadMarketTrends() {
    try {
        document.getElementById('trendsContainer').innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading live market trends...</p>
        `;

        // Load both traditional trends and live ECON data
        const [trendsResponse, econTrendsResponse] = await Promise.all([
            fetch('/api/analytics/market-trends'),
            fetch('/api/econ/trends')
        ]);

        if (!trendsResponse.ok) throw new Error(`HTTP error! status: ${trendsResponse.status}`);
        if (!econTrendsResponse.ok) throw new Error(`HTTP error! status: ${econTrendsResponse.status}`);

        const trends = await trendsResponse.json();
        const econTrends = await econTrendsResponse.json();
        
        // Load live job market data for popular careers
        const liveJobData = await loadLiveJobMarketData();
        
        displayMarketTrends(trends, econTrends, liveJobData);
    } catch (error) {
        console.error('Error loading market trends:', error);
        document.getElementById('trendsContainer').innerHTML = `
            <div class="error-message">
                <p>Unable to load market trends. Please try again.</p>
                <button onclick="loadMarketTrends()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

// Load live job market data for popular careers
async function loadLiveJobMarketData() {
    const popularCareers = ['Software Developer', 'Data Scientist', 'UX Designer', 'Product Manager', 'Marketing Manager'];
    const indianCities = ['India', 'Mumbai', 'Bangalore', 'Hyderabad', 'Delhi'];
    
    const jobData = [];
    
    for (const career of popularCareers) {
        try {
            // Focus on Indian market first
            const response = await fetch(`/api/econ/jobs?career=${encodeURIComponent(career)}&location=India`);
            if (response.ok) {
                const data = await response.json();
                jobData.push({
                    career,
                    ...data
                });
            }
        } catch (error) {
            console.warn(`Failed to load job data for ${career}:`, error);
        }
    }
    
    return jobData;
}

// Refresh live job market data
async function refreshLiveJobData() {
    try {
        showNotification('Refreshing live job market data...', 'info');
        const liveJobData = await loadLiveJobMarketData();
        
        // Update the trends tab with fresh data
        const trendsResponse = await fetch('/api/analytics/market-trends');
        const econTrendsResponse = await fetch('/api/econ/trends');
        
        if (trendsResponse.ok && econTrendsResponse.ok) {
            const trends = await trendsResponse.json();
            const econTrends = await econTrendsResponse.json();
            displayMarketTrends(trends, econTrends, liveJobData);
            showNotification('Job market data refreshed! 📊', 'success');
        }
    } catch (error) {
        console.error('Error refreshing job data:', error);
        showNotification('Failed to refresh data. Please try again.', 'error');
    }
}

function displayMarketTrends(trends, econTrends, liveJobData) {
    const container = document.getElementById('trendsContainer');

    container.innerHTML = `
        <div class="trends-grid">
            <!-- Hot Careers Section -->
            <div class="trends-section">
                <h4>🔥 Hot Careers Right Now</h4>
                <div class="hot-careers-grid">
                    ${trends.hotCareers.map(career => `
                        <div class="hot-career-card">
                            <div class="career-growth-badge">${career.growth}</div>
                            <h5>${career.career}</h5>
                            <p class="career-reason">${career.reason}</p>
                            <div class="career-metrics">
                                <div class="metric">
                                    <span class="metric-label">Salary Trend</span>
                                    <span class="metric-value">${career.salary_trend}</span>
                                </div>
                                <div class="metric">
                                    <span class="metric-label">Market</span>
                                    <span class="metric-value">${career.difficulty}</span>
                                </div>
                            </div>
                            <button class="btn btn-small btn-primary" onclick="exploreCareerPath('${career.career}')">Explore</button>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Emerging Fields Section -->
            <div class="trends-section">
                <h4>🚀 Emerging Fields</h4>
                <div class="emerging-fields">
                    ${trends.emergingFields.map(field => `
                        <div class="emerging-field-tag">${field}</div>
                    `).join('')}
                </div>
            </div>

            <!-- Salary Trends Section -->
            <div class="trends-section">
                <h4>💰 Salary Trends by Industry</h4>
                <div class="salary-trends-grid">
                    ${Object.entries(trends.salaryTrends).map(([industry, data]) => `
                        <div class="salary-trend-item">
                            <span class="industry-name">${industry.charAt(0).toUpperCase() + industry.slice(1)}</span>
                            <span class="trend-indicator ${data.trend}">
                                ${data.trend === 'up' ? '↗️' : data.trend === 'down' ? '↘️' : '➡️'} ${data.change}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Skills in Demand Section -->
            <div class="trends-section">
                <h4>🎯 Skills in High Demand</h4>
                <div class="skills-demand-grid">
                    ${trends.skillsInDemand.map(skill => `
                        <div class="demand-skill-tag">${skill}</div>
                    `).join('')}
                </div>
            </div>

            <!-- Remote Work Trends Section -->
            <div class="trends-section">
                <h4>🏠 Remote Work Trends</h4>
                <div class="remote-trends">
                    <div class="remote-stats">
                        <div class="remote-stat">
                            <span class="stat-value">${trends.remoteWorkTrends.fullyRemote}</span>
                            <span class="stat-label">Fully Remote</span>
                        </div>
                        <div class="remote-stat">
                            <span class="stat-value">${trends.remoteWorkTrends.hybrid}</span>
                            <span class="stat-label">Hybrid</span>
                        </div>
                        <div class="remote-stat">
                            <span class="stat-value">${trends.remoteWorkTrends.onSite}</span>
                            <span class="stat-label">On-site</span>
                        </div>
                    </div>
                    <p class="remote-insight">${trends.remoteWorkTrends.trending}</p>
                </div>
            </div>

            <!-- Indian Market Insights Section -->
            <div class="trends-section">
                <h4>🇮🇳 Indian Market Insights</h4>
                <div class="indian-market-insights">
                    <div class="insight-grid">
                        <div class="insight-item">
                            <span class="insight-icon">🚀</span>
                            <div class="insight-content">
                                <h5>Startup Ecosystem</h5>
                                <p>${trends.indianMarketInsights.startupEcosystem}</p>
                            </div>
                        </div>
                        <div class="insight-item">
                            <span class="insight-icon">🏢</span>
                            <div class="insight-content">
                                <h5>Tech Hubs</h5>
                                <p>${trends.indianMarketInsights.techHubs}</p>
                            </div>
                        </div>
                        <div class="insight-item">
                            <span class="insight-icon">📈</span>
                            <div class="insight-content">
                                <h5>Salary Growth</h5>
                                <p>${trends.indianMarketInsights.salaryGrowth}</p>
                            </div>
                        </div>
                        <div class="insight-item">
                            <span class="insight-icon">🎯</span>
                            <div class="insight-content">
                                <h5>Skill Gaps</h5>
                                <p>${trends.indianMarketInsights.skillGaps}</p>
                            </div>
                        </div>
                        <div class="insight-item">
                            <span class="insight-icon">🎓</span>
                            <div class="insight-content">
                                <h5>Education Trends</h5>
                                <p>${trends.indianMarketInsights.educationTrends}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Live Job Market Section -->
            <div class="trends-section">
                <h4>💼 Live Job Market Intelligence</h4>
                <div class="live-job-market">
                    <div class="market-overview">
                        <div class="market-stat">
                            <span class="stat-value">${liveJobData.length}</span>
                            <span class="stat-label">Careers Tracked</span>
                        </div>
                        <div class="market-stat">
                            <span class="stat-value">${liveJobData.reduce((sum, job) => sum + job.openings, 0).toLocaleString()}</span>
                            <span class="stat-label">Total Openings</span>
                        </div>
                        <div class="market-stat">
                            <span class="stat-value">${new Date().toLocaleDateString()}</span>
                            <span class="stat-label">Last Updated</span>
                        </div>
                    </div>
                    
                    <div class="live-jobs-grid">
                        ${liveJobData.map(job => `
                            <div class="live-job-card">
                                <div class="job-header">
                                    <h5>${job.career}</h5>
                                    <div class="job-trend ${job.trend}">
                                        ${job.trend === 'up' ? '📈' : job.trend === 'down' ? '📉' : '➡️'} ${job.trend}
                                    </div>
                                </div>
                                <div class="job-metrics">
                                    <div class="metric">
                                        <span class="metric-label">Openings</span>
                                        <span class="metric-value">${job.openings.toLocaleString()}</span>
                                    </div>
                                    <div class="metric">
                                        <span class="metric-label">Location</span>
                                        <span class="metric-value">${job.location}</span>
                                    </div>
                                </div>
                                <button class="btn btn-small btn-primary" onclick="getSalaryInsights('${job.career}')">
                                    💰 Salary Insights
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="market-actions">
                        <button class="btn btn-secondary" onclick="refreshLiveJobData()">
                            🔄 Refresh Data
                        </button>
                        <button class="btn btn-primary" onclick="showAnalyticsTab('salary')">
                            💰 Explore All Salaries
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Salary Insights Functions
async function getSalaryInsights(careerParam = null) {
    if (careerParam) { trackEvent('salary_insights_from_prediction'); }
    const career = careerParam || document.getElementById('salaryCareerInput').value.trim();
    const location = document.getElementById('salaryLocationSelect').value;
    const experience = document.getElementById('salaryExperienceSelect').value;

    if (!career) {
        showNotification('Please enter a career title', 'warning');
        return;
    }

    try {
        document.getElementById('salaryResults').innerHTML = `
            <div class="loading-spinner"></div>
            <p>Loading salary insights for ${career}...</p>
        `;
        trackEvent('salary_insights_query', { career, location, experience });

        const response = await fetch(`/api/analytics/salary-insights?career=${encodeURIComponent(career)}&location=${encodeURIComponent(location)}&experience=${encodeURIComponent(experience)}`);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const insights = await response.json();
        displaySalaryInsights(insights);

        // Update salary tab if called from predictions
        if (careerParam) {
            showAnalyticsTab('salary');
            document.getElementById('salaryCareerInput').value = career;
        }
    } catch (error) {
        console.error('Error loading salary insights:', error);
        document.getElementById('salaryResults').innerHTML = `
            <div class="error-message">
                <p>Unable to load salary insights. Please try again.</p>
                <button onclick="getSalaryInsights()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

function displaySalaryInsights(insights) {
    const container = document.getElementById('salaryResults');

    container.innerHTML = `
        <div class="salary-insights-content">
            <div class="salary-header">
                <h4>${insights.career} Salary Insights</h4>
                <div class="salary-meta">
                    <span>📍 ${insights.location}</span>
                    <span>🎯 ${insights.experience.charAt(0).toUpperCase() + insights.experience.slice(1)} Level</span>
                    <span>📅 Updated ${insights.lastUpdated}</span>
                </div>
            </div>

            <div class="salary-overview">
                <div class="salary-range">
                    <div class="salary-stat">
                        <span class="salary-label">Minimum</span>
                        <span class="salary-value">${insights.currency === 'INR' ? '₹' : '$'}${insights.salary.min.toLocaleString()}</span>
                    </div>
                    <div class="salary-stat highlight">
                        <span class="salary-label">Median</span>
                        <span class="salary-value">${insights.currency === 'INR' ? '₹' : '$'}${insights.salary.median.toLocaleString()}</span>
                    </div>
                    <div class="salary-stat">
                        <span class="salary-label">Maximum</span>
                        <span class="salary-value">${insights.currency === 'INR' ? '₹' : '$'}${insights.salary.max.toLocaleString()}</span>
                    </div>
                </div>
                <div class="currency-info">
                    <small>💱 Displaying in ${insights.currency} | ${insights.isIndianLocation ? 'Indian market rates' : 'International rates'}</small>
                </div>
            </div>

            <div class="roi-section">
                <h5>📈 ROI Estimator</h5>
                <div class="roi-grid">
                    ${renderRoiStrip(insights)}
                </div>
                <small>Assumes learning cost of ${insights.isIndianLocation ? '₹45,000' : '$1,500'} and 6 months to employability. Adjust in settings later.</small>
            </div>

            <div class="benefits-section">
                <h5>📦 Typical Benefits</h5>
                <div class="benefits-grid">
                    <div class="benefit-item">
                        <span class="benefit-icon">🏥</span>
                        <span class="benefit-text">Health Insurance: ${insights.benefits.healthInsurance}</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">💰</span>
                        <span class="benefit-text">${insights.isIndianLocation ? 'EPF' : '401k'}: ${insights.benefits.providentFund || insights.benefits.retirement401k}</span>
                    </div>
                    ${insights.isIndianLocation ? `
                    <div class="benefit-item">
                        <span class="benefit-icon">🎁</span>
                        <span class="benefit-text">Gratuity: ${insights.benefits.gratuity}</span>
                    </div>
                    ` : ''}
                    <div class="benefit-item">
                        <span class="benefit-icon">🏖️</span>
                        <span class="benefit-text">PTO: ${insights.benefits.paidTimeOff}</span>
                    </div>
                    <div class="benefit-item">
                        <span class="benefit-icon">🏠</span>
                        <span class="benefit-text">Remote Work: ${insights.benefits.remoteWork}</span>
                    </div>
                </div>
            </div>

            <div class="negotiation-section">
                <h5>💡 Negotiation Tips</h5>
                <ul class="negotiation-tips">
                    ${insights.negotiationTips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Simple ROI estimator
function renderRoiStrip(insights) {
    // Indian education costs vs international
    const learningCost = insights.isIndianLocation ? 45000 : 1500; // ₹45,000 for Indian students
    const monthsToEmployability = 6;
    const monthlyMedian = Math.round(insights.salary.median / 12);
    
    // Indian living costs vs international
    const monthlyLivingCost = insights.isIndianLocation ? 15000 : 1200; // ₹15,000 for Indian students
    
    const paybackMonths = Math.max(1, Math.ceil(learningCost / Math.max(1, monthlyMedian - monthlyLivingCost)) + monthsToEmployability);
    const twoYearGain = Math.max(0, (monthlyMedian * 24) - (learningCost + monthlyLivingCost * 24));

    const currencySymbol = insights.currency === 'INR' ? '₹' : '$';
    const costDisplay = insights.isIndianLocation ? '₹45,000' : '$1,500';

    return `
        <div class="roi-item"><span class="roi-label">Payback</span><span class="roi-value">${paybackMonths} months</span></div>
        <div class="roi-item"><span class="roi-label">24-mo Net</span><span class="roi-value">${currencySymbol}${twoYearGain.toLocaleString()}</span></div>
        <div class="roi-item"><span class="roi-label">Learning Cost</span><span class="roi-value">${costDisplay}</span></div>
    `;
}

// Skills Gap Analysis Functions
async function analyzeSkillsGap() {
    if (!authManager.isAuthenticated()) {
        authManager.showLoginModal();
        return;
    }

    const targetCareer = document.getElementById('skillsCareerInput').value.trim();

    if (!targetCareer) {
        showNotification('Please enter a target career', 'warning');
        return;
    }

    try {
        document.getElementById('skillsResults').innerHTML = `
            <div class="loading-spinner"></div>
            <p>Analyzing skills gap for ${targetCareer}...</p>
        `;

        const response = await fetch(`/api/analytics/skills-gap?targetCareer=${encodeURIComponent(targetCareer)}`, {
            headers: authManager.getAuthHeader()
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const analysis = await response.json();
        displaySkillsGapAnalysis(analysis);
    } catch (error) {
        console.error('Error analyzing skills gap:', error);
        document.getElementById('skillsResults').innerHTML = `
            <div class="error-message">
                <p>Unable to analyze skills gap. Please try again.</p>
                <button onclick="analyzeSkillsGap()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

function displaySkillsGapAnalysis(analysis) {
    const container = document.getElementById('skillsResults');

    container.innerHTML = `
        <div class="skills-gap-content">
            <div class="gap-header">
                <h4>Skills Gap Analysis: ${analysis.targetCareer}</h4>
            </div>

            <div class="gap-summary">
                <div class="gap-stat">
                    <span class="gap-number">${analysis.recommendations.highPriority.length}</span>
                    <span class="gap-label">High Priority Skills</span>
                </div>
                <div class="gap-stat">
                    <span class="gap-number">${analysis.recommendations.mediumPriority.length}</span>
                    <span class="gap-label">Medium Priority Skills</span>
                </div>
                <div class="gap-stat">
                    <span class="gap-number">${analysis.recommendations.strengths.length}</span>
                    <span class="gap-label">Current Strengths</span>
                </div>
            </div>

            <div class="skills-breakdown">
                <div class="skills-grid">
                    ${analysis.skillsGap.map(skill => `
                        <div class="skill-gap-item priority-${skill.priority}">
                            <div class="skill-header">
                                <span class="skill-name">${skill.skill}</span>
                                <span class="priority-badge ${skill.priority}">${skill.priority} priority</span>
                            </div>
                            <div class="skill-levels">
                                <div class="level-indicator">
                                    <span class="level-label">Current</span>
                                    <div class="level-bar">
                                        <div class="level-fill" style="width: ${(skill.currentLevel / 5) * 100}%"></div>
                                    </div>
                                    <span class="level-value">${skill.currentLevel}/5</span>
                                </div>
                                <div class="level-indicator">
                                    <span class="level-label">Target</span>
                                    <div class="level-bar">
                                        <div class="level-fill target" style="width: ${(skill.targetLevel / 5) * 100}%"></div>
                                    </div>
                                    <span class="level-value">${skill.targetLevel}/5</span>
                                </div>
                            </div>
                            <div class="gap-indicator">
                                <span class="gap-text">Gap: ${skill.gap} level${skill.gap !== 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="recommendations-section">
                <h5>📚 Learning Recommendations</h5>
                <div class="recommendations-tabs">
                    <button class="rec-tab active" onclick="showRecommendationTab('high')">High Priority</button>
                    <button class="rec-tab" onclick="showRecommendationTab('medium')">Medium Priority</button>
                    <button class="rec-tab" onclick="showRecommendationTab('strengths')">Strengths</button>
                </div>

                <div class="recommendations-content">
                    <div id="highRec" class="rec-content active">
                        ${analysis.recommendations.highPriority.length > 0 ? 
                            analysis.recommendations.highPriority.map(skill => `<div class="skill-rec high">${skill}</div>`).join('') :
                            '<p>No high priority skills to develop!</p>'
                        }
                    </div>
                    <div id="mediumRec" class="rec-content">
                        ${analysis.recommendations.mediumPriority.length > 0 ? 
                            analysis.recommendations.mediumPriority.map(skill => `<div class="skill-rec medium">${skill}</div>`).join('') :
                            '<p>No medium priority skills to develop!</p>'
                        }
                    </div>
                    <div id="strengthsRec" class="rec-content">
                        ${analysis.recommendations.strengths.length > 0 ? 
                            analysis.recommendations.strengths.map(skill => `<div class="skill-rec strength">${skill}</div>`).join('') :
                            '<p>Complete an assessment to identify your strengths!</p>'
                        }
                    </div>
                </div>
            </div>

            <div class="gap-actions">
                <button class="btn btn-primary" onclick="showSection('learning-section')">Find Learning Resources</button>
                <button class="btn btn-secondary" onclick="retakeQuiz()">Retake Assessment</button>
            </div>
        </div>
    `;
}

function showRecommendationTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.rec-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Update content
    document.querySelectorAll('.rec-content').forEach(content => content.classList.remove('active'));
    document.getElementById(tabName + 'Rec').classList.add('active');
}

// Event delegation for start course buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('start-course-btn')) {
        event.stopPropagation();
        const resourceId = event.target.getAttribute('data-resource-id');
        const resourceTitle = event.target.getAttribute('data-resource-title');
        startCourse(resourceId, resourceTitle);
    }

    if (event.target.classList.contains('complete-course-btn')) {
        event.stopPropagation();
        const resourceId = event.target.getAttribute('data-resource-id');
        const resourceTitle = event.target.getAttribute('data-resource-title');
        completeCourse(resourceId, resourceTitle);
    }
});

// AI Twin Functions
async function loadAITwinSimulations() {
    console.log('loadAITwinSimulations function called'); // Debug log
    
    // For now, let's show the AI Twin interface regardless of authentication
    // This will help us test if the basic functionality works
    try {
        console.log('Looking for AI Twin elements...'); // Debug log
        
        // Find the auth message within the AI Twin container
        const authMessage = document.querySelector('#aiTwinContainer .auth-required-message');
        const aiTwinGrid = document.getElementById('aiTwinGrid');
        
        console.log('Auth message element:', authMessage); // Debug log
        console.log('AI Twin grid element:', aiTwinGrid); // Debug log
        
        if (authMessage) {
            authMessage.style.display = 'none';
            console.log('Auth message hidden'); // Debug log
        }
        if (aiTwinGrid) {
            aiTwinGrid.style.display = 'block';
            console.log('AI Twin grid shown'); // Debug log
        }
        
        // Display AI Twin interface
        console.log('Calling displayAITwinInterface...'); // Debug log
        displayAITwinInterface();
        
    } catch (error) {
        console.error('Error loading AI Twin:', error);
        document.getElementById('aiTwinContainer').innerHTML = `
            <div class="error-message">
                <p>Unable to load AI Twin. Please try again.</p>
                <button onclick="loadAITwinSimulations()" class="btn btn-primary">Retry</button>
            </div>
        `;
    }
}

function displayAITwinInterface() {
    console.log('displayAITwinInterface function called'); // Debug log
    const container = document.getElementById('aiTwinGrid');
    console.log('Container element:', container); // Debug log
    
    if (!container) {
        console.error('aiTwinGrid container not found!'); // Debug log
        return;
    }
    
    container.innerHTML = `
        <div class="ai-twin-overview">
            <div class="ai-twin-summary">
                <h4>🧠 Your AI Career Twin</h4>
                <p>Simulate different career paths and get personalized predictions based on your profile</p>
            </div>
        </div>

        <div class="simulation-types">
            <h5>🎯 Choose Simulation Type</h5>
            <div class="simulation-grid">
                <div class="simulation-card" onclick="runAITwinSimulation('career_progression')">
                    <div class="simulation-icon">📈</div>
                    <h6>Career Progression</h6>
                    <p>See your career growth over 5-10 years with salary progression</p>
                </div>
                
                <div class="simulation-card" onclick="runAITwinSimulation('skill_development')">
                    <div class="simulation-icon">🎓</div>
                    <h6>Skill Development</h6>
                    <p>Plan your learning journey with time and cost estimates</p>
                </div>
                
                <div class="simulation-card" onclick="runAITwinSimulation('market_adaptation')">
                    <div class="simulation-icon">🌍</div>
                    <h6>Market Adaptation</h6>
                    <p>Explore different market scenarios and adaptation strategies</p>
                </div>
                
                <div class="simulation-card" onclick="runAITwinSimulation('startup_journey')">
                    <div class="simulation-icon">🚀</div>
                    <h6>Startup Journey</h6>
                    <p>Simulate your entrepreneurial path with success probabilities</p>
                </div>
                
                <div class="simulation-card" onclick="runAITwinSimulation('international_expansion')">
                    <div class="simulation-icon">✈️</div>
                    <h6>International Expansion</h6>
                    <p>Explore global career opportunities and requirements</p>
                </div>
            </div>
        </div>

        <div class="ai-twin-actions">
            <h5>🔮 Quick Predictions</h5>
            <div class="prediction-quick">
                <div class="prediction-input">
                    <input type="text" id="quickCareerInput" placeholder="Enter target career..." list="careerOptions">
                    <select id="quickTimelineSelect">
                        <option value="1year">1 Year</option>
                        <option value="3years">3 Years</option>
                        <option value="5years" selected>5 Years</option>
                    </select>
                    <button class="btn btn-primary" onclick="getQuickPrediction()">🔮 Predict Success</button>
                </div>
            </div>
        </div>

        <div class="simulation-results" id="simulationResults" style="display: none;">
            <!-- Simulation results will be displayed here -->
        </div>
    `;
}

async function runAITwinSimulation(simulationType) {
    // Temporarily remove authentication check for testing
    // if (!authManager.isAuthenticated()) {
    //     authManager.showLoginModal();
    //     return;
    // }

    const careerPath = prompt('Enter your target career path:') || 'Software Developer';
    
    console.log('Starting simulation for:', careerPath, 'Type:', simulationType); // Debug log
    
    if (!careerPath || careerPath.trim() === '') {
        showNotification('Please enter a valid career path', 'warning');
        return;
    }
    
    try {
        // For testing, create a mock simulation instead of calling the API
        console.log('Generating mock simulation...'); // Debug log
        const mockSimulation = generateMockSimulation(careerPath, simulationType);
        console.log('Mock simulation generated:', mockSimulation); // Debug log
        
        console.log('Displaying simulation results...'); // Debug log
        displaySimulationResults(mockSimulation);
        console.log('Simulation results displayed successfully'); // Debug log
        
        // Uncomment this when authentication is working
        /*
        const response = await fetch('/api/ai-twin/simulate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authManager.getAuthHeader()
            },
            body: JSON.stringify({
                careerPath,
                simulationType,
                userProfile: {
                    experience_level: 'mid',
                    location: 'India'
                }
            })
        });

        if (response.ok) {
            const result = await response.json();
            displaySimulationResults(result.simulation);
        } else {
            throw new Error('Simulation failed');
        }
        */
    } catch (error) {
        console.error('Error running simulation:', error);
        console.error('Error details:', error.message, error.stack); // More detailed error logging
        showNotification('Failed to run simulation. Please try again.', 'error');
    }
}

// Mock simulation function for testing
function generateMockSimulation(careerPath, simulationType) {
    const baseSimulation = {
        careerPath,
        type: simulationType,
        overallSuccessProbability: 0.75 + (Math.random() * 0.2)
    };
    
    switch (simulationType) {
        case 'career_progression':
            return {
                ...baseSimulation,
                progressionStages: [
                    {
                        stage: 'Year 1-2',
                        role: 'Junior ' + careerPath,
                        salary: '₹4-6 LPA',
                        skills: ['Core Skills', 'Basic Tools', 'Team Collaboration'],
                        challenges: ['Learning Curve', 'Quality Standards', 'Time Management'],
                        opportunities: ['Mentorship', 'Skill Development', 'Project Exposure'],
                        successProbability: 0.85
                    },
                    {
                        stage: 'Year 3-5',
                        role: 'Mid-Level ' + careerPath,
                        salary: '₹8-15 LPA',
                        skills: ['Advanced Skills', 'System Design', 'Leadership'],
                        challenges: ['Technical Debt', 'Team Coordination', 'Architecture'],
                        opportunities: ['Technical Leadership', 'Mentoring', 'Specialization'],
                        successProbability: 0.75
                    },
                    {
                        stage: 'Year 6-8',
                        role: 'Senior ' + careerPath,
                        salary: '₹18-30 LPA',
                        skills: ['System Architecture', 'Team Leadership', 'Strategic Thinking'],
                        challenges: ['Complex Systems', 'Team Management', 'Business Impact'],
                        opportunities: ['Technical Architecture', 'Team Leadership', 'Strategy'],
                        successProbability: 0.65
                    }
                ],
                keyFactors: {
                    strengths: ['Technical Aptitude', 'Problem Solving', 'Continuous Learning'],
                    areasForImprovement: ['Communication Skills', 'Leadership', 'Business Acumen']
                },
                recommendations: [
                    'Focus on building a strong technical foundation',
                    'Develop soft skills like communication and leadership',
                    'Build a portfolio of real-world projects',
                    'Network with professionals in your field',
                    'Stay updated with latest industry trends'
                ]
            };
            
        case 'startup_journey':
            return {
                ...baseSimulation,
                startupPhases: [
                    {
                        phase: 'Ideation & Validation',
                        duration: '3-6 months',
                        successProbability: 0.6,
                        challenges: ['Market Research', 'Idea Validation', 'Team Building'],
                        opportunities: ['Market Gap', 'Innovation', 'Early Adopters']
                    },
                    {
                        phase: 'MVP Development',
                        duration: '6-12 months',
                        successProbability: 0.5,
                        challenges: ['Technical Development', 'User Feedback', 'Resource Constraints'],
                        opportunities: ['Product Launch', 'User Acquisition', 'Investor Interest']
                    },
                    {
                        phase: 'Growth & Scaling',
                        duration: '1-3 years',
                        successProbability: 0.4,
                        challenges: ['Scaling Operations', 'Market Competition', 'Team Growth'],
                        opportunities: ['Market Expansion', 'Partnerships', 'Exit Options']
                    }
                ],
                recommendations: [
                    'Build a strong founding team with complementary skills',
                    'Validate your idea with potential customers early',
                    'Focus on solving a real problem, not just building features',
                    'Prepare for the long journey ahead - startups take time'
                ]
            };
            
        case 'international_expansion':
            return {
                ...baseSimulation,
                expansionOptions: [
                    {
                        country: 'United States',
                        successProbability: 0.7,
                        requirements: ['H1B Visa', 'Advanced Skills', 'Cultural Adaptation'],
                        timeline: '1-2 years',
                        salaryRange: '$80K-150K'
                    },
                    {
                        country: 'United Kingdom',
                        successProbability: 0.65,
                        requirements: ['Skilled Worker Visa', 'Professional Experience', 'English Proficiency'],
                        timeline: '6-18 months',
                        salaryRange: '£45K-85K'
                    },
                    {
                        country: 'Canada',
                        successProbability: 0.75,
                        requirements: ['Express Entry', 'Language Skills', 'Education Assessment'],
                        timeline: '8-24 months',
                        salaryRange: 'C$70K-130K'
                    }
                ],
                recommendations: [
                    'Start visa application process early (can take 6-18 months)',
                    'Build strong professional references and portfolio',
                    'Research cultural differences and work environment',
                    'Consider language requirements and certifications',
                    'Network with expats and professionals in target countries'
                ]
            };
            
        case 'skill_development':
            return {
                ...baseSimulation,
                totalInvestment: {
                    time: '6-12 months',
                    cost: '₹50,000 - ₹2,00,000',
                    duration: '500-1000 hours'
                },
                skillRoadmap: {
                    foundation: {
                        timeframe: 'Months 1-3',
                        skills: ['Core Programming', 'Basic Tools', 'Fundamentals'],
                        resources: ['Online Courses', 'Books', 'Practice Projects'],
                        estimatedHours: 200,
                        successProbability: 0.8
                    },
                    intermediate: {
                        timeframe: 'Months 4-8',
                        skills: ['Advanced Concepts', 'Frameworks', 'Best Practices'],
                        resources: ['Advanced Courses', 'Mentorship', 'Real Projects'],
                        estimatedHours: 400,
                        successProbability: 0.7
                    },
                    advanced: {
                        timeframe: 'Months 9-12',
                        skills: ['Specialization', 'Architecture', 'Leadership'],
                        resources: ['Specialized Training', 'Industry Projects', 'Networking'],
                        estimatedHours: 400,
                        successProbability: 0.6
                    }
                },
                marketValue: {
                    entryLevel: '₹4-8 LPA',
                    midLevel: '₹8-15 LPA',
                    seniorLevel: '₹15-30 LPA'
                },
                recommendations: [
                    'Start with fundamentals and build a strong foundation',
                    'Work on real projects to apply your learning',
                    'Get mentorship from experienced professionals',
                    'Stay updated with industry trends and technologies',
                    'Build a portfolio to showcase your skills'
                ]
            };
            
        case 'market_adaptation':
            return {
                ...baseSimulation,
                marketScenarios: [
                    {
                        scenario: 'Tech Boom',
                        probability: 0.3,
                        impact: 'High demand, rising salaries, many opportunities',
                        adaptation: 'Focus on emerging technologies, build specialized skills'
                    },
                    {
                        scenario: 'Market Stability',
                        probability: 0.5,
                        impact: 'Steady growth, moderate demand, stable salaries',
                        adaptation: 'Maintain current skills, focus on efficiency and quality'
                    },
                    {
                        scenario: 'Economic Downturn',
                        probability: 0.2,
                        impact: 'Reduced demand, salary pressure, fewer opportunities',
                        adaptation: 'Diversify skills, focus on cost-effective solutions, network actively'
                    }
                ],
                recommendations: [
                    'Build a diverse skill set to adapt to market changes',
                    'Stay updated with industry trends and emerging technologies',
                    'Network actively to stay informed about market conditions',
                    'Focus on transferable skills that work across industries',
                    'Maintain financial stability to weather market fluctuations'
                ]
            };
            
        default:
            return {
                ...baseSimulation,
                message: 'Simulation type not implemented yet'
            };
    }
}

function displaySimulationResults(simulation) {
    const container = document.getElementById('simulationResults');
    container.style.display = 'block';
    
    let content = '';
    
    switch (simulation.type) {
        case 'career_progression':
            content = displayCareerProgressionResults(simulation);
            break;
        case 'skill_development':
            content = displaySkillDevelopmentResults(simulation);
            break;
        case 'market_adaptation':
            content = displayMarketAdaptationResults(simulation);
            break;
        case 'startup_journey':
            content = displayStartupJourneyResults(simulation);
            break;
        case 'international_expansion':
            content = displayInternationalExpansionResults(simulation);
            break;
        default:
            content = '<p>Unknown simulation type</p>';
    }
    
    container.innerHTML = `
        <div class="simulation-header">
            <h4>🧠 AI Twin Simulation Results</h4>
            <p>${simulation.careerPath} - ${simulation.type.replace('_', ' ').toUpperCase()}</p>
        </div>
        ${content}
        <div class="simulation-actions">
            <button class="btn btn-secondary" onclick="runAITwinSimulation('${simulation.type}')">🔄 Run Again</button>
            <button class="btn btn-primary" onclick="showSection('learning-section')">📚 Find Learning Resources</button>
        </div>
    `;
    
    // Scroll to results
    container.scrollIntoView({ behavior: 'smooth' });
}

function displayCareerProgressionResults(simulation) {
    return `
        <div class="progression-results">
            <div class="overall-probability">
                <div class="probability-circle">
                    <span class="probability-number">${Math.round(simulation.overallSuccessProbability * 100)}%</span>
                    <span class="probability-label">Overall Success</span>
                </div>
            </div>
            
            <div class="progression-timeline">
                ${simulation.progressionStages.map(stage => `
                    <div class="timeline-stage">
                        <div class="stage-header">
                            <h6>${stage.stage}</h6>
                            <span class="stage-role">${stage.role}</span>
                        </div>
                        <div class="stage-details">
                            <div class="stage-salary">💰 ${stage.salary}</div>
                            <div class="stage-probability">🎯 ${Math.round(stage.successProbability * 100)}% success</div>
                        </div>
                        <div class="stage-skills">
                            <h6>Skills Required:</h6>
                            <div class="skills-tags">
                                ${stage.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            </div>
                        </div>
                        <div class="stage-challenges">
                            <h6>Challenges:</h6>
                            <ul>
                                ${stage.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="stage-opportunities">
                            <h6>Opportunities:</h6>
                            <ul>
                                ${stage.opportunities.map(opportunity => `<li>${opportunity}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="key-factors">
                <h6>🎯 Key Success Factors:</h6>
                <div class="factors-grid">
                    <div class="factor-item">
                        <span class="factor-label">Strengths:</span>
                        <div class="factor-tags">
                            ${simulation.keyFactors.strengths.map(strength => `<span class="factor-tag strength">${strength}</span>`).join('')}
                        </div>
                    </div>
                    <div class="factor-item">
                        <span class="factor-label">Improve:</span>
                        <div class="factor-tags">
                            ${simulation.keyFactors.areasForImprovement.map(area => `<span class="factor-tag improvement">${area}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="recommendations">
                <h6>💡 Recommendations:</h6>
                <ul>
                    ${simulation.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function displaySkillDevelopmentResults(simulation) {
    return `
        <div class="skill-development-results">
            <div class="investment-summary">
                <h6>💰 Total Investment Required:</h6>
                <div class="investment-grid">
                    <div class="investment-item">
                        <span class="investment-label">Time:</span>
                        <span class="investment-value">${simulation.totalInvestment.time}</span>
                    </div>
                    <div class="investment-item">
                        <span class="investment-label">Cost:</span>
                        <span class="investment-value">${simulation.totalInvestment.cost}</span>
                    </div>
                    <div class="investment-item">
                        <span class="investment-label">Duration:</span>
                        <span class="investment-value">${simulation.totalInvestment.duration}</span>
                    </div>
                </div>
            </div>
            
            <div class="skill-roadmap">
                <h6>🎓 Skill Development Roadmap:</h6>
                <div class="roadmap-timeline">
                    ${Object.entries(simulation.skillRoadmap).map(([phase, details]) => `
                        <div class="roadmap-phase">
                            <div class="phase-header">
                                <h6>${phase.charAt(0).toUpperCase() + phase.slice(1)}</h6>
                                <span class="phase-timeframe">${details.timeframe}</span>
                            </div>
                            <div class="phase-details">
                                <div class="phase-skills">
                                    <strong>Skills:</strong>
                                    <div class="skills-tags">
                                        ${details.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                    </div>
                                </div>
                                <div class="phase-resources">
                                    <strong>Resources:</strong>
                                    <div class="resources-tags">
                                        ${details.resources.map(resource => `<span class="resource-tag">${resource}</span>`).join('')}
                                    </div>
                                </div>
                                <div class="phase-metrics">
                                    <span class="hours">⏱️ ${details.estimatedHours} hours</span>
                                    <span class="probability">🎯 ${Math.round(details.successProbability * 100)}% success</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="market-value">
                <h6>📈 Expected Market Value:</h6>
                <div class="market-value-grid">
                    <div class="market-value-item">
                        <span class="market-label">Entry Level:</span>
                        <span class="market-value">${simulation.marketValue.entryLevel}</span>
                    </div>
                    <div class="market-value-item">
                        <span class="market-label">Mid Level:</span>
                        <span class="market-value">${simulation.marketValue.midLevel}</span>
                    </div>
                    <div class="market-value-item">
                        <span class="market-label">Senior Level:</span>
                        <span class="market-value">${simulation.marketValue.seniorLevel}</span>
                    </div>
                </div>
            </div>
            
            <div class="recommendations">
                <h6>💡 Recommendations:</h6>
                <ul>
                    ${simulation.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function displayMarketAdaptationResults(simulation) {
    return `
        <div class="market-adaptation-results">
            <div class="market-overview">
                <h6>📊 Market Overview:</h6>
                <div class="market-overview-grid">
                    <div class="overview-item">
                        <span class="overview-label">Expected Growth:</span>
                        <span class="overview-value">${simulation.expectedOutcome.averageSalaryGrowth}</span>
                    </div>
                    <div class="overview-item">
                        <span class="overview-label">Career Stability:</span>
                        <span class="overview-value">${simulation.expectedOutcome.careerStability}</span>
                    </div>
                    <div class="overview-item">
                        <span class="overview-label">Market Demand:</span>
                        <span class="overview-value">${simulation.expectedOutcome.marketDemand}</span>
                    </div>
                    <div class="overview-item">
                        <span class="overview-label">Adaptability Score:</span>
                        <span class="overview-value">${Math.round(simulation.expectedOutcome.adaptabilityScore * 100)}%</span>
                    </div>
                </div>
            </div>
            
            <div class="market-scenarios">
                <h6>🌍 Market Scenarios:</h6>
                <div class="scenarios-grid">
                    ${simulation.marketScenarios.map(scenario => `
                        <div class="scenario-card ${scenario.probability > 0.4 ? 'high-probability' : scenario.probability > 0.2 ? 'medium-probability' : 'low-probability'}">
                            <div class="scenario-header">
                                <h6>${scenario.scenario}</h6>
                                <span class="scenario-probability">${Math.round(scenario.probability * 100)}%</span>
                            </div>
                            <div class="scenario-details">
                                <div class="scenario-metrics">
                                    <span class="salary-growth">📈 ${scenario.salaryGrowth}</span>
                                    <span class="demand">📊 ${scenario.demand}</span>
                                </div>
                                <div class="scenario-opportunities">
                                    <strong>Opportunities:</strong>
                                    <ul>
                                        ${scenario.opportunities.map(opp => `<li>${opp}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="scenario-risks">
                                    <strong>Risks:</strong>
                                    <ul>
                                        ${scenario.risks.map(risk => `<li>${risk}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="scenario-recommendations">
                                    <strong>Recommendations:</strong>
                                    <ul>
                                        ${scenario.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="adaptation-strategies">
                <h6>🎯 Adaptation Strategies:</h6>
                <ul>
                    ${simulation.adaptationStrategies.map(strategy => `<li>${strategy}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function displayStartupJourneyResults(simulation) {
    return `
        <div class="startup-journey-results">
            <div class="startup-overview">
                <div class="overall-probability">
                    <div class="probability-circle startup">
                        <span class="probability-number">${Math.round(simulation.overallSuccessProbability * 100)}%</span>
                        <span class="probability-label">Startup Success</span>
                    </div>
                </div>
                <p class="startup-note">⚠️ Note: Startup success rates are typically low. This simulation shows realistic probabilities.</p>
            </div>
            
            <div class="startup-phases">
                <h6>🚀 Startup Journey Phases:</h6>
                <div class="phases-timeline">
                    ${simulation.startupPhases.map(phase => `
                        <div class="phase-card">
                            <div class="phase-header">
                                <h6>${phase.phase}</h6>
                                <span class="phase-duration">${phase.duration}</span>
                            </div>
                            <div class="phase-details">
                                <div class="phase-activities">
                                    <strong>Activities:</strong>
                                    <div class="activities-tags">
                                        ${phase.activities.map(activity => `<span class="activity-tag">${activity}</span>`).join('')}
                                    </div>
                                </div>
                                <div class="phase-skills">
                                    <strong>Skills Required:</strong>
                                    <div class="skills-tags">
                                        ${phase.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                                    </div>
                                </div>
                                <div class="phase-metrics">
                                    <span class="success-probability">🎯 ${Math.round(phase.successProbability * 100)}% success</span>
                                    <span class="funding">💰 ${phase.funding}</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="startup-factors">
                <div class="success-factors">
                    <h6>✅ Key Success Factors:</h6>
                    <ul>
                        ${simulation.keySuccessFactors.map(factor => `<li>${factor}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="risk-mitigation">
                    <h6>🛡️ Risk Mitigation:</h6>
                    <ul>
                        ${simulation.riskMitigation.map(risk => `<li>${risk}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="recommendations">
                <h6>💡 Recommendations:</h6>
                <ul>
                    ${simulation.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

function displayInternationalExpansionResults(simulation) {
    return `
        <div class="international-expansion-results">
            <div class="expansion-overview">
                <div class="overall-probability">
                    <div class="probability-circle international">
                        <span class="probability-number">${Math.round(simulation.overallSuccessProbability * 100)}%</span>
                        <span class="probability-label">International Success</span>
                    </div>
                </div>
            </div>
            
            <div class="international-markets">
                <h6>🌍 International Markets:</h6>
                <div class="markets-grid">
                    ${simulation.internationalMarkets.map(market => `
                        <div class="market-card ${market.successProbability > 0.5 ? 'high-probability' : market.successProbability > 0.3 ? 'medium-probability' : 'low-probability'}">
                            <div class="market-header">
                                <h6>${market.market}</h6>
                                <span class="market-probability">${Math.round(market.successProbability * 100)}%</span>
                            </div>
                            <div class="market-details">
                                <div class="market-metrics">
                                    <span class="demand">📊 ${market.demand}</span>
                                    <span class="salary">💰 ${market.salary}</span>
                                    <span class="visa-complexity">🛂 ${market.visaComplexity}</span>
                                </div>
                                <div class="market-requirements">
                                    <strong>Requirements:</strong>
                                    <ul>
                                        ${market.requirements.map(req => `<li>${req}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="market-timeline">
                                    <strong>Timeline:</strong> ${market.timeline}
                                </div>
                                <div class="market-investment">
                                    <strong>Investment:</strong> ${market.investment}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="preparation-timeline">
                <h6>⏰ Preparation Timeline:</h6>
                <div class="timeline-steps">
                    ${simulation.preparationTimeline.map(step => `
                        <div class="timeline-step">
                            <span class="step-timeframe">${step}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="key-factors">
                <h6>🎯 Key Factors for Success:</h6>
                <ul>
                    ${simulation.keyFactors.map(factor => `<li>${factor}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recommendations">
                <h6>💡 Recommendations:</h6>
                <ul>
                    ${simulation.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

async function getQuickPrediction() {
    const careerPath = document.getElementById('quickCareerInput').value.trim();
    const timeline = document.getElementById('quickTimelineSelect').value;
    
    if (!careerPath) {
        showNotification('Please enter a career path', 'warning');
        return;
    }
    
    // Temporarily remove authentication requirement for testing
    // if (!authManager.isAuthenticated()) {
    //     showNotification('Please sign in to get predictions', 'warning');
    //     return;
    // }
    
    try {
        // For testing, create a mock prediction instead of calling the API
        const mockPrediction = generateMockPrediction(careerPath, timeline);
        displayQuickPrediction(mockPrediction);
        
        // Uncomment this when authentication is working
        /*
        const response = await fetch('/api/ai-twin/predict-success', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authManager.getAuthHeader()
            },
            body: JSON.stringify({
                careerPath,
                targetRole: careerPath,
                timeline
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            displayQuickPrediction(result.prediction);
        } else {
            throw new Error('Prediction failed');
        }
        */
    } catch (error) {
        console.error('Error getting prediction:', error);
        showNotification('Failed to get prediction. Please try again.', 'error');
    }
}

// Mock prediction function for testing
function generateMockPrediction(careerPath, timeline) {
    const baseProbability = 0.75; // Base success probability
    const careerMultipliers = {
        'Data Scientist': 1.2,
        'Software Developer': 1.1,
        'AI/ML Engineer': 1.3,
        'Product Manager': 1.0,
        'UX Designer': 0.9
    };
    
    const timelineMultipliers = {
        '1 Year': 0.6,
        '3 Years': 0.8,
        '5 Years': 1.0,
        '10 Years': 1.2
    };
    
    const careerMultiplier = careerMultipliers[careerPath] || 1.0;
    const timelineMultiplier = timelineMultipliers[timeline] || 1.0;
    
    const successProbability = Math.min(0.95, baseProbability * careerMultiplier * timelineMultiplier);
    
    return {
        careerPath,
        targetRole: careerPath,
        timeline,
        successProbability,
        confidence: 'High',
        breakdown: {
            skillMatch: 0.8 + (Math.random() * 0.2),
            personalityFit: 0.7 + (Math.random() * 0.2),
            marketDemand: 0.85 + (Math.random() * 0.1),
            experienceGap: 0.6 + (Math.random() * 0.3)
        },
        recommendations: [
            'Focus on developing core technical skills',
            'Build a strong portfolio of projects',
            'Network with professionals in the field',
            'Stay updated with industry trends',
            'Consider relevant certifications'
        ]
    };
}

function displayQuickPrediction(prediction) {
    const container = document.getElementById('simulationResults');
    container.style.display = 'block';
    
    container.innerHTML = `
        <div class="quick-prediction">
            <div class="prediction-header">
                <h4>🔮 Quick Success Prediction</h4>
                <p>${prediction.careerPath} - ${prediction.timeline}</p>
            </div>
            
            <div class="prediction-overview">
                <div class="success-probability">
                    <div class="probability-circle quick">
                        <span class="probability-number">${Math.round(prediction.successProbability * 100)}%</span>
                        <span class="probability-label">Success Probability</span>
                    </div>
                </div>
                
                <div class="prediction-breakdown">
                    <h6>📊 Success Breakdown:</h6>
                    <div class="breakdown-grid">
                        <div class="breakdown-item">
                            <span class="breakdown-label">Skill Match:</span>
                            <span class="breakdown-value">${Math.round(prediction.breakdown.skillMatch * 100)}%</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="breakdown-label">Personality Fit:</span>
                            <span class="breakdown-value">${Math.round(prediction.breakdown.personalityFit * 100)}%</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="breakdown-label">Market Demand:</span>
                            <span class="breakdown-value">${Math.round(prediction.breakdown.marketDemand * 100)}%</span>
                        </div>
                        <div class="breakdown-item">
                            <span class="breakdown-label">Experience Gap:</span>
                            <span class="breakdown-value">${Math.round(prediction.breakdown.experienceGap * 100)}%</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="recommendations">
                <h6>💡 Recommendations:</h6>
                <ul>
                    ${prediction.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            
            <div class="prediction-actions">
                <button class="btn btn-secondary" onclick="getQuickPrediction()">🔄 New Prediction</button>
                <button class="btn btn-primary" onclick="runAITwinSimulation('career_progression')">🧠 Full Simulation</button>
            </div>
        </div>
    `;
    
    container.scrollIntoView({ behavior: 'smooth' });
}