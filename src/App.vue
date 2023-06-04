<template>
  <v-app class="apps">
    <div class="">
      <v-main>
        <router-view />
      </v-main>
      <v-snackbar v-model="snackbar" timeout="3000" :color="snackColor">
        <div class="flex justify-between items-center px-2">
          <p class="ma-0 pa-0 text-white text-md font-bold">{{ snackText }}</p>
          <v-btn small color="blue" text @click="snackbar = false">
            Close
          </v-btn>
        </div>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
import { snackbar } from "@/main";

export default {
  name: "App",
  methods: {},
  created() {
    snackbar.$on("open", (e) => {
      this.snackText = e.text;
      this.snackColor = e.color;
      this.snackbar = true;
    });
  },
  data: () => ({
    snackbar: false,
    snackText: "",
    snackColor: "",
    value: 1,
  }),
};
</script>

<style scoped>
.apps {
}
</style>
