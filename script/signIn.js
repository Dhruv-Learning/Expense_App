 // Store user data in memory (since localStorage isn't available)
        let userData = {};

        const form = document.getElementById("myForm");
        const msg = document.getElementById("msg");
        const strengthBar = document.getElementById("strengthBar");
        const passwordInput = document.getElementById("password");
        const loginLink = document.getElementById("loginLink");

        // Password strength checker
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^A-Za-z0-9]/.test(password)) strength++;

            strengthBar.className = 'strength-fill';
            
            if (strength <= 2) {
                strengthBar.classList.add('strength-weak');
            } else if (strength <= 3) {
                strengthBar.classList.add('strength-medium');
            } else {
                strengthBar.classList.add('strength-strong');
            }
        });

        // Form validation and submission
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;    
            localStorage.setItem("username" ,username);
            localStorage.setItem("password" ,password);    

            // Clear previous error states
            clearErrors();

            if (username.trim() === "") {
                showError("username", "Username is required");
                return;
            }

            if (email.trim() === "") {
                showError("email", "Email is required");
                return;
            }

            if (!isValidEmail(email)) {
                showError("email", "Please enter a valid email address");
                return;
            }

            if (password.trim().length < 8) {
                showError("password", "Password must be at least 8 characters long");
                return;
            }

            if (confirmPassword !== password) {
                showError("confirmPassword", "Passwords do not match");
                return;
            }

            // Success - store data in memory
            userData.username = username;
            userData.password = password;
            userData.email = email;

            showSuccess("Account created successfully! Welcome aboard! 🎉");
            
            // Reset form after success
            setTimeout(() => {
                form.reset();
                strengthBar.className = 'strength-fill';
            }, 2000);
        });

        // Handle login link click
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (userData.username) {
                showSuccess(`Welcome back, ${userData.username}! Redirecting to login...`);
                window.location.href="login.html";
            } else {
                showMessage("Please create an account first!", "error");
            }
        });

        function showError(fieldId, message) {
            const field = document.getElementById(fieldId);
            field.classList.add('error');
            showMessage(message, "error");
        }

        function clearErrors() {
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => input.classList.remove('error'));
        }

        function showMessage(text, type) {
            msg.textContent = text;
            msg.className = `message ${type} show`;
            
            setTimeout(() => {
                msg.classList.remove('show');
            }, 4000);
        }

        function showSuccess(text) {
            showMessage(text, "success");
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Add focus animation effects
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });