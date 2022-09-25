import httpClient from "./httpClient";
const SIGN_UP = 'https://us-central1-edapi-47a2b.cloudfunctions.net/app/api/auth/signUp';
const SIGN_IN = 'https://us-central1-edapi-47a2b.cloudfunctions.net/app/api/auth/signIn';
const USERS = 'https://us-central1-edapi-47a2b.cloudfunctions.net/app/api/users';
const CREATE_TASK = 'https://us-central1-edapi-47a2b.cloudfunctions.net/app/api/task';
const ALL_TASKS = 'https://us-central1-edapi-47a2b.cloudfunctions.net/app/api/tasks';
const EDIT_TASK = 'https://us-central1-edapi-47a2b.cloudfunctions.net/app/api/task/';
const USER_TASKS = 'https://us-central1-edapi-47a2b.cloudfunctions.net/app/api/tasks/:id';
// you can pass arguments to use as request parameters/data
const signIn = (data) => httpClient.post(SIGN_IN, data);
// maybe more than one..
const signUp = (email, password) => httpClient.post(SIGN_UP, { email, password });

const users = (token) => httpClient.get(USERS, { headers: {"Authorization" : `Bearer ${token}`} })


const addTask = (token, payload) => httpClient.post(CREATE_TASK, payload, { headers: {"Authorization" : `Bearer ${token}`}})

const getTasks = (token) => httpClient.get(ALL_TASKS, { headers: {"Authorization" : `Bearer ${token}`}})

const getUserTasks = (token, id) => httpClient.get(USER_TASKS, { headers: {"Authorization" : `Bearer ${token}`}, params: {id: id}})

const editTask = (payload) => httpClient.put(EDIT_TASK + payload.id, payload)
export {
    signIn,
    signUp,
    users,
    addTask,
    getTasks,
    editTask,
    getUserTasks
}