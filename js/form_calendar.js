const agregar = document.getElementById('agregar');
const confirmar = document.getElementById('confirmar');

// Get current Date to use later to compare in and out dates.
const getDate = () => {
    const fecha = []

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    fecha.push(year);
    fecha.push(month);
    fecha.push(day);

    return fecha;
}

let evento = [];
let confirmacion = false;

// Calcula precio final de los dias reservados
function calcularPrecioTotal(days, tarifa, garage) {
    const listaTarifas = [12000, 10000];

    if (garage == 'Si') {
        switch (tarifa) {
            case 0:
                return (days * listaTarifas[0]) + 1000;
                break;
            case 1:
                return (days * listaTarifas[1]) + 1000;
                break;
    
            default:
                console.log('No se encuentra valor valido para calcular precio.');
                break;
        };
    } else {
        switch (tarifa) {
            case 0:
                return days * listaTarifas[0];
                break;
            case 1:
                return days * listaTarifas[1];
                break;
    
            default:
                console.log('No se encuentra valor valido para calcular precio.');
                break;
        };
    };
};

agregar.onclick = () => {
    const persona = document.getElementById('persona').value;
    const entrada = document.getElementById('entrada').value;
    const salida = document.getElementById('salida').value;
    const nacionalidad = document.getElementById('nacionalidad');
    const cantidad = document.getElementById('cantidad');
    const garage = document.getElementById('garage');
    const tarifa = document.getElementById('tarifa');
    const comentario = document.getElementById('comentario').value;

    let resumenContainer = document.getElementById('resumen_detalle_reserva');

    if (persona == '' || entrada == '' || salida == '' || nacionalidad == '' || cantidad == '' || garage == '' || tarifa == '' || comentario == '') {
        alert("Por favor complete todos lo campos.");
    } else {
        let date = getDate();
        let entradaArrayInt = [];
        let salidaArrayInt = [];
        let entradaArray = entrada.split('-');
        let salidaArray = salida.split('-');

        // Parse string values to int in start date
        for (let i = 0; i < entradaArray.length; i++) {
            entradaArrayInt.push(parseInt(entradaArray[i]));
        };
        // Parse string values to int in end date
        for (let i = 0; i < salidaArray.length; i++) {
            salidaArrayInt.push(parseInt(salidaArray[i]));
        };

        evento.push(persona);

        // Verifica si la fecha de entrada es mayor a la fecha actual
        if (entradaArrayInt[0] < date[0]) {
            alert("El año y/o mes es menor al actual.");
        } else if (entradaArrayInt[0] === date[0] && entradaArrayInt[1] < date[1]) {
            alert("El mes es anterior al mes actual.");
        } else if (entradaArrayInt[0] >= date[0] && entradaArrayInt[1] == date[1] && entradaArrayInt[2] < date[2]) {
            alert("El dia es menor al dia actual.");
        } else {
            evento.push(entrada);
        };

        // Verifica si la fecha de salida es mayor a la fecha de entrada
        if (salidaArrayInt[0] < entradaArrayInt[0]) {
            alert("El año y/o mes es menor al ingresado en fecha de entrada.");
        } else if (salidaArrayInt[0] === entradaArrayInt[0] && salidaArrayInt[1] < entradaArrayInt[1]) {
            alert("El mes es anterior al mes en la fecha de entrada.");
        } else if (salidaArrayInt[0] >= entradaArrayInt[0] && salidaArrayInt[1] == entradaArrayInt[1] && salidaArrayInt[2] < entradaArrayInt[2]) {
            alert("El dia es menor al dia en la fecha de entrada.");
        } else {
            evento.push(salida);
        };

        // Get numbers of days
        let days = 0;
        for (let j = entradaArrayInt[2]; j <= salidaArrayInt[2]; j++) {
            days += 1;
        };

        selectNacionalidad = nacionalidad.options[nacionalidad.selectedIndex].value;
        selectCantidad = cantidad.options[cantidad.selectedIndex].value;
        selectgarage = garage.options[garage.selectedIndex].value;
        selectTarifa = tarifa.options[tarifa.selectedIndex].value;

        evento.push(selectNacionalidad);
        evento.push(selectCantidad);
        evento.push(selectgarage);
        evento.push(selectTarifa);
        evento.push(comentario);
        evento.push(calcularPrecioTotal(days, parseInt(selectTarifa), selectgarage));

        let contenedor = document.createElement('table');
        contenedor.className = 'table table-striped';

        contenedor.innerHTML = `
        <tr>
            <th>Persona</th>
            <th>Fecha Entrada</th>
            <th>Fecha Salida</th>
            <th>Nacionalidad</th>
            <th>Cantidad</th>
            <th>Garage</th>
            <th>Tarifa</th>
            <th>Precio Final</th>
        </tr>
        <tr>
            <td>${evento[0]}</td>
            <td>${evento[1]}</td>
            <td>${evento[2]}</td>
            <td>${evento[3]}</td>
            <td>${evento[4]}</td>
            <td>${evento[5]}</td>
            <td>${evento[6] == 0 ? "Normal":"Promocion"}</td>
            <td>ARS ${evento[8]}</td>
        </tr>`;

        resumenContainer.appendChild(contenedor);
        document.querySelector('.resumen_reserva').style.display = "flex";
        confirmacion = true;
    };
};

confirmar.onclick = () => {
    if (confirmacion == true) {
        alert("Reserva cargada con exito.");
        window.location.reload();
    } else {
        alert("Error al completa la reserva.");
    }
};