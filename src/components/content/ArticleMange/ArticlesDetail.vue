<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'ArticleMange'}">
						<i class="iconfont icon-guanbi"></i>
					</router-link>
					<font color="#666666">文章管理 / </font>
					<router-link :to="{name: 'ArticleMange'}">
						<font color="#048aff">查看详情</font>
					</router-link>
				</div>
				<div class="auditDaka-row">
					<el-row :gutter="20" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="20">
								<el-col :span="2">
									<div class="auditDaka-row-left">审核状态：</div>
								</el-col>
								<el-col :span="22">
									<div v-if="data.status == '审核失败'" class="bluei">{{data.status}}</div>
									<div v-if="data.status == '审核通过'" class="green">{{data.status}}</div>
									<div v-if="data.status == '待审核'" class="red">{{data.status}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="20" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="20">
								<el-col :span="2">
									<div class="auditDaka-row-left">审核备注 ：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.remark}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
				<div class="auditDaka-title">
					<span>文章信息</span>
				</div>
				<div class="auditDaka-row">
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">文章标题：</div>
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
									<div class="auditDaka-row-left">作者 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.guest_name}}</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">申请时间：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.created_at}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">文章封面：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right"><img :src="data.guest_cover" style="max-width: 300px;" /></div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">文章内容：</div>
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
				const data = await api.getArticleDetail(this.$route.params.id)
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