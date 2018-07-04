<template>
    <div class="hello">
		<baner :list="list" :swih="swih"></baner>
		<transition :name="transitionName">
			<router-view class="Router"></router-view>
		</transition>
    </div>
</template>

  <script>
  const baner = () => import('./banner/banner.vue')
  import * as API from '../api/index.js'
  // import '../assets/font/iconfont.css'
  export default {
    name: 'HelloWorld',
    data () {
      return {
		  swih:false,
          transitionName:'slide-left',
          list:[]
      }
  },
    watch: {
    	'$route' (to, from) {
			const toDepth = to.path.split('/').length
			const fromDepth = from.path.split('/').length
			this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    	}
    },
    asyncData ({store}) {
        return store.dispatch('FETCH_NAV');
    },
	methods:{
		wheel(e) {
			if(e.deltaY>0) {
				this.swih = true
			} else {
				this.swih = false
			}
		}
	},
	components:{
		baner
	},
	mounted() {
		document.addEventListener('wheel',this.wheel)
  },
  beforeDestroy() {
    document.removeEventListener('wheel',this.wheel)
  }
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style  scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
.Router {
  transition: all .5s ease;
	 position: absolute;
	 width: 100%;
}
.slide-left-enter, .slide-right-leave-active {  
	opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}  
.slide-left-leave-active, .slide-right-enter {  
	opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}  
/* .slide-left-enter,  
 .slide-right-leave-active {  
     opacity: 0;  
}  
  
.slide-left-leave-active,  
.slide-right-enter {  
     opacity: 0;  
}   */
  </style>
