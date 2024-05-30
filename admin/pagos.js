import { readItems, updateItem } from "../lib/firebaseConfig.js";

let user = []
let tiket = []

let tablaPagos = document.getElementById("tablaPagos")

function fecha() {
    let fechaActual = new Date();
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth() + 1;
    let ano = fechaActual.getFullYear().toString().slice(-2);

    return `${dia}-${mes}-${ano}`
}

fecha()

let fechaOjo = document.getElementById("fechaOjo")
fechaOjo.textContent = fecha()

async function arrStart() {
    user = await readItems()
    console.log(user)
}

async function fnUpd() {
    await arrStart()

    tablaPagos.textContent = ""

    for (let [index, i] of Object.entries(user)) {
        tablaPagos.innerHTML += `
                <tr class="table-content">
                    <td class="table-item">${i.data.nombre}🔥</td>
                    <td class="table-item">${i.data.monto}</td>
                    <td class="table-item">${i.data.total - (i.data.cPago * i.data.monto)}</td>
                    <td class="table-item">${i.data.cPago}</td>
                    <td>
                        <button class="btn btn-success fnPagar">Pagar</button>
                    </td>    
                </tr>`
    }

    const arrPagar = document.querySelectorAll('.fnPagar');
    arrPagar.forEach((item, index) => {
        item.addEventListener("click", async () => {
            console.log('index del boton', index)

            let clave = parseInt(prompt("Clave Para Pagos"))

            if (clave == 352) {

                user[index].data.cPago++

                if (user[index].data.metodo == 'mensual') {

                    user[index].data.cPago = 0
                    user[index].data.total = user[index].data.total - 1100
                    user[index].data.monto = user[index].data.monto - 100
                    user[index].data.uPago = fecha()

                    if (user[index].data.metodo == 'mensual' && user[index].data.monto == 1000) {
                        user[index].data.monto = 0
                    }
                }

                console.log(user[index].id, user[index].data)
                updateItem(user[index].id, user[index].data)

                fntiket(index)
                fnUpd()

                alert('ha pagado' + ' *** ' + user[index].data.nombre + ' *** ')
            } else {
                alert('clave incorrecta')
            }

            clave = 999 + 'error'
        })
    });

}

fnUpd()

function fntiket(num) {

    if (localStorage.getItem('tiket') == null) {
        localStorage.setItem('tiket', JSON.stringify(tiket)) // convierte a texto plano
    }

    tiket = JSON.parse(localStorage.getItem('tiket')) // convierte a valores del array

    tiket.unshift({
        nombre: user[num].data.nombre,
        metodo: user[num].data.metodo,
        monto: user[num].data.monto,
        cantidad: user[num].data.cantidad,
        cPago: user[num].data.cPago,
        uPago: fecha()
    })

    if (tiket.length > 50) {
        tiket.pop()
    }

    tiket = localStorage.setItem('tiket', JSON.stringify(tiket)) // convierte a texto plano
}