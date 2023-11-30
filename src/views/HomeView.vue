<template>
  <div class="home-view">
    <div class="home-view__navbar">
      <el-button type="text">
        <Icon icon="ri:arrow-left-double-fill"></Icon>
      </el-button>
    </div>
    <div class="home-view__media" id="wrap-waveform" v-loading="loading">
      <div class="home-view__wave-effect">
        <canvas id="wave"></canvas>
      </div>
      <audio class="w-0 h-0" controls muted></audio>
      <el-button type="text" @click="fetchPrevSong">
        <Icon icon="ri:arrow-left-double-fill"></Icon>
      </el-button>
      <el-button type="text" @click="playPause">
        <Icon v-if="isPlaying" icon="ri:pause-line"></Icon>
        <Icon v-else icon="ri:play-line"></Icon>
      </el-button>
      <el-button type="text" @click="fetchNextSong">
        <Icon icon="ri:arrow-right-double-fill"></Icon>
      </el-button>

      {{ timeLabel }}
      <div class="home-view__time-line" id="waveform">
        <div class="home-view__time-line__hover" id="hover"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Playlist from "@/mocks/playtist.js";
import WaveSurfer from "wavesurfer.js";
import { Icon } from "@iconify/vue2";
import { Wave } from "@foobar404/wave";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
gradient.addColorStop(0, "#656666"); // Top color
gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
gradient.addColorStop(1, "#B1B1B1"); // Bottom color

// Define the progress gradient
const progressGradient = ctx.createLinearGradient(
  0,
  0,
  0,
  canvas.height * 1.35
);
progressGradient.addColorStop(0, "#EE772F"); // Top color
progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, "#EB4926"); // Top color
progressGradient.addColorStop(
  (canvas.height * 0.7 + 1) / canvas.height,
  "#ffffff"
); // White line
progressGradient.addColorStop(
  (canvas.height * 0.7 + 2) / canvas.height,
  "#ffffff"
); // White line
progressGradient.addColorStop(
  (canvas.height * 0.7 + 3) / canvas.height,
  "#F6B094"
); // Bottom color
progressGradient.addColorStop(1, "#F6B094"); // Bottom color

export default {
  name: "HomeView",
  components: {
    Icon,
  },

  data() {
    return {
      playlist: Playlist.data,
      currentSong: {},
      timeLabel: "00:00:00",
      loading: false,
      waveSurfer: null,
      isPlaying: false,
      player: null,
    };
  },

  methods: {
    timeupdate(currentTime) {
      const hr = Math.floor(currentTime / 3600);
      const min = Math.floor((currentTime - hr * 3600) / 60);
      const sec = Math.floor(currentTime - hr * 3600 - min * 60);
      this.timeLabel = `${hr.toString().padStart(2, "0")}:${min
        .toString()
        .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    },
    playPause() {
      this.waveSurfer.playPause();

      this.isPlaying ? this.player.pause() : this.player.play();
    },

    fetchNextSong() {
      const index = this.playlist.findIndex(
        (song) => song.src === this.currentSong.src
      );

      if (this.playlist[index + 1]) {
        this.currentSong = this.playlist[index + 1];
        this.player.src = this.currentSong.src;

        this.waveSurfer.load(this.currentSong.src).then(() => {
          this.waveSurfer.play(0);
          this.player.play();
        });
      }
    },

    fetchPrevSong() {
      const index = this.playlist.findIndex(
        (song) => song.src === this.currentSong.src
      );

      if (this.playlist[index - 1]) {
        this.currentSong = this.playlist[index - 1];

        this.player.src = this.currentSong.src;
        this.waveSurfer.load(this.currentSong.src).then(() => {
          this.waveSurfer.play(0);
          this.player.play();
        });
      }
    },

    createWave() {
      const canvasWave = document.getElementById("wave");
      this.player = document.querySelector("audio");
      this.player.src = this.currentSong.src;

      canvasWave.width = window.innerWidth;
      canvasWave.height = window.innerHeight * 0.8;

      let wave = new Wave(this.player, canvasWave);

      // wave.addAnimation(
      //   new wave.animations.Wave({
      //     lineColor: "white",
      //     lineWidth: 10,
      //     fillColor: { gradient: ["#FF9A8B", "#FF7A88", "#FF99AC"] },
      //     mirroredX: true,
      //     count: 5,
      //     rounded: true,
      //     frequencyBand: "base",
      //   })
      // );
      wave.addAnimation(
        new wave.animations.Cubes({
          top: true,
          bottom: true,
          count: 60,
          cubeHeight: 10,
          fillColor: {
            gradient: ["#FF9A8B"],
            // rotate: 90,
          },
          lineColor: "#FF9A8B",
          radius: 1,
        })
      );

      // wave.addAnimation(
      //   new wave.animations.Circles({
      //     lineColor: {
      //       gradient: ["#FF9A8B", "#FF7A88", "#FF99AC"],
      //       rotate: 90,
      //     },
      //     lineWidth: 4,
      //     diameter: 20,
      //     count: 20,
      //     frequencyBand: "base",
      //   })
      // );
      // wave.addAnimation(
      //   new wave.animations.Glob({
      //     fillColor: {
      //       gradient: ["#FF9A8B"],
      //       rotate: 90,
      //     },
      //     lineColor: "white",
      //     glow: { strength: 15, color: "#FAD961" },
      //     lineWidth: 10,
      //     count: 45,
      //   })
      // );
      wave.addAnimation(
        new wave.animations.Shine({
          lineColor: "#FAD961",
          glow: { strength: 15, color: "#FAD961" },
          diameter: 300,
          lineWidth: 5,
        })
      );
      // wave.addAnimation(
      //   new wave.animations.Square({
      //     lineColor: { gradient: ["#21D4FD", "#B721FF"] },
      //     count: 50,
      //     diamater: 1000,
      //   })
      // );
      // wave.addAnimation(
      //   new wave.animations.Arcs({
      //     lineWidth: 4,
      //     lineColor: { gradient: ["#21D4FD", "#B721FF"] },
      //     diameter: 500,
      //     fillColor: {
      //       gradient: ["#21D4FD", "#21D4FD", "#B721FF"],
      //       rotate: 45,
      //     },
      //   })
      // );
    },
  },

  mounted() {
    this.currentSong = this.playlist[0];

    this.waveSurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: gradient,
      progressColor: progressGradient,
      barWidth: 2,
      height: 60,
    });
    this.waveSurfer.load(this.currentSong.src);

    this.waveSurfer.on("timeupdate", (currentTime) => {
      this.timeupdate(currentTime);
    });

    this.waveSurfer.on("loading", (percent) => {
      this.loading = true;
      console.log("Loading", percent + "%");
    });

    /** When the audio is both decoded and can play */
    this.waveSurfer.on("ready", (duration) => {
      this.loading = false;
      console.log("Ready", duration + "s");
    });

    this.waveSurfer.on("finish", () => {
      this.fetchNextSong();
    });

    this.waveSurfer.on("interaction", (newTime) => {
      this.player.currentTime = newTime;
    });

    // Hover effect
    {
      const hover = document.querySelector("#hover");
      const waveform = document.querySelector("#waveform");
      waveform.addEventListener(
        "pointermove",
        (e) => (hover.style.width = `${e.offsetX}px`)
      );
    }

    /** When the audio starts playing */
    this.waveSurfer.on("play", () => {
      this.isPlaying = true;
      console.log("Play");
    });

    /** When the audio pauses */
    this.waveSurfer.on("pause", () => {
      this.isPlaying = false;
      console.log("Pause");
    });

    //Wave

    this.createWave();
  },
};
</script>
<style lang="scss">
@import "@/assets/css/pages/home-view.scss";
</style>
