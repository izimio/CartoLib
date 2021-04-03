<template>
  <div class="home">
      <p> {{ key }}a  </p>
    <form action="#">
      <input type="text" v-model="password" @keyup.enter="login"/>
    </form>
    <button @click="login">Connexion</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      password: "",
      key: process.env.VUE_APP_PASS
    };
  },
  methods: {
    login() {
      if (this.password == this.key)
      {
        localStorage.setItem("openner", JSON.stringify("open"));
          this.$router.push({ name: "accueil" });
      }
    },
  },
};
</script>

<style lang="scss">
</style>
