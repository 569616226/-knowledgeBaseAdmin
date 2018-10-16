<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container" v-loading="loading">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'auditer'}">
						<i class="iconfont icon-guanbi"></i>
					</router-link>
					<font color="#666666">大咖审核 / </font>
					<router-link :to="{name: 'auditer'}">
						<font color="#048aff">查看详情</font>
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
									<div v-if="data.status == 0" class="bluei">{{data.status_txt}}</div>
									<div v-if="data.status == 1" class="green">{{data.status_txt}}</div>
									<div v-if="data.status == 2" class="red">{{data.status_txt}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
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
					<span>大咖信息</span>
				</div>
				<div class="auditDaka-row">
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">真实姓名：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.real_name}}</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">任职机构：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.office}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">手机号 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.phone}}</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">电子邮箱：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.email}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">所在城市 ：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.city}}</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">身份证号：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.card_id}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">专业领域：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.navs_name}}</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="12">
							<el-row :gutter="2">
								<el-col :span="4">
									<div class="auditDaka-row-left">推荐人：</div>
								</el-col>
								<el-col :span="20">
									<div class="auditDaka-row-right">{{data.referee}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">微信号：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">{{data.we_name}}</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
					<el-row :gutter="2" class="auditDaka-row-top">
						<el-col :span="24">
							<el-row :gutter="2">
								<el-col :span="2">
									<div class="auditDaka-row-left">手持身份证照 ：</div>
								</el-col>
								<el-col :span="22">
									<div class="auditDaka-row-right">
										<img :src="data.card_pic" @click="selectImg()" style="max-width: 200px;" />
									</div>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</div>
				<transition name="slide-fade" class="fadeView">
					<div v-if="show">
						<image-view :imgArr="imgArr" :imageIndex="imageIndex" :showImageView="true" v-on:hideImage="hideImageView"></image-view>
					</div>
				</transition>
			</div>
		</div>
	</div>

</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import imageView from 'vue-imageview'
	import api from '@/utils/api'
	export default {
		components: {
			imageView
		},
		data() {
			return {
				loading: false,
				data: [],
				show: false,
				imgArr: [],
				imageIndex: 0,
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
				const data = await api.getAuditDaka(this.$route.params.id)
				this.data = data.data
				this.imgArr.push(data.data.card_pic)
				this.loading = false
			},
			showImgView() {
				this.show = true
			},
			hideImageView() {
				this.show = false
			},
			selectImg() {
				this.show = true
			},
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