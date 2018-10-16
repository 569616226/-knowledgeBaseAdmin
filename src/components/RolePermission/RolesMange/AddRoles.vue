<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'RolesMange'}">
						<i class="iconfont icon-07jiantouxiangzuo"></i>
					</router-link>
					<font color="#666666">系统设置 / 权限管理 / </font>
					<router-link :to="{name: 'RolesMange'}">
						<font color="#048aff">{{ $route.meta.title }}</font>
					</router-link>
				</div>
				<el-form @submit.native.prevent class="margin-top-lg" :label-position="labelPosition" label-width="130px" :model="ruleForm" ref="ruleForm" :rules="rules">

					<el-form-item prop="name" class="margin-left-lg margin-top must" label="角色名">
						<el-input class="form-input-h" v-model="ruleForm.name" placeholder="请输入"></el-input>
						<p class="form_p_g">给角色起个名字吧！</p>
					</el-form-item>

					<el-form-item prop="rolement" class="margin-left-lg margin-top rolement" label="选择权限" v-if="$route.params.id">
						<div class="tree-box">
							<!--  :default-expanded-keys="[2, 3]" -->
							<!-- 默认展开的的节点 -->
							<el-tree ref="tree" :data="data" show-checkbox node-key="id" :props="defaultProps" :default-checked-keys="per_ids">
							</el-tree>
						</div>
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
			const coltitle2 = (rule, value, callback) => {
				if(this.$refs.tree.getCheckedKeys() == '') {
					return callback(new Error('请勾选权限'));
				} else {
					callback();
				}
			};
			return {
				data: [],
				labelPosition: 'right',
				per_ids: [],
				ruleForm: {
					name: '',
					id: this.$route.params.id
				},
				rules: {
					name: [{
						required: true,
						message: '请输入角色名',
						trigger: 'blur'
					}],
					rolement: [{
						required: true,
						validator: coltitle2,
						trigger: 'blur'
					}]
				},
				loading: false,
				resetdata: false,
				defaultProps: {
					children: 'children',
					label: 'description'
				},
			}
		},
		computed: {
			...mapState([
				'PermissionsData'
			])
		},
		methods: {
			...mapActions([
				'getPermissions'
			]),
			async getdata() {
				this.loading = true
				const data = await api.getRolesDetail(this.$route.params.id)
				const data2 = await api.getPermissions()
				this.data = data2.data
				this.ruleForm.name = data.data.name
				data.data.permissions.data.forEach(e => {
					this.per_ids.push(e.id)
				})
				this.loading = false
			},
			//提交表单
			submitForm(formName) {
				let id = this.$route.params.id;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(id) {
							this.postPermissionsRoles()
						} else {
							this.postRoles()
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async postRoles() {
				this.loading = true
				const data = await api.postRoles(this.ruleForm.name)
				if(data) {
					this.$message({
						type: 'success',
						message: '提交成功'
					})
					this.$router.push({
						name: 'RolesMange'
					})
				} else {
					this.$message({
						type: 'info',
						message: '提交失败'
					})
				}
				this.loading = false
			},
			async postPermissionsRoles() {
				this.loading = true
				const data = await api.postPermissionsRoles(this.$route.params.id, this.$refs.tree.getCheckedKeys(), this.ruleForm.name)
				if(data) {
					this.$message({
						type: 'success',
						message: '提交成功'
					})
					this.$router.push({
						name: 'RolesMange'
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