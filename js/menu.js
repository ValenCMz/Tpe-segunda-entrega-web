//codigo para desplegar la barra de navegacion
let botonnavegador = document.querySelector("#btn");
botonnavegador.addEventListener("click", desplegarnav);

function desplegarnav(){
    document.querySelector(".conteiner-nav").classList.toggle("show");
}