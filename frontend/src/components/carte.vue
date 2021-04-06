<template>
  <article v-if="num == '0'" class="card">
    <router-link :to="{ name: 'each', params: { id: id } }">
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
  <article v-else-if="num == '1'" class="card_v2">
    <div class="card_core_v2">
      <div class="card_core_img_v2">
        <img :src="media" alt="media" />
        <div
          class="card_core_img_v2_push_left"
          v-if="index - 1 >= 0"
          @click="redirectBackward(index)"
        >
          <i class="gg-push-left"></i>
        </div>
        <div
          class="card_core_img_v2_push_right"
          v-if="index + 1 <= filteredTab.length - 1"
          @click="redirectForward(index)"
        >
          <i class="gg-push-right"></i>
        </div>
        <div class="button">
          <slot></slot>
        </div>
      </div>
      <div class="card_core_infos_v2">
        <h3>{{ name }}</h3>
        <div class="card_core_infos_v2_sub">
          <span class="card_core_pays">{{ pays }} | </span>
          <span class="card_core_commune"> {{ departement }} / </span>
          <span class="card_core_commune">{{ commune }} | </span>
          <span v-if="year != -1" class="card_core_date">{{ year }} </span>
          <span v-else class="card_core_date"> date inconnue</span>
        </div>
      </div>
    </div>
  </article>
  <article v-else class="card_v2">
    <h1>BITE</h1>
    <div class="card_core_v2">
      <div class="card_core_img_v2">
        <img :src="media" alt="media" />
        <div
          class="card_core_img_v2_push_left"
          v-if="index - 1 >= 0"
          @click="redirectBackward(index)"
        >
          <i class="gg-push-left"></i>
        </div>
        <div
          class="card_core_img_v2_push_right"
          v-if="index + 1 <= filteredTab.length - 1"
          @click="redirectForward(index)"
        >
          <i class="gg-push-right"></i>
        </div>
        <div class="button">
          <slot></slot>
        </div>
      </div>
      <div class="card_core_infos_v2">
        <h3>{{ name }}</h3>
        <div class="card_core_infos_v2_sub">
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
  name: "Carte",
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
    "filteredTab",
    "arnaque",
  ],
  created() {},
  methods: {
    redirectBackward(index) {
      let newId;
      newId = this.filteredTab[index - 1].id;
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
    },
    redirectForward(index) {
      let newId;
      newId = this.filteredTab[index + 1].id;
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
    },
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
  &_v2 {
    margin-top: -2em;
  }
  &_core {
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
      max-height: 250px;
      img {
        width: auto;
        max-width: 90%;
        height: 250px;
        overflow-x: hidden;
        margin-left: -1em;
      }
      width: 100%;
      &_v2 {
        transition: 400ms;
        &:hover {
          .button {
            height: 1.5em;
            opacity: 0.7;
          }
        }
        .button {
          padding: 0em;
          transition: 400ms;
          border-radius: 15px;
          opacity: 0;
          width: 5em;
          height: 0em;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          position: absolute;
          left: 45%;
          bottom: 40px;
          background: lighten($orange, 10);
        }
        position: relative;
        img {
          margin-top: 1em;
          width: auto;
          max-width: 100%;
          min-width: 20%;
          max-height: 700px;
          min-height: 700px;
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
          &:hover {
            cursor: pointer;
            background: darken($orange, 5);
          }
          i {
            margin-left: 0.1em;
          }
        }
        &_push_right {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          width: 1.5em;
          height: 1.5em;
          border-radius: 50%;
          background: $orange;
          top: 50%;
          right: 5%;
          transition: 400ms;
          &:hover {
            cursor: pointer;
            background: darken($orange, 5);
          }
          i {
            margin-right: 0.1em;
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
      &_v2 {
        padding-bottom: 1em;
        &_sub {
          margin-top: -1em;
        }
        h3 {
          margin-top: 0em;
        }
      }
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