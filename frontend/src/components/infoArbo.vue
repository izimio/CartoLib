<template>
  <div class="all_arbo">
    <div class="all_num_pays">
      <div
        v-for="(infos, yes) in allInfos.allPays"
        :key="yes"
        class="all_num_pays_each"
      >
        <h3
          v-bind:class="{
            choosedbis: choosedPays == infos,
            notChoosed: choosedPays != infos && choosedPays,
            nothingChoosed: !choosedPays,
          }"
          @click="
            choosedPays = infos;
            choosedDepartement = '';
            choosedCommune = '';
            createDepTab(infos);
          "
        >
          {{ infos }} :
          <span class="carteNumber"> {{ ft_calc_pays(infos) }} </span>
        </h3>
      </div>
    </div>
    <div
      v-bind:class="{
        all_num_departements: choosedPays,
        height: !choosedPays,
      }"
    >
      <div class="sep" v-if="tabDep[0]"></div>
      <div
        v-for="(departement, b) in tabDep"
        :key="b"
        class="all_num_departements_each"
      >
        <p
          v-bind:class="{
            choosedbis: choosedDepartement == departement,
            notChoosed: choosedDepartement != departement && choosedDepartement,
            nothingChoosed: !choosedDepartement,
          }"
          @click="
            choosedDepartement = departement;
            choosedCommune = '';
            createComTab(departement);
          "
        >
          {{ departement }} : <span class="carteNumber">{{ ft_calc_departement(departement) }}</span>
        </p>
      </div>
    </div>
    <div
      v-bind:class="{
        all_num_commune: choosedDepartement,
        height: !choosedDepartement,
      }"
    >
      <div class="sep" v-if="tabComFiltered[0]"></div>
      <div
        v-for="(commune, c) in tabComFiltered"
        :key="c"
        class="all_num_commune_each"
      >
        <p
          v-bind:class="{
            choosedbis: choosedCommune == commune,
            notChoosed: choosedCommune != commune && choosedCommune,
            nothingChoosed: !choosedCommune,
          }"
          @click="choosedCommune = commune"
        >
          {{ commune }} : <span class="carteNumber">{{ ft_calc_commune(commune) }}</span>
        </p>
      </div>
    </div>
    <div class="find_button" v-if="choosedPays">
      <div class="find_button_send" @click="redirectSearch()">
        <button class="find_button_send_button">RECHERCHER</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoArbo",
  props: [],
  data() {
    return {
      choosedPays: "",
      choosedCommune: "",
      choosedDepartement: "",
      tabDep: [],
      tabCom: [],
      tabComFiltered: [],
      allPays: [],
      allInfos: {},
      a: 0,
      b: 0,
      c: 0,
    };
  },
  created() {
    const storage = localStorage.getItem("inforArbo");
    this.allInfos = JSON.parse(storage);
    localStorage.removeItem("infoArbo_search");
  },
  methods: {
    redirectSearch() {
      const body = {
        pays: this.choosedPays ? this.choosedPays : null,
        departement: this.choosedDepartement ? this.choosedDepartement : null,
        commune: this.choosedCommune ? this.choosedCommune : null,
      };
      localStorage.setItem("infoArbo_search", JSON.stringify(body));
      this.$router.push({ path: "/search" });
    },
    ft_calc_pays(paysName) {
      let i;
      let t;
      let res = 0;
      i = -1;
      while (this.allInfos.allDepartements[++i]) {
        if (this.allInfos.allDepartements[i].pays == paysName) {
          t = -1;
          while (this.allInfos.allCommunes[++t]) {
            if (this.allInfos.allCommunes[t].pays == paysName) {
              res += this.allInfos.allCommunes[t].tab.length / 2;
            }
          }
        }
      }
      return res;
    },
    ft_calc_departement(departementName) {
      let i;
      i = -1;
      while (this.allInfos.allCommunes[++i]) {
        if (this.allInfos.allCommunes[i].departement == departementName) {
          return this.allInfos.allCommunes[i].tab.length / 2;
        }
      }
      return 0;
    },
    ft_calc_commune(communeName) {
      let i;
      i = -1;
      let res = 0;
      while (this.tabCom[++i]) {
        if (this.tabCom[i] == communeName) {
          res++;
        }
      }
      return res;
    },
    createDepTab(paysName) {
      this.tabComFiltered = [];
      this.tabDep = [];
      let i;

      i = -1;
      while (this.allInfos.allDepartements[++i]) {
        if (this.allInfos.allDepartements[i].pays == paysName) {
          this.tabDep = this.allInfos.allDepartements[i].tab;
        }
      }
      this.tabDep.sort();
    },
    createComTab(departementName) {
      this.tabCom = [];
      let i;
      let t;
      t = -1;
      i = -1;
      while (this.allInfos.allCommunes[++i]) {
        if (this.allInfos.allCommunes[i].departement == departementName) {
          while (this.allInfos.allCommunes[i].tab[++t]) {
            if (t % 2 == 0) {
              this.tabCom.push(this.allInfos.allCommunes[i].tab[t]);
            }
          }
        }
      }
      t = -1;
      let trigger;

      this.tabComFiltered = [];
      while (this.tabCom[++t]) {
        i = -1;
        trigger = 0;
        while (this.tabCom[++i]) {
          if (this.tabComFiltered[i] == this.tabCom[t]) {
            trigger++;
          }
        }
        if (trigger == 0) {
          this.tabComFiltered.push(this.tabCom[t]);
        }
      }
      this.tabComFiltered.sort();
    },
    calc_all(paysName) {
      let i;
      let t;
      let res = 0;
      i = -1;
      while (this.allInfos.allDepartements[++i]) {
        if (this.allInfos.allDepartements[i].pays == paysName) {
          t = -1;
          while (this.allInfos.allCommunes[++t]) {
            if (this.allInfos.allCommunes[t].pays == paysName) {
              res += this.allInfos.allCommunes[t].tab.length / 2;
            }
          }
        }
      }
      return res;
    },
  },
};
</script>

<style lang="scss">
$orange: darken(orange, 5);

.carteNumber {
text-decoration: underline;
}

.height {
  height: 0%;
  border: 2px solid red;
  opacity: 0;
}

.all_arbo {
  font-weight: bold;
  transition: 600ms;
  background-color: lighten($orange, 5);
}

.nothingChoosed {
  background-color: lighten($orange, 2);
  padding: 0.5em;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: darken($orange, 3);
  }
}
.choosedbis {
  opacity: 1;
  padding: 0.5em;
  border-radius: 10px;
  background-color: darken(lightblue, 10);
  &:hover {
    cursor: pointer;
  }
}

.notChoosed {
  opacity: 0.8;
  padding: 0.5em;
  border-radius: 10px;
  background-color: lighten($orange, 2);
  &:hover {
    cursor: pointer;
    background-color: darken($orange, 3);
  }
}

.sep {
  border-bottom: 4px solid $orange;
  height: 4px;
  width: 100%;
}

.all_num {
  transition: 400ms;
  &_pays {
    background-color: lighten($orange, 5);
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    padding-bottom: 1em;
    &_each {
      width: 23%;
      margin-right: 1%;
      margin-left: 1%;
    }
    h3 {
      text-align: center;
    }
  }
  &_departements {
    transition: 400ms;
    padding-top: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    &_each {
      width: 23%;
      margin-right: 1%;
      margin-left: 1%;
      p {
        text-align: center;
      }
    }
  }
  &_commune {
    transition: 400ms;
    padding-top: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    &_each {
      width: 23%;
      margin-right: 1%;
      margin-left: 1%;
      p {
        text-align: center;
      }
    }
  }
}
.find_button {
  background-color: lighten($orange, 5);
  padding-bottom: 1em;
  display: flex;
  justify-content: center;
  &_send {
    height: 2em;
    width: 10em;
    background-color: $orange;
    &:hover {
      background-color: darken($orange, 5);
    }
    button {
      font-weight: bold;
      cursor: pointer;
      background: none;
      border: none;
      width: 100%;
      height: 100%;
    }
  }
}
</style>