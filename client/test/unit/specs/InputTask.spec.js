import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import InputTask from '@/components/InputTask'
import {mount} from '@vue/test-utils'

Vue.use(ElementUI);

describe('InputTask.vue', () => {
  it('should be empty after Enter is pressed', () => {
      const wrapper = mount(InputTask);
      let taskName = 'new task';
      wrapper.vm.newTask = taskName;
      wrapper.vm.addTask();
      expect(wrapper.vm.newTask).to.equal('');
    }),
    it('should emit addTask event when task is typed and Enter is pressed', () => {
        const wrapper = mount(InputTask);
        let taskName = 'new task';
        wrapper.vm.newTask = taskName;
        wrapper.vm.addTask();
        expect(wrapper.emitted().addTask[0][0]).to.equal(taskName);
        expect(wrapper.emitted().addTask.length).to.equal(1);
    })
})
