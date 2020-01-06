import service from '../../assets/service/require'
import Form from '../xlUnit/xlForm'
import seeForm from '../xlUnit/seeForm'
import xlTable from '../xlUnit/xlTable'
import xlEditTable from '../xlUnit/xlEditTable'
import tableUpload from '@/components/xlUnit/tableUpload'
import xlSearch from '../xlUnit/xlSearch'
import axios from 'axios'
import {getToken} from "../../assets/service/auth";
export default {
    name: "automation",
    data() {
        return {
            queryParam: {},
            loading: true,
            data: [],
            pagination: {
                current: 1,
                pageSize: 10,
                pageSizeOptions: ['10', '20', '30'],
                showQuickJumper: true,
                showSizeChanger: true,
                total: 0
            },
            selectedRowKeys:[],
            selectionRows:[]
        }
    },
    components:{
        xlTable,
        Form,
        tableUpload,
        xlSearch,
        xlEditTable,
        seeForm
    },
    created() {
        this.pageOnload()
        if(this.columns){
            this.columns.map(item=>{
                if (!item.scopedSlots && item.key != 'rowIndex' && !item.editHide) {
                    item.scopedSlots = {customRender: 'tooltip'}
                }
                if(this.columns.length>7)
                    if(!item.width){
                        item.width = '200px'
                    }
            })
        }
    },
    methods: {
        editTable(id) {
            //修改表格方法-点击修改 开启表单组件框 并检索 提交的数据
            this.setTableEditOff(true, id)
        },
        saveTable(record) {
            //修改表格方法 提交修改的表格数据
            service({
                url: this.url.edit,
                method: 'POST',
                data: {
                    ...record,
                    ...this.paramMore || {}
                }
            })
                .then(result => {
                    this.setTableEditOff(false, record.id)
                    this.pageOnload()
                })
        },
        cancelTable(id) {
            //修改表格组件的 关闭按钮
            this.setTableEditOff(false, id)
        },
        setTableEditOff(off, id) {
            //修改表格组件的 开关启动按钮
            const newData = Object.assign([], this.data);
            const target = newData.filter(item => id === item.id)[0];
            if (target) {
                target.editable = off;
                this.data = newData;
            }
        },
        onSelectChange(selectedRowKeys, selectionRows){
            //多选框方法
            this.selectedRowKeys = selectedRowKeys;
            this.selectionRows = selectionRows;
        },
        handleTableChange(pagination, filters, sorter) {
            //页码方法
            this.loading = true
            this.pagination.current = pagination.current
            this.pagination.pageSize = pagination.pageSize
            this.pageOnload()
            //翻页
        },
        pageOnload() {
            //加载数据
            return service({
                url: this.url.list,
                method: 'POST',
                data: {
                    pagingParam:{
                        pageSize:this.pagination.pageSize,
                        pageNumber:this.pagination.current
                    },
                    ...this.queryParam,
                    ...this.paramMore || {} //引入页面的 额外参数
                }
                //过滤条件
            })
                .then(result => {

                    this.data = result.data
                    this.pagination.total = result.data.total || 0
                    this.loading = false
                    return result
                })
        },
        searchFrom(queryParam) {
            //搜索组件触发方法
            if(queryParam){
                this.queryParam = queryParam
            }
            this.pagination.current = 1
            this.pageOnload()
        },
        searchReset(){
            //搜索组件 重置方法
            this.queryParam = {}
        },
        addForm() {
            //添加方法
            this.$refs.form.tableTitle = '新增'
            this.$refs.form.formatFormData(this.columns)
            this.$refs.form.visible = true
            this.$refs.form.confirmLoading = false
            this.$refs.form.type = 1
            this.$refs.form.formatForm({})
            //赋值空数据
        },
        upload() {
            //导入
            this.$refs.upload.action = this.$mainUrl + this.url.importExcelUrl
            this.$refs.upload.visible = true
        },
        downLoad() {
            // 导出
            axios({
                url: this.$mainUrl + this.url.exportXlsUrl,
                method: 'GET',
                headers: {
                    token: getToken()
                },
                responseType: 'blob'
            })
                .then(result => {
                    let url = window.URL.createObjectURL(new Blob([result.data]))
                    let link = document.createElement('a')
                    link.style.display = 'none'
                    link.href = url
                    if (result.headers['content-disposition']) {
                        link.setAttribute('download', result.headers['content-disposition'].split(';')[1].split('=')[1])
                    } else {
                        this.$message.error('下载失败，请联系管理员')
                        return
                    }

                    document.body.appendChild(link)
                    link.click()
                })
        },
        seeForm(data){
            // 查看方法触发
            this.$refs.seeForm.formatFormData(this.columns)
            this.$refs.seeForm.visible = true
            this.$refs.seeForm.formatForm(data)
        },
        editForm(data) {
            //修改方法
            this.$refs.form.tableTitle = '修改'
            this.$refs.form.formatFormData(this.columns)
            this.$refs.form.visible = true
            this.$refs.form.confirmLoading = false
            this.$refs.form.formatForm(data)
            this.$refs.form.type = 2
            //赋值表单数据
        },
        delForm(id){
            //删除方法
            service({
                url: this.url.delete,
                method: 'POST',
                data: {id:id}
            })
                .then(result => {
                    this.pageOnload()
                })
        },
        onClearSelected(){
            // 清楚表格多选框
            this.selectedRowKeys = []
        },
        onDelSelected(){
          console.log(this.selectionRows)
            let delData = this.selectionRows.map(item=>{
                return item.id
            })
            service({
                url: this.url.deleteBatch,
                method: 'POST',
                data: {
                    param:delData

                }
            })
                .then(result => {
                    this.pageOnload()
                })
        },
        handleOk(form) {
            //提交方法 1 提交属性 2 修改属性
            if(this.formatFormData){
                this.formatFormData(form)
            }
            if (this.$refs.form.type == 1) {
                service({
                    url: this.url.add,
                    method: 'POST',
                    data: {
                        ...form,
                        ...this.paramMore || {}

                    }
                })
                    .then(result => {
                        this.$refs.form.confirmLoading = false
                        this.$refs.form.visible = false
                        this.pageOnload()
                    })
            } else {
                service({
                    url: this.url.edit,
                    method: 'POST',
                    data: {
                        ...form,
                        ...this.paramMore || {}
                    }
                })
                    .then(result => {
                        this.$refs.form.confirmLoading = false
                        this.$refs.form.visible = false
                        this.pageOnload()
                    })
            }
        }
    }
}
