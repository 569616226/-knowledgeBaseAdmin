<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container" v-loading="loading">
			<el-input placeholder="搜索权限名称/路由" v-model="filterText">
			</el-input>
			<el-tree class="filter-tree" node-key="id" :data="MenusData" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2" :expand-on-click-node="false">
			</el-tree>
		</div>
	</div>

</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	let id = 1000
	export default {
		components: {

		},
		name: 'Auditer',
		data() {
			return {
				loading: false,
				filterText: '',
				defaultProps: {
					children: 'children',
					label: 'name'
				}
			}
		},
		computed: {
			...mapState([
				'MenusData'
			])
		},
		methods: {
			...mapActions([
				'getMenus'
			]),
			filterNode(value, data) {
				if(!value) return true;
				return data.name.indexOf(value) !== -1;
			},
			async getData() {
				if(this.MenusData.length == 0) {
					this.loading = true
				}
				await this.getMenus()
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.AddGroup {
		color: rgb(60, 152, 255);
		font-size: 14px;
		margin-top: 10px;
		cursor: pointer;
		&-div {
			margin-top: 10px;
			&-input {
				width: 40%;
			}
			&-add {
				color: rgb(60, 152, 255);
				font-size: 14px;
				margin-top: 10px;
				cursor: pointer;
				margin-left: 15px;
			}
		}
	}
	
	.operation_box span {
		cursor: pointer;
		color: #8E9EBB;
		margin-right: 10px;
	}
</style>
<style>
	.filter-tree {
		margin-top: 20px;
	}
	
	.el-tree-node {
		margin-top: 10px;
	}
	
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>