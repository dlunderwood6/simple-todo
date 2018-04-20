import Vue from 'vue'
import Router from 'vue-router'
import TasksView from '@/components/TasksView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TasksView',
      component: TasksView
    }
  ]
})
