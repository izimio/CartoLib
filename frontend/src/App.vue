<template>
  <router-view />
</template>

<script>
export default {};
</script>
<style lang="scss">
@keyframes turn {
  0% {
    transform: scale(2);
    left: 20px;
  }
  50% {
    transform: scale(2);
    left: 15px;
  }
  100% {
    transform: scale(2);
    left: 20px;
  }
}
@import url("https://css.gg/arrow-left-r.css");
@import url('https://css.gg/software-upload.css');
@import url('https://css.gg/push-left.css');
@import url('https://css.gg/push-right.css');
@import url('https://css.gg/pen.css');
@import url('https://css.gg/trash.css');
@import url('https://css.gg/chevron-down-o.css');
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
a {
  color: black;
}
</style>
