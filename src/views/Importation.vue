<template>
  <div class="parse">
    <h1>Parse CSV to JSON</h1>
    <v-btn color="primary" round outline @click="$refs.file.click()">Choose File ({{label}})</v-btn>
    <input
      class="hidden"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      ref="file"
      @change="selectFile"
      id="fileInput"
      type="file"
    >
    <v-btn
      color="blue-grey"
      class="white--text"
      v-if="selectedFile"
      @click="readAndParseFile"
      round
    >
      Upload
      <v-icon right dark>cloud_upload</v-icon>
    </v-btn>
    <br />
    <v-btn color="primary" round class="white--text" v-if="doc" @click="save" download>
      Enregistrer le fichier
      <v-icon right dark>cloud_download</v-icon>
    </v-btn>
    <!-- <a v-if="doc" @click="save" type="button" download>Enregistrer le fichier</a> -->
    <v-container fluid>
      <div class="body">
        <div class="entry">
          <v-treeview v-if="doc" :items="items"></v-treeview>
          <div v-else>No Data kindly import!</div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "parse",
  data() {
    return {
      // selectedFile: null
    };
  },
  methods: {
    ...mapActions(["readAndParseFile", "save"]),
    ...mapMutations(["selectFile"])
  },
  computed: {
    ...mapState({
      doc: "data",
      items: "tree",
      selectedFile: "selectedFile"
    }),
    label() {
      return (this.selectedFile && this.selectedFile.name) || "no file chosen";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body {
  text-align: left;
}
.hidden {
  display: none;
}
</style>