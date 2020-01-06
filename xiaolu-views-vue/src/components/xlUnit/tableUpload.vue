<template>
    <a-modal
            title="上传"
            :visible="visible"
            @ok="handleOk"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
    >
        <a-upload
                name="file"
                :action="action"
                :data="param"
                :headers="{token:token}"
                @change="handleChange"
                accept=".xls,.xlsx"
        >
            <a-button> <a-icon type="upload" />点击上传</a-button>
        </a-upload>
    </a-modal>
</template>

<script>
    import {getToken} from "../../assets/service/auth";

    export default {
        name: "tableUpload",
        data(){
            return{
                visible: false,
                confirmLoading: false,
                action:'',
                token:getToken()
            }
        },
        props:{
            param:{
                type:Object,
                value:{}
            }
        },
        methods:{
            handleOk(){

            },
            handleCancel(){
                this.visible = false
            },
            handleChange(info){
                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} 文件上传成功`);
                    this.$emit('handleOk')
                    this.visible = false
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} 上传失败`);
                }
            }
        }
    }
</script>

<style scoped>

</style>
