<template>
    <div>
        <el-table
            :data = "tasks"
            style = "width: 50%"
            :row-class-name = "rowStatus">
            <el-table-column
                prop = "todo"
                align = "center">
            </el-table-column>
            <el-table-column
                prop = "status"
                align = "center"
                :filters = "[{text: 'incomplete', value: 'active'}, {text: 'complete', value: 'completed'}]"
                :filter-method = "filterActive"
                width="150">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button icon = "el-icon-edit" @click = "getEditInfo(scope.$index)" circle></el-button>
                            <el-button icon = "el-icon-check" @click = "updateRowStatus(scope.$index)" circle></el-button>
                            <el-button icon = "el-icon-delete" @click = "remove(scope.$index)" circle></el-button>
                        </el-button-group>
                    </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default
{
    props: {
        tasks: {
            type: Array,
            default: function () {
                return [
                    {todo: 'active task', status: 'active'},
                    {todo: 'completed task', status: 'completed'}
                ];
            }
        }
    },
    methods: {
        filterActive(value, row, column){
            const property = column['property'];
            return row[property] === value;
        },
        rowStatus({row, rowIndex}){
            if(row.status === 'active'){
                return '';
            }
            else{
                return 'success-row';
            }
        },
        updateRowStatus(clickedRowIndex){
            this.$emit('updateRowStatus', clickedRowIndex);
        },
        getEditInfo(clickedRowIndex){
            this.$prompt('','',{
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
            }).then(result =>  {
                this.edit(clickedRowIndex, result.value);
            })
        },
        edit(clickedRowIndex, value) {
            var updateObject = {clickedRowIndex, value};
            this.$emit('edit', updateObject);
        },
        remove(clickedRowIndex){
            this.$emit('remove', clickedRowIndex);
        }
    }
}
</script>

<style>
.el-table .success-row{
    text-decoration: line-through;
}
</style>
