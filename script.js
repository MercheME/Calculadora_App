

const pantalla = document.querySelector('.screen');
const botones = document.querySelectorAll('.btn');

botones.forEach(boton => {
    boton.addEventListener('click', () => {

        let btnElegido = boton.value || boton.textContent;

        if (btnElegido === 'x') btnElegido = '*';
        if (btnElegido === 'AC') {
            pantalla.textContent = '0';
            return;
        }

        if (btnElegido === '=') {
            try {
                let expresion = pantalla.textContent.replace(/x/g, '*').replace(/√/, 'Math.sqrt');
                
                let resultado = eval(expresion);

                if (resultado === Infinity || resultado === -Infinity || isNaN(resultado)) {
                    throw new Error('Resultado inválido');
                }

                pantalla.textContent = resultado;
            } catch (error) {
                pantalla.textContent = 'Error!';
                alert(error.message);
            }
            return;
        }

        if (btnElegido === '%') {
            let currentValue = parseFloat(pantalla.textContent);
            if (!isNaN(currentValue)) {
                pantalla.textContent = (currentValue / 100).toString();
            } else {
                pantalla.textContent = 'Error!';
            }
            return;
        }

        if (pantalla.textContent === '0' || pantalla.textContent === 'Error!') {
            pantalla.textContent = btnElegido;
        } else {
            pantalla.textContent += btnElegido;
        }
    });
});
