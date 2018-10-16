<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'AnswerMange'}">
						<i class="iconfont icon-guanbi"></i>
					</router-link>
					<font color="#666666">回答管理 / </font>
					<router-link :to="{name: 'AnswerMange'}">
						<font color="#048aff">查看问题</font>
					</router-link>
				</div>
				<div class="auditDaka-row">
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">审核状态：</div>
								</el-col>
								<el-col :span="22">
									<div v-if="data.status == '已关闭'" class="gray">{{data.status}}</div>
									<div v-if="data.status == '已回答'" class="green">{{data.status}}</div>
									<div v-if="data.status == '待回答'" class="red">{{data.status}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top" v-if="data.question">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">大咖回答 ：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.question.data.content}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
				<div class="auditDaka-title">
					<span>问题信息</span>
				</div>
				<div class="auditDaka-row">
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">问题标题：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.name}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">提问者 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.creator_name}}</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">问题金额：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.price}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">提问时间 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.created_at}}</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">问题浏览量：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.read_counts}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">查看答案人数：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.readers}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
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
				loading: false,
				data: []
			}
		},
		computed: {

		},
		methods: {
			...mapActions([
				'getAuditDaka'
			]),
			async getData() {
				this.loading = true
				const data = await api.getAnswerDetail(this.$route.params.id)
				this.data = data.data
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style lang="less" scoped>
	.auditDaka {
		&-form {
			margin-top: 30px;
			&-textarea {
				width: 50%;
			}
		}
		&-arrow {
			& .icon-guanbi {
				vertical-align: middle;
				font-size: 24px;
				color: #444444;
			}
		}
		&-title {
			padding: 30px 20px 0 20px;
			font-size: 18.0px;
			font-weight: bold;
		}
		&-row {
			margin-top: 30px;
			padding: 0 0 40px 20px;
			border-bottom: 1px solid #E3E3E3;
			&-left {
				color: #999999;
			}
			&-top {
				margin-top: 30px;
				font-size: 14.0px;
			}
		}
	}
</style>