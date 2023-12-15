// Función que genera números aleatorios únicos
function generarNumerosUnicos(cantidad) {
    let numeros = new Set();
    while (numeros.size < cantidad) {
        let numeroAleatorio = Math.floor(Math.random() * 100);
        numeros.add(numeroAleatorio);
    }
    return Array.from(numeros);
}

// Función para asignar números aleatorios a los cartones
function asignarNumerosAleatorios(contenedorId, cantidad) {
    const contenedor = document.getElementById(contenedorId);
    const numeros = generarNumerosUnicos(cantidad);
    
    for (let numero of numeros) {
        const divNumero = document.createElement('div');
        divNumero.classList.add('number');
        divNumero.textContent = numero;
        contenedor.appendChild(divNumero);
    }
}

// Función para obtener los números de un cartón
function obtenerNumeros(contenedorId) {
    const numeros = [];
    const contenedor = document.getElementById(contenedorId);
    if (contenedor) {
        const numerosDiv = contenedor.querySelectorAll('.row .number');
        numerosDiv.forEach(div => {
            numeros.push(parseInt(div.textContent));
        });
    } else {
        console.error(`El contenedor con ID ${contenedorId} no se encontró.`);
    }
    return numeros;
}

// Contadores para los números tachados del jugador y la CPU
let contadorJugador = 0;
let contadorCpu = 0;

// Función para comparar números y tacharlos en los cartones
function compararNumeros(numero) {
    document.querySelectorAll('.row').forEach(contenedor => {
        contenedor.querySelectorAll('.number').forEach(div => {
            const numeroEnDiv = parseInt(div.textContent);
            if (numeroEnDiv === numero && div.style.textDecoration !== 'line-through') {
                div.style.backgroundColor = 'rgb(170, 53, 53)';
                div.style.textDecoration = 'line-through';

                // Incrementa el contador correspondiente y verifica si se completaron los 15 números
                if (contenedor.id.startsWith('jugador')) {
                    contadorJugador++;
                    console.log(`Número coincidente: ${numero}, elementos tachados del jugador: ${contadorJugador}`);
                    if (contadorJugador === 15) {
                        alert('¡Bingo! Ha ganado el JUGADOR');
                        activarConfeti(); // Llama a la función para activar la animación de confeti
                    }
                } else if (contenedor.id.startsWith('cpu')) {
                    contadorCpu++;
                    console.log(`Número coincidente: ${numero}, elementos tachados de la CPU: ${contadorCpu}`);
                    if (contadorCpu === 15) {
                        alert('¡Bingo! Ha ganado la CPU');
                        activarConfeti(); // Llama a la función para activar la animación de confeti
                    }
                }
                // Detiene el temporizador si uno de los jugadores completa el cartón
                if (contadorJugador === 15 || contadorCpu === 15) {
                    clearInterval(timerId);
                }
            }
        });
    });
}

// Función para activar la animación de confeti
function activarConfeti() {
    // Utiliza la librería confetti-js para activar la animación
    confetti({
        particleCount: 150, // Número de partículas de confeti
        spread: 90, // Área de dispersión
        origin: { y: 0.6 } // Origen de la animación (en este caso, parte superior)
        // Puedes ajustar otros parámetros según tus preferencias
    });
}

// Set para almacenar números generados
const numerosGenerados = new Set();

// Función que cambia los números del Bingo
function cambiarNumeroBingo() {
    if (numerosGenerados.size >= 100) {
        clearInterval(timerId);
        return;
    }

    let numero = Math.floor(Math.random() * 100);
    while (numerosGenerados.has(numero)) {
        numero = Math.floor(Math.random() * 100);
    }

    numerosGenerados.add(numero);

    const numBingo = document.querySelector('.circulo-gris .numBingo p');
    numBingo.textContent = numero;

    const rectangulo = document.querySelector('.allNumeros .rectangulo');
    const nuevoNumero = document.createElement('div');
    nuevoNumero.classList.add('number');
    nuevoNumero.textContent = numero;
    rectangulo.appendChild(nuevoNumero);

    compararNumeros(numero);
}

// Timer para el temporizador
let timerId = null;

// Función para iniciar el temporizador al hacer clic en Jugar
function iniciarTemporizador() {
    timerId = setInterval(cambiarNumeroBingo, 1500); // Cambia cada 1500 milisegundos
}

// Función principal para comenzar el juego
function jugar() {
    // Asigna números aleatorios al jugador
    asignarNumerosAleatorios('jugadorF1', 5); 
    asignarNumerosAleatorios('jugadorF2', 5); 
    asignarNumerosAleatorios('jugadorF3', 5); 

    // Asigna números aleatorios a la CPU
    asignarNumerosAleatorios('cpuF1', 5); 
    asignarNumerosAleatorios('cpuF2', 5); 
    asignarNumerosAleatorios('cpuF3', 5); 

    // Inicia el temporizador al hacer clic en el botón de Jugar
    iniciarTemporizador();
}
