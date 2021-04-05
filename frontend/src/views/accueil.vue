<template>
  <div class="all_hub">
    <div class="all_hub_upper">
      <router-link to="/add">
        <button>Ajouter un carte</button>
      </router-link>
      <h1>Accueil</h1>
      <router-link to="/search">
        <button>Filtrer</button>
      </router-link>
    </div>
    <h2 class="subtitle">Les plus récentes</h2>
    <article v-if="allCartes[0]" class="allCartebis">
      <div
        v-for="(cartes, index) in allCartes"
        :key="index"
        class="allCartebis_eachbis"
      >
        <Carte
          v-if="index < 10"
          :name="cartes.name"
          :media="cartes.media"
          :year="cartes.year"
          :commune="cartes.commune"
          :pays="cartes.pays"
          :createdAt="cartes.createdAt"
          :updatedAt="cartes.updatedAt"
          :departement="cartes.departement"
          :num="0"
          :id="cartes.id"
        />
      </div>
    </article>
    <article v-else>
      <p>{{ error }}</p>
    </article>
  </div>
</template>

<script>
import Carte from "@/components/carte.vue";

export default {
  name: "Home",
  components: {
    Carte,
  },
  data() {
    return {
      allCartes: [],
      error: "",
    };
  },
  methods: {
    login() {
      if (this.password == this.key) {
        console.log("aa");
        this.$router.push({ path: "/accueil" });
      }
    },
  },
  created() {
    const storage = localStorage.getItem("openner");
    if (!storage) {
      return this.$router.push({ path: "/" });
    }

    fetch("http://localhost:5000/api/cartes/", {
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
          let t;

          t = -1;
          while(++t < 10)
          {
            this.allCartes.push(arr.carte[t]);
          }
          localStorage.setItem("filteredTab", JSON.stringify(this.allCartes));
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

body{
  background: white;
}

.subtitle{
        font-size: 2em;
      font-family: "Indie Flower";
      text-align: center;
      text-decoration: underline;
      margin-top: 0.5em;
}
.all_hub {
  &_upper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button{
      margin-right: 2em;
      margin-left: 2em;
      background-color: $orange;
      border: none;
      width: 100px;
      height: 75px;
      &:hover{
        background-color: darken($orange,10);
        cursor: pointer;
      }
    }
    h1 {
      font-size: 3em;
      font-family: "Indie Flower";
      margin-top: 0.9em;
    }
    background-color: lighten($orange, 5);
  }
}
.allCartebis {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &_eachbis {
    overflow-x: hidden;
    width: 50%;
  }
}

  @media all and (max-width: 768px) {
.allCartebis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  &_eachbis {
    overflow-x: hidden;
    padding: 0.5em;
    transform: scale(0.7);
    width: 100%;
    &:hover {
      transition: 400ms;
      transform: scale(0.75);
    }
  }
}
  }
</style>
