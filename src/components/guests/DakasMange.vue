<template>
	<div>
		<div class="page-title">{{ $route.meta.title }}</div>
		<div class="know-container">
			<data-tables v-loading="loading" :data="DakaCheckData" :table-props="tableProps" align="left" :show-action-bar="false" :custom-filters="customFilters" :pagination-def="paginationDef">
				<el-row slot="custom-tool-bar" style="margin-bottom: 10px" class="class_el_row">
					<el-col :span="24" class="text-align-left">
						<el-select v-model="customFilters[1].vals" placeholder="用户组" class="class_select_width">
							<el-option label="用户组" value=""></el-option>
							<div v-for="status in GroupsData">
								<el-option :label="status.name" :value="status.name"></el-option>
							</div>
						</el-select>
						<el-input v-model="customFilters[0].vals" prefix-icon="el-icon-search" placeholder="搜索大咖姓名/所属机构" class="class_input_width">
						</el-input>
					</el-col>
				</el-row>
				<el-table-column prop="real_name" label="大咖姓名" key="real_name" sortable="custom">
					<template slot-scope="scope">
						<router-link :to="{name: 'DakasDetail',params: {id: scope.row.id}}">
							<div class="blue"><b>{{scope.row.real_name}}</b></div>
						</router-link>
					</template>
				</el-table-column>
				<el-table-column prop="office" label="所属机构" key="office" sortable="custom">
				</el-table-column>
				<el-table-column prop="groups_name" label="用户组" key="groups_name" sortable="custom">
				</el-table-column>
				<el-table-column prop="phone" label="手机号" key="phone" sortable="custom">
				</el-table-column>
				<el-table-column prop="audit_time" label="审核时间" key="audit_time" sortable="custom">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<div class="operation_box">
							<span @click="details(scope.row)">详情</span>
							<span @click="edit(scope.row)">设置用户组</span>
						</div>
					</template>
				</el-table-column>
			</data-tables>
			<el-dialog title="设置标签" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
				<el-checkbox-group v-model="checkList">
					<el-checkbox v-for="status,index in GroupsData" :key="index" :label="status.real_id">{{status.name}}</el-checkbox>
				</el-checkbox-group>
				<p class="AddGroup" @click="add_show = false" v-if="add_show">新建标签</p>
				<div class="AddGroup-div" v-if="!add_show">
					<el-input v-model="input" placeholder="请输入内容" class="AddGroup-div-input"></el-input>
					<span class="AddGroup-div-add" @click="Add_group">添加</span>
					<span class="AddGroup-div-add" @click="add_show = true">取消</span>
				</div>
				<span slot="footer" class="dialog-footer">
	    			<el-button @click="dialogVisible = false">取 消</el-button>
	    			<el-button type="primary" @click="SaveGroup">保 存</el-button>
  				</span>
			</el-dialog>
		</div>
	</div>

</template>

<script>
	import { mapState, mapActions } from 'vuex'
	import api from '@/utils/api'
	export default {
		components: {

		},
		name: 'Auditer',
		data() {
			return {
				checkList: [],
				input: '',
				add_show: true,
				loading: false,
				tableProps: {
					border: false, //去掉边框
					stripe: false //去掉斑马纹
				},
				customFilters: [{
					vals: '',
					props: ['real_name', 'office'],
				}, {
					vals: '',
					props: ['groups_name']
				}, {
					vals: []
				}, {
					vals: []
				}, {
					vals: []
				}],
				//分页设置
				paginationDef: {
					pageSize: 10,
					pageSizes: [10, 20, 50]
				},
				dialogVisible: false,
				save_id: null
			}
		},
		computed: {
			...mapState([
				'GroupsData', 'DakaCheckData'
			])
		},
		methods: {
			...mapActions([
				'getGroups', 'getDakaCheck'
			]),
			async Add_group () {
				if(this.input == ''){
					this.$message.error("标签不能为空")
					return
				}
				await api.postGroup(this.input)
				await this.getGroups()
				this.$message({
					type: 'success',
					message: '添加成功'
				})
				this.add_show = true
				this.input = ''
			},
			async SaveGroup() {
				this.loading = true
				await api.postGroups(this.save_id, this.checkList)
				this.dialogVisible = false
				this.loading = false
				this.$message({
					type: 'success',
					message: '保存成功'
				})
				this.checkList = []
				this.getData()
			},
			handleClose(done) {
				done()
			},
			edit(row) {
				this.dialogVisible = true
				this.save_id = row.real_id
				this.checkList = row.groups_ids
			},
			details(row) {
				let id = row.id
				this.$router.push({
					name: 'DakasDetail',
					params: {
						id
					}
				})
			},
			async getData() {
				if(this.GroupsData.length == 0 || this.DakaCheckData.length == 0) {
					this.loading = true
				}
				await this.getGroups()
				await this.getDakaCheck()
				this.loading = false
			}
		},
		mounted() {
			this.getData()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	.AddGroup{
		color: rgb(60, 152, 255);
    	font-size: 14px;
    	margin-top: 10px;
    	cursor: pointer;
    	&-div{
    		margin-top: 10px;
    		&-input{
    			width: 40%;
    		}
    		&-add{
    			color: rgb(60, 152, 255);
		    	font-size: 14px;
		    	margin-top: 10px;
		    	cursor: pointer;
		    	margin-left: 15px;
    		}
    	}
	}
	.operation_box span {
		cursor: pointer;
		color: #8E9EBB;
		margin-right: 10px;
	}
</style>