<template>
    <div class="admin-dashboard">
        <div class="admin-dashboard-header">
            <BaseLogo size="small" />
            <BaseButton size="small" style="margin-top:0;" class="create-task-btn" @click="$router.push('/admin/dashboard')">Back</BaseButton>
        </div>
        <h2 class="tasks-title">Tasks:</h2>
    <div v-if="view === 'completed'">
        <ol>
            <li v-for="task in completedTasks" :key="task.name" class="task">
                <p>Name : {{task.name}}</p>
                <p>Assignee : {{taskAssignee(task.assignee)}}</p>
                <p>Priority: {{task.priority}}</p>
                <p> Status : {{task.status}}</p>
                <p> Points : {{task.points}}</p>
            </li>
        </ol>
    </div>
    <div v-else>
        <ol v-if="pendingTasks && getAllUsers">
            <li v-for="task in pendingTasks" :key="task.id" class="task">
                <p>Name : <span v-if="!editing">{{task.name}}</span> <input type="text" v-if="editing" v-model="taskName"></p>
                <p>Assignee : <span v-if="!editing">{{taskAssignee(task.assignee)}}</span>
                    <select name="" id="" v-model="assignee" v-if="editing">
                        <option value="" disabled selected>Click to choose</option>
                        <option :value="user.id" v-for="user in employees" :key="user.firstName">{{ user.firstName }}</option>
                    </select>
                </p>
                <p>Priority : <span v-if="!editing">{{task.priority}}</span>
                    <select name="" id="" v-model="priority" v-if="editing">
                        <option value="" disabled selected>Click to choose</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </p>
                <p> Status : {{task.status}}</p>
                <p>Points : <span v-if="!editing">{{task.points}}</span> <input type="text" v-if="editing" v-model="taskPoints"></p>
                <div class="btn-holder">
                    <BaseButton size="small" style="margin-right: 10px;" @click="editing = !editing;"
                        v-html="editing ? 'Cancel' : 'Edit'"></BaseButton>
                    <BaseButton size="small" @click="editing = !editing; saveTask(task)" v-if="editing">Save</BaseButton>
                    <BaseButton size="small" style="background-color: rgb(221, 84, 84); margin-left: 10px;" @click="deleteTask(task)">Delete</BaseButton>
                </div>
            </li>
        </ol>
    </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseButton from '@/components/BaseButton.vue'
import BaseLogo from '@/components/BaseLogo.vue'
    export default {
    name: "AllTasks",
    components: {
    BaseLogo,
    BaseButton
},
    data() {
        return {
            view: null,
            allTasks: [],
            editing: false,
            taskName: '',
            assignee: null,
            taskPoints: null,
            priority: null
        }
    },
    computed: {
        ...mapGetters([
            'tasks',
            'getAllUsers'
        ]),
        completedTasks() {
            return this.allTasks ? this.allTasks.filter(task => task.status === 'done') : []
        },
        pendingTasks() {
            return this.allTasks ? this.allTasks.filter(task => task.status === 'pending') : []
        },
        employees() {
            return this.getAllUsers.data.filter(user => user.role === 'user')
        }
    },
    async mounted() {
        this.view = this.$route.query.view
        await this.$store.dispatch('getTasks', window.sessionStorage.getItem('token'))
        await this.$store.dispatch('getUsers', window.sessionStorage.getItem('token'))
        this.allTasks = this.tasks.data
    },
    methods: {
        async saveTask(task) {
           task.name = this.taskName.length > 0 ? this.taskName : task.name
           task.assignee = this.assignee !== null ? this.assignee : task.assignee
           task.priority = this.priority !== null ? this.priority : task.priority
           task.points = this.taskPoints !== null ? this.taskPoints : task.points
           await this.$store.dispatch('editTask', task)
        },
        taskAssignee(userId) {
            const user = this.getAllUsers ? this.getAllUsers.data.find(user => user.id === userId) : ''
            return user.firstName
        },
        async deleteTask(task) {
           await this.$store.dispatch('deleteTask', task)
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/variables";
.task {
    margin: 10px 0;
    box-sizing: border-box;
    padding: 5px 20px;
    padding-bottom: 10px;
    &:not(last-child) {
        border-bottom: 1px solid black;
    }
    div {
        display: flex;
        justify-content: flex-start;
    }
    p, span {
        text-align: left;
        font-size: $medium;
        font-weight: bold;
        padding: 4px 0;
    }
}

.admin-dashboard-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.tasks-title {
    font-size: $large;
    font-weight: bold;
    text-align: left;
    margin: 15px 0;
    text-decoration:underline;
}
.btn-holder {
    display: flex;
    justify-content: flex-end!important;
    width:100%;
}
</style>