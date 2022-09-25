<template>
  <div class="auth-wrapper">
    <BaseLogo/>
    <form class="form">
      <label for="">
        <span>Email</span>
        <input type="text" v-model="signInData.email">
      </label>
      <label for="">
        <span>Password</span>
        <input type="password" v-model="signInData.password">
      </label>
      <BaseButton @click.prevent="authenticateUser">Sign-in</BaseButton>
      <span class="forget-psw">If you forget your password or user name, contact <a href="#!" class="link">George</a></span>
    </form>
    <p v-if="loading" style="margin-top:20px">LOADING</p>
    <p v-if="responseMessage" style="margin-top:30px">{{responseMessage}}</p>
  </div>
</template>

<script>
import BaseLogo from "../components/BaseLogo.vue"
import BaseButton from "./BaseButton.vue";
import { mapGetters } from 'vuex'
export default {
  components: {
    BaseLogo,
    BaseButton
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'signIn',
    ]),
    responseMessage() {
      return this.signIn
    }
  },
  data() {
    return {
      loading: false,
      message: null,
      signInData: {
        email: '',
        password: ''
      }
    }
  },
//   david@gmail.com
// 12343545
  mounted() {
  },
  methods: {
    async authenticateUser() {
      const data = JSON.stringify({
        "email": this.signInData.email,
        "password": this.signInData.password
      });
      this.loading = true
      await this.$store.dispatch('signIn', data)
      this.loading = false
      if (this.responseMessage.status === 200) {
        console.log(this.responseMessage)
        window.sessionStorage.setItem('token', this.responseMessage.data.token)
        this.responseMessage.data.user.role === 'admin' ? this.$router.push({ name: 'adminDashboard', params: { id: 'dradad' } }) : this.$router.push({ name: 'userDashboard', params: { id: 'dradad' } })
      }
    }
  }
};
</script>
<style lang="scss">
@import "../assets/styles/variables";
.form {
  border-radius: $radius;
  width:100%;
  box-sizing: border-box;
  padding-top: 30px;
  @extend .v-center;
  padding:0 10px;
  .forget-psw {
    padding-top: 50px;
    font-weight: 600;
    font-size: $small;
  }
  .link {
    color:#3D4ABA;
    padding-left: 2px;
  }
}
label {
  @extend .v-center;
  max-width: 320px;
  width:100%;
  margin:7px auto;
  span {
    font-weight: 700;
    align-self: self-start;
  }
}
input, select{
    max-width: 320px;
    width:100%;
    margin:10px 0;
    height: 50px;
    border:none;
    box-sizing: border-box;
    padding:10px 20px;
    background-color: $lightbg;
    border-radius: $radius;
    color:$lightext;
    font-size: 13px;
    font-family: "Poppins";
    box-shadow: $shadow;
    outline:none;
    &:placeholder {
        color:$lightext;
    }
}
</style>
