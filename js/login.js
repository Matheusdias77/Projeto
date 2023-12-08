import {carregarDados} from "./cadastro.js";

let dados = carregarDados();
const formulario = document.getElementById('cadastro');


formulario.addEventListener('submit', function(event) {
    event.preventDefault();

    let email = document.getElementById('E-mail').value;
    let senha = document.getElementById('Senha').value;

    // Verifica se o usuário existe nos dados existentes
    if (verificarUsuario(email, senha)) {
        setTimeout(function() {
            document.getElementById('E-mail').value = '';
            document.getElementById('Senha').value = '';
            window.location.href = '/html/dashboard.html';
        }, 2000);
    } else {
        setTimeout(function(){
            alert('Usuário ou senha incorretos. Tente novamente.');
            document.getElementById('Senha').value = '';
        }, 2000);
    }
});

function verificarUsuario(email, senha) {
    return dados.some(user => user.email === email && user.senha === senha);
}

