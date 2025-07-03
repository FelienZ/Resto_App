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