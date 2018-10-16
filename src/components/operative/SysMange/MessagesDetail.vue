<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}（{{ data.msg_type }}消息）</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'SysMange'}">
						<i class="iconfont icon-guanbi"></i>
					</router-link>
					<font color="#666666">系统消息管理 / 群发消息 / </font>
					<router-link :to="{name: 'SysMange'}">
						<font color="#048aff">查看详情</font>
					</router-link>
				</div>
				<div class="auditDaka-title">
					<span>消息详情</span>
				</div>
				<div class="auditDaka-row">
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">消息标题：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.title}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">消息类型 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.msg_type}}</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">发布人 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.sender}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">发布人时间：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.created_at}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">接收人 ：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.group_name}}（{{data.reciver_names}}）</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">消息内容 ：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right" v-html="data.content"></div>
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
				const data = await api.getMessagesDetail(this.$route.params.id)
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