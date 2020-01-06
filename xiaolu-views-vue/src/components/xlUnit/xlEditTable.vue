<template>
    <a-table
            v-bind="$attrs"
            @change="onChange"
            class="xlEditTable"
    >
        <span slot="tooltip" slot-scope="text, record,index,option">
            <xlFormUnit v-if="record.editable" :item="option" :queryParam="record"></xlFormUnit>
            <span style="display: inline !important;overflow: unset !important;" v-else>{{text}}</span>
        </span>
        <span slot="action" slot-scope="text, record ,index">
            <a @click="editTable(record.id)" v-if="!record.editable">编辑</a>
            <a-divider type="vertical" v-if="!record.editable"/>
            <slot v-if="!record.editable" name="action" v-bind="{text,record,index}"></slot>

            <a @click="saveTable(record)"  v-if="record.editable">保存</a>
            <a-divider type="vertical" v-if="record.editable"/>
            <a @click="cancelTable(record.id)"  v-if="record.editable">取消</a>
        </span>
    </a-table>
</template>

<script>
    import xlFormUnit from './xlFormUnit'
    export default {
        name: "xlEditTable",
        data() {
            return {
                slotsName:[],
                defaultImg: 'this.src="' + require('../../assets/images/defavatar.jpg') + '"'
            }
        },
        components:{
            xlFormUnit
        },
        created(){
            console.log(this.$attrs.columns,753)
            let columns = Object.assign([], this.$attrs.columns )
            let columnsData = []
            columns.map((item,index)=>{
                if(!item.tableHide){
                    columnsData.push(item)
                }
            })
            this.$attrs.columns = columnsData
        },
        methods: {
            onChange(pagination, filters, sorter) {
                this.$emit('change', pagination, filters, sorter)
            },
            editTable(id){
                console.log(1)
                this.$emit('editTable',id)
            },
            saveTable(record){
                this.$emit('saveTable',record)
            },
            cancelTable(id){
                this.$emit('cancelTable',id)
            },
            getOption(option){
                console.log(option)
            }
        },
        watch:{
            '$attrs.columns'(){
                let columns = Object.assign([], this.$attrs.columns )
                let columnsData = []
                columns.map((item,index)=>{
                    if(!item.tableHide){
                        columnsData.push(item)
                    }
                })
                this.$attrs.columns = columnsData
            }
        }
    }
</script>

<style lang="less">
    .xlEditTable{
        .ant-table td { white-space: nowrap; }
        .ant-table-thead th{
            div{
                min-width: 150px !important;
            }
        }
    }
</style>
