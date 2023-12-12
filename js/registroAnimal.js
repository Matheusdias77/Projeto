let registro = document.getElementById('registroAnm');
let picture  = document.getElementById('pictureAnimal');
let textoPicture = document.getElementById('picture_text');
let pictureContainer = document.getElementById('pictureContainer');
textoPicture.innerHTML = 'Selecione a imagem';
let saude = document.getElementById('doente');
let gestante = document.getElementById('gestante');

if(saude){
    saude.addEventListener('change', function(){
        const cardDescricao = document.getElementById('descricaoDoente');
        if(saude.checked){
            const descricao = document.createElement('textarea');
            descricao.placeholder = 'Descrição da doença';
            //descricao.classList.add('estilo');

            const tratamento = document.createElement('textarea');
            tratamento.placeholder = 'Descreva o tratamento';
            //tratamento.classList.add('estilo');

            const tipoDoenca = document.createElement('input');
            tipoDoenca.type = 'text';
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
if(gestante){
    gestante.addEventListener('change', function(){
        const descricaoGest = document.getElementById('descricaoGest');
        if(gestante.checked){
            const dataDescoberta = document.createElement('input');
            dataDescoberta.id = 'dataDescoberta';
            dataDescoberta.type = 'date';
            dataDescoberta.required = true;

            //dataDescoberta.classList.add('estilo');
            descricaoGest.appendChild(dataDescoberta);

            dataGestacao = new Date(dataDescoberta.value);
        }else{
            descricaoGest.innerHTML = '';
            dataGestacao = undefined;
        }
    });
}

if (registro) {
    registro.addEventListener('submit', function(event){
        event.preventDefault();
        let idAnimal = document.getElementById('idAnimal').value;
        let raca = document.getElementById('Raca').value;
        let genero = document.getElementById('genero').value;
        let idade = document.getElementById('idade').value;
        let peso = document.getElementById('peso').value;
        let tipoSanguineo = document.getElementById('tipoSanguineo').value;
        const tempoGest = data(dataGestacao);


        if (validarAnimal(idAnimal)) {
            document.getElementById('idAnimal').value = '';
            alert('Animal já cadastrado');
            return;
        }

        alert("Animal cadastrado");

        salvarDados(idAnimal, raca, genero, idade, peso, tipoSanguineo, imagemAnimal, tempoGest);

        setTimeout(function() {
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

function salvarDados(idAnimal, raca, genero, idade, peso, tipoSanguineo, imagem, tempoGest) {
    dados = carregarDados();
    
    dados.push({
        idAnimal: idAnimal, 
        raca: raca, 
        genero: genero,
        idade: idade,
        peso: peso,
        tipoSang: tipoSanguineo,
        imagem: imagem,
        tempoGest: tempoGest    
    });

    localStorage.setItem('registroAnimal', JSON.stringify(dados));
}

function data(descobertaGestacao) {
    const milissegundos = Date.now() - descobertaGestacao.getTime();
    const diferencaSegundos = milissegundos / 1000;

    const dias = Math.floor(diferencaSegundos / (60 * 60 * 24));
    const horas = Math.floor((diferencaSegundos % (60 * 60 * 24)) / (60 * 60));
    const minutos = Math.floor((diferencaSegundos % (60 * 60)) / 60);

    const tempoGestacao = {
        dias: dias,
        horas: horas,
        minutos: minutos
    };

    return tempoGestacao;
}

function iniciarIntervalo() {
    intervaloAtualizacao = setInterval(function () {
        const tempoGest = data(dataGestacao);

        atualizarTempo(tempoGest);
    }, 60000); 
}

function atualizarTempo(tempoGest) {
    const dados = carregarDados();
    const ultimoAnimal = dados[dados.length - 1];

    ultimoAnimal.tempoGest = tempoGest;

    localStorage.setItem('registroAnimal', JSON.stringify(dados));
}

function mudarTela(destino) {
    setTimeout(function() {
        window.location.href = destino;
    }, 500);
}