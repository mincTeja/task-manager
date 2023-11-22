const taskController = require('express').Router()
const taskHelper = require('../helper/taskHelper')



taskController.get('/', (req, res) => {
    res
    .send(taskHelper.fetchAllTasksInTaskList())
    .status(200);
})

taskController.get('/:id', (req, res) => {
    res
    .send(taskHelper.fetchTaskInTaskList(req.params.id))
    .status(200);
})

taskController.post('/', (req,res) => {
    res
    .send(taskHelper.addTaskInTaskList(req.body))
    .status(200);
})

taskController.put('/:id', (req,res) => {
    res
    .send(taskHelper.updateTaskInTaskList(req.params.id, req.params.body))
    .status(200);
})

taskController.delete('/:id', (req, res) => {
    res
    .send(taskHelper.deleteTaskInTaskList(req.params.id))
    .status(200);
})

module.exports = taskController