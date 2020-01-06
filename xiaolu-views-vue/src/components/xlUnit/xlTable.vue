<template>
    <a-table
            v-bind="$attrs"
            @change="onChange"
            class="xl-table"
    >
        <template slot="tooltip" slot-scope="text, record, index,option">
            <a-tooltip placement="top">
                <template  slot="title">
                    <span v-if="option.type == 'select'">
                        {{typeof option.typeData == 'string'?getSelectData($store.getters.dictionary[option.typeData],text):getSelectData(option.typeData,text)}}
                    </span>
                        <span v-else-if="option.type == 'date'">
                        {{getData(text)}}
                    </span>
                        <span v-else-if="option.type == 'switch'">
                        {{text?text=='是'?'是':'否':'否'}}
                    </span>
                        <span v-else-if="option.type == 'dateRange'">
                        {{getData(record[option.typeData.startDate])+ '~' + getData(record[option.typeData.endDate])}}
                    </span>
                        <span v-else>
                        {{ text?text:'--'}}
                    </span>
                </template>
                <span v-if="option.type == 'select'">
                    {{typeof option.typeData == 'string'?getSelectData($store.getters.dictionary[option.typeData],text):getSelectData(option.typeData,text)}}
                </span>
                <span v-else-if="option.type == 'date'">
                    {{getData(text)}}
                </span>
                <span v-else-if="option.type == 'switch'">
                    {{text?text=='是'?'是':'否':'否'}}
                </span>
                <span v-else-if="option.type == 'dateRange'">
                    {{getData(record[option.typeData.startDate])+ '~' + getData(record[option.typeData.endDate])}}
                </span>
                <span v-else>
                    {{ text?text:'--' | ellipsis(25) }}
                </span>
            </a-tooltip>
        </template>
        <template slot="imgSlot" slot-scope="text">
            <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
            <img v-else :src="text" height="25px" :onerror="defaultImg" style="max-width:80px;"/>
        </template>
        <template v-for="(slotItem) of slotsName" :slot="slotItem" slot-scope="text, record, index">
            <slot :name="slotItem" v-bind="{text,record,index}"></slot>
        </template>
    </a-table>
</template>

<script>
    export default {
        name: "xlTable",
        data() {
            return {
                slotsName:[],
                defaultImg: 'this.src="' + require('../../assets/images/defavatar.jpg') + '"'
            }
        },
        created(){
            let columns = Object.assign([], this.$attrs.columns )
            let columnsData = []
            columns.map((item,index)=>{
                if(!item.tableHide){
                    columnsData.push(item)
                    if(item.scopedSlots && item.scopedSlots.customRender){
                        if(item.scopedSlots.customRender != 'tooltip'){
                            this.slotsName.push(item.scopedSlots.customRender)
                        }
                    }
                }
            })
            this.$attrs.columns = columnsData
        },
        methods: {
            onChange(pagination, filters, sorter) {
                this.$emit('change', pagination, filters, sorter)
            },
            getSelectData(data,text){
                if(data){
                    const target = data.filter(item => text == item.dataValue).length?data.filter(item => text == item.dataValue)[0].dataValue:text;
                    return target
                }else{
                    return text
                }
            },
            getData(date){
                if(date){
                    return date.split('T')[0]
                }else{
                    return '--'
                }
            }
        },
        filters:{
            ellipsis(value, vlength = 25){
                if(!value){
                    return "";
                }
                if (value.length > vlength) {
                    return value.slice(0, vlength) + '...'
                }
                return value
            }
        },
        watch:{
            '$attrs.columns'(){
                let columns = Object.assign([], this.$attrs.columns )
                let columnsData = []
                columns.map((item,index)=>{
                    if(!item.tableHide){
                        columnsData.push(item)
                        if(item.scopedSlots && item.scopedSlots.customRender){
                            if(item.scopedSlots.customRender != 'tooltip'){
                                this.slotsName.push(item.scopedSlots.customRender)
                            }
                        }
                    }
                })
                this.$attrs.columns = columnsData
            }
        }
    }
</script>

<style lang="less">

</style>
