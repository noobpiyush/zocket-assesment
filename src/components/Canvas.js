// Canvas.js
export class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  drawBackground(color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawPattern(patternUrl) {
    const patternImg = new Image();
    patternImg.src = patternUrl;
    patternImg.onload = () => {
      const pattern = this.ctx.createPattern(patternImg, 'repeat');
      this.ctx.fillStyle = pattern;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
  }

  drawMaskStroke(maskStrokeUrl, x, y, width, height) {
    const maskStrokeImg = new Image();
    maskStrokeImg.src = maskStrokeUrl;
    maskStrokeImg.onload = () => {
      this.ctx.drawImage(maskStrokeImg, x, y, width, height);
    };
  }

  drawText(text, x, y, color, fontSize, alignment, maxCharactersPerLine) {
    this.ctx.fillStyle = color;
    this.ctx.font = `${fontSize}px Arial`;
    this.ctx.textAlign = alignment;

    let words = text.split(' ');
    let line = '';
    let lineHeight = fontSize * 1.1;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = this.ctx.measureText(testLine);
      let testWidth = metrics.width;

      if (testWidth > maxCharactersPerLine * (fontSize / 2) && n > 0) {
        this.ctx.fillText(line.trim(), x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    this.ctx.fillText(line.trim(), x, y);
  }

  drawCTA(text, x, y, textColor, backgroundColor, width, height) {
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(x, y, width, height);
    this.ctx.fillStyle = textColor;
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    
    // Wrap text to fit within the width
    const words = text.split(' ');
    let line = '';
    let lineHeight = 36; // Adjust the line height as needed
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = this.ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > width && n > 0) {
        this.ctx.fillText(line.trim(), x + width / 2, y + height / 2);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    
    this.ctx.fillText(line.trim(), x + width / 2, y + height / 2);
  }
  

  drawImageWithinMask(image, maskX, maskY, maskWidth, maskHeight) {
    if (image.complete) {
      // Calculate the aspect ratios
      const imageAspectRatio = image.width / image.height;
      const maskAspectRatio = maskWidth / maskHeight;
  
      let scaledWidth, scaledHeight, drawX, drawY;
  
      // Determine the scaling and positioning based on the aspect ratios
      if (imageAspectRatio > maskAspectRatio) {
        // Image is wider than the mask, scale based on height
        scaledHeight = maskHeight;
        scaledWidth = scaledHeight * imageAspectRatio;
        drawX = maskX + (maskWidth - scaledWidth) / 2;
        drawY = maskY;
      } else {
        // Image is taller than the mask, scale based on width
        scaledWidth = maskWidth;
        scaledHeight = scaledWidth / imageAspectRatio;
        drawX = maskX;
        drawY = maskY + (maskHeight - scaledHeight) / 2;
      }
  
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(maskX + maskWidth / 2, maskY + maskHeight / 2, maskWidth / 2, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.clip();
  
      // Draw the image within the mask
      this.ctx.drawImage(
        image,
        drawX,
        drawY,
        scaledWidth,
        scaledHeight
      );
  
      // Draw the mask stroke
      this.drawMaskStroke(
        'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png',
        maskX,
        maskY,
        maskWidth,
        maskHeight
      );
  
      this.ctx.restore();
    } else {
      console.error('Image is not fully loaded');
    }
  }
  
}
