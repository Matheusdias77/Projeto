let registro = document.getElementById('registroAnm');
let picture  = document.getElementById('pictureAnimal');
let textoPicture = document.getElementById('picture_text');
let pictureContainer = document.getElementById('pictureContainer');
textoPicture.innerHTML = 'Selecione a imagem';

if (registro) {
    registro.addEventListener('submit', function(event){
        event.preventDefault();
        let idAnimal = document.getElementById('idAnimal').value;
        let raca = document.getElementById('Raca').value;
        let genero = document.getElementById('genero').value;
        let idade = document.getElementById('idade').value;
        let peso = document.getElementById('peso').value;
        let tipoSanguineo = document.getElementById('tipoSanguineo').value;
        let saude = document.getElementsByName('saude').value;
        let gestante = document.getElementsByName('gestante').value;


        if (validarAnimal(idAnimal)) {
            document.getElementById('idAnimal').value = '';
            alert('Animal já cadastrado');
            return;
        }

        // Onde tem esse alert coloque algo bonito para dizer que foi cadastrado
        alert("Animal cadastrado");

        salvarDados(idAnimal, raca, genero, idade, peso, tipoSanguineo, imagemAnimal);

        setTimeout(function() {
            document.getElementById('idAnimal').value = '';
            document.getElementById('Raca').value = '';
            document.getElementById('genero').value = '';
            document.getElementById('idade').value = '';
            document.getElementById('peso').value = '';
            document.getElementById('tipoSanguineo').value = '';
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

function salvarDados(idAnimal, raca, genero, idade, peso, tipoSanguineo, imagem) {
    dados = carregarDados();
    
    dados.push({
        idAnimal: idAnimal, 
        raca: raca, 
        genero: genero,
        idade: idade,
        peso: peso,
        tipoSang: tipoSanguineo,
        imagem: imagem    
    });

    localStorage.setItem('registroAnimal', JSON.stringify(dados));
}

function mudarTela(destino) {
    setTimeout(function() {
        window.location.href = destino;
    }, 500);
}