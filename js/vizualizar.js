document.addEventListener("DOMContentLoaded", function() {
    const userNameDisplay = document.getElementById('userName');
    const userEmailDisplay = document.getElementById('userEmail');
    const mensagemErro = document.getElementById('mensagemErro');


    const token = localStorage.getItem('token');

 
    if (!token) {
    
        window.location.href = 'login.html';
        return;
    }

    
    const urlParams = new URLSearchParams(window.location.search);
    const visualizarUserId = urlParams.get('id');

    if (visualizarUserId) {
       
        fetch(`http://localhost:8000/api/user/${visualizarUserId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados do usuário');
            }
            return response.json();
        })
        .then(data => {
           
            if (data.usuario) {
                userNameDisplay.textContent = data.usuario.name;
                userEmailDisplay.textContent = data.usuario.email;
              
            } else {
                window.location.href = 'login.html'; 
            }
        })
        .catch(error => {
            console.error('Erro ao obter os dados do usuário:', error);
            mensagemErro.textContent = 'Erro ao carregar os dados do usuário.';
            mensagemErro.classList.remove('d-none');
            window.location.href = 'login.html';
        });
    } else {
        mensagemErro.textContent = 'ID do usuário não especificado.';
        mensagemErro.classList.remove('d-none');
    }
});
