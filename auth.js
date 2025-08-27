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
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('mindmate_token', this.token);
                this.updateUIForAuthenticatedUser();
                showNotification('Registration successful! Welcome to MindMate! 🎉', 'success');
                return { success: true };
            } else {
                throw new Error(data.error || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: error.message };
        }
    }

    async login(username, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('mindmate_token', this.token);
                this.updateUIForAuthenticatedUser();
                showNotification(`Welcome back, ${this.user.username}! 👋`, 'success');
                return { success: true };
            } else {
                throw new Error(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
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
}

// Initialize auth manager
const authManager = new AuthManager();