<template>
  <article v-if="num == '0'" class="card">
    <div class="card_core">
      <div class="card_core_img">
        <img :src="media" alt="media" />
      </div>
      <div class="card_core_infos">
        <h3>{{ name }}</h3>
        <div class="card_core_infos_sub">
          <span class="card_core_pays">{{ pays }} | </span>
          <span class="card_core_commune"> {{ departement }} / </span>
          <span class="card_core_commune">{{ commune }} | </span>
          <span v-if="year != 'null'" class="card_core_date">{{ year }} </span>
          <span v-else class="card_core_date"> date inconnue</span>
        </div>
      </div>
    </div>
  </article>

  <article v-else></article>
</template>
<script>
export default {
  name: "Posts",
  props: ["name", "media", "year", "commune", "pays", "departement", "updatedAt", "num"],
};
</script>

<style lang="scss">
.card {
  &:hover{
    cursor: pointer;
  }
  padding: 0.5em;
  h3 {
    font-size: 2em;
    margin-top: 0.2em;
    font-family: "Indie Flower";
  }
  &_core {
    padding: 1em;
    &_img {
      width: 100%;
    }
    img {
      margin-left: -1em;
      object-fit: cover;
    }
    text-align: center;
    &_pays {
      font-weight: bold;
    }
    &_date {
      font-style: italic;
    }
    &_infos {
      &_sub {
        margin-top: -2em;
      }
    }
  }
}
@media all and (max-width: 1250px) {
  .card {
    &_core {
      img {
        width: 100%;
      }
    }
  }
}

@media all and (max-width: 765px) {
  .card {
    &_core {
      img {
        height: 20em;
      }
    }
  }
}
</style>
524