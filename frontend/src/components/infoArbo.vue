<template>
  <div class="all_arbo">
    <p>{{ allPays }}</p>
  </div>
</template>

<script>
export default {
  name: "InfoArbo",
  props: ["arrAllInfos"],
  data() {
    return {
      countPays: 0,
      countCommune: 0,
      countDepartement: 0,
      allPays: [],
    };
  },
  created() {
  },
  methods: {
  },
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