<template>
  <article v-if="num == '0'"></article>

  <article v-else></article>
</template>
<script>
export default {
  name: "Posts",
  props: [
    "name",
    "media",
    "body",
    "years",
    "month",
    "updatedAt",
    "num",
  ],
};
</script>

<style lang="scss">
</style>
