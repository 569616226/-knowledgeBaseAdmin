<template>
  <div>
    <Head></Head>
    <div class="container">
      <div class="left">
        <Nav></Nav>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
      
  </div>
</template>

<script>
import Head from '@/components/common/Head'
import Nav from '@/components/common/Nav'
export default {
  components: {
    Head,Nav
  },
  name: 'Admin',
  data () {
    return {
      
    }
  },
  computed: {
 
  },
  methods: {
 
  },
  mounted() {
 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 30px;
  position: relative;
}
 .left {
    border-radius: 0;
    width: 200px;
    transition: transform .3s;
    position: absolute;
    top: 30px;
    left: 0;
    bottom: 0;
 }
 .right {
     margin-left: 200px;
 }

</style>
