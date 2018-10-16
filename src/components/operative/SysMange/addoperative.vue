<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'SeedMessage'}">
						<i class="iconfont icon-07jiantouxiangzuo"></i>
					</router-link>
					<font color="#666666">系统消息管理 / 群发消息 / </font>
					<router-link :to="{name: 'SeedMessage'}">
						<font color="#048aff">{{ $route.meta.title }}</font>
					</router-link>
				</div>
			</div>
			<el-form v-loading="loading" class="margin-top-lg" :label-position="labelPosition" label-width="130px" :model="ruleForm" ref="ruleForm" :rules="rules">

				<el-form-item prop="title" class="margin-left-lg margin-top" label="消息标题">
					<el-input class="form-input-h" v-model="ruleForm.title" placeholder="请输入"></el-input>
					<p class="form_p_g">请给消息起个引人注目的名字吧！</p>
				</el-form-item>

				<el-form-item prop="label_id" class="margin-left-lg margin-top" label="选择接收人">
					<el-select v-model="ruleForm.label_id" placeholder="请选择">
						<el-option v-for="item,index in GroupsData" :key="index" :label="item.name" :value="item.real_id">
						</el-option>
					</el-select>
					<p class="form_p_g">请选择接受消息的用户类型！</p>
				</el-form-item>

				<el-form-item prop="content" class="margin-left-lg margin-top noborder" label="消息内容">
					<vue-html5-editor :content="ruleForm.content" :z-index="10" @change="updateData" :auto-height="true"></vue-html5-editor>
					<p class="form_p_g">由于发送的消息为纯文本信息，所以不能换行和设置字体属性。</p>
				</el-form-item>

				<el-form-item class="text-center margin-top-lg">
					<el-button :disabled="loading" type="primary" @click="submitForm('ruleForm')">提交</el-button>
					<el-button @click="resetForm('ruleForm')">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	export default {
		data() {
			return {
				labelPosition: 'right',
				ruleForm: {
					title: '',
					label_id: '',
					content: '',
					type: 2
				},
				rules: {
					title: [{
						required: true,
						message: '请输入消息标题',
						trigger: 'blur'
					}],
					label_id: [{
						type: 'number',
						required: true,
						message: '请选择接收人',
						trigger: 'blur'
					}],
					content: [{
						required: true,
						message: '请选择接收人',
						trigger: 'blur'
					}]
				},
				loading: false,
				resetdata: false
			}
		},
		components: {},
		computed: {
			...mapState([
				'GroupsData'
			])
		},
		methods: {
			...mapActions([
				'getGroups'
			]),
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.postOperative(this.ruleForm)
					} else {
						console.log('error submit!!');
						return false;
					}
				});
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
					window.history.go(-1);
				}

			},
			// 更新富文本内容，实现双向数据绑定
			updateData: function(data) {
				this.ruleForm.content = data
			},
			// 获取用户标签列表
			async getUserLabel() {
				if(this.GroupsData.length == 0){
					this.loading = true
				}
				await this.getGroups()
				this.loading = false
			},
			async postOperative() {
				this.loading = true
				const data = await api.postOperative(this.ruleForm)
				if(data) {
					this.$message({
						message: '提交成功',
						type: 'success'
					})
					this.$router.push({
						name: "SysMange"
					})

				} else {
					this.$message.error('提交失败');
				}
				this.loading = false
			}
		},

		mounted: function() {
			this.getUserLabel();
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
<style>
	.form-input-h {
		width: 400px
	}
	
	.form_p_g {
		color: #888
	}
	
	.noborder .vue-html5-editor>.toolbar {
		display: none
	}
	
	.avatar-uploader_inofor .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden
	}
	
	.avatar-uploader_inofor .el-upload:hover {
		border-color: #409EFF
	}
	
	.avatar-uploader-icon_inofor {
		font-size: 28px;
		color: #8c939d;
		width: 278px;
		height: 278px;
		line-height: 278px;
		text-align: center
	}
	
	.avatar_inofor {
		width: 480px;
		height: 270px;
		display: block
	}
	
	.course_first {
		height: 46px;
		line-height: 46px;
		border: 1px solid #e3e3e3;
		border-radius: 2px;
		padding: 0 20px;
		font-size: 16px;
		background: #F5F5F5
	}
	
	.cursor .el-input.is-disabled .el-input__icon {
		cursor: pointer
	}
	
	.form_input_g {
		width: 430px
	}
	
	.form_input_inner {
		width: 214px
	}
	
	.el-form-item__error {
		position: relative
	}
</style>