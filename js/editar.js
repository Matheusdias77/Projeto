document.addEventListener('DOMContentLoaded', function(){
    const urlP = new URLSearchParams(window.location.search);
    const idAnimal = urlP.get('id');

});


function mudarTela(destino) {
    setTimeout(function() {
        window.location.href = destino;
    }, 500);
}
