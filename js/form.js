document.getElementById("valor1").innerHTML = sortearValor1();
document.getElementById("valor2").innerHTML = sortearValor2();
document.getElementById("botonEnviar").addEventListener("click", validarFormulario);
let boton = document.getElementById("botonEnviar");
let warning = document.getElementById("reintentar");
let inputDeshabilitado = document.getElementById("inputCaptcha");

function sortearValor1() {
    let valor1 = (Math.random() * 10).toFixed(0);
    document.getElementById("valor1").innerHTML = valor1;
    return valor1;
}

function sortearValor2() {
    let valor2 = (Math.random() * 10).toFixed(0);
    document.getElementById("valor2").innerHTML = valor2;
    return valor2;
}

function validarFormulario() {
    let inputUsuario = document.getElementById("inputCaptcha");
    let valorUsuario = inputUsuario.value;
    let suma = Number(valor1.innerHTML) + Number(valor2.innerHTML);
    if (valorUsuario == suma) {
        warning.innerHTML = "";
        enviarFormulario();
        enviado.classList.add = ("confirmacion");
        enviado.innerHTML = "¡Gracias por su compra!";
    } else {
        warning.innerHTML = "Incorrecto. Por favor, reintentar.";
        sortearValor1();
        sortearValor2();
    }
}

function enviarFormulario() {
    boton.value = "Enviado";
    boton.disabled = true;
    inputDeshabilitado.disabled = true;
}