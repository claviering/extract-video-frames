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

export { getImgFromVideo };
