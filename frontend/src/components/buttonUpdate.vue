<template>
  <div class="modify-btn" @click="update">
    <i class="gg-pen"></i>
  </div>
</template>

<script>
export default {
  name: "ButtonUpdate",
  props: ["value"],
  data() {
    return {
    };
  },
  created() {},
  methods: {
    update: function () {
      // if the user is updating a post
      this.$router.push({ name: "modification", params: { id: this.$route.params.id } });
    },
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