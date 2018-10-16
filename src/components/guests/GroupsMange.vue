<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container">
			<data-tables v-loading="loading" :data="GroupsData" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
				<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
					<el-col :span="24" class="text-align-left">
						<el-button type="primary" @click="goSeed">新建用户组</el-button>
						<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索用户组名称/创建人" class="class_input_width">
						</el-input>
					</el-col>
				</el-row>
				<el-table-column prop="name" label="用户组名称" key="name" sortable="custom">
					<template slot-scope="scope">
						<router-link :to="{name: 'GroupDetail',params: {id: scope.row.id}}">
							<div class="blue"><b>{{scope.row.name}}</b></div>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column prop="user_name" label="创建人" key="user_name" sortable="custom">
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间" key="created_at" sortable="custom">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<div class="operation_box">
							<span @click="edit(scope.row)">编辑</span>
							<span @click="deletes(scope.row)">删除</span>
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
					props: ['name', 'user_name'],
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
				'GroupsData'
			])
		},
		methods: {
			...mapActions([
				'getGroups'
			]),
			edit(row) {
				let id = row.id
				this.$router.push({
					name: 'EditGroup',
					params: {
						id
					}
				})
			},
			deletes(row) {
				this.$confirm('真的要删除此分类吗？', '删除', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteGroup(row)
				}).catch(() => {

				})
			},
			async deleteGroup(row) {
				this.loading = true
				const data = await api.deleteGroup(row.id)
				if(data.status) {
					this.$message({
						message: data.msg,
						type: 'success'
					})
				}else{
					this.$message.error(data.msg)
				}
				this.getData()
				this.loading = false
			},
			async getData() {
				if(this.GroupsData.length == 0) {
					this.loading = true
				}
				await this.getGroups()
				this.loading = false
			},
			goSeed() {
				this.$router.push({
					name: 'AddGroup'
				})
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