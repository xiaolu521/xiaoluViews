<template>
    <div class="xl-form">
        <div class="xl-form-head">
            <xlSearch @searchFrom="searchFrom" @searchReset="searchReset" :queryData="columns"></xlSearch>
        </div>
        <div class="xl-form-table">
            <div class="xl-form-table-unti">
                <a-button type="primary" icon="plus" @click="addForm">新增</a-button>
                <a-button type="primary" icon="import" @click="upload">导入</a-button>
                <a-button type="primary" icon="download" @click="downLoad">导出</a-button>
            </div>
            <div class="ant-alert ant-alert-info" style="margin: 16px 0;">
                <i class="anticon anticon-info-circle ant-alert-icon"></i>已选择&nbsp;<a style="font-weight: 600">{{selectedRowKeys.length}}</a>项&nbsp;&nbsp;&nbsp;&nbsp;<span style="margin-left: 24px">共</span>&nbsp;<a style="font-weight: 600">{{pagination.total}}</a>条数据&nbsp;&nbsp;
                <a style="margin-left: 24px" @click="onClearSelected" v-if="selectedRowKeys.length">清空</a>&nbsp;&nbsp;<a style="margin-left: 24px" @click="onDelSelected" v-if="selectedRowKeys.length">删除</a>
            </div>
            <div class="xl-form-table-view">
                <xlTable
                        :columns="columns"
                        :dataSource="data"
                        rowKey="id"
                        :pagination="pagination"
                        :loading="loading"
                        @change="handleTableChange"
                        :scroll="{ x: 1200}"
                        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}">
                    >
                    <template v-slot:action="scope">
                        <a @click="editForm(scope.record)">编辑</a>
                        <a-divider type="vertical"/>
                        <a-dropdown>
                            <a class="ant-dropdown-link">更多 <a-icon type="down"/></a>
                            <a-menu slot="overlay">
                                <a-menu-item @click="seeForm(scope.record)">
                                    <a>查看</a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a-popconfirm title="确定删除吗?" @confirm="() => delForm(scope.record.id)">
                                        <a>删除</a>
                                    </a-popconfirm>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </template>
                </xlTable>
            </div>
        </div>
        <Form @handleOk="handleOk" ref="form"></Form>
        <seeForm ref="seeForm"></seeForm>
        <tableUpload @handleOk="pageOnload" ref="upload"></tableUpload>
    </div>
</template>

<script>
    import xlMixinAutomation from '../../components/xlMixin/automation'

    export default {
        name: "index",
        mixins: [xlMixinAutomation],
        data() {
            return {
                columns: [
                    {
                        title: '编号',
                        key: 'rowIndex',
                        width:'50',
                        align: "center",
                        customRender: function (t, r, index) {
                            return parseInt(index) + 1;
                        }
                    },
                    {
                        title: '用户名',
                        align: "center",
                        dataIndex: 'nickName',
                        type:'input'
                    },
                    {
                        title: '用户账号',
                        align: "center",
                        dataIndex: 'userName',
                        type:'input'
                    },
                    {
                        title: '用户密码',
                        align: "center",
                        dataIndex: 'password',
                        type:'input'
                    },
                    {
                        title: '操作',
                        dataIndex: 'action',
                        align: "center",
                        fixed: 'right',
                        width: '110px',
                        scopedSlots: {customRender: 'action'},
                    }
                ],
                // 请求参数
                url: {
                    list: "/user/list",
                    add: '/user/add',
                    edit: '/user/edit',
                    delete: "/user/del",
                    deleteBatch: "deleteBatch",
                    exportXlsUrl: "exportXlsUrl",
                    importExcelUrl: "importExcelUrl"
                }
            }
        },
        created() {

        },
        methods: {}

    }
</script>

<style lang="less">

</style>
