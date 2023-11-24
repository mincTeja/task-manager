var taskList = require('../resources/tasks.json');
const ValidationError = require('../models/error/validationError');
const errorConstant = require('../constants/errorConstants');
const errorGeneratorUtil = require('../Utility/errorGeneratorUtil');
const uuid = require('uuid');



function fetchAllTasksInTaskList(){
    try{
        return taskList;
    } catch(err) {
        throw errorGeneratorUtil.formAndHandleError(errorConstant.INTERNAL_SERVER_ERROR_MESSAGE, 
            errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE);
    }
    
}

function fetchTaskInTaskList(taskId){
    try{

        let data = taskList.filter(task => task.id == taskId)
        
        if(data.length<1){
            throw new ValidationError("task not found", errorConstant.NOT_FOUND_REQUEST_STATUS_CODE);
        }
        return data;

    } catch (err) {
        if(err instanceof ValidationError){
            throw errorGeneratorUtil.formAndHandleError(err.message, err.statusCode);
        }else{
            throw errorGeneratorUtil.formAndHandleError(errorConstant.INTERNAL_SERVER_ERROR_MESSAGE, 
                errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE);
        }
    }
    
}

function addTaskInTaskList(taskToBeAdded){
    try{
        taskToBeAdded.id = uuid.v4();
        taskList.push(taskToBeAdded);
        return taskList;
    
    } catch (err) {
       
        throw formAndHandleError(errorConstant.INTERNAL_SERVER_ERROR_MESSAGE, errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE);
    }
}

function updateTaskInTaskList(taskId, taskToBeUpdated){
    try{
        let index = -1;
        for(let i=0; i<taskList.length;++i){
            if(taskList[i].id == taskId){
                index=i;
                break;
            }
        }
        
        if(index!=-1){
            taskToBeUpdated.id = taskList[index].id;
            taskList[index] = taskToBeUpdated;
        }

        return taskList;
    } catch(err){
        throw formAndHandleError(errorConstant.INTERNAL_SERVER_ERROR_MESSAGE, errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE);
    }

    
}

function deleteTaskInTaskList(taskId){
    try{
        taskList = taskList.filter(task => task.id != taskId);
        return taskList;
    }catch(err) {
        throw formAndHandleError(errorConstant.INTERNAL_SERVER_ERROR_MESSAGE, errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE);
    }
    
}



module.exports = {fetchAllTasksInTaskList, fetchTaskInTaskList, addTaskInTaskList, updateTaskInTaskList, deleteTaskInTaskList}