let registro = document.getElementById('registroAnm');
let picture  = document.getElementById('pictureAnimal');
let textoPicture = document.getElementById('picture_text');
let pictureContainer = document.getElementById('pictureContainer');
textoPicture.innerHTML = 'Selecione a imagem';
let saude = document.getElementById('doente');
let gestante = document.getElementById('gestante');
let idAnimal, raca, genero, idade, peso, tipoSanguineo;

if(saude){
    saude.addEventListener('change', function(){
        const cardDescricao = document.getElementById('descricaoDoente');
        if(saude.checked){
            const descricao = document.createElement('textarea');
            descricao.id = 'descricao' 
            descricao.placeholder = 'Descrição da doença';
            //descricao.classList.add('estilo');

            const tratamento = document.createElement('textarea');
            tratamento.id = 'tratamento';
            tratamento.placeholder = 'Descreva o tratamento';
            //tratamento.classList.add('estilo');

            const tipoDoenca = document.createElement('input');
            tipoDoenca.type = 'text';
            tipoDoenca.id = 'tipoDoenca';
            tipoDoenca.placeholder = 'Informe a doença';
            //tipoDoenca.classList.add('estilo');

            cardDescricao.appendChild(tipoDoenca);
            cardDescricao.appendChild(descricao);
            cardDescricao.appendChild(tratamento);
        }else{
            cardDescricao.innerHTML = '';
        }
    });
}

let dataGestacao;
let intervaloContagem;
let gestacaoSalva = false; 

if (gestante) {
    gestante.addEventListener('change', function () {
        const descricaoGest = document.getElementById('descricaoGest');
        if (gestante.checked) {
            const dataDescoberta = document.createElement('input');
            dataDescoberta.id = 'dataDescoberta';
            dataDescoberta.type = 'date';
            dataDescoberta.required = true;

            dataDescoberta.addEventListener('change', function () {
                dataGestacao = new Date(dataDescoberta.value);
            });

            descricaoGest.appendChild(dataDescoberta);
        } else {
            descricaoGest.innerHTML = '';
            dataGestacao = null;
            clearInterval(intervaloContagem);
        }
    });
}

if (registro) {
    registro.addEventListener('submit', function (event) {
        event.preventDefault();
        idAnimal = document.getElementById('idAnimal').value;
        raca = document.getElementById('Raca').value;
        genero = document.getElementById('genero').value;
        idade = document.getElementById('idade').value;
        peso = document.getElementById('peso').value;
        tipoSanguineo = document.getElementById('tipoSanguineo').value;

        if (validarAnimal(idAnimal)) {
            document.getElementById('idAnimal').value = '';
            alert('Animal já cadastrado');
            return;
        }

        let tempoGest = null;

        if (gestante.checked) {
            tempoGest = calcularDiferenca(dataGestacao, new Date());
        }

        salvarDados(idAnimal, raca, genero, idade, peso, tipoSanguineo, imagemAnimal, tempoGest, null, dataGestacao);

        alert("Animal cadastrado");

        setTimeout(function () {
            document.getElementById('idAnimal').value = '';
            document.getElementById('Raca').value = '';
            document.getElementById('genero').value = '';
            document.getElementById('idade').value = '';
            document.getElementById('peso').value = '';
            document.getElementById('tipoSanguineo').value = '';
            saude.checked = false;
            gestante.checked = false;
            textoPicture.innerHTML = '';
        }, 1000);
    });
}

if (picture) {
    picture.addEventListener('change', function(event){
        const pictureAux = event.target;
        const arquivo = pictureAux.files[0];

        if (arquivo) {
            const leitor = new FileReader();

            leitor.addEventListener('load', function(e){
                const leitorAux = e.target;
                const imagem = document.createElement('img');
                imagem.src = leitorAux.result;
                imagem.classList.add('picture_img');

                imagemAnimal = leitorAux.result;

                textoPicture.innerHTML = '';
                textoPicture.appendChild(imagem);
            });

            leitor.readAsDataURL(arquivo);
        } else {
            textoPicture.innerHTML = 'Selecione a imagem';
        }
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

function validarAnimal(idAnimal) {
    dados = carregarDados(); 

    return dados.some(dado => dado.idAnimal === idAnimal);
}

function salvarDados(idAnimal, raca, genero, idade, peso, tipoSanguineo, imagem, tempoGest, dadosDoenca, dataGestacao) {
    dados = carregarDados();
    
    dados.push({
        idAnimal: idAnimal, 
        raca: raca, 
        genero: genero,
        idade: idade,
        peso: peso,
        tipoSang: tipoSanguineo,
        imagem: imagem,
        tempoGest: tempoGest,
        dataGestacao: dataGestacao,
        ...dadosDoenca   
    });

    localStorage.setItem('registroAnimal', JSON.stringify(dados));
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