// auth.js - Simplified version with no authentication restrictions

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up profile functionality (if elements exist)
    setupProfileModal();
    
    // Set up sign out buttons (if any exist)
    setupSignOut();
    
    // Initialize profile icon if user data exists
    initProfileIcon();
});

// Profile Functions
function setupProfileModal() {
    const profileIcon = document.querySelector('.profile');
    const profileModal = document.getElementById('profileModal');
    const closeProfileBtn = document.querySelector('.close-profile-btn');
    
    if (!profileIcon || !profileModal || !closeProfileBtn) return;
    
    // Open profile modal when profile icon is clicked
    profileIcon.addEventListener('click', function() {
        profileModal.style.display = 'block';
        loadProfileData();
    });
    
    // Close profile modal
    closeProfileBtn.addEventListener('click', function() {
        profileModal.style.display = 'none';
    });
    
    // Close when clicking outside the modal
    window.addEventListener('click', function(event) {
        if (event.target === profileModal) {
            profileModal.style.display = 'none';
        }
    });
}

function loadProfileData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const certifications = JSON.parse(localStorage.getItem('certifications')) || [];
    const skills = JSON.parse(localStorage.getItem('userSkills')) || [];
    
    // Set basic info
    if (currentUser.name) {
        document.getElementById('profileName').textContent = currentUser.name;
    }
    
    if (currentUser.email) {
        document.getElementById('profileEmail').textContent = currentUser.email;
    }
    
    if (currentUser.college) {
        const collegeMap = {
            'computer': 'Computer Science and Information Technology',
            'engineering': 'Engineering',
            'business': 'Business Administration',
            'medicine': 'Medicine',
            'science': 'Science',
            'arts': 'Arts'
        };
        document.getElementById('profileCollege').textContent = collegeMap[currentUser.college] || currentUser.college;
    }
    
    // Set certifications
    const certsContainer = document.getElementById('profileCertifications');
    certsContainer.innerHTML = certifications.length > 0 ? '' : '<p>No certifications added yet</p>';
    
    certifications.forEach(cert => {
        const certElement = document.createElement('div');
        certElement.className = 'certification-badge';
        certElement.textContent = cert.name;
        certsContainer.appendChild(certElement);
    });
    
    // Set skills
    const skillsContainer = document.getElementById('profileSkills');
    skillsContainer.innerHTML = skills.length > 0 ? '' : '<p>No skills added yet</p>';
    
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-badge';
        skillElement.textContent = skill;
        skillsContainer.appendChild(skillElement);
    });
}

function initProfileIcon() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    if (currentUser.name) {
        const names = currentUser.name.split(' ');
        const initials = names[0].charAt(0) + (names.length > 1 ? names[names.length - 1].charAt(0) : '');
        const profileIcons = document.querySelectorAll('.profile');
        profileIcons.forEach(icon => {
            icon.textContent = initials.toUpperCase();
        });
    }
}

function setupSignOut() {
    const signOutButtons = document.querySelectorAll('.sign-out');
    
    signOutButtons.forEach(button => {
        button.addEventListener('click', handleSignOut);
    });
}

function handleSignOut() {
    // Clear user session data
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('certifications');
    localStorage.removeItem('userSkills');
    
    // Refresh the page
    window.location.reload();
}


