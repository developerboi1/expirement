// Quantum Career Pathfinding System
class QuantumCareerPathfinding {
    constructor() {
        this.isInitialized = false;
        this.careerDimensions = ['skills', 'industry', 'location', 'timeline', 'risk'];
        this.simulationDepth = 5;
        this.pathComplexity = 7;
        this.quantumCanvas = null;
        this.paths = [];
        this.insights = [];
    }

    async initialize() {
        try {
            this.quantumCanvas = document.getElementById('quantumCanvas');
            if (!this.quantumCanvas) {
                console.error('Quantum canvas not found');
                return false;
            }

            // Initialize quantum algorithms
            await this.initializeQuantumAlgorithms();
            
            // Setup control listeners
            this.setupControlListeners();
            
            // Generate initial quantum state
            await this.generateQuantumState();
            
            this.isInitialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize quantum pathfinding:', error);
            return false;
        }
    }

    async initializeQuantumAlgorithms() {
        // Simulate quantum algorithm initialization
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    setupControlListeners() {
        // Simulation depth control
        const depthSlider = document.getElementById('simulationDepth');
        const depthValue = document.getElementById('depthValue');
        if (depthSlider && depthValue) {
            depthSlider.addEventListener('input', (e) => {
                this.simulationDepth = parseInt(e.target.value);
                depthValue.textContent = `${this.simulationDepth} years`;
            });
        }

        // Path complexity control
        const complexitySlider = document.getElementById('pathComplexity');
        const complexityValue = document.getElementById('complexityValue');
        if (complexitySlider && complexityValue) {
            complexitySlider.addEventListener('input', (e) => {
                this.pathComplexity = parseInt(e.target.value);
                complexityValue.textContent = `${this.pathComplexity}/10`;
            });
        }

        // Dimension toggles
        const dimensionToggles = document.querySelectorAll('.dimension-toggles input[type="checkbox"]');
        dimensionToggles.forEach((toggle, index) => {
            toggle.addEventListener('change', (e) => {
                this.careerDimensions[index] = e.target.checked ? 
                    ['skills', 'industry', 'location', 'timeline', 'risk'][index] : null;
            });
        });
    }

    async generateQuantumState() {
        if (!this.quantumCanvas) return;

        // Clear canvas
        this.quantumCanvas.innerHTML = `
            <div class="quantum-loading">
                <div class="quantum-spinner"></div>
                <p>Generating quantum career state...</p>
            </div>
        `;

        // Simulate quantum state generation
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Create quantum visualization
        this.createQuantumVisualization();
    }

    createQuantumVisualization() {
        if (!this.quantumCanvas) return;

        this.quantumCanvas.innerHTML = `
            <div class="quantum-visualization">
                <div class="quantum-particles"></div>
                <div class="quantum-paths"></div>
                <div class="quantum-nodes"></div>
            </div>
        `;

        // Generate quantum particles
        this.generateQuantumParticles();
        
        // Generate quantum paths
        this.generateQuantumPaths();
        
        // Generate quantum nodes
        this.generateQuantumNodes();
    }

    generateQuantumParticles() {
        const particlesContainer = this.quantumCanvas.querySelector('.quantum-particles');
        if (!particlesContainer) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'quantum-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #667eea;
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: quantum-float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    generateQuantumPaths() {
        const pathsContainer = this.quantumCanvas.querySelector('.quantum-paths');
        if (!pathsContainer) return;

        for (let i = 0; i < 8; i++) {
            const path = document.createElement('div');
            path.className = 'quantum-path';
            path.style.cssText = `
                left: ${20 + (i * 10)}%;
                top: 0;
                height: 100%;
                transform: rotate(${Math.random() * 30 - 15}deg);
            `;
            pathsContainer.appendChild(path);
        }
    }

    generateQuantumNodes() {
        const nodesContainer = this.quantumCanvas.querySelector('.quantum-nodes');
        if (!nodesContainer) return;

        for (let i = 0; i < 12; i++) {
            const node = document.createElement('div');
            node.className = 'quantum-node';
            node.style.cssText = `
                left: ${15 + (i * 6)}%;
                top: ${10 + (i * 7)}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            nodesContainer.appendChild(node);
        }
    }

    async generateCareerCombinations() {
        if (!this.isInitialized) {
            await this.initialize();
        }

        try {
            // Show loading state
            this.showQuantumLoading('Generating infinite career combinations...');

            // Generate career combinations using quantum algorithms
            const combinations = await this.generateQuantumCombinations();
            
            // Display results
            this.displayCareerCombinations(combinations);
            
        } catch (error) {
            console.error('Failed to generate career combinations:', error);
            this.showQuantumError('Failed to generate career combinations');
        }
    }

    async generateQuantumCombinations() {
        // Simulate quantum computation
        await new Promise(resolve => setTimeout(resolve, 3000));

        const baseCareers = [
            'Data Scientist', 'Software Engineer', 'Product Manager', 'UX Designer',
            'Marketing Manager', 'Financial Analyst', 'Business Analyst', 'DevOps Engineer',
            'AI Engineer', 'Cloud Architect', 'Cybersecurity Specialist', 'Data Engineer'
        ];

        const combinations = [];
        const numCombinations = Math.min(12, this.pathComplexity * 2);

        for (let i = 0; i < numCombinations; i++) {
            const baseCareer = baseCareers[Math.floor(Math.random() * baseCareers.length)];
            const specialization = this.generateSpecialization(baseCareer);
            const timeline = this.generateTimeline();
            const riskLevel = this.generateRiskLevel();
            const probability = this.calculateProbability(specialization, timeline, riskLevel);

            combinations.push({
                id: i + 1,
                baseCareer,
                specialization,
                timeline,
                riskLevel,
                probability,
                description: this.generateDescription(baseCareer, specialization, timeline),
                metrics: this.generateMetrics(specialization, timeline, riskLevel)
            });
        }

        return combinations.sort((a, b) => b.probability - a.probability);
    }

    generateSpecialization(baseCareer) {
        const specializations = {
            'Data Scientist': ['ML Engineer', 'AI Researcher', 'Data Engineer', 'Analytics Lead'],
            'Software Engineer': ['Full Stack Developer', 'Backend Engineer', 'Frontend Engineer', 'Mobile Developer'],
            'Product Manager': ['Technical PM', 'Growth PM', 'Enterprise PM', 'Platform PM'],
            'UX Designer': ['UI Designer', 'UX Researcher', 'Interaction Designer', 'Visual Designer']
        };

        const specs = specializations[baseCareer] || ['Specialist', 'Lead', 'Senior', 'Principal'];
        return specs[Math.floor(Math.random() * specs.length)];
    }

    generateTimeline() {
        const timelines = ['2-3 years', '3-5 years', '5-7 years', '7-10 years'];
        return timelines[Math.floor(Math.random() * timelines.length)];
    }

    generateRiskLevel() {
        const riskLevels = ['Low Risk', 'Medium Risk', 'High Risk', 'Very High Risk'];
        return riskLevels[Math.floor(Math.random() * riskLevels.length)];
    }

    calculateProbability(specialization, timeline, riskLevel) {
        let baseProb = 75;
        
        // Adjust based on risk level
        const riskMultiplier = {
            'Low Risk': 1.2,
            'Medium Risk': 1.0,
            'High Risk': 0.8,
            'Very High Risk': 0.6
        };
        
        // Adjust based on timeline
        const timelineMultiplier = {
            '2-3 years': 1.1,
            '3-5 years': 1.0,
            '5-7 years': 0.9,
            '7-10 years': 0.8
        };

        baseProb *= (riskMultiplier[riskLevel] || 1.0);
        baseProb *= (timelineMultiplier[timeline] || 1.0);
        
        return Math.min(95, Math.max(45, Math.round(baseProb)));
    }

    generateDescription(baseCareer, specialization, timeline) {
        const descriptions = [
            `Transform from ${baseCareer} to ${specialization} in ${timeline}. This path leverages your existing skills while building new expertise in emerging technologies.`,
            `Evolve your ${baseCareer} role into a ${specialization} position over ${timeline}. Focus on developing specialized skills and industry knowledge.`,
            `Transition from ${baseCareer} to ${specialization} within ${timeline}. This requires strategic skill development and market positioning.`
        ];
        
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    generateMetrics(specialization, timeline, riskLevel) {
        return {
            skillGap: Math.floor(Math.random() * 40) + 20,
            marketDemand: Math.floor(Math.random() * 30) + 70,
            salaryIncrease: Math.floor(Math.random() * 50) + 30,
            timeInvestment: Math.floor(Math.random() * 20) + 10
        };
    }

    displayCareerCombinations(combinations) {
        const resultsContainer = document.getElementById('quantumResults');
        const pathGrid = document.getElementById('pathGrid');
        
        if (!resultsContainer || !pathGrid) return;

        // Display path cards
        pathGrid.innerHTML = combinations.map(combo => `
            <div class="path-card">
                <div class="path-header">
                    <div class="path-title">${combo.baseCareer} → ${combo.specialization}</div>
                    <div class="path-probability">${combo.probability}%</div>
                </div>
                <div class="path-description">${combo.description}</div>
                <div class="path-metrics">
                    <div class="path-metric">
                        <span class="metric-value">${combo.metrics.skillGap}%</span>
                        <span class="metric-label">Skill Gap</span>
                    </div>
                    <div class="path-metric">
                        <span class="metric-value">${combo.metrics.marketDemand}%</span>
                        <span class="metric-label">Market Demand</span>
                    </div>
                    <div class="path-metric">
                        <span class="metric-value">${combo.metrics.salaryIncrease}%</span>
                        <span class="metric-label">Salary Increase</span>
                    </div>
                    <div class="path-metric">
                        <span class="metric-value">${combo.metrics.timeInvestment}h</span>
                        <span class="metric-label">Weekly Study</span>
                    </div>
                </div>
                <div class="path-actions">
                    <button class="btn-primary" onclick="quantumPathfinding.explorePath(${combo.id})">Explore Path</button>
                    <button class="btn-secondary" onclick="quantumPathfinding.savePath(${combo.id})">Save Path</button>
                </div>
            </div>
        `).join('');

        // Generate AI insights
        this.generateAIInsights(combinations);
        
        // Show results
        resultsContainer.style.display = 'block';
    }

    async generateAIInsights(combinations) {
        const insightCards = document.getElementById('insightCards');
        if (!insightCards) return;

        const insights = [
            {
                icon: '🎯',
                title: 'High-Probability Paths',
                description: `${combinations.filter(c => c.probability > 80).length} career paths show >80% success probability. Focus on these for immediate impact.`
            },
            {
                icon: '⚡',
                title: 'Quick Wins',
                description: `${combinations.filter(c => c.timeline.includes('2-3')).length} paths can be achieved in 2-3 years with focused effort.`
            },
            {
                icon: '🚀',
                title: 'High-Risk, High-Reward',
                description: `${combinations.filter(c => c.riskLevel.includes('High')).length} paths offer significant rewards but require careful planning.`
            },
            {
                icon: '💡',
                title: 'Emerging Trends',
                description: 'AI and data-focused specializations show the highest market demand and salary potential.'
            }
        ];

        insightCards.innerHTML = insights.map(insight => `
            <div class="insight-card">
                <div class="insight-icon">${insight.icon}</div>
                <div class="insight-title">${insight.title}</div>
                <div class="insight-description">${insight.description}</div>
            </div>
        `).join('');
    }

    async simulateParallelTimelines() {
        if (!this.isInitialized) {
            await this.initialize();
        }

        try {
            this.showQuantumLoading('Simulating parallel career timelines...');
            
            // Generate parallel timelines
            const timelines = await this.generateParallelTimelines();
            
            // Display timeline visualization
            this.displayParallelTimelines(timelines);
            
        } catch (error) {
            console.error('Failed to simulate parallel timelines:', error);
            this.showQuantumError('Failed to simulate parallel timelines');
        }
    }

    async generateParallelTimelines() {
        // Simulate timeline generation
        await new Promise(resolve => setTimeout(resolve, 2500));

        const timelines = [];
        const baseYear = new Date().getFullYear();
        
        for (let i = 0; i < 5; i++) {
            const timeline = {
                id: i + 1,
                name: `Timeline ${i + 1}`,
                probability: Math.floor(Math.random() * 30) + 70,
                milestones: [],
                outcomes: []
            };

            // Generate milestones for each timeline
            for (let year = 1; year <= this.simulationDepth; year++) {
                timeline.milestones.push({
                    year: baseYear + year,
                    milestone: this.generateMilestone(year),
                    probability: Math.max(60, 100 - (year * 8))
                });
            }

            // Generate outcomes
            timeline.outcomes = this.generateOutcomes(timeline.probability);
            timelines.push(timeline);
        }

        return timelines;
    }

    generateMilestone(year) {
        const milestones = [
            'Skill certification achieved',
            'Industry project completed',
            'Network expansion milestone',
            'Leadership opportunity',
            'Technical breakthrough',
            'Market positioning established',
            'Innovation milestone reached',
            'Global exposure gained'
        ];
        
        return milestones[Math.floor(Math.random() * milestones.length)];
    }

    generateOutcomes(probability) {
        const outcomes = [];
        
        if (probability > 85) {
            outcomes.push('Exceptional career growth', 'Industry recognition', 'Leadership position');
        } else if (probability > 75) {
            outcomes.push('Strong career advancement', 'Skill mastery', 'Market success');
        } else {
            outcomes.push('Steady progress', 'Skill development', 'Market adaptation');
        }
        
        return outcomes;
    }

    displayParallelTimelines(timelines) {
        const resultsContainer = document.getElementById('quantumResults');
        const pathGrid = document.getElementById('pathGrid');
        
        if (!resultsContainer || !pathGrid) return;

        pathGrid.innerHTML = timelines.map(timeline => `
            <div class="path-card">
                <div class="path-header">
                    <div class="path-title">${timeline.name}</div>
                    <div class="path-probability">${timeline.probability}%</div>
                </div>
                <div class="path-description">
                    Parallel career timeline with ${timeline.probability}% success probability over ${this.simulationDepth} years.
                </div>
                <div class="path-metrics">
                    <div class="path-metric">
                        <span class="metric-value">${timeline.milestones.length}</span>
                        <span class="metric-label">Milestones</span>
                    </div>
                    <div class="path-metric">
                        <span class="metric-value">${timeline.outcomes.length}</span>
                        <span class="metric-label">Outcomes</span>
                    </div>
                    <div class="path-metric">
                        <span class="metric-value">${this.simulationDepth}y</span>
                        <span class="metric-label">Duration</span>
                    </div>
                    <div class="path-metric">
                        <span class="metric-value">${Math.round(timeline.probability * 0.8)}%</span>
                        <span class="metric-label">Confidence</span>
                    </div>
                </div>
                <div class="path-actions">
                    <button class="btn-primary" onclick="quantumPathfinding.exploreTimeline(${timeline.id})">Explore Timeline</button>
                    <button class="btn-secondary" onclick="quantumPathfinding.compareTimelines()">Compare All</button>
                </div>
            </div>
        `).join('');

        // Generate timeline-specific insights
        this.generateTimelineInsights(timelines);
        
        // Show results
        resultsContainer.style.display = 'block';
    }

    generateTimelineInsights(timelines) {
        const insightCards = document.getElementById('insightCards');
        if (!insightCards) return;

        const avgProbability = timelines.reduce((sum, t) => sum + t.probability, 0) / timelines.length;
        const bestTimeline = timelines.reduce((best, current) => 
            current.probability > best.probability ? current : best
        );

        const insights = [
            {
                icon: '📊',
                title: 'Timeline Analysis',
                description: `Average success probability across all timelines: ${Math.round(avgProbability)}%`
            },
            {
                icon: '🏆',
                title: 'Best Path',
                description: `${bestTimeline.name} shows the highest success probability at ${bestTimeline.probability}%`
            },
            {
                icon: '⏰',
                title: 'Time Investment',
                description: `All timelines require ${this.simulationDepth} years of focused development`
            },
            {
                icon: '🎯',
                title: 'Strategic Focus',
                description: 'Focus on high-probability milestones in early years for maximum impact'
            }
        ];

        insightCards.innerHTML = insights.map(insight => `
            <div class="insight-card">
                <div class="insight-icon">${insight.icon}</div>
                <div class="insight-title">${insight.title}</div>
                <div class="insight-description">${insight.description}</div>
            </div>
        `).join('');
    }

    showQuantumLoading(message) {
        const resultsContainer = document.getElementById('quantumResults');
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = `
                <div class="quantum-loading">
                    <div class="quantum-spinner"></div>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    showQuantumError(message) {
        const resultsContainer = document.getElementById('quantumResults');
        if (resultsContainer) {
            resultsContainer.style.display = 'block';
            resultsContainer.innerHTML = `
                <div class="quantum-error">
                    <div class="error-icon">❌</div>
                    <p>${message}</p>
                    <button onclick="quantumPathfinding.retry()" class="btn btn-primary">Retry</button>
                </div>
            `;
        }
    }

    explorePath(pathId) {
        console.log(`Exploring path ${pathId}`);
        showNotification(`Exploring career path ${pathId}...`, 'info');
        // TODO: Implement detailed path exploration
    }

    savePath(pathId) {
        console.log(`Saving path ${pathId}`);
        showNotification(`Career path ${pathId} saved to your profile!`, 'success');
        // TODO: Implement path saving
    }

    exploreTimeline(timelineId) {
        console.log(`Exploring timeline ${timelineId}`);
        showNotification(`Exploring timeline ${timelineId}...`, 'info');
        // TODO: Implement detailed timeline exploration
    }

    compareTimelines() {
        console.log('Comparing all timelines');
        showNotification('Generating timeline comparison...', 'info');
        // TODO: Implement timeline comparison
    }

    retry() {
        this.initialize();
    }
}

// Initialize Quantum Career Pathfinding
let quantumPathfinding;

// Global functions for HTML onclick handlers
function initializeQuantumPathfinding() {
    if (!quantumPathfinding) {
        quantumPathfinding = new QuantumCareerPathfinding();
    }
    quantumPathfinding.initialize();
}

function generateCareerCombinations() {
    if (quantumPathfinding) {
        quantumPathfinding.generateCareerCombinations();
    }
}

function simulateParallelTimelines() {
    if (quantumPathfinding) {
        quantumPathfinding.simulateParallelTimelines();
    }
}
