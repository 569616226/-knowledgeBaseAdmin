<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container">
			<data-tables v-loading="loading" :data="NavsData" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
				<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
					<el-col :span="24" class="text-align-left">
						<el-button type="primary" @click="goSeed">新建分类</el-button>
						<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索分类名称" class="class_input_width">
						</el-input>
					</el-col>
				</el-row>
				<el-table-column type="index" width="50" label="序号">
				</el-table-column>
				<el-table-column prop="icon" label="分类图片" key="icon" sortable="custom">
					<template slot-scope="scope">
						<img :src="scope.row.icon" width="64" />
					</template>
				</el-table-column>
				<el-table-column prop="name" label="分类标题" key="name" sortable="custom">
					<template slot-scope="scope">
						<router-link :to="{name: 'NavDetail',params: {id: scope.row.id}}">
							<div class="blue"><b>{{scope.row.name}}</b></div>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column prop="user_name" label="创建人" key="user_name" sortable="custom">
				</el-table-column>
				<el-table-column prop="created_at" label="发布时间" key="created_at" sortable="custom">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<div class="operation_box">
							<span @click="edit(scope.row)">编辑</span>
							<span @click="mange(scope.row)">管理子分类</span>
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
			}
		},
		computed: {
			...mapState([
				'NavsData'
			])
		},
		methods: {
			...mapActions([
				'getNavs'
			]),
			deletes(row) {
				this.$confirm('真的要删除此分类吗？', '删除', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteNavs(row)
				}).catch(() => {

				})
			},
			async deleteNavs(row) {
				this.loading = true
				const data = await api.deleteNavs(row.id)
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
			edit(row) {
				let id = row.id
				this.$router.push({
					name: 'EditNav',
					params: {
						id
					}
				})
			},
			mange(row) {
				let id = row.id
				this.$router.push({
					name: 'ChildrenNav',
					params: {
						id
					},
					query: {
						title: row.name
					}
				})
			},
			async getData() {
				if(this.NavsData.length == 0) {
					this.loading = true
				}
				await this.getNavs()
				this.loading = false
			},
			goSeed() {
				this.$router.push({
					name: 'AddNav'
				})
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.operation_box span {
		cursor: pointer;
		color: #8E9EBB;
		margin-right: 10px;
	}
</style>