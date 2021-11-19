<script setup lang="ts">
import { onMounted } from "vue";
import { getImgFromVideo } from "./utils/index";
let canvas: any = null;
let videoFrames: any = null;
onMounted(() => {
  canvas = document.getElementById("prevImgCanvas") as HTMLCanvasElement;
  videoFrames = document.querySelector(
    ".upload-frame-group"
  ) as HTMLVideoElement;
});
const loadSnippetThumb = function (event: Event) {
  if (!event || !event.target) {
    return;
  }
  const target = event.target as HTMLInputElement;
  if (!target.files || !target.files[0]) {
    return;
  }
  const url = URL.createObjectURL(target.files[0]);
  let video = document.createElement("video");
  video.src = url;
  video.autoplay = true;
  video.addEventListener(
    "loadeddata",
    function () {
      renderFrames();
    },
    false
  );
  // 渲染视频的每一秒一帧
  async function renderFrames() {
    if (!isNaN(video.duration)) {
      var context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      for (let i = 1; i < video.duration; i++) {
        video.currentTime = i;
        let src = await seek();
        let img = new Image();
        img.src = src;
        videoFrames.appendChild(img);
        video.removeEventListener("seeked", getFrame.bind(null, null));
      }
    }
  }

  function getFrame(resolve: Function | null) {
    if (resolve) {
      let src = getImgFromVideo(video);
      resolve(src);
    }
  }

  function seek() {
    return new Promise<string>((resolve, reject) => {
      video.addEventListener("seeked", getFrame.bind(null, resolve));
    });
  }
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
