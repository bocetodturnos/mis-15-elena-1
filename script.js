import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Tu código sigue aquí abajo...


// El resto de tu código...


AOS.init({ duration: 1000, once: true });

const videoApertura = document.getElementById('video-invitacion');
const capaBoton = document.getElementById('capa-boton');
const btnIngresar = document.getElementById('btn-ingresar');
const overlay = document.getElementById('overlay');
const musica = document.getElementById('musica');
const btnToggle = document.getElementById('btn-musica-toggle');

// RECUERDO: Iniciar video y mostrar botón a los 7 segundos
window.addEventListener('load', () => {
    videoApertura.play().catch(() => console.log("Video mudo"));
    setTimeout(() => {
        capaBoton.classList.remove('hidden');
    }, 7000); // RECUERDO: Aquí ajustas el tiempo del botón
});

btnIngresar.addEventListener('click', () => {
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        videoApertura.pause();
        musica.play().catch(e => console.log("Audio bloqueado"));
    }, 800);
});

btnToggle.addEventListener('click', () => {
    if (musica.paused) {
        musica.play();
        btnToggle.innerText = '||';
    } else {
        musica.pause();
        btnToggle.innerText = '▶';
    }
});

window.toggleRegalos = function() {
    const div = document.getElementById('datos-banco');
    div.classList.toggle('hidden');
}

// --- CONTADOR ---
const targetDate = new Date('Julio 03, 2026 22:00:00').getTime();
setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    const countdown = document.getElementById('countdown');
    if (countdown) {
        countdown.innerHTML = `
            <div class="countdown-item"><span>${d}</span><div class="countdown-label">Días</div></div>
            <div class="countdown-item"><span>${h}</span><div class="countdown-label">Horas</div></div>
            <div class="countdown-item"><span>${m}</span><div class="countdown-label">Mins</div></div>
            <div class="countdown-item"><span>${s}</span><div class="countdown-label">Segs</div></div>
        `;
    }
}, 1000);

window.accesoAdmin = function() {
    const pass = prompt("Ingresa la clave de administrador:");
    if (pass === "1234") { window.location.href = "admin.html"; } else { alert("Clave incorrecta"); }
}

const btnFinal = document.getElementById('btn-final');
btnFinal.addEventListener('click', async () => {
    const nombre = document.getElementById('nombre').value;
    const asiste = document.getElementById('asistencia').value;
    const tel = document.getElementById('telefono').value;
    if(!nombre || !tel) return alert("Por favor completa nombre y teléfono");

    const datos = {
        nombre: nombre,
        asistencia: asiste,
        musica: document.getElementById('musica_input').value,
        menu: document.getElementById('menu_tipo').value,
        menuDetalle: document.getElementById('menu_detalle').value,
        telefono: tel,
        fecha: new Date()
    };

    try {
        await addDoc(collection(db, "helena"), datos);
        const msn = asiste === 'si' 
            ? `¡Hola! Soy ${nombre} y CONFIRMO mi asistencia a tus 15. ✨` 
            : `Hola, soy ${nombre}. Muchas gracias por la invitación, pero no podré asistir. 💖`;
        window.open(`https://wa.me/5491121622369?text=${encodeURIComponent(msn)}`, '_blank');
        alert("¡Confirmación enviada con éxito!");
    } catch (e) { alert("Error al conectar con la base de datos."); }
});
