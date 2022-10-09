<template>
    <div class="admin-dashboard">
        <div class="admin-dashboard-header">
            <BaseLogo size="small" />
        </div>
        <p class="time-info">{{date}}</p>
        <p class="time-info">{{daysLeftBeforeWeekEnds}} days left before the week ends </p>
        <p class="user-points" v-if="userPoints">My points :  <span>{{userPoints}}</span></p>
        <div class="general-task-status">
            <h2 class="week-title task-pending" v-if="pendingTasks.length > 0">Pending Tasks:</h2>
            <ul class="employees-task-completion">
                <li v-for="task in pendingTasks" :key="task.id" class="week-title">
                    <div class="task-body">
                        <span class="task-name">{{task.name}}</span>
                        <span class="task-prio">Priority: {{task.priority}}</span>
                        <span class="task-points">Points : {{task.points}}</span>
                    </div>
                    <div class="task-status">
                        <span>Status:</span>
                        <span v-if="task.status === 'waitingapproval'" class="waiting-task">Waiting for approval</span>
                        <select name="" id="" v-model="task.status" v-if="task.status !=='waitingapproval'" @change="updateTaskStatus(task)">
						<option :value="task.status" disabled selected>{{task.status}}</option>
						<option :value="task.status === 'pending' ? 'waitingapproval' : 'pending'">{{task.status === 'pending' ? 'done' : 'pending'}}</option>
					</select>
                    </div>
                    <div class="task-status" v-if="task.status !== 'waitingapproval'"> 
                        <span>Send task to colleague:</span>
                        <select name="" id="" v-model="task.assignee" @change="sendTaskToColleague(task)">
						<option value="" disabled selected>Click to choose</option>
						<option :value="user.id" v-for="user in allUsersExceptCurrent" :key="user.firstName">{{ user.firstName }}</option>
					</select>
                    </div>
                </li>
            </ul>
            <h2 class="week-title task-completed" v-if="completedUserTasks.length > 0">Completed Tasks:</h2>
            <ul class="employees-task-completion completed-tasks">
                <li v-for="task in completedUserTasks" :key="task.id" class="week-title">
                    <div class="task-body">
                        <span class="task-name">{{task.name}}</span>
                        <span class="task-prio">Priority: {{task.priority}}</span>
                        <span class="task-points">Points : {{task.points}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import BaseLogo from '@/components/BaseLogo.vue'
import { mapGetters } from 'vuex'
export default {
    name: "UserDashboard",
    components: {
        BaseLogo
    },
    data() {
        return {
            date: moment().format("dddd, MMMM Do"),
            daysLeftBeforeWeekEnds: 7 - moment().weekday(),
            usersArray: [
            ],
            incompleteTasks: [],
            completedTasks : [],
            userTasks: [],
            user: null
        }
    },
    computed: {
        ...mapGetters([
            'getAllUsers',
            'tasks'
        ]),
        allUsersExceptCurrent() {
            return this.allUsers.filter(user => user.id !== this.user.id && user.role !== 'admin')
        },
        completedUserTasks() {
            return this.userTasks.filter(task => task.status === 'done')
        },
        pendingTasks() {
            return this.userTasks.filter(task => task.status === 'pending' || task.status === 'waitingapproval')
        },
        userPoints() {
            return this.user ? this.user.points : ''
        }
    },
    async mounted() {
        await this.$store.dispatch('getUsers', window.sessionStorage.getItem('token'))
        this.allUsers = this.getAllUsers.data
        this.user = this.allUsers.find(user => user.id === window.sessionStorage.getItem('userId'))
        this.tasks = await this.$store.dispatch('getTasks', window.sessionStorage.getItem('token'))
        this.userTasks = this.tasks.data.filter(task => task.assignee === this.user.id)
        // this.incompleteTasks = this.allTasks.filter(task => task.status === 'pending')
        // this.completedTasks = this.allTasks.filter(task => task.status === 'done')
       
    },
    methods: {
        createTask() {
            this.$router.push('/create-task')
        },
        async updateTaskStatus(task) {
            const data = JSON.stringify({
                "status": task.status
            });
            await this.$store.dispatch('updateTask', {id: task.id, data: data})
        },
        async sendTaskToColleague(task) {
            const data = JSON.stringify({
                "assignee": task.assignee
            });
            await this.$store.dispatch('updateTask', {id: task.id, data: data})
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables";
.task-body {
    width:100%;
    min-height:80px;
    background-color: white;
    border-radius: $radius;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    span {
        display: block;
        width:100%;
        text-align: left;
    }
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
.task-name {
    font-size: $large;
    display: block;
    width:100%;
    text-align: left;
    padding-bottom: 15px;
}
.task-prio, .task-points {
    font-size: $medium;
}
.task-points {
    padding-top: 5px;
    padding-bottom: 10px;
}
.admin-dashboard {
    box-sizing: border-box;
    padding: 0 10px;
    .time-info {
        text-align: left;
        padding:2px 0;
        font-style: italic;
        color:$lightext;
    }
}
.admin-dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.task-status {
    margin-top: 10px;
}
.general-task-status {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}
.task-pending {
    background-color: rgb(119, 119, 236)!important;
    color:white!important;
}
.task-completed {
    background-color: $green!important;
    color:white!important;
}
.tasks-status {
    width: 168px;
    border-radius: $radius;
    background-color: $lightbg;
    box-shadow: $shadow;
    font-weight: 600;
    padding: 14px 12px;
    box-sizing: border-box;
    cursor: pointer;
}
.task-status-header {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    img {
        width: 20px;
    }
    p {
        padding-left: 5px;
        font-weight: 200;
    }
}
.waiting-task {
    font-size: $medium!important;
    padding-left: 10px;
    font-weight: 200!important;
}
.tasks-amount {
    font-size: $large;
    font-weight: 700;
    background-color: #07E092;
    color:$darktext;
    width:40px;
    height: 40px;
    border-radius: 100%;
    line-height: 40px;
    margin: 0 auto;
}
.week-title {
    background-color: $lightbg;
    color:$lightext;
    border-radius: $radius;
    padding: 15px 10px;
    box-shadow: $shadow;
    margin-bottom: 10px;;
    font-size: $large;
    font-weight: 600;
    width: 100%;
    text-align: left;
    margin: 20px 0;
    box-sizing: border-box;
}
.blue-tasks {
    background-color: $blue;
}
.task-badge {
    width: 20px;
    height: 20px;
    background-color: $blue;
    border-radius: 4px;
}
.user-badge{
    background-color: #07E092;
    color:$darktext;
    font-weight: 600;
    padding: 6px 3px;
    border-radius: 4px;
    min-width: 60px;
    display: inline-block;
    cursor: pointer;
    &:hover {
        background-color: $darkbg;
        color:white;
    }
}
.employees-task-completion {
    width:100%;
    li {
        margin: 25px 0;
        &:nth-child(1) {
            margin-top: 10px;
        }
    }
}
.productivity {
    margin-bottom: 5px;
}
.create-task-btn {
    margin-top: 0;
    width: 100px;
    background-color: $purple;
    color:$darktext;
}
.user-points {
    text-align: left;
    padding-top: 20px;
    font-weight: 500;
    span {
        font-size: $large;
        color:green;
        font-weight: bold;
    }
}
</style>