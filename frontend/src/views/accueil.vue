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
    <div class="all_hub_upper_chevron">
      <div
        class="all_hub_upper_chevron_i"
        v-bind:class="{
          down: showArbo % 2 == 0,
          up: showArbo % 2 != 0,
        }"
      >
        <i class="gg-chevron-down-o" @click="showArbo++"></i>
      </div>
    </div>
    <div class="all_arbo" v-if="showArbo % 2 == 0" :key="cursed">
      <InfoArbo />
    </div>
    <h2 class="subtitle">Les plus récentes</h2>
    <article v-if="allCartes[0]" class="allCartebis">
      <div
        v-for="(cartes, index) in allCartes"
        :key="index"
        class="allCartebis_eachbis"
      >
        <Carte
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
          :index="index"
        />
      </div>
    </article>
    <article v-else class="nothing">
      <p class="nothing_msg">Aucune carte à afficher</p>
    </article>
  </div>
</template>

<script>
import Carte from "@/components/carte.vue";
import InfoArbo from "@/components/infoArbo.vue";

export default {
  name: "Home",
  components: {
    Carte,
    InfoArbo,
  },
  data() {
    return {
      showArbo: 1,
      allCartes: [],
      AllInfosArbo: {},
      allPays: [],
      allDepartement: [],
      allCommunes: [],
      allCount: [],
      allCarteNotFiltered: [],
      error: "",
      cursed: 0,
    };
  },
  methods: {},
  created() {
    this.cursed++;
    const storage = localStorage.getItem("openner");
    if (!storage) {
      return this.$router.push({ path: "/" });
    }

    fetch("http://localhost:5000/api/cartes/created", {
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
          let p;
          p = -1;
          while (arr.carte[++p] && p < 15) {
            this.allCartes.push(arr.carte[p]);
          }
          localStorage.setItem("filteredTab", JSON.stringify(this.allCartes));
          // DEFINE PAYS
          let i;
          let j;
          let t;
          let trigger;
          t = -1;
          i = -1;
          while (++t < arr.carte.length) {
            while (arr.carte[++i]) {
              j = -1;
              trigger = 0;
              while (this.allPays[++j]) {
                if (this.allPays[j] == arr.carte[i].pays) trigger++;
              }
              if (trigger == 0) this.allPays.push(arr.carte[i].pays);
            }
          }
          // DEFINE DEPARTEMENT
          let k;
          i = -1;
          k = -1;
          t = -1;
          while (this.allPays[++k]) {
            let allDep = [];
            t = -1;
            while (++t < arr.carte.length) {
              i = -1;
              while (arr.carte[++i]) {
                j = -1;
                trigger = 0;
                while (allDep[++j]) {
                  if (allDep[j] == arr.carte[i].departement) trigger++;
                }
                if (trigger == 0 && arr.carte[i].pays == this.allPays[k])
                  allDep.push(arr.carte[i].departement);
              }
            }
            let tmp = {};
            tmp = {
              pays: this.allPays[k],
              tab: allDep,
            };
            this.allDepartement.push(tmp);
          }

          // DEFINE COMMUNE
          let o;
          o = -1;
          p = -1;
          i = -1;
          k = -1;
          while (++k < this.allPays.length) {
            o = -1;
            while (this.allDepartement[k].tab[++o]) {
              let allCom = [];
              t = -1;
              while (++t < arr.carte.length) {
                i = -1;
                while (arr.carte[++i]) {
                  j = -1;
                  trigger = 0;
                  while (allCom[++j]) {
                    if (allCom[j].id == arr.carte[i].id) trigger++;
                  }
                  if (
                    trigger == 0 &&
                    arr.carte[i].pays == this.allPays[k] &&
                    arr.carte[i].departement == this.allDepartement[k].tab[o]
                  ) {
                    allCom.push(arr.carte[i].commune);
                    let id = {
                      id: arr.carte[i].id,
                    };
                    allCom.push(id);
                  }
                }
              }
              let tmp = {};
              tmp = {
                pays: this.allPays[k],
                departement: this.allDepartement[k].tab[o],
                tab: allCom,
              };
              this.allCommunes.push(tmp);
            }
          }
          this.AllInfosArbo = {
            allPays: this.allPays,
            allDepartements: this.allDepartement,
            allCommunes: this.allCommunes,
          };
          localStorage.setItem("inforArbo", JSON.stringify(this.AllInfosArbo));
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
  background: white;
}

.up {
  i {
    transform: rotate(180deg) scale(2);
  }
}

.down {
  i {
    transform: rotate(0deg) scale(2);
  }
}
.nothing {
  justify-content: center;
  display: flex;
  p {
    padding: 1em;
    text-align: center;
    border: 1px solid red;
    width: 15em;
  }
}

.subtitle {
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
    button {
      margin-right: 2em;
      margin-left: 2em;
      background-color: $orange;
      border: none;
      width: 100px;
      height: 75px;
      &:hover {
        background-color: darken($orange, 10);
        cursor: pointer;
      }
    }
    h1 {
      font-size: 3em;
      font-family: "Indie Flower";
      margin-top: 0.9em;
    }
    background-color: lighten($orange, 5);
    &_chevron {
      padding-bottom: 1.5em;
      &_i {
        margin-left: 4em;
        margin-top: -0.5em;
        i {
          transition: 500ms;
          &:hover {
            opacity: 0.8;
            cursor: pointer;
          }
        }
      }
      background-color: lighten($orange, 5);
    }
  }
}
.allCartebis {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1em;
  &_eachbis {
    overflow-x: hidden;
    width: 20%;
    box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
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
