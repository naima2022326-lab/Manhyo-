const secret="D3r5t0n3";
const loginEl=document.getElementById("login");
const appEl=document.getElementById("app");
const pw=document.getElementById("pw");

// 🔐 IMPROVED LOGIN
function login(){
  if(pw.value!==secret){
    pw.value="";
    pw.placeholder="Wrong password";
    pw.style.border="1px solid red";

    setTimeout(()=>{
      pw.placeholder="Enter Password";
      pw.style.border="1px solid rgba(255,255,255,.2)";
    },1200);

    return;
  }

  // Smooth fade out
  loginEl.style.transition="opacity 0.4s ease";
  loginEl.style.opacity="0";

  setTimeout(()=>{
    loginEl.style.display="none";
    appEl.style.display="block";
  },400);
}

// ⌨️ ENTER TO LOGIN
pw.addEventListener("keydown",e=>{
  if(e.key==="Enter") login();
});

// ===========================
// 📖 READER SYSTEM (UNCHANGED)
// ===========================

const overlay = document.getElementById("overlay");
const reader = document.getElementById("reader");
const loader = document.getElementById("loader");

document.querySelectorAll(".card").forEach(card=>{
  card.addEventListener("click",()=>{
    const url = card.dataset.url;

    overlay.style.display="block";
    loader.style.display="flex";

    reader.src = url;

    setTimeout(()=>overlay.requestFullscreen?.(),50);

    reader.onload = ()=>{
      loader.style.display="none";
    };
  });
});

function closeReader(){
  document.exitFullscreen?.();
  document.getElementById("overlay").style.display="none";
  document.getElementById("reader").src="";
}

// ESC closes reader
window.addEventListener("keydown",e=>{
  if(e.key === "Escape"){
    closeReader();
  }
});

// Exit fullscreen closes reader
document.addEventListener("fullscreenchange",()=>{
  if(!document.fullscreenElement){
    closeReader();
  }
});

// Smooth scrolling inside reader
window.addEventListener("keydown",e=>{
  if(!document.fullscreenElement) return;

  const url=document.getElementById("reader").src||"";
  if(url.includes("comix.to")) return;

  const keys=["ArrowDown","ArrowUp","PageDown","PageUp"];
  if(!keys.includes(e.key)) return;

  e.preventDefault();

  try{
    document.getElementById("reader").contentWindow.scrollBy({
      top:
        e.key==="ArrowDown"?120:
        e.key==="ArrowUp"?-120:
        e.key==="PageDown"?500:-500,
      behavior:"smooth"
    });
  }catch{}
});
