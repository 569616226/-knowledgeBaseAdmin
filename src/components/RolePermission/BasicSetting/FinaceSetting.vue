<template>
	<div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<el-form @submit.native.prevent class="margin-top-lg" :label-position="labelPosition" label-width="130px" :model="ruleForm" ref="ruleForm" :rules="rules">

					<el-form-item prop="yclose" class="margin-left-lg margin-top must" label="约见费用转入时间" label-width="150px">
						<el-input class="form-input-h" v-model="ruleForm.yclose" placeholder="请填写时间数字" @input="checkNo('yclose')"></el-input>
						<span class="margin-left-sm">小时</span>
						<p class="form_p_g">当大咖确认见面后，会在设置的时间后转入费用到大咖钱包</p>
					</el-form-item>
					
					<el-form-item prop="wclose" class="margin-left-lg margin-top must" label="问答费用转入时间" label-width="150px">
						<el-input class="form-input-h" v-model="ruleForm.wclose" placeholder="请填写数字" @input="checkNo('wclose')"></el-input>
						<span class="margin-left-sm">小时</span>
						<p class="form_p_g">当大咖回答问题后，会在设置的时间后转入费用到大咖钱包</p>
					</el-form-item>

					<el-form-item class="text-center margin-top-lg">
						<el-button :disabled="loading" type="primary" @click="submitForm('ruleForm')">提交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import { getCookie } from '@/utils'
	export default {
		data() {
			return {
				data: [],
				labelPosition: 'right',
				order_setting: [],
				ruleForm: {
					yclose: '',
					wclose: '',
					key: 'system_finance_settings'
				},
				rules: {
					yclose: [{
						required: true,
						message: '请填写时间',
						trigger: 'blur'
					}],
					wclose: [{
						required: true,
						message: '请填写时间',
						trigger: 'blur'
					}]
				},
				loading: false
			}
		},
		computed: {
			...mapState([
				'GroupsData'
			])
		},
		methods: {
			...mapActions([
				'getGroups'
			]),
			async getdata() {
				this.loading = true
				const data = await api.getReply('system_finance_settings')
				this.ruleForm.yclose = data.data.value[0]
				this.ruleForm.wclose = data.data.value[1]
				this.loading = false
			},
			//提交表单
			submitForm(formName) {
				let id = this.$route.params.id;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.patchReply()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async patchReply() {
				this.loading = true
				this.order_setting.push(this.ruleForm.yclose)
				this.order_setting.push(this.ruleForm.wclose)
				this.ruleForm.index_count = this.order_setting
				const data = await api.patchReply(this.ruleForm)
				if(data) {
					this.$message({
						type: 'success',
						message: '提交成功'
					})
				}else{
					this.$message({
						type: 'info',
						message: '提交失败'
					})
				}
				this.order_setting = []
				this.loading = false
			},
			checkNo(name) {
				if(name == 'yclose') {
					this.$nextTick(() => {
						this.ruleForm.yclose = this.$valid.onlynumber(this.ruleForm.yclose)
						if(this.ruleForm.yclose == '0'){
							this.ruleForm.yclose = 1
						}
					})
				}
				if(name == 'wclose') {
					this.$nextTick(() => {
						this.ruleForm.wclose = this.$valid.onlynumber(this.ruleForm.wclose)
						if(this.ruleForm.wclose == '0'){
							this.ruleForm.wclose = 1
						}
					})
				}
			}
		},
		mounted: function() {
			this.getdata()

		},
		watch: {
			
		}
	}
</script>
<style lang="less" scoped>
	.auditDaka {
		&-arrow {
			& .icon-07jiantouxiangzuo {
				vertical-align: middle;
				font-size: 24px;
				color: #444444;
			}
		}
	}
</style>
<style scoped>
	.form-input-h {
		width: 400px
	}
	
	.form_p_g {
		font-size: 14px;
		color: #888;
		clear: both
	}
	
	.tree-box {
		margin-top: 10px;
		border: 1px solid #E3E3E3;
		border-radius: 4px;
		width: 800px;
		padding: 10px;
		min-height: 220px
	}
	
	.avatar-uploader {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		display: inline-block;
		line-height: 1
	}
	
	.avatar-uploader:hover {
		border-color: #409EFF
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center
	}
	
	.avatar {
		width: 100px;
		height: 100px;
		display: block
	}
	
	.colrecom_form {
		width: 200px;
		border: 1px solid #ccc;
		line-height: initial;
		display: inline-block;
		position: relative;
		margin: 0 15px 1rem 0;
		float: left;
		height: 141px;
		border-radius: 4px
	}
	
	.colrecom_form_add {
		width: 200px;
		border: 1px dotted #ccc;
		line-height: initial;
		display: inline-block;
		position: relative;
		margin: 0 15px 1rem 0;
		float: left;
		height: 141px;
		text-align: center;
		border-radius: 4px
	}
	
	.colrecom_form_add>.el-icon-plus {
		height: 80px
	}
	
	.colrecom_form>img {
		width: 100%
	}
	
	.colrecom_form>p {
		line-height: normal;
		text-align: center;
		padding: 0 3px;
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-align: justify
	}
	
	.colrecom_form>.el-icon-error {
		color: #ff7043;
		position: absolute;
		top: -7px;
		right: -7px;
		font-size: 18px
	}
	
	.input_search_video {
		width: 50%
	}
	
	.span_search_video {
		color: #888;
		margin-left: 5%
	}
	
	.select_show_video {
		width: 685px;
		margin: 0 auto
	}
	
	.show_page {
		margin-top: 2rem;
		text-align: center
	}
</style>