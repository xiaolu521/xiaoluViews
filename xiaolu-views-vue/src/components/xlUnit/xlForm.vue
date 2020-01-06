<template>
    <a-modal
            :title="tableTitle"
            :visible="visible"
            :width="'80%'"
            @ok="handleOk"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
    >
        <a-form :form="form">
            <a-row>
                <a-col :span="8" :gutter="8" v-for="(item,index) in formData" :key="index">
                    <a-form-item
                            :labelCol="labelCol"
                            :wrapperCol="wrapperCol"
                            :label="item.title">
                        <a-input v-if="item.type=='input'" :placeholder="'请输入'+item.title"
                                 v-decorator="[item.dataIndex,{rules: [{required: getRequird(item.required),message: '请输入'+item.title}]}]"/>
                        <a-input-password v-if="item.type=='input.password'" :placeholder="'请输入'+item.title"
                                 v-decorator="[item.dataIndex, {rules: [{required: getRequird(item.required),message: '请输入'+item.title}]}]"/>
                        <a-input-number v-if="item.type=='input.number'" :placeholder="'请输入'+item.title"
                                        v-decorator="[item.dataIndex, {rules: [{required: getRequird(item.required),message: '请输入'+item.title}]}]"/>
                        <a-select
                                v-if="item.type=='select'"
                                v-decorator="[item.dataIndex,{rules: [{required: getRequird(item.required),message: '请输入'+item.title}]}]"
                                :placeholder="'请输入'+item.title"
                                showSearch
                                allowClear
                        >
                            <a-select-option :value="item2.dataValue" :key="index2" v-for="(item2,index2) in (typeof item.typeData == 'string'?$store.getters.dictionary[item.typeData]:item.typeData)">
                                {{item2.dataName}}
                            </a-select-option>
                        </a-select>
                        <xlDate v-if="item.type=='date'"  :placeholder="item.title" :dataType="item.typeData || 'date'" v-decorator="[item.dataIndex,{rules: [{required: true,message: '请输入'+item.title}]}]"></xlDate>
                        <xlSwitch v-if="item.type=='switch'"  v-decorator="[item.dataIndex,{rules:[{ required: true}],initialValue:'否'}]"/>
                        <div class="xl-dateRange" v-if="item.type=='dateRange'">
                            <xlDate class="xl-dateRange-start" :dataType="item.typeData.type || 'date'" placeholder="开始日期" v-decorator="[item.typeData.startDate,{rules: [{required: getRequird(item.required),message: '请输入开始日期'}]}]"></xlDate><xlDate class="xl-dateRange-end" :dataType="item.typeData.type || 'date'" placeholder="结束日期" v-decorator="[item.typeData.endDate,{rules: [{required: getRequird(item.required),message: '结束日期'}]}]"></xlDate>
                        </div>
                        <xlImage
                                v-if="item.type=='upload'"
                                v-decorator="[item.dataIndex,{rules: [{required: getRequird(item.required),message: '请输入'+item.title}]}]"
                                :headers="{token:$store.getters.token}"
                                name="file"
                                :action="$mainUrl+'/upload/image/upload'"
                                accept=".jpg, .jpeg, .png"
                        >
                        </xlImage>
                        <a-radio-group v-if="item.type=='radio'" v-decorator="[item.dataIndex,{rules: [{required: getRequird(item.required),message: '请输入'+item.title}]}]">
                            <a-radio value="a" :value="item2.dataValue" :key="index2" v-for="(item2,index2) in (typeof item.typeData == 'string'?$store.getters.dictionary[item.typeData]:item.typeData)">
                               {{item2.dataName}}
                            </a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>

<script>
    import xlDate from '@/components/xlUnit/xlDate'
    import xlSwitch from '@/components/xlUnit/xlSwitch'
    import xlImage from '@/components/xlUnit/xlImage'
    export default {
        name: "xlFrom",
        data() {
            return {
                visible: false,
                type: 1,
                formData:[],
                model: {},
                confirmLoading: false,
                form: this.$form.createForm(this, {name: 'coordinated'}),
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 9}
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 13},
                },
                tableTitle: '新增'
            }
        },
        components:{
            xlDate,
            xlSwitch,
            xlImage
        },
        created() {

        },
        methods: {
            handleOk() {
                //提交数据
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.confirmLoading = true
                        if (this.type == 1) {
                            this.$emit('handleOk', values)
                        }
                        if(this.type == 2){
                            this.$emit('handleOk', {...this.model, ...values})
                        }
                        if(this.type == 3){
                            this.confirmLoading = false
                            this.visible = false
                        }
                    }
                })
            },
            formatFormData(columns){
                this.formData=[]
                columns.map((item,index)=>{
                    if(item.key != "rowIndex" && item.dataIndex != "action" && item.type){
                        this.formData.push(item)
                    }
                })
                console.log(this.formData,789)
            },
            formatForm(form) {
                console.log(form)
                delete form.createDateTime
                delete form.modifyDateTime
                delete form.modifyBy
                delete form.createBy
                //整理字段数据 ／ 赋值 清空等
                this.model = Object.assign({}, form)
                this.$nextTick(() => {
                    let oldModel = []
                    for (let item in this.form.getFieldsValue()) {
                        oldModel.push(item)
                    }
                    this.form.setFieldsValue(this.setFields(this.model, oldModel))
                })
            },
            handleCancel() {
                //关闭窗口
                this.visible = false
            },
            setFields(model, fields) {
                //赋值默认字段
                console.log(model,123)
                let data = {}
                fields.map(item => {
                    data[item] = model[item]
                })
                return data
            },
            getRequird(value){
                if(value == undefined){
                    return true
                }else{
                    return value
                }
            }
        }
    }
</script>

<style lang="less">
    .xl-dateRange{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .xl-dateRange-start{
            .ant-input{
                border-right: none;
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }
        }
        .xl-dateRange-end{
            .ant-input{
                border-left: none;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
            }
        }
    }
</style>
