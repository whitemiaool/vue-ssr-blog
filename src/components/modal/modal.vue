<template>
    <div class="modal-w" v-if="show">
        <div class="modle">
            <div class="modal-t-w">
                <div class="modle-t">{{title}}</div>
                <div class="modal-i modal-close" @click="close">&#9783;</div>
            </div>
            <div class="modal-c">
                <slot></slot>
            </div>
            <div class="modal-b">
                <div class="modal-i" @click="confirm">&#9776;</div>
                <div class="modal-i" @click="close">&#9783;</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'banner',
    data () {
        return {
            
        }
    },
    props:{
        title:{
            default:'通知'
        },
        show:{
            default:false
        },
        close:{
            default:()=>{}
        },
        confirm:{
            default:()=>{}
        }

    },
    methods:{
        infuc(){
            this.tipfuc = !this.tipfuc
        },
        change() {
            
        }
    },
}
</script>

<style scoped>
.modal-c {
    min-height: 120px;
    padding: 15px 10px;
    font-size: 14px;
}
.modal-b {
    text-align: right;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #ccc;
}
.modal-t-w {
    position: relative;
    height: 50px;
}
.modal-i {
    color: #949494;
    transition: color 0.7s;
    cursor: pointer;
    display: inline-block;
    font-style: normal;
    vertical-align: baseline;
    text-align: center;
    text-transform: none;
    text-rendering: auto;
    width: 41px;
    height: 41px;
    line-height: 41px;
    font-size: 20px;
}
.modal-close {
    position: absolute;
    right: 0px;
    top: 0px;
}
.modal-i:hover {
    color: #067cd0;
}
.modal-w {
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    outline: 0;
    background-color: rgba(0,0,0,.65);
    height: 100%;
    z-index: 1000;
}
.modle-t {
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    padding: 5px 10px;
}
.modle {
    top: 100px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    min-height: 200px;
    width: 500px;
    background: #ccc;
    background-color: #fff;
    border: 0;
    border-radius: 4px;
    background-clip: padding-box;
    box-shadow: 0 4px 12px rgba(0,0,0,.15);
}
</style>




