<template>
  <div
    class="b-slate-300 wrap w-full flex flex-wrap justify-center items-center"
  >
    <div class="flex justify-center w-full items-center gap-3">
      <v-btn @click="Test" :loading="loading">Test</v-btn>
      <v-btn @click="Join" :loading="loading">Join</v-btn>
      {{ uid }}

      {{ room }} <v-btn>Hello</v-btn>
    </div>
    <div
      :id="`user-${i}`"
      v-for="(i, index) in screens"
      :key="index"
      class="w-52 h-52 border-2 border-solid border-purple-600"
    ></div>
  </div>
</template>
<script>
import AgoraRTC from "agora-rtc-sdk-ng";

import {
  AgoraInit,
  CreateChannelJoin,
  CreateClientJoin,
} from "@/services/agora";

let client;

export default {
  name: "TextView",
  data: () => ({
    loading: false,
    join: false,
    client: {},
    localTracks: [],
    remoteUsers: [],
    screens: [],
    uid: "MLEM" + Math.floor(Math.random() * 1212311).toString(),
    room: "",
  }),
  mounted() {},
  components: {},
  computed: {},
  created() {},
  methods: {
    async Test() {
      try {
        this.loading = true;
        await AgoraInit(this.uid, null, "EMETER VICTOR");
        const data = await CreateChannelJoin("web-m");
        this.room = "web-montana";
        client = await CreateClientJoin(data, null, this.uid);
        client.on("user-published", this.handleUserPublished);
        this.join = true;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },

    async Join() {
      try {
        let check = this.screens.includes(this.uid);
        if (check == false) {
          this.screens.push(this.uid);
        }
        this.localTracks = await AgoraRTC.createMicrophoneAndCameraTracks(
          {},
          {
            encoderConfig: {
              width: { min: 320, ideal: 320, max: 640 },
              height: { min: 180, ideal: 240, max: 480 },
            },
          }
        );

        this.localTracks[1].play(`user-${this.uid}`);
        await client.publish([this.localTracks[0], this.localTracks[1]]);
      } catch (err) {
        console.log(err);
      }
    },

    async handleUserPublished(user, mediaType) {
      this.remoteUsers[user.uid] = user;
      let check = this.screens.includes(user.uid);
      if (check == false) {
        this.screens.push(user.uid);
      }
      await client.subscribe(user, mediaType);
      if (mediaType === "video") {
        user.videoTrack.play(`user-${user.uid}`);
      }
      if (mediaType === "audio") {
        user.audioTrack.play();
      }
    },
  },
  setup() {},
};
</script>

<style scoped>
.wrap {
  height: 100vh;
}
.wrap {
  height: 100vh;
}
</style>
