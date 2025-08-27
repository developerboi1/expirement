// Authentication Manager for MindMate Frontend

class AuthManager {
    constructor() {
        this.user = null;
        this.token = localStorage.getItem('mindmate_token');
        this.initializeAuth();
    }

    async initializeAuth() {
        if (this.token) {
            try {
                const profile = await this.fetchUserProfile();
                if (profile) {
                    this.user = profile;
                    this.updateUIForAuthenticatedUser();
                } else {
                    this.logout();
                }
            } catch (error) {
                console.error('Auth initialization failed:', error);
                this.logout();
            }
        } else {
            this.updateUIForGuestUser();
        }
    }

    async register(username, email, password) {
        try {
            console.log('🔍 DEBUG: Attempting registration for:', username, email);
            
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            });

            console.log('🔍 DEBUG: Registration response status:', response.status);
            
            const data = await response.json();
            console.log('🔍 DEBUG: Registration response data:', data);

            if (data.success) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('mindmate_token', this.token);
                this.updateUIForAuthenticatedUser();
                showNotification('Registration successful! Welcome to MindMate! 🎉', 'success');
                console.log('✅ DEBUG: Registration successful, user:', this.user);
                return { success: true };
            } else {
                throw new Error(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('❌ DEBUG: Registration error:', error);
            return { success: false, error: error.message };
        }
    }

    async login(username, password) {
        try {
            console.log('🔍 DEBUG: Attempting login for:', username);
            
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            console.log('🔍 DEBUG: Login response status:', response.status);
            
            const data = await response.json();
            console.log('🔍 DEBUG: Login response data:', data);

            if (data.success) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('mindmate_token', this.token);
                this.updateUIForAuthenticatedUser();
                showNotification(`Welcome back, ${this.user.username}! 👋`, 'success');
                console.log('✅ DEBUG: Login successful, user:', this.user);
                return { success: true };
            } else {
                throw new Error(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('❌ DEBUG: Login error:', error);
            return { success: false, error: error.message };
        }
    }

    logout() {
        this.user = null;
        this.token = null;
        localStorage.removeItem('mindmate_token');
        this.updateUIForGuestUser();
        showNotification('Logged out successfully! 👋', 'info');
        
        // Clear any user-specific data
        if (typeof conversationHistory !== 'undefined') {
            conversationHistory = [];
        }
        if (typeof userProfile !== 'undefined') {
            userProfile = {
                assessmentCompleted: false,
                topCareers: [],
                interests: [],
                skills: {},
                preferences: {}
            };
        }
        
        // Clear gamification data
        if (typeof gamificationProfile !== 'undefined') {
            gamificationProfile = null;
        }
    }

    async fetchUserProfile() {
        try {
            const response = await fetch('/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const profile = await response.json();
                
                // Update global user profile for AI conversations
                if (profile.hasCompletedAssessment && profile.assessmentHistory.length > 0) {
                    const latest = profile.assessmentHistory[0];
                    if (typeof userProfile !== 'undefined') {
                        userProfile = {
                            assessmentCompleted: true,
                            topCareers: latest.top_careers || [],
                            interests: latest.quiz_answers.interests || [],
                            skills: latest.quiz_answers.skills || {},
                            preferences: latest.quiz_answers.careerValues || {}
                        };
                    }
                }
                
                return profile;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Profile fetch error:', error);
            return null;
        }
    }

    async saveAssessmentResult(quizAnswers, careerScores, topCareers) {
        try {
            const response = await fetch('/api/assessment/save', {
                method: 'POST',
                headers: {
                    'Authorization': this.token ? `Bearer ${this.token}` : undefined,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quizAnswers, careerScores, topCareers })
            });

            const data = await response.json();
            
            if (data.success) {
                if (this.user) {
                    // Refresh user profile to get updated assessment data
                    await this.fetchUserProfile();
                }
                return { success: true, message: data.message };
            } else {
                throw new Error(data.error || 'Failed to save assessment');
            }
        } catch (error) {
            console.error('Assessment save error:', error);
            return { success: false, error: error.message };
        }
    }

    getAuthHeader() {
        return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
    }

    isAuthenticated() {
        return !!this.user;
    }

    updateUIForAuthenticatedUser() {
        // Update navigation to show user info
        this.updateNavigation();
        
        // Show user-specific features
        this.showAuthenticatedFeatures();
        
        // Initialize gamification
        if (typeof initializeGamification === 'function') {
            initializeGamification();
        }
        
        // Initialize personalized AI chat if on chat section
        if (document.getElementById('chat-section') && document.getElementById('chat-section').classList.contains('active')) {
            this.initializePersonalizedChat();
        }
    }

    updateUIForGuestUser() {
        // Update navigation to show login/register
        this.updateNavigation();
        
        // Hide user-specific features
        this.hideAuthenticatedFeatures();
    }

    updateNavigation() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;
        
        if (this.isAuthenticated()) {
            // Add user menu
            const userMenu = `
                <li class="user-menu">
                    <button class="user-avatar-btn" onclick="authManager.toggleUserMenu()">
                        👤 ${this.user.username}
                    </button>
                    <div class="user-dropdown hidden" id="userDropdown">
                        <a href="#" onclick="authManager.showProfile()">📊 My Profile</a>
                        <a href="#" onclick="authManager.showAssessmentHistory()">📋 Assessment History</a>
                        <a href="#" onclick="authManager.logout()">🚪 Logout</a>
                    </div>
                </li>
            `;
            
            // Remove existing user menu if any
            const existingUserMenu = navLinks.querySelector('.user-menu');
            if (existingUserMenu) {
                existingUserMenu.remove();
            }
            
            // Remove auth buttons
            const existingAuthButtons = navLinks.querySelector('.auth-buttons');
            if (existingAuthButtons) {
                existingAuthButtons.remove();
            }
            
            navLinks.insertAdjacentHTML('beforeend', userMenu);
        } else {
            // Add login/register buttons
            const authButtons = `
                <li>
                    <button class="btn btn-secondary" onclick="authManager.showLoginModal()" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Login</button>
                </li>
                <li>
                    <button class="btn btn-primary" onclick="authManager.showRegisterModal()" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Sign Up</button>
                </li>
            `;
            
            // Remove existing auth buttons and user menu
            navLinks.querySelectorAll('.user-menu, .auth-buttons').forEach(el => el.remove());
            navLinks.insertAdjacentHTML('beforeend', `<div class="auth-buttons">${authButtons}</div>`);
        }
    }

    showAuthenticatedFeatures() {
        // Show save progress indicators, premium features, etc.
        document.querySelectorAll('.auth-required').forEach(el => {
            el.style.display = 'block';
        });
    }

    hideAuthenticatedFeatures() {
        document.querySelectorAll('.auth-required').forEach(el => {
            el.style.display = 'none';
        });
    }

    toggleUserMenu() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    showLoginModal() {
        this.createAuthModal('login');
    }

    showRegisterModal() {
        this.createAuthModal('register');
    }

    showProfile() {
        this.createProfileModal();
    }

    showAssessmentHistory() {
        this.createAssessmentHistoryModal();
    }

    createAuthModal(type) {
        const isLogin = type === 'login';
        
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-content">
                <div class="auth-modal-header">
                    <h2>${isLogin ? '🔐 Welcome Back!' : '🚀 Join MindMate'}</h2>
                    <button class="close-modal" onclick="this.closest('.auth-modal').remove()">&times;</button>
                </div>
                <form class="auth-form" onsubmit="authManager.handleAuth${isLogin ? 'Login' : 'Register'}(event)">
                    ${!isLogin ? '<input type="text" name="username" placeholder="Username" required>' : ''}
                    <input type="${isLogin ? 'text' : 'email'}" name="${isLogin ? 'username' : 'email'}" placeholder="${isLogin ? 'Username or Email' : 'Email'}" required>
                    <input type="password" name="password" placeholder="Password" required>
                    ${!isLogin ? '<input type="password" name="confirmPassword" placeholder="Confirm Password" required>' : ''}
                    <button type="submit" class="btn btn-primary">${isLogin ? 'Login' : 'Create Account'}</button>
                </form>
                <div class="auth-modal-footer">
                    <p>${isLogin ? "Don't have an account?" : "Already have an account?"} 
                       <a href="#" onclick="authManager.${isLogin ? 'showRegisterModal' : 'showLoginModal'}(); this.closest('.auth-modal').remove();">
                           ${isLogin ? 'Sign up' : 'Login'}
                       </a>
                    </p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Focus first input
        modal.querySelector('input').focus();
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    createProfileModal() {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-content profile-modal">
                <div class="auth-modal-header">
                    <h2>👤 My Profile</h2>
                    <button class="close-modal" onclick="this.closest('.auth-modal').remove()">&times;</button>
                </div>
                <div class="profile-content">
                    <div class="profile-section">
                        <h3>📋 Personal Information</h3>
                        <div class="profile-info">
                            <div class="info-item">
                                <label>Username:</label>
                                <span>${this.user.username}</span>
                            </div>
                            <div class="info-item">
                                <label>Email:</label>
                                <span>${this.user.email}</span>
                            </div>
                            <div class="info-item">
                                <label>Member Since:</label>
                                <span>${new Date(this.user.createdAt || Date.now()).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-section">
                        <h3>🎯 Career Preferences</h3>
                        <div class="career-preferences">
                            <div class="preference-item">
                                <label>Primary Interest:</label>
                                <span>${this.user.primaryInterest || 'Not set'}</span>
                                <button class="btn btn-small" onclick="authManager.editPreference('primaryInterest')">Edit</button>
                            </div>
                            <div class="preference-item">
                                <label>Experience Level:</label>
                                <span>${this.user.experienceLevel || 'Not set'}</span>
                                <button class="btn btn-small" onclick="authManager.editPreference('experienceLevel')">Edit</button>
                            </div>
                            <div class="preference-item">
                                <label>Preferred Location:</label>
                                <span>${this.user.preferredLocation || 'Not set'}</span>
                                <button class="btn btn-small" onclick="authManager.editPreference('preferredLocation')">Edit</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-section">
                        <h3>📊 Quiz Statistics</h3>
                        <div class="quiz-stats">
                            <div class="stat-item">
                                <label>Quizzes Completed:</label>
                                <span>${this.user.quizCount || 0}</span>
                            </div>
                            <div class="stat-item">
                                <label>Last Quiz Date:</label>
                                <span>${this.user.lastQuizDate ? new Date(this.user.lastQuizDate).toLocaleDateString() : 'Never'}</span>
                            </div>
                            <div class="stat-item">
                                <label>Career Matches Found:</label>
                                <span>${this.user.careerMatches || 0}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="profile-section">
                        <h3>⚙️ Account Settings</h3>
                        <div class="profile-actions">
                            <button class="btn btn-secondary" onclick="authManager.editProfile()">✏️ Edit Profile</button>
                            <button class="btn btn-outline" onclick="authManager.changePassword()">🔒 Change Password</button>
                            <button class="btn btn-danger" onclick="authManager.deleteAccount()">🗑️ Delete Account</button>
                        </div>
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

    createAssessmentHistoryModal() {
        const modal = document.createElement('div');
        modal.className = 'auth-modal';
        modal.innerHTML = `
            <div class="auth-modal-content assessment-history-modal">
                <div class="auth-modal-header">
                    <h2>📋 Assessment History</h2>
                    <button class="close-modal" onclick="this.closest('.auth-modal').remove()">&times;</button>
                </div>
                <div class="assessment-history-content">
                    <div class="history-summary">
                        <h3>📊 Quiz Summary</h3>
                        <div class="summary-stats">
                            <div class="summary-stat">
                                <span class="stat-number">${this.user.quizCount || 0}</span>
                                <span class="stat-label">Total Quizzes</span>
                            </div>
                            <div class="summary-stat">
                                <span class="stat-number">${this.user.averageScore || 'N/A'}</span>
                                <span class="stat-label">Average Score</span>
                            </div>
                            <div class="summary-stat">
                                <span class="stat-number">${this.user.careerMatches || 0}</span>
                                <span class="stat-label">Career Matches</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="recent-assessments">
                        <h3>🕒 Recent Assessments</h3>
                        <div class="assessment-list" id="assessmentList">
                            <div class="loading">Loading assessment history...</div>
                        </div>
                    </div>
                    
                    <div class="assessment-actions">
                        <button class="btn btn-primary" onclick="showSection('quiz-section')">🎯 Take New Assessment</button>
                        <button class="btn btn-secondary" onclick="showSection('analytics-section')">📊 View Analytics</button>
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
        
        // Load assessment history
        this.loadAssessmentHistory();
    }

    async loadAssessmentHistory() {
        try {
            const response = await fetch('/api/assessment/history', {
                headers: this.getAuthHeader()
            });
            
            if (response.ok) {
                const assessments = await response.json();
                this.displayAssessmentHistory(assessments);
            } else {
                this.displayAssessmentHistory([]);
            }
        } catch (error) {
            console.error('Failed to load assessment history:', error);
            this.displayAssessmentHistory([]);
        }
    }

    displayAssessmentHistory(assessments) {
        const assessmentList = document.getElementById('assessmentList');
        if (!assessmentList) return;
        
        if (assessments.length === 0) {
            assessmentList.innerHTML = `
                <div class="no-assessments">
                    <p>No assessments completed yet.</p>
                    <p>Take your first career assessment to get started!</p>
                </div>
            `;
            return;
        }
        
        assessmentList.innerHTML = assessments.map(assessment => `
            <div class="assessment-item">
                <div class="assessment-header">
                    <span class="assessment-date">${new Date(assessment.completedAt).toLocaleDateString()}</span>
                    <span class="assessment-score">${assessment.score || 'N/A'}%</span>
                </div>
                <div class="assessment-details">
                    <h4>${assessment.careerMatches?.length || 0} Career Matches Found</h4>
                    <div class="career-tags">
                        ${(assessment.careerMatches || []).slice(0, 3).map(career => 
                            `<span class="career-tag">${career}</span>`
                        ).join('')}
                        ${(assessment.careerMatches || []).length > 3 ? 
                            `<span class="career-tag more">+${(assessment.careerMatches || []).length - 3} more</span>` : ''
                        }
                    </div>
                </div>
                <button class="btn btn-small" onclick="authManager.viewAssessmentDetails('${assessment.id}')">View Details</button>
            </div>
        `).join('');
    }

    // Profile action methods
    editProfile() {
        showNotification('Profile editing coming soon!', 'info');
    }

    editPreference(preferenceType) {
        showNotification(`${preferenceType} editing coming soon!`, 'info');
    }

    changePassword() {
        showNotification('Password change coming soon!', 'info');
    }

    deleteAccount() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            showNotification('Account deletion coming soon!', 'info');
        }
    }

    viewAssessmentDetails(assessmentId) {
        showNotification('Assessment details view coming soon!', 'info');
    }

    async handleAuthLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        
        const result = await this.login(username, password);
        
        if (result.success) {
            document.querySelector('.auth-modal').remove();
        } else {
            showNotification(`Login failed: ${result.error}`, 'error');
        }
    }

    async handleAuthRegister(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        if (password !== confirmPassword) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('Password must be at least 6 characters', 'error');
            return;
        }
        
        const result = await this.register(username, email, password);
        
        if (result.success) {
            document.querySelector('.auth-modal').remove();
        } else {
            showNotification(`Registration failed: ${result.error}`, 'error');
        }
    }

    initializePersonalizedChat() {
        if (this.isAuthenticated() && typeof userProfile !== 'undefined' && userProfile.assessmentCompleted) {
            // Clear existing messages and add personalized welcome
            const chatMessages = document.getElementById('chat-messages');
            if (chatMessages && chatMessages.children.length <= 1) {
                chatMessages.innerHTML = '';
                if (typeof initializeAIChat === 'function') {
                    initializeAIChat();
                }
            }
        }
    }

    // Test authentication system
    async testAuthSystem() {
        console.log('🧪 DEBUG: Testing authentication system...');
        
        // Test 1: Check if server is running
        try {
            const response = await fetch('/api/auth/test', { method: 'GET' });
            console.log('✅ DEBUG: Server is running, status:', response.status);
        } catch (error) {
            console.error('❌ DEBUG: Server connection failed:', error);
        }
        
        // Test 2: Check database connection
        try {
            const response = await fetch('/api/db/test', { method: 'GET' });
            const data = await response.json();
            console.log('✅ DEBUG: Database connection:', data);
        } catch (error) {
            console.error('❌ DEBUG: Database connection failed:', error);
        }
        
        // Test 3: Check current authentication status
        console.log('🔍 DEBUG: Current auth status:', {
            isAuthenticated: this.isAuthenticated(),
            hasToken: !!this.token,
            hasUser: !!this.user
        });
    }
}

// Initialize auth manager
const authManager = new AuthManager();