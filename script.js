/* === ANIMATED HEX GRID BACKGROUND === */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, hexes = [];

function resize() {
W = canvas.width = window.innerWidth;
H = canvas.height = window.innerHeight;
buildHexes();
}

function buildHexes() {
hexes = [];
const size = 38, colW = size * Math.sqrt(3), rowH = size * 1.5;
for (let row = -1; row < H / rowH + 2; row++) {
    for (let col = -1; col < W / colW + 2; col++) {
    const x = col * colW + (row % 2) * colW / 2;
    const y = row * rowH;
    hexes.push({ x, y, size, alpha: Math.random() * 0.08, target: Math.random() * 0.12, speed: 0.003 + Math.random() * 0.005 });
    }
}
}

function hexPath(x, y, s) {
ctx.beginPath();
for (let i = 0; i < 6; i++) {
    const a = Math.PI / 180 * (60 * i - 30);
    i === 0 ? ctx.moveTo(x + s * Math.cos(a), y + s * Math.sin(a))
            : ctx.lineTo(x + s * Math.cos(a), y + s * Math.sin(a));
}
ctx.closePath();
}

function draw() {
ctx.clearRect(0, 0, W, H);
hexes.forEach(h => {
    h.alpha += (h.target - h.alpha) * h.speed;
    if (Math.abs(h.target - h.alpha) < 0.001) {
    h.target = Math.random() * 0.14;
    h.speed = 0.002 + Math.random() * 0.006;
    }
    hexPath(h.x, h.y, h.size);
    ctx.strokeStyle = `rgba(61,214,163,${h.alpha})`;
    ctx.lineWidth = 0.6;
    ctx.stroke();
});
requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();

/* === SCROLL REVEAL === */
const observer = new IntersectionObserver((entries) => {
entries.forEach((e, i) => {
    if (e.isIntersecting) {
    setTimeout(() => e.target.classList.add('visible'), i * 80);
    observer.unobserve(e.target);
    }
});
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));