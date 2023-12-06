var input = document.getElementById("imageInput");
var preview = document.getElementById("previewImage");
var deleteButton = document.getElementById("deleteButton");

input.addEventListener("change", function () {
    var file = input.files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            deleteButton.style.display = "inline"; // Exibir o botão de exclusão
        };

        reader.readAsDataURL(file);
    } else {
        // Limpar a visualização se nenhum arquivo for selecionado
        preview.src = "";
        deleteButton.style.display = "none"; // Ocultar o botão de exclusão
    }
});

deleteButton.addEventListener("click", function () {
    preview.src = "";
    input.value = ""; // Limpar o valor da entrada de arquivo
    deleteButton.style.display = "none"; // Ocultar o botão de exclusão
});
