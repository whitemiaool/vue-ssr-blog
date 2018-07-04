
<template>
    <div class="r-b">
        <div class="r-b-w-2">
            <div class="r-b-t">
                <div style="text-align: center;width: 100px;height:100%;display: table;">
                    <span style="display: table-cell;vertical-align: middle;">
                        <img alt="" src="../../assets/ava.jpg" style="display: inline-block;">
                        </span>
                </div>
                <div class="r-b-w">
                    <div class="r-b-n">dyxuan</div>
                    <div class="r-b-y">lif is shit,taste well</div>
                    <a class="u-email" href="mailto:dyx_uestc@163.com">dyx_uestc@163.com</a>
                </div>
            </div>
            <div  class="r-b-c-1">
                 <router-link :to="item.url" class="r-o" :key="i" v-for="(item,i) in ts">
                    <div>
                        <span>
                            <Icon type="ios-medical-outline"></Icon>
                        </span>
                        <span class="r-o-n">
                            {{item.name}}
                        </span>
                    </div>
                 </router-link>
            </div>
            <div class="r-b-c-2">
                <div>
                    <a href="javascript:void(0)" >若有雷同</a>
                    <a href="javascript:void(0)">算我抄袭 请勿举报</a>
                </div>
                <div>  
                    <a href="//www.mps.gov.cn/" target="_blank">违法和不良信息举报：110</a>                
                </div>
                <div>
                    <a href="//www.gov.cn/" target="_blank">儿童色情信息举报专区</a>
                    
                </div>
                <div>
                    <a href="//jd.com" target="_blank"> 联系我们 © 2018 记乎</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as API from '../../api/index.js'
export default {
    name:'git',
    data() {
        return {
            gits:[],
            ts:[]
        }
    },
    beforeMount(){
            API.getopic().then((res)=>{
                if(res.data.code > 10) {
                    // console.log(res)
                    let data = res.data.data.map((item,i)=>{
                        item.url = `/index/topic/${item.name}?id=${item._id}`
                        // ?id=${item._id}
                        return item
                    })
                    this.ts = data
                }
                this.$bar.finish()
            })
    }
}
</script>

<style scoped>
.r-o-n {
    margin-left: 10px;
}
.r-o:hover {
    background: #ececec;
}
.r-o {
    /* margin:10px 0px; */
    display: block;
    height: 40px;
    line-height: 40px;
    padding: 0px 20px;
    cursor: pointer;
    font-size: 14px;
    color: #8590a6;
    transition: background 0.5s;
}
.r-b-w-2 {
    position: fixed;
}
.r-b-c-1 {
    /* height: 300px; */
    background: #fff;
    padding: 8px 0px;
}
.r-b-c-2 {
    width: 300px;
    flex: 1;
    font-size: 14px;
    overflow: hidden;
    /* top: 590px; */
    padding: 8px;
    /* background: #fff; */
}

.r-b-c-2 > div {
    margin: 5px;
}
.r-b-w {
    padding: 10px 5px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
}
.u-email {
    font-size: 13px;
}
.r-b-y {
    color: #666;
    font-size: 13px;
}
.r-b-n {
    font-size: 18px;
    font-weight: 600;
}
.r-b-t {
    height: 100px;
    width: 300px;
    background: #fff;
    margin-bottom: 10px;
    display: flex;
}
</style>
