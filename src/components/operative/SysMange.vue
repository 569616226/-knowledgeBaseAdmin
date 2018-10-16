<template>
	<div>
		<div class="page-title">{{ checkName }}</div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="群发消息" name="first">
				<messages></messages>
			</el-tab-pane>
			<el-tab-pane label="微信模版消息" name="second">
				<system-messages></system-messages>
			</el-tab-pane>
		</el-tabs>
	</div>

</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import messages from './SysMange/messages'
	import SystemMessages from './SysMange/system_messages'
	export default {
		components: {
			messages,SystemMessages
		},
		data() {
			return {
				activeName: 'first'
			}
		},
		computed: {
			checkName () {
				if(this.activeName == 'first'){
					return '群发消息'
				}
				if(this.activeName == 'second'){
					return '微信模版消息'
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
			next()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>