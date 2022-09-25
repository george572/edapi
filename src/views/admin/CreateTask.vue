<template>
	<div class="admin-dashboard">
		<div class="admin-dashboard-header">
			<BaseLogo size="small" />
			<BaseButton size="small" style="margin-top:0;" @click="$router.go(-1)">Back</BaseButton>
		</div>
		<div class="task-create-body">
			<h2>Specify Task Details</h2>
			<form class="form task-form">
				<label for="">
					<span>Task Name</span>
					<input type="text" v-model="task.name" placeholder="Task Name">
				</label>
				<label for="">
					<span>Task Asignee</span>
					<select name="" id="" v-model="task.assignee">
						<option value="" disabled selected>Click to choose from list</option>
						<option :value="user.id" v-for="user in usersArray" :key="user.firstName">{{ user.firstName }}</option>
					</select>
				</label>
				<label for="">
					<span>Task Priority</span>
					<select name="" id="" v-model="task.priority">
						<option value="" disabled selected>Click to choose from list</option>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</label>
				<label for="">
					<span>Task Points</span>
					<input type="number" v-model="task.points">
				</label>
				<BaseButton size="small" @click.prevent="createTask">Create</BaseButton>
			</form>
			<span v-if="success" class="success-msg">Task Created Successfully!</span>
			<BaseButton v-if="success" size="small" @click="$router.go(-1)">Back</BaseButton>
		</div>
	</div>
</template>

<script>
import BaseLogo from '@/components/BaseLogo.vue';
import BaseButton from '@/components/BaseButton.vue';
import { mapGetters } from 'vuex'
export default {
	name: "CreateTask",
	components: {
		BaseLogo,
		BaseButton,
	},
	data() {
		return {
			success: false,
			task: {
				name: '',
				assignee: '',
				priority: '',
				points: '',
				status: 'pending'
			},
			usersArray: []
		}
	},
	methods: {
		async createTask() {
			if(this.task.name.length > 2 && this.task.asignee !== '' && this.task.points !== '') {
				await this.$store.dispatch('addTask', { token: window.sessionStorage.getItem('token'), task: this.task })
			} else {
				console.log('error!')
			}
		}
	},
	computed: {
		...mapGetters([
			'getAllUsers',
		]),
	},
	async mounted() {
		await this.$store.dispatch('getUsers', window.sessionStorage.getItem('token'))
		this.usersArray = this.getAllUsers.data
	},
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables";

.admin-dashboard {
	box-sizing: border-box;
	padding: 0 10px;

	.time-info {
		text-align: left;
		padding: 2px 0;
		font-style: italic;
		color: $lightext;
	}
}

.admin-dashboard-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.task-create-body {
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	h2 {
		font-size: $large;
		font-weight: bold;

	}
}

.task-form {
	justify-content: flex-start;
	align-items: flex-start;
	margin-top: 50px;
	padding: 0;
}

select {
	-webkit-appearance: none;
	-moz-appearance: none;
	text-indent: 1px;
	text-overflow: '';
}

.success-msg {
	font-size: $medium;
	margin-top: 20px;
	font-weight: bold;
}
</style>