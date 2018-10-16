<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container">
			<data-tables v-loading="loading" :data="makesData" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
				<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
					<el-col :span="24" class="text-align-left">
						<el-select v-model="customFilters[2].vals" placeholder="约见类型" class="class_select_width">
							<el-option label="约见类型" value=""></el-option>
							<div v-for="type in alltype">
								<el-option :label="type" :value="type"></el-option>
							</div>
						</el-select>
						<el-select v-model="customFilters[1].vals" placeholder="约见状态" class="class_select_width">
							<el-option label="约见状态" value=""></el-option>
							<div v-for="status in allstatus">
								<el-option :label="status" :value="status"></el-option>
							</div>
						</el-select>
						<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索话题标题/发起人" class="class_input_width">
						</el-input>
					</el-col>
				</el-row>
				<el-table-column prop="topic_name" label="约见话题" key="topic_name" sortable="custom">
					<template slot-scope="scope">
						<router-link :to="{name: 'MakeDetail',params: {id: scope.row.id}}">
							<div class="blue"><b>{{scope.row.topic_name}}</b></div>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column prop="topic.data.ser_type" label="类型" key="topic.data.ser_type" sortable="custom">
					<template slot-scope="scope">
							<div v-if="scope.row.topic.data.ser_type == '线下约见'">线下约见</div>
							<div v-else>全国通话</div>
					</template>
				</el-table-column>
				<el-table-column prop="guest_name" label="提问人" key="guest_name" sortable="custom">
				</el-table-column>
				<el-table-column prop="status" label="状态" key="status" sortable="custom">
					<template slot-scope="scope">
						<div v-if="scope.row.status == '已取消'" class="gray">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '待见面'" class="green">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '待确认'" class="red">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '待付款'" class="bluei">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '待评价'" class="yellow">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '已完成'" class="purple">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '已拒绝'" class="nblue">{{scope.row.status}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间" key="created_at" sortable="custom">
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
					props: ['topic_name', 'guest_name'],
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
				allstatus: ['待确认', '待付款', '待见面', '待评价', '已拒绝', '已完成', '已取消'],
				alltype: ['线下约见', '全国通话'],
				//分页设置
				paginationDef: {
					pageSize: 10,
					pageSizes: [10, 20, 50]
				},
			}
		},
		computed: {
			...mapState([
				'makesData'
			])
		},
		methods: {
			...mapActions([
				'getMakes'
			]),
			details (row) {
				let id = row.id
				this.$router.push({
					name: 'MakeDetail',
					params: {
						id
					}
				})
			},
			async getData () {
				if(this.makesData.length == 0){
					this.loading = true
				}
				await this.getMakes()
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