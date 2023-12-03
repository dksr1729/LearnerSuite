document.addEventListener('DOMContentLoaded', function () {
  const imageInput = document.getElementById('imageInput');
  const submitBtn = document.getElementById('submitBtn');
  const canvas = document.getElementById('imageCanvas');
  const context = canvas.getContext('2d');
  const applyCropBtn = document.getElementById('applyCropBtn');
  const undoCropBtn = document.getElementById('undoCropBtn');
  const cropXInput = document.getElementById('cropX');
  const cropYInput = document.getElementById('cropY');
  const resizeXInput = document.getElementById('resizeX');
  const resizeYInput = document.getElementById('resizeY');
  const resizeBtn = document.getElementById('resizeBtn');
  const undoResizeBtn = document.getElementById('undoResizeBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  let originalImageData;
  let canvasStateStack = [];

  submitBtn.addEventListener('click', function () {
      const file = imageInput.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
              const img = new Image();
              img.onload = function () {
                  canvas.width = img.width;
                  canvas.height = img.height;
                  context.drawImage(img, 0, 0);
                  originalImageData = context.getImageData(0, 0, canvas.width, canvas.height);
                  saveCanvasState();
              };
              img.src = e.target.result;
          };
          reader.readAsDataURL(file);
      }
  });

  applyCropBtn.addEventListener('click', function () {
      const cropX = parseInt(cropXInput.value);
      const cropY = parseInt(cropYInput.value);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.putImageData(originalImageData, cropX, cropY);
      saveCanvasState();
  });

  undoCropBtn.addEventListener('click', function () {
      restoreCanvasState();
  });

  resizeBtn.addEventListener('click', function () {
      const resizeX = parseInt(resizeXInput.value);
      const resizeY = parseInt(resizeYInput.value);

      const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = resizeX;
      canvas.height = resizeY;
      context.putImageData(imgData, 0, 0);
      saveCanvasState();
  });

  undoResizeBtn.addEventListener('click', function () {
      restoreCanvasState();
  });

  downloadBtn.addEventListener('click', function () {
      const downloadLink = document.createElement('a');
      downloadLink.href = canvas.toDataURL('image/png');
      downloadLink.download = 'modified_image.png';
      downloadLink.click();
  });

  function saveCanvasState() {
      canvasStateStack.push(context.getImageData(0, 0, canvas.width, canvas.height));
  }

  function restoreCanvasState() {
      if (canvasStateStack.length > 1) {
          canvasStateStack.pop(); // Remove the current state
          const prevState = canvasStateStack[canvasStateStack.length - 1];
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.putImageData(prevState, 0, 0);
      }
  }
});
