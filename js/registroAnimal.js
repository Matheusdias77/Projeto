let imagemAnimal;
let registro = document.getElementById('registroAnm');
let picture  = document.getElementById('pictureAnimal');
let textoPicture = document.getElementById('picture_text');
textoPicture.innerHTML = 'Selecione a imagem';
let saude = document.getElementById('doente');
let gestante = document.getElementById('gestante');
let erro = document.getElementById('erro');
let idAnimal, raca, genero, idade, peso, tipoSanguineo;

import { idAnimalAux, dadosDoencaAux, dataGestacaoAux, caminhoAux } from "./editar.js";

let descricao;
if(saude){
    saude.addEventListener('change', function(){
        const cardDescricao = document.getElementById('descricaoDoente');
        if(saude.checked){

            descricao = document.createElement('textarea');
            descricao.id = 'descricao' 
            descricao.placeholder = 'Descrição da Doença';
            descricao.classList.add('estilo');

            const tratamento = document.createElement('textarea');
            tratamento.id = 'tratamento';
            tratamento.placeholder = 'Descreva o Tratamento';
            tratamento.classList.add('estilo');

            cardDescricao.appendChild(descricao);
            cardDescricao.appendChild(tratamento);
        }else{
            cardDescricao.innerHTML = '';
        }
    });
}

let dataGestacao;
let intervaloContagem;
if (gestante) {
    gestante.addEventListener('change', function () {
        const descricaoGest = document.getElementById('descricaoGest');
        if (gestante.checked) {
            const dataDescoberta = document.createElement('input');
            dataDescoberta.id = 'dataDescoberta';
            dataDescoberta.type = 'date';
            dataDescoberta.required = true;
            dataDescoberta.classList.add('dataDescoberta');

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

        if(genero === 'masculino' && gestante.checked){
            erro.textContent = 'Animal Precisa Ser Fêmea.';
            erro.style.display = 'block';
            setTimeout(function () {
                erro.style.display = 'none';
            }, 2000);
            gestante.checked = false;
            document.getElementById('descricaoGest').textContent = '';
            return;
        }

        if (validarAnimal(idAnimal)) {
            document.getElementById('idAnimal').value = '';
            erro.textContent = 'ID de animal existente.';
            erro.style.display = 'block';
            setTimeout(function () {
                erro.style.display = 'none';
            }, 2000);
            return;
        }

        let tempoGest = null;
        let dadosDoenca = null;

        if(window.location.pathname.includes("editar.html")){
            imagemAnimal = caminhoAux;
        }
        if (gestante.checked && dataGestacao !== undefined) {
            tempoGest = calcularDiferenca(dataGestacao, new Date());
        }else{
            dataGestacao = dataGestacaoAux;
            tempoGest = calcularDiferenca(dataGestacao, new Date());
        }
        if(saude.checked && descricao !== undefined){
            dadosDoenca = {
                descricao: descricao.value,
                tratamento: tratamento.value
            }
        }else{
            dadosDoenca = {
                descricao: dadosDoencaAux.descricao,
                tratamento: dadosDoencaAux.tratamento
            }
        }


        salvarDados(idAnimal, raca, genero, idade, peso, tipoSanguineo, imagemAnimal, tempoGest, dadosDoenca, dataGestacao);

        setTimeout(function () {
            document.getElementById('idAnimal').value = '';
            document.getElementById('Raca').value = '';
            document.getElementById('genero').value = '';
            document.getElementById('idade').value = '';
            document.getElementById('peso').value = '';
            document.getElementById('tipoSanguineo').value = '';
            document.getElementById('descricaoDoente').textContent = '';
            document.getElementById('descricaoGest').textContent = '';
            saude.checked = false;
            gestante.checked = false;
            textoPicture.innerHTML = 'Selecione a imagem';
            mudarTela('animaisTotal.html');
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
    let dados = carregarDados(); 

    if(window.location.pathname.includes("editar.html")){
        return dados.some(dado => dado.idAnimal === idAnimal && dado.idAnimal !== idAnimalAux);
    }else{
        return dados.some(dado => dado.idAnimal === idAnimal);
    }
}

function salvarDados(idAnimal, raca, genero, idade, peso, tipoSanguineo, imagem, tempoGest, dadosDoenca, dataGestacao) {
    let dados = carregarDados();

    let indiceAnimal = validarAnimal(idAnimal);
    if(window.location.pathname.includes("editar.html")){
        if (!indiceAnimal) {
            const indice = dados.findIndex(animal => animal.idAnimal === idAnimal);
            dados[indice] = {
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
            };
        } else {
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
        }
    }else {
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
    }

    localStorage.setItem('registroAnimal', JSON.stringify(dados));
}


function calcularDiferenca(dataInicio, dataAtual) {
    const diferencaEmMilissegundos = dataAtual - dataInicio;
    const diferencaEmMinutos = Math.floor(diferencaEmMilissegundos / 60000);
    const dias = Math.floor(diferencaEmMinutos / (24 * 60));
    const horas = Math.floor((diferencaEmMinutos % (24 * 60)) / 60);
    const minutos = diferencaEmMinutos % 60;

    return { dias, horas, minutos };
}

function mudarTela(destino) {
    setTimeout(function() {
        window.location.href = destino;
    }, 500);
}

export {mudarTela, carregarDados, saude, gestante};