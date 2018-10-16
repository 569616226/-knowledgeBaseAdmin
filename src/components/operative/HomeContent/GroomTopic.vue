<template>
	<div>
		<div class="know-container">
			<div v-loading="loading">
				<div class="member_first">
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						<el-form-item label="话题选择">
							<el-radio v-model="ruleForm.index_type" :label="0">算法排序</el-radio>
							<el-radio v-model="ruleForm.index_type" :label="1">自定义</el-radio>
							<el-form-item prop="index_num" v-if="ruleForm.index_type == 0">
								<el-select v-model="ruleForm.index_num" placeholder="请选择">
									<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
								<p class="gray">算法说明：</p>
								<p class="gray">最热门：按浏览数排序，从高到低，显示浏览最高的前5名话题</p>
								<p class="gray">评分：按话题的平均分排序，从高到低，现在话题平均分最高的前5名话题</p>
							</el-form-item>
							<el-form-item v-if="ruleForm.index_type == 1">
								<p class="gray margin-bottom-sm">选择在首页推荐的话题，最多支持推荐5个话题</p>
								<div class="colrecom_form" v-for="(item,index) in ruleForm.show_data">
									<img :src="item.guest.data.cover" />
									<p>{{item.title}}</p>
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
				<el-dialog title="选择大咖" :visible.sync="previewcol" class="previewcol" width="65%">
					<div class="select_show_video">
						<el-input placeholder="请输入内容" @keyup.enter.native="search_fi()" v-model="search_video" class="input-with-select input_search_video margin-bottom-sm">
							<el-button @click="search_fi()" slot="append">搜索</el-button>
						</el-input>
						<span class="span_search_video">这里显示已通过审核的话题</span>
						<div class="colrecom_form cursor" v-for="(item,index) in auditerDataCom.slice(nowG,nowG+6)" @click="clickshowvideo(item,index)" v-if="item.status == '审核通过'">
							<img :src="item.guest.data.cover" />
							<p>{{item.title}}</p>
						</div>
						<p class="form_p_g"></p>
						<div class="block show_page">
							<el-pagination @current-change="handleCurrentChange" :current-page.sync="nowPage" :page-size="pagesize_v" layout="prev, pager, next, total" :total="total_v">
							</el-pagination>
							<!-- :current-page="nowPage" 当前页面 -->
						</div>
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
					key: 'system_topic_index_top_settings'
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
				}],
				previewcol: false,
				search_video: '',
				// 分页功能
				pagesize_v: 6, //每页个数   number类型
				total_v: 0, //总个数	 number类型
				nowPage: 1, //当前页数
				nowG: 0 //当前页面的第一个是全部数据中的第几个（默认是第一个）
			}
		},
		computed: {
			...mapState([
				'topicsData'
			]),
			auditerDataCom() {
				let data = []
				this.topicsData.forEach(e => {
					if(e.status == '审核通过') {
						data.push(e)
					}
				})
				return data
			}
		},
		methods: {
			...mapActions([
				'getTopics'
			]),
			//搜索
			async search_fi() {
				this.data = []
				this.$store.commit('topicsData', this.data)
				await this.getTopics()
				for(var i in this.auditerDataCom) {
					if(this.auditerDataCom[i].title.indexOf(this.search_video) !== -1 && this.search_video != '') {
						console.log(i, ":", this.auditerDataCom[i]);
						this.data.push(this.auditerDataCom[i])
					}
					if(this.search_video == ''){
						this.data.push(this.topicsData[i])
					}
				}
				console.log(this.$store)
				this.$store.commit('topicsData', this.data)
				this.total_v = this.data.length;
				this.nowPage = 1; //搜索完之后把当前页数跳转到第一页
			},
			handleCurrentChange(val) {
				this.nowG = (val - 1) * 6;
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
				this.ruleForm.linka_ids2 = []
				if(this.ruleForm.index_type == 0) {
					this.ruleForm.linka_ids.push(this.ruleForm.index_num)
					this.order_setting.push(this.ruleForm.index_type)
					this.order_setting.push(this.ruleForm.linka_ids)
					this.ruleForm.index_count = this.order_setting
				}
				if(this.ruleForm.index_type == 1) {
					this.order_setting.push(this.ruleForm.index_type)
					this.ruleForm.show_data.forEach(e => {
						this.ruleForm.linka_ids2.push(e.real_id)
					})
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
				this.ruleForm.linka_ids2 = []
				this.loading = false
			},
			//获取数据 
			async getdata() {
				this.loading = true
				const data = await api.getReply('system_topic_index_top_settings')
				if(data.data.value[0] == 0) {
					this.ruleForm.index_type = data.data.value[0]
					this.ruleForm.index_num = data.data.value[1][0]
				} else {
					this.ruleForm.index_type = data.data.value[0]
					this.ruleForm.linka_ids2 = data.data.value[1]
				}
				await this.getTopics()
				// 赋值分页个数
				this.total_v = this.auditerDataCom.length;
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
				this.ruleForm.show_data.forEach((item, index) => {
					this.auditerDataCom.forEach((item2, index2) => {
						if(item.real_id == item2.real_id) {
							this.auditerDataCom.splice(index2, 1);
						}
					})
				})
			},
			clickshowvideo(row, index) {
				// 点击添加到推荐的数据组中
				this.ruleForm.show_data.push(row);
				// 把未推荐的数据组中去掉点击选中的数据
				this.auditerDataCom.splice(this.nowG + index, 1);
				// 重置条数
				this.total_v = this.auditerDataCom.length;
				this.previewcol = false;
			},
			deleteshowvideo(row, index) {
				this.$confirm('真的要删除此大咖吗？', '删除', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.auditerDataCom.push(row);
					this.ruleForm.show_data.splice(index, 1);
					this.total_v = this.auditerDataCom.length;
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
		width: 100%;
		height: 115px;
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