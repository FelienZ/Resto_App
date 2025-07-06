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
        console.log(data)
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