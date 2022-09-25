import { createStore } from 'vuex'
import { signIn, users, addTask, getTasks, editTask, getUserTasks } from '@/api/users';
export default createStore({
  state: {
    account: null,
    users: [],
    tasks: [],
    rume: 9,
    userTasks: []
  },
  getters: {
    signIn(state) {
      return state.account
    },
    getAllUsers(state) {
      return state.users
    },
    tasks(state) {
      return state.tasks
    },
    getUserTasks(state) {
      return state.userTasks
    }
  },
  mutations: {
    setAccount(state, account) {
      state.account = account;
    },
    setUsers(state, users) {
      state.users = users
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    setUserTasks(state, tasks) {
      state.userTasks = tasks
    }
  },
  actions: {
    async signIn(context, payload) {
      try {
        const response = await signIn(payload)
        context.commit('setAccount', response)
      }
      catch (err) {
        context.commit('setAccount', err)
      }
    },
    async getUsers(context, token) {
      try {
        const response = await users(token)
        context.commit('setUsers', response)
      }
      catch (err) {
        context.commit('setUsers', [])
      }
    },
    async addTask(state , payload) {
      try {
        const response = await addTask(payload.token, payload.task)
        console.log(response, 'vuexidan taskze')
      }
      catch (err) {
        console.log('error')
      }
    },
    async getTasks(context, token) {
      try {
        const response = await getTasks(token)
        context.commit('setTasks', response)
      }
      catch (err) {
        context.commit('setTasks', [])
      }
    },
    async getUserTasks(context, payload) {
      try {
        const response = await getUserTasks(payload.token, payload.id)
        context.commit('setUserTasks', response)
      }
      catch (err) {
        context.commit('setUserTasks', [])
      }
    },
    async editTask(context, payload) {
      try {
        const response = await editTask(payload)
        console.log(response, 'viuexx')
      }
      catch (err) {
        context.commit('rame')
      }
    }
  },
  modules: {
  }
})
