// Typing Effect
const el = document.getElementById("typing");
const words = ["a Web Developer 💻","a Coder ⚡","a Designer 🎨"];
let i=0,j=0,del=false;
function tick(){
  const w = words[i];
  el.textContent = del?w.substring(0,j--):w.substring(0,j++);
  if(!del && j===w.length){ del=true; setTimeout(tick,1000); return; }
  if(del && j===0){ del=false; i=(i+1)%words.length; }
  setTimeout(tick,del?100:150);
}
tick();

// Dark Mode Toggle with LocalStorage
const toggle = document.getElementById("darkModeToggle");
if(localStorage.getItem("theme")==="dark"){ document.body.classList.add("dark-mode"); toggle.checked=true; }
toggle.addEventListener("change",()=>{
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme",document.body.classList.contains("dark-mode")?"dark":"light");
});

// Back to Top Button
const backBtn = document.getElementById("backToTop");
window.onscroll = () => { window.scrollY>300?backBtn.style.display="block":backBtn.style.display="none"; };
backBtn.addEventListener("click",()=>{ window.scrollTo({top:0,behavior:"smooth"}); });

// Sticky Navbar Shadow
const navbar = document.querySelector(".custom-navbar");
window.addEventListener("scroll",()=>{ navbar.classList.toggle("scrolled",window.scrollY>50); });

// Form Validation
const form = document.getElementById("contactForm");
form.addEventListener("submit",(e)=>{
  const name=form.name.value.trim(), email=form.email.value.trim(), message=form.message.value.trim();
  const pattern=/^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
  if(!name||!email||!message){ e.preventDefault(); alert("⚠️ Please fill out all fields!"); return; }
  if(!pattern.test(email)){ e.preventDefault(); alert("⚠️ Please enter a valid email!"); return; }
  alert("✅ Form submitted successfully!");
});
