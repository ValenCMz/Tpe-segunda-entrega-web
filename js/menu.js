//codigo para desplegar la barra de navegacion
let btn_nav = document.querySelector("#btn");
btn_nav.addEventListener("click", desplegarnav);

function desplegarnav() {
    document.querySelector(".conteiner-nav").classList.toggle("show");
}