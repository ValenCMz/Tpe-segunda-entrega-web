//https://stackoverflow.com/questions/2592092/executing-script-elements-inserted-with-innerhtml
var setInnerHTML = function (elm, html) {
    elm.innerHTML = html;
    Array.from(elm.querySelectorAll("script")).forEach(oldScript => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes)
            .forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}

document.addEventListener("DOMContentLoaded", inicioPagina);
const urlHome = 'home.html';
const urlGaleria = 'galeria.html';

function inicioPagina() {
    //codigo para desplegar la barra de navegacion
    let btn_nav = document.querySelector("#btn");
    btn_nav.addEventListener("click", desplegarnav);

    function desplegarnav() {
        document.querySelector(".conteiner-nav").classList.toggle("show");
    }

    let section = document.querySelector("#section");
    let btnHome = document.querySelector("#home");
    btnHome.addEventListener("click", function (i) {
        mostrarSection(section, urlHome)
    });
    let btnGaleria = document.querySelector("#galeria");
    btnGaleria.addEventListener("click", function (g) {
        mostrarSection(section, urlGaleria)
    });
}

async function mostrarSection(section, pag) {
    try {
        let res = await fetch(pag);
        if (res.ok) {
            let html = await res.text();
            setInnerHTML(section, html);
        }
    } catch (error) {
        console.log(error);
    }
}