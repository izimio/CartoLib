<template>
  <article v-if="num == '0'" class="card">
    <div>
      <h3> {{name}} </h3>
      <img :src="media" alt="media">
    </div>
  </article>

  <article v-else></article>
</template>
<script>
export default {
  name: "Posts",
  props: ["name", "media", "year", "commune", "pays", "updatedAt", "num"],
};
</script>

<style lang="scss">
.card{
  border: 2px solid black;
  padding: 1em;
}
</style>
