<template>
	<div>
		<div class="know-container">
			<data-tables v-loading="loading" :data="AdvertsData" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
				<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
					<el-col :span="24" class="text-align-left">
						<el-button type="primary" @click="goSeed">新建广告</el-button>
						<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索图片标题" class="class_input_width">
						</el-input>
					</el-col>
				</el-row>
				<el-table-column type="index" width="50">
    			</el-table-column>
				<el-table-column prop="path" label="广告图片" key="path" sortable="custom">
					<template slot-scope="scope">
						<img :src="scope.row.path" width="100%"/>
					</template>
				</el-table-column>
				<el-table-column prop="name" label="图片标题" key="name" sortable="custom">
					<template slot-scope="scope">
						<router-link :to="{name: 'AdalertDetail',params: {id: scope.row.id}}">
							<div class="blue"><b>{{scope.row.name}}</b></div>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column prop="url" label="轮播图片链接" key="url" sortable="custom">
				</el-table-column>
				<el-table-column prop="user_name" label="创建人" key="user_name" sortable="custom">
				</el-table-column>
				<el-table-column prop="created_at" label="发布时间" key="created_at" sortable="custom">
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
				'AdvertsData'
			])
		},
		methods: {
			...mapActions([
				'getAdverts'
			]),
			deletes (row) {
				this.$confirm('真的要删除此课程吗？', '删除', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.deleteAdverts(row.id)
					}).catch(() => {

					})
			},
			async deleteAdverts (id) {
				this.loading = true
				await api.deleteAdverts(id)
				this.loading = false
				this.$message.success('删除成功')
				this.getData()
			},
			edit (row) {
				let id = row.id
				this.$router.push({
					name: 'EditAdalert',
					params: {
						id
					}
				})
			},
			async getData () {
				if(this.AdvertsData.length == 0){
					this.loading = true
				}
				await this.getAdverts()
				this.loading = false
			},
			goSeed () {
				this.$router.push({
					name: 'AddAdalert'
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