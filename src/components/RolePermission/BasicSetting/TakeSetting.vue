<template>
	<div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<el-form @submit.native.prevent class="margin-top-lg" :label-position="labelPosition" label-width="130px" :model="ruleForm" ref="ruleForm" :rules="rules">

					<el-form-item prop="take" class="margin-left-lg margin-top must" label="大咖约见" label-width="150px">
						<div>
							<el-select v-model="select1"  placeholder="平台" class="class_select_width">
								<el-option label="平台" value=""></el-option>
							</el-select>
							<el-input class="form-input-h" v-model="ruleForm.take1" placeholder="分成占比" @input="checkNo('take1')"></el-input>
							<span class="margin-left-sm">%</span>
						</div>
						<div>
							<el-select v-model="select1"  placeholder="大咖" class="class_select_width">
								<el-option label="大咖" value=""></el-option>
							</el-select>
							<el-input class="form-input-h margin-top-sm" v-model="ruleForm.take2" placeholder="分成占比" @input="checkNo('take2')"></el-input>
							<span class="margin-left-sm">%</span>
						</div>
						<p class="form_p_g">设置指定在收入中的占比，大咖约见用户的收入，平台需抽取一定比例的服务费</p>
					</el-form-item>

					<el-form-item prop="answer" class="margin-left-lg margin-top must" label="大咖回答问题" label-width="150px">
						<div>
							<el-select v-model="select1"  placeholder="平台" class="class_select_width">
								<el-option label="平台" value=""></el-option>
							</el-select>
							<el-input class="form-input-h" v-model="ruleForm.answer1" placeholder="分成占比" @input="checkNo('answer1')"></el-input>
							<span class="margin-left-sm">%</span>
						</div>
						<div>
							<el-select v-model="select1"  placeholder="大咖" class="class_select_width">
								<el-option label="大咖" value=""></el-option>
							</el-select>
							<el-input class="form-input-h margin-top-sm" v-model="ruleForm.answer2" placeholder="分成占比" @input="checkNo('answer2')"></el-input>
							<span class="margin-left-sm">%</span>
						</div>
						<p class="form_p_g">设置指定在收入中的占比，大咖回答问题的收入，平台需抽取一定比例的服务费</p>
					</el-form-item>
					
					<el-form-item prop="check" class="margin-left-lg margin-top must" label="答案被查看" label-width="150px">
						<div>
							<el-select v-model="select1"  placeholder="平台" class="class_select_width">
								<el-option label="平台" value=""></el-option>
							</el-select>
							<el-input class="form-input-h" v-model="ruleForm.check1" placeholder="分成占比" @input="checkNo('check1')"></el-input>
							<span class="margin-left-sm">%</span>
						</div>
						<div>
							<el-select v-model="select1"  placeholder="大咖" class="class_select_width">
								<el-option label="大咖" value=""></el-option>
							</el-select>
							<el-input class="form-input-h margin-top-sm" v-model="ruleForm.check2" placeholder="分成占比" @input="checkNo('check2')"></el-input>
							<span class="margin-left-sm">%</span>
						</div>
						<div>
							<el-select v-model="select1"  placeholder="提问人" class="class_select_width">
								<el-option label="提问人" value=""></el-option>
							</el-select>
							<el-input class="form-input-h margin-top-sm" v-model="ruleForm.check3" placeholder="分成占比" @input="checkNo('check3')"></el-input>
							<span class="margin-left-sm">%</span>
						</div>
						<p class="form_p_g">设置指定在收入中的占比，大咖回答问题的收入，平台需抽取一定比例的服务费</p>
					</el-form-item>
					
					<el-form-item prop="wei" class="margin-left-lg margin-top must" label="违约金抽成" label-width="150px">
						<div>
							<el-select v-model="select1"  placeholder="平台" class="class_select_width">
								<el-option label="平台" value=""></el-option>
							</el-select>
							<el-input class="form-input-h" v-model="ruleForm.wei1" placeholder="收取比例" @input="checkNo('wei1')"></el-input>
							<span class="margin-left-sm">%</span>
						</div>
						<p class="form_p_g">设置指定比例后，当用户/大咖取消订单时，支付违约金平台会收取一定比例的服务费</p>
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
			const coltitle1 = (rule, value, callback) => {
				if(this.ruleForm.take1 == '' || this.ruleForm.take2 == '') {
					return callback(new Error('请填写分成'))
				} else {
					callback()
				}
			}
			const coltitle2 = (rule, value, callback) => {
				if(this.ruleForm.answer1 == '' || this.ruleForm.answer2 == '') {
					return callback(new Error('请填写分成'))
				} else {
					callback()
				}
			}
			const coltitle3 = (rule, value, callback) => {
				if(this.ruleForm.check1 == '' || this.ruleForm.check2 == '' || this.ruleForm.check3 == '') {
					return callback(new Error('请填写分成'))
				} else {
					callback()
				}
			}
			const coltitle4 = (rule, value, callback) => {
				if(this.ruleForm.wei1 == '') {
					return callback(new Error('请填写比例'))
				} else {
					callback()
				}
			}
			return {
				data: [],
				labelPosition: 'right',
				takeData: [],
				answerData: [],
				checkData: [],
				weiData: [],
				order_setting: [],
				select1: '',
				ruleForm: {
					take1: '',
					take2: '',
					answer1: '',
					answer2: '',
					check1: '',
					check2: '',
					check3: '',
					wei1: '',
					key: 'system_take_settings'
				},
				rules: {
					take: [{
						required: true,
						validator: coltitle1,
						trigger: 'blur'
					}],
					answer: [{
						required: true,
						validator: coltitle2,
						trigger: 'blur'
					}],
					check: [{
						required: true,
						validator: coltitle3,
						trigger: 'blur'
					}],
					wei: [{
						required: true,
						validator: coltitle4,
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
				const data = await api.getReply('system_take_settings')
				this.ruleForm.take1 = data.data.value[0][0]
				this.ruleForm.take2 = data.data.value[0][1]
				this.ruleForm.answer1 = data.data.value[1][0]
				this.ruleForm.answer2 = data.data.value[1][1]
				this.ruleForm.check1 = data.data.value[2][0]
				this.ruleForm.check2 = data.data.value[2][1]
				this.ruleForm.check3 = data.data.value[2][2]
				this.ruleForm.wei1 = data.data.value[3][0]
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
				const take = Number(this.ruleForm.take1)+Number(this.ruleForm.take2)
				const answer = Number(this.ruleForm.answer1)+Number(this.ruleForm.answer2)
				const check = Number(this.ruleForm.check1)+Number(this.ruleForm.check2)+Number(this.ruleForm.check3)
				const wei = Number(this.ruleForm.wei1)
				console.log(take)
				if(take > 100){
					this.$message({
						type: 'info',
						message: '大咖约见比例不能超过100%'
					})
					return false
				}
				if(answer > 100){
					this.$message({
						type: 'info',
						message: '大咖回答问题比例不能超过100%'
					})
					return false
				}
				if(check > 100){
					this.$message({
						type: 'info',
						message: '答案被查看比例不能超过100%'
					})
					return false
				}
				if(wei > 100){
					this.$message({
						type: 'info',
						message: '违约金抽成比例不能超过100%'
					})
					return false
				}
				this.loading = true
				this.takeData.push(this.ruleForm.take1)
				this.takeData.push(this.ruleForm.take2)
				this.answerData.push(this.ruleForm.answer1)
				this.answerData.push(this.ruleForm.answer2)
				this.checkData.push(this.ruleForm.check1)
				this.checkData.push(this.ruleForm.check2)
				this.checkData.push(this.ruleForm.check3)
				this.weiData.push(this.ruleForm.wei1)
				this.order_setting.push(this.takeData)
				this.order_setting.push(this.answerData)
				this.order_setting.push(this.checkData)
				this.order_setting.push(this.weiData)
				this.ruleForm.index_count = this.order_setting
				const data = await api.patchReply(this.ruleForm)
				if(data) {
					this.$message({
						type: 'success',
						message: '提交成功'
					})
				} else {
					this.$message({
						type: 'info',
						message: '提交失败'
					})
				}
				this.takeData = []
				this.answerData = []
				this.checkData = []
				this.weiData = []
				this.order_setting = []
				this.loading = false
			},
			checkNo(name) {
				if(name == 'take1') {
					this.$nextTick(() => {
						this.ruleForm.take1 = this.$valid.onlynumber(this.ruleForm.take1)
					})
				}
				if(name == 'take2') {
					this.$nextTick(() => {
						this.ruleForm.take2 = this.$valid.onlynumber(this.ruleForm.take2)
					})
				}
				if(name == 'answer1') {
					this.$nextTick(() => {
						this.ruleForm.answer1 = this.$valid.onlynumber(this.ruleForm.answer1)
					})
				}
				if(name == 'answer2') {
					this.$nextTick(() => {
						this.ruleForm.answer2 = this.$valid.onlynumber(this.ruleForm.answer2)
					})
				}
				if(name == 'check1') {
					this.$nextTick(() => {
						this.ruleForm.check1 = this.$valid.onlynumber(this.ruleForm.check1)
					})
				}
				if(name == 'check2') {
					this.$nextTick(() => {
						this.ruleForm.check2 = this.$valid.onlynumber(this.ruleForm.check2)
					})
				}
				if(name == 'check3') {
					this.$nextTick(() => {
						this.ruleForm.check3 = this.$valid.onlynumber(this.ruleForm.check3)
					})
				}
				if(name == 'wei1') {
					this.$nextTick(() => {
						this.ruleForm.wei1 = this.$valid.onlynumber(this.ruleForm.wei1)
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
	.class_select_width{
		width: 100px;
	}
	.form-input-h {
		width: 250px
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