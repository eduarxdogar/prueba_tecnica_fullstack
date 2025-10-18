const express = require('express');
const cors = require('cors');
const db = require('./queries'); 

const app = express();
const port = 3000;

app.use(cors()); 
app.use(express.json()); 

app.get('/api/data', db.getUsuarios); 
app.get('/api/usuarios/:id', db.getUsuarioById); 
app.post('/api/usuarios', db.createUsuario);   
app.put('/api/usuarios/:id', db.updateUsuario);   
app.delete('/api/usuarios/:id', db.deleteUsuario); 

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});