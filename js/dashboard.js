document.addEventListener("DOMContentLoaded", function() {
    quantidadeAnimal();
});


function mudarTela(destino) {
    setTimeout(function() {
        window.location.href = destino;
    }, 500);
}

function quantidadeAnimal() {
    const dados = carregarDados();
    const quantidade = dados.length;

    const totalAnimais = document.getElementById("total-animais");
    if (totalAnimais) {
        totalAnimais.textContent = quantidade;
    }

    const totalDoentes = document.getElementById('total-doentes');
    if(totalDoentes){
        // const totalDoentes = dados.filter(animal => /* Condição para animais doentes */).length;
        totalDoentes.textContent = quantidade;
    }

    const totalGestante = document.getElementById('total-gestantes');
    if(totalGestante){
        // const totalGestantes = dados.filter(animal => /* Condição para animais gestantes */).length; 
        totalGestante.textContent = quantidade;
    }
}

function carregarDados() {
    const dadosExistenteaux = localStorage.getItem('registroAnimal');
    let dadosExistente = [];

    try {
        dadosExistente = JSON.parse(dadosExistenteaux) || [];
    } catch (error) {
        console.error('Erro ao analisar os dados existentes:', error);
    }

    if (!Array.isArray(dadosExistente)) {
        dadosExistente = [];
    }

    return dadosExistente;
}
