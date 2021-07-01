const canvas2d = new OffscreenCanvas(3840, 2160);
const ctx2d = canvas2d.getContext("2d");

// const canvasBitmap = new OffscreenCanvas(3840, 2160);
// const ctxBitmap = canvasBitmap.getContext("bitmaprenderer");

onmessage = ({ data }) => {
  ctx2d.drawImage(data.bitmap, 0, 0, canvas2d.width, canvas2d.height);

  const pixelData = ctx2d.getImageData(
    0,
    0,
    canvas2d.width,
    canvas2d.height
  ).data;
};
