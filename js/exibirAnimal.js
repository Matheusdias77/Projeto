document.addEventListener("DOMContentLoaded", function() {
    const urlAtual = window.location.href;
    if(urlAtual.includes('animaisTotal.html')){
        exibirAnimais();
    }else if(urlAtual.includes('animaisGest.html')){
        exibirGestantes();
        setInterval(function() {
            exibirGestantes();
        }, 5000);
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
            animalContainer.classList.add("animal-container");

            const idAnimal = document.createElement("p");
            idAnimal.textContent = `ID: ${cadastrados.idAnimal}`;

            const genero = document.createElement("p");
            genero.textContent = `Gênero: ${cadastrados.genero}`;

            const imagem = document.createElement("img");
            imagem.src = cadastrados.imagem;
            imagem.alt = `Imagem do Animal ${cadastrados.idAnimal}`;

            const editar = document.createElement('button');
            editar.type = 'button';
            editar.classList.add('button');

            const deletar = document.createElement('button');
            deletar.type = 'button'; 
            deletar.classList.add('button');

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

                const descricao = document.createElement("p");
                descricao.textContent = `${cadastrados.descricao}`;

                const imagem = document.createElement("img");
                imagem.src = cadastrados.imagem;
                imagem.alt = `Imagem do Animal ${cadastrados.idAnimal}`;

                animalContainer.appendChild(imagem);
                animalContainer.appendChild(idAnimal);
                animalContainer.appendChild(descricao);

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

                const tempoDias = document.createElement("p");
                tempoDias.textContent = `Dias: ${cadastrados.tempoGest.dias}`;
                const tempoHoras = document.createElement("p");
                tempoHoras.textContent = `Horas: ${cadastrados.tempoGest.horas}`;
                const tempoMinutos = document.createElement("p");
                tempoMinutos.textContent = `Minutos: ${cadastrados.tempoGest.minutos}`;

                const imagem = document.createElement("img");
                imagem.src = cadastrados.imagem;
                imagem.alt = `Imagem do Animal ${cadastrados.idAnimal}`;

                animalContainer.appendChild(imagem);
                animalContainer.appendChild(idAnimal);
                animalContainer.appendChild(tempoDias);
                animalContainer.appendChild(tempoHoras);
                animalContainer.appendChild(tempoMinutos);

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

setInterval(function() {
    atualizarTempoGestacao();
}, 5000);

function calcularDiferenca(dataInicio, dataAtual) {
    const diferencaEmMilissegundos = dataAtual - dataInicio;
    const diferencaEmMinutos = Math.floor(diferencaEmMilissegundos / 60000);
    const dias = Math.floor(diferencaEmMinutos / (24 * 60));
    const horas = Math.floor((diferencaEmMinutos % (24 * 60)) / 60);
    const minutos = diferencaEmMinutos % 60;

    return { dias, horas, minutos };
}

function atualizarTempoGestacao() {
    const dados = carregarDados();

    dados.forEach(animal => {
        if (animal.tempoGest && typeof animal.tempoGest === 'object') {
            console.log(`Atualizando tempo de gestação para o animal ${animal.idAnimal}`);
            try {
                const dataGestacao = new Date(animal.dataGestacao);
                const diferencaAtualizada = calcularDiferenca(dataGestacao, new Date());

                animal.tempoGest.dias = diferencaAtualizada.dias;
                animal.tempoGest.horas = diferencaAtualizada.horas;
                animal.tempoGest.minutos = diferencaAtualizada.minutos;

                console.log(`Tempo de gestação atualizado: ${JSON.stringify(animal.tempoGest)}`);
            } catch (error) {
                console.error(`Erro ao atualizar o tempo de gestação para o animal ${animal.idAnimal}: ${error}`);
                animal.tempoGest = null; 
            }
        }
    });

    localStorage.setItem('registroAnimal', JSON.stringify(dados));
}

function mudarTela(destino) {
    setTimeout(function() {
        window.location.href = destino;
    }, 500);
}
