<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'CaseOrders'}">
						<i class="iconfont icon-guanbi"></i>
					</router-link>
					<font color="#666666">提现审核 / </font>
					<router-link :to="{name: 'CaseOrders'}">
						<font color="#048aff">查看详情</font>
					</router-link>
				</div>
				<div class="auditDaka-row">
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">审核状态：</div>
								</el-col>
								<el-col :span="22">
									<div v-if="data.refund_audit_status == '审核失败'" class="bluei">{{data.refund_audit_status}}</div>
									<div v-if="data.refund_audit_status == '审核通过'" class="green">{{data.refund_audit_status}}</div>
									<div v-if="data.refund_audit_status == '待审核'" class="red">{{data.refund_audit_status}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">审核备注 ：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.refund_audit_remark}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">转账状态：</div>
								</el-col>
								<el-col :span="22">
									<div v-if="data.refund_status == '待转账'" class="gray">{{data.refund_status}}</div>
									<div v-if="data.refund_status == '转账成功'" class="yellow">{{data.refund_status}}</div>
									<div v-if="data.refund_status == '转账失败'" class="red">{{data.refund_status}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">转账备注  ：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.remark}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
				<div class="auditDaka-title">
					<span>提现信息</span>
				</div>
				<div class="auditDaka-row">
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">申请时间：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.created_at}}</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">申请人：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.guest_name}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">提现金额 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.price}}元</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">提现到：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.refund_way}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
			</div>
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
				data: []
			}
		},
		computed: {

		},
		methods: {
			...mapActions([
				'getAuditDaka'
			]),
			async getData() {
				this.loading = true
				const data = await api.getCaseDetail(this.$route.params.id)
				this.data = data.data
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	.auditDaka {
		&-form {
			margin-top: 30px;
			&-textarea {
				width: 50%;
			}
		}
		&-arrow {
			& .icon-guanbi {
				vertical-align: middle;
				font-size: 24px;
				color: #444444;
			}
		}
		&-title {
			padding: 30px 20px 0 20px;
			font-size: 18.0px;
			font-weight: bold;
		}
		&-row {
			margin-top: 30px;
			padding: 0 0 40px 20px;
			border-bottom: 1px solid #E3E3E3;
			&-left {
				color: #999999;
			}
			&-top {
				margin-top: 30px;
				font-size: 14.0px;
			}
		}
	}
</style>