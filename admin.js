//import { db } from './firebase-config.js';
//import { collection, addDoc, query, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


import { db } from './firebase-config.js';
import { collection, query, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Tu código sigue aquí abajo...


const cuerpo = document.getElementById('lista-admin');
const q = query(collection(db, "demos"), orderBy("fecha", "desc"));

onSnapshot(q, (snap) => {
    cuerpo.innerHTML = "";
    snap.forEach(doc => {
        const d = doc.data();
        const fila = document.createElement('tr');
        const claseAsiste = d.asistencia === 'si' ? 'si-asiste' : 'no-asiste';
        const textoAsiste = d.asistencia === 'si' ? 'CONFIRMADO' : 'RECHAZADO';

        fila.innerHTML = `
            <td>${d.nombre}</td>
            <td class="${claseAsiste}">${textoAsiste}</td>
            <td>${d.musica || '-'}</td>
            <td><strong>${d.menu}</strong><br><small>${d.menuDetalle || ''}</small></td>
            <td><a href="https://wa.me/${d.telefono}" class="btn-wa" target="_blank">Chat</a></td>
        `;
        cuerpo.appendChild(fila);
    });
});
