// 🔐 INSTANT PASSWORD GENERATOR LOGIN
const loginEl = document.getElementById("login");
const appEl = document.getElementById("app");
const pw = document.getElementById("pw");

let generatedPassword = "";
let passwordTimeout;
let canGenerate = true;

// HOME page hidden by default
appEl.style.display = "none";

// Function to generate random password
function generatePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pass = "";
  for (let i = 0; i < 8; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

// Start password generator instantly
function startPasswordCycle() {
  if (!canGenerate) return;
  canGenerate = false;

  generatedPassword = generatePassword();
  pw.value = "";
  pw.placeholder = `Password: ${generatedPassword} (10s!)`;

  // 10 seconds to memorize
  passwordTimeout = setTimeout(() => {
    pw.value = "";
    pw.placeholder = "Wait 10 minutes for new password";
    setTimeout(() => {
      canGenerate = true;
      startPasswordCycle();
    }, 600000); // 10 minutes
  }, 10000);
}

// LOGIN function
function login() {
  if (pw.value === generatedPassword) {
    clearTimeout(passwordTimeout);
    loginEl.style.opacity = "0";
    setTimeout(() => {
      loginEl.style.display = "none";
      appEl.style.display = "block"; // show old homepage
    }, 400);
  } else {
    pw.value = "";
    pw.placeholder = "Wrong password!";
    pw.style.border = "1px solid red";
    setTimeout(() => {
      pw.placeholder = `Password: ${generatedPassword} (10s!)`;
      pw.style.border = "1px solid rgba(255,255,255,.2)";
    }, 1200);
  }
}

// ENTER key works
pw.addEventListener("keydown", (e) => {
  if (e.key === "Enter") login();
});

// Start immediately on page load
startPasswordCycle();

// =====================
// 🌐 PROXY INPUT
// =====================
function openProxy() {
  let url = document.getElementById("searchInput").value.trim();
  if (!url) return;
  if (!url.startsWith("http")) url = "https://" + url;
  openReader(url);
}

// =====================
// 📖 READER SYSTEM
// =====================
const overlay = document.getElementById("overlay");
const reader = document.getElementById("reader");
const loader = document.getElementById("loader");

function openReader(url) {
  localStorage.setItem("lastSite", url);
  overlay.style.display = "block";
  loader.style.display = "flex";
  reader.src = "/service/" + __uv$config.encodeUrl(url);
  setTimeout(() => overlay.requestFullscreen?.(), 50);
  reader.onload = () => (loader.style.display = "none");
}

// CARD CLICK
document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    openReader(card.dataset.url);
  });
});

// CLOSE READER
function closeReader() {
  document.exitFullscreen?.();
  overlay.style.display = "none";
  reader.src = "";
}

// ESC CLOSE
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeReader();
});

// PANIC KEY
window.addEventListener("keydown", (e) => {
  if (e.key === "`") {
    window.location.href = "https://google.com";
  }
});
