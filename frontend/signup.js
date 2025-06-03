document.addEventListener('DOMContentLoaded', function() {
    // Handle tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const signupForms = document.querySelectorAll('.signup-form');
    
    // Initialize first tab (student)
    const studentTab = document.querySelector('[data-role="student"]');
    if (studentTab) {
        studentTab.classList.add('active');
    }
    
    // Show default form (student)
    const studentForm = document.getElementById('studentSignup');
    if (studentForm) {
        studentForm.classList.add('active');
    }
    
    // Add click event listeners to all tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all forms
            signupForms.forEach(form => form.classList.remove('active'));
            
            // Show corresponding form
            const role = this.dataset.role;
            const form = document.getElementById(`${role}Signup`);
            if (form) {
                form.classList.add('active');
            }
        });
    });

    // Add form submission handlers
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.email || !data.password) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Password confirmation check
            const password = data.password;
            const confirmPassword = data.confirmPassword;
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Get role from form ID
            const role = this.id.replace('Signup', '');
            
            // Create user in Firebase Auth
            try {
                firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        
                        // Save user data to database
                        const userData = {
                            name: data.name || data[`${role}Name`],
                            email: data.email,
                            username: data.username || data[`${role}Username`],
                            role: role
                        };
                        
                        // Add additional fields based on role
                        if (role === 'student') {
                            userData.rollNumber = data.studentRollNumber;
                            userData.department = data.studentDepartment;
                            userData.year = data.studentYear;
                        } else if (role === 'faculty') {
                            userData.department = data.facultyDepartment;
                            userData.employeeId = data.facultyId;
                        }
                        
                        firebase.database().ref('users/' + user.uid).set(userData)
                            .then(() => {
                                alert('Account created successfully!');
                                window.location.href = 'index.html';
                            })
                            .catch(error => {
                                alert('Error saving user data: ' + error.message);
                            });
                    })
                    .catch(error => {
                        alert('Error creating account: ' + error.message);
                    });
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    });
});
