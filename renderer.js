const path = require("path");

const video = document.getElementById("potato");
let latestFrame = 0;

const N_WORKERS = 2;
const workers = [];

for (let i = 0; i < N_WORKERS; i++) {
  workers[i] = new Worker(path.resolve(__dirname, "worker.js"));
}

video.addEventListener("loadedmetadata", () => {
  const capture = async (time, meta) => {
    const frame = meta.presentedFrames;
    const s = performance.now();
    const bitmap = await createImageBitmap(video);

    workers[frame % N_WORKERS].postMessage({ bitmap, frame }, [bitmap]);

    if (frame - latestFrame > 1) {
      console.log(
        `Dropped frame ${frame}`,
        `${(performance.now() - s).toFixed(2)}ms`
      );
    }

    latestFrame = frame;

    video.requestVideoFrameCallback(capture);
  };

  video.requestVideoFrameCallback(capture);
});
