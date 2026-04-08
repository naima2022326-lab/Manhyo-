// 🔐 RANDOM ONE-TIME PASSWORD (PER LOAD)
const secret = Math.random().toString(36).slice(2,8).toUpperCase();
alert("Password: " + secret); // remove later if you want

const loginEl = document.getElementById("login");
const appEl = document.getElementById("app");
const pw = document.getElementById("pw");

// LOGIN
function login(){
  if(pw.value !== secret){
    pw.value = "";
    pw.placeholder = "Wrong password";
    pw.style.border = "2px solid red";
    return;
  }

  // ✅ FADE OUT THEN REMOVE
  loginEl.style.opacity = "0";

  setTimeout(()=>{
    loginEl.style.display = "none"; // fully gone
    appEl.style.display = "block";
  },300);
}

// ENTER KEY
pw.addEventListener("keydown", e=>{
  if(e.key === "Enter") login();
});
