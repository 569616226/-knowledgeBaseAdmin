import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/utils/api'
import { setCookie } from '@/utils'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    auditerData: [],
    topicsData: [],
    articlesData: [],
    answersData: [],
    makesData: [],
    messagesData: [],
    SystemmessagesData: [],
    GroupsData: [],
    AdvertsData: [],
    NavsData: [],
    GuestsData: [],
    DakaCheckData: [],
    AppointOrdersData: [],
    PermissionsData: [],
    AnswerOrdersData: [],
    CancelsOrdersData: [],
    ComplateOrdersData: [],
    CaseOrdersData: [],
    RefundOrdersData: [],
    MenusData: [],
    RolesData: [],
    AdminsData: [],
    UserProfile: []
  },
  mutations: {
    auditerData (state, data) {
      state.auditerData = data
    },
    topicsData (state, data) {
      state.topicsData = data
    },
    articlesData (state, data) {
      state.articlesData = data
    },
    answersData (state, data) {
      state.answersData = data
    },
    makesData (state, data) {
      state.makesData = data
    },
    messagesData (state, data) {
      state.messagesData = data
    },
    SystemmessagesData (state, data) {
      state.SystemmessagesData = data
    },
    GroupsData (state, data) {
      state.GroupsData = data
    },
    AdvertsData (state, data) {
      state.AdvertsData = data
    },
    NavsData (state, data) {
      state.NavsData = data
    },
    GuestsData (state, data) {
      state.GuestsData = data
    },
    DakaCheckData (state, data) {
      state.DakaCheckData = data
    },
    AppointOrdersData (state, data) {
      state.AppointOrdersData = data
    },
    PermissionsData (state, data) {
      state.PermissionsData = data
    },
    AnswerOrdersData (state, data) {
      state.AnswerOrdersData = data
    },
    CancelsOrdersData (state, data) {
      state.CancelsOrdersData = data
    },
    ComplateOrdersData (state, data) {
      state.ComplateOrdersData = data
    },
    CaseOrdersData (state, data) {
      state.CaseOrdersData = data
    },
    RefundOrdersData (state, data) {
      state.RefundOrdersData = data
    },
    MenusData (state, data) {
      state.MenusData = data
    },
    RolesData (state, data) {
      state.RolesData = data
    },
    AdminsData (state, data) {
      state.AdminsData = data
    },
    UserProfile (state, data) {
      state.UserProfile = data
    },
  },
  actions: {
    async getLogin ({ state, commit }, item) {
      const data = await api.getToken(item)
      setCookie('token',data.access_token,null)
    },
    async getUserProfile ({ state, commit }) {
      const data = await api.getUserProfile()
      commit('UserProfile', data.data)
    },
    async getAuditer ({ state, commit }) {
      const data = await api.getAuditer()
      commit('auditerData', data.data)
    },
    async getTopics ({ state, commit }) {
      const data = await api.getTopics()
      commit('topicsData', data.data)
    },
    async getArticles ({ state, commit }) {
      const data = await api.getArticles()
      commit('articlesData', data.data)
    },
    async getAnswers ({ state, commit }) {
      const data = await api.getAnswers()
      commit('answersData', data.data)
    },
    async getMakes ({ state, commit }) {
      const data = await api.getMakes()
      commit('makesData', data.data)
    },
    async getMessages ({ state, commit }) {
      const data = await api.getMessages()
      commit('messagesData', data.data)
    },
    async getSystemMessages ({ state, commit }) {
      const data = await api.getSystemMessages()
      commit('SystemmessagesData', data.data)
    },
    async getGroups ({ state, commit }) {
      const data = await api.getGroups()
      commit('GroupsData', data.data)
    },
    async getAdverts ({ state, commit }) {
      const data = await api.getAdverts()
      commit('AdvertsData', data.data)
    },
    async getNavs ({ state, commit }) {
      const data = await api.getNavs()
      commit('NavsData', data.data)
    },
    async getGuests ({ state, commit }) {
      const data = await api.getGuests()
      commit('GuestsData', data.data)
    },
    async getDakaCheck ({ state, commit }) {
      const data = await api.getDakaCheck()
      commit('DakaCheckData', data.data)
    },
    async getAppointOrders ({ state, commit }) {
      const data = await api.getAppointOrders()
      commit('AppointOrdersData', data.data)
    },
    async getAnswerOrders ({ state, commit }) {
      const data = await api.getAnswerOrders()
      commit('AnswerOrdersData', data.data)
    },
    async getCancelsOrders ({ state, commit }) {
      const data = await api.getCancelsOrders()
      commit('CancelsOrdersData', data.data)
    },
    async getComplateOrders ({ state, commit }) {
      const data = await api.getComplateOrders()
      commit('ComplateOrdersData', data.data)
    },
    async getCaseOrders ({ state, commit }) {
      const data = await api.getCaseOrders()
      commit('CaseOrdersData', data.data)
    },
    async getRefundOrders ({ state, commit }) {
      const data = await api.getRefundOrders()
      commit('RefundOrdersData', data.data)
    },
    async getPermissions ({ state, commit }) {
      const data = await api.getPermissions()
      commit('PermissionsData', data.data)
    },
    async getMenus ({ state, commit }) {
      const data = await api.getMenus()
      commit('MenusData', data.data)
    },
    async getRoles ({ state, commit }) {
      const data = await api.getRoles()
      commit('RolesData', data.data)
    },
    async getAdmins ({ state, commit }) {
      const data = await api.getAdmins()
      commit('AdminsData', data.data)
    },
  }
})

export default store
