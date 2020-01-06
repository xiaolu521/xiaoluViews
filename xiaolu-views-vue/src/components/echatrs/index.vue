<template>
    <div class="echarts" :id="id" v-if="option">

    </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: "index",
        data(){
            return{

            }
        },
        props:{
            id: {
                type: String
            },
            option: {
                type: Object
            }
        },
        mounted() {
            setTimeout(()=>{
                let myChart = echarts.init(document.getElementById(this.id));
                let option = this.option
                myChart.setOption(option);
                window.addEventListener('resize',function() {myChart.resize()});
            })
        }
    }
</script>

<style scoped>
    .echarts {
        width: 100%;
        min-height: 300px;
        margin: 0 auto;
    }
</style>
