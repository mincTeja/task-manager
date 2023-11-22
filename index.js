const express = require('express')
const bodyParser = require('body-parser')
const taskController = require('./controllers/taskController')

const app = express()

app.use(bodyParser.json())



app.get('/',(req, res) => {
    res.send("hello world")
})

app.use('/tasks',taskController);



app.listen(3000, () => {
    console.log("server has started")
})