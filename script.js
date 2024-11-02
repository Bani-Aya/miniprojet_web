let users = [];

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    document.getElementById("usernameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("formMessage").textContent = "";

    if (!username) {
        document.getElementById("usernameError").textContent = "Username is required.";
    }

    if (!email) {
        document.getElementById("emailError").textContent = "Email is required.";
    } else if (users.some(user => user.email === email)) {
        document.getElementById("emailError").textContent = "Email already exists.";
    }

    if (!password) {
        document.getElementById("passwordError").textContent = "Password is required.";
    }

    if (username && email && password && !users.some(user => user.email === email)) {
        users.push({ username, email, password });
        document.getElementById("formMessage").textContent = "User registered successfully!";
        document.getElementById("formMessage").style.color = "green";
        document.getElementById("registrationForm").reset();
    } else {
        document.getElementById("formMessage").textContent = "Please correct the errors above.";
        document.getElementById("formMessage").style.color = "red";
    }
});

document.getElementById("signInForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("signinEmail").value;
    const password = document.getElementById("signinPassword").value;

    document.getElementById("signinFormMessage").textContent = "";
    document.getElementById("signinEmailError").textContent = "";
    document.getElementById("signinPasswordError").textContent = "";

    if (!email || !password) {
        document.getElementById("signinFormMessage").textContent = "Email and password are required.";
        document.getElementById("signinFormMessage").style.color = "red";
        return;
    }

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        document.getElementById("signinFormMessage").textContent = "Sign in successful!";
        document.getElementById("signinFormMessage").style.color = "green";
    } else {
        document.getElementById("signinFormMessage").textContent = "Invalid email or password.";
        document.getElementById("signinFormMessage").style.color = "red";
    }
});
