var uuid = require('uuid-v4');
var sqlite3 = require('sqlite3').verbose();

export default{
    editTask(description, id) {
        var statement = "update tasks set description = (?) where id = (?)";
        this.updateDatabase(statement, description, id);
    },
    changeStatus(status, id) {
        var statement = "update tasks set status = (?) where id = (?)";
        this.updateDatabase(statement, status, id);
    },
    addTask(id, description) {
        var statement = "insert into tasks values(?,?,?)";
        this.updateDatabase(statement, id, description, "active");
    },
    deleteTask(id) {
        var statement = "delete from tasks where id = (?)";
        this.updateDatabase(statement, id);
    },
    updateDatabase(command) {
        var db = new sqlite3.Database('todos');
        var statement = db.prepare(command);
        statement.run(Array.prototype.slice.call(arguments, 1));
        statement.finalize();
        db.close();
    },
    getTasks() {
        var db = new sqlite3.Database('todos');
        var tasks = [];
        var promise = new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("create table if not exists tasks (id text, description text, status text)");
                db.all("select * from tasks", (err, rows) => {
                    if(rows.length > 0) {
                        tasks = this.populateTasks(rows);
                    }
                    else {
                        tasks = this.populateDatabase(db).then((tasks) => reolve(tasks));
                    }
                    db.close();
                    resolve(tasks);
                });
            });
        });
        return promise;
    },
    populateTasks(rows) {
        var tasks = [];
        for (var row of rows) {
            var task = {id: row.id, todo: row.description, status: row.status};
            tasks.push(task);
        }
        return tasks;
    },
    populateDatabase(db) {
        var tasks = [];
        var promise = new Promise((resolve, reject) => {
            var statement = db.prepare("insert into tasks values(?,?,?)");
            for(var i = 0; i < 10; i++)
            {
                var newTask = this.generateTask(i + 1);
                statement.run(newTask.id, newTask.description, newTask.status);
                tasks.push(newTask);
            }
            statement.finalize();
        });
        return promise;
    },
    generateTask(index) {
        var status = "active";
        if(Math.random() < .2){
            status = "completed"
        }
        var newID = uuid();
        return {id: newID, description: "task " + index, status: status}
    }
}
