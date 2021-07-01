const canvas2d = new OffscreenCanvas(3840, 2160);
const ctx2d = canvas2d.getContext("2d");

const canvasBitmap = new OffscreenCanvas(3840, 2160);
const ctxBitmap = canvasBitmap.getContext("bitmaprenderer");

onmessage = (data) => {
  //WHAT THE HELL
  requestAnimationFrame(() => {
    console.log(data.bitmap);
  });
  // ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  // const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
};
