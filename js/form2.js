function iniciarPagina() {
    const url = 'https://60caa69221337e0017e42c46.mockapi.io/api/pedidos';
    let estado = {
        idUltimo: 0,
    };

    document.getElementById("valor1").innerHTML = sortearValor1();
    document.getElementById("valor2").innerHTML = sortearValor2();
    document
        .getElementById("botonEnviar")
        .addEventListener("click", function (e) {
            validarFormulario(estado)
        });
    obtenerPedidos(estado);

    let btnMultiplicar = document.querySelector("#agregarVarios");
    btnMultiplicar.addEventListener("onchange", function (e) {
        agregarVarios(this.value, estado);
    });
    let pedidosArr = [];
    async function obtenerPedidos() {
        try {
            let res = await fetch(url);
            let json = await res.json();
            pedidosArr = json;
            renderizarTabla(pedidosArr);
        } catch (error) {
            console.log(error);
        }
    }

    let inputBuscar = document.querySelector("#buscar");
    inputBuscar.addEventListener("input", function (e) {
        buscarEnLocal(pedidosArr, e.target.value);
    });

    function buscarEnLocal(arr, value) {
        let filtrado = arr.filter(pedido => {
            return pedido.cliente.includes(value);
        })
        renderizarTabla(filtrado);
    }

    function renderizarTabla(arr) {
        let tabla = document.getElementById("tabla-dinamica");
        tabla.innerHTML = "";
        for (let pedido of arr) {
            let trPedido = generarFilaPedido(pedido);
            tabla.appendChild(trPedido);
        }
    }

    function generarFilaPedido(pedido) {
        let tr = document.createElement('tr');
        let cliente = document.createElement('td');
        let articulo = document.createElement('td');
        let color = document.createElement('td');
        let talle = document.createElement('td');
        let btns = document.createElement('td');
        let btnsContainer = document.createElement('div');
        btnsContainer.classList.add("flex");
        btnsContainer.classList.add("justify-around");
        let btnEditar = document.createElement('button');
        btnEditar.classList.add("inline-block");
        let btnBorrar = document.createElement('button');
        btnBorrar.classList.add("inline-block");
        cliente.innerHTML = pedido.cliente;
        articulo.innerHTML = pedido.articulo;
        color.innerHTML = pedido.color;
        talle.innerHTML = pedido.talle;
        btnEditar.innerHTML = "✏️";
        btnBorrar.innerHTML = "✖️";
        btnEditar.addEventListener("click", function (e) {
            editarFilaPedido(tr, pedido);
        });
        btnBorrar.addEventListener("click", async function (e) {
            btnBorrar.disabled = true;
            await borrarFilaPedido(estado, pedido);
            btnBorrar.disabled = false;
        });
        tr.appendChild(cliente);
        tr.appendChild(articulo);
        tr.appendChild(color);
        tr.appendChild(talle);
        btnsContainer.appendChild(btnBorrar);
        btnsContainer.appendChild(btnEditar);
        btns.appendChild(btnsContainer);
        tr.appendChild(btns);
        return tr;
    }

    async function editarFilaPedido(tr, pedido) {
        try {
            let res = await fetch("filaEditable.html");

            if (res.ok) {
                let html = await res.text();
                tr.outerHTML = html;
                let btnConfirmar = document.querySelector("#btnConfirmar")
                btnConfirmar.addEventListener("click", function (e) {
                    confirmarEdicion(pedido)
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function confirmarEdicion(pedido) {
        let clienteEditado = document.querySelector("#clienteEditado");
        let articuloEditado = document.querySelector("#articuloEditado");
        let colorEditado = document.querySelector("#colorEditado");
        let talleEditado = document.querySelector("#talleEditado");
        let pedidoEditado = {
            cliente: clienteEditado.value,
            articulo: articuloEditado.value,
            color: colorEditado.value,
            talle: talleEditado.value
        }
        try {
            let res = await fetch(`${url}/${pedido.id}`, {
                "method": "PUT",
                "headers": {
                    "Content-type": "application/json"
                },
                "body": JSON.stringify(pedidoEditado)
            });
            if (res.ok) {
                obtenerPedidos();
            }
        } catch (error) {}
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

    function validarFormulario(estado) {
        let inputUsuario = document.getElementById("inputCaptcha");
        let valorUsuario = inputUsuario.value;
        let suma = Number(valor1.innerHTML) + Number(valor2.innerHTML);
        if (valorUsuario == suma) {
            enviarFormulario(estado);
            sortearValor1();
            sortearValor2();
        } else {
            setearMensaje("Incorrecto. Por favor, reintentar.", "error");
            sortearValor1();
            sortearValor2();
        }
    }

    function setearMensaje(texto, clase) {
        let mensaje = document.getElementById("mensaje");
        mensaje.removeAttribute("class");
        mensaje.classList.add(clase);
        mensaje.innerHTML = texto;
    }

    async function enviarFormulario(estado) {
        let cliente = document.getElementById("cliente").value;
        let articulo = document.getElementById("articulo").value;
        let talle = document.getElementById("talle").value;
        let color = document.getElementById("color").value;
        let nuevoPedido = {
            cliente: cliente,
            articulo: articulo,
            talle: "talle" + "\n" + talle,
            color: "color" + "\n" + color
        }
        try {
            let res = await fetch(url, {
                "method": "POST",
                "headers": {
                    "Content-type": "application/json"
                },
                "body": JSON.stringify(nuevoPedido)
            });
            if (res.status == 201) {
                setearMensaje("Pedido Registrado", "confirmacion");
                obtenerPedidos(estado);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function agregarVarios(multiplicador, estado) {
        try {
            for (let i = 0; i < multiplicador; i++) {
                let nuevoPedido = {
                    cliente: "susana Gimenez",
                    articulo: "articulo 2",
                    talle: "talle 2",
                    color: "color 1"
                }

                let res = await fetch(url, {
                    "method": "POST",
                    "headers": {
                        "Content-type": "application/json"
                    },
                    "body": JSON.stringify(nuevoPedido)
                });
            }
            setearMensaje("Pedido Registrado", "confirmacion");
            obtenerPedidos(estado);
        } catch (error) {
            console.log(error);
        }
    }


    async function borrarFilaPedido(estado, pedido) {
        try {
            let res = await fetch(`${url}/${pedido.id}`, {
                "method": "DELETE"
            });
            if (res.status == 200) {
                obtenerPedidos(estado);
            }
        } catch (error) {
            console.log(error);
        }
    }

}
iniciarPagina();