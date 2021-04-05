<template>
  <main class="all_wait">
    <i class="gg-arrow-left-r abs" @click="backward"></i>
    <Carte
      :name="allCartes.name"
      :media="allCartes.media"
      :year="allCartes.year"
      :commune="allCartes.commune"
      :pays="allCartes.pays"
      :createdAt="allCartes.createdAt"
      :updatedAt="allCartes.updatedAt"
      :departement="allCartes.departement"
      :num="1"
      :id="allCartes.id"
      :tabFiltered="allCartes"
    />
  </main>
</template>

<script>
// @ is an alias to /src

import Carte from "@/components/carte.vue";

export default {
  name: "Home",
  components: {
    Carte,
  },
  data() {
    return {
      allCartes: {},
      test: {},
    };
  },
  methods: {
    backward: function () {
      // go back to the home Page
      this.$router.push({
        name: "accueil",
      });
    },
  },
  created() {
    const storage = localStorage.getItem("openner");
    if (!storage) {
      return this.$router.push({ path: "/" });
    }
    const storagee = localStorage.getItem("filteredTab");
    const a = JSON.parse(storagee);
    console.log(a);

    fetch("http://localhost:5000/api/cartes/" + this.$route.params.id, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then(async (result_) => {
        const arr = await result_.json();
        if (arr.error) {
          this.error = "Oops, une erreur est survenu";
        } else {
          this.allCartes = arr.Carte;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
$orange: darken(orange, 5);
body {
  background: lighten($orange, 10);
}

.abs {
  position: absolute;
}

.gg-arrow-left-r {
  &:hover {
    cursor: pointer;
    animation: turn 800ms infinite;
  }
  transform: scale(2);
  top: 20px;
  left: 20px;
}

.all_wait {
  font-family: "indie flower";
  font-size: 2em;
  text-align: center;
  text-align: center;
  margin-top: 5%;
  h1 {
    font-size: 4em;
    margin-bottom: 0em;
  }
}
.input {
  input {
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
      background: lighten($orange, 15);
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
