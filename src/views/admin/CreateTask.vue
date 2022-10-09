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
					<input type="text" v-model="task.name" placeholder="Write task name...">
				</label>
				<label for="">
					<span>Task Asignee ( You can leave it blank )</span>
					<select name="" id="" v-model="task.assignee">
						<option value="" disabled selected>Click to choose</option>
						<option :value="user.id" v-for="user in usersArray" :key="user.firstName">{{ user.firstName }}</option>
					</select>
				</label>
				<label for="">
					<span>Task Priority</span>
					<select name="" id="" v-model="task.priority">
						<option value="" disabled selected>Click to choose</option>
						<option value="low">Low</option>
						<option value="medium">Medium</option>
						<option value="high">High</option>
					</select>
				</label>
				<label for="">
					<span>Task Points</span>
					<input type="number" v-model="task.points" placeholder="Write a number">
				</label>
				<BaseButton size="small" @click.prevent="createTask">Create</BaseButton>
			</form>
			<span v-if="success" class="success-msg">Task Created Successfully!</span>
			<BaseButton v-if="success" size="small" @click="$router.go(-1)">Back</BaseButton>
			<span class="resp-message">{{taskResponseMessage}}</span>
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
			taskResponseMessage: '',
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
				this.taskResponseMessage = 'Task Created Successfully!'
			} else {
				this.taskResponseMessage = "Error!"
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
		this.usersArray = this.getAllUsers.data.filter(user => user.role === 'user')
	},
}
</script>

<style lang="scss">
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
	display: flex;
	flex-direction: column;
	label {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding-bottom: 10px;
		width:100%;
		span {
			padding-bottom: 5px;
		}
		input, select {
			max-width: 320px;
			width: 100%;
			margin: 10px 0;
			height: 50px;
			border: none;
			box-sizing: border-box;
			padding: 10px 20px;
			background-color: #ffffff;
			border-radius: 12px;
			color: #0E204D;
			font-size: 13px;
			font-family: "Poppins";
			box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
		}
	}
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
.resp-message {
	font-size: $medium;
	padding-top: 20px;
	padding-left: 10px;
	font-size: $large;
}
</style>