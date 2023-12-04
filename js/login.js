import dados from "./cadastro.js";


    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault();

        let email = document.getElementById('E-mail').value;
        let senha = document.getElementById('Senha').value;

        // Verifica se o usuário existe nos dados existentes
        if (verificarUsuario(email, senha)) {
            alert('Login bem-sucedido!');
        } else {
            alert('Usuário ou senha incorretos. Tente novamente.');
        }
    });

    function verificarUsuario(email, senha) {
        return dados.some(user => user.email === email && user.senha === senha);
    }
