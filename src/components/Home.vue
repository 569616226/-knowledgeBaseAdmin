<template>
  <div class="know-container">
    <div class="home_bd">
      <p class="home_title">欢迎使用，链咖管理系统</p>
      <div style="height:200px;"></div>      
    </div>
  </div>
    
</template>

<script>
 
export default {
  components: {
    
  },
  name: 'Home',
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
.home_title {
  padding-top: 60px;
  text-align: center;
  line-height: 44px;
  color: rgba(145, 163, 199, 1);
  font-size: 30px;
  text-align: center;
  font-family: Roboto;
}
 .home_bd {
  width:100%;
  height:670px;
  background:url(../assets/home_bd.png);  
  filter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";  
  -moz-background-size:70%;  
  background-size:70%;
  background-position: center;
  background-repeat: no-repeat;
 }
 @media screen and (min-width: 1480px) {
     .home_bd{
      height:780px;
     }
}
</style>
