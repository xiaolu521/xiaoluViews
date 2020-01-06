<template>
    <div>
        <a-input v-if="item.type=='input'" :placeholder="'请输入'+item.title"  v-model="queryParam[item.dataIndex]"/>
        <a-input v-if="item.type=='input.number'" type="Number" :placeholder="'请输入'+item.title" v-model="queryParam[item.dataIndex]"/>
        <a-select
                v-if="item.type=='select'"
                v-model="queryParam[item.dataIndex]"
                :placeholder="'请输入'+item.title"
                showSearch
                allowClear
        >
            <a-select-option :value="item2.dataValue" :key="index2" v-for="(item2,index2) in (typeof item.typeData == 'string'?$store.getters.dictionary[item.typeData]:item.typeData)">
                {{item2.dataName}}
            </a-select-option>
        </a-select>
        <xlDate v-if="item.type=='date'"  :placeholder="item.title" :dataType="item.typeData || 'date'" v-model="queryParam[item.dataIndex]"></xlDate>
        <xlSwitch v-if="item.type=='switch'"  v-model="queryParam[item.dataIndex]"/>
        <div class="xl-dateRange" v-if="item.type=='dateRange'">
            <xlDate class="xl-dateRange-start" :dataType="item.typeData.type || 'date'" placeholder="开始日期" v-model="queryParam[item.typeData.startDate]"></xlDate><xlDate class="xl-dateRange-end" :dataType="item.typeData.type || 'date'" placeholder="结束日期" v-model="queryParam[item.typeData.endDate]"></xlDate>
        </div>
        <a-radio-group v-if="item.type=='radio'" v-model="queryParam[item.dataIndex]">
            <a-radio value="a" :value="item2.dataValue" :key="index2" v-for="(item2,index2) in (typeof item.typeData == 'string'?$store.getters.dictionary[item.typeData]:item.typeData)">
                {{item2.dataName}}
            </a-radio>
        </a-radio-group>
    </div>
</template>

<script>
    import xlDate from '@/components/xlUnit/xlDateModel'
    import xlSwitch from '@/components/xlUnit/xlSwitchModel'
    import xlImage from '@/components/xlUnit/xlImage'
    export default {
        name: "xlFormUnit",
        data(){
            return{

            }
        },
        components:{
            xlDate,
            xlSwitch,
            xlImage
        },
        props:{
            item:{
                type:Object,
                value:{}
            },
            queryParam:{
                type:Object
            }
        }
    }
</script>

<style scoped>

</style>
