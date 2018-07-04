<template>
    <div class="hello">
    </div>
</template>

  <script>
  export default {
    name: 'demo',
    data () {
      return {
		  swih:false
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
  }
  </script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .con {

  }
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
  </style>