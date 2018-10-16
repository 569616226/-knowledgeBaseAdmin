<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}({{ $route.query.title }})</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'NavsMange'}">
						<i class="iconfont icon-07jiantouxiangzuo"></i>
					</router-link>
					<font color="#666666">首页内容设置 /分类管理 / </font>
					<router-link :to="{name: 'NavsMange'}">
						<font color="#048aff">{{ $route.query.title }}</font>
					</router-link>
				</div>
				<el-form @submit.native.prevent class="margin-top-lg" :label-position="labelPosition" label-width="130px" :model="dynamicValidateForm" ref="dynamicValidateForm">

					<el-form-item v-for="item,index in dynamicValidateForm.data" :key="index" class="margin-left-lg margin-top must" :label="'子分类' + (index + 1)" :prop="'data.' + index + '.name'" :rules="{required: true, message: '域名不能为空', trigger: 'blur'}" v-if="item.del == false">
						<el-input class="form-input-h" v-model="item.name" placeholder="请输入"></el-input>
						<span class="form-input-delete" @click="delChildren(index)">删除</span>
					</el-form-item>
					<p class="form-add" @click="addChildren">添加子分类</p>
					<el-form-item class="text-center margin-top-lg">
						<el-button :disabled="loading" type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
						<el-button @click="resetForm('dynamicValidateForm')">返回</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import { formatChildrenNav } from '@/utils'
	export default {
		data() {
			return {
				dynamicValidateForm: {
					data: []
				},
				labelPosition: 'right',
				nav_names: [],
				rules: {
					name: [{
						required: true,
						message: '请输入栏目名称',
						trigger: 'blur'
					}]
				},
				loading: false,
				resetdata: false
			}
		},
		computed: {
			...mapState([
				'NavsData'
			])
		},
		methods: {
			...mapActions([
				'getNavs'
			]),
			async getdata() {
				this.loading = true
				const data = await api.getChildrenNav(this.$route.params.id)
				let formData = []
				data.data.forEach(e => {
					formData.push(formatChildrenNav(e))
				})
				formData.forEach(e => {
					e.del = false
				})
				this.dynamicValidateForm.data = formData
				this.loading = false
			},
			//提交表单
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.patchChildrenNav()
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async patchChildrenNav() {
				this.loading = true
				const data = await api.patchChildrenNav(this.$route.params.id, this.dynamicValidateForm.data)
				if(data) {
					this.$message({
						type: 'success',
						message: '提交成功'
					})
					this.$router.push({
						name: 'NavsMange'
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
			},
			addChildren() {
				this.dynamicValidateForm.data.push({
					name: '',
					id: null,
					del: false
				})
			},
			delChildren(index) {
				this.dynamicValidateForm.data[index].del = true
			}
		},
		mounted: function() {
			if(this.$route.params.id) {
				this.getdata();
			}

		},
		watch: {
			dynamicValidateForm: {
				handler(curVal, oldVal) {
					this.resetdata = true
				},
				deep: true
			}
		}
	}
</script>
<style lang="less" scoped>
	.form-add {
		color: #3595FF;
		font-size: 14.0px;
		margin-left: 170px;
		cursor: pointer;
	}
	
	.form-input-delete {
		color: #b0b0b0;
		margin-left: 10px;
		cursor: pointer;
	}
	
	.auditDaka {
		&-arrow {
			& .icon-07jiantouxiangzuo {
				vertical-align: middle;
				font-size: 24px;
				color: #444444;
			}
		}
	}
	
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