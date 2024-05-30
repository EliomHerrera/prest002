import { readItems, createItem, updateItem, deleteItem } from "./lib/firebaseConfig.js";

readItems()

let user = []

async function arrStart() {
    user = await readItems()
}

arrStart()

let userId = 0
let newCantidad = 0

let nombre = document.getElementById("nombre")
let cantidad = document.getElementById("cantidad")
let metodo = document.getElementById("metodo")

let tablaDeudor = document.getElementById("tablaDeudor")

function fecha() {
    let fechaActual = new Date();
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1;
    let ano = fechaActual.getFullYear().toString().slice(-2);

    let horas = fechaActual.getHours();
    let minutos = fechaActual.getMinutes();
    let segundos = fechaActual.getSeconds();

    userId = `${dia}/${mes} ${horas}:${minutos}:${segundos}`

    return `${dia}-${mes}-${ano}`
}

async function fnUpd() {
    fecha()

    user = await readItems()

    tablaDeudor.innerHTML = ""

    for (let [index, i] of Object.entries(user)) {
        tablaDeudor.innerHTML += `
        <tr class="table-content">
            <td class="table-item">${i.data.nombre} <p>${i.data.id}</p></td>
            <td class="table-item">${i.data.cantidad}</td>
            <td class="table-item">${i.data.metodo}</td>

            <td class="table-item">
                <div class="d-flex">
                <button class="btn btn-warning me-2 fnReset">R</button>
                <button class="btn btn-danger fnDel">X</button>
                </div>
            </td>    
        </tr>
        `
    }

    const arrDel = document.querySelectorAll('.fnDel');
    arrDel.forEach((item, index) => {
        item.addEventListener('click', async () => {
            let clave = parseInt(prompt("Clave Para Borrar Cliente"))

            if (clave == 350) {
                await deleteItem(user[index].id)
                fnUpd()
            } else {
                alert('clave incorrecta')
            }

            clave = 999 + 'error'
            fnUpd()
        });
    });
    const arrReset = document.querySelectorAll('.fnReset');
    arrReset.forEach((item, index) => {
        item.addEventListener('click', async () => {
            let clave = parseInt(prompt(`Clave Para Resetear Cliente *** ${user[index].data.nombre} *** `))
            if (clave == 3501) {

                newCantidad = parseInt(prompt("ingrese la cantidad del re-enganche"))

                if (user[index].data.metodo == 'mensual') {
                    user[index].data.monto = ((parseInt(newCantidad) * 0.10) + 1000)
                    user[index].data.total = (parseInt(newCantidad) * 0.10) + parseInt(newCantidad)
                }

                if (user[index].data.metodo == "diario 24") {
                    user[index].data.monto = ((parseInt(newCantidad) * 0.20) + parseInt(newCantidad)) / 24
                    user[index].data.total = ((parseInt(newCantidad) * 0.20) + parseInt(newCantidad))
                }

                if (user[index].data.metodo == "diario 30") {
                    user[index].data.monto = ((parseInt(newCantidad) * 0.20) + parseInt(newCantidad)) / 30
                    user[index].data.total = ((parseInt(newCantidad) * 0.20) + parseInt(newCantidad))
                }

                if (user[index].data.metodo == "semanal") {
                    user[index].data.monto = ((parseInt(newCantidad) * 0.30) + parseInt(newCantidad)) / 13
                    user[index].data.total = ((parseInt(newCantidad) * 0.30) + parseInt(newCantidad))
                }

                user[index].data.id = userId
                user[index].data.cPago = 0
                user[index].data.cantidad = newCantidad

                alert(`*** ${user[index].data.nombre} *** ha sido re-enganchado`)
                fnUpd()
            } else {
                alert('Clave Incorrecta')
            }

            updateItem(user[index].id, user[index].data)

            clave = 999 + 'error'
        });
    });
}

fnUpd()

let fnSend = document.getElementById("fnSend");
fnSend.addEventListener("click", () => {

    let clave = parseInt(prompt("Clave para crear cliente"))

    if (clave == 351) {
        let monto = 0
        let total = 0

        if (nombre.value == "") {
            alert("Nombre esta vacio")
            return
        }

        if (cantidad.value == "") {
            alert("Cantidad esta vacio")
            return
        }

        if (metodo.value == "Seleccionar") {
            alert("Seleccionar Diario o Semanal")
            return
        }

        if (metodo.value == "diario 24") {
            monto = ((parseInt(cantidad.value) * 0.20) + parseInt(cantidad.value)) / 24
            total = ((parseInt(cantidad.value) * 0.20) + parseInt(cantidad.value))
        }

        if (metodo.value == "diario 30") {
            monto = ((parseInt(cantidad.value) * 0.20) + parseInt(cantidad.value)) / 30
            total = ((parseInt(cantidad.value) * 0.20) + parseInt(cantidad.value))
        }

        if (metodo.value == "semanal") {
            monto = ((parseInt(cantidad.value) * 0.30) + parseInt(cantidad.value)) / 13
            total = ((parseInt(cantidad.value) * 0.30) + parseInt(cantidad.value))
        }

        if (metodo.value == "mensual") {
            monto = ((parseInt(cantidad.value) * 0.10) + 1000)
            total = ((parseInt(cantidad.value) * 0.10) + parseInt(cantidad.value))
        }

        createItem({
            id: userId,
            nombre: nombre.value,
            cantidad: cantidad.value,
            metodo: metodo.value,
            monto: monto,
            uPago: '',
            cPago: 0,
            total: total
        })

        nombre.value = ""
        cantidad.value = ""
        metodo.value = "Seleccionar"

        fnUpd()
    } else {
        alert('clave incorrecta')
    }
})
