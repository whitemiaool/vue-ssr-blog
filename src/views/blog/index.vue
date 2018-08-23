
<template>
    <div>
        <div class="b-o" v-for="(item,i) in blogs">
            <div class="b-f">来自话题：<span>{{item.topic}}</span><span style="margin-left:25px">作者：dyxuan</span></div>
            <!-- <div class="b-t">{{item.title}}</div> -->
            <a class="b-t" :href='item.paperindex' target="_blank">{{item.title}}</a>
            <div v-if="item.showCon" class="b-xx">作者及其女友觉得很赞</div>
            <div @click="showcontent(i)" v-if="!item.showCon" style="margin-top: -10px;">
                <div class="b-i-w" v-if="item.img&&item.img[0]">
                    <img :src="item.img" alt="">
                </div>
                <div class="b-b-w">
                    <div class="b-b-c">{{item.brief}}<span class="b-c-m">阅读全文</span></div>
                </div>
                <div style="clear:both"></div>
            </div>
            <div v-if="item.showCon">
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
                    <!-- <span> 
                        <span>{{item.star}}</span>
                    </span> -->
                    <div class="b-c-c-w">
                        <span @click="showcomment(i,item)" class="b-c-c com">
                            <i class="icon iconfont icon-icon_comment"></i>
                            {{!item.showC?(item.commentL||0):''}}{{item.cmt}}
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
            <div class="b-cm-w" v-if="item.showC">
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
                    <textarea :style="{'height':fs?'90px':''}"  v-model="comm" placeholder="请写下你的评价" name="" class="byx" cols="10" rows="5"></textarea>
                    <button @click="sendc(item,i)" class="b-cm-p">评价</button>
                    <input @blur="nxf(false)" @focus="nxf(true)" v-model="name" placeholder="大名" class="b-cm-f-n" type="text">
                </div>
            </div>
        </div>
        <div v-if="lazy||(blogs&&!blogs[0])" class="b-o">
            <div v-if="!nomore" class="loading">
                <div class="demo-spin-container">
                    <Spin fix></Spin>
                </div>
                <div class="demo-spin-container">
                    <Spin fix></Spin>
                </div>
                <div class="demo-spin-container">
                    <Spin fix></Spin>
                </div>
            </div>
            <div v-if="nomore" style="text-align: center;">
                <Icon type="social-octocat" style="font-size: 25px;color: #005cff;"></Icon>
                <div>没有更多数据了...</div>
            </div>
        </div>
        <!-- <div  v-if="blogs&&!blogs[0]">
            <div class="no-da">
                <Icon type="ios-refresh-outline"></Icon>
                <div>暂无数据</div>
            </div>
        </div> -->
    </div>
</template>

<script>
import * as API from '../../api'
import './index.css'
import './md.css'
export default {
    name:'blog',
    data() {
        return {
            blogs:this.$store.state.blogs,
            color1:'#fff',
            cmt:'条评论',
            allone:[],
            count:0,
            top:0,
            blogindex:0,
            comm:'',
            cp:0,
            lcp:0,
            fs:false,
            lazy:false,
            name:'',
            page:1,
            loadres:'loading',
            nomore:false
        }
    },
    props:{
        plist:{
            default:undefined
        }
    },
    title() {
        return '一个根本记不住的网站'
    },
    asyncData ({store}) {
        return store.dispatch('FETCH_BLOGS',{page:1,index:1});
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
            // this.axios.post(API.starcomment,{id:a._id,cid:b._id}).then((res)=>{
            //     if(res.data.code >10) {
            //         this.$Message.success('你为网友点了赞');
            //         this.blogs[c].comments[d].star = this.blogs[c].comments[d].star+1
            //     } else {
            //         this.$Message.error('服务器出错了');
            //     }
            // })
        },
        setP(item,index) {
            API.getpapercom({id:item._id,page:this.cp}).then((res)=>{
                this.blogs[index].comments = res.data.data
            })
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
            // !!this.comm.trim()&&this.axios.post(API.commentpaper,{id:item._id,comm:this.comm,name:this.name}).then((res)=>{
            //     if(res.data.code > 10) {
            //          this.comm = ''
            //          this.$Message.success('评论提交了');
            //          let cm = this.blogs[i].comments || []
            //          cm.push(res.data.data);
            //          this.blogs[i].comments = cm
            //          this.blogs[i].commentL = this.blogs[i].commentL + 1;
            //     } else {
            //         this.$Message.error('life is shit');
            //     }
            // })
        },
        clickstar(item,i) {
            API.clickstar({data:item._id,star:item.star}).then((res)=>{
                this.$Message.success('点赞成功! BUG --');
                this.blogs[i].star = this.blogs[i].star+1
            })
        },
        showcomment(index,item){
            this.blogs[index].showC = !this.blogs[index].showC
            if(this.blogs[index].showC){
                API.getpapercom({id:item._id,page:1}).then((res)=>{
                    this.blogs[index].comments = res.data.data
                })
                this.blogs[index].cmt = '收起评论'
            }
            else {
                this.blogs[index].cmt = '条评论'
            }
        },
        showcontent(index) {
            this.blogs[index].showCon = !this.blogs[index].showCon;
            this.blogs[index].showFix = false;
        },
        ishowfix(arr) {
            let blog = this.blogs;
            let showlist = [];
            let st = document.documentElement.scrollTop;
            let ch = document.documentElement.clientHeight||window.innerHeight
            for(let i=0;i<blog.length;i++) {
                if(blog[i].showCon) {
                    let ct = this.offset(arr[i]).top
                    let c1t = i-1>=0?this.offset(arr[i-1]).top:0
                    if(!blog[i].showFix&&(ct>(st+ch))) {
                        if(i-1>=0) {
                            if(c1t<st) {
                                this.top = ct
                                return i
                            }
                        }else {
                            this.top = ct
                            return i
                        }
                    } else if(blog[i].showFix){
                        if(i-1>=0) {
                            if((c1t<st+ch)&&(c1t>st)) {
                                return undefined
                            }
                        }
                        if(this.top >( st+ch)) {
                            return i
                        }
                    }
                }
            }
            return undefined
        },
        offset(ele) {
            var rect, win,
                elem = ele;

            if ( !elem ) {
                return;
            }
            if ( !elem.getClientRects().length ) {
                return { top: 0, left: 0 };
            }

            // Get document-relative position by adding viewport scroll to viewport-relative gBCR
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;

            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            };
        },
        wheel() {
            this.count++;
            this.lazyload();
            if(this.count > 5) {
                this.count = 0;
                let arr = document.querySelectorAll('.b-c');
                this.allone = arr;
                let index = this.ishowfix(this.allone);
                    for(let i=0;i<this.blogs.length;i++) {
                        if(i === index) {
                            this.blogs[index].showFix = true;
                            continue
                        } else {
                            this.blogs[i].showFix = false;
                        }
                    }
                // }
            }
        },
        lazyload() {
            if(this.plist) {
                return
            }
            if(this.lazy) {
                return
            }
            try{
                var body = document.querySelector('.b-w').querySelector('div');
            } catch(e) {
                return;
            }
            let ch = document.documentElement.clientHeight||window.innerHeight;
            let sr = body.ownerDocument.defaultView.pageYOffset;
            if((this.offset(body).top+body.scrollHeight- sr - ch) < 300) {
                this.lazy = true;
                API.getallpaper({page:this.page+1}).then((res)=>{
                    if(res.data.code >10) {
                        if(res.data.data.length === 0 ) {
                            this.loadres = '已加载完毕';
                            this.nomore = true;
                            return
                        }
                        this.page = this.page + 1;
                        let rs = res.data.data.map((item,i)=>{
                            item.showC    = false
                            item.addo     = false
                            item.cmt      = '条评论'
                            item.showFix  = false
                            item.showCon  = false
                            item.topic    = item.topic.name
                            item.paperindex = '/index/paper/'+item.paperindex
                            return item
                        })
                        this.blogs = this.blogs.concat(rs);
                    }
                    this.lazy = false;
                    // console.log(res)
                })
                // return this.$store.dispatch('FETCH_BLOGS',{page:2});
            }
        },
        addones(index) {
            this.$Message.success('续命成功，+1s');
            this.blogs[index].addo = true;
            setTimeout(()=>{
                this.blogs[index].addo = false;
            },400)
        }
    },
    beforeMount() {
        // console.log('list',this.plist);
        // this.blogs = this.plist;
        // !this.plist&&API.getallpaper().then((res)=>{
        //     this.blogs = res.data.data.map((item,i)=>{
        //         item.showC    = false
        //         item.addo     = false
        //         item.cmt      = '条评论'
        //         item.showFix  = false
        //         item.showCon  = false
        //         item.topic    = item.topic.name
        //         item.paperindex = '/index/paper/'+item.paperindex
        //         return item
        //     })
        // })
    },
    watch:{
        plist(o,n) {
            this.blogs = o;
            this.top = 0;
            this.nomore = this.blogs.length === 0
        }
    },
    mounted() {
        console.log('mout')
        document.removeEventListener('wheel',this.wheel)
        setTimeout(()=>{
            document.addEventListener('scroll',this.wheel)
    
        },500)
    },
    beforeDestroy() {
        console.log('unmout')
    document.removeEventListener('wheel',this.wheel)
  }
}
</script>

<style scoped>
    .demo-spin-container{
    	display: inline-block;
        width: 50px;
        height: 50px;
        position: relative;
    }
.loading {
    display: flex;
    justify-content: space-around;
}

.loading .ivu-spin-dot {
    height: 30px;
    width: 30px;
}
</style>
