<template>
    <div class="modal-w" v-if="show">
        <div class="wrap-xxx">
            <div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-ellipsis"><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div><div><div></div></div></div>
            <span>loading</span>
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

@-webkit-keyframes lds-ellipsis3 {
  0%, 25% {
    left: 32px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    left: 32px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  75% {
    left: 100px;
  }
  100% {
    left: 168px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  25%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
@-webkit-keyframes lds-ellipsis2 {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  25%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
@keyframes lds-ellipsis {
  0% {
    left: 32px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  25% {
    left: 32px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    left: 100px;
  }
  75% {
    left: 168px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    left: 168px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
@-webkit-keyframes lds-ellipsis {
  0% {
    left: 32px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  25% {
    left: 32px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    left: 100px;
  }
  75% {
    left: 168px;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    left: 168px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
.lds-ellipsis {
  position: relative;
}
.lds-ellipsis > div {
  position: absolute;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
}
.lds-ellipsis div > div {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f00;
  position: absolute;
  top: 100px;
  left: 32px;
  -webkit-animation: lds-ellipsis 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  animation: lds-ellipsis 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
}
.lds-ellipsis div:nth-child(1) div {
  -webkit-animation: lds-ellipsis2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  animation: lds-ellipsis2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  background: #1875e5;
}
.lds-ellipsis div:nth-child(2) div {
  -webkit-animation-delay: -0.5s;
  animation-delay: -0.5s;
  background: #499255;
}
.lds-ellipsis div:nth-child(3) div {
  -webkit-animation-delay: -0.25s;
  animation-delay: -0.25s;
  background: #f2b736;
}
.lds-ellipsis div:nth-child(4) div {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  background: #c5523f;
}
.lds-ellipsis div:nth-child(5) div {
  -webkit-animation: lds-ellipsis3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  animation: lds-ellipsis3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite forwards;
  background: #1875e5;
}
.lds-ellipsis {
  width: 42px !important;
  height: 42px !important;
  -webkit-transform: translate(-21px, -21px) scale(0.21) translate(21px, 21px);
  transform: translate(-21px, -21px) scale(0.21) translate(21px, 21px);
}
.wrap-xxx {
    top: 50%;
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #27b486;
}
.wrap-xxx span {
  margin-left: -5px;
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
    /* background-color: rgba(0,0,0,.65); */
    height: 100%;
    z-index: 1000;
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




