<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container">
			<div class="auditDaka">
				<div class="auditDaka-arrow">
					<router-link :to="{name: 'SysMange'}">
						<i class="iconfont icon-07jiantouxiangzuo"></i>
					</router-link>
					<font color="#666666">系统消息管理 / 群发消息 / </font>
					<router-link :to="{name: 'SysMange'}">
						<font color="#048aff">发消息</font>
					</router-link>
				</div>
				<div class="margin-top-lg">
					<p class="title">选择群发消息类型</p>
					<p class="titleSmall">选择类型后，发送消息会推送用户的微信公众号中</p>
					<div class="chooseBox">
						<div class="choose" @click="$router.push({name: 'addoperative'})">
							<div class="choose_main">
								<i class="iconfont icon-ic_chat"></i>
								<p class="tips">纯文本消息</p>
							</div>
							<div class="choose_footer">
								用于发布纯文本格式的消息，可对文字进行排版，适用于群发普通消息
							</div>
						</div>
						<div class="choose" @click="$router.push({name: 'addImgAndText'})">
							<div class="choose_main">
								<i class="iconfont icon-ic_photo"></i>
								<p class="tips">图文消息</p>
							</div>
							<div class="choose_footer">
								用于发布纯文本格式的消息，可对文字进行排版，适用于群发普通消息
							</div>
						</div>
						<div class="choose">
							<div class="choose_main">
								<i class="iconfont icon-face"></i>
								<p class="tips">敬请期待</p>
							</div>
							<div class="choose_footer">
								用于发布纯文本格式的消息，可对文字进行排版，适用于群发普通消息
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		components: {},
		methods: {

		},

		mounted: function() {

		},
		watch: {

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
			& .icon-07jiantouxiangzuo {
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
	
	.title {
		color: #3595FF;
		font-size: 24px;
		text-align: center;
		line-height: 35px;
		font-weight: bold;
	}
	
	.titleSmall {
		margin-top: 10px;
		font-size: 14px;
		text-align: center;
		line-height: 20px;
	}
	
	.chooseBox {
		text-align: center
	}
	
	.choose {
		cursor: pointer;
		display: inline-block;
		padding: 10px;
		color: #616166;
		background: #F4F6F8;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 40px
	}
	
	.choose i {
		font-size: 100px;
		color: #8E8E94
	}
	
	.tips {
		font-size: 16px
	}
	
	.choose_main {
		padding: 40px 80px
	}
	
	.choose_footer {
		border-top: 1px solid #DFE0E1;
		padding: 20px;
		font-size: 13px;
		line-height: 24px;
		max-width: 260px
	}
	
	.choose:hover {
		background: #3595FF;
		color: #FFF
	}
	
	.choose:hover i {
		color: #FFF
	}
</style>