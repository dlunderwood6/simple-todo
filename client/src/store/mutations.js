export default
{
    addTask(state, task){
        state.tasks.push(task);
    },
    editTask(state, updatedTask){
        var taskToEdit = state.tasks.filter(task => task.id === updatedTask.id)[0];
        var index = state.tasks.indexOf(taskToEdit);
        state.tasks[index].todo = updatedTask.text;
    },
    updateStatus(state, updatedTask){
        var index = state.tasks.findIndex(x => x.id === updatedTask.id);
        state.tasks[index].status = updatedTask.status;
    },
    deleteTask(state, deletedID){
        state.tasks = state.tasks.filter(task => task.id != deletedID)
    },
    loadAllTasks(state, tasks){
        state.tasks.length = 0;
        state.tasks.push(...tasks);
    }
}
