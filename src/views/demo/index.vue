<template>
    <div class="git-w">
      <div class="g-o-w" v-for="item in list">
        <a  target="_blank" :href="item.url">
          <span class="g-o-i name">{{item.title}}</span>
          <span class="g-o-i lin">
            {{item.breif}}
          </span>
        </a>
      </div>
    </div>
</template>

  <script>
  import * as API from '../../api/index.js'
  export default {
    name: 'demo',
    data () {
      return {
        list:[],
      }
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
  created() {
    API.getdemo().then((res)=>{
      if(res.data.code > 10) {
        // console.log(res.data.data)
        this.list = res.data.data
      }
  })
  }
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  </style>