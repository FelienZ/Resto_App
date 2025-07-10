export async function FetchDataRegistration(){
    const regForm = document.getElementById('registration-form');
    regForm.addEventListener("submit", async function(e){
    e.preventDefault();
    const newData = new FormData(regForm);
    const data = {
        name : newData.get('name'),
        email: newData.get('email'),
        password: newData.get('password')
    }
    try {
        const response = await fetch("/register", {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body  : JSON.stringify(data)
        });
        
        const result = await response.json();

        Toastify({
        text: result.message,
        duration: 2000,
        gravity: 'top',
        position: 'center',
        style:{
            background: result.type === 'error' ? 'red' : 'lime',
            color: 'white'
        }
        }).showToast();

        if (response.ok && result.type === "success") {
        regForm.reset();
        regForm.classList.add('hidden');
        }
    }
    catch(error){
        Toastify({
        text: 'Terjadi Kesalahan!',
        duration: 2000,
        gravity: 'top',
        position: 'center',
        style:{
            background: 'red',
            color: 'white'
        }
        }).showToast();
    }
    });
}

export async function FetchDataLogin() {
    const formLogin = document.getElementById('login-form');
    formLogin.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(formLogin);
        const data = {
            email : formData.get('email'),
            password: formData.get('password')
        }
        try{
            const response = await fetch('/login', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            })
            const result = await response.json();

            Toastify({
                text: result.message,
                duration: 2000,
                gravity: 'top',
                position: 'center',
                style:{
                    background: result.type === 'error' ? 'red' : 'lime',
                    color: 'white'
                }
                }).showToast();

                if(response.ok && result.type === 'success'){
                    formLogin.reset();
                    formLogin.classList.add('hidden');
                    setTimeout(() => window.location.reload(), 500);
                }

        }catch(error){
            Toastify({
        text: 'Terjadi Kesalahan!',
        duration: 2000,
        gravity: 'top',
        position: 'center',
        style:{
            background: 'red',
            color: 'white'
        }
        }).showToast();
        }
    })
}

export async function FetchDataLogout(){
    const confirmLogout = document.getElementById("confirm-logout");
    confirmLogout.addEventListener("click", async () => {
    try {
        const res = await fetch("/logout");
        const result = await res.json();

        Toastify({
        text: result.message,
        duration: 2000,
        gravity: "top",
        position: "center",
        style: {
            background: result.type === "error" ? 'red' : 'lime',
            color: "white"
        }
        }).showToast();

        if (result.type === "success") {
        setTimeout(() => {
            window.location.href = "/";
        }, 500);
        }
    } catch (err) {
        Toastify({
        text: "Gagal logout!",
        duration: 2000,
        gravity: "top",
        position: "center",
        style: { 
            ackground: "red", 
            color: "white" }
        }).showToast();
    }
    });
}

export async function fetchDataReview(){
    const formReview = document.getElementById('form-review');
    formReview.addEventListener('submit', async function(e){
        e.preventDefault();
        const formData = new FormData(formReview);
        const data = {
            rating: Number(formData.get('rating')),
            comment: formData.get('review-text')
        }
        const response = await fetch('/review', {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(data)
        })
        try{
        const result = await response.json();
            Toastify({
            text: result.message,
            duration: 2000,
            gravity: 'top',
            position: 'center',
            style:{
                background: result.type === 'error' ? 'red' : 'lime',
                color: 'white'
            }
            }).showToast();
            if(result.type === 'success' && response.ok){
                formReview.reset();
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            }
        }catch(err){
            Toastify({
            text: "Gagal Posting!",
            duration: 2000,
            gravity: "top",
            position: "center",
            style: { 
                ackground: "red", 
                color: "white" }
            }).showToast();
        }
    })
}

export async function fetchDataCheckOut() {
    const formCheckOut = document.getElementById('checkout-modal')
    // const btnCheckout = document.getElementById('checkoutNow');
    formCheckOut.addEventListener('submit', async function(e){
        e.preventDefault();
        const formData = new FormData(formCheckOut);
        const isLogin = formCheckOut.dataset.login === "true";
        const data = {
            nama: formData.get('menuName').valueOf(menuName),
            hargaSatuan : formData.get('hargaSatuan'),
            jumlah : formData.get('jumlah'),
            hargaTotal : formData.get('totalHarga')
        }
        const pesan = `Saya ingin memesan:\nMenu: ${data.nama}\nJumlah: ${data.jumlah}`;
        const whatsappLink = `https://wa.me/6281229564138?text=${encodeURIComponent(pesan)}`;
        if (!isLogin) {
            window.location.href = whatsappLink;
            return;
        }
        const response = await fetch('/checkout', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(data)
        })
        try{
            const result = await response.json();
            Toastify({
            text: result.message,
            duration: 2000,
            gravity: 'top',
            position: 'center',
            style:{
                background: result.type === 'error' ? 'red' : 'lime',
                color: 'white'
            }
            }).showToast();
            if(result.type === 'success' && response.ok){
                formCheckOut.reset();
                setTimeout(() => {
                    window.location.reload()
                }, 100);
            }
        }catch(err){
            Toastify({
            text: "Gagal Memesan!",
            duration: 2000,
            gravity: "top",
            position: "center",
            style: { 
                background: "red", 
                color: "white" }
            }).showToast();
        }
    })
}

export async function fetchUpdateCheckout(id) {
    const formUpdate = document.getElementById('edit-modal');
    formUpdate.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(formUpdate) 
        const data = ({
            jumlah: formData.get('jumlahEdit'),
            hargaTotal: formData.get('totalHargaEdit') 
        })
        const response = await fetch(`/checkout/${id}`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        try{
            const result = await response.json();
            Toastify({
            text: result.message,
            duration: 2000,
            gravity: 'top',
            position: 'center',
            style:{
                background: result.type === 'error' ? 'red' : 'lime',
                color: 'white'
            }
            }).showToast();
            if(result.type === 'success' && response.ok){
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        }catch(err){
            Toastify({
            text: "Gagal Menyimpan!",
            duration: 2000,
            gravity: "top",
            position: "center",
            style: { 
                background: "red", 
                color: "white" }
            }).showToast();
        }
    })
}

export async function fetchDeleteCheckout(id) {
    const confirmModal = document.getElementById('confirm-modal');
    confirmModal.addEventListener('click', async function() {
        try {
            const response = await fetch(`/checkout/${id}`,{
                method: 'DELETE'
            })
            const result = await response.json();
            Toastify({
            text: result.message,
            duration: 2000,
            gravity: 'top',
            position: 'center',
            style:{
                background: result.type === 'error' ? 'red' : 'lime',
                color: 'white'
            }
            }).showToast();
            if(result.type === 'success' && response.ok){
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        } catch (error) {
            Toastify({
            text: 'Gagal!',
            duration: 2000,
            gravity: 'top',
            position: 'center',
            style:{
                background: 'red',
                color: 'white'
            }
            }).showToast();
        }
    })
}