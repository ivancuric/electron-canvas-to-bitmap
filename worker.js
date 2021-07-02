const canvas = new OffscreenCanvas(3840, 2160);
const ctx = canvas.getContext("2d");

onmessage = ({ data }) => {
  ctx.drawImage(data.bitmap, 0, 0, canvas.width, canvas.height);

  const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
};
