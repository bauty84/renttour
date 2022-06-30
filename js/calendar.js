// Variables iniciales y get del localstorage
let nav = 0;
let clicked = null;
const reserva = [];
let reservas = localStorage.getItem('reservas') ? JSON.parse(localStorage.getItem('reservas')) : [];
reservas.forEach(element => {
    console.log(element);
});
let resumenContainer = document.getElementById('resumen_detalle_reserva');
let resumenReservaArray = [];

// constantes de variables
const calendar = document.getElementById('calendar');
const newReservaModal = document.getElementById('newReservaModal');
const deleteReservaModal = document.getElementById('deleteReservaModal');
const backDrop = document.getElementById('modalBackDrop');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
    clicked = date;

    const eventsForDay = reservas.find(e => e.date === clicked);

    if (eventsForDay) {
        document.getElementById('reservaText').innerHTML = `
            <p> <b>Persona</b>: ${eventsForDay.persona}</p>
            <p> <b>Fecha Entrada</b>: ${eventsForDay.entrada}</p>
            <p> <b>Fecha Salida</b>: ${eventsForDay.salida}</p>
            <p> <b>Nacionalidad</b>: ${eventsForDay.nacionalidad}</p>
            <p> <b>Cantidad pasajeros</b>: ${eventsForDay.cantidad}</p>
            <p> <b>Estacionamiento</b>: ${eventsForDay.garage}</p>
            <p> <b>Tarifa</b>: ${eventsForDay.tarifa}</p>
            <p> <b>Comentario</b>: ${eventsForDay.comentario}</p>`;
        deleteReservaModal.style.display = 'block';
    } else {
        newReservaModal.style.display = 'inline-block';
    }

    backDrop.style.display = 'block';
}

function cargarCalendario() {
    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('mes').innerText =
        `${dt.toLocaleDateString('es-ar', { month: 'long' }).toLocaleUpperCase()} ${year}`;

    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('section');
        daySquare.classList.add('day');

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            const eventsForDay = reservas.find(e => e.date === dayString);

            if (i - paddingDays === day && nav === 0) {
                daySquare.id = 'currentDay';
            }

            if (eventsForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventsForDay.persona;
                daySquare.appendChild(eventDiv);
            }

            daySquare.addEventListener('click', () => openModal(dayString));
        } else {
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare);
    }
}

function closeModal() {
    newReservaModal.style.display = 'none';
    deleteReservaModal.style.display = 'none';
    backDrop.style.display = 'none';
    clicked = null;
    cargarCalendario();
}

function getDatesInRange(dateIn, dateOut) {
    const date = new Date(dateIn.getTime());
    date.setDate(date.getDate() + 1);
    const dates = [];

    while (date <= dateOut) {
        dates.push(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`);
        date.setDate(date.getDate() + 1);
    }

    return dates;
}


function addReserva() {
    // Form para datos de reserva
    const persona = document.getElementById('persona').value;
    const entrada = document.getElementById('entrada').value;
    const salida = document.getElementById('salida').value;
    const nacionalidad = document.getElementById('nacionalidad');
    const cantidad = document.getElementById('cantidad');
    const garage = document.getElementById('garage');
    const tarifa = document.getElementById('tarifa');
    const comentario = document.getElementById('comentario').value;
    const resumenReserva = new formReserva('', persona, entrada, salida, nacionalidad, cantidad, garage, tarifa, comentario);

    const dateIn = new Date(entrada);
    const dateOut = new Date(salida);
    const dateRanges = getDatesInRange(dateIn, dateOut);

    dateRanges.forEach(item => {
        const reservaObj = new formReserva(item, persona, entrada, salida, nacionalidad, cantidad, garage, tarifa, comentario);
        reserva.push(reservaObj.addReserva());
    });

    // Visualizacion de resumen de la reserva
    let contenedor = document.createElement('table');
    contenedor.className = 'table table-striped text-center';

    resumenReservaArray = resumenReserva.addReserva();
    let [idDay, personName, checkIn, checkOut, country, amount, parking, price, comments, total] = resumenReservaArray;

    contenedor.innerHTML = `
            <tr>
                <th>Persona</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Pais</th>
                <th>Cant.</th>
                <th>Garage</th>
                <th>Tarifa</th>
                <th>Precio</th>
            </tr>
            <tr>
                <td>${personName}</td>
                <td>${checkIn}</td>
                <td>${checkOut}</td>
                <td>${country}</td>
                <td>${amount}</td>
                <td>${parking}</td>
                <td>${price == 0 ? "Normal":"Promocion"}</td>
                <td>ARS ${total}</td>
            </tr>`;

    resumenContainer.appendChild(contenedor);
    document.querySelector('.resumen_reserva').style.display = "flex";

}

function saveReserva() {

    for (let i = 0; i < reserva.length; i++) {
        reservas.push({
            date: reserva[i][0],
            persona: reserva[i][1],
            entrada: reserva[i][2],
            salida: reserva[i][3],
            nacionalidad: reserva[i][4],
            cantidad: reserva[i][5],
            garage: reserva[i][6],
            tarifa: reserva[i][7],
            comentario: reserva[i][8],
        });
    }

    localStorage.setItem('reservas', JSON.stringify(reservas));
    document.querySelector("form").reset();
    document.getElementById("resumen_detalle_reserva").innerHTML = '';
    document.querySelector('.resumen_reserva').style.display = "none";
    closeModal();

}

function deleteReserva() {
    reservas = reservas.filter(e => e.date !== clicked);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    closeModal();
}

function iniciarBtns() {
    document.getElementById('nextBtn').addEventListener('click', () => {
        nav++;
        cargarCalendario();
    });

    document.getElementById('backBtn').addEventListener('click', () => {
        nav--;
        cargarCalendario();
    });

    document.getElementById('agregar').addEventListener('click', addReserva);
    document.getElementById('saveBtn').addEventListener('click', saveReserva);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    document.getElementById('delBtn').addEventListener('click', deleteReserva);
    document.getElementById('closeBtn').addEventListener('click', closeModal);
}

iniciarBtns();
cargarCalendario();