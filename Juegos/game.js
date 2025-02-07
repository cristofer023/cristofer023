// Crear la escena y la cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Crear el renderizado
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear un cubo como el jugador
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(geometry, material);
player.position.set(0, 0, 0);
scene.add(player);

// Crear un objetivo (enemigo)
const enemyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const enemyMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
enemy.position.set(5, 0, -10); // Posición inicial del enemigo
scene.add(enemy);

// Añadir iluminación básica
const light = new THREE.AmbientLight(0xffffff); // Luz ambiental
scene.add(light);

// Configurar el fondo y la perspectiva
camera.position.z = 5;

// Movimiento del jugador
let moveSpeed = 0.1; // Velocidad de movimiento
let isMovingLeft = false, isMovingRight = false, isMovingUp = false, isMovingDown = false;

// Detectar las teclas presionadas
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') isMovingLeft = true;
    if (event.key === 'ArrowRight') isMovingRight = true;
    if (event.key === 'ArrowUp') isMovingUp = true;
    if (event.key === 'ArrowDown') isMovingDown = true;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowLeft') isMovingLeft = false;
    if (event.key === 'ArrowRight') isMovingRight = false;
    if (event.key === 'ArrowUp') isMovingUp = false;
    if (event.key === 'ArrowDown') isMovingDown = false;
});

// Disparo del jugador
const bullets = [];
const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const bulletGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.5);

document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        let bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
        bullet.position.set(player.position.x, player.position.y, player.position.z);
        scene.add(bullet);
        bullets.push(bullet);
    }
});

// Movimiento de la cámara y los objetos
function movePlayer() {
    if (isMovingLeft) player.position.x -= moveSpeed;
    if (isMovingRight) player.position.x += moveSpeed;
    if (isMovingUp) player.position.z -= moveSpeed;
    if (isMovingDown) player.position.z += moveSpeed;
}

// Mover las balas
function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.position.z -= 0.2; // Mueve la bala hacia adelante
        if (bullet.position.z < -10) {
            scene.remove(bullet); // Elimina la bala si sale de la escena
            bullets.splice(index, 1);
        }
    });
}

// Detección de colisiones (simple)
function detectCollisions() {
    bullets.forEach((bullet, index) => {
        const distance = bullet.position.distanceTo(enemy.position);
        if (distance < 1) {
            scene.remove(enemy); // Eliminar el enemigo si es golpeado
            enemy.position.set(5, 0, -10); // Resetea la posición del enemigo
            bullets.splice(index, 1); // Eliminar la bala
            scene.remove(bullet);
        }
    });
}

// Función de renderizado
function animate() {
    requestAnimationFrame(animate);
    
    movePlayer();
    moveBullets();
    detectCollisions();
    
    renderer.render(scene, camera);
}

animate();
