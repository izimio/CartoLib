<template>
  <div class="delete-btn-trash" @dblclick="delette()">
    <i class="gg-trash"></i>
  </div>
</template>

<script>
export default {
  name: "ButtonDelete",
  props: ["id", "value"],
  created() {
  },
  methods: {
    delette: function () {
        // if the user is deleting a post
        fetch("http://localhost:5000/api/cartes/" + this.$route.params.id, {
          method: "DELETE",
        })
          .then(async (result_) => {
            const res = await result_.json();
            if (!res.error) {
                this.$router.push({ path: "/accueil" });
            } else {
              alert("Un problème est survenue lors de la suppression");
            }
          })
          .catch((error) => {
            console.log(error);
          }); 
    },
  },
};
</script>

<style lang="scss">
.delete-btn-trash {
  width: 50%;
  height: 100%;
  display: flex;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  align-items: center;
  justify-content: center;
  &:hover{
      background: lighten(red,20);
      cursor: pointer;
  }
}
.gg-trash {
  margin-right: 0.5em;
}
</style>