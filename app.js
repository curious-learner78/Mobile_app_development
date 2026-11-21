const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const statusMessage = document.getElementById("statusMessage");
const loginBtn = document.getElementById("loginBtn");
const rememberMe = document.getElementById("rememberMe");

// Pre-fill saved email if user previously logged in
window.addEventListener("DOMContentLoaded", () => {
  const savedEmail = localStorage.getItem("vinix_user_email");
  if (savedEmail) {
    emailInput.value = savedEmail;
  }
});

// Toggle Show / Hide Password
togglePasswordBtn.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePasswordBtn.textContent = isHidden ? "Hide" : "Show";
  togglePasswordBtn.setAttribute(
    "aria-label",
    isHidden ? "Hide password" : "Show password"
  );
});

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-msg ${type}`;
  statusMessage.hidden = false;
}

function validateForm() {
  let isValid = true;
  emailError.textContent = "";
  passwordError.textContent = "";
  emailInput.classList.remove("invalid");
  passwordInput.classList.remove("invalid");

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailValue) {
    emailError.textContent = "Email address is required.";
    emailInput.classList.add("invalid");
    isValid = false;
  } else if (!emailPattern.test(emailValue)) {
    emailError.textContent = "Please enter a valid email address.";
    emailInput.classList.add("invalid");
    isValid = false;
  }

  if (!passwordValue) {
    passwordError.textContent = "Password is required.";
    passwordInput.classList.add("invalid");
    isValid = false;
  } else if (passwordValue.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    passwordInput.classList.add("invalid");
    isValid = false;
  }

  return isValid;
}

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  statusMessage.hidden = true;

  if (!validateForm()) {
    showStatus("Please fix the highlighted fields below.", "error");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Signing in...";

  setTimeout(() => {
    const email = emailInput.value.trim();

    if (rememberMe.checked) {
      localStorage.setItem("vinix_user_email", email);
    } else {
      localStorage.removeItem("vinix_user_email");
    }

    localStorage.setItem(
      "vinix_active_session",
      JSON.stringify({ email, loggedInAt: new Date().toISOString() })
    );

    showStatus(`Login successful! Welcome, ${email}.`, "success");
    loginBtn.disabled = false;
    loginBtn.textContent = "Sign In";
  }, 600);
});
