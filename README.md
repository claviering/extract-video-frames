# extract-video-frames

从视频中提取帧

## 原理

使用 input 获取上传的文件

给视频添加 loadeddata 事件，获取视频的数据

通过 `video.currentTime = i` 设置视频的当前时间，触发 `seeked` 事件

每次设置 currentTime 就触发一次 `seeked`。如果全局监听 `seeked` 事件，那么 `seeked` 事件会被触发一次，导致每次触发都会提取一张图片。

这里使用 Promise 实现每设置 `currentTime` 就触发一次 `seeked` 事件

## Reference

[JavaScript: Extract video frames reliably](https://stackoverflow.com/questions/32699721/javascript-extract-video-frames-reliably])

[Allowing cross-origin use of images and canvas](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#security_and_tainted_canvases)
