let registro = []

registro = JSON.parse(localStorage.getItem('tiket')) // convierte a valores del array

let tiket = document.getElementById("tiket")

function fnTiket() {
    tiket.innerHTML = ""

    registro.forEach((e, i) => {
        tiket.innerHTML += `
    
        <tr class="table-content">
            <td class="table-item">${e.nombre}🔥</td>
            <td class="table-item">${e.monto}</td>
            <td class="table-item">${e.cPago}</td>
            <td class="table-item">${e.uPago}</td>

            <td>
                <div class="container text-center">
                    <button onclick="fnCrearTiket(${i})" type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Tiket
                    </button>
            
                    <div class="modal modal-xl fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Datos</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div id="factura" class="modal-body">
                
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>  
        </tr>
        `
    })

}

fnTiket()

function fnCrearTiket(index) {

    let factura = []

    if (localStorage.getItem('factura') == null) {
        // colocar en cada funcion que modifique el array
        localStorage.setItem('factura', JSON.stringify(factura))
    }

    factura = JSON.parse(localStorage.getItem('factura'))
    factura = []
    factura.push(registro[index])
    localStorage.setItem('factura', JSON.stringify(factura))

    let divFactura = document.getElementById("factura")

    divFactura.innerHTML = `
    <div class="card text-center bg-dark w-100" >
        

        <div>
            <h1 class="text-dark card mx-5 my-3"> ${factura[0].nombre}</h1>
            <div>
            <h4 class="text-light">Monto: ${factura[0].monto}</h4>
        </div>
        </div class="d-flex justify-content-center">

        <img class="rounded mx-5" src="./persona.jfif" >

        <div class="bg-success m-3 mx-5 p-2">
            <h2 class="text-light" >Pago: <span class="text-dark badge bg-light ">#${factura[0].cPago}</span></h2>
        </div>
        
        <div class=" text-light mx-5">
            <h3 class="badge badge-danger"> ${factura[0].uPago}</h3>
            <h1>Pagado</h1>
        </div>
    </div>
`
}
