<script setup lang="ts">
import { onMounted } from "vue";
import { initVideo } from "./utils/index";
onMounted(() => {
  // init();
});
const init = () => {
  let canvas = document.getElementById(
    "onlinePreImgCanvas"
  ) as HTMLCanvasElement;
  let videoFrames = document.querySelector(
    ".online-frame-group"
  ) as HTMLDivElement;
  let url =
    "https://govisually.com/wp-content/uploads/2020/12/video_Govisually-_1.mp4?_=1";
  // Security and tainted canvases
  initVideo(url, canvas, videoFrames);
};
</script>
<template>
  <canvas id="onlinePreImgCanvas"></canvas>
  <div class="online-frame-group"></div>
</template>
