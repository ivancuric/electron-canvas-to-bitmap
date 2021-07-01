// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// const fs = require("fs");
// const path = require("path");

const video = document.getElementById("potato");

video.addEventListener("loadedmetadata", () => {
  let canvas = new OffscreenCanvas(3840, 2160);
  let ctx = canvas.getContext("2d");
  // let frame = 0;

  const capture = async (time, meta) => {
    // console.log(time, meta);

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // const bitmap = await createImageBitmap(video);

    // worker.postMessage({ bitmap }, [bitmap]);

    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    // fs.writeFileSync(
    //   path.resolve(__dirname, `./frames/${frame}.frame`),
    //   pixelData
    // );
    // console.log("asd", performance.now() - s);

    video.requestVideoFrameCallback(capture);
  };

  video.play();
  video.requestVideoFrameCallback(capture);
});
