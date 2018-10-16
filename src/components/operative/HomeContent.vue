<template>
	<div>
		<div class="page-title">{{ checkName }}</div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="广告管理" name="first">
				<ad-alert></ad-alert>
			</el-tab-pane>
			<el-tab-pane label="推荐大咖设置" name="second">
				<groom-daka></groom-daka>
			</el-tab-pane>
			<el-tab-pane label="推荐话题设置" name="third">
				<groom-topic></groom-topic>
			</el-tab-pane>
		</el-tabs>
	</div>

</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import AdAlert from './HomeContent/AdAlert'
	import GroomDaka from './HomeContent/GroomDaka'
	import GroomTopic from './HomeContent/GroomTopic'
	export default {
		components: {
			AdAlert,GroomDaka,GroomTopic
		},
		data() {
			return {
				activeName: 'first'
			}
		},
		computed: {
			checkName () {
				if(this.activeName == 'first'){
					return '广告管理'
				}
				if(this.activeName == 'second'){
					return '推荐大咖设置'
				}
				if(this.activeName == 'third'){
					return '推荐话题设置'
				}
			}
		},
		methods: {
			handleClick(tab, event) {
				
			}
		},
		mounted() {

		},
		beforeRouteEnter (to, from, next) {
			if(to.query.check == 'second'){
				next(vm => vm.activeName = 'second')
			}
			if(to.query.check == 'third'){
				next(vm => vm.activeName = 'third')
			}
			next()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>