const taskController = require('express').Router()



taskController.get('/', (req, res) => {
    res.send('please find the tasks');
})

module.exports = taskController