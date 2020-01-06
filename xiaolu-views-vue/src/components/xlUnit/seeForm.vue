<template>
    <a-drawer
            title="查看"
            :visible="visible"
            :width="width || '50%'"
            :confirmLoading="confirmLoading"
            @close="handleCancel"
    >
        <div class="xlSeeFrom">
            <a-row>
                <a-col :span="24" :gutter="12" v-for="(item,index) in formData" :key="index">
                    <div class="xlSeeFrom-item">
                        <div class="xlSeeFrom-label">
                            {{item.title}}:
                        </div>
                        <div class="xlSeeFrom-view">
                            {{model[item.dataIndex]}}
                        </div>
                    </div>
                </a-col>
            </a-row>
            <slot v-bind="{model}"></slot>
            <div class="drawer-footer">
                <a-button @click="handleOk" type="primary">
                    关闭
                </a-button>
            </div>
        </div>
    </a-drawer>
</template>

<script>
    import xlDate from '@/components/xlUnit/xlDate'
    import xlSwitch from '@/components/xlUnit/xlSwitch'
    import xlImage from '@/components/xlUnit/xlImage'

    export default {
        name: "xlSeeFrom",
        data() {
            return {
                visible: false,
                type: 1,
                formData: [],
                model: {},
                confirmLoading: false,
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 9}
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 13},
                },
                tableTitle: '查看'
            }
        },
        components: {
            xlDate,
            xlSwitch,
            xlImage
        },
        props:{
            width:{
                type:String
            }
        },
        created() {

        },
        methods: {
            handleOk() {
                this.confirmLoading = false
                this.visible = false
            },
            formatFormData(columns) {
                this.formData = []
                columns.map((item, index) => {
                    if (item.key != "rowIndex" && item.dataIndex != "action") {
                        this.formData.push(item)
                    }
                })
                console.log(this.formData, 789)
            },
            formatForm(form) {
                console.log(form,987)

                delete form.createDateTime
                delete form.modifyDateTime
                delete form.modifyBy
                delete form.createBy
                //整理字段数据 ／ 赋值 清空等
                this.model = Object.assign({}, form)
            },
            handleCancel() {
                //关闭窗口
                this.visible = false
            }
        }
    }
</script>

<style lang="less">
    .ant-drawer-body {
        width: 100%;
        height: calc(100% - 55px);

        .xlSeeFrom {
            width: 100%;
            height: 100%;

            .ant-row{
                width: 100%;
                height: calc(100% - 50px);
                overflow-y: scroll;
                padding: 10px;
                .xlSeeFrom-item{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 5px;
                    margin: 5px 0;
                    .xlSeeFrom-view{
                        max-width: calc(100% - 200px);
                        text-align: right;
                    }
                }
            }

            .drawer-footer {
                width: 100%;
                height: 50px;
                border-top: 1px solid #e8e8e8;
                border-radius: 0 0 4px 4px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }
    }
</style>
