
let form = document.getElementById('cadastro');
let dados;


form.addEventListener('submit', function(event) {
    event.preventDefault()

    const endEmail = document.getElementById('E-mail');
    const endNome = document.getElementById('nome');
    const endSenha = document.getElementById('Senha');
    
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('E-mail').value;
    let senha = document.getElementById('Senha').value;

    if(!nome || !email || !senha){
        if(!senha){
            endSenha.classList.add('erro');
        }
        if(!email){
            endEmail.classList.add('erro');
        }
        if(!nome){
            endNome.classList.add('erro');
        }
        return
    }

    if (validarEmail(email)) {
        endEmail.value = '';
        endEmail.classList.add('erro');
        endEmail.setAttribute('placeholder', 'E-mail já cadastrado');
        return;
    }

    document.getElementById('E-mail').setAttribute('placeholder', 'Digite seu E-mail');

    salvarDados(nome, email, senha);

    mensagemSucesso.textContent = 'Cadastro bem-sucedido!';
    mensagemSucesso.style.display = 'block';

    setTimeout(function() {
        endNome.value = '';
        endEmail.value = '';
        endSenha.value = '';
        mensagemSucesso.style.display = 'none';
    }, 3000);
});


function carregarDados() {
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

    return dadosExistente;
}

function validarEmail(email) {
    dados = carregarDados(); 

    return dados.some(dado => dado.email === email);
}


function salvarDados(nome, email, senha) {
    dados = carregarDados();
  
    dados.push({ nome: nome, email: email, senha: senha });
    localStorage.setItem('cadastrados', JSON.stringify(dados));
}

export {carregarDados};