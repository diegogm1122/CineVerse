'use strict';

/* =========================
   USUARIO
   ========================= */

// Cogemos los datos de la URL
let datos = new URLSearchParams(window.location.search);

let usuario = datos.get('usuario') || 'Invitado';
let rol = datos.get('rol') || 'Socio';

// Mostramos los datos
document.getElementById('usuario').textContent = usuario;
document.getElementById('rol').textContent = rol;

console.log('===== USUARIO =====');
console.log('Usuario:', usuario);
console.log('Rol:', rol);


/* =========================
   INFORMACIÓN DEL NAVEGADOR
   ========================= */

// Idioma
document.getElementById('idioma').textContent =
    navigator.language;

// Conexión
document.getElementById('conexion').textContent =
    navigator.onLine ? 'Conectado' : 'Sin conexión';

// ID de sesión
let idSesion;

if (crypto.randomUUID) {
    idSesion = crypto.randomUUID();
} else {
    idSesion = Math.random().toString(36).substring(2);
}

document.getElementById('idSesion').textContent = idSesion;

// Fecha
let fecha = new Date().toLocaleDateString('es-ES', {
    dateStyle: 'full'
});

document.getElementById('fecha').textContent = fecha;

console.log('===== INFORMACIÓN DEL NAVEGADOR =====');
console.log('Idioma:', navigator.language);
console.log('Conexión:', navigator.onLine ? 'Conectado' : 'Sin conexión');
console.log('ID de sesión:', idSesion);
console.log('Fecha:', fecha);


/* =========================
   DATOS DEL SOCIO
   ========================= */

// Email
let email = 'DIEGO@CINEVERSE.COM';

// Limpiamos el email
email = email.trim().toLowerCase();

// Separamos usuario y dominio
let partes = email.split('@');

document.getElementById('email').textContent = email;
document.getElementById('emailUsuario').textContent = partes[0];
document.getElementById('emailDominio').textContent = partes[1];


// Código del socio
let codigoSocio = String(25).padStart(6, '0');

document.getElementById('codigoSocio').textContent =
    codigoSocio;


// Apodo
let apodo = '';

let nombreMostrado = apodo || 'Espectador VIP';

// Si tienes un elemento con id="apodo", lo mostramos
let elementoApodo = document.getElementById('apodo');

if (elementoApodo) {
    elementoApodo.textContent = nombreMostrado;
}


// Suscripción
let suscripcion = null;

document.getElementById('suscripcion').textContent =
    suscripcion ?? 'Básica';


// Entradas de regalo
let entradas;

document.getElementById('entradasRegalo').textContent =
    entradas ?? 2;


console.log('===== DATOS DEL SOCIO =====');
console.log('Email:', email);
console.log('Usuario del email:', partes[0]);
console.log('Dominio:', partes[1]);
console.log('Código de socio:', codigoSocio);
console.log('Apodo:', nombreMostrado);
console.log('Suscripción:', suscripcion ?? 'Básica');
console.log('Entradas de regalo:', entradas ?? 2);


/* =========================
   TAQUILLA
   ========================= */

// Botón para calcular la compra
document.getElementById('calcular').onclick = function () {

    // Precios recibidos como texto
    let entrada = Number('8.50');
    let combo = Number('12.00');
    let descuento = Number('3');


    // Calculamos el subtotal
    let subtotal = entrada + combo;


    // Comprobamos que sea un número válido
    if (Number.isNaN(subtotal)) {

        console.log('Error: el subtotal no es válido');

        return;
    }


    // Aplicamos el descuento
    let precio = subtotal - descuento;


    // Calculamos el IVA del 21%
    let iva = precio * 0.21;


    // Calculamos el total
    let total = precio + iva;


    // Formato de euros
    let euros = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'EUR'
    });


    // Mostramos los resultados
    document.getElementById('subtotal').textContent =
        euros.format(subtotal);

    document.getElementById('descuento').textContent =
        euros.format(descuento);

    document.getElementById('iva').textContent =
        euros.format(iva);

    document.getElementById('total').textContent =
        euros.format(total);


    /* =========================
       NÚMERO DE RESERVA
       ========================= */

    let numero = 1000;

    // Pre-incremento
    let reserva = ++numero;

    document.getElementById('numeroReserva').textContent =
        reserva;


    // Mostramos información en consola
    console.log('===== TAQUILLA =====');
    console.log('Entrada:', entrada, '€');
    console.log('Combo:', combo, '€');
    console.log('Subtotal:', subtotal, '€');
    console.log('Descuento:', descuento, '€');
    console.log('IVA:', iva, '€');
    console.log('Total:', total, '€');
    console.log('Número de reserva:', reserva);
};


/* =========================
   DESCUENTO FLASH
   ========================= */

let tiempo = 20;
let contador = null;


// Botón de descuento Flash
document.getElementById('activarFlash').onclick = function () {

    console.log('===== DESCUENTO FLASH =====');


    // Evitamos iniciar varios contadores
    if (contador !== null) {

        return;
    }


    console.log('Descuento Flash activado');


    // Reiniciamos el tiempo
    tiempo = 20;

    document.getElementById('contador').textContent =
        tiempo + ' segundos';


    // Ejecutamos cada segundo
    contador = setInterval(function () {

        tiempo--;


        // Actualizamos el contador
        document.getElementById('contador').textContent =
            tiempo + ' segundos';


        // Cuando llega a cero
        if (tiempo === 0) {

            clearInterval(contador);

            contador = null;

            console.log('Descuento Flash caducado');

            alert('La promoción ha caducado.');
        }

    }, 1000);
};


/* =========================
   RESEÑAS
   ========================= */

// Array de reseñas
let resenas = [];


/* =========================
   RECUPERAR RESEÑAS
   ========================= */

try {

    // Recuperamos las reseñas guardadas
    let guardadas = localStorage.getItem('resenas');


    // Si existen reseñas guardadas
    if (guardadas) {

        resenas = JSON.parse(guardadas);
    }

} catch (error) {

    console.log('No se pudieron cargar las reseñas');
}


/* =========================
   MOSTRAR RESEÑAS
   ========================= */

function mostrarResenas() {

    let lista = document.getElementById('listaResenas');


    // Limpiamos la lista
    lista.innerHTML = '';


    // Recorremos las reseñas
    for (let resena of resenas) {

        // Creamos el contenedor
        let div = document.createElement('div');

        div.className = 'resena';


        // Creamos el título
        let titulo = document.createElement('h3');

        titulo.textContent =
            'Reseña de ' + resena.usuario;


        // Creamos el texto
        let texto = document.createElement('p');


        /*
        textContent hace que la opinión
        se muestre como texto y no como HTML.
        */
        texto.textContent = resena.opinion;


        // Creamos la fecha
        let fechaResena = document.createElement('p');

        fechaResena.textContent =
            resena.fecha;


        // Añadimos los elementos
        div.appendChild(titulo);
        div.appendChild(texto);
        div.appendChild(fechaResena);

        lista.appendChild(div);
    }
}


/* =========================
   CREAR RESEÑA
   ========================= */

document.getElementById('enviarResena').onclick = function () {

    // Cogemos el texto escrito
    let opinion =
        document.getElementById('opinion').value.trim();


    // Comprobamos que no esté vacío
    if (opinion === '') {

        alert('Escribe una opinión.');

        return;
    }


    // Creamos la reseña
    let resena = {

        usuario: usuario,

        opinion: opinion,

        fecha: new Date().toLocaleString('es-ES')
    };


    // Añadimos la reseña al array
    resenas.push(resena);


    // Guardamos las reseñas
    try {

        localStorage.setItem(
            'resenas',
            JSON.stringify(resenas)
        );

    } catch (error) {

        console.log('No se pudo guardar la reseña');
    }


    // Mostramos las reseñas
    mostrarResenas();


    // Limpiamos el cuadro de texto
    document.getElementById('opinion').value = '';


    // Información en consola
    console.log('===== RESEÑA =====');
    console.log('Usuario:', usuario);
    console.log('Opinión:', opinion);
    console.log('Fecha:', resena.fecha);
};


/* =========================
   CARGAR RESEÑAS AL INICIAR
   ========================= */

// Mostramos las reseñas guardadas
mostrarResenas();
