const router = require("express").Router();
const { connectClient } = require("../db/postgres");
const { leerArchivo, escribirArchivo } = require("../src/files");
const { v4: uuidv4 } = require('uuid'); // Importar uuid para generar IDs únicos
const todoModel = require("../src/models/todoModel");


// Index
router.get("/todospanel", async (req, res) => {
    const client = await connectClient();
    try {
        const result = await client.query("SELECT * FROM todos");
        res.render('todos/index', { todos: result.rows });
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        await client.end();
    }
});


//   // Obtener una tarea por ID
  router.post('/todos', async (req, res) => {
    const body = req.body;
    const client = await connectClient();
    try {
      let title = body.search.toUpperCase();
      const todo = await client.query("SELECT * FROM todos where UPPER(title) like'%"+ title+"%'");
      if (todo) {
        res.render('todos/index', { todos: todo.rows });
      } else {
        res.status(404).json({ error: 'tarea no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener tarea por ID:', error);
      res.status(500).json({ error: 'Error al tarea deporte por ID' });
    }
  });
  
  // Crear una tarea  (formulario)
    router.get('/create', (req, res) => {
      res.render('todos/create');
    });
  
   // Procesar la creación de la tarea
    router.post('/create', async (req, res) => {
      const nuevotarea = req.body;
      try {
        await todoModel.create(nuevotarea);
        res.redirect('create');
      } catch (error) {
        console.error('Error al crear :', error);
        res.status(500).json({ error: 'Error al crear ' });
      }
    });
  

  
//   // Eliminar una tarea por ID
  router.post('/todos/delete/:id', async (req, res) => {
    const todoId = req.params.id;
    try {
      const todo = await todoModel.findByPk(todoId);
      if (todo) {
        await todo.destroy();
        res.redirect('/todospanel');
      } else {
        res.status(404).json({ error: 'tarea no encontrada' });
      }
    } catch (error) {
      console.error('Error al eliminar tarea por ID:', error);
      res.status(500).json({ error: 'Error al eliminar tarea por ID' });
    }
  });
module.exports = router;