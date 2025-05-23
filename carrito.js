// =====================
// 1. Precios y datos
// =====================
const precios = {
    // Precios de las películas
    pelicula: {
        "Maléfica": 15,
        "Red One": 12,
        "Lilo y Stitch": 10,
        "Ponte en mi lugar de nuevo": 14,
        "Otro pequeño favor": 13
    },
    // Precios de las series
    serie: {
        "Stranger Things": 20,
        "The Mandalorian": 18,
        "You": 16,
        "El descubrimiento de las brujas": 19,
        "Las escalofriantes aventuras de Sabrina": 17
    },
    // Precios de los libros
    libro: {
        "Dune": 25,
        "Harry Potter": 22,
        "Alas de sangre": 20,
        "Amanecer en la cosecha": 23,
        "El ladrón del rayo": 21
    }
};

// Datos para generar las opciones de los select
const datos = {
    pelicula: Object.keys(precios.pelicula), // Obtiene las claves de las películas
    serie: Object.keys(precios.serie),       // Obtiene las claves de las series
    libro: Object.keys(precios.libro)        // Obtiene las claves de los libros
};

// =====================
// 2. DOM Elements
// =====================
// Referencias a los elementos del DOM
const categoriaSelect = document.getElementById('categoria');
const itemSelect = document.getElementById('item');
const form = document.getElementById('form-carrito');
const carritoInfo = document.getElementById('carrito-info');
const resumenCompra = document.getElementById('resumen-compra');
const listaArticulos = document.getElementById('lista-articulos');
const totalPagarSpan = document.getElementById('total-pagar');
const btnPagar = document.getElementById('btn-pagar');
const modalPago = document.getElementById('modal-pago');
const formPago = document.getElementById('form-pago');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const edadInput = document.getElementById('edad');

// =====================
// 3. Estado del carrito
// =====================
// Objeto que almacena el estado del carrito de compras
let carrito = {
    totalItems: 0,
    totalPrecio: 0,
    items: []
};

// =====================
// 4. Funciones auxiliares
// =====================
// Función para generar una contraseña aleatoria
function generarContrasena(longitud = 10) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < longitud; i++) {
        const index = Math.floor(Math.random() * caracteres.length);
        password += caracteres[index];
    }
    return password;
}

// Función para cambiar el fondo de la página aleatoriamente
function cambiarFondo() {
    const colores = ['#FFB6C1', '#ADD8E6', '#90EE90', '#FFD700', '#FFA07A'];
    const color = colores[Math.floor(Math.random() * colores.length)];
    document.body.style.backgroundColor = color;
}

// =====================
// 5. Trivia después del carrito
// =====================
// Botón para jugar trivia
const btnJugar = document.getElementById('btn-jugar');
const resultadoJuego = document.getElementById('resultado-juego');

btnJugar.addEventListener('click', () => {
    let puntos = 0;
    let ronda = 0;
    let sigueJugando = true;

    while (sigueJugando && ronda < 3) {
        ronda++; // Incrementa la ronda

         // Cada ronda tiene una pregunta diferente
        switch (ronda) {
            case 1:
                let resp1 = prompt("¿Cómo se llama la princesa en 'Maléfica' que también es conocida como 'La Bella Durmiente'?");
                if (resp1 && resp1.toLowerCase() === 'aurora') {
                    alert("¡Correcto!");
                    puntos++;
                } else {
                    alert("Incorrecto, la respuesta correcta es 'Aurora'");
                }
                break;

            case 2:
                let resp2 = prompt("¿Cuál es el apodo del niño que acompaña a The Mandalorian?");
                if (resp2) {
                    let r2 = resp2.toLowerCase();
                    if (r2 === 'baby yoda' || r2 === 'grogu') {
                        alert("¡Correcto!");
                        puntos++;
                    } else {
                        alert("Incorrecto, la respuesta correcta es 'Baby Yoda' o 'Grogu'");
                    }
                } else {
                    alert("Respuesta no válida.");
                }
                break;

            case 3:
                const preguntas = [
                    { q: "¿Quién es el autor del libro 'Dune'?", a: "frank herbert" },
                    { q: "¿En qué mundo mágico estudia Harry Potter?", a: "hogwarts" },
                    { q: "¿Cómo se llama el dragón de la protagonista en 'Alas de sangre'?", a: "tairm" },
                    { q: "¿Quién es el protagonista en 'Amanecer en la cosecha'?", a: "haymitch aberrnathy" },
                    { q: "¿Qué pasa en la película 'Ponte en mi lugar de nuevo'?", a: "cambian de cuerpo" },
                    { q: "¿Quién es el protagonista de 'El ladrón del rayo'?", a: "percy jackson" },
                    { q: "¿Quién es el protagonista de la serie 'You'?", a: "joe" },
                    { q: "¿Cómo se llama el amigo extraterrestre de Lilo?", a: "stitch" },
                    { q: "¿De qué género es 'Red One'? (acción, comedia, drama)", a: "acción" },
                    { q: "¿De qué género es 'Otro pequeño favor'? (thriller, comedia, acción)", a: "thriller" }
                ];

                let correctas = 0;

                for (let i = 0; i < preguntas.length; i++) {
                    let respuesta = prompt(preguntas[i].q);
                    if (respuesta && respuesta.toLowerCase() === preguntas[i].a) {
                        correctas++;
                    }
                }

                // Si el usuario responde todas correctamente
                if (correctas === preguntas.length) {
                    alert("¡Excelente! Respondiste todas correctamente. ¡Ganaste un 10% de descuento en tu compra!");
                    puntos += 3;

                    // Aplica el descuento al carrito
                    if (carrito.totalPrecio > 0) {
                        const descuento = carrito.totalPrecio * 0.10;
                        carrito.totalPrecio = parseFloat((carrito.totalPrecio - descuento).toFixed(2));

                        // Ajusta los precios de los ítems para reflejar descuento
                        carrito.items = carrito.items.map(item => {
                            const proporcion = item.precioTotal / (carrito.totalPrecio + descuento);
                            item.precioTotal = parseFloat((item.precioTotal - (descuento * proporcion)).toFixed(2));
                            return item;
                        });

                        actualizarCarritoInfo();
                        mostrarResumen();
                    }
                } else {
                    alert(`Respondiste ${correctas} de ${preguntas.length} correctamente.`);
                }
                break;
        }

        // Pregunta si quiere continuar al siguiente nivel
        if (ronda < 3) {
            sigueJugando = confirm("¿Quieres continuar con la siguiente pregunta?");
        } else {
            sigueJugando = false;
        }
    }

    // Muestra el resultado del juego
    resultadoJuego.textContent = `Juego terminado. Puntuación total: ${puntos} punto(s).`;
});

// =====================
// 6. Manejadores de eventos
// =====================
// Evento para cambiar las opciones de artículo según la categoría seleccionada
categoriaSelect.addEventListener('change', () => {
    const categoria = categoriaSelect.value;
    itemSelect.innerHTML = '<option value="" disabled selected>Seleccione un artículo</option>';
    if (categoria && datos[categoria]) {
        datos[categoria].forEach(articulo => {
            const option = document.createElement('option');
            option.value = articulo;
            option.textContent = articulo;
            itemSelect.appendChild(option);
        });
        itemSelect.disabled = false;
    } else {
        itemSelect.innerHTML = '<option value="" disabled selected>Primero elige categoría</option>';
        itemSelect.disabled = true;
    }
});

// Evento para agregar el artículo al carrito
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const edad = parseInt(edadInput.value);
    const categoria = categoriaSelect.value;
    const item = itemSelect.value;
    const cantidad = parseInt(document.getElementById('cantidad').value);

    // Verifica que todos los campos sean válidos
    if (!nombre || !categoria || !item || !cantidad || cantidad <= 0) {
        alert('Por favor completa todos los campos correctamente.');
        return;
    }

    if (isNaN(edad) || edad < 18) {
        alert('Debes ser mayor de 18 años para realizar una compra.');
        return;
    }

    const precioUnitario = precios[categoria][item];
    const precioTotal = precioUnitario * cantidad;

    // Agrega el artículo al carrito
    carrito.items.push({ nombre, edad, categoria, item, cantidad, precioUnitario, precioTotal });
    carrito.totalItems += cantidad;
    carrito.totalPrecio += precioTotal;

    // Actualiza la información del carrito
    actualizarCarritoInfo();
    cambiarFondo();

    const seguir = confirm(`Se agregaron ${cantidad} "${item}" al carrito.\nPrecio total: $${precioTotal.toFixed(2)}\n\n¿Quieres agregar más artículos? (Aceptar = Sí, Cancelar = Pagar)`);

    if (seguir) {
        // Si elige agregar más artículos, limpia los campos
        categoriaSelect.value = '';
        itemSelect.innerHTML = '<option value="" disabled selected>Primero elige categoría</option>';
        itemSelect.disabled = true;
        document.getElementById('cantidad').value = 1;
    } else {
        // Si no, muestra el resumen y oculta el formulario
        mostrarResumen();
        form.style.display = 'none';
        btnPagar.style.display = 'inline-block';
        mostrarTrivial();
    }
});

// Evento para mostrar el modal de pago
btnPagar.addEventListener('click', () => {
    modalPago.style.display = 'flex';
});

// Cierra el modal de pago
btnCerrarModal.addEventListener('click', () => {
    modalPago.style.display = 'none';
});

// Evento para realizar el pago
formPago.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`¡Pago realizado con éxito!\nGracias por tu compra de $${carrito.totalPrecio.toFixed(2)}.`);

    // Resetea el carrito
    carrito = { totalItems: 0, totalPrecio: 0, items: [] };
    actualizarCarritoInfo();
    resumenCompra.style.display = 'none';
    listaArticulos.innerHTML = '';
    form.style.display = 'block';
    modalPago.style.display = 'none';
    form.reset();
    formPago.reset();
    categoriaSelect.value = '';
    itemSelect.innerHTML = '<option value="" disabled selected>Primero elige categoría</option>';
    itemSelect.disabled = true;
    document.getElementById('cantidad').value = 1;
    edadInput.value = '';
});

// =====================
// 7. Mostrar resumen
// =====================
// Función para mostrar el resumen de la compra
function mostrarResumen() {
    resumenCompra.style.display = 'block';
    listaArticulos.innerHTML = '';
    carrito.items.forEach(art => {
        const li = document.createElement('li');
        li.textContent = `${art.cantidad} x ${art.item} (${art.categoria}) - $${art.precioTotal.toFixed(2)} | Cliente: ${art.nombre}`;
        listaArticulos.appendChild(li);
    });
    totalPagarSpan.textContent = carrito.totalPrecio.toFixed(2);
}

// Función para actualizar la información del carrito
function actualizarCarritoInfo() {
    carritoInfo.textContent = `Artículos en el carrito: ${carrito.totalItems} | Total: $${carrito.totalPrecio.toFixed(2)}`;
    btnPagar.style.display = carrito.totalItems > 0 ? 'inline-block' : 'none';
}

// =====================
// 8. Generador de contraseña independiente
// =====================
// Genera una contraseña aleatoria cuando el usuario hace clic
document.getElementById('generar-password').addEventListener('click', () => {
    const pass = generarContrasena(10);
    document.getElementById('password-generada').value = pass;
});

// =====================
// 9. Validación del formulario personal
// =====================
// Valida si la contraseña es fuerte
document.getElementById('val-pass').addEventListener('input', () => {
    const fuerza = document.getElementById('fuerza-pass');
    const pass = document.getElementById('val-pass').value;
    const fuerte = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (fuerte.test(pass)) {
        fuerza.style.color = 'green';
        fuerza.textContent = 'Contraseña fuerte ✅';
    } else {
        fuerza.style.color = 'orange';
        fuerza.textContent = 'Contraseña débil ❌ (Debe tener mayúscula, minúscula, número, símbolo y mínimo 8 caracteres)';
    }
});

// Valida el formulario de registro personal
document.getElementById('validador-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('val-nombre').value.trim();
    const apellidos = document.getElementById('val-apellidos').value.trim();
    const email = document.getElementById('val-email').value.trim();
    const telefono = document.getElementById('val-telefono').value.trim();
    const pass = document.getElementById('val-pass').value;
    const pass2 = document.getElementById('val-pass2').value;
    const mensaje = document.getElementById('mensaje-validacion');
    const fuerte = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!nombre || !apellidos || !email || !telefono || !pass || !pass2) {
        mensaje.style.color = 'red';
        mensaje.textContent = 'Por favor, completa todos los campos.';
        return;
    }

    if (pass !== pass2) {
        mensaje.style.color = 'red';
        mensaje.textContent = 'Las contraseñas no coinciden.';
        return;
    }

    if (!fuerte.test(pass)) {
        mensaje.style.color = 'red';
        mensaje.textContent = 'La contraseña no es lo suficientemente fuerte.';
        return;
    }

    mensaje.style.color = 'green';
    mensaje.textContent = 'Formulario válido. Datos enviados correctamente.';
});


// =====================
// 10. Cambio de color personalizado
// =====================
// Cambia el color de fondo al color elegido por el usuario
document.getElementById('aplicar-color').addEventListener('click', () => {
    const color = document.getElementById('selector-color').value;
    document.body.style.backgroundColor = color;
});
