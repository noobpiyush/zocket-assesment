// CanvasComponent.js
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from './Canvas';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [captionText, setCaptionText] = useState('1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs');
  const [ctaText, setCTAText] = useState('Shop Now');
  const [backgroundColor, setBackgroundColor] = useState('#0369A1');
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [captionTextColor, setCaptionTextColor] = useState('#FFFFFF');
  const [captionFontSize, setCaptionFontSize] = useState(44);
  const [captionAlignment, setCaptionAlignment] = useState('left');
  const [captionXPosition, setCaptionXPosition] = useState(50);
  const [captionYPosition, setCaptionYPosition] = useState(50); // Add this state variable
  const [ctaTextColor, setCTATextColor] = useState('#FFFFFF'); // Add this state variable
  const [ctaFontSize, setCTAFontSize] = useState(30); // Add this state variable
  const [ctaXPosition, setCTAXPosition] = useState(190); // Add this state variable
  const [ctaYPosition, setCTAYPosition] = useState(320);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasObj = new Canvas(canvas);
  
    const templateData = {
      caption: {
        text: captionText,
        position: { x: captionXPosition, y: captionYPosition }, // Updated to use state variables
        max_characters_per_line: 31,
        font_size: captionFontSize, // Updated to use state variable
        alignment: captionAlignment, // Updated to use state variable
        text_color: captionTextColor, // Updated to use state variable
      },
      cta: {
        text: ctaText,
        position: { x: ctaXPosition, y: ctaYPosition },
        text_color: ctaTextColor,
        background_color: '#000000',
      },
      image_mask: { x: 56, y: 442, width: 970, height: 600 },
      urls: {
        mask: 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png',
        stroke: 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png',
        design_pattern: 'https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png',
      },
    };
  
    canvasObj.drawBackground(backgroundColor);
    canvasObj.drawPattern(templateData.urls.design_pattern);
    canvasObj.drawText(
      templateData.caption.text,
      templateData.caption.position.x,
      templateData.caption.position.y,
      templateData.caption.text_color,
      templateData.caption.font_size,
      templateData.caption.alignment,
      templateData.caption.max_characters_per_line
    );
    canvasObj.drawCTA(
      templateData.cta.text,
      templateData.cta.position.x,
      templateData.cta.position.y,
      templateData.cta.text_color,
      templateData.cta.background_color,
      200,
      50
    );
  
    canvasObj.drawMaskStroke(
      templateData.urls.stroke,
      templateData.image_mask.x,
      templateData.image_mask.y,
      templateData.image_mask.width,
      templateData.image_mask.height
    );
  
    if (selectedImage) {
      canvasObj.drawImageWithinMask(
        selectedImage,
        templateData.image_mask.x,
        templateData.image_mask.y,
        templateData.image_mask.width,
        templateData.image_mask.height
      );
    }
  
    return () => {
      // Cleanup logic if needed
    };
  }, [captionText, ctaText, backgroundColor, selectedImage, captionTextColor, captionFontSize, captionAlignment, captionXPosition, captionYPosition, ctaXPosition, ctaYPosition, ctaTextColor]);
  

  const handleCaptionTextChange = (e) => {
    setCaptionText(e.target.value);
  };
  const handleCaptionXPositionChange = (e) => {
    setCaptionXPosition(parseInt(e.target.value));
  };
  const handleCaptionAlignmentChange = (e) => {
    setCaptionAlignment(e.target.value);
  };

  const handleCaptionFontSizeChange = (e) => {
    setCaptionFontSize(parseInt(e.target.value)); // Parse the input value to ensure it's a number
  };

  const handleCTATextChange = (e) => {
    setCTAText(e.target.value);
  };

  const handleBackgroundColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };

  const handleCaptionTextColorChange = (e) => {
    setCaptionTextColor(e.target.value);
  };

  const handleCaptionYPositionChange = (e) => { // Add this function for captionYPosition
    setCaptionYPosition(parseInt(e.target.value));
  };

  const handleCTATextColorChange = (e) => { // Add this function for ctaTextColor
    setCTATextColor(e.target.value);
  };

  const handleCTAFontSizeChange = (e) => { // Add this function for ctaFontSize
    setCTAFontSize(parseInt(e.target.value));
  };

  const handleCTAXPositionChange = (e) => { // Add this function for ctaXPosition
    setCTAXPosition(parseInt(e.target.value));
  };

  const handleCTAYPositionChange = (e) => { // Add this function for ctaYPosition
    setCTAYPosition(parseInt(e.target.value));
  };


  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
        image.onload = () => {
          setSelectedImage(image);
        };
        image.onerror = () => {
          setErrorMessage('Failed to load image');
        };
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageSelect} /> {/* File input for image selection */}
      <canvas
        ref={canvasRef}
        width={1080}
        height={1080}
        style={{ width: '400px', height: '400px' }}
      ></canvas>
      <div>
        <label>Caption Text:</label>
        <input type="text" value={captionText} onChange={handleCaptionTextChange} />
      </div>
      <div>
        <label>Text Color:</label>
        <input type="color" value={captionTextColor} onChange={handleCaptionTextColorChange} />
      </div>
      <div>
        <label>Font Size:</label>
        <input type="number" value={captionFontSize.toString()} onChange={handleCaptionFontSizeChange} />
      </div>
      <div>
        <label>Alignment:</label>
        <select value={captionAlignment} onChange={handleCaptionAlignmentChange}>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div>
        <label>Caption X Position:</label>
        <input type="number" value={captionXPosition} onChange={handleCaptionXPositionChange} />
      </div>
      <div>
        <label>Caption Y Position:</label>

        <input type="number" value={captionYPosition.toString()} onChange={handleCaptionYPositionChange} />
      </div>
      <div>
        <label>CTA Text:</label>
        <input type="text" value={ctaText} onChange={handleCTATextChange} />
      </div>
      <div>
        <label>Text Color:</label>
        <input type="color" value={ctaTextColor} onChange={handleCTATextColorChange} />
      </div>
      <div>
        <label>Font Size:</label>
        <input type="number" value={ctaFontSize.toString()} onChange={handleCTAFontSizeChange} />
      </div>
      <div>
        <label>CTA X Position:</label>
        <input type="number" value={ctaXPosition} onChange={handleCTAXPositionChange} />
      </div>
      <div>
        <label>CTA Y Position:</label>
        <input type="number" value={ctaYPosition} onChange={handleCTAYPositionChange} />
      </div>
      <div>
        <label>Background Color:</label>
        <input type="color" value={backgroundColor} onChange={handleBackgroundColorChange} />
      </div>
    </div>
  );
};

export default CanvasComponent;