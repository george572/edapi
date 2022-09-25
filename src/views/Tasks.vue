<template>
    <div class="admin-dashboard">
        <div class="admin-dashboard-header">
            <BaseLogo size="small" />
            <BaseButton size="small" style="margin-top:0;" class="create-task-btn" @click="$router.push('/admin/dashboard')">Back</BaseButton>
        </div>
        <h2 class="tasks-title">Tasks:</h2>
    <div v-if="view === 'completed'">

    </div>
    <div v-else>
        <ol>
            <li v-for="task in tasks.data" :key="task.name" class="task" @click="editTask(task)">
                <p>Name : {{task.name}}</p>
                <p>Assignee : {{task.assignee}}</p>
                <p>Priority: {{task.priority}}</p>
                <p> Status : {{task.status}}</p>
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
            view: null
        }
    },
    computed: {
        ...mapGetters([
            'tasks'
        ]),
    },
    mounted() {
        this.view = this.$route.query.view
    },
    methods: {
        editTask(task) {
            this.$store.dispatch('editTask', task)
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
    p {
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
</style>