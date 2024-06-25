const express = require('express')
const todosFilesRouter = require('./todos.api.files.router')
const todosApiRouter = require('./todos.api.router')
const todosRouter = require('./todos.router')

function routerTodos(app){
    const router = express.Router()
    app.use('/', router) 
    router.use('/', todosRouter)
    router.use('/api/v1/files/todos', todosFilesRouter)
    router.use('/api/v1/todos', todosApiRouter)
}

module.exports = routerTodos