import axios from 'axios'

var apiBaseUrl = 'http://localhost:3000';

export default
{
    addTask(context, task){
        axios.post(apiBaseUrl + '/addTask', {data: task}).
        then( (response) => {
            context.commit('addTask', response.data);
        });
    },
    editTask(context, updateObject){
        axios.post(apiBaseUrl + '/editTask', {data: updateObject}).
        then( (response) => {
            context.commit('editTask', response.data);
        });
    },
    deleteTask(context, id){
        axios.post(apiBaseUrl + '/deleteTask', {data: id}).
        then( (response) => {
            context.commit('deleteTask', response.data);
        });
    },
    updateStatus(context, id){
        axios.post(apiBaseUrl + '/changeStatus/', {data: id}).
        then( (response) => {
            context.commit('updateStatus', response.data);
        });
    },
    loadAllTasks(context){
        axios.get(apiBaseUrl + '/getTasks').then((response) => {
            context.commit('loadAllTasks', response.data)
        });
    }
}
