<template>
  <v-app id="inspire">
    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="#97020A" dark app fixed dense>
      <v-toolbar-title style="display:flex; align-items: center;" class="ml-0 pl-3">

        <span style="margin-left: 10px;" class="hidden-sm-and-down">Contrôle WEB</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat large to="/">Accueil</v-btn>
      <v-btn flat large to="/importation">Importation</v-btn>
      <v-btn flat large to="/controle">Contrôles</v-btn>
    </v-toolbar>
    <v-container id="content">
      <v-content>
        <router-view/>
      </v-content>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    drawer: null
  }),
  props: {
    source: String
  }
};
</script>

<style>
#content {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#inspire {
    background-image: url('assets/backgournd.png');
    background-size: cover ;
  }

</style>
