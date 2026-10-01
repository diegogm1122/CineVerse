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
document.getElementById('idioma').textContent = navigator.language;

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
document.getElementById('fecha').textContent =
    new Date().toLocaleDateString('es-ES', {
        dateStyle: 'full'
    });

console.log('===== INFORMACIÓN DEL NAVEGADOR =====');
console.log('Idioma:', navigator.language);
console.log('Conexión:', navigator.onLine ? 'Conectado' : 'Sin conexión');
console.log('ID de sesión:', idSesion);
console.log('Fecha:', new Date().toLocaleDateString('es-ES', {
    dateStyle: 'full'
}));


/* =========================
   DATOS DEL SOCIO
   ========================= */

// Email
let email = 'DIEGO@CINEVERSE.COM';

email = email.trim().toLowerCase();

let partes = email.split('@');

document.getElementById('email').textContent = email;
document.getElementById('emailUsuario').textContent = partes[0];
document.getElementById('emailDominio').textContent = partes[1];

// Código del socio
document.getElementById('codigoSocio').textContent =
    String(25).padStart(6, '0');

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
console.log('Código de socio:', String(25).padStart(6, '0'));
console.log('Suscripción:', suscripcion ?? 'Básica');
console.log('Entradas de regalo:', entradas ?? 2);


/* =========================
   TAQUILLA
   ========================= */

document.getElementById('calcular').onclick = function () {

    // Precios
    let entrada = 8.50;
    let combo = 12.00;
    let descuento = 3;

    // Calculamos el subtotal
    let subtotal = entrada + combo;

    // Aplicamos el descuento
    let precio = subtotal - descuento;

    // Calculamos el IVA
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

    // Número de reserva
    let numero = 1000;
    numero++;

    document.getElementById('numeroReserva').textContent = numero;
};

console.log('===== TAQUILLA =====');
console.log('Entrada:', entrada, '€');
console.log('Combo:', combo, '€');
console.log('Subtotal:', subtotal, '€');
console.log('Descuento:', descuento, '€');
console.log('IVA:', iva, '€');
console.log('Total:', total, '€');
console.log('Número de reserva:', numero);


/* =========================
   NÚMERO DE RESERVA
   ========================= */

let numero = 1000;

numero++;

document.getElementById('numeroReserva').textContent = numero;


/* =========================
   DESCUENTO FLASH
   ========================= */

let tiempo = 20;
let contador = null;

document.getElementById('activarFlash').onclick = function () {

    // Evitamos iniciar varios contadores
    if (contador !== null) {
        return;
    }

    tiempo = 20;

    document.getElementById('contador').textContent =
        tiempo + ' segundos';

    contador = setInterval(function () {

        tiempo--;

        document.getElementById('contador').textContent =
            tiempo + ' segundos';

        if (tiempo === 0) {

            clearInterval(contador);

            contador = null;

            alert('La promoción ha caducado.');
        }

    }, 1000);
};

document.getElementById('activarFlash').onclick = function () {

    console.log('===== DESCUENTO FLASH =====');
    console.log('Descuento Flash activado');
};

if (tiempo === 0) {

    console.log('Descuento Flash caducado');

    clearInterval(contador);
    contador = null;

    alert('La promoción ha caducado.');
}


/* =========================
   RESEÑAS
   ========================= */

let resenas = [];

// Recuperamos las reseñas guardadas
try {

    let guardadas = localStorage.getItem('resenas');

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

    lista.innerHTML = '';

    for (let resena of resenas) {

        let div = document.createElement('div');

        div.className = 'resena';

        let titulo = document.createElement('h3');

        titulo.textContent =
            'Reseña de ' + resena.usuario;

        let texto = document.createElement('p');

        texto.textContent = resena.opinion;

        let fecha = document.createElement('p');

        fecha.textContent = resena.fecha;

        div.appendChild(titulo);
        div.appendChild(texto);
        div.appendChild(fecha);

        lista.appendChild(div);
    }
}


/* =========================
   CREAR RESEÑA
   ========================= */

document.getElementById('enviarResena').onclick = function () {

    let opinion =
        document.getElementById('opinion').value.trim();

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

    // Guardamos la reseña
    resenas.push(resena);

    localStorage.setItem(
        'resenas',
        JSON.stringify(resenas)
    );

    // La mostramos
    mostrarResenas();

    // Limpiamos el cuadro
    document.getElementById('opinion').value = '';
};


/* =========================
   CARGAR RESEÑAS
   ========================= */

mostrarResenas();

console.log('===== RESEÑA =====');
console.log('Usuario:', usuario);
console.log('Opinión:', opinion);
console.log('Fecha:', resena.fecha);

