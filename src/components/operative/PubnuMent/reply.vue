<template>
	<div>
		<div class="know-container" v-loading="loading">
			<div class="member_first">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="回复内容" prop="index_count">
						<vue-html5-editor :content="ruleForm.index_count[0]" @change="updateData" :z-index="10" :auto-height="true"></vue-html5-editor>
						<p class="form_p_g">设置新用户关注公众号的欢迎词，字数不超过600字，按下Enter键换行</p>
					</el-form-item>
					<el-form-item class="text_reply">
						<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import api from '@/utils/api'
	export default {
		data() {
			return {
				data: [],
				ruleForm: {
					index_count: [],
					key: 'system_wehchat_settings'
				},
				rules: {
					index_count: [{
						required: true,
						message: '请填写回复内容',
						trigger: 'blur'
					}]
				},
				loading: false
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.patchReply()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async patchReply () {
				this.loading = true
				const data = await api.patchReply(this.ruleForm)
				if(data.status == 'error'){
					this.$message.error(data.message)
				}else{
					this.$message.success('更新成功')
				}
				this.loading = false
			},
			//获取数据 
			async getdata() {
				this.loading = true
				const data = await api.getReply('system_wehchat_settings')
				this.ruleForm.index_count[0] = data.data.value[0]
				this.loading = false
			},
			updateData(data) {
				this.ruleForm.index_count[0] = data
			}
		},
		watch: {

		},
		mounted() {
			this.getdata();
		}
	}
</script>
<style scoped>
.member_first{padding:60px}
.text_reply{text-align:center}
.form_p_g{color:#888}
</style>