document.addEventListener("DOMContentLoaded", function() {
    const urlAtual = window.location.href;
    if(urlAtual.includes('animaisTotal.html')){
        exibirAnimais();
    }else if(urlAtual.includes('animaisGest.html')){
        exibirGestantes();
    }else if(urlAtual.includes('animaisDoente')){
        exibirDoentes();
    }
});

function exibirAnimais() {
    const dados = carregarDados();
    const animal = document.getElementById("cardAnimal");

    if (animal) {
        dados.forEach(cadastrados => {
            const animalContainer = document.createElement("div");
            //animalContainer.classList.add("animal-container");

            const idAnimal = document.createElement("p");
            idAnimal.textContent = `ID: ${cadastrados.idAnimal}`;

            const genero = document.createElement("p");
            genero.textContent = `Gênero: ${cadastrados.genero}`;

            const imagem = document.createElement("img");
            imagem.src = cadastrados.imagem;
            imagem.alt = `Imagem do Animal ${cadastrados.idAnimal}`;

            const editar = document.createElement('button');
            editar.type = 'button';
            //editar.classList.add('estilo');

            const deletar = document.createElement('button');
            deletar.type = 'button'; 
            //deletar.classList.add('estilo');

            animalContainer.appendChild(imagem);
            animalContainer.appendChild(idAnimal);
            animalContainer.appendChild(genero);
            animalContainer.appendChild(editar);
            animalContainer.appendChild(deletar);

            animal.appendChild(animalContainer);
            
        });
    }
}

function exibirDoentes(){
    const dados = carregarDados();
    const animal = document.getElementById("cardAnimal");

    if (animal) {
        animal.innerHTML = '';

        dados.forEach(cadastrados => {
            if (cadastrados.tipoDoenca) {
                const animalContainer = document.createElement("div");
                //animalContainer.classList.add("animal-container");

                const idAnimal = document.createElement("p");
                idAnimal.textContent = `ID: ${cadastrados.idAnimal}`;

                const tipoDoenca = document.createElement("p");
                tipoDoenca.textContent = `Tipo de Doença: ${cadastrados.tipoDoenca}`;

                const descricao = document.createElement("p");
                descricao.textContent = `Descrição: ${cadastrados.descricao}`;

                const tratamento = document.createElement("p");
                tratamento.textContent = `Tratamento: ${cadastrados.tratamento}`;

                const imagem = document.createElement("img");
                imagem.src = cadastrados.imagem;
                imagem.alt = `Imagem do Animal ${cadastrados.idAnimal}`;

                animalContainer.appendChild(imagem);
                animalContainer.appendChild(idAnimal);
                animalContainer.appendChild(tipoDoenca);
                animalContainer.appendChild(descricao);
                animalContainer.appendChild(tratamento);

                animal.appendChild(animalContainer);
            } 
        });
    }
}

function exibirGestantes(){
    const dados = carregarDados();
    const animal = document.getElementById("cardAnimal");

    if (animal) {
        animal.innerHTML = '';
        dados.forEach(cadastrados => {
            if (cadastrados.tempoGest!=null) {
                const animalContainer = document.createElement("div");
                //animalContainer.classList.add("animal-container");

                const idAnimal = document.createElement("p");
                idAnimal.textContent = `ID: ${cadastrados.idAnimal}`;

                const tempo = document.createElement("p");
                tempo.textContent = `Tempo: ${cadastrados.tempoGest}`;

                const imagem = document.createElement("img");
                imagem.src = cadastrados.imagem;
                imagem.alt = `Imagem do Animal ${cadastrados.idAnimal}`;

                animalContainer.appendChild(imagem);
                animalContainer.appendChild(idAnimal);
                animalContainer.appendChild(tempo);

                animal.appendChild(animalContainer);
            } 
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
