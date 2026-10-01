'use strict';


/* =====================================================
   BLOQUE 1
   ACCESO, ENTORNO Y PERFIL
   ===================================================== */


/* =========================
   LEER PARÁMETROS DE LA URL
   ========================= */

// Obtenemos los parámetros que aparecen después del ?
//
// Ejemplo:
//
// index.html?usuario=Diego&rol=VIP

const parametros = new URLSearchParams(window.location.search);


// Si existe usuario lo usamos.
// Si no existe, utilizamos "Invitado".

const usuario = parametros.get('usuario') || 'Invitado';


// Si existe rol lo usamos.
// Si no existe, utilizamos "Socio".

const rol = parametros.get('rol') || 'Socio';


/* =========================
   INFORMACIÓN DEL NAVEGADOR
   ========================= */

// Idioma configurado en el navegador

const idioma = navigator.language;


// Comprobamos si tenemos conexión a Internet

const conectado = navigator.onLine;


/* =========================
   ID SEGURO DE SESIÓN
   ========================= */

let idSesion;


// Comprobamos si el navegador permite
// generar un UUID criptográficamente seguro.

if (crypto.randomUUID) {

    idSesion = crypto.randomUUID();

} else {

    // Alternativa sencilla si no existe randomUUID

    idSesion = Date.now() + '-' + Math.random();

}


/* =========================
   FECHA ACTUAL
   ========================= */

const fechaActual = new Date();


const fechaFormateada = fechaActual.toLocaleDateString(
    'es-ES',
    {
        dateStyle: 'full'
    }
);


/* =========================
   DATOS DEL SOCIO
   ========================= */

// Email de ejemplo

let emailSocio = '  DIEGO@CINEVERSE.COM  ';


// Limpiamos espacios de los extremos
// y pasamos todo a minúsculas.

emailSocio = emailSocio.trim().toLowerCase();


/* =========================
   SEPARAR EMAIL
   ========================= */

// Dividimos el email utilizando @
//
// resultado:
//
// ["diego", "cineverse.com"]

const partesEmail = emailSocio.split('@');


const nombreEmail = partesEmail[0];

const dominioEmail = partesEmail[1];


/* =========================
   CÓDIGO DE SOCIO
   ========================= */

const codigoOriginal = 25;


// Convertimos el número a texto
// y añadimos ceros hasta tener 6 posiciones.

const codigoSocio = String(codigoOriginal).padStart(6, '0');


/* =========================
   PREFERENCIAS
   ========================= */

// Apodo vacío

let apodo = '';


// Si el apodo está vacío,
// utilizamos "Espectador VIP".

const nombreMostrado = apodo || 'Espectador VIP';


// Tipo de suscripción

let tipoSuscripcion = null;


// Si es null o undefined,
// utilizamos "Básica".

const suscripcion = tipoSuscripcion ?? 'Básica';


// Saldo original

let saldoEntradas;


// Si el saldo NO está definido,
// damos 2 entradas.

// Es importante utilizar ?? para respetar
// un valor 0.

const entradasRegalo = saldoEntradas ?? 2;


/* =========================
   MOSTRAR DATOS
   ========================= */

document.getElementById('usuario').textContent = usuario;

document.getElementById('rol').textContent = rol;

document.getElementById('codigoSocio').textContent = codigoSocio;

document.getElementById('email').textContent = emailSocio;

document.getElementById('emailUsuario').textContent = nombreEmail;

document.getElementById('emailDominio').textContent = dominioEmail;

document.getElementById('suscripcion').textContent = suscripcion;

document.getElementById('entradasRegalo').textContent = entradasRegalo;

document.getElementById('idioma').textContent = idioma;

document.getElementById('conexion').textContent =
    conectado ? 'Conectado' : 'Sin conexión';

document.getElementById('idSesion').textContent = idSesion;

document.getElementById('fecha').textContent = fechaFormateada;


/* =====================================================
   BLOQUE 2
   TAQUILLA, TARIFAS Y FACTURACIÓN
   ===================================================== */


/* =========================
   PRECIOS
   ========================= */

// Los precios llegan como texto,
// tal como indica la práctica.

const precioEntradaTexto = '8.50';

const precioComboTexto = '12.00';


// Convertimos los textos a números.

const precioEntrada = Number(precioEntradaTexto);

const precioCombo = Number(precioComboTexto);


/* =========================
   CALCULAR SUBTOTAL
   ========================= */

const subtotal = precioEntrada + precioCombo;


/* =========================
   COMPROBAR SI ES VÁLIDO
   ========================= */

// Comprobamos que el resultado sea un número.

if (Number.isNaN(subtotal)) {

    console.error('El subtotal no es válido.');

}


/* =========================
   DESCUENTO
   ========================= */

// El descuento llega como texto.

const descuentoTexto = '3';


// Lo convertimos a número.

const descuento = Number(descuentoTexto);


// Restamos el descuento.

const importeConDescuento = subtotal - descuento;


/* =========================
   IVA
   ========================= */

// IVA del 21 %

const iva = importeConDescuento * 0.21;


// Calculamos el total.

const total = importeConDescuento + iva;


/* =========================
   FORMATO DE MONEDA
   ========================= */

// Creamos un formateador de moneda española.

const formatoEuro = new Intl.NumberFormat(
    'es-ES',
    {
        style: 'currency',
        currency: 'EUR'
    }
);


/* =========================
   MOSTRAR FACTURA
   ========================= */

document.getElementById('subtotal').textContent =
    formatoEuro.format(subtotal);


document.getElementById('descuento').textContent =
    formatoEuro.format(descuento);


document.getElementById('iva').textContent =
    formatoEuro.format(iva);


document.getElementById('total').textContent =
    formatoEuro.format(total);


/* =========================
   NÚMERO DE RESERVA
   ========================= */

let numeroTicket = 1000;


// Pre-incremento.
//
// Primero aumenta el valor
// y después lo utiliza.

const numeroReserva = ++numeroTicket;


document.getElementById('numeroReserva').textContent =
    numeroReserva;


/* =====================================================
   BLOQUE 3
   PROMOCIÓN "VENTA ANTICIPADA"
   ===================================================== */


/* =========================
   VARIABLES DEL TEMPORIZADOR
   ========================= */

let tiempoRestante = 20;

let temporizador = null;


/* =========================
   ELEMENTOS HTML
   ========================= */

const botonFlash =
    document.getElementById('activarFlash');


const contador =
    document.getElementById('contador');


/* =========================
   FUNCIÓN DEL DESCUENTO FLASH
   ========================= */

function activarDescuentoFlash() {

    /*
        Si ya existe un temporizador,
        no hacemos nada.

        Esto evita que el usuario pueda
        crear varios setInterval.
    */

    if (temporizador !== null) {

        return;

    }


    // Comenzamos desde 20 segundos.

    tiempoRestante = 20;

    contador.textContent =
        tiempoRestante + ' segundos';


    /*
        setInterval ejecuta el código
        una vez cada 1000 milisegundos.
    */

    temporizador = setInterval(function () {

        tiempoRestante--;


        contador.textContent =
            tiempoRestante + ' segundos';


        /*
            Cuando llega a 0,
            paramos el temporizador.
        */

        if (tiempoRestante <= 0) {

            clearInterval(temporizador);


            // Limpiamos la variable de control.

            temporizador = null;


            // Avisamos al usuario.

            alert('La promoción ha caducado.');

        }

    }, 1000);

}


/* =========================
   EVENTO DEL BOTÓN
   ========================= */

botonFlash.addEventListener(
    'click',
    activarDescuentoFlash
);


/* =====================================================
   BLOQUE 4
   RESEÑAS Y PERSISTENCIA
   ===================================================== */


/* =========================
   ARRAY DE RESEÑAS
   ========================= */

let resenas = [];


/* =========================
   RECUPERAR RESEÑAS
   ========================= */

try {

    /*
        Intentamos recuperar
        las reseñas guardadas.

        localStorage devuelve texto,
        por eso utilizamos JSON.parse().
    */

    const datosGuardados =
        localStorage.getItem('resenasCineVerse');


    // Si existen datos guardados,
    // los convertimos de JSON a array.

    if (datosGuardados) {

        resenas = JSON.parse(datosGuardados);

    }

} catch (error) {

    /*
        Si existe algún problema al recuperar
        los datos, mostramos el error
        y utilizamos un array vacío.
    */

    console.error(
        'Error al recuperar las reseñas:',
        error
    );

    resenas = [];

}


/* =========================
   ELEMENTOS HTML
   ========================= */

const opinion =
    document.getElementById('opinion');


const botonResena =
    document.getElementById('enviarResena');


const listaResenas =
    document.getElementById('listaResenas');


/* =========================
   MOSTRAR RESEÑAS
   ========================= */

function mostrarResenas() {

    /*
        Primero limpiamos el contenido
        anterior.
    */

    listaResenas.replaceChildren();


    /*
        Recorremos todas las reseñas.
    */

    resenas.forEach(function (resena) {

        // Creamos un artículo.

        const articulo =
            document.createElement('article');


        articulo.classList.add('resena');


        // Creamos el título.

        const titulo =
            document.createElement('h3');


        titulo.textContent =
            'Reseña de ' + resena.usuario;


        // Creamos el texto de la opinión.

        const texto =
            document.createElement('p');


        /*
            IMPORTANTE:

            Utilizamos textContent y NO innerHTML.

            Así, si alguien escribe:

            <script>alert('Hack')</script>

            se mostrará como texto
            y no se ejecutará.
        */

        texto.textContent =
            resena.opinion;


        // Creamos información de fecha.

        const fecha =
            document.createElement('p');


        fecha.textContent =
            'Creada: ' + resena.fecha;


        // Creamos la hora local.

        const hora =
            document.createElement('p');


        hora.textContent =
            'Hora de envío: ' + resena.hora;


        // Añadimos todos los elementos
        // al artículo.

        articulo.appendChild(titulo);

        articulo.appendChild(texto);

        articulo.appendChild(fecha);

        articulo.appendChild(hora);


        // Añadimos el artículo a la página.

        listaResenas.appendChild(articulo);

    });

}


/* =========================
   PUBLICAR RESEÑA
   ========================= */

function publicarResena() {

    /*
        trim() elimina espacios
        al principio y al final.
    */

    const textoOpinion =
        opinion.value.trim();


    // Comprobamos que no esté vacío.

    if (textoOpinion === '') {

        alert('Escribe una opinión antes de publicar.');

        return;

    }


    /* =========================
       FECHA Y HORA
       ========================= */

    const ahora = new Date();


    const fecha =
        ahora.toLocaleDateString('es-ES');


    const hora =
        ahora.toLocaleTimeString('es-ES');


    /* =========================
       CREAR OBJETO RESEÑA
       ========================= */

    const nuevaResena = {

        fecha: ahora.toISOString(),

        usuario: usuario,

        hora: hora,

        opinion: textoOpinion

    };


    /*
        Añadimos la nueva reseña
        al array.
    */

    resenas.push(nuevaResena);


    /* =========================
       GUARDAR EN LOCALSTORAGE
       ========================= */

    try {

        localStorage.setItem(
            'resenasCineVerse',
            JSON.stringify(resenas)
        );

    } catch (error) {

        console.error(
            'No se pudo guardar la reseña:',
            error
        );

    }


    /* =========================
       ACTUALIZAR PÁGINA
       ========================= */

    mostrarResenas();


    // Limpiamos el textarea.

    opinion.value = '';

}


/* =========================
   EVENTO DEL BOTÓN
   ========================= */

botonResena.addEventListener(
    'click',
    publicarResena
);


/* =========================
   MOSTRAR RESEÑAS AL CARGAR
   ========================= */

mostrarResenas();