// Persistencia simple en localStorage y modo edición
const editBtn = document.getElementById('editBtn');
const clearBtn = document.getElementById('clearBtn');
const printBtn = document.getElementById('printBtn');
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const slots = Array.from(document.querySelectorAll('.slot'));
const KEY_PREFIX = 'horario_v1_';

function load(){
  slots.forEach(el => {
    const key = KEY_PREFIX + el.dataset.key;
    const saved = localStorage.getItem(key);
    if(saved !== null) el.innerHTML = saved;
  });
}
function save(){
  slots.forEach(el => {
    const key = KEY_PREFIX + el.dataset.key;
    localStorage.setItem(key, el.innerHTML);
  });
}

let editing = false;
function setEditing(on){
  editing = on;
  editBtn.textContent = on ? '💾 Guardar' : '✏️ Editar';
  slots.forEach(el => {
    el.contentEditable = on ? 'true' : 'false';
    el.classList.toggle('editing', on);
  });
  if(!on) save();
}

editBtn.addEventListener('click', () => {
  if(!editing){
    setEditing(true);
  } else {
    setEditing(false);
    alert('Cambios guardados en este navegador ✅');
  }
});

clearBtn.addEventListener('click', () => {
  if(confirm('¿Eliminar los cambios guardados en este navegador?')){
    slots.forEach(el => localStorage.removeItem(KEY_PREFIX + el.dataset.key));
    location.reload();
  }
});

printBtn.addEventListener('click', () => window.print());

load();
