<template>
	<div>
		<div class="page-title">{{ checkName }}</div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="关注回复设置" name="first">
				<reply></reply>
			</el-tab-pane>
		</el-tabs>
	</div>

</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import reply from './PubnuMent/reply'
	export default {
		components: {
			reply
		},
		data() {
			return {
				activeName: 'first'
			}
		},
		computed: {
			checkName () {
				if(this.activeName == 'first'){
					return '公众号管理'
				}
			}
		},
		methods: {
			handleClick(tab, event) {
				
			}
		},
		mounted() {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>