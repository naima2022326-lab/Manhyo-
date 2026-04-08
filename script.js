// 🔐 PASSWORD GENERATOR SYSTEM
const loginEl = document.getElementById("login");
const appEl = document.getElementById("app");
const pw = document.getElementById("pw");

// elements
const display = document.createElement("h2");
display.style.marginBottom = "20px";
display.style.letterSpacing = "4px";
display.style.fontSize = "1.5rem";
display.style.opacity = "0.8";

document.querySelector(".login-container").prepend(display);

// LOCK CHECK
const lockUntil = localStorage.getItem("lockUntil");
if(lockUntil && Date.now() < lockUntil){
  const mins = Math.ceil((lockUntil - Date.now()) / 60000);
  display.textContent = "Locked " + mins + " min";
  pw.disabled = true;
} else {
  startGenerator();
}

let secret = "";

// 🎰 GENERATOR ANIMATION
function startGenerator(){
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let interval = setInterval(()=>{
    secret = "";
    for(let i=0;i<6;i++){
      secret += chars[Math.floor(Math.random()*chars.length)];
    }
    display.textContent = secret;
  }, 60);

  // stop after 2 sec → final password
  setTimeout(()=>{
    clearInterval(interval);

    // ⏱ hide after 10 seconds
    setTimeout(()=>{
      display.textContent = "Enter Password";
    },10000);

  },2000);
}

// LOGIN
function login(){
  if(pw.value !== secret){
    pw.value = "";
    pw.placeholder = "Wrong password";

    // ❌ LOCK 10 MINUTES
    localStorage.setItem("lockUntil", Date.now() + 600000);

    location.reload();
    return;
  }

  // ✅ SUCCESS
  loginEl.style.opacity = "0";

  setTimeout(()=>{
    loginEl.style.display = "none";
    appEl.style.display = "block";
  },300);
}

// ENTER KEY
pw.addEventListener("keydown", e=>{
  if(e.key === "Enter") login();
});
