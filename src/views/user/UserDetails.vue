<template>
    <div class="admin-dashboard" v-if="userData">
        <div class="admin-dashboard-header">
            <BaseLogo size="small" />
			<BaseButton size="small" style="margin-top:0;" @click="$router.go(-1)">Back</BaseButton>
        </div>
        <div class="user-info-wrapper">
            <h2>{{userData.firstName}}'s Statistics</h2>
            <div class="user-tasks-statistics">
                <BaseButton class="task-btn">All Tasks Done : {{tasksDone.length}}</BaseButton>
                <p>{{userData.points}} Points</p>
                <h2 style="padding-top:20px">Recent History</h2>
                <ul v-if="tasksDone && tasksDone.length > 0">
                    <li v-for="task in tasksDone" :key="task.id" class="task-desc" :class="{finished : task.status === 'done', progress : task.status === 'progress'}">
                        <p>"{{task.name}}"</p>
                        <p>{{task.points}} Points</p>
                        <span class="badge">{{task.status}}</span>
                    </li>
                </ul>
                <p v-else>{{userData.firstName}} has not done any task recently</p>

                    <h2 style="padding-top:20px">Assigned Tasks</h2>
                    <ul v-if="tasksPending && tasksPending.length > 0">
                        <li v-for="task in tasksPending" :key="task.id" class="task-desc" :class="{finished : task.status === 'done', progress : task.status === 'progress'}">
                            <p>"{{task.name}}"</p>
                            <p>{{task.points}} Points</p>
                            <span class="badge">{{task.status}}</span>
                        </li>
                    </ul>
                    <p v-else>No tasks are assigned to {{userData.firstName}} for this time</p>
            </div>
        </div>
    </div>
</template>

<script>
import BaseLogo from '@/components/BaseLogo.vue';
import BaseButton from '@/components/BaseButton.vue';
import { mapGetters } from 'vuex'

    export default {
        name : "UserView",
        components: {
            BaseLogo,
            BaseButton
        },
        computed: {
            ...mapGetters([
                'getAllUsers',
                'tasks'
            ]),
            tasksDone() {
                return this.userTasks.filter(task => task.status === 'done')
            },
            tasksPending() {
                return this.userTasks.filter(task => task.status === 'pending')
            }
        },
        data() {
            return {
                user: '',
                userData: null,
                userTasks: null,
                recentTasks: [
                    {name: 'Clean the restaurant floor', points: 13, assignedAt: '12/23/2022', status: 'progress'},
                    {name: 'Wash Dishes', points: 13, assignedAt: '12/23/2022', status: 'finished'},
                    {name: 'Create 10 salads in a day', points: 13, assignedAt: '12/23/2022', status: 'finished'},
                    {name: 'Be at work 20 minutes earlier', points: 13, assignedAt: '12/23/2022', status: 'finished'},
                    {name: 'Task Name', points: 13, assignedAt: '12/23/2022', status: 'finished'}
                ]
            }
        },
        async mounted() {
            this.user = this.$route.params.name
            await this.$store.dispatch('getUsers', window.sessionStorage.getItem('token'))
            await this.$store.dispatch('getTasks', window.sessionStorage.getItem('token'))
            this.userData = this.getAllUsers.data.find(user => user.id === this.user)
            this.userTasks = this.tasks.data.filter(task => task.assignee === this.user)
        },
        methods: {
            taskStatus(task) {
                return task.status === 'progress' ? 'In Progress' : 'Finished'
            }
        }
    }
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables";
.user-info-wrapper {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h2 {
        font-size: $large;
        font-weight: bold;
        text-decoration: underline;
    }
}
.admin-dashboard-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
ul {
    width:100%;
}
.admin-dashboard {
	box-sizing: border-box;
	padding: 0 10px;
}
.user-tasks-statistics {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    p {
        font-size: 20px;
        margin: 5px 0;
        font-weight: bold;
        margin-top: 20px;
    }
}
.task-btn {
    background-color: $darkbtn;
    color:$basebtn;
    &:hover {
        background-color: $basebtn;
        color:$darkbtn;
    }
}
.task-desc {
    position: relative;
    box-sizing: border-box;
    padding:10px;
    background-color: $darkbg;
    margin:7px 0;
    border-radius: 10px;
    width:100%;
    min-height: 100px;
    &.progress {
        background-color: $orange;
    }
    &.finished {
        background-color: $green;
    }
    &:nth-child(1) {
        margin-top: 20px;
    }
    p {
        font-size: $medium;
        text-align: left;
        margin:0;
        color:$darktext;
        padding:4px 0;
    }
}
.badge {
    width: 100px;
    height: 19px;
    background-color: #292639;
    color: #ffffff;
    padding: 7px;
    border-radius: 20px;
    font-weight: bold;
    position: absolute;
    right: 10px;
    bottom: 10px;
}
</style>