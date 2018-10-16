import request from './request'
import apiUrl from './apiUrl'
const api_url = apiUrl
const api = {
	//登陆
	getToken: (item) => request.post(`${api_url}/v1/clients/web/admin/login`, {
		name: item.name,
		password: item.password
	}),
	getUserProfile: () => request.get(`${api_url}/v1/user/profile`),
	//大咖审核
	getAuditer: () => request.get(`${api_url}/v1/linka_check_list`),
	getAuditDaka: (id) => request.get(`${api_url}/v1/linkas/${id}`),
	getAuditstate: (form) => request.post(`${api_url}/v1/linkas/${form.id}/change_status`, {
		status: form.status,
		remark: form.desc
	}),
	//话题审核
	getTopics: () => request.get(`${api_url}/v1/topics?include=guest`),
	getTopicDetail: (id) => request.get(`${api_url}/v1/topics/${id}`),
	getTopicstate: (form) => request.post(`${api_url}/v1/topics/${form.id}/change_status`, {
		status: form.status,
		remark: form.desc
	}),
	//文章审核
	getArticles: () => request.get(`${api_url}/v1/articles`),
	getArticleDetail: (id) => request.get(`${api_url}/v1/articles/${id}`),
	getArticlestate: (form) => request.post(`${api_url}/v1/articles/${form.id}/change_status`, {
		status: form.status,
		remark: form.desc
	}),
	//内容
	getAnswers: () => request.get(`${api_url}/v1/answers`),
	getAnswerDetail: (id) => request.get(`${api_url}/v1/answers/${id}`),
	getMakes: () => request.get(`${api_url}/v1/appoints`),
	getMakeDetail: (id) => request.get(`${api_url}/v1/appoints/${id}`),
	//运营
	getMessages: () => request.get(`${api_url}/v1/messages`),
	getMessagesDetail: (id) => request.get(`${api_url}/v1/messages/${id}`),
	getSystemMessages: () => request.get(`${api_url}/v1/system_messages`),
	postOperative: (form) => request.post(`${api_url}/v1/messages`, {
		title: form.title,
		group_id: form.label_id,
		content: form.content,
		msg_type: form.type,
		img_url: form.picture,
		url: form.url
	}),
	getAdverts: () => request.get(`${api_url}/v1/adverts`),
	getAdvertDetail: (id) => request.get(`${api_url}/v1/adverts/${id}`),
	postAdverts: (form) => request.post(`${api_url}/v1/adverts`, {
		path: form.path,
		name: form.name,
		order: form.order,
		url: form.url,
		type: form.type
	}),
	patchAdverts: (id,form) => request.patch(`${api_url}/v1/adverts/${id}`, {
		path: form.path,
		name: form.name,
		order: form.order,
		url: form.url,
		type: form.type
	}),
	deleteAdverts: (id) => request.delete(`${api_url}/v1/adverts/${id}`),
	getNavs: () => request.get(`${api_url}/v1/navs`),
	postNavs: (form) => request.post(`${api_url}/v1/navs`, {
		name: form.name,
		icon: form.icon
	}),
	postNavsid: (form) => request.patch(`${api_url}/v1/navs/${form.id}`, {
		name: form.name,
		icon: form.icon
	}),
	deleteNavs: (id) => request.delete(`${api_url}/v1/navs/${id}`),
	getNavDetail: (id) => request.get(`${api_url}/v1/navs/${id}`),
	getChildrenNav: (id) => request.get(`${api_url}/v1/nav/${id}/children`),
	patchChildrenNav: (id,form) => request.patch(`${api_url}/v1/navs/${id}/children`, {
		nav_children: form
	}),
	getReply: (key) => request.get(`${api_url}/v1/settings`, {
		key: key
	}),
	patchReply: (form) => request.patch(`${api_url}/v1/settings`, {
		value: form.index_count,
		key: form.key
	}),
	//用户
	getGuests: () => request.get(`${api_url}/v1/guests`),
	getGuestDetail: (id) => request.get(`${api_url}/v1/guests/${id}`),
	getGroups: () => request.get(`${api_url}/v1/groups`),
	postGroups: (id, checkList) => request.post(`${api_url}/v1/groups/sync`, {
		guest_id: id,
		groups_ids: checkList
	}),
	postGroup: (name) => request.post(`${api_url}/v1/groups`, {
		name: name
	}),
	getDakaCheck: () => request.get(`${api_url}/v1/linkas`),
	deleteGroup: (id) => request.delete(`${api_url}/v1/groups/${id}`),
	getGroupDetail: (id) => request.get(`${api_url}/v1/groups/${id}`),
	putGroup: (id,name) => request.put(`${api_url}/v1/groups/${id}`, {
		name: name
	}),
	getGroupDetail: (id) => request.get(`${api_url}/v1/groups/${id}`),
	//订单
	getAppointOrders: () => request.get(`${api_url}/v1/appoint_orders`),
	getAppointDetail: (id) => request.get(`${api_url}/v1/orders/${id}`),
	getAnswerOrders: () => request.get(`${api_url}/v1/answer_orders`),
	getAnswerOrderDetail: (id) => request.get(`${api_url}/v1/answer_orders/${id}`),
	getCancelsOrders: () => request.get(`${api_url}/v1/cancels/orders`),
	getCancelsDetail: (id) => request.get(`${api_url}/v1/cancel_orders/${id}`),
	//财务
	getComplateOrders: () => request.get(`${api_url}/v1/finaces`),
	getComplateDetail: (id) => request.get(`${api_url}/v1/finaces/${id}`),
	getCaseOrders: () => request.get(`${api_url}/v1/case_orders`),
	putAuditCase: (form) => request.put(`${api_url}/v1/orders/audit/status/${form.id}`, {
		refund_audit_status: form.status,
		refund_audit_remark: form.desc
	}),
	getCaseDetail: (id) => request.get(`${api_url}/v1/case_orders/${id}`),
	getRefundOrders: () => request.get(`${api_url}/v1/refund_orders`),
	getRefundDetail: (id) => request.get(`${api_url}/v1/refund_orders/${id}`),
	//系统设置
	getPermissions: () => request.get(`${api_url}/v1/permissions`),
	getPermissionsDetail: (id) => request.get(`${api_url}/v1/permissions/${id}`),
	getMenus: () => request.get(`${api_url}/v1/menus`),
	getMenusDetail: (id) => request.get(`${api_url}/v1/menus/${id}`),
	getRoles: () => request.get(`${api_url}/v1/roles`),
	getRolesDetail: (id) => request.get(`${api_url}/v1/roles/${id}`),
	deleteRoles: (id) => request.delete(`${api_url}/v1/roles/${id}`),
	postRoles: (name) => request.post(`${api_url}/v1/roles`, {
		name: name
	}),
	postPermissionsRoles: (id,ids,role_name) => request.post(`${api_url}/v1/permissions/sync`, {
		role_id: id,
		permissions_ids: ids,
		role_name: role_name
	}),
	getAdmins: () => request.get(`${api_url}/v1/admins`),
	postAdmins: (form) => request.post(`${api_url}/v1/admins`, {
		name: form.name,
		email: form.email,
		password: form.password
	}),
	dongAdmins: (id) => request.get(`${api_url}/v1/admins/frozen/${id}`),
	deleteAdmins: (id) => request.delete(`${api_url}/v1/users/${id}`),
	getAdminsDetail: (id) => request.get(`${api_url}/v1/users/${id}`),
	putAdmins: (form) => request.put(`${api_url}/v1/users/${form.id}`, {
		name: form.name,
		email: form.email,
		password: form.password
	}),
	postAdminsrole: (form) => request.post(`${api_url}/v1/roles/sync`, {
		user_id: form.id,
		roles_ids: form.roles
	}),
}

export default api