<template>
  <article v-if="num == '0'" class="card">
    <div class="card_core">
      <img :src="media" alt="media" />
      <div>
        <h3>{{ name }}</h3>
        <span class="card_core_pays">{{ pays }} | </span>
        <span class="card_core_commune">{{ commune }} | </span>
        <span v-if="year != 'null'" class="card_core_date">{{ year }} </span>
        <span v-else class="card_core_date"> date inconnue</span>
      </div>
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
.card {
  padding: 1em;
  &_core {
    text-align: center;
    &_pays {
      font-weight: bold;
    }
    &_date {
      font-style: italic;
    }
    &:hover {
        transition: 400ms;
      transform: scale(1.02);
    }
  }
}
</style>
