<script setup lang="ts">
import { initVideo } from "./utils/index";

const loadSnippetThumb = function (event: Event) {
  if (!event || !event.target) {
    return;
  }
  const target = event.target as HTMLInputElement;
  if (!target.files || !target.files[0]) {
    return;
  }
  const url = URL.createObjectURL(target.files[0]);
  let canvas = document.getElementById("prevImgCanvas") as HTMLCanvasElement;
  let videoFrames = document.querySelector(
    ".upload-frame-group"
  ) as HTMLDivElement;
  initVideo(url, canvas, videoFrames);
};
</script>

<template>
  <div class="content">
    <h3>extract video frames</h3>
    <canvas id="prevImgCanvas" width="400" height="300"
      >Your browser does not support the HTML5 canvas tag.</canvas
    >
    <div class="upload-frame-group"></div>
    <div class="choose-video">
      <input
        id="videoage"
        type="file"
        name="video"
        class="chooseNail"
        accept="video/*"
        style="display: none"
        @change="loadSnippetThumb($event)"
      />
      <label for="videoage" id="labelvideo">Choose Video</label>
    </div>
  </div>
</template>

<style>
.content {
  text-align: center;
}
#prevImgCanvas {
  border: 1px dashed #ccc;
}
.choose-video {
  padding: 12px;
}
#labelvideo {
  cursor: pointer;
  border: 1px solid #ccc;
  padding: 12px;
}
.upload-frame-group {
  display: flex;
  max-width: 100vw;
  overflow: auto;
}
.upload-frame-group img {
  width: 400px;
  height: 300px;
  margin: 0px 12px;
}
</style>
