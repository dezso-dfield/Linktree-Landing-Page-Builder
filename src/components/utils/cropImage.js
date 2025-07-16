// utils/cropImage.js
export const getCroppedImg = async (imageSrc, pixelCrop, fileName = 'cropped.jpeg') => {
  const createImage = url =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.setAttribute('crossOrigin', 'anonymous');
      image.onload = () => resolve(image);
      image.onerror = error => reject(error);
      image.src = url;
    });

  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Clear canvas and fill with white background
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    image,
    pixelCrop.x * scaleX,
    pixelCrop.y * scaleY,
    pixelCrop.width * scaleX,
    pixelCrop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise(resolve => {
    canvas.toBlob(blob => {
      if (!blob) return;
      blob.name = fileName;
      const croppedImageUrl = URL.createObjectURL(blob);
      resolve(croppedImageUrl);
    }, 'image/jpeg');
  });
};