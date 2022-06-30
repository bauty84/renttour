class formReserva {
    constructor(idDay, persona, entrada, salida, nacionalidad, cantidad, garage, tarifa, comentario) {
        this.idDay = idDay;
        this.persona = persona;
        this.entrada = entrada;
        this.salida = salida;
        this.nacionalidad = nacionalidad;
        this.cantidad = cantidad;
        this.garage = garage;
        this.tarifa = tarifa;
        this.comentario = comentario;
    };

    calcularPrecioTotal(days, tarifa, garage) {
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

    addReserva() {  
        let evento = [];
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

        let resumenContainer = document.getElementById('resumen_detalle_reserva');

        if (this.persona == '' || this.entrada == '' || this.salida == '' || this.nacionalidad == '' || 
            this.cantidad == '' || this.garage == '' || this.tarifa == '' || this.comentario == '') {
            alert("Por favor complete todos lo campos.");
        } else {
            let date = getDate();
            let entradaArrayInt = [];
            let salidaArrayInt = [];
            let entradaArray = this.entrada.split('-');
            let salidaArray = this.salida.split('-');

            // Parse string values to int in start date
            for (let i = 0; i < entradaArray.length; i++) {
                entradaArrayInt.push(parseInt(entradaArray[i]));
            };
            // Parse string values to int in end date
            for (let i = 0; i < salidaArray.length; i++) {
                salidaArrayInt.push(parseInt(salidaArray[i]));
            };
            evento.push(this.idDay);
            evento.push(this.persona);

            // Verifica si la fecha de entrada es mayor a la fecha actual
            if (entradaArrayInt[0] < date[0]) {
                alert("El año y/o mes es menor al actual.");
            } else if (entradaArrayInt[0] === date[0] && entradaArrayInt[1] < date[1]) {
                alert("El mes es anterior al mes actual.");
            } else if (entradaArrayInt[0] >= date[0] && entradaArrayInt[1] == date[1] && entradaArrayInt[2] < date[2]) {
                alert("El dia es menor al dia actual.");
            } else {
                evento.push(this.entrada);
            };

            // Verifica si la fecha de salida es mayor a la fecha de entrada
            if (salidaArrayInt[0] < entradaArrayInt[0]) {
                alert("El año y/o mes es menor al ingresado en fecha de entrada.");
            } else if (salidaArrayInt[0] === entradaArrayInt[0] && salidaArrayInt[1] < entradaArrayInt[1]) {
                alert("El mes es anterior al mes en la fecha de entrada.");
            } else if (salidaArrayInt[0] >= entradaArrayInt[0] && salidaArrayInt[1] == entradaArrayInt[1] && salidaArrayInt[2] < entradaArrayInt[2]) {
                alert("El dia es menor al dia en la fecha de entrada.");
            } else {
                evento.push(this.salida);
            };

            // Get numbers of days
            let days = 0;
            for (let j = entradaArrayInt[2]; j <= salidaArrayInt[2]; j++) {
                days += 1;
            };

            let selectNacionalidad = this.nacionalidad.options[nacionalidad.selectedIndex].value;
            let selectCantidad = this.cantidad.options[cantidad.selectedIndex].value;
            let selectgarage = this.garage.options[garage.selectedIndex].value;
            let selectTarifa = this.tarifa.options[tarifa.selectedIndex].value;

            evento.push(selectNacionalidad);
            evento.push(selectCantidad);
            evento.push(selectgarage);
            evento.push(selectTarifa);
            evento.push(this.comentario);
            evento.push(this.calcularPrecioTotal(days, parseInt(selectTarifa), selectgarage));

            
            return evento;
        };
    };
};