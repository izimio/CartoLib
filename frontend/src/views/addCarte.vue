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
            <input
              type="text"
              v-model="pays"
              required
              maxlength="50"
              placeholder="ex: France"
            />
          </div>
          <div class="form_input_location_each">
            <label for="departement"> Département </label>
            <input
              type="text"
              v-model="departement"
              placeholder="ex: Finistère"
            />
          </div>
          <div class="form_input_location_each">
            <label for="commune"> Commune </label>
            <input
              type="text"
              v-model="commune"
              required
              maxlength="50"
              placeholder="ex: Quimper"
            />
          </div>
          <div class="form_input_year">
            <div class="form_input_location_each_y">
              <label for="year"> Année </label>
              <input
                type="text"
                v-model="year"
                placeholder="ex: 1898"
                v-if="!unknowYear"
              />
              <input
                type="text"
                v-model="year"
                disabled
                placeholder="ex: 1898"
                v-if="unknowYear"
              />
            </div>
            <div class="form_input_check">
              <label class="container">
                <input
                  type="checkbox"
                  class="form_input_unknowDate"
                  v-model="unknowYear"
                />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="form_input_rightside">
          <div class="form_input_rightside_filtre">
            <span
              v-bind:class="{
                choosed: type == 'CPA',
                form_input_rightside_filtre_each: type != 'CPA',
              }"
              @click="type = `CPA`"
              >CPA</span
            >
            <span
              v-bind:class="{
                choosed: type == 'CPSM',
                form_input_rightside_filtre_each: type != 'CPSM',
              }"
              @click="type = `CPSM`"
              >CPSM</span
            >
            <span
              v-bind:class="{
                choosed: type == 'CPM',
                form_input_rightside_filtre_each: type != 'CPM',
              }"
              @click="type = `CPM`"
              >CPM</span
            >
          </div>
          <div class="form_input_media">
            <div class="form_input_media_upload">
              <i class="gg-software-upload"></i>
              <input
                type="file"
                @change="onFileChange"
                name="img"
                id="file"
                class="inputfile"
              />
              <label for="file">Selectionner un média</label>
            </div>
          </div>
        </div>
        <div class="form_input_media_preview">
          <div class="form_input_media_preview_img">
            <img v-if="media" :src="media" />
          </div>
          <span
            @click="media = null"
            v-if="media"
            class="form_input_media_preview_del"
          >
            Supprimer le media
          </span>
        </div>
        <p class="error">{{ error }}</p>
        <div class="form_input_send">
          <div
            class="form_input_send_button_on"
            v-if="
              name.length >= 5 &&
              pays.length >= 3 &&
              departement.length >= 3 &&
              commune.length >= 3 &&
              (year || unknowYear) &&
              type &&
              media
            "
            @click="createCarte"
          >
            <button>Créer</button>
          </div>
          <div v-else class="form_input_send_button_off">
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
      unknowYear: false,
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
    ft_capitalize(str){
      str = str.toLowerCase();
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    createCarte: function () {
      let file = document.getElementById("file"); // creating a formdata file to send the file
      let formData = new FormData();
      if (this.media != null) {
        formData.append("file", file.files[0]);
      }
      formData.append("name", this.name);
      formData.append("pays", this.ft_capitalize(this.pays));
      formData.append("commune", this.ft_capitalize(this.commune));
      formData.append("type", this.type);
      if (this.unknowYear) {
        this.year = -1;
      }
      formData.append("year", this.year);
      formData.append("departement", this.ft_capitalize(this.departement));
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
body {
  background: white;
}

.error {
  color: red;
  text-align: center;
}

.choosed {
  background-color: lighten($orange, 10);
  border: 1px solid $orange;
  margin-left: 1em;
  margin-right: 1em;
  padding: 0.2em 0.5em 0.2em 0.5em;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
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
      &_y {
        display: flex;
        flex-direction: column;
      }
    }
    text-align: center;
  }
  &_input_year {
    display: flex;
    align-items: flex-end;
  }
  &_input_rightside {
    display: flex;
    justify-content: center;
    align-items: center;
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
  &_input_media {
    &_preview {
      margin-top: 2em;
      text-align: center;
      img {
        width: 40%;
        box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
      }
      span {
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
  &_input_send {
    display: flex;
    justify-content: center;
    margin-bottom: 2em;
    &_button_off {
      opacity: 0.8;
      padding: 0.5em 1em 0.5em 1em;
      background: $orange;
      button {
        background: none;
        border: none;
        font-weight: bold;
        &:hover {
          cursor: not-allowed;
        }
      }
      &:hover {
        cursor: not-allowed;
      }
    }
    &_button_on {
      opacity: 1;
      padding: 0.5em 1em 0.5em 1em;
      background: lighten($orange, 10);
      button {
        background: none;
        border: none;
        font-weight: bold;
        &:hover {
          cursor: pointer;
        }
      }
      &:hover {
        cursor: pointer;
      }
    }
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
  top: 15px;
  left: 15px;
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

.form_input_media_upload {
  background: lighten($orange, 10);
  width: 14em;
  position: relative;
  border-radius: 5px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  i {
    position: absolute;
    left: 15px;
  }
  &:hover {
    background: lighten($orange, 5);
    cursor: pointer;
  }
  label {
    border-radius: 5px;
    margin: 0em;
    padding: 0.5em 2.45em 0.5em 2.45em;
    z-index: 1;
  }
}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.inputfile + label + i {
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  display: inline-block;
}
.inputfile + label {
  cursor: pointer;
}

@media all and (max-width: 768px) {
  .all_add_upper {
    i {
      margin-bottom: 2em;
    }
  }
  .form {
    &_input_name {
      text-align: center;
      display: flex;
      flex-direction: column;
      margin: 0em 2em 3em 2em;
    }
    &_input_lower {
      display: flex;
      flex-direction: column;
    }
    &_input_location {
      flex-direction: column;
      align-items: center;
      &_each {
        display: flex;
        align-items: center;
        input {
          width: 25em;
        }
        margin: 0em 0em 1.5em 0em;
        &_y {
          width: 8em;
          margin-left: 1.5em;
        }
      }
      text-align: center;
    }
    &_input_rightside {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      &_filtre {
        text-align: center;
        margin-bottom: 2em;
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
}
</style>
