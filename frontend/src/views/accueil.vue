<template>
  <div class="home">
    <div>
      <h2>postez</h2>
      <router-link to="/add">
        <button>ICI</button>
      </router-link>
    </div>
    <article v-if="allCartes[0] || error[1]" class="all">
        <Carte
          v-for="(cartes, index) in allCartes"
          :key="index"
          :name="cartes.name"
          :media="cartes.media"
          :createdAt="cartes.createdAt"
          :updatedAt="cartes.updatedAt"
          :num="0"
        />
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
      allCartes: {},
      error: "",
    };
  },
  methods: {
    login() {
      if (this.password == this.key) {
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
          this.allCartes = arr.carte;
          console.log("aa");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
.all {
  display: flex;
  justify-content: space-evenly;
}
</style>
