// 🔐 PASSWORD GENERATOR
function generatePassword(length=8){
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let pw = "";
  for(let i=0;i<length;i++){
    pw += chars[Math.floor(Math.random()*chars.length)];
  }
  return pw;
}

// STORE GENERATED PASSWORD
const secret = generatePassword(10);
document.getElementById("generatedPw").textContent = secret;

// LOGIN
const loginEl = document.getElementById("login");
const appEl = document.getElementById("app");
const pwInput = document.getElementById("pw");

function login(){
  if(pwInput.value !== secret){
    pwInput.value = "";
    pwInput.placeholder = "Wrong password";
    pwInput.style.border = "1px solid red";

    setTimeout(()=>{
      pwInput.placeholder = "Enter Password";
      pwInput.style.border = "1px solid rgba(255,255,255,.2)";
    },1200);
    return;
  }

  loginEl.style.opacity = "0";
  setTimeout(()=>{
    loginEl.style.display = "none";
    appEl.style.display = "block";
  },400);
}

// ENTER KEY
pwInput.addEventListener("keydown", e=>{
  if(e.key === "Enter") login();
});

// 🌐 READER
const overlay = document.getElementById("overlay");
const reader = document.getElementById("reader");
const loader = document.getElementById("loader");

document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("click", ()=>{
    openReader(card.dataset.url);
  });
});

function openReader(url){
  overlay.style.display = "block";
  loader.style.display = "flex";
  reader.src = "/service/" + __uv$config.encodeUrl(url);
  setTimeout(()=>overlay.requestFullscreen?.(),50);
  reader.onload = ()=>loader.style.display="none";
}

function closeReader(){
  document.exitFullscreen?.();
  overlay.style.display = "none";
  reader.src = "";
}

window.addEventListener("keydown", e=>{
  if(e.key === "Escape") closeReader();
  if(e.key === "`") window.location.href = "https://google.com";
});

document.addEventListener("fullscreenchange", ()=>{
  if(!document.fullscreenElement) closeReader();
});
