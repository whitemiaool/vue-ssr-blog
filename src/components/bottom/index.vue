<template>
        <div class="banner">

    
        </div>
</template>

<script>

export default {
    name: 'banner',
    data () {
        return {
            tipfuc:false,
            show:false,
            nav:this.$store.state.nav,
            nav1:[{title:'Git',url:'//github.com/whitemiaool'},{title:'否记',url:'//dyxuan.top'},{title:'差记',url:'//dyxuan.top'}]
        }
    },

    props:{
        swih:{
            default:false
        }
    },
    methods:{
        infuc(){
            this.tipfuc = !this.tipfuc
        },
        change() {
            this.$refs.input.blur();
            this.show = !this.show;
        },
        closeM(m) {
            // console.log(m)
            this.show = false;
        }
    },
}
</script>

<style scoped>

</style>
