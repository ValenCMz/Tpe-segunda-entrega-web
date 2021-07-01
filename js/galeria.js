function inicializargaleria() {
    const urlForm = 'form.html';

    let btnsIrAform = document.querySelectorAll("#irAform");
    for (let btn of btnsIrAform) {
        btn.addEventListener("click", function (f) {
            mostrarSection(section, urlForm)
        });
    }
}

inicializargaleria();