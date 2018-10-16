// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.css'
import './styles/font.css'
import DataTables from 'vue-data-tables'
import VueHtml5Editor from 'vue-html5-editor' //富文本编辑器
import { getCookie } from '@/utils'
import apiUrl from '@/utils/apiUrl'
import valid from '@/utils/valid'

Vue.use(ElementUI);
Vue.use(DataTables);
Vue.config.productionTip = false
Vue.prototype.$valid = valid
// 设置全局的上传图片路径
Vue.prototype.$weburl = apiUrl
Vue.prototype.$uploadimgurl = Vue.prototype.$weburl + '/v1/admin/upload_image'

const options = {
	// 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称
	showModuleName: true,
	visibleModules: [
		"text",
		"color",
		"font",
		"align",
		// "list",
		"link",
		"unlink",
		// "tabulation",
		"image",
		"hr",
		"eraser",
		"undo",
		// "full-screen",
		// "info",
	],
	language: "zh-cn",
	image: {
		server: null,
		//the name for file field in multipart request
		fieldName: "image",
		//max file size
		sizeLimit: 512 * 1024,
		// default true,if set to true,the image will resize by localResizeIMG (https://github.com/think2011/localResizeIMG)
		compress: true,
		//follows are options of localResizeIMG
		width: 680,
		// height: 300,
		quality: 80,
		//handle response data，return image url
		uploadHandler(responseText) {
			//default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
			var json = JSON.parse(responseText)
			if(!json.ok) {
				alert(json.msg)
			} else {
				return json.data
			}
		}
	},

}
Vue.use(VueHtml5Editor, options)

Date.prototype.format = function() {
	var s = '';
	var mouth = (this.getMonth() + 1) >= 10 ? (this.getMonth() + 1) : ('0' + (this.getMonth() + 1));
	var day = this.getDate() >= 10 ? this.getDate() : ('0' + this.getDate());
	s += this.getFullYear() + '-'; // 获取年份。  
	s += mouth + "-"; // 获取月份。  
	s += day; // 获取日。  
	return(s); // 返回日期。  
}

router.beforeEach((to, from, next) => {
	if(to.meta.requireAuth) {
		if(!getCookie('token')) { // 没有登录则跳转/login页，进行登录 
			next({
				path: '/login',
				query: {
					redirect: to.fullPath
				}
			})
		} else {
			next()
		}
	} else {
		next()
	}
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})