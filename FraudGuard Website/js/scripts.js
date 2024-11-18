// Initialize Three.js scene for hero animation
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('hero-animation').appendChild(renderer.domElement);

// Create particles
const particlesCount = 500; // Reduced for a more structured look
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10; // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z

    // Color (using a consistent color for a serious look)
    colors[i * 3] = 0; // R
    colors[i * 3 + 1] = 1; // G
    colors[i * 3 + 2] = 0; // B (green color for security)
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    particleSystem.rotation.y += 0.0035; // Slow down the rotation speed
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

const swiper = new Swiper('.swiper-container', {
    slidesPerView: 3, // Number of slides to show
    spaceBetween: 30, // Space between slides
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    mousewheel: {
        invert: false, // Prevent page scroll when using mouse wheel
    },
    breakpoints: {
        768: {
            slidesPerView: 2, // 2 slides on medium screens
        },
        480: {
            slidesPerView: 1, // 1 slide on small screens
        },
    },
});
