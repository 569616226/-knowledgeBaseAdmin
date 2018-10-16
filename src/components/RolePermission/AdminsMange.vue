<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container">
			<data-tables v-loading="loading" :data="AdminsData" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
				<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
					<el-col :span="24" class="text-align-left">
						<el-button type="primary" @click="goSeed">新建账号</el-button>
						<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索账号/姓名" class="class_input_width">
						</el-input>
					</el-col>
				</el-row>
				<el-table-column prop="name" label="姓名" key="name" sortable="custom">
					<template slot-scope="scope">
						<router-link :to="{name: 'AdminsDetail',params: {id: scope.row.id}}">
							<div class="blue"><b>{{scope.row.name}}</b></div>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column prop="email" label="账号" key="email" sortable="custom">
				</el-table-column>
				<el-table-column prop="role_names" label="角色" key="role_names" sortable="custom">
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间" key="created_at" sortable="custom">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<div class="operation_box">
							<span @click="edit(scope.row)">编辑</span>
							<span @click="dong(scope.row)" v-if="scope.row.is_frozen == false">冻结</span>
							<span @click="dong(scope.row)" v-if="scope.row.is_frozen == true">解冻</span>
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
					props: ['name'],
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
				'AdminsData'
			])
		},
		methods: {
			...mapActions([
				'getAdmins'
			]),
			edit(row) {
				let id = row.id
				this.$router.push({
					name: 'EditAdmins',
					params: {
						id
					}
				})
			},
			deletes(row) {
				this.$confirm('真的要删除此账号吗？', '删除', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteAdmins(row)
				}).catch(() => {

				})
			},
			dong(row) {
				let tis = ''
				if(row.is_frozen == false){
					tis = '真的要冻结此账号吗？'
				}else{
					tis = '真的要解冻此账号吗？'
				}
				this.$confirm(tis, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.dongAdmins(row)
				}).catch(() => {

				})
			},
			async dongAdmins(row) {
				this.loading = true
				const data = await api.dongAdmins(row.id)
				if(data) {
					this.$message({
						message: '操作成功',
						type: 'success'
					})
				}else{
					this.$message.error(data.message)
				}
				this.getData()
				this.loading = false
			},
			async deleteAdmins(row) {
				this.loading = true
				const data = await api.deleteAdmins(row.id)
				if(data) {
					this.$message({
						message: '删除成功',
						type: 'success'
					})
				}else{
					this.$message.error(data.message)
				}
				this.getData()
				this.loading = false
			},
			async getData() {
				if(this.AdminsData.length == 0) {
					this.loading = true
				}
				await this.getAdmins()
				this.loading = false
			},
			goSeed() {
				this.$router.push({
					name: 'AddAdmins'
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