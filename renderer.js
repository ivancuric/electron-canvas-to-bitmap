const path = require("path");
const worker1 = new Worker(path.resolve(__dirname, "worker.js"));
const worker2 = new Worker(path.resolve(__dirname, "worker.js"));

const video = document.getElementById("potato");
let latestFrame = 0;

video.addEventListener("loadedmetadata", () => {
  const capture = async (time, meta) => {
    const frame = meta.presentedFrames;
    const s = performance.now();
    const bitmap = await createImageBitmap(video);

    switch (frame % 2) {
      case 0:
        worker1.postMessage({ bitmap, frame }, [bitmap]);
        break;

      case 1:
        worker2.postMessage({ bitmap, frame }, [bitmap]);
        break;

      default:
        break;
    }

    if (frame - latestFrame > 1) {
      console.log(`Dropped frame ${frame}`, performance.now() - s);
    }

    latestFrame = frame;

    video.requestVideoFrameCallback(capture);
  };

  video.play();
  video.requestVideoFrameCallback(capture);
});
