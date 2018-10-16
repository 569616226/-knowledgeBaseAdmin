<template>
  <div class="container">
    <div class="petals">
    	<div class="petals-item" v-for="(item,index) in petals" :key="index">
    		<img :src="item.thumb" />
    	</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
  	...mapState([
  		'petals'
  	])
  },
  methods: {
  	...mapActions([
  		'getPetals'
  	]),
  	async refresh () {
      await this.getPetals(true)
    },
  },
  mounted() {
  	this.refresh()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
