// 🔐 PASSWORD SYSTEM (GENERATOR + FIXED LOGIN)

const login = document.getElementById("login");
const app = document.getElementById("app");
const input = document.getElementById("pw");

// hide app first
app.style.display = "none";

// 🎲 generate random password
function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let pass = "";
  for (let i = 0; i < 6; i++) {
    pass += chars[Math.floor(Math.random() * chars.length)];
  }
  return pass;
}

let currentPassword = generatePassword();

// 🧠 SHOW PASSWORD AT TOP
const display = document.createElement("div");
display.id = "generatedPassword";
display.style.textAlign = "center";
display.style.marginBottom = "20px";
display.style.fontSize = "18px";
display.style.opacity = "0.8";
display.innerText = "Password: " + currentPassword;

document.querySelector(".login-container").prepend(display);

// ⏱️ 10 SECOND MEMORY TIMER
setTimeout(() => {
  display.innerText = "Password hidden. Wait 10 minutes if you forgot.";
}, 10000);

// 🔐 CHECK PASSWORD
function checkPassword() {
  const value = input.value.trim();

  if (value === currentPassword) {
    // ✅ SUCCESS → SHOW SITE
    login.style.display = "none";
    app.style.display = "block";

  } else {
    // ❌ WRONG → CLEAR ONLY (NO LOCK)
    input.value = "";
    input.placeholder = "Wrong password";
  }
}

// ⌨️ ENTER KEY FIX
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    checkPassword();
  }
});
