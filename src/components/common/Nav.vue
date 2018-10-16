<template>
	<div style="overflow: hidden;">
		<ul class="navBox" ref="menus">

			<!--    <li class="navPrimary">
        <span class="linka"><i class="el-icon-info"></i>首页</span>
        </li>
        <li class="navPrimary">
          <span class="linka"><i class="el-icon-info"></i>审核</span>
          <ul class="navSecond">
            <li>
             <span class="linka">大咖审核</span>
            </li>
            <li>
              <span class="linka">话题审核</span>
            </li>
            <li>
              <span class="linka">文章审核</span>
            </li>
          </ul> 
        </li> -->

			<li class="navPrimary" v-for="menu in MenusData">
				<span class="linka" :class="{active:menu.name == $route.meta.title}" @click="$router.push({name: menu.url})"><i :class="menu.icon"></i>{{ menu.name }}</span>
				<ul class="navSecond">
					<li v-for="child in menu.children" @click="$router.push({name: child.url})">
						<span class="linka" :class="{active:child.name == $route.meta.title}">{{ child.name }}</span>
					</li>
				</ul>
			</li>

		</ul>
		<div>

		</div>
	</div>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		name: 'Nav',
		data() {
			return {
				activeMenu: '',
				// name用于高亮设置，url用于跳转
				menus: [{
					id: 1,
					name: 'Home',
					url: 'Home',
					description: '首页',
					icon: 'iconfont icon-home'
				}, {
					id: 2,
					name: 'audit',
					url: 'auditer',
					description: '审核',
					icon: 'iconfont icon-checkbox-marked-circle',
					children: [{
						id: 3,
						name: 'auditer',
						url: 'auditer',
						description: '大咖审核',
						icon: '',
					}, {
						id: 4,
						name: 'auditTopic',
						url: 'auditTopic',
						description: '话题审核',
						icon: '',
					}, {
						id: 5,
						name: 'AuditArticle',
						url: 'AuditArticle',
						description: '文章审核',
						icon: '',
					}]
				}, {
					id: 6,
					name: 'content',
					url: 'AnswerMange',
					description: '内容',
					icon: 'iconfont icon-clipboard-text',
					children: [{
						id: 7,
						name: 'AnswerMange',
						url: 'AnswerMange',
						description: '问答管理',
						icon: '',
					}, {
						id: 8,
						name: 'MakeMange',
						url: 'MakeMange',
						description: '约见管理',
						icon: '',
					}, {
						id: 9,
						name: 'ArticleMange',
						url: 'ArticleMange',
						description: '文章管理',
						icon: '',
					}]
				}, {
					id: 10,
					name: 'operative',
					url: 'SysMange',
					description: '运营',
					icon: 'iconfont icon-book-open',
					children: [{
						id: 11,
						name: 'SysMange',
						url: 'SysMange',
						description: '系统消息管理',
						icon: '',
					}, {
						id: 12,
						name: 'HomeContent',
						url: 'HomeContent',
						description: '首页内容设置',
						icon: '',
					}, {
						id: 13,
						name: 'NavsMange',
						url: 'NavsMange',
						description: '分类管理',
						icon: '',
					}, {
						id: 14,
						name: 'PubnuMent',
						url: 'PubnuMent',
						description: '公众号管理',
						icon: '',
					}]
				}, {
					id: 15,
					name: 'guests',
					url: 'GuestsMange',
					description: '用户',
					icon: 'iconfont icon-account-multiple',
					children: [{
						id: 16,
						name: 'GuestsMange',
						url: 'GuestsMange',
						description: '用户管理',
						icon: '',
					}, {
						id: 17,
						name: 'DakasMange',
						url: 'DakasMange',
						description: '大咖管理',
						icon: '',
					}, {
						id: 18,
						name: 'GroupsMange',
						url: 'GroupsMange',
						description: '用户组管理',
						icon: '',
					}]
				}, {
					id: 15,
					name: 'order',
					url: 'AppointOrders',
					description: '订单',
					icon: 'iconfont icon-clipboard-check',
					children: [{
						id: 16,
						name: 'AppointOrders',
						url: 'AppointOrders',
						description: '约见订单',
						icon: '',
					}, {
						id: 17,
						name: 'AnswerOrders',
						url: 'AnswerOrders',
						description: '问答订单',
						icon: '',
					}, {
						id: 18,
						name: 'CancelsOrders',
						url: 'CancelsOrders',
						description: '违约金订单',
						icon: '',
					}]
				}, {
					id: 15,
					name: 'finance',
					url: 'ComplateOrders',
					description: '财务',
					icon: 'iconfont icon-table-large',
					children: [{
						id: 16,
						name: 'ComplateOrders',
						url: 'ComplateOrders',
						description: '交易记录',
						icon: '',
					}, {
						id: 17,
						name: 'CaseOrders',
						url: 'CaseOrders',
						description: '提现审核',
						icon: '',
					}, {
						id: 18,
						name: 'RefundOrders',
						url: 'RefundOrders',
						description: '退款审核',
						icon: '',
					}]
				}, {
					id: 15,
					name: 'RolePermission',
					url: 'PermissionsMange',
					description: '系统设置',
					icon: 'iconfont icon-settings',
					children: [{
						id: 16,
						name: 'PermissionsMange',
						url: 'PermissionsMange',
						description: '权限管理',
						icon: '',
					}, {
						id: 17,
						name: 'MenusMange',
						url: 'MenusMange',
						description: '菜单管理',
						icon: '',
					}, {
						id: 18,
						name: 'RolesMange',
						url: 'RolesMange',
						description: '角色管理',
						icon: '',
					}, {
						id: 18,
						name: 'AdminsMange',
						url: 'AdminsMange',
						description: '账号管理',
						icon: '',
					}, {
						id: 18,
						name: 'BasicSetting',
						url: 'BasicSetting',
						description: '基本设置',
						icon: '',
					}]
				}]
			}
		},
		computed: {
			...mapState([
				'MenusData'
			])
		},
		methods: {
			...mapActions([
				'getMenus'
			]),
			async getData() {
				if(this.MenusData.length == 0) {
					this.loading = true
				}
				await this.getMenus()
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		},
		watch: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.navBox {
		text-align: left;
		padding-left: 2rem;
		margin-top: -2rem;
		overflow: auto;
	    width: calc(100vw + 20px);
	    max-height: 800px;
	}
	
	.navPrimary {
		margin-top: 2rem;
		color: #101010;
		padding-bottom: 10px;
		border-bottom: 1px solid #EFF1F3;
	}
	
	.navPrimary i {
		margin-right: 10px;
		color: #9A9A9A;
		vertical-align: middle;
	}
	
	.navSecond li {
		color: #645A78;
		padding-left: 26px;
		font-size: 14px;
		margin-top: .6rem;
	}
	
	.linka {
		cursor: pointer;
	}
	
	.linka:hover {}
	
	.linka.active,
	.linka.active i {
		color: #04A7FC;
	}
</style>