function mudarTela(destino) {
    setTimeout(function() {
        window.location.href = destino;
    }, 500);
}

function quantidadeAnimal() {
    const dados = carregarDados();
    const totalAnimais = dados.length;

    const totalAnimaisElement = document.getElementById("totalAnimais");
    if (totalAnimaisElement) {
        totalAnimaisElement.textContent = `Total de Animais Cadastrados: ${totalAnimais}`;
    }
}