<template>
        <div class="banner">
            <!-- <div><a class="banner-title" href="">记乎</a></div> -->
            <transition name="ban-b">
                <div v-if="swih">
                    <div class="banner-inner">
                        <a class="banner-title" href="">记乎</a>
                        <a class="banner-mp" v-for="item in nav1" target="_blank" :key=item.title :href="item.url">
                            {{item.title}}
                        </a>
                        <!-- <div class="banner-in-w" :style="tipfuc?'':'background:#f3f3f3'">
                            <input ref="input" @focus.stop="infuc()" @input="change" @blur.stop="infuc" class="banner-in" :placeholder="tipfuc?'':'请输不要不要输入!'"  type="text">
                        </div> -->
                    </div>
                </div>
            </transition> 
            <transition name="ban-fa">
                <div v-if="!swih">
                    <div class="banner-inner">
                        <router-link class="banner-title" to="/">记乎</router-link>
                        <router-link class="banner-mp" v-for="item in nav" :key=item.title :to="item.url">
                            {{item.title}}
                        </router-link>
                        <!-- <div class="banner-in-w" :style="tipfuc?'':'background:#f3f3f3'">
                            <input ref="input" @focus.stop="infuc()" @input="change" @blur.stop="infuc" class="banner-in" :placeholder="tipfuc?'':'请输不要不要输入!'"  type="text">
                        </div> -->
                    </div>
                </div>
            </transition>
            <div class="banner-ava">
                <img class="Avatar AppHeader-profileAvatar" width="30" height="30" src="../../assets/ava.jpg">
            </div>
            <!-- <model :show="show" slot="s1" :close="closeM" title="泰拳警告!!!">
                <div>傻逼了吧，非要点点点...</div>
            </model> -->
    
        </div>
</template>

<script>
// import model from '../modal/modal.vue'
// import * as API from '../../api/index.js'
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
    // beforeMount() {
    //     API.getbar().then((res)=>{
    //         // console.log('res',res)
    //         let data = res.data;
    //         if(data.code > 10) {
    //             this.nav = res.data.data
    //         }
    //     })
    // },
    // components:{
    //     model
    // }
}
</script>

<style scoped>
.ban-fa-enter-active {
    transition: all .8s;
}
.ban-fa-leave-active {
    transform: translateY(-100%)
}
.ban-fa-b-leave-active {
    transform: translateY(100%)
}
.ban-fa-enter, .ban-fa-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateY(-100%)
}
.ban-b-enter-active, .ban-fa-b-leave-active {
    transition: all 0.8s;
}
.ban-b-enter-to {
    transform: translateY(0%)
}
.ban-b-enter, .ban-b-leave-to /* .fade-leave-active below version 2.1.8 */ {
    /* opacity: 0; */
    /* top: -50px; */
    transform: translateY(100%)
}
a {
    text-decoration: none;
    color: #1765b7;
}
.banner {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 100;
    min-width: 1032px;
    overflow: hidden;
    background: #fff;
    height: 52px;
    box-shadow: 0 1px 3px rgba(26,26,26,.1);
    background-clip: content-box;
    z-index: 999;
}
.banner-inner {
    position: relative;
    display: flex;
    width: 1000px;
    height: 52px;
    padding: 0 16px;
    margin: 0 auto;
    align-items: center;
    transition: transform .3s;
}

.banner-title {
    display: inline-block;
    /* margin-left: 10%; */
    font-size: 25px;
    font-weight: 900;
}
.banner-mp {
    display: inline-block;
    margin-left: 27px;
    font-size: 15px;
    vertical-align: 16px;
    font-weight: 700;
    color: #444;
}
.banner-ava {
    position: absolute;
    right: 80px;
    top: 50%;
    transform: translateY(-50%);
}

.banner-in {
    margin: 0px;
}
.banner-in-w {
    margin-left: 27px;

}
</style>
