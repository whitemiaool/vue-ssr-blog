
<template>
    <div>
        <div >
            <Blog :plist="list"></Blog>
        </div>
        <Loading :show="show"> </Loading>
    </div>
</template>

<script>
import * as API from '../../api/index.js'
import Blog from "../blog/index.vue";
import Loading from "../../components/loading/index.vue";
export default {
    name:'tp',
    data() {
        return {
            name:['富强','民主','文明','和谐','自由','平等','公正','法治','爱国','敬业','诚信','友善'],
            color1:'#fff',
            list:this.$store.state.tplist,
            show:false
        }
    },
    // asyncData ({ store, route: { query: { id }}}) {
    //     return store.dispatch('FETCH_TOPIC_BLOGS',{id});
    // },
    methods:{
        getPath() {
            this.show = true
            API.getpact({id:this.$route.query.id}).then((res)=>{
                this.show = false
                if(res.data.code > 10) {
                    this.list = res.data.data.map((item,i)=>{
                        item.showC    = false
                        item.addo     = false
                        item.cmt      = '条评论'
                        item.showFix  = false
                        item.showCon  = false
                        item.topic    = item.topic.name
                        item.paperindex = '/index/paper/'+item.paperindex
                        return item
                    })
                }
            })
        }
    },
    watch: {
        '$route':'getPath'
    },
    created() {
        this.getPath()
    },
    components:{
        Blog,
        Loading
    }
}
</script>

<style scoped>
</style>
