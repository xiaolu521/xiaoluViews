<template>
    <a-switch :checked="dataValue=='是'" valuePropName='checked'  checkedChildren="是" unCheckedChildren="否" @change="onChange" v-bind="$attrs"/>
</template>

<script>
    export default {
        name: "xlSwitch",
        data () {
            let dateStr = this.value;
            return {
                decorator:"",
                dataValue:dateStr?'是':'否'
            }
        },
        props: {
            value: {
                type:String
            }
        },
        created(){
            this.$emit('change', this.value)
        },
        methods: {
            onChange (checked) {
                this.$emit('change', checked?'是':'否')
            }
        },
        watch: {
            value (val) {
                if(!val){
                    this.dataValue = null
                }else{
                    this.dataValue = val
                }
            }
        },
        //2.2新增 在组件内定义 指定父组件调用时候的传值属性和事件类型 这个牛逼
        model: {
            prop: 'value',
            event: 'change'
        }
    }
</script>

<style scoped>

</style>
