<template>
  <main class="all_add">
    <article>
      <div class="all_add_upper">
        <h1>Ajouter une carte</h1>
      </div>
      <form action="" method="post" autocomplete="on">
        <div>
          <div>
            <label for="titre"> Nom </label>
            <input type="text" v-model="name" required maxlength="50" />
          </div>
        </div>
        <div>
          <div>
            <input type="file" @change="onFileChange" name="img" id="file" />
            <label for="file">Selectionner un média...</label>
          </div>
          <div>
            <img v-if="media" :src="media" />
          </div>
          <div v-if="media">
            <span @click="media = null"> Supprimer le media </span>
          </div>
        </div>
        <div>
          <div>
            <label for="pays"> Pays </label>
            <input type="text" v-model="pays" required maxlength="50" />
          </div>
          <div>
            <div>
              <label for="commune"> Commune </label>
              <input type="text" v-model="commune" required maxlength="50" />
            </div>
             <div>
              <label for="year"> Année </label>
              <input type="text" v-model="year"  />
            </div>
            <div>
              <div>
                <label for="titre"> type </label>
                <select v-model="type">
                  <option>CPA</option>
                  <option>CPSM</option>
                  <option>CPM</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <p>{{ error }}</p>
        <p>{{ type }}</p>
        <div>
          <div v-if="name.length >= 1" @click="createCarte">
            <p>Poster</p>
          </div>
          <div v-else>
            <p>Poster</p>
          </div>
          <div>
            <p @click="backward">Annuler</p>
          </div>
        </div>
      </form>
    </article>
  </main>
</template>

<script>
export default {
  name: "PostUpdate",
  components: {},
  data() {
    return {
      name: "",
      type: "",
      media: "",
      pays: "",
      commune: "",
      year: null,
      error: "",
    };
  },
  created() {
    const storage = localStorage.getItem("openner");
    if (!storage) {
      return this.$router.push({ path: "/" });
    }
  },
  methods: {
    onFileChange(e) {
      // creating a bloblink to preview the file
      const img = e.target.files[0];
      this.media = URL.createObjectURL(img);
    },
    backward: function () {
      // go back to the home Page
      this.$router.push({
        name: "accueil",
      });
    },
    createCarte: function () {
      let file = document.getElementById("file"); // creating a formdata file to send the file
      let formData = new FormData();
      if (this.media != null) {
        formData.append("file", file.files[0]);
      }
      formData.append("name", this.name);
      formData.append("pays", this.pays);
      formData.append("commune", this.commune);
      formData.append("type", this.type);
      formData.append("year", this.year);
      fetch("http://localhost:5000/api/cartes/", {
        method: "POST",
        body: formData,
      })
        .then(async (result_) => {
          const user = await result_.json();
          if (!user.error) {
            this.error = "";
            this.$router.push({
              name: "accueil",
            });
          } else {
            this.error = user.error;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
.all {
  text-align: center;
}
</style>
