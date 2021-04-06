<template>
  <main class="all_each">
    <div class="all_each_carte">
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
        :index="this.index"
        :filteredTab="this.filteredTab"
        :arnaque="1"
      >
        <ButtonDelete> </ButtonDelete>

        <ButtonUpdate></ButtonUpdate>
      </Carte>
    </div>
    <i class="gg-arrow-left-r abs" @click="backward"></i>
    <div class="all_carousel">
      <div
        class="all_carousel_each"
        v-for="(carousel, k) in tabCarousel"
        :key="k"
      >
        <CarteCarousel
          :name="carousel.name"
          :media="carousel.media"
          :id="carousel.id"
          :tabFiltered="filteredTab"
          :arnaque="1"
          :currentId="$route.params.id"
        />
      </div>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src

import Carte from "@/components/carte.vue";
import CarteCarousel from "@/components/carteCarousel.vue";
import ButtonUpdate from "@/components/buttonUpdate.vue";
import ButtonDelete from "@/components/buttonDelete.vue";
export default {
  name: "Home",
  components: {
    Carte,
     CarteCarousel,
    ButtonDelete,
    ButtonUpdate,
  },
  data() {
    return {
      allCartes: {},
      filteredTab: {},
      tabCarousel: [],
      index: 0,
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
    const storagebis = localStorage.getItem("filteredTab");
    this.filteredTab = JSON.parse(storagebis);
    // FIND THE INDEX
    while (this.filteredTab[this.index].id != this.$route.params.id) {
      this.index++;
    }

    // creating tab for the carousel
    let i = 0;
    this.tabCarousel.push(this.filteredTab[this.index]);
    while (this.filteredTab[this.index - i] && ++i <= 3) {
      if (this.filteredTab[this.index - i]) {
        this.tabCarousel.unshift(this.filteredTab[this.index - i]);
      }
    }
    i = 0;
    while (this.filteredTab[this.index + i] && ++i <= 3) {
      if (this.filteredTab[this.index + i]) {
        this.tabCarousel.push(this.filteredTab[this.index + i]);
      }
    }
    // tab for the carousel

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

.all_each {
  font-family: "indie flower";
  background: lighten;
  font-size: 2em;
  text-align: center;
  margin-top: 5%;
  background: lighten($orange, 20);
  margin: 0em;
  h1 {
    font-size: 4em;
    margin-bottom: 0em;
  }
  &_carte {
    margin-top: 2em;
  }
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
</style>
