<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'CaseOrders'}">
						<i class="iconfont icon-07jiantouxiangzuo"></i>
					</router-link>
					<font color="#666666">提现审核 / </font>
					<router-link :to="{name: 'CaseOrders'}">
						<font color="#048aff">{{ $route.meta.title }}</font>
					</router-link>
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
				<div class="auditDaka-form">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="选择结果" prop="status">
							<el-radio-group v-model="ruleForm.status">
								<el-radio label="1">审核通过</el-radio>
								<el-radio label="0">审核失败</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="审核备注" prop="desc">
							<el-input class="auditDaka-form-textarea" type="textarea" v-model="ruleForm.desc" :autosize="{ minRows: 4, maxRows: 4}" placeholder="请输入"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
							<el-button @click="resetForm()">取消</el-button>
						</el-form-item>
					</el-form>
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
		name: 'AuditDaka',
		data() {
			return {
				loading: false,
				data: [],
				ruleForm: {
					status: '',
					desc: '',
					id: this.$route.params.id
				},
				rules: {
					status: [{
						required: true,
						message: '请选择结果',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写备注',
						trigger: 'blur'
					}]
				}
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
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.postAudit()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$router.push({
					name: "CaseOrders"
				})
			},
			async postAudit() {
				this.loading = true
				const data = await api.putAuditCase(this.ruleForm)
				if(data) {
					this.$message({
						message: '提交成功',
						type: 'success'
					})
					this.$router.push({
						name: "CaseOrders"
					})

				} else {
					this.$message.error('提交失败');
				}
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
			& .icon-07jiantouxiangzuo {
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