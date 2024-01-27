var num1, num2, respuesta;
txt_suma = document.getElementById("suma");
op1 = document.getElementById("op1");
op2 = document.getElementById("op2");
op3 = document.getElementById("op3");
txt_msj = document.getElementById("msj");
txt_resultado = document.getElementById("resultado");
txt_puntos = document.getElementById("puntos"); // Nuevo
botonJugarDeNuevo = document.getElementById("jugarDeNuevo");

var puntos = 0;
var txt_puntos = document.getElementById("puntos");
var intentosRestantes = 3;
var txt_intentos = document.getElementById("intentos");

function comenzar() {
    txt_resultado.innerHTML = "?";
    txt_msj.innerHTML = "";
    txt_puntos.innerHTML = "Puntos: " + puntos + " 🌟"; // Añadido el icono al texto
    txt_intentos.innerHTML = "Intentos restantes: " + intentosRestantes + " 🚀"; // Añadido el icono al texto

    //genera la suma - Numeros aleatorios entre 0 1 9
    num1 = Math.round(Math.random() * 9);
    num2 = Math.round(Math.random() * 9);
    respuesta = num1 + num2;
    //asignamos lo números para que se muestren
    suma.innerHTML = num1 + " + " + num2 + " = ";

    //genero un número entre 0 y 2 para colocar la opcion correcta
    indiceOpCorrecta = Math.round(Math.random() * 2);
    console.log(indiceOpCorrecta);

    //si indiceCorrrecta es igual 0
    if (indiceOpCorrecta == 0) {
        op1.innerHTML = respuesta;
        op2.innerHTML = respuesta + 1;
        op3.innerHTML = respuesta - 1
    }
    if (indiceOpCorrecta == 1) {
        op1.innerHTML = respuesta - 1;
        op2.innerHTML = respuesta;
        op3.innerHTML = respuesta - 2;
    }
    if (indiceOpCorrecta == 2) {
        op1.innerHTML = respuesta + 2;
        op2.innerHTML = respuesta + 3;
        op3.innerHTML = respuesta;
    }
}

function controlarRespuesta(opcionElegida) {
    txt_resultado.innerHTML = opcionElegida.innerHTML;
    if (respuesta == opcionElegida.innerHTML) {
        puntos += 1;
        txt_puntos.innerHTML = "Puntos: " + puntos + " 🌟";
        txt_msj.innerHTML = "EXCELENTE!!";
        txt_msj.style.color = "green";
        setTimeout(comenzar, 2000);
    } else {
        if (intentosRestantes > 0) {
            intentosRestantes -= 1;
        }
        txt_intentos.innerHTML = "Intentos restantes: " + intentosRestantes + " 🚀";
        txt_msj.innerHTML = "INTENTA DE NUEVO!!";
        txt_msj.style.color = "red";

        if (intentosRestantes === 0) {
            // Game Over
            txt_msj.innerHTML = "GAME OVER";
            txt_msj.style.color = "red";
            setTimeout(resetJuego, 2000);
        } else {
            setTimeout(limpiar, 2000);
        }
    }
}
function resetJuego() {
    // Oculta los botones de respuesta al reiniciar el juego
    op1.style.display = 'none';
    op2.style.display = 'none';
    op3.style.display = 'none';

    if (intentosRestantes === 0) {
        intentosRestantes = 3;
        txt_intentos.innerHTML = "Intentos restantes: " + intentosRestantes + " 🚀";
        puntos = 0;
        txt_puntos.innerHTML = "Puntos: " + puntos + " 🌟";
        mostrarGameOver();
    } else {
        comenzar();
    }
}

function mostrarGameOver() {

    // Muestra el mensaje de GAME OVER
    txt_msj.innerHTML = "GAME OVER";
    txt_msj.style.color = "red";

    // Muestra la puntuación y el botón para jugar de nuevo
    txt_puntos.innerHTML = "Puntuación final: " + puntos + " 🌟";

    botonJugarDeNuevo.addEventListener("click", function () {
        // Reinicia el juego al hacer clic en el botón
        txt_msj.innerHTML = "";
        botonJugarDeNuevo.style.display = 'none';

        txt_puntos.innerHTML = "Puntos: " + puntos + " 🌟";
        intentosRestantes = 3;
        txt_intentos.innerHTML = "Intentos restantes: " + intentosRestantes + " 🚀";
        puntos = 0;
        comenzar();

        op1.style.display = 'inline-flex'; // o 'block' según el estilo que necesites
        op2.style.display = 'inline-flex';
        op3.style.display = 'inline-flex';
    });

    window.livewire.emit('envioPuntuacion', puntos);
    console.log('Evento envioPuntuacion emitido con valor:', puntos);

    // Agrega el botón al contenedor
    botonJugarDeNuevo.style.display = 'inline-flex';
}

// Resto del código


function limpiar() {
    txt_resultado.innerHTML = "?";
    txt_msj.innerHTML = "";
    botonJugarDeNuevo.style.display = 'none';
}

comenzar();
