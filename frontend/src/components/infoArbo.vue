<template>
  <div class="all_arbo">
    <p>{{ test }}</p>
  </div>
</template>

<script>
export default {
  name: "InfoArbo",
  props: [],
  data() {
    return {
      countPays: 0,
      countCommune: 0,
      countDepartement: 0,
      allPays: [],
      test: {},
    };
  },
  created() {
    const storage = localStorage.getItem("inforArbo");
    this.test = JSON.parse(storage);

    // NOMBRE DE CARTE PAR PAYS
    let i;
    let t;
    let res = 0;
    i = -1;
    while (this.test.allDepartements[++i]) {
      if (this.test.allDepartements[i].pays == "Allemagne") {
        t = -1;
        while (this.test.allCommunes[++t]) {
          if (this.test.allCommunes[t].pays == "Allemagne") {
            res += this.test.allCommunes[t].tab.length / 2;
          }
        }
      }
    }
    console.log(res)
    // NOMBRE DE CARTE PAR PAYS
  },
  methods: {},
};
</script>

<style lang="scss">
.modify-btn {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  &:hover {
    background: lighten(blue, 20);
    cursor: pointer;
  }
}
</style>