function getImgFromVideo(video: HTMLVideoElement): string {
  // create a temporary canvas
  // 不能使用页面上的 canvas，因为引用关系，会导致页面上的 canvas 渲染最后一帧的图
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  var context = canvas.getContext("2d");
  if (!context) return "";
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

/**
 *
 * @param src 视频地址
 * @param canvas
 * @param content 视频每一帧显示的容器
 */
const initVideo = (
  src: string,
  canvas: HTMLCanvasElement,
  content: HTMLDivElement
) => {
  let video = document.createElement("video");
  video.src = src;
  video.autoplay = true;
  video.addEventListener(
    "loadeddata",
    function () {
      renderFirstFrame();
      renderFrames();
    },
    false
  );
  function renderFirstFrame() {
    var context = canvas.getContext("2d");
    if (!context) return;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
  }
  // 渲染视频的每一秒一帧
  async function renderFrames() {
    if (!isNaN(video.duration)) {
      for (let i = 1; i < video.duration; i++) {
        video.currentTime = i;
        let src = await seek();
        let img = new Image();
        img.src = src;
        content.appendChild(img);
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

export { initVideo };
