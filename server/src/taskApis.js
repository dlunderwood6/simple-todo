import express from 'express'
import uuid from 'uuid-v4'
import bodyParser from 'body-parser'
import database from './database'

var router = express.Router();
router.use(bodyParser.json());
var getIndexToEdit = (id) => {
    return tasks.findIndex(x => x.id === id);
}

var tasks = []
var sqlite3 = require('sqlite3').verbose();
var db;

router.post('/editTask', (req, res) => {
    var updatedTask = req.body.data;
    var index = getIndexToEdit(updatedTask.id);
    tasks[index].todo = updatedTask.text;
    database.editTask(updatedTask.text, updatedTask.id);

    res.send(updatedTask);
})

router.post('/changeStatus', (req, res) => {
    var index = getIndexToEdit(req.body.data);
    if(tasks[index].status === "active") {
        tasks[index].status = "completed";
    }
    else {
        tasks[index].status = "active";
    }
    database.changeStatus(tasks[index].status, req.body.data);

    res.send(tasks[index]);
})

router.post('/addTask', (req, res) => {
    var newTaskID = uuid();
    var newTask = {id: newTaskID, todo: req.body.data, status: "active"};
    tasks.push(newTask);
    database.addTask(newTask.id, newTask.todo)

    res.send(newTask);
})

router.post('/deleteTask', (req, res) => {
    var deletedID = req.body.data;
    tasks = tasks.filter(task => task.id != deletedID);
    database.deleteTask(deletedID)

    res.send(deletedID);
})

router.get('/', (req, res) => res.send('Hello World!'))

router.get('/getTasks', (req, res) => {
    database.getTasks().then((ret) => {
        tasks = ret;
        res.send(tasks);
    })

})

export default router;
