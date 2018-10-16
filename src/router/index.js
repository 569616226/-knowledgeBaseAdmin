import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import Home from '@/components/Home'
//审核
import Auditer from '@/components/audit/Auditer'
import AuditDaka from '@/components/audit/Auditer/AuditDaka'
import dakaDetail from '@/components/audit/Auditer/dakaDetail'
import AuditTopic from '@/components/audit/AuditTopic'
import TopicAudit from '@/components/audit/AuditTopic/TopicAudit'
import TopicDetail from '@/components/audit/AuditTopic/TopicDetail'
import AuditArticle from '@/components/audit/AuditArticle'
import ArticleAudit from '@/components/audit/AuditArticle/ArticleAudit'
import ArticleDetail from '@/components/audit/AuditArticle/ArticleDetail'
//内容
import AnswerMange from '@/components/content/AnswerMange'
import AnswerDetail from '@/components/content/AnswerMange/AnswerDetail'
import MakeMange from '@/components/content/MakeMange'
import MakeDetail from '@/components/content/MakeMange/MakeDetail'
import ArticleMange from '@/components/content/ArticleMange'
import ArticlesDetail from '@/components/content/ArticleMange/ArticlesDetail'
//运营
import SysMange from '@/components/operative/SysMange'
import MessagesDetail from '@/components/operative/SysMange/MessagesDetail'
import SystemMessagesDetail from '@/components/operative/SysMange/SystemMessagesDetail'
import SeedMessage from '@/components/operative/SysMange/SeedMessage'
import addoperative from '@/components/operative/SysMange/addoperative'
import addImgAndText from '@/components/operative/SysMange/addImgAndText'
import HomeContent from '@/components/operative/HomeContent'
import AddAdalert from '@/components/operative/HomeContent/AddAdalert'
import AdalertDetail from '@/components/operative/HomeContent/AdalertDetail'
import NavsMange from '@/components/operative/NavsMange'
import NavDetail from '@/components/operative/NavsMange/NavDetail'
import AddNav from '@/components/operative/NavsMange/AddNav'
import ChildrenNav from '@/components/operative/NavsMange/ChildrenNav'
import PubnuMent from '@/components/operative/PubnuMent'
//用户
import GuestsMange from '@/components/guests/GuestsMange'
import GuestsDetail from '@/components/guests/GuestsMange/GuestsDetail'
import DakasMange from '@/components/guests/DakasMange'
import DakasDetail from '@/components/guests/DakasMange/DakasDetail'
import GroupsMange from '@/components/guests/GroupsMange'
import AddGroup from '@/components/guests/GroupsMange/AddGroup'
import GroupDetail from '@/components/guests/GroupsMange/GroupDetail'
//订单
import AppointOrders from '@/components/order/AppointOrders'
import AppointDetail from '@/components/order/AppointOrders/AppointDetail'
import AppointRefund from '@/components/order/AppointOrders/AppointRefund'
import AnswerOrders from '@/components/order/AnswerOrders'
import AnswerOrderDetail from '@/components/order/AnswerOrders/AnswerOrderDetail'
import CancelsOrders from '@/components/order/CancelsOrders'
import CancelsDetail from '@/components/order/CancelsOrders/CancelsDetail'
//财务
import ComplateOrders from '@/components/finance/ComplateOrders'
import ComplateDetail from '@/components/finance/ComplateOrders/ComplateDetail'
import CaseOrders from '@/components/finance/CaseOrders'
import AuditCase from '@/components/finance/CaseOrders/AuditCase'
import CaseDetail from '@/components/finance/CaseOrders/CaseDetail'
import RefundOrders from '@/components/finance/RefundOrders'
import AuditRefund from '@/components/finance/RefundOrders/AuditRefund'
import RefundDetail from '@/components/finance/RefundOrders/RefundDetail'
//系统设置
import PermissionsMange from '@/components/RolePermission/PermissionsMange'
import PermissionsDetail from '@/components/RolePermission/PermissionsMange/PermissionsDetail'
import MenusMange from '@/components/RolePermission/MenusMange'
import EditMenu from '@/components/RolePermission/MenusMange/EditMenu'
import RolesMange from '@/components/RolePermission/RolesMange'
import AddRoles from '@/components/RolePermission/RolesMange/AddRoles'
import RolesDetail from '@/components/RolePermission/RolesMange/RolesDetail'
import AdminsMange from '@/components/RolePermission/AdminsMange'
import AddAdmins from '@/components/RolePermission/AdminsMange/AddAdmins'
import AdminsDetail from '@/components/RolePermission/AdminsMange/AdminsDetail'
import BasicSetting from '@/components/RolePermission/BasicSetting'

const parentComponent = {
	template: '<router-view></router-view>'
};
Vue.use(Router)

export default new Router({
	routes: [{
		path: '',
		component: Admin,
		children: [{
			path: '/',
			name: 'Home',
			meta: {
				title: '首页',
				requireAuth: true,
			},
			component: Home,
		}, {
			path: '/audit',
			meta: {
				title: '审核',
				requireAuth: true,
			},
			component: parentComponent,
			children: [{
				path: 'auditer',
				name: 'auditer',
				meta: {
					title: '大咖审核',
					requireAuth: true,
				},
				component: Auditer,
			}, {
				path: 'AuditDaka/:id',
				name: 'AuditDaka',
				meta: {
					title: '审核大咖',
					requireAuth: true,
				},
				component: AuditDaka,
			}, {
				path: 'dakaDetail/:id',
				name: 'dakaDetail',
				meta: {
					title: '大咖详情',
					requireAuth: true,
				},
				component: dakaDetail,
			}, {
				path: 'auditTopic',
				name: 'auditTopic',
				meta: {
					title: '话题审核',
					requireAuth: true,
				},
				component: AuditTopic,
			}, {
				path: 'TopicAudit/:id',
				name: 'TopicAudit',
				meta: {
					title: '审核话题',
					requireAuth: true,
				},
				component: TopicAudit,
			}, {
				path: 'TopicDetail/:id',
				name: 'TopicDetail',
				meta: {
					title: '话题详情',
					requireAuth: true,
				},
				component: TopicDetail,
			}, {
				path: 'AuditArticle',
				name: 'AuditArticle',
				meta: {
					title: '文章审核',
					requireAuth: true,
				},
				component: AuditArticle,
			}, {
				path: 'ArticleAudit/:id',
				name: 'ArticleAudit',
				meta: {
					title: '审核文章',
					requireAuth: true,
				},
				component: ArticleAudit,
			}, {
				path: 'ArticleDetail/:id',
				name: 'ArticleDetail',
				meta: {
					title: '文章详情',
					requireAuth: true,
				},
				component: ArticleDetail,
			}]
		}, {
			path: '/content',
			meta: {
				title: '内容',
				requireAuth: true,
			},
			component: parentComponent,
			children: [{
				path: 'AnswerMange',
				name: 'AnswerMange',
				meta: {
					title: '问答管理',
					requireAuth: true,
				},
				component: AnswerMange,
			}, {
				path: 'AnswerDetail/:id',
				name: 'AnswerDetail',
				meta: {
					title: '查看问题',
					requireAuth: true,
				},
				component: AnswerDetail,
			}, {
				path: 'MakeMange',
				name: 'MakeMange',
				meta: {
					title: '约见管理',
					requireAuth: true,
				},
				component: MakeMange,
			}, {
				path: 'MakeDetail/:id',
				name: 'MakeDetail',
				meta: {
					title: '约见详情',
					requireAuth: true,
				},
				component: MakeDetail,
			}, {
				path: 'ArticleMange',
				name: 'ArticleMange',
				meta: {
					title: '文章管理',
					requireAuth: true,
				},
				component: ArticleMange,
			}, {
				path: 'ArticlesDetail/:id',
				name: 'ArticlesDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: ArticlesDetail,
			}]
		}, {
			path: '/operative',
			meta: {
				title: '运营',
				requireAuth: true,
			},
			component: parentComponent,
			children: [{
				path: 'SysMange',
				name: 'SysMange',
				meta: {
					title: '系统消息管理',
					requireAuth: true,
				},
				component: SysMange,
			}, {
				path: 'MessagesDetail/:id',
				name: 'MessagesDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: MessagesDetail,
			}, {
				path: 'SystemMessagesDetail/:id',
				name: 'SystemMessagesDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: SystemMessagesDetail,
			}, {
				path: 'SeedMessage',
				name: 'SeedMessage',
				meta: {
					title: '发消息',
					requireAuth: true,
				},
				component: SeedMessage,
			}, {
				path: 'addoperative',
				name: 'addoperative',
				meta: {
					title: '新建纯文本消息',
					requireAuth: true,
				},
				component: addoperative,
			}, {
				path: 'addImgAndText',
				name: 'addImgAndText',
				meta: {
					title: '新建图文消息',
					requireAuth: true,
				},
				component: addImgAndText,
			}, {
				path: 'HomeContent',
				name: 'HomeContent',
				meta: {
					title: '首页内容设置',
					requireAuth: true,
				},
				component: HomeContent,
			}, {
				path: 'AdalertDetail/:id',
				name: 'AdalertDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: AdalertDetail,
			}, {
				path: 'AddAdalert',
				name: 'AddAdalert',
				meta: {
					title: '新建广告',
					requireAuth: true,
				},
				component: AddAdalert,
			}, {
				path: 'EditAdalert/:id',
				name: 'EditAdalert',
				meta: {
					title: '编辑广告',
					requireAuth: true,
				},
				component: AddAdalert,
			}, {
				path: 'NavsMange',
				name: 'NavsMange',
				meta: {
					title: '分类管理',
					requireAuth: true,
				},
				component: NavsMange,
			}, {
				path: 'NavDetail/:id',
				name: 'NavDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: NavDetail,
			}, {
				path: 'AddNav',
				name: 'AddNav',
				meta: {
					title: '新建分类',
					requireAuth: true,
				},
				component: AddNav,
			}, {
				path: 'EditNav/:id',
				name: 'EditNav',
				meta: {
					title: '编辑分类',
					requireAuth: true,
				},
				component: AddNav,
			}, {
				path: 'ChildrenNav/:id',
				name: 'ChildrenNav',
				meta: {
					title: '管理子分类',
					requireAuth: true,
				},
				component: ChildrenNav,
			}, {
				path: 'PubnuMent',
				name: 'PubnuMent',
				meta: {
					title: '公众号管理',
					requireAuth: true,
				},
				component: PubnuMent,
			}]
		}, {
			path: '/guests',
			meta: {
				title: '用户',
				requireAuth: true,
			},
			component: parentComponent,
			children: [{
				path: 'GuestsMange',
				name: 'GuestsMange',
				meta: {
					title: '用户管理',
					requireAuth: true,
				},
				component: GuestsMange,
			}, {
				path: 'GuestsDetail/:id',
				name: 'GuestsDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: GuestsDetail,
			}, {
				path: 'DakasMange',
				name: 'DakasMange',
				meta: {
					title: '大咖管理',
					requireAuth: true,
				},
				component: DakasMange,
			}, {
				path: 'DakasDetail/:id',
				name: 'DakasDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: DakasDetail,
			}, {
				path: 'GroupsMange',
				name: 'GroupsMange',
				meta: {
					title: '用户组管理',
					requireAuth: true,
				},
				component: GroupsMange,
			}, {
				path: 'AddGroup',
				name: 'AddGroup',
				meta: {
					title: '新建用户组',
					requireAuth: true,
				},
				component: AddGroup,
			}, {
				path: 'EditGroup/:id',
				name: 'EditGroup',
				meta: {
					title: '编辑用户组',
					requireAuth: true,
				},
				component: AddGroup,
			}, {
				path: 'GroupDetail/:id',
				name: 'GroupDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: GroupDetail,
			}]
		}, {
			path: '/order',
			meta: {
				title: '用户',
				requireAuth: true,
			},
			component: parentComponent,
			children: [{
				path: 'AppointOrders',
				name: 'AppointOrders',
				meta: {
					title: '约见订单',
					requireAuth: true,
				},
				component: AppointOrders,
			}, {
				path: 'AppointDetail/:id',
				name: 'AppointDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: AppointDetail,
			}, {
				path: 'AppointRefund/:id',
				name: 'AppointRefund',
				meta: {
					title: '订单退款申请',
					requireAuth: true,
				},
				component: AppointRefund,
			}, {
				path: 'AnswerOrders',
				name: 'AnswerOrders',
				meta: {
					title: '问答订单',
					requireAuth: true,
				},
				component: AnswerOrders,
			}, {
				path: 'AnswerOrderDetail/:id',
				name: 'AnswerOrderDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: AnswerOrderDetail,
			}, {
				path: 'CancelsOrders',
				name: 'CancelsOrders',
				meta: {
					title: '违约金订单',
					requireAuth: true,
				},
				component: CancelsOrders,
			}, {
				path: 'CancelsDetail/:id',
				name: 'CancelsDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: CancelsDetail,
			}]
		}, {
			path: '/finance',
			meta: {
				title: '财务',
				requireAuth: true,
			},
			component: parentComponent,
			children: [{
				path: 'ComplateOrders',
				name: 'ComplateOrders',
				meta: {
					title: '交易记录',
					requireAuth: true,
				},
				component: ComplateOrders,
			}, {
				path: 'ComplateDetail/:id',
				name: 'ComplateDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: ComplateDetail,
			}, {
				path: 'CaseOrders',
				name: 'CaseOrders',
				meta: {
					title: '提现审核',
					requireAuth: true,
				},
				component: CaseOrders,
			}, {
				path: 'AuditCase/:id',
				name: 'AuditCase',
				meta: {
					title: '审核提现',
					requireAuth: true,
				},
				component: AuditCase,
			}, {
				path: 'CaseDetail/:id',
				name: 'CaseDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: CaseDetail,
			}, {
				path: 'RefundOrders',
				name: 'RefundOrders',
				meta: {
					title: '退款审核',
					requireAuth: true,
				},
				component: RefundOrders,
			}, {
				path: 'AuditRefund/:id',
				name: 'AuditRefund',
				meta: {
					title: '审核退款',
					requireAuth: true,
				},
				component: AuditRefund,
			}, {
				path: 'RefundDetail/:id',
				name: 'RefundDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: RefundDetail,
			}]
		}, {
			path: '/RolePermission',
			meta: {
				title: '系统设置',
				requireAuth: true,
			},
			component: parentComponent,
			children: [{
				path: 'PermissionsMange',
				name: 'PermissionsMange',
				meta: {
					title: '权限管理',
					requireAuth: true,
				},
				component: PermissionsMange,
			}, {
				path: 'PermissionsDetail/:id',
				name: 'PermissionsDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: PermissionsDetail,
			}, {
				path: 'MenusMange',
				name: 'MenusMange',
				meta: {
					title: '菜单管理',
					requireAuth: true,
				},
				component: MenusMange,
			}, {
				path: 'EditMenu/:id',
				name: 'EditMenu',
				meta: {
					title: '编辑菜单',
					requireAuth: true,
				},
				component: EditMenu,
			}, {
				path: 'RolesMange',
				name: 'RolesMange',
				meta: {
					title: '角色管理',
					requireAuth: true,
				},
				component: RolesMange,
			}, {
				path: 'AddRoles',
				name: 'AddRoles',
				meta: {
					title: '新建角色',
					requireAuth: true,
				},
				component: AddRoles,
			}, {
				path: 'EditRoles/:id',
				name: 'EditRoles',
				meta: {
					title: '编辑角色',
					requireAuth: true,
				},
				component: AddRoles,
			}, {
				path: 'RolesDetail/:id',
				name: 'RolesDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: RolesDetail,
			}, {
				path: 'AdminsMange',
				name: 'AdminsMange',
				meta: {
					title: '账号管理',
					requireAuth: true,
				},
				component: AdminsMange,
			}, {
				path: 'AddAdmins',
				name: 'AddAdmins',
				meta: {
					title: '新建账号',
					requireAuth: true,
				},
				component: AddAdmins,
			}, {
				path: 'EditAdmins/:id',
				name: 'EditAdmins',
				meta: {
					title: '编辑账号',
					requireAuth: true,
				},
				component: AddAdmins,
			}, {
				path: 'AdminsDetail/:id',
				name: 'AdminsDetail',
				meta: {
					title: '查看详情',
					requireAuth: true,
				},
				component: AdminsDetail,
			}, {
				path: 'BasicSetting',
				name: 'BasicSetting',
				meta: {
					title: '基本设置',
					requireAuth: true,
				},
				component: BasicSetting,
			}]
		}]
	}, {
		path: '/login',
		name: 'Login',
		meta: {
			title: '登录页',
			requireAuth: false,
		},
		component: Login
	}]
})