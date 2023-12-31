document.addEventListener("DOMContentLoaded", function () {
    const urlAtual = window.location.href;
    atualizarTempoGestacao();
    if (urlAtual.includes('animaisTotal.html')) {
        exibirAnimais();
    } else if (urlAtual.includes('animaisGest.html')) {
        exibirGestantes();
        setInterval(function () {
            exibirGestantes();
        }, 5000);
    } else if (urlAtual.includes('animaisDoente')) {
        exibirDoentes();
    }
});

let botaoConfirmar = document.getElementById('btnConfirmar');

function exibirAnimais() {
    const dados = carregarDados();
    const animal = document.getElementById("cardAnimal");

    if (animal) {
        dados.forEach(cadastrados => {
            const animalContainer = document.createElement("div");
            animalContainer.classList.add("animal-container");

            const imagemInformacoes = document.createElement("div");
            imagemInformacoes.classList.add("divAnimal");

            const idAnimal = document.createElement("p");
            idAnimal.textContent = `ID: ${cadastrados.idAnimal}`;
            idAnimal.classList.add("idAnimal");

            const genero = document.createElement("p");
            genero.textContent = `Gênero: ${cadastrados.genero}`;

            const imagem = document.createElement("img");
            imagem.src = cadastrados.imagem;
            imagem.alt = `Imagem do Animal ${cadastrados.idAnimal}`;

            const editar = document.createElement('button');
            editar.type = 'button';
            editar.classList.add('button');
            editar.textContent = 'Editar';
            editar.addEventListener('click', () => editarAnimal(cadastrados.idAnimal));

            const deletar = document.createElement('button');
            deletar.type = 'button';
            deletar.classList.add('button');
            deletar.textContent = 'Deletar';
            deletar.addEventListener('click', () => excluirAnimal(cadastrados.idAnimal));

            imagemInformacoes.appendChild(imagem);
            imagemInformacoes.appendChild(idAnimal);
            imagemInformacoes.appendChild(genero);

            animalContainer.appendChild(imagemInformacoes);
            animalContainer.appendChild(editar);
            animalContainer.appendChild(deletar);

            animal.appendChild(animalContainer);

        });
    }
}

function exibirDoentes() {
    const dados = carregarDados();
    const animal = document.getElementById("cardAnimal");

    if (animal) {
        animal.innerHTML = '';

        dados.forEach(cadastrados => {
            if (cadastrados.descricao) {
                const animalContainer = document.createElement("div");
                animalContainer.classList.add("animal-container");

                const imagemInformacoes = document.createElement("div");
                //imagemInformacoes.classList.add("estilo");

                const idAnimal = document.createElement("p");
                idAnimal.textContent = `ID: ${cadastrados.idAnimal}`;
                idAnimal.classList.add("idAnimal");

                const descricao = document.createElement("p");
                descricao.textContent = `Descrição: ${cadastrados.descricao}`;

                const imagem = document.createElement("img");
                imagem.src = cadastrados.imagem;
                imagem.alt = `Imagem do Animal ${cadastrados.idAnimal}`;

                const curado = document.createElement('button');
                curado.type = 'button';
                curado.classList.add('button');
                curado.textContent = 'Boa Saúde';
                curado.addEventListener('click', () => saudeBoa(cadastrados.idAnimal));

                imagemInformacoes.appendChild(imagem);
                imagemInformacoes.appendChild(idAnimal);
                imagemInformacoes.appendChild(descricao);

                animalContainer.appendChild(imagemInformacoes);
                animalContainer.appendChild(curado);

                animal.appendChild(animalContainer);
            }
        });
    }
}

function exibirGestantes() {
    const dados = carregarDados();
    const animal = document.getElementById("cardAnimal");

    if (animal) {
        animal.innerHTML = '';
        dados.forEach(cadastrados => {
            if (cadastrados.dataGestacao) {
                const animalContainer = document.createElement("div");
                animalContainer.classList.add("animal-container");

                const imagemInformacoes = document.createElement("div");


                const idAnimal = document.createElement("p");
                idAnimal.textContent = `ID: ${cadastrados.idAnimal}`;
                idAnimal.classList.add("para");

                const tempoDias = document.createElement("p");
                tempoDias.textContent = `${cadastrados.tempoGest.dias}d`;
                tempoDias.classList.add("para");
                const tempoHoras = document.createElement("p");
                tempoHoras.textContent = `${cadastrados.tempoGest.horas}h`;
                tempoHoras.classList.add("para");
                const tempoMinutos = document.createElement("p");
                tempoMinutos.textContent = `${cadastrados.tempoGest.minutos}m`;
                tempoMinutos.classList.add("para");

                const imagem = document.createElement("img");
                imagem.src = cadastrados.imagem;
                imagem.alt = `Imagem do Animal ${cadastrados.idAnimal}`;

                const fimGestacao = document.createElement('button');
                fimGestacao.type = 'button';
                fimGestacao.classList.add('button');
                fimGestacao.textContent = 'Terminar Gestação';
                fimGestacao.addEventListener('click', () => terminarGestacao(cadastrados.idAnimal));

                imagemInformacoes.appendChild(imagem);
                imagemInformacoes.appendChild(idAnimal);
                imagemInformacoes.appendChild(tempoDias);
                imagemInformacoes.appendChild(tempoHoras);
                imagemInformacoes.appendChild(tempoMinutos);

                animalContainer.appendChild(imagemInformacoes);
                animalContainer.appendChild(fimGestacao);

                animal.appendChild(animalContainer);
            }
        });
    }
}

function editarAnimal(idAnimal) {
    window.location.href = `editar.html?id=${idAnimal}`;
}

function excluirAnimal(idAnimal) {
    document.getElementById('customConfirm').style.display = 'block';

    document.getElementById('btnConfirmar').addEventListener('click', function () {
        let dados = carregarDados();
        const indiceAnimal = dados.findIndex(animal => animal.idAnimal === idAnimal);

        if (indiceAnimal !== -1) {
            dados.splice(indiceAnimal, 1);
            localStorage.setItem('registroAnimal', JSON.stringify(dados));
            window.location.reload();
        }
    });

    document.getElementById('btnCancelar').addEventListener('click', function () {
        console.log('Ação de exclusão cancelada');
        document.getElementById('customConfirm').style.display = 'none';
    });
}

// não apagando ...
function terminarGestacao(idAnimal) {
    document.getElementById('customConfirm').style.display = 'block';

    document.getElementById('btnConfirmar').addEventListener('click', function () {
        console.log('Confirmar');
        let dados = carregarDados();
        dados.forEach(dado => {
            if (dado.idAnimal === idAnimal) {
                if ('dataGestacao' in dado) {
                    delete dado.dataGestacao;
                    dado.tempoGest = null;
                }
                localStorage.setItem('registroAnimal', JSON.stringify(dados));
                window.location.reload();
            }
        });
    });
    document.getElementById('btnCancelar').addEventListener('click', function () {
        console.log('Ação de exclusão cancelada');
        document.getElementById('customConfirm').style.display = 'none';
    });
}

function saudeBoa(idAnimal) {
    document.getElementById('customConfirm').style.display = 'block';

    document.getElementById('btnConfirmar').addEventListener('click', function () {
        console.log('Ação de exclusão confirmada');
        const confirmacao = document.getElementById('customConfirm').style.display = 'none';
        if (confirmacao) {
            let dados = carregarDados();
            dados.forEach(dado => {
                if (dado.idAnimal === idAnimal) {
                    if ('descricao' in dado) {
                        delete dado.descricao;
                    }
                    if ('tratamento' in dado) {
                        delete dado.tratamento;
                    }
                    localStorage.setItem('registroAnimal', JSON.stringify(dados));
                    window.location.reload();
                }
            });
        }
    });
    document.getElementById('btnCancelar').addEventListener('click', function () {
        console.log('Ação de exclusão cancelada');
        document.getElementById('customConfirm').style.display = 'none';
    });
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

setInterval(function () {
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
            try {
                const dataGestacao = new Date(animal.dataGestacao);
                const diferencaAtualizada = calcularDiferenca(dataGestacao, new Date());

                animal.tempoGest.dias = diferencaAtualizada.dias;
                animal.tempoGest.horas = diferencaAtualizada.horas;
                animal.tempoGest.minutos = diferencaAtualizada.minutos;

            } catch (error) {
                animal.tempoGest = null;
            }
        }
    });

    localStorage.setItem('registroAnimal', JSON.stringify(dados));
}

function mudarTela(destino) {
    setTimeout(function () {
        window.location.href = destino;
    }, 500);
}
