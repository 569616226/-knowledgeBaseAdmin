<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container">
			<data-tables v-loading="loading" :data="answersData" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
				<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
					<el-col :span="24" class="text-align-left">
						<el-select v-model="customFilters[1].vals" placeholder="回答状态" class="class_select_width">
							<el-option label="回答状态" value=""></el-option>
							<div v-for="status in allstatus">
								<el-option :label="status" :value="status"></el-option>
							</div>
						</el-select>
						<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索问题标题/提问者" class="class_input_width">
						</el-input>
					</el-col>
				</el-row>
				<el-table-column prop="name" label="问题标题" key="name" sortable="custom">
					<template slot-scope="scope">
						<router-link :to="{name: 'AnswerDetail',params: {id: scope.row.id}}">
							<div class="blue"><b>{{scope.row.name}}</b></div>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column prop="creator_name" label="提问人" key="creator_name" sortable="custom">
				</el-table-column>
				<el-table-column prop="status_txt" label="状态" key="status_txt" sortable="custom">
					<template slot-scope="scope">
						<div v-if="scope.row.status == '已关闭'" class="gray">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '已回答'" class="green">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '待回答'" class="red">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '待付款'" class="orange">{{scope.row.status}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="answer_name" label="回答人" key="answer_name" sortable="custom">
				</el-table-column>
				<el-table-column prop="created_at" label="提问时间" key="created_at" sortable="custom">
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
					props: ['name', 'creator_name'],
				}, {
					vals: []
				}, {
					vals: []
				}, {
					vals: []
				}, {
					vals: []
				}],
				seDate: null,
				endDate: null,
				allstatus: ['待付款', '待回答', '已回答', '已关闭'],
				//分页设置
				paginationDef: {
					pageSize: 10,
					pageSizes: [10, 20, 50]
				},
			}
		},
		computed: {
			...mapState([
				'answersData'
			])
		},
		methods: {
			...mapActions([
				'getAnswers'
			]),
			details (row) {
				let id = row.id
				this.$router.push({
					name: 'AnswerDetail',
					params: {
						id
					}
				})
			},
			async getData () {
				if(this.answersData.length == 0){
					this.loading = true
				}
				await this.getAnswers()
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