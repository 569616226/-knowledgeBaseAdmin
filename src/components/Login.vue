<template>
	<div class='loginBox' v-loading="loading">
		<div class="login_main">
			<div class='login'>
				<img class="logoImg margin-bottom" src="@/assets/logo.png">
				<h3 class="logoText">欢迎使用链咖管理系统</h3>
				<div class="form text-center loginForm">
					<el-row>
						<el-col class="margin-bottom">
							<el-input class="inputTypein" v-model="Toform.name" placeholder="请输入用户名" prefix-icon="el-icon-erp-icon-account"></el-input>
						</el-col>
						<el-col class="margin-bottom">
							<el-input class="inputTypein" v-model="Toform.password" type="password" placeholder="请输入密码" prefix-icon="el-icon-erp-icon-lock"></el-input>
						</el-col>
						<el-col class="margin-bottom">
							<el-button type="primary" class="loginBtn" @click="login">登录</el-button>
						</el-col>
					</el-row>
				</div>
			</div>
			<!--<el-button type="success" class="loginBtn margin-top">大咖登录</el-button>-->
		</div>

	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	import { setCookie } from '@/utils'
	export default {
		name: 'Login',
		data() {
			return {
				loading: false,
				Toform: {
					name: '',
					password: ''
				}
			}
		},
		computed: {

		},
		methods: {
			...mapActions([
				'getLogin',
				'getUserProfile',
				'getMenus'
			]),
			async login() {
				if(this.Toform.name == ''){
					this.$message({
						type: 'info',
						message: '请输入账号'
					})
					return false
				}
				if(this.Toform.password == ''){
					this.$message({
						type: 'info',
						message: '请输入密码'
					})
					return false
				}
				this.loading = true
				const data = await api.getToken(this.Toform)
				if(!data.access_token){
					this.$message({
						type: 'info',
						message: data.msg
					})
					this.loading = false
					return false
				}
				setCookie('token', data.access_token, null)
				await this.getUserProfile()
				await this.getMenus()
				this.loading = false
				this.$router.replace({
					name: 'Home'
				})
			}
		},
		mounted() {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.loginBox {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url(../assets/login_bg.jpeg);
		filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
		-moz-background-size: 100% 100%;
		background-size: 100% 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.loginForm {}
	
	.logoText {
		margin-bottom: 1.6rem;
		color: #459AFF;
	}
	
	.login_main {
		margin-top: -10%;
	}
	
	.login {
		background: white;
		padding: 40px;
		width: 280px;
		text-align: center;
	}
	
	.logoImg {
		width: 150px;
		height: 40px;
	}
	
	.loginBtn {
		width: 100%;
	}
</style>