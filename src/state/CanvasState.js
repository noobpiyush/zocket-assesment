class CanvasState {
    constructor(templateData) {
        if (!templateData || !templateData.caption || !templateData.cta || !templateData.image_mask || !templateData.urls) {
          throw new Error('Invalid template data');
        }
    
        this.templateData = templateData;
        this.caption = {
          text: templateData.caption.text,
          position: templateData.caption.position,
          maxCharsPerLine: templateData.caption.max_characters_per_line,
          fontSize: templateData.caption.font_size,
          alignment: templateData.caption.alignment,
          textColor: templateData.caption.text_color,
        };
        this.cta = {
          text: templateData.cta.text,
          position: templateData.cta.position,
          textColor: templateData.cta.text_color,
          backgroundColor: templateData.cta.background_color,
        };
        this.imageMask = templateData.image_mask;
        this.urls = templateData.urls;
        this.backgroundColor = '#0369A1'; // Default background color
      }
  
    updateCaption(newText) {
      this.caption.text = newText;
      this.recalculateLineBreaks();
    }
  
    updateCTA(newText) {
      this.cta.text = newText;
    }
  
    updateBackgroundColor(newColor) {
      this.backgroundColor = newColor;
    }
  
    recalculateLineBreaks() {
      // Implement logic to recalculate line breaks based on the max_characters_per_line
    }
  
    drawCanvas(ctx) {
      // Implement the logic to draw all the elements on the canvas
      // - Draw the background color
      // - Draw the design pattern
      // - Draw the image mask
      // - Draw the mask stroke
      // - Draw the caption and CTA texts
    }
  }
  
  export default CanvasState;