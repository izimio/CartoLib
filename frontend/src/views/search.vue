<template>
  <div class="home">
    <router-link to="/accueil"> partir</router-link>
    <p>{{ allPays }}</p>
    <div>
      <h1>Filtrer</h1>
      <label for="">date min</label>
      <input type="text" v-model="minY" />
      <label for="">date max</label>
      <input type="text" v-model="maxY" />
      <label for="">rechercehr avec un nom</label>
      <input type="text" v-model="nameToSearch" />
      <label for="">pays</label>
      <select name="" id="" v-model="pays">
        <option v-for="(pays, index) in allPays" :key="index">
          {{ pays }}
        </option>
      </select>
      <label for="">type</label>
      <select v-model="type">
        <option>Tout</option>
        <option>CPA</option>
        <option>CPSM</option>
        <option>CPM</option>
      </select>
    </div>
    <article v-if="allCartes[0]" class="all">
      <div v-for="(cartes, index) in allCartes" :key="index">
        <Carte
          v-if="
            (cartes.type == type || type == `Tout`) &&
            (cartes.year >= minY &&
            cartes.year <= maxY)
          "
          :name="cartes.name"
          :media="cartes.media"
          :year="cartes.year"
          :createdAt="cartes.createdAt"
          :updatedAt="cartes.updatedAt"
          :num="0"
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
      allCartes: {},
      allPays: [],
      error: "",
      minY: 0,
      maxY: 2020,
      nameToSearch: "",
      pays: "",
      type: "Tout",
    };
  },
  methods: {
    login() {
      if (this.password == this.key) {
        console.log("aa");
        this.$router.push({ path: "/accueil" });
      }
    },
    ft_strstr(str, to_find) {
      let i;
      let b;

      i = 0;
      b = 0;
      if (to_find[0] == "\0") return 1;
      while (str[i] != "\0") {
        while (str[i + b] == to_find[b] && str[i + b] != "\0") b++;
        if (to_find[b] == "\0") return 1;
        i++;
        b = 0;
      }
      return 0;
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

          // creating the tab
          let i;
          let j;
          let t;
          let trigger;
          t = -1;
          i = -1;
          while (++t < this.allCartes.length) {
            while (this.allCartes[++i]) {
              j = -1;
              trigger = 0;
              while (this.allPays[++j]) {
                if (this.allPays[j] == this.allCartes[i].pays) trigger++;
              }
              if (trigger == 0) this.allPays.push(this.allCartes[i].pays);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
</style>
