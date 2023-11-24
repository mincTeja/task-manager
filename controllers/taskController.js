const taskController = require('express').Router()
const taskHelper = require('../helper/taskHelper')
const validators = require('../middlewares/validationMiddleware')



taskController.get('/', (req, res) => {
    try{
        
        res
        .send(taskHelper.fetchAllTasksInTaskList())
        .status(200);
    
    }catch(err) {
    
        console.log(`error in controller ${err}`);
        next(err);
    
    }  
});

taskController.get('/:id', validators.validateTaskId, (req, res, next) => {
    try{

        let data = taskHelper.fetchTaskInTaskList(req.params.id);
        res.send(data);
    
    } catch(err){
    
        console.log(`error in controller ${err}`);
        next(err);
    
    }
});

taskController.post('/', validators.validateTaskToBeAddedOrUpdated, (req,res) => {
    try{

        let data = taskHelper.addTaskInTaskList(req.body);
        res.send(data);

    }catch(err) {
        console.log(`error in controller ${err}`);
        next(err);
    }
    
});

taskController.put('/:id', [validators.validateTaskId,validators.validateTaskToBeAddedOrUpdated], (req,res) => {
    try{

        let data = taskHelper.updateTaskInTaskList(req.params.id, req.body);
        res.send(data);

    }catch(err) {
        console.log(`error in controller ${err}`);
        next(err);
    }
});

taskController.delete('/:id', validators.validateTaskId, (req, res) => {
    try{
    
        let data = taskHelper.deleteTaskInTaskList(req.params.id);
        res.send(data);
    
    } catch(err) {
    
        console.log(`error in controller ${err}`);
        next(err);
    
    }
});

module.exports = taskController;