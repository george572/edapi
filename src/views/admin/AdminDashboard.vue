<template>
    <div class="admin-dashboard">
        <div class="admin-dashboard-header">
            <BaseLogo size="small" />
            <BaseButton class="create-task-btn" @click="createTask">Create</BaseButton>
        </div>
        <p class="time-info">{{date}}</p>
        <p class="time-info">{{daysLeftBeforeWeekEnds}} days left before the week ends </p>
        <div class="general-task-status">
            <h2 class="week-title">Task Approval Requests:</h2>
            <span v-if="pendingForApproval.length === 0">No tasks are requesting the approval</span>
            <ul>
                <li v-for="task in pendingForApproval" :key="task.id" class="week-title">
                    <div class="task-body">
                        <span class="task-name">Task : {{task.name}}</span>
                        <span class="task-name">Assignee : {{userName(task.assignee)}}</span>
                        <span class="task-prio">Priority: {{task.priority}}</span>
                        <span class="task-points">Points : {{task.points}}</span>
                    </div>
                    <div class="task-status">
                        <span>Status:</span>
                        <select name="" id="" v-model="task.status"
                            @change="approveTask(task)">
                            <option :value="task.status" disabled selected>{{task.status === 'waitingapproval' ? 'pending' : ''}}</option>
                            <option value="done">Approve</option>
                        </select>
                    </div>
                </li>
            </ul>

            <h2 class="week-title">This week: {{allTasks.length}} Tasks</h2>
            <div class="tasks-status" @click="$router.push({path : 'tasks', query: { view: 'completed' }})">
                <div class="task-status-header">
                    <img src="../../assets/images/check.svg" alt="">
                    <p>Tasks completed</p>
                </div>
                <p class="tasks-amount">{{completedTasksCount.length}}</p>
            </div>
            <div class="tasks-status" @click="$router.push({path : 'tasks',query: { view: 'all' }})">
                <div class="task-status-header">
                    <div class="task-badge"></div>
                    <p>Incomplete Tasks</p>
                </div>
                <p class="tasks-amount blue-tasks">{{pendingTasksCount.length}}</p>
            </div>
            <h2 class="week-title productivity">Activity this week:</h2>
            <ul class="employees-task-completion">
                <li v-for="user in employees" :key="user.points">
                    <span class="user-badge" @click="$router.push(`user-details/${user.id}`)">{{user.firstName}}</span> completed {{usersCompletedTask(user.id)}} tasks. Has {{user.points}} points.
                </li>
                <!-- users click go to users page, disabled now, in development  @click="$router.push(`user-details/${user.firstName}`)" -->
            </ul>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import BaseLogo from '@/components/BaseLogo.vue'
import BaseButton from '@/components/BaseButton.vue'
import { mapGetters } from 'vuex'
export default {
    name: "AdminDashboard",
    components: {
        BaseLogo,
        BaseButton
    },
    data() {
        return {
            date: moment().format("dddd, MMMM Do"),
            daysLeftBeforeWeekEnds: 7 - moment().weekday(),
            usersArray: [
            ],
            incompleteTasks: [],
            completedTasks : [],
            allTasks: []
        }
    },
    computed: {
        ...mapGetters([
            'getAllUsers',
            'tasks'
        ]),
        pendingForApproval() {
            return this.allTasks.filter(task => task.status === 'waitingapproval')
        },
        pendingTasksCount() {
            return this.allTasks.filter(task => task.status === 'pending')
        },
        completedTasksCount() {
            return this.allTasks.filter(task => task.status === 'done')
        },
        employees() {
            return this.usersArray.filter(user => user.role === 'user')
        }
    },
    async mounted() {
        await this.$store.dispatch('getUsers', window.sessionStorage.getItem('token'))
        this.usersArray = this.getAllUsers.data
        await this.$store.dispatch('getTasks', window.sessionStorage.getItem('token'))
        this.allTasks = this.tasks.data
        this.incompleteTasks = this.tasks.data.filter(task => task.status === 'pending')
        this.completedTasks = this.tasks.data.filter(task => task.status === 'done')
       
    },
    methods: {
        usersPoints(userId) {
            const user = this.getAllUsers.data.find(user => user.id === userId)
            return user.points
        },
        createTask() {
            this.$router.push('/create-task')
        },
        userName(userId) {
            let user = this.employees.find(emp => emp.id === userId)
            return user.firstName
        },
        usersCompletedTask(userId) {
           const completedTasks = this.completedTasksCount.filter(task => task.assignee === userId)
           return completedTasks.length
        },
        async approveTask(task) {
            const data = JSON.stringify({
                "status": task.status
            });
            //find user on which this task is assigned
            const user = this.usersArray.find(user => user.id === task.assignee)
            const points = JSON.stringify({
                "points": Number(user.points) + task.points
            })
            await this.$store.dispatch('updateTask', {id: task.id, data: data})
            await this.$store.dispatch('addPoints', {id: task.assignee, data: points})
            this.usersPoints(task.assignee)
        },
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables";
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
.general-task-status {
    margin-top: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
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
.task-status {
    span {
        font-size: 16px;
    }
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
}
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
        margin: 4px 0;
        font-size: 16px;
    }
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
input, select {
    max-width: 200px;
    width: 100%;
    margin: 10px 0;
    margin-left: 10px;
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
</style>