# CineVerse

Proyecto web de reserva de entradas de cine realizado con HTML, CSS y JavaScript.

El proyecto simula un pequeño portal de cine donde un usuario puede consultar sus datos de socio, calcular una reserva, activar un descuento Flash y publicar reseñas de películas.


## Descripción del proyecto

CineVerse es una aplicación web desarrollada como práctica de JavaScript.

El proyecto utiliza JavaScript para trabajar con:

Parámetros de la URL.
Información del navegador.
Cadenas de texto.
Operaciones matemáticas.
Formato de moneda.
Temporizadores.
Manipulación del DOM.
localStorage.
JSON.
Gestión de errores.
Renderizado seguro de contenido.

## Funcionalidades

## Perfil del espectador

La aplicación muestra información del usuario obtenida desde la URL:

Usuario.
Rol.
Apodo.
Código de socio.
Email.
Usuario del email.
Dominio del email.
Tipo de suscripción.
Entradas de regalo.

Si algunos datos no están disponibles, se utilizan valores por defecto.

## Información del entorno

También se muestra información del navegador:

Idioma del navegador.
Estado de la conexión.
ID de sesión.
Fecha actual.

## Taquilla

La sección de taquilla permite calcular una reserva.

Se utilizan:

Precio de una entrada.
Precio de un combo.
Descuento promocional.
Subtotal.
IVA del 21%.
Total final.
Número de reserva.

Los precios se convierten a números y el resultado se muestra utilizando formato de moneda en euros.

## Descuento Flash

La aplicación incluye una promoción con una cuenta atrás de 20 segundos.

El temporizador:

Se inicia mediante un botón.
Se actualiza cada segundo.
Evita crear varios temporizadores al mismo tiempo.
Se detiene cuando llega a cero.
Muestra un aviso cuando la promoción termina.

## Reseñas

Los usuarios pueden escribir y publicar una reseña sobre una película.

Cada reseña guarda:

Usuario.
Opinión.
Fecha y hora.

Las reseñas se guardan en localStorage, por lo que permanecen después de recargar la página.

Además, las opiniones se muestran utilizando textContent para evitar que el contenido introducido por el usuario se interprete como HTML o JavaScript.

## Tecnologías utilizadas

HTML5 → estructura de la página.
CSS3 → diseño y estilos.
JavaScript → funcionamiento e interacción.
LocalStorage → almacenamiento de reseñas.
JSON → conversión y almacenamiento de datos.
Git / GitHub → control de versiones y almacenamiento del proyecto.

## Estructura del proyecto
CineVerse/
│
├── index.html
├── style.css
├── script.js
└── README.md