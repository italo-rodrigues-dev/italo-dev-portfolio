const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const registerBtn = document.getElementById("registerBtn");

const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");
const errorConfirmPassword = document.getElementById("errorConfirmPassword");

function validateForm() {
    let valid = true;

    errorName.textContent = "";
    errorEmail.textContent = "";
    errorPassword.textContent = "";
    errorConfirmPassword.textContent = "";

    if (nameInput.value === "") {
        errorName.textContent = "Name is required.";
        valid = false;
    }
    if (emailInput.value === "") {
        errorEmail.textContent = "Email is required.";
        valid = false;
    } else if (!emailInput.value.includes("@")) {
        errorEmail.textContent = "Email must contain '@'.";
        valid = false;
    }
    if (passwordInput.value === "") {
        errorPassword.textContent = "Password is required.";
        valid = false;
    } else if (passwordInput.value.length < 8) {
        errorPassword.textContent = "Password must be at least 8 characters.";
        valid = false;
    }
    if (confirmPasswordInput.value === "") {
        errorConfirmPassword.textContent = "Confirm password is required.";
        valid = false;
    } else if (passwordInput.value !== confirmPasswordInput.value) {
        errorConfirmPassword.textContent = "Passwords do not match.";
        valid = false;
    }
    if (valid) {
        alert("Registration successful!");
    }
}

registerBtn.addEventListener("click", validateForm);