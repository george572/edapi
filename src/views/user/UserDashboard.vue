<template>
    <div class="admin-dashboard">
        <div class="admin-dashboard-header">
            <BaseLogo size="small" />
            <BaseButton class="create-task-btn" @click="createTask">Create</BaseButton>
        </div>
        <p class="time-info">{{date}}</p>
        <p class="time-info">{{daysLeftBeforeWeekEnds}} days left before the week ends </p>
        <div class="general-task-status">
            <h2 class="week-title">My Tasks:</h2>
            <ul class="employees-task-completion">
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
    name: "UserDashboard",
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
            allTasks: [],
            user: null
        }
    },
    computed: {
        ...mapGetters([
            'getAllUsers',
            'tasks'
        ]),
    },
    async mounted() {
        this.user = this.$route.params.id
        console.log(this.user)
        this.tasks = await this.$store.dispatch('getTasks', {token :window.sessionStorage.getItem('token'), id: this.user})
        this.allTasks = this.tasks.data
        this.incompleteTasks = this.allTasks.filter(task => task.status === 'pending')
        this.completedTasks = this.allTasks.filter(task => task.status === 'done')
       
    },
    methods: {
        createTask() {
            this.$router.push('/create-task')
        }
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
</style>