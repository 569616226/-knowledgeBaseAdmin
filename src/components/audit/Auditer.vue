<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container">
			<data-tables v-loading="loading" :data="auditerData" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
				<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
					<el-col :span="24" class="text-align-left">
						<el-date-picker v-model="seDate" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" type="daterange" placeholder="选择日期范围" @change="setEndDate" :editable="false"></el-date-picker>
						<el-select v-model="customFilters[1].vals" placeholder="所有状态" class="class_select_width">
							<el-option label="所有状态" value=""></el-option>
							<div v-for="status in allstatus">
								<el-option :label="status" :value="status"></el-option>
							</div>
						</el-select>
						<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索大咖姓名/所属机构" class="class_input_width">
						</el-input>
					</el-col>
				</el-row>
				<el-table-column prop="real_name" label="大咖姓名" key="real_name" sortable="custom">
					<template slot-scope="scope">
						<router-link :to="{name: 'dakaDetail',params: {id: scope.row.id}}">
							<div class="blue"><b>{{scope.row.real_name}}</b></div>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column prop="office" label="所属机构" key="office" sortable="custom">
				</el-table-column>
				<el-table-column prop="city" label="城市" key="city" sortable="custom">
				</el-table-column>
				<el-table-column prop="status_txt" label="状态" key="status_txt" sortable="custom">
					<template slot-scope="scope">
						<div v-if="scope.row.status == 0" class="bluei">{{scope.row.status_txt}}</div>
						<div v-if="scope.row.status == 1" class="green">{{scope.row.status_txt}}</div>
						<div v-if="scope.row.status == 2" class="red">{{scope.row.status_txt}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间" key="created_at" sortable="custom">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<div class="operation_box">
							<span v-if="scope.row.status == 2" @click="audit(scope.row)">审核</span>
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
					props: ['real_name', 'office'],
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
				allstatus: ['审核成功', '待审核', '审核失败'],
				//分页设置
				paginationDef: {
					pageSize: 10,
					pageSizes: [10, 20, 50]
				},
			}
		},
		computed: {
			...mapState([
				'auditerData'
			])
		},
		methods: {
			...mapActions([
				'getAuditer'
			]),
			audit (row) {
				let id = row.id
				this.$router.push({
					name: 'AuditDaka',
					params: {
						id
					}
				})
			},
			details (row) {
				let id = row.id
				this.$router.push({
					name: 'dakaDetail',
					params: {
						id
					}
				})
			},
			setEndDate(val) {
				if(val == null) {
					this.customFilters[4].vals = "";
					console.log(this.customFilters[4].vals);
				} else {
					let begin = this.$options.methods.getDates(this.seDate[0]);
					let end = this.$options.methods.getDates(this.seDate[1]);
					this.customFilters[4].vals = this.$options.methods.getAll(begin, end);
					console.log(this.customFilters[4].vals);
				}
			},
			getDates(date) {
				let elDate = new Date(date);
				return elDate.getFullYear() + '-' + (elDate.getMonth() + 1) + '-' + elDate.getDate();
			},
			getAll(begin, end) {
				var ab = begin.split("-");
				var ae = end.split("-");
				var db = new Date();
				db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
				var de = new Date();
				de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
				var unixDb = db.getTime();
				var unixDe = de.getTime();
				let idsdate = [];
				for(var k = unixDb; k <= unixDe;) {
					idsdate.push((new Date(parseInt(k))).format());
					k = k + 24 * 60 * 60 * 1000;
				}
				return idsdate;
			},
			async getData () {
				if(this.auditerData.length == 0){
					this.loading = true
				}
				await this.getAuditer()
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