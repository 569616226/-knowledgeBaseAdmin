<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container">
			<data-tables v-loading="loading" :data="articlesData" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
				<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
					<el-col :span="24" class="text-align-left">
						<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索文章标题" class="class_input_width">
						</el-input>
					</el-col>
				</el-row>
				<el-table-column prop="title" label="文章标题" key="title" sortable="custom">
					<template slot-scope="scope">
						<router-link :to="{name: 'ArticlesDetail',params: {id: scope.row.id}}">
							<div class="blue"><b>{{scope.row.title}}</b></div>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column prop="guest_name" label="发布人" key="guest_name" sortable="custom">
				</el-table-column>
				<el-table-column prop="created_at" label="发布时间" key="created_at" sortable="custom">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<div class="operation_box">
							<span @click="details(scope.row)">详情</span>
						</div>
					</template>
				</el-table-column>
			</data-tables>
		</div>
	</div>

</template>

<script>
	import { mapState, mapActions } from 'vuex'
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
					props: ['title'],
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
				'articlesData'
			])
		},
		methods: {
			...mapActions([
				'getArticles'
			]),
			details (row) {
				let id = row.id
				this.$router.push({
					name: 'ArticlesDetail',
					params: {
						id
					}
				})
			},
			async getData () {
				if(this.articlesData.length == 0){
					this.loading = true
				}
				await this.getArticles()
				this.loading = false
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