<template>
    <a-upload-dragger
            @change="onChange"
            v-bind="$attrs"
            :showUploadList="false"
            :value="renderImageString"
    >
        <p class="ant-upload-drag-icon" style="width: 180px">
            点击上传
        </p>
        <div  v-if="value" class="xlImage-img" style="position: absolute;left: 0;top: 0;width: 180px;height:40px;text-align: center;">
            <img height="36px" :src="value" alt="">
        </div>
    </a-upload-dragger>
</template>

<script>
    export default {
        name: 'xlData',
        props: {
            value: String,
            dataType:{
                type:String,
                value:'date'
            }
        },
        methods: {
            onChange (info) {
                // let dateEmit = date ? moment(date).format(this.format) : null
                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} 文件上传成功`);
                    this.$emit('change', info.file.response.result)
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} 上传失败`);
                }
            }
        },
        computed: {
            renderImageString () {
                return this.value
            }
        }
    }
</script>

<style scoped>
    .ant-upload{
        padding: 0 !important;
    }
</style>
