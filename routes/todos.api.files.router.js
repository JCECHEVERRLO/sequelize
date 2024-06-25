const router = require('express').Router()
const { leerArchivo, escribirArchivo } = require('../src/files')

//index
router.get('/', (req, res) => {
    //Leer archivo
    const todos = leerArchivo('./db.json')
    res.send(todos)
})

//store
router.post('/', 
(req,res, next) => {
    req.body.created_at = 'Acá va la fecha'
    next()
},
(req,res)=> {
    const todo = req.body
    const todos = leerArchivo('./db.json')
    todo.id = todos.length + 1
    todos.push(todo)
    //Escribir archivo
    escribirArchivo('./db.json', todos)
    res.status(201).send(todo)
})

router.put('/updated_at', (req, res)=> {
    //Leer archivo 
    const todos = leerArchivo('./db.json')
    const todosUpdated = todos.map(todo => {
        if(todo.updated_at){ //¿Ya tiene el campo updated_at?
            return todo    
        }
        todo.updated_at = 'Adios'
        return todo
    })
    escribirArchivo('./db.json', todosUpdated)
    console.log(todosUpdated)
    res.json(todosUpdated)
})


//show
//Middleware a nivel de ruta
router.get(
    '/:id', //Primer parámetro
    (req, res, next) => { //Segundo parámetro
        console.log('Middleware a nivel de ruta')
        next()
    },
    (req, res) => {
    const id = req.params.id
    const todos = leerArchivo('./db.json')
    const todo = todos.find(todo => todo.id === parseInt(id))
    //No existe
    if(! todo ){
        res.status(404).send('No existe')
        return
    }
    //Existe
    res.send(todo)
    console.log('hola')
})

router.put('/:id', (req,res)=> {
    //Buscar la tarea con el ID recibido en la URL
    const id = req.params.id
    const todos = leerArchivo('./db.json')
    const todo = todos.find(todo => todo.id === parseInt(id))
    //No existe
    if(! todo ){
        res.status(404).send('No existe')
        return
    }
    //Existe
    //Actualizar la tarea 
    const newTodo = {...todo, ...req.body} //Spread operator
    const index = todos.indexOf(todo)
    todos[index] = newTodo
    //Escribir archivo
    escribirArchivo('./db.json', todos)
    res.send(newTodo)
})

router.delete('/:id', (req,res)=> {
    const id = req.params.id
    const todos = leerArchivo('./db.json')
    const todo = todos.find(todo => todo.id === parseInt(id))
    //No existe
    if(! todo ){
        res.status(404).send('No existe')
        return
    }
    //Existe
    const index = todos.indexOf(todo)
    todos.splice(index, 1)
    //Escribir archivo
    escribirArchivo('./db.json', todos)
    res.send(todo)
})

module.exports = router