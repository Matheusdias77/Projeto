

document.addEventListener("DOMContentLoaded", function() {
    exibirDetalhesAnimais();
});

function exibirDetalhesAnimais() {
    const dados = carregarDados();
    const animal = document.getElementById("cardAnimal");

    if (animal) {
        dados.forEach(cadastrados => {
            //animalContainer.classList.add("animal-container");

            const idAnimal = document.createElement("p");
            idAnimal.textContent = `ID: ${cadastrados.idAnimal}`;

            const genero = document.createElement("p");
            genero.textContent = `Gênero: ${cadastrados.genero}`;

            const imagem = document.createElement("img");
            imagem.src = cadastrados.imagem;
            imagem.alt = `Imagem do Animal ${cadastrados.idAnimal}`;

            animal.appendChild(idAnimal);
            animal.appendChild(genero);
            animal.appendChild(imagem);
            
        });
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


function mudarTela(destino) {
    setTimeout(function() {
        window.location.href = destino;
    }, 500);
}
