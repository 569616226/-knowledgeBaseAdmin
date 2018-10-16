<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="订单设置" name="first">
				<order-setting></order-setting>
			</el-tab-pane>
			<el-tab-pane label="账务设置" name="second">
				<finace-setting></finace-setting>
			</el-tab-pane>
			<el-tab-pane label="抽成设置" name="third">
				<take-setting></take-setting>
			</el-tab-pane>
			<el-tab-pane label="价格设置" name="fourth">
				<price-setting></price-setting>
			</el-tab-pane>
		</el-tabs>
	</div>

</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import OrderSetting from './BasicSetting/OrderSetting'
	import FinaceSetting from './BasicSetting/FinaceSetting'
	import TakeSetting from './BasicSetting/TakeSetting'
	import PriceSetting from './BasicSetting/PriceSetting'
	export default {
		components: {
			OrderSetting,FinaceSetting,TakeSetting,PriceSetting
		},
		data() {
			return {
				activeName: 'first'
			}
		},
		computed: {
			
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