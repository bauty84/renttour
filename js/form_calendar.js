const agregar = document.getElementById('agregar');
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

agregar.addEventListener("click", function () {
    const titulo = document.getElementById('titulo').value;
    const entrada = document.getElementById('entrada').value;
    const salida = document.getElementById('salida').value;
    const nacionalidad = document.getElementById('nacionalidad');
    const cantidad = document.getElementById('cantidad');
    const bebe = document.getElementById('bebe');
    const comentario = document.getElementById('comentario').value;

    if (titulo == '' || entrada == '' || salida == '' || nacionalidad == '' || cantidad == '' || bebe == '' || comentario == '') {
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

        evento.push(titulo);

        // Verifica si la fecha de entrada es mayor a la fecha actual
        if (entradaArrayInt[0] < date[0]) {
            alert("El año y/o mes es menor al actual.");
        } else if (entradaArrayInt[0] === date[0] && entradaArrayInt[1] < date[1]) {
            alert("El mes es anterior al mes actual.");
        } else if (entradaArrayInt[0] >= date[0] && entradaArrayInt[1] == date[1] && entradaArrayInt[2] < date[2]) {
            alert("El dia es menor al dia actual.");
        } else {
            evento.push(entrada);
        }

        // Verifica si la fecha de salida es mayor a la fecha de entrada
        if (salidaArrayInt[0] < entradaArrayInt[0]) {
            alert("El año y/o mes es menor al ingresado en fecha de entrada.");
        } else if (salidaArrayInt[0] === entradaArrayInt[0] && salidaArrayInt[1] < entradaArrayInt[1]) {
            alert("El mes es anterior al mes en la fecha de entrada.");
        } else if (salidaArrayInt[0] >= entradaArrayInt[0] && salidaArrayInt[1] == entradaArrayInt[1] && salidaArrayInt[2] < entradaArrayInt[2]) {
            alert("El dia es menor al dia en la fecha de entrada.");
        } else {
            evento.push(salida);
        }

        selectNacionalidad = nacionalidad.options[nacionalidad.selectedIndex].value;
        selectCantidad = cantidad.options[cantidad.selectedIndex].value;
        selectBebe = bebe.options[bebe.selectedIndex].value;

        evento.push(selectNacionalidad);
        evento.push(selectCantidad);
        evento.push(selectBebe);
        evento.push(comentario);

        console.log(evento);
        alert(confirm("Datos Ingresado: " + evento))
    };

});