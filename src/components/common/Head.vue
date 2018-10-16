<template>
	<div class="header">
		<div class="logoImg">
			<img src="@/assets/logo.png">
			<div class="isolation"></div>
			<span>管理后台</span>
			<el-dropdown class="user_d" @command="handleCommand">
				<span class="el-dropdown-link">
            {{ UserProfile.name }} <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="editPassword">修改密码</el-dropdown-item>
					<el-dropdown-item command="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import { getCookie, delCookie } from '@/utils'
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	export default {
		name: 'Head',
		data() {
			return {

			}
		},
		computed: {
			...mapState([
				'UserProfile'
			])
		},
		methods: {
			...mapActions([
				'getUserProfile'
			]),
			handleCommand(command) {
				if(command == 'logout') {
					delCookie('token')
					this.$message({
						message: '成功退出',
						type: 'success'
					})
					this.$router.replace({
						name: 'Login'
					})
				}
				if(command == 'editPassword') {
					this.$prompt('请输入密码', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						inputPattern: /^.{6,}$/,
						inputType: 'password',
						inputErrorMessage: '密码最少要六位'
					}).then(({
						value
					}) => {
						const form = {}
						form.password = value
						form.id = this.UserProfile.id
						this.putPassword(form)
					}).catch(() => {

					});
				}
			},
			async getData() {
				if(this.UserProfile.length == 0) {
					await this.getUserProfile()
				}
			},
			async putPassword(form) {
				await api.putAdmins(form)
				this.$message({
					type: 'success',
					message: '修改成功'
				});
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<style scoped>
	.header {
		text-align: left;
		background: #FFFFFF;
		width: 100%;
		height: 60px;
		padding: 15px 30px;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	
	.logoImg img {
		width: 120px;
		height: 30px;
	}
	
	.logoImg span {
		position: relative;
		top: -10px;
		margin-right: 20px;
	}
	
	.isolation {
		display: inline-block;
		background: #D5D5D5;
		width: 2px;
		height: 30px;
		margin-left: 20px;
		margin-right: 20px;
	}
	
	.user_d {
		float: right;
		margin-top: 15px;
	}
</style>