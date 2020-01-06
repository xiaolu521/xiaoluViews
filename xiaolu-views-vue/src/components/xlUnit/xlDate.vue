<template>
  <div>
    <a-date-picker mode="year" v-if="dataType=='year'" @panelChange="changeYear"  format="YYYY" :value="renderDateString"  @change="onChange" v-bind="$attrs"></a-date-picker>
    <a-month-picker v-if="dataType=='month'"  format="YYYY-MM" :value="renderDateString" @change="onChange" v-bind="$attrs"></a-month-picker>
    <a-date-picker v-if="dataType=='date'"  format="YYYY-MM-DD" :value="renderDateString" @change="onChange" v-bind="$attrs"></a-date-picker>
    <a-date-picker v-if="dataType=='dateTime'"  showTime format="YYYY-MM-DD HH:mm:ss" :value="renderDateString" @change="onChange" v-bind="$attrs"></a-date-picker>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    name: 'xlData',
    props: {
      value: String,
      dataType:{
        type:String,
        value:'date'
      }
    },
    methods: {
      onChange (date, dateString) {
        console.log(date,dateString)
        this.$emit('change', dateString)
      },
      changeYear(date){
        let dateEmit = date ? moment(date).format('YYYY') : null
        this.$emit('change', dateEmit)
      }
    },
    computed: {
      renderDateString () {
        return this.value ? moment(this.value,'YYYY-MM-DD HH:mm:ss') : this.init
      }
    }
  }
</script>
<style scoped lang="less">
    .ant-calendar-picker{
        width: 100%;
    }
</style>
