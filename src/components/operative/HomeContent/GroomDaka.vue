<template>
	<div>
		<div class="know-container">
			<div v-loading="loading">
				<div class="member_first">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="大咖选择">
							<el-radio v-model="ruleForm.index_type" :label="0">算法排序</el-radio>
							<el-radio v-model="ruleForm.index_type" :label="1">自定义</el-radio>
							<el-form-item prop="index_num" v-if="ruleForm.index_type == 0">
								<el-select v-model="ruleForm.index_num" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
								<p class="gray">算法说明：</p>
								<p class="gray">最热门：按浏览数排序，从高到低，显示浏览数的前6名大咖</p>
								<p class="gray">最高评分：按大咖评分排序，从高到低，显示评分最高的前6名大咖</p>
								<p class="gray">最新时间：按大咖通过审核时间，从新到旧，显示最新时间的前6名大咖</p>
							</el-form-item>
							<el-form-item v-if="ruleForm.index_type == 1">
								<p class="gray margin-bottom-sm">选择在首页推荐的大咖，最多只支持添加6位</p>
								<div class="colrecom_form" v-for="(item,index) in ruleForm.show_data">
									<img :src="item.avatar" class="colrecom_form-img" />
									<p class="colrecom_form-name">{{item.real_name}}</p>
									<p class="colrecom_form-single">{{item.single_profile}}</p>
									<i class="el-icon-error cursor" @click="deleteshowvideo(item,index)"></i>
								</div>
								<div class="colrecom_form_add cursor" @click="addclassvideo">
									<i class="el-icon-plus avatar-uploader-icon"></i>
									<p>添加大咖</p>
								</div>

							</el-form-item>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						</el-form-item>
					</el-form>
				</div>
				<!--选择大咖-->
				<el-dialog title="选择大咖" :visible.sync="previewcol" class="previewcol">
					<div class="select_show_video">
						<data-tables :data="auditerDataCom" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef" @selection-change="handleSelectionChange" ref="table">
							<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
								<el-col :span="24" class="text-align-left">
									<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索大咖姓名" class="class_input_width">
									</el-input>
								</el-col>
							</el-row>
							<el-table-column label="大咖" prop="real_id" key="real_id" sortable="custom">
								<template slot-scope="scope">
									<img :src="scope.row.avatar" class="groom-img" />
									<span class="groom-name">{{scope.row.real_name}}</span>
								</template>
							</el-table-column>
							<el-table-column type="selection" :reserve-selection="true" width="55">
							</el-table-column>
						</data-tables>
					</div>
					<div slot="footer" class="dialog-footer">
						<el-button type="primary" @click="previewcol = false">关 闭</el-button>
					</div>
				</el-dialog>
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
		data() {
			return {
				// 初始数据(用于搜索对比的)
				datafirst: [],
				// 搜索或者翻页后的操作数据
				data: [],
				order_setting: [],
				ruleForm: {
					index_type: null,
					index_num: null,
					show_data: [],
					linka_ids: [],
					linka_ids2: [],
					key: 'system_linka_index_top_settings'
				},
				rules: {
					// index_count: [{
					// 	required: true,
					// 	message: '请选择更新数量',
					// 	trigger: 'change'
					// }]
				},
				loading: false,
				options: [{
					value: 0,
					label: '按最热门排序'
				}, {
					value: 1,
					label: '按最高评分排序'
				}, {
					value: 2,
					label: '按最新时间排序'
				}],
				previewcol: false,
				tableProps: {
					border: false, //去掉边框
					stripe: false //去掉斑马纹
				},
				customFilters: [{
					vals: '',
					props: ['real_name'],
				}, {
					vals: []
				}, {
					vals: []
				}, {
					vals: []
				}, {
					vals: []
				}],
				//分页设置
				paginationDef: {
					pageSize: 10,
					pageSizes: [10, 20, 50]
				},
			}
		},
		computed: {
			...mapState([
				'auditerData'
			]),
			auditerDataCom() {
				let data = []
				this.auditerData.forEach(e => {
					if(e.status == 1) {
						data.push(e)
					}
				})
				return data
			}
		},
		methods: {
			...mapActions([
				'getAuditer'
			]),
			handleSelectionChange(val) {
				const arr = []
				val.forEach(e => {
					arr.push(e.real_id)
				})
				this.ruleForm.linka_ids2 = arr
				this.ruleForm.show_data = val
			},
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
			async patchReply() {
				this.loading = true
				if(this.ruleForm.index_type == 0) {
					this.ruleForm.linka_ids.push(this.ruleForm.index_num)
					this.order_setting.push(this.ruleForm.index_type)
					this.order_setting.push(this.ruleForm.linka_ids)
					this.ruleForm.index_count = this.order_setting
				}
				if(this.ruleForm.index_type == 1) {
					this.order_setting.push(this.ruleForm.index_type)
					this.order_setting.push(this.ruleForm.linka_ids2)
					this.ruleForm.index_count = this.order_setting
				}
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
				this.order_setting = []
				this.ruleForm.linka_ids = []
				this.loading = false
			},
			//获取数据 
			async getdata() {
				this.loading = true
				const data = await api.getReply('system_linka_index_top_settings')
				if(data.data.value[0] == 0) {
					this.ruleForm.index_type = data.data.value[0]
					this.ruleForm.index_num = data.data.value[1][0]
				} else {
					this.ruleForm.index_type = data.data.value[0]
					this.ruleForm.linka_ids2 = data.data.value[1]
				}
				await this.getAuditer()
				this.ruleForm.linka_ids2.forEach((item, index) => {
					this.auditerDataCom.forEach((item2, index2) => {
						if(item == item2.real_id) {
							this.ruleForm.show_data.push(item2)
						}
					})
				})
				this.loading = false
			},
			addclassvideo() {
				this.previewcol = true
				if(this.ruleForm.linka_ids2.length > 0) {
					this.ruleForm.linka_ids2.forEach((item, index) => {
						this.auditerDataCom.forEach((item2, index2) => {
							if(item == item2.real_id) {
								this.$nextTick(() => {
									this.$refs.table.$refs.elTable.toggleRowSelection(item2, true)
								})
							}
						})
					})
				} else {
					this.auditerDataCom.forEach((item2, index2) => {
						this.$nextTick(() => {
							this.$refs.table.$refs.elTable.toggleRowSelection(item2, false)
						})
					})
				}
			},
			clickshowvideo(row, index) {
				// 点击添加到推荐的数据组中
				this.ruleForm.show_data.push(row);
				// 把未推荐的数据组中去掉点击选中的数据
				this.datafirst.splice(this.nowG + index, 1);
				// 重置条数
				this.total_v = this.datafirst.length;
				this.previewcol = false;
			},
			deleteshowvideo(row, index) {
				this.$confirm('真的要删除此大咖吗？', '删除', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.datafirst.push(row);
					this.ruleForm.show_data.splice(index, 1);
					this.total_v = this.datafirst.length;
					this.ruleForm.linka_ids2.forEach((item, index) => {
						this.auditerDataCom.forEach((item2, index2) => {
							if(item == item2.real_id) {
								this.$nextTick(() => {
									this.ruleForm.linka_ids2.splice(index, 1)
								})
							}
						})
					})
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {

				})
			},
		},
		mounted() {
			this.getdata()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.class_input_width {
		width: 100%;
	}
	
	.groom-img {
		width: 34px;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 5px;
	}
	
	.operation_box span {
		cursor: pointer;
		color: #8E9EBB;
		margin-right: 10px;
	}
	
	.member_first {
		padding: 60px
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
		display: inline-block
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
		width: 178px;
		height: 178px;
		display: block
	}
	
	.colrecom_form {
		width: 170px;
		border: 1px solid #ccc;
		line-height: initial;
		display: inline-block;
		position: relative;
		margin: 0 15px 1rem 0;
		float: left;
		height: 161px;
		border-radius: 4px;
		text-align: center;
		padding: 50px 10px;
		&-single {
			color: #999999;
			font-size: 12px;
		}
	}
	
	.colrecom_form_add {
		width: 200px;
		border: 1px dotted #ccc;
		line-height: initial;
		display: inline-block;
		position: relative;
		margin: 0 15px 1rem 0;
		float: left;
		height: 161px;
		border-radius: 4px;
		text-align: center;
		padding: 50px 0px;
	}
	
	.colrecom_form_add>.el-icon-plus {
		height: 80px
	}
	
	.colrecom_form>img {
		width: 80px;
		border-radius: 50%;
	}
	
	.colrecom_form>p {
		line-height: normal;
		text-align: center;
		padding: 0 3px;
		word-wrap: normal;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		margin-top: 14px;
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