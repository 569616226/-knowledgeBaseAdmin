<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container">
			<data-tables v-loading="loading" :data="PermissionsData" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
				<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
					<el-col :span="24" class="text-align-left">
						<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索权限名称" class="class_input_width">
						</el-input>
					</el-col>
				</el-row>
				<el-table-column prop="description" label="权限名称" key="description" sortable="custom">
					<template slot-scope="scope">
						<router-link :to="{name: 'PermissionsDetail',params: {id: scope.row.id}}">
							<div class="blue"><b>{{scope.row.description}}</b></div>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<div class="operation_box">
							<span @click="details(scope.row)">查看</span>
						</div>
					</template>
				</el-table-column>
			</data-tables>
		</div>
	</div>

</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	export default {
		components: {

		},
		name: 'Auditer',
		data() {
			return {
				loading: false,
				tableProps: {
					border: false, //去掉边框
					stripe: false //去掉斑马纹
				},
				customFilters: [{
					vals: '',
					props: ['description'],
				}, {
					vals: []
				}, {
					vals: []
				}, {
					vals: []
				}, {
					vals: []
				}],
				//分页设置
				paginationDef: {
					pageSize: 10,
					pageSizes: [10, 20, 50]
				},
				dialogVisible: false,
				save_id: null
			}
		},
		computed: {
			...mapState([
				'PermissionsData'
			])
		},
		methods: {
			...mapActions([
				'getPermissions'
			]),
			details(row) {
				let id = row.id
				this.$router.push({
					name: 'PermissionsDetail',
					params: {
						id
					}
				})
			},
			async getData() {
				if(this.PermissionsData.length == 0) {
					this.loading = true
				}
				await this.getPermissions()
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.AddGroup{
		color: rgb(60, 152, 255);
    	font-size: 14px;
    	margin-top: 10px;
    	cursor: pointer;
    	&-div{
    		margin-top: 10px;
    		&-input{
    			width: 40%;
    		}
    		&-add{
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