"use strict"

document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() {
    document.getElementById("valor1").innerHTML = sortearValor1();
    document.getElementById("valor2").innerHTML = sortearValor2();
    let boton = document.getElementById("botonEnviar");
    let warning = document.getElementById("reintentar");
    let pedidos = [{
        "cliente": "Pablo Lamponne",
        "articulo": "Geek",
        "talle": "M",
        "color": "Blanco"
    }, {
        "cliente": "Juan Carlos Batman",
        "articulo": "Urbana",
        "talle": "M",
        "color": "Negro"
    }, {
        "cliente": "María Laura Santillán",
        "articulo": "Crossfit",
        "talle": "S",
        "color": "Gris"
    }];

    document.getElementById("botonEnviar").addEventListener("click", function (e) {
        validarFormulario(warning, boton, pedidos)
    });
    insertarPrecargada(pedidos);

    let btnMultiplicar = document.querySelector("#agregarVarios");
    btnMultiplicar.addEventListener("change", function (e) {
        agregarVarios(pedidos, this.value);
    });

    let btnBorrarPedidos = document.getElementById("borrar");
    btnBorrarPedidos.addEventListener("click", function (e) {
        borrarPedidos(pedidos);
    });
}

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

function validarFormulario(warning, boton, pedidos) {
    let inputUsuario = document.getElementById("inputCaptcha");
    let valorUsuario = inputUsuario.value;
    let suma = Number(valor1.innerHTML) + Number(valor2.innerHTML);
    if (valorUsuario == suma) {
        warning.innerHTML = "";
        enviarFormulario(boton);
        enviado.classList.add = ("confirmacion");
        enviado.innerHTML = "Pedido Registrado";
        agregarPedido(pedidos);
    } else {
        warning.innerHTML = "Incorrecto. Por favor, reintentar.";
        sortearValor1();
        sortearValor2();
    }
}

function enviarFormulario(boton) {
    boton.value = "Enviado";
}

function insertarPrecargada(pedidos) {
    let tabla = document.getElementById("tabla-dinamica");
    tabla.innerHTML = "";
    for (let elem of pedidos) {
        let pedido = document.createElement('tr');
        let cliente = document.createElement('td');
        let articulo = document.createElement('td');
        let talle = document.createElement('td');
        let color = document.createElement('td');
        cliente.innerHTML = elem.cliente;
        articulo.innerHTML = elem.articulo;
        talle.innerHTML = elem.talle;
        color.innerHTML = elem.color;
        pedido.appendChild(cliente);
        pedido.appendChild(articulo);
        pedido.appendChild(talle);
        pedido.appendChild(color);
        tabla.appendChild(pedido);
    }
}

function agregarPedido(pedidos) {
    let cliente = document.getElementById("cliente").value;
    let articulo = document.getElementById("articulo").value;
    let talle = document.getElementById("talle").value;
    let color = document.getElementById("color").value;
    let nuevoPedido = {
        cliente: cliente,
        articulo: articulo,
        talle: talle,
        color: color
    }
    pedidos.push(nuevoPedido);
    insertarPrecargada(pedidos);
}

function agregarVarios(pedidos, multiplicador) {
    console.log(multiplicador);
    let ultimoPedido = pedidos[pedidos.length - 1];
    for (let i = 0; i < Number(multiplicador); i++) {
        pedidos.push(ultimoPedido);
    }
    insertarPrecargada(pedidos);
}

function borrarPedidos(pedidos) {
    pedidos.splice(0, pedidos.length)
    insertarPrecargada(pedidos);
}