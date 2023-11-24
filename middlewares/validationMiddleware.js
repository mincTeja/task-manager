const errorGeneratorUtil = require('../Utility/errorGeneratorUtil');
var ValidationError = require('../models/error/validationError');
const errorConstant = require('../constants/errorConstants');

function validateTaskId(req, res, next) {
    try{
        if(typeof req.params.id === "string" && req.params.id.length === 0){
            throw new ValidationError("Inavlid taskId", errorConstant.BAD_REQUEST_STATUS_CODE);
        }
        next();
    } catch(err) {
        console.log(err);
        if(err instanceof ValidationError){
            next(errorGeneratorUtil.formAndHandleError(err.message, err.statusCode));
        }else{
            next(errorGeneratorUtil.formAndHandleError(errorConstant.INTERNAL_SERVER_ERROR_MESSAGE, errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE));
        }
    }
}

function validateTaskToBeAddedOrUpdated(req, res, next){
    try{
        const task = req.body;

        if(typeof task.title === "undefined" || (typeof task.title === "string" && task.title.length === 0)){
            throw new ValidationError("Title is mandatory field", errorConstant.BAD_REQUEST_STATUS_CODE);
        }

        if(typeof task.description === "undefined" || (typeof task.description === "string" && task.description.length === 0)){
            throw new ValidationError(" Description is mandatory field", errorConstant.BAD_REQUEST_STATUS_CODE);
        }

        if(typeof task.completionStatus === "undefined" || !typeof task.completionStatus === "boolean"){
            throw new ValidationError("Unknown value is passed in completion status", errorConstant.BAD_REQUEST_STATUS_CODE);
        }

        next();

    }catch(err) {
        
        console.log(err);
        if(err instanceof ValidationError){
            next(errorGeneratorUtil.formAndHandleError(err.message, err.statusCode));
        }else{
            next(errorGeneratorUtil.formAndHandleError(errorConstant.INTERNAL_SERVER_ERROR_MESSAGE, errorConstant.INTERNAL_SERVER_ERROR_STATUS_CODE));
        }

    }
}


module.exports = {validateTaskId, validateTaskToBeAddedOrUpdated};