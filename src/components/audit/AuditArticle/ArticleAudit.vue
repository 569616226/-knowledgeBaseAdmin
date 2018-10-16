<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'AuditArticle'}">
						<i class="iconfont icon-07jiantouxiangzuo"></i>
					</router-link>
					<font color="#666666">文章审核 / </font>
					<router-link :to="{name: 'AuditArticle'}">
						<font color="#048aff">审核文章</font>
					</router-link>
				</div>
				<div class="auditDaka-title">
					<span>审核信息</span>
				</div>
				<div class="auditDaka-row">
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">文章标题：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.title}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">作者 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.guest_name}}</div>
								</el-col>
							</el-row>
						</el-col>
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
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">文章封面：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right"><img :src="data.cover" style="max-width: 300px;" /></div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">文章内容：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right" v-html="data.content"></div>
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
				const data = await api.getArticleDetail(this.$route.params.id)
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
					name: "AuditArticle"
				})
			},
			async postAudit() {
				this.loading = true
				const data = await api.getArticlestate(this.ruleForm)
				if(data) {
					this.$message({
						message: '提交成功',
						type: 'success'
					})
					this.$router.push({
						name: "AuditArticle"
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