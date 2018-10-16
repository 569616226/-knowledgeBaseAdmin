<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'NavsMange'}">
						<i class="iconfont icon-07jiantouxiangzuo"></i>
					</router-link>
					<font color="#666666">首页内容设置 /分类管理 / </font>
					<router-link :to="{name: 'NavsMange'}">
						<font color="#048aff">{{ $route.meta.title }}</font>
					</router-link>
				</div>
				<el-form @submit.native.prevent class="margin-top-lg" :label-position="labelPosition" label-width="130px" :model="ruleForm" ref="ruleForm" :rules="rules">

					<el-form-item prop="icon" class="margin-left-lg" label="栏目图标">
						<el-upload name="img_url" :headers="uploadheaders" class="avatar-uploader" :action="uploadimgurl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
							<img v-if="ruleForm.icon" :src="ruleForm.icon" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<p class="form_p_g">只能上传jpg/png文件，且不超过1MB，图片尺寸要在250x250px。</p>
					</el-form-item>

					<el-form-item prop="name" class="margin-left-lg margin-top must" label="栏目标题">
						<el-input class="form-input-h" v-model="ruleForm.name" placeholder="请输入"></el-input>
						<p class="form_p_g">为栏目起个响亮的名字吧！</p>
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
				if(!value) {
					return callback(new Error('栏目名称不能为空'));
				}
				if(this.nav_names.indexOf(value) != -1) {
					callback(new Error('栏目已存在'))
				} else {
					callback();
				}
			};
			return {
				data: [],
				labelPosition: 'right',
				nav_names: [],
				ruleForm: {
					icon: '',
					name: '',
					id: this.$route.params.id
				},
				rules: {
					icon: [{
						required: true,
						message: '请选择栏目图标',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						validator: coltitle2,
						trigger: 'blur'
					}]
				},
				loading: false,
				resetdata: false,
				//上传头像请求地址的头部信息
				uploadheaders: {
					Accept: 'application/json',
					Authorization: 'Bearer ' + getCookie('token')
				},
				uploadimgurl: this.$uploadimgurl

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
				const data = await api.getNavDetail(this.$route.params.id)
				this.ruleForm.icon = data.data.icon
				this.ruleForm.name = data.data.name
				this.loading = false
			},
			async getNavsName() {
				if(this.NavsData.length == 0) {
					this.loading = true
				}
				await this.getNavs()
				this.NavsData.forEach(e => {
					this.nav_names.push(e.name)
				})
				this.loading = false
			},
			//提交表单
			submitForm(formName) {
				let id = this.$route.params.id;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(id) {
							this.postNavsid()
						} else {
							this.postNavs()
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			async postNavs() {
				this.loading = true
				const data = await api.postNavs(this.ruleForm)
				if(data) {
					this.$message({
						type: 'success',
						message: '提交成功'
					})
					this.$router.push({
						name: 'NavsMange'
					})
				}else{
					this.$message({
						type: 'info',
						message: '提交失败'
					})
				}
				this.loading = false
			},
			async postNavsid() {
				this.loading = true
				const data = await api.postNavsid(this.ruleForm)
				if(data) {
					this.$message({
						type: 'success',
						message: '提交成功'
					})
					this.$router.push({
						name: 'NavsMange'
					})
				}else{
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
			handleAvatarSuccess(res, file) {
				// this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
				this.ruleForm.icon = res.img_url
			},
			beforeAvatarUpload(file) {
				let isJPGorPNG = false;
				if(file.type === 'image/jpeg' || file.type === 'image/png') {
					isJPGorPNG = true;
				}
				const isLt1M = file.size / 1024 / 1024 < 1;
				if(!isJPGorPNG) {
					this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
				}
				if(!isLt1M) {
					this.$message.error('上传头像图片大小不能超过 1MB!');
				}
				return isJPGorPNG && isLt1M;
			}
		},
		mounted: function() {
			if(this.$route.params.id) {
				this.getdata();
			}else{
				this.getNavsName()
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