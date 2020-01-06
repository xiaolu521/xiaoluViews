<template>
    <a-switch :checked="render" valuePropName='checked'  checkedChildren="是" unCheckedChildren="否" @change="onChange" v-bind="$attrs"/>
</template>

<script>
    export default {
        name: "xlSwitch",
        data(){
            return{

            }
        },
        props: {
            value: {
                type:String,
                value:'否'
            }
        },
        methods: {
            onChange (checked) {
                this.$emit('change', checked?'是':'否')
            }
        },
        computed: {
            render() {
                if(typeof this.value == 'string'){
                    this.onChange(this.value=='否'? false : true)
                    return this.value=='否'? false : true
                }else{
                    this.onChange(this.value ? true : false)
                    return this.value ? true : false
                }
            }
        }
    }
</script>

<style scoped>

</style>
