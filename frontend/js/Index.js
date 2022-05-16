/* VARIABLES */
const d = document;
const apiUrl = 'http://localhost:4000/api/vl/todos';
const $main = d.querySelector('main');
const $h1 = d.createElement('h1');
const $input = d.createElement('input');
const $crearBtn = d.createElement('button');
const $p = d.createElement('p');
const $ol = d.createElement('ol');

$input.classList.add('cuadrotxt');
$ol.classList.add('preguntase');

$h1.textContent = 'PREGUNTAS/COMENTARIOS';
$h1.classList.add('preguntasd');
$main.appendChild($h1);
$main.appendChild($input);
$crearBtn.setAttribute('id', 'crearBtn');
$crearBtn.classList.add('enviar');
$crearBtn.textContent = 'Enviar';
$main.appendChild($crearBtn);

let tareas = null;
let $botonesEliminar = null;

/* EVENTOS */
d.addEventListener('DOMContentLoaded', () => {
  leerTareas();
  escucharEventos();
});

const escucharEventos = () => {
  $crearBtn.addEventListener('click', crearTarea);
};

const vigilarEliminar = (botones) => {
    botones.forEach((boton) => {
    const id = boton.parentNode.id;
    boton.addEventListener('click', () => eliminarTarea(id));
  });
};

/* FUNCIONES */

/*Crear*/
const crearTarea = () => {
    const tarea = {
    name: $input.value,
    completed: false,
  };
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tarea),
  })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      
      if (datos.success) {
        leerTareas();
        $input.value = null;
      }
    })
    .catch((error) => console.log('error:', error));
};

//Leer
const leerTareas = () => {
  $p.textContent = '';
  $ol.innerHTML = null;
  fetch(apiUrl)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      tareas = datos.success;

      if (tareas.length === 0) {
        $p.textContent = 'No existen tareas aún.';
        $main.appendChild($p);
      } else {
      tareas.forEach((elemento) => {
        const $li = d.createElement('li');
        $li.setAttribute('id', elemento._id);
        const $borrarBtn = d.createElement('button');
        $li.appendChild(d.createTextNode(elemento.name));
        $borrarBtn.classList.add('eliminar');
        $borrarBtn.textContent = 'Eliminar';
        $li.dataset.nombre = elemento.name;
        $li.dataset.completada = elemento.completed;
        $li.appendChild($borrarBtn);
        $ol.appendChild($li);
      });
      $main.appendChild($ol);
      $botonesEliminar = d.querySelectorAll('.eliminar');
      vigilarEliminar($botonesEliminar);
    }
    })
    .catch((error) => console.log('error:', error));
};

// Actualizar
const actualizarTarea = (id, nombre, completada) => {
     const tarea = {
      name: nombre,
      completed: !completada,
    };
    console.log('tarea:', tarea);
    fetch(`${apiUrl}${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tarea),
    })
      .then((respuesta) => leerTareas())
      .catch((error) => console.log('error:', error));
  };

  //Eliminar
const eliminarTarea = (id) => {
    fetch(`${apiUrl}${id}`, {
    method: 'DELETE',
  })
    .then((respuesta) => leerTareas())
    .catch((error) => console.log('error:', error));
};