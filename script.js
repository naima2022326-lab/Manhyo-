// 🔐 SIMPLE PASSWORD (WORKING VERSION)
const secret = "D3r5t0n3";

const loginEl = document.getElementById("login");
const appEl = document.getElementById("app");
const pw = document.getElementById("pw");

// LOGIN
function login(){
  if(pw.value !== secret){
    pw.value = "";
    pw.placeholder = "Wrong password";
    pw.style.border = "1px solid red";

    setTimeout(()=>{
      pw.placeholder = "Enter Password";
      pw.style.border = "1px solid rgba(255,255,255,.2)";
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
pw.addEventListener("keydown", e=>{
  if(e.key === "Enter") login();
});

// =====================
// 🌐 PROXY INPUT
// =====================
function openProxy(){
  let url = document.getElementById("searchInput").value.trim();

  if(!url) return;

  if(!url.startsWith("http")){
    url = "https://" + url;
  }

  openReader(url);
}

// =====================
// 📖 READER SYSTEM
// =====================
const overlay = document.getElementById("overlay");
const reader = document.getElementById("reader");
const loader = document.getElementById("loader");

function openReader(url){
  localStorage.setItem("lastSite", url);

  overlay.style.display = "block";
  loader.style.display = "flex";

  // ✅ ULTRAVIOLET
  reader.src = "/service/" + __uv$config.encodeUrl(url);

  setTimeout(()=>overlay.requestFullscreen?.(),50);

  reader.onload = ()=>{
    loader.style.display = "none";
  };
}

// CARD CLICK
document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("click", ()=>{
    openReader(card.dataset.url);
  });
});

// CLOSE READER
function closeReader(){
  document.exitFullscreen?.();
  overlay.style.display = "none";
  reader.src = "";
}

// ESC CLOSE
window.addEventListener("keydown", e=>{
  if(e.key === "Escape") closeReader();
});

// EXIT FULLSCREEN
document.addEventListener("fullscreenchange", ()=>{
  if(!document.fullscreenElement){
    closeReader();
  }
});

// 🚨 PANIC KEY
window.addEventListener("keydown", e=>{
  if(e.key === "`"){
    window.location.href = "https://google.com";
  }
});

// =====================
// ⭐ BOOKMARK SYSTEM
// =====================
function saveBookmark(){
  const url = document.getElementById("searchInput").value.trim();
  if(!url) return;

  let list = JSON.parse(localStorage.getItem("bm") || "[]");

  if(!list.includes(url)){
    list.push(url);
    localStorage.setItem("bm", JSON.stringify(list));
    loadBookmarks();
  }
}

function loadBookmarks(){
  const container = document.getElementById("bookmarks");
  if(!container) return;

  let list = JSON.parse(localStorage.getItem("bm") || "[]");

  container.innerHTML = "";

  list.forEach(url=>{
    const btn = document.createElement("button");
    btn.textContent
