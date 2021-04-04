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
            <label for="departement"> Département </label>
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
          <div class="form_input_rightside_filtre">
            <span
              v-bind:class="{choosed: type== 'CPA', form_input_rightside_filtre_each: type != 'CPA'}"
              @click="type = `CPA`"
              >CPA</span
            >
            <span
               v-bind:class="{choosed: type== 'CPSM', form_input_rightside_filtre_each: type != 'CPSM'}"
              @click="type = `CPSM`"
              >CPSM</span
            >
            <span
            v-bind:class="{choosed: type== 'CPM', form_input_rightside_filtre_each: type != 'CPM'}"
            @click="type = `CPM`"
              >CPM</span
            >
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
        <p>{{ type }}</p>
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
    modifyType() {
      if (this.type == "CPA") {
        console.log("aaa");
      }
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

.choosed {
  background-color: lighten($orange, 10);
  border: 2px solid $orange;
  margin-left: 1em;
  margin-right: 1em;
  padding: 0.2em 0.5em 0.2em 0.5em;
  border-radius: 5px;
  transition: 300ms;
  transform: scale(1.2);
  &:hover{
      background-color: lighten($orange, 20);
  border: 2px solid $orange;
  }
}

.all_add {
  &_upper {
    margin-bottom: 2em;
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
    margin: 0em 20em 2em 20em;
  }
  &_input_lower {
    display: flex;
    flex-direction: column;
  }
  &_input_location {
    margin-bottom: 2em;
    display: flex;
    justify-content: center;
    &_each {
      width: 13%;
      display: flex;
      flex-direction: column;
      margin-right: 2em;
      margin-left: 1em;
    }
    text-align: center;
  }
  &_input_rightside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    &_filtre {
      text-align: center;
      &_each {
        margin-left: 1em;
        margin-right: 1em;
        padding: 0.2em 0.5em 0.2em 0.5em;
        border: 1px solid $orange;
        border-radius: 5px;
        &:hover {
          background-color: lighten($orange, 30);
          cursor: pointer;
        }
      }
    }
  }
}
</style>
