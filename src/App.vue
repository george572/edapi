<template>
  <h2 v-if="$route.name !== 'home'" class="log-out" @click="$router.push({ path: '/' })" style="font-weight:bold">LOG OUT</h2>
  <router-view/>  
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.log-out {
  position: absolute;
  top: 80px;
  right: 15px;
  background-color: #292639;
  color:white;
  padding:10px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
