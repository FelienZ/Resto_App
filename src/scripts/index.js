import { FetchDataLogout, FetchDataRegistration, FetchDataLogin, fetchDataReview, fetchDataCheckOut }  from "./fetcher.js";

const toggleHamburger = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
toggleHamburger.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  menu.classList.toggle('flex');
});

const animation = document.querySelector('.animation');
const information = document.querySelector('.information');
if(animation){
setTimeout(() => {
  animation.classList.toggle('hidden');
  information.classList.toggle('hidden');
  information.classList.toggle('flex');
  information.classList.toggle('mt-10');
}, 2000);
}

const loginTrigger = document.getElementById('login-trigger');
const formLogin = document.getElementById('login-form');
if(loginTrigger){
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
    // console.log(logoutTrigger)
    logoutModal.classList.remove("hidden");
    logoutModal.classList.add("flex");
});
}

cancelLogout.addEventListener("click", () => {
logoutModal.classList.add("hidden");
logoutModal.classList.remove("flex");
});

const btnReview = document.getElementById('btn-review');
if(btnReview){
const formReview = document.getElementById('form-review');
if(formReview){
  btnReview.addEventListener('click', function(){
    formReview.classList.remove('hidden');
    formReview.classList.add('flex')
    setTimeout(() => {
      formReview.scrollIntoView({behavior:'smooth'})
    }, 200);
    fetchDataReview()
    return;
  })
}
if(!formReview){
  btnReview.addEventListener('click', function(){
    Toastify({
      text: 'Silakan Login Terlebih Dahulu!',
      backgroundColor: 'darkorange',
      position:'center',
      duration: 2000
    }).showToast();
    formLogin.classList.remove('hidden');
    formLogin.classList.add('flex');
  })
}
}

const checkOutTrigger = document.querySelectorAll('.pesan');
if(checkOutTrigger){
  const formCheckOut = document.getElementById('checkout-modal');
  let jumlah = document.querySelector('.jumlah');
    const add = document.querySelector('.increment');
    const reduce = document.querySelector('.decrement');
    const totalPrice = document.getElementById('totalPrice');
    const totalPriceForm = document.getElementById('totalPriceForm');
    let currentPrice = 0;
    updateHarga();
    add.addEventListener('click', function(e){
      e.preventDefault();
      if(jumlah.value < 10){
        let amount = parseInt(jumlah.value)
        jumlah.value = ++amount;
        // totalPrice.textContent = (currentPrice + (jumlah.value *hargaFix)).toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
        updateHarga();
      }
    })
    reduce.addEventListener('click', function(e){
      e.preventDefault();
      if(jumlah.value > 1){
        let amount = parseInt(jumlah.value)
        jumlah.value = --amount;
        // totalPrice.textContent = (currentPrice + (jumlah.value *hargaFix)).toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})
        updateHarga();
      }
    })

    function updateHarga(){
      const total = parseInt(jumlah.value)
      const totalHarga = currentPrice * total
      totalPrice.textContent = totalHarga.toLocaleString("id-ID", {style: 'currency', currency: 'IDR'});
      totalPriceForm.value = totalHarga;
    }
    
  checkOutTrigger.forEach(check => {
    check.addEventListener('click', function(){
    const card = this.closest('.card');
    
    const name = card.querySelector('#menuName')
    const pic = card.querySelector('#menuPic')
    const price = card.querySelector('#menuPrice').textContent.trim();

    const picture = pic.getAttribute('src')
    const nama = document.querySelector('.nama');
    const gambar = document.querySelector('.gambar');
    const harga = document.querySelector('.harga');
    const namaForm = document.getElementById('namaForm')

    nama.textContent = name.textContent;
    namaForm.value = name.textContent
    gambar.setAttribute('src', picture)
    harga.innerHTML = price;
    
    const cleaned = price.replace(",00", "");
    const hargaFix = parseInt(cleaned.replace(/\D/g, ""));

    currentPrice = hargaFix;
    updateHarga();
    
    //   const submitCheckout = document.getElementById('checkoutNow')
  //   submitCheckout.addEventListener('click', function(){
    
  // })

    formCheckOut.classList.remove('hidden');
    formCheckOut.classList.add('flex')
  })
  
  const closeCheckOut = document.getElementById('close-checkout');
  closeCheckOut.addEventListener('click', function(e){
    e.preventDefault();
    formCheckOut.classList.remove('flex');
    formCheckOut.classList.add('hidden')
  })
  })  

  fetchDataCheckOut();
}


FetchDataRegistration()
FetchDataLogin()
FetchDataLogout()