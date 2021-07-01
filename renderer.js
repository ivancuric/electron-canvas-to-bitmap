// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// const fs = require("fs");
// const path = require("path");

const video = document.getElementById("potato");

let latestFrame = 0;

video.addEventListener("loadedmetadata", () => {
  let canvas;
  let ctx;

  let canvas1 = new OffscreenCanvas(3840, 2160);
  let canvas2 = new OffscreenCanvas(3840, 2160);
  let ctx1 = canvas1.getContext("2d");
  let ctx2 = canvas2.getContext("2d");

  const capture = async (time, meta) => {
    const s = performance.now();
    const frame = meta.presentedFrames;

    switch (frame % 2) {
      case 0:
        ctx = ctx1;
        canvas = canvas1;
        break;

      case 1:
        ctx = ctx2;
        canvas = canvas2;
        break;

      default:
        break;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // fs.writeFileSync(
    //   path.resolve(__dirname, `./frames/${frame}.frame`),
    //   pixelData
    // );
    // console.log("asd", performance.now() - s);

    if (frame - latestFrame > 1) {
      console.log(`Dropped frame ${frame}`, performance.now() - s);
    }
    latestFrame = frame;

    video.requestVideoFrameCallback(capture);
  };

  video.play();
  video.requestVideoFrameCallback(capture);
});
