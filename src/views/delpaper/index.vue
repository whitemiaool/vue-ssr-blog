<template>
    <div>
        <div class="ad-w">
            <div class="pd-o" v-for="(item,i) in paperlist">
                <div v-if="!item.show">
                    <h3 class="pd-t">{{item.title}} </h3>
                    <div class="pd-b">{{item.brief}}</div>
                    <span class="pd-d" @click="delone(item._id)"><Icon type="close-round"></Icon></span>
                </div>
                <span @click="edit(item,i)" class="ed-xx">编辑</span>
                <div v-if="item.show">
                    <add :data="dt"></add>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as API from '../../api/index.js'
import model from '../../components/modal/modal.vue'
import add from '../addpaper/index.vue'
export default {
    name:'delpaper',
    data() {
        return {
            dt:{},
            paperlist:[],
        }
    },
    props:{
        clk:Boolean
    },
    watch:{
        clk:function(n,o) {
            this.getalltopic()
        }
    },
    methods:{
        delone(id) {
            this.axios.post(API.delonepaper,{data:id}).then((res)=>{
                this.getalltopic();
            })
        },
        getalltopic() {
            API.getallpaper().then((res)=>{
                let data = res.data.data.map((item)=>{
                    item.show = false;
                    return item 
                })
                this.paperlist = data;                
            })
        },
        edit(item,index) {
            this.paperlist[index].show = !this.paperlist[index].show ;
            this.dt.content = item.content;
            this.dt.topic = item.topic._id;
            this.dt.tl = item.title;
            this.dt.id = item._id;
            this.dt.tp = item.topic.name;
        }
    },
    mounted() {
        this.getalltopic();
    },
    components:{
        model,
        add
    }
}
</script>

<style scoped>
.ed-xx {
    color: #ccc;
    font-size: 12px;
    position: absolute;
    top: 0px;
    cursor: pointer;
}
.pd-d {
    position: absolute;
    right: 10px;
    top: 0px;
    color: red;
    cursor: pointer;
}
.pd-t {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pd-b {
    font-size: 14px;
    color: #ccc;
    overflow: hidden;
    max-height: 42px;
    text-overflow: ellipsis;
    /* white-space: nowrap; */
}
.pd-o {
    margin: 10px 5px;
    width: 80%;
    min-width: 700px;
    box-shadow: 3px 3px 9px rgba(0,0,0,.15);
    padding: 10px 5px;
    position: relative;
}
.ad-w {
    width: 100%;
    background: #fff;
    text-align: left;;
    padding: 20px 20px;
}
</style>
