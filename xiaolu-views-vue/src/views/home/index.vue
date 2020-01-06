<template>
    <div class="home">
        <a-row :gutter="16">
            <a-col :md="24">
                <a-card title="系统访问量">
                    <highCharts id="visitOption" :option="visitOption"></highCharts>
                </a-card>
            </a-col>
            <a-col :md="12">
                <a-card title="会员人数">
                    <highCharts id="vipOption" :option="vipOption"></highCharts>
                </a-card>
            </a-col>
            <a-col :md="12">
                <a-card title="男女占比">
                    <highCharts id="sexOption" :option="sexOption"></highCharts>
                </a-card>
            </a-col>
            <a-col :md="24">
                <a-card title="会员城市分布">
                    <!--<highCharts id="countryOption" :option="countryOption"></highCharts>-->
                    <echatrs id="countryOption" :option="countryOption"></echatrs>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    import highCharts from '@/components/highcharts/index'
    import echatrs from '@/components/echatrs/index'
    export default {
        name: "index",
        data(){
            return{
                visitOption:{},
                vipOption:{},
                sexOption:{},
                countryOption:{}
            }
        },
        created(){
            this.visitOption =  {
                chart: {
                    type: 'line',
                    backgroundColor: 'rgba(255,255,255,0)',
                    options3d: {
                        enabled: true,
                        alpha: 12,
                        beta: 0,
                        viewDistance: 25,
                        depth: 100
                    }
                },
                title: {
                    text: null
                },
                legend: {
                    enabled: false,
                    backgroundColor: '#000',
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    valueSuffix: '人'
                },
                xAxis: {
                    categories: ['2019','2018','2017','2016'],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '人数 (人)'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}人'
                        }
                    }
                },
                series: [{
                    name: '访问次数',
                    color:'#009D4E',
                    data: [
                        652,135,157,168
                    ]
                },{
                    name: 'ip',
                    color:'#009D4E',
                    data: [
                        654,258,423,951
                    ]
                }]
            }
            this.vipOption =  {
                chart: {
                    type: 'line',
                    backgroundColor: 'rgba(255,255,255,0)',
                    options3d: {
                        enabled: true,
                        alpha: 12,
                        beta: 0,
                        viewDistance: 25,
                        depth: 100
                    }
                },
                title: {
                    text: null
                },
                legend: {
                    enabled: false,
                    backgroundColor: '#000',
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    valueSuffix: '人'
                },
                xAxis: {
                    categories: ['2019','2018','2017','2016'],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '人数 (人)'
                    }
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}人'
                        }
                    }
                },
                series: [{
                    name: '访问次数',
                    color:'#009D4E',
                    data: [
                        123,456,789,1011
                    ]
                }]
            }
            this.sexOption = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    backgroundColor: 'rgba(255,255,255,0)',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: null
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 35,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}：{point.y}(人)'
                        }
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <br>占比{point.percentage:.1f}%</br> <br>人数：{point.y}(人)</br>'
                },
                series: [{
                    colors: ['#71f6f9', '#a5d2ff', '#8eff8e', '#ffdb5c', '#ffae8b', '#3cb2ef', '#9084ef', '#cf82a9'],
                    name: 'Brands',
                    colorByPoint: true,
                    data: [
                        {
                            name:'男',y:1024
                        },
                        {
                            name:'女',y:512
                        }
                    ]
                }]
            }
            this.countryOption = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }]
            }
        },
        components:{
            highCharts,
            echatrs
        }
    }
</script>

<style scoped lang="less">

</style>
