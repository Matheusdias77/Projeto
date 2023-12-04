let form = document.getElementById('cadastro');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtém os valores do formulário
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('E-mail').value;
    let senha = document.getElementById('Senha').value;

    if (validarEmailExistente(email)) {
        document.getElementById('E-mail').value = '';
        document.getElementById('E-mail').classList.add('erro');
        document.getElementById('E-mail').setAttribute('placeholder', 'E-mail já cadastrado');
        return;
    }

    document.getElementById('E-mail').setAttribute('placeholder', 'Digite seu E-mail');

    salvarDados(nome, email, senha);

    
    mensagemSucesso.style.color = 'green';
    mensagemSucesso.textContent = 'Cadastro bem-sucedido!';
    mensagemSucesso.style.display = 'block';

    setTimeout(function() {
        document.getElementById('nome').value = '';
        document.getElementById('E-mail').value = '';
        document.getElementById('Senha').value = '';
        mensagemSucesso.style.display = 'none';
    }, 3000);

});

function validarEmailExistente(email) {
    const dadosExistenteString = localStorage.getItem('cadastrados');
    let dadosExistente = [];

    try {
        dadosExistente = JSON.parse(dadosExistenteString) || [];
    } catch (error) {
        console.error('Erro ao analisar os dados existentes:', error);
    }

    if (!Array.isArray(dadosExistente)) {
        dadosExistente = [];
    }

    // Verifica se o e-mail já existe na lista de cadastrados
    return dadosExistente.some(dado => dado.email === email);
}


function salvarDados(nome, email, senha) {
    // Carrega os dados existentes do localStorage
    const dadosExistenteString = localStorage.getItem('cadastrados');
    let dadosExistente = [];
  
    try {
      dadosExistente = JSON.parse(dadosExistenteString) || [];
    } catch (error) {
      console.error('Erro ao analisar os dados existentes:', error);
    } 

    if (!Array.isArray(dadosExistente)) {
      dadosExistente = [];
    }
  
    dadosExistente.push({ nome: nome, email: email, senha: senha });
    localStorage.setItem('cadastrados', JSON.stringify(dadosExistente));
}
  