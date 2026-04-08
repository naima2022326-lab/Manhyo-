// 🔐 LOGIN SYSTEM (FIXED)

const login = document.getElementById("login");
const app = document.getElementById("app");
const input = document.getElementById("pw");

// your password (change this)
const PASSWORD = "manhyo123";

function checkPassword() {
  const value = input.value.trim();

  if (value === PASSWORD) {
    // ✅ correct → show app
    login.style.display = "none";
    app.style.display = "block";

    // optional: remember login
    localStorage.setItem("loggedIn", "true");

  } else {
    // ❌ wrong → just clear input (NO lock)
    input.value = "";
    input.placeholder = "Wrong password";
  }
}

// ⌨️ ENTER KEY FIX
input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    checkPassword();
  }
});

// 🔄 AUTO LOGIN (
