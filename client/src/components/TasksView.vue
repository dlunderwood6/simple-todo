<template>
    <div class = "hello" align = "center">
        <h1>{{ msg }}</h1>
        <counter :totalNumber = "activeTodoCount"/>
        <inputTask :newTask = "newTask" @addTask = "addTask"/>
        <taskList :tasks = "tasks" @edit = "edit" @updateRowStatus = "updateRowStatus" @remove = "remove"/>
    </div>
</template>

<script>
import counter from './Counter';
import inputTask from './InputTask';
import taskList from './TaskList';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello, Danielle Underwood',
      newTask: ''
    }
  },
  methods: {
      addTask(newTask){
          this.$store.dispatch('addTask', newTask);
      },
      updateRowStatus(clickedRowIndex){
          this.$store.dispatch('updateStatus', this.$store.getters.getTasks[clickedRowIndex].id);
      },
      edit(updateObject){
          var apiUpdateObject = {id: this.$store.getters.getTasks[updateObject.clickedRowIndex].id,
            text: updateObject.value};
          this.$store.dispatch('editTask', apiUpdateObject);
      },
      remove(clickedRowIndex){
          this.$store.dispatch('deleteTask', this.$store.getters.getTasks[clickedRowIndex].id);
      },
      save(){

      }
  },
  computed: {
      activeTodoCount(){
          return this.$store.getters.getTasks.length;
      },
      tasks(){
          return this.$store.getters.getTasks;
      }
  },
  components: {
      counter,
      inputTask,
      taskList
  },
  mounted() {
      this.$store.dispatch('loadAllTasks');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
