const pantalla = document.querySelector('.screen');
let numeroActual = ''; 
let numeroAnterior = ''; 
let operacion = null;

// Función para añadir números a la pantalla
function appendNumber(num) {
    // Evitar ceros a la izquierda excepto después de un punto decimal 
    if (numeroActual === '0' && num !== '.') {
        numeroActual = num; 
    } else { 
        // Evitar múltiples puntos decimales 
        if (num === '.' && numeroActual.includes('.'))
            return; 
        numeroActual += num; 
    } 
    actualizarPantalla();
}

// Función para establecer la operación matemática seleccionada
function setOperation(op) {
    if (numeroActual === '') return; // No hacer nada si no hay un número actual

    if (numeroAnterior !== '') {
        calculate();
    }
    operacion = op;
    numeroAnterior = numeroActual; // Mueve el número actual a la variable anterior
    numeroActual = '';
}

function calculate() { 
    let result; 
    const anterior = parseFloat(numeroAnterior); 
    const actual = parseFloat(numeroActual); 

    if (isNaN(anterior) || isNaN(actual)) return; 

    switch (operacion) { 
        case 'sumar': 
            result = anterior + actual; 
            break; 
        case 'restar': 
            result = anterior - actual; 
            break; 
        case 'multiplicar': 
            result = multiplicarSinOperador(anterior, actual); 
            break; 
        case 'dividir': 
            if (actual === 0) { 
                pantalla.textContent = 'Error!'; 
                return; 
            } 
            result = anterior / actual;
            break; 
        case 'resto': 
            if (actual === 0) { 
                pantalla.textContent = 'Error!'; 
                return; 
            } 
            result = anterior % actual; 
            break; 

        default: 
            return; 
    } 

    numeroActual = result; 
    operacion = null; 
    numeroAnterior = ''; 
    actualizarPantalla(); 
} 

function limpiarPantalla() { 
    numeroActual = ''; 
    numeroAnterior = ''; 
    operacion = null; 
    actualizarPantalla(); 
} 

function actualizarPantalla() { 
    pantalla.textContent = numeroActual || '0'; 
} 

function multiplicarSinOperador(a, b) { 
    let result = 0; 
    const esNegativo = (a < 0 && b > 0) || (a > 0 && b < 0); 
    const absA = Math.abs(a); 
    const absB = Math.abs(b); 
    for (let i = 0; i < absB; i++) { 
        result += absA; 
    } return esNegativo ? -result : result;
} 

function dividirSinOperador(a, b) { 
    let result = 0; 
    const absA = Math.abs(a); 
    const absB = Math.abs(b); 
    while (absA - (result * absB) >= absB) { 
        result++; 
    } return (a < 0 && b > 0) || (a > 0 && b < 0) ? -result : result;
}

function restoSinOperador(dividendo, divisor) {
    const cociente = dividirSinOperador(dividendo, divisor); // Calcula el cociente de 'dividendo' dividido por 'divisor' sin usar el operador de división
    return dividendo - (cociente * divisor); // Retorna el resto de la división de 'dividendo' entre 'divisor'
}