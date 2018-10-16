<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'AdminsMange'}">
						<i class="iconfont icon-07jiantouxiangzuo"></i>
					</router-link>
					<font color="#666666">系统设置 / 账号管理 / </font>
					<router-link :to="{name: 'AdminsMange'}">
						<font color="#048aff">{{ $route.meta.title }}</font>
					</router-link>
				</div>
				<el-form @submit.native.prevent class="margin-top-lg" :label-position="labelPosition" label-width="130px" :model="ruleForm" ref="ruleForm" :rules="rules">

					<el-form-item prop="name" class="margin-left-lg margin-top must" label="姓名">
						<el-input class="form-input-h" type="text" name="username" v-model="ruleForm.name" placeholder="请输入" auto-complete="off"></el-input>
						<p class="form_p_g">输入账号使用者的姓名！</p>
					</el-form-item>

					<el-form-item prop="email" class="margin-left-lg margin-top must" label="邮箱">
						<el-input class="form-input-h" type="text" name="email" v-model="ruleForm.email" placeholder="请输入" auto-complete="off"></el-input>
						<p class="form_p_g">输入账号使用者的邮箱！</p>
					</el-form-item>

					<el-form-item prop="password" class="margin-left-lg margin-top must" label="密码">
						<el-input class="form-input-h" type="password" name="password" v-model="ruleForm.password" placeholder="请输入" auto-complete="new-password"></el-input>
						<p class="form_p_g">输入账号使用者的密码！</p>
					</el-form-item>

					<el-form-item prop="roles" class="margin-left-lg margin-top must" label="选择角色" v-if="$route.params.id">
						<el-select v-model="ruleForm.roles" placeholder="选择角色">
							<el-option v-for="item,index in RolesData" :key="index" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item class="text-center margin-top-lg">
						<el-button :disabled="loading" type="primary" @click="submitForm('ruleForm')">提交</el-button>
						<el-button @click="resetForm('ruleForm')">返回</el-button>
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
				per_ids: [],
				ruleForm: {
					name: '',
					email: '',
					password: '',
					roles: '',
					id: this.$route.params.id
				},
				rules: {
					name: [{
						required: true,
						message: '请输入角色名',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: '请输入账号邮箱',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入账号密码',
						trigger: 'blur'
					}],
					roles: [{
						required: true,
						message: '请选择角色',
						trigger: 'change'
					}],
				},
				loading: false,
				resetdata: false
			}
		},
		computed: {
			...mapState([
				'RolesData'
			])
		},
		methods: {
			...mapActions([
				'getRoles'
			]),
			async getdata() {
				this.loading = true
				const data = await api.getAdminsDetail(this.$route.params.id)
				if(this.RolesData.length == 0) {
					this.loading = true
				}
				await this.getRoles()
				this.data = data.data
				this.ruleForm.name = data.data.name
				this.ruleForm.email = data.data.email
				this.RolesData.forEach(e => {
					if(e.name == data.data.role_names){
						this.ruleForm.roles = e.id
					}
				})
				this.loading = false
			},
			//提交表单
			submitForm(formName) {
				let id = this.$route.params.id;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(id) {
							this.putAdmins()
						} else {
							this.postAdmins()
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async postAdmins() {
				this.loading = true
				const data = await api.postAdmins(this.ruleForm)
				if(data) {
					this.$message({
						type: 'success',
						message: '提交成功'
					})
					this.$router.push({
						name: 'AdminsMange'
					})
				} else {
					this.$message({
						type: 'info',
						message: '提交失败'
					})
				}
				this.loading = false
			},
			async putAdmins() {
				this.loading = true
				if(this.ruleForm.email == this.data.email){
					delete this.ruleForm.email
				}
				const data = await api.putAdmins(this.ruleForm)
				const data2 = await api.postAdminsrole(this.ruleForm)
				if(data && data2) {
					this.$message({
						type: 'success',
						message: '提交成功'
					})
					this.$router.push({
						name: 'AdminsMange'
					})
				} else {
					this.$message({
						type: 'info',
						message: '提交失败'
					})
				}
				this.loading = false
			},
			resetForm(formName) {
				//this.$refs[formName].resetFields();
				if(this.resetdata) {
					this.$confirm('真的要退出此次编辑？', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消'
					}).then(() => {
						window.history.go(-1)
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						})
					})
				} else {
					window.history.go(-1)
				}
			}
		},
		mounted: function() {
			if(this.$route.params.id) {
				this.getdata();
			}
		},
		watch: {
			ruleForm: {
				handler(curVal, oldVal) {
					this.resetdata = true
				},
				deep: true
			}
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
<style>
	.rolement>label:before {
		content: '*';
		color: #fa5555;
		margin-right: 4px
	}
</style>