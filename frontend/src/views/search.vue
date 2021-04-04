<template>
  <main class="all">
    <div class="all_upper">
      <i class="gg-arrow-left-r" @click="backward"></i>
      <h1>Filtrer les cartes</h1>
      <div class="form">
        <div class="form_upper form_input">
          <label for="">Rechercher avec un nom</label>
          <input
            class="form_input_nameToSearch"
            type="text"
            v-model="nameToSearch"
          />
        </div>
        <div class="form_lower">
          <div class="form_lower_date">
            <div>
              <div class="form_input">
                <label for="">Date min</label>
                <input type="text" v-model="minY" @input="ft_parseInt()" />
              </div>
              <div class="form_input">
                <label for="">Date max</label>
                <input type="text" v-model="maxY" @input="ft_parseInt()" />
              </div>
            </div>
            <div class="form_input_check">
              Afficher les dates inconnues
              <label class="container">
                <input
                  type="checkbox"
                  class="form_input_unknowDate"
                  v-model="unknownDate"
                />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="form_lower_select">
            <div class="form_input form_lower_select_each">
              <label for="">Pays</label>
              <select name="" id="" v-model="pays" @change="defineDepartement()">
                <option>Tout</option>
                <option v-for="(pays, index) in allPays" :key="index">
                  {{ pays }}
                </option>
              </select>
            </div>
            <div class="form_input form_lower_select_each">
              <label for="">Département</label>
              <select name="" id="" v-model="departement" @change="defineCommune()">
                <option>Tout</option>
                <option v-for="(departement, index) in allDepartement" :key="index">
                  {{ departement }}
                </option>
              </select>
            </div>
            <div class="form_input form_lower_select_each">
              <label for="">Commune</label>
              <select name="" id="" v-model="commune">
                <option>Tout</option>
                <option v-for="(commune, index) in allCommunes" :key="index">
                  {{ commune }}
                </option>
              </select>
            </div>
            <div class="form_input form_lower_select_each">
              <label for="">Type</label>
              <select v-model="type">
                <option>Tout</option>
                <option>CPA</option>
                <option>CPSM</option>
                <option>CPM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <article v-if="allCartes[0]" class="allCarte">
      <div
        v-for="(cartes, index) in allCartes"
        :key="index"
        class="allCarte_each"
      >
        <Carte
          v-if="
            (cartes.type == type || type == `Tout`) &&
            ((cartes.year >= minY && cartes.year <= maxY) ||
              (unknownDate && cartes.year == 'null')) &&
            (cartes.pays == pays || pays == `Tout`) &&
            (cartes.commune == commune || commune == `Tout`) &&
            ft_strstr(cartes.name, nameToSearch) == 1
          "
          :name="cartes.name"
          :media="cartes.media"
          :year="cartes.year"
          :commune="cartes.commune"
          :pays="cartes.pays"
          :createdAt="cartes.createdAt"
          :updatedAt="cartes.updatedAt"
          :departement="cartes.departement"
          :num="0"
        />
      </div>
    </article>
    <article v-else>
      <p>{{ error }}</p>
    </article>
  </main>
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
      allCommunes: [],
      allDepartement: [],
      allPays: [],
      error: "",
      minY: 1800,
      maxY: 2020,
      nameToSearch: "",
      pays: "Tout",
      type: "Tout",
      commune: "Tout",
      departement: "Tout",
      unknownDate: true,
    };
  },
  methods: {
    backward() {
      this.$router.push({ path: "/accueil" });
    },
    ft_strstr(str, to_find) {
      let i;
      let b;

      i = 0;
      b = 0;
      if (!to_find[0]) {
        return 1;
      }
      while (str[i]) {
        while (str[i + b] == to_find[b] && str[i + b]) {
          b++;
        }
        if (b == to_find.length) {
          return 1;
        }
        i++;
        b = 0;
      }
      return 0;
    },
    ft_parseInt() {
      console.log("WESH");
      this.minY = parseInt(this.minY);
      this.maxY = parseInt(this.maxY);
    },
    defineCommune() {
      if (this.departement == "Tout") 
      {
        this.commune = "Tout";
      }
      this.allCommunes = [];
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
          while (this.allCommunes[++j]) {
            if (this.allCommunes[j] == this.allCartes[i].commune) trigger++;
          }
          if (trigger == 0 && this.allCartes[i].departement == this.departement)
            this.allCommunes.push(this.allCartes[i].commune);
        }
      }
    },
    defineDepartement() {
      if (this.pays == "Tout") this.departement = "Tout";
      this.allDepartement = [];
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
          while (this.allDepartement[++j]) {
            if (this.allDepartement[j] == this.allCartes[i].departement) trigger++;
          }
          if (trigger == 0 && this.allCartes[i].pays == this.pays)
            this.allDepartement.push(this.allCartes[i].departement);
        }
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
          this.allPays.sort();
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

h1 {
  text-align: center;
  margin-top: 1.5em;
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

.allCarte {
  margin-top: 3em;
  &_each {
    margin: 0em 5em 10em 5em;
    transition: 400ms;
    box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
    &:hover {
      transform: scale(1.02);
    }
  }
}
.all_upper {
  margin-top: 0;
  background-color: lighten($orange, 5);
}
.form {
  label {
    text-align: center;
  }
  input {
    height: 2em;
    text-align: center;
    border-radius: 5px;
    border: $orange 2px solid;
    &:focus {
      background: lighten($orange, 30);
    }
  }
  &_input {
    margin-top: 0.5em;
    display: flex;
    flex-direction: column;
    &_nameToSearch {
      margin: 1em 5em 1em 5em;
      &:focus {
        transition: 200ms;
        transform: scale(1.01);
      }
    }
    &_unknowDate {
      height: 1.5em;
      width: 1.5em;
      border-radius: 50%;
    }
    &_check {
      display: flex;
      margin-top: 0.5em;
      label {
        margin-left: 1em;
      }
    }
  }
  &_upper {
    text-align: center;
    margin-bottom: 1em;
  }
  &_lower {
    margin-bottom: 1em;
    display: flex;
    justify-content: space-evenly;
    &_select {
      margin-top: -2em;
      width: 60%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-evenly;
      &_each {
        justify-content: space-evenly;
        width: 150px;
        height: 75px;
        padding: 1em;
        border-radius: 15px;
        background-color: $orange;
      }
    }
    .container {
      margin-top: -0.1em;
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 2em;
      cursor: pointer;
      font-size: 22px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .container input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      height: 25px;
      width: 25px;
      background-color: #eee;
    }

    .container:hover input ~ .checkmark {
      background-color: #ccc;
    }

    .container input:checked ~ .checkmark {
      background-color: darken($orange, 10);
    }

    .checkmark:after {
      content: "";
      position: absolute;
      display: none;
    }
    .container input:checked ~ .checkmark:after {
      display: block;
    }

    .container .checkmark:after {
      left: 9px;
      top: 5px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
  @media all and (max-width: 768px) {
    .gg-arrow-left-r {
      color: red;
    }
    .form {
      &_lower {
        flex-direction: column;
        &_date {
          margin: 0 5em 3em 5em;
        }
        &_select {
          width: 100%;
          &_each {
            width: 20%;
          }
        }
      }
    }
    &_input {
      &_check {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
