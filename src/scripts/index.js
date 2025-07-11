import { FetchDataLogout, FetchDataRegistration, FetchDataLogin, fetchDataReview, fetchDataCheckOut, fetchUpdateCheckout, fetchDeleteCheckout }  from "./fetcher.js";

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
    const unitPrice = document.getElementById('unitPriceForm');
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
    unitPrice.value = currentPrice;
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

const editOrders = document.querySelectorAll('.edit-pesanan');
if(editOrders){
  function editHandler(e){
      const detail = e.closest('.card-detail');
      const id = detail.querySelector('.edit-pesanan').dataset.id;
      fetchUpdateCheckout(id);
  }
  const formCheckOut = document.getElementById('edit-modal');
  let jumlah = document.querySelector('.jumlahEdit');
    const add = document.querySelector('.incrementEdit');
    const reduce = document.querySelector('.decrementEdit');
    const totalPrice = document.getElementById('totalPriceEdit');
    const totalPriceForm = document.getElementById('totalPriceFormEdit');
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

  editOrders.forEach(edit =>{
    edit.addEventListener('click', function(e){
      e.preventDefault()
      editHandler(this)
      const detail = this.closest('.card-detail');
      // console.log(detail)
      const name = detail.querySelector('#menuName').textContent;
      const totalItem = detail.querySelector('#menuItem').textContent;
      const unitPrice = detail.querySelector('#hargaSatuan').textContent;
      const totalPrice = detail.querySelector('#menuPrice').textContent
      const jumlahForm = formCheckOut.querySelector('.jumlahEdit');
      const id = detail.querySelector('.edit-pesanan').dataset.id;
      jumlahForm.setAttribute('value', Number(totalItem))

      const nama = document.querySelector('.namaEdit');
      const harga = document.querySelector('.hargaEdit');
      const namaForm = document.getElementById('namaFormEdit');
      // console.log(id)
      nama.textContent = name;
      namaForm.textContent = name;
      harga.textContent = unitPrice;
      
      const cleaned = unitPrice.replace(",00", "");
      const hargaFix = parseInt(cleaned.replace(/\D/g, ""));
      currentPrice = hargaFix

      updateHarga();

      formCheckOut.classList.remove('hidden');
      formCheckOut.classList.add('flex')
    })

  const closeCheckOut = document.getElementById('close-checkout-edit');
  closeCheckOut.addEventListener('click', function(e){
    e.preventDefault();
    formCheckOut.classList.remove('flex');
    formCheckOut.classList.add('hidden')
  })
  })
}

const deleteOrders = document.querySelectorAll('.hapus-pesanan');
if(deleteOrders){
  const confirmModal = document.getElementById('confirm-modal');
  const confirm = document.getElementById('confirm-cancel');
  const cancel = document.getElementById('cancel-cancel');
  function confirmCancel(id){
    fetchDeleteCheckout(id)
  }
  function cancelCancel(){
    confirmModal.classList.remove('flex');
    confirmModal.classList.add('hidden');
  }
  deleteOrders.forEach(deletes => {
    deletes.addEventListener('click', function(){
      const id = deletes.dataset.id;
      confirmModal.classList.remove('hidden');
      confirmModal.classList.add('flex')

      confirm.addEventListener('click', function(){
        confirmCancel(id)
      })
      cancel.addEventListener('click',function(){
        cancelCancel()
      })
    })
  })
}

const directCheckout = document.getElementById('direct-checkout');
if(directCheckout){ 
  let menu = [];
  let item = [];
  let totalHarga = document.getElementById('priceSummary').textContent
  const visibleData = [...document.querySelectorAll('.item-order')]
  .filter(items => window.getComputedStyle(items).display !== 'none');
  console.log(visibleData)

  visibleData.forEach(data => {
    const listMenu = data.querySelectorAll('.menuName');
    const listItem = data.querySelectorAll('.menuItem');
    listMenu.forEach(m => menu.push(m.textContent))
    listItem.forEach(i => item.push(i.textContent))
  })

  directCheckout.addEventListener('click',function(){
    // function generateMessage(idx){
    //   let pesan = `
    //   Pesanan ${idx} :\n
    //   Menu: ${menu[idx]},\n
    //   Jumlah: ${item[idx]}`
    //   const directWA = `https://wa.me/6281229564138?text=Halo, Saya ingin memesan : ${encodeURIComponent(pesan)}, Total: ${encodeURIComponent(totalHarga)}`;
    //   setTimeout(() => {
    //     window.location.href = directWA;
    //   }, 400);
    // }
    let pesan = `Halo, saya ingin memesan: \n`
    for (let i = 0; i < visibleData.length; i++) {
      // generateMessage(i)
      pesan += `\n  • Pesanan ${i+1}:\n     Menu: ${menu[i]},\n     Jumlah: ${item[i]}\n` 
    }
    
    pesan += `\n${totalHarga}`;
    const directWA = `https://wa.me/6281229564138?text=${encodeURIComponent(pesan)}`;
      setTimeout(() => {
        window.location.href = directWA;
      }, 400);
  })
}

const btnCheckOutDefault = document.getElementById('needLogin');
if(btnCheckOutDefault){
  btnCheckOutDefault.addEventListener('click', function(){
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

const input = document.getElementById('searchInput');
const resultBox = document.getElementById('searchResult');

input.addEventListener('input', function(e){
  e.preventDefault()
  const keyword = input.value.toLowerCase();
  resultBox.innerHTML = '';

  if (keyword.trim() === '') {
    resultBox.classList.add('hidden');
    return;
  }

  if(keyword.length < 3){
    resultBox.innerHTML = `<div class="w-full flex justify-between p-2 items-center">
    <p>Masukkan minimal 3 karakter</p>
    </div>`
    resultBox.classList.remove('hidden');
    resultBox.classList.add('flex');
    return;
  }
  const listMenu = document.getElementById('menuData').textContent;
  const dataMenu = JSON.parse(listMenu)
  const filterData = dataMenu.filter(data => data.menuName.toLowerCase().includes(keyword));
  if(filterData.length < 1){
    resultBox.textContent = 'Menu Tidak Tersedia'
    resultBox.classList.remove('hidden');
    resultBox.classList.add('flex');
    return;
  }
    resultBox.classList.remove('hidden');
    resultBox.classList.add('flex'); 

  if(keyword.length >= 3){
    filterData.forEach(data => {
      const container = document.createElement('tr');
      container.dataset.itemId = data.id
      const idItem = container.dataset.itemId
      
      container.className = 'w-full p-2 border-b border-gray-800';
      container.innerHTML = `
        <td class="w-full flex items-center text-nowrap justify-between">
          <p class="text-sm">${data.menuName}</p>
          <img src="${data.pic}" alt="${data.menuName}" class="w-10">
        </td>`;
      resultBox.appendChild(container);
      
      container.addEventListener('click',function(){
        if (idItem) {
        window.location.href = `/menu?id=${encodeURIComponent(idItem)}`;
        }
      })
      const btnSearch = document.getElementById('btnSearch')
      btnSearch.addEventListener('click', function(){
        if (idItem) {
        window.location.href = `/menu?id=${encodeURIComponent(idItem)}`;
        }
      })
    })
  }

})

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  
  if (!id) return;

  setTimeout(() => {
    const target = document.querySelector(`.card[data-id="${id}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.classList.add('bg-yellow-200');
      setTimeout(() => {
        target.classList.remove('bg-yellow-200');
      }, 4000);
    }
  }, 2000);
});

FetchDataRegistration()
FetchDataLogin()
FetchDataLogout()