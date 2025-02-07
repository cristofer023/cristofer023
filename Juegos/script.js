let campo = document.getElementById("campo");
let jugador = document.getElementById("jugador");

let jugadorPosX = 275;
let velocidadJugador = 20;
let balas = [];

let enemigos = [];

// Crear enemigos
function crearEnemigo() {
    let enemigo = document.createElement("div");
    enemigo.classList.add("enemigo");
    enemigo.style.left = `${Math.random() * 550}px`;
    enemigo.style.top = "0px";
    campo.appendChild(enemigo);
    enemigos.push(enemigo);
}

// Mover el jugador
document.addEventListener("keydown", (evento) => {
    if (evento.key === "ArrowLeft" && jugadorPosX > 0) {
        jugadorPosX -= velocidadJugador;
        jugador.style.left = `${jugadorPosX}px`;
    }
    if (evento.key === "ArrowRight" && jugadorPosX < 550) {
        jugadorPosX += velocidadJugador;
        jugador.style.left = `${jugadorPosX}px`;
    }

    // Disparar
    if (evento.key === " ") {
        disparar();
    }
});

// Función para disparar balas
function disparar() {
    let bala = document.createElement("div");
    bala.classList.add("bala");
    bala.style.left = `${jugadorPosX + 22}px`; // Centrado respecto al jugador
    bala.style.bottom = "60px"; // Empieza justo sobre el jugador
    campo.appendChild(bala);
    balas.push(bala);

    // Mover la bala
    let intervaloBala = setInterval(() => {
        let balaPosY = parseInt(bala.style.bottom);
        if (balaPosY >= 400) {
            clearInterval(intervaloBala); // Detener cuando la bala se sale de la pantalla
            campo.removeChild(bala); // Eliminar bala
        } else {
            bala.style.bottom = `${balaPosY + 10}px`; // Mover hacia arriba
        }
    }, 20);
}

// Crear enemigos cada 2 segundos
setInterval(crearEnemigo, 2000);

// Detectar colisiones
function detectarColisiones() {
    balas.forEach(bala => {
        enemigos.forEach((enemigo, index) => {
            let enemigoRect = enemigo.getBoundingClientRect();
            let balaRect = bala.getBoundingClientRect();
            
            // Si la bala toca al enemigo
            if (balaRect.top <= enemigoRect.bottom && balaRect.bottom >= enemigoRect.top &&
                balaRect.left <= enemigoRect.right && balaRect.right >= enemigoRect.left) {
                campo.removeChild(enemigo); // Eliminar enemigo
                campo.removeChild(bala); // Eliminar bala
                enemigos.splice(index, 1); // Eliminar del array de enemigos
                balas = balas.filter(item => item !== bala); // Eliminar de array de balas
            }
        });
    });
}

// Detectar colisiones cada 50ms
setInterval(detectarColisiones, 50);
