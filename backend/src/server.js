const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const todosRouter = require('./routes/todos')

const server = express();
const port = 4000;

server.use(cors());
server.use(express.json());
server.use('/api/vl',todosRouter);

dotenv.config();

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('conectado a la base datos')) 
.catch((err) => console.log('error al conectar a la base de datos error: ' + err));

server.get('/', (request, response) => {
  response.send('leer todas las tareas');
});



server.listen(port, () => {
  console.log(`Servidor corriendo en localhost, en el puerto ${port}`);
});