<template>
  <article v-if="num == '0'" class="card">
    <router-link :to="{ name: 'each', params: {id: id} }">
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
            <span v-if="year != -1" class="card_core_date">{{ year }} </span>
            <span v-else class="card_core_date"> date inconnue</span>
          </div>
        </div>
      </div>
    </router-link>
  </article>
  <article v-else>
    <div class="card_core_v2">
      <div class="card_core_img_v2">
        <a :href="media">
          <img :src="media" alt="media" />
          <div class="card_core_img_v2_push_left">
            <i class="gg-push-left"></i>
          </div>
        </a>
      </div>
      <div class="card_core_infos">
        <h3>{{ name }}</h3>
           <p> {{ tabFiltered }}</p>
        <div class="card_core_infos_sub">
          <span class="card_core_pays">{{ pays }} | </span>
          <span class="card_core_commune"> {{ departement }} / </span>
          <span class="card_core_commune">{{ commune }} | </span>
          <span v-if="year != -1" class="card_core_date">{{ year }} </span>
          <span v-else class="card_core_date"> date inconnue</span>
        </div>
      </div>
    </div>
  </article>
</template>
<script>
export default {
  name: "Posts",
  props: [
    "id",
    "name",
    "media",
    "year",
    "commune",
    "pays",
    "departement",
    "updatedAt",
    "num",
    "index",
    "tabFiltered",
  ],
  created() {
  },
};
</script>

<style lang="scss">
$orange: darken(orange, 5);
.card {
  margin-left: -1em;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  text-align: center;
  padding: 0.5em;
  &:hover {
    opacity: 0.9;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 1.5em;
    font-family: "Indie Flower";
  }
  &_core {
    &_v2 {
      margin-top: -2em;
    }
    position: relative;
    &:hover {
      cursor: pointer;
    }
    width: 100%;
    padding: 1em 1em 0em 1em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    &_img {
      img {
        width: 90%;
        overflow-x: hidden;
        margin-left: -1em;
      }
      width: 100%;
      &_v2 {
        position: relative;
        img {
          width: 70%;
          box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
        }
        &_push_left {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 1.5em;
          height: 1.5em;
          border-radius: 50%;
          background: $orange;
          top: 50%;
          left: 5%;
          transition: 400ms;
          &:hover{
            background: darken($orange,5);
          }
          i{
            margin-left: 0.1em;
          }
        }
      }
    }
    &_pays {
      font-weight: bold;
    }
    &_date {
      font-style: italic;
    }
    &_infos {
      height: 100%;
      width: 100%;
      bottom: 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: 500ms;
      h3 {
        word-break: break-all;
        font-weight: bold;
        margin-bottom: 0em;
        margin-left: 1.5em;
        margin-right: 1.5em;
        line-height: 20px;
      }
      span {
        margin-top: 1em;
        font-size: 1em;
      }
    }
  }
}
</style>