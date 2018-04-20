<template>
    <div>
        <el-input
            placeholder = "Enter a task..."
            v-model = "newTask"
            v-on:keyup.enter.native = "addTask"
            style = "width: 50%">
        </el-input>
    </div>
</template>

<script>
export default {
    data () {
            return {
                newTask: ''
            }
    },
    methods: {
        addTask(){
            this.$emit('addTask', this.newTask)
            this.newTask =''
        }
    }
}
</script>
