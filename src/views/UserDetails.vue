<template>
    <div class="admin-dashboard">
        <div class="admin-dashboard-header">
            <BaseLogo size="small" />
			<BaseButton size="small" style="margin-top:0;" @click="$router.go(-1)">Back</BaseButton>
        </div>
        <div class="user-info-wrapper">
            <h2>{{user}}'s Statistics</h2>
            <div class="user-tasks-statistics">
                <BaseButton class="task-btn">Tasks Done This week : 4</BaseButton>
                <BaseButton class="task-btn">All Tasks Done : 12</BaseButton>
                <p>Points: 50</p>
                <h2 style="padding-top:20px">Recent History</h2>
                <ul>
                    <li v-for="task in recentTasks" :key="task.name" class="task-desc" :class="{finished : task.status === 'finished', progress : task.status === 'progress'}">
                        <p>Working On "{{task.name}}"</p>
                        <p>Points : {{task.points}} </p>
                        <p>Assigned At : {{task.assignedAt}}</p>
                        <span class="badge">{{taskStatus(task)}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BaseLogo from '@/components/BaseLogo.vue';
import BaseButton from '@/components/BaseButton.vue';
    export default {
        name : "UserView",
        components: {
            BaseLogo,
            BaseButton
        },
        data() {
            return {
                user: '',
                recentTasks: [
                    {name: 'Clean the restaurant floor', points: 13, assignedAt: '12/23/2022', status: 'progress'},
                    {name: 'Wash Dishes', points: 13, assignedAt: '12/23/2022', status: 'finished'},
                    {name: 'Create 10 salads in a day', points: 13, assignedAt: '12/23/2022', status: 'finished'},
                    {name: 'Be at work 20 minutes earlier', points: 13, assignedAt: '12/23/2022', status: 'finished'},
                    {name: 'Task Name', points: 13, assignedAt: '12/23/2022', status: 'finished'}
                ]
            }
        },
        mounted() {
            this.user = this.$route.params.name
        },
        methods: {
            taskStatus(task) {
                return task.status === 'progress' ? 'In Progress' : 'Finished'
            }
        }
    }
</script>

<style scoped lang="scss">
@import "../assets/styles/variables";
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
.admin-dashboard {
	box-sizing: border-box;
	padding: 0 10px;
}
.user-tasks-statistics {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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