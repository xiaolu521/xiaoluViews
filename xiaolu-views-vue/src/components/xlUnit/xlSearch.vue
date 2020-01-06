<template>
    <a-form layout="inline" class="xl-search-view">
        <a-row :gutter="10">
            <div v-if="searchList.length">
                <a-col :md="6"  v-for="(item,index) in searchList" :key="index">
                    <a-form-item :label="item.title">
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
                            <a-radio :value="item2.dataValue" :key="index2" v-for="(item2,index2) in (typeof item.typeData == 'string'?$store.getters.dictionary[item.typeData]:item.typeData)">
                                {{item2.dataName}}
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
            </div>
            <a-col :md="6" v-else>
                <a-form-item label="关键字">
                    <a-input  placeholder="关键字搜索"  v-model="queryParam.keyword"/>
                </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8" class="xlSearch-unti">
                <a-form-item style="margin-left: 100px;">
                          <span>
                              <a-button type="primary" @click="searchFrom" icon="search">查询</a-button>
                              <a-button type="primary" @click="searchReset" icon="reload"
                                        style="margin-left: 8px">重置</a-button>
                              <a-button type="primary" icon="plus"
                                        style="margin-left: 8px" @click="visible=true">添加</a-button>
                          </span>
                </a-form-item>
            </a-col>
        </a-row>
        <a-modal
                title="选择搜索组件"
                :visible="visible"
                @ok="handleOk"
                @cancel="handleCancel"
        >
            <a-checkbox-group
                    v-model="checkboxData"
                    class="xlSearch-group"
            >
                <a-row v-if="queryModel.length">
                    <a-col :span="8" v-for="(item,index) in queryModel" :key="index"><a-checkbox :value="index">{{item.title}}</a-checkbox></a-col>
                </a-row>
            </a-checkbox-group>
        </a-modal>
    </a-form>
</template>

<script>
    import xlDate from '@/components/xlUnit/xlDateModel'
    import xlSwitch from '@/components/xlUnit/xlSwitch'
    import xlImage from '@/components/xlUnit/xlImage'
    export default {
        name: "xlSearch",
        data(){
            return{
                searchList:[],
                queryParam:{},
                visible:false,
                queryModel:[],
                checkboxData:[]
            }
        },
        components:{
            xlDate,
            xlSwitch
        },
        props:{
            queryData:{
                type:Array,
                value:[]
            }
        },
        created(){
            this.queryModel = Object.assign([],this.queryData)
            this.queryModel.pop()
            this.queryModel.splice(0,1)
            this.queryModel.map((item,index)=>{
                if(item.searchOff){
                    this.searchList.push(item)
                    this.checkboxData.push(index)
                }
            })
        },
        methods:{
            searchFrom(){
                console.log(1)
                this.$emit('searchFrom',this.queryParam)
            },
            searchReset(){
                this.queryParam = {}
            },
            handleOk(){
                console.log(this.checkboxData)
                this.searchList = []
                this.checkboxData.map(item=>{
                    this.searchList.push(this.queryModel[item])
                })
                this.visible = false
            },
            handleCancel(){
                this.visible=false
            }
        },
        watch:{
            queryData(){
                this.searchList = []
                this.checkboxData = []
                this.queryModel = Object.assign([],this.queryData)
                this.queryModel.pop()
                this.queryModel.splice(0,1)
                this.queryModel.map((item,index)=>{
                    if(item.searchOff){
                        this.searchList.push(item)
                        this.checkboxData.push(index)
                    }
                })
            }
        }
    }
</script>

<style lang="less">
    .xl-search-view{
        .ant-form-item-label{
            width: 100px !important;
        }
        .xlSearch-unti{
            .ant-form-item-control-wrapper{
                width: 100% !important;
            }
        }
        .xlSearch-group{
            width: 100%;
        }
    }
</style>
