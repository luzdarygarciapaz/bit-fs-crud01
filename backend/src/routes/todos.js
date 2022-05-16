const express = require ('express')
const router = express.Router()
const todoschema = require('../models/todos')

/*CRUD*/
router.post('/todos', (request, response) => {
   // response.send('Crear tarea');
    console.log('request:', request.body);
    const newtodo = todoschema(request.body);
    newtodo
    .save()
    .then((data)=> response.json({success: data}))
    .catch((err)=> response.json({error: err}));
  });
  
  router.get('/todos', (request, response) => {
    //response.send('Leer todas las tareas');
    todoschema
    .find()
    .then((data) => response.json({ success: data }))
    .catch((err) => response.json({ failured: err }));
  });
  
  router.get('/todos:id', (request, response) => {
    //response.send('leer una tarea especifica');
    const { id } = request.params;
     todoschema
    .findById(id)
    .then((data) => response.json({ success: data }))
    .catch((err) => response.json({ failured: err }));
  });
  
  router.put('/todos:id', (request, response) => {
    //response.send('Actualizar una tarea especifica');
    const { id } = request.params;
    const todo = request.body;
     todoschema
    .updateOne({ _id: id }, { $set: todo })
    .then((data) => response.json({ success: data }))
    .catch((err) => response.json({ failured: err }));
  });
  
  router.delete('/todos:id', (request, response) => {
    //response.send('Eliminar una tarea especifica');
    const { id } = request.params;
    todoschema
    .deleteOne({ _id: id })
    .then((data) => response.json({ success: data }))
    .catch((err) => response.json({ failured: err }));
  });

  module.exports = router;