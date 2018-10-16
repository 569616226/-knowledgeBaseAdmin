<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container">
			<data-tables v-loading="loading" :data="CancelsOrdersData" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
				<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
					<el-col :span="24" class="text-align-left">
						<el-date-picker :editable="false" v-model="seDate" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" type="daterange" placeholder="选择日期范围" @change="setEndDate"></el-date-picker>
						<el-select v-model="customFilters[1].vals" placeholder="付款状态" class="class_select_width">
							<el-option label="付款状态" value=""></el-option>
							<div v-for="status in Paystatus">
								<el-option :label="status" :value="status"></el-option>
							</div>
						</el-select>
						<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索话题名称/购买者" class="class_input_width">
						</el-input>
					</el-col>
				</el-row>
				<el-table-column prop="name" label="话题名称" key="name" sortable="custom" min-width="150">
					<template slot-scope="scope">
						<router-link :to="{name: 'CancelsDetail',params: {id: scope.row.id}}">
							<div class="blue"><b>{{scope.row.name}}</b></div>
						</router-link>
						<p>订单号：{{scope.row.order_no}}</p>
					</template>
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间" key="created_at" sortable="custom">
				</el-table-column>
				<el-table-column prop="status" label="付款状态" key="status" sortable="custom">
					<template slot-scope="scope">
						<div v-if="scope.row.status == '已付款'" class="green">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '已退款'" class="gray">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '已关闭'" class="gray">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '待付款'" class="red">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '退款中'" class="red">{{scope.row.status}}</div>
						<div v-if="scope.row.status == '已完成'" class="blue">{{scope.row.status}}</div>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="实付金额" key="price" sortable="custom">
				</el-table-column>
				<el-table-column prop="guest_name" label="付款者" key="guest_name" sortable="custom">
				</el-table-column>
				<el-table-column prop="payee" label="收款者" key="payee" sortable="custom">
				</el-table-column>
				<el-table-column prop="pay_type" label="支付渠道" key="pay_type" sortable="custom">
					<template slot-scope="scope">
						<div>{{scope.row.pay_type}}</div>
						<div class="gray">{{scope.row.pay_time}}</div>
					</template>
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
					props: ['name', 'guest_name'],
				}, {
					vals: [],
					props: ['status']
				}, {
					vals: []
				}, {
					vals: []
				}, {
					vals: [],
					props: ['created_at']
				}],
				seDate: null,
				endDate: null,
				Paystatus: ['待付款', '已付款', '已退款', '已关闭', '退款中', '已完成'],
				//分页设置
				paginationDef: {
					pageSize: 10,
					pageSizes: [10, 20, 50]
				},
			}
		},
		computed: {
			...mapState([
				'CancelsOrdersData'
			])
		},
		methods: {
			...mapActions([
				'getCancelsOrders'
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
					name: 'CancelsDetail',
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
				if(this.CancelsOrdersData.length == 0){
					this.loading = true
				}
				await this.getCancelsOrders()
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