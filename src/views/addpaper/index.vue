<template>
    <div>
        <div class="ad-w">
            <div class="ad-o">
                <Input v-model="tl" placeholder="输入一个标题" ></Input>
            </div>
            <div class="ad-o">
                <textarea style="height:inherit"  v-model="content"  placeholder="请写下你的内容" name="" id="" cols="40" rows="20"></textarea>
            </div>
            <div class="ad-o">
                <label for="">话题:</label>
                <Select v-model="model1" :placeholder="tp" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value"><span class="ad-la">  {{ item.label }} <i @click.stop="delonetopic(item.value)" class="cl"><Icon type="close-circled"></Icon></i> </span></Option>
                </Select>
                <button @click="addTopic" class="b-cm-p">+添加</button>
            </div>
            <div class="ad-o ad-c">
                <button @click="save" class="b-cm-p">发送</button>
            </div>
        </div>
        <model :show="show" slot="s1" :confirm="cf" :close="closeM" title="新增标签">
            <div>
                <label for="">标签</label>
                <Input v-model="value" placeholder="Enter something..." style="width:400px"></Input>
             </div>
        </model>
    </div>
</template>

<script>
import * as API from '../../api/index.js'
import model from '../../components/modal/modal.vue'
export default {
    name:'addpaper',
    data() {
        return {
            gits:[],
            content:'',
            show:false,
            value:'',
            tl:'',
            cityList: [],
            model1: '',
            id:'',
            tp:''
        }
    },
    props:{
        data:{
            default:()=>{return {}}
            }
    },
    methods:{
        cf() {
            this.show = false;
            if(this.value.trim()) {
                API.addtopic({content:this.value}).then((res)=>{
                    this.getalltopic();
                })
            }
            this.value = '';
        },
        delonetopic(id) {
            API.deltopic({data:id}).then((res)=>{
                this.getalltopic();
            })
        },
        addTopic() {
            this.show = true
        },
        closeM() {
            this.show = false
        },
        change() {
            // console.log(this.content)
        },
        save() {
            console.log(this.model1)
            if(this.data.id) {
                API.updatepaper({id:this.data.id,content:this.content,topic:this.model1,tl:this.tl}).then((res)=>{
                    this.$Message.success('文章更新成功');
                })
            } else {
                API.addpaper({content:this.content,topic:this.model1,tl:this.tl}).then((res)=>{
                    this.content = '';
                    this.tl = '';
                    this.$Message.success('添加文章成功');
                })
            }
        },
        getalltopic() {
            API.getopic().then((res)=>{
                let list = [];
                res.data.data.map((item,i)=>{
                    let one = {};
                    one.value = item._id;
                    one.label = item.name;
                    list.push(one);
                })
                this.cityList = list;
            })
        }
    },
    mounted() {
        this.content = this.data.content;
        this.model1 = this.data.topic;
        this.tl = this.data.tl;
        this.id = this.data.id;
        this.tp = this.data.tp;
        this.getalltopic();
    },
    components:{
        model
    }
}
</script>

<style scoped>
/* .ad-t,.ad-c {
    text-align: left;
} */
.cl {
    position: absolute;
    right: 0px;
    color: red;
}
.ad-la {
    display: inline-block;
    width: 100%;
    height: 100%;
    position: relative;
}
.ad-o {
    margin: 20px;
    display: block;
}
.ad-w {
    width: 100%;
    background: #fff;
    text-align: left;
}
.ad-w textarea {
    resize: none;
    width: 100%;
    margin: 0 auto;
}
.git-w {
    width: 70%;
    margin: 0px auto;
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
}
.g-o-w {
    width: 120px;
    /* height: 80px; */
    margin: 4px;
    box-sizing: border-box;
    box-shadow: 3px 3px 9px rgba(0,0,0,.15);
    overflow: hidden;
    padding: 4px 4px;
    transition: background 0.5s;
}
.g-o-w:hover {
    background: #e88b8b;
}
.g-o-w:hover span.g-o-i {
    color: #fff;
}
.g-o-i {
    display: inline-block;
    /* width: 100%; */
    overflow: hidden;
    text-overflow: ellipsis;
}

.lin {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;    
}
.name {
    color: #1765b7 !important;
    width: 100%;
    margin-bottom: 0px;
    white-space: nowrap;
    font-size: 14px;
}
span.star {
    overflow: hidden;
    vertical-align: bottom;
}
span.g-o-i {
    color: #ccc;
}
.lan {
    margin-left: 7px;
    vertical-align: bottom;
}
</style>
