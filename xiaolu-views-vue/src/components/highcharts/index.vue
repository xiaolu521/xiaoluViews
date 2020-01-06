<template>
    <div class="x-bar">
        <div class="container" :id="id" :option="option"></div>
    </div>
</template>

<script>
    import HighCharts from 'highcharts'
    import HighchartsMore from 'highcharts/highcharts-more';
    import HighchartsDrilldown from 'highcharts/modules/drilldown';
    import Highcharts3D from 'highcharts/highcharts-3d';

    export default {
        // 验证类型
        data(){
            return{

            }
        },
        props: {
            id: {
                type: String
            },
            option: {
                type: Object
            }
        },
        watch: {
            option() {
                HighCharts.chart(this.id, this.option);
            }
        },
        mounted() {
            setTimeout(()=>{
                HighchartsMore(HighCharts)
                HighchartsDrilldown(HighCharts)
                Highcharts3D(HighCharts)
                HighCharts.chart(this.id, this.option)
                HighCharts.setOptions({
                    colors: ['#97f4f9', '#a5d2ff', '#8eff8e', '#ffdb5c', '#ffae8b', '#3cb2ef', '#9084ef', '#cf82a9',
                        '#FFF263', '#6AF9C4']
                });
            })
        }
    }
</script>

<style scoped>
    .container {
        height: 100%;
        width: 100%;
        margin: 0 auto;
    }

    /* Link the series colors to axis colors */
    .highcharts-color-0 {
        fill: #7cb5ec;
        stroke: #7cb5ec;
    }

    .highcharts-axis.highcharts-color-0 .highcharts-axis-line {
        stroke: #7cb5ec;
    }

    .highcharts-axis.highcharts-color-0 text {
        fill: #7cb5ec;
    }

    .highcharts-color-1 {
        fill: #90ed7d;
        stroke: #90ed7d;
    }

    .highcharts-axis.highcharts-color-1 .highcharts-axis-line {
        stroke: #90ed7d;
    }

    .highcharts-axis.highcharts-color-1 text {
        fill: #90ed7d;
    }

    .highcharts-yaxis .highcharts-axis-line {
        stroke-width: 2px;
    }
</style>
