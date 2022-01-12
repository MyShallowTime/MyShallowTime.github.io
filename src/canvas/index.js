
const sCanvas = document.getElementById('ms-sprite-canvas');
sCanvas.width = 300;
sCanvas.height = 1000;
const spriteCtx = sCanvas.getContext('2d');

const spriteImg = new Image();
spriteImg.src = "sprite.png"
spriteImg.onload = () => {
    // ctx.drawImage(img, -100, -200);
    spriteCtx.drawImage(spriteImg, 0, 0);
    // ctx.drawImage(img, -100, -200, 200, 200); //
}
const width = 30;
const height = 30;
const canvas = document.getElementById('ms-canvas');
canvas.width = width;
canvas.height = height;
// canvas.height = '200px';
const ctx = canvas.getContext('2d');

// // 绘制图形
// ctx.fillStyle = '#414141';
// ctx.fillRect(10, 10, 100, 100);

ctx.fillStyle = '#383838';
ctx.fillRect(0, 0, 200, 200);

// // ctx.fillStyle = 'red'; 
// // 这行对strokeRect不生效的，它只是边框
// ctx.strokeStyle = 'red';
// ctx.strokeRect(50, 50, 100, 100);


// // ctx.fillStyle = 'red'; 
// // 这行对clearReact也不生效， 它始终是透明的
// ctx.clearRect(20, 20, 100, 100);

//路径，因为这次功能用不到，暂放一下
// ctx.mozImageSmoothingEnabled = false;
// ctx.webkitImageSmoothingEnabled = false;
// ctx.msImageSmoothingEnabled = false;
// ctx.imageSmoothingEnabled = false;

const img = new Image();
img.src = "sprite.png";
// img.crossOrigin = 'Anonymous';


img.onload = () => {
    // ctx.drawImage(img, -100, -200);
    ctx.drawImage(img, 101, 200, 101, 100, 0, 0, width, height);
    // ctx.drawImage(img, -100, -200, 200, 200); //
    var imageData = ctx.getImageData(0, 0, width, height);
    var length = imageData.data.length;
    for (var index = 0; index < length; index += 4) {
      //这里可以对 r g b 进行计算（这里的rgb是每个像素块的rgb颜色）
      imageData.data[index] = 255;
      imageData.data[index + 1] = 0;
      imageData.data[index + 2] = 0;
    }
    // 更新新数据
    ctx.putImageData(imageData, 0, 0);
}

