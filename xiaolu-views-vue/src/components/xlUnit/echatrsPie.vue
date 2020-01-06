<template>
    <echatrs class="echatrs" id="" :option=""></echatrs>
</template>

<script>
    import echatrs from '@/components/echatrs/index'

    export default {
        name: "echatrsPie",
        data() {
            return {}
        },
        props: {
            id: {
                type: String,
                value: '1'
            },
            option:{
                type: Object
            }
        },
        components: {
            echatrs
        }
    }
</script>

<style scoped>

</style>
