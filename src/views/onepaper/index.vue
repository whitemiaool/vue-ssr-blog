<template>
    <div>
        <div class="b-w">
            <div class="p-w" >
            <div style="margin-right: 10px;width: 694px;padding-bottom: 20px;">
                <div class="b-o" v-for="(item,i) in blogs">
                    <div class="b-f">来自话题：<span>{{item.topic}}</span></div>
                    <a class="b-t" :href='item.paperindex'>{{item.title}}</a>
                    <div class="b-xx">作者及其女友觉得很赞</div>
                    <div >
                        <div v-html="item.content" class="b-all markdown-body">
                        </div>
                        <div class="edit-at">记于 {{new Date(item.meta.createAt).toLocaleDateString()}}</div>
                    </div>
                    <div class="b-c-w">
                        <div class="b-c" :class="{'isfix':item.showFix}" :data-index="i" >
                            <button @click.stop="clickstar(item,i)" aria-label="赞同" type="button" class="Button VoteButton VoteButton--up">
                            <i class="icon iconfont icon-dianzan"></i>
                            {{item.star||0}}
                            </button>
                            <div class="b-c-c-w">
                                <span  class="b-c-c com">
                                    <i class="icon iconfont icon-icon_comment"></i>
                                    {{item.commentL||0}}条评论
                                </span>
                                <span class="b-c-c fasong">
                                    <i class="icon iconfont icon-fasong"></i>
                                    分享
                                </span>
                                <span @click="addones(i)" class="b-c-c xin">
                                    <i class="icon iconfont icon-xin"></i>
                                    +1
                                    <span :class="{'lsact':item.addo}" class="ls">+1s</span>
                                </span>
                                <span @click="showcontent(i)" v-if="item.showCon" class="b-c-c shouqi">
                                    <i style="font-size: 18px;font-weight: 700;" class="icon iconfont icon-jiantouxiangshang"></i>
                                    收起
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="b-cm-w">
                        <div class="b-cm-top">{{item.commentL}}条评论</div>
                        <div class="b-cm-o"  v-for="(cm,n) in item.comments">
                            <div class="b-cm-t">
                                <span><i class=" b-cm-i icon iconfont icon-icon_comment"></i><span>{{cm.name}}</span></span>
                                <span style="color:#ccc">{{getDateDiff(cm.date)}}</span>
                                
                            </div>
                            <span class="b-cm-c">{{cm.content}}</span>
                            <span @click="starcm(item,cm,i,n)" class="cm-s">
                                <i class="icon iconfont icon-dianzan"></i>
                                <span>{{cm.star||0}}</span>
                            </span>
                        </div>
                        <div @click.stop="setP(item,i)" class="b-cm-pa">
                             <Page  @on-change="changepage" :total="(parseInt(item.commentL/10)+1)*10" size="small"></Page>
                        </div>
                        <div class="b-cm-f">
                            <textarea :style="{'height':fs?'90px':''}" v-model="comm" placeholder="如果你又什么想说的" name="" id="" cols="10" rows="5"></textarea>
                            <button @click="sendc(item,i)" class="b-cm-p">评价</button>
                            <input @blur="nxf(false)" @focus="nxf(true)" v-model="name" placeholder="大名" class="b-cm-f-n" type="text">
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <right></right>
        </div>
    </div>
</template>

<script>
import * as API from '../../api'
import right from '../../components/rightbar/index.vue'
export default {
    name:'onepaper',
    data() {
        return {
            gits:[],
            blogs:this.$store.state.oneblog,
            color1:'#fff',
            cmt:'条评论',
            allone:[],
            count:0,
            top:0,
            blogindex:0,
            comm:'',
            cp:0,
            lcp:0,
            name:'',
            fs:false
        }
    },
    methods:{
        nxf(f) {
            this.fs = f
        },
        starcm(a,b,c,d) {
            API.starcomment({id:a._id,cid:b._id}).then((res)=>{
                if(res.data.code >10) {
                    this.$Message.success('你为网友点了赞');
                    this.blogs[c].comments[d].star = this.blogs[c].comments[d].star+1
                } else {
                    this.$Message.error('服务器出错了');
                }
            })
        },
        setP(item,index) {
            API.getpapercom({id:item._id,page:this.cp}).then((res)=>{
                this.blogs[index].comments = res.data.data
            })
            // this.lcp = this.cp;
        },
        changepage(i) {
            // console.log(i);
            // this.shc = !(this.cp == i)
            this.cp = i;
        },
        getDateDiff(dateTimeStamp){
            let result = '';
            var minute = 1000 * 60;
            var hour = minute * 60;
            var day = hour * 24;
            var halfamonth = day * 15;
            var month = day * 30;
            var now = new Date().getTime();
            var diffValue = now - new Date(dateTimeStamp).getTime();
            if(diffValue < 0){return;}
            var monthC =diffValue/month;
            var weekC =diffValue/(7*day);
            var dayC =diffValue/day;
            var hourC =diffValue/hour;
            var minC =diffValue/minute;
            if(monthC>=1){
                result="" + parseInt(monthC) + "月前";
            }
            else if(weekC>=1){
                result="" + parseInt(weekC) + "周前";
            }
            else if(dayC>=1){
                result=""+ parseInt(dayC) +"天前";
            }
            else if(hourC>=1){
                result=""+ parseInt(hourC) +"小时前";
            }
            else if(minC>=1){
                result=""+ parseInt(minC) +"分钟前";
            }else
            result="刚刚";
            return result;
        },
        sendc(item,i) {
            !!this.comm.trim()&&API.commentpaper({id:item._id,comm:this.comm,name:this.name}).then((res)=>{
                if(res.data.code > 10) {
                     this.comm = ''
                     this.$Message.success('评论提交了');
                     let cm = this.blogs[i].comments || []
                     cm.push(res.data.data);
                     this.blogs[i].comments = cm
                     this.blogs[i].commentL = this.blogs[i].commentL + 1;
                } else {
                    this.$Message.error('life is shit');
                }
            })
        },
        clickstar(item,i) {
            API.clickstar({data:item._id,star:item.star}).then((res)=>{
                this.$Message.success('点赞成功! BUG --');
                this.blogs[i].star = this.blogs[i].star+1
            })
        },
        addones(index) {
            this.$Message.success('续命成功，+1s');
            this.blogs[index].addo = true;
            setTimeout(()=>{
                this.blogs[index].addo = false;
            },400)
        }
    },
    asyncData ({ store, route: { params: { id }}}) {
        // console.log('id',id)
        return store.dispatch('FETCH_ONE_BLOGS',{id});
    },
    mounted(){
        console.log('blogs',this.blogs)
    },
    // beforeCreate() {
    //     this.axios.post(API.getonepaper,{index:this.$route.params.id}).then((res)=>{
    //         // console.log(res)
    //         let item        = res.data.data;
    //         item.showC      = false
    //         item.addo       = false
    //         item.cmt        = '条评论'
    //         item.showFix    = false
    //         item.showCon    = false
    //         item.topic      = item.topic.name
    //         item.paperindex = '/index/paper/'+item.paperindex
    //         this.blogs = [item]

    //         this.axios.post(API.getpapercom,{id:item._id,page:1}).then((res)=>{
    //             this.blogs[0].comments = res.data.data
    //         })
    //     })
    // },
    components:{
        right
    }
}
</script>

<style scoped>
.p-w {
    margin-right: 10px;
    width: 694px;
    height: 100px;
    padding-bottom: 20px;
}
</style>
