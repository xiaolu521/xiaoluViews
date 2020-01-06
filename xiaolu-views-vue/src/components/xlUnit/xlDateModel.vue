<template>
    <div>
        <a-date-picker mode="year" v-if="dataType=='year'" :value="dataValue" @panelChange="changeYear"  format="YYYY"  @change="onChange" v-bind="$attrs"></a-date-picker>
        <a-month-picker v-if="dataType=='month'" :value="dataValue"  format="YYYY-MM" @change="onChange" v-bind="$attrs"></a-month-picker>
        <a-date-picker v-if="dataType=='date'" :value="dataValue"  format="YYYY-MM-DD" v-bind="$attrs"  @change="onChange"></a-date-picker>
        <a-date-picker v-if="dataType=='dateTime'"  showTime :value="dataValue" format="YYYY-MM-DD HH:mm:ss" @change="onChange" v-bind="$attrs"></a-date-picker>
    </div>
</template>
<script>
    import moment from 'moment'
    export default {
        name: 'xlData',
        data () {
            let dateStr = this.value;
            return {
                decorator:"",
                dataValue:!dateStr?null:moment(dateStr,'YYYY-MM-DD HH:mm:ss')
            }
        },
        props: {
            value: String,
            dataType:{
                type:String,
                value:'date'
            }
        },
        watch: {
            value (val) {
                if(!val){
                    this.dataValue = null
                }else{
                    this.dataValue = moment(val,this.dateFormat)
                }
            }
        },
        methods: {
            moment,
            onChange(mom,dateStr){
                this.$emit('change', dateStr);
            },
            changeYear(date){
                let dateEmit = date ? moment(date).format('YYYY') : null
                this.$emit('change', dateEmit)
            }
        },
        //2.2新增 在组件内定义 指定父组件调用时候的传值属性和事件类型 这个牛逼
        model: {
            prop: 'value',
            event: 'change'
        }
    }
</script>
<style scoped lang="less">
    .ant-calendar-picker{
        width: 100%;
    }
</style>
