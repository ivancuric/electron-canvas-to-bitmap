const constraints = {
  audio: false,
  video: {
    width: { exact: 3840 },
    height: { exact: 2160 },
    frameRate: { exact: 30 },
  },
};

(async () => {
  try {
    const video = document.getElementById("video");
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoTracks = mediaStream.getVideoTracks();
    video.srcObject = mediaStream;
  } catch (error) {
    console.error(error);
  }
})();
