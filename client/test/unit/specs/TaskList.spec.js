import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import TaskList from '@/components/TaskList'
import {mount} from '@vue/test-utils'

Vue.use(ElementUI);

describe('TaskList.vue', () => {
    it('should emit remove event after remove button is clicked', () => {
        const wrapper = mount(TaskList);
        wrapper.vm.remove(0);
        expect(wrapper.emitted().remove.length).to.equal(1);
        expect(wrapper.emitted().remove[0][0]).to.equal(0);
    }),
    it('should emit updateRowStatus event after check button is clicked', () => {
        const wrapper = mount(TaskList);
        wrapper.vm.updateRowStatus(0);
        expect(wrapper.emitted().updateRowStatus.length).to.equal(1);
        expect(wrapper.emitted().updateRowStatus[0][0]).to.equal(0);
    }),
    it('should emit edit event after prompt is filled', () => {
        const wrapper = mount(TaskList);
        var clickedRowIndex = 0, taskName = "newTask";
        wrapper.vm.edit(clickedRowIndex, taskName);
        expect(wrapper.emitted().edit.length).to.equal(1);
        expect(Object.getOwnPropertyNames(wrapper.emitted().edit[0][0]).length).to.equal(2);
        expect(wrapper.emitted().edit[0][0].clickedRowIndex).to.equal(clickedRowIndex);
        expect(wrapper.emitted().edit[0][0].value).to.equal(taskName);
    }),
    it('should return correct row type', () => {
        const wrapper = mount(TaskList);
        var rowIndex = 0, row = wrapper.vm.tasks[rowIndex];
        var ret = wrapper.vm.rowStatus({row, rowIndex});
        expect(ret).to.equal('');

        rowIndex = 1, row = wrapper.vm.tasks[rowIndex];
        ret = wrapper.vm.rowStatus({row, rowIndex});
        expect(ret).to.equal('success-row');
    })
    it('should return correct filter value', () => {
        const wrapper = mount(TaskList);
        var value = "active", row = wrapper.vm.tasks[0], column = {property: "status"};
        var ret = wrapper.vm.filterActive(value, row, column);
        expect(ret).to.equal(true);

        value = "completed", row = wrapper.vm.tasks[0], column = {property: "status"};
        ret = wrapper.vm.filterActive(value, row, column);
        expect(ret).to.equal(false);
    })
})
