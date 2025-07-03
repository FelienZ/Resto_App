import { FetchDataLogout, FetchDataRegistration, FetchDataLogin }  from "./fetcher.js";

const toggleHamburger = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
toggleHamburger.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  menu.classList.toggle('flex');
});

const animation = document.querySelector('.animation');
const information = document.querySelector('.information');
setTimeout(() => {
  animation.classList.toggle('hidden');
  information.classList.toggle('hidden');
  information.classList.toggle('flex');
  information.classList.toggle('mt-10');
}, 2000);

const loginTrigger = document.getElementById('login-trigger');
if(loginTrigger){
    const formLogin = document.getElementById('login-form');
    loginTrigger.addEventListener('click', () =>{
    formLogin.classList.remove('hidden');
    formLogin.classList.add('flex');
    });    
}

const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', () =>{
  formLogin.classList.remove('flex');
  formLogin.classList.add('hidden');
});
const triggerReg = document.getElementById('registration-trigger');
const formReg = document.getElementById('registration-form');
triggerReg.addEventListener('click', () =>{
  formLogin.classList.toggle('hidden');
  formReg.classList.remove('hidden');
  formReg.classList.add('flex');
});
const closeBtn2 = document.getElementById('close-btn2');
closeBtn2.addEventListener('click', () =>{
  formReg.classList.remove('flex');
  formReg.classList.add('hidden');
});

const loginRdir = document.getElementById('login-rdir');
loginRdir.addEventListener('click', () =>{
  formReg.classList.toggle('hidden');
  formLogin.classList.remove('hidden');
  formLogin.classList.add('flex');
});

const logoutTrigger = document.getElementById("logout-trigger");
const logoutModal = document.getElementById("logout-modal");
const cancelLogout = document.getElementById("cancel-logout");

if (logoutTrigger) {
logoutTrigger.addEventListener("click", () => {
    console.log(logoutTrigger)
    logoutModal.classList.remove("hidden");
    logoutModal.classList.add("flex");
});
}

cancelLogout.addEventListener("click", () => {
logoutModal.classList.add("hidden");
logoutModal.classList.remove("flex");
});


FetchDataRegistration()
FetchDataLogin()
FetchDataLogout()