
<template>
    <div>
        <div class="x-w" >
            <div class="x-w-w">
                <div :style="{color:color1}" class="x-o" v-for="(item,i) in name" :key=i>
                    <span>{{item}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as API from '../../api/index.js'
export default {
    name:'xjp',
    data() {
        return {
            name:['富强','民主','文明','和谐','自由','平等','公正','法治','爱国','敬业','诚信','友善'],
            color1:'#fff'
        }
    },
    mounted() {
        // this.axios.get(API.getrepo).then((res)=>{
        //     if(res.data.code > 10) {
        //         this.gits = res.data.data.sort((a,b)=>{
        //             return b.stargazers_count - a.stargazers_count
        //         });
        //     }
        // });
        setInterval(()=>{
            let index = (Math.random()*10).toFixed(0);
            let arr = ['red','blue','#2be009','#91e71c','#14d7d6','#0973df','#5009df','#a909df','#df099e','#df0963']
            this.color1 = arr[index]
        },200)
    }
}
</script>

<style  scoped>
.x-w {
    width: 80%;
    margin: 0px auto;
}
.x-w-w {
    display: flex;
    flex-wrap: wrap;
    margin-top: 100px
    }
.x-o {
    width: 25%;
    margin:20px 0px;
    text-align: center;
    font-size: 24px;
    transition: all 0.2s;
}
</style>
