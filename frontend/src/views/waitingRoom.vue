<template>
  <main class="all_wait">
    <h1>Connexion</h1>
    <h3>Entrez le mot de passe du site</h3>
    <div class="input">
      <input type="password" v-model="password" @keyup.enter="login()" />
      <div class="input_send">
        <button @click="login" class="input_send_button">Connexion</button>
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      password: "",
      key: process.env.VUE_APP_PASS,
    };
  },
  methods: {
    login() {
      if (this.password == this.key) {
        localStorage.setItem("openner", JSON.stringify("open"));
        this.$router.push({ path: "/accueil" });
      }
    },
  },
};
</script>

<style lang="scss">
$orange: darken(orange, 5);
body {
  background: $orange;
  height: 100%;
}

.all_wait {
  font-family: "indie flower";
  font-size: 2em;
  text-align: center;
  margin-top: 5%;
  h1 {
    font-size: 4em;
    margin-bottom: 0em;
  }
}
.input {
  input{
    font-weight: bold;
    font-size: 0.6em;
    height: 3em;
    width: 25em;
    border: none;
    border-radius: 5px;
  }
  &_send {
    display: flex;
    justify-content: center;
    margin-top: 2em;
    &_button {
      opacity: 1;
      border-radius: 15px;
      padding: 1.5em 4em 1.5em 4em;
       background: lighten($orange, 15);;
      border: none;
      font-weight: bold;
              font-size: 0.5em;
      button {
        background: none;
        border: none;
        font-weight: bold;
        &:hover {
          cursor: pointer;
          background: lighten($orange, 5);
        }
      }
      &:hover {
        cursor: pointer;
        background: lighten($orange, 5);
      }
    }
  }
}
</style>
