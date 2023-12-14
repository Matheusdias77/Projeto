import { mudarTela, carregarDados } from "./registroAnimal.js";
let urlAtual = window.location.href;
const urlP = new URLSearchParams(window.location.search);
let idAnimalAux = urlP.get('id');
console.log(urlAtual)

if(urlAtual.includes(`editar.html?id=${idAnimalAux}`)){
    let dados = carregarDados(); 
    dados.forEach(dado => {
        if (dado.idAnimal === idAnimalAux) {
            document.getElementById('idAnimal').value = dado.idAnimal;
            document.getElementById('Raca').value = dado.raca;
            document.getElementById('genero').value = dado.genero;
            document.getElementById('idade').value = dado.idade;
            document.getElementById('peso').value = dado.peso;
            document.getElementById('tipoSanguineo').value = dado.tipoSang;
            const imagemElement = document.createElement('img');
            imagemElement.src = dado.imagem;
            imagemElement.alt = `Imagem do Animal ${dado.idAnimal}`;

            const pictureText = document.getElementById('picture_text');
            pictureText.innerHTML = '';
            pictureText.appendChild(imagemElement);
        }
    });
}


if(document.getElementById('tituloBemCaprino')){
    document.getElementById('tituloBemCaprino').addEventListener('click', function() {
        mudarTela('dashboard.html');
    });
}

export {idAnimalAux};