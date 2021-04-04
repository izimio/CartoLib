<template>
  <main class="all_add">
    <div class="all_add_upper">
      <i class="gg-arrow-left-r" @click="backward"></i>
      <h1>Ajouter une carte</h1>
    </div>
    <div>
      <div class="form_input_name">
        <label for="titre"> Nom </label>
        <input type="text" v-model="name" required maxlength="50" />
      </div>
      <div class="form_input_lower">
        <div class="form_input_location">
          <div class="form_input_location_each">
            <label for="pays"> Pays </label>
            <input type="text" v-model="pays" required maxlength="50" />
          </div>
          <div class="form_input_location_each">
            <label for="departement"> Départmeent </label>
            <input type="text" v-model="departement" />
          </div>
          <div class="form_input_location_each">
            <label for="commune"> Commune </label>
            <input type="text" v-model="commune" required maxlength="50" />
          </div>
          <div class="form_input_location_each">
            <label for="year"> Année </label>
            <input type="text" v-model="year" />
          </div>
        </div>
        <div class="form_input_rightside">
          <div>
            <label for="titre"> type </label>
            <select v-model="type">
              <option>CPA</option>
              <option>CPSM</option>
              <option>CPM</option>
            </select>
          </div>
          <div class="form_input_media">
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
        </div>
        <p>{{ error }}</p>
        <div>
          <div v-if="name.length >= 1" @click="createCarte">
            <button>Créer</button>
          </div>
          <div v-else>
            <button disabled>Créer</button>
          </div>
        </div>
      </div>
    </div>
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
      departement: "",
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
      formData.append("departement", this.departement);
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
<style lang="scss">
$orange: darken(orange, 5);

.all_add {
  &_upper {
    padding-bottom: 0.5em;
    font-size: 1.5em;
    background-color: lighten($orange, 5);
    h1 {
      font-family: "Indie Flower";
      text-align: center;
      margin-top: 0em;
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
  }
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
input[type="file"] {
  border: none;
}

.form {
  &_input_name {
    text-align: center;
    display: flex;
    flex-direction: column;
    margin: 0em 20em 3em 20em;
  }
  &_input_lower {
    display: flex;
    flex-direction: column;
  }
  &_input_location {
    display: flex;
    justify-content: center;
    &_each {
      width: 20%;
      display: flex;
      flex-direction: column;
      margin-right: 2em;
      margin-left: 1em;
    }
    text-align: center;
  }
}
</style>
