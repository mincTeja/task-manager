const express = require('express');
const bodyParser = require('body-parser');
const taskController = require('./controllers/taskController');

const app = express();

app.use(bodyParser.json());



app.get('/',(req, res) => {
    res.send("hello world");
});


app.use('/tasks',taskController);


//global exception handler 
app.use((error, req, res, next) => {
    console.log(`error in global handler ${error}`);
    
    res
    .status(error.statusCode)
    .json({
        "status" : error.statusCode,
        "message" : error.message
    });
});



app.listen(3000, () => {
    console.log("server has started")
});