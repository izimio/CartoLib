<template>
  <article class="card_carousel">
    <div class="card_carousel_img" @click="redirectCarousel()">
      <img
        :src="media"
        alt="media"
        v-bind:class="{
          current: id == currentId,
        }"
      />
      <p class="card_carousel_img_name">{{ name }}</p>
    </div>
  </article>
</template>
<script>
export default {
  name: "CarteCarousel",
  props: ["id", "currentId", "name", "media", "filteredTab", "arnaque"],
  created() {},
  methods: {
    redirectCarousel() {
      let newId;
      newId = this.id;
      if (newId != this.currentId) {
        if (this.arnaque == 0) {
          this.$router.push({
            name: "eachswap",
            params: { id: newId },
          });
        }
        if (this.arnaque == 1) {
          this.$router.push({
            name: "each",
            params: { id: newId },
          });
        }
      }
    },
  },
};
</script>

<style lang="scss">
$orange: darken(orange, 5);
.current {
  box-shadow: 0rem 0.5rem 2rem 0.1rem darken(black, 20);
}
.card_carousel {
  &_img {
    position: relative;
    width: 100%;
    &:hover {
      .card_carousel_img_name {
        opacity: 1;
      }
    }
    &_name {
      opacity: 0;
      font-size: 0.5em;
    }
    img {
      cursor: pointer;
      max-width: 100%;
      min-width: 20%;
      height: 100px;
      margin-bottom: -0.5em;
      &:hover {
        box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
      }
    }
  }
}
</style>