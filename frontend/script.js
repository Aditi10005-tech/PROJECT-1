// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyAmmKZR7vMeC1ntsGp9wUlwVzqRHyqbi-E",
        authDomain: "login-system-70a40.firebaseapp.com",
        databaseURL: "https://login-system-70a40-default-rtdb.firebaseio.com",
        projectId: "login-system-70a40",
        storageBucket: "login-system-70a40.appspot.com",
        messagingSenderId: "1084131386016",
        appId: "1:1084131386016:web:6087163760124e6375249d"
    };

    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.getAuth(app);
    const database = firebase.getDatabase(app);

    // Check if user is already logged in
    auth.onAuthStateChanged(user => {
        if (user) {
            const dbRef = ref(database);
            get(child(dbRef, `users/${user.uid}`)).then(snapshot => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    if (userData.role === 'student') {
                        window.location.href = 'student-dashboard.html';
                    }
                }
            });
        }
    });

    // Handle tab switching
    document.addEventListener('DOMContentLoaded', function() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        
        // Initialize first tab as active
        const activeTab = tabButtons[0];
        activeTab.classList.add('active');
        
        // Add click event listeners to all tabs
        tabButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Store the selected role in a data attribute
                document.body.dataset.selectedRole = this.dataset.role;
            });
        });
    });

    // Handle form submission
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const activeTab = document.querySelector('.tab-btn.active').dataset.role;
        
        try {
            // Sign in with Firebase
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Get user role from database
            const dbRef = ref(database);
            const userSnapshot = await get(child(dbRef, `users/${user.uid}`));
            
            if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                
                // Store user info in localStorage
                localStorage.setItem('user', JSON.stringify({
                    uid: user.uid,
                    name: userData.name,
                    role: userData.role
                }));

                // Redirect based on role
                if (userData.role === 'student') {
                    window.location.href = 'student-dashboard.html';
                } else {
                    alert(`Login successful for ${userData.role}!`);
                }
            } else {
                throw new Error('User not found in database');
            }
        } catch (error) {
            alert(error.message);
        }
        
        // Reset form
        loginForm.reset();
    });
});
