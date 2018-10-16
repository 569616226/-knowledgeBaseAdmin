<template>
	<div>
		<div class="page-title">
			<div v-if="data.status == '待付款'">设置约见时间地点</div>
			<div v-if="data.status == '已取消'">已取消约见</div>
			<div v-if="data.status == '待确认' || data.status == '已拒绝'">是否约见</div>
			<div v-if="data.status == '待评价' || data.status == '待见面' || data.status == '已完成'">确认见面</div>
		</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'MakeMange'}">
						<i class="iconfont icon-guanbi"></i>
					</router-link>
					<font color="#666666">预约管理 / </font>
					<router-link :to="{name: 'MakeMange'}">
						<font color="#048aff" v-if="data.status == '已取消'">已取消</font>
						<font color="#048aff" v-if="data.status == '待付款'">设置约见时间地点</font>
						<font color="#048aff" v-if="data.status == '待确认' || data.status == '已拒绝'">确认约见</font>
						<font color="#048aff" v-if="data.status == '待评价' || data.status == '待见面' || data.status == '已完成'">确认见面</font>
					</router-link>
				</div>
				<div class="auditDaka-title">
					<span>订单流程</span>
				</div>
				<div class="auditDaka-row" v-if="data.status_times">
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-steps :active="active" align-center finish-status="success" process-status="finish">
								<el-step title="待确认" :description="data.status_times[0]"></el-step>
								<el-step title="待付款" :description="data.status_times[1]"></el-step>
								<el-step title="待见面" :description="data.status_times[2]"></el-step>
								<el-step title="待评价" :description="data.status_times[3]"></el-step>
								<el-step title="已完成" :description="data.status_times[4]"></el-step>
							</el-steps>
						</el-col>
					</el-row>
				</div>
				<div v-if="data.status == '待付款'">
					<div class="auditDaka-title">
						<span>约见时间地点</span>
					</div>
					<div class="auditDaka-row" v-if="data.appoint_cases">
						<el-row :gutter="2" class="auditDaka-row-top">
							<el-col :span="24">
								<div class="auditDaka-row-left">用户选择约见方案后，将付款本次约见费用请耐心等候！！</div>
							</el-col>
						</el-row>
						<div v-for="item,index in data.appoint_cases.data" :key="index">
							<el-row :gutter="2" class="auditDaka-row-top">
								<el-col :span="24">
									<div class="auditDaka-row-fang">{{item.name}}</div>
								</el-col>
							</el-row>
							<el-row :gutter="2" class="auditDaka-row-top">
								<el-col :span="12">
									<el-row :gutter="2">
										<el-col :span="4">
											<div class="auditDaka-row-left">约见时间 ：</div>
										</el-col>
										<el-col :span="20">
											<div class="auditDaka-row-right">{{item.appoint_time}}</div>
										</el-col>
									</el-row>
								</el-col>
								<el-col :span="12">
									<el-row :gutter="2">
										<el-col :span="4">
											<div class="auditDaka-row-left">约见地点：</div>
										</el-col>
										<el-col :span="20">
											<div class="auditDaka-row-right">{{item.location}}</div>
										</el-col>
									</el-row>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
				<div v-if="data.status == '已取消'">
					<div class="auditDaka-title">
						<span>取消原因</span>
					</div>
					<div class="auditDaka-row">
						<el-row :gutter="2" class="auditDaka-row-top">
							<el-col :span="24">
								<el-row :gutter="2">
									<el-col :span="2">
										<div class="auditDaka-row-left">取消人 ：</div>
									</el-col>
									<el-col :span="22">
										<div class="auditDaka-row-right">{{data.canceler}}</div>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
						<el-row :gutter="2" class="auditDaka-row-top">
							<el-col :span="24">
								<el-row :gutter="2">
									<el-col :span="2">
										<div class="auditDaka-row-left">取消原因 ：</div>
									</el-col>
									<el-col :span="22">
										<div class="auditDaka-row-right">{{data.cancel_res}}</div>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</div>
				</div>
				<div v-if="data.status == '已拒绝'">
					<div class="auditDaka-title">
						<span>拒绝原因</span>
					</div>
					<div class="auditDaka-row">
						<el-row :gutter="2" class="auditDaka-row-top">
							<el-col :span="24">
								<el-row :gutter="2">
									<el-col :span="2">
										<div class="auditDaka-row-left">大咖说 ：</div>
									</el-col>
									<el-col :span="22">
										<div class="auditDaka-row-right">{{data.cancel_res}}</div>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</div>
				</div>
				<div v-if="data.status == '待见面' || data.status == '待评价' || data.status == '已完成' || data.status == '已取消'">
					<div class="auditDaka-title">
						<span>约见时间地点</span>
					</div>
					<div class="auditDaka-row" v-if="data.appoint_cases">
						<el-row :gutter="2" class="auditDaka-row-top">
							<el-col :span="24">
								<div class="auditDaka-row-left">用户选择约见方案后，将付款本次约见费用请耐心等候！！</div>
							</el-col>
						</el-row>
						<div v-for="item,index in data.appoint_cases.data" :key="index" v-if="item.real_id == data.case_id">
							<el-row :gutter="2" class="auditDaka-row-top">
								<el-col :span="24">
									<div class="auditDaka-row-fang">{{item.name}}</div>
								</el-col>
							</el-row>
							<el-row :gutter="2" class="auditDaka-row-top">
								<el-col :span="12">
									<el-row :gutter="2">
										<el-col :span="4">
											<div class="auditDaka-row-left">约见时间 ：</div>
										</el-col>
										<el-col :span="20">
											<div class="auditDaka-row-right">{{item.appoint_time}}</div>
										</el-col>
									</el-row>
								</el-col>
								<el-col :span="12">
									<el-row :gutter="2">
										<el-col :span="4">
											<div class="auditDaka-row-left">约见地点：</div>
										</el-col>
										<el-col :span="20">
											<div class="auditDaka-row-right">{{item.location}}</div>
										</el-col>
									</el-row>
								</el-col>
							</el-row>
						</div>
					</div>
				</div>
				<div v-if="data.status == '待评价' || data.status == '已完成'">
					<div class="auditDaka-title">
						<span>用户评价</span>
					</div>
					<div class="auditDaka-row" v-if="data.appoint_appraise">
						<el-row :gutter="2" class="auditDaka-row-top">
							<el-col :span="24">
								<el-row :gutter="2">
									<el-col :span="2">
										<div class="auditDaka-row-left">用户说 ：</div>
									</el-col>
									<el-col :span="22">
										<div class="auditDaka-row-right">{{data.appoint_appraise.data.content}}</div>
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</div>
				</div>
				<div class="auditDaka-title">
					<span>话题信息</span>
				</div>
				<div class="auditDaka-row" v-if="data.topic">
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">约见话题：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.topic.data.title}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">约见人 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.guest_name}}</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">约见大咖：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.topic.data.guest_name}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">话题类型 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.topic.data.ser_type}}</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">话题价格：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.topic.data.price}}元/次</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">服务时间 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.topic.data.ser_time}}小时/次</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">创建时间：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.topic.data.created_at}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">服务介绍：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.topic.data.describe}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
				<div class="auditDaka-title">
					<span>学员信息</span>
				</div>
				<div class="auditDaka-row" v-if="data.topic">
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">您想了解学员：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right" v-for="item,index in data.topic.data.need_infos" :key="index">{{item}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">学员提的问题：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right" v-for="item,index in data.answers" :key="index">{{item}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">学员自我介绍：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.profile}}</div>
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
			active() {
				if(this.data.status == '待付款' || this.data.status == '待确认') {
					return 1
				}
				if(this.data.status == '待见面') {
					return 2
				}
				if(this.data.status == '待评价') {
					return 3
				}
				if(this.data.status == '已完成') {
					return 5
				}
				if(this.data.status == '已拒绝' || this.data.status == '已取消') {
					return null
				}
			}
		},
		methods: {
			...mapActions([
				'getAuditDaka'
			]),
			async getData() {
				this.loading = true
				const data = await api.getMakeDetail(this.$route.params.id)
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
			&-fang {
				color: #101010;
				font-weight: bold;
			}
			&-top {
				margin-top: 30px;
				font-size: 14.0px;
			}
		}
	}
</style>